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

const body = readFileSync(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "adjuvant-chemotherapy-in-india");
const now = "2026-10-03T09:10:00.000Z";
const SLUG = "adjuvant-chemotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const BILE = "bile-duct-cancer-surgery-in-india";
const WHIPPLE = "whipple-surgery-in-india";
const IP = "intraperitoneal-chemotherapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const LINK =
  " Named post-operative lists sit on [Adjuvant Chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Adjuvant chemotherapy is given after surgery. It may be recommended to treat microscopic cancer cells that could remain elsewhere in the body even when no obvious distant disease is detected.",
    `Adjuvant chemotherapy is given after surgery. It may be recommended to treat microscopic cancer cells that could remain elsewhere in the body even when no obvious distant disease is detected.${LINK}`,
  ],
  [
    "The usual treatment pathway includes **surgery → pathology → adjuvant chemotherapy**.",
    `The usual treatment pathway includes **surgery → pathology → adjuvant chemotherapy**.${LINK}`,
  ],
  [
    "This is called adjuvant chemotherapy.\n\nIt aims to treat microscopic cancer cells that may remain after surgery.",
    `This is called adjuvant chemotherapy.\n\nIt aims to treat microscopic cancer cells that may remain after surgery.${LINK}`,
  ],
  [
    "The 2025 EASL guideline update for extrahepatic cholangiocarcinoma recommends consideration of **adjuvant capecitabine after resection**, while the exact treatment plan remains individualized.",
    `The 2025 EASL guideline update for extrahepatic cholangiocarcinoma recommends consideration of **adjuvant capecitabine after resection**, while the exact treatment plan remains individualized.${LINK}`,
  ],
  [
    "Neighbouring [adjuvant chemotherapy](/costs/India/Medical-Oncology/Adjuvant-Chemotherapy) is a different systemic sheet and is not an IP quotation.",
    `Neighbouring [adjuvant chemotherapy](/costs/India/Medical-Oncology/Adjuvant-Chemotherapy) is a different systemic sheet and is not an IP quotation.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "c5e9f3b7-4d20-5082-af38-9b2c6e7d1f45",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Adjuvant Chemotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Adjuvant Chemotherapy",
  category: "Adjuvant Chemotherapy",
  image: "/uploads/treatments/adj-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ankur-bahl",
    "dr-ashok-kumar-vaid",
    "dr-jyoti-bajpai",
    "dr-jimmy-mirani",
    "dr-vijay-agarwal",
    "dr-darshan-r-s",
    "dr-prasad-e",
    "dr-m-a-raja",
    "dr-nikhil-suresh-ghadyalpatil",
    "dr-bharat-vaswani",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-proton-cancer-centre",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "adjuvant-chemotherapy",
    "neoadjuvant-chemotherapy",
    "chemotherapy",
    "palliative-chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "hormone-therapy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [BREAST, COLON, OVARIAN, PANCREAS, BILE, WHIPPLE, IP, EBRT],
  status: "published" as const,
  featured: true,
  sortOrder: 83,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Adjuvant Chemotherapy in India",
      shortDescription:
        "Adjuvant chemotherapy in India is systemic treatment after primary cancer therapy, usually surgery. GAF planning is $2,500–$10,000, typically cycles after surgery over 3–6 months.",
      editorialBody: body,
      process: [
        {
          id: "adj-step-1",
          title: "Share records",
          description:
            "The patient provides final pathology, operative notes, imaging and previous treatment details before anyone books travel.",
        },
        {
          id: "adj-step-2",
          title: "Oncology review",
          description:
            "A medical oncologist reviews whether adjuvant chemotherapy, neoadjuvant sequencing, targeted therapy or no India list is the honest next step.",
        },
        {
          id: "adj-step-3",
          title: "Name the regimen",
          description:
            "The team writes the drug combination, cycle length, expected number of cycles and whether a port is required.",
        },
        {
          id: "adj-step-4",
          title: "Itemized estimate",
          description:
            "GAF adjuvant planning is $2,500–$10,000. Neighbouring neoadjuvant planning is $2,500–$10,000. Neighbouring chemotherapy is $1,500–$8,000+.",
        },
        {
          id: "adj-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review and wound recovery. Fever, collapse or uncontrolled vomiting is a local emergency.",
        },
        {
          id: "adj-step-6",
          title: "Pre-chemotherapy tests",
          description:
            "Blood counts, kidney and liver function and other assessments confirm that the first cycle can start safely.",
        },
        {
          id: "adj-step-7",
          title: "Cycle administration",
          description:
            "Medicine is given intravenously, orally or both according to the written protocol, usually in day-care.",
        },
        {
          id: "adj-step-8",
          title: "Observation",
          description:
            "Nausea, counts, infection risk and neuropathy are watched before the next cycle is booked.",
        },
        {
          id: "adj-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the regimen name, remaining cycles, toxicity record and who will continue surveillance at home.",
        },
      ],
      preparation:
        "Share final pathology and operative notes so the team can judge whether adjuvant chemotherapy, an alternative systemic plan or no India list is appropriate.",
      recovery:
        "Most cycles are day-care. Side effects can last several days. Fever, collapse or uncontrolled vomiting belongs in a local emergency department.",
      hospitalStay: "Cycles after surgery · 3–6 months. Usually outpatient day-care.",
      recoveryPeriod:
        "A course commonly spans three to six months. Surveillance then follows the cancer-specific plan.",
      followUp:
        "Request a written summary covering the regimen, doses, delays, toxicities and who will continue follow-up after returning home.",
      importantConsiderations:
        "Adjuvant chemotherapy is not required for every patient and is not a guarantee against recurrence. GAF planning is $2,500–$10,000. Fever during treatment belongs in a local emergency department.",
      treatmentType: "Adjuvant Chemotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology day-care programmes in India",
      technology:
        "Post-operative systemic cycles, neighbouring neoadjuvant, targeted, hormone, immunotherapy and radiation sheets",
      searchKeywords: [
        "Adjuvant chemotherapy in India",
        "adjuvant chemotherapy cost in India",
        "chemotherapy after cancer surgery",
        "chemotherapy after surgery in India",
        "adjuvant chemotherapy drugs",
        "adjuvant chemotherapy cycles",
        "adjuvant chemotherapy for breast cancer",
        "adjuvant chemotherapy for colon cancer",
        "adjuvant chemotherapy for ovarian cancer",
        "adjuvant chemotherapy for pancreatic cancer",
        "FOLFOX CAPOX adjuvant",
        "post-surgery chemotherapy in India",
      ],
      faqs: [
        {
          id: "adj-faq-1",
          question: "What is adjuvant chemotherapy?",
          answer:
            "Chemotherapy given after primary cancer treatment, usually surgery, to treat microscopic residual disease and reduce recurrence risk.",
        },
        {
          id: "adj-faq-2",
          question: "How much does adjuvant chemotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $2,500–$10,000, typically cycles after surgery over 3–6 months. US comparison is $15,000–$45,000.",
        },
        {
          id: "adj-faq-3",
          question: "Is it the same as neoadjuvant chemotherapy?",
          answer:
            "No. Neoadjuvant chemotherapy is given before definitive surgery. Adjuvant chemotherapy is given afterwards.",
        },
        {
          id: "adj-faq-4",
          question: "Does every patient need it after surgery?",
          answer:
            "No. The decision depends on cancer type, stage, pathology, biomarkers, recurrence risk and overall health.",
        },
        {
          id: "adj-faq-5",
          question: "How many cycles are needed?",
          answer:
            "There is no universal number. The calendar depends on the cancer, regimen, evidence and tolerance.",
        },
        {
          id: "adj-faq-6",
          question: "When does treatment start after surgery?",
          answer:
            "There is no universal start date. Treatment usually begins after adequate wound recovery and when the team judges it safe.",
        },
        {
          id: "adj-faq-7",
          question: "Can it be taken as tablets?",
          answer:
            "Some medicines are oral. Other regimens require intravenous treatment or a combination.",
        },
        {
          id: "adj-faq-8",
          question: "Can it guarantee that cancer will not return?",
          answer:
            "No. It can reduce recurrence risk where evidence supports it, but it cannot guarantee that cancer will never return.",
        },
        {
          id: "adj-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, shaking chills, uncontrolled vomiting, chest pain, breathlessness or collapse during chemotherapy belongs in a local emergency department.",
        },
        {
          id: "adj-faq-10",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. Feasibility depends on the regimen, medical stability, required monitoring and follow-up plan.",
        },
        {
          id: "adj-faq-11",
          question: "Does it cause hair loss?",
          answer:
            "It can, but not every regimen causes significant hair loss. The side-effect profile depends on the drugs used.",
        },
        {
          id: "adj-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can deliver the named regimen and manage toxicity.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of local tumour removal and circulating systemic chemotherapy",
      seoTitle: "Adjuvant Chemotherapy in India: Treatment, Cost, Drugs & Cycles",
      metaDescription:
        "Adjuvant chemotherapy in India explained: GAF planning $2,500–$10,000, when it is used after surgery, drugs, cycles, side effects and how it differs from neoadjuvant treatment.",
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

for (const slug of [BREAST, COLON, OVARIAN, PANCREAS, BILE, WHIPPLE, IP]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Intraperitoneal Chemotherapy in India](https://gaf.healthcare/treatments/intraperitoneal-chemotherapy-in-india).",
    ", [Intraperitoneal Chemotherapy in India](https://gaf.healthcare/treatments/intraperitoneal-chemotherapy-in-india) and [Adjuvant Chemotherapy in India](https://gaf.healthcare/treatments/adjuvant-chemotherapy-in-india).",
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

patchMarkdown(resolve("scripts/colon-treatment-body.md"));
patchMarkdown(resolve("scripts/pancreas-treatment-body.md"));
patchMarkdown(resolve("scripts/bile-duct-cancer-treatment-body.md"));
patchMarkdown(resolve("scripts/intraperitoneal-chemotherapy-treatment-body.md"));
