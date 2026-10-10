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

const body = readFileSync(resolve("scripts/intraperitoneal-chemotherapy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "intraperitoneal-chemotherapy-in-india");
const now = "2026-10-03T08:40:00.000Z";
const SLUG = "intraperitoneal-chemotherapy-in-india";
const HIPEC = "hipec-surgery-in-india";
const OVARIAN = "ovarian-cancer-treatment-in-india";
const COLON = "colon-cancer-treatment-in-india";
const PANCREAS = "pancreatic-cancer-treatment-in-india";
const LINK =
  " Named catheter-based IP lists sit on [Intraperitoneal Chemotherapy in India](/treatments/intraperitoneal-chemotherapy-in-india).";

const REPLACEMENTS: Array<[string, string]> = [
  [
    "GAF planning ranges for [CRS with HIPEC](/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC) are **$18,000–$40,000**, typically **10–21 nights**.",
    `GAF planning ranges for [CRS with HIPEC](/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC) are **$18,000–$40,000**, typically **10–21 nights**.${LINK}`,
  ],
  [
    "CRS and intraperitoneal chemotherapy, including HIPEC, have been investigated in selected patients.",
    `CRS and intraperitoneal chemotherapy, including HIPEC, have been investigated in selected patients.${LINK}`,
  ],
  [
    "How CRS and HIPEC are planned is covered in [HIPEC Surgery in India](/treatments/hipec-surgery-in-india).",
    `How CRS and HIPEC are planned is covered in [HIPEC Surgery in India](/treatments/hipec-surgery-in-india).${LINK}`,
  ],
];

const treatment = {
  id: existing?.id ?? "b4d8e2a6-3c19-4f71-9e27-8a1b5d6c0e34",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Intraperitoneal Chemotherapy in India",
  specialtySlug: "medical-oncology",
  subspecialty: "Intraperitoneal Chemotherapy",
  category: "Intraperitoneal Chemotherapy",
  image: "/uploads/treatments/ip-hero.webp",
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
    "intraperitoneal-chemotherapy",
    "chemotherapy",
    "cytoreductive-surgery-with-hipec",
    "cytoreductive-surgery",
    "pipac",
    "ovarian-cancer-cytoreductive-surgery",
    "targeted-therapy",
    "precision-oncology",
  ],
  relatedTreatmentSlugs: [HIPEC, OVARIAN, COLON, PANCREAS],
  status: "published" as const,
  featured: true,
  sortOrder: 82,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Intraperitoneal Chemotherapy in India",
      shortDescription:
        "Intraperitoneal chemotherapy in India delivers selected anticancer medicine into the abdominal cavity. GAF planning is $5,000–$14,000, typically tied to cytoreduction or IP ports.",
      editorialBody: body,
      process: [
        {
          id: "ip-step-1",
          title: "Share records",
          description:
            "The patient provides pathology, peritoneal imaging, operative notes and previous chemotherapy details before anyone books travel.",
        },
        {
          id: "ip-step-2",
          title: "Oncology review",
          description:
            "A medical or gynaecologic oncologist reviews whether catheter IP, HIPEC, PIPAC, systemic treatment or no India list is the honest next step.",
        },
        {
          id: "ip-step-3",
          title: "Name the route",
          description:
            "The team writes catheter or port cycles versus CRS-HIPEC, the medicine, dose and expected number of administrations.",
        },
        {
          id: "ip-step-4",
          title: "Itemized estimate",
          description:
            "GAF intraperitoneal planning is $5,000–$14,000. Neighbouring CRS-HIPEC is $18,000–$40,000. Neighbouring PIPAC is $7,000–$16,000.",
        },
        {
          id: "ip-step-5",
          title: "Travel if appropriate",
          description:
            "Stable planned cases travel after records review. Severe abdominal pain, fever or catheter leakage is a local emergency.",
        },
        {
          id: "ip-step-6",
          title: "Port or theatre access",
          description:
            "A peritoneal catheter may be placed, or HIPEC proceeds only after planned cytoreduction when that route is named.",
        },
        {
          id: "ip-step-7",
          title: "Administration",
          description:
            "Medicine is delivered into the peritoneal cavity according to the written protocol, with positioning to aid distribution when required.",
        },
        {
          id: "ip-step-8",
          title: "Observation",
          description:
            "Pain, fever, kidney function, blood counts and catheter problems are watched before discharge.",
        },
        {
          id: "ip-step-9",
          title: "Follow-up plan",
          description:
            "The patient leaves with the medicine name, remaining cycles, port-care instructions and who will continue systemic care at home.",
        },
      ],
      preparation:
        "Share complete oncology, operative and imaging records so the team can judge catheter IP versus HIPEC, PIPAC or systemic treatment only.",
      recovery:
        "Catheter cycles may be day-care. HIPEC recovery follows major abdominal surgery. Severe abdominal pain, fever or catheter leakage belongs in a local emergency department.",
      hospitalStay: "Tied to cytoreduction or IP ports. HIPEC stay is a separate 10–21-night sheet.",
      recoveryPeriod:
        "Side effects can last several days after each cycle. Operative pathways need a longer surgical recovery.",
      followUp:
        "Request a written summary covering the route, medicine, remaining cycles, catheter care and who will continue treatment at home.",
      importantConsiderations:
        "Intraperitoneal chemotherapy is not HIPEC and is not a guaranteed cure. GAF planning is $5,000–$14,000. Severe abdominal pain, fever or catheter leakage belongs in a local emergency department.",
      treatmentType: "Intraperitoneal Chemotherapy / Medical Oncology",
      treatmentSetting: "Accredited partner medical oncology and peritoneal-surface programmes in India",
      technology:
        "Peritoneal-port or catheter IP cycles, neighbouring HIPEC, PIPAC, cytoreduction and systemic chemotherapy sheets",
      searchKeywords: [
        "Intraperitoneal chemotherapy in India",
        "intraperitoneal chemotherapy cost in India",
        "IP chemotherapy in India",
        "intraperitoneal chemotherapy for ovarian cancer",
        "HIPEC vs intraperitoneal chemotherapy",
        "IP chemotherapy for peritoneal cancer",
        "intraperitoneal chemotherapy hospitals in India",
        "peritoneal cancer treatment in India",
        "CRS HIPEC in India",
        "PIPAC vs IP chemotherapy",
        "intraperitoneal cisplatin paclitaxel",
        "peritoneal port chemotherapy India",
      ],
      faqs: [
        {
          id: "ip-faq-1",
          question: "What is intraperitoneal chemotherapy?",
          answer:
            "Delivery of selected anticancer medicine directly into the peritoneal cavity through a catheter, port or other specialised system.",
        },
        {
          id: "ip-faq-2",
          question: "How much does intraperitoneal chemotherapy cost in India?",
          answer:
            "GAF Healthcare planning is $5,000–$14,000, typically tied to cytoreduction or IP ports. US comparison is $20,000–$55,000. That band is not a HIPEC quotation.",
        },
        {
          id: "ip-faq-3",
          question: "Is IP chemotherapy the same as HIPEC?",
          answer:
            "No. HIPEC is heated chemotherapy usually given during cytoreductive surgery. Conventional IP chemotherapy is commonly catheter-based.",
        },
        {
          id: "ip-faq-4",
          question: "Which cancers may need this route?",
          answer:
            "Selected ovarian, fallopian-tube, primary peritoneal and other peritoneal-surface malignancies. It is not appropriate for every abdominal cancer.",
        },
        {
          id: "ip-faq-5",
          question: "Can it be combined with IV chemotherapy?",
          answer:
            "Yes. Some protocols combine systemic intravenous chemotherapy with intraperitoneal treatment.",
        },
        {
          id: "ip-faq-6",
          question: "Does it require surgery?",
          answer:
            "Conventional IP chemotherapy does not necessarily require major surgery, although a catheter or port may be placed. HIPEC does require surgery.",
        },
        {
          id: "ip-faq-7",
          question: "What is PIPAC?",
          answer:
            "Pressurised intraperitoneal aerosol chemotherapy delivered laparoscopically. It is a different product from catheter IP and from HIPEC.",
        },
        {
          id: "ip-faq-8",
          question: "Can it cure cancer?",
          answer:
            "It is a treatment modality, not a guaranteed cure. Benefit varies by cancer type, residual disease and overall plan.",
        },
        {
          id: "ip-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Severe abdominal pain, fever, catheter leakage, collapse or anuria belongs in a local emergency department.",
        },
        {
          id: "ip-faq-10",
          question: "Can international patients receive this treatment in India?",
          answer:
            "Yes, after records review. The treating team should confirm whether catheter IP, HIPEC or another route is being proposed.",
        },
        {
          id: "ip-faq-11",
          question: "Is everyone eligible?",
          answer:
            "No. Kidney function, disease distribution, previous surgery, adhesions and the ability to manage toxicity all matter.",
        },
        {
          id: "ip-faq-12",
          question: "Which city in India is right?",
          answer:
            "There is no single preferred city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Confirm the campus that can manage the parent cancer and the named IP route.",
        },
      ],
      imageAlt:
        "Educational unlabeled schematic of regional chemotherapy inside the abdominal cavity",
      seoTitle: "Intraperitoneal Chemotherapy in India: Cost, Eligibility & HIPEC vs IP",
      metaDescription:
        "Intraperitoneal chemotherapy in India explained: GAF planning $5,000–$14,000, ovarian and peritoneal uses, HIPEC versus catheter IP, side effects and how to request a quotation.",
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

for (const slug of [HIPEC, OVARIAN, COLON, PANCREAS]) {
  patchEditorial(slug);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [Intrathecal Chemotherapy in India](https://gaf.healthcare/treatments/intrathecal-chemotherapy-in-india).",
    ", [Intrathecal Chemotherapy in India](https://gaf.healthcare/treatments/intrathecal-chemotherapy-in-india) and [Intraperitoneal Chemotherapy in India](https://gaf.healthcare/treatments/intraperitoneal-chemotherapy-in-india).",
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

patchMarkdown(resolve("scripts/hipec-treatment-body.md"));
patchMarkdown(resolve("scripts/ovarian-treatment-body.md"));
patchMarkdown(resolve("scripts/colon-treatment-body.md"));
