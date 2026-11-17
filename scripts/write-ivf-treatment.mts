import { randomUUID } from "node:crypto";
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

const body = readFileSync(resolve("scripts/ivf-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<Record<string, unknown>>;
};

const SLUG = "ivf-treatment-in-india";
const existing = store.treatments.find((row) => row.slug === SLUG) as
  | { id?: string; createdAt?: string }
  | undefined;
const now = new Date().toISOString();

const treatment = {
  id: existing?.id ?? randomUUID(),
  slug: SLUG,
  previousSlugs: [],
  baseName: "IVF Treatment in India",
  specialtySlug: "infertility-ivf",
  subspecialty: "Assisted Reproductive Technology",
  category: "IVF",
  image: "/images/cost/infertility-ivf/ivf-treatment-illustration.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-hrishikesh-pai",
    "dr-aswati-nair",
    "dr-aviva-pinto-rodrigues",
    "dr-j-krithika-devi",
    "dr-mahesh-koregol",
    "dr-bindu-garg",
    "dr-hima-deepthi-v",
    "dr-chitra-ramamurthy",
    "dr-dakshayani-d",
    "dr-namita-jain",
  ],
  hospitalSlugs: [
    "bloom-ivf",
    "nova-ivf-fertility-center",
    "nova-ivf-fertility-center-gurugram",
    "nova-ivf-fertility-center-banjara-hills-hyderabad",
    "neelkanth-infertility-ivf-hospital",
  ],
  costPageSlugs: [
    "ivf-treatment",
    "icsi-treatment",
    "iui-treatment",
    "frozen-embryo-transfer-fet",
    "pgt-a-testing",
    "donor-egg-ivf",
    "egg-freezing",
    "micro-tese",
    "fertility-preservation",
  ],
  relatedTreatmentSlugs: [],
  status: "published" as const,
  featured: true,
  sortOrder: 12,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "IVF Treatment in India",
      shortDescription:
        "IVF treatment in India covers cycle planning, laboratory fertilisation, neighbouring ICSI/IUI/FET options, partner fertility centres and international coordination. GAF IVF planning is $2,500–$5,500.",
      editorialBody: body,
      process: [
        {
          id: "ivf-step-1",
          title: "Share fertility records",
          description:
            "Send AMH or follicle count, semen analysis, uterine or tubal imaging and prior IUI or IVF summaries before travel is booked.",
        },
        {
          id: "ivf-step-2",
          title: "Named fertility review",
          description:
            "A fertility specialist confirms whether IVF, IUI, ICSI, surgery first or no assisted cycle is the honest next step.",
        },
        {
          id: "ivf-step-3",
          title: "Write the cycle plan",
          description:
            "The plan names stimulation, conventional IVF versus ICSI, fresh versus freeze-all, and any donor or PGT scope.",
        },
        {
          id: "ivf-step-4",
          title: "Itemized estimate",
          description:
            "GAF IVF Treatment planning is $2,500–$5,500. ICSI, FET, PGT-A and donor pathways are separate line items when used.",
        },
        {
          id: "ivf-step-5",
          title: "Travel when the window is real",
          description:
            "Keep flights flexible until monitoring start and retrieval timing work for both partners when both must attend.",
        },
        {
          id: "ivf-step-6",
          title: "Repeat essential checks",
          description:
            "The receiving campus confirms labs, infection screens and protocol details after arrival.",
        },
        {
          id: "ivf-step-7",
          title: "Deliver the named cycle",
          description:
            "Stimulation, retrieval, laboratory fertilisation and transfer or freeze-all proceed only as written.",
        },
        {
          id: "ivf-step-8",
          title: "Watch early recovery",
          description:
            "Bleeding, pain, breathing difficulty or rapid swelling after retrieval needs urgent local review for OHSS or complication risk.",
        },
        {
          id: "ivf-step-9",
          title: "Handover and follow-up",
          description:
            "Leave with cycle summaries, embryo reports, luteal medicines, pregnancy-test timing and home-clinician contacts.",
        },
      ],
      preparation:
        "Share ovarian reserve tests, semen analysis, uterine or tubal imaging, infectious-disease screens and prior cycle charts so the team can judge IVF versus IUI versus surgery-first pathways.",
      recovery:
        "Mild cramping and spotting after retrieval are common. Fitness to fly after retrieval or transfer is individual and must be confirmed by the treating team.",
      hospitalStay:
        "Egg retrieval is usually day-care. Overnight observation is uncommon unless OHSS risk or anaesthesia concern requires it.",
      recoveryPeriod:
        "Luteal support and pregnancy testing follow the written plan. Unsuccessful cycles need a documented review before another attempt.",
      followUp:
        "Request embryo reports, medicine lists, OHSS warning signs and named contacts for pregnancy testing and obstetric handover.",
      importantConsiderations:
        "This page does not publish clinic success-rate percentages. GAF IVF planning is $2,500–$5,500 and is not a quotation. Donor and genetic-testing pathways require legal counselling confirmation.",
      treatmentType: "IVF / Assisted Reproductive Technology",
      treatmentSetting: "Partner fertility centres and embryology laboratories in India",
      technology:
        "Conventional IVF, ICSI, FET, blastocyst culture, PGT when indicated, cryostorage",
      searchKeywords: [
        "IVF Treatment in India",
        "IVF in India",
        "IVF cost in India",
        "ICSI vs IVF",
        "IUI vs IVF",
        "frozen embryo transfer India",
        "PGT-A India",
        "Bloom IVF",
        "fertility treatment India international patients",
      ],
      faqs: [
        {
          id: "ivf-faq-1",
          question: "What is IVF treatment?",
          answer:
            "In vitro fertilisation retrieves eggs, fertilises them in the laboratory and may transfer an embryo to the uterus when conditions allow.",
        },
        {
          id: "ivf-faq-2",
          question: "How is IVF different from IUI and ICSI?",
          answer:
            "IUI places prepared sperm in the uterus without egg retrieval. ICSI is a laboratory fertilisation technique used inside an IVF cycle when micro-injection is indicated.",
        },
        {
          id: "ivf-faq-3",
          question: "How much does IVF cost in India?",
          answer:
            "GAF Healthcare planning for IVF Treatment is $2,500–$5,500. Medications, ICSI, freeze-all, FET, donor work and PGT change the final estimate.",
        },
        {
          id: "ivf-faq-4",
          question: "Does GAF publish IVF success rates on this page?",
          answer:
            "No. Success depends on age, diagnosis, laboratory practice and reporting definitions. Unverified percentages are not invented here.",
        },
        {
          id: "ivf-faq-5",
          question: "Which hospital should international patients start with?",
          answer:
            "Confirm a named fertility campus and embryology laboratory. Bloom IVF and other catalog fertility centres are linked from this pathway; acceptance is case-specific.",
        },
        {
          id: "ivf-faq-6",
          question: "What records are needed before travel?",
          answer:
            "AMH or follicle count, semen analysis, uterine or tubal imaging, infectious-disease screening and prior IUI or IVF summaries.",
        },
        {
          id: "ivf-faq-7",
          question: "Can donor eggs or PGT be included automatically?",
          answer:
            "No. Donor and genetic-testing pathways need explicit clinical indication, separate fees and legal counselling under applicable rules.",
        },
        {
          id: "ivf-faq-8",
          question: "Where are IVF costs and hospital lists?",
          answer:
            "Use the Infertility & IVF cost hub, the IVF Treatment cost guide, the Infertility & IVF hospital facet and the Bloom IVF profile linked from this page.",
        },
      ],
      imageAlt:
        "Educational illustration of IVF showing stimulation, egg retrieval, laboratory fertilisation and embryo transfer",
      seoTitle: "IVF Treatment in India: Pathway, Costs, Hospitals & Specialists",
      metaDescription:
        "IVF treatment in India explained for international patients: cycle steps, ICSI/IUI/FET options, planning costs, Bloom IVF and partner fertility centres, specialists and records-first coordination.",
    },
    ar: { ...blankTranslation },
  },
};

const index = store.treatments.findIndex((row) => row.slug === SLUG);
if (index >= 0) store.treatments[index] = treatment;
else store.treatments.push(treatment);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log(`Wrote ${SLUG}; treatments=${store.treatments.length}`);
