import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const blankTranslation = {
  status: "draft" as const,
  name: "",
  shortDescription: "",
  editorialBody: "",
  fullDescription: "",
  overview: "",
  whatIsIt: "",
  conditionsTreated: "",
  whyPerformed: "",
  whoMayNeed: "",
  howItWorks: "",
  process: [] as Array<{ id: string; title: string; description: string }>,
  preparation: "",
  procedureDetails: "",
  recovery: "",
  risks: "",
  hospitalStay: "",
  recoveryPeriod: "",
  followUp: "",
  importantConsiderations: "",
  treatmentType: "",
  treatmentSetting: "",
  technology: "",
  searchKeywords: [] as string[],
  faqs: [] as Array<{ id: string; question: string; answer: string }>,
  imageAlt: "",
  seoTitle: "",
  metaDescription: "",
};

const body = readFileSync(resolve("scripts/external-beam-radiotherapy-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "external-beam-radiotherapy-in-india");
const now = "2026-10-02T16:00:00.000Z";
const SLUG = "external-beam-radiotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const LINK = " ([External Beam Radiotherapy in India](/treatments/external-beam-radiotherapy-in-india))";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "[radiation therapy](/costs/India/Radiation-Oncology/EBRT), [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy)",
    `[radiation therapy](/costs/India/Radiation-Oncology/EBRT)${LINK}, [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy)`,
  ],
  [
    "[external-beam radiation therapy](/costs/India/Radiation-Oncology/EBRT) combined with platinum-based",
    `[external-beam radiation therapy](/costs/India/Radiation-Oncology/EBRT)${LINK} combined with platinum-based`,
  ],
];

const treatment = {
  id: existing?.id ?? "c3d4e8a7-0e26-5d17-e74c-3a8b1d4e7c92",
  slug: SLUG,
  previousSlugs: [],
  baseName: "External Beam Radiotherapy in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "External Beam Radiotherapy",
  category: "External Beam Radiotherapy (EBRT)",
  image: "/uploads/treatments/eb-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anil-kumar-anand",
    "dr-anusheel-munshi",
    "dr-kushal-narang",
    "dr-sandeep-de",
    "dr-dipali-bhorikar-borade",
    "dr-anitha-gopinath",
    "dr-m-vinay-ural",
    "dr-sapna-nangia",
    "dr-rakesh-jalali",
    "dr-p-vijay-anand-reddy",
    "dr-ashwin-m-shah",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "blk-max-delhi",
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-proton-cancer-centre",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "external-beam-radiotherapy-ebrt",
    "3d-conformal-radiotherapy-3d-crt",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "stereotactic-body-radiotherapy-sbrt",
    "stereotactic-radiosurgery-srs",
    "proton-beam-therapy",
    "brachytherapy",
  ],
  relatedTreatmentSlugs: [BREAST, PROSTATE, CERVICAL, COLON, LYMPHOMA, BRAIN],
  status: "published" as const,
  featured: true,
  sortOrder: 71,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "External Beam Radiotherapy in India",
      shortDescription:
        "EBRT in India is named after the target, previous dose and organ constraints, not a linac brochure. GAF planning is $1,000–$6,000+, typically 15–35 sessions over 4–7 weeks.",
      editorialBody: body,
      process: [
        {
          id: "eb-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and any previous radiation plan before anyone books travel.",
        },
        {
          id: "eb-step-2",
          title: "Radiation oncology review",
          description:
            "A radiation oncologist reviews whether EBRT, brachytherapy, SBRT, protons or no India list is the honest product.",
        },
        {
          id: "eb-step-3",
          title: "Name the technique",
          description:
            "The team writes 3D-CRT, IMRT, IGRT, SBRT or protons only after the target and organs at risk are reviewed.",
        },
        {
          id: "eb-step-4",
          title: "Itemized estimate",
          description:
            "GAF EBRT planning is $1,000–$6,000+. Neighbouring IMRT is $6,500–$14,500 when intensity modulation is the named product.",
        },
        {
          id: "eb-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Airway compromise, uncontrolled bleeding or high fever is a local emergency.",
        },
        {
          id: "eb-step-6",
          title: "CT simulation",
          description: "Positioning, immobilization and planning scans are repeated after arrival.",
        },
        {
          id: "eb-step-7",
          title: "Deliver the named course",
          description: "Daily or hypofractionated fractions proceed only after the list is named.",
        },
        {
          id: "eb-step-8",
          title: "On-treatment care",
          description: "Skin, swallowing, bowel and bladder effects are watched during the course.",
        },
        {
          id: "eb-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with a side-effect plan, imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share pathology, imaging and any previous radiation dose so the team can judge EBRT versus brachytherapy, SBRT or protons.",
      recovery:
        "Most EBRT is outpatient. Fatigue and site-specific effects can build through the course. GAF planning is 15–35 sessions over 4–7 weeks.",
      hospitalStay: "Usually outpatient. Typical course 15–35 sessions over 4–7 weeks.",
      recoveryPeriod:
        "Acute effects often ease over weeks after the last fraction. Late effects are followed long term.",
      followUp:
        "Request a written summary covering technique, total dose, fractions, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "EBRT is local radiation, not brachytherapy. GAF planning is $1,000–$6,000+. Inability to swallow fluids, chest pain, high fever or fainting belongs in a local emergency department.",
      treatmentType: "External Beam Radiotherapy / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "Linac-based 3D-CRT, IMRT, IGRT, VMAT, neighbouring SBRT and proton sheets",
      searchKeywords: [
        "External Beam Radiotherapy in India",
        "EBRT treatment in India",
        "External beam radiation therapy cost in India",
        "Radiotherapy in India",
        "IMRT treatment in India",
        "IGRT radiotherapy in India",
        "SBRT treatment in India",
        "Radiation therapy cost in India",
      ],
      faqs: [
        {
          id: "eb-faq-1",
          question: "What is external beam radiotherapy?",
          answer:
            "High-energy radiation generated outside the body and directed at a planned cancer target.",
        },
        {
          id: "eb-faq-2",
          question: "Does EBRT make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "eb-faq-3",
          question: "How much does EBRT cost in India?",
          answer:
            "GAF Healthcare planning is $1,000–$6,000+, typically 15–35 sessions over 4–7 weeks. US comparison is $12,000–$25,000.",
        },
        {
          id: "eb-faq-4",
          question: "How many sessions are needed?",
          answer:
            "It varies. Conventional lists may last several weeks. Selected stereotactic or palliative lists are shorter.",
        },
        {
          id: "eb-faq-5",
          question: "Is it painful?",
          answer: "Beam-on is generally painless. Side effects can develop depending on the treated area.",
        },
        {
          id: "eb-faq-6",
          question: "Do I stay in hospital?",
          answer: "Most EBRT is outpatient.",
        },
        {
          id: "eb-faq-7",
          question: "Is IMRT always better than 3D-CRT?",
          answer: "No. The named plan and nearby organs decide the technique.",
        },
        {
          id: "eb-faq-8",
          question: "Is proton therapy always better?",
          answer: "No. Protons can help selected anatomies. They are not an automatic upgrade.",
        },
        {
          id: "eb-faq-9",
          question: "Can EBRT be combined with chemotherapy?",
          answer: "Yes, when the cancer protocol uses concurrent chemoradiation.",
        },
        {
          id: "eb-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Inability to swallow fluids, chest pain, severe shortness of breath, uncontrolled bleeding, high fever or fainting belongs in a local emergency department.",
        },
        {
          id: "eb-faq-11",
          question: "Which city in India is right for EBRT?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "eb-faq-12",
          question: "Can international patients get EBRT in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt: "Educational unlabeled schematic of a linear accelerator directing focused beams at a body target",
      seoTitle: "External Beam Radiotherapy in India: Cost, Types & Treatment",
      metaDescription:
        "Learn about external beam radiotherapy in India, including EBRT types, IMRT, IGRT, VMAT, SBRT, treatment process, sessions, side effects and cost.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  let editorial = row.translations?.en?.editorialBody ?? "";
  if (!editorial || editorial.includes(`/treatments/${SLUG}`)) return;
  for (const [needle, replacement] of REPLACEMENTS) {
    if (editorial.includes(needle)) {
      editorial = editorial.replaceAll(needle, replacement);
    }
  }
  row.translations!.en!.editorialBody = editorial;
}

for (const slug of [BREAST, PROSTATE, CERVICAL, COLON, LYMPHOMA, BRAIN]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [radical nephrectomy in India](https://gaf.healthcare/treatments/radical-nephrectomy-in-india).",
    ", [radical nephrectomy in India](https://gaf.healthcare/treatments/radical-nephrectomy-in-india) and [external beam radiotherapy in India](https://gaf.healthcare/treatments/external-beam-radiotherapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string) {
  if (!existsSync(path)) return;
  let text = readFileSync(path, "utf8");
  const original = text;
  if (text.includes(`/treatments/${SLUG}`)) return;
  for (const [needle, replacement] of REPLACEMENTS) {
    if (text.includes(needle)) {
      text = text.replaceAll(needle, replacement);
    }
  }
  if (text !== original) {
    writeFileSync(path, text);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/radical-prostatectomy-treatment-body.md"));
