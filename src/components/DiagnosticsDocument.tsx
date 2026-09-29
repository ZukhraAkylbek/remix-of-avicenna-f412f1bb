import { Link } from "@tanstack/react-router";
import { CalendarCheck, Clock3, Plus } from "lucide-react";
import documentContent from "@/data/diagnostics-document.json";
import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { BOOKING_URL } from "@/lib/site-config";

export const diagnosticDocuments = documentContent;

type DocumentBlock = (typeof documentContent)[number]["blocks"][number];

function renderBlocks(blocks: DocumentBlock[]) {
  const sections: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length;) {
    const block = blocks[index];

    if (block.type === "heading" && block.text.toLowerCase().includes("график работы")) {
      let end = index + 1;
      while (end < blocks.length && blocks[end].type !== "heading") end++;
      sections.push(
        <section key={index} className="border-about-line bg-about-mint mt-10 rounded-2xl border p-5 sm:p-7">
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
        </section>
      );
      index = end;
      continue;
    }

    if (block.type === "heading" && block.text === "Часто задаваемые вопросы") {
      let end = index + 1;
      while (end < blocks.length && blocks[end].type !== "heading") end++;
      const answers: { title: string; text: string[] }[] = [];
      for (const item of blocks.slice(index + 1, end)) {
        if (item.type === "question") answers.push({ title: item.text, text: [] });
        else if (answers.length) answers[answers.length - 1].text.push(item.text);
      }
      sections.push(
        <section key={index} className="mt-12">
          <h2 className="text-about-ink text-2xl font-bold sm:text-3xl">{block.text}</h2>
          <div className="mt-6 grid items-start gap-3 lg:grid-cols-2">
            {answers.map((answer) => <details key={answer.title} className="group border-about-line bg-card rounded-2xl border">
              <summary className="text-about-ink flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold [&::-webkit-details-marker]:hidden">
                <span>{answer.title}</span><Plus className="text-about-teal size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <div className="text-about-copy space-y-2 px-4 pb-4 text-sm leading-relaxed">{answer.text.map((text, answerIndex) => <p key={answerIndex}>{text}</p>)}</div>
            </details>)}
          </div>
        </section>
      );
      index = end;
      continue;
    }

    if (block.type === "heading") sections.push(<h2 key={index} className="text-about-ink pt-8 text-2xl font-bold sm:text-3xl">{block.text}</h2>);
    else if (block.type === "question") sections.push(<h3 key={index} className="text-about-ink pt-5 text-lg font-bold">{block.text}</h3>);
    else if (block.type === "bullet") sections.push(<p key={index} className="text-about-copy flex gap-3 pl-2 leading-relaxed"><span className="text-about-teal">•</span><span>{block.text}</span></p>);
    else sections.push(<p key={index} className="text-about-copy leading-relaxed">{block.text}</p>);
    index++;
  }
  return sections;
}

export function DiagnosticsDocument({ slug }: { slug: string }) {
  const entry = diagnosticDocuments.find((document) => document.slug === slug);
  if (!entry) return null;
  return (
    <>
      <section className="border-b border-border bg-surface-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <DiagnosticsIcon title={entry.title} icon={entry.icon} />
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">{entry.title} в Бишкеке</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{entry.blocks.find((block) => block.type === "paragraph")?.text}</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90"><CalendarCheck className="size-5" /> Уточнить условия</a>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="space-y-4">{renderBlocks(entry.blocks)}</div>
        <Link to="/diagnostika" className="mt-12 inline-flex font-bold text-primary hover:underline">← Все направления диагностики</Link>
      </div>
    </>
  );
}