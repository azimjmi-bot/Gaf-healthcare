import { HEMATOLOGY_COST, HEMATOLOGY_SUMMARIES } from "@/lib/hematology-costs";
import { MEDICAL_COST, MEDICAL_SUMMARIES } from "@/lib/medical-costs";
import { hospitals } from "@/lib/hospitals";
import { SURGICAL_COST, SURGICAL_SUMMARIES } from "@/lib/surgical-costs";
import {
  HEMATOLOGY_PROCEDURES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  PROCEDURE_CLUSTERS,
  RADIATION_PROCEDURES,
  SURGICAL_ONCOLOGY_PROCEDURES,
  getProcedure,
  toSlug,
} from "@/lib/taxonomy";

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  specialtySlug: string;
  specialtySlugs: string[];
  procedureSlug: string;
  summary: string;
  image: string;
  usRange: string;
  partnerRange: string;
  stay: string;
  hospitalSlugs: string[];
  conditions: string[];
  procedures: string[];
  includes: string[];
  notes: string;
};

export function treatmentMatchesSpecialty(t: Treatment, specialtySlug: string) {
  return t.specialtySlugs.includes(specialtySlug);
}

function slugsForProcedureName(name: string) {
  const row = getProcedure(name);
  if (!row) throw new Error(`Unmapped procedure ${name}`);
  return row.specialtySlugs;
}

function hospitalSlugsForProcedure(name: string) {
  const family =
    name === "External Beam Radiotherapy (EBRT)"
      ? [...PROCEDURE_CLUSTERS.linac, ...PROCEDURE_CLUSTERS.stereo, "Proton Beam Therapy"]
      : [name];
  const slugs = new Set(family.map(toSlug));
  const matched = hospitals
    .filter((h) => h.procedureSlugs.some((p) => slugs.has(p)))
    .map((h) => h.slug);
  return matched.length ? matched : hospitals.map((h) => h.slug);
}

const RADIATION_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "External Beam Radiotherapy (EBRT)": {
    us: "$12,000–$25,000",
    partner: "$1,000–$6,000+",
    stay: "15–35 sessions typical · 4–7 weeks",
  },
  "3D Conformal Radiotherapy (3D-CRT)": {
    us: "$14,000–$28,000",
    partner: "$700–$2,500+",
    stay: "15–35 sessions typical · usually outpatient",
  },
  "Intensity-Modulated Radiotherapy (IMRT)": {
    us: "$18,000–$40,000",
    partner: "$6,500–$14,500",
    stay: "4–7 weeks of fractions",
  },
  "Image-Guided Radiotherapy (IGRT)": {
    us: "$20,000–$45,000",
    partner: "$7,200–$16,000",
    stay: "4–7 weeks of fractions",
  },
  "Stereotactic Radiosurgery (SRS)": {
    us: "$25,000–$55,000",
    partner: "$8,500–$18,000",
    stay: "1–5 sessions",
  },
  "Stereotactic Body Radiotherapy (SBRT)": {
    us: "$22,000–$50,000",
    partner: "$8,000–$17,500",
    stay: "1–5 sessions",
  },
  CyberKnife: {
    us: "$30,000–$70,000",
    partner: "$11,000–$24,000",
    stay: "1–5 sessions",
  },
  "Gamma Knife": {
    us: "$28,000–$65,000",
    partner: "$10,500–$22,000",
    stay: "1 session typical",
  },
  "Proton Beam Therapy": {
    us: "$90,000–$180,000",
    partner: "$28,000–$55,000",
    stay: "4–8 weeks of fractions",
  },
  Brachytherapy: {
    us: "$15,000–$35,000",
    partner: "$5,500–$13,000",
    stay: "1–7 nights",
  },
  "Intracavitary Brachytherapy": {
    us: "$16,000–$38,000",
    partner: "$6,000–$14,000",
    stay: "1–7 nights",
  },
  "Interstitial Brachytherapy": {
    us: "$18,000–$42,000",
    partner: "$6,800–$15,500",
    stay: "2–8 nights",
  },
  "Plaque Brachytherapy": {
    us: "$20,000–$45,000",
    partner: "$7,500–$16,000",
    stay: "3–7 nights",
  },
  "Intraoperative Radiotherapy (IORT)": {
    us: "$22,000–$48,000",
    partner: "$8,200–$17,000",
    stay: "Tied to theatre stay",
  },
  "Total Body Irradiation (TBI)": {
    us: "$35,000–$80,000",
    partner: "$12,000–$28,000",
    stay: "By transplant protocol",
  },
};

const EBRT_COPY = {
  summary:
    "External Beam Radiation Therapy uses a linear accelerator outside the body to treat a tumour or area at risk. In India, published 2026 planning ranges for conventional and advanced courses are typically $1,000–$6,000+, depending on technique, fractions, hospital and cancer type.",
  notes:
    "Cost figures are indicative planning ranges, not quotations. The named radiation oncologist confirms technique, fractions and an itemized hospital price after records review.",
  includes: [
    "Radiation oncologist consultation",
    "CT simulation and immobilisation where required",
    "Treatment planning, dosimetry and physics QA",
    "Radiation delivery and on-treatment reviews",
    "Named consultant on camera before travel",
    "Discharge summary to your home oncologist",
  ],
};

const CRT_COPY = {
  summary:
    "3D Conformal Radiation Therapy shapes external-beam radiation around a tumour using CT-based three-dimensional planning. For private treatment in India, a broad planning range is about $700–$2,500+, depending on hospital, city, fractions and cancer type.",
  notes:
    "Indicative partner range, not a quote. 3D-CRT is not automatically the right technique because it is cheaper than IMRT — the named radiation oncologist decides after records review.",
  includes: [
    "Radiation oncologist consultation",
    "CT simulation and immobilisation where required",
    "3D treatment planning, dosimetry and physics QA",
    "Radiation delivery and on-treatment reviews",
    "Named consultant on camera before travel",
    "Discharge summary to your home oncologist",
  ],
};

const SURGICAL_INCLUDES = [
  "Surgical oncology consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, anaesthesia and inpatient stay as quoted",
  "Histopathology of the specimen",
  "Discharge summary to your home oncologist",
];

const SURGICAL_IMAGE =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80";

const radiationTreatments: Treatment[] = RADIATION_PROCEDURES.map((name) => {
  const cost = RADIATION_COST[name];
  if (!cost) throw new Error(`Missing radiation cost for ${name}`);
  const slug = toSlug(name);
  const copy = name === "External Beam Radiotherapy (EBRT)" ? EBRT_COPY : name === "3D Conformal Radiotherapy (3D-CRT)" ? CRT_COPY : null;
  return {
    slug,
    name,
    category: "Radiation Oncology",
    specialtySlug: "radiation-oncology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary: copy
      ? copy.summary
      : `Radiation Oncology — ${name} delivered at JCI-accredited partner campuses with physics QA, peer-reviewed plans, and a named radiation oncologist before you travel.`,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Solid tumors", "Cancer second opinion"],
    procedures: [name],
    includes: copy
      ? copy.includes
      : [
          "Simulation CT and contouring review",
          "Physics QA and peer plan check",
          "Named radiation oncologist on camera before travel",
          "Discharge summary to your home oncologist",
        ],
    notes: copy
      ? copy.notes
      : "Fractions, energy, and whether protons or brachytherapy are appropriate are decided after records review — not from a brochure price.",
  };
});

const surgicalTreatments: Treatment[] = SURGICAL_ONCOLOGY_PROCEDURES.map((name) => {
  const cost = SURGICAL_COST[name];
  if (!cost) throw new Error(`Missing surgical cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Surgical Oncology",
    specialtySlug: "surgical-oncology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary: SURGICAL_SUMMARIES[name] ?? `Surgical Oncology — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: SURGICAL_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Solid tumors", "Cancer second opinion"],
    procedures: [name],
    includes: SURGICAL_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named surgical oncologist confirms approach, reconstruction and an itemized hospital price after records review.",
  };
});

const MEDICAL_INCLUDES = [
  "Medical oncology consultation and records review",
  "Named consultant on camera before travel",
  "Protocol, cycles and supportive medicines as quoted",
  "On-treatment reviews and toxicity management",
  "Discharge summary to your home oncologist",
];

const MEDICAL_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80";

const medicalTreatments: Treatment[] = MEDICAL_ONCOLOGY_PROCEDURES.map((name) => {
  const cost = MEDICAL_COST[name];
  if (!cost) throw new Error(`Missing medical cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Medical Oncology",
    specialtySlug: "medical-oncology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      MEDICAL_SUMMARIES[name] ??
      `Medical Oncology — ${name} at JCI partner campuses with a named consultant before you travel.`,
    image: MEDICAL_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Solid tumors", "Hematologic malignancy", "Cancer second opinion"],
    procedures: [name],
    includes: MEDICAL_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named medical oncologist confirms regimen, cycles and an itemized hospital price after records review.",
  };
});

const HEMATOLOGY_INCLUDES = [
  "Haematology consultation and records review",
  "Named consultant on camera before travel",
  "Donor search or collection plan as quoted",
  "Inpatient transplant or day-care procedure as indicated",
  "Discharge summary to your home haematologist",
];

const HEMATOLOGY_IMAGE =
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80";

const HEMATOLOGY_ONLY = HEMATOLOGY_PROCEDURES.filter(
  (name) => !MEDICAL_ONCOLOGY_PROCEDURES.includes(name as (typeof MEDICAL_ONCOLOGY_PROCEDURES)[number]),
);

const hematologyTreatments: Treatment[] = HEMATOLOGY_ONLY.map((name) => {
  const cost = HEMATOLOGY_COST[name];
  if (!cost) throw new Error(`Missing hematology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Hematology",
    specialtySlug: "hematology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      HEMATOLOGY_SUMMARIES[name] ??
      `Hematology — ${name} at JCI partner campuses with a named consultant before you travel.`,
    image: HEMATOLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Hematologic malignancy", "Bone marrow failure", "Cancer second opinion"],
    procedures: [name],
    includes: HEMATOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named haematologist confirms donor, conditioning and an itemized hospital price after records review.",
  };
});

export const treatments: Treatment[] = [
  ...radiationTreatments,
  ...surgicalTreatments,
  ...medicalTreatments,
  ...hematologyTreatments,
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}
