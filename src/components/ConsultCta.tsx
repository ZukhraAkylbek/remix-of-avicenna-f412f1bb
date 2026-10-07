import { Check } from "lucide-react";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SectionHeading } from "@/components/SectionHeading";
import { BOOKING_URL } from "@/lib/site-config";
import { specialtiesQueryOptions } from "@/lib/specialties.queries";

const BENEFITS = [
  "Первичная консультация без ожидания",
  "Приём по записи, без очереди",
  "Все специалисты в одном месте",
];

export function ConsultCta({ defaultSlug }: { defaultSlug?: string }) {
  const { data: specialties } = useSuspenseQuery(specialtiesQueryOptions());
  const [sent, setSent] = useState(false);

  return (
    <section id="zapis" className="bg-about-mint py-8 sm:py-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Консультация"
            title="Нужна консультация врача?"
            description="Оставьте заявку — администратор перезвонит в течение 15 минут и подберёт удобное время."
          />
          <ul className="mt-8 space-y-3">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="bg-about-icon text-about-teal grid size-6 shrink-0 place-items-center rounded-full">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-about-ink text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="bg-card border-about-line rounded-2xl border p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <p className="text-about-ink text-lg font-bold">Форма записи</p>

          <label className="mt-5 block">
            <span className="text-about-copy text-sm">Ваше имя</span>
            <input
              required
              name="name"
              className="border-about-line focus:border-brand-green mt-1.5 w-full rounded-md border px-4 py-3 text-base outline-none"
              placeholder="Как к вам обращаться"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-about-copy text-sm">Номер телефона</span>
            <input
              required
              type="tel"
              name="phone"
              className="border-about-line focus:border-brand-green mt-1.5 w-full rounded-md border px-4 py-3 text-base outline-none"
              placeholder="+996 ___ ___ ___"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-about-copy text-sm">Направление</span>
            <select
              name="specialty"
              defaultValue={defaultSlug ?? ""}
              className="border-about-line focus:border-brand-green mt-1.5 w-full rounded-md border bg-transparent px-4 py-3 text-base outline-none"
            >
              <option value="">Выберите направление</option>
              {specialties.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="bg-brand-green text-brand-white hover:bg-brand-green-dark mt-6 w-full rounded-md px-6 py-4 text-base font-semibold transition-colors"
          >
            {sent ? "Заявка отправлена" : "Отправить заявку"}
          </button>

          <p className="text-about-copy mt-3 text-xs">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Или{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-about-teal font-semibold underline"
            >
              запишитесь онлайн
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
