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

const body = readFileSync(resolve("scripts/srs-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "stereotactic-radiosurgery-in-india");
const now = "2026-10-02T17:00:00.000Z";
const SLUG = "stereotactic-radiosurgery-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const PITUITARY = "pituitary-tumor-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const LINK =
  " Named SRS lists sit on [Stereotactic Radiosurgery in India](/treatments/stereotactic-radiosurgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF VMAT, SBRT or proton-only treatment page.",
    `There is no live GAF VMAT, SBRT or proton-only treatment page.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "f6a7b1d0-3b59-8a40-b07f-6d1e4a7b0f25",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Stereotactic Radiosurgery (SRS) in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "SRS",
  category: "Stereotactic Radiosurgery (SRS)",
  image: "/uploads/treatments/sr-hero.webp",
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
    "stereotactic-radiosurgery-srs",
    "stereotactic-body-radiotherapy-sbrt",
    "gamma-knife",
    "cyberknife",
    "image-guided-radiotherapy-igrt",
    "intensity-modulated-radiotherapy-imrt",
    "external-beam-radiotherapy-ebrt",
    "proton-beam-therapy",
  ],
  relatedTreatmentSlugs: [EBRT, IMRT, IGRT, BRAIN, CRANIOTOMY, PITUITARY, SPINE],
  status: "published" as const,
  featured: true,
  sortOrder: 74,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Stereotactic Radiosurgery (SRS) in India",
      shortDescription:
        "SRS in India is named after lesion volume, location and previous dose, not a machine brochure. GAF planning is $8,500–$18,000, typically 1–5 sessions.",
      editorialBody: body,
      process: [
        {
          id: "sr-step-1",
          title: "Share records",
          description:
            "The patient provides MRI, pathology and any previous radiation plan before anyone books travel.",
        },
        {
          id: "sr-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist, and often a neurosurgeon, reviews whether SRS, surgery, whole-brain radiation or no India list is the honest product.",
        },
        {
          id: "sr-step-3",
          title: "Name the platform",
          description:
            "The team writes SRS only after lesion volume, location and previous dose are reviewed.",
        },
        {
          id: "sr-step-4",
          title: "Itemized estimate",
          description:
            "GAF SRS planning is $8,500–$18,000. Neighbouring Gamma Knife is $10,500–$22,000 when that platform is the named product.",
        },
        {
          id: "sr-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Mass effect with drowsiness or uncontrolled seizure is a local emergency.",
        },
        {
          id: "sr-step-6",
          title: "Imaging and immobilization",
          description: "MRI, CT planning and a frame or mask are repeated after arrival.",
        },
        {
          id: "sr-step-7",
          title: "Deliver the named SRS course",
          description: "Single-fraction or fractionated stereotactic delivery proceeds only after physics QA.",
        },
        {
          id: "sr-step-8",
          title: "Observation",
          description: "Headache, swelling and steroid need are watched before discharge.",
        },
        {
          id: "sr-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with a steroid or seizure plan, MRI timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share MRI, pathology and any previous radiation dose so the team can judge SRS versus surgery, whole-brain radiation or fractionated EBRT.",
      recovery:
        "Most SRS is outpatient. Fatigue, headache or swelling can follow. GAF planning is 1–5 sessions.",
      hospitalStay: "Usually outpatient. Typical course 1–5 sessions.",
      recoveryPeriod:
        "Many patients resume usual activity quickly. Imaging follow-up continues for months.",
      followUp:
        "Request a written summary covering technique, platform, dose, fractions, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "SRS is focused radiation, not open surgery. GAF planning is $8,500–$18,000. Sudden severe headache, seizure, new weakness or loss of consciousness belongs in a local emergency department.",
      treatmentType: "SRS / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "LINAC-based SRS, neighbouring Gamma Knife, CyberKnife, IGRT, SBRT and proton sheets",
      searchKeywords: [
        "Stereotactic Radiosurgery in India",
        "SRS treatment in India",
        "SRS cost in India",
        "Gamma Knife in India",
        "SRS for brain metastases",
        "SRS vs surgery",
        "SRS vs whole-brain radiation",
        "CyberKnife radiosurgery India",
      ],
      faqs: [
        {
          id: "sr-faq-1",
          question: "What is SRS?",
          answer:
            "A highly focused radiation treatment that delivers a high dose to a precisely defined target without conventional surgery.",
        },
        {
          id: "sr-faq-2",
          question: "Is SRS the same as Gamma Knife?",
          answer:
            "No. Gamma Knife is one technology used to deliver stereotactic radiosurgery.",
        },
        {
          id: "sr-faq-3",
          question: "How much does SRS cost in India?",
          answer:
            "GAF Healthcare planning is $8,500–$18,000, typically 1–5 sessions. US comparison is $25,000–$55,000.",
        },
        {
          id: "sr-faq-4",
          question: "How many sessions are needed?",
          answer:
            "Some patients need one session. Others need 3–5 fractions or a different schedule.",
        },
        {
          id: "sr-faq-5",
          question: "Is SRS painful?",
          answer: "Beam-on is generally not felt. A frame or mask can be uncomfortable.",
        },
        {
          id: "sr-faq-6",
          question: "Does SRS require hospitalization?",
          answer: "Usually no. Many SRS lists are outpatient.",
        },
        {
          id: "sr-faq-7",
          question: "Does SRS involve cutting the skull?",
          answer: "No. There is no conventional incision.",
        },
        {
          id: "sr-faq-8",
          question: "Can SRS treat multiple brain metastases?",
          answer:
            "Yes, in selected patients. Total volume, location and extracranial disease matter more than lesion count alone.",
        },
        {
          id: "sr-faq-9",
          question: "Does SRS make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "sr-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe headache, new weakness, seizure, loss of consciousness, high fever or uncontrolled vomiting belongs in a local emergency department.",
        },
        {
          id: "sr-faq-11",
          question: "Which city in India is right for SRS?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "sr-faq-12",
          question: "Can international patients get SRS in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of stereotactic radiosurgery beams converging on a small intracranial target",
      seoTitle: "SRS in India: Cost, Procedure, Benefits & Side Effects",
      metaDescription:
        "Learn about stereotactic radiosurgery in India, including cost, Gamma Knife and LINAC platforms, brain metastases, side effects, duration and how to choose a centre.",
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

for (const slug of [EBRT, IMRT, IGRT, BRAIN, CRANIOTOMY, PITUITARY, SPINE]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [IGRT in India](https://gaf.healthcare/treatments/image-guided-radiation-therapy-in-india).",
    ", [IGRT in India](https://gaf.healthcare/treatments/image-guided-radiation-therapy-in-india) and [stereotactic radiosurgery in India](https://gaf.healthcare/treatments/stereotactic-radiosurgery-in-india).",
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
