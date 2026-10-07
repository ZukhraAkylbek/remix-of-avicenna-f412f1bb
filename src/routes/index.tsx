import { createFileRoute } from "@tanstack/react-router";

import { HOME_HERO_IMAGE, HomeV3 } from "@/components/HomeV3";
import { activeHeroSlidesQueryOptions } from "@/lib/hero-slides.queries";
import { homeItemsQueryOptions } from "@/lib/home-items";
import { absoluteUrl, medicalClinicJsonLd } from "@/lib/clinic";

const TITLE = "Авиценна — сеть многопрофильных клиник в Бишкеке";
const DESCRIPTION =
  "Поликлиника, травмпункт 24/7, хирургия, лаборатория и стационар в Бишкеке. Онлайн-запись к врачу за минуту.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content:
          "Приём специалистов, диагностика, анализы и стационар. Круглосуточная запись: +996 779 909 009.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") || "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") || "/" },
      { rel: "preload", as: "image", href: HOME_HERO_IMAGE, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(medicalClinicJsonLd()),
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(activeHeroSlidesQueryOptions());
    await context.queryClient.prefetchQuery(homeItemsQueryOptions());
  },
  component: HomeV3,
});
