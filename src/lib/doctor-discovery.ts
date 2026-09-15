import type { CatalogQuery } from "@/lib/catalog-options";
import type { Doctor } from "@/lib/doctors";
import { getCostArticle } from "@/data/cost-articles";
import { listPublishedPosts } from "@/lib/blogs";
import { costPath, doctorsPath } from "@/lib/catalog-links";
import { filterDoctors } from "@/lib/catalog";
import { getTreatment } from "@/lib/treatments";
import { INDIA_CITIES, RADIATION_PROCEDURES, toSlug } from "@/lib/taxonomy";

export type DoctorListingExtras = {
  hospital?: string;
  minYears?: number;
};

export function isRadiationOncologyDiscovery(query: CatalogQuery) {
  return query.destination === "India" && query.specialty === "Radiation Oncology";
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
  if (!isRadiationOncologyDiscovery(query)) return undefined;
  const place = doctorDiscoveryPlace(query);
  if (query.procedure) {
    return `Best Radiation Oncologists for ${shortProcedureLabel(query.procedure)} in ${place}`;
  }
  return `Best Radiation Oncologists in ${place}`;
}

export function doctorDiscoveryTitle(query: CatalogQuery) {
  const heading = doctorDiscoveryHeading(query);
  if (!heading) return undefined;
  if (query.procedure) return `${heading} – Doctors & Treatment Guides`;
  if (query.city) return `${heading} – Doctors & Hospitals`;
  return `${heading} – Doctors, Hospitals & Expertise`;
}

export function doctorDiscoveryDescription(query: CatalogQuery, count: number) {
  if (!isRadiationOncologyDiscovery(query)) return undefined;
  const place = doctorDiscoveryPlace(query);
  if (query.procedure) {
    return `Review ${count} listed radiation oncologists associated with ${query.procedure} in ${place}. Inclusion is based on specialty, hospital affiliation and procedure relationships in the GAF catalog, not a clinical ranking.`;
  }
  if (query.city) {
    return `Review ${count} listed radiation oncologists in ${query.city}, India, with hospital affiliations, technique relationships and links to existing GAF treatment-cost guides.`;
  }
  return `Review ${count} listed radiation oncologists in India across Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. GAF selection uses professional catalog information, not outcome rankings.`;
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

const BLOG_PROCEDURE_HINTS: { slug: string; pattern: RegExp }[] = [
  { slug: "imrt-vs-3d-crt", pattern: /imrt|3d-crt|conformal/i },
  { slug: "when-proton-is-worth-the-flight", pattern: /proton/i },
  { slug: "srs-sbrt-and-a-short-stay", pattern: /srs|sbrt|radiosurgery|stereotactic/i },
  { slug: "brachytherapy-travel-logistics", pattern: /brachytherapy/i },
];

export function relatedDoctorBlogs(doctor: Doctor) {
  const haystack = [
    ...doctor.procedures,
    ...doctor.proceduresExpertise,
    ...doctor.specializations,
  ].join(" ");
  const posts = listPublishedPosts("en");
  return BLOG_PROCEDURE_HINTS.flatMap((hint) => {
    if (!hint.pattern.test(haystack)) return [];
    const post = posts.find((row) => row.slug === hint.slug && row.allowIndex);
    return post ? [{ slug: post.slug, title: post.title, href: `/blogs/${post.slug}` }] : [];
  });
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
  return doctorsPath({
    destination: "India",
    city,
    specialty: "Radiation Oncology",
    procedure,
  });
}

export function procedureCostHref(procedure: string) {
  return costPath(procedure);
}

export function procedureHasCostArticle(procedure: string) {
  return Boolean(getCostArticle(toSlug(procedure)));
}

export function radiationDoctorPageIndexable(
  query: CatalogQuery,
  extras: DoctorListingExtras,
  page: number,
  procedureDoctorCount: number,
) {
  if (!isRadiationOncologyDiscovery(query)) return doctorListingIsIndexable(extras, page);
  if (!doctorListingIsIndexable(extras, page)) return false;
  if (query.procedure && procedureDoctorCount < 3) return false;
  return true;
}

export function radiationOncologyDoctorSitemapPaths(rows?: Doctor[]) {
  const paths = [
    doctorsPath({ destination: "India", specialty: "Radiation Oncology" }),
  ];
  const country = filterDoctors(
    {
      destination: "India",
      specialty: "Radiation Oncology",
    },
    rows,
  );
  for (const city of INDIA_CITIES) {
    const count = country.filter((doctor) => doctor.city === city).length;
    if (count > 0) {
      paths.push(
        doctorsPath({
          destination: "India",
          city,
          specialty: "Radiation Oncology",
        }),
      );
    }
  }
  for (const procedure of RADIATION_PROCEDURES) {
    const count = country.filter(
      (doctor) => doctor.procedures.includes(procedure) || doctor.procedureSlugs.includes(toSlug(procedure)),
    ).length;
    if (count >= 3) {
      paths.push(
        doctorsPath({
          destination: "India",
          specialty: "Radiation Oncology",
          procedure,
        }),
      );
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
