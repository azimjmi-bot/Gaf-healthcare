import "server-only";
import { listPublishedPosts } from "@/lib/blogs";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import { parentCatalogQuery } from "@/lib/catalog-options";
import {
  doctorsForHospitalLocale,
  doctorsForLocale,
  getDoctorForLocale,
  getHospitalForLocale,
  hospitalsForLocale,
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
import { stripLocalePrefix } from "@/lib/i18n/path";

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

/** Thin or unapproved facets render, empty ones do not exist. */
function facetState(matchCount: number, published: boolean): LocalePageState {
  if (matchCount === 0) return "missing";
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
      return facetState(matches, facetIsPublished("doctorFacet", matches, parentMatches));
    }
    return segments.length === 2 && getDoctorForLocale(segments[1], locale)
      ? "published"
      : "missing";
  }

  if (segments[0] === "hospitals") {
    const rows = hospitalsForLocale(locale);
    if (segments.length === 1) return rows.length > 0 ? "published" : "missing";
    const query = parsePrettyCatalogSegments(segments.slice(1));
    if (query) {
      const matches = filterHospitals(query, rows).length;
      const parent = parentCatalogQuery(query);
      const parentMatches = parent ? filterHospitals(parent, rows).length : undefined;
      return facetState(matches, facetIsPublished("hospitalFacet", matches, parentMatches));
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

  if (segments[0] === "blogs") {
    const posts = listPublishedPosts(locale);
    if (segments.length === 1) return posts.length > 0 ? "published" : "missing";
    return segments.length === 2 && posts.some((post) => post.slug === segments[1])
      ? "published"
      : "missing";
  }

  // Cost guides and specialty editorials remain unpublished until their
  // locale-specific CMS records exist and have dedicated renderers.
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

  if (locale === SOURCE_LOCALE) return "published";

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
  return localePageState(locale, path) === "published";
}

/** True for anything that should render rather than 404. */
export function localePageIsRenderable(locale: AppLocale, path: string) {
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
  return LOCALES.filter(
    (locale) =>
      localePathIsPublished(locale, path) && canonicalFacetPath(path, locale) === path,
  );
}
