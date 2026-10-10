import { readFileSync, writeFileSync } from "node:fs";
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

const body = readFileSync(resolve("scripts/colon-treatment-body.md"), "utf8").trim();

const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
  }>;
};
const existing = store.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");

const now = "2026-09-28T17:00:00.000Z";
const SLUG = "colon-cancer-treatment-in-india";

const treatment = {
  id: existing?.id ?? "7d4e2c18-9f6a-4b31-8c50-2e91a7b4d603",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Colon Cancer Treatment in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Colon Cancer",
  category: "Colon Cancer",
  image: "/uploads/treatments/colon-anatomy-body.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-asit-arora",
    "dr-harit-kumar-chaturvedi",
    "dr-nikhil-agrawal",
    "dr-rajesh-shinde",
    "dr-narasimhaiah-srinivasaiah",
    "dr-sivaram-ganesamoni",
    "dr-vimalathithan-s",
    "dr-chinnababu-sunkavalli",
    "dr-sachin-marda",
    "dr-kishore-v-alapati",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "artemis-hospital",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "colectomy",
    "colorectal-cancer-surgery",
    "rectal-cancer-surgery",
    "liver-resection-hepatectomy",
    "cytoreductive-surgery",
    "cytoreductive-surgery-with-hipec",
    "chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "colonoscopy",
    "external-beam-radiotherapy-ebrt",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [
    "breast-cancer-treatment-in-india",
    "prostate-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 3,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Colon Cancer Treatment in India",
      shortDescription:
        "Colon cancer treatment in India is planned from stage, pathology and molecular profile — colectomy, chemotherapy, targeted therapy or immunotherapy — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "colon-step-1",
          title: "Share medical records",
          description:
            "The patient provides colonoscopy, biopsy, CEA, staging CT or PET-CT, molecular reports and previous treatment records.",
        },
        {
          id: "colon-step-2",
          title: "Specialist review",
          description:
            "A colorectal surgeon, GI surgical oncologist or medical oncologist reviews the diagnosis and stage.",
        },
        {
          id: "colon-step-3",
          title: "Confirmation of diagnosis",
          description:
            "Pathology may be reviewed in India. Additional MSI/MMR, RAS, BRAF or HER2 testing may be requested.",
        },
        {
          id: "colon-step-4",
          title: "Complete staging",
          description:
            "Imaging and laboratory investigations determine whether the cancer is localised, nodal or metastatic.",
        },
        {
          id: "colon-step-5",
          title: "Multidisciplinary planning",
          description:
            "Surgery, medical oncology, radiology and pathology decide whether the objective is curative resection, adjuvant therapy or systemic control.",
        },
        {
          id: "colon-step-6",
          title: "Hospital and doctor selection",
          description:
            "The patient can review colorectal, hepatobiliary and medical oncology teams according to the planned pathway.",
        },
        {
          id: "colon-step-7",
          title: "Treatment estimate",
          description:
            "The hospital provides an itemized estimate based on surgery, medicines, molecular tests and expected stay — not a brochure package.",
        },
        {
          id: "colon-step-8",
          title: "Travel planning",
          description:
            "The patient arranges visa, flights, accommodation and the expected length of stay for surgery or systemic cycles.",
        },
        {
          id: "colon-step-9",
          title: "Treatment",
          description:
            "The planned treatment is carried out — endoscopic removal, colectomy, chemotherapy, targeted therapy, immunotherapy or selected metastasis surgery.",
        },
        {
          id: "colon-step-10",
          title: "Recovery and follow-up",
          description:
            "Patients receive a written summary covering pathology, stage, treatment delivered and the recommended CEA and colonoscopy schedule.",
        },
      ],
      preparation:
        "Share colonoscopy, biopsy slides or blocks, CEA, staging CT, MRI or PET-CT, and molecular reports before travel so the colorectal team can propose a sequence and an itemized estimate.",
      recovery:
        "Hospital stay after colectomy is often 5–10 nights. The trip lengthens for stoma teaching, adjuvant chemotherapy cycles or liver-metastasis surgery rather than the inpatient bed alone.",
      hospitalStay: "Surgery 5–10 nights; chemotherapy is usually outpatient",
      recoveryPeriod:
        "Two to eight weeks in India if early recovery, stoma teaching or the first systemic cycles are completed before travel home",
      followUp:
        "Request a written summary covering diagnosis, stage, surgery delivered, systemic therapy, molecular findings and the recommended CEA and colonoscopy schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Do not add every line together. The treating team confirms the sequence after records review. Radiation is not routine for most colon cancers.",
      treatmentType: "Multidisciplinary colorectal oncology pathway",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Open, laparoscopic or robotic colectomy, molecular testing, systemic medicines and selected liver-directed or peritoneal surgery as indicated",
      searchKeywords: [
        "colon cancer treatment in India",
        "colectomy cost in India",
        "colorectal cancer surgery India",
        "colon cancer chemotherapy India",
        "MSI-H colon cancer immunotherapy",
        "colon cancer hospitals Delhi NCR",
        "colon cancer treatment Mumbai",
        "international colon cancer treatment India",
      ],
      faqs: [
        {
          id: "colon-faq-1",
          question: "Is colon cancer treatable in India?",
          answer:
            "Yes. India has hospitals providing surgery, chemotherapy, targeted therapy, immunotherapy, radiation therapy when indicated and multidisciplinary cancer care. Treatment depends on the individual stage and tumour characteristics.",
        },
        {
          id: "colon-faq-2",
          question: "Is surgery necessary for colon cancer?",
          answer:
            "Surgery is the primary treatment for many localized colon cancers. However, the timing and role of surgery can vary in advanced disease.",
        },
        {
          id: "colon-faq-3",
          question: "Is chemotherapy required after colon cancer surgery?",
          answer:
            "It depends on the stage and pathological risk. It is commonly recommended for Stage III disease and may be considered for selected high-risk Stage II cancers.",
        },
        {
          id: "colon-faq-4",
          question: "Is radiation therapy required for colon cancer?",
          answer:
            "Radiation is not routinely used for most colon cancers. It has a more established role in rectal cancer but may be considered in selected colon cancer situations.",
        },
        {
          id: "colon-faq-5",
          question: "Can Stage IV colon cancer be treated?",
          answer:
            "Yes. Treatment can include systemic therapy, targeted therapy, immunotherapy and, in selected patients, surgery or local treatment of metastases.",
        },
        {
          id: "colon-faq-6",
          question: "Can colon cancer spread to the liver?",
          answer:
            "Yes. The liver is one of the most common sites of metastatic colorectal cancer.",
        },
        {
          id: "colon-faq-7",
          question: "Can liver metastases from colon cancer be removed?",
          answer:
            "In selected patients, yes. Resectability depends on the number, size and location of lesions, liver reserve and the presence of disease elsewhere.",
        },
        {
          id: "colon-faq-8",
          question: "What is MSI-H colon cancer?",
          answer:
            "MSI-H means microsatellite instability-high. It is a molecular characteristic that can make a tumour more responsive to certain immunotherapies.",
        },
        {
          id: "colon-faq-9",
          question: "What is dMMR colon cancer?",
          answer:
            "dMMR means deficient mismatch repair. It indicates impairment in the DNA mismatch-repair system and is closely related to MSI status.",
        },
        {
          id: "colon-faq-10",
          question: "What is CEA?",
          answer:
            "CEA is a tumour marker that can be used as part of colorectal cancer monitoring. It is not sufficiently specific to diagnose colon cancer by itself.",
        },
        {
          id: "colon-faq-11",
          question: "Is robotic surgery better than open surgery?",
          answer:
            "Robotic surgery is not automatically better for every patient. The appropriate surgical approach depends on tumour characteristics, anatomy, surgeon expertise and the patient's clinical condition.",
        },
        {
          id: "colon-faq-12",
          question: "How long does colon cancer treatment take in India?",
          answer:
            "There is no single timeline. Surgery may require several days of hospitalisation followed by recovery, while chemotherapy can extend over several months. Advanced disease may require longer-term systemic treatment.",
        },
        {
          id: "colon-faq-13",
          question: "How much does colon cancer treatment cost in India?",
          answer:
            "There is no single total price. Current GAF planning ranges include approximately $7,000–$18,000 for colectomy, $8,000–$20,000 for colorectal cancer surgery, $200–$550 for colonoscopy, $1,500–$8,000+ for chemotherapy, $8,000–$30,000 for targeted therapy, $15,000–$45,000 for immunotherapy and $10,000–$26,000 for selected liver resection. These are planning ranges rather than individual hospital quotations.",
        },
        {
          id: "colon-faq-14",
          question: "Can I get a second opinion in India?",
          answer:
            "Yes. A second opinion can be particularly useful when the treatment plan involves major surgery, advanced metastatic disease, complex molecular findings or multiple treatment options.",
        },
        {
          id: "colon-faq-15",
          question: "Should I bring my pathology slides to India?",
          answer:
            "If available, bringing pathology slides and/or paraffin tissue blocks can be useful because the Indian pathology team may recommend a review before final treatment planning.",
        },
      ],
      imageAlt:
        "Transparent adult body showing the colon in teal with a gold tumour overlay used to explain colon cancer anatomy",
      seoTitle: "Colon Cancer Treatment in India: Surgery, Chemo, Cost and Care",
      metaDescription:
        "Colon cancer treatment in India is planned from stage and molecular tests — colectomy, chemotherapy, targeted therapy or immunotherapy. USD planning ranges and records to send first.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

for (const sibling of store.treatments) {
  if (sibling.slug === SLUG) continue;
  if (
    sibling.slug === "breast-cancer-treatment-in-india" ||
    sibling.slug === "prostate-cancer-treatment-in-india"
  ) {
    sibling.relatedTreatmentSlugs ??= [];
    if (!sibling.relatedTreatmentSlugs.includes(SLUG)) {
      sibling.relatedTreatmentSlugs.unshift(SLUG);
    }
  }
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [prostate cancer treatment in India](https://gaf.healthcare/treatments/prostate-cancer-treatment-in-india).",
    ", [prostate cancer treatment in India](https://gaf.healthcare/treatments/prostate-cancer-treatment-in-india) and [colon cancer treatment in India](https://gaf.healthcare/treatments/colon-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
