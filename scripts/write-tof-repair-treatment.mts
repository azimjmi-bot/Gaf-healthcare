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

const body = readFileSync(resolve("scripts/tof-repair-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "tof-repair-surgery-in-india");
const now = "2026-09-30T02:30:00.000Z";
const SLUG = "tof-repair-surgery-in-india";
const GLENN = "glenn-procedure-surgery-in-india";
const FONTAN = "fontan-procedure-surgery-in-india";
const ASO = "arterial-switch-operation-in-india";
const PDA = "pda-closure-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const ADDITION = " TOF lists sit on [TOF Repair Surgery in India](/treatments/tof-repair-surgery-in-india).";
const GLENN_NEEDLE = "This page is the named Glenn-procedure product.";
const FONTAN_NEEDLE = "This page is the named Fontan-procedure product.";
const ASO_NEEDLE = "This page is the named arterial-switch product.";
const PDA_NEEDLE = "This page is the named PDA-closure product.";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";

const treatment = {
  id: existing?.id ?? "d9a2f7b3-8c16-4e05-f63d-2b7c0e3e6d81",
  slug: SLUG,
  previousSlugs: [],
  baseName: "TOF Repair Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "TOF Repair (Tetralogy of Fallot)",
  image: "/uploads/treatments/tof-hero.webp",
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
    "tof-repair-tetralogy-of-fallot",
    "vsd-closure-ventricular-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "asd-closure-atrial-septal-defect",
    "glenn-procedure",
    "congenital-heart-surgery",
    "arterial-switch-operation",
    "coarctation-repair",
  ],
  relatedTreatmentSlugs: [VSD, PDA, GLENN, FONTAN, ASO, COA, VALVE, PACEMAKER, CABG],
  status: "published" as const,
  featured: true,
  sortOrder: 60,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "TOF Repair Surgery in India",
      shortDescription:
        "TOF repair in India closes the VSD and opens lung flow. GAF planning is $6,500–$16,000, typically 8–16 nights.",
      editorialBody: body,
      process: [
        {
          id: "tof-step-1",
          title: "Share records",
          description:
            "The family provides echocardiography, saturations and previous operative notes before anyone books travel.",
        },
        {
          id: "tof-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether complete repair, palliation or local emergency care is honest.",
        },
        {
          id: "tof-step-3",
          title: "Name the product",
          description:
            "The team writes valve-sparing, transannular-patch or conduit repair only after pulmonary-valve and coronary review.",
        },
        {
          id: "tof-step-4",
          title: "Itemized estimate",
          description:
            "GAF TOF planning is $6,500–$16,000. Neighbouring VSD is $4,500–$11,000 when an isolated hole is named.",
        },
        {
          id: "tof-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A Tet spell belongs in a local emergency department.",
        },
        {
          id: "tof-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, saturations, coronaries if needed and fitness after arrival.",
        },
        {
          id: "tof-step-7",
          title: "Complete the named TOF repair",
          description: "Open-heart VSD closure and RVOT relief proceed only after the product is named.",
        },
        {
          id: "tof-step-8",
          title: "Pediatric cardiac ICU",
          description: "Right-ventricular function, rhythm, oxygenation and drains are watched before discharge.",
        },
        {
          id: "tof-step-9",
          title: "Lifelong follow-up",
          description:
            "The family leaves with a pulmonary-valve and rhythm plan and who will follow the child after returning home.",
        },
      ],
      preparation:
        "Share echocardiography, saturations and previous notes so the congenital team can judge complete repair versus palliation.",
      recovery:
        "Right-ventricular function and rhythm decide recovery. GAF planning is typically 8–16 nights, with parent stay expected.",
      hospitalStay: "Typically 8–16 nights; parent stay expected. Residual lesions or low-output states can stay longer.",
      recoveryPeriod:
        "ICU recovery is individual. School, sport and air travel wait on the treating congenital cardiac team.",
      followUp:
        "Request a written summary covering the repair type, residual VSD, pulmonary valve, medicines and who will follow the child at home.",
      importantConsiderations:
        "A Tet spell is a local emergency. TOF repair is not the end of congenital follow-up. Isolated VSD is a neighbouring product, not this page.",
      treatmentType: "TOF Repair / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric congenital theatres and ICUs in India",
      technology:
        "Valve-sparing, transannular-patch or RV-to-PA conduit repair, selected staged palliation, neighbouring VSD and PDA lists",
      searchKeywords: [
        "TOF repair surgery in India",
        "Tetralogy of Fallot surgery in India",
        "TOF surgery cost in India",
        "TOF repair for babies",
        "transannular patch TOF",
        "valve-sparing TOF repair",
      ],
      faqs: [
        {
          id: "tof-faq-1",
          question: "How much does TOF surgery cost in India?",
          answer:
            "GAF Healthcare planning for TOF repair is $6,500–$16,000, typically 8–16 nights, with parent stay expected. US comparison is $50,000–$140,000.",
        },
        {
          id: "tof-faq-2",
          question: "What is TOF?",
          answer:
            "Tetralogy of Fallot is a congenital heart defect with a VSD and obstruction of blood flow from the right ventricle to the lungs.",
        },
        {
          id: "tof-faq-3",
          question: "Is TOF surgery open-heart surgery?",
          answer: "Complete repair generally uses open-heart surgery and cardiopulmonary bypass.",
        },
        {
          id: "tof-faq-4",
          question: "Can TOF be completely repaired?",
          answer:
            "Surgical repair can correct the major anatomical abnormalities, but lifelong congenital-heart follow-up remains important.",
        },
        {
          id: "tof-faq-5",
          question: "How long is hospital stay after TOF?",
          answer:
            "Uncomplicated recoveries may take 1–2 weeks. GAF planning is typically 8–16 nights. Complex recoveries stay longer.",
        },
        {
          id: "tof-faq-6",
          question: "Does every child need a transannular patch?",
          answer: "No. Some children can have a valve-sparing repair. The pulmonary annulus and RVOT decide.",
        },
        {
          id: "tof-faq-7",
          question: "What happens during a Tet spell?",
          answer:
            "A hypercyanotic spell is a medical emergency. The child belongs in a local emergency department immediately.",
        },
        {
          id: "tof-faq-8",
          question: "Can international families travel for TOF repair?",
          answer:
            "Selected stable children can, after records review and hospital acceptance. A spell or collapsing child belongs in a local emergency department first.",
        },
        {
          id: "tof-faq-9",
          question: "Which city in India is best for TOF surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "tof-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "A Tet spell, increasing breathlessness, grey or blue skin, fainting or collapse belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "tof-faq-11",
          question: "Is there a GAF ASD-closure or BT-shunt treatment page?",
          answer:
            "No. ASD-closure, BT-shunt-only and pulmonary-valve-replacement-only treatment pages are not live. Neighbouring sheets exist. VSD, PDA, Glenn, Fontan and coarctation lists sit on those treatment pages.",
        },
        {
          id: "tof-faq-12",
          question: "Can TOF return after surgery?",
          answer:
            "The original defect does not simply come back, but residual obstruction, pulmonary regurgitation, rhythm problems or right-ventricular enlargement may need later treatment.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled tetralogy silhouette used as the TOF hero",
      seoTitle: "TOF Repair Surgery in India: Cost, Recovery & Hospitals",
      metaDescription:
        "Learn about TOF repair surgery in India, including complete repair, valve-sparing vs transannular patch, GAF planning $6,500–$16,000 and recovery.",
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

function scrubTofNotLive(text: string) {
  return text
    .replace(
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot, balloon-coarctation-only or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure, balloon-coarctation-only or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace(
      "There is no live GAF ASD-closure or Tetralogy-of-Fallot treatment page.",
      "There is no live GAF ASD-closure treatment page.",
    )
    .replace(
      "ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
      "ASD-closure treatment pages are not live on this site.",
    )
    .replace(
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
      "TGA-only, Mustard, Senning, balloon-atrial-septostomy-only, ECMO and ASD-closure treatment pages are not live on this site.",
    )
    .replace(
      "Norwood, HLHS-only, Blalock-Taussig, Sano, heart-transplant, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
      "Norwood, HLHS-only, Blalock-Taussig, Sano, heart-transplant and ASD-closure treatment pages are not live on this site.",
    )
    .replace(
      "Norwood, HLHS-only, heart-transplant, ASD-closure and Tetralogy-of-Fallot treatment pages are not live on this site.",
      "Norwood, HLHS-only, heart-transplant and ASD-closure treatment pages are not live on this site.",
    )
    .replace(
      "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live.",
      "No. ASD-closure treatment pages are not live.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubTofNotLive(row.translations.en.editorialBody);
  if (next !== row.translations.en.editorialBody) {
    row.translations.en.editorialBody = next;
  }
}

function patchFaqAnswer(slug: string, contains: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const faqs = row?.translations?.en?.faqs ?? [];
  for (const faq of faqs) {
    if (faq.answer.includes(contains) && /tetralogy|tof/i.test(faq.answer)) {
      faq.answer = replacement;
    }
  }
}

for (const slug of [GLENN, FONTAN, ASO, PDA, VSD, COA]) {
  patchEditorial(slug);
}

patchFaqAnswer(
  VSD,
  "Tetralogy",
  "No. ASD-closure treatment pages are not live. Use this page and the named congenital-heart-surgery sheet. TOF lists sit on the TOF repair page. PDA lists sit on the PDA closure surgery page.",
);
patchFaqAnswer(
  PDA,
  "Tetralogy",
  "No. ASD-closure treatment pages are not live. Neighbouring sheets exist. VSD, coarctation and arterial-switch lists sit on those treatment pages. TOF lists sit on the TOF repair page.",
);
patchFaqAnswer(
  ASO,
  "TOF",
  "No. Mustard, Senning, balloon-atrial-septostomy-only, ECMO and ASD-closure treatment pages are not live. Neighbouring sheets exist. Fontan, Glenn and TOF lists sit on those treatment pages.",
);
patchFaqAnswer(
  COA,
  "Tetralogy",
  "No. ASD-closure treatment pages are not live. Neighbouring sheets exist. VSD lists sit on the VSD surgery page. TOF lists sit on the TOF repair page. PDA lists sit on the PDA closure surgery page.",
);
patchFaqAnswer(
  GLENN,
  "ASD-closure",
  "No. Norwood, HLHS-only, heart-transplant and ASD-closure treatment pages are not live. Neighbouring sheets exist. Fontan, arterial-switch, PDA, VSD, coarctation and TOF lists sit on those treatment pages.",
);

linkRelated(GLENN, GLENN_NEEDLE, ADDITION);
linkRelated(FONTAN, FONTAN_NEEDLE, ADDITION);
linkRelated(ASO, ASO_NEEDLE, ADDITION);
linkRelated(PDA, PDA_NEEDLE, ADDITION);
linkRelated(VSD, VSD_NEEDLE, ADDITION);
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
    "and [Glenn procedure surgery in India](https://gaf.healthcare/treatments/glenn-procedure-surgery-in-india).",
    ", [Glenn procedure surgery in India](https://gaf.healthcare/treatments/glenn-procedure-surgery-in-india) and [TOF repair surgery in India](https://gaf.healthcare/treatments/tof-repair-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle?: string, addition?: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubTofNotLive(text);
  let next = scrubbed;
  if (needle && addition && scrubbed.includes(needle) && !scrubbed.includes(`/treatments/${SLUG}`)) {
    next = scrubbed.replace(needle, `${needle}${addition}`);
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/glenn-procedure-treatment-body.md"), GLENN_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/fontan-procedure-treatment-body.md"), FONTAN_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/arterial-switch-treatment-body.md"), ASO_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pda-closure-treatment-body.md"), PDA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
