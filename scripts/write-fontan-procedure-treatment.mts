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

const body = readFileSync(resolve("scripts/fontan-procedure-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string; faqs?: Array<{ id: string; answer: string }> } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "fontan-procedure-surgery-in-india");
const now = "2026-09-30T01:30:00.000Z";
const SLUG = "fontan-procedure-surgery-in-india";
const ASO = "arterial-switch-operation-in-india";
const PDA = "pda-closure-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const ADDITION =
  " Fontan lists sit on [Fontan Procedure Surgery in India](/treatments/fontan-procedure-surgery-in-india).";
const ASO_NEEDLE = "This page is the named arterial-switch product.";
const PDA_NEEDLE = "This page is the named PDA-closure product.";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";

const treatment = {
  id: existing?.id ?? "b7e0d5f1-6a94-2c83-d41b-0f5a8e1c4b69",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Fontan Procedure Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "Fontan Procedure",
  image: "/uploads/treatments/fontan-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-naresh-trehan",
    "dr-z-s-meharwal",
    "dr-ajay-kaul",
    "dr-anil-bhan",
    "dr-gulshan-rohra",
    "dr-mangesh-kohale",
    "dr-sathyaki-p-nambala",
    "dr-harsha-goutham-h-v",
    "dr-girinath-m-r",
    "dr-k-r-balakrishnan",
    "dr-a-g-k-gokhale",
    "dr-kale-satya-sridhar",
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
  ],
  costPageSlugs: [
    "fontan-procedure",
    "glenn-procedure",
    "norwood-procedure",
    "congenital-heart-surgery",
    "arterial-switch-operation",
    "vsd-closure-ventricular-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "pediatric-heart-transplantation",
  ],
  relatedTreatmentSlugs: [ASO, PDA, VSD, COA, VALVE, PACEMAKER, CABG],
  status: "published" as const,
  featured: true,
  sortOrder: 58,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Fontan Procedure Surgery in India",
      shortDescription:
        "Fontan completion in India finishes single-ventricle palliation. GAF planning is $9,000–$22,000, typically 10–18 nights.",
      editorialBody: body,
      process: [
        {
          id: "fontan-step-1",
          title: "Share records",
          description:
            "The family provides echocardiography, catheterization and previous operative notes before anyone books travel.",
        },
        {
          id: "fontan-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether Fontan, further Glenn observation or local emergency care is honest.",
        },
        {
          id: "fontan-step-3",
          title: "Name the product",
          description:
            "The team writes extracardiac, lateral-tunnel or fenestrated Fontan only after anatomy and pulmonary-resistance review.",
        },
        {
          id: "fontan-step-4",
          title: "Itemized estimate",
          description:
            "GAF Fontan planning is $9,000–$22,000. Neighbouring Glenn is $8,000–$18,000 when that stage is named.",
        },
        {
          id: "fontan-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A collapsing single-ventricle child belongs in a local emergency department.",
        },
        {
          id: "fontan-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, cath findings, saturations and fitness after arrival.",
        },
        {
          id: "fontan-step-7",
          title: "Complete the named Fontan",
          description: "Open-heart total cavopulmonary connection proceeds only after the product is named.",
        },
        {
          id: "fontan-step-8",
          title: "Pediatric cardiac ICU",
          description: "Drains, fluid balance, saturation and rhythm are watched before discharge.",
        },
        {
          id: "fontan-step-9",
          title: "Lifelong follow-up",
          description:
            "The family leaves with a heart-and-liver imaging plan and who will follow Fontan circulation after returning home.",
        },
      ],
      preparation:
        "Share echocardiography, catheterization and previous operative notes so the congenital team can judge Fontan completion versus further observation.",
      recovery:
        "Pleural drains and fluid balance decide recovery. GAF planning is typically 10–18 nights, with parent stay expected.",
      hospitalStay: "Typically 10–18 nights; parent stay expected. Prolonged drains or low-output states can stay longer.",
      recoveryPeriod:
        "ICU recovery is individual. Activity, school and air travel wait on the treating congenital cardiac team.",
      followUp:
        "Request a written summary covering the Fontan type, fenestration, medicines, liver surveillance and who will follow the child at home.",
      importantConsiderations:
        "A collapsing single-ventricle child is a local emergency. Fontan is not a cure. Glenn and Norwood are neighbouring stages, not this page.",
      treatmentType: "Fontan Procedure / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric congenital theatres and ICUs in India",
      technology:
        "Extracardiac conduit or lateral-tunnel Fontan, selected fenestration, neighbouring Glenn and Norwood stages",
      searchKeywords: [
        "Fontan procedure surgery in India",
        "Fontan surgery in India",
        "Fontan surgery cost in India",
        "Fontan operation in India",
        "Fontan surgery for single ventricle",
        "Fontan completion surgery",
      ],
      faqs: [
        {
          id: "fontan-faq-1",
          question: "How much does Fontan surgery cost in India?",
          answer:
            "GAF Healthcare planning for Fontan procedure is $9,000–$22,000, typically 10–18 nights, with parent stay expected. US comparison is $70,000–$180,000.",
        },
        {
          id: "fontan-faq-2",
          question: "What is Fontan surgery?",
          answer:
            "A palliative cardiac operation that directs systemic venous blood to the pulmonary arteries without passing through a pumping ventricle.",
        },
        {
          id: "fontan-faq-3",
          question: "Is Fontan a cure?",
          answer: "No. It creates a Fontan circulation and is the final stage of single-ventricle palliation.",
        },
        {
          id: "fontan-faq-4",
          question: "Is Fontan open-heart surgery?",
          answer:
            "Usually yes. Approaches vary with anatomy and previous stages, but Fontan completion is major congenital cardiac surgery.",
        },
        {
          id: "fontan-faq-5",
          question: "How long is hospital stay after Fontan?",
          answer:
            "It depends on drains and the child's condition. GAF planning is typically 10–18 nights. Complex recoveries stay longer.",
        },
        {
          id: "fontan-faq-6",
          question: "Does the child need lifelong follow-up?",
          answer:
            "Yes. Fontan circulation needs lifelong cardiac and multisystem surveillance, including liver review.",
        },
        {
          id: "fontan-faq-7",
          question: "Is Glenn the same as Fontan?",
          answer:
            "No. Glenn is usually the second stage. Fontan completion adds lower-body venous return. Neighbouring Glenn is $8,000–$18,000.",
        },
        {
          id: "fontan-faq-8",
          question: "Can international families travel for Fontan completion?",
          answer:
            "Selected stable children can, after records review and hospital acceptance. A collapsing child belongs in a local emergency department first.",
        },
        {
          id: "fontan-faq-9",
          question: "Which city in India is best for Fontan surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "fontan-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Increasing breathlessness, grey or blue skin, fainting, rapid swelling or collapse belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "fontan-faq-11",
          question: "Is there a GAF Glenn, Norwood or heart-transplant treatment page?",
          answer:
            "No. Glenn, Norwood, HLHS-only and heart-transplant treatment pages are not live. Neighbouring sheets exist. Arterial-switch, PDA, VSD and coarctation lists sit on those treatment pages.",
        },
        {
          id: "fontan-faq-12",
          question: "Can Fontan circulation fail?",
          answer:
            "Yes. Failure can involve the ventricle, rhythm, high venous pressure, protein-losing enteropathy, plastic bronchitis or liver disease.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled single-ventricle silhouette used as the Fontan hero",
      seoTitle: "Fontan Procedure Surgery in India: Cost, Treatment, Recovery & Hospitals",
      metaDescription:
        "Learn about Fontan procedure surgery in India, including stages, types, GAF planning $9,000–$22,000, recovery and how to send echocardiography.",
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

function scrubFontanNotLive(text: string) {
  return text
    .replace(
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, Glenn, Fontan or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, Glenn or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live on this site.",
      "ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live on this site.",
    )
    .replace(
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live on this site.",
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live on this site.",
    )
    .replace(
      "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, TOF, Glenn and Fontan treatment pages are not live.",
      "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, TOF and Glenn treatment pages are not live.",
    )
    .replace(
      "No. ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live.",
      "No. ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubFontanNotLive(row.translations.en.editorialBody);
  if (next !== row.translations.en.editorialBody) {
    row.translations.en.editorialBody = next;
  }
}

function patchFaqAnswer(slug: string, contains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.answer.includes(contains) && faq.answer.toLowerCase().includes("fontan")) {
      faq.answer = replacement;
    }
  }
}

patchEditorial(PDA);
patchEditorial(ASO);
patchFaqAnswer(
  PDA,
  "Fontan",
  "No. ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live. Neighbouring sheets exist. VSD, coarctation and arterial-switch lists sit on those treatment pages. Fontan lists sit on the Fontan procedure page.",
);
patchFaqAnswer(
  ASO,
  "Fontan",
  "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, TOF and Glenn treatment pages are not live. Neighbouring sheets exist. Fontan lists sit on the Fontan procedure page.",
);

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
    "and [arterial switch operation in India](https://gaf.healthcare/treatments/arterial-switch-operation-in-india).",
    ", [arterial switch operation in India](https://gaf.healthcare/treatments/arterial-switch-operation-in-india) and [Fontan procedure surgery in India](https://gaf.healthcare/treatments/fontan-procedure-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubFontanNotLive(text);
  let next = scrubbed;
  if (scrubbed.includes(needle) && !scrubbed.includes(`/treatments/${SLUG}`)) {
    next = scrubbed.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/arterial-switch-treatment-body.md"), ASO_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pda-closure-treatment-body.md"), PDA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
