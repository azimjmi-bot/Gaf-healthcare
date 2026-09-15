import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { toSlug } from "../../lib/taxonomy";

/**
 * Cancer operations that already ship a hand-written cost sheet (breast, upper GI,
 * colorectal, hepatobiliary, peritoneal) stay in their own modules. This bundle only
 * adds surgical oncology procedures that had no long-form article, so no procedure
 * receives a second canonical page.
 */
export const SURGICAL_ONCOLOGY_NEW_PROCEDURES = [
  "Thyroidectomy for Thyroid Cancer",
  "Neck Dissection",
  "Oral Cancer Surgery",
  "Lung Cancer Surgery",
  "Partial Nephrectomy",
  "Radical Prostatectomy",
  "Radical Cystectomy",
  "Radical Hysterectomy",
  "Lobectomy",
  "VATS Lung Surgery",
  "Robotic Thoracic Surgery",
  "Transoral Robotic Surgery (TORS)",
  "Microvascular Free Flap Reconstruction",
] as const;

export const SURGICAL_ONCOLOGY_PILOT_PROCEDURES = [
  "Thyroidectomy for Thyroid Cancer",
] as const;

type SurgicalOncologyProcedure = (typeof SURGICAL_ONCOLOGY_NEW_PROCEDURES)[number];

/**
 * Each field has one home in the rendered page. Where a second mention is unavoidable
 * (hero, Quick Answer, FAQ) the builder uses the short variants, so no paragraph is
 * restated on the same page.
 */
type SurgicalOncologyProfile = {
  procedure: SurgicalOncologyProcedure;
  shortName: string;
  specialist: string;
  /** One sentence a patient can read in isolation. */
  definition: string;
  /** Clinical situations in which the operation may be discussed. */
  candidacy: string;
  /** Region treated, and what the surgeon works to preserve. */
  anatomy: string;
  /** The scope decision that separates a limited operation from a radical one. */
  distinction: string;
  /** Answer-first version of the scope decision, one short sentence. */
  scopeShort: string;
  /** Cancer-specific planning: tissue diagnosis, imaging and nodal staging. */
  staging: string;
  /** How surgery is sequenced with systemic therapy and radiation. */
  sequencing: string;
  /** Which disciplines normally share the decision. */
  team: string;
  evaluation: string;
  technique: string;
  conversion: string;
  approaches: LabelledDetail[];
  /** Only where the access route genuinely differs for this operation. */
  access?: {
    name: string;
    access: string;
    method: string;
    resources: string;
    recovery: string;
    cost: string;
  }[];
  duration: string;
  /** Short stay metric for the Quick Answer strip. */
  stayGlance: string;
  admission: string;
  recovery: string;
  /** Margins, nodes, frozen section and molecular work. */
  pathology: string;
  risks: string;
  urgent: string;
  /** Function the operation can change permanently, stated plainly. */
  functionalChange: string;
  drivers: LabelledDetail[];
  records: string[];
  followUp: string;
  quoteQuestions: string[];
  related: string[];
  campusFocus: string;
  imageAlts: [string, string, string];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    arrival: string;
    lodging: string;
    localRecovery: string;
    pathwayNote: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate hospital corridors rather than one address. Confirm the operating campus before booking lodging, because crossing the region for a wound review or an unplanned reassessment takes far longer than a map suggests.",
    lodging:
      "Choose lift-accessible lodging near the named campus, with a private bathroom, room for a companion and a dependable night-time route back to the hospital.",
    localRecovery:
      "Winter air quality and summer heat can aggravate cough, dehydration and fatigue while a surgical wound heals. The team's instructions on mobility, hydration and wound care outrank any travel plan.",
    pathwayNote:
      "The region carries the largest number of listed campuses, so surgery, histopathology reporting, radiation planning and medical oncology review can often be arranged inside one geography.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable recovery bases. Peak traffic, harbour crossings and monsoon disruption matter when returning for a drain check, a pathology appointment or a worsening symptom.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital. Verify lift access, a nearby pharmacy, a private bathroom and transport that avoids prolonged standing.",
    localRecovery:
      "Humidity and monsoon travel make dry dressings, breathable clothing and a contingency night sensible. They do not change the clinical criteria for discharge or for clearing air travel.",
    pathwayNote:
      "Cancer surgery volumes are concentrated here and tumour-board discussion is routine, which matters most when a case is borderline resectable or has already had systemic treatment.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport sits well north of most hospital districts, so the first transfer is the longest of the five cities and cross-city traffic can turn a routine review into a long seated journey after surgery.",
    lodging:
      "A lift-accessible stay near the operating campus is more useful than an airport hotel. Plan simple meals, a companion and level walking space for early mobilisation.",
    localRecovery:
      "A mild climate makes short outdoor walks more comfortable during a multi-week stay, but it does not reduce the risk of bleeding, infection, chest complications or venous thromboembolism.",
    pathwayNote:
      "Several listed campuses keep cancer surgery, radiation and medical oncology in one building, which suits patients completing a whole sequence in a single visit.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several hospital corridors have comparatively direct airport access, which helps when a patient must return repeatedly. Heat and a car journey after major surgery still need a planned vehicle, a companion and the team's agreement.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with lift access, a private bathroom and a straightforward route back for fever, bleeding or escalating pain.",
    localRecovery:
      "Heat and humidity can worsen dehydration, constipation and fatigue after chest, abdominal or head and neck surgery. Follow the individualised fluid advice given at discharge.",
    pathwayNote:
      "The international patient corridor here is the longest established of the five cities, so interpreters, visa extension paperwork and attendant arrangements are administrative routine.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport lies south of the hospital belt. Jubilee Hills, Banjara Hills, Hi-Tech City and Secunderabad produce materially different transfer times, so confirm the surgical and follow-up campus before committing to lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging inside the response radius the team advises, with pharmacy access and a private bathroom.",
    localRecovery:
      "Summer heat and the long airport transfer compound post-operative fatigue. Plan indoor recovery, short supported walks and attendance at the pathology review before fixing a departure date.",
    pathwayNote:
      "Oncology capacity sits in a compact corridor, so a second surgical opinion between campuses rarely means changing accommodation or city.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range for the operation and its stated admission. It does not establish resectability, surgical scope, nodal plan, reconstruction, pathology depth or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact resection, nodal dissection, reconstruction, frozen-section policy, intensive-care assumption, ward nights and complication terms rather than a headline cancer-surgery package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not by itself establish case acceptance, multidisciplinary review, reconstructive cover or continuity of adjuvant treatment after the patient returns home.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Surgeon, facility, anaesthesia, consumable, histopathology and follow-up charges are frequently billed separately, so a single quoted figure may not be the comparable one.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the specific cancer, the planned resection and nodal scope and the expected admission. Subsidised local billing and private international billing differ.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, pathology scope and post-travel oncology follow-up need direct confirmation. Inpatient norms after major cancer surgery are often longer than in self-pay markets.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quotation boundaries, emergency access and who reviews final histology and decides adjuvant treatment once they have travelled home.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, anaesthesia, pathology and follow-up charges are usually separate, and [US_COST] is a comparison range for the operation rather than a bundled cancer-treatment quotation.",
  },
];

/** Qualitative bill lines. Deliberately distinct from `inclusions` so nothing is stated twice. */
const COST_COMPONENTS: LabelledDetail[] = [
  { label: "Surgeon and assistant fees", detail: "The named operating team." },
  { label: "Theatre and anaesthesia", detail: "Operating room time and anaesthesia." },
  { label: "Consumables and devices", detail: "Staplers, energy devices, drains, implants." },
  { label: "Ward and critical care", detail: "Room category and high-dependency nights." },
  { label: "Histopathology", detail: "Margin and nodal reporting." },
  { label: "Imaging and laboratory", detail: "Inpatient scans, tests, blood products." },
  { label: "Medicines during admission", detail: "Analgesia, antibiotics, thromboprophylaxis." },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  { label: "Preoperative assessment", detail: "Surgeon and anaesthesia review where itemized." },
  { label: "The consented operation", detail: "Surgeon, theatre, consented scope." },
  { label: "Anaesthesia and routine medicines", detail: "Anaesthesia and stated monitoring." },
  { label: "Hospital recovery as quoted", detail: "Stated ward nights and room category." },
  { label: "Routine histopathology", detail: "Standard specimen and nodal reporting." },
  { label: "Discharge documents", detail: "Operation note, summary, early review." },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  { label: "Changed resection scope", detail: "Wider excision, extra nodal levels, unlisted reconstruction." },
  { label: "Complications and escalation", detail: "Transfusion, intensive care, re-operation, longer stay." },
  { label: "Extended pathology", detail: "Frozen section, immunohistochemistry, molecular panels." },
  { label: "Adjuvant treatment", detail: "Chemotherapy, targeted therapy, radiotherapy, radioiodine." },
  { label: "Rehabilitation and devices", detail: "Therapy, prostheses, dental work, medicines." },
  { label: "Travel and living", detail: "Flights, visas, transport, lodging, companion." },
];

/**
 * FAQ answers lead with the directly extractable sentence. The full explanation stays
 * in the body section that owns it, so the page answers fast without restating itself.
 */
function lead(text: string) {
  return text.match(/^.*?\.(?=\s|$)/)?.[0] ?? text;
}

function cityGate(profile: SurgicalOncologyProfile, city: string) {
  return (
    `Doctor and hospital cards for ${city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
    "If that exact relationship is absent, cards must remain empty; a general Surgical Oncology or cancer-centre label cannot verify current case acceptance for this operation. That is a catalog gap, not a ranking or availability claim."
  );
}

function makeCities(profile: SurgicalOncologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate = cityGate(profile, place.city);
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broad cancer-surgery ecosystem, but this page does not infer that every listed campus performs ${profile.shortName} or accepts every referral. ${place.pathwayNote} ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.localRecovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Surgery Planning`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare resection scope, nodal plan, pathology, recovery and travel logistics.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or a final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.staging}`,
          `${place.pathwayNote} Confirm the named ${profile.specialist}, the exact operating campus, where histopathology is reported and which team reviews the result with you.`,
          `${place.arrival} ${place.lodging}`,
          gate,
          `Send complete oncology records before booking non-refundable travel to ${place.city}. A remote opinion can change after examination, repeat imaging, anaesthetic assessment or pathology review.`,
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither figure is a city tariff, an acceptance promise or a recommendation.`,
          `${profile.technique} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical and resource differences rather than premium upgrades.`,
          "Ask for the resection and nodal scope, the named surgeon, anaesthesia, pathology plan, ward nights, intensive-care assumption, complication terms, exclusions and follow-up in writing.",
          `Budget separately for travel through ${place.airport}, lodging near the campus, a companion, meals, take-home medicines and extra nights if pathology or recovery delays departure.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send the biopsy report, slides or blocks where your laboratory releases them, imaging files, prior treatment summaries and current laboratory results before travelling to ${place.city}.`,
          "Obtain written acceptance from a named surgeon, and confirm anaesthesia cover, blood bank access, intensive-care support and any reconstructive or rehabilitation service the plan needs.",
          `${profile.recovery} ${place.localRecovery} Travel home only after the team documents clinical stability and a written follow-up plan.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, operating surgeon, resection and nodal scope, frozen-section policy, pathology handover and an emergency contact in writing. General accreditation does not establish current capability for a specific cancer operation.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored, so an itemized provider estimate is required before you budget.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A named ${profile.specialist} should assess it, usually with multidisciplinary input. Cards appear only for exact live CMS relationships and are not rankings.`,
          },
          {
            q: `Where should an international patient recover in ${place.city}?`,
            a: `${place.lodging} ${place.arrival}`,
          },
          {
            q: "When can an international patient fly home?",
            a: `There is no universal date. ${profile.recovery} The treating team must document fitness to fly.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the planned resection and nodal scope, reconstruction where relevant, pathology, ward nights, intensive-care assumption and complication terms.`,
          },
        ],
      },
    };
  });
}

function createSurgicalOncologyArticle(profile: SurgicalOncologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const topDrivers = profile.drivers
    .slice(0, 4)
    .map((item) => item.label.toLowerCase())
    .join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-15",
    duration: profile.duration,
    recoveryGlance: profile.stayGlance,
    seoTitle: `${profile.procedure} Cost in India: Surgery, Recovery & Price Guide`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare resection scope, nodal dissection, pathology, recovery, hospitals and the international patient pathway.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} Understand the [INDIA_COST] planning range, how resection scope and nodal dissection change it, and what pathology, recovery and adjuvant treatment add.`,
    introduction: [
      profile.candidacy,
      `${profile.scopeShort} Two patients with the same diagnosis can therefore be quoted differently without either figure being wrong.`,
      "This page explains what the operation involves, what moves the estimate and which records a remote team needs. It cannot choose between surgery, systemic treatment, radiation or observation for an individual.",
      "[INDIA_COST], [US_COST] and [STAY] are planning tokens, not tariffs. Match any quotation to the planned resection, nodal scope, any reconstruction and the pathology performed.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. A useful estimate names the cancer treated, the exact resection and nodal scope, the operating surgeon, anaesthesia and facility fees, routine histopathology, ward nights and the early review. ${profile.scopeShort} Stored stay is [STAY], though discharge and clearance to fly follow individual recovery.`,
      `The variables that move the figure most are ${topDrivers}. Changed findings, complications or a longer admission produce a different bill.`,
      "Planning Range ≠ Final Hospital Quotation. Records review and qualified surgical, oncology and anaesthetic assessment come before any itemized offer.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}, not a fixed package. Replace it with an itemized quotation naming the ${profile.specialist}, the campus, the planned resection and nodal scope, the expected nights and the pathology plan.`,
      `Cost moves with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A limited resection is not comparable with radical surgery or with difficult anatomy after previous treatment.`,
      "Do not derive city tariffs from the national band. Keep [US_COST], flights, visas, transport, lodging, medicines, extra nights and a complication contingency in the same budget.",
      "Costing the operation alone is the commonest budgeting error, because pathology, adjuvant treatment and rehabilitation are separate pathways with separate estimates.",
    ],
    costComponents: COST_COMPONENTS,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two ${profile.shortName} estimates can assume different resection scope, nodal levels, frozen-section policy, intensive-care use and complication terms. Compare line items, not totals.`,
    inclusions: [
      ...COMMON_INCLUSIONS,
      { label: "Named operative plan", detail: `Only the stated ${profile.shortName} scope and approach are included.` },
    ],
    exclusions: COMMON_EXCLUSIONS,
    ...(profile.access
      ? {
          accessComparison: {
            heading: `Open, keyhole and robotic access for ${profile.procedure}`,
            intro: [
              "Access route is a clinical decision rather than a quality ladder, and the same resection can be completed by more than one route.",
            ],
            rows: profile.access,
          },
        }
      : {}),
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [profile.anatomy, profile.distinction],
      who: [
        `A qualified ${profile.specialist} must assess suitability, normally with multidisciplinary review. ${profile.team}`,
        "A remote opinion can change after examination and repeat imaging.",
      ],
      how: [profile.technique, `The specimen goes to histopathology. Theatre time is ${profile.duration}.`],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "Reconcile blood thinners, diabetes medicines, inhalers and allergies before travel. Consent should name the resection scope, the nodal plan and what findings could change either.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        profile.risks,
        `Seek urgent help for ${profile.urgent}.`,
      ],
    },
    topicSections: [
      {
        id: "cancer-specific-planning",
        heading: `Cancer-specific surgical planning for ${profile.procedure}`,
        paragraphs: [
          profile.staging,
          "Earlier chemotherapy, radiation or surgery alter tissue planes and operative risk, so those records matter as much as the current scan.",
        ],
      },
      {
        id: "scope-and-margins",
        heading: "Margins, lymph nodes and what pathology decides",
        paragraphs: [
          profile.pathology,
          "A cancer operation is judged on margin clearance and assessment of the nodes at risk, not on the size of the incision.",
        ],
      },
      {
        id: "technique-and-conversion",
        heading: "When the planned operation changes during surgery",
        paragraphs: [profile.conversion],
      },
      {
        id: "multidisciplinary-sequencing",
        heading: "Multidisciplinary care and treatment sequencing",
        paragraphs: [
          profile.sequencing,
          "Ask who owns each step and who decides the next one: treatment before surgery can change what operation is possible.",
        ],
      },
      {
        id: "function-and-rehabilitation",
        heading: "Function, rehabilitation and what may change permanently",
        paragraphs: [
          profile.functionalChange,
          "Rehabilitation is part of the treatment, yet it is frequently excluded from surgical estimates. Confirm what is included and what continues at home.",
        ],
      },
      {
        id: "recovery-and-travel",
        heading: "Follow-up, surveillance and international travel",
        paragraphs: [`${profile.followUp} Discharge from the ward is not the same as clearance to fly.`],
      },
    ],
    journey: [
      { label: "Submit records", detail: "Biopsy, imaging files, treatment summaries, laboratory results." },
      { label: "Specialist review", detail: `A named ${profile.specialist} reads imaging and pathology.` },
      { label: "Pathology verification", detail: "Local slide review can change diagnosis or grade." },
      { label: "Staging assessment", detail: "Remaining imaging or nodal sampling." },
      { label: "Multidisciplinary opinion", detail: "Surgery, oncology and pathology together." },
      { label: "Written treatment plan", detail: "Intent, resection scope, nodal plan, admission." },
      { label: "Itemized cost estimate", detail: "Surgery and stay quoted apart from adjuvant therapy." },
      { label: "Medical visa and travel", detail: "An invitation letter supports the visa." },
      { label: "Arrival and reassessment", detail: "Examination, repeat tests, anaesthetic clearance, consent." },
      { label: "Surgery", detail: `The consented ${profile.shortName} and planned monitoring.` },
      { label: "Monitored recovery", detail: "Ward care, mobilisation, wound and drain review." },
      { label: "Pathology review", detail: "Margins, nodes and further testing discussed." },
      { label: "Return home and handover", detail: "Documents, medicines, a named clinician for follow-up." },
    ],
    documents: [
      ...profile.records,
      "Imaging files on a disc or drive rather than screen photographs",
      "Paraffin blocks or slides where the home laboratory releases them",
      "Summaries of previous chemotherapy, immunotherapy, targeted therapy or radiation",
      "Operative notes from earlier cancer or regional surgery",
      "Current medicines, allergies and previous anaesthetic problems",
      "Recent blood count, kidney and liver results",
      "Passport, visa and companion details",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values are stored GAF catalog ranges. Other countries need direct quotations, because comparable cancer-surgery packages are not held in the catalog.",
      "A meaningful comparison holds diagnosis, resection and nodal scope, surgeon, facility, pathology depth and ward nights constant.",
    ],
    destinationNote:
      "Comparisons are indicative and may not represent identical operations. Tumour extent, added resection, complications, currency and length of stay change the final amount.",
    cityIntro: [
      "The five listed cities retain [INDIA_COST] because no verified city tariffs are stored. Their overlays add airport geography, climate, lodging and recovery logistics rather than local prices.",
      `Cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship, so missing mappings leave cards empty.`,
    ],
    whyIndia: [
      `Patients evaluate India for access to a named ${profile.specialist}, multidisciplinary cancer services in one city, and a self-pay planning range below the stored United States reference. Cost alone is not a clinical reason to travel.`,
      "What matters is individual acceptance, procedure-specific experience, intensive-care support, histopathology quality, reconstructive cover where relevant, and who continues adjuvant treatment.",
      "No provider is ranked here and no outcome is promised. Unstable illness, or treatment already under way locally, can make an elective trip inappropriate.",
    ],
    whyCostDiffers: [
      "This page carries a planning range. A hospital letter is an estimate written against a named operation, surgeon, room category and stated nights, so the two are not expected to match.",
      "If two hospitals quote differently, read the line items before assuming one is overcharging: one may include frozen section and immunohistochemistry while the other bills them later.",
      "A total medical trip costs more than the operation. Flights, visas, transport, lodging, an attendant, medicines, pathology and extra nights sit outside the surgical estimate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended, and what alternatives remain?`,
      "Is the intent curative or symptom control?",
      `Who is the named ${profile.specialist}, and at which campus?`,
      "What will be removed, and what will be preserved?",
      "What function may change permanently?",
      "What findings could change the consented scope?",
      "Was this case discussed at a tumour board?",
      "Is any treatment recommended before surgery?",
      "Which existing tests are accepted rather than repeated?",
      "Which surgeon, anaesthesia and facility fees are included?",
      "Which implants or consumables are assumed?",
      "Will frozen section be used, and is it included?",
      "Which histopathology and molecular tests are included?",
      "Is reconstruction inside this estimate?",
      "How are transfusion, intensive care and extra nights billed?",
      "How many nights and which room category are assumed?",
      "Which rehabilitation follows discharge?",
      "What warning signs need urgent review before I fly?",
      "When is histopathology ready, and who explains it?",
      "Who delivers adjuvant treatment if advised?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: "[INDIA_COST] is a national planning range rather than a quotation. Resection scope, nodal dissection, reconstruction, pathology depth and length of stay determine the final bill.",
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: "What decides how extensive the operation is?", a: lead(profile.distinction) },
      { q: "Which staging is needed before surgery?", a: lead(profile.staging) },
      { q: "Who may be considered for this operation?", a: lead(profile.candidacy) },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `Theatre time is ${profile.duration}. Findings and any reconstruction can change it.`,
      },
      { q: "How long is the hospital stay?", a: `${lead(profile.admission)} Clinical criteria, not a schedule, determine discharge.` },
      { q: "What are the important risks?", a: lead(profile.risks) },
      { q: "What may change permanently after this surgery?", a: lead(profile.functionalChange) },
      { q: "Will treatment be needed after the operation?", a: `${lead(profile.sequencing)} Final histopathology usually decides this.` },
      { q: "When can an international patient fly home?", a: `There is no fixed date. ${lead(profile.recovery)} The team must confirm fitness to fly.` },
      { q: "What follow-up is needed after returning home?", a: lead(profile.followUp) },
    ],
    doctorHeading: `Surgical oncologists to consider for ${profile.procedure} in India`,
    cityDoctorHeading: `Surgical oncologists for ${profile.procedure} in [CITY]`,
    doctorIntro:
      `Profiles appear only where ${profile.procedure} is an exact current CMS relationship. Placement is not a ranking or an outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact CMS relationships for ${profile.procedure}. Accreditation alone does not establish current case acceptance.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/surgical-oncology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: `Educational anatomy and resection-scope diagram for ${profile.shortName}.`,
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/surgical-oncology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Scope, nodal plan and technique depend on staging and consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/surgical-oncology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery and surveillance milestones vary between patients.",
        fit: "contain",
      },
    ],
  };
}

function oncologyDrivers(...specific: LabelledDetail[]): LabelledDetail[] {
  return [
    ...specific,
    { label: "Stage and local extent", detail: "Invasive disease lengthens surgery and widens the resection." },
    { label: "Previous cancer treatment", detail: "Earlier chemotherapy or radiation alters tissue planes and risk." },
    { label: "Pathology depth", detail: "Frozen section and molecular testing are separate charges." },
    { label: "Anaesthesia and medical risk", detail: "Comorbidity changes monitoring and length of stay." },
    { label: "Facility and admission scope", detail: "Ward and intensive-care nights are different scopes." },
    { label: "Unplanned escalation", detail: "A complication or return to theatre changes the episode." },
  ];
}

const profiles: SurgicalOncologyProfile[] = [
  {
    procedure: "Thyroidectomy for Thyroid Cancer",
    shortName: "thyroidectomy for thyroid cancer",
    specialist: "surgical oncologist or head and neck surgeon who operates on the thyroid",
    definition:
      "Thyroidectomy for thyroid cancer removes part or all of the thyroid gland to treat a proven or strongly suspected thyroid malignancy, sometimes with the lymph nodes of the central or lateral neck.",
    candidacy:
      "It is generally discussed when cytology indicates thyroid cancer, or when a known cancer is growing, pressing on the airway or has spread to neck nodes. Some very low-risk papillary cancers are instead monitored under specialist protocols.",
    anatomy:
      "The thyroid sits in two lobes in front of the windpipe. The recurrent laryngeal nerves that move the vocal cords run close behind it and the four parathyroid glands controlling calcium sit on or beside it, so preserving those structures is part of the operation.",
    distinction:
      "Lobectomy may suffice for a small, low-risk cancer in one lobe, while total thyroidectomy is usual for larger, multifocal or higher-risk disease and is what makes radioiodine treatment possible. Node levels are added only where staging shows involvement or material risk.",
    scopeShort:
      "Whether the plan is a lobectomy, a total thyroidectomy or a thyroidectomy with neck node dissection changes the operation and the bill.",
    staging:
      "Planning rests on neck ultrasound mapping the nodule and node levels, a fine-needle aspiration cytology category, and vocal cord assessment where voice change or extensive disease is suspected. Cross-sectional imaging is added for bulky disease and calcitonin testing where medullary cancer is suspected.",
    sequencing:
      "Surgery is usually the first treatment, with radioiodine, thyroid hormone suppression and occasionally external radiation or systemic therapy considered afterwards on the basis of final histopathology and risk category.",
    team:
      "Decisions usually involve the surgeon, a pathologist, a radiologist reading the ultrasound, an endocrinologist for hormone and calcium management, and a nuclear medicine physician where radioiodine is considered.",
    evaluation:
      "Assessment commonly includes thyroid function, calcium and vitamin D testing, the ultrasound map and cytology report, vocal cord assessment where indicated, and routine anaesthetic checks. Not every patient needs every test.",
    technique:
      "Through a low collar incision under general anaesthesia the surgeon identifies and protects the recurrent laryngeal nerves and parathyroid glands, divides the thyroid blood supply and removes the planned lobe or whole gland, dissecting node levels only where staging indicates.",
    conversion:
      "A lobectomy can become a total thyroidectomy if findings or frozen section show more extensive disease, and unexpected nodal involvement can extend the operation into a formal neck dissection. Consent and the quotation should both allow for that.",
    approaches: [
      { label: "Thyroid lobectomy", detail: "Removes the affected lobe and isthmus, sometimes preserving enough gland to avoid lifelong hormone replacement." },
      { label: "Total thyroidectomy", detail: "Removes the whole gland; normally required before radioiodine and usual for multifocal or higher-risk disease." },
      { label: "With central compartment dissection", detail: "Adds the node group around the trachea and oesophagus when those nodes are involved or at risk." },
      { label: "With lateral neck dissection", detail: "Adds lateral node levels when imaging or biopsy confirms disease there, lengthening surgery." },
      { label: "Nerve-monitored open surgery", detail: "Intraoperative nerve monitoring used alongside direct identification of the recurrent laryngeal nerve." },
    ],
    duration: "commonly 2–4 hours, longer when neck node levels are dissected",
    stayGlance: "Two to four nights typical",
    admission: "Admission is frequently two to four nights, watching airway safety, drain output, voice and calcium.",
    recovery:
      "Recovery is judged on calcium levels, voice, swallowing and wound healing rather than a fixed calendar, with hormone dosing reviewed once the gland is removed.",
    pathology:
      "The specimen is examined for tumour type, size, multifocality, extension beyond the capsule, vascular invasion and the number of involved nodes. That report, not the operation, decides whether radioiodine, hormone suppression targets or further surgery are advised.",
    risks:
      "Recognised risks include neck haematoma that can threaten the airway, temporary or permanent hoarseness from recurrent laryngeal nerve injury, temporary or permanent low calcium from parathyroid injury, wound infection, and after lateral dissection, shoulder discomfort or a chyle leak.",
    urgent:
      "rapid neck swelling, difficulty breathing, worsening voice change, tingling around the mouth or fingers, muscle cramps, fever or wound discharge",
    functionalChange:
      "Total thyroidectomy commits a patient to lifelong thyroid hormone replacement with regular blood monitoring. Voice change is usually temporary but can persist, and calcium supplementation is occasionally needed long term when parathyroid glands are damaged.",
    drivers: oncologyDrivers(
      { label: "Extent of thyroid resection", detail: "Lobectomy, total thyroidectomy and completion surgery are different operations." },
      { label: "Neck node dissection", detail: "Central or lateral dissection lengthens surgery, adds a drain and changes monitoring." },
      { label: "Nerve monitoring and devices", detail: "Nerve monitoring and energy devices are equipment charges that vary by campus." },
      { label: "Calcium and hormone management", detail: "Serial calcium testing, supplementation and hormone titration are often omitted from estimates." },
    ),
    records: [
      "Neck ultrasound report and images mapping the nodule and node levels",
      "Fine-needle aspiration cytology report with its reporting category",
      "Thyroid function, calcium and vitamin D results",
    ],
    followUp:
      "A local endocrinologist or oncologist should receive the operation note, discharge summary and histopathology, then manage hormone dosing, calcium, thyroglobulin monitoring, neck ultrasound surveillance and any radioiodine decision.",
    quoteQuestions: [
      "Is the plan a lobectomy or a total thyroidectomy, and what would change it during surgery?",
      "Are central or lateral neck nodes included in this estimate?",
      "Is radioiodine treatment quoted separately, and who arranges it?",
    ],
    related: ["Neck Dissection", "Sentinel Lymph Node Biopsy", "External Beam Radiotherapy (EBRT)", "Targeted Therapy"],
    campusFocus:
      "Confirm the named surgeon, whether nerve monitoring is used, where histopathology is reported, and which team manages calcium and hormone replacement after discharge.",
    imageAlts: [
      "Medical illustration of thyroid anatomy for cancer surgery: the two lobes in front of the trachea, the recurrent laryngeal nerves behind the gland, the parathyroid glands, and the central and lateral neck node levels.",
      "Medical infographic comparing thyroid lobectomy, total thyroidectomy and total thyroidectomy with central compartment node dissection, noting nerve and parathyroid preservation as part of each operation.",
      "Medical infographic of the thyroid cancer recovery pathway: airway and drain observation, voice and calcium monitoring, histopathology, hormone replacement, the radioiodine decision and long-term surveillance.",
    ],
  },
  {
    procedure: "Neck Dissection",
    shortName: "neck dissection",
    specialist: "head and neck surgical oncologist",
    definition:
      "Neck dissection is the systematic removal of lymph node groups from the neck to treat or stage cancer that has spread, or is at material risk of spreading, from a head and neck primary tumour.",
    candidacy:
      "It is generally considered when imaging or biopsy confirms cancer in neck nodes, or when a primary tumour of the mouth, throat, larynx, thyroid or skin carries enough risk of hidden nodal spread that the levels are removed for staging.",
    anatomy:
      "Neck nodes are described in levels from level one under the chin and jaw to level five at the back of the neck. Running through them are the nerve that lifts the shoulder, the nerve to the lower lip, the large neck vein, the nerve to the tongue and, on the left, the thoracic duct.",
    distinction:
      "A selective dissection removes only the levels at risk for that primary site; a modified radical dissection removes levels one to five while preserving the shoulder nerve, vein or muscle; a radical dissection removes those structures when tumour involves them.",
    scopeShort:
      "Which node levels are removed, whether one side or both, and what is preserved change the operation and the bill.",
    staging:
      "Planning depends on the primary tumour site, which predicts the levels at risk, together with cross-sectional imaging of the neck, ultrasound-guided sampling of suspicious nodes and, in selected early oral cancers, sentinel node assessment. Chest imaging is often added.",
    sequencing:
      "Neck dissection is commonly performed with removal of the primary tumour in the same operation, and nodal pathology frequently determines whether postoperative radiotherapy, with or without chemotherapy, is recommended.",
    team:
      "Planning normally involves the surgeon, a radiologist, a pathologist, a radiation oncologist, a medical oncologist where systemic treatment applies, and physiotherapy and speech services for rehabilitation.",
    evaluation:
      "Assessment commonly includes examination of the primary site and neck, cross-sectional imaging, nodal sampling, dental review where radiation is anticipated, nutritional review and routine anaesthetic checks.",
    technique:
      "Through a neck crease incision the surgeon raises skin flaps, then removes the fibrofatty tissue containing the planned node levels as intact blocks while preserving the shoulder, lip and tongue nerves and major vessels where disease allows. Drains are usually placed and levels labelled separately.",
    conversion:
      "A selective dissection may be extended to further levels, or structures removed, if tumour is found adherent to a nerve, vein or muscle during surgery. Consent should state that possibility explicitly.",
    approaches: [
      { label: "Selective neck dissection", detail: "Removes only the levels predicted to be at risk for the specific primary site." },
      { label: "Modified radical neck dissection", detail: "Removes levels one to five while preserving the shoulder nerve, large vein or muscle." },
      { label: "Radical neck dissection", detail: "Removes levels one to five with the vein, muscle and shoulder nerve when preservation is unsafe." },
      { label: "Central compartment dissection", detail: "Addresses nodes around the trachea and oesophagus, most often alongside thyroid cancer surgery." },
      { label: "Salvage neck dissection", detail: "For nodal disease persisting or recurring after earlier radiation or surgery, in harder tissue planes." },
    ],
    duration: "commonly 2–5 hours for the neck component, longer when combined with removal of the primary tumour",
    stayGlance: "Three to six nights typical",
    admission: "Admission is frequently three to six nights, driven by drain output, wound healing and shoulder movement.",
    recovery:
      "Recovery focuses on wound and drain care, neck and shoulder stiffness, numbness over the neck and ear, and early physiotherapy rather than a fixed timetable.",
    pathology:
      "Each level is examined separately for the number of involved nodes, the size of deposits and whether tumour has broken through the node capsule. Those findings are among the strongest determinants of whether postoperative radiotherapy or chemoradiotherapy is advised.",
    risks:
      "Recognised risks include bleeding, wound infection or flap problems, fluid collection under the flap, numbness of the neck and earlobe, shoulder weakness and stiffness if the accessory nerve is injured, lower lip or tongue weakness, and a chyle leak from the thoracic duct after left-sided dissection.",
    urgent:
      "expanding neck swelling, difficulty breathing, milky or high-volume drain fluid, fever, wound discharge, or sudden inability to lift the arm",
    functionalChange:
      "Permanent numbness over part of the neck and ear is common. Shoulder movement and strength can be affected long term, particularly after more extensive dissection, so physiotherapy is an expected part of treatment.",
    drivers: oncologyDrivers(
      { label: "Number and extent of node levels", detail: "A selective two-level dissection and a bilateral modified radical dissection differ greatly." },
      { label: "One side or both sides", detail: "Bilateral dissection lengthens theatre time, adds drains and usually extends the stay." },
      { label: "Combination with primary tumour surgery", detail: "Resecting the primary at the same sitting changes theatre time and pathology work." },
      { label: "Nerve preservation and repair", detail: "Working tumour off a nerve or vessel adds time and sometimes a second team." },
    ),
    records: [
      "Biopsy or cytology confirming nodal disease and the primary diagnosis",
      "Cross-sectional imaging of the neck with image files, and chest imaging where performed",
      "Endoscopy or examination notes describing the primary tumour site",
    ],
    followUp:
      "The home team should receive the operation note, level-by-level pathology and discharge summary, then coordinate radiotherapy or chemoradiotherapy where advised, shoulder physiotherapy, and clinical and imaging surveillance of the neck.",
    quoteQuestions: [
      "Which node levels are planned, and is the dissection one-sided or bilateral?",
      "Is the primary tumour being resected in the same operation and estimate?",
      "Is shoulder physiotherapy included after discharge?",
    ],
    related: ["Oral Cancer Surgery", "Thyroidectomy for Thyroid Cancer", "Sentinel Lymph Node Biopsy", "Intensity-Modulated Radiotherapy (IMRT)"],
    campusFocus:
      "Confirm the named surgeon, which levels are planned, whether the primary tumour is addressed at the same sitting, and which physiotherapy and radiation services that campus provides.",
    imageAlts: [
      "Medical illustration of neck lymph node levels one to five for dissection planning, marking the spinal accessory nerve, internal jugular vein, marginal mandibular nerve and thoracic duct as structures preserved where disease allows.",
      "Medical infographic comparing selective neck dissection of the levels at risk, modified radical dissection preserving the shoulder nerve, vein and muscle, and radical dissection removing those structures.",
      "Medical infographic of the neck dissection recovery pathway: drain and wound monitoring, level-by-level histopathology, the postoperative radiotherapy decision, shoulder physiotherapy and neck surveillance.",
    ],
  },
  {
    procedure: "Oral Cancer Surgery",
    shortName: "oral cancer surgery",
    specialist: "head and neck surgical oncologist",
    definition:
      "Oral cancer surgery removes a cancer of the mouth — most often the tongue, inner cheek, floor of the mouth or gum and jaw — with a margin of healthy tissue, frequently alongside neck lymph node surgery and reconstruction.",
    candidacy:
      "It is generally considered when biopsy confirms cancer of the oral cavity and imaging suggests the tumour can be removed with a clear margin while leaving function that can be rehabilitated. Very advanced disease may be treated with chemoradiotherapy or symptom-directed care instead.",
    anatomy:
      "The oral cavity includes the tongue, floor of the mouth, inner cheek, hard palate and the gum and jawbone. Tumours are assessed for depth of invasion, closeness to the jawbone, and whether they approach the nerves supplying the tongue, lip and chin.",
    distinction:
      "A small tumour may be excised through the mouth and closed directly, while a deeper tumour may need a composite resection with part of the jaw removed and a free tissue flap to rebuild what is taken. How much tissue must go for a clear margin drives the plan.",
    scopeShort:
      "Whether the tumour is excised through the mouth or needs jaw resection and flap reconstruction changes the operation and the bill.",
    staging:
      "Planning uses the biopsy report, examination of the tumour and neck, and cross-sectional imaging of the mouth, jaw, neck and chest. Depth of invasion and proximity to bone are central to both the resection and the decision to dissect neck nodes.",
    sequencing:
      "Surgery is usually the primary treatment when the tumour is resectable. Final pathology — margins, depth, nodal involvement and whether tumour has broken out of a node — determines whether postoperative radiotherapy or chemoradiotherapy follows.",
    team:
      "Care normally involves the surgeon, a reconstructive surgeon where a flap is planned, a pathologist reading margins, radiation and medical oncologists, a maxillofacial prosthodontist, and speech, swallow and nutrition services.",
    evaluation:
      "Assessment commonly includes examination under anaesthesia where needed, imaging, dental review before any radiation, nutritional review because eating is often already impaired, a speech and swallow baseline, and airway planning with the anaesthetist.",
    technique:
      "Under general anaesthesia, with a tracheostomy in selected cases to secure the airway, the surgeon removes the tumour with a measured three-dimensional margin, sends margins for frozen section where that guides further excision, addresses the neck nodes as planned, and closes the defect directly or with a graft, local flap or free tissue transfer.",
    conversion:
      "The resection may be widened if frozen-section margins return positive, and a planned direct closure may become a flap reconstruction if the defect is larger than expected. Consent should cover tracheostomy, feeding tube placement and a change of reconstruction plan.",
    approaches: [
      { label: "Transoral wide local excision", detail: "Removes a smaller tumour through the mouth with primary closure or a graft." },
      { label: "Marginal mandibulectomy", detail: "Takes the inner rim of jawbone when disease abuts but does not invade it." },
      { label: "Segmental mandibulectomy", detail: "Removes an invaded jaw segment, requiring bony reconstruction for contour." },
      { label: "Resection with free flap reconstruction", detail: "Transfers tissue with its own blood supply to rebuild tongue bulk or jaw." },
      { label: "Resection with neck dissection", detail: "Adds staging or treatment of the node levels draining the mouth." },
    ],
    duration: "commonly 3–6 hours with neck surgery, and substantially longer when microvascular reconstruction is performed",
    stayGlance: "Five to ten nights typical",
    admission: "Admission is frequently five to ten nights, and longer after free flap reconstruction because flap monitoring, airway safety and feeding happen in hospital.",
    recovery:
      "Recovery is led by airway safety, flap viability where one was used, nutrition through a feeding tube if needed, and graded speech and swallowing therapy rather than a fixed date.",
    pathology:
      "The specimen is examined for margin clearance in three dimensions, depth of invasion, bone involvement, perineural and vascular spread, and the number and character of involved neck nodes. Those results drive the radiation and chemotherapy decision.",
    risks:
      "Recognised risks include bleeding, infection, wound breakdown, partial or complete flap failure needing further surgery, a leak between mouth and neck, altered speech and swallowing, numbness of the tongue, lip or chin, jaw stiffness, donor-site problems and feeding tube dependence.",
    urgent:
      "difficulty breathing, bleeding from the mouth or wound, colour or temperature change in a reconstructed area, fever, neck swelling, inability to swallow saliva, or saliva leaking through the neck wound",
    functionalChange:
      "Speech, chewing and swallowing are commonly affected, sometimes permanently, so rehabilitation is part of treatment rather than an afterthought. Numbness of the tongue, lip or chin can be permanent, and dental rehabilitation is often needed after jaw surgery or radiation.",
    drivers: oncologyDrivers(
      { label: "Size, depth and bone involvement", detail: "A transoral excision and a composite resection with jaw removal differ greatly." },
      { label: "Reconstruction method", detail: "Direct closure, local flap and free flap differ in time and team size." },
      { label: "Airway and feeding support", detail: "Tracheostomy and feeding tube placement add nursing intensity and inpatient days." },
      { label: "Frozen-section margin assessment", detail: "Intraoperative margin checks add same-day pathology cost and theatre time." },
      { label: "Speech, swallow and dental rehabilitation", detail: "Therapy, nutrition support and prosthetic work are frequently excluded." },
    ),
    records: [
      "Biopsy report confirming oral cavity cancer and its histological type",
      "Cross-sectional imaging of the mouth, jaw and neck with image files",
      "Dental assessment and records of any prior head and neck radiation",
    ],
    followUp:
      "The home team should receive the operation note, margin and nodal pathology and discharge summary, then coordinate postoperative radiotherapy where advised, continuing speech and swallow therapy, nutritional support, dental rehabilitation and surveillance of the mouth and neck.",
    quoteQuestions: [
      "What reconstruction is planned, and is a second surgical team included in the estimate?",
      "Are tracheostomy and feeding tube placement included if they become necessary?",
      "Is speech, swallow and dental rehabilitation included or billed separately?",
    ],
    related: ["Neck Dissection", "Microvascular Free Flap Reconstruction", "Intensity-Modulated Radiotherapy (IMRT)", "Neoadjuvant Chemotherapy"],
    campusFocus:
      "Confirm the named surgeon, whether microvascular reconstruction is performed on that campus, the frozen-section arrangement, and which speech, swallow, nutrition and dental services are available.",
    imageAlts: [
      "Medical illustration of oral cavity anatomy for cancer surgery: tongue, floor of mouth, inner cheek, hard palate and mandible, with a tongue tumour, the planned resection margin around it, and the draining neck node levels.",
      "Medical infographic comparing transoral wide local excision, marginal mandibulectomy, segmental mandibulectomy with bony reconstruction and free flap reconstruction, alongside frozen-section margin assessment.",
      "Medical infographic of the oral cancer recovery pathway: airway and tracheostomy care, flap monitoring, feeding tube nutrition, margin histopathology, radiotherapy decision, speech therapy and dental rehabilitation.",
    ],
  },
  {
    procedure: "Lung Cancer Surgery",
    shortName: "lung cancer surgery",
    specialist: "thoracic surgical oncologist",
    definition:
      "Lung cancer surgery removes the part of the lung containing the tumour — most often a lobe, sometimes a smaller anatomical segment or an entire lung — together with the mediastinal lymph nodes needed to stage the disease accurately.",
    candidacy:
      "It is generally considered for early-stage non-small cell lung cancer that appears confined to the lung and accessible nodes, in a patient whose lung and cardiac function can tolerate losing lung tissue. Extensive mediastinal or distant disease is usually treated systemically.",
    anatomy:
      "The right lung has three lobes and the left has two, each with its own bronchus, artery and veins. An anatomical resection divides those structures at their origin and removes the lobe or segment as a unit, while the mediastinal node stations beside the airway are sampled for staging.",
    distinction:
      "Segmentectomy preserves function for a small peripheral tumour, lobectomy remains the standard anatomical resection, sleeve resection can avoid removing a whole lung when the airway is involved, and pneumonectomy is kept for tumours that cannot otherwise be cleared.",
    scopeShort:
      "Whether the plan is a segmentectomy, a lobectomy, a sleeve resection or a pneumonectomy changes the operation and the bill.",
    staging:
      "Planning requires tissue diagnosis, cross-sectional and metabolic imaging, and mediastinal node assessment, usually by ultrasound-guided sampling through the airway beforehand. Brain imaging is added where indicated, and lung function and cardiac testing decide whether the planned resection is tolerable.",
    sequencing:
      "Some tumours receive chemotherapy, immunotherapy or chemoradiotherapy before surgery to improve resectability. Pathology of the resected lung and nodes, including molecular and immune marker testing, then decides whether adjuvant chemotherapy, targeted therapy or immunotherapy is advised.",
    team:
      "Planning normally involves the thoracic surgeon, a respiratory physician performing airway staging, a radiologist, a molecular pathologist, medical and radiation oncologists, a thoracic anaesthetist and a physiotherapist.",
    evaluation:
      "Assessment commonly includes pulmonary function testing, oxygenation, cardiac evaluation, exercise testing where lung function is borderline, smoking cessation support and routine anaesthetic checks.",
    technique:
      "Under general anaesthesia with one lung ventilated, the surgeon enters the chest through keyhole ports, a robotic platform or an open thoracotomy, divides the artery, vein and bronchus of the target lobe, removes the specimen, dissects the mediastinal node stations and places chest drains.",
    conversion:
      "A keyhole or robotic operation may be converted to open thoracotomy for bleeding, dense adhesions or a tumour more central than imaging suggested, and a planned segmentectomy may become a lobectomy if margins or nodes require it.",
    // Access routes live in the comparison table below, so this list stays on resection scope.
    approaches: [
      { label: "Anatomical segmentectomy", detail: "Removes one segment to preserve function for small peripheral tumours." },
      { label: "Lobectomy", detail: "Removes the whole lobe with its bronchus and vessels; the standard resection." },
      { label: "Sleeve resection", detail: "Reconstructs the airway so a whole lung need not be removed." },
      { label: "Pneumonectomy", detail: "Removes an entire lung when a tumour cannot be cleared otherwise." },
      { label: "Mediastinal nodal dissection", detail: "Node stations sampled or cleared with the resection for staging." },
    ],
    access: [
      {
        name: "Video-assisted thoracoscopic surgery",
        access: "Small ports between the ribs",
        method: "Camera and long instruments, same anatomical resection",
        resources: "Endoscopic staplers, single-lung ventilation",
        recovery: "Often less chest wall pain; drain duration still governs discharge",
        cost: "Consumable-heavy; compare at equal resection scope",
      },
      {
        name: "Robotic-assisted thoracic surgery",
        access: "Ports with a surgeon-controlled console",
        method: "Articulated instruments and magnified vision",
        resources: "Robotic platform time, single-use instruments",
        recovery: "Broadly similar to keyhole surgery",
        cost: "Usually the highest equipment component",
      },
      {
        name: "Open thoracotomy",
        access: "Chest wall incision with rib spreading",
        method: "Direct handling of airway and vessels",
        resources: "Standard thoracic instrumentation",
        recovery: "More chest wall discomfort; physiotherapy matters more",
        cost: "Lower equipment cost; stay and analgesia may rise",
      },
    ],
    duration: "commonly 2–5 hours, longer for sleeve resection, chest wall involvement or dense adhesions",
    stayGlance: "Five to ten nights typical",
    admission: "Admission is frequently five to ten nights, governed mainly by air leak and chest drain duration.",
    recovery:
      "Recovery is led by chest drain removal, breathing exercises, pain control that allows coughing and graded activity rather than a fixed date, with breathlessness on exertion improving gradually.",
    pathology:
      "The specimen is examined for tumour type and size, margin clearance, pleural or chest wall involvement and the node stations involved. Molecular and immune marker testing on the same specimen guides adjuvant targeted therapy or immunotherapy.",
    risks:
      "Recognised risks include a prolonged air leak needing the chest drain for longer than planned, pneumonia, irregular heart rhythm, bleeding, empyema, a bronchial stump leak, persistent chest wall pain or numbness, reduced exercise tolerance and venous thromboembolism.",
    urgent:
      "worsening breathlessness, fever, productive cough, chest pain, palpitations, bleeding, wound discharge, or sudden air under the skin of the chest or neck",
    functionalChange:
      "Removing lung tissue permanently reduces respiratory reserve, and how much is noticed depends on baseline lung function and the extent of resection. Chest wall discomfort can persist for months, and pulmonary rehabilitation materially influences recovery.",
    drivers: oncologyDrivers(
      { label: "Extent of lung resection", detail: "Segmentectomy, lobectomy, sleeve resection and pneumonectomy differ in time and monitoring." },
      { label: "Surgical access and platform", detail: "Keyhole, robotic and open access carry different equipment costs." },
      { label: "Mediastinal staging already performed", detail: "Airway nodal sampling is usually a separate earlier procedure with its own estimate." },
      { label: "Chest drain duration and air leak", detail: "A prolonged air leak is the commonest reason an admission overruns." },
      { label: "Molecular and immune marker testing", detail: "Mutation panels and immune markers are separate pathology charges." },
    ),
    records: [
      "Biopsy or cytology report confirming lung cancer and its subtype",
      "Chest and whole-body imaging including metabolic imaging, with image files",
      "Pulmonary function tests, cardiac assessment and any airway nodal staging reports",
    ],
    followUp:
      "The home team should receive the operation note, nodal and molecular pathology and discharge summary, then coordinate adjuvant chemotherapy, targeted therapy or immunotherapy where advised, pulmonary rehabilitation, smoking cessation support and imaging surveillance.",
    quoteQuestions: [
      "What resection is planned, and what would make it larger during surgery?",
      "Has mediastinal nodal staging been completed, and is it inside this estimate?",
      "How are extra chest drain days or a high-dependency night billed?",
    ],
    related: ["EBUS (Endobronchial Ultrasound)", "Bronchoscopy", "Adjuvant Chemotherapy", "Stereotactic Body Radiotherapy (SBRT)"],
    campusFocus:
      "Confirm the named thoracic surgeon, the planned surgical access, whether airway nodal staging is done on that campus, the availability of molecular pathology, and what physiotherapy support follows surgery.",
    imageAlts: [
      "Medical illustration of lung anatomy for cancer surgery: three right and two left lobes with their bronchus, artery and vein, a peripheral tumour in one lobe, and the mediastinal node stations sampled for staging.",
      "Medical infographic comparing anatomical segmentectomy, lobectomy, sleeve resection reconstructing the airway to avoid removing a whole lung, and pneumonectomy, alongside keyhole, robotic and open access routes.",
      "Medical infographic of the lung cancer recovery pathway: chest drain and air leak monitoring, breathing exercises, nodal and molecular histopathology, the adjuvant therapy decision and pulmonary rehabilitation.",
    ],
  },
  {
    procedure: "Partial Nephrectomy",
    shortName: "partial nephrectomy",
    specialist: "urologic oncologist or surgical oncologist who operates on the kidney",
    definition:
      "Partial nephrectomy removes a kidney tumour with a rim of healthy tissue while leaving the rest of that kidney in place, so remaining kidney function is preserved whenever oncology and anatomy allow.",
    candidacy:
      "It is generally considered for a localised kidney mass that can be removed with a clear margin while leaving a useful remnant. A radical nephrectomy is the honest alternative when the tumour, its location or the remaining kidney make organ preservation unsafe.",
    anatomy:
      "Each kidney sits behind the abdominal cavity with an artery, vein and collecting system entering at the hilum. Tumours are judged by size, depth, nearness to the collecting system and vessels, and whether a second kidney is present and working.",
    distinction:
      "A small polar tumour may be excised with little ischaemia, while a central or endophytic mass may need longer vessel clamping, collecting-system repair and a higher chance of converting to radical nephrectomy. How much kidney can be saved without leaving tumour behind drives the plan.",
    scopeShort:
      "Whether a useful remnant can be preserved, how long the vessels are clamped, and whether conversion to radical nephrectomy is needed change the operation and the bill.",
    staging:
      "Planning uses cross-sectional imaging of both kidneys, chest imaging for staging, and kidney-function tests. Biopsy is used selectively when the result would change whether surgery is offered. The opposite kidney’s function matters as much as the tumour’s appearance.",
    sequencing:
      "Surgery is usually the first treatment for a resectable mass. Final pathology — tumour type, grade, margin and any vascular invasion — then decides surveillance intensity and whether systemic therapy is discussed.",
    team:
      "Planning normally involves the operating surgeon, a radiologist, a pathologist, a nephrologist when remaining kidney function is already reduced, and a medical oncologist where systemic options apply.",
    evaluation:
      "Assessment commonly includes kidney function, blood pressure review, cross-sectional imaging, anaesthetic checks and, where kidney function is borderline, a discussion of dialysis risk. Not every patient needs every test.",
    technique:
      "The kidney is mobilised through keyhole ports, a robotic platform or an open incision, the tumour is marked, the artery is often clamped, the mass is excised with a margin, the collecting system and vessels are repaired, and the remnant is closed. Warm-ischaemia time is recorded.",
    conversion:
      "A planned partial nephrectomy may become a radical nephrectomy if bleeding, an unexpected tumour extent or an unreconstructable collecting system makes preservation unsafe. Consent and the quotation should both allow for that.",
    approaches: [
      { label: "Open partial nephrectomy", detail: "Direct access, often chosen for complex, central or previously operated kidneys." },
      { label: "Laparoscopic partial nephrectomy", detail: "Keyhole excision and repair of selected polar or exophytic tumours." },
      { label: "Robotic-assisted partial nephrectomy", detail: "A surgeon-controlled platform for the same nephron-sparing resection and reconstruction." },
      { label: "Off-clamp or selective clamping", detail: "Reduces ischaemia to the remnant when tumour location allows." },
      { label: "Conversion to radical nephrectomy", detail: "Removes the whole kidney when a safe remnant cannot be left." },
    ],
    duration: "commonly 2–4 hours, longer for central tumours or prior kidney surgery",
    stayGlance: "Three to six nights typical",
    admission: "Admission is frequently three to six nights, watching drain output, urine colour and kidney function.",
    recovery:
      "Recovery is led by pain control, early walking, monitoring of urine and kidney function, and a period of lighter activity rather than a fixed date, with heavy lifting delayed until the team agrees.",
    pathology:
      "The specimen is examined for tumour type, grade, margin and vascular or collecting-system involvement. That report, not the incision, decides surveillance and whether systemic therapy is discussed.",
    risks:
      "Recognised risks include bleeding, urine leak from the collecting system, reduced kidney function, need to remove the whole kidney, infection, bowel or vessel injury, and a later rise in blood pressure.",
    urgent:
      "heavy blood in the urine, rapidly increasing abdominal swelling, fever, inability to pass urine, sudden breathlessness, or wound discharge",
    functionalChange:
      "Some loss of kidney function is expected even when a remnant is saved, and the amount depends on how much tissue is removed and how long the vessels are clamped. Lifelong kidney-function and blood-pressure review is part of follow-up.",
    drivers: oncologyDrivers(
      { label: "Tumour complexity and remnant", detail: "A polar excision and a central reconstruction with collecting-system repair differ greatly." },
      { label: "Ischaemia and reconstruction", detail: "Clamp time, collecting-system repair and conversion to radical nephrectomy change theatre time." },
      { label: "Surgical platform", detail: "Open, keyhole and robotic access carry different equipment and consumable costs." },
      { label: "Remaining kidney function", detail: "Borderline function may add nephrology review, longer observation and dialysis contingency." },
    ),
    records: [
      "Cross-sectional imaging of both kidneys with image files",
      "Recent kidney-function results and blood-pressure record",
      "Biopsy report if one has already been performed",
    ],
    followUp:
      "The home team should receive the operation note, pathology and kidney-function trend, then coordinate imaging surveillance of the remnant, blood-pressure and kidney-function review, and any systemic-therapy discussion.",
    quoteQuestions: [
      "Is a useful remnant expected, and what would convert this to a radical nephrectomy?",
      "How is warm-ischaemia time recorded, and is collecting-system repair assumed?",
      "Is robotic or keyhole access included, or quoted as a separate platform charge?",
    ],
    related: ["Radical Nephrectomy", "Radical Cystectomy", "Targeted Therapy"],
    campusFocus:
      "Confirm the named kidney surgeon, whether a robotic platform is used, how conversion to radical nephrectomy is billed, and which laboratory follows remnant kidney function.",
    imageAlts: [
      "Medical illustration of kidney anatomy for partial nephrectomy: cortex, collecting system and hilum, a polar tumour with its planned parenchymal margin, and the artery that may be clamped during excision.",
      "Medical infographic comparing polar excision with a preserved remnant, central tumour reconstruction with collecting-system repair, off-clamp technique, and conversion to radical nephrectomy when a remnant cannot be saved.",
      "Medical infographic of the partial nephrectomy recovery pathway: drain and urine monitoring, kidney-function checks, histopathology, remnant surveillance imaging and long-term blood-pressure review.",
    ],
  },
  {
    procedure: "Radical Prostatectomy",
    shortName: "radical prostatectomy",
    specialist: "urologic oncologist",
    definition:
      "Radical prostatectomy removes the prostate gland and seminal vesicles to treat localised prostate cancer, with the pelvic lymph nodes taken when staging shows they are at material risk.",
    candidacy:
      "It is generally considered for clinically localised prostate cancer in a man whose life expectancy and other illnesses make curative local treatment appropriate. Active surveillance, radiation and systemic therapy are alternatives that must be compared, not assumed away.",
    anatomy:
      "The prostate sits below the bladder and in front of the rectum, wrapping the urethra. The nerves involved in erections run along its sides, and the sphincter that supports continence sits at its apex, so how those structures are handled is part of the operation.",
    distinction:
      "A nerve-sparing operation aims to keep the neurovascular bundles when the tumour does not reach them, while a wider resection is used when extra-prostatic extension is likely. Pelvic nodes are added only where risk tables or imaging support it.",
    scopeShort:
      "Whether nerve-sparing is attempted, whether pelvic nodes are taken, and whether the approach is open or robotic change the operation and the bill.",
    staging:
      "Planning uses PSA, biopsy grade and volume, digital examination and, where indicated, MRI of the prostate and PSMA or other metabolic imaging. Pelvic node risk and whether disease appears confined decide both the resection and whether radiation is a reasonable alternative.",
    sequencing:
      "Surgery is one of the curative local options. Pathology of the prostate and nodes — margin, extra-prostatic extension, seminal-vesicle involvement and nodal deposits — then decides whether adjuvant radiation or systemic therapy is discussed.",
    team:
      "Decisions usually involve the surgeon, a pathologist, a radiologist reading MRI or metabolic imaging, a radiation oncologist where radiation is an alternative or adjuvant, and continence and sexual-function rehabilitation services.",
    evaluation:
      "Assessment commonly includes PSA trend, biopsy and imaging review, continence and sexual-function baseline, anaesthetic checks and a discussion of alternatives. Not every patient needs every scan.",
    technique:
      "The prostate and seminal vesicles are removed through an open incision or a robotic platform, the bladder is joined to the urethra over a catheter, nerves are preserved where the tumour allows, and pelvic nodes are taken when planned. A drain is often left.",
    conversion:
      "A planned nerve-sparing dissection may be abandoned if the tumour is found more extensive than imaging suggested, and robotic cases may convert to open for bleeding or adhesions. Consent should state both possibilities.",
    approaches: [
      { label: "Open retropubic prostatectomy", detail: "Direct access through a lower abdominal incision." },
      { label: "Robotic-assisted prostatectomy", detail: "The same anatomical resection performed from a surgeon-controlled console." },
      { label: "Nerve-sparing dissection", detail: "Keeps one or both neurovascular bundles when oncology allows." },
      { label: "Non-nerve-sparing resection", detail: "Takes a wider margin when extra-prostatic extension is likely." },
      { label: "With pelvic lymph node dissection", detail: "Adds staging or treatment of the pelvic nodes at risk." },
    ],
    duration: "commonly 2–4 hours, longer when pelvic nodes are dissected",
    stayGlance: "Three to seven nights typical",
    admission: "Admission is frequently three to seven nights, with a urethral catheter left in place after discharge for a planned interval.",
    recovery:
      "Recovery is led by catheter care, pelvic-floor exercises, a gradual return of continence, and a defined interval before assessing erectile function rather than a fixed date for flying home.",
    pathology:
      "The specimen is examined for grade, extra-prostatic extension, seminal-vesicle involvement, margin status and the number of involved nodes. Those findings drive adjuvant radiation and systemic-therapy decisions.",
    risks:
      "Recognised risks include bleeding, infection, urine leak at the join, narrowing of the join, temporary or lasting incontinence, change in erectile function, lymph leak if nodes are taken, and rectal injury in rare cases.",
    urgent:
      "inability to pass urine after catheter removal, heavy bleeding, fever, calf swelling, sudden breathlessness, or increasing abdominal pain",
    functionalChange:
      "Some change in urinary control is expected in the early months, and erectile function can change even when nerves are spared. Pelvic-floor physiotherapy and a planned sexual-function review are part of treatment, not optional extras.",
    drivers: oncologyDrivers(
      { label: "Nerve-sparing versus wider resection", detail: "Preserving one or both nerve bundles changes theatre time and reconstruction." },
      { label: "Pelvic lymph node dissection", detail: "Adding nodes lengthens surgery and can add a drain and a lymph-leak risk." },
      { label: "Surgical platform", detail: "Open and robotic access carry different equipment and consumable costs." },
      { label: "Continence and sexual-function rehabilitation", detail: "Physiotherapy, devices and medicines after discharge are frequently excluded." },
    ),
    records: [
      "PSA history and prostate biopsy report with grade and core involvement",
      "Prostate MRI or metabolic imaging files where already performed",
      "Baseline continence and sexual-function notes",
    ],
    followUp:
      "The home team should receive the operation note, pathology and PSA schedule, then coordinate pelvic-floor physiotherapy, sexual-function support, and adjuvant radiation or systemic therapy where advised.",
    quoteQuestions: [
      "Is nerve-sparing planned on one side, both, or neither, and what would change that?",
      "Are pelvic nodes included in this estimate?",
      "How many catheter days are assumed, and is continence physiotherapy included?",
    ],
    related: ["Hormone Therapy", "External Beam Radiotherapy (EBRT)", "Radical Cystectomy"],
    campusFocus:
      "Confirm the named urologic oncologist, whether a robotic platform is used, how pelvic nodes are billed, and which service supports continence after discharge.",
    imageAlts: [
      "Medical illustration of prostate anatomy for cancer surgery: prostate below the bladder, seminal vesicles, urethra, the neurovascular bundles along each side, and the pelvic nodes sometimes removed for staging.",
      "Medical infographic comparing nerve-sparing prostatectomy, wider extra-prostatic resection, pelvic node dissection, and open versus robotic access for the same anatomical operation.",
      "Medical infographic of the radical prostatectomy recovery pathway: catheter care, pelvic-floor exercises, histopathology, the first PSA, and the adjuvant radiation or systemic-therapy decision.",
    ],
  },
  {
    procedure: "Radical Cystectomy",
    shortName: "radical cystectomy",
    specialist: "urologic oncologist",
    definition:
      "Radical cystectomy removes the bladder to treat invasive or high-risk bladder cancer, and reconstructs a way for urine to leave the body — usually an ileal conduit or, in selected patients, a new bladder made from bowel.",
    candidacy:
      "It is generally considered for muscle-invasive bladder cancer, or for high-risk non-muscle-invasive disease that has not responded to bladder-preserving treatment. Bladder-preserving chemoradiotherapy is an alternative for some, not a default.",
    anatomy:
      "The bladder sits in the pelvis behind the pubic bone. In men the prostate is usually removed with it; in women the uterus, ovaries and part of the vagina may be included depending on disease and prior discussion. A segment of small bowel is commonly used to divert urine.",
    distinction:
      "An ileal conduit brings urine to a stoma on the abdominal wall, while a continent diversion or neobladder aims to restore urethral voiding in selected patients. Pelvic nodes are removed as a staging and treatment step, not as an optional extra.",
    scopeShort:
      "Whether the diversion is a conduit or a neobladder, which pelvic organs are included, and whether nodes are taken change the operation and the bill.",
    staging:
      "Planning uses TURBT pathology to confirm invasion, cross-sectional imaging of the abdomen and pelvis, chest imaging, and kidney-function and nutritional assessment. Hydronephrosis, carcinoma in situ and variant histology all change counselling.",
    sequencing:
      "Cisplatin-based chemotherapy is often given before surgery when the patient can receive it, because it can treat micrometastatic disease. Final pathology of the bladder and nodes then decides adjuvant systemic therapy.",
    team:
      "Care normally involves the surgeon, a medical oncologist for neoadjuvant or adjuvant therapy, a pathologist, a stoma therapist, a nutritionist, and a reconstructive urologist where a neobladder is planned.",
    evaluation:
      "Assessment commonly includes kidney function, nutrition, heart and lung review, stoma-site marking, discussion of diversion options, and anaesthetic checks. Smoking cessation support is relevant because it affects healing and cancer risk.",
    technique:
      "The bladder and planned adjacent organs are removed with the pelvic nodes, the ureters are joined to a bowel segment, and either a stoma is matured or a neobladder is joined to the urethra. Drains and, after a neobladder, catheters are left.",
    conversion:
      "A planned neobladder may become a conduit if urethral margins, bowel quality or anaesthetic fitness make reconstruction unsafe. Consent should name both diversions.",
    approaches: [
      { label: "Open radical cystectomy", detail: "Direct pelvic access, often chosen for bulky, previously irradiated or complex cases." },
      { label: "Robotic-assisted cystectomy", detail: "Keyhole pelvic dissection with urinary diversion performed inside or through a small incision." },
      { label: "Ileal conduit diversion", detail: "A short small-bowel segment brings urine to a permanent abdominal stoma." },
      { label: "Orthotopic neobladder", detail: "Bowel is reconstructed into a reservoir joined to the urethra in selected patients." },
      { label: "Pelvic lymph node dissection", detail: "Removes the pelvic nodes used to stage and treat this cancer." },
    ],
    duration: "commonly 4–8 hours, longer for neobladder reconstruction",
    stayGlance: "Seven to fourteen nights typical",
    admission: "Admission is frequently seven to fourteen nights, driven by bowel recovery, drain output and, after a neobladder, catheter teaching.",
    recovery:
      "Recovery is led by bowel function, stoma or neobladder teaching, nutrition, walking, and a defined interval before considering air travel rather than a calendar date.",
    pathology:
      "The bladder, adjacent organs and pelvic nodes are examined for residual tumour, margin, nodal involvement and variant histology. Those results, with the neoadjuvant response, drive adjuvant therapy.",
    risks:
      "Recognised risks include bleeding, infection, bowel leak or blockage, urine leak, kidney obstruction, metabolic change from using bowel, stoma complications, sexual-function change, and a period of intensive stoma or catheter care.",
    urgent:
      "no urine in the stoma bag, abdominal swelling, fever, vomiting, wound breakdown, sudden breathlessness, or confusion",
    functionalChange:
      "Life after cystectomy includes either a permanent stoma or a new bladder that is emptied by a different method. Sexual function commonly changes, and bowel-related metabolic effects need long-term blood tests.",
    drivers: oncologyDrivers(
      { label: "Urinary diversion type", detail: "A conduit and a neobladder differ in theatre time, teaching and consumables." },
      { label: "Adjacent organ resection", detail: "Including prostate, uterus or vagina widens the operation and pathology work." },
      { label: "Neoadjuvant chemotherapy already given", detail: "Prior systemic therapy changes tissue planes, timing and the overall episode cost." },
      { label: "Stoma and continence support", detail: "Appliances, teaching and later revisions are frequently excluded from surgical estimates." },
    ),
    records: [
      "TURBT pathology confirming invasion or high-risk non-muscle-invasive disease",
      "Cross-sectional imaging of abdomen, pelvis and chest with image files",
      "Kidney-function results and any neoadjuvant chemotherapy summary",
    ],
    followUp:
      "The home team should receive the operation note, diversion details, pathology and discharge summary, then coordinate stoma or neobladder care, kidney-function and metabolic blood tests, and adjuvant therapy where advised.",
    quoteQuestions: [
      "Is the planned diversion a conduit or a neobladder, and what would change that during surgery?",
      "Which adjacent organs and node fields are included in this estimate?",
      "Are stoma appliances and teaching included after discharge?",
    ],
    related: ["TURBT (Transurethral Resection of Bladder Tumor)", "Urinary Diversion", "Neoadjuvant Chemotherapy"],
    campusFocus:
      "Confirm the named urologic oncologist, which diversion is planned, whether stoma therapy is available on that campus, and who manages neoadjuvant or adjuvant chemotherapy.",
    imageAlts: [
      "Medical illustration of pelvic anatomy for radical cystectomy: bladder behind the pubic bone, ureters, prostate in the male diagram, and a small-bowel segment prepared for urinary diversion.",
      "Medical infographic comparing ileal conduit with an abdominal stoma, orthotopic neobladder joined to the urethra, pelvic node dissection, and open versus robotic cystectomy access.",
      "Medical infographic of the radical cystectomy recovery pathway: bowel recovery, stoma or catheter teaching, histopathology, kidney-function checks and the adjuvant therapy decision.",
    ],
  },
  {
    procedure: "Radical Hysterectomy",
    shortName: "radical hysterectomy",
    specialist: "gynaecologic oncologist",
    definition:
      "Radical hysterectomy removes the uterus, cervix and a cuff of upper vagina, together with the tissues beside the cervix that contain the parametrial vessels and nodes at risk, to treat selected cervical or uterine cancers.",
    candidacy:
      "It is generally considered for early cervical cancer that appears confined to the cervix and immediate surroundings, and for selected uterine cancers where a radical rather than a simple hysterectomy is required. Fertility-sparing alternatives exist for some early cases and must be discussed explicitly.",
    anatomy:
      "The uterus and cervix sit in the pelvis between bladder and rectum. The ureters run through the parametrium beside the cervix, and the pelvic nerves that influence bladder emptying travel nearby, so identifying those structures is part of a radical rather than a simple hysterectomy.",
    distinction:
      "A simple hysterectomy removes the uterus and cervix; a radical operation takes additional parametrial tissue and a vaginal cuff because that is where early cervical cancer can spread. Pelvic nodes, and sometimes para-aortic nodes, are assessed in the same sitting.",
    scopeShort:
      "How much parametrium and vagina are taken, whether nodes are dissected or sampled, and whether fertility-sparing surgery is still an option change the operation and the bill.",
    staging:
      "Planning uses examination, cervical or endometrial pathology, pelvic MRI, and, where indicated, metabolic imaging. Tumour size, stromal invasion, lymphovascular space involvement and nodal status decide between radical surgery and primary chemoradiotherapy.",
    sequencing:
      "Surgery is chosen when the team expects to avoid combined radical surgery and pelvic radiation in the same patient. Final pathology — parametrial involvement, nodes, margins and risk features — then decides whether adjuvant radiation or chemoradiation is still needed.",
    team:
      "Planning normally involves a gynaecologic oncologist, a pathologist, a radiologist, a radiation oncologist, and bladder-rehabilitation and fertility counselling where relevant.",
    evaluation:
      "Assessment commonly includes pelvic examination, imaging, anaesthetic checks, discussion of ovarian conservation in selected younger patients, and a baseline note of bladder and bowel function.",
    technique:
      "Through an open incision, keyhole ports or a robotic platform, the surgeon develops the spaces around the cervix, identifies the ureters, removes the uterus with parametrium and a vaginal cuff, and addresses the pelvic nodes as planned. A catheter is left while bladder function recovers.",
    conversion:
      "A planned fertility-sparing or minimally invasive approach may be converted to a more extensive open operation if nodes are involved or the tumour is larger than expected. Consent should cover that change.",
    approaches: [
      { label: "Open radical hysterectomy", detail: "Direct pelvic access, often used for larger tumours or after prior pelvic treatment." },
      { label: "Minimally invasive radical hysterectomy", detail: "Keyhole or robotic access for selected early tumours, after counselling on approach-specific evidence." },
      { label: "Nerve-sparing radical hysterectomy", detail: "Aims to protect pelvic autonomic nerves that influence bladder emptying when oncology allows." },
      { label: "Fertility-sparing radical trachelectomy", detail: "Removes the cervix and parametrium while keeping the uterine body in highly selected early cases." },
      { label: "With pelvic node assessment", detail: "Dissection or sentinel-node mapping of the pelvic nodes at risk." },
    ],
    duration: "commonly 3–5 hours, longer when nodes are dissected or fertility-sparing reconstruction is performed",
    stayGlance: "Four to eight nights typical",
    admission: "Admission is frequently four to eight nights, often with a catheter until bladder emptying is documented.",
    recovery:
      "Recovery is led by bladder emptying, wound healing, and a gradual return to lifting and intercourse according to the team’s advice rather than a fixed calendar.",
    pathology:
      "The specimen is examined for tumour size, depth, parametrial and vaginal involvement, margins, lymphovascular space invasion and nodal status. Those results decide adjuvant radiation.",
    risks:
      "Recognised risks include bleeding, infection, ureteric injury, bladder or bowel injury, lymph collection, temporary or lasting change in bladder emptying, vaginal shortening, and menopausal symptoms if ovaries are removed.",
    urgent:
      "heavy vaginal bleeding, inability to pass urine, fever, calf swelling, sudden breathlessness, or increasing abdominal pain",
    functionalChange:
      "Fertility ends unless a fertility-sparing operation was performed. Bladder emptying can be slower for weeks, and vaginal length or ovarian function may change depending on what was removed and whether radiation follows.",
    drivers: oncologyDrivers(
      { label: "Radical versus simple hysterectomy", detail: "Parametrial and vaginal resection, not just removing the uterus, defines this operation." },
      { label: "Node assessment method", detail: "Sentinel mapping and full pelvic dissection differ in time and pathology work." },
      { label: "Fertility-sparing versus standard radical surgery", detail: "Trachelectomy and reconstruction are a different scope from hysterectomy." },
      { label: "Adjuvant pelvic radiation if required", detail: "Radiation after radical surgery is a separate pathway and a separate estimate." },
    ),
    records: [
      "Cervical or endometrial biopsy and any cone or LEEP pathology",
      "Pelvic MRI and other staging imaging with image files",
      "Prior pelvic surgery or radiation notes",
    ],
    followUp:
      "The home team should receive the operation note, pathology and bladder-function status, then coordinate adjuvant radiation where advised, hormone support if ovaries were removed, and surveillance according to the cancer type.",
    quoteQuestions: [
      "Is this a radical or a simple hysterectomy, and how much parametrium is planned?",
      "Are pelvic nodes mapped, dissected, or both, and is that included?",
      "If fertility-sparing surgery is being considered, what would convert it during the operation?",
    ],
    related: ["Ovarian Cancer Cytoreductive Surgery", "Sentinel Lymph Node Biopsy", "Intensity-Modulated Radiotherapy (IMRT)"],
    campusFocus:
      "Confirm the named gynaecologic oncologist, whether sentinel-node mapping is used, how bladder recovery is supported, and which service delivers adjuvant radiation if advised.",
    imageAlts: [
      "Medical illustration of pelvic anatomy for radical hysterectomy: uterus and cervix between bladder and rectum, ureters running through the parametrium, a vaginal cuff, and the pelvic node basins assessed with the specimen.",
      "Medical infographic comparing simple hysterectomy, radical hysterectomy with parametrium and vaginal cuff, nerve-sparing dissection, and fertility-sparing trachelectomy for selected early cervical cancer.",
      "Medical infographic of the radical hysterectomy recovery pathway: catheter and bladder emptying, histopathology of parametrium and nodes, the adjuvant radiation decision, and surveillance.",
    ],
  },
  {
    procedure: "Lobectomy",
    shortName: "lobectomy",
    specialist: "thoracic surgical oncologist",
    definition:
      "Lobectomy removes one entire lobe of the lung — with its bronchus, artery and vein — as a single anatomical unit, most often to treat a lung cancer that is confined to that lobe.",
    candidacy:
      "It is generally considered when a tumour or selected other disease is confined to one lobe and the remaining lung can support the patient after that lobe is gone. Segmentectomy may be discussed for a small peripheral tumour; pneumonectomy is a larger alternative when a lobe is not enough.",
    anatomy:
      "The right lung has upper, middle and lower lobes; the left has upper and lower. Each lobe has its own bronchus and vessels. After the lobe is removed, the remaining lobes must fill the chest, and mediastinal nodes are sampled in the same operation when the indication is cancer.",
    distinction:
      "This page is about removing one anatomical lobe, not a wedge of lung and not a whole lung. Which lobe is taken, whether a sleeve of airway is needed, and whether nodes are dissected are the decisions that change recovery and cost.",
    scopeShort:
      "Which lobe is removed, whether a sleeve reconstruction is needed, and whether mediastinal nodes are dissected change the operation and the bill.",
    staging:
      "Cancer planning requires tissue diagnosis, chest and metabolic imaging, and usually mediastinal node assessment before resection. Lung-function and cardiac tests decide whether losing that specific lobe is tolerable.",
    sequencing:
      "Some tumours receive systemic treatment before lobectomy. Pathology of the lobe and nodes, including molecular markers, then decides adjuvant chemotherapy, targeted therapy or immunotherapy.",
    team:
      "Planning normally involves the thoracic surgeon, a respiratory physician for airway staging and lung function, a radiologist, a molecular pathologist, medical and radiation oncologists, and a physiotherapist.",
    evaluation:
      "Assessment commonly includes spirometry, oxygenation, cardiac evaluation, exercise testing where function is borderline, smoking cessation support and anaesthetic checks.",
    technique:
      "Under one-lung ventilation the surgeon divides the artery, vein and bronchus of the named lobe, removes it, samples mediastinal nodes when indicated, and places chest drains. Access may be keyhole, robotic or open.",
    conversion:
      "A planned lobectomy may become a sleeve resection or pneumonectomy if the tumour involves the airway or vessels more centrally than imaging showed, and keyhole cases may convert to open thoracotomy.",
    approaches: [
      { label: "Right upper, middle or lower lobectomy", detail: "The named right lobe is removed as an anatomical unit." },
      { label: "Left upper or lower lobectomy", detail: "The named left lobe is removed; the left upper lobe includes the lingula." },
      { label: "Sleeve lobectomy", detail: "The airway is reconstructed so a whole lung need not be removed." },
      { label: "Keyhole or robotic lobectomy", detail: "The same anatomical resection through ports rather than a full thoracotomy." },
      { label: "Open thoracotomy lobectomy", detail: "Direct access, often for central, adherent or previously treated tumours." },
    ],
    duration: "commonly 2–4 hours, longer for sleeve reconstruction or dense adhesions",
    stayGlance: "Five to ten nights typical",
    admission: "Admission is frequently five to ten nights, governed mainly by air leak and chest drain duration.",
    recovery:
      "Recovery is led by chest drain removal, breathing exercises and pain control that allows coughing, with breathlessness on exertion improving as the remaining lung adapts.",
    pathology:
      "The lobe is examined for tumour type, size, margin, pleural involvement and the node stations taken with it. Molecular testing on the same specimen guides adjuvant treatment.",
    risks:
      "Recognised risks include prolonged air leak, pneumonia, irregular heart rhythm, bleeding, a bronchial stump leak, persistent chest wall pain, reduced exercise tolerance and venous thromboembolism.",
    urgent:
      "worsening breathlessness, fever, productive cough, palpitations, bleeding, or air under the skin of the chest or neck",
    functionalChange:
      "Losing a lobe permanently reduces respiratory reserve. How much is noticed depends on which lobe is taken and on baseline lung function. Pulmonary rehabilitation after discharge is part of recovery.",
    drivers: oncologyDrivers(
      { label: "Which lobe is removed", detail: "Upper, middle and lower lobes differ in vessel anatomy and remaining volume." },
      { label: "Sleeve reconstruction", detail: "Joining the airway to avoid pneumonectomy adds time and leak risk." },
      { label: "Access route", detail: "Keyhole, robotic and open lobectomy carry different equipment costs." },
      { label: "Chest drain duration", detail: "A prolonged air leak is the commonest reason an admission overruns." },
    ),
    records: [
      "Biopsy confirming the diagnosis and, for cancer, the subtype",
      "Chest imaging and pulmonary function tests",
      "Any airway nodal staging reports",
    ],
    followUp:
      "The home team should receive the operation note, which lobe was removed, nodal and molecular pathology, then coordinate adjuvant therapy where advised and pulmonary rehabilitation.",
    quoteQuestions: [
      "Which lobe is planned, and what would convert this to a sleeve resection or pneumonectomy?",
      "Has mediastinal staging been completed, and is it inside this estimate?",
      "How are extra chest drain days billed?",
    ],
    related: ["Lung Cancer Surgery", "VATS Lung Surgery", "EBUS (Endobronchial Ultrasound)"],
    campusFocus:
      "Confirm the named thoracic surgeon, which lobe is planned, the intended access, and whether lung-function testing and chest physiotherapy are available on that campus.",
    imageAlts: [
      "Medical illustration of lobectomy anatomy: the five pulmonary lobes, a tumour confined to one lobe, the lobar bronchus artery and vein divided at their origin, and the remaining lobes that stay in the chest.",
      "Medical infographic comparing right upper lobectomy, left lower lobectomy, sleeve lobectomy reconstructing the airway, and conversion to pneumonectomy when a lobe is not enough.",
      "Medical infographic of the lobectomy recovery pathway: chest drain and air leak monitoring, breathing exercises, histopathology of the lobe and nodes, and pulmonary rehabilitation.",
    ],
  },
  {
    procedure: "VATS Lung Surgery",
    shortName: "VATS lung surgery",
    specialist: "thoracic surgical oncologist",
    definition:
      "VATS lung surgery is video-assisted keyhole access to the chest, used to perform anatomical lung resections and selected other thoracic operations through small ports rather than a full thoracotomy.",
    candidacy:
      "It is generally considered when the same lung resection can be completed safely through ports — typically a peripheral or fissure-favourable tumour in a patient without dense pleural adhesions. It is an access choice, not a different cancer operation from open lobectomy.",
    anatomy:
      "Ports pass between the ribs into the pleural space. A camera and long instruments reach the fissures, the lobar vessels and the bronchus. The chest wall is spared a rib-spreading incision, but the lung operation inside is still an anatomical resection.",
    distinction:
      "VATS describes how the surgeon enters the chest, not which lobe is taken. A VATS lobectomy and an open lobectomy can remove the same tissue; conversion to open is a recognised part of the method, not a failure of care.",
    scopeShort:
      "Whether the keyhole plan completes the intended resection, converts to open, or needs extra ports and staplers changes the operation and the bill.",
    staging:
      "Cancer cases still need the same staging as any lung resection: tissue diagnosis, imaging, mediastinal node assessment, and lung-function testing. VATS does not replace EBUS or other staging tests.",
    sequencing:
      "Prior chemotherapy, radiation or chest surgery makes adhesions more likely and can make VATS conversion more common. Pathology of the resected lung still decides adjuvant treatment.",
    team:
      "The thoracic surgeon, thoracic anaesthetist skilled in one-lung ventilation, a scrub team familiar with endoscopic staplers, and a physiotherapist share the pathway.",
    evaluation:
      "Assessment is the same as for open resection, plus a review of prior chest surgery, pleural disease and whether the fissure looks complete enough on imaging for a keyhole dissection.",
    technique:
      "Under one-lung ventilation, ports are placed, the camera enters the pleural space, the fissure and vessels are dissected, endoscopic staplers divide artery, vein and bronchus, the specimen is removed in a bag, nodes are sampled, and a chest drain is placed.",
    conversion:
      "Bleeding, incomplete fissures, a more central tumour, or inability to sample nodes adequately can convert VATS to open thoracotomy. The quotation should assume that possibility.",
    approaches: [
      { label: "VATS lobectomy", detail: "Anatomical lobe removal through ports, the commonest cancer indication." },
      { label: "VATS segmentectomy", detail: "Keyhole removal of one anatomical segment for selected small tumours." },
      { label: "VATS wedge resection", detail: "A non-anatomical sample or excision, which is not a substitute for lobectomy when lobectomy is indicated." },
      { label: "Uniportal or multiportal VATS", detail: "One or several ports; the inside resection, not the number of scars, defines the operation." },
      { label: "Conversion to thoracotomy", detail: "Open completion of the same resection when keyhole dissection is unsafe." },
    ],
    access: [
      {
        name: "Video-assisted thoracoscopic surgery",
        access: "Small ports between the ribs",
        method: "Camera and long instruments, same anatomical resection",
        resources: "Endoscopic staplers, single-lung ventilation",
        recovery: "Often less chest wall pain; drain duration still governs discharge",
        cost: "Consumable-heavy; compare at equal resection scope",
      },
      {
        name: "Uniportal VATS",
        access: "A single utility incision",
        method: "Camera and instruments share one intercostal space",
        resources: "Specialised uniportal instruments and staplers",
        recovery: "Similar drain rules to multiportal VATS",
        cost: "Still stapler-dependent; not automatically cheaper",
      },
      {
        name: "Open thoracotomy",
        access: "Chest wall incision with rib spreading",
        method: "Direct handling when keyhole dissection is unsafe",
        resources: "Standard thoracic instrumentation",
        recovery: "More chest wall discomfort; physiotherapy matters more",
        cost: "Lower stapler use; stay and analgesia may rise",
      },
    ],
    duration: "commonly 2–4 hours for a VATS lobectomy, longer if conversion is required",
    stayGlance: "Four to eight nights typical",
    admission: "Admission is frequently four to eight nights, still governed by air leak and chest drain duration rather than by the size of the scars.",
    recovery:
      "Keyhole access may reduce chest wall pain, but drain duration, breathing exercises and fitness to fly still follow the lung operation, not the port count.",
    pathology:
      "The specimen must still be an intact anatomical resection with labelled nodes. A fragmented extraction that prevents margin or nodal assessment is not an adequate cancer operation.",
    risks:
      "Recognised risks include those of the underlying resection — air leak, bleeding, pneumonia, arrhythmia — plus port-site problems and the specific risk of emergency conversion for bleeding.",
    urgent:
      "worsening breathlessness, heavy bleeding, fever, sudden chest wall swelling, or air under the skin",
    functionalChange:
      "Respiratory reserve still falls by the amount of lung removed. Port-site numbness can persist. VATS does not restore lung tissue that has been taken.",
    drivers: oncologyDrivers(
      { label: "Resection performed through VATS", detail: "Wedge, segmentectomy and lobectomy are different operations that happen to share access." },
      { label: "Stapler and consumable use", detail: "Endoscopic staplers are a major line item and vary with fissure anatomy." },
      { label: "Conversion contingency", detail: "Open completion adds theatre time and a different admission profile." },
      { label: "Chest drain duration", detail: "Air leak, not the number of ports, usually decides the length of stay." },
    ),
    records: [
      "Imaging that shows fissures, pleural space and the intended resection",
      "Pulmonary function tests and cardiac assessment",
      "Prior chest surgery or pleural procedure notes",
    ],
    followUp:
      "Handover should name the resection performed through VATS, whether conversion occurred, nodal pathology, and the chest-drain and rehabilitation plan.",
    quoteQuestions: [
      "Exactly which lung resection will be performed through VATS?",
      "What stapler and consumable costs are assumed?",
      "How is conversion to open thoracotomy billed if required?",
    ],
    related: ["Lung Cancer Surgery", "Lobectomy", "EBUS (Endobronchial Ultrasound)"],
    campusFocus:
      "Confirm the named thoracic surgeon’s VATS list, which resection will be done through ports, stapler assumptions, and the conversion plan.",
    imageAlts: [
      "Medical illustration of VATS lung surgery: camera and instruments entering the pleural space between the ribs, the fissure of the target lobe, and endoscopic staplers dividing the lobar vessels and bronchus.",
      "Medical infographic comparing VATS lobectomy, VATS segmentectomy, uniportal access and conversion to open thoracotomy when keyhole dissection cannot finish the same anatomical resection.",
      "Medical infographic of the VATS recovery pathway: port-site and drain care, air leak monitoring, histopathology of the resected lobe or segment, and breathing exercises before travel home.",
    ],
  },
  {
    procedure: "Robotic Thoracic Surgery",
    shortName: "robotic thoracic surgery",
    specialist: "thoracic surgical oncologist",
    definition:
      "Robotic thoracic surgery uses a surgeon-controlled console and articulated instruments to perform anatomical chest operations — most often lung resection with mediastinal node dissection — through ports.",
    candidacy:
      "It is considered when the named surgeon already performs the intended resection robotically and the anatomy is suitable. A robot in the building is not itself an indication, and open or VATS access may still be more appropriate.",
    anatomy:
      "Ports dock to a robotic platform. Wristed instruments work at the fissure, vessels and mediastinum with magnified three-dimensional vision. The resection inside the chest is still defined by which lobe, segment or nodes are taken.",
    distinction:
      "The robot is an access and instrument platform. It does not make a pneumonectomy into a lobectomy, and it does not replace staging. Compare robotic quotes only against the same named resection.",
    scopeShort:
      "Which resection is performed on the robot, how long the platform is docked, and whether conversion to VATS or open is needed change the bill.",
    staging:
      "Cancer cases need the same diagnosis, imaging, mediastinal assessment and lung-function testing as any other thoracic resection. Robotic access does not replace EBUS.",
    sequencing:
      "Prior chest treatment can make docking and dissection harder. Pathology of the resected lung and nodes still decides adjuvant therapy.",
    team:
      "A trained robotic thoracic team, a bedside assistant, a thoracic anaesthetist and a platform technician are required. That team is part of the product being quoted.",
    evaluation:
      "Assessment matches other lung resections, plus confirmation that the named surgeon, the platform and the intended date are actually available.",
    technique:
      "After one-lung ventilation, ports are placed, the robot is docked, the surgeon at the console divides the vessels and bronchus of the planned resection, nodes are dissected, the specimen is removed, and chest drains are placed.",
    conversion:
      "The case may be undocked to VATS or open thoracotomy for bleeding, equipment failure or anatomy that cannot be completed robotically. Consent and the estimate should name that pathway.",
    approaches: [
      { label: "Robotic lobectomy", detail: "Anatomical lobe removal from the console, the usual cancer indication." },
      { label: "Robotic segmentectomy", detail: "Console-based removal of one anatomical segment." },
      { label: "Robotic mediastinal node dissection", detail: "Node stations cleared or sampled with the same platform." },
      { label: "Robotic thymectomy or other mediastinal work", detail: "Only where that exact operation is the consented indication, not inferred from a lung-resection quote." },
      { label: "Undocking to VATS or open", detail: "Completes the same resection when the console pathway is unsafe." },
    ],
    access: [
      {
        name: "Robotic-assisted thoracic surgery",
        access: "Ports docked to a surgeon-controlled console",
        method: "Articulated instruments and magnified vision",
        resources: "Platform time and single-use robotic instruments",
        recovery: "Broadly similar drain rules to other keyhole chest surgery",
        cost: "Usually the highest equipment component",
      },
      {
        name: "Video-assisted thoracoscopic surgery",
        access: "Ports without a robotic platform",
        method: "Long instruments and a camera, same resection",
        resources: "Endoscopic staplers, no console time",
        recovery: "Drain duration still governs discharge",
        cost: "Consumable-heavy, typically below robotic platform cost",
      },
      {
        name: "Open thoracotomy",
        access: "Chest wall incision",
        method: "Direct handling of airway and vessels",
        resources: "Standard thoracic instrumentation",
        recovery: "More chest wall discomfort",
        cost: "Lower equipment cost; stay may be longer",
      },
    ],
    duration: "commonly 3–5 hours including docking, longer for complex anatomy",
    stayGlance: "Four to eight nights typical",
    admission: "Admission is frequently four to eight nights, still governed by air leak and drains rather than by the console.",
    recovery:
      "Recovery follows the lung resection performed, not the brand of platform. Drain removal, breathing exercises and fitness to fly remain clinical decisions.",
    pathology:
      "The same intact specimen and labelled nodes are required as in open or VATS cancer surgery. Platform choice does not change what pathology must report.",
    risks:
      "Recognised risks include those of the underlying resection plus docking-related delays, instrument injury, and emergency undocking for bleeding.",
    urgent:
      "worsening breathlessness, heavy bleeding, fever, or sudden chest swelling",
    functionalChange:
      "Lung tissue that is removed is gone regardless of robotic access. Remaining breathlessness depends on the resection, not the console.",
    drivers: oncologyDrivers(
      { label: "Named resection on the robot", detail: "Segmentectomy, lobectomy and mediastinal work are different operations." },
      { label: "Platform and instrument time", detail: "Console minutes and single-use instruments are separate line items." },
      { label: "Conversion or undocking", detail: "Completing the case by VATS or open changes time and consumables." },
      { label: "Team availability", detail: "A trained bedside team and platform slot are part of what is being purchased." },
    ),
    records: [
      "Imaging and lung-function tests for the intended resection",
      "Prior chest treatment notes",
      "Confirmation that a named robotic thoracic surgeon has accepted the case",
    ],
    followUp:
      "Handover should name the resection performed robotically, docking or conversion events, nodal pathology and the rehabilitation plan.",
    quoteQuestions: [
      "What exact thoracic resection will be performed on the robot?",
      "Are platform time and single-use instruments itemized?",
      "How is undocking to VATS or open billed?",
    ],
    related: ["Lung Cancer Surgery", "VATS Lung Surgery", "Lobectomy"],
    campusFocus:
      "Confirm the named robotic thoracic surgeon, that a platform slot exists for the intended date, which resection will be done, and how conversion is billed. Cards appear only for an exact live CMS relationship; a general thoracic or surgical-oncology label is not enough.",
    imageAlts: [
      "Medical illustration of robotic thoracic surgery: ports in the chest wall docked to a surgeon-controlled console, articulated instruments at a lobar fissure, and the mediastinal node stations included with a cancer resection.",
      "Medical infographic comparing robotic lobectomy, robotic segmentectomy, undocking to VATS, and conversion to open thoracotomy for the same anatomical lung resection.",
      "Medical infographic of the robotic thoracic recovery pathway: undocking and drain care, air leak monitoring, histopathology, and pulmonary rehabilitation after the named resection.",
    ],
  },
  {
    procedure: "Transoral Robotic Surgery (TORS)",
    shortName: "TORS",
    specialist: "head and neck surgical oncologist",
    definition:
      "Transoral robotic surgery removes selected tumours of the oropharynx — tonsil, base of tongue or adjacent throat — through the mouth using a surgeon-controlled robotic platform, avoiding an open incision through the jaw or neck for the primary tumour.",
    candidacy:
      "It is generally considered for a well-visualised, resectable oropharyngeal tumour in a mouth that can be opened enough for the robot, often after HPV status and neck staging are known. Open resection or primary chemoradiotherapy remain alternatives.",
    anatomy:
      "The oropharynx includes the tonsil fossae, base of tongue, soft palate and lateral pharyngeal walls. Important nearby structures include the carotid artery, the nerves to the tongue and the swallowing sphincter. Neck nodes are usually addressed in the same treatment plan, often through a separate neck incision.",
    distinction:
      "TORS is a route to the primary tumour, not a substitute for neck dissection and not a smaller cancer operation. A tumour that cannot be seen completely through the mouth, or that encases the carotid, is not a TORS case.",
    scopeShort:
      "Which oropharyngeal site is resected, whether a neck dissection is combined, and whether a tracheostomy or feeding tube is added change the operation and the bill.",
    staging:
      "Planning uses examination of the throat, biopsy with HPV testing where relevant, cross-sectional and often metabolic imaging of the neck and chest, and an anaesthetic assessment of mouth opening and airway.",
    sequencing:
      "TORS may be used to de-intensify later radiation in selected HPV-related disease, or as the primary resection when the tumour is clearly resectable. Neck dissection timing and the radiation decision follow pathology.",
    team:
      "A TORS-trained head and neck surgeon, a bedside assistant, a pathologist reading margins, a neck-dissection plan, and speech and swallow therapists are required.",
    evaluation:
      "Assessment commonly includes mouth opening, dentition, airway, swallow baseline, neck imaging and a discussion of tracheostomy and feeding-tube likelihood.",
    technique:
      "With the patient asleep and the mouth held open, the robot is docked transorally, the tumour is excised with a three-dimensional margin, frozen section may guide further excision, haemostasis is secured, and the neck is addressed as planned, sometimes at the same sitting.",
    conversion:
      "Inadequate view, bleeding, or a tumour more extensive than expected can convert TORS to open resection, which may include dividing the jaw. Consent should cover tracheostomy, feeding tube and open conversion.",
    approaches: [
      { label: "TORS tonsillectomy for cancer", detail: "Radical tonsil resection of a tonsil primary through the mouth." },
      { label: "TORS base-of-tongue resection", detail: "Removes a base-of-tongue tumour with a swallow-preserving margin where possible." },
      { label: "TORS with ipsilateral neck dissection", detail: "The primary is removed through the mouth; the neck is opened separately." },
      { label: "Staged TORS then neck surgery", detail: "Separates the two sittings when airway or pathology timing requires it." },
      { label: "Open conversion", detail: "Mandibulotomy or other open access if transoral resection cannot be completed." },
    ],
    duration: "commonly 2–5 hours for the transoral component, longer when neck dissection is combined",
    stayGlance: "Three to seven nights typical",
    admission: "Admission is frequently three to seven nights, watching the airway, bleeding from the mouth and the ability to swallow saliva.",
    recovery:
      "Recovery is led by airway safety, bleeding watch, pain that allows swallowing, and speech and swallow therapy rather than a fixed date.",
    pathology:
      "Margins in three dimensions, HPV status, depth and the neck-node yield drive whether postoperative radiation can be reduced, kept or omitted.",
    risks:
      "Recognised risks include bleeding from the mouth that can threaten the airway, temporary or lasting swallow change, taste change, tooth or lip injury from the gag, airway swelling, and the usual risks of any neck dissection performed with it.",
    urgent:
      "bleeding from the mouth, difficulty breathing, inability to swallow saliva, fever, or sudden neck swelling",
    functionalChange:
      "Swallowing and speech are commonly affected for weeks and sometimes longer, especially after base-of-tongue resection. A feeding tube may be needed for a period, and taste change can persist.",
    drivers: oncologyDrivers(
      { label: "Oropharyngeal site and volume", detail: "Tonsil and base-of-tongue resections differ in time, airway risk and swallow recovery." },
      { label: "Combination with neck dissection", detail: "Adding the neck is a second field with its own time and drain." },
      { label: "Robot platform time", detail: "Docking and single-use instruments are separate from the resection itself." },
      { label: "Airway and feeding support", detail: "Tracheostomy and feeding-tube placement add days and nursing intensity." },
    ),
    records: [
      "Biopsy of the oropharyngeal tumour with HPV testing where performed",
      "Imaging of the throat, neck and chest with image files",
      "Notes on mouth opening, dentition and swallow",
    ],
    followUp:
      "The home team should receive the operation note, margin and HPV pathology, neck-node results, and the swallow plan, then coordinate radiation where advised.",
    quoteQuestions: [
      "Which oropharyngeal site will be resected, and is neck dissection in the same estimate?",
      "Are robot platform charges itemized?",
      "Are tracheostomy and feeding-tube placement included if they become necessary?",
    ],
    related: ["Oral Cancer Surgery", "Neck Dissection", "Intensity-Modulated Radiotherapy (IMRT)"],
    campusFocus:
      "Confirm that a named TORS-trained surgeon, a robotic platform and a bedside team exist for the intended date. The catalog currently maps few or no TORS-specific doctor cards; empty cards are a data gap, not a ranking.",
    imageAlts: [
      "Medical illustration of transoral robotic surgery anatomy: tonsil and base of tongue in the oropharynx, the open-mouth corridor for robotic instruments, the carotid artery laterally, and the draining neck node levels.",
      "Medical infographic comparing TORS tonsil resection, TORS base-of-tongue resection, combined ipsilateral neck dissection, and open conversion with mandibulotomy when the mouth corridor is insufficient.",
      "Medical infographic of the TORS recovery pathway: airway and bleeding watch, swallow therapy, three-dimensional margin pathology, the postoperative radiation decision and feeding-tube weaning.",
    ],
  },
  {
    procedure: "Microvascular Free Flap Reconstruction",
    shortName: "microvascular free flap reconstruction",
    specialist: "reconstructive surgeon working with the resecting surgical oncologist",
    definition:
      "Microvascular free flap reconstruction transfers tissue — skin, fat, muscle or bone — with its own artery and vein from a donor site to rebuild a defect after cancer resection, joining those vessels under a microscope to vessels near the wound.",
    candidacy:
      "It is considered when a cancer resection would leave a defect that cannot be closed reliably with local tissue — typically after oral, jaw, throat or other head and neck ablation, and sometimes after other cancer operations. It is reconstruction, not a substitute for complete tumour removal.",
    anatomy:
      "Common donor sites include the forearm, thigh and lower leg (fibula) for bone. Each flap has a named artery and vein that must be joined to recipient vessels in the neck or near the defect. The donor site is a second surgical wound with its own healing needs.",
    distinction:
      "A local flap rotates nearby tissue; a free flap is detached and reconnected. Soft-tissue flaps restore lining and bulk; bone flaps restore a jaw segment. Two surgical teams often work together: one completing the cancer resection, one raising and joining the flap.",
    scopeShort:
      "Which donor site is used, whether bone is included, and how long two teams operate together change the operation and the bill.",
    staging:
      "The reconstruction plan follows the planned resection, not the other way around. Imaging of the defect, assessment of neck vessels (especially after prior radiation or neck dissection), and Allen tests or angiography for certain donor sites come before the flap is chosen.",
    sequencing:
      "The flap is usually performed in the same sitting as the cancer resection so the defect is known. Prior radiation, neck dissection or free-flap surgery changes recipient-vessel choice and risk.",
    team:
      "A reconstructive micro-surgeon, the resecting surgical oncologist, a microscope-trained theatre team, a flap-monitoring nursing protocol, and later speech, swallow or physiotherapy services share the pathway.",
    evaluation:
      "Assessment commonly includes donor-site circulation tests, neck-vessel imaging after prior treatment, anaesthetic fitness for a long operation, nutrition, and a discussion of donor-site trade-offs.",
    technique:
      "While the cancer team completes the resection, the reconstructive team raises the flap, divides its vessels, transfers it to the defect, joins artery and vein under the microscope, checks flow, shapes the tissue, and closes both wounds. The flap is watched closely for colour, temperature and Doppler signal.",
    conversion:
      "If the first flap fails on the table or recipient vessels are unusable, a second donor site or a non-free-flap option may be required. Consent should name a backup reconstruction.",
    approaches: [
      { label: "Radial forearm free flap", detail: "Thin lining for tongue or mouth defects, with a forearm donor site." },
      { label: "Anterolateral thigh flap", detail: "Soft-tissue bulk from the thigh for larger defects." },
      { label: "Fibula free flap", detail: "Bone and skin from the lower leg to rebuild a jaw segment." },
      { label: "Other named free flaps", detail: "Used when the defect or prior surgery makes the usual donors unsuitable." },
      { label: "Revision or salvage free flap", detail: "A second transfer after partial or complete failure of a prior flap." },
    ],
    duration: "commonly 6–12 hours when combined with the cancer resection, sometimes longer",
    stayGlance: "Eight to fourteen nights typical",
    admission: "Admission is frequently eight to fourteen nights because flap checks, donor-site care and, after head and neck surgery, airway and feeding support happen in hospital.",
    recovery:
      "Recovery is led by flap viability, donor-site healing, and the functional rehabilitation of whatever was reconstructed — speech, swallow or walking — rather than a fixed date.",
    pathology:
      "The cancer specimen is reported separately from the reconstruction. Flap success does not change margin or nodal results, which still decide adjuvant treatment.",
    risks:
      "Recognised risks include complete or partial flap failure needing urgent return to theatre, bleeding, fistula, donor-site wound problems or reduced function, anastomosis thrombosis, and the risks of the long anaesthetic.",
    urgent:
      "colour or temperature change in the reconstructed area, sudden swelling, bleeding, fever, or loss of the Doppler signal the team taught you to respect",
    functionalChange:
      "The donor site permanently trades tissue for the reconstruction: a forearm scar and possible sensation change, a thigh contour change, or reduced ankle strength after a fibula flap. The reconstructed area also needs therapy to work as intended.",
    drivers: oncologyDrivers(
      { label: "Donor site and tissue type", detail: "Soft-tissue and bone flaps differ in harvest time, implants and donor-site care." },
      { label: "Two-team theatre time", detail: "A combined resection and reconstruction is a different episode from either operation alone." },
      { label: "Microscope, implants and monitoring", detail: "Plates, Doppler probes and intensive flap checks are separate line items." },
      { label: "Flap-salvage contingency", detail: "Return to theatre for anastomosis revision is a recognised extra cost." },
    ),
    records: [
      "Operation plan for the cancer resection that creates the defect",
      "Prior radiation, neck dissection or free-flap notes",
      "Donor-site circulation tests and imaging of recipient vessels where performed",
    ],
    followUp:
      "The home team should receive both the resection and flap operation notes, anastomosis details, donor-site care, and the speech, swallow or physiotherapy plan, plus cancer pathology for adjuvant treatment.",
    quoteQuestions: [
      "Which donor site is planned, and is a backup flap included in consent and cost?",
      "Are two surgical teams, plates and flap-monitoring devices itemized?",
      "How is urgent return to theatre for flap salvage billed?",
    ],
    related: ["Oral Cancer Surgery", "Neck Dissection", "Transoral Robotic Surgery (TORS)"],
    campusFocus:
      "Confirm a named micro-surgeon, a two-team theatre plan, overnight flap-watch nursing and a backup reconstruction. The catalog currently maps few or no procedure-specific doctor cards; empty cards are a data gap, not a ranking.",
    imageAlts: [
      "Medical illustration of microvascular free flap reconstruction: a donor flap with its artery and vein, the defect after cancer resection, and the microscopic joins to recipient vessels in the neck.",
      "Medical infographic comparing radial forearm, anterolateral thigh and fibula bone flaps, two-team operating, and a salvage second flap if the first anastomosis fails.",
      "Medical infographic of the free-flap recovery pathway: hourly flap colour and Doppler checks, donor-site care, cancer histopathology, and speech or walking rehabilitation before travel home.",
    ],
  },
];

export const surgicalOncologyArticles = profiles.map(createSurgicalOncologyArticle);

export const surgicalOncologyArticlesBySlug: Record<string, CostArticle> =
  Object.fromEntries(surgicalOncologyArticles.map((article) => [article.slug, article]));
