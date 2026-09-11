import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";
import { pickDoctorPatch, pickHospitalPatch, type DoctorPatch, type HospitalPatch, type TreatmentPatch } from "@/lib/cms/catalog-types";
import { catalogDoctors, type Doctor } from "@/lib/doctors";
import { catalogHospitals, type Hospital } from "@/lib/hospitals";
import { catalogTreatments, type Treatment } from "@/lib/treatments";

type Entity = "doctors" | "hospitals" | "treatments";

function asEntity(value: string): Entity | null {
  if (value === "doctors" || value === "hospitals" || value === "treatments") return value;
  return null;
}

export async function GET(request: Request, ctx: { params: Promise<{ entity: string; slug: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { entity: raw, slug } = await ctx.params;
  const entity = asEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown catalog." }, { status: 400 });
  const cms = loadCatalogCms(editionFromRequest(request));
  if (entity === "doctors") {
    const base =
      catalogDoctors.find((d) => d.slug === slug) ||
      (cms.doctorsAdded.find((d) => (d as Doctor).slug === slug) as Doctor | undefined);
    if (!base) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...base,
      ...pickDoctorPatch(cms.doctorOverrides[slug]),
      deleted: cms.doctorsDeleted.includes(slug),
      added: !catalogDoctors.some((d) => d.slug === slug),
    });
  }
  if (entity === "hospitals") {
    const base =
      catalogHospitals.find((h) => h.slug === slug) ||
      (cms.hospitalsAdded.find((h) => (h as Hospital).slug === slug) as Hospital | undefined);
    if (!base) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...base,
      ...pickHospitalPatch(cms.hospitalOverrides[slug]),
      deleted: cms.hospitalsDeleted.includes(slug),
      added: !catalogHospitals.some((h) => h.slug === slug),
    });
  }
  const base =
    catalogTreatments.find((t) => t.slug === slug) ||
    (cms.treatmentsAdded.find((t) => (t as Treatment).slug === slug) as Treatment | undefined);
  if (!base) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...base,
    ...cms.treatmentOverrides[slug],
    deleted: cms.treatmentsDeleted.includes(slug),
    added: !catalogTreatments.some((t) => t.slug === slug),
  });
}

export async function PUT(request: Request, ctx: { params: Promise<{ entity: string; slug: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { entity: raw, slug } = await ctx.params;
  const entity = asEntity(raw);
  const patch = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!entity || !patch) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  try {
    const edition = editionFromRequest(request);
    const cms = loadCatalogCms(edition);
    if (entity === "doctors") {
      const prevDoctor = pickDoctorPatch(cms.doctorOverrides[slug]);
      const next: DoctorPatch = pickDoctorPatch({
        ...prevDoctor,
        bio: typeof patch.bio === "string" ? patch.bio : prevDoctor.bio,
        image: typeof patch.image === "string" ? patch.image : prevDoctor.image,
        imageAlt: typeof patch.imageAlt === "string" ? patch.imageAlt : prevDoctor.imageAlt,
        name: typeof patch.name === "string" ? patch.name : prevDoctor.name,
        title: typeof patch.title === "string" ? patch.title : prevDoctor.title,
        qualifications:
          typeof patch.qualifications === "string" ? patch.qualifications : prevDoctor.qualifications,
        experience: typeof patch.experience === "string" ? patch.experience : prevDoctor.experience,
      });
      cms.doctorOverrides[slug] = next;
      const addedIndex = cms.doctorsAdded.findIndex((d) => (d as Doctor).slug === slug);
      if (addedIndex >= 0) {
        const existing = cms.doctorsAdded[addedIndex] as Doctor;
        cms.doctorsAdded[addedIndex] = { ...existing, ...next, slug: existing.slug };
      }
      saveCatalogCms(cms, edition);
      return NextResponse.json({ ok: true, slug, ...next });
    }
    if (entity === "hospitals") {
      const prevHospital = pickHospitalPatch(cms.hospitalOverrides[slug]);
      const bio = typeof patch.bio === "string" ? patch.bio : prevHospital.bio;
      const next: HospitalPatch = pickHospitalPatch({
        ...prevHospital,
        bio,
        summary: bio ?? prevHospital.summary,
        image: typeof patch.image === "string" ? patch.image : prevHospital.image,
        imageAlt: typeof patch.imageAlt === "string" ? patch.imageAlt : prevHospital.imageAlt,
      });
      cms.hospitalOverrides[slug] = next;
      const addedIndex = cms.hospitalsAdded.findIndex((h) => (h as Hospital).slug === slug);
      if (addedIndex >= 0) {
        const existing = cms.hospitalsAdded[addedIndex] as Hospital;
        cms.hospitalsAdded[addedIndex] = { ...existing, ...next, slug: existing.slug };
      }
      saveCatalogCms(cms, edition);
      return NextResponse.json({ ok: true, slug, ...next });
    }
    const includes = Array.isArray(patch.includes)
      ? patch.includes.map(String)
      : cms.treatmentOverrides[slug]?.includes;
    const conditions = Array.isArray(patch.conditions)
      ? patch.conditions.map(String)
      : cms.treatmentOverrides[slug]?.conditions;
    const hospitalSlugs = Array.isArray(patch.hospitalSlugs)
      ? patch.hospitalSlugs.map(String)
      : cms.treatmentOverrides[slug]?.hospitalSlugs;
    const next: TreatmentPatch = {
      ...cms.treatmentOverrides[slug],
      name: typeof patch.name === "string" ? patch.name : cms.treatmentOverrides[slug]?.name,
      summary: typeof patch.summary === "string" ? patch.summary : cms.treatmentOverrides[slug]?.summary,
      notes: typeof patch.notes === "string" ? patch.notes : cms.treatmentOverrides[slug]?.notes,
      usRange: typeof patch.usRange === "string" ? patch.usRange : cms.treatmentOverrides[slug]?.usRange,
      partnerRange:
        typeof patch.partnerRange === "string" ? patch.partnerRange : cms.treatmentOverrides[slug]?.partnerRange,
      stay: typeof patch.stay === "string" ? patch.stay : cms.treatmentOverrides[slug]?.stay,
      image: typeof patch.image === "string" ? patch.image : cms.treatmentOverrides[slug]?.image,
      includes,
      conditions,
      hospitalSlugs,
      blocks: Array.isArray(patch.blocks) ? (patch.blocks as TreatmentPatch["blocks"]) : cms.treatmentOverrides[slug]?.blocks,
      replaceGuide:
        typeof patch.replaceGuide === "boolean" ? patch.replaceGuide : cms.treatmentOverrides[slug]?.replaceGuide,
    };
    cms.treatmentOverrides[slug] = next;
    const addedIndex = cms.treatmentsAdded.findIndex((t) => (t as Treatment).slug === slug);
    if (addedIndex >= 0) {
      cms.treatmentsAdded[addedIndex] = { ...(cms.treatmentsAdded[addedIndex] as object), ...next };
    }
    saveCatalogCms(cms, edition);
    return NextResponse.json({ ok: true, slug, ...next });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: { params: Promise<{ entity: string; slug: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { entity: raw, slug } = await ctx.params;
  const entity = asEntity(raw);
  if (!entity) return NextResponse.json({ error: "Unknown catalog." }, { status: 400 });
  try {
    const edition = editionFromRequest(request);
    const cms = loadCatalogCms(edition);
    const key =
      entity === "doctors" ? "doctorsDeleted" : entity === "hospitals" ? "hospitalsDeleted" : "treatmentsDeleted";
    const addedKey =
      entity === "doctors" ? "doctorsAdded" : entity === "hospitals" ? "hospitalsAdded" : "treatmentsAdded";
    const already = cms[key].includes(slug);
    if (already) {
      cms[key] = cms[key].filter((s) => s !== slug);
      cms[addedKey] = cms[addedKey].filter((row) => String((row as { slug?: string }).slug) !== slug);
      if (entity === "doctors") delete cms.doctorOverrides[slug];
      if (entity === "hospitals") delete cms.hospitalOverrides[slug];
      if (entity === "treatments") delete cms.treatmentOverrides[slug];
    } else if (!cms[key].includes(slug)) {
      cms[key].push(slug);
    }
    saveCatalogCms(cms, edition);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

