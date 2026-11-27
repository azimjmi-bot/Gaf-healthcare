import "server-only";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import { parentCatalogQuery, type CatalogQuery } from "@/lib/catalog-options";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { parsePrettyCatalogSegments, prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { stripLocalePrefix } from "@/lib/i18n/path";

/**
 * A facet that returns exactly its parent's records is not a page; it is a
 * second address for one.
 *
 * /doctors/India/Radiation-Oncology and /doctors/India return the same 70
 * Arabic profiles, in the same order, with the same cards. Serving both as
 * self-canonical asks Google to choose between them, and Google's answer to
 * that question is to pick one and discount the other — usually not the one we
 * would have chosen. Naming the parent instead makes the choice ourselves and
 * consolidates whatever authority the duplicate earns.
 *
 * This is deliberately narrower than the 90% overlap gate in locale-gating.ts.
 * That gate decides whether a page is worth publishing at all, and 90% is a
 * judgement about editorial value. This is an identity claim: the two URLs
 * render the same thing, so only exact equality justifies it.
 *
 * Both Arabic and English procedure-level duplicate facets whose entity set
 * equals their parent's canonicalise to that parent so redundant filter URLs
 * consolidate rather than competing. In English, city+specialty hospital hubs
 * (`!query.procedure`) are preserved as self-canonical because they render a
 * dedicated `HospitalSpecialtyHub` (~85% distinct content vs city directory).
 */

type CatalogEntity = "doctors" | "hospitals";

function facetOf(path: string): { entity: CatalogEntity; query: CatalogQuery } | null {
  const segments = stripLocalePrefix(path).pathname.split("/").filter(Boolean);
  if (segments[0] !== "doctors" && segments[0] !== "hospitals") return null;
  const query = parsePrettyCatalogSegments(segments.slice(1));
  // A profile slug is not a facet, and neither is a bare directory.
  if (!query || !query.destination) return null;
  return { entity: segments[0], query };
}

/** The slugs a facet resolves to in one locale's catalog. */
function resultSlugs(entity: CatalogEntity, query: CatalogQuery, locale: AppLocale) {
  const rows =
    entity === "doctors"
      ? filterDoctors(query, doctorsForLocale(locale))
      : filterHospitals(query, hospitalsForLocale(locale));
  return new Set(rows.map((row) => row.slug));
}

function sameSlugs(a: Set<string>, b: Set<string>) {
  return a.size === b.size && [...a].every((slug) => b.has(slug));
}

/**
 * The path a facet should name as canonical: its nearest published ancestor
 * that returns a different result set, or itself when there is none.
 *
 * Walks the chain rather than stopping at the first parent, so a facet three
 * levels below the page it duplicates points straight at it. Google follows a
 * canonical chain but discounts it, and each step up here is provably the same
 * set of records, so there is nothing to lose by skipping the intermediate.
 *
 * For English hospital facets, non-procedure city+specialty hubs are preserved
 * (`!query.procedure`), and procedure-level duplicates stop at their specialty
 * hub parent rather than collapsing into a generic city/country hospital list.
 *
 * Returns `path` unchanged for pages that are not facets and for facets that
 * are not published — a noindex page is making no indexing claim, so it has no
 * canonical decision to get wrong yet.
 */
export function canonicalFacetPath(path: string, locale: AppLocale): string {
  if (!localePathIsPublished(locale, path)) return path;

  const facet = facetOf(path);
  if (!facet) return path;

  const { entity } = facet;
  let query = facet.query;
  if (locale === SOURCE_LOCALE && entity === "hospitals" && !query.procedure) {
    return path;
  }

  let own = resultSlugs(entity, query, locale);
  // An empty facet does not render at all, so it cannot be a duplicate.
  if (own.size === 0) return path;

  // Each step drops one filter, so the walk is finite without a guard.
  for (let parent = parentCatalogQuery(query); parent; parent = parentCatalogQuery(query)) {
    const parentPath = prettyCatalogPath(`/${entity}`, parent);
    // Never point at a page this locale does not publish: a canonical aimed at
    // a noindex or missing URL is worse than a self-canonical duplicate.
    if (!localePathIsPublished(locale, parentPath)) break;
    const parentSlugs = resultSlugs(entity, parent, locale);
    if (!sameSlugs(own, parentSlugs)) break;
    query = parent;
    own = parentSlugs;
    if (locale === SOURCE_LOCALE && entity === "hospitals" && !query.procedure) {
      break;
    }
  }

  const resolved = prettyCatalogPath(`/${entity}`, query);
  return resolved === path ? path : resolved;
}
