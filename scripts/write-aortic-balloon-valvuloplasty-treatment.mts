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

const body = readFileSync(
  resolve("scripts/aortic-balloon-valvuloplasty-treatment-body.md"),
  "utf8",
).trim();
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
const existing = store.treatments.find(
  (row) => row.slug === "aortic-balloon-valvuloplasty-in-india",
);
const now = "2026-09-29T10:00:00.000Z";
const SLUG = "aortic-balloon-valvuloplasty-in-india";
const TAVR = "tavr-in-india";
const PCI = "coronary-angioplasty-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const TAVR_NEEDLE =
  "Unlike conventional surgical aortic valve replacement, TAVR does not normally require opening the chest or removing the old valve surgically.";
const TAVR_ADDITION =
  "Balloon aortic valvuloplasty only widens the native valve and sits on [Aortic Balloon Valvuloplasty in India](/treatments/aortic-balloon-valvuloplasty-in-india).";

const treatment = {
  id: existing?.id ?? "e7a3c9d1-4f82-61b0-3c5e-2a8b0f7d1e44",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Aortic Balloon Valvuloplasty in India",
  specialtySlug: "cardiology",
  subspecialty: "Structural Heart",
  category: "Balloon Aortic Valvuloplasty",
  image: "/uploads/treatments/bav-balloon-inflation.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ashok-seth",
    "dr-amit-kumar-chaurasia",
    "dr-milind-phadke",
    "dr-dipak-patil",
    "dr-p-r-l-n-prasad",
    "dr-a-b-gopalamurugan",
    "dr-gobu-p",
    "dr-ajay-j-swamy",
    "dr-v-rajasekhar",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "kims-hospitals-thane",
    "gleneagles-hospital-mumbai",
    "gleneagles-hospitals-bengaluru",
    "mgm-healthcare-chennai",
    "gleneagles-healthcity-chennai",
    "kims-hospitals-secunderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "aortic-valve-replacement",
    "heart-valve-replacement",
    "balloon-mitral-valvotomy",
    "coronary-angioplasty-stenting",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [TAVR, PCI, PACEMAKER],
  status: "published" as const,
  featured: true,
  sortOrder: 27,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Aortic Balloon Valvuloplasty in India",
      shortDescription:
        "Balloon aortic valvuloplasty in India is planned as a selected bridge to TAVR or surgery after echo and Heart Team review — not a cheaper replacement valve.",
      editorialBody: body,
      process: [
        {
          id: "bav-step-1",
          title: "Share medical records",
          description:
            "The patient provides echocardiography, ECG and a short description of breathlessness, chest pain, fainting or decompensated heart failure.",
        },
        {
          id: "bav-step-2",
          title: "Heart Team review",
          description:
            "A structural-heart team reviews whether the target is BAV as a bridge, immediate TAVR, surgical AVR or observation.",
        },
        {
          id: "bav-step-3",
          title: "Confirm the next step",
          description:
            "The team writes whether BAV is a bridge to TAVR, a bridge to SAVR, a bridge to decision or a selected urgent strategy.",
        },
        {
          id: "bav-step-4",
          title: "Itemized estimate",
          description:
            "BAV is quoted after review. Neighbouring TAVR and SAVR sheets are named separately rather than bundled into a brochure balloon price.",
        },
        {
          id: "bav-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. New chest pain, fainting or severe breathlessness is a local emergency.",
        },
        {
          id: "bav-step-6",
          title: "Balloon valvuloplasty",
          description:
            "A balloon is positioned across the narrowed aortic valve and inflated under imaging in the cath lab.",
        },
        {
          id: "bav-step-7",
          title: "Haemodynamic and access monitoring",
          description:
            "The team watches the gradient, aortic regurgitation, groin, rhythm, stroke symptoms and kidney function after the procedure.",
        },
        {
          id: "bav-step-8",
          title: "Plan definitive treatment",
          description:
            "If BAV was a bridge, TAVR or SAVR timing, valve choice and fitness to proceed are confirmed before discharge when appropriate.",
        },
        {
          id: "bav-step-9",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering what was done, warning signs and the next valve step.",
        },
      ],
      preparation:
        "Share dedicated echocardiography so the team can judge BAV as a bridge versus immediate TAVR versus surgical AVR versus observation.",
      recovery:
        "Stay is quoted after case review. Neighbouring TAVR planning is typically 3-7 nights when replacement follows.",
      hospitalStay: "Quoted after Heart Team review",
      recoveryPeriod:
        "Access-site precautions and early mobilisation, then the planned next valve step rather than a generic balloon recovery timeline.",
      followUp:
        "Request a written summary covering whether BAV was a bridge, the echo result, medicines and the TAVR or SAVR plan after returning home.",
      importantConsiderations:
        "BAV is usually not a new valve. There is no separate GAF BAV sheet. New chest pain, fainting or severe breathlessness belongs in a local emergency department.",
      treatmentType: "Balloon aortic valvuloplasty",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Percutaneous balloon dilation of the native aortic valve as a selected bridge to TAVR or surgical replacement",
      searchKeywords: [
        "aortic balloon valvuloplasty in India",
        "balloon aortic valvuloplasty India",
        "BAV cost in India",
        "balloon aortic valvotomy India",
        "BAV vs TAVR",
        "bridge to TAVR",
        "aortic stenosis balloon dilation",
        "structural heart India",
      ],
      faqs: [
        {
          id: "bav-faq-1",
          question: "How much does aortic balloon valvuloplasty cost in India?",
          answer:
            "There is no separate GAF BAV sheet. BAV is quoted after Heart Team review. Neighbouring TAVR/TAVI is $18,000-$42,000 and surgical AVR is $7,000-$18,500.",
        },
        {
          id: "bav-faq-2",
          question: "Is BAV the same as TAVR?",
          answer:
            "No. BAV temporarily widens the existing valve. TAVR implants a new transcatheter heart valve.",
        },
        {
          id: "bav-faq-3",
          question: "Is balloon valvuloplasty a permanent treatment?",
          answer:
            "Usually not for adults with calcific aortic stenosis. The valve can narrow again, so BAV is often a bridge to TAVR or surgery.",
        },
        {
          id: "bav-faq-4",
          question: "How long is the hospital stay after BAV?",
          answer:
            "Stay is quoted after case review. Neighbouring TAVR planning is typically 3-7 nights.",
        },
        {
          id: "bav-faq-5",
          question: "Is BAV open-heart surgery?",
          answer:
            "No. BAV is a catheter-based procedure and generally does not require opening the chest.",
        },
        {
          id: "bav-faq-6",
          question: "Can BAV cure aortic stenosis?",
          answer:
            "BAV does not generally cure calcific aortic stenosis permanently. It can temporarily improve the valve opening.",
        },
        {
          id: "bav-faq-7",
          question: "Will I need TAVR after BAV?",
          answer:
            "Possibly. Many adult patients undergo BAV to be stabilized or assessed for definitive valve replacement.",
        },
        {
          id: "bav-faq-8",
          question: "Can international patients have BAV in India?",
          answer:
            "Yes. Echo files should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "bav-faq-9",
          question: "Which city in India is best for BAV?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a Heart Team with TAVR and surgical backup.",
        },
        {
          id: "bav-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, fainting, severe breathlessness or collapse belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "bav-faq-11",
          question: "Does balloon mitral valvotomy use the BAV price?",
          answer:
            "No. Balloon mitral valvotomy is a different valve. Named BMV is $4,000-$10,000 and must not be used as a BAV quotation.",
        },
        {
          id: "bav-faq-12",
          question: "Can children use the adult TAVR sheet after BAV?",
          answer:
            "Not by default. Congenital BAV is quoted after paediatric or congenital cardiology review rather than from adult TAVR or SAVR bands.",
        },
        {
          id: "bav-faq-13",
          question: "Is BAV safer than TAVR?",
          answer:
            "Neither procedure is universally safer. They have different purposes, selection criteria and risks.",
        },
        {
          id: "bav-faq-14",
          question: "Can BAV be used before non-cardiac surgery?",
          answer:
            "In selected patients with critical aortic stenosis who need urgent high-risk non-cardiac surgery, BAV may be considered as a temporary strategy.",
        },
      ],
      imageAlt:
        "Educational illustration of balloon inflation across a narrowed aortic valve",
      seoTitle: "Aortic Balloon Valvuloplasty in India: Role, Cost & Recovery",
      metaDescription:
        "Learn about balloon aortic valvuloplasty (BAV) in India as a selected bridge to TAVR or surgery, including neighbouring USD costs, risks, recovery and Heart Team planning.",
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
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle} ${addition}`);
  }
}

linkRelated(TAVR, TAVR_NEEDLE, TAVR_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [TAVR in India](https://gaf.healthcare/treatments/tavr-in-india).",
    ", [TAVR in India](https://gaf.healthcare/treatments/tavr-in-india) and [aortic balloon valvuloplasty in India](https://gaf.healthcare/treatments/aortic-balloon-valvuloplasty-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle} ${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/tavr-treatment-body.md"), TAVR_NEEDLE, TAVR_ADDITION);
