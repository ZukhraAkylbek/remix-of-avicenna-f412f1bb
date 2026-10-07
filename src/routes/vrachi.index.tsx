import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Plus,
  Stethoscope,
  UserRound,
  Users,
  Microscope,
  ShieldCheck,
  Clock,
  Activity,
  Building2,
  CalendarDays,
  ClipboardCheck,
  MapPin,
  Search,
  RotateCcw,
  ArrowDownUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

function pluralize(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}

import { Reveal } from "@/components/Reveal";
import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { CLINIC_DOCTORS, DOCTOR_CATEGORIES, experienceLabel, type ClinicDoctor } from "@/lib/clinic-doctors";
import teamPhotoAsset from "@/assets/chat/vrachi-team.jpg";

const teamPhoto = teamPhotoAsset;

const TITLE = "Врачи клиники «Авиценна» в Бишкеке — специалисты и запись | Авиценна";
const DESCRIPTION =
  "Более 100 врачей клиники «Авиценна» в Бишкеке: терапевты, хирурги, гинекологи, кардиологи, неврологи и другие специалисты. Запись онлайн 24/7.";

const BENEFITS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Users, title: "Более 100 врачей", text: "Специалисты разных направлений для взрослых и детей." },
  { icon: Stethoscope, title: "Комплексный подход", text: "Консультация, обследование и лечение в одной клинике." },
  { icon: Microscope, title: "Точная диагностика", text: "Лабораторные и инструментальные исследования на месте." },
  { icon: Clock, title: "Онлайн-запись 24/7", text: "Запишитесь на приём в удобное время через сайт." },
  { icon: ClipboardCheck, title: "Процедурный кабинет", text: "Лечебные процедуры по назначению врача." },
  { icon: Activity, title: "Травматолог 24/7", text: "Экстренная помощь при травмах в любое время." },
  { icon: ShieldCheck, title: "Круглосуточный рентген", text: "Лучевая диагностика доступна круглосуточно." },
  { icon: MapPin, title: "Удобное расположение", text: "Клиника в центральной части Бишкека." },
];

const FAQ_ITEMS: Array<{ title: string; text?: string }> = [
  { title: "Как записаться на приём к врачу?", text: "Оставьте заявку через сайт или позвоните в регистратуру — администратор подберёт удобное время и специалиста." },
  { title: "Нужна ли предварительная запись?", text: "Запись рекомендуется, особенно к узким специалистам. На приём к терапевту возможна запись в день обращения при наличии свободных слотов." },
  { title: "Можно ли получить консультацию онлайн?", text: "Онлайн-консультации доступны для отдельных специалистов. Уточните возможность дистанционного приёма у администратора." },
  { title: "Как подготовиться к приёму?", text: "Возьмите паспорт, результаты предыдущих обследований и список принимаемых препаратов. Для некоторых специалистов нужна специальная подготовка — уточните при записи." },
  { title: "Есть ли травмпункт и рентген 24/7?", text: "Да, травмпункт и рентген-кабинет работают круглосуточно, без выходных." },
  { title: "Принимают ли врачи детей?", text: "Да, в клинике ведут приём педиатры и узкие детские специалисты." },
];

export const Route = createFileRoute("/vrachi/")({
  validateSearch: (search: Record<string, unknown>) =>
    typeof search["category"] === "string" ? { category: search["category"] } : {},
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/vrachi") || "/vrachi" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/vrachi") || "/vrachi" }],
  }),
  errorComponent: () => (
    <Shell>
      <h1 className="text-3xl font-extrabold">Не удалось загрузить страницу</h1>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <h1 className="text-3xl font-extrabold">Страница не найдена</h1>
    </Shell>
  ),
  component: DoctorsPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Врачи" />
      <Breadcrumbs items={[{ label: "Врачи" }]} />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

function PageHeading({ title, description }: { title: React.ReactNode; description?: string }) {
  return (
    <div>
      <h2 className="text-about-ink text-2xl leading-tight font-extrabold sm:text-3xl">{title}</h2>
      {description && <p className="text-about-copy mt-3 max-w-2xl text-base">{description}</p>}
    </div>
  );
}

function FaqList({ items }: { items: { title: string; text?: string }[] }) {
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
                <span className="text-about-ink text-base font-semibold">{item.title}</span>
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

const DOCTORS_PER_PAGE = 6;


const selectClass =
  "border-about-line bg-about-canvas text-about-ink h-11 cursor-pointer rounded-xl border px-3 text-sm font-semibold outline-none focus:border-about-teal appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9";
// SVG chevron as data URI for native select arrow
const chevronDataUri =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230a5b4b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

function FilterSelect({
  value,
  onChange,
  "aria-label": ariaLabel,
  children,
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  "aria-label": string;
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  const Icon = icon;
  return (
    <label className="border-about-line bg-about-canvas focus-within:border-about-teal flex h-11 min-w-0 items-center gap-2 rounded-xl border px-3">
      {Icon && <Icon className="text-about-teal size-4 shrink-0" aria-hidden="true" />}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${selectClass} border-0 bg-transparent px-0 pr-6 text-sm font-semibold outline-none`}
        style={{ backgroundImage: `url(${chevronDataUri})` }}
      >
        {children}
      </select>
    </label>
  );
}

function DoctorsDirectory({ doctors, initialCategory }: { doctors: ClinicDoctor[]; initialCategory: string | undefined }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(() =>
    initialCategory && DOCTOR_CATEGORIES.some((item) => item.slug === initialCategory)
      ? initialCategory
      : "all",
  );
  const [branch, setBranch] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(0);

  const branches = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.branch))).sort((a, b) => a.localeCompare(b, "ru")),
    [doctors],
  );

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");
    const result = doctors.filter((doctor) => {
      if (normalizedQuery.length > 0) {
        const haystack = `${doctor.name} ${doctor.specialty} ${doctor.branch} ${
          DOCTOR_CATEGORIES.find((c) => c.slug === doctor.category)?.name ?? ""
        }`.toLocaleLowerCase("ru");
        if (!normalizedQuery.split(/\s+/).every((word) => haystack.includes(word))) {
          return false;
        }
      }
      if (category !== "all" && doctor.category !== category) return false;
      if (branch !== "all" && doctor.branch !== branch) return false;
      return true;
    });
    if (sort === "exp") {
      result.sort((a, b) => (b.experience ?? -1) - (a.experience ?? -1));
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    }
    return result;
  }, [branch, category, doctors, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const visibleDoctors = filteredDoctors.slice(
    safePage * DOCTORS_PER_PAGE,
    (safePage + 1) * DOCTORS_PER_PAGE,
  );

  const hasActiveFilters =
    query.trim() !== "" || category !== "all" || branch !== "all" || sort !== "default";

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setBranch("all");
    setSort("default");
    setPage(0);
  };

  const update = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(0);
  };

  return (
    <div className="mt-6">
      {/* Search + reset */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <label className="border-about-line bg-about-canvas focus-within:border-about-teal flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 sm:px-4">
          <Search className="text-about-teal size-5 shrink-0" aria-hidden="true" />
          <span className="sr-only">Поиск врача</span>
          <input
            type="search"
            value={query}
            onChange={(event) => update(setQuery)(event.target.value)}
            placeholder="Поиск врача, специальности, услуги..."
            className="text-about-ink placeholder:text-about-copy min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAll}
            className="border-about-line text-about-teal hover:bg-about-icon flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Сбросить
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
        <FilterSelect
          aria-label="Специальность"
          icon={Stethoscope}
          value={category}
          onChange={update(setCategory)}
        >
          <option value="all">Все специальности</option>
          {DOCTOR_CATEGORIES.filter((item) => doctors.some((doctor) => doctor.category === item.slug)).map((item) => (
            <option key={item.slug} value={item.slug}>{item.name}</option>
          ))}
        </FilterSelect>

        <FilterSelect
          aria-label="Клиника"
          icon={Building2}
          value={branch}
          onChange={update(setBranch)}
        >
          <option value="all">Все клиники</option>
          {branches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </FilterSelect>

        <FilterSelect
          aria-label="Сортировка"
          icon={ArrowDownUp}
          value={sort}
          onChange={update(setSort)}
        >
          <option value="default">По умолчанию</option>
          <option value="exp">По стажу ↓</option>
          <option value="name">По имени А–Я</option>
        </FilterSelect>
      </div>

      {/* Count + pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-about-copy text-sm">
          {filteredDoctors.length > 0
            ? `${filteredDoctors.length} ${pluralize(filteredDoctors.length, "врач", "врача", "врачей")}`
            : "Врачи не найдены"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Предыдущая страница"
            disabled={safePage === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="border-about-line text-about-teal rounded-full bg-about-canvas shadow-none"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <span className="text-about-copy text-sm font-semibold tabular-nums">
            {safePage + 1} / {pageCount}
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label="Следующая страница"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            className="border-about-line text-about-teal rounded-full bg-about-canvas shadow-none"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Cards grid */}
      {visibleDoctors.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDoctors.map((doctor) => (
            <article
              key={doctor.slug}
              className="border-about-line bg-about-canvas flex flex-row items-start gap-3 rounded-2xl border p-3 sm:flex-col sm:gap-0 sm:p-4"
            >
              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  loading="lazy"
                  className="size-20 shrink-0 rounded-full object-cover object-top sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-xl"
                />
              ) : (
                <span className="bg-about-icon text-about-teal grid size-20 shrink-0 place-items-center rounded-full sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-xl">
                  <UserRound className="size-8 sm:size-16" aria-hidden="true" />
                </span>
              )}
              <div className="min-w-0 flex-1 sm:contents">
                <h3 className="text-about-ink text-base leading-snug font-bold sm:mt-4 sm:text-lg">{doctor.name}</h3>
                <p className="bg-about-icon text-about-teal mt-1.5 w-fit rounded-full px-3 py-1 text-[13px] font-semibold sm:mt-3">
                  {doctor.specialty}
                </p>
                <div className="mt-2 space-y-1 sm:mt-4 sm:space-y-2">
                  <p className="text-about-copy flex items-center gap-2 text-[13px] sm:text-sm">
                    <Building2 className="text-about-teal size-4 shrink-0" aria-hidden="true" />
                    {doctor.branch}
                  </p>
                  {doctor.experience != null && (
                    <p className="text-about-copy flex items-center gap-2 text-[13px] sm:text-sm">
                      <CalendarDays className="text-about-teal size-4 shrink-0" aria-hidden="true" />
                      Стаж: {experienceLabel(doctor.experience)}
                    </p>
                  )}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-about-teal text-about-ink hover:bg-brand-green hover:border-brand-green hover:text-white mt-3 h-9 w-full bg-transparent text-sm shadow-none sm:mt-auto sm:h-10"
                >
                  <Link to="/vrachi/$slug" params={{ slug: doctor.slug }}>
                    Подробнее
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-about-line text-about-copy mt-5 rounded-2xl border p-6 text-center text-sm">
          По вашему запросу врачи не найдены.
        </div>
      )}
    </div>
  );
}

function DoctorsPage() {
  const search = Route.useSearch();
  const category = "category" in search ? search.category : undefined;
  const heroImage = teamPhoto;
  const faqItems = FAQ_ITEMS;

  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Врачи" />
      <Breadcrumbs items={[{ label: "Врачи" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(faqItems.map((item) => ({ question: item.title, answer: item.text ?? "" }))),
          ),
        }}
      />

      <main>
        {/* Hero */}
        <section className="bg-about-mint">
          <div className="mx-auto grid max-w-7xl overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:h-[380px] lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:py-8">
            <Reveal className="flex flex-col justify-center lg:pr-10">
              <p className="text-about-teal text-sm font-semibold">Поликлиника</p>
              <h1 className="text-about-ink mt-2 max-w-2xl text-3xl leading-[1.08] font-extrabold sm:text-4xl lg:text-5xl">
                Наши врачи
              </h1>
              <p className="text-about-copy mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                Опытные специалисты «Авиценны» — терапевты, хирурги, кардиологи, гинекологи,
                неврологи и другие врачи для взрослых и детей. Подберём врача и удобное время.
              </p>
              <div className="mt-4 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-9">
                    <Users className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-about-ink text-[11px] font-bold leading-snug sm:text-sm">
                    100+ врачей
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-9">
                    <Microscope className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-about-ink text-[11px] font-bold leading-snug sm:text-sm">
                    Полная диагностика
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-9">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-about-ink text-[11px] font-bold leading-snug sm:text-sm">
                    Запись 24/7
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                <Button
                  asChild
                  className="bg-brand-green text-brand-white hover:bg-brand-green-dark px-3 text-xs shadow-none sm:px-4 sm:text-sm"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Записаться на приём
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-about-line text-about-ink bg-about-canvas px-3 text-xs shadow-none sm:px-4 sm:text-sm"
                >
                  <a href="#vrachi">Все специалисты</a>
                </Button>
              </div>
            </Reveal>
            <div className="relative mt-6 hidden h-60 overflow-hidden rounded-2xl lg:mt-0 lg:block lg:h-full">
              <img
                src={heroImage}
                alt="Врачи клиники «Авиценна»"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="from-about-mint/30 absolute inset-0 bg-gradient-to-r to-transparent" />
              <div className="bg-about-canvas/95 absolute right-0 bottom-0 grid grid-cols-2 gap-6 rounded-tl-2xl p-4 backdrop-blur-sm">
                <div>
                  <strong className="text-about-ink block text-2xl">100+</strong>
                  <span className="text-about-copy text-xs">врачей</span>
                </div>
                <div>
                  <strong className="text-about-ink block text-2xl">26</strong>
                  <span className="text-about-copy text-xs">специальностей</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors carousel */}
        <section id="vrachi" className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PageHeading
              title="Наши врачи"
              description="Подберите специалиста по направлению и запишитесь на приём онлайн."
            />
            <DoctorsDirectory doctors={CLINIC_DOCTORS} initialCategory={category} />
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PageHeading title="Наши возможности" description="Всё для диагностики и лечения в одной клинике." />
            <AdvantagesGrid items={BENEFITS} compact />
          </div>
        </section>


        {/* FAQ */}
        <section id="faq" className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PageHeading title="Часто задаваемые вопросы" />
            <div className="mt-5">
              <FaqList items={faqItems} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl overflow-hidden px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col justify-center py-6 lg:pr-10">
              <h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl">Забота о вас и вашей семье</h2>
              <p className="text-about-copy mt-3 max-w-xl text-base leading-relaxed">
                Запишитесь на приём к специалисту «Авиценны» — врач оценит состояние, ответит на
                вопросы и предложит понятный план действий.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-brand-green text-brand-white hover:bg-brand-green-dark shadow-none"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Записаться на приём
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-about-line text-about-ink bg-about-canvas shadow-none"
                >
                  <a href={`tel:${CLINIC.phones[0]}`}>
                    <Phone className="size-4" aria-hidden="true" /> {CLINIC.phones[0]}
                  </a>
                </Button>
              </div>
            </div>
            <img
              src={heroImage}
              alt="Консультация врача в клинике «Авиценна»"
              loading="lazy"
              className="hidden lg:block h-60 w-full rounded-2xl object-cover"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
