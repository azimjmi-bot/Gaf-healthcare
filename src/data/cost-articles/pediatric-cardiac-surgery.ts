import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type CardiacProfile = {
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
  icu: string;
  recovery: string;
  distinctiveRisks: string;
  drivers: LabelledDetail[];
  quoteItems: string[];
  documents: string[];
  followUp: string;
  related: string[];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; logistics: string; planning: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    logistics:
      "Delhi NCR spans Delhi, Gurugram, Noida and Faridabad. Confirm the exact operating campus before choosing accommodation: cross-region traffic can make daily ICU visits impractical. Winter air quality and summer heat may also affect a child's outdoor recovery plan.",
    planning:
      "An international family should allow a rest and assessment interval after arrival rather than scheduling an operation after an overnight flight.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are separated accommodation markets. Stay on the same side of the harbour as the confirmed campus, allow for peak-hour transfers, and add monsoon travel slack when relevant.",
    planning:
      "A map distance can understate travel time; early follow-up is easier from lodging close to the treating campus.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport is north of Bengaluru while many hospital districts are south or east. Do not reserve an airport-area hotel as a recovery base until the treating campus is confirmed; road transfers may be lengthy.",
    planning:
      "Milder weather can simplify a long family stay, but it says nothing about congenital-heart capability or appointment availability.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Airport access can be comparatively direct for several hospital districts, but lodging should still follow the confirmed campus. Air-conditioned accommodation, hydration and reduced outdoor exposure matter during hotter months.",
    planning:
      "Families using regional air links should preserve time for repeat imaging and anaesthetic assessment before any planned procedure.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of the main hospital districts, including Jubilee Hills, Kondapur and Secunderabad. Those areas are not interchangeable; choose a serviced stay only after the quotation names its campus.",
    planning:
      "Build airport-transfer time and a rest day into the plan, then remain near the hospital for the first post-discharge review.",
  },
};

const PROCEDURE_FIGURES: Record<string, { src: string; alt: string }> = {
  "vsd-closure-ventricular-septal-defect": {
    src: "/costs/vsd-closure-heart-illustration.webp",
    alt: "Illustration showing a ventricular septal opening and the concept of VSD closure",
  },
  "tof-repair-tetralogy-of-fallot": {
    src: "/costs/tof-repair-heart-illustration.webp",
    alt: "Illustration of tetralogy of Fallot anatomy and the concept of complete repair",
  },
  "glenn-procedure": {
    src: "/costs/glenn-procedure-illustration.webp",
    alt: "Illustration showing the upper-body venous pathway created by a Glenn procedure",
  },
  "fontan-procedure": {
    src: "/costs/fontan-procedure-illustration.webp",
    alt: "Illustration showing the lower-body venous pathway created by a Fontan procedure",
  },
  "arterial-switch-operation": {
    src: "/costs/arterial-switch-heart-illustration.webp",
    alt: "Illustration showing transposed great arteries and their reconnection during an arterial switch",
  },
  "pda-closure-patent-ductus-arteriosus": {
    src: "/costs/pda-closure-heart-illustration.webp",
    alt: "Illustration showing a patent ductus arteriosus and the concept of PDA closure",
  },
  "norwood-procedure": {
    src: "/costs/norwood-procedure-illustration.webp",
    alt: "Illustration showing the circulation pathway created during a Norwood procedure",
  },
  "coarctation-repair": {
    src: "/costs/coarctation-repair-illustration.webp",
    alt: "Illustration showing a narrowed aortic arch before and after coarctation repair",
  },
  "avsd-repair-atrioventricular-septal-defect": {
    src: "/costs/avsd-repair-heart-illustration.webp",
    alt: "Illustration showing an atrioventricular septal defect and the concept of AVSD repair",
  },
  "tapvc-repair-total-anomalous-pulmonary-venous-connection": {
    src: "/costs/tapvc-repair-heart-illustration.webp",
    alt: "Illustration showing anomalous pulmonary veins reconnected to the left atrium during TAPVC repair",
  },
  "pediatric-heart-transplantation": {
    src: "/costs/pediatric-heart-transplant-illustration.webp",
    alt: "Illustration of donor matching, transplantation and follow-up in a pediatric heart transplant pathway",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band; a named congenital-heart team must review the child's records before issuing a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Case- and stage-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm the exact pediatric program, procedure, ICU assumptions and whether implants or staged care are included.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Case- and stage-dependent",
    positioning: "Private international hospitals",
    context:
      "International coordination may be available, but congenital anatomy and pediatric intensive-care support require written confirmation.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Case- and stage-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf families; specialist, facility and ICU charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Case- and stage-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for an international self-pay estimate tied to the exact congenital diagnosis rather than a general cardiac package.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Case- and stage-dependent",
    positioning: "European congenital-heart care",
    context:
      "International access, professional billing and post-discharge arrangements vary by center and should be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Case- and stage-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas families should verify eligibility, the treating unit and whether investigations and follow-up are separately charged.",
  },
  {
    country: "United States",
    stay: "Case- and stage-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, anesthesia, imaging, ICU and follow-up may be billed by different entities; [US_COST] is a comparison range, not one bundled quote.",
  },
];

function makeCities(profile: CardiacProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    return {
      citySlug,
      ecosystem:
        `${place.city} has pediatric and cardiac listings in the wider GAF directory, but this article does not infer that every listed institution performs ${profile.shortName}. ` +
        "Only dynamically resolved procedure relationships should produce clinician or hospital cards, and a card is not a ranking or capability guarantee.",
      logistics: `${place.airport}: ${place.logistics}`,
      costNote:
        `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital supplies an itemized case estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Doctors & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Review clinical pathway, quote terms and international-family logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} The [INDIA_COST] figure is a national planning range, not a ${place.city} tariff; anatomy, physiology, urgency and intensive-care needs determine the written plan.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${place.planning}`,
          `The directory must dynamically resolve a clinician and exact campus for ${profile.shortName}. Broad cardiac or pediatric labels do not establish that a team offers this operation, has an appropriate ICU bed, or accepts the child.`,
          "Send actual imaging and prior operative records before making non-refundable arrangements. A remote opinion may change after examination and repeat testing.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored for trip planning. This is not a guaranteed package or a city-specific price.`,
          `${profile.icu} ${profile.recovery}`,
        ],
        costExplanation: [
          `The national band can move with ${profile.drivers
            .slice(0, 3)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. It should not be divided into an invented daily or city tariff.`,
          "Ask the hospital to identify the surgeon or proceduralist, exact campus, planned operation, anesthesia, blood products, ICU and ward nights, routine imaging, exclusions and extra-day policy.",
          `Outside the hospital estimate, budget for travel through ${place.airport}, parent lodging close to the campus, local transport, meals, medicines and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send imaging, clinical notes and the child's current status before booking travel to ${place.city}.`,
          `Arrive with enough time for pediatric cardiology, surgical and anesthesia review; ${place.planning}`,
          "Remain close to the hospital after discharge and travel only when the treating team has assessed fitness to fly.",
        ],
        hospitalDiscussion: [
          `Hospital cards for ${place.city} should appear only through live GAF relationships to ${profile.procedure}; the article itself names no provider and makes no volume or outcome claim.`,
          "Confirm congenital-heart staffing, pediatric anesthesia, postoperative ICU, escalation arrangements and the actual operating campus in writing. General accreditation does not answer those case-specific questions.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored; the final amount follows record review and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} doctors perform ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure should be shown. Verify role, current appointment, operating campus and experience relevant to the child's anatomy; placement is not a ranking.",
          },
          {
            q: `Which hospital in ${place.city} should a family choose?`,
            a: "There is no universal best hospital. Compare the named team, pediatric ICU and anesthesia plan, exact campus, quote boundaries and continuity after discharge.",
          },
          {
            q: `Where should a family stay in ${place.city}?`,
            a: `${place.logistics} Keep bookings flexible until the admission and early review dates are confirmed.`,
          },
          {
            q: "When can the child fly home?",
            a: "There is no universal flight date. The treating team must review oxygenation, feeding, wounds, rhythm, imaging and any drains or medicines before clearing travel.",
          },
        ],
      },
    };
  });
}

function createPediatricCardiacArticle(profile: CardiacProfile): CostArticle {
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
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare the clinical pathway, ICU planning, quote checklist, cities and international-family logistics.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay; the treating congenital-heart team must determine timing, approach and travel suitability.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} The actual image files and physiological data matter more than a diagnosis written on a travel inquiry.`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep the article synchronized with the cost registry. They are not quotations, outcome forecasts or evidence that a particular center can accept the case.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored international-family stay is [STAY], but urgency, preoperative stabilization, intensive care and discharge readiness can make an individual pathway shorter or longer.`,
      `${profile.technique} Commonly discussed pathways include ${approachSummary}. A qualified pediatric congenital-heart team chooses among them; this page does not recommend an operation.`,
      `${profile.icu} ${profile.recovery} Return flights and activity dates should remain flexible until the child is examined after treatment.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include the scheduled procedure, professional fees, operating room or catheter laboratory, anesthesia and a defined ICU and ward allowance. It does not establish what one hospital will charge.`,
      `Clinically important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change in physiology or planned work is not a cosmetic package upgrade; it may represent a materially different episode of care.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range. Until a verified city figure exists, compare named teams and written inclusions while keeping family travel costs separate.",
    ],
    costComponents: [
      {
        label: "Congenital-heart review",
        detail:
          `Pediatric cardiology and surgical review of imaging, physiology, previous procedures and the indication for ${profile.shortName}.`,
      },
      {
        label: "Preoperative investigations",
        detail:
          `The baseline work-up follows the case: ${profile.evaluation} Confirm which tests are included and which are conditional.`,
      },
      {
        label: "Operating room, catheter laboratory and consumables",
        detail:
          "The estimate should state the planned approach, bypass or catheter resources, implants or conduits where relevant, and what happens if the plan changes.",
      },
      {
        label: "Pediatric anesthesia and perfusion",
        detail:
          "Ask whether anesthesia, invasive monitoring, cardiopulmonary bypass and perfusion are included where clinically applicable.",
      },
      {
        label: "Cardiac ICU and ward",
        detail:
          `${profile.icu} The quote should specify included ICU, ventilation and ward days rather than relying only on [STAY].`,
      },
      {
        label: "Medicines, blood products and imaging",
        detail:
          "Confirm routine versus high-cost medicines, blood components, laboratory monitoring, echocardiography and discharge prescriptions.",
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} pathway. Compare anatomy, operative scope, urgency, named campus and clinician, implants, bypass, ICU assumptions, blood products, imaging and exclusions line by line. A higher amount does not prove a better outcome.`,
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
          `The estimate should use the exact name ${profile.procedure} and identify associated work rather than say only “heart surgery.”`,
      },
      {
        label: "Theater, anesthesia and perfusion",
        detail:
          "Professional and facility fees for the scheduled episode, with bypass and invasive monitoring stated where relevant.",
      },
      {
        label: "Quoted ICU and ward allowance",
        detail:
          "Room category and included ventilation, cardiac ICU and ward days; [STAY] is a trip-planning token, not an inclusion promise.",
      },
      {
        label: "Routine inpatient monitoring",
        detail:
          "Laboratory tests, echocardiography, medicines, dressings and discharge documentation only to the extent written in the quote.",
      },
    ],
    exclusions: [
      {
        label: "Additional anatomy or physiology testing",
        detail:
          "Repeat echo, CT, MRI, catheterization, genetic work-up or specialist consultations may be additional when indicated.",
      },
      {
        label: "Associated or revised procedures",
        detail:
          "Work beyond the documented operative plan, including an unplanned catheter or reoperation, is not automatically bundled.",
      },
      {
        label: "Extended intensive care",
        detail:
          "Extra ventilation, circulatory support, dialysis, infection care, blood products or additional ICU and ward days generally alter the bill.",
      },
      {
        label: "Later surveillance and medicines",
        detail:
          `${profile.followUp} Confirm what occurs after the first postoperative visit and what can be transferred home.`,
      },
      {
        label: "Travel and family living costs",
        detail:
          "Flights, visas, parent accommodation, meals, local transport and schedule changes are normally outside the hospital estimate.",
      },
    ],
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} These are clinical pathways, not consumer upgrades.`,
        "The receiving team should explain why its proposed route fits the child's current anatomy and physiology, and what finding could change that route after arrival.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by anatomy, physiology and stage",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Recommended?`,
    overview: {
      what: [profile.definition, profile.technique],
      who: [profile.indication, profile.nonCandidate],
      how: [
        profile.technique,
        `The listed procedural forms are ${approachSummary}. The sequence, incision, bypass strategy, implants and associated repairs depend on the child's anatomy.`,
        `${profile.icu} Monitoring commonly includes circulation, oxygenation, rhythm, urine output, bleeding, neurological status, feeding and imaging as relevant.`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete records rather than screenshots or a one-line report.`,
        "The receiving team sets fasting and medication instructions. Report fever, respiratory symptoms, infection, feeding deterioration or a change in oxygen saturation promptly; these may alter timing.",
      ],
      recovery: [
        `${profile.icu} ${profile.recovery}`,
        `The catalog's [STAY] is for broad planning, not a discharge promise. Drainage, oxygen need, feeding, wound healing, rhythm and repeat imaging can affect the actual stay.`,
        profile.distinctiveRisks,
        `${profile.followUp} Families need a written handover, emergency contacts and a local pediatric cardiology plan.`,
        "Seek urgent clinical help for breathing difficulty, blue or unusually pale color, fainting, persistent fever, wound concerns, poor feeding, marked lethargy, reduced urine, new swelling or any warning sign specified at discharge.",
      ],
    },
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes much more than the [INDIA_COST] hospital planning band. Add remote review, tests not bundled, parent travel, lodging, local transport, medicines and contingency for extra nights.`,
        "Travel should follow a written clinical acceptance and itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and stability review",
          detail:
            "Share imaging, current observations, symptoms, growth or feeding, medicines, prior procedures and the referring clinician's question.",
        },
        {
          label: "Multidisciplinary planning",
          detail:
            "Pediatric cardiology, congenital surgery, anesthesia and intensive-care teams clarify indication, timing, approach and whether commercial travel is appropriate.",
        },
        {
          label: "Itemized estimate and logistics",
          detail:
            "Match the exact procedure to included tests, implants, bypass, ICU and ward days, exclusions, escalation rates and parent accommodation.",
        },
        {
          label: "Arrival and reassessment",
          detail:
            "Allow time for examination, repeat imaging, blood tests and anesthesia review; consent should include alternatives and child-specific uncertainty.",
        },
        {
          label: "Procedure and monitored recovery",
          detail: `${profile.technique} ${profile.icu}`,
        },
        {
          label: "Discharge, nearby review and handover",
          detail:
            `${profile.recovery} Travel only after review and carry the operative note, imaging, medicine plan and follow-up schedule.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete records",
        detail:
          "Provide actual imaging, reports, current clinical observations, medicines and all prior catheter or operative notes.",
      },
      {
        label: "Confirm clinical acceptance",
        detail:
          "A named congenital-heart team reviews diagnosis, urgency, stage, travel safety and the likely intervention.",
      },
      {
        label: "Hold a remote family discussion",
        detail:
          "Ask why treatment is indicated now, what alternatives exist, what remains uncertain and who will lead care.",
      },
      {
        label: "Compare itemized quotations",
        detail:
          "Use the same operative scope and ICU assumptions; do not compare a partial estimate with a comprehensive episode.",
      },
      {
        label: "Plan flexible travel",
        detail:
          "Obtain required documents, refundable flights and lodging near the exact campus, with contingency for a longer stay.",
      },
      {
        label: "Repeat assessment after arrival",
        detail:
          "The child is examined and undergoes indicated imaging, laboratory and anesthesia review before final consent.",
      },
      {
        label: "Treatment and pediatric cardiac ICU",
        detail:
          "Care follows the agreed approach, with escalation according to the child's condition rather than package limits.",
      },
      {
        label: "Step down and prepare discharge",
        detail:
          "Parents learn medicine, feeding, wound, activity and warning-sign instructions and receive written records.",
      },
      {
        label: "Complete local review",
        detail:
          "Remain nearby until the team reviews recovery and explicitly discusses fitness for travel.",
      },
      {
        label: "Continue care at home",
        detail:
          `Transfer records to the child's local clinician. ${profile.followUp}`,
      },
    ],
    documents: [
      ...profile.documents,
      "Most recent echocardiogram report and complete image loops or DICOM files",
      "ECG and any rhythm-monitor, catheterization, CT or MRI records",
      "Current medication list, allergies, vaccination history and recent laboratory results",
      "Growth, feeding, oxygen-saturation and symptom history",
      "All prior cardiac operative notes, discharge summaries and implant details",
      "Passport and guardian documentation required for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official tariffs or evidence of availability.",
      "International comparisons are easily distorted when operative scope, stage, implants, ICU assumptions and follow-up differ. Obtain like-for-like written estimates after record review.",
    ],
    destinationNote:
      "All figures are planning information. Currency, anatomy, urgency, clinical course, hospital terms and length of stay can change the final amount; no row predicts outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] until verified city-level data is stored. Their overlays focus on genuinely different airport, geography and family-stay logistics.",
      "Clinician and hospital cards must resolve dynamically from current data. This module names no provider, makes no capability assumption and offers no ranking.",
    ],
    whyIndia: [
      "Some international families evaluate India for access to a named pediatric congenital-heart team and a self-pay planning band below typical United States figures. Cost alone is not a reason to move a child.",
      "The key questions are clinical acceptance, appropriate pediatric anesthesia and intensive care, the proposed team's relevance to the anatomy, and continuity after return. These require direct written confirmation.",
      "No hospital or clinician is described as best. An unstable newborn or child may be unsafe to fly, and established funded care near home may be more appropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what alternatives were considered?`,
      "Which anatomy, physiology or previous-stage finding drives the plan?",
      "Who will perform the procedure, and at which exact campus?",
      "Does the quotation use the exact treatment name and list associated work?",
      "Which investigations must be repeated after arrival, and are they included?",
      "Are pediatric anesthesia, perfusion and blood products included where relevant?",
      "How many ventilation, cardiac ICU and ward days are included?",
      "Which implants, patches, conduits, devices or special medicines are assumed?",
      "What finding could change the approach or require an additional procedure?",
      "How are extra ICU days, reintervention, infection care or other complications billed?",
      "What room category is quoted, and can a parent remain nearby?",
      "Which discharge imaging, medicines and first follow-up are included?",
      "What warning signs and local emergency plan should the family use?",
      "When will the team assess fitness to fly, and what follow-up is needed at home?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; anatomy, urgency, operative scope, ICU support and hospital terms determine the final amount.`,
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
        a: `${profile.nonCandidate} Timing and approach require individualized congenital-heart review.`,
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
        a: `${profile.duration} This is an orientation only; associated work and the child's condition can extend the episode.`,
      },
      {
        q: "Will the child need pediatric cardiac intensive care?",
        a: profile.icu,
      },
      {
        q: "How long is recovery?",
        a: `${profile.recovery} The stored stay is [STAY], but discharge and travel dates remain individualized.`,
      },
      {
        q: "What can make the quotation change?",
        a: `Important drivers include ${profile.drivers
          .map((item) => item.label.toLowerCase())
          .join(", ")}. Ask for each change in writing.`,
      },
      {
        q: "Are complications and extra ICU days included?",
        a: "Only if the itemized estimate says so. Ask how ventilation, circulatory support, blood products, infection care, reintervention and days beyond the allowance are billed.",
      },
      {
        q: "How should an international family choose a team?",
        a: "Verify the proposed clinician's role, relevance to the child's anatomy and stage, exact campus, pediatric ICU and anesthesia support, communication and handover plan. Directory placement is not a ranking.",
      },
      {
        q: "Can the child fly soon after treatment?",
        a: "There is no universal safe date. The treating team must assess circulation, oxygenation, feeding, wounds, rhythm and imaging before clearing travel.",
      },
      {
        q: "What follow-up is required?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `Doctors to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} Doctors in [CITY]`,
    doctorIntro:
      `Profiles should be pulled dynamically only when ${profile.procedure} appears in the clinician's current procedure relationships. Verify role, case relevance, availability and campus. Placement is not a ranking, and this article adds no experience or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships, not names embedded in editorial copy. Accreditation or a general cardiac label does not prove current pediatric congenital capability, ICU availability, case acceptance or outcomes.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: PROCEDURE_FIGURES[profile.slug].src,
        alt: PROCEDURE_FIGURES[profile.slug].alt,
        caption:
          "A general educational illustration, not the anatomy or recommended treatment of a specific child.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/costs/pediatric-cardiac-treatment-pathway.webp",
        alt: `Illustration of evaluation, treatment, intensive care and follow-up for ${profile.shortName}`,
        caption:
          "Postoperative support and duration depend on physiology and clinical course; this image does not imply an outcome.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/pediatric-cardiac-international-journey.webp",
        alt: `International family records, travel and follow-up journey for ${profile.shortName}`,
        caption:
          "Clinical acceptance and records review come before travel; treatment and fitness to fly are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const profiles: CardiacProfile[] = [
  {
    procedure: "VSD Closure (Ventricular Septal Defect)",
    shortName: "VSD closure",
    briefName: "VSD Closure",
    slug: "vsd-closure-ventricular-septal-defect",
    definition:
      "VSD closure seals an opening between the heart's pumping chambers to reduce an important left-to-right shunt or address another accepted indication.",
    indication:
      "Closure may be considered for heart failure symptoms, poor growth, left-heart enlargement, significant shunting, aortic-valve involvement, prior endocarditis or associated lesions; small restrictive defects may only need surveillance.",
    nonCandidate:
      "Severe irreversible pulmonary vascular disease, a tiny clinically insignificant defect, active infection or anatomy requiring a broader repair may alter or preclude isolated closure.",
    evaluation:
      "Echocardiography should define muscular, perimembranous, inlet or outlet location, size, shunt effect, ventricular function, pulmonary pressure, aortic-valve relation and associated lesions; catheter pressure measurement is selective.",
    approaches: [
      { label: "Surgical patch closure", detail: "Common for significant perimembranous, inlet or outlet defects and when associated repair is needed." },
      { label: "Catheter device closure", detail: "Considered for selected muscular or other suitable defects after careful assessment of valves and conduction tissue." },
      { label: "Observation or staged management", detail: "Small defects may be watched; very small infants with complex physiology may need individualized timing or palliation." },
    ],
    technique:
      "Surgery generally uses cardiopulmonary bypass and a patch; selected anatomies may permit transcatheter device closure without sternotomy.",
    duration: "often 3–5 hours for surgical closure; catheter pathways vary with anatomy",
    icu: "Surgical closure commonly requires pediatric cardiac ICU monitoring for rhythm, residual shunt, ventricular function, pulmonary pressure and bleeding.",
    recovery:
      "Uncomplicated catheter recovery may be relatively short; sternotomy recovery usually requires several protected weeks, with feeding and weight gain followed closely.",
    distinctiveRisks:
      "Discussion should include residual shunt, conduction block or pacemaker need, valve injury, pulmonary hypertensive events, ventricular dysfunction, bleeding and infection without assigning generic probabilities.",
    drivers: [
      { label: "VSD type and relation to valves", detail: "Perimembranous, muscular, inlet and outlet defects require different access and protection of conduction tissue and valves." },
      { label: "Shunt and pulmonary pressure", detail: "Heart failure or elevated pulmonary vascular resistance can increase investigation and ICU needs." },
      { label: "Surgery versus device", detail: "Bypass and ICU use differ from catheter-lab, device and imaging resources." },
      { label: "Associated repair", detail: "Aortic valve, arch or additional septal work changes scope." },
      { label: "Age, weight and nutrition", detail: "Small size, respiratory illness and poor growth affect anesthesia and recovery." },
    ],
    quoteItems: ["If device closure is proposed, which device and imaging assumptions are included?", "How will conduction and aortic-valve function be monitored?"],
    documents: ["Serial echocardiograms showing chamber size and pulmonary-pressure estimates"],
    followUp: "Follow-up commonly assesses rhythm, residual flow, valve function, ventricular size, feeding and growth; device or surgical teams set the schedule.",
    related: ["ASD Closure (Atrial Septal Defect)", "PDA Closure (Patent Ductus Arteriosus)", "AVSD Repair (Atrioventricular Septal Defect)", "TOF Repair (Tetralogy of Fallot)"],
  },
  {
    procedure: "TOF Repair (Tetralogy of Fallot)",
    shortName: "TOF repair",
    briefName: "TOF Repair",
    slug: "tof-repair-tetralogy-of-fallot",
    definition:
      "TOF repair addresses a ventricular septal defect and obstruction from the right ventricle to the lungs in tetralogy of Fallot, with the operative plan tailored to pulmonary-valve and artery anatomy.",
    indication:
      "Complete repair is generally planned in infancy, but oxygen saturation, cyanotic spells, growth, pulmonary arteries, coronary anatomy and prior shunt or stent influence timing and urgency.",
    nonCandidate:
      "A small or unstable infant, unfavorable pulmonary arteries, important coronary anatomy or another complex feature may lead to palliation or a modified plan before complete repair.",
    evaluation:
      "Echo defines VSD, outflow obstruction, pulmonary annulus and branches, ventricular function and associated findings; CT or catheterization may clarify pulmonary arteries, collaterals or coronary anatomy in selected cases.",
    approaches: [
      { label: "Valve-sparing complete repair", detail: "Relieves obstruction while preserving the pulmonary valve when anatomy permits." },
      { label: "Transannular-patch repair", detail: "Enlarges a small outflow tract across the annulus, accepting different long-term pulmonary-valve implications." },
      { label: "Conduit or staged palliation", detail: "A conduit, systemic-to-pulmonary shunt or outflow stent may be discussed for selected anatomy or physiology." },
    ],
    technique:
      "Complete repair usually closes the VSD and relieves right-ventricular outflow obstruction on bypass; valve-sparing, transannular-patch and conduit strategies are not interchangeable.",
    duration: "often 4–7 hours, longer when pulmonary arteries or prior palliation require additional work",
    icu: "The ICU watches right-ventricular function, oxygenation, rhythm, low cardiac output, bleeding and ventilation; some children need a longer support period.",
    recovery:
      "Hospital recovery follows hemodynamics, rhythm, feeding and oxygenation; home recovery after sternotomy commonly extends several weeks and lifelong congenital follow-up remains necessary.",
    distinctiveRisks:
      "Child-specific consent may address low cardiac output, arrhythmia, residual VSD or obstruction, pulmonary regurgitation, branch pulmonary-artery issues, reintervention, neurological events, bleeding and infection.",
    drivers: [
      { label: "Pulmonary annulus and arteries", detail: "Valve-sparing feasibility and branch reconstruction materially change the operation." },
      { label: "Coronary anatomy", detail: "A coronary crossing the outflow tract may alter surgical access or require a conduit." },
      { label: "Previous palliation", detail: "A prior shunt or stent adds records, dissection and possible removal." },
      { label: "Cyanosis and ventricular function", detail: "Physiological condition affects stabilization and ICU support." },
      { label: "Associated lesions or collaterals", detail: "Additional repair or catheter work broadens the episode." },
    ],
    quoteItems: ["Is the plan valve-sparing, transannular patch or conduit, and what could change it?", "Does the estimate include work on branch pulmonary arteries or prior shunt removal?"],
    documents: ["Oxygen-saturation trend and records of cyanotic spells", "Details of any prior shunt, RVOT stent or catheter intervention"],
    followUp: "Lifelong congenital-heart surveillance evaluates rhythm, right-ventricular size and function, residual obstruction and pulmonary-valve regurgitation or later intervention.",
    related: ["VSD Closure (Ventricular Septal Defect)", "PDA Closure (Patent Ductus Arteriosus)", "Glenn Procedure", "Coarctation Repair"],
  },
  {
    procedure: "Glenn Procedure",
    shortName: "Glenn procedure",
    briefName: "Glenn Procedure",
    slug: "glenn-procedure",
    definition:
      "The bidirectional Glenn connects the superior vena cava to the pulmonary arteries, directing upper-body venous blood to the lungs as staged palliation for selected single-ventricle hearts.",
    indication:
      "It is commonly considered after first-stage palliation when pulmonary arteries, ventricular function, atrioventricular-valve function and pulmonary vascular resistance support a cavopulmonary connection.",
    nonCandidate:
      "High pulmonary vascular resistance, important pulmonary-artery distortion, ventricular dysfunction, significant valve regurgitation, infection or unfavorable venous anatomy may require treatment or a different sequence first.",
    evaluation:
      "Echo, oxygen saturations and prior operative records are central; catheterization often measures pressures and resistance and defines pulmonary arteries, collaterals and venous anatomy before stage-two palliation.",
    approaches: [
      { label: "Bidirectional Glenn", detail: "Connects the superior vena cava to both pulmonary arteries in the usual anatomy." },
      { label: "Bilateral bidirectional Glenn", detail: "May be used with bilateral superior vena cavae or complex systemic venous anatomy." },
      { label: "Additional pulmonary-flow adjustment", detail: "Existing shunts or antegrade pulmonary flow may be taken down, retained or revised according to physiology." },
    ],
    technique:
      "The operation creates a passive upper-body venous route to the lungs and may include pulmonary-artery reconstruction or adjustment of prior sources of pulmonary blood flow.",
    duration: "often 4–6 hours, with additional time for complex venous or pulmonary-artery work",
    icu: "Postoperative care tracks Glenn pressure, oxygen saturation, cerebral venous drainage, effusions, ventricular function, rhythm and airway pressures.",
    recovery:
      "Expected oxygen saturation remains different from a two-ventricle circulation; discharge depends on stable Glenn physiology, feeding and fluid status, followed by interstage surveillance.",
    distinctiveRisks:
      "Families should discuss elevated Glenn pressure, low oxygenation, pleural effusion, thrombosis, pulmonary-artery distortion, collateral formation, neurological complications and failure to progress along the planned pathway.",
    drivers: [
      { label: "Single-ventricle diagnosis and prior stage", detail: "Norwood, shunt, band or other prior work affects complexity." },
      { label: "Pulmonary pressures and resistance", detail: "Catheter assessment and postoperative pressure management may be substantial." },
      { label: "Pulmonary-artery anatomy", detail: "Narrowing or distortion may need reconstruction." },
      { label: "Venous anatomy", detail: "Bilateral superior vena cavae or anomalous veins alter connections." },
      { label: "Valve and ventricular function", detail: "Associated repair and ICU support may be required." },
    ],
    quoteItems: ["Is pre-Glenn catheterization included?", "How will prior shunt or antegrade pulmonary flow be managed?"],
    documents: ["First-stage operative diagram and shunt or stent details", "Home oxygen-saturation and interstage weight records"],
    followUp: "Interstage follow-up monitors oxygen saturation, growth, ventricular and valve function, Glenn flow, pulmonary arteries and readiness for later Fontan evaluation.",
    related: ["Norwood Procedure", "Fontan Procedure", "PDA Closure (Patent Ductus Arteriosus)", "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)"],
  },
  {
    procedure: "Fontan Procedure",
    shortName: "Fontan procedure",
    briefName: "Fontan Procedure",
    slug: "fontan-procedure",
    definition:
      "The Fontan completes cavopulmonary palliation by routing inferior-body venous return toward the pulmonary arteries in a child with suitable single-ventricle physiology.",
    indication:
      "Assessment usually follows a successful Glenn and considers pulmonary pressure and resistance, ventricular function, atrioventricular-valve competence, pulmonary arteries, rhythm, oxygenation and end-organ status.",
    nonCandidate:
      "Elevated pulmonary resistance, ventricular dysfunction, important valve regurgitation, pulmonary-artery obstruction or significant liver, kidney, lymphatic or nutritional concerns may require optimization or make Fontan completion unsuitable.",
    evaluation:
      "Echo and catheterization commonly assess pressure, resistance and anatomy; ECG or rhythm monitoring, blood tests, liver assessment, cross-sectional imaging and exercise or collateral evaluation may be added.",
    approaches: [
      { label: "Extracardiac-conduit Fontan", detail: "Routes inferior vena caval blood through an external conduit to the pulmonary arteries." },
      { label: "Lateral-tunnel Fontan", detail: "Creates an intracardiac pathway; prior anatomy and team strategy influence selection." },
      { label: "Fenestrated or non-fenestrated pathway", detail: "A controlled fenestration may be used to modify early pressure at the cost of residual desaturation." },
    ],
    technique:
      "Fontan completion builds a passive pulmonary circuit on the existing Glenn; conduit type, fenestration and associated pulmonary-artery, valve or rhythm work are case-specific.",
    duration: "often 5–8 hours, longer when associated reconstruction or rhythm surgery is planned",
    icu: "The ICU manages Fontan pressure, cardiac output, oxygenation, ventilation, fluid balance, pleural drainage, rhythm and anticoagulation planning.",
    recovery:
      "Pleural drainage and fluid management can prolong admission; recovery includes nutrition, walking and medication adjustment, with lifelong specialist surveillance after discharge.",
    distinctiveRisks:
      "Consent should address prolonged effusions, thrombosis, arrhythmia, low output, protein-losing enteropathy or plastic bronchitis, neurological or organ complications, reintervention and the possibility that Fontan completion cannot proceed as planned.",
    drivers: [
      { label: "Pre-Fontan catheterization", detail: "Pressure, resistance, collaterals and pulmonary-artery interventions affect scope." },
      { label: "Conduit and fenestration plan", detail: "Materials and procedural strategy should be explicit." },
      { label: "Pleural drainage duration", detail: "Extended chest tubes can lengthen ICU or ward stay." },
      { label: "Associated valve, artery or rhythm work", detail: "Combined procedures add theater and recovery resources." },
      { label: "End-organ and nutritional status", detail: "Liver, kidney, lymphatic or growth concerns can expand evaluation and support." },
    ],
    quoteItems: ["Does the quote include catheterization or collateral intervention?", "Which conduit, fenestration and anticoagulation assumptions are written?"],
    documents: ["Complete single-ventricle staged-surgery history", "Recent catheter pressure and pulmonary-artery angiography data"],
    followUp: "Lifelong Fontan surveillance addresses rhythm, ventricular and valve function, oxygenation, exercise, thrombosis, liver and other end-organ or lymphatic complications.",
    related: ["Glenn Procedure", "Norwood Procedure", "Pediatric Heart Transplantation", "Coarctation Repair"],
  },
  {
    procedure: "Arterial Switch Operation",
    shortName: "arterial switch operation",
    briefName: "Arterial Switch Operation",
    slug: "arterial-switch-operation",
    definition:
      "The arterial switch operation reconnects the aorta and pulmonary artery to the appropriate ventricles and transfers the coronary arteries, most often for dextro-transposition of the great arteries.",
    indication:
      "It is usually time-sensitive in the neonatal period; mixing between circulations, oxygenation, ventricular preparedness, coronary pattern, associated VSD and arch anatomy influence stabilization and timing.",
    nonCandidate:
      "A late-presenting infant with an unprepared left ventricle, complex ventricular anatomy or severe instability may need additional assessment, staged preparation or another strategy rather than a routine primary switch.",
    evaluation:
      "Urgent echo defines transposition, atrial mixing, ductal flow, ventricular function, VSD and arch findings; coronary anatomy may be refined by echo or CT, and balloon atrial septostomy may be needed for inadequate mixing.",
    approaches: [
      { label: "Primary neonatal arterial switch", detail: "Transfers the great arteries and coronaries, often with a Lecompte maneuver." },
      { label: "Switch with VSD or arch repair", detail: "Associated septal or aortic-arch work materially broadens the operation." },
      { label: "Stabilization or staged preparation", detail: "Prostaglandin, septostomy or selected ventricular-training strategies may precede definitive surgery." },
    ],
    technique:
      "On bypass, the great arteries are divided and reconnected and the coronary buttons are transferred; associated VSD or arch obstruction may be repaired in the same episode.",
    duration: "often 5–8 hours, longer with complex coronary, VSD or arch reconstruction",
    icu: "Neonatal cardiac ICU care may include ventilation, vasoactive support and close monitoring of coronary perfusion, ventricular function, rhythm, bleeding and organ function.",
    recovery:
      "Recovery depends on preoperative stability and associated repair; feeding and growth may require support, and travel is inappropriate until neonatal and surgical teams explicitly clear it.",
    distinctiveRisks:
      "The team should discuss coronary-transfer difficulty or ischemia, low cardiac output, bleeding, rhythm disturbance, branch pulmonary-artery or great-vessel obstruction, neurological injury and later reintervention without promising a result.",
    drivers: [
      { label: "Coronary pattern", detail: "Unusual origins or intramural courses can increase technical complexity." },
      { label: "Neonatal urgency and stabilization", detail: "Prostaglandin, septostomy and transfer-level care add resources." },
      { label: "VSD or arch repair", detail: "Associated reconstruction changes bypass and ICU needs." },
      { label: "Left-ventricular preparedness", detail: "Late presentation may require additional testing or staged planning." },
      { label: "Preoperative organ condition", detail: "Hypoxemia or shock may extend intensive care." },
    ],
    quoteItems: ["Are balloon atrial septostomy and preoperative stabilization separate?", "How are complex coronary or associated arch/VSD repair handled in the estimate?"],
    documents: ["Birth and neonatal stabilization summary", "Prostaglandin and balloon-atrial-septostomy records if applicable"],
    followUp: "Surveillance assesses coronary perfusion concerns, ventricular function, rhythm, neoaortic valve and root, branch pulmonary arteries, growth and exercise over time.",
    related: ["ASD Closure (Atrial Septal Defect)", "VSD Closure (Ventricular Septal Defect)", "Coarctation Repair", "PDA Closure (Patent Ductus Arteriosus)"],
  },
  {
    procedure: "PDA Closure (Patent Ductus Arteriosus)",
    shortName: "PDA closure",
    briefName: "PDA Closure",
    slug: "pda-closure-patent-ductus-arteriosus",
    definition:
      "PDA closure stops persistent flow through the fetal vessel connecting the aorta and pulmonary artery when its hemodynamic effect or another clinical indication warrants treatment.",
    indication:
      "Treatment may be considered for heart or lung effects, chamber enlargement, poor growth, pulmonary overcirculation or endarteritis risk; a tiny silent duct or a duct needed for circulation requires a different decision.",
    nonCandidate:
      "Duct-dependent congenital heart disease must not be closed, while severe irreversible pulmonary vascular disease, active infection, extreme prematurity or unsuitable device anatomy may alter timing or method.",
    evaluation:
      "Echo defines duct shape and size, flow direction, chamber effect, pulmonary pressure and associated heart disease; premature infants also need respiratory, kidney, bleeding and infection assessment.",
    approaches: [
      { label: "Transcatheter device closure", detail: "A plug or coil may close a suitable duct in an appropriately sized child or selected premature infant." },
      { label: "Surgical ligation or division", detail: "Used when catheter anatomy, size, access or clinical condition makes surgery more appropriate." },
      { label: "Observation or medical management", detail: "Selected premature infants may receive medical therapy or observation; duct-dependent lesions require patency, not closure." },
    ],
    technique:
      "Closure may use a catheter-delivered device through a vessel or surgical ligation through the chest; prematurity and associated anatomy strongly affect selection.",
    duration: "often 1–3 hours for catheter closure or 2–4 hours for surgical ligation, with neonatal care outside that procedural time",
    icu: "An older stable child may need monitored recovery, while a premature or ventilated infant may remain in neonatal or pediatric cardiac intensive care for underlying lung and systemic illness.",
    recovery:
      "Recovery is often faster after uncomplicated catheter closure, but premature infants may have a prolonged course unrelated to the closure alone; puncture-site or surgical-wound follow-up is required.",
    distinctiveRisks:
      "Discussion may include device embolization, residual flow, obstruction of the aorta or pulmonary artery, vascular injury, vocal-cord or nerve injury after surgery, bleeding, infection and the infant's underlying prematurity risks.",
    drivers: [
      { label: "Prematurity and weight", detail: "Very small infants need specialized devices, access and intensive care." },
      { label: "Duct size and shape", detail: "Anatomy determines device feasibility and implant choice." },
      { label: "Catheter versus surgery", detail: "Device and catheter-lab resources differ from surgical and postoperative care." },
      { label: "Pulmonary pressure and flow direction", detail: "Physiological assessment may determine whether closure is safe." },
      { label: "Respiratory and systemic illness", detail: "Ventilation, infection or kidney concerns can dominate admission length." },
    ],
    quoteItems: ["Which device model and size assumption is included?", "For a premature infant, which NICU costs belong to the closure episode?"],
    documents: ["Neonatal respiratory and ventilation summary where relevant", "Serial echo reports documenting duct dimensions and flow"],
    followUp: "Follow-up checks residual flow, device position, adjacent aortic and pulmonary-artery flow, cardiac chamber response, feeding, growth and the child's underlying lung disease.",
    related: ["ASD Closure (Atrial Septal Defect)", "VSD Closure (Ventricular Septal Defect)", "Coarctation Repair", "TOF Repair (Tetralogy of Fallot)"],
  },
  {
    procedure: "Norwood Procedure",
    shortName: "Norwood procedure",
    briefName: "Norwood Procedure",
    slug: "norwood-procedure",
    definition:
      "The Norwood is first-stage neonatal palliation for hypoplastic left-heart syndrome and selected related single-ventricle lesions, constructing systemic outflow and a controlled source of pulmonary blood flow.",
    indication:
      "It is a neonatal, time-critical pathway considered after detailed counseling for a child whose left-sided structures cannot support a two-ventricle circulation; anatomy, organ condition and family goals shape the decision.",
    nonCandidate:
      "Severe additional anomalies, irreversible organ injury or family preference after counseling may lead to transplant evaluation, comfort-focused care or another anatomy-specific pathway rather than Norwood palliation.",
    evaluation:
      "Urgent echo defines atrial communication, arch and aortic anatomy, ventricular and tricuspid-valve function and pulmonary veins; genetic, neurological and other organ assessment plus continuous preoperative stabilization are often relevant.",
    approaches: [
      { label: "Norwood with RV-PA conduit", detail: "Uses a right-ventricle-to-pulmonary-artery conduit as the pulmonary blood-flow source." },
      { label: "Norwood with modified BT shunt", detail: "Uses a systemic-to-pulmonary artery shunt; physiology and institutional strategy guide selection." },
      { label: "Hybrid first-stage palliation", detail: "Ductal stenting and pulmonary-artery bands may be considered in selected circumstances; it is not the same operation." },
    ],
    technique:
      "The operation reconstructs the aorta using the pulmonary root, ensures unobstructed atrial mixing and establishes limited pulmonary blood flow with a conduit or shunt.",
    duration: "often 6–10 hours, with substantial variation for anatomy, stabilization and associated work",
    icu: "A prolonged neonatal cardiac ICU course may require ventilation, vasoactive medicines, tight balancing of systemic and pulmonary flow, nutrition, neurological monitoring and sometimes mechanical support.",
    recovery:
      "Discharge begins a high-risk interstage period rather than completion of treatment; parents may need saturation and weight monitoring and rapid access to the single-ventricle team before Glenn.",
    distinctiveRisks:
      "Counseling must be individualized and may include death, low cardiac output, shunt or conduit obstruction, excessive or inadequate pulmonary flow, neurological or organ injury, infection, feeding failure, reintervention and inability to reach the next stage.",
    drivers: [
      { label: "Neonatal critical-care course", detail: "Preoperative stabilization and prolonged ventilation can dominate resources." },
      { label: "Arch and coronary-related anatomy", detail: "Systemic-outflow reconstruction is technically individualized." },
      { label: "Shunt or conduit strategy", detail: "Implants and postoperative physiology differ." },
      { label: "Mechanical support or reintervention", detail: "ECMO, catheter or repeat surgery substantially changes cost." },
      { label: "Interstage preparation", detail: "Feeding support, monitoring equipment and nearby follow-up extend the episode." },
    ],
    quoteItems: ["Which shunt or conduit strategy is planned and included?", "Does the estimate address mechanical support, reintervention and interstage monitoring separately?"],
    documents: ["Complete prenatal and neonatal imaging", "Current ventilation, prostaglandin, organ-function and neurological status"],
    followUp: "Specialized interstage surveillance monitors saturation, weight, feeding, shunt or conduit flow, ventricular and valve function and urgent warning signs before Glenn assessment.",
    related: ["Glenn Procedure", "Fontan Procedure", "Pediatric Heart Transplantation", "Coarctation Repair"],
  },
  {
    procedure: "Coarctation Repair",
    shortName: "coarctation repair",
    briefName: "Coarctation Repair",
    slug: "coarctation-repair",
    definition:
      "Coarctation repair relieves congenital narrowing of the aorta to restore systemic blood flow and reduce the pressure burden above the obstruction.",
    indication:
      "Repair may be urgent in a duct-dependent newborn with poor lower-body perfusion or planned for an older child with a significant gradient, hypertension, ventricular effects or collateral flow.",
    nonCandidate:
      "A borderline narrowing without physiological effect may be observed, while complex arch hypoplasia, associated intracardiac disease or recurrent obstruction may require a different surgical or catheter strategy.",
    evaluation:
      "Four-limb blood pressure, pulses and echo assess the narrowing, arch, ventricular function, bicuspid aortic valve and associated lesions; CT, MRI or catheterization may define long segments, collaterals or recurrent disease.",
    approaches: [
      { label: "Extended end-to-end repair", detail: "A common surgical reconstruction for neonatal or infant coarctation and arch hypoplasia." },
      { label: "Patch or interposition reconstruction", detail: "Selected long or complex segments may require a different surgical repair." },
      { label: "Balloon angioplasty or stent", detail: "Often considered for recurrent narrowing or suitable larger children, with growth and reintervention implications." },
    ],
    technique:
      "Surgery removes or enlarges the narrowed segment, usually through the chest, while selected recurrent or older-child cases may use catheter balloon or stent treatment.",
    duration: "often 3–5 hours for isolated surgical repair; complex arch or catheter pathways vary",
    icu: "Infants commonly require cardiac ICU monitoring of upper and lower-body pressure, perfusion, kidney function, ventricular recovery, bleeding and postoperative hypertension.",
    recovery:
      "Blood-pressure medication may be needed temporarily or longer; wound recovery and feeding are monitored, and lifelong surveillance is needed for hypertension and recurrent narrowing.",
    distinctiveRisks:
      "Discussion may include recurrent obstruction, residual hypertension, bleeding, nerve or lymphatic injury, reduced spinal or organ perfusion, aneurysm in selected repair types, vascular injury with catheter treatment and reintervention.",
    drivers: [
      { label: "Age and duct dependence", detail: "A critically ill newborn needs stabilization and more intensive postoperative support." },
      { label: "Length and arch involvement", detail: "Extended arch reconstruction differs from a short isolated repair." },
      { label: "Primary versus recurrent coarctation", detail: "Scar tissue and prior repair can favor catheter or complex surgery." },
      { label: "Surgery versus stent", detail: "Operating-room and ICU resources differ from implant and catheter-lab costs." },
      { label: "Associated intracardiac lesions", detail: "VSD or valve work can require a broader operation." },
    ],
    quoteItems: ["Is the arch reconstruction isolated or combined with intracardiac repair?", "For a stent, how are future redilation and growth addressed?"],
    documents: ["Four-limb blood-pressure and pulse findings", "Cross-sectional arch imaging if already obtained"],
    followUp: "Lifelong follow-up monitors arm-leg pressure, systemic hypertension, arch growth, recurrent narrowing, aneurysm risk where relevant and associated bicuspid aortic-valve disease.",
    related: ["PDA Closure (Patent Ductus Arteriosus)", "VSD Closure (Ventricular Septal Defect)", "Arterial Switch Operation", "Norwood Procedure"],
  },
  {
    procedure: "AVSD Repair (Atrioventricular Septal Defect)",
    shortName: "AVSD repair",
    briefName: "AVSD Repair",
    slug: "avsd-repair-atrioventricular-septal-defect",
    definition:
      "AVSD repair closes atrial and ventricular components of an atrioventricular septal defect and reconstructs the shared or abnormal atrioventricular valve tissue.",
    indication:
      "Complete AVSD is commonly repaired in infancy before pulmonary vascular disease develops; heart failure, poor growth, valve regurgitation and pulmonary pressure influence timing, while partial AVSD may present later.",
    nonCandidate:
      "Active infection, severe pulmonary vascular disease or major instability may require optimization or change candidacy; unbalanced ventricles can require a single-ventricle rather than standard biventricular pathway.",
    evaluation:
      "Echo defines complete, partial, transitional or unbalanced anatomy, ventricular sizes, valve morphology and regurgitation, shunt, outflow and pulmonary pressure; associated Down syndrome and noncardiac needs inform perioperative care without determining outcome.",
    approaches: [
      { label: "Two-patch complete repair", detail: "Uses separate patches for atrial and ventricular components with valve reconstruction." },
      { label: "Modified single-patch repair", detail: "An alternative complete-repair technique chosen according to anatomy and team strategy." },
      { label: "Partial AVSD repair", detail: "Closes the primum ASD and repairs the left atrioventricular-valve cleft or related valve tissue." },
    ],
    technique:
      "Repair on bypass closes septal communications while dividing or reconstructing atrioventricular-valve tissue to achieve competent separate valves.",
    duration: "often 4–7 hours, longer for complex or unbalanced anatomy and additional repair",
    icu: "The ICU monitors atrioventricular-valve function, residual shunts, pulmonary pressure, rhythm and conduction, ventricular function, bleeding, ventilation and feeding.",
    recovery:
      "Feeding, respiratory status and weight gain may require focused support; sternotomy recovery commonly takes several weeks and valve function needs ongoing review.",
    distinctiveRisks:
      "Consent may cover residual valve regurgitation or stenosis, residual septal defects, heart block or pacemaker, pulmonary hypertensive events, outflow obstruction, reoperation, bleeding, infection and ventricular dysfunction.",
    drivers: [
      { label: "Complete, partial or unbalanced anatomy", detail: "The septal and ventricular repair strategy differs materially." },
      { label: "Atrioventricular-valve morphology", detail: "Valve reconstruction complexity and residual regurgitation risk affect scope." },
      { label: "Pulmonary pressure", detail: "Late repair or elevated resistance can expand evaluation and ICU needs." },
      { label: "Age, nutrition and respiratory status", detail: "Poor growth or recurrent infection can complicate recovery." },
      { label: "Associated heart or noncardiac needs", detail: "Additional repair and multidisciplinary support add resources." },
    ],
    quoteItems: ["Which valve-repair and patch technique is anticipated?", "Are pulmonary-hypertension management and possible pacemaker costs addressed?"],
    documents: ["Genetic or Down-syndrome evaluations when available", "Feeding, growth and respiratory-infection history"],
    followUp: "Follow-up focuses on left and right atrioventricular-valve function, residual shunts, rhythm and conduction, ventricular function, pulmonary pressure, growth and possible reintervention.",
    related: ["ASD Closure (Atrial Septal Defect)", "VSD Closure (Ventricular Septal Defect)", "TOF Repair (Tetralogy of Fallot)", "Pediatric Heart Transplantation"],
  },
  {
    procedure: "TAPVC Repair (Total Anomalous Pulmonary Venous Connection)",
    shortName: "TAPVC repair",
    briefName: "TAPVC Repair",
    slug: "tapvc-repair-total-anomalous-pulmonary-venous-connection",
    definition:
      "TAPVC repair connects the pulmonary venous confluence to the left atrium and closes or adjusts other pathways so oxygenated lung blood reaches the systemic side appropriately.",
    indication:
      "Repair is generally required after diagnosis, urgently when pulmonary venous drainage is obstructed; oxygenation, shock, venous pattern, atrial communication and associated lesions determine stabilization and timing.",
    nonCandidate:
      "There is usually no durable nonoperative correction, but profound instability or organ injury may require emergency stabilization; heterotaxy or single-ventricle anatomy can change the operative pathway substantially.",
    evaluation:
      "Echo identifies supracardiac, cardiac, infracardiac or mixed drainage and obstruction; CT may rapidly clarify mixed or unclear veins when the child is stable enough, while urgent treatment should not be delayed for unnecessary travel testing.",
    approaches: [
      { label: "Confluence-to-left-atrium repair", detail: "Creates a wide connection and deals with the vertical vein according to physiology." },
      { label: "Sutureless repair", detail: "May be selected for certain anatomy or pulmonary-vein concerns to reduce direct vein suturing." },
      { label: "Complex or single-ventricle repair", detail: "Mixed veins, heterotaxy or associated lesions may require additional reconstruction or palliation." },
    ],
    technique:
      "On bypass, the surgeon redirects the anomalous pulmonary venous pathway to the left atrium and manages the vertical vein, atrial communication and associated anatomy.",
    duration: "often 5–8 hours, with mixed anatomy or associated repair extending the operation",
    icu: "Neonatal or pediatric cardiac ICU care watches pulmonary pressure, pulmonary-vein flow, oxygenation, ventricular function, bleeding and organ recovery; obstructed TAPVC can require prolonged support.",
    recovery:
      "Recovery reflects preoperative obstruction and organ condition as well as the repair; feeding and respiratory support may continue, with close surveillance for recurrent pulmonary-vein narrowing.",
    distinctiveRisks:
      "Families should discuss pulmonary-vein obstruction or restenosis, pulmonary hypertensive crises, low cardiac output, arrhythmia, bleeding, neurological or organ injury, reintervention and the effect of associated anatomy.",
    drivers: [
      { label: "Obstructed versus unobstructed drainage", detail: "Emergency stabilization and organ support can dominate the episode." },
      { label: "Supracardiac, cardiac, infracardiac or mixed anatomy", detail: "Venous routes determine reconstruction complexity." },
      { label: "Pulmonary-vein size and confluence", detail: "Small or separate veins may influence sutureless or complex repair." },
      { label: "Pulmonary hypertension", detail: "Postoperative support and ventilation may be prolonged." },
      { label: "Heterotaxy or associated lesions", detail: "Combined repair or single-ventricle palliation changes scope." },
    ],
    quoteItems: ["Is standard or sutureless repair anticipated, and why?", "How are emergency preoperative stabilization and recurrent-vein intervention billed?"],
    documents: ["Current oxygenation, ventilation and organ-perfusion status", "CT pulmonary-venous map if already obtained without delaying urgent care"],
    followUp: "Close early and long-term echocardiographic surveillance checks each pulmonary vein, pulmonary pressure, right-heart response, rhythm, growth and signs that warrant catheter or repeat surgery.",
    related: ["ASD Closure (Atrial Septal Defect)", "Glenn Procedure", "Fontan Procedure", "Arterial Switch Operation"],
  },
  {
    procedure: "Pediatric Heart Transplantation",
    shortName: "pediatric heart transplantation",
    briefName: "Pediatric Heart Transplantation",
    slug: "pediatric-heart-transplantation",
    definition:
      "Pediatric heart transplantation replaces a child's failing heart with a donor heart after formal multidisciplinary evaluation, listing and organ allocation; it is a longitudinal program, not a scheduled package procedure.",
    indication:
      "Evaluation may be considered for end-stage heart failure from cardiomyopathy, congenital heart disease or graft failure when medical, surgical and mechanical-support options cannot provide an acceptable durable pathway.",
    nonCandidate:
      "Active uncontrolled infection, irreversible severe organ dysfunction, malignancy, prohibitive pulmonary vascular resistance or inability to sustain adherence and follow-up may prevent or defer listing; criteria vary by transplant program and law.",
    evaluation:
      "Assessment includes cardiac anatomy and function, pulmonary resistance, blood group and sensitization, infection and vaccine status, kidney, liver, lung, neurological and nutritional condition, psychosocial support, adherence and legal eligibility.",
    approaches: [
      { label: "Orthotopic heart transplantation", detail: "The donor heart replaces the recipient heart using anatomy-specific connections." },
      { label: "Bridge with mechanical circulatory support", detail: "Ventricular assist or ECMO support may stabilize selected children while awaiting a donor." },
      { label: "Evaluation, listing and waiting", detail: "Formal candidacy and allocation precede surgery; no coordinator can guarantee a donor or timing." },
    ],
    technique:
      "After a compatible organ is allocated under applicable rules, transplant surgery removes the failing heart and implants the donor organ; complex congenital anatomy may require additional reconstruction.",
    duration: "often 6–12 hours for implantation, separate from an unpredictable evaluation and donor-wait period",
    icu: "Post-transplant ICU care includes ventilation, hemodynamic and graft monitoring, immunosuppression, infection prevention and surveillance for rejection and organ complications.",
    recovery:
      "Families generally remain near the transplant program for frequent tests and medication adjustment; [STAY] is only broad planning, and lifelong immunosuppression and follow-up are mandatory.",
    distinctiveRisks:
      "Consent includes donor uncertainty, primary graft dysfunction, rejection, infection, bleeding, thrombosis, kidney or neurological injury, malignancy related to immunosuppression, graft coronary disease, reoperation and death; no article can quantify one child's result.",
    drivers: [
      { label: "Evaluation and listing", detail: "Multisystem, immunological and psychosocial assessment precedes any operation." },
      { label: "Donor wait and hospitalization", detail: "Timing is unknowable and some children require prolonged inpatient support." },
      { label: "Mechanical circulatory support", detail: "VAD or ECMO implantation and management are separate high-resource episodes." },
      { label: "Congenital reconstruction and sensitization", detail: "Prior surgery and antibodies can complicate matching and implantation." },
      { label: "Immunosuppression and surveillance", detail: "Medicines, biopsies or other rejection monitoring and infection care continue beyond discharge." },
    ],
    quoteItems: ["Does the figure cover evaluation only, listing, implantation, or a defined post-transplant period?", "What eligibility, allocation, residency and funding rules apply?", "How are donor procurement, VAD/ECMO, rejection treatment and lifelong medicines funded?"],
    documents: ["Complete heart-failure and congenital-operative history", "Blood group, antibody or sensitization testing", "Infection, vaccine, organ-function, nutritional and psychosocial assessments"],
    followUp: "Lifelong transplant care includes immunosuppressant levels, graft function and rejection surveillance, infection prevention, kidney and metabolic monitoring, vaccination guidance and age-appropriate adherence support.",
    related: ["Fontan Procedure", "Norwood Procedure", "Glenn Procedure", "AVSD Repair (Atrioventricular Septal Defect)"],
  },
];

/**
 * Pediatric cardiac articles awaiting registry integration.
 * Consumers may use the array or the slug-keyed record without changing the factory.
 */
export const pediatricCardiacSurgeryArticles: CostArticle[] = profiles.map(
  createPediatricCardiacArticle,
);

export const pediatricCardiacSurgeryArticlesBySlug: Record<string, CostArticle> =
  Object.fromEntries(
    pediatricCardiacSurgeryArticles.map((article) => [article.slug, article]),
  );

export {
  createPediatricCardiacArticle,
  type CardiacProfile as PediatricCardiacArticleProfile,
};
