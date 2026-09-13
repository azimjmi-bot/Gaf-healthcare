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
    detail:
      "Named gynecologist review, examination and anaesthesia assessment only when explicitly itemized.",
  },
  {
    label: "Planned operation",
    detail:
      "Surgeon, theatre, standard laparoscopic instruments and the specifically consented organ-removal scope.",
  },
  {
    label: "Anaesthesia and routine medicines",
    detail:
      "General anaesthesia, standard perioperative medicines and routine monitoring within the written limits.",
  },
  {
    label: "Hospital recovery",
    detail:
      "Recovery room and the stated ward nights and room category, rather than an open-ended admission.",
  },
  {
    label: "Routine histopathology and early review",
    detail:
      "Standard examination of listed specimens and the stated wound or pathology visit; special tests must be named.",
  },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Changed surgical scope",
    detail:
      "Unexpected oophorectomy, extensive adhesiolysis, endometriosis excision, prolapse repair, cancer staging or another operation not written into the estimate.",
  },
  {
    label: "Conversion and complications",
    detail:
      "Open conversion, blood products, additional imaging, ICU, re-operation, extended admission or readmission unless expressly covered.",
  },
  {
    label: "Additional pathology",
    detail:
      "Frozen section, immunohistochemistry, molecular tests or outside slide review unless itemized.",
  },
  {
    label: "Extended care",
    detail:
      "Long-term medicines, pelvic-floor therapy, later oncology treatment and follow-up beyond the stated period.",
  },
  {
    label: "Travel and living",
    detail:
      "Flights, visas, local transport, lodging, meals, companion costs and extra recovery nights outside hospital.",
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
      `${profile.evaluation} The decision is personal and indication-specific; an educational cost page cannot determine whether hysterectomy is preferable to medicines, a less extensive procedure or continued observation.`,
      `The catalog supplies [INDIA_COST] for India, [US_COST] as a United States self-pay reference and [STAY] for broad planning. These tokens are not city tariffs, medical acceptance, outcome forecasts or final bills. The written estimate should match the organs, route and pathology actually planned.`,
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
        `${profile.technique} ${profile.conversion}`,
        "Access route is a clinical choice, not a quality ladder. Uterine size and mobility, prior surgery, prolapse, suspected cancer, coexisting disease, surgeon experience and available equipment all matter.",
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
      what: [profile.definition, profile.anatomy, profile.distinction],
      who: [
        profile.candidacy,
        "Suitability depends on assessment by a qualified gynecologist and, where relevant, anaesthesia, radiology, urology, colorectal surgery, gynecologic oncology or another multidisciplinary service. Cautious language matters: a diagnosis does not automatically make someone a candidate, and this page cannot recommend personal treatment.",
      ],
      how: [
        profile.technique,
        profile.conversion,
        `${profile.pathology} Expected theatre time is ${profile.duration}; complexity can change it.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, antiplatelets, diabetes medicines, hormone therapy, allergies, previous anaesthesia problems and pregnancy possibility where relevant. Cervical screening and endometrial assessment should be current when clinically indicated.",
        "Follow only the treating team's instructions about fasting, bowel preparation and medicine holds. Report fever, respiratory infection, new bleeding or another material change before travel. Consent should cover organ scope, blood transfusion, urinary or bowel injury management and conversion if relevant.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Early plans commonly address pain and nausea control, eating and passing urine, short supported walks, venous-thromboembolism prevention, incision care, vaginal bleeding or discharge and constipation prevention. Individual written instructions take priority.",
        profile.risks,
        `${profile.followUp} Seek urgent help for ${profile.urgent}; use the treating team's thresholds and emergency contact.`,
      ],
    },
    topicSections: [
      {
        id: "organs-and-terminology",
        heading: "Uterus, cervix, tubes and ovaries: what is actually removed?",
        paragraphs: [
          profile.anatomy,
          profile.distinction,
          "Ask the consent form and quotation to list each structure, including left and right sides. Removing ovaries before natural menopause may cause surgical menopause; conserving ovaries may preserve hormone production but does not prevent every future ovarian or pelvic condition. Individual cancer risk, age, symptoms and preferences require clinician discussion.",
        ],
      },
      {
        id: "technique-and-conversion",
        heading: "How the laparoscopic operation is performed — and why plans can change",
        paragraphs: [
          profile.technique,
          profile.conversion,
          "The team should explain the intended uterine-removal method. Tissue extraction must follow the indication, anatomy, local policy and concern for unsuspected malignancy; no generic guide can choose a method or confirm that fragmentation is appropriate.",
        ],
      },
      {
        id: "pathology",
        heading: "Why pathology remains part of the pathway",
        paragraphs: [
          profile.pathology,
          "A final report may describe the endometrium, myometrium, cervix and any tubes or ovaries submitted. Turnaround and additional stains vary. Ask who communicates the result and what happens if an unexpected premalignant or malignant finding requires gynecologic-oncology review.",
          "Pathology review is different from an outcome guarantee. Symptoms can persist for reasons outside the removed organs, and further care may still be needed.",
        ],
      },
      {
        id: "specific-risks",
        heading: "Risks and safety considerations",
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and gives no probability. Personal risk depends on indication, uterine size, adhesions, endometriosis, previous operations, body habitus, anaemia, smoking, medicines and other health conditions.",
          "A lower estimate does not reduce the need for qualified surgery, anaesthesia, sterile theatre practice, pathology, blood access and a defined plan for urinary-tract, bowel or vascular complications.",
        ],
      },
      {
        id: "recovery-and-travel",
        heading: "Recovery, follow-up and international travel",
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should separate theatre time, hospital nights, recommended nearby recovery and full functional recovery. Discharge is not fitness to fly. Long sitting may increase discomfort and venous-thromboembolism concerns, while lifting luggage can conflict with restrictions.",
          `${profile.followUp} Keep flights flexible until wounds, bladder and bowel function, mobility, bleeding, pathology timing and travel fitness have been reviewed.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote records review, tests outside the estimate, companion travel, visas, nearby lodging, medicines, pathology discussion, extra nights and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A directory profile, appointment confirmation or visa invitation is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        {
          label: "Gynecology consultation",
          detail: `${profile.candidacy} Clarify treatment goals and fertility implications.`,
        },
        {
          label: "Organ-scope decision",
          detail:
            "Write whether the cervix, each tube and each ovary are removed or conserved; total hysterectomy does not itself mean ovary removal.",
        },
        {
          label: "Approach and alternatives",
          detail: `Discuss ${approachNames}, non-surgical management and what could alter the plan.`,
        },
        {
          label: "Itemized estimate",
          detail:
            "Match surgeon, campus, organ scope, instruments, anaesthesia, pathology, nights, conversion, exclusions and emergency terms.",
        },
        {
          label: "Arrival reassessment",
          detail:
            "Repeat examination, laboratory tests, imaging or sampling only when clinically indicated before final consent.",
        },
        { label: "Operation and monitoring", detail: `${profile.technique} ${profile.admission}` },
        {
          label: "Mobility and wound care",
          detail:
            "Use individualized pain relief, VTE prevention, bladder and bowel review, supported walking and incision instructions.",
        },
        {
          label: "Pathology and nearby review",
          detail: `${profile.pathology} Confirm warning signs and emergency contacts.`,
        },
        {
          label: "Handover home",
          detail: `${profile.followUp} Carry the operation note, discharge summary and final pathology.`,
        },
      ],
    },
    journey: [
      { label: "Submit complete records", detail: `${profile.records.join("; ")}.` },
      {
        label: "Obtain named specialist review",
        detail: `A ${profile.specialist} assesses indication, alternatives, operative risk and travel suitability.`,
      },
      {
        label: "Clarify goals and fertility",
        detail:
          "Confirm whether future pregnancy matters; hysterectomy permanently removes the ability to carry a pregnancy.",
      },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      {
        label: "Write the organ scope",
        detail:
          "List uterus, cervix, left and right tubes, and left and right ovaries as removed or conserved.",
      },
      {
        label: "Compare approaches and estimates",
        detail:
          "Hold indication, organ scope, surgeon, pathology, nights and conversion terms constant.",
      },
      {
        label: "Plan flexible travel",
        detail:
          "Arrange documents, refundable flights, a capable companion and lift-accessible lodging near the exact campus.",
      },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      {
        label: "Complete informed consent",
        detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the operation changes.`,
      },
      { label: "Undergo the planned operation", detail: profile.technique },
      {
        label: "Complete monitored recovery",
        detail:
          "Confirm mobility, VTE prevention, bladder and bowel function, wound care, medicines and warning signs.",
      },
      {
        label: "Review pathology and travel fitness",
        detail: `${profile.pathology} Obtain explicit advice before flying.`,
      },
      {
        label: "Transfer care home",
        detail: `${profile.followUp} Share reports and the escalation plan with the local clinician.`,
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
      "Why is laparoscopic hysterectomy being considered, and which non-surgical or uterus-sparing alternatives were discussed?",
      "What diagnosis and treatment goal are written in my plan?",
      `Who is the named ${profile.specialist}, and at which exact campus will surgery occur?`,
      `Does the quotation use the exact CMS name ${profile.procedure}?`,
      "Is a total hysterectomy or supracervical hysterectomy planned?",
      "Will the cervix be removed, and how does that affect future screening advice?",
      "Will both fallopian tubes be removed?",
      "Will each ovary be conserved or removed, and why?",
      "What might change the ovarian-conservation decision during surgery?",
      "How were uterine size, fibroids, endometriosis, prolapse, adhesions and prior surgery assessed?",
      "Which blood tests, imaging, cervical screening or endometrial sampling are required?",
      "Which surgeon, assistant, anaesthesia and theatre fees are included?",
      "Which laparoscopic instruments and uterine-removal method are assumed?",
      "How will tissue extraction be handled if malignancy has not been completely excluded?",
      "What findings could require an open conversion or another procedure?",
      "How are open conversion, transfusion, organ repair, ICU or extra nights billed?",
      "Which urinary-tract, bowel, vascular and anaesthesia support is available at the exact campus?",
      "How many ward nights and which room category are included?",
      "Are routine medicines, VTE prevention and take-home medicines included?",
      "What pathology is included, and are special stains or outside review extra?",
      "When and by whom will final pathology be discussed?",
      "Which wound, bladder, bowel, bleeding or fever signs require urgent review?",
      "When may I shower, walk farther, climb stairs, drive, work, exercise or lift luggage?",
      "What individualized guidance applies to vaginal intercourse or internal products during healing?",
      "When will fitness to fly be assessed, and should my ticket remain flexible?",
      "Which early follow-up visits are included?",
      "How are complications handled after I leave India?",
      "What operation note, pathology report, prescriptions and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate follow-up with my gynecologist after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: "How much does laparoscopic hysterectomy cost in India?",
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This national range is not a quotation; organ scope, complexity, pathology, stay and written complication terms determine the final amount.`,
      },
      { q: "What is a laparoscopic hysterectomy?", a: profile.definition },
      { q: "Does total hysterectomy mean both ovaries are removed?", a: profile.distinction },
      {
        q: "What happens to the cervix and fallopian tubes?",
        a: `${profile.anatomy} The consent form should identify each structure rather than relying on “complete” or “total.”`,
      },
      { q: "Who may be considered for this operation?", a: profile.candidacy },
      { q: "What assessment is needed first?", a: profile.evaluation },
      { q: "How is the operation performed?", a: `${profile.technique} ${profile.conversion}` },
      {
        q: "How long does laparoscopic hysterectomy take?",
        a: `${profile.duration}. Actual timing depends on anatomy, adhesions, associated procedures and intraoperative findings.`,
      },
      {
        q: "How long is the hospital stay?",
        a: `${profile.admission} Discharge follows clinical criteria, not a package calendar.`,
      },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed flight date. ${profile.recovery} The treating team must document stability and travel fitness.`,
      },
      {
        q: "What follow-up is needed after returning home?",
        a: `${profile.followUp} The plan should name who reviews wounds, symptoms and final pathology.`,
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
      "Laparoscopic hysterectomy removes the uterus through several small abdominal ports using a camera and long instruments; the specimen is removed by an individually planned route.",
    candidacy:
      "It may be considered for selected people with symptomatic fibroids, adenomyosis, persistent abnormal uterine bleeding, endometriosis, prolapse or another established indication after less invasive options, fertility wishes, anatomy and operative risk are reviewed. It is not automatically appropriate for every diagnosis.",
    anatomy:
      "The uterus is the muscular organ that can carry a pregnancy; its lower neck is the cervix. A total hysterectomy removes uterus and cervix, while a supracervical hysterectomy leaves the cervix. Fallopian tubes connect near the uterus, and ovaries lie separately and produce hormones. Removing the uterus does not automatically remove tubes or ovaries.",
    distinction:
      "“Total” describes removal of the uterus plus cervix; it does not mean removal of every reproductive organ. Salpingectomy means tube removal, oophorectomy means ovary removal, and bilateral salpingo-oophorectomy removes both tubes and ovaries. Ovarian conservation is a separate, individualized consent decision.",
    evaluation:
      "Assessment commonly reviews symptoms, fertility goals, pelvic examination, ultrasound or other indicated imaging, blood count and anaesthesia risk. Cervical screening, endometrial sampling, hysteroscopy or malignancy-focused review may be needed according to age, bleeding pattern and findings.",
    technique:
      "Under general anaesthesia, the abdomen is inflated with carbon dioxide and a camera and instruments enter through small ports. The surgeon identifies the ureters and surrounding organs, controls the uterine vessels and supporting pedicles, separates the uterus with or without the cervix according to consent, closes the vaginal cuff when applicable and retrieves the specimen by the planned method.",
    conversion:
      "Conversion to an abdominal incision is uncommon in routine practice but remains a safety option rather than a failure. Dense adhesions, uncontrolled bleeding, unexpected anatomy, bowel or urinary-tract concern, a very large specimen or concern about tissue extraction can require a changed route or additional specialist help.",
    approaches: [
      {
        label: "Conventional laparoscopic hysterectomy",
        detail:
          "Camera-guided surgery through small abdominal ports; the balance of laparoscopic and vaginal steps should be stated.",
      },
      {
        label: "Vaginal hysterectomy",
        detail:
          "Removal through the vagina without abdominal ports may suit selected mobile uteri or prolapse and can avoid abdominal incisions.",
      },
      {
        label: "Robotic hysterectomy",
        detail:
          "A surgeon controls wristed instruments from a console. It uses different equipment and cost assumptions but is not automatically safer or more appropriate.",
      },
      {
        label: "Open abdominal hysterectomy",
        detail:
          "A larger abdominal incision may be planned for selected anatomy or disease, or used if safe laparoscopic completion is not possible.",
      },
    ],
    duration: "often about 1–3 hours, but longer when anatomy or additional procedures are complex",
    admission:
      "Many uncomplicated pathways use day care or 1–2 hospital nights, but nausea, pain, urinary difficulty, bleeding, medical conditions or conversion can extend admission.",
    recovery:
      "Walking usually begins early, with gradual activity over several weeks. Wound healing, bladder and bowel function, bleeding, pain control and VTE risk guide progress; return to work, lifting, driving, intercourse and flying require individualized clearance rather than a universal date.",
    pathology:
      "The uterus and every additional removed structure should be labelled for histopathology. The final report confirms benign findings or identifies unexpected disease; it may take longer than hospital discharge and should have a named reviewer and handover plan.",
    risks:
      "Specific risks include bleeding or transfusion, infection, venous thromboembolism, anaesthesia complications, injury to bladder, ureters, bowel, blood vessels or nerves, urinary retention, vaginal-cuff bleeding or separation, hernia at a port, adhesions, conversion to open surgery and need for further treatment after pathology.",
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
      "Follow-up should review incisions, vaginal-cuff healing when relevant, bleeding, bladder and bowel symptoms and final pathology. A local gynecologist should receive the operation note, discharge summary and pathology after the patient returns home.",
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
