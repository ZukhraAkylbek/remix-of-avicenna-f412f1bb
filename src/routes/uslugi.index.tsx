import { useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, FlaskConical, MapPin, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { ScrollArrowPair } from "@/components/ScrollArrows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { servicePagesQueryOptions } from "@/lib/services.queries";
import { SERVICE_LINKS } from "@/lib/uslugi-pages";

const TITLE = "Услуги клиники «Авиценна» в Бишкеке — полный список";
const DESCRIPTION =
  "Все услуги клиники «Авиценна»: диагностика, консультации специалистов, хирургия, анализы, стационар, услуги на дому, вакцинация, физиотерапия, рассрочка.";

export const Route = createFileRoute("/uslugi/")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(servicePagesQueryOptions());
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/uslugi") || "/uslugi" }],
  }),
  component: ServicesIndex,
});

/** Базовый спектр услуг — показываем, пока список из админки пуст. */
const FALLBACK_SERVICES: { title: string; summary: string; icon: string }[] = [
  { title: "Приём специалистов", summary: "Консультации врачей 20+ направлений", icon: "Stethoscope" },
  { title: "Лабораторные анализы", summary: "Более 1000 видов исследований", icon: "FlaskConical" },
  { title: "УЗИ диагностика", summary: "Экспертный класс оборудования", icon: "ScanLine" },
  { title: "КТ", summary: "Высокоточная лучевая диагностика", icon: "Brain" },
  { title: "Рентген", summary: "Цифровой рентген без очередей", icon: "Bone" },
  { title: "ЭКГ и холтер", summary: "Функциональная диагностика сердца", icon: "HeartPulse" },
  { title: "Хирургия", summary: "Плановые и малоинвазивные операции", icon: "Scissors" },
  { title: "Стационар", summary: "Круглосуточное наблюдение и уход", icon: "BedDouble" },
  { title: "Травмпункт", summary: "Помощь при травмах 24/7", icon: "Ambulance" },
  { title: "ДЛТ Сомнография", summary: "Диагностика нарушений сна", icon: "Moon" },
  { title: "Диагностика", summary: "Комплексные обследования организма", icon: "Stethoscope" },
  { title: "Ведение беременности", summary: "Сопровождение на всех сроках", icon: "Baby" },
  { title: "Вакцинация", summary: "Детям и взрослым по календарю", icon: "Syringe" },
  { title: "Физиотерапия", summary: "Реабилитация и восстановление", icon: "Activity" },
  { title: "Чекапы", summary: "Комплексные программы здоровья", icon: "ClipboardCheck" },
  { title: "Услуги на дому", summary: "Врач и забор анализов на выезде", icon: "Home" },
  { title: "Эндоскопия", summary: "Гастро- и колоноскопия во сне", icon: "Microscope" },
  { title: "Рассрочка", summary: "Лечение сейчас — оплата частями", icon: "CreditCard" },
];

const POPULAR = [
  {
    title: "КТ диагностика",
    text: "Высокоточная диагностика на современном оборудовании",
    image: "/assets/svc-uzi.jpg",
    tone: "pastel-sky",
  },
  {
    title: "УЗИ экспертного класса",
    text: "Опытные специалисты и точные результаты",
    image: "/assets/svc-uzi.jpg",
    tone: "pastel-mint",
  },
  {
    title: "Анализы",
    text: "Более 1000 видов лабораторных исследований",
    image: "/assets/svc-analizy.jpg",
    tone: "pastel-sand",
  },
  {
    title: "Приём врача",
    text: "Консультации специалистов по всем направлениям",
    image: "/assets/svc-priem.jpg",
    tone: "pastel-peach",
  },
];

const PROMOS = [
  {
    tone: "pastel-mint",
    title: "Для детей",
    text: "медицинских услуг для вас и вашей семьи",
    image: "/assets/asian-family-hero.webp",
  },
  {
    tone: "pastel-peach",
    title: "Для беременных",
    text: "Ведение беременности на всех этапах",
    image: "/assets/svc-pregnancy.jpg",
  },
  {
    tone: "pastel-sky",
    title: "Для пациентов 60+",
    text: "Забота о здоровье каждого члена семьи",
    image: "/assets/promo-family-all.jpg",
  },
];

const NEWS = [
  {
    tone: "pastel-sky",
    title: "ДЛТ 24/7 — дробление камней без операции",
    text: "Самый современный метод лечения камней в почках",
    cta: "Записаться на ДЛТ",
    href: BOOKING_URL,
    image: "/assets/news-dlt.jpg",
  },
  {
    tone: "pastel-mint",
    title: "Процедурная 24/7",
    text: "Капельницы и уколы под наблюдением медицинского специалиста — в любое время суток.",
    cta: "Узнать подробнее",
    href: BOOKING_URL,
    image: "/assets/news-procedurnaya.jpg",
  },
  {
    tone: "pastel-peach",
    title: "«Биринчи байлык…» с Керималиевой Жыпар, основателем клиники Авиценна",
    text: "Смотрите подкаст «Авиценны» на YouTube — о здоровье, профилактике и лечении вместе с врачами и приглашёнными специалистами.",
    cta: "Смотреть выпуски на YouTube",
    href: "https://www.youtube.com/@avicenna",
    image: "/assets/news-podcast.jpg",
  },
];

const SHORTCUTS = [
  { icon: CalendarCheck, title: "Записаться на приём", text: "Онлайн запись 24/7", href: BOOKING_URL },
  { icon: MessageCircle, title: "Получить консультацию", text: "Ответим на ваши вопросы", href: BOOKING_URL },
  { icon: FlaskConical, title: "Результаты анализов и диагностики", text: "Смотрите онлайн", href: BOOKING_URL },
  { icon: MapPin, title: "Адреса филиалов", text: "6 филиалов в Бишкеке", href: "/#filialy" },
];

/** Карточка-фото «Вариант 1»: текст и зелёная стрелка сверху, фото во всю нижнюю часть с мягким градиентом цвета карточки. */
const TONE_START: Record<string, string> = {
  "pastel-mint": "var(--pastel-mint-start)",
  "pastel-sky": "var(--pastel-sky-start)",
  "pastel-sand": "var(--pastel-sand-start)",
  "pastel-peach": "var(--pastel-peach-start)",
  "pastel-coral": "var(--pastel-coral-start)",
  "pastel-lavender": "var(--pastel-lavender-start)",
};

function PhotoCard({
  item,
  large = false,
  className,
}: {
  item: { title: string; text: string; image: string; tone: string };
  large?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`${item.tone} group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className ?? ""}`}
    >
      <div className="relative z-10 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={`text-foreground font-extrabold leading-tight ${large ? "text-3xl sm:text-4xl" : "text-[15px]"}`}
            >
              {item.title}
            </h3>
            <p className="text-foreground/70 mt-1 text-xs leading-relaxed">{item.text}</p>
          </div>
          <span className="bg-brand-green text-brand-white grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="relative mt-auto">
        <img
          src={item.image}
          alt={item.title}
          width={1024}
          height={640}
          loading="lazy"
          className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-32"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${TONE_START[item.tone] ?? "white"}, transparent)`,
          }}
        />
      </div>
    </article>
  );
}

/** Карточка новости с фото: текст и CTA сверху, фото снизу с мягким градиентом. */
function NewsPhotoCard({
  item,
  className,
}: {
  item: { title: string; text: string; cta: string; href: string; image: string; tone: string };
  className?: string;
}) {
  const external = item.href.startsWith("http");
  return (
    <article
      className={`${item.tone} group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className ?? ""}`}
    >
      <div className="relative z-10 p-4">
        <h3 className="text-foreground text-[15px] font-extrabold leading-snug">{item.title}</h3>
        <p className="text-foreground/70 mt-1.5 text-xs leading-relaxed">{item.text}</p>
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-brand-green mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:underline"
        >
          {item.cta}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
      <div className="relative mt-auto">
        <img
          src={item.image}
          alt={item.title}
          width={1024}
          height={640}
          loading="lazy"
          className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-32"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${TONE_START[item.tone] ?? "white"}, transparent)`,
          }}
        />
      </div>
    </article>
  );
}

/** Автопрокрутка популярных услуг в адаптиве + ручные стрелки. */
function PopularMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);

  const scrollBy = (dir: -1 | 1) => {
    setManual(true);
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  // Бесконечная лента: контент продублирован ×2, при достижении
  // середины/края незаметно переносим скролл на эквивалентное место.
  const handleLoop = () => {
    const el = scrollerRef.current;
    if (!el || !manual) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  };

  return (
    <div className="relative lg:hidden">
      <ScrollArrowPair onScroll={scrollBy} label="Прокрутить популярные услуги" />

      <div
        ref={scrollerRef}
        onScroll={handleLoop}
        className="group marquee-mask no-scrollbar relative overflow-x-auto scroll-smooth px-12 py-1"
      >
        <div className={`${manual ? "" : "marquee-track"} flex w-max gap-4 pr-4`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
              {POPULAR.map((item) => (
                <PhotoCard key={`p-${copy}-${item.title}`} item={item} className="w-[260px]" />
              ))}
              {NEWS.map((item) => (
                <NewsPhotoCard key={`n-${copy}-${item.title}`} item={item} className="w-[260px]" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesIndex() {
  const { data: services } = useSuspenseQuery(servicePagesQueryOptions());
  const hasServices = services.length > 0;

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader breadcrumb="Услуги" />
      <Breadcrumbs items={[{ label: "Услуги" }]} />

      <main>
        {/* Хиро с фотографией на фоне */}
        <section className="relative overflow-hidden">
          <img
            src="/assets/uslugi-hero.jpg"
            alt="Врач и пациент в клинике «Авиценна»"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1600}
            height={900}
            decoding="sync"
            fetchPriority="high"
          />
          <div className="from-background/95 via-background/85 to-background/45 absolute inset-0 bg-gradient-to-r" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
            <Reveal className="max-w-xl">
              <h1 className="text-foreground text-4xl leading-[1.1] font-extrabold sm:text-6xl">
                Услуги
              </h1>
              <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed sm:text-lg">
                Более 410 медицинских услуг
                <br />
                для вас и вашей семьи
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-brand-white mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-transform duration-300 hover:-translate-y-0.5 sm:text-base"
              >
                Записаться на приём
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Весь спектр услуг */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-foreground text-xl font-extrabold sm:text-2xl">Весь спектр услуг</h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {hasServices
                ? services.map((service, index) => (
                    <Reveal key={service.slug} delay={index * 30}>
                      <Link
                        to="/uslugi/$slug"
                        params={{ slug: service.slug }}
                        className="border-border hover:border-brand-green group flex h-full items-start gap-2.5 rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
                      >
                        <DiagnosticsIcon
                          icon={service.icon}
                          title={service.title}
                          className="size-9 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:size-11"
                        />
                        <span className="min-w-0">
                          <span className="text-foreground block text-[13px] leading-snug font-bold hyphens-auto break-words sm:text-[15px] sm:hyphens-none">
                            {service.title}
                          </span>
                          {service.summary && (
                            <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                              {service.summary}
                            </span>
                          )}
                        </span>
                      </Link>
                    </Reveal>
                  ))
                : FALLBACK_SERVICES.map((service, index) => {
                    const href = SERVICE_LINKS[service.title] ?? BOOKING_URL;
                    const external = href.startsWith("http");
                    return (
                    <Reveal key={service.title} delay={index * 30}>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="border-border hover:border-brand-green group flex h-full items-start gap-2.5 rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
                      >
                        <DiagnosticsIcon
                          icon={service.icon}
                          title={service.title}
                          className="size-9 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:size-11"
                        />
                        <span className="min-w-0">
                          <span className="text-foreground block text-[13px] leading-snug font-bold hyphens-auto break-words sm:text-[15px] sm:hyphens-none">
                            {service.title}
                          </span>
                          <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                            {service.summary}
                          </span>
                        </span>
                      </a>
                    </Reveal>
                    );
                  })}
            </div>
          </div>
        </section>

        {/* Популярные услуги */}
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-foreground text-xl font-extrabold sm:text-2xl">Популярные услуги</h2>

            <div className="mt-6">
              <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
                {POPULAR.map((item, index) => (
                  <Reveal key={item.title} delay={index * 60}>
                    <PhotoCard item={item} />
                  </Reveal>
                ))}
                {NEWS.map((item, index) => (
                  <Reveal key={item.title} delay={(POPULAR.length + index) * 60}>
                    <NewsPhotoCard item={item} />
                  </Reveal>
                ))}
              </div>
              <PopularMarquee />

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {PROMOS.map((promo, index) => (
                  <Reveal key={promo.title} delay={index * 70}>
                    <PhotoCard item={promo} large />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SHORTCUTS.map((item, index) => (
                <Reveal key={item.title} delay={index * 50}>
                  <a
                    href={item.href}
                    className="border-border hover:border-brand-green group flex h-full items-start gap-3 rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="bg-surface-soft text-brand-green grid size-11 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-foreground block text-[15px] font-bold">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">{item.text}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FaqAccordion />
      </main>

      <SiteFooter />
    </div>
  );
}
