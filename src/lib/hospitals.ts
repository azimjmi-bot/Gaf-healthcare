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

type HospitalSeed = Omit<Hospital, "citySlug" | "countrySlug">;

const seeds: HospitalSeed[] = [
  {
    slug: "cheongdam-atelier",
    name: "Cheongdam Atelier Hospital",
    city: "Seoul",
    country: "South Korea",
    accreditation: "JCI",
    focus: "Radiation oncology · linac and stereotactic",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A private Gangnam campus with reserved linac blocks, same-week simulation, and recovery suites a walk from Cheongdam.",
    languages: "English, Korean, Mandarin",
    icu: "Level II · overnight observation floors",
  },
  {
    slug: "bosphorus-international",
    name: "Bosphorus International",
    city: "Istanbul",
    country: "Türkiye",
    accreditation: "JCI · ISO 9001",
    focus: "SRS, SBRT, CyberKnife",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "High-volume radiotherapy with a dedicated international ward and published physics QA dashboards. Recovery on the European shore.",
    languages: "English, Turkish, Arabic, German",
    icu: "Full ICU · 24/7 on-call",
  },
  {
    slug: "sukhumvit-campus",
    name: "Sukhumvit Medical Campus",
    city: "Bangkok",
    country: "Thailand",
    accreditation: "JCI",
    focus: "Proton, brachytherapy, EBRT",
    image:
      "https://images.unsplash.com/photo-1538108142413-76d1c2d5d0c2?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A hotel-grade campus with full ICU, in-house physics, and apartments for fractionated courses.",
    languages: "English, Thai, Japanese, Arabic",
    icu: "Tertiary ICU · on-campus hotel",
  },
  {
    slug: "marina-private",
    name: "Marina Private Hospital",
    city: "Dubai",
    country: "United Arab Emirates",
    accreditation: "JCI · DHA",
    focus: "Brachytherapy and image-guided EBRT",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Western protocols, private floors, and hotel-connected wards. Preferred for Gulf families who need HDR lists that already run weekly.",
    languages: "English, Arabic, Hindi, French",
    icu: "24/7 oncology ICU",
  },
  {
    slug: "orchard-precision",
    name: "Orchard Precision Centre",
    city: "Singapore",
    country: "Singapore",
    accreditation: "JCI · MOH",
    focus: "Tumor board, IORT, TBI",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    summary:
      "When the brief is certainty: tumor boards, plan re-reads, and radiation at a campus that already treats international patients at volume.",
    languages: "English, Mandarin, Malay",
    icu: "Tertiary ICU · oncology isolation",
  },
  {
    slug: "polanco-surgical",
    name: "Polanco Surgical Institute",
    city: "Mexico City",
    country: "Mexico",
    accreditation: "JCI · CSG",
    focus: "IMRT, IGRT, SBRT",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
    summary:
      "US-trained radiation oncologists three hours from Texas. Family rooms and time-zone overlap for fractionated stays.",
    languages: "English, Spanish",
    icu: "Surgical ICU · companion rooms",
  },
  {
    slug: "aerocity-international",
    name: "Aerocity International Hospital",
    city: "Delhi NCR",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Radiation oncology, international ward",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A private Delhi NCR campus beside the airport corridor — linacs, HDR, and an international desk that meets night landings.",
    languages: "English, Hindi, Punjabi, Arabic",
    icu: "Oncology ICU",
  },
  {
    slug: "gurgaon-joint-institute",
    name: "Gurgaon Radiation Institute",
    city: "Delhi NCR",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Brachytherapy and stereotactic",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Gurugram HDR and stereotactic programmes with companion apartments for US and Gulf families on multi-week courses.",
    languages: "English, Hindi",
    icu: "Oncology ICU",
  },
  {
    slug: "bandra-private",
    name: "Bandra Private Hospital",
    city: "Mumbai",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "IORT, plaque, interstitial brachytherapy",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A sea-facing private floor in Bandra West: theatre-adjacent IORT and a brachytherapy list used to international second opinions.",
    languages: "English, Hindi, Marathi",
    icu: "Oncology ICU",
  },
  {
    slug: "whitefield-precision",
    name: "Whitefield Precision Centre",
    city: "Bengaluru",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "EBRT, IMRT, tumor board",
    image:
      "https://images.unsplash.com/photo-1538108142413-76d1c2d5d0c2?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Bengaluru’s east-side campus for tumor boards and linac programmes, with English-first coordinators for patients flying from the Gulf and Africa.",
    languages: "English, Kannada, Hindi, Tamil",
    icu: "Tertiary ICU",
  },
  {
    slug: "adyar-cardiac",
    name: "Adyar Oncology Campus",
    city: "Chennai",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "IMRT, IGRT, SRS",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Chennai’s high-volume radiation house: IMRT and SRS with published physics QA, not a three-day package.",
    languages: "English, Tamil, Hindi",
    icu: "24/7 oncology ICU",
  },
  {
    slug: "hitec-surgical",
    name: "HITEC Radiation Institute",
    city: "Hyderabad",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "SRS, SBRT, CyberKnife",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Hyderabad’s HITEC City private institute — stereotactic programmes with a remote follow-up protocol after the last fraction.",
    languages: "English, Telugu, Hindi",
    icu: "Oncology ICU",
  },
];

export const hospitals: Hospital[] = seeds.map((seed) => {
  const city = getCity(seed.city);
  const country = getCountry(seed.country);
  if (!city || !country) {
    throw new Error(`Hospital ${seed.slug} uses unknown city/country`);
  }
  if (city.countrySlug !== country.slug) {
    throw new Error(`Hospital ${seed.slug}: ${city.name} is not in ${country.name}`);
  }
  return {
    ...seed,
    city: city.name,
    citySlug: city.slug,
    country: country.name,
    countrySlug: country.slug,
  };
});

export function getHospital(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}
