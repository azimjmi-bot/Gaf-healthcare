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

const body = readFileSync(resolve("scripts/radical-prostatectomy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "radical-prostatectomy-in-india");
const now = "2026-10-02T10:00:00.000Z";
const SLUG = "radical-prostatectomy-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const ADDITION =
  "; named lists sit on [Radical Prostatectomy in India](/treatments/radical-prostatectomy-in-india)";
const PROSTATE_NEEDLE =
  "robotic-assisted prostatectomy ([Robotic Prostatectomy in India](/blogs/robotic-prostatectomy-in-india))";

const treatment = {
  id: existing?.id ?? "c7f8d2a1-4e60-9d51-e18c-7a2b5d8e1c36",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Radical Prostatectomy in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Uro-Oncology",
  category: "Radical Prostatectomy",
  image: "/uploads/treatments/rp-hero.webp",
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
    "dr-mallikarjuna-reddy-n",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "max-smart-super-speciality-hospital-saket",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-jubilee-hills-hyderabad",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "radical-prostatectomy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "image-guided-radiotherapy-igrt",
    "stereotactic-body-radiotherapy-sbrt",
    "brachytherapy",
    "hormone-therapy",
    "chemotherapy",
  ],
  relatedTreatmentSlugs: [PROSTATE],
  status: "published" as const,
  featured: true,
  sortOrder: 65,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Radical Prostatectomy in India",
      shortDescription:
        "Radical prostatectomy in India is named after PSA, Grade Group and MRI, not a robot brochure. GAF planning is $7,000–$18,000, typically 3–7 nights.",
      editorialBody: body,
      process: [
        {
          id: "rp-step-1",
          title: "Share records",
          description:
            "The patient provides PSA history, biopsy, Grade Group, MRI and PSMA PET reports before anyone books travel.",
        },
        {
          id: "rp-step-2",
          title: "Uro-oncology review",
          description:
            "A urologist or uro-oncologist reviews whether radical prostatectomy, radiation, surveillance or a combination is the honest product.",
        },
        {
          id: "rp-step-3",
          title: "Name the product",
          description:
            "The team writes open, laparoscopic or robotic radical prostatectomy only after stage, grade and fitness are reviewed.",
        },
        {
          id: "rp-step-4",
          title: "Itemized estimate",
          description:
            "GAF radical-prostatectomy planning is $7,000–$18,000. Neighbouring EBRT is $1,000–$6,000+ when radiation is named instead.",
        },
        {
          id: "rp-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Inability to pass urine, heavy bleeding or chest pain is a local emergency.",
        },
        {
          id: "rp-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, fitness and staging after arrival.",
        },
        {
          id: "rp-step-7",
          title: "Deliver the named prostatectomy",
          description: "Open, laparoscopic or robotic radical prostatectomy proceeds only after the product is named.",
        },
        {
          id: "rp-step-8",
          title: "Ward and catheter care",
          description: "Pain, urine drainage and the anastomosis are watched before discharge.",
        },
        {
          id: "rp-step-9",
          title: "PSA follow-up",
          description:
            "The patient leaves with a pathology summary, catheter plan and who will follow PSA after returning home.",
        },
      ],
      preparation:
        "Share PSA history, biopsy, Grade Group, MRI and PSMA PET so the team can judge prostatectomy versus radiation versus surveillance.",
      recovery:
        "Catheter care, pelvic-floor work and early walking decide recovery. GAF planning is 3–7 nights.",
      hospitalStay: "Typically 3–7 nights.",
      recoveryPeriod:
        "Light activity resumes over weeks. Urinary and sexual function may continue to improve for months. PSA surveillance continues after travel home.",
      followUp:
        "Request a written summary covering pathology, margins, nodes, catheter timing, continence advice and the PSA schedule.",
      importantConsiderations:
        "Radical prostatectomy is major surgery. GAF planning is $7,000–$18,000. Heavy bleeding, inability to pass urine, chest pain or fainting belongs in a local emergency department.",
      treatmentType: "Radical Prostatectomy / Uro-Oncology",
      treatmentSetting: "Accredited partner uro-oncology theatres and wards in India",
      technology:
        "Open, laparoscopic and robot-assisted radical prostatectomy, selected pelvic lymph-node dissection, neighbouring radiation and hormone-therapy sheets",
      searchKeywords: [
        "Radical Prostatectomy in India",
        "Radical prostatectomy cost in India",
        "Robotic radical prostatectomy in India",
        "Robotic prostate cancer surgery India",
        "Prostate cancer surgery in India",
        "Prostate removal surgery in India",
        "Prostatectomy recovery",
        "Radical prostatectomy for prostate cancer",
        "Robotic prostatectomy cost in India",
      ],
      faqs: [
        {
          id: "rp-faq-1",
          question: "What is radical prostatectomy?",
          answer:
            "Surgery to remove the entire prostate gland, generally with the seminal vesicles, and sometimes nearby lymph nodes, to treat selected prostate cancers.",
        },
        {
          id: "rp-faq-2",
          question: "What is the most common minimally invasive approach?",
          answer: "Robot-assisted laparoscopic radical prostatectomy (RARP).",
        },
        {
          id: "rp-faq-3",
          question: "How much does radical prostatectomy cost in India?",
          answer:
            "GAF Healthcare planning is $7,000–$18,000, typically 3–7 nights. US comparison is $30,000–$70,000.",
        },
        {
          id: "rp-faq-4",
          question: "How long is hospital stay after radical prostatectomy?",
          answer: "GAF planning is typically 3–7 nights.",
        },
        {
          id: "rp-faq-5",
          question: "Will I need a urinary catheter?",
          answer:
            "Yes. A catheter is normally left temporarily while the bladder-to-urethra connection heals.",
        },
        {
          id: "rp-faq-6",
          question: "Can erectile function be affected?",
          answer:
            "Yes. Erectile dysfunction is an important possible consequence. Nerve-sparing may help when it is oncologically safe, but it is not a guarantee.",
        },
        {
          id: "rp-faq-7",
          question: "Can urinary continence be affected?",
          answer:
            "Yes. Leakage is common during early recovery, although continence often improves over time.",
        },
        {
          id: "rp-faq-8",
          question: "Does everyone need robotic surgery?",
          answer: "No. Open and conventional laparoscopic surgery remain options in appropriate centres.",
        },
        {
          id: "rp-faq-9",
          question: "Will I need radiation after surgery?",
          answer:
            "Not necessarily. Additional treatment depends on the pathology and PSA follow-up.",
        },
        {
          id: "rp-faq-10",
          question: "Is radical prostatectomy the same as TURP?",
          answer:
            "No. Radical prostatectomy removes the entire prostate for selected cancers. TURP removes part of the prostate to improve urine flow from benign enlargement. There is no live GAF TURP treatment page.",
        },
        {
          id: "rp-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Heavy bleeding, inability to pass urine, chest pain, shortness of breath, one-sided leg swelling, fever with shaking chills or fainting belongs in a local emergency department.",
        },
        {
          id: "rp-faq-12",
          question: "Which city in India is right for radical prostatectomy?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational unlabeled sagittal illustration of the male pelvis used as the hero",
      seoTitle: "Radical Prostatectomy in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about radical prostatectomy in India, including robotic surgery, cost, eligibility, procedure, recovery, risks, PSA follow-up and treatment options for prostate cancer.",
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
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle}${addition}`);
  }
}

linkRelated(PROSTATE, PROSTATE_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [sleeve gastrectomy in India](https://gaf.healthcare/treatments/sleeve-gastrectomy-in-india).",
    ", [sleeve gastrectomy in India](https://gaf.healthcare/treatments/sleeve-gastrectomy-in-india) and [radical prostatectomy in India](https://gaf.healthcare/treatments/radical-prostatectomy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle?: string, addition?: string) {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  let next = text;
  if (needle && addition && text.includes(needle) && !text.includes(`/treatments/${SLUG}`)) {
    next = text.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/prostate-treatment-body.md"), PROSTATE_NEEDLE, ADDITION);
