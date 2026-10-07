import { ArrowRight, ClipboardCheck, Award, Waves, MapPin, Star, Stethoscope, TrendingUp, Brain, Droplets, Ribbon, Flower2, HeartPulse, Ear, Microscope, Users, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import aboutHeroAsset from "@/assets/chat/about-hero.webp";
import aboutMissionAsset from "@/assets/chat/about-mission.webp";
import asianFamilyHeroAsset from "@/assets/chat/asian-family-hero.webp";
import clinicVideoAsset from "@/assets/chat/clinic-video.mp4";
import doctorPatientHeroAsset from "@/assets/chat/doctor-patient-hero.webp";
import image2Asset from "@/assets/chat/image-2.webp";

import { BranchesWithMap } from "@/components/BranchesWithMap";
import { ScrollArrowPair } from "@/components/ScrollArrows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CLINIC } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import { ContactButtons } from "@/components/ContactButtons";
import { Link } from "@tanstack/react-router";
import { homeItemsQueryOptions, type HomeItem } from "@/lib/home-items";

export const HOME_HERO_IMAGE = asianFamilyHeroAsset;

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-brand-red text-[11px] font-bold tracking-[0.18em] uppercase">
      {children}
    </p>
  );
}

function SpecialtyMarquee({ items }: { items: Array<{ name: string; icon: LucideIcon; href: string }> }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);

  const scrollBy = (dir: -1 | 1) => {
    setManual(true);
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.7), behavior: "smooth" });
  };

  // Четыре одинаковых набора перекрывают даже широкий экран; при ручной
  // прокрутке переносим позицию ровно на длину одного набора.
  const handleLoop = () => {
    const el = scrollerRef.current;
    if (!el || !manual) return;
    const setWidth = el.scrollWidth / 4;
    if (setWidth <= 0) return;
    if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
    else if (el.scrollLeft <= 0) el.scrollLeft += setWidth;
  };

  return (
    <section className="py-5 sm:py-6">
      <div className="relative">
        <ScrollArrowPair onScroll={scrollBy} label="Прокрутить направления" />

        <div
          ref={scrollerRef}
          onScroll={handleLoop}
          className="group marquee-mask no-scrollbar relative overflow-x-auto px-12 scroll-smooth"
        >
          <div className={`${manual ? "" : "marquee-track-quarter"} flex w-max`}>
            {[0, 1, 2, 3].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy > 0}>
                {items.map((item) => (
                  <SmartLink
                    key={`${copy}-${item.name}`}
                    href={item.href}
                    className="bg-background border-border hover:border-brand-green group flex h-[112px] w-[190px] shrink-0 flex-col justify-between rounded-2xl border p-4 transition-colors sm:h-[150px] sm:w-[230px] sm:p-5"
                  >
                    <span className="bg-brand-green/10 text-brand-green grid size-11 shrink-0 place-items-center rounded-full transition-transform group-hover:scale-105 sm:size-14">
                      <item.icon className="size-6 sm:size-7" aria-hidden="true" />
                    </span>
                    <span className="text-foreground text-base font-extrabold leading-snug sm:text-lg">
                      {item.name}
                    </span>
                  </SmartLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function ReviewCard({
  review,
  className,
}: {
  review: { text: string; src: string; rating?: number | null };
  className?: string;
}) {
  const rating = Math.max(0, Math.min(5, review.rating ?? 5));
  return (
    <figure
      className={`bg-background border-border flex h-[200px] w-[320px] flex-col rounded-2xl border p-5 lg:w-[360px] ${className ?? ""}`}
    >
      <div className="text-brand-green flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`size-4 ${i < rating ? "fill-current" : "opacity-30"}`} />
        ))}
      </div>
      <blockquote className="text-foreground mt-3 line-clamp-4 text-[15px] leading-relaxed">
        {review.text}
      </blockquote>
      <figcaption className="text-muted-foreground mt-auto pt-3 text-[13px]">
        Источник: {review.src}
      </figcaption>
    </figure>
  );
}

function Section({
  id,
  eyebrow,
  title,
  tone = "plain",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  tone?: "plain" | "soft" | "green";
  children: React.ReactNode;
}) {
  const bg =
    tone === "soft" ? "bg-surface-soft" : tone === "green" ? "bg-surface-green" : "bg-background";
  return (
    <section id={id} className={`${bg} border-border border-t`}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="text-foreground mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}
          </h2>
        )}
        <div className={eyebrow || title ? "mt-5" : ""}>{children}</div>
      </div>
    </section>
  );
}

const ROUTE_CARDS = [
  { title: "Поликлиника", href: "/poliklinika", tone: "pastel-mint" },
  { title: "Травмпункт 24/7", href: "/travmpunkt", tone: "pastel-coral" },
  { title: "Диагностика", href: "/diagnostika", tone: "pastel-sky" },
  { title: "Стационар", href: "/uslugi/uslugi-stacionara", tone: "pastel-lavender" },
  { title: "Урология", href: "/hirurgiya/urologiya", tone: "pastel-sand" },
  { title: "Услуги на дому", href: "/uslugi/uslugi-na-domu", tone: "pastel-rose" },
  { title: "Хирургия", href: "/hirurgiya", tone: "pastel-lime" },
  { title: "Лаборатория", href: "/uslugi/analizy", tone: "pastel-azure" },
  { title: "Чекапы", href: "/checkups", tone: "pastel-peach" },
];


const SPECIALTY_PILLS: Array<{ name: string; icon: LucideIcon; href: string }> = [
  { name: "Неврология", icon: Brain, href: "/vrachi" },
  { name: "Урология", icon: Droplets, href: "/hirurgiya/urologiya" },
  { name: "Маммология", icon: Ribbon, href: "/hirurgiya/mammologiya" },
  { name: "Гинекология", icon: Flower2, href: "/hirurgiya/ginekologiya" },
  { name: "Кардиология", icon: HeartPulse, href: "/vrachi" },
  { name: "Лор", icon: Ear, href: "/vrachi" },
  { name: "Эндокринология", icon: Microscope, href: "/vrachi" },
];

const ICONS: Record<string, LucideIcon> = {
  Brain, Droplets, Ribbon, Flower2, HeartPulse, Ear, Microscope, MapPin,
  Stethoscope, TrendingUp, ClipboardCheck, Award, Waves, Users,
};

const iconOf = (name: string | null | undefined): LucideIcon =>
  (name && ICONS[name]) || Stethoscope;

const tagToneOf = (tag: string | null | undefined) =>
  tag === "Акция" ? "bg-brand-red" : tag === "Спецпредложение" ? "bg-brand-green" : "bg-foreground/60";

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href as "/"} className={className}>
      {children}
    </Link>
  );
}

const REVIEWS = [
  { text: "Быстро приняли в травмпункте ночью, всё объяснили и сделали снимок за 15 минут.", src: "2GIS" },
  { text: "Чекап прошли всей семьёй за два дня — результаты пришли в приложение.", src: "Google" },
  { text: "Хирург подробно разобрал анализы и предложил план без лишних процедур.", src: "2GIS" },
];

const CLINIC_STATS = [
  { value: "6", label: "филиалов в Бишкеке", icon: MapPin },
  { value: "60+", label: "врачебных специальностей", icon: Stethoscope },
  { value: "410+", label: "медицинских услуг", icon: TrendingUp },
  { value: "1000", label: "чекапов в год", icon: ClipboardCheck },
  { value: "26", label: "лет опыта", icon: Award },
  { value: "146", label: "видов УЗИ", icon: Waves },
];

const OFFER_CARDS = [
  {
    tag: "Акция",
    tagTone: "bg-brand-red",
    title: "Сомнография",
    description: "Консультация + диагностика на сомнографе со скидкой",
    price: "3 700 с",
    oldPrice: "4 900 с",
    href: "/diagnostika",
    image: aboutHeroAsset,
    tone: "pastel-peach",
  },
  {
    tag: "Спецпредложение",
    tagTone: "bg-brand-green",
    title: "Счастливые часы",
    description: "Пройдите чекап утром и получите дополнительную скидку 10%",
    href: "/checkups",
    image: doctorPatientHeroAsset,
    tone: "pastel-mint",
  },
  {
    tag: "Новость",
    tagTone: "bg-foreground/60",
    title: "Услуги на дому",
    description: "Врач, анализы и процедуры без выезда в клинику",
    href: "/uslugi/analizy",
    image: image2Asset,
    tone: "pastel-sky",
  },
  {
    tag: "Спецпредложение",
    tagTone: "bg-brand-green",
    title: "Бесплатная консультация хирурга",
    description: "Разбор анализов и плана операции без оплаты приёма",
    href: "/hirurgiya",
    image: aboutMissionAsset,
    tone: "pastel-lavender",
  },
];

type OfferItem = {
  tag: string | null;
  title: string;
  description: string | null;
  price?: string | null;
  oldPrice?: string | null;
  href: string;
  image: string;
  tone: string | null;
};

function OffersMarquee({ items }: { items: OfferItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);

  const scrollBy = (dir: -1 | 1) => {
    setManual(true);
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(300, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ScrollArrowPair onScroll={scrollBy} label="Прокрутить предложения" />

      <div
        ref={scrollerRef}
        className="group marquee-mask no-scrollbar relative overflow-x-auto scroll-smooth px-12 py-1"
      >
        <div className={`${manual ? "" : "marquee-track"} flex w-max gap-4 pr-4`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
              {items.map((item) => (
                <OfferCard key={`${copy}-${item.title}`} item={item} className="w-[300px]" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferCard({
  item,
  className,
}: {
  item: OfferItem;
  className?: string;
}) {
  return (
    <SmartLink
      href={item.href}
      className={`${item.tone} group border-border/40 flex shrink-0 flex-col overflow-hidden rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${className ?? ""}`}
    >
      <div className="relative h-[150px] w-full shrink-0 overflow-hidden sm:h-[190px]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {item.tag ? (
          <span
            className={`${tagToneOf(item.tag)} text-brand-white absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase`}
          >
            {item.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-foreground text-lg font-extrabold">{item.title}</h3>
        <p className="text-muted-foreground mt-2 text-[14px] leading-snug">{item.description}</p>
        {item.price ? (
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-brand-green text-2xl font-extrabold">{item.price}</span>
            <span className="text-muted-foreground text-sm line-through">{item.oldPrice}</span>
          </p>
        ) : null}
        <span className="text-brand-green mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-extrabold transition-transform group-hover:translate-x-1">
          Подробнее
          <ArrowRight className="size-4" />
        </span>
      </div>
    </SmartLink>
  );
}


export function HomeV3() {
  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <main>
        {/* Оффер */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
            {/* Большой баннер — слайдер с новостями и акциями */}
            <HeroSlider />

            {/* Быстрый маршрут — сетка 3×3 справа */}
            <div className="grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3">
              {ROUTE_CARDS.map((card) => (
                <Link
                  key={card.title}
                  to={card.href as "/"}
                  className={`${card.tone} card-lift border-border/40 hover:border-brand-green group flex min-h-[76px] flex-col justify-between rounded-2xl border p-3 transition-all sm:min-h-[104px] sm:p-4`}
                >
                  <p className="text-foreground text-[13px] leading-snug font-extrabold sm:text-[14px]">
                    {card.title}
                  </p>
                  <span className="bg-brand-green text-brand-white ml-auto flex size-6 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 sm:size-7">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Зелёные блоки специальностей — бегущая строка */}
        <SpecialtyMarquee />



        {/* О клинике */}
        <Section id="o-klinike" eyebrow="" title="">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <Reveal className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-lg">
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/BrQHjVEWcUE?rel=0"
                    title="Видео о клинике «Авиценна»"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
            <div className="order-1 flex flex-col gap-4 lg:order-2">
              <Reveal delay={80}>
                <p className="text-muted-foreground text-justify text-[15px] leading-relaxed sm:text-[16px]">
                  Сеть клиник «Авиценна» ведет свою историю с 2000 года, когда врач-дерматовенеролог,
                  кандидат медицинских наук Жыпар Абдыказиевна Керималиева открыла первый медицинский
                  центр в небольшом кабинете на улице Суеркулова.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-muted-foreground text-justify text-[15px] leading-relaxed sm:text-[16px]">
                  Сегодня «Авиценна» — это 6 филиалов в Бишкеке, более 60 врачебных специальностей и
                  более 410 медицинских услуг для взрослых и детей. Мы объединяем специалистов,
                  современную диагностику и собственную лабораторию, чтобы пациент мог получить
                  необходимую качественную медицинскую помощь в одном клинике.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <Link
                  to="/about"
                  className="text-brand-green hover:text-brand-green-dark group inline-flex w-fit items-center gap-2 text-[15px] font-extrabold transition-colors"
                >
                  Подробнее о Авиценне{"\n"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
          <Reveal delay={160}>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {CLINIC_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface-soft border-border flex flex-col items-center gap-2 rounded-2xl border p-3 text-center sm:p-5"
                >
                  <stat.icon className="text-brand-green size-5 sm:size-7" />
                  <div>
                    <p className="text-foreground text-xl font-extrabold sm:text-3xl">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-muted-foreground mt-1 text-[11px] leading-snug sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Новости и специальные предложения */}
        <Section tone="soft" eyebrow="" title="Новости и специальные предложения">
          <div className="hidden gap-4 lg:grid lg:grid-cols-3">
            {OFFER_CARDS.slice(0, 3).map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="h-full">
                <OfferCard item={item} className="h-full w-full" />
              </Reveal>
            ))}
          </div>
          <div className="lg:hidden">
            <OffersMarquee />
          </div>
        </Section>


        {/* Баннер перед картой */}
        <section className="relative overflow-hidden">
          <img
            src={aboutHeroAsset}
            alt="Врач проводит онлайн-консультацию"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="from-background/95 via-background/80 to-background/40 absolute inset-0 bg-gradient-to-r" />
          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="max-w-2xl">
              <p className="text-brand-red text-[13px] font-bold uppercase tracking-wider">
                Онлайн-консультации
              </p>
              <h2 className="text-foreground mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Хотите проконсультироваться не приезжая в клинику?
              </h2>
              <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
                Получите консультацию онлайн от специалистов «Авиценны». Удобно, без очередей и
                лишнего времени в дороге.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-brand-white hover:bg-brand-green-dark inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-extrabold transition-colors shadow-lg"
              >
                Записаться
              </a>
              <ContactButtons />
              </div>
            </div>
          </div>
        </section>

        {/* Филиалы на карте */}
        <BranchesWithMap />

        {/* Отзывы */}
        <Section tone="soft" eyebrow="Доверие" title="Отзывы пациентов">
          {/* Mobile: scrolling marquee */}
          <div className="group marquee-mask relative overflow-hidden md:hidden">
            <div className="marquee-track-quarter flex w-max">
              {[0, 1, 2, 3].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy > 0}>
                  {REVIEWS.map((review) => (
                    <ReviewCard
                      review={review}
                      key={`mobile-${copy}-${review.text}`}
                      className="w-[280px]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: scrolling marquee */}
          <div className="group marquee-mask relative hidden overflow-hidden md:block">
            <div className="marquee-track-quarter flex w-max">
              {[0, 1, 2, 3].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy > 0}>
                  {REVIEWS.map((review) => (
                    <ReviewCard review={review} key={`${copy}-${review.text}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Часто задаваемые вопросы */}
        <FaqAccordion />


      </main>
      <SiteFooter />
    </div>
  );
}
