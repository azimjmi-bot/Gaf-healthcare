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

const body = readFileSync(resolve("scripts/myeloma-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "multiple-myeloma-treatment-in-india");
const now = "2026-09-29T17:00:00.000Z";
const SLUG = "multiple-myeloma-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const SICKLE = "sickle-cell-anemia-treatment-in-india";
const ADDITION =
  " Myeloma lists sit on [Multiple Myeloma Treatment in India](/treatments/multiple-myeloma-treatment-in-india).";
const SHARED_NEEDLE =
  " Sickle cell lists sit on [Sickle Cell Anemia Treatment in India](/treatments/sickle-cell-anemia-treatment-in-india).";
const SICKLE_NEEDLE =
  "Sickle-cell-disease, hydroxyurea, gene-therapy, pain-crisis, acute-chest-syndrome and sickle-cell-stroke treatment pages are not live on this site. Use the named modality sheets rather than an invented disease page.";

const treatment = {
  id: existing?.id ?? "e8a2d6c5-1f09-2374-c12f-5a3d0d4f9c62",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Multiple Myeloma Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Hemato-Oncology",
  category: "Multiple Myeloma",
  image: "/uploads/treatments/myeloma-hero.webp",
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
    "antibody-drug-conjugate-therapy",
    "maintenance-therapy",
    "precision-oncology",
    "car-t-cell-therapy",
    "bone-marrow-transplantation",
    "autologous-stem-cell-transplant",
    "allogeneic-stem-cell-transplant",
    "bone-marrow-biopsy",
    "external-beam-radiotherapy-ebrt",
    "intensity-modulated-radiotherapy-imrt",
  ],
  relatedTreatmentSlugs: [BMT, LEUKEMIA, LYMPHOMA, THALASSEMIA, SICKLE],
  status: "published" as const,
  featured: true,
  sortOrder: 41,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Multiple Myeloma Treatment in India",
      shortDescription:
        "Multiple myeloma treatment in India is planned by risk and transplant eligibility — induction, autologous transplant, maintenance or selected relapse therapy quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "mm-step-1",
          title: "Share reports",
          description:
            "The patient provides SPEP, immunofixation, free-light-chain, marrow, FISH and imaging reports before anyone books travel.",
        },
        {
          id: "mm-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is newly diagnosed, transplant-eligible, transplant-ineligible or relapsed.",
        },
        {
          id: "mm-step-3",
          title: "Name the pathway",
          description:
            "The team writes induction, autologous transplant, maintenance or a named relapse product as separate items.",
        },
        {
          id: "mm-step-4",
          title: "Itemized estimate",
          description:
            "There is no single myeloma package. Neighbouring autologous transplant is $18,000–$48,000. Neighbouring chemotherapy is $1,500–$8,000+.",
        },
        {
          id: "mm-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever during neutropenia or cord-compression signs is a local emergency.",
        },
        {
          id: "mm-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms blood, marrow, kidney and imaging findings after arrival.",
        },
        {
          id: "mm-step-7",
          title: "Deliver the named pathway",
          description:
            "Induction, collection, ASCT or maintenance proceeds only after risk and fitness are named.",
        },
        {
          id: "mm-step-8",
          title: "Response review",
          description:
            "M-protein, free light chains, imaging and selected MRD testing decide whether another line is honest.",
        },
        {
          id: "mm-step-9",
          title: "Return home",
          description:
            "The patient leaves with medicine lists, infection rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share SPEP, immunofixation, free-light-chain, marrow, FISH and imaging reports before anyone books travel.",
      recovery:
        "Infection risk, fatigue and blood-count recovery are common after induction or ASCT. Maintenance can continue for years.",
      hospitalStay: "Outpatient cycles to 3–5 weeks in or near the unit for autologous transplant",
      recoveryPeriod:
        "Months after ASCT. Maintenance can continue for an extended period. Relapse may start another line.",
      followUp:
        "Request a written summary covering ISS or R-ISS, cytogenetic risk, induction, transplant plan, maintenance and remote review after returning home.",
      importantConsiderations:
        "There is no single myeloma package. BCMA CAR-T availability in India needs case-by-case confirmation. Fever during neutropenia or cord-compression signs belong in a local emergency department.",
      treatmentType: "Multiple Myeloma / Hemato-Oncology",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Proteasome inhibitors, IMiDs, CD38 antibodies, autologous HSCT, maintenance and selected T-cell–redirecting therapy",
      searchKeywords: [
        "multiple myeloma treatment in India",
        "multiple myeloma treatment cost in India",
        "autologous stem cell transplant for myeloma in India",
        "myeloma chemotherapy in India",
        "CAR-T for multiple myeloma in India",
        "plasma cell neoplasm treatment in India",
      ],
      faqs: [
        {
          id: "mm-faq-1",
          question: "How much does multiple myeloma treatment cost in India?",
          answer:
            "There is no single package. Neighbouring autologous transplant is $18,000–$48,000. Neighbouring chemotherapy is $1,500–$8,000+. Neighbouring immunotherapy is $15,000–$45,000.",
        },
        {
          id: "mm-faq-2",
          question: "Is bone marrow transplant required for multiple myeloma?",
          answer:
            "Not for every patient. Autologous stem cell transplantation is important for medically suitable patients. Eligibility depends on fitness, organ function and disease biology rather than age alone.",
        },
        {
          id: "mm-faq-3",
          question: "Is multiple myeloma curable?",
          answer:
            "It is generally treated as a chronic, usually incurable blood cancer. Modern therapy can produce long periods of disease control.",
        },
        {
          id: "mm-faq-4",
          question: "Is CAR-T available for myeloma in India?",
          answer:
            "India has approved indigenous CD19 CAR-T products for certain B-cell cancers. BCMA-directed CAR-T for myeloma needs case-by-case confirmation.",
        },
        {
          id: "mm-faq-5",
          question: "Can international patients come to India for myeloma treatment?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel so the likely pathway and stay can be named.",
        },
        {
          id: "mm-faq-6",
          question: "Which city in India is best for myeloma treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "mm-faq-7",
          question: "When should I go to an emergency department?",
          answer:
            "Fever during neutropenia, uncontrolled bleeding, sudden breathlessness, new severe bone pain with leg weakness or numbness, or sudden confusion belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "mm-faq-8",
          question: "Is there a GAF myeloma drug or MGUS page?",
          answer:
            "No. MGUS, smoldering-myeloma, daratumumab and bispecific-antibody pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "mm-faq-9",
          question: "Can myeloma come back after a stem cell transplant?",
          answer:
            "Yes. Autologous transplant can produce deep responses, but relapse can still occur and may need another named line.",
        },
        {
          id: "mm-faq-10",
          question: "Can myeloma be treated without chemotherapy?",
          answer:
            "Some plans rely mainly on targeted medicines, monoclonal antibodies and immunomodulatory drugs. High-dose melphalan is still used as conditioning before autologous transplant.",
        },
        {
          id: "mm-faq-11",
          question: "What tests are needed before treatment?",
          answer:
            "CBC, kidney function, calcium, SPEP, immunofixation, free light chains, bone-marrow examination with FISH when indicated, and imaging.",
        },
        {
          id: "mm-faq-12",
          question: "Is myeloma the same as leukemia?",
          answer:
            "No. Myeloma is a plasma-cell neoplasm. Leukemia lists sit on the leukemia treatment page.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping marrow and plasma-cell forms used as the multiple myeloma treatment hero",
      seoTitle: "Multiple Myeloma Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about multiple myeloma treatment in India, including induction, autologous transplant $18,000–$48,000, maintenance, BCMA CAR-T caveats and how to send records.",
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
linkRelated(SICKLE, SICKLE_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [sickle cell anemia treatment in India](https://gaf.healthcare/treatments/sickle-cell-anemia-treatment-in-india).",
    ", [sickle cell anemia treatment in India](https://gaf.healthcare/treatments/sickle-cell-anemia-treatment-in-india) and [multiple myeloma treatment in India](https://gaf.healthcare/treatments/multiple-myeloma-treatment-in-india).",
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
patchMarkdown(resolve("scripts/sickle-cell-treatment-body.md"), SICKLE_NEEDLE, ADDITION);
