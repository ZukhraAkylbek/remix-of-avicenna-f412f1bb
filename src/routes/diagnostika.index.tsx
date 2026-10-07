import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck } from "lucide-react";

import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { diagnosticDocuments } from "@/components/DiagnosticsDocument";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { SymptomNavigator } from "@/components/SymptomNavigator";
import { absoluteUrl } from "@/lib/clinic";
import { diagnosticsPageQueryOptions } from "@/lib/diagnostics.queries";
import { BOOKING_URL } from "@/lib/site-config";
import { ContactButtons } from "@/components/ContactButtons";
import { cn } from "@/lib/utils";

const TITLE = "Диагностика в Бишкеке — УЗИ, КТ, анализы | Авиценна";
const DESCRIPTION =
  "Диагностика в клинике «Авиценна» в Бишкеке: УЗИ, КТ, рентген, ЭКГ, лабораторные анализы и эндоскопия. Выберите нужное исследование и уточните условия проведения.";

export const Route = createFileRoute("/diagnostika/")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(diagnosticsPageQueryOptions());
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/diagnostika") || "/diagnostika" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/diagnostika") || "/diagnostika" }],
  }),
  errorComponent: () => (
    <PageShell>
      <h1 className="text-3xl font-extrabold">Не удалось загрузить страницу диагностики</h1>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <h1 className="text-3xl font-extrabold">Страница не найдена</h1>
    </PageShell>
  ),
  component: DiagnosticsPage,
});

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Диагностика" }]} />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

function DiagnosticsPage() {
  const { data } = useSuspenseQuery(diagnosticsPageQueryOptions());
  const { sections, categories, symptoms } = data;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const section = (key: string) => sections.find((s) => s.key === key) ?? null;
  const hero = section("hero");
  const navigator = section("navigator");
  const catalog = section("catalog");
  const advantages = section("advantages");
  const cta = section("cta");

  const documentCategories: Record<string, string> = {
    kt: "xray", rentgen: "xray", uzi: "uzi", ekg: "funk", holter: "funk",
    "ehokg-doppler": "funk", endoskopiya: "endo", "dyhatelny-test": "funk",
    "laboratornaya-diagnostika": "lab", spirometriya: "funk", videokolposkopiya: "funk",
  };
  const filtered = useMemo(() => diagnosticDocuments.filter((item) => !activeCategory || documentCategories[item.slug] === activeCategory), [activeCategory]);

  const bookingUrl = hero?.primary_url || BOOKING_URL;

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Диагностика" }]} />
      <main>
        {hero && (
          <section className="border-border border-b">
            <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:py-16">

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
                <div>
                  <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
                    {hero.title}
                  </h1>
                  {hero.subtitle && (
                    <p className="text-muted-foreground mt-5 max-w-2xl text-[17px] leading-relaxed sm:text-[19px]">
                      {hero.subtitle}
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[16px] font-extrabold transition-colors"
                    >
                      <CalendarCheck className="size-5" strokeWidth={2.2} />
                      {hero.primary_label ?? "Записаться на диагностику"}
                    </a>
                    <ContactButtons />
                    {hero.secondary_label && hero.secondary_url && (
                      <a
                        href={hero.secondary_url}
                        className="border-border text-foreground hover:border-primary/50 inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-[16px] font-extrabold transition-colors"
                      >
                        {hero.secondary_label}
                      </a>
                    )}
                  </div>
                </div>

                {hero.image_url && (
                  <div className="overflow-hidden rounded-3xl sm:rounded-[2rem]">
                    <img
                      src={hero.image_url}
                      alt={hero.title}
                      loading="lazy"
                      className="h-44 w-full object-cover sm:h-64 lg:h-full"
                    />
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {catalog && (
          <section id="catalog" className="border-border border-b">
            <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:py-16">
              <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                {catalog.title}
              </h2>
              {catalog.subtitle && (
                <p className="text-muted-foreground mt-3 max-w-3xl text-[17px] leading-relaxed">
                  {catalog.subtitle}
                </p>
              )}

              {categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-[15px] font-bold transition-colors",
                      activeCategory === null
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-soft text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Все направления
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.key)}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-[15px] font-bold transition-colors",
                        activeCategory === category.key
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-soft text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:auto-rows-fr sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => (
                  <Reveal key={item.slug} className="h-full">
                    <Link
                      to="/diagnostika/$slug"
                      params={{ slug: item.slug }}
                      className="group border-border bg-card hover:border-primary/40 relative flex h-full flex-row items-center gap-3 overflow-hidden rounded-3xl border p-4 transition-all hover:shadow-xl sm:flex-col sm:items-stretch sm:rounded-[1.75rem] sm:p-6"
                    >
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <DiagnosticsIcon
                            icon={item.icon}
                            title={item.title}
                            className="size-10 rounded-xl sm:size-12 sm:rounded-2xl"
                          />
                        </div>
                      </div>
                      <h3 className="text-foreground relative mt-0 text-base leading-tight font-extrabold tracking-tight sm:mt-5 sm:text-[21px]">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground relative mt-2 hidden line-clamp-3 text-[14px] leading-snug font-medium sm:block sm:text-[15px]">
                        {item.blocks.find((block) => block.type === "paragraph")?.text}
                      </p>

                      <div className="relative mt-auto hidden items-end justify-between gap-3 pt-5 sm:flex sm:pt-6">
                        <span className="text-primary text-[14px] font-extrabold sm:text-[15px]">
                        Подробнее
                        </span>
                        <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-1">
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                      <ArrowRight className="text-primary ml-auto size-5 shrink-0 sm:hidden" aria-hidden="true" />
                    </Link>
                  </Reveal>
                ))}
              </div>


              {filtered.length === 0 && (
                <p className="text-muted-foreground mt-10 text-[16px]">
                  В этой категории пока нет исследований.
                </p>
              )}
            </div>
          </section>
        )}

        {navigator && (
          <SymptomNavigator
            title={navigator.title}
            subtitle={navigator.subtitle}
            note={navigator.body}
            symptoms={symptoms}
          />
        )}

        {advantages && (
          <section className="border-border border-b">
            <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:py-16">
              <div className="bg-surface-soft rounded-[2rem] px-6 py-10 sm:px-10 lg:py-14">
                <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {advantages.title}
                </h2>
                {advantages.subtitle && (
                  <p className="text-muted-foreground mt-4 max-w-3xl text-[17px] leading-relaxed">
                    {advantages.subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {cta && (
          <section>
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
              <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                {cta.title}
              </h2>
              {cta.subtitle && (
                <p className="text-muted-foreground mt-3 max-w-2xl text-[17px] leading-relaxed">
                  {cta.subtitle}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={cta.primary_url || BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[16px] font-extrabold transition-colors"
              >
                <CalendarCheck className="size-5" strokeWidth={2.2} />
                {cta.primary_label ?? "Записаться онлайн"}
              </a>
              <ContactButtons />
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
