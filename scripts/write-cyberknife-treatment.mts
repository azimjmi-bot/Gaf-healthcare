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

const body = readFileSync(resolve("scripts/cyberknife-treatment-body.md"), "utf8").trim();
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
  (row) => row.slug === "cyberknife-robotic-radiosurgery-in-india",
);
const now = "2026-10-02T19:00:00.000Z";
const SLUG = "cyberknife-robotic-radiosurgery-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const SRS = "stereotactic-radiosurgery-in-india";
const SBRT = "stereotactic-body-radiation-therapy-sbrt-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const PITUITARY = "pituitary-tumor-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const PROSTATECTOMY = "radical-prostatectomy-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const NEPHRECTOMY = "radical-nephrectomy-in-india";
const COLON = "colon-cancer-treatment-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const LINK =
  " Named CyberKnife lists sit on [CyberKnife Robotic Radiosurgery in India](/treatments/cyberknife-robotic-radiosurgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF VMAT, Gamma Knife-only, CyberKnife-only or proton-only treatment page.",
    `There is no live GAF VMAT, Gamma Knife-only or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, Gamma Knife-only, CyberKnife-only, lung-cancer, liver-cancer or proton-only treatment page.",
    `There is no live GAF VMAT, Gamma Knife-only, lung-cancer, liver-cancer or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF CyberKnife-only treatment page.",
    `Named CyberKnife lists sit on [CyberKnife Robotic Radiosurgery in India](/treatments/cyberknife-robotic-radiosurgery-in-india).`,
  ],
  [
    "Named SRS lists sit on [Stereotactic Radiosurgery in India](/treatments/stereotactic-radiosurgery-in-india).",
    `Named SRS lists sit on [Stereotactic Radiosurgery in India](/treatments/stereotactic-radiosurgery-in-india). Named CyberKnife lists sit on [CyberKnife Robotic Radiosurgery in India](/treatments/cyberknife-robotic-radiosurgery-in-india).`,
  ],
];

const treatment = {
  id: existing?.id ?? "b8c9d3f2-5d71-0c62-d29e-8f3a6c9d2b47",
  slug: SLUG,
  previousSlugs: [],
  baseName: "CyberKnife Robotic Radiosurgery in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "CyberKnife",
  category: "CyberKnife",
  image: "/uploads/treatments/ck-hero.webp",
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
    "cyberknife",
    "stereotactic-radiosurgery-srs",
    "stereotactic-body-radiotherapy-sbrt",
    "gamma-knife",
    "image-guided-radiotherapy-igrt",
    "intensity-modulated-radiotherapy-imrt",
    "external-beam-radiotherapy-ebrt",
    "proton-beam-therapy",
  ],
  relatedTreatmentSlugs: [
    EBRT,
    IMRT,
    IGRT,
    SRS,
    SBRT,
    BRAIN,
    CRANIOTOMY,
    PITUITARY,
    SPINE,
    PROSTATE,
    PROSTATECTOMY,
    PANCREAS,
    NEPHRECTOMY,
    COLON,
    BREAST,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 76,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "CyberKnife Robotic Radiosurgery in India",
      shortDescription:
        "CyberKnife in India is a robotic platform that can deliver named SRS or SBRT, not a machine brochure. GAF planning is $11,000–$24,000, typically 1–5 sessions.",
      editorialBody: body,
      process: [
        {
          id: "ck-step-1",
          title: "Share records",
          description:
            "The patient provides imaging, pathology and any previous radiation plan before anyone books travel.",
        },
        {
          id: "ck-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist reviews whether CyberKnife, SRS, SBRT, surgery, conventional EBRT or no India list is the honest product.",
        },
        {
          id: "ck-step-3",
          title: "Confirm the platform",
          description:
            "The team writes CyberKnife only after site, size, motion, previous dose and campus availability are reviewed.",
        },
        {
          id: "ck-step-4",
          title: "Itemized estimate",
          description:
            "GAF CyberKnife planning is $11,000–$24,000. Neighbouring SRS is $8,500–$18,000 and SBRT is $8,000–$17,500 when those products are named instead.",
        },
        {
          id: "ck-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Cord compression or acute neurological change is a local emergency.",
        },
        {
          id: "ck-step-6",
          title: "Simulation and tracking check",
          description: "Planning CT, frameless immobilisation and image-guidance checks are repeated after arrival.",
        },
        {
          id: "ck-step-7",
          title: "Deliver the named CyberKnife course",
          description: "Robotic, image-guided fractions proceed only after physics QA.",
        },
        {
          id: "ck-step-8",
          title: "Observation",
          description: "Site-specific effects and medicines are watched before discharge.",
        },
        {
          id: "ck-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share imaging, pathology and any previous radiation dose so the team can judge CyberKnife versus SRS, SBRT, surgery or conventional EBRT.",
      recovery:
        "Most CyberKnife lists are outpatient. Fatigue or site-specific effects can follow. GAF planning is 1–5 sessions.",
      hospitalStay: "Usually outpatient. Typical course 1–5 sessions.",
      recoveryPeriod:
        "Many patients resume usual activity quickly. Imaging follow-up continues for months.",
      followUp:
        "Request a written summary covering site, dose, fractions, tracking technique, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "CyberKnife is a robotic stereotactic platform, not open surgery. GAF planning is $11,000–$24,000. Sudden severe headache, new weakness or cord-compression symptoms belongs in a local emergency department.",
      treatmentType: "CyberKnife / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "Robotic LINAC-based SRS/SBRT, neighbouring IGRT, IMRT, Gamma Knife, SRS, SBRT and proton sheets",
      searchKeywords: [
        "CyberKnife Robotic Radiosurgery in India",
        "CyberKnife treatment in India",
        "CyberKnife cost in India",
        "CyberKnife surgery in India",
        "CyberKnife radiation treatment",
        "CyberKnife radiosurgery",
        "CyberKnife treatment cost",
        "Robotic radiosurgery in India",
        "CyberKnife for brain tumor",
        "CyberKnife for prostate cancer",
        "CyberKnife for lung cancer",
        "CyberKnife for spine tumor",
        "CyberKnife for liver cancer",
        "CyberKnife hospitals in India",
        "CyberKnife treatment for international patients",
      ],
      faqs: [
        {
          id: "ck-faq-1",
          question: "What is CyberKnife?",
          answer:
            "A robotic, image-guided system used to deliver highly focused stereotactic radiation.",
        },
        {
          id: "ck-faq-2",
          question: "Is CyberKnife a surgery?",
          answer: "No. It is a non-invasive radiation treatment and does not require an incision.",
        },
        {
          id: "ck-faq-3",
          question: "How much does CyberKnife cost in India?",
          answer:
            "GAF Healthcare planning is $11,000–$24,000, typically 1–5 sessions. US comparison is $30,000–$70,000.",
        },
        {
          id: "ck-faq-4",
          question: "How many sessions are needed?",
          answer: "Often 1–5 sessions, although the number depends on the tumour and treatment plan.",
        },
        {
          id: "ck-faq-5",
          question: "Does CyberKnife hurt?",
          answer:
            "Radiation itself is not felt. Some patients may experience treatment-related side effects depending on the treated area.",
        },
        {
          id: "ck-faq-6",
          question: "Does it require anaesthesia?",
          answer: "Usually no general anaesthesia is required. Most patients remain awake.",
        },
        {
          id: "ck-faq-7",
          question: "Is CyberKnife better than Gamma Knife?",
          answer:
            "Neither is universally better. Location, size, previous treatment and the plan that can be safely achieved decide.",
        },
        {
          id: "ck-faq-8",
          question: "Can CyberKnife treat metastatic cancer?",
          answer:
            "Selected limited deposits may be treated. It is not a stand-alone cure for extensive metastatic disease.",
        },
        {
          id: "ck-faq-9",
          question: "Does CyberKnife make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "ck-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe headache, new weakness, seizure, loss of bladder or bowel control, severe shortness of breath, high fever or uncontrolled bleeding belongs in a local emergency department.",
        },
        {
          id: "ck-faq-11",
          question: "Which city in India is right for CyberKnife?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "ck-faq-12",
          question: "Can international patients get CyberKnife in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a robotic arm delivering focused stereotactic radiation to a small target",
      seoTitle: "CyberKnife Robotic Radiosurgery in India | Cost, Treatment & Hospitals",
      metaDescription:
        "Learn about CyberKnife robotic radiosurgery in India, including treatment procedure, eligible cancers, sessions, side effects, recovery, cost, benefits and international patient care.",
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
  SBRT,
  BRAIN,
  CRANIOTOMY,
  PITUITARY,
  SPINE,
  PROSTATE,
  PROSTATECTOMY,
  PANCREAS,
  NEPHRECTOMY,
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
    "and [SBRT in India](https://gaf.healthcare/treatments/stereotactic-body-radiation-therapy-sbrt-in-india).",
    ", [SBRT in India](https://gaf.healthcare/treatments/stereotactic-body-radiation-therapy-sbrt-in-india) and [CyberKnife robotic radiosurgery in India](https://gaf.healthcare/treatments/cyberknife-robotic-radiosurgery-in-india).",
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
patchMarkdown(resolve("scripts/sbrt-treatment-body.md"));
