import { costPath } from "@/lib/catalog-links";
import {
  catalogDestinations,
  catalogProceduresFor,
  catalogSpecialties,
  citiesForDestination,
  type CatalogQuery,
} from "@/lib/catalog-options";
import type { AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";

/** Drop a facet that the current destination or specialty does not allow. */
export function sanitizeCatalogQuery(query: CatalogQuery): CatalogQuery {
  const next: CatalogQuery = {};
  if (query.destination && catalogDestinations.includes(query.destination)) {
    next.destination = query.destination;
  }
  if (query.city && citiesForDestination(next.destination).includes(query.city)) {
    next.city = query.city;
  }
  if (query.specialty && catalogSpecialties.includes(query.specialty)) {
    next.specialty = query.specialty;
  }
  if (query.procedure && catalogProceduresFor(next.specialty).includes(query.procedure)) {
    next.procedure = query.procedure;
  }
  return next;
}

/**
 * The same path the client filter navigates to. A cost page with a procedure
 * and no city keeps the cost-sheet address.
 */
export function catalogFilterTarget(base: CatalogBasePath, query: CatalogQuery) {
  const next = sanitizeCatalogQuery(query);
  if (base === "/costs" && next.procedure && !next.city) return costPath(next.procedure);
  return prettyCatalogPath(base, next);
}

export function nextCatalogQuery(
  current: CatalogQuery,
  key: keyof CatalogQuery,
  value: string | undefined,
): CatalogQuery {
  const next: CatalogQuery = {
    destination: current.destination,
    city: current.city,
    specialty: current.specialty,
    procedure: current.procedure,
  };
  if (!value) delete next[key];
  else next[key] = value;
  if (key === "destination") delete next.city;
  if (key === "specialty") {
    const allowed = catalogProceduresFor(next.specialty);
    if (next.procedure && !allowed.includes(next.procedure)) delete next.procedure;
  }
  return sanitizeCatalogQuery(next);
}

export function catalogChoiceHref(
  base: CatalogBasePath,
  current: CatalogQuery,
  key: keyof CatalogQuery,
  value: string | undefined,
  locale: AppLocale,
) {
  return localePath(catalogFilterTarget(base, nextCatalogQuery(current, key, value)), locale);
}
