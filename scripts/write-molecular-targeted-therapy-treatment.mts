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

const body = readFileSync(resolve("scripts/molecular-targeted-therapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "molecular-targeted-therapy-in-india");
const now = "2026-10-03T11:10:00.000Z";
const SLUG = "molecular-targeted-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BILE = "bile-duct-cancer-surgery-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const NEOADJUVANT = "neoadjuvant-chemotherapy-in-india";
const IP = "intraperitoneal-chemotherapy-in-india";
const LINK =
  " Named molecular-matched lists sit on [Molecular Targeted Therapy in India](/treatments/molecular-targeted-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Targeted therapy uses medicines designed to act on particular biological characteristics of cancer cells. HER2-targeted treatment is an important example in breast cancer, which is why HER2 testing is part of the pathological evaluation of many breast cancers.",
    `Targeted therapy uses medicines designed to act on particular biological characteristics of cancer cells. HER2-targeted treatment is an important example in breast cancer, which is why HER2 testing is part of the pathological evaluation of many breast cancers.${LINK}`,
  ],
  [
    "Targeted therapy focuses on specific molecular pathways involved in tumour growth. Examples used in colorectal cancer treatment include bevacizumab, cetuximab, panitumumab, encorafenib in appropriate BRAF-mutated disease, regorafenib, fruquintinib, and other biomarker-directed therapies depending on tumour characteristics and treatment setting.",
    `Targeted therapy focuses on specific molecular pathways involved in tumour growth. Examples used in colorectal cancer treatment include bevacizumab, cetuximab, panitumumab, encorafenib in appropriate BRAF-mutated disease, regorafenib, fruquintinib, and other biomarker-directed therapies depending on tumour characteristics and treatment setting.${LINK}`,
  ],
  [
    "Targeted therapy is increasingly important in ovarian cancer.",
    `Targeted therapy is increasingly important in ovarian cancer.${LINK}`,
  ],
  [
    "[Targeted treatments](/costs/India/Medical-Oncology/Targeted-Therapy) are designed to act against specific biological characteristics of cancer cells.",
    `[Targeted treatments](/costs/India/Medical-Oncology/Targeted-Therapy) are designed to act against specific biological characteristics of cancer cells.${LINK}`,
  ],
  [
    "[Targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is designed to act against particular molecular abnormalities.",
    `[Targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is designed to act against particular molecular abnormalities.${LINK}`,
  ],
  [
    "Targeted therapy attacks specific molecular pathways. Examples include tyrosine kinase inhibitors for BCR::ABL1-positive leukemia, FLT3-targeted therapy in selected AML, IDH-targeted therapies in selected AML, BCL-2-directed therapy in appropriate AML settings and other molecularly directed treatments.",
    `Targeted therapy attacks specific molecular pathways. Examples include tyrosine kinase inhibitors for BCR::ABL1-positive leukemia, FLT3-targeted therapy in selected AML, IDH-targeted therapies in selected AML, BCL-2-directed therapy in appropriate AML settings and other molecularly directed treatments.${LINK}`,
  ],
  [
    "Chemotherapy is different from targeted therapy and from immunotherapy. Some patients receive chemotherapy together with targeted treatment, while others receive targeted therapy sequentially or instead of conventional chemotherapy.",
    `Chemotherapy is different from targeted therapy and from immunotherapy. Some patients receive chemotherapy together with targeted treatment, while others receive targeted therapy sequentially or instead of conventional chemotherapy.${LINK}`,
  ],
  [
    "Treatment may include chemotherapy combined with targeted therapy or immunotherapy when indicated by tumour biology.",
    `Treatment may include chemotherapy combined with targeted therapy or immunotherapy when indicated by tumour biology.${LINK}`,
  ],
  [
    "A patient should not assume that IP chemotherapy is automatically preferable to modern IV-based treatment. Neighbouring [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is **$8,000–$30,000**.",
    `A patient should not assume that IP chemotherapy is automatically preferable to modern IV-based treatment. Neighbouring [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is **$8,000–$30,000**.${LINK}`,
  ],
  [
    "For unresectable or metastatic disease: **systemic therapy ± immunotherapy ± targeted therapy ± radiation or drainage**.",
    `For unresectable or metastatic disease: **systemic therapy ± immunotherapy ± targeted therapy ± radiation or drainage**.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "e7a1b5d9-6f42-7204-c15a-1d4e80903b67",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Molecular Targeted Therapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Molecular Targeted Therapy",
  category: "Molecular Targeted Therapy",
  image: "/uploads/treatments/mtt-hero.webp",
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
    "molecular-targeted-therapy",
    "targeted-therapy",
    "precision-oncology",
    "chemotherapy",
    "immunotherapy",
    "hormone-therapy",
    "antibody-drug-conjugate-therapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    COLON,
    OVARIAN,
    PROSTATE,
    PANCREAS,
    LEUKEMIA,
    LYMPHOMA,
    BILE,
    ADJUVANT,
    NEOADJUVANT,
    IP,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 85,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Molecular Targeted Therapy in India",
      shortDescription:
        "Molecular targeted therapy in India matches cancer medicines to documented tumour alterations. GAF planning is $10,000–$32,000, typically oral or infusion by mutation.",
      editorialBody: body,
      process: [
        {
          id: "mtt-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, molecular reports and previous treatment details before anyone books travel.",
        },
        {
          id: "mtt-step-2",
          title: "Oncology review",
          description:
            "A medical oncologist reviews whether a matched medicine, another systemic class or no India list is the honest next step.",
        },
        {
          id: "mtt-step-3",
          title: "Name the target",
          description:
            "The team writes the alteration, assay method, evidence level and whether repeat tissue or liquid testing is required.",
        },
        {
          id: "mtt-step-4",
          title: "Itemized estimate",
          description:
            "GAF molecular targeted planning is $10,000–$32,000. Neighbouring targeted therapy is $8,000–$30,000. Neighbouring precision oncology is $2,000–$7,000.",
        },
        {
          id: "mtt-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Severe diarrhoea, breathlessness or collapse is a local emergency.",
        },
        {
          id: "mtt-step-6",
          title: "Start the medicine",
          description:
            "The named drug is given orally, by infusion or by injection according to the written protocol.",
        },
        {
          id: "mtt-step-7",
          title: "Monitor response",
          description:
            "Blood tests, organ function and imaging watch benefit, toxicity and emerging resistance.",
        },
        {
          id: "mtt-step-8",
          title: "Follow-up plan",
          description:
            "The patient leaves with the target name, medicine, monitoring calendar and who will continue care at home.",
        },
      ],
      preparation:
        "Share the original molecular report with method and specimen details so the team can judge whether a matched medicine is appropriate.",
      recovery:
        "Most regimens are outpatient. Side effects vary by target. Fever, severe diarrhoea, chest pain or breathlessness belongs in a local emergency department.",
      hospitalStay: "Oral or infusion by mutation. Usually outpatient clinic or day-care.",
      recoveryPeriod:
        "Treatment often continues for months while benefit and tolerance remain. Duration is not a fixed package.",
      followUp:
        "Request a written summary covering the alteration, medicine, doses, toxicities, imaging plan and who will continue follow-up after returning home.",
      importantConsiderations:
        "A mutation is not automatically a prescription. GAF planning is $10,000–$32,000. Severe symptoms during treatment belong in a local emergency department.",
      treatmentType: "Molecular Targeted Therapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology programmes in India",
      technology:
        "Biomarker-matched small molecules and antibodies, neighbouring precision-oncology, chemotherapy and immunotherapy sheets",
      searchKeywords: [
        "Molecular targeted therapy in India",
        "molecular targeted therapy cost in India",
        "targeted therapy in India",
        "biomarker testing for cancer",
        "precision oncology in India",
        "EGFR ALK HER2 targeted therapy",
        "NGS cancer testing India",
        "liquid biopsy targeted therapy",
        "targeted therapy for lung cancer",
        "targeted therapy for breast cancer",
        "targeted therapy for colon cancer",
        "PARP inhibitor India",
      ],
      faqs: [
        {
          id: "mtt-faq-1",
          question: "What is molecular targeted therapy?",
          answer:
            "Cancer treatment designed to act on specific molecular targets involved in cancer growth or survival.",
        },
        {
          id: "mtt-faq-2",
          question: "How much does molecular targeted therapy cost in India?",
          answer:
            "GAF Healthcare planning is $10,000–$32,000, typically oral or infusion by mutation. US comparison is $90,000–$180,000.",
        },
        {
          id: "mtt-faq-3",
          question: "Is it the same as chemotherapy?",
          answer:
            "No. Targeted therapy and chemotherapy work differently, although they may be used together.",
        },
        {
          id: "mtt-faq-4",
          question: "Does every cancer patient qualify?",
          answer:
            "No. Treatment usually requires an actionable biomarker or another established indication.",
        },
        {
          id: "mtt-faq-5",
          question: "Is genetic testing required?",
          answer:
            "Often, but the exact testing depends on the cancer and suspected target.",
        },
        {
          id: "mtt-faq-6",
          question: "How is treatment given?",
          answer:
            "Depending on the drug, it may be an oral tablet or capsule, an intravenous infusion or an injection.",
        },
        {
          id: "mtt-faq-7",
          question: "Is targeted therapy a cure?",
          answer:
            "It can produce major responses in some cancers, but it is not universally curative.",
        },
        {
          id: "mtt-faq-8",
          question: "Can it stop working?",
          answer:
            "Yes. Cancer can develop resistance through additional molecular changes or alternative pathways.",
        },
        {
          id: "mtt-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, severe diarrhoea, chest pain, breathlessness, collapse or a rapidly worsening rash during treatment belongs in a local emergency department.",
        },
        {
          id: "mtt-faq-10",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. Feasibility depends on the medicine, supply, monitoring and follow-up plan.",
        },
        {
          id: "mtt-faq-11",
          question: "Is liquid biopsy enough on its own?",
          answer:
            "It can help in selected situations, but it does not replace tissue testing in every patient.",
        },
        {
          id: "mtt-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can interpret the assay, supply the named medicine and manage toxicity.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a tumour receptor and a matching targeted medicine",
      seoTitle: "Molecular Targeted Therapy in India: Biomarkers, Cost & Treatment",
      metaDescription:
        "Molecular targeted therapy in India explained: GAF planning $10,000–$32,000, biomarker testing, matched medicines, side effects and how it differs from chemotherapy.",
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
  OVARIAN,
  PROSTATE,
  PANCREAS,
  LEUKEMIA,
  BILE,
  ADJUVANT,
  NEOADJUVANT,
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
    "and [Neoadjuvant Chemotherapy in India](https://gaf.healthcare/treatments/neoadjuvant-chemotherapy-in-india).",
    ", [Neoadjuvant Chemotherapy in India](https://gaf.healthcare/treatments/neoadjuvant-chemotherapy-in-india) and [Molecular Targeted Therapy in India](https://gaf.healthcare/treatments/molecular-targeted-therapy-in-india).",
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
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/prostate-treatment-body.md"));
patchMarkdown(resolve("scripts/pancreas-treatment-body.md"));
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/bile-duct-cancer-treatment-body.md"));
patchMarkdown(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/neoadjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/intraperitoneal-chemotherapy-treatment-body.md"));
