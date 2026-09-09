import type { ArticleBlock } from "@/lib/cms/types";

export type DoctorPatch = {
  bio?: string;
  image?: string;
  imageAlt?: string;
  name?: string;
  title?: string;
  qualifications?: string;
  experience?: string;
};

export type HospitalPatch = {
  bio?: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  name?: string;
};

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
