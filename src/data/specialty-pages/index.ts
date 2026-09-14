import "server-only";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import type { CmsEdition } from "@/lib/cms/edition";
import { radiationOncologyIndiaProfile } from "./radiation-oncology";
import type { SpecialtyPagePatch, SpecialtyPageProfile } from "./types";

export type {
  SpecialtyCityEditorial,
  SpecialtyCondition,
  SpecialtyPagePatch,
  SpecialtyPageProfile,
  SpecialtyTechnology,
  SpecialtyTreatmentGroup,
} from "./types";

const BASE_SPECIALTY_PAGES: Record<string, SpecialtyPageProfile> = {
  "india/radiation-oncology": radiationOncologyIndiaProfile,
};

export function listBaseSpecialtyPages() {
  return Object.values(BASE_SPECIALTY_PAGES);
}

export function specialtyPageKey(countrySlug: string, specialtySlug: string) {
  return `${countrySlug}/${specialtySlug}`;
}

export function getBaseSpecialtyPage(
  countrySlug: string,
  specialtySlug: string,
): SpecialtyPageProfile | undefined {
  return BASE_SPECIALTY_PAGES[specialtyPageKey(countrySlug, specialtySlug)];
}

export function getSpecialtyPage(
  countrySlug: string,
  specialtySlug: string,
  edition: CmsEdition = "en",
): SpecialtyPageProfile | undefined {
  const base = getBaseSpecialtyPage(countrySlug, specialtySlug);
  if (!base) return undefined;
  const patch =
    loadCatalogCms(edition).specialtyPageOverrides?.[
      specialtyPageKey(countrySlug, specialtySlug)
    ];
  return patch ? { ...base, ...patch } : base;
}

export function saveableSpecialtyPageFields(
  value: SpecialtyPagePatch,
): SpecialtyPagePatch {
  return {
    status: value.status,
    allowIndex: value.allowIndex,
    lastReviewed: value.lastReviewed,
    seoTitle: value.seoTitle,
    seoDescription: value.seoDescription,
    introAnswer: value.introAnswer,
    overview: value.overview,
    conditions: value.conditions,
    treatmentGroups: value.treatmentGroups,
    selection: value.selection,
    treatmentProcess: value.treatmentProcess,
    costExplanation: value.costExplanation,
    costFactors: value.costFactors,
    mayInclude: value.mayInclude,
    mayBeAdditional: value.mayBeAdditional,
    technologies: value.technologies,
    internationalPatientInformation: value.internationalPatientInformation,
    recordsRequired: value.recordsRequired,
    stayDuration: value.stayDuration,
    countryComparison: value.countryComparison,
    relatedSpecialtySlugs: value.relatedSpecialtySlugs,
    faqs: value.faqs,
    cityEditorials: value.cityEditorials,
    medicalDisclaimer: value.medicalDisclaimer,
  };
}
