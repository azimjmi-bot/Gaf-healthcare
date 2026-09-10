import "server-only";
import { DOCTOR_OVERLAY_KEYS, HOSPITAL_OVERLAY_KEYS } from "@/lib/cms/catalog-types";
import { applyCatalogLayer, liveArray, loadCatalogCms } from "@/lib/cms/catalog-store";
import { catalogDoctors, type Doctor } from "@/lib/doctors";
import { catalogHospitals, type Hospital } from "@/lib/hospitals";
import { catalogTreatments, type Treatment } from "@/lib/treatments";

export const doctors: Doctor[] = liveArray(catalogDoctors, (rows) => {
  const cms = loadCatalogCms();
  return applyCatalogLayer(
    rows,
    cms.doctorsDeleted,
    cms.doctorOverrides,
    cms.doctorsAdded as Doctor[],
    DOCTOR_OVERLAY_KEYS,
  );
});

export const hospitals: Hospital[] = liveArray(catalogHospitals, (rows) => {
  const cms = loadCatalogCms();
  return applyCatalogLayer(
    rows,
    cms.hospitalsDeleted,
    cms.hospitalOverrides,
    cms.hospitalsAdded as Hospital[],
    HOSPITAL_OVERLAY_KEYS,
  );
});

export const treatments: Treatment[] = liveArray(catalogTreatments, (rows) => {
  const cms = loadCatalogCms();
  return applyCatalogLayer(
    rows,
    cms.treatmentsDeleted,
    cms.treatmentOverrides,
    cms.treatmentsAdded as Treatment[],
  );
});

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

export function getHospital(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function doctorsForHospital(slug: string) {
  return doctors.filter((d) => d.hospitalSlug === slug);
}

export function doctorsForTreatment(slug: string) {
  return doctors.filter((d) => d.procedureSlugs.includes(slug) || d.treatmentSlugs.includes(slug));
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}

export function hospitalsInCity(citySlug: string) {
  return hospitals.filter((h) => h.citySlug === citySlug);
}
