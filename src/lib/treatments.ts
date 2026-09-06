import { hospitals } from "@/lib/hospitals";
import { PROCEDURE_CLUSTERS, RADIATION_PROCEDURES, toSlug } from "@/lib/taxonomy";

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  specialtySlug: string;
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
    partner: "$4,800–$11,000",
    stay: "4–6 weeks of fractions",
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

export const treatments: Treatment[] = RADIATION_PROCEDURES.map((name) => {
  const cost = RADIATION_COST[name];
  const slug = toSlug(name);
  const isEbrt = name === "External Beam Radiotherapy (EBRT)";
  return {
    slug,
    name,
    category: "Radiation Oncology",
    specialtySlug: "radiation-oncology",
    procedureSlug: slug,
    summary: isEbrt
      ? EBRT_COPY.summary
      : `Radiation Oncology — ${name} delivered at JCI-accredited partner campuses with physics QA, peer-reviewed plans, and a named radiation oncologist before you travel.`,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: hospitalSlugsForProcedure(name),
    conditions: ["Solid tumors", "Cancer second opinion"],
    procedures: [name],
    includes: isEbrt
      ? EBRT_COPY.includes
      : [
          "Simulation CT and contouring review",
          "Physics QA and peer plan check",
          "Named radiation oncologist on camera before travel",
          "Discharge summary to your home oncologist",
        ],
    notes: isEbrt
      ? EBRT_COPY.notes
      : "Fractions, energy, and whether protons or brachytherapy are appropriate are decided after records review — not from a brochure price.",
  };
});

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}
