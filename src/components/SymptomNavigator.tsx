import { useState } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DiagnosticsSymptom } from "@/lib/diagnostics.server";

export function SymptomNavigator({
  title,
  subtitle,
  note,
  symptoms,
}: {
  title: string;
  subtitle?: string | null;
  note?: string | null;
  symptoms: DiagnosticsSymptom[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = symptoms.find((s) => s.id === activeId) ?? null;

  if (symptoms.length === 0) return null;

  return (
    <section id="navigator" className="bg-about-mint">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-about-teal text-[13px] font-extrabold tracking-[0.18em] uppercase">
          Навигатор
        </p>
        <h2 className="text-about-ink mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-about-copy mt-3 max-w-2xl text-[17px] leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
          {symptoms.map((symptom) => {
            const isActive = symptom.id === activeId;
            return (
              <button
                key={symptom.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive ? null : symptom.id)}
                className={cn(
                  "rounded-full border px-4 py-2.5 text-[14px] font-semibold transition-colors sm:px-5 sm:py-3 sm:text-[17px]",

                  isActive
                    ? "border-brand-green bg-brand-green text-brand-white"
                    : "bg-about-icon text-about-teal border-transparent",
                )}
              >
                {symptom.name}
              </button>
            );
          })}
        </div>

        {active && (
          <div className="border-about-line bg-card mt-8 flex items-start gap-3 rounded-2xl border px-5 py-5 sm:px-7">
            <Info className="text-about-teal mt-1 size-5 shrink-0" strokeWidth={2} />
            <p className="text-about-ink text-[17px] leading-relaxed sm:text-[19px]">
              По симптому <span className="font-extrabold">«{active.name}»</span>{" "}
              {active.recommendation}
            </p>
          </div>
        )}

        {note && <p className="text-about-copy mt-6 max-w-3xl text-[14px] leading-relaxed">* {note}</p>}
      </div>
    </section>
  );
}
