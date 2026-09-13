import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { GYNECOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_GYNECOLOGY = ["Radical Hysterectomy"] as const;

type ExclusiveGynecology = Exclude<
  (typeof GYNECOLOGY_PROCEDURES)[number],
  (typeof SHARED_GYNECOLOGY)[number]
>;

type GynecologyProfile = {
  procedure: ExclusiveGynecology;
  shortName: string;
  specialist: string;
  definition: string;
  candidacy: string;
  anatomy: string;
  distinction: string;
  evaluation: string;
  technique: string;
  conversion: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  pathology: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  records: string[];
  followUp: string;
  quoteQuestions: string[];
  related: ExclusiveGynecology[];
  campusFocus: string;
  imageAlts: [string, string, string];
};

export const GYNECOLOGY_EXCLUSIVE_PROCEDURES = GYNECOLOGY_PROCEDURES.filter(
  (procedure): procedure is ExclusiveGynecology =>
    !SHARED_GYNECOLOGY.includes(procedure as (typeof SHARED_GYNECOLOGY)[number]),
);

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    arrival: string;
    lodging: string;
    localRecovery: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are different hospital corridors. Confirm the exact campus before choosing a hotel: crossing NCR after anaesthesia, with pelvic pain or for an urgent wound review can take much longer than a map suggests.",
    lodging:
      "Choose flexible, lift-accessible lodging near the named campus, with a private bathroom, space for a companion and a reliable night-time return route.",
    localRecovery:
      "Winter pollution, summer heat and long road journeys can add cough, dehydration or fatigue during abdominal recovery. The surgical team's mobility, hydration and wound instructions take priority.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable recovery bases. Peak traffic, harbour crossings and monsoon disruption matter when returning for pathology, urinary symptoms, bleeding or a wound concern.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital. Verify lift access, a nearby pharmacy, a private bathroom and transport that does not require prolonged standing.",
    localRecovery:
      "Humidity and monsoon travel make dry dressings, breathable clothing and a contingency night practical; they do not change the clinician's criteria for discharge or flying.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts, and cross-city traffic can turn a routine review into a long seated journey. Confirm where surgery, pathology discussion and any emergency reassessment occur.",
    lodging:
      "A lift-accessible stay near the operating campus is usually more useful than an airport hotel. Plan simple meals, a companion and short, level walking space.",
    localRecovery:
      "Milder weather may make nearby walking more comfortable, but it does not reduce bleeding, infection, urinary, bowel or venous-thromboembolism risk.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Some hospital corridors have comparatively direct airport access, but heat and a car journey soon after pelvic surgery still require a planned vehicle, companion and permission from the treating team.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with lift access, a private bathroom and an easy route back for fever, heavy bleeding or escalating pain.",
    localRecovery:
      "Heat can aggravate dehydration, constipation and fatigue. Follow individualized fluid advice, particularly when nausea, bladder symptoms or another medical condition is present.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different transfer times, so book lodging only after the exact surgical and follow-up campus is named.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius advised by the team, with a private bathroom and pharmacy access.",
    localRecovery:
      "Summer heat and the long airport transfer can compound fatigue after surgery. Plan indoor recovery, short supported walks and the pathology review before fixing departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, procedure scope, approach, pathology, hospital stay or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact procedure scope, approach, clinician and anaesthesia fees, pathology, ward nights and complication terms rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish individual acceptance, ovarian-conservation planning, conversion support or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, anaesthesia, consumable, pathology and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the indication, exact treatment scope, approach and expected admission.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, pathology scope and post-travel gynecology follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews final histology after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, anaesthesia, pathology and follow-up charges may be separate; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  {
    label: "Preoperative clinical assessment",
    detail: "Named gynecologist and anaesthesia assessments when itemized.",
  },
  {
    label: "Planned operation",
    detail: "Clinician, theatre, procedure-specific instruments and consented scope.",
  },
  {
    label: "Anaesthesia and routine medicines",
    detail: "General anaesthesia, routine medicines and stated monitoring.",
  },
  {
    label: "Hospital recovery",
    detail: "Recovery room, stated ward nights and room category.",
  },
  {
    label: "Routine histopathology and early review",
    detail: "Standard listed-specimen histology and stated early review.",
  },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Changed surgical scope",
    detail: "Unlisted organ removal, adhesiolysis, excision, repair or staging.",
  },
  {
    label: "Conversion and complications",
    detail: "Conversion, transfusion, ICU, re-operation or extended admission unless covered.",
  },
  {
    label: "Additional pathology",
    detail: "Frozen section, special tests or outside review unless itemized.",
  },
  {
    label: "Extended care",
    detail: "Long-term medicines, therapy, oncology care or later follow-up.",
  },
  {
    label: "Travel and living",
    detail: "Flights, visas, transport, lodging, meals and companion costs.",
  },
];

function makeCities(profile: GynecologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic Gynecology, minimally invasive surgery or hospital label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader women's-health and surgical ecosystem, but this page does not infer that every centre performs ${profile.shortName}. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.localRecovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Surgery Planning`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare organ scope, route, pathology, recovery and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact operating campus, emergency return route and pathology location.`,
          `${place.lodging} ${place.localRecovery}`,
          gate,
          "Send complete gynecology records before non-refundable travel. Remote review can change after examination, imaging, anaesthesia assessment or pathology review.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither value is a city tariff, acceptance promise or recommendation.`,
          `${profile.technique} ${profile.conversion} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical and resource differences, not premium upgrades.`,
          "Ask for the exact organ scope, route, surgeon, anaesthesia, pathology, ward nights, conversion terms, exclusions and follow-up in writing.",
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, meals, medicines and extra nights if pathology or recovery delays departure.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send pelvic imaging, gynecology notes, cervical screening, biopsy or endometrial sampling and prior operation records before travel to ${place.city}.`,
          "Obtain written acceptance from a named surgeon and confirm anaesthesia, blood bank, urinary-tract or general-surgery support appropriate to the individualized plan.",
          `${profile.recovery} ${place.localRecovery} Travel only after the team documents clinical stability and a follow-up plan.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, operating surgeon, organ scope, conversion plan, pathology handover and emergency contact in writing. General accreditation does not establish current capability or outcomes.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored; an itemized provider estimate is required.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A named ${profile.specialist} should assess it. Cards appear only for exact live CMS relationships and are not rankings.`,
          },
          {
            q: `Where should a patient recover in ${place.city}?`,
            a: `${place.lodging} ${place.arrival}`,
          },
          {
            q: "When can an international patient fly home?",
            a: `There is no universal date. ${profile.recovery} The treating team must document travel fitness.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, organs planned for removal or conservation, surgical route, pathology, nights, conversion and complication terms.`,
          },
        ],
      },
    };
  });
}

function createGynecologyArticle(profile: GynecologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Scope, Recovery & Planning`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare clinical scope, approaches, pathology, recovery and international travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} Compare the [INDIA_COST] planning range, individualized scope, pathology and recovery.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.anatomy} ${profile.distinction}`,
      `${profile.evaluation} This page cannot choose between surgery, less extensive treatment or observation.`,
      `[INDIA_COST], [US_COST] and [STAY] are planning tokens, not tariffs, acceptance or final bills. Match the quote to the planned organs, route and pathology.`,
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. A useful estimate identifies the indication, exact surgical scope and approach, named surgeon, anaesthesia and facility fees, routine pathology, stated ward nights and early review. ${profile.distinction} The stored stay is [STAY], but discharge and flying depend on individual recovery.`,
      `Major variables are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Changed findings, added procedures, complications or longer admission produce a different bill.`,
      "Planning Range ≠ Final Hospital Quotation. Records review and a qualified gynecology and anaesthesia assessment are needed before candidacy, organ scope, risks and an itemized offer are meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}, not a guaranteed package. Replace it with an itemized quotation tied to a named ${profile.specialist}, campus, indication, organ scope, route, expected nights and pathology plan.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A limited procedure is not comparable with broader treatment, difficult anatomy or added specialist work.`,
      "Do not derive Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad tariffs from the national range. Keep [US_COST], flights, visas, local transport, companion lodging, meals, take-home medicines, extra recovery nights and a complication contingency visible.",
    ],
    costComponents: [
      ...COMMON_INCLUSIONS,
      {
        label: "Procedure-specific scope",
        detail: `${profile.distinction} Every additional procedure should be named.`,
      },
    ],
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two ${profile.shortName} estimates may assume different scope, complexity, staff, equipment, pathology, room category and complication terms. Compare each line.`,
    inclusions: [
      ...COMMON_INCLUSIONS,
      {
        label: "Named procedure plan",
        detail: `Only the explicitly stated ${profile.shortName} scope and approach are included.`,
      },
    ],
    exclusions: COMMON_EXCLUSIONS,
    approachComparison: {
      heading: `Approaches and alternatives to ${profile.procedure}`,
      intro: [
        "Access route is a clinical decision, not a quality ladder.",
        "Anatomy, prior treatment, disease extent, health, fertility goals and specialist expertise guide selection.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from indication, anatomy, prior surgery, risk and local expertise",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [
        profile.definition,
        profile.anatomy,
        profile.distinction,
      ],
      who: [
        profile.candidacy,
        "A qualified gynecologist must assess suitability; complex disease may require multidisciplinary review. This page cannot recommend treatment.",
      ],
      how: [
        profile.technique,
        profile.conversion,
        `Specimens go to pathology. Theatre time is ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "Reconcile blood thinners, diabetes medicines, hormones, allergies and previous anaesthesia problems.",
        "Follow the team's fasting and medicine instructions; consent should name organ scope and conversion.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Early care covers pain, nausea, urination, walking, VTE prevention, wounds, bleeding and bowel function.",
        profile.risks,
        `Follow written instructions. Seek urgent help for ${profile.urgent}.`,
      ],
    },
    topicSections: [
      {
        id: "organs-and-terminology",
        heading: `Anatomy and scope for ${profile.procedure}`,
        paragraphs: [`${profile.anatomy} ${profile.distinction}`],
      },
      {
        id: "technique-and-conversion",
        heading: `How ${profile.procedure} is performed`,
        paragraphs: [`${profile.technique} ${profile.conversion}`],
      },
      {
        id: "pathology",
        heading: "Why pathology remains part of the pathway",
        paragraphs: [profile.pathology],
      },
      {
        id: "specific-risks",
        heading: "Risks and safety considerations",
        paragraphs: [profile.risks],
      },
      {
        id: "recovery-and-travel",
        heading: "Recovery, follow-up and international travel",
        paragraphs: [`${profile.recovery} ${profile.followUp} Discharge is not fitness to fly.`],
      },
    ],
    fullPathway: {
      intro: [
        `Budget beyond [INDIA_COST] for review, tests, travel, lodging, medicines, extra nights and complications.`,
        "Travel requires clinical acceptance and an itemized estimate; an appointment is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        {
          label: "Gynecology consultation",
          detail: "Confirm indication, alternatives, goals and fertility implications.",
        },
        {
          label: "Scope decision",
          detail: profile.distinction,
        },
        {
          label: "Approach and alternatives",
          detail: `Compare ${approachNames} and non-surgical care.`,
        },
        {
          label: "Itemized estimate",
          detail: "Match scope, staff, theatre, pathology, nights, conversion and exclusions.",
        },
        {
          label: "Arrival reassessment",
          detail: "Update examination and indicated tests before consent.",
        },
        { label: "Operation and monitoring", detail: profile.technique },
        {
          label: "Mobility and wound care",
          detail: "Review pain, VTE prevention, walking, bladder, bowel and wounds.",
        },
        {
          label: "Pathology and nearby review",
          detail: "Review specimens, warning signs and emergency contacts.",
        },
        {
          label: "Handover home",
          detail: "Carry the operation note, discharge summary and pathology.",
        },
      ],
    },
    journey: [
      { label: "Submit records", detail: "Send imaging, sampling, operation notes and current tests." },
      {
        label: "Specialist review",
        detail: `A named ${profile.specialist} assesses the case.`,
      },
      {
        label: "Clarify goals",
        detail: "Discuss symptoms, fertility, organ preservation and realistic aims.",
      },
      { label: "Confirm candidacy", detail: "Review alternatives, anatomy and operative risk." },
      {
        label: "Write the organ scope",
        detail: profile.distinction,
      },
      {
        label: "Compare estimates",
        detail: "Hold scope, route, pathology, nights and conversion constant.",
      },
      {
        label: "Plan travel",
        detail: "Use flexible flights, a companion and nearby accessible lodging.",
      },
      { label: "Arrival review", detail: "Update examination, tests and consent." },
      {
        label: "Complete consent",
        detail: "Review risks, alternatives and possible plan changes.",
      },
      { label: "Undergo treatment", detail: `Complete the consented ${profile.shortName}.` },
      {
        label: "Monitored recovery",
        detail: "Check mobility, VTE plan, function, wounds and medicines.",
      },
      {
        label: "Review and handover",
        detail: "Confirm pathology, flight clearance and local follow-up.",
      },
    ],
    documents: [
      ...profile.records,
      "Current medicines, doses, allergies, previous anaesthesia problems and relevant medical records",
      "Recent blood count and other laboratory results requested by the receiving team",
      "Cervical screening, endometrial biopsy or hysteroscopy reports when relevant",
      "Passport, visa and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require direct quotations because comparable procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds indication, exact scope, approach, clinician, licensed facility, anaesthesia, pathology, ward nights and complication terms constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, additional procedures, conversion, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their overlays add local airport, geography, climate, lodging and recovery logistics without inventing local prices or provider capabilities.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic Gynecology, laparoscopy or hospital entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, minimally invasive surgical infrastructure and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, appropriate licensure, procedure-specific experience, anaesthesia and emergency support, pathology quality, blood access and continuity after return.",
      "No provider is ranked and no outcome is promised. Suspected cancer needing specialist staging, unstable illness, severe anaemia, inadequate records or safer established care near home may make an elective trip inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} considered, and what alternatives remain?`,
      "What diagnosis and treatment goal are documented?",
      `Who is the named ${profile.specialist}, and at which campus?`,
      "What exact anatomy, lesions or compartments will be treated?",
      "Which organs or structures will be preserved or removed?",
      "What findings could change the consented scope?",
      "How were disease extent, adhesions and prior treatment assessed?",
      "Which tests, imaging and tissue sampling are required?",
      "Which surgeon, anaesthesia and theatre fees are included?",
      "Which equipment, implants and consumables are assumed?",
      "How will specimens be removed, labelled and examined?",
      "What could require staged, converted or additional surgery?",
      "How are transfusion, organ repair, ICU and extra nights billed?",
      "What specialist and emergency support exists on campus?",
      "How many nights and which room category are included?",
      "Which medicines and VTE-prevention measures are included?",
      "Which pathology tests and result review are included?",
      "Which warning signs require urgent reassessment?",
      "When may I resume activity and fly?",
      "What follow-up, documents, exclusions and home handover are included?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: "[INDIA_COST] is a national planning range, not a quotation. Scope, complexity, pathology and stay determine the final bill.",
      },
      {
        q: `What is ${profile.shortName}?`,
        a: profile.definition,
      },
      {
        q: "What is the key clinical distinction?",
        a: profile.distinction,
      },
      {
        q: "Which anatomy matters?",
        a: profile.anatomy,
      },
      {
        q: "Who may be considered for this operation?",
        a: profile.candidacy,
      },
      {
        q: "What assessment is needed first?",
        a: profile.evaluation,
      },
      {
        q: "How is the operation performed?",
        a: profile.technique,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Findings can change timing.`,
      },
      {
        q: "How long is the hospital stay?",
        a: `${profile.admission} Clinical criteria determine discharge.`,
      },
      {
        q: "What are the important risks?",
        a: profile.risks,
      },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed date. ${profile.recovery} The team must confirm fitness.`,
      },
      {
        q: "What follow-up is needed after returning home?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `${profile.procedure} surgeons in India`,
    cityDoctorHeading: `${profile.procedure} surgeons in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify scope, availability and campus; placement is not a ranking, case-volume or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live CMS entity relationships for ${profile.procedure}. A general Gynecology or accreditation label does not establish current case acceptance, procedure support or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/gynecology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: `Educational anatomy and scope diagram for ${profile.shortName}; not patient-specific.`,
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/gynecology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: `Conceptual ${profile.shortName} pathway; scope and technique depend on assessment and consent.`,
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/gynecology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption:
          "Recovery milestones vary; the treating team's wound, mobility, pathology and travel advice takes priority.",
        fit: "contain",
      },
    ],
  };
}

type GynecologyProfileInput = Pick<
  GynecologyProfile,
  | "procedure"
  | "shortName"
  | "specialist"
  | "definition"
  | "candidacy"
  | "anatomy"
  | "distinction"
  | "evaluation"
  | "technique"
  | "approaches"
  | "risks"
  | "drivers"
  | "related"
  | "imageAlts"
> &
  Partial<GynecologyProfile>;

function completeProfile(input: GynecologyProfileInput): GynecologyProfile {
  const defaults: GynecologyProfile = {
    ...input,
    conversion:
      "Unexpected anatomy, bleeding or adjacent-organ concern can change or extend the planned procedure; consent and quotation should explain that possibility.",
    duration: "commonly 1–3 hours, with timing dependent on scope and findings",
    admission:
      "Care may be outpatient, day surgery or include hospital nights according to approach and recovery.",
    recovery:
      "Recovery follows pain, bleeding, mobility, bladder and bowel function, wound or vaginal care and VTE assessment rather than a fixed calendar.",
    pathology:
      "Removed tissue should be labelled for histopathology, with a named clinician responsible for communicating the final report and arranging any further review.",
    urgent:
      "heavy bleeding, fainting, fever, worsening pain, persistent vomiting, chest pain, breathlessness, leg swelling, urinary difficulty or wound problems",
    records: [
      "Gynecology consultation and symptom timeline",
      "Pelvic imaging with reports and image files",
      "Relevant cervical, endometrial or lesion pathology",
      "Prior pelvic operation notes",
      "Current laboratory and medical assessment",
    ],
    followUp:
      "A local gynecologist should receive the procedure note, discharge summary and pathology and review symptoms, healing and further care.",
    quoteQuestions: [
      "What could alter the planned scope?",
      "When will pathology be available?",
      "Who manages a complication after return?",
    ],
    campusFocus:
      "Confirm the named clinician, exact procedure, anaesthesia, pathology and relevant emergency support at that campus.",
    // Explicit values below override these safe defaults.
    ...input,
  };
  return defaults;
}

function procedureDrivers(...specific: LabelledDetail[]): LabelledDetail[] {
  return [
    ...specific,
    { label: "Anaesthesia and medical risk", detail: "Comorbidity can change testing, monitoring and stay." },
    { label: "Facility and admission", detail: "Day care, ward and higher-acuity care are different scopes." },
    { label: "Pathology scope", detail: "Routine histology and additional studies must be compared separately." },
    { label: "Unexpected findings", detail: "Added procedures or complications change the episode." },
  ];
}

const profiles: GynecologyProfile[] = [
  {
    procedure: "Laparoscopic Hysterectomy",
    shortName: "laparoscopic hysterectomy",
    specialist: "gynecologist trained in minimally invasive gynecologic surgery",
    definition:
      "Laparoscopic hysterectomy removes the uterus through small abdominal ports using a camera and long instruments.",
    candidacy:
      "It may be considered for selected patients with fibroids, adenomyosis, persistent abnormal bleeding, endometriosis or prolapse after alternatives, fertility wishes, anatomy and operative risk are reviewed. A diagnosis alone does not establish candidacy.",
    anatomy:
      "The uterus can carry pregnancy; its lower neck is the cervix. Separate fallopian tubes and hormone-producing ovaries are not automatically removed.",
    distinction:
      "Total means uterus plus cervix, not ovary removal. Supracervical surgery retains the cervix; tube removal and ovarian conservation need separate consent.",
    evaluation:
      "Assessment reviews symptoms, fertility goals, pelvic examination, indicated imaging, blood count and anaesthesia risk. Cervical screening, endometrial sampling or malignancy-focused review may also be needed.",
    technique:
      "Carbon dioxide creates space for camera ports. The surgeon protects ureters, controls uterine vessels and pedicles, removes consented organs and closes the vaginal cuff.",
    conversion:
      "Adhesions, bleeding, bowel or urinary-tract concern, anatomy or extraction may require open conversion as a safety step.",
    approaches: [
      {
        label: "Conventional laparoscopic hysterectomy",
        detail:
          "Camera-guided surgery through small ports, sometimes with vaginal steps.",
      },
      {
        label: "Vaginal hysterectomy",
        detail:
          "Removal without abdominal ports may suit selected mobile uteri or prolapse.",
      },
      {
        label: "Robotic hysterectomy",
        detail:
          "Console-controlled instruments add different equipment, not automatic clinical superiority.",
      },
      {
        label: "Open abdominal hysterectomy",
        detail:
          "A larger incision may be planned or used when laparoscopy cannot continue safely.",
      },
    ],
    duration: "often about 1–3 hours, but longer when anatomy or additional procedures are complex",
    admission:
      "Many uncomplicated pathways use day care or 1–2 nights; symptoms, medical needs or conversion can extend admission.",
    recovery:
      "Walking usually begins early, then activity increases gradually. Wounds, bladder and bowel function, bleeding, pain and VTE risk determine when work, lifting, driving, intercourse and flying resume.",
    pathology:
      "Every removed structure should be labelled for histopathology. A named clinician must communicate the final report and arrange referral if unexpected disease is found.",
    risks:
      "Risks include bleeding or transfusion, infection, venous thromboembolism, anaesthesia problems, injury to bladder, ureters, bowel, vessels or nerves, urinary retention, vaginal-cuff bleeding or separation, port hernia, open conversion and further treatment after pathology.",
    urgent:
      "heavy bleeding, fainting, breathlessness, leg swelling, fever, worsening pain, vomiting, urinary difficulty or wound opening",
    drivers: [
      {
        label: "Indication, uterine size and anatomy",
        detail:
          "A mobile uterus with straightforward benign disease differs from a large fibroid uterus, deep endometriosis, prolapse or distorted anatomy.",
      },
      {
        label: "Previous surgery and adhesions",
        detail:
          "Prior caesarean or abdominal operations can add dissection time and urinary-tract or bowel risk.",
      },
      {
        label: "Exact organ scope",
        detail:
          "Total versus supracervical hysterectomy and tube or ovary removal require different consent, pathology and operative work.",
      },
      {
        label: "Additional procedures",
        detail:
          "Adhesiolysis, endometriosis excision, cyst surgery, prolapse repair or urinary-tract procedures are separate work unless listed.",
      },
      {
        label: "Uterine-removal method and instruments",
        detail:
          "Vaginal extraction, contained tissue reduction or another method uses different equipment and must fit malignancy assessment.",
      },
      {
        label: "Anaesthesia, room category and stay",
        detail:
          "Medical comorbidity, ward choice and extra observation change facility and professional charges.",
      },
      {
        label: "Pathology scope",
        detail:
          "Routine histology, frozen section, immunohistochemistry and outside review are not interchangeable.",
      },
      {
        label: "Conversion or complication care",
        detail:
          "Open conversion, transfusion, organ repair, ICU or readmission materially changes the episode.",
      },
    ],
    records: [
      "Gynecology consultation and symptom history",
      "Pelvic imaging with reports and files",
      "Relevant cervical or endometrial reports",
      "Prior abdominal or pelvic operation notes and pathology",
      "Blood count, blood group and other requested preoperative tests",
    ],
    followUp:
      "Review incisions, vaginal cuff, symptoms and pathology; send all reports to the local gynecologist.",
    quoteQuestions: [
      "Is cystoscopy planned or available if urinary-tract assessment is needed?",
      "Is a vaginal-cuff review included before departure?",
      "What is the escalation plan if final pathology is unexpected?",
    ],
    related: ["Vaginal Hysterectomy", "Robotic Hysterectomy", "Abdominal Hysterectomy"],
    campusFocus:
      "Confirm the operating surgeon, anaesthesia, pathology and ability to manage urinary-tract, bowel, bleeding or open-conversion needs at that exact campus.",
    imageAlts: [
      "Patient-education pelvic anatomy schematic labeling uterus, cervix, both fallopian tubes and ovaries while distinguishing hysterectomy from optional tube or ovary removal",
      "Numbered laparoscopic hysterectomy pathway showing evaluation and imaging, port placement, uterine vessel and pedicle control, specimen removal and pathology",
      "Laparoscopic hysterectomy recovery pathway showing monitored recovery, early mobility and VTE prevention, incision care, pathology review and follow-up",
    ],
  },
  completeProfile({
    procedure: "Robotic Hysterectomy",
    shortName: "robotic hysterectomy",
    specialist: "gynecologist trained in robotic minimally invasive surgery",
    definition: "Robotic hysterectomy is laparoscopic uterus removal performed with surgeon-controlled wristed instruments at a console.",
    candidacy: "It may suit selected benign or malignant indications after alternatives, anatomy, fertility, previous surgery and anaesthetic risk are reviewed.",
    anatomy: "The planned operation must separately name uterus, cervix, each tube and each ovary; port position depends on pelvic anatomy.",
    distinction: "The robot is an instrument platform, not an autonomous surgeon or guaranteed superior result. Total hysterectomy still means uterus plus cervix, not automatic tube or ovary removal.",
    evaluation: "Review imaging, uterine size, prior operations, tissue diagnosis when indicated and whether robotic access offers a practical surgical route.",
    technique: "After ports and docking, the surgeon controls a camera and wristed instruments from a console, dissects pedicles and vessels, removes consented organs and sends tissue to pathology.",
    conversion: "Docking, extra equipment and trained-team time affect cost; adhesions, bleeding or anatomy may require conventional laparoscopy or laparotomy.",
    approaches: [
      { label: "Robotic total hysterectomy", detail: "Removes uterus and cervix using console-controlled instruments." },
      { label: "Conventional laparoscopy", detail: "Uses handheld instruments without robotic docking." },
      { label: "Vaginal or open route", detail: "May better fit selected prolapse, uterine size or complexity." },
    ],
    risks: "Risks include bleeding, infection, VTE, anaesthesia problems, port injury, bladder, ureter, bowel or vessel injury, cuff problems and conversion.",
    drivers: procedureDrivers(
      { label: "Console and robotic equipment", detail: "Platform, instruments and docking are material resource lines." },
      { label: "Organ scope", detail: "Cervix, tubes, ovaries and staging steps must be explicit." },
      { label: "Docking and theatre time", detail: "Complex anatomy can extend console and operating time." },
      { label: "Conversion plan", detail: "Laparoscopic or open conversion changes resources and recovery." },
    ),
    related: ["Laparoscopic Hysterectomy", "Vaginal Hysterectomy", "Abdominal Hysterectomy"],
    imageAlts: [
      "Patient-education pelvic schematic showing uterus, cervix, tubes and ovaries aligned with robotic camera and wristed instrument access points",
      "Numbered robotic hysterectomy pathway showing assessment, port planning, docking, console dissection, organ removal and labelled pathology",
      "Robotic hysterectomy recovery schematic showing port monitoring, mobility and VTE prevention, vaginal-cuff care, pathology and follow-up",
    ],
  }),
  completeProfile({
    procedure: "Vaginal Hysterectomy",
    shortName: "vaginal hysterectomy",
    specialist: "gynecologist experienced in vaginal and prolapse surgery",
    definition: "Vaginal hysterectomy removes the uterus through the vagina without routine abdominal ports or a laparotomy incision.",
    candidacy: "It may be considered for selected mobile uteri, prolapse or benign disease after uterine size, descent, previous surgery and alternatives are assessed.",
    anatomy: "Vaginal access follows uterine descent through the vaginal canal; apical support, bladder, ureters and rectum remain important neighbouring structures.",
    distinction: "The vaginal route describes access, not organ scope. Total still means uterus and cervix; tube or ovary removal and prolapse suspension require separate consent.",
    evaluation: "Pelvic examination should document uterine mobility, prolapse compartments, apical support, urinary or bowel symptoms, imaging and tissue sampling when indicated.",
    technique: "Through a vaginal incision, supporting pedicles and uterine vessels are controlled, the uterus is removed, the cuff is closed and planned apical support or repair is completed.",
    approaches: [
      { label: "Vaginal hysterectomy alone", detail: "Removes the uterus through the vagina." },
      { label: "With prolapse repair", detail: "Adds separately consented compartment or apical work." },
      { label: "Laparoscopic or open route", detail: "May be selected when vaginal access is unsuitable." },
    ],
    risks: "Risks include bleeding, infection, VTE, bladder, ureter or bowel injury, urinary retention, cuff problems, prolapse recurrence and need for another route.",
    drivers: procedureDrivers(
      { label: "Uterine descent and size", detail: "Mobility and access determine technical work." },
      { label: "Prolapse compartments", detail: "Apical, anterior or posterior repairs add distinct scope." },
      { label: "Tube or ovary access", detail: "Adnexal work can be difficult vaginally and must be planned." },
      { label: "Route change", detail: "Laparoscopic assistance or laparotomy changes the bill." },
    ),
    related: ["Pelvic Organ Prolapse Surgery", "Pelvic Floor Repair", "Laparoscopic Hysterectomy"],
    imageAlts: [
      "Patient-education sagittal pelvic schematic showing uterine descent, vaginal removal route, bladder, rectum and the apical support relationship",
      "Numbered vaginal hysterectomy pathway showing prolapse assessment, vaginal access, pedicle control, uterine removal, cuff closure and pathology",
      "Vaginal hysterectomy recovery pathway showing bladder checks, vaginal bleeding review, mobility and VTE prevention, cuff follow-up and pathology",
    ],
  }),
  completeProfile({
    procedure: "Abdominal Hysterectomy",
    shortName: "abdominal hysterectomy",
    specialist: "gynecologist experienced in open pelvic surgery",
    definition: "Abdominal hysterectomy removes the uterus through a laparotomy incision in the abdominal wall.",
    candidacy: "It may be selected for very large or fixed anatomy, extensive disease, planned staging or when minimally invasive access is unsuitable after individual review.",
    anatomy: "The laparotomy provides open access to uterus, cervix, tubes, ovaries, ureters, bladder, bowel and pelvic vessels.",
    distinction: "Abdominal describes the incision, not automatic ovary removal. Total and supracervical scope and every tube or ovary decision remain separate.",
    evaluation: "Review indication, imaging, anaemia, previous laparotomy, adhesions, tissue diagnosis, VTE risk, wound risk and possible need for additional specialists.",
    technique: "Through a transverse or vertical incision, the surgeon exposes the pelvis, controls pedicles and uterine vessels, removes the consented structures and closes the abdominal layers.",
    duration: "often about 1–3 hours, longer with extensive disease or added procedures",
    admission: "Open surgery commonly requires several hospital nights, determined by pain, mobility, diet, bladder, bowel and wound recovery.",
    recovery: "Laparotomy recovery is generally longer than minimally invasive recovery; lifting, driving, work and flying await wound, mobility and VTE assessment.",
    approaches: [
      { label: "Transverse laparotomy", detail: "A lower horizontal incision for suitable exposure." },
      { label: "Vertical midline laparotomy", detail: "May provide broader access for large or complex disease." },
      { label: "Minimally invasive route", detail: "Considered when anatomy and indication permit." },
    ],
    risks: "Risks include bleeding, transfusion, infection, VTE, wound separation or hernia, ileus, adhesions and injury to bladder, ureter, bowel, vessels or nerves.",
    drivers: procedureDrivers(
      { label: "Incision and exposure", detail: "Transverse and vertical access serve different operative needs." },
      { label: "Disease and adhesions", detail: "Large, fixed or complex pathology extends dissection." },
      { label: "Organ scope", detail: "Cervix, tubes, ovaries and staging remain separate decisions." },
      { label: "Open recovery", detail: "Ward nights, pain care and wound support affect cost." },
    ),
    related: ["Laparoscopic Hysterectomy", "Robotic Hysterectomy", "Vaginal Hysterectomy"],
    imageAlts: [
      "Patient-education abdominal and pelvic schematic showing transverse and vertical laparotomy access to uterus, cervix, adnexa and neighbouring organs",
      "Numbered abdominal hysterectomy pathway showing assessment, laparotomy, pelvic exposure, vessel control, consented organ removal and pathology",
      "Abdominal hysterectomy recovery pathway showing ward monitoring, bowel and bladder recovery, VTE prevention, incision care and pathology review",
    ],
  }),
  completeProfile({
    procedure: "Laparoscopic Myomectomy",
    shortName: "laparoscopic myomectomy",
    specialist: "minimally invasive gynecologist experienced in uterine-sparing fibroid surgery",
    definition: "Laparoscopic myomectomy removes selected fibroids through abdominal ports while retaining and repairing the uterus.",
    candidacy: "It may be considered for selected symptomatic fibroids when uterine preservation matters and fibroid size, number, position and alternatives support laparoscopy.",
    anatomy: "Fibroids may be subserosal, intramural or near the endometrial cavity; FIGO type or cavity relationship helps define dissection and repair.",
    distinction: "Myomectomy preserves the uterus but does not guarantee fertility, pregnancy or freedom from new fibroids. It differs from hysterectomy and hysteroscopic cavity resection.",
    evaluation: "Map fibroid number, size, FIGO type and cavity relationship with imaging; review bleeding, anaemia, fertility goals, prior treatment and malignancy concern.",
    technique: "Ports provide access for uterine incision, fibroid enucleation, bleeding control and layered uterine repair; specimen extraction follows the assessed tissue risk.",
    conversion: "Bleeding, cavity entry, many or deep fibroids, weak repair or extraction concern may require a larger incision, staged plan or hysterectomy only within prior emergency consent.",
    pathology: "Every removed fibroid should be labelled for histopathology; unexpected findings require specialist review.",
    approaches: [
      { label: "Laparoscopic myomectomy", detail: "Port-based enucleation and layered uterine repair." },
      { label: "Robotic myomectomy", detail: "Uses console-controlled instruments and added equipment." },
      { label: "Hysteroscopic or open myomectomy", detail: "Selected for cavity lesions or extensive fibroid burden." },
    ],
    risks: "Risks include bleeding, transfusion, infection, adhesions, cavity entry, organ injury, conversion, incomplete removal and uterine-scar implications for future pregnancy.",
    drivers: procedureDrivers(
      { label: "Fibroid number and FIGO type", detail: "Multiple deep fibroids require more dissection." },
      { label: "Cavity relationship", detail: "Entry can change repair and future counselling." },
      { label: "Uterine repair", detail: "Layer count and bleeding control affect theatre time." },
      { label: "Specimen extraction", detail: "Method follows size and malignancy assessment." },
    ),
    quoteQuestions: ["What FIGO types are mapped?", "Is cavity entry expected?", "What pregnancy counselling follows the uterine repair?"],
    related: ["Robotic Myomectomy", "Hysteroscopic Myomectomy", "Laparoscopic Hysterectomy"],
    imageAlts: [
      "Patient-education uterine schematic showing subserosal, intramural and cavity-related fibroids with FIGO relationship and preserved uterine wall",
      "Numbered laparoscopic myomectomy pathway showing fibroid mapping, ports, uterine incision, enucleation, layered repair and pathology",
      "Laparoscopic myomectomy recovery pathway showing bleeding review, port care, uterine healing, pathology and individualized pregnancy counselling",
    ],
  }),
  completeProfile({
    procedure: "Robotic Myomectomy",
    shortName: "robotic myomectomy",
    specialist: "gynecologist trained in robotic uterine-sparing fibroid surgery",
    definition: "Robotic myomectomy uses surgeon-controlled console instruments to remove selected fibroids and repair the retained uterus.",
    candidacy: "It may suit selected patients after fibroid burden, FIGO type, cavity relationship, fertility goals, alternatives and operative risk are reviewed.",
    anatomy: "Subserosal, intramural and cavity-adjacent fibroids distort different uterine layers and require a planned repair.",
    distinction: "Robotics is a tool with console, docking and instrument costs, not guaranteed superiority. Uterine preservation does not promise fertility or pregnancy.",
    evaluation: "Imaging should map every material fibroid, FIGO or cavity relationship and uterine wall; review anaemia, prior surgery and tissue-extraction safety.",
    technique: "After docking, the surgeon uses wristed instruments to incise the uterus, enucleate planned fibroids, control bleeding and perform layered uterine closure.",
    conversion: "Unexpected bleeding, extensive burden or unsafe extraction may require conventional laparoscopy, mini-laparotomy, staged work or other prior-consented action.",
    approaches: [
      { label: "Robotic myomectomy", detail: "Console-assisted fibroid removal and uterine suturing." },
      { label: "Conventional laparoscopy", detail: "Handheld port instruments without robotic equipment." },
      { label: "Hysteroscopic or open route", detail: "Chosen for cavity lesions or extensive burden." },
    ],
    risks: "Risks include bleeding, transfusion, infection, adhesions, cavity entry, organ injury, conversion, residual fibroids and uterine-scar considerations in pregnancy.",
    drivers: procedureDrivers(
      { label: "Robot and instruments", detail: "Console, docking and wristed consumables add cost." },
      { label: "Fibroid burden and FIGO type", detail: "Number, depth and position change work." },
      { label: "Layered uterine repair", detail: "Defect depth affects suturing time." },
      { label: "Extraction method", detail: "Size and malignancy review shape removal." },
    ),
    quoteQuestions: ["Which robotic instruments are included?", "What FIGO map supports the plan?", "What pregnancy advice follows repair?"],
    related: ["Laparoscopic Myomectomy", "Hysteroscopic Myomectomy", "Robotic Hysterectomy"],
    imageAlts: [
      "Patient-education uterine schematic showing multiple FIGO-related fibroids and robotic wristed instruments positioned for uterine-sparing repair",
      "Numbered robotic myomectomy pathway showing mapping, docking, console enucleation, bleeding control, layered uterine closure and pathology",
      "Robotic myomectomy recovery pathway showing port care, anaemia review, uterine healing, pathology and fertility or pregnancy counselling",
    ],
  }),
  completeProfile({
    procedure: "Hysteroscopic Myomectomy",
    shortName: "hysteroscopic myomectomy",
    specialist: "gynecologist experienced in operative hysteroscopy",
    definition: "Hysteroscopic myomectomy removes selected submucosal fibroid tissue through the cervix from inside the uterine cavity, without abdominal incisions.",
    candidacy: "It may be considered for selected cavity-distorting fibroids after symptoms, FIGO type, intramural extension, fertility goals and alternatives are reviewed.",
    anatomy: "FIGO type 0, 1 or 2 relationships describe how much fibroid lies in the cavity versus myometrium and help anticipate complete or staged resection.",
    distinction: "This treats cavity-facing fibroids, not all uterine fibroids. A deep lesion may require staged resection; uterine preservation does not promise fertility.",
    evaluation: "Ultrasound, saline imaging or hysteroscopy maps size, number, FIGO type, myometrial margin and other cavity pathology; review anaemia and pregnancy possibility.",
    technique: "A hysteroscope passes through the cervix, distension fluid opens the cavity and a resectoscope or tissue-removal system removes visible fibroid under direct vision.",
    conversion: "Fluid-deficit limits, bleeding, perforation concern or deep residual fibroid should stop or stage resection rather than force completion.",
    admission: "Usually day surgery, with observation guided by bleeding, pain, fluid balance and anaesthesia recovery.",
    recovery: "Monitor cramping, vaginal bleeding, infection symptoms and fluid-related concerns; there are no abdominal port wounds.",
    approaches: [
      { label: "Resectoscopic myomectomy", detail: "Loop resection under direct cavity vision." },
      { label: "Hysteroscopic tissue removal", detail: "Mechanical removal for selected intracavitary lesions." },
      { label: "Staged resection", detail: "A planned second sitting for deep or large lesions." },
    ],
    risks: "Risks include bleeding, infection, uterine perforation, fluid overload or electrolyte disturbance, intrauterine adhesions, incomplete resection and repeat treatment.",
    drivers: procedureDrivers(
      { label: "FIGO type and size", detail: "Intramural extension changes difficulty and staging." },
      { label: "Fluid management", detail: "Distension medium and deficit monitoring are essential." },
      { label: "Resection system", detail: "Loop and mechanical devices have different consumables." },
      { label: "Staged treatment", detail: "A second procedure is a separate episode." },
    ),
    quoteQuestions: ["What FIGO type is treated?", "What fluid-deficit limit is used?", "Could resection be staged?"],
    related: ["Laparoscopic Myomectomy", "Robotic Myomectomy", "Hysteroscopic Polypectomy"],
    imageAlts: [
      "Patient-education uterine cavity schematic showing FIGO zero one and two submucosal fibroid relationships and the transcervical hysteroscope route",
      "Numbered hysteroscopic myomectomy pathway showing cavity mapping, cervical access, fluid monitoring, direct resection, completion check and pathology",
      "Hysteroscopic myomectomy recovery pathway showing fluid-balance observation, bleeding and perforation warnings, pathology and staged-review planning",
    ],
  }),
  completeProfile({
    procedure: "Endometriosis Surgery",
    shortName: "endometriosis surgery",
    specialist: "gynecologist experienced in endometriosis and complex pelvic surgery",
    definition: "Endometriosis surgery identifies and treats selected endometriosis lesions, adhesions or endometriomas through an individualized usually laparoscopic plan.",
    candidacy: "It may be considered for selected persistent pain, organ effects, endometrioma or fertility-related indications after medical options and goals are reviewed.",
    anatomy: "Disease may be superficial peritoneal, deep near bowel, bladder, ureter or nerves, or ovarian as an endometrioma; adhesions can distort pelvic anatomy.",
    distinction: "Lesion ablation, excision, adhesiolysis and ovarian endometrioma surgery are different scopes. Surgery cannot guarantee pain relief, fertility or no recurrence.",
    evaluation: "Map symptoms, prior treatment, pelvic imaging, ovarian reserve considerations and documented bowel, bladder or ureter involvement; involve relevant specialists when indicated.",
    technique: "Laparoscopy surveys the pelvis, restores anatomy where safe and excises or ablates consented lesions; endometrioma surgery balances cyst treatment with ovarian tissue preservation.",
    conversion: "Unexpected deep disease may require limiting surgery, staged multidisciplinary treatment or additional bowel, bladder or ureter work only within documented consent.",
    approaches: [
      { label: "Superficial lesion treatment", detail: "Excision or ablation of selected peritoneal disease." },
      { label: "Deep endometriosis excision", detail: "Complex dissection near affected pelvic organs." },
      { label: "Endometrioma surgery", detail: "Ovarian cyst treatment balanced against ovarian reserve." },
    ],
    risks: "Risks include bleeding, infection, adhesions, reduced ovarian reserve, bladder, ureter, bowel, vessel or nerve injury, fistula, conversion, persistent symptoms and recurrence.",
    drivers: procedureDrivers(
      { label: "Disease depth and sites", detail: "Superficial and deep organ disease are not comparable." },
      { label: "Adhesions", detail: "Distorted anatomy adds dissection and risk." },
      { label: "Multidisciplinary team", detail: "Bowel, bladder or ureter involvement may add specialists." },
      { label: "Ovarian reserve", detail: "Endometrioma decisions require individualized counselling." },
    ),
    quoteQuestions: ["Which lesions are mapped?", "Which additional specialists are documented?", "How is ovarian reserve considered?"],
    related: ["Ovarian Cyst Surgery", "Laparoscopic Myomectomy", "Laparoscopic Hysterectomy"],
    imageAlts: [
      "Patient-education pelvic schematic distinguishing superficial endometriosis, deep lesions near bowel bladder and ureter, adhesions and ovarian endometrioma",
      "Numbered endometriosis surgery pathway showing mapping, multidisciplinary planning, laparoscopy, lesion treatment, organ checks and pathology",
      "Endometriosis recovery pathway showing pain and organ-function monitoring, port care, pathology, ovarian-reserve discussion and symptom follow-up",
    ],
  }),
  completeProfile({
    procedure: "Hysteroscopic Polypectomy",
    shortName: "hysteroscopic polypectomy",
    specialist: "gynecologist experienced in operative hysteroscopy",
    definition: "Hysteroscopic polypectomy removes an endometrial polyp under direct vision from inside the uterine cavity through the cervix.",
    candidacy: "It may be considered for selected abnormal bleeding, cavity findings or sampling needs after imaging, pregnancy possibility and alternatives are reviewed.",
    anatomy: "An endometrial polyp projects from the cavity lining on a focal stalk or base; it differs from a fibroid arising in uterine muscle.",
    distinction: "Direct cavity resection targets the visible polyp and retrieves tissue for pathology; blind sampling may miss focal anatomy and is not the same procedure.",
    evaluation: "Review ultrasound or saline imaging, bleeding pattern, menopausal status, endometrial risk, medicines and whether other cavity lesions need assessment.",
    technique: "A hysteroscope passes through the cervix, fluid distends the cavity and scissors, loop or a tissue-removal device separates the polyp at its base for retrieval.",
    conversion: "Perforation concern, bleeding, poor visualization or fluid limits may stop the procedure and require later reassessment.",
    admission: "Usually outpatient or day surgery with brief bleeding, pain and fluid-balance observation.",
    recovery: "Cramping and light bleeding may occur; escalating pain, heavy bleeding or fever needs review.",
    approaches: [
      { label: "Mechanical polypectomy", detail: "Scissors or graspers remove selected small polyps." },
      { label: "Resectoscopic removal", detail: "A loop treats the base under direct vision." },
      { label: "Tissue-removal system", detail: "A dedicated device cuts and retrieves tissue." },
    ],
    risks: "Risks include bleeding, infection, uterine perforation, cervical injury, fluid overload, incomplete removal, adhesions and an unexpected pathology result.",
    drivers: procedureDrivers(
      { label: "Polyp number and base", detail: "Multiple or broad-based lesions take more work." },
      { label: "Device choice", detail: "Mechanical, loop and tissue systems use different resources." },
      { label: "Fluid monitoring", detail: "Distension balance is a safety requirement." },
      { label: "Pathology", detail: "Every retrieved focal lesion requires examination." },
    ),
    quoteQuestions: ["Is removal under direct vision?", "Which device is included?", "Who reviews unexpected pathology?"],
    related: ["Hysteroscopic Myomectomy", "Laparoscopic Myomectomy", "Gynecologic Cancer Surgery"],
    imageAlts: [
      "Patient-education uterine cavity schematic showing a focal endometrial polyp and stalk compared with the surrounding lining and transcervical hysteroscope",
      "Numbered hysteroscopic polypectomy pathway showing imaging, cervical entry, fluid distension, direct base resection, tissue retrieval and pathology",
      "Hysteroscopic polypectomy recovery pathway showing fluid observation, cramping and bleeding checks, perforation warnings and pathology review",
    ],
  }),
  completeProfile({
    procedure: "Ovarian Cyst Surgery",
    shortName: "ovarian cyst surgery",
    specialist: "gynecologist experienced in ovarian and minimally invasive surgery",
    definition: "Ovarian cyst surgery treats a selected ovarian cyst by cystectomy, drainage only in limited contexts, or ovary removal when preservation is unsafe or inappropriate.",
    candidacy: "It may be considered for selected persistent, symptomatic, enlarging, complex or suspicious cysts after imaging, markers when indicated, age and alternatives are reviewed.",
    anatomy: "A cyst can replace or compress ovarian tissue near the tube, ureter, bowel and pelvic vessels; torsion twists the adnexa and is an emergency.",
    distinction: "Cystectomy aims to remove the cyst while preserving ovarian tissue; oophorectomy removes the ovary. Emergency torsion care should not be delayed for elective travel.",
    evaluation: "Review ultrasound morphology, size, laterality, symptoms, pregnancy status, tumour markers when appropriate, ovarian reserve goals and malignancy or torsion concern.",
    technique: "Laparoscopic or open access permits inspection, controlled cyst separation or consented ovary removal, bleeding control, specimen containment and pathology.",
    conversion: "Unexpected malignancy concern, bleeding, adhesions or absent viable ovarian tissue may change cystectomy to oophorectomy or require oncology input within consent.",
    approaches: [
      { label: "Ovarian cystectomy", detail: "Removes cyst while attempting ovarian preservation." },
      { label: "Oophorectomy", detail: "Removes an ovary when separately justified and consented." },
      { label: "Emergency torsion surgery", detail: "Urgent local assessment prioritizes ovarian and patient safety." },
    ],
    risks: "Risks include bleeding, infection, ovarian tissue loss, reduced reserve, cyst rupture, adhesions, organ injury, recurrence, conversion and unexpected pathology.",
    drivers: procedureDrivers(
      { label: "Morphology and malignancy concern", detail: "Simple and suspicious masses require different pathways." },
      { label: "Size and laterality", detail: "Large or bilateral cysts change preservation planning." },
      { label: "Cystectomy versus oophorectomy", detail: "Organ preservation and removal are distinct scopes." },
      { label: "Urgency or torsion", detail: "Emergency treatment is not an elective package." },
    ),
    quoteQuestions: ["Is cystectomy intended?", "What could require oophorectomy?", "Is torsion an emergency concern?"],
    related: ["Oophorectomy", "Salpingo-Oophorectomy", "Endometriosis Surgery"],
    imageAlts: [
      "Patient-education adnexal schematic showing an ovarian cyst compressing preserved ovarian tissue, the fallopian tube and a separate torsion twist warning",
      "Numbered ovarian cyst surgery pathway showing ultrasound review, malignancy assessment, access, cystectomy or consented oophorectomy and pathology",
      "Ovarian cyst surgery recovery pathway showing bleeding and torsion warnings, wound care, ovarian preservation review, pathology and follow-up",
    ],
  }),
  completeProfile({
    procedure: "Oophorectomy",
    shortName: "oophorectomy",
    specialist: "gynecologist experienced in adnexal surgery",
    definition: "Oophorectomy removes one ovary or both ovaries through laparoscopic, vaginal or open access according to indication.",
    candidacy: "It may be considered for selected ovarian disease or risk management only after laterality, alternatives, pathology concern, hormones and fertility are reviewed.",
    anatomy: "Each ovary has its own blood supply and lies beside a fallopian tube, ureter and pelvic vessels; laterality must be explicit.",
    distinction: "Unilateral oophorectomy removes one ovary; bilateral removes both and causes surgical menopause before natural menopause. Tube removal is not included unless specified.",
    evaluation: "Confirm side, imaging, symptoms, tumour markers or genetics when indicated, pregnancy and fertility goals, menopausal status and hormone-therapy considerations.",
    technique: "The surgeon identifies the ureter, controls the ovarian blood supply, separates the consented ovary, contains the specimen and sends it to pathology.",
    approaches: [
      { label: "Unilateral oophorectomy", detail: "Removes the named ovary and retains the other." },
      { label: "Bilateral oophorectomy", detail: "Removes both ovaries with surgical-menopause consequences." },
      { label: "Ovarian cystectomy", detail: "Preserves ovarian tissue when appropriate and feasible." },
    ],
    risks: "Risks include bleeding, infection, VTE, ureter, bowel or vessel injury, adhesions, conversion and hormonal, bone, cardiovascular, sexual or fertility effects after ovary loss.",
    drivers: procedureDrivers(
      { label: "Unilateral versus bilateral", detail: "Laterality changes scope and hormonal consequences." },
      { label: "Benign versus suspicious disease", detail: "Containment and oncology planning may differ." },
      { label: "Adhesions and anatomy", detail: "Endometriosis or prior surgery adds dissection." },
      { label: "Menopause planning", detail: "Counselling and follow-up are part of bilateral decisions." },
    ),
    quoteQuestions: ["Which ovary or ovaries?", "Are tubes separately included?", "What surgical-menopause plan is documented?"],
    related: ["Ovarian Cyst Surgery", "Salpingo-Oophorectomy", "Gynecologic Cancer Surgery"],
    imageAlts: [
      "Patient-education pelvic schematic identifying left and right ovaries separately, adjacent tubes and ureters, and unilateral versus bilateral removal",
      "Numbered oophorectomy pathway showing laterality confirmation, hormonal counselling, access, blood-supply control, ovary removal and pathology",
      "Oophorectomy recovery pathway showing wound and bleeding review, pathology, unilateral ovarian function or surgical-menopause care and follow-up",
    ],
  }),
  completeProfile({
    procedure: "Salpingo-Oophorectomy",
    shortName: "salpingo-oophorectomy",
    specialist: "gynecologist experienced in adnexal and risk-reducing surgery",
    definition: "Salpingo-oophorectomy removes a fallopian tube and ovary together on one side or both sides when explicitly indicated.",
    candidacy: "It may be considered for selected adnexal disease or risk reduction; preventive surgery requires genetics or specialist review, informed alternatives and timing discussion.",
    anatomy: "The tube and ovary form the adnexa beside the uterus, ureter, bowel and pelvic vessels; each side must be named.",
    distinction: "This operation explicitly includes both tube and ovary. Bilateral salpingo-oophorectomy causes surgical menopause; salpingectomy alone preserves ovaries.",
    evaluation: "Confirm indication, laterality, imaging, pathology risk, genetics when relevant, fertility, menopause effects and whether hysterectomy or staging is separately planned.",
    technique: "The surgeon identifies the ureter, controls ovarian and tubal attachments, removes the consented tube-ovary unit with containment and submits it to pathology.",
    approaches: [
      { label: "Unilateral salpingo-oophorectomy", detail: "Removes one tube and its ovary." },
      { label: "Bilateral salpingo-oophorectomy", detail: "Removes both adnexa and causes surgical menopause." },
      { label: "Salpingectomy alone", detail: "Removes tube while preserving the ovary." },
    ],
    risks: "Risks include bleeding, infection, VTE, ureter, bowel or vessel injury, adhesions, conversion and fertility or surgical-menopause consequences.",
    drivers: procedureDrivers(
      { label: "Laterality", detail: "One side and both sides are different scopes." },
      { label: "Disease versus risk reduction", detail: "Genetics and specialist review shape preventive care." },
      { label: "Additional hysterectomy or staging", detail: "Combined operations must be itemized." },
      { label: "Menopause care", detail: "Bilateral removal requires individualized counselling." },
    ),
    quoteQuestions: ["Is one side or both?", "What genetics review supports risk reduction?", "Is hysterectomy or staging separate?"],
    related: ["Oophorectomy", "Ovarian Cyst Surgery", "Gynecologic Cancer Surgery"],
    imageAlts: [
      "Patient-education adnexal schematic showing each fallopian tube attached to its ovary and unilateral versus bilateral salpingo-oophorectomy scope",
      "Numbered salpingo-oophorectomy pathway showing laterality and genetics review, ureter identification, vascular control, adnexal removal and pathology",
      "Salpingo-oophorectomy recovery pathway showing surgical monitoring, pathology, fertility or surgical-menopause counselling and specialist follow-up",
    ],
  }),
  completeProfile({
    procedure: "Pelvic Organ Prolapse Surgery",
    shortName: "pelvic organ prolapse surgery",
    specialist: "urogynecologist or gynecologist experienced in prolapse surgery",
    definition: "Pelvic organ prolapse surgery restores selected vaginal support when bladder, uterus or vault, rectum or small bowel descends.",
    candidacy: "It may be considered for bothersome prolapse after compartment assessment, goals, pessary or observation alternatives, urinary and bowel function and operative risk are reviewed.",
    anatomy: "Anterior, apical and posterior compartments support bladder, uterus or vault, and rectum; a complete plan names every affected compartment.",
    distinction: "Anterior repair, posterior repair and apical suspension solve different defects. Hysterectomy is not automatic, and mesh use requires product-specific consent without outcome claims.",
    evaluation: "Document standing or straining examination, compartments, apical support, urinary retention or leakage, defecatory symptoms, sexual goals and previous mesh or repairs.",
    technique: "Vaginal, laparoscopic, robotic or open surgery repairs named compartments and restores apical support using native tissue or a specifically consented graft or mesh.",
    approaches: [
      { label: "Native-tissue vaginal repair", detail: "Uses sutures and existing support tissue." },
      { label: "Apical suspension", detail: "Supports uterus or vaginal vault by a named technique." },
      { label: "Abdominal sacrocolpopexy", detail: "Uses abdominal access and mesh requiring specific consent." },
    ],
    risks: "Risks include bleeding, infection, VTE, bladder, ureter, bowel or nerve injury, urinary retention, pain, dyspareunia, recurrence and mesh exposure or erosion when used.",
    drivers: procedureDrivers(
      { label: "Compartments treated", detail: "Anterior, apical and posterior work differ." },
      { label: "Native tissue versus mesh", detail: "Materials and consent must be explicit." },
      { label: "Hysterectomy or uterine preservation", detail: "Organ scope changes the operation." },
      { label: "Urinary or bowel procedures", detail: "Combined functional treatment adds scope." },
    ),
    quoteQuestions: ["Which compartments are repaired?", "Was a pessary discussed?", "What mesh product and risks apply, if any?"],
    related: ["Pelvic Floor Repair", "Vaginal Hysterectomy", "Laparoscopic Hysterectomy"],
    imageAlts: [
      "Patient-education sagittal pelvic schematic showing anterior bladder, apical uterus or vault and posterior rectal prolapse compartments",
      "Numbered prolapse surgery pathway showing compartment examination, pessary alternative, route and support selection, repair, bladder check and follow-up",
      "Pelvic organ prolapse recovery pathway showing voiding assessment, bowel care, lifting limits, mesh or native-tissue review and recurrence follow-up",
    ],
  }),
  completeProfile({
    procedure: "Pelvic Floor Repair",
    shortName: "pelvic floor repair",
    specialist: "urogynecologist or pelvic-floor gynecologic surgeon",
    definition: "Pelvic floor repair restores selected anterior, posterior or perineal vaginal support associated with cystocele, rectocele or perineal weakness.",
    candidacy: "It may be considered for bothersome bulge, urinary, defecatory or support symptoms after examination, conservative therapy, pessary alternatives and goals are reviewed.",
    anatomy: "Anterior support lies between vagina and bladder, posterior support between vagina and rectum, and the perineal body supports the vaginal opening.",
    distinction: "Cystocele repair, rectocele repair and perineorrhaphy target different anatomy. Symptom source must be assessed; repair does not guarantee urinary, bowel or sexual outcomes.",
    evaluation: "Map compartments, apical support, urinary leakage or retention, bowel emptying, pain, sexual function, prior repairs and pelvic-floor therapy.",
    technique: "Through a vaginal or selected abdominal route, the surgeon plicates or reattaches support tissue and reconstructs the consented anterior, posterior or perineal defect.",
    approaches: [
      { label: "Anterior repair", detail: "Supports the bladder-facing vaginal wall for selected cystocele." },
      { label: "Posterior repair", detail: "Supports the rectum-facing wall for selected rectocele." },
      { label: "Perineorrhaphy", detail: "Reconstructs selected perineal support." },
    ],
    risks: "Risks include bleeding, infection, urinary retention, bladder or rectal injury, constipation, pain, dyspareunia, narrowing, recurrence and persistent urinary or defecatory symptoms.",
    drivers: procedureDrivers(
      { label: "Defects repaired", detail: "Anterior, posterior and perineal work are separate." },
      { label: "Apical support", detail: "Untreated apical descent can change planning." },
      { label: "Functional testing", detail: "Urinary and defecatory symptoms may need evaluation." },
      { label: "Previous repair", detail: "Scar and recurrence increase complexity." },
    ),
    quoteQuestions: ["Which defect causes my symptoms?", "What conservative options remain?", "Is apical support included?"],
    related: ["Pelvic Organ Prolapse Surgery", "Vaginal Hysterectomy", "Laparoscopic Hysterectomy"],
    imageAlts: [
      "Patient-education sagittal pelvic floor schematic showing cystocele at the bladder wall, rectocele at the rectal wall and perineal support",
      "Numbered pelvic floor repair pathway showing symptom mapping, compartment examination, conservative alternatives, selected repair and bladder bowel checks",
      "Pelvic floor repair recovery pathway showing voiding and defecatory monitoring, perineal care, activity limits, symptom review and follow-up",
    ],
  }),
  completeProfile({
    procedure: "Gynecologic Cancer Surgery",
    shortName: "gynecologic cancer surgery",
    specialist: "gynecologic oncologist",
    definition: "Gynecologic cancer surgery is an individualized operation for suspected or confirmed uterine, cervical, ovarian, vulvar or other gynecologic malignancy.",
    candidacy: "It may be considered after tissue diagnosis or appropriate mass assessment, type and stage evaluation, fitness review and multidisciplinary discussion.",
    anatomy: "Tumour type and spread can involve uterus, cervix, tubes, ovaries, peritoneum, omentum, lymph nodes, bowel, bladder or other sites.",
    distinction: "The label does not define one operation. Staging, node assessment, frozen section where relevant and cytoreduction or debulking depend on cancer type, findings and specialist planning.",
    evaluation: "Review pathology, slides when needed, imaging, markers, stage, performance status, nutrition, fertility goals and whether neoadjuvant or non-surgical treatment is preferable.",
    technique: "Open, laparoscopic or robotic surgery obtains the planned specimens and may include organ removal, washings, omentum, sentinel or other nodes, staging biopsies or cytoreduction.",
    conversion: "Frozen section or operative findings may alter staging or extent only within consent; unresectable disease or safety concerns can appropriately limit surgery.",
    duration: "varies from a focused staging procedure to many hours for complex cytoreduction",
    admission: "Admission varies widely with cancer type, access route, organ work, complications and recovery.",
    recovery: "Recovery and travel depend on surgical extent, organ function, wounds, nutrition, VTE risk, final pathology and timing of additional therapy.",
    pathology: "Final pathology establishes histology, grade, margins, nodes and pathologic stage as relevant; frozen section is provisional and must be separately available and indicated.",
    approaches: [
      { label: "Minimally invasive staging", detail: "Selected laparoscopy or robotics for an appropriate cancer plan." },
      { label: "Open staging or cytoreduction", detail: "Laparotomy for exposure and complex organ work." },
      { label: "Non-surgical or neoadjuvant pathway", detail: "May precede or replace surgery after multidisciplinary review." },
    ],
    risks: "Risks include bleeding, transfusion, infection, VTE, lymphocele or lymphedema, organ injury, stoma, ICU care, incomplete cytoreduction and delay or need for additional therapy.",
    drivers: procedureDrivers(
      { label: "Cancer type and stage", detail: "Different malignancies require different operations." },
      { label: "Nodes and staging", detail: "Sentinel mapping and wider node assessment differ." },
      { label: "Cytoreduction and organ work", detail: "Bowel, bladder or upper-abdominal work adds teams and resources." },
      { label: "Frozen and final pathology", detail: "Intraoperative and definitive assessment are separate." },
    ),
    quoteQuestions: ["What type and stage guide surgery?", "Which nodes or staging steps are planned?", "What additional therapy may follow?"],
    related: ["Oophorectomy", "Salpingo-Oophorectomy", "Abdominal Hysterectomy"],
    imageAlts: [
      "Patient-education gynecologic oncology schematic showing uterus cervix ovaries peritoneum omentum and pelvic lymph nodes as distinct staging sites",
      "Numbered gynecologic cancer surgery pathway showing pathology and staging review, multidisciplinary plan, surgical access, nodes or debulking and final pathology",
      "Gynecologic cancer surgery recovery pathway showing organ and VTE monitoring, wound and nutrition care, final stage review and additional therapy planning",
    ],
  }),
];

export const GYNECOLOGY_PILOT_PROCEDURES = ["Laparoscopic Hysterectomy"] as const;

export const gynecologyArticles = profiles.map(createGynecologyArticle);

export const gynecologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  gynecologyArticles.map((article) => [article.slug, article]),
);
