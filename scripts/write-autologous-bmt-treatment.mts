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

const body = readFileSync(resolve("scripts/autologous-bmt-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "autologous-bone-marrow-transplant-in-india");
const now = "2026-09-29T18:00:00.000Z";
const SLUG = "autologous-bone-marrow-transplant-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const SICKLE = "sickle-cell-anemia-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const APLASTIC = "aplastic-anemia-treatment-in-india";
const ADDITION =
  " Autologous transplant lists sit on [Autologous Bone Marrow Transplant in India](/treatments/autologous-bone-marrow-transplant-in-india).";
const SHARED_NEEDLE =
  " Aplastic anemia lists sit on [Aplastic Anemia Treatment in India](/treatments/aplastic-anemia-treatment-in-india).";
const APLASTIC_NEEDLE =
  "PNH, Fanconi-anemia, MDS and aplastic-anemia-BMT treatment pages are not live on this site. Use this pillar page plus the named modality sheets.";

const treatment = {
  id: existing?.id ?? "a1c4f8e7-3b21-4596-e34f-7c5f2f6b1e84",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Autologous Bone Marrow Transplant in India",
  specialtySlug: "hematology",
  subspecialty: "Hemato-Oncology",
  category: "Autologous Bone Marrow Transplant",
  image: "/uploads/treatments/autologous-bmt-hero.webp",
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
    "autologous-stem-cell-transplant",
    "bone-marrow-transplantation",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "car-t-cell-therapy",
    "chemotherapy",
    "maintenance-therapy",
    "bone-marrow-biopsy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [BMT, MYELOMA, LYMPHOMA, LEUKEMIA, APLASTIC, THALASSEMIA, SICKLE],
  status: "published" as const,
  featured: true,
  sortOrder: 43,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Autologous Bone Marrow Transplant in India",
      shortDescription:
        "Autologous bone marrow transplant in India uses the patient's own stem cells after high-dose therapy — quoted from the named GAF autologous sheet.",
      editorialBody: body,
      process: [
        {
          id: "asct-step-1",
          title: "Share reports",
          description:
            "The patient provides pathology, PET-CT, marrow, organ-function and previous-treatment notes before anyone books travel.",
        },
        {
          id: "asct-step-2",
          title: "Virtual transplant opinion",
          description:
            "A transplant specialist reviews whether ASCT, allogeneic graft or a non-transplant line is the honest product.",
        },
        {
          id: "asct-step-3",
          title: "Name the pathway",
          description:
            "The team writes mobilisation, collection, conditioning and autologous infusion as one named ASCT product.",
        },
        {
          id: "asct-step-4",
          title: "Itemized estimate",
          description:
            "There is no separate autologous-BMT package. Neighbouring autologous transplant is $18,000–$48,000. Neighbouring BMT is $25,000–$70,000.",
        },
        {
          id: "asct-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever during neutropenia is a local emergency.",
        },
        {
          id: "asct-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms disease status, organ function and infection screening after arrival.",
        },
        {
          id: "asct-step-7",
          title: "Collect and condition",
          description:
            "Mobilisation, apheresis, cryopreservation and high-dose therapy proceed only after fitness is named.",
        },
        {
          id: "asct-step-8",
          title: "Infuse and watch counts",
          description:
            "Day 0 returns the patient's own cells. Engraftment and infection watch decide discharge timing.",
        },
        {
          id: "asct-step-9",
          title: "Return home",
          description:
            "The patient leaves with medicine lists, infection rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share pathology, PET-CT, marrow, organ-function and previous-treatment notes before anyone books travel.",
      recovery:
        "Infection risk, mucositis and delayed count recovery are common. Broader immune recovery can take 3–12 months.",
      hospitalStay: "Typically 3–5 weeks in or near the unit",
      recoveryPeriod:
        "Counts recover over weeks. Immune recovery can take 3–12 months. Maintenance may continue afterward.",
      followUp:
        "Request a written summary covering disease, collection yield, conditioning, Day 0, count recovery and remote review after returning home.",
      importantConsiderations:
        "There is no separate autologous-BMT package. Allogeneic and CAR-T sheets are different products. Fever during neutropenia belongs in a local emergency department.",
      treatmentType: "Autologous Bone Marrow Transplant / Auto-HSCT",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Peripheral-blood stem-cell mobilisation, apheresis, cryopreservation and high-dose conditioning",
      searchKeywords: [
        "autologous bone marrow transplant in India",
        "autologous stem cell transplant in India",
        "ASCT in India",
        "autologous BMT cost in India",
        "bone marrow transplant for multiple myeloma",
        "autologous transplant for lymphoma",
      ],
      faqs: [
        {
          id: "asct-faq-1",
          question: "How much does autologous bone marrow transplant cost in India?",
          answer:
            "Neighbouring GAF autologous stem cell transplant planning is $18,000–$48,000. Neighbouring BMT umbrella planning is $25,000–$70,000 and is not a substitute autologous quote.",
        },
        {
          id: "asct-faq-2",
          question: "Does autologous transplant require a donor?",
          answer:
            "No. The patient's own stem cells are collected and returned after high-dose therapy.",
        },
        {
          id: "asct-faq-3",
          question: "Is autologous transplant the same as allogeneic transplant?",
          answer:
            "No. Autologous uses the patient's cells. Allogeneic uses a donor graft and is a different neighbouring sheet at $30,000–$80,000.",
        },
        {
          id: "asct-faq-4",
          question: "Is autologous transplant a cure for multiple myeloma?",
          answer:
            "Usually not. ASCT generally aims for a deeper and longer remission rather than a routine cure.",
        },
        {
          id: "asct-faq-5",
          question: "Can international patients come to India for autologous transplant?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel.",
        },
        {
          id: "asct-faq-6",
          question: "Which city in India is best for autologous transplant?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "asct-faq-7",
          question: "When should I go to an emergency department?",
          answer:
            "Fever during neutropenia, uncontrolled bleeding, sudden breathlessness or sudden confusion belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "asct-faq-8",
          question: "Is surgery involved?",
          answer:
            "No major surgery is usually required. Collection is typically apheresis and Day 0 is an intravenous infusion.",
        },
        {
          id: "asct-faq-9",
          question: "How long is the hospital stay?",
          answer:
            "Neighbouring GAF autologous planning is typically 3–5 weeks in or near the unit. Broader immune recovery can take months.",
        },
        {
          id: "asct-faq-10",
          question: "Can lymphoma be treated with autologous transplant?",
          answer:
            "Selected relapsed Hodgkin and non-Hodgkin lymphomas may use ASCT after salvage response. Lymphoma lists sit on the lymphoma treatment page.",
        },
        {
          id: "asct-faq-11",
          question: "Is there a separate autologous-BMT cost page?",
          answer:
            "No. Use the named autologous stem cell transplant sheet. Hodgkin-lymphoma and allogeneic-BMT treatment pages are not live.",
        },
        {
          id: "asct-faq-12",
          question: "Can stem cells be stored for later?",
          answer:
            "Yes. In some plans additional cells are collected and cryopreserved for possible future use.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping stored-cell and marrow-rescue forms used as the autologous transplant hero",
      seoTitle: "Autologous Bone Marrow Transplant in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about autologous bone marrow transplant in India, including collection, high-dose therapy, $18,000–$48,000 planning, myeloma and lymphoma indications and how to send records.",
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
linkRelated(MYELOMA, SHARED_NEEDLE, ADDITION);
linkRelated(APLASTIC, APLASTIC_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [aplastic anemia treatment in India](https://gaf.healthcare/treatments/aplastic-anemia-treatment-in-india).",
    ", [aplastic anemia treatment in India](https://gaf.healthcare/treatments/aplastic-anemia-treatment-in-india) and [autologous bone marrow transplant in India](https://gaf.healthcare/treatments/autologous-bone-marrow-transplant-in-india).",
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
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"), SHARED_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/aplastic-anemia-treatment-body.md"), APLASTIC_NEEDLE, ADDITION);
