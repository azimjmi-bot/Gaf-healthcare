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

const body = readFileSync(resolve("scripts/hip-arthroscopy-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "hip-arthroscopy-surgery-in-india");
const now = "2026-09-29T03:00:00.000Z";
const SLUG = "hip-arthroscopy-surgery-in-india";
const HIP = "hip-replacement-surgery-in-india";
const KNEE_ARTHRO = "knee-arthroscopy-surgery-in-india";
const KNEE = "knee-replacement-surgery-in-india";
const ACL = "acl-surgery-in-india";

const treatment = {
  id: existing?.id ?? "a7c4e2f9-5b18-4d63-8e40-1f9c6a2b8d57",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Hip Arthroscopy Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Sports Medicine",
  category: "Hip Arthroscopy",
  image: "/uploads/treatments/hip-fai-cam.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-yash-gulati",
    "dr-ashok-rajgopal",
    "dr-i-p-s-oberoi",
    "dr-raju-vaishya",
    "dr-s-k-s-marya",
    "dr-manish-samson",
    "dr-sanjay-pai",
    "dr-kesavan-a-r",
    "dr-gopala-krishnan",
    "dr-anup-khatri",
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
    "arthroscopic-surgery",
    "total-hip-replacement",
    "hip-resurfacing",
    "revision-hip-replacement",
    "total-knee-replacement",
  ],
  relatedTreatmentSlugs: [HIP, KNEE_ARTHRO, "shoulder-arthroscopy-surgery-in-india"],
  status: "published" as const,
  featured: true,
  sortOrder: 13,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Hip Arthroscopy Surgery in India",
      shortDescription:
        "Hip arthroscopy in India is planned from X-rays, MRI and cartilage status — FAI, labral repair or a preservation scope — not from a generic keyhole package or as a substitute for hip replacement.",
      editorialBody: body,
      process: [
        {
          id: "hip-arthro-step-1",
          title: "Share medical records",
          description:
            "The patient provides hip X-rays, MRI or CT images and reports, groin-pain history, sitting or sport limitations, and previous physiotherapy notes.",
        },
        {
          id: "hip-arthro-step-2",
          title: "Hip-preservation review",
          description:
            "A surgeon reviews whether the target is FAI, a labral tear, a loose body, cartilage work — or something arthroscopy cannot fix, such as advanced osteoarthritis.",
        },
        {
          id: "hip-arthro-step-3",
          title: "Procedure selection",
          description:
            "The team names the exact procedure: diagnostic arthroscopy, labral repair, FAI correction, or arthroplasty if cartilage loss already belongs on a replacement sheet.",
        },
        {
          id: "hip-arthro-step-4",
          title: "Medical optimisation",
          description:
            "Non-operative treatment, medications, anaesthesia clearance and prehabilitation are completed before an elective hip scope.",
        },
        {
          id: "hip-arthro-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named procedure, anchors, stay and physiotherapy from GAF cost sheets, including what is billed if more reconstructive work is required.",
        },
        {
          id: "hip-arthro-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, early physiotherapy instruction and travel clearance.",
        },
        {
          id: "hip-arthro-step-7",
          title: "Surgery",
          description:
            "Hip arthroscopy is performed through small portals with controlled traction. Labral repair and FAI correction are done when indicated.",
        },
        {
          id: "hip-arthro-step-8",
          title: "Early mobilisation",
          description:
            "Walking and exercises begin according to the procedure. A labral repair or cartilage protocol can override day-care weight-bearing assumptions.",
        },
        {
          id: "hip-arthro-step-9",
          title: "Rehabilitation",
          description:
            "Physiotherapy is tailored to the operation. Simple arthroscopy and combined FAI-plus-labral work do not share the same timeline.",
        },
        {
          id: "hip-arthro-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering operative findings, crutches, physiotherapy and warning signs.",
        },
      ],
      preparation:
        "Share hip X-rays, MRI images and groin-pain history before travel so the team can judge arthroscopy versus replacement versus continued physiotherapy.",
      recovery:
        "GAF planning notes outpatient or 1–2 nights after arthroscopic surgery. Labral repair and FAI correction have longer, criteria-based rehabilitation.",
      hospitalStay: "Typically outpatient or 1–2 nights after arthroscopic surgery",
      recoveryPeriod:
        "Weeks to months depending on labral repair, FAI correction or cartilage work. Return to sport is procedure-dependent and often several months.",
      followUp:
        "Request a written summary covering diagnosis, procedure, operative findings, weight-bearing, physiotherapy and the follow-up schedule after returning home.",
      importantConsiderations:
        "Hip arthroscopy is not a treatment for ordinary osteoarthritis. Planning ranges are not hospital quotations. Emergency chest pain, calf swelling or fever with wound drainage belongs in a local emergency department.",
      treatmentType: "Minimally invasive hip-preservation surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Hip arthroscopy through small portals with traction for FAI correction, labral repair, loose bodies and selected cartilage work",
      searchKeywords: [
        "hip arthroscopy in India",
        "hip arthroscopy cost in India",
        "FAI surgery in India",
        "hip labral tear surgery India",
        "hip preservation surgery India",
        "hip arthroscopy hospitals in India",
        "femoroacetabular impingement treatment",
        "hip arthroscopy recovery",
      ],
      faqs: [
        {
          id: "hip-arthro-faq-1",
          question: "How much does hip arthroscopy cost in India?",
          answer:
            "GAF planning starts from approximately $2,000–$5,500 for arthroscopic surgery. Combined FAI correction and labral repair is quoted after case review. The actual quotation depends on the hospital, surgeon, anchors, city and the exact procedure.",
        },
        {
          id: "hip-arthro-faq-2",
          question: "Is hip arthroscopy a day-care procedure?",
          answer:
            "Many uncomplicated procedures are outpatient or short-stay. GAF planning is outpatient or 1–2 nights.",
        },
        {
          id: "hip-arthro-faq-3",
          question: "Is hip arthroscopy the same as hip replacement?",
          answer:
            "No. Arthroscopy aims to preserve the natural hip. Replacement removes damaged joint surfaces. Advanced arthritis belongs on the total-hip-replacement sheet of $6,000–$13,000.",
        },
        {
          id: "hip-arthro-faq-4",
          question: "How long does hip arthroscopy take?",
          answer:
            "The procedure commonly takes around 1–3 hours, depending on FAI correction, labral repair and associated work.",
        },
        {
          id: "hip-arthro-faq-5",
          question: "When can I walk after hip arthroscopy?",
          answer:
            "Many patients walk with assistance soon after surgery. Labral repair, cartilage work or FAI correction can require crutches and restricted weight-bearing.",
        },
        {
          id: "hip-arthro-faq-6",
          question: "How long does recovery take?",
          answer:
            "Weeks for some straightforward procedures; several months after labral repair, FAI correction or cartilage procedures. Time alone is not sports clearance.",
        },
        {
          id: "hip-arthro-faq-7",
          question: "Can hip arthroscopy treat a labral tear?",
          answer:
            "Selected symptomatic tears can be repaired arthroscopically when the tissue is suitable. Repair with anchors is quoted after case review from the arthroscopic-surgery sheet.",
        },
        {
          id: "hip-arthro-faq-8",
          question: "Can hip arthroscopy treat FAI?",
          answer:
            "Yes, in appropriately selected patients with FAI syndrome — symptoms, clinical signs and imaging — after non-operative treatment has been considered.",
        },
        {
          id: "hip-arthro-faq-9",
          question: "Is hip arthroscopy suitable for severe arthritis?",
          answer:
            "Usually no. Advanced arthritis is a poor indication. Patients with substantial cartilage loss may need assessment for hip replacement.",
        },
        {
          id: "hip-arthro-faq-10",
          question: "When can I drive after hip arthroscopy?",
          answer:
            "Only when medically cleared, off impairing medication, able to control the vehicle and perform an emergency stop, and within the surgeon's restrictions.",
        },
        {
          id: "hip-arthro-faq-11",
          question: "Is physiotherapy required after hip arthroscopy?",
          answer:
            "Yes for many patients, particularly after labral repair or FAI correction. The programme should be tailored to the operation.",
        },
        {
          id: "hip-arthro-faq-12",
          question: "Can I fly after hip arthroscopy?",
          answer:
            "Travel timing should be decided by the treating team. Sudden chest pain, breathlessness or a swollen painful calf is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "hip-arthro-faq-13",
          question: "Can athletes return to sport after hip arthroscopy?",
          answer:
            "Many athletes return, but rehabilitation can take several months. Return should be based on strength, movement quality, symptoms and sport-specific readiness.",
        },
        {
          id: "hip-arthro-faq-14",
          question: "How long should I stay in India?",
          answer:
            "Simple arthroscopy may require a relatively short stay. Combined FAI and labral work requires longer rehabilitation and follow-up. The treating hospital should set the timeline.",
        },
      ],
      imageAlt:
        "Adult hip anatomical specimen showing cam-type femoroacetabular impingement: a bony bump at the femoral head-neck junction contacting the acetabular rim",
      seoTitle: "Hip Arthroscopy Surgery in India: Cost, FAI, Labral Repair & Recovery",
      metaDescription:
        "Learn about hip arthroscopy in India, including cost, FAI correction, labral repair, recovery, risks and how to choose a hip-preservation surgeon and hospital.",
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
  HIP,
  "Sports-ligament injuries of the knee sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
);
linkRelated(
  KNEE_ARTHRO,
  "Neighbouring hip arthroplasty is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
  "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [knee arthroscopy surgery in India](https://gaf.healthcare/treatments/knee-arthroscopy-surgery-in-india).",
    ", [knee arthroscopy surgery in India](https://gaf.healthcare/treatments/knee-arthroscopy-surgery-in-india) and [hip arthroscopy surgery in India](https://gaf.healthcare/treatments/hip-arthroscopy-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const hipBodyPath = resolve("scripts/hip-treatment-body.md");
let hipBody = readFileSync(hipBodyPath, "utf8");
if (!hipBody.includes(`/treatments/${SLUG}`)) {
  hipBody = hipBody.replace(
    "Sports-ligament injuries of the knee sit on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
    "Sports-ligament injuries of the knee sit on [ACL Surgery in India](/treatments/acl-surgery-in-india). Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  );
  writeFileSync(hipBodyPath, hipBody);
  console.log("updated hip-treatment-body.md");
}

const kneeArthroBodyPath = resolve("scripts/arthroscopy-treatment-body.md");
let kneeArthroBody = readFileSync(kneeArthroBodyPath, "utf8");
if (!kneeArthroBody.includes(`/treatments/${SLUG}`)) {
  kneeArthroBody = kneeArthroBody.replace(
    "Neighbouring hip arthroplasty is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
    "Neighbouring hip arthroplasty is [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india). Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  );
  writeFileSync(kneeArthroBodyPath, kneeArthroBody);
  console.log("updated arthroscopy-treatment-body.md");
}

const hipWriterPath = resolve("scripts/write-hip-treatment.mts");
let hipWriter = readFileSync(hipWriterPath, "utf8");
if (!hipWriter.includes(SLUG)) {
  hipWriter = hipWriter.replace(
    'relatedTreatmentSlugs: [KNEE, "acl-surgery-in-india"],',
    'relatedTreatmentSlugs: [KNEE, "acl-surgery-in-india", "hip-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(hipWriterPath, hipWriter);
  console.log("updated hip writer related slugs");
}

const kneeArthroWriterPath = resolve("scripts/write-arthroscopy-treatment.mts");
let kneeArthroWriter = readFileSync(kneeArthroWriterPath, "utf8");
if (!kneeArthroWriter.includes(SLUG)) {
  kneeArthroWriter = kneeArthroWriter.replace(
    "relatedTreatmentSlugs: [ACL, KNEE],",
    'relatedTreatmentSlugs: [ACL, KNEE, "hip-arthroscopy-surgery-in-india"],',
  );
  writeFileSync(kneeArthroWriterPath, kneeArthroWriter);
  console.log("updated knee arthroscopy writer related slugs");
}
