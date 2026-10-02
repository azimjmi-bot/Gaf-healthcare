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

const body = readFileSync(resolve("scripts/sbrt-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find(
  (row) => row.slug === "stereotactic-body-radiation-therapy-sbrt-in-india",
);
const now = "2026-10-02T18:00:00.000Z";
const SLUG = "stereotactic-body-radiation-therapy-sbrt-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const SRS = "stereotactic-radiosurgery-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const PROSTATECTOMY = "radical-prostatectomy-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const NEPHRECTOMY = "radical-nephrectomy-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const COLON = "colon-cancer-treatment-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const LINK =
  " Named SBRT lists sit on [SBRT in India](/treatments/stereotactic-body-radiation-therapy-sbrt-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF VMAT, SBRT, Gamma Knife-only, CyberKnife-only or proton-only treatment page.",
    `There is no live GAF VMAT, Gamma Knife-only, CyberKnife-only or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, SBRT or proton-only treatment page.",
    `There is no live GAF VMAT or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF SBRT treatment page.",
    `Named extra-cranial stereotactic lists sit on [SBRT in India](/treatments/stereotactic-body-radiation-therapy-sbrt-in-india).`,
  ],
];

const treatment = {
  id: existing?.id ?? "a7b8c2e1-4c60-9b51-c18d-7e2f5b8c1a36",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Stereotactic Body Radiation Therapy (SBRT) in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "SBRT",
  category: "Stereotactic Body Radiotherapy (SBRT)",
  image: "/uploads/treatments/sb-hero.webp",
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
    "stereotactic-body-radiotherapy-sbrt",
    "stereotactic-radiosurgery-srs",
    "image-guided-radiotherapy-igrt",
    "intensity-modulated-radiotherapy-imrt",
    "external-beam-radiotherapy-ebrt",
    "cyberknife",
    "proton-beam-therapy",
  ],
  relatedTreatmentSlugs: [
    EBRT,
    IMRT,
    IGRT,
    SRS,
    PROSTATE,
    PROSTATECTOMY,
    PANCREAS,
    NEPHRECTOMY,
    SPINE,
    COLON,
    BREAST,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 75,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Stereotactic Body Radiation Therapy (SBRT) in India",
      shortDescription:
        "SBRT in India is named after tumour site, size, motion and previous dose, not a machine brochure. GAF planning is $8,000–$17,500, typically 1–5 sessions.",
      editorialBody: body,
      process: [
        {
          id: "sb-step-1",
          title: "Share records",
          description:
            "The patient provides imaging, pathology and any previous radiation plan before anyone books travel.",
        },
        {
          id: "sb-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist reviews whether SBRT, surgery, conventional EBRT or no India list is the honest product.",
        },
        {
          id: "sb-step-3",
          title: "Name the SBRT list",
          description:
            "The team writes SBRT only after site, size, motion and previous dose are reviewed.",
        },
        {
          id: "sb-step-4",
          title: "Itemized estimate",
          description:
            "GAF SBRT planning is $8,000–$17,500. Neighbouring CyberKnife is $11,000–$24,000 when that platform is the named product.",
        },
        {
          id: "sb-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Cord compression or severe breathlessness is a local emergency.",
        },
        {
          id: "sb-step-6",
          title: "Simulation and motion check",
          description: "Planning CT, immobilization and motion assessment are repeated after arrival.",
        },
        {
          id: "sb-step-7",
          title: "Deliver the named SBRT course",
          description: "Image-guided fractions proceed only after physics QA.",
        },
        {
          id: "sb-step-8",
          title: "Observation",
          description: "Site-specific effects and medicines are watched before discharge.",
        },
        {
          id: "sb-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share imaging, pathology and any previous radiation dose so the team can judge SBRT versus surgery, conventional EBRT or IMRT.",
      recovery:
        "Most SBRT is outpatient. Fatigue or site-specific effects can follow. GAF planning is 1–5 sessions.",
      hospitalStay: "Usually outpatient. Typical course 1–5 sessions.",
      recoveryPeriod:
        "Many patients resume usual activity quickly. Imaging follow-up continues for months.",
      followUp:
        "Request a written summary covering site, dose, fractions, motion technique, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "SBRT is focused extra-cranial radiation, not open surgery and not intracranial SRS. GAF planning is $8,000–$17,500. Sudden severe shortness of breath, new weakness or cord-compression symptoms belongs in a local emergency department.",
      treatmentType: "SBRT / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "LINAC-based SBRT, neighbouring IGRT, IMRT, CyberKnife, SRS and proton sheets",
      searchKeywords: [
        "Stereotactic Body Radiation Therapy in India",
        "SBRT in India",
        "SBRT treatment in India",
        "SBRT cost in India",
        "stereotactic radiotherapy India",
        "stereotactic ablative radiotherapy",
        "SABR treatment India",
        "SBRT cancer treatment",
        "SBRT for lung cancer",
        "SBRT for prostate cancer",
        "SBRT for liver cancer",
      ],
      faqs: [
        {
          id: "sb-faq-1",
          question: "What is SBRT?",
          answer:
            "A highly focused external-beam treatment that delivers a high dose to a small, precisely defined body target in a small number of sessions.",
        },
        {
          id: "sb-faq-2",
          question: "Is SBRT the same as SRS?",
          answer: "No. SRS is the intracranial stereotactic product. SBRT is used for selected tumours outside the brain.",
        },
        {
          id: "sb-faq-3",
          question: "How much does SBRT cost in India?",
          answer:
            "GAF Healthcare planning is $8,000–$17,500, typically 1–5 sessions. US comparison is $22,000–$50,000.",
        },
        {
          id: "sb-faq-4",
          question: "How many sessions are needed?",
          answer: "Many lists are 1–5 fractions. The schedule depends on site, size, motion and nearby organs.",
        },
        {
          id: "sb-faq-5",
          question: "Is SBRT painful?",
          answer: "Beam-on is generally not felt. Immobilization or later site-specific effects can be uncomfortable.",
        },
        {
          id: "sb-faq-6",
          question: "Does SBRT require hospitalization?",
          answer: "Usually no. Many SBRT lists are outpatient.",
        },
        {
          id: "sb-faq-7",
          question: "Can SBRT replace surgery?",
          answer: "Only in selected cases. Fitness, stage, site and expected control decide.",
        },
        {
          id: "sb-faq-8",
          question: "Can SBRT treat metastatic cancer?",
          answer:
            "Selected limited deposits may be treated. It is not a stand-alone cure for extensive metastatic disease.",
        },
        {
          id: "sb-faq-9",
          question: "Does SBRT make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "sb-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe shortness of breath, new weakness, loss of bladder or bowel control, high fever or uncontrolled bleeding belongs in a local emergency department.",
        },
        {
          id: "sb-faq-11",
          question: "Which city in India is right for SBRT?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "sb-faq-12",
          question: "Can international patients get SBRT in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of stereotactic body radiation beams converging on a small extra-cranial target",
      seoTitle: "Stereotactic Body Radiation Therapy (SBRT) in India – Cost, Procedure, Benefits & Risks",
      metaDescription:
        "Learn about SBRT in India, including cost, eligibility, procedure, treatment duration, side effects, cancer types treated, technology, recovery and how to choose a specialist.",
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

for (const slug of [
  EBRT,
  IMRT,
  IGRT,
  SRS,
  PROSTATE,
  PROSTATECTOMY,
  PANCREAS,
  NEPHRECTOMY,
  SPINE,
  COLON,
  BREAST,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [stereotactic radiosurgery in India](https://gaf.healthcare/treatments/stereotactic-radiosurgery-in-india).",
    ", [stereotactic radiosurgery in India](https://gaf.healthcare/treatments/stereotactic-radiosurgery-in-india) and [SBRT in India](https://gaf.healthcare/treatments/stereotactic-body-radiation-therapy-sbrt-in-india).",
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
patchMarkdown(resolve("scripts/igrt-treatment-body.md"));
patchMarkdown(resolve("scripts/srs-treatment-body.md"));
