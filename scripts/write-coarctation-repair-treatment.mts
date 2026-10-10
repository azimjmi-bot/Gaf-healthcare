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

const body = readFileSync(resolve("scripts/coarctation-repair-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "coarctation-repair-surgery-in-india");
const now = "2026-09-30T00:00:00.000Z";
const SLUG = "coarctation-repair-surgery-in-india";
const VSD = "ventricular-septal-defect-surgery-in-india";
const ADR = "aortic-dissection-repair-in-india";
const BENTALL = "bentall-procedure-in-india";
const VALVE = "heart-valve-replacement-in-india";
const CABG = "cabg-surgery-in-india";
const TAVR = "tavr-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const ADDITION =
  " Coarctation lists sit on [Coarctation Repair Surgery in India](/treatments/coarctation-repair-surgery-in-india).";
const VSD_NEEDLE = "This page is the named VSD-surgery product.";
const ADR_NEEDLE = "This page is the named aortic-dissection-repair product.";
const BENTALL_NEEDLE = "This page is the named Bentall-procedure product.";
const VALVE_NEEDLE = "This page is the named surgical heart-valve-replacement product.";
const CABG_NEEDLE = "This page is the named first-time CABG product.";
const TAVR_NEEDLE = "This page is the named TAVR/TAVI product.";
const PACEMAKER_NEEDLE = "This page is the named conventional pacemaker product.";

const treatment = {
  id: existing?.id ?? "e4b7a2c8-3d61-9f50-a18e-7c2d5b8f1e36",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Coarctation Repair Surgery in India",
  specialtySlug: "pediatric-cardiac-surgery",
  subspecialty: "Congenital Heart Surgery",
  category: "Coarctation Repair",
  image: "/uploads/treatments/coarctation-hero.webp",
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
    "coarctation-repair",
    "congenital-heart-surgery",
    "vsd-closure-ventricular-septal-defect",
    "asd-closure-atrial-septal-defect",
    "pda-closure-patent-ductus-arteriosus",
    "tof-repair-tetralogy-of-fallot",
    "aortic-valve-replacement",
    "heart-valve-replacement",
    "aortic-root-replacement",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [VSD, ADR, BENTALL, VALVE, CABG, TAVR, PACEMAKER],
  status: "published" as const,
  featured: true,
  sortOrder: 55,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Coarctation Repair Surgery in India",
      shortDescription:
        "Coarctation repair in India widens a congenital aortic narrowing. GAF planning is $6,000–$15,000, typically 6–14 nights.",
      editorialBody: body,
      process: [
        {
          id: "coa-step-1",
          title: "Share echo",
          description:
            "The family provides echocardiography, four-limb pressures and CT or MRI before anyone books travel.",
        },
        {
          id: "coa-step-2",
          title: "Congenital team review",
          description:
            "A pediatric cardiologist and congenital surgeon review whether the case is surgery, balloon, stent or urgent local care.",
        },
        {
          id: "coa-step-3",
          title: "Name the product",
          description:
            "The team writes end-to-end repair, extended arch work, balloon or stent after anatomy review.",
        },
        {
          id: "coa-step-4",
          title: "Itemized estimate",
          description:
            "GAF coarctation repair planning is $6,000–$15,000. Neighbouring congenital heart surgery is $8,000–$28,000.",
        },
        {
          id: "coa-step-5",
          title: "Travel only if stable",
          description:
            "Stable planned cases travel after records review. A shocked newborn belongs in a local emergency department.",
        },
        {
          id: "coa-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms echo, pulses, kidney function and fitness after arrival.",
        },
        {
          id: "coa-step-7",
          title: "Widen the named aorta",
          description:
            "Surgical reconstruction, balloon or stent proceeds only after the product is named.",
        },
        {
          id: "coa-step-8",
          title: "Cardiac ICU and ward",
          description: "Upper and lower-body pressure, pulses, kidneys and feeding are watched before discharge.",
        },
        {
          id: "coa-step-9",
          title: "Lifelong follow-up",
          description:
            "The family leaves with a blood-pressure plan, imaging dates and who will watch for recoarctation after returning home.",
        },
      ],
      preparation:
        "Share echocardiography images, four-limb blood pressures and CT or MRI so the congenital team can judge surgery versus balloon or stent.",
      recovery:
        "Blood-pressure swings are common after repair. GAF planning is typically 6–14 nights, with parent stay expected.",
      hospitalStay: "Typically 6–14 nights; parent stay expected. Newborns and complex cases can stay longer.",
      recoveryPeriod: "Several weeks before usual energy returns. Activity and air travel wait on the treating team.",
      followUp:
        "Request a written summary covering the repair type, blood-pressure plan, imaging dates and who will follow recoarctation after returning home.",
      importantConsiderations:
        "A critically ill newborn is a local emergency. Recoarctation and hypertension need lifelong surveillance. Balloon or stent is not assumed for every child.",
      treatmentType: "Coarctation Repair / Congenital Heart Surgery",
      treatmentSetting: "Accredited partner pediatric and congenital cardiac theatres and ICUs in India",
      technology:
        "End-to-end and extended arch reconstruction, selected patch or graft repair, neighbouring balloon angioplasty and stenting",
      searchKeywords: [
        "coarctation repair surgery in India",
        "coarctation of aorta surgery in India",
        "coarctation repair cost in India",
        "coarctation surgery for newborns",
        "coarctation repair for adults",
        "aortic coarctation surgery",
      ],
      faqs: [
        {
          id: "coa-faq-1",
          question: "How much does coarctation repair cost in India?",
          answer:
            "GAF Healthcare planning for coarctation repair is $6,000–$15,000, typically 6–14 nights, with parent stay expected. US comparison is $40,000–$110,000.",
        },
        {
          id: "coa-faq-2",
          question: "What is coarctation?",
          answer:
            "A congenital narrowing of part of the aorta that can restrict blood flow to the lower body and raise arm blood pressure.",
        },
        {
          id: "coa-faq-3",
          question: "Is coarctation surgery open-heart surgery?",
          answer:
            "The repair generally reconstructs the aorta rather than opening the heart chambers. It is still major cardiovascular surgery.",
        },
        {
          id: "coa-faq-4",
          question: "Can coarctation be treated without surgery?",
          answer:
            "Yes. Balloon angioplasty and stenting are options for selected older children, adults or recurrent narrowing after imaging.",
        },
        {
          id: "coa-faq-5",
          question: "How long is hospital stay after coarctation repair?",
          answer:
            "Many patients need several days. GAF planning is typically 6–14 nights. Newborns and complex cases often stay longer.",
        },
        {
          id: "coa-faq-6",
          question: "Can coarctation come back after surgery?",
          answer:
            "Yes. Recoarctation, aneurysm and hypertension are why lifelong follow-up and periodic imaging are important.",
        },
        {
          id: "coa-faq-7",
          question: "Can adults undergo coarctation repair in India?",
          answer:
            "Yes. Adults with native or recurrent coarctation may have surgery or catheter-based treatment when clinically indicated.",
        },
        {
          id: "coa-faq-8",
          question: "Can international families travel for a newborn with coarctation?",
          answer:
            "A critically ill or duct-dependent newborn should be stabilized locally first. Planned travel is only for children the team confirms are fit.",
        },
        {
          id: "coa-faq-9",
          question: "Which city in India is best for coarctation repair?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "coa-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Poor feeding, grey skin, weak leg pulses, severe breathing difficulty or shock in a baby belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "coa-faq-11",
          question: "Is there a GAF ASD, PDA or TOF treatment page?",
          answer:
            "No. ASD-closure and Tetralogy-of-Fallot treatment pages are not live. Neighbouring sheets exist. VSD lists sit on the VSD surgery page. PDA lists sit on the PDA closure surgery page.",
        },
        {
          id: "coa-faq-12",
          question: "Does my child need lifelong follow-up?",
          answer:
            "Yes. Blood pressure, recurrent narrowing and the repaired aorta need long-term congenital cardiology review.",
        },
      ],
      imageAlt: "Educational illustration of a pinched aortic arch used as the coarctation repair hero",
      seoTitle: "Coarctation Repair Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about coarctation repair surgery in India, including surgery vs stent, GAF planning $6,000–$15,000, recovery and how to send echocardiography.",
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

linkRelated(VSD, VSD_NEEDLE, ADDITION);
linkRelated(ADR, ADR_NEEDLE, ADDITION);
linkRelated(BENTALL, BENTALL_NEEDLE, ADDITION);
linkRelated(VALVE, VALVE_NEEDLE, ADDITION);
linkRelated(CABG, CABG_NEEDLE, ADDITION);
linkRelated(TAVR, TAVR_NEEDLE, ADDITION);
linkRelated(PACEMAKER, PACEMAKER_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Bentall procedure in India](https://gaf.healthcare/treatments/bentall-procedure-in-india).",
    ", [Bentall procedure in India](https://gaf.healthcare/treatments/bentall-procedure-in-india) and [coarctation repair surgery in India](https://gaf.healthcare/treatments/coarctation-repair-surgery-in-india).",
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

patchMarkdown(resolve("scripts/vsd-surgery-treatment-body.md"), VSD_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aortic-dissection-repair-treatment-body.md"), ADR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/bentall-procedure-treatment-body.md"), BENTALL_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/heart-valve-replacement-treatment-body.md"), VALVE_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/cabg-surgery-treatment-body.md"), CABG_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, ADDITION);
