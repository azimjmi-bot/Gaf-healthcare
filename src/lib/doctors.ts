import catalog from "@/data/ginger-catalog.json";
import { getHospital } from "@/lib/hospitals";
import {
  getCity,
  getCountry,
  getProcedure,
  getSpecialty,
  RADIATION_PROCEDURES,
} from "@/lib/taxonomy";

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  qualifications: string;
  featured: boolean;
  hospitalSlug: string;
  hospitalName: string;
  hospitalImage: string;
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
  cases: string;
  image: string;
  bio: string;
  excerpt: string;
};

const PROCEDURE_RULES: { test: RegExp; name: (typeof RADIATION_PROCEDURES)[number] }[] = [
  { test: /cyber\s*knife/i, name: "CyberKnife" },
  { test: /gamma\s*knife/i, name: "Gamma Knife" },
  { test: /proton/i, name: "Proton Beam Therapy" },
  { test: /\btbi\b|total body/i, name: "Total Body Irradiation (TBI)" },
  { test: /\biort\b|intraoperative/i, name: "Intraoperative Radiotherapy (IORT)" },
  { test: /plaque/i, name: "Plaque Brachytherapy" },
  { test: /interstitial/i, name: "Interstitial Brachytherapy" },
  { test: /intracavitary/i, name: "Intracavitary Brachytherapy" },
  { test: /brachytherapy/i, name: "Brachytherapy" },
  { test: /\bsbrt\b|stereotactic body/i, name: "Stereotactic Body Radiotherapy (SBRT)" },
  { test: /\bsrs\b|stereotactic radio/i, name: "Stereotactic Radiosurgery (SRS)" },
  { test: /\bimrt\b|intensity-modulated/i, name: "Intensity-Modulated Radiotherapy (IMRT)" },
  { test: /\bigrt\b|image-guided/i, name: "Image-Guided Radiotherapy (IGRT)" },
  { test: /3d|conformal/i, name: "3D Conformal Radiotherapy (3D-CRT)" },
  { test: /\bebrt\b|external beam/i, name: "External Beam Radiotherapy (EBRT)" },
];

function mapCatalogProcedures(texts: string[]) {
  const found = new Set<(typeof RADIATION_PROCEDURES)[number]>();
  for (const text of texts) {
    for (const rule of PROCEDURE_RULES) {
      if (rule.test.test(text)) found.add(rule.name);
    }
  }
  if (found.size === 0) found.add("External Beam Radiotherapy (EBRT)");
  return [...found];
}

function cleanTitle(raw: string) {
  let title = raw.trim();
  const hits = title.match(/radiation oncology/gi) ?? [];
  if (hits.length >= 2) {
    title = title.replace(/,\s*Radiation Oncology$/i, "").trim();
  }
  return title || "Radiation Oncologist";
}

function languagesFor(city: string) {
  if (city === "Mumbai") return "English, Hindi, Marathi";
  if (city === "Bengaluru") return "English, Kannada, Hindi";
  if (city === "Chennai") return "English, Tamil, Hindi";
  if (city === "Hyderabad") return "English, Telugu, Hindi";
  return "English, Hindi";
}

const specialty = getSpecialty("Radiation Oncology");
if (!specialty) throw new Error("Missing Radiation Oncology specialty");

export const doctors: Doctor[] = catalog.doctors.map((seed) => {
  const hospital = getHospital(seed.hospitalSlug);
  const cityName = seed.city || hospital?.city || "Delhi NCR";
  const city = getCity(cityName);
  const country = getCountry("India");
  if (!city || !country) {
    throw new Error(`Doctor ${seed.slug} has unknown city ${cityName}`);
  }

  const mapped = mapCatalogProcedures([
    ...seed.proceduresExpertise,
    ...seed.specializations,
    seed.summary,
    seed.designation,
  ]);
  const procedures = mapped.map((name) => {
    const procedure = getProcedure(name);
    if (!procedure) throw new Error(`Unmapped procedure ${name}`);
    return procedure;
  });

  const title = cleanTitle(seed.designation || "Radiation Oncologist");
  const image = seed.image;
  if (!image) throw new Error(`Doctor ${seed.slug} has no portrait`);

  return {
    slug: seed.slug,
    name: seed.name,
    title,
    qualifications: seed.qualifications,
    featured: seed.featured,
    hospitalSlug: seed.hospitalSlug,
    hospitalName: hospital?.name || seed.hospitalCaption || seed.hospitalName,
    hospitalImage: seed.hospitalImage || hospital?.image || "",
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
    cases: "",
    image,
    bio: seed.summary,
    excerpt: seed.excerpt || seed.summary.slice(0, 280),
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
    .sort((a, b) => a.specialty.localeCompare(b.specialty));
}
