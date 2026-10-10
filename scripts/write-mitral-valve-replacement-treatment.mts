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

const body = readFileSync(resolve("scripts/mitral-valve-replacement-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "mitral-valve-replacement-surgery-in-india");
const now = "2026-09-29T23:00:00.000Z";
const SLUG = "mitral-valve-replacement-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TVR = "tricuspid-valve-replacement-in-india";
const TVREPAIR = "tricuspid-valve-repair-in-india";
const CABG = "cabg-surgery-in-india";
const TAVR = "tavr-in-india";
const BYPASS_COST = "heart-bypass-surgery-cost-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ADDITION =
  " Mitral replacement lists sit on [Mitral Valve Replacement Surgery in India](/treatments/mitral-valve-replacement-surgery-in-india).";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const TVR_NEEDLE = "This page is the named tricuspid-replacement product.";
const TVR_STALE = "There is no live GAF mitral-replacement-only or aortic-replacement-only treatment page.";
const TVR_STALE_FIX = "There is no live GAF aortic-replacement-only treatment page.";
const REPAIR_NEEDLE = "This page is the named tricuspid-repair product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const BYPASS_NEEDLE = "This page is the named heart-bypass-surgery-cost product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";

const treatment = {
  id: existing?.id ?? "a7c2e9d4-1f48-7b63-c05e-8d9a2b6f4e13",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Mitral Valve Replacement Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Valve Surgery",
  category: "Heart Valve Replacement",
  image: "/uploads/treatments/mitral-replacement-hero.webp",
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
    "heart-valve-replacement",
    "mitral-valve-repair",
    "heart-valve-repair",
    "double-valve-replacement",
    "aortic-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "robotic-cardiac-surgery",
    "cabg-coronary-artery-bypass-grafting",
    "balloon-mitral-valvotomy",
    "mitraclip",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VALVE, TVR, TVREPAIR, CABG, TAVR, BYPASS_COST, PACEMAKER],
  status: "published" as const,
  featured: true,
  sortOrder: 53,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Mitral Valve Replacement Surgery in India",
      shortDescription:
        "Mitral valve replacement surgery in India replaces a severely damaged mitral valve when repair cannot hold. Neighbouring GAF planning is $7,000–$18,000.",
      editorialBody: body,
      process: [
        {
          id: "mvr-step-1",
          title: "Share echo",
          description:
            "The patient provides echocardiography, TEE if available, ECG, angiography and previous surgery notes before anyone books travel.",
        },
        {
          id: "mvr-step-2",
          title: "Heart Team review",
          description:
            "A valve team reviews whether the case is repair, replacement, balloon valvotomy, MitraClip or medicines.",
        },
        {
          id: "mvr-step-3",
          title: "Name the prosthesis",
          description:
            "The team writes mechanical or tissue replacement, or a neighbouring repair or balloon product.",
        },
        {
          id: "mvr-step-4",
          title: "Itemized estimate",
          description:
            "Neighbouring heart-valve replacement planning is $7,000–$18,000. Neighbouring mitral repair is $7,500–$18,000.",
        },
        {
          id: "mvr-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "mvr-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, coronary pictures and fitness after arrival.",
        },
        {
          id: "mvr-step-7",
          title: "Implant the named valve",
          description:
            "Open, mini or selected transcatheter work proceeds only after the prosthesis and approach are named.",
        },
        {
          id: "mvr-step-8",
          title: "Cardiac ICU and ward",
          description: "Rhythm, bleeding, valve function and wounds are watched before discharge.",
        },
        {
          id: "mvr-step-9",
          title: "Anticoagulation and follow-up",
          description:
            "The patient leaves with valve type, INR plan if needed, medicines and echo dates after returning home.",
        },
      ],
      preparation:
        "Share echocardiography, TEE and coronary pictures so the Heart Team can judge repair versus replacement versus balloon or clip.",
      recovery:
        "Fatigue and reduced stamina are common for weeks. Neighbouring GAF planning is typically 8–16 nights.",
      hospitalStay: "Typically 8–16 nights; ICU commonly several days",
      recoveryPeriod: "Often 6–12 weeks, although individual recovery differs.",
      followUp:
        "Request a written summary covering the prosthesis, anticoagulation, echo dates and who will follow the patient after returning home.",
      importantConsiderations:
        "Repair is preferred when it can hold. Mechanical valves usually need lifelong anticoagulation. New chest pain belongs in a local emergency department.",
      treatmentType: "Mitral Valve Replacement / Structural Heart",
      treatmentSetting: "Accredited partner cardiac theatres, valve clinics and cardiac ICUs in India",
      technology:
        "Mechanical and tissue mitral prostheses, selected minimally invasive access, neighbouring balloon valvotomy and MitraClip",
      searchKeywords: [
        "mitral valve replacement surgery in India",
        "mitral valve replacement cost in India",
        "mechanical mitral valve replacement",
        "tissue mitral valve replacement",
        "MVR surgery in India",
        "mitral valve surgery cost in India",
      ],
      faqs: [
        {
          id: "mvr-faq-1",
          question: "How much does mitral valve replacement cost in India?",
          answer:
            "There is no live GAF mitral-replacement-only sheet. Neighbouring heart valve replacement is $7,000–$18,000, typically 8–16 nights. US comparison is $80,000–$220,000.",
        },
        {
          id: "mvr-faq-2",
          question: "Which is better: mechanical or tissue mitral valve?",
          answer:
            "Neither is universally better. Mechanical valves last longer but usually need lifelong anticoagulation. Tissue valves reduce that burden but can wear.",
        },
        {
          id: "mvr-faq-3",
          question: "Can a mitral valve be repaired instead of replaced?",
          answer:
            "Yes, when a durable repair is technically possible. Neighbouring mitral valve repair is $7,500–$18,000.",
        },
        {
          id: "mvr-faq-4",
          question: "How long does mitral valve replacement surgery take?",
          answer:
            "Commonly several hours, longer if another valve or CABG is performed in the same sitting.",
        },
        {
          id: "mvr-faq-5",
          question: "How long is hospital stay after mitral valve replacement?",
          answer:
            "Often several days including ICU. Neighbouring GAF heart-valve replacement planning is typically 8–16 nights.",
        },
        {
          id: "mvr-faq-6",
          question: "Will I need blood thinners after mitral valve replacement?",
          answer:
            "Mechanical mitral valves generally require lifelong anticoagulation. Tissue valves follow individual cardiology advice.",
        },
        {
          id: "mvr-faq-7",
          question: "Can mitral valve replacement be done without open-heart surgery?",
          answer:
            "Selected patients may qualify for minimally invasive or transcatheter procedures after detailed imaging.",
        },
        {
          id: "mvr-faq-8",
          question: "Can international patients have mitral valve replacement in India?",
          answer:
            "Yes. Echocardiography and medical records should generally be reviewed before travel.",
        },
        {
          id: "mvr-faq-9",
          question: "Which city in India is best for mitral valve replacement?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "mvr-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, sudden breathlessness, fainting, stroke signs or severe bleeding belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "mvr-faq-11",
          question: "Is there a GAF TMVR or mitral-repair treatment page?",
          answer:
            "No. TMVR-only and mitral-repair-only treatment pages are not live. Neighbouring MitraClip is $18,000–$38,000 and is a clip, not surgical MVR.",
        },
        {
          id: "mvr-faq-12",
          question: "Is TAVR the same as mitral replacement?",
          answer:
            "No. Neighbouring TAVR/TAVI is $18,000–$42,000 and is an aortic-valve product.",
        },
      ],
      imageAlt:
        "Educational illustration of a mitral ring silhouette used as the mitral valve replacement hero",
      seoTitle: "Mitral Valve Replacement Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about mitral valve replacement surgery in India, including mechanical vs tissue valves, neighbouring GAF planning $7,000–$18,000, recovery and how to send echocardiography.",
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

function addRelated(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
}

rewriteEditorial(TVR, TVR_STALE, TVR_STALE_FIX);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(TVR, TVR_NEEDLE, ADDITION);
linkRelated(TVREPAIR, REPAIR_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(BYPASS_COST, BYPASS_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
addRelated(TAVR);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [tricuspid valve repair in India](https://gaf.healthcare/treatments/tricuspid-valve-repair-in-india).",
    ", [tricuspid valve repair in India](https://gaf.healthcare/treatments/tricuspid-valve-repair-in-india) and [mitral valve replacement surgery in India](https://gaf.healthcare/treatments/mitral-valve-replacement-surgery-in-india).",
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

patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_STALE, TVR_STALE_FIX);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, `${VALVE_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_NEEDLE, `${TVR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/tricuspid-valve-repair-treatment-body.md"), REPAIR_NEEDLE, `${REPAIR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, `${CABG_NEEDLE}${ADDITION}`);
patchMarkdown(
  resolve("scripts/heart-bypass-surgery-cost-treatment-body.md"),
  BYPASS_NEEDLE,
  `${BYPASS_NEEDLE}${ADDITION}`,
);
patchMarkdown(
  resolve("scripts/pacemaker-implantation-treatment-body.md"),
  PACEMAKER_NEEDLE,
  `${PACEMAKER_NEEDLE}${ADDITION}`,
);
