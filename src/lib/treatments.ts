import { BARIATRIC_COST, BARIATRIC_SUMMARIES } from "@/lib/bariatric-costs";
import { CARDIOLOGY_COST, CARDIOLOGY_SUMMARIES } from "@/lib/cardiology-costs";
import { CARDIAC_SURGERY_COST, CARDIAC_SURGERY_SUMMARIES } from "@/lib/cardiac-surgery-costs";
import { PEDIATRIC_CARDIAC_SURGERY_COST, PEDIATRIC_CARDIAC_SURGERY_SUMMARIES } from "@/lib/pediatric-cardiac-surgery-costs";
import { HEMATOLOGY_COST, HEMATOLOGY_SUMMARIES } from "@/lib/hematology-costs";
import { PEDIATRIC_HEMATOLOGY_COST, PEDIATRIC_HEMATOLOGY_SUMMARIES } from "@/lib/pediatric-hematology-costs";
import { MEDICAL_COST, MEDICAL_SUMMARIES } from "@/lib/medical-costs";
import { hospitals } from "@/lib/hospitals";
import { SURGICAL_COST, SURGICAL_SUMMARIES } from "@/lib/surgical-costs";
import {
  BARIATRIC_PROCEDURES,
  CARDIOLOGY_PROCEDURES,
  CARDIAC_SURGERY_PROCEDURES,
  PEDIATRIC_CARDIAC_SURGERY_PROCEDURES,
  HEMATOLOGY_PROCEDURES,
  MEDICAL_ONCOLOGY_PROCEDURES,
  PEDIATRIC_HEMATOLOGY_PROCEDURES,
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

const PEDIATRIC_HEMATOLOGY_INCLUDES = [
  "Paediatric haematology consultation and records review",
  "Named consultant on camera before travel — parent present",
  "Donor search or collection plan as quoted",
  "Paediatric transplant unit or day-care as indicated",
  "Discharge summary to your home paediatric haematologist",
];

const PEDIATRIC_ONLY = PEDIATRIC_HEMATOLOGY_PROCEDURES.filter((name) => {
  const row = getProcedure(name);
  return row?.specialtySlug === "pediatric-hematology" && row.specialtySlugs.length === 1;
});

const pediatricHematologyTreatments: Treatment[] = PEDIATRIC_ONLY.map((name) => {
  const cost = PEDIATRIC_HEMATOLOGY_COST[name];
  if (!cost) throw new Error(`Missing pediatric hematology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Pediatric Hematology",
    specialtySlug: "pediatric-hematology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      PEDIATRIC_HEMATOLOGY_SUMMARIES[name] ??
      `Pediatric Hematology — ${name} at JCI partner campuses with a named consultant before you travel.`,
    image: HEMATOLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Pediatric hematologic malignancy", "Bone marrow failure", "Cancer second opinion"],
    procedures: [name],
    includes: PEDIATRIC_HEMATOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named paediatric haematologist confirms donor, conditioning and an itemized hospital price after records review. Adult transplant units are not assumed to be equivalent.",
  };
});

const CARDIAC_INCLUDES = [
  "Cardiac surgery consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, anaesthesia, cardiopulmonary bypass and cardiac ICU as quoted",
  "Device or prosthesis as indicated",
  "Discharge summary to your home cardiologist",
];

const CARDIAC_IMAGE =
  "https://images.unsplash.com/photo-1559757175-5700e644bcc8?auto=format&fit=crop&w=1600&q=80";

const cardiacSurgeryTreatments: Treatment[] = CARDIAC_SURGERY_PROCEDURES.map((name) => {
  const cost = CARDIAC_SURGERY_COST[name];
  if (!cost) throw new Error(`Missing cardiac surgery cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Cardiac Surgery",
    specialtySlug: "cardiac-surgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      CARDIAC_SURGERY_SUMMARIES[name] ??
      `Cardiac Surgery — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: CARDIAC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Coronary artery disease", "Valvular heart disease", "Heart failure"],
    procedures: [name],
    includes: CARDIAC_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named cardiac surgeon confirms conduit, prosthesis, approach and an itemized hospital price after records review.",
  };
});

const PEDIATRIC_CARDIAC_INCLUDES = [
  "Paediatric cardiac surgery consultation and records review",
  "Named surgeon on camera before travel — parent present",
  "Theatre, anaesthesia, cardiopulmonary bypass and paediatric cardiac ICU as quoted",
  "Device or prosthesis as indicated",
  "Discharge summary to your home paediatric cardiologist",
];

const pediatricCardiacSurgeryTreatments: Treatment[] = PEDIATRIC_CARDIAC_SURGERY_PROCEDURES.map((name) => {
  const cost = PEDIATRIC_CARDIAC_SURGERY_COST[name];
  if (!cost) throw new Error(`Missing pediatric cardiac surgery cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Pediatric Cardiac Surgery",
    specialtySlug: "pediatric-cardiac-surgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      PEDIATRIC_CARDIAC_SURGERY_SUMMARIES[name] ??
      `Pediatric Cardiac Surgery — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: CARDIAC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Congenital heart disease", "Pediatric heart failure"],
    procedures: [name],
    includes: PEDIATRIC_CARDIAC_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named paediatric cardiac surgeon confirms anatomy, stage and an itemized hospital price after records review. Adult cardiac theatres are not assumed to be equivalent.",
  };
});

const CARDIOLOGY_INCLUDES = [
  "Cardiology consultation and records review",
  "Named consultant on camera before travel",
  "Cath lab or EP lab, device and overnight stay as quoted",
  "On-treatment reviews as indicated",
  "Discharge summary to your home cardiologist",
];

const CARDIOLOGY_ONLY = CARDIOLOGY_PROCEDURES.filter((name) => {
  const row = getProcedure(name);
  return row?.specialtySlug === "cardiology" && row.specialtySlugs.length === 1;
});

const cardiologyTreatments: Treatment[] = CARDIOLOGY_ONLY.map((name) => {
  const cost = CARDIOLOGY_COST[name];
  if (!cost) throw new Error(`Missing cardiology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Cardiology",
    specialtySlug: "cardiology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      CARDIOLOGY_SUMMARIES[name] ??
      `Cardiology — ${name} at JCI partner campuses with a named consultant before you travel.`,
    image: CARDIAC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Coronary artery disease", "Arrhythmia", "Structural heart disease"],
    procedures: [name],
    includes: CARDIOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named cardiologist confirms access, device and an itemized hospital price after records review.",
  };
});

const BARIATRIC_IMAGE =
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80";

const BARIATRIC_INCLUDES = [
  "Bariatric consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, staplers or endoscopic kit, and overnight stay as quoted",
  "Dietetic plan and leak protocol as indicated",
  "Discharge summary to your home physician",
];

const bariatricTreatments: Treatment[] = BARIATRIC_PROCEDURES.map((name) => {
  const cost = BARIATRIC_COST[name];
  if (!cost) throw new Error(`Missing bariatric cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Bariatric Surgery",
    specialtySlug: "bariatric-surgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      BARIATRIC_SUMMARIES[name] ??
      `Bariatric Surgery — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: BARIATRIC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Obesity", "Metabolic syndrome", "Type 2 diabetes"],
    procedures: [name],
    includes: BARIATRIC_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named bariatric surgeon confirms BMI, procedure and an itemized hospital price after records review.",
  };
});

export const treatments: Treatment[] = [
  ...radiationTreatments,
  ...surgicalTreatments,
  ...medicalTreatments,
  ...hematologyTreatments,
  ...pediatricHematologyTreatments,
  ...cardiacSurgeryTreatments,
  ...pediatricCardiacSurgeryTreatments,
  ...cardiologyTreatments,
  ...bariatricTreatments,
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}
