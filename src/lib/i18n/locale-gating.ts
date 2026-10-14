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
  // Stage 4. Every cost pathway has a reviewed Arabic overlay and a dedicated
  // Arabic renderer; country, city, specialty and procedure facets are live.
  costFacet: true,
  // Specialty hubs are English long-form with no target-locale store.
  specialtyHub: false,
};

export function arabicTemplateApproved(pageType: PseoPageType) {
  return ARABIC_TEMPLATE_APPROVED[pageType] ?? false;
}

/**
 * A facet needs this many matching translated profiles before it is worth
 * indexing. Below it the page is thin: a heading and one or two cards.
 *
 * On current data no doctor facet sits below 3. The reviewed Arabic doctor
 * catalog covers radiation, surgical and medical oncology, so specialty
 * and procedure pages clear the floor from real translated profiles.
 */
export const FACET_MIN_ARABIC_PROFILES = 3;

export const FACET_MIN_ARABIC_ROWS: Record<PseoPageType, number> = {
  doctorFacet: FACET_MIN_ARABIC_PROFILES,
  hospitalFacet: FACET_MIN_ARABIC_PROFILES,
  // One cost pathway is substantive: it carries a reviewed price comparison,
  // duration, inclusions, records-first caveat, FAQs and procedure metadata.
  costFacet: 1,
  specialtyHub: 1,
};

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
 * Doctor facets are deliberately exempt. The 286 translated profiles now cover
 * radiation, surgical and medical oncology, and procedure facets narrow to
 * genuinely different subsets. A small number of country/city facets still
 * reproduce their parent, so canonicalFacetPath handles those without blocking
 * the specialty and procedure pages that already have substantive Arabic data.
 *
 * Unlike a per-specialty allowlist, this keeps working as coverage grows: a
 * facet earns its slot the moment its result set genuinely narrows.
 */
export const FACET_MAX_PARENT_OVERLAP: Record<PseoPageType, number | null> = {
  doctorFacet: null,
  hospitalFacet: 0.9,
  // A procedure cost page can be the only row in its specialty while still
  // carrying distinct price and clinical-planning content.
  costFacet: null,
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
 * Doctor, hospital and cost templates are approved; the specialty-hub gate
 * remains closed. Both thresholds are wired and tested so new Arabic content
 * publishes only when the resulting facet has enough reviewed records.
 */
export function facetIsPublished(
  pageType: PseoPageType,
  matchCount: number,
  parentCount?: number,
) {
  if (!arabicTemplateApproved(pageType)) return false;
  if (matchCount < FACET_MIN_ARABIC_ROWS[pageType]) return false;
  return !facetDuplicatesParent(pageType, matchCount, parentCount);
}
