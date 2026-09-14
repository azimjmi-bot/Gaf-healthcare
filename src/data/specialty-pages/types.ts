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

export type SpecialtyTerminology = {
  /** Clinically natural singular label, for example treatment, procedure or service. */
  careItem: string;
  careItems: string;
  practitioner: string;
  practitioners: string;
  durationLabel: string;
};

export type SpecialtyPricingGroup = {
  name: string;
  /** The billing scope that must remain consistent within this group. */
  basis: string;
  explanation: string;
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
  terminology: SpecialtyTerminology;
  overview: string[];
  conditions: SpecialtyCondition[];
  treatmentGroups: SpecialtyTreatmentGroup[];
  selection: string[];
  treatmentProcess: { label: string; detail: string }[];
  costExplanation: string[];
  pricingGroups: SpecialtyPricingGroup[];
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
  /** Exact shared FAQ questions that remain clinically useful on city pages. */
  cityFaqQuestions: string[];
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
    | "terminology"
    | "overview"
    | "conditions"
    | "treatmentGroups"
    | "selection"
    | "treatmentProcess"
    | "costExplanation"
    | "pricingGroups"
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
    | "cityFaqQuestions"
    | "cityEditorials"
    | "medicalDisclaimer"
  >
>;
