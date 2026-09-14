export type SpecialtyCondition = {
  name: string;
  summary: string;
  /** Existing treatment slugs only. Missing slugs are rendered as plain text, never broken links. */
  procedureSlugs: string[];
};

export type SpecialtyTreatmentGroup = {
  name: string;
  summary: string;
  procedureSlugs: string[];
};

export type SpecialtyTechnology = {
  name: string;
  what: string;
  why: string;
  procedureSlugs: string[];
};

export type SpecialtyCityEditorial = {
  citySlug: string;
  /** City-specific context; counts and entity names stay dynamic. */
  introduction: string[];
  whyCity: string[];
  planning: string[];
  logistics: string[];
  faqExtras: { q: string; a: string }[];
};

export type SpecialtyPageProfile = {
  specialtySlug: string;
  countrySlug: string;
  locale: "en";
  status: "draft" | "published";
  allowIndex: boolean;
  lastReviewed: string;
  seoTitle: string;
  seoDescription: string;
  introAnswer: string;
  overview: string[];
  conditions: SpecialtyCondition[];
  treatmentGroups: SpecialtyTreatmentGroup[];
  selection: string[];
  treatmentProcess: { label: string; detail: string }[];
  costExplanation: string[];
  costFactors: { label: string; detail: string }[];
  mayInclude: string[];
  mayBeAdditional: string[];
  technologies: SpecialtyTechnology[];
  internationalPatientInformation: string[];
  recordsRequired: string[];
  stayDuration: string[];
  countryComparison: string[];
  relatedSpecialtySlugs: string[];
  faqs: { q: string; a: string }[];
  cityEditorials: SpecialtyCityEditorial[];
  medicalDisclaimer: string;
};

export type SpecialtyPagePatch = Partial<
  Pick<
    SpecialtyPageProfile,
    | "status"
    | "allowIndex"
    | "lastReviewed"
    | "seoTitle"
    | "seoDescription"
    | "introAnswer"
    | "overview"
    | "conditions"
    | "treatmentGroups"
    | "selection"
    | "treatmentProcess"
    | "costExplanation"
    | "costFactors"
    | "mayInclude"
    | "mayBeAdditional"
    | "technologies"
    | "internationalPatientInformation"
    | "recordsRequired"
    | "stayDuration"
    | "countryComparison"
    | "relatedSpecialtySlugs"
    | "faqs"
    | "cityEditorials"
    | "medicalDisclaimer"
  >
>;
