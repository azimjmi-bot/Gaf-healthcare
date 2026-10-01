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

const body = readFileSync(resolve("scripts/tricuspid-valve-repair-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "tricuspid-valve-repair-in-india");
const now = "2026-09-29T22:30:00.000Z";
const SLUG = "tricuspid-valve-repair-in-india";
const TVR = "tricuspid-valve-replacement-in-india";
const VALVE = "heart-valve-replacement-in-india";
const CABG = "cabg-surgery-in-india";
const TAVR = "tavr-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const BYPASS_COST = "heart-bypass-surgery-cost-in-india";
const ADDITION =
  " Tricuspid repair lists sit on [Tricuspid Valve Repair in India](/treatments/tricuspid-valve-repair-in-india).";
const TVR_NEEDLE = "This page is the named tricuspid-replacement product.";
const TVR_STALE =
  "There is no live GAF tricuspid-repair-only, mitral-replacement-only or aortic-replacement-only treatment page.";
const TVR_STALE_FIX =
  "There is no live GAF mitral-replacement-only or aortic-replacement-only treatment page.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const ICD_NEEDLE = "This page is the named ICD product.";
const BYPASS_NEEDLE = "This page is the named heart-bypass-surgery-cost product.";

const treatment = {
  id: existing?.id ?? "f5a8c3e1-9b31-6d52-be8e-4c7d0f3a2b69",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Tricuspid Valve Repair in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Valve Surgery",
  category: "Heart Valve Repair",
  image: "/uploads/treatments/tricuspid-repair-hero.webp",
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
    "heart-valve-repair",
    "mitral-valve-repair",
    "heart-valve-replacement",
    "double-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "robotic-cardiac-surgery",
    "cabg-coronary-artery-bypass-grafting",
    "congenital-heart-surgery",
    "pacemaker-implantation",
    "icd-implantation-implantable-cardioverter-defibrillator",
  ],
  relatedTreatmentSlugs: [TVR, VALVE, CABG, TAVR, PACEMAKER, ICD, BYPASS_COST],
  status: "published" as const,
  featured: true,
  sortOrder: 52,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Tricuspid Valve Repair in India",
      shortDescription:
        "Tricuspid valve repair in India treats significant tricuspid regurgitation while keeping the native valve when anatomy allows. Neighbouring GAF planning is $6,500–$16,500.",
      editorialBody: body,
      process: [
        {
          id: "tvrpr-step-1",
          title: "Share echo",
          description:
            "The patient provides echocardiography, CT or MRI if available, ECG, blood tests and device details before anyone books travel.",
        },
        {
          id: "tvrpr-step-2",
          title: "Heart Team review",
          description:
            "A valve team reviews whether the case is repair, replacement, T-TEER, medicines or a combined left-sided sitting.",
        },
        {
          id: "tvrpr-step-3",
          title: "Name the product",
          description:
            "The team writes isolated repair, concomitant mitral work, replacement or catheter repair as separate products.",
        },
        {
          id: "tvrpr-step-4",
          title: "Itemized estimate",
          description:
            "Neighbouring heart-valve repair planning is $6,500–$16,500. Neighbouring replacement is $7,000–$18,000.",
        },
        {
          id: "tvrpr-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "tvrpr-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms echo, right-ventricular function and fitness after arrival.",
        },
        {
          id: "tvrpr-step-7",
          title: "Deliver the named repair",
          description:
            "Annuloplasty, leaflet work or selected T-TEER proceeds only after anatomy is named.",
        },
        {
          id: "tvrpr-step-8",
          title: "Cardiac ICU and ward",
          description: "Rhythm, fluid balance, residual TR and wounds are watched before discharge.",
        },
        {
          id: "tvrpr-step-9",
          title: "Echo follow-up",
          description:
            "The patient leaves with medicines, activity rules and a plan for repeat echocardiography after returning home.",
        },
      ],
      preparation:
        "Share echocardiography, right-ventricular measurements, pulmonary pressures and device-lead details so the Heart Team can judge repair versus replacement versus T-TEER.",
      recovery:
        "Open repair generally needs a longer recovery than catheter repair. Neighbouring GAF planning is typically 7–14 nights.",
      hospitalStay: "Typically 7–14 nights; ICU commonly several days",
      recoveryPeriod: "Often several weeks to a few months, longer after combined valve surgery.",
      followUp:
        "Request a written summary covering the repair technique, residual TR, pacemaker status, medicines and who will follow the patient after returning home.",
      importantConsiderations:
        "Repair is preferred when it can hold. Replacement is a different product. New chest pain belongs in a local emergency department.",
      treatmentType: "Tricuspid Valve Repair / Structural Heart",
      treatmentSetting: "Accredited partner cardiac theatres, valve clinics and cardiac ICUs in India",
      technology:
        "Ring annuloplasty, leaflet reconstruction, selected minimally invasive access and evolving T-TEER",
      searchKeywords: [
        "tricuspid valve repair in India",
        "tricuspid valve repair cost in India",
        "tricuspid regurgitation treatment in India",
        "tricuspid annuloplasty India",
        "T-TEER in India",
        "transcatheter tricuspid valve repair",
      ],
      faqs: [
        {
          id: "tvrpr-faq-1",
          question: "What is tricuspid valve repair?",
          answer:
            "A procedure that restores tricuspid valve function without replacing it, when repair is technically possible.",
        },
        {
          id: "tvrpr-faq-2",
          question: "Is tricuspid valve repair better than replacement?",
          answer:
            "When technically feasible, guidelines generally favor repair because it preserves the native valve.",
        },
        {
          id: "tvrpr-faq-3",
          question: "How much does tricuspid valve repair cost in India?",
          answer:
            "There is no live GAF tricuspid-repair-only sheet. Neighbouring heart valve repair is $6,500–$16,500, typically 7–14 nights. US comparison is $75,000–$200,000.",
        },
        {
          id: "tvrpr-faq-4",
          question: "How long does tricuspid valve repair take?",
          answer:
            "Duration varies with technique and whether another valve or CABG is performed in the same sitting.",
        },
        {
          id: "tvrpr-faq-5",
          question: "How long is hospital stay after tricuspid valve repair?",
          answer:
            "Often several days after isolated surgery. Neighbouring GAF heart-valve repair planning is typically 7–14 nights.",
        },
        {
          id: "tvrpr-faq-6",
          question: "Can severe tricuspid regurgitation be treated without surgery?",
          answer:
            "Medicines can control congestion. They do not reconstruct a severely damaged valve. Selected high-risk patients may be considered for T-TEER.",
        },
        {
          id: "tvrpr-faq-7",
          question: "Can tricuspid valve repair be done without open-heart surgery?",
          answer:
            "Yes, in selected patients, using minimally invasive or catheter-based approaches after detailed imaging.",
        },
        {
          id: "tvrpr-faq-8",
          question: "What tests are needed before tricuspid valve repair?",
          answer:
            "Most patients need detailed echocardiography. TEE, CT, MRI, ECG and blood tests may be added.",
        },
        {
          id: "tvrpr-faq-9",
          question: "Can tricuspid valve repair be combined with mitral valve surgery?",
          answer:
            "Yes. Neighbouring mitral valve repair is $7,500–$18,000 when left-sided repair is also named.",
        },
        {
          id: "tvrpr-faq-10",
          question: "Can tricuspid regurgitation come back after repair?",
          answer:
            "Yes. Residual or recurrent TR can occur. Regular echocardiographic follow-up is required.",
        },
        {
          id: "tvrpr-faq-11",
          question: "Which city in India is best for tricuspid valve repair?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "tvrpr-faq-12",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, sudden breathlessness, fainting or sudden swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
      ],
      imageAlt:
        "Educational illustration of a tricuspid ring silhouette used as the tricuspid valve repair hero",
      seoTitle: "Tricuspid Valve Repair in India: Procedure, Cost, Recovery & Hospitals",
      metaDescription:
        "Learn about tricuspid valve repair in India, including indications, diagnosis, surgical and transcatheter techniques, recovery, risks and neighbouring GAF planning $6,500–$16,500.",
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
linkRelated(TVR, TVR_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(ICD, ICD_NEEDLE, ADDITION);
linkRelated(BYPASS_COST, BYPASS_NEEDLE, ADDITION);
addRelated(TAVR);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [heart bypass surgery cost in India](https://gaf.healthcare/treatments/heart-bypass-surgery-cost-in-india).",
    ", [heart bypass surgery cost in India](https://gaf.healthcare/treatments/heart-bypass-surgery-cost-in-india) and [tricuspid valve repair in India](https://gaf.healthcare/treatments/tricuspid-valve-repair-in-india).",
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
patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_NEEDLE, `${TVR_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, `${VALVE_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, `${CABG_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, `${PACEMAKER_NEEDLE}${ADDITION}`);
patchMarkdown(resolve("scripts/icd-implantation-treatment-body.md"), ICD_NEEDLE, `${ICD_NEEDLE}${ADDITION}`);
patchMarkdown(
  resolve("scripts/heart-bypass-surgery-cost-treatment-body.md"),
  BYPASS_NEEDLE,
  `${BYPASS_NEEDLE}${ADDITION}`,
);
