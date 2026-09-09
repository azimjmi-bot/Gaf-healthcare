import { notFound } from "next/navigation";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import {
  doctorsForHospital,
  getHospital,
  getTreatment,
  hospitals,
  type Treatment,
} from "@/lib/data";
import { groupFaculty, type FacultyGroup } from "@/lib/hospital-profile";

export function hospitalStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export function loadHospitalCampus(slug: string): {
  hospital: Hospital;
  faculty: Doctor[];
  pathways: Treatment[];
  groups: FacultyGroup[];
} | null {
  const hospital = getHospital(slug);
  if (!hospital) return null;
  const faculty = doctorsForHospital(hospital.slug);
  const pathways = hospital.procedureSlugs
    .map((s) => getTreatment(s))
    .filter((t): t is Treatment => Boolean(t));
  return { hospital, faculty, pathways, groups: groupFaculty(faculty, pathways) };
}

export function requireHospitalCampus(slug: string) {
  const data = loadHospitalCampus(slug);
  if (!data) notFound();
  return data;
}
