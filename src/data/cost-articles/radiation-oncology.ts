import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type RadiationProfile = {
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
  relatedBlogs?: { href: string; label: string }[];
  cityRanges?: Partial<Record<CostCitySlug, string>>;
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
      "Delhi, Gurugram, Noida and Faridabad are separate daily-commute geographies. A four-to-seven-week IMRT course cannot treat a cross-NCR taxi as a sightseeing hop; name the treating bunker before booking a flat.",
    planning:
      "Allow a rest and film-review day after a long-haul arrival. Same-morning simulation after an overnight flight leaves little room for repeat CT, contour review or anaesthetic assessment for brachytherapy.",
    rehab:
      "Winter air quality can worsen fatigue and throat or lung symptoms during thoracic or head-and-neck courses. Plan indoor rest between fractions rather than assuming a garden walk is recovery.",
    lodging:
      "For a multi-fraction course, live near the named campus. A Gurugram apartment is a poor base if daily treatment is in Faridabad or central Delhi.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are divided by the harbour. Peak traffic and monsoon flooding turn a short map distance into a missed fraction — a poor match for a daily linac slot.",
    planning:
      "Stay on the same side of the harbour as the confirmed radiation campus. Simulation, first fraction and weekly reviews are easier from a nearby serviced stay than from an airport hotel.",
    rehab:
      "Wet floors and long skywalks add fatigue during a pelvic or head-and-neck course. Ask whether the bunker, day-care and weekly review sit on the same plot.",
    lodging:
      "Confirm lift access and a kitchen if the course lasts weeks. Harbour crossings twice a day for fractions add cost that is not in the hospital estimate.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport sits north of the city while many bunkers are south or east. A long transfer every weekday for four to seven weeks is a different budget from a one-session radiosurgery stay.",
    planning:
      "Milder weather can make a longer companion stay easier, but climate says nothing about linac inventory, proton availability or appointment slots.",
    rehab:
      "Book lodging only after the quotation names its campus. Whitefield-to-south-city traffic can erase an afternoon fraction.",
    lodging:
      "A compact stay near the treating floor matters more than a resort on the airport road, especially when the child or companion must attend daily.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Airport access can be comparatively direct for several hospital districts, but lodging should still follow the named bunker. Heat and humidity affect skin care during breast, head-and-neck or pelvic courses.",
    planning:
      "Families using Gulf or South-Asian air links should still preserve time for simulation, peer-reviewed planning and a rest interval before the first fraction.",
    rehab:
      "Indoor rest and skin care should be planned rather than assumed as beach-hotel recovery. A shorter airport road is not a shorter IMRT course.",
    lodging:
      "Air-conditioned rooms, hydration and a same-morning taxi to the bunker matter more than sea views. Keep bookings flexible until the fraction calendar is written.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of Jubilee Hills, Kondapur and Secunderabad. Those districts are not interchangeable for a daily fraction commute; choose a serviced stay only after the quotation names its campus.",
    planning:
      "Build airport-transfer time and a rest day into the plan, then remain near the hospital through simulation and the first week of treatment.",
    rehab:
      "Summer heat limits comfortable outdoor time during a long course. Ask where weekly reviews and any day-care brachytherapy actually occur.",
    lodging:
      "HITEC City, Kondapur, Jubilee Hills and Secunderabad are different sitting-time markets. A long airport-to-city run the evening before daily treatment is rarely compatible with a 7 a.m. slot.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band. A named radiation oncologist must review pathology, imaging, prior dose and the planned technique before issuing a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Technique- and fraction-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm the exact technique, number of fractions, image guidance, whether brachytherapy or protons are assumed, and whether hotel weeks sit outside the letter.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Technique- and fraction-dependent",
    positioning: "Private international hospitals",
    context:
      "International desks may exist, but linac type, planning complexity, daily IGRT and outpatient lodging still need a written letter.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Technique- and fraction-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf patients; specialist, bunker, planning and follow-up charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Technique- and fraction-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for an international self-pay estimate tied to the exact technique and fraction number rather than a general “radiation package.”",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Technique- and fraction-dependent",
    positioning: "European elective oncology care",
    context:
      "International access, professional billing and post-treatment follow-up arrangements vary by centre and should be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Technique- and fraction-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should verify eligibility, the treating unit and whether simulation, planning, IGRT and follow-up are separately charged.",
  },
  {
    country: "United States",
    stay: "Technique- and fraction-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, radiation oncologist, physics, imaging and systemic therapy may be billed by different entities; [US_COST] is a comparison range, not one bundled quote.",
  },
];

function catalogGapNote(profile: RadiationProfile, citySlug: CostCitySlug, city: string): string {
  if (profile.untaggedCities?.includes(citySlug)) {
    return (
      `The current GAF procedure graph does not show a clinician tagged to ${profile.procedure} in ${city}. ` +
      "The city page must leave the doctor and hospital card area empty rather than invent a roster, borrow a neighbouring radiation tag, or imply that no bunker in the city ever delivers the technique. An empty section is a catalog gap, not a ranking."
    );
  }
  return (
    `Clinician and hospital cards for ${city} appear only when live directory relationships currently tag ${profile.procedure}. ` +
    "An empty section is a catalog fact, not a hidden ranking. Neighbouring technique tags must not be reused, and placement is not a volume, machine-model or outcome claim."
  );
}

function makeCities(profile: RadiationProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gap = catalogGapNote(profile, citySlug, place.city);
    const cityRange = profile.cityRanges?.[citySlug];
    return {
      citySlug,
      ecosystem:
        `${place.city} has Radiation Oncology listings in the wider GAF directory, but this article does not infer that every listed institution delivers ${profile.shortName}. ` +
        "Only dynamically resolved procedure relationships should produce clinician or hospital cards, and a card is not a ranking, machine inventory or outcome claim.",
      logistics: `${place.airport}: ${place.logistics} ${place.rehab}`,
      costRange: cityRange,
      costNote: cityRange
        ? `The stored ${place.city} planning band is ${cityRange}. It comes from the existing GAF radiation cost desk and is a planning estimate, not a hospital quotation.`
        : `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital supplies an itemized case estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Radiation Oncologists & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the ${cityRange ?? "[INDIA_COST]"} planning range. Review technique, fractions, quote terms and international-patient logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} The ${cityRange ?? "[INDIA_COST]"} figure is a planning range, not a ${place.city} tariff; technique, fractions and hospital terms determine the written estimate.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${place.planning}`,
          `${place.rehab} ${place.lodging}`,
          gap,
          "Send complete imaging files, pathology and any prior radiation dose records before making non-refundable arrangements. A remote opinion may change after examination and simulation.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against ${cityRange ?? "[INDIA_COST]"}, with [STAY] stored for trip planning. This is not a guaranteed package or a final quotation.`,
          `${profile.ward} ${profile.recovery}`,
        ],
        costExplanation: [
          `The planning band can move with ${profile.drivers
            .slice(0, 3)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. It should not be divided into an invented daily tariff.`,
          "Ask the hospital to identify the radiation oncologist, exact campus, technique, fraction number, simulation, IGRT, physics QA, exclusions and extra-fraction policy.",
          `Outside the hospital estimate, budget for travel through ${place.airport}, lodging close to the bunker for the whole course, local transport to daily slots, medicines and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send pathology, imaging and prior radiation records before booking travel to ${place.city}.`,
          `Arrive with enough time for radiation oncology, physics and simulation review; ${place.planning}`,
          `${place.rehab} Remain close to the hospital through the first week of fractions and travel only when the treating team has assessed fitness to fly.`,
        ],
        hospitalDiscussion: [
          gap,
          "Confirm the actual bunker campus, machine class if named, fraction calendar, image guidance, and the first post-treatment review in writing. A general oncology or accreditation label does not answer those case-specific questions.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: cityRange
              ? `A stored planning band for ${place.city} is ${cityRange}. The national India range remains [INDIA_COST]. Neither figure is a quote; the final amount follows record review and an itemized hospital letter.`
              : `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored; the final amount follows record review and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} radiation oncologists deliver ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure should be shown. If no card appears, that is a current catalog gap rather than a hidden list. Verify role, current appointment and treating campus; placement is not a ranking.",
          },
          {
            q: `Which hospital in ${place.city} should a patient choose?`,
            a: "There is no universal best hospital. Compare the named radiation oncologist, exact bunker, quote boundaries, technique and fraction assumptions, and continuity of follow-up after return. This page names no provider.",
          },
          {
            q: `Where should a patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.logistics} Keep bookings flexible until the simulation and fraction calendar are confirmed.`,
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

function createRadiationArticle(profile: RadiationProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Treatment, Radiation Oncologists & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare the clinical pathway, technique, fractions, quote checklist, cities and international-patient logistics.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay; a named radiation oncologist must determine technique, fractions and travel suitability.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} Complete imaging files, pathology and any prior radiation records matter more than a technique name written on a travel inquiry.`,
      `${profile.implantRehab} ${profile.mobility}`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep the article synchronized with the cost registry. They are not quotations, outcome forecasts or evidence that a particular bunker can accept the case.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored course is [STAY], but technique, fraction number, planning complexity, concurrent therapy and discharge readiness can make an individual pathway shorter or longer.`,
      `${profile.technique} Commonly discussed forms include ${approachSummary}. A qualified radiation oncology team chooses among them; this page does not recommend a treatment.`,
      `${profile.ward} ${profile.recovery} Return flights should remain flexible until the patient is reviewed during or after the course.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include consultation, simulation, planning, physics QA and the scheduled fractions. It does not establish what one hospital will charge.`,
      `Clinically important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change in technique, fraction number or an added brachytherapy sitting is not a cosmetic package upgrade; it may represent a materially different episode of care.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range unless a stored city planning band is shown. Compare named teams and written inclusions while keeping lodging for the whole course separate.",
    ],
    costComponents: [
      {
        label: "Radiation oncologist review",
        detail: `Review of pathology, imaging, prior dose and the indication for ${profile.shortName}.`,
      },
      {
        label: "Simulation and immobilisation",
        detail: `CT simulation and any required mask, vac-bag or fiducials. ${profile.evaluation}`,
      },
      {
        label: "Treatment planning, dosimetry and physics QA",
        detail:
          "Contouring, plan optimisation, peer review and machine QA should be named. A brochure technique name is not a completed plan.",
      },
      {
        label: "Treatment delivery and image guidance",
        detail:
          "The estimate should state the technique, number of fractions, whether daily IGRT is included, and what happens if extra fractions are needed.",
      },
      {
        label: "Day-care or ward stay",
        detail: `${profile.ward} The quote should specify included day-care or nights rather than relying only on [STAY].`,
      },
      {
        label: "Medicines and on-treatment reviews",
        detail:
          "Confirm anti-emetics, skin care, weekly reviews and the first post-treatment visit.",
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} pathway. Compare technique, fractions, IGRT, simulation, named campus and clinician, physics QA, concurrent therapy and exclusions line by line. A higher amount does not prove a better outcome.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named specialist assessment",
        detail:
          "A consultation tied to the radiation oncologist expected to lead the plan, where bundled.",
      },
      {
        label: "The written technique and fraction number",
        detail: `The estimate should use the exact name ${profile.procedure} and identify site and fractions rather than say only “radiation.”`,
      },
      {
        label: "Simulation, planning and quoted physics QA",
        detail: "CT simulation, immobilisation as quoted, dosimetry and machine checks.",
      },
      {
        label: "Quoted delivery and image guidance",
        detail: `${profile.implantRehab} Only items named in the letter are included.`,
      },
      {
        label: "Quoted day-care or ward allowance",
        detail:
          "Day-care or nights included; [STAY] is a trip-planning token, not an inclusion promise.",
      },
    ],
    exclusions: [
      {
        label: "Additional MRI, PET-CT or replanning",
        detail:
          "Repeat imaging, adaptive replans or a change of technique may be additional when indicated.",
      },
      {
        label: "Extra fractions or a change of technique",
        detail:
          "Work beyond the documented plan, including an unplanned IMRT upgrade or added brachytherapy, is not automatically bundled.",
      },
      {
        label: "Systemic therapy and surgery",
        detail:
          "Chemotherapy, immunotherapy and operations sit on neighbouring letters unless the quote names them.",
      },
      {
        label: "Later follow-up imaging and medicines",
        detail: `${profile.followUp} Confirm what occurs after the first post-treatment visit.`,
      },
      {
        label: "Travel and lodging for the whole course",
        detail:
          "Flights, visas, hotel weeks for daily fractions, meals and local transport are normally outside the hospital estimate.",
      },
    ],
    approachComparison: {
      heading: `Techniques related to ${profile.briefName}`,
      intro: [
        `${profile.technique} These are clinical pathways, not consumer upgrades.`,
        "The receiving team should explain why its proposed technique fits the current target and organs at risk, and what finding could change that technique after simulation.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by target, organs at risk and prior dose",
        detail: item.detail,
        procedure: item.label.includes("(") || item.label.length > 8 ? undefined : undefined,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Recommended?`,
    overview: {
      what: [profile.definition, profile.technique, profile.implantRehab],
      who: [profile.indication, profile.nonCandidate],
      how: [
        profile.technique,
        `The listed forms are ${approachSummary}. Immobilisation, imaging and fraction number depend on the target.`,
        `${profile.ward} ${profile.mobility}`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete imaging files rather than screenshots or a one-line report.`,
        "The receiving team sets fasting only when anaesthesia or brachytherapy requires it. Report fever, new neurological change, uncontrolled pain or a sudden increase in symptoms promptly; these may alter timing.",
      ],
      recovery: [
        `${profile.ward} ${profile.recovery}`,
        `The catalog's [STAY] is for broad planning, not a discharge promise. Skin, swallowing, bowel or bladder effects and fatigue can affect the actual course.`,
        profile.distinctiveRisks,
        `${profile.followUp} Patients need a written handover, emergency contacts and a local oncology plan.`,
        "Seek urgent clinical help for fever with neutropenia if on concurrent chemotherapy, new weakness, chest pain, shortness of breath or any warning sign specified during the course.",
      ],
    },
    topicSections: [
      {
        id: "side-effects",
        heading: `Side effects and considerations after ${profile.briefName}`,
        paragraphs: [
          profile.distinctiveRisks,
          "This is not an exhaustive consent list and does not assign likelihood. The treating radiation oncologist should discuss the effects that apply to the planned site, dose and concurrent therapy.",
          "No page can promise that disease will be controlled, that a second course will never be needed, or that side effects will be mild.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes much more than the [INDIA_COST] hospital planning band. Add remote record review, tests not bundled, companion travel, lodging for the whole fraction calendar, local transport, medicines and contingency for extra fractions.`,
        "Travel should follow a written clinical acceptance and itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and prior-dose review",
          detail:
            "Share pathology, imaging, operative notes, chemotherapy dates and any previous radiation plan or dose summary.",
        },
        {
          label: "Specialist planning",
          detail:
            "Radiation oncology, physics and, when relevant, surgical or medical oncology teams clarify intent, technique, timing and whether commercial travel is appropriate.",
        },
        {
          label: "Itemized estimate and lodging",
          detail:
            "Match the exact technique to included simulation, fractions, IGRT, exclusions, extra-fraction rates and hotel weeks.",
        },
        {
          label: "Arrival and simulation",
          detail:
            "Allow time for examination, simulation CT, immobilisation and plan approval; consent should include alternatives and case-specific uncertainty.",
        },
        {
          label: "Treatment course",
          detail: `${profile.technique} ${profile.ward}`,
        },
        {
          label: "Review, handover and travel",
          detail: `${profile.recovery} Travel only after review and carry the treatment summary, dose details and follow-up plan.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete oncology records",
        detail:
          "Provide pathology, imaging files, operative notes, systemic-therapy lists and all prior radiation details, including dose and site.",
      },
      {
        label: "Confirm clinical acceptance",
        detail:
          "A named radiation oncologist reviews diagnosis, intent, technique, fractions, travel safety and whether the bunker can accept the case.",
      },
      {
        label: "Hold a remote discussion",
        detail:
          "Ask why this technique is indicated now, what alternatives exist, what remains uncertain and who will lead care.",
      },
      {
        label: "Compare itemized quotations",
        detail:
          "Use the same technique, site and fraction assumptions; do not compare a planning-only letter with a complete course.",
      },
      {
        label: "Plan flexible travel and lodging",
        detail:
          "Obtain required documents, refundable flights and lodging near the exact campus for the whole course, with contingency for extra fractions.",
      },
      {
        label: "Simulation after arrival",
        detail:
          "The patient is examined and undergoes indicated simulation, laboratory work and, when needed, anaesthesia review before the first fraction.",
      },
      {
        label: "Treatment delivery",
        detail:
          "Care follows the agreed technique, with replanning according to the clinical course rather than package limits.",
      },
      {
        label: "On-treatment reviews",
        detail:
          "Weekly or protocol reviews address skin, nutrition, blood counts when relevant and fitness to continue.",
      },
      {
        label: "Complete local review",
        detail:
          "Remain nearby until the team reviews early effects and explicitly discusses fitness for travel.",
      },
      {
        label: "Continue care at home",
        detail: `Transfer the treatment summary to the patient's local oncologist. ${profile.followUp}`,
      },
    ],
    documents: [
      ...profile.documents,
      "Pathology and operative notes, preferably as complete files",
      "Recent imaging (CT, MRI or PET) as files rather than phone photographs",
      "All prior radiation summaries, including dose, site and dates",
      "Current systemic-therapy list, allergies and recent laboratory results",
      "Passport and companion documentation required for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official tariffs or evidence of availability.",
      "International comparisons are easily distorted when technique, fraction number, IGRT and lodging weeks differ. Obtain like-for-like written estimates after record review.",
    ],
    destinationNote:
      "All figures are planning information. Currency, cancer type, technique, dose, fractions, planning complexity, hospital terms and length of stay can change the final amount; no row predicts outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad show a stored city planning band only when the existing GAF radiation desk already published one. Otherwise they retain [INDIA_COST]. Overlays focus on genuinely different airport, daily-commute and lodging logistics.",
      "Clinician and hospital cards must resolve dynamically from current data. This module names no provider, makes no machine-model, volume or outcome claim and offers no ranking. An empty card area is a catalog gap, not a hidden roster.",
    ],
    whyIndia: [
      "Some international patients evaluate India for access to a named radiation oncologist and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The key questions are clinical acceptance, the proposed team's relevance to the technique, fraction transparency, lodging for the whole course, and fitness to fly. These require direct written confirmation.",
      "No hospital or clinician is described as best. Progressive disease that needs urgent local care, a patient who cannot complete daily fractions, or funded care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what alternatives were considered?`,
      "Which imaging or pathology finding drives the plan?",
      "Who will lead the course, and at which exact campus?",
      "Does the quotation use the exact treatment name and list the site and fraction number?",
      "Is CT simulation included, and will MRI or PET be fused?",
      "Is image guidance included with every fraction?",
      "Which machine class is assumed, and what happens if that bunker is unavailable?",
      "How many fractions are priced, and what is billed if more are required?",
      "Is physics QA and peer review included?",
      "Are concurrent chemotherapy or surgery excluded?",
      "How are extra fractions, replans or adaptive imaging billed?",
      "Can a companion remain nearby for the whole course?",
      "Which on-treatment reviews and the first follow-up are included?",
      "When will the team assess fitness to fly, and what follow-up is needed at home?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; technique, fractions, planning complexity and hospital terms determine the final amount.`,
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
        q: "Does every patient with this diagnosis need the same technique?",
        a: `${profile.nonCandidate} Timing and technique require individualized radiation oncology review.`,
      },
      {
        q: "What records are needed, and does prior radiation matter?",
        a: profile.evaluation,
      },
      {
        q: "What techniques may be discussed?",
        a: `${profile.technique} Relevant forms include ${approachSummary}; they are selected clinically, not by package price.`,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration} The stored course is [STAY]. Extra fractions and the patient's condition can extend the episode.`,
      },
      {
        q: "How long is recovery, and what does the stored stay mean?",
        a: `${profile.recovery} ${profile.ward}`,
      },
      {
        q: "Does radiation technology affect the final cost?",
        a: `${profile.implantRehab} ${profile.mobility}`,
      },
      {
        q: "What can make the quotation change?",
        a: `Important drivers include ${profile.drivers
          .map((item) => item.label.toLowerCase())
          .join(", ")}. Ask for each change in writing.`,
      },
      {
        q: "Are extra fractions and replans included?",
        a: "Only if the itemized estimate says so. Ask how adaptive imaging, a technique change, extra fractions and days beyond the allowance are billed.",
      },
      {
        q: "How should an international patient choose a radiation oncologist?",
        a: "Verify the proposed clinician's role, relevance to the technique, exact campus, fraction plan, communication and handover. Directory placement is not a ranking, and this page names no provider.",
      },
      {
        q: "When can the patient fly home?",
        a: profile.flyHome,
      },
      {
        q: "What follow-up is required?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `Radiation oncologists to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} radiation oncologists in [CITY]`,
    doctorIntro:
      `Profiles should be pulled dynamically only when ${profile.procedure} appears in the clinician's current procedure relationships. Some Radiation Oncology procedures have no tagged doctors in some cities; the renderer must leave those sections empty. Verify role, case relevance, availability and campus. Placement is not a ranking, and this article adds no experience, machine-model or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships, not names embedded in editorial copy. Accreditation or a general oncology label does not prove current linac inventory, proton availability, volumes or outcomes.",
    relatedProcedures: profile.related,
    relatedBlogs: profile.relatedBlogs,
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
        src: "/costs/radiation-treatment-pathway.webp",
        alt: `Illustration of records review, simulation, treatment planning and fractions for ${profile.shortName}`,
        caption:
          "Fraction number and support depend on the plan and clinical course; this image does not imply an outcome.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/radiation-international-journey.webp",
        alt: `International records, travel and follow-up journey for ${profile.shortName}`,
        caption:
          "Clinical acceptance and record review come before travel; treatment and fitness to fly are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const profiles: RadiationProfile[] = [
  {
    procedure: "External Beam Radiotherapy (EBRT)",
    shortName: "EBRT",
    briefName: "EBRT",
    slug: "external-beam-radiotherapy-ebrt",
    definition:
      "External beam radiotherapy delivers radiation from a machine outside the body — usually a linear accelerator — so that a tumour or an area at risk can be treated without placing a source inside the patient.",
    indication:
      "EBRT may be considered as definitive treatment, after surgery, before surgery, or for selected palliative targets. IMRT, IGRT, SBRT and protons are more specific products when those techniques are already the honest plan.",
    nonCandidate:
      "A target that already belongs on brachytherapy, a radiosurgery sheet, or a transplant TBI protocol should not be labelled as a generic EBRT package for convenience.",
    evaluation:
      "Pathology, staging imaging and any prior radiation dose map decide site, intent and whether a conventional course or a specialised technique is honest. Simulation CT is planned after that review, not instead of it.",
    approaches: [
      { label: "Conventional fractionation", detail: "Multiple daily sessions over weeks; still the backbone of many curative courses." },
      { label: "3D-CRT or IMRT/IGRT", detail: "Named technique sheets exist when the quote is already a specific planning method." },
      { label: "Hypofractionation or SBRT", detail: "Fewer, higher-dose sessions when the target and motion management already allow it." },
    ],
    technique:
      "After simulation and planning, the patient lies in an immobilisation device while the machine delivers the day's fraction. Each session is usually brief; the calendar, not the beam-on time, drives travel.",
    duration: "simulation plus a course that is often 15–35 weekday fractions, typically 10–20 minutes on the couch",
    ward:
      "Most EBRT is outpatient. Admission is reserved for concurrent therapy complications, brachytherapy combinations or unexpected events — not as a brochure upgrade.",
    recovery:
      "Fatigue and site-specific effects accumulate over the course. Fitness to fly is discussed during weekly reviews, not on the first simulation day.",
    implantRehab:
      "The quotation should name technique, site, fraction number, whether IGRT is included, and what happens if the plan is upgraded to IMRT or SBRT after simulation.",
    distinctiveRisks:
      "Consent may address fatigue, skin reaction, site-specific irritation (throat, bowel, bladder or chest), and uncommon late effects. The treating radiation oncologist should discuss the map that applies to this site.",
    mobility:
      "Daily weekday attendance is the main logistic. A companion may be needed for the first week or for a frail patient.",
    flyHome:
      "There is no universal flight day. Many patients travel after the course and an early review; others stay if concurrent chemotherapy or severe reactions continue.",
    drivers: [
      { label: "Technique after simulation", detail: "A 3D-CRT letter is not an IMRT or SBRT letter." },
      { label: "Number of fractions", detail: "Each extra week adds bunker time and hotel nights." },
      { label: "Treatment site", detail: "Head-and-neck, pelvis and breast have different immobilisation and review intensity." },
      { label: "Image guidance", detail: "Daily IGRT should be named rather than assumed." },
      { label: "Concurrent systemic therapy", detail: "Usually a neighbouring bill." },
    ],
    quoteItems: [
      "Which technique and how many fractions are priced?",
      "Is daily image guidance included, and what is billed if the plan is upgraded after simulation?",
    ],
    documents: ["Pathology and staging imaging", "Prior radiation dose summary if any"],
    followUp:
      "On-treatment reviews, then a first post-course visit and imaging as the multidisciplinary team advises. A local oncologist should receive the dose summary.",
    related: ["3D Conformal Radiotherapy (3D-CRT)", "Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)"],
    relatedBlogs: [
      { href: "/blogs/records-before-you-book-ebrt", label: "Records to send before travel" },
      { href: "/blogs/imrt-vs-3d-crt", label: "IMRT versus 3D-CRT" },
    ],
    figureSrc: "/costs/ebrt-illustration.webp",
    figureAlt: "Illustration of a linear accelerator delivering external radiation beams toward a tumor target",
    cityRanges: {
      "delhi-ncr": "$1,500–$6,000",
      mumbai: "$1,200–$6,000",
      bengaluru: "$1,100–$6,000",
      chennai: "$1,000–$6,000",
      hyderabad: "$1,000–$6,000",
    },
  },
  {
    procedure: "3D Conformal Radiotherapy (3D-CRT)",
    shortName: "3D-CRT",
    briefName: "3D-CRT",
    slug: "3d-conformal-radiotherapy-3d-crt",
    definition:
      "3D conformal radiotherapy is a form of external-beam treatment that shapes radiation beams to the three-dimensional outline of a target using CT-based planning.",
    indication:
      "It may be considered when conformal photon planning is already sufficient for the target and organs at risk. It is not automatically the right choice because it is often cheaper than IMRT.",
    nonCandidate:
      "A concave target wrapped around a critical organ that already belongs on IMRT, or a radiosurgery indication, should not be billed as 3D-CRT for convenience.",
    evaluation:
      "CT simulation, and MRI or PET fusion when needed, define the target. The radiation oncologist — not the package price — decides whether 3D-CRT is adequate.",
    approaches: [
      { label: "Forward-planned 3D-CRT", detail: "Shaped beams from several angles without inverse intensity modulation." },
      { label: "IMRT when conformity is insufficient", detail: "A neighbouring product when organs at risk already require modulation." },
      { label: "IGRT added to 3D-CRT", detail: "Imaging for setup; IGRT is a separate sheet when daily imaging is the billed product." },
    ],
    technique:
      "After CT-based contouring, shaped beams are delivered on a linear accelerator. Sessions are usually outpatient and brief; the fraction calendar still drives lodging.",
    duration: "simulation plus a course that is often 15–35 weekday fractions",
    ward:
      "Almost always outpatient. Day-care is used if concurrent therapy or a frail patient already needs observation.",
    recovery:
      "Site-specific effects follow the same map as other photon courses. Weekly reviews decide whether the patient can keep travelling to the bunker.",
    implantRehab:
      "The quotation should name 3D-CRT explicitly, the site, fraction number, and what happens if simulation shows that IMRT is required instead.",
    distinctiveRisks:
      "Consent should cover fatigue, skin reaction and site-specific effects. 3D-CRT is not “risk-free radiation” because it is older than IMRT.",
    mobility:
      "Daily weekday attendance. Heat and long commutes matter as much as the beam arrangement.",
    flyHome:
      "Fitness to fly is reviewed during the course. A completed 3D-CRT course does not by itself clear a long-haul flight if concurrent chemotherapy continues.",
    drivers: [
      { label: "Whether IMRT is required after simulation", detail: "An upgrade is a different letter." },
      { label: "Number of fractions", detail: "Hotel weeks often exceed the bunker line." },
      { label: "Treatment site", detail: "Immobilisation and review intensity differ." },
      { label: "Image guidance", detail: "May be extra if not named." },
      { label: "Replanning", detail: "Weight loss or tumour change can add a second plan." },
    ],
    quoteItems: [
      "Is this priced as 3D-CRT, and what is billed if IMRT is required after simulation?",
      "How many fractions and which site are assumed?",
    ],
    documents: ["Pathology and staging CT or MRI", "Prior radiation records if any"],
    followUp:
      "Weekly on-treatment reviews and a first post-course visit. The dose summary should travel home with the patient.",
    related: ["External Beam Radiotherapy (EBRT)", "Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)"],
    relatedBlogs: [{ href: "/blogs/imrt-vs-3d-crt", label: "IMRT versus 3D-CRT" }],
    figureSrc: "/costs/3d-crt-illustration.webp",
    figureAlt: "Illustration of shaped radiation beams conforming to a tumor outline while limiting a nearby organ",
    cityRanges: {
      "delhi-ncr": "$900–$2,500",
      mumbai: "$900–$2,500",
      bengaluru: "$850–$2,400",
      chennai: "$800–$2,400",
      hyderabad: "$800–$2,400",
    },
  },
  {
    procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    shortName: "IMRT",
    briefName: "IMRT",
    slug: "intensity-modulated-radiotherapy-imrt",
    definition:
      "IMRT is an external-beam technique that varies the intensity of many small beamlets so that a high dose can wrap a target while lowering dose to nearby organs.",
    indication:
      "It may be considered when the target sits close to critical structures — for example selected head-and-neck, prostate, pelvic or intracranial plans — and inverse planning is already the honest method.",
    nonCandidate:
      "A simple palliative field, or a target that already belongs on SBRT or protons, should not be labelled IMRT only because the acronym is familiar.",
    evaluation:
      "Simulation CT, organ-at-risk contours, and often MRI or PET fusion drive inverse planning. Prior dose is essential if the site was irradiated before.",
    approaches: [
      { label: "Static-field IMRT", detail: "Intensity-modulated beams from several fixed angles." },
      { label: "VMAT / arc delivery", detail: "Modulation while the gantry rotates; still an IMRT family product, not a separate GAF slug." },
      { label: "IMRT with daily IGRT", detail: "Image guidance is frequently paired; IGRT has its own sheet when imaging is the billed extra." },
    ],
    technique:
      "After inverse planning and physics QA, each fraction is delivered with the patient immobilised. Beam-on time is longer than a simple 3D plan; the calendar is still measured in weeks for most curative courses.",
    duration: "simulation and planning, then typically 4–7 weeks of weekday fractions",
    ward:
      "Usually outpatient. Head-and-neck courses may need nutrition or feeding-tube support that sits on a neighbouring ward letter.",
    recovery:
      "Mucositis, skin and fatigue often peak near the end of the course. Recovery is gradual and site-specific.",
    implantRehab:
      "The quotation should name IMRT, site, fraction number, whether VMAT is assumed, and whether daily IGRT and adaptive replans are included.",
    distinctiveRisks:
      "Consent should address site-specific effects and the fact that a more conformal plan does not eliminate risk. Late effects depend on dose and organs at risk.",
    mobility:
      "A thermoplastic mask or other immobilisation is common. Daily attendance for weeks is the main travel cost.",
    flyHome:
      "Head-and-neck or pelvic reactions may delay a long-haul flight even after the last fraction. Ask for a written fitness-to-fly note.",
    drivers: [
      { label: "Target complexity and organ-at-risk constraints", detail: "Planning time and QA scale with the map." },
      { label: "Number of fractions", detail: "The largest hotel driver for international patients." },
      { label: "Daily IGRT", detail: "Should be a named line." },
      { label: "Adaptive replanning", detail: "Weight loss or tumour change can add a second plan." },
      { label: "Concurrent chemotherapy", detail: "Neighbouring bill and extra review intensity." },
    ],
    quoteItems: [
      "Is VMAT assumed inside this IMRT letter?",
      "Is daily IGRT and one replan included?",
    ],
    documents: ["Pathology, staging imaging and dental or swallowing notes when relevant", "Prior radiation dose map"],
    followUp:
      "Weekly reviews during the course, then site-specific follow-up. A local oncologist should receive the plan summary.",
    related: ["Image-Guided Radiotherapy (IGRT)", "3D Conformal Radiotherapy (3D-CRT)", "Stereotactic Body Radiotherapy (SBRT)"],
    relatedBlogs: [{ href: "/blogs/imrt-vs-3d-crt", label: "IMRT versus 3D-CRT" }],
    figureSrc: "/costs/imrt-illustration.webp",
    figureAlt: "Illustration of intensity-modulated radiation beams wrapping a tumor while reducing dose to nearby tissue",
  },
  {
    procedure: "Image-Guided Radiotherapy (IGRT)",
    shortName: "IGRT",
    briefName: "IGRT",
    slug: "image-guided-radiotherapy-igrt",
    definition:
      "IGRT uses imaging immediately before or during a radiation fraction so that the day's setup can be checked against the plan before the beam is delivered.",
    indication:
      "It may be considered whenever daily setup error or internal motion would otherwise miss the target or overdose an organ — often with IMRT, SBRT or prostate, lung and head-and-neck courses.",
    nonCandidate:
      "IGRT is not a stand-alone cancer treatment. A quote that lists only “IGRT” without a delivery technique is incomplete.",
    evaluation:
      "The simulation dataset, fiducials or markers if used, and the motion-management plan decide which imaging (cone-beam CT, kV, or other) is honest each day.",
    approaches: [
      { label: "Cone-beam CT before each fraction", detail: "Common with IMRT and many pelvic or thoracic plans." },
      { label: "Orthogonal imaging or surface guidance", detail: "Selected setups when that is the bunker's protocol." },
      { label: "IGRT with SBRT or SRS", detail: "Stereotactic sheets apply when the dose per fraction is already stereotactic." },
    ],
    technique:
      "The patient is immobilised, an image is taken, shifts are applied if needed, then the planned beam is delivered. Imaging time is part of the appointment, not an optional extra in the bunker.",
    duration: "adds minutes to each fraction; the course length still follows the parent technique",
    ward:
      "Follows the parent technique — usually outpatient. IGRT itself does not create a ward stay.",
    recovery:
      "Side effects follow the site and dose, not the imaging acronym. IGRT does not promise fewer reactions.",
    implantRehab:
      "The quotation should name which imaging is used, whether it is included with every fraction, and which delivery technique (IMRT, 3D-CRT or SBRT) it is attached to.",
    distinctiveRisks:
      "Imaging dose is small compared with the treatment dose but should still be discussed. Setup imaging does not remove the risks of the radiation course itself.",
    mobility:
      "Appointments run longer than a beam-only slot. Daily commute planning should include that extra time.",
    flyHome:
      "Fitness to fly follows the parent course, not the IGRT label.",
    drivers: [
      { label: "Parent technique", detail: "IGRT attached to IMRT is not IGRT attached to SBRT." },
      { label: "Imaging with every fraction versus weekly", detail: "Must be written." },
      { label: "Fiducials or markers", detail: "Placement may be a separate sitting." },
      { label: "Number of fractions", detail: "Hotel weeks still dominate international cost." },
      { label: "Replanning after imaging findings", detail: "May add a second plan." },
    ],
    quoteItems: [
      "Which delivery technique is this IGRT attached to?",
      "Is imaging included with every fraction, and are fiducials extra?",
    ],
    documents: ["The planned delivery technique and any fiducial procedure notes", "Staging imaging"],
    followUp:
      "Follow-up follows the parent radiation course. IGRT images are part of the treatment record, not a separate survivorship clinic.",
    related: ["Intensity-Modulated Radiotherapy (IMRT)", "Stereotactic Body Radiotherapy (SBRT)", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/igrt-illustration.webp",
    figureAlt: "Illustration of a positioning scan checked before radiation beams are delivered",
  },
  {
    procedure: "Stereotactic Radiosurgery (SRS)",
    shortName: "SRS",
    briefName: "SRS",
    slug: "stereotactic-radiosurgery-srs",
    definition:
      "Stereotactic radiosurgery delivers a high, tightly focused radiation dose to a small intracranial or selected skull-base target in one or a few sessions, using rigid immobilisation and precise imaging.",
    indication:
      "It may be considered for selected brain metastases, benign intracranial targets or other small, well-defined lesions after a multidisciplinary review. It is not a knife, despite the name.",
    nonCandidate:
      "A large or numerous intracranial disease burden that already belongs on fractionated EBRT, or a body target that belongs on SBRT, should not be billed as SRS.",
    evaluation:
      "Thin-slice MRI, prior radiation history and performance status decide whether a single fraction or a short hypofractionated SRS course is honest. Neurosurgery input is often part of the same review.",
    approaches: [
      { label: "Single-fraction SRS", detail: "One session when the target and dose constraints already allow it." },
      { label: "Hypofractionated SRS", detail: "A few sessions when size or location already requires it." },
      { label: "Platform-specific delivery", detail: "Gamma Knife and CyberKnife are neighbouring slugs when the quote is already a named platform." },
    ],
    technique:
      "After specialised planning and a mask or frame, the dose is delivered in a longer single sitting or a short series. Most patients go home the same day.",
    duration: "planning plus 1–5 sessions; each session may last 30–90 minutes on the couch",
    ward:
      "Usually day-care. Overnight observation is reserved for selected high-risk or frail patients, not as a package upgrade.",
    recovery:
      "Many people resume quiet activity within days. Steroids, fatigue and rare delayed swelling are discussed individually.",
    implantRehab:
      "The quotation should name target count, single versus hypofractionated SRS, platform if specified, and whether MRI on site is included.",
    distinctiveRisks:
      "Consent may address temporary swelling, headache, rare necrosis or new neurological change. SRS is not risk-free because it is short.",
    mobility:
      "A companion for the treatment day is often wise. Daily multi-week lodging is usually unnecessary.",
    flyHome:
      "Fitness to fly is often discussed after the session and a short review. Uncontrolled seizures or steroid issues can delay travel.",
    drivers: [
      { label: "Number of targets", detail: "Each additional lesion can change planning and time." },
      { label: "Single versus a few fractions", detail: "Different bunker and lodging calendars." },
      { label: "Platform", detail: "A named radiosurgery platform may be a different letter." },
      { label: "On-site MRI", detail: "May be extra." },
      { label: "Prior brain radiation", detail: "Re-irradiation planning is not a first-course package." },
    ],
    quoteItems: [
      "How many targets and fractions are priced?",
      "Is a named platform assumed, and is planning MRI included?",
    ],
    documents: ["Thin-slice brain MRI", "Prior cranial radiation records if any"],
    followUp:
      "Early clinical review, then MRI on a schedule set by the treating team. A local neurosurgeon or oncologist should receive the plan.",
    related: ["Gamma Knife", "CyberKnife", "Stereotactic Body Radiotherapy (SBRT)"],
    figureSrc: "/costs/srs-illustration.webp",
    figureAlt: "Illustration of many radiation beams meeting at a small intracranial target",
  },
  {
    procedure: "Stereotactic Body Radiotherapy (SBRT)",
    shortName: "SBRT",
    briefName: "SBRT",
    slug: "stereotactic-body-radiotherapy-sbrt",
    definition:
      "SBRT delivers a high radiation dose to a small target outside the brain in one to five sessions, using tight margins, motion management and image guidance.",
    indication:
      "It may be considered for selected lung, liver, spine, prostate or oligometastatic targets when size, motion and nearby organs already allow a stereotactic body plan. Conventional IMRT remains the product when a long course is the honest plan.",
    nonCandidate:
      "A large moving target without motion control, or an intracranial indication that belongs on SRS, should not be billed as SBRT.",
    evaluation:
      "4D CT or other motion assessment, MRI or PET fusion, and prior dose decide whether 1–5 fractions are honest. Fiducials may be required for some liver or prostate plans.",
    approaches: [
      { label: "1–5 fraction SBRT", detail: "The usual stereotactic body calendar." },
      { label: "SBRT with fiducials or tracking", detail: "Selected moving targets; fiducial placement may be a separate sitting." },
      { label: "Conventional IMRT instead", detail: "Used when stereotactic constraints cannot be met." },
    ],
    technique:
      "After specialised planning, each session is longer than a conventional fraction. Most patients remain outpatients.",
    duration: "planning plus 1–5 sessions; each session may last 30–90 minutes",
    ward:
      "Usually outpatient. Overnight stay is uncommon unless fiducial placement or comorbidity already requires it.",
    recovery:
      "Fatigue and site-specific effects may appear days later. This is not a “no-recovery” treatment because it is short.",
    implantRehab:
      "The quotation should name site, fraction number, motion-management method, whether fiducials are included, and daily IGRT.",
    distinctiveRisks:
      "Consent may address site-specific injury (lung, liver, bowel, spinal cord) and rare late damage. High dose per fraction is the point — and the risk.",
    mobility:
      "A few long appointments rather than weeks of daily travel. Hotel nights are fewer but each visit is longer.",
    flyHome:
      "Often discussed after the last session and a short review. Uncontrolled pain or a fresh fiducial sitting can delay travel.",
    drivers: [
      { label: "Treatment site and motion management", detail: "Lung and liver are not a bone-met package." },
      { label: "Number of fractions and targets", detail: "Each extra lesion or fraction changes the letter." },
      { label: "Fiducial placement", detail: "May be a separate billed sitting." },
      { label: "Prior radiation to the same site", detail: "Re-irradiation is not a first-course SBRT letter." },
      { label: "On-site 4D CT or MRI", detail: "May sit outside a narrow package." },
    ],
    quoteItems: [
      "How many targets and fractions are priced?",
      "Are fiducials and daily image guidance included?",
    ],
    documents: ["Staging PET or MRI and any 4D CT already obtained", "Prior radiation records to the same site"],
    followUp:
      "Early review, then imaging on a schedule set by the treating team. A local oncologist should receive the plan.",
    related: ["Stereotactic Radiosurgery (SRS)", "CyberKnife", "Intensity-Modulated Radiotherapy (IMRT)"],
    figureSrc: "/costs/sbrt-illustration.webp",
    figureAlt: "Illustration of tightly focused radiation aimed at a small body target over a few sessions",
  },
  {
    procedure: "CyberKnife",
    shortName: "CyberKnife",
    briefName: "CyberKnife",
    slug: "cyberknife",
    definition:
      "CyberKnife is a robotic radiosurgery platform used to deliver stereotactic radiation to selected brain or body targets, often with image tracking during the session.",
    indication:
      "It may be considered when a multidisciplinary team already writes a stereotactic plan that this platform can deliver. SRS and SBRT remain the clinical products; this slug is the named platform.",
    nonCandidate:
      "A conventional multi-week IMRT course, or a target that the treating team has already assigned to another platform, should not be labelled CyberKnife for marketing.",
    evaluation:
      "The same imaging and motion-management work-up as SRS or SBRT applies. Availability of the platform at the named campus must be confirmed in writing — this page does not inventory machines.",
    approaches: [
      { label: "Intracranial robotic SRS", detail: "When the indication is already radiosurgery." },
      { label: "Body robotic SBRT", detail: "When the indication is already stereotactic body radiation." },
      { label: "Another stereotactic platform", detail: "Gamma Knife or linac-based SRS/SBRT may be the honest alternative." },
    ],
    technique:
      "After specialised planning, a robotic arm delivers many small beams while imaging tracks the target. Sessions can be long. Most patients go home the same day.",
    duration: "planning plus 1–5 sessions; couch time is often longer than a conventional fraction",
    ward:
      "Usually day-care. This platform does not by itself create an inpatient stay.",
    recovery:
      "Follows the SRS or SBRT map for that site. The brand name does not shorten recovery.",
    implantRehab:
      "The quotation should name site, fraction number, whether tracking or fiducials are included, and what happens if the platform slot is unavailable.",
    distinctiveRisks:
      "Risks follow the stereotactic indication, not the vendor name. Consent should be indication-specific.",
    mobility:
      "A few long visits. Confirm the exact campus; not every listed hospital has this platform.",
    flyHome:
      "Fitness to fly follows the treated site and early review, not the platform name.",
    drivers: [
      { label: "Intracranial versus body indication", detail: "Different planning and session length." },
      { label: "Number of fractions and targets", detail: "Changes bunker time." },
      { label: "Fiducials or tracking", detail: "May add a sitting." },
      { label: "Platform availability", detail: "A cancelled slot is not an automatic linac substitution unless written." },
      { label: "Prior radiation", detail: "Re-irradiation planning is a different letter." },
    ],
    quoteItems: [
      "Is this priced as a named-platform course, and what happens if that bunker is unavailable?",
      "How many targets and fractions are assumed?",
    ],
    documents: ["Indication-specific MRI or PET", "Written confirmation that the named campus can accept the case"],
    followUp:
      "Follow-up follows the SRS or SBRT indication. A local clinician should receive the plan summary.",
    related: ["Stereotactic Radiosurgery (SRS)", "Stereotactic Body Radiotherapy (SBRT)", "Gamma Knife"],
    figureSrc: "/costs/cyberknife-illustration.webp",
    figureAlt: "Illustration of a robotic arm delivering tracked radiosurgery beams to a small target",
  },
  {
    procedure: "Gamma Knife",
    shortName: "Gamma Knife",
    briefName: "Gamma Knife",
    slug: "gamma-knife",
    definition:
      "Gamma Knife is a dedicated intracranial radiosurgery platform that focuses many beams on a small brain target, usually in a single session, using a stereotactic frame or mask.",
    indication:
      "It may be considered for selected brain metastases, trigeminal neuralgia, or benign intracranial targets after neurosurgical and radiation oncology review. Body targets belong on SBRT or CyberKnife sheets.",
    nonCandidate:
      "A body radiosurgery case, or a large volume that already belongs on fractionated brain EBRT, should not be labelled Gamma Knife.",
    evaluation:
      "Thin-slice MRI and prior cranial radiation history decide suitability. This page does not claim which campuses currently run a unit; cards appear only from live tags.",
    approaches: [
      { label: "Single-session frame-based treatment", detail: "The classic intracranial sitting." },
      { label: "Mask-based or fractionated intracranial radiosurgery", detail: "Selected when the team already writes more than one session." },
      { label: "Linac-based SRS instead", detail: "A neighbouring product when that is the available honest platform." },
    ],
    technique:
      "After specialised planning, the patient is treated in a helmet-like or mask setup. Most people go home the same day.",
    duration: "planning plus typically one session; couch time can be one to several hours",
    ward:
      "Usually day-care. Overnight observation is reserved for selected cases.",
    recovery:
      "Quiet activity is common within days. Steroids and delayed swelling are discussed individually.",
    implantRehab:
      "The quotation should name target count, frame versus mask, whether same-day MRI is included, and what happens if the unit slot moves.",
    distinctiveRisks:
      "Consent may address pin-site discomfort if a frame is used, swelling, rare necrosis and new neurological symptoms.",
    mobility:
      "A companion for the treatment day is often wise. Multi-week lodging is usually unnecessary.",
    flyHome:
      "Often discussed after the session. Uncontrolled headache, seizure or steroid issues can delay travel.",
    drivers: [
      { label: "Number of intracranial targets", detail: "Planning time scales with count." },
      { label: "Frame versus mask", detail: "Different sitting and comfort assumptions." },
      { label: "Same-day MRI", detail: "May be extra." },
      { label: "Prior brain radiation", detail: "Re-irradiation is not a first-session letter." },
      { label: "Unit availability", detail: "Confirm the exact campus in writing." },
    ],
    quoteItems: [
      "How many targets are priced, and is same-day MRI included?",
      "Is a frame or a mask assumed?",
    ],
    documents: ["Thin-slice brain MRI", "Prior cranial radiation records if any"],
    followUp:
      "Early review, then MRI on a schedule set by the treating team. Neurosurgery and radiation notes should travel home.",
    related: ["Stereotactic Radiosurgery (SRS)", "CyberKnife", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/gamma-knife-illustration.webp",
    figureAlt: "Illustration of converging intracranial radiosurgery beams focused on a small brain target",
    untaggedCities: ["mumbai"],
  },
  {
    procedure: "Proton Beam Therapy",
    shortName: "proton beam therapy",
    briefName: "Proton Beam Therapy",
    slug: "proton-beam-therapy",
    definition:
      "Proton beam therapy is a form of external-beam radiation that uses protons, which deposit most of their dose at a defined depth (the Bragg peak) and then stop, reducing exit dose beyond the target.",
    indication:
      "It may be considered for selected paediatric tumours, re-irradiation, and certain skull-base, spinal or other geometrically demanding targets after specialist review. It is not automatically better for every adult cancer.",
    nonCandidate:
      "A routine palliative photon course, or a target that the team has already assigned to IMRT or SBRT, should not be labelled protons for marketing.",
    evaluation:
      "Prior imaging, pathology, age, and any previous radiation dose decide whether a proton plan is honest. This page does not inventory which Indian campuses currently treat with protons; cards follow live tags only.",
    approaches: [
      { label: "Pencil-beam scanning protons", detail: "The planning method most often discussed in contemporary centres." },
      { label: "Photon IMRT instead", detail: "The honest alternative when protons add no clinical argument." },
      { label: "Proton re-irradiation", detail: "A different, more complex letter when prior dose already exists." },
    ],
    technique:
      "After specialised planning, daily fractions are delivered over weeks in most curative courses. Immobilisation and image guidance still apply.",
    duration: "simulation and planning, then typically 4–8 weeks of weekday fractions",
    ward:
      "Usually outpatient. Paediatric cases may need anaesthesia for daily fractions — a major separate cost driver.",
    recovery:
      "Fatigue and site-specific effects still occur. Protons do not promise a reaction-free course.",
    implantRehab:
      "The quotation should name site, fraction number, whether paediatric anaesthesia is included, and what happens if the proton slot is delayed.",
    distinctiveRisks:
      "Consent should address site-specific effects and uncertainty unique to the indication. A Bragg peak is a physical fact, not a guarantee of better survival.",
    mobility:
      "Daily weekday attendance for weeks. Confirm the exact campus; empty city cards mean the catalog has no tagged proton doctor there.",
    flyHome:
      "Fitness to fly follows the site and weekly reviews. A completed proton course does not automatically clear travel if anaesthesia recovery or reactions continue.",
    drivers: [
      { label: "Indication and age", detail: "Paediatric anaesthesia changes the bill." },
      { label: "Number of fractions", detail: "Hotel weeks remain large." },
      { label: "Re-irradiation versus first course", detail: "Different planning intensity." },
      { label: "Centre slot availability", detail: "Delays add lodging, not just bunker time." },
      { label: "Imaging and adaptive plans", detail: "May be extra." },
    ],
    quoteItems: [
      "Is paediatric anaesthesia included if the child cannot lie still?",
      "How many fractions are priced, and what happens if the slot is delayed?",
    ],
    documents: ["Complete prior radiation records for re-irradiation", "Pathology and planning imaging"],
    followUp:
      "Weekly reviews, then site-specific follow-up. The dose summary must travel home.",
    related: ["Intensity-Modulated Radiotherapy (IMRT)", "External Beam Radiotherapy (EBRT)", "Stereotactic Radiosurgery (SRS)"],
    relatedBlogs: [{ href: "/blogs/imrt-vs-3d-crt", label: "IMRT versus 3D-CRT" }],
    figureSrc: "/costs/proton-beam-therapy-illustration.webp",
    figureAlt: "Illustration of a proton beam depositing dose at a Bragg peak and stopping beyond the tumor",
    untaggedCities: ["mumbai", "bengaluru", "hyderabad"],
  },
  {
    procedure: "Brachytherapy",
    shortName: "brachytherapy",
    briefName: "Brachytherapy",
    slug: "brachytherapy",
    definition:
      "Brachytherapy places a radioactive source inside or next to the target so that a high dose can be given over a short distance, with a rapid fall-off away from the source.",
    indication:
      "It may be considered for selected gynaecological, prostate, breast, head-and-neck or other accessible tumours, often combined with external-beam radiation. Named applicator sheets exist when the corridor is already specified.",
    nonCandidate:
      "A target that cannot be reached safely with an applicator, or a plan that is already external-beam only, should not be billed as brachytherapy.",
    evaluation:
      "Examination, MRI or ultrasound of the applicator position, and prior EBRT dose decide whether intracavitary, interstitial or another form is honest.",
    approaches: [
      { label: "Intracavitary insertion", detail: "A neighbouring slug when a cavity applicator is the product." },
      { label: "Interstitial implant", detail: "A neighbouring slug when needles or catheters in tissue are the product." },
      { label: "Combined with EBRT", detail: "Common in cervix and other protocols; EBRT is a separate letter unless bundled." },
    ],
    technique:
      "After applicator placement — sometimes under anaesthesia — a planned source dwell delivers the dose. HDR courses may use several insertions; LDR is a different dwell pattern.",
    duration: "planning plus one or several insertions; each sitting may need theatre or day-care time",
    ward:
      "Often 1–7 nights or repeated day-care insertions. Parent or companion lodging should follow the insertion calendar.",
    recovery:
      "Cramping, urinary or bowel symptoms, and site-specific soreness are discussed individually. This is not an outpatient linac fraction.",
    implantRehab:
      "The quotation should name HDR versus LDR if specified, number of insertions, anaesthesia, imaging for each insertion, and whether EBRT is included or excluded.",
    distinctiveRisks:
      "Consent may address bleeding, infection, applicator displacement, urinary or bowel injury and the need for another insertion.",
    mobility:
      "Travel between insertions may be possible if the team agrees. A long-haul flight between fractions is a clinical decision.",
    flyHome:
      "Fitness to fly is discussed after the last insertion and a review of bleeding, pain and infection signs.",
    drivers: [
      { label: "Number of insertions", detail: "Each sitting adds theatre and imaging." },
      { label: "Anaesthesia", detail: "Should be named." },
      { label: "Intracavitary versus interstitial", detail: "Different applicator and stay assumptions." },
      { label: "Whether EBRT is bundled", detail: "Two letters unless written as one." },
      { label: "Imaging per insertion", detail: "MRI-based planning may be extra." },
    ],
    quoteItems: [
      "How many insertions and which applicator type are priced?",
      "Is anaesthesia and per-insertion imaging included? Is EBRT extra?",
    ],
    documents: ["Pelvic or site MRI and examination notes", "Any EBRT already delivered, with dose"],
    followUp:
      "Early review for bleeding or infection, then protocol follow-up. A local gynaecologic or radiation oncologist should receive the implant record.",
    related: ["Intracavitary Brachytherapy", "Interstitial Brachytherapy", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/brachytherapy-illustration.webp",
    figureAlt: "Illustration of an internal radiation source placed near a tumor with a short-range dose cloud",
  },
  {
    procedure: "Intracavitary Brachytherapy",
    shortName: "intracavitary brachytherapy",
    briefName: "Intracavitary Brachytherapy",
    slug: "intracavitary-brachytherapy",
    definition:
      "Intracavitary brachytherapy places a sealed source inside a natural body cavity — often the uterus, vagina or cervix — so dose is concentrated at the cavity wall and nearby target rather than delivered from a linac.",
    indication:
      "It is used most often in selected cervical and endometrial pathways, sometimes after hysterectomy for a vaginal-cuff plan, and occasionally in other hollow-organ settings a radiation oncologist already judges cavity-appropriate.",
    nonCandidate:
      "An irregular residual that already needs interstitial needles, or a plan that is external-beam only, should not be billed as an intracavitary insertion.",
    evaluation:
      "Examination, staging, prior pelvic surgery notes and any EBRT already delivered decide applicator type, HDR versus LDR, and whether a cavity applicator can cover the target.",
    approaches: [
      { label: "Tandem-and-ovoid or ring systems", detail: "Classic intact-uterus cervical geometry; packing and imaging still decide nearby-organ dose." },
      { label: "Vaginal-cylinder insertions", detail: "Selected post-hysterectomy vaginal-cuff pathways; diameter and active length are plan variables." },
      { label: "Image-guided adaptive insertions", detail: "Each sitting may be replanned when anatomy or applicator position changes." },
    ],
    technique:
      "After applicator insertion — often under anaesthesia — imaging confirms geometry, dwell times are calculated, and the source treats the cavity. HDR programmes usually use several insertions; LDR uses a longer dwell.",
    duration: "each insertion is a hospital sitting; HDR series often span several days or weeks",
    ward:
      "Day-care or short-stay is common for HDR. Companion lodging should follow the insertion calendar, not a single tourist night.",
    recovery:
      "Cramping, spotting and urinary discomfort can follow insertion. Sexual and bowel questions belong in counselling after pelvic courses.",
    implantRehab:
      "The quotation should name applicator type, HDR versus LDR, number of insertions, anaesthesia, imaging for each sitting, and whether pelvic EBRT is included or excluded.",
    distinctiveRisks:
      "Consent may address bleeding, infection, applicator injury, bladder or rectal irritation, and late bowel, bladder or sexual-function change after combined pelvic radiation.",
    mobility:
      "Travel between HDR insertions is a clinical decision. A long-haul flight in the middle of a series is rarely appropriate.",
    flyHome:
      "Fitness to fly is discussed after the last insertion and a review of bleeding, pain and infection signs — not on the first applicator day.",
    drivers: [
      { label: "Cavity and prior surgery", detail: "Intact-uterus and post-hysterectomy plans use different applicators." },
      { label: "HDR versus LDR", detail: "Different insertion counts and ward footprints." },
      { label: "Image-based planning", detail: "CT or MRI at each sitting may be extra." },
      { label: "Whether pelvic EBRT is bundled", detail: "Often a neighbouring letter in cervix pathways." },
      { label: "Anaesthesia and re-insertions", detail: "Difficult geometry can add sittings." },
    ],
    quoteItems: [
      "How many insertions and which applicator are priced?",
      "Is anaesthesia and per-insertion imaging included? Is pelvic EBRT extra?",
    ],
    documents: ["Pathology and FIGO or equivalent staging notes", "Prior pelvic surgery and any EBRT dose already delivered"],
    followUp:
      "Early review for bleeding or infection, then protocol follow-up. A local gynaecologic or radiation oncologist should receive the implant record.",
    related: ["Brachytherapy", "Interstitial Brachytherapy", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/intracavitary-brachytherapy-illustration.webp",
    figureAlt: "Illustration of a sealed radiation source seated in a body-cavity applicator beside a nearby target",
  },
  {
    procedure: "Interstitial Brachytherapy",
    shortName: "interstitial brachytherapy",
    briefName: "Interstitial Brachytherapy",
    slug: "interstitial-brachytherapy",
    definition:
      "Interstitial brachytherapy places needles or catheters directly into tissue so a sealed source can dwell inside or around a tumour bed that a cavity applicator cannot cover well.",
    indication:
      "It may be considered for selected prostate, breast, head-and-neck, soft-tissue or complex pelvic residual plans when needle geometry is already the honest way to reach the target.",
    nonCandidate:
      "A straightforward cavity insertion, or a plan that is already external-beam only, should not be labelled interstitial for a higher-sounding invoice.",
    evaluation:
      "Imaging of the residual or tumour bed, prior radiation dose, bleeding risk and anaesthesia fitness decide whether an implant is honest. Needle count is a clinical variable, not a package upgrade.",
    approaches: [
      { label: "Template-guided pelvic implants", detail: "Irregular pelvic residuals; sometimes combined with a cavity applicator in a hybrid plan." },
      { label: "Prostate interstitial implants", detail: "HDR or LDR seed programmes are different letters — do not compare them as one product." },
      { label: "Head-and-neck or soft-tissue implants", detail: "Selected accessible residuals; prior surgery and prior dose dominate risk discussion." },
    ],
    technique:
      "Needles or catheters are placed, usually under anaesthesia. Imaging verifies geometry, dwell times are calculated, and the implant is removed after the prescribed dwell.",
    duration: "implant, planning and dwell may occupy one long day or several hospital nights",
    ward:
      "Overnight observation is more common than with simple cavity insertions. The catalog stay is a planning hint, not a day-care promise.",
    recovery:
      "Pain, swelling, bruising and site-specific urinary or bowel symptoms are the usual short-term issues. Infection and bleeding are discussed in consent.",
    implantRehab:
      "The quotation should name implant type, expected needle or catheter count, anaesthesia, imaging, hospital nights, and whether any EBRT course is included.",
    distinctiveRisks:
      "Consent may address bleeding, infection, needle displacement requiring a replan, and late fibrosis or organ-function change in the implant volume.",
    mobility:
      "A companion who can help after a pelvic or prostate implant is practical. Stairs and long commutes on implant day are a poor match.",
    flyHome:
      "Fitness to fly is reviewed after needle removal and a check for bleeding, pain and infection — not on the morning of implantation.",
    drivers: [
      { label: "Implant volume and needle count", detail: "Theatre time and recovery scale with geometry." },
      { label: "Treatment site", detail: "Prostate, breast, head-and-neck and pelvic residuals are different sittings." },
      { label: "Anaesthesia and nights", detail: "Day-care quotes that omit nights are often incomplete." },
      { label: "Image-based replanning", detail: "Needle shift should change the plan." },
      { label: "Whether EBRT is bundled", detail: "A boost implant is not a full pelvic course." },
    ],
    quoteItems: [
      "What implant geometry and how many hospital nights are priced?",
      "Is anaesthesia and verification imaging included? Is EBRT extra?",
    ],
    documents: ["Operative notes describing the residual or tumour bed", "Recent imaging and prior radiation dose to the same site"],
    followUp:
      "Early wound and urinary review, then protocol follow-up. The implant record should travel home with the patient.",
    related: ["Brachytherapy", "Intracavitary Brachytherapy", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/interstitial-brachytherapy-illustration.webp",
    figureAlt: "Illustration of interstitial brachytherapy needles placed in tissue around a tumor bed",
  },
  {
    procedure: "Plaque Brachytherapy",
    shortName: "plaque brachytherapy",
    briefName: "Plaque Brachytherapy",
    slug: "plaque-brachytherapy",
    definition:
      "Plaque brachytherapy is an ocular radiation method: a sealed-source plaque is sutured to the eye wall beside an intraocular tumour, left for a calculated dwell of several days, then surgically removed.",
    indication:
      "It may be considered for selected intraocular tumours — including certain uveal melanomas — when an ocular oncologist already judges the size, location and extraocular status plaque-appropriate.",
    nonCandidate:
      "A pelvic or prostate brachytherapy referral, or an eye tumour that already belongs on enucleation or another ocular modality, should not be billed as a generic brachytherapy package.",
    evaluation:
      "Fundus photographs, ultrasound height and basal diameter, and systemic staging decide plaque geometry. A general radiation department without an ocular-oncology partnership is not a plaque programme.",
    approaches: [
      { label: "Standard circular plaques", detail: "When tumour geometry fits a stock plaque; macular and disc dose still govern risk." },
      { label: "Notched or custom plaques", detail: "Tumours near the optic nerve or irregular in shape; fabrication can add lead time." },
      { label: "Alternative ocular treatment", detail: "A responsible team will decline a plaque rather than force one onto the wrong geometry." },
    ],
    technique:
      "Two theatre events bookend a multi-day dwell. Placement and removal are usually under anaesthesia. The source stays on the eye during the inpatient or closely supervised interval.",
    duration: "plaque design, placement, a multi-day dwell, then a second anaesthetic for removal",
    ward:
      "Dwell days are not optional hotel days. Plan inpatient or closely supervised stay for [STAY] as a planning hint.",
    recovery:
      "Eye discomfort, swelling and temporary double vision are common early. Later cataract, retinopathy or vision change are discussed by the ocular oncologist — not by a generic radiation FAQ.",
    implantRehab:
      "The quotation should name plaque type or custom fabrication, isotope logistics, two anaesthetics, dwell nights, and early ophthalmic follow-up. A pelvic brachytherapy letter is the wrong document.",
    distinctiveRisks:
      "Consent may address infection, scleral issues, cataract, radiation retinopathy, incomplete tumour control and the possibility that vision will change.",
    mobility:
      "A companion is practical. Depth perception after ocular surgery is limited, and removal day is not a sightseeing day.",
    flyHome:
      "Do not treat removal day as departure day. Travel is discussed after an early ophthalmic check and a review of pain, infection and vision.",
    drivers: [
      { label: "Tumour maps", detail: "Height, basal diameter and posterior location change plaque size and theatre time." },
      { label: "Plaque and isotope logistics", detail: "Not every campus stocks or fabricates plaques." },
      { label: "Two anaesthetics", detail: "Placement and removal are separate theatre events." },
      { label: "Ocular-oncology partnership", detail: "The first shortlist filter, not a hospital brand." },
      { label: "Later ophthalmic procedures", detail: "Cataract or retinal care is usually a neighbouring bill." },
    ],
    quoteItems: [
      "Is this a stock or custom plaque, and how many dwell nights are priced?",
      "Are both anaesthetics and the early ophthalmic review included?",
    ],
    documents: ["Ocular-oncology notes with tumour height, diameter and location", "Fundus photographs and ultrasound measurements"],
    followUp:
      "Serial ophthalmic review after return. Local eye-cancer follow-up is part of the pathway, not an optional extra.",
    related: ["Brachytherapy", "Proton Beam Therapy", "External Beam Radiotherapy (EBRT)"],
    figureSrc: "/costs/plaque-brachytherapy-illustration.webp",
    figureAlt: "Illustration of an ocular radiation plaque positioned on the wall of the eye beside an intraocular tumor",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru"],
  },
  {
    procedure: "Intraoperative Radiotherapy (IORT)",
    shortName: "IORT",
    briefName: "IORT",
    slug: "intraoperative-radiotherapy-iort",
    definition:
      "Intraoperative radiotherapy delivers a single radiation dose in the operating room to an exposed tumour bed after the surgeon has removed the mass and while nearby organs can be moved or shielded.",
    indication:
      "It may be considered in selected protocols — certain breast pathways and other site-specific programmes — when a tumour-bed dose at the time of resection is already written into the plan.",
    nonCandidate:
      "IORT is not a standalone tourist radiation course, and owning a device does not make every cancer operation an IORT case.",
    evaluation:
      "Surgical candidacy, device availability in or beside theatre, prior dose and the written protocol decide whether IORT will even be attempted. Intraoperative findings can still cancel the dose.",
    approaches: [
      { label: "IORT as sole radiation", detail: "Selected, tightly defined protocols — often breast — where no later external-beam course is planned." },
      { label: "IORT as a boost plus later EBRT", detail: "A second letter unless the quotation bundles both pieces." },
      { label: "No IORT after intraoperative findings", detail: "Ask what you owe if the bed is unsuitable or the device is unavailable that day." },
    ],
    technique:
      "After resection, the radiation oncologist and physicist set an applicator or IORT unit on the tumour bed, deliver a single fraction under the same anaesthetic, then surgery finishes in the usual way.",
    duration: "adds radiation setup and delivery time to the operation; stay follows the surgical admission",
    ward:
      "Stay is tied to the cancer operation, not to a linac day-care visit. Flight dates follow surgical clearance.",
    recovery:
      "Wound recovery, pain and mobility follow the operation. Later external beam, if used, brings its own course and side-effect profile.",
    implantRehab:
      "Read [INDIA_COST] as the intraoperative radiation component unless the letter explicitly bundles the entire cancer operation. Ask the cancellation policy if the dose is not delivered.",
    distinctiveRisks:
      "All risks of the parent operation apply. Consent may also address wound healing in a freshly irradiated bed and site-specific organ injury if shielding is imperfect.",
    mobility:
      "This is surgical travel. Pack for an operation, not for a four-week fraction commute — unless later EBRT is already planned in India.",
    flyHome:
      "Fitness to fly follows the operation and any planned later fractions. IORT minutes do not set the flight date.",
    drivers: [
      { label: "Whether IORT is actually delivered", detail: "Intraoperative cancellation needs a written fee policy." },
      { label: "Surgical magnitude", detail: "Breast IORT and a large gastrointestinal resection are different invoices." },
      { label: "Later external beam", detail: "Some protocols still fractionate after the operative dose." },
      { label: "Device and team availability", detail: "Choreography in theatre is a calendar driver." },
      { label: "The parent operation", detail: "Usually larger than the IORT line." },
    ],
    quoteItems: [
      "Does this letter include the cancer operation, or only the IORT component?",
      "What is billed if IORT is cancelled in theatre, and is later EBRT extra?",
    ],
    documents: ["Surgical plan and staging imaging", "Protocol documents if a standard IORT pathway is proposed"],
    followUp:
      "Surgical follow-up plus, if used, the later radiation course. The operative and IORT dose record should travel home.",
    related: ["External Beam Radiotherapy (EBRT)", "Intensity-Modulated Radiotherapy (IMRT)", "Brachytherapy"],
    figureSrc: "/costs/iort-illustration.webp",
    figureAlt: "Illustration of intraoperative radiotherapy delivering a single dose to an exposed tumor bed during surgery",
    untaggedCities: ["mumbai"],
  },
  {
    procedure: "Total Body Irradiation (TBI)",
    shortName: "TBI",
    briefName: "TBI",
    slug: "total-body-irradiation-tbi",
    definition:
      "Total body irradiation is radiation given to the whole body, almost always as part of a haematopoietic stem-cell transplant conditioning protocol rather than as elective solid-tumour treatment.",
    indication:
      "It is used when a transplant protocol already includes TBI — selected leukaemia, lymphoma and other haematological pathways. It is not a treatment you add because a solid tumour “might benefit from whole-body radiation.”",
    nonCandidate:
      "Shopping for TBI as standalone radiation tourism, or labelling a local palliative course as TBI, is not how the therapy is used.",
    evaluation:
      "Complete haematology records, prior lines of therapy, organ-function work-up, graft source and any previous radiation — including prior TBI — decide whether conditioning with TBI is even discussable.",
    approaches: [
      { label: "Myeloablative fractionated TBI", detail: "Higher-intensity conditioning; not an outpatient radiation course." },
      { label: "Reduced-intensity TBI", detail: "Selected older or less-fit candidates; still a transplant admission." },
      { label: "Non-TBI conditioning", detail: "If the protocol uses chemotherapy only, do not shop for TBI." },
    ],
    technique:
      "Simulation includes whole-body geometry and lung shielding if used. Fractions follow the protocol — often more than once a day over several days — while the patient lives on a transplant ward.",
    duration: "TBI days sit inside a transplant admission that lasts weeks",
    ward:
      "Plan for the transplant stay, not for a radiation-only visit. Isolation-ward nights and a caregiver are part of logistics.",
    recovery:
      "Recovery is transplant recovery: infection risk, graft function, nutrition and, in children, later growth or endocrine surveillance. Attributing the entire course to “radiation side effects” understates the regimen.",
    implantRehab:
      "Read [INDIA_COST] as the radiation-component planning band. Donor search, graft, ICU, antimicrobials and graft-versus-host care are separate and usually larger.",
    distinctiveRisks:
      "Consent covers nausea, mucositis, marrow suppression, infection, pneumonitis, infertility and — in children — growth or endocrine effects, plus all graft-related risks that dominate the long-term picture.",
    mobility:
      "Do not book TBI travel without a transplant slot, a funding plan and a discharge-to-home infection plan. A caregiver who can stay for the full admission is not optional theatre.",
    flyHome:
      "Travel follows transplant discharge criteria and infection-control advice, not the last TBI fraction.",
    drivers: [
      { label: "Myeloablative versus reduced-intensity TBI", detail: "Dose and fractionation change both linac time and ward staffing." },
      { label: "Paediatric versus adult geometry", detail: "Children may need anaesthesia and later growth surveillance." },
      { label: "Lung shielding and technique", detail: "Protocol-specific planning time." },
      { label: "The surrounding transplant invoice", detail: "Comparing TBI lines while ignoring graft and ICU costs is meaningless." },
      { label: "Prior radiation", detail: "Previous TBI or local dose can contraindicate further whole-body treatment." },
    ],
    quoteItems: [
      "Is this the TBI radiation component only, or a transplant package?",
      "Which fractionation and shielding are assumed, and is paediatric anaesthesia included?",
    ],
    documents: ["Complete haematology and prior-therapy records", "Donor or graft-source documentation and organ-function work-up"],
    followUp:
      "Transplant follow-up, infection surveillance and, where relevant, paediatric endocrine review. The TBI dose record must travel with the graft summary.",
    related: ["External Beam Radiotherapy (EBRT)", "Intensity-Modulated Radiotherapy (IMRT)"],
    relatedBlogs: [{ href: "/blogs/records-before-you-book-ebrt", label: "Records to send before radiation travel" }],
    figureSrc: "/costs/tbi-illustration.webp",
    figureAlt: "Illustration of total body irradiation as whole-body radiation inside a stem-cell transplant protocol",
    untaggedCities: ["mumbai"],
  },
];

export const radiationOncologyArticles: CostArticle[] = profiles.map(createRadiationArticle);

export const radiationOncologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  radiationOncologyArticles.map((article) => [article.slug, article]),
);


