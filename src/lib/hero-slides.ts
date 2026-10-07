import { supabase } from "@/integrations/supabase/client";

export const HERO_BUCKET = "hero-slides";

export type HeroSlide = {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  eyebrow: string | null;
  highlight: string | null;
  cta_label: string | null;
  cta_href: string | null;
  sort_order: number;
  is_active: boolean;
};

export type HeroSlideWithUrl = HeroSlide & { displayUrl: string };

const COLUMNS =
  "id, image_url, title, subtitle, eyebrow, highlight, cta_label, cta_href, sort_order, is_active";

export function heroImageUrl(value: string): string {
  if (!value) return "";
  if (value.startsWith("/") || /^https?:\/\//i.test(value)) return value;
  return supabase.storage.from(HERO_BUCKET).getPublicUrl(value).data.publicUrl;
}

export function withDisplayUrls(slides: HeroSlide[]): HeroSlideWithUrl[] {
  return slides.map((slide) => ({ ...slide, displayUrl: heroImageUrl(slide.image_url) }));
}

export async function fetchActiveHeroSlides(): Promise<HeroSlideWithUrl[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select(COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return withDisplayUrls(data ?? []);
}

export async function fetchAllHeroSlides(): Promise<HeroSlideWithUrl[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select(COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return withDisplayUrls(data ?? []);
}
