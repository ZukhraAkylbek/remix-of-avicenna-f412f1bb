import { createFileRoute } from "@tanstack/react-router";

import { CrudManager } from "@/components/admin/CrudManager";
import { PageHeader } from "@/components/admin/PageHeader";
import { DOCTOR_CATEGORIES } from "@/lib/clinic-doctors";
import { CLINIC } from "@/lib/clinic";

export const Route = createFileRoute("/_authenticated/admin/doctors")({
  head: () => ({
    meta: [
      { title: "Врачи — админка Avicenna" },
      { name: "description", content: "Карточки врачей клиники «Авиценна»: должность, опыт, образование и фото." },
      { property: "og:title", content: "Врачи — админка Avicenna" },
      { property: "og:description", content: "Добавление и редактирование специалистов клиники." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDoctors,
});

function AdminDoctors() {
  return (
    <>
      <PageHeader
        eyebrow="Команда"
        title="Врачи"
        description="Специалисты выводятся на страницах направлений и в блоке «Специалисты» на главной."
      />
      <CrudManager
        table="doctors"
        queryKey="admin-doctors"
        select="id, slug, full_name, job_title, category, branch, price, photo_url, photo_position, bio, experience_years, education, sort_order, is_active"
        titleField="full_name"
        subtitleField="job_title"
        addLabel="Добавить врача"
        searchFields={["full_name", "job_title", "slug"]}
        defaults={{ is_active: true, sort_order: 100, photo_position: "50% 20%" }}
        fields={[
          { name: "full_name", label: "ФИО", type: "text" },
          { name: "slug", label: "Адрес (slug)", type: "text", hint: "латиницей, например ivanov-ivan" },
          { name: "job_title", label: "Должность/специальность", type: "text" },
          { name: "category", label: "Категория", type: "select", options: DOCTOR_CATEGORIES.map((c) => ({ value: c.slug, label: c.name })) },
          {
            name: "branch",
            label: "Филиал",
            type: "select",
            options: CLINIC.branches.map((b) => {
              const short = b.street.replace(/^ул\.\s*/, "").replace(/,\s*/, " ");
              return { value: short, label: short };
            }),
          },
          { name: "price", label: "Цена", type: "text" },
          { name: "experience_years", label: "Опыт, лет", type: "number" },
          { name: "photo_url", label: "Фото", type: "image" },
          {
            name: "photo_position",
            label: "Кадр фото",
            type: "select",
            options: [
              { value: "50% 0%", label: "Верх" },
              { value: "50% 20%", label: "Лицо (по умолчанию)" },
              { value: "50% 50%", label: "Центр" },
            ],
          },
          { name: "education", label: "Образование", type: "textarea" },
          { name: "bio", label: "О враче", type: "textarea" },
          { name: "sort_order", label: "Порядок", type: "number" },
          { name: "is_active", label: "Публикация", type: "switch" },
        ]}
      />
    </>
  );
}
