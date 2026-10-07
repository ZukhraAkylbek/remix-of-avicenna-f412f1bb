import { useEffect, useRef, useState } from "react";
import type { BannerSlide } from "@/lib/page-banners";

export function BannerSlider({ slides, className = "" }: { slides: BannerSlide[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => window.clearInterval(t);
  }, [paused, reduced, count]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {slides.map((slide, i) => {
        const content = (
          <>
            <img
              src={slide.image}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="size-full object-cover"
            />
            {slide.caption && (
              <span className="bg-about-canvas/90 text-about-ink absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold">
                {slide.caption}
              </span>
            )}
          </>
        );
        const cls = `absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`;
        return slide.href ? (
          <a key={i} href={slide.href} className={cls} aria-hidden={i !== index}>{content}</a>
        ) : (
          <div key={i} className={cls} aria-hidden={i !== index}>{content}</div>
        );
      })}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Слайд ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "bg-brand-white w-5" : "bg-brand-white/50 w-1.5"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
