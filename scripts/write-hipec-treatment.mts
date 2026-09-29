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

const body = readFileSync(resolve("scripts/hipec-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
const now = "2026-09-28T22:30:00.000Z";
const SLUG = "hipec-surgery-in-india";

const treatment = {
  id: existing?.id ?? "e4b7d2c9-1a58-4f06-9c33-8d0e7a5b2f14",
  slug: SLUG,
  previousSlugs: [],
  baseName: "HIPEC Surgery in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Peritoneal Surface Oncology",
  category: "HIPEC",
  image: "/uploads/treatments/hipec-peritoneum-body.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-harit-kumar-chaturvedi",
    "dr-rajesh-shinde",
    "dr-nikhil-agrawal",
    "dr-rama-joshi",
    "dr-rupinder-sekhon",
    "dr-aiswarya-sekar",
    "dr-sivaram-ganesamoni",
    "dr-chinnababu-sunkavalli",
    "dr-hemanth-vudayaraju",
    "dr-asit-arora",
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
    "cytoreductive-surgery",
    "cytoreductive-surgery-with-hipec",
    "ovarian-cancer-cytoreductive-surgery",
    "pipac",
    "chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "colectomy",
  ],
  relatedTreatmentSlugs: [
    "colon-cancer-treatment-in-india",
    "pancreatic-cancer-treatment-in-india",
    "whipple-surgery-in-india",
    "breast-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 6,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "HIPEC Surgery in India",
      shortDescription:
        "HIPEC surgery in India is planned from cancer type, PCI and whether complete cytoreduction is possible — CRS plus heated intraperitoneal chemotherapy, not a single package price.",
      editorialBody: body,
      process: [
        {
          id: "hipec-step-1",
          title: "Share medical records",
          description:
            "The patient provides CT or MRI, pathology, previous chemotherapy details and operative reports.",
        },
        {
          id: "hipec-step-2",
          title: "Specialist review",
          description:
            "A peritoneal-surface or surgical oncologist reviews whether complete cytoreduction appears feasible.",
        },
        {
          id: "hipec-step-3",
          title: "PCI and resectability",
          description:
            "Imaging, and sometimes diagnostic laparoscopy, estimates peritoneal disease burden.",
        },
        {
          id: "hipec-step-4",
          title: "Multidisciplinary planning",
          description:
            "Surgery, medical oncology, radiology and pathology decide whether CRS, HIPEC, systemic therapy or another path is appropriate.",
        },
        {
          id: "hipec-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes theatre, HIPEC drug, ICU and expected stay — not a brochure package.",
        },
        {
          id: "hipec-step-6",
          title: "Travel to India",
          description:
            "The patient allows enough time for repeat staging, surgery and a prolonged recovery.",
        },
        {
          id: "hipec-step-7",
          title: "CRS and HIPEC",
          description:
            "Visible peritoneal disease is removed, then heated chemotherapy is circulated and drained.",
        },
        {
          id: "hipec-step-8",
          title: "ICU and recovery",
          description:
            "The team monitors fluids, kidney function, bowel recovery, leaks and nutrition.",
        },
        {
          id: "hipec-step-9",
          title: "Pathology and next treatment",
          description:
            "The final report and molecular findings guide systemic therapy and surveillance.",
        },
        {
          id: "hipec-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering surgery delivered, stoma care if any, and the imaging schedule.",
        },
      ],
      preparation:
        "Share contrast CT, pathology slides or blocks, previous chemotherapy dates and operative notes before travel so the peritoneal team can judge cytoreduction and issue an itemized estimate.",
      recovery:
        "Hospital stay after CRS-HIPEC is often 10–21 nights. The trip lengthens if bowel reconstruction, a leak, kidney injury or prolonged nutrition support occurs.",
      hospitalStay: "Typically 10–21 nights; longer after extensive multivisceral CRS",
      recoveryPeriod:
        "Several weeks before usual activities; international patients should not book an early fixed return flight",
      followUp:
        "Request a written summary covering histology, PCI, completeness of cytoreduction, HIPEC drug, systemic therapy and the imaging schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. HIPEC is not automatically indicated for every peritoneal metastasis. Oxaliplatin HIPEC is not recommended as an add-on to CRS for colorectal peritoneal metastases after PRODIGE 7.",
      treatmentType: "Cytoreductive surgery with HIPEC",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Peritonectomy and organ resection as required, heated intraperitoneal chemotherapy, ICU monitoring and selected PIPAC or systemic therapy as indicated",
      searchKeywords: [
        "HIPEC surgery in India",
        "HIPEC surgery cost in India",
        "CRS HIPEC India",
        "cytoreductive surgery India",
        "pseudomyxoma peritonei treatment India",
        "peritoneal mesothelioma HIPEC",
        "colon cancer HIPEC India",
        "international patient HIPEC India",
      ],
      faqs: [
        {
          id: "hipec-faq-1",
          question: "What is HIPEC surgery?",
          answer:
            "HIPEC is heated chemotherapy delivered directly into the abdominal cavity during surgery, usually after cytoreductive surgery has removed visible peritoneal tumors.",
        },
        {
          id: "hipec-faq-2",
          question: "Is HIPEC a surgery or chemotherapy?",
          answer:
            "It is part of a combined treatment. The overall procedure is commonly called cytoreductive surgery with HIPEC (CRS-HIPEC).",
        },
        {
          id: "hipec-faq-3",
          question: "What is the HIPEC surgery cost in India?",
          answer:
            "There is no single total price. Current GAF planning ranges include approximately $10,000–$24,000 for cytoreductive surgery and $18,000–$40,000 for CRS with HIPEC. Neighbouring ranges include $7,000–$16,000 for PIPAC and $1,500–$8,000+ for systemic chemotherapy.",
        },
        {
          id: "hipec-faq-4",
          question: "Is HIPEC suitable for colon cancer?",
          answer:
            "It may be considered in selected patients with colorectal peritoneal metastases when complete cytoreduction is possible. The additional benefit of HIPEC is controversial, and oxaliplatin-based HIPEC is not recommended by ASCO as an addition to CRS based on PRODIGE 7.",
        },
        {
          id: "hipec-faq-5",
          question: "Is HIPEC the standard treatment for pseudomyxoma peritonei?",
          answer:
            "For operable and resectable pseudomyxoma peritonei, CRS-HIPEC is strongly supported by current international consensus recommendations.",
        },
        {
          id: "hipec-faq-6",
          question: "Is HIPEC suitable for Stage 4 cancer?",
          answer:
            "Sometimes. Stage 4 disease does not automatically exclude HIPEC, but eligibility depends on cancer type, peritoneal disease burden, resectability and whether cancer exists outside the peritoneal cavity.",
        },
        {
          id: "hipec-faq-7",
          question: "How long do patients stay in hospital after HIPEC?",
          answer:
            "Stay varies. GAF planning ranges typically quote 10–21 nights. Extensive multivisceral cytoreduction or complications can lengthen that stay.",
        },
        {
          id: "hipec-faq-8",
          question: "Which chemotherapy drugs are used during HIPEC?",
          answer:
            "Depending on the cancer, protocols may use mitomycin C, oxaliplatin, cisplatin or other disease-specific agents. There is no single drug for every HIPEC patient.",
        },
        {
          id: "hipec-faq-9",
          question: "Can international patients get HIPEC treatment in India?",
          answer:
            "Yes. International patients can seek evaluation at Indian centres with peritoneal surface oncology expertise. Records and imaging should ideally be reviewed before travel.",
        },
        {
          id: "hipec-faq-10",
          question: "Does HIPEC guarantee a cure?",
          answer:
            "No. HIPEC can be part of a potentially curative strategy for selected cancers, particularly some pseudomyxoma peritonei and peritoneal mesothelioma cases, but no treatment can guarantee cure.",
        },
        {
          id: "hipec-faq-11",
          question: "What is the Peritoneal Cancer Index?",
          answer:
            "PCI estimates how widely tumour is distributed across peritoneal regions. A lower burden may make complete cytoreduction more achievable, but PCI alone does not decide whether HIPEC is appropriate.",
        },
        {
          id: "hipec-faq-12",
          question: "What happens if complete cytoreduction is not possible?",
          answer:
            "The team may abort a planned HIPEC, limit surgery, or discuss systemic therapy, PIPAC, clinical trials or supportive care instead. HIPEC cannot replace removal of bulky visible disease.",
        },
      ],
      imageAlt:
        "Transparent adult abdomen showing a teal peritoneal lining with gold peritoneal tumour deposits",
      seoTitle: "HIPEC Surgery in India: CRS, Cost, Recovery and Hospitals",
      metaDescription:
        "Learn about HIPEC surgery in India, including cytoreductive surgery, heated intraperitoneal chemotherapy, PCI, cost, recovery, colon and ovarian indications and international patient care.",
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
  if (sibling.slug === "colon-cancer-treatment-in-india") {
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
    "CRS and HIPEC are highly specialised procedures.",
    "How CRS and HIPEC are planned is covered in [HIPEC Surgery in India](/treatments/hipec-surgery-in-india). CRS and HIPEC are highly specialised procedures.",
  );
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const colonMd = resolve("scripts/colon-treatment-body.md");
let colonSource = readFileSync(colonMd, "utf8");
if (!colonSource.includes(SLUG)) {
  colonSource = colonSource.replace(
    "CRS and HIPEC are highly specialised procedures.",
    "How CRS and HIPEC are planned is covered in [HIPEC Surgery in India](/treatments/hipec-surgery-in-india). CRS and HIPEC are highly specialised procedures.",
  );
  writeFileSync(colonMd, colonSource);
  console.log("updated colon-treatment-body.md");
}

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [Whipple surgery in India](https://gaf.healthcare/treatments/whipple-surgery-in-india).",
    ", [Whipple surgery in India](https://gaf.healthcare/treatments/whipple-surgery-in-india) and [HIPEC surgery in India](https://gaf.healthcare/treatments/hipec-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
