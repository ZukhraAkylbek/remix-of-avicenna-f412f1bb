import logo from "@/assets/chat/logo-avicenna-kg.webp";
import expresslabLogo from "@/assets/partners/expresslab-logo.svg";
import kokomerenLogo from "@/assets/partners/kokomeren-logo.png";
import corpusLogo from "@/assets/partners/corpus-logo-cropped.jpg";
import { Armchair, Microscope, Stethoscope, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/live-edit/LiveEdit";
import { CLINIC } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";

const PARTNERS = [
  {
    name: "Экспресс Плюс",
    icon: Microscope,
    line: "Лабораторная диагностика",
    href: "https://expresslab.kg/",
    logo: expresslabLogo,
  },
  {
    name: "Көкөмерен",
    icon: Stethoscope,
    line: "Медтехника и реагенты",
    href: "https://kokomeren.kg/",
    logo: kokomerenLogo,
  },
  {
    name: "Corpus",
    icon: Armchair,
    line: "Производство мебели",
    href: undefined,
    logo: corpusLogo,
  },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="border-border border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <img
              src={logo}
              alt="Клинико-диагностический центр «Авиценна»"
              width={440}
              height={95}
              loading="lazy"
              className="h-11 w-auto"
            />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground inline-flex rounded-md px-6 py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
            >
              <Editable ekey="footer.cta" label="Кнопка в подвале" fallback="Записаться онлайн" />
            </a>
          </div>

          <Editable
            ekey="footer.tagline"
            label="Текст в подвале"
            fallback=""
            multiline
            as="p"
            className="text-muted-foreground mt-4 max-w-sm text-base"
          />
        </div>

        <div>
          <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Контакты
          </p>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <a href={`tel:${CLINIC.phones[0]}`} className="text-foreground font-semibold">
                +996 779 909 009
              </a>
            </li>
            <li className="text-muted-foreground">{CLINIC.email}</li>
            <li className="text-muted-foreground"></li>
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://api.whatsapp.com/send/?phone=996707909001&text=&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-muted-foreground hover:text-foreground grid size-10 place-items-center rounded-full border border-current/20 transition-colors hover:border-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/avicennakg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground grid size-10 place-items-center rounded-full border border-current/20 transition-colors hover:border-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-10.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44 0-.795-.644-1.439-1.439-1.439z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCdlzRkcZuqWSdxlF02ezbXw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground hover:text-foreground grid size-10 place-items-center rounded-full border border-current/20 transition-colors hover:border-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Филиалы
          </p>
          <ul className="mt-4 space-y-2 text-base">
            {CLINIC.branches.map((branch, i) => (
              <li key={branch.name}>
                <a
                  href={`/?filial=${i}#filialy`}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  {branch.city}, {branch.street}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-brand-green text-brand-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold tracking-wide uppercase">НАШИ ПАРТНЕРЫ</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PARTNERS.map((p) => {
              const content = (
                <>
                  <div className="bg-brand-white grid size-14 shrink-0 place-items-center rounded-xl p-1.5">
                    <img src={p.logo} alt={p.name} loading="lazy" className="max-h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-base font-bold">{p.name}</p>
                    <p className="text-brand-white/80 flex items-center gap-1.5 text-sm">
                      <p.icon size={4} className="size-4" aria-hidden="true" />
                      {p.line}
                    </p>
                  </div>
                  {p.href && (
                    <ArrowUpRight size={16} className="absolute top-2.5 right-2.5" aria-hidden="true" />
                  )}
                </>
              );
              const cls =
                "group relative flex items-center gap-3 rounded-xl bg-brand-white/10 p-3 ring-1 ring-brand-white/20 hover:bg-brand-white/15 transition";
              return p.href ? (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {content}
                </a>
              ) : (
                <div key={p.name} className={cls}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm sm:px-6">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Медицинская клиника «Авиценна», Бишкек</span>
            <span>Лицензия «Авиценна КейДжи» № 3823</span>
          </div>
          <a href="#faq" className="hover:text-foreground">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
