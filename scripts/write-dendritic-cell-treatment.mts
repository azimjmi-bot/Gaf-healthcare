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

const body = readFileSync(resolve("scripts/dendritic-cell-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "dendritic-cell-therapy-in-india");
const now = "2026-10-03T06:30:00.000Z";
const SLUG = "dendritic-cell-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const CERVICAL = "cervical-cancer-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const BMT = "bone-marrow-transplant-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const LINK =
  " Named dendritic-cell lists sit on [Dendritic Cell Therapy in India](/treatments/dendritic-cell-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) or a combination of these approaches.",
    `[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) or a combination of these approaches.${LINK}`,
  ],
  [
    "and multidisciplinary cancer care. The appropriate treatment depends primarily on the stage of cancer, tumour location, pathology, molecular profile, whether the cancer can be completely removed, and the patient's overall health.",
    `and multidisciplinary cancer care.${LINK} The appropriate treatment depends primarily on the stage of cancer, tumour location, pathology, molecular profile, whether the cancer can be completely removed, and the patient's overall health.`,
  ],
  [
    "supportive care and, in selected cases, clinical trials. The treatment plan depends on the type and stage of pancreatic cancer,",
    `supportive care and, in selected cases, clinical trials.${LINK} The treatment plan depends on the type and stage of pancreatic cancer,`,
  ],
  [
    "9. Immunotherapy in selected situations",
    `9. Immunotherapy in selected situations.${LINK}`,
  ],
  [
    "The cost varies widely. Neighbouring GAF USD sheets name the procedure that is actually booked. Autologous transplant planning is $18,000–$48,000. Chemotherapy is $1,500–$8,000+. Targeted therapy is $8,000–$30,000. Immunotherapy is $15,000–$45,000. Maintenance is $4,000–$18,000.",
    `The cost varies widely. Neighbouring GAF USD sheets name the procedure that is actually booked. Autologous transplant planning is $18,000–$48,000. Chemotherapy is $1,500–$8,000+. Targeted therapy is $8,000–$30,000. Immunotherapy is $15,000–$45,000. Maintenance is $4,000–$18,000.${LINK}`,
  ],
  [
    "[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy), molecularly guided medicines, supportive care or hematopoietic stem cell transplantation.",
    `[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy), molecularly guided medicines, supportive care or hematopoietic stem cell transplantation.${LINK}`,
  ],
  [
    "[CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) for selected patients, supportive care or a ",
    `[CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) for selected patients.${LINK} Supportive care or a `,
  ],
  [
    "[CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular-therapy product.",
    `[CAR-T cell therapy](/costs/India/Hematology/CAR-T-Cell-Therapy) is **$80,000–$180,000** and is a different cellular-therapy product.${LINK}`,
  ],
  [
    "[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) are **$15,000–$45,000** when a named indication exists.",
    `[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) are **$15,000–$45,000** when a named indication exists.${LINK}`,
  ],
  [
    "[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) are **$15,000–$45,000**.",
    `[immunotherapy](/costs/India/Medical-Oncology/Immunotherapy) are **$15,000–$45,000**.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "f2a3b7d6-9b15-4a06-1632-2d7e0a316f8b",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Dendritic Cell Therapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Dendritic Cell Therapy",
  category: "Dendritic Cell Therapy",
  image: "/uploads/treatments/dct-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ankur-bahl",
    "dr-ashok-kumar-vaid",
    "dr-jyoti-bajpai",
    "dr-jimmy-mirani",
    "dr-vijay-agarwal",
    "dr-darshan-r-s",
    "dr-prasad-e",
    "dr-m-a-raja",
    "dr-nikhil-suresh-ghadyalpatil",
    "dr-bharat-vaswani",
  ],
  hospitalSlugs: [
    "fortis-gurgaon",
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-proton-cancer-centre",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "dendritic-cell-therapy",
    "immunotherapy",
    "immune-checkpoint-inhibitor-therapy",
    "chemotherapy",
    "targeted-therapy",
    "precision-oncology",
    "car-t-cell-therapy",
    "hormone-therapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    PROSTATE,
    COLON,
    PANCREAS,
    OVARIAN,
    CERVICAL,
    MYELOMA,
    LEUKEMIA,
    LYMPHOMA,
    BMT,
    BRAIN,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 80,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Dendritic Cell Therapy in India",
      shortDescription:
        "Dendritic cell therapy in India is a named autologous vaccine product, not a brochure immune boost. GAF planning is $8,000–$22,000, typically leukapheresis plus staged infusions.",
      editorialBody: body,
      process: [
        {
          id: "dct-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, staging imaging, molecular reports and previous treatment details before anyone books travel.",
        },
        {
          id: "dct-step-2",
          title: "Oncology review",
          description:
            "A medical oncologist reviews whether a named dendritic-cell product, checkpoint immunotherapy, chemotherapy, targeted therapy or no India list is the honest next step.",
        },
        {
          id: "dct-step-3",
          title: "Name the product",
          description:
            "The team writes the exact cellular product, antigen method, regulatory status and whether a registered trial applies.",
        },
        {
          id: "dct-step-4",
          title: "Itemized estimate",
          description:
            "GAF dendritic-cell planning is $8,000–$22,000. Neighbouring immunotherapy is $15,000–$45,000. Neighbouring CAR-T is $80,000–$180,000.",
        },
        {
          id: "dct-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Acute infection, breathing difficulty or high fever is a local emergency.",
        },
        {
          id: "dct-step-6",
          title: "Collection and manufacturing",
          description:
            "Leukapheresis or another named collection, laboratory processing and quality-control release follow the written calendar.",
        },
        {
          id: "dct-step-7",
          title: "Staged administration",
          description:
            "Injections or infusions proceed only after product release. Further doses follow the written schedule.",
        },
        {
          id: "dct-step-8",
          title: "Observation",
          description:
            "Fever, infusion reactions and inflammatory symptoms are watched before discharge.",
        },
        {
          id: "dct-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the product name, dose count, expected effects and who will continue standard cancer care at home.",
        },
      ],
      preparation:
        "Share complete oncology records so the team can judge a named dendritic-cell product versus checkpoint immunotherapy, chemotherapy, targeted therapy or no India list.",
      recovery:
        "Most administrations are outpatient. Flu-like symptoms can follow. The overall calendar depends on manufacturing and repeat doses.",
      hospitalStay: "Outpatient or short stay. Typical programme: leukapheresis plus staged infusions.",
      recoveryPeriod:
        "Collection, manufacturing and repeat doses often span weeks. Standard cancer follow-up continues at home.",
      followUp:
        "Request a written summary covering the product name, regulatory status, dose count, expected effects and who will follow the patient after returning home.",
      importantConsiderations:
        "Dendritic-cell therapy is not a universal cancer cure and is not CAR-T. GAF planning is $8,000–$22,000. High fever, breathing difficulty or chest pain after an infusion belongs in a local emergency department.",
      treatmentType: "Dendritic Cell Therapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology and cell-processing programmes in India",
      technology:
        "Autologous dendritic-cell manufacturing, leukapheresis, neighbouring immunotherapy, chemotherapy and CAR-T sheets",
      searchKeywords: [
        "Dendritic cell therapy in India",
        "dendritic cell therapy cost in India",
        "dendritic cell vaccine India",
        "cancer immunotherapy in India",
        "autologous dendritic cell vaccine",
        "leukapheresis cancer vaccine",
        "sipuleucel-T vs dendritic cell therapy",
        "dendritic cell therapy vs CAR-T",
        "dendritic cell therapy for prostate cancer",
        "dendritic cell therapy hospitals in India",
        "personalised cancer vaccine India",
        "cell-based cancer vaccine cost",
      ],
      faqs: [
        {
          id: "dct-faq-1",
          question: "What is dendritic cell therapy?",
          answer:
            "A form of cancer immunotherapy that uses specialised antigen-presenting cells to help T cells recognise tumour-associated antigens. It is not conventional chemotherapy and it is not CAR-T.",
        },
        {
          id: "dct-faq-2",
          question: "How much does dendritic cell therapy cost in India?",
          answer:
            "GAF Healthcare planning is $8,000–$22,000, typically leukapheresis plus staged infusions. US comparison is $30,000–$80,000.",
        },
        {
          id: "dct-faq-3",
          question: "Is dendritic cell therapy available in India?",
          answer:
            "Cell-based therapies and trials are regulated in India. Availability and legal status depend on the exact product and indication, not on a generic clinic label.",
        },
        {
          id: "dct-faq-4",
          question: "Is it approved for all cancers?",
          answer:
            "No. It is not one universally approved treatment. Different approaches are investigated in different malignancies.",
        },
        {
          id: "dct-faq-5",
          question: "Can it cure cancer?",
          answer:
            "There is no evidence for a universal cure claim. Evidence varies by cancer type and protocol.",
        },
        {
          id: "dct-faq-6",
          question: "Is it the same as CAR-T therapy?",
          answer:
            "No. CAR-T genetically modifies T cells to recognise a specific target. Dendritic-cell therapies generally seek to improve antigen presentation.",
        },
        {
          id: "dct-faq-7",
          question: "How are dendritic cells collected?",
          answer:
            "Some personalised protocols collect immune cells from blood using leukapheresis. The exact method depends on the product.",
        },
        {
          id: "dct-faq-8",
          question: "How many sessions are required?",
          answer:
            "There is no universal number. Some protocols use several administrations on a written calendar.",
        },
        {
          id: "dct-faq-9",
          question: "Does it have side effects?",
          answer:
            "Yes. Fever, chills, fatigue, headache, nausea and infusion or injection reactions can occur. Combined treatment changes the risk.",
        },
        {
          id: "dct-faq-10",
          question: "Should I stop chemotherapy first?",
          answer:
            "Do not stop or delay standard cancer treatment without discussing it with the treating oncologist.",
        },
        {
          id: "dct-faq-11",
          question: "When should I go to an emergency department?",
          answer:
            "High fever, breathing difficulty, chest pain, collapse, a rapidly spreading rash or sudden confusion after an infusion belongs in a local emergency department.",
        },
        {
          id: "dct-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can manufacture or receive the named product.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a dendritic cell presenting antigen to a T cell beside a marked tumour cell",
      seoTitle: "Dendritic Cell Therapy in India: Cost, Procedure, Evidence & Risks",
      metaDescription:
        "Dendritic cell therapy in India explained: GAF planning $8,000–$22,000, how autologous vaccines are made, regulatory questions, side effects and how they differ from CAR-T and chemotherapy.",
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

for (const slug of [
  BREAST,
  PROSTATE,
  COLON,
  PANCREAS,
  OVARIAN,
  CERVICAL,
  MYELOMA,
  LEUKEMIA,
  LYMPHOMA,
  BMT,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Brachytherapy in India](https://gaf.healthcare/treatments/brachytherapy-in-india).",
    ", [Brachytherapy in India](https://gaf.healthcare/treatments/brachytherapy-in-india) and [Dendritic Cell Therapy in India](https://gaf.healthcare/treatments/dendritic-cell-therapy-in-india).",
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

patchMarkdown(resolve("scripts/colon-treatment-body.md"));
patchMarkdown(resolve("scripts/pancreas-treatment-body.md"));
patchMarkdown(resolve("scripts/prostate-treatment-body.md"));
patchMarkdown(resolve("scripts/cervical-treatment-body.md"));
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"));
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/bmt-treatment-body.md"));
