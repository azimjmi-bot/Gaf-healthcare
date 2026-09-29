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

const body = readFileSync(resolve("scripts/ovarian-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "ovarian-cancer-treatment-in-india");
const now = "2026-09-29T00:00:00.000Z";
const SLUG = "ovarian-cancer-treatment-in-india";

const treatment = {
  id: existing?.id ?? "b2d8f4e1-6c39-4a17-8e51-3a9d0b7c4e28",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Ovarian Cancer Treatment in India",
  specialtySlug: "gynecology",
  subspecialty: "Gynecologic Oncology",
  category: "Ovarian Cancer",
  image: "/uploads/treatments/ovarian-anatomy-body.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-rama-joshi",
    "dr-rupinder-sekhon",
    "dr-deepali-raina",
    "dr-shruti-bhatia",
    "dr-aiswarya-sekar",
    "dr-phanendra-kumar-gubbala",
    "dr-sumedha-gupta",
    "dr-sai-lakshmi-daayana",
    "dr-pakhee-aggarwal",
    "dr-hemanth-vudayaraju",
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
    "ovarian-cancer-cytoreductive-surgery",
    "cytoreductive-surgery",
    "cytoreductive-surgery-with-hipec",
    "pipac",
    "gynecologic-cancer-surgery",
    "oophorectomy",
    "salpingo-oophorectomy",
    "laparoscopic-hysterectomy",
    "radical-hysterectomy",
    "chemotherapy",
    "targeted-therapy",
    "immunotherapy",
    "hormone-therapy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [
    "cervical-cancer-treatment-in-india",
    "hipec-surgery-in-india",
    "breast-cancer-treatment-in-india",
    "colon-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 8,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Ovarian Cancer Treatment in India",
      shortDescription:
        "Ovarian cancer treatment in India is planned from FIGO stage, resectability and BRCA/HRD status — cytoreductive surgery plus platinum chemotherapy and selected targeted maintenance, not a single package price.",
      editorialBody: body,
      process: [
        {
          id: "ovarian-step-1",
          title: "Share medical records",
          description:
            "The patient provides CT or MRI, pathology, CA-125, previous surgery notes and any BRCA or HRD reports.",
        },
        {
          id: "ovarian-step-2",
          title: "Pathology review",
          description:
            "A gynecologic oncologist confirms histological subtype, grade and whether a second pathology look is needed.",
        },
        {
          id: "ovarian-step-3",
          title: "FIGO staging and operability",
          description:
            "Imaging and examination estimate whether complete or near-complete cytoreduction appears feasible.",
        },
        {
          id: "ovarian-step-4",
          title: "Molecular assessment",
          description:
            "BRCA, HRD and other tests are arranged when they could change maintenance treatment or counselling.",
        },
        {
          id: "ovarian-step-5",
          title: "Multidisciplinary plan",
          description:
            "The team decides surgery first versus neoadjuvant chemotherapy, HIPEC in selected cases, and systemic therapy.",
        },
        {
          id: "ovarian-step-6",
          title: "Itemized estimate",
          description:
            "The hospital quotes surgery, ICU, chemotherapy cycles and targeted medicines from GAF cost sheets — not a brochure package.",
        },
        {
          id: "ovarian-step-7",
          title: "Travel to India",
          description:
            "The patient allows enough time for repeat staging, surgery and the first chemotherapy cycles when those will stay in India.",
        },
        {
          id: "ovarian-step-8",
          title: "Surgery and systemic therapy",
          description:
            "Primary or interval cytoreduction is followed by platinum-based chemotherapy and selected maintenance.",
        },
        {
          id: "ovarian-step-9",
          title: "Response assessment",
          description:
            "The team reviews examination, CA-125, imaging and residual-disease status.",
        },
        {
          id: "ovarian-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering histology, stage, residual disease, drugs and the follow-up schedule.",
        },
      ],
      preparation:
        "Share contrast CT, pathology slides or blocks, CA-125, previous operative notes and any BRCA or HRD reports before travel so the gynecologic oncology team can judge cytoreduction and issue an itemized estimate.",
      recovery:
        "Hospital stay after ovarian cytoreductive surgery is often 6–12 nights. The trip lengthens if bowel resection, a leak, HIPEC or prolonged nutrition support occurs.",
      hospitalStay: "Typically 6–12 nights after ovarian cytoreductive surgery; longer after HIPEC or bowel reconstruction",
      recoveryPeriod:
        "Several weeks before usual activities; international patients should not book an early fixed return flight",
      followUp:
        "Request a written summary covering histology, FIGO stage, residual disease, chemotherapy, PARP or bevacizumab plans and the imaging schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. HIPEC is not automatically indicated for every ovarian cancer. Fertility preservation must be discussed before treatment begins.",
      treatmentType: "Gynecologic oncology",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Primary or interval cytoreduction, selected HIPEC or PIPAC, platinum-taxane chemotherapy, PARP inhibitors, bevacizumab and molecular testing as indicated",
      searchKeywords: [
        "ovarian cancer treatment in India",
        "ovarian cancer treatment cost in India",
        "ovarian cancer surgery in India",
        "ovarian cancer hospitals in India",
        "ovarian cancer chemotherapy in India",
        "ovarian cancer HIPEC in India",
        "PARP inhibitors for ovarian cancer",
        "international patient ovarian cancer India",
      ],
      faqs: [
        {
          id: "ovarian-faq-1",
          question: "What is the best treatment for ovarian cancer?",
          answer:
            "There is no single treatment that is best for every patient. For many epithelial ovarian cancers, surgery and platinum-based chemotherapy form the core of treatment, with targeted maintenance therapies considered for selected patients.",
        },
        {
          id: "ovarian-faq-2",
          question: "Is ovarian cancer treatable in India?",
          answer:
            "Yes. India has specialized oncology centers offering gynecologic oncology surgery, chemotherapy, molecular testing and selected targeted therapies.",
        },
        {
          id: "ovarian-faq-3",
          question: "How much does ovarian cancer treatment cost in India?",
          answer:
            "There is no universal price. Current GAF planning ranges include approximately $8,000–$20,000 for ovarian cytoreductive surgery, $18,000–$40,000 for CRS with HIPEC, $1,500–$8,000+ for chemotherapy, $8,000–$30,000 for targeted therapy and $2,000–$7,000 for precision-oncology testing.",
        },
        {
          id: "ovarian-faq-4",
          question: "What is debulking surgery?",
          answer:
            "Debulking, also called cytoreductive surgery, is an operation intended to remove as much visible ovarian cancer as possible.",
        },
        {
          id: "ovarian-faq-5",
          question: "What is interval debulking surgery?",
          answer:
            "It is cytoreductive surgery performed after an initial course of chemotherapy, usually when chemotherapy is given first rather than immediate surgery.",
        },
        {
          id: "ovarian-faq-6",
          question: "What is HIPEC in ovarian cancer?",
          answer:
            "HIPEC is heated chemotherapy delivered directly into the abdominal cavity during selected cancer operations. It is available at some specialized centers but is not appropriate for every ovarian cancer patient.",
        },
        {
          id: "ovarian-faq-7",
          question: "Why is BRCA testing important?",
          answer:
            "BRCA results can provide information about inherited cancer risk and may influence treatment decisions, including eligibility for certain PARP-inhibitor strategies.",
        },
        {
          id: "ovarian-faq-8",
          question: "Does a normal CA-125 rule out ovarian cancer?",
          answer:
            "No. A normal CA-125 does not independently exclude ovarian cancer.",
        },
        {
          id: "ovarian-faq-9",
          question: "Can international patients get ovarian cancer treatment in India?",
          answer:
            "Yes. Major Indian hospitals have international-patient departments that coordinate consultations, treatment, accommodation and related logistics. Records should ideally be reviewed before travel.",
        },
        {
          id: "ovarian-faq-10",
          question: "Can ovarian cancer recur after treatment?",
          answer:
            "Yes. Recurrence is possible, particularly in advanced disease. Treatment is then reassessed according to location, previous treatment, platinum sensitivity and molecular characteristics.",
        },
        {
          id: "ovarian-faq-11",
          question: "Is surgery always required for ovarian cancer?",
          answer:
            "Not necessarily. The role and timing of surgery depend on cancer type, stage, disease distribution and the patient's fitness.",
        },
        {
          id: "ovarian-faq-12",
          question: "How long does ovarian cancer treatment take in India?",
          answer:
            "Surgery may require several days of hospitalization. Chemotherapy and maintenance treatment can extend over several months. International patients should plan around the complete strategy, not a single short visit.",
        },
      ],
      imageAlt:
        "Female pelvic anatomy highlighting the uterus, ovaries and a gold mass on one ovary",
      seoTitle: "Ovarian Cancer Treatment in India – Surgery, Chemotherapy & Cost",
      metaDescription:
        "Learn about ovarian cancer treatment in India, including surgery, chemotherapy, targeted therapy, PARP inhibitors, HIPEC, diagnosis, stages, cost, recovery and treatment options for international patients.",
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
    sibling.slug === "cervical-cancer-treatment-in-india" ||
    sibling.slug === "hipec-surgery-in-india" ||
    sibling.slug === "breast-cancer-treatment-in-india"
  ) {
    sibling.relatedTreatmentSlugs ??= [];
    if (!sibling.relatedTreatmentSlugs.includes(SLUG)) {
      sibling.relatedTreatmentSlugs.unshift(SLUG);
    }
  }
}

const cervical = store.treatments.find((row) => row.slug === "cervical-cancer-treatment-in-india");
const cervicalBody = cervical?.translations?.en?.editorialBody;
if (cervicalBody && !cervicalBody.includes(SLUG)) {
  cervical!.translations!.en!.editorialBody = cervicalBody.replace(
    "It sits beside [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india).",
    "It sits beside [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india) and [ovarian cancer treatment in India](/treatments/ovarian-cancer-treatment-in-india).",
  );
}

const hipec = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
const hipecBody = hipec?.translations?.en?.editorialBody;
if (hipecBody && !hipecBody.includes(SLUG)) {
  hipec!.translations!.en!.editorialBody = hipecBody.replace(
    "GAF planning ranges for [ovarian cancer cytoreductive surgery](/costs/India/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery) sit on a neighbouring sheet.",
    "The full ovarian pathway is covered in [Ovarian Cancer Treatment in India](/treatments/ovarian-cancer-treatment-in-india). GAF planning ranges for [ovarian cancer cytoreductive surgery](/costs/India/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery) sit on a neighbouring sheet.",
  );
}

const breast = store.treatments.find((row) => row.slug === "breast-cancer-treatment-in-india");
const breastBody = breast?.translations?.en?.editorialBody;
if (breastBody && !breastBody.includes(SLUG)) {
  breast!.translations!.en!.editorialBody = breastBody.replace(
    "see [Cervical Cancer Treatment in India](/treatments/cervical-cancer-treatment-in-india).",
    "see [Cervical Cancer Treatment in India](/treatments/cervical-cancer-treatment-in-india) and [Ovarian Cancer Treatment in India](/treatments/ovarian-cancer-treatment-in-india).",
  );
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const cervicalMd = resolve("scripts/cervical-treatment-body.md");
let cervicalSource = readFileSync(cervicalMd, "utf8");
if (!cervicalSource.includes(SLUG)) {
  cervicalSource = cervicalSource.replace(
    "It sits beside [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india).",
    "It sits beside [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india) and [ovarian cancer treatment in India](/treatments/ovarian-cancer-treatment-in-india).",
  );
  writeFileSync(cervicalMd, cervicalSource);
  console.log("updated cervical-treatment-body.md");
}

const hipecMd = resolve("scripts/hipec-treatment-body.md");
let hipecSource = readFileSync(hipecMd, "utf8");
if (!hipecSource.includes(SLUG)) {
  hipecSource = hipecSource.replace(
    "GAF planning ranges for [ovarian cancer cytoreductive surgery](/costs/India/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery) sit on a neighbouring sheet.",
    "The full ovarian pathway is covered in [Ovarian Cancer Treatment in India](/treatments/ovarian-cancer-treatment-in-india). GAF planning ranges for [ovarian cancer cytoreductive surgery](/costs/India/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery) sit on a neighbouring sheet.",
  );
  writeFileSync(hipecMd, hipecSource);
  console.log("updated hipec-treatment-body.md");
}

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [cervical cancer treatment in India](https://gaf.healthcare/treatments/cervical-cancer-treatment-in-india).",
    ", [cervical cancer treatment in India](https://gaf.healthcare/treatments/cervical-cancer-treatment-in-india) and [ovarian cancer treatment in India](https://gaf.healthcare/treatments/ovarian-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
