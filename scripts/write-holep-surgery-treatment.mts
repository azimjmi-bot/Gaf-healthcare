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

const body = readFileSync(resolve("scripts/holep-surgery-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "holep-surgery-in-india");
const now = "2026-10-02T13:00:00.000Z";
const SLUG = "holep-surgery-in-india";
const RP = "radical-prostatectomy-in-india";
const PENILE = "penile-implantation-in-india";
const GREEN = "greenlight-laser-surgery-in-india";
const LINK = " Named HoLEP lists sit on [HoLEP Surgery in India](/treatments/holep-surgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF TURP, HoLEP or robotic-prostatectomy-only treatment page.",
    `There is no live GAF TURP or robotic-prostatectomy-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF TURP or HoLEP treatment page.",
    `There is no live GAF TURP treatment page.${LINK}`,
  ],
  [
    "There is no live GAF erectile-dysfunction, Peyronie's, TURP or HoLEP treatment page.",
    `There is no live GAF erectile-dysfunction, Peyronie's or TURP treatment page.${LINK}`,
  ],
  [
    "There is no live GAF TURP, HoLEP, Aquablation, UroLift or BPH-only treatment page.",
    `There is no live GAF TURP, Aquablation, UroLift or BPH-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF HoLEP or TURP treatment page; those products sit on neighbouring cost sheets until named separately.",
    `There is no live GAF TURP treatment page.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "f0a1b5d4-7b93-2a84-b41f-0d5e8a1b4f69",
  slug: SLUG,
  previousSlugs: [],
  baseName: "HoLEP Surgery in India",
  specialtySlug: "urology",
  subspecialty: "Endourology",
  category: "HoLEP (Holmium Laser Enucleation)",
  image: "/uploads/treatments/hl-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anant-kumar",
    "dr-sanjay-gogoi",
    "dr-rajesh-taneja",
    "dr-piyush-singhania",
    "dr-lokesh-sinha",
    "dr-manohar-t",
    "dr-sreedhar-reddy",
    "dr-duraisamy-s",
    "dr-rajagopal-v",
    "dr-arun-shah",
  ],
  hospitalSlugs: [
    "max-super-speciality-hospital-saket",
    "medanta-gurgaon",
    "apollo-delhi",
    "medicover-hospital-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "holep-holmium-laser-enucleation",
    "greenlight-laser-surgery",
    "turp-transurethral-resection-of-the-prostate",
    "radical-prostatectomy",
    "penile-implant",
  ],
  relatedTreatmentSlugs: [GREEN, RP, PENILE],
  status: "published" as const,
  featured: true,
  sortOrder: 68,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "HoLEP Surgery in India",
      shortDescription:
        "HoLEP in India is named after prostate volume and enucleation experience, not a holmium brochure. GAF planning is $3,800–$8,500, typically 2–4 nights.",
      editorialBody: body,
      process: [
        {
          id: "hl-step-1",
          title: "Share records",
          description:
            "The patient provides ultrasound volume, residual, uroflow, PSA and the blood-thinner list before anyone books travel.",
        },
        {
          id: "hl-step-2",
          title: "Urology review",
          description:
            "A urologist reviews whether HoLEP, GreenLight, TURP or no endoscopic list is the honest product.",
        },
        {
          id: "hl-step-3",
          title: "Name the product",
          description:
            "The team writes HoLEP only after volume, capsule anatomy and morcellator availability are reviewed.",
        },
        {
          id: "hl-step-4",
          title: "Itemized estimate",
          description:
            "GAF HoLEP planning is $3,800–$8,500. Neighbouring GreenLight is $3,200–$7,800 when vaporization is the named product.",
        },
        {
          id: "hl-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute retention with pain, fever or heavy bleeding is a local emergency.",
        },
        {
          id: "hl-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, urine and fitness after arrival.",
        },
        {
          id: "hl-step-7",
          title: "Deliver the named enucleation",
          description: "Holmium enucleation and morcellation proceed only after the list is named.",
        },
        {
          id: "hl-step-8",
          title: "Catheter care",
          description: "Urine colour, output and the ability to void are watched before discharge.",
        },
        {
          id: "hl-step-9",
          title: "Pathology and follow-up",
          description:
            "The patient leaves with specimen timing, catheter instructions and who will follow flow after returning home.",
        },
      ],
      preparation:
        "Share prostate volume, residual, uroflow, PSA and the blood-thinner list so the team can judge HoLEP versus GreenLight versus TURP.",
      recovery:
        "Burning, frequency and temporary leakage are common while the channel heals. GAF planning is 2–4 nights.",
      hospitalStay: "Typically 2–4 nights.",
      recoveryPeriod:
        "Light activity resumes over 1–2 weeks. A catheter is usually temporary. Travel home waits for the surgeon's clearance.",
      followUp:
        "Request a written summary covering pathology, catheter timing, expected leakage and who will follow the patient after returning home.",
      importantConsiderations:
        "HoLEP is BPH enucleation, not cancer surgery. GAF planning is $3,800–$8,500. Heavy bleeding, inability to pass urine, chest pain or fainting belongs in a local emergency department.",
      treatmentType: "HoLEP / Endourology",
      treatmentSetting: "Accredited partner urology theatres and wards in India",
      technology:
        "Holmium laser enucleation, morcellation, neighbouring GreenLight and TURP sheets",
      searchKeywords: [
        "HoLEP Surgery in India",
        "Holmium laser enucleation of the prostate India",
        "HoLEP cost in India",
        "HoLEP for large prostate",
        "HoLEP vs TURP",
        "HoLEP vs GreenLight",
        "HoLEP recovery",
        "HoLEP retrograde ejaculation",
      ],
      faqs: [
        {
          id: "hl-faq-1",
          question: "What is HoLEP?",
          answer:
            "Holmium laser enucleation of the prostate: endoscopic removal of the obstructing inner adenoma through the urethra.",
        },
        {
          id: "hl-faq-2",
          question: "Is HoLEP suitable for a very large prostate?",
          answer: "Yes. Prostate size alone does not exclude HoLEP when the surgeon's enucleation experience matches the gland.",
        },
        {
          id: "hl-faq-3",
          question: "How much does HoLEP surgery cost in India?",
          answer:
            "GAF Healthcare planning is $3,800–$8,500, typically 2–4 nights. US comparison is $16,000–$32,000.",
        },
        {
          id: "hl-faq-4",
          question: "How long is hospital stay?",
          answer: "GAF planning is typically 2–4 nights.",
        },
        {
          id: "hl-faq-5",
          question: "Does HoLEP remove the whole prostate?",
          answer: "No. It removes the inner adenoma. The outer capsule stays. That is different from radical prostatectomy.",
        },
        {
          id: "hl-faq-6",
          question: "Does HoLEP cause retrograde ejaculation?",
          answer: "Yes. Retrograde ejaculation is a common side effect.",
        },
        {
          id: "hl-faq-7",
          question: "Is tissue available for pathology?",
          answer: "Yes. The enucleated tissue can be examined under the microscope.",
        },
        {
          id: "hl-faq-8",
          question: "Can patients taking blood thinners undergo HoLEP?",
          answer:
            "Selected men may. Medication management must be individualized. Never stop a blood thinner without medical instructions.",
        },
        {
          id: "hl-faq-9",
          question: "Is HoLEP cancer surgery?",
          answer: "No. Incidental cancer can be found in the specimen, but HoLEP is not treatment for prostate cancer.",
        },
        {
          id: "hl-faq-10",
          question: "Is there an external incision?",
          answer: "No. The endoscope and laser enter through the urethra.",
        },
        {
          id: "hl-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Inability to pass urine, heavy bleeding or large clots, fever with shaking chills, chest pain or fainting belongs in a local emergency department.",
        },
        {
          id: "hl-faq-12",
          question: "Which city in India is right for HoLEP?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational unlabeled schematic of a bladder above an enlarged prostate narrowing the urethra",
      seoTitle: "HoLEP Surgery in India: Cost, Procedure, Recovery & Risks",
      metaDescription:
        "Learn about HoLEP surgery in India, including holmium laser enucleation, cost, large-prostate use, recovery, retrograde ejaculation, TURP vs GreenLight and BPH treatment.",
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
      editorial = editorial.replace(needle, replacement);
    }
  }
  row.translations!.en!.editorialBody = editorial;
}

patchEditorial(RP);
patchEditorial(PENILE);
patchEditorial(GREEN);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [GreenLight laser surgery in India](https://gaf.healthcare/treatments/greenlight-laser-surgery-in-india).",
    ", [GreenLight laser surgery in India](https://gaf.healthcare/treatments/greenlight-laser-surgery-in-india) and [HoLEP surgery in India](https://gaf.healthcare/treatments/holep-surgery-in-india).",
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
      text = text.replace(needle, replacement);
    }
  }
  if (text !== original) {
    writeFileSync(path, text);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/radical-prostatectomy-treatment-body.md"));
patchMarkdown(resolve("scripts/penile-implantation-treatment-body.md"));
patchMarkdown(resolve("scripts/greenlight-laser-surgery-treatment-body.md"));
