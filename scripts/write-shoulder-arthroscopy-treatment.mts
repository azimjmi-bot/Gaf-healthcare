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

const body = readFileSync(resolve("scripts/shoulder-arthroscopy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "shoulder-arthroscopy-surgery-in-india");
const now = "2026-09-29T03:30:00.000Z";
const SLUG = "shoulder-arthroscopy-surgery-in-india";
const KNEE_ARTHRO = "knee-arthroscopy-surgery-in-india";
const HIP_ARTHRO = "hip-arthroscopy-surgery-in-india";
const ACL = "acl-surgery-in-india";

const treatment = {
  id: existing?.id ?? "b8d5f3e1-6c29-4a74-9f51-2e0d7b4c9a18",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Shoulder Arthroscopy Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Sports Medicine",
  category: "Shoulder Arthroscopy",
  image: "/uploads/treatments/shoulder-cuff-tear.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-raman-kant-aggarwal",
    "dr-deepak-chaudhary",
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-sanjay-pai",
    "dr-gopala-krishnan",
    "dr-anup-khatri",
    "dr-manish-samson",
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
    "rotator-cuff-repair",
    "shoulder-replacement",
    "tendon-repair",
    "acl-reconstruction-anterior-cruciate-ligament",
  ],
  relatedTreatmentSlugs: [KNEE_ARTHRO, HIP_ARTHRO],
  status: "published" as const,
  featured: true,
  sortOrder: 14,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Shoulder Arthroscopy Surgery in India",
      shortDescription:
        "Shoulder arthroscopy in India is planned from MRI and the actual lesion — rotator cuff repair, Bankart work or a named scope — not from a generic keyhole package.",
      editorialBody: body,
      process: [
        {
          id: "shoulder-arthro-step-1",
          title: "Share medical records",
          description:
            "The patient provides shoulder MRI images and reports, X-rays, night-pain or dislocation history, and previous physiotherapy notes.",
        },
        {
          id: "shoulder-arthro-step-2",
          title: "Shoulder-sports review",
          description:
            "A surgeon reviews whether the target is a repairable cuff tear, labral injury, instability with bone loss, frozen shoulder — or something that belongs on replacement.",
        },
        {
          id: "shoulder-arthro-step-3",
          title: "Procedure selection",
          description:
            "The team names the exact procedure: diagnostic arthroscopy, rotator cuff repair, Bankart repair, biceps work or arthroplasty if arthritis is already honest.",
        },
        {
          id: "shoulder-arthro-step-4",
          title: "Medical optimisation",
          description:
            "Non-operative treatment, medications, anaesthesia clearance and prehabilitation are completed before an elective shoulder scope.",
        },
        {
          id: "shoulder-arthro-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named procedure, anchors, stay and physiotherapy from GAF cost sheets, including biceps or acromial work if planned.",
        },
        {
          id: "shoulder-arthro-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, sling-transfer instruction and travel clearance.",
        },
        {
          id: "shoulder-arthro-step-7",
          title: "Surgery",
          description:
            "Shoulder arthroscopy is performed through small portals. Rotator cuff or labral repair is done when indicated.",
        },
        {
          id: "shoulder-arthro-step-8",
          title: "Sling and early care",
          description:
            "A sling protects tendon or labral repairs. Premature lifting can undo stitches even if pain has eased.",
        },
        {
          id: "shoulder-arthro-step-9",
          title: "Rehabilitation",
          description:
            "Physiotherapy is phased. Cuff repair and capsular release do not share the same strengthening timeline.",
        },
        {
          id: "shoulder-arthro-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering operative findings, sling rules, physiotherapy and warning signs.",
        },
      ],
      preparation:
        "Share shoulder MRI images, night-pain or dislocation history and previous physiotherapy notes before travel so the team can judge arthroscopy versus cuff repair versus replacement.",
      recovery:
        "GAF planning notes outpatient or 1–2 nights after arthroscopic surgery and 1–3 nights after rotator cuff repair. A sling and delayed strengthening are usual after tendon repair.",
      hospitalStay:
        "Typically outpatient or 1–2 nights after arthroscopic surgery; 1–3 nights after rotator cuff repair",
      recoveryPeriod:
        "Weeks to months depending on cuff repair, labral repair or capsular release. Return to overhead sport is procedure-dependent.",
      followUp:
        "Request a written summary covering diagnosis, procedure, operative findings, sling use, physiotherapy and the follow-up schedule after returning home.",
      importantConsiderations:
        "An MRI tear does not automatically mean surgery. Planning ranges are not hospital quotations. Emergency chest pain, fever with wound drainage or loss of hand circulation belongs in a local emergency department.",
      treatmentType: "Minimally invasive orthopaedic surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Shoulder arthroscopy through small portals for rotator cuff repair, labral repair, selected instability work and other intra-articular procedures",
      searchKeywords: [
        "shoulder arthroscopy in India",
        "shoulder arthroscopy cost in India",
        "rotator cuff repair in India",
        "Bankart repair India",
        "keyhole shoulder surgery India",
        "shoulder arthroscopy hospitals in India",
        "frozen shoulder arthroscopy",
        "shoulder arthroscopy recovery",
      ],
      faqs: [
        {
          id: "shoulder-arthro-faq-1",
          question: "How much does shoulder arthroscopy cost in India?",
          answer:
            "GAF planning is approximately $2,000–$5,500 for arthroscopic surgery and $2,800–$7,000 for rotator cuff repair. Bankart, SLAP, biceps and Latarjet work is quoted after case review.",
        },
        {
          id: "shoulder-arthro-faq-2",
          question: "Is shoulder arthroscopy a day-care procedure?",
          answer:
            "Many uncomplicated procedures are outpatient or short-stay. GAF planning is outpatient or 1–2 nights for arthroscopic surgery and 1–3 nights for rotator cuff repair.",
        },
        {
          id: "shoulder-arthro-faq-3",
          question: "Can a rotator cuff tear be repaired through arthroscopy?",
          answer:
            "Yes. Many repairable tears that require surgery are repaired arthroscopically. Named rotator cuff repair is $2,800–$7,000, not the generic arthroscopy range.",
        },
        {
          id: "shoulder-arthro-faq-4",
          question: "How long does shoulder arthroscopy take?",
          answer:
            "Duration depends on the procedure. Named cuff repair often takes around 1–2 hours. Combined labral or biceps work takes longer.",
        },
        {
          id: "shoulder-arthro-faq-5",
          question: "Will I need a sling?",
          answer:
            "Usually yes after tendon or labral repair, often for several weeks. Premature lifting can undo a repair even if pain has eased.",
        },
        {
          id: "shoulder-arthro-faq-6",
          question: "How long does recovery take?",
          answer:
            "Weeks for some straightforward procedures; several months after rotator cuff or instability repair. Time alone is not sports clearance.",
        },
        {
          id: "shoulder-arthro-faq-7",
          question: "Can a dislocated shoulder be treated with arthroscopy?",
          answer:
            "Selected patients can undergo arthroscopic Bankart repair. Significant bone loss may require a Latarjet or another procedure, quoted after case review.",
        },
        {
          id: "shoulder-arthro-faq-8",
          question: "Is shoulder arthroscopy better than open surgery?",
          answer:
            "Not universally. Arthroscopy is advantageous for many intra-articular problems. Substantial bone loss or complex reconstruction may need an open or combined approach.",
        },
        {
          id: "shoulder-arthro-faq-9",
          question: "Is physiotherapy required?",
          answer:
            "In many cases yes. After cuff repair, strengthening is delayed by design. After capsular release, maintaining motion is particularly important.",
        },
        {
          id: "shoulder-arthro-faq-10",
          question: "When can I drive?",
          answer:
            "Only when you can safely control the vehicle, are off impairing medication, and the surgeon's restrictions allow it. A sling usually makes driving unsafe.",
        },
        {
          id: "shoulder-arthro-faq-11",
          question: "Can I fly after shoulder arthroscopy?",
          answer:
            "Travel timing should be decided by the treating team. Overhead bins and long immobilisation need planning. Sudden chest pain, breathlessness or a swollen painful calf is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "shoulder-arthro-faq-12",
          question: "Is shoulder arthroscopy suitable for older adults?",
          answer:
            "Age alone does not determine suitability. Tear characteristics, muscle quality, arthritis and function matter. Advanced arthritis may belong on the shoulder-replacement sheet of $6,000–$13,000.",
        },
        {
          id: "shoulder-arthro-faq-13",
          question: "Can shoulder arthroscopy fail?",
          answer:
            "Yes. A repair can fail to heal, stiffness can develop, or instability can recur. Structural retears can occur even when function is good.",
        },
        {
          id: "shoulder-arthro-faq-14",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay may be short. Combined evaluation, surgery, sling instruction and travel clearance usually take longer. The treating hospital should set the timeline.",
        },
      ],
      imageAlt:
        "Adult anatomical specimen of a shoulder showing a torn rotator cuff tendon retracted from the humeral head",
      seoTitle: "Shoulder Arthroscopy Surgery in India: Cost, Cuff Repair & Recovery",
      metaDescription:
        "Learn about shoulder arthroscopy in India, including rotator cuff repair cost, Bankart repair, recovery, risks and how to choose a shoulder surgeon and hospital.",
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
  KNEE_ARTHRO,
  "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  "Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
);
linkRelated(
  HIP_ARTHRO,
  "Knee keyhole work sits on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
  "Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [hip arthroscopy surgery in India](https://gaf.healthcare/treatments/hip-arthroscopy-surgery-in-india).",
    ", [hip arthroscopy surgery in India](https://gaf.healthcare/treatments/hip-arthroscopy-surgery-in-india) and [shoulder arthroscopy surgery in India](https://gaf.healthcare/treatments/shoulder-arthroscopy-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const kneeArthroBodyPath = resolve("scripts/arthroscopy-treatment-body.md");
let kneeArthroBody = readFileSync(kneeArthroBodyPath, "utf8");
if (!kneeArthroBody.includes(`/treatments/${SLUG}`)) {
  kneeArthroBody = kneeArthroBody.replace(
    "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
    "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india). Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
  );
  writeFileSync(kneeArthroBodyPath, kneeArthroBody);
  console.log("updated arthroscopy-treatment-body.md");
}

const hipArthroBodyPath = resolve("scripts/hip-arthroscopy-treatment-body.md");
let hipArthroBody = readFileSync(hipArthroBodyPath, "utf8");
if (!hipArthroBody.includes(`/treatments/${SLUG}`)) {
  hipArthroBody = hipArthroBody.replace(
    "Knee keyhole work sits on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
    "Knee keyhole work sits on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india). Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
  );
  writeFileSync(hipArthroBodyPath, hipArthroBody);
  console.log("updated hip-arthroscopy-treatment-body.md");
}

const kneeArthroWriterPath = resolve("scripts/write-arthroscopy-treatment.mts");
let kneeArthroWriter = readFileSync(kneeArthroWriterPath, "utf8");
if (!kneeArthroWriter.includes(SLUG)) {
  kneeArthroWriter = kneeArthroWriter.replace(
    'relatedTreatmentSlugs: [ACL, KNEE, "hip-arthroscopy-surgery-in-india"],',
    'relatedTreatmentSlugs: [ACL, KNEE, "hip-arthroscopy-surgery-in-india", "shoulder-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(kneeArthroWriterPath, kneeArthroWriter);
  console.log("updated knee arthroscopy writer related slugs");
}

const hipArthroWriterPath = resolve("scripts/write-hip-arthroscopy-treatment.mts");
let hipArthroWriter = readFileSync(hipArthroWriterPath, "utf8");
if (!hipArthroWriter.includes(SLUG)) {
  hipArthroWriter = hipArthroWriter.replace(
    "relatedTreatmentSlugs: [HIP, KNEE_ARTHRO],",
    'relatedTreatmentSlugs: [HIP, KNEE_ARTHRO, "shoulder-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(hipArthroWriterPath, hipArthroWriter);
  console.log("updated hip arthroscopy writer related slugs");
}
