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

const body = readFileSync(resolve("scripts/mommy-makeover-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "mommy-makeover-in-india");
const now = "2026-09-29T13:30:00.000Z";
const SLUG = "mommy-makeover-in-india";
const LIFT = "breast-lift-in-india";
const AUG = "breast-augmentation-in-india";
const LIPO = "liposuction-in-india";
const LIFT_LIPO_NEEDLE =
  "Augmentation lists sit on [Breast Augmentation in India](/treatments/breast-augmentation-in-india).";
const AUG_NEEDLE =
  "Lift lists raise position. Reconstruction lists restore form after mastectomy. They are not a substitute augmentation price.";
const RELATED_ADDITION =
  " Mommy-makeover combination lists sit on [Mommy Makeover in India](/treatments/mommy-makeover-in-india).";

const treatment = {
  id: existing?.id ?? "d1f5c9b8-4e32-b607-5ab8-8f6c3c7e2b95",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Mommy Makeover in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Post-pregnancy Body Contouring",
  category: "Mommy Makeover",
  image: "/uploads/treatments/mommy-makeover-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-soumya-khanna",
    "dr-nooreyezdan-shahin",
    "dr-hemang-sanghvi",
    "dr-kiran-naik",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-lokesh-suryanarayanan",
    "dr-chepauk-ramesh",
    "dr-sasikanth-maddu",
    "dr-maj-nirjhar-ghosh",
  ],
  hospitalSlugs: [
    "max-super-speciality-hospital-saket",
    "apollo-delhi",
    "wockhardt-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-somajiguda",
    "kims-hospitals-secunderabad",
    "apollo-hospital-jubilee-hills-hyderabad",
  ],
  costPageSlugs: [
    "tummy-tuck",
    "liposuction",
    "breast-lift",
    "breast-augmentation",
    "breast-reduction",
    "fat-transfer",
    "arm-lift",
  ],
  relatedTreatmentSlugs: [LIPO, LIFT, AUG],
  status: "published" as const,
  featured: true,
  sortOrder: 34,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Mommy Makeover in India",
      shortDescription:
        "Mommy makeover in India is a customized combination of tummy tuck, liposuction and breast surgery after pregnancy — quoted from named component sheets, not a package.",
      editorialBody: body,
      process: [
        {
          id: "mm-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides body and breast photographs, pregnancy and breastfeeding history, C-section notes and any previous surgery records.",
        },
        {
          id: "mm-step-2",
          title: "Virtual consultation",
          description:
            "A plastic surgeon reviews whether tummy tuck, liposuction, breast lift, augmentation, reduction or a staged plan is the honest brief.",
        },
        {
          id: "mm-step-3",
          title: "Confirm combine versus stage",
          description:
            "The team writes which procedures belong in one sitting and which belong on a later quote because of time, recovery or risk.",
        },
        {
          id: "mm-step-4",
          title: "Itemized estimate",
          description:
            "Named components are quoted from tummy tuck, liposuction and breast sheets. Combined lists are quoted after review.",
        },
        {
          id: "mm-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Rapid swelling, fever, wound opening or breathlessness is a local emergency.",
        },
        {
          id: "mm-step-6",
          title: "In-person examination",
          description:
            "The surgeon assesses skin, diastasis, fat distribution and breast position after arrival and confirms the final combination.",
        },
        {
          id: "mm-step-7",
          title: "Combined or staged surgery",
          description:
            "Abdominoplasty, liposuction and/or breast surgery are performed according to the written plan.",
        },
        {
          id: "mm-step-8",
          title: "Support garment and early review",
          description:
            "Compression and a surgical bra may be used. Stay follows the named components; tummy-tuck lists are typically 2–5 nights.",
        },
        {
          id: "mm-step-9",
          title: "Return home",
          description:
            "The patient leaves with wound-care instructions, lifting restrictions, implant documentation if used, and a plan for remote follow-up.",
        },
      ],
      preparation:
        "Share photographs, pregnancy and breastfeeding history, C-section notes and future pregnancy plans so the surgeon can judge combination versus staging.",
      recovery:
        "Swelling, tightness, reduced mobility and restrictions on lifting children are common. Final contour continues settling for months.",
      hospitalStay: "2–5 nights when a tummy tuck is included",
      recoveryPeriod:
        "Several weeks for lighter activity. Heavy lifting and strenuous exercise remain restricted until the surgeon clears them.",
      followUp:
        "Request a written summary covering the procedures performed, drains or garments, warning signs, lifting restrictions and remote review after returning home.",
      importantConsiderations:
        "A mommy makeover is not a package price. Combined surgery increases complexity. Rapid swelling, fever, wound opening, darkening skin, implant exposure, breathlessness or calf swelling belongs in a local emergency department.",
      treatmentType: "Mommy Makeover",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Abdominoplasty with selected fascial repair, liposuction of mapped zones, and mastopexy, implants or reduction as indicated",
      searchKeywords: [
        "mommy makeover in India",
        "mommy makeover cost in India",
        "mommy makeover surgery in India",
        "post-pregnancy plastic surgery India",
        "tummy tuck and breast lift India",
        "mommy makeover recovery",
        "mommy makeover after C-section",
        "mommy makeover for international patients",
      ],
      faqs: [
        {
          id: "mm-faq-1",
          question: "How much does a mommy makeover cost in India?",
          answer:
            "There is no bundled GAF sheet. Named tummy tuck is $3,500–$7,200, liposuction $1,500–$4,200, breast lift $3,000–$6,500 and breast augmentation $3,000–$6,500. Combined lists are quoted after review.",
        },
        {
          id: "mm-faq-2",
          question: "Is a mommy makeover the same as a tummy tuck?",
          answer:
            "No. A tummy tuck is one procedure. A mommy makeover is a customized combination that may include a tummy tuck.",
        },
        {
          id: "mm-faq-3",
          question: "Can procedures be combined in one operation?",
          answer:
            "Sometimes. Combining procedures can increase operative time and risk. The surgeon decides whether to combine or stage after examination.",
        },
        {
          id: "mm-faq-4",
          question: "How long is the hospital stay?",
          answer:
            "Stay follows the named components. When a tummy tuck is included, GAF planning is typically 2–5 nights.",
        },
        {
          id: "mm-faq-5",
          question: "Can I lift my baby after surgery?",
          answer:
            "Not immediately. Heavy lifting, including lifting children, is usually restricted during early recovery after abdominoplasty.",
        },
        {
          id: "mm-faq-6",
          question: "Can I get pregnant after a mommy makeover?",
          answer:
            "Pregnancy can occur after surgery, but it may stretch abdominal and breast results. Women planning another pregnancy soon may postpone surgery.",
        },
        {
          id: "mm-faq-7",
          question: "Does a mommy makeover help with weight loss?",
          answer:
            "No. It is body contouring, not obesity treatment. Liposuction treats localized fat, not BMI.",
        },
        {
          id: "mm-faq-8",
          question: "Can international patients have a mommy makeover in India?",
          answer:
            "Yes. Photographs and history should generally be reviewed before travel. A case-specific quotation from named sheets is more useful than an online package.",
        },
        {
          id: "mm-faq-9",
          question: "Which city in India is best for a mommy makeover?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic surgeon who already performs the combination you need.",
        },
        {
          id: "mm-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Rapid swelling, fever, wound opening, darkening skin, implant exposure, breathlessness or calf swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "mm-faq-11",
          question: "Does fat-transfer volume use the tummy-tuck sheet?",
          answer:
            "No. Neighbouring fat transfer is $2,000–$5,500 when modest autologous volume is the product.",
        },
        {
          id: "mm-faq-12",
          question: "Does reconstruction after mastectomy use a mommy-makeover plan?",
          answer:
            "No. Neighbouring breast reconstruction is $6,000–$18,000 and is an oncology reconstructive product.",
        },
        {
          id: "mm-faq-13",
          question: "Can a C-section scar be revised during a tummy tuck?",
          answer:
            "Sometimes. A tummy tuck may incorporate or revise a lower-abdominal C-section scar, but previous surgery changes planning.",
        },
        {
          id: "mm-faq-14",
          question: "Are breast implants lifetime devices?",
          answer:
            "No. If augmentation is included, implants may later need removal, replacement or revision.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping geometric shapes used as the mommy-makeover treatment hero",
      seoTitle: "Mommy Makeover in India: Cost, Procedures & Recovery",
      metaDescription:
        "Learn about mommy makeover in India, including tummy tuck, liposuction, breast lift and augmentation, named USD component planning, recovery, risks and international-patient timing.",
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

linkRelated(LIFT, LIFT_LIPO_NEEDLE, RELATED_ADDITION);
linkRelated(LIPO, LIFT_LIPO_NEEDLE, RELATED_ADDITION);
linkRelated(AUG, AUG_NEEDLE, RELATED_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [breast augmentation in India](https://gaf.healthcare/treatments/breast-augmentation-in-india).",
    ", [breast augmentation in India](https://gaf.healthcare/treatments/breast-augmentation-in-india) and [mommy makeover in India](https://gaf.healthcare/treatments/mommy-makeover-in-india).",
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

patchMarkdown(resolve("scripts/breast-lift-treatment-body.md"), LIFT_LIPO_NEEDLE, RELATED_ADDITION);
patchMarkdown(resolve("scripts/liposuction-treatment-body.md"), LIFT_LIPO_NEEDLE, RELATED_ADDITION);
patchMarkdown(resolve("scripts/breast-augmentation-treatment-body.md"), AUG_NEEDLE, RELATED_ADDITION);
