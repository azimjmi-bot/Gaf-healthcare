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

const body = readFileSync(resolve("scripts/gamma-knife-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "gamma-knife-surgery-in-india");
const now = "2026-10-02T20:00:00.000Z";
const SLUG = "gamma-knife-surgery-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const SRS = "stereotactic-radiosurgery-in-india";
const SBRT = "stereotactic-body-radiation-therapy-sbrt-in-india";
const CYBERKNIFE = "cyberknife-robotic-radiosurgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const PITUITARY = "pituitary-tumor-surgery-in-india";
const ENDOSCOPIC = "endoscopic-brain-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const LINK =
  " Named Gamma Knife lists sit on [Gamma Knife Surgery in India](/treatments/gamma-knife-surgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF VMAT, Gamma Knife-only or proton-only treatment page.",
    `There is no live GAF VMAT or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, Gamma Knife-only, lung-cancer, liver-cancer or proton-only treatment page.",
    `There is no live GAF VMAT, lung-cancer, liver-cancer or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, Gamma Knife-only, lung-cancer, liver-cancer, head-and-neck-cancer or proton-only treatment page.",
    `There is no live GAF VMAT, lung-cancer, liver-cancer, head-and-neck-cancer or proton-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF Gamma Knife-only treatment page.",
    `Named Gamma Knife lists sit on [Gamma Knife Surgery in India](/treatments/gamma-knife-surgery-in-india).`,
  ],
  [
    "Named CyberKnife lists sit on [CyberKnife Robotic Radiosurgery in India](/treatments/cyberknife-robotic-radiosurgery-in-india).",
    `Named CyberKnife lists sit on [CyberKnife Robotic Radiosurgery in India](/treatments/cyberknife-robotic-radiosurgery-in-india). Named Gamma Knife lists sit on [Gamma Knife Surgery in India](/treatments/gamma-knife-surgery-in-india).`,
  ],
];

const treatment = {
  id: existing?.id ?? "c9d0e4a3-6e82-1d73-e30f-9a4b7d0e3c58",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Gamma Knife Surgery in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "Gamma Knife",
  category: "Gamma Knife",
  image: "/uploads/treatments/gk-hero.webp",
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
    "gamma-knife",
    "stereotactic-radiosurgery-srs",
    "cyberknife",
    "stereotactic-body-radiotherapy-sbrt",
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
    CYBERKNIFE,
    BRAIN,
    CRANIOTOMY,
    PITUITARY,
    ENDOSCOPIC,
    SPINE,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 77,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Gamma Knife Surgery in India",
      shortDescription:
        "Gamma Knife in India is a dedicated intracranial radiosurgery platform that can deliver named SRS, not a machine brochure. GAF planning is $10,500–$22,000, typically 1 session.",
      editorialBody: body,
      process: [
        {
          id: "gk-step-1",
          title: "Share records",
          description:
            "The patient provides MRI, pathology and any previous radiation plan before anyone books travel.",
        },
        {
          id: "gk-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist and neurosurgeon review whether Gamma Knife, LINAC SRS, CyberKnife, surgery or no India list is the honest product.",
        },
        {
          id: "gk-step-3",
          title: "Confirm the platform",
          description:
            "The team writes Gamma Knife only after lesion size, location, previous dose and campus availability are reviewed.",
        },
        {
          id: "gk-step-4",
          title: "Itemized estimate",
          description:
            "GAF Gamma Knife planning is $10,500–$22,000. Neighbouring SRS is $8,500–$18,000 and CyberKnife is $11,000–$24,000 when those products are named instead.",
        },
        {
          id: "gk-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute neurological change is a local emergency.",
        },
        {
          id: "gk-step-6",
          title: "MRI, frame or mask",
          description: "Planning MRI and immobilisation checks are repeated after arrival.",
        },
        {
          id: "gk-step-7",
          title: "Deliver the named Gamma Knife course",
          description: "Image-verified fractions proceed only after physics QA.",
        },
        {
          id: "gk-step-8",
          title: "Observation",
          description: "Headache, steroids and seizure risk are watched before discharge.",
        },
        {
          id: "gk-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share MRI, pathology and any previous radiation dose so the team can judge Gamma Knife versus LINAC SRS, CyberKnife, surgery or whole-brain radiation.",
      recovery:
        "Most Gamma Knife lists are day-care. Fatigue or delayed swelling can follow. GAF planning is typically 1 session.",
      hospitalStay: "Usually outpatient or day-care. Typical course 1 session.",
      recoveryPeriod:
        "Many patients resume usual activity quickly. Imaging follow-up continues for months.",
      followUp:
        "Request a written summary covering lesion, dose, frame versus mask, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "Gamma Knife is a dedicated intracranial radiosurgery platform, not open surgery. GAF planning is $10,500–$22,000. Sudden severe headache, new weakness or seizure belongs in a local emergency department.",
      treatmentType: "Gamma Knife / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "Cobalt-based intracranial SRS, neighbouring LINAC SRS, CyberKnife, IGRT, IMRT and proton sheets",
      searchKeywords: [
        "Gamma Knife Surgery in India",
        "Gamma Knife treatment in India",
        "Gamma Knife radiosurgery in India",
        "Gamma Knife cost in India",
        "Gamma Knife surgery cost in India",
        "Gamma Knife treatment cost",
        "Gamma Knife for brain tumor",
        "Gamma Knife for brain metastases",
        "Gamma Knife for meningioma",
        "Gamma Knife for acoustic neuroma",
        "Gamma Knife for trigeminal neuralgia",
        "Gamma Knife hospitals in India",
        "Gamma Knife doctors in India",
        "stereotactic radiosurgery in India",
        "Gamma Knife vs CyberKnife",
        "Gamma Knife vs LINAC",
      ],
      faqs: [
        {
          id: "gk-faq-1",
          question: "What is Gamma Knife radiosurgery?",
          answer:
            "A highly focused radiation treatment for selected conditions inside the brain. It does not involve cutting into the skull. Treatment is commonly completed in one session, although some patients require staged or fractionated treatment.",
        },
        {
          id: "gk-faq-2",
          question: "Is Gamma Knife a surgery?",
          answer: "No. It is radiosurgery. There is no incision and no craniotomy.",
        },
        {
          id: "gk-faq-3",
          question: "How much does Gamma Knife cost in India?",
          answer:
            "GAF Healthcare planning is $10,500–$22,000, typically 1 session. US comparison is $28,000–$65,000.",
        },
        {
          id: "gk-faq-4",
          question: "How many sessions are needed?",
          answer: "Often one. Selected cases may require staged or fractionated sessions.",
        },
        {
          id: "gk-faq-5",
          question: "Does Gamma Knife hurt?",
          answer:
            "The radiation itself is not painful. Frame-based treatment may cause pressure or temporary discomfort at pin sites.",
        },
        {
          id: "gk-faq-6",
          question: "Does it require anaesthesia?",
          answer: "Usually no general anaesthesia. Local anaesthesia may be used for a stereotactic frame.",
        },
        {
          id: "gk-faq-7",
          question: "Is Gamma Knife better than CyberKnife?",
          answer:
            "Neither is universally better. Location, size, previous treatment and the plan that can be safely achieved decide.",
        },
        {
          id: "gk-faq-8",
          question: "Can Gamma Knife treat body tumours?",
          answer: "No. It is primarily an intracranial platform. Extra-cranial lists sit on SBRT or CyberKnife.",
        },
        {
          id: "gk-faq-9",
          question: "Does Gamma Knife make you radioactive?",
          answer: "No. The machine does not leave a radioactive source inside the body.",
        },
        {
          id: "gk-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe headache, new weakness, seizure, loss of consciousness, high fever or uncontrolled vomiting belongs in a local emergency department.",
        },
        {
          id: "gk-faq-11",
          question: "Which city in India is right for Gamma Knife?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "gk-faq-12",
          question: "Can international patients get Gamma Knife in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of many focused gamma beams converging on a small intracranial target",
      seoTitle: "Gamma Knife Surgery in India: Cost, Procedure, Benefits & Risks",
      metaDescription:
        "Learn about Gamma Knife Surgery in India, including cost, procedure, recovery, risks, conditions treated, hospitals, eligibility and Gamma Knife vs other radiosurgery options.",
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
  if (!editorial) return;
  if (!editorial.includes(`/treatments/${SLUG}`)) {
    for (const [needle, replacement] of REPLACEMENTS) {
      if (editorial.includes(`/treatments/${SLUG}`)) break;
      if (editorial.includes(needle)) {
        editorial = editorial.replaceAll(needle, replacement);
      }
    }
    row.translations!.en!.editorialBody = editorial;
  }
}

for (const slug of [
  EBRT,
  IMRT,
  IGRT,
  SRS,
  SBRT,
  CYBERKNIFE,
  BRAIN,
  CRANIOTOMY,
  PITUITARY,
  ENDOSCOPIC,
  SPINE,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [CyberKnife robotic radiosurgery in India](https://gaf.healthcare/treatments/cyberknife-robotic-radiosurgery-in-india).",
    ", [CyberKnife robotic radiosurgery in India](https://gaf.healthcare/treatments/cyberknife-robotic-radiosurgery-in-india) and [Gamma Knife surgery in India](https://gaf.healthcare/treatments/gamma-knife-surgery-in-india).",
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
    if (text.includes(`/treatments/${SLUG}`)) break;
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
patchMarkdown(resolve("scripts/cyberknife-treatment-body.md"));
