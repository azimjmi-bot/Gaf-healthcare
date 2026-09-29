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

const body = readFileSync(resolve("scripts/arthroscopy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "knee-arthroscopy-surgery-in-india");
const now = "2026-09-29T02:30:00.000Z";
const SLUG = "knee-arthroscopy-surgery-in-india";
const ACL = "acl-surgery-in-india";
const KNEE = "knee-replacement-surgery-in-india";
const HIP = "hip-replacement-surgery-in-india";

const treatment = {
  id: existing?.id ?? "c5e1a9d7-3b48-4f26-8c01-6a9e2d4b7f13",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Knee Arthroscopy Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Sports Medicine",
  category: "Knee Arthroscopy",
  image: "/uploads/treatments/arthro-meniscus-tear.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-s-k-s-marya",
    "dr-anup-khatri",
    "dr-sanjay-pai",
    "dr-manish-samson",
    "dr-gopala-krishnan",
    "dr-i-vishwanatha-reddy",
  ],
  hospitalSlugs: [
    "apollo-delhi",
    "medanta-gurgaon",
    "artemis-hospital",
    "max-super-speciality-hospital-saket",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "arthroscopic-surgery",
    "meniscus-repair",
    "acl-reconstruction-anterior-cruciate-ligament",
    "pcl-reconstruction-posterior-cruciate-ligament",
    "total-knee-replacement",
  ],
  relatedTreatmentSlugs: [ACL, KNEE, "hip-arthroscopy-surgery-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 12,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Knee Arthroscopy Surgery in India",
      shortDescription:
        "Knee arthroscopy in India is planned from MRI and the actual intra-articular problem — meniscus, loose body, cartilage or a named ligament reconstruction — not from a generic keyhole package.",
      editorialBody: body,
      process: [
        {
          id: "arthro-step-1",
          title: "Share medical records",
          description:
            "The patient provides knee MRI images and reports, X-rays, injury history, locking or giving-way symptoms, and previous physiotherapy notes.",
        },
        {
          id: "arthro-step-2",
          title: "Sports-orthopaedic review",
          description:
            "A surgeon reviews whether the target is a meniscus tear, loose body, cartilage lesion, ACL reconstruction or something arthroscopy cannot fix — such as osteoarthritis.",
        },
        {
          id: "arthro-step-3",
          title: "Procedure selection",
          description:
            "The team names the exact procedure: diagnostic or therapeutic arthroscopy, meniscus repair, meniscectomy, or a named ligament reconstruction on its own sheet.",
        },
        {
          id: "arthro-step-4",
          title: "Medical optimisation",
          description:
            "Swelling control, medications, anaesthesia clearance and prehabilitation are completed before an elective scope.",
        },
        {
          id: "arthro-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named procedure, implants, stay and physiotherapy from GAF cost sheets, including what is billed if reconstruction is required intraoperatively.",
        },
        {
          id: "arthro-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, early physiotherapy instruction and travel clearance.",
        },
        {
          id: "arthro-step-7",
          title: "Surgery",
          description:
            "Arthroscopy is performed through small portals. Associated meniscus or ligament work is done when indicated.",
        },
        {
          id: "arthro-step-8",
          title: "Early mobilisation",
          description:
            "Walking and exercises begin according to the procedure. A meniscus repair or ACL graft can override day-care weight-bearing assumptions.",
        },
        {
          id: "arthro-step-9",
          title: "Rehabilitation",
          description:
            "Physiotherapy is tailored to the operation. Simple arthroscopy and ACL reconstruction do not share the same timeline.",
        },
        {
          id: "arthro-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering operative findings, weight-bearing rules, physiotherapy and warning signs.",
        },
      ],
      preparation:
        "Share knee MRI images, locking or giving-way history and previous physiotherapy notes before travel so the team can judge arthroscopy versus reconstruction versus replacement.",
      recovery:
        "GAF planning notes outpatient or 1–2 nights after simple arthroscopy. Meniscus repair and ACL reconstruction have longer, criteria-based rehabilitation.",
      hospitalStay:
        "Typically outpatient or 1–2 nights after arthroscopic surgery; 1–3 nights after ACL reconstruction",
      recoveryPeriod:
        "Days to weeks after uncomplicated arthroscopy; several months after meniscus repair or ligament reconstruction. Return to sport is procedure-dependent.",
      followUp:
        "Request a written summary covering diagnosis, procedure, operative findings, weight-bearing, physiotherapy and the follow-up schedule after returning home.",
      importantConsiderations:
        "Arthroscopy is not a treatment for ordinary osteoarthritis. Planning ranges are not hospital quotations. Emergency chest pain, calf swelling or fever with wound drainage belongs in a local emergency department.",
      treatmentType: "Minimally invasive orthopaedic surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Knee arthroscopy through small portals for meniscus, loose bodies, selected cartilage work and named arthroscopic ligament reconstruction",
      searchKeywords: [
        "knee arthroscopy in India",
        "knee arthroscopy cost in India",
        "arthroscopic knee surgery India",
        "meniscus surgery in India",
        "keyhole knee surgery India",
        "knee arthroscopy hospitals in India",
        "arthroscopy for international patients",
        "knee arthroscopy recovery",
      ],
      faqs: [
        {
          id: "arthro-faq-1",
          question: "How much does knee arthroscopy cost in India?",
          answer:
            "GAF planning is approximately $2,000–$5,500 for arthroscopic surgery, $1,800–$4,500 for meniscus repair and $2,500–$6,500 for ACL reconstruction. The actual quotation depends on the hospital, surgeon, implants, city and whether reconstruction is required.",
        },
        {
          id: "arthro-faq-2",
          question: "Is knee arthroscopy a day-care procedure?",
          answer:
            "Many uncomplicated procedures are outpatient or short-stay. GAF planning is outpatient or 1–2 nights. ACL reconstruction is typically 1–3 nights.",
        },
        {
          id: "arthro-faq-3",
          question: "Can knee arthroscopy treat osteoarthritis?",
          answer:
            "Routine arthroscopic lavage or debridement is not recommended for knee osteoarthritis by NICE and AAOS. A separate structural problem such as a loose body may sometimes provide a different indication. Advanced arthritis belongs on the knee-replacement pathway.",
        },
        {
          id: "arthro-faq-4",
          question: "How long does knee arthroscopy take?",
          answer:
            "A straightforward arthroscopy often takes less than an hour. Meniscus repair, ligament reconstruction or combined procedures take longer.",
        },
        {
          id: "arthro-faq-5",
          question: "When can I walk after knee arthroscopy?",
          answer:
            "Some patients bear weight soon after a simple procedure. Meniscus repair, cartilage work or ACL reconstruction can require crutches and restricted weight-bearing.",
        },
        {
          id: "arthro-faq-6",
          question: "How long does recovery take?",
          answer:
            "Days to weeks after some minor procedures; several months after meniscus repair, ligament reconstruction or cartilage procedures. Time alone is not sports clearance.",
        },
        {
          id: "arthro-faq-7",
          question: "Can arthroscopy treat a meniscus tear?",
          answer:
            "Selected tears can be repaired or partially removed arthroscopically. AAOS emphasises preserving functional meniscal tissue where possible. Repair planning is $1,800–$4,500.",
        },
        {
          id: "arthro-faq-8",
          question: "Can arthroscopy treat ACL tears?",
          answer:
            "Yes. ACL reconstruction is commonly performed arthroscopically and has its own GAF sheet of $2,500–$6,500, not the generic arthroscopy range.",
        },
        {
          id: "arthro-faq-9",
          question: "Is arthroscopy better than open surgery?",
          answer:
            "It depends on the condition. Arthroscopy is less invasive for appropriate intra-articular problems. Some conditions require open surgery or a combined approach.",
        },
        {
          id: "arthro-faq-10",
          question: "When can I drive after knee arthroscopy?",
          answer:
            "Some patients may resume driving after approximately 1–3 weeks following minor procedures. Timing depends on the operation, which knee, medications and the ability to perform an emergency stop.",
        },
        {
          id: "arthro-faq-11",
          question: "Is physiotherapy required after knee arthroscopy?",
          answer:
            "Yes for many patients, particularly after meniscus repair or ligament reconstruction. The programme should be tailored to the operation.",
        },
        {
          id: "arthro-faq-12",
          question: "Can I fly after knee arthroscopy?",
          answer:
            "Travel timing should be decided by the treating team. If unexpected reconstructive work was done, follow that procedure’s travel advice. Sudden chest pain, breathlessness or a swollen painful calf is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "arthro-faq-13",
          question: "Does knee arthroscopy leave scars?",
          answer: "Yes, but the scars are usually small because the surgeon uses small portals rather than a large incision.",
        },
        {
          id: "arthro-faq-14",
          question: "How long should I stay in India?",
          answer:
            "Simple arthroscopy may require a relatively short stay. ACL reconstruction or complex meniscus surgery requires longer rehabilitation and follow-up. The treating hospital should set the timeline.",
        },
      ],
      imageAlt:
        "Adult knee anatomy specimen showing a torn medial meniscus with a displaced flap between the femur and tibia",
      seoTitle: "Knee Arthroscopy Surgery in India: Cost, Procedure, Recovery & Hospitals",
      metaDescription:
        "Learn about knee arthroscopy in India, including cost, meniscus repair, ACL reconstruction, recovery, risks and how to choose a surgeon and hospital.",
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
  ACL,
  "When the problem is end-stage arthritis rather than a sports injury, the honest pathway is [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india), not ACL reconstruction.",
  "Diagnostic and therapeutic keyhole work that is not a named ACL graft sits on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
);
linkRelated(
  KNEE,
  "Sports-ligament injuries that are not end-stage arthritis sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  "Selected meniscus, loose-body and cartilage problems sit on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [ACL surgery in India](https://gaf.healthcare/treatments/acl-surgery-in-india).",
    ", [ACL surgery in India](https://gaf.healthcare/treatments/acl-surgery-in-india) and [knee arthroscopy surgery in India](https://gaf.healthcare/treatments/knee-arthroscopy-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const aclBodyPath = resolve("scripts/acl-treatment-body.md");
let aclBody = readFileSync(aclBodyPath, "utf8");
if (!aclBody.includes(`/treatments/${SLUG}`)) {
  aclBody = aclBody.replace(
    "When the problem is end-stage arthritis rather than a sports injury, the honest pathway is [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india), not ACL reconstruction.",
    "When the problem is end-stage arthritis rather than a sports injury, the honest pathway is [Knee Replacement Surgery in India](/treatments/knee-replacement-surgery-in-india), not ACL reconstruction. Diagnostic and therapeutic keyhole work that is not a named ACL graft sits on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
  );
  writeFileSync(aclBodyPath, aclBody);
  console.log("updated acl-treatment-body.md");
}

const kneeBodyPath = resolve("scripts/knee-treatment-body.md");
let kneeBody = readFileSync(kneeBodyPath, "utf8");
if (!kneeBody.includes(`/treatments/${SLUG}`)) {
  kneeBody = kneeBody.replace(
    "Sports-ligament injuries that are not end-stage arthritis sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
    "Sports-ligament injuries that are not end-stage arthritis sit on [ACL Surgery in India](/treatments/acl-surgery-in-india). Selected meniscus, loose-body and cartilage problems sit on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
  );
  writeFileSync(kneeBodyPath, kneeBody);
  console.log("updated knee-treatment-body.md");
}

const aclWriterPath = resolve("scripts/write-acl-treatment.mts");
let aclWriter = readFileSync(aclWriterPath, "utf8");
if (!aclWriter.includes(SLUG)) {
  aclWriter = aclWriter.replace(
    "relatedTreatmentSlugs: [KNEE, HIP],",
    'relatedTreatmentSlugs: [KNEE, HIP, "knee-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(aclWriterPath, aclWriter);
  console.log("updated ACL writer related slugs");
}

const kneeWriterPath = resolve("scripts/write-knee-treatment.mts");
let kneeWriter = readFileSync(kneeWriterPath, "utf8");
if (!kneeWriter.includes(SLUG)) {
  kneeWriter = kneeWriter.replace(
    'relatedTreatmentSlugs: ["hip-replacement-surgery-in-india", "acl-surgery-in-india"],',
    'relatedTreatmentSlugs: ["hip-replacement-surgery-in-india", "acl-surgery-in-india", "knee-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(kneeWriterPath, kneeWriter);
  console.log("updated knee writer related slugs");
}
