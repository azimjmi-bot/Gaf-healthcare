import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import { treatmentMatchesSpecialty } from "@/lib/treatments";
import { SPECIALTIES, compareSpecialties } from "@/lib/taxonomy";

const SPECIALTY_BLURB: Record<string, string> = {
  "radiation-oncology": "Radiation planned around the tumour you actually have — not a machine looking for work.",
  "surgical-oncology": "Cancer surgery when the cut is the honest next step, with reconstruction on the same list.",
  "medical-oncology": "Systemic treatment — chemo, targeted drugs, immunotherapy — named to the protocol, not the brochure.",
  hematology: "Blood cancers and marrow work, including transplant when the indication is real.",
  "pediatric-hematology": "Children’s blood and marrow lists, held by consultants who treat children every week.",
  "cardiac-surgery": "Bypass, valves and the operations that belong in a cardiac theatre, not a cath lab.",
  "pediatric-cardiac-surgery": "Congenital heart surgery for children, with intensive care that already knows those nights.",
  cardiology: "Angioplasty, valves from the groin, electrophysiology — when the heart needs a catheter, not a saw.",
  "bariatric-surgery": "Metabolic surgery when diet has already had a fair run and the BMI still belongs on the list.",
  "cosmetic-surgery": "Elective reconstruction and aesthetics with a named surgeon you meet on camera first.",
  ent: "Ears, nose, throat and skull-base work, including cochlear implants when hearing is the brief.",
  gastroenterology: "Endoscopy, ERCP and the medical gut list — cameras before knives whenever that is honest.",
  "surgical-gastroenterology": "Liver, pancreas and GI surgery, including transplant when the house can quote it.",
  urology: "Kidneys, prostate and stones — including transplant shared with the nephrology floor.",
  "spine-surgery": "Fusion, discs and deformity when the spine, not the rest of orthopaedics, is the problem.",
  pulmonology: "Lungs, airways and EBUS — tissue when imaging is no longer enough.",
  "pediatric-orthopaedic": "Children’s bones and joints: clubfoot, hips, growth plates — not adult replacement lists.",
  orthopedics: "Knees, hips, ligaments and trauma — replacement when the joint is finished, not because it is fashionable.",
  ophthalmology: "Cataract, cornea, retina and refractive work on a floor that only does eyes.",
  gynecology: "Womb, ovaries and endometriosis — laparoscopic when the pelvis allows it.",
  neurosurgery: "Brain, spine and radiosurgery with a named neurosurgeon on the consent form.",
  neurology: "Stroke, epilepsy and movement lists — medicine and devices before a craniotomy whenever that is honest.",
  nephrology: "Dialysis, biopsy and transplant medicine, shared with urology when a kidney is changing hands.",
};

const SPECIALTY_PEOPLE: Record<string, { one: string; many: string }> = {
  "radiation-oncology": { one: "radiation oncologist", many: "radiation oncologists" },
  "surgical-oncology": { one: "surgical oncologist", many: "surgical oncologists" },
  "medical-oncology": { one: "medical oncologist", many: "medical oncologists" },
  hematology: { one: "hematologist", many: "hematologists" },
  "pediatric-hematology": { one: "pediatric hematologist", many: "pediatric hematologists" },
  "cardiac-surgery": { one: "cardiac surgeon", many: "cardiac surgeons" },
  "pediatric-cardiac-surgery": { one: "pediatric cardiac surgeon", many: "pediatric cardiac surgeons" },
  cardiology: { one: "cardiologist", many: "cardiologists" },
  "bariatric-surgery": { one: "bariatric surgeon", many: "bariatric surgeons" },
  "cosmetic-surgery": { one: "cosmetic surgeon", many: "cosmetic surgeons" },
  ent: { one: "ENT surgeon", many: "ENT surgeons" },
  gastroenterology: { one: "gastroenterologist", many: "gastroenterologists" },
  "surgical-gastroenterology": { one: "surgical gastroenterologist", many: "surgical gastroenterologists" },
  urology: { one: "urologist", many: "urologists" },
  "spine-surgery": { one: "spine surgeon", many: "spine surgeons" },
  pulmonology: { one: "pulmonologist", many: "pulmonologists" },
  "pediatric-orthopaedic": { one: "pediatric orthopaedic surgeon", many: "pediatric orthopaedic surgeons" },
  orthopedics: { one: "orthopaedic surgeon", many: "orthopaedic surgeons" },
  ophthalmology: { one: "ophthalmologist", many: "ophthalmologists" },
  gynecology: { one: "gynecologist", many: "gynecologists" },
  neurosurgery: { one: "neurosurgeon", many: "neurosurgeons" },
  neurology: { one: "neurologist", many: "neurologists" },
  nephrology: { one: "nephrologist", many: "nephrologists" },
};

export type CityTravel = {
  airport: string;
  airportHint: string;
  centreHint: string;
  mapsQuery: string;
};

export function cityTravel(hospital: Hospital): CityTravel {
  const mapsQuery = `${hospital.name}, ${hospital.city}, India`;
  if (hospital.citySlug === "mumbai") {
    return {
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      airportHint: "Typically 45–90 minutes by road, depending on the campus and the hour.",
      centreHint: "South Mumbai and Bandra are the usual hotel belts; Navi Mumbai sits on its own shore.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "bengaluru") {
    return {
      airport: "Kempegowda International Airport",
      airportHint: "Usually 45–75 minutes from Bannerghatta and the south-east campuses.",
      centreHint: "MG Road and Koramangala are the common companion hotels; the airport is north of the city.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "chennai") {
    return {
      airport: "Chennai International Airport",
      airportHint: "Most listed campuses are 20–50 minutes from the airport in ordinary traffic.",
      centreHint: "T. Nagar and the beach hotels are the usual stay for a companion.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "hyderabad") {
    return {
      airport: "Rajiv Gandhi International Airport",
      airportHint: "Jubilee Hills and Banjara Hills are typically 45–70 minutes from the airport.",
      centreHint: "Banjara Hills and HITEC City hold most of the hotels families actually use.",
      mapsQuery,
    };
  }
  return {
    airport: "Indira Gandhi International Airport",
    airportHint: "Delhi NCR campuses run from 25 minutes to well over an hour, depending on the ring road.",
    centreHint: "Aerocity, Vasant Kunj and Gurgaon are the usual companion stays.",
    mapsQuery,
  };
}

export function isEyeCampus(hospital: Hospital) {
  return hospital.specialtySlugs.length === 1 && hospital.specialtySlug === "ophthalmology";
}

export type AccreditationMark = {
  id: string;
  label: string;
  src?: string;
};

const ACCREDITATION_SEALS: { id: string; match: RegExp; label: string; src: string }[] = [
  {
    id: "jci",
    match: /\bJCI\b/i,
    label: "Joint Commission International Gold Seal of Approval",
    src: "/accreditations/jci.png",
  },
  {
    id: "nabh",
    match: /\bNABH\b/i,
    label: "NABH Accredited — Patient Safety & Quality of Care",
    src: "/accreditations/nabh.png",
  },
  {
    id: "nabl",
    match: /\bNABL\b/i,
    label: "NABL — National Accreditation Board for Testing and Calibration Laboratories",
    src: "/accreditations/nabl.png",
  },
];

export function parseAccreditationMarks(accreditation: string): AccreditationMark[] {
  const marks: AccreditationMark[] = [];
  for (const seal of ACCREDITATION_SEALS) {
    if (seal.match.test(accreditation)) {
      marks.push({ id: seal.id, label: seal.label, src: seal.src });
    }
  }
  const extras = accreditation
    .split(/[·,|/]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !/^(JCI|NABH|NABL)$/i.test(p));
  for (const extra of extras) {
    marks.push({ id: extra.toLowerCase(), label: extra });
  }
  return marks;
}

export function accreditationBadges(accreditation: string) {
  return parseAccreditationMarks(accreditation).map((m) =>
    m.id === "jci" ? "JCI Accredited" : m.id === "nabh" ? "NABH Accredited" : m.id === "nabl" ? "NABL Accredited" : m.label,
  );
}

export function bedsLabel(beds: string) {
  const n = parseInt(beds.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(n) || n <= 0) return beds || "";
  return `${n}+ beds`;
}

export function heroLede(hospital: Hospital) {
  const beds = bedsLabel(hospital.beds);
  const year = hospital.established ? ` Opened in ${hospital.established}.` : "";
  const eye = isEyeCampus(hospital);
  if (eye) {
    return `${hospital.name} is an eye hospital in ${hospital.city}, India${beds ? ` — ${beds.toLowerCase()}` : ""}.${year} Families land here for cataract, cornea and retina work with a named ophthalmologist, not a general ward that happens to own a slit lamp.`;
  }
  return `${hospital.name} is a multi-speciality campus in ${hospital.city}, India${beds ? ` with ${beds.toLowerCase()}` : ""}.${year} Coordinators here already know how to hold an international stay — from the first video consult through the week after you fly home.`;
}

export function aboutParagraphs(hospital: Hospital) {
  const raw = displayBio(hospital.bio);
  const chunks = raw.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (chunks.length <= 2) return [raw];
  const mid = Math.ceil(chunks.length / 2);
  return [chunks.slice(0, mid).join(" "), chunks.slice(mid).join(" ")];
}

export function pullQuote(hospital: Hospital) {
  if (isEyeCampus(hospital)) return "Sight restored with a plan you can actually read.";
  if (hospital.slug.includes("proton")) return "Protons when the Bragg peak is the argument — photons when it is not.";
  if (hospital.slug.includes("athenaa") || hospital.name.toLowerCase().includes("women")) {
    return "Women’s cancer on a floor built for that list alone.";
  }
  return "Advanced care that still leaves room for a quieter recovery.";
}

export function whyChoose(hospital: Hospital, facultyCount: number) {
  const eye = isEyeCampus(hospital);
  return [
    {
      title: eye ? "Named ophthalmologists" : "Named consultants",
      body: facultyCount
        ? `${facultyCount} listed ${facultyCount === 1 ? "doctor" : "doctors"} you can meet on camera before you book a ticket.`
        : "We match a named consultant to this campus after records — never a nameless duty roster.",
    },
    {
      title: "Accreditation you can check",
      body: `${hospital.accreditation} sits on the file. We do not invent a plaque to dress a corridor.`,
    },
    {
      title: eye ? "Eye theatres" : "ICU and theatres",
      body: eye
        ? "Ophthalmic theatres and recovery that belong to eyes, not a borrowed general OT slot."
        : `${hospital.icu} plus the theatres that already run the specialties this house lists.`,
    },
    {
      title: "Languages on the ward",
      body: `${hospital.languages}. A coordinator stays in English even when the bedside talk is local.`,
    },
    {
      title: "International desk",
      body: "Visa letters, airport pickup and a companion bed are ordinary here — not a special favour.",
    },
    {
      title: "Video first",
      body: "No deposit until you have spoken to the consultant. If the fit is wrong, we restart.",
    },
  ];
}

export function featureBar(hospital: Hospital) {
  const eye = isEyeCampus(hospital);
  return [
    { label: eye ? "Urgent eye care" : "24/7 emergency" },
    { label: eye ? "Dedicated eye theatres" : "Advanced ICU & OT" },
    { label: "International patient desk" },
    { label: eye ? "Eye hospital" : "Multi-speciality campus" },
    { label: `On the ${hospital.city} map` },
  ];
}

export function specialtyBlurb(slug: string) {
  return SPECIALTY_BLURB[slug] ?? "A named list for this department, matched after records — not a walk-in mill.";
}

export function peopleNoun(slug: string, count: number) {
  const row = SPECIALTY_PEOPLE[slug];
  if (!row) return count === 1 ? "specialist" : "specialists";
  return count === 1 ? row.one : row.many;
}

export type FacultyGroup = {
  name: string;
  slug: string;
  heading: string;
  doctors: Doctor[];
  treatments: Treatment[];
};

export function groupFaculty(faculty: Doctor[], pathways: Treatment[]): FacultyGroup[] {
  return SPECIALTIES.map((spec) => {
    const doctors = faculty.filter((d) => d.specialtySlug === spec.slug);
    const treatments = pathways.filter((t) => treatmentMatchesSpecialty(t, spec.slug));
    const noun = peopleNoun(spec.slug, doctors.length);
    const heading = noun.charAt(0).toUpperCase() + noun.slice(1);
    return { name: spec.name, slug: spec.slug, heading, doctors, treatments };
  })
    .filter((g) => g.doctors.length > 0 || g.treatments.length > 0)
    .sort((a, b) => compareSpecialties(a.slug, b.slug));
}

export function featuredDoctors(faculty: Doctor[], limit = 4) {
  return [...faculty]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function featuredSpecialties(groups: FacultyGroup[], limit = 6) {
  const withDoctors = groups.filter((g) => g.doctors.length > 0);
  const pool = withDoctors.length ? withDoctors : groups;
  return [...pool]
    .sort((a, b) => b.doctors.length - a.doctors.length || compareSpecialties(a.slug, b.slug))
    .slice(0, limit);
}

/** A handful of named pathways — one from each busy department — not the whole house list. */
export function popularTreatments(groups: FacultyGroup[], limit = 5) {
  const withDoctors = groups.filter((g) => g.doctors.length > 0 && g.treatments.length > 0);
  const ranked = [...(withDoctors.length ? withDoctors : groups.filter((g) => g.treatments.length > 0))].sort(
    (a, b) => b.doctors.length - a.doctors.length || compareSpecialties(a.slug, b.slug),
  );
  const seen = new Set<string>();
  const unique: { treatment: Treatment; specialty: string; specialtySlug: string }[] = [];

  const pushFrom = (g: FacultyGroup, index: number) => {
    const t = g.treatments[index];
    if (!t || seen.has(t.slug) || unique.length >= limit) return;
    seen.add(t.slug);
    unique.push({ treatment: t, specialty: g.name, specialtySlug: g.slug });
  };

  for (const g of ranked) pushFrom(g, 0);
  for (const g of ranked) pushFrom(g, 1);
  return unique;
}

export function fromUsd(partnerRange: string) {
  const m = partnerRange.match(/\$[\d,]+/);
  if (!m) return `India planning range ${partnerRange}`;
  return `From USD ${m[0].replace("$", "")}`;
}

export function doctorInitials(name: string) {
  const parts = name.replace(/^dr\.?\s+/i, "").split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "V";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? "L";
  return (first + last).toUpperCase();
}

export function yearsLabel(doctor: Doctor) {
  const fromExp = doctor.experience.match(/(\d+)\+?\s*years/i);
  if (fromExp) return `${fromExp[1]}+ years`;
  const fromYears = doctor.years.match(/(\d+)/);
  if (fromYears) return `${fromYears[1]}+ years`;
  return doctor.experience || "";
}

export function infrastructure(hospital: Hospital) {
  if (isEyeCampus(hospital)) {
    return [
      { title: "Phaco theatres", body: "Cataract lists that run all week, not a borrowed slot." },
      { title: "Cornea suite", body: "Transplant and surface work with its own recovery rhythm." },
      { title: "Retina lasers", body: "Medical and surgical retina without sending you across town." },
      { title: "Diagnostics", body: "OCT, fields and biometry on the same floor as the consult." },
      { title: "Day-care recovery", body: "Most lists go home the same day when the eye allows it." },
      { title: "Paediatric lane", body: "Children’s eyes seen by people who already do that work." },
      { title: "Sterile processing", body: "Instrument flow that belongs to ophthalmology." },
      { title: "Counselling rooms", body: "A quiet place to sit with IOL choices before anyone dilates you." },
    ];
  }
  return [
    { title: "Modular theatres", body: "Lists that already mix oncology, heart, gut and joints without chaos." },
    { title: "Advanced ICU", body: hospital.icu },
    { title: "Hybrid / cath capability", body: "When the case belongs in a hybrid room, the house can say so." },
    { title: "Robotic theatre", body: "Used when the indication is robotic — not because the brochure likes the arm." },
    { title: "Radiation bunker", body: "IMRT, SBRT and the rest of the linac list when oncology is on the file." },
    { title: "Dialysis floor", body: "HD, PD and CRRT so a kidney list does not wait for another campus." },
    { title: "Imaging", body: "CT, MRI and the scans a travelling patient actually needs before theatre." },
    { title: "International ward", body: "Companion beds and a desk that answers in English after midnight." },
  ];
}

export function internationalServices() {
  return [
    { title: "Visa assistance", body: "Invitation letters that match the actual admission plan." },
    { title: "Travel planning", body: "Flight windows that respect theatre lists, not tourist seasons." },
    { title: "Airport pickup", body: "A named driver, not a taxi queue after a long-haul." },
    { title: "Interpreters", body: "Bedside language when English is not the family’s first tongue." },
    { title: "Companion stay", body: "A bed and a kettle, not a sofa in a corridor." },
    { title: "Records transfer", body: "Discs, portals and the boring PDFs that keep care continuous." },
    { title: "Cost clarity", body: "Planning ranges in USD before anyone asks for a deposit." },
    { title: "After you fly home", body: "A line back to the operating team for the first year." },
  ];
}

export function hospitalFaqs(hospital: Hospital, faculty: Doctor[], groups: FacultyGroup[]) {
  const listed = groups.filter((g) => g.doctors.length > 0).map((g) => g.name);
  const names = faculty.filter((d) => d.featured).slice(0, 3).map((d) => d.name);
  const specLine =
    listed.length === 0
      ? "Named consultants for this campus are still being matched. A coordinator will say so plainly."
      : listed.length <= 4
        ? `Named lists here currently include ${joinHuman(listed)}.`
        : `Named lists here currently include ${joinHuman(listed.slice(0, 4))} and ${listed.length - 4} further departments.`;

  return [
    {
      q: `Is ${hospital.name} accredited?`,
      a: `Yes — the file reads ${hospital.accreditation}. We verify plaques annually rather than copying them from a brochure.`,
    },
    {
      q: "How large is the campus?",
      a: hospital.beds
        ? `About ${hospital.beds} beds${hospital.established ? `, open since ${hospital.established}` : ""}. Size is a planning fact, not a promise that every bed is yours.`
        : "Bed numbers sit on the hospital file; a coordinator confirms the ward once a date is real.",
    },
    {
      q: "Which specialties have named doctors here?",
      a: specLine,
    },
    {
      q: "Can we meet the doctor before we travel?",
      a:
        names.length > 0
          ? `Yes. You meet the consultant on camera first — often ${joinHuman(names)} when those names fit the brief. No deposit until that call.`
          : "Yes. You meet the matched consultant on camera first. No deposit until that call.",
    },
    {
      q: "Are the prices on this page a quote?",
      a: "No. Figures are India planning ranges beside typical US cash-pay, so a family can think. A named consultant confirms the protocol after records.",
    },
  ];
}

export function displayBio(bio: string) {
  return bio
    .replace(/[^.?!]*\bpSEO\b[^.?!]*[.?!]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function joinHuman(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
