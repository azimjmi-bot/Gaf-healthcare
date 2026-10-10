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

const body = readFileSync(resolve("scripts/proton-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "proton-beam-therapy-in-india");
const now = "2026-10-02T21:00:00.000Z";
const SLUG = "proton-beam-therapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const IMRT = "intensity-modulated-radiation-therapy-in-india";
const IGRT = "image-guided-radiation-therapy-in-india";
const SRS = "stereotactic-radiosurgery-in-india";
const SBRT = "stereotactic-body-radiation-therapy-sbrt-in-india";
const CYBERKNIFE = "cyberknife-robotic-radiosurgery-in-india";
const GAMMA_KNIFE = "gamma-knife-surgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const LINK =
  " Named proton lists sit on [Proton Beam Therapy in India](/treatments/proton-beam-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF VMAT or proton-only treatment page.",
    `There is no live GAF VMAT treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, lung-cancer, liver-cancer or proton-only treatment page.",
    `There is no live GAF VMAT, lung-cancer or liver-cancer treatment page.${LINK}`,
  ],
  [
    "There is no live GAF VMAT, lung-cancer, liver-cancer, head-and-neck-cancer or proton-only treatment page.",
    `There is no live GAF VMAT, lung-cancer, liver-cancer or head-and-neck-cancer treatment page.${LINK}`,
  ],
  [
    "There is no live GAF proton-only treatment page.",
    `Named proton lists sit on [Proton Beam Therapy in India](/treatments/proton-beam-therapy-in-india).`,
  ],
  [
    "Named Gamma Knife lists sit on [Gamma Knife Surgery in India](/treatments/gamma-knife-surgery-in-india).",
    `Named Gamma Knife lists sit on [Gamma Knife Surgery in India](/treatments/gamma-knife-surgery-in-india). Named proton lists sit on [Proton Beam Therapy in India](/treatments/proton-beam-therapy-in-india).`,
  ],
];

const treatment = {
  id: existing?.id ?? "d0e1f5b4-7f93-2e84-f410-0b5c8e1f4d69",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Proton Beam Therapy in India",
  specialtySlug: "radiation-oncology",
  subspecialty: "Proton Beam Therapy",
  category: "Proton Beam Therapy",
  image: "/uploads/treatments/pb-hero.webp",
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
    "proton-beam-therapy",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "external-beam-radiotherapy-ebrt",
    "stereotactic-radiosurgery-srs",
    "stereotactic-body-radiotherapy-sbrt",
    "cyberknife",
    "gamma-knife",
    "brachytherapy",
  ],
  relatedTreatmentSlugs: [
    EBRT,
    IMRT,
    IGRT,
    SRS,
    SBRT,
    CYBERKNIFE,
    GAMMA_KNIFE,
    BRAIN,
    PROSTATE,
    BREAST,
    PANCREAS,
    CERVICAL,
    LYMPHOMA,
    SPINE,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 78,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Proton Beam Therapy in India",
      shortDescription:
        "Proton beam therapy in India is a named Bragg-peak external-beam product, not a machine brochure. GAF planning is $28,000–$55,000, typically 4–8 weeks of fractions.",
      editorialBody: body,
      process: [
        {
          id: "pb-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and any previous radiation plan before anyone books weeks of travel.",
        },
        {
          id: "pb-step-2",
          title: "Multidisciplinary review",
          description:
            "A radiation oncologist reviews whether protons, IMRT, SRS, SBRT, surgery, systemic therapy or no India list is the honest product.",
        },
        {
          id: "pb-step-3",
          title: "Compare proton and photon plans",
          description:
            "The team writes protons only after a meaningful potential advantage is shown against a modern photon plan.",
        },
        {
          id: "pb-step-4",
          title: "Itemized estimate",
          description:
            "GAF proton planning is $28,000–$55,000. Neighbouring IMRT is $6,500–$14,500 when a linac course is the named product instead.",
        },
        {
          id: "pb-step-5",
          title: "Confirm the campus",
          description:
            "Dedicated proton bunkers are limited. Confirm in writing which campus can accept the case before travel.",
        },
        {
          id: "pb-step-6",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute symptoms belong in a local emergency department.",
        },
        {
          id: "pb-step-7",
          title: "Simulation and physics QA",
          description: "Immobilisation, planning imaging and patient-specific quality assurance are repeated after arrival.",
        },
        {
          id: "pb-step-8",
          title: "Deliver the named proton course",
          description: "Weekday fractions proceed only after the approved plan and image-guided positioning.",
        },
        {
          id: "pb-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with imaging timing and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share pathology, imaging and any previous radiation dose so the team can judge protons versus IMRT, SRS, SBRT or no India list.",
      recovery:
        "Proton therapy is usually outpatient. Fatigue and site-specific effects still occur. GAF planning is typically 4–8 weeks of fractions.",
      hospitalStay: "Usually outpatient. Typical course 4–8 weeks of fractions.",
      recoveryPeriod:
        "Site-specific effects can last beyond the last fraction. Imaging follow-up continues for months.",
      followUp:
        "Request a written summary covering site, fractions, organ constraints, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "Proton therapy is a plan-comparison product, not a universal upgrade from IMRT. GAF planning is $28,000–$55,000. Sudden severe shortness of breath, new weakness, seizure, high fever or uncontrolled bleeding belongs in a local emergency department.",
      treatmentType: "Proton Beam Therapy / Radiation Oncology",
      treatmentSetting: "Selected dedicated proton campuses in India",
      technology: "Pencil-beam scanning / IMPT, neighbouring IMRT, IGRT, SRS, SBRT, CyberKnife and Gamma Knife sheets",
      searchKeywords: [
        "Proton Beam Therapy in India",
        "proton therapy in India",
        "proton beam radiation therapy in India",
        "proton therapy cost in India",
        "proton beam therapy cost in India",
        "Bragg peak radiation",
        "pencil-beam scanning proton therapy",
        "IMPT in India",
        "Apollo Proton Cancer Centre",
        "proton therapy Chennai",
        "proton therapy for brain tumours",
        "proton therapy for children",
        "proton vs IMRT",
        "proton therapy hospitals in India",
      ],
      faqs: [
        {
          id: "pb-faq-1",
          question: "What is proton beam therapy?",
          answer:
            "A type of external-beam radiation that uses high-energy protons instead of X-rays. Protons can be planned to deposit most of their dose at a specific depth and then stop.",
        },
        {
          id: "pb-faq-2",
          question: "Where is proton therapy available in India?",
          answer:
            "Dedicated proton treatment sits at selected campuses. A named partner facility is Apollo Proton Cancer Centre in Chennai. Confirm the treating campus in writing.",
        },
        {
          id: "pb-faq-3",
          question: "How much does proton therapy cost in India?",
          answer:
            "GAF Healthcare planning is $28,000–$55,000, typically 4–8 weeks of fractions. US comparison is $90,000–$180,000.",
        },
        {
          id: "pb-faq-4",
          question: "Is proton therapy better than normal radiation?",
          answer:
            "Not automatically. The useful question is whether a proton plan offers a meaningful advantage over a modern photon plan for this patient.",
        },
        {
          id: "pb-faq-5",
          question: "Is proton therapy painful?",
          answer:
            "The beam itself is not felt. Immobilisation or later site-specific effects can be uncomfortable.",
        },
        {
          id: "pb-faq-6",
          question: "Does proton therapy make you radioactive?",
          answer: "No. Patients do not retain radioactivity after external-beam proton treatment.",
        },
        {
          id: "pb-faq-7",
          question: "Can children receive proton therapy?",
          answer:
            "Selected paediatric cancers may be considered. Reducing unnecessary dose to developing tissue can be clinically important. Long-term comparative evidence continues to be studied.",
        },
        {
          id: "pb-faq-8",
          question: "Can proton therapy treat brain or prostate cancer?",
          answer:
            "Selected cases may be considered. Individual planning decides. Prostate comparative evidence remains under development.",
        },
        {
          id: "pb-faq-9",
          question: "Can it be used after previous radiation?",
          answer: "Sometimes. Re-irradiation needs the previous plan and organ doses.",
        },
        {
          id: "pb-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe shortness of breath, new weakness, seizure, high fever or uncontrolled bleeding belongs in a local emergency department.",
        },
        {
          id: "pb-faq-11",
          question: "Which city in India is right for proton therapy?",
          answer:
            "There is no single preferred city for consultation. Dedicated delivery may require travel to a named proton campus. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "pb-faq-12",
          question: "Can international patients get proton therapy in India?",
          answer:
            "Yes, after records review, a named list, an itemized estimate and an appropriate travel plan around the fraction calendar.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a proton beam depositing dose at a planned depth and stopping beyond the target",
      seoTitle: "Proton Beam Therapy in India: Cost, Procedure, Benefits & Risks",
      metaDescription:
        "Learn about proton beam therapy in India, including cost, Bragg peak, procedure, recovery, risks, suitability versus IMRT and how to compare treatment plans.",
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
  BRAIN,
  PROSTATE,
  BREAST,
  PANCREAS,
  CERVICAL,
  LYMPHOMA,
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
    "and [Gamma Knife surgery in India](https://gaf.healthcare/treatments/gamma-knife-surgery-in-india).",
    ", [Gamma Knife surgery in India](https://gaf.healthcare/treatments/gamma-knife-surgery-in-india) and [Proton beam therapy in India](https://gaf.healthcare/treatments/proton-beam-therapy-in-india).",
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
