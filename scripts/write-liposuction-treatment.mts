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

const body = readFileSync(resolve("scripts/liposuction-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "liposuction-in-india");
const now = "2026-09-29T11:30:00.000Z";
const SLUG = "liposuction-in-india";
const RHINO = "rhinoplasty-in-india";
const BLEPH = "blepharoplasty-in-india";
const RHINO_NEEDLE =
  "Sinus lists treat sinus disease. They are not a substitute rhinoplasty price.";
const RHINO_ADDITION =
  " Body-contouring lists sit on [Liposuction in India](/treatments/liposuction-in-india).";
const BLEPH_NEEDLE =
  "Reconstruction and oculoplastic lists treat different briefs. They are not a substitute cosmetic eyelid price.";
const BLEPH_ADDITION =
  " Body-contouring lists sit on [Liposuction in India](/treatments/liposuction-in-india).";

const treatment = {
  id: existing?.id ?? "e6a0d4c3-9f87-61b2-0e5c-3a1b8d2f7c40",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Liposuction in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Body Contouring",
  category: "Liposuction",
  image: "/uploads/treatments/liposuction-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-aditya-aggarwal",
    "dr-anup-dhir",
    "dr-charudatta-chaudhari",
    "dr-kiran-naik",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-chepauk-ramesh",
    "dr-lokesh-suryanarayanan",
    "dr-guru-prasad-reddy",
    "dr-sanjeev-sasmith-b",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-hospitals-navi-mumbai",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-somajiguda",
  ],
  costPageSlugs: [
    "liposuction",
    "tummy-tuck",
    "fat-transfer",
    "gynecomastia-surgery",
    "arm-lift",
    "brazilian-butt-lift",
    "neck-lift",
    "sleeve-gastrectomy",
  ],
  relatedTreatmentSlugs: [RHINO, BLEPH, "breast-lift-in-india", "breast-augmentation-in-india", "mommy-makeover-in-india", "breast-reduction-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 30,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Liposuction in India",
      shortDescription:
        "Liposuction in India contours localized subcutaneous fat — not obesity treatment — with named partner planning of $1,500–$4,200.",
      editorialBody: body,
      process: [
        {
          id: "lipo-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides area photographs, a weight history and any previous body-contouring or bariatric notes.",
        },
        {
          id: "lipo-step-2",
          title: "Virtual consultation",
          description:
            "A plastic surgeon reviews whether mapped liposuction, skin excision or obesity treatment is the honest brief.",
        },
        {
          id: "lipo-step-3",
          title: "Confirm the mapped areas",
          description:
            "The team writes which zones are included and whether tummy tuck, fat transfer, gynecomastia or BBL belongs on a separate quote.",
        },
        {
          id: "lipo-step-4",
          title: "Itemized estimate",
          description:
            "Named liposuction is $1,500–$4,200. Combined excision, large-volume work and neighbouring lists are quoted after review.",
        },
        {
          id: "lipo-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Breathlessness, chest pain or one-sided leg swelling is a local emergency.",
        },
        {
          id: "lipo-step-6",
          title: "In-person examination",
          description:
            "The surgeon maps fat, skin quality and clot risk after arrival and confirms the final plan.",
        },
        {
          id: "lipo-step-7",
          title: "Liposuction",
          description:
            "Tumescent fluid and a cannula are used to remove selected subcutaneous fat from the mapped areas.",
        },
        {
          id: "lipo-step-8",
          title: "Compression and early review",
          description:
            "A compression garment is commonly applied. GAF stay planning is typically day-care to 2 nights.",
        },
        {
          id: "lipo-step-9",
          title: "Return home",
          description:
            "The patient leaves with garment instructions, warning signs and a plan for remote follow-up after clearance to travel.",
        },
      ],
      preparation:
        "Share mapped-area photographs, a weight history and previous contouring notes so the surgeon can judge liposuction versus tummy tuck versus obesity treatment.",
      recovery:
        "Soreness, bruising and swelling are common. Light walking is encouraged early; strenuous activity is cleared later. Final contour settles over weeks to months.",
      hospitalStay: "Day-care to 2 nights",
      recoveryPeriod:
        "Days to a few weeks for lighter activity. Final contour may continue refining for several months.",
      followUp:
        "Request a written summary covering mapped areas, garment protocol, clot warning signs and remote review after returning home.",
      importantConsiderations:
        "Liposuction is not obesity treatment, does not remove visceral fat and does not reliably treat cellulite or large skin excess. Breathlessness, chest pain or one-sided leg swelling belongs in a local emergency department.",
      treatmentType: "Liposuction",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Tumescent, power-assisted or energy-assisted cannula removal of mapped subcutaneous fat",
      searchKeywords: [
        "liposuction in India",
        "liposuction cost in India",
        "body contouring India",
        "tumescent liposuction",
        "abdomen liposuction India",
        "liposuction vs tummy tuck",
        "liposuction recovery",
        "lipoplasty India",
      ],
      faqs: [
        {
          id: "lipo-faq-1",
          question: "How much does liposuction cost in India?",
          answer:
            "Named GAF partner planning is $1,500–$4,200, typically day-care to 2 nights. Combined excision, large-volume work and neighbouring BBL or tummy-tuck lists are quoted separately.",
        },
        {
          id: "lipo-faq-2",
          question: "Is liposuction a weight-loss procedure?",
          answer:
            "No. It is body contouring for localized subcutaneous fat, not a substitute for obesity treatment, diet or exercise.",
        },
        {
          id: "lipo-faq-3",
          question: "Does liposuction remove visceral fat?",
          answer: "No. Liposuction targets subcutaneous fat beneath the skin, not fat around internal organs.",
        },
        {
          id: "lipo-faq-4",
          question: "Is liposuction the same as a tummy tuck?",
          answer:
            "No. Liposuction removes fat through small incisions. A tummy tuck removes excess skin and may tighten the abdominal wall.",
        },
        {
          id: "lipo-faq-5",
          question: "How long is the hospital stay after liposuction?",
          answer: "GAF planning is typically day-care to 2 nights.",
        },
        {
          id: "lipo-faq-6",
          question: "When will I see the final result?",
          answer:
            "Early swelling can hide contour. Final refinement may continue for several weeks or months.",
        },
        {
          id: "lipo-faq-7",
          question: "Does liposuction treat cellulite?",
          answer: "No. Liposuction should not be considered a reliable cellulite treatment.",
        },
        {
          id: "lipo-faq-8",
          question: "Can international patients have liposuction in India?",
          answer:
            "Yes. Photographs and a weight history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "lipo-faq-9",
          question: "Which city in India is best for liposuction?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic surgeon who already maps the areas you need.",
        },
        {
          id: "lipo-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Breathlessness, chest pain, fainting, one-sided leg swelling, fever, severe pain or rapidly increasing swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "lipo-faq-11",
          question: "Does a Brazilian butt lift use the liposuction price?",
          answer:
            "No. Named BBL is $3,500–$8,000 and must not be used as a liposuction quotation.",
        },
        {
          id: "lipo-faq-12",
          question: "Can large-volume liposuction use the standard sheet?",
          answer:
            "Not automatically. Larger-volume and combined excision cases are quoted after records review.",
        },
        {
          id: "lipo-faq-13",
          question: "Does sleeve gastrectomy use the liposuction sheet?",
          answer:
            "No. Neighbouring sleeve gastrectomy is $4,500–$8,500 when obesity treatment, not contouring, is the product.",
        },
        {
          id: "lipo-faq-14",
          question: "Will I need a compression garment?",
          answer:
            "Usually yes. The named sheet includes only the specified first garment and size when listed; replacements are often separate.",
        },
      ],
      imageAlt:
        "Educational illustration of a torso fat-layer profile used as the liposuction treatment hero",
      seoTitle: "Liposuction in India: Cost, Areas & Recovery",
      metaDescription:
        "Learn about liposuction in India, including mapped treatment areas, $1,500–$4,200 partner planning, recovery, tummy-tuck differences and how GAF coordinates treatment.",
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

linkRelated(RHINO, RHINO_NEEDLE, RHINO_ADDITION);
linkRelated(BLEPH, BLEPH_NEEDLE, BLEPH_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [blepharoplasty in India](https://gaf.healthcare/treatments/blepharoplasty-in-india).",
    ", [blepharoplasty in India](https://gaf.healthcare/treatments/blepharoplasty-in-india) and [liposuction in India](https://gaf.healthcare/treatments/liposuction-in-india).",
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

patchMarkdown(resolve("scripts/rhinoplasty-treatment-body.md"), RHINO_NEEDLE, RHINO_ADDITION);
patchMarkdown(resolve("scripts/blepharoplasty-treatment-body.md"), BLEPH_NEEDLE, BLEPH_ADDITION);
