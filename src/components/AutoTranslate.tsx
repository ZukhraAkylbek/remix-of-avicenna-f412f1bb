import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { translateTexts } from "@/lib/translate.functions";

const CYR = /[А-Яа-яЁё]/;
const ATTRS = ["placeholder", "alt", "title"] as const;
const SKIP = "script,style,textarea,input,noscript,[contenteditable],[data-no-translate]";
const textOrig = new WeakMap<Text, string>();
const attrOrig = new WeakMap<Element, Record<string, string>>();

type Target = { get: () => string; set: (v: string) => void };

function collect(): Map<string, Target[]> {
  const out = new Map<string, Target[]>();
  const add = (src: string, t: Target) => {
    const k = src.trim();
    if (!k || !CYR.test(k) || k.length > 2000) return;
    out.set(k, [...(out.get(k) ?? []), t]);
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    const node = n;
    if (node.parentElement?.closest(SKIP)) continue;
    const src = textOrig.get(node) ?? node.nodeValue ?? "";
    if (!textOrig.has(node)) textOrig.set(node, src);
    add(src, { get: () => src, set: (v) => (node.nodeValue = src.replace(src.trim(), v)) });
  }
  document.body.querySelectorAll("[placeholder],[alt],[title]").forEach((el) => {
    if (el.closest("[data-no-translate]")) return;
    const store = attrOrig.get(el) ?? {};
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v == null) continue;
      store[a] ??= v;
      const src = store[a];
      add(src, { get: () => src, set: (t) => el.setAttribute(a, t) });
    }
    attrOrig.set(el, store);
  });
  return out;
}

function restore() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    const o = textOrig.get(n);
    if (o != null && n.nodeValue !== o) n.nodeValue = o;
  }
  document.body.querySelectorAll("[placeholder],[alt],[title]").forEach((el) => {
    const s = attrOrig.get(el);
    if (s) for (const [a, v] of Object.entries(s)) el.setAttribute(a, v);
  });
}

export function AutoTranslate() {
  const { lang } = useLanguage();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const off = lang === "ru" || path.startsWith("/admin") || path.startsWith("/auth");

  useEffect(() => {
    document.documentElement.lang = lang;
    if (off) {
      restore();
      return;
    }
    const cacheKey = `tr-cache-${lang}`;
    let cache: Record<string, string> = {};
    try {
      cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
    } catch {
      /* ignore */
    }
    let busy = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const run = async () => {
      if (busy || cancelled) return;
      busy = true;
      observer.disconnect();
      const found = collect();
      const apply = () => {
        for (const [src, targets] of found) {
          const dst = cache[src];
          if (dst) targets.forEach((t) => t.set(dst));
        }
      };
      apply();
      const missing = [...found.keys()].filter((k) => !(k in cache));
      for (let i = 0; i < missing.length && !cancelled; i += 100) {
        try {
          const { data: rows } = await supabase.rpc("get_translations", { p_lang: lang, p_texts: missing.slice(i, i + 100) });
          for (const r of (rows ?? []) as { src: string; dst: string }[]) cache[r.src] = r.dst;
          const stillMissing = missing.slice(i, i + 100).filter((k) => !(k in cache));
          if (stillMissing.length) {
            const { map } = await translateTexts({ data: { lang: lang as "en" | "ky" | "zh", texts: stillMissing } });
            Object.assign(cache, map);
          }
          localStorage.setItem(cacheKey, JSON.stringify(cache));
        } catch {
          break;
        }
        if (!cancelled) apply();
      }
      busy = false;
      if (!cancelled) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    };
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(run, 300);
    });
    void run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lang, off, path]);

  return null;
}
