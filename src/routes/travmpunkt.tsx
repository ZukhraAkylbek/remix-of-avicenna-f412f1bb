import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  Bone,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Phone,
  Syringe,
  UserRound,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { CLINIC, absoluteUrl, faqPageJsonLd } from "@/lib/clinic";
import { parseRows, surgeryDirectionQueryOptions } from "@/lib/surgery.queries";
import { DirectionBody } from "./hirurgiya.$slug";

const TITLE = "Травмпункт 24/7 в Бишкеке — круглосуточно | Авиценна";
const DESCRIPTION =
  "Круглосуточный травмпункт «Авиценна» в Бишкеке: переломы, вывихи, раны, ожоги. Без записи, ул. Жукеева-Пудовкина, 124. Уточните возможность помощи до приезда в WhatsApp.";

const WHATSAPP_TRAUMA_URL = `https://wa.me/996707909001?text=${encodeURIComponent("Здравствуйте! Хочу уточнить, можно ли обратиться в травмпункт с моей ситуацией.")}`;

export const Route = createFileRoute("/travmpunkt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/travmpunkt") || "/travmpunkt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/travmpunkt") || "/travmpunkt" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(surgeryDirectionQueryOptions("travmatologiya")),
  component: TraumaPage,
});

function TraumaPage() {
  const { data } = useSuspenseQuery(surgeryDirectionQueryOptions("travmatologiya"));
  const faqItems = parseRows(data?.faq);
  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Травмпункт 24/7" />
      <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi" }, { label: "Травмпункт" }]} />

      {faqItems.length > 0 && (<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(faqItems.map((item) => ({ question: item.title, answer: item.text ?? "" }))),
          ),
        }}
      />)}

      <main>
        {/* Герой */}
        <section className="bg-about-mint border-b border-about-line">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-brand-white">
                <Clock3 className="size-4" aria-hidden="true" />
                Работаем круглосуточно
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-about-ink sm:text-4xl lg:text-5xl">
                Травмпункт в Бишкеке
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-about-copy sm:text-lg">
                В сети клиник «Авиценна» работает травмпункт круглосуточно, 24 часа в сутки, 7 дней в неделю. Перед приездом уточните возможность приёма по телефону круглосуточного колл-центра 0779 909 009 — травмпункт принимает не все виды травм и повреждений.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={WHATSAPP_TRAUMA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-6"
                >
                  Уточнить перед приездом
                </a>
                <a
                  href={`tel:${CLINIC.phones[0]}`}
                  className="inline-flex items-center gap-2 rounded-md border border-about-line bg-white px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:border-brand-green hover:text-brand-green sm:px-6"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  +996 779 909 009
                </a>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-about-copy">
                <MapPin className="size-4 text-about-teal" aria-hidden="true" />
                ул. Жукеева-Пудовкина, 124 — приём без записи
              </p>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="/assets/svc-priem.jpg"
                alt="Травмпункт клиники Авиценна"
                loading="eager"
                className="aspect-[4/3] w-full rounded-2xl border border-about-line object-cover lg:h-[380px]"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-about-line bg-about-canvas py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <TraumaHeading
              icon={<AlertTriangle className="size-5" aria-hidden="true" />}
              title="Когда нужна другая помощь"
              description="Травмпункт оказывает помощь при травмах. Перед приездом уточните в WhatsApp, смогут ли помочь именно в вашей ситуации."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-about-line bg-white p-4">
                <h3 className="font-bold text-about-ink">Не связано с травмой</h3>
                <p className="mt-2 text-sm leading-relaxed text-about-copy">При жалобах без травмы обратитесь в поликлинику или уточните, какой специалист вам нужен.</p>
              </div>
              <div className="rounded-2xl border border-about-line bg-white p-4">
                <h3 className="font-bold text-about-ink">Угроза жизни</h3>
                <p className="mt-2 text-sm leading-relaxed text-about-copy">При потере сознания, сильном кровотечении или затруднении дыхания не ждите ответа в WhatsApp — вызовите скорую помощь по номеру <a href="tel:103" className="font-bold text-about-teal underline">103</a>.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Детский травматолог */}
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-6 rounded-2xl border border-about-line bg-white p-5 sm:p-8 lg:grid-cols-[auto_1fr_auto]">
              <span className="grid size-14 place-items-center rounded-2xl bg-about-icon text-about-teal">
                <Baby className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-about-ink sm:text-2xl">
                  Детский травматолог-ортопед
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-about-copy sm:text-base">
                  В травмпункте ведёт приём детский травматолог-ортопед: диагностика и лечение
                  травм, нарушений осанки, плоскостопия, заболеваний суставов и костной системы у
                  детей. Работает каждый день — график уточняйте заранее в колл-центре.
                </p>
              </div>
              <a
                href={`tel:${CLINIC.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-about-teal px-5 py-3 text-sm font-semibold text-about-teal transition-colors hover:bg-brand-green hover:border-brand-green hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                Уточнить график
              </a>
            </div>
          </div>
        </section>

        <DirectionBody slug="travmatologiya" />
      </main>
      <SiteFooter />
    </div>
  );
}

function TraumaHeading({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {icon && (
        <span className="mb-2 grid size-9 place-items-center rounded-xl bg-about-icon text-about-teal">
          {icon}
        </span>
      )}
      <h2 className="text-2xl font-extrabold text-about-ink sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-about-copy sm:text-base">{description}</p>
      )}
    </div>
  );
}
