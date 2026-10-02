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

const body = readFileSync(resolve("scripts/bile-duct-cancer-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "bile-duct-cancer-surgery-in-india");
const now = "2026-09-30T04:00:00.000Z";
const SLUG = "bile-duct-cancer-surgery-in-india";
const WHIPPLE = "whipple-surgery-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const HIPEC = "hipec-surgery-in-india";
const COLON = "colon-cancer-treatment-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const ADDITION =
  " Bile-duct lists sit on [Bile Duct Cancer Surgery in India](/treatments/bile-duct-cancer-surgery-in-india).";
const WHIPPLE_NEEDLE = "This page is the Whipple-surgery pathway for GAF Healthcare.";
const PANCREAS_NEEDLE = "This page is the pancreatic-cancer pathway for GAF Healthcare.";
const HIPEC_NEEDLE = "This page is the HIPEC pathway for GAF Healthcare.";
const COLON_NEEDLE = "This page is the colon-cancer pathway for GAF Healthcare.";
const BREAST_NEEDLE = "This page is the breast-cancer pathway for GAF Healthcare.";
const PROSTATE_NEEDLE = "This page is the prostate-cancer pathway for GAF Healthcare.";

const treatment = {
  id: existing?.id ?? "f1c4a9d5-0e38-6a27-b85f-4d9e2a5b8f03",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Bile Duct Cancer Surgery in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Hepatobiliary Surgery",
  category: "Bile Duct Cancer Surgery",
  image: "/uploads/treatments/bile-duct-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-asit-arora",
    "dr-nikhil-agrawal",
    "dr-adarsh-chaudhary",
    "dr-rajesh-shinde",
    "dr-shailesh-shrikhande",
    "dr-sanjay-govil",
    "dr-g-parthasarathy",
    "dr-j-k-a-jameel",
    "dr-venugopal-kota",
    "dr-sachin-daga",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "artemis-hospital",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "bile-duct-cancer-surgery",
    "whipple-procedure",
    "whipple-procedure-pancreaticoduodenectomy",
    "gallbladder-cancer-surgery",
    "biliary-reconstruction",
    "liver-transplantation",
    "liver-resection-hepatectomy",
    "chemotherapy",
    "precision-oncology",
    "ercp",
    "biliary-stenting",
  ],
  relatedTreatmentSlugs: [WHIPPLE, PANCREAS, HIPEC, COLON, BREAST, PROSTATE],
  status: "published" as const,
  featured: true,
  sortOrder: 62,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Bile Duct Cancer Surgery in India",
      shortDescription:
        "Bile duct cancer surgery in India is named after location and remnant, not a brochure. GAF planning is $10,000–$26,000, typically 8–16 nights.",
      editorialBody: body,
      process: [
        {
          id: "bile-duct-step-1",
          title: "Share scans",
          description:
            "The patient provides CT, MRI/MRCP, bilirubin, CA 19-9 and any ERCP or PTBD notes before anyone books travel.",
        },
        {
          id: "bile-duct-step-2",
          title: "HPB team review",
          description:
            "A hepatobiliary or GI-oncology surgeon reviews whether the case is resectable, needs drainage or belongs on a Whipple list.",
        },
        {
          id: "bile-duct-step-3",
          title: "Name the product",
          description:
            "The team writes liver resection, hilar reconstruction, Whipple, drainage or systemic treatment after remnant and vessel review.",
        },
        {
          id: "bile-duct-step-4",
          title: "Itemized estimate",
          description:
            "GAF bile-duct planning is $10,000–$26,000. Neighbouring Whipple is $14,000–$32,000 when that sitting is named.",
        },
        {
          id: "bile-duct-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Fever with jaundice or collapse is a local emergency.",
        },
        {
          id: "bile-duct-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms imaging, liver tests and fitness after arrival.",
        },
        {
          id: "bile-duct-step-7",
          title: "Deliver the named resection",
          description: "Liver, hilar or Whipple surgery proceeds only after the product is named.",
        },
        {
          id: "bile-duct-step-8",
          title: "Specialist ICU and ward",
          description: "Remnant function, bile leak, infection and nutrition are watched before discharge.",
        },
        {
          id: "bile-duct-step-9",
          title: "Oncology follow-up",
          description:
            "The patient leaves with pathology, adjuvant advice and who will follow recurrence risk after returning home.",
        },
      ],
      preparation:
        "Share CT and MRI/MRCP images, not only the written reports, so the HPB team can judge resectability versus drainage versus Whipple.",
      recovery:
        "Remnant function and drains decide recovery. GAF bile-duct planning is 8–16 nights.",
      hospitalStay: "Typically 8–16 nights. A named Whipple sitting may stay 10–18 nights.",
      recoveryPeriod:
        "Varies with liver resection, hilar reconstruction or Whipple. Complications can lengthen the stay substantially.",
      followUp:
        "Request a written summary covering margins, remnant function, adjuvant chemotherapy and who will follow imaging after returning home.",
      importantConsiderations:
        "Not every cholangiocarcinoma is resectable. GAF bile-duct planning is $10,000–$26,000. Fever with jaundice belongs in a local emergency department.",
      treatmentType: "Bile Duct Cancer Surgery / Hepatobiliary Surgery",
      treatmentSetting: "Accredited partner HPB and surgical-oncology theatres and ICUs in India",
      technology:
        "Liver resection, hilar bile-duct resection with hepaticojejunostomy, neighbouring Whipple, drainage and molecular testing",
      searchKeywords: [
        "Bile duct cancer surgery in India",
        "Cholangiocarcinoma surgery in India",
        "Bile duct cancer treatment in India",
        "Bile duct cancer surgery cost in India",
        "Hilar cholangiocarcinoma surgery in India",
        "Whipple surgery for bile duct cancer",
      ],
      faqs: [
        {
          id: "bile-duct-faq-1",
          question: "What is bile duct cancer surgery?",
          answer:
            "A major cancer operation used for selected patients whose cholangiocarcinoma can potentially be removed completely.",
        },
        {
          id: "bile-duct-faq-2",
          question: "Is there one standard operation?",
          answer:
            "No. Intrahepatic tumours usually need liver resection, perihilar tumours often need liver and duct resection with reconstruction, and distal tumours commonly need a Whipple procedure.",
        },
        {
          id: "bile-duct-faq-3",
          question: "How much does bile duct cancer surgery cost in India?",
          answer:
            "GAF Healthcare planning for bile duct cancer surgery is $10,000–$26,000, typically 8–16 nights. US comparison is $45,000–$110,000.",
        },
        {
          id: "bile-duct-faq-4",
          question: "Is Whipple surgery used for bile duct cancer?",
          answer:
            "Yes, for selected distal cholangiocarcinomas. Neighbouring Whipple planning is $14,000–$32,000 when that sitting is named.",
        },
        {
          id: "bile-duct-faq-5",
          question: "How long is hospital stay after bile duct cancer surgery?",
          answer:
            "GAF planning is typically 8–16 nights. Complications or a named Whipple sitting can stay longer.",
        },
        {
          id: "bile-duct-faq-6",
          question: "Is liver transplant an option?",
          answer:
            "Only for a small, carefully selected group, particularly certain perihilar tumours under specialized protocols. There is no live GAF liver-transplant treatment page.",
        },
        {
          id: "bile-duct-faq-7",
          question: "Can international patients undergo bile duct cancer surgery in India?",
          answer: "Yes. CT, MRI/MRCP and medical records should generally be reviewed before travel.",
        },
        {
          id: "bile-duct-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Fever with jaundice, sudden confusion, collapse, uncontrolled bleeding or a leaking drain belongs in a local emergency department.",
        },
        {
          id: "bile-duct-faq-9",
          question: "Is jaundice a sign that surgery cannot be performed?",
          answer:
            "No. Jaundice is common and does not automatically mean surgery is impossible. Significant jaundice may need drainage first.",
        },
        {
          id: "bile-duct-faq-10",
          question: "Which city in India is best for bile duct cancer surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "bile-duct-faq-11",
          question: "Is there a GAF gallbladder-cancer or liver-transplant treatment page?",
          answer:
            "No. Gallbladder-cancer, liver-transplant, liver-resection-only and bile-duct-stent-only treatment pages are not live. Whipple, pancreatic-cancer, HIPEC and colon lists sit on those treatment pages.",
        },
        {
          id: "bile-duct-faq-12",
          question: "What is the key surgical objective?",
          answer: "Complete removal of the tumor with negative margins, known as an R0 resection.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled biliary tree used as the bile-duct cancer surgery hero",
      seoTitle: "Bile Duct Cancer Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Bile duct cancer surgery in India explained: types of cholangiocarcinoma surgery, Whipple procedure, liver resection, GAF planning $10,000–$26,000 and recovery.",
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

function patchFaqByQuestion(slug: string, questionContains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.question?.includes(questionContains)) {
      faq.answer = replacement;
    }
  }
}

patchFaqByQuestion(
  WHIPPLE,
  "bile duct cancer",
  "Selected distal bile-duct cancers may require pancreaticoduodenectomy. Intrahepatic and perihilar lists sit on the bile duct cancer surgery page.",
);

linkRelated(WHIPPLE, WHIPPLE_NEEDLE, ADDITION);
linkRelated(PANCREAS, PANCREAS_NEEDLE, ADDITION);
linkRelated(HIPEC, HIPEC_NEEDLE, ADDITION);
linkRelated(COLON, COLON_NEEDLE, ADDITION);
linkRelated(BREAST, BREAST_NEEDLE, ADDITION);
linkRelated(PROSTATE, PROSTATE_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [ASD closure surgery in India](https://gaf.healthcare/treatments/asd-closure-surgery-in-india).",
    ", [ASD closure surgery in India](https://gaf.healthcare/treatments/asd-closure-surgery-in-india) and [bile duct cancer surgery in India](https://gaf.healthcare/treatments/bile-duct-cancer-surgery-in-india).",
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

patchMarkdown(resolve("scripts/whipple-treatment-body.md"), WHIPPLE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pancreas-treatment-body.md"), PANCREAS_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/hipec-treatment-body.md"), HIPEC_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/colon-treatment-body.md"), COLON_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/breast-treatment-body.md"), BREAST_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/prostate-treatment-body.md"), PROSTATE_NEEDLE, ADDITION);
