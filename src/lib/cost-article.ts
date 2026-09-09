import "server-only";
import type { CityEditorial, CostArticle, DestinationRow } from "@/data/cost-articles/types";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { doctorsForTreatment, getHospital } from "@/lib/data";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { CITIES } from "@/lib/taxonomy";
import type { Treatment } from "@/lib/treatments";

const USD = /\$?([\d,]+)/g;

/** "$3,500–$8,000" -> [3500, 8000]. Returns null for open-ended or unparseable bands. */
export function parseUsdBand(range: string): [number, number] | null {
  const found = [...range.matchAll(USD)].map((m) => Number(m[1].replace(/,/g, "")));
  if (found.length === 0 || found.some((n) => !Number.isFinite(n))) return null;
  if (found.length === 1) return [found[0], found[0]];
  return [found[0], found[found.length - 1]];
}

function money(value: number) {
  const rounded = value >= 10000 ? Math.round(value / 500) * 500 : Math.round(value / 100) * 100;
  return `$${rounded.toLocaleString("en-US")}`;
}

function ratioLabel(low: number, high: number) {
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));
  if (Math.abs(low - high) < 0.15) return `≈${fmt(low)}× India`;
  return `≈${fmt(low)}–${fmt(high)}× India`;
}

export type CostCityRow = {
  city: string;
  citySlug: string;
  range: string;
  rangeIsInherited: boolean;
  stay: string;
  costNote: string;
  ecosystem: string;
  logistics: string;
  costPath: string;
  doctorsPath: string;
  hospitalsPath: string;
  doctorCount: number;
  hospitalCount: number;
};

export type CostDestinationRow = {
  country: string;
  range: string;
  modelled: boolean;
  relative: string;
  stay: string;
  context: string;
  isIndia: boolean;
  href?: string;
};

function cityName(slug: string) {
  return CITIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function costCityRows(
  article: CostArticle,
  treatment: Treatment,
  faculty: Doctor[],
  campuses: Hospital[],
): CostCityRow[] {
  return article.cities.map((city: CityEditorial) => {
    const name = cityName(city.citySlug);
    const params = { destination: "India", city: name, procedure: treatment.name };
    const q = new URLSearchParams({
      destination: "India",
      city: name,
      specialty: treatment.category,
      procedure: treatment.name,
    });
    return {
      city: name,
      citySlug: city.citySlug,
      range: city.costRange ?? treatment.partnerRange,
      rangeIsInherited: !city.costRange,
      stay: city.stay ?? treatment.stay,
      costNote: city.costNote,
      ecosystem: city.ecosystem,
      logistics: city.logistics,
      costPath: `/costs?${q.toString()}`,
      doctorsPath: doctorsPath(params),
      hospitalsPath: hospitalsPath(params),
      doctorCount: faculty.filter((d) => d.citySlug === city.citySlug).length,
      hospitalCount: campuses.filter((h) => h.citySlug === city.citySlug).length,
    };
  });
}

export function costDestinationRows(
  article: CostArticle,
  treatment: Treatment,
): { rows: CostDestinationRow[]; anyModelled: boolean } {
  const indiaBand = parseUsdBand(treatment.partnerRange);
  let anyModelled = false;

  const rows = article.destinations.map((row: DestinationRow): CostDestinationRow => {
    const isIndia = row.country === "India";
    const isUs = row.country === "United States";

    if (isIndia) {
      return {
        country: row.country,
        range: treatment.partnerRange,
        modelled: false,
        relative: "Baseline",
        stay: row.stay || treatment.stay,
        context: row.context,
        isIndia: true,
        href: hospitalsPath({ destination: "India", procedure: treatment.name }),
      };
    }

    if (row.range || isUs) {
      const range = row.range ?? treatment.usRange;
      const band = parseUsdBand(range);
      return {
        country: row.country,
        range,
        modelled: false,
        relative:
          band && indiaBand && indiaBand[0] > 0 && indiaBand[1] > 0
            ? ratioLabel(band[0] / indiaBand[0], band[1] / indiaBand[1])
            : "Higher than India",
        stay: row.stay,
        context: row.context,
        isIndia: false,
      };
    }

    if (row.multiplier && indiaBand) {
      anyModelled = true;
      return {
        country: row.country,
        range: `${money(indiaBand[0] * row.multiplier[0])}–${money(indiaBand[1] * row.multiplier[1])}`,
        modelled: true,
        relative: ratioLabel(row.multiplier[0], row.multiplier[1]),
        stay: row.stay,
        context: row.context,
        isIndia: false,
      };
    }

    return {
      country: row.country,
      range: "Confirmation required",
      modelled: true,
      relative: row.multiplier ? ratioLabel(row.multiplier[0], row.multiplier[1]) : "Higher than India",
      stay: row.stay,
      context: row.context,
      isIndia: false,
    };
  });

  return { rows, anyModelled };
}

/** Doctors listed for this procedure, city-diverse first so the section is not one campus deep. */
export function articleFaculty(treatmentSlug: string, limit = 8) {
  const faculty = doctorsForTreatment(treatmentSlug);
  const byCity = new Map<string, Doctor[]>();
  for (const doctor of faculty) {
    if (!byCity.has(doctor.citySlug)) byCity.set(doctor.citySlug, []);
    byCity.get(doctor.citySlug)!.push(doctor);
  }
  for (const list of byCity.values()) {
    list.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }

  const picked: Doctor[] = [];
  let round = 0;
  while (picked.length < limit) {
    let added = false;
    for (const list of byCity.values()) {
      const next = list[round];
      if (!next) continue;
      picked.push(next);
      added = true;
      if (picked.length === limit) break;
    }
    if (!added) break;
    round += 1;
  }

  return { all: faculty, featured: picked };
}

export function articleCampuses(treatment: Treatment) {
  return treatment.hospitalSlugs
    .map((slug) => getHospital(slug))
    .filter((h): h is Hospital => Boolean(h));
}
