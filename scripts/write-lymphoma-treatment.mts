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

const body = readFileSync(resolve("scripts/lymphoma-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "lymphoma-treatment-in-india");
const now = "2026-09-29T15:30:00.000Z";
const SLUG = "lymphoma-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const BMT_NEEDLE =
  " Leukemia lists sit on [Leukemia Treatment in India](/treatments/leukemia-treatment-in-india).";
const BMT_ADDITION =
  " Lymphoma lists sit on [Lymphoma Treatment in India](/treatments/lymphoma-treatment-in-india).";
const LEUKEMIA_FAQ_NEEDLE = "There is no live lymphoma treatment page on this site.";
const LEUKEMIA_FAQ_REPLACEMENT =
  "Lymphoma lists sit on [Lymphoma Treatment in India](/treatments/lymphoma-treatment-in-india).";
const LEUKEMIA_LIST_NEEDLE =
  "AML, ALL, CML, CLL, lymphoma and blood-cancer treatment pages are not live on this site. Use the named modality sheets rather than an invented disease page.";
const LEUKEMIA_LIST_REPLACEMENT =
  "AML, ALL, CML, CLL and blood-cancer treatment pages are not live on this site. Lymphoma lists sit on [Lymphoma Treatment in India](/treatments/lymphoma-treatment-in-india).";

const treatment = {
  id: existing?.id ?? "b5d9a3f2-8c76-f041-9efc-2d0a7a1c6f39",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Lymphoma Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Hemato-Oncology",
  category: "Lymphoma",
  image: "/uploads/treatments/lymphoma-hero.webp",
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
    "chemotherapy",
    "targeted-therapy",
    "immunotherapy",
    "immune-checkpoint-inhibitor-therapy",
    "molecular-targeted-therapy",
    "antibody-drug-conjugate-therapy",
    "maintenance-therapy",
    "precision-oncology",
    "intrathecal-chemotherapy",
    "car-t-cell-therapy",
    "bone-marrow-transplantation",
    "autologous-stem-cell-transplant",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "pediatric-bone-marrow-transplantation",
    "bone-marrow-biopsy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
    "3d-conformal-radiotherapy-3d-crt",
  ],
  relatedTreatmentSlugs: [BMT, LEUKEMIA],
  status: "published" as const,
  featured: true,
  sortOrder: 38,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Lymphoma Treatment in India",
      shortDescription:
        "Lymphoma treatment in India is planned by Hodgkin or non-Hodgkin subtype — chemotherapy, radiation, transplant or CAR-T quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "lym-step-1",
          title: "Share reports",
          description:
            "The patient provides biopsy, immunohistochemistry, PET-CT or CT, blood tests, marrow if done and previous-treatment notes.",
        },
        {
          id: "lym-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is Hodgkin or non-Hodgkin lymphoma and whether travel is urgent.",
        },
        {
          id: "lym-step-3",
          title: "Name the protocol family",
          description:
            "The team writes chemotherapy, immunotherapy, radiation, transplant or CAR-T as separate products.",
        },
        {
          id: "lym-step-4",
          title: "Itemized estimate",
          description:
            "There is no single lymphoma package. Named chemotherapy is $1,500–$8,000+. Neighbouring EBRT is $1,000–$6,000+.",
        },
        {
          id: "lym-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Neutropenic fever or uncontrolled bleeding is a local emergency.",
        },
        {
          id: "lym-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms subtype, staging and organ function after arrival.",
        },
        {
          id: "lym-step-7",
          title: "Deliver the named protocol",
          description:
            "Cycles, radiation, transplant or CAR-T proceed only after the subtype is named.",
        },
        {
          id: "lym-step-8",
          title: "Response assessment",
          description:
            "Examination, blood tests and PET-CT or other imaging decide the next line.",
        },
        {
          id: "lym-step-9",
          title: "Return home",
          description:
            "The patient leaves with drug lists, infection rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share biopsy, immunohistochemistry, PET-CT or CT, blood tests, marrow if performed and previous treatment notes before anyone books travel.",
      recovery:
        "Infection risk, cytopenias and treatment-related fatigue are common. Immune recovery after intensive therapy, transplant or CAR-T continues for months.",
      hospitalStay: "Outpatient cycles to several weeks in or near the unit, depending on protocol",
      recoveryPeriod:
        "Weeks to months for intensive protocols. Indolent lymphoma and maintenance can continue for years.",
      followUp:
        "Request a written summary covering subtype, stage, response plan, infection rules and remote review after returning home.",
      importantConsiderations:
        "There is no single lymphoma package. CAR-T, radiation and BMT are neighbouring sheets. Neutropenic fever, uncontrolled bleeding or breathlessness belongs in a local emergency department.",
      treatmentType: "Lymphoma / Hemato-Oncology",
      treatmentSetting: "Accredited partner haematology and oncology units in India",
      technology:
        "Chemotherapy, immunotherapy, targeted drugs, PET-adapted radiation, selected autologous or allogeneic transplant and CAR-T",
      searchKeywords: [
        "lymphoma treatment in India",
        "lymphoma treatment cost in India",
        "Hodgkin lymphoma treatment in India",
        "non-Hodgkin lymphoma treatment in India",
        "blood cancer treatment in India",
        "lymphoma chemotherapy in India",
        "bone marrow transplant for lymphoma in India",
        "CAR-T for lymphoma in India",
      ],
      faqs: [
        {
          id: "lym-faq-1",
          question: "How much does lymphoma treatment cost in India?",
          answer:
            "There is no single package. Named chemotherapy is $1,500–$8,000+. Neighbouring EBRT is $1,000–$6,000+. Neighbouring autologous transplant is $18,000–$48,000. Neighbouring CAR-T is $80,000–$180,000.",
        },
        {
          id: "lym-faq-2",
          question: "Does every lymphoma patient need a transplant?",
          answer:
            "No. Transplant is considered for selected high-risk, relapsed or refractory cases. Named BMT lists sit on the bone marrow transplant page.",
        },
        {
          id: "lym-faq-3",
          question: "Is chemotherapy always required?",
          answer:
            "No. Some indolent lymphomas can be observed. Aggressive lymphomas generally need prompt systemic treatment.",
        },
        {
          id: "lym-faq-4",
          question: "Can children be treated for lymphoma in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Adult floors are not a substitute paediatric unit.",
        },
        {
          id: "lym-faq-5",
          question: "Does CAR-T use the chemotherapy sheet?",
          answer:
            "No. Neighbouring CAR-T cell therapy is $80,000–$180,000 and is a different cellular-therapy product.",
        },
        {
          id: "lym-faq-6",
          question: "Can international patients come to India for lymphoma?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel. Aggressive lymphoma may make delay unsafe.",
        },
        {
          id: "lym-faq-7",
          question: "Which city in India is best for lymphoma treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "lym-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Neutropenic fever, uncontrolled bleeding, breathlessness or new confusion after cellular therapy belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "lym-faq-9",
          question: "Is there a GAF Hodgkin or DLBCL treatment page?",
          answer:
            "No. Hodgkin, non-Hodgkin, DLBCL and follicular pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "lym-faq-10",
          question: "How is response measured?",
          answer:
            "Examination, blood tests and PET-CT or other imaging, depending on the subtype.",
        },
        {
          id: "lym-faq-11",
          question: "Does follicular lymphoma always need immediate treatment?",
          answer:
            "No. Observation can be appropriate when there are no significant symptoms or progressive disease.",
        },
        {
          id: "lym-faq-12",
          question: "Can lymphoma be cured?",
          answer:
            "Some subtypes can enter long-term remission. Others are controlled for years. The answer is subtype-specific.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping node-like shapes used as the lymphoma treatment hero",
      seoTitle: "Lymphoma Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about lymphoma treatment in India, including Hodgkin and non-Hodgkin lymphoma, chemotherapy $1,500–$8,000+, radiation, transplant, CAR-T and how to send records.",
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

function replaceRelated(slug: string, needle: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  const editorial = row.translations?.en?.editorialBody ?? "";
  if (editorial && editorial.includes(needle)) {
    row.translations!.en!.editorialBody = editorial.replace(needle, replacement);
  }
}

linkRelated(BMT, BMT_NEEDLE, BMT_ADDITION);
replaceRelated(LEUKEMIA, LEUKEMIA_FAQ_NEEDLE, LEUKEMIA_FAQ_REPLACEMENT);
replaceRelated(LEUKEMIA, LEUKEMIA_LIST_NEEDLE, LEUKEMIA_LIST_REPLACEMENT);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [leukemia treatment in India](https://gaf.healthcare/treatments/leukemia-treatment-in-india).",
    ", [leukemia treatment in India](https://gaf.healthcare/treatments/leukemia-treatment-in-india) and [lymphoma treatment in India](https://gaf.healthcare/treatments/lymphoma-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, replacement: string) {
  const text = readFileSync(path, "utf8");
  if (text.includes(needle) && !text.includes(replacement)) {
    writeFileSync(path, text.replace(needle, replacement));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/bmt-treatment-body.md"), BMT_NEEDLE, `${BMT_NEEDLE}${BMT_ADDITION}`);
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"), LEUKEMIA_FAQ_NEEDLE, LEUKEMIA_FAQ_REPLACEMENT);
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"), LEUKEMIA_LIST_NEEDLE, LEUKEMIA_LIST_REPLACEMENT);
