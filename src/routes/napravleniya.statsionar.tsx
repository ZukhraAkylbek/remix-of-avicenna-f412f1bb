import { createFileRoute } from "@tanstack/react-router";
import {
  BedDouble,
  CalendarClock,
  Check,
  Clock3,
  HeartPulse,
  MapPin,
  Moon,
  Phone,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { FaqList } from "./hirurgiya.index";

const TITLE = "Стационар в Бишкеке — круглосуточный, с ценами | Авиценна";
const DESCRIPTION =
  "Стационары клиники «Авиценна» в Бишкеке: терапевтический, кардиологический и дневной. Врачи со стажем более 15 лет, комфортные палаты, питание. Адрес: Бакаева, 106.";
const WHATSAPP_BOOKING =
  "https://api.whatsapp.com/send?phone=996505909009&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BC%D0%B5%D1%81%D1%82%D0%BE%20%D0%B2%20%D1%81%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D1%80%D0%B5";

const WARDS = ["Терапевтический", "Кардиологический", "Дневной"];

const FEATURES = [
  {
    icon: UserRoundCheck,
    title: "Нас выбирают за особое отношение",
    text: "Круглосуточно дежурят опытные медсёстры, а условия организованы так, чтобы лечение было максимально комфортным.",
  },
  {
    icon: BedDouble,
    title: "Дневная палата",
    text: "Если вам назначили короткое пребывание в стационаре — приходите на процедуры днём и возвращайтесь домой.",
  },
  {
    icon: MapPin,
    title: "Удобный адрес",
    text: "Легко добраться: стационар находится в главном корпусе клиники на Бакаева, 106.",
  },
];

const PRICES = [
  { name: "Дневной стационар до 4 часов (без стоимости медикаментов и питания)", price: "500" },
  { name: "Дневной стационар свыше 4 часов (без стоимости медикаментов и питания)", price: "1 100" },
  { name: "1-местная палата — 1 койко-день (лечение и питание, без обследования)", price: "7 000" },
  { name: "2-местная палата — 1 койко-день (лечение и питание, без обследования)", price: "5 000" },
  {
    name: "Палата интенсивной терапии с круглосуточным наблюдением — 1 койко-день (лечение и питание, без обследования)",
    price: "7 000",
  },
  { name: "VIP-палата — 1 койко-день (лечение и питание, без обследования)", price: "8 000" },
  { name: "Хирургический стационар, палата — 1 койко-день", price: "1 000" },
  { name: "Хирургический стационар с питанием — 1 койко-день", price: "1 750" },
  { name: "Реанимация, палата — 1 койко-день", price: "8 500" },
  { name: "Ухаживающий (доплата)", price: "1 000" },
];

const INCLUDED = [
  "Наблюдение лечащего врача и дежурных медсестёр 24/7",
  "Питание и комфортное размещение",
  "Инструментальные и лабораторные исследования в самой клинике",
  "Консультации кардиологов, неврологов, ревматологов и эндокринологов",
  "Индивидуальная тактика лечения и сопровождение до выписки",
];

const FAQ_ITEMS = [
  {
    title: "Что такое стационарное лечение?",
    text: "Лечение считается стационарным, если необходимо остаться в клинике на ночь, или если вас после амбулаторного вмешательства (например, после оказания экстренной помощи) перевели в стационарное отделение.",
  },
  {
    title: "Сколько длится лечение в стационаре?",
    text: "Сроки ожидания плановой специализированной стационарной помощи не превышают 30 дней с момента выдачи направления на госпитализацию. В дневных стационарах срок ожидания плановой помощи — не более 14 дней.",
  },
  {
    title: "Как проходит госпитализация?",
    text: "Госпитализация для планового стационарного лечения проводится в течение 2 часов с момента обращения в приёмный покой в назначенный день. Если госпитализировать в назначенный день невозможно, врач стационара обязан известить вас и согласовать новый срок.",
  },
  {
    title: "Что взять с собой в стационар?",
    text: "Паспорт, результаты предыдущих обследований, сменную обувь и предметы личной гигиены. Полный список необходимого администратор пришлёт при бронировании места.",
  },
];

export const Route = createFileRoute("/napravleniya/statsionar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: absoluteUrl("/napravleniya/statsionar") || "/napravleniya/statsionar",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: absoluteUrl("/napravleniya/statsionar") || "/napravleniya/statsionar",
      },
    ],
  }),
  component: StatsionarPage,
});

function StatsionarPage() {
  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Стационар" />
      <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi" }, { label: "Стационар" }]} />

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
                Дежурные врачи и медсёстры 24/7
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-about-ink sm:text-4xl lg:text-5xl">
                Стационары в клинике «Авиценна»
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {WARDS.map((ward) => (
                  <span
                    key={ward}
                    className="rounded-full border border-about-line bg-white px-3.5 py-1.5 text-sm font-semibold text-about-teal"
                  >
                    {ward}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-about-copy sm:text-lg">
                Высококвалифицированные врачи со стажем более 15 лет (доктора и кандидаты
                медицинских наук): кардиологи, невропатологи, ревматологи, эндокринологи. Проводятся
                инструментальные и лабораторные исследования.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={WHATSAPP_BOOKING}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
                >
                  Забронировать место
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
                ул. Бакаева, 106 — главный корпус
              </p>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="/assets/about-hero.webp"
                alt="Стационар клиники Авиценна"
                loading="eager"
                className="aspect-[4/3] w-full rounded-2xl border border-about-line object-cover lg:h-[380px]"
              />
            </div>
          </div>
        </section>

        {/* Особенности */}
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <StatsionarHeading
              icon={<BedDouble className="size-5" aria-hidden="true" />}
              title="Лечение в комфортных условиях"
              description="Средняя стоимость лечения в стационаре включает питание и необходимые процедуры."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-about-line bg-white p-4"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-about-icon text-about-teal">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-about-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-about-copy">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Кардиологический стационар */}
        <section className="bg-about-mint border-y border-about-line py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
            <img
              src="/assets/image-2.webp"
              alt="Палата стационара"
              loading="lazy"
              className="hidden lg:block aspect-[4/3] w-full rounded-2xl border border-about-line object-cover"
            />
            <div>
              <StatsionarHeading
                icon={<HeartPulse className="size-5" aria-hidden="true" />}
                title="Кардиологический стационар"
                description="После процедур на сердце необходимо правильно восстанавливаться — наш стационар поможет вам в этом. Круглосуточное наблюдение, контроль показателей и сопровождение до полного восстановления."
              />
              <ul className="mt-5 grid gap-2.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-about-copy">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-about-icon text-about-teal">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Цены */}
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <StatsionarHeading
              icon={<Stethoscope className="size-5" aria-hidden="true" />}
              title="Стоимость стационара"
              description="Цены указаны за койко-день. В стоимость входит лечение и питание, если не указано иное. Филиал: Бакаева, 106."
            />
            <dl className="mt-6 divide-y divide-[color:var(--color-about-line)] overflow-hidden rounded-2xl border border-about-line bg-white">
              {PRICES.map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
                >
                  <dt className="text-sm leading-snug text-about-copy sm:text-base">{row.name}</dt>
                  <dd className="shrink-0 text-sm font-bold text-about-ink sm:text-base">
                    {row.price} сом
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-about-canvas border-y border-about-line py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <StatsionarHeading
              icon={<CalendarClock className="size-5" aria-hidden="true" />}
              title="Часто задаваемые вопросы"
              description="Всё о стационарном лечении и госпитализации в «Авиценне»."
            />
            <div className="mt-5">
              <FaqList items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-6 rounded-2xl border border-about-line bg-white p-5 sm:p-8 lg:grid-cols-[auto_1fr_auto]">
              <span className="grid size-14 place-items-center rounded-2xl bg-about-icon text-about-teal">
                <Moon className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-about-ink sm:text-2xl">
                  Нужна госпитализация или дневной стационар?
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-about-copy sm:text-base">
                  Забронируйте место заранее — администратор подберёт палату, ответит на вопросы о
                  стоимости и подготовит всё к вашему приезду.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={WHATSAPP_BOOKING}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
                >
                  Забронировать место
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-about-teal px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:bg-brand-green hover:border-brand-green hover:text-white"
                >
                  Онлайн-запись
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatsionarHeading({
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
        <span className="mb-2 grid size-9 place-items-center rounded-xl bg-about-icon text-about-teal">
          {icon}
        </span>
      )}
      <h2 className="text-2xl font-extrabold text-about-ink sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-about-copy sm:text-base">{description}</p>
      )}
    </div>
  );
}
