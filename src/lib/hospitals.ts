import catalog from "@/data/ginger-catalog.json";
import { getCity, getCountry } from "@/lib/taxonomy";

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  accreditation: string;
  focus: string;
  image: string;
  summary: string;
  languages: string;
  icu: string;
};

function catalogCity(raw: string) {
  const n = (raw || "").toLowerCase();
  if (n.includes("mumbai")) return "Mumbai";
  if (n.includes("bengaluru") || n.includes("bangalore")) return "Bengaluru";
  if (n.includes("chennai")) return "Chennai";
  if (n.includes("hyderabad")) return "Hyderabad";
  return "Delhi NCR";
}

function languagesFor(city: string) {
  if (city === "Mumbai") return "English, Hindi, Marathi";
  if (city === "Bengaluru") return "English, Kannada, Hindi";
  if (city === "Chennai") return "English, Tamil, Hindi";
  if (city === "Hyderabad") return "English, Telugu, Hindi";
  return "English, Hindi";
}

const FALLBACK_HOSPITAL_IMAGE =
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80";

export const hospitals: Hospital[] = catalog.hospitals.map((seed) => {
  const cityName = catalogCity(seed.city || "");
  const city = getCity(cityName);
  const country = getCountry("India");
  if (!city || !country) {
    throw new Error(`Hospital ${seed.slug} maps to unknown city ${cityName}`);
  }
  return {
    slug: seed.slug,
    name: seed.name,
    city: city.name,
    citySlug: city.slug,
    country: country.name,
    countrySlug: country.slug,
    accreditation: "JCI · NABH",
    focus: "Radiation oncology",
    image: seed.image || FALLBACK_HOSPITAL_IMAGE,
    summary:
      seed.summary ||
      `${seed.name} is a partner campus in ${city.name} for radiation oncology — linac, stereotactic, and brachytherapy lists used to international second opinions.`,
    languages: languagesFor(city.name),
    icu: "Oncology ICU",
  };
});

export function getHospital(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}
