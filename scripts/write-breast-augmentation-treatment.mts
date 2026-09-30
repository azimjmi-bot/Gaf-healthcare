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

const body = readFileSync(resolve("scripts/breast-augmentation-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "breast-augmentation-in-india");
const now = "2026-09-29T13:00:00.000Z";
const SLUG = "breast-augmentation-in-india";
const LIFT = "breast-lift-in-india";
const RECON = "breast-reconstruction-in-india";
const LIPO = "liposuction-in-india";
const LIFT_NEEDLE =
  "Reconstructive lists sit on [Breast Reconstruction Surgery in India](/treatments/breast-reconstruction-in-india).";
const LIFT_ADDITION =
  " Augmentation lists sit on [Breast Augmentation in India](/treatments/breast-augmentation-in-india).";
const RECON_NEEDLE =
  "Oncology lists treat cancer. Cosmetic lift lists treat ptosis. They are not a substitute reconstruction price.";
const RECON_ADDITION =
  " Augmentation lists sit on [Breast Augmentation in India](/treatments/breast-augmentation-in-india).";
const LIPO_NEEDLE =
  "Breast-lift lists sit on [Breast Lift in India](/treatments/breast-lift-in-india).";
const LIPO_ADDITION =
  " Augmentation lists sit on [Breast Augmentation in India](/treatments/breast-augmentation-in-india).";

const treatment = {
  id: existing?.id ?? "c0e4b8a7-3d21-a5f6-49a7-7e5f2b6d1a84",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Breast Augmentation in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Breast Surgery",
  category: "Breast Augmentation",
  image: "/uploads/treatments/breast-aug-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anup-dhir",
    "dr-aditya-aggarwal",
    "dr-hemang-sanghvi",
    "dr-vinod-ranvir-vij",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-lokesh-suryanarayanan",
    "dr-s-narayanamurthy",
    "dr-guru-prasad-reddy",
    "dr-srinivas-s-jammula",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "wockhardt-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "breast-augmentation",
    "breast-lift",
    "breast-reduction",
    "fat-transfer",
    "liposuction",
    "gynecomastia-surgery",
    "breast-reconstruction",
  ],
  relatedTreatmentSlugs: [LIFT, RECON, LIPO, "mommy-makeover-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 33,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Breast Augmentation in India",
      shortDescription:
        "Breast augmentation in India increases or restores breast volume with implants or selected fat transfer — named partner planning of $3,000–$6,500.",
      editorialBody: body,
      process: [
        {
          id: "aug-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides breast photographs, medical history, imaging reports and any previous breast-surgery notes.",
        },
        {
          id: "aug-step-2",
          title: "Virtual consultation",
          description:
            "A plastic surgeon reviews whether implants, fat transfer, a lift or a staged combination is the honest brief.",
        },
        {
          id: "aug-step-3",
          title: "Confirm implant plan",
          description:
            "The team writes the likely implant type, size range, plane and incision, and whether a lift belongs on a separate quote.",
        },
        {
          id: "aug-step-4",
          title: "Itemized estimate",
          description:
            "Named breast augmentation is $3,000–$6,500. Combined lift, revision and implant-exchange lists are quoted after review.",
        },
        {
          id: "aug-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Rapid swelling, fever, wound opening or breathlessness is a local emergency.",
        },
        {
          id: "aug-step-6",
          title: "In-person examination",
          description:
            "The surgeon measures chest width, tissue coverage and nipple position after arrival and confirms the final implant.",
        },
        {
          id: "aug-step-7",
          title: "Augmentation",
          description:
            "The selected implant is placed in the planned pocket, or fat is transferred in selected autologous cases.",
        },
        {
          id: "aug-step-8",
          title: "Support garment and early review",
          description:
            "A surgical bra is commonly applied. GAF stay planning is typically 1–3 nights.",
        },
        {
          id: "aug-step-9",
          title: "Return home",
          description:
            "The patient leaves with implant documentation, wound-care instructions, warning signs and a plan for remote follow-up.",
        },
      ],
      preparation:
        "Share breast photographs, imaging, medical history and previous surgery notes so the surgeon can judge implant versus fat transfer versus combined lift.",
      recovery:
        "Tightness, swelling and soreness are common. A support bra is usually advised. Final appearance continues settling for months.",
      hospitalStay: "1–3 nights",
      recoveryPeriod:
        "Several weeks for lighter activity. Final contour and scar maturation continue for months.",
      followUp:
        "Request a written summary covering implant model, support-garment protocol, warning signs, imaging surveillance and remote review after returning home.",
      importantConsiderations:
        "Breast implants are not lifetime devices. Combined lift uses the neighbouring mastopexy sheet. Rapid swelling, fever, wound opening, implant exposure, breathlessness or calf swelling belongs in a local emergency department.",
      treatmentType: "Breast Augmentation",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Silicone or saline implants in subglandular, submuscular or dual-plane pockets; selected fat-transfer augmentation",
      searchKeywords: [
        "breast augmentation in India",
        "breast augmentation cost in India",
        "breast implant surgery in India",
        "breast implants in India",
        "breast enlargement surgery in India",
        "silicone breast implants",
        "fat transfer breast augmentation",
        "breast augmentation for international patients",
      ],
      faqs: [
        {
          id: "aug-faq-1",
          question: "How much does breast augmentation cost in India?",
          answer:
            "Named GAF partner planning is $3,000–$6,500, typically 1–3 nights. Combined lift, revision and implant-exchange lists are quoted separately.",
        },
        {
          id: "aug-faq-2",
          question: "Which implant is better: silicone or saline?",
          answer:
            "Neither is universally better. Silicone and saline implants have different characteristics. The appropriate choice depends on anatomy, goals and the surgeon's assessment.",
        },
        {
          id: "aug-faq-3",
          question: "Do breast implants last for life?",
          answer:
            "No. Breast implants are not lifetime devices. Some patients later need removal, replacement or revision surgery.",
        },
        {
          id: "aug-faq-4",
          question: "How long is the hospital stay after breast augmentation?",
          answer: "GAF planning is typically 1–3 nights.",
        },
        {
          id: "aug-faq-5",
          question: "Can breast augmentation be combined with a breast lift?",
          answer:
            "Yes, when there is both volume loss and significant drooping. Combined work is quoted after review rather than as a bundled augmentation price.",
        },
        {
          id: "aug-faq-6",
          question: "Can I breastfeed after breast augmentation?",
          answer:
            "Many women can breastfeed after augmentation, but ability varies. Discuss future pregnancy and breastfeeding with the surgeon before choosing technique.",
        },
        {
          id: "aug-faq-7",
          question: "Can international patients have breast augmentation in India?",
          answer:
            "Yes. Photographs and medical history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "aug-faq-8",
          question: "Which city in India is best for breast augmentation?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic surgeon who already plans the implant, plane and incision you need.",
        },
        {
          id: "aug-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Rapid swelling, fever, wound opening, severe one-sided pain, implant exposure, breathlessness or calf swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "aug-faq-10",
          question: "Does fat-transfer augmentation use the implant sheet?",
          answer:
            "No. Neighbouring fat transfer is $2,000–$5,500 when modest autologous volume is the product.",
        },
        {
          id: "aug-faq-11",
          question: "Does a breast lift use the augmentation sheet?",
          answer:
            "No. Neighbouring breast lift is $3,000–$6,500 when position, not volume, is the product.",
        },
        {
          id: "aug-faq-12",
          question: "Does reconstruction after mastectomy use the augmentation sheet?",
          answer:
            "No. Neighbouring breast reconstruction is $6,000–$18,000 and must not be used as a cosmetic augmentation quotation.",
        },
        {
          id: "aug-faq-13",
          question: "Do I need MRI after breast augmentation?",
          answer:
            "Not immediately after surgery. For asymptomatic silicone implants, FDA recommendations call for ultrasound or MRI beginning around 5–6 years after implantation, then every 2–3 years.",
        },
        {
          id: "aug-faq-14",
          question: "Can I have a mammogram after breast augmentation?",
          answer:
            "Yes. Tell the imaging facility that you have breast implants because additional views or specific techniques may be required.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping geometric shapes used as the breast-augmentation treatment hero",
      seoTitle: "Breast Augmentation in India: Cost, Implants & Recovery",
      metaDescription:
        "Learn about breast augmentation in India, including implant types, $3,000–$6,500 partner planning, surgery, candidacy, recovery, risks and long-term follow-up.",
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

linkRelated(LIFT, LIFT_NEEDLE, LIFT_ADDITION);
linkRelated(RECON, RECON_NEEDLE, RECON_ADDITION);
linkRelated(LIPO, LIPO_NEEDLE, LIPO_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [breast reconstruction surgery in India](https://gaf.healthcare/treatments/breast-reconstruction-in-india).",
    ", [breast reconstruction surgery in India](https://gaf.healthcare/treatments/breast-reconstruction-in-india) and [breast augmentation in India](https://gaf.healthcare/treatments/breast-augmentation-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle}${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/breast-lift-treatment-body.md"), LIFT_NEEDLE, LIFT_ADDITION);
patchMarkdown(resolve("scripts/breast-reconstruction-treatment-body.md"), RECON_NEEDLE, RECON_ADDITION);
patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), LIPO_NEEDLE, LIPO_ADDITION);
