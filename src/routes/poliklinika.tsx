import { BannerSlider } from "@/components/BannerSlider";
import { PAGE_BANNERS } from "@/lib/page-banners";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  BriefcaseMedical,
  Check,
  ClipboardCheck,
  Clock,
  Ear,
  HeartPulse,
  Hospital,
  Mars,
  MapPin,
  Microscope,
  Plus,
  ShieldCheck,
  Stethoscope,
  Users,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import doctorPatientHeroAsset from "@/assets/chat/doctor-patient-hero.webp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { ContactButtons } from "@/components/ContactButtons";

const TITLE = "Поликлиника в Бишкеке — врачи и диагностика | Авиценна";
const DESCRIPTION =
  "Поликлиника «Авиценна» в Бишкеке: консультации врачей, диагностика, анализы и комплексное наблюдение для взрослых и детей.";

const POLYCLINIC_SPECIALISTS: Array<{ name: string; category: string; icon: LucideIcon; surgery?: string }> = [
  { name: "Терапевты и семейные врачи", category: "terapiya", icon: Stethoscope },
  { name: "Педиатры", category: "pediatriya", icon: Baby },
  { name: "Кардиологи", category: "uzkie", icon: HeartPulse },
  { name: "Неврологи", category: "nevrologiya", icon: Brain },
  { name: "Гастроэнтерологи", category: "uzkie", icon: Activity },
  { name: "Эндокринологи", category: "uzkie", icon: Microscope },
  { name: "Гинекологи", category: "ginekologiya", icon: Venus, surgery: "ginekologiya" },
  { name: "Урологи", category: "urologiya", icon: Mars, surgery: "urologiya" },
  { name: "Хирурги", category: "hirurgiya", icon: BriefcaseMedical, surgery: "obshchaya-hirurgiya" },
  { name: "Травматологи-ортопеды", category: "travmatologiya", icon: Bone, surgery: "travmatologiya" },
  { name: "ЛОР-врачи", category: "uzkie", icon: Ear },
  { name: "Проктологи", category: "hirurgiya", icon: Hospital, surgery: "proktologiya" },
  { name: "Маммологи", category: "onkologiya", icon: HeartPulse, surgery: "mammologiya" },
  { name: "Флебологи", category: "uzkie", icon: Activity, surgery: "flebologiya" },
  { name: "Пульмонологи", category: "uzkie", icon: Stethoscope },
  { name: "Дерматологи", category: "uzkie", icon: ShieldCheck },
  { name: "Гематологи", category: "uzkie", icon: Microscope },
  { name: "Другие профильные специалисты", category: "uzkie", icon: Users },
];

const BENEFITS = [
  { icon: Users, title: "Более 100 врачей", text: "Опытные специалисты для взрослых и детей." },
  { icon: Microscope, title: "Полная диагностика", text: "Лаборатория, КТ и рентген." },
  { icon: Clock, title: "Онлайн-запись 24/7", text: "Выберите врача и удобное время онлайн." },
  { icon: ClipboardCheck, title: "Процедурный кабинет", text: "Манипуляции и лечение в одной клинике." },
  { icon: Activity, title: "Травматолог 24/7", text: "Помощь при травмах круглосуточно." },
  { icon: ShieldCheck, title: "Круглосуточный рентген", text: "Исследования доступны без выходных." },
  { icon: Stethoscope, title: "Клинический подход", text: "Понятный план обследования и лечения." },
  { icon: HeartPulse, title: "Современное оборудование", text: "Точная диагностика и бережные методы." },
  { icon: MapPin, title: "Удобное расположение", text: "Филиалы в доступных районах Бишкека." },
];

const CONSULTATION_REASONS = [
  "Повышенная температура и слабость",
  "Боль или длительный дискомфорт",
  "Изменение самочувствия без понятной причины",
  "Обострение хронического заболевания",
  "Необходимость профилактического осмотра",
  "Расшифровка анализов и обследований",
  "Наблюдение ребёнка у специалиста",
  "Подбор индивидуального плана лечения",
];

const DIAGNOSTICS: { title: string; text: string; href: string; external?: boolean }[] = [
  { title: "Лабораторные исследования", text: "Анализы ведём в собственной лаборатории «Экспресс Плюс».", href: "https://expresslab.kg/", external: true },
  { title: "УЗИ, КТ и рентген", text: "Современные исследования в одном медицинском центре.", href: "/diagnostika" },
  { title: "Эндоскопические исследования", text: "ЭГДС и колоноскопия, в том числе под наркозом.", href: "/diagnostika" },
  { title: "Функциональная диагностика", text: "Оценка работы сердца, лёгких и других систем.", href: "/diagnostika" },
];

const FAQS = [
  { question: "Нужно ли направление для записи к врачу?", answer: "Нет, вы можете записаться к нужному специалисту напрямую по телефону или онлайн." },
  { question: "Можно ли пройти обследования в день приёма?", answer: "Большинство анализов и диагностических исследований доступны в клинике. Точный план уточнит врач." },
  { question: "Принимают ли врачи детей?", answer: "Да, в поликлинике ведут приём детские специалисты. При записи укажите возраст ребёнка." },
  { question: "Как подготовиться к первичному приёму?", answer: "Возьмите результаты предыдущих обследований и список принимаемых препаратов, если они есть." },
];

export const Route = createFileRoute("/poliklinika")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/poliklinika") || "/poliklinika" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQS)) }],
  }),
  component: PolyclinicPage,
});

function PolyclinicHeading({ title, description, href }: { title: string; description?: string; href?: string }) {
  return (
    <div>
      <h2 className="text-about-ink text-2xl leading-tight font-extrabold sm:text-3xl">
        {href ? (
          <Link to={href} className="hover:text-about-teal inline-flex items-center gap-2 transition-colors">
            {title}
            <ArrowRight className="size-5 shrink-0" />
          </Link>
        ) : (
          title
        )}
      </h2>
      {description && <p className="text-about-copy mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">{description}</p>}
    </div>
  );
}

function PolyclinicFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <dl className="mt-5 grid items-start gap-3 lg:grid-cols-2">
      {FAQS.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="border-about-line bg-about-canvas rounded-2xl border">
            <dt>
              <Button variant="ghost" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} className="text-about-ink hover:text-about-ink h-auto w-full justify-between gap-4 rounded-2xl p-4 text-left shadow-none hover:bg-transparent">
                <span className="whitespace-normal text-sm font-semibold sm:text-base">{item.question}</span>
                <Plus className={`text-about-teal size-5 shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
              </Button>
            </dt>
            {isOpen && <dd className="text-about-copy border-about-line border-t p-4 text-[13px] leading-relaxed sm:text-sm">{item.answer}</dd>}
          </div>
        );
      })}
    </dl>
  );
}

function PolyclinicPage() {
  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Поликлиника" />
      <Breadcrumbs items={[{ label: "Поликлиника" }]} />
      <main>
        <section className="bg-about-mint">
          <div className="mx-auto grid max-w-7xl overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:h-[380px] lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
            <Reveal className="flex flex-col justify-center lg:pr-10">
              <p className="text-about-teal text-sm font-semibold">Многопрофильная помощь</p>
              <h1 className="text-about-ink mt-2 max-w-2xl text-3xl leading-[1.08] font-extrabold sm:text-4xl lg:text-5xl">Поликлиника в Бишкеке</h1>
              <p className="text-about-copy mt-3 max-w-2xl text-[13px] leading-relaxed sm:text-base">Современный многопрофильный медицинский центр, где вы сможете получить консультации врача, пройти диагностику, сдать анализы и начать лечение в одном месте.</p>
              <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                <Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark px-3 text-xs shadow-none sm:px-4 sm:text-sm"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Записаться на приём</a></Button>
                <ContactButtons />
              </div>
            </Reveal>
            <div className="relative mt-6 h-[220px] overflow-hidden rounded-2xl sm:h-[280px] lg:mt-0 lg:h-full">
              <BannerSlider slides={PAGE_BANNERS.poliklinika} />
              <div className="from-about-mint/30 absolute inset-0 bg-gradient-to-r to-transparent" />
              <div className="bg-about-canvas/95 absolute right-0 bottom-0 hidden max-w-[290px] rounded-tl-2xl p-4 backdrop-blur-sm sm:block">
                {["Более 100 врачей", "Полный диагностический спектр", "Онлайн-запись 24/7"].map((item) => <p key={item} className="text-about-ink flex items-center gap-2 py-1 text-xs font-semibold"><Check className="text-about-teal size-4" />{item}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="specialists" className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <PolyclinicHeading title="Направления поликлиники" />
              <Link to="/vrachi" className="text-about-teal inline-flex items-center gap-2 text-sm font-semibold">Все врачи <ArrowRight className="size-4" /></Link>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr]">
              <img src="/assets/checkup-doctors.jpg" alt="Врачи поликлиники «Авиценна»" className="hidden h-full max-h-[560px] w-full rounded-2xl object-cover lg:block" />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3">
                {POLYCLINIC_SPECIALISTS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                  <Reveal key={item.name} delay={index * 20}>
                    {item.surgery ? (
                    <Link to="/hirurgiya/$slug" params={{ slug: item.surgery }} className="border-about-line hover:border-about-teal group flex h-full items-center gap-2 rounded-2xl border bg-about-canvas p-2.5 transition-colors sm:gap-3 sm:p-4">
                      <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-10">
                        <Icon className="size-4 sm:size-5" aria-hidden="true" />
                      </span>
                      <span className="text-about-ink min-w-0 flex-1 text-[12px] leading-tight font-semibold break-words hyphens-auto sm:text-sm">{item.name}</span>
                      <Plus className="text-about-teal hidden size-5 shrink-0 transition-transform group-hover:rotate-90 sm:block" aria-hidden="true" />
                    </Link>
                    ) : (
                    <Link to="/vrachi" search={{ category: item.category }} hash="vrachi" className="border-about-line hover:border-about-teal group flex h-full items-center gap-2 rounded-2xl border bg-about-canvas p-2.5 transition-colors sm:gap-3 sm:p-4">
                      <span className="bg-about-icon text-about-teal grid size-8 shrink-0 place-items-center rounded-full sm:size-10">
                        <Icon className="size-4 sm:size-5" aria-hidden="true" />
                      </span>
                      <span className="text-about-ink min-w-0 flex-1 text-[12px] leading-tight font-semibold break-words hyphens-auto sm:text-sm">{item.name}</span>
                      <Plus className="text-about-teal hidden size-5 shrink-0 transition-transform group-hover:rotate-90 sm:block" aria-hidden="true" />
                    </Link>
                    )}
                  </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PolyclinicHeading title="Почему пациенты выбирают «Авиценну»" />
            <AdvantagesGrid items={BENEFITS} compact />
          </div>
        </section>

        <section className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PolyclinicHeading title="Когда стоит обратиться к врачу" description="Не откладывайте приём, если симптомы повторяются, усиливаются или мешают привычной жизни." />
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {CONSULTATION_REASONS.map((item) => <div key={item} className="border-about-line flex items-center gap-3 rounded-2xl border p-4"><span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full"><Check className="size-4" /></span><span className="text-about-ink min-w-0 flex-1 text-[12px] font-semibold leading-snug break-words hyphens-auto sm:text-sm">{item}</span></div>)}
            </div>
          </div>
        </section>

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PolyclinicHeading title="Современная диагностика" description="Все необходимые исследования можно пройти в клинике." href="/diagnostika" />
            <div className="mt-5 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <img src="/assets/uslugi-hero.jpg" alt="Диагностическое оборудование клиники" className="hidden lg:block h-60 w-full rounded-2xl object-cover" />
              <div className="grid gap-3 sm:grid-cols-2">
                {DIAGNOSTICS.map((item) => {
                  const cls = "border-about-line bg-about-canvas hover:border-brand-green flex gap-3 rounded-2xl border p-4 transition-colors";
                  const inner = <><span className="bg-about-icon text-about-teal grid size-10 shrink-0 place-items-center rounded-full"><Microscope className="size-5" /></span><div><h3 className="text-about-ink text-sm font-bold">{item.title}</h3><p className="text-about-copy mt-1 text-[13px] leading-relaxed">{item.text}</p></div></>;
                  return item.external ? (
                    <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  ) : (
                    <Link key={item.title} to={item.href} className={cls}>{inner}</Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-about-mint py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6"><PolyclinicHeading title="Часто задаваемые вопросы" /><PolyclinicFaq /></div>
        </section>

        <section className="bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div><h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl">Забота о вашем здоровье</h2><p className="text-about-copy mt-3 max-w-xl text-sm leading-relaxed sm:text-base">Запишитесь на консультацию — администратор поможет выбрать специалиста и удобное время.</p><div className="mt-6 flex flex-wrap gap-2 sm:gap-3"><Button asChild className="bg-brand-green text-brand-white hover:bg-brand-green-dark shadow-none"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Записаться на консультацию</a></Button><ContactButtons /></div></div>
            <img src={doctorPatientHeroAsset} alt="Врач консультирует пациента" className="hidden lg:block h-60 w-full rounded-2xl object-cover" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}