import { createFileRoute } from "@tanstack/react-router";

import { CrudManager, type CrudField } from "@/components/admin/CrudManager";
import { PageHeader } from "@/components/admin/PageHeader";

export const Route = createFileRoute("/_authenticated/admin/poliklinika")({
  head: () => ({
    meta: [
      { title: "Поликлиника — админка Avicenna" },
      { name: "description", content: "Направления на странице поликлиники." },
      { property: "og:title", content: "Поликлиника — админка Avicenna" },
      { property: "og:description", content: "Редактирование направлений поликлиники." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPoliklinika,
});

const ICONS = [
  "Stethoscope", "Baby", "HeartPulse", "Brain", "Activity", "Microscope", "Venus", "Mars",
  "BriefcaseMedical", "Bone", "Ear", "Hospital", "ShieldCheck", "Users",
].map((v) => ({ value: v, label: v }));

const FIELDS: CrudField[] = [
  { name: "title", label: "Название", type: "text" },
  { name: "icon", label: "Иконка", type: "select", options: ICONS },
  { name: "href", label: "Ссылка", type: "link" },
  { name: "sort_order", label: "Порядок", type: "number" },
  { name: "is_active", label: "Публикация", type: "switch" },
];

function AdminPoliklinika() {
  return (
    <>
      <PageHeader title="Поликлиника" />
      <CrudManager
        table="home_items"
        queryKey="admin-home-items"
        select="id, grp, title, icon, href, sort_order, is_active"
        fixed={{ column: "grp", value: "poli_spec" }}
        titleField="title"
        subtitleField="href"
        defaults={{ is_active: true, sort_order: 100, icon: "Stethoscope" }}
        searchFields={["title", "href"]}
        fields={FIELDS}
      />
    </>
  );
}
