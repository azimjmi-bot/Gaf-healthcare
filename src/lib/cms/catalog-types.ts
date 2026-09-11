import type { ArticleBlock } from "@/lib/cms/types";

export type DoctorPatch = {
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

export function pickHospitalPatch(patch: object | undefined): HospitalPatch {
  return pickOverlay(patch, HOSPITAL_OVERLAY_KEYS) as HospitalPatch;
}

export function pickDoctorPatch(patch: object | undefined): DoctorPatch {
  return pickOverlay(patch, DOCTOR_OVERLAY_KEYS) as DoctorPatch;
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
  };
}
