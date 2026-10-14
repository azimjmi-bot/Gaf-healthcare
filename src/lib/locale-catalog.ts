import "server-only";
import {
  DOCTOR_OVERLAY_KEYS,
  HOSPITAL_OVERLAY_KEYS,
  TREATMENT_OVERLAY_KEYS,
  translationStatus,
} from "@/lib/cms/catalog-types";
import { applyCatalogLayer, loadCatalogCms } from "@/lib/cms/catalog-store";
import {
  doctors as englishDoctors,
  doctorsForHospital as englishDoctorsForHospital,
  doctorsForTreatment as englishDoctorsForTreatment,
  getDoctor as getEnglishDoctor,
  getHospital as getEnglishHospital,
  hospitals as englishHospitals,
  hospitalsInCity as englishHospitalsInCity,
  treatments as englishTreatments,
} from "@/lib/server-catalog";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { AppLocale } from "@/lib/i18n/languages";

function materialize<T extends { slug: string }>(rows: T[]): T[] {
  return rows.filter(() => true);
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Having the text is necessary but no longer sufficient: a translation is only
 * live once someone has explicitly marked it published. Drafts and records
 * awaiting native-speaker review stay out of the locale catalog entirely, which
 * is what makes their pages 404 rather than serve unreviewed copy.
 */
function doctorPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      hasText(patch.name) &&
      hasText(patch.title) &&
      hasText(patch.bio),
  );
}

function hospitalPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      (hasText(patch.bio) || hasText(patch.summary)),
  );
}

function treatmentPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      translationStatus(patch) === "published" &&
      hasText(patch.summary) &&
      hasText(patch.notes) &&
      hasText(patch.stay) &&
      Array.isArray(patch.includes) &&
      patch.includes.length > 0,
  );
}

export function doctorsForLocale(locale: AppLocale): Doctor[] {
  const base = materialize(englishDoctors);
  if (locale === "en") return base;
  const cms = loadCatalogCms(locale);
  const authored = base.filter((row) =>
    doctorPatchIsPublished(
      cms.doctorOverrides[row.slug] as Record<string, unknown> | undefined,
    ),
  );
  const layered = applyCatalogLayer(
    authored,
    cms.doctorsDeleted,
    cms.doctorOverrides,
    (cms.doctorsAdded as Doctor[]).filter((row) =>
      doctorPatchIsPublished(row as unknown as Record<string, unknown>),
    ),
    DOCTOR_OVERLAY_KEYS,
  );
  // hospitalName stays locked in the overlay so matching cannot be rewritten.
  // The Arabic page still shows the campus under its Arabic display name.
  const campusName = new Map(hospitalsForLocale(locale).map((hospital) => [hospital.slug, hospital.name]));
  return layered.map((doctor) => {
    const name = campusName.get(doctor.hospitalSlug);
    if (!name || name === doctor.hospitalName) return doctor;
    return { ...doctor, hospitalName: name };
  });
}

export function getDoctorForLocale(slug: string, locale: AppLocale) {
  if (locale === "en") return getEnglishDoctor(slug);
  return doctorsForLocale(locale).find((row) => row.slug === slug);
}

export function doctorsForHospitalLocale(hospitalSlug: string, locale: AppLocale) {
  if (locale === "en") return englishDoctorsForHospital(hospitalSlug);
  return doctorsForLocale(locale).filter((row) => row.hospitalSlug === hospitalSlug);
}

export function doctorsForTreatmentLocale(procedureSlug: string, locale: AppLocale) {
  if (locale === "en") return englishDoctorsForTreatment(procedureSlug);
  return doctorsForLocale(locale).filter(
    (row) => row.procedureSlugs.includes(procedureSlug) || row.treatmentSlugs.includes(procedureSlug),
  );
}

export function hospitalsForLocale(locale: AppLocale): Hospital[] {
  const base = materialize(englishHospitals);
  if (locale === "en") return base;
  const cms = loadCatalogCms(locale);
  const authored = base.filter((row) =>
    hospitalPatchIsPublished(
      cms.hospitalOverrides[row.slug] as Record<string, unknown> | undefined,
    ),
  );
  return applyCatalogLayer(
    authored,
    cms.hospitalsDeleted,
    cms.hospitalOverrides,
    (cms.hospitalsAdded as Hospital[]).filter((row) =>
      hospitalPatchIsPublished(row as unknown as Record<string, unknown>),
    ),
    HOSPITAL_OVERLAY_KEYS,
  );
}

export function getHospitalForLocale(slug: string, locale: AppLocale) {
  if (locale === "en") return getEnglishHospital(slug);
  return hospitalsForLocale(locale).find((row) => row.slug === slug);
}

export function hospitalsInCityLocale(citySlug: string, locale: AppLocale) {
  if (locale === "en") return englishHospitalsInCity(citySlug);
  return hospitalsForLocale(locale).filter((row) => row.citySlug === citySlug);
}

export function treatmentsForLocale(locale: AppLocale): Treatment[] {
  const base = materialize(englishTreatments);
  if (locale === "en") return base;
  const cms = loadCatalogCms(locale);
  const authored = base.filter((row) =>
    treatmentPatchIsPublished(
      cms.treatmentOverrides[row.slug] as Record<string, unknown> | undefined,
    ),
  );
  return applyCatalogLayer(
    authored,
    cms.treatmentsDeleted,
    cms.treatmentOverrides,
    (cms.treatmentsAdded as Treatment[]).filter((row) =>
      treatmentPatchIsPublished(row as unknown as Record<string, unknown>),
    ),
    TREATMENT_OVERLAY_KEYS,
  );
}

export function getTreatmentForLocale(slug: string, locale: AppLocale) {
  return treatmentsForLocale(locale).find((row) => row.slug === slug);
}
