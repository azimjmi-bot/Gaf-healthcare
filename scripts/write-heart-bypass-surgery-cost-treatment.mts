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

const body = readFileSync(resolve("scripts/heart-bypass-surgery-cost-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "heart-bypass-surgery-cost-in-india");
const now = "2026-09-29T22:00:00.000Z";
const SLUG = "heart-bypass-surgery-cost-in-india";
const CABG = "cabg-surgery-in-india";
const ANGIOPLASTY = "coronary-angioplasty-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const LVAD = "lvad-implantation-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const ADDITION =
  " Itemized bypass-cost lists sit on [Heart Bypass Surgery Cost in India](/treatments/heart-bypass-surgery-cost-in-india).";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const ANGIOPLASTY_NEEDLE = "This page is the named PCI and stenting product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const LVAD_NEEDLE = "This page is the named LVAD-implantation product.";

const treatment = {
  id: existing?.id ?? "d4e7c1b2-8a20-5e41-af7d-3b6c9e2f1a58",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Heart Bypass Surgery Cost in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Coronary Surgery",
  category: "CABG",
  image: "/uploads/treatments/cabg-cost-hero.webp",
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
  ],
  relatedTreatmentSlugs: [CABG, ANGIOPLASTY, VALVE, TAVR, LVAD, PACEMAKER, ICD],
  status: "published" as const,
  featured: true,
  sortOrder: 51,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Heart Bypass Surgery Cost in India",
      shortDescription:
        "Heart bypass surgery cost in India is planned from the named first-time CABG product. GAF planning is $5,500–$14,000 with 7–14 nights, then nearby recovery.",
      editorialBody: body,
      process: [
        {
          id: "cabg-cost-step-1",
          title: "Share angiography",
          description:
            "The patient provides coronary angiography images, echo, ECG, blood tests and previous cardiac procedure notes before anyone books travel.",
        },
        {
          id: "cabg-cost-step-2",
          title: "Heart Team review",
          description:
            "A cardiac surgeon and cardiologist review whether the case is CABG, PCI, medicines or a combined valve pathway.",
        },
        {
          id: "cabg-cost-step-3",
          title: "Name the product",
          description:
            "The team writes first-time CABG, redo CABG, mini-cardiac surgery or PCI as separate products.",
        },
        {
          id: "cabg-cost-step-4",
          title: "Itemized estimate",
          description:
            "GAF CABG planning is $5,500–$14,000. Neighbouring redo CABG is $8,500–$20,000. Neighbouring PCI is $3,200–$8,500.",
        },
        {
          id: "cabg-cost-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. New chest pain or sudden breathlessness is a local emergency.",
        },
        {
          id: "cabg-cost-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms angiography, echo, bloods and fitness after arrival.",
        },
        {
          id: "cabg-cost-step-7",
          title: "Deliver the named graft",
          description:
            "On-pump, off-pump or selected mini CABG proceeds only after conduits and targets are named.",
        },
        {
          id: "cabg-cost-step-8",
          title: "Cardiac ICU and ward",
          description: "Rhythm, drains, walking and medicines are watched before discharge.",
        },
        {
          id: "cabg-cost-step-9",
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
      recoveryPeriod: "Often 6 weeks to 2–3 months, although individual recovery differs.",
      followUp:
        "Request a written summary covering the number of grafts, conduits used, medicines, wound care and who will follow the patient after returning home.",
      importantConsiderations:
        "CABG does not cure coronary artery disease. First-time CABG pricing does not apply to redo CABG. New chest pain belongs in a local emergency department.",
      treatmentType: "CABG / Heart Bypass Cost Planning",
      treatmentSetting: "Accredited partner cardiac theatres and cardiac ICUs in India",
      technology:
        "On-pump and off-pump CABG, LIMA and arterial grafting, selected minimally invasive and robotic approaches",
      searchKeywords: [
        "heart bypass surgery cost in India",
        "CABG cost in India",
        "coronary artery bypass graft cost India",
        "triple bypass surgery cost in India",
        "heart bypass surgery in India",
        "CABG package inclusions India",
      ],
      faqs: [
        {
          id: "cabg-cost-faq-1",
          question: "What is the average cost of heart bypass surgery in India?",
          answer:
            "GAF first-time CABG planning is $5,500–$14,000, typically 7–14 nights, then nearby recovery. US comparison is $70,000–$200,000.",
        },
        {
          id: "cabg-cost-faq-2",
          question: "Is $5,500 enough for bypass surgery in India?",
          answer:
            "It may cover some first-time cases at the lower end of the sheet, but it should not be assumed for every hospital or complex case.",
        },
        {
          id: "cabg-cost-faq-3",
          question: "What is the cost of triple bypass surgery in India?",
          answer:
            "There is no fixed national triple-bypass price. The live first-time CABG sheet remains $5,500–$14,000 unless the case is redo, mini or combined valve work.",
        },
        {
          id: "cabg-cost-faq-4",
          question: "Is CABG cheaper than bypass surgery?",
          answer:
            "They are the same procedure. CABG is the medical name for heart bypass surgery.",
        },
        {
          id: "cabg-cost-faq-5",
          question: "How long does bypass surgery take?",
          answer: "Commonly around 3–6 hours, depending on the number and complexity of grafts.",
        },
        {
          id: "cabg-cost-faq-6",
          question: "How long is hospital stay after CABG?",
          answer:
            "Many patients stay about 5–8 days. GAF planning is typically 7–14 nights, then nearby recovery.",
        },
        {
          id: "cabg-cost-faq-7",
          question: "Can international patients have CABG in India?",
          answer:
            "Yes. Angiography images and medical records should generally be reviewed before travel.",
        },
        {
          id: "cabg-cost-faq-8",
          question: "Which city in India is best for CABG?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "cabg-cost-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, sudden breathlessness, fainting or sudden weakness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "cabg-cost-faq-10",
          question: "Is redo CABG the same price as first-time CABG?",
          answer:
            "No. Neighbouring redo CABG is $8,500–$20,000 because adhesions and conduit scarcity change the product.",
        },
        {
          id: "cabg-cost-faq-11",
          question: "Does the number of grafts decide the whole bill?",
          answer:
            "No. Single, double, triple or quadruple bypass names the number of grafts, not the whole surgical risk or package.",
        },
        {
          id: "cabg-cost-faq-12",
          question: "Is there a GAF heart-attack or city-CABG-cost treatment page?",
          answer:
            "No. Heart-attack, cardiac-rehabilitation, angiography-treatment and city-CABG-cost pages are not live. Use this page, the CABG procedure page and the named modality sheets.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping heart and vessel forms used as the heart bypass surgery cost hero",
      seoTitle: "Heart Bypass Surgery Cost in India: Planning Range & Recovery",
      metaDescription:
        "Learn about heart bypass surgery cost in India, including GAF planning $5,500–$14,000, graft count, inclusions, recovery and how to send angiography.",
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

linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(ANGIOPLASTY, ANGIOPLASTY_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(LVAD, LVAD_NEEDLE, ADDITION);
addRelated(TAVR);
addRelated(PACEMAKER);
addRelated(ICD);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [LVAD implantation in India](https://gaf.healthcare/treatments/lvad-implantation-in-india).",
    ", [LVAD implantation in India](https://gaf.healthcare/treatments/lvad-implantation-in-india) and [heart bypass surgery cost in India](https://gaf.healthcare/treatments/heart-bypass-surgery-cost-in-india).",
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

patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coronary-angioplasty-treatment-body.md"), ANGIOPLASTY_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/lvad-implantation-treatment-body.md"), LVAD_NEEDLE, ADDITION);
