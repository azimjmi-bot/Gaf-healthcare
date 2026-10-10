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

const body = readFileSync(resolve("scripts/cabg-surgery-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "cabg-surgery-in-india");
const now = "2026-09-29T19:00:00.000Z";
const SLUG = "cabg-surgery-in-india";
const ANGIOPLASTY = "coronary-angioplasty-in-india";
const TAVR = "tavr-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const BAV = "aortic-balloon-valvuloplasty-in-india";
const ADDITION =
  " CABG lists sit on [CABG Surgery in India](/treatments/cabg-surgery-in-india).";
const ANGIOPLASTY_NEEDLE = "This page is the named PCI and stenting product.";
const TAVR_NEEDLE =
  "Named [CABG](/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)) is a neighbouring surgical product.";

const treatment = {
  id: existing?.id ?? "c3e6b0a9-5d43-6718-a56b-9e7b4b8d3f06",
  slug: SLUG,
  previousSlugs: [],
  baseName: "CABG Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Coronary Surgery",
  category: "CABG",
  image: "/uploads/treatments/cabg-hero.webp",
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
    "cabg-coronary-artery-bypass-grafting",
    "redo-cabg",
    "minimally-invasive-cardiac-surgery",
    "robotic-cardiac-surgery",
    "coronary-angioplasty-stenting",
    "coronary-angiography",
    "heart-valve-replacement",
    "aortic-valve-replacement",
  ],
  relatedTreatmentSlugs: [ANGIOPLASTY, TAVR, PACEMAKER, ICD, BAV],
  status: "published" as const,
  featured: true,
  sortOrder: 45,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "CABG Surgery in India",
      shortDescription:
        "CABG surgery in India is planned from the named bypass product — first-time grafts, redo or mini approaches quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "cabg-step-1",
          title: "Share angiography",
          description:
            "The patient provides coronary angiography images, echo, ECG, blood tests and previous cardiac procedure notes before anyone books travel.",
        },
        {
          id: "cabg-step-2",
          title: "Heart Team review",
          description:
            "A cardiac surgeon and cardiologist review whether the case is CABG, PCI, medicines or a combined valve pathway.",
        },
        {
          id: "cabg-step-3",
          title: "Name the product",
          description:
            "The team writes first-time CABG, redo CABG, mini-cardiac surgery or PCI as separate products.",
        },
        {
          id: "cabg-step-4",
          title: "Itemized estimate",
          description:
            "GAF CABG planning is $5,500–$14,000. Neighbouring redo CABG is $8,500–$20,000. Neighbouring PCI is $3,200–$8,500.",
        },
        {
          id: "cabg-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "cabg-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms angiography, echo, bloods and fitness after arrival.",
        },
        {
          id: "cabg-step-7",
          title: "Deliver the named graft",
          description:
            "On-pump, off-pump or selected mini CABG proceeds only after conduits and targets are named.",
        },
        {
          id: "cabg-step-8",
          title: "Cardiac ICU and ward",
          description:
            "Rhythm, drains, walking and medicines are watched before discharge.",
        },
        {
          id: "cabg-step-9",
          title: "Rehab and follow-up",
          description:
            "The patient leaves with a medication list, wound rules, rehab plan and remote-follow-up dates.",
        },
      ],
      preparation:
        "Share dedicated angiogram images, echocardiogram, ECG and kidney-function reports so the Heart Team can judge CABG versus PCI versus medicines.",
      recovery:
        "Fatigue, chest discomfort and reduced stamina are common for weeks. Substantial recovery is often 6–12 weeks.",
      hospitalStay: "7–14 nights, then nearby recovery; ICU commonly 1–2 days",
      recoveryPeriod: "Often 6–12 weeks, although individual recovery differs.",
      followUp:
        "Request a written summary covering the number of grafts, conduits used, medicines, wound care and who will follow the patient after returning home.",
      importantConsiderations:
        "CABG does not cure coronary artery disease. First-time CABG pricing does not apply to redo CABG. New chest pain belongs in a local emergency department.",
      treatmentType: "CABG / Coronary Surgery",
      treatmentSetting: "Accredited partner cardiac theatres and cardiac ICUs in India",
      technology:
        "On-pump and off-pump CABG, LIMA and arterial grafting, selected minimally invasive and robotic approaches",
      searchKeywords: [
        "CABG surgery in India",
        "coronary artery bypass graft surgery in India",
        "CABG cost in India",
        "heart bypass surgery in India",
        "triple bypass surgery in India",
        "CABG recovery time",
      ],
      faqs: [
        {
          id: "cabg-faq-1",
          question: "How much does CABG cost in India?",
          answer:
            "GAF CABG planning is $5,500–$14,000, typically 7–14 nights, then nearby recovery. Neighbouring redo CABG is $8,500–$20,000.",
        },
        {
          id: "cabg-faq-2",
          question: "Does CABG cure heart disease?",
          answer:
            "No. It improves blood flow around blockages but does not remove the underlying tendency to develop coronary artery disease.",
        },
        {
          id: "cabg-faq-3",
          question: "Is CABG better than angioplasty?",
          answer:
            "Neither is universally better. The Heart Team decides from coronary anatomy, disease complexity, heart function, diabetes and surgical risk.",
        },
        {
          id: "cabg-faq-4",
          question: "How long does CABG take?",
          answer:
            "Commonly around 3–6 hours, depending on the number and complexity of grafts.",
        },
        {
          id: "cabg-faq-5",
          question: "How long is hospital stay after CABG?",
          answer:
            "GAF planning is typically 7–14 nights, then nearby recovery. ICU is commonly 1–2 days.",
        },
        {
          id: "cabg-faq-6",
          question: "Can international patients have CABG in India?",
          answer:
            "Yes. Angiography images and medical records should generally be reviewed before travel.",
        },
        {
          id: "cabg-faq-7",
          question: "Which city in India is best for CABG?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "cabg-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, sudden breathlessness, fainting or sudden weakness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "cabg-faq-9",
          question: "Is redo CABG the same price as first-time CABG?",
          answer:
            "No. Neighbouring redo CABG is $8,500–$20,000 because adhesions and conduit scarcity change the product.",
        },
        {
          id: "cabg-faq-10",
          question: "Does the number of grafts decide how serious the case is?",
          answer:
            "No. Single, double, triple or quadruple bypass names the number of grafts, not the whole surgical risk.",
        },
        {
          id: "cabg-faq-11",
          question: "Can CABG be done without a heart-lung machine?",
          answer:
            "Yes. Off-pump CABG is performed on a beating heart in selected patients.",
        },
        {
          id: "cabg-faq-12",
          question: "Is there a GAF heart-attack or cardiac-rehab treatment page?",
          answer:
            "No. Heart-attack, cardiac-rehabilitation, angiography-treatment and city-CABG-cost pages are not live. Use this pillar page and the named modality sheets.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping heart and vessel forms used as the CABG surgery hero",
      seoTitle: "CABG Surgery in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about CABG surgery in India, including on-pump and off-pump bypass, GAF planning $5,500–$14,000, donor-graft choice, recovery and how to send angiography.",
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

linkRelated(ANGIOPLASTY, ANGIOPLASTY_NEEDLE, ADDITION);
linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
addRelated(PACEMAKER);
addRelated(ICD);
addRelated(BAV);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Fanconi anemia treatment in India](https://gaf.healthcare/treatments/fanconi-anemia-treatment-in-india).",
    ", [Fanconi anemia treatment in India](https://gaf.healthcare/treatments/fanconi-anemia-treatment-in-india) and [CABG surgery in India](https://gaf.healthcare/treatments/cabg-surgery-in-india).",
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

patchMarkdown(resolve("scripts/coronary-angioplasty-treatment-body.md"), ANGIOPLASTY_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, ADDITION);
