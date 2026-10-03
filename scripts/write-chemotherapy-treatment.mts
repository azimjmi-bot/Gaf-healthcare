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

const body = readFileSync(resolve("scripts/chemotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "chemotherapy-in-india");
const now = "2026-10-03T16:00:00.000Z";
const SLUG = "chemotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const TARGETED = "targeted-therapy-in-india";
const IMMUNO = "immunotherapy-in-india";
const HORMONE = "hormone-therapy-in-india";
const PRECISION = "precision-oncology-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const NEOADJUVANT = "neoadjuvant-chemotherapy-in-india";
const IT = "intrathecal-chemotherapy-in-india";
const IP = "intraperitoneal-chemotherapy-in-india";
const LINK =
  " Named chemotherapy lists sit on [Chemotherapy in India](/treatments/chemotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Chemotherapy uses anti-cancer medicines to destroy or inhibit cancer cells. It can be given before or after surgery.",
    `Chemotherapy uses anti-cancer medicines to destroy or inhibit cancer cells. It can be given before or after surgery.${LINK}`,
  ],
  [
    "GAF Healthcare planning ranges for [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) are **$1,500–$8,000+**.",
    `GAF Healthcare planning ranges for [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) are **$1,500–$8,000+**.${LINK}`,
  ],
  [
    "Neither treatment can simply be described as universally better. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).",
    `Neither treatment can simply be described as universally better. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).${LINK}`,
  ],
  [
    "Chemotherapy remains an important cancer treatment and is not made obsolete by targeted therapy. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).",
    `Chemotherapy remains an important cancer treatment and is not made obsolete by targeted therapy. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).${LINK}`,
  ],
  [
    "Some patients may receive both treatments at different stages of their cancer journey. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).",
    `Some patients may receive both treatments at different stages of their cancer journey. Neighbouring cytotoxic lists sit on [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india).${LINK}`,
  ],
  [
    "Named [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**. Drugs, doses and schedule depend entirely on the subtype and protocol.",
    `Named [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**. Drugs, doses and schedule depend entirely on the subtype and protocol.${LINK}`,
  ],
  [
    "Examples of commonly used regimens include ABVD-based therapy, A+AVD in selected Hodgkin lymphoma patients, R-CHOP-based therapy, DA-R-EPOCH in selected aggressive lymphomas, bendamustine-based treatment, ICE-based salvage therapy and other subtype-specific regimens. The appropriate regimen should be selected by a haematologist or medical oncologist after the individual diagnosis.",
    `Examples of commonly used regimens include ABVD-based therapy, A+AVD in selected Hodgkin lymphoma patients, R-CHOP-based therapy, DA-R-EPOCH in selected aggressive lymphomas, bendamustine-based treatment, ICE-based salvage therapy and other subtype-specific regimens. The appropriate regimen should be selected by a haematologist or medical oncologist after the individual diagnosis.${LINK}`,
  ],
  [
    "Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**, typically **outpatient cycles over 3–6 months**.",
    `Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**, typically **outpatient cycles over 3–6 months**.${LINK}`,
  ],
  [
    "Intrathecal chemotherapy does **not generally replace systemic chemotherapy** when systemic treatment is required. In many plans the two approaches are complementary. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) remains **$1,500–$8,000+** when the parent systemic protocol is named separately.",
    `Intrathecal chemotherapy does **not generally replace systemic chemotherapy** when systemic treatment is required. In many plans the two approaches are complementary. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) remains **$1,500–$8,000+** when the parent systemic protocol is named separately.${LINK}`,
  ],
  [
    "See [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india). Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**.",
    `See [adjuvant chemotherapy in India](/treatments/adjuvant-chemotherapy-in-india) and [neoadjuvant chemotherapy in India](/treatments/neoadjuvant-chemotherapy-in-india). Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**.${LINK}`,
  ],
  [
    "GAF planning ranges for [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) are **$1,500–$8,000+**.",
    `GAF planning ranges for [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) are **$1,500–$8,000+**.${LINK}`,
  ],
  [
    "For many patients with epithelial ovarian cancer, treatment involves a combination of **cytoreductive surgery and platinum-based chemotherapy**. In advanced disease, doctors may recommend surgery before chemotherapy or chemotherapy first followed by interval debulking surgery, depending on whether complete or near-complete tumor removal is considered feasible and safe.",
    `For many patients with epithelial ovarian cancer, treatment involves a combination of **cytoreductive surgery and platinum-based chemotherapy**. In advanced disease, doctors may recommend surgery before chemotherapy or chemotherapy first followed by interval debulking surgery, depending on whether complete or near-complete tumor removal is considered feasible and safe.${LINK}`,
  ],
  [
    "**Intravenous chemotherapy** is administered into a vein and enters the bloodstream. It circulates throughout the body and can reach cancer cells in multiple locations. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) remains **$1,500–$8,000+** when the parent systemic protocol is named separately.",
    `**Intravenous chemotherapy** is administered into a vein and enters the bloodstream. It circulates throughout the body and can reach cancer cells in multiple locations. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) remains **$1,500–$8,000+** when the parent systemic protocol is named separately.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "d2f6b4e0-1a95-6759-c60d-629e35458012",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Chemotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Chemotherapy",
  category: "Chemotherapy",
  image: "/uploads/treatments/chemo-hero.webp",
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
    "chemotherapy",
    "adjuvant-chemotherapy",
    "neoadjuvant-chemotherapy",
    "palliative-chemotherapy",
    "intraperitoneal-chemotherapy",
    "intrathecal-chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "hormone-therapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    COLON,
    CERVICAL,
    OVARIAN,
    "prostate-cancer-treatment-in-india",
    "pancreatic-cancer-treatment-in-india",
    "whipple-surgery-in-india",
    LEUKEMIA,
    LYMPHOMA,
    ADJUVANT,
    NEOADJUVANT,
    IT,
    IP,
    "hipec-surgery-in-india",
    IMMUNO,
    TARGETED,
    HORMONE,
    PRECISION,
    "external-beam-radiotherapy-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 90,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Chemotherapy in India",
      shortDescription:
        "Chemotherapy in India uses anti-cancer medicines in planned cycles. GAF planning is $1,500–$8,000+, typically outpatient over 3–6 months.",
      editorialBody: body,
      process: [
        {
          id: "chemo-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, imaging and previous treatment summaries before anyone books travel.",
        },
        {
          id: "chemo-step-2",
          title: "Name the clinical question",
          description:
            "A medical oncologist decides whether adjuvant, neoadjuvant, palliative or another India list is the honest next step.",
        },
        {
          id: "chemo-step-3",
          title: "Confirm staging and organ function",
          description:
            "The team reviews blood counts, kidney and liver function and whether additional imaging or biomarkers are required.",
        },
        {
          id: "chemo-step-4",
          title: "Itemised estimate",
          description:
            "GAF chemotherapy planning is $1,500–$8,000+. Neighbouring adjuvant and neoadjuvant sheets are $2,500–$10,000 when that timing is named.",
        },
        {
          id: "chemo-step-5",
          title: "Select the regimen",
          description:
            "A named protocol, dose and schedule are chosen from the cancer biology, stage and evidence.",
        },
        {
          id: "chemo-step-6",
          title: "Start and monitor",
          description:
            "Infusions or oral cycles begin with a written schedule for blood counts, anti-nausea medicines and infection warning signs.",
        },
        {
          id: "chemo-step-7",
          title: "Transfer home",
          description:
            "Some patients continue later cycles at home after a stable plan is documented with the referring team.",
        },
        {
          id: "chemo-step-8",
          title: "Review response",
          description:
            "If the cancer progresses or toxicity is unacceptable, the team considers another systemic line or a different class of treatment.",
        },
      ],
      preparation:
        "Share the original pathology report and recent blood tests so the team can judge whether a named regimen can change the plan.",
      recovery:
        "Treatment is usually outpatient. Fever, severe vomiting, difficulty breathing, uncontrolled bleeding or new confusion belongs in a local emergency department.",
      hospitalStay: "Outpatient cycles · 3–6 months typical. Usually day-care infusion.",
      recoveryPeriod:
        "Duration depends on the regimen, response and tolerance. Blood counts often recover between cycles.",
      followUp:
        "Request a written plan that names the regimen, interval, monitoring and who will continue cycles at home.",
      importantConsiderations:
        "Side-effect severity does not show whether treatment is working. GAF planning is $1,500–$8,000+. Severe symptoms belong in a local emergency department.",
      treatmentType: "Chemotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology programmes in India",
      technology:
        "Day-care infusion, oral protocols and neighbouring adjuvant, neoadjuvant, intraperitoneal and intrathecal sheets",
      searchKeywords: [
        "Chemotherapy in India",
        "chemotherapy treatment in India",
        "chemotherapy for cancer in India",
        "chemotherapy cost in India",
        "chemotherapy cycles in India",
        "chemotherapy drugs in India",
        "adjuvant chemotherapy in India",
        "neoadjuvant chemotherapy in India",
        "chemotherapy side effects",
        "FOLFOX in India",
        "R-CHOP in India",
        "cancer chemotherapy India",
      ],
      faqs: [
        {
          id: "chemo-faq-1",
          question: "Is chemotherapy available in India?",
          answer:
            "Yes. Chemotherapy is provided at cancer hospitals and oncology centres, including dedicated day-care and inpatient settings.",
        },
        {
          id: "chemo-faq-2",
          question: "How much does chemotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $1,500–$8,000+, typically Outpatient cycles · 3–6 months typical. US comparison is $10,000–$50,000.",
        },
        {
          id: "chemo-faq-3",
          question: "How many chemotherapy cycles are required?",
          answer:
            "The number varies according to cancer type, stage, treatment goal, regimen and response.",
        },
        {
          id: "chemo-faq-4",
          question: "How long does a chemotherapy session take?",
          answer:
            "It can range from a relatively short infusion to several hours or longer, depending on the medicines and monitoring.",
        },
        {
          id: "chemo-faq-5",
          question: "Is chemotherapy painful?",
          answer:
            "The infusion itself is not necessarily painful. IV insertion or port access can cause temporary discomfort.",
        },
        {
          id: "chemo-faq-6",
          question: "Will chemotherapy cause hair loss?",
          answer:
            "Some medicines cause hair loss, while others do not. The expected effect depends on the specific regimen.",
        },
        {
          id: "chemo-faq-7",
          question: "Can chemotherapy cure cancer?",
          answer:
            "In some cancers it contributes to curative treatment. In other situations it is used to control disease or relieve symptoms.",
        },
        {
          id: "chemo-faq-8",
          question: "Can chemotherapy be given after surgery?",
          answer:
            "Yes. This is adjuvant chemotherapy, used for selected cancers to reduce the risk of recurrence.",
        },
        {
          id: "chemo-faq-9",
          question: "Can chemotherapy be given before surgery?",
          answer:
            "Yes. This is neoadjuvant chemotherapy and may be used to shrink a tumour or treat microscopic disease before surgery.",
        },
        {
          id: "chemo-faq-10",
          question: "Can chemotherapy and radiation be given together?",
          answer:
            "Yes. Selected cancers are treated using concurrent chemoradiation.",
        },
        {
          id: "chemo-faq-11",
          question: "Is chemotherapy the same as immunotherapy?",
          answer:
            "No. They work differently, although they may sometimes be used together.",
        },
        {
          id: "chemo-faq-12",
          question: "Does chemotherapy affect fertility?",
          answer:
            "Some medicines can reduce fertility. Discuss fertility preservation before treatment if having children may be important.",
        },
        {
          id: "chemo-faq-13",
          question: "What should I do if I develop a fever during chemotherapy?",
          answer:
            "Go to a local emergency department. Fever during chemotherapy can be a sign of infection, particularly when white-cell counts are low.",
        },
        {
          id: "chemo-faq-14",
          question: "Can international patients receive chemotherapy in India?",
          answer:
            "Yes, after records review. Feasibility depends on the cancer, regimen, medicine availability and a plan for continuing cycles at home.",
        },
        {
          id: "chemo-faq-15",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can deliver the named regimen and manage complications.",
        },
        {
          id: "chemo-faq-16",
          question: "Do side effects show that chemotherapy is working?",
          answer:
            "No. Side-effect severity does not indicate treatment effectiveness. Doctors use clinical assessment, blood tests and imaging.",
        },
        {
          id: "chemo-faq-17",
          question: "Should I take vitamins or herbal supplements during chemotherapy?",
          answer:
            "Do not start supplements without discussing them with the oncology team. Some products can interfere with cancer treatment.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of an infusion bag feeding a circulating path around a marked cell",
      seoTitle: "Chemotherapy in India: Cost, Cycles, Types & Cancer Care",
      metaDescription:
        "Explore chemotherapy in India, including how it works, cycles, regimens, side effects, adjuvant and neoadjuvant timing, and estimated costs.",
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
  BREAST,
  COLON,
  CERVICAL,
  OVARIAN,
  LEUKEMIA,
  LYMPHOMA,
  TARGETED,
  IMMUNO,
  HORMONE,
  PRECISION,
  ADJUVANT,
  NEOADJUVANT,
  IT,
  IP,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Immunotherapy in India](https://gaf.healthcare/treatments/immunotherapy-in-india).",
    ", [Immunotherapy in India](https://gaf.healthcare/treatments/immunotherapy-in-india) and [Chemotherapy in India](https://gaf.healthcare/treatments/chemotherapy-in-india).",
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
patchMarkdown(resolve("scripts/cervical-treatment-body.md"));
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/targeted-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/immunotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/hormone-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/precision-oncology-treatment-body.md"));
patchMarkdown(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/neoadjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/intrathecal-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/intraperitoneal-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("content/treatments/breast-cancer-treatment-in-india.md"));
