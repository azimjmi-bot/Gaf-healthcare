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

const body = readFileSync(resolve("scripts/turp-surgery-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "turp-surgery-in-india");
const now = "2026-10-02T14:00:00.000Z";
const SLUG = "turp-surgery-in-india";
const RP = "radical-prostatectomy-in-india";
const PENILE = "penile-implantation-in-india";
const GREEN = "greenlight-laser-surgery-in-india";
const HOLEP = "holep-surgery-in-india";
const LINK = " Named TURP lists sit on [TURP Surgery in India](/treatments/turp-surgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF TURP or robotic-prostatectomy-only treatment page.",
    `There is no live GAF robotic-prostatectomy-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF erectile-dysfunction, Peyronie's or TURP treatment page.",
    `There is no live GAF erectile-dysfunction or Peyronie's treatment page.${LINK}`,
  ],
  [
    "There is no live GAF TURP, Aquablation, UroLift or BPH-only treatment page.",
    `There is no live GAF Aquablation, UroLift or BPH-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF TURP treatment page; TURP sits on the neighbouring cost sheet until named separately.",
    `Named TURP lists sit on [TURP Surgery in India](/treatments/turp-surgery-in-india).`,
  ],
  [
    "There is no live GAF TURP treatment page.",
    `Named TURP lists sit on [TURP Surgery in India](/treatments/turp-surgery-in-india).`,
  ],
];

const treatment = {
  id: existing?.id ?? "a1b2c6e5-8c04-3b95-c52a-1e6f9b2c5a70",
  slug: SLUG,
  previousSlugs: [],
  baseName: "TURP Surgery in India",
  specialtySlug: "urology",
  subspecialty: "Endourology",
  category: "TURP (Transurethral Resection of the Prostate)",
  image: "/uploads/treatments/tp-hero.webp",
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
    "turp-transurethral-resection-of-the-prostate",
    "holep-holmium-laser-enucleation",
    "greenlight-laser-surgery",
    "radical-prostatectomy",
    "penile-implant",
  ],
  relatedTreatmentSlugs: [HOLEP, GREEN, RP, PENILE],
  status: "published" as const,
  featured: true,
  sortOrder: 69,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "TURP Surgery in India",
      shortDescription:
        "TURP in India is named after prostate volume and resection experience, not a resectoscope brochure. GAF planning is $2,500–$6,200, typically 2–4 nights.",
      editorialBody: body,
      process: [
        {
          id: "tp-step-1",
          title: "Share records",
          description:
            "The patient provides ultrasound volume, residual, uroflow, PSA and the blood-thinner list before anyone books travel.",
        },
        {
          id: "tp-step-2",
          title: "Urology review",
          description:
            "A urologist reviews whether TURP, HoLEP, GreenLight or no endoscopic list is the honest product.",
        },
        {
          id: "tp-step-3",
          title: "Name the product",
          description:
            "The team writes TURP only after volume, residual and energy platform are reviewed.",
        },
        {
          id: "tp-step-4",
          title: "Itemized estimate",
          description:
            "GAF TURP planning is $2,500–$6,200. Neighbouring HoLEP is $3,800–$8,500 when enucleation is the named product.",
        },
        {
          id: "tp-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute retention with pain, fever or heavy bleeding is a local emergency.",
        },
        {
          id: "tp-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, urine and fitness after arrival.",
        },
        {
          id: "tp-step-7",
          title: "Deliver the named resection",
          description: "Transurethral resection proceeds only after the list is named.",
        },
        {
          id: "tp-step-8",
          title: "Catheter care",
          description: "Urine colour, output and the ability to void are watched before discharge.",
        },
        {
          id: "tp-step-9",
          title: "Pathology and follow-up",
          description:
            "The patient leaves with specimen timing, catheter instructions and who will follow flow after returning home.",
        },
      ],
      preparation:
        "Share prostate volume, residual, uroflow, PSA and the blood-thinner list so the team can judge TURP versus HoLEP versus GreenLight.",
      recovery:
        "Burning, frequency and pink urine are common while the channel heals. GAF planning is 2–4 nights.",
      hospitalStay: "Typically 2–4 nights.",
      recoveryPeriod:
        "Light activity resumes over 1–2 weeks. A catheter is usually temporary. Travel home waits for the surgeon's clearance.",
      followUp:
        "Request a written summary covering pathology, catheter timing, expected irritation and who will follow the patient after returning home.",
      importantConsiderations:
        "TURP is BPH resection, not cancer surgery. GAF planning is $2,500–$6,200. Heavy bleeding, inability to pass urine, chest pain or fainting belongs in a local emergency department.",
      treatmentType: "TURP / Endourology",
      treatmentSetting: "Accredited partner urology theatres and wards in India",
      technology:
        "Monopolar or bipolar resectoscope, neighbouring HoLEP and GreenLight sheets",
      searchKeywords: [
        "TURP surgery in India",
        "TURP cost in India",
        "TURP surgery cost India",
        "TURP procedure in India",
        "transurethral resection of prostate India",
        "enlarged prostate surgery India",
        "BPH surgery in India",
        "TURP vs HoLEP",
        "TURP vs GreenLight laser",
        "TURP recovery",
        "TURP complications",
      ],
      faqs: [
        {
          id: "tp-faq-1",
          question: "What is TURP?",
          answer:
            "Transurethral resection of the prostate: endoscopic removal of obstructing inner prostate tissue through the urethra.",
        },
        {
          id: "tp-faq-2",
          question: "Does TURP remove the whole prostate?",
          answer: "No. It removes the obstructing inner tissue. The rest of the gland stays.",
        },
        {
          id: "tp-faq-3",
          question: "How much does TURP surgery cost in India?",
          answer:
            "GAF Healthcare planning is $2,500–$6,200, typically 2–4 nights. US comparison is $12,000–$25,000.",
        },
        {
          id: "tp-faq-4",
          question: "How long is hospital stay?",
          answer: "GAF planning is typically 2–4 nights.",
        },
        {
          id: "tp-faq-5",
          question: "Does TURP cause retrograde ejaculation?",
          answer: "Yes. Retrograde ejaculation is a common long-term effect.",
        },
        {
          id: "tp-faq-6",
          question: "Does TURP cause erectile dysfunction?",
          answer:
            "It can occur, but it is discussed less often than retrograde ejaculation.",
        },
        {
          id: "tp-faq-7",
          question: "Is tissue available for pathology?",
          answer: "Yes. Resected chips can be examined under the microscope.",
        },
        {
          id: "tp-faq-8",
          question: "Is TURP better than HoLEP?",
          answer:
            "Neither is universally better. Anatomy, volume and surgeon experience decide the named product.",
        },
        {
          id: "tp-faq-9",
          question: "Is TURP cancer surgery?",
          answer: "No. Incidental cancer can be found in chips, but TURP is not treatment for prostate cancer.",
        },
        {
          id: "tp-faq-10",
          question: "Is there an external incision?",
          answer: "No. The resectoscope enters through the urethra.",
        },
        {
          id: "tp-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Inability to pass urine, heavy bleeding or large clots, fever with shaking chills, chest pain or fainting belongs in a local emergency department.",
        },
        {
          id: "tp-faq-12",
          question: "Which city in India is right for TURP?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational unlabeled schematic of a bladder above an enlarged prostate squeezing the urethra",
      seoTitle: "TURP Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about TURP surgery in India, including cost, procedure, recovery, risks, success, hospital stay, alternatives such as HoLEP and GreenLight, and treatment for enlarged prostate.",
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
patchEditorial(PENILE);
patchEditorial(GREEN);
patchEditorial(HOLEP);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [HoLEP surgery in India](https://gaf.healthcare/treatments/holep-surgery-in-india).",
    ", [HoLEP surgery in India](https://gaf.healthcare/treatments/holep-surgery-in-india) and [TURP surgery in India](https://gaf.healthcare/treatments/turp-surgery-in-india).",
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
patchMarkdown(resolve("scripts/penile-implantation-treatment-body.md"));
patchMarkdown(resolve("scripts/greenlight-laser-surgery-treatment-body.md"));
patchMarkdown(resolve("scripts/holep-surgery-treatment-body.md"));
