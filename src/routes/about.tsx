import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Award,
  HeartHandshake,
  Microscope,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import archiveTeam from "@/assets/about-archive-team.jpg.asset.json";
import archiveFounder from "@/assets/about-archive-founder.jpg.asset.json";
import teamToday from "@/assets/about-team-today.jpg.asset.json";
import clinicExterior from "@/assets/about-clinic-exterior.jpg";
import founderPortrait from "@/assets/founder-zhypar.png";
import receptionPhoto from "@/assets/about-reception.jpg";
import expresslabLogo from "@/assets/partners/expresslab-logo.svg";
import kokomerenLogo from "@/assets/partners/kokomeren-logo.png";
import corpusLogo from "@/assets/partners/corpus-logo.jpg.asset.json";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/clinic";

const STORY = [
  {
    year: "2000",
    title: "Начало истории",
    text: "В Бишкеке открылся первый медицинский центр «Авиценна». Так началась наша история заботы о пациентах.",
    image: archiveTeam.url,
    alt: "Архивный снимок команды медиков",
    caption: "Из архива клиники · точная дата снимка не указана",
  },
  {
    year: "2001",
    title: "Первые годы работы",
    text: "В основе «Авиценны» с первых лет — внимательное отношение к человеку и преданность медицинскому делу.",
    image: archiveFounder.url,
    alt: "Архивный портрет основательницы клиники",
    caption: "Из архива клиники · точная дата снимка не указана",
  },
  {
    year: "2005",
    title: "Расширение направлений",
    text: "В холдинге появились новые направления: поставка медицинской техники и производство мебели.",
    image: clinicExterior,
    alt: "Здание медицинского центра «Авиценна» сегодня",
    caption: "Современный снимок клиники",
  },
  {
    year: "Сегодня",
    title: "Продолжаем заботиться",
    text: "В сети работают более 100 специалистов; доступны диагностика, хирургия и круглосуточный стационар.",
    image: teamToday.url,
    alt: "Современная команда врачей «Авиценны»",
    caption: "Команда «Авиценны» сегодня",
  },
];

const PARTNERS = [
  {
    title: "Экспресс Плюс",
    text: "Лабораторная диагностика и анализы.",
    logo: expresslabLogo,
    alt: "Логотип лаборатории «Экспресс Плюс»",
    href: "https://expresslab.kg/",
    action: "На сайт лаборатории",
  },
  {
    title: "Кокомерен",
    text: "Продажа медицинской техники и лабораторных реагентов.",
    logo: kokomerenLogo,
    alt: "Логотип компании «Кокомерен»",
    href: "https://kokomeren.kg/",
    action: "На сайт компании",
  },
  {
    title: "Corpus",
    text: "Производство мебели.",
    logo: corpusLogo.url,
    alt: "Логотип мебельной компании Corpus",
    href: "https://kokomeren.kg/",
    action: "Подробнее",
  },
] satisfies Array<{ title: string; text: string; logo: string; alt: string; href: string; action: string }>;

const ADVANTAGES = [
  {
    icon: Stethoscope,
    title: "Более 100 специалистов",
    text: "Врачи различных специальностей.",
    href: "/vrachi",
    external: false,
  },
  {
    icon: HeartHandshake,
    title: "Круглосуточный терапевтический стационар",
    text: "Комфортные условия для лечения и наблюдения.",
    href: "/uslugi/statsionar",
    external: false,
  },
  {
    icon: ShieldCheck,
    title: "Хирургическое отделение",
    text: "Современные методики и опытные специалисты.",
    href: "/hirurgiya",
    external: false,
  },
  {
    icon: Microscope,
    title: "Собственная лаборатория Экспресс Плюс",
    text: "Быстрая и точная диагностика.",
    href: "https://expresslab.kg/",
    external: true,
  },
  {
    icon: Activity,
    title: "Медицинские чекапы",
    text: "Комплексные обследования для вашего здоровья.",
    href: "/checkups",
    external: false,
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  external: boolean;
}>;

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "О клинике «Авиценна» — заботимся о здоровье с 2000 года";
    const description =
      "История, миссия и преимущества сети клиник «Авиценна» в Бишкеке: более 100 специалистов, стационар, хирургия и собственная лаборатория.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: absoluteUrl("/about") || "/about" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absoluteUrl("/about") || "/about" }],
    };
  },
  component: AboutPage,
});

function LeafOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M17 87C55 65 86 39 119 10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M45 68C30 55 27 40 31 25c14 8 21 22 14 43Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M69 51C62 34 67 19 79 7c9 15 5 31-10 44Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M85 40c16-6 31-2 43 10-15 10-30 6-43-10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M105 22c14-7 28-6 41 3-12 11-27 10-41-3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-about-ink text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.75rem]">
      {children}
    </h2>
  );
}

function AboutPage() {
  return (
    <div className="bg-about-canvas min-h-screen font-sans">
      <SiteHeader breadcrumb="О нас" />
      <Breadcrumbs items={[{ label: "О нас" }]} />

      <main>
        <section className="bg-about-mint relative isolate min-h-[440px] overflow-hidden lg:min-h-[460px]">
          <div className="absolute inset-x-0 bottom-0 h-[55%] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[57%]">
            <img
              src={clinicExterior}
              alt="Современное здание медицинской клиники среди деревьев"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="size-full object-cover object-center"
            />
            <div className="from-about-mint absolute inset-0 bg-gradient-to-b from-15% via-about-mint/30 to-transparent lg:bg-gradient-to-r lg:from-0% lg:via-about-mint/40 lg:to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-[440px] max-w-7xl items-start px-4 pt-10 sm:px-6 sm:pt-12 lg:min-h-[460px] lg:items-center lg:pt-0">
            <Reveal className="relative z-10 max-w-2xl pb-56 lg:pb-0">
              <p className="font-display text-about-ink text-4xl leading-[1.13] font-extrabold sm:text-5xl lg:text-[3.2rem]">
                Мы заботимся о Вас
                <br />с 2000 года
              </p>
              <h1 className="font-display text-about-ink mt-3 text-2xl leading-tight font-extrabold sm:text-3xl lg:text-[2.25rem]">
                Биринчи байлык – ден соолук
              </h1>
              <p className="text-about-copy mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
                Современная многопрофильная медицинская сеть, которая объединяет опыт,
                профессионализм и заботу о каждом пациенте.
              </p>
            </Reveal>
          </div>

          <LeafOrnament className="text-about-ornament absolute bottom-3 left-3 z-10 w-32 opacity-60 sm:left-8 sm:w-40 lg:bottom-8" />
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Как создавалась «Авиценна»</SectionTitle>
            <p className="text-about-copy mt-3 max-w-2xl leading-relaxed">
              История сети — от первого кабинета до многопрофильной клиники. Лента движется сама, наведите курсор, чтобы остановить.
            </p>
          </div>
          <div className="group marquee-mask mt-8 overflow-hidden">
            <div className="marquee-track flex w-max gap-5 pr-5">
              {[...STORY, ...STORY].map(({ year, title, text, image, alt, caption }, index) => (
                <article
                  key={`${year}-${index}`}
                  aria-hidden={index >= STORY.length}
                  className="border-about-line bg-card flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border sm:w-80"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={image} alt={alt} loading="lazy" className="size-full object-cover" />
                    <span className="bg-about-canvas/90 text-about-teal absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-bold">
                      {year}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-about-ink text-lg font-bold">{title}</h3>
                    <p className="text-about-copy mt-2 flex-1 text-sm leading-relaxed">{text}</p>
                    <p className="text-about-copy mt-4 text-xs">{caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-about-mint py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Больше, чем сеть клиник</SectionTitle>
            <p className="text-about-copy mt-3 max-w-2xl leading-relaxed">Разные направления работы объединены одной целью — заботой о здоровье людей.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNERS.map(({ title, text, logo, alt, href, action }, index) => (
                <Reveal key={title} delay={index * 35} className="h-full">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title} — ${action}`} className="border-about-line bg-card hover:border-about-teal focus-visible:ring-about-teal group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2">
                    <div className="bg-card flex h-20 items-center justify-center">
                      <img src={logo} alt={alt} loading="lazy" className="max-h-full max-w-[220px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                    </div>
                    <div className="mt-4 flex flex-1 flex-col border-t border-about-line pt-4">
                      <h3 className="text-about-ink text-base font-bold">{title}</h3>
                      <p className="text-about-copy mt-1.5 flex-1 text-sm leading-relaxed">{text}</p>
                      <span className="text-about-teal mt-4 inline-flex items-center gap-1 text-sm font-semibold">{action}<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-10 sm:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <article className="border-about-line bg-card overflow-hidden rounded-2xl border lg:grid lg:grid-cols-[0.85fr_1.35fr]">
                <div className="bg-about-mint min-h-64 overflow-hidden rounded-b-[48%] lg:min-h-[380px] lg:rounded-r-[48%] lg:rounded-b-none">
                  <img
                    src={founderPortrait}
                    alt="Керималиева Жыпар Абдыказиевна — основательница сети клиник «Авиценна»"
                    width={973}
                    height={1298}
                    loading="lazy"
                    className="size-full object-cover object-top"
                  />
                </div>

                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_auto_1.1fr] lg:items-center lg:p-10">
                  <div>
                    <Award className="text-about-teal size-8" strokeWidth={1.5} aria-hidden="true" />
                    <h2 className="font-display text-about-ink mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">
                      «Главное — ден соолук!»
                    </h2>
                    <p className="text-about-ink mt-6 text-lg font-bold">
                      Керималиева Жыпар Абдыказиевна
                    </p>
                    <p className="text-about-copy mt-1.5 text-sm leading-relaxed">
                      Основательница сети клиник «Авиценна»
                    </p>
                  </div>

                  <div className="bg-about-line h-px w-full lg:h-full lg:min-h-56 lg:w-px" />

                  <div>
                    <p className="text-about-ink text-lg leading-relaxed sm:text-xl">
                      С самого начала нашей работы мы руководствовались простой и важной целью —
                      сделать качественную медицинскую помощь доступной для каждого человека.
                    </p>
                    <div className="mt-7 flex items-end gap-4">
                      <span className="bg-about-icon text-about-teal grid size-12 shrink-0 place-items-center rounded-full">
                        <HeartHandshake className="size-6" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="border-about-line text-about-copy flex-1 border-b pb-2 text-sm italic">
                        С заботой о вашем здоровье
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="bg-about-mint py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Наши преимущества</SectionTitle>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {ADVANTAGES.map(({ icon: Icon, title, text, href, external }, index) => {
                const card = (
                  <article className="border-about-line bg-card group flex items-start gap-3 rounded-2xl border p-4 transition-colors hover:border-brand-green hover:bg-about-mint/60 sm:gap-4 sm:p-4">
                    <span className="bg-about-icon text-about-teal grid size-10 shrink-0 place-items-center rounded-full sm:size-11">
                      <Icon className="size-5 sm:size-[22px]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-about-ink text-base leading-snug font-bold sm:text-lg">{title}</h3>
                      <p className="text-about-copy mt-1 text-sm leading-snug sm:mt-1.5">{text}</p>
                    </div>
                  </article>
                );
                return (
                  <Reveal key={title} delay={index * 35} className="h-full">
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                        {card}
                      </a>
                    ) : (
                      <Link to={href} className="block h-full">
                        {card}
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <article className="border-about-line bg-card overflow-hidden rounded-2xl border lg:grid lg:grid-cols-[1fr_1.02fr]">
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <SectionTitle>Наша миссия</SectionTitle>
                  <p className="text-about-ink mt-5 text-base leading-relaxed sm:text-lg">
                    Мы создаем современную систему медицинской помощи, где пациент получает
                    качественное и доступное лечение, а забота о его здоровье становится
                    приоритетом.
                  </p>
                  <div className="my-5 flex items-center gap-4">
                    <span className="bg-about-line h-px flex-1" />
                    <LeafOrnament className="text-about-ornament w-20" />
                    <span className="bg-about-line h-px flex-1" />
                  </div>
                  <p className="text-about-copy text-sm leading-relaxed sm:text-base">
                    Мы стремимся к тому, чтобы каждый человек в нашей стране мог получить
                    квалифицированную медицинскую помощь, основанную на современных технологиях,
                    опыте наших специалистов и внимательном отношении.
                  </p>
                </div>

                <div className="min-h-64 overflow-hidden rounded-t-[42%] lg:min-h-[420px] lg:rounded-t-none lg:rounded-l-[42%]">
                  <img
                    src={receptionPhoto}
                    alt="Светлая современная зона регистрации клиники с растениями"
                    width={1600}
                    height={1200}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
