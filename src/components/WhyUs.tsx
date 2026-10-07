import { HeartHandshake, Microscope, Stethoscope } from "lucide-react";

import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { SectionHeading } from "@/components/SectionHeading";

const ADVANTAGES = [
  {
    icon: Stethoscope,
    title: "Опытные врачи",
    text: "Специалисты с опытом от 12 лет, стажировки в клиниках Москвы, Санкт-Петербурга и Германии.",
  },
  {
    icon: Microscope,
    title: "Современные методики",
    text: "Лапароскопия, эндоскопия, малоинвазивные вмешательства — минимальный разрез и быстрое восстановление.",
  },
  {
    icon: HeartHandshake,
    title: "Полное сопровождение",
    text: "Ведём пациента от первичного осмотра до реабилитации. Врач доступен для вопросов 24/7.",
  },
];

export function WhyUs({ title }: { title?: string }) {
  return (
    <section id="preimushchestva" className="bg-about-mint py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          ekey="why"
          eyebrow="Преимущества"
          title={title ?? "Почему пациенты выбирают «Авиценну»"}
        />
        <AdvantagesGrid items={ADVANTAGES} />
      </div>
    </section>
  );
}
