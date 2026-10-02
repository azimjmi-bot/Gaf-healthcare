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

const body = readFileSync(resolve("scripts/arterial-switch-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
    relatedTreatmentSlugs?: string[];
    translations?: { en?: { editorialBody?: string; faqs?: Array<{ id: string; answer: string }> } };
  }>;
};
const existing = store.treatments.find((row) => row.slug === "arterial-switch-operation-in-india");
const now = "2026-09-30T01:00:00.000Z";
const SLUG = "arterial-switch-operation-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const PDA = "pda-closure-surgery-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const BENTALL = "bentall-procedure-in-india";
const ADDITION =
  " Arterial-switch lists sit on [Arterial Switch Operation in India](/treatments/arterial-switch-operation-in-india).";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const PDA_NEEDLE = "This page is the named PDA-closure product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const BENTALL_NEEDLE = "This page is the named Bentall-procedure product.";

const treatment = {
  id: existing?.id ?? "a6d9c4e0-5f83-1b72-c30a-9e4f7d0b3a58",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Arterial Switch Operation in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "Arterial Switch Operation",
  image: "/uploads/treatments/aso-hero.webp",
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
    "arterial-switch-operation",
    "congenital-heart-surgery",
    "vsd-closure-ventricular-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "asd-closure-atrial-septal-defect",
    "coarctation-repair",
    "tof-repair-tetralogy-of-fallot",
    "heart-valve-replacement",
  ],
  relatedTreatmentSlugs: [VSD, PDA, COA, VALVE, PACEMAKER, CABG, BENTALL],
  status: "published" as const,
  featured: true,
  sortOrder: 57,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Arterial Switch Operation in India",
      shortDescription:
        "Arterial switch in India reconnects the great arteries in d-TGA. GAF planning is $12,000–$26,000, typically 10–21 nights.",
      editorialBody: body,
      process: [
        {
          id: "aso-step-1",
          title: "Share echo",
          description:
            "The family provides echocardiography, saturations, weight and coronary notes before anyone books travel.",
        },
        {
          id: "aso-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether the baby is fit for ASO, BAS or local emergency care.",
        },
        {
          id: "aso-step-3",
          title: "Name the product",
          description: "The team writes arterial switch, plus VSD closure or septostomy only after anatomy review.",
        },
        {
          id: "aso-step-4",
          title: "Itemized estimate",
          description:
            "GAF arterial switch planning is $12,000–$26,000. Neighbouring congenital heart surgery is $8,000–$28,000.",
        },
        {
          id: "aso-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A cyanotic or collapsing newborn belongs in a local emergency department.",
        },
        {
          id: "aso-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, saturations, coronaries and fitness after arrival.",
        },
        {
          id: "aso-step-7",
          title: "Switch the named arteries",
          description: "Open-heart ASO with coronary transfer proceeds only after the product is named.",
        },
        {
          id: "aso-step-8",
          title: "Pediatric cardiac ICU",
          description: "Ventilation, saturation, heart function and feeding are watched before discharge.",
        },
        {
          id: "aso-step-9",
          title: "Lifelong follow-up",
          description:
            "The family leaves with an imaging plan for coronaries, neoaorta, pulmonary arteries and who will follow the child at home.",
        },
      ],
      preparation:
        "Share echocardiography images, saturations and coronary notes so the congenital team can judge ASO, septostomy and fitness for travel.",
      recovery:
        "Ventilator time and feeding decide recovery. GAF planning is typically 10–21 nights, with parent stay expected.",
      hospitalStay: "Typically 10–21 nights; parent stay expected. Critically ill neonates can stay longer.",
      recoveryPeriod:
        "ICU recovery is individual. Activity, feeding and air travel wait on the treating neonatal cardiac team.",
      followUp:
        "Request a written summary covering coronary transfer, neoaortic imaging dates and who will follow the child after returning home.",
      importantConsiderations:
        "A cyanotic newborn is a local emergency. Unusual coronaries change complexity. Mustard, Senning and ECMO are not assumed products.",
      treatmentType: "Arterial Switch Operation / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner neonatal and pediatric cardiac theatres and ICUs in India",
      technology:
        "Open-heart arterial switch with coronary transfer, LeCompte maneuver when used, neighbouring VSD closure and balloon atrial septostomy",
      searchKeywords: [
        "arterial switch operation in India",
        "arterial switch surgery in India",
        "arterial switch operation cost in India",
        "TGA surgery in India",
        "d-TGA surgery in India",
        "arterial switch operation for newborn",
      ],
      faqs: [
        {
          id: "aso-faq-1",
          question: "How much does arterial switch cost in India?",
          answer:
            "GAF Healthcare planning for arterial switch operation is $12,000–$26,000, typically 10–21 nights, with parent stay expected. US comparison is $80,000–$200,000.",
        },
        {
          id: "aso-faq-2",
          question: "What is an arterial switch operation?",
          answer:
            "An open-heart operation that restores the aorta and pulmonary artery to their appropriate ventricular connections and transfers the coronary arteries.",
        },
        {
          id: "aso-faq-3",
          question: "Is arterial switch open-heart surgery?",
          answer: "Yes. It is performed using cardiopulmonary bypass and includes coronary transfer.",
        },
        {
          id: "aso-faq-4",
          question: "Are the coronary arteries moved?",
          answer: "Yes. The coronary arteries must be carefully transferred to the new aortic root.",
        },
        {
          id: "aso-faq-5",
          question: "How long is hospital stay after arterial switch?",
          answer:
            "It depends on the baby. GAF planning is typically 10–21 nights. Critically ill neonates often stay longer.",
        },
        {
          id: "aso-faq-6",
          question: "Does the child need lifelong follow-up?",
          answer:
            "Yes. Coronaries, the neoaortic root and valve, pulmonary arteries and ventricular function need long-term congenital review.",
        },
        {
          id: "aso-faq-7",
          question: "Can ASO and VSD closure be performed together?",
          answer:
            "Yes, in selected patients. Isolated VSD lists sit on the VSD surgery page. Neighbouring VSD closure is $4,500–$11,000.",
        },
        {
          id: "aso-faq-8",
          question: "Can international families travel for a newborn with TGA?",
          answer:
            "Only if the receiving team accepts the case and the baby is stable enough to transfer. A cyanotic newborn belongs in a local emergency department first.",
        },
        {
          id: "aso-faq-9",
          question: "Which city in India is best for arterial switch?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "aso-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Bluish skin, severe breathing difficulty, poor feeding or collapse in a baby belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "aso-faq-11",
          question: "Is there a GAF Mustard, Senning or ECMO treatment page?",
          answer:
            "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure, TOF and Glenn treatment pages are not live. Neighbouring sheets exist. Fontan lists sit on the Fontan procedure page.",
        },
        {
          id: "aso-faq-12",
          question: "Is arterial switch better than Mustard or Senning?",
          answer:
            "For suitable d-TGA, ASO is the standard anatomical repair and leaves the left ventricle as the systemic ventricle.",
        },
      ],
      imageAlt: "Educational illustration of unlabeled crossed great arteries used as the arterial switch hero",
      seoTitle: "Arterial Switch Operation in India: Cost, Surgery, Recovery & Hospitals",
      metaDescription:
        "Learn about arterial switch operation in India for d-TGA, including coronary transfer, GAF planning $12,000–$26,000, recovery and how to send echocardiography.",
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

function scrubAsoNotLive(text: string) {
  return text
    .replace(
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, Glenn, Fontan, arterial-switch or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, Glenn, Fontan or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "ASD-closure, Tetralogy-of-Fallot, Glenn, Fontan and arterial-switch treatment pages are not live on this site.",
      "ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live on this site.",
    )
    .replace(
      "No. ASD-closure, Tetralogy-of-Fallot, Glenn, Fontan and arterial-switch treatment pages are not live.",
      "No. ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubAsoNotLive(row.translations.en.editorialBody);
  if (next !== row.translations.en.editorialBody) {
    row.translations.en.editorialBody = next;
  }
}

function patchFaqAnswer(slug: string, contains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.answer.includes(contains)) {
      faq.answer = replacement;
    }
  }
}

patchEditorial(PDA);
patchFaqAnswer(
  PDA,
  "arterial-switch",
  "No. ASD-closure, Tetralogy-of-Fallot, Glenn and Fontan treatment pages are not live. Neighbouring sheets exist. VSD and coarctation lists sit on those treatment pages. Arterial-switch lists sit on the arterial switch page.",
);

linkRelated(VSD, VSD_NEEDLE, ADDITION);
linkRelated(PDA, PDA_NEEDLE, ADDITION);
linkRelated(COA, COA_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(BENTALL, BENTALL_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [PDA closure surgery in India](https://gaf.healthcare/treatments/pda-closure-surgery-in-india).",
    ", [PDA closure surgery in India](https://gaf.healthcare/treatments/pda-closure-surgery-in-india) and [arterial switch operation in India](https://gaf.healthcare/treatments/arterial-switch-operation-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubAsoNotLive(text);
  let next = scrubbed;
  if (scrubbed.includes(needle) && !scrubbed.includes(`/treatments/${SLUG}`)) {
    next = scrubbed.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pda-closure-treatment-body.md"), PDA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/bentall-procedure-treatment-body.md"), BENTALL_NEEDLE, ADDITION);
