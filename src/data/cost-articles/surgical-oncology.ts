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
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
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
];

export const surgicalOncologyArticles = profiles.map(createSurgicalOncologyArticle);

export const surgicalOncologyArticlesBySlug: Record<string, CostArticle> =
  Object.fromEntries(surgicalOncologyArticles.map((article) => [article.slug, article]));
