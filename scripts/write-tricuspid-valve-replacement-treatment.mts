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

const body = readFileSync(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: {
      en?: {
        editorialBody?: string;
        faqs?: Array<{ id: string; question: string; answer: string }>;
      };
    };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "tricuspid-valve-replacement-in-india");
const now = "2026-09-29T20:00:00.000Z";
const SLUG = "tricuspid-valve-replacement-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const CABG = "cabg-surgery-in-india";
const BAV = "aortic-balloon-valvuloplasty-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const ANGIOPLASTY = "coronary-angioplasty-in-india";
const ADDITION =
  " Tricuspid replacement lists sit on [Tricuspid Valve Replacement Surgery in India](/treatments/tricuspid-valve-replacement-in-india).";
const VALVE_NEEDLE =
  "There is no live GAF tricuspid-only treatment page. Use this pillar page plus the named valve-repair or replacement sheet.";
const CLUSTER_NEEDLE =
  "Heart valve replacement lists sit on [Heart Valve Replacement Surgery in India](/treatments/heart-valve-replacement-in-india).";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const ICD_NEEDLE = "This page is the named ICD product.";

const treatment = {
  id: existing?.id ?? "e8c1d4af-7b63-8930-c97d-3a1f8d2b5e40",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Tricuspid Valve Replacement Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Valve Surgery",
  category: "Heart Valve Replacement",
  image: "/uploads/treatments/tricuspid-valve-hero.webp",
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
    "heart-valve-repair",
    "mitral-valve-repair",
    "aortic-valve-replacement",
    "double-valve-replacement",
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "robotic-cardiac-surgery",
    "cabg-coronary-artery-bypass-grafting",
    "congenital-heart-surgery",
    "pacemaker-implantation",
    "icd-implantation-implantable-cardioverter-defibrillator",
  ],
  relatedTreatmentSlugs: [VALVE, TAVR, CABG, BAV, PACEMAKER, ICD, ANGIOPLASTY],
  status: "published" as const,
  featured: true,
  sortOrder: 47,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Tricuspid Valve Replacement Surgery in India",
      shortDescription:
        "Tricuspid valve replacement in India is named when the valve cannot be repaired. Neighbouring GAF valve replacement is $7,000–$18,000.",
      editorialBody: body,
      process: [
        {
          id: "tvr-step-1",
          title: "Share echo",
          description:
            "The patient provides echocardiography, ECG, CT if available and previous cardiac notes before anyone books travel.",
        },
        {
          id: "tvr-step-2",
          title: "Heart Team review",
          description:
            "A cardiac surgeon and cardiologist review whether the case is repair, surgical replacement or transcatheter treatment.",
        },
        {
          id: "tvr-step-3",
          title: "Name the prosthesis",
          description:
            "The team writes mechanical or tissue after anticoagulation, durability and future-procedure talk.",
        },
        {
          id: "tvr-step-4",
          title: "Itemized estimate",
          description:
            "There is no live GAF tricuspid-only sheet. Neighbouring valve-replacement planning is $7,000–$18,000. Neighbouring double-valve work is $12,000–$28,000.",
        },
        {
          id: "tvr-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "tvr-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms echo, bloods, right-ventricular function and fitness after arrival.",
        },
        {
          id: "tvr-step-7",
          title: "Deliver the named valve",
          description:
            "Surgical replacement, selected mini surgery or transcatheter treatment proceeds only after the product is named.",
        },
        {
          id: "tvr-step-8",
          title: "Cardiac ICU and ward",
          description:
            "Rhythm, fluid balance, bleeding and INR or antiplatelet plans are watched before discharge.",
        },
        {
          id: "tvr-step-9",
          title: "Lifelong follow-up",
          description:
            "The patient leaves with a valve card, medicine list, INR plan if mechanical and echo dates.",
        },
      ],
      preparation:
        "Share echocardiography, ECG and any CT so the Heart Team can judge repair versus surgical replacement versus transcatheter treatment.",
      recovery:
        "Fatigue and chest discomfort are common for weeks. Isolated stays are often 4–7 days; neighbouring GAF valve-replacement planning is 8–16 nights.",
      hospitalStay: "Often 4–7 days after isolated surgery; neighbouring GAF valve replacement typically 8–16 nights",
      recoveryPeriod: "Commonly several weeks, longer after combined or redo cardiac surgery.",
      followUp:
        "Request a written summary covering the valve type, anticoagulation or INR plan, echo dates and who will follow the patient after returning home.",
      importantConsiderations:
        "Repair is preferred when a durable result is possible. There is no live GAF tricuspid-only sheet. New chest pain or fever after a prosthesis belongs in a local emergency department.",
      treatmentType: "Tricuspid Valve Replacement / Valve Surgery",
      treatmentSetting: "Accredited partner cardiac theatres and cardiac ICUs in India",
      technology:
        "Surgical mechanical and tissue tricuspid valves, selected minimally invasive approaches, selected transcatheter tricuspid therapies",
      searchKeywords: [
        "tricuspid valve replacement surgery in India",
        "tricuspid valve replacement cost in India",
        "tricuspid valve surgery in India",
        "tricuspid regurgitation surgery",
        "mechanical tricuspid valve replacement",
        "transcatheter tricuspid valve replacement India",
      ],
      faqs: [
        {
          id: "tvr-faq-1",
          question: "What is tricuspid valve replacement surgery?",
          answer:
            "It is an operation that replaces a severely diseased tricuspid valve with a mechanical or biological prosthesis when a durable repair is not honest.",
        },
        {
          id: "tvr-faq-2",
          question: "When is tricuspid valve replacement required?",
          answer:
            "When the valve is severely damaged, cannot be repaired reliably, or replacement is otherwise the Heart Team product after echo and risk review.",
        },
        {
          id: "tvr-faq-3",
          question: "How much does tricuspid valve replacement cost in India?",
          answer:
            "There is no live GAF tricuspid-only sheet. Neighbouring heart valve replacement is $7,000–$18,000, typically 8–16 nights. Neighbouring double-valve replacement is $12,000–$28,000.",
        },
        {
          id: "tvr-faq-4",
          question: "Is tricuspid valve repair better than replacement?",
          answer:
            "When a durable repair is technically feasible, repair is generally preferred. Neighbouring heart valve repair is $6,500–$16,500.",
        },
        {
          id: "tvr-faq-5",
          question: "What is the difference between mechanical and tissue tricuspid valves?",
          answer:
            "Mechanical valves last longer but generally need lifelong anticoagulation. Tissue valves can wear and may avoid lifelong anticoagulation solely for the valve.",
        },
        {
          id: "tvr-faq-6",
          question: "How long does tricuspid valve replacement surgery take?",
          answer:
            "Open replacement is major cardiac surgery under general anesthesia with cardiopulmonary bypass. Exact theatre time depends on combined procedures and redo status.",
        },
        {
          id: "tvr-faq-7",
          question: "How long is hospitalization after tricuspid valve replacement?",
          answer:
            "Many isolated patients stay about 4–7 days. Neighbouring GAF heart-valve replacement planning is typically 8–16 nights.",
        },
        {
          id: "tvr-faq-8",
          question: "Can tricuspid valve replacement be performed without open-heart surgery?",
          answer:
            "Selected high-risk patients may be evaluated for transcatheter tricuspid replacement or repair. There is no live GAF transcatheter-tricuspid sheet.",
        },
        {
          id: "tvr-faq-9",
          question: "What are the risks of tricuspid valve replacement?",
          answer:
            "Bleeding, infection, clots, rhythm problems, right-heart failure, pacemaker need, prosthetic dysfunction and death. Individual risk is calculated by the Heart Team.",
        },
        {
          id: "tvr-faq-10",
          question: "How long does recovery take after tricuspid valve replacement?",
          answer:
            "Commonly several weeks. Combined valve or CABG sittings take longer. Transcatheter recovery is usually shorter when that product is named.",
        },
        {
          id: "tvr-faq-11",
          question: "Do mechanical tricuspid valves require lifelong blood thinners?",
          answer:
            "Yes. Mechanical prostheses generally need long-term anticoagulation and INR checks. Tissue valves do not always need lifelong anticoagulation solely for the valve.",
        },
        {
          id: "tvr-faq-12",
          question: "Can international patients undergo tricuspid valve replacement in India?",
          answer:
            "Yes. Echocardiography and medical records should generally be reviewed before travel.",
        },
      ],
      imageAlt:
        "Educational illustration of a right-heart silhouette used as the tricuspid valve replacement hero",
      seoTitle: "Tricuspid Valve Replacement Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about tricuspid valve replacement in India, including indications, valve types, neighbouring GAF planning $7,000–$18,000, transcatheter options and how to send echo records.",
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

function addRelated(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
}

linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(TAVR, CLUSTER_NEEDLE, ADDITION);
linkRelated(CABG, CLUSTER_NEEDLE, ADDITION);
linkRelated(BAV, CLUSTER_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(ICD, ICD_NEEDLE, ADDITION);
addRelated(ANGIOPLASTY);

const valve = store.treatments.find((row) => row.slug === VALVE);
if (valve?.translations?.en?.editorialBody) {
  valve.translations.en.editorialBody = valve.translations.en.editorialBody.replace(
    "rheumatic-heart-disease, tricuspid-valve-surgery, pulmonary-valve-replacement",
    "rheumatic-heart-disease, pulmonary-valve-replacement",
  );
}
const valveFaq = valve?.translations?.en?.faqs?.find((item) => item.id === "hvr-faq-12");
if (valveFaq) {
  valveFaq.answer =
    "No. Aortic-stenosis, mitral-regurgitation, rheumatic-heart-disease and pulmonary-valve treatment pages are not live. Named tricuspid replacement sits on Tricuspid Valve Replacement Surgery in India.";
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [heart valve replacement surgery in India](https://gaf.healthcare/treatments/heart-valve-replacement-in-india).",
    ", [heart valve replacement surgery in India](https://gaf.healthcare/treatments/heart-valve-replacement-in-india) and [tricuspid valve replacement surgery in India](https://gaf.healthcare/treatments/tricuspid-valve-replacement-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  if (text.includes(needle) && !text.includes(`/treatments/${SLUG}`)) {
    writeFileSync(path, text.replace(needle, `${needle}${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tavr-treatment-body.md"), CLUSTER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CLUSTER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-balloon-valvuloplasty-treatment-body.md"), CLUSTER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/icd-implantation-treatment-body.md"), ICD_NEEDLE, ADDITION);

const valveMdPath = resolve("scripts/heart-valve-replacement-treatment-body.md");
let valveMd = readFileSync(valveMdPath, "utf8");
valveMd = valveMd.replace(
  "rheumatic-heart-disease, tricuspid-valve-surgery, pulmonary-valve-replacement",
  "rheumatic-heart-disease, pulmonary-valve-replacement",
);
valveMd = valveMd.replace(
  "No. Aortic-stenosis, mitral-regurgitation, rheumatic-heart-disease, tricuspid and pulmonary-valve treatment pages are not live. Use this pillar page and the named modality sheets.",
  "No. Aortic-stenosis, mitral-regurgitation, rheumatic-heart-disease and pulmonary-valve treatment pages are not live. Named tricuspid replacement sits on Tricuspid Valve Replacement Surgery in India.",
);
writeFileSync(valveMdPath, valveMd);
