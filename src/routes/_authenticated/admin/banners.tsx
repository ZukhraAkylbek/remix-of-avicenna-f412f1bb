import { createFileRoute } from "@tanstack/react-router";

import { CrudManager, type CrudField } from "@/components/admin/CrudManager";
import { PageHeader } from "@/components/admin/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/admin/banners")({
  head: () => ({
    meta: [
      { title: "Баннеры страниц — админка Avicenna" },
      { name: "description", content: "Слайды баннеров на внутренних страницах сайта." },
      { property: "og:title", content: "Баннеры страниц — админка Avicenna" },
      { property: "og:description", content: "Редактирование баннеров внутренних страниц клиники." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminBanners,
});

const PAGES = [
  ["poliklinika", "Поликлиника"], ["vrachi", "Врачи"], ["travmpunkt", "Травмпункт"], ["hirurgiya", "Хирургия"],
  ["statsionar", "Стационар"], ["diagnostika", "Диагностика"], ["checkups", "Чекап"], ["about", "О нас"],
] as const;

const FIELDS: CrudField[] = [
  { name: "image_url", label: "Фото", type: "image" },
  { name: "alt", label: "Описание фото", type: "text" },
  { name: "caption", label: "Подпись на фото, необязательно", type: "text" },
  { name: "href", label: "Ссылка", type: "link" },
  {
    name: "position",
    label: "Кадр фото",
    type: "select",
    options: [
      { value: "50% 50%", label: "Центр" },
      { value: "50% 20%", label: "Верх" },
      { value: "50% 80%", label: "Низ" },
    ],
  },
  { name: "sort_order", label: "Порядок", type: "number" },
  { name: "is_active", label: "Публикация", type: "switch" },
];

function AdminBanners() {
  return (
    <>
      <PageHeader title="Баннеры страниц" />
      <Tabs defaultValue="poliklinika">
        <TabsList className="flex h-auto flex-wrap">
          {PAGES.map(([k, l]) => (
            <TabsTrigger key={k} value={k}>{l}</TabsTrigger>
          ))}
        </TabsList>
        {PAGES.map(([k]) => (
          <TabsContent key={k} value={k}>
            <CrudManager
              table="page_banners"
              queryKey="admin-page-banners"
              select="id, page_key, image_url, alt, caption, href, position, sort_order, is_active"
              fixed={{ column: "page_key", value: k }}
              titleField="alt"
              defaults={{ is_active: true, sort_order: 100, position: "50% 50%" }}
              searchFields={["alt", "caption"]}
              fields={FIELDS}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
