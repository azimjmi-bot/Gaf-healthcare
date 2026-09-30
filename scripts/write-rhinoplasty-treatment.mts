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

const body = readFileSync(resolve("scripts/rhinoplasty-treatment-body.md"), "utf8").trim();
const storePath = resolve("content/curated-treatments.json");
const store = JSON.parse(readFileSync(storePath, "utf8")) as {
  treatments: Array<{
    id: string;
    slug: string;
    createdAt?: string;
  }>;
};
const existing = store.treatments.find((row) => row.slug === "rhinoplasty-in-india");
const now = "2026-09-29T10:30:00.000Z";
const SLUG = "rhinoplasty-in-india";

const treatment = {
  id: existing?.id ?? "c4e8b2a1-7d65-49f0-8c3a-1e9f6b0d5a28",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Rhinoplasty in India",
  specialtySlug: "cosmetic-surgery",
  subspecialty: "Facial Plastic Surgery",
  category: "Rhinoplasty",
  image: "/uploads/treatments/rhinoplasty-anatomy.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-aditya-aggarwal",
    "dr-anup-dhir",
    "dr-charudatta-chaudhari",
    "dr-kiran-naik",
    "dr-naveen-rao",
    "dr-krishna-shama-rao",
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
    "gleneagles-hospitals-bengaluru",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-somajiguda",
  ],
  costPageSlugs: [
    "rhinoplasty",
    "septoplasty",
    "facelift",
    "blepharoplasty",
    "otoplasty",
    "neck-lift",
    "fess-functional-endoscopic-sinus-surgery",
    "balloon-sinuplasty",
  ],
  relatedTreatmentSlugs: [],
  status: "published" as const,
  featured: true,
  sortOrder: 28,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Rhinoplasty in India",
      shortDescription:
        "Rhinoplasty in India reshapes or reconstructs the nose for form, breathing or both, with named partner planning of $2,500–$5,500.",
      editorialBody: body,
      process: [
        {
          id: "rhino-step-1",
          title: "Share photographs and history",
          description:
            "The patient provides nose photographs from several angles, a breathing history and any previous nasal surgery or injury notes.",
        },
        {
          id: "rhino-step-2",
          title: "Virtual consultation",
          description:
            "A plastic, facial plastic or ENT surgeon reviews whether an in-person assessment is appropriate.",
        },
        {
          id: "rhino-step-3",
          title: "Confirm the plan",
          description:
            "The team writes whether the brief is primary cosmetic work, functional or septorhinoplasty, revision or reconstruction.",
        },
        {
          id: "rhino-step-4",
          title: "Itemized estimate",
          description:
            "Named rhinoplasty is $2,500–$5,500. Grafts, revision and combined septal work are quoted after review rather than bundled as a brochure nose-job price.",
        },
        {
          id: "rhino-step-5",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. Heavy bleeding, breathing difficulty or rapidly worsening swelling is a local emergency.",
        },
        {
          id: "rhino-step-6",
          title: "In-person examination",
          description:
            "The surgeon examines the external nose and airway after arrival and confirms the final surgical plan.",
        },
        {
          id: "rhino-step-7",
          title: "Rhinoplasty",
          description:
            "Open or closed access is used to reshape bone and cartilage, with grafts when structural support is required.",
        },
        {
          id: "rhino-step-8",
          title: "Splint and early review",
          description:
            "An external splint is often worn for about a week. GAF stay planning is typically 1–3 nights.",
        },
        {
          id: "rhino-step-9",
          title: "Return home",
          description:
            "The patient leaves with wound instructions, warning signs and a plan for remote follow-up after clearance to travel.",
        },
      ],
      preparation:
        "Share standardized photographs, a breathing history and previous nasal operative notes so the surgeon can judge open versus closed access, grafting and whether septoplasty belongs on the same sitting.",
      recovery:
        "A splint is often worn for about a week. Significant early recovery commonly takes 1–2 weeks, while contour continues to settle for months.",
      hospitalStay: "1–3 nights",
      recoveryPeriod:
        "Often 1–2 weeks before routine public-facing work; strenuous activity is cleared later. Final refinement may take a year or longer.",
      followUp:
        "Request a written summary covering the technique used, grafts, splint timing, warning signs and remote review after returning home.",
      importantConsiderations:
        "Rhinoplasty cannot guarantee a celebrity nose or perfect symmetry. Revision, rib or ear grafts and combined septorhinoplasty are quoted after review. Heavy bleeding, breathing difficulty, fever or rapidly worsening swelling belongs in a local emergency department.",
      treatmentType: "Rhinoplasty",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Open or closed nasal reshaping with optional septal correction and cartilage grafting",
      searchKeywords: [
        "rhinoplasty in India",
        "nose job India",
        "nose reshaping surgery India",
        "rhinoplasty cost in India",
        "open vs closed rhinoplasty",
        "septorhinoplasty India",
        "revision rhinoplasty India",
        "functional rhinoplasty India",
      ],
      faqs: [
        {
          id: "rhino-faq-1",
          question: "How much does rhinoplasty cost in India?",
          answer:
            "Named GAF partner planning is $2,500–$5,500, typically 1–3 nights. Revision, grafting and combined septorhinoplasty are quoted after records review.",
        },
        {
          id: "rhino-faq-2",
          question: "Is rhinoplasty the same as a nose job?",
          answer: "Yes. Nose job is a common informal term for rhinoplasty.",
        },
        {
          id: "rhino-faq-3",
          question: "Can rhinoplasty improve breathing?",
          answer:
            "It can when breathing difficulty is caused by structural problems that are treated during surgery, sometimes with septoplasty.",
        },
        {
          id: "rhino-faq-4",
          question: "Is open rhinoplasty better than closed rhinoplasty?",
          answer:
            "Neither is universally better. The approach depends on anatomy and the structural changes required.",
        },
        {
          id: "rhino-faq-5",
          question: "How long is the hospital stay after rhinoplasty?",
          answer:
            "GAF planning is typically 1–3 nights. Some hospital protocols use same-day discharge or overnight observation after selected cases.",
        },
        {
          id: "rhino-faq-6",
          question: "When will the final result be visible?",
          answer:
            "Swelling decreases over months. Final contour may continue refining for about a year or longer.",
        },
        {
          id: "rhino-faq-7",
          question: "Can rhinoplasty be combined with septoplasty?",
          answer:
            "Yes. Combined septorhinoplasty may be appropriate when both external shape and septal obstruction need treatment.",
        },
        {
          id: "rhino-faq-8",
          question: "Can international patients have rhinoplasty in India?",
          answer:
            "Yes. Photographs and a breathing history should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "rhino-faq-9",
          question: "Which city in India is best for rhinoplasty?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose a named plastic, facial plastic or ENT surgeon who already operates that anatomy.",
        },
        {
          id: "rhino-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "Heavy bleeding, severe pain, fever, breathing difficulty, visual symptoms or rapidly worsening swelling belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "rhino-faq-11",
          question: "Does septoplasty use the rhinoplasty price?",
          answer:
            "No. Named septoplasty is $1,500–$3,800 and must not be used as a rhinoplasty quotation.",
        },
        {
          id: "rhino-faq-12",
          question: "Can revision rhinoplasty use the primary sheet?",
          answer:
            "Not by default. Revision, ear or rib grafts and reconstructive cases are quoted after records review.",
        },
        {
          id: "rhino-faq-13",
          question: "Will there be a visible scar?",
          answer:
            "Closed rhinoplasty has no external incision. Open rhinoplasty uses a small columellar incision that is designed to be discreet.",
        },
        {
          id: "rhino-faq-14",
          question: "How long does rhinoplasty take?",
          answer:
            "Many operations take approximately 1.5–3 hours. Complex revision, grafting or combined functional surgery can take longer.",
        },
      ],
      imageAlt:
        "Educational illustration of nasal bone, cartilage, septum and airway structures relevant to rhinoplasty",
      seoTitle: "Rhinoplasty in India: Cost, Recovery & Types",
      metaDescription:
        "Learn about rhinoplasty in India, including open versus closed techniques, $2,500–$5,500 partner planning, recovery, breathing and how GAF coordinates treatment.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [aortic balloon valvuloplasty in India](https://gaf.healthcare/treatments/aortic-balloon-valvuloplasty-in-india).",
    ", [aortic balloon valvuloplasty in India](https://gaf.healthcare/treatments/aortic-balloon-valvuloplasty-in-india) and [rhinoplasty in India](https://gaf.healthcare/treatments/rhinoplasty-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
