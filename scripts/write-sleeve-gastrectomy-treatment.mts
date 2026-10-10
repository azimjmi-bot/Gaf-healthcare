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

const body = readFileSync(resolve("scripts/sleeve-gastrectomy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "sleeve-gastrectomy-in-india");
const now = "2026-09-30T05:00:00.000Z";
const SLUG = "sleeve-gastrectomy-in-india";
const BYPASS = "gastric-bypass-surgery-in-india";
const LIPO = "liposuction-in-india";
const MOMMY = "mommy-makeover-in-india";
const ADDITION =
  " Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).";
const BYPASS_NEEDLE = "This page is the named gastric-bypass product.";
const LIPO_NEEDLE = "Those sheets must not be used as a liposuction quotation.";
const MOMMY_NEEDLE = "when obesity, not post-pregnancy contour, is the product.";

const treatment = {
  id: existing?.id ?? "b3e6c1f7-2a50-8c49-d07b-6f1a4c7d0b25",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Sleeve Gastrectomy in India",
  specialtySlug: "bariatric-surgery",
  subspecialty: "Metabolic Bariatric Surgery",
  category: "Sleeve Gastrectomy",
  image: "/uploads/treatments/sleeve-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ajay-kumar-kriplani",
    "dr-aloy-j-mukherjee",
    "dr-anil-sharma",
    "dr-arun-prasad",
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
    "sleeve-gastrectomy",
    "gastric-bypass-roux-en-y",
    "mini-gastric-bypass-oagb-mgb",
    "metabolic-surgery-for-type-2-diabetes",
    "gastric-balloon",
    "endoscopic-sleeve-gastroplasty-esg",
    "gastric-sleeve-revision-surgery",
    "gastric-banding-lap-band",
  ],
  relatedTreatmentSlugs: [BYPASS, LIPO, MOMMY],
  status: "published" as const,
  featured: true,
  sortOrder: 64,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Sleeve Gastrectomy in India",
      shortDescription:
        "Sleeve gastrectomy in India removes most of the stomach without rerouting intestine. GAF planning is $4,500–$8,500, typically 2–5 nights.",
      editorialBody: body,
      process: [
        {
          id: "sleeve-step-1",
          title: "Share records",
          description:
            "The patient provides BMI, weight history, reflux notes, HbA1c and any previous bariatric or abdominal-surgery notes before anyone books travel.",
        },
        {
          id: "sleeve-step-2",
          title: "Bariatric team review",
          description:
            "A bariatric surgeon reviews whether sleeve, Roux-en-Y, OAGB or a non-surgical pathway is the honest product.",
        },
        {
          id: "sleeve-step-3",
          title: "Name the product",
          description:
            "The team writes sleeve gastrectomy only after BMI, reflux, diabetes, nutrition and follow-up capacity are reviewed.",
        },
        {
          id: "sleeve-step-4",
          title: "Itemized estimate",
          description:
            "GAF sleeve planning is $4,500–$8,500. Neighbouring Roux-en-Y is $6,000–$11,000 when that sitting is named.",
        },
        {
          id: "sleeve-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Severe abdominal pain or inability to keep fluids is a local emergency.",
        },
        {
          id: "sleeve-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, fitness and the named sleeve after arrival.",
        },
        {
          id: "sleeve-step-7",
          title: "Deliver the named sleeve",
          description: "Laparoscopic sleeve gastrectomy proceeds only after the product is named.",
        },
        {
          id: "sleeve-step-8",
          title: "Ward and dietetics",
          description: "Staple-line leak, bleed, fluids and the staged diet are watched before discharge.",
        },
        {
          id: "sleeve-step-9",
          title: "Lifelong follow-up",
          description:
            "The patient leaves with a vitamin plan, laboratory schedule and who will follow weight, reflux and diabetes after returning home.",
        },
      ],
      preparation:
        "Share BMI, reflux history, HbA1c and previous abdominal-surgery notes so the team can judge sleeve versus Roux-en-Y versus ESG.",
      recovery:
        "Staged liquids to texture and early walking decide recovery. GAF sleeve planning is 2–5 nights.",
      hospitalStay: "Typically 2–5 nights. Some uncomplicated laparoscopic cases stay shorter.",
      recoveryPeriod:
        "Diet progresses from liquids to regular texture over weeks. Lifelong vitamins, reflux watch and laboratory monitoring continue after travel home.",
      followUp:
        "Request a written summary covering vitamins, blood-test schedule, reflux plan and who will follow weight regain after returning home.",
      importantConsiderations:
        "Sleeve gastrectomy is major surgery and a permanent anatomical change. GAF sleeve planning is $4,500–$8,500. Severe abdominal pain, persistent vomiting or inability to keep fluids belongs in a local emergency department.",
      treatmentType: "Sleeve Gastrectomy / Metabolic Bariatric Surgery",
      treatmentSetting: "Accredited partner bariatric theatres and ICUs in India",
      technology:
        "Laparoscopic sleeve gastrectomy, selected robotic lists, neighbouring Roux-en-Y, OAGB, ESG and revision sheets",
      searchKeywords: [
        "Sleeve Gastrectomy in India",
        "Sleeve gastrectomy cost in India",
        "Gastric sleeve surgery in India",
        "Laparoscopic sleeve gastrectomy in India",
        "Sleeve gastrectomy procedure",
        "Sleeve gastrectomy recovery",
        "Sleeve gastrectomy diet",
        "Sleeve gastrectomy eligibility",
        "Sleeve gastrectomy risks",
        "Bariatric surgery in India",
        "Weight loss surgery in India",
        "Gastric sleeve vs gastric bypass",
      ],
      faqs: [
        {
          id: "sleeve-faq-1",
          question: "What is sleeve gastrectomy?",
          answer:
            "A permanent weight-loss operation in which approximately 70–80% of the stomach is removed, leaving a narrow gastric sleeve.",
        },
        {
          id: "sleeve-faq-2",
          question: "Does sleeve gastrectomy bypass the intestine?",
          answer: "No. Unlike gastric bypass, sleeve gastrectomy does not reroute the small intestine.",
        },
        {
          id: "sleeve-faq-3",
          question: "How much does sleeve gastrectomy cost in India?",
          answer:
            "GAF Healthcare planning for sleeve gastrectomy is $4,500–$8,500, typically 2–5 nights. US comparison is $15,000–$28,000.",
        },
        {
          id: "sleeve-faq-4",
          question: "How long is hospital stay after sleeve gastrectomy?",
          answer:
            "GAF planning is typically 2–5 nights. Some uncomplicated laparoscopic cases stay shorter.",
        },
        {
          id: "sleeve-faq-5",
          question: "Is sleeve gastrectomy reversible?",
          answer: "No. Because part of the stomach is removed, sleeve gastrectomy is generally considered permanent.",
        },
        {
          id: "sleeve-faq-6",
          question: "Can sleeve gastrectomy cause acid reflux?",
          answer:
            "Yes. Reflux can occur or worsen after sleeve gastrectomy. Significant reflux may belong on a Roux-en-Y list instead.",
        },
        {
          id: "sleeve-faq-7",
          question: "Will vitamins be required after sleeve gastrectomy?",
          answer:
            "Yes. Most patients require a long-term vitamin and mineral plan even though the intestine is not bypassed.",
        },
        {
          id: "sleeve-faq-8",
          question: "Is sleeve gastrectomy better than gastric bypass?",
          answer:
            "Neither procedure is universally better. The choice depends on BMI, diabetes, reflux, nutrition and anatomy.",
        },
        {
          id: "sleeve-faq-9",
          question: "Can international patients have sleeve gastrectomy in India?",
          answer: "Yes. BMI, reflux notes and metabolic records should generally be reviewed before travel.",
        },
        {
          id: "sleeve-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Severe abdominal pain, persistent vomiting, fever, inability to keep fluids, chest pain, shortness of breath or fainting belongs in a local emergency department.",
        },
        {
          id: "sleeve-faq-11",
          question: "Which city in India is best for sleeve gastrectomy?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "sleeve-faq-12",
          question: "Is there a GAF mini-bypass, balloon or ESG treatment page?",
          answer:
            "No. Mini-gastric-bypass, gastric-balloon, ESG and bariatric-surgery-only treatment pages are not live. Roux-en-Y lists sit on the gastric bypass page.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled banana-shaped gastric sleeve used as the hero",
      seoTitle: "Sleeve Gastrectomy in India: Cost, Procedure, Recovery & Risks",
      metaDescription:
        "Learn about sleeve gastrectomy in India, including eligibility, procedure, GAF planning $4,500–$8,500, recovery, diet, risks and how to choose a bariatric surgeon.",
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

function replaceEditorial(slug: string, from: string, to: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const editorial = row?.translations?.en?.editorialBody ?? "";
  if (!row || !editorial.includes(from)) return;
  row.translations!.en!.editorialBody = editorial.replaceAll(from, to);
}

function patchFaqByQuestion(slug: string, questionContains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.question?.includes(questionContains)) {
      faq.answer = replacement;
    }
  }
}

linkRelated(BYPASS, BYPASS_NEEDLE, ADDITION);
linkRelated(LIPO, LIPO_NEEDLE, ADDITION);
linkRelated(MOMMY, MOMMY_NEEDLE, ADDITION);

replaceEditorial(
  BYPASS,
  "There is no live GAF sleeve-gastrectomy, mini-gastric-bypass, gastric-balloon, ESG or bariatric-surgery-only treatment page. Neighbouring [sleeve gastrectomy](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) is a cost sheet, not a second named treatment product.",
  "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india). There is no live GAF mini-gastric-bypass, gastric-balloon, ESG or bariatric-surgery-only treatment page.",
);
replaceEditorial(
  BYPASS,
  "There is no live GAF sleeve-gastrectomy treatment page. Use the [sleeve gastrectomy cost sheet](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) when that sitting is named.",
  "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india). Use the [sleeve gastrectomy cost sheet](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) when that sitting is named.",
);
replaceEditorial(
  BYPASS,
  "There is no live GAF sleeve-gastrectomy treatment page.",
  "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).",
);
replaceEditorial(
  BYPASS,
  "Sleeve-gastrectomy, mini-gastric-bypass, gastric-balloon, ESG and bariatric-surgery-only treatment pages are not live on this site. Use this page plus the named modality sheets.",
  "Mini-gastric-bypass, gastric-balloon, ESG and bariatric-surgery-only treatment pages are not live on this site. Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).",
);
replaceEditorial(
  BYPASS,
  "- [Sleeve gastrectomy cost](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy)",
  "- [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india)\n- [Sleeve gastrectomy cost](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy)",
);

patchFaqByQuestion(
  BYPASS,
  "better than sleeve",
  "Neither procedure is universally better. The choice depends on BMI, diabetes, reflux, nutrition and anatomy. Sleeve lists sit on the sleeve gastrectomy page.",
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [gastric bypass surgery in India](https://gaf.healthcare/treatments/gastric-bypass-surgery-in-india).",
    ", [gastric bypass surgery in India](https://gaf.healthcare/treatments/gastric-bypass-surgery-in-india) and [sleeve gastrectomy in India](https://gaf.healthcare/treatments/sleeve-gastrectomy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, replacements: Array<[string, string]>) {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  let next = text;
  for (const [from, to] of replacements) {
    if (next.includes(from)) next = next.replaceAll(from, to);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

const sleeveLink =
  " Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).";

patchMarkdown(resolve("scripts/gastric-bypass-treatment-body.md"), [
  [
    "There is no live GAF sleeve-gastrectomy, mini-gastric-bypass, gastric-balloon, ESG or bariatric-surgery-only treatment page. Neighbouring [sleeve gastrectomy](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) is a cost sheet, not a second named treatment product.",
    "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india). There is no live GAF mini-gastric-bypass, gastric-balloon, ESG or bariatric-surgery-only treatment page.",
  ],
  [
    "There is no live GAF sleeve-gastrectomy treatment page. Use the [sleeve gastrectomy cost sheet](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) when that sitting is named.",
    "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india). Use the [sleeve gastrectomy cost sheet](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy) when that sitting is named.",
  ],
  [
    "There is no live GAF sleeve-gastrectomy treatment page.",
    "Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).",
  ],
  [
    "Sleeve-gastrectomy, mini-gastric-bypass, gastric-balloon, ESG and bariatric-surgery-only treatment pages are not live on this site. Use this page plus the named modality sheets.",
    "Mini-gastric-bypass, gastric-balloon, ESG and bariatric-surgery-only treatment pages are not live on this site. Sleeve lists sit on [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india).",
  ],
  [
    "- [Sleeve gastrectomy cost](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy)",
    "- [Sleeve Gastrectomy in India](/treatments/sleeve-gastrectomy-in-india)\n- [Sleeve gastrectomy cost](/costs/India/Bariatric-Surgery/Sleeve-Gastrectomy)",
  ],
]);

patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), [
  [LIPO_NEEDLE, `${LIPO_NEEDLE}${sleeveLink}`],
]);
patchMarkdown(resolve("scripts/mommy-makeover-treatment-body.md"), [
  [MOMMY_NEEDLE, `${MOMMY_NEEDLE}${sleeveLink}`],
]);

const bypassWriter = resolve("scripts/write-gastric-bypass-treatment.mts");
if (existsSync(bypassWriter)) {
  const text = readFileSync(bypassWriter, "utf8");
  const next = text.replace(
    "Neither procedure is universally better. The choice depends on BMI, diabetes, reflux, nutrition and anatomy. There is no live GAF sleeve-gastrectomy treatment page.",
    "Neither procedure is universally better. The choice depends on BMI, diabetes, reflux, nutrition and anatomy. Sleeve lists sit on the sleeve gastrectomy page.",
  );
  if (next !== text) {
    writeFileSync(bypassWriter, next);
    console.log("updated", bypassWriter);
  }
}
