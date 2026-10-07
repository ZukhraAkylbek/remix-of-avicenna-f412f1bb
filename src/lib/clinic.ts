/**
 * Данные клиники для JSON-LD разметки и контактных блоков.
 */
export const CLINIC = {
  name: "Сеть многопрофильных клиник «Авиценна»",
  legalName: "Авиценна",
  description:
    "Сеть многопрофильных клиник в Бишкеке: поликлиника, травмпункт 24/7, хирургия, лаборатория, стационар.",
  phones: ["+996779909009"],
  whatsapp: "+996707909001",
  email: "info@avicenna.kg",
  branches: [
    {
      name: "Авиценна — ул. Бакаева, 106",
      street: "ул. Бакаева, 106",
      subtitle: "Главный филиал",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.8389341,
      longitude: 74.5765294,
    },
    {
      name: "Авиценна — ул. Джунусалиева, 83",
      street: "ул. Джунусалиева, 83",
      subtitle: "Поликлиника",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.8525108,
      longitude: 74.5812276,
    },
    {
      name: "Авиценна — ул. Жукеева-Пудовкина, 124",
      street: "ул. Жукеева-Пудовкина, 124",
      subtitle: "Поликлиника",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.8417063,
      longitude: 74.6154185,
    },
    {
      name: "Авиценна — ул. Московская, 136",
      street: "ул. Московская, 136",
      subtitle: "Поликлиника",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.869544,
      longitude: 74.5974921,
    },
    {
      name: "Авиценна — ул. Юнусалиева, 173А, блок А",
      street: "ул. Юнусалиева, 173А, блок А",
      subtitle: "Хирургический центр",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.8277156,
      longitude: 74.6209791,
    },
    {
      name: "Авиценна — пр. Жибек-Жолу, 213",
      street: "пр. Жибек-Жолу, 213",
      subtitle: "Поликлиника",
      city: "Бишкек",
      region: "Чуйская область",
      postalCode: "720000",
      country: "KG",
      latitude: 42.8881142,
      longitude: 74.6399519,
    },
  ],
  /** Травмпункт круглосуточно, поликлиника 08:00–20:00. */
  openingHours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "20:00" },
    { days: ["Sa", "Su"], opens: "09:00", closes: "18:00" },
  ],
} as const;


/** Базовый адрес сайта. TODO: заполнить после привязки домена. */
export const BASE_URL = "";

export const absoluteUrl = (path: string) => `${BASE_URL}${path}`;

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "MedicalClinic"],
    name: CLINIC.name,
    legalName: CLINIC.legalName,
    description: CLINIC.description,
    url: absoluteUrl("/") || undefined,
    telephone: CLINIC.phones[0],
    email: CLINIC.email,
    medicalSpecialty: [
      "Urologic",
      "Gastroenterologic",
      "Cardiovascular",
      "Neurologic",
      "Gynecologic",
      "Surgical",
      "Pediatric",
      "Endocrine",
    ],
    address: CLINIC.branches.map((b) => ({
      "@type": "PostalAddress",
      streetAddress: b.street,
      addressLocality: b.city,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: b.country,
    })),
    location: CLINIC.branches.map((b) => ({
      "@type": "Place",
      name: b.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.street,
        addressLocality: b.city,
        addressCountry: b.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: b.latitude,
        longitude: b.longitude,
      },
    })),
    openingHoursSpecification: CLINIC.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${dayName(d)}`),
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: CLINIC.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      availableLanguage: ["ru", "ky"],
    })),
  };
}

const DAY_NAMES: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

function dayName(short: string) {
  return DAY_NAMES[short] ?? short;
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function googleMapsUrl(latitude: number, longitude: number, _label?: string) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function googleMapsDirectionsUrl(latitude: number, longitude: number, _label?: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}



export function doubleGisSearchUrl(address: string) {
  return `https://2gis.kg/bishkek/search/${encodeURIComponent(address)}`;
}


export function physicianJsonLd(doctor: {
  full_name: string;
  job_title: string | null;
  photo_url: string | null;
  bio: string | null;
  education: string | null;
  specialtyName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.full_name,
    jobTitle: doctor.job_title ?? undefined,
    image: doctor.photo_url ?? undefined,
    description: doctor.bio ?? undefined,
    alumniOf: doctor.education ?? undefined,
    medicalSpecialty: doctor.specialtyName,
    url: doctor.url || undefined,
    worksFor: { "@type": "MedicalClinic", name: CLINIC.name },
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.branches[0].street,
      addressLocality: CLINIC.branches[0].city,
      addressCountry: CLINIC.branches[0].country,
    },
    telephone: CLINIC.phones[0],
  };
}
