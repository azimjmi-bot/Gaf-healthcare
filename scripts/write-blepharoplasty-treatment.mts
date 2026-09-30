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

const body = readFileSync(resolve("scripts/blepharoplasty-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "blepharoplasty-in-india");
const now = "2026-09-29T11:00:00.000Z";
const SLUG = "blepharoplasty-in-india";
const RHINO = "rhinoplasty-in-india";
const RHINO_NEEDLE =
  "- [Blepharoplasty](/costs/India/Cosmetic-Surgery/Blepharoplasty) — **$1,500–$3,800**, day-care or overnight";
const RHINO_REPLACEMENT =
  "- [Blepharoplasty in India](/treatments/blepharoplasty-in-india) — named lists sit on [blepharoplasty](/costs/India/Cosmetic-Surgery/Blepharoplasty) at **$1,500–$3,800**, day-care or overnight";

const treatment = {
  id: existing?.id ?? "d5f9c3b2-8e76-50a1-9d4b-2f0a7c1e6b39",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Blepharoplasty in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Oculoplastic Surgery",
  category: "Blepharoplasty",
  image: "/uploads/treatments/blepharoplasty-hero.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-nooreyezdan-shahin",
    "dr-anita-sethi",
    "dr-hemang-sanghvi",
    "dr-kiran-naik",
    "dr-krishna-shama-rao",
    "dr-chepauk-ramesh",
    "dr-e-ravindra-mohan",
    "dr-maj-nirjhar-ghosh",
    "dr-vinay-r",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "max-super-speciality-hospital-saket",
    "wockhardt-hospital",
    "gleneagles-hospital-mumbai",
    "gleneagles-hospitals-bengaluru",
    "apollo-hospital-chennai",
    "gleneagles-healthcity-chennai",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "blepharoplasty",
    "rhinoplasty",
    "facelift",
    "otoplasty",
    "neck-lift",
    "fat-transfer",
    "oculoplastic-surgery",
    "eyelid-reconstruction-surgery",
  ],
  relatedTreatmentSlugs: [RHINO],
  status: "published" as const,
  featured: true,
  sortOrder: 29,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Blepharoplasty in India",
      shortDescription:
        "Blepharoplasty in India reshapes the upper or lower eyelids for contour or visual field, with named partner planning of $1,500–$3,800.",
      editorialBody: body,
      process: [
        {
          id: "bleph-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides eyelid photographs, a dry-eye and vision history, and any previous eyelid or eye surgery notes.",
        },
        {
          id: "bleph-step-2",
          title: "Virtual consultation",
          description:
            "A plastic, facial plastic or oculoplastic surgeon reviews whether an in-person assessment is appropriate.",
        },
        {
          id: "bleph-step-3",
          title: "Confirm the plan",
          description:
            "The team writes whether the brief is upper, lower or combined eyelids, and whether brow or ptosis work belongs on a separate quote.",
        },
        {
          id: "bleph-step-4",
          title: "Itemized estimate",
          description:
            "Named blepharoplasty is $1,500–$3,800. Reconstruction, ptosis repair and brow lift are quoted after review rather than bundled as a brochure eyelid price.",
        },
        {
          id: "bleph-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Severe eye pain, sudden vision change or rapidly increasing swelling is a local emergency.",
        },
        {
          id: "bleph-step-6",
          title: "In-person examination",
          description:
            "The surgeon examines the lids, brow, ocular surface and eyelid position after arrival and confirms the final plan.",
        },
        {
          id: "bleph-step-7",
          title: "Blepharoplasty",
          description:
            "Upper crease, lower lash-line or transconjunctival access is used to treat selected skin, muscle or fat.",
        },
        {
          id: "bleph-step-8",
          title: "Early review",
          description:
            "Vision, lid closure, swelling and wounds are checked. GAF stay planning is typically day-care or overnight.",
        },
        {
          id: "bleph-step-9",
          title: "Return home",
          description:
            "The patient leaves with lubrication advice, warning signs and a plan for remote follow-up after clearance to travel.",
        },
      ],
      preparation:
        "Share eyelid photographs, a dry-eye history and previous eye or eyelid operative notes so the surgeon can judge upper versus lower access and whether ptosis or brow work is a separate brief.",
      recovery:
        "Swelling and bruising are common early. Many patients are more presentable around 10–14 days, while contour continues to settle for weeks to months.",
      hospitalStay: "Day-care or overnight",
      recoveryPeriod:
        "Often 10–14 days before many patients are publicly presentable; strenuous activity is cleared later. Final healing may take several months.",
      followUp:
        "Request a written summary covering which lids were treated, lubrication, suture timing, warning signs and remote review after returning home.",
      importantConsiderations:
        "Blepharoplasty cannot guarantee symmetry or treat true ptosis, brow descent or pigmented dark circles unless those are separately assessed. Severe eye pain or sudden vision change belongs in a local emergency department.",
      treatmentType: "Blepharoplasty",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Upper-crease, transconjunctival or transcutaneous eyelid surgery with selected fat preservation or repositioning",
      searchKeywords: [
        "blepharoplasty in India",
        "eyelid surgery India",
        "upper blepharoplasty cost",
        "lower blepharoplasty India",
        "eyelid bags surgery India",
        "functional blepharoplasty",
        "oculoplastic surgery India",
        "eye lift cost in India",
      ],
      faqs: [
        {
          id: "bleph-faq-1",
          question: "How much does blepharoplasty cost in India?",
          answer:
            "Named GAF partner planning is $1,500–$3,800, typically day-care or overnight. Combined brow, ptosis or reconstructive work is quoted after records review.",
        },
        {
          id: "bleph-faq-2",
          question: "Is blepharoplasty the same as an eye lift?",
          answer: "Eye lift is a common informal term for blepharoplasty, which is eyelid surgery on the upper lids, lower lids or both.",
        },
        {
          id: "bleph-faq-3",
          question: "Can blepharoplasty improve vision?",
          answer:
            "It can when excess upper-eyelid skin obstructs the visual field. It does not treat refractive error, optic-nerve disease or other causes of reduced vision.",
        },
        {
          id: "bleph-faq-4",
          question: "Is upper blepharoplasty the same as lower blepharoplasty?",
          answer:
            "No. Upper surgery usually uses a crease incision. Lower surgery may use a subciliary or transconjunctival approach and needs careful lid-support planning.",
        },
        {
          id: "bleph-faq-5",
          question: "How long is the hospital stay after blepharoplasty?",
          answer: "GAF planning is typically day-care or overnight.",
        },
        {
          id: "bleph-faq-6",
          question: "When will I look presentable?",
          answer:
            "Many patients are more presentable around 10–14 days. Final healing can take several months.",
        },
        {
          id: "bleph-faq-7",
          question: "Can blepharoplasty be combined with ptosis surgery?",
          answer:
            "Yes, when true eyelid droop is present. There is no separate GAF ptosis sheet; that work is quoted after review.",
        },
        {
          id: "bleph-faq-8",
          question: "Can international patients have blepharoplasty in India?",
          answer:
            "Yes. Photographs and a dry-eye history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "bleph-faq-9",
          question: "Which city in India is best for blepharoplasty?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic, facial plastic or oculoplastic surgeon who already operates that anatomy.",
        },
        {
          id: "bleph-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Severe eye pain, sudden vision change, significant bleeding or rapidly increasing swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "bleph-faq-11",
          question: "Does eyelid reconstruction use the blepharoplasty price?",
          answer:
            "No. Named eyelid reconstruction is $1,500–$5,000 and must not be used as a cosmetic blepharoplasty quotation.",
        },
        {
          id: "bleph-faq-12",
          question: "Can revision blepharoplasty use the primary sheet?",
          answer:
            "Not by default. Revision after previous eyelid surgery is quoted after records review.",
        },
        {
          id: "bleph-faq-13",
          question: "Will there be a visible scar?",
          answer:
            "Upper-eyelid incisions are generally placed in the natural crease. Lower-eyelid scars depend on whether a transconjunctival or external approach is used.",
        },
        {
          id: "bleph-faq-14",
          question: "Does oculoplastic surgery use the blepharoplasty sheet?",
          answer:
            "Not automatically. Neighbouring oculoplastic surgery is $1,200–$4,000 when the brief is already more than listed cosmetic eyelid contouring.",
        },
      ],
      imageAlt:
        "Educational illustration of an eyelid profile used as the blepharoplasty treatment hero",
      seoTitle: "Blepharoplasty in India: Cost, Types & Recovery",
      metaDescription:
        "Learn about blepharoplasty in India, including upper versus lower eyelid surgery, $1,500–$3,800 partner planning, recovery, vision and how GAF coordinates treatment.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

function linkRelated(slug: string, needle: string, replacement: string) {
  const row = store.treatments.find((item) => item.slug === slug);
  if (!row) return;
  const related = new Set(row.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  row.relatedTreatmentSlugs = [...related];
  const editorial = row.translations?.en?.editorialBody ?? "";
  if (editorial && !editorial.includes(`/treatments/${SLUG}`) && editorial.includes(needle)) {
    row.translations!.en!.editorialBody = editorial.replace(needle, replacement);
  }
}

linkRelated(RHINO, RHINO_NEEDLE, RHINO_REPLACEMENT);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [rhinoplasty in India](https://gaf.healthcare/treatments/rhinoplasty-in-india).",
    ", [rhinoplasty in India](https://gaf.healthcare/treatments/rhinoplasty-in-india) and [blepharoplasty in India](https://gaf.healthcare/treatments/blepharoplasty-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, replacement: string) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, replacement));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/rhinoplasty-treatment-body.md"), RHINO_NEEDLE, RHINO_REPLACEMENT);
