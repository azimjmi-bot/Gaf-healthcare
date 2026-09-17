import type { AppLocale } from "@/lib/i18n/languages";

export type CuratedTreatmentStatus = "draft" | "published" | "archived";
export type TreatmentTranslationStatus = "draft" | "published";

export type TreatmentFaq = {
  id: string;
  question: string;
  answer: string;
};

export type TreatmentProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type CuratedTreatmentTranslation = {
  status: TreatmentTranslationStatus;
  name: string;
  shortDescription: string;
  editorialBody: string;
  /** Legacy section fields remain readable for records authored before the unified editor. */
  fullDescription: string;
  overview: string;
  whatIsIt: string;
  conditionsTreated: string;
  whyPerformed: string;
  whoMayNeed: string;
  howItWorks: string;
  process: TreatmentProcessStep[];
  preparation: string;
  procedureDetails: string;
  recovery: string;
  risks: string;
  hospitalStay: string;
  recoveryPeriod: string;
  followUp: string;
  importantConsiderations: string;
  treatmentType: string;
  treatmentSetting: string;
  technology: string;
  searchKeywords: string[];
  faqs: TreatmentFaq[];
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
};

export type CuratedTreatment = {
  id: string;
  slug: string;
  previousSlugs: string[];
  baseName: string;
  specialtySlug: string;
  subspecialty: string;
  category: string;
  image: string;
  destinationSlugs: string[];
  doctorSlugs: string[];
  hospitalSlugs: string[];
  costPageSlugs: string[];
  relatedTreatmentSlugs: string[];
  status: CuratedTreatmentStatus;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  translations: Partial<Record<AppLocale, CuratedTreatmentTranslation>>;
};

export type CuratedTreatmentStore = {
  treatments: CuratedTreatment[];
};

export function blankTreatmentTranslation(): CuratedTreatmentTranslation {
  return {
    status: "draft",
    name: "",
    shortDescription: "",
    editorialBody: "",
    fullDescription: "",
    overview: "",
    whatIsIt: "",
    conditionsTreated: "",
    whyPerformed: "",
    whoMayNeed: "",
    howItWorks: "",
    process: [],
    preparation: "",
    procedureDetails: "",
    recovery: "",
    risks: "",
    hospitalStay: "",
    recoveryPeriod: "",
    followUp: "",
    importantConsiderations: "",
    treatmentType: "",
    treatmentSetting: "",
    technology: "",
    searchKeywords: [],
    faqs: [],
    imageAlt: "",
    seoTitle: "",
    metaDescription: "",
  };
}
