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

const body = readFileSync(resolve("scripts/tendon-repair-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "tendon-repair-surgery-in-india");
const now = "2026-09-29T04:30:00.000Z";
const SLUG = "tendon-repair-surgery-in-india";
const SHOULDER = "shoulder-arthroscopy-surgery-in-india";
const ACL = "acl-surgery-in-india";
const KNEE_ARTHRO = "knee-arthroscopy-surgery-in-india";
const HIP_ARTHRO = "hip-arthroscopy-surgery-in-india";
const LIMB = "limb-lengthening-surgery-in-india";
const ADDITION =
  "Named tendon laceration, Achilles or cuff repair sits on [Tendon Repair Surgery in India](/treatments/tendon-repair-surgery-in-india).";
const LIMB_NEEDLE =
  "Limb reconstruction and stature lengthening sit on [Limb Lengthening Surgery in India](/treatments/limb-lengthening-surgery-in-india).";

const treatment = {
  id: existing?.id ?? "e8f2d5b9-0c3a-4f76-9d21-4b6e8a0c3d25",
  slug: SLUG,
  previousSlugs: [],
  baseName: "Tendon Repair Surgery in India",
  specialtySlug: "orthopedics",
  subspecialty: "Hand & Sports Medicine",
  category: "Tendon Repair",
  image: "/uploads/treatments/tendon-flexor-laceration.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-kamal-dureja",
    "dr-harshavardhan-hegde-2",
    "dr-nitiraj-singh-oberoi",
    "dr-anup-khatri",
    "dr-kushal-shah",
    "dr-sanjay-pai",
    "dr-gopala-krishnan",
    "dr-ram-chidambaram",
    "dr-kesavan-a-r",
    "dr-k-krishnaiah",
  ],
  hospitalSlugs: [
    "max-smart-super-speciality-hospital-saket",
    "artemis-hospital",
    "gleneagles-hospital-mumbai",
    "apollo-hospitals-bannerghatta-road",
    "apollo-hospital-chennai",
    "mgm-healthcare-chennai",
    "gleneagles-healthcity-chennai",
    "kims-hospitals-secunderabad",
  ],
  costPageSlugs: [
    "tendon-repair",
    "achilles-repair",
    "rotator-cuff-repair",
    "hand-reconstruction",
    "tendon-repair-surgery",
  ],
  relatedTreatmentSlugs: [SHOULDER, ACL, KNEE_ARTHRO, LIMB],
  status: "published" as const,
  featured: true,
  sortOrder: 16,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "Tendon Repair Surgery in India",
      shortDescription:
        "Tendon repair in India is planned from the named tendon and the actual injury — flexor suture, Achilles repair, cuff repair or reconstruction — not from a generic tendon package.",
      editorialBody: body,
      process: [
        {
          id: "tendon-step-1",
          title: "Share medical records",
          description:
            "The patient provides MRI or ultrasound, wound photographs if relevant, date of injury and current splint or boot use.",
        },
        {
          id: "tendon-step-2",
          title: "Subspecialist review",
          description:
            "A surgeon reviews whether the target is a repairable laceration, Achilles rupture, cuff tear, avulsion, or a chronic gap that needs graft or transfer.",
        },
        {
          id: "tendon-step-3",
          title: "Procedure selection",
          description:
            "The team names the tendon, primary repair versus reconstruction, and whether nerve or bone work is in the same sitting.",
        },
        {
          id: "tendon-step-4",
          title: "Medical optimisation",
          description:
            "Open wounds, smoking, diabetes and delayed presentation are addressed before an elective reconstruction.",
        },
        {
          id: "tendon-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet — tendon repair, Achilles repair, rotator cuff repair or hand reconstruction — plus splint or boot and therapy.",
        },
        {
          id: "tendon-step-6",
          title: "Travel to India",
          description:
            "The patient allows time for in-person examination, surgery, splint fitting and early protected-motion teaching.",
        },
        {
          id: "tendon-step-7",
          title: "Surgery",
          description:
            "The tendon is repaired, reattached, grafted or reconstructed according to the written plan.",
        },
        {
          id: "tendon-step-8",
          title: "Protection",
          description:
            "A splint, cast, brace or boot protects the suture. Premature loading can rupture a repair even if pain has eased.",
        },
        {
          id: "tendon-step-9",
          title: "Rehabilitation",
          description:
            "Controlled motion and later strengthening follow a tendon-specific protocol written by the operating team.",
        },
        {
          id: "tendon-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering protection, physiotherapy, lifting limits and warning signs.",
        },
      ],
      preparation:
        "Share MRI or ultrasound, the date of injury and any splint or boot already in use so the team can judge repair versus reconstruction versus non-operative care.",
      recovery:
        "GAF planning notes outpatient or 1–2 nights after tendon repair and 1–3 nights after Achilles repair. Therapy visits dominate the weeks after a short stay.",
      hospitalStay:
        "Typically outpatient or 1–2 nights after tendon repair; 1–3 nights after Achilles repair",
      recoveryPeriod:
        "Weeks for tendon healing and months for functional recovery. Return to sport is protocol-dependent, not calendar-dependent.",
      followUp:
        "Request a written summary covering the named tendon, repair versus graft, splint or boot rules, physiotherapy and the follow-up schedule after returning home.",
      importantConsiderations:
        "A brochure tendon-repair price is not a surgical plan. Planning ranges are not hospital quotations. Emergency pale fingers, wound drainage with fever, chest pain or a swollen painful calf belongs in a local emergency department.",
      treatmentType: "Reconstructive orthopaedic surgery",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Primary tendon suture, bone reattachment, minimally invasive repair, grafting, reconstruction or tendon transfer according to the named injury",
      searchKeywords: [
        "tendon repair surgery in India",
        "tendon repair surgery cost in India",
        "Achilles tendon repair India",
        "flexor tendon repair India",
        "tendon reconstruction India",
        "tendon graft surgery India",
        "rotator cuff repair India",
        "tendon repair recovery",
      ],
      faqs: [
        {
          id: "tendon-faq-1",
          question: "How much does tendon repair surgery cost in India?",
          answer:
            "GAF planning is approximately $1,500–$5,000 for adult tendon repair, $2,000–$6,000 for named Achilles repair, $2,800–$7,000 for named rotator cuff repair, and $3,500–$10,000 for hand reconstruction. Chronic grafting is quoted after case review.",
        },
        {
          id: "tendon-faq-2",
          question: "Is tendon repair a day-care procedure?",
          answer:
            "Many isolated repairs are outpatient or 1–2 nights. Achilles repair is typically 1–3 nights. Combined nerve repair or reconstruction can stay longer.",
        },
        {
          id: "tendon-faq-3",
          question: "Is tendon repair always necessary?",
          answer:
            "No. Selected Achilles ruptures and some degenerative tendon problems can be treated without surgery. The named tendon and functional loss decide.",
        },
        {
          id: "tendon-faq-4",
          question: "How long does a tendon take to heal?",
          answer:
            "Many repairs need several weeks of protected healing. Functional recovery often continues for months. Hand flexor repairs commonly need 6–12 weeks of protocol-based therapy.",
        },
        {
          id: "tendon-faq-5",
          question: "Will I need physiotherapy?",
          answer:
            "Usually yes. Controlled motion prevents adhesions; premature strengthening can rupture a repair.",
        },
        {
          id: "tendon-faq-6",
          question: "Can an old tendon injury still be treated?",
          answer:
            "Yes, but chronic gaps may need grafting, reconstruction or transfer rather than a simple suture. That product may sit on the hand-reconstruction sheet.",
        },
        {
          id: "tendon-faq-7",
          question: "Is grafting the same as repair?",
          answer:
            "No. Repair reconnects the patient's tendon. Grafting bridges a defect with additional tissue.",
        },
        {
          id: "tendon-faq-8",
          question: "When can I walk after Achilles repair?",
          answer:
            "Weight-bearing follows the surgeon's boot protocol. Pain easing is not permission to walk unsupported.",
        },
        {
          id: "tendon-faq-9",
          question: "Can a tendon rupture again?",
          answer:
            "Yes. Re-rupture is a recognised complication, especially if restrictions are ignored during healing.",
        },
        {
          id: "tendon-faq-10",
          question: "Which doctor performs tendon repair?",
          answer:
            "Depending on the tendon: a hand surgeon, sports-medicine surgeon, foot-and-ankle surgeon or another appropriately trained orthopaedic specialist.",
        },
        {
          id: "tendon-faq-11",
          question: "When can I fly after tendon repair?",
          answer:
            "Travel timing should be decided by the treating team after the splint or boot is fitted. Sudden chest pain, breathlessness or a swollen painful calf is an emergency-department problem, not a WhatsApp question.",
        },
        {
          id: "tendon-faq-12",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay may be short. Combined evaluation, surgery, splint teaching and early therapy usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "tendon-faq-13",
          question: "Does a rotator cuff tear use the generic tendon-repair price?",
          answer:
            "No. Named rotator cuff repair is a different sheet at $2,800–$7,000, not the generic $1,500–$5,000 tendon-repair band.",
        },
        {
          id: "tendon-faq-14",
          question: "Can children have tendon repair in India?",
          answer:
            "Yes. Paediatric lacerations and selected transfers use the paediatric tendon-repair-surgery sheet of $1,500–$5,000, not an adult hand list by default.",
        },
      ],
      imageAlt:
        "Adult anatomical hand specimen showing a zone II flexor tendon laceration inside the fibrous sheath",
      seoTitle: "Tendon Repair Surgery in India: Cost, Procedure & Recovery",
      metaDescription:
        "Learn about tendon repair surgery in India, including types of tendon injuries, surgical techniques, cost, recovery, rehabilitation, risks and how to choose a specialist.",
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

linkRelated(SHOULDER, LIMB_NEEDLE, ADDITION);
linkRelated(ACL, LIMB_NEEDLE, ADDITION);
linkRelated(KNEE_ARTHRO, LIMB_NEEDLE, ADDITION);
linkRelated(HIP_ARTHRO, LIMB_NEEDLE, ADDITION);
linkRelated(
  LIMB,
  "Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
  ADDITION,
);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [limb lengthening surgery in India](https://gaf.healthcare/treatments/limb-lengthening-surgery-in-india).",
    ", [limb lengthening surgery in India](https://gaf.healthcare/treatments/limb-lengthening-surgery-in-india) and [tendon repair surgery in India](https://gaf.healthcare/treatments/tendon-repair-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

const markdownUpdates: Array<[string, string]> = [
  ["scripts/shoulder-arthroscopy-treatment-body.md", LIMB_NEEDLE],
  ["scripts/acl-treatment-body.md", LIMB_NEEDLE],
  ["scripts/arthroscopy-treatment-body.md", LIMB_NEEDLE],
  ["scripts/hip-arthroscopy-treatment-body.md", LIMB_NEEDLE],
  [
    "scripts/limb-lengthening-treatment-body.md",
    "Shoulder keyhole work sits on [Shoulder Arthroscopy Surgery in India](/treatments/shoulder-arthroscopy-surgery-in-india).",
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
