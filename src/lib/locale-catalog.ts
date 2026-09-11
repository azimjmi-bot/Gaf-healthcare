import "server-only";
import { DOCTOR_OVERLAY_KEYS } from "@/lib/cms/catalog-types";
import { applyCatalogLayer, loadCatalogCms } from "@/lib/cms/catalog-store";
import {
  doctors as englishDoctors,
  doctorsForHospital as englishDoctorsForHospital,
  doctorsForTreatment as englishDoctorsForTreatment,
  getDoctor as getEnglishDoctor,
} from "@/lib/server-catalog";
import type { Doctor } from "@/lib/doctors";
import type { AppLocale } from "@/lib/i18n/languages";

function materialize(rows: Doctor[]): Doctor[] {
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
