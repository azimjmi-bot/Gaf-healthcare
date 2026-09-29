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

const body = readFileSync(resolve("scripts/limb-lengthening-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "limb-lengthening-surgery-in-india");
const now = "2026-09-29T04:00:00.000Z";
const SLUG = "limb-lengthening-surgery-in-india";
const HIP = "hip-replacement-surgery-in-india";
const KNEE = "knee-replacement-surgery-in-india";
const ACL = "acl-surgery-in-india";
const KNEE_ARTHRO = "knee-arthroscopy-surgery-in-india";
const HIP_ARTHRO = "hip-arthroscopy-surgery-in-india";
const SHOULDER = "shoulder-arthroscopy-surgery-in-india";
const ADDITION =
  "Limb reconstruction and stature lengthening sit on [Limb Lengthening Surgery in India](/treatments/limb-lengthening-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "d7e1c4a8-9b2f-4e65-8c10-3a5f7d9e2b14",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Limb Lengthening Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Limb Reconstruction",
  category: "Limb Lengthening",
  image: "/uploads/treatments/limb-lengthening-distraction.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-neeraj-gupta-2",
    "dr-nitish-arora",
    "dr-nitiraj-singh-oberoi",
    "dr-devendra-singh-solanki",
    "dr-thiagarajan-pandian",
    "dr-k-krishnaiah",
    "dr-a-h-ashwin-kumar",
    "dr-kailash-sarathy",
    "dr-rajesh-bawari",
    "dr-sai-dinesh-thatikonda",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "max-smart-super-speciality-hospital-saket",
    "apollo-hospitals-navi-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "gleneagles-healthcity-chennai",
    "rela-hospital",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "limb-lengthening-surgery",
    "limb-reconstruction-surgery",
    "pediatric-deformity-correction",
    "non-union-repair",
    "fracture-fixation",
  ],
  relatedTreatmentSlugs: [HIP, KNEE, ACL, KNEE_ARTHRO],
  status: "published" as const,
  featured: true,
  sortOrder: 15,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Limb Lengthening Surgery in India",
      shortDescription:
        "Limb lengthening in India is planned from standing films and the actual discrepancy — paediatric distraction, adult reconstruction or selected stature lengthening — not from a generic centimetre package.",
      editorialBody: body,
      process: [
        {
          id: "limb-len-step-1",
          title: "Share medical records",
          description:
            "The patient provides standing long-leg X-rays, prior operative notes, infection history and current medications.",
        },
        {
          id: "limb-len-step-2",
          title: "Limb-reconstruction review",
          description:
            "A surgeon reviews whether the target is discrepancy, congenital shortening, post-traumatic reconstruction, deformity or selected cosmetic stature lengthening.",
        },
        {
          id: "limb-len-step-3",
          title: "Technique selection",
          description:
            "The team names the bone, centimetres, and whether an internal lengthening nail or external frame is appropriate.",
        },
        {
          id: "limb-len-step-4",
          title: "Medical optimisation",
          description:
            "Infection status, bone quality, joint motion, nutrition and smoking are addressed before an elective osteotomy.",
        },
        {
          id: "limb-len-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named technique, implant, index stay and whether outpatient distraction and later removal are included.",
        },
        {
          id: "limb-len-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person measurement, surgery, distraction teaching and an in-city outpatient period.",
        },
        {
          id: "limb-len-step-7",
          title: "Surgery",
          description:
            "Osteotomy is performed and an internal lengthening nail or external fixator is applied.",
        },
        {
          id: "limb-len-step-8",
          title: "Distraction and consolidation",
          description:
            "Gradual lengthening is followed by a consolidation phase while regenerate bone matures. Weight-bearing follows the surgeon's protocol.",
        },
        {
          id: "limb-len-step-9",
          title: "Rehabilitation",
          description:
            "Physiotherapy protects knee, ankle and hip motion throughout lengthening. Contracture prevention is not optional.",
        },
        {
          id: "limb-len-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering weight-bearing, pin or wound care, physiotherapy, imaging and warning signs.",
        },
      ],
      preparation:
        "Share standing long-leg films, prior infection or frame records and a measured discrepancy before travel so the team can judge lengthening versus reconstruction versus a shoe-lift.",
      recovery:
        "GAF paediatric planning notes 7–14 nights for the index admission, then outpatient lengthening in-city. Distraction and consolidation last weeks to months.",
      hospitalStay: "Typically 7–14 nights for the index paediatric lengthening admission, then in-city outpatient distraction",
      recoveryPeriod:
        "Weeks of distraction plus a longer consolidation phase. Return to sport is late and depends on regenerate strength and joint motion.",
      followUp:
        "Request a written summary covering centimetres planned, device, distraction schedule, physiotherapy, imaging and the follow-up plan after returning home.",
      importantConsiderations:
        "A brochure centimetre figure is not a surgical plan. Planning ranges are not hospital quotations. Emergency chest pain, fever with pin-site drainage or loss of limb circulation belongs in a local emergency department.",
      treatmentType: "Reconstructive orthopaedic surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Distraction osteogenesis with an internal lengthening nail or external fixator after controlled osteotomy",
      searchKeywords: [
        "limb lengthening surgery in India",
        "limb lengthening cost in India",
        "cosmetic stature lengthening India",
        "leg length discrepancy surgery India",
        "Ilizarov limb lengthening India",
        "internal lengthening nail India",
        "PRECICE nail India",
        "limb lengthening recovery",
      ],
      faqs: [
        {
          id: "limb-len-faq-1",
          question: "How much does limb lengthening surgery cost in India?",
          answer:
            "GAF paediatric limb-lengthening planning is approximately $12,000–$28,000 (typically 7–14 nights, then outpatient distraction in-city). Neighbouring reconstruction is $10,000–$25,000. Adult cosmetic stature lengthening is quoted after case review.",
        },
        {
          id: "limb-len-faq-2",
          question: "Is limb lengthening a short hospital stay?",
          answer:
            "The index admission may be 7–14 nights on the paediatric sheet, but distraction and consolidation continue as an outpatient programme. Cosmetic programmes often need a longer base in India.",
        },
        {
          id: "limb-len-faq-3",
          question: "Can limb lengthening increase height?",
          answer:
            "Selected skeletally mature adults can undergo cosmetic stature lengthening. It is major orthopaedic surgery, not a routine cosmetic procedure, and there is no separate adult GAF cost sheet.",
        },
        {
          id: "limb-len-faq-4",
          question: "How many centimetres can be gained?",
          answer:
            "There is no universal safe number. Published cosmetic series have reported average gains around 6–7 cm, but individual results vary and more length is not automatically better.",
        },
        {
          id: "limb-len-faq-5",
          question: "Is an internal nail better than an external frame?",
          answer:
            "Neither is universally better. Nails avoid pin sites in selected anatomy. Frames remain useful for complex deformity, open growth plates and cases where a nail is unsuitable.",
        },
        {
          id: "limb-len-faq-6",
          question: "How long does recovery take?",
          answer:
            "Distraction lasts weeks; consolidation lasts longer. Physiotherapy continues throughout. Time alone is not walking or sports clearance.",
        },
        {
          id: "limb-len-faq-7",
          question: "Can both legs be lengthened?",
          answer:
            "Bilateral lengthening may be performed in selected cosmetic cases. It is substantially more demanding than treating one limb.",
        },
        {
          id: "limb-len-faq-8",
          question: "Is limb lengthening safe for children?",
          answer:
            "Children need a paediatric reconstruction plan because growth plates may still be open. Timing and technique belong with a paediatric orthopaedic specialist.",
        },
        {
          id: "limb-len-faq-9",
          question: "Will I need physiotherapy?",
          answer:
            "Yes. Maintaining knee, ankle and hip motion is central to avoiding contracture during distraction.",
        },
        {
          id: "limb-len-faq-10",
          question: "Can I walk after surgery?",
          answer:
            "Weight-bearing follows the surgeon's protocol for the device used. Pain easing is not permission to increase load.",
        },
        {
          id: "limb-len-faq-11",
          question: "When can I fly after limb lengthening?",
          answer:
            "Flying during active distraction is often inappropriate. The treating team sets fitness to fly after regenerate and pin sites are reviewed. Sudden chest pain, breathlessness or a swollen painful calf is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "limb-len-faq-12",
          question: "Does the nail have to be removed?",
          answer:
            "Some internal nails are later removed after consolidation. Removal is another procedure and should be priced in the original letter if planned.",
        },
        {
          id: "limb-len-faq-13",
          question: "Can lengthening correct a deformity as well as shortness?",
          answer:
            "In selected patients, lengthening can be combined with angular or rotational correction. Combined paediatric osteotomy work may sit on the deformity-correction sheet.",
        },
        {
          id: "limb-len-faq-14",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay may be 7–14 nights for the index sitting. Combined evaluation, distraction teaching and in-city outpatient monitoring usually take longer. The treating hospital should set the timeline.",
        },
      ],
      imageAlt:
        "Adult anatomical specimen of a tibia after osteotomy, with a distraction gap filled by early regenerate bone",
      seoTitle: "Limb Lengthening Surgery in India: Cost, Nails, Frames & Recovery",
      metaDescription:
        "Learn about limb lengthening surgery in India, including paediatric cost ranges, internal nails versus external frames, cosmetic stature lengthening, recovery and how to choose a reconstruction surgeon.",
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
  "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  ADDITION,
);
linkRelated(
  KNEE,
  "Selected meniscus, loose-body and cartilage problems sit on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
  ADDITION,
);
linkRelated(
  ACL,
  "Neighbouring hip arthroplasty sits on [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
  ADDITION,
);
linkRelated(
  KNEE_ARTHRO,
  "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  ADDITION,
);
linkRelated(
  HIP_ARTHRO,
  "End-stage hip arthritis belongs on [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india), not on a preservation scope.",
  ADDITION,
);
linkRelated(
  SHOULDER,
  "Named ligament reconstruction sits on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  ADDITION,
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [shoulder arthroscopy surgery in India](https://gaf.healthcare/treatments/shoulder-arthroscopy-surgery-in-india).",
    ", [shoulder arthroscopy surgery in India](https://gaf.healthcare/treatments/shoulder-arthroscopy-surgery-in-india) and [limb lengthening surgery in India](https://gaf.healthcare/treatments/limb-lengthening-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const markdownUpdates: Array<[string, string]> = [
  [
    "scripts/hip-treatment-body.md",
    "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  ],
  [
    "scripts/knee-treatment-body.md",
    "Selected meniscus, loose-body and cartilage problems sit on [Knee Arthroscopy Surgery in India](/treatments/knee-arthroscopy-surgery-in-india).",
  ],
  [
    "scripts/acl-treatment-body.md",
    "Neighbouring hip arthroplasty sits on [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india).",
  ],
  [
    "scripts/arthroscopy-treatment-body.md",
    "Hip-preservation keyhole work sits on [Hip Arthroscopy Surgery in India](/treatments/hip-arthroscopy-surgery-in-india).",
  ],
  [
    "scripts/hip-arthroscopy-treatment-body.md",
    "End-stage hip arthritis belongs on [Hip Replacement Surgery in India](/treatments/hip-replacement-surgery-in-india), not on a preservation scope.",
  ],
  [
    "scripts/shoulder-arthroscopy-treatment-body.md",
    "Named ligament reconstruction sits on [ACL Surgery in India](/treatments/acl-surgery-in-india).",
  ],
];

for (const [rel, needle] of markdownUpdates) {
  const path = resolve(rel);
  let text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle} ${ADDITION}`));
    console.log("updated", rel);
  }
}
