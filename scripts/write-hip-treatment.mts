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

const body = readFileSync(resolve("scripts/hip-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "hip-replacement-surgery-in-india");
const now = "2026-09-29T01:30:00.000Z";
const SLUG = "hip-replacement-surgery-in-india";
const KNEE = "knee-replacement-surgery-in-india";

const treatment = {
  id: existing?.id ?? "e9b6c2d4-1a78-4f05-8c3e-7d2a91b4f608",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Hip Replacement Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Joint Replacement",
  category: "Hip Replacement",
  image: "/uploads/treatments/hip-oa-anatomy.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-ramneek-mahajan",
    "dr-s-k-s-marya",
    "dr-siddhart-yadav",
    "dr-manish-samson",
    "dr-kesavan-a-r",
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
    "total-hip-replacement",
    "revision-hip-replacement",
    "hip-resurfacing",
    "total-knee-replacement",
    "robotic-knee-replacement",
    "partial-knee-replacement",
    "revision-knee-replacement",
  ],
  relatedTreatmentSlugs: [KNEE, "acl-surgery-in-india", "hip-arthroscopy-surgery-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 10,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Hip Replacement Surgery in India",
      shortDescription:
        "Hip replacement in India is planned from pelvis X-rays, bone stock and activity goals — total hip replacement, resurfacing or revision — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "hip-step-1",
          title: "Share medical records",
          description:
            "The patient provides hip X-rays, symptom history, medicines, and any MRI, CT, cardiac or previous surgical reports.",
        },
        {
          id: "hip-step-2",
          title: "Orthopaedic review",
          description:
            "A joint-replacement surgeon reviews osteoarthritis, avascular necrosis, dysplasia or fracture and whether replacement is actually indicated.",
        },
        {
          id: "hip-step-3",
          title: "Procedure selection",
          description:
            "The team decides total hip replacement, hip resurfacing, partial replacement or revision, and simultaneous versus staged surgery if both hips are involved.",
        },
        {
          id: "hip-step-4",
          title: "Medical optimisation",
          description:
            "Blood tests, cardiac clearance, diabetes control and infection screening are completed before an elective implant.",
        },
        {
          id: "hip-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes implant, stay, physiotherapy and any robotic assistance from GAF cost sheets — not a brochure package.",
        },
        {
          id: "hip-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, inpatient physiotherapy and travel clearance.",
        },
        {
          id: "hip-step-7",
          title: "Surgery",
          description:
            "The planned hip replacement is performed under the treating surgeon and anaesthesia team.",
        },
        {
          id: "hip-step-8",
          title: "Early mobilisation",
          description:
            "Physiotherapy begins in hospital. Many patients start assisted walking soon after surgery.",
        },
        {
          id: "hip-step-9",
          title: "Rehabilitation",
          description:
            "Walking, abductor strengthening and hip precautions continue after discharge until the team clears travel.",
        },
        {
          id: "hip-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the implant, physiotherapy plan and how follow-up should continue at home.",
        },
      ],
      preparation:
        "Share pelvis and hip X-rays, medication list, diabetes or cardiac history and previous hip surgery notes before travel so the orthopaedic team can judge total versus resurfacing or revision and issue an itemized estimate.",
      recovery:
        "GAF planning notes typically 4–7 nights after total hip replacement. Functional recovery continues over several weeks; broader recovery can take several months.",
      hospitalStay:
        "Typically 4–7 nights after total hip replacement or hip resurfacing; 5–10 nights after revision",
      recoveryPeriod:
        "Several weeks for independent walking; several months for full recovery. International patients should not book an early fixed return flight.",
      followUp:
        "Request a written summary covering the implant, surgical approach, physiotherapy protocol, anticoagulation and the imaging schedule after returning home.",
      importantConsiderations:
        "Planning ranges are not hospital quotations. There is no separate GAF robotic hip sheet. Emergency chest pain, calf swelling or fever with wound drainage belongs in a local emergency department.",
      treatmentType: "Joint replacement",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Conventional, anterior, computer-assisted or robotic-assisted total hip replacement, hip resurfacing and revision with named implants after films",
      searchKeywords: [
        "hip replacement surgery in India",
        "hip replacement cost in India",
        "total hip replacement in India",
        "total hip arthroplasty India",
        "robotic hip replacement India",
        "hip replacement hospitals in India",
        "best hip replacement surgeons in India",
        "hip replacement for international patients",
        "hip replacement recovery",
        "hip replacement implants",
      ],
      faqs: [
        {
          id: "hip-faq-1",
          question: "How much does hip replacement cost in India?",
          answer:
            "GAF planning ranges for one hip are approximately $6,000–$13,000 for total hip replacement, $6,500–$14,000 for hip resurfacing and $10,000–$20,000 for revision. The actual quotation depends on the hospital, surgeon, implant, city, room category, surgical technique and medical complexity.",
        },
        {
          id: "hip-faq-2",
          question: "What is the cost of bilateral hip replacement in India?",
          answer:
            "Both-hip replacement is quoted after case review. Planning starts from the total-hip sheet of $6,000–$13,000 per hip. Simultaneous versus staged surgery changes anaesthesia, stay and implant counts, so two hips are not automatically double a single-hip package.",
        },
        {
          id: "hip-faq-3",
          question: "How long does hip replacement surgery take?",
          answer:
            "The operation commonly takes around 1–2 hours for a straightforward primary, and approximately 1–3 hours depending on complexity. The overall hospital process takes longer.",
        },
        {
          id: "hip-faq-4",
          question: "How long do I stay in hospital after hip replacement?",
          answer:
            "GAF planning notes typically 4–7 nights after total hip replacement or hip resurfacing and 5–10 nights after revision. Some enhanced-recovery protocols discharge sooner. The treating team decides.",
        },
        {
          id: "hip-faq-5",
          question: "When can I walk after hip replacement?",
          answer:
            "Many patients begin assisted walking soon after surgery under physiotherapy supervision, sometimes on the day of surgery or the following day.",
        },
        {
          id: "hip-faq-6",
          question: "How long does recovery take?",
          answer:
            "Initial recovery commonly takes several weeks. Broader recovery of strength and endurance often takes several months. The NHS notes that improvement can continue over a longer period.",
        },
        {
          id: "hip-faq-7",
          question: "How long does a hip replacement last?",
          answer:
            "The NHS states that a hip replacement can last at least 15 years. Modern replacements can last many years, but individual implant survival varies with age, activity, implant design and surgical factors.",
        },
        {
          id: "hip-faq-8",
          question: "Is robotic hip replacement better?",
          answer:
            "Robotic assistance can help with planning and implant positioning, but it is not automatically better for every patient. There is no separate GAF robotic hip sheet; planning starts from the total hip range of $6,000–$13,000 and robotic assistance is quoted after case review.",
        },
        {
          id: "hip-faq-9",
          question: "Is anterior hip replacement better?",
          answer:
            "The direct anterior approach has potential advantages in selected patients, but no surgical approach is universally best. The surgeon should recommend an approach based on anatomy, diagnosis and experience with that technique.",
        },
        {
          id: "hip-faq-10",
          question: "Is hip replacement safe for elderly patients?",
          answer:
            "Age alone does not determine suitability. Overall health, heart and lung function, medications, mobility, frailty and other medical conditions must be assessed.",
        },
        {
          id: "hip-faq-11",
          question: "Can a younger patient undergo hip replacement?",
          answer:
            "Yes. Younger patients may need hip replacement because of avascular necrosis, developmental dysplasia, inflammatory arthritis or post-traumatic arthritis. Implant choice and long-term planning are particularly important because they may live many years with the implant. Hip resurfacing may be considered in selected cases.",
        },
        {
          id: "hip-faq-12",
          question: "Can I fly after hip replacement?",
          answer:
            "Travel timing should be decided by the treating medical team. Long-haul travel soon after major surgery requires particular consideration because of blood-clot risk. Sudden chest pain, breathlessness or a swollen painful calf after travel is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "hip-faq-13",
          question: "Is hip resurfacing better than total hip replacement?",
          answer:
            "Neither is universally better. Hip resurfacing preserves more femoral bone and may be appropriate for selected younger, active patients. Total hip replacement remains the more commonly used operation for advanced hip disease.",
        },
        {
          id: "hip-faq-14",
          question: "Is physiotherapy necessary after hip replacement?",
          answer:
            "Yes. Rehabilitation is an important part of achieving strength, walking and functional recovery.",
        },
      ],
      imageAlt:
        "Osteoarthritic adult hip ball-and-socket joint with worn cartilage, narrowed joint space and exposed bone on the femoral head and acetabulum",
      seoTitle: "Hip Replacement Surgery in India: Cost, Procedure, Recovery & Best Hospitals",
      metaDescription:
        "Learn about hip replacement surgery in India, including cost, types, implants, procedure, recovery, risks, robotic surgery and hospitals for international patients.",
    },
  },
};

if (existing) {
  store.treatments = store.treatments.map((row) => (row.slug === treatment.slug ? treatment : row));
} else {
  store.treatments.push(treatment);
}

const knee = store.treatments.find((row) => row.slug === KNEE);
if (knee) {
  const related = new Set(knee.relatedTreatmentSlugs ?? []);
  related.add(SLUG);
  knee.relatedTreatmentSlugs = [...related];
  const editorial = knee.translations?.en?.editorialBody ?? "";
  if (editorial && !editorial.includes(`/treatments/${SLUG}`)) {
    knee.translations!.en!.editorialBody = editorial.replace(
      "A longer patient-facing explainer with the same clinical map sits in [Knee Replacement Surgery in India](/blogs/knee-replacement-surgery-in-india).",
      "A longer patient-facing explainer with the same clinical map sits in [Knee Replacement Surgery in India](/blogs/knee-replacement-surgery-in-india). The neighbouring joint pathway is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
    );
  }
}

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [knee replacement surgery in India](https://gaf.healthcare/treatments/knee-replacement-surgery-in-india).",
    ", [knee replacement surgery in India](https://gaf.healthcare/treatments/knee-replacement-surgery-in-india) and [hip replacement surgery in India](https://gaf.healthcare/treatments/hip-replacement-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const kneeBodyPath = resolve("scripts/knee-treatment-body.md");
let kneeBody = readFileSync(kneeBodyPath, "utf8");
if (!kneeBody.includes(`/treatments/${SLUG}`)) {
  kneeBody = kneeBody.replace(
    "A longer patient-facing explainer with the same clinical map sits in [Knee Replacement Surgery in India](/blogs/knee-replacement-surgery-in-india).",
    "A longer patient-facing explainer with the same clinical map sits in [Knee Replacement Surgery in India](/blogs/knee-replacement-surgery-in-india). The neighbouring joint pathway is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
  );
  writeFileSync(kneeBodyPath, kneeBody);
  console.log("updated knee-treatment-body.md");
}

const kneeWriterPath = resolve("scripts/write-knee-treatment.mts");
let kneeWriter = readFileSync(kneeWriterPath, "utf8");
if (!kneeWriter.includes(`relatedTreatmentSlugs: ["${SLUG}"]`) && !kneeWriter.includes(SLUG)) {
  kneeWriter = kneeWriter.replace(
    "relatedTreatmentSlugs: [],",
    `relatedTreatmentSlugs: ["${SLUG}"],`,
  );
  writeFileSync(kneeWriterPath, kneeWriter);
  console.log("updated knee writer related slugs");
}
