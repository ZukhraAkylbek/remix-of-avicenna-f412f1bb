import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { activeHeroSlidesQueryOptions } from "@/lib/hero-slides.queries";

import aboutHeroAsset from "@/assets/chat/about-hero.webp";
import asianFamilyHeroAsset from "@/assets/chat/asian-family-hero.webp";
import doctorPatientHeroAsset from "@/assets/chat/doctor-patient-hero.webp";

type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Новости и акции в баннерной зоне главной: добавьте объект — слайд появится сам. */
const HERO_SLIDES: HeroSlide[] = [
  {
    image: asianFamilyHeroAsset,
    alt: "Счастливая семья на фоне голубого неба",
    eyebrow: "Здоровье без лишней сложности",
    title: "Проверьте здоровье сегодня — предотвратите",
    highlight: "проблемы завтра",
    text: "Чекапы для взрослых и детей, точная диагностика и консультации врачей в одном месте.",
    ctaLabel: "Пройти чекап",
    ctaHref: "/checkups",
  },
  {
    image: doctorPatientHeroAsset,
    alt: "Врач консультирует пациента",
    eyebrow: "Приём специалистов",
    title: "Более 100 врачей ведут приём",
    highlight: "каждый день",
    text: "Терапевты, педиатры, узкие специалисты — запишитесь онлайн на удобное время.",
    ctaLabel: "Выбрать врача",
    ctaHref: "/vrachi",
  },
  {
    image: aboutHeroAsset,
    alt: "Клиника «Авиценна»",
    eyebrow: "Травмпункт 24/7",
    title: "Помощь при травмах —",
    highlight: "круглосуточно",
    text: "Переломы, вывихи, раны и ожоги: принимаем без записи на Жукеева-Пудовкина, 124.",
    ctaLabel: "Подробнее",
    ctaHref: "/travmpunkt",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const { data } = useQuery(activeHeroSlidesQueryOptions());
  const dbSlides: HeroSlide[] = (data ?? [])
    .filter((s) => s.displayUrl)
    .map((s) => ({
      image: s.displayUrl,
      alt: s.title ?? "",
      eyebrow: s.eyebrow ?? "",
      title: s.title ?? "",
      highlight: s.highlight ?? undefined,
      text: s.subtitle ?? "",
      ctaLabel: s.cta_label ?? undefined,
      ctaHref: s.cta_href ?? undefined,
    }));
  const slides = dbSlides.length > 0 ? dbSlides : HERO_SLIDES;
  const count = slides.length;

  const restart = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
  }, [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) restart();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [restart]);

  const goTo = (i: number) => {
    setIndex(((i % count) + count) % count);
    restart();
  };

  return (
    <div
      className="border-border group/hero relative min-h-[460px] overflow-hidden rounded-3xl border sm:min-h-[420px]"
      onMouseEnter={() => timer.current && window.clearInterval(timer.current)}
      onMouseLeave={restart}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full scale-110 object-cover object-[72%_bottom] sm:scale-100 sm:object-[right_center]"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              width={1344}
              height={768}
            />
            <div className="from-brand-white/97 via-brand-white/80 absolute inset-0 bg-gradient-to-b to-transparent sm:bg-gradient-to-r sm:via-brand-white/70" />
            <div className="relative flex h-full max-w-[560px] flex-col justify-start p-6 sm:justify-center sm:p-10">
              <span className="text-brand-green text-xs font-bold tracking-[0.18em] uppercase">
                {slide.eyebrow}
              </span>
              {i === 0 ? (
                <h1 className="text-foreground mt-4 text-3xl leading-[1.22] font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.18]">
                  {slide.title}{" "}
                  {slide.highlight && (
                    <span className="bg-brand-green text-brand-white rounded-md px-2 py-0.5 align-middle text-[0.92em] leading-none">
                      {slide.highlight}
                    </span>
                  )}
                </h1>
              ) : (
                <p className="text-foreground mt-4 text-3xl leading-[1.22] font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.18]">
                  {slide.title}{" "}
                  {slide.highlight && (
                    <span className="bg-brand-green text-brand-white rounded-md px-2 py-0.5 align-middle text-[0.92em] leading-none">
                      {slide.highlight}
                    </span>
                  )}
                </p>
              )}
              <p className="text-muted-foreground mt-4 max-w-md text-[16px] leading-relaxed">
                {slide.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {slide.ctaLabel && slide.ctaHref && (
                <Link
                  to={slide.ctaHref as "/"}
                  className="gradient-accent text-accent-foreground inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[16px] font-extrabold transition-all hover:-translate-y-0.5 hover:brightness-105"
                >
                  {slide.ctaLabel}
                </Link>
                )}
                <Link
                  to="/uslugi"
                  className="border-border bg-background/80 text-foreground hover:border-brand-green inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-[16px] font-extrabold transition-colors"
                >
                  Найти услугу
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Стрелки */}
      <button
        type="button"
        aria-label="Предыдущий баннер"
        onClick={() => goTo(index - 1)}
        className="border-border bg-background/80 text-foreground hover:border-brand-green hover:text-brand-green absolute top-1/2 left-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border opacity-0 backdrop-blur transition-opacity group-hover/hero:opacity-100 sm:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Следующий баннер"
        onClick={() => goTo(index + 1)}
        className="border-border bg-background/80 text-foreground hover:border-brand-green hover:text-brand-green absolute top-1/2 right-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border opacity-0 backdrop-blur transition-opacity group-hover/hero:opacity-100 sm:flex"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Точки */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Баннер ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "bg-brand-green w-6" : "bg-foreground/25 hover:bg-foreground/40 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
