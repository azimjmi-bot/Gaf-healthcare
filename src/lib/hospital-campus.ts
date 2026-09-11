import { notFound } from "next/navigation";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { hospitals, getTreatment, type Treatment } from "@/lib/data";
import { doctorsForHospitalLocale, getHospitalForLocale } from "@/lib/locale-catalog";
import { groupFaculty, type FacultyGroup } from "@/lib/hospital-profile";
import type { AppLocale } from "@/lib/i18n/languages";

export function hospitalStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export function loadHospitalCampus(
  slug: string,
  locale: AppLocale = "en",
): {
  hospital: Hospital;
  faculty: Doctor[];
  pathways: Treatment[];
  groups: FacultyGroup[];
} | null {
  const hospital = getHospitalForLocale(slug, locale);
  if (!hospital) return null;
  const faculty = doctorsForHospitalLocale(hospital.slug, locale);
  const pathways = hospital.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  return { hospital, faculty, pathways, groups: groupFaculty(faculty, pathways) };
}

export function requireHospitalCampus(slug: string, locale: AppLocale = "en") {
  const data = loadHospitalCampus(slug, locale);
  if (!data) notFound();
  return data;
}
