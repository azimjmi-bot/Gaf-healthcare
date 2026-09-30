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

const body = readFileSync(resolve("scripts/coronary-angioplasty-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "coronary-angioplasty-in-india");
const now = "2026-09-29T08:00:00.000Z";
const SLUG = "coronary-angioplasty-in-india";

const treatment = {
  id: existing?.id ?? "a3c9e5f7-0b48-4d7c-9e1a-8c4f6d3b7a00",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Coronary Angioplasty in India",
  specialtySlug: "cardiology",
  subspecialty: "Interventional Cardiology",
  category: "Coronary Angioplasty",
  image: "/uploads/treatments/coronary-angioplasty-plaque.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-col-balbir-kalra",
    "dr-abhinav-chhabra",
    "dr-charan-lanjewar",
    "dr-brajesh-kumar-kunwar",
    "dr-abhijit-vilas-kulkarni",
    "dr-girish-b-navasundi",
    "dr-a-b-gopalamurugan",
    "dr-gobu-p",
    "dr-a-sreenivas-kumar",
    "dr-ajay-j-swamy",
  ],
  hospitalSlugs: [
    "artemis-hospital",
    "medanta-gurgaon",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "gleneagles-healthcity-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "coronary-angioplasty-stenting",
    "coronary-angiography",
    "cto-angioplasty-chronic-total-occlusion",
    "cabg-coronary-artery-bypass-grafting",
  ],
  relatedTreatmentSlugs: [],
  status: "published" as const,
  featured: true,
  sortOrder: 23,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Coronary Angioplasty in India",
      shortDescription:
        "Coronary angioplasty in India is planned from the named PCI product — angiography, stenting or CTO work — not a generic heart-stent package.",
      editorialBody: body,
      process: [
        {
          id: "pci-step-1",
          title: "Share medical records",
          description:
            "The patient provides ECG, echocardiogram, angiography report and images, kidney function and a short description of current symptoms.",
        },
        {
          id: "pci-step-2",
          title: "Cardiology review",
          description:
            "An interventional cardiologist reviews whether the target is planned PCI, emergency ACS care, CTO work or a CABG discussion.",
        },
        {
          id: "pci-step-3",
          title: "Procedure selection",
          description:
            "The team names angiography, single-vessel PCI, complex or CTO PCI, or CABG rather than a generic stent package.",
        },
        {
          id: "pci-step-4",
          title: "Medical optimisation",
          description:
            "Antiplatelet strategy, kidney function, diabetes control and access-site plan are addressed before a planned procedure.",
        },
        {
          id: "pci-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus stent count, ICU, imaging adjuncts and emergency risk, not a brochure overnight package.",
        },
        {
          id: "pci-step-6",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Chest pain with breathlessness or radiating pain is a local emergency, not a reason to delay care for international travel.",
        },
        {
          id: "pci-step-7",
          title: "PCI",
          description:
            "The blockage is treated through the named radial or femoral corridor, with a stent when clinically appropriate.",
        },
        {
          id: "pci-step-8",
          title: "Access-site and rhythm monitoring",
          description:
            "The team watches for bleeding, chest pain, rhythm changes and kidney function in the first day after the procedure.",
        },
        {
          id: "pci-step-9",
          title: "Medicines and rehabilitation",
          description:
            "Dual antiplatelet therapy, statins and cardiac rehabilitation are added according to the presentation.",
        },
        {
          id: "pci-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the named procedure, stent details, antiplatelet plan, warning signs and the follow-up schedule.",
        },
      ],
      preparation:
        "Share dedicated angiogram images, ECG, echocardiography and kidney-function reports so the team can judge PCI versus medicines versus CABG.",
      recovery:
        "GAF planning notes 1-3 nights after coronary angioplasty and stenting. Antiplatelet medicines continue long after access-site comfort has already improved.",
      hospitalStay: "Typically 1-3 nights after coronary angioplasty and stenting",
      recoveryPeriod:
        "Several days after uncomplicated planned PCI, or substantially longer after a heart attack, depending on heart function and rehabilitation.",
      followUp:
        "Request a written summary covering the named procedure, stent type, antiplatelet duration, driving limits and the cardiology follow-up schedule after returning home.",
      importantConsiderations:
        "A brochure stent price is not a revascularization plan. Planning ranges are not hospital quotations. Chest pain with breathlessness, sweating or radiating pain belongs in a local emergency department.",
      treatmentType: "Percutaneous coronary intervention",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Radial or femoral access, balloon angioplasty, drug-eluting stents, and IVUS, OCT or FFR when anatomy requires them",
      searchKeywords: [
        "coronary angioplasty in India",
        "PCI in India",
        "heart stent procedure India",
        "coronary angioplasty cost in India",
        "PTCA in India",
        "drug-eluting stent India",
        "primary angioplasty India",
        "CTO angioplasty India",
      ],
      faqs: [
        {
          id: "pci-faq-1",
          question: "How much does coronary angioplasty cost in India?",
          answer:
            "GAF planning is approximately $3,200-$8,500 for coronary angioplasty and stenting. Named angiography is $400-$1,200 and CTO angioplasty is $5,500-$14,000 when those products belong on the plan.",
        },
        {
          id: "pci-faq-2",
          question: "Is a stent always required?",
          answer:
            "No. Stent placement is common during PCI when clinically appropriate, but selected lesions may be treated without a permanent stent.",
        },
        {
          id: "pci-faq-3",
          question: "How long is the hospital stay after angioplasty?",
          answer:
            "GAF planning is typically 1-3 nights. Some hospital pages quote same-day discharge after uncomplicated planned PCI.",
        },
        {
          id: "pci-faq-4",
          question: "Is angioplasty the same as bypass surgery?",
          answer:
            "No. Angioplasty opens the artery from inside with a catheter. CABG creates a new route around blocked arteries and is major cardiac surgery.",
        },
        {
          id: "pci-faq-5",
          question: "Can angioplasty be performed during a heart attack?",
          answer:
            "Yes, for appropriate acute coronary syndromes. That care belongs in a local emergency department, not in delayed international travel.",
        },
        {
          id: "pci-faq-6",
          question: "Are coronary stents price-capped in India?",
          answer:
            "Yes. NPPA notifies ceiling prices for coronary stents. The stent remains only one line on the hospital bill.",
        },
        {
          id: "pci-faq-7",
          question: "Will I need medicines after a stent?",
          answer:
            "Patients who receive a stent are commonly prescribed dual antiplatelet therapy. Never stop those medicines without speaking to the cardiologist.",
        },
        {
          id: "pci-faq-8",
          question: "Can international patients have coronary angioplasty in India?",
          answer:
            "Yes for stable planned cases. Angiogram images should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "pci-faq-9",
          question: "Which city in India is best for coronary angioplasty?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with a 24/7 cath lab for the named diagnosis.",
        },
        {
          id: "pci-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Chest pain with breathlessness, sweating, nausea, fainting or pain spreading to the arm, shoulder, jaw or back belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "pci-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 1-3 nights. Combined review, medicines and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "pci-faq-12",
          question: "Does CTO use the standard PCI price?",
          answer:
            "No. Named CTO angioplasty is $5,500-$14,000, not automatically the $3,200-$8,500 coronary-angioplasty band.",
        },
        {
          id: "pci-faq-13",
          question: "Does emergency primary PCI use the elective sheet?",
          answer:
            "Not by default. Emergency heart-attack cases, shock and extra devices are quoted after case review rather than from the elective $3,200-$8,500 band alone.",
        },
        {
          id: "pci-faq-14",
          question: "Can angiography and angioplasty happen in the same sitting?",
          answer:
            "Yes, when anatomy and clinical circumstances make immediate treatment appropriate. Same-sitting PCI is quoted after the angiogram, not from the diagnostic $400-$1,200 sheet alone.",
        },
      ],
      imageAlt:
        "Educational illustration of atherosclerotic plaque narrowing a coronary artery",
      seoTitle: "Coronary Angioplasty in India: Cost, PCI, Stent & Recovery",
      metaDescription:
        "Learn about coronary angioplasty in India, including PCI, stents, USD cost, recovery, antiplatelet therapy and how to choose an interventional cardiologist.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [hydrocephalus surgery in India](https://gaf.healthcare/treatments/hydrocephalus-surgery-in-india).",
    ", [hydrocephalus surgery in India](https://gaf.healthcare/treatments/hydrocephalus-surgery-in-india) and [coronary angioplasty in India](https://gaf.healthcare/treatments/coronary-angioplasty-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
