import { queryOptions, useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { CLINIC_DOCTORS, type ClinicDoctor } from "./clinic-doctors";

export type DbClinicDoctor = ClinicDoctor & { photoPosition?: string | null };

export const DEFAULT_PHOTO_POSITION = "50% 20%";

export const fetchClinicDoctors = createServerFn({ method: "GET" }).handler(
  async (): Promise<DbClinicDoctor[]> => {
    const { publicClient } = await import("./specialties.server");
    const { data, error } = await publicClient()
      .from("doctors")
      .select("slug, full_name, job_title, experience_years, photo_url, branch, price, category, photo_position")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((d) => ({
      slug: d.slug,
      name: d.full_name,
      specialty: d.job_title ?? "",
      experience: d.experience_years,
      photo: d.photo_url,
      branch: d.branch ?? "",
      price: d.price,
      category: d.category ?? "",
      photoPosition: d.photo_position,
    }));
  },
);

export const clinicDoctorsQueryOptions = queryOptions({
  queryKey: ["clinic-doctors"],
  queryFn: () => fetchClinicDoctors(),
  staleTime: 60_000,
});

export function withFallback(rows: DbClinicDoctor[] | undefined): DbClinicDoctor[] {
  return rows && rows.length > 0 ? rows : CLINIC_DOCTORS;
}

export function useClinicDoctors(): DbClinicDoctor[] {
  const { data } = useQuery(clinicDoctorsQueryOptions);
  return withFallback(data);
}

export function photoStyle(d: { photoPosition?: string | null }) {
  return { objectPosition: d.photoPosition ?? DEFAULT_PHOTO_POSITION };
}
