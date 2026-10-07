import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { CLINIC, absoluteUrl } from "@/lib/clinic";
import { clinicDoctorsQueryOptions } from "@/lib/clinic-doctors.queries";
import { specialtyImage } from "@/lib/specialty-images";
import { surgeryDirectionQueryOptions } from "@/lib/surgery.queries";
import { DirectionBody, DirectionCrumbs, DirectionHero } from "./hirurgiya.$slug";

export const Route = createFileRoute("/poliklinika/$slug")({
  loader: async ({ params, context }) => {
    void context.queryClient.ensureQueryData(clinicDoctorsQueryOptions);
    const direction = await context.queryClient.ensureQueryData(surgeryDirectionQueryOptions(params.slug));
    if (!direction) throw notFound();
    return direction;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Страница недоступна — Авиценна" }, { name: "robots", content: "noindex" }] };
    }
    const path = `/poliklinika/${params.slug}`;
    const url = absoluteUrl(path) || path;
    const title = loaderData.meta_title?.trim() || `${loaderData.title} в Бишкеке — клиника «Авиценна»`;
    const description =
      loaderData.meta_description?.trim() || loaderData.subtitle?.trim() || `${loaderData.title} в клинике ${CLINIC.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ClinicDirectionPage,
  errorComponent: ({ error }) => (
    <div role="alert" className="p-8 text-center">{error instanceof Error ? error.message : "Ошибка загрузки"}</div>
  ),
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p>Направление не найдено.</p>
      <Link to="/poliklinika" className="text-about-teal font-semibold">Вернуться в поликлинику</Link>
    </div>
  ),
});

function ClinicDirectionPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(surgeryDirectionQueryOptions(slug));
  const name = data?.title || "Поликлиника";
  const subtitle = data?.subtitle?.trim() || "";
  const image = data?.image_url || specialtyImage(slug);
  return (
    <div className="bg-about-canvas min-h-screen">
      <DirectionCrumbs name={name} section="Поликлиника" href="/poliklinika" />
      <main>
        <DirectionHero name={name} subtitle={subtitle} image={image} bannerKey="poliklinika" />
        <DirectionBody slug={slug} variant="clinic" />
      </main>
      <SiteFooter />
    </div>
  );
}
