import {
  RADIATION_ONCOLOGY_SELECTION_NOTE,
  radiationOncologyCityNotes,
  radiationOncologyConditionLinks,
  radiationOncologyDoctorMethodology,
  radiationOncologyHowToChoose,
  radiationOncologyIndiaFaqs,
  radiationOncologyProcedureBlurbs,
} from "@/data/doctor-pages/radiation-oncology";
import { listPublishedPosts } from "@/lib/blogs";
import {
  applyDoctorListingExtras,
  doctorDiscoveryDescription,
  doctorDiscoveryHeading,
  doctorDiscoveryTitle,
  isRadiationOncologyDiscovery,
  procedureCostHref,
  procedureHasCostArticle,
  radiationProcedureDoctorPath,
  type DoctorListingExtras,
} from "@/lib/doctor-discovery";
import {
  filterDoctors,
  filterHospitalsForDoctors,
  type CatalogQuery,
} from "@/lib/catalog";
import { costsFilterPath, doctorsPath } from "@/lib/catalog-links";
import { paginateDoctors } from "@/lib/doctors";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { treatments } from "@/lib/treatments";
import { getCity, RADIATION_PROCEDURES, toSlug } from "@/lib/taxonomy";

export type DoctorHubLink = { name: string; href: string; count?: number; note?: string };

export type DoctorSpecialtyHubData = {
  heading: string;
  title: string;
  description: string;
  path: string;
  place: string;
  cityName?: string;
  citySlug?: string;
  procedure?: string;
  selectionNote: string;
  methodology: { question: string; answer: string };
  intro: string[];
  howToChoose: string[];
  faqs: { q: string; a: string }[];
  specialtyCostHref: string;
  cityCostHref?: string;
  cities: { name: string; slug: string; count: number; href: string }[];
  procedures: DoctorHubLink[];
  conditions: DoctorHubLink[];
  costs: DoctorHubLink[];
  blogs: DoctorHubLink[];
  hospitals: { hospital: Hospital; count: number }[];
  doctors: Doctor[];
  paging: ReturnType<typeof paginateDoctors>;
  featuredCount: number;
  hospitalFilterOptions: { slug: string; name: string; count: number }[];
  extras: DoctorListingExtras;
  cityChipStats: { total: number; counts: Record<string, number> };
};

export function shouldRenderRadiationDoctorHub(query: CatalogQuery) {
  return isRadiationOncologyDiscovery(query);
}

export function buildRadiationDoctorHub(
  query: CatalogQuery,
  extras: DoctorListingExtras = {},
  page = 1,
  rows?: Doctor[],
): DoctorSpecialtyHubData | undefined {
  if (!shouldRenderRadiationDoctorHub(query)) return undefined;
  const scoped = filterDoctors(query, rows);
  const matched = applyDoctorListingExtras(scoped, extras);
  const paging = paginateDoctors(matched, page);
  const heading = doctorDiscoveryHeading(query);
  const title = doctorDiscoveryTitle(query);
  if (!heading || !title) return undefined;

  const city = query.city ? getCity(query.city) : undefined;
  const cityNote = city ? radiationOncologyCityNotes[city.slug] : undefined;
  const specialtyCostHref = costsFilterPath({
    destination: "India",
    city: query.city,
    specialty: "Radiation Oncology",
  });
  const countryDoctors = filterDoctors(
    { destination: "India", specialty: "Radiation Oncology", procedure: query.procedure },
    rows,
  );
  const cities = ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"].map((name) => {
    const count = countryDoctors.filter((doctor) => doctor.city === name).length;
    return {
      name,
      slug: toSlug(name),
      count,
      href: doctorsPath({ destination: "India", city: name, specialty: "Radiation Oncology" }),
    };
  });

  const procedurePool = query.procedure ? [query.procedure] : [...RADIATION_PROCEDURES];
  const procedures = procedurePool
    .map((name) => ({
      name,
      href: radiationProcedureDoctorPath(name, query.city),
        count: filterDoctors(
        {
          destination: "India",
          city: query.city,
          specialty: "Radiation Oncology",
          procedure: name,
        },
        rows,
      ).length,
      note: radiationOncologyProcedureBlurbs[name],
    }))
    .filter((row) => (query.procedure ? true : row.count >= 3));

  const costTreatments = treatments.filter((treatment) =>
    treatment.specialtySlugs.includes("radiation-oncology"),
  );
  const costs = (query.procedure ? costTreatments.filter((row) => row.name === query.procedure) : costTreatments)
    .filter((treatment) => procedureHasCostArticle(treatment.name))
    .map((treatment) => ({
      name: treatment.name,
      href: procedureCostHref(treatment.name),
      note: treatment.partnerRange,
    }));

  const blogs = listPublishedPosts("en")
    .filter((post) => post.allowIndex)
    .filter((post) =>
      /imrt|3d-crt|proton|srs|sbrt|brachytherapy|radiation/i.test(`${post.slug} ${post.title}`),
    )
    .map((post) => ({ name: post.title, href: `/blogs/${post.slug}` }));

  const hospitals = filterHospitalsForDoctors(
    { destination: "India", city: query.city, specialty: "Radiation Oncology" },
    scoped,
  )
    .map((hospital) => ({
      hospital,
      count: scoped.filter((doctor) => doctor.hospitalSlug === hospital.slug).length,
    }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.hospital.name.localeCompare(b.hospital.name));

  const cityCostHref = cityNote?.existingHub;

  const path = doctorsPath({
    destination: "India",
    city: query.city,
    specialty: "Radiation Oncology",
    procedure: query.procedure,
  });

  const intro = query.procedure
    ? [
        radiationOncologyProcedureBlurbs[query.procedure] ??
          `${query.procedure} is listed from exact catalog procedure relationships. Read the existing cost guide for technique and planning ranges rather than a second article here.`,
        `${matched.length} radiation oncologists currently carry this procedure mapping in ${query.city ?? "India"}. That count is directory evidence, not a claim that every listed clinician currently accepts every case.`,
        RADIATION_ONCOLOGY_SELECTION_NOTE,
      ]
    : city
      ? [
          cityNote?.intro ?? `${matched.length} listed radiation oncologists currently appear for ${city.name}.`,
          cityNote?.logistics ?? "Confirm the treating campus before booking lodging.",
          `${matched.length} specialists and ${hospitals.length} hospitals currently match this city and specialty filter. ${RADIATION_ONCOLOGY_SELECTION_NOTE}`,
        ]
      : [
          "This page is GAF Healthcare’s India directory of listed radiation oncologists — the commercial entry point for patients searching for specialists by city, hospital and radiation technique.",
          `${matched.length} catalog records currently span ${cities.filter((row) => row.count > 0).length} cities and ${hospitals.length} hospitals. Use the Radiation Oncology treatment guide for disease and technique context; this page does not rewrite that article.`,
          RADIATION_ONCOLOGY_SELECTION_NOTE,
        ];

  return {
    heading,
    title,
    description: doctorDiscoveryDescription(query, scoped.length) ?? "",
    path,
    place: query.city ? `${query.city}, India` : "India",
    cityName: query.city,
    citySlug: city?.slug,
    procedure: query.procedure,
    selectionNote: RADIATION_ONCOLOGY_SELECTION_NOTE,
    methodology: radiationOncologyDoctorMethodology,
    intro,
    howToChoose: radiationOncologyHowToChoose,
    faqs: radiationOncologyIndiaFaqs.map((faq) =>
      query.city
        ? {
            q: faq.q.replace("in India?", `in ${query.city}?`).replace("in India", `in ${query.city}`),
            a: faq.a,
          }
        : faq,
    ),
    specialtyCostHref,
    cityCostHref,
    cities,
    procedures,
    conditions: query.procedure ? [] : radiationOncologyConditionLinks,
    costs,
    blogs,
    hospitals,
    doctors: matched,
    paging,
    featuredCount: matched.filter((doctor) => doctor.featured).length,
    hospitalFilterOptions: hospitals.map((row) => ({
      slug: row.hospital.slug,
      name: row.hospital.name,
      count: row.count,
    })),
    extras,
    cityChipStats: {
      total: countryDoctors.length,
      counts: Object.fromEntries(cities.map((row) => [row.name, row.count])),
    },
  };
}
