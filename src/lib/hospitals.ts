import catalog from "@/data/ginger-catalog.json";
import { mapCatalogProcedures } from "@/lib/procedure-map";
import {
  ATHENAA_SURGICAL_PROCEDURES,
  CARDIOLOGY_PROCEDURES,
  BARIATRIC_PROCEDURES,
  COSMETIC_PROCEDURES,
  ENT_PROCEDURES,
  GASTROENTEROLOGY_PROCEDURES,
  SURGICAL_GASTROENTEROLOGY_PROCEDURES,
  UROLOGY_PROCEDURES,
  SPINE_SURGERY_PROCEDURES,
  PULMONOLOGY_PROCEDURES,
  PEDIATRIC_ORTHOPAEDIC_PROCEDURES,
  ORTHOPEDICS_PROCEDURES,
  CARDIAC_SURGERY_PROCEDURES,
  PEDIATRIC_CARDIAC_SURGERY_PROCEDURES,
  HEMATOLOGY_PROCEDURES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  PEDIATRIC_HEMATOLOGY_PROCEDURES,
  SPECIALTIES,
  SURGICAL_ONCOLOGY_PROCEDURES,
  compareSpecialties,
  getCity,
  getCountry,
  getProcedure,
  getSpecialty,
} from "@/lib/taxonomy";

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  accreditation: string;
  focus: string;
  specialty: string;
  specialtySlug: string;
  specialties: string[];
  specialtySlugs: string[];
  procedures: string[];
  procedureSlugs: string[];
  established: string;
  beds: string;
  languages: string;
  icu: string;
  bio: string;
  summary: string;
};

function languagesFor(city: string) {
  if (city === "Mumbai") return "English, Hindi, Marathi";
  if (city === "Bengaluru") return "English, Kannada, Hindi";
  if (city === "Chennai") return "English, Tamil, Hindi";
  if (city === "Hyderabad") return "English, Telugu, Hindi";
  return "English, Hindi";
}

const radiation = getSpecialty("Radiation Oncology");
const surgical = getSpecialty("Surgical Oncology");
const medical = getSpecialty("Medical Oncology");
const hematology = getSpecialty("Hematology");
const pediatricHematology = getSpecialty("Pediatric Hematology");
const cardiacSurgery = getSpecialty("Cardiac Surgery");
const pediatricCardiacSurgery = getSpecialty("Pediatric Cardiac Surgery");
const cardiology = getSpecialty("Cardiology");
const bariatric = getSpecialty("Bariatric Surgery");
const cosmetic = getSpecialty("Cosmetic Surgery");
const ent = getSpecialty("ENT");
const gastroenterology = getSpecialty("Gastroenterology");
const surgicalGastroenterology = getSpecialty("Surgical Gastroenterology");
const urology = getSpecialty("Urology");
const spineSurgery = getSpecialty("Spine Surgery");
const pulmonology = getSpecialty("Pulmonology");
const pediatricOrthopaedic = getSpecialty("Pediatric Orthopaedic");
const orthopedics = getSpecialty("Orthopedics");
if (
  !radiation ||
  !surgical ||
  !medical ||
  !hematology ||
  !pediatricHematology ||
  !cardiacSurgery ||
  !pediatricCardiacSurgery ||
  !cardiology ||
  !bariatric ||
  !cosmetic ||
  !ent ||
  !gastroenterology ||
  !surgicalGastroenterology ||
  !urology ||
  !spineSurgery ||
  !pulmonology ||
  !pediatricOrthopaedic ||
  !orthopedics
) {
  throw new Error("Missing specialties");
}

function resolveProcedures(names: string[]) {
  return names.map((name) => {
    const procedure = getProcedure(name);
    if (!procedure) throw new Error(`Unmapped procedure ${name}`);
    return procedure;
  });
}

function surgicalNamesForCampus(slug: string) {
  if (slug === "apollo-athenaa-women-s-cancer-centre") {
    return [...ATHENAA_SURGICAL_PROCEDURES];
  }
  return [...SURGICAL_ONCOLOGY_PROCEDURES];
}

export const hospitals: Hospital[] = catalog.hospitals.map((seed) => {
  const cityName = seed.city || "Delhi NCR";
  const city = getCity(cityName);
  const country = getCountry("India");
  if (!city || !country) {
    throw new Error(`Hospital ${seed.slug} maps to unknown city ${cityName}`);
  }

  const faculty = catalog.doctors.filter((d) => d.hospitalSlug === seed.slug);
  const radiationFaculty = faculty.filter((d) => d.specialty === "Radiation Oncology");
  const radiationNames = mapCatalogProcedures(
    [
      ...radiationFaculty.flatMap((d) => d.proceduresExpertise),
      ...radiationFaculty.flatMap((d) => d.specializations),
      seed.bio,
    ],
    radiationFaculty.length > 0,
  );
  const procedures = resolveProcedures([
    ...radiationNames,
    ...surgicalNamesForCampus(seed.slug),
    ...MEDICAL_ONCOLOGY_PROCEDURES,
    ...HEMATOLOGY_PROCEDURES,
    ...PEDIATRIC_HEMATOLOGY_PROCEDURES,
    ...CARDIAC_SURGERY_PROCEDURES,
    ...PEDIATRIC_CARDIAC_SURGERY_PROCEDURES,
    ...CARDIOLOGY_PROCEDURES,
    ...BARIATRIC_PROCEDURES,
    ...COSMETIC_PROCEDURES,
    ...ENT_PROCEDURES,
    ...GASTROENTEROLOGY_PROCEDURES,
    ...SURGICAL_GASTROENTEROLOGY_PROCEDURES,
    ...UROLOGY_PROCEDURES,
    ...SPINE_SURGERY_PROCEDURES,
    ...PULMONOLOGY_PROCEDURES,
    ...PEDIATRIC_ORTHOPAEDIC_PROCEDURES,
    ...ORTHOPEDICS_PROCEDURES,
  ]);
  const seen = new Set<string>();
  const unique = procedures.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  return {
    slug: seed.slug,
    name: seed.name,
    city: city.name,
    citySlug: city.slug,
    country: country.name,
    countrySlug: country.slug,
    accreditation: seed.accreditation,
    focus: `${radiation.name} · ${surgical.name} · ${medical.name} · ${hematology.name} · ${pediatricHematology.name} · ${cardiacSurgery.name} · ${pediatricCardiacSurgery.name} · ${cardiology.name} · ${bariatric.name} · ${cosmetic.name} · ${ent.name} · ${gastroenterology.name} · ${surgicalGastroenterology.name} · ${urology.name} · ${spineSurgery.name} · ${pulmonology.name} · ${pediatricOrthopaedic.name} · ${orthopedics.name}`,
    specialty: radiation.name,
    specialtySlug: radiation.slug,
    specialties: [
      radiation.name,
      surgical.name,
      medical.name,
      hematology.name,
      pediatricHematology.name,
      cardiacSurgery.name,
      pediatricCardiacSurgery.name,
      cardiology.name,
      bariatric.name,
      cosmetic.name,
      ent.name,
      gastroenterology.name,
      surgicalGastroenterology.name,
      urology.name,
      spineSurgery.name,
      pulmonology.name,
      pediatricOrthopaedic.name,
      orthopedics.name,
    ],
    specialtySlugs: [
      radiation.slug,
      surgical.slug,
      medical.slug,
      hematology.slug,
      pediatricHematology.slug,
      cardiacSurgery.slug,
      pediatricCardiacSurgery.slug,
      cardiology.slug,
      bariatric.slug,
      cosmetic.slug,
      ent.slug,
      gastroenterology.slug,
      surgicalGastroenterology.slug,
      urology.slug,
      spineSurgery.slug,
      pulmonology.slug,
      pediatricOrthopaedic.slug,
      orthopedics.slug,
    ],
    procedures: unique.map((p) => p.name),
    procedureSlugs: unique.map((p) => p.slug),
    established: seed.established,
    beds: seed.beds,
    languages: languagesFor(city.name),
    icu: "Oncology ICU",
    bio: seed.bio,
    summary: seed.bio,
  };
});

export function getHospital(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}

export function hospitalsInCity(citySlug: string) {
  return hospitals.filter((h) => h.citySlug === citySlug);
}

export type HospitalPseoFacet = {
  specialtySlug?: string;
  procedureSlug?: string;
  citySlug?: string;
  countrySlug?: string;
};

export function hospitalsMatchingPseo(facet: HospitalPseoFacet) {
  return hospitals.filter((h) => {
    if (facet.specialtySlug && !h.specialtySlugs.includes(facet.specialtySlug)) return false;
    if (facet.procedureSlug && !h.procedureSlugs.includes(facet.procedureSlug)) return false;
    if (facet.citySlug && h.citySlug !== facet.citySlug) return false;
    if (facet.countrySlug && h.countrySlug !== facet.countrySlug) return false;
    return true;
  });
}

export type HospitalDirectoryCity = {
  city: string;
  citySlug: string;
  hospitals: Hospital[];
};

export type HospitalDirectoryCountry = {
  country: string;
  countrySlug: string;
  cities: HospitalDirectoryCity[];
};

export type HospitalDirectorySpecialty = {
  specialty: string;
  specialtySlug: string;
  countries: HospitalDirectoryCountry[];
};

export function groupHospitalsForDirectory(
  list: Hospital[],
  specialtyName?: string,
): HospitalDirectorySpecialty[] {
  const onlySlug = specialtyName ? getSpecialty(specialtyName)?.slug : undefined;
  const tree = new Map<string, Map<string, Map<string, Hospital[]>>>();
  for (const hospital of list) {
    const specSlugs = onlySlug
      ? hospital.specialtySlugs.filter((s) => s === onlySlug)
      : hospital.specialtySlugs;
    for (const specSlug of specSlugs) {
      if (!tree.has(specSlug)) tree.set(specSlug, new Map());
      const countries = tree.get(specSlug)!;
      if (!countries.has(hospital.countrySlug)) countries.set(hospital.countrySlug, new Map());
      const cities = countries.get(hospital.countrySlug)!;
      if (!cities.has(hospital.citySlug)) cities.set(hospital.citySlug, []);
      const bucket = cities.get(hospital.citySlug)!;
      if (!bucket.some((h) => h.slug === hospital.slug)) bucket.push(hospital);
    }
  }

  return [...tree.entries()]
    .map(([specialtySlug, countries]) => {
      const spec = SPECIALTIES.find((s) => s.slug === specialtySlug);
      if (!spec) throw new Error(`Unknown specialty ${specialtySlug}`);
      return {
        specialty: spec.name,
        specialtySlug,
        countries: [...countries.entries()]
          .map(([countrySlug, cities]) => {
            const countrySample = list.find((h) => h.countrySlug === countrySlug)!;
            return {
              country: countrySample.country,
              countrySlug,
              cities: [...cities.entries()]
                .map(([citySlug, rows]) => ({
                  city: rows[0].city,
                  citySlug,
                  hospitals: rows.sort((a, b) => a.name.localeCompare(b.name)),
                }))
                .sort((a, b) => a.city.localeCompare(b.city)),
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country)),
      };
    })
    .sort((a, b) => compareSpecialties(a.specialtySlug, b.specialtySlug));
}
