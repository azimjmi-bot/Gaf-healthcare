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

const body = readFileSync(resolve("scripts/targeted-therapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "targeted-therapy-in-india");
const now = "2026-10-03T12:00:00.000Z";
const SLUG = "targeted-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const MTT = "molecular-targeted-therapy-in-india";
const PRECISION = "precision-oncology-in-india";
const HORMONE = "hormone-therapy-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const LINK =
  " Named targeted-therapy lists sit on [Targeted Therapy in India](/treatments/targeted-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Targeted therapy uses medicines designed to act on particular biological characteristics of cancer cells. HER2-targeted treatment is an important example in breast cancer, which is why HER2 testing is part of the pathological evaluation of many breast cancers.",
    `Targeted therapy uses medicines designed to act on particular biological characteristics of cancer cells. HER2-targeted treatment is an important example in breast cancer, which is why HER2 testing is part of the pathological evaluation of many breast cancers.${LINK}`,
  ],
  [
    "The National Cancer Institute identifies surgery, chemotherapy, radiation therapy, targeted therapy and immunotherapy among the major treatment modalities for colon cancer, with treatment selected according to stage and individual disease characteristics.",
    `The National Cancer Institute identifies surgery, chemotherapy, radiation therapy, targeted therapy and immunotherapy among the major treatment modalities for colon cancer, with treatment selected according to stage and individual disease characteristics.${LINK}`,
  ],
  [
    "**Ovarian cancer treatment in India typically involves surgery and chemotherapy, with targeted medicines used for selected patients based on tumor characteristics and genetic or molecular testing.**",
    `**Ovarian cancer treatment in India typically involves surgery and chemotherapy, with targeted medicines used for selected patients based on tumor characteristics and genetic or molecular testing.**${LINK}`,
  ],
  [
    "[Targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is designed to act against particular molecular abnormalities. Named molecular-matched lists sit on [Molecular Targeted Therapy in India](/treatments/molecular-targeted-therapy-in-india).",
    `[Targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is designed to act against particular molecular abnormalities. Named molecular-matched lists sit on [Molecular Targeted Therapy in India](/treatments/molecular-targeted-therapy-in-india).${LINK}`,
  ],
  [
    "No. Some leukemias, particularly many cases of CML and selected CLL, may initially be managed predominantly with targeted oral medicines or observation.",
    `No. Some leukemias, particularly many cases of CML and selected CLL, may initially be managed predominantly with targeted oral medicines or observation.${LINK}`,
  ],
  [
    "The cost of lymphoma treatment in India can vary substantially because treatment may range from a limited course of chemotherapy or radiotherapy to prolonged targeted therapy, transplantation or cellular therapy.",
    `The cost of lymphoma treatment in India can vary substantially because treatment may range from a limited course of chemotherapy or radiotherapy to prolonged targeted therapy, transplantation or cellular therapy.${LINK}`,
  ],
  [
    "Unlike conventional chemotherapy, which can affect many rapidly dividing cells, targeted therapies are designed around a particular biological target. Depending on the cancer and biomarker, these treatments may be used alone or combined with chemotherapy, immunotherapy, hormone therapy, radiation therapy, or surgery. Named endocrine-therapy lists sit on [Hormone Therapy in India](/treatments/hormone-therapy-in-india).",
    `Unlike conventional chemotherapy, which can affect many rapidly dividing cells, targeted therapies are designed around a particular biological target. Depending on the cancer and biomarker, these treatments may be used alone or combined with chemotherapy, immunotherapy, hormone therapy, radiation therapy, or surgery. Named endocrine-therapy lists sit on [Hormone Therapy in India](/treatments/hormone-therapy-in-india).${LINK}`,
  ],
  [
    "Neighbouring [molecular targeted therapy](/costs/India/Medical-Oncology/Molecular-Targeted-Therapy) is **$10,000–$32,000**, typically **Oral or infusion by mutation**. Neighbouring [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is **$8,000–$30,000**. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**. Neighbouring [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) is **$15,000–$45,000**. Neighbouring [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy) is **$1,000–$4,500**. Neighbouring [antibody-drug conjugate therapy](/costs/India/Medical-Oncology/Antibody-Drug-Conjugate-Therapy) is **$25,000–$70,000**. Neighbouring [immune checkpoint inhibitor therapy](/costs/India/Medical-Oncology/Immune-Checkpoint-Inhibitor-Therapy) is **$18,000–$50,000**.",
    `Neighbouring [molecular targeted therapy](/costs/India/Medical-Oncology/Molecular-Targeted-Therapy) is **$10,000–$32,000**, typically **Oral or infusion by mutation**. Neighbouring [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy) is **$8,000–$30,000**. Neighbouring [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) is **$1,500–$8,000+**. Neighbouring [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) is **$15,000–$45,000**. Neighbouring [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy) is **$1,000–$4,500**. Neighbouring [antibody-drug conjugate therapy](/costs/India/Medical-Oncology/Antibody-Drug-Conjugate-Therapy) is **$25,000–$70,000**. Neighbouring [immune checkpoint inhibitor therapy](/costs/India/Medical-Oncology/Immune-Checkpoint-Inhibitor-Therapy) is **$18,000–$50,000**.${LINK}`,
  ],
  [
    "Targeted therapy is designed to act on particular molecular abnormalities or biological pathways in cancer cells.",
    `Targeted therapy is designed to act on particular molecular abnormalities or biological pathways in cancer cells.${LINK}`,
  ],
  [
    "Prostate cancer treatment in India is planned according to the cancer’s **stage, Grade Group/Gleason score, PSA level, imaging findings, overall health, life expectancy, and treatment goals**. Depending on these factors, treatment may involve [active surveillance](/blogs/active-surveillance-prostate-cancer), [radical prostatectomy](/costs/India/Surgical-Oncology/Radical-Prostatectomy), [radiation therapy](/costs/India/Radiation-Oncology/EBRT) ([External Beam Radiotherapy in India](/treatments/external-beam-radiotherapy-in-india)), [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy), [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy), [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy), [radiopharmaceutical therapy](/blogs/lutetium-177-psma-therapy-in-india), or a combination of treatments.",
    `Prostate cancer treatment in India is planned according to the cancer’s **stage, Grade Group/Gleason score, PSA level, imaging findings, overall health, life expectancy, and treatment goals**. Depending on these factors, treatment may involve [active surveillance](/blogs/active-surveillance-prostate-cancer), [radical prostatectomy](/costs/India/Surgical-Oncology/Radical-Prostatectomy), [radiation therapy](/costs/India/Radiation-Oncology/EBRT) ([External Beam Radiotherapy in India](/treatments/external-beam-radiotherapy-in-india)), [hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy), [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy), [targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy), [radiopharmaceutical therapy](/blogs/lutetium-177-psma-therapy-in-india), or a combination of treatments.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "b0d4f2c8-9e73-4537-a48b-407c13236e90",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Targeted Therapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Targeted Therapy",
  category: "Targeted Therapy",
  image: "/uploads/treatments/tt-hero.webp",
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
    "targeted-therapy",
    "molecular-targeted-therapy",
    "precision-oncology",
    "chemotherapy",
    "immunotherapy",
    "hormone-therapy",
    "antibody-drug-conjugate-therapy",
    "immune-checkpoint-inhibitor-therapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    COLON,
    OVARIAN,
    PROSTATE,
    PANCREAS,
    LEUKEMIA,
    LYMPHOMA,
    MTT,
    PRECISION,
    HORMONE,
    ADJUVANT,
    "neoadjuvant-chemotherapy-in-india",
    "bile-duct-cancer-surgery-in-india",
    "external-beam-radiotherapy-in-india",
    "intensity-modulated-radiation-therapy-in-india",
    "image-guided-radiation-therapy-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 88,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Targeted Therapy in India",
      shortDescription:
        "Targeted therapy in India matches medicines to tumour biomarkers. GAF planning is $8,000–$30,000, typically oral or infusion over months.",
      editorialBody: body,
      process: [
        {
          id: "tt-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, immunohistochemistry and any molecular reports before anyone books travel.",
        },
        {
          id: "tt-step-2",
          title: "Name the clinical question",
          description:
            "A medical oncologist decides whether a focused assay, a broader panel or no India list is the honest next step.",
        },
        {
          id: "tt-step-3",
          title: "Confirm the target",
          description:
            "The team checks whether an actionable biomarker is documented and whether the sample is still adequate.",
        },
        {
          id: "tt-step-4",
          title: "Itemised estimate",
          description:
            "GAF targeted-therapy planning is $8,000–$30,000. Neighbouring molecular targeted therapy is $10,000–$32,000 when a mutation-matched product is named.",
        },
        {
          id: "tt-step-5",
          title: "Select the medicine",
          description:
            "An oral inhibitor, antibody, ADC or another pathway medicine is chosen from the cancer biology and evidence.",
        },
        {
          id: "tt-step-6",
          title: "Start and monitor",
          description:
            "Tablets or infusions begin with a written schedule for laboratory, blood-pressure, skin or cardiac checks as required.",
        },
        {
          id: "tt-step-7",
          title: "Transfer home",
          description:
            "Most patients continue oral medicine or scheduled infusions at home after a stable plan is documented.",
        },
        {
          id: "tt-step-8",
          title: "Review resistance",
          description:
            "If the cancer progresses, the team considers repeat testing, another targeted line or a different class of treatment.",
        },
      ],
      preparation:
        "Share the original pathology report and any molecular results so the team can judge whether a targeted medicine can change the plan.",
      recovery:
        "Treatment is usually outpatient. Fever, severe diarrhoea, chest pain, breathlessness or a rapidly worsening rash belongs in a local emergency department.",
      hospitalStay: "Oral or infusion · months of therapy. Usually outpatient.",
      recoveryPeriod:
        "Duration depends on the drug, response and tolerance. Resistance can change the next line.",
      followUp:
        "Request a written plan that names the target, medicine, monitoring and who will continue prescribing at home.",
      importantConsiderations:
        "A mutation is not automatically a prescription. GAF planning is $8,000–$30,000. Severe symptoms belong in a local emergency department.",
      treatmentType: "Targeted Therapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology programmes in India",
      technology:
        "Oral inhibitors, monoclonal antibodies, ADCs and neighbouring precision-oncology and molecular-targeted-therapy sheets",
      searchKeywords: [
        "Targeted Therapy in India",
        "targeted cancer treatment in India",
        "targeted therapy cost in India",
        "targeted therapy drugs",
        "precision oncology in India",
        "molecular targeted therapy",
        "targeted therapy for cancer",
        "targeted therapy side effects",
        "biomarker testing India",
        "HER2 targeted therapy India",
        "EGFR inhibitor India",
        "PARP inhibitor India",
      ],
      faqs: [
        {
          id: "tt-faq-1",
          question: "What is targeted therapy for cancer?",
          answer:
            "A treatment designed to interfere with specific molecules, proteins or pathways involved in cancer growth and survival.",
        },
        {
          id: "tt-faq-2",
          question: "How much does targeted therapy cost in India?",
          answer:
            "GAF Healthcare planning is $8,000–$30,000, typically oral or infusion over months. US comparison is $80,000–$160,000.",
        },
        {
          id: "tt-faq-3",
          question: "Is targeted therapy the same as chemotherapy?",
          answer:
            "No. They work differently, although they may be used together depending on the cancer and clinical situation.",
        },
        {
          id: "tt-faq-4",
          question: "Does every cancer patient qualify?",
          answer:
            "No. Eligibility often depends on biomarkers or other characteristics of the cancer and on whether an appropriate drug exists.",
        },
        {
          id: "tt-faq-5",
          question: "Is genetic testing required?",
          answer:
            "Often, particularly when treatment selection depends on a specific mutation, fusion, amplification or other biomarker.",
        },
        {
          id: "tt-faq-6",
          question: "How is targeted therapy given?",
          answer:
            "Depending on the drug, it may be an oral tablet or capsule, or an intravenous treatment in a day-care unit.",
        },
        {
          id: "tt-faq-7",
          question: "Does targeted therapy have side effects?",
          answer:
            "Yes. Side effects vary substantially according to the drug and target and can include rash, diarrhoea, liver changes or infusion reactions.",
        },
        {
          id: "tt-faq-8",
          question: "What happens if targeted therapy stops working?",
          answer:
            "The team may investigate resistance with imaging or repeat molecular testing and then consider another targeted line or a different class of treatment.",
        },
        {
          id: "tt-faq-9",
          question: "What if no actionable mutation is found?",
          answer:
            "Treatment can still be possible. A negative result does not mean that cancer treatment has ended.",
        },
        {
          id: "tt-faq-10",
          question: "Is targeted therapy the same as precision oncology?",
          answer:
            "No. Precision oncology is the testing and interpretation layer. Targeted therapy is a medicine once a target is named.",
        },
        {
          id: "tt-faq-11",
          question: "Can it be combined with immunotherapy or hormone therapy?",
          answer:
            "Yes, in selected cancers when evidence supports the combination. Sequence is a multidisciplinary decision.",
        },
        {
          id: "tt-faq-12",
          question: "Does targeted therapy cause hair loss?",
          answer:
            "Hair loss is not inevitable. Some medicines change hair colour or texture; others do not.",
        },
        {
          id: "tt-faq-13",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, severe diarrhoea, chest pain, breathlessness, collapse or a rapidly worsening rash belongs in a local emergency department.",
        },
        {
          id: "tt-faq-14",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. Feasibility depends on the biomarker, medicine availability and a plan for continuing care at home.",
        },
        {
          id: "tt-faq-15",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can prescribe and monitor the named medicine.",
        },
        {
          id: "tt-faq-16",
          question: "Does targeted therapy cure cancer?",
          answer:
            "Sometimes it can contribute to long-term remission or cure in particular settings. In other situations it is used for disease control.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a targeted medicine docking onto a receptor on a tumour cell",
      seoTitle: "Targeted Therapy in India: Cost, Types, Drugs, Benefits & Treatment Process",
      metaDescription:
        "Explore targeted therapy in India, including how it works, biomarker testing, targeted drugs, cancer types, treatment cost, side effects, eligibility, and how to choose a cancer centre.",
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
  LYMPHOMA,
  MTT,
  PRECISION,
  HORMONE,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Hormone Therapy in India](https://gaf.healthcare/treatments/hormone-therapy-in-india).",
    ", [Hormone Therapy in India](https://gaf.healthcare/treatments/hormone-therapy-in-india) and [Targeted Therapy in India](https://gaf.healthcare/treatments/targeted-therapy-in-india).",
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
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/molecular-targeted-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/precision-oncology-treatment-body.md"));
patchMarkdown(resolve("scripts/hormone-therapy-treatment-body.md"));
