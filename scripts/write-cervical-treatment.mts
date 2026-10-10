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

const body = readFileSync(resolve("scripts/cervical-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "cervical-cancer-treatment-in-india");
const now = "2026-09-28T23:30:00.000Z";
const SLUG = "cervical-cancer-treatment-in-india";

const treatment = {
  id: existing?.id ?? "a7c3e91f-4b28-4d15-9e60-2f8c1a0d5b37",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Cervical Cancer Treatment in India",
  specialtySlug: "gynecology",
  subspecialty: "Gynecologic Oncology",
  category: "Cervical Cancer",
  image: "/uploads/treatments/cervical-anatomy-body.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-rama-joshi",
    "dr-rupinder-sekhon",
    "dr-deepali-raina",
    "dr-shruti-bhatia",
    "dr-sumedha-gupta",
    "dr-aiswarya-sekar",
    "dr-phanendra-kumar-gubbala",
    "dr-sai-lakshmi-daayana",
    "dr-pakhee-aggarwal",
    "dr-m-suneetha",
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
    "gynecologic-cancer-surgery",
    "laparoscopic-hysterectomy",
    "robotic-hysterectomy",
    "abdominal-hysterectomy",
    "radical-hysterectomy",
    "ovarian-cancer-cytoreductive-surgery",
    "brachytherapy",
    "intracavitary-brachytherapy",
    "interstitial-brachytherapy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "chemotherapy",
    "immunotherapy",
    "targeted-therapy",
  ],
  relatedTreatmentSlugs: [
    "breast-cancer-treatment-in-india",
    "hipec-surgery-in-india",
    "colon-cancer-treatment-in-india",
    "prostate-cancer-treatment-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 7,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Cervical Cancer Treatment in India",
      shortDescription:
        "Cervical cancer treatment in India is planned from FIGO stage, fertility goals and whether surgery or chemoradiation with brachytherapy is the right path — not a single package price.",
      editorialBody: body,
      process: [
        {
          id: "cervical-step-1",
          title: "Share medical records",
          description:
            "The patient provides biopsy, histopathology, MRI, PET-CT or CT and previous treatment records.",
        },
        {
          id: "cervical-step-2",
          title: "Pathology review",
          description:
            "A gynecologic oncologist confirms histology, HPV-related features and any available immunohistochemistry.",
        },
        {
          id: "cervical-step-3",
          title: "FIGO staging",
          description:
            "Imaging and examination estimate whether disease is confined to the cervix, locally advanced or distant.",
        },
        {
          id: "cervical-step-4",
          title: "Multidisciplinary planning",
          description:
            "Surgery, radiation oncology and medical oncology decide between fertility-sparing surgery, radical hysterectomy, chemoradiation or systemic therapy.",
        },
        {
          id: "cervical-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes surgery, EBRT, brachytherapy, drugs and expected stay from GAF cost sheets — not a brochure package.",
        },
        {
          id: "cervical-step-6",
          title: "Travel to India",
          description:
            "The patient allows enough time for repeat staging, treatment and the first follow-up.",
        },
        {
          id: "cervical-step-7",
          title: "Treatment",
          description:
            "Surgery, external-beam radiation, weekly cisplatin, brachytherapy or systemic therapy is delivered as planned.",
        },
        {
          id: "cervical-step-8",
          title: "Response assessment",
          description:
            "The team reviews examination, imaging and side effects after the planned course.",
        },
        {
          id: "cervical-step-9",
          title: "Survivorship plan",
          description:
            "Follow-up, sexual-health support, fertility counselling and late-effect monitoring are written down.",
        },
        {
          id: "cervical-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering stage, treatment delivered and the imaging schedule.",
        },
      ],
      preparation:
        "Share biopsy slides or blocks, pelvic MRI, PET-CT or CT and previous treatment notes before travel so the gynecologic oncology team can confirm FIGO stage and issue an itemized estimate.",
      recovery:
        "Hospital stay after radical hysterectomy is often 4–8 nights. Definitive chemoradiation usually takes several weeks of outpatient fractions plus brachytherapy applications.",
      hospitalStay: "Typically 4–8 nights after radical hysterectomy; chemoradiation is mostly outpatient over several weeks",
      recoveryPeriod:
        "Several weeks after surgery or after chemoradiation ends; international patients should not book an early fixed return flight",
      followUp:
        "Request a written summary covering histology, FIGO stage, surgery or radiation delivered, brachytherapy applications and the examination schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Brachytherapy should not be omitted from definitive radiation without a clinical reason. Fertility preservation must be discussed before treatment begins.",
      treatmentType: "Gynecologic oncology",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Radical or fertility-sparing surgery as indicated, IMRT or IGRT, image-guided intracavitary or interstitial brachytherapy, concurrent chemotherapy and selected immunotherapy",
      searchKeywords: [
        "cervical cancer treatment in India",
        "cervical cancer treatment cost in India",
        "cervical cancer hospitals in India",
        "cervical cancer specialists in India",
        "cervical cancer surgery in India",
        "cervical cancer brachytherapy in India",
        "stage 3 cervical cancer treatment in India",
        "international patient cervical cancer India",
      ],
      faqs: [
        {
          id: "cervical-faq-1",
          question: "What is the best treatment for cervical cancer in India?",
          answer:
            "There is no single treatment that is best for every patient. Treatment depends on FIGO stage, tumor size, lymph-node status, histology, overall health and fertility preferences. Early disease may be treated surgically, while locally advanced disease commonly requires chemoradiation with brachytherapy.",
        },
        {
          id: "cervical-faq-2",
          question: "Is cervical cancer curable?",
          answer:
            "Cervical cancer can be treated with curative intent, particularly when it is diagnosed before distant spread. The likelihood of successful treatment depends on stage, tumor characteristics and response to therapy.",
        },
        {
          id: "cervical-faq-3",
          question: "How much does cervical cancer treatment cost in India?",
          answer:
            "There is no single total price. Current GAF planning ranges include approximately $5,000–$12,000 for gynecologic cancer surgery, $6,000–$14,000 for radical hysterectomy, $1,000–$6,000+ for EBRT, $5,500–$13,000 for brachytherapy, $1,500–$8,000+ for chemotherapy and $15,000–$45,000 for immunotherapy.",
        },
        {
          id: "cervical-faq-4",
          question: "Can stage 3 cervical cancer be treated in India?",
          answer:
            "Yes. Definitive chemoradiation combined with brachytherapy is an important curative approach for many patients with locally advanced disease. Selected high-risk patients may also be considered for immunotherapy.",
        },
        {
          id: "cervical-faq-5",
          question: "Is chemotherapy always required for cervical cancer?",
          answer:
            "No. Very early cancers may be treated with surgery alone, while chemotherapy is commonly combined with radiation for locally advanced disease.",
        },
        {
          id: "cervical-faq-6",
          question: "What is brachytherapy in cervical cancer?",
          answer:
            "Brachytherapy is internal radiation therapy in which a radiation source is placed close to the cervical tumor. It is an essential component of definitive radiation treatment for many patients.",
        },
        {
          id: "cervical-faq-7",
          question: "Can cervical cancer treatment preserve fertility?",
          answer:
            "In carefully selected women with early-stage disease, conization or radical trachelectomy may be possible. Fertility preservation becomes much more difficult when pelvic radiation or extensive surgery is required.",
        },
        {
          id: "cervical-faq-8",
          question: "How long does cervical cancer treatment take?",
          answer:
            "Surgery may require several days of hospitalization. Definitive chemoradiation generally takes several weeks and includes external radiation, chemotherapy and brachytherapy. Overall treatment time should be kept as short as clinically appropriate.",
        },
        {
          id: "cervical-faq-9",
          question: "Can international patients receive cervical cancer treatment in India?",
          answer:
            "Yes. International patients can seek treatment at Indian hospitals with international patient departments. Medical records should ideally be reviewed before travel.",
        },
        {
          id: "cervical-faq-10",
          question: "Can cervical cancer come back after treatment?",
          answer:
            "Yes. Recurrence may be local, regional or distant. Regular follow-up is important, particularly during the first two years after treatment.",
        },
        {
          id: "cervical-faq-11",
          question: "Is radiation therapy necessary for cervical cancer?",
          answer:
            "Radiation is important for many patients, especially those with locally advanced disease. It may also be recommended after surgery when pathological features indicate a significant risk of recurrence.",
        },
        {
          id: "cervical-faq-12",
          question: "How many sessions of brachytherapy are needed?",
          answer:
            "The number of applications depends on the radiation plan, technique, tumor anatomy and dose prescription. The treating radiation oncologist determines the schedule.",
        },
      ],
      imageAlt:
        "Female pelvic anatomy highlighting the uterus, cervix and a small gold lesion at the cervical origin",
      seoTitle: "Cervical Cancer Treatment in India: Cost, Hospitals & Specialists",
      metaDescription:
        "Cervical cancer treatment in India explained: surgery, chemoradiation, brachytherapy, immunotherapy, stages, costs, recovery and leading cancer care options.",
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
    sibling.slug === "hipec-surgery-in-india"
  ) {
    sibling.relatedTreatmentSlugs ??= [];
    if (!sibling.relatedTreatmentSlugs.includes(SLUG)) {
      sibling.relatedTreatmentSlugs.unshift(SLUG);
    }
  }
}

const breast = store.treatments.find((row) => row.slug === "breast-cancer-treatment-in-india");
const breastBody = breast?.translations?.en?.editorialBody;
if (breastBody && !breastBody.includes(SLUG)) {
  breast!.translations!.en!.editorialBody = breastBody.replace(
    "the patient's overall health.\n\nDepending on the diagnosis",
    "the patient's overall health. Cervical cancer is a separate gynaecologic pathway — see [Cervical Cancer Treatment in India](/treatments/cervical-cancer-treatment-in-india).\n\nDepending on the diagnosis",
  );
}

const hipec = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
const hipecBody = hipec?.translations?.en?.editorialBody;
if (hipecBody && !hipecBody.includes(SLUG)) {
  hipec!.translations!.en!.editorialBody = hipecBody.replace(
    "HIPEC has also been studied in advanced ovarian cancer.",
    "HIPEC has also been studied in advanced ovarian cancer. Cervical cancer uses a different pathway — see [Cervical Cancer Treatment in India](/treatments/cervical-cancer-treatment-in-india).",
  );
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const hipecMd = resolve("scripts/hipec-treatment-body.md");
let hipecSource = readFileSync(hipecMd, "utf8");
if (!hipecSource.includes(SLUG)) {
  hipecSource = hipecSource.replace(
    "HIPEC has also been studied in advanced ovarian cancer.",
    "HIPEC has also been studied in advanced ovarian cancer. Cervical cancer uses a different pathway — see [Cervical Cancer Treatment in India](/treatments/cervical-cancer-treatment-in-india).",
  );
  writeFileSync(hipecMd, hipecSource);
  console.log("updated hipec-treatment-body.md");
}

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [HIPEC surgery in India](https://gaf.healthcare/treatments/hipec-surgery-in-india).",
    ", [HIPEC surgery in India](https://gaf.healthcare/treatments/hipec-surgery-in-india) and [cervical cancer treatment in India](https://gaf.healthcare/treatments/cervical-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
