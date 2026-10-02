import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

const body = readFileSync(resolve("scripts/penile-implantation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "penile-implantation-in-india");
const now = "2026-10-02T11:00:00.000Z";
const SLUG = "penile-implantation-in-india";
const RP = "radical-prostatectomy-in-india";
const ADDITION =
  " Named implant lists sit on [Penile Implantation in India](/treatments/penile-implantation-in-india).";
const RP_NEEDLE = "There is no live GAF penile-implantation treatment page.";
const RP_NEEDLE_CLUSTER =
  "There is no live GAF TURP, HoLEP, GreenLight, robotic-prostatectomy-only or penile-implantation treatment page.";
const RP_CLUSTER_REPLACEMENT =
  "There is no live GAF TURP, HoLEP, GreenLight or robotic-prostatectomy-only treatment page. Named implant lists sit on [Penile Implantation in India](/treatments/penile-implantation-in-india).";

const treatment = {
  id: existing?.id ?? "d8e9f3b2-5f71-0e62-f29d-8b3c6e9f2d47",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Penile Implantation in India",
  specialtySlug: "urology",
  subspecialty: "Andrology",
  category: "Penile Implant",
  image: "/uploads/treatments/pi-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anjani-kumar-agrawal",
    "dr-shafiq-ahmed",
    "dr-sanish-shrikant-shringarpure",
    "dr-sandesh-parab",
    "dr-pramod-br",
    "dr-vishwanath-s",
    "dr-duraisamy-s",
    "dr-nitesh-jain",
    "dr-srikanth-munna",
    "dr-k-v-r-prasad",
  ],
  hospitalSlugs: [
    "max-smart-super-speciality-hospital-saket",
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "medicover-hospital-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "yashoda-hospitals-hi-tech-city",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "penile-implant",
    "varicocele-surgery",
    "urethroplasty",
    "turp-transurethral-resection-of-the-prostate",
    "holep-holmium-laser-enucleation",
    "greenlight-laser-surgery",
    "radical-prostatectomy",
  ],
  relatedTreatmentSlugs: [RP],
  status: "published" as const,
  featured: true,
  sortOrder: 66,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Penile Implantation in India",
      shortDescription:
        "Penile implantation in India is named after the device — malleable, two-piece or three-piece — not a brochure. GAF planning is $5,000–$12,000, typically 1–3 nights.",
      editorialBody: body,
      process: [
        {
          id: "pi-step-1",
          title: "Share records",
          description:
            "The patient provides ED history, prior treatments, diabetes results and any prostate-surgery notes before anyone books travel.",
        },
        {
          id: "pi-step-2",
          title: "Andrology review",
          description:
            "A urologist or andrologist reviews whether a prosthesis, further tablets, injections or a vacuum trial is the honest product.",
        },
        {
          id: "pi-step-3",
          title: "Name the device",
          description:
            "The team writes malleable, two-piece or three-piece only after anatomy, hand function and infection risk are reviewed.",
        },
        {
          id: "pi-step-4",
          title: "Itemized estimate",
          description:
            "GAF penile-implant planning is $5,000–$12,000. Neighbouring varicocele is $1,500–$4,200 when fertility, not rigidity, is the product.",
        },
        {
          id: "pi-step-5",
          title: "Travel if fit",
          description:
            "Stable planned cases travel after records review. Fever with pus, inability to pass urine or chest pain is a local emergency.",
        },
        {
          id: "pi-step-6",
          title: "Repeat essential tests",
          description: "The receiving unit confirms labs, HbA1c and fitness after arrival.",
        },
        {
          id: "pi-step-7",
          title: "Deliver the named implant",
          description: "The named malleable or inflatable prosthesis proceeds only after the model is written down.",
        },
        {
          id: "pi-step-8",
          title: "Ward and wound care",
          description: "Pain, swelling and urine flow are watched before discharge.",
        },
        {
          id: "pi-step-9",
          title: "Device teaching",
          description:
            "The patient leaves with implant identification, pump instructions when healing allows, and who will follow them after returning home.",
        },
      ],
      preparation:
        "Share ED history, prior treatments, diabetes control and any prostate-surgery notes so the team can judge a prosthesis versus further conservative treatment.",
      recovery:
        "Swelling and scrotal discomfort ease over days. GAF planning is 1–3 nights. Sexual activity usually waits 4–6 weeks until the surgeon teaches the device.",
      hospitalStay: "Typically 1–3 nights.",
      recoveryPeriod:
        "Light activity resumes over 1–2 weeks. Device use and intercourse commonly wait 4–6 weeks. Follow-up continues after travel home.",
      followUp:
        "Request a written summary covering the implant model, infection signs, when the pump may be used and who will follow the patient after returning home.",
      importantConsiderations:
        "A penile implant is elective prosthetic surgery. GAF planning is $5,000–$12,000. Fever with pus, heavy bleeding, inability to pass urine or chest pain belongs in a local emergency department.",
      treatmentType: "Penile Implant / Andrology",
      treatmentSetting: "Accredited partner urology theatres and wards in India",
      technology:
        "Malleable, two-piece and three-piece inflatable penile prostheses, selected Peyronie's modelling, neighbouring TURP, HoLEP and GreenLight sheets",
      searchKeywords: [
        "Penile Implantation in India",
        "Penile implant cost in India",
        "Penile implant surgery in India",
        "Penile prosthesis in India",
        "Inflatable penile implant in India",
        "Malleable penile implant in India",
        "Penile implant after prostate surgery",
        "Penile implant for erectile dysfunction",
        "Three-piece penile implant",
        "Penile implant recovery",
      ],
      faqs: [
        {
          id: "pi-faq-1",
          question: "What is penile implantation?",
          answer:
            "Surgery that places a prosthesis inside the corporal chambers so selected men with erectile dysfunction can obtain mechanical rigidity for intercourse.",
        },
        {
          id: "pi-faq-2",
          question: "What are the main implant types?",
          answer: "Malleable or semi-rigid rods, and inflatable two-piece or three-piece prostheses.",
        },
        {
          id: "pi-faq-3",
          question: "How much does penile implant surgery cost in India?",
          answer:
            "GAF Healthcare planning is $5,000–$12,000, typically 1–3 nights. US comparison is $18,000–$40,000.",
        },
        {
          id: "pi-faq-4",
          question: "How long is hospital stay after penile implantation?",
          answer: "GAF planning is typically 1–3 nights.",
        },
        {
          id: "pi-faq-5",
          question: "When can I have sex after surgery?",
          answer:
            "Usually after about 4–6 weeks, only when the surgeon confirms healing and teaches device use.",
        },
        {
          id: "pi-faq-6",
          question: "Does a penile implant restore natural erections?",
          answer: "No. The prosthesis provides mechanical rigidity rather than restoring the biological erection.",
        },
        {
          id: "pi-faq-7",
          question: "Does it increase sexual desire?",
          answer: "No. Desire, orgasm and ejaculation are separate from mechanical rigidity.",
        },
        {
          id: "pi-faq-8",
          question: "Can diabetic patients have an implant?",
          answer:
            "Selected men can. Glucose should be managed because infection risk tracks glycaemic control.",
        },
        {
          id: "pi-faq-9",
          question: "Can it be used after prostate cancer surgery?",
          answer:
            "Yes, when erectile dysfunction persists after conservative treatment. The radical-prostatectomy list is a different product.",
        },
        {
          id: "pi-faq-10",
          question: "Which is better, malleable or inflatable?",
          answer:
            "Neither is universally better. Inflatable systems offer more control. Malleable systems are simpler to operate.",
        },
        {
          id: "pi-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "Fever with pus or spreading redness, heavy bleeding, inability to pass urine, sudden device displacement, chest pain or fainting belongs in a local emergency department.",
        },
        {
          id: "pi-faq-12",
          question: "Which city in India is right for penile implantation?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
      ],
      imageAlt: "Educational unlabeled schematic of the bladder, urethra and paired corporal chambers",
      seoTitle: "Penile Implantation in India: Cost, Surgery, Types & Recovery",
      metaDescription:
        "Learn about penile implantation in India, including penile implant cost, types, surgery, recovery, risks, lifespan, success, and how to choose a specialist urologist.",
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
  if (!editorial || editorial.includes(`/treatments/${SLUG}`)) return;
  if (editorial.includes(RP_NEEDLE_CLUSTER)) {
    row.translations!.en!.editorialBody = editorial.replace(RP_NEEDLE_CLUSTER, RP_CLUSTER_REPLACEMENT);
    return;
  }
  if (editorial.includes(needle)) {
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle}${addition}`);
  }
}

linkRelated(RP, RP_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [radical prostatectomy in India](https://gaf.healthcare/treatments/radical-prostatectomy-in-india).",
    ", [radical prostatectomy in India](https://gaf.healthcare/treatments/radical-prostatectomy-in-india) and [penile implantation in India](https://gaf.healthcare/treatments/penile-implantation-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string) {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  let next = text;
  if (text.includes(RP_NEEDLE_CLUSTER) && !text.includes(`/treatments/${SLUG}`)) {
    next = next.replace(RP_NEEDLE_CLUSTER, RP_CLUSTER_REPLACEMENT);
  }
  if (next.includes(RP_NEEDLE) && (next.match(new RegExp(RP_NEEDLE, "g")) ?? []).length) {
    next = next.replace(RP_NEEDLE, `${RP_NEEDLE}${ADDITION}`);
    if (next.includes(`${ADDITION}${ADDITION}`)) {
      next = next.replace(`${ADDITION}${ADDITION}`, ADDITION);
    }
  }
  if (next !== text) {
    writeFileSync(path, next);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/radical-prostatectomy-treatment-body.md"));
