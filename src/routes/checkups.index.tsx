import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Baby,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";

import asianFamilyHeroAsset from "@/assets/chat/asian-family-hero.webp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckupIcon } from "@/components/checkups/CheckupIcon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { absoluteUrl } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { ContactButtons } from "@/components/ContactButtons";

const TITLE = "Чекапы для вашего здоровья | Авиценна";
const DESCRIPTION =
  "Чекапы в клинике «Авиценна» в Бишкеке: программы обследования для женщин, мужчин и детей, мини-чекапы, персональные и корпоративные решения.";

export const Route = createFileRoute("/checkups/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/checkups") || "/checkups" }],
  }),
  component: CheckupsPage,
});

type MiniProgram = {
  title: string;
  price: string;
  icon: string;
};

const MINI_PROGRAMS: MiniProgram[] = [
  { title: "Здоровые лёгкие", price: "1 300 сом", icon: "lungs" },
  { title: "Здоровый желудок", price: "8 400 сом", icon: "stomach" },
  { title: "Здоровое сердце", price: "5 800 сом", icon: "heart" },
  { title: "Лишний вес", price: "5 000 сом", icon: "weight" },
  { title: "Эндокринологический", price: "5 300 сом", icon: "thyroid" },
  { title: "Проктологический", price: "5 000 сом", icon: "clipboard" },
  { title: "Спортивный", price: "4 800 сом", icon: "activity" },
];


const PROGRAM_CONTENT = [
  "Лабораторные исследования по направлению программы",
  "Необходимые диагностические исследования",
  "Консультация профильного специалиста",
  "Итоговое заключение и рекомендации врача",
];

type ProgramDetail = {
  label: string;
  price: string;
  title: string;
  includes: string[];
  note?: string;
};

const FEMALE_PROGRAMS: ProgramDetail[] = [
  {
    label: "Базовый",
    price: "39 000 сом",
    title: "Женский чекап — Базовый",
    includes: [
      "УЗИ 9 органов, ЭКГ, ЭХОКГ, ЭГДС, рентген/РКТ, дыхательный тест",
      "27 видов анализов",
      "Консультации: терапевт, проктолог и гинеколог, маммолог/уролог, невролог, ортопед",
      "Паспорт здоровья с рекомендациями",
    ],
  },
  {
    label: "Расширенный",
    price: "62 000 сом",
    title: "Женский чекап — Расширенный",
    includes: [
      "УЗИ 9 органов, ЭКГ, ЭХОКГ, ЭГДС и колоноскопия под наркозом, спирометрия, Доплер сосудов, дыхательный тест на H. pylori, суточный мониторинг АД и ЭКГ",
      "53 лабораторных анализа",
      "Консультации гинеколога, терапевта, маммолога, ортопеда, невролога, проктолога, кардиолога",
      "Паспорт здоровья с индивидуальными рекомендациями",
    ],
  },
];

const MALE_PROGRAMS: ProgramDetail[] = [
  {
    label: "Базовый",
    price: "34 000 сом",
    title: "Мужской чекап — Базовый",
    includes: [
      "УЗИ 9 органов, ЭКГ, ЭХОКГ, ЭГДС, рентген/РКТ, дыхательный тест",
      "27 видов анализов",
      "Консультации: терапевт, проктолог и гинеколог, маммолог/уролог, невролог, ортопед",
      "Паспорт здоровья с рекомендациями",
    ],
  },
  {
    label: "Расширенный",
    price: "62 000 сом",
    title: "Мужской чекап — Расширенный",
    includes: [
      "Полное обследование, аналогичное женскому расширенному",
      "54 лабораторных анализа",
      "Консультации уролога, терапевта, кардиолога, ортопеда, невролога, проктолога",
      "Паспорт здоровья с индивидуальными рекомендациями",
    ],
    note: "Рекомендуется мужчинам от 25 лет — 1 раз в год",
  },
];

const CHILD_PROGRAMS: ProgramDetail[] = [
  {
    label: "С 3 до 9 лет",
    price: "от 17 000 сом",
    title: "Детский чекап — С 3 до 9 лет",
    includes: [
      "УЗИ 7 органов, ЭКГ (с 10 лет), РКТ (с 10 лет)",
      "20 лабораторных анализов",
      "Консультация педиатра, ортопеда",
      "Паспорт здоровья",
    ],
  },
  {
    label: "С 10 до 16 лет",
    price: "от 18 500 сом",
    title: "Детский чекап — С 10 до 16 лет",
    includes: [
      "УЗИ 7 органов, ЭКГ, РКТ",
      "20 лабораторных анализов",
      "Консультация педиатра, ортопеда",
      "Паспорт здоровья",
    ],
  },
];

const FAQ = [
  {
    q: "Сколько времени занимает чекап?",
    a: "Большинство программ можно пройти за один визит. В среднем обследование занимает от полутора до трёх часов.",
  },
  {
    q: "Можно ли пройти чекап без направления врача?",
    a: "Да. Выберите подходящую программу самостоятельно или обратитесь к администратору за помощью.",
  },
  {
    q: "Как подготовиться к обследованию?",
    a: "Основные анализы сдаются натощак. Точные рекомендации зависят от программы и сообщаются при записи.",
  },
  {
    q: "Как получить результаты?",
    a: "Результаты и заключение выдаются лично и могут быть отправлены в электронном виде.",
  },
];

function CheckupsPage() {
  const [miniListOpen, setMiniListOpen] = useState(false);
  const [activeMini, setActiveMini] = useState<MiniProgram | null>(null);
  const [activeProgram, setActiveProgram] = useState<ProgramDetail | null>(null);

  return (
    <div className="min-h-screen bg-about-canvas">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Чекапы" }]} />
      <main>
        <section className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-12">
          <div className="border-about-line relative h-[350px] overflow-hidden rounded-2xl border sm:h-[380px]">
            <img
              src={asianFamilyHeroAsset}
              alt="Семья, заботящаяся о здоровье"
              className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
              width={1344}
              height={768}
              fetchPriority="high"
            />
            <div className="from-about-mint via-about-mint/90 absolute inset-0 bg-gradient-to-r to-transparent" />
            <div className="relative flex h-full max-w-xl flex-col justify-center p-5 sm:p-9">
              <p className="text-about-teal text-xs font-bold uppercase">Комплексная диагностика</p>
              <h1 className="text-about-ink mt-3 text-3xl leading-tight font-extrabold sm:text-5xl">
                Чекапы для уверенности в здоровье
              </h1>
              <p className="text-about-copy mt-4 max-w-md text-sm leading-relaxed sm:text-base">
                Анализы, диагностика и консультации врачей в одной продуманной программе.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark">
                  <a href="#programs">Выбрать чекап</a>
                </Button>
                <Button asChild variant="outline" className="border-about-teal bg-background/80 text-about-ink hover:bg-about-icon">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Получить консультацию</a>
                </Button>
                <ContactButtons />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-about-mint border-about-line border-y">
          <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-about-teal text-xs font-bold uppercase">Общее о чекапах</p>
              <h2 className="text-about-ink mt-2 text-2xl font-extrabold sm:text-2xl">
                Проверить здоровье до появления симптомов
              </h2>
              <p className="text-about-copy mt-4 text-sm leading-relaxed sm:text-base">
                Чекап помогает оценить состояние организма, увидеть возможные риски и получить понятный план дальнейших действий.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: UsersRound, title: "Кому подходит", text: "Взрослым и детям" },
                { icon: Clock3, title: "Как часто", text: "Один раз в год" },
                { icon: ShieldCheck, title: "Почему важно", text: "Раннее выявление рисков" },
              ].map((item) => (
                <article key={item.title} className="border-about-line bg-about-canvas rounded-2xl border p-4">
                  <item.icon className="text-about-teal size-6" />
                  <h3 className="text-about-ink mt-3 text-sm font-extrabold">{item.title}</h3>
                  <p className="text-about-copy mt-1 text-xs leading-snug">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="max-w-2xl">
              <p className="text-about-teal text-xs font-bold uppercase">Программы</p>
              <h2 className="text-about-ink mt-2 text-2xl font-extrabold sm:text-2xl">Выберите подходящий чекап</h2>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-12">
              <ProgramGroup
                className="pastel-rose lg:col-span-8"
                icon={CircleUserRound}
                title="Женские чекапы"
                image="/assets/checkup-female.jpg"
                programs={FEMALE_PROGRAMS}
                onSelect={setActiveProgram}
              />
              <ProgramGroup
                className="pastel-sky lg:col-span-4"
                icon={Stethoscope}
                title="Мужские чекапы"
                image="/assets/checkup-male.jpg"
                programs={MALE_PROGRAMS}
                onSelect={setActiveProgram}
              />
              <ProgramGroup
                className="pastel-sand lg:col-span-4"
                icon={Baby}
                title="Детские чекапы"
                image="/assets/checkup-child.jpg"
                programs={CHILD_PROGRAMS}
                onSelect={setActiveProgram}
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => setMiniListOpen(true)}
                className="border-about-line bg-about-mint hover:border-brand-green hover:bg-about-mint h-auto sm:min-h-56 items-stretch justify-between whitespace-normal rounded-2xl p-5 text-left shadow-none lg:col-span-4"
              >
                <span className="flex w-full flex-col">
                  <span className="bg-background text-about-teal grid size-11 place-items-center rounded-full"><Sparkles className="size-5" /></span>
                  <span className="text-about-ink mt-4 text-xl font-extrabold">Мини-чекапы</span>
                  <span className="text-about-copy mt-2 text-sm leading-relaxed">Компактные программы по отдельным направлениям здоровья.</span>
                  <span className="text-about-teal mt-auto flex items-center gap-1 pt-5 text-sm font-bold">Посмотреть программы <ChevronRight className="size-4" /></span>
                </span>
              </Button>

              <Button asChild variant="outline" className="border-about-line bg-about-icon hover:border-brand-green hover:bg-about-icon h-auto sm:min-h-56 items-stretch justify-between whitespace-normal rounded-2xl p-5 text-left shadow-none lg:col-span-4">
                <Link to="/checkups/personal">
                  <span className="flex w-full flex-col">
                    <span className="bg-brand-green text-brand-white grid size-11 place-items-center rounded-full"><SlidersHorizontal className="size-5" /></span>
                    <span className="text-about-ink mt-4 text-xl font-extrabold">Персональный чекап</span>
                    <span className="text-about-copy mt-2 text-sm leading-relaxed">Соберите программу под свои цели и сразу увидите стоимость.</span>
                    <span className="text-about-teal mt-auto flex items-center gap-1 pt-5 text-sm font-bold">Собрать чекап <ChevronRight className="size-4" /></span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>


        <section className="bg-about-mint border-about-line border-y">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <h2 className="text-about-ink text-2xl font-extrabold sm:text-2xl">Часто задаваемые вопросы</h2>
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {FAQ.map((item) => (
                <details key={item.q} className="group border-about-line bg-about-canvas rounded-2xl border p-4">
                  <summary className="text-about-ink flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold sm:text-base">
                    {item.q}
                    <ChevronDown className="text-about-teal size-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-about-copy mt-3 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="bg-about-ink text-brand-white rounded-2xl p-6 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-2xl">Хотите подобрать чекап?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80">Оставьте заявку — администратор поможет выбрать программу и удобное время.</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-80">Подберём и корпоративную программу для сотрудников.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5 shrink-0 lg:mt-0">
              <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><CalendarCheck className="size-4" />Оставить заявку</a>
              </Button>
              <ContactButtons onDark />
              <Button asChild variant="outline" className="border-brand-white/40 text-brand-white bg-transparent hover:bg-transparent hover:text-brand-white">
                <a href="https://wa.me/996707909001?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20%D0%BA%D0%BE%D1%80%D0%BF%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9%20%D1%87%D0%B5%D0%BA%D0%B0%D0%BF." target="_blank" rel="noopener noreferrer">Корпоративный чекап</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Список мини-чекапов */}
      <Dialog open={miniListOpen} onOpenChange={setMiniListOpen}>
        <DialogContent className="border-about-line max-h-[88vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl p-5 sm:p-7">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-about-ink text-2xl font-extrabold">Мини-чекапы</DialogTitle>
            <DialogDescription className="text-about-copy">Нажмите на программу, чтобы сразу увидеть состав и записаться.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 sm:grid-cols-2">
            {MINI_PROGRAMS.map((item) => (
              <button key={item.title} type="button" onClick={() => { setMiniListOpen(false); setActiveMini(item); }} className="border-about-line hover:border-brand-green hover:bg-about-mint h-auto justify-start gap-3 whitespace-normal rounded-xl border p-3 text-left shadow-none transition-colors">
                <span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full"><CheckupIcon name={item.icon} className="size-4" /></span>
                <span><strong className="text-about-ink block text-sm">{item.title}</strong><span className="text-about-teal mt-1 block text-xs font-bold">{item.price}</span></span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Состав выбранного мини-чекапа */}
      <Dialog open={activeMini !== null} onOpenChange={(open) => !open && setActiveMini(null)}>
        <DialogContent className="border-about-line max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-5 sm:p-7">
          {activeMini && (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-about-ink flex items-center gap-3 text-2xl font-extrabold">
                  <span className="bg-about-icon text-about-teal grid size-10 shrink-0 place-items-center rounded-full"><CheckupIcon name={activeMini.icon} className="size-5" /></span>
                  {activeMini.title}
                </DialogTitle>
                <DialogDescription className="text-about-copy">Что входит в программу</DialogDescription>
              </DialogHeader>
              <ul className="mt-4 space-y-3">
                {PROGRAM_CONTENT.map((item) => (
                  <li key={item} className="text-about-copy flex items-start gap-3 text-sm"><span className="bg-about-icon text-about-teal mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"><Check className="size-3" /></span>{item}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <strong className="text-brand-green text-xl">{activeMini.price}</strong>
                <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Записаться</a></Button>
              </div>
              <button type="button" onClick={() => { setActiveMini(null); setMiniListOpen(true); }} className="text-about-teal mt-3 text-sm font-bold underline-offset-4 hover:underline">
                ← Назад к списку мини-чекапов
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={activeProgram !== null} onOpenChange={(open) => !open && setActiveProgram(null)}>
        <DialogContent className="border-about-line max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-5 sm:p-7">
          {activeProgram && (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-about-ink text-2xl font-extrabold">{activeProgram.title}</DialogTitle>
                <DialogDescription className="text-about-copy">Что входит в программу</DialogDescription>
              </DialogHeader>
              <ul className="mt-4 space-y-3">
                {activeProgram.includes.map((item) => (
                  <li key={item} className="text-about-copy flex items-start gap-3 text-sm leading-relaxed">
                    <span className="bg-about-icon text-about-teal mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"><Check className="size-3" /></span>
                    {item}
                  </li>
                ))}
              </ul>
              {activeProgram.note && (
                <p className="text-about-teal mt-4 flex items-start gap-2 text-sm font-semibold">
                  <Check className="size-4 shrink-0" />{activeProgram.note}
                </p>
              )}
              <div className="border-about-line mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <strong className="text-brand-green text-xl">{activeProgram.price}</strong>
                <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Записаться на чекап</a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProgramGroup({
  className,
  icon: Icon,
  title,
  image,
  programs,
  onSelect,
}: {
  className: string;
  icon: typeof CircleUserRound;
  title: string;
  image: string;
  programs: ProgramDetail[];
  onSelect: (program: ProgramDetail) => void;
}) {
  return (
    <article className={`${className} border-about-line relative sm:min-h-64 overflow-hidden rounded-2xl border p-5`}>
      <img src={image} alt="" className="absolute inset-y-0 right-0 h-full w-[42%] object-cover object-top opacity-90" loading="lazy" />
      <div className="relative flex h-full max-w-[64%] flex-col">
        <span className="bg-background/80 text-about-teal grid size-11 place-items-center rounded-full"><Icon className="size-5" /></span>
        <h3 className="text-about-ink mt-4 text-xl font-extrabold">{title}</h3>
        <div className="mt-auto space-y-2 pt-5">
          {programs.map((program) => (
            <button
              key={program.label}
              type="button"
              onClick={() => onSelect(program)}
              className="border-about-line bg-background/85 text-about-ink hover:border-brand-green flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-colors sm:text-sm"
            >
              <span>{program.label}</span>
              <span className="text-about-teal flex shrink-0 items-center gap-1">{program.price}<ChevronRight className="size-4" /></span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
