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

const body = readFileSync(resolve("scripts/brain-tumor-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "brain-tumor-surgery-in-india");
const now = "2026-09-29T05:30:00.000Z";
const SLUG = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const ADDITION =
  "Named tumour resection sits on [Brain Tumor Surgery in India](/treatments/brain-tumor-surgery-in-india).";
const CRANIOTOMY_NEEDLE =
  "Selected brain metastases that sit on a breast or colorectal pathway still need a named neurosurgical corridor — see [Breast Cancer Treatment in India](/treatments/breast-cancer-treatment-in-india) and [Colon Cancer Treatment in India](/treatments/colon-cancer-treatment-in-india).";
const METS_NEEDLE =
  "Selected brain metastases that need an open neurosurgical corridor sit on [Craniotomy Surgery in India](/treatments/craniotomy-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "b8d4f0a2-5c93-4e27-8f6b-3d9a1c8e2b55",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Brain Tumor Surgery in India",
  specialtySlug: "neurosurgery",
  subspecialty: "Neuro-Oncology",
  category: "Brain Tumor",
  image: "/uploads/treatments/brain-tumor-glioma.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-sandeep-vaishya",
    "dr-aditya-gupta",
    "dr-varindera-paul-singh",
    "dr-suresh-sankhla",
    "dr-nitin-dange",
    "dr-krishna-k-n",
    "dr-m-balamurugan",
    "dr-v-r-roopesh-kumar",
    "dr-sujit-kumar-vidiyala",
    "dr-alok-ranjan",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "artemis-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "kims-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "brain-tumor-surgery",
    "glioma-surgery",
    "meningioma-surgery",
    "pituitary-tumor-surgery",
    "endoscopic-brain-surgery",
    "stereotactic-brain-biopsy",
    "skull-base-surgery",
    "chemotherapy",
    "targeted-therapy",
  ],
  relatedTreatmentSlugs: [CRANIOTOMY, BREAST, COLON],
  status: "published" as const,
  featured: true,
  sortOrder: 18,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Brain Tumor Surgery in India",
      shortDescription:
        "Brain tumor surgery in India is planned from the named tumour — glioma, meningioma, pituitary, metastasis or biopsy — as maximal safe resection, not a generic brain-surgery package.",
      editorialBody: body,
      process: [
        {
          id: "brain-tumor-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI or CT files, reports, previous treatment records and a short description of current symptoms.",
        },
        {
          id: "brain-tumor-step-2",
          title: "Neurosurgical review",
          description:
            "A neurosurgeon reviews whether the target is a glioma, meningioma, pituitary tumour, metastasis or another intracranial mass.",
        },
        {
          id: "brain-tumor-step-3",
          title: "Procedure selection",
          description:
            "The team names resection, maximal safe removal, awake mapping, endoscopic corridor or stereotactic biopsy rather than a generic brain-surgery package.",
        },
        {
          id: "brain-tumor-step-4",
          title: "Medical optimisation",
          description:
            "Fitness for anaesthesia, mapping needs and any adjuvant radiation or systemic therapy are addressed before planned surgery.",
        },
        {
          id: "brain-tumor-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus ICU, pathology, molecular tests and rehabilitation, not a brochure tumour package.",
        },
        {
          id: "brain-tumor-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, additional imaging, surgery, ICU monitoring and pathology.",
        },
        {
          id: "brain-tumor-step-7",
          title: "Surgery",
          description:
            "The tumour is biopsied or removed according to maximal safe resection, then the bone flap is generally replaced.",
        },
        {
          id: "brain-tumor-step-8",
          title: "Pathology",
          description:
            "Histopathology and, when indicated, molecular testing classify the tumour and shape adjuvant treatment.",
        },
        {
          id: "brain-tumor-step-9",
          title: "Adjuvant planning",
          description:
            "Radiation, chemotherapy, targeted therapy, radiosurgery or surveillance is added when the pathology requires it.",
        },
        {
          id: "brain-tumor-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering diagnosis, residual tumour, medicines, warning signs and MRI follow-up.",
        },
      ],
      preparation:
        "Share MRI or CT files, pathology if already biopsied, and a medication list so the team can judge resection versus biopsy versus radiosurgery or observation.",
      recovery:
        "GAF planning notes 5–10 nights after brain tumor surgery, 5–12 nights after glioma surgery and 1–3 nights after stereotactic brain biopsy. Recovery of energy often takes several weeks or longer.",
      hospitalStay:
        "Typically 5–10 nights after brain tumor surgery; 5–12 nights after glioma surgery; 1–3 nights after stereotactic brain biopsy",
      recoveryPeriod:
        "Several weeks or longer depending on the tumour, neurological deficits, rehabilitation and any oncology follow-up.",
      followUp:
        "Request a written summary covering the named procedure, residual tumour, pathology, medicines, wound care, driving limits, rehabilitation and the MRI schedule after returning home.",
      importantConsiderations:
        "A brochure brain-tumour price is not a surgical plan. Planning ranges are not hospital quotations. Sudden severe headache, new weakness, seizure, chest pain or breathing difficulty belongs in a local emergency department.",
      treatmentType: "Neuro-oncological surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Microsurgery, neuronavigation, awake mapping, endoscopic corridor, stereotactic biopsy or fluorescence guidance according to the named tumour",
      searchKeywords: [
        "brain tumor surgery in India",
        "brain tumour surgery cost in India",
        "glioma surgery India",
        "meningioma surgery India",
        "awake craniotomy India",
        "stereotactic brain biopsy India",
        "glioblastoma surgery India",
        "brain tumor surgery recovery",
      ],
      faqs: [
        {
          id: "brain-tumor-faq-1",
          question: "How much does brain tumor surgery cost in India?",
          answer:
            "GAF planning is approximately $6,000–$15,000 for brain tumor surgery, $7,000–$16,000 for glioma surgery, $6,500–$15,000 for meningioma surgery, $5,000–$12,000 for pituitary tumor surgery and $2,000–$6,000 for stereotactic brain biopsy.",
        },
        {
          id: "brain-tumor-faq-2",
          question: "Can every brain tumor be removed completely?",
          answer:
            "No. Complete removal is possible for some tumours but may be unsafe near critical brain structures. Maximal safe resection or biopsy may be recommended instead.",
        },
        {
          id: "brain-tumor-faq-3",
          question: "How long is the hospital stay after brain tumor surgery?",
          answer:
            "GAF planning is typically 5–10 nights after brain tumor surgery, 5–12 nights after glioma surgery and 1–3 nights after stereotactic brain biopsy.",
        },
        {
          id: "brain-tumor-faq-4",
          question: "What is maximal safe resection?",
          answer:
            "It means removing as much tumour as possible while protecting important neurological functions such as speech, movement, vision and memory.",
        },
        {
          id: "brain-tumor-faq-5",
          question: "Is awake craniotomy suitable for every patient?",
          answer:
            "No. Patient cooperation, tumour location, medical condition and the surgical team's assessment all influence whether it is appropriate.",
        },
        {
          id: "brain-tumor-faq-6",
          question: "Does every brain tumor need radiation or chemotherapy?",
          answer:
            "No. Adjuvant treatment depends on pathology and molecular findings. GAF EBRT planning is $1,000–$6,000+ and chemotherapy is $1,500–$8,000+ when those products belong on the plan.",
        },
        {
          id: "brain-tumor-faq-7",
          question: "What is the success rate of brain tumor surgery?",
          answer:
            "There is no single success rate because tumours differ. Ask for outcome data relevant to the specific diagnosis, location and surgical objective.",
        },
        {
          id: "brain-tumor-faq-8",
          question: "Can international patients have brain tumor surgery in India?",
          answer:
            "Yes. Medical records and brain imaging should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "brain-tumor-faq-9",
          question: "Which city in India is best for brain tumor surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with expertise for the named diagnosis.",
        },
        {
          id: "brain-tumor-faq-10",
          question: "Is a craniotomy the same as brain tumor surgery?",
          answer:
            "No. A craniotomy is the skull opening. Brain tumor surgery is the named tumour product that often uses that corridor.",
        },
        {
          id: "brain-tumor-faq-11",
          question: "When should I go to an emergency department after surgery?",
          answer:
            "Sudden severe headache, new weakness, difficulty speaking, seizure, chest pain or breathing difficulty belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "brain-tumor-faq-12",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay for brain tumor surgery is typically 5–10 nights. Combined evaluation, pathology and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "brain-tumor-faq-13",
          question: "Does a stereotactic biopsy use the resection price?",
          answer:
            "No. Named stereotactic brain biopsy is $2,000–$6,000, not the $6,000–$15,000 brain-tumor-surgery resection band.",
        },
        {
          id: "brain-tumor-faq-14",
          question: "Can children use the adult brain-tumor sheet?",
          answer:
            "Not by default. Paediatric brain tumours are quoted after paediatric records review rather than from the adult $6,000–$15,000 band.",
        },
      ],
      imageAlt:
        "Microsurgical glioma resection illustrating infiltrative tumour tissue at the cortical margin",
      seoTitle: "Brain Tumor Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about brain tumor surgery in India, including glioma, meningioma, awake craniotomy, biopsy, USD cost, recovery, risks and how to choose a neurosurgeon.",
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

linkRelated(CRANIOTOMY, CRANIOTOMY_NEEDLE, ADDITION);
linkRelated(BREAST, METS_NEEDLE, ADDITION);
linkRelated(COLON, METS_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [craniotomy surgery in India](https://gaf.healthcare/treatments/craniotomy-surgery-in-india).",
    ", [craniotomy surgery in India](https://gaf.healthcare/treatments/craniotomy-surgery-in-india) and [brain tumor surgery in India](https://gaf.healthcare/treatments/brain-tumor-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const craniotomyMd = resolve("scripts/craniotomy-treatment-body.md");
let craniotomyText = readFileSync(craniotomyMd, "utf8");
if (!craniotomyText.includes(`/treatments/${SLUG}`) && craniotomyText.includes(CRANIOTOMY_NEEDLE)) {
  writeFileSync(craniotomyMd, craniotomyText.replace(CRANIOTOMY_NEEDLE, `${CRANIOTOMY_NEEDLE} ${ADDITION}`));
  console.log("updated scripts/craniotomy-treatment-body.md");
}

const colonMd = resolve("scripts/colon-treatment-body.md");
let colonText = readFileSync(colonMd, "utf8");
if (!colonText.includes(`/treatments/${SLUG}`) && colonText.includes(METS_NEEDLE)) {
  writeFileSync(colonMd, colonText.replace(METS_NEEDLE, `${METS_NEEDLE} ${ADDITION}`));
  console.log("updated scripts/colon-treatment-body.md");
}
