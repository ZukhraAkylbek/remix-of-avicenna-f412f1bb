import { publicClient } from "./specialties.server";

export type SurgerySection = {
  id: string;
  key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  primary_label: string | null;
  primary_url: string | null;
  secondary_label: string | null;
  secondary_url: string | null;
  sort_order: number;
};

export type SurgeryDirection = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  icon: string | null;
  image_url: string | null;
  body: string | null;
  diseases: string | null;
  procedures: string | null;
  diagnostics: string | null;
  steps: string | null;
  faq: string | null;
  advantages: string | null;
  symptoms: string | null;
  about_title: string | null;
  doctor_slugs: string | null;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  updated_at: string;
};

export type SurgeryDoctor = {
  slug: string;
  full_name: string;
  job_title: string | null;
  photo_url: string | null;
  bio: string | null;
  experience_years: number | null;
};

const SECTION_SELECT =
  "id, key, title, subtitle, body, image_url, primary_label, primary_url, secondary_label, secondary_url, sort_order";
const DIRECTION_SELECT =
  "id, slug, title, subtitle, icon, image_url, body, diseases, procedures, diagnostics, steps, faq, advantages, symptoms, about_title, doctor_slugs, meta_title, meta_description, sort_order, updated_at";

export async function listSurgerySections(): Promise<SurgerySection[]> {
  const { data, error } = await publicClient()
    .from("surgery_sections")
    .select(SECTION_SELECT)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function listSurgeryDirections(): Promise<SurgeryDirection[]> {
  const { data, error } = await publicClient()
    .from("surgery_directions")
    .select(DIRECTION_SELECT)
    .eq("is_active", true)
    .lt("sort_order", 100)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getSurgeryDirection(slug: string): Promise<SurgeryDirection | null> {
  const { data, error } = await publicClient()
    .from("surgery_directions")
    .select(DIRECTION_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

/** Врачи-хирурги: специалисты направлений, у которых slug содержит «hirurg». */
export async function listSurgeons(): Promise<SurgeryDoctor[]> {
  const supabase = publicClient();

  const { data: specialties } = await supabase
    .from("specialties")
    .select("id, slug")
    .eq("is_active", true);

  const ids = (specialties ?? [])
    .filter((s) => /hirurg|travmatolog|urolog|ginekolog|proktolog|flebolog/i.test(s.slug))
    .map((s) => s.id);

  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("doctors")
    .select("slug, full_name, job_title, photo_url, bio, experience_years")
    .in("specialty_id", ids)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

const DOCTOR_SELECT = "slug, full_name, job_title, photo_url, bio, experience_years";

/** Врачи конкретного направления: по явному списку слагов либо по родственной специальности. */
export async function listDirectionDoctors(
  directionSlug: string,
  doctorSlugs: string | null,
): Promise<SurgeryDoctor[]> {
  const supabase = publicClient();
  const explicit = (doctorSlugs ?? "")
    .split(/[\n,]/)
    .map((value) => value.trim())
    .filter(Boolean);

  if (explicit.length > 0) {
    const { data } = await supabase
      .from("doctors")
      .select(DOCTOR_SELECT)
      .in("slug", explicit)
      .eq("is_active", true);
    return data ?? [];
  }

  const stem = directionSlug.replace(/iya$|ya$|-hirurgiya$/g, "").slice(0, 6);
  const { data: specialties } = await supabase
    .from("specialties")
    .select("id, slug")
    .eq("is_active", true);

  const ids = (specialties ?? [])
    .filter((s) => stem.length > 3 && s.slug.includes(stem))
    .map((s) => s.id);

  if (ids.length === 0) return listSurgeons();

  const { data } = await supabase
    .from("doctors")
    .select(DOCTOR_SELECT)
    .in("specialty_id", ids)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return data ?? [];
}
