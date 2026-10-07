import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/Reveal";

export type AdvantageItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
};

export function AdvantagesGrid({
  items,
  featured,
  compact,
}: {
  items: AdvantageItem[];
  featured?: { value: string; label: string };
  compact?: boolean;
}) {
  return (
    <div
      className={`mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3${featured ? " lg:grid-rows-2" : ""}${compact ? " grid-cols-2 gap-2 sm:gap-3" : ""}`}
    >
      {items.map(({ icon: Icon, title, text, href, external }, index) => {
        const isFeatured = Boolean(featured) && index === 0;
        const card = isFeatured ? (
          <article className="border-about-line bg-card group relative flex h-full items-start gap-3 rounded-2xl border p-5 transition hover:border-brand-green hover:shadow-sm md:flex-col md:bg-about-mint/60">
            <span className="bg-about-icon text-about-teal grid size-12 shrink-0 place-items-center rounded-full">
              <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 pr-6 md:mt-5 md:pr-0">
              <h3 className="text-about-ink text-base leading-snug font-bold md:hidden">{title}</h3>
              <div className="hidden md:block">
                <span className="font-display text-brand-green text-6xl font-extrabold lg:text-7xl">
                  {featured!.value}
                </span>
                <p className="text-about-ink mt-1 text-lg font-bold">{featured!.label}</p>
              </div>
              <p className="text-about-copy mt-1 text-sm leading-snug md:mt-3">{text}</p>
            </div>
            {href && (
              <ArrowUpRight
                className="text-about-teal absolute top-4 right-4 size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            )}
          </article>
        ) : (
          <article
            className={`border-about-line bg-card group relative flex h-full items-start gap-3 rounded-2xl border p-5 transition hover:border-brand-green hover:shadow-sm${compact ? " flex-col gap-2 p-3 sm:flex-row sm:items-start sm:gap-3 sm:p-5" : ""}`}
          >
            <span
              className={`bg-about-icon text-about-teal grid size-12 shrink-0 place-items-center rounded-full${compact ? " size-9 sm:size-12" : ""}`}
            >
              <Icon className={compact ? "size-5 sm:size-6" : "size-6"} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 pr-6">
              <h3 className={`text-about-ink text-base leading-snug font-bold${compact ? " text-sm sm:text-base" : ""}`}>{title}</h3>
              <p className={`text-about-copy mt-1 text-sm leading-snug${compact ? " hidden sm:block" : ""}`}>{text}</p>
            </div>
            {href && (
              <ArrowUpRight
                className="text-about-teal absolute top-4 right-4 size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            )}
          </article>
        );
        return (
          <Reveal
            key={title}
            delay={index * 35}
            className={isFeatured ? "h-full lg:row-span-2" : "h-full"}
          >
            {href ? (
              external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                <Link to={href} className="block h-full">
                  {card}
                </Link>
              )
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
