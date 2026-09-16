import {
  RADIATION_ONCOLOGY_SELECTION_NOTE,
  radiationOncologyCityNotes,
} from "@/data/doctor-pages/radiation-oncology";
import { baseSpecialtyProfileFor } from "@/data/specialty-pages/base-profiles";
import {
  applyDoctorListingExtras,
  DOCTOR_PROCEDURE_INDEX_MIN,
  doctorProcedurePath,
  doctorSpecialtyCount,
  doctorSpecialtyLabels,
  isDoctorSpecialtyDiscovery,
  doctorDiscoveryDescription,
  doctorDiscoveryHeading,
  doctorDiscoveryTitle,
  procedureCostHref,
  procedureHasCostArticle,
  relatedDiscoveryBlogs,
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
import { getCity, getSpecialty, proceduresForSpecialty } from "@/lib/taxonomy";

export type DoctorHubLink = { name: string; href: string; count?: number; note?: string };

export type DoctorSpecialtyHubData = {
  specialtyName: string;
  specialtySlug: string;
  practitioner: string;
  practitioners: string;
  careItem: string;
  careItems: string;
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

export function shouldRenderDoctorSpecialtyHub(query: CatalogQuery) {
  return isDoctorSpecialtyDiscovery(query);
}

export function shouldRenderRadiationDoctorHub(query: CatalogQuery) {
  return shouldRenderDoctorSpecialtyHub(query);
}

function buildDiscoveryFaqs(opts: {
  specialty: string;
  practitioner: string;
  practitioners: string;
  careItems: string;
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
        a: `The concise definition on this page is taken from the existing GAF ${opts.procedure} guide. It is not a second full-length article. Open the treatment guide for indications, technique and planning detail.`,
      },
      {
        q: `Which ${opts.practitioners} offer ${opts.procedure}?`,
        a: `${opts.count} listed ${opts.practitioners} currently have an exact ${opts.procedure} procedure relationship in ${cityClause}. Cards appear only when that mapping exists in the catalog; specialty alone is not enough.`,
      },
      {
        q: `Which hospitals offer ${opts.procedure}?`,
        a: hospitalList
          ? `Current catalog relationships for ${opts.procedure} in ${cityClause} include ${hospitalList}. Confirm the treating campus in writing; a hospital name is not a machine inventory.`
          : `No hospital currently has a listed ${opts.practitioner} mapped to ${opts.procedure} in ${cityClause}.`,
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
      q: `How can I compare ${opts.practitioners} for ${opts.procedure}?`,
      a: "Compare listed specialists on experience, qualifications, hospital, city and documented procedure relationships. Comparison is not a statement of medical superiority.",
    });
    return faqs;
  }

  return [
    {
      q: `What is ${opts.specialty}?`,
      a: `The quick answer on this page is summarised from GAF Healthcare’s ${opts.specialty} treatment guide. That guide remains the canonical article for clinical context, treatment options and planning.`,
    },
    {
      q: `What does a ${opts.practitioner} do?`,
      a: `A ${opts.practitioner} evaluates the relevant diagnosis, explains suitable ${opts.careItems}, coordinates treatment-specific assessment and follow-up, and discusses alternatives and material risks. The specialty guide provides clinical context without ranking individual doctors.`,
    },
    {
      q: `How do I find ${opts.practitioners} in ${cityClause}?`,
      a: `${opts.count} catalog records currently match this ${cityClause} listing. Filter by city, hospital or documented procedure. “Best” is the discovery heading for that search intent, not a clinical ranking.`,
    },
    {
      q: `Which cities in India have ${opts.specialty} specialists?`,
      a: cityList
        ? `Listed ${opts.practitioners} currently appear in ${cityList}. Counts are directory facts, not quality scores.`
        : `No city currently has a listed ${opts.practitioner} in this catalog.`,
    },
    {
      q: `Which ${opts.specialty} ${opts.careItems} are available?`,
      a: procedureList
        ? `The catalog currently maps ${opts.practitioners} to ${procedureList}. Procedure pages are published only when enough exact doctor relationships exist.`
        : `No ${opts.specialty} procedure currently has a mapped doctor relationship.`,
    },
    {
      q: `Which hospitals have ${opts.practitioners}?`,
      a: hospitalList
        ? `Hospitals with current listings include ${hospitalList}. A hospital profile remains the canonical campus page.`
        : `No hospital currently has a listed ${opts.practitioner} for these filters.`,
    },
    {
      q: `How can I compare ${opts.practitioners}?`,
      a: "Use the compare tray to place two to four listed specialists side by side on experience, qualifications, hospital, city and mapped procedures. Comparison uses catalog fields only.",
    },
  ];
}

export function buildDoctorSpecialtyHub(
  query: CatalogQuery,
  extras: DoctorListingExtras = {},
  page = 1,
  rows?: Doctor[],
): DoctorSpecialtyHubData | undefined {
  if (!shouldRenderDoctorSpecialtyHub(query) || !query.specialty) return undefined;
  const specialtyName = query.specialty;
  const specialtyTaxon = getSpecialty(specialtyName);
  const profile = specialtyTaxon
    ? baseSpecialtyProfileFor(specialtyTaxon.slug)
    : undefined;
  if (!specialtyTaxon || !profile) return undefined;
  const { practitioner, practitioners, careItem, careItems } =
    profile.terminology;
  const roleLabels = doctorSpecialtyLabels(specialtyName);
  const scoped = filterDoctors(query, rows);
  const matched = applyDoctorListingExtras(scoped, extras);
  const paging = paginateDoctors(matched, page);
  const heading = doctorDiscoveryHeading(query);
  const title = doctorDiscoveryTitle(query);
  if (!heading || !title) return undefined;

  const city = query.city ? getCity(query.city) : undefined;
  const cityEditorial = city
    ? profile.cityEditorials.find((item) => item.citySlug === city.slug)
    : undefined;
  const radiationCityNote =
    specialtyTaxon.slug === "radiation-oncology" && city
      ? radiationOncologyCityNotes[city.slug]
      : undefined;
  const specialtyCostHref = costsFilterPath({
    destination: "India",
    city: query.city,
    specialty: specialtyName,
  });
  const countryDoctors = filterDoctors(
    { destination: "India", specialty: specialtyName, procedure: query.procedure },
    rows,
  );
  const cityNames = citiesForDestination("India");
  const cities = cityNames
    .map((name) => {
      const count = countryDoctors.filter((doctor) => doctor.city === name).length;
      const cityProcedureIndexable = Boolean(query.procedure) && count >= DOCTOR_PROCEDURE_INDEX_MIN;
      return {
        name,
        slug: getCity(name)?.slug ?? name,
        count,
        href: doctorsPath({
          destination: "India",
          city: name,
          specialty: specialtyName,
          procedure: cityProcedureIndexable ? query.procedure : undefined,
        }),
      };
    })
    .filter((row) => row.count > 0);

  const taxonomyProcedures = proceduresForSpecialty(specialtyName).map(
    (row) => row.name,
  );
  const procedurePool = query.procedure ? [query.procedure] : taxonomyProcedures;
  const procedures = procedurePool
    .map((name) => {
      const count = doctorSpecialtyCount(specialtyName, { city: query.city, procedure: name }, rows);
      const cityProcedureIndexable = Boolean(query.city) && count >= DOCTOR_PROCEDURE_INDEX_MIN;
      return {
        name,
        href: doctorProcedurePath(specialtyName, name, cityProcedureIndexable ? query.city : undefined),
        count,
        note: procedureDefinitionFromCanonical(name)?.text,
      };
    })
    .filter((row) => (query.procedure ? true : (row.count ?? 0) >= DOCTOR_PROCEDURE_INDEX_MIN));

  const relatedProcedures = (query.procedure ? relatedProcedureNames(query.procedure, specialtyName) : [])
    .map((name) => ({
      name,
      href: doctorProcedurePath(specialtyName, name, query.city),
      count: doctorSpecialtyCount(specialtyName, { city: query.city, procedure: name }, rows),
      note: procedureDefinitionFromCanonical(name)?.text,
    }))
    .filter((row) => (row.count ?? 0) >= 1);

  const costTreatments = treatments.filter((treatment) =>
    treatment.specialtySlugs.includes(specialtyTaxon.slug),
  );
  const costs = (query.procedure ? costTreatments.filter((row) => row.name === query.procedure) : costTreatments)
    .filter((treatment) => procedureHasCostArticle(treatment.name))
    .map((treatment) => ({
      name: treatment.name,
      href: procedureCostHref(treatment.name),
      note: treatment.partnerRange,
    }));

  const blogs = relatedDiscoveryBlogs(query.procedure, specialtyName);
  const treatmentGuides: DoctorHubLink[] = [
    {
      name: `${specialtyName} treatment guide`,
      href: costsFilterPath({ destination: "India", specialty: specialtyName }),
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
  if (query.city && cityEditorial) {
    treatmentGuides.push({
      name: `${query.city} ${specialtyName} city guide`,
      href: specialtyCostHref,
      note: "Canonical city specialty article",
    });
  }

  const hospitals = filterHospitalsForDoctors(
    { destination: "India", city: query.city, specialty: specialtyName },
    scoped,
  )
    .map((hospital) => ({
      hospital,
      count: scoped.filter((doctor) => doctor.hospitalSlug === hospital.slug).length,
    }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.hospital.name.localeCompare(b.hospital.name));

  const cityCostHref = cityEditorial ? specialtyCostHref : undefined;
  const procedureSource = query.procedure ? procedureDefinitionFromCanonical(query.procedure) : undefined;
  const selectionNote =
    specialtyTaxon.slug === "radiation-oncology"
      ? RADIATION_ONCOLOGY_SELECTION_NOTE
      : `This directory uses professional catalog information and exact specialty and procedure relationships. It does not constitute a medical ranking, guarantee availability or replace a case review by a qualified ${practitioner}.`;
  const cityIntro =
    radiationCityNote?.intro ??
    cityEditorial?.introduction[0] ??
    `${matched.length} listed ${practitioners} currently appear for ${city?.name}.`;
  const cityLogistics =
    radiationCityNote?.logistics ??
    cityEditorial?.logistics[0] ??
    "Confirm the treating clinician and campus before booking travel or lodging.";
  const methodology = {
    question: `How are ${practitioners} selected for this page?`,
    answer: `A doctor appears only when the GAF catalog records the matching ${specialtyName} specialty, location and, where selected, exact procedure relationship. Results are not ranked by outcomes or medical superiority.`,
  };
  const howToChoose = [
    `Confirm that the ${practitioner} has reviewed the diagnosis and relevant original records.`,
    `Ask why the proposed ${careItem} is suitable and which alternatives should also be considered.`,
    "Verify the doctor, hospital campus, procedure scope and required clinical support in writing.",
    "Compare qualifications, listed experience, hospital affiliation and documented procedure relationships rather than marketing claims.",
    "Clarify expected preparation, recovery, warning signs and follow-up before making travel arrangements.",
  ];

  const path = doctorsPath({
    destination: "India",
    city: query.city,
    specialty: specialtyName,
    procedure: query.procedure,
  });

  const intro = query.procedure
    ? [
        procedureSource?.text ??
          `${query.procedure} listings use exact catalog procedure relationships. A clinical explanation belongs on the existing treatment guide when one exists.`,
        `${matched.length} ${practitioners} currently carry this procedure mapping in ${query.city ?? "India"}. That count is directory evidence, not a claim that every listed clinician currently accepts every case.`,
        city ? `${cityIntro} ${cityLogistics}` : selectionNote,
      ]
    : city
      ? [
          cityIntro,
          cityLogistics,
          `${matched.length} ${practitioners} and ${hospitals.length} hospitals currently match this city and specialty filter. ${selectionNote}`,
        ]
      : [
          `This page is GAF Healthcare’s India directory of listed ${practitioners}, with filters for city, hospital and documented ${careItem} relationships.`,
          `${matched.length} catalog records currently span ${cities.length} cities and ${hospitals.length} hospitals. Use the ${specialtyName} treatment guide for clinical context; this directory does not replace that article.`,
          selectionNote,
        ];

  const conditionLinks: DoctorHubLink[] = query.procedure
    ? mappedConditionsForProcedure(query.procedure, specialtyName)
    : specialtyConditionLinks(specialtyName);

  const faqProcedures = query.procedure
    ? procedures
    : taxonomyProcedures.map((name) => ({
        name,
        count: doctorSpecialtyCount(specialtyName, { city: query.city, procedure: name }, rows),
      }));

  return {
    specialtyName,
    specialtySlug: specialtyTaxon.slug,
    practitioner: roleLabels.singular,
    practitioners: roleLabels.plural,
    careItem,
    careItems,
    heading,
    title,
    description: doctorDiscoveryDescription(query, scoped.length) ?? "",
    path,
    place: query.city ? `${query.city}, India` : "India",
    cityName: query.city,
    citySlug: city?.slug,
    procedure: query.procedure,
    selectionNote,
    methodology,
    intro,
    howToChoose,
    faqs: [
      ...buildDiscoveryFaqs({
        specialty: specialtyName,
        practitioner,
        practitioners,
        careItems,
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
      ...cityFaqExtras(specialtyName, city?.slug),
    ],
    quickAnswers: discoveryQuickAnswers({
      specialty: specialtyName,
      cityName: query.city,
      citySlug: city?.slug,
      procedure: query.procedure,
      doctorCount: matched.length,
      cityCount: cities.length,
      hospitalCount: hospitals.length,
      cityNames: cities.map((row) => row.name),
      procedureNames: procedures.map((row) => row.name),
    }),
    mainArticleAnswers:
      !query.city && !query.procedure
        ? specialtyGuideQuickAnswers(specialtyName)
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

/** Backward-compatible name for existing integrations and focused tests. */
export const buildRadiationDoctorHub = buildDoctorSpecialtyHub;
