import { queryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

// Позже эти данные будут приходить из админки
export type BannerSlide = { image: string; alt: string; caption?: string; href?: string; position?: string };

const s = (image: string, alt: string): BannerSlide => ({ image, alt });

export const PAGE_BANNERS = {
  poliklinika: [
    s("/assets/doctor-patient-hero.webp", "Консультация врача в поликлинике «Авиценна»"),
    s("/assets/checkup-doctors.jpg", "Врачи поликлиники «Авиценна»"),
    s("/assets/svc-priem.jpg", "Приём врача"),
  ],
  vrachi: [
    s("/assets/checkup-doctors.jpg", "Врачи клиники «Авиценна»"),
    s("/assets/doctor-patient-hero.webp", "Консультация врача"),
    s("/assets/about-mission.webp", "Команда клиники «Авиценна»"),
  ],
  travmpunkt: [
    s("/assets/svc-priem.jpg", "Травмпункт клиники «Авиценна»"),
    s("/assets/spec-travma.webp", "Травматолог-ортопед"),
    s("/assets/image.webp", "Клиника «Авиценна»"),
  ],
  hirurgiya: [
    s("/assets/spec-hirurg.webp", "Хирургическое отделение клиники «Авиценна»"),
    s("/assets/image-2.webp", "Палата клиники"),
    s("/assets/uslugi-hero.jpg", "Медицинское оборудование"),
  ],
  statsionar: [
    s("/assets/about-hero.webp", "Стационар клиники «Авиценна»"),
    s("/assets/image-2.webp", "Палата стационара"),
    s("/assets/about-mission.webp", "Команда стационара"),
  ],
  diagnostika: [
    s("/assets/svc-uzi.jpg", "УЗИ-диагностика"),
    s("/assets/svc-analizy.jpg", "Лабораторные анализы"),
    s("/assets/uslugi-hero.jpg", "Диагностическое оборудование"),
  ],
  checkups: [
    s("/assets/promo-family-all.jpg", "Семья, заботящаяся о здоровье"),
    s("/assets/checkup-female.jpg", "Женский чекап"),
    s("/assets/checkup-male.jpg", "Мужской чекап"),
  ],
  about: [
    s("/assets/about-hero.webp", "Клиника «Авиценна»"),
    s("/assets/about-mission.webp", "Команда клиники «Авиценна»"),
    s("/assets/image.webp", "Клиника «Авиценна»"),
  ],
} satisfies Record<string, BannerSlide[]>;

type BannerRow = { page_key: string; image_url: string; alt: string | null; caption: string | null; href: string | null; position: string | null };

export const pageBannersQueryOptions = queryOptions({
  queryKey: ["page-banners"],
  queryFn: async (): Promise<BannerRow[]> => {
    const { data, error } = await supabase
      .from("page_banners")
      .select("page_key, image_url, alt, caption, href, position")
      .eq("is_active", true)
      .order("sort_order");
    if (error) return [];
    return (data ?? []) as BannerRow[];
  },
  staleTime: 60_000,
});

export function usePageBanners(pageKey: string, fallback: BannerSlide[]): BannerSlide[] {
  const { data } = useQuery(pageBannersQueryOptions);
  const rows = (data ?? []).filter((r) => r.page_key === pageKey && r.image_url);
  if (!rows.length) return fallback;
  return rows.map((r) => ({
    image: r.image_url,
    alt: r.alt ?? "",
    ...(r.caption ? { caption: r.caption } : {}),
    ...(r.href ? { href: r.href } : {}),
    ...(r.position ? { position: r.position } : {}),
  }));
}
