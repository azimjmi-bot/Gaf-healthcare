import "server-only";
import { getCostArticle } from "@/data/cost-articles";
import type { SpecialtyCityEditorial, SpecialtyPageProfile } from "@/data/specialty-pages";
import { filterDoctors, filterHospitals, filterTreatments } from "@/lib/catalog";
import { doctors, hospitals, treatments } from "@/lib/data";
import { COUNTRIES, CITIES, getSpecialty, type CityTaxon } from "@/lib/taxonomy";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";

type PriceBand = {
  currency: "$";
  min: number;
  max: number;
};

export type SpecialtyPriceRow = {
  procedure: Treatment;
  countryRange: string;
  cityRange?: string;
};

export type SpecialtyPricingGroupData = {
  name: string;
  basis: string;
  explanation: string;
  rows: SpecialtyPriceRow[];
};

export type CityUniquenessAssessment = {
  citySpecificBlocks: number;
  sharedInformationBlocks: number;
  estimatedInformationShare: number;
  evidence: {
    editorialIntroduction: boolean;
    treatmentInventory: boolean;
    hospitalInventory: boolean;
    doctorInventory: boolean;
    cityPricing: boolean;
    technologyRelationships: boolean;
    ecosystemContext: boolean;
    patientLogistics: boolean;
    cityFaqs: boolean;
    entityLinks: boolean;
  };
  meetsThreshold: boolean;
};

export type SpecialtyCityData = {
  name: string;
  slug: string;
  doctorCount: number;
  hospitalCount: number;
  procedureCount: number;
};

export type SpecialtyTreatmentGroupData = {
  name: string;
  summary: string;
  procedures: Treatment[];
};

export type SpecialtyConditionData = {
  name: string;
  summary: string;
  procedures: Treatment[];
};

export type SpecialtyTechnologyData = {
  name: string;
  what: string;
  why: string;
  procedures: Treatment[];
};

export type SpecialtyPageData = {
  profile: SpecialtyPageProfile;
  specialty: NonNullable<ReturnType<typeof getSpecialty>>;
  country: (typeof COUNTRIES)[number];
  city?: CityTaxon;
  cityEditorial?: SpecialtyCityEditorial;
  procedures: Treatment[];
  nationalProcedureCount: number;
  doctors: Doctor[];
  hospitals: Hospital[];
  featuredDoctors: Doctor[];
  featuredHospitals: Hospital[];
  doctorCountsByHospital: Map<string, number>;
  cities: SpecialtyCityData[];
  treatmentGroups: SpecialtyTreatmentGroupData[];
  conditions: SpecialtyConditionData[];
  technologies: SpecialtyTechnologyData[];
  pricingGroups: SpecialtyPricingGroupData[];
  relatedSpecialties: NonNullable<ReturnType<typeof getSpecialty>>[];
  costRange?: string;
  pricedProcedureCount: number;
  cityPricedProcedureCount: number;
  hasCitySpecificPricing: boolean;
  cityUniqueness?: CityUniquenessAssessment;
};

function parseUsdRange(value: string): PriceBand | undefined {
  if (!value.trim().startsWith("$")) return undefined;
  const numbers = [...value.matchAll(/\d[\d,]*/g)]
    .map((match) => Number(match[0].replace(/,/g, "")))
    .filter((number) => Number.isFinite(number));
  if (numbers.length < 2) return undefined;
  return { currency: "$", min: numbers[0], max: numbers[numbers.length - 1] };
}

function formatUsd(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function aggregateCostRange(procedures: Treatment[]) {
  const bands = procedures
    .map((procedure) => parseUsdRange(procedure.partnerRange))
    .filter((band): band is PriceBand => Boolean(band));
  if (bands.length === 0) return { pricedProcedureCount: 0 };
  return {
    costRange: `${formatUsd(Math.min(...bands.map((band) => band.min)))}–${formatUsd(
      Math.max(...bands.map((band) => band.max)),
    )}`,
    pricedProcedureCount: bands.length,
  };
}

function mapProcedures(slugs: string[], index: Map<string, Treatment>) {
  return slugs
    .map((slug) => index.get(slug))
    .filter((procedure): procedure is Treatment => Boolean(procedure));
}

export function specialtyProcedureSummary(procedure: Treatment) {
  const article = getCostArticle(procedure.slug);
  const first = article?.overview.what[0] ?? procedure.summary;
  const sentence = first.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? first;
  return sentence.replace(/\s+/g, " ").trim();
}

export function buildSpecialtyPageData(
  profile: SpecialtyPageProfile,
  citySlug?: string,
): SpecialtyPageData | undefined {
  const specialty = getSpecialty(profile.specialtySlug);
  const country = COUNTRIES.find((item) => item.slug === profile.countrySlug);
  if (!specialty || !country) return undefined;

  const city = citySlug
    ? CITIES.find(
        (item) => item.slug === citySlug && item.countrySlug === country.slug,
      )
    : undefined;
  if (citySlug && !city) return undefined;
  const cityEditorial = city
    ? profile.cityEditorials.find((item) => item.citySlug === city.slug)
    : undefined;
  const nationalQuery = { destination: country.name, specialty: specialty.name };
  const nationalProcedures = filterTreatments(
    nationalQuery,
    treatments,
    hospitals,
  );
  const nationalDoctors = filterDoctors(nationalQuery, doctors);
  const nationalHospitals = filterHospitals(nationalQuery, hospitals);
  const query = {
    ...nationalQuery,
    ...(city ? { city: city.name } : {}),
  };
  const matchedProcedures = filterTreatments(query, treatments, hospitals);
  const matchedDoctors = filterDoctors(query, doctors);
  const matchedHospitals = filterHospitals(query, hospitals);
  const procedureIndex = new Map(
    matchedProcedures.map((procedure) => [procedure.slug, procedure]),
  );
  const doctorCountsByHospital = new Map<string, number>();
  for (const doctor of matchedDoctors) {
    doctorCountsByHospital.set(
      doctor.hospitalSlug,
      (doctorCountsByHospital.get(doctor.hospitalSlug) ?? 0) + 1,
    );
  }

  const cities = CITIES.filter((city) => city.countrySlug === country.slug)
    .map((city) => {
      const cityHospitals = nationalHospitals.filter(
        (hospital) => hospital.citySlug === city.slug,
      );
      const hospitalSlugs = new Set(cityHospitals.map((hospital) => hospital.slug));
      return {
        name: city.name,
        slug: city.slug,
        doctorCount: nationalDoctors.filter((doctor) => doctor.city === city.name).length,
        hospitalCount: cityHospitals.length,
        procedureCount: nationalProcedures.filter((procedure) =>
          procedure.hospitalSlugs.some((slug) => hospitalSlugs.has(slug)),
        ).length,
      };
    })
    .filter(
      (city) =>
        city.doctorCount > 0 &&
        city.hospitalCount > 0 &&
        city.procedureCount > 0 &&
        profile.cityEditorials.some((editorial) => editorial.citySlug === city.slug),
    );

  const featuredDoctors = [...matchedDoctors]
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
    )
    .slice(0, 8);
  const featuredHospitals = [...matchedHospitals]
    .sort(
      (a, b) =>
        (doctorCountsByHospital.get(b.slug) ?? 0) -
          (doctorCountsByHospital.get(a.slug) ?? 0) ||
        b.procedureSlugs.filter((slug) => procedureIndex.has(slug)).length -
          a.procedureSlugs.filter((slug) => procedureIndex.has(slug)).length ||
        a.name.localeCompare(b.name),
    )
    .slice(0, 6);
  const pricingGroups = profile.pricingGroups
    .map((group) => ({
      ...group,
      rows: mapProcedures(group.procedureSlugs, procedureIndex).map(
        (procedure) => {
          const article = getCostArticle(procedure.slug);
          const cityRange = city
            ? article?.cities.find((item) => item.citySlug === city.slug)
                ?.costRange
            : undefined;
          return {
            procedure,
            countryRange: procedure.partnerRange,
            cityRange,
          };
        },
      ),
    }))
    .filter((group) => group.rows.length > 0);
  const cityPricedProcedureCount = pricingGroups.reduce(
    (sum, group) =>
      sum + group.rows.filter((row) => Boolean(row.cityRange)).length,
    0,
  );
  const compatibleSummary =
    pricingGroups.length === 1
      ? aggregateCostRange(pricingGroups[0].rows.map((row) => row.procedure))
      : { pricedProcedureCount: matchedProcedures.filter((procedure) =>
          Boolean(parseUsdRange(procedure.partnerRange)),
        ).length };

  const data: SpecialtyPageData = {
    profile,
    specialty,
    country,
    city,
    cityEditorial,
    procedures: matchedProcedures,
    nationalProcedureCount: nationalProcedures.length,
    doctors: matchedDoctors,
    hospitals: matchedHospitals,
    featuredDoctors,
    featuredHospitals,
    doctorCountsByHospital,
    cities,
    treatmentGroups: profile.treatmentGroups
      .map((group) => ({
        ...group,
        procedures: mapProcedures(group.procedureSlugs, procedureIndex),
      }))
      .filter((group) => group.procedures.length > 0),
    conditions: profile.conditions
      .map((condition) => ({
        ...condition,
        procedures: mapProcedures(condition.procedureSlugs, procedureIndex),
      }))
      .filter((condition) => !city || condition.procedures.length > 0),
    technologies: profile.technologies
      .map((technology) => ({
        ...technology,
        procedures: mapProcedures(technology.procedureSlugs, procedureIndex),
      }))
      .filter((technology) => technology.procedures.length > 0),
    pricingGroups,
    relatedSpecialties: profile.relatedSpecialtySlugs
      .map((slug) => getSpecialty(slug))
      .filter(
        (
          related,
        ): related is NonNullable<ReturnType<typeof getSpecialty>> =>
          Boolean(related),
      ),
    ...compatibleSummary,
    cityPricedProcedureCount,
    hasCitySpecificPricing: cityPricedProcedureCount > 0,
  };
  data.cityUniqueness = city ? assessCityUniqueness(data) : undefined;
  return data;
}

export function assessCityUniqueness(
  data: SpecialtyPageData,
): CityUniquenessAssessment {
  const editorial = data.cityEditorial;
  const evidence = {
    editorialIntroduction: Boolean(editorial?.introduction.length),
    treatmentInventory: data.procedures.length >= 3,
    hospitalInventory: data.hospitals.length > 0,
    doctorInventory: data.doctors.length > 0,
    cityPricing: data.cityPricedProcedureCount > 0,
    technologyRelationships: data.technologies.length > 0,
    ecosystemContext: Boolean(editorial?.whyCity.length),
    patientLogistics: Boolean(
      editorial?.planning.length && editorial.logistics.length,
    ),
    cityFaqs: Boolean(editorial?.faqExtras.length),
    entityLinks: data.cities.length > 1,
  };
  const citySpecificBlocks = Object.values(evidence).filter(Boolean).length;
  // The shared specialty framework contains approximately twenty substantive
  // clinical, cost, trust and navigation blocks.
  const sharedInformationBlocks = 20;
  const estimatedInformationShare =
    citySpecificBlocks / (citySpecificBlocks + sharedInformationBlocks);
  return {
    citySpecificBlocks,
    sharedInformationBlocks,
    estimatedInformationShare,
    evidence,
    meetsThreshold:
      Boolean(data.city && editorial) &&
      citySpecificBlocks >= 8 &&
      estimatedInformationShare >= 0.25,
  };
}

export function specialtyPageMeetsQualityThreshold(data: SpecialtyPageData) {
  const groupedProcedures = new Set(
    data.profile.treatmentGroups.flatMap((group) => group.procedureSlugs),
  );
  const pricedProcedures = new Set(
    data.profile.pricingGroups.flatMap((group) => group.procedureSlugs),
  );
  return (
    data.profile.status === "published" &&
    data.profile.overview.length >= 2 &&
    data.profile.selection.length >= 2 &&
    data.profile.treatmentProcess.length >= 5 &&
    data.profile.costExplanation.length >= 2 &&
    data.profile.recordsRequired.length >= 5 &&
    data.profile.faqs.length >= 8 &&
    data.procedures.length >= 3 &&
    data.doctors.length > 0 &&
    data.hospitals.length > 0 &&
    data.procedures.every((procedure) => groupedProcedures.has(procedure.slug)) &&
    data.procedures.every((procedure) => pricedProcedures.has(procedure.slug)) &&
    (!data.city || Boolean(data.cityUniqueness?.meetsThreshold))
  );
}
