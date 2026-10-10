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

const body = readFileSync(
  resolve("scripts/prostate-treatment-body.md"),
  "utf8",
).trim();

const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{ id: string; slug: string; createdAt?: string }>;
};
const existing = store.treatments.find(
  (row) => row.slug === "prostate-cancer-treatment-in-india",
);

const now = "2026-09-27T18:30:00.000Z";
const treatment = {
  id: existing?.id ?? "c4e91b07-2a6f-4d8e-9b13-7f0a6e2d1c88",
  slug: "prostate-cancer-treatment-in-india",
  previousSlugs: [],
  baseName: "Prostate Cancer Treatment in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Prostate Cancer",
  category: "Prostate Cancer",
  image: "/uploads/treatments/prostate-anatomy-male-pelvis.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-puneet-ahluwalia",
    "dr-gagan-gautam",
    "dr-harshit-garg",
    "dr-tushar-aditya-narain",
    "dr-ashwin-sunil-tamhankar",
    "dr-shrikanth-atluri",
    "dr-vivek-venkatramani",
    "dr-sivakumar-mahalingam",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "max-smart-super-speciality-hospital-saket",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-jubilee-hills-hyderabad",
    "mgm-healthcare-chennai",
  ],
  costPageSlugs: [
    "radical-prostatectomy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "stereotactic-body-radiotherapy-sbrt",
    "brachytherapy",
    "chemotherapy",
    "hormone-therapy",
    "targeted-therapy",
  ],
  relatedTreatmentSlugs: ["breast-cancer-treatment-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 2,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Prostate Cancer Treatment in India",
      shortDescription:
        "Prostate cancer treatment in India is planned from stage, Grade Group, PSA and imaging — active surveillance, radical prostatectomy, radiation, hormone therapy or systemic care — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "prostate-step-1",
          title: "Share medical records",
          description:
            "The patient provides PSA history, biopsy, Grade Group, MRI or PSMA PET reports and previous treatment records.",
        },
        {
          id: "prostate-step-2",
          title: "Specialist review",
          description:
            "A uro-oncologist, radiation oncologist or medical oncologist reviews the diagnosis and risk group.",
        },
        {
          id: "prostate-step-3",
          title: "Staging",
          description:
            "Additional imaging or pathology review may be recommended to confirm whether the cancer is localised, locally advanced or metastatic.",
        },
        {
          id: "prostate-step-4",
          title: "Multidisciplinary planning",
          description:
            "The team decides whether the objective is active surveillance, curative local treatment or combination systemic therapy.",
        },
        {
          id: "prostate-step-5",
          title: "Hospital and doctor selection",
          description:
            "The patient can review uro-oncology, radiation and medical oncology teams according to the planned pathway.",
        },
        {
          id: "prostate-step-6",
          title: "Treatment estimate",
          description:
            "The hospital provides an itemized estimate based on surgery, radiation, medicines and expected stay — not a brochure package.",
        },
        {
          id: "prostate-step-7",
          title: "Travel planning",
          description:
            "The patient arranges visa, flights, accommodation and the expected length of stay for surgery or radiation fractions.",
        },
        {
          id: "prostate-step-8",
          title: "Pre-treatment assessment",
          description:
            "Additional investigations, anaesthesia review or simulation CT may be performed after arrival.",
        },
        {
          id: "prostate-step-9",
          title: "Treatment",
          description:
            "The planned treatment is carried out — surveillance, prostatectomy, radiation, hormone therapy or systemic therapy.",
        },
        {
          id: "prostate-step-10",
          title: "Recovery and PSA follow-up",
          description:
            "Patients receive a written summary and a PSA surveillance plan before returning to their home team.",
        },
      ],
      preparation:
        "Share PSA history, biopsy slides or reports, Grade Group, MRI, PSMA PET when available, and previous treatment records before travel so the uro-oncology team can propose a sequence and an itemized estimate.",
      recovery:
        "Hospital stay after radical prostatectomy is often 3–7 nights. The trip lengthens for catheter care, pelvic-floor rehabilitation, radiation fractions or systemic cycles rather than the inpatient bed alone.",
      hospitalStay: "Surgery 3–7 nights; radiation is usually outpatient",
      recoveryPeriod:
        "Two to eight weeks in India if radiation or early recovery follow-up is completed before travel home",
      followUp:
        "Request a written summary covering diagnosis, Grade Group, stage, surgery or radiation delivered, systemic therapy and the recommended PSA schedule.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Do not add every line together. The treating team confirms the sequence after records review. Active surveillance has no single package price.",
      treatmentType: "Multidisciplinary uro-oncology pathway",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Robotic or open prostatectomy, image-guided radiation, brachytherapy and systemic medicines as indicated",
      searchKeywords: [
        "prostate cancer treatment in India",
        "robotic prostatectomy cost in India",
        "radical prostatectomy India",
        "prostate radiation therapy India",
        "PSMA PET India",
        "prostate cancer hospitals Delhi NCR",
        "prostate cancer treatment Mumbai",
        "international prostate cancer treatment India",
      ],
      faqs: [
        {
          id: "prostate-faq-1",
          question: "What is the treatment for prostate cancer in India?",
          answer:
            "Treatment depends mainly on the stage and risk category. Localised prostate cancer may be managed with active surveillance, radical prostatectomy or radiation therapy. Higher-risk or locally advanced disease may require surgery or radiation combined with hormone therapy. Metastatic prostate cancer is generally treated with systemic therapies such as androgen-deprivation therapy, newer androgen-receptor pathway drugs, chemotherapy and selected radiopharmaceutical or targeted treatments.",
        },
        {
          id: "prostate-faq-2",
          question: "Is prostate cancer curable?",
          answer:
            "Localised prostate cancer can often be treated with curative intent. The possibility of long-term disease control depends on the cancer's stage, Grade Group, PSA, tumour characteristics and whether it has spread outside the prostate.",
        },
        {
          id: "prostate-faq-3",
          question: "Is robotic prostate surgery available in India?",
          answer:
            "Yes. Robotic-assisted radical prostatectomy is available at several Indian tertiary hospitals and cancer centres. It is primarily used for selected localised and some locally advanced cancers. The robot does not independently perform the operation; the surgeon controls the robotic instruments.",
        },
        {
          id: "prostate-faq-4",
          question: "What is the cost of prostate cancer treatment in India?",
          answer:
            "There is no single total price. Current GAF planning ranges include approximately $7,000–$18,000 for radical prostatectomy (open, laparoscopic or robotic), $1,000–$6,000+ for external-beam radiation, $6,500–$14,500 for IMRT, $7,200–$16,000 for IGRT, $8,000–$17,500 for SBRT, $5,500–$13,000 for brachytherapy, $1,000–$4,500 for hormone therapy, $1,500–$8,000+ for chemotherapy and $8,000–$30,000 for targeted therapy. These are planning ranges rather than individual hospital quotations.",
        },
        {
          id: "prostate-faq-5",
          question: "Which doctors treat prostate cancer?",
          answer:
            "Treatment may involve a uro-oncologist/urologist, radiation oncologist and medical oncologist. Radiologists, nuclear medicine specialists, pathologists and specialist nurses may also be involved.",
        },
        {
          id: "prostate-faq-6",
          question: "Is robotic surgery better than open surgery?",
          answer:
            "Robotic surgery is a minimally invasive technique with advantages such as smaller incisions and enhanced visualisation. However, the choice of surgical approach depends on the patient, tumour characteristics and surgeon expertise. The robotic platform itself does not determine the cancer outcome.",
        },
        {
          id: "prostate-faq-7",
          question: "Can prostate cancer be treated without surgery?",
          answer:
            "Yes. Depending on the cancer, treatment may include active surveillance, radiation therapy, brachytherapy, hormone therapy, systemic treatment or selected focal treatments. Surgery is only one part of prostate cancer management.",
        },
        {
          id: "prostate-faq-8",
          question: "Is radiation therapy effective for prostate cancer?",
          answer:
            "Radiation therapy is an established treatment for appropriately selected localised and locally advanced prostate cancer and may be combined with hormone therapy depending on disease risk.",
        },
        {
          id: "prostate-faq-9",
          question: "What is PSMA PET/CT?",
          answer:
            "PSMA PET/CT is an advanced imaging examination that uses a tracer targeting prostate-specific membrane antigen to identify prostate cancer deposits. It can be particularly useful for selected staging and recurrence scenarios.",
        },
        {
          id: "prostate-faq-10",
          question: "What is Lutetium-177 PSMA therapy?",
          answer:
            "It is a targeted radiopharmaceutical treatment in which lutetium-177 is linked to a PSMA-targeting molecule. The compound can deliver radiation to PSMA-expressing prostate cancer cells. It is mainly used in selected advanced prostate cancer patients after specialist assessment.",
        },
        {
          id: "prostate-faq-11",
          question: "Can prostate cancer return after surgery?",
          answer:
            "Yes. Some patients experience biochemical recurrence after treatment. Rising PSA may lead to additional imaging and assessment for salvage treatment.",
        },
        {
          id: "prostate-faq-12",
          question: "How often should PSA be checked after treatment?",
          answer:
            "The follow-up schedule depends on the original treatment and individual risk. PSA is a central component of follow-up after prostatectomy and radiation treatment.",
        },
        {
          id: "prostate-faq-13",
          question: "Can international patients get prostate cancer treatment in India?",
          answer:
            "Yes. International patients can undergo evaluation and treatment in India after their medical records have been reviewed and an appropriate treatment pathway has been established.",
        },
        {
          id: "prostate-faq-14",
          question: "Should I bring my biopsy slides?",
          answer:
            "The treating hospital may request pathology slides, tissue blocks or original reports, particularly when additional pathology review is required.",
        },
        {
          id: "prostate-faq-15",
          question: "Can I return home after prostate cancer surgery?",
          answer:
            "Patients should receive medical clearance before travelling. The treating team should determine when the patient is sufficiently recovered for travel, including catheter removal and early continence support where relevant.",
        },
      ],
      imageAlt:
        "Sagittal medical illustration of the male pelvis showing the bladder, prostate gland and rectum",
      seoTitle:
        "Prostate Cancer Treatment in India: Surgery, Radiation, Cost and Care",
      metaDescription:
        "Prostate cancer treatment in India is planned from stage, Grade Group, PSA and imaging — active surveillance, robotic prostatectomy, radiation or systemic care. USD planning ranges and records to send first.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) =>
    row.slug === treatment.slug ? treatment : row,
  );
} else {
  store.treatments.push(treatment);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote prostate-cancer-treatment-in-india");
