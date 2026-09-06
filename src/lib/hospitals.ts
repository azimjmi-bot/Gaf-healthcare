import catalog from "@/data/ginger-catalog.json";
import { mapCatalogProcedures } from "@/lib/procedure-map";
import { getCity, getCountry, getProcedure, getSpecialty } from "@/lib/taxonomy";

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

const specialty = getSpecialty("Radiation Oncology");
if (!specialty) throw new Error("Missing Radiation Oncology specialty");

export const hospitals: Hospital[] = catalog.hospitals.map((seed) => {
  const cityName = seed.city || "Delhi NCR";
  const city = getCity(cityName);
  const country = getCountry("India");
  if (!city || !country) {
    throw new Error(`Hospital ${seed.slug} maps to unknown city ${cityName}`);
  }

  const faculty = catalog.doctors.filter((d) => d.hospitalSlug === seed.slug);
  const mapped = mapCatalogProcedures([
    ...faculty.flatMap((d) => d.proceduresExpertise),
    ...faculty.flatMap((d) => d.specializations),
    seed.bio,
  ]);
  const procedures = mapped.map((name) => {
    const procedure = getProcedure(name);
    if (!procedure) throw new Error(`Unmapped procedure ${name} on ${seed.slug}`);
    return procedure;
  });

  return {
    slug: seed.slug,
    name: seed.name,
    city: city.name,
    citySlug: city.slug,
    country: country.name,
    countrySlug: country.slug,
    accreditation: seed.accreditation,
    focus: specialty.name,
    specialty: specialty.name,
    specialtySlug: specialty.slug,
    procedures: procedures.map((p) => p.name),
    procedureSlugs: procedures.map((p) => p.slug),
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
    if (facet.specialtySlug && h.specialtySlug !== facet.specialtySlug) return false;
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

export function groupHospitalsForDirectory(list: Hospital[]): HospitalDirectorySpecialty[] {
  const tree = new Map<string, Map<string, Map<string, Hospital[]>>>();
  for (const hospital of list) {
    if (!tree.has(hospital.specialtySlug)) tree.set(hospital.specialtySlug, new Map());
    const countries = tree.get(hospital.specialtySlug)!;
    if (!countries.has(hospital.countrySlug)) countries.set(hospital.countrySlug, new Map());
    const cities = countries.get(hospital.countrySlug)!;
    if (!cities.has(hospital.citySlug)) cities.set(hospital.citySlug, []);
    cities.get(hospital.citySlug)!.push(hospital);
  }

  return [...tree.entries()]
    .map(([specialtySlug, countries]) => {
      const sample = list.find((h) => h.specialtySlug === specialtySlug)!;
      return {
        specialty: sample.specialty,
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
    .sort((a, b) => a.specialty.localeCompare(b.specialty));
}
