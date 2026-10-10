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

const body = readFileSync(resolve("scripts/igrt-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "image-guided-radiation-therapy-in-india");
const now = "2026-10-02T17:00:00.000Z";
const SLUG = "image-guided-radiation-therapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const LINK =
  " Named IGRT lists sit on [IGRT in India](/treatments/image-guided-radiation-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF IGRT, VMAT, SBRT or proton-only treatment page.",
    `There is no live GAF VMAT, SBRT or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF IGRT treatment page. The neighbouring sheet is [IGRT](/costs/India/Radiation-Oncology/IGRT).",
    `Named IGRT lists sit on [IGRT in India](/treatments/image-guided-radiation-therapy-in-india). The neighbouring sheet is [IGRT](/costs/India/Radiation-Oncology/IGRT).`,
  ],
];

const treatment = {
  id: existing?.id ?? "e5f6a0c9-2a48-7f39-a96e-5c0d3f6a9e14",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Image-Guided Radiation Therapy (IGRT) in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "IGRT",
  category: "Image-Guided Radiotherapy (IGRT)",
  image: "/uploads/treatments/ig-hero.webp",
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
    "image-guided-radiotherapy-igrt",
    "intensity-modulated-radiotherapy-imrt",
    "external-beam-radiotherapy-ebrt",
    "3d-conformal-radiotherapy-3d-crt",
    "stereotactic-body-radiotherapy-sbrt",
    "proton-beam-therapy",
    "brachytherapy",
  ],
  relatedTreatmentSlugs: [EBRT, IMRT, BREAST, PROSTATE, CERVICAL, COLON, PANCREAS, LYMPHOMA, BRAIN, SPINE],
  status: "published" as const,
  featured: true,
  sortOrder: 73,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Image-Guided Radiation Therapy (IGRT) in India",
      shortDescription:
        "IGRT in India is named after motion, margins and the imaging protocol, not a linac brochure. GAF planning is $7,200–$16,000, typically 4–7 weeks of fractions.",
      editorialBody: body,
      process: [
        {
          id: "ig-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and any previous radiation plan before anyone books travel.",
        },
        {
          id: "ig-step-2",
          title: "Radiation oncology review",
          description:
            "A radiation oncologist reviews whether IGRT, IMRT, 3D-CRT, SBRT, protons or no India list is the honest product.",
        },
        {
          id: "ig-step-3",
          title: "Name the imaging protocol",
          description:
            "The team writes IGRT only after motion, margins and the image-guidance method are reviewed.",
        },
        {
          id: "ig-step-4",
          title: "Itemized estimate",
          description:
            "GAF IGRT planning is $7,200–$16,000. Neighbouring IMRT is $6,500–$14,500 when modulation, not daily imaging, is the named product.",
        },
        {
          id: "ig-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Airway compromise, uncontrolled bleeding or high fever is a local emergency.",
        },
        {
          id: "ig-step-6",
          title: "CT simulation",
          description: "Positioning, immobilization and planning scans are repeated after arrival.",
        },
        {
          id: "ig-step-7",
          title: "Deliver the named IGRT course",
          description: "Daily imaging and couch correction proceed only after physics QA.",
        },
        {
          id: "ig-step-8",
          title: "On-treatment care",
          description: "Skin, swallowing, bowel, bladder and anatomy change are watched during the course.",
        },
        {
          id: "ig-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with a side-effect plan, imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share pathology, imaging and any previous radiation dose so the team can judge IGRT versus IMRT, 3D-CRT, SBRT or protons.",
      recovery:
        "Most IGRT is outpatient. Fatigue and site-specific effects can build through the course. GAF planning is 4–7 weeks of fractions.",
      hospitalStay: "Usually outpatient. Typical course 4–7 weeks of fractions.",
      recoveryPeriod:
        "Acute effects often ease over weeks after the last fraction. Late effects are followed long term.",
      followUp:
        "Request a written summary covering technique, imaging method, total dose, fractions, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "IGRT is image-guided external-beam radiation, not brachytherapy. GAF planning is $7,200–$16,000. Inability to swallow fluids, chest pain, high fever or fainting belongs in a local emergency department.",
      treatmentType: "IGRT / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "Linac-based IGRT with CBCT, X-ray or selected MR guidance, neighbouring IMRT, SBRT and proton sheets",
      searchKeywords: [
        "Image-Guided Radiation Therapy in India",
        "IGRT treatment in India",
        "IGRT cost in India",
        "image-guided radiotherapy India",
        "IGRT for prostate cancer",
        "IGRT for lung cancer",
        "IGRT vs IMRT",
        "IGRT vs SBRT",
      ],
      faqs: [
        {
          id: "ig-faq-1",
          question: "What is IGRT?",
          answer:
            "A radiation technique that uses imaging immediately before or during treatment to verify patient or tumour position.",
        },
        {
          id: "ig-faq-2",
          question: "Is IGRT the same as IMRT?",
          answer:
            "No. IMRT is dose modulation. IGRT is image guidance. They are often used together.",
        },
        {
          id: "ig-faq-3",
          question: "How much does IGRT cost in India?",
          answer:
            "GAF Healthcare planning is $7,200–$16,000, typically 4–7 weeks of fractions. US comparison is $20,000–$45,000.",
        },
        {
          id: "ig-faq-4",
          question: "How many sessions are needed?",
          answer:
            "It varies. Conventional lists may last several weeks. Selected stereotactic lists are shorter.",
        },
        {
          id: "ig-faq-5",
          question: "Is IGRT painful?",
          answer: "Imaging and beam-on are generally painless. Immobilization can be uncomfortable.",
        },
        {
          id: "ig-faq-6",
          question: "Does IGRT require hospitalization?",
          answer: "Usually no. Most IGRT is outpatient.",
        },
        {
          id: "ig-faq-7",
          question: "Is IGRT always better than setup imaging alone?",
          answer: "No. Motion, margins and the named plan decide the imaging protocol.",
        },
        {
          id: "ig-faq-8",
          question: "Can IGRT be combined with chemotherapy?",
          answer: "Yes, when the cancer protocol uses concurrent chemoradiation.",
        },
        {
          id: "ig-faq-9",
          question: "Does IGRT make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "ig-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Inability to swallow fluids, chest pain, severe shortness of breath, uncontrolled bleeding, high fever or fainting belongs in a local emergency department.",
        },
        {
          id: "ig-faq-11",
          question: "Which city in India is right for IGRT?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "ig-faq-12",
          question: "Can international patients get IGRT in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of image-guided radiotherapy aligning a tumour target before beam delivery",
      seoTitle: "IGRT in India: Cost, Procedure, Benefits & Side Effects",
      metaDescription:
        "Learn about IGRT in India, including treatment process, cost, imaging methods, benefits, side effects, duration, and IGRT vs IMRT, VMAT and SBRT.",
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

for (const slug of [EBRT, IMRT, BREAST, PROSTATE, CERVICAL, COLON, PANCREAS, LYMPHOMA, BRAIN, SPINE]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [IMRT in India](https://gaf.healthcare/treatments/intensity-modulated-radiation-therapy-in-india).",
    ", [IMRT in India](https://gaf.healthcare/treatments/intensity-modulated-radiation-therapy-in-india) and [IGRT in India](https://gaf.healthcare/treatments/image-guided-radiation-therapy-in-india).",
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
patchMarkdown(resolve("scripts/imrt-treatment-body.md"));
