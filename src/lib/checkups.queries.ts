import { queryOptions } from "@tanstack/react-query";

import { fetchCheckupCards } from "./checkups.functions";

export const checkupCardsQueryOptions = () =>
  queryOptions({
    queryKey: ["checkups", "cards"],
    queryFn: () => fetchCheckupCards(),
  });

export const checkupPageQueryOptions = () =>
  queryOptions({
    queryKey: ["checkups", "page"],
    queryFn: async () => ({ cards: await fetchCheckupCards() }),
  });

export const checkupCardQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["checkups", "card", slug],
    queryFn: async () => (await fetchCheckupCards()).find((c) => c.slug === slug) ?? null,
  });

export type CheckupSection = { title: string; items: string[] };

/** «## Заголовок», затем пункты по строке; секции разделены пустой строкой. */
export function parseSections(includes: string | null | undefined): CheckupSection[] {
  if (!includes) return [];
  const sections: CheckupSection[] = [];
  let current: CheckupSection | null = null;
  for (const raw of includes.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("##")) {
      current = { title: line.replace(/^#+\s*/, ""), items: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { title: "Что входит", items: [] };
        sections.push(current);
      }
      current.items.push(line.replace(/^[-•*]\s*/, ""));
    }
  }
  return sections;
}

export function parseParagraphs(body: string | null | undefined): string[] {
  return (body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
