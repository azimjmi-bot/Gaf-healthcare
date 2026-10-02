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

const body = readFileSync(resolve("scripts/gastric-bypass-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string; faqs?: Array<{ id: string; question?: string; answer: string }> } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "gastric-bypass-surgery-in-india");
const now = "2026-09-30T04:30:00.000Z";
const SLUG = "gastric-bypass-surgery-in-india";
const LIPO = "liposuction-in-india";
const MOMMY = "mommy-makeover-in-india";
const ADDITION =
  " Roux-en-Y lists sit on [Gastric Bypass Surgery in India](/treatments/gastric-bypass-surgery-in-india).";
const LIPO_NEEDLE = "Those sheets must not be used as a liposuction quotation.";
const MOMMY_NEEDLE = "when obesity, not post-pregnancy contour, is the product.";

const treatment = {
  id: existing?.id ?? "a2d5b0e6-1f49-7b38-c96a-5e0f3b6c9a14",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Gastric Bypass Surgery in India",
  specialtySlug: "bariatric-surgery",
  subspecialty: "Metabolic Bariatric Surgery",
  category: "Gastric Bypass (Roux-en-Y)",
  image: "/uploads/treatments/gastric-bypass-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ajay-kumar-kriplani",
    "dr-aloy-j-mukherjee",
    "dr-arun-prasad",
    "dr-pradeep-chowbey",
    "dr-mayank-madan",
    "dr-vikas-singhal",
    "dr-rajnesh-chander-reddy",
    "dr-ramen-goel",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "artemis-hospital",
    "medanta-gurgaon",
    "fortis-gurgaon",
    "wockhardt-hospital",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "gastric-bypass-roux-en-y",
    "sleeve-gastrectomy",
    "mini-gastric-bypass-oagb-mgb",
    "metabolic-surgery-for-type-2-diabetes",
    "gastric-bypass-surgery",
    "gastric-balloon",
    "endoscopic-sleeve-gastroplasty-esg",
    "gastric-sleeve-revision-surgery",
  ],
  relatedTreatmentSlugs: [LIPO, MOMMY],
  status: "published" as const,
  featured: true,
  sortOrder: 63,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Gastric Bypass Surgery in India",
      shortDescription:
        "Gastric bypass surgery in India is named Roux-en-Y after BMI, reflux and diabetes, not a brochure. GAF planning is $6,000–$11,000, typically 3–6 nights.",
      editorialBody: body,
      process: [
        {
          id: "gastric-bypass-step-1",
          title: "Share records",
          description:
            "The patient provides BMI, weight history, HbA1c, medications and any previous bariatric or abdominal-surgery notes before anyone books travel.",
        },
        {
          id: "gastric-bypass-step-2",
          title: "Bariatric team review",
          description:
            "A bariatric surgeon reviews whether Roux-en-Y, sleeve, OAGB or a non-surgical pathway is the honest product.",
        },
        {
          id: "gastric-bypass-step-3",
          title: "Name the product",
          description:
            "The team writes Roux-en-Y gastric bypass only after BMI, reflux, diabetes, nutrition and follow-up capacity are reviewed.",
        },
        {
          id: "gastric-bypass-step-4",
          title: "Itemized estimate",
          description:
            "GAF Roux-en-Y planning is $6,000–$11,000. Neighbouring sleeve is $4,500–$8,500 when that sitting is named.",
        },
        {
          id: "gastric-bypass-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Severe abdominal pain or inability to keep fluids is a local emergency.",
        },
        {
          id: "gastric-bypass-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, fitness and the named anatomy after arrival.",
        },
        {
          id: "gastric-bypass-step-7",
          title: "Deliver the named bypass",
          description: "Laparoscopic Roux-en-Y proceeds only after the product is named.",
        },
        {
          id: "gastric-bypass-step-8",
          title: "Ward and dietetics",
          description: "Leak, bleed, fluids and the staged diet are watched before discharge.",
        },
        {
          id: "gastric-bypass-step-9",
          title: "Lifelong follow-up",
          description:
            "The patient leaves with a vitamin plan, laboratory schedule and who will follow weight and diabetes after returning home.",
        },
      ],
      preparation:
        "Share BMI, HbA1c, weight history and previous abdominal-surgery notes so the team can judge Roux-en-Y versus sleeve versus OAGB.",
      recovery:
        "Staged liquids to texture and early walking decide recovery. GAF Roux-en-Y planning is 3–6 nights.",
      hospitalStay: "Typically 3–6 nights. Some uncomplicated laparoscopic cases stay shorter.",
      recoveryPeriod:
        "Diet progresses from liquids to regular texture over weeks. Lifelong vitamins and laboratory monitoring continue after travel home.",
      followUp:
        "Request a written summary covering vitamins, blood-test schedule, diabetes medicines and who will follow weight regain after returning home.",
      importantConsiderations:
        "Gastric bypass is major surgery and a permanent anatomical change. GAF Roux-en-Y planning is $6,000–$11,000. Severe abdominal pain, persistent vomiting or inability to keep fluids belongs in a local emergency department.",
      treatmentType: "Gastric Bypass (Roux-en-Y) / Metabolic Bariatric Surgery",
      treatmentSetting: "Accredited partner bariatric theatres and ICUs in India",
      technology:
        "Laparoscopic Roux-en-Y gastric bypass, selected robotic lists, neighbouring sleeve, OAGB and metabolic-surgery sheets",
      searchKeywords: [
        "Gastric Bypass Surgery in India",
        "Gastric bypass surgery cost in India",
        "Roux-en-Y gastric bypass in India",
        "Bariatric surgery in India",
        "Gastric bypass treatment in India",
        "Weight loss surgery in India",
        "Gastric bypass for diabetes",
        "Laparoscopic gastric bypass in India",
        "Gastric bypass recovery",
        "Gastric bypass diet",
        "Gastric bypass risks",
      ],
      faqs: [
        {
          id: "gastric-bypass-faq-1",
          question: "What is gastric bypass?",
          answer:
            "A bariatric operation that creates a small stomach pouch and connects it to the small intestine.",
        },
        {
          id: "gastric-bypass-faq-2",
          question: "What is the most common type?",
          answer: "Roux-en-Y gastric bypass (RYGB).",
        },
        {
          id: "gastric-bypass-faq-3",
          question: "How much does gastric bypass cost in India?",
          answer:
            "GAF Healthcare planning for Roux-en-Y gastric bypass is $6,000–$11,000, typically 3–6 nights. US comparison is $20,000–$38,000.",
        },
        {
          id: "gastric-bypass-faq-4",
          question: "How long is hospital stay after gastric bypass?",
          answer:
            "GAF planning is typically 3–6 nights. Some uncomplicated laparoscopic cases stay shorter.",
        },
        {
          id: "gastric-bypass-faq-5",
          question: "Is gastric bypass reversible?",
          answer:
            "It is technically complex to reverse and is generally regarded as a permanent procedure.",
        },
        {
          id: "gastric-bypass-faq-6",
          question: "Does gastric bypass help diabetes?",
          answer:
            "It can substantially improve or induce remission of type 2 diabetes in appropriately selected patients. Remission is not guaranteed.",
        },
        {
          id: "gastric-bypass-faq-7",
          question: "Will vitamins be required after gastric bypass?",
          answer: "Yes. Long-term vitamin and mineral supplementation and monitoring are essential.",
        },
        {
          id: "gastric-bypass-faq-8",
          question: "Is lifelong follow-up necessary?",
          answer:
            "Yes. Long-term nutritional, metabolic and weight monitoring is an important part of treatment.",
        },
        {
          id: "gastric-bypass-faq-9",
          question: "Is gastric bypass better than sleeve gastrectomy?",
          answer:
            "Neither procedure is universally better. The choice depends on BMI, diabetes, reflux, nutrition and anatomy. There is no live GAF sleeve-gastrectomy treatment page.",
        },
        {
          id: "gastric-bypass-faq-10",
          question: "Can international patients have gastric bypass surgery in India?",
          answer: "Yes. BMI, metabolic records and previous surgery notes should generally be reviewed before travel.",
        },
        {
          id: "gastric-bypass-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Severe abdominal pain, persistent vomiting, fever, inability to keep fluids, chest pain, shortness of breath or fainting belongs in a local emergency department.",
        },
        {
          id: "gastric-bypass-faq-12",
          question: "Which city in India is best for gastric bypass surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled Roux-en-Y gastric bypass used as the hero",
      seoTitle: "Gastric Bypass Surgery in India: Cost, Procedure, Benefits & Recovery",
      metaDescription:
        "Learn about gastric bypass surgery in India, including Roux-en-Y procedure, eligibility, GAF planning $6,000–$11,000, benefits, risks, recovery, diet and FAQs.",
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

linkRelated(LIPO, LIPO_NEEDLE, ADDITION);
linkRelated(MOMMY, MOMMY_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [bile duct cancer surgery in India](https://gaf.healthcare/treatments/bile-duct-cancer-surgery-in-india).",
    ", [bile duct cancer surgery in India](https://gaf.healthcare/treatments/bile-duct-cancer-surgery-in-india) and [gastric bypass surgery in India](https://gaf.healthcare/treatments/gastric-bypass-surgery-in-india).",
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

patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), LIPO_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/mommy-makeover-treatment-body.md"), MOMMY_NEEDLE, ADDITION);
