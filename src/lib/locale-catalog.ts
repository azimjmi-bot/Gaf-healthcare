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

export function doctorsForLocale(locale: AppLocale): Doctor[] {
  const base = materialize(englishDoctors);
  if (locale !== "ar") return base;
  const cms = loadCatalogCms("ar");
  return applyCatalogLayer(base, [], cms.doctorOverrides, [], DOCTOR_OVERLAY_KEYS);
}

export function getDoctorForLocale(slug: string, locale: AppLocale) {
  if (locale !== "ar") return getEnglishDoctor(slug);
  return doctorsForLocale(locale).find((row) => row.slug === slug);
}

export function doctorsForHospitalLocale(hospitalSlug: string, locale: AppLocale) {
  if (locale !== "ar") return englishDoctorsForHospital(hospitalSlug);
  return doctorsForLocale(locale).filter((row) => row.hospitalSlug === hospitalSlug);
}

export function doctorsForTreatmentLocale(procedureSlug: string, locale: AppLocale) {
  if (locale !== "ar") return englishDoctorsForTreatment(procedureSlug);
  return doctorsForLocale(locale).filter(
    (row) => row.procedureSlugs.includes(procedureSlug) || row.treatmentSlugs.includes(procedureSlug),
  );
}

export function hospitalsForLocale(locale: AppLocale): Hospital[] {
  const base = materialize(englishHospitals);
  if (locale !== "ar") return base;
  const cms = loadCatalogCms("ar");
  return applyCatalogLayer(base, [], cms.hospitalOverrides, [], HOSPITAL_OVERLAY_KEYS);
}

export function getHospitalForLocale(slug: string, locale: AppLocale) {
  if (locale !== "ar") return getEnglishHospital(slug);
  return hospitalsForLocale(locale).find((row) => row.slug === slug);
}

export function hospitalsInCityLocale(citySlug: string, locale: AppLocale) {
  if (locale !== "ar") return englishHospitalsInCity(citySlug);
  return hospitalsForLocale(locale).filter((row) => row.citySlug === citySlug);
}
