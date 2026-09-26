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
  // Stage 1. The doctor hub template was reviewed as rendered text — h1, title,
  // meta and intro at the sizes the real catalog produces — before this opened.
  doctorFacet: true,
  // Stages 2 and 3, which are the same flag: the country and city facets, and
  // the deeper ones that survive the 0.9 overlap gate. Nothing else is needed
  // to separate the two stages, because the overlap gate already does.
  hospitalFacet: true,
  // No Arabic cost content exists yet, and the specialty hubs are English
  // long-form with no target-locale store. Both stay shut.
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
 * Those 20 are the only facets it suppresses.
 */
export const FACET_MIN_ARABIC_PROFILES = 3;

/**
 * The second lever: how much of its parent facet a page may reproduce before it
 * stops being a page of its own. null means the page type has no overlap gate.
 *
 * Thinness is not the only way a facet fails to earn an index slot, and on this
 * catalog the opposite failure is far more common. The 37 translated hospitals
 * are large multi-specialty campuses, so /hospitals/India/Delhi-NCR/Neurosurgery
 * returns the same houses as /hospitals/India/Delhi-NCR: 1,117 of the 1,194
 * hospital facets reproduce at least 90% of their parent, 1,077 of them
 * exactly, and all 23 country/specialty facets reproduce at least 90% of
 * /hospitals/India. Publishing those asks Google to choose a canonical between
 * near-identical pages, which it does by ignoring most of them.
 *
 * Doctor facets are deliberately exempt. Their duplication is an artifact of
 * single-specialty coverage — all 70 translated doctors are radiation
 * oncologists — rather than structural redundancy, and the procedure facets do
 * narrow to genuinely different sub-sets of that roster. The overlap there
 * resolves on its own as more specialties get translated, so gating on it now
 * would suppress 30 of the 74 pages approved for stage 1.
 *
 * Unlike a per-specialty allowlist, this keeps working as coverage grows: a
 * facet earns its slot the moment its result set genuinely narrows.
 */
export const FACET_MAX_PARENT_OVERLAP: Record<PseoPageType, number | null> = {
  doctorFacet: null,
  hospitalFacet: 0.9,
  // Cost facets slice the same multi-specialty catalog, so they inherit the
  // hospital rule. Specialty hubs are roots with no parent facet to compare to.
  costFacet: 0.9,
  specialtyHub: null,
};

/**
 * True when a facet reproduces enough of its parent to be redundant.
 *
 * `parentCount` is the match count for the same facet with its most specific
 * filter removed. A facet with no parent — the country root — is never a
 * duplicate, and neither is one whose parent is somehow empty.
 */
export function facetDuplicatesParent(
  pageType: PseoPageType,
  matchCount: number,
  parentCount: number | undefined,
) {
  const threshold = FACET_MAX_PARENT_OVERLAP[pageType];
  if (threshold === null || threshold === undefined) return false;
  if (parentCount === undefined || parentCount <= 0) return false;
  return matchCount / parentCount >= threshold;
}

/**
 * A facet is published only when its template is approved, it is not thin, and
 * it is not a near-duplicate of its parent.
 *
 * Every page-type flag is still false, so this returns false for everything.
 * Both thresholds are wired and tested so that opening a gate later is a
 * one-line change with a page count already known behind it.
 */
export function facetIsPublished(
  pageType: PseoPageType,
  matchCount: number,
  parentCount?: number,
) {
  if (!arabicTemplateApproved(pageType)) return false;
  if (matchCount < FACET_MIN_ARABIC_PROFILES) return false;
  return !facetDuplicatesParent(pageType, matchCount, parentCount);
}
