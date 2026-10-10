import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

const body = readFileSync(resolve("scripts/radical-nephrectomy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "radical-nephrectomy-in-india");
const now = "2026-10-02T15:00:00.000Z";
const SLUG = "radical-nephrectomy-in-india";
const RP = "radical-prostatectomy-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const LINK =
  " Named radical-nephrectomy lists sit on [Radical Nephrectomy in India](/treatments/radical-nephrectomy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Named implant lists sit on [Penile Implantation in India](/treatments/penile-implantation-in-india). BPH operations",
    `Named implant lists sit on [Penile Implantation in India](/treatments/penile-implantation-in-india).${LINK} BPH operations`,
  ],
];

const treatment = {
  id: existing?.id ?? "b2c3d7f6-9d15-4c06-d63b-2f7a0c3d6b81",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Radical Nephrectomy in India",
  specialtySlug: "urology",
  subspecialty: "Uro-Oncology",
  category: "Radical Nephrectomy",
  image: "/uploads/treatments/rn-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-rajiv-yadav",
    "dr-anant-kumar",
    "dr-puneet-ahluwalia",
    "dr-varun-agarwal",
    "dr-vivek-venkatramani",
    "dr-manohar-t",
    "dr-sreedhar-reddy",
    "dr-sivakumar-mahalingam",
    "dr-duraisamy-s",
    "dr-chinnababu-sunkavalli",
    "dr-rajagopal-v",
  ],
  hospitalSlugs: [
    "artemis-hospital",
    "max-super-speciality-hospital-saket",
    "medanta-gurgaon",
    "medicover-hospital-navi-mumbai",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "radical-nephrectomy",
    "partial-nephrectomy",
    "radical-prostatectomy",
    "radical-cystectomy",
  ],
  relatedTreatmentSlugs: [RP, PROSTATE],
  status: "published" as const,
  featured: true,
  sortOrder: 70,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Radical Nephrectomy in India",
      shortDescription:
        "Radical nephrectomy in India is named after tumour anatomy and remaining kidney function, not a robotic brochure. GAF planning is $7,500–$18,000, typically 4–8 nights.",
      editorialBody: body,
      process: [
        {
          id: "rn-step-1",
          title: "Share records",
          description:
            "The patient provides CT or MRI, creatinine, eGFR, chest imaging and the medication list before anyone books travel.",
        },
        {
          id: "rn-step-2",
          title: "Uro-oncology review",
          description:
            "A urologist reviews whether radical nephrectomy, partial nephrectomy, ablation, surveillance or systemic treatment is the honest product.",
        },
        {
          id: "rn-step-3",
          title: "Name the product",
          description:
            "The team writes radical nephrectomy only after size, location, vein status and remaining function are reviewed.",
        },
        {
          id: "rn-step-4",
          title: "Itemized estimate",
          description:
            "GAF radical-nephrectomy planning is $7,500–$18,000. Neighbouring partial nephrectomy is $7,000–$16,000 when a remnant can honestly be saved.",
        },
        {
          id: "rn-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute bleeding, chest pain or anuria is a local emergency.",
        },
        {
          id: "rn-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, imaging and fitness after arrival.",
        },
        {
          id: "rn-step-7",
          title: "Deliver the named nephrectomy",
          description: "Open, laparoscopic or robotic radical nephrectomy proceeds only after the list is named.",
        },
        {
          id: "rn-step-8",
          title: "Kidney-function care",
          description: "Urine output, creatinine and wound checks are watched before discharge.",
        },
        {
          id: "rn-step-9",
          title: "Pathology and follow-up",
          description:
            "The patient leaves with specimen timing, remaining-kidney targets and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share CT or MRI, creatinine, eGFR and chest imaging so the team can judge radical versus partial nephrectomy.",
      recovery:
        "Walking starts early. Heavy lifting waits. GAF planning is 4–8 nights. Fuller recovery often takes 8–12 weeks.",
      hospitalStay: "Typically 4–8 nights.",
      recoveryPeriod:
        "Light activity resumes over 2–4 weeks. Travel home waits for the surgeon's clearance and pathology review.",
      followUp:
        "Request a written summary covering pathology, remaining-kidney targets, blood-pressure checks and who will follow the patient after returning home.",
      importantConsiderations:
        "Radical nephrectomy is whole-kidney cancer surgery, not partial nephrectomy. GAF planning is $7,500–$18,000. Heavy bleeding, chest pain, very low urine output or fainting belongs in a local emergency department.",
      treatmentType: "Radical Nephrectomy / Uro-Oncology",
      treatmentSetting: "Accredited partner urology and uro-oncology theatres and wards in India",
      technology:
        "Open, laparoscopic and robot-assisted radical nephrectomy, neighbouring partial-nephrectomy sheet",
      searchKeywords: [
        "Radical Nephrectomy in India",
        "Radical nephrectomy cost in India",
        "Kidney removal surgery in India",
        "Kidney cancer surgery in India",
        "Laparoscopic radical nephrectomy in India",
        "Robotic radical nephrectomy in India",
        "Renal cell carcinoma surgery in India",
        "Radical nephrectomy recovery",
        "Kidney removal cost in India",
      ],
      faqs: [
        {
          id: "rn-faq-1",
          question: "What is radical nephrectomy?",
          answer:
            "Surgical removal of the entire kidney containing a tumour, usually with surrounding fat and sometimes nodes or the adrenal gland.",
        },
        {
          id: "rn-faq-2",
          question: "Is radical nephrectomy always necessary?",
          answer:
            "No. Partial nephrectomy may be preferable when a useful remnant can honestly be saved.",
        },
        {
          id: "rn-faq-3",
          question: "How much does radical nephrectomy cost in India?",
          answer:
            "GAF Healthcare planning is $7,500–$18,000, typically 4–8 nights. US comparison is $30,000–$70,000.",
        },
        {
          id: "rn-faq-4",
          question: "How long is hospital stay?",
          answer: "GAF planning is typically 4–8 nights.",
        },
        {
          id: "rn-faq-5",
          question: "Can someone live with one kidney?",
          answer: "Yes. Many people live normally with one healthy, functioning kidney.",
        },
        {
          id: "rn-faq-6",
          question: "Does it always remove the adrenal gland?",
          answer: "No. The adrenal gland is removed only when there is a clinical reason.",
        },
        {
          id: "rn-faq-7",
          question: "Can it be done laparoscopically or robotically?",
          answer:
            "Yes, in selected patients. Open surgery remains important for large, complex or vein-involved tumours.",
        },
        {
          id: "rn-faq-8",
          question: "Is chemotherapy required afterward?",
          answer:
            "Not routinely. Selected high-risk patients may receive postoperative immunotherapy.",
        },
        {
          id: "rn-faq-9",
          question: "Is this the same as partial nephrectomy?",
          answer: "No. Partial nephrectomy removes the tumour and leaves remnant kidney tissue.",
        },
        {
          id: "rn-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Heavy bleeding, chest pain, severe shortness of breath, very low urine output, high fever or fainting belongs in a local emergency department.",
        },
        {
          id: "rn-faq-11",
          question: "Which city in India is right for radical nephrectomy?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "rn-faq-12",
          question: "Can international patients get radical nephrectomy in India?",
          answer: "Yes, after records review, documentation and an appropriate travel plan.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a kidney with a central tumour, surrounding fat, adrenal gland and a healthy opposite kidney",
      seoTitle: "Radical Nephrectomy in India: Cost, Procedure & Recovery",
      metaDescription:
        "Radical nephrectomy in India for kidney cancer: understand the procedure, cost, laparoscopic and robotic surgery, recovery, risks and the international patient journey.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  let editorial = row.translations?.en?.editorialBody ?? "";
  if (!editorial || editorial.includes(`/treatments/${SLUG}`)) return;
  for (const [needle, replacement] of REPLACEMENTS) {
    if (editorial.includes(needle)) {
      editorial = editorial.replaceAll(needle, replacement);
    }
  }
  row.translations!.en!.editorialBody = editorial;
}

patchEditorial(RP);
patchEditorial(PROSTATE);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [TURP surgery in India](https://gaf.healthcare/treatments/turp-surgery-in-india).",
    ", [TURP surgery in India](https://gaf.healthcare/treatments/turp-surgery-in-india) and [radical nephrectomy in India](https://gaf.healthcare/treatments/radical-nephrectomy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string) {
  if (!existsSync(path)) return;
  let text = readFileSync(path, "utf8");
  const original = text;
  if (text.includes(`/treatments/${SLUG}`)) return;
  for (const [needle, replacement] of REPLACEMENTS) {
    if (text.includes(needle)) {
      text = text.replaceAll(needle, replacement);
    }
  }
  if (text !== original) {
    writeFileSync(path, text);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/radical-prostatectomy-treatment-body.md"));
