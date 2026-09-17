import "server-only";
import { DOCTOR_OVERLAY_KEYS, HOSPITAL_OVERLAY_KEYS } from "@/lib/cms/catalog-types";
import { applyCatalogLayer, loadCatalogCms } from "@/lib/cms/catalog-store";
import {
  doctors as englishDoctors,
  doctorsForHospital as englishDoctorsForHospital,
  doctorsForTreatment as englishDoctorsForTreatment,
  getDoctor as getEnglishDoctor,
  getHospital as getEnglishHospital,
  hospitals as englishHospitals,
  hospitalsInCity as englishHospitalsInCity,
} from "@/lib/server-catalog";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { AppLocale } from "@/lib/i18n/languages";

function materialize<T extends { slug: string }>(rows: T[]): T[] {
  return rows.filter(() => true);
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function doctorPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      hasText(patch.name) &&
      hasText(patch.title) &&
      hasText(patch.bio),
  );
}

function hospitalPatchIsPublished(patch: Record<string, unknown> | undefined) {
  return Boolean(
    patch &&
      (hasText(patch.bio) || hasText(patch.summary)),
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
  return applyCatalogLayer(
    authored,
    cms.doctorsDeleted,
    cms.doctorOverrides,
    (cms.doctorsAdded as Doctor[]).filter(
      (row) => hasText(row.name) && hasText(row.title) && hasText(row.bio),
    ),
    DOCTOR_OVERLAY_KEYS,
  );
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
    (cms.hospitalsAdded as Hospital[]).filter(
      (row) => hasText(row.bio) || hasText(row.summary),
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
