import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type SpineProfile = {
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
      "Delhi, Gurugram, Noida and Faridabad are separate recovery geographies. A cervical collar or lumbar brace makes cross-NCR taxi time a clinical problem, not a sightseeing choice; name the operating campus before booking a flat.",
    planning:
      "Allow a rest and MRI-review interval after a long-haul arrival. Same-morning fusion, deformity or tumour lists after an overnight flight leave little room for repeat imaging or anaesthetic reassessment.",
    rehab:
      "Winter air quality can limit outdoor walking after lumbar fusion or deformity correction. Plan indoor corridor gait work and wound checks rather than assuming a garden walk is physiotherapy.",
    lodging:
      "Choose a working lift, a firm mattress height the patient can leave without twisting, and space for a companion. A Gurugram apartment is a poor base if the list is in Faridabad or central Delhi.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are divided by the harbour. Peak traffic and monsoon flooding turn a short map distance into a long sit — a poor match after lumbar fusion, ACDF or a brace protocol.",
    planning:
      "Stay on the same side of the harbour as the confirmed campus. Early wound review and brace checks are easier from a nearby serviced stay than from an airport hotel.",
    rehab:
      "Wet floors, stair-only buildings and long skywalks are a poor match for a lumbar or cervical restriction. Ask whether the first outpatient physiotherapy sessions sit on the same side as the ward.",
    lodging:
      "Confirm lift access before booking older walk-ups. Twice-daily harbour crossings for dressing changes add fatigue that is not in the hospital estimate.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport sits north of the city while many hospital districts are south or east. A long transfer in a collar or lumbar brace on the day of discharge is a poor start to protected sitting and walking.",
    planning:
      "Milder weather can make a longer companion stay easier, but climate says nothing about fusion inventory, neuromonitoring, deformity lists or appointment availability.",
    rehab:
      "Book lodging only after the quotation names its campus. Whitefield-to-south-city traffic can erase an afternoon brace or wound slot.",
    lodging:
      "A compact stay near the treating floor matters more than a resort on the airport road. Ask about step-free access and a bathroom the patient can use without rotating the spine.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Airport access can be comparatively direct for several hospital districts, but lodging should still follow the named campus. Heat and humidity affect collar comfort, dressings and outdoor walking tolerance.",
    planning:
      "Patients using Gulf or South-Asian air links should still preserve time for repeat MRI or CT, anaesthetic assessment and a rest interval before any planned spine list.",
    rehab:
      "Indoor physiotherapy and wound checks should be planned rather than assumed as beach-hotel walks. A shorter airport road is not a shorter fusion or decompression pathway.",
    lodging:
      "Air-conditioned rooms, hydration and a same-morning taxi to the campus matter more than sea views. Keep bookings flexible until admission and the first review are written.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of Jubilee Hills, Kondapur and Secunderabad. Those districts are not interchangeable for someone in a brace; choose a serviced stay only after the quotation names its campus.",
    planning:
      "Build airport-transfer time and a rest day into the plan, then remain near the hospital for the first post-discharge review and physiotherapy session.",
    rehab:
      "Summer heat limits safe outdoor walking after fusion or osteotomy. Ask where gait and brace training will actually occur — ward corridor, hospital physio or a hotel room.",
    lodging:
      "HITEC City, Kondapur, Jubilee Hills and Secunderabad are different sitting-time markets. A long airport-to-city run the evening after discharge is rarely compatible with a lumbar or cervical restriction.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band. A named spine team must review MRI, examination and the planned levels before issuing a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Case- and implant-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm the exact procedure, number of levels, implant or cage assumptions, neuromonitoring and whether revision or staged tumour care is included.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Case- and implant-dependent",
    positioning: "Private international hospitals",
    context:
      "International desks may exist, but implant brand, bone-graft source, navigation and outpatient physiotherapy still need a written letter.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Case- and implant-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf patients; specialist, facility, implant and rehabilitation charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Case- and implant-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for an international self-pay estimate tied to the exact spine plan rather than a general “spine package.”",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Case- and implant-dependent",
    positioning: "European elective spine care",
    context:
      "International access, professional billing and post-discharge physiotherapy arrangements vary by centre and should be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Case- and implant-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should verify eligibility, the treating unit and whether imaging, implants and follow-up physiotherapy are separately charged.",
  },
  {
    country: "United States",
    stay: "Case- and implant-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, anesthesia, implant, imaging and rehabilitation may be billed by different entities; [US_COST] is a comparison range, not one bundled quote.",
  },
];

function catalogGapNote(profile: SpineProfile, citySlug: CostCitySlug, city: string): string {
  if (profile.untaggedCities?.includes(citySlug)) {
    return (
      `The current GAF procedure graph does not show a clinician tagged to ${profile.procedure} in ${city}. ` +
      "The city page must leave the doctor and hospital card area empty rather than invent a roster, borrow a neighbouring fusion or decompression tag, or imply that no one in the city ever performs the operation. An empty section is a catalog gap, not a ranking."
    );
  }
  return (
    `Clinician and hospital cards for ${city} appear only when live directory relationships currently tag ${profile.procedure}. ` +
    "An empty section is a catalog fact, not a hidden ranking. Neighbouring procedure tags must not be reused, and placement is not a volume, navigation, robotic-capability or outcome claim."
  );
}

function makeCities(profile: SpineProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gap = catalogGapNote(profile, citySlug, place.city);
    return {
      citySlug,
      ecosystem:
        `${place.city} has spine-surgery listings in the wider GAF directory, but this article does not infer that every listed institution performs ${profile.shortName}. ` +
        "Only dynamically resolved procedure relationships should produce clinician or hospital cards, and a card is not a ranking, volume statement or capability guarantee.",
      logistics: `${place.airport}: ${place.logistics} ${place.rehab}`,
      costNote:
        `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital supplies an itemized case estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Spine Surgeons & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Review levels, implant plan, quote terms and international-patient logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} The [INDIA_COST] figure is a national planning range, not a ${place.city} tariff; levels, approach, implants and hospital terms determine the written estimate.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${place.planning}`,
          `${place.rehab} ${place.lodging}`,
          gap,
          "Send complete MRI or CT files, not screenshots, and any prior operative or implant records before making non-refundable arrangements. A remote opinion may change after examination and repeat imaging.",
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
          "Ask the hospital to identify the spine surgeon, exact campus, planned levels, anaesthesia, implant or graft assumptions, ward nights, neuromonitoring, exclusions and extra-day policy.",
          `Outside the hospital estimate, budget for travel through ${place.airport}, companion lodging close to the campus, local transport that can take a brace or walker, medicines and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send MRI or CT files, neurological notes and current walking or sitting tolerance before booking travel to ${place.city}.`,
          `Arrive with enough time for spine, anaesthetic and physiotherapy review; ${place.planning}`,
          `${place.rehab} Remain close to the hospital after discharge and travel only when the treating team has assessed fitness to fly.`,
        ],
        hospitalDiscussion: [
          gap,
          "Confirm the actual operating campus, implant or cage plan, neuromonitoring, venous-thromboembolism prevention, inpatient physiotherapy and the first post-discharge review in writing. A general spine or accreditation label does not answer those case-specific questions.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored; the final amount follows record review and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} spine surgeons perform ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure should be shown. If no card appears, that is a current catalog gap rather than a hidden list. Verify role, current appointment and operating campus; placement is not a ranking.",
          },
          {
            q: `Which hospital in ${place.city} should a patient choose?`,
            a: "There is no universal best hospital. Compare the named team, exact campus, quote boundaries, implant or level assumptions and continuity of physiotherapy after discharge. This page names no provider.",
          },
          {
            q: `Where should a patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.logistics} Keep bookings flexible until the admission and early review dates are confirmed.`,
          },
          {
            q: "When can the patient fly home?",
            a: profile.flyHome,
          },
        ],
      },
    };
  });
}

function createSpineArticle(profile: SpineProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Surgery, Spine Surgeons & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare the clinical pathway, spinal levels, implant plan, quote checklist, cities and international-patient logistics.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay; a named spine team must determine levels, approach and travel suitability.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} Complete MRI or CT files and the neurological examination matter more than a procedure name written on a travel inquiry.`,
      `${profile.implantRehab} ${profile.mobility}`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep the article synchronized with the cost registry. They are not quotations, outcome forecasts or evidence that a particular centre can accept the case.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored international-patient stay is [STAY], but preoperative optimization, number of levels, implant or graft work, ward course and discharge readiness can make an individual pathway shorter or longer.`,
      `${profile.technique} Commonly discussed pathways include ${approachSummary}. A qualified spine team chooses among them; this page does not recommend an operation.`,
      `${profile.ward} ${profile.recovery} Return flights and sitting times should remain flexible until the patient is examined after treatment.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include the scheduled procedure, professional fees, operating room, anaesthesia and a defined ward allowance. It does not establish what one hospital will charge.`,
      `Clinically important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change in levels, implant, graft or staging is not a cosmetic package upgrade; it may represent a materially different episode of care.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range. Until a verified city figure exists, compare named teams and written inclusions while keeping travel, lodging and outpatient physiotherapy costs separate.",
    ],
    costComponents: [
      {
        label: "Spine specialist review",
        detail: `Neurosurgical or orthopaedic spine review of MRI or CT, examination, previous operations and the indication for ${profile.shortName}.`,
      },
      {
        label: "Preoperative investigations",
        detail: `The baseline work-up follows the case: ${profile.evaluation} Confirm which tests are included and which are conditional.`,
      },
      {
        label: "Operating room, implants, cages and consumables",
        detail:
          "The estimate should state the planned approach, number of levels, screws, rods, cages, artificial discs or cement, bone-graft assumptions, and what happens if the plan changes intraoperatively.",
      },
      {
        label: "Anaesthesia, neuromonitoring and medical optimization",
        detail:
          "Ask whether anaesthesia, neuromonitoring, blood products and medical clearance for comorbidity are included.",
      },
      {
        label: "Ward stay, ICU if required and inpatient physiotherapy",
        detail: `${profile.ward} The quote should specify included ward or high-dependency nights and inpatient physiotherapy rather than relying only on [STAY].`,
      },
      {
        label: "Medicines, VTE prevention and postoperative imaging",
        detail:
          "Confirm routine versus high-cost medicines, clot-prevention protocol, postoperative radiographs or CT and discharge prescriptions.",
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} pathway. Compare levels, approach, implant or graft plan, named campus and clinician, neuromonitoring, ward assumptions, physiotherapy and exclusions line by line. A higher amount does not prove a better outcome.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named specialist assessment",
        detail:
          "A consultation tied to the clinician expected to perform or lead the proposed intervention, where bundled.",
      },
      {
        label: "The written procedure and planned levels",
        detail: `The estimate should use the exact name ${profile.procedure} and identify levels and associated work rather than say only “spine surgery.”`,
      },
      {
        label: "Theatre, anaesthesia and quoted neuromonitoring",
        detail:
          "Professional and facility fees for the scheduled episode, with invasive monitoring stated where relevant.",
      },
      {
        label: "Quoted implants, cages, discs or cement",
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
        label: "Additional MRI, CT or infection work-up",
        detail:
          "Repeat imaging, culture, bone-scan or specialist medical consultations may be additional when indicated.",
      },
      {
        label: "Extra levels or a change from decompression to fusion",
        detail:
          "Work beyond the documented operative plan, including an unplanned fusion or an extra instrumented level, is not automatically bundled.",
      },
      {
        label: "Extended ward, ICU or complication care",
        detail:
          "Extra nights, CSF-leak care, infection treatment, transfusion, medical events or return to theatre generally alter the bill.",
      },
      {
        label: "Later physiotherapy, braces and medicines",
        detail: `${profile.followUp} Confirm what occurs after the first postoperative visit and what can be transferred home.`,
      },
      {
        label: "Travel and companion living costs",
        detail:
          "Flights, visas, accessible lodging, meals, local transport and schedule changes are normally outside the hospital estimate.",
      },
    ],
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} These are clinical pathways, not consumer upgrades.`,
        "The receiving team should explain why its proposed route fits the current anatomy and neurology, and what finding could change that route after arrival.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by anatomy, levels and prior surgery",
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
        `The listed procedural forms are ${approachSummary}. Incision, implants, grafts and associated decompression depend on the patient's anatomy.`,
        `${profile.ward} ${profile.mobility}`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete imaging files rather than screenshots or a one-line report.`,
        "The receiving team sets fasting, medicine and skin-preparation instructions. Report fever, new weakness, saddle numbness, urinary retention, calf pain or a sudden increase in pain promptly; these may alter timing.",
      ],
      recovery: [
        `${profile.ward} ${profile.recovery}`,
        `The catalog's [STAY] is for broad planning, not a discharge promise. Pain control, wound healing, neurology, sitting tolerance and physiotherapy progress can affect the actual stay.`,
        profile.distinctiveRisks,
        `${profile.followUp} Patients need a written handover, emergency contacts and a local spine or physiotherapy plan.`,
        "Seek urgent clinical help for new weakness, saddle numbness, urinary retention, chest pain, shortness of breath, calf swelling, fever, wound leakage or any warning sign specified at discharge.",
      ],
    },
    topicSections: [
      {
        id: "risks",
        heading: `Risks and considerations after ${profile.briefName}`,
        paragraphs: [
          profile.distinctiveRisks,
          "This is not an exhaustive consent list and does not assign likelihood. The treating spine specialist should discuss the risks that apply to the planned levels, approach and medical background.",
          "No page can promise that symptoms will resolve, that fusion will unite, or that a second operation will never be needed.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes much more than the [INDIA_COST] hospital planning band. Add remote MRI review, tests not bundled, companion travel, accessible lodging, local transport, medicines, outpatient physiotherapy and contingency for extra nights.`,
        "Travel should follow a written clinical acceptance and itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and neurology review",
          detail:
            "Share MRI or CT files, current pain and walking status, medicines, prior operations, implant stickers if relevant and the referring clinician's question.",
        },
        {
          label: "Specialist planning",
          detail:
            "Spine, anaesthetic and physiotherapy teams clarify indication, levels, timing, approach and whether commercial travel is appropriate.",
        },
        {
          label: "Itemized estimate and logistics",
          detail:
            "Match the exact procedure to included tests, implants or grafts, ward days, neuromonitoring, physiotherapy, exclusions, escalation rates and companion accommodation.",
        },
        {
          label: "Arrival and reassessment",
          detail:
            "Allow time for examination, repeat imaging, blood tests and anaesthesia review; consent should include alternatives and case-specific uncertainty.",
        },
        {
          label: "Procedure and monitored recovery",
          detail: `${profile.technique} ${profile.ward}`,
        },
        {
          label: "Discharge, nearby review and handover",
          detail: `${profile.recovery} Travel only after review and carry the operative note, implant details, medicine plan and physiotherapy schedule.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete imaging",
        detail:
          "Provide actual MRI or CT files, reports, current neurological status, medicines and all prior operative notes or implant stickers.",
      },
      {
        label: "Confirm clinical acceptance",
        detail:
          "A named spine team reviews diagnosis, urgency, levels, implant or graft needs, travel safety and the likely intervention.",
      },
      {
        label: "Hold a remote discussion",
        detail:
          "Ask why treatment is indicated now, what alternatives exist, what remains uncertain and who will lead care.",
      },
      {
        label: "Compare itemized quotations",
        detail:
          "Use the same operative scope, levels and implant assumptions; do not compare a partial estimate with a comprehensive episode.",
      },
      {
        label: "Plan flexible travel",
        detail:
          "Obtain required documents, refundable flights and accessible lodging near the exact campus, with contingency for a longer stay.",
      },
      {
        label: "Repeat assessment after arrival",
        detail:
          "The patient is examined and undergoes indicated imaging, laboratory and anaesthesia review before final consent.",
      },
      {
        label: "Treatment and ward recovery",
        detail:
          "Care follows the agreed approach, with escalation according to the clinical course rather than package limits.",
      },
      {
        label: "Start physiotherapy and prepare discharge",
        detail:
          "Patients learn wound, medicine, brace or sitting instructions and receive written records.",
      },
      {
        label: "Complete local review",
        detail:
          "Remain nearby until the team reviews recovery and explicitly discusses fitness for travel.",
      },
      {
        label: "Continue care at home",
        detail: `Transfer records to the patient's local clinician. ${profile.followUp}`,
      },
    ],
    documents: [
      ...profile.documents,
      "Recent MRI and any CT already obtained, preferably as complete files rather than phone photographs",
      "Current medication list, allergies and recent laboratory results",
      "All prior spine operative notes, discharge summaries and implant or cage details",
      "Passport and companion documentation required for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official tariffs or evidence of availability.",
      "International comparisons are easily distorted when levels, implant or graft assumptions, ward stay and follow-up physiotherapy differ. Obtain like-for-like written estimates after record review.",
    ],
    destinationNote:
      "All figures are planning information. Currency, diagnosis, spinal level, approach, implant choice, clinical course, hospital terms and length of stay can change the final amount; no row predicts outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] until verified city-level data is stored. Their overlays focus on genuinely different airport, geography, lodging and rehabilitation logistics.",
      "Clinician and hospital cards must resolve dynamically from current data. This module names no provider, makes no robotic-capability, volume or outcome claim and offers no ranking. Several Spine Surgery procedures currently have no tagged doctors in some or all cities — including PLIF, TLIF, ALIF and Spinal Decompression nationally, ACDF, disc replacement and revision lists in Bengaluru, and scoliosis correction outside Delhi NCR. An empty card area is a catalog gap, not a hidden roster.",
    ],
    whyIndia: [
      "Some international patients evaluate India for access to a named spine team and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The key questions are clinical acceptance, the proposed team's relevance to the levels and approach, implant transparency, physiotherapy continuity after return, and fitness to fly. These require direct written confirmation.",
      "No hospital or clinician is described as best. Progressive neurological deficit, an unstable fracture, active infection or a patient who cannot complete the rehabilitation plan may be unsafe to fly, and established funded care near home may be more appropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what alternatives were considered?`,
      "Which imaging or neurological finding drives the plan?",
      "Who will perform the procedure, and at which exact campus?",
      "Does the quotation use the exact treatment name and list the spinal levels?",
      "Which investigations must be repeated after arrival, and are they included?",
      "Which implant, cage, disc, cement or bone-graft assumptions are written?",
      "Is neuromonitoring included, and who interprets it?",
      "How many ward or high-dependency nights and inpatient physiotherapy sessions are included?",
      "What finding could change the approach or add a fusion or extra level?",
      "How are extra nights, CSF-leak care, infection treatment or return to theatre billed?",
      "What room category is quoted, and can a companion remain nearby?",
      "What is the written sitting, brace and venous-thromboembolism plan?",
      "Which discharge medicines, first follow-up and physiotherapy block are included?",
      "When will the team assess fitness to fly, and what follow-up is needed at home?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; levels, implant or graft plan, ward course and hospital terms determine the final amount.`,
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
        q: "Does every patient with this diagnosis need the same procedure?",
        a: `${profile.nonCandidate} Timing and approach require individualized spine review.`,
      },
      {
        q: "What tests are needed before treatment, and does MRI matter?",
        a: profile.evaluation,
      },
      {
        q: "What approaches may be discussed?",
        a: `${profile.technique} Relevant forms include ${approachSummary}; they are selected clinically, not by package price.`,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration} This is an orientation only; extra levels and the patient's condition can extend the episode.`,
      },
      {
        q: "How long is recovery, and what does the stored stay mean?",
        a: `${profile.recovery} The stored stay is [STAY], but discharge and travel dates remain individualized. ${profile.ward}`,
      },
      {
        q: "How much do spinal implants affect the final cost?",
        a: `${profile.implantRehab} ${profile.mobility}`,
      },
      {
        q: "What can make the quotation change?",
        a: `Important drivers include ${profile.drivers
          .map((item) => item.label.toLowerCase())
          .join(", ")}. Ask for each change in writing.`,
      },
      {
        q: "Are complications and extra nights included?",
        a: "Only if the itemized estimate says so. Ask how infection care, CSF-leak management, transfusion, medical events, return to theatre and days beyond the allowance are billed.",
      },
      {
        q: "How should an international patient choose a spine surgeon?",
        a: "Verify the proposed clinician's role, relevance to the levels, exact campus, implant plan, physiotherapy support, communication and handover. Directory placement is not a ranking, and this page names no provider.",
      },
      {
        q: "When can the patient fly home?",
        a: profile.flyHome,
      },
      {
        q: "What follow-up and rehabilitation are required?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `Spine surgeons to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} spine specialists in [CITY]`,
    doctorIntro:
      `Profiles should be pulled dynamically only when ${profile.procedure} appears in the clinician's current procedure relationships. Some Spine Surgery procedures have no tagged doctors in some or all cities; the renderer must leave those sections empty. Verify role, case relevance, availability and campus. Placement is not a ranking, and this article adds no experience, volume, robotic-capability or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships, not names embedded in editorial copy. Accreditation or a general spine label does not prove current case acceptance, implant inventory, navigation systems, volumes or outcomes.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: profile.figureSrc,
        alt: profile.figureAlt,
        caption:
          "A general educational illustration, not the anatomy or recommended treatment of a specific patient.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/costs/spine-treatment-pathway.webp",
        alt: `Illustration of MRI review, surgery, ward recovery and physiotherapy for ${profile.shortName}`,
        caption:
          "Postoperative support and duration depend on the operation and clinical course; this image does not imply an outcome.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/spine-international-journey.webp",
        alt: `International records, travel and follow-up journey for ${profile.shortName}`,
        caption:
          "Clinical acceptance and MRI review come before travel; treatment and fitness to fly are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const ALL_CITIES: CostCitySlug[] = ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"];

const profiles: SpineProfile[] = [
  {
    procedure: "Spinal Fusion",
    shortName: "spinal fusion",
    briefName: "Spinal Fusion",
    slug: "spinal-fusion",
    definition:
      "Spinal fusion joins selected vertebrae so that a painful or unstable motion segment can heal as one bone, usually with screws, rods and a bone graft or cage.",
    indication:
      "Fusion may be considered for selected instability, spondylolisthesis, deformity, recurrent disc disease or after wide decompression when the remaining segment is unlikely to stay stable. Not every painful disc needs a fusion.",
    nonCandidate:
      "Isolated radiculopathy that still belongs on a decompression or disc-replacement sheet, active untreated infection, or a patient who cannot complete the rehabilitation needed for a fusion may defer or preclude the operation.",
    evaluation:
      "MRI maps the neural elements; standing radiographs and often CT or flexion–extension views describe alignment and instability. The actual image files, not a one-line report, decide levels.",
    approaches: [
      { label: "Posterior instrumented fusion", detail: "Screws and rods from the back, with or without an interbody cage; the most commonly discussed adult construct." },
      { label: "Interbody fusion (TLIF, PLIF or ALIF)", detail: "Named corridor products sit on neighbouring sheets when the quote is actually a specific cage approach." },
      { label: "Anterior or combined fusion", detail: "Used when the front corridor or a two-stage plan is the honest reconstruction." },
    ],
    technique:
      "The surgeon prepares the disc space or posterior elements, places instrumentation and graft, and decompresses nerves if that work is part of the same sitting.",
    duration: "often 2–5 hours depending on levels and whether an interbody cage or osteotomy is added",
    ward:
      "Most primary fusions recover on a spine ward with early assisted walking. High-dependency care is reserved for comorbidity, blood loss or unexpected events, not as a brochure upgrade.",
    recovery:
      "Sitting time, brace use and walking distance are written by the operating team. Fusion healing is judged over months, not by a hotel booking.",
    implantRehab:
      "The quotation should name the number of levels, screw–rod system, cage or graft source and whether neuromonitoring belongs in this letter. An extra level is a different bill.",
    distinctiveRisks:
      "Consent may address infection, bleeding, nerve injury, dural tear, non-union, implant loosening, adjacent-segment problems, clot and the possible later need for revision, without generic success rates.",
    mobility:
      "Early walking is common; prolonged sitting, lifting and twisting are usually restricted. The treating team writes the actual sitting and brace plan.",
    flyHome:
      "There is no universal flight day. Fitness to fly depends on the wound, neurology, sitting tolerance, clot-prevention plan and whether a long unsupported sit is acceptable.",
    drivers: [
      { label: "Number of spinal levels", detail: "Each additional instrumented level adds implants, theatre time and often stay." },
      { label: "Cervical versus lumbar construct", detail: "Different implant families, swallowing or sitting restrictions, and physiotherapy protocols." },
      { label: "Cage and bone-graft source", detail: "Autograft harvest, allograft or synthetic substitute are different cost lines." },
      { label: "Primary versus revision fusion", detail: "Hardware removal and scarred corridors belong on the revision sheet when that is the honest product." },
      { label: "Neuromonitoring and blood products", detail: "Should be named rather than assumed inside a generic spine package." },
    ],
    quoteItems: [
      "How many levels are priced, and what is billed if an extra level is required?",
      "Which screw–rod system and cage or graft are assumed?",
    ],
    documents: ["Standing spine radiographs if already obtained", "MRI of the planned region"],
    followUp:
      "Surveillance commonly includes wound review, radiographs of the construct, walking progression and a physiotherapy programme that continues after the first clinic visit.",
    related: ["TLIF (Transforaminal Lumbar Interbody Fusion)", "PLIF (Posterior Lumbar Interbody Fusion)", "ALIF (Anterior Lumbar Interbody Fusion)", "Revision Spine Surgery"],
    figureSrc: "/costs/spinal-fusion-illustration.webp",
    figureAlt: "Illustration of selected vertebrae joined with rods, screws and interbody cages for spinal fusion",
  },
  {
    procedure: "PLIF (Posterior Lumbar Interbody Fusion)",
    shortName: "PLIF",
    briefName: "PLIF",
    slug: "plif-posterior-lumbar-interbody-fusion",
    definition:
      "PLIF reaches the lumbar disc space from the back on both sides so that a cage and graft can sit in the disc space while screws and rods stabilize the same segment.",
    indication:
      "It may be considered when a lumbar segment needs both decompression and interbody support and the team prefers a bilateral posterior corridor. TLIF is a different unilateral product.",
    nonCandidate:
      "A problem that is only a free fragment, or anatomy better served by a transforaminal or anterior corridor, should not be labelled PLIF for convenience.",
    evaluation:
      "Lumbar MRI, standing radiographs and often CT describe disc height, listhesis and canal stenosis. Vascular or anterior anatomy is less central than for ALIF, but nerve-root maps still decide laterality.",
    approaches: [
      { label: "Single-level PLIF", detail: "One disc space with bilateral cages or a single cage according to the team’s construct." },
      { label: "Two-level PLIF", detail: "A different implant and theatre event from a one-level letter." },
      { label: "PLIF with extra posterolateral graft", detail: "Added when the team wants both interbody and posterolateral fusion." },
    ],
    technique:
      "After a posterior exposure the surgeon retracts the thecal sac and roots enough to enter the disc space, places graft and cage, then completes pedicle-screw instrumentation.",
    duration: "often 2.5–5 hours for a primary single level; extra levels and scar from prior surgery extend this",
    ward:
      "Ward recovery resembles other lumbar fusions: assisted walking, sitting limits and wound watch. High-dependency care follows blood loss or comorbidity.",
    recovery:
      "Sitting and lifting restrictions are common for weeks. This page does not promise a return-to-desk date.",
    implantRehab:
      "Name the cage type, graft source, screw–rod system and whether one or two cages per level are assumed. A generic “lumbar fusion” letter is not a PLIF quote.",
    distinctiveRisks:
      "Discussion includes nerve-root stretch from bilateral retraction, dural tear, cage migration, infection, non-union and clot, without a promised fusion rate.",
    mobility:
      "Early walking is usual; prolonged sitting in a car or aircraft is often delayed until the team reviews the wound and neurology.",
    flyHome:
      "A long unsupported sit can be a poor early plan after bilateral disc-space work. The team should clear travel against sitting time and clot risk.",
    drivers: [
      { label: "One versus two cages per level", detail: "Implant lines differ." },
      { label: "Number of lumbar levels", detail: "Two-level PLIF is not two copies of a one-level package." },
      { label: "Prior decompression scar", detail: "Revision corridors add time and may move the case toward the revision sheet." },
      { label: "Graft harvest versus substitute", detail: "Iliac-crest pain and cost sit outside many letters." },
      { label: "Neuromonitoring", detail: "Should be an explicit line when used." },
    ],
    quoteItems: [
      "Is this priced as a single-level PLIF, and how many cages are assumed?",
      "What is billed if the corridor is converted to TLIF or an extra level?",
    ],
    documents: ["Lumbar MRI and standing radiographs", "Prior lumbar operative notes if any"],
    followUp:
      "Radiographs of cage and screw position, wound review and a sitting-progression plan are the usual early aftercare.",
    related: ["TLIF (Transforaminal Lumbar Interbody Fusion)", "ALIF (Anterior Lumbar Interbody Fusion)", "Spinal Fusion", "Revision Spine Surgery"],
    figureSrc: "/costs/plif-illustration.webp",
    figureAlt: "Illustration of a posterior corridor used to place a lumbar interbody cage during PLIF",
    untaggedCities: ALL_CITIES,
  },
  {
    procedure: "TLIF (Transforaminal Lumbar Interbody Fusion)",
    shortName: "TLIF",
    briefName: "TLIF",
    slug: "tlif-transforaminal-lumbar-interbody-fusion",
    definition:
      "TLIF reaches the lumbar disc through a unilateral transforaminal window so that a cage can restore disc height while screws and rods stabilize the segment, usually with less bilateral root retraction than PLIF.",
    indication:
      "It may be considered for selected lumbar instability, listhesis or recurrent disc disease when a unilateral interbody corridor fits the map. It is not a cheaper synonym for every lumbar fusion.",
    nonCandidate:
      "A free fragment that only needs microdiscectomy, or a deformity that already belongs on an osteotomy or ALIF discussion, should not be sold as TLIF.",
    evaluation:
      "MRI, standing films and often CT describe the foramen, disc height and listhesis. The side of the corridor should match the symptomatic root when that is the plan.",
    approaches: [
      { label: "Open TLIF", detail: "A standard posterior window with a unilateral facet resection to enter the disc." },
      { label: "Minimally invasive TLIF", detail: "Tubular or percutaneous screws in selected anatomy; it is an access choice, not a guaranteed faster fusion." },
      { label: "Two-level TLIF", detail: "A different implant and theatre event from a single-level letter." },
    ],
    technique:
      "The surgeon removes enough facet to enter the disc from one side, prepares the endplates, places graft and cage, and completes instrumentation.",
    duration: "often 2–4.5 hours for a primary single level; MIS setup or extra levels extend this",
    ward:
      "Assisted walking usually begins the same or next day. The stored stay is [STAY] and is not shortened automatically by a tubular label.",
    recovery:
      "Sitting limits and a possible brace are protocol-specific. Fusion still takes months.",
    implantRehab:
      "Name the cage, graft, screw system and whether percutaneous instrumentation is assumed. Navigation or robotics, if written, are extra lines — not implied by this sheet.",
    distinctiveRisks:
      "Consent includes nerve-root injury, dural tear, cage subsidence or migration, infection, non-union and clot.",
    mobility:
      "Early walking is common; long sitting is often staged. A minimally invasive skin incision does not erase sitting rules.",
    flyHome:
      "Travel clearance follows wound, neurology, sitting tolerance and clot prevention, not the word “minimally invasive.”",
    drivers: [
      { label: "Open versus tubular access", detail: "Different retractors, imaging and sometimes implants." },
      { label: "Number of levels", detail: "Dominates implant cost." },
      { label: "Navigation or robotics if used", detail: "Must be named; this page does not assume they are present." },
      { label: "Listhesis reduction work", detail: "Extra theatre time and possible high-dependency observation." },
      { label: "Graft source", detail: "Autograft, allograft or substitute should be explicit." },
    ],
    quoteItems: [
      "Is this an open or tubular TLIF, and how many levels are priced?",
      "Is navigation or a robotic system included, or is that a different letter?",
    ],
    documents: ["Lumbar MRI", "Standing radiographs showing listhesis if present"],
    followUp:
      "Cage and screw radiographs, wound review and a staged sitting plan are expected; later imaging watches fusion, not comfort alone.",
    related: ["PLIF (Posterior Lumbar Interbody Fusion)", "ALIF (Anterior Lumbar Interbody Fusion)", "Spinal Fusion", "Microdiscectomy"],
    figureSrc: "/costs/tlif-illustration.webp",
    figureAlt: "Illustration of a unilateral transforaminal corridor used to place a lumbar interbody cage",
    untaggedCities: ALL_CITIES,
  },
  {
    procedure: "ALIF (Anterior Lumbar Interbody Fusion)",
    shortName: "ALIF",
    briefName: "ALIF",
    slug: "alif-anterior-lumbar-interbody-fusion",
    definition:
      "ALIF reaches the lumbar disc from the front, usually through a retroperitoneal window, so that a larger cage can restore disc height and lordosis while the back may or may not receive additional screws.",
    indication:
      "It may be considered when an anterior graft window offers better height or alignment than a posterior cage, often at L4–5 or L5–S1, after counselling about vascular access.",
    nonCandidate:
      "Unsuitable vascular anatomy, prior extensive abdominal surgery, or a problem that only needs a posterior decompression should not be forced into ALIF.",
    evaluation:
      "MRI, standing alignment films and vascular imaging or surgical-access planning are central. The access surgeon, if used, should appear in the plan.",
    approaches: [
      { label: "Stand-alone ALIF", detail: "Anterior cage with integrated fixation when the team judges the segment stable enough." },
      { label: "ALIF plus posterior instrumentation", detail: "A second corridor or a staged sitting; it is two implant events unless the letter bundles them." },
      { label: "Access-surgeon assisted ALIF", detail: "Vascular or general-surgery access should be a named professional line." },
    ],
    technique:
      "Through an anterior or anterolateral incision the great vessels are mobilised, the disc is removed, and a large cage and graft are seated. Posterior screws, if planned, follow.",
    duration: "often 2–5 hours for the anterior sitting; a staged posterior day is a second episode",
    ward:
      "Ileus watch, wound review and assisted walking are common. High-dependency care may follow vascular work or blood loss.",
    recovery:
      "Abdominal precautions join the usual lumbar sitting rules. This is not the same recovery as a posterior-only fusion.",
    implantRehab:
      "Name the stand-alone versus 360-degree plan, cage type, graft and whether an access surgeon is included. A PLIF price is not an ALIF price.",
    distinctiveRisks:
      "Discussion includes vascular injury, retrograde ejaculation in men, ileus, cage subsidence, infection, non-union and the possible need for later posterior revision.",
    mobility:
      "Walking starts as the abdomen and spine allow. Long sitting still needs a written plan.",
    flyHome:
      "Abdominal wound comfort, sitting time and clot prevention matter. A two-stage 360-degree plan rarely flies between stages.",
    drivers: [
      { label: "Access-surgeon fees", detail: "Often a separate professional line." },
      { label: "Stand-alone versus added posterior screws", detail: "Two corridors change implants and stay." },
      { label: "Level (L5–S1 versus L4–5)", detail: "Vascular anatomy and cage inventory differ." },
      { label: "Prior abdominal surgery", detail: "May force a different corridor or add time." },
      { label: "Staged admissions", detail: "Two theatre days are two bills unless bundled." },
    ],
    quoteItems: [
      "Is an access surgeon included, and is posterior instrumentation part of the same letter?",
      "Which cage and graft are assumed at which level?",
    ],
    documents: ["Lumbar MRI and standing alignment films", "Any vascular imaging or prior abdominal operative notes"],
    followUp:
      "Abdominal and spinal wound checks, radiographs of the cage and a bowel-and-sitting plan are the early aftercare.",
    related: ["TLIF (Transforaminal Lumbar Interbody Fusion)", "PLIF (Posterior Lumbar Interbody Fusion)", "Spinal Fusion", "Disc Replacement"],
    figureSrc: "/costs/alif-illustration.webp",
    figureAlt: "Illustration of an anterior corridor used to place a lumbar interbody cage during ALIF",
    untaggedCities: ALL_CITIES,
  },
  {
    procedure: "ACDF (Anterior Cervical Discectomy and Fusion)",
    shortName: "ACDF",
    briefName: "ACDF",
    slug: "acdf-anterior-cervical-discectomy-and-fusion",
    definition:
      "ACDF removes a worn or herniated cervical disc from the front, decompresses the cord or root, and fuses the segment with a graft or cage and usually a plate.",
    indication:
      "It may be considered for cervical radiculopathy or selected myelopathy when a disc or osteophyte compresses neural structures and non-operative care or a motion-preserving option is not the honest plan.",
    nonCandidate:
      "A soft disc that still belongs on a cervical disc-replacement sheet, or myelopathy that needs a posterior decompression, should not be labelled ACDF by default.",
    evaluation:
      "Cervical MRI is central. CT may map osteophytes. Standing radiographs show alignment and any prior fusion. Swallowing history and smoking status change counselling.",
    approaches: [
      { label: "Single-level ACDF", detail: "One disc, graft or cage, and usually a plate." },
      { label: "Two- or three-level ACDF", detail: "A different dysphagia, non-union and implant discussion from a one-level letter." },
      { label: "ACDF versus cervical disc replacement", detail: "Motion-preservation sits on the disc-replacement sheet when anatomy still allows it." },
    ],
    technique:
      "Through a short anterior neck incision the disc is removed, the cord or root is decompressed, and a graft or cage with a plate is placed.",
    duration: "often 1.5–3 hours for one level; each additional level adds time",
    ward:
      "Overnight observation of airway and swallowing is common. The stored stay is [STAY].",
    recovery:
      "A collar, if used, and swallowing advice are protocol-specific. This page does not promise a return-to-desk week.",
    implantRehab:
      "Name the number of levels, cage versus autograft, plate and whether a collar is supplied. An extra level is a different bill.",
    distinctiveRisks:
      "Consent may address swallowing difficulty, hoarseness, airway swelling, non-union, adjacent-segment disease, implant issues, infection and rare neurological worsening.",
    mobility:
      "Walking is usually unrestricted. The restriction is the neck: sudden extension, heavy lifting and, for some protocols, a collar.",
    flyHome:
      "Travel is easier once swallowing, the wound and sitting are reviewed. Cabin bags in overhead bins should be planned with the team.",
    drivers: [
      { label: "Number of cervical levels", detail: "The dominant implant and dysphagia variable." },
      { label: "Cage versus iliac autograft", detail: "Harvest-site pain and cost differ." },
      { label: "Plating system", detail: "Should be named." },
      { label: "Myelopathy versus radiculopathy", detail: "Stay and physiotherapy intensity can differ." },
      { label: "Collar and swallowing support", detail: "Often outside a short surgical letter." },
    ],
    quoteItems: [
      "How many levels are priced, and is a plate included?",
      "Is this still ACDF if inspection favours disc replacement?",
    ],
    documents: ["Cervical MRI", "Cervical radiographs"],
    followUp:
      "Swallowing, wound, collar weaning and radiographs of the construct are the early reviews; later films watch fusion.",
    related: ["Disc Replacement", "Spinal Fusion", "Spinal Decompression", "Revision Spine Surgery"],
    figureSrc: "/costs/acdf-illustration.webp",
    figureAlt: "Illustration of an anterior cervical disc removal and plate-and-graft fusion",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Discectomy",
    shortName: "discectomy",
    briefName: "Discectomy",
    slug: "discectomy",
    definition:
      "Discectomy removes the herniated disc fragment that is compressing a nerve root so that leg or arm pain from that root may ease, without fusing the segment.",
    indication:
      "It may be considered for persistent radiculopathy after a conservative trial, or earlier when weakness, a cauda pattern or intractable pain makes waiting unsafe. Not every MRI bulge needs a fragment removed.",
    nonCandidate:
      "Axial back pain without a matching root, a calcified fragment better served by a different corridor, or a segment that already needs fusion should not be billed as a simple discectomy.",
    evaluation:
      "MRI that matches the painful root is essential. Examination looks for tension signs, weakness and saddle symptoms. Standing films matter if instability is suspected.",
    approaches: [
      { label: "Open lumbar discectomy", detail: "A standard window to retrieve the fragment; microdiscectomy is the smaller-window neighbour." },
      { label: "Cervical discectomy without fusion", detail: "Uncommon as a stand-alone adult product; ACDF or disc replacement are the usual named cervical sheets." },
      { label: "Discectomy with unplanned fusion", detail: "If instability is found, the episode becomes a fusion and should be re-priced." },
    ],
    technique:
      "Through a posterior lumbar window the surgeon retracts the root, removes the offending fragment and inspects the canal. Fusion is not part of this product unless written.",
    duration: "often 45–120 minutes for an isolated lumbar fragment",
    ward:
      "Many patients stay one to three nights. A same-day discharge is not assumed.",
    recovery:
      "Walking starts early. Sitting and lifting limits protect the disc space. Recurrence is discussed without a promised rate.",
    implantRehab:
      "There is typically no fusion implant. Microscope, tubular retractor or extra foraminotomy work should be named if used.",
    distinctiveRisks:
      "Consent includes recurrent herniation, dural tear, infection, nerve-root injury, residual pain and the later need for fusion if the segment becomes unstable.",
    mobility:
      "Walking is encouraged; prolonged sitting is often limited for a period written by the team.",
    flyHome:
      "Short travel may be discussed once wound and neurology are reviewed. Long sits still need clot and sitting advice.",
    drivers: [
      { label: "Open versus microscopic window", detail: "Microdiscectomy is a neighbouring product when that is the honest technique." },
      { label: "Migrated or calcified fragment", detail: "Extra time and a larger window." },
      { label: "Cauda-equina urgency", detail: "Overnight imaging and a less elective list change resources." },
      { label: "Conversion to fusion", detail: "A different sheet and bill." },
      { label: "Physiotherapy after discharge", detail: "Often outside a short stay letter." },
    ],
    quoteItems: [
      "Is this priced as an open discectomy or a microdiscectomy?",
      "What is billed if a fusion is required?",
    ],
    documents: ["Lumbar or cervical MRI matching the symptomatic root", "Note of weakness or bladder symptoms if present"],
    followUp:
      "Wound, neurology and a staged sitting plan are the early aftercare. Recurrent pain needs review rather than an assumed failed operation.",
    related: ["Microdiscectomy", "Spinal Decompression", "Laminectomy", "Spinal Fusion"],
    figureSrc: "/costs/discectomy-illustration.webp",
    figureAlt: "Illustration of a herniated disc fragment compressing a spinal nerve root before removal",
  },
  {
    procedure: "Microdiscectomy",
    shortName: "microdiscectomy",
    briefName: "Microdiscectomy",
    slug: "microdiscectomy",
    definition:
      "Microdiscectomy uses a microscope or high magnification through a smaller window to remove the lumbar fragment that is pinching a nerve root.",
    indication:
      "It may be considered for a matching radiculopathy after conservative care, or sooner when weakness or a cauda pattern appears. It is not a general “clean-up” of a worn disc.",
    nonCandidate:
      "A far-lateral or heavily calcified fragment, or a segment that already needs fusion, may need a different product. Open discectomy remains the neighbour when a larger window is honest.",
    evaluation:
      "MRI that shows the fragment and the painful root is required. Examination confirms tension signs and motor function.",
    approaches: [
      { label: "Standard microscopic lumbar microdiscectomy", detail: "The usual modern fragment-retrieval technique." },
      { label: "Tubular or endoscopic-assisted window", detail: "Selected access variations; they are not automatically cheaper or better." },
      { label: "Revision microdiscectomy", detail: "Scarred corridors are a different theatre event from a first-time letter." },
    ],
    technique:
      "A small posterior incision and a microscope allow the surgeon to retract the root and remove the fragment while preserving as much stable disc as possible.",
    duration: "often 45–90 minutes for an isolated fragment; revision or a migrated fragment takes longer",
    ward:
      "Often one night or a short stay. The stored stay is [STAY].",
    recovery:
      "Walking starts early. Sitting limits remain. A small scar does not mean an unrestricted flight the next day.",
    implantRehab:
      "Ask whether a tubular system or endoscope is assumed. There is usually no cage. A fusion conversion should be priced separately.",
    distinctiveRisks:
      "Recurrent herniation, dural tear, infection, residual numbness and the uncommon need for later fusion should be discussed.",
    mobility:
      "Early walking is typical; sitting and lifting rules still apply.",
    flyHome:
      "Once neurology and the wound are reviewed, short flights may be discussed. Long-haul sitting still needs a written plan.",
    drivers: [
      { label: "First-time versus revision window", detail: "Scar adds time." },
      { label: "Fragment location", detail: "Axillary, migrated or far-lateral fragments change the corridor." },
      { label: "Tubular or endoscopic equipment", detail: "Should be named if billed." },
      { label: "Cauda-equina presentation", detail: "Urgency changes the list and stay." },
      { label: "Outpatient physiotherapy", detail: "Often the largest cost after a short stay." },
    ],
    quoteItems: [
      "Is a microscope or tubular system included?",
      "What is billed if the fragment cannot be reached without a larger open window?",
    ],
    documents: ["Lumbar MRI", "Record of conservative care already tried"],
    followUp:
      "Neurology, wound and sitting advice are reviewed early. Recurrent ipsilateral pain is investigated rather than dismissed.",
    related: ["Discectomy", "Laminectomy", "Spinal Decompression", "TLIF (Transforaminal Lumbar Interbody Fusion)"],
    figureSrc: "/costs/microdiscectomy-illustration.webp",
    figureAlt: "Illustration of a herniated lumbar disc and a magnified window used for microdiscectomy",
  },
  {
    procedure: "Laminectomy",
    shortName: "laminectomy",
    briefName: "Laminectomy",
    slug: "laminectomy",
    definition:
      "Laminectomy removes part or all of the lamina to widen the spinal canal when stenosis is squeezing the nerves, without automatically fusing the segment.",
    indication:
      "It may be considered for neurogenic claudication or radiculopathy from central stenosis after a walking-and-injection trial fails, when imaging matches the symptoms.",
    nonCandidate:
      "Stenosis with clear instability or a deformity that already needs fusion should not be sold as laminectomy-only. Isolated foraminal disease may need a different window.",
    evaluation:
      "MRI describes canal diameter and ligamentum flavum. Standing films look for listhesis. Walking distance history matters as much as the scan.",
    approaches: [
      { label: "Single-level laminectomy", detail: "One lamina and the adjacent flavum." },
      { label: "Multi-level laminectomy", detail: "A different blood-loss and instability discussion." },
      { label: "Laminectomy plus instrumented fusion", detail: "When the team judges the segment will not stay stable; that is a fusion letter." },
    ],
    technique:
      "Through a posterior exposure the surgeon removes lamina and flavum enough to free the thecal sac and roots, taking care of the pars if fusion is not planned.",
    duration: "often 1.5–3.5 hours depending on levels",
    ward:
      "Assisted walking is usual. The stored stay is [STAY]. Unplanned fusion or CSF leak can extend it.",
    recovery:
      "Walking practice is the rehabilitation core. This page does not promise a longer walking distance by a fixed week.",
    implantRehab:
      "A decompression-only letter should say so. If screws are contemplated as a contingency, that conversion price should be written.",
    distinctiveRisks:
      "Consent includes dural tear, infection, residual claudication, iatrogenic instability and the later need for fusion.",
    mobility:
      "Walking is encouraged early. Heavy extension and lifting are often limited.",
    flyHome:
      "Travel follows wound, walking distance and clot advice. A patient who still cannot walk a ward length is not ready for a long-haul airport.",
    drivers: [
      { label: "Number of stenotic levels", detail: "Theatre time and stay scale with levels." },
      { label: "Need to add fusion", detail: "Changes the product entirely." },
      { label: "Prior lumbar surgery", detail: "Scar increases dural-tear risk and time." },
      { label: "CSF-leak repair", detail: "May add flat-bed days." },
      { label: "Walking-support equipment", detail: "A frame or stick may be extra." },
    ],
    quoteItems: [
      "Is this priced as decompression only, and at how many levels?",
      "What is billed if fusion is added for instability?",
    ],
    documents: ["Lumbar MRI", "Standing radiographs if listhesis is suspected"],
    followUp:
      "Walking distance, wound and whether new back pain suggests instability are reviewed; later imaging is selective.",
    related: ["Spinal Decompression", "Microdiscectomy", "Spinal Fusion", "Revision Spine Surgery"],
    figureSrc: "/costs/laminectomy-illustration.webp",
    figureAlt: "Illustration of lamina removal to widen a narrowed spinal canal",
  },
  {
    procedure: "Spinal Decompression",
    shortName: "spinal decompression",
    briefName: "Spinal Decompression",
    slug: "spinal-decompression",
    definition:
      "Spinal decompression is the family of operations that free compressed neural elements — canal, recess or foramen — when the named product is not already a laminectomy, discectomy or fusion.",
    indication:
      "It may be considered for stenosis or root compression that matches examination after non-operative care, when the team has not yet committed to a more specific named sheet.",
    nonCandidate:
      "A quote that is actually a fusion, ACDF or tumour resection should use those sheets. This page is not a synonym for every spine operation.",
    evaluation:
      "MRI or CT that names the compressed structure is required. A request that only says “decompression” is not enough to quote honestly.",
    approaches: [
      { label: "Laminotomy or flavectomy", detail: "A limited window when a full laminectomy is not required." },
      { label: "Foraminotomy", detail: "Frees a specific root in the foramen." },
      { label: "Combined decompression that becomes fusion", detail: "If instability appears, the honest product changes." },
    ],
    technique:
      "The surgeon removes bone or ligament only as needed to free the named neural structure. The exact window should be written before travel.",
    duration: "often 1–3 hours depending on the named window and levels",
    ward:
      "Stay follows the window and any CSF leak. The stored stay is [STAY].",
    recovery:
      "Walking practice and sitting advice follow the levels treated. A generic “decompression package” does not set those rules.",
    implantRehab:
      "Ask whether any implant is contemplated. A decompression-only letter should not hide a cage.",
    distinctiveRisks:
      "Dural tear, residual compression, instability, infection and the need for a more extensive later operation should be discussed.",
    mobility:
      "Walking is usually encouraged; restrictions follow the levels and whether fusion was added.",
    flyHome:
      "Fitness to fly follows neurology, wound and walking, not the word decompression.",
    drivers: [
      { label: "Which structure is decompressed", detail: "Canal, recess and foramen are different windows." },
      { label: "Number of levels", detail: "Should be explicit." },
      { label: "Conversion to a named product", detail: "Laminectomy, discectomy or fusion belong on those sheets." },
      { label: "Prior surgery", detail: "Scar changes time and leak risk." },
      { label: "Physiotherapy after discharge", detail: "Often extra." },
    ],
    quoteItems: [
      "Which exact window and levels are priced?",
      "What is billed if fusion or a full laminectomy is required?",
    ],
    documents: ["MRI naming the compressed structure", "A clinic note stating the mechanical or claudication symptom"],
    followUp:
      "The discharge note should state what was actually decompressed. Rehabilitation follows that finding.",
    related: ["Laminectomy", "Discectomy", "Microdiscectomy", "Spinal Fusion"],
    figureSrc: "/costs/spinal-decompression-illustration.webp",
    figureAlt: "Illustration of a narrowed spinal canal and the concept of freeing compressed nerve elements",
    untaggedCities: ALL_CITIES,
  },
  {
    procedure: "Disc Replacement",
    shortName: "disc replacement",
    briefName: "Disc Replacement",
    slug: "disc-replacement",
    definition:
      "Disc replacement substitutes a worn cervical — or, less often, lumbar — disc with a motion-preserving implant when the facet joints and alignment still allow arthroplasty instead of fusion.",
    indication:
      "It may be considered for selected one- or two-level disc disease with radiculopathy or early myelopathy when motion preservation is still honest. Fusion remains the neighbour when it is not.",
    nonCandidate:
      "Facet arthritis, instability, deformity, infection or a three-level disease pattern usually steers the discussion toward fusion.",
    evaluation:
      "MRI plus CT or radiographs of the facets and alignment are required. Bone quality and prior surgery change candidacy.",
    approaches: [
      { label: "Cervical disc arthroplasty", detail: "The more commonly discussed motion-preserving product." },
      { label: "Lumbar disc arthroplasty", detail: "A smaller, more selected group; anterior access counselling applies." },
      { label: "Conversion to fusion", detail: "Intraoperative findings may make ACDF or lumbar fusion the honest operation." },
    ],
    technique:
      "The disc is removed from the front, the endplates are prepared, and the prosthesis is seated to restore height while allowing motion.",
    duration: "often 1.5–3 hours for a single cervical level",
    ward:
      "Cervical replacements often stay a few nights for airway and swallowing watch. Lumbar replacements follow anterior-access rules.",
    recovery:
      "Motion is the point of the implant, but lifting and sport dates remain individual. This page does not promise a durability advantage over fusion.",
    implantRehab:
      "Name the prosthesis, number of levels and the written conversion plan to fusion. Implant cost can dominate the letter.",
    distinctiveRisks:
      "Consent includes implant wear or migration, heterotopic bone, persistent pain, the later need for fusion, and the usual neural and access risks of the corridor.",
    mobility:
      "Cervical replacements often allow earlier motion than a plated fusion; the team still writes lifting limits.",
    flyHome:
      "Swallowing, wound and sitting rules apply as after other anterior spine work.",
    drivers: [
      { label: "Cervical versus lumbar implant", detail: "Different devices and access teams." },
      { label: "Number of levels", detail: "Two-level arthroplasty is not two cheap copies." },
      { label: "Conversion contingency to fusion", detail: "Should be costed." },
      { label: "Access-surgeon fees for lumbar ADR", detail: "Often separate." },
      { label: "Surveillance imaging", detail: "May sit outside the surgical package." },
    ],
    quoteItems: [
      "Which prosthesis and how many levels are assumed?",
      "What is billed if the facets make fusion more honest?",
    ],
    documents: ["MRI and facet-alignment imaging", "Prior spine operative notes"],
    followUp:
      "Radiographs of implant position, motion counselling and a plan for later review if pain or stiffness returns.",
    related: ["ACDF (Anterior Cervical Discectomy and Fusion)", "ALIF (Anterior Lumbar Interbody Fusion)", "Spinal Fusion", "Discectomy"],
    figureSrc: "/costs/disc-replacement-illustration.webp",
    figureAlt: "Illustration of a worn disc replaced with a motion-preserving artificial disc",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Scoliosis Correction",
    shortName: "scoliosis correction",
    briefName: "Scoliosis Correction",
    slug: "scoliosis-correction",
    definition:
      "Scoliosis correction realigns a curved spine with instrumentation and fusion — and sometimes osteotomies — when the Cobb angle, remaining growth and symptoms make observation or bracing no longer enough.",
    indication:
      "It may be considered for progressive adolescent curves, selected adult degenerative scoliosis, or curves that already impair sitting, breathing or balance after a deformity team reviews films.",
    nonCandidate:
      "A small stable curve, a child who still belongs on a paediatric-orthopaedic growth-friendly list, or a patient who cannot tolerate a long fusion should not be booked from a photograph.",
    evaluation:
      "Standing whole-spine radiographs, bending or traction films, MRI of the neuraxis when indicated, and pulmonary or nutritional review precede any travel plan.",
    approaches: [
      { label: "Posterior instrumented correction", detail: "The usual modern construct with pedicle screws and rods." },
      { label: "Anterior or combined correction", detail: "Selected curve patterns; two corridors change the bill." },
      { label: "Osteotomy-based correction", detail: "Used for stiff adult curves; this overlaps the deformity-correction sheet." },
    ],
    technique:
      "After exposure the surgeon places anchors, performs releases or osteotomies as planned, corrects the curve under neuromonitoring, and grafts the fusion.",
    duration: "often 4–8 hours or longer for stiff multi-level adult curves",
    ward:
      "High-dependency observation, drain care and a longer ward course are commonly discussed. The stored stay is [STAY].",
    recovery:
      "Sitting, walking and brace rules are protocol-specific. Return to school or work is measured in months, not a brochure week.",
    implantRehab:
      "Screw and rod count, osteotomy type, neuromonitoring, blood-management and ICU assumptions should be written. A one-level fusion price is not a scoliosis price.",
    distinctiveRisks:
      "Discussion includes neurological change, infection, blood loss, implant prominence, adding-on or junctional failure, and the possible need for further surgery, without a promised Cobb-angle result.",
    mobility:
      "Walking starts as pain and neurology allow. Long sitting is staged. A child may need a paediatric ward and family lodging.",
    flyHome:
      "Long-haul travel is often deferred until drains are out, haemoglobin is acceptable and the team has reviewed the wound and neurology.",
    drivers: [
      { label: "Curve size and stiffness", detail: "Osteotomies and time scale with stiffness." },
      { label: "Number of instrumented levels", detail: "The dominant implant line." },
      { label: "Adolescent versus adult degenerative curve", detail: "Different medical and ICU resources." },
      { label: "Neuromonitoring and blood management", detail: "Should be explicit." },
      { label: "Paediatric versus adult ward", detail: "Family lodging and stay change." },
    ],
    quoteItems: [
      "How many levels and which osteotomies are assumed?",
      "Is neuromonitoring and a high-dependency night included?",
    ],
    documents: ["Standing whole-spine radiographs", "MRI of the neuraxis if already obtained"],
    followUp:
      "Radiographs of the construct, wound and a long physiotherapy programme are expected; later reviews watch balance and implants.",
    related: ["Spinal Deformity Correction", "Spinal Fusion", "Revision Spine Surgery", "Spinal Tumor Surgery"],
    figureSrc: "/costs/scoliosis-correction-illustration.webp",
    figureAlt: "Illustration of a curved spine and the concept of instrumented scoliosis correction",
    untaggedCities: ["mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Spinal Deformity Correction",
    shortName: "spinal deformity correction",
    briefName: "Spinal Deformity Correction",
    slug: "spinal-deformity-correction",
    definition:
      "Spinal deformity correction addresses kyphosis, sagittal imbalance or a complex curve that is not only a typical scoliotic bend, often with osteotomies, long instrumentation and fusion.",
    indication:
      "It may be considered when stooping, pain, neurological change or sitting imbalance persist after non-operative care and films show a correctable deformity.",
    nonCandidate:
      "A flexible postural kyphosis, or a curve that still belongs on the scoliosis sheet alone, should not be labelled complex deformity for a higher package.",
    evaluation:
      "Standing full-spine films, sagittal parameters, MRI or CT of the apex, bone quality and medical fitness decide osteotomy type.",
    approaches: [
      { label: "Posterior column osteotomy", detail: "For selected flexible kyphosis." },
      { label: "Pedicle-subtraction or three-column osteotomy", detail: "For stiff imbalance; a different blood-loss and neuromonitoring event." },
      { label: "Combined anterior–posterior correction", detail: "Two corridors and often two theatre days." },
    ],
    technique:
      "The surgeon places anchors, performs the planned osteotomy, corrects alignment under neuromonitoring, and grafts a long fusion.",
    duration: "often 5–10 hours depending on osteotomy grade and levels",
    ward:
      "ICU or high-dependency care is more often discussed than after a one-level fusion. The stored stay is [STAY].",
    recovery:
      "Walking and sitting are rebuilt slowly. This page does not promise a restored posture by a calendar date.",
    implantRehab:
      "Osteotomy grade, screw count, cages, neuromonitoring, blood products and ICU nights must be named. A scoliosis letter is not automatically this product.",
    distinctiveRisks:
      "Neurological change, massive blood loss, infection, implant failure, proximal junctional kyphosis and the need for further surgery should be expected topics.",
    mobility:
      "Protected walking is common. A brace, if used, and sitting limits are written after the osteotomy type.",
    flyHome:
      "Long-haul flights are often inappropriate until haemoglobin, wounds and a safe walking distance exist.",
    drivers: [
      { label: "Osteotomy grade", detail: "Three-column work dominates time and blood products." },
      { label: "Instrumented length", detail: "Pelvis-to-upper-thoracic constructs are different inventory." },
      { label: "Combined-stage care", detail: "Two admissions unless bundled." },
      { label: "Bone quality and osteoporosis treatment", detail: "May add medicines and stay." },
      { label: "ICU and transfusion protocol", detail: "Should be explicit." },
    ],
    quoteItems: [
      "Which osteotomy and how many levels are priced?",
      "How many high-dependency nights and blood-product assumptions are included?",
    ],
    documents: ["Standing full-spine radiographs", "CT of the apex if already performed"],
    followUp:
      "Alignment films, wound, haemoglobin and a long physiotherapy programme are expected; junctional problems are watched over years, not days.",
    related: ["Scoliosis Correction", "Spinal Fusion", "Revision Spine Surgery", "Kyphoplasty"],
    figureSrc: "/costs/spinal-deformity-correction-illustration.webp",
    figureAlt: "Illustration of a kyphotic spinal profile and the concept of instrumented deformity correction",
  },
  {
    procedure: "Vertebroplasty",
    shortName: "vertebroplasty",
    briefName: "Vertebroplasty",
    slug: "vertebroplasty",
    definition:
      "Vertebroplasty injects bone cement into a selected vertebral compression fracture to reduce pain when the fracture pattern and MRI timing make cement, rather than a balloon, the planned tool.",
    indication:
      "It may be considered for an osteoporotic or selected pathological compression fracture with persistent pain after a period of rest and analgesia, when MRI shows an acute or subacute fracture and kyphoplasty is not required.",
    nonCandidate:
      "A healed chronic fracture, neurological compression that needs open decompression, or a burst fracture that belongs on a fusion list should not be injected from an X-ray alone.",
    evaluation:
      "MRI dates the fracture and looks for canal compromise. Blood tests and oncology review matter for pathological fractures.",
    approaches: [
      { label: "Single-level vertebroplasty", detail: "One vertebra under image guidance." },
      { label: "Two-level cementation", detail: "A different cement and screening event." },
      { label: "Conversion to kyphoplasty or open fixation", detail: "If height restoration or decompression is needed, the product changes." },
    ],
    technique:
      "Under image guidance needles enter the vertebral body and cement is injected. The patient is observed for cement leak and neurology.",
    duration: "often 30–90 minutes of procedural time",
    ward:
      "Many patients go home the same day or after one night. The stored stay is [STAY].",
    recovery:
      "Walking is usually encouraged the same day. This is not a fusion recovery, but new weakness still needs urgent review.",
    implantRehab:
      "Cement volume and number of levels should be named. There is typically no screw–rod construct on this sheet.",
    distinctiveRisks:
      "Cement leak, embolism, infection, adjacent fracture and failure to relieve pain should be discussed without a promised pain score.",
    mobility:
      "Walking starts as pain allows. Heavy lifting remains limited while osteoporosis treatment is arranged.",
    flyHome:
      "Short travel may be discussed once neurology and the puncture sites are reviewed. Osteoporosis medicines are part of the home plan.",
    drivers: [
      { label: "Number of vertebrae cemented", detail: "Cement and screening time scale." },
      { label: "Pathological versus osteoporotic fracture", detail: "Oncology work-up may be extra." },
      { label: "Need for kyphoplasty instead", detail: "A neighbouring product." },
      { label: "Biopsy at the same sitting", detail: "Should be listed if planned." },
      { label: "Overnight observation", detail: "Confirm the room assumption." },
    ],
    quoteItems: [
      "How many levels are priced, and is biopsy included?",
      "What is billed if kyphoplasty or open fixation is required?",
    ],
    documents: ["MRI of the fracture", "Bone-density or oncology notes if already obtained"],
    followUp:
      "Pain, neurology and a medical plan for bone health are reviewed; new fractures are a separate episode.",
    related: ["Kyphoplasty", "Spinal Tumor Surgery", "Spinal Fusion", "Spinal Deformity Correction"],
    figureSrc: "/costs/vertebroplasty-illustration.webp",
    figureAlt: "Illustration of cement being placed into a collapsed vertebral body",
  },
  {
    procedure: "Kyphoplasty",
    shortName: "kyphoplasty",
    briefName: "Kyphoplasty",
    slug: "kyphoplasty",
    definition:
      "Kyphoplasty uses a balloon to create a cavity in a compressed vertebra, then fills that cavity with cement, when height restoration is part of the planned fracture treatment.",
    indication:
      "It may be considered for selected painful compression fractures when the team wants a cavity before cement, after MRI confirms an acute or subacute lesion and vertebroplasty is not the chosen tool.",
    nonCandidate:
      "A fracture that needs open decompression or fusion, or a chronic healed collapse treated only on a photograph, should not be ballooned as a package.",
    evaluation:
      "MRI ages the fracture. CT may help if canal fragments are suspected. Medical fitness for prone positioning is checked.",
    approaches: [
      { label: "Single-level kyphoplasty", detail: "Balloon then cement in one vertebra." },
      { label: "Bilateral pedicle access", detail: "Two balloons; a different consumable line." },
      { label: "Conversion to open surgery", detail: "If cement or balloon cannot address neurology." },
    ],
    technique:
      "Needles enter the body, balloons are inflated to create a cavity, and cement is placed. Neurology is checked after the procedure.",
    duration: "often 45–120 minutes",
    ward:
      "Day-care or one night is common. The stored stay is [STAY].",
    recovery:
      "Walking usually starts the same day. Height restoration is not guaranteed and is not an outcome promise.",
    implantRehab:
      "Balloon kits and cement volume should be named. They cost more than a simple vertebroplasty letter for a reason.",
    distinctiveRisks:
      "Cement leak, balloon-related fracture, embolism, infection, adjacent fracture and incomplete pain relief should be discussed.",
    mobility:
      "Walking as pain allows; osteoporosis treatment remains part of the episode even if the hospital stay is short.",
    flyHome:
      "Once puncture sites and neurology are reviewed, short travel may be discussed. Long flights still need clot advice.",
    drivers: [
      { label: "Balloon kit and levels", detail: "The main consumable difference from vertebroplasty." },
      { label: "Unipedicular versus bipedicular access", detail: "Two kits change the bill." },
      { label: "Pathological fracture work-up", detail: "Biopsy and oncology review may be extra." },
      { label: "Overnight observation", detail: "Confirm rather than assume day-care." },
      { label: "Later bracing or bone medicines", detail: "Usually outside the procedural letter." },
    ],
    quoteItems: [
      "How many balloon kits and levels are included?",
      "Is this still kyphoplasty if vertebroplasty would suffice?",
    ],
    documents: ["MRI of the compression fracture", "Any CT commenting on canal fragments"],
    followUp:
      "Pain, neurology and bone-health medicines are reviewed. A new fracture is a new episode.",
    related: ["Vertebroplasty", "Spinal Tumor Surgery", "Spinal Fusion", "Spinal Deformity Correction"],
    figureSrc: "/costs/kyphoplasty-illustration.webp",
    figureAlt: "Illustration of a balloon cavity and cement used in kyphoplasty for a compression fracture",
  },
  {
    procedure: "Spinal Tumor Surgery",
    shortName: "spinal tumor surgery",
    briefName: "Spinal Tumor Surgery",
    slug: "spinal-tumor-surgery",
    definition:
      "Spinal tumor surgery decompresses or removes a tumour affecting the vertebra, canal or cord — metastatic or selected primary — when oncology and stability already sit on the same plan.",
    indication:
      "It may be considered for neurological compression, intractable pain, instability or a tissue diagnosis when the tumour board agrees that an operation, not radiation or systemic therapy alone, is the next step.",
    nonCandidate:
      "Widespread disease better served by radiotherapy, or a lesion that only needs biopsy and cement, should not be booked as a resection package from a scan caption.",
    evaluation:
      "MRI of the whole relevant neuraxis, staging CT or PET when metastatic disease is likely, and medical oncology or radiation input precede any travel.",
    approaches: [
      { label: "Decompressive surgery with or without instrumentation", detail: "For metastatic cord compression when the goal is neurology and stability." },
      { label: "Separation surgery before radiotherapy", detail: "A planned limited resection to create a radiation target, not a curative en-bloc promise." },
      { label: "Selected primary-tumour resection", detail: "A different, often longer reconstructive event when oncology supports it." },
    ],
    technique:
      "The corridor follows the tumour. Decompression, biopsy, cement, screws or a cage reconstruction are combined only as the board planned.",
    duration: "often 3–8 hours; en-bloc or combined-stage work is longer",
    ward:
      "High-dependency care, drains and a longer stay are commonly discussed. The stored stay is [STAY].",
    recovery:
      "Neurology, wound and oncology sequencing dominate the calendar. This page does not promise recovery of lost function.",
    implantRehab:
      "Screws, cages, cement, neuromonitoring and whether radiation starts after a wound interval should be written. A fusion letter is not a tumour letter.",
    distinctiveRisks:
      "Neurological worsening, infection, CSF leak, implant failure in poor bone, medical events and the need for further oncology treatment should be discussed honestly.",
    mobility:
      "Walking depends on preoperative neurology and the reconstruction. A brace may be used.",
    flyHome:
      "Travel is often coordinated with oncology appointments. Early long-haul flights after a fresh decompression or reconstruction are frequently inappropriate.",
    drivers: [
      { label: "Metastatic decompression versus primary resection", detail: "Different theatre and ICU resources." },
      { label: "Need for instrumentation", detail: "Poor bone changes implant choice." },
      { label: "Staging investigations", detail: "May be extra after arrival." },
      { label: "Radiation or systemic therapy timing", detail: "Wound intervals affect lodging." },
      { label: "Neuromonitoring and ICU", detail: "Should be explicit." },
    ],
    quoteItems: [
      "Is the goal decompression, separation surgery or a primary resection?",
      "Which implants and how many high-dependency nights are assumed?",
    ],
    documents: ["MRI of the lesion and neuraxis", "Staging studies and oncology notes if already obtained"],
    followUp:
      "Wound, neurology, construct radiographs and a written oncology handover are essential before anyone travels home.",
    related: ["Revision Spine Surgery", "Spinal Fusion", "Kyphoplasty", "Spinal Deformity Correction"],
    figureSrc: "/costs/spinal-tumor-surgery-illustration.webp",
    figureAlt: "Illustration of a spinal tumour near the canal and the concept of surgical decompression",
  },
  {
    procedure: "Revision Spine Surgery",
    shortName: "revision spine surgery",
    briefName: "Revision Spine Surgery",
    slug: "revision-spine-surgery",
    definition:
      "Revision spine surgery re-operates on a previously treated segment to address failed fusion, loose or broken implants, recurrent compression, infection or adjacent-segment problems.",
    indication:
      "It may be considered when imaging and examination show a defined failure mode and non-operative care cannot restore a stable, decompressed spine. Unexplained pain after a technically intact construct is not automatically a revision indication.",
    nonCandidate:
      "A first-time fusion, or an infection plan that has not yet identified the organism, may defer surgery. Neighbouring primary sheets remain the correct product when no prior implant exists.",
    evaluation:
      "Serial radiographs, CT for fusion and screw position, MRI or contrast studies for infection or recurrent stenosis, and prior operative notes plus implant stickers are required.",
    approaches: [
      { label: "Hardware revision and re-fusion", detail: "Remove or extend implants and add graft when non-union is the working diagnosis." },
      { label: "Decompression of adjacent or residual stenosis", detail: "May or may not add levels of fusion." },
      { label: "Staged infection treatment", detail: "Debridement, cultures and later reconstruction are two episodes." },
    ],
    technique:
      "Scarred corridors are reopened, implants are removed or extended, and the new construct matches the failure mode. Scope ranges from a single screw to a long deformity revision.",
    duration: "often 3–8 hours; infection staging or osteotomy work is longer",
    ward:
      "High-dependency observation and a longer stay are more often discussed than after a primary one-level fusion. The stored stay is [STAY].",
    recovery:
      "Walking and sitting limits follow the new construct. This is not a longer version of the first operation’s brochure.",
    implantRehab:
      "The letter must name what is being removed, what is being added, graft source, and whether a spacer or staged infection admission is priced separately.",
    distinctiveRisks:
      "Recurrent non-union, infection, dural tear in scar, neurological change, implant failure and the need for further revision should be expected topics.",
    mobility:
      "Restrictions are often stricter than after the index operation. A brace may be used.",
    flyHome:
      "Staged infection care and low haemoglobin make early long-haul flights inappropriate until wounds and walking are reviewed.",
    drivers: [
      { label: "Cause of failure", detail: "Non-union, infection and adjacent stenosis are different investigations." },
      { label: "Single-stage versus two-stage infection care", detail: "Two admissions unless bundled." },
      { label: "Extent of new instrumentation", detail: "Extending to the pelvis or occiput changes inventory." },
      { label: "Prior implant extraction time", detail: "Broken screws add theatre hours." },
      { label: "CSF-leak risk in scar", detail: "May add flat-bed days." },
    ],
    quoteItems: [
      "Is this priced as a single stage or an infection spacer stage?",
      "Which implants are being removed and which new construct is assumed?",
    ],
    documents: ["Prior operative notes and implant stickers", "Serial radiographs, CT and any infection markers"],
    followUp:
      "Longer radiographic surveillance, infection markers when relevant, and a lower threshold to investigate new drainage or weakness are expected.",
    related: ["Spinal Fusion", "Scoliosis Correction", "Spinal Deformity Correction", "Spinal Tumor Surgery"],
    figureSrc: "/costs/revision-spine-surgery-illustration.webp",
    figureAlt: "Illustration of failed spinal hardware being exchanged for a revision construct",
    untaggedCities: ["bengaluru"],
  },
];

export const spineSurgeryArticles: CostArticle[] = profiles.map(createSpineArticle);

export const spineSurgeryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  spineSurgeryArticles.map((article) => [article.slug, article]),
);

