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

const body = readFileSync(resolve("scripts/thalassemia-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "thalassemia-treatment-in-india");
const now = "2026-09-29T16:00:00.000Z";
const SLUG = "thalassemia-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const ADDITION =
  " Thalassemia lists sit on [Thalassemia Treatment in India](/treatments/thalassemia-treatment-in-india).";
const BMT_NEEDLE =
  " Lymphoma lists sit on [Lymphoma Treatment in India](/treatments/lymphoma-treatment-in-india).";
const LEUKEMIA_NEEDLE =
  "AML, ALL, CML, CLL and blood-cancer treatment pages are not live on this site. Lymphoma lists sit on [Lymphoma Treatment in India](/treatments/lymphoma-treatment-in-india).";
const LYMPHOMA_NEEDLE =
  "Hodgkin lymphoma, non-Hodgkin lymphoma, DLBCL, follicular lymphoma, mantle-cell lymphoma, Burkitt lymphoma and blood-cancer treatment pages are not live on this site. Use the named modality sheets rather than an invented disease page.";

const treatment = {
  id: existing?.id ?? "c6e0b4a3-9d87-0152-af0d-3e1b8b2d7a40",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Thalassemia Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Hemoglobinopathy",
  category: "Thalassemia",
  image: "/uploads/treatments/thalassemia-hero.webp",
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
    "bone-marrow-transplantation",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "matched-unrelated-donor-transplant",
    "pediatric-bone-marrow-transplantation",
    "matched-sibling-donor-transplant",
    "hematopoietic-stem-cell-transplantation",
    "bone-marrow-biopsy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [BMT, LEUKEMIA, LYMPHOMA, "sickle-cell-anemia-treatment-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 39,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Thalassemia Treatment in India",
      shortDescription:
        "Thalassemia treatment in India is planned by type and transfusion need — chelation, iron monitoring or allogeneic transplant quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "tha-step-1",
          title: "Share reports",
          description:
            "The patient provides CBC, HPLC, genetic results, transfusion history, ferritin, MRI and any previous transplant notes.",
        },
        {
          id: "tha-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is trait, NTDT or transfusion-dependent and whether a graft should be discussed early.",
        },
        {
          id: "tha-step-3",
          title: "Name the pathway",
          description:
            "The team writes transfusion and chelation, iron-complication care or allogeneic HSCT as separate products.",
        },
        {
          id: "tha-step-4",
          title: "Itemized estimate",
          description:
            "There is no single thalassemia package. Named BMT is $25,000–$70,000. Neighbouring allogeneic is $30,000–$80,000.",
        },
        {
          id: "tha-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever after transfusion or chest pain is a local emergency.",
        },
        {
          id: "tha-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms haemoglobin, iron, antibodies and organ function after arrival.",
        },
        {
          id: "tha-step-7",
          title: "Deliver the named pathway",
          description:
            "Transfusion, chelation or conditioning proceeds only after the type and iron burden are named.",
        },
        {
          id: "tha-step-8",
          title: "Response and iron review",
          description:
            "Haemoglobin, ferritin and selected MRI decide whether chelation, a graft or another line is honest.",
        },
        {
          id: "tha-step-9",
          title: "Return home",
          description:
            "The patient leaves with transfusion targets, chelation lists, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share CBC, HPLC, genetic results, transfusion history, ferritin, MRI and previous treatment notes before anyone books travel.",
      recovery:
        "Infection risk after transplant and iron-related fatigue are common. Conventional TDT care continues for years unless a graft succeeds.",
      hospitalStay: "Outpatient transfusion visits to several weeks in or near a transplant unit",
      recoveryPeriod:
        "Lifelong transfusion and chelation unless a successful transplant. Transplant recovery continues for months.",
      followUp:
        "Request a written summary covering type, haemoglobin target, chelation, iron-MRI plan and remote review after returning home.",
      importantConsiderations:
        "There is no single thalassemia package. Gene therapy and chelation have no live GAF sheets. Fever after transfusion or chest pain belongs in a local emergency department.",
      treatmentType: "Thalassemia / Hemoglobinopathy",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Leukodepleted transfusion, iron chelation, MRI iron mapping and selected allogeneic HSCT",
      searchKeywords: [
        "thalassemia treatment in India",
        "thalassemia treatment cost in India",
        "beta thalassemia treatment in India",
        "thalassemia major treatment in India",
        "bone marrow transplant for thalassemia in India",
        "iron chelation therapy in India",
        "transfusion-dependent thalassemia treatment",
      ],
      faqs: [
        {
          id: "tha-faq-1",
          question: "How much does thalassemia treatment cost in India?",
          answer:
            "There is no single package. Recurring transfusion and chelation are hospital-priced. Named BMT is $25,000–$70,000. Neighbouring allogeneic is $30,000–$80,000.",
        },
        {
          id: "tha-faq-2",
          question: "Can a bone marrow transplant cure thalassemia?",
          answer:
            "Successful allogeneic HSCT can eliminate transfusion dependence in selected patients. Named BMT lists sit on the bone marrow transplant page.",
        },
        {
          id: "tha-faq-3",
          question: "Is chemotherapy required?",
          answer:
            "No. Conventional TDT care is transfusion and chelation. Conditioning drugs are used only if a transplant is the named product.",
        },
        {
          id: "tha-faq-4",
          question: "Can children be treated for thalassemia in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Adult floors are not a substitute paediatric unit.",
        },
        {
          id: "tha-faq-5",
          question: "Does gene therapy use the BMT sheet?",
          answer:
            "No. There is no live GAF gene-therapy sheet. Confirm Indian availability with the treating centre.",
        },
        {
          id: "tha-faq-6",
          question: "Can international patients come to India for thalassemia?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel.",
        },
        {
          id: "tha-faq-7",
          question: "Which city in India is best for thalassemia treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "tha-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Fever after transfusion, chest pain, severe breathlessness or fever after transplant belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "tha-faq-9",
          question: "Is there a GAF alpha-thalassemia or gene-therapy page?",
          answer:
            "No. Alpha-thalassemia, beta-thalassemia and gene-therapy pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "tha-faq-10",
          question: "How is iron overload measured?",
          answer:
            "Ferritin trends plus, when indicated, liver-iron MRI and cardiac T2-star MRI.",
        },
        {
          id: "tha-faq-11",
          question: "Does trait always need transfusion?",
          answer:
            "No. Thalassemia trait is usually observed with counselling. Transfusion-dependent disease is a different pathway.",
        },
        {
          id: "tha-faq-12",
          question: "Can thalassemia be cured?",
          answer:
            "Selected patients can become transfusion-independent after allogeneic HSCT. Others are managed for years with transfusion and chelation.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping disc-like shapes used as the thalassemia treatment hero",
      seoTitle: "Thalassemia Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about thalassemia treatment in India, including transfusion, iron chelation, allogeneic transplant $30,000–$80,000, gene-therapy caveats and how to send records.",
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

linkRelated(BMT, BMT_NEEDLE, ADDITION);
linkRelated(LEUKEMIA, LEUKEMIA_NEEDLE, ADDITION);
linkRelated(LYMPHOMA, LYMPHOMA_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [lymphoma treatment in India](https://gaf.healthcare/treatments/lymphoma-treatment-in-india).",
    ", [lymphoma treatment in India](https://gaf.healthcare/treatments/lymphoma-treatment-in-india) and [thalassemia treatment in India](https://gaf.healthcare/treatments/thalassemia-treatment-in-india).",
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

patchMarkdown(resolve("scripts/bmt-treatment-body.md"), BMT_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"), LEUKEMIA_NEEDLE, ADDITION);
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"), LYMPHOMA_NEEDLE, ADDITION);
