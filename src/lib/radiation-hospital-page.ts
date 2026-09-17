import {
  BASE_SPECIALTY_PROFILES,
  baseSpecialtyProfileFor,
} from "@/data/specialty-pages/base-profiles";
import { getCostArticle } from "@/data/cost-articles";
import {
  doctorHasProcedure,
  filterDoctors,
  type CatalogQuery,
} from "@/lib/catalog";
import {
  costPath,
  costsFilterPath,
  hospitalsPath,
} from "@/lib/catalog-links";
import type { Doctor } from "@/lib/doctors";
import { doctors } from "@/lib/doctors";
import {
  procedureDefinitionFromCanonical,
  relatedProcedureNames,
  mappedConditionsForProcedure,
  specialtyConditionLinks,
  type QuickAnswerItem,
} from "@/lib/doctor-quick-answers";
import type { Hospital } from "@/lib/hospitals";
import {
  hospitals,
  paginateHospitals,
} from "@/lib/hospitals";
import { getTreatment } from "@/lib/treatments";
import {
  getCity,
  getProcedure,
  getSpecialty,
  proceduresForSpecialty,
} from "@/lib/taxonomy";

export const RADIATION_HOSPITAL_SPECIALTY = "Radiation Oncology";
export const RADIATION_HOSPITAL_SPECIALTY_SLUG = "radiation-oncology";
export const RADIATION_HOSPITAL_INDEX_MIN = 1;
export const HOSPITAL_PROCEDURE_DOCTOR_MIN = 3;
export const RADIATION_HOSPITAL_CITY_PROCEDURE_DOCTOR_MIN =
  HOSPITAL_PROCEDURE_DOCTOR_MIN;

export type RadiationHospitalRelationship = {
  hospital: Hospital;
  doctors: Doctor[];
  procedures: { name: string; slug: string }[];
};

export type RadiationHospitalHubLink = {
  name: string;
  href: string;
  count?: number;
  note?: string;
};

export type RadiationHospitalHubData = {
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
  procedureSlug?: string;
  quickAnswers: QuickAnswerItem[];
  metrics: { label: string; value: number }[];
  hospitals: RadiationHospitalRelationship[];
  paging: ReturnType<typeof paginateHospitals>;
  doctors: Doctor[];
  procedures: RadiationHospitalHubLink[];
  relatedProcedures: RadiationHospitalHubLink[];
  cities: RadiationHospitalHubLink[];
  treatmentGuides: RadiationHospitalHubLink[];
  costGuides: RadiationHospitalHubLink[];
  conditions: RadiationHospitalHubLink[];
  faqs: { q: string; a: string }[];
  cityContext?: {
    introduction: string[];
    whyCity: string[];
    planning: string[];
    logistics: string[];
  };
};

export type HospitalSpecialtyRelationship = RadiationHospitalRelationship;
export type HospitalSpecialtyHubLink = RadiationHospitalHubLink;
export type HospitalSpecialtyHubData = RadiationHospitalHubData;

export function isHospitalSpecialtyScope(query: CatalogQuery) {
  if (query.destination !== "India" || !query.specialty) return false;
  const specialty = getSpecialty(query.specialty);
  return Boolean(specialty && baseSpecialtyProfileFor(specialty.slug));
}

export function isHospitalSpecialtyDiscovery(query: CatalogQuery) {
  if (!isHospitalSpecialtyScope(query) || !query.specialty) return false;
  if (!query.procedure) return true;
  const procedure = getProcedure(query.procedure);
  const specialty = getSpecialty(query.specialty);
  return Boolean(specialty && procedure?.specialtySlugs.includes(specialty.slug));
}

export const isRadiationHospitalScope = (query: CatalogQuery) =>
  isHospitalSpecialtyScope(query) &&
  query.specialty === RADIATION_HOSPITAL_SPECIALTY;

export const isRadiationHospitalDiscovery = (query: CatalogQuery) =>
  isHospitalSpecialtyDiscovery(query) &&
  query.specialty === RADIATION_HOSPITAL_SPECIALTY;

function specialtyDoctors(
  query: Pick<CatalogQuery, "specialty" | "city" | "procedure">,
  rows: Doctor[],
) {
  if (!query.specialty) return [];
  return filterDoctors(
    {
      destination: "India",
      city: query.city,
      specialty: query.specialty,
      procedure: query.procedure,
    },
    rows,
  );
}

/**
 * A hospital relationship is valid only when the campus carries the specialty,
 * a matching specialist is assigned to that campus, and procedure
 * pages additionally have both hospital- and doctor-level procedure mappings.
 */
export function validatedSpecialtyHospitals(
  query: Pick<CatalogQuery, "specialty" | "city" | "procedure">,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  if (!query.specialty) return [];
  const specialty = getSpecialty(query.specialty);
  if (!specialty || !baseSpecialtyProfileFor(specialty.slug)) return [];
  const procedure = query.procedure
    ? getProcedure(query.procedure)
    : undefined;
  if (
    query.procedure &&
    !procedure?.specialtySlugs.includes(specialty.slug)
  ) {
    return [];
  }

  const matchingDoctors = specialtyDoctors(query, doctorRows);
  const doctorSlugsByHospital = new Map<string, Set<string>>();
  for (const doctor of matchingDoctors) {
    const current = doctorSlugsByHospital.get(doctor.hospitalSlug) ?? new Set();
    current.add(doctor.slug);
    doctorSlugsByHospital.set(doctor.hospitalSlug, current);
  }

  return hospitalRows.filter((hospital) => {
    if (
      hospital.country !== "India" ||
      (query.city && hospital.city !== query.city) ||
      !hospital.specialtySlugs.includes(specialty.slug) ||
      !doctorSlugsByHospital.has(hospital.slug)
    ) {
      return false;
    }
    if (!procedure) return true;
    return hospital.procedureSlugs.includes(procedure.slug);
  });
}

export function validatedRadiationHospitals(
  query: Pick<CatalogQuery, "city" | "procedure">,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  return validatedSpecialtyHospitals(
    { ...query, specialty: RADIATION_HOSPITAL_SPECIALTY },
    hospitalRows,
    doctorRows,
  );
}

function validDoctorsForHospitals(
  query: Pick<CatalogQuery, "specialty" | "city" | "procedure">,
  matchedHospitals: Hospital[],
  doctorRows: Doctor[],
) {
  const hospitalSlugs = new Set(
    matchedHospitals.map((hospital) => hospital.slug),
  );
  return specialtyDoctors(query, doctorRows).filter((doctor) =>
    hospitalSlugs.has(doctor.hospitalSlug),
  );
}

function hospitalSpecialtyCombinationEligible(
  query: Pick<CatalogQuery, "specialty" | "city" | "procedure">,
  hospitalRows: Hospital[],
  doctorRows: Doctor[],
) {
  const matchedHospitals = validatedSpecialtyHospitals(
    query,
    hospitalRows,
    doctorRows,
  );
  if (matchedHospitals.length < RADIATION_HOSPITAL_INDEX_MIN) return false;
  if (!query.procedure) return true;
  return (
    validDoctorsForHospitals(query, matchedHospitals, doctorRows).length >=
    HOSPITAL_PROCEDURE_DOCTOR_MIN
  );
}

export function hospitalSpecialtyCombinationIndexable(
  query: CatalogQuery,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  if (
    !isHospitalSpecialtyDiscovery(query) ||
    !query.specialty
  ) {
    return false;
  }
  const specialty = getSpecialty(query.specialty);
  const profile = specialty
    ? baseSpecialtyProfileFor(specialty.slug)
    : undefined;
  return Boolean(
    specialty &&
      profile?.status === "published" &&
      profile.allowIndex &&
      hospitalSpecialtyCombinationEligible(
        {
          specialty: specialty.name,
          city: query.city,
          procedure: query.procedure,
        },
        hospitalRows,
        doctorRows,
      ),
  );
}

export function hospitalSpecialtyRelationship(
  hospital: Hospital,
  doctorRows: Doctor[],
  specialtyName: string,
): HospitalSpecialtyRelationship {
  const faculty = doctorRows.filter(
    (doctor) =>
      doctor.hospitalSlug === hospital.slug &&
      doctor.specialty === specialtyName,
  );
  const taxonomy = proceduresForSpecialty(specialtyName);
  const procedures = taxonomy
    .filter(
      (procedure) =>
        hospital.procedureSlugs.includes(procedure.slug) &&
        faculty.some((doctor) => doctorHasProcedure(doctor, procedure.name)),
    )
    .map(({ name, slug }) => ({ name, slug }));
  return { hospital, doctors: faculty, procedures };
}

export function radiationHospitalRelationship(
  hospital: Hospital,
  doctorRows: Doctor[],
) {
  return hospitalSpecialtyRelationship(
    hospital,
    doctorRows,
    RADIATION_HOSPITAL_SPECIALTY,
  );
}

function hospitalNames(rows: RadiationHospitalRelationship[], limit = 6) {
  const names = rows.slice(0, limit).map((row) => row.hospital.name);
  return names.join(", ");
}

function procedureNames(rows: RadiationHospitalHubLink[], limit = 8) {
  return rows
    .filter((row) => (row.count ?? 0) > 0)
    .slice(0, limit)
    .map((row) => row.name)
    .join(", ");
}

function indefiniteArticle(value: string) {
  return /^[aeiou]/i.test(value) ? "an" : "a";
}

function buildQuickAnswers(opts: {
  specialtyName: string;
  practitioner: string;
  practitioners: string;
  careItem: string;
  careItems: string;
  introAnswer: string;
  city?: string;
  procedure?: string;
  hospitals: RadiationHospitalRelationship[];
  doctors: Doctor[];
  procedures: RadiationHospitalHubLink[];
}): QuickAnswerItem[] {
  const place = opts.city ?? "India";
  const hospitals = hospitalNames(opts.hospitals);
  if (opts.procedure) {
    const source = procedureDefinitionFromCanonical(opts.procedure);
    return [
      {
        question: `What is ${opts.procedure}?`,
        answer:
          source?.text ??
          `${opts.procedure} is a controlled ${opts.specialtyName} procedure in the GAF catalog. Clinical suitability requires review by a qualified ${opts.practitioner}.`,
        sourceHref: source?.source.canonicalUrl,
        sourceLabel: source
          ? `Read the complete ${opts.procedure} treatment and cost guide`
          : undefined,
        source: source?.source,
      },
      {
        question: `Which hospitals in ${place} offer ${opts.procedure}?`,
        answer: `${opts.hospitals.length} validated hospital relationship${opts.hospitals.length === 1 ? "" : "s"} currently match ${opts.procedure} in ${place}${hospitals ? `: ${hospitals}` : ""}. Inclusion requires both a hospital procedure mapping and an affiliated ${opts.practitioner} mapped to the same procedure.`,
      },
      {
        question: `Which doctors are associated with ${opts.procedure}${opts.city ? ` in ${opts.city}` : ""}?`,
        answer: `${opts.doctors.length} listed ${opts.doctors.length === 1 ? opts.practitioner : opts.practitioners} currently have an exact ${opts.procedure} relationship at the hospitals shown. A catalog relationship is not a guarantee that a clinician will accept every case.`,
      },
    ];
  }

  const procedures = procedureNames(opts.procedures);
  return [
    {
      question: opts.city
        ? `What is ${opts.specialtyName}?`
        : `What is ${indefiniteArticle(opts.specialtyName)} ${opts.specialtyName} hospital?`,
      answer: opts.city
        ? `${opts.introAnswer} This ${opts.city} page is limited to hospitals with a listed ${opts.practitioner} relationship.`
        : `${indefiniteArticle(opts.specialtyName) === "an" ? "An" : "A"} ${opts.specialtyName} hospital on this page is an Indian campus with ${opts.specialtyName} in its controlled specialty data and at least one affiliated ${opts.practitioner} in the current GAF catalog. The listing does not imply that every ${opts.careItem} is available at every campus.`,
      sourceHref: costsFilterPath({
        destination: "India",
        specialty: opts.specialtyName,
      }),
      sourceLabel: `Read the ${opts.specialtyName} treatment and cost guide`,
    },
    {
      question: `Which hospitals in ${place} offer ${opts.specialtyName}?`,
      answer: `${opts.hospitals.length} validated hospital relationship${opts.hospitals.length === 1 ? "" : "s"} currently match ${opts.specialtyName} in ${place}${hospitals ? `, including ${hospitals}` : ""}. Counts require a matching hospital specialty and affiliated ${opts.practitioner}; they are not rankings or claims about outcomes.`,
    },
    {
      question: `Which ${opts.specialtyName} ${opts.careItems} are available in ${place}?`,
      answer: procedures
        ? `${opts.procedures.length} ${opts.careItems} have validated hospital and doctor relationships in ${place}, including ${procedures}. Open a procedure page for the exact hospitals and doctors connected to that procedure.`
        : `No ${opts.specialtyName} ${opts.careItems} currently have a validated hospital and doctor relationship in ${place}.`,
    },
  ];
}

function buildFaqs(opts: {
  specialtyName: string;
  practitioner: string;
  practitioners: string;
  careItems: string;
  city?: string;
  procedure?: string;
  hospitals: RadiationHospitalRelationship[];
  doctors: Doctor[];
  procedures: RadiationHospitalHubLink[];
  cities: RadiationHospitalHubLink[];
  costGuides: RadiationHospitalHubLink[];
}) {
  const place = opts.city ?? "India";
  if (opts.procedure) {
    return [
      {
        q: `What is ${opts.procedure}?`,
        a: `The concise definition on this page comes from the canonical GAF ${opts.procedure} treatment and cost content. This hospital page does not duplicate the full medical guide.`,
      },
      {
        q: `Which hospitals in ${place} offer ${opts.procedure}?`,
        a: `${opts.hospitals.length} hospitals currently meet the hospital-specialty, hospital-procedure, doctor-hospital and doctor-procedure validation rules for this page.`,
      },
      {
        q: `Which cities offer ${opts.procedure}?`,
        a: opts.cities.length
          ? `Validated relationships currently appear in ${opts.cities.map((row) => row.name).join(", ")}.`
          : `No eligible city currently has a validated ${opts.procedure} hospital relationship.`,
      },
      {
        q: `Which ${opts.practitioners} are associated with ${opts.procedure}?`,
        a: `${opts.doctors.length} listed doctors have the exact procedure relationship at a hospital shown on this page. Inclusion is not a clinical ranking.`,
      },
      {
        q: `What is the cost of ${opts.procedure} in ${place}?`,
        a: opts.costGuides.length
          ? `Use the linked GAF cost guide as an indicative planning range. A hospital quotation is required after records review, and an India range is not a city-specific or patient-specific price.`
          : `No approved GAF cost guide is linked. Request a hospital quotation after records review.`,
      },
    ];
  }
  return [
    {
      q: `Which hospitals in ${place} offer ${opts.specialtyName}?`,
      a: `${opts.hospitals.length} hospitals currently meet the validated specialty and affiliated-doctor rules shown on this page.`,
    },
    {
      q: `Which ${opts.specialtyName} ${opts.careItems} are available in ${place}?`,
      a: `${opts.procedures.length} controlled ${opts.careItems} currently have both hospital and doctor relationship evidence in ${place}.`,
    },
    {
      q: `Which ${opts.practitioners} practice in ${place}?`,
      a: `${opts.doctors.length} listed ${opts.practitioners} are affiliated with the validated hospitals on this page.`,
    },
    {
      q: `How can I compare ${opts.specialtyName} hospitals?`,
      a: "Compare factual details such as city, accreditation, beds, established year, validated procedures and affiliated doctors. GAF does not assign an overall score or clinical ranking.",
    },
    {
      q: "What treatment costs should I consider?",
      a: "Use linked GAF cost guides as indicative India planning ranges. Technique, fractions, planning, imaging, admission and patient-specific requirements must be confirmed in a written hospital quotation.",
    },
  ];
}

export function buildHospitalSpecialtyHub(
  query: CatalogQuery,
  page = 1,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
): RadiationHospitalHubData | undefined {
  if (!isHospitalSpecialtyDiscovery(query) || !query.specialty) return undefined;
  const specialty = getSpecialty(query.specialty);
  const profile = specialty
    ? baseSpecialtyProfileFor(specialty.slug)
    : undefined;
  if (
    !specialty ||
    !profile ||
    !hospitalSpecialtyCombinationIndexable(query, hospitalRows, doctorRows)
  ) {
    return undefined;
  }
  const { practitioner, practitioners, careItem, careItems } =
    profile.terminology;
  const matchedHospitals = validatedSpecialtyHospitals(
    { specialty: specialty.name, city: query.city, procedure: query.procedure },
    hospitalRows,
    doctorRows,
  );

  const relationships = matchedHospitals
    .map((hospital) =>
      hospitalSpecialtyRelationship(hospital, doctorRows, specialty.name),
    )
    .sort(
      (a, b) =>
        a.hospital.city.localeCompare(b.hospital.city) ||
        a.hospital.name.localeCompare(b.hospital.name),
    );
  const matchedDoctors = validDoctorsForHospitals(
    { specialty: specialty.name, city: query.city, procedure: query.procedure },
    matchedHospitals,
    doctorRows,
  );
  const paging = paginateHospitals(matchedHospitals, page);
  const procedure = query.procedure ? getProcedure(query.procedure) : undefined;
  const city = query.city ? getCity(query.city) : undefined;
  const procedures = proceduresForSpecialty(specialty.name)
    .map((row) => {
      const count = validatedSpecialtyHospitals(
        { specialty: specialty.name, city: query.city, procedure: row.name },
        hospitalRows,
        doctorRows,
      ).length;
      return {
        name: row.name,
        href: hospitalsPath({
          destination: "India",
          city: query.city,
          specialty: specialty.name,
          procedure: row.name,
        }),
        count,
        note: procedureDefinitionFromCanonical(row.name)?.text,
      };
    })
    .filter(
      (row) =>
        row.count > 0 &&
        hospitalSpecialtyCombinationEligible(
          { specialty: specialty.name, city: query.city, procedure: row.name },
          hospitalRows,
          doctorRows,
        ),
    );

  const nationalProcedureHospitals = query.procedure
    ? validatedSpecialtyHospitals(
        { specialty: specialty.name, procedure: query.procedure },
        hospitalRows,
        doctorRows,
      )
    : validatedSpecialtyHospitals(
        { specialty: specialty.name },
        hospitalRows,
        doctorRows,
      );
  const cities = [...new Set(nationalProcedureHospitals.map((row) => row.city))]
    .map((name) => {
      const count = validatedSpecialtyHospitals(
        { specialty: specialty.name, city: name, procedure: query.procedure },
        hospitalRows,
        doctorRows,
      ).length;
      return {
        name,
        href: hospitalsPath({
          destination: "India",
          city: name,
          specialty: specialty.name,
          procedure: query.procedure,
        }),
        count,
      };
    })
    .filter(
      (row) =>
        row.count >= RADIATION_HOSPITAL_INDEX_MIN &&
        hospitalSpecialtyCombinationEligible(
          {
            specialty: specialty.name,
            city: row.name,
            procedure: query.procedure,
          },
          hospitalRows,
          doctorRows,
        ),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const guideProcedures = query.procedure
    ? proceduresForSpecialty(specialty.name).filter(
        (row) => row.name === query.procedure,
      )
    : proceduresForSpecialty(specialty.name).filter((row) =>
        procedures.some((item) => item.name === row.name),
      );
  const treatmentGuides = guideProcedures
    .filter((row) => Boolean(getTreatment(row.slug)))
    .map((row) => ({
      name: `${row.name} treatment guide`,
      href: costPath(row.name),
      note: procedureDefinitionFromCanonical(row.name)?.text,
    }));
  const indiaCostGuides = guideProcedures
    .map((row) => getTreatment(row.slug))
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .map((row) => ({
      name: `${row.name} cost in India`,
      href: costPath(row.name),
      note: `${row.partnerRange} indicative planning range`,
    }));
  const cityCostGuides =
    query.city && city
      ? guideProcedures.flatMap((row) => {
          const article = getCostArticle(row.slug);
          const cityPage = article?.cities.find(
            (item) => item.citySlug === city.slug && item.page,
          );
          if (!cityPage) return [];
          return [
            {
              name: `${row.name} cost in ${query.city}`,
              href: costsFilterPath({
                destination: "India",
                city: query.city,
                specialty: specialty.name,
                procedure: row.name,
              }),
              note: "City-specific planning guide; a hospital quotation is still required",
            },
          ];
        })
      : [];
  const costGuides = [...cityCostGuides, ...indiaCostGuides];

  const relatedProcedures = query.procedure
    ? relatedProcedureNames(query.procedure, specialty.name)
        .map((name) => {
          const count = validatedSpecialtyHospitals(
            { specialty: specialty.name, city: query.city, procedure: name },
            hospitalRows,
            doctorRows,
          ).length;
          return {
            name,
            href: hospitalsPath({
              destination: "India",
              city: query.city,
              specialty: specialty.name,
              procedure: name,
            }),
            count,
          };
        })
        .filter(
          (row) =>
            row.count > 0 &&
            hospitalSpecialtyCombinationEligible(
              {
                specialty: specialty.name,
                city: query.city,
                procedure: row.name,
              },
              hospitalRows,
              doctorRows,
            ),
        )
    : [];
  const conditions = query.procedure
    ? mappedConditionsForProcedure(query.procedure, specialty.name)
    : specialtyConditionLinks(specialty.name);

  const place = query.city ? `${query.city}, India` : "India";
  const heading = `Best Hospitals for ${query.procedure ?? specialty.name} in ${place}`;
  const title = query.procedure
    ? query.city
      ? `Hospitals for ${query.procedure} in ${query.city}, India – Doctors & Cost`
      : `Hospitals for ${query.procedure} in India – Doctors, Treatment & Cost`
    : query.city
      ? `${specialty.name} Hospitals in ${query.city}, India – Doctors & Procedures`
      : `${specialty.name} Hospitals in India – Doctors, Procedures & Facilities`;
  const description = query.procedure
    ? `Review ${matchedHospitals.length} validated hospitals and ${matchedDoctors.length} associated ${practitioners} for ${query.procedure} in ${place}. Relationships require matching hospital and doctor procedure data.`
    : `Review ${matchedHospitals.length} validated ${specialty.name} hospitals, ${matchedDoctors.length} affiliated ${practitioners} and ${procedures.length} mapped ${careItems} in ${place}.`;
  const path = hospitalsPath({
    destination: "India",
    city: query.city,
    specialty: specialty.name,
    procedure: query.procedure,
  });

  const cityEditorial = city
    ? profile.cityEditorials.find(
        (row) => row.citySlug === city.slug,
      )
    : undefined;
  const cityContext =
    cityEditorial
      ? {
          introduction: cityEditorial.introduction,
          whyCity: cityEditorial.whyCity,
          planning: cityEditorial.planning,
          logistics: cityEditorial.logistics,
        }
      : undefined;

  const quickAnswers = buildQuickAnswers({
    specialtyName: specialty.name,
    practitioner,
    practitioners,
    careItem,
    careItems,
    introAnswer: profile.introAnswer,
    city: query.city,
    procedure: query.procedure,
    hospitals: relationships,
    doctors: matchedDoctors,
    procedures,
  });
  const faqs = buildFaqs({
    specialtyName: specialty.name,
    practitioner,
    practitioners,
    careItems,
    city: query.city,
    procedure: query.procedure,
    hospitals: relationships,
    doctors: matchedDoctors,
    procedures,
    cities,
    costGuides,
  });
  const metrics = [
    { label: "Hospitals", value: matchedHospitals.length },
    { label: practitioners, value: matchedDoctors.length },
    ...(!query.procedure
      ? [{ label: "Validated procedures", value: procedures.length }]
      : []),
    ...(!query.city ? [{ label: "Eligible cities", value: cities.length }] : []),
    { label: "Treatment guides", value: treatmentGuides.length },
    { label: "Cost guides", value: costGuides.length },
  ];

  return {
    specialtyName: specialty.name,
    specialtySlug: specialty.slug,
    practitioner,
    practitioners,
    careItem,
    careItems,
    heading,
    title,
    description,
    path,
    place,
    cityName: query.city,
    citySlug: city?.slug,
    procedure: query.procedure,
    procedureSlug: procedure?.slug,
    quickAnswers,
    metrics,
    hospitals: relationships,
    paging,
    doctors: matchedDoctors,
    procedures,
    relatedProcedures,
    cities,
    treatmentGuides,
    costGuides,
    conditions,
    faqs,
    cityContext,
  };
}

export function buildRadiationHospitalHub(
  query: CatalogQuery,
  page = 1,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  return buildHospitalSpecialtyHub(
    { ...query, specialty: RADIATION_HOSPITAL_SPECIALTY },
    page,
    hospitalRows,
    doctorRows,
  );
}

export function hospitalSpecialtyPageIndexable(page: number, total: number) {
  return page === 1 && total >= RADIATION_HOSPITAL_INDEX_MIN;
}

export const radiationHospitalPageIndexable = hospitalSpecialtyPageIndexable;

export function hospitalSpecialtySitemapPaths(
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  const paths: string[] = [];
  for (const profile of BASE_SPECIALTY_PROFILES) {
    if (profile.status !== "published" || !profile.allowIndex) continue;
    const specialty = getSpecialty(profile.specialtySlug);
    if (!specialty) continue;
    const base = buildHospitalSpecialtyHub(
      { destination: "India", specialty: specialty.name },
      1,
      hospitalRows,
      doctorRows,
    );
    if (!base) continue;
    paths.push(base.path);
    for (const city of base.cities) paths.push(city.href);
    for (const procedure of base.procedures) {
      paths.push(procedure.href);
      const procedureHub = buildHospitalSpecialtyHub(
        {
          destination: "India",
          specialty: specialty.name,
          procedure: procedure.name,
        },
        1,
        hospitalRows,
        doctorRows,
      );
      for (const city of procedureHub?.cities ?? []) {
        paths.push(city.href);
      }
    }
  }
  return [...new Set(paths)];
}

export function radiationHospitalSitemapPaths(
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  return hospitalSpecialtySitemapPaths(hospitalRows, doctorRows).filter(
    (path) => path.includes("/Radiation-Oncology"),
  );
}

export type RadiationHospitalGraphFlag = {
  code:
    | "hospital-without-radiation-doctor"
    | "procedure-without-valid-hospital"
    | "doctor-procedure-without-hospital-procedure"
    | "duplicate-url"
    | "missing-procedure-definition";
  detail: string;
};

export function validateRadiationHospitalGraph(
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
): RadiationHospitalGraphFlag[] {
  const flags: RadiationHospitalGraphFlag[] = [];
  const radiationFaculty = specialtyDoctors(
    { specialty: RADIATION_HOSPITAL_SPECIALTY },
    doctorRows,
  );
  for (const hospital of hospitalRows.filter((row) =>
    row.specialtySlugs.includes(RADIATION_HOSPITAL_SPECIALTY_SLUG),
  )) {
    if (!radiationFaculty.some((doctor) => doctor.hospitalSlug === hospital.slug)) {
      flags.push({
        code: "hospital-without-radiation-doctor",
        detail: hospital.slug,
      });
    }
  }
  for (const procedure of proceduresForSpecialty(RADIATION_HOSPITAL_SPECIALTY)) {
    const validHospitals = validatedRadiationHospitals(
      { procedure: procedure.name },
      hospitalRows,
      doctorRows,
    );
    if (validHospitals.length === 0) {
      flags.push({
        code: "procedure-without-valid-hospital",
        detail: procedure.name,
      });
    }
    if (!procedureDefinitionFromCanonical(procedure.name)?.text) {
      flags.push({
        code: "missing-procedure-definition",
        detail: procedure.name,
      });
    }
    for (const doctor of radiationFaculty.filter((row) =>
      doctorHasProcedure(row, procedure.name),
    )) {
      const hospital = hospitalRows.find(
        (row) => row.slug === doctor.hospitalSlug,
      );
      if (!hospital?.procedureSlugs.includes(procedure.slug)) {
        flags.push({
          code: "doctor-procedure-without-hospital-procedure",
          detail: `${doctor.slug}:${procedure.slug}`,
        });
      }
    }
  }
  const seen = new Set<string>();
  for (const path of radiationHospitalSitemapPaths(hospitalRows, doctorRows)) {
    if (seen.has(path)) {
      flags.push({ code: "duplicate-url", detail: path });
    }
    seen.add(path);
  }
  return flags;
}

export const radiationHospitalSelectionNote =
  "Hospital inclusion is based on available specialty, procedure and affiliated-doctor relationships in the GAF catalog. Listings support factual comparison and are not clinical rankings, endorsements or guarantees of treatment availability or outcomes.";

export type HospitalSpecialtyGraphFlag = {
  code:
    | "hospital-without-specialty-doctor"
    | "procedure-without-valid-hospital"
    | "doctor-procedure-without-hospital-procedure"
    | "duplicate-url"
    | "missing-procedure-definition";
  specialty: string;
  detail: string;
};

export function validateHospitalSpecialtyGraph(
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
): HospitalSpecialtyGraphFlag[] {
  const flags: HospitalSpecialtyGraphFlag[] = [];
  for (const profile of BASE_SPECIALTY_PROFILES) {
    const specialty = getSpecialty(profile.specialtySlug);
    if (!specialty || profile.status !== "published") continue;
    const faculty = specialtyDoctors(
      { specialty: specialty.name },
      doctorRows,
    );
    for (const hospital of hospitalRows.filter((row) =>
      row.specialtySlugs.includes(specialty.slug),
    )) {
      if (!faculty.some((doctor) => doctor.hospitalSlug === hospital.slug)) {
        flags.push({
          code: "hospital-without-specialty-doctor",
          specialty: specialty.name,
          detail: hospital.slug,
        });
      }
    }
    for (const procedure of proceduresForSpecialty(specialty.name)) {
      if (
        validatedSpecialtyHospitals(
          { specialty: specialty.name, procedure: procedure.name },
          hospitalRows,
          doctorRows,
        ).length === 0
      ) {
        flags.push({
          code: "procedure-without-valid-hospital",
          specialty: specialty.name,
          detail: procedure.name,
        });
      }
      if (!procedureDefinitionFromCanonical(procedure.name)?.text) {
        flags.push({
          code: "missing-procedure-definition",
          specialty: specialty.name,
          detail: procedure.name,
        });
      }
      for (const doctor of faculty.filter((row) =>
        doctorHasProcedure(row, procedure.name),
      )) {
        const hospital = hospitalRows.find(
          (row) => row.slug === doctor.hospitalSlug,
        );
        if (!hospital?.procedureSlugs.includes(procedure.slug)) {
          flags.push({
            code: "doctor-procedure-without-hospital-procedure",
            specialty: specialty.name,
            detail: `${doctor.slug}:${procedure.slug}`,
          });
        }
      }
    }
  }
  const seen = new Set<string>();
  for (const path of hospitalSpecialtySitemapPaths(hospitalRows, doctorRows)) {
    if (seen.has(path)) {
      flags.push({
        code: "duplicate-url",
        specialty: "All specialties",
        detail: path,
      });
    }
    seen.add(path);
  }
  return flags;
}
