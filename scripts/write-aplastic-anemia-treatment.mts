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

const body = readFileSync(resolve("scripts/aplastic-anemia-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "aplastic-anemia-treatment-in-india");
const now = "2026-09-29T17:30:00.000Z";
const SLUG = "aplastic-anemia-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const SICKLE = "sickle-cell-anemia-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const ADDITION =
  " Aplastic anemia lists sit on [Aplastic Anemia Treatment in India](/treatments/aplastic-anemia-treatment-in-india).";
const SHARED_NEEDLE =
  " Myeloma lists sit on [Multiple Myeloma Treatment in India](/treatments/multiple-myeloma-treatment-in-india).";
const MYELOMA_NEEDLE =
  "MGUS, smoldering-myeloma, plasmacytoma, daratumumab, bispecific-antibody and BCMA-CAR-T treatment pages are not live on this site. Use the named modality sheets rather than an invented disease page.";

const treatment = {
  id: existing?.id ?? "f9b3e7d6-2a10-3485-d23e-6b4e1e5a0d73",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Aplastic Anemia Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Bone Marrow Failure",
  category: "Aplastic Anemia",
  image: "/uploads/treatments/aplastic-anemia-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ajay-gupta",
    "dr-akash-khandelwal",
    "dr-akshay-shah",
    "dr-muralidaran-c",
    "dr-govind-eriat",
    "dr-neema-bhat",
    "dr-m-gopinathan",
    "dr-prabu-p",
    "dr-k-karuna-kumar",
    "dr-narender-kumar-thota",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "blk-max-delhi",
    "medanta-gurgaon",
    "wockhardt-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "gleneagles-hospitals-bengaluru",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-secunderabad",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "allogeneic-stem-cell-transplant",
    "bone-marrow-transplantation",
    "haploidentical-stem-cell-transplant",
    "matched-unrelated-donor-transplant",
    "pediatric-bone-marrow-transplantation",
    "matched-sibling-donor-transplant",
    "hematopoietic-stem-cell-transplantation",
    "bone-marrow-biopsy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [BMT, LEUKEMIA, LYMPHOMA, THALASSEMIA, SICKLE, MYELOMA],
  status: "published" as const,
  featured: true,
  sortOrder: 42,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Aplastic Anemia Treatment in India",
      shortDescription:
        "Aplastic anemia treatment in India is planned by severity and donor availability — IST or allogeneic transplant quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "aa-step-1",
          title: "Share reports",
          description:
            "The patient provides CBC, marrow, PNH, HLA and previous ATG or transfusion notes before anyone books travel.",
        },
        {
          id: "aa-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is supportive care, immunosuppressive therapy or allogeneic transplant.",
        },
        {
          id: "aa-step-3",
          title: "Name the pathway",
          description:
            "The team writes IST, sibling graft, unrelated graft or haploidentical transplant as separate products.",
        },
        {
          id: "aa-step-4",
          title: "Itemized estimate",
          description:
            "There is no single aplastic-anemia package. Neighbouring allogeneic transplant is $30,000–$80,000. Neighbouring BMT is $25,000–$70,000.",
        },
        {
          id: "aa-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever during neutropenia or uncontrolled bleeding is a local emergency.",
        },
        {
          id: "aa-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms counts, marrow, infection status and HLA after arrival.",
        },
        {
          id: "aa-step-7",
          title: "Deliver the named pathway",
          description:
            "ATG-based IST or conditioning proceeds only after severity and donor status are named.",
        },
        {
          id: "aa-step-8",
          title: "Response review",
          description:
            "Counts, graft function or IST response decide whether another line is honest.",
        },
        {
          id: "aa-step-9",
          title: "Return home",
          description:
            "The patient leaves with medicine lists, infection rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share CBC, marrow, PNH, HLA and previous ATG, cyclosporine, eltrombopag or transfusion notes before anyone books travel.",
      recovery:
        "Infection risk, transfusion need and delayed count recovery are common. IST response may take months. Transplant recovery continues for months.",
      hospitalStay: "Outpatient monitoring to 6–10 weeks nearby for allogeneic transplant",
      recoveryPeriod:
        "Months after IST or allogeneic transplant. Follow-up can continue for years.",
      followUp:
        "Request a written summary covering severity, inherited-failure status, PNH, donor plan, IST or graft details and remote review after returning home.",
      importantConsiderations:
        "There is no single aplastic-anemia package. ATG and eltrombopag have no live GAF sheets. Fever during neutropenia belongs in a local emergency department.",
      treatmentType: "Aplastic Anemia / Bone Marrow Failure",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Allogeneic HSCT, ATG plus cyclosporine, selected eltrombopag and transfusion support",
      searchKeywords: [
        "aplastic anemia treatment in India",
        "aplastic anemia treatment cost in India",
        "aplastic anemia bone marrow transplant in India",
        "severe aplastic anemia treatment India",
        "ATG treatment for aplastic anemia",
        "eltrombopag for aplastic anemia",
      ],
      faqs: [
        {
          id: "aa-faq-1",
          question: "How much does aplastic anemia treatment cost in India?",
          answer:
            "There is no single package. Neighbouring allogeneic transplant is $30,000–$80,000. Neighbouring BMT is $25,000–$70,000. ATG and eltrombopag are hospital-priced.",
        },
        {
          id: "aa-faq-2",
          question: "Can a bone marrow transplant cure aplastic anemia?",
          answer:
            "Successful allogeneic HSCT can provide a potentially curative treatment in selected patients. Named BMT lists sit on the bone marrow transplant page.",
        },
        {
          id: "aa-faq-3",
          question: "Does every patient need a transplant?",
          answer:
            "No. Many patients are managed with immunosuppressive therapy when a graft is not the immediate product.",
        },
        {
          id: "aa-faq-4",
          question: "Can children be treated for aplastic anemia in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Inherited marrow failure should be excluded.",
        },
        {
          id: "aa-faq-5",
          question: "Is there a GAF ATG or eltrombopag page?",
          answer:
            "No. ATG, eltrombopag, PNH and Fanconi-anemia pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "aa-faq-6",
          question: "Can international patients come to India for aplastic anemia treatment?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel.",
        },
        {
          id: "aa-faq-7",
          question: "Which city in India is best for aplastic anemia treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "aa-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "High fever during neutropenia, uncontrolled bleeding, sudden breathlessness, chest pain or sudden confusion belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "aa-faq-9",
          question: "Is aplastic anemia a cancer?",
          answer:
            "No. It is a bone marrow failure disorder. A small proportion of patients can later develop clonal blood disorders.",
        },
        {
          id: "aa-faq-10",
          question: "Is eltrombopag used in India?",
          answer:
            "Yes, in appropriate severe aplastic anemia patients, including with ATG and cyclosporine when a low-risk graft is not the product. There is no live GAF eltrombopag sheet.",
        },
        {
          id: "aa-faq-11",
          question: "Is autologous transplant used for aplastic anemia?",
          answer:
            "No. Aplastic anemia uses a donor graft when transplantation is named. Autologous collection is not a substitute product.",
        },
        {
          id: "aa-faq-12",
          question: "Can aplastic anemia come back?",
          answer:
            "Yes. Relapse after immunosuppressive therapy can require another named line, including selected allogeneic transplant.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping marrow-factory forms used as the aplastic anemia treatment hero",
      seoTitle: "Aplastic Anemia Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about aplastic anemia treatment in India, including ATG, cyclosporine, eltrombopag, allogeneic transplant $30,000–$80,000 and how to send records.",
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

linkRelated(BMT, SHARED_NEEDLE, ADDITION);
linkRelated(LEUKEMIA, SHARED_NEEDLE, ADDITION);
linkRelated(LYMPHOMA, SHARED_NEEDLE, ADDITION);
linkRelated(THALASSEMIA, SHARED_NEEDLE, ADDITION);
linkRelated(SICKLE, SHARED_NEEDLE, ADDITION);
linkRelated(MYELOMA, MYELOMA_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [multiple myeloma treatment in India](https://gaf.healthcare/treatments/multiple-myeloma-treatment-in-india).",
    ", [multiple myeloma treatment in India](https://gaf.healthcare/treatments/multiple-myeloma-treatment-in-india) and [aplastic anemia treatment in India](https://gaf.healthcare/treatments/aplastic-anemia-treatment-in-india).",
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

patchMarkdown(resolve("scripts/bmt-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/thalassemia-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/sickle-cell-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"), MYELOMA_NEEDLE, ADDITION);
