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

const body = readFileSync(resolve("scripts/stem-cell-transplantation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "stem-cell-transplantation-in-india");
const now = "2026-10-03T07:00:00.000Z";
const SLUG = "stem-cell-transplantation-in-india";
const BMT = "bone-marrow-transplant-in-india";
const AUTO = "autologous-bone-marrow-transplant-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const MYELOMA = "multiple-myeloma-treatment-in-india";
const APLASTIC = "aplastic-anemia-treatment-in-india";
const THALASSEMIA = "thalassemia-treatment-in-india";
const SICKLE = "sickle-cell-anemia-treatment-in-india";
const FANCONI = "fanconi-anemia-treatment-in-india";
const LINK =
  " The HCT umbrella sits on [Stem Cell Transplantation in India](/treatments/stem-cell-transplantation-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Neighbouring [stem cell transplantation](/costs/India/Hematology/Stem-Cell-Transplantation) is **$22,000–$65,000** when the product is written as HCT rather than a named autologous or allogeneic sheet.",
    `Neighbouring [stem cell transplantation](/costs/India/Hematology/Stem-Cell-Transplantation) is **$22,000–$65,000** when the product is written as HCT rather than a named autologous or allogeneic sheet.${LINK}`,
  ],
  [
    "An allogeneic-BMT treatment page is not live on this site.",
    `An allogeneic-BMT treatment page is not live on this site.${LINK}`,
  ],
  [
    "Named transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india). The BMT sheet is **$25,000–$70,000**. Neighbouring allogeneic is **$30,000–$80,000**.",
    `Named transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india). The BMT sheet is **$25,000–$70,000**. Neighbouring allogeneic is **$30,000–$80,000**.${LINK}`,
  ],
  [
    "Named transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india). The BMT sheet is **$25,000–$70,000**.",
    `Named transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india). The BMT sheet is **$25,000–$70,000**.${LINK}`,
  ],
  [
    "Transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india).",
    `Transplant lists sit on [Bone Marrow Transplant in India](/treatments/bone-marrow-transplant-in-india).${LINK}`,
  ],
  [
    "Patients with severe or very severe disease require prompt assessment by a haematologist, ideally at a centre experienced in bone marrow failure and stem-cell transplantation.",
    `Patients with severe or very severe disease require prompt assessment by a haematologist, ideally at a centre experienced in bone marrow failure and stem-cell transplantation.${LINK}`,
  ],
  [
    "The ICH-ICMR 2026 consensus includes dedicated HSCT recommendations for SCD in India.",
    `The ICH-ICMR 2026 consensus includes dedicated HSCT recommendations for SCD in India.${LINK}`,
  ],
  [
    "Transfusion-dependent beta-thalassemia, historically called thalassemia major in many clinical settings, is the form that usually requires a structured lifelong treatment programme unless a curative treatment such as allogeneic HSCT is successfully performed.",
    `Transfusion-dependent beta-thalassemia, historically called thalassemia major in many clinical settings, is the form that usually requires a structured lifelong treatment programme unless a curative treatment such as allogeneic HSCT is successfully performed.${LINK}`,
  ],
  [
    "Published Indian transplant experience shows that hematopoietic stem cell transplantation (HSCT) for Fanconi anemia can be performed in Indian centres, although outcomes depend heavily on disease status, age, donor, infections, transfusion history and transplant protocol.",
    `Published Indian transplant experience shows that hematopoietic stem cell transplantation (HSCT) for Fanconi anemia can be performed in Indian centres, although outcomes depend heavily on disease status, age, donor, infections, transfusion history and transplant protocol.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "c4e8a1b2-7d39-4f15-a821-9c6d0e284f71",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Stem Cell Transplantation in India",
  specialtySlug: "hematology",
  subspecialty: "Hematopoietic Stem Cell Transplantation",
  category: "Stem Cell Transplantation",
  image: "/uploads/treatments/hsct-hero.webp",
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
    "stem-cell-transplantation",
    "bone-marrow-transplantation",
    "autologous-stem-cell-transplant",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "matched-unrelated-donor-transplant",
    "pediatric-bone-marrow-transplantation",
    "hematopoietic-stem-cell-transplantation",
    "matched-sibling-donor-transplant",
    "car-t-cell-therapy",
    "chemotherapy",
    "bone-marrow-biopsy",
  ],
  relatedTreatmentSlugs: [
    BMT,
    AUTO,
    LEUKEMIA,
    LYMPHOMA,
    MYELOMA,
    APLASTIC,
    THALASSEMIA,
    SICKLE,
    FANCONI,
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 35,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Stem Cell Transplantation in India",
      shortDescription:
        "Stem cell transplantation in India (HSCT) restores blood-forming cells after intensive treatment. GAF planning is $22,000–$65,000, typically 3–8 weeks in or near the unit.",
      editorialBody: body,
      process: [
        {
          id: "hsct-step-1",
          title: "Share records",
          description:
            "The patient provides diagnosis, marrow, cytogenetic, molecular, treatment and HLA reports before anyone books travel.",
        },
        {
          id: "hsct-step-2",
          title: "Transplant opinion",
          description:
            "A haematologist reviews whether autologous, allogeneic, haploidentical, unmatched-donor, paediatric or no India list is the honest next step.",
        },
        {
          id: "hsct-step-3",
          title: "Name the graft",
          description:
            "The team writes graft source, donor pathway, conditioning intensity and whether CAR-T is a different product.",
        },
        {
          id: "hsct-step-4",
          title: "Itemized estimate",
          description:
            "GAF HCT planning is $22,000–$65,000. Neighbouring BMT is $25,000–$70,000. Autologous, allogeneic, haploidentical and paediatric lists are quoted from their own sheets.",
        },
        {
          id: "hsct-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Fever, uncontrolled bleeding or breathlessness is a local emergency.",
        },
        {
          id: "hsct-step-6",
          title: "Collection and conditioning",
          description:
            "Apheresis or marrow harvest, then chemotherapy with or without radiation, follows the written calendar.",
        },
        {
          id: "hsct-step-7",
          title: "Day 0 infusion",
          description:
            "Stem cells are given through a vein. This part is usually not an operation.",
        },
        {
          id: "hsct-step-8",
          title: "Engraftment watch",
          description:
            "Counts stay low until the graft establishes. GAF stay planning is typically 3–8 weeks in or near the unit.",
        },
        {
          id: "hsct-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with infection rules, GVHD warning signs, drug lists and a plan for remote follow-up.",
        },
      ],
      preparation:
        "Share complete haematology records, disease status, previous treatment, organ-function tests and HLA or donor information so the team can judge autologous versus allogeneic versus paediatric pathways.",
      recovery:
        "Fatigue, low counts, infection risk and, after allogeneic transplant, GVHD surveillance continue after discharge. Immune recovery takes months.",
      hospitalStay: "3–8 weeks in or near the unit",
      recoveryPeriod:
        "Blood-count recovery occurs in the early weeks. Immune recovery and return to ordinary activity often continue for months.",
      followUp:
        "Request a written summary covering graft source, conditioning, infection prophylaxis, GVHD medicines, warning signs and remote review after returning home.",
      importantConsiderations:
        "Autologous and allogeneic lists are not interchangeable. CAR-T is a neighbouring cellular-therapy sheet. Fever, uncontrolled bleeding, severe diarrhoea, jaundice or breathlessness belongs in a local emergency department.",
      treatmentType: "Hematopoietic Stem Cell Transplantation",
      treatmentSetting: "Accredited partner transplant units in India",
      technology:
        "Autologous and allogeneic HCT, haploidentical and unmatched-donor pathways, neighbouring BMT, paediatric HSCT and CAR-T sheets",
      searchKeywords: [
        "Stem cell transplantation in India",
        "stem cell transplant cost in India",
        "HSCT in India",
        "hematopoietic stem cell transplant India",
        "bone marrow transplant in India",
        "autologous stem cell transplant India",
        "allogeneic stem cell transplant India",
        "haploidentical stem cell transplant India",
        "stem cell transplant for leukaemia",
        "stem cell transplant for multiple myeloma",
        "stem cell transplant hospitals in India",
        "peripheral blood stem cell transplant",
      ],
      faqs: [
        {
          id: "hsct-faq-1",
          question: "What is stem cell transplantation?",
          answer:
            "Treatment in which blood-forming stem cells are infused to restore bone-marrow function after intensive treatment or disease-related marrow damage.",
        },
        {
          id: "hsct-faq-2",
          question: "How much does stem cell transplantation cost in India?",
          answer:
            "GAF Healthcare planning is $22,000–$65,000, typically 3–8 weeks in or near the unit. US comparison is $140,000–$380,000.",
        },
        {
          id: "hsct-faq-3",
          question: "Is it the same as a bone marrow transplant?",
          answer:
            "The terms are often used interchangeably. Technically they describe somewhat different sources. Bone marrow is one possible source; peripheral blood is another.",
        },
        {
          id: "hsct-faq-4",
          question: "What are the main types?",
          answer:
            "Autologous uses the patient's own cells. Allogeneic uses a donor. Haploidentical and unmatched-donor pathways are named allogeneic variants.",
        },
        {
          id: "hsct-faq-5",
          question: "Is it a surgery?",
          answer:
            "Usually no. The stem cells are generally given through an intravenous catheter, similar to a transfusion.",
        },
        {
          id: "hsct-faq-6",
          question: "Is a donor always required?",
          answer:
            "No. Autologous transplantation uses the patient's own stem cells. Allogeneic transplantation requires a donor.",
        },
        {
          id: "hsct-faq-7",
          question: "Can it treat leukaemia?",
          answer:
            "Allogeneic transplantation has an established role in selected high-risk leukaemias. The indication depends on disease biology and treatment response.",
        },
        {
          id: "hsct-faq-8",
          question: "Can it treat multiple myeloma?",
          answer:
            "Autologous stem cell transplantation is an established approach for selected patients with multiple myeloma.",
        },
        {
          id: "hsct-faq-9",
          question: "Does it have side effects?",
          answer:
            "Yes. Infection, bleeding, organ toxicity, graft failure and, after allogeneic transplant, graft-versus-host disease can occur.",
        },
        {
          id: "hsct-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, uncontrolled bleeding, severe diarrhoea, jaundice, new confusion or breathlessness after transplant belongs in a local emergency department.",
        },
        {
          id: "hsct-faq-11",
          question: "Can children undergo stem cell transplantation?",
          answer:
            "Yes, at specialised paediatric units. Neighbouring paediatric BMT is $28,000–$75,000. Adult floors are not a substitute.",
        },
        {
          id: "hsct-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can collect, process and infuse the named graft.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of blood-forming cells leaving a marrow cavity and reconstituting a second marrow space",
      seoTitle: "Stem Cell Transplantation in India: Cost, Types, Procedure & Recovery",
      metaDescription:
        "Stem cell transplantation in India explained: GAF planning $22,000–$65,000, autologous and allogeneic types, eligibility, procedure, risks, recovery and blood-cancer use.",
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

for (const slug of [BMT, AUTO, LEUKEMIA, LYMPHOMA, MYELOMA, APLASTIC, THALASSEMIA, SICKLE, FANCONI]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Dendritic Cell Therapy in India](https://gaf.healthcare/treatments/dendritic-cell-therapy-in-india).",
    ", [Dendritic Cell Therapy in India](https://gaf.healthcare/treatments/dendritic-cell-therapy-in-india) and [Stem Cell Transplantation in India](https://gaf.healthcare/treatments/stem-cell-transplantation-in-india).",
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

patchMarkdown(resolve("scripts/bmt-treatment-body.md"));
patchMarkdown(resolve("scripts/autologous-bmt-treatment-body.md"));
patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
patchMarkdown(resolve("scripts/myeloma-treatment-body.md"));
patchMarkdown(resolve("scripts/aplastic-anemia-treatment-body.md"));
patchMarkdown(resolve("scripts/thalassemia-treatment-body.md"));
patchMarkdown(resolve("scripts/sickle-cell-treatment-body.md"));
patchMarkdown(resolve("scripts/fanconi-anemia-treatment-body.md"));
