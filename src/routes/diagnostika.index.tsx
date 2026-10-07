import { BannerSlider } from "@/components/BannerSlider";
import { PAGE_BANNERS } from "@/lib/page-banners";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck } from "lucide-react";

import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { diagnosticDocuments, SHORT_INTROS } from "@/components/DiagnosticsDocument";
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
    <div className="bg-about-canvas min-h-screen">
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
  // Fallbacks so the page renders even when the database has no content yet
  const fb = (title: string, subtitle: string | null = null) =>
    ({ title, subtitle, body: null, primary_label: null, primary_url: null, secondary_label: null, secondary_url: null, image_url: null }) as any;
  const hero = section("hero") ?? fb("Диагностика в Бишкеке", "УЗИ, КТ, рентген, ЭКГ, лабораторные анализы и эндоскопия в сети клиник «Авиценна».");
  const navigator = section("navigator");
  const catalog = section("catalog") ?? fb("Виды исследований", "Выберите исследование, чтобы узнать подробности и подготовку.");
  const advantages = section("advantages");
  const cta = section("cta") ?? fb("Запишитесь на диагностику", "Подберём удобное время и филиал.");

  const documentCategories: Record<string, string> = {
    kt: "xray", rentgen: "xray", uzi: "uzi", ekg: "funk", holter: "funk",
    "ehokg-doppler": "funk", endoskopiya: "endo", "dyhatelny-test": "funk",
    "laboratornaya-diagnostika": "lab", spirometriya: "funk", videokolposkopiya: "funk",
  };
  const filtered = useMemo(() => diagnosticDocuments.filter((item) => !activeCategory || documentCategories[item.slug] === activeCategory), [activeCategory]);

  const bookingUrl = hero?.primary_url || BOOKING_URL;

  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Диагностика" }]} />
      <main>
        {hero && (
          <section className="bg-about-mint">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
                <div>
                  <h1 className="text-about-ink text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {hero.title}
                  </h1>
                  {hero.subtitle && (
                    <p className="text-about-copy mt-5 max-w-2xl text-[17px] leading-relaxed sm:text-[19px]">
                      {hero.subtitle}
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-green text-brand-white hover:bg-brand-green-dark inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[16px] font-extrabold transition-colors"
                    >
                      <CalendarCheck className="size-5" strokeWidth={2.2} />
                      {hero.primary_label ?? "Записаться на диагностику"}
                    </a>
                    <ContactButtons />
                    {hero.secondary_label && hero.secondary_url && (
                      <a
                        href={hero.secondary_url}
                        className="border-about-line text-about-ink hover:border-brand-green inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[16px] font-extrabold transition-colors"
                      >
                        {hero.secondary_label}
                      </a>
                    )}
                  </div>
                </div>

                {(
                  <div className="relative h-44 overflow-hidden rounded-2xl sm:h-64 lg:h-full">
                    <BannerSlider
                      slides={
                        hero.image_url
                          ? [{ image: hero.image_url, alt: "Диагностика в клинике «Авиценна»" }, ...PAGE_BANNERS.diagnostika.slice(0, 2)]
                          : PAGE_BANNERS.diagnostika
                      }
                    />
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {catalog && (
          <section id="catalog" className="bg-about-canvas">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
              <h2 className="text-about-ink text-2xl font-extrabold tracking-tight sm:text-3xl">
                {catalog.title}
              </h2>
              {catalog.subtitle && (
                <p className="text-about-copy mt-3 max-w-3xl text-[17px] leading-relaxed">
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
                        ? "bg-brand-green text-brand-white"
                        : "bg-about-icon text-about-teal",
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
                          ? "bg-brand-green text-brand-white"
                          : "bg-about-icon text-about-teal",
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
                      className="group border-about-line bg-card hover:border-brand-green relative flex h-full flex-row items-center gap-3 overflow-hidden rounded-2xl border p-4 transition-all sm:flex-col sm:items-stretch sm:p-6"
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
                      <h3 className="text-about-ink relative mt-0 text-base leading-tight font-extrabold tracking-tight sm:mt-5 sm:text-[21px]">
                        {item.title}
                      </h3>
                      <p className="text-about-copy relative mt-2 hidden line-clamp-3 text-[14px] leading-snug font-medium sm:block sm:text-[15px]">
                        {item.blocks.find((block) => block.type === "paragraph")?.text}
                      </p>

                      <div className="relative mt-auto hidden items-end justify-between gap-3 pt-5 sm:flex sm:pt-6">
                        <span className="text-about-teal text-[14px] font-extrabold sm:text-[15px]">
                        Подробнее
                        </span>
                        <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-1">
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                      <ArrowRight className="text-about-teal ml-auto size-5 shrink-0 sm:hidden" aria-hidden="true" />
                    </Link>
                  </Reveal>
                ))}
              </div>


              {filtered.length === 0 && (
                <p className="text-about-copy mt-10 text-[16px]">
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
          <section className="bg-about-mint">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
              <div className="bg-card border-about-line rounded-2xl border px-6 py-10 sm:px-10 lg:py-14">
                <h2 className="text-about-ink text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {advantages.title}
                </h2>
                {advantages.subtitle && (
                  <p className="text-about-copy mt-4 max-w-3xl text-[17px] leading-relaxed">
                    {advantages.subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {cta && (
          <section className="bg-about-canvas">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
              <h2 className="text-about-ink text-2xl font-extrabold tracking-tight sm:text-3xl">
                {cta.title}
              </h2>
              {cta.subtitle && (
                <p className="text-about-copy mt-3 max-w-2xl text-[17px] leading-relaxed">
                  {cta.subtitle}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={cta.primary_url || BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-brand-white hover:bg-brand-green-dark inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[16px] font-extrabold transition-colors"
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
