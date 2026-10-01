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

const body = readFileSync(resolve("scripts/bmt-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "bone-marrow-transplant-in-india");
const now = "2026-09-29T14:30:00.000Z";
const SLUG = "bone-marrow-transplant-in-india";

const treatment = {
  id: existing?.id ?? "f3b7e1d0-6a54-d829-7cda-0b8e5e9a4d17",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Bone Marrow Transplant in India",
  specialtySlug: "hematology",
  subspecialty: "Hematopoietic Stem Cell Transplantation",
  category: "Bone Marrow Transplantation",
  image: "/uploads/treatments/bmt-hero.webp",
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
    "bone-marrow-transplantation",
    "stem-cell-transplantation",
    "autologous-stem-cell-transplant",
    "allogeneic-stem-cell-transplant",
    "haploidentical-stem-cell-transplant",
    "matched-unrelated-donor-transplant",
    "pediatric-bone-marrow-transplantation",
    "hematopoietic-stem-cell-transplantation",
    "matched-sibling-donor-transplant",
    "car-t-cell-therapy",
    "bone-marrow-biopsy",
  ],
  relatedTreatmentSlugs: ["leukemia-treatment-in-india", "lymphoma-treatment-in-india", "thalassemia-treatment-in-india", "sickle-cell-anemia-treatment-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 36,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Bone Marrow Transplant in India",
      shortDescription:
        "Bone marrow transplant in India (HSCT) replaces blood-forming stem cells — named partner planning of $25,000–$70,000.",
      editorialBody: body,
      process: [
        {
          id: "bmt-step-1",
          title: "Share reports and disease status",
          description:
            "The patient provides pathology, marrow, cytogenetic, molecular, treatment and HLA reports before travel is booked.",
        },
        {
          id: "bmt-step-2",
          title: "Virtual transplant opinion",
          description:
            "A haematologist reviews whether autologous, allogeneic, haploidentical, unrelated-donor or paediatric transplant is the honest brief.",
        },
        {
          id: "bmt-step-3",
          title: "Confirm the graft pathway",
          description:
            "The team writes donor source, HLA status, conditioning intensity and whether CAR-T is a different product.",
        },
        {
          id: "bmt-step-4",
          title: "Itemized estimate",
          description:
            "Named bone marrow transplantation is $25,000–$70,000. Auto, allo, haplo, MUD and paediatric lists are quoted from their own sheets.",
        },
        {
          id: "bmt-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Fever, uncontrolled bleeding or breathlessness is a local emergency.",
        },
        {
          id: "bmt-step-6",
          title: "In-person work-up",
          description:
            "The transplant unit repeats organ, infection and donor assessments after arrival and confirms the final protocol.",
        },
        {
          id: "bmt-step-7",
          title: "Conditioning and infusion",
          description:
            "Chemotherapy or selected radiation is given, then stem cells are infused through a vein.",
        },
        {
          id: "bmt-step-8",
          title: "Engraftment watch",
          description:
            "Counts stay low until the graft establishes. GAF stay planning is typically 4–8 weeks in or near the unit.",
        },
        {
          id: "bmt-step-9",
          title: "Return home",
          description:
            "The patient leaves with infection rules, GvHD warning signs, drug lists and a plan for remote follow-up.",
        },
      ],
      preparation:
        "Share marrow reports, disease-status notes, prior treatment, infection history and HLA or donor information so the team can judge autologous versus allogeneic versus paediatric pathways.",
      recovery:
        "Fatigue, low counts, infection risk and, after allogeneic transplant, GvHD surveillance continue after discharge. Immune recovery takes months.",
      hospitalStay: "4–8 weeks in or near the unit",
      recoveryPeriod:
        "Blood-count recovery occurs in the early weeks. Immune recovery and return to ordinary activity often continue for months.",
      followUp:
        "Request a written summary covering graft source, conditioning, infection prophylaxis, GvHD medicines, warning signs and remote review after returning home.",
      importantConsiderations:
        "Autologous and allogeneic lists are not interchangeable. CAR-T is a neighbouring cellular-therapy sheet. Fever, uncontrolled bleeding, severe diarrhoea, jaundice or breathlessness belongs in a local emergency department.",
      treatmentType: "Hematopoietic Stem Cell Transplantation",
      treatmentSetting: "Accredited partner transplant units in India",
      technology:
        "Autologous, allogeneic, haploidentical or matched-unrelated grafts from peripheral blood, marrow or selected cord blood",
      searchKeywords: [
        "bone marrow transplant in India",
        "bone marrow transplant cost in India",
        "BMT cost in India",
        "stem cell transplant in India",
        "allogeneic bone marrow transplant",
        "autologous bone marrow transplant",
        "bone marrow transplant for leukemia",
        "bone marrow transplant for thalassemia",
        "bone marrow transplant for international patients",
      ],
      faqs: [
        {
          id: "bmt-faq-1",
          question: "How much does bone marrow transplant cost in India?",
          answer:
            "Named GAF partner planning is $25,000–$70,000, typically 4–8 weeks in or near the unit. Autologous, allogeneic, haploidentical, unrelated-donor and paediatric lists are quoted separately.",
        },
        {
          id: "bmt-faq-2",
          question: "Is autologous the same as allogeneic transplant?",
          answer:
            "No. Autologous uses the patient's own cells. Allogeneic uses a donor graft and can cause GvHD.",
        },
        {
          id: "bmt-faq-3",
          question: "Can I have a transplant without a matched sibling?",
          answer:
            "Often yes. Haploidentical relatives and matched unrelated donors are used when the disease and the unit allow it.",
        },
        {
          id: "bmt-faq-4",
          question: "How long is the hospital stay after BMT?",
          answer: "GAF planning is typically 4–8 weeks in or near the unit. Allogeneic and paediatric pathways often need longer nearby housing.",
        },
        {
          id: "bmt-faq-5",
          question: "Is bone marrow transplant a surgery?",
          answer:
            "The infusion is usually given through a vein. Marrow harvest from a donor is a separate procedure under anaesthesia.",
        },
        {
          id: "bmt-faq-6",
          question: "Does CAR-T use the BMT sheet?",
          answer:
            "No. Neighbouring CAR-T cell therapy is $80,000–$180,000 and is a different cellular-therapy product.",
        },
        {
          id: "bmt-faq-7",
          question: "Can international patients have BMT in India?",
          answer:
            "Yes. Complete reports should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "bmt-faq-8",
          question: "Which city in India is best for bone marrow transplant?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named transplant unit that already performs the required pathway.",
        },
        {
          id: "bmt-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Fever, uncontrolled bleeding, severe diarrhoea, jaundice, new confusion or breathlessness belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "bmt-faq-10",
          question: "Can children undergo bone marrow transplant in India?",
          answer:
            "Yes. Neighbouring paediatric bone marrow transplantation is $28,000–$75,000. Adult floors are not a substitute paediatric unit.",
        },
        {
          id: "bmt-faq-11",
          question: "Does a haploidentical transplant use the autologous sheet?",
          answer:
            "No. Neighbouring haploidentical stem cell transplant is $35,000–$85,000.",
        },
        {
          id: "bmt-faq-12",
          question: "Is BMT a guaranteed cure?",
          answer:
            "No. Selected patients can achieve long-term control or cure, but relapse, graft failure and treatment-related complications remain possible.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping cell-like shapes used as the bone-marrow-transplant treatment hero",
      seoTitle: "Bone Marrow Transplant in India: Cost, Types & Recovery",
      metaDescription:
        "Learn about bone marrow transplant in India, including HSCT, $25,000–$70,000 partner planning, autologous and allogeneic types, donors, recovery and risks.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [breast reduction surgery in India](https://gaf.healthcare/treatments/breast-reduction-in-india).",
    ", [breast reduction surgery in India](https://gaf.healthcare/treatments/breast-reduction-in-india) and [bone marrow transplant in India](https://gaf.healthcare/treatments/bone-marrow-transplant-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
