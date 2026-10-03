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

const body = readFileSync(resolve("scripts/hormone-therapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "hormone-therapy-in-india");
const now = "2026-10-03T12:00:00.000Z";
const SLUG = "hormone-therapy-in-india";
const BREAST = "breast-cancer-treatment-in-india";
const PROSTATE = "prostate-cancer-treatment-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const RADICAL = "radical-prostatectomy-in-india";
const ADJUVANT = "adjuvant-chemotherapy-in-india";
const NEOADJUVANT = "neoadjuvant-chemotherapy-in-india";
const MTT = "molecular-targeted-therapy-in-india";
const PRECISION = "precision-oncology-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const LINK =
  " Named endocrine-therapy lists sit on [Hormone Therapy in India](/treatments/hormone-therapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Hormone therapy, also called endocrine therapy, is used for breast cancers that are hormone-receptor positive. These cancers can use hormones such as estrogen as part of their growth signalling. Hormone therapy reduces the effect of these hormones on cancer cells.",
    `Hormone therapy, also called endocrine therapy, is used for breast cancers that are hormone-receptor positive. These cancers can use hormones such as estrogen as part of their growth signalling. Hormone therapy reduces the effect of these hormones on cancer cells.${LINK}`,
  ],
  [
    "Depending on the clinical situation, treatment may include tamoxifen, aromatase inhibitors or other endocrine treatments. The choice depends on estrogen and progesterone receptor status, menopausal status, previous treatment, risk assessment and tolerance. Unlike surgery or chemotherapy, hormone therapy can continue for a prolonged period.",
    `Depending on the clinical situation, treatment may include tamoxifen, aromatase inhibitors or other endocrine treatments. The choice depends on estrogen and progesterone receptor status, menopausal status, previous treatment, risk assessment and tolerance. Unlike surgery or chemotherapy, hormone therapy can continue for a prolonged period.${LINK}`,
  ],
  [
    "[Hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy) reduces androgen production or blocks androgen activity.",
    `[Hormone therapy](/costs/India/Medical-Oncology/Hormone-Therapy) reduces androgen production or blocks androgen activity.${LINK}`,
  ],
  [
    "The GAF planning range for hormone therapy in India is **$1,000–$4,500**. Duration is often months to years, so the medicine and monitoring schedule matter more than a one-line package.",
    `The GAF planning range for hormone therapy in India is **$1,000–$4,500**. Duration is often months to years, so the medicine and monitoring schedule matter more than a one-line package.${LINK}`,
  ],
  [
    "Hormonal treatment can have a role in selected ovarian tumors, particularly certain low-grade serous or hormone-sensitive cancers.",
    `Hormonal treatment can have a role in selected ovarian tumors, particularly certain low-grade serous or hormone-sensitive cancers.${LINK}`,
  ],
  [
    "**Hormone therapy.** Androgen-deprivation therapy may be used in selected intermediate-risk, high-risk, locally advanced or metastatic disease, often in combination with other treatments. That pathway sits on [Hormone Therapy for Prostate Cancer](/blogs/hormone-therapy-for-prostate-cancer).",
    `**Hormone therapy.** Androgen-deprivation therapy may be used in selected intermediate-risk, high-risk, locally advanced or metastatic disease, often in combination with other treatments. That pathway sits on [Hormone Therapy for Prostate Cancer](/blogs/hormone-therapy-for-prostate-cancer).${LINK}`,
  ],
  [
    "Some patients may also receive endocrine therapy, anti-HER2 treatment, radiation or other systemic therapies. See [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india) and [chemotherapy for breast cancer](/blogs/chemotherapy-for-breast-cancer-in-india).",
    `Some patients may also receive endocrine therapy, anti-HER2 treatment, radiation or other systemic therapies. See [breast cancer treatment in India](/treatments/breast-cancer-treatment-in-india) and [chemotherapy for breast cancer](/blogs/chemotherapy-for-breast-cancer-in-india).${LINK}`,
  ],
  [
    "Unlike conventional chemotherapy, which can affect many rapidly dividing cells, targeted therapies are designed around a particular biological target. Depending on the cancer and biomarker, these treatments may be used alone or combined with chemotherapy, immunotherapy, hormone therapy, radiation therapy, or surgery.",
    `Unlike conventional chemotherapy, which can affect many rapidly dividing cells, targeted therapies are designed around a particular biological target. Depending on the cancer and biomarker, these treatments may be used alone or combined with chemotherapy, immunotherapy, hormone therapy, radiation therapy, or surgery.${LINK}`,
  ],
  [
    "This does not mean abandoning established treatments such as surgery, chemotherapy, radiation therapy, hormone therapy or immunotherapy.",
    `This does not mean abandoning established treatments such as surgery, chemotherapy, radiation therapy, hormone therapy or immunotherapy.${LINK}`,
  ],
  [
    "- **Prostate.** Definitive treatment for selected localized or locally advanced disease, sometimes with hormone therapy. Hypofractionation can reduce visit count when appropriate. See [Radiation Therapy for Prostate Cancer](/blogs/radiation-therapy-for-prostate-cancer) and [Brachytherapy for Prostate Cancer](/blogs/brachytherapy-for-prostate-cancer).",
    `- **Prostate.** Definitive treatment for selected localized or locally advanced disease, sometimes with hormone therapy. Hypofractionation can reduce visit count when appropriate. See [Radiation Therapy for Prostate Cancer](/blogs/radiation-therapy-for-prostate-cancer) and [Brachytherapy for Prostate Cancer](/blogs/brachytherapy-for-prostate-cancer).${LINK}`,
  ],
  [
    "Modern cancer treatment increasingly relies on molecular and biomarker information. Depending on the cancer, testing may include HER2, hormone receptors, PD-L1, MSI/MMR, EGFR, ALK and other actionable genomic alterations.",
    `Modern cancer treatment increasingly relies on molecular and biomarker information. Depending on the cancer, testing may include HER2, hormone receptors, PD-L1, MSI/MMR, EGFR, ALK and other actionable genomic alterations.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "a9c3e1b7-8d62-9426-e37a-3f6b02125d89",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Hormone Therapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Hormone Therapy",
  category: "Hormone Therapy",
  image: "/uploads/treatments/ht-hero.webp",
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
    "hormone-therapy",
    "chemotherapy",
    "targeted-therapy",
    "molecular-targeted-therapy",
    "precision-oncology",
    "immunotherapy",
    "adjuvant-chemotherapy",
    "neoadjuvant-chemotherapy",
  ],
  relatedTreatmentSlugs: [
    BREAST,
    PROSTATE,
    OVARIAN,
    RADICAL,
    ADJUVANT,
    NEOADJUVANT,
    MTT,
    PRECISION,
    EBRT,
    "intensity-modulated-radiation-therapy-in-india",
    "image-guided-radiation-therapy-in-india",
    "stereotactic-body-radiation-therapy-sbrt-in-india",
    "stereotactic-radiosurgery-in-india",
    "proton-beam-therapy-in-india",
    "brachytherapy-in-india",
    "breast-reconstruction-in-india",
  ],
  status: "published" as const,
  featured: true,
  sortOrder: 87,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Hormone Therapy in India",
      shortDescription:
        "Hormone therapy in India for hormone-sensitive cancers. GAF planning is $1,000–$4,500, typically outpatient tablets over years.",
      editorialBody: body,
      process: [
        {
          id: "ht-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, receptor or PSA reports and prior treatment summaries before anyone books travel.",
        },
        {
          id: "ht-step-2",
          title: "Confirm hormone sensitivity",
          description:
            "A medical oncologist reviews ER/PR/HER2, PSA, imaging and whether endocrine therapy can change the plan.",
        },
        {
          id: "ht-step-3",
          title: "Name the treatment goal",
          description:
            "The team decides whether the aim is recurrence reduction, neoadjuvant control, metastatic disease control or symptom relief.",
        },
        {
          id: "ht-step-4",
          title: "Itemised estimate",
          description:
            "GAF hormone-therapy planning is $1,000–$4,500. Neighbouring targeted therapy is $8,000–$30,000 if a matched medicine is later named.",
        },
        {
          id: "ht-step-5",
          title: "Select the medicine",
          description:
            "Tamoxifen, an aromatase inhibitor, ovarian suppression, ADT or an androgen-receptor medicine is chosen from the cancer biology.",
        },
        {
          id: "ht-step-6",
          title: "Start and monitor",
          description:
            "Tablets or injections begin with a written schedule for bone, metabolic, PSA or gynaecological monitoring.",
        },
        {
          id: "ht-step-7",
          title: "Transfer home",
          description:
            "Most patients continue tablets or scheduled injections at home after a stable plan is documented.",
        },
        {
          id: "ht-step-8",
          title: "Review resistance",
          description:
            "If the cancer progresses, the team considers another endocrine line or a different class of treatment.",
        },
      ],
      preparation:
        "Share the original pathology report, receptor or PSA results and a current medication list so the team can judge whether endocrine therapy is appropriate.",
      recovery:
        "Treatment is usually outpatient. Chest pain, sudden breathlessness, one-sided leg swelling, collapse or heavy unexpected bleeding belongs in a local emergency department.",
      hospitalStay: "Outpatient · often years of tablets. Usually no admission.",
      recoveryPeriod:
        "Duration depends on the cancer. Breast endocrine therapy commonly lasts at least five years.",
      followUp:
        "Request a written plan that names the medicine, duration, monitoring and who will continue prescribing at home.",
      importantConsiderations:
        "Cancer hormone therapy is not menopausal hormone replacement. GAF planning is $1,000–$4,500. Severe symptoms belong in a local emergency department.",
      treatmentType: "Hormone Therapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology programmes in India",
      technology:
        "Oral endocrine therapy, injectable suppression, androgen-receptor medicines and neighbouring targeted-therapy sheets",
      searchKeywords: [
        "Hormone Therapy in India",
        "hormonal therapy in India",
        "hormone therapy for cancer",
        "endocrine therapy in India",
        "hormone therapy for breast cancer",
        "hormone therapy for prostate cancer",
        "hormone therapy cost in India",
        "hormone therapy drugs",
        "hormone therapy side effects",
        "androgen deprivation therapy India",
        "tamoxifen in India",
        "aromatase inhibitors India",
      ],
      faqs: [
        {
          id: "ht-faq-1",
          question: "What is hormone therapy for cancer?",
          answer:
            "A systemic treatment that reduces hormone production or blocks hormones from stimulating hormone-sensitive cancer cells, particularly in breast and prostate cancer.",
        },
        {
          id: "ht-faq-2",
          question: "How much does hormone therapy cost in India?",
          answer:
            "GAF Healthcare planning is $1,000–$4,500, typically outpatient tablets over years. US comparison is $5,000–$25,000.",
        },
        {
          id: "ht-faq-3",
          question: "Is hormone therapy the same as hormone replacement therapy?",
          answer:
            "No. Cancer hormone therapy blocks or reduces hormones that help cancer grow. Replacement therapy restores hormones the body no longer produces adequately.",
        },
        {
          id: "ht-faq-4",
          question: "Is hormone therapy chemotherapy?",
          answer:
            "No. Hormone therapy targets hormone-dependent pathways. Chemotherapy uses cytotoxic medicines against rapidly dividing cells.",
        },
        {
          id: "ht-faq-5",
          question: "How long is hormone therapy given?",
          answer:
            "For hormone receptor-positive breast cancer, treatment commonly lasts at least five years. Prostate cancer duration varies with stage and strategy.",
        },
        {
          id: "ht-faq-6",
          question: "Can hormone therapy be taken at home?",
          answer:
            "Many hormone therapies are oral medicines taken at home. Certain injections require administration by a healthcare professional.",
        },
        {
          id: "ht-faq-7",
          question: "Can hormone therapy stop working?",
          answer:
            "Yes. Some cancers develop endocrine resistance or become castration-resistant. Another endocrine line or a different class of treatment may then be considered.",
        },
        {
          id: "ht-faq-8",
          question: "Does hormone therapy cause bone loss?",
          answer:
            "Some long-term aromatase-inhibitor and androgen-deprivation regimens can affect bone density. Monitoring should be individualised.",
        },
        {
          id: "ht-faq-9",
          question: "Does hormone therapy cause hair loss?",
          answer:
            "It is generally not associated with the same degree of hair loss as many chemotherapy regimens. Texture or thickness can still change.",
        },
        {
          id: "ht-faq-10",
          question: "Can hormone therapy affect fertility or sexual function?",
          answer:
            "Yes. Ovarian suppression, tamoxifen and androgen deprivation can affect menstrual function, fertility, libido or erectile function.",
        },
        {
          id: "ht-faq-11",
          question: "Can it be combined with radiation or chemotherapy?",
          answer:
            "Yes, depending on the cancer and clinical setting. Selected prostate cancers receive ADT with radiation. Sequence is a team decision.",
        },
        {
          id: "ht-faq-12",
          question: "Can hormone therapy be stopped suddenly?",
          answer:
            "Do not stop cancer hormone therapy without discussing it with your oncologist. Premature stopping can reduce the intended benefit.",
        },
        {
          id: "ht-faq-13",
          question: "When should I go to an emergency department?",
          answer:
            "Chest pain, sudden breathlessness, one-sided leg swelling, collapse, heavy unexpected bleeding or high fever belongs in a local emergency department.",
        },
        {
          id: "ht-faq-14",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. The usual question is how to start safely and continue tablets or injections at home.",
        },
        {
          id: "ht-faq-15",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can prescribe and monitor the named medicine.",
        },
        {
          id: "ht-faq-16",
          question: "Is hormone therapy used for ovarian or endometrial cancer?",
          answer:
            "It may be considered in selected hormone-sensitive tumours. It is not automatic for every ovarian or endometrial cancer.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of a hormone ligand approaching a receptor on a cancer cell",
      seoTitle: "Hormone Therapy in India: Treatment, Drugs, Cost & Side Effects",
      metaDescription:
        "Learn about hormone therapy in India for breast, prostate and other hormone-sensitive cancers, including how it works, medicines, eligibility, side effects, duration, monitoring and treatment costs.",
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
  OVARIAN,
  RADICAL,
  ADJUVANT,
  NEOADJUVANT,
  MTT,
  PRECISION,
  EBRT,
]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Precision Oncology in India](https://gaf.healthcare/treatments/precision-oncology-in-india).",
    ", [Precision Oncology in India](https://gaf.healthcare/treatments/precision-oncology-in-india) and [Hormone Therapy in India](https://gaf.healthcare/treatments/hormone-therapy-in-india).",
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

patchMarkdown(resolve("scripts/prostate-treatment-body.md"));
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/radical-prostatectomy-treatment-body.md"));
patchMarkdown(resolve("scripts/adjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/neoadjuvant-chemotherapy-treatment-body.md"));
patchMarkdown(resolve("scripts/molecular-targeted-therapy-treatment-body.md"));
patchMarkdown(resolve("scripts/precision-oncology-treatment-body.md"));
patchMarkdown(resolve("scripts/external-beam-radiotherapy-treatment-body.md"));
