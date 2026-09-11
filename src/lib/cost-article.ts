import "server-only";
import type { CityEditorial, CostArticle, DestinationRow } from "@/data/cost-articles/types";
import { doctorsPath, hospitalsPath, costsFilterPath } from "@/lib/catalog-links";
import { doctorsForTreatment, getHospital, getTreatment } from "@/lib/data";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { CITIES, COUNTRIES, toSlug } from "@/lib/taxonomy";
import type { Treatment } from "@/lib/treatments";

const DESTINATION_ALIASES: Record<string, string> = {
  turkey: "Türkiye",
  uae: "United Arab Emirates",
};

/** Link only destinations that already exist as catalog filters. */
export function destinationFilterHref(country: string, procedure: string) {
  const aliased = DESTINATION_ALIASES[country.toLowerCase()] ?? country;
  const match = COUNTRIES.find(
    (row) => row.name === aliased || row.name.toLowerCase() === country.toLowerCase(),
  );
  if (!match) return undefined;
  return hospitalsPath({ destination: match.name, procedure });
}

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

function midpoint(band: [number, number]) {
  return (band[0] + band[1]) / 2;
}

/** One comparable number per market, so the column reads consistently across rows. */
function ratioLabel(band: [number, number] | null, indiaBand: [number, number] | null) {
  if (!band || !indiaBand) return "Higher than India";
  const india = midpoint(indiaBand);
  if (india <= 0) return "Higher than India";
  const ratio = midpoint(band) / india;
  return `≈${ratio.toFixed(1).replace(/\.0$/, "")}× India`;
}

/**
 * Cost levels compress at the top of the market rather than scaling both ends, so
 * a modelled band is the India midpoint scaled by the market's cost level.
 */
function modelledBand(indiaBand: [number, number], level: [number, number]): [number, number] {
  const mid = midpoint(indiaBand);
  return [mid * level[0], mid * level[1]];
}

/**
 * Editorial copy is written with tokens so cost figures live only in the catalog.
 * Update a price in the cost sheet and the prose, tables and FAQs follow.
 */
export function costTokens(treatment: Treatment): Record<string, string> {
  return {
    "[PROCEDURE_NAME]": treatment.name,
    "[SPECIALTY]": treatment.category,
    "[COUNTRY]": "India",
    "[INDIA_COST]": treatment.partnerRange,
    "[US_COST]": treatment.usRange,
    "[STAY]": treatment.stay,
  };
}

function fillTokens(value: string, tokens: Record<string, string>) {
  let out = value;
  for (const [token, replacement] of Object.entries(tokens)) {
    if (out.includes(token)) out = out.split(token).join(replacement);
  }
  return out;
}

function fillDeep<T>(value: T, tokens: Record<string, string>): T {
  if (typeof value === "string") return fillTokens(value, tokens) as T;
  if (Array.isArray(value)) return value.map((item) => fillDeep(item, tokens)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = fillDeep(item, tokens);
    return out as T;
  }
  return value;
}

export function interpolateCostArticle(article: CostArticle, treatment: Treatment): CostArticle {
  return fillDeep(article, costTokens(treatment));
}

export type ApproachComparisonResolved = {
  heading: string;
  intro: string[];
  rows: {
    name: string;
    relative: string;
    detail: string;
    range?: string;
    href?: string;
    isCurrent: boolean;
  }[];
};

/**
 * Attach catalog planning ranges and cost-sheet links to editorial approach rows.
 * Rows without a matching treatment keep relative complexity only — never a made-up price.
 */
export function resolveApproachComparison(
  article: CostArticle,
  treatment: Treatment,
): ApproachComparisonResolved | undefined {
  const block = article.approachComparison;
  if (!block) return undefined;

  return {
    heading: block.heading || "Cost by surgical approach",
    intro: block.intro,
    rows: block.rows.map((row) => {
      const sheet = row.procedure ? getTreatment(toSlug(row.procedure)) : undefined;
      return {
        name: row.name,
        relative: row.relative,
        detail: row.detail,
        range: sheet?.partnerRange,
        href: sheet ? `/costs/${sheet.slug}` : undefined,
        isCurrent: Boolean(sheet && sheet.slug === treatment.slug),
      };
    }),
  };
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
  positioning: string;
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
    return {
      city: name,
      citySlug: city.citySlug,
      range: city.costRange ?? treatment.partnerRange,
      rangeIsInherited: !city.costRange,
      stay: city.stay ?? treatment.stay,
      costNote: city.costNote,
      ecosystem: city.ecosystem,
      logistics: city.logistics,
      costPath: costsFilterPath({
        destination: "India",
        city: name,
        specialty: treatment.category,
        procedure: treatment.name,
      }),
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
    const positioning = row.positioning || (isIndia ? "Catalog planning range" : "Private self-pay market");

    if (isIndia) {
      return {
        country: row.country,
        range: treatment.partnerRange,
        modelled: false,
        relative: "Baseline",
        stay: row.stay || treatment.stay,
        positioning,
        context: row.context,
        isIndia: true,
        href: destinationFilterHref("India", treatment.name),
      };
    }

    if (row.range || isUs) {
      const range = row.range ?? treatment.usRange;
      return {
        country: row.country,
        range,
        modelled: false,
        relative: ratioLabel(parseUsdBand(range), indiaBand),
        stay: row.stay,
        positioning,
        context: row.context,
        isIndia: false,
        href: destinationFilterHref(row.country, treatment.name),
      };
    }

    if (row.costLevel && indiaBand) {
      anyModelled = true;
      const band = modelledBand(indiaBand, row.costLevel);
      return {
        country: row.country,
        range: `${money(band[0])}–${money(band[1])}`,
        modelled: true,
        relative: ratioLabel(band, indiaBand),
        stay: row.stay,
        positioning,
        context: row.context,
        isIndia: false,
        href: destinationFilterHref(row.country, treatment.name),
      };
    }

    return {
      country: row.country,
      range: "Confirmation required",
      modelled: true,
      relative: "Higher than India",
      stay: row.stay,
      positioning,
      context: row.context,
      isIndia: false,
      href: destinationFilterHref(row.country, treatment.name),
    };
  });

  return { rows, anyModelled };
}

export function carePlace(city?: string) {
  return city ? `${city}, India` : "India";
}

export function cityEditorial(article: CostArticle, city?: string) {
  if (!city) return undefined;
  return article.cities.find((row) => cityName(row.citySlug) === city);
}

export function doctorsToConsiderHeading(brief: string, city?: string, template?: string) {
  if (city && template) {
    return template.replaceAll("[CITY]", city).replaceAll("[PROCEDURE]", brief);
  }
  return `Doctors to consider for ${brief} in ${carePlace(city)}`;
}

export function hospitalsToConsiderHeading(brief: string, city?: string, template?: string) {
  if (city && template) {
    return template.replaceAll("[CITY]", city).replaceAll("[PROCEDURE]", brief);
  }
  return `Hospitals to consider for ${brief} in ${carePlace(city)}`;
}

export function bestDoctorsHeading(procedure: string, city?: string) {
  return `Best doctors for ${procedure} in ${carePlace(city)}`;
}

export function bestHospitalsHeading(procedure: string, city?: string) {
  return `Best hospitals for ${procedure} in ${carePlace(city)}`;
}

export function doctorsPerformingHeading(brief: string, city?: string) {
  return `Doctors Performing ${brief} in ${carePlace(city)}`;
}

export function compareHospitalsHeading(brief: string, city?: string) {
  return `Compare Hospitals for ${brief} in ${carePlace(city)}`;
}

export function formatUsd(value: number) {
  return money(value);
}

/** Doctors listed for this procedure, city-diverse first so the section is not one campus deep. */
export function articleFaculty(treatmentSlug: string, city?: string, limit = 8) {
  const faculty = doctorsForTreatment(treatmentSlug).filter((doctor) =>
    city ? doctor.city === city : true,
  );
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

export function articleCampuses(treatment: Treatment, city?: string) {
  const facultyCampuses = new Set(
    doctorsForTreatment(treatment.slug)
      .filter((doctor) => (city ? doctor.city === city : true))
      .map((doctor) => doctor.hospitalSlug),
  );
  const requireProcedureTaggedFaculty =
    treatment.specialtySlug === "pediatric-cardiac-surgery";
  return treatment.hospitalSlugs
    .map((slug) => getHospital(slug))
    .filter((h): h is Hospital => {
      if (!h) return false;
      if (city && h.city !== city) return false;
      if (requireProcedureTaggedFaculty && !facultyCampuses.has(h.slug)) return false;
      return true;
    })
    .sort((a, b) => Number(facultyCampuses.has(b.slug)) - Number(facultyCampuses.has(a.slug)));
}
