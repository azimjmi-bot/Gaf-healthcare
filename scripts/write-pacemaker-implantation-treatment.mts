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

const body = readFileSync(resolve("scripts/pacemaker-implantation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "pacemaker-implantation-in-india");
const now = "2026-09-29T08:30:00.000Z";
const SLUG = "pacemaker-implantation-in-india";
const PCI = "coronary-angioplasty-in-india";
const PCI_NEEDLE =
  "Angioplasty treats a blockage. It does not eliminate the underlying tendency to develop coronary artery disease.";
const PCI_ADDITION =
  "A stent is not a pacemaker. Named pacing lists sit on [Pacemaker Implantation in India](/treatments/pacemaker-implantation-in-india).";

const treatment = {
  id: existing?.id ?? "b4d0f6a8-1c59-4e8d-0f2b-9d5e7c4a8b11",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Pacemaker Implantation in India",
  specialtySlug: "cardiology",
  subspecialty: "Cardiac Electrophysiology",
  category: "Pacemaker Implantation",
  image: "/uploads/treatments/pacemaker-dual-chamber.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-col-viney-jetley",
    "dr-col-balbir-kalra",
    "dr-brajesh-kumar-kunwar",
    "dr-charan-reddy",
    "dr-abhijit-vilas-kulkarni",
    "dr-girish-b-navasundi",
    "dr-prakash-chand-jain",
    "dr-gobu-p",
    "dr-a-sreenivas-kumar",
    "dr-ajay-j-swamy",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "apollo-hospitals-navi-mumbai",
    "kims-hospitals-thane",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "gleneagles-healthcity-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "pacemaker-implantation",
    "leadless-pacemaker-implantation",
    "crt-crt-d-implantation",
    "icd-implantation-implantable-cardioverter-defibrillator",
    "atrial-fibrillation-ablation",
    "coronary-angioplasty-stenting",
  ],
  relatedTreatmentSlugs: [PCI],
  status: "published" as const,
  featured: true,
  sortOrder: 24,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Pacemaker Implantation in India",
      shortDescription:
        "Pacemaker implantation in India is planned from the named pacing product — conventional, leadless, CRT or ICD — not a generic heart-device package.",
      editorialBody: body,
      process: [
        {
          id: "pacemaker-step-1",
          title: "Share medical records",
          description:
            "The patient provides ECG, Holter files, echocardiography and a short description of fainting, pauses or other symptoms.",
        },
        {
          id: "pacemaker-step-2",
          title: "Electrophysiology review",
          description:
            "A cardiologist or electrophysiologist reviews whether the target is sinus-node dysfunction, heart block, CRT, an ICD or observation.",
        },
        {
          id: "pacemaker-step-3",
          title: "Device selection",
          description:
            "The team names a conventional pacemaker, leadless capsule, CRT or ICD rather than a generic device brochure.",
        },
        {
          id: "pacemaker-step-4",
          title: "Medical optimisation",
          description:
            "Medicines that slow the heart, infection risk, anticoagulation and MRI-conditional needs are addressed before a planned implant.",
        },
        {
          id: "pacemaker-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus device, leads, programming and stay, not a brochure overnight package.",
        },
        {
          id: "pacemaker-step-6",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fainting, collapse or complete heart block with instability is a local emergency.",
        },
        {
          id: "pacemaker-step-7",
          title: "Implantation",
          description:
            "The named generator and leads, or a leadless capsule, are implanted and programmed in the cath lab or EP room.",
        },
        {
          id: "pacemaker-step-8",
          title: "Wound and rhythm monitoring",
          description:
            "The team watches the pocket, lead position, pacing thresholds and symptoms in the first day after the procedure.",
        },
        {
          id: "pacemaker-step-9",
          title: "Programming and follow-up plan",
          description:
            "Settings, identification card, MRI advice and the interrogation schedule are confirmed before discharge.",
        },
        {
          id: "pacemaker-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the named device, arm restrictions, warning signs and local follow-up.",
        },
      ],
      preparation:
        "Share dedicated ECG and Holter files, echocardiography and the medication list so the team can judge conventional pacing versus leadless versus CRT versus ICD versus observation.",
      recovery:
        "GAF planning notes 1-3 nights after pacemaker implantation. Arm restrictions and device checks continue after pocket comfort has already improved.",
      hospitalStay: "Typically 1-3 nights after pacemaker implantation",
      recoveryPeriod:
        "Several weeks of wound and arm precautions, then gradual return to activity according to the treating team.",
      followUp:
        "Request a written summary covering the named device, lead details, battery plan, MRI conditions and the interrogation schedule after returning home.",
      importantConsiderations:
        "A brochure pacemaker price is not a pacing plan. Planning ranges are not hospital quotations. Fainting, collapse, severe breathlessness or chest pain belongs in a local emergency department.",
      treatmentType: "Cardiac pacemaker implantation",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Single- or dual-chamber transvenous pacing, conduction-system pacing, leadless capsules or CRT according to the rhythm disorder",
      searchKeywords: [
        "pacemaker implantation in India",
        "pacemaker cost in India",
        "dual chamber pacemaker India",
        "leadless pacemaker India",
        "CRT pacemaker India",
        "heart block pacemaker India",
        "pacemaker surgery recovery",
        "cardiac electrophysiologist India",
      ],
      faqs: [
        {
          id: "pacemaker-faq-1",
          question: "How much does pacemaker implantation cost in India?",
          answer:
            "GAF planning is approximately $3,500-$9,000 for pacemaker implantation. Named leadless pacing is $12,000-$25,000 and CRT/CRT-D is $10,000-$22,000 when those products belong on the plan.",
        },
        {
          id: "pacemaker-faq-2",
          question: "Is a pacemaker the same as a stent?",
          answer:
            "No. A stent opens a narrowed coronary artery. A pacemaker treats selected slow heart rhythms.",
        },
        {
          id: "pacemaker-faq-3",
          question: "How long is the hospital stay after pacemaker implantation?",
          answer:
            "GAF planning is typically 1-3 nights. Some hospital pages quote same-day discharge.",
        },
        {
          id: "pacemaker-faq-4",
          question: "Does a slow heart rate always need a pacemaker?",
          answer:
            "No. A low heart rate alone does not automatically mean implantation. Symptoms, ECG and the cause of bradycardia decide.",
        },
        {
          id: "pacemaker-faq-5",
          question: "Is pacemaker implantation a major surgery?",
          answer:
            "A conventional implant is generally a minimally invasive procedure under local anaesthesia, not open-heart surgery.",
        },
        {
          id: "pacemaker-faq-6",
          question: "How long does a pacemaker battery last?",
          answer:
            "Longevity varies. The NHS currently describes around 6-7 years for many conventional systems. Device checks identify replacement before it becomes urgent.",
        },
        {
          id: "pacemaker-faq-7",
          question: "Can I have an MRI with a pacemaker?",
          answer:
            "Some modern systems are MRI-conditional. Safety depends on the complete implanted system and specified conditions.",
        },
        {
          id: "pacemaker-faq-8",
          question: "Can international patients have pacemaker implantation in India?",
          answer:
            "Yes. ECG and Holter files should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "pacemaker-faq-9",
          question: "Which city in India is best for pacemaker implantation?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with electrophysiology and device follow-up for the named diagnosis.",
        },
        {
          id: "pacemaker-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Fainting, collapse, severe breathlessness, chest pain or sudden recurrence of pre-implant symptoms belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "pacemaker-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 1-3 nights. Combined evaluation, programming and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "pacemaker-faq-12",
          question: "Does a leadless pacemaker use the conventional price?",
          answer:
            "No. Named leadless pacemaker implantation is $12,000-$25,000, not the $3,500-$9,000 conventional pacemaker band.",
        },
        {
          id: "pacemaker-faq-13",
          question: "Does CRT use the pacemaker sheet?",
          answer:
            "No. Named CRT/CRT-D implantation is $10,000-$22,000 because resynchronization is a different clinical product.",
        },
        {
          id: "pacemaker-faq-14",
          question: "Can children use the adult pacemaker sheet?",
          answer:
            "Not by default. Paediatric pacing is quoted after paediatric electrophysiology review rather than from the adult $3,500-$9,000 band.",
        },
      ],
      imageAlt:
        "Educational illustration of a dual-chamber pacemaker generator and leads",
      seoTitle: "Pacemaker Implantation in India: Cost, Types & Recovery",
      metaDescription:
        "Learn about pacemaker implantation in India, including conventional, leadless and CRT devices, USD cost, recovery, follow-up and how to choose a cardiologist.",
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

linkRelated(PCI, PCI_NEEDLE, PCI_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [coronary angioplasty in India](https://gaf.healthcare/treatments/coronary-angioplasty-in-india).",
    ", [coronary angioplasty in India](https://gaf.healthcare/treatments/coronary-angioplasty-in-india) and [pacemaker implantation in India](https://gaf.healthcare/treatments/pacemaker-implantation-in-india).",
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

patchMarkdown(resolve("scripts/coronary-angioplasty-treatment-body.md"), PCI_NEEDLE, PCI_ADDITION);
