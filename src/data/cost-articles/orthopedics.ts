import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type OrthoProfile = {
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
  weightBearing: string;
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
      "Delhi NCR spans Delhi, Gurugram, Noida and Faridabad. Confirm the exact operating campus before choosing accommodation: a Gurugram apartment is a poor base for daily physiotherapy if the list is in Noida or Faridabad, and cross-region traffic can make walker or crutch transfers impractical.",
    planning:
      "An international patient should allow a rest and assessment interval after a long-haul arrival rather than scheduling arthroplasty, ligament reconstruction or open fracture work the morning after an overnight flight.",
    rehab:
      "Winter air quality can limit outdoor walking practice after joint replacement or ligament surgery; summer heat raises hydration and wound-care needs. Plan indoor corridor or hotel-level gait work until the treating team clears outdoor walking.",
    lodging:
      "Choose step-free access, a working lift, a shower that can take a stool if needed, and space for a walker. Cross-NCR taxi time is not a substitute for living near the treating floor during the first post-discharge week.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are separated accommodation markets divided by the harbour. Stay on the same side as the confirmed campus, allow for peak-hour transfers, and add monsoon travel slack when wet roads and flooded approaches matter to someone on crutches.",
    planning:
      "A map distance can understate travel time. Early wound review and physiotherapy are easier from lodging close to the treating campus rather than from an airport-area hotel.",
    rehab:
      "Monsoon wet floors, stair-only buildings and long skywalks are a poor match for a walker or non-weight-bearing plan. Ask whether the first outpatient physiotherapy sessions are on the same side of the harbour as the ward.",
    lodging:
      "Confirm lift access in older walk-up buildings before booking. Harbour crossings twice a day for dressing changes or physio add fatigue that is not part of the hospital estimate.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport lies north of Bengaluru while many hospital districts are south or east. Do not reserve an airport-area hotel as a recovery base until the treating campus is confirmed; road transfers may be lengthy for a freshly operated hip, knee or ankle.",
    planning:
      "Milder weather can simplify outdoor gait practice and a longer companion stay, but climate says nothing about arthroplasty, sports or trauma capability or appointment availability.",
    rehab:
      "A long airport-to-south-city transfer on the day of discharge is a poor start to protected weight-bearing. Book lodging after the quotation names its campus, then remain nearby for the first physiotherapy block.",
    lodging:
      "Traffic between Whitefield, the south-city hospital belt and the airport can erase an afternoon physio slot. A compact stay near the ward matters more than a resort on the airport road.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Airport access can be comparatively direct for several hospital districts, but lodging should still follow the confirmed campus. Air-conditioned accommodation, hydration and reduced midday outdoor exposure matter during hotter, more humid months.",
    planning:
      "Patients using regional Gulf or South-Asian air links should still preserve time for repeat imaging, anaesthetic assessment and a rest interval before any planned procedure.",
    rehab:
      "Heat and humidity affect dressings, swelling and outdoor walking tolerance after arthroplasty or tendon repair. Indoor physiotherapy and wound checks should be planned rather than assumed as beach-hotel walks.",
    lodging:
      "A shorter airport road is not a shorter clinical pathway. Stay close enough for a same-morning dressing or physio visit without a long exposed walk in heat.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of the main hospital districts, including Jubilee Hills, Kondapur and Secunderabad. Those areas are not interchangeable for someone on crutches; choose a serviced stay only after the quotation names its campus.",
    planning:
      "Build airport-transfer time and a rest day into the plan, then remain near the hospital for the first post-discharge review and physiotherapy session.",
    rehab:
      "Summer heat limits safe outdoor walking practice. Ask where gait training will actually occur — ward corridor, hospital physio department or a hotel room — rather than assuming lake-side walks are the rehab plan.",
    lodging:
      "HITEC City, Kondapur, Jubilee Hills and Secunderabad are different crutch-distance markets. A long airport-to-city run the evening after discharge is rarely compatible with protected weight-bearing.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band; a named orthopaedic team must review imaging and examination findings before issuing a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Case- and implant-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm the exact procedure, implant or graft assumptions, physiotherapy allowance and whether revision or staged trauma care is included.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Case- and implant-dependent",
    positioning: "Private international hospitals",
    context:
      "International coordination may be available, but implant brand, bearing, graft source and rehabilitation support require written confirmation.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Case- and implant-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf patients; specialist, facility, implant and outpatient physiotherapy charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Case- and implant-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for an international self-pay estimate tied to the exact orthopaedic plan rather than a general joint or sports package.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Case- and implant-dependent",
    positioning: "European elective orthopaedic care",
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

function catalogGapNote(profile: OrthoProfile, citySlug: CostCitySlug, city: string): string {
  if (profile.untaggedCities?.includes(citySlug)) {
    return (
      `The current GAF procedure graph does not show a clinician tagged to ${profile.procedure} in ${city}. ` +
      "The city page must leave the doctor and hospital card area empty rather than invent a roster, borrow a neighbouring procedure tag, or imply that no one in the city ever performs the operation. An empty section is a catalog gap, not a ranking."
    );
  }
  return (
    `Clinician and hospital cards for ${city} appear only when live directory relationships currently tag ${profile.procedure}. ` +
    "An empty section is a catalog fact, not a hidden ranking. Neighbouring procedure tags must not be reused, and placement is not a volume, robotic-capability or outcome claim."
  );
}

function makeCities(profile: OrthoProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gap = catalogGapNote(profile, citySlug, place.city);
    return {
      citySlug,
      ecosystem:
        `${place.city} has orthopaedic listings in the wider GAF directory, but this article does not infer that every listed institution performs ${profile.shortName}. ` +
        "Only dynamically resolved procedure relationships should produce clinician or hospital cards, and a card is not a ranking, volume statement or capability guarantee.",
      logistics: `${place.airport}: ${place.logistics} ${place.rehab}`,
      costNote:
        `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital supplies an itemized case estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Doctors & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Review clinical pathway, quote terms and international-patient logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} The [INDIA_COST] figure is a national planning range, not a ${place.city} tariff; anatomy, implant or graft plan, rehabilitation needs and hospital terms determine the written estimate.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${place.planning}`,
          `${place.rehab} ${place.lodging}`,
          gap,
          "Send actual radiographs or MRI files and prior operative or implant records before making non-refundable arrangements. A remote opinion may change after examination and repeat imaging.",
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
          "Ask the hospital to identify the surgeon, exact campus, planned operation, anaesthesia, implant or graft assumptions, ward nights, inpatient physiotherapy, exclusions and extra-day policy.",
          `Outside the hospital estimate, budget for travel through ${place.airport}, companion lodging close to the campus, local transport that can take a walker or crutches, medicines and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send imaging, clinical notes and the current walking or weight-bearing status before booking travel to ${place.city}.`,
          `Arrive with enough time for orthopaedic, anaesthetic and physiotherapy review; ${place.planning}`,
          `${place.rehab} Remain close to the hospital after discharge and travel only when the treating team has assessed fitness to fly.`,
        ],
        hospitalDiscussion: [
          gap,
          "Confirm the actual operating campus, implant or graft plan, venous-thromboembolism prevention, inpatient physiotherapy and the first post-discharge review in writing. A general orthopaedic or accreditation label does not answer those case-specific questions.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored; the final amount follows record review and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} doctors perform ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure should be shown. If no card appears, that is a current catalog gap rather than a hidden list. Verify role, current appointment and operating campus; placement is not a ranking.",
          },
          {
            q: `Which hospital in ${place.city} should a patient choose?`,
            a: "There is no universal best hospital. Compare the named team, exact campus, quote boundaries, implant or graft assumptions and continuity of physiotherapy after discharge. This page names no provider.",
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

function createOrthopedicsArticle(profile: OrthoProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-11",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Surgery, Doctors & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare the clinical pathway, implant or graft plan, quote checklist, cities and international-patient logistics.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay; the treating orthopaedic team must determine timing, approach and travel suitability.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} The actual image files and examination findings matter more than a procedure name written on a travel inquiry.`,
      `${profile.implantRehab} ${profile.weightBearing}`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep the article synchronized with the cost registry. They are not quotations, outcome forecasts or evidence that a particular centre can accept the case.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored international-patient stay is [STAY], but preoperative optimization, implant or graft work, ward course and discharge readiness can make an individual pathway shorter or longer.`,
      `${profile.technique} Commonly discussed pathways include ${approachSummary}. A qualified orthopaedic team chooses among them; this page does not recommend an operation.`,
      `${profile.ward} ${profile.recovery} Return flights and activity dates should remain flexible until the patient is examined after treatment.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include the scheduled procedure, professional fees, operating room, anaesthesia and a defined ward allowance. It does not establish what one hospital will charge.`,
      `Clinically important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change in implant, graft, staging or planned work is not a cosmetic package upgrade; it may represent a materially different episode of care.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range. Until a verified city figure exists, compare named teams and written inclusions while keeping travel, lodging and outpatient physiotherapy costs separate.",
    ],
    costComponents: [
      {
        label: "Orthopaedic review",
        detail:
          `Specialist review of imaging, examination, previous operations and the indication for ${profile.shortName}.`,
      },
      {
        label: "Preoperative investigations",
        detail:
          `The baseline work-up follows the case: ${profile.evaluation} Confirm which tests are included and which are conditional.`,
      },
      {
        label: "Operating room, implants, grafts and consumables",
        detail:
          "The estimate should state the planned approach, implant or graft assumptions where relevant, hardware or suture anchors, and what happens if the plan changes intraoperatively.",
      },
      {
        label: "Anaesthesia and medical optimization",
        detail:
          "Ask whether anaesthesia, nerve-block catheters, blood products and medical clearance for comorbidity are included.",
      },
      {
        label: "Ward stay and inpatient physiotherapy",
        detail:
          `${profile.ward} The quote should specify included ward or high-dependency nights and inpatient physiotherapy sessions rather than relying only on [STAY].`,
      },
      {
        label: "Medicines, VTE prevention and imaging",
        detail:
          "Confirm routine versus high-cost medicines, clot-prevention protocol, postoperative radiographs and discharge prescriptions, including a period of anticoagulation if used.",
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} pathway. Compare anatomy, operative scope, implant or graft plan, named campus and clinician, anaesthesia, ward assumptions, physiotherapy and exclusions line by line. A higher amount does not prove a better outcome.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named specialist assessment",
        detail:
          "A consultation tied to the clinician expected to perform or lead the proposed intervention, where bundled.",
      },
      {
        label: "The written procedure and planned variations",
        detail:
          `The estimate should use the exact name ${profile.procedure} and identify associated work rather than say only “orthopaedic surgery.”`,
      },
      {
        label: "Theatre and anaesthesia",
        detail:
          "Professional and facility fees for the scheduled episode, with nerve blockade or invasive monitoring stated where relevant.",
      },
      {
        label: "Quoted implant, graft or hardware",
        detail:
          `${profile.implantRehab} Only items named in the letter are included.`,
      },
      {
        label: "Quoted ward allowance and inpatient physiotherapy",
        detail:
          "Room category and included ward or high-dependency days; [STAY] is a trip-planning token, not an inclusion promise.",
      },
    ],
    exclusions: [
      {
        label: "Additional imaging or infection work-up",
        detail:
          "Repeat MRI, CT, aspiration, culture, bone-scan or specialist medical consultations may be additional when indicated.",
      },
      {
        label: "Associated or revised procedures",
        detail:
          "Work beyond the documented operative plan, including conversion from partial to total replacement or from repair to reconstruction, is not automatically bundled.",
      },
      {
        label: "Extended ward, ICU or complication care",
        detail:
          "Extra nights, infection treatment, transfusion, medical events or return to theatre generally alter the bill.",
      },
      {
        label: "Later physiotherapy, implants and medicines",
        detail:
          `${profile.followUp} Confirm what occurs after the first postoperative visit and what can be transferred home.`,
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
        "The receiving team should explain why its proposed route fits the current anatomy and function, and what finding could change that route after arrival.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by anatomy, tissue quality and prior surgery",
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
        `The listed procedural forms are ${approachSummary}. Incision, implants, grafts, fixation and associated repairs depend on the patient's anatomy.`,
        `${profile.ward} ${profile.weightBearing}`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete records rather than screenshots or a one-line report.`,
        "The receiving team sets fasting, medicine and skin-preparation instructions. Report fever, dental or urinary infection, calf pain, a sudden increase in joint swelling or a change in walking ability promptly; these may alter timing.",
      ],
      recovery: [
        `${profile.ward} ${profile.recovery}`,
        `The catalog's [STAY] is for broad planning, not a discharge promise. Pain control, wound healing, haemoglobin, walking distance and physiotherapy progress can affect the actual stay.`,
        profile.distinctiveRisks,
        `${profile.followUp} Patients need a written handover, emergency contacts and a local orthopaedic or physiotherapy plan.`,
        "Seek urgent clinical help for chest pain, shortness of breath, calf swelling, fever, wound leakage, sudden giving-way, new numbness or any warning sign specified at discharge.",
      ],
    },
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes much more than the [INDIA_COST] hospital planning band. Add remote review, tests not bundled, companion travel, accessible lodging, local transport, medicines, outpatient physiotherapy and contingency for extra nights.`,
        "Travel should follow a written clinical acceptance and itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and function review",
          detail:
            "Share imaging, current symptoms, walking or weight-bearing status, medicines, prior operations, implant stickers if relevant and the referring clinician's question.",
        },
        {
          label: "Specialist planning",
          detail:
            "Orthopaedic, anaesthetic and physiotherapy teams clarify indication, timing, approach and whether commercial travel is appropriate.",
        },
        {
          label: "Itemized estimate and logistics",
          detail:
            "Match the exact procedure to included tests, implants or grafts, ward days, physiotherapy, exclusions, escalation rates and companion accommodation.",
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
          detail:
            `${profile.recovery} Travel only after review and carry the operative note, implant or graft details, medicine plan and physiotherapy schedule.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete records",
        detail:
          "Provide actual imaging, reports, current walking status, medicines and all prior operative notes or implant stickers.",
      },
      {
        label: "Confirm clinical acceptance",
        detail:
          "A named orthopaedic team reviews diagnosis, urgency, implant or graft needs, travel safety and the likely intervention.",
      },
      {
        label: "Hold a remote discussion",
        detail:
          "Ask why treatment is indicated now, what alternatives exist, what remains uncertain and who will lead care.",
      },
      {
        label: "Compare itemized quotations",
        detail:
          "Use the same operative scope and implant assumptions; do not compare a partial estimate with a comprehensive episode.",
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
          "Patients learn wound, medicine, weight-bearing and warning-sign instructions and receive written records.",
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
      "Recent radiographs and any MRI, CT or ultrasound already obtained, preferably as complete files rather than phone photographs",
      "Current medication list, allergies and recent laboratory results, including infection markers when revision or non-union is discussed",
      "All prior orthopaedic operative notes, discharge summaries and implant or graft details",
      "Passport and companion documentation required for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official tariffs or evidence of availability.",
      "International comparisons are easily distorted when operative scope, implant or graft assumptions, ward stay and follow-up physiotherapy differ. Obtain like-for-like written estimates after record review.",
    ],
    destinationNote:
      "All figures are planning information. Currency, anatomy, implant choice, clinical course, hospital terms and length of stay can change the final amount; no row predicts outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] until verified city-level data is stored. Their overlays focus on genuinely different airport, geography, lodging and rehabilitation logistics.",
      "Clinician and hospital cards must resolve dynamically from current data. This module names no provider, makes no robotic-capability, volume or outcome claim and offers no ranking. Several Orthopedics procedures currently have no tagged doctors in some cities — including ORIF outside Delhi NCR and selected robotic knee, PCL, carpal-tunnel, hand-reconstruction, ankle-replacement, bunion and Achilles lists. An empty card area is a catalog gap, not a hidden roster.",
    ],
    whyIndia: [
      "Some international patients evaluate India for access to a named orthopaedic team and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The key questions are clinical acceptance, the proposed team's relevance to the anatomy, implant or graft transparency, physiotherapy continuity after return, and fitness to fly. These require direct written confirmation.",
      "No hospital or clinician is described as best. An unstable fracture, active joint infection or a patient who cannot complete the rehabilitation plan may be unsafe to fly, and established funded care near home may be more appropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what alternatives were considered?`,
      "Which imaging or examination finding drives the plan?",
      "Who will perform the procedure, and at which exact campus?",
      "Does the quotation use the exact treatment name and list associated work?",
      "Which investigations must be repeated after arrival, and are they included?",
      "Which implant, graft, hardware or suture-anchor assumptions are written?",
      "How many ward or high-dependency nights and inpatient physiotherapy sessions are included?",
      "What finding could change the approach or require an additional procedure?",
      "How are extra nights, infection care, transfusion or return to theatre billed?",
      "What room category is quoted, and can a companion remain nearby?",
      "What is the written weight-bearing and venous-thromboembolism plan?",
      "Which discharge medicines, first follow-up and physiotherapy block are included?",
      "When will the team assess fitness to fly, and what follow-up is needed at home?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; anatomy, implant or graft plan, ward course and hospital terms determine the final amount.`,
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
        a: `${profile.nonCandidate} Timing and approach require individualized orthopaedic review.`,
      },
      {
        q: "What tests are needed before treatment?",
        a: profile.evaluation,
      },
      {
        q: "What approaches may be discussed?",
        a: `${profile.technique} Relevant forms include ${approachSummary}; they are selected clinically, not by package price.`,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration} This is an orientation only; associated work and the patient's condition can extend the episode.`,
      },
      {
        q: "How long is recovery, and what does the stored stay mean?",
        a: `${profile.recovery} The stored stay is [STAY], but discharge and travel dates remain individualized. ${profile.ward}`,
      },
      {
        q: "What implant, graft or rehabilitation details should the quote state?",
        a: `${profile.implantRehab} ${profile.weightBearing}`,
      },
      {
        q: "What can make the quotation change?",
        a: `Important drivers include ${profile.drivers
          .map((item) => item.label.toLowerCase())
          .join(", ")}. Ask for each change in writing.`,
      },
      {
        q: "Are complications and extra nights included?",
        a: "Only if the itemized estimate says so. Ask how infection care, transfusion, medical events, return to theatre and days beyond the allowance are billed.",
      },
      {
        q: "How should an international patient choose a team?",
        a: "Verify the proposed clinician's role, relevance to the anatomy, exact campus, implant or graft plan, physiotherapy support, communication and handover. Directory placement is not a ranking, and this page names no provider.",
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
    doctorHeading: `Doctors to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} Doctors in [CITY]`,
    doctorIntro:
      `Profiles should be pulled dynamically only when ${profile.procedure} appears in the clinician's current procedure relationships. Some Orthopedics procedures have no tagged doctors in some cities; the renderer must leave those sections empty. Verify role, case relevance, availability and campus. Placement is not a ranking, and this article adds no experience, volume, robotic-capability or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships, not names embedded in editorial copy. Accreditation or a general orthopaedic label does not prove current case acceptance, implant inventory, robotic systems, volumes or outcomes.",
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
        src: "/costs/orthopedic-treatment-pathway.webp",
        alt: `Illustration of evaluation, surgery, ward recovery and physiotherapy for ${profile.shortName}`,
        caption:
          "Postoperative support and duration depend on the operation and clinical course; this image does not imply an outcome.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/orthopedic-international-journey.webp",
        alt: `International records, travel and follow-up journey for ${profile.shortName}`,
        caption:
          "Clinical acceptance and records review come before travel; treatment and fitness to fly are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const profiles: OrthoProfile[] = [
  {
    procedure: "Total Knee Replacement",
    shortName: "total knee replacement",
    briefName: "Total Knee Replacement",
    slug: "total-knee-replacement",
    definition:
      "Total knee replacement resurfaces the worn femoral, tibial and usually patellar joint surfaces with a prosthesis when arthritis or another destructive process has exhausted reliable joint-preserving care.",
    indication:
      "Replacement may be considered for end-stage osteoarthritis, selected inflammatory arthritis or osteonecrosis when pain and function remain unacceptable after physiotherapy, activity change, medicines and, where relevant, injections. Standing alignment and the state of all three compartments matter.",
    nonCandidate:
      "Active infection, untreated severe vascular disease, a knee that still has a durable non-arthroplasty option, or a patient who cannot complete the rehabilitation needed for a replacement may defer or preclude the operation. Partial replacement is a different product when only one compartment is honest.",
    evaluation:
      "Standing alignment radiographs and patellofemoral views are central. Infection blood tests are relevant after prior surgery. MRI is not always required once bone-on-bone arthritis is clear; medical fitness, BMI and limb alignment still change the written plan.",
    approaches: [
      { label: "Cemented primary replacement", detail: "The most commonly discussed primary construct when bone quality supports cement fixation of the tibial and femoral components." },
      { label: "Uncemented or hybrid fixation", detail: "Selected for particular bone quality and implant systems; it is a fixation choice, not a higher-outcome package." },
      { label: "Constrained or stemmed primary", detail: "Used when ligaments or bone are deficient at first replacement; this is still not revision of a failed implant." },
    ],
    technique:
      "The surgeon prepares the distal femur and proximal tibia, balances the soft tissues and seats the components; the patella may be resurfaced according to wear and tracking.",
    duration: "often 1–2 hours for a straightforward primary; deformity, stiffness or extra hardware extends theatre time",
    ward:
      "Most primaries recover on an orthopaedic ward with early mobilisation. High-dependency care is reserved for comorbidity or unexpected events, not as a brochure upgrade.",
    recovery:
      "Walking with support usually begins the same or next day. Independent walking, stair practice and travel dates remain individual rather than a package promise.",
    implantRehab:
      "The quotation should name constraint, bearing couple, cement plan and whether computer navigation belongs in this letter. A robotic system, if written, is a different catalog product and not an unstated upgrade of this sheet.",
    distinctiveRisks:
      "Consent may address infection, clot, stiffness, instability, fracture, neurovascular injury, persistent pain and later loosening or revision without assigning generic success rates.",
    weightBearing:
      "Many modern primaries allow early weight-bearing as pain allows; the treating team writes the actual restriction, walking aid and stair plan.",
    flyHome:
      "There is no universal flight day. Fitness to fly depends on the wound, haemoglobin, clot-prevention plan, walking distance and flexion, not a brochure date.",
    drivers: [
      { label: "Deformity and bone loss", detail: "Fixed varus, valgus or flexion contracture can require extra releases, stems or constrained inserts." },
      { label: "Implant constraint and bearing", detail: "Cruciate-retaining, posterior-stabilised and constrained designs are priced and unit-stocked differently." },
      { label: "Laterality and staging", detail: "Bilateral replacement in one or two admissions is a different episode from a single knee." },
      { label: "Medical comorbidity", detail: "Anaemia, diabetes, cardiac or renal disease can add clearance, high-dependency nights and medicines." },
      { label: "Inpatient physiotherapy intensity", detail: "Daily gait training and a continuous-passive-motion device, if used, should be named rather than assumed." },
    ],
    quoteItems: [
      "Is the letter written for a cemented primary, and which insert constraint is assumed?",
      "If both knees are symptomatic, is one or two admissions being priced?",
    ],
    documents: ["Standing long-leg or alignment radiographs if already obtained", "Records of injections, arthroscopy or osteotomy"],
    followUp:
      "Surveillance commonly includes wound review, radiographs, walking progression and a physiotherapy programme that continues after the first clinic visit; implant-specific advice is written by the operating team.",
    related: ["Robotic Knee Replacement", "Partial Knee Replacement", "Revision Knee Replacement", "Total Hip Replacement"],
    figureSrc: "/costs/total-knee-replacement-illustration.webp",
    figureAlt: "Illustration of worn knee surfaces and the concept of resurfacing them with a total knee prosthesis",
  },
  {
    procedure: "Robotic Knee Replacement",
    shortName: "robotic knee replacement",
    briefName: "Robotic Knee Replacement",
    slug: "robotic-knee-replacement",
    definition:
      "Robotic knee replacement is still a knee arthroplasty: a planning scan or registration and a robotic arm or cutting guide are used to execute a surgeon-planned bone preparation. It is a technique applied to replacement, not a different disease.",
    indication:
      "It may be considered when a named arthroplasty plan already exists and the written technique uses a robotic system. Ownership of a robot in a city is not itself an indication, and this page does not treat robotics as a superior outcome product.",
    nonCandidate:
      "Anatomy or implant systems the robot cannot register, active infection, or a plan that is actually conventional total or partial replacement should not be labelled robotic. An empty city card area means the directory has no current tag, not that a robot is present or absent.",
    evaluation:
      "The arthritis work-up matches total knee replacement, plus the planning CT or intraoperative registration protocol the system requires. Confirm whether that scan is included in the estimate.",
    approaches: [
      { label: "Image-based robotic arthroplasty", detail: "Uses a preoperative CT to build a three-dimensional plan before bone preparation." },
      { label: "Image-free robotic arthroplasty", detail: "Registers the knee in theatre without a planning CT; workflow and consumables differ." },
      { label: "Conversion to conventional instrumentation", detail: "Registration failure or system unavailability can return the case to standard cutting guides; that change should be priced in writing." },
    ],
    technique:
      "The surgeon remains responsible for indication, soft-tissue balance and implant choice; the robot constrains bone cuts to a plan. This article does not claim tighter cuts produce a better result.",
    duration: "often 1.5–2.5 hours including registration; conversion to conventional instruments lengthens the episode",
    ward:
      "Ward recovery resembles other primary knee replacements: early walking practice, pain control and clot prevention. Robotics does not automatically shorten the stored [STAY].",
    recovery:
      "Early mobilisation follows the same clinical rules as conventional replacement. Travel and activity dates remain individual.",
    implantRehab:
      "Ask which robotic system, planning CT, implant family and disposable array or burr are assumed. Those lines can move the estimate independently of the India planning band.",
    distinctiveRisks:
      "Discussion includes the usual arthroplasty risks plus pin-site fracture, registration error and the possibility of abandoning the robot mid-case, without promising a functional advantage.",
    weightBearing:
      "Weight-bearing is set by the reconstruction and soft tissues, not by the presence of a robot.",
    flyHome:
      "Fitness to fly follows wound healing, haemoglobin, walking distance and clot risk, as after any knee replacement. A robotic label does not create a universal travel day.",
    drivers: [
      { label: "Planning CT and system consumables", detail: "Image-based workflows add a scan and disposable arrays that conventional letters may omit." },
      { label: "Implant family tied to the robot", detail: "Some systems only support particular components; switching implants changes the quote." },
      { label: "Theatre time and registration", detail: "Setup and checkpoints can lengthen the operating-room block." },
      { label: "Conversion contingency", detail: "A fallback conventional plan should be costed rather than treated as free." },
      { label: "Same medical and ward factors as primary TKR", detail: "Deformity, comorbidity and physiotherapy still dominate the episode if the reconstruction is otherwise identical." },
    ],
    quoteItems: [
      "Which robotic system and planning-CT protocol are included?",
      "What is billed if registration fails and conventional instruments are used?",
    ],
    documents: ["Any planning CT already performed for a robotic system", "Standing knee radiographs and prior operative notes"],
    followUp:
      "Follow-up matches other knee replacements: wound, radiographs, gait and physiotherapy. The robot does not replace implant surveillance.",
    related: ["Total Knee Replacement", "Partial Knee Replacement", "Revision Knee Replacement", "Total Hip Replacement"],
    figureSrc: "/costs/robotic-knee-replacement-illustration.webp",
    figureAlt: "Illustration of planned bone cuts for knee replacement using a robotic guidance concept",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Partial Knee Replacement",
    shortName: "partial knee replacement",
    briefName: "Partial Knee Replacement",
    slug: "partial-knee-replacement",
    definition:
      "Partial knee replacement resurfaces only the worn compartment — most often the medial side — while leaving intact ligaments and the remaining cartilage in place when those structures are still honest.",
    indication:
      "It may be considered for isolated unicompartmental osteoarthritis with an intact anterior cruciate ligament, correctable deformity and a contralateral compartment that does not already need replacement.",
    nonCandidate:
      "Inflammatory arthritis, ACL deficiency, fixed deformity beyond the system's limits, or bicompartmental wear usually steer the discussion toward total knee replacement rather than a partial implant.",
    evaluation:
      "Standing alignment views, stress radiographs when used, and skyline patellofemoral films define which compartment is isolated. MRI may help when the other compartments are uncertain, but it does not replace examination.",
    approaches: [
      { label: "Medial unicompartmental replacement", detail: "The most common partial construct when medial bone-on-bone wear is isolated." },
      { label: "Lateral unicompartmental replacement", detail: "A smaller group of knees with isolated lateral wear; alignment rules differ from medial disease." },
      { label: "Patellofemoral replacement", detail: "Resurfaces the kneecap joint alone; it is not a substitute for tibiofemoral arthritis." },
    ],
    technique:
      "Through a more limited exposure than a total replacement, the surgeon prepares only the affected femoral and tibial — or patellofemoral — surfaces and balances that compartment.",
    duration: "often 1–2 hours for an isolated compartment; conversion to total replacement extends theatre time",
    ward:
      "Many patients mobilise on the ward the same day. The stored stay is often toward the shorter end of arthroplasty planning, but conversion or medical events can erase that difference.",
    recovery:
      "Early walking is common, yet the remaining native compartments still need activity advice. Return to pivoting sport is not implied by a smaller implant.",
    implantRehab:
      "Confirm which compartment is priced, the implant family, and the written conversion plan if intraoperative findings make a total replacement more honest.",
    distinctiveRisks:
      "Consent should include progression of arthritis in the unreplaced compartments, bearing dislocation in mobile-bearing designs, fracture, infection, clot and later conversion to total replacement.",
    weightBearing:
      "Early weight-bearing is often allowed, with a walking aid until gait and quadriceps control are safe.",
    flyHome:
      "Travel clearance still depends on wound, swelling, walking distance and clot prevention. A partial implant does not guarantee an earlier flight than a total replacement.",
    drivers: [
      { label: "Which compartment is replaced", detail: "Medial, lateral and patellofemoral implants are different products and stock lines." },
      { label: "Conversion to total replacement", detail: "If the other compartments fail inspection, the episode becomes a total knee replacement with a different bill." },
      { label: "Bearing design", detail: "Fixed- and mobile-bearing partial implants have different consumable and revision implications." },
      { label: "Alignment and ligament status", detail: "Extra imaging or a change of plan follows if the ACL or deformity is not as described." },
      { label: "Later progression in native compartments", detail: "This does not change the index quote but should be discussed as a separate future episode." },
    ],
    quoteItems: [
      "If inspection shows a second worn compartment, is conversion to total knee replacement already priced?",
      "Which compartment and bearing design are named on the estimate?",
    ],
    documents: ["Standing and skyline knee radiographs", "Any MRI commenting on the other compartments and the ACL"],
    followUp:
      "Review watches the replaced compartment, the remaining native joint, gait and whether symptoms later suggest conversion to a total knee replacement.",
    related: ["Total Knee Replacement", "Robotic Knee Replacement", "Revision Knee Replacement", "Arthroscopic Surgery"],
    figureSrc: "/costs/partial-knee-replacement-illustration.webp",
    figureAlt: "Illustration of a single worn knee compartment and the concept of partial knee resurfacing",
  },
  {
    procedure: "Revision Knee Replacement",
    shortName: "revision knee replacement",
    briefName: "Revision Knee Replacement",
    slug: "revision-knee-replacement",
    definition:
      "Revision knee replacement removes and replaces a failed knee implant — in one or more stages — to treat loosening, infection, instability, wear, stiffness or periprosthetic fracture.",
    indication:
      "Revision may be considered when a primary or prior revision implant has failed and non-operative care or a simpler liner exchange cannot restore a stable, uninfected joint. The reason for failure must be written before the construct is chosen.",
    nonCandidate:
      "Unexplained pain without a defined failure mode, untreated medical unfitness, or an infection plan that has not yet identified the organism may defer surgery. First-time total knee replacement remains a different sheet.",
    evaluation:
      "Serial radiographs, ESR and CRP, and joint aspiration when infection is possible are central. CT may map bone loss. Prior operative notes and implant stickers are required to choose stems, cones or a hinge.",
    approaches: [
      { label: "Single-stage aseptic revision", detail: "Used when loosening, wear or instability is the working diagnosis and infection work-up is reassuring." },
      { label: "Two-stage revision for infection", detail: "Implant removal, debridement and a spacer typically precede reimplantation after antibiotics; it is two hospital episodes." },
      { label: "Constrained, hinged or cone-augmented reconstruction", detail: "Bone loss and ligament failure drive stems, sleeves, cones or a hinge rather than a primary implant." },
    ],
    technique:
      "The surgeon removes failed components, manages bone loss and infection, and rebuilds stability with revision implants. Scope can range from an isolated liner exchange to a hinge, which is not one product.",
    duration: "often 2–4 hours or longer when bone loss, cement extraction or a second stage is required",
    ward:
      "High-dependency observation is more often discussed than after a straightforward primary. The stored stay of [STAY] is only a planning token for a longer, more variable admission.",
    recovery:
      "Walking may start with more restriction than a primary. Bone-graft or hinge reconstructions can delay independence for weeks, and travel should wait for wound and medical stability.",
    implantRehab:
      "The letter must name stems, augments, cones, constraint, a cement spacer if staged, and whether allograft or metaphyseal metal is assumed. A primary implant price is not a revision price.",
    distinctiveRisks:
      "Discussion includes recurrent infection, further loosening, instability, fracture, extensor-mechanism injury, clot, neurovascular injury and the possibility that reimplantation cannot proceed as planned.",
    weightBearing:
      "Weight-bearing follows bone loss and construct stability. Some revisions remain partial weight-bearing until early radiographs are reviewed.",
    flyHome:
      "Staged infection care and low haemoglobin make early long-haul flights inappropriate until the treating team reviews wounds, inflammatory markers and walking.",
    drivers: [
      { label: "Cause of failure", detail: "Aseptic loosening, instability and infection are different investigations and theatre resources." },
      { label: "Single-stage versus two-stage care", detail: "A spacer admission and a later reimplantation are two bills unless the letter says otherwise." },
      { label: "Bone loss and revision implants", detail: "Stems, cones, sleeves, hinges and allograft change implant cost and theatre time." },
      { label: "Organism-directed antibiotics", detail: "Culture-negative or resistant infection can extend medicines and stay." },
      { label: "Extensor mechanism and soft-tissue cover", detail: "Quadriceps or patellar-tendon reconstruction and plastic cover are additional episodes." },
    ],
    quoteItems: [
      "Is this priced as a single stage, a spacer stage, or reimplantation?",
      "Which stems, cones or hinge implants are assumed, and what if bone loss is worse?",
    ],
    documents: ["Implant stickers and prior knee operative notes", "Recent ESR, CRP and any aspiration or culture results"],
    followUp:
      "Surveillance is longer than after a primary: infection markers when relevant, radiographs of stems and cones, gait and a lower threshold to investigate new pain or drainage.",
    related: ["Total Knee Replacement", "Robotic Knee Replacement", "Partial Knee Replacement", "Revision Hip Replacement"],
    figureSrc: "/costs/revision-knee-replacement-illustration.webp",
    figureAlt: "Illustration of a failed knee implant being exchanged for a stemmed revision construct",
  },
  {
    procedure: "Total Hip Replacement",
    shortName: "total hip replacement",
    briefName: "Total Hip Replacement",
    slug: "total-hip-replacement",
    definition:
      "Total hip replacement replaces the femoral head and the acetabular socket with a prosthesis to treat a destroyed hip when joint-preserving care is no longer a durable option.",
    indication:
      "It may be considered for end-stage osteoarthritis, osteonecrosis, inflammatory arthritis or selected femoral-neck fractures when pain, stiffness and walking limitation remain unacceptable after non-operative care.",
    nonCandidate:
      "Active infection, untreated severe medical unfitness, or anatomy that still belongs on a resurfacing or osteotomy discussion may change the plan. Paediatric hip reconstruction sits on a different specialty list.",
    evaluation:
      "Anteroposterior pelvis and lateral hip radiographs define joint space, deformity and bone stock. CT or MRI is selective for cysts, dysplasia or osteonecrosis. Medical fitness and the opposite hip influence staging.",
    approaches: [
      { label: "Posterior approach replacement", detail: "A commonly used exposure; precautions and soft-tissue repair are written by the operating team." },
      { label: "Lateral or anterolateral approach", detail: "Splits or reflects abductors; limp-prevention physiotherapy is part of the plan, not an optional extra." },
      { label: "Direct anterior approach", detail: "Uses an internervous interval in selected anatomy; it is an access choice, not a guaranteed faster recovery product." },
    ],
    technique:
      "The femoral head is removed, the socket is prepared for a cup, and a stem is seated in the femur. Bearing couple and head size are chosen for stability and wear, not from a brochure upgrade list.",
    duration: "often 1–2 hours for a straightforward primary; dysplasia, hardware removal or fracture extends theatre time",
    ward:
      "Most primaries recover on the ward with same- or next-day standing. High-dependency care follows comorbidity or an unexpected medical event.",
    recovery:
      "Walking with a stick or frame is usually encouraged early. Hip precautions, if used, and the timeline for independent walking remain individual.",
    implantRehab:
      "The estimate should name stem type, cup, bearing couple (ceramic, polyethylene or other as planned) and whether screws, a constrained liner or a dual-mobility cup are assumed.",
    distinctiveRisks:
      "Consent may address dislocation, infection, clot, fracture, leg-length difference, nerve injury, squeaking or wear of particular bearings, and later revision without quoting generic success figures.",
    weightBearing:
      "Many uncemented and cemented primaries allow early weight-bearing as pain allows; intraoperative fracture or a revision-style stem can change that instruction.",
    flyHome:
      "Fitness to fly depends on wound, haemoglobin, walking distance, dislocation precautions and clot-prevention duration. There is no catalog flight day.",
    drivers: [
      { label: "Bearing couple and head size", detail: "Ceramic, polyethylene and dual-mobility options are different implant lines." },
      { label: "Approach and any navigation", detail: "Access and extra equipment should be named; they are not automatically better." },
      { label: "Dysplasia, AVN or hardware removal", detail: "Bone graft, screws or removal of prior metal change scope." },
      { label: "Laterality", detail: "Staged or simultaneous bilateral hips are not the same quote as one side." },
      { label: "Medical comorbidity and VTE plan", detail: "Extended prophylaxis, high-dependency nights and anaemia management add resources." },
    ],
    quoteItems: [
      "Which stem, cup and bearing couple are assumed?",
      "Are hip precautions and outpatient physiotherapy included after discharge?",
    ],
    documents: ["AP pelvis and lateral hip radiographs", "Records of osteonecrosis treatment, osteotomy or prior fracture fixation"],
    followUp:
      "Review includes wound, radiographs of cup and stem position, walking, leg-length symptoms and a physiotherapy plan that continues after the first clinic visit.",
    related: ["Revision Hip Replacement", "Hip Resurfacing", "Total Knee Replacement", "Shoulder Replacement"],
    figureSrc: "/costs/total-hip-replacement-illustration.webp",
    figureAlt: "Illustration of a worn hip joint and the concept of replacing the ball and socket",
  },
  {
    procedure: "Revision Hip Replacement",
    shortName: "revision hip replacement",
    briefName: "Revision Hip Replacement",
    slug: "revision-hip-replacement",
    definition:
      "Revision hip replacement exchanges a failed femoral stem, acetabular cup or both to treat loosening, infection, instability, wear, osteolysis or periprosthetic fracture.",
    indication:
      "Revision may be considered when a primary or prior revision hip has failed and liner exchange or non-operative care cannot restore a stable, uninfected articulation. The failure mode must be defined first.",
    nonCandidate:
      "Unexplained pain without loosening, infection or instability, or a patient who cannot tolerate a longer reconstruction, may defer surgery. Primary total hip replacement remains a different sheet.",
    evaluation:
      "Serial radiographs, inflammatory markers and aspiration when infection is possible are essential. CT maps acetabular bone loss. Implant records determine whether a taper, cup or stem can be retained.",
    approaches: [
      { label: "Acetabular-only revision", detail: "Cup, liner or dual-mobility exchange when the stem is well fixed and not the source of failure." },
      { label: "Femoral-only revision", detail: "Stem exchange for loosening, fracture or trunnion problems when the cup can stay." },
      { label: "Both-component or staged infected revision", detail: "Combined reconstruction or spacer-then-reimplantation when infection or global bone loss requires it." },
    ],
    technique:
      "Failed parts are removed, bone loss is classified, and revision cups, cages, stems or proximal femoral replacements are used as anatomy demands. This is not a longer version of a primary hip.",
    duration: "often 2–5 hours, longer for cement extraction, pelvic discontinuity or a fracture stem",
    ward:
      "High-dependency monitoring, transfusion and a longer ward course are more often discussed than after primary replacement. [STAY] is only a planning token.",
    recovery:
      "Protected weight-bearing can last weeks. Abductor reconstruction or a proximal femoral replacement changes walking practice and travel timing.",
    implantRehab:
      "The letter should name revision stems, augments, cages, dual-mobility or constrained liners, allograft and whether a cement spacer stage is priced separately.",
    distinctiveRisks:
      "Families should discuss recurrent dislocation, infection, further fracture, nerve injury, limp, clot, limb-length change and the possibility that reconstruction cannot restore a standard joint.",
    weightBearing:
      "Many revisions remain toe-touch or partial weight-bearing until early radiographs confirm cup and stem stability.",
    flyHome:
      "Long-haul travel is often deferred until wounds, haemoglobin and a safe walking distance exist, especially after staged infection care.",
    drivers: [
      { label: "Which component fails", detail: "Cup-only, stem-only and both-component revisions are different implant and theatre events." },
      { label: "Acetabular or femoral bone loss", detail: "Augments, cages and modular stems dominate implant cost." },
      { label: "Infection staging", detail: "Two admissions, a spacer and prolonged antibiotics are not one primary-hip package." },
      { label: "Periprosthetic fracture", detail: "Cables, plates or a fracture-specific stem add hardware and stay." },
      { label: "Abductor or soft-tissue reconstruction", detail: "Limp-prevention surgery and bracing extend rehabilitation resources." },
    ],
    quoteItems: [
      "Is the plan cup-only, stem-only or both components, and is infection staged?",
      "Which revision implants and allograft assumptions are written?",
    ],
    documents: ["Serial hip radiographs and implant stickers", "ESR, CRP and aspiration results when infection is in the differential"],
    followUp:
      "Longer radiographic surveillance of revision implants, infection markers when relevant, and gait training are expected; dislocation precautions may be stricter than after a primary hip.",
    related: ["Total Hip Replacement", "Hip Resurfacing", "Revision Knee Replacement", "Non-Union Repair"],
    figureSrc: "/costs/revision-hip-replacement-illustration.webp",
    figureAlt: "Illustration of exchanging a failed hip stem or cup for a revision construct",
  },
  {
    procedure: "Hip Resurfacing",
    shortName: "hip resurfacing",
    briefName: "Hip Resurfacing",
    slug: "hip-resurfacing",
    definition:
      "Hip resurfacing caps the femoral head and replaces the acetabular socket, preserving the femoral neck and canal, when bone quality and anatomy make a conventional stem less appropriate.",
    indication:
      "It may be considered for selected higher-demand hips with adequate femoral-head bone, suitable anatomy and a team that still performs the procedure. It is not a paediatric hip-preservation operation.",
    nonCandidate:
      "Poor bone, large cysts, significant deformity, renal impairment that complicates metal-ion surveillance, or anatomy better served by a stemmed total hip replacement may preclude resurfacing.",
    evaluation:
      "Radiographs and often CT assess head shape, cysts and acetabular bone. Metal-ion counselling and renal function belong in the preoperative discussion when a metal-on-metal couple is planned.",
    approaches: [
      { label: "Metal-on-metal resurfacing", detail: "The historical bearing for most resurfacing systems; ion monitoring and recall history of particular implants must be discussed case by case." },
      { label: "Alternative-bearing or hybrid resurfacing", detail: "Used only where a system and indication exist; it is not an automatic upgrade." },
      { label: "Conversion to stemmed total hip replacement", detail: "Intraoperative head quality or acetabular findings may make a conventional THR the honest operation." },
    ],
    technique:
      "The femoral head is shaped for a cap and the socket is reamed for a monoblock or modular cup, preserving the neck. Neck notching and cup inclination are technical concerns specific to this operation.",
    duration: "often 1.5–2.5 hours; conversion to a stemmed hip extends the episode",
    ward:
      "Ward recovery resembles other hip arthroplasties, with early mobilisation as the construct allows. Robotics or navigation, if present, are not implied by this sheet.",
    recovery:
      "Return to higher-demand activity is sometimes discussed for selected patients, but this page does not promise sport or a durability advantage over total hip replacement.",
    implantRehab:
      "Name the resurfacing system, bearing, planned ion-monitoring schedule and the written conversion plan to a stemmed total hip if the head cannot be capped.",
    distinctiveRisks:
      "Consent should include femoral-neck fracture, metal-ion effects, adverse local tissue reaction, loosening, infection, clot and later conversion to a stemmed hip, without generic success claims.",
    weightBearing:
      "Early weight-bearing is often allowed if the neck is intact; a notched neck or bone-grafted head can change the instruction.",
    flyHome:
      "Travel follows wound, walking and clot-prevention rules similar to other hip arthroplasties, plus any ion-surveillance plan that must continue at home.",
    drivers: [
      { label: "Femoral-head bone quality", detail: "Cysts or poor bone can force conversion to a stemmed hip with a different implant bill." },
      { label: "Bearing and ion surveillance", detail: "Metal-ion tests and possible cross-sectional imaging are often outside a surgical package." },
      { label: "Acetabular component size and position", detail: "Dysplasia or a large cup changes inventory and risk discussion." },
      { label: "Conversion contingency", detail: "A stemmed total hip should be costed if resurfacing cannot proceed." },
      { label: "Activity counselling time", detail: "Higher-demand patients still need a written activity plan, not a sports guarantee." },
    ],
    quoteItems: [
      "Which resurfacing system and ion-monitoring plan are included?",
      "What is billed if the femoral head cannot be resurfaced and a stemmed hip is used?",
    ],
    documents: ["AP pelvis and lateral hip radiographs", "Renal-function results if a metal-on-metal couple is discussed"],
    followUp:
      "Surveillance may include radiographs of the neck and cup, metal-ion blood tests when indicated, and review of pain or clicking that would prompt further imaging.",
    related: ["Total Hip Replacement", "Revision Hip Replacement", "Total Knee Replacement", "Fracture Fixation"],
    figureSrc: "/costs/hip-resurfacing-illustration.webp",
    figureAlt: "Illustration of a femoral-head cap and socket used in hip resurfacing",
  },
  {
    procedure: "Shoulder Replacement",
    shortName: "shoulder replacement",
    briefName: "Shoulder Replacement",
    slug: "shoulder-replacement",
    definition:
      "Shoulder replacement substitutes the destroyed glenohumeral joint with an anatomic or reverse prosthesis, chosen after the rotator cuff, glenoid bone and fracture pattern are understood.",
    indication:
      "It may be considered for glenohumeral osteoarthritis with an intact cuff, cuff-tear arthropathy, selected acute fractures, or inflammatory destruction when pain and function remain unacceptable after non-operative care.",
    nonCandidate:
      "Active infection, insufficient glenoid or acromial bone for the planned implant, or a cuff and cartilage pair that still belong on a repair or arthroscopic sheet may change the operation. Reverse and anatomic implants are not interchangeable upgrades.",
    evaluation:
      "True AP and axillary radiographs, and often CT for glenoid version and bone stock, are required. MRI or ultrasound assesses the cuff when an anatomic replacement is contemplated.",
    approaches: [
      { label: "Anatomic total shoulder replacement", detail: "Used when the cuff can still centre the head and the glenoid can accept a component." },
      { label: "Reverse shoulder replacement", detail: "Medialises and distalises the centre of rotation for cuff-tear arthropathy or selected fractures; it is a different biomechanical product." },
      { label: "Hemiarthroplasty", detail: "Replaces the humeral head alone in selected fracture or bone-stock situations; it is not a hidden total shoulder." },
    ],
    technique:
      "Through a deltopectoral or other chosen interval, the humeral head is prepared for a stem or stemless implant and the glenoid is prepared for an anatomic or reverse baseplate as planned.",
    duration: "often 1.5–3 hours; fracture, bone graft or revision of prior metal extends theatre time",
    ward:
      "Patients usually recover on the ward in a sling. High-dependency care is uncommon unless comorbidity or a long fracture sitting requires it.",
    recovery:
      "The sling period and the start of active elevation are protocol-specific. This page does not promise overhead sport or a date for independent dressing.",
    implantRehab:
      "The quote should state anatomic versus reverse, stemless versus stemmed, glenoid baseplate screws, and whether a fracture stem or bone graft is assumed.",
    distinctiveRisks:
      "Discussion includes dislocation or acromial stress fracture after reverse replacement, glenoid loosening, infection, nerve injury, stiffness and the need for later revision, without generic outcome percentages.",
    weightBearing:
      "The arm is typically non-weight-bearing for transfers at first. Lower-limb walking is unrestricted unless other injuries exist; the sling is the functional restriction.",
    flyHome:
      "Travel is easier once sling transfers, wound checks and a safe sitting position are possible. Overhead bins and long immobilisation on a flight should be planned with the team.",
    drivers: [
      { label: "Anatomic versus reverse design", detail: "Different implants, baseplates and physiotherapy protocols." },
      { label: "Glenoid bone graft or augmented baseplate", detail: "Version correction adds theatre time and inventory." },
      { label: "Fracture versus elective arthritis", detail: "Acute trauma lists, overnight stay and tuberosity repair change resources." },
      { label: "Stemless versus stemmed humeral implant", detail: "Bone quality and prior fractures influence the choice and the quote." },
      { label: "Outpatient physiotherapy duration", detail: "Supervised cuff or deltoid rehabilitation often continues well beyond [STAY]." },
    ],
    quoteItems: [
      "Is the letter written for an anatomic or a reverse replacement?",
      "Does the estimate include a fracture stem, glenoid graft or a sling and physiotherapy package?",
    ],
    documents: ["Shoulder radiographs and any CT of glenoid bone stock", "Cuff imaging if an anatomic replacement is proposed"],
    followUp:
      "Review watches wound, radiographs of component position, sling weaning and a staged physiotherapy programme; reverse and anatomic protocols are not the same.",
    related: ["Rotator Cuff Repair", "Arthroscopic Surgery", "Tendon Repair", "Total Hip Replacement"],
    figureSrc: "/costs/shoulder-replacement-illustration.webp",
    figureAlt: "Illustration of a destroyed shoulder joint and the concept of anatomic or reverse replacement",
  },
  {
    procedure: "ACL Reconstruction (Anterior Cruciate Ligament)",
    shortName: "ACL reconstruction",
    briefName: "ACL Reconstruction",
    slug: "acl-reconstruction-anterior-cruciate-ligament",
    definition:
      "ACL reconstruction replaces a torn anterior cruciate ligament with a graft to restore rotational stability of the knee when the native ligament cannot be repaired or has already failed non-operative care.",
    indication:
      "Reconstruction may be considered for symptomatic instability after a complete tear, especially when pivoting activity, a repairable meniscus or alignment issues make non-operative care unreliable. Not every MRI tear in a low-demand knee needs a graft.",
    nonCandidate:
      "An isolated tear that has settled with rehabilitation, active infection, or a knee whose main problem is arthritis rather than instability may be steered away from reconstruction. PCL and extra-articular work are different plans.",
    evaluation:
      "History of giving-way, Lachman and pivot-shift examination, and MRI define the tear and associated meniscus or cartilage injury. Alignment radiographs matter when osteotomy may be added.",
    approaches: [
      { label: "Autograft reconstruction", detail: "Hamstring, bone–patellar tendon–bone or quadriceps tendon grafts are common; each has a different harvest morbidity." },
      { label: "Allograft reconstruction", detail: "Selected for particular revisions or graft-length needs; availability and counselling differ from autograft." },
      { label: "Combined meniscus or extra-articular work", detail: "A repairable meniscus, ALL/LET augmentation or osteotomy can be added when instability is not an isolated ACL problem." },
    ],
    technique:
      "Tunnels are placed arthroscopically, the chosen graft is harvested or thawed, and it is fixed with screws, buttons or a hybrid construct. Repair of an avulsion in a child is a different specialty product.",
    duration: "often 1–2 hours for an isolated graft; meniscus repair or revision tunnels extend theatre time",
    ward:
      "Many reconstructions are day-case or a single night. A nerve-block catheter or combined ligament work can lengthen observation.",
    recovery:
      "Early range-of-motion and quadriceps activation are usual; return to pivoting sport is criteria-based over many months and is never a catalog date.",
    implantRehab:
      "The letter should name graft source, fixation devices, whether a brace is supplied, and how many supervised physiotherapy sessions are included after [STAY].",
    distinctiveRisks:
      "Consent may address graft rupture or stretch, infection, stiffness, harvest-site pain, clot (uncommon but discussed), and residual rotational laxity without promising a return-to-sport rate.",
    weightBearing:
      "Weight-bearing often starts immediately in a brace or with crutches if a meniscus repair was added; the meniscus protocol can override the ACL protocol.",
    flyHome:
      "Short flights may be discussed once swelling, wound and a safe sitting flexion exist. Long-haul travel still needs clot advice and space to extend the knee.",
    drivers: [
      { label: "Graft choice", detail: "Autograft harvest, allograft processing and hybrid grafts are different cost lines." },
      { label: "Associated meniscus or cartilage work", detail: "Repair implants and a slower rehab protocol change the episode." },
      { label: "Revision tunnels and bone graft", detail: "Widened tunnels can require staging, which is not a primary ACL package." },
      { label: "Alignment or extra-articular augmentation", detail: "Osteotomy or LET adds theatre time and implants." },
      { label: "Supervised rehabilitation length", detail: "Criteria-based sport testing often sits outside the hospital letter." },
    ],
    quoteItems: [
      "Which graft and fixation devices are assumed?",
      "If the meniscus is repairable, is that implant and rehab protocol included?",
    ],
    documents: ["Knee MRI and injury-date history", "Alignment radiographs if bowing or prior osteotomy exists"],
    followUp:
      "Physiotherapy is the largest part of recovery: effusion control, graft protection, strength testing and a later decision about pivoting sport made with the treating team.",
    related: ["PCL Reconstruction (Posterior Cruciate Ligament)", "Meniscus Repair", "Arthroscopic Surgery", "Tendon Repair"],
    figureSrc: "/costs/acl-reconstruction-illustration.webp",
    figureAlt: "Illustration of an anterior cruciate ligament graft placed through femoral and tibial tunnels",
  },
  {
    procedure: "PCL Reconstruction (Posterior Cruciate Ligament)",
    shortName: "PCL reconstruction",
    briefName: "PCL Reconstruction",
    slug: "pcl-reconstruction-posterior-cruciate-ligament",
    definition:
      "PCL reconstruction replaces a torn posterior cruciate ligament with a graft to control posterior tibial sag when the injury is complete, combined or still unstable after protected rehabilitation.",
    indication:
      "Reconstruction may be considered for symptomatic posterior instability, combined posterolateral or ACL injury, or selected delayed presentations. Isolated low-grade tears are often treated without a graft.",
    nonCandidate:
      "A grade-I sag that has settled, active infection, or a knee whose dominant problem is arthritis may not belong on a PCL list. ACL reconstruction is a different graft plan.",
    evaluation:
      "Posterior sag and dial tests, stress radiographs when available, and MRI define isolated versus combined injury. Vascular examination is mandatory after a knee dislocation history.",
    approaches: [
      { label: "Single-bundle autograft or allograft PCL", detail: "A common reconstructive option when the ligament is mid-substance and other corners are stable." },
      { label: "Double-bundle reconstruction", detail: "Selected by some teams for particular anatomy; it is a technical variation, not a higher-success product." },
      { label: "Combined corner or ACL reconstruction", detail: "Posterolateral corner or ACL work can dominate theatre time and the rehabilitation brace plan." },
    ],
    technique:
      "Arthroscopic or open tunnels are placed to avoid the so-called killer turn as the team prefers, and the graft is tensioned in a way that does not over-constrain the knee. Avulsion repair with screws is a different trauma product.",
    duration: "often 1.5–3 hours; combined corner reconstruction lengthens the sitting substantially",
    ward:
      "Overnight observation is common when a brace, nerve block or combined ligament work is used. Vascular checks matter after high-energy injuries.",
    recovery:
      "Early rehab often protects posterior sag with a prone or brace protocol that differs from ACL reconstruction. Return to sport is criteria-based and slow.",
    implantRehab:
      "Name the graft, fixation, PCL brace, and whether posterolateral implants are included. A borrowed ACL package is not a PCL quotation.",
    distinctiveRisks:
      "Discussion includes residual sag, graft stretch, stiffness, vascular or nerve injury in combined trauma, infection and the need for further ligament surgery.",
    weightBearing:
      "Partial weight-bearing in a PCL brace is common at first; the protocol is written to prevent posterior tibial translation.",
    flyHome:
      "A long flight with the tibia sagging unsupported is a poor early plan. The team should advise on brace wear, seat space and clot prevention before travel.",
    drivers: [
      { label: "Isolated versus combined ligament injury", detail: "A corner or ACL reconstruction is a different theatre and implant event." },
      { label: "Graft length and tunnel strategy", detail: "Allograft may be chosen for length; that line should be explicit." },
      { label: "Knee-dislocation work-up", detail: "Vascular imaging and a longer high-dependency stay can dominate cost." },
      { label: "Brace and physiotherapy protocol", detail: "PCL-specific bracing is often billed separately from the graft." },
      { label: "Revision or chronic reconstruction", detail: "Tunnel widening and stiffness add staging or extra releases." },
    ],
    quoteItems: [
      "Is an isolated PCL priced, or is a posterolateral corner included?",
      "Which brace and non-weight-bearing period are assumed?",
    ],
    documents: ["MRI and any stress radiographs", "Records of knee dislocation, vascular studies or prior ACL surgery"],
    followUp:
      "Follow-up checks posterior sag, brace compliance, graft protection and a slower strengthening programme than a typical ACL pathway.",
    related: ["ACL Reconstruction (Anterior Cruciate Ligament)", "Meniscus Repair", "Arthroscopic Surgery", "Fracture Fixation"],
    figureSrc: "/costs/pcl-reconstruction-illustration.webp",
    figureAlt: "Illustration of a posterior cruciate ligament graft controlling tibial sag",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Meniscus Repair",
    shortName: "meniscus repair",
    briefName: "Meniscus Repair",
    slug: "meniscus-repair",
    definition:
      "Meniscus repair sutures a tear that still has healing potential, aiming to keep the shock-absorbing cartilage rather than remove it, when tissue quality and tear pattern can hold a stitch.",
    indication:
      "Repair may be considered for unstable tears in vascular zones, root tears, ramp lesions and many combined ACL injuries in which the meniscus can still take a suture. Degenerative white-white tears often do not belong on this sheet.",
    nonCandidate:
      "Tissue that cannot hold a stitch, advanced osteoarthritis in that compartment, or a patient who cannot protect weight-bearing may lead to partial meniscectomy — a different product usually billed under arthroscopic surgery — or to non-operative care.",
    evaluation:
      "MRI describes tear pattern, zone and root integrity. Examination looks for locking and effusion. Alignment films matter for root tears, which can behave like a meniscus-deficient knee.",
    approaches: [
      { label: "Inside-out or outside-in suture repair", detail: "Traditional techniques for many body and posterior-horn tears, sometimes needing a small extra incision." },
      { label: "All-inside implant repair", detail: "Uses pre-loaded devices through portals; device count should appear on the estimate rather than as an unnamed consumable." },
      { label: "Root or ramp repair", detail: "Restores meniscus hoop function or the hidden meniscocapsular lesion often seen with an ACL tear; implants and weight-bearing rules differ from a simple body stitch." },
    ],
    technique:
      "Through arthroscopy the surgeon inspects the tear, prepares the rim and places sutures or anchors. Weight-bearing and flexion limits follow the repair type, not a generic arthroscopy brochure.",
    duration: "often 45–90 minutes; root repairs and combined ACL work take longer",
    ward:
      "Many repairs are day-care or a single night. A nerve block or combined ligament reconstruction can lengthen observation. The stored stay is [STAY].",
    recovery:
      "Protected weight-bearing and limited deep flexion are common for weeks. Healing, not comfort alone, sets running and squat timelines.",
    implantRehab:
      "Suture devices and anchors should be named. A meniscectomy-only letter is cheaper for a reason: it is a different operation usually billed under arthroscopic surgery.",
    distinctiveRisks:
      "The repair may not heal, stiffness can occur, and a later meniscectomy may still be needed. This page does not assign a healing percentage.",
    weightBearing:
      "Many body repairs allow touch or partial weight-bearing in a brace; root repairs often remain more restricted until early review.",
    flyHome:
      "Short travel may be discussed once swelling, wound and a safe sitting flexion exist. Long-haul flights still need space to extend the knee and a written weight-bearing plan.",
    drivers: [
      { label: "Repair versus meniscectomy", detail: "Implants and rehab restrictions differ sharply; they are not one product." },
      { label: "Tear pattern", detail: "Root and ramp repairs use more devices, theatre time and protection." },
      { label: "Combined ACL reconstruction", detail: "Should be priced as combined work, not two vague packages." },
      { label: "Brace and non-weight-bearing period", detail: "Aids and extra hotel nights add trip cost beyond [STAY]." },
      { label: "MRI quality", detail: "A repeat scan before travel may sit outside the surgical letter." },
    ],
    quoteItems: [
      "Is this priced as repair or meniscectomy?",
      "How many suture devices are assumed, and what is the written weight-bearing rule?",
    ],
    documents: ["Knee MRI describing tear zone and pattern", "Note of locking or combined ligament injury"],
    followUp:
      "Protection of the repair is the priority. Premature deep squats or running can undo the stitches even if the knee feels comfortable.",
    related: ["ACL Reconstruction (Anterior Cruciate Ligament)", "Arthroscopic Surgery", "PCL Reconstruction (Posterior Cruciate Ligament)", "Total Knee Replacement"],
    figureSrc: "/costs/meniscus-repair-illustration.webp",
    figureAlt: "Illustration of a torn knee meniscus and the concept of suture repair rather than removal",
  },
  {
    procedure: "Rotator Cuff Repair",
    shortName: "rotator cuff repair",
    briefName: "Rotator Cuff Repair",
    slug: "rotator-cuff-repair",
    definition:
      "Rotator cuff repair reattaches torn tendons of the shoulder to bone so that lifting the arm can again be powered by those tendons, when MRI and examination still show repairable tissue.",
    indication:
      "It may be considered for traumatic or selected degenerative tears with weakness or night pain after a physiotherapy trial, when retraction and muscle quality still support a repair rather than a reverse replacement.",
    nonCandidate:
      "Massive retracted tears with fatty replacement, or glenohumeral arthritis that already needs a reverse shoulder, may be better served by another operation or by rehabilitation alone.",
    evaluation:
      "Strength testing and MRI or ultrasound describe tear size, retraction and muscle quality. X-rays look for arthritis that would change the plan to replacement.",
    approaches: [
      { label: "Arthroscopic repair", detail: "Anchors and sutures placed through portals; the usual modern approach when the tear is repairable." },
      { label: "Mini-open repair", detail: "Used in selected tear patterns or when arthroscopy cannot seat the tendon honestly." },
      { label: "Partial repair or tendon-transfer discussion", detail: "When a complete footprint repair is not realistic; this is not a hidden reverse shoulder." },
    ],
    technique:
      "The tendon edge is prepared, bone is prepared at the footprint, and anchors secure the tendon. Biceps or acromial work may be added only if planned in the letter.",
    duration: "often 1–2 hours; larger or retracted tears take longer",
    ward:
      "Stay is often one night or day-care. The stored stay is [STAY]. High-dependency care is uncommon unless comorbidity requires it.",
    recovery:
      "A sling is usual for several weeks. Physiotherapy is slow by design. Premature lifting is a common reason repairs fail, and this page does not promise overhead sport.",
    implantRehab:
      "Anchor number and type, plus any patch or balloon, can change the consumable line. Ask how many anchors are assumed and whether biceps work is in the same letter.",
    distinctiveRisks:
      "Re-tear, stiffness, infection and incomplete strength recovery should be discussed. MRI healing and comfort do not always match.",
    weightBearing:
      "The arm is typically non-weight-bearing for transfers at first. Walking is unrestricted unless other injuries exist; the sling is the functional restriction.",
    flyHome:
      "Travel is easier once sling transfers and a safe sitting position are possible. Overhead bins and long immobilisation on a flight should be planned with the team.",
    drivers: [
      { label: "Tear size and retraction", detail: "Larger tears use more anchors and theatre time." },
      { label: "Additional shoulder work", detail: "Biceps tenodesis or acromioplasty should be listed if planned." },
      { label: "Patch or augmentation", detail: "Not part of a standard repair letter unless named." },
      { label: "Sling and physiotherapy length", detail: "Outpatient rehab dominates the trip after a short stay." },
      { label: "Arthritis on X-ray", detail: "May convert the plan toward shoulder replacement, a different sheet." },
    ],
    quoteItems: [
      "How many anchors are included?",
      "Is biceps or acromial work part of the same letter?",
    ],
    documents: ["Shoulder MRI", "X-rays if already performed"],
    followUp:
      "Sling compliance and delayed strengthening are the aftercare. The home physiotherapist needs the written phase protocol.",
    related: ["Shoulder Replacement", "Arthroscopic Surgery", "Tendon Repair", "Fracture Fixation"],
    figureSrc: "/costs/rotator-cuff-repair-illustration.webp",
    figureAlt: "Illustration of a torn rotator cuff tendon and conceptual reattachment to the humeral footprint",
  },
  {
    procedure: "Arthroscopic Surgery",
    shortName: "arthroscopic surgery",
    briefName: "Arthroscopic Surgery",
    slug: "arthroscopic-surgery",
    definition:
      "Arthroscopic surgery uses a camera and small instruments through portals to inspect and treat a joint when the planned work is a scope-based procedure rather than a named ligament reconstruction, cuff repair or replacement.",
    indication:
      "It may be considered for selected locking meniscus fragments, loose bodies, diagnostic uncertainty after imaging, or defined cartilage procedures. It is not a general clean-up for every painful joint.",
    nonCandidate:
      "Advanced arthritis that needs replacement, or a named ACL, PCL or cuff product that already has its own sheet, should not be billed as generic arthroscopy.",
    evaluation:
      "MRI or X-rays should define the target joint and lesion. A request that only says “arthroscopy” is not enough to quote honestly.",
    approaches: [
      { label: "Knee arthroscopy", detail: "Meniscectomy, loose-body removal or chondroplasty as specifically indicated — not an unnamed ACL graft." },
      { label: "Shoulder arthroscopy", detail: "Subacromial or biceps work when cuff repair or replacement is not the product." },
      { label: "Other named joints", detail: "Ankle, elbow or hip arthroscopy only when the team names the joint and the mechanical goal." },
    ],
    technique:
      "Saline distends the joint, the camera maps the problem, and instruments treat only the planned lesion. Conversion to open surgery or a named reconstruction should be discussed in consent.",
    duration: "often 30–90 minutes depending on the joint and the work found",
    ward:
      "Often day-care or one night. The stored stay is [STAY]. Unexpected reconstructive work can erase a day-care assumption.",
    recovery:
      "Walking or sling use depends on the joint. Swelling can last weeks. This is not automatically a faster recovery than a named reconstruction if extra work is done.",
    implantRehab:
      "If anchors, shavers or extra implants are used, they should be listed. A diagnostic-only scope is a different price from a reconstructive scope.",
    distinctiveRisks:
      "Stiffness, infection, fluid extravasation and the finding that more surgery is needed should be discussed without promising that a scope will “clean” arthritis.",
    weightBearing:
      "Knee day-case work may allow walking as pain allows; a meniscus repair or microfracture can override that. Shoulder scopes usually use a sling for comfort.",
    flyHome:
      "Short travel may be discussed once swelling and wound checks are satisfactory. If unexpected reconstructive work was done, follow that procedure’s travel advice.",
    drivers: [
      { label: "Which joint and which lesion", detail: "Generic arthroscopy is not a comparable product across joints." },
      { label: "Diagnostic versus reconstructive work", detail: "Found-and-fixed lesions change time and implants." },
      { label: "Conversion to a named procedure", detail: "ACL, cuff or replacement work belongs on those sheets." },
      { label: "Day-care versus overnight observation", detail: "Confirm the room assumption rather than assuming outpatient." },
      { label: "Physiotherapy after unexpected findings", detail: "May sit outside the original letter." },
    ],
    quoteItems: [
      "Which joint and which exact procedure are priced?",
      "What is billed if a repair or reconstruction is required intraoperatively?",
    ],
    documents: ["MRI of the joint to be scoped", "A clinic note stating the mechanical symptom being treated"],
    followUp:
      "The discharge note should state what was actually done. Rehabilitation follows that finding, not the word arthroscopy.",
    related: ["Meniscus Repair", "ACL Reconstruction (Anterior Cruciate Ligament)", "Rotator Cuff Repair", "Total Knee Replacement"],
    figureSrc: "/costs/arthroscopic-surgery-illustration.webp",
    figureAlt: "Illustration of a camera and instruments being used inside a joint during arthroscopy",
  },
  {
    procedure: "Fracture Fixation",
    shortName: "fracture fixation",
    briefName: "Fracture Fixation",
    slug: "fracture-fixation",
    definition:
      "Fracture fixation holds broken bone fragments in a stable position with plates, screws, nails or wires so healing can occur in acceptable alignment when a cast alone is not enough.",
    indication:
      "It may be considered when a fracture is displaced, unstable, involves a joint, has failed closed treatment, or belongs to a pattern that heals poorly without hardware.",
    nonCandidate:
      "Stable, well-aligned fractures that can be treated in a cast or brace, or a patient who needs resuscitation before any implant, should not be forced into an elective fixation package. Paediatric fracture lists sit on a different specialty.",
    evaluation:
      "X-rays in two planes, and CT for joint or complex patterns, define the fragments. Soft-tissue status, open-wound grade and medical fitness decide timing.",
    approaches: [
      { label: "Internal fixation with plate or nail", detail: "The usual adult pathway when the skin and bone allow a definitive implant." },
      { label: "External fixation", detail: "Used when soft tissues or infection risk prevent immediate internal hardware." },
      { label: "Closed treatment", detail: "Still appropriate for many stable patterns; it is not a cheaper version of this sheet." },
    ],
    technique:
      "The surgeon reduces the fragments — closed or open — and applies hardware that matches the bone. ORIF is the named open-reduction product on a neighbouring sheet.",
    duration: "often 1–3 hours; periarticular or segmental fractures take longer",
    ward:
      "Stay depends on the bone, swelling and walking ability. The stored stay is [STAY]. Open fractures and joint injuries often need longer observation than a simple fibula.",
    recovery:
      "Weight-bearing rules are fracture-specific. Casts or boots may still be needed. Healing X-rays, not a hotel booking, decide when hardware has done its job.",
    implantRehab:
      "Nail versus plate, locking screws and joint-spanning hardware change cost. Confirm the implant set for the named bone rather than a generic trauma package.",
    distinctiveRisks:
      "Infection, non-union, malunion, implant irritation and the need for later removal should be discussed without quoting union percentages.",
    weightBearing:
      "Some diaphyseal nails allow earlier weight-bearing; articular plates often remain protected. The treating team writes the actual restriction.",
    flyHome:
      "Travel is safer once wounds are dry, swelling is controlled and a written weight-bearing and clot-prevention plan exists. Unstable or open injuries rarely belong on the next commercial flight.",
    drivers: [
      { label: "Which bone and joint involvement", detail: "A simple fibula is not priced like a tibial plateau." },
      { label: "Open versus closed soft tissues", detail: "Open fractures add washouts and possible staged surgery." },
      { label: "Nail, plate or external frame", detail: "Different implant families and theatre resources." },
      { label: "Need for bone graft", detail: "May appear if comminution is severe." },
      { label: "Later implant removal", detail: "Usually a separate episode unless the letter says otherwise." },
    ],
    quoteItems: [
      "Which bone and which implant set are priced?",
      "Is this an isolated fracture or a staged open-fracture pathway?",
    ],
    documents: ["Injury X-rays and CT if already performed", "Tetanus and open-wound records where relevant"],
    followUp:
      "Serial X-rays watch healing. Smoking, diabetes and early weight-bearing against advice are common reasons healing slows.",
    related: ["ORIF (Open Reduction and Internal Fixation)", "Non-Union Repair", "Tendon Repair", "Total Hip Replacement"],
    figureSrc: "/costs/fracture-fixation-illustration.webp",
    figureAlt: "Illustration of a broken long bone and conceptual plate-and-screw fixation",
  },
  {
    procedure: "ORIF (Open Reduction and Internal Fixation)",
    shortName: "ORIF",
    briefName: "ORIF",
    slug: "orif-open-reduction-and-internal-fixation",
    definition:
      "ORIF means the fracture is opened, the fragments are seen and reduced under direct vision, and internal hardware holds that reduction. It is a more specific product than the broader fracture-fixation sheet.",
    indication:
      "It may be considered when closed reduction cannot restore a joint surface or alignment, or when the chosen implant requires an open approach.",
    nonCandidate:
      "Fractures that can be nailed or reduced closed, or wounds that first need external fixation, should not be labelled ORIF for convenience.",
    evaluation:
      "CT is common for intra-articular patterns. Soft-tissue swelling may delay the open approach even when the indication is already clear.",
    approaches: [
      { label: "Articular ORIF", detail: "Restores a joint surface with plates and screws under direct vision." },
      { label: "Diaphyseal open reduction", detail: "Used when closed nailing is not suitable." },
      { label: "Staged ORIF after external fixation", detail: "Two theatre events; price them separately unless the letter bundles both." },
    ],
    technique:
      "An incision exposes the fragments, reduction clamps restore anatomy, and plates or screws are applied. Cartilage fragments may need buried implants.",
    duration: "often 1.5–4 hours for intra-articular work",
    ward:
      "Stay follows swelling, pain control and whether a spanning frame preceded the open sitting. The stored stay is [STAY].",
    recovery:
      "Joint fractures often need delayed weight-bearing and supervised motion to limit stiffness. Hardware irritation can appear months later.",
    implantRehab:
      "Anatomic plates and locking screws for a named joint should be specified. A generic fracture package is not an ORIF quote.",
    distinctiveRisks:
      "Wound problems, stiffness, post-traumatic arthritis and the need for later metal removal are particular to open articular work.",
    weightBearing:
      "Articular ORIF is often protected until early radiographs confirm the construct. The restriction is written for the named joint, not copied from a shaft-nail protocol.",
    flyHome:
      "Swelling, wound tension and a safe sitting position matter more than a brochure day. Staged open fractures rarely fly between the frame and the definitive plate.",
    drivers: [
      { label: "Joint-surface comminution", detail: "More fragments mean more theatre time and implants." },
      { label: "Soft-tissue delay", detail: "A spanning frame first is a second procedure." },
      { label: "Anatomic plate systems", detail: "Joint-specific plates cost more than generic trauma sets." },
      { label: "Need for bone graft or substitutes", detail: "May sit outside the first letter." },
      { label: "Later hardware removal", detail: "Ask whether it is contemplated and priced separately." },
    ],
    quoteItems: [
      "Which joint or bone is this ORIF for?",
      "Is a spanning external fixator already done or still required?",
    ],
    documents: ["Injury CT and X-rays", "Photographs or notes of swelling and wounds"],
    followUp:
      "Motion starts when the surgeon judges the fixation and wound safe. Stiffness prevention and healing X-rays run in parallel.",
    related: ["Fracture Fixation", "Non-Union Repair", "Ankle Replacement", "Hand Reconstruction"],
    figureSrc: "/costs/orif-illustration.webp",
    figureAlt: "Illustration of a displaced fracture being aligned and held with internal plates and screws",
    untaggedCities: ["mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Non-Union Repair",
    shortName: "non-union repair",
    briefName: "Non-Union Repair",
    slug: "non-union-repair",
    definition:
      "Non-union repair treats a fracture that has not united in the expected time by improving stability, biology or both — often with revision hardware and bone graft.",
    indication:
      "It may be considered when serial X-rays show no progressive healing, the patient has pain or instability at the old fracture, and infection has been considered.",
    nonCandidate:
      "A delayed union that is still progressing, or an untreated infection, needs a different sequence. Smoking cessation and metabolic work-up may come first.",
    evaluation:
      "Serial X-rays, CT, inflammatory markers and sometimes a bone-infection work-up define atrophic versus hypertrophic non-union and whether hardware is loose.",
    approaches: [
      { label: "Revision fixation and compression", detail: "For hypertrophic non-unions that mainly lacked stability." },
      { label: "Bone grafting with revision hardware", detail: "For atrophic non-unions that need biology as well as stability." },
      { label: "Staged infection treatment", detail: "Debridement and later reconstruction if infection is present." },
    ],
    technique:
      "Old hardware may be removed, the non-union is freshened, graft or substitute is added if planned, and a more stable construct is applied.",
    duration: "often 2–4 hours depending on implant removal and graft harvest",
    ward:
      "Stay is often longer than a simple fracture fixation. The stored stay is [STAY]. Infected pathways can add a second admission.",
    recovery:
      "Protected weight-bearing can last months. Healing is judged on CT or X-rays, not on the date of surgery.",
    implantRehab:
      "Revision nails or plates, graft harvest or substitutes, and any biologic adjunct if used and permitted should be named. They are rarely inside a primary fracture letter.",
    distinctiveRisks:
      "Persistent non-union, infection, graft-site pain and the need for further surgery should be discussed honestly, without a promised union rate.",
    weightBearing:
      "Most reconstructions remain protected until early imaging shows a construct that can take load. The restriction is written for the bone, not copied from the first fracture letter.",
    flyHome:
      "Long-haul travel is often deferred until wounds, graft-site comfort and a safe walking plan exist, especially after staged infection care.",
    drivers: [
      { label: "Infection status", detail: "Infected non-union is a staged pathway." },
      { label: "Graft source", detail: "Iliac-crest harvest, allograft or substitutes change cost and pain." },
      { label: "Revision implant", detail: "Longer nails or locked plates differ from the first construct." },
      { label: "Metabolic and smoking work-up", detail: "May add clinic visits before theatre." },
      { label: "Duration of protected mobilisation", detail: "Hotel and companion time often exceed the hospital stay." },
    ],
    quoteItems: [
      "Is bone graft included, and from which source?",
      "Has infection been excluded in the priced pathway?",
    ],
    documents: ["Serial X-rays from the original injury", "CT of the non-union and prior implant records"],
    followUp:
      "Healing checks are months-long. The home surgeon needs the construct details and weight-bearing rules.",
    related: ["Fracture Fixation", "ORIF (Open Reduction and Internal Fixation)", "Revision Knee Replacement", "Tendon Repair"],
    figureSrc: "/costs/non-union-repair-illustration.webp",
    figureAlt: "Illustration of a bone that failed to heal and conceptual repair with graft and revision hardware",
  },
  {
    procedure: "Carpal Tunnel Release",
    shortName: "carpal tunnel release",
    briefName: "Carpal Tunnel Release",
    slug: "carpal-tunnel-release",
    definition:
      "Carpal tunnel release divides the ligament over the median nerve at the wrist so that night pain, numbness and weakness from compression may improve.",
    indication:
      "It may be considered when typical symptoms persist after splints and activity change, especially if nerve tests show compression or thenar weakness is appearing.",
    nonCandidate:
      "Hand symptoms from neck nerves, untreated medical contributors, or very mild intermittent tingling may stay non-operative. Surgery does not treat every tingling hand.",
    evaluation:
      "Clinical tests are central. Nerve-conduction studies are commonly used. Ultrasound or MRI is reserved for unusual anatomy.",
    approaches: [
      { label: "Open release", detail: "A short palmar incision; the usual reliable method." },
      { label: "Endoscopic release", detail: "A smaller skin scar in selected hands; not automatically cheaper or safer." },
      { label: "Continued non-operative care", detail: "Splints and injection remain options when tests and symptoms are mild." },
    ],
    technique:
      "Under local or regional anaesthesia the ligament is divided under direct or endoscopic vision, taking care of the nerve and palmar structures.",
    duration: "often 15–45 minutes",
    ward:
      "Usually day-care. The stored stay is [STAY]. Bilateral release or combined hand work can change dressing care even if the patient still goes home the same day.",
    recovery:
      "Finger motion starts early. Grip strength and scar sensitivity improve over weeks. Heavy lifting timelines are individualised.",
    implantRehab:
      "There is typically no implant. Endoscopic equipment, if used, should be stated. Combined trigger-finger or other hand work is extra.",
    distinctiveRisks:
      "Scar tenderness, incomplete relief, nerve injury and the rare need for revision should be discussed. Pre-existing nerve damage may leave numbness even after a technically complete release.",
    weightBearing:
      "The hand is used for light activity as comfort allows. Walking is unrestricted; the restriction is grip, vibration and heavy lifting.",
    flyHome:
      "Many patients can travel after a day-care release once dressings are dry. Long flights still need swelling advice and a plan for laptop or suitcase use.",
    drivers: [
      { label: "Open versus endoscopic", detail: "Equipment and facility fees differ." },
      { label: "Bilateral release", detail: "Two sides in one sitting change dressing care and function." },
      { label: "Nerve-conduction tests", detail: "May be billed before the procedure." },
      { label: "Combined hand procedures", detail: "Should be listed separately." },
      { label: "Anaesthesia choice", detail: "Local, block or sedation changes the facility line." },
    ],
    quoteItems: [
      "Is this open or endoscopic, and is nerve testing included?",
      "If both wrists are symptomatic, are they priced together?",
    ],
    documents: ["Nerve-conduction report if already done", "Note of night pain, numbness distribution and thenar weakness"],
    followUp:
      "Scar massage and activity advice are usually enough. Persistent numbness may reflect pre-existing nerve damage rather than a failed release.",
    related: ["Tendon Repair", "Hand Reconstruction", "Arthroscopic Surgery", "Fracture Fixation"],
    figureSrc: "/costs/carpal-tunnel-release-illustration.webp",
    figureAlt: "Illustration of a compressed median nerve at the wrist and conceptual ligament release",
    untaggedCities: ["hyderabad"],
  },
  {
    procedure: "Tendon Repair",
    shortName: "tendon repair",
    briefName: "Tendon Repair",
    slug: "tendon-repair",
    definition:
      "Tendon repair sutures a lacerated or ruptured tendon so that the muscle can again move the finger, wrist or other joint the tendon serves.",
    indication:
      "It may be considered for open lacerations, selected closed ruptures, and after infection is controlled in delayed presentations. Timing is often urgent for open injuries.",
    nonCandidate:
      "A chronic rupture with a large gap, a destroyed pulley system, or a wound that first needs washout may require reconstruction rather than a simple suture. Achilles rupture sits on its own sheet.",
    evaluation:
      "Examination of cascade and strength, X-rays for associated fracture, and a clear description of the wound or rupture site guide the plan.",
    approaches: [
      { label: "Primary tendon suture", detail: "For clean, prompt presentations." },
      { label: "Delayed repair after washout", detail: "Used when the wound is contaminated; it may be a staged admission." },
      { label: "Tendon reconstruction or graft", detail: "For chronic gaps; this is closer to hand reconstruction than a simple suture." },
    ],
    technique:
      "The tendon ends are retrieved and sutured with a core-and-epitendinous technique, then the pulley system is protected. Associated nerve or artery injuries should be listed if treated.",
    duration: "often 45–120 minutes depending on how many tendons and whether nerves are repaired",
    ward:
      "Often day-care or one night. The stored stay is [STAY]. Contaminated wounds and combined nerve repair can lengthen observation.",
    recovery:
      "A protective splint and early protected motion are common. Healing is measured in weeks; heavy gripping is delayed. Therapy visits dominate the trip after a short stay.",
    implantRehab:
      "Suture material is usually modest. Splints, therapy and any nerve repair or graft change the real bill more than the theatre hour.",
    distinctiveRisks:
      "Rupture of the repair, adhesions, infection and the need for later tenolysis should be discussed.",
    weightBearing:
      "Walking is usually unrestricted. The functional restriction is the splinted hand or limb and the written motion protocol.",
    flyHome:
      "Travel is easier once dressings are dry and the splint is fitted. Cabin luggage and laptop use should follow the therapy protocol, not comfort alone.",
    drivers: [
      { label: "Number of tendons and zone", detail: "A single extensor is not priced like multiple flexors in zone II." },
      { label: "Associated nerve or vessel repair", detail: "Microsurgical time is extra." },
      { label: "Splint and hand therapy", detail: "Often the largest post-discharge cost." },
      { label: "Open contaminated wound", detail: "Washout and delayed suture are two events." },
      { label: "Need for graft", detail: "Moves the case toward reconstruction." },
    ],
    quoteItems: [
      "How many tendons are priced, and is nerve repair included?",
      "How many hand-therapy visits are bundled?",
    ],
    documents: ["Wound or rupture description and photographs if available", "X-rays if a foreign body or fracture is possible"],
    followUp:
      "Hand therapy is not optional after most flexor repairs. The home therapist needs the written motion protocol.",
    related: ["Hand Reconstruction", "Carpal Tunnel Release", "Achilles Repair", "Fracture Fixation"],
    figureSrc: "/costs/tendon-repair-illustration.webp",
    figureAlt: "Illustration of a torn tendon and conceptual core suture repair",
  },
  {
    procedure: "Hand Reconstruction",
    shortName: "hand reconstruction",
    briefName: "Hand Reconstruction",
    slug: "hand-reconstruction",
    definition:
      "Hand reconstruction restores function after trauma, tendon loss, nerve injury or deformity when a single release or simple suture is not enough.",
    indication:
      "It may be considered after combined tendon-nerve injuries, failed simple repairs, selected rheumatoid deformity, or staged reconstruction when the wound is ready.",
    nonCandidate:
      "An isolated carpal tunnel or a clean single-tendon laceration belongs on those simpler sheets. Active infection should be controlled first.",
    evaluation:
      "Examination of sensation, cascade and joints, X-rays, and sometimes nerve studies or MRI define what can be reconstructed in one sitting.",
    approaches: [
      { label: "Staged tendon reconstruction", detail: "Silicone rod then graft in selected flexor injuries." },
      { label: "Combined nerve and tendon reconstruction", detail: "Longer theatre time and therapy than a simple suture." },
      { label: "Joint or soft-tissue reconstruction", detail: "Used when deformity or instability is the main problem." },
    ],
    technique:
      "The plan is individual: grafts, transfers, nerve repair or joint procedures are combined only as imaging and examination support. This page cannot specify one sequence.",
    duration: "often 2–5 hours depending on how many structures are reconstructed",
    ward:
      "Stay is often a few nights. The stored stay is [STAY]. Flap or staged work can add a second admission.",
    recovery:
      "Splinting and therapy are prolonged. Function returns over months. International patients should plan a longer nearby stay than for carpal tunnel release.",
    implantRehab:
      "Grafts, rods, plates or joint implants must be named. A hand package without a structure list is not comparable.",
    distinctiveRisks:
      "Stiffness, incomplete function, graft failure and the need for further stages should be expected topics, not surprises.",
    weightBearing:
      "Walking is usually unrestricted. The reconstructed hand remains protected in a splint; the protocol is written for the structures repaired.",
    flyHome:
      "Travel should wait until wounds, flaps if used, and a fitted splint are reviewed. Cabin baggage and laptop work need a written therapy plan.",
    drivers: [
      { label: "Number of stages", detail: "Rod-then-graft pathways are two admissions." },
      { label: "Microsurgical nerve work", detail: "Adds time and magnification resources." },
      { label: "Implants or rods", detail: "Must appear as named lines." },
      { label: "Therapy intensity", detail: "Daily therapy near the campus can exceed the hospital fee." },
      { label: "Skin or flap needs", detail: "Soft-tissue cover is a different reconstructive event." },
    ],
    quoteItems: [
      "Which structures will be reconstructed in this admission?",
      "Is this a one-stage or two-stage plan?",
    ],
    documents: ["Prior operative notes and photographs", "Nerve studies if already performed"],
    followUp:
      "Therapy and staged reviews are the treatment after the stitches. The home hand therapist needs the protocol and any implant record.",
    related: ["Tendon Repair", "Carpal Tunnel Release", "Fracture Fixation", "ORIF (Open Reduction and Internal Fixation)"],
    figureSrc: "/costs/hand-reconstruction-illustration.webp",
    figureAlt: "Illustration of an injured hand and a conceptual reconstruction of tendons or joints",
    untaggedCities: ["bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Ankle Replacement",
    shortName: "ankle replacement",
    briefName: "Ankle Replacement",
    slug: "ankle-replacement",
    definition:
      "Ankle replacement resurfaces the worn tibia and talus with a mobile or fixed-bearing implant so that a stiff, painful arthritic ankle can move through a prosthetic joint rather than a fusion.",
    indication:
      "It may be considered for advanced ankle arthritis with enough bone and alignment to support an implant, after counselling about fusion as the alternative.",
    nonCandidate:
      "Severe deformity, poor bone, neuropathy, active infection or a patient who would be better served by fusion should not be forced into replacement.",
    evaluation:
      "Standing ankle and alignment X-rays, often CT, and a discussion of neighbouring joints (subtalar, midfoot) precede implant choice.",
    approaches: [
      { label: "Primary total ankle replacement", detail: "For selected arthritis with correctable alignment." },
      { label: "Ankle fusion", detail: "Still the honest alternative for many patterns; it is not priced on this sheet." },
      { label: "Revision ankle replacement", detail: "A different implant and bone-loss problem if a prior implant failed." },
    ],
    technique:
      "Through an anterior or other planned approach the surgeon cuts the tibia and talus to the implant plan and seats the components, correcting alignment as designed.",
    duration: "often 2–3 hours for a primary replacement",
    ward:
      "Stay is often several nights. The stored stay is [STAY]. Wound watch on the anterior incision can extend observation.",
    recovery:
      "A period of protected weight-bearing in a boot or cast is common. Swelling lasts weeks. Fitness to fly needs wound and swelling review.",
    implantRehab:
      "Ankle implants are a specialised product. Confirm brand class, whether additional osteotomies are included, and that fusion is not what was actually priced.",
    distinctiveRisks:
      "Wound problems, loosening, bearing wear, adjacent-joint arthritis and the possible later conversion to fusion should be discussed without generic success figures.",
    weightBearing:
      "Protected weight-bearing in a boot or cast is common until early radiographs are reviewed. This is not a walk-the-same-day hip protocol.",
    flyHome:
      "Swelling and the anterior wound make early long-haul flights a poor plan. Cabin space for a boot and a clot-prevention discussion should precede tickets.",
    drivers: [
      { label: "Implant system", detail: "Specialised ankle implants dominate the material line." },
      { label: "Alignment osteotomies", detail: "Extra cuts or fusions of neighbouring joints change the episode." },
      { label: "Prior infection or hardware", detail: "Removal and staging add theatre events." },
      { label: "CT planning", detail: "May sit outside the surgical letter." },
      { label: "Protected-weight-bearing stay", detail: "Hotel time with a boot can exceed the ward stay." },
    ],
    quoteItems: [
      "Which ankle implant is assumed?",
      "Are alignment osteotomies or subtalar work included?",
    ],
    documents: ["Standing ankle and alignment X-rays", "CT if already performed"],
    followUp:
      "Wound watch is important because the anterior incision can be slow to settle. X-rays and boot weaning are staged.",
    related: ["Bunion Surgery", "Achilles Repair", "Total Knee Replacement", "ORIF (Open Reduction and Internal Fixation)"],
    figureSrc: "/costs/ankle-replacement-illustration.webp",
    figureAlt: "Illustration of a worn ankle joint and conceptual ankle replacement implants",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Bunion Surgery",
    shortName: "bunion surgery",
    briefName: "Bunion Surgery",
    slug: "bunion-surgery",
    definition:
      "Bunion surgery realigns the first metatarsal and great toe when a hallux valgus deformity causes pain, shoe conflict or lesser-toe problems that no longer respond to footwear change.",
    indication:
      "It may be considered for painful bunions after wider shoes, orthoses and activity change fail, when X-rays show a deformity that an osteotomy or fusion can correct.",
    nonCandidate:
      "A painless bump treated only for appearance, or a foot that mainly needs medical management of swelling, should not be operated on from a brochure photograph.",
    evaluation:
      "Standing foot X-rays measure angles. Circulation, neuropathy and lesser-toe deformity change the osteotomy or fusion choice.",
    approaches: [
      { label: "Distal or shaft osteotomy", detail: "For moderate deformities with a congruent joint." },
      { label: "Proximal osteotomy or tarsometatarsal fusion (Lapidus)", detail: "For larger angles or instability of the first ray." },
      { label: "Lesser-toe procedures", detail: "Added when claw or crossover toes are part of the same painful foot." },
    ],
    technique:
      "The surgeon cuts and realigns bone, tightens or loosens soft tissue, and fixes the correction with screws or a plate. Dressings and a postoperative shoe protect the osteotomy.",
    duration: "often 45–120 minutes; added lesser-toe work extends this",
    ward:
      "Often day-care or one night. The stored stay is [STAY]. Bilateral correction changes walking help even if the patient still leaves the same day.",
    recovery:
      "A postoperative shoe or boot is usual. Swelling lasts weeks to months. Flights and long walks should wait for wound and swelling advice.",
    implantRehab:
      "Screws, plates and any lesser-toe implants should be named. Bilateral surgery is a different functional recovery, not two cheap copies.",
    distinctiveRisks:
      "Recurrence, stiffness, transfer pain, prominent hardware and delayed bone healing should be discussed.",
    weightBearing:
      "Heel-weight-bearing in a postoperative shoe is common; some fusions remain more protected. The written rule follows the osteotomy, not comfort in the hotel.",
    flyHome:
      "Swelling on a long flight can undo a tidy wound. Travel is easier once dressings are dry and the postoperative shoe is fitted.",
    drivers: [
      { label: "Osteotomy versus Lapidus fusion", detail: "Different hardware and healing times." },
      { label: "Lesser-toe work", detail: "Adds theatre time and extra shoes or pins." },
      { label: "Bilateral correction", detail: "Walking help and hotel needs change." },
      { label: "Bone quality", detail: "May require different fixation." },
      { label: "Postoperative shoe period", detail: "Companion support matters more than the short stay." },
    ],
    quoteItems: [
      "Which osteotomy or fusion is priced?",
      "Are lesser toes included, and is this one foot or both?",
    ],
    documents: ["Standing foot X-rays", "Note of footwear trial and pain location"],
    followUp:
      "Suture care, swelling control and a staged return to normal shoes are the aftercare. Recurrence risk is not removed by paying more.",
    related: ["Ankle Replacement", "Achilles Repair", "Fracture Fixation", "Tendon Repair"],
    figureSrc: "/costs/bunion-surgery-illustration.webp",
    figureAlt: "Illustration of a hallux valgus bunion and a conceptually realigned first toe",
    untaggedCities: ["bengaluru", "chennai"],
  },
  {
    procedure: "Achilles Repair",
    shortName: "Achilles repair",
    briefName: "Achilles Repair",
    slug: "achilles-repair",
    definition:
      "Achilles repair sutures a ruptured Achilles tendon so that push-off strength can be restored, when the team judges that an operation rather than functional bracing is appropriate.",
    indication:
      "It may be considered for complete ruptures in patients who need strong push-off, delayed presentations with a gap, or failed non-operative care. Many acute ruptures can also be treated in a boot.",
    nonCandidate:
      "A partial tear, a patient who chooses functional bracing, or a chronic gap that needs reconstruction rather than end-to-end suture requires a different plan.",
    evaluation:
      "Examination (gap, Thompson test) and ultrasound or MRI confirm completeness and gap size. Timing from injury changes the technique.",
    approaches: [
      { label: "Open end-to-end repair", detail: "For many acute complete ruptures." },
      { label: "Minimally invasive or percutaneous repair", detail: "Selected techniques with different sural-nerve counselling." },
      { label: "Reconstruction for chronic rupture", detail: "May need a graft or V-Y advancement; not an acute-repair package." },
    ],
    technique:
      "The tendon ends are approximated and sutured, sometimes through a smaller incision. The ankle is then protected in a splint or boot with a planned movement protocol.",
    duration: "often 45–90 minutes for an acute repair; reconstructions take longer",
    ward:
      "Often one night. The stored stay is [STAY]. Wound-risk patients and reconstructions can stay longer.",
    recovery:
      "A boot with heel wedges or a cast is common. Weight-bearing is staged. Running is months away. Wound problems over the Achilles need prompt review.",
    implantRehab:
      "Suture anchors or a graft for chronic reconstruction should be named. A boot is part of the real cost even if the hospital stay is short.",
    distinctiveRisks:
      "Re-rupture, wound breakdown, sural-nerve irritation and calf weakness should be discussed. Non-operative care has its own re-rupture discussion.",
    weightBearing:
      "Staged weight-bearing in a boot with wedges is common. The protocol is written to protect the suture, not to match a comfortable hotel walk.",
    flyHome:
      "A long flight with the foot unsupported in a dangling position is a poor early plan. The team should advise on boot wear, seat space and clot prevention.",
    drivers: [
      { label: "Acute versus chronic gap", detail: "Reconstruction is a different product." },
      { label: "Open versus percutaneous technique", detail: "Implants and nerve-risk counselling differ." },
      { label: "Boot and wedge protocol", detail: "Often purchased or billed separately." },
      { label: "Wound-risk factors", detail: "Diabetes or smoking can extend stay and dressings." },
      { label: "Physiotherapy length", detail: "Calf strength recovery is months, not the overnight stay." },
    ],
    quoteItems: [
      "Is this an acute repair or a chronic reconstruction?",
      "Is the functional boot included?",
    ],
    documents: ["Ultrasound or MRI of the Achilles", "Date of injury and any boot treatment already started"],
    followUp:
      "Boot weaning and eccentric strengthening are supervised. Sudden pop or wound drainage needs urgent local review.",
    related: ["Tendon Repair", "Bunion Surgery", "Ankle Replacement", "Fracture Fixation"],
    figureSrc: "/costs/achilles-repair-illustration.webp",
    figureAlt: "Illustration of an Achilles tendon rupture and conceptual suture repair",
    untaggedCities: ["bengaluru"],
  },
];

export const orthopedicsArticles: CostArticle[] = profiles.map(createOrthopedicsArticle);

export const orthopedicsArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  orthopedicsArticles.map((article) => [article.slug, article]),
);
