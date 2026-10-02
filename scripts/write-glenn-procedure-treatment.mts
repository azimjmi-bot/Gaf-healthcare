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

const body = readFileSync(resolve("scripts/glenn-procedure-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "glenn-procedure-surgery-in-india");
const now = "2026-09-30T02:00:00.000Z";
const SLUG = "glenn-procedure-surgery-in-india";
const FONTAN = "fontan-procedure-surgery-in-india";
const ASO = "arterial-switch-operation-in-india";
const PDA = "pda-closure-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const ADDITION =
  " Glenn lists sit on [Glenn Procedure Surgery in India](/treatments/glenn-procedure-surgery-in-india).";
const FONTAN_NEEDLE = "This page is the named Fontan-procedure product.";
const ASO_NEEDLE = "This page is the named arterial-switch product.";
const PDA_NEEDLE = "This page is the named PDA-closure product.";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";

const treatment = {
  id: existing?.id ?? "c8f1e6a2-7b05-3d94-e52c-1a6b9f2d5c70",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Glenn Procedure Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "Glenn Procedure",
  image: "/uploads/treatments/glenn-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-krishna-subramony-iyer",
    "dr-gaurav-kumar",
    "dr-kulbhushan-singh-dagar",
    "dr-ankit-garg",
    "dr-mahendra-narwaley",
    "dr-rajesh-sharma",
    "dr-nidhi-rawal",
    "dr-bhushan-chavan",
    "dr-r-k-r-noveen-davidson",
    "dr-rajesh-kumar-r",
    "dr-anil-kumar-d",
    "dr-sunil-kumar-swain",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "medanta-gurgaon",
    "gleneagles-hospital-mumbai",
    "kims-hospitals-thane",
    "gleneagles-hospitals-bengaluru",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "gleneagles-healthcity-chennai",
    "kims-hospitals-secunderabad",
    "yashoda-hospitals-hi-tech-city",
    "apollo-delhi",
    "max-super-speciality-hospital-saket",
    "apollo-hospitals-navi-mumbai",
  ],
  costPageSlugs: [
    "glenn-procedure",
    "fontan-procedure",
    "norwood-procedure",
    "congenital-heart-surgery",
    "arterial-switch-operation",
    "vsd-closure-ventricular-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "pediatric-heart-transplantation",
  ],
  relatedTreatmentSlugs: [FONTAN, ASO, PDA, VSD, COA, VALVE, PACEMAKER, CABG],
  status: "published" as const,
  featured: true,
  sortOrder: 59,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Glenn Procedure Surgery in India",
      shortDescription:
        "Glenn procedure in India is staged single-ventricle palliation. GAF planning is $8,000–$18,000, typically 8–16 nights.",
      editorialBody: body,
      process: [
        {
          id: "glenn-step-1",
          title: "Share records",
          description:
            "The family provides echocardiography, catheterization and previous operative notes before anyone books travel.",
        },
        {
          id: "glenn-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether Glenn, further observation or local emergency care is honest.",
        },
        {
          id: "glenn-step-3",
          title: "Name the product",
          description:
            "The team writes bidirectional Glenn or hemi-Fontan only after pulmonary-artery and saturation review.",
        },
        {
          id: "glenn-step-4",
          title: "Itemized estimate",
          description:
            "GAF Glenn planning is $8,000–$18,000. Neighbouring Fontan is $9,000–$22,000 when completion is named.",
        },
        {
          id: "glenn-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A collapsing single-ventricle child belongs in a local emergency department.",
        },
        {
          id: "glenn-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, cath findings, saturations and fitness after arrival.",
        },
        {
          id: "glenn-step-7",
          title: "Complete the named Glenn",
          description: "Superior cavopulmonary connection proceeds only after the product is named.",
        },
        {
          id: "glenn-step-8",
          title: "Pediatric cardiac ICU",
          description: "Saturations, drains, fluid balance and rhythm are watched before discharge.",
        },
        {
          id: "glenn-step-9",
          title: "Interstage follow-up",
          description:
            "The family leaves with saturation guidance and who will watch the child toward possible Fontan review.",
        },
      ],
      preparation:
        "Share echocardiography, catheterization and previous operative notes so the congenital team can judge Glenn readiness versus further observation.",
      recovery:
        "Saturations and chest drains decide recovery. GAF planning is typically 8–16 nights, with parent stay expected.",
      hospitalStay: "Typically 8–16 nights; parent stay expected. Prolonged drains or low-output states can stay longer.",
      recoveryPeriod:
        "ICU recovery is individual. Activity, feeding and air travel wait on the treating congenital cardiac team.",
      followUp:
        "Request a written summary covering the Glenn type, saturations, medicines and who will follow the child at home.",
      importantConsiderations:
        "A collapsing single-ventricle child is a local emergency. Glenn is not a cure. Fontan and Norwood are neighbouring stages, not this page.",
      treatmentType: "Glenn Procedure / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric congenital theatres and ICUs in India",
      technology:
        "Bidirectional Glenn or hemi-Fontan, selected additional pulmonary blood flow, neighbouring Fontan and Norwood stages",
      searchKeywords: [
        "Glenn procedure surgery in India",
        "Glenn surgery in India",
        "bidirectional Glenn procedure in India",
        "Glenn shunt surgery",
        "Glenn procedure cost in India",
        "Glenn surgery for single ventricle",
      ],
      faqs: [
        {
          id: "glenn-faq-1",
          question: "How much does Glenn surgery cost in India?",
          answer:
            "GAF Healthcare planning for Glenn procedure is $8,000–$18,000, typically 8–16 nights, with parent stay expected. US comparison is $60,000–$160,000.",
        },
        {
          id: "glenn-faq-2",
          question: "What is a Glenn procedure?",
          answer:
            "A staged palliative heart operation in which the superior vena cava is connected to the pulmonary arteries.",
        },
        {
          id: "glenn-faq-3",
          question: "Is Glenn surgery a complete repair?",
          answer:
            "Usually no. It is a staged palliative procedure and may be followed later by Fontan completion in selected children.",
        },
        {
          id: "glenn-faq-4",
          question: "Is Glenn the same as Fontan?",
          answer:
            "No. Glenn is usually the second stage. Fontan completion adds lower-body venous return. Neighbouring Fontan is $9,000–$22,000.",
        },
        {
          id: "glenn-faq-5",
          question: "How long is hospital stay after Glenn?",
          answer:
            "It depends on drains and the child's condition. GAF planning is typically 8–16 nights. Complex recoveries stay longer.",
        },
        {
          id: "glenn-faq-6",
          question: "Does every child need Fontan after Glenn?",
          answer: "No. Fontan candidacy must be assessed individually after saturations, imaging and clinical review.",
        },
        {
          id: "glenn-faq-7",
          question: "When is Glenn usually performed?",
          answer:
            "Commonly during infancy, often several months after first-stage palliation. Age alone does not decide readiness.",
        },
        {
          id: "glenn-faq-8",
          question: "Can international families travel for Glenn surgery?",
          answer:
            "Selected stable children can, after records review and hospital acceptance. A collapsing child belongs in a local emergency department first.",
        },
        {
          id: "glenn-faq-9",
          question: "Which city in India is best for Glenn surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "glenn-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Increasing breathlessness, grey or blue skin, fainting, poor feeding or collapse belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "glenn-faq-11",
          question: "Is there a GAF Norwood or heart-transplant treatment page?",
          answer:
            "No. Norwood, HLHS-only and heart-transplant treatment pages are not live. Neighbouring sheets exist. Fontan, arterial-switch, PDA, VSD and coarctation lists sit on those treatment pages.",
        },
        {
          id: "glenn-faq-12",
          question: "What oxygen level is expected after Glenn?",
          answer:
            "Saturation is usually lower than a two-ventricle circulation. The expected range is individualized to pulmonary blood flow and anatomy.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled superior-to-pulmonary venous silhouette used as the Glenn hero",
      seoTitle: "Glenn Procedure in India: Surgery, Cost, Recovery & Hospitals",
      metaDescription:
        "Learn about Glenn procedure in India, including bidirectional Glenn surgery, indications, GAF planning $8,000–$18,000, recovery and the Fontan pathway.",
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

function scrubGlennNotLive(text: string) {
  return text
    .replace(
      "There is no live GAF Glenn, Norwood, HLHS-only, heart-transplant or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF Norwood, HLHS-only, heart-transplant or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF HLHS-only or Glenn treatment page.",
      "There is no live GAF HLHS-only treatment page.",
    )
    .replace(
      "Neighbouring [Glenn procedure](/costs/India/Pediatric-Cardiac-Surgery/Glenn-Procedure) is **$8,000–$18,000**. There is no live GAF Glenn treatment page.",
      "Neighbouring [Glenn procedure](/costs/India/Pediatric-Cardiac-Surgery/Glenn-Procedure) is **$8,000–$18,000**. Glenn lists sit on [Glenn Procedure Surgery in India](/treatments/glenn-procedure-surgery-in-india).",
    )
    .replace(
      "Glenn, Norwood, HLHS-only, heart-transplant, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
      "Norwood, HLHS-only, heart-transplant, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
    )
    .replace(
      "Named [Glenn sheet](/costs/India/Pediatric-Cardiac-Surgery/Glenn-Procedure) only",
      "[Glenn Procedure Surgery in India](/treatments/glenn-procedure-surgery-in-india) plus the [Glenn sheet](/costs/India/Pediatric-Cardiac-Surgery/Glenn-Procedure)",
    )
    .replace(
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, Glenn or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live on this site.",
      "ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
    )
    .replace(
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live on this site.",
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
    )
    .replace(
      "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, TOF and Glenn treatment pages are not live.",
      "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure and TOF treatment pages are not live.",
    )
    .replace(
      "No. ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live.",
      "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubGlennNotLive(row.translations.en.editorialBody);
  if (next !== row.translations.en.editorialBody) {
    row.translations.en.editorialBody = next;
  }
}

function patchFaqAnswer(slug: string, contains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.answer.includes(contains) && /glenn/i.test(faq.answer)) {
      faq.answer = replacement;
    }
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

patchEditorial(FONTAN);
patchEditorial(PDA);
patchEditorial(ASO);
patchFaqByQuestion(
  FONTAN,
  "Glenn, Norwood or heart-transplant",
  "Glenn lists sit on the Glenn procedure page. Norwood, HLHS-only and heart-transplant treatment pages are not live. Neighbouring sheets exist. Arterial-switch, PDA, VSD and coarctation lists sit on those treatment pages.",
);
patchFaqAnswer(
  PDA,
  "Glenn",
  "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live. Neighbouring sheets exist. VSD, coarctation and arterial-switch lists sit on those treatment pages. Fontan lists sit on the Fontan procedure page. Glenn lists sit on the Glenn procedure page.",
);
patchFaqAnswer(
  ASO,
  "Glenn",
  "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure and TOF treatment pages are not live. Neighbouring sheets exist. Fontan lists sit on the Fontan procedure page. Glenn lists sit on the Glenn procedure page.",
);

linkRelated(FONTAN, FONTAN_NEEDLE, ADDITION);
linkRelated(ASO, ASO_NEEDLE, ADDITION);
linkRelated(PDA, PDA_NEEDLE, ADDITION);
linkRelated(VSD, VSD_NEEDLE, ADDITION);
linkRelated(COA, COA_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Fontan procedure surgery in India](https://gaf.healthcare/treatments/fontan-procedure-surgery-in-india).",
    ", [Fontan procedure surgery in India](https://gaf.healthcare/treatments/fontan-procedure-surgery-in-india) and [Glenn procedure surgery in India](https://gaf.healthcare/treatments/glenn-procedure-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle?: string, addition?: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubGlennNotLive(text);
  let next = scrubbed;
  if (needle && addition && scrubbed.includes(needle) && !scrubbed.includes(`/treatments/${SLUG}`)) {
    next = scrubbed.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/fontan-procedure-treatment-body.md"), FONTAN_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/arterial-switch-treatment-body.md"), ASO_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pda-closure-treatment-body.md"), PDA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
