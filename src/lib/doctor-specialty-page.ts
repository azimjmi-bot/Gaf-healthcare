import {
  RADIATION_ONCOLOGY_SELECTION_NOTE,
  radiationOncologyCityNotes,
  radiationOncologyDoctorMethodology,
  radiationOncologyHowToChoose,
} from "@/data/doctor-pages/radiation-oncology";
import {
  applyDoctorListingExtras,
  doctorDiscoveryDescription,
  doctorDiscoveryHeading,
  doctorDiscoveryTitle,
  isRadiationOncologyDiscovery,
  procedureCostHref,
  procedureHasCostArticle,
  radiationDoctorCount,
  radiationProcedureDoctorPath,
  relatedDiscoveryBlogs,
  RADIATION_DOCTOR_INDEX_MIN,
  type DoctorListingExtras,
} from "@/lib/doctor-discovery";
import {
  cityFaqExtras,
  discoveryQuickAnswers,
  mappedConditionsForProcedure,
  procedureDefinitionFromCanonical,
  relatedProcedureNames,
  specialtyConditionLinks,
  specialtyGuideQuickAnswers,
  type QuickAnswerItem,
} from "@/lib/doctor-quick-answers";
import {
  citiesForDestination,
  filterDoctors,
  filterHospitalsForDoctors,
  type CatalogQuery,
} from "@/lib/catalog";
import { costsFilterPath, doctorsPath } from "@/lib/catalog-links";
import { paginateDoctors } from "@/lib/doctors";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { treatments } from "@/lib/treatments";
import { getCity, proceduresForSpecialty } from "@/lib/taxonomy";

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
  quickAnswers: QuickAnswerItem[];
  mainArticleAnswers: QuickAnswerItem[];
  relatedProcedures: DoctorHubLink[];
  treatmentGuides: DoctorHubLink[];
  aboutProcedure?: { definition: string; guideHref?: string; guideLabel?: string };
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

function radiationProcedureNames() {
  return proceduresForSpecialty("Radiation Oncology").map((row) => row.name);
}

function buildDiscoveryFaqs(opts: {
  count: number;
  cities: { name: string; count: number }[];
  hospitals: { hospital: Hospital; count: number }[];
  procedures: { name: string; count?: number }[];
  cityName?: string;
  procedure?: string;
  costHref?: string;
}): { q: string; a: string }[] {
  const cityClause = opts.cityName ? opts.cityName : "India";
  const cityList = opts.cities
    .filter((row) => row.count > 0)
    .map((row) => `${row.name} (${row.count})`)
    .join(", ");
  const hospitalList = opts.hospitals
    .slice(0, 6)
    .map((row) => row.hospital.name)
    .join(", ");
  const procedureList = opts.procedures
    .filter((row) => (row.count ?? 0) > 0)
    .map((row) => row.name)
    .slice(0, 8)
    .join(", ");

  if (opts.procedure) {
    const faqs = [
      {
        q: `What is ${opts.procedure}?`,
        a: `The concise definition on this page is taken from the existing GAF ${opts.procedure} guide. It is not a second full-length article. Open the treatment guide for technique, indications and planning detail.`,
      },
      {
        q: `Which radiation oncologists offer ${opts.procedure}?`,
        a: `${opts.count} listed radiation oncologists currently have an exact ${opts.procedure} procedure relationship in ${cityClause}. Cards appear only when that mapping exists in the catalog; specialty alone is not enough.`,
      },
      {
        q: `Which hospitals offer ${opts.procedure}?`,
        a: hospitalList
          ? `Current catalog relationships for ${opts.procedure} in ${cityClause} include ${hospitalList}. Confirm the treating campus in writing; a hospital name is not a machine inventory.`
          : `No hospital currently has a listed radiation oncologist mapped to ${opts.procedure} in ${cityClause}.`,
      },
      {
        q: `Which Indian cities have doctors associated with ${opts.procedure}?`,
        a: cityList
          ? `Listed ${opts.procedure} relationships currently appear in ${cityList}. City counts use the same doctor-procedure mapping as this page.`
          : `No city currently has a listed ${opts.procedure} doctor relationship in this catalog.`,
      },
    ];
    if (opts.costHref) {
      faqs.push({
        q: `What is the cost of ${opts.procedure}?`,
        a: `GAF does not invent a doctor-specific price on this listing. Use the existing ${opts.procedure} cost guide for planning ranges, then request a written estimate after records review.`,
      });
    }
    faqs.push({
      q: `How can I compare radiation oncologists for ${opts.procedure}?`,
      a: "Compare listed specialists on experience, qualifications, hospital, city and documented procedure relationships. Comparison is not a statement of medical superiority.",
    });
    return faqs;
  }

  return [
    {
      q: "What is Radiation Oncology?",
      a: "The quick answer on this page is summarised from GAF Healthcare’s Radiation Oncology treatment guide. That guide remains the canonical article for disease context, techniques and planning.",
    },
    {
      q: "What does a Radiation Oncologist do?",
      a: "A radiation oncologist assesses whether radiation is appropriate, defines intent, prescribes dose and fractionation, and manages treatment-related effects. The specialty guide explains planning, simulation and follow-up without ranking individual doctors.",
    },
    {
      q: `How do I find Radiation Oncologists in ${cityClause}?`,
      a: `${opts.count} catalog records currently match this ${cityClause} listing. Filter by city, hospital or documented procedure. “Best” is the discovery heading for that search intent, not a clinical ranking.`,
    },
    {
      q: `Which cities in India have Radiation Oncology specialists?`,
      a: cityList
        ? `Listed specialists currently appear in ${cityList}. Counts are directory facts, not quality scores.`
        : "No city currently has a listed radiation oncologist in this catalog.",
    },
    {
      q: "Which Radiation Oncology procedures are available?",
      a: procedureList
        ? `The catalog currently maps radiation oncologists to ${procedureList}. Procedure pages are published only when enough exact doctor relationships exist.`
        : "No Radiation Oncology procedure currently has a mapped doctor relationship.",
    },
    {
      q: "Which hospitals have Radiation Oncologists?",
      a: hospitalList
        ? `Hospitals with current listings include ${hospitalList}. A hospital profile remains the canonical campus page.`
        : "No hospital currently has a listed radiation oncologist for these filters.",
    },
    {
      q: "How can I compare Radiation Oncologists?",
      a: "Use the compare tray to place two to four listed specialists side by side on experience, qualifications, hospital, city and mapped techniques. Comparison uses catalog fields only.",
    },
  ];
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
  const cityNames = citiesForDestination("India");
  const cities = cityNames
    .map((name) => {
      const count = countryDoctors.filter((doctor) => doctor.city === name).length;
      const cityProcedureIndexable = Boolean(query.procedure) && count >= RADIATION_DOCTOR_INDEX_MIN;
      return {
        name,
        slug: getCity(name)?.slug ?? name,
        count,
        href: doctorsPath({
          destination: "India",
          city: name,
          specialty: "Radiation Oncology",
          procedure: cityProcedureIndexable ? query.procedure : undefined,
        }),
      };
    })
    .filter((row) => row.count > 0);

  const taxonomyProcedures = radiationProcedureNames();
  const procedurePool = query.procedure ? [query.procedure] : taxonomyProcedures;
  const procedures = procedurePool
    .map((name) => {
      const count = radiationDoctorCount({ city: query.city, procedure: name }, rows);
      const cityProcedureIndexable = Boolean(query.city) && count >= RADIATION_DOCTOR_INDEX_MIN;
      return {
        name,
        href: radiationProcedureDoctorPath(name, cityProcedureIndexable ? query.city : undefined),
        count,
        note: procedureDefinitionFromCanonical(name)?.text,
      };
    })
    .filter((row) => (query.procedure ? true : (row.count ?? 0) >= RADIATION_DOCTOR_INDEX_MIN));

  const relatedProcedures = (query.procedure ? relatedProcedureNames(query.procedure, "Radiation Oncology") : [])
    .map((name) => ({
      name,
      href: radiationProcedureDoctorPath(name, query.city),
      count: radiationDoctorCount({ city: query.city, procedure: name }, rows),
      note: procedureDefinitionFromCanonical(name)?.text,
    }))
    .filter((row) => (row.count ?? 0) >= 1);

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

  const blogs = relatedDiscoveryBlogs(query.procedure);
  const treatmentGuides: DoctorHubLink[] = [
    {
      name: "Radiation Oncology treatment guide",
      href: costsFilterPath({ destination: "India", specialty: "Radiation Oncology" }),
      note: "Canonical specialty article",
    },
  ];
  if (query.procedure && procedureHasCostArticle(query.procedure)) {
    treatmentGuides.push({
      name: `${query.procedure} treatment guide`,
      href: procedureCostHref(query.procedure),
      note: "Canonical technique article",
    });
  }
  if (cityNote?.existingHub) {
    treatmentGuides.push({
      name: `${query.city} radiation oncology city guide`,
      href: cityNote.existingHub,
      note: "Canonical city specialty article",
    });
  }

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
  const procedureSource = query.procedure ? procedureDefinitionFromCanonical(query.procedure) : undefined;

  const path = doctorsPath({
    destination: "India",
    city: query.city,
    specialty: "Radiation Oncology",
    procedure: query.procedure,
  });

  const intro = query.procedure
    ? [
        procedureSource?.text ??
          `${query.procedure} listings use exact catalog procedure relationships. A technique explanation belongs on the existing treatment guide when one exists.`,
        `${matched.length} radiation oncologists currently carry this procedure mapping in ${query.city ?? "India"}. That count is directory evidence, not a claim that every listed clinician currently accepts every case.`,
        city && cityNote
          ? `${cityNote.intro} ${cityNote.logistics}`
          : RADIATION_ONCOLOGY_SELECTION_NOTE,
      ]
    : city
      ? [
          cityNote?.intro ?? `${matched.length} listed radiation oncologists currently appear for ${city.name}.`,
          cityNote?.logistics ?? "Confirm the treating campus before booking lodging.",
          `${matched.length} specialists and ${hospitals.length} hospitals currently match this city and specialty filter. ${RADIATION_ONCOLOGY_SELECTION_NOTE}`,
        ]
      : [
          "This page is GAF Healthcare’s India directory of listed radiation oncologists — the commercial entry point for patients searching for specialists by city, hospital and radiation technique.",
          `${matched.length} catalog records currently span ${cities.length} cities and ${hospitals.length} hospitals. Use the Radiation Oncology treatment guide for disease and technique context; this page does not rewrite that article.`,
          RADIATION_ONCOLOGY_SELECTION_NOTE,
        ];

  const conditionLinks: DoctorHubLink[] = query.procedure
    ? mappedConditionsForProcedure(query.procedure, "Radiation Oncology")
    : specialtyConditionLinks("Radiation Oncology");

  const faqProcedures = query.procedure
    ? procedures
    : taxonomyProcedures.map((name) => ({
        name,
        count: radiationDoctorCount({ city: query.city, procedure: name }, rows),
      }));

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
    faqs: [
      ...buildDiscoveryFaqs({
        count: matched.length,
        cities,
        hospitals,
        procedures: faqProcedures,
        cityName: query.city,
        procedure: query.procedure,
        costHref:
          query.procedure && procedureHasCostArticle(query.procedure)
            ? procedureCostHref(query.procedure)
            : undefined,
      }),
      ...cityFaqExtras("Radiation Oncology", city?.slug),
    ],
    quickAnswers: discoveryQuickAnswers({
      specialty: "Radiation Oncology",
      cityName: query.city,
      citySlug: city?.slug,
      procedure: query.procedure,
      doctorCount: matched.length,
      cityCount: cities.length,
      hospitalCount: hospitals.length,
      cityNames: cities.map((row) => row.name),
    }),
    mainArticleAnswers:
      !query.city && !query.procedure
        ? specialtyGuideQuickAnswers("Radiation Oncology")
        : [],
    relatedProcedures,
    treatmentGuides,
    aboutProcedure: query.procedure
      ? {
          definition: procedureSource?.text ?? "",
          guideHref: procedureSource?.source.canonicalUrl,
          guideLabel: `Read the complete ${query.procedure} Treatment Guide`,
        }
      : undefined,
    specialtyCostHref,
    cityCostHref,
    cities,
    procedures,
    conditions: conditionLinks,
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
