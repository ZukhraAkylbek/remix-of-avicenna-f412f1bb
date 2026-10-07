// Позже эти данные будут приходить из админки
export type BannerSlide = { image: string; alt: string; caption?: string; href?: string; position?: string };

const s = (image: string, alt: string): BannerSlide => ({ image, alt });

export const PAGE_BANNERS = {
  poliklinika: [
    s("/assets/doctor-patient-hero.webp", "Консультация врача в поликлинике «Авиценна»"),
    s("/assets/checkup-doctors.jpg", "Врачи поликлиники «Авиценна»"),
    s("/assets/svc-priem.jpg", "Приём врача"),
  ],
  vrachi: [
    s("/assets/checkup-doctors.jpg", "Врачи клиники «Авиценна»"),
    s("/assets/doctor-patient-hero.webp", "Консультация врача"),
    s("/assets/about-mission.webp", "Команда клиники «Авиценна»"),
  ],
  travmpunkt: [
    s("/assets/svc-priem.jpg", "Травмпункт клиники «Авиценна»"),
    s("/assets/spec-travma.webp", "Травматолог-ортопед"),
    s("/assets/image.webp", "Клиника «Авиценна»"),
  ],
  hirurgiya: [
    s("/assets/spec-hirurg.webp", "Хирургическое отделение клиники «Авиценна»"),
    s("/assets/image-2.webp", "Палата клиники"),
    s("/assets/uslugi-hero.jpg", "Медицинское оборудование"),
  ],
  statsionar: [
    s("/assets/about-hero.webp", "Стационар клиники «Авиценна»"),
    s("/assets/image-2.webp", "Палата стационара"),
    s("/assets/about-mission.webp", "Команда стационара"),
  ],
  diagnostika: [
    s("/assets/svc-uzi.jpg", "УЗИ-диагностика"),
    s("/assets/svc-analizy.jpg", "Лабораторные анализы"),
    s("/assets/uslugi-hero.jpg", "Диагностическое оборудование"),
  ],
  checkups: [
    s("/assets/promo-family-all.jpg", "Семья, заботящаяся о здоровье"),
    s("/assets/checkup-female.jpg", "Женский чекап"),
    s("/assets/checkup-male.jpg", "Мужской чекап"),
  ],
  about: [
    s("/assets/about-hero.webp", "Клиника «Авиценна»"),
    s("/assets/about-mission.webp", "Команда клиники «Авиценна»"),
    s("/assets/image.webp", "Клиника «Авиценна»"),
  ],
} satisfies Record<string, BannerSlide[]>;
