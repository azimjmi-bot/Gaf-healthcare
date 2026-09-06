import { getHospital } from "@/lib/hospitals";
import {
  getProcedure,
  getSpecialty,
  PROCEDURE_CLUSTERS,
  type ProcedureCluster,
} from "@/lib/taxonomy";

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  hospitalSlug: string;
  specialty: string;
  specialtySlug: string;
  procedures: string[];
  procedureSlugs: string[];
  treatmentSlugs: string[];
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  credentials: string;
  languages: string;
  years: string;
  cases: string;
  image: string;
  bio: string;
};

type Seed = {
  slug: string;
  name: string;
  hospitalSlug: string;
  cluster: ProcedureCluster;
  credentials: string;
  languages: string;
  years: string;
  cases: string;
  image: string;
  bio: string;
};

const PORTRAITS = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
];

const seeds: Seed[] = [
  {
    slug: "min-seo-park",
    name: "Dr. Min-seo Park",
    hospitalSlug: "cheongdam-atelier",
    cluster: "linac",
    credentials: "Board-certified radiation oncologist · Korean Society of Radiation Oncology",
    languages: "English, Korean",
    years: "18 years",
    cases: "2,400+ linac courses",
    image: PORTRAITS[0],
    bio: "Dr. Park plans EBRT and IMRT as one architecture — organs at risk first, then fractions. She declines add-on IMRT that does not change the DVH.",
  },
  {
    slug: "hana-lee",
    name: "Dr. Hana Lee",
    hospitalSlug: "cheongdam-atelier",
    cluster: "stereo",
    credentials: "Seoul National University · SRS/SBRT fellowship",
    languages: "English, Korean, Mandarin",
    years: "14 years",
    cases: "Intracranial SRS and body SBRT",
    image: PORTRAITS[1],
    bio: "Dr. Lee runs the stereotactic list at Cheongdam: Gamma Knife, linac SRS, and SBRT with immobilisation decided before you buy a ticket.",
  },
  {
    slug: "ji-hoon-choi",
    name: "Dr. Ji-hoon Choi",
    hospitalSlug: "cheongdam-atelier",
    cluster: "complex",
    credentials: "MD · proton and brachytherapy lead",
    languages: "English, Korean",
    years: "16 years",
    cases: "HDR, protons, selected TBI",
    image: PORTRAITS[2],
    bio: "Dr. Choi will not book protons as an upsell. If photons meet the constraint, that is the plan he puts in the dossier.",
  },
  {
    slug: "emre-yildiz",
    name: "Dr. Emre Yıldız",
    hospitalSlug: "bosphorus-international",
    cluster: "linac",
    credentials: "Turkish Board · ESTRO member",
    languages: "English, Turkish, German",
    years: "16 years",
    cases: "Head-and-neck IMRT and IGRT",
    image: PORTRAITS[3],
    bio: "Dr. Yıldız will not overtreat. IMRT versus 3D-CRT is decided on the DVH, then Velora puts the fraction count in writing before you fly.",
  },
  {
    slug: "leyla-kaplan",
    name: "Dr. Leyla Kaplan",
    hospitalSlug: "bosphorus-international",
    cluster: "stereo",
    credentials: "Board radiation oncologist · CyberKnife director",
    languages: "English, Turkish, Arabic",
    years: "12 years",
    cases: "CyberKnife and Gamma Knife",
    image: PORTRAITS[4],
    bio: "Dr. Kaplan’s stereotactic theatre sits on the same floor as physics. Motion management is not couriered in for one international case.",
  },
  {
    slug: "deniz-arslan",
    name: "Dr. Deniz Arslan",
    hospitalSlug: "bosphorus-international",
    cluster: "complex",
    credentials: "HDR brachytherapy · IORT",
    languages: "English, Turkish",
    years: "15 years",
    cases: "Gynae HDR and interstitial implants",
    image: PORTRAITS[5],
    bio: "Dr. Arslan verifies applicator inventory before a date is offered. Intracavitary lists already run weekly — they are not assembled for tourists.",
  },
  {
    slug: "niran-chaiwat",
    name: "Dr. Niran Chaiwat",
    hospitalSlug: "sukhumvit-campus",
    cluster: "linac",
    credentials: "Thai Board radiation oncology · IGRT lead",
    languages: "English, Thai",
    years: "20 years",
    cases: "Long-course EBRT on campus",
    image: PORTRAITS[6],
    bio: "Dr. Chaiwat prefers fractionated recoveries in the campus apartments. Combined systemic therapy is staged against bloods — not a tourist calendar.",
  },
  {
    slug: "siriwan-boonmee",
    name: "Dr. Siriwan Boonmee",
    hospitalSlug: "sukhumvit-campus",
    cluster: "stereo",
    credentials: "SBRT lung/spine · ASTRO member",
    languages: "English, Thai",
    years: "13 years",
    cases: "1–5 fraction SBRT",
    image: PORTRAITS[7],
    bio: "Dr. Boonmee matches the machine to the motion problem. CyberKnife is a platform, not a diagnosis.",
  },
  {
    slug: "kittisak-prasert",
    name: "Dr. Kittisak Prasert",
    hospitalSlug: "sukhumvit-campus",
    cluster: "complex",
    credentials: "Proton and HDR · Chulalongkorn",
    languages: "English, Thai, Japanese",
    years: "17 years",
    cases: "Protons, plaque, TBI protocols",
    image: PORTRAITS[0],
    bio: "Dr. Prasert’s proton slots are scarce. Wait lists at home are often the real indication — he will say so if photons suffice.",
  },
  {
    slug: "amira-hassan",
    name: "Dr. Amira Hassan",
    hospitalSlug: "marina-private",
    cluster: "linac",
    credentials: "Cleveland Clinic trained · DHA consultant",
    languages: "English, Arabic, French",
    years: "19 years",
    cases: "IGRT for thoracic and pelvic targets",
    image: PORTRAITS[1],
    bio: "Dr. Hassan will not accept a case on price. Records are reviewed physician-to-physician; interruption protocol is on file before you book a flight.",
  },
  {
    slug: "omar-al-farsi",
    name: "Dr. Omar Al Farsi",
    hospitalSlug: "marina-private",
    cluster: "stereo",
    credentials: "SRS · DHA · linac radiosurgery",
    languages: "English, Arabic",
    years: "11 years",
    cases: "Brain mets SRS, spine SBRT",
    image: PORTRAITS[2],
    bio: "Dr. Al Farsi caps same-day SRS lists. Immobilisation and MRI fusion are done on campus the day before the shot.",
  },
  {
    slug: "lina-haddad",
    name: "Dr. Lina Haddad",
    hospitalSlug: "marina-private",
    cluster: "complex",
    credentials: "HDR / LDR brachytherapy · DHA",
    languages: "English, Arabic, French",
    years: "14 years",
    cases: "Intracavitary and interstitial HDR",
    image: PORTRAITS[3],
    bio: "Dr. Haddad’s HDR list already runs twice weekly. She will not assemble a kit for one international insertion.",
  },
  {
    slug: "wei-tan",
    name: "Dr. Wei Tan",
    hospitalSlug: "orchard-precision",
    cluster: "linac",
    credentials: "NCCS · FRCR · tumor board chair",
    languages: "English, Mandarin",
    years: "22 years",
    cases: "Peer-reviewed IMRT plans",
    image: PORTRAITS[4],
    bio: "Dr. Tan’s pathway starts with a re-read, not a quote. If Singapore is not the right campus, the dossier says so in writing.",
  },
  {
    slug: "jia-wei-lim",
    name: "Dr. Jia Wei Lim",
    hospitalSlug: "orchard-precision",
    cluster: "stereo",
    credentials: "FRCR · stereotactic lead",
    languages: "English, Mandarin, Malay",
    years: "12 years",
    cases: "Gamma Knife and SBRT",
    image: PORTRAITS[5],
    bio: "Dr. Lim treats intracranial SRS as a single session with a written plan for oedema. Short stay is a consequence, not the product.",
  },
  {
    slug: "ananya-rao",
    name: "Dr. Ananya Rao",
    hospitalSlug: "orchard-precision",
    cluster: "complex",
    credentials: "FRCR · TBI and IORT",
    languages: "English, Tamil, Mandarin",
    years: "15 years",
    cases: "TBI inside transplant protocols",
    image: PORTRAITS[6],
    bio: "Dr. Rao will not book TBI as an isolated tourist service. It exists inside a transplant protocol or it does not exist.",
  },
  {
    slug: "sofia-reyes",
    name: "Dr. Sofía Reyes",
    hospitalSlug: "polanco-surgical",
    cluster: "linac",
    credentials: "Mexican Board · IMRT/IGRT",
    languages: "English, Spanish",
    years: "17 years",
    cases: "Pelvic and H&N IMRT",
    image: PORTRAITS[7],
    bio: "Dr. Reyes uses peer plan check and starts image guidance on fraction one. Fit-to-fly after a course is a signed clearance.",
  },
  {
    slug: "miguel-orta",
    name: "Dr. Miguel Orta",
    hospitalSlug: "polanco-surgical",
    cluster: "stereo",
    credentials: "SBRT fellowship · US observership",
    languages: "English, Spanish",
    years: "13 years",
    cases: "Lung and liver SBRT",
    image: PORTRAITS[0],
    bio: "Dr. Orta declines three-day tourist radiosurgery. Fiducials and motion management decide the platform — not the brochure.",
  },
  {
    slug: "elena-cruz",
    name: "Dr. Elena Cruz",
    hospitalSlug: "polanco-surgical",
    cluster: "complex",
    credentials: "HDR brachytherapy · ocular plaque",
    languages: "English, Spanish",
    years: "14 years",
    cases: "Cervix HDR and plaque",
    image: PORTRAITS[1],
    bio: "Dr. Cruz keeps applicator inventory on the same floor as theatre. Plaque cases are scheduled against isotope availability, not flight deals.",
  },
  {
    slug: "kavita-sharma",
    name: "Dr. Kavita Sharma",
    hospitalSlug: "aerocity-international",
    cluster: "linac",
    credentials: "MD Radiation Oncology · AIIMS · AROI",
    languages: "English, Hindi",
    years: "16 years",
    cases: "Breast and GI IMRT",
    image: PORTRAITS[2],
    bio: "Dr. Sharma starts with a pathology re-read. If Delhi NCR is not the right campus for the constraint, that is the first sentence of the dossier.",
  },
  {
    slug: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    hospitalSlug: "aerocity-international",
    cluster: "stereo",
    credentials: "DNB Radiation Oncology · SRS/SBRT",
    languages: "English, Hindi",
    years: "21 years",
    cases: "Brain SRS and spine SBRT",
    image: PORTRAITS[3],
    bio: "Dr. Mehta reviews every incoming MRI before a flight is booked. Delhi NCR is his preference when time-to-first-fraction matters more than a tourist itinerary.",
  },
  {
    slug: "neha-bhatia",
    name: "Dr. Neha Bhatia",
    hospitalSlug: "aerocity-international",
    cluster: "complex",
    credentials: "MD · HDR and proton liaison",
    languages: "English, Hindi, Punjabi",
    years: "12 years",
    cases: "Gynae HDR, selected protons",
    image: PORTRAITS[4],
    bio: "Dr. Bhatia verifies HDR dwell and whether a proton slot is even open before Velora talks about hotels.",
  },
  {
    slug: "rohan-malhotra",
    name: "Dr. Rohan Malhotra",
    hospitalSlug: "gurgaon-joint-institute",
    cluster: "linac",
    credentials: "MD Radiation Oncology · IGRT lead Gurugram",
    languages: "English, Hindi, Punjabi",
    years: "14 years",
    cases: "Prostate IMRT/IGRT",
    image: PORTRAITS[5],
    bio: "Dr. Malhotra will not clear a patient to fly mid-course. Fraction one to last is a single campus — not a split between two cities.",
  },
  {
    slug: "aditi-khanna",
    name: "Dr. Aditi Khanna",
    hospitalSlug: "gurgaon-joint-institute",
    cluster: "stereo",
    credentials: "DNB · CyberKnife",
    languages: "English, Hindi",
    years: "10 years",
    cases: "CyberKnife and linac SRS",
    image: PORTRAITS[6],
    bio: "Dr. Khanna treats stereotactic as a short stay only when immobilisation is already proven on simulation day.",
  },
  {
    slug: "sanjay-kapoor",
    name: "Dr. Sanjay Kapoor",
    hospitalSlug: "gurgaon-joint-institute",
    cluster: "complex",
    credentials: "MD · interstitial and intracavitary HDR",
    languages: "English, Hindi",
    years: "18 years",
    cases: "Interstitial implants",
    image: PORTRAITS[7],
    bio: "Dr. Kapoor’s interstitial list is weekly. Theatre time and a physicist who stays for the dwell are the product.",
  },
  {
    slug: "priya-desai",
    name: "Dr. Priya Desai",
    hospitalSlug: "bandra-private",
    cluster: "linac",
    credentials: "MD Radiation Oncology · Tata observership",
    languages: "English, Hindi, Marathi",
    years: "13 years",
    cases: "Breast EBRT and IMRT",
    image: PORTRAITS[0],
    bio: "Dr. Desai’s Bandra linac publishes real QA, not marketing percentages. A hypofractionated course is sometimes the honest stay.",
  },
  {
    slug: "rahul-joshi",
    name: "Dr. Rahul Joshi",
    hospitalSlug: "bandra-private",
    cluster: "stereo",
    credentials: "DNB · SBRT liver/lung",
    languages: "English, Hindi, Marathi",
    years: "11 years",
    cases: "Oligomet SBRT",
    image: PORTRAITS[1],
    bio: "Dr. Joshi refuses a stereotactic target that belongs in conventional fractionation — even if that means a longer Mumbai stay.",
  },
  {
    slug: "farah-khan",
    name: "Dr. Farah Khan",
    hospitalSlug: "bandra-private",
    cluster: "complex",
    credentials: "MD · IORT and plaque",
    languages: "English, Hindi, Urdu",
    years: "15 years",
    cases: "IORT tied to theatre admission",
    image: PORTRAITS[2],
    bio: "Dr. Khan will not sell IORT as a day trip. It is tied to the same theatre admission as surgery, or it is not booked.",
  },
  {
    slug: "vikram-iyer",
    name: "Dr. Vikram Iyer",
    hospitalSlug: "whitefield-precision",
    cluster: "linac",
    credentials: "MD Radiation Oncology · IGRT",
    languages: "English, Kannada, Hindi",
    years: "18 years",
    cases: "H&N IMRT",
    image: PORTRAITS[3],
    bio: "Dr. Iyer will stage a Bengaluru simulation around imaging you already have — no repeat CT if the disk is readable.",
  },
  {
    slug: "meera-nair",
    name: "Dr. Meera Nair",
    hospitalSlug: "whitefield-precision",
    cluster: "stereo",
    credentials: "DNB · tumor board · SRS",
    languages: "English, Malayalam, Kannada",
    years: "15 years",
    cases: "Tuesday tumor board SRS referrals",
    image: PORTRAITS[4],
    bio: "Dr. Nair chairs Whitefield’s Tuesday tumor board. International SRS patients get the same slot as local ones — not a tourist add-on.",
  },
  {
    slug: "arun-krishnan",
    name: "Dr. Arun Krishnan",
    hospitalSlug: "whitefield-precision",
    cluster: "complex",
    credentials: "MD · TBI and brachytherapy",
    languages: "English, Tamil, Kannada",
    years: "16 years",
    cases: "TBI with transplant teams",
    image: PORTRAITS[5],
    bio: "Dr. Krishnan books TBI only when the transplant protocol is already signed. Bengaluru dates follow the haematologist, not the other way around.",
  },
  {
    slug: "lakshmi-narayan",
    name: "Dr. Lakshmi Narayan",
    hospitalSlug: "adyar-cardiac",
    cluster: "linac",
    credentials: "MD Radiation Oncology · FRCR",
    languages: "English, Tamil, Hindi",
    years: "24 years",
    cases: "High-volume IMRT",
    image: PORTRAITS[6],
    bio: "Dr. Narayan contours only in physics-supported theatres. Chennai volume is the point — not a three-day package.",
  },
  {
    slug: "karthik-subramanian",
    name: "Dr. Karthik Subramanian",
    hospitalSlug: "adyar-cardiac",
    cluster: "stereo",
    credentials: "DNB · SRS/SBRT Chennai",
    languages: "English, Tamil",
    years: "12 years",
    cases: "Linac SRS",
    image: PORTRAITS[7],
    bio: "Dr. Subramanian treats SRS as one to five fractions with millimetre image guidance. Short hotel nights follow selection, not marketing.",
  },
  {
    slug: "divya-menon",
    name: "Dr. Divya Menon",
    hospitalSlug: "adyar-cardiac",
    cluster: "complex",
    credentials: "MD · intracavitary HDR",
    languages: "English, Malayalam, Tamil",
    years: "13 years",
    cases: "Cervix HDR",
    image: PORTRAITS[0],
    bio: "Dr. Menon’s intracavitary insertions already run on a weekly list. A travelling patient needs that cadence, not a one-off kit.",
  },
  {
    slug: "sameer-reddy",
    name: "Dr. Sameer Reddy",
    hospitalSlug: "hitec-surgical",
    cluster: "linac",
    credentials: "MD Radiation Oncology · IMRT Hyderabad",
    languages: "English, Telugu, Hindi",
    years: "11 years",
    cases: "Thoracic IMRT",
    image: PORTRAITS[1],
    bio: "Dr. Reddy’s linac and physics sit on the same floor in HITEC City. Plans are not couriered across Hyderabad overnight.",
  },
  {
    slug: "nisha-rao",
    name: "Dr. Nisha Rao",
    hospitalSlug: "hitec-surgical",
    cluster: "stereo",
    credentials: "DNB · CyberKnife / Gamma Knife",
    languages: "English, Telugu, Hindi",
    years: "12 years",
    cases: "CyberKnife and Gamma Knife",
    image: PORTRAITS[2],
    bio: "Dr. Rao declines tourist radiosurgery packages. Indication and immobilisation decide the machine before a Hyderabad date is offered.",
  },
  {
    slug: "anil-prasad",
    name: "Dr. Anil Prasad",
    hospitalSlug: "hitec-surgical",
    cluster: "complex",
    credentials: "MD · protons liaison and HDR",
    languages: "English, Telugu, Hindi",
    years: "19 years",
    cases: "Proton referrals and HDR",
    image: PORTRAITS[3],
    bio: "Dr. Prasad will say when Hyderabad photons are enough. Crossing an ocean for a Bragg peak you do not need is not care.",
  },
];

function hydrate(seed: Seed): Doctor {
  const hospital = getHospital(seed.hospitalSlug);
  if (!hospital) {
    throw new Error(`Doctor ${seed.slug} points at unknown hospital ${seed.hospitalSlug}`);
  }
  const specialty = getSpecialty("Radiation Oncology");
  if (!specialty) throw new Error("Missing Radiation Oncology specialty");

  const procedureNames = [...PROCEDURE_CLUSTERS[seed.cluster]];
  const procedures = procedureNames.map((name) => {
    const procedure = getProcedure(name);
    if (!procedure) throw new Error(`Unknown procedure ${name} on ${seed.slug}`);
    return procedure;
  });

  return {
    slug: seed.slug,
    name: seed.name,
    title: "Radiation oncologist",
    hospitalSlug: hospital.slug,
    specialty: specialty.name,
    specialtySlug: specialty.slug,
    procedures: procedures.map((p) => p.name),
    procedureSlugs: procedures.map((p) => p.slug),
    treatmentSlugs: procedures.map((p) => p.slug),
    city: hospital.city,
    citySlug: hospital.citySlug,
    country: hospital.country,
    countrySlug: hospital.countrySlug,
    credentials: seed.credentials,
    languages: seed.languages,
    years: seed.years,
    cases: seed.cases,
    image: seed.image,
    bio: seed.bio,
  };
}

export const doctors: Doctor[] = seeds.map(hydrate);

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

/** Filter on denormalized slugs only — safe for future /doctors/[country]/[city]/... routes. */
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
                  doctors: docs.sort((a, b) => a.name.localeCompare(b.name)),
                }))
                .sort((a, b) => a.city.localeCompare(b.city)),
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country)),
      };
    })
    .sort((a, b) => a.specialty.localeCompare(b.specialty));
}
