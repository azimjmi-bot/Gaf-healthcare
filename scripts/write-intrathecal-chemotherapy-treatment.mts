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

const body = readFileSync(resolve("scripts/intrathecal-chemotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "intrathecal-chemotherapy-in-india");
const now = "2026-10-03T08:10:00.000Z";
const SLUG = "intrathecal-chemotherapy-in-india";
const LEUKEMIA = "leukemia-treatment-in-india";
const LYMPHOMA = "lymphoma-treatment-in-india";
const CART = "car-t-cell-therapy-in-india";
const BMT = "bone-marrow-transplant-in-india";
const HSCT = "stem-cell-transplantation-in-india";
const DCT = "dendritic-cell-therapy-in-india";
const BRAIN = "brain-tumor-surgery-in-india";
const EBRT = "external-beam-radiotherapy-in-india";
const LINK =
  " Named CSF-directed lists sit on [Intrathecal Chemotherapy in India](/treatments/intrathecal-chemotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "Neighbouring [intrathecal chemotherapy](/costs/India/Medical-Oncology/Intrathecal-Chemotherapy) is **$3,000–$10,000** when CNS-directed drug is named separately.",
    `Neighbouring [intrathecal chemotherapy](/costs/India/Medical-Oncology/Intrathecal-Chemotherapy) is **$3,000–$10,000** when CNS-directed drug is named separately.${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "a9c3e5f1-2b47-4d80-8e16-7f0a4c5b9d21",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Intrathecal Chemotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Intrathecal Chemotherapy",
  category: "Intrathecal Chemotherapy",
  image: "/uploads/treatments/itc-hero.webp",
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
    "intrathecal-chemotherapy",
    "chemotherapy",
    "immunotherapy",
    "targeted-therapy",
    "maintenance-therapy",
    "car-t-cell-therapy",
    "bone-marrow-transplantation",
    "stem-cell-transplantation",
  ],
  relatedTreatmentSlugs: [LEUKEMIA, LYMPHOMA, CART, BMT, HSCT, DCT, BRAIN, EBRT],
  status: "published" as const,
  featured: true,
  sortOrder: 81,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Intrathecal Chemotherapy in India",
      shortDescription:
        "Intrathecal chemotherapy in India delivers selected anticancer medicine into CSF. GAF planning is $3,000–$10,000, typically day-care LP or Ommaya access.",
      editorialBody: body,
      process: [
        {
          id: "itc-step-1",
          title: "Share records",
          description:
            "The patient provides diagnosis, CSF reports, imaging, bone-marrow or pathology reports and previous treatment details before anyone books travel.",
        },
        {
          id: "itc-step-2",
          title: "Oncology review",
          description:
            "A medical oncologist or haematologist reviews whether CSF-directed medicine, systemic treatment, radiation, transplant or no India list is the honest next step.",
        },
        {
          id: "itc-step-3",
          title: "Name the route",
          description:
            "The team writes lumbar puncture versus Ommaya reservoir access, the medicine, dose and expected number of administrations.",
        },
        {
          id: "itc-step-4",
          title: "Itemized estimate",
          description:
            "GAF intrathecal planning is $3,000–$10,000. Neighbouring chemotherapy is $1,500–$8,000+. Neighbouring CAR-T is $80,000–$180,000.",
        },
        {
          id: "itc-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Sudden neurological change, fever or seizure is a local emergency.",
        },
        {
          id: "itc-step-6",
          title: "Pre-treatment tests",
          description:
            "Blood counts, coagulation, kidney and liver tests, CSF studies and imaging proceed as the protocol requires.",
        },
        {
          id: "itc-step-7",
          title: "CSF administration",
          description:
            "Medicine is delivered through lumbar puncture or reservoir access under sterile conditions, with CSF sampling when required.",
        },
        {
          id: "itc-step-8",
          title: "Observation",
          description:
            "Headache, fever, new weakness and other neurological symptoms are watched before discharge.",
        },
        {
          id: "itc-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the medicine name, remaining doses, CSF results and who will continue the parent cancer protocol.",
        },
      ],
      preparation:
        "Share complete oncology and CSF records so the team can judge lumbar versus reservoir access, the parent protocol and whether India travel is appropriate.",
      recovery:
        "Many administrations are day-care. Headache or local discomfort can follow a lumbar puncture. Sudden neurological change belongs in a local emergency department.",
      hospitalStay: "Day-care LP or Ommaya access. Reservoir placement is a separate neurosurgical stay.",
      recoveryPeriod:
        "Observation after each dose. Further administrations follow the disease-specific calendar rather than a single visit.",
      followUp:
        "Request a written summary covering the medicine, access route, remaining doses, CSF findings and who will continue systemic care at home.",
      importantConsiderations:
        "Intrathecal chemotherapy is not the whole cancer plan. GAF planning is $3,000–$10,000. Severe headache, fever, confusion, seizure or new weakness belongs in a local emergency department.",
      treatmentType: "Intrathecal Chemotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology and haematology programmes in India",
      technology:
        "Lumbar-puncture or Ommaya-reservoir CSF access, neighbouring chemotherapy, radiation, CAR-T and transplant sheets",
      searchKeywords: [
        "Intrathecal chemotherapy in India",
        "intrathecal chemotherapy cost in India",
        "intrathecal methotrexate India",
        "Ommaya reservoir chemotherapy India",
        "CNS prophylaxis leukaemia India",
        "leptomeningeal chemotherapy India",
        "lumbar puncture chemotherapy cost",
        "intrathecal cytarabine India",
        "triple intrathecal chemotherapy",
        "CNS-directed chemotherapy India",
        "intrathecal chemotherapy hospitals in India",
        "CSF chemotherapy cost India",
      ],
      faqs: [
        {
          id: "itc-faq-1",
          question: "What is intrathecal chemotherapy?",
          answer:
            "Delivery of selected anticancer medicine directly into cerebrospinal fluid through a lumbar puncture or an implanted reservoir.",
        },
        {
          id: "itc-faq-2",
          question: "How much does intrathecal chemotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $3,000–$10,000 for the overall pathway, typically day-care LP or Ommaya access. US comparison is $15,000–$40,000.",
        },
        {
          id: "itc-faq-3",
          question: "Is this the same as a lumbar puncture?",
          answer:
            "No. A lumbar puncture accesses CSF. Intrathecal chemotherapy is the medicine given through that access.",
        },
        {
          id: "itc-faq-4",
          question: "Which cancers may need this route?",
          answer:
            "Selected acute lymphoblastic leukaemia, some AML with CNS involvement, selected lymphoma and some leptomeningeal disease.",
        },
        {
          id: "itc-faq-5",
          question: "How many sessions are needed?",
          answer:
            "There is no universal number. The calendar depends on diagnosis, CSF findings, protocol and response.",
        },
        {
          id: "itc-faq-6",
          question: "What is an Ommaya reservoir?",
          answer:
            "An implanted device under the scalp that connects to ventricular CSF and can be used for repeated administrations in selected patients.",
        },
        {
          id: "itc-faq-7",
          question: "Is reservoir placement included in the cost?",
          answer:
            "Usually it is a separate neurosurgical cost unless a hospital explicitly bundles it.",
        },
        {
          id: "itc-faq-8",
          question: "Can it replace systemic chemotherapy?",
          answer:
            "No. It does not generally replace systemic treatment when systemic disease also needs treatment.",
        },
        {
          id: "itc-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Severe or persistent headache, fever, confusion, new weakness, seizure or loss of consciousness belongs in a local emergency department.",
        },
        {
          id: "itc-faq-10",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, if the treating hospital determines they are medically suitable. Complete records should be reviewed before travel.",
        },
        {
          id: "itc-faq-11",
          question: "Does every leukaemia patient need this route?",
          answer:
            "No. The decision depends on subtype, CNS risk, protocol and individual clinical findings.",
        },
        {
          id: "itc-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can manage the parent cancer and CSF access.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of cerebrospinal-fluid drug delivery along the brain and spinal canal",
      seoTitle: "Intrathecal Chemotherapy in India: Cost, Procedure, Drugs & Recovery",
      metaDescription:
        "Intrathecal chemotherapy in India explained: GAF planning $3,000–$10,000, lumbar puncture versus Ommaya access, medicines, session count and how it differs from IV chemotherapy.",
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

for (const slug of [LEUKEMIA, LYMPHOMA, CART, BMT, HSCT, DCT, BRAIN, EBRT]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [CAR-T Cell Therapy in India](https://gaf.healthcare/treatments/car-t-cell-therapy-in-india).",
    ", [CAR-T Cell Therapy in India](https://gaf.healthcare/treatments/car-t-cell-therapy-in-india) and [Intrathecal Chemotherapy in India](https://gaf.healthcare/treatments/intrathecal-chemotherapy-in-india).",
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

patchMarkdown(resolve("scripts/leukemia-treatment-body.md"));
patchMarkdown(resolve("scripts/lymphoma-treatment-body.md"));
