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

const body = readFileSync(resolve("scripts/heart-valve-replacement-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "heart-valve-replacement-in-india");
const now = "2026-09-29T19:30:00.000Z";
const SLUG = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const CABG = "cabg-surgery-in-india";
const BAV = "aortic-balloon-valvuloplasty-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const ANGIOPLASTY = "coronary-angioplasty-in-india";
const ADDITION =
  " Heart valve replacement lists sit on [Heart Valve Replacement Surgery in India](/treatments/heart-valve-replacement-in-india).";
const TAVR_NEEDLE =
  "Neighbouring [heart valve replacement](/costs/India/Cardiac-Surgery/Heart-Valve-Replacement) covers broader surgical valve work.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const BAV_NEEDLE = "This page is the named balloon aortic valvuloplasty product.";

const treatment = {
  id: existing?.id ?? "d4f7c1ba-6e54-7829-b67c-0f8c5c9e4a17",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Heart Valve Replacement Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Valve Surgery",
  category: "Heart Valve Replacement",
  image: "/uploads/treatments/heart-valve-hero.webp",
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
    "aortic-valve-replacement",
    "heart-valve-repair",
    "mitral-valve-repair",
    "double-valve-replacement",
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "cabg-coronary-artery-bypass-grafting",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [TAVR, CABG, BAV, PACEMAKER, ICD, ANGIOPLASTY],
  status: "published" as const,
  featured: true,
  sortOrder: 46,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Heart Valve Replacement Surgery in India",
      shortDescription:
        "Heart valve replacement in India is planned from the named product — surgical replacement, repair or TAVR quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "hvr-step-1",
          title: "Share echo",
          description:
            "The patient provides echocardiography, ECG, CT, angiography if available and previous cardiac notes before anyone books travel.",
        },
        {
          id: "hvr-step-2",
          title: "Heart Team review",
          description:
            "A cardiac surgeon and cardiologist review whether the case is repair, surgical replacement or TAVR.",
        },
        {
          id: "hvr-step-3",
          title: "Name the prosthesis",
          description:
            "The team writes mechanical or tissue after anticoagulation, durability and future-procedure talk.",
        },
        {
          id: "hvr-step-4",
          title: "Itemized estimate",
          description:
            "GAF valve-replacement planning is $7,000–$18,000. Neighbouring TAVR is $18,000–$42,000. Neighbouring double-valve work is $12,000–$28,000.",
        },
        {
          id: "hvr-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "hvr-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms echo, bloods, dental status and fitness after arrival.",
        },
        {
          id: "hvr-step-7",
          title: "Deliver the named valve",
          description:
            "Surgical replacement, selected mini surgery or TAVR proceeds only after the valve and prosthesis are named.",
        },
        {
          id: "hvr-step-8",
          title: "Cardiac ICU and ward",
          description:
            "Rhythm, bleeding, walking and INR or antiplatelet plans are watched before discharge.",
        },
        {
          id: "hvr-step-9",
          title: "Lifelong follow-up",
          description:
            "The patient leaves with a valve card, medicine list, INR plan if mechanical and echo dates.",
        },
      ],
      preparation:
        "Share echocardiography, ECG and any angiography so the Heart Team can judge repair versus surgical replacement versus TAVR.",
      recovery:
        "Fatigue and chest discomfort are common for weeks. Full recovery after open or mini surgery often takes around 2–3 months.",
      hospitalStay: "8–16 nights for surgical replacement; neighbouring TAVR typically 3–7 nights",
      recoveryPeriod: "Often 2–3 months after open or minimally invasive surgery. TAVR is usually shorter.",
      followUp:
        "Request a written summary covering the valve type, anticoagulation or INR plan, echo dates and who will follow the patient after returning home.",
      importantConsiderations:
        "There is no universally best valve. TAVR is a different product from surgical replacement. New chest pain or fever after a prosthesis belongs in a local emergency department.",
      treatmentType: "Heart Valve Replacement / Valve Surgery",
      treatmentSetting: "Accredited partner cardiac theatres and cardiac ICUs in India",
      technology:
        "Surgical mechanical and tissue valves, selected minimally invasive approaches, neighbouring TAVR/TAVI",
      searchKeywords: [
        "heart valve replacement surgery in India",
        "heart valve replacement cost in India",
        "aortic valve replacement India",
        "mitral valve replacement India",
        "mechanical heart valve India",
        "TAVR in India",
      ],
      faqs: [
        {
          id: "hvr-faq-1",
          question: "How much does heart valve replacement cost in India?",
          answer:
            "GAF surgical valve-replacement planning is $7,000–$18,000, typically 8–16 nights. Neighbouring TAVR is $18,000–$42,000. Neighbouring double-valve replacement is $12,000–$28,000.",
        },
        {
          id: "hvr-faq-2",
          question: "Can a valve be repaired instead of replaced?",
          answer:
            "Yes, when a durable repair is feasible, particularly for selected mitral disease. Neighbouring mitral valve repair is $7,500–$18,000.",
        },
        {
          id: "hvr-faq-3",
          question: "Which is better, a mechanical or a tissue valve?",
          answer:
            "Neither is universally better. Mechanical valves last longer but usually need lifelong warfarin. Tissue valves can wear and may avoid lifelong anticoagulation solely for the valve.",
        },
        {
          id: "hvr-faq-4",
          question: "Is TAVR the same as surgical valve replacement?",
          answer:
            "No. TAVR is a catheter aortic valve for selected patients. Named TAVR lists sit on the TAVR page. Neighbouring TAVR planning is $18,000–$42,000.",
        },
        {
          id: "hvr-faq-5",
          question: "How long is hospital stay after valve replacement?",
          answer:
            "GAF surgical planning is typically 8–16 nights. Neighbouring TAVR is typically 3–7 nights.",
        },
        {
          id: "hvr-faq-6",
          question: "Can international patients have valve replacement in India?",
          answer:
            "Yes. Echocardiography and medical records should generally be reviewed before travel.",
        },
        {
          id: "hvr-faq-7",
          question: "Which city in India is best for valve replacement?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "hvr-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, sudden breathlessness, fainting, uncontrolled bleeding or unexplained fever after a prosthetic valve belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "hvr-faq-9",
          question: "Do I need blood thinners after valve replacement?",
          answer:
            "Mechanical valves generally need lifelong warfarin and INR checks. Tissue valves may need a shorter course or anticoagulation for another reason such as atrial fibrillation.",
        },
        {
          id: "hvr-faq-10",
          question: "How long does recovery take?",
          answer:
            "Open or minimally invasive surgery commonly takes around 2–3 months for substantial recovery. TAVR is usually shorter.",
        },
        {
          id: "hvr-faq-11",
          question: "Can CABG be done with valve replacement?",
          answer:
            "Yes, in selected patients. Combined sittings are quoted after imaging. Neighbouring CABG is $5,500–$14,000.",
        },
        {
          id: "hvr-faq-12",
          question: "Is there a GAF aortic-stenosis or mitral-regurgitation treatment page?",
          answer:
            "No. Aortic-stenosis, mitral-regurgitation, rheumatic-heart-disease and pulmonary-valve treatment pages are not live. Named tricuspid replacement sits on Tricuspid Valve Replacement Surgery in India.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping heart and valve rings used as the heart valve replacement hero",
      seoTitle: "Heart Valve Replacement Surgery in India: Cost, Types & Recovery",
      metaDescription:
        "Learn about heart valve replacement in India, including mechanical and tissue valves, GAF planning $7,000–$18,000, TAVR $18,000–$42,000 and how to send echo records.",
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

linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(BAV, BAV_NEEDLE, ADDITION);
addRelated(PACEMAKER);
addRelated(ICD);
addRelated(ANGIOPLASTY);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [CABG surgery in India](https://gaf.healthcare/treatments/cabg-surgery-in-india).",
    ", [CABG surgery in India](https://gaf.healthcare/treatments/cabg-surgery-in-india) and [heart valve replacement surgery in India](https://gaf.healthcare/treatments/heart-valve-replacement-in-india).",
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

patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-balloon-valvuloplasty-treatment-body.md"), BAV_NEEDLE, ADDITION);
