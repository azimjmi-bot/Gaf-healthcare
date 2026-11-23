import "server-only";
import { listPublishedPosts } from "@/lib/blogs";
import { filterDoctors, filterTreatments, hospitalsForServiceLinePublication } from "@/lib/catalog";
import { citiesForDestination, parentCatalogQuery, type CatalogQuery } from "@/lib/catalog-options";
import {
  doctorsForHospitalLocale,
  doctorsForLocale,
  getHospitalForLocale,
  hospitalsForLocale,
  treatmentsForLocale,
} from "@/lib/locale-catalog";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import {
  getPublishedCuratedTreatment,
  publishedCuratedTreatments,
} from "@/lib/cms/curated-treatment-store";
import {
  LOCALES,
  SOURCE_LOCALE,
  isTargetLocale,
  type AppLocale,
} from "@/lib/i18n/languages";
import { facetIsPublished, localeIsPublished } from "@/lib/i18n/locale-gating";
// A cycle on purpose: canonicalFacetPath needs to know what is published, and
// the hreflang set needs to know what canonicalises away. Both are function
// declarations used at call time, so neither sees a half-initialised module.
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { arPathIsIndexedPublished, hasArPublicationIndex } from "@/lib/i18n/ar-publication-index";
import { stripLocalePrefix } from "@/lib/i18n/path";
import { contentStorage } from "@/lib/storage";

/**
 * When the packed AR publication index is loaded and the Arabic edition is
 * not hydrated, English surfaces (language switcher, hreflang, renderability
 * probes) must answer from the index. Reading `content/ar/catalog-cms.json`
 * in that state throws StorageHydrationError (PR #49 production incident).
 *
 * Backends without group tracking (fs/memory) prefer the index whenever it is
 * installed so unit tests stay coherent with the Worker skip-hydrate path.
 * When the R2 backend has already hydrated `ar` (Arabic routes), live gates
 * win so non-canonical published facets remain accurate.
 */
export function useArPublicationIndexForMetadata(): boolean {
  if (!hasArPublicationIndex()) return false;
  const storage = contentStorage() as { isHydrated?: (group: string) => boolean };
  if (typeof storage.isHydrated !== "function") return true;
  return !storage.isHydrated("ar");
}

/**
 * Three outcomes, not two.
 *
 * - "published": indexable, listed in the sitemap, offered in hreflang.
 * - "noindex":   renders, crawlable, but noindex,follow and absent from the
 *                sitemap and every hreflang block. For Arabic pages that are
 *                genuinely Arabic but not yet approved for search, and for
 *                locales that are not live. Crawlable on purpose: a robots.txt
 *                block would stop the noindex from ever being read.
 * - "missing":   404. Nothing to show, or the translation is still draft or
 *                awaiting review.
 */
export type LocalePageState = "published" | "noindex" | "missing";

function segmentsFor(path: string) {
  return stripLocalePrefix(path).pathname.split("/").filter(Boolean);
}

/**
 * True when a catalogue query names a supported destination city that currently
 * has zero matching rows. Those URLs stay selectable in directory filters and
 * render an empty state, but must not be indexable until genuine inventory
 * exists — in every locale, including English.
 */
export function isEmptySupportedCityFacet(query: CatalogQuery | undefined, matchCount: number) {
  if (matchCount > 0 || !query?.city || !query.destination) return false;
  return citiesForDestination(query.destination).includes(query.city);
}

function catalogFacetMatchCount(
  root: string,
  query: CatalogQuery,
  locale: AppLocale,
): number | undefined {
  if (root === "doctors") return filterDoctors(query, doctorsForLocale(locale)).length;
  if (root === "hospitals") {
    return hospitalsForServiceLinePublication(
      query,
      hospitalsForLocale(locale),
      Boolean(query.specialty || query.procedure),
    ).length;
  }
  if (root === "costs") return filterTreatments(query, treatmentsForLocale(locale)).length;
  return undefined;
}

/**
 * English hospital specialty/procedure facets historically published whenever
 * any campus matched. Faculty-affiliated specialty lists must not alone create
 * indexable hospital landing pages — mirror the Arabic service-line gate for
 * those queries while leaving city/country hubs on full inventory.
 */
function sourceLocaleHospitalServiceLineFacetState(
  segments: string[],
): LocalePageState | undefined {
  if (segments[0] !== "hospitals" || segments.length < 2) return undefined;
  const query = parsePrettyCatalogSegments(segments.slice(1));
  if (!query || (!query.specialty && !query.procedure)) return undefined;
  const matches = hospitalsForServiceLinePublication(
    query,
    hospitalsForLocale(SOURCE_LOCALE),
    true,
  ).length;
  if (matches > 0) return undefined;
  // Faculty-only specialty/procedure inventory stays crawlable but noindex.
  return "noindex";
}

/**
 * Empty supported-city catalogue facets for the source locale. Returns
 * `noindex` when the facet is an empty supported city filter, otherwise
 * `undefined` so the historical English "everything publishes" rule applies.
 */
function sourceLocaleEmptyCityFacetState(segments: string[]): LocalePageState | undefined {
  const root = segments[0];
  if (root !== "doctors" && root !== "hospitals" && root !== "costs") return undefined;
  if (root === "doctors" && segments[1] === "compare") return undefined;
  if (segments.length < 2) return undefined;
  const query = parsePrettyCatalogSegments(segments.slice(1));
  if (!query) return undefined;
  const matches = catalogFacetMatchCount(root, query, SOURCE_LOCALE);
  if (matches === undefined) return undefined;
  return isEmptySupportedCityFacet(query, matches) ? "noindex" : undefined;
}

/**
 * Thin or unapproved facets render as noindex. Empty facets 404, except for
 * supported destination-city filters: zero-inventory catalogue cities (e.g.
 * Pune) must stay selectable in directory UI and render an empty state without
 * becoming sitemap/facet/indexable landing pages.
 */
function facetState(
  matchCount: number,
  published: boolean,
  query?: CatalogQuery,
): LocalePageState {
  if (matchCount === 0) {
    if (isEmptySupportedCityFacet(query, matchCount)) return "noindex";
    return "missing";
  }
  return published ? "published" : "noindex";
}

function treatmentsIndexState(locale: AppLocale): LocalePageState {
  // The English index is a real directory page and stays live regardless.
  if (locale === SOURCE_LOCALE) return "published";
  return publishedCuratedTreatments(locale).length > 0 ? "published" : "missing";
}

function targetLocaleState(locale: AppLocale, segments: string[]): LocalePageState {
  if (segments.length === 0) return "published";
  if (segments[0] === "consult") return "missing";

  if (segments[0] === "doctors") {
    if (segments[1] === "compare") return "missing";
    const rows = doctorsForLocale(locale);
    if (segments.length === 1) return rows.length > 0 ? "published" : "missing";
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (query) {
      const matches = filterDoctors(query, rows).length;
      const parent = parentCatalogQuery(query);
      const parentMatches = parent ? filterDoctors(parent, rows).length : undefined;
      return facetState(matches, facetIsPublished("doctorFacet", matches, parentMatches), query);
    }
    // Membership in the published index, not a full-profile load. A sitemap
    // or hreflang check must not inflate every biography.
    return segments.length === 2 && rows.some((doctor) => doctor.slug === segments[1])
      ? "published"
      : "missing";
  }

  if (segments[0] === "hospitals") {
    const rows = hospitalsForLocale(locale);
    if (segments.length === 1) return rows.length > 0 ? "published" : "missing";
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (query) {
      // Specialty/procedure indexation counts campus-verified service lines only.
      // Faculty-affiliated Sahyadri lists still render on profiles and can appear
      // in directory filters, but they must not dilute parent-overlap gates or
      // invent indexable hospital specialty landings on their own.
      const serviceLineScoped = Boolean(query.specialty || query.procedure);
      const matches = hospitalsForServiceLinePublication(query, rows, serviceLineScoped).length;
      const parent = parentCatalogQuery(query);
      const parentMatches = parent
        ? hospitalsForServiceLinePublication(parent, rows, serviceLineScoped).length
        : undefined;
      return facetState(matches, facetIsPublished("hospitalFacet", matches, parentMatches), query);
    }
    const hospital = getHospitalForLocale(segments[1], locale);
    if (!hospital) return "missing";
    if (segments.length === 2) return "published";
    // The faculty list is part of the profile, not a pSEO facet: it is one
    // hospital's own translated doctors, so it rides on the profile's status.
    if (segments.length === 3 && segments[2] === "doctors") {
      return doctorsForHospitalLocale(hospital.slug, locale).length > 0
        ? "published"
        : "missing";
    }
    // Procedure editorial and cost content have no target-locale store yet.
    return "missing";
  }

  if (segments[0] === "costs") {
    const rows = treatmentsForLocale(locale);
    if (segments.length === 1) return rows.length > 0 ? "published" : "missing";
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (!query) return "missing";
    const matches = filterTreatments(query, rows).length;
    const parent = parentCatalogQuery(query);
    const parentMatches = parent ? filterTreatments(parent, rows).length : undefined;
    // City-procedure combinations are routable for filtering, but the shared
    // national price band is not city-specific evidence. Keep those pages
    // noindex until an authored city quote or editorial exists; country, city,
    // specialty and national procedure facets remain indexable.
    const hasUnreviewedCityPrice = Boolean(query.city && query.procedure);
    return facetState(
      matches,
      !hasUnreviewedCityPrice &&
        facetIsPublished("costFacet", matches, parentMatches),
      query,
    );
  }

  if (segments[0] === "blogs") {
    const posts = listPublishedPosts(locale);
    if (segments.length === 1) return posts.length > 0 ? "published" : "missing";
    return segments.length === 2 && posts.some((post) => post.slug === segments[1])
      ? "published"
      : "missing";
  }

  // Specialty editorials remain unpublished until their locale-specific CMS
  // records exist and have dedicated renderers.
  return "missing";
}

export function localePageState(locale: AppLocale, path: string): LocalePageState {
  const segments = segmentsFor(path);

  if (segments[0] === "treatments") {
    if (segments.length === 1) return treatmentsIndexState(locale);
    return segments.length === 2 && getPublishedCuratedTreatment(segments[1], locale)
      ? "published"
      : "missing";
  }

  if (locale === SOURCE_LOCALE) {
    // English historically publishes every renderable path. Empty supported
    // city facets are the exception: keep them crawlable for filter UX, but
    // noindex until inventory exists so chip links do not create thin indexed
    // landing pages. Populated city facets (including a future populated
    // Pune) continue to publish. Hospital specialty/procedure facets with only
    // faculty-affiliated evidence are held at noindex (see helper above).
    return (
      sourceLocaleEmptyCityFacetState(segments) ??
      sourceLocaleHospitalServiceLineFacetState(segments) ??
      "published"
    );
  }

  const state = targetLocaleState(locale, segments);
  // An unlive locale can still render what it has, but nothing it serves is
  // allowed to be indexed or advertised.
  if (isTargetLocale(locale) && !localeIsPublished(locale)) {
    return state === "published" ? "noindex" : state;
  }
  return state;
}

/** True only for pages that may be indexed, listed and linked in hreflang. */
export function localePathIsPublished(locale: AppLocale, path: string) {
  // English catalogue Workers skip AR hydrate when the index is present.
  // Publication probes on that surface (especially the language switcher in
  // `layout.tsx` / `site-header.tsx`) must not touch the Arabic catalog.
  if (locale === "ar" && useArPublicationIndexForMetadata()) {
    return arPathIsIndexedPublished(path);
  }
  return localePageState(locale, path) === "published";
}

/** True for anything that should render rather than 404. */
export function localePageIsRenderable(locale: AppLocale, path: string) {
  if (locale === "ar" && useArPublicationIndexForMetadata()) {
    // Without AR hydrate we cannot distinguish noindex from missing. The
    // index only lists published self-canonical paths; treat those as the
    // only AR URLs the English surface may treat as renderable equivalents.
    // Arabic routes hydrate AR and never take this branch.
    return arPathIsIndexedPublished(path);
  }
  return localePageState(locale, path) !== "missing";
}

/**
 * The locales whose version of this path is the indexable address for itself,
 * which is what an hreflang block is allowed to claim.
 *
 * Being published is necessary but not sufficient. A locale can publish a
 * facet and still have that facet name its parent as canonical — a doctor
 * facet returning exactly the country roster does — and such a page emits no
 * hreflang of its own. Advertising it from English would be a one-way claim,
 * and Google discards hreflang that is not reciprocated, taking the rest of
 * the block's credibility with it.
 */
export function publishedLocalesForPath(path: string) {
  // Unpublished target locales can never be "published", and probing them
  // would force the Worker to hydrate editions that hreflang will discard.
  return LOCALES.filter((locale) => {
    if (isTargetLocale(locale) && !localeIsPublished(locale)) return false;
    // When the index is loaded and AR is not hydrated, hreflang membership
    // comes from the index (published ∩ self-canonical). When AR is hydrated
    // (Arabic routes), use live gates so non-canonical published facets stay
    // accurate.
    if (locale === "ar" && useArPublicationIndexForMetadata()) {
      return arPathIsIndexedPublished(path);
    }
    return localePathIsPublished(locale, path) && canonicalFacetPath(path, locale) === path;
  });
}
