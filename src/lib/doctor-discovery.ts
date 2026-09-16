import type { CatalogQuery } from "@/lib/catalog-options";
import type { Doctor } from "@/lib/doctors";
import { getCostArticle } from "@/data/cost-articles";
import { baseSpecialtyProfileFor } from "@/data/specialty-pages/base-profiles";
import { listPublishedPosts } from "@/lib/blogs";
import { costPath, doctorsPath } from "@/lib/catalog-links";
import { doctorHasProcedure, filterDoctors } from "@/lib/catalog";
import { getTreatment } from "@/lib/treatments";
import { radiationOncologyContentInventory } from "@/data/doctor-pages/radiation-oncology";
import {
  INDIA_CITIES,
  SPECIALTIES,
  getProcedure,
  getSpecialty,
  proceduresForSpecialty,
  toSlug,
} from "@/lib/taxonomy";

export const DOCTOR_PROCEDURE_INDEX_MIN = 3;
export const RADIATION_DOCTOR_INDEX_MIN = DOCTOR_PROCEDURE_INDEX_MIN;

export type DoctorListingExtras = {
  hospital?: string;
  minYears?: number;
};

export function isRadiationOncologyDiscovery(query: CatalogQuery) {
  return query.destination === "India" && query.specialty === "Radiation Oncology";
}

export function isDoctorSpecialtyDiscovery(query: CatalogQuery) {
  if (query.destination !== "India" || !query.specialty) return false;
  const specialty = getSpecialty(query.specialty);
  if (!specialty || !baseSpecialtyProfileFor(specialty.slug)) return false;
  return !query.procedure || proceduresForSpecialty(specialty.name).some(
    (procedure) => procedure.name === query.procedure,
  );
}

export function doctorSpecialtyLabels(specialtyName: string) {
  const specialty = getSpecialty(specialtyName);
  const terminology = specialty
    ? baseSpecialtyProfileFor(specialty.slug)?.terminology
    : undefined;
  return {
    singular: terminology?.practitioner ?? `${specialtyName} specialist`,
    plural: terminology?.practitioners ?? `${specialtyName} specialists`,
  };
}

function headingCase(value: string) {
  return value
    .split(/\s+/)
    .map((word) =>
      word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function doctorDiscoveryPlace(query: CatalogQuery) {
  return query.city ? `${query.city}, India` : "India";
}

export function shortProcedureLabel(procedure: string) {
  const match = procedure.match(/\(([^)]+)\)\s*$/);
  if (match) return match[1];
  return procedure.replace(/\s*\([^)]+\)\s*/g, "").trim();
}

export function doctorDiscoveryHeading(query: CatalogQuery) {
  if (!isDoctorSpecialtyDiscovery(query) || !query.specialty) return undefined;
  const place = doctorDiscoveryPlace(query);
  const { plural } = doctorSpecialtyLabels(query.specialty);
  const role = headingCase(plural);
  if (query.procedure) {
    return `Best ${role} for ${shortProcedureLabel(query.procedure)} in ${place}`;
  }
  return `Best ${role} in ${place}`;
}

export function doctorDiscoveryTitle(query: CatalogQuery) {
  const heading = doctorDiscoveryHeading(query);
  if (!heading) return undefined;
  if (query.procedure && query.city) return heading;
  if (query.procedure) return `${heading} – Doctors & Hospitals`;
  if (query.city) return `${heading} – Doctors & Hospitals`;
  return `${heading} – Doctors, Hospitals & Expertise`;
}

export function doctorDiscoveryDescription(query: CatalogQuery, count: number) {
  if (!isDoctorSpecialtyDiscovery(query) || !query.specialty) return undefined;
  const place = doctorDiscoveryPlace(query);
  const { plural } = doctorSpecialtyLabels(query.specialty);
  if (query.procedure && query.city) {
    return `Review ${count} listed ${plural} associated with ${query.procedure} in ${query.city}, India. Inclusion uses specialty, hospital affiliation and exact procedure relationships in the GAF catalog, not a clinical ranking.`;
  }
  if (query.procedure) {
    return `Review ${count} listed ${plural} associated with ${query.procedure} in ${place}. Inclusion is based on specialty, hospital affiliation and procedure relationships in the GAF catalog, not a clinical ranking.`;
  }
  if (query.city) {
    return `Review ${count} listed ${plural} in ${query.city}, India, with hospital affiliations, procedure relationships and links to existing GAF treatment-cost guides.`;
  }
  return `Review ${count} listed ${plural} in India. City and procedure counts come from the same catalog relationships used on this listing. GAF selection uses professional catalog information, not outcome rankings.`;
}

export function parseDoctorListingExtras(
  raw: Record<string, string | string[] | undefined>,
): DoctorListingExtras {
  const one = (key: string) => {
    const value = raw[key];
    const text = Array.isArray(value) ? value[0] : value;
    return text && text !== "all" ? text : undefined;
  };
  const hospital = one("hospital");
  const yearsRaw = one("experience");
  const minYears = yearsRaw ? Number.parseInt(yearsRaw, 10) : undefined;
  return {
    hospital,
    minYears: Number.isFinite(minYears) && (minYears as number) > 0 ? minYears : undefined,
  };
}

export function doctorListingIsIndexable(
  extras: DoctorListingExtras,
  page: number,
) {
  return page <= 1 && !extras.hospital && !extras.minYears;
}

export function experienceYears(doctor: Doctor) {
  const match = `${doctor.years} ${doctor.experience}`.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : undefined;
}

export function applyDoctorListingExtras(list: Doctor[], extras: DoctorListingExtras) {
  return list.filter((doctor) => {
    if (extras.hospital && doctor.hospitalSlug !== extras.hospital) return false;
    if (extras.minYears) {
      const years = experienceYears(doctor);
      if (years == null || years < extras.minYears) return false;
    }
    return true;
  });
}

export function similarDoctors(doctor: Doctor, pool: Doctor[], limit = 6) {
  const procedureSet = new Set(doctor.procedureSlugs);
  return pool
    .filter((candidate) => candidate.slug !== doctor.slug)
    .filter((candidate) => candidate.specialtySlug === doctor.specialtySlug)
    .map((candidate) => {
      let score = 0;
      if (candidate.citySlug === doctor.citySlug) score += 4;
      if (candidate.hospitalSlug === doctor.hospitalSlug) score += 3;
      score += candidate.procedureSlugs.filter((slug) => procedureSet.has(slug)).length;
      return { candidate, score };
    })
    .filter((row) => row.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.candidate.city.localeCompare(b.candidate.city) ||
        a.candidate.name.localeCompare(b.candidate.name),
    )
    .slice(0, limit)
    .map((row) => row.candidate);
}

export function relatedCostTreatments(doctor: Doctor) {
  return doctor.treatmentSlugs
    .map((slug) => getTreatment(slug))
    .filter((treatment): treatment is NonNullable<typeof treatment> => Boolean(treatment))
    .filter((treatment) => Boolean(getCostArticle(treatment.slug)))
    .map((treatment) => ({
      slug: treatment.slug,
      name: treatment.name,
      href: costPath(treatment.name),
      partnerRange: treatment.partnerRange,
    }));
}

export function relatedDoctorBlogs(doctor: Doctor) {
  const posts = listPublishedPosts("en").filter((post) => post.allowIndex);
  const tokens = new Set(
    doctor.procedures.flatMap((name) => {
      const slug = toSlug(name);
      const short = shortProcedureLabel(name).toLowerCase();
      return [slug, ...slug.split("-").filter((part) => part.length > 3), short];
    }),
  );
  return posts
    .filter((post) => {
      const hay = `${post.slug} ${post.title}`.toLowerCase();
      return [...tokens].some((token) => token && hay.includes(token));
    })
    .slice(0, 6)
    .map((post) => ({ slug: post.slug, title: post.title, href: `/blogs/${post.slug}` }));
}

export function relatedDiscoveryBlogs(procedure?: string, specialty?: string) {
  const posts = listPublishedPosts("en").filter((post) => post.allowIndex);
  if (procedure) {
    const article = getCostArticle(toSlug(procedure));
    const fromArticle = (article?.relatedBlogs ?? [])
      .map((row) =>
        posts.find(
          (post) => `/blogs/${post.slug}` === row.href || post.slug === row.href.replace(/^\/blogs\//, ""),
        ),
      )
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({ name: post.title, href: `/blogs/${post.slug}` }));
    if (fromArticle.length) return fromArticle;
    const slug = toSlug(procedure);
    const short = shortProcedureLabel(procedure).toLowerCase();
    const tokens = [slug, ...slug.split("-").filter((part) => part.length > 3), short];
    return posts
      .filter((post) => {
        const hay = `${post.slug} ${post.title}`.toLowerCase();
        return tokens.some((token) => token && hay.includes(token));
      })
      .map((post) => ({ name: post.title, href: `/blogs/${post.slug}` }));
  }
  if (specialty === "Radiation Oncology") {
    return radiationOncologyContentInventory
      .filter((row) => row.kind === "blog")
      .map((row) => posts.find((post) => `/blogs/${post.slug}` === row.url))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({ name: post.title, href: `/blogs/${post.slug}` }));
  }
  const tokens = specialty
    ? [toSlug(specialty), ...toSlug(specialty).split("-").filter((part) => part.length > 4)]
    : [];
  return posts
    .filter((post) => {
      const hay = `${post.slug} ${post.title}`.toLowerCase();
      return tokens.some((token) => hay.includes(token));
    })
    .slice(0, 6)
    .map((post) => ({ name: post.title, href: `/blogs/${post.slug}` }));
}

export function doctorProfileHeading(doctor: Doctor) {
  const role =
    doctor.specialtySlug === "radiation-oncology" ? "Radiation Oncologist" : doctor.title.split(",")[0]?.trim() || doctor.specialty;
  return `${doctor.name} — ${role} in ${doctor.city}`;
}

export function doctorProfileTitle(doctor: Doctor) {
  if (doctor.specialtySlug === "radiation-oncology") {
    return `${doctor.name} – Radiation Oncologist in ${doctor.city}`;
  }
  return `${doctor.name}, ${doctor.specialty} in ${doctor.city}, India`;
}

export function radiationProcedureDoctorPath(procedure: string, city?: string) {
  return doctorProcedurePath("Radiation Oncology", procedure, city);
}

export function doctorProcedurePath(specialty: string, procedure: string, city?: string) {
  return doctorsPath({
    destination: "India",
    city,
    specialty,
    procedure,
  });
}

export function procedureCostHref(procedure: string) {
  return costPath(procedure);
}

export function procedureHasCostArticle(procedure: string) {
  return Boolean(getCostArticle(toSlug(procedure)));
}

export function radiationDoctorCount(
  opts: { city?: string; procedure?: string },
  rows?: Doctor[],
) {
  return doctorSpecialtyCount("Radiation Oncology", opts, rows);
}

export function doctorSpecialtyCount(
  specialty: string,
  opts: { city?: string; procedure?: string },
  rows?: Doctor[],
) {
  return filterDoctors(
    {
      destination: "India",
      city: opts.city,
      specialty,
      procedure: opts.procedure,
    },
    rows,
  ).length;
}

export function radiationDoctorPageIndexable(
  query: CatalogQuery,
  extras: DoctorListingExtras,
  page: number,
  procedureDoctorCount: number,
) {
  return doctorSpecialtyPageIndexable(query, extras, page, procedureDoctorCount);
}

export function doctorSpecialtyPageIndexable(
  query: CatalogQuery,
  extras: DoctorListingExtras,
  page: number,
  procedureDoctorCount: number,
) {
  if (!isDoctorSpecialtyDiscovery(query)) return doctorListingIsIndexable(extras, page);
  if (!doctorListingIsIndexable(extras, page)) return false;
  if (procedureDoctorCount < 1) return false;
  if (query.procedure && procedureDoctorCount < DOCTOR_PROCEDURE_INDEX_MIN) return false;
  return true;
}

export function radiationOncologyDoctorSitemapPaths(rows?: Doctor[]) {
  return doctorSpecialtySitemapPaths(rows).filter((path) =>
    path.includes("/Radiation-Oncology"),
  );
}

export function doctorSpecialtySitemapPaths(rows?: Doctor[]) {
  const paths: string[] = [];
  for (const specialty of SPECIALTIES) {
    const profile = baseSpecialtyProfileFor(specialty.slug);
    if (!profile) continue;
    const country = filterDoctors(
      { destination: "India", specialty: specialty.name },
      rows,
    );
    if (country.length === 0) continue;
    paths.push(doctorsPath({ destination: "India", specialty: specialty.name }));
    for (const city of INDIA_CITIES) {
      const count = country.filter((doctor) => doctor.city === city).length;
      if (count > 0) {
        paths.push(
          doctorsPath({
            destination: "India",
            city,
            specialty: specialty.name,
          }),
        );
      }
    }
    for (const procedure of proceduresForSpecialty(specialty.name)) {
      const count = country.filter((doctor) =>
        doctorHasProcedure(doctor, procedure.name),
      ).length;
      if (count < DOCTOR_PROCEDURE_INDEX_MIN) continue;
      paths.push(
        doctorProcedurePath(specialty.name, procedure.name),
      );
      for (const city of INDIA_CITIES) {
        const cityCount = country.filter(
          (doctor) =>
            doctor.city === city &&
            doctorHasProcedure(doctor, procedure.name),
        ).length;
        if (cityCount >= DOCTOR_PROCEDURE_INDEX_MIN) {
          paths.push(
            doctorProcedurePath(specialty.name, procedure.name, city),
          );
        }
      }
    }
  }
  return paths;
}

export function doctorRelevanceCopy(doctor: Doctor) {
  const years = experienceYears(doctor);
  const procedures = doctor.procedures.slice(0, 3);
  const role =
    doctor.specialtySlug === "radiation-oncology"
      ? "radiation oncologist"
      : doctor.title.split(",")[0]?.trim() || doctor.specialty.toLowerCase();
  const experience = years ? ` with ${years} years of listed experience` : "";
  const mapped = procedures.length
    ? ` Catalog procedure relationships currently include ${procedures.join(", ")}.`
    : "";
  return `${doctor.name} is a listed ${role} at ${doctor.hospitalName} in ${doctor.city}${experience}.${mapped} Inclusion uses professional catalog information, not a clinical ranking or outcome score.`;
}

export function doctorQuickFacts(doctor: Doctor) {
  const years = experienceYears(doctor);
  return [
    ["Specialty", doctor.specialty],
    ["City", `${doctor.city}, ${doctor.country}`],
    ["Hospital", doctor.hospitalName],
    ["Experience", years ? `${years} years listed` : doctor.experience || "Listed on profile"],
    ["Qualifications", doctor.qualifications || "Listed on profile"],
    ["Languages", doctor.languages || "Listed on profile"],
  ] as [string, string][];
}

export type DoctorGraphFlag = {
  code:
    | "procedure-zero-doctors"
    | "missing-canonical-content"
    | "missing-city"
    | "missing-hospital"
    | "empty-quick-answer"
    | "duplicate-procedure-slug"
    | "inconsistent-count";
  detail: string;
};

export function validateRadiationOncologyDoctorGraph(rows?: Doctor[]): DoctorGraphFlag[] {
  const flags: DoctorGraphFlag[] = [];
  const doctors = filterDoctors({ destination: "India", specialty: "Radiation Oncology" }, rows);
  const procedures = proceduresForSpecialty("Radiation Oncology");
  const seenSlugs = new Set<string>();

  for (const procedure of procedures) {
    if (seenSlugs.has(procedure.slug)) {
      flags.push({ code: "duplicate-procedure-slug", detail: procedure.slug });
    }
    seenSlugs.add(procedure.slug);
    const count = doctors.filter((doctor) => doctorHasProcedure(doctor, procedure.name)).length;
    if (count === 0) {
      flags.push({
        code: "procedure-zero-doctors",
        detail: procedure.name,
      });
    }
    if (!getCostArticle(procedure.slug)) {
      flags.push({
        code: "missing-canonical-content",
        detail: procedure.name,
      });
    }
    const viaFilter = radiationDoctorCount({ procedure: procedure.name }, rows);
    if (viaFilter !== count) {
      flags.push({
        code: "inconsistent-count",
        detail: `${procedure.name}: filter=${viaFilter} mapping=${count}`,
      });
    }
  }

  for (const doctor of doctors) {
    if (!doctor.city) flags.push({ code: "missing-city", detail: doctor.slug });
    if (!doctor.hospitalSlug) flags.push({ code: "missing-hospital", detail: doctor.slug });
    for (const slug of doctor.procedureSlugs) {
      const taxon = getProcedure(slug);
      if (
        taxon &&
        !taxon.specialtySlugs.includes("radiation-oncology") &&
        doctor.specialtySlug === "radiation-oncology"
      ) {
        flags.push({
          code: "inconsistent-count",
          detail: `${doctor.slug} maps ${slug} outside radiation oncology`,
        });
      }
    }
  }

  return flags;
}
