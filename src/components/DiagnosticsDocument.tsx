import { Link } from "@tanstack/react-router";
import { CalendarCheck, Check, Clock3, Plus } from "lucide-react";
import { DIAGNOSTIC_IMAGES } from "@/lib/hq-images";
import documentContent from "@/data/diagnostics-document.json";
import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { BOOKING_URL } from "@/lib/site-config";

export const diagnosticDocuments = documentContent;

// Короткие интро для карточек каталога и hero страниц диагностики (позже — из админки)
export const SHORT_INTROS: Record<string, string> = {
  kt: "Детальные послойные снимки органов, костей и сосудов на мультиспиральном томографе Siemens — без контраста, с 14 лет.",
  rentgen: "Цифровой рентген с минимальной лучевой нагрузкой — круглосуточно, для взрослых и детей с 3 лет.",
  uzi: "Ультразвуковая диагностика органов, сердца и сосудов для взрослых, детей и беременных — в четырёх филиалах Бишкека.",
  ekg: "Быстрая и безопасная проверка работы сердца за 5–10 минут — во всех филиалах «Авиценны».",
  holter: "Суточная запись ЭКГ и давления в привычном ритме жизни — выявляет скрытые нарушения ритма и колебания давления.",
  "ehokg-doppler": "Ультразвуковая оценка сердца, клапанов и кровотока в сосудах — для взрослых и детей.",
  endoskopiya: "Гастроскопия и колоноскопия под медикаментозным сном или без него — с биопсией и удалением полипов за одну процедуру.",
  "dyhatelny-test": "Безболезненная проверка на Helicobacter pylori без эндоскопии — за 30–40 минут.",
  "laboratornaya-diagnostika": "Более 1000 видов анализов в собственной лаборатории «Экспресс Плюс» с аккредитацией ISO 15189.",
  spirometriya: "Безболезненная проверка функции лёгких за 15–30 минут — без записи, по живой очереди.",
  videokolposkopiya: "Осмотр шейки матки с многократным увеличением — помогает выявить изменения на ранних стадиях.",
};

type DocumentBlock = (typeof documentContent)[number]["blocks"][number];

function renderBlocks(blocks: DocumentBlock[]) {
  const sections: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length;) {
    const block = blocks[index];
    if (!block) break;

    if (block.type === "heading" && block.text.toLowerCase().includes("график работы")) {
      let end = index + 1;
      while (end < blocks.length && blocks[end]?.type !== "heading") end++;
      sections.push(
        <div key={index} className="bg-about-canvas py-8 sm:py-10"><section className="border-about-line bg-about-mint mx-auto max-w-5xl rounded-2xl border p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="bg-about-icon text-about-teal grid size-10 shrink-0 place-items-center rounded-full"><Clock3 className="size-5" aria-hidden="true" /></span>
            <h2 className="text-about-ink text-xl font-bold sm:text-2xl">{block.text}</h2>
          </div>
          <div className="mt-5 divide-y divide-about-line border-y border-about-line">
            {blocks.slice(index + 1, end).map((item, offset) => {
              const colon = item.text.indexOf(":");
              const isHours = colon > 0 && colon < 26 && /\d{2}:\d{2}|выходной|графику|круглосуточно/i.test(item.text.slice(colon + 1));
              return <div key={offset} className="py-3 text-sm leading-relaxed sm:text-base">
                {isHours ? <div className="flex flex-wrap justify-between gap-x-4 gap-y-1"><span className="text-about-copy">{item.text.slice(0, colon)}</span><span className="text-about-ink font-semibold">{item.text.slice(colon + 1).trim()}</span></div> : <p className="text-about-copy">{item.type === "bullet" ? "• " : ""}{item.text}</p>}
              </div>;
            })}
          </div>
        </section></div>
      );
      index = end;
      continue;
    }

    if (block.type === "heading" && block.text === "Часто задаваемые вопросы") {
      let end = index + 1;
      while (end < blocks.length && blocks[end]?.type !== "heading") end++;
      const answers: { title: string; text: string[] }[] = [];
      for (const item of blocks.slice(index + 1, end)) {
        if (item.type === "question") answers.push({ title: item.text, text: [] });
        else {
          const answer = answers.at(-1);
          if (answer) answer.text.push(item.text);
        }
      }
      sections.push(
        <section key={index} className="bg-about-mint py-8 sm:py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-about-ink text-2xl font-bold sm:text-3xl">{block.text}</h2>
          <div className="mt-6 grid items-start gap-3 lg:grid-cols-2">
            {answers.map((answer) => <details key={answer.title} className="group border-about-line bg-card rounded-2xl border">
              <summary className="text-about-ink flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold [&::-webkit-details-marker]:hidden">
                <span>{answer.title}</span><Plus className="text-about-teal size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <div className="text-about-copy space-y-2 px-4 pb-4 text-sm leading-relaxed">{answer.text.map((text, answerIndex) => <p key={answerIndex}>{text}</p>)}</div>
            </details>)}
          </div>
        </div></section>
      );
      index = end;
      continue;
    }

    if (block.type === "heading" || index === 0) {
      let end = index + 1;
      while (end < blocks.length && blocks[end]?.type !== "heading") end++;
      const body = blocks.slice(block.type === "heading" ? index + 1 : index, end);
      const bullets = body.filter((item) => item.type === "bullet");
      sections.push(
        <section key={index} className={`${sections.length % 2 ? "bg-about-mint" : "bg-about-canvas"} py-8 sm:py-10`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {block.type === "heading" && <h2 className="text-about-ink text-2xl font-extrabold tracking-tight sm:text-3xl">{block.text}</h2>}
            <div className="mt-5 max-w-4xl space-y-4">
              {body.filter((item) => item.type !== "bullet").map((item, i) => item.type === "question"
                ? <h3 key={i} className="text-about-ink pt-2 text-lg font-bold">{item.text}</h3>
                : <p key={i} className="text-about-copy text-base leading-relaxed sm:text-lg">{item.text}</p>)}
            </div>
            {bullets.length > 0 && <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
              {bullets.map((item, i) => <li key={i} className="text-about-copy flex items-start gap-3 text-base leading-relaxed sm:text-lg">
                <span className="bg-about-icon text-about-teal mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"><Check className="size-4" aria-hidden="true" /></span>{item.text}
              </li>)}
            </ul>}
          </div>
        </section>
      );
      index = end;
      continue;
    }
    index++;
  }
  return sections;
}

export function DiagnosticsDocument({ slug }: { slug: string }) {
  const entry = diagnosticDocuments.find((document) => document.slug === slug);
  if (!entry) return null;
  const image = DIAGNOSTIC_IMAGES[slug];
  const intro = entry.blocks.find((block) => block.type === "paragraph")?.text;
  return (
    <>
      <section className="bg-about-mint">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2">
          <div>
            <DiagnosticsIcon title={entry.title} icon={entry.icon} className="bg-about-icon text-about-teal size-12 rounded-full" />
            <h1 className="text-about-ink mt-5 text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{entry.title} в Бишкеке</h1>
            <p className="text-about-copy mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">{SHORT_INTROS[slug] ?? intro}</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-green text-brand-white hover:bg-brand-green-dark mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3.5 font-extrabold transition-colors"><CalendarCheck className="size-5" /> Записаться</a>
          </div>
          {image && <img src={image} alt={entry.title} width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl border border-about-line object-cover" />}
        </div>
      </section>
      {renderBlocks(entry.blocks)}
      <div className="bg-about-canvas py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link to="/diagnostika" className="text-about-teal inline-flex font-bold hover:underline">← Все направления диагностики</Link>
      </div></div>
    </>
  );
}
