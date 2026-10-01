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

const body = readFileSync(resolve("scripts/bentall-procedure-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string; faqs?: Array<{ id: string; question: string; answer: string }> } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "bentall-procedure-in-india");
const now = "2026-09-29T23:30:00.000Z";
const SLUG = "bentall-procedure-in-india";
const ADR = "aortic-dissection-repair-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const CABG = "cabg-surgery-in-india";
const BAV = "aortic-balloon-valvuloplasty-in-india";
const MVR = "mitral-valve-replacement-surgery-in-india";
const TVR = "tricuspid-valve-replacement-in-india";
const ADDITION = " Bentall lists sit on [Bentall Procedure in India](/treatments/bentall-procedure-in-india).";
const ADR_NEEDLE = "This page is the named aortic-dissection-repair product.";
const ADR_STALE = "There is no live GAF TEVAR-only, Bentall-only, aortic-root-only or aortic-aneurysm-repair treatment page.";
const ADR_STALE_FIX = "There is no live GAF TEVAR-only, aortic-root-only or aortic-aneurysm-repair treatment page.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const TAVR_NEEDLE = "This page is the named TAVR/TAVI product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const BAV_NEEDLE = "This page is the named balloon aortic valvuloplasty product.";
const MVR_NEEDLE = "This page is the named mitral-replacement product.";
const TVR_NEEDLE = "This page is the named tricuspid-replacement product.";

const treatment = {
  id: existing?.id ?? "c8d3f1a6-2e59-8b74-d16f-9e0a3c7b5d24",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Bentall Procedure in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Aortic Surgery",
  category: "Aortic Root Replacement",
  image: "/uploads/treatments/bentall-hero.webp",
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
    "aortic-root-replacement",
    "aortic-aneurysm-surgery",
    "aortic-valve-replacement",
    "heart-valve-replacement",
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "cabg-coronary-artery-bypass-grafting",
    "double-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [ADR, VALVE, TAVR, CABG, BAV, MVR, TVR],
  status: "published" as const,
  featured: true,
  sortOrder: 54,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Bentall Procedure in India",
      shortDescription:
        "The Bentall procedure in India replaces a diseased aortic root and valve with a composite graft. Neighbouring GAF planning is $10,000–$24,000.",
      editorialBody: body,
      process: [
        {
          id: "bentall-step-1",
          title: "Share CTA",
          description:
            "The patient provides CT angiography, echocardiography and previous aortic notes before anyone books travel.",
        },
        {
          id: "bentall-step-2",
          title: "Aortic team review",
          description:
            "A cardiac or aortic surgeon reviews whether the case is Bentall, valve-sparing root replacement, isolated AVR or emergency dissection.",
        },
        {
          id: "bentall-step-3",
          title: "Name the conduit",
          description:
            "The team writes composite valve-graft, valve-sparing root or a neighbouring isolated-valve product.",
        },
        {
          id: "bentall-step-4",
          title: "Itemized estimate",
          description:
            "Neighbouring aortic root replacement planning is $10,000–$24,000. Neighbouring aneurysm surgery is $9,000–$22,000.",
        },
        {
          id: "bentall-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned root aneurysms travel after records review. Sudden chest or back pain is a local emergency.",
        },
        {
          id: "bentall-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms CTA, echo, kidney function and fitness after arrival.",
        },
        {
          id: "bentall-step-7",
          title: "Implant the named graft",
          description:
            "The diseased root and valve are replaced and the coronary arteries are reimplanted into the conduit.",
        },
        {
          id: "bentall-step-8",
          title: "Cardiac ICU and ward",
          description: "Bleeding, brain, kidney, rhythm and blood pressure are watched before discharge.",
        },
        {
          id: "bentall-step-9",
          title: "Lifelong aorta follow-up",
          description:
            "The patient leaves with valve type, anticoagulation if needed, blood-pressure targets and residual-aorta imaging dates.",
        },
      ],
      preparation:
        "Share CT angiography images and echocardiography so the aortic team can judge Bentall versus valve-sparing versus isolated AVR.",
      recovery:
        "Fatigue is common for weeks after open root replacement. Neighbouring GAF planning is typically 10–18 nights.",
      hospitalStay: "Typically 10–18 nights; emergency dissection stays can be longer",
      recoveryPeriod: "Several weeks to months after major open aortic-root surgery.",
      followUp:
        "Request a written summary covering the conduit, valve type, anticoagulation, blood-pressure plan and who will image the remaining aorta after returning home.",
      importantConsiderations:
        "Acute Type A dissection is a local emergency. Valve-sparing may be possible when leaflets can hold. Mechanical conduits usually need lifelong anticoagulation.",
      treatmentType: "Bentall Procedure / Aortic Root Replacement",
      treatmentSetting: "Accredited partner cardiac theatres, aortic programmes and cardiac ICUs in India",
      technology:
        "Composite valve-graft conduits, mechanical or tissue aortic valves, coronary-button reimplantation, neighbouring valve-sparing and aneurysm techniques",
      searchKeywords: [
        "Bentall procedure in India",
        "Bentall surgery in India",
        "Bentall procedure cost in India",
        "aortic root replacement in India",
        "composite aortic root replacement",
        "Bentall surgery recovery",
      ],
      faqs: [
        {
          id: "bentall-faq-1",
          question: "How much does a Bentall procedure cost in India?",
          answer:
            "There is no live GAF Bentall-only sheet. Neighbouring aortic root replacement is $10,000–$24,000, typically 10–18 nights. US comparison is $90,000–$250,000.",
        },
        {
          id: "bentall-faq-2",
          question: "What is a Bentall procedure?",
          answer:
            "A surgery that replaces the aortic root and aortic valve, usually with a composite valve-graft conduit, then reattaches the coronary arteries.",
        },
        {
          id: "bentall-faq-3",
          question: "Can the native valve be preserved?",
          answer:
            "Sometimes. If the valve is suitable, a valve-sparing aortic root replacement such as a David procedure may be considered instead. There is no live GAF David-procedure page.",
        },
        {
          id: "bentall-faq-4",
          question: "How long does Bentall surgery take?",
          answer:
            "Commonly several hours. Cleveland Clinic reports about four to five hours, longer if arch work or CABG is added.",
        },
        {
          id: "bentall-faq-5",
          question: "How long is hospital stay after a Bentall procedure?",
          answer:
            "Often around 1–2 weeks. Neighbouring GAF aortic-root replacement planning is typically 10–18 nights.",
        },
        {
          id: "bentall-faq-6",
          question: "Will I need blood thinners after Bentall surgery?",
          answer:
            "Mechanical conduits generally require lifelong anticoagulation. Tissue valves follow individual cardiology advice.",
        },
        {
          id: "bentall-faq-7",
          question: "Is Bentall the same as isolated aortic valve replacement?",
          answer:
            "No. Isolated SAVR replaces the valve and usually leaves the root. Neighbouring SAVR is $7,000–$18,500.",
        },
        {
          id: "bentall-faq-8",
          question: "Can international patients have a Bentall procedure in India?",
          answer:
            "Yes, after CTA and records review. Acute chest or back pain is a local emergency and should not travel for a cheaper package.",
        },
        {
          id: "bentall-faq-9",
          question: "Which city in India is best for Bentall surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "bentall-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe chest or upper-back pain, fainting, severe breathlessness, new neurological symptoms or sudden limb weakness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "bentall-faq-11",
          question: "Is TAVR the same as Bentall or TEVAR?",
          answer:
            "No. Neighbouring TAVR/TAVI is $18,000–$42,000 and is a catheter aortic-valve product. TEVAR is a thoracic stent-graft. Bentall is open composite root replacement.",
        },
        {
          id: "bentall-faq-12",
          question: "Is there a GAF David, TEVAR or isolated-AVR treatment page?",
          answer:
            "No. Valve-sparing-root, David-procedure, TEVAR-only and aortic-replacement-only treatment pages are not live.",
        },
      ],
      imageAlt: "Educational illustration of a composite aortic-root graft used as the Bentall procedure hero",
      seoTitle: "Bentall Procedure in India: Cost, Surgery, Recovery & Hospitals",
      metaDescription:
        "Learn about Bentall procedure in India, including indications, conduit choice, neighbouring GAF planning $10,000–$24,000, recovery and how to send CTA.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function rewriteEditorial(slug: string, from: string, to: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  if (row.translations.en.editorialBody.includes(from)) {
    row.translations.en.editorialBody = row.translations.en.editorialBody.replace(from, to);
  }
}

function rewriteFaqAnswer(slug: string, needle: string, from: string, to: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faq = row?.translations?.en?.faqs?.find((item) => item.question.includes(needle) || item.answer.includes(needle));
  if (faq?.answer.includes(from)) {
    faq.answer = faq.answer.replace(from, to);
  }
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

rewriteEditorial(ADR, ADR_STALE, ADR_STALE_FIX);
rewriteFaqAnswer(
  ADR,
  "TEVAR or Bentall",
  "No. TEVAR-only, Bentall-only, aortic-root-only and aortic-aneurysm-repair treatment pages are not live. Use this page and the named modality sheets.",
  "No. TEVAR-only, aortic-root-only and aortic-aneurysm-repair treatment pages are not live. Bentall lists sit on Bentall Procedure in India.",
);
linkRelated(ADR, ADR_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(BAV, BAV_NEEDLE, ADDITION);
linkRelated(MVR, MVR_NEEDLE, ADDITION);
linkRelated(TVR, TVR_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [mitral valve replacement surgery in India](https://gaf.healthcare/treatments/mitral-valve-replacement-surgery-in-india).",
    ", [mitral valve replacement surgery in India](https://gaf.healthcare/treatments/mitral-valve-replacement-surgery-in-india) and [Bentall procedure in India](https://gaf.healthcare/treatments/bentall-procedure-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, from: string, to: string) {
  const text = readFileSync(path, "utf8");
  if (text.includes(from)) {
    writeFileSync(path, text.replace(from, to));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_STALE, ADR_STALE_FIX);
patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_NEEDLE, `${ADR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, `${VALVE_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, `${TAVR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, `${CABG_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/aortic-balloon-valvuloplasty-treatment-body.md"), BAV_NEEDLE, `${BAV_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/mitral-valve-replacement-treatment-body.md"), MVR_NEEDLE, `${MVR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_NEEDLE, `${TVR_NEEDLE}${ADDITION}`);
