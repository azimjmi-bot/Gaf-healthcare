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

const body = readFileSync(resolve("scripts/pda-closure-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "pda-closure-surgery-in-india");
const now = "2026-09-30T00:30:00.000Z";
const SLUG = "pda-closure-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const COA = "coarctation-repair-surgery-in-india";
const VALVE = "heart-valve-replacement-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const CABG = "cabg-surgery-in-india";
const ADR = "aortic-dissection-repair-in-india";
const BENTALL = "bentall-procedure-in-india";
const ADDITION =
  " PDA lists sit on [PDA Closure Surgery in India](/treatments/pda-closure-surgery-in-india).";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const COA_NEEDLE = "This page is the named coarctation-repair product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const ADR_NEEDLE = "This page is the named aortic-dissection-repair product.";
const BENTALL_NEEDLE = "This page is the named Bentall-procedure product.";

const treatment = {
  id: existing?.id ?? "f5c8b3d9-4e72-0a61-b29f-8d3e6c9a2f47",
  slug: SLUG,
  previousSlugs: [],
  baseName: "PDA Closure Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "PDA Closure (Patent Ductus Arteriosus)",
  image: "/uploads/treatments/pda-hero.webp",
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
    "pda-closure-patent-ductus-arteriosus",
    "congenital-heart-surgery",
    "vsd-closure-ventricular-septal-defect",
    "asd-closure-atrial-septal-defect",
    "coarctation-repair",
    "tof-repair-tetralogy-of-fallot",
    "heart-valve-replacement",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VSD, COA, VALVE, PACEMAKER, CABG, ADR, BENTALL],
  status: "published" as const,
  featured: true,
  sortOrder: 56,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "PDA Closure Surgery in India",
      shortDescription:
        "PDA closure in India stops abnormal flow through a persistent ductus. GAF planning is $3,500–$8,500, typically 3–8 nights.",
      editorialBody: body,
      process: [
        {
          id: "pda-step-1",
          title: "Share echo",
          description:
            "The family provides echocardiography, current weight and pulmonary-pressure notes before anyone books travel.",
        },
        {
          id: "pda-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and interventional team review whether the case is observation, device, coil or ligation.",
        },
        {
          id: "pda-step-3",
          title: "Name the product",
          description:
            "The team writes device closure, coil or surgical ligation after anatomy and pulmonary-pressure review.",
        },
        {
          id: "pda-step-4",
          title: "Itemized estimate",
          description:
            "GAF PDA closure planning is $3,500–$8,500. Neighbouring congenital heart surgery is $8,000–$28,000.",
        },
        {
          id: "pda-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A premature or collapsing infant belongs in a local emergency department.",
        },
        {
          id: "pda-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, weight, saturation and fitness after arrival.",
        },
        {
          id: "pda-step-7",
          title: "Close the named duct",
          description: "Device, coil or ligation proceeds only after the product is named.",
        },
        {
          id: "pda-step-8",
          title: "Watch residual flow",
          description: "Access site, residual shunt and nearby-vessel flow are watched before discharge.",
        },
        {
          id: "pda-step-9",
          title: "Follow-up echo",
          description:
            "The family leaves with an echocardiography plan and who will watch residual shunt after returning home.",
        },
      ],
      preparation:
        "Share echocardiography images, current weight and pulmonary-pressure notes so the congenital team can judge device versus ligation.",
      recovery:
        "Groin-site care is common after device closure. GAF planning is typically 3–8 nights, with parent stay expected.",
      hospitalStay: "Typically 3–8 nights; parent stay expected. Premature and complex infants can stay longer.",
      recoveryPeriod:
        "Uncomplicated catheter cases often recover faster than surgical ligation. Activity waits on the treating team.",
      followUp:
        "Request a written summary covering the closure type, residual-shunt plan, imaging dates and who will follow the child after returning home.",
      importantConsiderations:
        "A premature or collapsing infant is a local emergency. Severe pulmonary hypertension can make closure unsafe. Device closure is not assumed for every duct.",
      treatmentType: "PDA Closure / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric catheter laboratories, congenital theatres and ICUs in India",
      technology:
        "Transcatheter occluders and selected coils, neighbouring surgical ligation or division, echocardiography-guided seating",
      searchKeywords: [
        "PDA closure surgery in India",
        "PDA device closure in India",
        "PDA surgery in India",
        "patent ductus arteriosus closure in India",
        "PDA ligation in India",
        "PDA closure cost in India",
      ],
      faqs: [
        {
          id: "pda-faq-1",
          question: "How much does PDA closure cost in India?",
          answer:
            "GAF Healthcare planning for PDA closure is $3,500–$8,500, typically 3–8 nights, with parent stay expected. US comparison is $20,000–$60,000.",
        },
        {
          id: "pda-faq-2",
          question: "What is PDA?",
          answer: "A persistent connection between the aorta and pulmonary artery after birth.",
        },
        {
          id: "pda-faq-3",
          question: "Is PDA closure open-heart surgery?",
          answer:
            "Usually no. Device closure and surgical ligation generally close the duct without opening the heart chambers.",
        },
        {
          id: "pda-faq-4",
          question: "Can PDA be treated without surgery?",
          answer:
            "Yes. Transcatheter device or coil closure is preferred for many suitable patients. Some small ducts can be observed.",
        },
        {
          id: "pda-faq-5",
          question: "How long is hospital stay after PDA closure?",
          answer:
            "Uncomplicated catheter cases are often short. GAF planning is typically 3–8 nights. Premature infants often stay longer.",
        },
        {
          id: "pda-faq-6",
          question: "Can PDA come back after closure?",
          answer:
            "A successfully occluded PDA usually stays closed. Residual flow is why follow-up echocardiography is important.",
        },
        {
          id: "pda-faq-7",
          question: "Can adults undergo PDA closure in India?",
          answer:
            "Yes. Adults with a significant left-to-right shunt and safe pulmonary pressures may have catheter-based closure.",
        },
        {
          id: "pda-faq-8",
          question: "Can international families travel for a premature infant with PDA?",
          answer:
            "A premature or collapsing infant should be stabilized locally first. Planned travel is only for children the team confirms are fit.",
        },
        {
          id: "pda-faq-9",
          question: "Which city in India is best for PDA closure?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "pda-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Poor feeding, grey or blue skin, severe breathing difficulty or shock in a baby belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "pda-faq-11",
          question: "Is there a GAF ASD, TOF or Fontan treatment page?",
          answer:
            "No. ASD-closure, Tetralogy-of-Fallot and Glenn treatment pages are not live. Neighbouring sheets exist. VSD, coarctation and arterial-switch lists sit on those treatment pages. Fontan lists sit on the Fontan procedure page.",
        },
        {
          id: "pda-faq-12",
          question: "Does every PDA need closure?",
          answer:
            "No. A small, quiet PDA may be observed. Closure is considered when size, shunt, symptoms, heart enlargement or pulmonary pressure make it significant.",
        },
      ],
      imageAlt: "Educational illustration of an unlabeled open duct between the aorta and pulmonary artery",
      seoTitle: "PDA Closure Surgery in India: Procedure, Cost, Recovery & Hospitals",
      metaDescription:
        "Learn about PDA closure surgery in India, including device closure, surgical ligation, GAF planning $3,500–$8,500, recovery and how to send echocardiography.",
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

function scrubPdaNotLive(text: string) {
  return text
    .replace("There is no live GAF ASD-closure, PDA-closure, Tetralogy-of-Fallot,", "There is no live GAF ASD-closure, Tetralogy-of-Fallot,")
    .replace(
      "There is no live GAF ASD-closure, PDA-closure, Tetralogy-of-Fallot or pediatric-cardiac-surgery-only treatment page.",
      "There is no live GAF ASD-closure, Tetralogy-of-Fallot or pediatric-cardiac-surgery-only treatment page.",
    )
    .replace("There is no live GAF PDA-closure or ASD-closure treatment page.", "There is no live GAF ASD-closure treatment page.")
    .replace(
      "ASD-closure, PDA-closure, Tetralogy-of-Fallot and balloon-coarctation-only treatment pages are not live on this site.",
      "ASD-closure, Tetralogy-of-Fallot and balloon-coarctation-only treatment pages are not live on this site.",
    )
    .replace(
      "No. ASD-closure, PDA-closure, Tetralogy-of-Fallot and pediatric-cardiac-surgery-only treatment pages are not live.",
      "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live.",
    )
    .replace(
      "ASD-closure, PDA-closure, Tetralogy-of-Fallot, pulmonary-valve-replacement and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
      "ASD-closure, Tetralogy-of-Fallot, pulmonary-valve-replacement and pediatric-cardiac-surgery-only treatment pages are not live on this site.",
    );
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row?.translations?.en?.editorialBody) return;
  const next = scrubPdaNotLive(row.translations.en.editorialBody);
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

patchEditorial(COA);
patchEditorial(VSD);
patchFaqAnswer(
  COA,
  "PDA-closure",
  "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live. Neighbouring sheets exist. VSD lists sit on the VSD surgery page. PDA lists sit on the PDA closure surgery page.",
);
patchFaqAnswer(
  VSD,
  "PDA-closure",
  "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live. Use this page and the named congenital-heart-surgery sheet. PDA lists sit on the PDA closure surgery page.",
);

linkRelated(VSD, VSD_NEEDLE, ADDITION);
linkRelated(COA, COA_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(ADR, ADR_NEEDLE, ADDITION);
linkRelated(BENTALL, BENTALL_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [coarctation repair surgery in India](https://gaf.healthcare/treatments/coarctation-repair-surgery-in-india).",
    ", [coarctation repair surgery in India](https://gaf.healthcare/treatments/coarctation-repair-surgery-in-india) and [PDA closure surgery in India](https://gaf.healthcare/treatments/pda-closure-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  const scrubbed = scrubPdaNotLive(text);
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
patchMarkdown(resolve("scripts/coarctation-repair-treatment-body.md"), COA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/bentall-procedure-treatment-body.md"), BENTALL_NEEDLE, ADDITION);
