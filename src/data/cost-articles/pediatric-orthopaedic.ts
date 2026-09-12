import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type PedOrthoProfile = {
  procedure: string;
  shortName: string;
  briefName: string;
  slug: string;
  definition: string;
  indication: string;
  nonCandidate: string;
  evaluation: string;
  approaches: LabelledDetail[];
  technique: string;
  duration: string;
  ward: string;
  recovery: string;
  implantRehab: string;
  distinctiveRisks: string;
  mobility: string;
  flyHome: string;
  drivers: LabelledDetail[];
  quoteItems: string[];
  documents: string[];
  followUp: string;
  related: string[];
  figureSrc: string;
  figureAlt: string;
  untaggedCities?: CostCitySlug[];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    logistics: string;
    planning: string;
    rehab: string;
    lodging: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    logistics:
      "Delhi, Gurugram, Noida and Faridabad are separate family-recovery geographies. A child in a hip spica, frame or scoliosis brace cannot treat a cross-NCR taxi as a sightseeing hop; name the paediatric campus before booking a flat.",
    planning:
      "Allow a rest and film-review day after a long-haul arrival. Same-morning osteotomy, pinning or growing-rod lists after an overnight flight leave little room for paediatric anaesthetic reassessment or repeat radiographs.",
    rehab:
      "Winter air quality can limit outdoor walking practice after limb reconstruction or scoliosis work. Plan indoor corridor gait, cast checks and school-desk sitting rather than assuming a garden walk is physiotherapy.",
    lodging:
      "A parent needs a working lift, space for a second adult, and a bathroom that can take a child in a cast. A Gurugram apartment is a poor base if the list is in Faridabad or central Delhi.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are divided by the harbour. Peak traffic and monsoon flooding turn a short map distance into a long sit — a poor match for a child in a spica, frame or non-weight-bearing plan.",
    planning:
      "Stay on the same side of the harbour as the confirmed paediatric campus. Early wound, pin-site or cast review is easier from a nearby serviced stay than from an airport hotel.",
    rehab:
      "Wet floors, stair-only buildings and long skywalks are a poor match for crutches or a frame. Ask whether the first outpatient physiotherapy sessions sit on the same side as the ward.",
    lodging:
      "Confirm lift access before booking older walk-ups. A parent sleeping on a sofa while crossing the harbour twice a day for dressing changes is not in the hospital estimate.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport sits north of the city while many hospital districts are south or east. A long transfer with a child in a cast or frame on the day of discharge is a poor start to protected walking.",
    planning:
      "Milder weather can make a longer parent stay easier, but climate says nothing about paediatric deformity lists, gait-lab access or appointment availability.",
    rehab:
      "Book lodging only after the quotation names its campus. Whitefield-to-south-city traffic can erase an afternoon pin-site or brace slot.",
    lodging:
      "Choose a compact stay near the treating floor with space for one parent overnight. An airport-road resort is rarely compatible with daily frame or cast review.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Airport access can be comparatively direct for several hospital districts, but lodging should still follow the named paediatric campus. Heat and humidity affect plaster, pin sites and outdoor walking tolerance.",
    planning:
      "Families using Gulf or South-Asian air links should still preserve time for repeat films, paediatric anaesthetic assessment and a rest interval before any planned list.",
    rehab:
      "Indoor physiotherapy and cast or frame checks should be planned rather than assumed as hotel-corridor walks. A shorter airport road is not a shorter osteotomy or lengthening pathway.",
    lodging:
      "Air-conditioned rooms, hydration and a same-morning taxi to the campus matter more than sea views. Keep bookings flexible until admission and the first review are written.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of Jubilee Hills, Kondapur and Secunderabad. Those districts are not interchangeable for a child in a frame or spica; choose a serviced stay only after the quotation names its campus.",
    planning:
      "Build airport-transfer time and a rest day into the plan, then remain near the hospital for the first post-discharge review and physiotherapy session.",
    rehab:
      "Summer heat limits safe outdoor walking after osteotomy or lengthening. Ask where gait and brace training will actually occur — ward corridor, hospital physio or a hotel room.",
    lodging:
      "HITEC City, Kondapur, Jubilee Hills and Secunderabad are different sitting-time markets for a parent and a child who cannot walk far. A long airport-to-city run the evening after discharge is rarely compatible with a fresh cast.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band. A named paediatric orthopaedic team must review age, growth remaining, films and the planned stages before issuing a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Case- and implant-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm the exact paediatric indication, whether staging is assumed, implant or frame type, paediatric anaesthesia and whether parent lodging sits outside the letter.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Case- and implant-dependent",
    positioning: "Private international hospitals",
    context:
      "International desks may exist, but paediatric ward category, implant brand, frame parts and outpatient physiotherapy still need a written letter.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Case- and implant-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf families; specialist, facility, implant and rehabilitation charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Case- and implant-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for an international self-pay estimate tied to the exact paediatric plan rather than a general “children’s orthopaedic package.”",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Case- and implant-dependent",
    positioning: "European elective paediatric care",
    context:
      "International access, professional billing and post-discharge physiotherapy arrangements vary by centre and should be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Case- and implant-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas families should verify eligibility, the treating paediatric unit and whether imaging, implants, casts and follow-up physiotherapy are separately charged.",
  },
  {
    country: "United States",
    stay: "Case- and implant-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, paediatric anaesthesia, implant, imaging and rehabilitation may be billed by different entities; [US_COST] is a comparison range, not one bundled quote.",
  },
];

function catalogGapNote(profile: PedOrthoProfile, citySlug: CostCitySlug, city: string): string {
  if (profile.untaggedCities?.includes(citySlug)) {
    return (
      `The current GAF procedure graph does not show a clinician tagged to ${profile.procedure} in ${city}. ` +
      "The city page must leave the doctor and hospital card area empty rather than invent a roster, borrow a neighbouring paediatric or adult orthopaedic tag, or imply that no one in the city ever treats children. An empty section is a catalog gap, not a ranking."
    );
  }
  return (
    `Clinician and hospital cards for ${city} appear only when live directory relationships currently tag ${profile.procedure}. ` +
    "An empty section is a catalog fact, not a hidden ranking. Neighbouring procedure tags must not be reused, and placement is not a volume, paediatric-ICU or outcome claim."
  );
}

function makeCities(profile: PedOrthoProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gap = catalogGapNote(profile, citySlug, place.city);
    return {
      citySlug,
      ecosystem:
        `${place.city} has Pediatric Orthopaedic listings in the wider GAF directory, but this article does not infer that every listed institution performs ${profile.shortName}. ` +
        "Only dynamically resolved procedure relationships should produce clinician or hospital cards, and a card is not a ranking, volume statement or capability guarantee.",
      logistics: `${place.airport}: ${place.logistics} ${place.rehab}`,
      costNote:
        `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital supplies an itemized case estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Pediatric Orthopaedic Surgeons & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Review age, growth remaining, quote terms and family travel logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} The [INDIA_COST] figure is a national planning range, not a ${place.city} tariff; age, severity, stages and hospital terms determine the written estimate.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${place.planning}`,
          `${place.rehab} ${place.lodging}`,
          gap,
          "Send complete radiographs or MRI files, not screenshots, plus growth history and any prior cast, brace or operative records before making non-refundable arrangements. A remote opinion may change after the child is examined.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored for trip planning. This is not a guaranteed package or a city-specific price.`,
          `${profile.ward} ${profile.recovery}`,
        ],
        costExplanation: [
          `The national band can move with ${profile.drivers
            .slice(0, 3)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. It should not be divided into an invented daily or city tariff.`,
          "Ask the hospital to identify the paediatric orthopaedic surgeon, exact campus, planned stages, paediatric anaesthesia, implant or frame assumptions, ward nights, exclusions and extra-day policy.",
          `Outside the hospital estimate, budget for travel through ${place.airport}, parent lodging close to the campus, local transport that can take a cast or frame, medicines and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send films, growth notes and current walking or sitting tolerance before booking travel to ${place.city}.`,
          `Arrive with enough time for paediatric orthopaedic, anaesthetic and physiotherapy review; ${place.planning}`,
          `${place.rehab} Remain close to the hospital after discharge and travel only when the treating team has assessed the child's fitness to fly.`,
        ],
        hospitalDiscussion: [
          gap,
          "Confirm the actual operating campus, implant or frame plan, paediatric anaesthesia, parent-stay rules, inpatient physiotherapy and the first post-discharge review in writing. A general children’s or accreditation label does not answer those case-specific questions.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored; the final amount follows record review and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} paediatric orthopaedic surgeons perform ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure should be shown. If no card appears, that is a current catalog gap rather than a hidden list. Verify role, current appointment and operating campus; placement is not a ranking.",
          },
          {
            q: `Which hospital in ${place.city} should a family choose?`,
            a: "There is no universal best hospital. Compare the named paediatric team, exact campus, quote boundaries, implant or stage assumptions and continuity of physiotherapy after discharge. This page names no provider.",
          },
          {
            q: `Where should a family stay in ${place.city}?`,
            a: `${place.lodging} ${place.logistics} Keep bookings flexible until the admission and early review dates are confirmed.`,
          },
          {
            q: "When can the child fly home?",
            a: profile.flyHome,
          },
        ],
      },
    };
  });
}

function createPedOrthoArticle(profile: PedOrthoProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Surgery, Pediatric Orthopaedic Surgeons & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare the clinical pathway, age and growth remaining, implant or cast plan, quote checklist, cities and family travel logistics.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay; a named paediatric orthopaedic team must determine age, severity and travel suitability.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} Complete films and a growth history matter more than a procedure name written on a travel inquiry.`,
      `${profile.implantRehab} ${profile.mobility}`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep the article synchronized with the cost registry. They are not quotations, outcome forecasts or evidence that a particular centre can accept the child.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored stay is [STAY], but age, number of stages, implant or frame work, ward course and discharge readiness can make an individual pathway shorter or longer.`,
      `${profile.technique} Commonly discussed pathways include ${approachSummary}. A qualified paediatric orthopaedic team chooses among them; this page does not recommend an operation.`,
      `${profile.ward} ${profile.recovery} Return flights should remain flexible until the child is examined after treatment.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include the scheduled procedure, professional fees, operating room, paediatric anaesthesia and a defined ward allowance. It does not establish what one hospital will charge.`,
      `Clinically important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change in stages, implant, frame or laterality is not a cosmetic package upgrade; it may represent a materially different episode of care.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range. Until a verified city figure exists, compare named teams and written inclusions while keeping travel, parent lodging and outpatient physiotherapy costs separate.",
    ],
    costComponents: [
      {
        label: "Paediatric orthopaedic review",
        detail: `Review of films, examination, growth remaining and the indication for ${profile.shortName}.`,
      },
      {
        label: "Preoperative investigations",
        detail: `The baseline work-up follows the case: ${profile.evaluation} Confirm which tests are included and which are conditional.`,
      },
      {
        label: "Operating room, implants, frames, casts and consumables",
        detail:
          "The estimate should state the planned stages, laterality, plates, screws, rods, frames, growth-friendly implants or plaster, and what happens if the plan changes intraoperatively.",
      },
      {
        label: "Paediatric anaesthesia and medical optimization",
        detail:
          "Ask whether paediatric anaesthesia, blood products and medical clearance for comorbidity are included.",
      },
      {
        label: "Paediatric ward stay and inpatient physiotherapy",
        detail: `${profile.ward} The quote should specify included ward or high-dependency nights and inpatient physiotherapy rather than relying only on [STAY].`,
      },
      {
        label: "Medicines, casts or braces and postoperative imaging",
        detail:
          "Confirm routine versus high-cost medicines, the first cast or brace, postoperative radiographs and discharge prescriptions.",
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} pathway. Compare age assumptions, stages, laterality, implant or frame plan, named campus and clinician, paediatric anaesthesia, ward assumptions, physiotherapy and exclusions line by line. A higher amount does not prove a better outcome.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named specialist assessment",
        detail:
          "A consultation tied to the clinician expected to perform or lead the proposed intervention, where bundled.",
      },
      {
        label: "The written procedure and planned stages",
        detail: `The estimate should use the exact name ${profile.procedure} and identify laterality and associated work rather than say only “paediatric orthopaedics.”`,
      },
      {
        label: "Theatre, paediatric anaesthesia and quoted monitoring",
        detail:
          "Professional and facility fees for the scheduled episode, with invasive monitoring stated where relevant.",
      },
      {
        label: "Quoted implants, frames, casts or braces",
        detail: `${profile.implantRehab} Only items named in the letter are included.`,
      },
      {
        label: "Quoted ward allowance and inpatient physiotherapy",
        detail:
          "Room category and included ward or high-dependency days; [STAY] is a trip-planning token, not an inclusion promise.",
      },
    ],
    exclusions: [
      {
        label: "Additional films, gait analysis or medical work-up",
        detail:
          "Repeat imaging, gait-lab sessions or specialist paediatric consultations may be additional when indicated.",
      },
      {
        label: "Extra stages or a change from one bone to both sides",
        detail:
          "Work beyond the documented operative plan, including an unplanned second osteotomy or contralateral side, is not automatically bundled.",
      },
      {
        label: "Extended ward, ICU or complication care",
        detail:
          "Extra nights, infection treatment, transfusion, medical events or return to theatre generally alter the bill.",
      },
      {
        label: "Later physiotherapy, braces and medicines",
        detail: `${profile.followUp} Confirm what occurs after the first postoperative visit and what can be transferred home.`,
      },
      {
        label: "Travel and parent living costs",
        detail:
          "Flights, visas, accessible lodging for at least one guardian, meals, local transport and schedule changes are normally outside the hospital estimate.",
      },
    ],
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} These are clinical pathways, not consumer upgrades.`,
        "The receiving team should explain why its proposed route fits the child's age and anatomy, and what finding could change that route after arrival.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by age, growth remaining and deformity",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Recommended?`,
    overview: {
      what: [profile.definition, profile.technique, profile.implantRehab],
      who: [profile.indication, profile.nonCandidate],
      how: [
        profile.technique,
        `The listed procedural forms are ${approachSummary}. Incision, implants, frames and associated soft-tissue work depend on the child's anatomy.`,
        `${profile.ward} ${profile.mobility}`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete imaging files rather than screenshots or a one-line report.`,
        "The receiving team sets fasting, medicine and skin-preparation instructions. Report fever, new limp, cast tightness, pin-site drainage or a sudden increase in pain promptly; these may alter timing.",
      ],
      recovery: [
        `${profile.ward} ${profile.recovery}`,
        `The catalog's [STAY] is for broad planning, not a discharge promise. Pain control, wound healing, cast integrity and physiotherapy progress can affect the actual stay.`,
        profile.distinctiveRisks,
        `${profile.followUp} Families need a written handover, emergency contacts and a local paediatric orthopaedic or physiotherapy plan.`,
        "Seek urgent clinical help for fever, cast tightness, pale or blue toes, pin-site drainage, chest pain, shortness of breath or any warning sign specified at discharge.",
      ],
    },
    topicSections: [
      {
        id: "risks",
        heading: `Risks and considerations after ${profile.briefName}`,
        paragraphs: [
          profile.distinctiveRisks,
          "This is not an exhaustive consent list and does not assign likelihood. The treating paediatric orthopaedic specialist should discuss the risks that apply to the child's age, growth remaining and medical background.",
          "No page can promise that a deformity will not recur, that a growth plate will behave as expected, or that a second operation will never be needed.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes much more than the [INDIA_COST] hospital planning band. Add remote film review, tests not bundled, parent travel, accessible lodging, local transport, medicines, outpatient physiotherapy and contingency for extra nights.`,
        "Travel should follow a written clinical acceptance and itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and growth review",
          detail:
            "Share films, current walking status, medicines, prior casts or operations and the referring clinician's question, plus a parent who can consent.",
        },
        {
          label: "Specialist planning",
          detail:
            "Paediatric orthopaedic, anaesthetic and physiotherapy teams clarify indication, timing, stages and whether commercial travel is appropriate.",
        },
        {
          label: "Itemized estimate and family logistics",
          detail:
            "Match the exact procedure to included tests, implants or frames, ward days, physiotherapy, exclusions, escalation rates and parent accommodation.",
        },
        {
          label: "Arrival and reassessment",
          detail:
            "Allow time for examination, repeat films, blood tests and paediatric anaesthesia review; consent should include alternatives and case-specific uncertainty.",
        },
        {
          label: "Procedure and monitored recovery",
          detail: `${profile.technique} ${profile.ward}`,
        },
        {
          label: "Discharge, nearby review and handover",
          detail: `${profile.recovery} Travel only after review and carry the operative note, implant or frame details, medicine plan and physiotherapy schedule.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete imaging and growth notes",
        detail:
          "Provide actual radiograph or MRI files, reports, current function, medicines and all prior cast, brace or operative notes.",
      },
      {
        label: "Confirm clinical acceptance",
        detail:
          "A named paediatric orthopaedic team reviews diagnosis, urgency, stages, implant or frame needs, travel safety and the likely intervention.",
      },
      {
        label: "Hold a remote discussion with a parent",
        detail:
          "Ask why treatment is indicated now, what alternatives exist, what remains uncertain and who will lead care. A guardian who can consent should join.",
      },
      {
        label: "Compare itemized quotations",
        detail:
          "Use the same operative scope, laterality and implant assumptions; do not compare a partial estimate with a comprehensive episode.",
      },
      {
        label: "Plan flexible family travel",
        detail:
          "Obtain required documents, refundable flights and accessible lodging near the exact campus for at least one parent, with contingency for a longer stay.",
      },
      {
        label: "Repeat assessment after arrival",
        detail:
          "The child is examined and undergoes indicated imaging, laboratory and paediatric anaesthesia review before final consent.",
      },
      {
        label: "Treatment and ward recovery",
        detail:
          "Care follows the agreed approach, with escalation according to the clinical course rather than package limits.",
      },
      {
        label: "Start physiotherapy and prepare discharge",
        detail:
          "Parents learn wound, medicine, cast or frame instructions and receive written records.",
      },
      {
        label: "Complete local review",
        detail:
          "Remain nearby until the team reviews recovery and explicitly discusses fitness for travel.",
      },
      {
        label: "Continue care at home",
        detail: `Transfer records to the child's local clinician. ${profile.followUp}`,
      },
    ],
    documents: [
      ...profile.documents,
      "Recent radiographs and any MRI or CT already obtained, preferably as complete files rather than phone photographs",
      "Growth history, current medication list, allergies and recent laboratory results",
      "All prior cast, brace or operative notes and discharge summaries",
      "Passport and guardian documentation required for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official tariffs or evidence of availability.",
      "International comparisons are easily distorted when age, implant or frame assumptions, ward stay and follow-up physiotherapy differ. Obtain like-for-like written estimates after record review.",
    ],
    destinationNote:
      "All figures are planning information. Currency, child's age, diagnosis, severity, approach, implant choice, clinical course, hospital terms and length of stay can change the final amount; no row predicts outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] until verified city-level data is stored. Their overlays focus on genuinely different airport, geography, family lodging and rehabilitation logistics.",
      "Clinician and hospital cards must resolve dynamically from current data. This module names no provider, makes no paediatric-ICU, volume or outcome claim and offers no ranking. Several Pediatric Orthopaedic procedures currently have no tagged doctors in some or all cities — including paediatric spinal deformity correction and tendon-repair surgery nationally. An empty card area is a catalog gap, not a hidden roster.",
    ],
    whyIndia: [
      "Some international families evaluate India for access to a named paediatric orthopaedic team and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The key questions are clinical acceptance, the proposed team's relevance to the child's age and deformity, implant or frame transparency, physiotherapy continuity after return, and fitness to fly. These require direct written confirmation.",
      "No hospital or clinician is described as best. An unstable slip, an open fracture, active infection or a child who cannot complete the rehabilitation plan may be unsafe to fly, and established funded care near home may be more appropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what alternatives — including casting or bracing — were considered?`,
      "Which imaging or growth finding drives the plan?",
      "Who will perform the procedure, and at which exact campus?",
      "Does the quotation use the exact treatment name and list laterality and stages?",
      "Which investigations must be repeated after arrival, and are they included?",
      "Which implant, frame, cast or brace assumptions are written?",
      "Is paediatric anaesthesia included, and who delivers it?",
      "How many ward or high-dependency nights and inpatient physiotherapy sessions are included?",
      "What finding could change the approach or add a second stage?",
      "How are extra nights, infection treatment or return to theatre billed?",
      "What room category is quoted, and can a parent remain overnight?",
      "What is the written cast, frame and weight-bearing plan?",
      "Which discharge medicines, first follow-up and physiotherapy block are included?",
      "When will the team assess fitness to fly, and what follow-up is needed at home?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; age, stages, implant or frame plan, ward course and hospital terms determine the final amount.`,
      },
      {
        q: `What is ${profile.shortName}?`,
        a: profile.definition,
      },
      {
        q: `When is ${profile.shortName} considered?`,
        a: profile.indication,
      },
      {
        q: "Does every child with this diagnosis need the same procedure?",
        a: `${profile.nonCandidate} Timing and approach require individualized paediatric orthopaedic review.`,
      },
      {
        q: "What tests are needed before treatment, and do X-rays or MRI matter?",
        a: profile.evaluation,
      },
      {
        q: "What approaches may be discussed?",
        a: `${profile.technique} Relevant forms include ${approachSummary}; they are selected clinically, not by package price.`,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration} This is an orientation only; extra stages and the child's condition can extend the episode.`,
      },
      {
        q: "How long is recovery, and what does the stored stay mean?",
        a: `${profile.recovery} The stored stay is [STAY], but discharge and travel dates remain individualized. ${profile.ward}`,
      },
      {
        q: "How much do implants, frames or casts affect the final cost?",
        a: `${profile.implantRehab} ${profile.mobility}`,
      },
      {
        q: "Does the child's age affect the quotation?",
        a: `Yes. Important drivers include ${profile.drivers
          .map((item) => item.label.toLowerCase())
          .join(", ")}. Ask for each change in writing.`,
      },
      {
        q: "Are complications and extra nights included?",
        a: "Only if the itemized estimate says so. Ask how infection care, transfusion, medical events, return to theatre and days beyond the allowance are billed.",
      },
      {
        q: "How should an international family choose a paediatric orthopaedic surgeon?",
        a: "Verify the proposed clinician's role, relevance to the child's age and deformity, exact campus, implant or frame plan, physiotherapy support, communication and handover. Directory placement is not a ranking, and this page names no provider.",
      },
      {
        q: "When can the child fly home?",
        a: profile.flyHome,
      },
      {
        q: "What follow-up and rehabilitation are required?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `Pediatric orthopaedic specialists to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} paediatric orthopaedic specialists in [CITY]`,
    doctorIntro:
      `Profiles should be pulled dynamically only when ${profile.procedure} appears in the clinician's current procedure relationships. Some Pediatric Orthopaedic procedures have no tagged doctors in some or all cities; the renderer must leave those sections empty. Verify role, case relevance, availability and campus. Placement is not a ranking, and this article adds no experience, volume or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships, not names embedded in editorial copy. Accreditation or a general children’s label does not prove current case acceptance, paediatric anaesthesia, implant inventory, volumes or outcomes.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: profile.figureSrc,
        alt: profile.figureAlt,
        caption:
          "A general educational illustration, not the anatomy or recommended treatment of a specific child.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/costs/pediatric-orthopaedic-treatment-pathway.webp",
        alt: `Illustration of imaging review, growth-aware planning, paediatric ward recovery and physiotherapy for ${profile.shortName}`,
        caption:
          "Postoperative support and duration depend on the operation and clinical course; this image does not imply an outcome.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/pediatric-orthopaedic-international-journey.webp",
        alt: `International records, family travel and follow-up journey for ${profile.shortName}`,
        caption:
          "Clinical acceptance and film review come before travel; treatment and fitness to fly are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const profiles: PedOrthoProfile[] = [
  {
    procedure: "Clubfoot Correction Surgery",
    shortName: "clubfoot correction surgery",
    briefName: "Clubfoot Correction Surgery",
    slug: "clubfoot-correction-surgery",
    definition:
      "Clubfoot correction surgery addresses a foot that points down and inward when Ponseti casting, Achilles tenotomy or bracing has not held, or when a later relapse already belongs on a named paediatric list.",
    indication:
      "Surgery may be considered after documented cast or brace failure, for a neglected or relapsed clubfoot, or when residual equinus, adductus or cavus still limits walking. Not every infant with clubfoot needs an open list.",
    nonCandidate:
      "A first presentation that still belongs on a Ponseti programme, or a foot whose main problem is a different paediatric foot diagnosis, should not be labelled clubfoot surgery for convenience.",
    evaluation:
      "Examination, serial photographs and standing or simulated-weight radiographs describe residual deformity. Prior cast counts, tenotomy notes and brace compliance matter as much as a single film.",
    approaches: [
      { label: "Ponseti casts and percutaneous tenotomy", detail: "Still the first pathway for many infants; this sheet is used when that programme is no longer the honest product." },
      { label: "Soft-tissue posteromedial release", detail: "Selected residual or relapsed feet after documented conservative failure." },
      { label: "Osteotomy or revision for older children", detail: "Bony work may be discussed when residual deformity is already rigid." },
    ],
    technique:
      "The surgeon releases or realigns the structures that keep the foot pointing inward, then holds the correction in a cast or brace. The exact sitting follows age and residual deformity, not a brochure sequence.",
    duration: "often 1–3 hours depending on whether the work is a tenotomy, release or osteotomy",
    ward:
      "Many children recover on a paediatric ward with a cast. High-dependency care is reserved for comorbidity or unexpected events, not as a brochure upgrade.",
    recovery:
      "Cast or brace time is written by the operating team. Walking and school return follow the foot, not a hotel booking.",
    implantRehab:
      "The quotation should name whether this is a tenotomy, open release or osteotomy, how many casts are assumed, and whether a boots-and-bar brace is included. A relapse list is a different bill from a first correction.",
    distinctiveRisks:
      "Consent may address infection, wound problems, over- or under-correction, stiffness, relapse, growth-related change and the possible later need for further surgery, without generic success rates.",
    mobility:
      "Weight-bearing depends on the cast. Parents should ask for a written sitting and carrying plan, especially for air travel.",
    flyHome:
      "There is no universal flight day. Fitness to fly depends on the cast, swelling, pain control and whether a long unsupported sit is acceptable.",
    drivers: [
      { label: "Infant versus relapsed or neglected foot", detail: "A first Ponseti pathway and an older relapsed foot are different episodes." },
      { label: "Unilateral versus bilateral correction", detail: "Two feet add theatre time, casts and often stay." },
      { label: "Soft-tissue versus bony work", detail: "Osteotomy changes implants, stay and physiotherapy." },
      { label: "Number of postoperative casts", detail: "Each additional cast may sit outside a narrow package." },
      { label: "Brace supply after discharge", detail: "Boots-and-bar systems are not automatically included." },
    ],
    quoteItems: [
      "Is this priced as a first correction or a relapse list?",
      "How many casts and which brace are assumed after theatre?",
    ],
    documents: ["Serial photographs and any prior Ponseti or tenotomy notes", "Current brace photographs if used"],
    followUp:
      "Surveillance commonly includes cast changes, brace checks and a long brace-wear plan that continues after the family returns home.",
    related: ["Pediatric Foot & Ankle Surgery", "Pediatric Deformity Correction", "Tendon Repair Surgery"],
    figureSrc: "/costs/clubfoot-correction-surgery-illustration.webp",
    figureAlt: "Illustration of a child's inward-turning clubfoot beside a corrected alignment in a light cast",
    untaggedCities: ["mumbai"],
  },
  {
    procedure: "Pediatric Fracture Surgery",
    shortName: "pediatric fracture surgery",
    briefName: "Pediatric Fracture Surgery",
    slug: "pediatric-fracture-surgery",
    definition:
      "Pediatric fracture surgery is an operation to reduce and hold a child's broken bone when closed reduction, plaster or observation is no longer enough.",
    indication:
      "It may be considered for a displaced, unstable or open fracture, a failed closed reduction, or a fracture that already threatens a growth plate or joint. Not every childhood fracture needs theatre.",
    nonCandidate:
      "An undisplaced fracture that still belongs in plaster, or an adult trauma list that should sit on Orthopedics, should not be relabelled as this slug.",
    evaluation:
      "Orthogonal radiographs, and sometimes CT for joints, describe displacement and the growth plate. Time since injury and any attempted reduction belong in the same packet.",
    approaches: [
      { label: "Closed reduction and casting", detail: "Still the first honest product when stability can be held in plaster." },
      { label: "Closed reduction and percutaneous wires", detail: "Used when a reduced fracture needs metal without an open exposure." },
      { label: "Open reduction", detail: "Reserved for failed closed methods or intra-articular patterns; fixation details sit on the neighbouring slug when hardware is the product." },
    ],
    technique:
      "The surgeon restores alignment, protects the growth plate where possible, and holds the reduction with plaster, wires or other fixation chosen for the child's age.",
    duration: "often 45 minutes to 2 hours depending on bone and whether the reduction stays closed",
    ward:
      "Many children go home after a short paediatric-ward stay. Open injuries or polytrauma may need longer observation.",
    recovery:
      "Cast or sling time and school sport restrictions are written after the films. Healing is judged in weeks to months, not by a return-ticket date.",
    implantRehab:
      "The quotation should name the bone, whether wires or a plate are assumed, and whether hardware removal is a second sitting. Pediatric fracture fixation is the neighbouring product when metal, not indication, is the honest label.",
    distinctiveRisks:
      "Consent may address infection, malunion, growth arrest, stiffness, compartment syndrome in selected fractures and the possible need for later hardware removal.",
    mobility:
      "Weight-bearing and lifting follow the bone. A parent should ask for a written carrying and school-transport plan.",
    flyHome:
      "Fitness to fly depends on swelling, cast integrity, pain and whether the child can sit for the flight without losing reduction.",
    drivers: [
      { label: "Which bone and whether the growth plate is involved", detail: "A physis-threatening pattern is not a simple shaft package." },
      { label: "Closed versus open reduction", detail: "Open work adds theatre time and often stay." },
      { label: "Open versus closed skin injury", detail: "Open fractures change antibiotics, staging and stay." },
      { label: "Need for later hardware removal", detail: "A second anaesthetic is a separate bill unless bundled." },
      { label: "Time since injury", detail: "A late presentation may need a different reconstruction." },
    ],
    quoteItems: [
      "Is hardware removal included if wires or a plate are used?",
      "Which bone and laterality are priced?",
    ],
    documents: ["Injury radiographs in two planes", "Any attempted-reduction films and the time of injury"],
    followUp:
      "Repeat radiographs, cast changes and a decision about hardware removal are expected. A local clinician should see the child after return.",
    related: ["Pediatric Fracture Fixation", "Pediatric Deformity Correction", "Limb Reconstruction Surgery"],
    figureSrc: "/costs/pediatric-fracture-surgery-illustration.webp",
    figureAlt: "Illustration of a child's forearm fracture near a marked growth plate before reduction",
  },
  {
    procedure: "Pediatric Deformity Correction",
    shortName: "pediatric deformity correction",
    briefName: "Pediatric Deformity Correction",
    slug: "pediatric-deformity-correction",
    definition:
      "Pediatric deformity correction realigns a child's bone or joint when bowing, knock-knee, rotational or angular deformity already limits function or is predicted to worsen with growth.",
    indication:
      "It may be considered when guided growth, bracing or observation is no longer enough, or when a congenital or post-traumatic deformity already belongs on an osteotomy list. Not every knock-knee or bow-leg needs surgery.",
    nonCandidate:
      "Physiological bowing that still belongs on observation, or a lengthening or reconstruction product that should sit on those neighbouring slugs, should not be collapsed into this sheet.",
    evaluation:
      "Standing alignment radiographs, often full-length films, and a growth-remaining estimate decide timing. Gait notes and previous osteotomy or hemiepiphysiodesis records belong in the same packet.",
    approaches: [
      { label: "Guided growth (hemiepiphysiodesis)", detail: "A plate across one side of a growth plate may be discussed while substantial growth remains." },
      { label: "Acute corrective osteotomy", detail: "A planned bone cut and internal fixation when the deformity is already too large for guided growth." },
      { label: "Gradual correction with a frame", detail: "Selected multiplanar or unstable deformities; lengthening remains a different product when distraction is the goal." },
    ],
    technique:
      "The surgeon chooses guided growth, an osteotomy or gradual correction, then holds the new alignment with a plate, screws or a frame while bone heals and remaining growth is watched.",
    duration: "often 1–4 hours depending on bones, laterality and whether a frame is applied",
    ward:
      "Most children recover on a paediatric ward with early assisted mobility. High-dependency care is reserved for comorbidity, blood loss or unexpected events.",
    recovery:
      "Weight-bearing, school and sport follow the osteotomy or frame protocol. Alignment is judged over months, including remaining growth.",
    implantRehab:
      "The quotation should name laterality, guided-growth plates versus osteotomy hardware, whether a frame is assumed, and whether implant removal is a second sitting.",
    distinctiveRisks:
      "Consent may address infection, nerve stretch, recurrence with growth, over- or under-correction, delayed union, implant irritation and the later need for further surgery.",
    mobility:
      "Crutches or a frame change how a child sits, bathes and attends school. Parents should ask for a written weight-bearing plan.",
    flyHome:
      "Frames and fresh osteotomies make long-haul flights a clinical decision, not a calendar one. Pin-site care and sitting time must be acceptable first.",
    drivers: [
      { label: "Guided growth versus osteotomy", detail: "These are different theatre, implant and stay products." },
      { label: "Unilateral versus bilateral limbs", detail: "Two sides add implants and often a longer stay." },
      { label: "Growth remaining", detail: "Timing can add a later second sitting as the child grows." },
      { label: "Frame versus internal fixation", detail: "Frame parts and outpatient adjustments change the bill." },
      { label: "Number of bones corrected", detail: "Femur plus tibia is not a single-bone package." },
    ],
    quoteItems: [
      "Is this priced as guided growth or as an osteotomy?",
      "Is implant or frame removal a second billed sitting?",
    ],
    documents: ["Standing full-length alignment radiographs", "Prior guided-growth or osteotomy notes if any"],
    followUp:
      "Alignment films, remaining-growth review and a decision about implant removal are expected after the family returns home.",
    related: ["Limb Lengthening Surgery", "Limb Reconstruction Surgery", "Pediatric Fracture Surgery"],
    figureSrc: "/costs/pediatric-deformity-correction-illustration.webp",
    figureAlt: "Illustration of a child's bowed legs beside a straighter alignment after corrective osteotomy",
  },
  {
    procedure: "Limb Lengthening Surgery",
    shortName: "limb lengthening surgery",
    briefName: "Limb Lengthening Surgery",
    slug: "limb-lengthening-surgery",
    definition:
      "Limb lengthening surgery gradually lengthens a short bone using a frame or an internal lengthening nail after a controlled osteotomy, so that a child's limb-length discrepancy can be reduced over weeks.",
    indication:
      "It may be considered when a measured discrepancy already affects gait or is predicted to be large at maturity, and when conservative lifts are no longer the honest plan. Not every short limb needs distraction.",
    nonCandidate:
      "A discrepancy that still belongs on a shoe-lift, or a reconstruction whose main problem is deficiency rather than length, should sit on the neighbouring reconstruction sheet.",
    evaluation:
      "Scanograms or full-length films, a predicted discrepancy at maturity, and joint stability decide whether lengthening is safe. Infection history and prior frames belong in the same packet.",
    approaches: [
      { label: "External circular or rail frame", detail: "Common when multiplanar correction or an unstable regenerate must be watched closely." },
      { label: "Internal lengthening nail", detail: "Discussed in selected older children when canal size and joint stability already allow it." },
      { label: "Combined lengthening with deformity correction", detail: "When angulation and length must move together; reconstruction remains the label if bone transport is the product." },
    ],
    technique:
      "The surgeon cuts the bone, applies a frame or nail, and then lengthens a small amount each day while regenerate bone fills the gap. Outpatient adjustments continue long after the first ward stay.",
    duration: "often 2–5 hours for the index sitting; distraction itself lasts weeks",
    ward:
      "The stored stay covers the index admission. Families should plan an in-city outpatient period for distraction and pin-site or nail review.",
    recovery:
      "Walking with a frame or protected weight-bearing continues through distraction and consolidation. School and sport return are late events.",
    implantRehab:
      "The quotation should name frame versus nail, predicted centimetres, whether outpatient adjustments are included, and whether frame removal is a second sitting. Hotel nights during distraction are usually extra.",
    distinctiveRisks:
      "Consent may address pin-site or deep infection, joint stiffness, nerve stretch, regenerate problems, implant failure and the possible need to stop or reverse lengthening.",
    mobility:
      "A frame changes clothing, bathing and aircraft seating. Parents should ask for a written distraction schedule and who performs turns.",
    flyHome:
      "Flying during active distraction is often inappropriate. Fitness to fly is usually discussed after consolidation has started and pin sites are quiet.",
    drivers: [
      { label: "Centimetres planned", detail: "Each additional centimetre adds outpatient time and risk, not just theatre minutes." },
      { label: "Frame versus internal nail", detail: "Different implant families and follow-up intensity." },
      { label: "Femur versus tibia", detail: "Joint-protection protocols and physiotherapy differ." },
      { label: "Outpatient distraction period", detail: "In-city lodging is usually outside the hospital band." },
      { label: "Frame or nail removal sitting", detail: "A second anaesthetic unless bundled." },
    ],
    quoteItems: [
      "How many centimetres are priced, and what happens if the plan stops early?",
      "Are outpatient frame adjustments and later removal included?",
    ],
    documents: ["Scanogram or full-length films with a predicted discrepancy", "Prior infection or frame records"],
    followUp:
      "Weekly or fortnightly films during distraction, then consolidation review and a removal plan, usually require a local paediatric reconstruction partner at home.",
    related: ["Limb Reconstruction Surgery", "Pediatric Deformity Correction", "Pediatric Fracture Surgery"],
    figureSrc: "/costs/limb-lengthening-surgery-illustration.webp",
    figureAlt: "Illustration of a child's shorter tibia beside a lengthening frame with a small distraction gap",
    untaggedCities: ["bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Limb Reconstruction Surgery",
    shortName: "limb reconstruction surgery",
    briefName: "Limb Reconstruction Surgery",
    slug: "limb-reconstruction-surgery",
    definition:
      "Limb reconstruction surgery rebuilds a child's limb when congenital deficiency, infection, tumour reconstruction or failed trauma already needs more than a single osteotomy or a simple lengthening.",
    indication:
      "It may be considered for congenital femoral or tibial deficiency, chronic osteomyelitis, non-union, or a limb that already needs bone transport or staged reconstruction. A shoe-lift or one-level osteotomy is a different product.",
    nonCandidate:
      "An isolated length discrepancy that still belongs on the lengthening sheet, or an adult reconstruction list, should not be labelled as this paediatric product.",
    evaluation:
      "Standing films, infection markers, MRI or CT when indicated, and a map of missing bone or unstable joints decide staging. Prior frames and culture results belong in the same packet.",
    approaches: [
      { label: "Staged debridement and reconstruction", detail: "Infection-related lists may need more than one admission." },
      { label: "Bone transport or frame reconstruction", detail: "Used when a segment must be grown or docked gradually." },
      { label: "Internal reconstruction after a clean bed", detail: "Selected cases once infection or soft tissue already allows a nail or plate." },
    ],
    technique:
      "The surgeon treats the cause — infection, deficiency or instability — then reconstructs length, alignment and joint stability in one or more sittings. The first admission is not always the last.",
    duration: "often 3–6 hours for an index sitting; staged programmes last months",
    ward:
      "High-dependency observation is more often discussed than after a simple osteotomy. The stored stay is [STAY] for the index admission, not the whole programme.",
    recovery:
      "Walking, school and sport follow each stage. Families should plan for a long physiotherapy relationship, not a single hotel week.",
    implantRehab:
      "The letter must name what is being removed, what is being added, whether a spacer or second infection admission is priced, and who supplies frame parts.",
    distinctiveRisks:
      "Consent may address recurrent infection, docking-site problems, joint stiffness, nerve injury, further bone loss and the likely need for additional stages.",
    mobility:
      "Frames, spacers and non-weight-bearing periods change family logistics more than a primary fracture list.",
    flyHome:
      "Active infection treatment and early regenerate make early long-haul flights inappropriate until wounds and walking are reviewed.",
    drivers: [
      { label: "Cause of the deficiency", detail: "Infection, congenital deficiency and trauma are different investigations." },
      { label: "Single-stage versus two-stage infection care", detail: "Two admissions unless bundled." },
      { label: "Length of bone transport", detail: "Outpatient months are usually outside the index letter." },
      { label: "Joint reconstruction at the same sitting", detail: "An unstable knee or ankle changes implants and stay." },
      { label: "Prior implant extraction time", detail: "Broken or infected metal adds theatre hours." },
    ],
    quoteItems: [
      "Is this priced as a single stage or an infection spacer stage?",
      "Which frame parts and later docking or removal sittings are assumed?",
    ],
    documents: ["Prior operative notes and culture results", "Standing films and any MRI of the deficient segment"],
    followUp:
      "Long radiographic surveillance, infection markers when relevant, and a lower threshold to investigate new drainage are expected.",
    related: ["Limb Lengthening Surgery", "Pediatric Deformity Correction", "Pediatric Fracture Fixation"],
    figureSrc: "/costs/limb-reconstruction-surgery-illustration.webp",
    figureAlt: "Illustration of a child's deficient lower limb beside a frame reconstruction and bone-transport corridor",
    untaggedCities: ["delhi-ncr", "bengaluru", "hyderabad"],
  },
  {
    procedure: "Developmental Dysplasia of Hip Surgery",
    shortName: "DDH surgery",
    briefName: "DDH Surgery",
    slug: "developmental-dysplasia-of-hip-surgery",
    definition:
      "Developmental dysplasia of the hip surgery reduces and stabilizes a child's hip when a Pavlik harness, closed reduction or observation has not produced a stable, covered joint.",
    indication:
      "It may be considered after failed harness treatment, for a late-presenting dislocation, or when residual dysplasia already belongs on an open reduction or osteotomy list. Not every dysplastic hip needs theatre.",
    nonCandidate:
      "An infant hip that still belongs in a harness, or an adolescent reconstruction that should sit on the paediatric hip-reconstruction sheet, should not be collapsed into this indication.",
    evaluation:
      "Ultrasound in infants, then pelvic radiographs, describe coverage and whether the hip is reducible. Prior harness hours and any attempted closed reduction belong in the same packet.",
    approaches: [
      { label: "Closed reduction and spica cast", detail: "Selected hips that reduce stably under anaesthesia without an open exposure." },
      { label: "Open reduction", detail: "Used when a block to reduction already exists." },
      { label: "Pelvic or femoral osteotomy", detail: "Added when coverage or alignment already needs bone work; later reconstruction sits on the neighbouring slug." },
    ],
    technique:
      "The surgeon reduces the femoral head into the socket, removes blocks to reduction if needed, and holds the hip in a spica or with an osteotomy when coverage is still insufficient.",
    duration: "often 1–4 hours depending on whether the reduction is closed, open or combined with osteotomy",
    ward:
      "Children usually recover on a paediatric ward in a hip spica. Parent education about lifting and nappy care is part of the stay.",
    recovery:
      "Spica time, then bracing and protected walking, are written by the operating team. The hip is watched through remaining growth.",
    implantRehab:
      "The quotation should name closed versus open reduction, whether an osteotomy is assumed, how many spica changes are included, and whether a second-look arthrogram is priced.",
    distinctiveRisks:
      "Consent may address redislocation, stiffness, avascular necrosis of the femoral head, growth disturbance, cast problems and the later need for reconstructive osteotomy.",
    mobility:
      "A spica changes flying, car seats and sleeping. Parents should ask for a written lifting and hygiene plan before booking flights.",
    flyHome:
      "Airline acceptance of a spica and the child's ability to lie or sit safely matter more than an arbitrary postoperative day.",
    drivers: [
      { label: "Age at reduction", detail: "Infant closed reduction and a walking-age open list are different episodes." },
      { label: "Closed versus open reduction", detail: "Open work adds theatre time and often stay." },
      { label: "Need for osteotomy", detail: "Pelvic or femoral bone work changes implants and recovery." },
      { label: "Unilateral versus bilateral hips", detail: "Two sides add cast complexity and stay." },
      { label: "Number of spica changes", detail: "Each additional anaesthetic for a cast change may be extra." },
    ],
    quoteItems: [
      "Is this priced as closed reduction, open reduction or reduction plus osteotomy?",
      "How many spica changes are included?",
    ],
    documents: ["Infant ultrasound or pelvic radiographs", "Harness or prior closed-reduction notes"],
    followUp:
      "Serial pelvic films through growth, brace checks and a low threshold to reassess coverage are expected after return home.",
    related: ["Pediatric Hip Reconstruction", "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)", "Hip Preservation Surgery"],
    figureSrc: "/costs/developmental-dysplasia-of-hip-surgery-illustration.webp",
    figureAlt: "Illustration of a shallow child's hip socket beside a better-covered hip after reduction",
    untaggedCities: ["mumbai"],
  },
  {
    procedure: "Pediatric Hip Reconstruction",
    shortName: "pediatric hip reconstruction",
    briefName: "Pediatric Hip Reconstruction",
    slug: "pediatric-hip-reconstruction",
    definition:
      "Pediatric hip reconstruction reshapes coverage or alignment of a child's hip when residual dysplasia, Perthes-related deformity or a salvage problem already needs more than a first DDH reduction.",
    indication:
      "It may be considered for residual acetabular dysplasia, hinge abduction, or a hip that already belongs on a pelvic or femoral osteotomy list after earlier treatment. DDH reduction and SCFE pinning remain neighbouring products.",
    nonCandidate:
      "A first DDH reduction, an acute SCFE that still belongs on the pinning sheet, or an adult arthroplasty brochure should not use this label.",
    evaluation:
      "Pelvic radiographs, often CT for osteotomy planning, and a map of remaining growth decide which osteotomy is honest. Prior DDH or Perthes records belong in the same packet.",
    approaches: [
      { label: "Pelvic osteotomy for coverage", detail: "Redirects the socket when residual dysplasia already limits the hip." },
      { label: "Femoral osteotomy", detail: "Used when proximal femoral alignment is the main problem." },
      { label: "Combined pelvic and femoral work", detail: "Selected hips that need both coverage and redirection in one or staged sittings." },
    ],
    technique:
      "The surgeon cuts and redirects pelvic or femoral bone, holds the new position with implants, and protects the hip while it heals. Weight-bearing is usually restricted at first.",
    duration: "often 2–5 hours depending on whether one or both sides of the joint are moved",
    ward:
      "Most children recover on a paediatric ward; a spica is used in some age groups. High-dependency care is reserved for comorbidity or unexpected events.",
    recovery:
      "Crutches, school transport and sport restrictions last weeks to months. The hip is watched through remaining growth.",
    implantRehab:
      "The quotation should name which osteotomy, laterality, implant set and whether a spica is assumed. Implant removal may be a later sitting.",
    distinctiveRisks:
      "Consent may address infection, stiffness, avascular necrosis, non-union, implant irritation, residual dysplasia and the possible need for further reconstruction.",
    mobility:
      "Non-weight-bearing after pelvic osteotomy is common. A parent should ask for a written toilet, car-seat and school plan.",
    flyHome:
      "Long-haul flights after pelvic osteotomy are discussed only when sitting, wounds and clot-prevention advice already allow it.",
    drivers: [
      { label: "Pelvic versus femoral osteotomy", detail: "Different implant families and weight-bearing rules." },
      { label: "Combined versus single-bone work", detail: "Two osteotomies add theatre time and stay." },
      { label: "Prior DDH or Perthes operations", detail: "Scar and residual deformity change the sitting." },
      { label: "Need for a spica", detail: "Cast care and airline logistics sit outside a narrow package." },
      { label: "Later implant removal", detail: "A second anaesthetic unless bundled." },
    ],
    quoteItems: [
      "Which osteotomy is priced, and is a combined pelvic-and-femoral sitting assumed?",
      "Is a spica and later implant removal included?",
    ],
    documents: ["Pelvic radiographs and any CT already obtained", "Prior DDH, Perthes or osteotomy notes"],
    followUp:
      "Serial films, physiotherapy and a decision about implant removal continue after the family returns home.",
    related: ["Developmental Dysplasia of Hip Surgery", "Hip Preservation Surgery", "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)"],
    figureSrc: "/costs/pediatric-hip-reconstruction-illustration.webp",
    figureAlt: "Illustration of an uncovered child's femoral head beside a reconstructed hip with improved coverage",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai"],
  },
  {
    procedure: "Hip Preservation Surgery",
    shortName: "hip preservation surgery",
    briefName: "Hip Preservation Surgery",
    slug: "hip-preservation-surgery",
    definition:
      "Hip preservation surgery treats a young hip — often an adolescent or older child — so that impingement, instability or residual deformity can be improved without replacing the joint.",
    indication:
      "It may be considered for femoroacetabular impingement, selected residual dysplasia, or labral work when the joint is still worth preserving. This paediatric sheet is not an adult hip-replacement brochure.",
    nonCandidate:
      "Advanced arthritis that already belongs on arthroplasty, or an infant DDH reduction, should not be labelled preservation for convenience.",
    evaluation:
      "Pelvic radiographs, MRI of the labrum and cartilage, and sometimes CT for cam or pincer morphology decide whether preservation is honest. Prior sports history belongs in the packet.",
    approaches: [
      { label: "Arthroscopic osteochondroplasty and labral work", detail: "Selected cam or pincer hips with preserved cartilage." },
      { label: "Open surgical dislocation", detail: "Used when the deformity cannot be reached safely through the arthroscope." },
      { label: "Redirectional osteotomy as preservation", detail: "When coverage, not a bump, is the honest problem; larger reconstructions sit next door." },
    ],
    technique:
      "The surgeon reshapes bone that clashes, repairs or reconstructs the labrum if needed, and protects remaining cartilage. Replacement is not part of this product.",
    duration: "often 1.5–4 hours depending on arthroscopic versus open access",
    ward:
      "Many adolescents recover on a short paediatric or young-adult ward stay with crutches. High-dependency care is uncommon unless comorbidity exists.",
    recovery:
      "Protected weight-bearing and a structured physiotherapy programme last weeks to months. Return to sport is late and individualized.",
    implantRehab:
      "The quotation should name arthroscopic versus open access, whether anchors or an osteotomy are assumed, and how many physiotherapy sessions are included.",
    distinctiveRisks:
      "Consent may address stiffness, heterotopic bone, incomplete relief, cartilage progression, nerve irritation and the later possibility of reconstruction or replacement.",
    mobility:
      "Crutches are common. School and sport calendars should stay flexible.",
    flyHome:
      "Fitness to fly depends on sitting comfort, wound status and whether crutches are already safe in an airport.",
    drivers: [
      { label: "Arthroscopic versus open dislocation", detail: "Different theatre time and stay." },
      { label: "Labral repair versus debridement", detail: "Anchors change the consumable line." },
      { label: "Added osteotomy", detail: "Moves the case toward the reconstruction sheet." },
      { label: "Laterality", detail: "Bilateral planned sittings are not one hip." },
      { label: "Physiotherapy block after discharge", detail: "Often outside a short ward package." },
    ],
    quoteItems: [
      "Is this priced as arthroscopy or as open surgical dislocation?",
      "Are anchors and the first physiotherapy block included?",
    ],
    documents: ["Pelvic radiographs and hip MRI", "Prior sports or arthroscopy notes"],
    followUp:
      "Physiotherapy milestones and repeat films if an osteotomy was added continue after return. This is not a one-visit pathway.",
    related: ["Pediatric Hip Reconstruction", "Developmental Dysplasia of Hip Surgery", "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)"],
    figureSrc: "/costs/hip-preservation-surgery-illustration.webp",
    figureAlt: "Illustration of a young hip with a cam bump beside a reshaped, preserved joint without a replacement",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "hyderabad"],
  },
  {
    procedure: "Pediatric Scoliosis Surgery",
    shortName: "pediatric scoliosis surgery",
    briefName: "Pediatric Scoliosis Surgery",
    slug: "pediatric-scoliosis-surgery",
    definition:
      "Pediatric scoliosis surgery instruments a child's curved spine when bracing has not controlled the curve, or when magnitude and remaining growth already write fusion or a growth-friendly construct.",
    indication:
      "It may be considered for idiopathic, congenital or neuromuscular curves that already meet surgical thresholds after specialist review. Adult scoliosis correction remains on the Spine Surgery sheet.",
    nonCandidate:
      "A moderate curve that still belongs in a brace, or an adult deformity list, should not be labelled as this paediatric product.",
    evaluation:
      "Standing full-spine radiographs, bending or traction films, MRI when indicated, and a growth-remaining estimate decide construct type. Pulmonary and nutritional notes matter for neuromuscular curves.",
    approaches: [
      { label: "Posterior instrumented fusion", detail: "The most commonly discussed adolescent idiopathic construct." },
      { label: "Growth-friendly or growing-rod systems", detail: "Selected younger children who still need substantial spinal growth." },
      { label: "Anterior or combined work", detail: "Used when the curve pattern already requires a second corridor." },
    ],
    technique:
      "The surgeon places screws or hooks and rods, corrects selected levels, and may fuse those levels or leave a growing construct that needs later lengthening.",
    duration: "often 4–8 hours depending on levels, neuromonitoring and whether a growing system is used",
    ward:
      "Children usually spend several nights on a paediatric ward or high-dependency area. The stored stay is [STAY].",
    recovery:
      "Walking starts early; sitting, school and sport restrictions last months. Growing-rod programmes add planned later sittings.",
    implantRehab:
      "The quotation should name fusion versus growing rods, number of levels, neuromonitoring, and whether later lengthening is priced. An extra level is a different bill.",
    distinctiveRisks:
      "Consent may address infection, bleeding, nerve injury, implant prominence, adding-on of the curve, pulmonary issues in neuromuscular disease and the later need for revision or lengthening.",
    mobility:
      "A brace may be used. Long sitting on flights should be planned with the treating team.",
    flyHome:
      "Fitness to fly depends on the wound, haemoglobin, sitting tolerance and whether a growing-rod child still needs in-city lengthening.",
    drivers: [
      { label: "Number of instrumented levels", detail: "Each additional level adds implants and theatre time." },
      { label: "Fusion versus growth-friendly implants", detail: "Growing systems add later billed sittings." },
      { label: "Idiopathic versus neuromuscular curve", detail: "Different ICU, nutrition and stay assumptions." },
      { label: "Neuromonitoring", detail: "Should be named rather than assumed." },
      { label: "Blood products", detail: "May sit outside a narrow package." },
    ],
    quoteItems: [
      "How many levels are priced, and is this a fusion or a growing-rod programme?",
      "Is neuromonitoring included, and who interprets it?",
    ],
    documents: ["Standing full-spine radiographs", "MRI if already obtained and any brace history"],
    followUp:
      "Serial radiographs, wound review and, for growing systems, a calendar of later lengthenings continue after return.",
    related: ["Pediatric Spinal Deformity Correction", "Pediatric Deformity Correction", "Cerebral Palsy Orthopedic Surgery"],
    figureSrc: "/costs/pediatric-scoliosis-surgery-illustration.webp",
    figureAlt: "Illustration of a child's curved spine beside an instrumented scoliosis correction",
    untaggedCities: ["mumbai"],
  },
  {
    procedure: "Pediatric Spinal Deformity Correction",
    shortName: "pediatric spinal deformity correction",
    briefName: "Pediatric Spinal Deformity Correction",
    slug: "pediatric-spinal-deformity-correction",
    definition:
      "Pediatric spinal deformity correction treats kyphosis, congenital segmentation anomalies or complex neuromuscular deformity that is not honestly described as a standard adolescent idiopathic scoliosis fusion.",
    indication:
      "It may be considered for progressive kyphosis, congenital hemivertebra, or neuromuscular deformity already accepted on a children's spine list. Adult spinal deformity correction remains a Spine Surgery sheet.",
    nonCandidate:
      "A typical adolescent idiopathic curve that still belongs on the paediatric scoliosis sheet, or an adult list, should not borrow this label.",
    evaluation:
      "Standing and sitting spine films, CT for congenital anomalies, MRI of the cord, and pulmonary or nutritional review decide staging. Prior growing-rod notes belong in the packet.",
    approaches: [
      { label: "Posterior correction and fusion", detail: "Used when a single posterior corridor already addresses the deformity." },
      { label: "Hemivertebra resection or congenital correction", detail: "Selected segmentation anomalies after CT mapping." },
      { label: "Growing or revision constructs", detail: "Younger or previously instrumented children may need a programme, not one sitting." },
    ],
    technique:
      "The surgeon corrects selected levels, protects the cord with neuromonitoring, and may resect a congenital anomaly or revise a prior construct. This is not a longer version of the idiopathic brochure.",
    duration: "often 5–10 hours depending on osteotomies, congenital work and revision",
    ward:
      "High-dependency observation is more often discussed than after a straightforward idiopathic fusion. The stored stay is [STAY].",
    recovery:
      "Walking and sitting limits follow the new construct. Pulmonary physiotherapy may be part of neuromuscular care.",
    implantRehab:
      "The letter must name osteotomies, congenital resection, growing versus definitive fusion, and whether a staged anterior sitting is priced separately.",
    distinctiveRisks:
      "Consent may address cord injury, infection, implant failure, residual deformity, pulmonary complications and the likely need for further surgery as the child grows.",
    mobility:
      "Restrictions are often stricter than after a standard idiopathic fusion. A brace may be used.",
    flyHome:
      "Staged congenital or neuromuscular programmes make early long-haul flights inappropriate until wounds, sitting and breathing are reviewed.",
    drivers: [
      { label: "Kyphosis versus congenital versus neuromuscular", detail: "These are different investigations and stay assumptions." },
      { label: "Need for osteotomy or hemivertebra resection", detail: "Adds theatre hours and neuromonitoring intensity." },
      { label: "Primary versus revision construct", detail: "Hardware removal changes inventory." },
      { label: "Growing versus definitive fusion", detail: "Later lengthenings are extra unless bundled." },
      { label: "Pulmonary and nutritional optimization", detail: "May add preoperative hospital days." },
    ],
    quoteItems: [
      "Is a hemivertebra resection or osteotomy priced?",
      "Is this a single sitting or a growing-rod programme?",
    ],
    documents: ["Standing and sitting spine films", "CT for congenital anomalies and MRI of the cord if obtained"],
    followUp:
      "Longer radiographic and pulmonary surveillance, and a lower threshold to investigate new weakness, are expected.",
    related: ["Pediatric Scoliosis Surgery", "Cerebral Palsy Orthopedic Surgery", "Pediatric Deformity Correction"],
    figureSrc: "/costs/pediatric-spinal-deformity-correction-illustration.webp",
    figureAlt: "Illustration of a child's kyphotic spinal profile beside a more balanced instrumented correction",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Cerebral Palsy Orthopedic Surgery",
    shortName: "cerebral palsy orthopedic surgery",
    briefName: "Cerebral Palsy Orthopedic Surgery",
    slug: "cerebral-palsy-orthopedic-surgery",
    definition:
      "Cerebral palsy orthopedic surgery addresses contractures, hip displacement or lever-arm problems that already limit a child's gait, sitting or care, after a paediatric orthopaedic and often a gait-lab review.",
    indication:
      "It may be considered for hip migration, crouch or equinus that no longer responds to therapy, botulinum toxin or bracing, or when single-event multilevel surgery is already the honest plan. Not every child with cerebral palsy needs an operation.",
    nonCandidate:
      "A child whose main need is still therapy, or a spine deformity that should sit on the paediatric scoliosis or spinal-deformity sheet, should not be collapsed into this label.",
    evaluation:
      "Examination, hip and alignment radiographs, and gait analysis when available decide which muscles and bones to address. Seizure, tone and nutrition notes belong in the same packet.",
    approaches: [
      { label: "Soft-tissue lengthening or transfer", detail: "Selected contractures when bone alignment is still acceptable." },
      { label: "Hip reconstruction for migration", detail: "Used when coverage or varus/derotation already belongs on a bony list." },
      { label: "Single-event multilevel surgery", detail: "Addresses several levels in one sitting after gait analysis; not a default package." },
    ],
    technique:
      "The surgeon lengthens or transfers selected tendons and, when needed, realigns bone so that sitting or walking can be more efficient. Tone management remains a medical partnership, not an implant upgrade.",
    duration: "often 2–6 hours depending on how many levels are addressed",
    ward:
      "Children usually recover on a paediatric ward with early physiotherapy. Pain and tone management are part of the stay.",
    recovery:
      "Casts or braces, then a long physiotherapy block, determine function. Families should plan weeks of therapy, not a single hotel week.",
    implantRehab:
      "The quotation should name which levels, whether bony hip work is included, gait-analysis fees, and how many inpatient and outpatient physiotherapy sessions are assumed.",
    distinctiveRisks:
      "Consent may address wound problems, recurrence of contracture, weakness, hip stiffness, pressure sores in casts and the later need for further surgery as the child grows.",
    mobility:
      "A child may need a wheelchair or walker for a period even if they walked before. Parents should ask for a written equipment plan.",
    flyHome:
      "Fitness to fly depends on tone, casts, sitting tolerance and whether a long flight would undo early physiotherapy.",
    drivers: [
      { label: "Soft-tissue versus bony hip reconstruction", detail: "These are different implant and stay products." },
      { label: "Number of levels in a SEMLS sitting", detail: "Each additional level adds theatre time." },
      { label: "Gait-analysis fees", detail: "May sit outside the surgical letter." },
      { label: "Tone and medical complexity", detail: "Can add high-dependency or longer stay." },
      { label: "Outpatient physiotherapy block", detail: "Usually the larger family cost after discharge." },
    ],
    quoteItems: [
      "Which levels are priced, and is gait analysis included?",
      "Is hip reconstruction part of this letter or a separate sitting?",
    ],
    documents: ["Hip and alignment radiographs", "Gait-analysis report if already performed and current therapy notes"],
    followUp:
      "Physiotherapy, orthoses and serial hip films continue after return. A local paediatric orthopaedic and therapy team should be named before travel.",
    related: ["Pediatric Hip Reconstruction", "Pediatric Scoliosis Surgery", "Tendon Repair Surgery"],
    figureSrc: "/costs/cerebral-palsy-orthopedic-surgery-illustration.webp",
    figureAlt: "Illustration of a child's crouched gait beside a more upright stance after orthopaedic correction",
    untaggedCities: ["mumbai", "bengaluru"],
  },
  {
    procedure: "Pediatric Foot & Ankle Surgery",
    shortName: "pediatric foot and ankle surgery",
    briefName: "Pediatric Foot and Ankle Surgery",
    slug: "pediatric-foot-ankle-surgery",
    definition:
      "Pediatric foot and ankle surgery treats a child's foot or ankle problem that is not honestly labelled clubfoot — for example selected flatfoot, cavus, tarsal coalition or residual deformity after earlier care.",
    indication:
      "It may be considered when pain, shoe problems or progressive deformity already fail orthoses and physiotherapy. Clubfoot correction remains its own slug.",
    nonCandidate:
      "Flexible flatfoot that still belongs in an insole, or a clubfoot relapse that should sit on the clubfoot sheet, should not borrow this label.",
    evaluation:
      "Standing foot radiographs, sometimes CT for coalition, and examination in and out of shoes decide whether bone or soft tissue is the product.",
    approaches: [
      { label: "Orthoses and physiotherapy", detail: "Still the first honest product for many flexible deformities." },
      { label: "Soft-tissue or tendon procedures", detail: "Selected flexible deformities after documented conservative failure." },
      { label: "Osteotomy or coalition resection", detail: "Used when a rigid deformity or a bony bar already belongs on a reconstructive list." },
    ],
    technique:
      "The surgeon realigns selected bones or tendons, sometimes resects a coalition, and holds the correction in a cast. The exact sitting follows the diagnosis, not a generic “children’s foot package.”",
    duration: "often 1–3 hours depending on osteotomy or coalition work",
    ward:
      "Many children recover on a short paediatric-ward stay in a cast. Day-care lists exist for smaller sittings.",
    recovery:
      "Cast time, then a boot or orthosis, determines school sport return. Healing is judged over weeks to months.",
    implantRehab:
      "The quotation should name laterality, whether an implant or graft is assumed, and how many casts are included. A coalition resection is not a simple soft-tissue package.",
    distinctiveRisks:
      "Consent may address infection, stiffness, recurrent deformity, painful hardware, non-union of an osteotomy and the later need for further surgery.",
    mobility:
      "Non-weight-bearing in a cast is common. Parents should ask for a written school and bathing plan.",
    flyHome:
      "Fitness to fly depends on the cast, swelling and whether the child can sit with the foot elevated.",
    drivers: [
      { label: "Soft-tissue versus osteotomy or coalition work", detail: "Bony lists add implants and stay." },
      { label: "Unilateral versus bilateral feet", detail: "Two sides change mobility and lodging." },
      { label: "Need for graft or implant", detail: "Should be named in the letter." },
      { label: "Number of postoperative casts", detail: "Each additional cast may be extra." },
      { label: "Custom orthoses after healing", detail: "Usually outside the hospital band." },
    ],
    quoteItems: [
      "Is this priced as a soft-tissue procedure, osteotomy or coalition resection?",
      "Are postoperative casts and a first orthosis included?",
    ],
    documents: ["Standing foot radiographs", "CT if a coalition is already suspected"],
    followUp:
      "Cast changes, films and a long-term orthosis plan continue after the family returns home.",
    related: ["Clubfoot Correction Surgery", "Pediatric Deformity Correction", "Tendon Repair Surgery"],
    figureSrc: "/costs/pediatric-foot-ankle-surgery-illustration.webp",
    figureAlt: "Illustration of a child's foot deformity beside a corrected foot-and-ankle alignment",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "hyderabad"],
  },
  {
    procedure: "Pediatric Fracture Fixation",
    shortName: "pediatric fracture fixation",
    briefName: "Pediatric Fracture Fixation",
    slug: "pediatric-fracture-fixation",
    definition:
      "Pediatric fracture fixation is the hardware product — wires, elastic nails, plates or screws — used to hold a child's fracture when stability already needs metal. The broader indication sits on the paediatric fracture-surgery sheet.",
    indication:
      "It may be considered when a reduced fracture will not stay in plaster, for selected shaft or joint patterns, or when an open reduction already implies metal. Not every operated childhood fracture uses the same implant family.",
    nonCandidate:
      "A fracture that still belongs in plaster alone, or an adult ORIF list, should not be relabelled as this paediatric fixation slug.",
    evaluation:
      "Injury films, the chosen reduction, and remaining growth decide whether wires, elastic nails or a plate are honest. Planned later removal should be discussed before travel.",
    approaches: [
      { label: "Percutaneous wires", detail: "Common around the elbow and other metaphyseal fractures." },
      { label: "Elastic intramedullary nails", detail: "Selected paediatric shaft fractures that already need internal stability." },
      { label: "Plate or screw fixation", detail: "Used when a joint or unstable pattern already requires a more rigid construct; hardware stays short of the physis when possible." },
    ],
    technique:
      "After reduction, the surgeon places the named hardware away from the growth plate when anatomy allows, then protects the limb in a cast or splint.",
    duration: "often 1–3 hours depending on bone and implant family",
    ward:
      "Short paediatric-ward stays are common. Open fractures or multiple bones may need longer observation.",
    recovery:
      "Cast time and a later removal sitting, if planned, determine the true family calendar.",
    implantRehab:
      "The quotation should name the implant family, whether removal is included, and which bone is priced. An elastic-nail femur is not a wire-supracondylar package.",
    distinctiveRisks:
      "Consent may address infection, pin-site problems, malunion, growth-plate injury, implant prominence and the need for a second anaesthetic to remove metal.",
    mobility:
      "Weight-bearing depends on the construct. Parents should ask for a written school-transport plan.",
    flyHome:
      "Fitness to fly depends on swelling, hardware stability and cast integrity — not on the implant brand name.",
    drivers: [
      { label: "Wires versus elastic nails versus plates", detail: "Different implant prices and removal plans." },
      { label: "Which bone", detail: "Femur, forearm and elbow are different sittings." },
      { label: "Open versus closed skin", detail: "Changes antibiotics and stay." },
      { label: "Later hardware removal", detail: "A second anaesthetic unless bundled." },
      { label: "Multiple fractures", detail: "Not a single-bone package." },
    ],
    quoteItems: [
      "Which implant family is assumed, and is removal included?",
      "Which bone and laterality are priced?",
    ],
    documents: ["Injury and post-reduction radiographs", "Any prior fixation notes if this is a revision"],
    followUp:
      "Films, cast changes and a scheduled discussion about hardware removal continue after return.",
    related: ["Pediatric Fracture Surgery", "Pediatric Deformity Correction", "Limb Reconstruction Surgery"],
    figureSrc: "/costs/pediatric-fracture-fixation-illustration.webp",
    figureAlt: "Illustration of a child's long-bone fracture held with pins that stop short of the growth plate",
    untaggedCities: ["mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Tendon Repair Surgery",
    shortName: "tendon repair surgery",
    briefName: "Tendon Repair Surgery",
    slug: "tendon-repair-surgery",
    definition:
      "Tendon repair surgery restores a child's cut, ruptured or selectively transferred tendon so that a finger, wrist, ankle or knee can move again. Adult tendon repair remains a different Orthopedics slug.",
    indication:
      "It may be considered after a laceration, a selected sports rupture, or a planned transfer as part of cerebral-palsy or foot reconstruction. Not every tight tendon needs an open repair.",
    nonCandidate:
      "A contracture that still belongs on stretching or botulinum toxin, or an adult hand list, should not use this paediatric label.",
    evaluation:
      "Examination, the mechanism of injury, and sometimes ultrasound or MRI describe which tendon is out. For transfers, gait or hand-function notes belong in the packet.",
    approaches: [
      { label: "Direct repair of a laceration", detail: "Used when the tendon ends can be brought together cleanly." },
      { label: "Graft or delayed reconstruction", detail: "Selected late presentations when a primary repair is no longer honest." },
      { label: "Tendon transfer", detail: "A different reconstructive product used in cerebral palsy or residual foot deformity; it should be named as such." },
    ],
    technique:
      "The surgeon finds the tendon ends, repairs or transfers them with sutures, and protects the repair in a splint. Early protected motion may be part of the protocol.",
    duration: "often 45 minutes to 2.5 hours depending on how many tendons and whether a graft is needed",
    ward:
      "Many children go home the same day or after one paediatric-ward night. The stored stay is [STAY].",
    recovery:
      "Splint time and a hand- or physiotherapy programme determine function. A repair can fail if the child uses the limb too early.",
    implantRehab:
      "The quotation should name which tendons, whether a graft is assumed, the splint, and how many therapy sessions are included. A transfer for cerebral palsy is not a simple laceration package.",
    distinctiveRisks:
      "Consent may address repair rupture, adhesions, infection, stiffness and the possible need for later tenolysis or revision.",
    mobility:
      "A splint changes dressing, school writing or walking depending on the limb. Parents should ask for a written protection plan.",
    flyHome:
      "Fitness to fly depends on the splint, swelling and whether the child can keep the repair protected in a cabin seat.",
    drivers: [
      { label: "Laceration repair versus transfer or graft", detail: "These are different theatre and therapy products." },
      { label: "Number of tendons", detail: "Each additional tendon adds time and splint complexity." },
      { label: "Upper versus lower limb", detail: "Hand therapy and gait therapy are different follow-up lines." },
      { label: "Need for a graft", detail: "Should be named rather than assumed." },
      { label: "Outpatient therapy block", detail: "Often the larger family cost after a short stay." },
    ],
    quoteItems: [
      "Is this priced as a laceration repair or as a planned transfer?",
      "How many therapy sessions are included after the splint?",
    ],
    documents: ["Injury photographs or ultrasound if already obtained", "Prior transfer or cerebral-palsy therapy notes if relevant"],
    followUp:
      "Splint changes and a protected-motion programme continue after return. A local therapist should be named before travel.",
    related: ["Cerebral Palsy Orthopedic Surgery", "Pediatric Foot & Ankle Surgery", "Pediatric Fracture Surgery"],
    figureSrc: "/costs/tendon-repair-surgery-illustration.webp",
    figureAlt: "Illustration of a child's torn tendon beside the same tendon repaired with sutures",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)",
    shortName: "SCFE hip surgery",
    briefName: "SCFE Hip Surgery",
    slug: "scfe-hip-surgery-slipped-capital-femoral-epiphysis",
    definition:
      "SCFE hip surgery pins or reconstructs a slipped capital femoral epiphysis so that a child's femoral head, which has slipped at the growth plate, can be stabilized and, in selected unstable slips, realigned.",
    indication:
      "It may be considered as soon as a slip is diagnosed, including prophylactic pinning of the opposite hip when the treating team already writes that risk. DDH and elective hip reconstruction remain neighbouring products.",
    nonCandidate:
      "A chronic deformity that already belongs on a reconstruction osteotomy after the physis is closed, or an infant DDH list, should not be labelled as acute SCFE pinning.",
    evaluation:
      "Frog-lateral and anteroposterior pelvic radiographs diagnose the slip. Stability, duration and the opposite hip decide urgency. This is often a time-sensitive paediatric list.",
    approaches: [
      { label: "In-situ pinning", detail: "The most commonly discussed method for a stable slip." },
      { label: "Prophylactic pinning of the opposite hip", detail: "Discussed when the team already judges the contralateral risk to be high." },
      { label: "Reduction and reconstruction for selected unstable slips", detail: "A different, higher-risk sitting that should be named rather than assumed inside a pinning package." },
    ],
    technique:
      "The surgeon places one or more screws across the physis to stop further slip. Unstable or severe slips may need a more complex realignment that belongs in a written consent, not a brochure.",
    duration: "often 45 minutes to 3 hours depending on laterality and whether reconstruction is added",
    ward:
      "Children usually recover on a paediatric ward with crutches. Unstable slips may need longer observation.",
    recovery:
      "Protected weight-bearing lasts weeks. The hip is watched for avascular necrosis and for a slip on the other side.",
    implantRehab:
      "The quotation should name laterality, whether the opposite hip is pinned, screw type, and whether a reconstructive osteotomy is assumed. An unstable-slip reconstruction is not a single-screw package.",
    distinctiveRisks:
      "Consent may address avascular necrosis, chondrolysis, further slip, infection, implant prominence, opposite-hip slip and the later need for reconstruction.",
    mobility:
      "Crutches are expected. School transport should stay flexible until weight-bearing is written.",
    flyHome:
      "Fitness to fly depends on pain, crutches and whether an unstable slip has already been reviewed on films.",
    drivers: [
      { label: "Stable versus unstable slip", detail: "Unstable slips change urgency, stay and risk discussion." },
      { label: "Unilateral versus bilateral pinning", detail: "Two hips add implants and often stay." },
      { label: "In-situ pinning versus reconstruction", detail: "A realignment sitting is a different bill." },
      { label: "Prophylactic opposite hip", detail: "Should be priced only if the team already plans it." },
      { label: "Later hardware issues", detail: "Prominence or removal may be a second sitting." },
    ],
    quoteItems: [
      "Is the opposite hip included, and is this in-situ pinning or reconstruction?",
      "Which screw plan is assumed?",
    ],
    documents: ["AP and frog-lateral pelvic radiographs", "Notes on symptom duration and weight-bearing status"],
    followUp:
      "Films of both hips, a protected walking plan and a low threshold to investigate new opposite-hip pain continue after return.",
    related: ["Developmental Dysplasia of Hip Surgery", "Pediatric Hip Reconstruction", "Hip Preservation Surgery"],
    figureSrc: "/costs/scfe-hip-surgery-illustration.webp",
    figureAlt: "Illustration of a child's slipped femoral head beside in-situ pins holding the head on the neck",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai"],
  },
];

export const pediatricOrthopaedicArticles: CostArticle[] = profiles.map(createPedOrthoArticle);

export const pediatricOrthopaedicArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  pediatricOrthopaedicArticles.map((article) => [article.slug, article]),
);
