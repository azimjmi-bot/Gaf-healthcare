import type { ArticleBlock } from "@/lib/cms/types";
import type { SpecialtyPagePatch } from "@/data/specialty-pages/types";

/**
 * Review state of a translated record, mirroring CuratedTreatmentTranslation
 * but with the extra "reviewed" step: machine or first-pass translation lands
 * as draft, a native speaker moves it to reviewed, and only an explicit
 * publish makes it indexable. Absent means draft, so new content is never
 * live by accident.
 *
 * Carried on the patch but deliberately kept out of the overlay key lists, so
 * it never merges into a Doctor or Hospital and cannot reach a template.
 */
export type TranslationStatus = "draft" | "reviewed" | "published";

export function translationStatus(patch: { status?: unknown } | undefined): TranslationStatus {
  const value = patch?.status;
  return value === "published" || value === "reviewed" ? value : "draft";
}

export type DoctorPatch = {
  status?: TranslationStatus;
  bio?: string;
  image?: string;
  imageAlt?: string;
  name?: string;
  title?: string;
  qualifications?: string;
  experience?: string;
  languages?: string;
  specializations?: string[];
  proceduresExpertise?: string[];
  education?: string[];
  affiliations?: string[];
  memberships?: string[];
  awards?: string[];
  research?: string[];
};

export type HospitalPatch = {
  status?: TranslationStatus;
  bio?: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  languages?: string;
  focus?: string;
  icu?: string;
};

/** Fields that define public URLs and pSEO matching. Never overlay these. */
export const PSEO_LOCKED_KEYS = [
  "slug",
  "citySlug",
  "countrySlug",
  "specialty",
  "specialtySlug",
  "specialtySlugs",
  "procedureSlug",
  "procedureSlugs",
  "treatmentSlugs",
  "hospitalSlug",
  "hospitalName",
  "city",
  "country",
  "specialties",
  "procedures",
] as const;

export const DOCTOR_OVERLAY_KEYS = [
  "bio",
  "image",
  "imageAlt",
  "name",
  "title",
  "qualifications",
  "experience",
  "languages",
  "specializations",
  "proceduresExpertise",
  "education",
  "affiliations",
  "memberships",
  "awards",
  "research",
] as const satisfies readonly (keyof DoctorPatch)[];

export const HOSPITAL_OVERLAY_KEYS = [
  "bio",
  "summary",
  "image",
  "imageAlt",
  "languages",
  "focus",
  "icu",
] as const satisfies readonly (keyof HospitalPatch)[];

export function pickOverlay(patch: object | undefined, allowedKeys: readonly string[]): Record<string, unknown> {
  if (!patch) return {};
  const src = patch as Record<string, unknown>;
  const locked = new Set<string>(PSEO_LOCKED_KEYS);
  const out: Record<string, unknown> = {};
  for (const key of allowedKeys) {
    if (locked.has(key)) continue;
    if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
    if (src[key] === undefined) continue;
    out[key] = src[key];
  }
  return out;
}

/**
 * A stored patch carries its review state alongside the content. The overlay
 * key lists above stay content-only on purpose, so `status` survives loading
 * and saving but can never merge into a Doctor or Hospital and reach a
 * template or a schema field.
 */
export const DOCTOR_PATCH_KEYS = ["status", ...DOCTOR_OVERLAY_KEYS] as const;
export const HOSPITAL_PATCH_KEYS = ["status", ...HOSPITAL_OVERLAY_KEYS] as const;

export function pickHospitalPatch(patch: object | undefined): HospitalPatch {
  return pickOverlay(patch, HOSPITAL_PATCH_KEYS) as HospitalPatch;
}

export function pickDoctorPatch(patch: object | undefined): DoctorPatch {
  return pickOverlay(patch, DOCTOR_PATCH_KEYS) as DoctorPatch;
}

export type TreatmentPatch = {
  name?: string;
  summary?: string;
  notes?: string;
  includes?: string[];
  usRange?: string;
  partnerRange?: string;
  stay?: string;
  image?: string;
  conditions?: string[];
  hospitalSlugs?: string[];
  blocks?: ArticleBlock[];
  replaceGuide?: boolean;
};

export type CatalogRow = {
  slug: string;
  name: string;
  city?: string;
  specialty?: string;
  hospitalName?: string;
  category?: string;
  image?: string;
  deleted?: boolean;
  added?: boolean;
};

export type CatalogCms = {
  doctorOverrides: Record<string, DoctorPatch>;
  doctorsAdded: Record<string, unknown>[];
  doctorsDeleted: string[];
  hospitalOverrides: Record<string, HospitalPatch>;
  hospitalsAdded: Record<string, unknown>[];
  hospitalsDeleted: string[];
  treatmentOverrides: Record<string, TreatmentPatch>;
  treatmentsAdded: Record<string, unknown>[];
  treatmentsDeleted: string[];
  /** Editorial specialty-country content keyed as `{countrySlug}/{specialtySlug}`. */
  specialtyPageOverrides: Record<string, SpecialtyPagePatch>;
};

export function emptyCatalogCms(): CatalogCms {
  return {
    doctorOverrides: {},
    doctorsAdded: [],
    doctorsDeleted: [],
    hospitalOverrides: {},
    hospitalsAdded: [],
    hospitalsDeleted: [],
    treatmentOverrides: {},
    treatmentsAdded: [],
    treatmentsDeleted: [],
    specialtyPageOverrides: {},
  };
}
