import { BannerSlider } from "@/components/BannerSlider";
import { SURGERY_IMAGES } from "@/lib/hq-images";
import { PAGE_BANNERS } from "@/lib/page-banners";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";

import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { specialtyImage } from "@/lib/specialty-images";
import { parseRows, surgeryDirectionQueryOptions } from "@/lib/surgery.queries";
import { ADVANTAGES } from "./about";

import { DoctorsGrid, SurgeryDoctorsGrid } from "./hirurgiya.index";
import { ContactButtons } from "@/components/ContactButtons";
import { clinicDoctorsQueryOptions, useClinicDoctors, type DbClinicDoctor } from "@/lib/clinic-doctors.queries";

const truncate = (value: string, max = 158) =>
  value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;

const SLUG_CATEGORY: Record<string, string> = {
  urologiya: "urologiya",
  ginekologiya: "ginekologiya",
  travmatologiya: "travmatologiya",
  mammologiya: "onkologiya",
  "obshchaya-hirurgiya": "hirurgiya",
  proktologiya: "hirurgiya",
  flebologiya: "hirurgiya",
};
const SLUG_SPECIALTY: Record<string, string> = { proktologiya: "проктолог", flebologiya: "флеболог" };

function fallbackDoctors(slug: string, CLINIC_DOCTORS: DbClinicDoctor[]) {
  const category = SLUG_CATEGORY[slug];
  if (!category) return [];
  const term = SLUG_SPECIALTY[slug];
  if (term) {
    const bySpec = CLINIC_DOCTORS.filter((d) => d.specialty.toLowerCase().includes(term));
    if (bySpec.length > 0) return bySpec.slice(0, 6);
  }
  return CLINIC_DOCTORS.filter((d) => d.category === category).slice(0, 6);
}

function parseBody(body: string | null | undefined) {
  const intro: string[] = [];
  const blocks: { title: string; paragraphs: string[] }[] = [];
  for (const chunk of (body ?? "").split(/\n\s*\n/)) {
    const lines = chunk.trim().split("\n");
    if (!lines[0]) continue;
    if (lines[0].startsWith("## ")) {
      const rest = lines.slice(1).join("\n").trim();
      blocks.push({ title: lines[0].slice(3).trim(), paragraphs: rest ? [rest] : [] });
    } else if (blocks.length > 0) {
      blocks[blocks.length - 1]?.paragraphs.push(chunk.trim());
    } else {
      intro.push(chunk.trim());
    }
  }
  return { intro, blocks };
}

const DEFAULT_SUBTITLE =
  "Современные операции с использованием малоинвазивных технологий. Подходы и материалы помощи взрослым пациентам.";



const DEFAULT_SYMPTOMS = [
  "Боли в животе",
  "Появление грыжи",
  "Новообразования кожи и мягких тканей",
  "Вросший ноготь",
  "Плохо заживающие раны",
  "Воспалительные заболевания",
  "Необходимость планового хирургического лечения",
];

const DEFAULT_DISEASES = [
  "Грыжи передней брюшной стенки",
  "Желчнокаменная болезнь",
  "Доброкачественные образования кожи и мягких тканей (липомы, атеромы и др.)",
  "Вросший ноготь",
  "Гнойно-воспалительные заболевания",
  "Другие хирургические патологии",
];

const DEFAULT_PROCEDURES = [
  "Лапароскопические операции",
  "Операции при грыжах",
  "Операции на жёлчном пузыре",
  "Удаление липом, атером и др. новообразований",
  "Хирургическая обработка ран",
  "Удаление вросшего ногтя",
  "Вскрытие и лечение гнойных процессов",
  "Другие вмешательства по показаниям",
];

const DEFAULT_FAQ = [
  {
    title: "Всегда ли нужна операция?",
    text: "Нет. Хирург сначала оценивает состояние и результаты обследований: во многих случаях достаточно наблюдения или консервативного лечения, а операцию предлагают только по показаниям.",
  },
  {
    title: "Сколько длится восстановление?",
    text: "После малоинвазивных вмешательств обычно несколько дней, после более объёмных операций — до нескольких недель. Точные сроки врач называет после осмотра.",
  },
  {
    title: "Как подготовиться к операции?",
    text: "Нужно пройти назначенные анализы и обследования, сообщить о принимаемых препаратах и аллергии, а также соблюдать рекомендации врача по питанию перед вмешательством.",
  },
];

const DIRECTION_TITLES: Record<string, string> = {
  "obshchaya-hirurgiya": "Общая хирургия",
  urologiya: "Урология",
  ginekologiya: "Гинекология",
  travmatologiya: "Травматология",
  proktologiya: "Проктология",
  mammologiya: "Маммология",
  flebologiya: "Флебология",
};

const DIRECTION_IMAGES: Record<string, string> = {
  "obshchaya-hirurgiya": "/assets/spec-hirurg.webp",
  urologiya: "/assets/spec-urolog.webp",
  ginekologiya: "/assets/spec-gineko.webp",
  travmatologiya: "/assets/spec-travma.webp",
  proktologiya: "/assets/doctor-patient-hero.webp",
  mammologiya: "/assets/spec-gineko.webp",
  flebologiya: "/assets/uslugi-hero.jpg",
};

export const Route = createFileRoute("/hirurgiya/$slug")({
  loader: async ({ params, context }) => {
    void context.queryClient.ensureQueryData(clinicDoctorsQueryOptions);
    const direction = await context.queryClient.ensureQueryData(
      surgeryDirectionQueryOptions(params.slug),
    );
    if (!direction && !DIRECTION_TITLES[params.slug]) throw notFound();
    return direction ?? null;
  },
  head: ({ params, loaderData }) => {
    const path = `/hirurgiya/${params.slug}`;
    const fallbackTitle = DIRECTION_TITLES[params.slug];
    if (!loaderData && !fallbackTitle) {
      return {
        meta: [{ title: "Страница недоступна — Авиценна" }, { name: "robots", content: "noindex" }],
      };
    }

    const name = loaderData?.title || fallbackTitle || "Хирургия";
    const title = loaderData?.meta_title?.trim() || `${name} в Бишкеке — клиника «Авиценна»`;
    const description =
      loaderData?.meta_description?.trim() ||
      truncate(loaderData?.subtitle?.trim() || DEFAULT_SUBTITLE);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absoluteUrl(path) || path },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absoluteUrl(path) || path }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name,
            description,
            url: absoluteUrl(path) || path,
            about: { "@type": "MedicalSpecialty", name },
            provider: { "@type": "MedicalClinic", name: CLINIC.name },
          }),
        },
      ],
    };
  },
  component: DirectionPage,
  notFoundComponent: () => (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Хирургия" />
      <Breadcrumbs items={[{ label: "Хирургия" }]} />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-about-ink text-3xl font-extrabold sm:text-4xl">Направление не найдено</h1>
        <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark mt-8 shadow-none">
          <Link to="/hirurgiya">Все направления хирургии</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  ),
});

function Heading({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-about-ink text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && <p className="text-about-copy mt-3 max-w-2xl text-[13px] sm:text-base">{description}</p>}
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-about-ink text-lg font-bold sm:text-xl">{title}</h3>
      <ul className="mt-4 grid gap-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="bg-about-icon text-about-teal mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
              <Check className="size-3" aria-hidden="true" />
            </span>
            <span className="text-about-copy text-[13px] leading-snug sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faq({ items }: { items: { title: string; text?: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <dl className="mt-6 grid gap-3">
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
                <span className="text-about-ink text-[13px] font-semibold sm:text-base">{item.title}</span>
                <Plus
                  className={`text-about-teal size-5 shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            {isOpen && item.text && (
              <dd className="text-about-copy border-about-line border-t p-4 text-[13px] leading-relaxed sm:text-sm">
                {item.text}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}

export function DirectionBody({ slug }: { slug: string }) {
  const { data } = useSuspenseQuery(surgeryDirectionQueryOptions(slug));

  const name = data?.title || DIRECTION_TITLES[slug] || "Хирургия";
  const subtitle = data?.subtitle?.trim() || DEFAULT_SUBTITLE;
  const image = SURGERY_IMAGES[slug] || data?.image_url || DIRECTION_IMAGES[slug] || specialtyImage(slug);
  const doctors = data?.doctors ?? [];
  const allDoctors = useClinicDoctors();
  const clinicDoctors = doctors.length === 0 ? fallbackDoctors(slug, allDoctors) : [];
  const category = SLUG_CATEGORY[slug];
  const { intro, blocks } = parseBody(data?.body);
  const aboutTitle = data?.about_title?.trim() || "О направлении";


  const rowTitles = (value: string | null | undefined, fallback: string[]) => {
    const rows = parseRows(value).map((row) => row.title);
    return rows.length > 0 ? rows : fallback;
  };
  const symptoms = rowTitles(data?.symptoms, DEFAULT_SYMPTOMS);
  const diseases = rowTitles(data?.diseases, DEFAULT_DISEASES);
  const procedures = rowTitles(data?.procedures, DEFAULT_PROCEDURES);
  const diagnostics = rowTitles(data?.diagnostics, []);

  const dbFaq = parseRows(data?.faq);
  const faqItems = dbFaq.length > 0 ? dbFaq : DEFAULT_FAQ;

  return (
    <>
        {intro.length > 0 && (
          <section className="bg-about-canvas py-8 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <Heading title={aboutTitle} />
              <div className="mt-5 max-w-3xl space-y-3">
                {intro.map((p) => (
                  <p key={p} className="text-about-copy text-[13px] leading-relaxed whitespace-pre-line sm:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
            <BulletList title="Какие заболевания мы лечим" items={diseases} />
            <BulletList title="Когда стоит обратиться к врачу" items={symptoms} />
          </div>
        </section>

        {diagnostics.length > 0 && (
          <section className="bg-about-canvas py-8 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <BulletList title="Диагностика в «Авиценне»" items={diagnostics} />
              <Link
                to="/diagnostika"
                className="text-about-teal mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold sm:text-sm"
              >
                Все исследования
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <BulletList title="Операции и лечение" items={procedures} />
            {blocks.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {blocks.map((block) => (
                  <article key={block.title} className="border-about-line bg-card rounded-2xl border p-5">
                    <h3 className="text-about-ink text-base font-bold sm:text-lg">{block.title}</h3>
                    <div className="mt-2 space-y-2">
                      {block.paragraphs.map((p) => (
                        <p key={p} className="text-about-copy text-[13px] leading-relaxed whitespace-pre-line sm:text-sm">
                          {p}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Heading title="Почему пациенты выбирают «Авиценну»" />
            <div className="mt-5">
              <AdvantagesGrid items={ADVANTAGES} featured={{ value: "100+", label: "специалистов" }} />
            </div>

          </div>
        </section>

        {(doctors.length > 0 || clinicDoctors.length > 0) && (
          <section id="vrachi" className="bg-about-mint py-8 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <Heading title="Наши врачи" />
                <Link
                  to="/vrachi"
                  search={(category ? { category } : {}) as never}
                  className="text-about-teal inline-flex items-center gap-1.5 text-[13px] font-semibold sm:text-sm"
                >
                  Все врачи
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              {doctors.length > 0 ? (
                <DoctorsGrid doctors={doctors} />
              ) : (
                <SurgeryDoctorsGrid doctors={clinicDoctors} />
              )}
            </div>
          </section>
        )}

        <section id="faq" className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Heading title="Часто задаваемые вопросы" />
            <Faq items={faqItems} />
          </div>
        </section>

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Запишитесь на консультацию
              </h2>
              <p className="text-about-copy mt-3 max-w-xl text-[13px] leading-relaxed sm:text-base">
                Врач осмотрит, объяснит варианты лечения и составит понятный план действий.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                <Button
                  asChild
                  className="bg-brand-green text-brand-white hover:bg-brand-green-dark w-fit shadow-none"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Записаться на консультацию
                  </a>
                </Button>
                <ContactButtons />
              </div>
            </div>
            <img
              src={image}
              alt="Консультация хирурга"
              loading="lazy"
              className="hidden h-48 w-full rounded-2xl object-cover sm:h-60 lg:block"
            />
          </div>
        </section>
    </>
  );
}

function DirectionPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(surgeryDirectionQueryOptions(slug));
  const name = data?.title || DIRECTION_TITLES[slug] || "Хирургия";
  const subtitle = data?.subtitle?.trim() || DEFAULT_SUBTITLE;
  const image = SURGERY_IMAGES[slug] || data?.image_url || DIRECTION_IMAGES[slug] || specialtyImage(slug);
  const dbFaq = parseRows(data?.faq);
  const faqItems = dbFaq.length > 0 ? dbFaq : DEFAULT_FAQ;

  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb={name} />
      <Breadcrumbs items={[{ label: "Хирургия", href: "/hirurgiya" }, { label: name }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(
              faqItems.map((item) => ({ question: item.title, answer: item.text ?? "" })),
            ),
          ),
        }}
      />

      <main>
        <section className="bg-about-mint">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Reveal className="flex flex-col justify-center lg:pr-10">
              <h1 className="text-about-ink mt-3 max-w-2xl text-2xl leading-[1.1] font-extrabold sm:text-4xl lg:text-5xl">
                {name} в Бишкеке
              </h1>
              <p className="text-about-copy mt-3 max-w-2xl text-[13px] leading-relaxed sm:text-base">
                {subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                <Button
                  asChild
                  className="bg-brand-green text-brand-white hover:bg-brand-green-dark px-3 text-[13px] shadow-none sm:px-4 sm:text-sm"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Записаться на консультацию
                  </a>
                </Button>
                <ContactButtons />
              </div>
            </Reveal>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl lg:h-[300px]">
              <BannerSlider slides={[{ image, alt: name }, ...PAGE_BANNERS.hirurgiya.slice(1)]} />
            </div>
          </div>
        </section>

        <DirectionBody slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
