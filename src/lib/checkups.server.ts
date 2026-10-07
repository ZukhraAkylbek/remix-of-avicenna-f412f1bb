import { publicClient } from "./specialties.server";

export type CheckupCard = {
  id: string;
  slug: string;
  badge: string | null;
  title: string;
  subtitle: string | null;
  price: string | null;
  price_note: string | null;
  icon: string | null;
  body: string | null;
  includes: string | null;
  sort_order: number;
};

export async function listCheckupCards(): Promise<CheckupCard[]> {
  const { data, error } = await publicClient()
    .from("checkup_cards")
    .select("id, slug, badge, title, subtitle, price, price_note, icon, body, includes, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
