import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LANG_NAMES = { en: "English", ky: "Kyrgyz", zh: "Simplified Chinese" } as const;

export const translateTexts = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ lang: z.enum(["en", "ky", "zh"]), texts: z.array(z.string().min(1).max(2000)).max(100) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { createHash } = await import("crypto");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const md5 = (s: string) => createHash("md5").update(s).digest("hex");
    const texts = [...new Set(data.texts)];
    const map: Record<string, string> = {};
    if (!texts.length) return { map };

    const { data: rows } = await supabaseAdmin
      .from("translations" as never)
      .select("src, dst")
      .eq("lang", data.lang)
      .in("src_hash", texts.map(md5));
    for (const r of (rows ?? []) as { src: string; dst: string }[]) map[r.src] = r.dst;

    const missing = texts.filter((t) => !(t in map));
    if (!missing.length) return { map };

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("LOVABLE_API_KEY missing");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        stream: true,
        messages: [
          {
            role: "system",
            content: `You translate UI texts of a medical clinic website in Bishkek, Kyrgyzstan from Russian to ${LANG_NAMES[data.lang]}. Keep personal names, prices, phone numbers, addresses' numbers and URLs unchanged. Write the clinic name «Авиценна» as "Avicenna" in English/Chinese and "Авиценна" in Kyrgyz. Preserve leading/trailing punctuation. Reply with JSON only: an array of strings of exactly the same length and order as the input array.`,
          },
          { role: "user", content: JSON.stringify(missing) },
        ],
      }),
    });
    if (!res.ok || !res.body) throw new Error(`Translation failed [${res.status}]: ${await res.text()}`);

    let out = "";
    let buf = "";
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        const p = line.trim();
        if (!p.startsWith("data:") || p === "data: [DONE]") continue;
        try {
          out += JSON.parse(p.slice(5)).choices?.[0]?.delta?.content ?? "";
        } catch {
          /* partial frame */
        }
      }
    }
    const json = out.slice(out.indexOf("["), out.lastIndexOf("]") + 1);
    let arr: unknown;
    try {
      arr = JSON.parse(json);
    } catch {
      return { map };
    }
    if (!Array.isArray(arr) || arr.length !== missing.length) return { map };

    const upserts = missing.map((src, i) => ({ src_hash: md5(src), lang: data.lang, src, dst: String(arr[i] ?? src) }));
    for (const u of upserts) map[u.src] = u.dst;
    await supabaseAdmin.from("translations" as never).upsert(upserts as never, { onConflict: "src_hash,lang" });
    return { map };
  });
