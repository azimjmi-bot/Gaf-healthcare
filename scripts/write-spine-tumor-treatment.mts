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

const body = readFileSync(resolve("scripts/spine-tumor-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "spine-tumor-surgery-in-india");
const now = "2026-09-29T06:00:00.000Z";
const SLUG = "spine-tumor-surgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const BRAIN_NEEDLE =
  "Selected brain metastases that sit on a breast or colorectal pathway belong on this named tumour product as well as on [Breast Cancer Treatment in India](/treatments/breast-cancer-treatment-in-india) and [Colon Cancer Treatment in India](/treatments/colon-cancer-treatment-in-india).";
const BRAIN_ADDITION =
  "Spinal column disease sits on [Spine Tumor Surgery in India](/treatments/spine-tumor-surgery-in-india).";
const METS_NEEDLE =
  "Named tumour resection sits on [Brain Tumor Surgery in India](/treatments/brain-tumor-surgery-in-india).";
const SPINE_ADDITION =
  "Selected spinal metastases that need decompression or stabilization sit on [Spine Tumor Surgery in India](/treatments/spine-tumor-surgery-in-india).";
const PROSTATE_NEEDLE =
  "Common sites of metastatic prostate cancer include the bones and lymph nodes, although other organs can also be affected.";

const treatment = {
  id: existing?.id ?? "c9e5a1b3-6d04-4f38-9a7c-4e0b2d9f3c66",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Spine Tumor Surgery in India",
  specialtySlug: "spine-surgery",
  subspecialty: "Spinal Oncology",
  category: "Spine Tumor",
  image: "/uploads/treatments/spine-tumor-vertebral-mets.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-hitesh-garg",
    "dr-vineesh-mathur",
    "dr-abhay-nene",
    "dr-devesh-dholakia",
    "dr-dilip-gopalakrishnan",
    "dr-naveen-m-a",
    "dr-m-d-s-sasidharan",
    "dr-m-balamurugan",
    "dr-raghava-dutt-mulukutla",
    "dr-r-chandrasekhar-naidu",
  ],
  hospitalSlugs: [
    "artemis-hospital",
    "medanta-gurgaon",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "gleneagles-hospitals-bengaluru",
    "gleneagles-healthcity-chennai",
    "apollo-hospital-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "spinal-tumor-surgery",
    "laminectomy",
    "spinal-decompression",
    "spinal-fusion",
    "vertebroplasty",
    "kyphoplasty",
    "chemotherapy",
    "targeted-therapy",
  ],
  relatedTreatmentSlugs: [BRAIN, BREAST, COLON, PROSTATE],
  status: "published" as const,
  featured: true,
  sortOrder: 19,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Spine Tumor Surgery in India",
      shortDescription:
        "Spine tumor surgery in India is planned from the named lesion — vertebral, intradural or metastatic — as decompression, resection or stabilization, not a generic spine package.",
      editorialBody: body,
      process: [
        {
          id: "spine-tumor-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI and CT files, reports, pathology if available, previous cancer treatment and a short description of current neurological symptoms.",
        },
        {
          id: "spine-tumor-step-2",
          title: "Spine and oncology review",
          description:
            "A spine surgeon and, when needed, an oncologist review whether the target is a primary spinal tumour, an intradural mass or metastatic disease.",
        },
        {
          id: "spine-tumor-step-3",
          title: "Procedure selection",
          description:
            "The team names biopsy, laminectomy, decompression, resection, fusion, vertebroplasty or separation surgery rather than a generic spine-tumour package.",
        },
        {
          id: "spine-tumor-step-4",
          title: "Medical optimisation",
          description:
            "Fitness for anaesthesia, spinal stability, neuromonitoring needs and any adjuvant radiation or systemic therapy are addressed before planned surgery.",
        },
        {
          id: "spine-tumor-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus implants, ICU, pathology, neuromonitoring and rehabilitation, not a brochure spinal-tumour package.",
        },
        {
          id: "spine-tumor-step-6",
          title: "Travel to India",
          description:
            "Stable patients travel after records review. Suspected cord compression is a local emergency, not a reason to delay care for international travel.",
        },
        {
          id: "spine-tumor-step-7",
          title: "Surgery",
          description:
            "The tumour is biopsied, decompressed or removed and the spine is stabilized according to the written surgical goal.",
        },
        {
          id: "spine-tumor-step-8",
          title: "Pathology",
          description:
            "Histopathology and, when indicated, molecular testing classify the tumour and shape adjuvant treatment.",
        },
        {
          id: "spine-tumor-step-9",
          title: "Adjuvant planning",
          description:
            "Radiation, SBRT, chemotherapy, targeted therapy, immunotherapy or surveillance is added when the pathology requires it.",
        },
        {
          id: "spine-tumor-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering diagnosis, implants, medicines, movement limits, rehabilitation and the MRI schedule.",
        },
      ],
      preparation:
        "Share MRI and CT files, pathology if already biopsied, and a medication list so the team can judge resection versus decompression versus radiation or observation.",
      recovery:
        "GAF planning notes 5-12 nights after spinal tumor surgery, 2-5 nights after named laminectomy and 4-8 nights after named spinal fusion. Neurological recovery may continue for months.",
      hospitalStay:
        "Typically 5-12 nights after spinal tumor surgery; 2-5 nights after named laminectomy; 4-8 nights after named spinal fusion",
      recoveryPeriod:
        "Several weeks or longer depending on the tumour, neurological deficits, reconstruction, rehabilitation and any oncology follow-up.",
      followUp:
        "Request a written summary covering the named procedure, residual tumour, implants, pathology, medicines, brace or movement limits, rehabilitation and the MRI schedule after returning home.",
      importantConsiderations:
        "A brochure spinal-tumour price is not a surgical plan. Planning ranges are not hospital quotations. New weakness, walking difficulty or bladder or bowel change in a person with cancer belongs in a local emergency department.",
      treatmentType: "Spinal oncological surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Microsurgery, intraoperative neuromonitoring, spinal instrumentation, cement augmentation or separation surgery according to the named tumour",
      searchKeywords: [
        "spine tumor surgery in India",
        "spinal tumor surgery cost in India",
        "spinal cord tumor surgery India",
        "metastatic spinal tumor surgery India",
        "intradural tumor resection India",
        "spinal decompression India",
        "spine tumor surgery recovery",
        "spinal tumor surgery hospital stay",
      ],
      faqs: [
        {
          id: "spine-tumor-faq-1",
          question: "How much does spine tumor surgery cost in India?",
          answer:
            "GAF planning is approximately $10,000-$24,000 for spinal tumor surgery, $4,000-$9,500 for named laminectomy, $8,000-$18,000 for named spinal fusion and $2,500-$6,500 for vertebroplasty.",
        },
        {
          id: "spine-tumor-faq-2",
          question: "Is every spinal tumor operated on?",
          answer:
            "No. Some tumours can be monitored or treated with radiation, medicines or other non-surgical approaches.",
        },
        {
          id: "spine-tumor-faq-3",
          question: "How long is the hospital stay after spine tumor surgery?",
          answer:
            "GAF planning is typically 5-12 nights after spinal tumor surgery, 2-5 nights after named laminectomy and 4-8 nights after named spinal fusion.",
        },
        {
          id: "spine-tumor-faq-4",
          question: "Can metastatic spinal tumors be operated on?",
          answer:
            "Yes. Selected patients may undergo decompression and/or stabilization, often combined with radiation and systemic cancer treatment.",
        },
        {
          id: "spine-tumor-faq-5",
          question: "Can a spinal tumor be removed completely?",
          answer:
            "Sometimes. Complete removal depends on location, pathology and relationship with the spinal cord. Attempting complete removal can create unacceptable neurological risk.",
        },
        {
          id: "spine-tumor-faq-6",
          question: "Will I need radiation after surgery?",
          answer:
            "Some patients do and some do not. GAF EBRT planning is $1,000-$6,000+ and SBRT is $8,000-$17,500 when those products belong on the plan.",
        },
        {
          id: "spine-tumor-faq-7",
          question: "Is spine tumor surgery the same as spinal fusion?",
          answer:
            "No. Spine tumor surgery is directed at a tumour. Fusion is stabilization. A patient may need one, both, or neither.",
        },
        {
          id: "spine-tumor-faq-8",
          question: "Can international patients have spine tumor surgery in India?",
          answer:
            "Yes. Medical records and spine imaging should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "spine-tumor-faq-9",
          question: "Which city in India is best for spine tumor surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with expertise for the named diagnosis.",
        },
        {
          id: "spine-tumor-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "New weakness, difficulty walking, or bladder or bowel dysfunction in a person with cancer belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "spine-tumor-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay for spinal tumor surgery is typically 5-12 nights. Combined evaluation, pathology, radiation planning and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "spine-tumor-faq-12",
          question: "Does a laminectomy use the tumour-surgery price?",
          answer:
            "Not by default. Named laminectomy is $4,000-$9,500, not the $10,000-$24,000 spinal-tumor-surgery band.",
        },
        {
          id: "spine-tumor-faq-13",
          question: "Can children use the adult spinal-tumor sheet?",
          answer:
            "Not by default. Paediatric spinal tumours are quoted after paediatric records review rather than from the adult $10,000-$24,000 band.",
        },
        {
          id: "spine-tumor-faq-14",
          question: "Is every spinal tumor cancerous?",
          answer:
            "No. Spinal tumours can be benign or malignant. Some are primary, while others are metastatic cancers that have spread to the spine.",
        },
      ],
      imageAlt:
        "Thoracic vertebral metastasis with epidural compression of the spinal cord after a posterior approach",
      seoTitle: "Spine Tumor Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about spine tumor surgery in India, including decompression, fusion, metastatic disease, USD cost, recovery, risks and how to choose a spine surgeon.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function linkRelated(slug: string, needle: string, addition: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  const editorial = row.translations?.en?.editorialBody ?? "";
  if (editorial && !editorial.includes(`/treatments/${SLUG}`) && editorial.includes(needle)) {
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle} ${addition}`);
  }
}

linkRelated(BRAIN, BRAIN_NEEDLE, BRAIN_ADDITION);
linkRelated(BREAST, METS_NEEDLE, SPINE_ADDITION);
linkRelated(COLON, METS_NEEDLE, SPINE_ADDITION);
linkRelated(PROSTATE, PROSTATE_NEEDLE, SPINE_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [brain tumor surgery in India](https://gaf.healthcare/treatments/brain-tumor-surgery-in-india).",
    ", [brain tumor surgery in India](https://gaf.healthcare/treatments/brain-tumor-surgery-in-india) and [spine tumor surgery in India](https://gaf.healthcare/treatments/spine-tumor-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  let text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle} ${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/brain-tumor-treatment-body.md"), BRAIN_NEEDLE, BRAIN_ADDITION);
patchMarkdown(resolve("scripts/colon-treatment-body.md"), METS_NEEDLE, SPINE_ADDITION);
patchMarkdown(resolve("scripts/prostate-treatment-body.md"), PROSTATE_NEEDLE, SPINE_ADDITION);
