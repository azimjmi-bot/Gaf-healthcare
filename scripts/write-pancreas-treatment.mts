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

const body = readFileSync(resolve("scripts/pancreas-treatment-body.md"), "utf8").trim();

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
const existing = store.treatments.find((row) => row.slug === "pancreatic-cancer-treatment-in-india");

const now = "2026-09-28T21:30:00.000Z";
const SLUG = "pancreatic-cancer-treatment-in-india";

const treatment = {
  id: existing?.id ?? "a8c3e91f-4b2d-4e70-9f16-6d5a8c2b1e47",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Pancreatic Cancer Treatment in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Pancreatic Cancer",
  category: "Pancreatic Cancer",
  image: "/uploads/treatments/pancreas-anatomy-body.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-asit-arora",
    "dr-nikhil-agrawal",
    "dr-adarsh-chaudhary",
    "dr-rajesh-shinde",
    "dr-shailesh-shrikhande",
    "dr-sanjay-govil",
    "dr-g-parthasarathy",
    "dr-j-k-a-jameel",
    "dr-venugopal-kota",
    "dr-sachin-daga",
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
    "whipple-procedure",
    "pancreatic-surgery",
    "whipple-procedure-pancreaticoduodenectomy",
    "distal-pancreatectomy",
    "pancreatectomy",
    "chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "precision-oncology",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "stereotactic-body-radiotherapy-sbrt",
    "endoscopic-ultrasound-eus",
    "ercp",
    "biliary-stenting",
    "liver-resection-hepatectomy",
  ],
  relatedTreatmentSlugs: [
    "colon-cancer-treatment-in-india",
    "breast-cancer-treatment-in-india",
    "prostate-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 4,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Pancreatic Cancer Treatment in India",
      shortDescription:
        "Pancreatic cancer treatment in India is planned from resectability, stage and molecular profile — Whipple surgery, chemotherapy, radiation or biomarker-directed care — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "pancreas-step-1",
          title: "Share medical records",
          description:
            "The patient provides CT or MRI/MRCP, EUS, biopsy, CA 19-9, molecular reports and previous treatment records.",
        },
        {
          id: "pancreas-step-2",
          title: "Specialist review",
          description:
            "A pancreatic or HPB surgeon, GI surgical oncologist or medical oncologist reviews the diagnosis and resectability.",
        },
        {
          id: "pancreas-step-3",
          title: "Confirmation of diagnosis",
          description:
            "Pathology may be reviewed in India. Additional EUS, biopsy or molecular testing may be requested before systemic therapy.",
        },
        {
          id: "pancreas-step-4",
          title: "Staging and resectability",
          description:
            "Imaging determines whether the cancer is resectable, borderline resectable, locally advanced or metastatic.",
        },
        {
          id: "pancreas-step-5",
          title: "Multidisciplinary planning",
          description:
            "Surgery, medical oncology, radiation oncology, gastroenterology and pathology decide whether the objective is resection, neoadjuvant therapy or systemic control.",
        },
        {
          id: "pancreas-step-6",
          title: "Hospital and doctor selection",
          description:
            "The patient can review pancreatic, HPB and medical oncology teams according to the planned pathway.",
        },
        {
          id: "pancreas-step-7",
          title: "Treatment estimate",
          description:
            "The hospital provides an itemized estimate based on surgery, medicines, biliary procedures and expected stay — not a brochure package.",
        },
        {
          id: "pancreas-step-8",
          title: "Travel planning",
          description:
            "The patient arranges visa, flights, accommodation and the expected length of stay for surgery or systemic cycles.",
        },
        {
          id: "pancreas-step-9",
          title: "Treatment",
          description:
            "The planned treatment is carried out — Whipple or distal pancreatectomy, chemotherapy, radiation, targeted therapy, immunotherapy or supportive procedures.",
        },
        {
          id: "pancreas-step-10",
          title: "Recovery and follow-up",
          description:
            "Patients receive a written summary covering pathology, resectability, treatment delivered and the recommended imaging, CA 19-9, nutrition and diabetes schedule.",
        },
      ],
      preparation:
        "Share contrast CT or MRI/MRCP, EUS, biopsy slides or blocks, CA 19-9, and molecular reports before travel so the pancreatic team can propose a sequence and an itemized estimate.",
      recovery:
        "Hospital stay after Whipple surgery is often 10–18 nights. The trip lengthens for enzyme teaching, diabetes management, adjuvant chemotherapy cycles or biliary procedures rather than the inpatient bed alone.",
      hospitalStay: "Surgery 10–18 nights; chemotherapy is usually outpatient",
      recoveryPeriod:
        "Several weeks to months in India if early recovery, enzyme replacement, diabetes teaching or the first systemic cycles are completed before travel home",
      followUp:
        "Request a written summary covering diagnosis, resectability, surgery delivered, systemic therapy, molecular findings and the recommended CA 19-9 and imaging schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Do not add every line together. The treating team confirms the sequence after records review. Whipple cost is not the total pancreatic-cancer treatment cost.",
      treatmentType: "Multidisciplinary pancreatic oncology pathway",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Whipple procedure, distal or total pancreatectomy, molecular testing, systemic medicines, selected radiation and biliary drainage as indicated",
      searchKeywords: [
        "pancreatic cancer treatment in India",
        "pancreatic cancer treatment cost in India",
        "pancreatic cancer surgery in India",
        "Whipple surgery in India",
        "Whipple procedure cost in India",
        "pancreatic cancer hospitals in India",
        "stage 4 pancreatic cancer treatment in India",
        "pancreatic cancer treatment for international patients",
      ],
      faqs: [
        {
          id: "pancreas-faq-1",
          question: "What is the best treatment for pancreatic cancer in India?",
          answer:
            "There is no single treatment that is best for every patient. Treatment depends on the type and stage of pancreatic cancer, whether the tumor is resectable, the patient's overall health and the molecular characteristics of the disease.",
        },
        {
          id: "pancreas-faq-2",
          question: "How much does pancreatic cancer treatment cost in India?",
          answer:
            "There is no single total price. Current GAF planning ranges include approximately $14,000–$32,000 for a Whipple procedure, $9,000–$22,000 for distal pancreatectomy, $12,000–$30,000 for pancreatic surgery, $1,500–$8,000+ for chemotherapy, $8,000–$30,000 for targeted therapy, $15,000–$45,000 for immunotherapy, $400–$1,400 for EUS and $1,500–$4,200 for ERCP. These are planning ranges rather than individual hospital quotations.",
        },
        {
          id: "pancreas-faq-3",
          question: "What is a Whipple procedure?",
          answer:
            "The Whipple procedure, or pancreaticoduodenectomy, is a major operation commonly performed for tumors located in the head of the pancreas. It can involve removal of the pancreatic head, duodenum, gallbladder, part of the bile duct and nearby lymph nodes, followed by reconstruction of the digestive system.",
        },
        {
          id: "pancreas-faq-4",
          question: "Can pancreatic cancer be cured with surgery?",
          answer:
            "Surgery can potentially provide long-term disease control or cure for selected patients whose cancer can be completely removed. However, pancreatic cancer can recur even after apparently complete surgery, so surgery is generally considered together with chemotherapy and long-term surveillance.",
        },
        {
          id: "pancreas-faq-5",
          question: "Is chemotherapy necessary after pancreatic cancer surgery?",
          answer:
            "Chemotherapy is commonly recommended after pancreatic cancer surgery because of the risk of microscopic disease and recurrence. The exact regimen depends on pathology, surgical margins, lymph-node involvement, the patient's recovery and overall health.",
        },
        {
          id: "pancreas-faq-6",
          question: "Can pancreatic cancer be treated without surgery?",
          answer:
            "Yes. Patients who cannot undergo surgery may receive chemotherapy, radiation in selected cases, targeted treatment when an actionable biomarker is present, immunotherapy for certain biomarker-defined tumors, clinical trials and supportive care.",
        },
        {
          id: "pancreas-faq-7",
          question: "Can chemotherapy make an inoperable pancreatic tumor operable?",
          answer:
            "In selected patients with locally advanced or borderline resectable disease, chemotherapy can control or shrink the cancer sufficiently for the surgical team to reassess resectability. This is not guaranteed. Repeat imaging and multidisciplinary review are required.",
        },
        {
          id: "pancreas-faq-8",
          question: "What chemotherapy is used for pancreatic cancer?",
          answer:
            "Common approaches include FOLFIRINOX, modified FOLFIRINOX, gemcitabine plus nab-paclitaxel and other gemcitabine-based regimens. The appropriate regimen depends on the patient's condition, stage, previous treatment and treatment goals.",
        },
        {
          id: "pancreas-faq-9",
          question: "Can immunotherapy treat pancreatic cancer?",
          answer:
            "Immunotherapy is not routinely effective for all pancreatic cancers. Selected tumors with biomarkers such as MSI-H or dMMR may be candidates for immune checkpoint inhibitors after appropriate molecular testing.",
        },
        {
          id: "pancreas-faq-10",
          question: "Is CA 19-9 enough to diagnose pancreatic cancer?",
          answer:
            "No. CA 19-9 is a tumour marker, not a definitive diagnostic test. It can be elevated because of pancreatic cancer and other conditions, including biliary obstruction. Some people do not produce detectable CA 19-9.",
        },
        {
          id: "pancreas-faq-11",
          question: "What is the difference between resectable and unresectable pancreatic cancer?",
          answer:
            "Resectable means the tumor can potentially be completely removed. Borderline resectable means nearby vessels create a significant risk of incomplete removal. Locally advanced means the tumor cannot currently be completely removed. Metastatic means the cancer has spread to distant organs.",
        },
        {
          id: "pancreas-faq-12",
          question: "What happens if pancreatic cancer spreads to the liver?",
          answer:
            "Liver metastasis generally indicates stage IV disease. Treatment usually focuses on systemic disease control through chemotherapy, biomarker-directed treatment where appropriate, clinical trials and supportive care.",
        },
        {
          id: "pancreas-faq-13",
          question: "How long does recovery take after Whipple surgery?",
          answer:
            "Recovery varies. The Whipple procedure is major surgery and patients may require several weeks to regain strength. Potential complications include infection, bleeding, pancreatic fistula and delayed gastric emptying.",
        },
        {
          id: "pancreas-faq-14",
          question: "Can international patients receive pancreatic cancer treatment in India?",
          answer:
            "Yes. International patients can seek consultation and treatment at Indian tertiary cancer centres. The process can include medical-record review, specialist consultation, treatment planning, hospital coordination, treatment estimates, visa support where applicable, accommodation and follow-up coordination.",
        },
        {
          id: "pancreas-faq-15",
          question: "Can diet cure pancreatic cancer?",
          answer:
            "No. There is no diet scientifically established to cure pancreatic cancer. Appropriate nutrition can help patients maintain weight, muscle mass and treatment tolerance, and some patients need pancreatic enzyme replacement or diabetes-specific dietary management.",
        },
      ],
      imageAlt:
        "Transparent adult body showing the pancreas in gold and teal used to explain pancreatic cancer anatomy",
      seoTitle: "Pancreatic Cancer Treatment in India: Surgery, Cost & Hospitals",
      metaDescription:
        "Learn about pancreatic cancer treatment in India, including Whipple surgery, chemotherapy, radiation, targeted therapy, stage-wise treatment, cost, recovery and international patient care.",
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
    sibling.slug === "prostate-cancer-treatment-in-india" ||
    sibling.slug === "colon-cancer-treatment-in-india"
  ) {
    sibling.relatedTreatmentSlugs ??= [];
    if (!sibling.relatedTreatmentSlugs.includes(SLUG)) {
      sibling.relatedTreatmentSlugs.unshift(SLUG);
    }
  }
}

const colon = store.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");
const colonBody = colon?.translations?.en?.editorialBody;
if (colonBody && !colonBody.includes(SLUG)) {
  colon!.translations!.en!.editorialBody = colonBody.replace(
    "and [prostate cancer treatment in India](/treatments/prostate-cancer-treatment-in-india).",
    ", [prostate cancer treatment in India](/treatments/prostate-cancer-treatment-in-india) and [pancreatic cancer treatment in India](/treatments/pancreatic-cancer-treatment-in-india).",
  );
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const colonMd = resolve("scripts/colon-treatment-body.md");
let colonSource = readFileSync(colonMd, "utf8");
if (!colonSource.includes(SLUG)) {
  colonSource = colonSource.replace(
    "and [prostate cancer treatment in India](/treatments/prostate-cancer-treatment-in-india).",
    ", [prostate cancer treatment in India](/treatments/prostate-cancer-treatment-in-india) and [pancreatic cancer treatment in India](/treatments/pancreatic-cancer-treatment-in-india).",
  );
  writeFileSync(colonMd, colonSource);
  console.log("updated colon-treatment-body.md");
}

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [colon cancer treatment in India](https://gaf.healthcare/treatments/colon-cancer-treatment-in-india).",
    ", [colon cancer treatment in India](https://gaf.healthcare/treatments/colon-cancer-treatment-in-india) and [pancreatic cancer treatment in India](https://gaf.healthcare/treatments/pancreatic-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
