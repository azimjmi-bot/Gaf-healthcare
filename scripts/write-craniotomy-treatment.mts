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

const body = readFileSync(resolve("scripts/craniotomy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "craniotomy-surgery-in-india");
const now = "2026-09-29T05:00:00.000Z";
const SLUG = "craniotomy-surgery-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const ADDITION =
  "Selected brain metastases that need an open neurosurgical corridor sit on [Craniotomy Surgery in India](/treatments/craniotomy-surgery-in-india).";
const BREAST_NEEDLE =
  "or in advanced or metastatic disease. The specific medicine depends on the cancer's biological characteristics and treatment setting.";
const COLON_NEEDLE =
  "The lungs can also be a site of metastatic spread. Selected patients with limited pulmonary metastases may be considered for surgical removal, ablation, systemic therapy, or stereotactic radiation in selected circumstances.";

const treatment = {
  id: existing?.id ?? "a7c3e9f1-4b82-4d16-9e5a-2c8f0b7d1a44",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Craniotomy Surgery in India",
  specialtySlug: "neurosurgery",
  subspecialty: "Neuro-Oncology",
  category: "Craniotomy",
  image: "/uploads/treatments/craniotomy-bone-flap.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-sandeep-vaishya",
    "dr-aditya-gupta",
    "dr-varindera-paul-singh",
    "dr-suresh-sankhla",
    "dr-nitin-dange",
    "dr-krishna-k-n",
    "dr-m-balamurugan",
    "dr-v-r-roopesh-kumar",
    "dr-sujit-kumar-vidiyala",
    "dr-alok-ranjan",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "artemis-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "kims-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "brain-tumor-surgery",
    "glioma-surgery",
    "meningioma-surgery",
    "skull-base-surgery",
    "endoscopic-brain-surgery",
    "stereotactic-brain-biopsy",
    "aneurysm-clipping",
    "aneurysm-coiling",
    "avm-surgery",
    "epilepsy-surgery",
  ],
  relatedTreatmentSlugs: [BREAST, COLON],
  status: "published" as const,
  featured: true,
  sortOrder: 17,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Craniotomy Surgery in India",
      shortDescription:
        "Craniotomy in India is planned from the named brain condition — tumour resection, clipping, AVM, biopsy or decompression — not from a generic skull-opening package.",
      editorialBody: body,
      process: [
        {
          id: "craniotomy-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI or CT files, reports, previous treatment records and a short description of current symptoms.",
        },
        {
          id: "craniotomy-step-2",
          title: "Neurosurgical review",
          description:
            "A neurosurgeon reviews whether the target is a tumour, aneurysm, AVM, haematoma, abscess, epileptic focus or another intracranial condition.",
        },
        {
          id: "craniotomy-step-3",
          title: "Procedure selection",
          description:
            "The team names the product — brain tumour surgery, glioma, meningioma, skull-base, clipping, AVM, biopsy or another corridor — rather than a generic craniotomy.",
        },
        {
          id: "craniotomy-step-4",
          title: "Medical optimisation",
          description:
            "Blood thinners, fitness for anaesthesia and any need for mapping, navigation or an awake technique are addressed before planned surgery.",
        },
        {
          id: "craniotomy-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus ICU, implants, pathology and rehabilitation, not a brochure skull-opening package.",
        },
        {
          id: "craniotomy-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, additional imaging, surgery, ICU monitoring and early neurological review.",
        },
        {
          id: "craniotomy-step-7",
          title: "Surgery",
          description:
            "The bone flap is raised, the target is treated, and the bone is generally replaced and secured at the end of the operation.",
        },
        {
          id: "craniotomy-step-8",
          title: "Neurological monitoring",
          description:
            "Alertness, speech, limb strength and wound care are checked in a neurosurgical unit or ICU according to the case.",
        },
        {
          id: "craniotomy-step-9",
          title: "Rehabilitation",
          description:
            "Physiotherapy, occupational therapy or speech therapy is added when the disease or the corridor has affected function.",
        },
        {
          id: "craniotomy-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering diagnosis, operation performed, pathology, medicines, warning signs and follow-up imaging.",
        },
      ],
      preparation:
        "Share MRI or CT files, angiography when relevant, pathology and a medication list so the team can judge open surgery versus endovascular care, radiosurgery, biopsy or observation.",
      recovery:
        "GAF planning notes 5–10 nights after brain tumor surgery, 5–12 nights after glioma surgery and 7–14 nights after aneurysm clipping. Recovery of energy often takes several weeks or longer.",
      hospitalStay:
        "Typically 5–10 nights after brain tumor surgery; 7–14 nights after aneurysm clipping; 1–3 nights after stereotactic brain biopsy",
      recoveryPeriod:
        "Several weeks or longer depending on the underlying condition, neurological deficits and any oncology follow-up.",
      followUp:
        "Request a written summary covering the named procedure, pathology, medicines, wound care, driving limits, rehabilitation and the MRI or clinic schedule after returning home.",
      importantConsiderations:
        "A brochure craniotomy price is not a surgical plan. Planning ranges are not hospital quotations. Sudden severe headache, new weakness, seizure, chest pain or breathing difficulty belongs in a local emergency department.",
      treatmentType: "Neurosurgical access procedure",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Conventional, image-guided, awake, keyhole, endoscopic or skull-base craniotomy according to the named diagnosis",
      searchKeywords: [
        "craniotomy surgery in India",
        "craniotomy surgery cost in India",
        "brain tumor surgery India",
        "awake craniotomy India",
        "aneurysm clipping India",
        "meningioma surgery India",
        "glioma surgery India",
        "craniotomy recovery",
      ],
      faqs: [
        {
          id: "craniotomy-faq-1",
          question: "How much does craniotomy surgery cost in India?",
          answer:
            "There is no generic craniotomy package. GAF planning is approximately $6,000–$15,000 for brain tumor surgery, $7,000–$16,000 for glioma surgery, $6,500–$15,000 for meningioma surgery, $8,000–$22,000 for skull-base surgery, $8,000–$18,000 for aneurysm clipping and $8,000–$20,000 for AVM or epilepsy surgery.",
        },
        {
          id: "craniotomy-faq-2",
          question: "Is craniotomy a major surgery?",
          answer:
            "Yes. Craniotomy is a major neurosurgical procedure because it involves opening the skull to access the brain. Complexity and risk vary according to the underlying condition and surgical location.",
        },
        {
          id: "craniotomy-faq-3",
          question: "How long is the hospital stay after craniotomy?",
          answer:
            "GAF planning is typically 5–10 nights after brain tumor surgery, 7–14 nights after aneurysm clipping and 1–3 nights after stereotactic brain biopsy. Johns Hopkins describes a general stay of approximately 3–7 days.",
        },
        {
          id: "craniotomy-faq-4",
          question: "Is the skull replaced after craniotomy?",
          answer:
            "Usually yes. The bone flap is generally replaced and secured at the end of the operation. This differs from a craniectomy, where the bone may be left out temporarily.",
        },
        {
          id: "craniotomy-faq-5",
          question: "Can a craniotomy affect speech?",
          answer:
            "It can, particularly when surgery is performed near language regions. Functional mapping and awake-craniotomy techniques may be used in selected cases.",
        },
        {
          id: "craniotomy-faq-6",
          question: "Is awake craniotomy suitable for every patient?",
          answer:
            "No. Patient cooperation, lesion characteristics, medical condition and the location of the abnormality all influence whether it is appropriate.",
        },
        {
          id: "craniotomy-faq-7",
          question: "What is the success rate of craniotomy?",
          answer:
            "There is no single success rate because craniotomy treats many different diseases. Ask for outcome data relevant to the specific diagnosis and procedure.",
        },
        {
          id: "craniotomy-faq-8",
          question: "Can international patients have craniotomy in India?",
          answer:
            "Yes. Medical records and brain imaging should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "craniotomy-faq-9",
          question: "Which city in India is best for craniotomy?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with expertise for the named diagnosis.",
        },
        {
          id: "craniotomy-faq-10",
          question: "Does every brain tumour need a craniotomy?",
          answer:
            "No. Selected lesions may be observed, biopsied stereotactically, treated with radiosurgery, or managed with endovascular techniques instead of an open corridor.",
        },
        {
          id: "craniotomy-faq-11",
          question: "When should I go to an emergency department after craniotomy?",
          answer:
            "Sudden severe headache, new weakness, difficulty speaking, seizure, chest pain or breathing difficulty belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "craniotomy-faq-12",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay for brain tumor surgery is typically 5–10 nights. Combined evaluation, pathology and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "craniotomy-faq-13",
          question: "Is clipping the same as coiling?",
          answer:
            "No. Clipping is an open craniotomy product at $8,000–$18,000. Coiling is an endovascular product at $10,000–$25,000.",
        },
        {
          id: "craniotomy-faq-14",
          question: "Does haematoma evacuation use the brain-tumour price?",
          answer:
            "No. Haematoma, trauma and abscess craniotomies are quoted after case review rather than from the $6,000–$15,000 brain-tumor-surgery sheet.",
        },
      ],
      imageAlt:
        "Neurosurgeon holding a temporary cranial bone flap beside a sterile craniotomy opening",
      seoTitle: "Craniotomy Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about craniotomy surgery in India, including brain tumours, aneurysms, types of approach, cost in USD, recovery, risks and how to choose a neurosurgeon.",
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

linkRelated(BREAST, BREAST_NEEDLE, ADDITION);
linkRelated(COLON, COLON_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [tendon repair surgery in India](https://gaf.healthcare/treatments/tendon-repair-surgery-in-india).",
    ", [tendon repair surgery in India](https://gaf.healthcare/treatments/tendon-repair-surgery-in-india) and [craniotomy surgery in India](https://gaf.healthcare/treatments/craniotomy-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const colonMd = resolve("scripts/colon-treatment-body.md");
let colonText = readFileSync(colonMd, "utf8");
if (!colonText.includes(`/treatments/${SLUG}`) && colonText.includes(COLON_NEEDLE)) {
  writeFileSync(colonMd, colonText.replace(COLON_NEEDLE, `${COLON_NEEDLE} ${ADDITION}`));
  console.log("updated scripts/colon-treatment-body.md");
}
