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

const body = readFileSync(resolve("scripts/fanconi-anemia-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "fanconi-anemia-treatment-in-india");
const now = "2026-09-29T18:30:00.000Z";
const SLUG = "fanconi-anemia-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const SICKLE = "sickle-cell-anemia-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const APLASTIC = "aplastic-anemia-treatment-in-india";
const AUTOLOGOUS = "autologous-bone-marrow-transplant-in-india";
const ADDITION =
  " Fanconi anemia lists sit on [Fanconi Anemia Treatment in India](/treatments/fanconi-anemia-treatment-in-india).";
const SHARED_NEEDLE =
  " Autologous transplant lists sit on [Autologous Bone Marrow Transplant in India](/treatments/autologous-bone-marrow-transplant-in-india).";
const AUTOLOGOUS_NEEDLE =
  "Hodgkin-lymphoma, non-Hodgkin-lymphoma, allogeneic-BMT, CAR-T-treatment, haematology-treatment and autologous-BMT-cost pages are not live on this site. Use this pillar page plus the named modality sheets.";
const FANCONI_NOT_LIVE =
  "PNH, Fanconi-anemia, MDS and aplastic-anemia-BMT treatment pages are not live on this site.";
const FANCONI_LIVE =
  "PNH, MDS and aplastic-anemia-BMT treatment pages are not live on this site.";

const treatment = {
  id: existing?.id ?? "b2d5a9f8-4c32-5607-f45a-8d6a3a7c2f95",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Fanconi Anemia Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Bone Marrow Failure",
  category: "Fanconi Anemia",
  image: "/uploads/treatments/fanconi-anemia-hero.webp",
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
  relatedTreatmentSlugs: [BMT, APLASTIC, THALASSEMIA, SICKLE, LEUKEMIA, LYMPHOMA, MYELOMA, AUTOLOGOUS],
  status: "published" as const,
  featured: true,
  sortOrder: 44,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Fanconi Anemia Treatment in India",
      shortDescription:
        "Fanconi anemia treatment in India is planned by marrow failure and donor status — supportive care or allogeneic HSCT quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "fa-step-1",
          title: "Share reports",
          description:
            "The family provides CBC trends, marrow, DEB/MMC, genetics, HLA and transfusion notes before anyone books travel.",
        },
        {
          id: "fa-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is supportive care or an FA-specific allogeneic transplant.",
        },
        {
          id: "fa-step-3",
          title: "Name the pathway",
          description:
            "The team writes androgens, G-CSF or a screened donor graft as separate products.",
        },
        {
          id: "fa-step-4",
          title: "Itemized estimate",
          description:
            "There is no single Fanconi package. Neighbouring allogeneic transplant is $30,000–$80,000. Neighbouring paediatric BMT is $28,000–$75,000.",
        },
        {
          id: "fa-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever during neutropenia is a local emergency.",
        },
        {
          id: "fa-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms breakage testing, genetics, infection status and donor screening after arrival.",
        },
        {
          id: "fa-step-7",
          title: "Deliver the named pathway",
          description:
            "Supportive care or FA-specific conditioning proceeds only after the gene and donor status are named.",
        },
        {
          id: "fa-step-8",
          title: "Response review",
          description:
            "Counts, graft function or medicine response decide whether another line is honest.",
        },
        {
          id: "fa-step-9",
          title: "Lifelong plan",
          description:
            "The family leaves with infection rules, cancer-surveillance dates and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share CBC trends, marrow, DEB/MMC, genetics, HLA and transfusion notes before anyone books travel.",
      recovery:
        "Infection risk and delayed count recovery are common after HSCT. Cancer surveillance continues for life.",
      hospitalStay: "6–10 weeks nearby for allogeneic transplant; paediatric units 6–12 weeks with a parent nearby",
      recoveryPeriod:
        "Counts recover over weeks after HSCT. Lifelong surveillance for solid tumours and FA complications continues.",
      followUp:
        "Request a written summary covering the FA gene, donor screening, graft or supportive plan and lifelong cancer surveillance after returning home.",
      importantConsiderations:
        "There is no single Fanconi package. Autologous collection is not the product. Fever during neutropenia belongs in a local emergency department.",
      treatmentType: "Fanconi Anemia / Inherited Bone Marrow Failure",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "DEB/MMC breakage testing, FA gene panels, FA-specific reduced-intensity allogeneic HSCT",
      searchKeywords: [
        "Fanconi anemia treatment in India",
        "Fanconi anemia bone marrow transplant India",
        "Fanconi anemia stem cell transplant India",
        "Fanconi anemia treatment cost in India",
        "Fanconi anemia treatment for international patients",
        "Fanconi anemia diagnosis India",
      ],
      faqs: [
        {
          id: "fa-faq-1",
          question: "How much does Fanconi anemia treatment cost in India?",
          answer:
            "There is no single package. Neighbouring allogeneic transplant is $30,000–$80,000. Neighbouring paediatric BMT is $28,000–$75,000. Androgens and breakage testing are hospital-priced.",
        },
        {
          id: "fa-faq-2",
          question: "Can a bone marrow transplant cure Fanconi anemia?",
          answer:
            "HSCT can cure the haematologic manifestations. It does not correct congenital abnormalities or remove solid-tumour risk.",
        },
        {
          id: "fa-faq-3",
          question: "Does every patient need a transplant?",
          answer:
            "No. Selected patients are managed with supportive care, androgens or G-CSF until a graft is the honest product.",
        },
        {
          id: "fa-faq-4",
          question: "Can children be treated for Fanconi anemia in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Adult floors are not a substitute.",
        },
        {
          id: "fa-faq-5",
          question: "Is there a GAF androgen or DEB page?",
          answer:
            "No. Androgen, G-CSF, DEB/MMC, MDS and AML pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "fa-faq-6",
          question: "Can international patients come to India for Fanconi anemia treatment?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel.",
        },
        {
          id: "fa-faq-7",
          question: "Which city in India is best for Fanconi anemia treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "fa-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "High fever during neutropenia, uncontrolled bleeding, sudden breathlessness or sudden confusion belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "fa-faq-9",
          question: "Is Fanconi anemia the same as aplastic anemia?",
          answer:
            "No. Aplastic anemia describes marrow failure. Fanconi anemia is a specific inherited DNA-repair disorder that can cause marrow failure.",
        },
        {
          id: "fa-faq-10",
          question: "Can a sibling donate?",
          answer:
            "Only after HLA and FA screening. A sibling is not a donor simply because they are a sibling.",
        },
        {
          id: "fa-faq-11",
          question: "Is autologous transplant used for Fanconi anemia?",
          answer:
            "No. Fanconi anemia uses a screened donor graft. Autologous collection is not a substitute product.",
        },
        {
          id: "fa-faq-12",
          question: "Does transplant remove cancer risk?",
          answer:
            "No. Lifelong solid-tumour surveillance remains necessary after successful HSCT.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping DNA-repair and marrow forms used as the Fanconi anemia treatment hero",
      seoTitle: "Fanconi Anemia Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about Fanconi anemia treatment in India, including DEB/MMC testing, androgens, allogeneic transplant $30,000–$80,000, paediatric BMT $28,000–$75,000 and how to send records.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function rewriteEditorial(slug: string, from: string, to: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  const editorial = row?.translations?.en?.editorialBody;
  if (row && editorial?.includes(from)) {
    row.translations!.en!.editorialBody = editorial.replace(from, to);
  }
}

rewriteEditorial(APLASTIC, FANCONI_NOT_LIVE, FANCONI_LIVE);

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
linkRelated(MYELOMA, SHARED_NEEDLE, ADDITION);
linkRelated(APLASTIC, SHARED_NEEDLE, ADDITION);
linkRelated(AUTOLOGOUS, AUTOLOGOUS_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [autologous bone marrow transplant in India](https://gaf.healthcare/treatments/autologous-bone-marrow-transplant-in-india).",
    ", [autologous bone marrow transplant in India](https://gaf.healthcare/treatments/autologous-bone-marrow-transplant-in-india) and [Fanconi anemia treatment in India](https://gaf.healthcare/treatments/fanconi-anemia-treatment-in-india).",
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

function rewriteFile(path: string, from: string, to: string) {
  const text = readFileSync(path, "utf8");
  if (text.includes(from)) {
    writeFileSync(path, text.replace(from, to));
    console.log("rewrote", path);
  }
}

rewriteFile(resolve("scripts/aplastic-anemia-treatment-body.md"), FANCONI_NOT_LIVE, FANCONI_LIVE);
patchMarkdown(resolve("scripts/bmt-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/thalassemia-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/sickle-cell-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aplastic-anemia-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/autologous-bmt-treatment-body.md"), AUTOLOGOUS_NEEDLE, ADDITION);
