import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { UROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { UROLOGY_PROFILES } from "./urology-profiles";

/**
 * Surgical-oncology owns these three sheets (specialtySlug === "surgical-oncology");
 * urology is a secondary tag there. They must not receive a second, competing guide.
 */
export const UROLOGY_SHARED = [
  "Partial Nephrectomy",
  "Radical Prostatectomy",
  "Radical Cystectomy",
] as const;

export type UrologyProcedure = Exclude<
  (typeof UROLOGY_PROCEDURES)[number],
  (typeof UROLOGY_SHARED)[number]
>;

export type UrologyCluster =
  | "Endourology and stone disease"
  | "Prostate and voiding (BPH)"
  | "Urologic oncology"
  | "Kidney transplantation"
  | "Reconstructive urology"
  | "Pediatric urology"
  | "Andrology";

export type UrologyProfile = {
  procedure: UrologyProcedure;
  shortName: string;
  cluster: UrologyCluster;
  specialist: string;
  /** Billing unit language, e.g. "per operation", "per session". */
  unit: string;
  definition: string;
  mechanism: string;
  candidacy: string;
  limits: string;
  evaluation: string;
  technique: string;
  monitoring: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  inclusionExtra: LabelledDetail;
  exclusionExtra: LabelledDetail;
  records: string[];
  quoteQuestions: string[];
  related: string[];
  topics: { id: string; heading: string; paragraphs: string[] }[];
  faqExtra: { q: string; a: string }[];
  campusFocus: string;
  imageAlts: [string, string, string];
};

export const UROLOGY_EXCLUSIVE_PROCEDURES = UROLOGY_PROCEDURES.filter(
  (procedure): procedure is UrologyProcedure =>
    !UROLOGY_SHARED.includes(procedure as (typeof UROLOGY_SHARED)[number]),
);

export const UROLOGY_PILOT_PROCEDURES = ["PCNL (Percutaneous Nephrolithotomy)"] as const;

const CLUSTER_NOTES: Record<UrologyCluster, string> = {
  "Endourology and stone disease":
    "Endourology is the subspecialty that treats stones and upper-tract problems through natural passages or keyhole tracts using scopes, lasers and shock waves. Stone size, density, location and infection status drive the choice between ESWL, ureteroscopy, RIRS and PCNL.",
  "Prostate and voiding (BPH)":
    "Benign prostatic enlargement and voiding dysfunction are managed by urologists who use flow studies, prostate volume and bladder function to choose between medicines, TURP, HoLEP and photoselective laser vaporization. Prostate cancer surgery is a separate oncology pathway.",
  "Urologic oncology":
    "Urologic oncology covers kidney, bladder, prostate, testicular and penile tumours. Staging imaging, histopathology and multidisciplinary review determine whether an endoscopic resection, an organ-removing operation or a reconstruction is appropriate, and what surveillance follows.",
  "Kidney transplantation":
    "Transplant urology performs the donor and recipient operations while transplant nephrology manages compatibility testing, immunosuppression and graft follow-up. Legal donor approval, crossmatch and ICU capacity shape the episode as much as the surgery itself.",
  "Reconstructive urology":
    "Reconstructive urology repairs strictures, fistulas, injuries and congenital or acquired defects of the urethra, ureter and bladder, often with grafts or bowel segments. Staging, tissue quality and previous operations determine the plan.",
  "Pediatric urology":
    "Pediatric urology treats congenital and childhood conditions of the kidneys, ureters, bladder and genitalia in a children's anaesthesia and ward environment. Timing relative to growth, single versus staged repair and family logistics matter more than in adult practice.",
  Andrology:
    "Andrology addresses male sexual and reproductive health, including erectile dysfunction refractory to medicines and varicocele affecting fertility or pain. Device type, fertility goals and partner expectations shape the treatment discussion.",
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; campus: string; lodging: string; local: string; ecosystem: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    campus:
      "Delhi, Gurugram, Noida and Faridabad are separate clinical corridors with long peak-hour transfers. Confirm whether imaging, the operation, catheter or stent removal and pathology review happen on one campus before fixing accommodation.",
    lodging:
      "Choose lift-accessible lodging within a short drive of the named urology unit, with a private bathroom, reliable drinking water for the hydration plan and a route back if bleeding, fever or urinary retention develops.",
    local:
      "Winter smog and hot pre-monsoon months both increase fluid loss and fatigue. Follow the team's fluid, activity and catheter-care instructions rather than a generic recovery calendar.",
    ecosystem:
      "Delhi NCR hosts several large multi-specialty and dedicated urology and transplant departments with endourology suites, laser platforms, robotic systems and transplant-authorisation committees.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    campus:
      "Mumbai and Navi Mumbai campuses are not interchangeable. Monsoon flooding, harbour crossings and peak traffic matter when an early catheter check or stent removal is time-specific.",
    lodging:
      "Stay on the same side of the harbour as the confirmed campus, and confirm lift access, air conditioning and clean facilities for catheter bags or dressings.",
    local:
      "High humidity and heavy rain make hydration, wound care and mobility harder in the first week. Sheltered transfers and flexible departure dates are practical.",
    ecosystem:
      "Mumbai combines high-volume urology departments, oncology institutes with uro-oncology teams and established kidney-transplant programmes across public-private campuses.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    campus:
      "The airport is far from most hospital districts, and cross-city traffic can turn a short review into a long journey. Name the imaging site, operating campus and where an emergency review would happen.",
    lodging:
      "A stay near the treating campus is more useful than an airport hotel. Arrange a companion because anaesthesia, catheters and pain medicines limit independent travel early on.",
    local:
      "Milder weather does not remove the risk of fever, bleeding or blocked drainage. Complete the scheduled review before fixing onward travel.",
    ecosystem:
      "Bengaluru has established endourology, laser prostate, uro-oncology and transplant departments, several of which support andrology and paediatric urology clinics.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    campus:
      "Some hospital corridors have comparatively direct airport access, but the exact campus still controls transfer times for imaging, surgery, drain or catheter care and pathology collection.",
    lodging:
      "Use air-conditioned, flexible lodging near the named unit with easy vehicle access and clean storage for medicines and catheter supplies.",
    local:
      "Heat and humidity increase dehydration risk, which matters after stone surgery and transplantation. Follow the prescribed fluid target rather than thirst alone.",
    ecosystem:
      "Chennai has long-standing urology and transplant surgery departments, including centres known for reconstructive and paediatric urology work and laser stone platforms.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    campus:
      "The airport lies south of the main hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad produce different transfer plans, so confirm every clinical location first.",
    lodging:
      "Keep flexible lodging and a companion within the response radius the urology team advises, rather than assuming an airport-area stay is suitable.",
    local:
      "Summer heat and long transfers add fatigue while fluids and pain control are being adjusted. Plan indoor recovery and the first review before departure.",
    ecosystem:
      "Hyderabad hosts multi-specialty hospitals with dedicated urology, nephrology-transplant and uro-oncology teams, several with robotic and holmium-laser platforms.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored figure is a national planning range for the operation, hospital stay and standard consumables as written. It does not fix the approach, device, pathology scope or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Approach- and review-dependent",
    positioning: "Quotation required",
    context:
      "Compare surgeon, endoscopic or robotic approach, laser or implant, stent and catheter management, pathology and complication terms rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Approach- and review-dependent",
    positioning: "Quotation required",
    context:
      "International coordination does not establish stone-free confirmation, catheter follow-up or continuity of oncology or transplant care after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Approach- and review-dependent",
    positioning: "Quotation required",
    context:
      "Professional, theatre, device, imaging, pharmacy and follow-up charges are often billed separately and require written confirmation.",
  },
  {
    country: "Singapore",
    stay: "Approach- and review-dependent",
    positioning: "Private self-pay varies",
    context:
      "Request an estimate tied to the imaged anatomy, chosen approach, named device or laser and the expected number of admissions.",
  },
  {
    country: "Germany",
    stay: "Approach- and review-dependent",
    positioning: "Private billing varies",
    context:
      "Eligibility, professional billing, implant scope and postoperative urology follow-up require direct provider confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Approach- and review-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quotation boundaries, urgent access and handover to a local urologist before travelling.",
  },
  {
    country: "United States",
    stay: "Approach- and review-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Surgeon, anaesthesia, facility, device and pathology charges may be separate; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  {
    label: "Named urology consultation",
    detail: "Consultation with the operating urologist, records review and examination when explicitly listed.",
  },
  {
    label: "Pre-anaesthetic assessment",
    detail: "Stated blood tests, ECG, urine culture and anaesthesia review; unlisted cardiac or pulmonary work-up is extra.",
  },
  {
    label: "Theatre and anaesthesia",
    detail: "Operating time, anaesthetist, standard consumables and recovery-room care within the written scope.",
  },
  {
    label: "Ward stay as quoted",
    detail: "Stated nights in the named room category, nursing, routine medicines and standard catheter or wound care.",
  },
  {
    label: "Routine imaging and pathology",
    detail: "Listed fluoroscopy, ultrasound or histopathology only; unlisted CT, PET or special stains are separate.",
  },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Changed operative scope",
    detail: "Conversion to open surgery, a second stage or a different operation found after arrival.",
  },
  {
    label: "Complications and re-intervention",
    detail: "Unplanned ICU, transfusion, re-operation, prolonged drainage, readmission or extra imaging unless expressly covered.",
  },
  {
    label: "Premium devices and consumables",
    detail: "Upgraded stents, catheters, laser fibres, implants or single-use scopes beyond the written specification.",
  },
  {
    label: "Later treatment",
    detail: "Device removal after departure, adjuvant therapy, repeat procedures and long-term medicines unless itemized.",
  },
  {
    label: "Travel and living",
    detail: "Flights, visa, insurance, transfers, companion, lodging, meals, extra nights and care after returning home.",
  },
];

const COMMON_DRIVERS: LabelledDetail[] = [
  {
    label: "Diagnostics before and after",
    detail: "CT urography, MRI, cystoscopy, urodynamics or biopsy each add lines when not bundled.",
  },
  {
    label: "Anaesthesia and fitness",
    detail: "Age, heart or lung disease, diabetes and anticoagulation change work-up, monitoring and ICU probability.",
  },
  {
    label: "Hospital category and room",
    detail: "Campus tier, room class and city all shift nursing, facility and consumable pricing.",
  },
  {
    label: "Length of stay and recovery",
    detail: "Extra nights for drainage, fever, bleeding or slow bladder recovery are billed daily unless capped.",
  },
];

const COMMON_RECORDS = [
  "Recent kidney-function tests (creatinine, eGFR, electrolytes)",
  "Urine analysis and culture with antibiotic sensitivities",
  "Current medicines, allergies and anticoagulant or antiplatelet details",
  "Past operative reports, discharge summaries and anaesthesia records",
];

function makeCities(profile: UrologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic Urology, kidney or hospital label cannot verify current case acceptance. This is a catalog gap, not an availability or quality claim.";
    return {
      citySlug,
      ecosystem: `${place.ecosystem} This page does not infer that every centre performs ${profile.shortName} or offers every approach listed here. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.campus} ${place.lodging} ${place.local}`,
      costNote: `No verified ${place.city}-only tariff for ${profile.shortName} is stored. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Planning Guide`,
        seoDescription: `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national range. Compare approach, devices, stay, ${place.city} logistics and follow-up.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle: `Plan ${profile.shortName} in ${place.city} with named surgeon, approach, devices and follow-up. [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.campus} Anaesthesia, catheters and pain medicines limit independent travel early on, so arrange a companion.`,
          `${place.lodging} ${place.local}`,
          gate,
          "Send records before non-refundable travel. A remote opinion can change after examination, repeat imaging, urine culture and anaesthesia review in person.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST] ${profile.unit}, with [STAY] used only for broad trip planning. Neither is a local tariff, treatment recommendation or acceptance promise.`,
          `Confirm the named urologist, exact campus, approach, ${profile.inclusionExtra.label.toLowerCase()}, included imaging and pathology, catheter or stent plan and where urgent review would happen.`,
        ],
        costExplanation: [
          `${profile.drivers[0].detail} ${profile.drivers[1].detail}`,
          "Ask for surgeon, campus, approach, devices, anaesthesia, theatre, ward nights, pathology, follow-up visits, exclusions and complication terms in writing.",
          `Budget separately for travel through ${place.airport}, nearby lodging, companion support, local transport, take-home medicines and extra nights if a catheter, stent or pathology result delays departure.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send ${profile.records[0].toLowerCase()}, ${profile.records[1].toLowerCase()} and recent kidney-function and urine results before travel to ${place.city}.`,
          "Obtain written acceptance from a named urologist and verify the exact campus, device availability, ICU backup and urgent urology contact.",
          `${profile.recovery} ${place.local} Carry the operative note, pathology and device or stent record for local follow-up.`,
        ],
        hospitalDiscussion: [
          gate,
          `General accreditation does not establish current ${profile.shortName} acceptance, device stock or case-specific support. ${profile.campusFocus}`,
        ],
        faqs: [
          {
            q: `How much does ${profile.procedure} cost in ${place.city}?`,
            a: `[INDIA_COST] is the stored national planning range ${profile.unit}. No verified ${place.city}-only tariff is stored; request an itemized quotation from a named campus.`,
          },
          {
            q: `Which ${place.city} clinician should assess me for ${profile.shortName}?`,
            a: `A named ${profile.specialist} should review your records and examine you. Dynamic cards require an exact CMS relationship and are not recommendations or rankings.`,
          },
          {
            q: `Where should a patient stay in ${place.city} after ${profile.shortName}?`,
            a: `${place.lodging} ${place.campus}`,
          },
          {
            q: `How long should I stay in ${place.city} after ${profile.shortName}?`,
            a: `[STAY] is the stored hospital-stay guide. ${profile.recovery} Do not book a fixed return flight until the team documents travel fitness.`,
          },
          {
            q: `What should a ${place.city} estimate for ${profile.shortName} name?`,
            a: `It should name surgeon, campus, approach, ${profile.inclusionExtra.label.toLowerCase()}, imaging, pathology, ward nights, catheter or stent plan, follow-up, exclusions and complication terms.`,
          },
        ],
      },
    };
  });
}

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}

function lastSentence(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]/g);
  return sentences ? sentences[sentences.length - 1].trim() : text;
}

function seoTitleFor(profile: UrologyProfile): string {
  const full = `${profile.procedure} Cost in India: Planning Guide`;
  if (full.length <= 70) return full;
  const short = profile.shortName.charAt(0).toUpperCase() + profile.shortName.slice(1);
  return `${short} Cost in India: Planning Guide`;
}

function seoDescriptionFor(profile: UrologyProfile): string {
  const lead = `${profile.procedure} cost in India is [INDIA_COST] ${profile.unit}.`;
  const full = `${lead} Compare approaches, devices, hospital stay, risks, recovery and city planning.`;
  return full.length <= 160 ? full : `${lead} Compare approaches, devices, stay, risks and recovery.`;
}

function createUrologyArticle(profile: UrologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const short = profile.shortName;
  const cluster = CLUSTER_NOTES[profile.cluster];
  return {
    procedure: profile.procedure,
    shortName: short,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: firstSentence(profile.recovery),
    seoTitle: seoTitleFor(profile),
    seoDescription: seoDescriptionFor(profile),
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle: `A planning guide to ${short} in India: what the range covers, how the approach is chosen, recovery and international travel — not a promise of outcome.`,
    introduction: [
      profile.mechanism,
      `${profile.limits}`,
      "This guide compares quotations; it cannot diagnose, choose an approach or decide timing. A urologist must connect symptoms, imaging and laboratory findings and explain individual uncertainty.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST] ${profile.unit}, with [STAY] as the stored hospital-stay guide. The range usually covers the named surgeon, anaesthesia, theatre time, standard consumables, quoted ward nights and routine pathology; imaging before arrival, upgraded devices, extra nights and treatment after departure are commonly separate. [US_COST] is the comparison reference.`,
      `${profile.drivers[0].detail} ${profile.drivers[1].detail}`,
      `Planning Range ≠ Final Hospital Quotation. Examination, current imaging, urine culture and anaesthesia review by a named ${profile.specialist} come before candidacy, approach, risks and a final offer are meaningful.`,
    ],
    indiaCost: [
      `[INDIA_COST] is the stored India planning range for ${short}, ${profile.unit}, and [US_COST] the stored self-pay comparison. Neither is a guaranteed package; a changed approach, extra imaging, a longer stay or a second stage alters the final amount.`,
      `A usable estimate names the surgeon, campus, approach, ${profile.inclusionExtra.label.toLowerCase()}, anaesthesia, ward nights, pathology and follow-up, with professional, facility, device, imaging and pharmacy lines separated so two hospitals can be compared line by line.`,
      "Budget separately for flights, visa, insurance, transfers, companion, lodging, meals, extra nights and local follow-up unless expressly included.",
    ],
    costDrivers: [...profile.drivers, ...COMMON_DRIVERS],
    whyQuotesDiffer: `Two quotations for ${short} may describe different approaches, devices, ward categories, pathology scope, catheter or stent plans and complication coverage. Compare those lines before comparing totals.`,
    inclusions: [...COMMON_INCLUSIONS, profile.inclusionExtra],
    exclusions: [...COMMON_EXCLUSIONS, profile.exclusionExtra],
    approachComparison: {
      heading: `${profile.procedure}: approaches and where they differ`,
      intro: [
        "The approach is selected for the examined patient, not from a quality ladder. Each option carries its own consumables, theatre time, stay and follow-up, so a quotation must name it.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Individual assessment determines suitability",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [profile.definition],
      who: [profile.candidacy],
      how: [profile.technique, profile.monitoring],
      variations: profile.approaches.map((item) => ({ label: item.label, detail: firstSentence(item.detail) })),
      preparation: [
        profile.evaluation,
        "Clinicians direct anticoagulants, antiplatelets, diabetes medicines, fasting and hygiene. A positive urine culture is usually treated first and can postpone surgery.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        `Keep catheter, stent or wound care clean. Seek urgent urology help for ${profile.urgent}.`,
      ],
    },
    topicSections: [
      {
        id: "subspecialty",
        heading: `${profile.cluster}: the subspecialty behind ${profile.procedure}`,
        paragraphs: [cluster],
      },
      ...profile.topics,
      {
        id: "risks",
        heading: `Risks and side effects of ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "Ask before travel who pays for re-intervention, transfusion, ICU, prolonged drainage, readmission or a second stage.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        "International planning starts with records and a named clinical question. A remote opinion is provisional until in-person examination, current imaging and anaesthesia review confirm the plan.",
      ],
      stages: [
        { label: "Send records", detail: `Provide ${profile.records[0].toLowerCase()} and kidney-function results.` },
        { label: "Remote triage", detail: `A named ${profile.specialist} reviews whether ${short} is a reasonable question.` },
        { label: "Treatment plan", detail: "A written plan names approach, devices, stay and what could change it." },
        { label: "Itemize quotation", detail: "Surgeon, campus, anaesthesia, ward nights, pathology and exclusions." },
        { label: "Plan travel", detail: "Flexible flights, lodging near the campus and a companion." },
        { label: "Arrive and examine", detail: "Examination, urine culture, repeat imaging and anaesthesia review." },
        { label: "Confirm consent", detail: "Approach, risks, catheter or stent plan and possible changes." },
        { label: "Complete procedure", detail: `The consented ${short} with the stated monitoring.` },
        { label: "Early recovery", detail: "Urine output, bleeding, pain, fever and drain or catheter function." },
        { label: "Review results", detail: "Imaging, pathology or function results and any second stage." },
        { label: "Clear travel", detail: "Written travel fitness, medicines and the removal plan for any device." },
        { label: "Handover home", detail: "Operative note, pathology and follow-up schedule for a local urologist." },
      ],
    },
    journey: [
      { label: "Define the problem", detail: "Symptoms, imaging and previous treatment." },
      { label: "Collect records", detail: "Imaging, laboratories and operative history." },
      { label: "Identify clinician", detail: `Named ${profile.specialist} and campus.` },
      { label: "Assess candidacy", detail: "Anatomy, function, infection and anaesthesia fitness." },
      { label: "Choose approach", detail: "Options for your findings, not a brochure default." },
      { label: "Compare quotes", detail: "Same approach, devices, nights and follow-up." },
      { label: "Plan travel", detail: "Flexible travel, lodging and a companion." },
      { label: "Confirm consent", detail: "Findings, risks and what could change." },
      { label: "Complete treatment", detail: "Procedure and monitored recovery." },
      { label: "Manage devices", detail: "Catheter, stent or drain instructions." },
      { label: "Attend review", detail: "Imaging, pathology or function checks." },
      { label: "Handover home", detail: "Operative record and follow-up schedule." },
    ],
    documents: [...profile.records, ...COMMON_RECORDS],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      `India and United States values use stored GAF planning ranges; the other countries require direct quotations. Compare the same diagnosis, approach, devices, anaesthesia, ward category, pathology and complication terms for ${short}; a lower headline with a different approach is not like-for-like.`,
    ],
    destinationNote:
      "International comparisons are indicative. Currency, changed findings, a different device or approach and length of stay can change the final amount.",
    cityIntro: [
      `Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad use [INDIA_COST] because no verified city tariff is stored. Their overlays add campus geography, transfers, lodging, climate and follow-up logistics without inventing local prices. Doctor and hospital cards resolve only from CMS entities carrying an exact current ${profile.procedure} relationship.`,
    ],
    whyIndia: [
      `Some patients consider India for ${short} because named urologists, endoscopic and laser platforms, robotic systems, transplant programmes and a national self-pay range are visible in one place. Price alone is not a clinical reason to travel, and listing does not establish acceptance.`,
      "Evaluate surgeon, licensure, campus, device traceability, ICU and dialysis backup where relevant, pathology quality, urgent access and home handover. No provider is ranked and no outcome is promised; unstable disease, insufficient records or suitable local care can make travel inappropriate.",
    ],
    questionsToAsk: [
      `Who is the operating ${profile.specialist}, and at which exact campus?`,
      `Why does ${short} fit my findings better than the alternatives?`,
      "Which approach is planned, and what would make you change it on the day?",
      "Is the quotation for one operation, one stage or a complete pathway?",
      "What happens to the schedule if my urine culture is positive?",
      "Which devices, stents, catheters or implants are assumed, by name?",
      "How many ward nights are quoted, and in which room category?",
      "Is ICU or high-dependency care included if needed?",
      "When will any catheter, stent or drain be removed, and is that included?",
      "What is charged if the operation is converted or a second stage is needed?",
      "Which symptoms require urgent review, and where would that happen?",
      "When may I lift, exercise, resume sexual activity, work and fly?",
      "Who coordinates follow-up with my urologist after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.procedure} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST] ${profile.unit}. This stored national range is not a quotation; approach, devices, ward nights, pathology and written terms determine the final amount.`,
      },
      { q: `What is ${profile.procedure}?`, a: profile.definition },
      { q: `When is ${short} considered?`, a: profile.candidacy },
      {
        q: `Is ${short} in India automatically cheaper than at home?`,
        a: `It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare approach, surgeon, devices, ward category, pathology and complication terms; [US_COST] is the stored comparison reference.`,
      },
      { q: `What assessment is needed before ${short}?`, a: profile.evaluation },
      { q: `How long is the hospital stay after ${short}?`, a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: `What are the important risks of ${short}?`, a: profile.risks },
      {
        q: `When can an international patient fly home after ${short}?`,
        a: `There is no fixed flight day. ${lastSentence(profile.recovery)} The treating team must document travel fitness.`,
      },
      ...profile.faqExtra,
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro: `Profiles appear only when ${profile.procedure} is an exact current CMS procedure relationship. Verify subspecialty scope, availability and campus; placement is not a ranking or outcome claim.`,
    hospitalHeading: `Hospitals and urology centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro: `Cards follow exact live entity relationships for ${profile.procedure}. A general urology or accreditation label does not establish current acceptance, device stock or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/urology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/urology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual treatment pathway; the actual plan depends on examination, imaging and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/urology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

export const urologyArticles = UROLOGY_PROFILES.map(createUrologyArticle);

export const urologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  urologyArticles.map((article) => [article.slug, article]),
);
