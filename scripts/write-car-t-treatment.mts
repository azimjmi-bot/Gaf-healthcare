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

const body = readFileSync(resolve("scripts/car-t-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "car-t-cell-therapy-in-india");
const now = "2026-10-03T07:20:00.000Z";
const SLUG = "car-t-cell-therapy-in-india";
const BMT = "bone-marrow-transplant-in-india";
const HSCT = "stem-cell-transplantation-in-india";
const AUTO = "autologous-bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const DCT = "dendritic-cell-therapy-in-india";
const LINK =
  " Named CAR-T lists sit on [CAR-T Cell Therapy in India](/treatments/car-t-cell-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** (apheresis plus 3–6 weeks nearby). It is a different cellular-therapy product from BMT.",
    `Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** (apheresis plus 3–6 weeks nearby). It is a different cellular-therapy product from BMT.${LINK}`,
  ],
  [
    "Cellular therapy invoices often have several billed components beyond the infusion itself. It is a different product from BMT.",
    `Cellular therapy invoices often have several billed components beyond the infusion itself. It is a different product from BMT.${LINK}`,
  ],
  [
    "That sheet is not a BCMA-myeloma quote and is not a substitute for CD19 products used in other blood cancers.",
    `That sheet is not a BCMA-myeloma quote and is not a substitute for CD19 products used in other blood cancers.${LINK}`,
  ],
  [
    "No. Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular-therapy product. Named dendritic-cell lists sit on [Dendritic Cell Therapy in India](/treatments/dendritic-cell-therapy-in-india).",
    `No. Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular-therapy product. Named dendritic-cell lists sit on [Dendritic Cell Therapy in India](/treatments/dendritic-cell-therapy-in-india).${LINK}`,
  ],
  [
    "That sheet is not an ASCT quote.",
    `That sheet is not an ASCT quote.${LINK}`,
  ],
  [
    "**CAR-T and dendritic-cell therapy are not the same treatment.** [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) genetically modifies T cells.",
    `**CAR-T and dendritic-cell therapy are not the same treatment.** [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) genetically modifies T cells.${LINK}`,
  ],
  [
    "Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular product.",
    `Neighbouring [CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular product.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "e7b2c9d4-5a18-4f63-b740-1d8e3c6a2f90",
  slug: SLUG,
  previousSlugs: [],
  baseName: "CAR-T Cell Therapy in India",
  specialtySlug: "hematology",
  subspecialty: "CAR-T Cell Therapy",
  category: "CAR-T Cell Therapy",
  image: "/uploads/treatments/cart-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-dharma-choudhary",
    "dr-ajay-gupta",
    "dr-muralidaran-c",
    "dr-akshay-shah",
    "dr-govind-eriat",
    "dr-neema-bhat",
    "dr-m-gopinathan",
    "dr-prabu-p",
    "dr-k-karuna-kumar",
    "dr-narender-kumar-thota",
  ],
  hospitalSlugs: [
    "blk-max-delhi",
    "apollo-delhi",
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
    "car-t-cell-therapy",
    "chemotherapy",
    "immunotherapy",
    "bone-marrow-transplantation",
    "stem-cell-transplantation",
    "autologous-stem-cell-transplant",
    "allogeneic-stem-cell-transplant",
    "dendritic-cell-therapy",
  ],
  relatedTreatmentSlugs: [LEUKEMIA, LYMPHOMA, MYELOMA, BMT, HSCT, AUTO, DCT],
  status: "published" as const,
  featured: true,
  sortOrder: 39,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "CAR-T Cell Therapy in India",
      shortDescription:
        "CAR-T cell therapy in India is a named autologous engineered T-cell product. GAF planning is $80,000–$180,000, typically apheresis plus 3–6 weeks nearby.",
      editorialBody: body,
      process: [
        {
          id: "cart-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, flow cytometry, PET-CT, previous treatment and antigen reports before anyone books travel.",
        },
        {
          id: "cart-step-2",
          title: "Cellular-therapy review",
          description:
            "A haematologist reviews whether a named CAR-T product, transplant, chemotherapy or no India list is the honest next step.",
        },
        {
          id: "cart-step-3",
          title: "Name the product",
          description:
            "The team writes the exact CAR-T product, antigen, regulatory status and whether a registered trial applies.",
        },
        {
          id: "cart-step-4",
          title: "Itemized estimate",
          description:
            "GAF CAR-T planning is $80,000–$180,000. Neighbouring BMT is $25,000–$70,000. Neighbouring chemotherapy is $1,500–$8,000+.",
        },
        {
          id: "cart-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. High fever, breathing difficulty or sudden confusion is a local emergency.",
        },
        {
          id: "cart-step-6",
          title: "Collection and manufacturing",
          description:
            "Leukapheresis, genetic modification, expansion and quality-control release follow the written calendar.",
        },
        {
          id: "cart-step-7",
          title: "Lymphodepletion and infusion",
          description:
            "Preparatory chemotherapy is given, then the engineered cells are infused through a vein.",
        },
        {
          id: "cart-step-8",
          title: "CRS and ICANS watch",
          description:
            "Fever, blood-pressure changes, breathing difficulty and neurological symptoms are watched before discharge.",
        },
        {
          id: "cart-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the product name, expected effects, infection rules and who will continue care at home.",
        },
      ],
      preparation:
        "Share complete haematology records so the team can judge a named CAR-T product versus transplant, chemotherapy or no India list.",
      recovery:
        "Most programmes require nearby housing for several weeks. Immune recovery and infection risk continue after discharge.",
      hospitalStay: "Apheresis plus 3–6 weeks nearby",
      recoveryPeriod:
        "Collection, manufacturing and post-infusion monitoring often span weeks. Standard cancer follow-up continues at home.",
      followUp:
        "Request a written summary covering the product name, regulatory status, CRS and ICANS warning signs and who will follow the patient after returning home.",
      importantConsiderations:
        "CAR-T is not a universal cancer cure and is not a bone-marrow transplant. GAF planning is $80,000–$180,000. High fever, breathing difficulty or sudden confusion after infusion belongs in a local emergency department.",
      treatmentType: "CAR-T Cell Therapy / Hematology",
      treatmentSetting: "Accredited partner haematology and authorised CAR-T programmes in India",
      technology:
        "Autologous CAR-T manufacturing, leukapheresis, lymphodepletion, neighbouring transplant, chemotherapy and dendritic-cell sheets",
      searchKeywords: [
        "CAR-T cell therapy in India",
        "CAR T cell therapy cost in India",
        "CAR T treatment in India",
        "NexCAR19 India",
        "CAR T therapy for lymphoma in India",
        "CAR T therapy for leukemia in India",
        "CAR T cell therapy for B-ALL",
        "CAR T cell therapy hospitals in India",
        "CAR T treatment for international patients",
        "CD19 CAR-T India",
        "BCMA CAR-T India",
      ],
      faqs: [
        {
          id: "cart-faq-1",
          question: "What is CAR-T cell therapy?",
          answer:
            "A personalised cellular immunotherapy made from the patient's own T cells, genetically modified to recognise a cancer-associated antigen.",
        },
        {
          id: "cart-faq-2",
          question: "How much does CAR-T cell therapy cost in India?",
          answer:
            "GAF Healthcare planning is $80,000–$180,000, typically apheresis plus 3–6 weeks nearby. US comparison is $400,000–$550,000.",
        },
        {
          id: "cart-faq-3",
          question: "Is CAR-T available in India?",
          answer:
            "Yes. India has domestically developed and approved CAR-T products. Availability depends on the exact product, indication and authorised centre.",
        },
        {
          id: "cart-faq-4",
          question: "Which cancers are treated?",
          answer:
            "Approved Indian products primarily address selected relapsed or refractory B-cell blood cancers. Solid-tumour use remains investigational.",
        },
        {
          id: "cart-faq-5",
          question: "Is it the same as a bone marrow transplant?",
          answer:
            "No. Allogeneic transplant uses donor stem cells. CAR-T generally uses the patient's own genetically modified T cells.",
        },
        {
          id: "cart-faq-6",
          question: "Is it a one-time treatment?",
          answer:
            "The infusion itself is generally a single infusion, but the complete pathway involves several stages before and after.",
        },
        {
          id: "cart-faq-7",
          question: "Can it cure cancer?",
          answer:
            "Some patients achieve durable complete remission. It should not be described as a guaranteed cure.",
        },
        {
          id: "cart-faq-8",
          question: "What are the major side effects?",
          answer:
            "Cytokine release syndrome, ICANS, infections, low blood counts and immune-system effects.",
        },
        {
          id: "cart-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "High fever, breathing difficulty, sudden confusion, seizure or collapse after infusion belongs in a local emergency department.",
        },
        {
          id: "cart-faq-10",
          question: "Should I stop chemotherapy first?",
          answer:
            "Do not stop or delay standard treatment without discussing it with the treating haematologist. Bridging may be part of the protocol.",
        },
        {
          id: "cart-faq-11",
          question: "Can international patients receive CAR-T in India?",
          answer:
            "Potentially, if they meet the treating centre's clinical and regulatory requirements. Records should be reviewed before travel.",
        },
        {
          id: "cart-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus authorised for the named product.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of an engineered T cell with a chimeric receptor approaching a marked tumour cell",
      seoTitle: "CAR-T Cell Therapy in India: Cost, Treatment, Eligibility & Recovery",
      metaDescription:
        "CAR-T cell therapy in India explained: GAF planning $80,000–$180,000, NexCAR19 context, eligibility, CRS and ICANS risks, and how it differs from transplant and chemotherapy.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function patchEditorial(slug: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  let editorial = row.translations?.en?.editorialBody ?? "";
  if (!editorial) return;
  if (!editorial.includes(`/treatments/${SLUG}`)) {
    for (const [needle, replacement] of REPLACEMENTS) {
      if (editorial.includes(`/treatments/${SLUG}`)) break;
      if (editorial.includes(needle)) {
        editorial = editorial.replaceAll(needle, replacement);
      }
    }
    row.translations!.en!.editorialBody = editorial;
  }
}

for (const slug of [LEUKEMIA, LYMPHOMA, MYELOMA, BMT, HSCT, AUTO, DCT]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Stem Cell Transplantation in India](https://gaf.healthcare/treatments/stem-cell-transplantation-in-india).",
    ", [Stem Cell Transplantation in India](https://gaf.healthcare/treatments/stem-cell-transplantation-in-india) and [CAR-T Cell Therapy in India](https://gaf.healthcare/treatments/car-t-cell-therapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string) {
  if (!existsSync(path)) return;
  let text = readFileSync(path, "utf8");
  const original = text;
  if (text.includes(`/treatments/${SLUG}`)) return;
  for (const [needle, replacement] of REPLACEMENTS) {
    if (text.includes(`/treatments/${SLUG}`)) break;
    if (text.includes(needle)) {
      text = text.replaceAll(needle, replacement);
    }
  }
  if (text !== original) {
    writeFileSync(path, text);
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"));
patchMarkdown(resolve("scripts/bmt-treatment-body.md"));
patchMarkdown(resolve("scripts/stem-cell-transplantation-treatment-body.md"));
patchMarkdown(resolve("scripts/autologous-bmt-treatment-body.md"));
patchMarkdown(resolve("scripts/dendritic-cell-treatment-body.md"));
