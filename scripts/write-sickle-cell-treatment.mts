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

const body = readFileSync(resolve("scripts/sickle-cell-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "sickle-cell-anemia-treatment-in-india");
const now = "2026-09-29T16:30:00.000Z";
const SLUG = "sickle-cell-anemia-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const ADDITION =
  " Sickle cell lists sit on [Sickle Cell Anemia Treatment in India](/treatments/sickle-cell-anemia-treatment-in-india).";
const SHARED_NEEDLE =
  " Thalassemia lists sit on [Thalassemia Treatment in India](/treatments/thalassemia-treatment-in-india).";
const THALASSEMIA_NEEDLE =
  "Alpha-thalassemia, beta-thalassemia, thalassemia-major, gene-therapy, haematology-treatment and genetic-testing treatment pages are not live on this site. Use the named modality sheets rather than an invented disease page.";

const treatment = {
  id: existing?.id ?? "d7f1c5b4-0e98-1263-b01e-4f2c9c3e8b51",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Sickle Cell Anemia Treatment in India",
  specialtySlug: "hematology",
  subspecialty: "Hemoglobinopathy",
  category: "Sickle Cell Anemia",
  image: "/uploads/treatments/sickle-cell-hero.webp",
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
  relatedTreatmentSlugs: [BMT, LEUKEMIA, LYMPHOMA, THALASSEMIA],
  status: "published" as const,
  featured: true,
  sortOrder: 40,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Sickle Cell Anemia Treatment in India",
      shortDescription:
        "Sickle cell anemia treatment in India is planned by genotype and complications — hydroxyurea, selected transfusion or allogeneic transplant quoted from named GAF sheets.",
      editorialBody: body,
      process: [
        {
          id: "sca-step-1",
          title: "Share reports",
          description:
            "The patient provides HPLC, genotype, CBC, transfusion and hydroxyurea history, crisis frequency and any TCD or MRI notes.",
        },
        {
          id: "sca-step-2",
          title: "Virtual haematology opinion",
          description:
            "A haematologist reviews whether the case is medical management, complication care or transplant evaluation.",
        },
        {
          id: "sca-step-3",
          title: "Name the pathway",
          description:
            "The team writes hydroxyurea, selected transfusion, organ monitoring or allogeneic HSCT as separate products.",
        },
        {
          id: "sca-step-4",
          title: "Itemized estimate",
          description:
            "There is no single sickle-cell package. Named BMT is $25,000–$70,000. Neighbouring allogeneic is $30,000–$80,000.",
        },
        {
          id: "sca-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Chest pain with fever or sudden weakness is a local emergency.",
        },
        {
          id: "sca-step-6",
          title: "Repeat essential tests",
          description:
            "The receiving unit confirms genotype, organ function and infection status after arrival.",
        },
        {
          id: "sca-step-7",
          title: "Deliver the named pathway",
          description:
            "Hydroxyurea, transfusion or conditioning proceeds only after genotype and complications are named.",
        },
        {
          id: "sca-step-8",
          title: "Response and organ review",
          description:
            "Crisis frequency, haemoglobin and selected imaging decide whether a graft or another line is honest.",
        },
        {
          id: "sca-step-9",
          title: "Return home",
          description:
            "The patient leaves with medicine lists, crisis rules, warning signs and a remote-follow-up plan.",
        },
      ],
      preparation:
        "Share HPLC, genotype, CBC, transfusion and hydroxyurea history, crisis frequency and TCD or MRI if available before anyone books travel.",
      recovery:
        "Pain crises, infection risk and iron-related fatigue are common. Conventional SCD care continues for years unless a graft succeeds.",
      hospitalStay: "Outpatient clinic visits to several weeks in or near a transplant unit",
      recoveryPeriod:
        "Lifelong medical management unless a successful transplant. Transplant recovery continues for months.",
      followUp:
        "Request a written summary covering genotype, hydroxyurea plan, crisis rules, organ screening and remote review after returning home.",
      importantConsiderations:
        "There is no single sickle-cell package. Gene therapy and hydroxyurea have no live GAF sheets. Acute chest syndrome or stroke signs belong in a local emergency department.",
      treatmentType: "Sickle Cell Anemia / Hemoglobinopathy",
      treatmentSetting: "Accredited partner haematology units in India",
      technology:
        "Hydroxyurea, selected transfusion, TCD stroke-risk screening and selected allogeneic HSCT",
      searchKeywords: [
        "sickle cell anemia treatment in India",
        "sickle cell disease treatment in India",
        "sickle cell treatment cost in India",
        "sickle cell bone marrow transplant in India",
        "hydroxyurea treatment for sickle cell disease",
        "sickle cell stem cell transplant in India",
      ],
      faqs: [
        {
          id: "sca-faq-1",
          question: "How much does sickle cell treatment cost in India?",
          answer:
            "There is no single package. Recurring medicines and transfusion are hospital-priced. Named BMT is $25,000–$70,000. Neighbouring allogeneic is $30,000–$80,000.",
        },
        {
          id: "sca-faq-2",
          question: "Can a bone marrow transplant cure sickle cell disease?",
          answer:
            "Successful allogeneic HSCT can potentially eliminate the sickling disorder in selected patients. Named BMT lists sit on the bone marrow transplant page.",
        },
        {
          id: "sca-faq-3",
          question: "Does every patient need a transplant?",
          answer:
            "No. Many patients are managed with hydroxyurea, preventive care and selected transfusion.",
        },
        {
          id: "sca-faq-4",
          question: "Can children be treated for sickle cell disease in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000 when a graft is the product. Adult floors are not a substitute paediatric unit.",
        },
        {
          id: "sca-faq-5",
          question: "Does gene therapy use the BMT sheet?",
          answer:
            "No. There is no live GAF gene-therapy sheet. Confirm Indian availability with the treating centre.",
        },
        {
          id: "sca-faq-6",
          question: "Can international patients come to India for sickle cell treatment?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel.",
        },
        {
          id: "sca-faq-7",
          question: "Which city in India is best for sickle cell treatment?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities.",
        },
        {
          id: "sca-faq-8",
          question: "When should I go to an emergency department?",
          answer:
            "Chest pain with fever or breathlessness, sudden weakness or speech change, seizure or high fever belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "sca-faq-9",
          question: "Is there a GAF hydroxyurea or gene-therapy page?",
          answer:
            "No. Hydroxyurea, gene-therapy and pain-crisis pages are not live. Use this pillar page and the named modality sheets.",
        },
        {
          id: "sca-faq-10",
          question: "Is hydroxyurea used in India?",
          answer:
            "Yes. It is an important disease-modifying medicine and requires blood-count monitoring. There is no live GAF hydroxyurea sheet.",
        },
        {
          id: "sca-faq-11",
          question: "Is sickle cell trait the same as sickle cell disease?",
          answer:
            "No. Trait and disease are different genetic conditions with different clinical implications.",
        },
        {
          id: "sca-faq-12",
          question: "Can sickle cell anemia be cured?",
          answer:
            "Selected patients can become free of the sickling clone after allogeneic HSCT. Others are managed for years with medicines and preventive care.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping disc and crescent shapes used as the sickle cell treatment hero",
      seoTitle: "Sickle Cell Anemia Treatment in India: Types, Cost & Recovery",
      metaDescription:
        "Learn about sickle cell anemia treatment in India, including hydroxyurea, selected transfusion, allogeneic transplant $30,000–$80,000, gene-therapy caveats and how to send records.",
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
linkRelated(THALASSEMIA, THALASSEMIA_NEEDLE, ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [thalassemia treatment in India](https://gaf.healthcare/treatments/thalassemia-treatment-in-india).",
    ", [thalassemia treatment in India](https://gaf.healthcare/treatments/thalassemia-treatment-in-india) and [sickle cell anemia treatment in India](https://gaf.healthcare/treatments/sickle-cell-anemia-treatment-in-india).",
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
patchMarkdown(resolve("scripts/thalassemia-treatment-body.md"), THALASSEMIA_NEEDLE, ADDITION);
