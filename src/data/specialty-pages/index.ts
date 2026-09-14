import "server-only";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import type { CmsEdition } from "@/lib/cms/edition";
import { filterDoctors, filterHospitals, filterTreatments } from "@/lib/catalog";
import { doctors, hospitals, treatments } from "@/lib/data";
import { COUNTRIES, SPECIALTIES } from "@/lib/taxonomy";
import { medicalOncologyIndiaProfile } from "./medical-oncology";
import { pulmonologyIndiaProfile } from "./pulmonology";
import { radiationOncologyIndiaProfile } from "./radiation-oncology";
import type { SpecialtyPagePatch, SpecialtyPageProfile } from "./types";

export type {
  SpecialtyCityEditorial,
  SpecialtyCondition,
  SpecialtyPagePatch,
  SpecialtyPageProfile,
  SpecialtyPricingGroup,
  SpecialtyTerminology,
  SpecialtyTechnology,
  SpecialtyTreatmentGroup,
} from "./types";

const BASE_SPECIALTY_PAGES: Record<string, SpecialtyPageProfile> = {
  "india/radiation-oncology": radiationOncologyIndiaProfile,
  "india/medical-oncology": medicalOncologyIndiaProfile,
  "india/pulmonology": pulmonologyIndiaProfile,
};

export function listBaseSpecialtyPages() {
  return Object.values(BASE_SPECIALTY_PAGES);
}

function blankSpecialtyPage(
  countrySlug: string,
  specialtySlug: string,
): SpecialtyPageProfile {
  const specialty = SPECIALTIES.find((item) => item.slug === specialtySlug);
  const country = COUNTRIES.find((item) => item.slug === countrySlug);
  const specialtyName = specialty?.name ?? specialtySlug;
  const countryName = country?.name ?? countrySlug;
  return {
    specialtySlug,
    countrySlug,
    locale: "en",
    status: "draft",
    allowIndex: false,
    lastReviewed: "",
    seoTitle: `${specialtyName} in ${countryName}`,
    seoDescription: "",
    introAnswer: "",
    terminology: {
      careItem: "treatment",
      careItems: "treatments",
      practitioner: "specialist",
      practitioners: "specialists",
      durationLabel: "Typical treatment or stay",
    },
    overview: [],
    conditions: [],
    treatmentGroups: [],
    selection: [],
    treatmentProcess: [],
    costExplanation: [],
    pricingGroups: [],
    costFactors: [],
    mayInclude: [],
    mayBeAdditional: [],
    technologies: [],
    internationalPatientInformation: [],
    recordsRequired: [],
    stayDuration: [],
    countryComparison: [],
    relatedSpecialtySlugs: [],
    faqs: [],
    cityFaqQuestions: [],
    cityEditorials: [],
    medicalDisclaimer: "",
  };
}

export function listSpecialtyPageCandidates(): SpecialtyPageProfile[] {
  const candidates: SpecialtyPageProfile[] = [];
  for (const country of COUNTRIES) {
    for (const specialty of SPECIALTIES) {
      const query = { destination: country.name, specialty: specialty.name };
      if (
        filterTreatments(query, treatments, hospitals).length < 3 ||
        filterDoctors(query, doctors).length === 0 ||
        filterHospitals(query, hospitals).length === 0
      ) {
        continue;
      }
      candidates.push(
        getBaseSpecialtyPage(country.slug, specialty.slug) ??
          blankSpecialtyPage(country.slug, specialty.slug),
      );
    }
  }
  return candidates;
}

export function getEditableSpecialtyPage(
  countrySlug: string,
  specialtySlug: string,
  edition: CmsEdition = "en",
) {
  const candidate = listSpecialtyPageCandidates().find(
    (page) =>
      page.countrySlug === countrySlug &&
      page.specialtySlug === specialtySlug,
  );
  if (!candidate) return undefined;
  const patch =
    loadCatalogCms(edition).specialtyPageOverrides?.[
      specialtyPageKey(countrySlug, specialtySlug)
    ];
  return patch ? { ...candidate, ...patch } : candidate;
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
  const patch =
    loadCatalogCms(edition).specialtyPageOverrides?.[
      specialtyPageKey(countrySlug, specialtySlug)
    ];
  const base =
    getBaseSpecialtyPage(countrySlug, specialtySlug) ??
    (patch
      ? blankSpecialtyPage(countrySlug, specialtySlug)
      : undefined);
  if (!base) return undefined;
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
    terminology: value.terminology,
    overview: value.overview,
    conditions: value.conditions,
    treatmentGroups: value.treatmentGroups,
    selection: value.selection,
    treatmentProcess: value.treatmentProcess,
    costExplanation: value.costExplanation,
    pricingGroups: value.pricingGroups,
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
    cityFaqQuestions: value.cityFaqQuestions,
    cityEditorials: value.cityEditorials,
    medicalDisclaimer: value.medicalDisclaimer,
  };
}
