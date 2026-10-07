import { BannerSlider } from "@/components/BannerSlider";
import { PAGE_BANNERS, usePageBanners } from "@/lib/page-banners";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Award,
  Armchair,
  TestTubes,
  HeartHandshake,
  Microscope,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import archiveTeam from "@/assets/about-archive-team.jpg";
import archiveFounder from "@/assets/about-archive-founder.jpg";
import teamToday from "@/assets/about-team-today.jpg";
import clinicHero from "@/assets/about-clinic-hero.png";
import clinicExterior from "@/assets/about-clinic-exterior.jpg";
import founderPortrait from "@/assets/founder-zhypar.png";
import receptionPhoto from "@/assets/about-reception.jpg";
import expresslabLogo from "@/assets/partners/expresslab-logo.svg";
import kokomerenLogo from "@/assets/partners/kokomeren-logo.png";
import corpusLogo from "@/assets/partners/corpus-logo-cropped.jpg";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/clinic";

const STORY = [
  {
    year: "2000",
    title: "Как всё начиналось",
    text: "В 2000 году Жыпар Абдыказиевна Керималиева открыла «Авиценну» в небольшом кабинете на улице Суеркулова. Так началась история отечественной медицинской компании.",
    image: archiveFounder,
    alt: "Архивный портрет основательницы клиники",
  },
  {
    year: "",
    title: "Появление «Экспресс Плюс»",
    text: "Чтобы обеспечить точную диагностику, мы создали собственную лабораторию «Экспресс Плюс». Это стало важным шагом в развитии комплексной медицинской помощи.",
    image: archiveTeam,
    alt: "Архивный снимок команды медиков",
  },
  {
    year: "2001",
    title: "Развитие инфраструктуры",
    text: "В 2001 году появилась компания «Көкөмерен», обеспечивающая медицинские учреждения оборудованием и реагентами. Позже — собственное производство медицинской мебели «Корпус».",
    image: clinicExterior,
    alt: "Здание медицинского центра «Авиценна» сегодня",
  },
  {
    year: "",
    title: "От клиники — к системе",
    text: "Шаг за шагом «Авиценна» развивалась, объединяя диагностику, лечение и современные медицинские технологии в одной системе.",
    image: receptionPhoto,
    alt: "Светлая современная зона регистрации клиники",
  },
  {
    year: "Сегодня",
    title: "«Авиценна» сегодня",
    text: "Сегодня это сеть из 5 филиалов в Бишкеке, 60+ специальностей и собственной лаборатории «Экспресс Плюс». Мы продолжаем развивать современную медицину в Кыргызстане.",
    image: teamToday,
    alt: "Современная команда врачей «Авиценны»",
  },
];

const PARTNERS = [
  {
    title: "Экспресс Плюс",
    icon: TestTubes,
    text: "Лабораторная диагностика и анализы.",
    logo: expresslabLogo,
    alt: "Логотип лаборатории «Экспресс Плюс»",
    href: "https://expresslab.kg/",
    action: "На сайт лаборатории",
  },
  {
    title: "Кокомерен",
    icon: Microscope,
    text: "Продажа медицинской техники и лабораторных реагентов.",
    logo: kokomerenLogo,
    alt: "Логотип компании «Кокомерен»",
    href: "https://kokomeren.kg/",
    action: "На сайт компании",
  },
  {
    title: "Corpus",
    icon: Armchair,
    text: "Производство мебели.",
    logo: corpusLogo,
    alt: "Логотип мебельной компании Corpus",
    href: "",
    action: "Производство мебели",
  },
] satisfies Array<{ title: string; icon: LucideIcon; text: string; logo: string; alt: string; href: string; action: string }>;

export const ADVANTAGES = [
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
    <h2 className="text-about-ink text-2xl leading-tight font-bold sm:text-3xl lg:text-[2.75rem]">
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
            <BannerSlider
              slides={usePageBanners("about", [
                { image: clinicHero, alt: "Здание клиники «Авиценна»", position: "50% 30%" },
                ...PAGE_BANNERS.about.slice(0, 2),
              ])}
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

          <LeafOrnament className="text-about-ornament absolute bottom-3 left-3 z-10 w-32 opacity-60 sm:left-8 sm:w-40 lg:bottom-8 hidden lg:block" />
        </section>

        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Как создавалась «Авиценна»</SectionTitle>
            <p className="text-about-copy mt-3 max-w-2xl leading-relaxed">
              История сети — от первого кабинета до многопрофильной клиники. Листайте вправо, чтобы увидеть всю историю.
            </p>
          </div>
          <div className="mt-8 flex gap-4 overflow-x-auto px-4 pb-3 scroll-smooth snap-x snap-mandatory sm:px-6 scroll-px-4 sm:scroll-px-6 xl:px-[calc((100vw-80rem)/2+1.5rem)] xl:scroll-px-[calc((100vw-80rem)/2+1.5rem)]">
            {STORY.map(({ year, title, text, image, alt }) => (
              <article
                key={title}
                className="border-about-line bg-card w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border sm:w-72"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  <img src={image} alt={alt} loading="lazy" className="size-full object-cover" />
                  {year ? (
                    <span className="bg-about-canvas/90 text-about-teal absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-bold">
                      {year}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-about-ink text-base font-bold">{title}</h3>
                  <p className="text-about-copy mt-2 text-sm leading-relaxed">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Больше, чем сеть клиник</SectionTitle>
            <p className="text-about-copy mt-3 max-w-2xl leading-relaxed">Разные направления работы объединены одной целью — заботой о здоровье людей.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNERS.map(({ title, icon: Icon, text, logo, alt, href, action }, index) => (
                <Reveal key={title} delay={index * 35} className="h-full">
                  <a href={href || undefined} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} aria-label={`${title} — ${action}`} className="border-about-line bg-card group flex h-full flex-row items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-about-teal hover:shadow-sm sm:flex-col sm:items-stretch sm:gap-0 sm:p-6">
                    <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand-white p-1.5 shadow-sm sm:size-20">
                      <img src={logo} alt={alt} loading="lazy" className="max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                    </div>
                    <div className="flex flex-1 flex-col pt-0 sm:mt-4 sm:border-t sm:border-about-line sm:pt-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-lg">
                          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <h3 className="text-about-ink text-base font-bold">{title}</h3>
                      </div>
                      <p className="text-about-copy mt-1.5 flex-1 text-sm leading-relaxed">{text}</p>
                      <span className="text-about-teal mt-4 inline-flex items-center gap-1 text-sm font-semibold">{action}<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-8 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <article className="border-about-line bg-card overflow-hidden rounded-2xl border lg:grid lg:grid-cols-[0.85fr_1.35fr]">
                <div className="bg-about-mint min-h-52 overflow-hidden rounded-b-[48%] sm:min-h-64 lg:min-h-[380px] lg:rounded-r-[48%] lg:rounded-b-none">
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
                    <h2 className="font-display text-about-ink mt-4 text-2xl leading-tight font-extrabold sm:text-3xl">
                      «Главное — ден соолук!»
                    </h2>
                    <p className="text-about-ink mt-6 text-lg font-bold">
                      Жыпар Абдыказиевна Керималиева
                    </p>
                    <p className="text-about-copy mt-1.5 text-sm leading-relaxed">
                      Основатель сети клиник «Авиценна»
                      <br />
                      Врач-дерматовенеролог, кандидат медицинских наук
                    </p>
                  </div>

                  <div className="bg-about-line h-px w-full lg:h-full lg:min-h-56 lg:w-px" />

                  <div>
                    <div className="space-y-3">
                      <p className="text-about-ink text-base leading-relaxed sm:text-lg">
                        В 2000 году «Авиценна» началась с небольшого кабинета, большой мечты и труда — создавать медицину, которой можно доверять.
                      </p>
                      <p className="text-about-ink text-base leading-relaxed sm:text-lg">
                        Мы росли вместе с нашей страной, развивали новые направления, внедряли современные технологии и шаг за шагом строили отечественную медицинскую компанию.
                      </p>
                      <p className="text-about-ink text-base leading-relaxed sm:text-lg">
                        Сегодня я особенно горжусь тем, что «Авиценна» стала частью жизни тысяч людей.
                      </p>
                      <p className="text-about-ink text-base leading-relaxed sm:text-lg">
                        И я верю: самое важное в медицине — не только технологии, но и забота, доверие и стремление каждый день становиться лучше.
                      </p>
                    </div>
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

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle>Наши преимущества</SectionTitle>
            <AdvantagesGrid items={ADVANTAGES} featured={{ value: "100+", label: "специалистов" }} />
          </div>
        </section>

        <section className="py-8 sm:py-10">
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

                <div className="hidden lg:block min-h-64 overflow-hidden rounded-t-[42%] lg:min-h-[420px] lg:rounded-t-none lg:rounded-l-[42%]">
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
