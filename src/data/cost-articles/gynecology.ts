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
      "The stored India figure is a national planning range. It does not establish candidacy, route, ovarian conservation, pathology scope, hospital stay or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact hysterectomy route, surgeon and anaesthesia fees, pathology, ward nights and complication terms rather than a headline package.",
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
      "Request a self-pay estimate tied to the indication, exact organs planned for removal, surgical route and expected admission.",
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
    detail: "Surgeon, theatre, standard instruments and consented organ scope.",
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
    briefName: "Laparoscopic Hysterectomy",
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Scope, Recovery & Planning`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Understand organ scope, ovarian conservation, surgical alternatives, pathology, recovery and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      "A practical guide to the [INDIA_COST] planning range, uterus and cervix removal, ovarian-conservation decisions, laparoscopic technique, pathology and safe international recovery.",
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.anatomy} ${profile.distinction}`,
      `${profile.evaluation} This page cannot choose between surgery, less extensive treatment or observation.`,
      `[INDIA_COST], [US_COST] and [STAY] are planning tokens, not tariffs, acceptance or final bills. Match the quote to the planned organs, route and pathology.`,
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. A useful estimate identifies whether the uterus and cervix are removed, whether tubes or ovaries are removed or conserved, the laparoscopic and uterine-removal method, surgeon and anaesthesia fees, routine pathology, stated ward nights and early review. The stored stay is [STAY], but discharge and flying depend on individual recovery.`,
      `The largest variables are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Unexpected adhesions, additional disease, open conversion, transfusion or longer admission can produce a different bill.`,
      "Planning Range ≠ Final Hospital Quotation. Records review and a qualified gynecology and anaesthesia assessment are needed before candidacy, organ scope, risks and an itemized offer are meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}, not a guaranteed package. Replace it with an itemized quotation tied to a named ${profile.specialist}, campus, indication, organ scope, route, expected nights and pathology plan.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A straightforward benign-disease operation is not comparable with extensive adhesiolysis, deep endometriosis work, prolapse repair or suspected malignancy.`,
      "Do not derive Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad tariffs from the national range. Keep [US_COST], flights, visas, local transport, companion lodging, meals, take-home medicines, extra recovery nights and a complication contingency visible.",
    ],
    costComponents: [
      ...COMMON_INCLUSIONS,
      {
        label: "Procedure-specific scope",
        detail:
          "The estimate should state uterus, cervix, each tube and each ovary separately, plus any adhesiolysis, endometriosis treatment or supporting procedure.",
      },
    ],
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      "Two laparoscopic hysterectomy estimates may assume different organ scope, complexity, surgeon and assistant fees, instruments, uterine-removal method, pathology, room category and conversion terms. Compare each line rather than only the total.",
    inclusions: [
      ...COMMON_INCLUSIONS,
      {
        label: "Named organ and access plan",
        detail:
          "Only the explicitly stated total or supracervical hysterectomy, tube or ovary plan and laparoscopic access are included.",
      },
    ],
    exclusions: COMMON_EXCLUSIONS,
    approachComparison: {
      heading: "Laparoscopic, vaginal, robotic and open hysterectomy",
      intro: [
        "Access route is a clinical decision, not a quality ladder.",
        "Uterine size, prior surgery, prolapse, cancer concern, health and surgeon expertise guide selection. Open conversion remains a safety option.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from indication, anatomy, prior surgery, risk and local expertise",
        detail: item.detail,
      })),
    },
    overviewHeading: "What Is a Laparoscopic Hysterectomy?",
    whoHeading: "When Might Laparoscopic Hysterectomy Be Considered?",
    overview: {
      what: [
        profile.definition,
        "Total removes uterus and cervix; tubes and ovaries require separate decisions.",
        "Hysterectomy ends the ability to carry a pregnancy but does not automatically cause menopause.",
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
        heading: "Uterus, cervix, tubes and ovaries: what is actually removed?",
        paragraphs: [
          "Total hysterectomy removes uterus and cervix, not automatically tubes or ovaries. Record each side separately. Ovary removal may cause surgical menopause; conservation preserves hormone production but cannot prevent every later ovarian condition.",
        ],
      },
      {
        id: "technique-and-conversion",
        heading: "How the laparoscopic operation is performed — and why plans can change",
        paragraphs: [
          "Ports admit a camera and instruments; the surgeon protects ureters, controls uterine vessels and pedicles, removes consented organs and closes the cuff when applicable. Bleeding, adhesions, organ concern or extraction difficulty may require open conversion.",
        ],
      },
      {
        id: "pathology",
        heading: "Why pathology remains part of the pathway",
        paragraphs: [
          "Label every specimen for histopathology. Ask who explains the endometrium, myometrium, cervix, tube or ovary findings, which extra tests cost more and how unexpected disease reaches gynecologic oncology.",
        ],
      },
      {
        id: "specific-risks",
        heading: "Risks and safety considerations",
        paragraphs: [
          "Consent should address bleeding, infection, VTE, anaesthesia, bladder, ureter, bowel or vessel injury, urinary retention, cuff problems, port hernia and conversion. Risk varies with anatomy, previous surgery, anaemia, medicines and health.",
        ],
      },
      {
        id: "recovery-and-travel",
        heading: "Recovery, follow-up and international travel",
        paragraphs: [
          "Recovery checks pain, walking, VTE prevention, wounds, bleeding, bladder and bowel function. Discharge is not fitness to fly; keep travel flexible through pathology review and individual clearance.",
        ],
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
          label: "Organ-scope decision",
          detail: "Record cervix, each tube and each ovary as removed or conserved.",
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
        label: "Clarify fertility",
        detail: "Hysterectomy permanently ends the ability to carry a pregnancy.",
      },
      { label: "Confirm candidacy", detail: "Review alternatives, anatomy and operative risk." },
      {
        label: "Write the organ scope",
        detail: "List uterus, cervix, both tubes and both ovaries.",
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
      { label: "Undergo surgery", detail: "Complete the consented laparoscopic operation." },
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
      "A meaningful comparison holds indication, exact organs removed or conserved, surgical route, surgeon, licensed facility, anaesthesia, pathology, ward nights, conversion and complication terms constant.",
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
      "Why is hysterectomy considered, and what alternatives remain?",
      "What diagnosis and treatment goal are documented?",
      `Who is the named ${profile.specialist}, and at which campus?`,
      "Is total or supracervical hysterectomy planned?",
      "Which cervix, tube and ovary decisions are consented?",
      "What could change ovarian conservation during surgery?",
      "How were uterine size, adhesions and prior surgery assessed?",
      "Which tests, imaging and tissue sampling are required?",
      "Which surgeon, anaesthesia and theatre fees are included?",
      "Which instruments and specimen-removal method are assumed?",
      "How was unsuspected malignancy considered before extraction?",
      "What could require open conversion or additional surgery?",
      "How are transfusion, organ repair, ICU and extra nights billed?",
      "What urinary-tract, bowel and bleeding support exists on campus?",
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
        q: "How much does laparoscopic hysterectomy cost in India?",
        a: "[INDIA_COST] is a national planning range, not a quotation. Scope, complexity, pathology and stay determine the final bill.",
      },
      {
        q: "What is a laparoscopic hysterectomy?",
        a: "It removes the uterus with camera-guided instruments through small abdominal ports.",
      },
      {
        q: "Does total hysterectomy mean both ovaries are removed?",
        a: "No. Total means uterus plus cervix; ovary removal or conservation is decided separately.",
      },
      {
        q: "What happens to the cervix and fallopian tubes?",
        a: "Total hysterectomy removes the cervix. Each tube must be separately listed as removed or retained.",
      },
      {
        q: "Who may be considered for this operation?",
        a: "Selected patients with an established indication after alternatives, fertility wishes, anatomy and risk are reviewed.",
      },
      {
        q: "What assessment is needed first?",
        a: "Clinical review, examination, imaging, blood count and anaesthesia assessment; some patients need tissue sampling.",
      },
      {
        q: "How is the operation performed?",
        a: "Ports admit a camera and instruments; vessels and pedicles are controlled before consented organs are removed. Open conversion remains possible.",
      },
      {
        q: "How long does laparoscopic hysterectomy take?",
        a: "Often about 1–3 hours, with longer surgery for difficult anatomy or additional procedures.",
      },
      {
        q: "How long is the hospital stay?",
        a: "Often day care or 1–2 nights. Clinical recovery, not the package calendar, determines discharge.",
      },
      {
        q: "What are the important risks?",
        a: "Bleeding, infection, VTE, anaesthesia problems, organ injury, cuff problems, hernia and open conversion require individualized consent.",
      },
      {
        q: "When can an international patient fly home?",
        a: "There is no fixed date. The team must assess wounds, bleeding, mobility, organ function and VTE risk.",
      },
      {
        q: "What follow-up is needed after returning home?",
        a: "A local gynecologist should review recovery and receive the operation note, discharge summary and pathology.",
      },
    ],
    doctorHeading: `${profile.procedure} surgeons in India`,
    cityDoctorHeading: `${profile.procedure} surgeons in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify scope, availability and campus; placement is not a ranking, case-volume or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live CMS entity relationships for ${profile.procedure}. A general Gynecology, laparoscopy or accreditation label does not establish current case acceptance, conversion support or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/gynecology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption:
          "Educational pelvic anatomy diagram distinguishing uterus and cervix removal from tube and ovary decisions; not patient-specific.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/gynecology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption:
          "Conceptual laparoscopic pathway; port sites, organ scope and technique depend on assessment and consent.",
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
      "The uterus can carry a pregnancy; its lower neck is the cervix. Fallopian tubes connect near it, while the separate ovaries produce hormones. Removing the uterus does not automatically remove tubes or ovaries.",
    distinction:
      "A total hysterectomy removes uterus and cervix; it does not mean ovary removal. Supracervical hysterectomy retains the cervix. Salpingectomy removes a tube and oophorectomy an ovary, so ovarian conservation requires separate consent.",
    evaluation:
      "Assessment reviews symptoms, fertility goals, pelvic examination, indicated imaging, blood count and anaesthesia risk. Cervical screening, endometrial sampling or malignancy-focused review may also be needed.",
    technique:
      "Under general anaesthesia, carbon dioxide creates working space and instruments enter through small ports. The surgeon identifies the ureters, controls uterine vessels and pedicles, separates the consented organs, closes the vaginal cuff when applicable and removes the specimen by the planned method.",
    conversion:
      "Open conversion is a safety option, not a failure. Adhesions, bleeding, unexpected anatomy, bowel or urinary-tract concern, specimen size or unsafe extraction can require a changed route.",
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
      "heavy bleeding, fainting, chest pain, breathlessness, one-sided leg swelling, fever, worsening abdominal pain, persistent vomiting, inability to pass urine, wound drainage or opening",
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
      "Pelvic ultrasound, MRI or other relevant imaging with reports and image files",
      "Cervical screening and endometrial biopsy or hysteroscopy reports when obtained",
      "Prior abdominal or pelvic operation notes and pathology",
      "Blood count, blood group and other requested preoperative tests",
    ],
    followUp:
      "Follow-up reviews incisions, vaginal-cuff healing, bleeding, bladder and bowel symptoms, and pathology. Send the operation note, discharge summary and report to the local gynecologist.",
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
];

export const GYNECOLOGY_PILOT_PROCEDURES = profiles.map((profile) => profile.procedure);

export const gynecologyArticles = profiles.map(createGynecologyArticle);

export const gynecologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  gynecologyArticles.map((article) => [article.slug, article]),
);
