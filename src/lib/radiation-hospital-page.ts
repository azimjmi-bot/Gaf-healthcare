import { radiationOncologyIndiaProfile } from "@/data/specialty-pages/radiation-oncology";
import { getCostArticle } from "@/data/cost-articles";
import {
  radiationOncologyCityNotes,
  RADIATION_ONCOLOGY_SELECTION_NOTE,
} from "@/data/doctor-pages/radiation-oncology";
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
  proceduresForSpecialty,
} from "@/lib/taxonomy";

export const RADIATION_HOSPITAL_SPECIALTY = "Radiation Oncology";
export const RADIATION_HOSPITAL_SPECIALTY_SLUG = "radiation-oncology";
export const RADIATION_HOSPITAL_INDEX_MIN = 1;
export const RADIATION_HOSPITAL_CITY_PROCEDURE_DOCTOR_MIN = 3;

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

export function isRadiationHospitalScope(query: CatalogQuery) {
  return (
    query.destination === "India" &&
    query.specialty === RADIATION_HOSPITAL_SPECIALTY
  );
}

export function isRadiationHospitalDiscovery(query: CatalogQuery) {
  if (!isRadiationHospitalScope(query)) return false;
  if (!query.procedure) return true;
  const procedure = getProcedure(query.procedure);
  return Boolean(
    procedure?.specialtySlugs.includes(RADIATION_HOSPITAL_SPECIALTY_SLUG),
  );
}

function radiationDoctors(
  query: Pick<CatalogQuery, "city" | "procedure">,
  rows: Doctor[],
) {
  return filterDoctors(
    {
      destination: "India",
      city: query.city,
      specialty: RADIATION_HOSPITAL_SPECIALTY,
      procedure: query.procedure,
    },
    rows,
  );
}

/**
 * A hospital relationship is valid only when the campus carries the specialty,
 * a matching radiation oncologist is assigned to that campus, and procedure
 * pages additionally have both hospital- and doctor-level procedure mappings.
 */
export function validatedRadiationHospitals(
  query: Pick<CatalogQuery, "city" | "procedure">,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  const procedure = query.procedure
    ? getProcedure(query.procedure)
    : undefined;
  if (
    query.procedure &&
    !procedure?.specialtySlugs.includes(RADIATION_HOSPITAL_SPECIALTY_SLUG)
  ) {
    return [];
  }

  const matchingDoctors = radiationDoctors(query, doctorRows);
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
      !hospital.specialtySlugs.includes(RADIATION_HOSPITAL_SPECIALTY_SLUG) ||
      !doctorSlugsByHospital.has(hospital.slug)
    ) {
      return false;
    }
    if (!procedure) return true;
    return hospital.procedureSlugs.includes(procedure.slug);
  });
}

function validDoctorsForHospitals(
  query: Pick<CatalogQuery, "city" | "procedure">,
  matchedHospitals: Hospital[],
  doctorRows: Doctor[],
) {
  const hospitalSlugs = new Set(
    matchedHospitals.map((hospital) => hospital.slug),
  );
  return radiationDoctors(query, doctorRows).filter((doctor) =>
    hospitalSlugs.has(doctor.hospitalSlug),
  );
}

function radiationHospitalCombinationEligible(
  query: Pick<CatalogQuery, "city" | "procedure">,
  hospitalRows: Hospital[],
  doctorRows: Doctor[],
) {
  const matchedHospitals = validatedRadiationHospitals(
    query,
    hospitalRows,
    doctorRows,
  );
  if (matchedHospitals.length < RADIATION_HOSPITAL_INDEX_MIN) return false;
  if (!query.city || !query.procedure) return true;
  return (
    validDoctorsForHospitals(query, matchedHospitals, doctorRows).length >=
    RADIATION_HOSPITAL_CITY_PROCEDURE_DOCTOR_MIN
  );
}

export function radiationHospitalRelationship(
  hospital: Hospital,
  doctorRows: Doctor[],
): RadiationHospitalRelationship {
  const faculty = doctorRows.filter(
    (doctor) =>
      doctor.hospitalSlug === hospital.slug &&
      doctor.specialty === RADIATION_HOSPITAL_SPECIALTY,
  );
  const taxonomy = proceduresForSpecialty(RADIATION_HOSPITAL_SPECIALTY);
  const procedures = taxonomy
    .filter(
      (procedure) =>
        hospital.procedureSlugs.includes(procedure.slug) &&
        faculty.some((doctor) => doctorHasProcedure(doctor, procedure.name)),
    )
    .map(({ name, slug }) => ({ name, slug }));
  return { hospital, doctors: faculty, procedures };
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

function buildQuickAnswers(opts: {
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
          `${opts.procedure} is a controlled Radiation Oncology procedure in the GAF catalog. Clinical suitability requires review by a qualified radiation oncologist.`,
        sourceHref: source?.source.canonicalUrl,
        sourceLabel: source
          ? `Read the complete ${opts.procedure} treatment and cost guide`
          : undefined,
        source: source?.source,
      },
      {
        question: `Which hospitals in ${place} offer ${opts.procedure}?`,
        answer: `${opts.hospitals.length} validated hospital relationship${opts.hospitals.length === 1 ? "" : "s"} currently match ${opts.procedure} in ${place}${hospitals ? `: ${hospitals}` : ""}. Inclusion requires both a hospital procedure mapping and an affiliated radiation oncologist mapped to the same procedure.`,
      },
      {
        question: `Which doctors are associated with ${opts.procedure}${opts.city ? ` in ${opts.city}` : ""}?`,
        answer: `${opts.doctors.length} listed radiation oncologist${opts.doctors.length === 1 ? "" : "s"} currently have an exact ${opts.procedure} relationship at the hospitals shown. A catalog relationship is not a guarantee that a clinician will accept every case.`,
      },
    ];
  }

  const procedures = procedureNames(opts.procedures);
  return [
    {
      question: opts.city
        ? "What is Radiation Oncology?"
        : "What is a Radiation Oncology hospital?",
      answer: opts.city
        ? `${radiationOncologyIndiaProfile.introAnswer} This ${opts.city} page is limited to hospitals with a listed radiation oncologist relationship.`
        : "A Radiation Oncology hospital on this page is an Indian campus with Radiation Oncology in its controlled specialty data and at least one affiliated radiation oncologist in the current GAF catalog. The listing does not imply that every radiation technique is available at every campus.",
      sourceHref: "/costs/India/Radiation-Oncology",
      sourceLabel: "Read the Radiation Oncology treatment and cost guide",
    },
    {
      question: `Which hospitals in ${place} offer Radiation Oncology?`,
      answer: `${opts.hospitals.length} validated hospital relationship${opts.hospitals.length === 1 ? "" : "s"} currently match Radiation Oncology in ${place}${hospitals ? `, including ${hospitals}` : ""}. Counts require a matching hospital specialty and affiliated radiation oncologist; they are not rankings or claims about outcomes.`,
    },
    {
      question: `Which Radiation Oncology procedures are available in ${place}?`,
      answer: procedures
        ? `${opts.procedures.length} procedures have validated hospital and doctor relationships in ${place}, including ${procedures}. Open a procedure page for the exact hospitals and doctors connected to that procedure.`
        : `No Radiation Oncology procedure currently has a validated hospital and doctor relationship in ${place}.`,
    },
  ];
}

function buildFaqs(opts: {
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
        q: `Which radiation oncologists are associated with ${opts.procedure}?`,
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
      q: `Which hospitals in ${place} offer Radiation Oncology?`,
      a: `${opts.hospitals.length} hospitals currently meet the validated specialty and affiliated-doctor rules shown on this page.`,
    },
    {
      q: `Which Radiation Oncology procedures are available in ${place}?`,
      a: `${opts.procedures.length} controlled procedures currently have both hospital and doctor relationship evidence in ${place}.`,
    },
    {
      q: `Which radiation oncologists practice in ${place}?`,
      a: `${opts.doctors.length} listed radiation oncologists are affiliated with the validated hospitals on this page.`,
    },
    {
      q: "How can I compare Radiation Oncology hospitals?",
      a: "Compare factual details such as city, accreditation, beds, established year, validated procedures and affiliated doctors. GAF does not assign an overall score or clinical ranking.",
    },
    {
      q: "What treatment costs should I consider?",
      a: "Use linked GAF cost guides as indicative India planning ranges. Technique, fractions, planning, imaging, admission and patient-specific requirements must be confirmed in a written hospital quotation.",
    },
  ];
}

export function buildRadiationHospitalHub(
  query: CatalogQuery,
  page = 1,
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
): RadiationHospitalHubData | undefined {
  if (!isRadiationHospitalDiscovery(query)) return undefined;
  const matchedHospitals = validatedRadiationHospitals(
    { city: query.city, procedure: query.procedure },
    hospitalRows,
    doctorRows,
  );
  if (
    !radiationHospitalCombinationEligible(
      { city: query.city, procedure: query.procedure },
      hospitalRows,
      doctorRows,
    )
  ) {
    return undefined;
  }

  const relationships = matchedHospitals
    .map((hospital) => radiationHospitalRelationship(hospital, doctorRows))
    .sort(
      (a, b) =>
        a.hospital.city.localeCompare(b.hospital.city) ||
        a.hospital.name.localeCompare(b.hospital.name),
    );
  const matchedDoctors = validDoctorsForHospitals(
    { city: query.city, procedure: query.procedure },
    matchedHospitals,
    doctorRows,
  );
  const paging = paginateHospitals(matchedHospitals, page);
  const procedure = query.procedure ? getProcedure(query.procedure) : undefined;
  const city = query.city ? getCity(query.city) : undefined;
  const procedures = proceduresForSpecialty(RADIATION_HOSPITAL_SPECIALTY)
    .map((row) => {
      const count = validatedRadiationHospitals(
        { city: query.city, procedure: row.name },
        hospitalRows,
        doctorRows,
      ).length;
      return {
        name: row.name,
        href: hospitalsPath({
          destination: "India",
          city: query.city,
          specialty: RADIATION_HOSPITAL_SPECIALTY,
          procedure: row.name,
        }),
        count,
        note: procedureDefinitionFromCanonical(row.name)?.text,
      };
    })
    .filter(
      (row) =>
        row.count > 0 &&
        radiationHospitalCombinationEligible(
          { city: query.city, procedure: row.name },
          hospitalRows,
          doctorRows,
        ),
    );

  const nationalProcedureHospitals = query.procedure
    ? validatedRadiationHospitals(
        { procedure: query.procedure },
        hospitalRows,
        doctorRows,
      )
    : validatedRadiationHospitals({}, hospitalRows, doctorRows);
  const cities = [...new Set(nationalProcedureHospitals.map((row) => row.city))]
    .map((name) => {
      const count = validatedRadiationHospitals(
        { city: name, procedure: query.procedure },
        hospitalRows,
        doctorRows,
      ).length;
      return {
        name,
        href: hospitalsPath({
          destination: "India",
          city: name,
          specialty: RADIATION_HOSPITAL_SPECIALTY,
          procedure: query.procedure,
        }),
        count,
      };
    })
    .filter(
      (row) =>
        row.count >= RADIATION_HOSPITAL_INDEX_MIN &&
        radiationHospitalCombinationEligible(
          { city: row.name, procedure: query.procedure },
          hospitalRows,
          doctorRows,
        ),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const guideProcedures = query.procedure
    ? proceduresForSpecialty(RADIATION_HOSPITAL_SPECIALTY).filter(
        (row) => row.name === query.procedure,
      )
    : proceduresForSpecialty(RADIATION_HOSPITAL_SPECIALTY).filter((row) =>
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
                specialty: RADIATION_HOSPITAL_SPECIALTY,
                procedure: row.name,
              }),
              note: "City-specific planning guide; a hospital quotation is still required",
            },
          ];
        })
      : [];
  const costGuides = [...cityCostGuides, ...indiaCostGuides];

  const relatedProcedures = query.procedure
    ? relatedProcedureNames(query.procedure, RADIATION_HOSPITAL_SPECIALTY)
        .map((name) => {
          const count = validatedRadiationHospitals(
            { city: query.city, procedure: name },
            hospitalRows,
            doctorRows,
          ).length;
          return {
            name,
            href: hospitalsPath({
              destination: "India",
              city: query.city,
              specialty: RADIATION_HOSPITAL_SPECIALTY,
              procedure: name,
            }),
            count,
          };
        })
        .filter(
          (row) =>
            row.count > 0 &&
            radiationHospitalCombinationEligible(
              { city: query.city, procedure: row.name },
              hospitalRows,
              doctorRows,
            ),
        )
    : [];
  const conditions = query.procedure
    ? mappedConditionsForProcedure(query.procedure, RADIATION_HOSPITAL_SPECIALTY)
    : specialtyConditionLinks(RADIATION_HOSPITAL_SPECIALTY);

  const place = query.city ? `${query.city}, India` : "India";
  const heading = query.procedure
    ? `Hospitals for ${query.procedure} in ${place}`
    : `Radiation Oncology Hospitals in ${place}`;
  const title = query.procedure
    ? query.city
      ? `Hospitals for ${query.procedure} in ${query.city}, India – Doctors & Cost`
      : `Hospitals for ${query.procedure} in India – Doctors, Treatment & Cost`
    : query.city
      ? `Radiation Oncology Hospitals in ${query.city}, India – Doctors & Procedures`
      : "Radiation Oncology Hospitals in India – Doctors, Procedures & Facilities";
  const description = query.procedure
    ? `Review ${matchedHospitals.length} validated hospitals and ${matchedDoctors.length} associated radiation oncologists for ${query.procedure} in ${place}. Relationships require matching hospital and doctor procedure data.`
    : `Review ${matchedHospitals.length} validated Radiation Oncology hospitals, ${matchedDoctors.length} affiliated radiation oncologists and ${procedures.length} mapped procedures in ${place}.`;
  const path = hospitalsPath({
    destination: "India",
    city: query.city,
    specialty: RADIATION_HOSPITAL_SPECIALTY,
    procedure: query.procedure,
  });

  const cityEditorial = city
    ? radiationOncologyIndiaProfile.cityEditorials.find(
        (row) => row.citySlug === city.slug,
      )
    : undefined;
  const cityNote = city ? radiationOncologyCityNotes[city.slug] : undefined;
  const cityContext =
    cityEditorial || cityNote
      ? {
          introduction:
            cityEditorial?.introduction ??
            (cityNote ? [cityNote.intro] : []),
          whyCity: cityEditorial?.whyCity ?? [],
          planning: cityEditorial?.planning ?? [],
          logistics:
            cityEditorial?.logistics ??
            (cityNote ? [cityNote.logistics] : []),
        }
      : undefined;

  const quickAnswers = buildQuickAnswers({
    city: query.city,
    procedure: query.procedure,
    hospitals: relationships,
    doctors: matchedDoctors,
    procedures,
  });
  const faqs = buildFaqs({
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
    { label: "Radiation oncologists", value: matchedDoctors.length },
    ...(!query.procedure
      ? [{ label: "Validated procedures", value: procedures.length }]
      : []),
    ...(!query.city ? [{ label: "Eligible cities", value: cities.length }] : []),
    { label: "Treatment guides", value: treatmentGuides.length },
    { label: "Cost guides", value: costGuides.length },
  ];

  return {
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

export function radiationHospitalPageIndexable(page: number, total: number) {
  return page === 1 && total >= RADIATION_HOSPITAL_INDEX_MIN;
}

export function radiationHospitalSitemapPaths(
  hospitalRows: Hospital[] = hospitals,
  doctorRows: Doctor[] = doctors,
) {
  const paths: string[] = [];
  const base = buildRadiationHospitalHub(
    { destination: "India", specialty: RADIATION_HOSPITAL_SPECIALTY },
    1,
    hospitalRows,
    doctorRows,
  );
  if (!base) return paths;
  paths.push(base.path);
  for (const city of base.cities) paths.push(city.href);
  for (const procedure of base.procedures) {
    paths.push(procedure.href);
    const procedureHub = buildRadiationHospitalHub(
      {
        destination: "India",
        specialty: RADIATION_HOSPITAL_SPECIALTY,
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
  return [...new Set(paths)];
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
  const radiationFaculty = radiationDoctors({}, doctorRows);
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
  RADIATION_ONCOLOGY_SELECTION_NOTE;
