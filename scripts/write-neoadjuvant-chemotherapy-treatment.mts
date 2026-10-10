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

const body = readFileSync(resolve("scripts/neoadjuvant-chemotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "neoadjuvant-chemotherapy-in-india");
const now = "2026-10-03T10:20:00.000Z";
const SLUG = "neoadjuvant-chemotherapy-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const WHIPPLE = "whipple-surgery-in-india";
const BILE = "bile-duct-cancer-surgery-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const IP = "intraperitoneal-chemotherapy-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const LINK =
  " Named pre-operative lists sit on [Neoadjuvant Chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Neoadjuvant chemotherapy is given before surgery. Depending on the cancer, it may be used to reduce tumour size, treat microscopic disease, assess treatment response, make surgery more feasible, or provide information about how the tumour responds.",
    `Neoadjuvant chemotherapy is given before surgery. Depending on the cancer, it may be used to reduce tumour size, treat microscopic disease, assess treatment response, make surgery more feasible, or provide information about how the tumour responds.${LINK}`,
  ],
  [
    "**Rectal cancer** develops in the rectum and often requires a different combination of surgery, chemotherapy and radiation or other neoadjuvant approaches.",
    `**Rectal cancer** develops in the rectum and often requires a different combination of surgery, chemotherapy and radiation or other neoadjuvant approaches.${LINK}`,
  ],
  [
    "**Neoadjuvant chemotherapy → Interval cytoreductive surgery → Additional chemotherapy**",
    `**Neoadjuvant chemotherapy → Interval cytoreductive surgery → Additional chemotherapy**${LINK}`,
  ],
  [
    "This is called neoadjuvant chemotherapy.",
    `This is called neoadjuvant chemotherapy.${LINK}`,
  ],
  [
    "In selected patients, chemotherapy may be given before surgery as part of a neoadjuvant treatment strategy.",
    `In selected patients, chemotherapy may be given before surgery as part of a neoadjuvant treatment strategy.${LINK}`,
  ],
  [
    "Neighbouring [neoadjuvant chemotherapy](/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy) is a different sheet and is not an adjuvant quotation.",
    `Neighbouring [neoadjuvant chemotherapy](/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy) is a different sheet and is not an adjuvant quotation.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "d6f0a4c8-5e31-6193-b049-0c3d7f8e2a56",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Neoadjuvant Chemotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Neoadjuvant Chemotherapy",
  category: "Neoadjuvant Chemotherapy",
  image: "/uploads/treatments/neo-hero.webp",
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
    "neoadjuvant-chemotherapy",
    "adjuvant-chemotherapy",
    "chemotherapy",
    "palliative-chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "hormone-therapy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [ADJUVANT, BREAST, COLON, OVARIAN, PANCREAS, WHIPPLE, BILE, CERVICAL, IP, EBRT],
  status: "published" as const,
  featured: true,
  sortOrder: 84,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Neoadjuvant Chemotherapy in India",
      shortDescription:
        "Neoadjuvant chemotherapy in India is systemic treatment before planned surgery. GAF planning is $2,500–$10,000, typically cycles before surgery over 2–4 months.",
      editorialBody: body,
      process: [
        {
          id: "neo-step-1",
          title: "Share records",
          description:
            "The patient provides biopsy, staging imaging and previous treatment details before anyone books travel.",
        },
        {
          id: "neo-step-2",
          title: "Oncology review",
          description:
            "A medical oncologist reviews whether neoadjuvant chemotherapy, immediate surgery, adjuvant sequencing or no India list is the honest next step.",
        },
        {
          id: "neo-step-3",
          title: "Name the regimen",
          description:
            "The team writes the drug combination, cycle length, expected number of pre-operative cycles and the restaging checkpoint.",
        },
        {
          id: "neo-step-4",
          title: "Itemized estimate",
          description:
            "GAF neoadjuvant planning is $2,500–$10,000. Neighbouring adjuvant planning is $2,500–$10,000. Neighbouring chemotherapy is $1,500–$8,000+.",
        },
        {
          id: "neo-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Fever, collapse or uncontrolled vomiting is a local emergency.",
        },
        {
          id: "neo-step-6",
          title: "Pre-chemotherapy tests",
          description:
            "Blood counts, kidney and liver function and other assessments confirm that the first cycle can start safely.",
        },
        {
          id: "neo-step-7",
          title: "Cycle administration",
          description:
            "Medicine is given intravenously, orally or both according to the written protocol, usually in day-care.",
        },
        {
          id: "neo-step-8",
          title: "Restaging",
          description:
            "Imaging and clinical review after the planned cycles decide whether surgery proceeds, changes or is deferred.",
        },
        {
          id: "neo-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the regimen name, remaining cycles or operative plan, toxicity record and who will continue care at home.",
        },
      ],
      preparation:
        "Share biopsy and complete staging so the team can judge whether neoadjuvant chemotherapy, immediate surgery or no India list is appropriate.",
      recovery:
        "Most cycles are day-care. Side effects can last several days. Fever, collapse or uncontrolled vomiting belongs in a local emergency department.",
      hospitalStay: "Cycles before surgery · 2–4 months. Usually outpatient day-care.",
      recoveryPeriod:
        "A pre-operative course commonly spans two to four months. Surgery timing then follows restaging.",
      followUp:
        "Request a written summary covering the regimen, doses, restaging result, toxicities and who will continue follow-up after returning home.",
      importantConsiderations:
        "Neoadjuvant chemotherapy is not required for every patient and does not guarantee tumour shrinkage. GAF planning is $2,500–$10,000. Fever during treatment belongs in a local emergency department.",
      treatmentType: "Neoadjuvant Chemotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology day-care programmes in India",
      technology:
        "Pre-operative systemic cycles, neighbouring adjuvant, targeted, hormone, immunotherapy and radiation sheets",
      searchKeywords: [
        "Neoadjuvant chemotherapy in India",
        "neoadjuvant chemotherapy cost in India",
        "chemotherapy before surgery in India",
        "neoadjuvant cancer treatment in India",
        "neoadjuvant chemotherapy treatment",
        "chemotherapy before surgery cost",
        "neoadjuvant chemotherapy for breast cancer",
        "neoadjuvant chemotherapy for rectal cancer",
        "neoadjuvant chemotherapy for pancreatic cancer",
        "neoadjuvant chemotherapy for lung cancer",
        "neoadjuvant chemotherapy for bladder cancer",
        "neoadjuvant chemotherapy for gastric cancer",
      ],
      faqs: [
        {
          id: "neo-faq-1",
          question: "What is neoadjuvant chemotherapy?",
          answer:
            "Chemotherapy given before planned definitive treatment, usually surgery, to shrink the tumour, treat microscopic disease, improve resectability or assess response.",
        },
        {
          id: "neo-faq-2",
          question: "How much does neoadjuvant chemotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $2,500–$10,000, typically cycles before surgery over 2–4 months. US comparison is $15,000–$45,000.",
        },
        {
          id: "neo-faq-3",
          question: "Is it the same as adjuvant chemotherapy?",
          answer:
            "No. Neoadjuvant chemotherapy is given before definitive surgery. Adjuvant chemotherapy is given afterwards.",
        },
        {
          id: "neo-faq-4",
          question: "Does every patient need it before surgery?",
          answer:
            "No. The decision depends on cancer type, stage, tumour biology, resectability and overall health.",
        },
        {
          id: "neo-faq-5",
          question: "How many cycles are needed?",
          answer:
            "There is no universal number. The calendar depends on the cancer, regimen, evidence and tolerance.",
        },
        {
          id: "neo-faq-6",
          question: "Is surgery always performed afterwards?",
          answer:
            "No. Surgery depends on treatment response, restaging, resectability, overall health and the original treatment plan.",
        },
        {
          id: "neo-faq-7",
          question: "Does it guarantee tumour shrinkage?",
          answer:
            "No. Some cancers respond substantially, some show limited response, and some may progress despite treatment.",
        },
        {
          id: "neo-faq-8",
          question: "Can it be combined with immunotherapy?",
          answer:
            "Yes, in selected cancers such as some resectable lung cancers and selected breast cancers, when clinically appropriate.",
        },
        {
          id: "neo-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, shaking chills, uncontrolled vomiting, chest pain, breathlessness or collapse during chemotherapy belongs in a local emergency department.",
        },
        {
          id: "neo-faq-10",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. Feasibility depends on the regimen, medical stability, required monitoring and follow-up plan.",
        },
        {
          id: "neo-faq-11",
          question: "Does it cause hair loss?",
          answer:
            "It can, but not every regimen causes significant hair loss. The side-effect profile depends on the drugs used.",
        },
        {
          id: "neo-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can deliver the named regimen, restage the tumour and coordinate surgery.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a tumour shrinking under systemic treatment before surgery",
      seoTitle: "Neoadjuvant Chemotherapy in India: Treatment, Cost, Cycles & Surgery",
      metaDescription:
        "Neoadjuvant chemotherapy in India explained: GAF planning $2,500–$10,000, cancer types, cycles before surgery, side effects and how it differs from adjuvant treatment.",
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

for (const slug of [BREAST, COLON, OVARIAN, PANCREAS, WHIPPLE, ADJUVANT]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Adjuvant Chemotherapy in India](https://gaf.healthcare/treatments/adjuvant-chemotherapy-in-india).",
    ", [Adjuvant Chemotherapy in India](https://gaf.healthcare/treatments/adjuvant-chemotherapy-in-india) and [Neoadjuvant Chemotherapy in India](https://gaf.healthcare/treatments/neoadjuvant-chemotherapy-in-india).",
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
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/whipple-treatment-body.md"));
patchMarkdown(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"));
