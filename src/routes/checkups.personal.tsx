import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarCheck, Check, ChevronDown, ShoppingBasket } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckupIcon } from "@/components/checkups/CheckupIcon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/clinic";
import { checkupCardsQueryOptions, parseSections } from "@/lib/checkups.queries";
import type { CheckupCard } from "@/lib/checkups.server";
import { BOOKING_URL } from "@/lib/site-config";

const TITLE = "Персональный чекап — Авиценна";
const DESCRIPTION =
  "Соберите персональную программу обследования: основной пакет и дополнительные направления с автоматическим расчётом стоимости.";

export const Route = createFileRoute("/checkups/personal")({
  loader: ({ context }) => context.queryClient.ensureQueryData(checkupCardsQueryOptions()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/checkups/personal") || "/checkups/personal" }],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-6">{String((error as Error)?.message ?? error)}</div>
  ),
  notFoundComponent: () => <div className="p-6">Не найдено</div>,
  component: PersonalCheckupPage,
});

const TONE = {
  female: "border-surface-red bg-surface-red/70",
  male: "border-surface-sky bg-surface-sky/80",
  common: "border-about-line bg-about-canvas",
} as const;

/** «39 000 сом» → 39000 */
function priceOf(card: CheckupCard) {
  return parseInt((card.price ?? "").replace(/\D/g, ""), 10) || 0;
}

function audienceOf(card: CheckupCard): "female" | "male" | "common" {
  return card.icon === "female" ? "female" : card.icon === "male" ? "male" : "common";
}

function formatSom(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сом`;
}

function PersonalCheckupPage() {
  const { data: cards } = useSuspenseQuery(checkupCardsQueryOptions());

  const base = useMemo(() => cards.find((c) => c.badge === "personal") ?? null, [cards]);
  const extraCards = useMemo(() => cards.filter((c) => c.badge === "extra"), [cards]);
  const labCards = useMemo(() => cards.filter((c) => c.badge === "lab"), [cards]);
  const optionCards = useMemo(() => [...extraCards, ...labCards], [extraCards, labCards]);

  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const total = useMemo(
    () =>
      (base ? priceOf(base) : 0) +
      optionCards
        .filter((item) => selected.includes(item.slug))
        .reduce((sum, item) => sum + priceOf(item), 0),
    [base, optionCards, selected],
  );

  const bookingHref = useMemo(() => {
    const chosen = optionCards.filter((item) => selected.includes(item.slug));
    const lines = [
      "Здравствуйте! Хочу записаться на персональный чекап:",
      `• ${base?.title ?? "Персональный чекап"} — ${formatSom(base ? priceOf(base) : 0)}`,
      ...chosen.map((item) => `• ${item.title} — ${formatSom(priceOf(item))}`),
      `Итого: ${formatSom(total)}`,
    ];
    return `https://wa.me/996779909009?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [base, optionCards, selected, total]);

  const toggle = (id: string, checked: boolean) => {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((selectedId) => selectedId !== id),
    );
  };

  const renderOptions = (items: CheckupCard[]) => (
    <div className="mt-4 space-y-3">
      {items.map((item) => {
        const checked = selected.includes(item.slug);
        const open = expanded === item.slug;
        const sections = parseSections(item.includes);
        return (
          <div key={item.slug}>
            <label
              className={`${TONE[audienceOf(item)]} flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors`}
            >
              <span className="bg-background text-about-teal grid size-10 shrink-0 place-items-center rounded-full">
                <CheckupIcon name={item.icon ?? ""} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-about-ink block text-sm font-bold sm:text-base">
                  {item.title}
                </span>
                {item.price_note && (
                  <span className="text-about-copy mt-0.5 block text-xs">{item.price_note}</span>
                )}
              </span>
              <span className="text-about-copy shrink-0 text-xs font-semibold sm:text-sm">
                +{formatSom(priceOf(item))}
              </span>
              <Button
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-label={`Добавить ${item.title}`}
                variant="outline"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  toggle(item.slug, !checked);
                }}
                className={`size-6 shrink-0 rounded-md p-0 shadow-none ${
                  checked
                    ? "border-brand-green bg-brand-green text-brand-white hover:bg-brand-green-dark hover:text-brand-white"
                    : "border-about-teal bg-background text-transparent hover:bg-about-icon"
                }`}
              >
                <Check className="size-4" />
              </Button>
            </label>
            {sections.length > 0 && (
              <button
                type="button"
                onClick={() => setExpanded(open ? null : item.slug)}
                className="text-about-teal mt-1 inline-flex items-center gap-1 px-1 text-xs font-bold underline-offset-2 hover:underline"
              >
                Состав
                <ChevronDown
                  className={`size-3 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            )}
            {open && (
              <div className="border-about-line bg-background mt-2 rounded-2xl border p-4">
                {sections.map((section) => (
                  <div key={section.title} className={section === sections[0] ? "" : "mt-4"}>
                    <p className="text-about-ink text-sm font-extrabold">
                      {section.title}
                      <span className="text-about-copy ml-2 text-xs font-semibold">
                        {section.items.length}
                      </span>
                    </p>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {section.items.map((line) => (
                        <li key={line} className="text-about-copy flex items-start gap-2 text-sm">
                          <Check className="text-brand-green mt-0.5 size-4 shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-about-canvas">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Чекапы", href: "/checkups" }, { label: "Персональный чекап" }]} />
      <main className="pb-44 sm:pb-36">
        <section className="bg-about-mint border-about-line border-y">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
            <p className="text-about-teal text-xs font-bold uppercase">Конструктор программы</p>
            <h1 className="text-about-ink mt-3 text-3xl font-extrabold sm:text-4xl">
              Соберите персональный чекап
            </h1>
            <p className="text-about-copy mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              Основной пакет уже включён. Отметьте дополнительные направления — итоговая стоимость
              пересчитается автоматически.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
          {base && (
            <div className="border-brand-green bg-about-mint flex items-center justify-between gap-4 rounded-2xl border-2 p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="bg-brand-green text-brand-white grid size-11 shrink-0 place-items-center rounded-full">
                  <Check className="size-5" />
                </span>
                <div>
                  <h2 className="text-about-ink text-base font-extrabold sm:text-lg">
                    {base.title}
                  </h2>
                  <p className="text-about-copy mt-1 text-xs sm:text-sm">
                    {base.subtitle ?? base.body ?? ""}
                  </p>
                  {base.price_note && (
                    <p className="text-about-copy mt-1 text-xs">{base.price_note}</p>
                  )}
                </div>
              </div>
              <strong className="text-about-ink shrink-0 text-sm sm:text-base">
                {formatSom(priceOf(base))}
              </strong>
            </div>
          )}

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-about-ink text-2xl font-extrabold">Дополните программу</h2>
              <p className="text-about-copy mt-2 text-sm">Можно выбрать несколько пакетов.</p>
            </div>
            {selected.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="text-about-teal hover:bg-about-icon hover:text-about-ink"
                onClick={() => setSelected([])}
              >
                Сбросить
              </Button>
            )}
          </div>

          {extraCards.length > 0 && (
            <>
              <h3 className="text-about-ink mt-6 text-lg font-extrabold">Дополнительные пакеты</h3>
              {renderOptions(extraCards)}
            </>
          )}

          {labCards.length > 0 && (
            <>
              <h3 className="text-about-ink mt-8 text-lg font-extrabold">Лабораторные пакеты</h3>
              {renderOptions(labCards)}
            </>
          )}
        </section>
      </main>

      <div className="border-about-line bg-background/95 fixed inset-x-0 bottom-[64px] z-[60] border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:bottom-0">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="bg-about-icon text-about-teal grid size-10 place-items-center rounded-full">
              <ShoppingBasket className="size-5" />
            </span>
            <div>
              <p className="text-about-copy text-xs">Итого · {selected.length + 1} пак.</p>
              <p className="text-about-ink text-xl font-extrabold">{formatSom(total)}</p>
            </div>
          </div>
          <Button asChild className="h-11 rounded-xl bg-brand-green px-5 font-bold text-brand-white hover:bg-brand-green-dark">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-4" />
              Записаться
            </a>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
