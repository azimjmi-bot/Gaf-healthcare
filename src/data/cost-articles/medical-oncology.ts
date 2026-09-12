import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type MedicalOncologyProfile = {
  procedure: string;
  shortName: string;
  briefName: string;
  slug: string;
  definition: string;
  indication: string;
  notAutomatic: string;
  selection: string;
  approaches: LabelledDetail[];
  administration: string;
  duration: string;
  setting: string;
  monitoring: string;
  sideEffects: string;
  travel: string;
  flyHome: string;
  drivers: LabelledDetail[];
  quoteItems: string[];
  records: string[];
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
    ecosystem: string;
    logistics: string;
    lodging: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    ecosystem:
      "Delhi, Gurugram, Noida and Faridabad form one referral market but not one daily-treatment campus. Pathology review, molecular testing, infusion day-care and emergency cover should be mapped to the same named hospital before a family chooses a district.",
    logistics:
      "Cross-NCR traffic is a poor fit for an early blood test followed by a timed infusion. A flat in Gurugram may be impractical when the day-care and emergency department are in central Delhi or Faridabad.",
    lodging:
      "For repeated cycles, choose a serviced stay near the treating campus with food storage, lift access and a companion bed. Winter air quality can matter to a patient with lung disease or treatment-related breathlessness.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    ecosystem:
      "Mumbai combines tertiary cancer hospitals, private infusion units and pathology laboratories across Mumbai and Navi Mumbai. Those are distinct care geographies: the place that dispenses the drug should also be able to manage an infusion reaction.",
    logistics:
      "Harbour crossings, peak traffic and monsoon disruption can turn a short map distance into a missed blood-test or day-care slot. Confirm whether scans, pharmacy dispensing and infusion occur on one campus.",
    lodging:
      "Stay on the same side of the harbour as the named unit. A kitchen and predictable car access are more useful during repeated cycles than an airport hotel or a tourist address in another district.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    ecosystem:
      "Bengaluru has oncology hospitals and molecular-diagnostics services, but this page does not infer that every campus dispenses every anticancer medicine. The named regimen, pharmacy availability and procedure-tagged oncologist remain the evidence.",
    logistics:
      "The airport is north of the city while many cancer units are south or east. Whitefield, Bannerghatta Road and central Bengaluru are different commutes for a patient returning for blood counts and infusions.",
    lodging:
      "Book after the campus is confirmed. Milder weather may help a longer stay, but traffic and food hygiene still shape the practical recovery week after a cycle.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    ecosystem:
      "Chennai has longstanding cancer referral pathways and international desks serving South Asia and the Gulf. The useful question is whether pathology, the required drug, day-care monitoring and urgent review sit inside the named programme.",
    logistics:
      "Airport access can be comparatively direct for several hospital districts. Heat and humidity still make long transfers difficult after an infusion, particularly when nausea, diarrhoea or fatigue develops.",
    lodging:
      "Choose an air-conditioned stay close to the infusion campus and keep flights flexible through the first cycle. A short airport road does not remove the need for nadir blood counts or toxicity review.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    ecosystem:
      "Hyderabad's oncology services span Jubilee Hills, Banjara Hills, Kondapur and Secunderabad. A city label does not establish drug stock or molecular-testing turnaround at a particular hospital.",
    logistics:
      "The airport is south of the major hospital districts. Confirm where blood tests, pharmacy dispensing, infusion and emergency care occur before choosing a HITEC City or central-city stay.",
    lodging:
      "Summer heat can compound dehydration after treatment. A nearby serviced apartment with a kitchen and a companion is usually more practical than repeated airport-side transfers.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a comparison band. A named medical oncologist must review pathology, stage, biomarkers, dose and cycle assumptions before a hospital issues an itemized estimate.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Regimen- and cycle-dependent",
    positioning: "Private international oncology market",
    context:
      "Compare the exact medicines, dose basis, number of cycles, laboratory monitoring and supportive drugs rather than a general cancer package.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Regimen- and cycle-dependent",
    positioning: "Private international hospitals",
    context:
      "International desks may coordinate care, but medicine acquisition, biomarker testing, day-care fees and lodging between cycles need written confirmation.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Regimen- and cycle-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for Gulf families; pharmacy, infusion, specialist and monitoring charges may still be billed separately.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Regimen- and cycle-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Ask for a self-pay estimate tied to drug names, vial use, dose, cycles and biomarker assumptions rather than a broad medical-oncology label.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Regimen- and cycle-dependent",
    positioning: "European specialist oncology care",
    context:
      "International access, medicine reimbursement, professional billing and follow-up arrangements vary by centre and patient status.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Regimen- and cycle-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should confirm eligibility, private pharmacy pricing, infusion fees and who manages toxicity after they return home.",
  },
  {
    country: "United States",
    stay: "Regimen- and cycle-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Hospital, oncologist, laboratory, imaging and drug bills may come from different entities. [US_COST] is a catalog comparison band, not one bundled quotation.",
  },
];

function catalogGap(profile: MedicalOncologyProfile, citySlug: CostCitySlug, city: string) {
  if (profile.untaggedCities?.includes(citySlug)) {
    return (
      `The current GAF entity graph has no clinician tagged to ${profile.procedure} in ${city}. ` +
      "The page therefore leaves doctor and hospital cards empty instead of borrowing a generic oncology profile. This is a catalog gap, not proof that the treatment is unavailable across the city."
    );
  }
  return (
    `Cards appear only when the live CMS links a clinician to ${profile.procedure} in ${city}. ` +
    "Placement is not a ranking, medicine-stock claim, treatment-volume claim or outcome promise."
  );
}

function makeCities(profile: MedicalOncologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gap = catalogGap(profile, citySlug, place.city);
    return {
      citySlug,
      ecosystem: `${place.ecosystem} ${gap}`,
      logistics: `${place.airport}: ${place.logistics} ${place.lodging}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning band until a named hospital supplies a regimen-specific quotation.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Medical Oncologists & Hospitals`,
        seoDescription:
          `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Compare medicines, cycles, monitoring, medical oncologists and hospital terms.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff; cancer type, medicines, dose, cycles and monitoring determine the written estimate.`,
        intro: [
          `${profile.indication} ${profile.selection}`,
          place.ecosystem,
          `${place.logistics} ${place.lodging}`,
          gap,
          "Share complete pathology, imaging, prior treatment and available biomarker reports before making non-refundable travel arrangements. The regimen may change after pathology review or examination.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored for broad travel planning. No verified city-only tariff is stored, and this is not a final quotation.`,
          `${profile.administration} ${profile.monitoring}`,
        ],
        costExplanation: [
          `The amount can move with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. It should not be divided into an invented per-cycle price without a named regimen and dose.`,
          "Ask the hospital to identify the medical oncologist, exact medicines, brand or biosimilar assumption, dose basis, cycle count, day-care fees, supportive drugs, laboratory schedule and emergency-admission exclusions.",
          `Outside the hospital letter, budget for travel through ${place.airport}, lodging near the unit, meals suited to treatment, local transport, visa needs and flexible return flights.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send pathology, scans, treatment summaries and molecular reports before travel to ${place.city}.`,
          "Arrive with time for pathology reconciliation, blood tests and a medical-oncology review. A remote opinion can change when the original tissue, current scan or organ function is reassessed.",
          `${place.lodging} Decide with the treating team whether later cycles can safely continue at home before buying a long stay.`,
        ],
        hospitalDiscussion: [
          gap,
          "Confirm that the named campus can source the quoted medicine and manage infusion reactions or treatment-related complications. A general oncology label does not establish current stock, price or expertise.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only tariff is stored. Final pricing requires the drug, dose, number of cycles and an itemized hospital letter.`,
          },
          {
            q: `Which ${place.city} medical oncologists provide ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact CMS procedure should appear. If no card appears, that is a catalog gap rather than a hidden list or ranking.",
          },
          {
            q: `What should a ${place.city} quotation name?`,
            a: "The regimen, medicine names, brand or biosimilar basis, dose, cycle count, day-care, tests, supportive medicines and emergency-admission policy.",
          },
          {
            q: `Where should an international patient stay in ${place.city}?`,
            a: `${place.lodging} Keep the booking flexible until the first toxicity review.`,
          },
          {
            q: "Can later cycles continue at home?",
            a: profile.flyHome,
          },
        ],
      },
    };
  });
}

function createMedicalOncologyArticle(profile: MedicalOncologyProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.monitoring,
    seoTitle: `${profile.briefName} Cost in India: Medical Oncologists, Drugs & Monitoring`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare medicines, cycles, testing, medical oncologists, hospitals and international-patient planning.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST]; cancer type, regimen, dose, cycles, tests and supportive care determine the final hospital quotation.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.selection} Treatment names are not prescriptions: pathology, stage, organ function, previous therapy, treatment goals and clinical evidence determine what is appropriate.`,
      `${profile.administration} ${profile.monitoring}`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for travel planning. These are comparison bands, not a drug recommendation, treatment guarantee or final quotation.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored course is [STAY], but the actual timeline depends on cancer type, treatment intent, the named regimen, number of cycles, response, toxicity and whether later cycles continue at home.`,
      `${profile.administration} ${profile.monitoring} The medicine, dose and cycle assumptions must appear in the written estimate; a planning range is not a final hospital quotation.`,
      `${profile.setting} ${profile.travel}`,
    ],
    indiaCost: [
      `The [INDIA_COST] figure is the GAF national planning band for ${profile.shortName}. It may describe consultation, a stated medicine plan, day-care and scheduled monitoring, but it does not establish what one hospital will charge.`,
      `Important cost drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Medicine acquisition can dominate the invoice, so a quote without drug names, dose and cycle count is not comparable.`,
      "No separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad price is shown unless verified city data exists. This system currently inherits the national band and labels that limitation plainly.",
    ],
    costComponents: [
      {
        label: "Medical oncologist and pathology review",
        detail: `Confirmation of diagnosis, stage, intent and whether ${profile.shortName} is supported by the available evidence.`,
      },
      {
        label: "Biomarker or molecular testing when relevant",
        detail:
          "Immunohistochemistry, molecular profiling or germline testing only when clinically indicated. Ask whether tissue review and the test itself are included.",
      },
      {
        label: "Named anticancer medicines",
        detail:
          "The written regimen, dose basis, brand or biosimilar assumption, vial use and number of cycles. A generic 'drug package' is insufficient.",
      },
      {
        label: "Infusion or dispensing",
        detail: `${profile.setting} Confirm day-care nursing, pharmacy preparation and any oral-drug dispensing fees.`,
      },
      {
        label: "Supportive medicines",
        detail:
          "Anti-nausea treatment, hydration, growth-factor support, infection prevention or blood products only when prescribed and explicitly listed.",
      },
      {
        label: "Monitoring and follow-up",
        detail: `${profile.monitoring} Confirm which blood tests, scans and consultations sit inside the package window.`,
      },
    ],
    whyQuotesDiffer:
      `Two estimates may not describe the same ${profile.shortName} course. Compare drug names, originator or biosimilar assumption, dose, body-surface-area calculation where relevant, cycle count, testing, day-care, supportive medicines and admission exclusions line by line.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named medical-oncology assessment",
        detail: "A consultation tied to the oncologist expected to lead the plan, where bundled.",
      },
      {
        label: "Documented regimen and cycle allowance",
        detail: `The estimate should use the exact treatment name ${profile.procedure} and state medicine, dose basis and number of administrations.`,
      },
      {
        label: "Quoted medicine and day-care",
        detail: "Only the brands, biosimilars, vials, pharmacy preparation and infusion visits written into the letter are included.",
      },
      {
        label: "Quoted baseline and on-treatment tests",
        detail: "Blood counts, organ-function tests and response imaging only to the extent listed.",
      },
      {
        label: "Quoted supportive care",
        detail: "Anti-emetics, hydration and other prescribed support only when itemized.",
      },
    ],
    exclusions: [
      {
        label: "Additional pathology, imaging or molecular testing",
        detail: "Repeat biopsy, outside-slide review, NGS or new imaging may be separate when results are incomplete or the disease has changed.",
      },
      {
        label: "Extra cycles, dose changes or a new regimen",
        detail: "Treatment beyond the stated cycle allowance or a switch after progression or toxicity requires a revised estimate.",
      },
      {
        label: "Unlisted supportive medicines and blood products",
        detail: "Growth factors, antimicrobials, transfusions and symptom-control medicines are not automatically bundled.",
      },
      {
        label: "Emergency admission or complication care",
        detail: "Neutropenic fever, severe immune toxicity, dehydration or organ injury can require inpatient care outside a day-care letter.",
      },
      {
        label: "Travel, lodging and care after return",
        detail: "Flights, visas, companion stay, local transport and monitoring by the home oncology team are normally outside the hospital quote.",
      },
    ],
    approachComparison: {
      heading: `Treatment approaches related to ${profile.briefName}`,
      intro: [
        `${profile.selection} The rows below are clinical alternatives or neighbouring pathways, not consumer upgrades.`,
        "A medical oncologist should explain why the proposed approach fits the pathology and treatment goal, and what result would trigger a change.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by pathology, stage, biomarkers and treatment intent",
        detail: item.detail,
        procedure: item.label,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Recommended?`,
    overview: {
      what: [profile.definition, profile.administration, profile.monitoring],
      who: [profile.indication, profile.notAutomatic],
      how: [
        profile.selection,
        `${profile.administration} Commonly discussed approaches include ${approachSummary}.`,
        `${profile.setting} ${profile.monitoring}`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.selection} Send complete reports and imaging files rather than a photograph of a prescription.`,
        "Before treatment, the team may repeat blood counts, kidney or liver tests, infection screening, cardiac assessment or pregnancy testing according to the proposed medicine. These are regimen-specific, not universal.",
      ],
      recovery: [
        `${profile.setting} ${profile.sideEffects}`,
        profile.monitoring,
        `The catalog's [STAY] is a broad planning guide, not a promise that the patient can fly or stop monitoring on a fixed date.`,
        `${profile.followUp} Seek urgent clinical help for fever, breathing difficulty, new confusion, severe diarrhoea, uncontrolled vomiting, bleeding or any warning sign specified by the treating team.`,
      ],
    },
    topicSections: [
      {
        id: "side-effects",
        heading: `Side effects and considerations during ${profile.briefName}`,
        paragraphs: [
          profile.sideEffects,
          "Effects vary by medicine, dose, combination, treatment site, previous therapy and individual health. Not every patient experiences every listed effect, and this is not an exhaustive consent list.",
          "The treating medical oncologist should explain expected effects, urgent warning signs, monitoring and when a dose should be held. No page can promise response, cure or a mild treatment course.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes more than the [INDIA_COST] planning band: pathology reconciliation, tests, medicines, infusion or dispensing, supportive care, monitoring, companion travel, lodging and contingency for a delayed or changed cycle.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa letter or directory card is not medical clearance.",
      ],
      stages: [
        {
          label: "Records, pathology and prior-treatment review",
          detail: "Share biopsy, immunohistochemistry, scans, treatment summaries, medicine doses and toxicity history.",
        },
        {
          label: "Biomarker review when relevant",
          detail: "Confirm whether existing tissue is adequate, whether testing could change the plan, and who interprets the result.",
        },
        {
          label: "Regimen and itemized estimate",
          detail: "Match medicine, dose, cycle count, day-care, tests, supportive drugs and emergency exclusions.",
        },
        {
          label: "Arrival and baseline assessment",
          detail: "Allow time for examination, pathology reconciliation and regimen-specific organ-function tests before the first administration.",
        },
        {
          label: "Treatment and monitoring",
          detail: `${profile.administration} ${profile.monitoring}`,
        },
        {
          label: "Handover and return-home plan",
          detail: `${profile.flyHome} Carry the treatment summary, doses, toxicity record and next monitoring date.`,
        },
      ],
    },
    journey: [
      {
        label: "Send complete oncology records",
        detail: "Provide pathology, immunohistochemistry, imaging files, prior regimens, dose dates, discharge summaries and molecular reports.",
      },
      {
        label: "Confirm clinical acceptance",
        detail: "A named medical oncologist reviews diagnosis, intent, evidence, travel safety and whether the hospital can source the proposed medicines.",
      },
      {
        label: "Hold a remote consultation",
        detail: "Ask why this approach is proposed, what alternatives exist, what remains uncertain and who will manage toxicity.",
      },
      {
        label: "Compare itemized estimates",
        detail: "Use the same medicine, dose and cycle assumptions; do not compare one vial with a whole course.",
      },
      {
        label: "Plan flexible travel",
        detail: "Obtain required documents and book refundable travel near the exact campus, with contingency for delayed blood counts or extra review.",
      },
      {
        label: "Repeat necessary baseline checks",
        detail: "The team may reconcile pathology and repeat laboratory, imaging or organ-function tests before treatment.",
      },
      {
        label: "Receive treatment",
        detail: `${profile.administration} The plan can change for toxicity, response or new pathology information.`,
      },
      {
        label: "Monitor between administrations",
        detail: profile.monitoring,
      },
      {
        label: "Review fitness to travel",
        detail: profile.flyHome,
      },
      {
        label: "Continue care at home",
        detail: `Transfer the regimen, doses, adverse-event record and scan schedule to the local team. ${profile.followUp}`,
      },
    ],
    documents: [
      ...profile.records,
      "Complete pathology report and immunohistochemistry; original slides or blocks if requested",
      "Recent CT, MRI or PET files rather than phone photographs",
      "All prior systemic-treatment names, doses, dates and reasons for stopping",
      "Molecular or germline reports where relevant, including laboratory and specimen details",
      "Current medicines, allergies, recent blood counts and organ-function tests",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are explicitly modelled from relative private-care levels and are not official drug tariffs or evidence that a medicine is available.",
      "International comparisons fail when the drug, dose, cycle count, biomarker testing and supportive care differ. Obtain like-for-like written estimates after records review.",
    ],
    destinationNote:
      "All figures are planning information. Cancer type, stage, regimen, drug origin, dose, cycles, tests, supportive care, hospital terms and currency can change the final amount; no row predicts outcome.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad inherit the stored India planning band because no verified city-only tariff is held for these Medical Oncology treatments. A national range is not a local quotation.",
      "Doctor and hospital cards resolve only from exact live CMS relationships. This module names no medicine stock, clinical-trial access, volume, rating or outcome, and an empty card area remains visibly empty.",
    ],
    whyIndia: [
      "Some international patients consider India for access to medical oncology review, hospital day-care and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The useful comparison is a named oncologist, evidence-based regimen, medicine source, dose and cycle transparency, toxicity cover and a handover that the home team can continue.",
      "No hospital or clinician is described as best. Urgent disease, poor fitness to fly, unstable complications or funded care near home may make international travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered now, and what alternatives were discussed?`,
      "Has the pathology been reviewed, and is the stage current?",
      "Is biomarker, molecular or germline testing clinically relevant, and is it included?",
      "Who is the named medical oncologist, and at which exact campus is treatment delivered?",
      "Which medicines, brands or biosimilars are quoted?",
      "How is the dose calculated, and how many cycles or months are included?",
      "Are pharmacy preparation, infusion day-care and nursing included?",
      "Are anti-nausea medicines, hydration and other supportive medicines included?",
      "Are growth factors or blood products included if prescribed?",
      "Which blood tests and scans are included?",
      "What is charged if the dose is held, reduced or changed?",
      "What happens if additional cycles are recommended?",
      "Are emergency admission and complication care excluded?",
      "Can later cycles or monitoring continue safely at home?",
      "Which follow-up consultation and written handover are included?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This is a stored comparison range, not a quotation; medicine, dose, cycles, testing and hospital terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.indication },
      {
        q: "Does every patient with this cancer need the same treatment?",
        a: `${profile.notAutomatic} Selection requires individual medical-oncology and multidisciplinary review.`,
      },
      {
        q: "Do biomarker or molecular tests affect treatment selection?",
        a: profile.selection,
      },
      {
        q: "How is the treatment given?",
        a: profile.administration,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. [STAY] is the catalog travel-planning assumption, not a fixed course.`,
      },
      {
        q: "Are anticancer medicines included in the hospital package?",
        a: "Only medicines named in the itemized estimate are included. Confirm the drug, brand or biosimilar, dose, vial use and cycle allowance.",
      },
      {
        q: "What can make the quotation change?",
        a: `Important drivers include ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}.`,
      },
      {
        q: "What monitoring is usually needed?",
        a: profile.monitoring,
      },
      {
        q: "Can the regimen change after arrival?",
        a: "Yes. Pathology review, examination, organ function, toxicity or new imaging can change the medicine, dose or timing. The hospital should revise the estimate in writing.",
      },
      {
        q: "How should an international patient choose a medical oncologist?",
        a: "Verify the clinician's role, exact procedure relationship, proposed regimen, communication, toxicity cover and handover. Directory placement is not a ranking.",
      },
      {
        q: "Can later treatment continue after returning home?",
        a: profile.flyHome,
      },
      {
        q: "What follow-up is required?",
        a: profile.followUp,
      },
    ],
    doctorHeading: `Medical oncologists to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} medical oncologists in [CITY]`,
    doctorIntro:
      `Profiles are pulled dynamically only when ${profile.procedure} appears in the clinician's current CMS relationships. Verify role, treatment relevance, availability and campus. Placement is not a ranking and this article adds no experience, drug-stock or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards follow exact live treatment and clinician relationships. Accreditation or a general oncology label does not prove current drug availability, molecular-testing access, treatment volume, clinical-trial access or outcomes.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: profile.figureSrc,
        alt: profile.figureAlt,
        caption:
          "A general educational pathway, not a treatment recommendation or the biology of a specific patient's cancer.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/costs/medical-oncology-treatment-pathway.webp",
        alt: `Medical oncology pathway from records and pathology review through treatment planning and monitoring for ${profile.shortName}`,
        caption:
          "The regimen can change after pathology review, baseline testing, response assessment or toxicity.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/medical-oncology-international-journey.webp",
        alt: `International patient journey from remote oncology review to treatment in India and follow-up at home for ${profile.shortName}`,
        caption:
          "Clinical acceptance and an itemized regimen come before travel; treatment eligibility and outcomes are never guaranteed.",
        fit: "contain",
      },
    ],
  };
}

const profiles: MedicalOncologyProfile[] = [
  {
    procedure: "Chemotherapy",
    shortName: "chemotherapy",
    briefName: "Chemotherapy",
    slug: "chemotherapy",
    definition:
      "Chemotherapy uses cytotoxic medicines that damage rapidly dividing cancer cells and may be given by infusion, injection or tablets in repeating treatment-and-recovery cycles.",
    indication:
      "It may be used with curative intent, before or after surgery, with radiation, or to control advanced disease across many solid tumours and blood cancers.",
    notAutomatic:
      "Chemotherapy is not appropriate for every cancer or every patient, and two people with the same organ diagnosis may need different regimens or no chemotherapy.",
    selection:
      "Pathology, stage, treatment goal, previous therapy, organ function and sometimes biomarkers determine the regimen. Body-surface area commonly affects dose, while kidney, liver or marrow function may require adjustment.",
    approaches: [
      { label: "Neoadjuvant Chemotherapy", detail: "Cycles before surgery when the multidisciplinary plan uses systemic treatment first." },
      { label: "Adjuvant Chemotherapy", detail: "Post-operative cycles selected from final pathology and recurrence risk." },
      { label: "Palliative Chemotherapy", detail: "Treatment for disease control or symptoms when cure is not the stated goal." },
    ],
    administration:
      "An infusion regimen is prepared by oncology pharmacy and given in day-care over minutes or hours; some regimens use oral or injected medicines. Each cycle includes treatment days and a recovery interval.",
    duration: "regimen-specific cycles often spread across three to six months",
    setting:
      "Most cycles are day-care, but prolonged infusions, complications or frailty may require admission. A hospital should be able to manage reactions and neutropenic fever.",
    monitoring:
      "Blood counts and kidney or liver tests are commonly checked before cycles. Examination and interval imaging assess benefit; toxicity can delay, reduce or stop a dose.",
    sideEffects:
      "Depending on the drugs, possible effects include fatigue, nausea, reduced blood counts, infection risk, hair loss, mouth soreness, bowel change or neuropathy. None is inevitable, and patterns differ sharply by regimen.",
    travel:
      "International patients should decide before travel whether the entire course occurs in India or whether later cycles transfer to a home oncologist using the same protocol.",
    flyHome:
      "Later cycles can sometimes continue at home when the receiving oncologist accepts the regimen and monitoring plan. Travel timing should avoid the expected low-count period and follow the treating team's review.",
    drivers: [
      { label: "Named regimen and medicines", detail: "A low-cost generic doublet and a regimen containing costly agents are not comparable packages." },
      { label: "Number of cycles", detail: "A one-cycle estimate must not be read as the whole course." },
      { label: "Dose and body-surface area", detail: "Patient-specific dosing changes vial use and medicine cost." },
      { label: "Originator versus biosimilar or generic", detail: "Where alternatives exist, selection remains a clinical and procurement decision." },
      { label: "Supportive care", detail: "Anti-emetics, growth factors, hydration, transfusions and infection treatment may sit outside the drug line." },
      { label: "Day-care versus admission", detail: "Complications can convert an outpatient cycle into an inpatient bill." },
    ],
    quoteItems: [
      "Is the estimate per cycle or for the full planned course?",
      "Which blood-count thresholds can delay a cycle, and what is billed when treatment is postponed?",
    ],
    records: ["Biopsy pathology and staging report", "Complete prior chemotherapy names, doses, dates and toxicity history"],
    followUp:
      "Follow-up includes toxicity review and response assessment on a schedule set by the regimen. A local oncologist should receive the exact medicines, doses and next blood-test date.",
    related: ["Neoadjuvant Chemotherapy", "Adjuvant Chemotherapy", "Palliative Chemotherapy", "Targeted Therapy", "Immunotherapy"],
    figureSrc: "/costs/chemotherapy-cycle-illustration.webp",
    figureAlt:
      "Medical illustration showing a general chemotherapy cycle from infusion through recovery, blood tests and the next cycle",
  },
];

export const medicalOncologyArticles: CostArticle[] = profiles.map(createMedicalOncologyArticle);

export const medicalOncologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  medicalOncologyArticles.map((article) => [article.slug, article]),
);
