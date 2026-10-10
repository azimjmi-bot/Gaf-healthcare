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

const body = readFileSync(resolve("scripts/breast-reduction-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "breast-reduction-in-india");
const now = "2026-09-29T14:00:00.000Z";
const SLUG = "breast-reduction-in-india";
const LIFT = "breast-lift-in-india";
const AUG = "breast-augmentation-in-india";
const LIPO = "liposuction-in-india";
const MOMMY = "mommy-makeover-in-india";
const SHARED_NEEDLE =
  "Mommy-makeover combination lists sit on [Mommy Makeover in India](/treatments/mommy-makeover-in-india).";
const MOMMY_NEEDLE =
  "Single-procedure lists treat one brief. They are not a substitute combination price.";
const RELATED_ADDITION =
  " Reduction lists sit on [Breast Reduction Surgery in India](/treatments/breast-reduction-in-india).";

const treatment = {
  id: existing?.id ?? "e2a6d0c9-5f43-c718-6bc9-9a7d4d8f3c06",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Breast Reduction Surgery in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Breast Surgery",
  category: "Breast Reduction",
  image: "/uploads/treatments/breast-red-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-anup-dhir",
    "dr-nooreyezdan-shahin",
    "dr-hemang-sanghvi",
    "dr-vinod-ranvir-vij",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-lokesh-suryanarayanan",
    "dr-s-narayanamurthy",
    "dr-srinivas-s-jammula",
    "dr-guru-prasad-reddy",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "fortis-gurgaon",
    "wockhardt-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
    "max-super-speciality-hospital-saket",
  ],
  costPageSlugs: [
    "breast-reduction",
    "breast-lift",
    "breast-augmentation",
    "liposuction",
    "gynecomastia-surgery",
    "fat-transfer",
    "breast-reconstruction",
  ],
  relatedTreatmentSlugs: [LIFT, AUG, LIPO, MOMMY],
  status: "published" as const,
  featured: true,
  sortOrder: 35,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Breast Reduction Surgery in India",
      shortDescription:
        "Breast reduction in India (reduction mammoplasty) removes excess breast tissue, fat and skin — named partner planning of $3,200–$6,800.",
      editorialBody: body,
      process: [
        {
          id: "red-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides breast photographs, symptoms, imaging reports and any previous breast-surgery notes.",
        },
        {
          id: "red-step-2",
          title: "Virtual consultation",
          description:
            "A plastic surgeon reviews whether reduction, lift, liposuction adjunct or a staged combination is the honest brief.",
        },
        {
          id: "red-step-3",
          title: "Confirm the technique",
          description:
            "The team writes the likely scar pattern, pedicle versus free nipple graft, and whether liposuction belongs on a separate quote.",
        },
        {
          id: "red-step-4",
          title: "Itemized estimate",
          description:
            "Named breast reduction is $3,200–$6,800. Combined lift, liposuction-adjunct and gynecomastia lists are quoted after review.",
        },
        {
          id: "red-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Rapid swelling, fever, wound opening or breathlessness is a local emergency.",
        },
        {
          id: "red-step-6",
          title: "In-person examination",
          description:
            "The surgeon measures volume, ptosis and nipple position after arrival and confirms the final plan.",
        },
        {
          id: "red-step-7",
          title: "Reduction mammoplasty",
          description:
            "Excess tissue, fat and skin are removed, the breast is reshaped and the nipple-areola complex is repositioned.",
        },
        {
          id: "red-step-8",
          title: "Support bra and early review",
          description:
            "A surgical bra is commonly applied. GAF stay planning is typically 1–4 nights.",
        },
        {
          id: "red-step-9",
          title: "Return home",
          description:
            "The patient leaves with wound-care instructions, pathology notes where obtained, warning signs and a plan for remote follow-up.",
        },
      ],
      preparation:
        "Share breast photographs, imaging, symptoms and previous surgery notes so the surgeon can judge reduction versus lift versus liposuction adjunct.",
      recovery:
        "Soreness, tightness, swelling and bruising are common. A support bra is usually advised. Final shape continues settling for months.",
      hospitalStay: "1–4 nights",
      recoveryPeriod:
        "Several weeks for lighter activity. Strenuous exercise is often restricted for around 4–6 weeks. Final contour and scar maturation continue for months.",
      followUp:
        "Request a written summary covering incision pattern, specimen pathology, support-garment protocol, warning signs and remote review after returning home.",
      importantConsiderations:
        "Breast reduction is not a lift-only procedure. Gynecomastia is a neighbouring male-chest sheet. Rapid swelling, fever, wound opening, darkening nipple or skin, breathlessness or calf swelling belongs in a local emergency department.",
      treatmentType: "Reduction Mammoplasty",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Anchor, vertical or selected liposuction-assisted reduction; free nipple graft reserved for selected extensive cases",
      searchKeywords: [
        "breast reduction surgery in India",
        "breast reduction cost in India",
        "reduction mammoplasty in India",
        "breast reduction surgery recovery",
        "breast reduction and breastfeeding",
        "breast reduction scars",
        "breast reduction vs breast lift",
        "breast reduction for large breasts",
      ],
      faqs: [
        {
          id: "red-faq-1",
          question: "How much does breast reduction surgery cost in India?",
          answer:
            "Named GAF partner planning is $3,200–$6,800, typically 1–4 nights. Combined lift, liposuction-adjunct and gynecomastia lists are quoted separately.",
        },
        {
          id: "red-faq-2",
          question: "Is breast reduction the same as a breast lift?",
          answer:
            "No. Reduction removes a meaningful amount of tissue. A lift primarily raises and reshapes existing volume.",
        },
        {
          id: "red-faq-3",
          question: "Can I breastfeed after breast reduction?",
          answer:
            "Breastfeeding may remain possible after some techniques, but it cannot be guaranteed. Free nipple grafting eliminates normal breastfeeding from the operated breast.",
        },
        {
          id: "red-faq-4",
          question: "How long is the hospital stay after breast reduction?",
          answer: "GAF planning is typically 1–4 nights.",
        },
        {
          id: "red-faq-5",
          question: "Will I have scars?",
          answer:
            "Yes. Every reduction leaves scars. Location depends on anchor, vertical or other technique. Scars usually soften over months to years.",
        },
        {
          id: "red-faq-6",
          question: "Does liposuction replace breast reduction?",
          answer:
            "No. Neighbouring liposuction is $1,500–$4,200 and removes fat. It does not remove excess skin or reshape gland in the same way.",
        },
        {
          id: "red-faq-7",
          question: "Can international patients have breast reduction in India?",
          answer:
            "Yes. Photographs, symptoms and imaging should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "red-faq-8",
          question: "Which city in India is best for breast reduction?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic surgeon who already performs reduction mammoplasty.",
        },
        {
          id: "red-faq-9",
          question: "When should I go to an emergency department?",
          answer:
            "Rapid swelling, fever, wound opening, darkening nipple or skin, breathlessness or calf swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "red-faq-10",
          question: "Does gynecomastia use the breast-reduction sheet?",
          answer:
            "No. Neighbouring gynecomastia surgery is $1,800–$4,200 and is a male-chest product.",
        },
        {
          id: "red-faq-11",
          question: "Does a breast lift use the reduction sheet?",
          answer:
            "No. Neighbouring breast lift is $3,000–$6,500 when position, not tissue weight, is the product.",
        },
        {
          id: "red-faq-12",
          question: "Does reconstruction after mastectomy use the reduction sheet?",
          answer:
            "No. Neighbouring breast reconstruction is $6,000–$18,000 and must not be used as a cosmetic reduction quotation.",
        },
        {
          id: "red-faq-13",
          question: "Can breast reduction correct uneven breasts?",
          answer:
            "It can improve asymmetry by removing different amounts of tissue from each side. Perfect symmetry cannot be guaranteed.",
        },
        {
          id: "red-faq-14",
          question: "Is breast reduction permanent?",
          answer:
            "The tissue removed does not grow back, but pregnancy, weight change, ageing and hormones can still alter size and shape.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping geometric shapes used as the breast-reduction treatment hero",
      seoTitle: "Breast Reduction Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about breast reduction surgery in India, including reduction mammoplasty, $3,200–$6,800 partner planning, techniques, recovery, scars, breastfeeding and risks.",
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

linkRelated(LIFT, SHARED_NEEDLE, RELATED_ADDITION);
linkRelated(AUG, SHARED_NEEDLE, RELATED_ADDITION);
linkRelated(LIPO, SHARED_NEEDLE, RELATED_ADDITION);
linkRelated(MOMMY, MOMMY_NEEDLE, RELATED_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [mommy makeover in India](https://gaf.healthcare/treatments/mommy-makeover-in-india).",
    ", [mommy makeover in India](https://gaf.healthcare/treatments/mommy-makeover-in-india) and [breast reduction surgery in India](https://gaf.healthcare/treatments/breast-reduction-in-india).",
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

patchMarkdown(resolve("scripts/breast-lift-treatment-body.md"), SHARED_NEEDLE, RELATED_ADDITION);
patchMarkdown(resolve("scripts/breast-augmentation-treatment-body.md"), SHARED_NEEDLE, RELATED_ADDITION);
patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), SHARED_NEEDLE, RELATED_ADDITION);
patchMarkdown(resolve("scripts/mommy-makeover-treatment-body.md"), MOMMY_NEEDLE, RELATED_ADDITION);
