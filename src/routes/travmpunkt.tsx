import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  Bone,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Phone,
  Syringe,
  UserRound,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { CLINIC_DOCTORS, experienceLabel, type ClinicDoctor } from "@/lib/clinic-doctors";
import { FaqList } from "./hirurgiya.index";

const TITLE = "Травмпункт 24/7 в Бишкеке — круглосуточно | Авиценна";
const DESCRIPTION =
  "Круглосуточный травмпункт «Авиценна» в Бишкеке: переломы, вывихи, раны, ожоги. Рентген, гипс, ПХО и операции на месте. Без записи, ул. Жукеева-Пудовкина, 124.";

const HERO_POINTS = [
  "Срочная помощь при любых видах повреждений",
  "Врачи с большим опытом",
  "Современное диагностическое оборудование",
  "Собственная лаборатория",
  "Сопровождение до полного выздоровления",
  "Комфорт и доступность 24/7",
];

const HELP_AT = [
  { title: "Переломы костей", text: "Переломы костей и повреждения суставов любой сложности." },
  { title: "Повреждения менисков", text: "Диагностика и лечение повреждений менисков коленного сустава." },
  {
    title: "Вывихи",
    text: "Вывихи плечевого, локтевого, коленного, голеностопного сустава, стопы, пальца и др.",
  },
  {
    title: "Раны",
    text: "Укушенные, рубленые, резаные и ушибленные раны, в том числе с повреждением сухожилий, нервов, сосудов, связок и мышц.",
  },
  { title: "Ожоги и обморожения", text: "Первая помощь и дальнейшее лечение ожогов и обморожений." },
  { title: "Ушибы и гематомы", text: "Осмотр, обезболивание и лечение ушибов и гематом." },
  {
    title: "Другие повреждения",
    text: "Любые травматические повреждения — днём и ночью, без записи.",
  },
];

const PROCEDURES = [
  "Первичная хирургическая обработка раны (ПХО) — с наложением или снятием швов",
  "Перевязка раны с наложением асептической повязки",
  "Наложение фиксирующей эластичной повязки",
  "Наложение и снятие гипсовой повязки",
  "Удаление инородных тел мягких тканей",
  "Обезболивание: блокада, местное обезболивание переломов, различные виды анестезии",
  "Вправление вывиха",
  "Пункция сустава, внутрисуставные инъекции",
  "Медикаментозное лечение",
  "Оперативное лечение (остеосинтез, артропластика, пластика сухожилия, микрохирургические операции и др.) с последующей реабилитацией",
];

const FAQ_ITEMS = [
  {
    title: "Когда необходима консультация травматолога-ортопеда?",
    text: "Срочный визит к ортопеду нужен при плохой подвижности суставов (особенно с припухлостью, хрустом и болезненностью), при онемении рук, боли в спине, повышенной утомляемости, заметном изменении осанки, а также при высокой чувствительности к погодным изменениям.",
  },
  {
    title: "Как проходит приём у травматолога-ортопеда?",
    text: "Врач осмотрит строение костной системы, оценит амплитуду движения суставов и выявит отклонения от нормы. При необходимости назначит рентген, чтобы подтвердить или опровергнуть предварительные выводы, а в сложных случаях — КТ.",
  },
  {
    title: "Когда требуется регулярное наблюдение травматолога-ортопеда?",
    text: "Регулярное наблюдение важно после травм и операций, при нарушениях осанки и плоскостопии, заболеваниях суставов и костной системы, а также детям — для контроля правильного формирования опорно-двигательного аппарата.",
  },
  {
    title: "Нужно ли записываться в травмпункт?",
    text: "Нет, травмпункт работает круглосуточно и принимает без записи. Приходите сразу после травмы — чем раньше начато лечение, тем быстрее восстановление. При необходимости можно предварительно позвонить.",
  },
];

const traumaDoctors = CLINIC_DOCTORS.filter((d) => d.category === "travmatologiya");

export const Route = createFileRoute("/travmpunkt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/travmpunkt") || "/travmpunkt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/travmpunkt") || "/travmpunkt" }],
  }),
  component: TraumaPage,
});

function TraumaPage() {
  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Травмпункт 24/7" />
      <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi" }, { label: "Травмпункт" }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(FAQ_ITEMS.map((item) => ({ question: item.title, answer: item.text }))),
          ),
        }}
      />

      <main>
        {/* Герой */}
        <section className="bg-about-mint border-b border-about-line">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-about-icon px-4 py-1.5 text-sm font-semibold text-about-teal">
                <Clock3 className="size-4" aria-hidden="true" />
                Работаем круглосуточно
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-about-ink sm:text-4xl lg:text-5xl">
                Травмпункт в Бишкеке
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-about-copy sm:text-lg">
                Срочная медицинская помощь при травмах и повреждениях любой степени — планово и
                экстренно, днём и ночью. Чем раньше вы обратитесь, тем быстрее и полноценнее
                восстановление.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {HERO_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-about-copy">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-about-icon text-about-teal">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
                >
                  Записаться на приём
                </a>
                <a
                  href={`tel:${CLINIC.phones[0]}`}
                  className="inline-flex items-center gap-2 rounded-md border border-about-line bg-white px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:border-brand-green hover:text-brand-green sm:px-6"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  +996 779 909 009
                </a>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-about-copy">
                <MapPin className="size-4 text-about-teal" aria-hidden="true" />
                ул. Жукеева-Пудовкина, 124 — приём без записи
              </p>
            </div>
            <div className="relative">
              <img
                src="/assets/svc-priem.jpg"
                alt="Травмпункт клиники Авиценна"
                loading="eager"
                className="aspect-[4/3] w-full rounded-2xl border border-about-line object-cover lg:h-[380px]"
              />
            </div>
          </div>
        </section>

        {/* Помощь при */}
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <TraumaHeading
              icon={<AlertTriangle className="size-5" aria-hidden="true" />}
              title="Специалисты оказывают помощь при"
              description="Принимаем пациентов с травмами различной степени тяжести — быстро и профессионально, круглосуточно."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {HELP_AT.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-about-line bg-white p-4 transition-colors hover:border-brand-green"
                >
                  <h3 className="text-base font-bold text-about-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-about-copy">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Процедуры */}
        <section className="bg-about-mint border-y border-about-line py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <TraumaHeading
              icon={<Syringe className="size-5" aria-hidden="true" />}
              title="При необходимости наши специалисты проведут"
              description="Травмпункт оснащён всем необходимым оборудованием, включая рентгеновскую аппаратуру и операционные."
            />
            <ul className="mt-6 grid gap-3 lg:grid-cols-2">
              {PROCEDURES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-about-line bg-white p-4"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-about-icon text-about-teal">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-about-copy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Детский травматолог */}
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-6 rounded-2xl border border-about-line bg-white p-5 sm:p-8 lg:grid-cols-[auto_1fr_auto]">
              <span className="grid size-14 place-items-center rounded-2xl bg-about-icon text-about-teal">
                <Baby className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-about-ink sm:text-2xl">
                  Детский травматолог-ортопед
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-about-copy sm:text-base">
                  В травмпункте ведёт приём детский травматолог-ортопед: диагностика и лечение
                  травм, нарушений осанки, плоскостопия, заболеваний суставов и костной системы у
                  детей. Работает каждый день — график уточняйте заранее в колл-центре.
                </p>
              </div>
              <a
                href={`tel:${CLINIC.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-about-teal px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:bg-brand-green hover:border-brand-green hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                Уточнить график
              </a>
            </div>
          </div>
        </section>

        {/* Врачи */}
        {traumaDoctors.length > 0 && (
          <section id="vrachi" className="bg-about-mint border-y border-about-line py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <TraumaHeading
                  icon={<Bone className="size-5" aria-hidden="true" />}
                  title="Врачи травмпункта"
                  description="Квалифицированные травматологи-ортопеды с большим опытом оказания первой медицинской помощи."
                />
                <Link
                  to="/vrachi"
                  search={{ category: "travmatologiya" }}
                  hash="vrachi"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-about-teal transition-colors hover:text-brand-green"
                >
                  Все врачи
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {traumaDoctors.map((doctor) => (
                  <TraumaDoctorCard key={doctor.slug} doctor={doctor} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-about-canvas border-y border-about-line py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <TraumaHeading
              title="Часто задаваемые вопросы"
              description="Отвечаем на популярные вопросы о приёме травматолога-ортопеда."
            />
            <div className="mt-7">
              <FaqList items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="pb-10 sm:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-6 rounded-2xl border border-about-line bg-about-mint p-5 sm:p-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-2xl font-extrabold text-about-ink sm:text-3xl">
                  Травма не ждёт — и мы тоже
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-about-copy sm:text-base">
                  Травмпункт «Авиценны» открыт круглосуточно: приходите без записи или позвоните —
                  подскажем, как добраться и что делать до приезда.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
                  >
                    Записаться на приём
                  </a>
                  <a
                    href={`tel:${CLINIC.phones[0]}`}
                    className="inline-flex items-center gap-2 rounded-md border border-about-line bg-white px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:border-brand-green hover:text-brand-green sm:px-6"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Позвонить
                  </a>
                </div>
              </div>
              <img
                src="/assets/doctor-patient-hero.webp"
                alt="Приём травматолога"
                loading="lazy"
                className="hidden h-60 w-72 rounded-2xl border border-about-line object-cover lg:block"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function TraumaHeading({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {icon && (
        <span className="mb-3 grid size-10 place-items-center rounded-xl bg-about-icon text-about-teal">
          {icon}
        </span>
      )}
      <h2 className="text-2xl font-extrabold text-about-ink sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-about-copy sm:text-base">{description}</p>
      )}
    </div>
  );
}

function TraumaDoctorCard({ doctor }: { doctor: ClinicDoctor }) {
  return (
    <article className="flex flex-col rounded-2xl border border-about-line bg-white p-4">
      {doctor.photo ? (
        <img
          src={doctor.photo}
          alt={doctor.name}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
      ) : (
        <div className="grid aspect-[4/3] w-full place-items-center rounded-xl bg-about-icon text-about-teal">
          <UserRound className="size-16" aria-hidden="true" />
        </div>
      )}
      <h3 className="mt-3 text-base font-bold text-brand-green">{doctor.name}</h3>
      <p className="mt-1.5 inline-flex w-fit rounded-full bg-about-icon px-3 py-1 text-xs font-semibold text-about-teal">
        {doctor.specialty}
      </p>
      <div className="mt-3 flex flex-col gap-1.5 text-xs text-about-copy">
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="size-3.5 text-about-teal" aria-hidden="true" />
          {doctor.branch}
        </span>
        {doctor.experience != null && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-about-teal" aria-hidden="true" />
            Стаж: {experienceLabel(doctor.experience)}
          </span>
        )}
      </div>
      <Link
        to="/vrachi/$slug"
        params={{ slug: doctor.slug }}
        className="mt-auto block rounded-md border border-about-teal px-4 py-2.5 text-center text-sm font-semibold text-about-teal transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"
      >
        Подробнее
      </Link>
    </article>
  );
}
