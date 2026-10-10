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

const body = readFileSync(resolve("scripts/immunotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "immunotherapy-in-india");
const now = "2026-10-03T14:00:00.000Z";
const SLUG = "immunotherapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const TARGETED = "targeted-therapy-in-india";
const PRECISION = "precision-oncology-in-india";
const HORMONE = "hormone-therapy-in-india";
const CART = "car-t-cell-therapy-in-india";
const DENDRITIC = "dendritic-cell-therapy-in-india";
const LINK =
  " Named immunotherapy lists sit on [Immunotherapy in India](/treatments/immunotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Immunotherapy uses medicines that modify the immune response against cancer. It is not appropriate for every breast cancer patient. Its role depends on breast cancer subtype, stage, biomarkers, previous treatment, treatment setting and overall clinical situation. When used, it may be administered through repeated outpatient infusions according to the selected protocol.",
    `Immunotherapy uses medicines that modify the immune response against cancer. It is not appropriate for every breast cancer patient. Its role depends on breast cancer subtype, stage, biomarkers, previous treatment, treatment setting and overall clinical situation. When used, it may be administered through repeated outpatient infusions according to the selected protocol.${LINK}`,
  ],
  [
    "* A patient with MSI-H/dMMR disease may have immunotherapy as a key treatment option.",
    `* A patient with MSI-H/dMMR disease may have immunotherapy as a key treatment option.${LINK}`,
  ],
  [
    "Treatment is generally systemic and may include chemotherapy, immunotherapy and targeted therapy. Radiation can also be used for symptom control or selected metastatic sites.",
    `Treatment is generally systemic and may include chemotherapy, immunotherapy and targeted therapy. Radiation can also be used for symptom control or selected metastatic sites.${LINK}`,
  ],
  [
    "Depending on the subtype, immunotherapy may include monoclonal antibodies, checkpoint inhibitors and other immune-directed therapies. Rituximab targets CD20 and is an important component of treatment for many CD20-positive B-cell lymphomas. Checkpoint inhibitors such as nivolumab and pembrolizumab have roles in selected Hodgkin lymphoma settings.",
    `Depending on the subtype, immunotherapy may include monoclonal antibodies, checkpoint inhibitors and other immune-directed therapies. Rituximab targets CD20 and is an important component of treatment for many CD20-positive B-cell lymphomas. Checkpoint inhibitors such as nivolumab and pembrolizumab have roles in selected Hodgkin lymphoma settings.${LINK}`,
  ],
  [
    "[Immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) on this site is the broader checkpoint and antibody family. [Colon Cancer Immunotherapy in India](/blogs/colon-cancer-immunotherapy-in-india) explains MSI-H/dMMR checkpoint use in colon cancer. That is **not** a dendritic-cell vaccine.",
    `[Immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) on this site is the broader checkpoint and antibody family. [Colon Cancer Immunotherapy in India](/blogs/colon-cancer-immunotherapy-in-india) explains MSI-H/dMMR checkpoint use in colon cancer. That is **not** a dendritic-cell vaccine.${LINK}`,
  ],
  [
    "Targeted therapy acts on a specific molecular pathway, protein or alteration associated with cancer. Immunotherapy uses or modifies the immune system to help recognise and attack cancer.",
    `Targeted therapy acts on a specific molecular pathway, protein or alteration associated with cancer. Immunotherapy uses or modifies the immune system to help recognise and attack cancer.${LINK}`,
  ],
  [
    "This does not mean abandoning established treatments such as surgery, chemotherapy, radiation therapy, hormone therapy or immunotherapy. Named endocrine-therapy lists sit on [Hormone Therapy in India](/treatments/hormone-therapy-in-india).",
    `This does not mean abandoning established treatments such as surgery, chemotherapy, radiation therapy, hormone therapy or immunotherapy. Named endocrine-therapy lists sit on [Hormone Therapy in India](/treatments/hormone-therapy-in-india).${LINK}`,
  ],
  [
    "Named [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) is **$15,000–$45,000**. Neighbouring [antibody-drug conjugate therapy](/costs/India/Medical-Oncology/Antibody-Drug-Conjugate-Therapy) is **$25,000–$70,000**.",
    `Named [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) is **$15,000–$45,000**. Neighbouring [antibody-drug conjugate therapy](/costs/India/Medical-Oncology/Antibody-Drug-Conjugate-Therapy) is **$25,000–$70,000**.${LINK}`,
  ],
  [
    "**4. Bridging treatment when required.** Some patients need chemotherapy, targeted therapy or immunotherapy while cells are manufactured. Not every patient needs bridging.",
    `**4. Bridging treatment when required.** Some patients need chemotherapy, targeted therapy or immunotherapy while cells are manufactured. Not every patient needs bridging.${LINK}`,
  ],
  [
    "Cancer treatment is often multimodal and may combine surgery, radiation therapy, chemotherapy, targeted therapy, immunotherapy and hormone therapy depending on the individual case. Neighbouring matched-medicine lists sit on [molecular targeted therapy in India](/treatments/molecular-targeted-therapy-in-india). Genomic-testing lists sit on [precision oncology in India](/treatments/precision-oncology-in-india).",
    `Cancer treatment is often multimodal and may combine surgery, radiation therapy, chemotherapy, targeted therapy, immunotherapy and hormone therapy depending on the individual case. Neighbouring matched-medicine lists sit on [molecular targeted therapy in India](/treatments/molecular-targeted-therapy-in-india). Genomic-testing lists sit on [precision oncology in India](/treatments/precision-oncology-in-india).${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "c1e5a3d9-0f84-5648-b59c-518d24347f01",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Immunotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Immunotherapy",
  category: "Immunotherapy",
  image: "/uploads/treatments/io-hero.webp",
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
    "immunotherapy",
    "immune-checkpoint-inhibitor-therapy",
    "car-t-cell-therapy",
    "dendritic-cell-therapy",
    "chemotherapy",
    "targeted-therapy",
    "precision-oncology",
    "hormone-therapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    COLON,
    CERVICAL,
    "prostate-cancer-treatment-in-india",
    "ovarian-cancer-treatment-in-india",
    LEUKEMIA,
    LYMPHOMA,
    TARGETED,
    "molecular-targeted-therapy-in-india",
    PRECISION,
    HORMONE,
    CART,
    DENDRITIC,
    "adjuvant-chemotherapy-in-india",
    "neoadjuvant-chemotherapy-in-india",
    "external-beam-radiotherapy-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 89,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Immunotherapy in India",
      shortDescription:
        "Immunotherapy in India helps the immune system recognise cancer. GAF planning is $15,000–$45,000, typically outpatient every 2–6 weeks.",
      editorialBody: body,
      process: [
        {
          id: "io-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, immunohistochemistry, PD-L1 or MSI/MMR reports and imaging before anyone books travel.",
        },
        {
          id: "io-step-2",
          title: "Confirm the indication",
          description:
            "A medical oncologist decides whether a checkpoint inhibitor, antibody, cellular therapy or no India list is the honest next step.",
        },
        {
          id: "io-step-3",
          title: "Review biomarkers",
          description:
            "The team checks whether PD-L1, MSI/MMR or another marker is documented and whether the sample is still adequate.",
        },
        {
          id: "io-step-4",
          title: "Itemised estimate",
          description:
            "GAF immunotherapy planning is $15,000–$45,000. Neighbouring checkpoint-inhibitor therapy is $18,000–$50,000 when that product is named.",
        },
        {
          id: "io-step-5",
          title: "Select the medicine",
          description:
            "A checkpoint inhibitor, antibody or cellular therapy is chosen from the cancer biology, stage and evidence.",
        },
        {
          id: "io-step-6",
          title: "Start and monitor",
          description:
            "Infusions begin with a written schedule for laboratory, thyroid, liver and immune-related-symptom checks.",
        },
        {
          id: "io-step-7",
          title: "Transfer home",
          description:
            "Most checkpoint patients continue scheduled infusions at home after a stable plan is documented.",
        },
        {
          id: "io-step-8",
          title: "Review response",
          description:
            "If the cancer progresses or toxicity is unacceptable, the team considers another systemic line or a different class of treatment.",
        },
      ],
      preparation:
        "Share the original pathology report and any PD-L1 or MSI/MMR results so the team can judge whether immunotherapy can change the plan.",
      recovery:
        "Treatment is usually outpatient. New breathlessness, severe diarrhoea, chest pain, confusion, high fever or a rapidly worsening rash belongs in a local emergency department.",
      hospitalStay: "Outpatient q2–6 weeks. Usually day-care infusion.",
      recoveryPeriod:
        "Duration depends on the drug, response and tolerance. Immune-related effects can appear after treatment ends.",
      followUp:
        "Request a written plan that names the medicine, interval, monitoring and who will continue treatment at home.",
      importantConsiderations:
        "A biomarker is not automatically a prescription. GAF planning is $15,000–$45,000. Severe symptoms belong in a local emergency department.",
      treatmentType: "Immunotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology programmes in India",
      technology:
        "Checkpoint inhibitors, monoclonal antibodies and neighbouring CAR-T and dendritic-cell therapy sheets",
      searchKeywords: [
        "Immunotherapy in India",
        "immunotherapy treatment in India",
        "immunotherapy for cancer in India",
        "cancer immunotherapy in India",
        "immunotherapy cost in India",
        "immunotherapy cost per cycle in India",
        "immunotherapy drugs in India",
        "CAR T-cell therapy in India",
        "checkpoint inhibitors in India",
        "pembrolizumab treatment in India",
        "nivolumab treatment in India",
        "PD-L1 immunotherapy",
        "cancer immunotherapy side effects",
      ],
      faqs: [
        {
          id: "io-faq-1",
          question: "Is immunotherapy better than chemotherapy?",
          answer:
            "There is no universal answer. Some cancers respond particularly well to immunotherapy, while chemotherapy remains essential for many cancers. In other situations the two are deliberately combined.",
        },
        {
          id: "io-faq-2",
          question: "Is immunotherapy available in India?",
          answer:
            "Yes. Checkpoint inhibitors and other antibody-based treatments are used in India. Selected specialist centres also provide cellular therapies such as CAR T-cell treatment.",
        },
        {
          id: "io-faq-3",
          question: "How much does immunotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $15,000–$45,000, typically Outpatient q2–6 weeks. US comparison is $100,000–$250,000. Neighbouring CAR-T cell therapy is $80,000–$180,000.",
        },
        {
          id: "io-faq-4",
          question: "How many cycles of immunotherapy are needed?",
          answer:
            "There is no standard number. The number of cycles depends on the medicine, cancer type, treatment intent, response and tolerance.",
        },
        {
          id: "io-faq-5",
          question: "Can immunotherapy completely remove cancer?",
          answer:
            "It can produce complete responses in some patients, but this does not happen in everyone. Possibility depends on cancer type, stage and tumour biology.",
        },
        {
          id: "io-faq-6",
          question: "Can immunotherapy cure stage 4 cancer?",
          answer:
            "Some patients with advanced cancer experience long-lasting disease control or complete responses. Stage 4 cancer is not automatically curable with immunotherapy.",
        },
        {
          id: "io-faq-7",
          question: "Is immunotherapy painful?",
          answer:
            "The infusion itself is generally not described as painful, although IV placement can cause temporary discomfort. Side effects may develop during or after treatment.",
        },
        {
          id: "io-faq-8",
          question: "Does immunotherapy cause hair loss?",
          answer:
            "Hair loss is generally not the defining side effect of checkpoint immunotherapy in the way it can be with some chemotherapy regimens.",
        },
        {
          id: "io-faq-9",
          question: "Can immunotherapy cause fever?",
          answer:
            "It can. Fever may reflect treatment-related immune effects or infection. High fever with collapse belongs in a local emergency department.",
        },
        {
          id: "io-faq-10",
          question: "Can immunotherapy damage the liver or thyroid?",
          answer:
            "Yes. Immune-mediated hepatitis and thyroid dysfunction are recognised complications. Some patients need long-term thyroid hormone replacement.",
        },
        {
          id: "io-faq-11",
          question: "Is CAR T-cell therapy the same as immunotherapy?",
          answer:
            "CAR T-cell therapy is a type of cellular immunotherapy. Unlike checkpoint inhibitors, it uses the patient's T cells, modifies them in a laboratory and returns them.",
        },
        {
          id: "io-faq-12",
          question: "When should I go to an emergency department?",
          answer:
            "New or worsening breathlessness, persistent or severe diarrhoea, chest pain, confusion, yellowing of the skin, high fever or a rapidly worsening rash belongs in a local emergency department.",
        },
        {
          id: "io-faq-13",
          question: "Can international patients receive immunotherapy in India?",
          answer:
            "Yes, after records review. Feasibility depends on the cancer, biomarker, medicine availability and a plan for continuing infusions or monitoring at home.",
        },
        {
          id: "io-faq-14",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can prescribe the named medicine and manage immune-related complications.",
        },
        {
          id: "io-faq-15",
          question: "Is immunotherapy available for children?",
          answer:
            "Some immunotherapies and cellular therapies are used in paediatric cancers, but eligibility depends on the specific cancer, age, treatment indication and regulatory approval.",
        },
        {
          id: "io-faq-16",
          question: "What if immunotherapy stops working?",
          answer:
            "The oncologist may consider another systemic therapy, targeted therapy, chemotherapy, radiation, surgery or a clinical trial depending on the circumstances.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a T cell approaching a tumour cell with a blocking wedge at the checkpoint",
      seoTitle: "Immunotherapy in India: Cost, Treatment, Types & Cancer Care",
      metaDescription:
        "Explore immunotherapy in India, including types, cancer indications, biomarkers, treatment process, side effects, CAR T-cell therapy and estimated costs.",
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
  LEUKEMIA,
  LYMPHOMA,
  TARGETED,
  PRECISION,
  HORMONE,
  CART,
  DENDRITIC,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Targeted Therapy in India](https://gaf.healthcare/treatments/targeted-therapy-in-india).",
    ", [Targeted Therapy in India](https://gaf.healthcare/treatments/targeted-therapy-in-india) and [Immunotherapy in India](https://gaf.healthcare/treatments/immunotherapy-in-india).",
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
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/targeted-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/precision-oncology-treatment-body.md"));
patchMarkdown(resolve("scripts/hormone-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/car-t-treatment-body.md"));
patchMarkdown(resolve("scripts/dendritic-cell-treatment-body.md"));
patchMarkdown(resolve("content/treatments/breast-cancer-treatment-in-india.md"));
