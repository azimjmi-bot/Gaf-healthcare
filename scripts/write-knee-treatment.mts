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

const body = readFileSync(resolve("scripts/knee-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "knee-replacement-surgery-in-india");
const now = "2026-09-29T01:00:00.000Z";
const SLUG = "knee-replacement-surgery-in-india";
const BLOG = "/blogs/knee-replacement-surgery-in-india";

const treatment = {
  id: existing?.id ?? "c4e8a1b2-7d39-4f16-9c80-2b5e6a9d3f71",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Knee Replacement Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Joint Replacement",
  category: "Knee Replacement",
  image: "/uploads/treatments/knee-oa-anatomy.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-ramneek-mahajan",
    "dr-siddhart-yadav",
    "dr-manish-samson",
    "dr-kesavan-a-r",
    "dr-venudhara-kum-mohan-reddy",
    "dr-sanjay-pai",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "medanta-gurgaon",
    "artemis-hospital",
    "max-super-speciality-hospital-saket",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-hospital-jubilee-hills-hyderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "total-knee-replacement",
    "robotic-knee-replacement",
    "partial-knee-replacement",
    "revision-knee-replacement",
    "total-hip-replacement",
    "revision-hip-replacement",
    "acl-reconstruction-anterior-cruciate-ligament",
    "meniscus-repair",
  ],
  relatedTreatmentSlugs: [],
  status: "published" as const,
  featured: true,
  sortOrder: 9,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Knee Replacement Surgery in India",
      shortDescription:
        "Knee replacement in India is planned from X-rays, ligaments and activity goals — total, partial, revision or robotic-assisted arthroplasty — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "knee-step-1",
          title: "Share medical records",
          description:
            "The patient provides standing knee X-rays, symptom history, medicines, and any MRI, cardiac or previous surgical reports.",
        },
        {
          id: "knee-step-2",
          title: "Orthopaedic review",
          description:
            "A joint-replacement surgeon reviews compartments, deformity, ligament stability and whether replacement is actually indicated.",
        },
        {
          id: "knee-step-3",
          title: "Procedure selection",
          description:
            "The team decides total, partial, revision or robotic-assisted replacement, and simultaneous versus staged surgery if both knees are involved.",
        },
        {
          id: "knee-step-4",
          title: "Medical optimisation",
          description:
            "Blood tests, cardiac clearance, diabetes control and infection screening are completed before an elective implant.",
        },
        {
          id: "knee-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes implant, stay, physiotherapy and technology from GAF cost sheets — not a brochure package.",
        },
        {
          id: "knee-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, inpatient physiotherapy and travel clearance.",
        },
        {
          id: "knee-step-7",
          title: "Surgery",
          description:
            "The planned knee replacement is performed under the treating surgeon and anaesthesia team.",
        },
        {
          id: "knee-step-8",
          title: "Early mobilisation",
          description:
            "Physiotherapy begins in hospital. Many patients start assisted walking soon after surgery.",
        },
        {
          id: "knee-step-9",
          title: "Rehabilitation",
          description:
            "Range-of-motion and strengthening work continues after discharge until the team clears travel.",
        },
        {
          id: "knee-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the implant, physiotherapy plan and how follow-up should continue at home.",
        },
      ],
      preparation:
        "Share standing X-rays, medication list, diabetes or cardiac history and previous knee surgery notes before travel so the orthopaedic team can judge total versus partial replacement and issue an itemized estimate.",
      recovery:
        "GAF planning notes typically 4–7 nights after total knee replacement. Functional recovery continues over several weeks; full recovery can take several months.",
      hospitalStay: "Typically 4–7 nights after total knee replacement; 3–5 nights after partial; 5–10 nights after revision",
      recoveryPeriod:
        "Several weeks for independent walking; several months for full recovery. International patients should not book an early fixed return flight.",
      followUp:
        "Request a written summary covering the implant, surgical approach, physiotherapy protocol, anticoagulation and the imaging schedule after returning home.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. Robotic assistance is not automatically better for every knee. Emergency chest pain, calf swelling or fever with wound drainage belongs in a local emergency department.",
      treatmentType: "Joint replacement",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Conventional, computer-assisted or robotic-assisted total, partial and revision knee replacement with named implants after films",
      searchKeywords: [
        "knee replacement surgery in India",
        "knee replacement cost in India",
        "total knee replacement in India",
        "robotic knee replacement in India",
        "partial knee replacement in India",
        "knee replacement hospitals in India",
        "knee replacement for international patients",
        "knee arthroplasty in India",
      ],
      faqs: [
        {
          id: "knee-faq-1",
          question: "How much does knee replacement cost in India?",
          answer:
            "GAF planning ranges for one knee are approximately $5,500–$12,000 for total knee replacement, $4,500–$10,000 for partial replacement, $7,000–$15,000 for robotic-assisted replacement and $9,000–$18,000 for revision. The actual quotation depends on the hospital, surgeon, implant, city, room category, surgical technique and medical complexity.",
        },
        {
          id: "knee-faq-2",
          question: "What is the cost of bilateral knee replacement in India?",
          answer:
            "Both-knee replacement is quoted after case review. Planning starts from the total-knee sheet of $5,500–$12,000 per knee. Simultaneous versus staged surgery changes anaesthesia, stay and implant counts, so two knees are not automatically double a single-knee package.",
        },
        {
          id: "knee-faq-3",
          question: "How long does knee replacement surgery take?",
          answer: "The operation commonly takes around 1–2 hours, although the overall hospital process takes longer.",
        },
        {
          id: "knee-faq-4",
          question: "How long do I stay in hospital after knee replacement?",
          answer:
            "GAF planning notes typically 4–7 nights after total knee replacement, 3–5 nights after partial replacement and 5–10 nights after revision. Some enhanced-recovery protocols discharge sooner. The treating team decides.",
        },
        {
          id: "knee-faq-5",
          question: "When can I walk after knee replacement?",
          answer:
            "Many patients begin assisted walking soon after surgery under physiotherapy supervision.",
        },
        {
          id: "knee-faq-6",
          question: "How long does recovery take?",
          answer:
            "Initial functional recovery occurs over several weeks, but full recovery can take several months or longer.",
        },
        {
          id: "knee-faq-7",
          question: "How long does a knee replacement last?",
          answer:
            "Many modern knee replacements can last around 15–25 years or longer, depending on patient and implant factors. NHS guidance states that knee replacements can last around 25 years. Individual implant survival varies.",
        },
        {
          id: "knee-faq-8",
          question: "Is robotic knee replacement better?",
          answer:
            "Robotic assistance can help with planning and surgical execution, but it is not automatically better for every patient. The appropriate technology depends on the individual's condition and the surgeon's assessment. GAF planning for robotic-assisted knee replacement is $7,000–$15,000.",
        },
        {
          id: "knee-faq-9",
          question: "Is knee replacement safe for elderly patients?",
          answer:
            "Age alone does not determine suitability. Overall health, heart and lung function, medications, mobility, frailty and other medical conditions must be assessed.",
        },
        {
          id: "knee-faq-10",
          question: "Can a diabetic patient undergo knee replacement?",
          answer:
            "Yes, many diabetic patients undergo knee replacement, but blood sugar should be appropriately managed and the patient's overall medical condition evaluated.",
        },
        {
          id: "knee-faq-11",
          question: "Can obese patients undergo knee replacement?",
          answer:
            "Yes, but obesity can influence surgical risk and recovery. Weight optimisation may be recommended depending on the individual case.",
        },
        {
          id: "knee-faq-12",
          question: "Can I fly after knee replacement?",
          answer:
            "Travel timing should be decided by the treating medical team. Long-haul travel soon after major surgery requires particular consideration because of blood-clot risk. Sudden chest pain, breathlessness or a swollen painful calf after travel is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "knee-faq-13",
          question: "Is partial knee replacement better than total knee replacement?",
          answer:
            "Neither is universally better. Partial replacement may be appropriate for selected patients with disease limited to a specific compartment, while total replacement is used when the damage is more extensive.",
        },
        {
          id: "knee-faq-14",
          question: "Is physiotherapy necessary after knee replacement?",
          answer:
            "Yes. Rehabilitation is an important part of achieving strength, movement and functional recovery.",
        },
      ],
      imageAlt:
        "Close-up of an osteoarthritic adult knee showing worn cartilage and exposed bone on the femur, tibia and patella",
      seoTitle: "Knee Replacement Surgery in India: Cost, Hospitals & Recovery",
      metaDescription:
        "Explore knee replacement surgery in India, including types, cost, implants, robotic surgery, top hospitals, recovery, risks and treatment options for international patients.",
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
    "and [ovarian cancer treatment in India](https://gaf.healthcare/treatments/ovarian-cancer-treatment-in-india).",
    ", [ovarian cancer treatment in India](https://gaf.healthcare/treatments/ovarian-cancer-treatment-in-india) and [knee replacement surgery in India](https://gaf.healthcare/treatments/knee-replacement-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const cmsPath = resolve("content/cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as {
  articles: Array<{
    slug: string;
    relatedLinks?: Array<{ label: string; href: string }>;
    blocks?: Array<{ type: string; text?: string }>;
  }>;
};
const blog = cms.articles.find((row) => row.slug === SLUG);
if (blog) {
  const pillar = `/treatments/${SLUG}`;
  if (!blog.relatedLinks?.some((link) => link.href === pillar)) {
    blog.relatedLinks = [
      { label: "Knee replacement surgery in India — treatment pathway", href: pillar },
      ...(blog.relatedLinks ?? []),
    ];
  }
  const intro = blog.blocks?.find(
    (block) =>
      block.type === "paragraph" &&
      block.text?.includes("**Knee replacement surgery in India** is an established treatment"),
  );
  if (intro?.text && !intro.text.includes(pillar)) {
    intro.text += ` The coordinated care pathway is published as [Knee Replacement Surgery in India](${pillar}).`;
  }
  writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
  console.log("linked treatment from knee blog");
}

const blogWriterPath = resolve("scripts/write-knee-replacement-blog.mjs");
let blogWriter = readFileSync(blogWriterPath, "utf8");
if (!blogWriter.includes("/treatments/knee-replacement-surgery-in-india")) {
  blogWriter = blogWriter.replace(
    'p("**Knee replacement surgery in India** is an established treatment for people with severe knee arthritis, advanced joint damage, deformity, or persistent knee pain that no longer improves adequately with non-surgical treatment."),',
    'p("**Knee replacement surgery in India** is an established treatment for people with severe knee arthritis, advanced joint damage, deformity, or persistent knee pain that no longer improves adequately with non-surgical treatment. The coordinated care pathway is published as [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india)."),',
  );
  blogWriter = blogWriter.replace(
    "relatedLinks: [",
    `relatedLinks: [
    { label: "Knee replacement surgery in India — treatment pathway", href: "/treatments/knee-replacement-surgery-in-india" },`,
  );
  writeFileSync(blogWriterPath, blogWriter);
  console.log("updated knee blog writer");
}
