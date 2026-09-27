import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const editorialBody = readFileSync(
  join(process.cwd(), "content/treatments/breast-cancer-treatment-in-india.md"),
  "utf8",
).trim() + "\n";

const now = new Date().toISOString();

const faqs = [
  [
    "What is the treatment for breast cancer in India?",
    "Breast cancer treatment may involve surgery, chemotherapy, radiation therapy, hormone therapy, targeted therapy, immunotherapy or a combination. The appropriate treatment depends on the type and stage of cancer and its biological characteristics.",
  ],
  [
    "What is the cost of breast cancer treatment in India?",
    "There is no single total price. Current GAF planning ranges include approximately $3,500–$8,000 for breast-conserving surgery, $4,500–$10,000 for mastectomy, $4,500–$11,000 for oncoplastic breast surgery, $6,000–$18,000 for breast reconstruction, $1,500–$8,000+ for chemotherapy, $15,000–$45,000 for immunotherapy, $8,000–$30,000 for targeted therapy and $1,000–$4,500 for hormone therapy. These are planning ranges rather than individual hospital quotations.",
  ],
  [
    "Is lumpectomy or mastectomy appropriate?",
    "Both are established surgical approaches. The appropriate operation depends on tumour characteristics, breast anatomy, lymph node findings, previous treatment and other clinical factors.",
  ],
  [
    "Is radiation required after lumpectomy?",
    "Radiation is commonly incorporated into treatment after breast-conserving surgery, although the final treatment plan depends on the patient's individual clinical situation.",
  ],
  [
    "Is chemotherapy required for every breast cancer patient?",
    "No. The need for chemotherapy depends on factors such as cancer subtype, stage, pathology and other clinical findings.",
  ],
  [
    "Is hormone therapy used for breast cancer?",
    "Hormone therapy is used for hormone-receptor-positive breast cancers. The specific treatment depends on receptor status, menopausal status and the overall treatment plan.",
  ],
  [
    "Is targeted therapy available in India?",
    "Yes. Targeted therapies are used for breast cancers with appropriate biological targets. The specific treatment depends on the patient's tumour characteristics.",
  ],
  [
    "Is immunotherapy used for breast cancer?",
    "Immunotherapy is used in selected breast cancer situations. It is not appropriate for every patient.",
  ],
  [
    "Can breast reconstruction be performed during mastectomy?",
    "Yes. Selected patients may undergo immediate reconstruction during mastectomy. Reconstruction can also be performed later.",
  ],
  [
    "How long does breast cancer treatment take?",
    "The duration varies significantly. Surgery may involve a short hospital admission, while chemotherapy, radiation, targeted therapy and hormone therapy may continue for weeks, months or longer.",
  ],
  [
    "Can international patients get breast cancer treatment in India?",
    "Yes. International patients can undergo evaluation and treatment in India after their medical records have been reviewed and an appropriate treatment pathway has been established.",
  ],
  [
    "Can I get a second opinion in India?",
    "Yes. Specialists can review existing pathology, imaging, medical records and proposed treatment plans.",
  ],
  [
    "Should I bring my pathology slides?",
    "The treating hospital may request pathology slides, tissue blocks or original reports, particularly when additional pathology review is required.",
  ],
  [
    "Can I continue chemotherapy in my home country?",
    "In selected situations, treatment can be coordinated between the Indian oncology team and the patient's local oncologist. The feasibility depends on the treatment protocol and clinical circumstances.",
  ],
  [
    "Can I return home after breast cancer surgery?",
    "Patients should receive medical clearance before travelling. The treating team should determine when the patient is sufficiently recovered for travel.",
  ],
];

const steps = [
  ["Share medical records", "The patient provides available pathology, imaging and previous treatment records."],
  ["Specialist review", "The relevant oncology specialists review the diagnosis."],
  ["Treatment planning", "The team determines the proposed treatment sequence."],
  ["Hospital and doctor selection", "The patient can review relevant doctors and hospitals according to the treatment pathway."],
  ["Treatment estimate", "The hospital provides an estimate based on the proposed treatment."],
  ["Travel planning", "The patient arranges the required travel and accommodation."],
  ["Pre-treatment assessment", "Additional investigations may be performed after arrival."],
  ["Treatment", "The planned treatment is carried out under the treating medical team."],
  ["Pathology review", "Final surgical pathology can influence subsequent treatment."],
  ["Follow-up or continuation of care", "Some patients continue treatment in India, while others return home and continue with their local oncology team."],
];

const store = {
  treatments: [
    {
      id: "8f2c4a91-6d3e-4b17-9e50-1c8a0b7d4e21",
      slug: "breast-cancer-treatment-in-india",
      previousSlugs: [],
      baseName: "Breast Cancer Treatment in India",
      specialtySlug: "surgical-oncology",
      subspecialty: "Breast Cancer",
      category: "Breast Cancer",
      image: "/uploads/treatments/breast-cancer-local-vs-systemic.png",
      destinationSlugs: ["india"],
      doctorSlugs: [
        "dr-ananya-deori",
        "dr-aditi-chaturvedi-1",
        "dr-amit-chakraborty",
        "dr-rajesh-goud-e",
        "dr-balaji-ramani",
        "dr-ashwini-r-k",
        "dr-ankur-bahl",
        "dr-brig-s-viswanath",
      ],
      hospitalSlugs: [
        "apollo-athenaa-women-s-cancer-centre",
        "apollo-delhi",
        "apollo-hospitals-navi-mumbai",
        "apollo-hospitals-bannerghatta-road",
        "apollo-proton-cancer-centre",
        "apollo-hospital-jubilee-hills-hyderabad",
      ],
      costPageSlugs: [
        "breast-conserving-surgery-lumpectomy",
        "mastectomy",
        "nipple-sparing-mastectomy",
        "oncoplastic-breast-surgery",
        "breast-reconstruction",
        "chemotherapy",
        "hormone-therapy",
        "targeted-therapy",
        "immunotherapy",
      ],
      relatedTreatmentSlugs: [],
      status: "published",
      featured: true,
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
      translations: {
        en: {
          status: "published",
          name: "Breast Cancer Treatment in India",
          shortDescription:
            "Breast cancer treatment in India is planned from pathology — surgery, chemotherapy, radiation, hormone therapy, targeted therapy or immunotherapy — not from a single package price.",
          editorialBody,
          fullDescription: "",
          overview: "",
          whatIsIt: "",
          conditionsTreated: "",
          whyPerformed: "",
          whoMayNeed: "",
          howItWorks: "",
          process: steps.map(([title, description], i) => ({
            id: `breast-cancer-step-${i + 1}`,
            title,
            description,
          })),
          preparation:
            "Share biopsy, histopathology, ER/PR/HER2, imaging and previous treatment records before travel so the oncology team can propose a sequence and an itemized estimate.",
          procedureDetails: "",
          recovery:
            "Hospital stay after breast surgery is often short. The trip lengthens for pathology review, radiation fractions or systemic cycles rather than the inpatient bed alone.",
          risks: "",
          hospitalStay: "Surgery 1–8 nights, depending on the operation",
          recoveryPeriod: "Two to eight weeks in India if radiation follows surgery",
          followUp:
            "Request a written summary covering diagnosis, stage, ER/PR/HER2, surgery, systemic therapy, radiation and the recommended surveillance plan.",
          importantConsiderations:
            "Planning ranges are not hospital quotations. Do not add every line together. The treating team confirms the sequence after records review.",
          treatmentType: "Multidisciplinary oncology pathway",
          treatmentSetting: "Accredited partner hospitals in India",
          technology: "Surgery, systemic medicines and external-beam radiation as indicated",
          searchKeywords: [
            "breast cancer treatment in India",
            "lumpectomy cost in India",
            "mastectomy cost in India",
            "breast reconstruction cost in India",
            "breast cancer chemotherapy India",
            "breast cancer hospitals Delhi NCR",
            "breast cancer treatment Mumbai",
            "international breast cancer treatment India",
          ],
          faqs: faqs.map(([question, answer], i) => ({
            id: `breast-cancer-faq-${i + 1}`,
            question,
            answer,
          })),
          imageAlt:
            "Diagram comparing local breast cancer treatment of the breast and lymph nodes with systemic medicines that act throughout the body",
          seoTitle: "Breast Cancer Treatment in India: Surgery, Cost and Care Pathway",
          metaDescription:
            "Breast cancer treatment in India may include lumpectomy, mastectomy, chemotherapy, radiation, hormone therapy, targeted therapy or immunotherapy. Planning ranges by city and the records international patients should send first.",
        },
      },
    },
  ],
};

writeFileSync(
  join(process.cwd(), "content/curated-treatments.json"),
  `${JSON.stringify(store, null, 2)}\n`,
);
console.log("wrote", store.treatments[0].slug, "body", editorialBody.length, "chars");
