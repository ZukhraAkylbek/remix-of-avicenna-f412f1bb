import { Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import documentContent from "@/data/diagnostics-document.json";
import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { BOOKING_URL } from "@/lib/site-config";

export const diagnosticDocuments = documentContent;

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
        <div className="space-y-4">
          {entry.blocks.map((block, index) => {
            if (block.type === "heading") return <h2 key={index} className="pt-8 text-2xl font-extrabold text-foreground sm:text-3xl">{block.text}</h2>;
            if (block.type === "question") return <h3 key={index} className="pt-5 text-lg font-bold text-foreground">{block.text}</h3>;
            if (block.type === "bullet") return <p key={index} className="flex gap-3 pl-2 leading-relaxed text-muted-foreground"><span className="text-primary">•</span><span>{block.text}</span></p>;
            return <p key={index} className="leading-relaxed text-muted-foreground">{block.text}</p>;
          })}
        </div>
        <Link to="/diagnostika" className="mt-12 inline-flex font-bold text-primary hover:underline">← Все направления диагностики</Link>
      </div>
    </>
  );
}