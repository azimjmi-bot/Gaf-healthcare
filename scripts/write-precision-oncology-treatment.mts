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

const body = readFileSync(resolve("scripts/precision-oncology-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "precision-oncology-in-india");
const now = "2026-10-03T12:00:00.000Z";
const SLUG = "precision-oncology-in-india";
const MTT = "molecular-targeted-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const WHIPPLE = "whipple-surgery-in-india";
const BILE = "bile-duct-cancer-surgery-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const NEOADJUVANT = "neoadjuvant-chemotherapy-in-india";
const LINK =
  " Named genomic-testing lists sit on [Precision Oncology in India](/treatments/precision-oncology-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Important biomarkers may include **MMR**, **MSI**, **KRAS**, **NRAS**, **BRAF**, **HER2**, and other molecular alterations depending on the clinical setting. [Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**.",
    `Important biomarkers may include **MMR**, **MSI**, **KRAS**, **NRAS**, **BRAF**, **HER2**, and other molecular alterations depending on the clinical setting. [Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**.${LINK}`,
  ],
  [
    "Genetic and molecular testing has become an increasingly important part of pancreatic cancer care. [Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**.",
    `Genetic and molecular testing has become an increasingly important part of pancreatic cancer care. [Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**.${LINK}`,
  ],
  [
    "GAF planning ranges for [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) panels sit at **$2,000–$7,000**. They do not replace a hospital quotation for BRCA or HRD assays.",
    `GAF planning ranges for [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) panels sit at **$2,000–$7,000**. They do not replace a hospital quotation for BRCA or HRD assays.${LINK}`,
  ],
  [
    "[Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**. Testing does not mean that a targeted treatment will necessarily be available.",
    `[Precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) planning ranges on this site are **$2,000–$7,000**. Testing does not mean that a targeted treatment will necessarily be available.${LINK}`,
  ],
  [
    "Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel is named.",
    `Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel is named.${LINK}`,
  ],
  [
    "The exact tests depend on the cancer type and treatment plan. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.",
    `The exact tests depend on the cancer type and treatment plan. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.${LINK}`,
  ],
  [
    "This is why molecular targeted therapy is closely connected with **precision oncology**. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.",
    `This is why molecular targeted therapy is closely connected with **precision oncology**. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.${LINK}`,
  ],
  [
    "Depending on the cancer, testing may include hormone receptors, HER2, EGFR, ALK, ROS1, BRAF, MSI/MMR, KRAS/NRAS, PD-L1 and other molecular alterations. Not every biomarker is relevant to every cancer. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.",
    `Depending on the cancer, testing may include hormone receptors, HER2, EGFR, ALK, ROS1, BRAF, MSI/MMR, KRAS/NRAS, PD-L1 and other molecular alterations. Not every biomarker is relevant to every cancer. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000**.${LINK}`,
  ],
  [
    "Depending on the suspected leukemia, doctors may add morphological examination, flow cytometry, cytogenetic testing, FISH, molecular testing, mutation analysis and measurable residual disease assessment. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel plus clinic visit is the named product.",
    `Depending on the suspected leukemia, doctors may add morphological examination, flow cytometry, cytogenetic testing, FISH, molecular testing, mutation analysis and measurable residual disease assessment. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel plus clinic visit is the named product.${LINK}`,
  ],
  [
    "**Molecular and genetic testing.** Selected aggressive B-cell lymphomas may require evaluation of MYC, BCL2 and BCL6 abnormalities. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel plus clinic visit is the named product.",
    `**Molecular and genetic testing.** Selected aggressive B-cell lymphomas may require evaluation of MYC, BCL2 and BCL6 abnormalities. Neighbouring [precision oncology](/costs/India/Medical-Oncology/Precision-Oncology) is **$2,000–$7,000** when an NGS panel plus clinic visit is the named product.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "f8b2c6e0-7a53-8315-d26b-2e5f91014c78",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Precision Oncology in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Precision Oncology",
  category: "Precision Oncology",
  image: "/uploads/treatments/po-hero.webp",
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
    "precision-oncology",
    "molecular-targeted-therapy",
    "targeted-therapy",
    "chemotherapy",
    "immunotherapy",
    "hormone-therapy",
    "antibody-drug-conjugate-therapy",
  ],
  relatedTreatmentSlugs: [
    MTT,
    BREAST,
    COLON,
    OVARIAN,
    PROSTATE,
    PANCREAS,
    WHIPPLE,
    BILE,
    LEUKEMIA,
    LYMPHOMA,
    BRAIN,
    ADJUVANT,
    NEOADJUVANT,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 86,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Precision Oncology in India",
      shortDescription:
        "Precision oncology in India uses genomic and biomarker testing to match cancer care. GAF planning is $2,000–$7,000, typically an NGS panel plus clinic visit.",
      editorialBody: body,
      process: [
        {
          id: "po-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, stored-tissue details and prior molecular reports before anyone books travel.",
        },
        {
          id: "po-step-2",
          title: "Name the clinical question",
          description:
            "A medical oncologist decides whether a focused assay, a broader panel or no India list is the honest next step.",
        },
        {
          id: "po-step-3",
          title: "Assess the specimen",
          description:
            "The team checks whether existing tissue is adequate or whether a new biopsy or liquid assay is required.",
        },
        {
          id: "po-step-4",
          title: "Itemized estimate",
          description:
            "GAF precision-oncology planning is $2,000–$7,000. Neighbouring molecular targeted therapy is $10,000–$32,000 if a medicine is later named.",
        },
        {
          id: "po-step-5",
          title: "Run the assay",
          description:
            "IHC, PCR, FISH, NGS or liquid biopsy is performed in a validated laboratory according to the written plan.",
        },
        {
          id: "po-step-6",
          title: "Interpret the report",
          description:
            "Actionable findings, uncertain variants and non-actionable results are separated from a medicine recommendation.",
        },
        {
          id: "po-step-7",
          title: "Match or do not match",
          description:
            "The team decides whether a targeted medicine, immunotherapy, chemotherapy, trial or no molecular match is appropriate.",
        },
        {
          id: "po-step-8",
          title: "Follow-up plan",
          description:
            "The patient leaves with the assay name, interpretation, any matched plan and who will continue care at home.",
        },
      ],
      preparation:
        "Share the original pathology report and details of stored tissue so the team can judge whether genomic testing can answer a clinical question.",
      recovery:
        "Testing is usually outpatient. If a matched medicine later starts, fever, severe diarrhoea, chest pain or breathlessness belongs in a local emergency department.",
      hospitalStay: "NGS panel + clinic visit. Usually outpatient.",
      recoveryPeriod:
        "Turnaround depends on the assay and specimen. Any resulting medicine has a separate duration.",
      followUp:
        "Request a written interpretation that distinguishes established options, trials and unsupported findings.",
      importantConsiderations:
        "A large panel is not treatment by itself. GAF planning is $2,000–$7,000. Severe symptoms during later systemic treatment belong in a local emergency department.",
      treatmentType: "Precision Oncology / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology and molecular-pathology programmes in India",
      technology:
        "NGS, IHC, FISH, PCR, liquid biopsy and neighbouring targeted-therapy and immunotherapy sheets",
      searchKeywords: [
        "Precision oncology in India",
        "precision cancer treatment in India",
        "personalized cancer treatment India",
        "cancer genomic testing India",
        "NGS testing for cancer India",
        "molecular profiling cancer India",
        "precision medicine for cancer India",
        "cancer biomarker testing India",
        "liquid biopsy India",
        "tumour genomic profiling India",
        "precision oncology cost in India",
        "molecular tumour board India",
      ],
      faqs: [
        {
          id: "po-faq-1",
          question: "What is precision oncology?",
          answer:
            "Cancer treatment guided by molecular, genomic, biomarker and clinical characteristics of an individual patient's tumour.",
        },
        {
          id: "po-faq-2",
          question: "How much does precision oncology cost in India?",
          answer:
            "GAF Healthcare planning is $2,000–$7,000, typically an NGS panel plus clinic visit. US comparison is $8,000–$25,000.",
        },
        {
          id: "po-faq-3",
          question: "Does every cancer patient need NGS?",
          answer:
            "No. The usefulness depends on cancer type, stage, treatment history and the biomarkers relevant to that cancer.",
        },
        {
          id: "po-faq-4",
          question: "Can testing be performed on old biopsy tissue?",
          answer:
            "Sometimes. Existing tissue may be adequate if there is sufficient tumour and the sample is suitable for the requested analysis.",
        },
        {
          id: "po-faq-5",
          question: "Can blood be used?",
          answer:
            "In selected circumstances, liquid biopsy can analyse circulating tumour DNA or other cancer-related material in blood.",
        },
        {
          id: "po-faq-6",
          question: "Does a mutation guarantee that a treatment will work?",
          answer:
            "No. A biomarker can indicate a possible option, but response depends on the alteration, cancer, drug, prior treatment and evidence.",
        },
        {
          id: "po-faq-7",
          question: "Is precision oncology the same as genetic testing?",
          answer:
            "No. Tumour genomic testing examines cancer-cell changes. Germline testing looks for inherited changes.",
        },
        {
          id: "po-faq-8",
          question: "What if no actionable mutation is found?",
          answer:
            "Treatment can still be possible. A non-actionable result does not mean that cancer treatment has ended.",
        },
        {
          id: "po-faq-9",
          question: "Can precision oncology cure cancer?",
          answer:
            "It is an approach to selecting treatment, not a cure by itself. Outcome depends on cancer type, stage, biology and response.",
        },
        {
          id: "po-faq-10",
          question: "Is liquid biopsy as good as tissue biopsy?",
          answer:
            "Not in every situation. A negative blood test does not necessarily exclude a biomarker that tissue might show.",
        },
        {
          id: "po-faq-11",
          question: "What is a molecular tumour board?",
          answer:
            "A multidisciplinary group that reviews complex molecular findings and helps determine their clinical relevance.",
        },
        {
          id: "po-faq-12",
          question: "Can genomic testing identify inherited cancer risk?",
          answer:
            "Sometimes a tumour test raises suspicion of an inherited mutation. Confirmatory germline testing may then be recommended.",
        },
        {
          id: "po-faq-13",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, severe diarrhoea, chest pain, breathlessness, collapse or a rapidly worsening rash during later systemic treatment belongs in a local emergency department.",
        },
        {
          id: "po-faq-14",
          question: "Can international patients receive this evaluation in India?",
          answer:
            "Yes, after records review. Feasibility depends on the clinical question, specimen, laboratory and follow-up plan.",
        },
        {
          id: "po-faq-15",
          question: "Does precision oncology replace chemotherapy?",
          answer:
            "No. Chemotherapy remains important for many patients. Precision testing may or may not change the next line.",
        },
        {
          id: "po-faq-16",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can run the named assay and interpret it.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a tumour specimen feeding a matched molecular plan",
      seoTitle: "Precision Oncology in India: Genomic Testing, Biomarkers & Treatment",
      metaDescription:
        "Precision oncology in India explained: GAF planning $2,000–$7,000, NGS, biomarkers, liquid biopsy, tumour boards and how testing differs from a matched medicine.",
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
  COLON,
  PANCREAS,
  OVARIAN,
  WHIPPLE,
  BILE,
  NEOADJUVANT,
  MTT,
  ADJUVANT,
  LEUKEMIA,
  LYMPHOMA,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Molecular Targeted Therapy in India](https://gaf.healthcare/treatments/molecular-targeted-therapy-in-india).",
    ", [Molecular Targeted Therapy in India](https://gaf.healthcare/treatments/molecular-targeted-therapy-in-india) and [Precision Oncology in India](https://gaf.healthcare/treatments/precision-oncology-in-india).",
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
patchMarkdown(resolve("scripts/bile-duct-cancer-treatment-body.md"));
patchMarkdown(resolve("scripts/neoadjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/molecular-targeted-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
