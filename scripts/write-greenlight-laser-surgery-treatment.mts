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

const body = readFileSync(resolve("scripts/greenlight-laser-surgery-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "greenlight-laser-surgery-in-india");
const now = "2026-10-02T12:00:00.000Z";
const SLUG = "greenlight-laser-surgery-in-india";
const RP = "radical-prostatectomy-in-india";
const PENILE = "penile-implantation-in-india";
const LINK =
  " Named GreenLight lists sit on [GreenLight Laser Surgery in India](/treatments/greenlight-laser-surgery-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "There is no live GAF TURP, HoLEP, GreenLight or robotic-prostatectomy-only treatment page.",
    `There is no live GAF TURP, HoLEP or robotic-prostatectomy-only treatment page.${LINK}`,
  ],
  [
    "There is no live GAF TURP, HoLEP or GreenLight treatment page.",
    `There is no live GAF TURP or HoLEP treatment page.${LINK}`,
  ],
  [
    "There is no live GAF erectile-dysfunction, Peyronie's, TURP, HoLEP or GreenLight treatment page.",
    `There is no live GAF erectile-dysfunction, Peyronie's, TURP or HoLEP treatment page.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "e9f0a4c3-6a82-1f73-a30e-9c4d7f0a3e58",
  slug: SLUG,
  previousSlugs: [],
  baseName: "GreenLight Laser Surgery in India",
  specialtySlug: "urology",
  subspecialty: "Endourology",
  category: "GreenLight Laser Surgery",
  image: "/uploads/treatments/gl-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-sanjay-gogoi",
    "dr-rajesh-taneja",
    "dr-anshuman-agarwal",
    "dr-piyush-singhania",
    "dr-lokesh-sinha",
    "dr-manohar-t",
    "dr-sreedhar-reddy",
    "dr-duraisamy-s",
    "dr-rajagopal-v",
    "dr-arun-shah",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "medicover-hospital-navi-mumbai",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "greenlight-laser-surgery",
    "turp-transurethral-resection-of-the-prostate",
    "holep-holmium-laser-enucleation",
    "radical-prostatectomy",
    "penile-implant",
  ],
  relatedTreatmentSlugs: [RP, PENILE],
  status: "published" as const,
  featured: true,
  sortOrder: 67,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "GreenLight Laser Surgery in India",
      shortDescription:
        "GreenLight PVP in India is named after prostate volume and bleeding risk, not a laser brochure. GAF planning is $3,200–$7,800, typically 1–3 nights.",
      editorialBody: body,
      process: [
        {
          id: "gl-step-1",
          title: "Share records",
          description:
            "The patient provides ultrasound volume, residual, uroflow, PSA and the blood-thinner list before anyone books travel.",
        },
        {
          id: "gl-step-2",
          title: "Urology review",
          description:
            "A urologist reviews whether GreenLight, TURP, HoLEP or no endoscopic list is the honest product.",
        },
        {
          id: "gl-step-3",
          title: "Name the product",
          description:
            "The team writes GreenLight PVP only after volume, anatomy and anticoagulant plan are reviewed.",
        },
        {
          id: "gl-step-4",
          title: "Itemized estimate",
          description:
            "GAF GreenLight planning is $3,200–$7,800. Neighbouring TURP is $2,500–$6,200 when resection chips are the named product.",
        },
        {
          id: "gl-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Acute retention with pain, fever or heavy bleeding is a local emergency.",
        },
        {
          id: "gl-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, urine and fitness after arrival.",
        },
        {
          id: "gl-step-7",
          title: "Deliver the named PVP",
          description: "532-nm vaporization proceeds only after the platform is named.",
        },
        {
          id: "gl-step-8",
          title: "Catheter care",
          description: "Urine colour, output and the ability to void are watched before discharge.",
        },
        {
          id: "gl-step-9",
          title: "Follow-up",
          description:
            "The patient leaves with catheter instructions and who will follow flow and residual after returning home.",
        },
      ],
      preparation:
        "Share prostate volume, residual, uroflow, PSA and the blood-thinner list so the team can judge GreenLight versus TURP versus HoLEP.",
      recovery:
        "Burning and frequency are common while the channel heals. GAF planning is 1–3 nights.",
      hospitalStay: "Typically 1–3 nights.",
      recoveryPeriod:
        "Light activity resumes over days to weeks. A catheter is usually temporary. Travel home waits for the surgeon's clearance.",
      followUp:
        "Request a written summary covering the platform, catheter timing, expected urgency and who will follow the patient after returning home.",
      importantConsiderations:
        "GreenLight PVP is BPH surgery, not cancer surgery. GAF planning is $3,200–$7,800. Heavy bleeding, inability to pass urine, chest pain or fainting belongs in a local emergency department.",
      treatmentType: "GreenLight Laser Surgery / Endourology",
      treatmentSetting: "Accredited partner urology theatres and wards in India",
      technology:
        "80W, 120W and 180W GreenLight photoselective vaporization, neighbouring TURP and HoLEP sheets",
      searchKeywords: [
        "GreenLight Laser Surgery in India",
        "GreenLight laser prostate surgery India",
        "GreenLight PVP surgery India",
        "GreenLight laser prostate surgery cost in India",
        "GreenLight laser treatment for enlarged prostate",
        "Photoselective vaporization of prostate India",
        "GreenLight laser vs TURP",
        "GreenLight laser vs HoLEP",
        "GreenLight prostate surgery recovery",
      ],
      faqs: [
        {
          id: "gl-faq-1",
          question: "What is GreenLight laser surgery?",
          answer:
            "A transurethral laser procedure that removes obstructing prostate tissue using 532-nm laser energy.",
        },
        {
          id: "gl-faq-2",
          question: "What is its medical name?",
          answer: "Photoselective vaporization of the prostate (PVP).",
        },
        {
          id: "gl-faq-3",
          question: "How much does GreenLight laser surgery cost in India?",
          answer:
            "GAF Healthcare planning is $3,200–$7,800, typically 1–3 nights. US comparison is $14,000–$28,000.",
        },
        {
          id: "gl-faq-4",
          question: "How long is hospital stay?",
          answer: "GAF planning is typically 1–3 nights.",
        },
        {
          id: "gl-faq-5",
          question: "Is it cancer surgery?",
          answer: "No. GreenLight PVP treats benign prostate obstruction, not prostate cancer.",
        },
        {
          id: "gl-faq-6",
          question: "Is GreenLight better than TURP?",
          answer:
            "Neither is universally better. PVP often has less bleeding and a shorter catheter or stay. Symptom outcomes are broadly comparable in selected patients.",
        },
        {
          id: "gl-faq-7",
          question: "Is GreenLight suitable for every prostate?",
          answer:
            "No. Evidence is strongest for 30–80 mL glands and less robust above 100 mL.",
        },
        {
          id: "gl-faq-8",
          question: "Can men on blood thinners have GreenLight surgery?",
          answer:
            "Selected patients may. Medication management must be individualized. Do not stop blood thinners without medical advice.",
        },
        {
          id: "gl-faq-9",
          question: "Does it affect ejaculation?",
          answer:
            "It can. Retrograde ejaculation is a recognized consequence of procedures that relieve prostate obstruction.",
        },
        {
          id: "gl-faq-10",
          question: "Is there an external incision?",
          answer: "No. The cystoscope and laser fiber enter through the urethra.",
        },
        {
          id: "gl-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Heavy bleeding, inability to pass urine after catheter removal, fever with shaking chills, chest pain or fainting belongs in a local emergency department.",
        },
        {
          id: "gl-faq-12",
          question: "Which city in India is right for GreenLight surgery?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational unlabeled schematic of a bladder above an enlarged prostate narrowing the urethra",
      seoTitle: "GreenLight Laser Surgery in India | Cost, Procedure & Recovery",
      metaDescription:
        "Learn about GreenLight laser surgery in India, including PVP procedure, cost factors, benefits, risks, recovery, prostate size, TURP vs HoLEP and treatment for BPH.",
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

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [penile implantation in India](https://gaf.healthcare/treatments/penile-implantation-in-india).",
    ", [penile implantation in India](https://gaf.healthcare/treatments/penile-implantation-in-india) and [GreenLight laser surgery in India](https://gaf.healthcare/treatments/greenlight-laser-surgery-in-india).",
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
