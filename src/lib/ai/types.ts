import type { AppLocale } from "@/lib/i18n/languages";

export const AI_CONTENT_TYPES = ["treatment", "doctor", "hospital", "article"] as const;
export type AiContentType = (typeof AI_CONTENT_TYPES)[number];

export const AI_ACTIONS = [
  "generate",
  "rewrite",
  "improve_seo",
  "improve_geo",
  "generate_faqs",
  "suggest_links",
  "doctor_bio",
  "hospital_bio",
] as const;
export type AiAction = (typeof AI_ACTIONS)[number];

export const AI_TONES = ["professional", "human", "patient-friendly"] as const;
export type AiTone = (typeof AI_TONES)[number];

export const AI_STRENGTHS = ["standard", "strong"] as const;
export type AiStrength = (typeof AI_STRENGTHS)[number];

export const AI_LENGTHS = ["standard", "long"] as const;
export type AiLength = (typeof AI_LENGTHS)[number];

export type AiFaq = { question: string; answer: string };

export type AiInternalLink = {
  anchor: string;
  url: string;
  reason: string;
};

export type StudioFields = {
  title: string;
  suggested_slug: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  quick_answer: string;
  introduction: string;
  definition: string;
  overview: string;
  how_it_works: string;
  who_may_need_it: string;
  preparation: string;
  recovery: string;
  risks: string;
  benefits: string;
  cost_section: string;
  why_location: string;
  hospital_section: string;
  doctor_section: string;
  international_patient_information: string;
  bio: string;
  cta: string;
  faqs: AiFaq[];
  internal_links: AiInternalLink[];
  warnings: string[];
  section_rewritten: string;
};

export function emptyStudioFields(): StudioFields {
  return {
    title: "",
    suggested_slug: "",
    meta_title: "",
    meta_description: "",
    h1: "",
    quick_answer: "",
    introduction: "",
    definition: "",
    overview: "",
    how_it_works: "",
    who_may_need_it: "",
    preparation: "",
    recovery: "",
    risks: "",
    benefits: "",
    cost_section: "",
    why_location: "",
    hospital_section: "",
    doctor_section: "",
    international_patient_information: "",
    bio: "",
    cta: "",
    faqs: [],
    internal_links: [],
    warnings: [],
    section_rewritten: "",
  };
}

export type AiGenerateRequest = {
  action: AiAction;
  contentType: AiContentType;
  instruction: string;
  locale: AppLocale;
  recordId?: string;
  countrySlug?: string;
  citySlug?: string;
  specialtySlug?: string;
  treatmentSlug?: string;
  doctorSlug?: string;
  hospitalSlug?: string;
  articleId?: string;
  section?: string;
  tone?: AiTone;
  seo?: AiStrength;
  geo?: AiStrength;
  length?: AiLength;
  audience?: string;
  useDoctors?: boolean;
  useHospitals?: boolean;
  useTreatment?: boolean;
  useCosts?: boolean;
  useSpecialty?: boolean;
  useCity?: boolean;
};

export type AiFlag = {
  code: string;
  message: string;
};

export type AiGenerationRecord = {
  id: string;
  createdAt: string;
  actor: string;
  action: AiAction;
  contentType: AiContentType;
  locale: AppLocale;
  recordId: string;
  model: string;
  instruction: string;
  status: "generated" | "approved" | "saved_draft" | "published" | "discarded";
  output: StudioFields;
  original: Record<string, string>;
  currentUrl: string;
  flags: AiFlag[];
};

export const STUDIO_FIELD_LABELS: Record<keyof StudioFields, string> = {
  title: "Title",
  suggested_slug: "Suggested slug (not applied)",
  meta_title: "SEO title (suggested)",
  meta_description: "Meta description (suggested)",
  h1: "H1",
  quick_answer: "Quick answer",
  introduction: "Introduction",
  definition: "Definition",
  overview: "Overview",
  how_it_works: "How it works",
  who_may_need_it: "Who may need it",
  preparation: "Preparation",
  recovery: "Recovery",
  risks: "Risks and considerations",
  benefits: "Benefits",
  cost_section: "Cost",
  why_location: "Why this location",
  hospital_section: "Hospitals",
  doctor_section: "Doctors",
  international_patient_information: "International patients",
  bio: "Bio",
  cta: "Call to action",
  faqs: "FAQs",
  internal_links: "Internal links",
  warnings: "Model notes",
  section_rewritten: "Rewritten section",
};
