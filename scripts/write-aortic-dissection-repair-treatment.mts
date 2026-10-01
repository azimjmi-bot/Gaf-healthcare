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

const body = readFileSync(resolve("scripts/aortic-dissection-repair-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "aortic-dissection-repair-in-india");
const now = "2026-09-29T20:30:00.000Z";
const SLUG = "aortic-dissection-repair-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const CABG = "cabg-surgery-in-india";
const BAV = "aortic-balloon-valvuloplasty-in-india";
const TVR = "tricuspid-valve-replacement-in-india";
const ANGIOPLASTY = "coronary-angioplasty-in-india";
const ADDITION =
  " Aortic dissection lists sit on [Aortic Dissection Repair Surgery in India](/treatments/aortic-dissection-repair-in-india).";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const TAVR_NEEDLE = "This page is the named TAVR/TAVI product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const BAV_NEEDLE = "This page is the named balloon aortic valvuloplasty product.";
const TVR_NEEDLE = "This page is the named tricuspid-replacement product.";

const treatment = {
  id: existing?.id ?? "f9d2e5b0-8c74-9a41-d08e-4b2f9e3c6a51",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Aortic Dissection Repair Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Aortic Surgery",
  category: "Aortic Aneurysm Surgery",
  image: "/uploads/treatments/aortic-dissection-hero.webp",
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
    "aortic-aneurysm-surgery",
    "aortic-root-replacement",
    "aortic-valve-replacement",
    "heart-valve-replacement",
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "cabg-coronary-artery-bypass-grafting",
    "minimally-invasive-cardiac-surgery",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VALVE, TAVR, CABG, BAV, TVR, ANGIOPLASTY],
  status: "published" as const,
  featured: true,
  sortOrder: 48,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Aortic Dissection Repair Surgery in India",
      shortDescription:
        "Aortic dissection repair in India is named after CTA. Neighbouring aneurysm surgery is $9,000–$22,000. Acute Type A is a local emergency.",
      editorialBody: body,
      process: [
        {
          id: "adr-step-1",
          title: "Share CTA",
          description:
            "The patient provides CT angiography images, echo and previous aortic notes before anyone books travel.",
        },
        {
          id: "adr-step-2",
          title: "Aortic team review",
          description:
            "A cardiothoracic or aortic surgeon reviews whether the case is emergency Type A, medical Type B, TEVAR or hybrid work.",
        },
        {
          id: "adr-step-3",
          title: "Name the product",
          description:
            "The team writes open graft, TEVAR, root/Bentall or medical control after anatomy and malperfusion review.",
        },
        {
          id: "adr-step-4",
          title: "Itemized estimate",
          description:
            "There is no live GAF dissection-only sheet. Neighbouring aneurysm surgery is $9,000–$22,000. Neighbouring root replacement is $10,000–$24,000.",
        },
        {
          id: "adr-step-5",
          title: "Travel only if stable",
          description:
            "Acute chest or back pain is a local emergency. Stable second-opinion or staged cases travel after records review.",
        },
        {
          id: "adr-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms CTA, bloods, kidney function and fitness after arrival.",
        },
        {
          id: "adr-step-7",
          title: "Deliver the named repair",
          description:
            "Open repair, TEVAR or medical control proceeds only after the product is named.",
        },
        {
          id: "adr-step-8",
          title: "Cardiac ICU and ward",
          description:
            "Brain, kidney, limb perfusion, bleeding and blood pressure are watched before discharge.",
        },
        {
          id: "adr-step-9",
          title: "Lifelong surveillance",
          description:
            "The patient leaves with a blood-pressure plan, imaging dates and a written summary of residual aorta.",
        },
      ],
      preparation:
        "Share CT angiography images, not only the written report, so the aortic team can judge Type A versus Type B, TEVAR versus open repair.",
      recovery:
        "Fatigue is common for weeks after open repair. Neighbouring aneurysm-surgery planning is 8–16 nights. Emergency Type A stays can be longer.",
      hospitalStay: "Neighbouring aneurysm surgery typically 8–16 nights; root replacement typically 10–18 nights",
      recoveryPeriod: "Several weeks to months after major open aortic surgery. TEVAR is usually shorter when that product is named.",
      followUp:
        "Request a written summary covering the graft or stent-graft, blood-pressure plan, imaging dates and who will follow residual aorta after returning home.",
      importantConsiderations:
        "Acute Type A is a local emergency. There is no live GAF dissection-only sheet. TAVR is not TEVAR. New chest or back pain belongs in a local emergency department.",
      treatmentType: "Aortic Dissection Repair / Aortic Surgery",
      treatmentSetting: "Accredited partner cardiac theatres and cardiac ICUs in India",
      technology:
        "Open aortic grafts, selected TEVAR stent-grafts, hybrid and frozen elephant trunk techniques, neighbouring root and valve reconstruction",
      searchKeywords: [
        "aortic dissection repair surgery in India",
        "aortic dissection surgery cost in India",
        "Type A aortic dissection surgery",
        "Type B aortic dissection treatment",
        "TEVAR for aortic dissection in India",
        "aortic root replacement surgery India",
      ],
      faqs: [
        {
          id: "adr-faq-1",
          question: "What is aortic dissection?",
          answer:
            "A tear in the inner layer of the aorta that allows blood to separate the layers of the arterial wall.",
        },
        {
          id: "adr-faq-2",
          question: "Is aortic dissection surgery an emergency?",
          answer:
            "Acute Type A aortic dissection is generally a surgical emergency. Sudden chest or back pain belongs in a local emergency department.",
        },
        {
          id: "adr-faq-3",
          question: "How much does aortic dissection repair cost in India?",
          answer:
            "There is no live GAF aortic-dissection-only sheet. Neighbouring aortic aneurysm surgery is $9,000–$22,000. Neighbouring aortic root replacement is $10,000–$24,000.",
        },
        {
          id: "adr-faq-4",
          question: "How is Type B treated?",
          answer:
            "Uncomplicated Type B may initially be managed medically. Complicated disease may require TEVAR or surgery. There is no live GAF TEVAR sheet.",
        },
        {
          id: "adr-faq-5",
          question: "What is TEVAR?",
          answer:
            "Thoracic Endovascular Aortic Repair places a stent-graft through an artery, usually from the groin. It is not TAVR, which is a catheter aortic valve.",
        },
        {
          id: "adr-faq-6",
          question: "How long is hospitalization after aortic dissection repair?",
          answer:
            "Neighbouring aneurysm-surgery planning is typically 8–16 nights. Neighbouring root replacement is typically 10–18 nights. Emergency Type A stays can be longer.",
        },
        {
          id: "adr-faq-7",
          question: "Can international patients come to India for aortic dissection treatment?",
          answer:
            "Yes, after the treating team confirms the patient is stable enough to travel. Acute unstable Type A should not travel for a cheaper package.",
        },
        {
          id: "adr-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden severe chest or upper-back pain, fainting, severe breathlessness, new neurological symptoms or sudden limb weakness belongs in a local emergency department.",
        },
        {
          id: "adr-faq-9",
          question: "Is TAVR the same as TEVAR?",
          answer:
            "No. TAVR replaces an aortic valve through a catheter. TEVAR places a stent-graft in the thoracic aorta.",
        },
        {
          id: "adr-faq-10",
          question: "Can aortic dissection happen again after surgery?",
          answer:
            "Yes. Repairing one segment does not necessarily eliminate disease in the remaining aorta. Lifelong imaging surveillance is important.",
        },
        {
          id: "adr-faq-11",
          question: "Which city in India is best for aortic dissection surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "adr-faq-12",
          question: "Is there a GAF TEVAR or Bentall treatment page?",
          answer:
            "No. TEVAR-only, Bentall-only, aortic-root-only and aortic-aneurysm-repair treatment pages are not live. Use this page and the named modality sheets.",
        },
      ],
      imageAlt:
        "Educational illustration of an aortic arch silhouette used as the aortic dissection repair hero",
      seoTitle: "Aortic Dissection Repair Surgery in India: Cost, Treatment & Recovery",
      metaDescription:
        "Learn about aortic dissection repair in India, including Type A and Type B treatment, TEVAR, neighbouring GAF planning $9,000–$22,000 and when travel is unsafe.",
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
linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(BAV, BAV_NEEDLE, ADDITION);
linkRelated(TVR, TVR_NEEDLE, ADDITION);
addRelated(ANGIOPLASTY);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [tricuspid valve replacement surgery in India](https://gaf.healthcare/treatments/tricuspid-valve-replacement-in-india).",
    ", [tricuspid valve replacement surgery in India](https://gaf.healthcare/treatments/tricuspid-valve-replacement-in-india) and [aortic dissection repair surgery in India](https://gaf.healthcare/treatments/aortic-dissection-repair-in-india).",
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
patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-balloon-valvuloplasty-treatment-body.md"), BAV_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_NEEDLE, ADDITION);
