import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type HomeItemGroup = "route" | "specialty" | "stat" | "offer" | "review" | "poli_spec";

export type HomeItem = {
  id: string;
  grp: HomeItemGroup;
  title: string;
  text: string | null;
  value: string | null;
  icon: string | null;
  image_url: string | null;
  href: string | null;
  tag: string | null;
  tone: string | null;
  price: string | null;
  old_price: string | null;
  source: string | null;
  rating: number | null;
  sort_order: number;
  is_active: boolean;
};

export async function fetchHomeItems(): Promise<HomeItem[]> {
  const { data, error } = await supabase
    .from("home_items")
    .select(
      "id, grp, title, text, value, icon, image_url, href, tag, tone, price, old_price, source, rating, sort_order, is_active",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as HomeItem[];
}

export const homeItemsQueryOptions = () =>
  queryOptions({
    queryKey: ["home-items"],
    queryFn: fetchHomeItems,
  });
