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

const body = readFileSync(resolve("scripts/leukemia-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "leukemia-treatment-in-india");
const now = "2026-09-29T15:00:00.000Z";
const SLUG = "leukemia-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const BMT_NEEDLE =
  "Auto and allo lists treat different grafts. They are not a substitute BMT price when the protocol has already been named.";
const RELATED_ADDITION =
  " Leukemia lists sit on [Leukemia Treatment in India](/treatments/leukemia-treatment-in-india).";

const treatment = {
  id: existing?.id ?? "a4c8f2e1-7b65-e930-8deb-1c9f6f0b5e28",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Leukemia Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Hemato-Oncology",
  category: "Leukemia",
  image: "/uploads/treatments/leukemia-hero.webp",
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
    "molecular-targeted-therapy",
    "intrathecal-chemotherapy",
    "maintenance-therapy",
    "precision-oncology",
    "antibody-drug-conjugate-therapy",
    "car-t-cell-therapy",
    "bone-marrow-transplantation",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "matched-unrelated-donor-transplant",
    "pediatric-bone-marrow-transplantation",
    "bone-marrow-biopsy",
  ],
  relatedTreatmentSlugs: [BMT],
  status: "published" as const,
  featured: true,
  sortOrder: 37,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Leukemia Treatment in India",
      shortDescription:
        "Leukemia treatment in India is planned by subtype — chemotherapy, targeted therapy, immunotherapy or transplant quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "leu-step-1",
          title: "Share reports",
          description:
            "The patient provides CBC, smear, marrow, flow, cytogenetic, molecular and previous-treatment notes.",
        },
        {
          id: "leu-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is AML, ALL, CML, CLL or another clone and whether travel is urgent.",
        },
        {
          id: "leu-step-3",
          title: "Name the protocol family",
          description:
            "The team writes chemotherapy, targeted therapy, immunotherapy, CAR-T or transplant as separate products.",
        },
        {
          id: "leu-step-4",
          title: "Itemized estimate",
          description:
            "There is no single leukemia package. Named chemotherapy is $1,500–$8,000+. BMT is $25,000–$70,000.",
        },
        {
          id: "leu-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Neutropenic fever or uncontrolled bleeding is a local emergency.",
        },
        {
          id: "leu-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms subtype, organ function and infection status after arrival.",
        },
        {
          id: "leu-step-7",
          title: "Deliver the named protocol",
          description:
            "Induction, TKI therapy, immunotherapy or conditioning proceeds only after the clone is named.",
        },
        {
          id: "leu-step-8",
          title: "Response and MRD",
          description:
            "Counts, marrow and residual-disease tests decide the next line, including whether a graft is honest.",
        },
        {
          id: "leu-step-9",
          title: "Return home",
          description:
            "The patient leaves with drug lists, infection rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share CBC, smear, marrow, flow cytometry, cytogenetics, molecular results and previous treatment notes before anyone books travel.",
      recovery:
        "Infection risk, cytopenias and treatment-related fatigue are common. Immune recovery after intensive therapy or transplant continues for months.",
      hospitalStay: "Outpatient cycles to several weeks in or near the unit, depending on protocol",
      recoveryPeriod:
        "Weeks to months for intensive protocols. ALL maintenance and CML TKI therapy can continue for years.",
      followUp:
        "Request a written summary covering subtype, molecular findings, MRD plan, infection rules and remote review after returning home.",
      importantConsiderations:
        "There is no single leukemia package. CAR-T and BMT are neighbouring sheets. Neutropenic fever, uncontrolled bleeding or breathlessness belongs in a local emergency department.",
      treatmentType: "Leukemia / Hemato-Oncology",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Chemotherapy, targeted TKIs, immunotherapy, MRD-guided decisions and selected allogeneic transplant or CAR-T",
      searchKeywords: [
        "leukemia treatment in India",
        "leukemia treatment cost in India",
        "AML treatment in India",
        "ALL treatment in India",
        "CML treatment in India",
        "CLL treatment in India",
        "blood cancer treatment in India",
        "leukemia chemotherapy in India",
        "bone marrow transplant for leukemia in India",
      ],
      faqs: [
        {
          id: "leu-faq-1",
          question: "How much does leukemia treatment cost in India?",
          answer:
            "There is no single package. Named chemotherapy is $1,500–$8,000+. Targeted therapy is $8,000–$30,000. Bone marrow transplantation is $25,000–$70,000.",
        },
        {
          id: "leu-faq-2",
          question: "Does every leukemia patient need a transplant?",
          answer:
            "No. Transplant is considered for selected high-risk, relapsed or refractory cases. Named BMT lists sit on the bone marrow transplant page.",
        },
        {
          id: "leu-faq-3",
          question: "Is chemotherapy always required?",
          answer:
            "No. Many CML cases start on oral TKIs. Selected CLL can be observed before treatment.",
        },
        {
          id: "leu-faq-4",
          question: "Can children be treated for leukemia in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Adult floors are not a substitute paediatric unit.",
        },
        {
          id: "leu-faq-5",
          question: "Does CAR-T use the chemotherapy sheet?",
          answer:
            "No. Neighbouring CAR-T cell therapy is $80,000–$180,000 and is a different cellular-therapy product.",
        },
        {
          id: "leu-faq-6",
          question: "Can international patients come to India for leukemia?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel. Acute leukemia may make delay unsafe.",
        },
        {
          id: "leu-faq-7",
          question: "Which city in India is best for leukemia treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "leu-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Neutropenic fever, uncontrolled bleeding or breathlessness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "leu-faq-9",
          question: "Is there a GAF AML or ALL treatment page?",
          answer:
            "No. AML, ALL, CML and CLL pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "leu-faq-10",
          question: "How is response measured?",
          answer:
            "Blood counts, marrow examination, molecular tests and MRD, depending on the subtype.",
        },
        {
          id: "leu-faq-11",
          question: "Does CLL always need immediate treatment?",
          answer:
            "No. Observation can be appropriate when there are no significant symptoms or progressive disease.",
        },
        {
          id: "leu-faq-12",
          question: "Can leukemia be cured?",
          answer:
            "Some subtypes can enter long-term remission. Others are controlled for years with ongoing medicine. The answer is subtype-specific.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping cell-like shapes used as the leukemia treatment hero",
      seoTitle: "Leukemia Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about leukemia treatment in India, including AML, ALL, CML and CLL, chemotherapy $1,500–$8,000+, targeted therapy, transplant and how to send records.",
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

linkRelated(BMT, BMT_NEEDLE, RELATED_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [bone marrow transplant in India](https://gaf.healthcare/treatments/bone-marrow-transplant-in-india).",
    ", [bone marrow transplant in India](https://gaf.healthcare/treatments/bone-marrow-transplant-in-india) and [leukemia treatment in India](https://gaf.healthcare/treatments/leukemia-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle}${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/bmt-treatment-body.md"), BMT_NEEDLE, RELATED_ADDITION);
