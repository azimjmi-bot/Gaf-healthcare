import { TARGET_LOCALES, type TargetLocale } from "@/lib/i18n/languages";

/**
 * Which locales are live. A locale that is false still resolves and renders, so
 * a stray link does not 404, but it is noindex, absent from every sitemap, and
 * absent from every hreflang block including English's.
 *
 * ru, fr and sw have 85 of 278 UI strings and no entity content, so their home
 * pages render about 1,400 characters of mostly empty sections. They stay off
 * until they have real content.
 */
export const LOCALE_PUBLISHED: Record<TargetLocale, boolean> = {
  ar: true,
  ru: false,
  fr: false,
  sw: false,
};

export function localeIsPublished(locale: TargetLocale) {
  return LOCALE_PUBLISHED[locale] ?? false;
}

export const UNPUBLISHED_LOCALES = TARGET_LOCALES.filter((locale) => !localeIsPublished(locale));

/**
 * pSEO page types whose Arabic copy comes from a template rather than from
 * hand-authored per-entity text. Each one stays false until its Arabic template
 * has been designed and approved in Phase 3. Until then the pages render in
 * Arabic but carry noindex, because template output nobody has read is not
 * something to put in an index.
 */
export type PseoPageType = "doctorFacet" | "hospitalFacet" | "costFacet" | "specialtyHub";

export const ARABIC_TEMPLATE_APPROVED: Record<PseoPageType, boolean> = {
  doctorFacet: false,
  hospitalFacet: false,
  costFacet: false,
  specialtyHub: false,
};

export function arabicTemplateApproved(pageType: PseoPageType) {
  return ARABIC_TEMPLATE_APPROVED[pageType] ?? false;
}

/**
 * A facet needs this many matching translated profiles before it is worth
 * indexing. Below it the page is thin: a heading and one or two cards.
 *
 * On current data no doctor facet sits below 3, so this threshold only bites on
 * the hospital side, where 12 facets have one Arabic record and 8 have two.
 */
export const FACET_MIN_ARABIC_PROFILES = 3;

/** A facet is published only when its template is approved and it is not thin. */
export function facetIsPublished(pageType: PseoPageType, matchCount: number) {
  return arabicTemplateApproved(pageType) && matchCount >= FACET_MIN_ARABIC_PROFILES;
}
