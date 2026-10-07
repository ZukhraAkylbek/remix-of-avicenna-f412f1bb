import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, CalendarDays, Check, ChevronLeft, ChevronRight, Plus, UserRound } from "lucide-react";
import { useRef, useState } from "react";

import { DiagnosticsIcon } from "@/components/DiagnosticsIcon";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { ContactButtons } from "@/components/ContactButtons";
import { parseRows, surgeryPageQueryOptions } from "@/lib/surgery.queries";
import { specialtyImage } from "@/lib/specialty-images";
import { CLINIC_DOCTORS, experienceLabel, type ClinicDoctor } from "@/lib/clinic-doctors";

const SURGERY_CATEGORIES = ["hirurgiya", "onkologiya", "urologiya", "ginekologiya", "travmatologiya"];
const surgeryDoctors = CLINIC_DOCTORS.filter((d) => SURGERY_CATEGORIES.includes(d.category));

const TITLE = "Хирургия в Бишкеке — операции и стационар | Авиценна";
const DESCRIPTION =
  "Хирургия в клинике «Авиценна»: лапароскопия, урология, гинекология, проктология, флебология, травматология. Диагностика перед операцией, стационар 24/7, запись онлайн.";

type SurgeryContentSection = {
  title: string;
  subtitle?: string | null;
  body?: string | null;
  image_url?: string | null;
  primary_label?: string | null;
  primary_url?: string | null;
};

const FALLBACK_SECTIONS: Record<string, SurgeryContentSection> = {
  hero: {
    title: "Современная хирургия с заботой о пациенте",
    subtitle: "Диагностика, плановые и малоинвазивные операции, стационар и восстановление в одной клинике.",
    body: "Опытные хирурги\nСтационар 24/7\nСовременные операционные\nПолное сопровождение",
    image_url: "/assets/spec-hirurg.webp",
    primary_label: "Записаться на консультацию",
    primary_url: "https://wa.me/996707909001",
  },
  advantages: {
    title: "Почему выбирают нашу хирургию",
    subtitle: "Безопасность, точная диагностика и внимательное сопровождение на каждом этапе.",
    body: "Опытная команда — Врачи хирургических специальностей работают вместе.\nСовременное оснащение — Операционные и диагностика соответствуют актуальным стандартам.\nСтационар 24/7 — Наблюдение медицинской команды круглосуточно.\nБережное восстановление — Индивидуальный план после операции.",
  },
  symptoms: {
    title: "Когда нужна консультация хирурга",
    subtitle: "Не откладывайте обращение, если боль усиливается или заметно влияет на самочувствие.",
    body: "Острая или продолжительная боль\nНовообразование или уплотнение\nТравма, отёк или ограничение движения\nДискомфорт после ранее проведённой операции\nНеобходимость планового хирургического лечения\nРекомендация другого специалиста",
    primary_label: "Записаться на консультацию",
    primary_url: "https://wa.me/996707909001",
  },
  diseases: {
    title: "Какие заболевания лечим",
    subtitle: "Работаем с распространёнными и сложными хирургическими заболеваниями.",
    body: "Грыжи — Паховые, пупочные и послеоперационные.\nЖелчнокаменная болезнь — Диагностика и хирургическое лечение.\nЗаболевания вен — Современные методы лечения сосудистых патологий.\nУрологические заболевания — Плановые и малоинвазивные вмешательства.\nГинекологические заболевания — Органосохраняющие хирургические методы.\nПроктологические заболевания — Деликатная диагностика и лечение.",
  },
  procedures: {
    title: "Операции и процедуры",
    subtitle: "Подбираем метод лечения по показаниям и состоянию пациента.",
    body: "Лапароскопические операции — Через небольшие проколы с коротким восстановлением.\nОбщая хирургия — Плановые операции различной сложности.\nУрологические операции — Современное лечение заболеваний мочевыделительной системы.\nГинекологические операции — Малоинвазивные и традиционные методики.\nФлебологические процедуры — Лечение варикозной болезни.\nМалая хирургия — Амбулаторные вмешательства и перевязки.",
  },
  diagnostics: {
    title: "Диагностика перед операцией",
    subtitle: "Все необходимые исследования можно пройти в клинике.",
    body: "Консультация хирурга — Осмотр и выбор тактики лечения.\nЛабораторные анализы — Комплекс исследований перед вмешательством.\nУЗИ и лучевая диагностика — Уточнение диагноза и объёма операции.\nКонсультация анестезиолога — Оценка состояния и подготовка.\nЭКГ и обследование сердца — Контроль факторов риска.\nПлан госпитализации — Понятные рекомендации и сроки.",
    primary_url: "/diagnostika",
    primary_label: "Перейти к диагностике",
  },
  stationar: {
    title: "Комфортный стационар 24/7",
    subtitle: "Постоянное наблюдение и всё необходимое для спокойного восстановления.",
    body: "Круглосуточное наблюдение\nПалаты интенсивной терапии\nСовременные комфортные палаты\nКонтроль боли и состояния\nПитание и уход\nСвязь с лечащим врачом",
    image_url: "/assets/image-2.webp",
  },
  steps: {
    title: "Как проходит лечение",
    subtitle: "Понятный путь от первой консультации до возвращения к привычной жизни.",
    body: "Консультация — Хирург изучает жалобы и результаты обследований.\nДиагностика — Проходите необходимые анализы и исследования.\nОперация — Команда проводит вмешательство по согласованному плану.\nВосстановление — Наблюдение, рекомендации и контрольный приём.",
  },
  faq: {
    title: "Часто задаваемые вопросы",
    subtitle: "Коротко о подготовке, госпитализации и восстановлении.",
    body: "Как подготовиться к консультации хирурга? — Возьмите результаты предыдущих обследований и список принимаемых препаратов.\nКакие анализы нужны перед операцией? — Точный перечень зависит от операции и определяется врачом после консультации.\nСколько длится госпитализация? — Срок зависит от вида вмешательства и вашего состояния; врач заранее расскажет план.\nКогда можно вернуться к обычной жизни? — Рекомендации индивидуальны и зависят от операции и темпа восстановления.",
  },
  final: {
    title: "Обсудите лечение с хирургом",
    subtitle: "Врач оценит состояние, объяснит варианты и предложит понятный план действий.",
    primary_label: "Записаться на приём",
    primary_url: "https://wa.me/996707909001",
  },
} as const;

const FALLBACK_DIRECTIONS = [
  { slug: "obshchaya-hirurgiya", title: "Общая хирургия", subtitle: null, icon: "Scissors", image_url: "/assets/spec-hirurg.webp" },
  { slug: "urologiya", title: "Урология", subtitle: null, icon: "Stethoscope", image_url: "/assets/spec-urolog.webp" },
  { slug: "ginekologiya", title: "Гинекология", subtitle: null, icon: "HeartPulse", image_url: "/assets/spec-gineko.webp" },
  { slug: "travmatologiya", title: "Травматология", subtitle: null, icon: "Activity", image_url: "/assets/spec-travma.webp" },
  { slug: "proktologiya", title: "Проктология", subtitle: null, icon: "ShieldCheck", image_url: "/assets/doctor-patient-hero.webp" },
  { slug: "mammologiya", title: "Маммология", subtitle: null, icon: "HeartPulse", image_url: "/assets/spec-gineko.webp" },
  { slug: "flebologiya", title: "Флебология", subtitle: null, icon: "Heart", image_url: "/assets/uslugi-hero.jpg" },
];

export const Route = createFileRoute("/hirurgiya/")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(surgeryPageQueryOptions());
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/hirurgiya") || "/hirurgiya" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/hirurgiya") || "/hirurgiya" }],
  }),
  errorComponent: () => (
    <Shell>
      <h1 className="text-3xl font-extrabold">Не удалось загрузить страницу хирургии</h1>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <h1 className="text-3xl font-extrabold">Страница не найдена</h1>
    </Shell>
  ),
  component: SurgeryPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <SiteHeader breadcrumb="Хирургия" />
      <Breadcrumbs items={[{ label: "Хирургия" }]} />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SurgeryHeading({ title, description }: { title: React.ReactNode; description?: string }) {
  return (
    <div>
      <h2 className="text-about-ink text-2xl leading-tight font-extrabold sm:text-3xl">{title}</h2>
      {description && <p className="text-about-copy mt-3 max-w-2xl text-base">{description}</p>}
    </div>
  );
}

export function FaqList({ items }: { items: { title: string; text?: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className="grid items-start gap-3 lg:grid-cols-2">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title} className="border-about-line bg-about-canvas rounded-2xl border">
            <dt>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span className="text-about-ink text-base font-semibold">
                  {item.title}
                </span>
                <Plus
                  className={`text-about-teal size-5 shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            {isOpen && item.text && (
              <dd className="text-about-copy border-about-line border-t p-4 text-sm leading-relaxed">
                {item.text}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}

export function DoctorsGrid({
  doctors,
}: {
  doctors: {
    slug: string;
    full_name: string;
    job_title: string | null;
    photo_url: string | null;
    bio: string | null;
    experience_years: number | null;
  }[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="relative mt-6">
      <div className="mb-4 flex justify-end gap-2">
        <Button variant="outline" size="icon" aria-label="Прокрутить врачей влево" onClick={() => scroll(-1)} className="border-about-line text-about-teal rounded-full bg-about-canvas shadow-none">
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Прокрутить врачей вправо" onClick={() => scroll(1)} className="border-about-line text-about-teal rounded-full bg-about-canvas shadow-none">
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
      <div ref={carouselRef} className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {doctors.map((doctor) => (
          <article key={doctor.slug} className="border-about-line bg-about-canvas w-[260px] shrink-0 snap-start rounded-2xl border p-4 sm:w-[280px]">
            {doctor.photo_url ? (
              <img src={doctor.photo_url} alt={doctor.full_name} loading="lazy" className="size-24 rounded-full object-cover" />
            ) : (
              <span className="bg-about-icon text-about-teal grid size-24 place-items-center rounded-full"><UserRound className="size-10" aria-hidden="true" /></span>
            )}
            <h3 className="text-about-ink mt-4 text-lg font-bold">{doctor.full_name}</h3>
            {doctor.job_title && <p className="text-about-teal mt-1 text-sm font-semibold">{doctor.job_title}</p>}
            {doctor.experience_years != null && <p className="text-about-copy mt-2 text-sm">Стаж: {doctor.experience_years} лет</p>}
            <Button asChild variant="outline" className="border-about-line text-about-ink mt-4 bg-transparent shadow-none">
              <a href="#vrachi">Подробнее</a>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SurgeryDoctorsGrid({ doctors }: { doctors: ClinicDoctor[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.slice(0, 6).map((doctor) => (
        <article key={doctor.slug} className="border-about-line bg-about-canvas flex min-w-0 flex-row items-start gap-3 rounded-2xl border p-3 sm:flex-col sm:gap-0 sm:p-4">
          {doctor.photo ? (
            <img src={doctor.photo} alt={doctor.name} loading="lazy" className="size-20 shrink-0 rounded-full object-cover object-top sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-xl" />
          ) : (
            <span className="bg-about-icon text-about-teal grid size-20 shrink-0 place-items-center rounded-full sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-xl"><UserRound className="size-8 sm:size-16" aria-hidden="true" /></span>
          )}
          <div className="min-w-0 flex-1 sm:contents">
            <h3 className="text-about-ink text-base leading-snug font-bold sm:mt-4 sm:text-lg">{doctor.name}</h3>
            <p className="bg-about-icon text-about-teal mt-1.5 w-fit rounded-full px-3 py-1 text-[13px] font-semibold sm:mt-3">{doctor.specialty}</p>
            <div className="mt-2 space-y-1 sm:mt-4 sm:space-y-2">
              <p className="text-about-copy flex items-center gap-2 text-[13px] sm:text-sm"><Building2 className="text-about-teal size-4 shrink-0" aria-hidden="true" />{doctor.branch}</p>
              {doctor.experience != null && <p className="text-about-copy flex items-center gap-2 text-[13px] sm:text-sm"><CalendarDays className="text-about-teal size-4 shrink-0" aria-hidden="true" />Стаж: {experienceLabel(doctor.experience)}</p>}
            </div>
            <Button asChild variant="outline" className="border-about-teal text-about-ink hover:bg-brand-green hover:border-brand-green hover:text-white mt-3 h-9 w-full bg-transparent text-sm shadow-none sm:mt-auto sm:h-10">
              <Link to="/vrachi/$slug" params={{ slug: doctor.slug }}>Подробнее</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function SurgeryPage() {
  const { data } = useSuspenseQuery(surgeryPageQueryOptions());
  const section = (key: string): SurgeryContentSection | undefined =>
    data.sections.find((item) => item.key === key) ?? FALLBACK_SECTIONS[key];
  const directions = data.directions.length > 0 ? data.directions : FALLBACK_DIRECTIONS;
  const hero = section("hero");
  const stationar = section("stationar");
  const symptoms = section("symptoms");
  const faq = section("faq");
  const final = section("final");
  const faqItems = parseRows(faq?.body);
  const heroImage = hero?.image_url || directions[0]?.image_url || specialtyImage("hirurgiya", 0);
  const consultationItems = [
    ...parseRows(symptoms?.body),
    { title: "Боль в животе" },
    { title: "Грыжа" },
    { title: "Воспалительные заболевания" },
    { title: "Вросший ноготь" },
    { title: "Незаживающие раны" },
    { title: "Травмы" },
    { title: "Рекомендована операция" },
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index).slice(0, 8);

  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Хирургия" />
      <Breadcrumbs items={[{ label: "Хирургия" }]} />
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems.map((item) => ({ question: item.title, answer: item.text ?? "" })))) }} />
      )}

      <main>
        {hero && (
          <section className="bg-about-mint">
            <div className="mx-auto grid max-w-7xl overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:h-[380px] lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:py-8">
              <Reveal className="flex flex-col justify-center lg:pr-10">
                <p className="text-about-teal text-sm font-semibold">Хирургия</p>
                <h1 className="text-about-ink mt-2 max-w-2xl text-3xl leading-[1.08] font-extrabold sm:text-4xl lg:text-5xl">Комплексное хирургическое лечение</h1>
                <p className="text-about-copy mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">{hero.subtitle}</p>
                <div className="mt-4 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
                  {parseRows(hero.body).slice(0, 3).map((item) => (
                    <div key={item.title} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-9"><Check className="size-4" aria-hidden="true" /></span>
                      <span className="text-about-ink text-[11px] font-bold leading-snug sm:text-sm">{item.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark px-3 text-xs shadow-none sm:px-4 sm:text-sm"><a href={hero.primary_url || BOOKING_URL} target="_blank" rel="noopener noreferrer">{hero.primary_label || "Записаться на консультацию"}</a></Button>
                  <ContactButtons only="phone" />
                </div>
              </Reveal>
              <div className="relative mt-6 hidden h-60 overflow-hidden rounded-2xl lg:mt-0 lg:block lg:h-full">
                <img src={heroImage} alt="Хирургическое отделение клиники «Авиценна»" className="absolute inset-0 size-full object-cover" />
                <div className="from-about-mint/30 absolute inset-0 bg-gradient-to-r to-transparent" />
                <div className="bg-about-canvas/95 absolute right-0 bottom-0 grid grid-cols-2 gap-6 rounded-tl-2xl p-4 backdrop-blur-sm">
                  <div><strong className="text-about-ink block text-2xl">{Math.max(data.doctors.length, 14)}</strong><span className="text-about-copy text-xs">специалистов</span></div>
                  <div><strong className="text-about-ink block text-2xl">{directions.length}</strong><span className="text-about-copy text-xs">направлений</span></div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="directions" className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SurgeryHeading title="Направления хирургии" description={`${Math.max(data.doctors.length, 14)} специалистов оперируют по следующим направлениям:`} />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {directions.map((direction, index) => (
                <Reveal key={direction.slug} delay={index * 35}>
                   <Link to="/hirurgiya/$slug" params={{ slug: direction.slug }} className="border-about-line hover:border-about-teal group flex items-center gap-4 rounded-2xl border bg-about-canvas p-4 transition-colors">
                     <DiagnosticsIcon icon={direction.icon} title={direction.title} className="bg-about-icon text-about-teal size-11 rounded-full" />
                     <div className="min-w-0 flex-1"><h2 className="text-about-ink text-base font-bold">{direction.title}</h2><p className="text-about-copy mt-1 text-sm leading-snug">Диагностика и современные методы лечения.</p></div>
                     <ArrowRight className="text-about-teal size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {stationar && (
          <section className="bg-about-mint py-8 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SurgeryHeading title={stationar.title} />
              <div className="mt-5 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                 {stationar.image_url && <img src={stationar.image_url} alt={stationar.title} loading="lazy" className="hidden lg:block h-60 w-full rounded-2xl object-cover" />}
                <ul className="grid gap-4 sm:grid-cols-2">
                   {parseRows(stationar.body).map((item) => <li key={item.title} className="text-about-ink flex items-center gap-3 text-sm sm:text-base"><span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full"><Check className="size-4" /></span>{item.title}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SurgeryHeading title={symptoms?.title || "Когда нужна консультация хирурга"} />
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
               {consultationItems.map((item) => <div key={item.title} className="border-about-line flex items-center gap-3 rounded-2xl border bg-about-canvas p-4"><span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full"><Check className="size-4" /></span><span className="text-about-ink text-sm font-semibold leading-snug">{item.title}</span></div>)}
            </div>
          </div>
        </section>

        <section id="vrachi" className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SurgeryHeading title="Наши хирурги" description="Опытные специалисты хирургических направлений клиники «Авиценна»." />
            <SurgeryDoctorsGrid doctors={surgeryDoctors} />
            <div className="mt-6">
              <Button asChild variant="outline" className="border-about-teal text-about-ink hover:bg-brand-green hover:border-brand-green hover:text-white bg-transparent shadow-none">
                <a href="/vrachi?category=hirurgiya#vrachi">Все врачи →</a>
              </Button>
            </div>
          </div>
        </section>

        {faq && faqItems.length > 0 && (
          <section id="faq" className="bg-about-canvas py-8 sm:py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SurgeryHeading title={faq.title} /><div className="mt-5"><FaqList items={faqItems} /></div></div></section>
        )}

        {final && (
          <section className="bg-about-mint py-8 sm:py-10">
            <div className="mx-auto grid max-w-7xl overflow-hidden px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="flex flex-col justify-center py-6 lg:pr-10"><h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl">Забота о вашем здоровье</h2><p className="text-about-copy mt-3 max-w-xl text-base leading-relaxed">{final.subtitle}</p><div className="mt-6 flex flex-wrap gap-2 sm:gap-3"><Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark w-fit shadow-none"><a href={final.primary_url || BOOKING_URL} target="_blank" rel="noopener noreferrer">Записаться на консультацию</a></Button><ContactButtons only="phone" /></div></div>
              <img src={heroImage} alt="Консультация хирурга" loading="lazy" className="hidden lg:block h-60 w-full rounded-2xl object-cover" />
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
