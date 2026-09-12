import { TARGET_LOCALES } from "@/lib/i18n/languages";
import type { CatalogQuery } from "@/lib/catalog-options";
import {
  CITIES,
  COUNTRIES,
  PROCEDURES,
  SPECIALTIES,
  citiesInCountry,
  getCountry,
  toSlug,
} from "@/lib/taxonomy";

export type CatalogBasePath = "/costs" | "/doctors" | "/hospitals";

/** Display name → address-bar segment: "Surgical Oncology" → "Surgical-Oncology". */
export function toPrettySegment(name: string) {
  return name.trim().replace(/\/+/g, "-").replace(/\s+/g, "-");
}

function matchBySlug<T extends { name: string; slug: string }>(segment: string, rows: readonly T[]) {
  const slug = toSlug(segment);
  return rows.find((row) => row.slug === slug || toSlug(row.name) === slug);
}

export function matchCountryName(segment: string) {
  const row = getCountry(segment) ?? matchBySlug(segment, COUNTRIES);
  return row?.name;
}

function matchCityName(segment: string, destination?: string) {
  const pool = destination ? citiesInCountry(destination) : CITIES;
  return matchBySlug(segment, pool)?.name;
}

function matchSpecialtyName(segment: string) {
  return matchBySlug(segment, SPECIALTIES)?.name;
}

function matchProcedureName(segment: string) {
  return matchBySlug(segment, PROCEDURES)?.name;
}

export function isCountrySegment(segment: string) {
  return Boolean(matchCountryName(segment));
}

function isReservedPseoPath(segments: string[]) {
  return segments.length > 0 && segments.every((segment) => segment === toSlug(segment));
}

/**
 * Parse /India/Delhi-NCR/Surgical-Oncology/Mastectomy-style segments.
 * Order is always destination, then optional city, specialty, procedure.
 * Returns null when the first segment is not a country (procedure/doctor/hospital slugs)
 * or when the path is a reserved lowercase pSEO slug tuple.
 */
export function parsePrettyCatalogSegments(segments: string[]): CatalogQuery | null {
  if (segments.length === 0) return {};
  if (isReservedPseoPath(segments)) return null;
  const destination = matchCountryName(segments[0]);
  if (!destination) return null;

  const query: CatalogQuery = { destination };
  let index = 1;

  if (index < segments.length) {
    const city = matchCityName(segments[index], destination);
    if (city) {
      query.city = city;
      index += 1;
    }
  }
  if (index < segments.length) {
    const specialty = matchSpecialtyName(segments[index]);
    if (specialty) {
      query.specialty = specialty;
      index += 1;
    }
  }
  if (index < segments.length) {
    const procedure = matchProcedureName(segments[index]);
    if (procedure) {
      query.procedure = procedure;
      index += 1;
    }
  }

  if (index !== segments.length) return null;
  return query;
}

export function prettyCatalogPath(base: CatalogBasePath, query: CatalogQuery) {
  if (!query.destination) {
    const q = new URLSearchParams();
    if (query.city) q.set("city", query.city);
    if (query.specialty) q.set("specialty", query.specialty);
    if (query.procedure) q.set("procedure", query.procedure);
    const qs = q.toString();
    return qs ? `${base}?${qs}` : base;
  }

  const parts = [base, toPrettySegment(query.destination)];
  if (query.city) parts.push(toPrettySegment(query.city));
  if (query.specialty) parts.push(toPrettySegment(query.specialty));
  if (query.procedure) parts.push(toPrettySegment(query.procedure));
  return parts.join("/");
}

export function parsePrettyCatalogPathname(pathname: string): CatalogQuery | null {
  const parts = pathname.split("/").filter(Boolean);
  const offset = parts[0] && (TARGET_LOCALES as readonly string[]).includes(parts[0]) ? 1 : 0;
  const root = parts[offset];
  if (root !== "costs" && root !== "doctors" && root !== "hospitals") return null;
  if (parts.length === offset + 1) return {};
  return parsePrettyCatalogSegments(parts.slice(offset + 1));
}

export function catalogQueryFromSearchParams(params: URLSearchParams | { get(name: string): string | null }): CatalogQuery {
  const read = (key: string) => {
    const value = params.get(key);
    return value && value !== "all" ? value : undefined;
  };
  return {
    destination: read("destination"),
    city: read("city"),
    specialty: read("specialty"),
    procedure: read("procedure"),
  };
}

export function catalogQueryToSearchString(query: CatalogQuery) {
  const params = new URLSearchParams();
  if (query.destination) params.set("destination", query.destination);
  if (query.city) params.set("city", query.city);
  if (query.specialty) params.set("specialty", query.specialty);
  if (query.procedure) params.set("procedure", query.procedure);
  return params.toString();
}

export function hasCatalogFacets(query: CatalogQuery) {
  return Boolean(query.destination || query.city || query.specialty || query.procedure);
}
