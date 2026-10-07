import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Banknote, Clock, MapPin, MessageCircle, UserRound } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CLINIC, absoluteUrl } from "@/lib/clinic";
import { BOOKING_URL } from "@/lib/site-config";
import {
  CLINIC_DOCTORS,
  categoryName,
  experienceLabel,
  findDoctor,
} from "@/lib/clinic-doctors";

const WHATSAPP_URL = `https://wa.me/${(CLINIC.phones?.[0] ?? "996779909009").replace(/\D/g, "")}`;

export const Route = createFileRoute("/vrachi/$slug")({
  loader: ({ params }) => {
    const doctor = findDoctor(params.slug);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.doctor;
    const title = d ? `${d.name} — ${d.specialty} | Авиценна` : "Врач | Авиценна";
    const description = d
      ? `${d.name}, ${d.specialty}${d.experience ? `, стаж ${experienceLabel(d.experience)}` : ""}. Приём в клинике «Авиценна», ${d.branch}. Запись онлайн.`
      : "Врач клиники «Авиценна».";
    const url = absoluteUrl(`/vrachi/${d?.slug ?? ""}`);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Врачи" />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h1 className="text-about-ink text-3xl font-extrabold">Врач не найден</h1>
        <Link to="/vrachi" className="text-about-teal mt-4 inline-block font-semibold">
          Все врачи →
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: DoctorPage,
});

function DoctorPage() {
  const { doctor } = Route.useLoaderData();
  const colleagues = CLINIC_DOCTORS.filter(
    (d) => d.category === doctor.category && d.slug !== doctor.slug,
  );
  const facts = [
    doctor.experience != null && { icon: Clock, label: "Стаж", value: experienceLabel(doctor.experience) },
    doctor.price && { icon: Banknote, label: "Стоимость приёма", value: doctor.price },
    { icon: MapPin, label: "Филиал", value: doctor.branch },
  ].filter(Boolean) as { icon: typeof Clock; label: string; value: string }[];

  return (
    <div className="bg-about-canvas min-h-screen">
      <SiteHeader breadcrumb="Врачи" />
      <Breadcrumbs items={[{ label: "Врачи", href: "/vrachi" }, { label: doctor.name }]} />
      <main>
        <section className="bg-about-mint">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-10 md:grid-cols-[260px_1fr] md:items-center">
            <div className="border-about-line bg-about-canvas mx-auto aspect-[4/5] w-48 overflow-hidden rounded-2xl border sm:w-60 md:w-full">
              {doctor.photo ? (
                <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover object-top" />
              ) : (
                <span className="text-about-teal grid h-full place-items-center">
                  <UserRound className="size-16" aria-hidden="true" />
                </span>
              )}
            </div>
            <div>
              <h1 className="text-about-ink mt-2 text-2xl leading-tight font-extrabold sm:text-4xl">
                {doctor.name}
              </h1>
              <p className="text-about-teal mt-2 text-base font-semibold sm:text-lg">{doctor.specialty}</p>
              <dl className="mt-4 grid gap-2 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="border-about-line bg-about-canvas flex items-center gap-3 rounded-2xl border p-3">
                    <span className="bg-about-icon text-about-teal grid size-9 shrink-0 place-items-center rounded-full">
                      <f.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-about-copy text-[13px]">{f.label}</dt>
                      <dd className="text-about-ink text-sm font-bold">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-primary-foreground">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">Записаться на приём</a>
                </Button>
                <Button asChild variant="outline" className="border-about-line text-about-ink bg-transparent shadow-none">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" /> Задать вопрос
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {colleagues.length > 0 && (
          <section className="py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-about-ink text-2xl font-extrabold sm:text-3xl">
                  Другие врачи: {categoryName(doctor.category)}
                </h2>
                <Link to="/vrachi" className="text-about-teal inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
                  Все врачи <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {colleagues.map((d) => (
                  <Link
                    key={d.slug}
                    to="/vrachi/$slug"
                    params={{ slug: d.slug }}
                    className="border-about-line hover:border-about-teal flex items-center gap-3 rounded-2xl border p-4 transition-colors"
                  >
                    {d.photo ? (
                      <img src={d.photo} alt="" loading="lazy" className="size-14 shrink-0 rounded-full object-cover object-top" />
                    ) : (
                      <span className="bg-about-icon text-about-teal grid size-14 shrink-0 place-items-center rounded-full">
                        <UserRound className="size-6" />
                      </span>
                    )}
                    <span>
                      <span className="text-about-ink block text-sm font-bold">{d.name}</span>
                      <span className="text-about-teal block text-[13px]">{d.specialty}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
