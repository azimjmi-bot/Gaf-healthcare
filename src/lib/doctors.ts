import catalog from "@/data/ginger-catalog.json";
import { getHospital } from "@/lib/hospitals";
import { mapDoctorProcedures } from "@/lib/procedure-map";
import { compareSpecialties, getCity, getCountry, getProcedure, getSpecialty } from "@/lib/taxonomy";

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  qualifications: string;
  featured: boolean;
  hospitalSlug: string;
  hospitalName: string;
  specialty: string;
  specialtySlug: string;
  procedures: string[];
  procedureSlugs: string[];
  treatmentSlugs: string[];
  proceduresExpertise: string[];
  specializations: string[];
  education: string[];
  affiliations: string[];
  memberships: string[];
  awards: string[];
  research: string[];
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  credentials: string;
  languages: string;
  years: string;
  experience: string;
  bio: string;
};

function cleanTitle(raw: string, specialty: string) {
  let title = raw.trim();
  const needle = specialty.toLowerCase();
  const hits = title.match(new RegExp(needle.replace(/[()]/g, "\\$&"), "gi")) ?? [];
  if (hits.length >= 2) {
    title = title.replace(new RegExp(`,\\s*${specialty.replace(/[()]/g, "\\$&")}$`, "i"), "").trim();
  }
  return (
    title ||
    (specialty === "Surgical Oncology"
      ? "Surgical Oncologist"
      : specialty === "Medical Oncology"
        ? "Medical Oncologist"
        : specialty === "Hematology"
          ? "Hematologist"
          : specialty === "Pediatric Hematology"
            ? "Pediatric Hematologist"
            : specialty === "Cardiac Surgery"
              ? "Cardiac Surgeon"
              : specialty === "Pediatric Cardiac Surgery"
                ? "Pediatric Cardiac Surgeon"
                : specialty === "Cardiology"
                  ? "Cardiologist"
          : "Radiation Oncologist")
  );
}

function languagesFor(city: string) {
  if (city === "Mumbai") return "English, Hindi, Marathi";
  if (city === "Bengaluru") return "English, Kannada, Hindi";
  if (city === "Chennai") return "English, Tamil, Hindi";
  if (city === "Hyderabad") return "English, Telugu, Hindi";
  return "English, Hindi";
}

const radiationSpecialty = getSpecialty("Radiation Oncology");
if (!radiationSpecialty) throw new Error("Missing Radiation Oncology specialty");

export const doctors: Doctor[] = catalog.doctors.map((seed) => {
  const hospital = getHospital(seed.hospitalSlug);
  const cityName = seed.city || hospital?.city || "Delhi NCR";
  const city = getCity(cityName);
  const country = getCountry("India");
  if (!city || !country) {
    throw new Error(`Doctor ${seed.slug} has unknown city ${cityName}`);
  }

  const specialty =
    getSpecialty(seed.specialty) ?? radiationSpecialty;

  const mapped = mapDoctorProcedures(specialty.name, [
    ...seed.proceduresExpertise,
    ...seed.specializations,
    seed.designation,
  ]);
  const procedures = mapped.map((name) => {
    const procedure = getProcedure(name);
    if (!procedure) throw new Error(`Unmapped procedure ${name}`);
    return procedure;
  });

  const title = cleanTitle(seed.designation || specialty.name, specialty.name);

  return {
    slug: seed.slug,
    name: seed.name,
    title,
    qualifications: seed.qualifications,
    featured: seed.featured,
    hospitalSlug: seed.hospitalSlug,
    hospitalName: hospital?.name || seed.hospitalCaption || seed.hospitalName,
    specialty: specialty.name,
    specialtySlug: specialty.slug,
    procedures: procedures.map((p) => p.name),
    procedureSlugs: procedures.map((p) => p.slug),
    treatmentSlugs: procedures.map((p) => p.slug),
    proceduresExpertise: seed.proceduresExpertise,
    specializations: seed.specializations.length ? seed.specializations : [specialty.name],
    education: seed.education,
    affiliations: seed.affiliations,
    memberships: seed.memberships,
    awards: seed.awards,
    research: seed.research,
    city: city.name,
    citySlug: city.slug,
    country: country.name,
    countrySlug: country.slug,
    credentials: seed.qualifications,
    languages: languagesFor(city.name),
    years: seed.experience,
    experience: seed.experience,
    bio: seed.bio,
  };
});

const slugs = new Set<string>();
for (const doctor of doctors) {
  if (slugs.has(doctor.slug)) throw new Error(`Duplicate doctor slug ${doctor.slug}`);
  slugs.add(doctor.slug);
}

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

export function doctorsForHospital(slug: string) {
  return doctors.filter((d) => d.hospitalSlug === slug);
}

export function doctorsForTreatment(slug: string) {
  return doctors.filter((d) => d.procedureSlugs.includes(slug) || d.treatmentSlugs.includes(slug));
}

export type DoctorPseoFacet = {
  specialtySlug?: string;
  procedureSlug?: string;
  citySlug?: string;
  countrySlug?: string;
};

export function doctorsMatchingPseo(facet: DoctorPseoFacet) {
  return doctors.filter((d) => {
    if (facet.specialtySlug && d.specialtySlug !== facet.specialtySlug) return false;
    if (facet.procedureSlug && !d.procedureSlugs.includes(facet.procedureSlug)) return false;
    if (facet.citySlug && d.citySlug !== facet.citySlug) return false;
    if (facet.countrySlug && d.countrySlug !== facet.countrySlug) return false;
    return true;
  });
}

export type DoctorDirectoryCity = {
  city: string;
  citySlug: string;
  doctors: Doctor[];
};

export type DoctorDirectoryCountry = {
  country: string;
  countrySlug: string;
  cities: DoctorDirectoryCity[];
};

export type DoctorDirectorySpecialty = {
  specialty: string;
  specialtySlug: string;
  countries: DoctorDirectoryCountry[];
};

export type DoctorCampusGroup = {
  hospitalSlug: string;
  hospitalName: string;
  doctors: Doctor[];
};

export function groupDoctorsUnderHospitals(list: Doctor[]): {
  specialty: string;
  specialtySlug: string;
  countries: {
    country: string;
    countrySlug: string;
    cities: {
      city: string;
      citySlug: string;
      campuses: DoctorCampusGroup[];
    }[];
  }[];
}[] {
  const tree = new Map<
    string,
    Map<string, Map<string, Map<string, Doctor[]>>>
  >();

  for (const doctor of list) {
    if (!tree.has(doctor.specialtySlug)) tree.set(doctor.specialtySlug, new Map());
    const countries = tree.get(doctor.specialtySlug)!;
    if (!countries.has(doctor.countrySlug)) countries.set(doctor.countrySlug, new Map());
    const cities = countries.get(doctor.countrySlug)!;
    if (!cities.has(doctor.citySlug)) cities.set(doctor.citySlug, new Map());
    const campuses = cities.get(doctor.citySlug)!;
    if (!campuses.has(doctor.hospitalSlug)) campuses.set(doctor.hospitalSlug, []);
    campuses.get(doctor.hospitalSlug)!.push(doctor);
  }

  return [...tree.entries()]
    .map(([specialtySlug, countries]) => {
      const sample = list.find((d) => d.specialtySlug === specialtySlug)!;
      return {
        specialty: sample.specialty,
        specialtySlug,
        countries: [...countries.entries()]
          .map(([countrySlug, cities]) => {
            const countrySample = list.find((d) => d.countrySlug === countrySlug)!;
            return {
              country: countrySample.country,
              countrySlug,
              cities: [...cities.entries()]
                .map(([citySlug, campuses]) => ({
                  city: [...campuses.values()][0][0].city,
                  citySlug,
                  campuses: [...campuses.entries()]
                    .map(([hospitalSlug, docs]) => ({
                      hospitalSlug,
                      hospitalName: docs[0].hospitalName,
                      doctors: docs.sort((a, b) => {
                        if (a.featured !== b.featured) return a.featured ? -1 : 1;
                        return a.name.localeCompare(b.name);
                      }),
                    }))
                    .sort((a, b) => a.hospitalName.localeCompare(b.hospitalName)),
                }))
                .sort((a, b) => a.city.localeCompare(b.city)),
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country)),
      };
    })
    .sort((a, b) => compareSpecialties(a.specialtySlug, b.specialtySlug));
}

export function groupDoctorsForDirectory(list: Doctor[]): DoctorDirectorySpecialty[] {
  const specialties = new Map<string, Map<string, Map<string, Doctor[]>>>();

  for (const doctor of list) {
    if (!specialties.has(doctor.specialtySlug)) specialties.set(doctor.specialtySlug, new Map());
    const countries = specialties.get(doctor.specialtySlug)!;
    if (!countries.has(doctor.countrySlug)) countries.set(doctor.countrySlug, new Map());
    const cities = countries.get(doctor.countrySlug)!;
    if (!cities.has(doctor.citySlug)) cities.set(doctor.citySlug, []);
    cities.get(doctor.citySlug)!.push(doctor);
  }

  return [...specialties.entries()]
    .map(([specialtySlug, countries]) => {
      const sample = list.find((d) => d.specialtySlug === specialtySlug)!;
      return {
        specialty: sample.specialty,
        specialtySlug,
        countries: [...countries.entries()]
          .map(([countrySlug, cities]) => {
            const countrySample = list.find((d) => d.countrySlug === countrySlug)!;
            return {
              country: countrySample.country,
              countrySlug,
              cities: [...cities.entries()]
                .map(([citySlug, docs]) => ({
                  city: docs[0].city,
                  citySlug,
                  doctors: docs.sort((a, b) => {
                    if (a.featured !== b.featured) return a.featured ? -1 : 1;
                    return a.name.localeCompare(b.name);
                  }),
                }))
                .sort((a, b) => a.city.localeCompare(b.city)),
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country)),
      };
    })
    .sort((a, b) => compareSpecialties(a.specialtySlug, b.specialtySlug));
}
