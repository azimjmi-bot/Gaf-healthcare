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

const body = readFileSync(resolve("scripts/lvad-implantation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "lvad-implantation-in-india");
const now = "2026-09-29T21:30:00.000Z";
const SLUG = "lvad-implantation-in-india";
const VALVE = "heart-valve-replacement-in-india";
const CABG = "cabg-surgery-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ICD = "icd-device-implantation-in-india";
const ADR = "aortic-dissection-repair-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const ADDITION =
  " LVAD lists sit on [Left Ventricular Assist Device (LVAD) Procedure in India](/treatments/lvad-implantation-in-india).";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const ICD_NEEDLE = "This page is the named ICD product.";
const ADR_NEEDLE = "This page is the named aortic-dissection-repair product.";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";

const treatment = {
  id: existing?.id ?? "b2c8d4f9-0e63-9c25-d17a-6f9b3e5c8a01",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Left Ventricular Assist Device (LVAD) Procedure in India",
  specialtySlug: "cardiac-surgery",
  subspecialty: "Advanced Heart Failure",
  category: "LVAD Implantation",
  image: "/uploads/treatments/lvad-hero.webp",
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
    "lvad-implantation",
    "heart-transplant-surgery",
    "icd-implantation-implantable-cardioverter-defibrillator",
    "crt-crt-d-implantation",
    "pacemaker-implantation",
    "cabg-coronary-artery-bypass-grafting",
  ],
  relatedTreatmentSlugs: [VALVE, CABG, PACEMAKER, ICD, ADR, VSD],
  status: "published" as const,
  featured: true,
  sortOrder: 50,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Left Ventricular Assist Device (LVAD) Procedure in India",
      shortDescription:
        "LVAD implantation in India supports selected advanced heart-failure patients. GAF planning is $70,000–$140,000 with 3–8 weeks of device training.",
      editorialBody: body,
      process: [
        {
          id: "lvad-step-1",
          title: "Share records",
          description:
            "The patient provides echocardiography, catheterization, organ-function tests and heart-failure notes before anyone books travel.",
        },
        {
          id: "lvad-step-2",
          title: "Advanced-failure review",
          description:
            "An LVAD team reviews whether the case is bridge to transplant, destination therapy, recovery or decision.",
        },
        {
          id: "lvad-step-3",
          title: "Name the device and goal",
          description:
            "The team writes the pump, accessories and caregiver training plan after right-heart and psychosocial review.",
        },
        {
          id: "lvad-step-4",
          title: "Itemized estimate",
          description:
            "GAF LVAD implantation planning is $70,000–$140,000. Neighbouring heart transplant is $45,000–$95,000.",
        },
        {
          id: "lvad-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Stroke signs, major bleeding or device alarms are a local emergency.",
        },
        {
          id: "lvad-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms echo, cath, infection screen and caregiver readiness after arrival.",
        },
        {
          id: "lvad-step-7",
          title: "Implant the named pump",
          description:
            "Inflow, pump, outflow and driveline proceed only after the device and goal are named.",
        },
        {
          id: "lvad-step-8",
          title: "ICU, ward and training",
          description:
            "Speed, right-heart function, bleeding, batteries, alarms and driveline dressings are watched before discharge.",
        },
        {
          id: "lvad-step-9",
          title: "Lifelong LVAD clinic",
          description:
            "The patient leaves with anticoagulation, emergency contacts, spare equipment and a home-centre plan.",
        },
      ],
      preparation:
        "Share echocardiography, catheterization and organ-function reports so the LVAD team can judge candidacy and goal.",
      recovery:
        "Device training is part of the stay. GAF planning is typically 3–8 weeks with device training.",
      hospitalStay: "Typically 3–8 weeks with device training",
      recoveryPeriod: "Gradual rehabilitation. Travel home only after the implanting team clears fitness and home support.",
      followUp:
        "Request a written summary covering the device, anticoagulation, driveline care, emergency contacts and who will follow the patient after returning home.",
      importantConsiderations:
        "Ejection fraction alone does not name an LVAD. Stroke signs, major bleeding or a device alarm belong in a local emergency department.",
      treatmentType: "LVAD Implantation / Mechanical Circulatory Support",
      treatmentSetting: "Accredited partner advanced-heart-failure theatres, cardiac ICUs and LVAD clinics in India",
      technology:
        "Durable continuous-flow LVADs, driveline and controller systems, neighbouring ICD/CRT and transplant evaluation",
      searchKeywords: [
        "LVAD implantation in India",
        "left ventricular assist device India",
        "LVAD surgery cost in India",
        "destination therapy LVAD India",
        "bridge to transplant LVAD",
        "mechanical circulatory support India",
      ],
      faqs: [
        {
          id: "lvad-faq-1",
          question: "What is an LVAD?",
          answer:
            "A mechanical pump that assists the failing left ventricle in pumping blood to the body.",
        },
        {
          id: "lvad-faq-2",
          question: "Who may need an LVAD?",
          answer:
            "Selected patients with advanced, refractory heart failure despite appropriate medical treatment.",
        },
        {
          id: "lvad-faq-3",
          question: "How much does LVAD implantation cost in India?",
          answer:
            "GAF Healthcare planning for LVAD implantation is $70,000–$140,000, typically 3–8 weeks with device training. Neighbouring heart transplant is $45,000–$95,000.",
        },
        {
          id: "lvad-faq-4",
          question: "Can an LVAD replace a heart transplant?",
          answer:
            "For some patients it can provide long-term destination therapy. For others it is a bridge while waiting for transplantation.",
        },
        {
          id: "lvad-faq-5",
          question: "How long is hospitalization after LVAD surgery?",
          answer:
            "GAF planning is typically 3–8 weeks with device training. Complications can extend the stay.",
        },
        {
          id: "lvad-faq-6",
          question: "Is LVAD the same as a pacemaker?",
          answer:
            "No. A pacemaker treats rhythm. An LVAD is a mechanical pump for severe left-heart failure.",
        },
        {
          id: "lvad-faq-7",
          question: "Can international patients receive an LVAD in India?",
          answer:
            "Yes, after records review. Home follow-up and emergency support must be planned before return travel.",
        },
        {
          id: "lvad-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Stroke signs, major bleeding, severe breathlessness, unconsciousness, driveline infection or a serious device alarm belong in a local emergency department.",
        },
        {
          id: "lvad-faq-9",
          question: "Can the LVAD be removed?",
          answer:
            "In selected patients with meaningful recovery, removal may be considered after formal LVAD-team testing.",
        },
        {
          id: "lvad-faq-10",
          question: "Which city in India is best for LVAD implantation?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "lvad-faq-11",
          question: "Is there a GAF heart-transplant treatment page?",
          answer:
            "No. Heart-transplant and ECMO treatment pages are not live. Neighbouring heart-transplant planning is $45,000–$95,000.",
        },
        {
          id: "lvad-faq-12",
          question: "What are the biggest risks of LVAD surgery?",
          answer:
            "Bleeding, infection, stroke, clots, right-heart failure, arrhythmias, kidney injury and device malfunction.",
        },
      ],
      imageAlt:
        "Educational illustration of a pump silhouette used as the LVAD implantation hero",
      seoTitle: "Left Ventricular Assist Device (LVAD) Procedure in India: Cost, Recovery & Care",
      metaDescription:
        "Learn about LVAD implantation in India, including candidacy, surgery, GAF planning $70,000–$140,000, driveline care and how to send heart-failure records.",
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
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(ICD, ICD_NEEDLE, ADDITION);
linkRelated(ADR, ADR_NEEDLE, ADDITION);
linkRelated(VSD, VSD_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [ventricular septal defect (VSD) surgery in India](https://gaf.healthcare/treatments/ventricular-septal-defect-surgery-in-india).",
    ", [ventricular septal defect (VSD) surgery in India](https://gaf.healthcare/treatments/ventricular-septal-defect-surgery-in-india) and [LVAD implantation in India](https://gaf.healthcare/treatments/lvad-implantation-in-india).",
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
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/icd-implantation-treatment-body.md"), ICD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
