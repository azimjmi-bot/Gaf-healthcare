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

const body = readFileSync(resolve("scripts/endoscopic-brain-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "endoscopic-brain-surgery-in-india");
const now = "2026-09-29T06:30:00.000Z";
const SLUG = "endoscopic-brain-surgery-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const CRANIOTOMY = "craniotomy-surgery-in-india";
const SPINE = "spine-tumor-surgery-in-india";
const BRAIN_NEEDLE =
  "Named [endoscopic brain surgery](/costs/India/Neurosurgery/Endoscopic-Brain-Surgery) is **$5,000–$12,000** (typically **3–7 nights**).";
const BRAIN_ADDITION =
  "The named corridor product sits on [Endoscopic Brain Surgery in India](/treatments/endoscopic-brain-surgery-in-india).";
const CRANIOTOMY_NEEDLE =
  "Selected endoscopic corridors sit on [endoscopic brain surgery](/costs/India/Neurosurgery/Endoscopic-Brain-Surgery) rather than on a generic keyhole brochure.";
const CRANIOTOMY_ADDITION =
  "See [Endoscopic Brain Surgery in India](/treatments/endoscopic-brain-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "d0f6b2c4-7e15-4a49-8b8d-5f1c3e0a4d77",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Endoscopic Brain Surgery in India",
  specialtySlug: "neurosurgery",
  subspecialty: "Skull Base & Neuroendoscopy",
  category: "Endoscopic Brain",
  image: "/uploads/treatments/endoscopic-brain-endonasal.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-sandeep-vaishya",
    "dr-sudhir-dubey",
    "dr-suresh-sankhla",
    "dr-nitin-dange",
    "dr-kishor-rao",
    "dr-ganesh-krishna-murthy",
    "dr-nigel-symss",
    "dr-m-anbuselvam",
    "dr-manas-kumar-panigrahi",
    "dr-soma-madhan-reddy",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "medanta-gurgaon",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "medicover-hospital-bangalore",
    "gleneagles-healthcity-chennai",
    "rela-hospital",
    "kims-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "endoscopic-brain-surgery",
    "endoscopic-skull-base-surgery",
    "pituitary-tumor-surgery",
    "endoscopic-third-ventriculostomy-etv",
    "hydrocephalus-surgery",
    "skull-base-surgery",
    "brain-tumor-surgery",
    "stereotactic-brain-biopsy",
  ],
  relatedTreatmentSlugs: [BRAIN, CRANIOTOMY, SPINE],
  status: "published" as const,
  featured: true,
  sortOrder: 20,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Endoscopic Brain Surgery in India",
      shortDescription:
        "Endoscopic brain surgery in India is planned from the named corridor — endonasal pituitary, skull base, ETV or ventricular endoscopy — not a generic keyhole package.",
      editorialBody: body,
      process: [
        {
          id: "endoscopic-brain-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI or CT files, reports, hormonal tests when pituitary disease is suspected, and a short description of current symptoms.",
        },
        {
          id: "endoscopic-brain-step-2",
          title: "Neurosurgical review",
          description:
            "A neurosurgeon reviews whether the target is a pituitary adenoma, skull-base lesion, ventricular cyst, hydrocephalus or another accessible mass.",
        },
        {
          id: "endoscopic-brain-step-3",
          title: "Procedure selection",
          description:
            "The team names endonasal pituitary, endoscopic skull-base, ETV or ventricular endoscopy rather than a generic keyhole brochure.",
        },
        {
          id: "endoscopic-brain-step-4",
          title: "Medical optimisation",
          description:
            "Fitness for anaesthesia, reconstruction needs, ENT participation and any adjuvant radiation or endocrine care are addressed before planned surgery.",
        },
        {
          id: "endoscopic-brain-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus ICU, pathology, reconstruction and ENT fees, not a brochure endoscope package.",
        },
        {
          id: "endoscopic-brain-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, additional imaging, surgery, CSF-leak watch and pathology.",
        },
        {
          id: "endoscopic-brain-step-7",
          title: "Surgery",
          description:
            "The lesion is biopsied, removed, decompressed or bypassed through the named endoscopic corridor, with reconstruction when the skull base is opened.",
        },
        {
          id: "endoscopic-brain-step-8",
          title: "Pathology and endocrine review",
          description:
            "Histopathology and, when indicated, hormone testing classify the lesion and shape adjuvant treatment.",
        },
        {
          id: "endoscopic-brain-step-9",
          title: "Adjuvant planning",
          description:
            "Radiation, medication, surveillance or further surgery is added when the pathology requires it.",
        },
        {
          id: "endoscopic-brain-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering diagnosis, reconstruction, medicines, nose-blowing limits, warning signs and MRI follow-up.",
        },
      ],
      preparation:
        "Share MRI or CT files, hormonal reports if pituitary disease is suspected, and a medication list so the team can judge an endoscopic corridor versus craniotomy versus radiosurgery or observation.",
      recovery:
        "GAF planning notes 3-7 nights after endoscopic brain surgery, 4-8 nights after endoscopic skull base surgery and 2-5 nights after ETV. Recovery of energy and smell often takes several weeks.",
      hospitalStay:
        "Typically 3-7 nights after endoscopic brain surgery; 4-8 nights after endoscopic skull base surgery; 2-5 nights after ETV",
      recoveryPeriod:
        "Several weeks or longer depending on the lesion, reconstruction, hormonal status and any oncology follow-up.",
      followUp:
        "Request a written summary covering the named procedure, residual tumour, reconstruction, medicines, nasal restrictions, driving limits and the MRI schedule after returning home.",
      importantConsiderations:
        "A brochure endoscopic price is not a surgical plan. Planning ranges are not hospital quotations. Sudden severe headache, new weakness, seizure, vision change or clear fluid from the nose belongs in a local emergency department.",
      treatmentType: "Neuroendoscopic surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Endoscopic endonasal corridor, neuronavigation, skull-base reconstruction or ventricular endoscopy according to the named lesion",
      searchKeywords: [
        "endoscopic brain surgery in India",
        "endoscopic brain surgery cost in India",
        "neuro endoscopic surgery in India",
        "endoscopic skull base surgery India",
        "endoscopic pituitary surgery India",
        "endoscopic transsphenoidal surgery India",
        "endoscopic third ventriculostomy India",
        "minimally invasive brain surgery India",
      ],
      faqs: [
        {
          id: "endoscopic-brain-faq-1",
          question: "How much does endoscopic brain surgery cost in India?",
          answer:
            "GAF planning is approximately $5,000-$12,000 for endoscopic brain surgery, $6,000-$15,000 for endoscopic skull base surgery, $5,000-$12,000 for pituitary tumor surgery and $3,000-$8,000 for ETV.",
        },
        {
          id: "endoscopic-brain-faq-2",
          question: "Is endoscopic brain surgery performed through the nose?",
          answer:
            "Some types are. Endoscopic endonasal surgery uses the nasal passages to reach selected skull-base and pituitary lesions. Other neuroendoscopic procedures use a small opening in the skull.",
        },
        {
          id: "endoscopic-brain-faq-3",
          question: "How long is the hospital stay after endoscopic brain surgery?",
          answer:
            "GAF planning is typically 3-7 nights after endoscopic brain surgery, 4-8 nights after endoscopic skull base surgery and 2-5 nights after ETV.",
        },
        {
          id: "endoscopic-brain-faq-4",
          question: "Can every brain tumor be removed endoscopically?",
          answer:
            "No. Complete endoscopic removal is possible for some lesions but may be unsafe when there is no safe corridor. A craniotomy or another approach may be recommended instead.",
        },
        {
          id: "endoscopic-brain-faq-5",
          question: "Can pituitary tumors be removed through the nose?",
          answer:
            "Yes. Endoscopic transsphenoidal surgery is an established approach for many pituitary tumours. Named pituitary tumor surgery is $5,000-$12,000.",
        },
        {
          id: "endoscopic-brain-faq-6",
          question: "Can endoscopic surgery treat hydrocephalus?",
          answer:
            "Yes. Named ETV is $3,000-$8,000 for selected obstructive hydrocephalus. It is not appropriate for every type of hydrocephalus.",
        },
        {
          id: "endoscopic-brain-faq-7",
          question: "Does endoscopic surgery eliminate a craniotomy?",
          answer:
            "No. Some conditions are better treated with a craniotomy. The correct approach depends on the lesion.",
        },
        {
          id: "endoscopic-brain-faq-8",
          question: "Can international patients have endoscopic brain surgery in India?",
          answer:
            "Yes. Medical records and brain imaging should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "endoscopic-brain-faq-9",
          question: "Which city in India is best for endoscopic brain surgery?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with expertise for the named diagnosis.",
        },
        {
          id: "endoscopic-brain-faq-10",
          question: "When should I go to an emergency department after surgery?",
          answer:
            "Sudden severe headache, new weakness, seizure, significant vision change or clear fluid continuously draining from the nose belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "endoscopic-brain-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay for endoscopic brain surgery is typically 3-7 nights. Combined evaluation, pathology and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "endoscopic-brain-faq-12",
          question: "Does ETV use the endoscopic-brain-surgery price?",
          answer:
            "Not by default. Named ETV is $3,000-$8,000, not the $5,000-$12,000 endoscopic-brain-surgery band.",
        },
        {
          id: "endoscopic-brain-faq-13",
          question: "Can children use the adult endoscopic-brain sheet?",
          answer:
            "Not by default. Paediatric neuroendoscopy is quoted after paediatric records review rather than from the adult $5,000-$12,000 band.",
        },
        {
          id: "endoscopic-brain-faq-14",
          question: "Is endoscopic surgery safer than open surgery?",
          answer:
            "There is no universal answer. For an appropriately selected lesion an endoscopic route may reduce tissue traversed, but it introduces its own risks including CSF leak.",
        },
      ],
      imageAlt:
        "Endoscope introduced through the nostril toward the sphenoid sinus during endonasal pituitary surgery",
      seoTitle: "Endoscopic Brain Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about endoscopic brain surgery in India, including pituitary, skull-base, ETV, USD cost, recovery, CSF leak risk and how to choose a neurosurgeon.",
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

linkRelated(BRAIN, BRAIN_NEEDLE, BRAIN_ADDITION);
linkRelated(CRANIOTOMY, CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);
linkRelated(SPINE, BRAIN_NEEDLE, BRAIN_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [spine tumor surgery in India](https://gaf.healthcare/treatments/spine-tumor-surgery-in-india).",
    ", [spine tumor surgery in India](https://gaf.healthcare/treatments/spine-tumor-surgery-in-india) and [endoscopic brain surgery in India](https://gaf.healthcare/treatments/endoscopic-brain-surgery-in-india).",
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

patchMarkdown(resolve("scripts/brain-tumor-treatment-body.md"), BRAIN_NEEDLE, BRAIN_ADDITION);
patchMarkdown(resolve("scripts/craniotomy-treatment-body.md"), CRANIOTOMY_NEEDLE, CRANIOTOMY_ADDITION);
