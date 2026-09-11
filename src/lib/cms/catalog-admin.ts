import type { CmsEdition } from "@/lib/cms/edition";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import { catalogDoctors, type Doctor } from "@/lib/doctors";
import { catalogHospitals, type Hospital } from "@/lib/hospitals";
import { catalogTreatments, type Treatment } from "@/lib/treatments";
import { pickDoctorPatch, pickHospitalPatch, type CatalogRow } from "@/lib/cms/catalog-types";

export function doctorAdminRows(edition: CmsEdition = "en"): CatalogRow[] {
  const cms = loadCatalogCms(edition);
  const deleted = new Set(cms.doctorsDeleted);
  return [
    ...catalogDoctors.map((d) => ({
      slug: d.slug,
      name: cms.doctorOverrides[d.slug]?.name || d.name,
      city: d.city,
      specialty: d.specialty,
      hospitalName: d.hospitalName,
      image: cms.doctorOverrides[d.slug]?.image || d.image || "",
      deleted: deleted.has(d.slug),
      added: false,
    })),
    ...cms.doctorsAdded.map((raw) => {
      const d = raw as Doctor;
      return {
        slug: d.slug,
        name: cms.doctorOverrides[d.slug]?.name || d.name,
        city: d.city,
        specialty: d.specialty,
        hospitalName: d.hospitalName,
        image: cms.doctorOverrides[d.slug]?.image || d.image || "",
        deleted: deleted.has(d.slug),
        added: true,
      };
    }),
  ];
}

export function hospitalAdminRows(edition: CmsEdition = "en"): CatalogRow[] {
  const cms = loadCatalogCms(edition);
  const deleted = new Set(cms.hospitalsDeleted);
  return [
    ...catalogHospitals.map((h) => ({
      slug: h.slug,
      name: h.name,
      city: h.city,
      image: cms.hospitalOverrides[h.slug]?.image || h.image || "",
      deleted: deleted.has(h.slug),
      added: false,
    })),
    ...cms.hospitalsAdded.map((raw) => {
      const h = raw as Hospital;
      return {
        slug: h.slug,
        name: h.name,
        city: h.city,
        image: cms.hospitalOverrides[h.slug]?.image || h.image || "",
        deleted: deleted.has(h.slug),
        added: true,
      };
    }),
  ];
}

export function treatmentAdminRows(edition: CmsEdition = "en"): CatalogRow[] {
  const cms = loadCatalogCms(edition);
  const deleted = new Set(cms.treatmentsDeleted);
  return [
    ...catalogTreatments.map((t) => ({
      slug: t.slug,
      name: cms.treatmentOverrides[t.slug]?.name || t.name,
      category: t.category,
      image: cms.treatmentOverrides[t.slug]?.image || t.image,
      deleted: deleted.has(t.slug),
      added: false,
    })),
    ...cms.treatmentsAdded.map((raw) => {
      const t = raw as Treatment;
      return {
        slug: t.slug,
        name: cms.treatmentOverrides[t.slug]?.name || t.name,
        category: t.category,
        image: cms.treatmentOverrides[t.slug]?.image || t.image,
        deleted: deleted.has(t.slug),
        added: true,
      };
    }),
  ];
}

export function getAdminDoctor(slug: string, edition: CmsEdition = "en") {
  const cms = loadCatalogCms(edition);
  const base =
    catalogDoctors.find((d) => d.slug === slug) ||
    (cms.doctorsAdded.find((d) => (d as Doctor).slug === slug) as Doctor | undefined);
  if (!base) return null;
  return {
    ...base,
    ...pickDoctorPatch(cms.doctorOverrides[slug]),
    deleted: cms.doctorsDeleted.includes(slug),
    added: !catalogDoctors.some((d) => d.slug === slug),
  };
}

export function getAdminHospital(slug: string, edition: CmsEdition = "en") {
  const cms = loadCatalogCms(edition);
  const base =
    catalogHospitals.find((h) => h.slug === slug) ||
    (cms.hospitalsAdded.find((h) => (h as Hospital).slug === slug) as Hospital | undefined);
  if (!base) return null;
  return {
    ...base,
    ...pickHospitalPatch(cms.hospitalOverrides[slug]),
    deleted: cms.hospitalsDeleted.includes(slug),
    added: !catalogHospitals.some((h) => h.slug === slug),
  };
}

export function getAdminTreatment(slug: string, edition: CmsEdition = "en") {
  const cms = loadCatalogCms(edition);
  const base =
    catalogTreatments.find((t) => t.slug === slug) ||
    (cms.treatmentsAdded.find((t) => (t as Treatment).slug === slug) as Treatment | undefined);
  if (!base) return null;
  return {
    ...base,
    ...cms.treatmentOverrides[slug],
    deleted: cms.treatmentsDeleted.includes(slug),
    added: !catalogTreatments.some((t) => t.slug === slug),
  };
}

export function liveHospitalChoices(edition: CmsEdition = "en") {
  const cms = loadCatalogCms(edition);
  const gone = new Set(cms.hospitalsDeleted);
  const rows = [
    ...catalogHospitals,
    ...(cms.hospitalsAdded as Hospital[]),
  ].filter((h) => !gone.has(h.slug));
  return [...new Map(rows.map((h) => [h.slug, h])).values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function takenTreatmentSlugs(edition: CmsEdition = "en") {
  const cms = loadCatalogCms(edition);
  return new Set([
    ...catalogTreatments.map((t) => t.slug),
    ...cms.treatmentsAdded.map((t) => String((t as Treatment).slug)),
  ]);
}
