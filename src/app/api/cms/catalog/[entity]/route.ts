import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";
import { slugify } from "@/lib/cms/types";
import { catalogDoctors, type Doctor } from "@/lib/doctors";
import { catalogHospitals, type Hospital } from "@/lib/hospitals";
import { catalogTreatments, type Treatment } from "@/lib/treatments";
import { getHospital } from "@/lib/server-catalog";
import { getCity, getCountry, getProcedure, getSpecialty, PROCEDURES } from "@/lib/taxonomy";

type Entity = "doctors" | "hospitals" | "treatments";

function asEntity(value: string): Entity | null {
  if (value === "doctors" || value === "hospitals" || value === "treatments") return value;
  return null;
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request, ctx: { params: Promise<{ entity: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const entity = asEntity((await ctx.params).entity);
  if (!entity) return jsonError("Unknown catalog.");
  const cms = loadCatalogCms(editionFromRequest(request));
  if (entity === "doctors") {
    const deleted = new Set(cms.doctorsDeleted);
    const rows = [
      ...catalogDoctors.map((d) => ({
        slug: d.slug,
        name: d.name,
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
          name: d.name,
          city: d.city,
          specialty: d.specialty,
          hospitalName: d.hospitalName,
          image: cms.doctorOverrides[d.slug]?.image || d.image || "",
          deleted: deleted.has(d.slug),
          added: true,
        };
      }),
    ];
    return NextResponse.json(rows);
  }
  if (entity === "hospitals") {
    const deleted = new Set(cms.hospitalsDeleted);
    const rows = [
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
    return NextResponse.json(rows);
  }
  const deleted = new Set(cms.treatmentsDeleted);
  const rows = [
    ...catalogTreatments.map((t) => ({
      slug: t.slug,
      name: t.name,
      category: t.category,
      image: cms.treatmentOverrides[t.slug]?.image || t.image,
      deleted: deleted.has(t.slug),
      added: false,
    })),
    ...cms.treatmentsAdded.map((raw) => {
      const t = raw as Treatment;
      return {
        slug: t.slug,
        name: t.name,
        category: t.category,
        image: cms.treatmentOverrides[t.slug]?.image || t.image,
        deleted: deleted.has(t.slug),
        added: true,
      };
    }),
  ];
  return NextResponse.json(rows);
}

export async function POST(request: Request, ctx: { params: Promise<{ entity: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const entity = asEntity((await ctx.params).entity);
  if (!entity) return jsonError("Unknown catalog.");
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return jsonError("Invalid body.");
  try {
    const edition = editionFromRequest(request);
    const cms = loadCatalogCms(edition);
    if (entity === "doctors") {
      const hospital = getHospital(body.hospitalSlug || "");
      const specialty = getSpecialty(body.specialty || "");
      if (!hospital || !specialty) return jsonError("Choose an existing hospital and specialty.");
      const city = getCity(hospital.city);
      const country = getCountry(hospital.country);
      if (!city || !country) return jsonError("Hospital city is not in the taxonomy.");
      let slug = slugify(body.name || "consultant");
      const taken = new Set([
        ...catalogDoctors.map((d) => d.slug),
        ...cms.doctorsAdded.map((d) => String((d as Doctor).slug)),
      ]);
      let n = 2;
      while (taken.has(slug)) {
        slug = `${slugify(body.name || "consultant")}-${n}`;
        n += 1;
      }
      const procs = PROCEDURES.filter((p) => p.specialtySlugs.includes(specialty.slug)).slice(0, 8);
      const doctor: Doctor = {
        slug,
        name: body.name || "Untitled consultant",
        title: body.title || specialty.name,
        qualifications: body.qualifications || "",
        featured: false,
        hospitalSlug: hospital.slug,
        hospitalName: hospital.name,
        specialty: specialty.name,
        specialtySlug: specialty.slug,
        procedures: procs.map((p) => p.name),
        procedureSlugs: procs.map((p) => p.slug),
        treatmentSlugs: procs.map((p) => p.slug),
        proceduresExpertise: procs.map((p) => p.name),
        specializations: [specialty.name],
        education: [],
        affiliations: [hospital.name],
        memberships: [],
        awards: [],
        research: [],
        city: city.name,
        citySlug: city.slug,
        country: country.name,
        countrySlug: country.slug,
        credentials: body.qualifications || "",
        languages: hospital.languages,
        years: body.experience || "",
        experience: body.experience || "",
        bio: body.bio || "",
        image: body.image || "",
        imageAlt: body.imageAlt || body.name || "",
      };
      cms.doctorsAdded.unshift(doctor);
      saveCatalogCms(cms, edition);
      return NextResponse.json(doctor);
    }
    if (entity === "hospitals") {
      const city = getCity(body.city || "");
      const country = getCountry("India");
      const specialty = getSpecialty(body.specialty || "Radiation Oncology");
      if (!city || !country || !specialty) return jsonError("Choose a listed India city and specialty.");
      let slug = slugify(body.name || "campus");
      const taken = new Set([
        ...catalogHospitals.map((h) => h.slug),
        ...cms.hospitalsAdded.map((h) => String((h as Hospital).slug)),
      ]);
      let n = 2;
      while (taken.has(slug)) {
        slug = `${slugify(body.name || "campus")}-${n}`;
        n += 1;
      }
      const procs = PROCEDURES.filter((p) => p.specialtySlugs.includes(specialty.slug));
      const hospital: Hospital = {
        slug,
        name: body.name || "Untitled campus",
        city: city.name,
        citySlug: city.slug,
        country: country.name,
        countrySlug: country.slug,
        accreditation: body.accreditation || "NABH",
        focus: specialty.name,
        specialty: specialty.name,
        specialtySlug: specialty.slug,
        specialties: [specialty.name],
        specialtySlugs: [specialty.slug],
        procedures: procs.map((p) => p.name),
        procedureSlugs: procs.map((p) => p.slug),
        established: body.established || "",
        beds: body.beds || "",
        languages: "English, Hindi",
        icu: "ICU",
        bio: body.bio || "",
        summary: body.bio || "",
        image: body.image || "",
        imageAlt: body.imageAlt || body.name || "",
      };
      cms.hospitalsAdded.unshift(hospital);
      saveCatalogCms(cms, edition);
      return NextResponse.json(hospital);
    }
    const procedure = getProcedure(body.procedure || body.name || "");
    if (!procedure) return jsonError("Choose an existing procedure from the taxonomy.");
    if (catalogTreatments.some((t) => t.slug === procedure.slug) || cms.treatmentsAdded.some((t) => (t as Treatment).slug === procedure.slug)) {
      return jsonError("That cost sheet already exists.");
    }
    const sibling = catalogTreatments.find((t) => t.specialtySlugs.includes(procedure.specialtySlugs[0] || t.specialtySlug));
    const treatment: Treatment = {
      slug: procedure.slug,
      name: procedure.name,
      category: sibling?.category || procedure.specialtySlug,
      specialtySlug: procedure.specialtySlug,
      specialtySlugs: procedure.specialtySlugs,
      procedureSlug: procedure.slug,
      summary: body.summary || `${procedure.name} planning range for travelling patients.`,
      image: body.image || sibling?.image || "",
      usRange: body.usRange || sibling?.usRange || "",
      partnerRange: body.partnerRange || sibling?.partnerRange || "",
      stay: body.stay || sibling?.stay || "",
      hospitalSlugs: sibling?.hospitalSlugs || catalogHospitals.map((h) => h.slug).slice(0, 8),
      conditions: sibling?.conditions || [],
      procedures: [procedure.name],
      includes: sibling?.includes || [],
      notes: body.notes || sibling?.notes || "",
      blocks: [],
      replaceGuide: false,
    };
    cms.treatmentsAdded.unshift(treatment);
    saveCatalogCms(cms, edition);
    return NextResponse.json(treatment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not add.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
