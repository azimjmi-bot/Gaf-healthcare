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

const body = readFileSync(resolve("scripts/acl-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "acl-surgery-in-india");
const now = "2026-09-29T02:00:00.000Z";
const SLUG = "acl-surgery-in-india";
const KNEE = "knee-replacement-surgery-in-india";
const HIP = "hip-replacement-surgery-in-india";

const treatment = {
  id: existing?.id ?? "b2d8e4f1-6c30-4a17-9e52-8f1b3c7d5a90",
  slug: SLUG,
  previousSlugs: [],
  baseName: "ACL Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Sports Medicine",
  category: "ACL Reconstruction",
  image: "/uploads/treatments/acl-tear-anatomy.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-s-k-s-marya",
    "dr-anup-khatri",
    "dr-sanjay-pai",
    "dr-kesavan-a-r",
    "dr-gopala-krishnan",
    "dr-venudhara-kum-mohan-reddy",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "medanta-gurgaon",
    "artemis-hospital",
    "max-super-speciality-hospital-saket",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "mgm-healthcare-chennai",
    "apollo-hospital-chennai",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "acl-reconstruction-anterior-cruciate-ligament",
    "pcl-reconstruction-posterior-cruciate-ligament",
    "meniscus-repair",
    "arthroscopic-surgery",
    "total-knee-replacement",
  ],
  relatedTreatmentSlugs: [KNEE, HIP],
  status: "published" as const,
  featured: true,
  sortOrder: 11,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "ACL Surgery in India",
      shortDescription:
        "ACL reconstruction in India is planned from MRI, knee stability and sport goals — graft choice, meniscus work and criteria-based rehab — not from a single package price.",
      editorialBody: body,
      process: [
        {
          id: "acl-step-1",
          title: "Share medical records",
          description:
            "The patient provides knee MRI images and reports, injury date, sport or work goals, and any previous physiotherapy or surgical notes.",
        },
        {
          id: "acl-step-2",
          title: "Sports-orthopaedic review",
          description:
            "A surgeon reviews Lachman/pivot findings, associated meniscus or cartilage injury, and whether reconstruction is actually indicated.",
        },
        {
          id: "acl-step-3",
          title: "Procedure and graft selection",
          description:
            "The team decides reconstruction versus structured rehab, autograft versus allograft, and whether meniscus repair is needed in the same sitting.",
        },
        {
          id: "acl-step-4",
          title: "Medical optimisation and prehab",
          description:
            "Swelling control, extension, quadriceps activation and clearance for anaesthesia are completed before an elective graft.",
        },
        {
          id: "acl-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes graft, fixation, stay, meniscus implants and physiotherapy from GAF cost sheets — not a brochure package.",
        },
        {
          id: "acl-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, early physiotherapy instruction and travel clearance.",
        },
        {
          id: "acl-step-7",
          title: "Surgery",
          description:
            "Arthroscopic ACL reconstruction is performed, with associated meniscus or cartilage work when indicated.",
        },
        {
          id: "acl-step-8",
          title: "Early mobilisation",
          description:
            "Walking, extension and quadriceps activation begin under physiotherapy, with weight-bearing rules written if a meniscus was repaired.",
        },
        {
          id: "acl-step-9",
          title: "Criteria-based rehabilitation",
          description:
            "Strength, hop testing and sport-specific work continue for months. Return to pivoting sport is not a calendar date.",
        },
        {
          id: "acl-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the graft, fixation, physiotherapy protocol and how follow-up should continue at home.",
        },
      ],
      preparation:
        "Share knee MRI images, injury mechanism, sport goals and previous physiotherapy notes before travel so the team can judge reconstruction versus rehab and issue an itemized estimate.",
      recovery:
        "GAF planning notes typically 1–3 nights after ACL reconstruction. Walking often begins early; return to unrestricted sport is criteria-based over many months.",
      hospitalStay: "Typically 1–3 nights after ACL reconstruction; some uncomplicated cases are day-care or a single night",
      recoveryPeriod:
        "Several weeks for walking and desk work; approximately 9–12 months of criterion-based rehabilitation before high-demand sport. International patients should not book an early fixed return flight.",
      followUp:
        "Request a written summary covering the graft, fixation devices, meniscus protocol, physiotherapy plan and the testing schedule after returning home.",
      importantConsiderations:
        "Not every ACL tear needs reconstruction. Planning ranges are not hospital quotations. Emergency chest pain, calf swelling or fever with wound drainage belongs in a local emergency department.",
      treatmentType: "Sports ligament reconstruction",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Arthroscopic ACL reconstruction with autograft or selected allograft, combined meniscus repair when indicated, and criteria-based rehabilitation",
      searchKeywords: [
        "ACL surgery in India",
        "ACL surgery cost in India",
        "ACL reconstruction in India",
        "ACL reconstruction cost",
        "ACL tear treatment in India",
        "ACL surgery procedure",
        "ACL recovery time",
        "ACL graft",
        "ACL surgery hospitals in India",
        "arthroscopic ACL surgery",
      ],
      faqs: [
        {
          id: "acl-faq-1",
          question: "How much does ACL surgery cost in India?",
          answer:
            "GAF planning for ACL reconstruction is approximately $2,500–$6,500. Combined meniscus repair is planned from $1,800–$4,500 and is quoted after case review rather than added as a second package. The actual quotation depends on the hospital, surgeon, graft, implants, city and associated injuries.",
        },
        {
          id: "acl-faq-2",
          question: "Is ACL surgery necessary for everyone?",
          answer:
            "No. Some patients can function well with structured rehabilitation, particularly if the knee remains stable and their activities do not require frequent pivoting.",
        },
        {
          id: "acl-faq-3",
          question: "Is ACL reconstruction better than ACL repair?",
          answer:
            "For ACL tears requiring surgery, current AAOS guidance strongly recommends reconstruction rather than repair because reconstruction has a lower risk of revision surgery. Selected proximal tears may be considered for repair by experienced surgeons. There is no separate GAF ACL-repair sheet.",
        },
        {
          id: "acl-faq-4",
          question: "How long does ACL surgery take?",
          answer:
            "The procedure commonly takes approximately 1–3 hours, although the duration varies with meniscus work, revision tunnels and other associated injuries.",
        },
        {
          id: "acl-faq-5",
          question: "How long do I stay in hospital after ACL reconstruction?",
          answer:
            "GAF planning notes typically 1–3 nights. Some uncomplicated reconstructions are day-case or a single night. Combined ligament or meniscus protocols can lengthen stay.",
        },
        {
          id: "acl-faq-6",
          question: "When can I walk after ACL surgery?",
          answer:
            "Many patients begin walking early, often with crutches. Exact weight-bearing instructions depend on the reconstruction and any meniscus repair.",
        },
        {
          id: "acl-faq-7",
          question: "How long does recovery take?",
          answer:
            "Graft healing and neuromuscular rehabilitation take months. Criterion-based programmes commonly describe about 9–12 months before high-demand sport. Time alone is not clearance.",
        },
        {
          id: "acl-faq-8",
          question: "Which graft is best?",
          answer:
            "There is no universally best graft. Patellar tendon, hamstring and quadriceps tendon autografts all have established roles. AAOS recommends autograft rather than allograft in many young or highly active patients.",
        },
        {
          id: "acl-faq-9",
          question: "Can I return to football after ACL surgery?",
          answer:
            "Many athletes return to football after reconstruction, but clearance should depend on stability, strength, movement quality, sport-specific testing and psychological readiness rather than a six- or nine-month calendar date.",
        },
        {
          id: "acl-faq-10",
          question: "Does ACL surgery prevent arthritis?",
          answer:
            "No. Reconstruction restores stability but does not eliminate the possibility of post-traumatic osteoarthritis.",
        },
        {
          id: "acl-faq-11",
          question: "Can the ACL tear again after reconstruction?",
          answer:
            "Yes. Both the reconstructed knee and the opposite knee can sustain a future ACL injury, especially after premature return to pivoting sport.",
        },
        {
          id: "acl-faq-12",
          question: "Can I fly after ACL surgery?",
          answer:
            "Travel timing should be decided by the treating team. Long-haul travel soon after surgery requires clot advice and space to extend the knee. Sudden chest pain, breathlessness or a swollen painful calf after travel is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "acl-faq-13",
          question: "What if my meniscus is also torn?",
          answer:
            "A repairable meniscus may be treated in the same sitting. GAF planning for meniscus repair is $1,800–$4,500. Combined ACL-plus-meniscus surgery is quoted after case review from the ACL sheet.",
        },
        {
          id: "acl-faq-14",
          question: "Is physiotherapy necessary after ACL reconstruction?",
          answer:
            "Yes. Rehabilitation is a major part of treatment. A technically successful graft still requires a criterion-based programme before return to sport.",
        },
      ],
      imageAlt:
        "Adult knee anatomy specimen showing a completely torn anterior cruciate ligament between the femur and tibia, with the menisci visible at the joint line",
      seoTitle: "ACL Surgery in India: Cost, Procedure, Recovery & Best Hospitals",
      metaDescription:
        "Learn about ACL surgery in India, including ACL reconstruction cost, graft options, procedure, recovery, rehabilitation, risks and how to choose an ACL surgeon and hospital.",
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
    row.translations!.en!.editorialBody = editorial.replace(needle, `${needle} ${addition}`);
  }
}

linkRelated(
  KNEE,
  "The neighbouring joint pathway is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
  "Sports-ligament injuries that are not end-stage arthritis sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
);
linkRelated(
  HIP,
  "The neighbouring joint pathway is published as [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india).",
  "Sports-ligament injuries of the knee sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [hip replacement surgery in India](https://gaf.healthcare/treatments/hip-replacement-surgery-in-india).",
    ", [hip replacement surgery in India](https://gaf.healthcare/treatments/hip-replacement-surgery-in-india) and [ACL surgery in India](https://gaf.healthcare/treatments/acl-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const kneeBodyPath = resolve("scripts/knee-treatment-body.md");
let kneeBody = readFileSync(kneeBodyPath, "utf8");
if (!kneeBody.includes(`/treatments/${SLUG}`)) {
  kneeBody = kneeBody.replace(
    "The neighbouring joint pathway is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
    "The neighbouring joint pathway is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india). Sports-ligament injuries that are not end-stage arthritis sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  );
  writeFileSync(kneeBodyPath, kneeBody);
  console.log("updated knee-treatment-body.md");
}

const hipBodyPath = resolve("scripts/hip-treatment-body.md");
let hipBody = readFileSync(hipBodyPath, "utf8");
if (!hipBody.includes(`/treatments/${SLUG}`)) {
  hipBody = hipBody.replace(
    "The neighbouring joint pathway is published as [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india).",
    "The neighbouring joint pathway is published as [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india). Sports-ligament injuries of the knee sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  );
  writeFileSync(hipBodyPath, hipBody);
  console.log("updated hip-treatment-body.md");
}

const kneeWriterPath = resolve("scripts/write-knee-treatment.mts");
let kneeWriter = readFileSync(kneeWriterPath, "utf8");
if (!kneeWriter.includes(SLUG)) {
  kneeWriter = kneeWriter.replace(
    'relatedTreatmentSlugs: ["hip-replacement-surgery-in-india"],',
    'relatedTreatmentSlugs: ["hip-replacement-surgery-in-india", "acl-surgery-in-india"],',
  );
  writeFileSync(kneeWriterPath, kneeWriter);
  console.log("updated knee writer related slugs");
}

const hipWriterPath = resolve("scripts/write-hip-treatment.mts");
let hipWriter = readFileSync(hipWriterPath, "utf8");
if (!hipWriter.includes(SLUG)) {
  hipWriter = hipWriter.replace(
    "relatedTreatmentSlugs: [KNEE],",
    'relatedTreatmentSlugs: [KNEE, "acl-surgery-in-india"],',
  );
  writeFileSync(hipWriterPath, hipWriter);
  console.log("updated hip writer related slugs");
}
