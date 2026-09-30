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

const body = readFileSync(resolve("scripts/breast-reconstruction-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "breast-reconstruction-in-india");
const now = "2026-09-29T12:30:00.000Z";
const SLUG = "breast-reconstruction-in-india";
const CANCER = "breast-cancer-treatment-in-india";
const LIFT = "breast-lift-in-india";
const CANCER_NEEDLE =
  "[Discuss reconstruction timing with a coordinator](/consult?treatment=Breast%20Reconstruction)";
const CANCER_ADDITION =
  "\n\nThe full reconstructive pathway sits on [Breast Reconstruction Surgery in India](/treatments/breast-reconstruction-in-india).";
const LIFT_NEEDLE =
  "Implant lists add volume. Reduction lists remove weight. They are not a substitute mastopexy price.";
const LIFT_ADDITION =
  " Reconstructive lists sit on [Breast Reconstruction Surgery in India](/treatments/breast-reconstruction-in-india).";

const treatment = {
  id: existing?.id ?? "b9d3a7f6-2c10-94e5-38f6-6d4e1a5c0f73",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Breast Reconstruction Surgery in India",
  specialtySlug: "surgical-oncology",
  subspecialty: "Reconstructive Breast Surgery",
  category: "Breast Reconstruction",
  image: "/uploads/treatments/breast-recon-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ananya-deori",
    "dr-soumya-khanna",
    "dr-charudatta-chaudhari",
    "dr-tushar-jadhav",
    "dr-naveen-rao",
    "dr-pradeep-y-v",
    "dr-s-narayanamurthy",
    "dr-chepauk-ramesh",
    "dr-srinivas-s-jammula",
    "dr-sasikanth-maddu",
  ],
  hospitalSlugs: [
    "medanta-gurgaon",
    "apollo-delhi",
    "apollo-athenaa-women-s-cancer-centre",
    "apollo-hospitals-navi-mumbai",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "yashoda-hospitals-secunderabad",
    "yashoda-hospitals-somajiguda",
  ],
  costPageSlugs: [
    "breast-reconstruction",
    "mastectomy",
    "nipple-sparing-mastectomy",
    "oncoplastic-breast-surgery",
    "breast-conserving-surgery-lumpectomy",
    "sentinel-lymph-node-biopsy",
    "microvascular-free-flap-reconstruction",
    "fat-transfer",
    "breast-lift",
    "chemotherapy",
  ],
  relatedTreatmentSlugs: [CANCER, LIFT],
  status: "published" as const,
  featured: true,
  sortOrder: 32,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Breast Reconstruction Surgery in India",
      shortDescription:
        "Breast reconstruction in India restores breast form after mastectomy — implant or autologous flap — with named partner planning of $6,000–$18,000.",
      editorialBody: body,
      process: [
        {
          id: "recon-step-1",
          title: "Share pathology and imaging",
          description:
            "The patient provides biopsy, histopathology, imaging, operative notes and any chemotherapy or radiation records.",
        },
        {
          id: "recon-step-2",
          title: "Oncology and reconstructive review",
          description:
            "A breast cancer team and a reconstructive plastic surgeon review whether implant, expander, DIEP or delayed work is the honest brief.",
        },
        {
          id: "recon-step-3",
          title: "Confirm timing and technique",
          description:
            "The team writes immediate versus delayed timing and whether mastectomy, radiation or second-stage work belongs on a separate quote.",
        },
        {
          id: "recon-step-4",
          title: "Itemized estimate",
          description:
            "Named breast reconstruction is $6,000–$18,000. Combined mastectomy, DIEP complexity and revision lists are quoted after review.",
        },
        {
          id: "recon-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Flap colour change, fever, wound opening or breathlessness is a local emergency.",
        },
        {
          id: "recon-step-6",
          title: "In-person examination",
          description:
            "The reconstructive surgeon assesses skin, donor tissue and radiation effects after arrival and confirms the final plan.",
        },
        {
          id: "recon-step-7",
          title: "Reconstruction",
          description:
            "An implant, expander or autologous flap is used to recreate the breast mound, with microsurgery when a free flap is planned.",
        },
        {
          id: "recon-step-8",
          title: "Monitoring and early review",
          description:
            "Flap perfusion or implant coverage is watched closely. GAF stay planning is typically 4–8 nights.",
        },
        {
          id: "recon-step-9",
          title: "Return home",
          description:
            "The patient leaves with wound-care instructions, warning signs and a plan for remote follow-up after clearance to travel.",
        },
      ],
      preparation:
        "Share pathology, imaging, mastectomy notes and radiation plans so the team can judge implant versus autologous reconstruction and immediate versus delayed timing.",
      recovery:
        "Pain, tightness, swelling and reduced shoulder movement are common. Free-flap recovery is usually longer than uncomplicated implant work. Final contour may need later stages.",
      hospitalStay: "4–8 nights",
      recoveryPeriod:
        "Weeks for lighter activity after implant work. Free-flap recovery and later nipple or fat-graft stages continue for months.",
      followUp:
        "Request a written summary covering technique, implant or flap details, warning signs and remote review after returning home.",
      importantConsiderations:
        "Reconstruction does not treat cancer. Combined mastectomy is a neighbouring sheet unless both are itemized. Sudden flap colour change, fever, wound opening, implant exposure, breathlessness or calf swelling belongs in a local emergency department.",
      treatmentType: "Breast Reconstruction",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Implant, tissue expander or autologous flap reconstruction including DIEP, TRAM and latissimus dorsi techniques",
      searchKeywords: [
        "breast reconstruction surgery in India",
        "breast reconstruction cost in India",
        "DIEP flap reconstruction in India",
        "implant breast reconstruction in India",
        "autologous breast reconstruction in India",
        "immediate breast reconstruction",
        "delayed breast reconstruction",
        "breast reconstruction after mastectomy",
      ],
      faqs: [
        {
          id: "recon-faq-1",
          question: "How much does breast reconstruction cost in India?",
          answer:
            "Named GAF partner planning is $6,000–$18,000, typically 4–8 nights. Implant, DIEP and staged lists should not be treated as one price.",
        },
        {
          id: "recon-faq-2",
          question: "Does reconstruction treat cancer?",
          answer:
            "No. Reconstruction restores breast form. Cancer treatment remains the priority and sits on the breast cancer pathway.",
        },
        {
          id: "recon-faq-3",
          question: "Can reconstruction be done immediately after mastectomy?",
          answer:
            "Yes, in selected patients. Immediate reconstruction begins during the same operation as mastectomy when oncology and anatomy allow it.",
        },
        {
          id: "recon-faq-4",
          question: "Can reconstruction be done years after mastectomy?",
          answer: "Yes. Delayed reconstruction can be performed months or even years later.",
        },
        {
          id: "recon-faq-5",
          question: "How long is the hospital stay?",
          answer:
            "GAF planning is typically 4–8 nights. Complex free-flap work may need the longer end of that range.",
        },
        {
          id: "recon-faq-6",
          question: "Is a DIEP flap the same as the reconstruction sheet?",
          answer:
            "Named DIEP work is quoted from the breast reconstruction sheet after review. Neighbouring microvascular free-flap reconstruction is a different product.",
        },
        {
          id: "recon-faq-7",
          question: "Is reconstruction included in the mastectomy price?",
          answer:
            "Not automatically. Neighbouring mastectomy is $4,500–$10,000 and must be itemized separately unless the quotation says otherwise.",
        },
        {
          id: "recon-faq-8",
          question: "Can international patients have reconstruction in India?",
          answer:
            "Yes. Pathology, imaging and operative notes should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "recon-faq-9",
          question: "Which city in India is best for breast reconstruction?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named team that already performs the technique you need.",
        },
        {
          id: "recon-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Sudden flap colour change, fever, wound opening, implant exposure, breathlessness or calf swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "recon-faq-11",
          question: "Can reconstruction be done after radiation?",
          answer:
            "Yes, but radiation can change timing, technique and complication risk. Some patients are better served by delayed autologous work.",
        },
        {
          id: "recon-faq-12",
          question: "Does oncoplastic surgery use the reconstruction sheet?",
          answer:
            "No. Neighbouring oncoplastic breast surgery is $4,500–$11,000 when conservation plus reshaping, not post-mastectomy reconstruction, is the product.",
        },
        {
          id: "recon-faq-13",
          question: "Does a cosmetic breast lift use the reconstruction sheet?",
          answer:
            "No. Neighbouring breast lift is $3,000–$6,500 when ptosis, not reconstruction after mastectomy, is the product.",
        },
        {
          id: "recon-faq-14",
          question: "Is nipple reconstruction included?",
          answer:
            "Usually as a later stage. Confirm in writing whether nipple reconstruction or areola tattooing is in the primary quotation.",
        },
      ],
      imageAlt:
        "Educational illustration of overlapping geometric shapes used as the breast-reconstruction treatment hero",
      seoTitle: "Breast Reconstruction Surgery in India: Cost, Types & Timing",
      metaDescription:
        "Learn about breast reconstruction surgery in India, including implant, DIEP and flap reconstruction, $6,000–$18,000 partner planning, recovery, risks and timing after mastectomy.",
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

linkRelated(CANCER, CANCER_NEEDLE, CANCER_ADDITION);
linkRelated(LIFT, LIFT_NEEDLE, LIFT_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [breast lift in India](https://gaf.healthcare/treatments/breast-lift-in-india).",
    ", [breast lift in India](https://gaf.healthcare/treatments/breast-lift-in-india) and [breast reconstruction surgery in India](https://gaf.healthcare/treatments/breast-reconstruction-in-india).",
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

patchMarkdown(resolve("content/treatments/breast-cancer-treatment-in-india.md"), CANCER_NEEDLE, CANCER_ADDITION);
patchMarkdown(resolve("scripts/breast-lift-treatment-body.md"), LIFT_NEEDLE, LIFT_ADDITION);
