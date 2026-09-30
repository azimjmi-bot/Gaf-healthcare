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

const body = readFileSync(resolve("scripts/breast-lift-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "breast-lift-in-india");
const now = "2026-09-29T12:00:00.000Z";
const SLUG = "breast-lift-in-india";
const LIPO = "liposuction-in-india";
const RHINO = "rhinoplasty-in-india";
const BLEPH = "blepharoplasty-in-india";
const LIPO_NEEDLE =
  "Bariatric lists treat obesity. Skin-excision lists treat loose skin. They are not a substitute liposuction price.";
const LIPO_ADDITION =
  " Breast-lift lists sit on [Breast Lift in India](/treatments/breast-lift-in-india).";

const treatment = {
  id: existing?.id ?? "a8c2f6e5-1b09-83d4-27e5-5c3d0f4b9e62",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Breast Lift (Mastopexy) in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Breast Surgery",
  category: "Breast Lift",
  image: "/uploads/treatments/breast-lift-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anup-dhir",
    "dr-soumya-khanna",
    "dr-charudatta-chaudhari",
    "dr-hemang-sanghvi",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-lokesh-suryanarayanan",
    "dr-s-narayanamurthy",
    "dr-srinivas-s-jammula",
    "dr-guru-prasad-reddy",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "max-super-speciality-hospital-saket",
    "apollo-hospitals-navi-mumbai",
    "wockhardt-hospital",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "breast-lift",
    "breast-augmentation",
    "breast-reduction",
    "fat-transfer",
    "liposuction",
    "gynecomastia-surgery",
    "tummy-tuck",
  ],
  relatedTreatmentSlugs: [LIPO, RHINO, BLEPH, "breast-reconstruction-in-india", "breast-augmentation-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 31,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Breast Lift (Mastopexy) in India",
      shortDescription:
        "Breast lift in India (mastopexy) raises and reshapes sagging breasts — not a volume procedure — with named partner planning of $3,000–$6,500.",
      editorialBody: body,
      process: [
        {
          id: "lift-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides breast photographs, pregnancy and breastfeeding history, imaging reports and any previous breast-surgery notes.",
        },
        {
          id: "lift-step-2",
          title: "Virtual consultation",
          description:
            "A plastic surgeon reviews whether mastopexy, augmentation, reduction or a staged combination is the honest brief.",
        },
        {
          id: "lift-step-3",
          title: "Confirm the incision plan",
          description:
            "The team writes the likely scar pattern and whether implants, reduction or fat transfer belongs on a separate quote.",
        },
        {
          id: "lift-step-4",
          title: "Itemized estimate",
          description:
            "Named breast lift is $3,000–$6,500. Combined implants, reduction and revision lists are quoted after review.",
        },
        {
          id: "lift-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Rapid swelling, fever, wound opening or breathlessness is a local emergency.",
        },
        {
          id: "lift-step-6",
          title: "In-person examination",
          description:
            "The surgeon grades ptosis, skin quality and nipple position after arrival and confirms the final plan.",
        },
        {
          id: "lift-step-7",
          title: "Mastopexy",
          description:
            "Excess skin is removed, breast tissue is reshaped and the nipple-areola complex is repositioned.",
        },
        {
          id: "lift-step-8",
          title: "Support garment and early review",
          description:
            "A surgical bra is commonly applied. GAF stay planning is typically 1–3 nights.",
        },
        {
          id: "lift-step-9",
          title: "Return home",
          description:
            "The patient leaves with wound-care instructions, warning signs and a plan for remote follow-up after clearance to travel.",
        },
      ],
      preparation:
        "Share breast photographs, imaging, pregnancy and breastfeeding history and previous surgery notes so the surgeon can judge lift versus augmentation versus reduction.",
      recovery:
        "Soreness, tightness, swelling and bruising are common. A support bra is usually advised. Final shape continues settling for months.",
      hospitalStay: "1–3 nights",
      recoveryPeriod:
        "Several weeks for lighter activity. Final contour and scar maturation continue for months.",
      followUp:
        "Request a written summary covering incision pattern, support-garment protocol, warning signs and remote review after returning home.",
      importantConsiderations:
        "A breast lift does not substantially increase size. Combined implants use the neighbouring augmentation sheet. Rapid swelling, fever, wound opening, darkening nipple or skin, breathlessness or calf swelling belongs in a local emergency department.",
      treatmentType: "Mastopexy",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Crescent, circumareolar, vertical or Wise-pattern mastopexy selected after examination",
      searchKeywords: [
        "breast lift in India",
        "mastopexy in India",
        "breast lift cost in India",
        "mastopexy cost in India",
        "breast lift surgery in Delhi",
        "breast lift with implants in India",
        "breast lift without implants",
        "breast ptosis treatment in India",
      ],
      faqs: [
        {
          id: "lift-faq-1",
          question: "How much does a breast lift cost in India?",
          answer:
            "Named GAF partner planning is $3,000–$6,500, typically 1–3 nights. Combined implants, reduction and revision lists are quoted separately.",
        },
        {
          id: "lift-faq-2",
          question: "Does a breast lift increase breast size?",
          answer:
            "Not significantly. Mastopexy primarily lifts and reshapes existing volume. Augmentation is a neighbouring product when more fullness is desired.",
        },
        {
          id: "lift-faq-3",
          question: "Can I have a breast lift without implants?",
          answer:
            "Yes. Mastopexy can be performed without implants when the goal is position and shape rather than added volume.",
        },
        {
          id: "lift-faq-4",
          question: "Is a breast lift the same as breast reduction?",
          answer:
            "No. A lift reshapes and raises the breast. A reduction removes a meaningful amount of tissue and skin to reduce volume and weight.",
        },
        {
          id: "lift-faq-5",
          question: "How long is the hospital stay after a breast lift?",
          answer: "GAF planning is typically 1–3 nights.",
        },
        {
          id: "lift-faq-6",
          question: "Will I have scars?",
          answer:
            "Yes. Every mastopexy leaves scars. Location depends on crescent, circumareolar, vertical or anchor technique. Scars usually soften over months to years.",
        },
        {
          id: "lift-faq-7",
          question: "Can I breastfeed after mastopexy?",
          answer:
            "Breastfeeding may remain possible, but it cannot be guaranteed. Discuss future breastfeeding plans with the surgeon before surgery.",
        },
        {
          id: "lift-faq-8",
          question: "Can international patients have a breast lift in India?",
          answer:
            "Yes. Photographs and breast history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "lift-faq-9",
          question: "Which city in India is best for a breast lift?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic surgeon who already operates on the degree of ptosis you have.",
        },
        {
          id: "lift-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Rapid swelling, fever, wound opening, severe one-sided pain, darkening nipple or skin, breathlessness or calf swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "lift-faq-11",
          question: "Does a lift with implants use the breast-lift price?",
          answer:
            "Not as a bundled quote. Neighbouring breast augmentation is $3,000–$6,500 and is quoted after review.",
        },
        {
          id: "lift-faq-12",
          question: "Does breast reduction use the mastopexy sheet?",
          answer:
            "No. Neighbouring breast reduction is $3,200–$6,800 when tissue weight, not position alone, is the product.",
        },
        {
          id: "lift-faq-13",
          question: "Does gynecomastia use the breast-lift sheet?",
          answer:
            "No. Neighbouring gynecomastia surgery is $1,800–$4,200 and is a male-chest product.",
        },
        {
          id: "lift-faq-14",
          question: "How soon after breastfeeding can I have a lift?",
          answer:
            "Surgeons commonly suggest waiting about six months to a year after breastfeeding ends so size and shape can stabilize. Timing is individualized.",
        },
      ],
      imageAlt: "Educational illustration of a geometric chest contour used as the breast-lift treatment hero",
      seoTitle: "Breast Lift in India (Mastopexy): Cost, Surgery, Recovery & Risks",
      metaDescription:
        "Learn about breast lift in India (mastopexy), including techniques, $3,000–$6,500 partner planning, recovery, scars, risks, breastfeeding and medical-tourism planning.",
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

linkRelated(LIPO, LIPO_NEEDLE, LIPO_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [liposuction in India](https://gaf.healthcare/treatments/liposuction-in-india).",
    ", [liposuction in India](https://gaf.healthcare/treatments/liposuction-in-india) and [breast lift in India](https://gaf.healthcare/treatments/breast-lift-in-india).",
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

patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), LIPO_NEEDLE, LIPO_ADDITION);
