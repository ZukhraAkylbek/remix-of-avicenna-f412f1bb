import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Menu, Phone, User, X } from "lucide-react";
import { useState } from "react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

import logo from "@/assets/chat/logo-avicenna-kg.webp";
import { CLINIC } from "@/lib/clinic";
import { useLanguage } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";

import { SiteSearch } from "@/components/SiteSearch";

export const HEADER_NAV_SLOTS = [
  { label: "Главная", href: "/" },
  { label: "Поликлиника", href: "/poliklinika" },
  { label: "Диагностика", href: "/diagnostika" },
  { label: "Врачи", href: "/vrachi" },
  { label: "Травмпункт", href: "/travmpunkt" },
  { label: "Хирургия", href: "/hirurgiya" },
  { label: "Стационар", href: "/napravleniya/statsionar" },
  { label: "Чекап", href: "/checkups" },
  { label: "О нас", href: "/about" },
];

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/i.test(href);

export function SiteHeader({ breadcrumb }: { breadcrumb?: string }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useSiteContent();
  const navItems = HEADER_NAV_SLOTS.map((slot, i) => ({
    label: t(`header.nav.${i + 1}.label`, slot.label),
    href: t(`header.nav.${i + 1}.href`, slot.href),
  })).filter((item) => item.label.trim() && item.href.trim());

  const isActive = (href: string) =>
    !isExternal(href) && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const phone = CLINIC.phones[0] ?? "";
  const whatsappHref = phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "#";

  return (
    <div className="sticky top-0 z-50">
      {/* Верхняя панель */}
      <header className="bg-background/70 border-border border-b backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-2 py-2.5 sm:px-4 sm:py-3 lg:gap-6 lg:px-6 lg:py-3">
          {/* Логотип */}
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Link to="/" className="flex shrink-0 items-center" aria-label="Авиценна — на главную">
              <img
                src={logo}
                alt="Клинико-диагностический центр «Авиценна»"
                width={440}
                height={95}
                className="h-9 w-auto sm:h-11 lg:h-16 [mix-blend-mode:multiply]"
              />
            </Link>

            {breadcrumb && (
              <span className="text-muted-foreground hidden truncate text-sm sm:block lg:hidden">
                / {breadcrumb}
              </span>
            )}
          </div>

          {/* Поиск — десктоп / планшет */}
          <SiteSearch className="hidden min-w-0 w-full md:block lg:max-w-xl" />

          {/* Действия справа */}
          <div className="flex shrink-0 items-center justify-self-end gap-1 sm:gap-2 lg:gap-3 2xl:gap-2">
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("Написать на WhatsApp", "Написать на WhatsApp")}
              title={t("Написать на WhatsApp", "Написать на WhatsApp")}
              className="inline-flex size-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-brand-green bg-brand-white/80 text-brand-green backdrop-blur-sm transition-colors hover:bg-brand-green hover:text-brand-white sm:size-11 2xl:size-auto 2xl:px-3 2xl:py-2 text-xs 2xl:text-xs"
            >
              <WhatsAppIcon className="size-[18px] shrink-0 2xl:size-4" />
              <span className="hidden 2xl:inline">{t("WhatsApp", "WhatsApp")}</span>
            </a>

            {/* Телефон */}
            <a
              href={`tel:${phone}`}
              aria-label={t("Позвонить", "Позвонить")}
              className="inline-flex size-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-terracotta text-brand-white text-xs font-bold transition-all hover:brightness-105 sm:size-11 2xl:size-auto 2xl:px-3 2xl:py-2"
            >
              <Phone className="size-[18px] shrink-0 2xl:size-4" strokeWidth={2} />
              <span className="hidden 2xl:inline">{t("Позвонить", "Позвонить")}</span>
            </a>

            {/* Запись */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("Записаться онлайн", "Записаться онлайн")}
              title={t("Записаться онлайн", "Записаться онлайн")}
              className="inline-flex size-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl gradient-accent text-accent-foreground text-xs font-bold transition-all hover:brightness-105 sm:size-11 2xl:size-auto 2xl:px-3 2xl:py-2"
            >
              <Calendar className="size-[18px] shrink-0 2xl:size-4" strokeWidth={2} />
              <span className="hidden 2xl:inline">{t("Записаться", "Записаться")}</span>
            </a>

            {/* Переключатель языка — десктоп / планшет (не на мобильном) */}
            <div
              role="group"
              aria-label={t("Выбор языка", "Выбор языка")}
              className="border-border bg-background hidden shrink-0 items-center rounded-xl border p-0.5 lg:flex"
            >
              {(["ru", "ky"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-bold uppercase transition-colors ${
                    lang === code
                      ? "bg-brand-green text-brand-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {code === "ru" ? "Рус" : "Кыр"}
                </button>
              ))}
            </div>

            {/* Бургер — крупный touch target */}
            <button
              type="button"
              aria-label={open ? t("Закрыть меню", "Закрыть меню") : t("Открыть меню", "Открыть меню")}
              onClick={() => setOpen((v) => !v)}
              className="border-border bg-background text-brand-green hover:bg-brand-green hover:text-brand-white grid size-11 shrink-0 place-items-center rounded-xl border shadow-sm transition-colors lg:hidden"
            >
              {open ? <X className="size-6" strokeWidth={2.5} /> : <Menu className="size-6" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Поиск на мобильных */}
        <div className="border-border border-t px-3 py-2 md:hidden">
          <SiteSearch className="w-full" />
        </div>
      </header>

      {/* Зелёная навигационная панель — десктоп */}
      <nav
        aria-label={t("Главное меню", "Главное меню")}
        className="bg-brand-green/85 text-brand-white hidden shadow-sm backdrop-blur-md md:block"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 sm:px-6 xl:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none]">
          {navItems.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              title={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
              {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2.5 text-[15px] font-bold transition-colors xl:px-3 xl:text-[17px] ${
                isActive(item.href)
                  ? "bg-brand-white/20 underline decoration-2 underline-offset-8"
                  : "hover:bg-brand-white/15 hover:underline hover:decoration-2 hover:underline-offset-8"
              }`}
            >
              {item.label}
              {item.href === "/travmpunkt" && (
                <span className="bg-brand-red text-brand-white ml-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-extrabold leading-none">24/7</span>
              )}
            </a>
          ))}

          <a
            href="/auth"
            className="border-brand-white/60 text-brand-white hover:bg-brand-white hover:text-brand-green ml-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-[14px] font-bold transition-colors xl:px-3.5 xl:text-[16px]"
          >

            <User className="size-4" />
            {t("Личный кабинет", "Личный кабинет")}
          </a>
        </div>
      </nav>

      {/* Мобильное меню — выдвижная панель */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Панель */}
          <div className="bg-brand-green text-brand-white fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-sm flex-col shadow-2xl lg:hidden">
            {/* Шапка панели */}
            <div className="border-b border-brand-white/20 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{t("Меню", "Меню")}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("Закрыть меню", "Закрыть меню")}
                  className="grid size-11 place-items-center rounded-xl bg-brand-white/10 text-brand-white transition-colors hover:bg-brand-white/20"
                >
                  <X className="size-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Язык */}
            <div className="border-b border-brand-white/20 px-4 py-3">
              <div
                role="group"
                aria-label={t("Выбор языка", "Выбор языка")}
                className="inline-flex items-center rounded-xl border border-brand-white/40 bg-brand-white/10 p-0.5"
              >
                {(["ru", "ky"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`rounded-lg px-4 py-2 text-sm font-bold uppercase transition-colors ${
                      lang === code
                        ? "bg-brand-white text-brand-green"
                        : "text-brand-white hover:bg-brand-white/10"
                    }`}
                  >
                    {code === "ru" ? "Рус" : "Кыр"}
                  </button>
                ))}
              </div>
            </div>

            {/* Навигация */}
            <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label={t("Главное меню", "Главное меню")}>
              {navItems.map((item) => (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`-mx-2 block rounded-xl border-b border-brand-white/20 px-2 py-4 text-lg font-semibold transition-all duration-200 hover:bg-brand-white/15 hover:pl-4 active:scale-[0.98] active:bg-brand-white/25 ${
                    isActive(item.href) ? "bg-brand-white/10" : ""
                  }`}

                >
                  {item.label}
                  {item.href === "/travmpunkt" && (
                    <span className="bg-brand-red text-brand-white ml-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-extrabold leading-none">24/7</span>
                  )}
                </a>
              ))}

              <a
                href="/auth"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-xl border border-brand-white/40 px-4 py-3 text-base font-bold transition-all duration-200 hover:border-brand-white hover:bg-brand-white/15 active:scale-[0.97]"
              >
                <User className="size-5" />
                {t("Личный кабинет", "Личный кабинет")}
              </a>
            </nav>

            {/* Кнопки связи */}
            <div className="border-t border-brand-white/20 p-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-white/40 bg-brand-white/10 px-3 py-3 text-sm font-bold transition-all duration-200 hover:bg-brand-white/25 active:scale-[0.97]"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-white px-3 py-3 text-sm font-bold text-brand-green transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
                >
                  <Phone className="size-4 shrink-0" />
                  {t("Позвонить", "Позвонить")}
                </a>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-accent text-accent-foreground mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
              >
                <Calendar className="size-4 shrink-0" />
                {t("Записаться онлайн", "Записаться онлайн")}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
