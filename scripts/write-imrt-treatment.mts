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

const body = readFileSync(resolve("scripts/imrt-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "intensity-modulated-radiation-therapy-in-india");
const now = "2026-10-02T17:00:00.000Z";
const SLUG = "intensity-modulated-radiation-therapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const LINK =
  " Named IMRT lists sit on [IMRT in India](/treatments/intensity-modulated-radiation-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF IMRT, IGRT, VMAT, SBRT or proton-only treatment page.",
    `There is no live GAF IGRT, VMAT, SBRT or proton-only treatment page.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "d4e5f9b8-1f37-6e28-f85d-4b9c2e5f8d03",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Intensity-Modulated Radiation Therapy (IMRT) in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "IMRT",
  category: "Intensity-Modulated Radiotherapy (IMRT)",
  image: "/uploads/treatments/im-hero.webp",
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
    "intensity-modulated-radiotherapy-imrt",
    "external-beam-radiotherapy-ebrt",
    "3d-conformal-radiotherapy-3d-crt",
    "image-guided-radiotherapy-igrt",
    "stereotactic-body-radiotherapy-sbrt",
    "proton-beam-therapy",
    "brachytherapy",
  ],
  relatedTreatmentSlugs: [EBRT, BREAST, PROSTATE, CERVICAL, COLON, PANCREAS, LYMPHOMA, BRAIN, SPINE],
  status: "published" as const,
  featured: true,
  sortOrder: 72,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Intensity-Modulated Radiation Therapy (IMRT) in India",
      shortDescription:
        "IMRT in India is named after target geometry and organ constraints, not a linac brochure. GAF planning is $6,500–$14,500, typically 4–7 weeks of fractions.",
      editorialBody: body,
      process: [
        {
          id: "im-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and any previous radiation plan before anyone books travel.",
        },
        {
          id: "im-step-2",
          title: "Radiation oncology review",
          description:
            "A radiation oncologist reviews whether IMRT, 3D-CRT, SBRT, protons or no India list is the honest product.",
        },
        {
          id: "im-step-3",
          title: "Name the technique",
          description:
            "The team writes IMRT only after the target, organs at risk and previous dose are reviewed.",
        },
        {
          id: "im-step-4",
          title: "Itemized estimate",
          description:
            "GAF IMRT planning is $6,500–$14,500. Neighbouring EBRT is $1,000–$6,000+ when a simpler list is the named product.",
        },
        {
          id: "im-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Airway compromise, uncontrolled bleeding or high fever is a local emergency.",
        },
        {
          id: "im-step-6",
          title: "CT simulation",
          description: "Positioning, immobilization and planning scans are repeated after arrival.",
        },
        {
          id: "im-step-7",
          title: "Deliver the named IMRT course",
          description: "Inverse-planned fractions proceed only after physics QA.",
        },
        {
          id: "im-step-8",
          title: "On-treatment care",
          description: "Skin, swallowing, bowel and bladder effects are watched during the course.",
        },
        {
          id: "im-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with a side-effect plan, imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share pathology, imaging and any previous radiation dose so the team can judge IMRT versus 3D-CRT, SBRT or protons.",
      recovery:
        "Most IMRT is outpatient. Fatigue and site-specific effects can build through the course. GAF planning is 4–7 weeks of fractions.",
      hospitalStay: "Usually outpatient. Typical course 4–7 weeks of fractions.",
      recoveryPeriod:
        "Acute effects often ease over weeks after the last fraction. Late effects are followed long term.",
      followUp:
        "Request a written summary covering technique, total dose, fractions, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "IMRT is modulated external-beam radiation, not brachytherapy. GAF planning is $6,500–$14,500. Inability to swallow fluids, chest pain, high fever or fainting belongs in a local emergency department.",
      treatmentType: "IMRT / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "Linac-based inverse-planned IMRT, neighbouring IGRT, SBRT and proton sheets",
      searchKeywords: [
        "Intensity-Modulated Radiation Therapy in India",
        "IMRT treatment in India",
        "IMRT cost in India",
        "IMRT radiation therapy India",
        "IMRT for prostate cancer",
        "IMRT for head and neck cancer",
        "IMRT vs IGRT",
        "IMRT vs VMAT",
      ],
      faqs: [
        {
          id: "im-faq-1",
          question: "What is IMRT?",
          answer:
            "A highly planned form of external beam radiation in which beam intensity is varied to conform dose more closely to the target.",
        },
        {
          id: "im-faq-2",
          question: "Is IMRT the same as IGRT?",
          answer:
            "No. IMRT is dose modulation. IGRT is image guidance. They are often used together.",
        },
        {
          id: "im-faq-3",
          question: "How much does IMRT cost in India?",
          answer:
            "GAF Healthcare planning is $6,500–$14,500, typically 4–7 weeks of fractions. US comparison is $18,000–$40,000.",
        },
        {
          id: "im-faq-4",
          question: "How many sessions are needed?",
          answer:
            "It varies. Conventional lists may last several weeks. Selected hypofractionated lists are shorter.",
        },
        {
          id: "im-faq-5",
          question: "Is IMRT painful?",
          answer: "Beam-on is generally painless. Immobilization can be uncomfortable.",
        },
        {
          id: "im-faq-6",
          question: "Does IMRT require hospitalization?",
          answer: "Usually no. Most IMRT is outpatient.",
        },
        {
          id: "im-faq-7",
          question: "Is IMRT always better than 3D-CRT?",
          answer: "No. The named plan and nearby organs decide the technique.",
        },
        {
          id: "im-faq-8",
          question: "Can IMRT be combined with chemotherapy?",
          answer: "Yes, when the cancer protocol uses concurrent chemoradiation.",
        },
        {
          id: "im-faq-9",
          question: "Does IMRT make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "im-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Inability to swallow fluids, chest pain, severe shortness of breath, uncontrolled bleeding, high fever or fainting belongs in a local emergency department.",
        },
        {
          id: "im-faq-11",
          question: "Which city in India is right for IMRT?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "im-faq-12",
          question: "Can international patients get IMRT in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of intensity-modulated beams wrapping an irregular tumour while sparing nearby organs",
      seoTitle: "IMRT in India: Cost, Treatment, Benefits & Side Effects",
      metaDescription:
        "Learn about IMRT in India, including treatment process, cost, cancer types, benefits, side effects, duration, and IMRT vs IGRT, VMAT and 3D-CRT.",
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

for (const slug of [EBRT, BREAST, PROSTATE, CERVICAL, COLON, PANCREAS, LYMPHOMA, BRAIN, SPINE]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [external beam radiotherapy in India](https://gaf.healthcare/treatments/external-beam-radiotherapy-in-india).",
    ", [external beam radiotherapy in India](https://gaf.healthcare/treatments/external-beam-radiotherapy-in-india) and [IMRT in India](https://gaf.healthcare/treatments/intensity-modulated-radiation-therapy-in-india).",
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

patchMarkdown(resolve("scripts/external-beam-radiotherapy-treatment-body.md"));
