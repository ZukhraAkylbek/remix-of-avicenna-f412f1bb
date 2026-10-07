import { createFileRoute } from "@tanstack/react-router";

import { CrudManager, type CrudField } from "@/components/admin/CrudManager";
import { PageHeader } from "@/components/admin/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/admin/home")({
  head: () => ({
    meta: [
      { title: "Главная страница — админка Avicenna" },
      { name: "description", content: "Плитки, направления, счётчики, акции и отзывы на главной странице." },
      { property: "og:title", content: "Главная страница — админка Avicenna" },
      { property: "og:description", content: "Редактирование списков главной страницы клиники." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminHome,
});

const opts = (list: string[]) => list.map((v) => ({ value: v, label: v }));

const TONES = opts([
  "pastel-mint", "pastel-coral", "pastel-sky", "pastel-lavender", "pastel-sand",
  "pastel-rose", "pastel-lime", "pastel-azure", "pastel-peach",
]);

const sortActive: CrudField[] = [
  { name: "sort_order", label: "Порядок", type: "number" },
  { name: "is_active", label: "Публикация", type: "switch" },
];

const SELECT =
  "id, grp, title, text, value, icon, image_url, href, tag, tone, price, old_price, source, rating, sort_order, is_active";

const TABS: { grp: string; label: string; titleField?: string; subtitleField?: string; fields: CrudField[] }[] = [
  {
    grp: "route",
    label: "Плитки",
    subtitleField: "href",
    fields: [
      { name: "title", label: "Название", type: "text" },
      { name: "href", label: "Ссылка", type: "link" },
      { name: "tone", label: "Цвет", type: "select", options: TONES },
      ...sortActive,
    ],
  },
  {
    grp: "specialty",
    label: "Направления",
    subtitleField: "href",
    fields: [
      { name: "title", label: "Название", type: "text" },
      {
        name: "icon",
        label: "Иконка",
        type: "select",
        options: opts(["Brain", "Droplets", "Ribbon", "Flower2", "HeartPulse", "Ear", "Microscope", "Stethoscope", "Baby", "Bone"]),
      },
      { name: "href", label: "Ссылка", type: "link" },
      ...sortActive,
    ],
  },
  {
    grp: "stat",
    label: "Счётчики",
    titleField: "value",
    subtitleField: "title",
    fields: [
      { name: "value", label: "Значение", type: "text" },
      { name: "title", label: "Подпись", type: "text" },
      {
        name: "icon",
        label: "Иконка",
        type: "select",
        options: opts(["MapPin", "Stethoscope", "TrendingUp", "ClipboardCheck", "Award", "Waves", "Users", "HeartPulse"]),
      },
      ...sortActive,
    ],
  },
  {
    grp: "offer",
    label: "Новости и акции",
    subtitleField: "tag",
    fields: [
      { name: "image_url", label: "Изображение", type: "image" },
      { name: "tag", label: "Метка", type: "select", options: opts(["Акция", "Новость", "Спецпредложение"]) },
      { name: "title", label: "Заголовок", type: "text" },
      { name: "text", label: "Текст", type: "textarea" },
      { name: "price", label: "Цена", type: "text" },
      { name: "old_price", label: "Старая цена", type: "text" },
      { name: "href", label: "Ссылка", type: "link" },
      { name: "tone", label: "Цвет", type: "select", options: TONES },
      ...sortActive,
    ],
  },
  {
    grp: "review",
    label: "Отзывы",
    subtitleField: "source",
    fields: [
      { name: "title", label: "Имя", type: "text" },
      { name: "text", label: "Отзыв", type: "textarea" },
      { name: "source", label: "Источник", type: "select", options: opts(["2ГИС", "Google", "Instagram", "Другое"]) },
      { name: "rating", label: "Оценка (1–5)", type: "number", hint: "От 1 до 5" },
      ...sortActive,
    ],
  },
];

function AdminHome() {
  return (
    <>
      <PageHeader
        eyebrow="Контент"
        title="Главная страница"
        description="Списки блоков главной: плитки, направления, счётчики, акции и отзывы."
      />
      <Tabs defaultValue="route">
        <TabsList className="flex h-auto flex-wrap">
          {TABS.map((t) => (
            <TabsTrigger key={t.grp} value={t.grp}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((t) => (
          <TabsContent key={t.grp} value={t.grp} className="mt-4">
            <CrudManager
              table="home_items"
              queryKey="admin-home-items"
              select={SELECT}
              fixed={{ column: "grp", value: t.grp }}
              titleField={t.titleField ?? "title"}
              {...(t.subtitleField ? { subtitleField: t.subtitleField } : {})}
              defaults={{ is_active: true, sort_order: 100, ...(t.grp === "review" ? { rating: 5 } : {}) }}
              searchFields={["title", "text", "value"]}
              fields={t.fields}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
