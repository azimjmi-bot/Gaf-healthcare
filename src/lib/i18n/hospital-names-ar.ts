/**
 * Arabic display names for partner hospitals.
 *
 * The English string stays the catalog identity: it is the JSON-LD alternateName,
 * a meta keyword, and the Google Maps query. Slugs, cities and specialty keys
 * are not in this file. URLs keep the English slug.
 */
import names from "@/data/hospital-names-ar.json";

type NameRow = { en: string; ar: string };

const rows = names as Record<string, NameRow>;

export const HOSPITAL_NAMES_EN: Record<string, string> = Object.fromEntries(
  Object.entries(rows).map(([slug, row]) => [slug, row.en]),
);

export const HOSPITAL_NAMES_AR: Record<string, string> = Object.fromEntries(
  Object.entries(rows).map(([slug, row]) => [slug, row.ar]),
);

export function englishHospitalName(slug: string) {
  return HOSPITAL_NAMES_EN[slug];
}

export function arabicHospitalName(slug: string) {
  return HOSPITAL_NAMES_AR[slug];
}
