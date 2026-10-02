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

const body = readFileSync(resolve("scripts/asd-closure-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string; faqs?: Array<{ id: string; question?: string; answer: string }> } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "asd-closure-surgery-in-india");
const now = "2026-09-30T03:30:00.000Z";
const SLUG = "asd-closure-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const PDA = "pda-closure-surgery-in-india";
const TOF = "tof-repair-surgery-in-india";
const GLENN = "glenn-procedure-surgery-in-india";
const FONTAN = "fontan-procedure-surgery-in-india";
const ASO = "arterial-switch-operation-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const ADDITION = " ASD lists sit on [ASD Closure Surgery in India](/treatments/asd-closure-surgery-in-india).";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const PDA_NEEDLE = "This page is the named PDA-closure product.";
const TOF_NEEDLE = "This page is the named TOF-repair product.";
const GLENN_NEEDLE = "This page is the named Glenn-procedure product.";
const FONTAN_NEEDLE = "This page is the named Fontan-procedure product.";
const ASO_NEEDLE = "This page is the named arterial-switch product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";

const treatment = {
  id: existing?.id ?? "e0b3f8c4-9d27-5f16-a74e-3c8d1f4e7e92",
  slug: SLUG,
  previousSlugs: [],
  baseName: "ASD Closure Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "ASD Closure (Atrial Septal Defect)",
  image: "/uploads/treatments/asd-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-krishna-subramony-iyer",
    "dr-gaurav-kumar",
    "dr-kulbhushan-singh-dagar",
    "dr-ankit-garg",
    "dr-mahendra-narwaley",
    "dr-rajesh-sharma",
    "dr-nidhi-rawal",
    "dr-bhushan-chavan",
    "dr-r-k-r-noveen-davidson",
    "dr-rajesh-kumar-r",
    "dr-anil-kumar-d",
    "dr-sunil-kumar-swain",
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
    "apollo-delhi",
    "max-super-speciality-hospital-saket",
    "apollo-hospitals-navi-mumbai",
  ],
  costPageSlugs: [
    "asd-closure-atrial-septal-defect",
    "vsd-closure-ventricular-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "tof-repair-tetralogy-of-fallot",
    "congenital-heart-surgery",
    "heart-valve-replacement",
    "minimally-invasive-cardiac-surgery",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VSD, PDA, TOF, GLENN, FONTAN, ASO, COA, VALVE, PACEMAKER, CABG],
  status: "published" as const,
  featured: true,
  sortOrder: 61,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "ASD Closure Surgery in India",
      shortDescription:
        "ASD closure in India closes a hole between the atria when observation is not honest. GAF planning is $4,000–$9,500, typically 5–10 nights.",
      editorialBody: body,
      process: [
        {
          id: "asd-step-1",
          title: "Share echo",
          description:
            "The family provides echocardiography images, ECG and growth notes before anyone books travel.",
        },
        {
          id: "asd-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether the case is observation, device closure or surgical repair.",
        },
        {
          id: "asd-step-3",
          title: "Name the product",
          description:
            "The team writes watch, device or surgical patch after type, rims and pulmonary pressure review.",
        },
        {
          id: "asd-step-4",
          title: "Itemized estimate",
          description:
            "GAF ASD planning is $4,000–$9,500. Neighbouring congenital heart surgery is $8,000–$28,000. Device work is hospital-priced.",
        },
        {
          id: "asd-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Severe breathing difficulty or poor feeding is a local emergency.",
        },
        {
          id: "asd-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, bloods, weight and fitness after arrival.",
        },
        {
          id: "asd-step-7",
          title: "Deliver the named closure",
          description: "Device closure or surgical repair proceeds only after the product is named.",
        },
        {
          id: "asd-step-8",
          title: "Cardiac ICU and ward",
          description: "Rhythm, feeding, oxygen and residual shunt are watched before discharge.",
        },
        {
          id: "asd-step-9",
          title: "Congenital follow-up",
          description:
            "The family leaves with echo dates, activity advice and who will follow residual anatomy after returning home.",
        },
      ],
      preparation:
        "Share echocardiography images, not only the written report, so the congenital team can judge observation versus device versus surgery.",
      recovery:
        "Device recovery is usually faster than surgical recovery. GAF ASD planning is 5–10 nights, with parent stay expected.",
      hospitalStay: "Typically 5–10 nights; parent stay expected. Broader congenital lists may stay 7–21 nights.",
      recoveryPeriod: "Varies with age and method. Isolated device closure is usually shorter than surgical or combined work.",
      followUp:
        "Request a written summary covering residual shunt, rhythm, activity advice and who will follow the patient after returning home.",
      importantConsiderations:
        "Not every ASD needs closure. GAF ASD planning is $4,000–$9,500. Severe breathing difficulty or poor feeding belongs in a local emergency department.",
      treatmentType: "ASD Closure / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric and congenital cardiac theatres, catheter laboratories and ICUs in India",
      technology:
        "Transcatheter ASD devices, surgical patch or suture closure on cardiopulmonary bypass, neighbouring valve and pacing products",
      searchKeywords: [
        "ASD closure surgery in India",
        "ASD device closure in India",
        "atrial septal defect closure in India",
        "ASD surgery cost in India",
        "ASD device closure cost in India",
        "ASD treatment in India",
      ],
      faqs: [
        {
          id: "asd-faq-1",
          question: "What is ASD?",
          answer: "A hole between the two upper chambers of the heart.",
        },
        {
          id: "asd-faq-2",
          question: "Is every ASD treated?",
          answer: "No. Small, insignificant defects may only require monitoring.",
        },
        {
          id: "asd-faq-3",
          question: "How much does ASD closure cost in India?",
          answer:
            "GAF Healthcare planning for ASD closure is $4,000–$9,500, typically 5–10 nights, with parent stay expected. US comparison is $30,000–$80,000.",
        },
        {
          id: "asd-faq-4",
          question: "Can ASD be closed without open-heart surgery?",
          answer:
            "Suitable secundum ASDs may be closed through a catheter using a closure device. Primum, sinus venosus and coronary sinus defects usually need surgery.",
        },
        {
          id: "asd-faq-5",
          question: "How long is hospital stay after ASD closure?",
          answer:
            "Device stays are often shorter than surgical stays. GAF ASD planning is typically 5–10 nights, with parent stay expected.",
        },
        {
          id: "asd-faq-6",
          question: "Can an ASD close naturally?",
          answer:
            "Yes. Some small ASDs, particularly those found in infancy or early childhood, may become smaller or close spontaneously.",
        },
        {
          id: "asd-faq-7",
          question: "Can international patients undergo ASD closure in India?",
          answer: "Yes. Echocardiography and medical records should generally be reviewed before travel.",
        },
        {
          id: "asd-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Severe breathing difficulty, bluish discoloration, poor feeding, extreme lethargy, fainting or collapse belongs in a local emergency department.",
        },
        {
          id: "asd-faq-9",
          question: "Can adults undergo ASD closure?",
          answer:
            "Yes, when the clinical and hemodynamic assessment indicates that closure is appropriate. Advanced pulmonary vascular disease can make closure inappropriate.",
        },
        {
          id: "asd-faq-10",
          question: "Which city in India is best for ASD closure?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "asd-faq-11",
          question: "Is there a GAF AVSD or pediatric-cardiac-surgery-only treatment page?",
          answer:
            "No. AVSD-only, robotic-ASD-only and pediatric-cardiac-surgery-only treatment pages are not live. VSD, PDA, TOF, Glenn, Fontan, arterial-switch and coarctation lists sit on those treatment pages.",
        },
        {
          id: "asd-faq-12",
          question: "Does ASD closure cure the problem?",
          answer:
            "Closure eliminates the abnormal opening, but long-term cardiology follow-up may still be required.",
        },
      ],
      imageAlt: "Educational illustration of unlabeled atrial chambers used as the ASD closure hero",
      seoTitle: "ASD Closure Surgery in India: Cost, Procedure, Recovery & Hospitals",
      metaDescription:
        "Learn about ASD closure surgery in India, including device closure, open-heart surgery, GAF planning $4,000–$9,500, recovery, children and adult options.",
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

function scrubAsdNotLive(text: string) {
  return text
    .replace(
      "There is no live GAF ASD-closure, BT-shunt-only, pulmonary-valve-replacement-only or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF BT-shunt-only, pulmonary-valve-replacement-only or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure, AVSD-only or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF AVSD-only or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure, balloon-coarctation-only or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF balloon-coarctation-only or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure treatment page.",
      "ASD lists sit on [ASD Closure Surgery in India](/treatments/asd-closure-surgery-in-india).",
    )
    .replace(
      "ASD-closure, BT-shunt-only, pulmonary-valve-replacement-only and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
      "BT-shunt-only, pulmonary-valve-replacement-only and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
    )
    .replace(
      "ASD-closure, AVSD-only and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
      "AVSD-only and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
    )
    .replace(
      "ASD-closure, Tetralogy-of-Fallot and balloon-coarctation-only treatment pages are not live on this site.",
      "Balloon-coarctation-only treatment pages are not live on this site.",
    )
    .replace(
      "Norwood, HLHS-only, Blalock-Taussig, Sano, heart-transplant, ASD-closure treatment pages are not live on this site.",
      "Norwood, HLHS-only, Blalock-Taussig, Sano and heart-transplant treatment pages are not live on this site.",
    )
    .replace(
      "Norwood, HLHS-only, heart-transplant, ASD-closure treatment pages are not live on this site.",
      "Norwood, HLHS-only and heart-transplant treatment pages are not live on this site.",
    )
    .replace(
      "Norwood, HLHS-only, heart-transplant and ASD-closure treatment pages are not live on this site.",
      "Norwood, HLHS-only and heart-transplant treatment pages are not live on this site.",
    )
    .replace(
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure treatment pages are not live on this site.",
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only and ECMO treatment pages are not live on this site.",
    )
    .replace(
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO and ASD-closure treatment pages are not live on this site.",
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only and ECMO treatment pages are not live on this site.",
    )
    .replace(
      "ASD-closure treatment pages are not live on this site.",
      "ASD lists sit on [ASD Closure Surgery in India](/treatments/asd-closure-surgery-in-india).",
    )
    .replace(
      "ASD-closure treatment pages are not live.",
      "ASD lists sit on [ASD Closure Surgery in India](/treatments/asd-closure-surgery-in-india).",
    )
    .replace(
      "No. ASD-closure, BT-shunt-only and pulmonary-valve-replacement-only treatment pages are not live.",
      "No. BT-shunt-only and pulmonary-valve-replacement-only treatment pages are not live. ASD lists sit on the ASD closure surgery page.",
    )
    .replace(
      "No. ASD-closure treatment pages are not live.",
      "ASD lists sit on the ASD closure surgery page.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubAsdNotLive(row.translations.en.editorialBody);
  if (next !== row.translations.en.editorialBody) {
    row.translations.en.editorialBody = next;
  }
}

function patchFaqAnswer(slug: string, contains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.answer.includes(contains) && /asd-closure|ASD-closure|ASD lists/i.test(faq.answer + contains)) {
      faq.answer = replacement;
    }
  }
}

function patchFaqByQuestion(slug: string, questionContains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.question?.includes(questionContains)) {
      faq.answer = replacement;
    }
  }
}

for (const slug of [VSD, PDA, TOF, GLENN, FONTAN, ASO, COA]) {
  patchEditorial(slug);
}

patchFaqByQuestion(
  VSD,
  "GAF ASD",
  "ASD lists sit on the ASD closure surgery page. TOF lists sit on the TOF repair page. PDA lists sit on the PDA closure surgery page.",
);
patchFaqByQuestion(
  PDA,
  "ASD",
  "ASD lists sit on the ASD closure surgery page. Neighbouring sheets exist. VSD, coarctation and arterial-switch lists sit on those treatment pages. TOF lists sit on the TOF repair page.",
);
patchFaqByQuestion(
  TOF,
  "ASD-closure",
  "No. BT-shunt-only and pulmonary-valve-replacement-only treatment pages are not live. ASD lists sit on the ASD closure surgery page. VSD, PDA, Glenn, Fontan, arterial-switch and coarctation lists sit on those treatment pages.",
);
patchFaqByQuestion(
  GLENN,
  "Norwood or heart-transplant",
  "No. Norwood, HLHS-only and heart-transplant treatment pages are not live. Neighbouring sheets exist. Fontan, arterial-switch, PDA, VSD, coarctation, TOF and ASD lists sit on those treatment pages.",
);
patchFaqAnswer(
  ASO,
  "ASD-closure",
  "No. Mustard, Senning, balloon-atrial-septostomy-only and ECMO treatment pages are not live. Neighbouring sheets exist. Fontan, Glenn, TOF and ASD lists sit on those treatment pages.",
);
patchFaqAnswer(
  COA,
  "ASD-closure",
  "ASD lists sit on the ASD closure surgery page. Neighbouring sheets exist. VSD lists sit on the VSD surgery page. TOF lists sit on the TOF repair page. PDA lists sit on the PDA closure surgery page.",
);
patchFaqAnswer(
  FONTAN,
  "ASD-closure",
  "Glenn lists sit on the Glenn procedure page. Norwood, HLHS-only and heart-transplant treatment pages are not live. Neighbouring sheets exist. Arterial-switch, PDA, VSD, coarctation, TOF and ASD lists sit on those treatment pages.",
);

linkRelated(VSD, VSD_NEEDLE, ADDITION);
linkRelated(PDA, PDA_NEEDLE, ADDITION);
linkRelated(TOF, TOF_NEEDLE, ADDITION);
linkRelated(GLENN, GLENN_NEEDLE, ADDITION);
linkRelated(FONTAN, FONTAN_NEEDLE, ADDITION);
linkRelated(ASO, ASO_NEEDLE, ADDITION);
linkRelated(COA, COA_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [TOF repair surgery in India](https://gaf.healthcare/treatments/tof-repair-surgery-in-india).",
    ", [TOF repair surgery in India](https://gaf.healthcare/treatments/tof-repair-surgery-in-india) and [ASD closure surgery in India](https://gaf.healthcare/treatments/asd-closure-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle?: string, addition?: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubAsdNotLive(text);
  let next = scrubbed;
  if (needle && addition && scrubbed.includes(needle) && !scrubbed.includes(`/treatments/${SLUG}`)) {
    next = scrubbed.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pda-closure-treatment-body.md"), PDA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tof-repair-treatment-body.md"), TOF_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/glenn-procedure-treatment-body.md"), GLENN_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/fontan-procedure-treatment-body.md"), FONTAN_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/arterial-switch-treatment-body.md"), ASO_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
