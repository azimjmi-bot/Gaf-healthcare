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

const body = readFileSync(resolve("scripts/brachytherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "brachytherapy-in-india");
const now = "2026-10-02T22:00:00.000Z";
const SLUG = "brachytherapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const SRS = "stereotactic-radiosurgery-in-india";
const SBRT = "stereotactic-body-radiation-therapy-sbrt-in-india";
const CYBERKNIFE = "cyberknife-robotic-radiosurgery-in-india";
const GAMMA_KNIFE = "gamma-knife-surgery-in-india";
const PROTON = "proton-beam-therapy-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const LINK =
  " Named brachytherapy lists sit on [Brachytherapy in India](/treatments/brachytherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Named proton lists sit on [Proton Beam Therapy in India](/treatments/proton-beam-therapy-in-india).",
    `Named proton lists sit on [Proton Beam Therapy in India](/treatments/proton-beam-therapy-in-india).${LINK}`,
  ],
  [
    "It is **not** open surgery, brachytherapy, SBRT or a universal upgrade from IMRT.",
    `It is **not** open surgery, brachytherapy, SBRT or a universal upgrade from IMRT.${LINK}`,
  ],
  [
    "[brachytherapy](/costs/India/Radiation-Oncology/Brachytherapy)",
    "[brachytherapy](/costs/India/Radiation-Oncology/Brachytherapy) ([Brachytherapy in India](/treatments/brachytherapy-in-india))",
  ],
];

const treatment = {
  id: existing?.id ?? "e1f2a6c5-8a04-3f95-0521-1c6d9f205e7a",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Brachytherapy in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "Brachytherapy",
  category: "Brachytherapy",
  image: "/uploads/treatments/bt-hero.webp",
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
    "brachytherapy",
    "intracavitary-brachytherapy",
    "interstitial-brachytherapy",
    "plaque-brachytherapy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "proton-beam-therapy",
  ],
  relatedTreatmentSlugs: [
    EBRT,
    IMRT,
    IGRT,
    SRS,
    SBRT,
    CYBERKNIFE,
    GAMMA_KNIFE,
    PROTON,
    CERVICAL,
    PROSTATE,
    BREAST,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 79,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Brachytherapy in India",
      shortDescription:
        "Brachytherapy in India is a named internal-radiation implant product, not a machine brochure. GAF planning is $5,500–$13,000, typically 1–7 nights.",
      editorialBody: body,
      process: [
        {
          id: "bt-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and any previous radiation plan before anyone books travel.",
        },
        {
          id: "bt-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist reviews whether brachytherapy, EBRT, both, surgery, systemic therapy or no India list is the honest product.",
        },
        {
          id: "bt-step-3",
          title: "Name the applicator",
          description:
            "The team writes HDR versus LDR, intracavitary, interstitial or plaque only after anatomy and previous dose are reviewed.",
        },
        {
          id: "bt-step-4",
          title: "Itemized estimate",
          description:
            "GAF brachytherapy planning is $5,500–$13,000. Neighbouring EBRT is $1,000–$6,000+ when an external-beam course is a separate letter.",
        },
        {
          id: "bt-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute bleeding or fever is a local emergency.",
        },
        {
          id: "bt-step-6",
          title: "Placement and imaging",
          description: "Applicator or implant placement, planning imaging and physics QA are repeated after arrival.",
        },
        {
          id: "bt-step-7",
          title: "Deliver the named implant course",
          description: "Source dwell proceeds only after the approved plan. Further insertions follow the written calendar.",
        },
        {
          id: "bt-step-8",
          title: "Observation",
          description: "Bleeding, pain, urinary retention and infection signs are watched before discharge.",
        },
        {
          id: "bt-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with an implant record and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share pathology, imaging and any previous radiation dose so the team can judge brachytherapy versus EBRT, both, surgery or no India list.",
      recovery:
        "Stay depends on the implant. Cramping, spotting or urinary symptoms can follow. GAF planning is typically 1–7 nights.",
      hospitalStay: "Day-care or short stay. Typical course 1–7 nights.",
      recoveryPeriod:
        "Some patients resume usual activity in a few days. Combined EBRT lengthens the overall calendar.",
      followUp:
        "Request a written summary covering applicator, HDR versus LDR, insertion count, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "Brachytherapy is an implant product, not a linac fraction. GAF planning is $5,500–$13,000. Heavy bleeding, high fever, urinary retention or severe pelvic pain belongs in a local emergency department.",
      treatmentType: "Brachytherapy / Radiation Oncology",
      treatmentSetting: "Accredited partner radiation oncology bunkers in India",
      technology: "HDR/LDR afterloader and applicator systems, neighbouring EBRT, IMRT, IGRT and proton sheets",
      searchKeywords: [
        "Brachytherapy in India",
        "brachytherapy treatment in India",
        "brachytherapy cost in India",
        "HDR brachytherapy in India",
        "LDR brachytherapy in India",
        "internal radiation therapy in India",
        "brachytherapy for cervical cancer",
        "brachytherapy for prostate cancer",
        "brachytherapy for breast cancer",
        "intracavitary brachytherapy",
        "interstitial brachytherapy",
        "brachytherapy hospitals in India",
        "brachytherapy vs external beam radiation",
      ],
      faqs: [
        {
          id: "bt-faq-1",
          question: "What is brachytherapy?",
          answer:
            "Targeted internal radiation therapy. A source is placed inside or next to the tumour so dose can be delivered directly to the treatment area.",
        },
        {
          id: "bt-faq-2",
          question: "How much does brachytherapy cost in India?",
          answer:
            "GAF Healthcare planning is $5,500–$13,000, typically 1–7 nights. US comparison is $15,000–$35,000.",
        },
        {
          id: "bt-faq-3",
          question: "Is brachytherapy better than external beam radiation?",
          answer:
            "Neither is universally better. The appropriate approach depends on the cancer. In some lists, including many cervical plans, both are used together.",
        },
        {
          id: "bt-faq-4",
          question: "Is brachytherapy painful?",
          answer:
            "Placement can cause discomfort. Anaesthesia or sedation is used according to the procedure.",
        },
        {
          id: "bt-faq-5",
          question: "How many sessions are required?",
          answer: "Some patients have a single implant. Others need several fractions over days or weeks.",
        },
        {
          id: "bt-faq-6",
          question: "Are you radioactive after brachytherapy?",
          answer:
            "Temporary HDR: the source is removed. Permanent seeds remain; follow the written radiation-safety instructions.",
        },
        {
          id: "bt-faq-7",
          question: "Can brachytherapy be combined with chemotherapy?",
          answer: "Yes, when the cancer protocol requires it. The sequence is a clinical decision.",
        },
        {
          id: "bt-faq-8",
          question: "Can it affect fertility?",
          answer:
            "It can, depending on site and dose. Discuss preservation before treatment if future pregnancy matters.",
        },
        {
          id: "bt-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Heavy bleeding, high fever, inability to pass urine, severe pelvic pain or uncontrolled vomiting belongs in a local emergency department.",
        },
        {
          id: "bt-faq-10",
          question: "Which city in India is right for brachytherapy?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can place the named applicator.",
        },
        {
          id: "bt-faq-11",
          question: "Can international patients get brachytherapy in India?",
          answer: "Yes, after records review, a named list, an itemized estimate and an insertion-calendar travel plan.",
        },
        {
          id: "bt-faq-12",
          question: "Does every radiation hospital offer every implant?",
          answer:
            "No. A centre may have a linac without every applicator or every disease-specific implant. Ask about this cancer and this technique.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of an internal radiation source placed next to a target with a short-range dose cloud",
      seoTitle: "Brachytherapy in India: Cost, Types, Procedure, Benefits & Risks",
      metaDescription:
        "Learn about brachytherapy in India, including HDR and LDR techniques, cost, procedure, recovery, risks, cervical and prostate uses, and how it compares with external beam radiation.",
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
  GAMMA_KNIFE,
  PROTON,
  CERVICAL,
  PROSTATE,
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
    "and [Proton beam therapy in India](https://gaf.healthcare/treatments/proton-beam-therapy-in-india).",
    ", [Proton beam therapy in India](https://gaf.healthcare/treatments/proton-beam-therapy-in-india) and [Brachytherapy in India](https://gaf.healthcare/treatments/brachytherapy-in-india).",
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
patchMarkdown(resolve("scripts/gamma-knife-treatment-body.md"));
patchMarkdown(resolve("scripts/proton-treatment-body.md"));
