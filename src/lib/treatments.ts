import { SURGICAL_GASTROENTEROLOGY_COST, SURGICAL_GASTROENTEROLOGY_SUMMARIES } from "@/lib/surgical-gastroenterology-costs";
import { UROLOGY_COST, UROLOGY_SUMMARIES } from "@/lib/urology-costs";
import { SPINE_SURGERY_COST, SPINE_SURGERY_SUMMARIES } from "@/lib/spine-surgery-costs";
import { PULMONOLOGY_COST, PULMONOLOGY_SUMMARIES } from "@/lib/pulmonology-costs";
import { PEDIATRIC_ORTHOPAEDIC_COST, PEDIATRIC_ORTHOPAEDIC_SUMMARIES } from "@/lib/pediatric-orthopaedic-costs";
import { ORTHOPEDICS_CLUSTER_BY_PROCEDURE, ORTHOPEDICS_COST, ORTHOPEDICS_SUMMARIES } from "@/lib/orthopedics-costs";
import { OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE, OPHTHALMOLOGY_COST, OPHTHALMOLOGY_SUMMARIES } from "@/lib/ophthalmology-costs";
import { GYNECOLOGY_CLUSTER_BY_PROCEDURE, GYNECOLOGY_CONDITIONS, GYNECOLOGY_COST, GYNECOLOGY_SUMMARIES } from "@/lib/gynecology-costs";
import { NEUROSURGERY_CLUSTER_BY_PROCEDURE, NEUROSURGERY_CONDITIONS, NEUROSURGERY_COST, NEUROSURGERY_SHARED, NEUROSURGERY_SUMMARIES } from "@/lib/neurosurgery-costs";
import { NEUROLOGY_CLUSTER_BY_PROCEDURE, NEUROLOGY_CONDITIONS, NEUROLOGY_COST, NEUROLOGY_SHARED, NEUROLOGY_SUMMARIES } from "@/lib/neurology-costs";
import { NEPHROLOGY_CLUSTER_BY_PROCEDURE, NEPHROLOGY_CONDITIONS, NEPHROLOGY_COST, NEPHROLOGY_SHARED, NEPHROLOGY_SUMMARIES } from "@/lib/nephrology-costs";
import { GASTROENTEROLOGY_COST, GASTROENTEROLOGY_SUMMARIES } from "@/lib/gastroenterology-costs";
import { ENT_COST, ENT_SUMMARIES } from "@/lib/ent-costs";
import { COSMETIC_COST, COSMETIC_SUMMARIES } from "@/lib/cosmetic-costs";
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
  SURGICAL_GASTROENTEROLOGY_PROCEDURES,
  UROLOGY_PROCEDURES,
  SPINE_SURGERY_PROCEDURES,
  PULMONOLOGY_PROCEDURES,
  PEDIATRIC_ORTHOPAEDIC_PROCEDURES,
  ORTHOPEDICS_PROCEDURES,
  OPHTHALMOLOGY_PROCEDURES,
  GYNECOLOGY_PROCEDURES,
  NEUROSURGERY_PROCEDURES,
  NEUROLOGY_PROCEDURES,
  NEPHROLOGY_PROCEDURES,
  GASTROENTEROLOGY_PROCEDURES,
  ENT_PROCEDURES,
  COSMETIC_PROCEDURES,
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

const COSMETIC_IMAGE =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80";

const COSMETIC_INCLUDES = [
  "Plastic surgery consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, implants or grafts, and overnight stay as quoted",
  "Compression and wound protocol as indicated",
  "Discharge summary to your home physician",
];

const cosmeticTreatments: Treatment[] = COSMETIC_PROCEDURES.map((name) => {
  const cost = COSMETIC_COST[name];
  if (!cost) throw new Error(`Missing cosmetic cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Cosmetic Surgery",
    specialtySlug: "cosmetic-surgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      COSMETIC_SUMMARIES[name] ??
      `Cosmetic Surgery — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: COSMETIC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Contour", "Facial ageing", "Breast and body aesthetics"],
    procedures: [name],
    includes: COSMETIC_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named plastic surgeon confirms photographs, implant or graft plan and an itemized hospital price after records review.",
  };
});

const ENT_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80";

const ENT_INCLUDES = [
  "ENT consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, implant or endoscope, and overnight stay as quoted",
  "Audiology or speech follow-up as indicated",
  "Discharge summary to your home ENT",
];

const ENT_ONLY = ENT_PROCEDURES.filter((name) => {
  const row = getProcedure(name);
  return row?.specialtySlug === "ent";
});

const entTreatments: Treatment[] = ENT_ONLY.map((name) => {
  const cost = ENT_COST[name];
  if (!cost) throw new Error(`Missing ENT cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "ENT",
    specialtySlug: "ent",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      ENT_SUMMARIES[name] ??
      `ENT — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: ENT_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Hearing loss", "Sinus disease", "Head and neck pathology"],
    procedures: [name],
    includes: ENT_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named ENT surgeon confirms imaging, implant or reconstruction and an itemized hospital price after records review.",
  };
});

const GASTRO_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80";

const GASTRO_INCLUDES = [
  "Gastroenterology consultation and records review",
  "Named consultant on camera before travel",
  "Endoscopy suite, sedation or anaesthesia, and overnight stay as quoted",
  "Histology, stent or drain follow-up as indicated",
  "Discharge summary to your home physician",
];

const gastroenterologyTreatments: Treatment[] = GASTROENTEROLOGY_PROCEDURES.map((name) => {
  const cost = GASTROENTEROLOGY_COST[name];
  if (!cost) throw new Error(`Missing gastroenterology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Gastroenterology",
    specialtySlug: "gastroenterology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      GASTROENTEROLOGY_SUMMARIES[name] ??
      `Gastroenterology — ${name} at JCI partner campuses with a named consultant before you travel.`,
    image: GASTRO_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Luminal disease", "Biliopancreatic obstruction", "Hepatology"],
    procedures: [name],
    includes: GASTRO_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named gastroenterologist confirms imaging, endoscopy plan and an itemized hospital price after records review.",
  };
});

const SURGICAL_GASTRO_IMAGE =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80";

const SURGICAL_GASTRO_INCLUDES = [
  "HPB / GI surgery consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, ICU and overnight stay as quoted",
  "Histology, drain or immunosuppression follow-up as indicated",
  "Discharge summary to your home physician",
];

const SURGICAL_GASTRO_ONLY = SURGICAL_GASTROENTEROLOGY_PROCEDURES.filter((name) => {
  const row = getProcedure(name);
  return row?.specialtySlug === "surgical-gastroenterology" && row.specialtySlugs.length === 1;
});

const surgicalGastroenterologyTreatments: Treatment[] = SURGICAL_GASTRO_ONLY.map((name) => {
  const cost = SURGICAL_GASTROENTEROLOGY_COST[name];
  if (!cost) throw new Error(`Missing surgical gastroenterology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Surgical Gastroenterology",
    specialtySlug: "surgical-gastroenterology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      SURGICAL_GASTROENTEROLOGY_SUMMARIES[name] ??
      `Surgical Gastroenterology — ${name} at JCI partner campuses with a named surgeon before you travel.`,
    image: SURGICAL_GASTRO_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["HPB disease", "Foregut and colorectal surgery", "Liver failure"],
    procedures: [name],
    includes: SURGICAL_GASTRO_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named surgical gastroenterologist confirms imaging, graft or reconstruction and an itemized hospital price after records review.",
  };
});

const UROLOGY_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80";

const UROLOGY_INCLUDES = [
  "Urology consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, laser or transplant stay as quoted",
  "Stent, histology, graft or device follow-up as indicated",
  "Discharge summary to your home physician",
];

const UROLOGY_ONLY = UROLOGY_PROCEDURES.filter((name) => {
  const row = getProcedure(name);
  return row?.specialtySlug === "urology";
});

const urologyTreatments: Treatment[] = UROLOGY_ONLY.map((name) => {
  const cost = UROLOGY_COST[name];
  if (!cost) throw new Error(`Missing urology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Urology",
    specialtySlug: "urology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      UROLOGY_SUMMARIES[name] ??
      `Urology — ${name} at JCI partner campuses with a named urologist before you travel.`,
    image: UROLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Stone disease", "Prostate and bladder", "Kidney failure", "Reconstructive and paediatric urology"],
    procedures: [name],
    includes: UROLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named urologist confirms imaging, graft or laser plan and an itemized hospital price after records review.",
  };
});

const SPINE_IMAGE =
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80";

const SPINE_INCLUDES = [
  "Spine consultation and records review",
  "Named surgeon on camera before travel",
  "Theatre, implants and overnight stay as quoted",
  "Neuromonitoring and post-op imaging as indicated",
  "Discharge summary to your home physician",
];

const spineSurgeryTreatments: Treatment[] = SPINE_SURGERY_PROCEDURES.map((name) => {
  const cost = SPINE_SURGERY_COST[name];
  if (!cost) throw new Error(`Missing spine surgery cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Spine Surgery",
    specialtySlug: "spine-surgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      SPINE_SURGERY_SUMMARIES[name] ??
      `Spine Surgery — ${name} at JCI partner campuses with a named spine surgeon before you travel.`,
    image: SPINE_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Disc herniation", "Stenosis and instability", "Deformity", "Spinal tumour"],
    procedures: [name],
    includes: SPINE_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named spine surgeon confirms MRI, levels and an itemized hospital price after records review.",
  };
});

const PULMONOLOGY_IMAGE =
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1600&q=80";

const PULMONOLOGY_INCLUDES = [
  "Pulmonology consultation and records review",
  "Named consultant on camera before travel",
  "Scope, anaesthesia and overnight stay as quoted",
  "Histology, drain or ICU step-down as indicated",
  "Discharge summary to your home physician",
];

const pulmonologyTreatments: Treatment[] = PULMONOLOGY_PROCEDURES.map((name) => {
  const cost = PULMONOLOGY_COST[name];
  if (!cost) throw new Error(`Missing pulmonology cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Pulmonology",
    specialtySlug: "pulmonology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      PULMONOLOGY_SUMMARIES[name] ??
      `Pulmonology — ${name} at JCI partner campuses with a named pulmonologist before you travel.`,
    image: PULMONOLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Airway disease", "Pleural disease", "ILD and staging", "End-stage lung failure"],
    procedures: [name],
    includes: PULMONOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named pulmonologist confirms imaging, scope plan and an itemized hospital price after records review.",
  };
});

const PEDIATRIC_ORTHOPAEDIC_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80";

const PEDIATRIC_ORTHOPAEDIC_INCLUDES = [
  "Pediatric orthopaedic consultation and records review",
  "Named consultant on camera before travel",
  "Imaging, anaesthesia and paediatric ward stay as quoted",
  "Implants, frame or plaster as indicated",
  "Discharge summary to your home physician",
];

const pediatricOrthopaedicTreatments: Treatment[] = PEDIATRIC_ORTHOPAEDIC_PROCEDURES.map((name) => {
  const cost = PEDIATRIC_ORTHOPAEDIC_COST[name];
  if (!cost) throw new Error(`Missing pediatric orthopaedic cost for ${name}`);
  const slug = toSlug(name);
  return {
    slug,
    name,
    category: "Pediatric Orthopaedic",
    specialtySlug: "pediatric-orthopaedic",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      PEDIATRIC_ORTHOPAEDIC_SUMMARIES[name] ??
      `Pediatric Orthopaedic — ${name} at JCI partner campuses with a named paediatric orthopaedic surgeon before you travel.`,
    image: PEDIATRIC_ORTHOPAEDIC_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Congenital deformity", "Paediatric trauma", "Hip dysplasia and SCFE", "Neuromuscular and spine"],
    procedures: [name],
    includes: PEDIATRIC_ORTHOPAEDIC_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named paediatric orthopaedic surgeon confirms imaging, growth remaining and an itemized hospital price after records review.",
  };
});

const ORTHOPEDICS_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80";

const ORTHOPEDICS_INCLUDES = [
  "Orthopedics consultation and records review",
  "Named consultant on camera before travel",
  "Implant, graft or hardware as quoted",
  "Anaesthesia, ward stay and physiotherapy as indicated",
  "Discharge summary to your home physician",
];

const orthopedicsTreatments: Treatment[] = ORTHOPEDICS_PROCEDURES.map((name) => {
  const cost = ORTHOPEDICS_COST[name];
  if (!cost) throw new Error(`Missing orthopedics cost for ${name}`);
  const slug = toSlug(name);
  const cluster = ORTHOPEDICS_CLUSTER_BY_PROCEDURE[name] ?? "Orthopedics";
  return {
    slug,
    name,
    category: cluster,
    specialtySlug: "orthopedics",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      ORTHOPEDICS_SUMMARIES[name] ??
      `Orthopedics — ${name} at JCI partner campuses with a named orthopaedic surgeon before you travel.`,
    image: ORTHOPEDICS_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Arthritis and joint wear", "Sports injury", "Trauma and non-union", "Hand, foot and ankle"],
    procedures: [name],
    includes: ORTHOPEDICS_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named orthopaedic surgeon confirms imaging, implant and an itemized hospital price after records review.",
  };
});

const OPHTHALMOLOGY_IMAGE =
  "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1600&q=80";

const OPHTHALMOLOGY_INCLUDES = [
  "Ophthalmology consultation and records review",
  "Named consultant on camera before travel",
  "Biometry, tomography or OCT as indicated",
  "Lens, graft, laser or implant as quoted",
  "Discharge summary to your home physician",
];

const ophthalmologyTreatments: Treatment[] = OPHTHALMOLOGY_PROCEDURES.filter(
  (name) => name !== "Blepharoplasty",
).map((name) => {
  const cost = OPHTHALMOLOGY_COST[name];
  if (!cost) throw new Error(`Missing ophthalmology cost for ${name}`);
  const slug = toSlug(name);
  const cluster = OPHTHALMOLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Ophthalmology";
  return {
    slug,
    name,
    category: cluster,
    specialtySlug: "ophthalmology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      OPHTHALMOLOGY_SUMMARIES[name] ??
      `Ophthalmology — ${name} at JCI partner campuses with a named ophthalmologist before you travel.`,
    image: OPHTHALMOLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Cataract and refractive error", "Cornea and keratoconus", "Glaucoma", "Retina and oculoplastics"],
    procedures: [name],
    includes: OPHTHALMOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named ophthalmologist confirms imaging, laterality and an itemized hospital price after records review.",
  };
});

const GYNECOLOGY_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

const GYNECOLOGY_INCLUDES = [
  "Gynecology consultation and records review",
  "Named consultant on camera before travel",
  "Imaging, hysteroscopy or tumour markers as indicated",
  "Approach, uterus-sparing versus hysterectomy as quoted",
  "Discharge summary to your home physician",
];

const gynecologyTreatments: Treatment[] = GYNECOLOGY_PROCEDURES.filter(
  (name) => name !== "Radical Hysterectomy",
).map((name) => {
  const cost = GYNECOLOGY_COST[name];
  if (!cost) throw new Error(`Missing gynecology cost for ${name}`);
  const slug = toSlug(name);
  const cluster = GYNECOLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Gynecology";
  return {
    slug,
    name,
    category: cluster,
    specialtySlug: "gynecology",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      GYNECOLOGY_SUMMARIES[name] ??
      `Gynecology — ${name} at JCI partner campuses with a named gynecologist before you travel.`,
    image: GYNECOLOGY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: GYNECOLOGY_CONDITIONS,
    procedures: [name],
    includes: GYNECOLOGY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named gynecologist confirms imaging, approach and an itemized hospital price after records review.",
  };
});

const NEUROSURGERY_IMAGE =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80";

const NEUROSURGERY_INCLUDES = [
  "Neurosurgery consultation and records review",
  "Named consultant on camera before travel",
  "MRI, angiography or EEG as indicated",
  "Approach, laterality and implant or device as quoted",
  "Discharge summary to your home physician",
];

const neurosurgeryShared = new Set<string>(NEUROSURGERY_SHARED);

const neurosurgeryTreatments: Treatment[] = NEUROSURGERY_PROCEDURES.filter(
  (name) => !neurosurgeryShared.has(name),
).map((name) => {
  const cost = NEUROSURGERY_COST[name];
  if (!cost) throw new Error(`Missing neurosurgery cost for ${name}`);
  const slug = toSlug(name);
  const cluster = NEUROSURGERY_CLUSTER_BY_PROCEDURE[name] ?? "Neurosurgery";
  return {
    slug,
    name,
    category: cluster,
    specialtySlug: "neurosurgery",
    specialtySlugs: slugsForProcedureName(name),
    procedureSlug: slug,
    summary:
      NEUROSURGERY_SUMMARIES[name] ??
      `Neurosurgery — ${name} at JCI partner campuses with a named neurosurgeon before you travel.`,
    image: NEUROSURGERY_IMAGE,
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: NEUROSURGERY_CONDITIONS,
    procedures: [name],
    includes: NEUROSURGERY_INCLUDES,
    notes:
      "Indicative planning ranges, not quotations. The named neurosurgeon confirms imaging, approach and an itemized hospital price after records review.",
  };
});

const NEUROLOGY_IMAGE =
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80";

const NEUROLOGY_INCLUDES = [
  "Neurology consultation and records review",
  "Named consultant on camera before travel",
  "EEG, EMG, imaging or CSF as indicated",
  "Infusion, implant or monitoring plan as quoted",
  "Discharge summary to your home physician",
];

const neurologyShared = new Set<string>(NEUROLOGY_SHARED);

const neurologyTreatments: Treatment[] = NEUROLOGY_PROCEDURES.filter((name) => !neurologyShared.has(name)).map(
  (name) => {
    const cost = NEUROLOGY_COST[name];
    if (!cost) throw new Error(`Missing neurology cost for ${name}`);
    const slug = toSlug(name);
    const cluster = NEUROLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Neurology";
    return {
      slug,
      name,
      category: cluster,
      specialtySlug: "neurology",
      specialtySlugs: slugsForProcedureName(name),
      procedureSlug: slug,
      summary:
        NEUROLOGY_SUMMARIES[name] ??
        `Neurology — ${name} at JCI partner campuses with a named neurologist before you travel.`,
      image: NEUROLOGY_IMAGE,
      usRange: cost.us,
      partnerRange: cost.partner,
      stay: cost.stay,
      hospitalSlugs: hospitalSlugsForProcedure(name),
      conditions: NEUROLOGY_CONDITIONS,
      procedures: [name],
      includes: NEUROLOGY_INCLUDES,
      notes:
        "Indicative planning ranges, not quotations. The named neurologist confirms imaging, electrodiagnosis and an itemized hospital price after records review.",
    };
  },
);

const NEPHROLOGY_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80";

const NEPHROLOGY_INCLUDES = [
  "Nephrology consultation and records review",
  "Named consultant on camera before travel",
  "Labs, biopsy, access or HLA work as indicated",
  "Dialysis, access or transplant plan as quoted",
  "Discharge summary to your home physician",
];

const nephrologyShared = new Set<string>(NEPHROLOGY_SHARED);

const nephrologyTreatments: Treatment[] = NEPHROLOGY_PROCEDURES.filter((name) => !nephrologyShared.has(name)).map(
  (name) => {
    const cost = NEPHROLOGY_COST[name];
    if (!cost) throw new Error(`Missing nephrology cost for ${name}`);
    const slug = toSlug(name);
    const cluster = NEPHROLOGY_CLUSTER_BY_PROCEDURE[name] ?? "Nephrology";
    return {
      slug,
      name,
      category: cluster,
      specialtySlug: "nephrology",
      specialtySlugs: slugsForProcedureName(name),
      procedureSlug: slug,
      summary:
        NEPHROLOGY_SUMMARIES[name] ??
        `Nephrology — ${name} at JCI partner campuses with a named nephrologist before you travel.`,
      image: NEPHROLOGY_IMAGE,
      usRange: cost.us,
      partnerRange: cost.partner,
      stay: cost.stay,
      hospitalSlugs: hospitalSlugsForProcedure(name),
      conditions: NEPHROLOGY_CONDITIONS,
      procedures: [name],
      includes: NEPHROLOGY_INCLUDES,
      notes:
        "Indicative planning ranges, not quotations. The named nephrologist confirms GFR, access, HLA or biopsy and an itemized hospital price after records review.",
    };
  },
);

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
  ...cosmeticTreatments,
  ...entTreatments,
  ...gastroenterologyTreatments,
  ...surgicalGastroenterologyTreatments,
  ...urologyTreatments,
  ...spineSurgeryTreatments,
  ...pulmonologyTreatments,
  ...pediatricOrthopaedicTreatments,
  ...orthopedicsTreatments,
  ...ophthalmologyTreatments,
  ...gynecologyTreatments,
  ...neurosurgeryTreatments,
  ...neurologyTreatments,
  ...nephrologyTreatments,
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}
