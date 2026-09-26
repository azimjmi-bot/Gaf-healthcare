import {
  CITIES,
  COUNTRIES,
  PROCEDURES,
  SPECIALTIES,
  citiesInCountry,
  proceduresForSpecialty,
} from "@/lib/taxonomy";

export type CatalogEntity = "doctors" | "hospitals" | "treatments";

export type CatalogQuery = {
  destination?: string;
  city?: string;
  specialty?: string;
  procedure?: string;
};

export type CityChipStats = {
  total: number;
  counts: Record<string, number>;
};

/**
 * The facet one level up: the same query with its most specific filter dropped,
 * in the order the URL nests them. Returns null for the country root, which has
 * no parent facet.
 *
 * Used by the Arabic overlap gate to ask whether a facet narrows its parent's
 * result set enough to deserve its own indexed page.
 */
export function parentCatalogQuery(query: CatalogQuery): CatalogQuery | null {
  if (query.procedure) return { ...query, procedure: undefined };
  if (query.specialty) return { ...query, specialty: undefined };
  if (query.city) return { ...query, city: undefined };
  return null;
}

export function parseCatalogQuery(
  params: Record<string, string | string[] | undefined>,
): CatalogQuery {
  const one = (k: keyof CatalogQuery) => {
    const v = params[k];
    const s = Array.isArray(v) ? v[0] : v;
    return s && s !== "all" ? s : undefined;
  };
  return {
    destination: one("destination"),
    city: one("city"),
    specialty: one("specialty"),
    procedure: one("procedure"),
  };
}

export const catalogDestinations = COUNTRIES.map((row) => row.name);

export const catalogCities = CITIES.map((row) => row.name);

export const catalogSpecialties = SPECIALTIES.map((s) => s.name);

export const catalogProcedures = PROCEDURES.map((p) => p.name);

export function catalogProceduresFor(specialty?: string) {
  if (!specialty) return catalogProcedures;
  const rows = proceduresForSpecialty(specialty);
  return rows.length ? rows.map((p) => p.name) : catalogProcedures;
}

export function citiesForDestination(destination?: string) {
  if (!destination) return catalogCities;
  return citiesInCountry(destination).map((c) => c.name);
}
