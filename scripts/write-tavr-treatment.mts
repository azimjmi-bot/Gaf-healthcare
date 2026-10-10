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

const body = readFileSync(resolve("scripts/tavr-treatment-body.md"), "utf8").trim();
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
const existing = store.treatments.find((row) => row.slug === "tavr-in-india");
const now = "2026-09-29T09:30:00.000Z";
const SLUG = "tavr-in-india";
const PACEMAKER = "pacemaker-implantation-in-india";
const PCI = "coronary-angioplasty-in-india";
const ICD = "icd-device-implantation-in-india";
const PACEMAKER_NEEDLE =
  "Pacing after [TAVR/TAVI](/costs/India/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)) is quoted after valve records, not from the elective pacemaker sheet alone.";
const PACEMAKER_ADDITION =
  "Named TAVR lists sit on [TAVR in India](/treatments/tavr-in-india).";
const PCI_NEEDLE = "A stent is not a pacemaker.";
const PCI_ADDITION =
  "A stent is also not a transcatheter aortic valve. Named TAVR lists sit on [TAVR in India](/treatments/tavr-in-india).";

const treatment = {
  id: existing?.id ?? "d6f2b8c0-3e71-50af-2b4d-1f7a9e6c0d33",
  slug: SLUG,
  previousSlugs: [],
  baseName: "TAVR in India",
  specialtySlug: "cardiology",
  subspecialty: "Structural Heart",
  category: "TAVR/TAVI",
  image: "/uploads/treatments/tavr-transfemoral.webp",
  destinationSlugs: ["india"],
  doctorSlugs: [
    "dr-ashok-seth",
    "dr-amit-kumar-chaurasia",
    "dr-milind-phadke",
    "dr-dipak-patil",
    "dr-p-r-l-n-prasad",
    "dr-a-b-gopalamurugan",
    "dr-gobu-p",
    "dr-ajay-j-swamy",
    "dr-v-rajasekhar",
  ],
  hospitalSlugs: [
    "fortis-escorts-heart-institute",
    "artemis-hospital",
    "kims-hospitals-thane",
    "gleneagles-hospital-mumbai",
    "gleneagles-hospitals-bengaluru",
    "mgm-healthcare-chennai",
    "gleneagles-healthcity-chennai",
    "kims-hospitals-secunderabad",
    "yashoda-hospitals-hi-tech-city",
  ],
  costPageSlugs: [
    "tavr-tavi-transcatheter-aortic-valve-replacement",
    "aortic-valve-replacement",
    "heart-valve-replacement",
    "cabg-coronary-artery-bypass-grafting",
    "coronary-angioplasty-stenting",
    "pacemaker-implantation",
  ],
  relatedTreatmentSlugs: [PACEMAKER, PCI, ICD],
  status: "published" as const,
  featured: true,
  sortOrder: 26,
  createdAt: existing?.createdAt ?? now,
  updatedAt: now,
  translations: {
    en: {
      ...blankTranslation,
      status: "published" as const,
      name: "TAVR in India",
      shortDescription:
        "TAVR (TAVI) in India is planned from the named transcatheter aortic-valve product after echo, CT and Heart Team review — not a generic valve package.",
      editorialBody: body,
      process: [
        {
          id: "tavr-step-1",
          title: "Share medical records",
          description:
            "The patient provides echocardiography, CT if available, ECG, coronary reports and a short description of breathlessness, chest pain or fainting.",
        },
        {
          id: "tavr-step-2",
          title: "Heart Team review",
          description:
            "A structural-heart team reviews whether the target is TAVR, surgical AVR, combined coronary treatment or observation.",
        },
        {
          id: "tavr-step-3",
          title: "CT and echo planning",
          description:
            "Dedicated TAVR CT and echocardiography size the annulus, coronary height and femoral access rather than a brochure valve.",
        },
        {
          id: "tavr-step-4",
          title: "Valve and access selection",
          description:
            "The team names a balloon-expandable or self-expanding valve and a transfemoral or alternative access route.",
        },
        {
          id: "tavr-step-5",
          title: "Itemized estimate",
          description:
            "The hospital quotes the named sheet plus valve, cath-lab, ICU and stay, not a brochure overnight package.",
        },
        {
          id: "tavr-step-6",
          title: "Travel to India",
          description:
            "Stable planned cases travel after records review. New chest pain, fainting or severe breathlessness is a local emergency.",
        },
        {
          id: "tavr-step-7",
          title: "TAVR implantation",
          description:
            "The named valve is implanted through the planned access route and assessed for position, leak and coronary flow.",
        },
        {
          id: "tavr-step-8",
          title: "Rhythm and access monitoring",
          description:
            "The team watches the groin, heart rhythm, pacemaker need, stroke symptoms and valve function after the procedure.",
        },
        {
          id: "tavr-step-9",
          title: "Echo and follow-up plan",
          description:
            "Valve identification, echocardiogram, medicines and the surveillance schedule are confirmed before discharge.",
        },
        {
          id: "tavr-step-10",
          title: "Return home",
          description:
            "The patient leaves with a written summary covering the named valve, warning signs and local cardiology follow-up.",
        },
      ],
      preparation:
        "Share dedicated echocardiography and CT TAVR files, ECG and coronary reports so the team can judge TAVR versus surgical AVR versus combined coronary treatment versus observation.",
      recovery:
        "GAF planning notes 3-7 nights after TAVR. Access-site care, rhythm checks and echo continue after early mobilisation.",
      hospitalStay: "Typically 3-7 nights after TAVR",
      recoveryPeriod:
        "Gradual return to activity over several weeks according to the treating team, then lifelong valve follow-up.",
      followUp:
        "Request a written summary covering the named valve, implant details, echo report, pacemaker risk, medicines and the surveillance schedule after returning home.",
      importantConsiderations:
        "A brochure TAVR price is not a Heart Team plan. Planning ranges are not hospital quotations. New chest pain, fainting or severe breathlessness belongs in a local emergency department.",
      treatmentType: "Transcatheter aortic valve replacement",
      treatmentSetting: "Accredited partner hospitals in India",
      technology:
        "Balloon-expandable or self-expanding transcatheter aortic valves via transfemoral or alternative access according to CT anatomy",
      searchKeywords: [
        "TAVR in India",
        "TAVI in India",
        "TAVR cost in India",
        "TAVI cost in India",
        "transcatheter aortic valve replacement in India",
        "TAVR procedure in India",
        "aortic valve replacement without surgery",
        "TAVR treatment India",
      ],
      faqs: [
        {
          id: "tavr-faq-1",
          question: "How much does TAVR cost in India?",
          answer:
            "GAF planning is approximately $18,000-$42,000 for TAVR/TAVI. Named surgical aortic valve replacement is $7,000-$18,500 when surgery is the honest product.",
        },
        {
          id: "tavr-faq-2",
          question: "Is TAVI the same as TAVR?",
          answer:
            "Yes. TAVI and TAVR generally refer to the same transcatheter aortic valve procedure.",
        },
        {
          id: "tavr-faq-3",
          question: "How long is the hospital stay after TAVR?",
          answer:
            "GAF planning is typically 3-7 nights. Some hospital protocols quote a shorter stay after uncomplicated transfemoral TAVR.",
        },
        {
          id: "tavr-faq-4",
          question: "Does aortic stenosis always need TAVR?",
          answer:
            "No. A Heart Team must determine whether TAVR, surgical AVR or another approach is appropriate after echo, CT and overall fitness.",
        },
        {
          id: "tavr-faq-5",
          question: "Is TAVR open-heart surgery?",
          answer:
            "No. Conventional TAVR is a catheter-based procedure and generally does not require opening the chest.",
        },
        {
          id: "tavr-faq-6",
          question: "How long does a TAVR valve last?",
          answer:
            "Medium-term data including five-year outcomes are reassuring, but younger patients may outlive the strongest durability evidence. Lifelong follow-up is required.",
        },
        {
          id: "tavr-faq-7",
          question: "Do I need a pacemaker after TAVR?",
          answer:
            "Not necessarily. Some patients develop conduction abnormalities requiring permanent pacing, while many do not.",
        },
        {
          id: "tavr-faq-8",
          question: "Can international patients have TAVR in India?",
          answer:
            "Yes. Echo and CT files should generally be reviewed before travel. A case-specific quotation is more useful than an online average.",
        },
        {
          id: "tavr-faq-9",
          question: "Which city in India is best for TAVR?",
          answer:
            "There is no single best city. Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad are live GAF catalog cities. Choose the team with a Heart Team, CT planning and cardiac surgery backup.",
        },
        {
          id: "tavr-faq-10",
          question: "When should I go to an emergency department?",
          answer:
            "New chest pain, fainting, severe breathlessness or collapse belongs in a local emergency department, not in a WhatsApp message.",
        },
        {
          id: "tavr-faq-11",
          question: "How long should I stay in India?",
          answer:
            "Hospital stay is typically 3-7 nights. Combined evaluation, CT, Heart Team review and fitness to fly usually take longer. The treating hospital should set the timeline.",
        },
        {
          id: "tavr-faq-12",
          question: "Does surgical AVR use the TAVR sheet?",
          answer:
            "No. Named surgical aortic valve replacement is $7,000-$18,500 because open AVR is a different clinical product.",
        },
        {
          id: "tavr-faq-13",
          question: "Does valve-in-valve TAVR use the first-implant price?",
          answer:
            "Not by default. Valve-in-valve and alternative-access cases are quoted after Heart Team review rather than from the $18,000-$42,000 first-implant band.",
        },
        {
          id: "tavr-faq-14",
          question: "Can children use the adult TAVR sheet?",
          answer:
            "Not by default. Paediatric or congenital cases are quoted after specialist review rather than from the adult $18,000-$42,000 band.",
        },
      ],
      imageAlt:
        "Educational illustration of transfemoral TAVR from the groin to the aortic valve",
      seoTitle: "TAVR in India: Cost, Procedure, Risks & Recovery",
      metaDescription:
        "Learn about TAVR (TAVI) in India, including eligibility, USD cost, valve types, hospital stay, recovery and how a Heart Team chooses TAVR versus surgery.",
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

linkRelated(PACEMAKER, PACEMAKER_NEEDLE, PACEMAKER_ADDITION);
linkRelated(PCI, PCI_NEEDLE, PCI_ADDITION);

writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG);

const llmsPath = resolve("public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`treatments/${SLUG}`)) {
  llms = llms.replace(
    "and [ICD device implantation in India](https://gaf.healthcare/treatments/icd-device-implantation-in-india).",
    ", [ICD device implantation in India](https://gaf.healthcare/treatments/icd-device-implantation-in-india) and [TAVR in India](https://gaf.healthcare/treatments/tavr-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function patchMarkdown(path: string, needle: string, addition: string) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(`/treatments/${SLUG}`) && text.includes(needle)) {
    writeFileSync(path, text.replace(needle, `${needle} ${addition}`));
    console.log("updated", path);
  }
}

patchMarkdown(resolve("scripts/pacemaker-implantation-treatment-body.md"), PACEMAKER_NEEDLE, PACEMAKER_ADDITION);
patchMarkdown(resolve("scripts/coronary-angioplasty-treatment-body.md"), PCI_NEEDLE, PCI_ADDITION);
