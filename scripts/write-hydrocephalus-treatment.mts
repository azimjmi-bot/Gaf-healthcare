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

const body = readFileSync(resolve("scripts/hydrocephalus-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "hydrocephalus-surgery-in-india");
const now = "2026-09-29T07:30:00.000Z";
const SLUG = "hydrocephalus-surgery-in-india";
const ENDOSCOPIC = "endoscopic-brain-surgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const ENDOSCOPIC_NEEDLE =
  "Neighbouring [hydrocephalus surgery](/costs/India/Neurosurgery/Hydrocephalus-Surgery) is **$3,000–$8,000** (typically **3–7 nights**) when a shunt list is the product.";
const ENDOSCOPIC_ADDITION =
  "The named shunt and ETV products sit on [Hydrocephalus Surgery in India](/treatments/hydrocephalus-surgery-in-india).";
const BRAIN_NEEDLE =
  "Conversely, a tumour causing significant pressure, seizures, neurological deterioration, hydrocephalus, or other complications may require intervention.";
const BRAIN_ADDITION =
  "Named CSF diversion sits on [Hydrocephalus Surgery in India](/treatments/hydrocephalus-surgery-in-india).";
const CRANIOTOMY_NEEDLE =
  "Named pituitary resection sits on [Pituitary Tumor Surgery in India](/treatments/pituitary-tumor-surgery-in-india).";
const CRANIOTOMY_ADDITION =
  "Named CSF diversion sits on [Hydrocephalus Surgery in India](/treatments/hydrocephalus-surgery-in-india).";
const SPINE_NEEDLE =
  "Intracranial tumours sit on [Brain Tumor Surgery in India](/treatments/brain-tumor-surgery-in-india).";
const SPINE_ADDITION =
  "Named CSF diversion sits on [Hydrocephalus Surgery in India](/treatments/hydrocephalus-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "f2b8d4e6-9a37-4c6b-8d0f-7b3e5c2a6f99",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Hydrocephalus Surgery in India",
  specialtySlug: "neurosurgery",
  subspecialty: "Pediatric Neurosurgery",
  category: "Hydrocephalus",
  image: "/uploads/treatments/hydrocephalus-ventricles.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anurag-gupta",
    "dr-sogani-shani-kumar",
    "dr-suresh-sankhla",
    "dr-deepu-banerji",
    "dr-yashwanth-sandeep",
    "dr-m-balamurugan",
    "dr-nigel-symss",
    "dr-m-vijaya-saradhi",
    "dr-b-g-ratnam",
    "dr-anshul-goel",
  ],
  hospitalSlugs: [
    "max-super-speciality-hospital-saket",
    "apollo-delhi",
    "gleneagles-hospital-mumbai",
    "kims-hospitals-thane",
    "medicover-hospital-bangalore",
    "apollo-hospital-chennai",
    "gleneagles-healthcity-chennai",
    "yashoda-hospitals-hi-tech-city",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "hydrocephalus-surgery",
    "endoscopic-third-ventriculostomy-etv",
    "endoscopic-brain-surgery",
    "brain-tumor-surgery",
    "chiari-surgery",
  ],
  relatedTreatmentSlugs: [ENDOSCOPIC, BRAIN, CRANIOTOMY, SPINE],
  status: "published" as const,
  featured: true,
  sortOrder: 22,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Hydrocephalus Surgery in India",
      shortDescription:
        "Hydrocephalus surgery in India is planned from the named CSF-diversion product — VP shunt, ETV or combined tumour work — not a generic brain-surgery package.",
      editorialBody: body,
      process: [
        {
          id: "hydrocephalus-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI or CT files, previous shunt details, infection history and a short description of current symptoms.",
        },
        {
          id: "hydrocephalus-step-2",
          title: "Neurosurgical review",
          description:
            "A neurosurgeon reviews whether the hydrocephalus is obstructive, communicating, congenital, acquired, tumour-related or NPH.",
        },
        {
          id: "hydrocephalus-step-3",
          title: "Procedure selection",
          description:
            "The team names VP shunt, ETV, temporary drainage or tumour treatment rather than a generic hydrocephalus package.",
        },
        {
          id: "hydrocephalus-step-4",
          title: "Medical optimisation",
          description:
            "Infection risk, valve type, paediatric ICU needs and anaesthesia fitness are addressed before planned surgery.",
        },
        {
          id: "hydrocephalus-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus implant, ICU, imaging and revision risk, not a brochure overnight package.",
        },
        {
          id: "hydrocephalus-step-6",
          title: "Travel to India",
          description:
            "Stable patients travel after records review. Sudden drowsiness, vomiting or shunt-failure symptoms are a local emergency.",
        },
        {
          id: "hydrocephalus-step-7",
          title: "Surgery",
          description:
            "CSF is diverted through a named shunt or an ETV stoma, with reconstruction or tumour work when those products belong on the list.",
        },
        {
          id: "hydrocephalus-step-8",
          title: "Shunt and neurological monitoring",
          description:
            "The team watches for infection, over-drainage, under-drainage, CSF leak and return of hydrocephalus symptoms.",
        },
        {
          id: "hydrocephalus-step-9",
          title: "Rehabilitation and adjuvant planning",
          description:
            "Physiotherapy, developmental support or tumour treatment is added when gait, cognition or the underlying cause still need work.",
        },
        {
          id: "hydrocephalus-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the named procedure, shunt warning signs, imaging schedule and who to contact after returning home.",
        },
      ],
      preparation:
        "Share dedicated MRI or CT files, previous shunt details and infection history so the team can judge shunt versus ETV versus observation versus tumour treatment.",
      recovery:
        "GAF planning notes 3-7 nights after hydrocephalus surgery and 2-5 nights after named ETV. Shunt-failure warning signs can appear after wound comfort has already improved.",
      hospitalStay: "Typically 3-7 nights after hydrocephalus surgery",
      recoveryPeriod:
        "Several weeks or longer depending on age, cause, neurological injury and any rehabilitation or tumour follow-up.",
      followUp:
        "Request a written summary covering the named procedure, implant details, shunt warning signs, driving limits and the imaging schedule after returning home.",
      importantConsiderations:
        "A brochure hydrocephalus price is not a surgical plan. Planning ranges are not hospital quotations. Sudden drowsiness, vomiting, seizure or return of shunt symptoms belongs in a local emergency department.",
      treatmentType: "CSF diversion surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "VP shunt, programmable valve when indicated, neuroendoscopic ETV or temporary EVD according to anatomy",
      searchKeywords: [
        "hydrocephalus surgery in India",
        "hydrocephalus treatment in India",
        "hydrocephalus surgery cost in India",
        "VP shunt surgery in India",
        "ETV surgery in India",
        "endoscopic third ventriculostomy in India",
        "hydrocephalus surgery for children",
        "normal pressure hydrocephalus treatment",
      ],
      faqs: [
        {
          id: "hydrocephalus-faq-1",
          question: "How much does hydrocephalus surgery cost in India?",
          answer:
            "GAF planning is approximately $3,000-$8,000 for hydrocephalus surgery and $3,000-$8,000 for named ETV. Combined tumour, infection or paediatric ICU lists are quoted after case review.",
        },
        {
          id: "hydrocephalus-faq-2",
          question: "What is the difference between VP shunt and ETV?",
          answer:
            "A VP shunt diverts CSF from a ventricle to the abdomen through implanted tubing. ETV creates an internal opening in the floor of the third ventricle and does not require that long catheter system.",
        },
        {
          id: "hydrocephalus-faq-3",
          question: "Is ETV better than VP shunt surgery?",
          answer:
            "Neither procedure is universally better. ETV can help selected obstructive hydrocephalus. A shunt is often more appropriate when CSF absorption is impaired.",
        },
        {
          id: "hydrocephalus-faq-4",
          question: "How long is the hospital stay after hydrocephalus surgery?",
          answer:
            "GAF planning is typically 3-7 nights after hydrocephalus surgery and 2-5 nights after named ETV.",
        },
        {
          id: "hydrocephalus-faq-5",
          question: "Does a VP shunt stay permanently?",
          answer:
            "In many patients, yes. Some people continue to need their shunt for life, and children may require revisions as they grow.",
        },
        {
          id: "hydrocephalus-faq-6",
          question: "What are the symptoms of shunt failure?",
          answer:
            "Return of previous hydrocephalus symptoms, headache, vomiting, increasing sleepiness, vision problems, fever or redness along the shunt pathway should be assessed urgently.",
        },
        {
          id: "hydrocephalus-faq-7",
          question: "Can hydrocephalus come back after surgery?",
          answer:
            "Yes. Hydrocephalus can recur if a shunt malfunctions or if an ETV closes. Any return of previous symptoms should be evaluated promptly.",
        },
        {
          id: "hydrocephalus-faq-8",
          question: "Can international patients have hydrocephalus surgery in India?",
          answer:
            "Yes. MRI or CT images, previous shunt details and infection history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "hydrocephalus-faq-9",
          question: "Which city in India is best for hydrocephalus surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with paediatric or adult neurosurgery and neuroendoscopy for the named diagnosis.",
        },
        {
          id: "hydrocephalus-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Severe headache, repeated vomiting, increasing drowsiness, seizures, new vision problems or a sudden return of shunt symptoms belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "hydrocephalus-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 3-7 nights. Combined evaluation, imaging and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "hydrocephalus-faq-12",
          question: "Is ETV suitable for normal-pressure hydrocephalus?",
          answer:
            "No as a routine first choice. Available evidence remains limited and does not support routine ETV for idiopathic NPH.",
        },
        {
          id: "hydrocephalus-faq-13",
          question: "Can children use the adult hydrocephalus sheet?",
          answer:
            "Not by default. Paediatric ICU, ETV-CPC and combined malformation lists are quoted after paediatric records review rather than from the adult $3,000-$8,000 band alone.",
        },
        {
          id: "hydrocephalus-faq-14",
          question: "Does tumour-related hydrocephalus use only the shunt price?",
          answer:
            "No. Named brain tumor surgery is $6,000-$15,000 when tumour removal belongs on the plan, in addition to any CSF-diversion sheet.",
        },
      ],
      imageAlt:
        "Enlarged cerebral ventricles in hydrocephalus with thinned surrounding brain tissue",
      seoTitle: "Hydrocephalus Surgery in India: Cost, VP Shunt, ETV & Recovery",
      metaDescription:
        "Learn about hydrocephalus surgery in India, including VP shunt, ETV, USD cost, recovery, shunt-failure warning signs and how to choose a neurosurgeon.",
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

linkRelated(ENDOSCOPIC, ENDOSCOPIC_NEEDLE, ENDOSCOPIC_ADDITION);
linkRelated(BRAIN, BRAIN_NEEDLE, BRAIN_ADDITION);
linkRelated(CRANIOTOMY, CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);
linkRelated(SPINE, SPINE_NEEDLE, SPINE_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [pituitary tumor surgery in India](https://gaf.healthcare/treatments/pituitary-tumor-surgery-in-india).",
    ", [pituitary tumor surgery in India](https://gaf.healthcare/treatments/pituitary-tumor-surgery-in-india) and [hydrocephalus surgery in India](https://gaf.healthcare/treatments/hydrocephalus-surgery-in-india).",
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

patchMarkdown(resolve("scripts/endoscopic-brain-treatment-body.md"), ENDOSCOPIC_NEEDLE, ENDOSCOPIC_ADDITION);
patchMarkdown(resolve("scripts/brain-tumor-treatment-body.md"), BRAIN_NEEDLE, BRAIN_ADDITION);
patchMarkdown(resolve("scripts/craniotomy-treatment-body.md"), CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);
patchMarkdown(resolve("scripts/spine-tumor-treatment-body.md"), SPINE_NEEDLE, SPINE_ADDITION);
