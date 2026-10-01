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

const body = readFileSync(resolve("scripts/vsd-surgery-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "ventricular-septal-defect-surgery-in-india");
const now = "2026-09-29T21:00:00.000Z";
const SLUG = "ventricular-septal-defect-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const TAVR = "tavr-in-india";
const CABG = "cabg-surgery-in-india";
const ADR = "aortic-dissection-repair-in-india";
const TVR = "tricuspid-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ADDITION =
  " VSD lists sit on [Ventricular Septal Defect (VSD) Surgery in India](/treatments/ventricular-septal-defect-surgery-in-india).";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const TAVR_NEEDLE = "This page is the named TAVR/TAVI product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const ADR_NEEDLE = "This page is the named aortic-dissection-repair product.";
const TVR_NEEDLE = "This page is the named tricuspid-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";

const treatment = {
  id: existing?.id ?? "a1b7c3e8-9d52-8b14-c06f-5e8a2d4f7b90",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Ventricular Septal Defect (VSD) Surgery in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "Congenital Heart Surgery",
  image: "/uploads/treatments/vsd-surgery-hero.webp",
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
    "congenital-heart-surgery",
    "heart-valve-replacement",
    "aortic-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VALVE, TAVR, CABG, ADR, TVR, PACEMAKER],
  status: "published" as const,
  featured: true,
  sortOrder: 49,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Ventricular Septal Defect (VSD) Surgery in India",
      shortDescription:
        "VSD surgery in India closes a hole between the ventricles when observation is not honest. Neighbouring congenital heart surgery is $8,000–$28,000.",
      editorialBody: body,
      process: [
        {
          id: "vsd-step-1",
          title: "Share echo",
          description:
            "The family provides echocardiography images, ECG and growth notes before anyone books travel.",
        },
        {
          id: "vsd-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether the case is observation, patch closure or a device.",
        },
        {
          id: "vsd-step-3",
          title: "Name the product",
          description:
            "The team writes watch, surgical patch or catheter device after size, location and pulmonary pressure review.",
        },
        {
          id: "vsd-step-4",
          title: "Itemized estimate",
          description:
            "There is no live GAF VSD-only sheet. Neighbouring congenital heart surgery is $8,000–$28,000. Device work is hospital-priced.",
        },
        {
          id: "vsd-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Severe breathing difficulty or poor feeding is a local emergency.",
        },
        {
          id: "vsd-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms echo, bloods, weight and fitness after arrival.",
        },
        {
          id: "vsd-step-7",
          title: "Deliver the named closure",
          description:
            "Patch closure or device closure proceeds only after the product is named.",
        },
        {
          id: "vsd-step-8",
          title: "Cardiac ICU and ward",
          description:
            "Rhythm, feeding, oxygen and residual shunt are watched before discharge.",
        },
        {
          id: "vsd-step-9",
          title: "Congenital follow-up",
          description:
            "The family leaves with echo dates, activity advice and who will follow residual anatomy after returning home.",
        },
      ],
      preparation:
        "Share echocardiography images, not only the written report, so the congenital team can judge observation versus patch versus device.",
      recovery:
        "Feeding and energy often recover gradually. Neighbouring congenital-heart planning is 7–21 nights, with parent stay expected.",
      hospitalStay: "Neighbouring congenital heart surgery typically 7–21 nights; parent stay expected",
      recoveryPeriod: "Varies with age and complexity. Isolated VSD closure is usually shorter than combined congenital work.",
      followUp:
        "Request a written summary covering residual shunt, rhythm, activity advice and who will follow the child after returning home.",
      importantConsiderations:
        "Not every VSD needs surgery. There is no live GAF VSD-only sheet. Severe breathing difficulty or poor feeding belongs in a local emergency department.",
      treatmentType: "VSD Closure / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric and congenital cardiac theatres and ICUs in India",
      technology:
        "Surgical patch closure on cardiopulmonary bypass, selected transcatheter VSD devices, neighbouring valve and pacing products",
      searchKeywords: [
        "VSD surgery in India",
        "ventricular septal defect surgery in India",
        "VSD closure surgery in India",
        "pediatric VSD surgery in India",
        "VSD device closure in India",
        "congenital heart defect surgery in India",
      ],
      faqs: [
        {
          id: "vsd-faq-1",
          question: "What is VSD?",
          answer:
            "A hole between the heart's two lower chambers, the ventricles.",
        },
        {
          id: "vsd-faq-2",
          question: "Is every VSD treated with surgery?",
          answer:
            "No. Many small VSDs close on their own and only require monitoring.",
        },
        {
          id: "vsd-faq-3",
          question: "How much does VSD surgery cost in India?",
          answer:
            "There is no live GAF VSD-only sheet. Neighbouring congenital heart surgery is $8,000–$28,000, typically 7–21 nights. Device closure is hospital-priced.",
        },
        {
          id: "vsd-faq-4",
          question: "Can VSD be closed without open-heart surgery?",
          answer:
            "Some anatomically suitable VSDs can be closed through a catheter. Suitability depends on location and anatomy.",
        },
        {
          id: "vsd-faq-5",
          question: "How long is hospital stay after VSD surgery?",
          answer:
            "Neighbouring congenital-heart planning is typically 7–21 nights, with parent stay expected.",
        },
        {
          id: "vsd-faq-6",
          question: "Can a VSD close naturally?",
          answer:
            "Yes. Many small VSDs, particularly some muscular defects, may close spontaneously during childhood.",
        },
        {
          id: "vsd-faq-7",
          question: "Can international patients undergo VSD surgery in India?",
          answer:
            "Yes. Echocardiography and medical records should generally be reviewed before travel.",
        },
        {
          id: "vsd-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Severe breathing difficulty, bluish discoloration, poor feeding, extreme lethargy or fainting belongs in a local emergency department.",
        },
        {
          id: "vsd-faq-9",
          question: "Can adults undergo VSD closure?",
          answer:
            "Yes, when the physiological and anatomical criteria are appropriate. Severe irreversible pulmonary vascular disease can make closure inappropriate.",
        },
        {
          id: "vsd-faq-10",
          question: "Which city in India is best for VSD surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "vsd-faq-11",
          question: "Is there a GAF ASD or Tetralogy of Fallot treatment page?",
          answer:
            "No. ASD-closure, PDA-closure and Tetralogy-of-Fallot treatment pages are not live. Use this page and the named congenital-heart-surgery sheet.",
        },
        {
          id: "vsd-faq-12",
          question: "Will my child need a pacemaker after VSD surgery?",
          answer:
            "Complete heart block is a recognized complication. Neighbouring pacemaker implantation is $3,500–$9,000 if pacing is named.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping ventricular chambers used as the VSD surgery hero",
      seoTitle: "Ventricular Septal Defect (VSD) Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about VSD surgery in India, including types, symptoms, patch versus device closure, neighbouring GAF planning $8,000–$28,000 and how to send echo records.",
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

linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(ADR, ADR_NEEDLE, ADDITION);
linkRelated(TVR, TVR_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [aortic dissection repair surgery in India](https://gaf.healthcare/treatments/aortic-dissection-repair-in-india).",
    ", [aortic dissection repair surgery in India](https://gaf.healthcare/treatments/aortic-dissection-repair-in-india) and [ventricular septal defect (VSD) surgery in India](https://gaf.healthcare/treatments/ventricular-septal-defect-surgery-in-india).",
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
patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tricuspid-valve-replacement-treatment-body.md"), TVR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
