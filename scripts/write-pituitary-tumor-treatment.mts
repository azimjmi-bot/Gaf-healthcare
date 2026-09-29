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

const body = readFileSync(resolve("scripts/pituitary-tumor-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "pituitary-tumor-surgery-in-india");
const now = "2026-09-29T07:00:00.000Z";
const SLUG = "pituitary-tumor-surgery-in-india";
const ENDOSCOPIC = "endoscopic-brain-surgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const ENDOSCOPIC_NEEDLE =
  "Named [pituitary tumor surgery](/costs/India/Neurosurgery/Pituitary-Tumor-Surgery) is **$5,000–$12,000** (typically **3–7 nights**) when that is the product rather than a generic endoscope count.";
const ENDOSCOPIC_ADDITION =
  "The named tumour product sits on [Pituitary Tumor Surgery in India](/treatments/pituitary-tumor-surgery-in-india).";
const BRAIN_NEEDLE =
  "Selected sella corridors sit on [endoscopic skull base surgery](/costs/India/Neurosurgery/Endoscopic-Skull-Base-Surgery) at **$6,000–$15,000** (typically **4–8 nights**) or on [pituitary tumor surgery](/costs/India/Neurosurgery/Pituitary-Tumor-Surgery).";
const BRAIN_ADDITION =
  "Named pituitary resection sits on [Pituitary Tumor Surgery in India](/treatments/pituitary-tumor-surgery-in-india).";
const CRANIOTOMY_NEEDLE =
  "See [Endoscopic Brain Surgery in India](/treatments/endoscopic-brain-surgery-in-india).";
const CRANIOTOMY_ADDITION =
  "Named pituitary resection sits on [Pituitary Tumor Surgery in India](/treatments/pituitary-tumor-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "e1a7c3d5-8f26-4b5a-9c9e-6a2d4f1b5e88",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Pituitary Tumor Surgery in India",
  specialtySlug: "neurosurgery",
  subspecialty: "Neuro-Oncology",
  category: "Pituitary Tumor",
  image: "/uploads/treatments/pituitary-tumor-macroadenoma.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-aditya-gupta",
    "dr-sudhir-dubey",
    "dr-suresh-sankhla",
    "dr-nitin-dange",
    "dr-k-kartik-revanappa",
    "dr-girish-krishna-joshi",
    "dr-v-r-roopesh-kumar",
    "dr-ari-g-chacko",
    "dr-sujit-kumar-vidiyala",
    "dr-manas-kumar-panigrahi",
  ],
  hospitalSlugs: [
    "artemis-hospital",
    "medanta-gurgaon",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-proton-cancer-centre",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "pituitary-tumor-surgery",
    "endoscopic-brain-surgery",
    "endoscopic-skull-base-surgery",
    "skull-base-surgery",
    "brain-tumor-surgery",
    "gamma-knife",
    "stereotactic-radiosurgery-srs",
  ],
  relatedTreatmentSlugs: [ENDOSCOPIC, BRAIN, CRANIOTOMY],
  status: "published" as const,
  featured: true,
  sortOrder: 21,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Pituitary Tumor Surgery in India",
      shortDescription:
        "Pituitary tumor surgery in India is planned from the named adenoma — functioning, nonfunctioning, micro or macro — usually through an endoscopic transsphenoidal corridor, not a generic brain-surgery package.",
      editorialBody: body,
      process: [
        {
          id: "pituitary-step-1",
          title: "Share medical records",
          description:
            "The patient provides pituitary MRI files, hormone reports, visual-field results when available and a short description of current symptoms.",
        },
        {
          id: "pituitary-step-2",
          title: "Neurosurgical and endocrine review",
          description:
            "A neurosurgeon and endocrinologist review whether the target is a prolactinoma, acromegaly, Cushing disease, a nonfunctioning macroadenoma or another sellar mass.",
        },
        {
          id: "pituitary-step-3",
          title: "Procedure selection",
          description:
            "The team names endoscopic transsphenoidal resection, decompression, observation, medication or a craniotomy list rather than a generic pituitary package.",
        },
        {
          id: "pituitary-step-4",
          title: "Medical optimisation",
          description:
            "Hormone replacement, visual status, anaesthesia fitness and any ENT participation are addressed before planned surgery.",
        },
        {
          id: "pituitary-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus ICU, pathology, reconstruction and endocrine monitoring, not a brochure overnight package.",
        },
        {
          id: "pituitary-step-6",
          title: "Travel to India",
          description:
            "Stable patients travel after records review. Sudden severe headache or vision loss is a local emergency, not a reason to delay care for international travel.",
        },
        {
          id: "pituitary-step-7",
          title: "Surgery",
          description:
            "The tumour is removed or decompressed through the named transsphenoidal corridor, with reconstruction when the skull base is opened.",
        },
        {
          id: "pituitary-step-8",
          title: "Hormone and fluid monitoring",
          description:
            "Sodium, urine output, cortisol and other pituitary hormones are watched closely in the first days after surgery.",
        },
        {
          id: "pituitary-step-9",
          title: "Adjuvant planning",
          description:
            "Medication, Gamma Knife, SRS, surveillance or further surgery is added when residual disease or hormone excess remains.",
        },
        {
          id: "pituitary-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering diagnosis, hormone replacement, nose-blowing limits, warning signs and the MRI schedule.",
        },
      ],
      preparation:
        "Share dedicated pituitary MRI files, hormone reports and visual-field results so the team can judge resection versus medication versus observation versus radiosurgery.",
      recovery:
        "GAF planning notes 3-7 nights after pituitary tumor surgery. Hormone and sodium monitoring often continue after wound comfort has already improved.",
      hospitalStay: "Typically 3-7 nights after pituitary tumor surgery",
      recoveryPeriod:
        "Several weeks or longer depending on hormone status, vision, reconstruction and any oncology or radiosurgery follow-up.",
      followUp:
        "Request a written summary covering the named procedure, residual tumour, hormone replacement, nasal restrictions, driving limits and the MRI schedule after returning home.",
      importantConsiderations:
        "A brochure pituitary price is not a surgical plan. Planning ranges are not hospital quotations. Sudden severe headache, sudden vision loss or reduced consciousness belongs in a local emergency department.",
      treatmentType: "Transsphenoidal pituitary surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Endoscopic transsphenoidal corridor, neuronavigation, skull-base reconstruction or craniotomy according to sellar anatomy",
      searchKeywords: [
        "pituitary tumor surgery in India",
        "pituitary tumour surgery cost in India",
        "endoscopic transsphenoidal surgery India",
        "pituitary adenoma surgery India",
        "acromegaly surgery India",
        "Cushing disease surgery India",
        "prolactinoma surgery India",
        "pituitary tumor surgery recovery",
      ],
      faqs: [
        {
          id: "pituitary-faq-1",
          question: "How much does pituitary tumor surgery cost in India?",
          answer:
            "GAF planning is approximately $5,000-$12,000 for pituitary tumor surgery. Named endoscopic skull base surgery is $6,000-$15,000 and Gamma Knife is $10,500-$22,000 when those products belong on the plan.",
        },
        {
          id: "pituitary-faq-2",
          question: "Is pituitary surgery performed through the nose?",
          answer:
            "Yes. Most pituitary tumours requiring surgery can be approached through the nose using an endoscopic transsphenoidal technique.",
        },
        {
          id: "pituitary-faq-3",
          question: "How long is the hospital stay after pituitary tumor surgery?",
          answer:
            "GAF planning is typically 3-7 nights. Some hospital pages quote a shorter stay after uncomplicated endoscopic surgery.",
        },
        {
          id: "pituitary-faq-4",
          question: "Do all pituitary tumors need surgery?",
          answer:
            "No. Some are monitored, while prolactinomas often respond to medication first.",
        },
        {
          id: "pituitary-faq-5",
          question: "Does pituitary surgery involve opening the skull?",
          answer:
            "Usually not. A craniotomy is reserved for selected tumours whose anatomy makes a transsphenoidal approach unsuitable.",
        },
        {
          id: "pituitary-faq-6",
          question: "Can vision improve after pituitary tumor surgery?",
          answer:
            "Yes, when visual impairment is caused by pressure on the optic pathways. Recovery depends partly on how severe and prolonged the compression was.",
        },
        {
          id: "pituitary-faq-7",
          question: "Will I need hormone replacement after surgery?",
          answer:
            "Some patients do and some do not. Replacement may be temporary or permanent depending on remaining pituitary function.",
        },
        {
          id: "pituitary-faq-8",
          question: "Can international patients have pituitary tumor surgery in India?",
          answer:
            "Yes. MRI images, hormone reports and visual-field results should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "pituitary-faq-9",
          question: "Which city in India is best for pituitary tumor surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with endocrinology and skull-base expertise for the named diagnosis.",
        },
        {
          id: "pituitary-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe headache, sudden vision loss, double vision, vomiting, confusion or reduced consciousness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "pituitary-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 3-7 nights. Combined evaluation, endocrine review and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "pituitary-faq-12",
          question: "Does Gamma Knife use the pituitary-surgery price?",
          answer:
            "No. Named Gamma Knife is $10,500-$22,000, not the $5,000-$12,000 pituitary-tumor-surgery band.",
        },
        {
          id: "pituitary-faq-13",
          question: "Can children use the adult pituitary sheet?",
          answer:
            "Not by default. Paediatric pituitary cases are quoted after paediatric records review rather than from the adult $5,000-$12,000 band.",
        },
        {
          id: "pituitary-faq-14",
          question: "Is a pituitary tumor cancer?",
          answer:
            "Most pituitary tumours are not cancerous. Pituitary carcinomas are extremely rare.",
        },
      ],
      imageAlt:
        "Pituitary macroadenoma in the sella turcica compressing the optic chiasm",
      seoTitle: "Pituitary Tumor Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about pituitary tumor surgery in India, including endoscopic transsphenoidal approach, USD cost, recovery, hormones, vision and how to choose a neurosurgeon.",
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

linkRelated(ENDOSCOPIC, ENDOSCOPIC_NEEDLE, ENDOSCOPIC_ADDITION);
linkRelated(BRAIN, BRAIN_NEEDLE, BRAIN_ADDITION);
linkRelated(CRANIOTOMY, CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [endoscopic brain surgery in India](https://gaf.healthcare/treatments/endoscopic-brain-surgery-in-india).",
    ", [endoscopic brain surgery in India](https://gaf.healthcare/treatments/endoscopic-brain-surgery-in-india) and [pituitary tumor surgery in India](https://gaf.healthcare/treatments/pituitary-tumor-surgery-in-india).",
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

patchMarkdown(resolve("scripts/endoscopic-brain-treatment-body.md"), ENDOSCOPIC_NEEDLE, ENDOSCOPIC_ADDITION);
patchMarkdown(resolve("scripts/brain-tumor-treatment-body.md"), BRAIN_NEEDLE, BRAIN_ADDITION);
patchMarkdown(resolve("scripts/craniotomy-treatment-body.md"), CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);
