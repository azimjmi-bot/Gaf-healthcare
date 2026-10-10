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

const body = readFileSync(resolve("scripts/icd-implantation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "icd-device-implantation-in-india");
const now = "2026-09-29T09:00:00.000Z";
const SLUG = "icd-device-implantation-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const PCI = "coronary-angioplasty-in-india";
const PACEMAKER_NEEDLE =
  "A pacemaker treats selected slow rhythms. An ICD detects and treats dangerous ventricular arrhythmias and can deliver shocks.";
const PACEMAKER_ADDITION =
  "Named ICD lists sit on [ICD Device Implantation in India](/treatments/icd-device-implantation-in-india).";

const treatment = {
  id: existing?.id ?? "c5e1a7b9-2d60-4f9e-1a3c-0e6f8d5b9c22",
  slug: SLUG,
  previousSlugs: [],
  baseName: "ICD Device Implantation in India",
  specialtySlug: "cardiology",
  subspecialty: "Cardiac Electrophysiology",
  category: "ICD Implantation",
  image: "/uploads/treatments/icd-transvenous.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anil-saxena",
    "dr-col-viney-jetley",
    "dr-charan-reddy",
    "dr-b-c-kalmath",
    "dr-p-r-l-n-prasad",
    "dr-ravindranath-reddy-d-r",
    "dr-gobu-p",
    "dr-karthick-anjaneyan-j",
    "dr-b-hygriv-rao",
    "dr-ajay-j-swamy",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "apollo-hospitals-navi-mumbai",
    "kims-hospitals-thane",
    "gleneagles-hospitals-bengaluru",
    "medicover-hospital-bangalore",
    "gleneagles-healthcity-chennai",
    "rela-hospital",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "icd-implantation-implantable-cardioverter-defibrillator",
    "pacemaker-implantation",
    "leadless-pacemaker-implantation",
    "crt-crt-d-implantation",
    "atrial-fibrillation-ablation",
    "coronary-angioplasty-stenting",
  ],
  relatedTreatmentSlugs: [PACEMAKER, PCI],
  status: "published" as const,
  featured: true,
  sortOrder: 25,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "ICD Device Implantation in India",
      shortDescription:
        "ICD device implantation in India is planned from the named defibrillator product — transvenous ICD, S-ICD or CRT-D — not a generic heart-device package.",
      editorialBody: body,
      process: [
        {
          id: "icd-step-1",
          title: "Share medical records",
          description:
            "The patient provides ECG, Holter files, echocardiography and a short description of arrest, ventricular arrhythmia or sudden-death risk.",
        },
        {
          id: "icd-step-2",
          title: "Electrophysiology review",
          description:
            "A cardiologist or electrophysiologist reviews whether the target is primary prevention, secondary prevention, CRT-D, a pacemaker or observation.",
        },
        {
          id: "icd-step-3",
          title: "Device selection",
          description:
            "The team names a transvenous ICD, S-ICD or CRT-D rather than a generic device brochure.",
        },
        {
          id: "icd-step-4",
          title: "Medical optimisation",
          description:
            "Reversible arrhythmia triggers, heart-failure therapy, anticoagulation and infection risk are addressed before a planned implant.",
        },
        {
          id: "icd-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus device, leads, programming and stay, not a brochure overnight package.",
        },
        {
          id: "icd-step-6",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Collapse, ongoing ventricular arrhythmia or repeated shocks is a local emergency.",
        },
        {
          id: "icd-step-7",
          title: "Implantation",
          description:
            "The named generator and leads, or a subcutaneous electrode, are implanted and programmed in the cath lab or EP room.",
        },
        {
          id: "icd-step-8",
          title: "Wound and rhythm monitoring",
          description:
            "The team watches the pocket, lead position, sensing, therapies and symptoms in the first days after the procedure.",
        },
        {
          id: "icd-step-9",
          title: "Programming and follow-up plan",
          description:
            "Settings, identification card, shock instructions and the interrogation schedule are confirmed before discharge.",
        },
        {
          id: "icd-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the named device, arm restrictions, warning signs and local follow-up.",
        },
      ],
      preparation:
        "Share dedicated ECG and Holter files, echocardiography and the arrhythmia history so the team can judge a transvenous ICD versus S-ICD versus CRT-D versus a pacemaker versus observation.",
      recovery:
        "GAF planning notes 1-4 nights after ICD implantation. Arm restrictions and device checks continue after pocket comfort has already improved.",
      hospitalStay: "Typically 1-4 nights after ICD implantation",
      recoveryPeriod:
        "Several weeks of wound and arm precautions, then gradual return to activity according to the treating team.",
      followUp:
        "Request a written summary covering the named device, lead details, battery plan, shock instructions and the interrogation schedule after returning home.",
      importantConsiderations:
        "A brochure ICD price is not a defibrillator plan. Planning ranges are not hospital quotations. Collapse, severe chest pain, severe breathlessness or repeated shocks belongs in a local emergency department.",
      treatmentType: "ICD device implantation",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Single- or dual-chamber transvenous ICD, subcutaneous ICD or CRT-D according to the rhythm disorder and sudden-death risk",
      searchKeywords: [
        "ICD implantation in India",
        "ICD device implantation cost in India",
        "implantable cardioverter defibrillator India",
        "subcutaneous ICD India",
        "CRT-D implantation India",
        "ICD vs pacemaker",
        "sudden cardiac death ICD India",
        "cardiac electrophysiologist India",
      ],
      faqs: [
        {
          id: "icd-faq-1",
          question: "How much does ICD implantation cost in India?",
          answer:
            "GAF planning is approximately $8,000-$18,000 for ICD implantation. Named pacemaker implantation is $3,500-$9,000 and CRT/CRT-D is $10,000-$22,000 when those products belong on the plan.",
        },
        {
          id: "icd-faq-2",
          question: "Is an ICD the same as a pacemaker?",
          answer:
            "No. A pacemaker treats selected slow heart rhythms. An ICD detects and treats dangerous ventricular arrhythmias and can deliver shocks.",
        },
        {
          id: "icd-faq-3",
          question: "How long is the hospital stay after ICD implantation?",
          answer:
            "GAF planning is typically 1-4 nights. Complicated cases may require longer monitoring.",
        },
        {
          id: "icd-faq-4",
          question: "Does a low ejection fraction always need an ICD?",
          answer:
            "No. A reduced ejection fraction alone does not automatically mean implantation. Previous arrhythmias, heart function, reversible causes and overall sudden-death risk decide.",
        },
        {
          id: "icd-faq-5",
          question: "Is ICD implantation a major surgery?",
          answer:
            "A conventional implant is generally less invasive than open-heart surgery, but it remains an important cardiac procedure requiring specialist care.",
        },
        {
          id: "icd-faq-6",
          question: "How long does an ICD battery last?",
          answer:
            "Longevity varies with the device, pacing and therapies delivered. Device checks identify replacement before it becomes urgent.",
        },
        {
          id: "icd-faq-7",
          question: "Can an ICD prevent a heart attack?",
          answer:
            "No. An ICD treats certain dangerous electrical rhythms. It does not open blocked coronary arteries.",
        },
        {
          id: "icd-faq-8",
          question: "Can international patients have ICD implantation in India?",
          answer:
            "Yes. ECG, echo and arrhythmia records should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "icd-faq-9",
          question: "Which city in India is best for ICD implantation?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with electrophysiology and device follow-up for the named diagnosis.",
        },
        {
          id: "icd-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Collapse, severe chest pain, severe breathlessness or repeated ICD shocks belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "icd-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 1-4 nights. Combined evaluation, programming and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "icd-faq-12",
          question: "Does CRT-D use the ICD sheet?",
          answer:
            "No. Named CRT/CRT-D implantation is $10,000-$22,000 because resynchronization plus defibrillation is a different clinical product.",
        },
        {
          id: "icd-faq-13",
          question: "Does an S-ICD use the conventional ICD price?",
          answer:
            "Not by default. Subcutaneous ICD systems are quoted after electrophysiology review rather than from the $8,000-$18,000 transvenous ICD band.",
        },
        {
          id: "icd-faq-14",
          question: "Can children use the adult ICD sheet?",
          answer:
            "Not by default. Paediatric ICD use is quoted after paediatric electrophysiology review rather than from the adult $8,000-$18,000 band.",
        },
      ],
      imageAlt:
        "Educational illustration of a transvenous ICD generator and lead in the right ventricle",
      seoTitle: "ICD Device Implantation in India: Cost, Types & Recovery",
      metaDescription:
        "Learn about ICD device implantation in India, including transvenous ICD, S-ICD and CRT-D, USD cost, recovery, follow-up and how to choose a cardiologist.",
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
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle} ${addition}`);
  }
}

linkRelated(PACEMAKER, PACEMAKER_NEEDLE, PACEMAKER_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [pacemaker implantation in India](https://gaf.healthcare/treatments/pacemaker-implantation-in-india).",
    ", [pacemaker implantation in India](https://gaf.healthcare/treatments/pacemaker-implantation-in-india) and [ICD device implantation in India](https://gaf.healthcare/treatments/icd-device-implantation-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  let text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle} ${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, PACEMAKER_ADDITION);
