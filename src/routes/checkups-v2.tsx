import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Baby,
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  HeartPulse,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";

import founderPortrait from "@/assets/founder-zhypar.png";
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
/** Ссылка WhatsApp с сообщением о выбранном чекапе */
function waHref(title?: string) {
  const text = title
    ? `Здравствуйте! Хочу записаться на чекап: ${title}.`
    : "Здравствуйте! Хочу записаться на чекап.";
  return `https://wa.me/996779909009?text=${encodeURIComponent(text)}`;
}

const TITLE = "Чекапы — новая программа | Авиценна";
const DESCRIPTION =
  "Комплексные программы обследования для женщин, мужчин и детей, мини-чекапы, персональные и корпоративные решения клиники «Авиценна».";

export const Route = createFileRoute("/checkups-v2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/checkups-v2") || "/checkups-v2" }],
  }),
  component: CheckupsV2Page,
});

type MiniProgram = {
  title: string;
  price: string;
  icon: string;
};

const MINI_PROGRAMS: MiniProgram[] = [
  { title: "Здоровое сердце", price: "5 800 сом", icon: "heart" },
  { title: "Здоровые лёгкие", price: "1 300 сом", icon: "lungs" },
  { title: "Здоровый желудок", price: "8 400 сом", icon: "stomach" },
  { title: "Энергия и витамины", price: "4 600 сом", icon: "activity" },
  { title: "Эндокринологический", price: "5 300 сом", icon: "thyroid" },
  { title: "Спортивный", price: "4 800 сом", icon: "weight" },
];

const DEFAULT_MINI_PROGRAM: MiniProgram = {
  title: "Здоровое сердце",
  price: "5 800 сом",
  icon: "heart",
};

const PROGRAM_CONTENT = [
  "Лабораторные исследования по направлению программы",
  "Необходимые диагностические исследования",
  "Консультация профильного специалиста",
  "Итоговое заключение и рекомендации врача",
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

function CheckupsV2Page() {
  const [activeMini, setActiveMini] = useState<MiniProgram | null>(null);

  return (
    <div className="min-h-screen bg-about-canvas">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Чекапы V2" }]} />
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
                  <a href={waHref()} target="_blank" rel="noopener noreferrer">Получить консультацию</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-about-mint border-about-line border-y">
          <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-about-teal text-xs font-bold uppercase">Общее о чекапах</p>
              <h2 className="text-about-ink mt-2 text-2xl font-extrabold sm:text-3xl">
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
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="max-w-2xl">
              <p className="text-about-teal text-xs font-bold uppercase">Программы</p>
              <h2 className="text-about-ink mt-2 text-2xl font-extrabold sm:text-3xl">Выберите подходящий чекап</h2>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-12">
              <ProgramGroup
                className="pastel-rose lg:col-span-8"
                icon={CircleUserRound}
                title="Женские чекапы"
                image="/assets/checkup-female.jpg"
                programs={[
                  { label: "Базовый", price: "35 000 сом" },
                  { label: "Расширенный", price: "62 000 сом" },
                ]}
              />
              <ProgramGroup
                className="pastel-sky lg:col-span-4"
                icon={Stethoscope}
                title="Мужские чекапы"
                image="/assets/checkup-male.jpg"
                programs={[
                  { label: "Базовый", price: "31 000 сом" },
                  { label: "Расширенный", price: "62 000 сом" },
                ]}
              />
              <ProgramGroup
                className="pastel-sand lg:col-span-4"
                icon={Baby}
                title="Детские чекапы"
                image="/assets/checkup-child.jpg"
                programs={[
                  { label: "С 3 до 9 лет", price: "от 15 000 сом" },
                  { label: "С 10 до 16 лет", price: "от 18 000 сом" },
                ]}
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveMini(DEFAULT_MINI_PROGRAM)}
                className="border-about-line bg-about-mint hover:border-brand-green hover:bg-about-mint h-auto min-h-56 items-stretch justify-between whitespace-normal rounded-2xl p-5 text-left shadow-none lg:col-span-4"
              >
                <span className="flex w-full flex-col">
                  <span className="bg-background text-about-teal grid size-11 place-items-center rounded-full"><Sparkles className="size-5" /></span>
                  <span className="text-about-ink mt-4 text-xl font-extrabold">Мини-чекапы</span>
                  <span className="text-about-copy mt-2 text-sm leading-relaxed">Компактные программы по отдельным направлениям здоровья.</span>
                  <span className="text-about-teal mt-auto flex items-center gap-1 pt-5 text-sm font-bold">Посмотреть программы <ChevronRight className="size-4" /></span>
                </span>
              </Button>

              <Button asChild variant="outline" className="border-about-line bg-about-icon hover:border-brand-green hover:bg-about-icon h-auto min-h-56 items-stretch justify-between whitespace-normal rounded-2xl p-5 text-left shadow-none lg:col-span-4">
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
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="border-about-line bg-about-canvas grid gap-6 rounded-2xl border p-5 sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <span className="bg-about-icon text-about-teal grid size-14 place-items-center rounded-full"><Building2 className="size-7" /></span>
              <div>
                <h2 className="text-about-ink text-2xl font-extrabold">Корпоративные чекапы</h2>
                <p className="text-about-copy mt-2 max-w-2xl text-sm leading-relaxed">Программы профилактического обследования сотрудников с удобной организацией для компаний.</p>
              </div>
              <Button asChild variant="outline" className="border-about-teal text-about-ink hover:bg-about-icon">
                <a href={waHref()} target="_blank" rel="noopener noreferrer">Обсудить программу</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="border-about-line grid overflow-hidden rounded-2xl border lg:grid-cols-[280px_1fr]">
            <div className="bg-about-mint h-56 lg:h-64">
              <img src={founderPortrait} alt="Керималиева Жыпар Абдыказиевна" className="h-full w-full object-cover object-top" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-8">
              <HeartPulse className="text-brand-green size-7" />
              <blockquote className="text-about-ink mt-4 max-w-3xl text-xl leading-relaxed font-bold sm:text-2xl">
                «Сохранение вашего здоровья — миссия „Авиценны“»
              </blockquote>
              <p className="text-about-copy mt-4 text-sm">Керималиева Жыпар Абдыказиевна, основатель клиники</p>
            </div>
          </div>
        </section>

        <section className="bg-about-mint border-about-line border-y">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl">Часто задаваемые вопросы</h2>
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

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="bg-about-ink text-brand-white rounded-2xl p-6 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Хотите подобрать чекап?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80">Оставьте заявку — администратор поможет выбрать программу и удобное время.</p>
            </div>
            <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark mt-5 shrink-0 lg:mt-0">
              <a href={waHref()} target="_blank" rel="noopener noreferrer"><CalendarCheck className="size-4" />Оставить заявку</a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />

      <Dialog open={activeMini !== null} onOpenChange={(open) => !open && setActiveMini(null)}>
        <DialogContent className="border-about-line max-h-[88vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl p-5 sm:p-7">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-about-ink text-2xl font-extrabold">Мини-чекапы</DialogTitle>
            <DialogDescription className="text-about-copy">Выберите программу, чтобы посмотреть её состав.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 sm:grid-cols-2">
            {MINI_PROGRAMS.map((item) => (
              <Button key={item.title} type="button" variant="outline" onClick={() => setActiveMini(item)} className={`border-about-line h-auto justify-start gap-3 whitespace-normal rounded-xl p-3 text-left shadow-none ${activeMini?.title === item.title ? "border-brand-green bg-about-mint" : "hover:bg-about-icon"}`}>
                <span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full"><CheckupIcon name={item.icon} className="size-4" /></span>
                <span><strong className="text-about-ink block text-sm">{item.title}</strong><span className="text-about-teal mt-1 block text-xs font-bold">{item.price}</span></span>
              </Button>
            ))}
          </div>
          {activeMini && (
            <div className="border-about-line mt-2 border-t pt-5">
              <h3 className="text-about-ink text-lg font-extrabold">Что входит в «{activeMini.title}»</h3>
              <ul className="mt-4 space-y-3">
                {PROGRAM_CONTENT.map((item) => (
                  <li key={item} className="text-about-copy flex items-start gap-3 text-sm"><span className="bg-about-icon text-about-teal mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"><Check className="size-3" /></span>{item}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <strong className="text-brand-green text-xl">{activeMini.price}</strong>
                <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark"><a href={waHref(activeMini.title)} target="_blank" rel="noopener noreferrer">Записаться</a></Button>
              </div>
            </div>
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
}: {
  className: string;
  icon: typeof CircleUserRound;
  title: string;
  image: string;
  programs: Array<{ label: string; price: string }>;
}) {
  return (
    <article className={`${className} border-about-line relative min-h-64 overflow-hidden rounded-2xl border p-5`}>
      <img src={image} alt="" className="absolute inset-y-0 right-0 h-full w-[42%] object-cover object-top opacity-90" loading="lazy" />
      <div className="relative flex h-full max-w-[64%] flex-col">
        <span className="bg-background/80 text-about-teal grid size-11 place-items-center rounded-full"><Icon className="size-5" /></span>
        <h3 className="text-about-ink mt-4 text-xl font-extrabold">{title}</h3>
        <div className="mt-auto space-y-2 pt-5">
          {programs.map((program) => (
            <a key={program.label} href={waHref(program.label)} target="_blank" rel="noopener noreferrer" className="border-about-line bg-background/85 text-about-ink hover:border-brand-green flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors sm:text-sm">
              <span className="min-w-0 truncate">{program.label}</span><span className="text-about-teal flex shrink-0 items-center gap-1"><span className="w-[6rem] text-right tabular-nums">{program.price}</span><ChevronRight className="size-4" /></span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}