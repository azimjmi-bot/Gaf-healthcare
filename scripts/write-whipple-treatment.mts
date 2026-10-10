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

const body = readFileSync(resolve("scripts/whipple-treatment-body.md"), "utf8").trim();

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
const existing = store.treatments.find((row) => row.slug === "whipple-surgery-in-india");

const now = "2026-09-28T22:00:00.000Z";
const SLUG = "whipple-surgery-in-india";

const treatment = {
  id: existing?.id ?? "c1f8b4a2-6d3e-4a90-8e17-5b9c2d0f4a81",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Whipple Surgery in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Whipple Procedure",
  category: "Pancreatic Surgery",
  image: "/uploads/treatments/whipple-anatomy-body.webp",
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
    "precision-oncology",
    "endoscopic-ultrasound-eus",
    "ercp",
    "biliary-stenting",
  ],
  relatedTreatmentSlugs: [
    "pancreatic-cancer-treatment-in-india",
    "colon-cancer-treatment-in-india",
    "breast-cancer-treatment-in-india",
    "prostate-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 5,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Whipple Surgery in India",
      shortDescription:
        "Whipple surgery in India is planned from resectability and imaging — pancreaticoduodenectomy, reconstruction, ICU stay and any chemotherapy — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "whipple-step-1",
          title: "Share medical records",
          description:
            "The patient provides pancreatic-protocol CT or MRI/MRCP, EUS, biopsy, CA 19-9 and previous treatment records.",
        },
        {
          id: "whipple-step-2",
          title: "Remote specialist review",
          description:
            "A pancreatic or HPB surgeon reviews whether the tumor appears resectable and whether chemotherapy should come first.",
        },
        {
          id: "whipple-step-3",
          title: "Treatment estimate",
          description:
            "The hospital issues an itemized estimate covering theatre, ICU, room category and expected stay — not a brochure package.",
        },
        {
          id: "whipple-step-4",
          title: "Travel and visa",
          description:
            "The patient arranges a medical visa, flights and enough time in India for surgery and postoperative monitoring.",
        },
        {
          id: "whipple-step-5",
          title: "Repeat staging in India",
          description:
            "The team may repeat CT, EUS, blood tests or cardiac assessment before a final decision.",
        },
        {
          id: "whipple-step-6",
          title: "Multidisciplinary evaluation",
          description:
            "Surgery, medical oncology, radiology, gastroenterology and anaesthesia confirm that pancreaticoduodenectomy is appropriate.",
        },
        {
          id: "whipple-step-7",
          title: "Whipple surgery",
          description:
            "The pancreatic head and neighbouring structures are removed and the digestive tract is reconstructed.",
        },
        {
          id: "whipple-step-8",
          title: "Recovery and drains",
          description:
            "The patient is monitored for pancreatic fistula, delayed gastric emptying, infection and blood-sugar changes.",
        },
        {
          id: "whipple-step-9",
          title: "Pathology review",
          description:
            "The final report covers tumour type, margins, nodes and whether adjuvant chemotherapy should follow.",
        },
        {
          id: "whipple-step-10",
          title: "Return home and follow-up",
          description:
            "The patient leaves with a written summary covering surgery delivered, enzymes, diabetes care and the imaging schedule.",
        },
      ],
      preparation:
        "Share contrast CT or MRI/MRCP, EUS, biopsy slides or blocks, CA 19-9 and cardiac reports before travel so the HPB team can propose a sequence and an itemized estimate.",
      recovery:
        "Hospital stay after Whipple surgery is often 10–18 nights. The trip lengthens for fistula watch, enzyme teaching, diabetes management or the first adjuvant cycles rather than the inpatient bed alone.",
      hospitalStay: "Typically 10–18 nights; longer if a leak or delayed emptying occurs",
      recoveryPeriod:
        "Several weeks to months before full digestive recovery; international patients should not book an early fixed return flight",
      followUp:
        "Request a written summary covering diagnosis, margin status, nodes, reconstruction, enzymes, diabetes and the recommended CA 19-9 and imaging schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Whipple cost is not the total pancreatic-cancer treatment cost. The treating team confirms resectability after reviewing the actual films.",
      treatmentType: "Pancreaticoduodenectomy (Whipple procedure)",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Open, laparoscopic or robotic pancreaticoduodenectomy with reconstruction, ICU monitoring and selected biliary drainage as indicated",
      searchKeywords: [
        "Whipple surgery in India",
        "Whipple surgery cost in India",
        "Whipple procedure in India",
        "pancreaticoduodenectomy in India",
        "pancreatic cancer surgery in India",
        "Whipple surgery recovery",
        "robotic Whipple surgery India",
        "international patient Whipple surgery India",
      ],
      faqs: [
        {
          id: "whipple-faq-1",
          question: "What is the success rate of Whipple surgery?",
          answer:
            "There is no single success rate that applies to every patient. Outcomes vary according to disease stage, tumour biology, patient health, hospital experience, surgical complexity and complications.",
        },
        {
          id: "whipple-faq-2",
          question: "Is Whipple surgery a cure for pancreatic cancer?",
          answer:
            "Whipple surgery can provide the possibility of long-term disease control in appropriately selected patients, but it does not guarantee a cure. Pancreatic cancer can recur after surgery.",
        },
        {
          id: "whipple-faq-3",
          question: "How much does Whipple surgery cost in India?",
          answer:
            "GAF Healthcare currently publishes a planning range of approximately $14,000–$32,000 for pancreaticoduodenectomy. Neighbouring ranges include $9,000–$22,000 for distal pancreatectomy, $12,000–$30,000 for broader pancreatic surgery, $1,500–$8,000+ for chemotherapy, $400–$1,400 for EUS and $1,500–$4,200 for ERCP. These are planning ranges rather than hospital quotations.",
        },
        {
          id: "whipple-faq-4",
          question: "How many days do you stay in hospital after Whipple surgery?",
          answer:
            "The stay varies. GAF planning ranges typically quote 10–18 nights. Patients without major complications may leave toward the shorter end, while complicated cases may require substantially longer hospitalization.",
        },
        {
          id: "whipple-faq-5",
          question: "Can Whipple surgery be performed robotically?",
          answer:
            "Yes, in selected patients and at appropriately equipped centres. Robotic surgery is not automatically safer for every patient. Safety depends on tumour anatomy, surgeon expertise and hospital experience.",
        },
        {
          id: "whipple-faq-6",
          question: "Will I need chemotherapy after Whipple surgery?",
          answer:
            "Many pancreatic cancer patients receive postoperative chemotherapy, but the recommendation depends on the final pathology and the overall treatment plan.",
        },
        {
          id: "whipple-faq-7",
          question: "Can Whipple surgery cause diabetes?",
          answer:
            "Yes. Removing part of the pancreas can reduce insulin production. Some patients already have diabetes; others develop new or worsened diabetes afterward.",
        },
        {
          id: "whipple-faq-8",
          question: "Will I need pancreatic enzymes after Whipple surgery?",
          answer:
            "Some patients do. Enzyme replacement is prescribed when pancreatic exocrine insufficiency develops — greasy stools, bloating, diarrhoea or unexplained weight loss.",
        },
        {
          id: "whipple-faq-9",
          question: "What is the biggest complication after Whipple surgery?",
          answer:
            "Clinically significant pancreatic fistula is among the important complications. Patients can also experience bleeding, infection, delayed gastric emptying and bile leaks.",
        },
        {
          id: "whipple-faq-10",
          question: "Can stage 4 pancreatic cancer be treated with Whipple surgery?",
          answer:
            "Usually not as the standard initial treatment. Systemic treatment is generally central for metastatic disease.",
        },
        {
          id: "whipple-faq-11",
          question: "Can international patients get Whipple surgery in India?",
          answer:
            "Yes. Major Indian hospitals treat international patients and can review medical records remotely before travel, then provide an itemized estimate and visa documentation when appropriate.",
        },
        {
          id: "whipple-faq-12",
          question: "Should I get a second opinion before Whipple surgery?",
          answer:
            "A second specialist opinion can be useful for a major irreversible operation, especially when the disease is borderline resectable, vessels are involved, or treatment recommendations differ.",
        },
      ],
      imageAlt:
        "Transparent adult body showing the pancreatic head, duodenum and nearby structures used to explain Whipple surgery anatomy",
      seoTitle: "Whipple Surgery in India: Cost, Procedure, Recovery & Hospitals",
      metaDescription:
        "Learn about Whipple surgery in India, including pancreaticoduodenectomy procedure, cost, eligibility, recovery, risks, chemotherapy, hospitals and international patient treatment.",
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
  if (sibling.slug === "pancreatic-cancer-treatment-in-india") {
    sibling.relatedTreatmentSlugs ??= [];
    if (!sibling.relatedTreatmentSlugs.includes(SLUG)) {
      sibling.relatedTreatmentSlugs.unshift(SLUG);
    }
  }
}

const pancreas = store.treatments.find((row) => row.slug === "pancreatic-cancer-treatment-in-india");
const pancreasBody = pancreas?.translations?.en?.editorialBody;
if (pancreasBody && !pancreasBody.includes(SLUG)) {
  pancreas!.translations!.en!.editorialBody = pancreasBody.replace(
    "The Whipple procedure, or pancreaticoduodenectomy, is commonly used for tumors located in the head of the pancreas.",
    "The [Whipple procedure](/treatments/whipple-surgery-in-india), or pancreaticoduodenectomy, is commonly used for tumors located in the head of the pancreas. How the operation, recovery and quotation are planned is covered in [Whipple Surgery in India](/treatments/whipple-surgery-in-india).",
  );
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const pancreasMd = resolve("scripts/pancreas-treatment-body.md");
let pancreasSource = readFileSync(pancreasMd, "utf8");
if (!pancreasSource.includes(SLUG)) {
  pancreasSource = pancreasSource.replace(
    "The Whipple procedure, or pancreaticoduodenectomy, is commonly used for tumors located in the head of the pancreas.",
    "The [Whipple procedure](/treatments/whipple-surgery-in-india), or pancreaticoduodenectomy, is commonly used for tumors located in the head of the pancreas. How the operation, recovery and quotation are planned is covered in [Whipple Surgery in India](/treatments/whipple-surgery-in-india).",
  );
  writeFileSync(pancreasMd, pancreasSource);
  console.log("updated pancreas-treatment-body.md");
}

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [pancreatic cancer treatment in India](https://gaf.healthcare/treatments/pancreatic-cancer-treatment-in-india).",
    ", [pancreatic cancer treatment in India](https://gaf.healthcare/treatments/pancreatic-cancer-treatment-in-india) and [Whipple surgery in India](https://gaf.healthcare/treatments/whipple-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
