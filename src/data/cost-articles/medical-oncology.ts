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
  specialistLabel?: string;
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
      "Are pathology-review charges included, and are original slides or blocks needed?",
      "Which medicines, brands or biosimilars are quoted?",
      "How is the dose calculated, and how many cycles or months are included?",
      "Are pharmacy preparation, infusion day-care and nursing included?",
      "Are anti-nausea medicines, hydration and other supportive medicines included?",
      "Are growth factors or blood products included if prescribed?",
      "Which blood tests and scans are included?",
      "What is charged if the dose is held, reduced or changed?",
      "What happens if additional cycles are recommended?",
      "Are emergency admission and complication care excluded?",
      "Are any planned hospital-admission or observation charges included?",
      "Can later cycles or monitoring continue safely at home?",
      "Which follow-up consultation and written handover are included?",
      "What costs are explicitly excluded from the treatment package?",
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
    doctorHeading: `${profile.specialistLabel ?? "Medical oncologists"} to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} ${profile.specialistLabel?.toLowerCase() ?? "medical oncologists"} in [CITY]`,
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
  {
    procedure: "Immunotherapy",
    shortName: "immunotherapy",
    briefName: "Immunotherapy",
    slug: "immunotherapy",
    definition:
      "Cancer immunotherapy uses medicines or cellular approaches intended to help the immune system recognise or attack cancer; checkpoint inhibitors are the commonest systemic example in routine solid-tumour care.",
    indication:
      "It may be considered for selected lung, melanoma, kidney, bladder, head-and-neck and other cancers when pathology, stage and biomarkers support it, either alone or in combination.",
    notAutomatic:
      "An immune drug is not appropriate for every tumour, and autoimmune disease, organ transplantation, frailty or lack of supporting evidence may change the balance.",
    selection:
      "Cancer type, line of therapy, PD-L1 or other validated biomarkers where relevant, molecular findings, previous treatment and autoimmune history guide selection. A biomarker can inform a decision without guaranteeing response.",
    approaches: [
      { label: "Immune Checkpoint Inhibitor Therapy", detail: "PD-1, PD-L1 or CTLA-4 blockade when the indication already supports it." },
      { label: "Immunotherapy plus chemotherapy", detail: "A combined regimen with two medicine budgets and overlapping monitoring." },
      { label: "Targeted Therapy", detail: "A different biomarker-led pathway when an actionable driver, rather than immune sensitivity, governs treatment." },
    ],
    administration:
      "Most checkpoint medicines are intravenous infusions repeated every few weeks; schedules differ by drug and indication. Cellular or vaccine approaches are separate products and should not be hidden under a generic immunotherapy quote.",
    duration: "outpatient administrations every two to six weeks, continued only while benefit and tolerance justify it",
    setting:
      "Usually infusion day-care. The treating hospital needs a route to urgent medical, endocrine, respiratory, gastrointestinal and other specialist assessment when immune toxicity is suspected.",
    monitoring:
      "Blood counts, liver, kidney and thyroid tests are commonly reviewed, with symptom checks and interval imaging. New diarrhoea, breathlessness, rash or endocrine symptoms may trigger urgent tests and a treatment hold.",
    sideEffects:
      "Possible immune-related effects include rash, colitis, hepatitis, thyroid or other endocrine disturbance and pneumonitis. They are not inevitable, can appear after treatment stops, and sometimes require steroids or admission.",
    travel:
      "A family should know who will recognise and treat delayed immune toxicity after return. Carry the exact drug, dates and emergency advice rather than the word 'immunotherapy' alone.",
    flyHome:
      "Later infusions may continue at home if the local oncologist accepts the protocol and medicine access is confirmed. Travel should wait when active immune toxicity, high-dose steroids or unstable symptoms remain.",
    drivers: [
      { label: "Exact immune medicine", detail: "Drug and indication dominate cost; 'immunotherapy' is not a priced regimen." },
      { label: "Dose and schedule", detail: "Fixed versus weight-based dosing and q2–6-week schedules alter vial use." },
      { label: "Number of administrations", detail: "Duration may depend on benefit and tolerance rather than a fixed course." },
      { label: "Combination with chemotherapy", detail: "Adds cytotoxic drugs, supportive care and monitoring." },
      { label: "Immune-toxicity work-up", detail: "Specialist review, imaging, steroids or admission may be separate." },
    ],
    quoteItems: ["Which immune medicine, dose and number of administrations are priced?", "Who manages immune-related toxicity after hours, and is admission excluded?"],
    records: ["Pathology, staging and biomarker reports", "Autoimmune, transplant and prior immunotherapy history"],
    followUp:
      "Follow-up includes symptom screening, laboratory review and response imaging. Delayed immune adverse effects remain relevant after the last infusion.",
    related: ["Immune Checkpoint Inhibitor Therapy", "Chemotherapy", "Targeted Therapy", "Molecular Targeted Therapy"],
    figureSrc: "/costs/immunotherapy-illustration.webp",
    figureAlt: "Medical illustration showing immune-cell, checkpoint-signal, tumour-cell and response-monitoring steps in cancer immunotherapy",
  },
  {
    procedure: "Targeted Therapy",
    shortName: "targeted therapy",
    briefName: "Targeted Therapy",
    slug: "targeted-therapy",
    definition:
      "Targeted therapy uses a medicine aimed at a molecular alteration, receptor or signalling pathway that matters to a particular cancer rather than treating all cancers as biologically alike.",
    indication:
      "It may be considered in selected breast, lung, colorectal, melanoma, kidney, gastrointestinal stromal and haematological cancers when a validated target or clinical context supports the drug.",
    notAutomatic:
      "Finding a mutation does not automatically make a drug useful: the alteration may be non-actionable, the indication unsupported, or resistance may already be present.",
    selection:
      "Validated pathology, immunohistochemistry and molecular testing establish whether the target is present. Specimen age, tumour content, previous therapy and disease evolution can determine whether retesting is needed.",
    approaches: [
      { label: "Molecular Targeted Therapy", detail: "A narrower catalog pathway when a named mutation, fusion or amplification drives selection." },
      { label: "Antibody-Drug Conjugate Therapy", detail: "A target-binding antibody carrying a cytotoxic payload; not interchangeable with an oral inhibitor." },
      { label: "Precision Oncology", detail: "Testing and interpretation that may — or may not — identify an actionable treatment." },
    ],
    administration:
      "Some targeted medicines are tablets taken daily; others are injections or infusions on repeating schedules. Oral treatment still needs prescribing, interaction checks, toxicity monitoring and reliable supply.",
    duration: "oral or infusion treatment often continues for months while benefit and tolerance remain",
    setting:
      "Oral regimens are usually managed through clinic and pharmacy; antibody or other infused regimens use day-care. Admission is reserved for complications, not assumed in the medicine price.",
    monitoring:
      "Blood tests, blood pressure, ECG or cardiac imaging, skin review, eye review or other tests depend on the medicine. Interval scans assess response and emerging resistance.",
    sideEffects:
      "Possible effects include rash, diarrhoea, liver-test changes, blood-pressure change, cardiac effects, cytopenias or site-specific toxicity. The pattern belongs to the exact drug, not the word targeted.",
    travel:
      "For oral therapy, verify legal export, cold-chain needs if any, supply continuity, interaction counselling and who can adjust the dose after the patient returns home.",
    flyHome:
      "Oral treatment can often continue at home if medicine supply, laboratory monitoring and a local prescriber are secured. An infusion regimen needs a receiving unit that can obtain the same drug.",
    drivers: [
      { label: "Target and exact medicine", detail: "Different molecular targets lead to very different drug prices." },
      { label: "Molecular or receptor testing", detail: "Tissue adequacy and repeat testing may add cost before any medicine is chosen." },
      { label: "Originator, biosimilar or generic", detail: "Where alternatives exist, availability and clinical judgement matter." },
      { label: "Duration and resistance", detail: "Months of therapy and a later drug change drive total cost." },
      { label: "Medicine-specific monitoring", detail: "Cardiac, eye, liver or other surveillance may sit outside the pharmacy line." },
    ],
    quoteItems: ["Which documented target supports this medicine?", "How many weeks or cycles of medicine, dispensing and monitoring are included?"],
    records: ["Full molecular and immunohistochemistry reports with laboratory details", "Prior targeted medicines and reason for stopping"],
    followUp:
      "Monitoring combines medicine-specific toxicity checks with response imaging. At progression, the team may need a new biopsy or molecular test rather than an automatic refill.",
    related: ["Molecular Targeted Therapy", "Precision Oncology", "Antibody-Drug Conjugate Therapy", "Immunotherapy"],
    figureSrc: "/costs/targeted-therapy-illustration.webp",
    figureAlt: "Medical illustration showing biomarker testing, a matched cancer target, selected medicine and response reassessment",
  },
  {
    procedure: "Hormone Therapy",
    shortName: "hormone therapy",
    briefName: "Hormone Therapy",
    slug: "hormone-therapy",
    definition:
      "Hormone therapy, also called endocrine therapy, blocks hormone production or receptor signalling in cancers that depend on hormones, particularly selected breast and prostate cancers.",
    indication:
      "It may be used before or after local treatment, for recurrence prevention, or to control advanced hormone-sensitive disease when receptor status and the clinical setting support it.",
    notAutomatic:
      "It is not useful for hormone-receptor-negative disease, and menopausal status, prostate-disease state, clot risk, bone health and previous endocrine exposure change the choice.",
    selection:
      "Pathology receptor results, disease stage, menopausal or gonadal status, prior treatment, bone density and comorbidities guide the medicine. Molecular tests may refine selected decisions but are not universally required.",
    approaches: [
      { label: "Oral endocrine therapy", detail: "Daily tablets selected by tumour type and hormonal setting." },
      { label: "Injectable suppression", detail: "Scheduled injections that suppress hormone production or block a receptor." },
      { label: "Combination with Targeted Therapy", detail: "Selected advanced-disease pathways add a targeted medicine and a separate monitoring burden." },
    ],
    administration:
      "Treatment may be a daily tablet, periodic injection, or a combination. Long duration makes continuity, adherence and management of chronic effects more important than one clinic visit.",
    duration: "outpatient tablets or injections may continue for years, depending on indication and tolerance",
    setting:
      "Usually outpatient with no hospital admission. Injection administration, bone-health treatment or management of complications can add separate visits.",
    monitoring:
      "Clinical review may include bone density, lipids, liver tests, blood pressure, prostate markers or gynaecological assessment depending on the medicine and cancer.",
    sideEffects:
      "Possible effects include hot flushes, sexual symptoms, joint discomfort, bone loss, fatigue, metabolic change or clot risk. The profile differs between drug classes and is not inevitable for every patient.",
    travel:
      "The medical-tourism question is usually not how to stay in India for years; it is how to obtain a validated plan, begin safely and transfer prescribing and monitoring home.",
    flyHome:
      "Most patients can continue tablets or scheduled injections at home after a stable plan is documented. Confirm medicine availability and monitoring with a local oncologist before departure.",
    drivers: [
      { label: "Drug class and combination", detail: "Endocrine monotherapy and endocrine-plus-targeted therapy are different budgets." },
      { label: "Duration", detail: "Low monthly cost can become material over years." },
      { label: "Oral versus depot injection", detail: "Administration and visit frequency differ." },
      { label: "Bone-health monitoring and medicines", detail: "DEXA, supplements or bone agents may be separate." },
      { label: "Management of chronic effects", detail: "Specialist reviews can add cost over a long course." },
    ],
    quoteItems: ["Is the range for one month, one injection or the stated full period?", "Which bone-health and metabolic monitoring is included?"],
    records: ["Hormone-receptor pathology or prostate cancer records", "Menopausal or gonadal status and bone-density history"],
    followUp:
      "Long-term follow-up checks adherence, chronic toxicity and disease status. The prescribing plan should identify who manages bone, metabolic and sexual-health effects.",
    related: ["Targeted Therapy", "Molecular Targeted Therapy", "Maintenance Therapy"],
    figureSrc: "/costs/hormone-therapy-illustration.webp",
    figureAlt: "Medical illustration showing receptor testing, hormone-signal blockade, oral or injectable therapy and long-term review",
    untaggedCities: ["bengaluru"],
  },
  {
    procedure: "Precision Oncology",
    shortName: "precision oncology",
    briefName: "Precision Oncology",
    slug: "precision-oncology",
    definition:
      "Precision oncology combines detailed tumour characterisation — often genomic profiling — with clinical interpretation to determine whether a molecular finding should change diagnosis, prognosis or treatment.",
    indication:
      "It may be considered when a validated biomarker could affect a standard treatment, when common options are exhausted, or when rare-tumour diagnosis and trial matching need deeper review.",
    notAutomatic:
      "A large sequencing panel is not treatment by itself, and many reports contain no actionable finding or identify a drug unsupported for that tumour.",
    selection:
      "The team first asks whether testing can answer a clinical question, whether tissue is adequate, and whether a tissue or liquid assay is suitable. The laboratory, panel scope and interpretation matter.",
    approaches: [
      { label: "Tissue next-generation sequencing", detail: "Profiles DNA or RNA from a suitable tumour specimen; tissue quality can limit results." },
      { label: "Liquid-biopsy profiling", detail: "Uses circulating tumour DNA in selected settings; a negative result may be uninformative." },
      { label: "Molecular Targeted Therapy", detail: "A neighbouring treatment sheet only when an actionable result supports a medicine." },
    ],
    administration:
      "Precision oncology is usually a records, specimen and consultation pathway rather than a drug infusion. Tissue is reviewed, a validated assay is selected, and results are interpreted in clinical context.",
    duration: "specimen review, testing turnaround and a specialist consultation; medicine duration is separate",
    setting:
      "Usually outpatient or remote. A new biopsy may require day-care or admission depending on site, but it is not automatically included in the panel fee.",
    monitoring:
      "The immediate output is an interpreted report and plan. If a treatment starts, monitoring follows that medicine; repeat molecular testing may be considered when resistance develops.",
    sideEffects:
      "The test itself usually has no medicine toxicity; biopsy risks apply if new tissue is needed. The larger risk is misinterpretation — treating a low-evidence finding as a proven target.",
    travel:
      "Many records and specimen steps can begin before travel. Do not fly for a panel until the centre confirms the clinical question, specimen route and who will interpret the result.",
    flyHome:
      "Testing and consultation can often be completed remotely or with a short visit. Any resulting treatment needs a separate travel, prescribing and monitoring plan.",
    drivers: [
      { label: "Panel scope and laboratory", detail: "Small validated panels and broad DNA/RNA assays have different costs and utility." },
      { label: "Existing tissue versus new biopsy", detail: "Insufficient or old material may add a procedure." },
      { label: "Tissue versus liquid testing", detail: "These answer overlapping but not identical questions." },
      { label: "Pathology and interpretation", detail: "Expert review and molecular tumour-board time are part of useful precision care." },
      { label: "Resulting treatment", detail: "Any matched medicine is a separate, often much larger invoice." },
    ],
    quoteItems: ["What clinical question will the panel answer, and which laboratory performs it?", "Does the estimate include specimen retrieval, pathology review and post-test interpretation?"],
    records: ["Pathology report and details of stored tissue blocks", "All prior molecular reports and treatment history"],
    followUp:
      "The patient needs a written interpretation that distinguishes established options, trials and unsupported findings. The test result should transfer to the treating oncologist.",
    related: ["Molecular Targeted Therapy", "Targeted Therapy", "Immunotherapy"],
    figureSrc: "/costs/precision-oncology-illustration.webp",
    figureAlt: "Medical illustration showing tumour tissue or blood testing, a molecular panel, tumour-board review and an actionable plan",
    untaggedCities: ["mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Molecular Targeted Therapy",
    shortName: "molecular targeted therapy",
    briefName: "Molecular Targeted Therapy",
    slug: "molecular-targeted-therapy",
    definition:
      "Molecular targeted therapy uses a medicine selected for a documented mutation, fusion, amplification or other tumour-driving alteration.",
    indication:
      "It may be considered when a cancer has a validated actionable lesion and the drug has evidence in that tumour and treatment setting.",
    notAutomatic:
      "A molecular alteration is not automatically a prescription; evidence level, prior resistance, disease site, interactions and access all matter.",
    selection:
      "A qualified laboratory report must identify the specimen, method and alteration. The oncologist checks whether the result is current, biologically relevant and supported by clinical evidence.",
    approaches: [
      { label: "Targeted Therapy", detail: "The broader family, which also includes receptor- and pathway-directed medicines." },
      { label: "Precision Oncology", detail: "Testing and interpretation that may identify a molecularly matched option." },
      { label: "Chemotherapy", detail: "A valid alternative or partner when molecular treatment alone is not the supported plan." },
    ],
    administration:
      "Many molecular inhibitors are oral daily medicines; some matched antibodies or other agents are infused. Each has medicine-specific dosing, interaction and monitoring rules.",
    duration: "oral or infusion treatment often continues for months until progression, toxicity or a planned endpoint",
    setting:
      "Usually outpatient. Oral dispensing does not remove the need for a medical-oncology clinic, laboratory checks and urgent advice.",
    monitoring:
      "Laboratory tests and scans assess toxicity and response. At progression, resistance testing may change the target or show that another treatment class is needed.",
    sideEffects:
      "Rash, diarrhoea, liver abnormalities, blood-pressure or cardiac effects and other toxicities vary by target and medicine. The exact drug consent governs.",
    travel:
      "Confirm a continuous legal supply, storage, interaction review and access to repeat molecular testing. A one-month box is not a long-term plan.",
    flyHome:
      "Many oral regimens can continue at home if supply and local monitoring are secured. Infused matched therapy requires a receiving day-care unit.",
    drivers: [
      { label: "Specific molecular medicine", detail: "Prices vary substantially across targets and lines of therapy." },
      { label: "Assay and specimen adequacy", detail: "Repeat tissue or liquid testing may be needed." },
      { label: "Duration and resistance", detail: "Total cost is often monthly, not a fixed package." },
      { label: "Originator or generic availability", detail: "Availability differs by molecule and remains a clinical procurement decision." },
      { label: "Medicine-specific monitoring", detail: "Cardiac, liver, blood-pressure or other checks may be separate." },
    ],
    quoteItems: ["Which alteration and evidence support the drug?", "Is the quote one month, one cycle or a stated full period, and what happens at resistance?"],
    records: ["Original molecular report with method and specimen details", "Prior targeted therapy and resistance history"],
    followUp:
      "Follow-up pairs toxicity review with response imaging. A progression plan should address whether re-biopsy or liquid testing is useful.",
    related: ["Targeted Therapy", "Precision Oncology", "Chemotherapy", "Immunotherapy"],
    figureSrc: "/costs/molecular-targeted-therapy-illustration.webp",
    figureAlt: "Medical illustration showing a molecular lesion, matched medicine, dosing plan and resistance reassessment",
    untaggedCities: ["mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Immune Checkpoint Inhibitor Therapy",
    shortName: "immune checkpoint inhibitor therapy",
    briefName: "Immune Checkpoint Inhibitor Therapy",
    slug: "immune-checkpoint-inhibitor-therapy",
    definition:
      "Immune checkpoint inhibitor therapy blocks signals such as PD-1, PD-L1 or CTLA-4 that can restrain immune-cell activity against cancer.",
    indication:
      "It may be considered in selected cancers and lines of therapy when the tumour type, stage, biomarker context and patient's health support checkpoint blockade.",
    notAutomatic:
      "PD-L1 level alone does not settle every decision, and autoimmune disease, organ transplant, previous severe immune toxicity or lack of evidence may make treatment unsuitable.",
    selection:
      "Pathology, line of therapy, validated biomarker testing where required, prior drugs, autoimmune history and organ function are reviewed together. A positive test never guarantees response.",
    approaches: [
      { label: "Immunotherapy", detail: "The broader family; this sheet is specifically checkpoint blockade." },
      { label: "Checkpoint inhibitor monotherapy", detail: "One immune medicine in a supported setting." },
      { label: "Checkpoint combination", detail: "Two immune agents or immune-plus-chemotherapy, with higher medicine and toxicity-management cost." },
    ],
    administration:
      "The drug is usually infused in day-care every two to six weeks, with schedules depending on medicine and indication. Combination regimens may have different visit calendars.",
    duration: "repeated outpatient infusions, with total duration determined by protocol, benefit and tolerance",
    setting:
      "Infusion day-care with access to urgent multidisciplinary care. Severe colitis, pneumonitis, hepatitis or endocrine crisis can require admission.",
    monitoring:
      "Symptoms, blood counts, liver, kidney and thyroid function and interval imaging are reviewed. The team must distinguish immune toxicity, infection and cancer progression.",
    sideEffects:
      "Possible immune-related adverse effects include rash, diarrhoea or colitis, hepatitis, thyroid or pituitary dysfunction and pneumonitis. They can arise after the last dose and may need steroids.",
    travel:
      "International patients need an emergency letter naming the checkpoint drug and a home team that understands delayed immune toxicity.",
    flyHome:
      "Travel and later infusions may be possible when symptoms and tests are stable and a receiving oncologist is in place. Active immune toxicity or high-dose steroids can delay travel.",
    drivers: [
      { label: "Checkpoint medicine and combination", detail: "Single-agent and dual-agent treatment are different invoices." },
      { label: "Dose and interval", detail: "Fixed or weight-based dosing and infusion frequency affect cost." },
      { label: "Number of administrations", detail: "Duration may change with benefit and toxicity." },
      { label: "Biomarker and pathology review", detail: "Testing requirements differ by cancer and line." },
      { label: "Immune-toxicity care", detail: "Specialist work-up, steroids and admission may be separate." },
    ],
    quoteItems: ["Which checkpoint medicine and how many doses are included?", "Does the campus provide after-hours immune-toxicity assessment?"],
    records: ["Pathology, staging and PD-L1 or other relevant biomarker reports", "Autoimmune, transplant and prior immune-toxicity history"],
    followUp:
      "Follow-up includes delayed toxicity screening and response imaging. The exact drug and dates should appear in the handover.",
    related: ["Immunotherapy", "Chemotherapy", "Targeted Therapy"],
    figureSrc: "/costs/checkpoint-inhibitor-therapy-illustration.webp",
    figureAlt: "Medical illustration showing checkpoint biomarker review, infusion, immune-toxicity monitoring and response scanning",
    untaggedCities: ["delhi-ncr", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Neoadjuvant Chemotherapy",
    shortName: "neoadjuvant chemotherapy",
    briefName: "Neoadjuvant Chemotherapy",
    slug: "neoadjuvant-chemotherapy",
    definition:
      "Neoadjuvant chemotherapy is systemic treatment given before a planned operation, often to shrink disease, treat microscopic spread early or show how the tumour responds.",
    indication:
      "It may be used in selected breast, gastrointestinal, sarcoma, bladder, ovarian and other multidisciplinary pathways when pre-operative treatment is evidence-based.",
    notAutomatic:
      "Giving chemotherapy first is not correct for every operable cancer; urgent surgery, tumour biology, resectability, symptoms and patient fitness can favour another sequence.",
    selection:
      "Biopsy pathology, staging, biomarkers, surgical assessment and baseline organ function are reviewed before the first cycle. The surgeon and medical oncologist should agree how and when response will be reassessed.",
    approaches: [
      { label: "Chemotherapy", detail: "The parent systemic-treatment family." },
      { label: "Adjuvant Chemotherapy", detail: "Post-operative treatment; sequencing and pathology assumptions differ." },
      { label: "Neoadjuvant systemic combination", detail: "May add targeted or immune medicine when the disease-specific protocol supports it." },
    ],
    administration:
      "Treatment uses regimen-specific day-care or oral cycles before surgery. Imaging or examination after defined cycles decides whether surgery proceeds, changes or is deferred.",
    duration: "pre-operative cycles commonly span two to four months before surgical reassessment",
    setting:
      "Usually outpatient day-care. Admission may be needed for complications. The surgical date must remain coordinated rather than treated as a separate tourism booking.",
    monitoring:
      "Blood tests precede cycles, and response is assessed clinically and by disease-appropriate imaging. Toxicity or progression can alter both chemotherapy and the operation.",
    sideEffects:
      "Effects follow the named regimen and may include fatigue, nausea, cytopenias, infection risk, hair loss or neuropathy. Surgical timing also depends on marrow and general recovery.",
    travel:
      "Decide whether cycles and surgery both occur in India. Splitting the sequence between countries requires direct oncologist-to-surgeon handover and transferable imaging.",
    flyHome:
      "Travel between chemotherapy and surgery is possible only if the teams agree on the interval and the patient is clinically stable. Do not let a flight dictate the operative window.",
    drivers: [
      { label: "Cancer-specific regimen", detail: "Pre-operative breast, bladder and sarcoma protocols are not one product." },
      { label: "Number of pre-operative cycles", detail: "The surgical response checkpoint sets the allowance." },
      { label: "Added targeted or immune medicine", detail: "A second treatment class can dominate cost." },
      { label: "Response imaging", detail: "Scans before surgery may be separately priced." },
      { label: "Surgical coordination", detail: "Delayed counts or complications can add lodging and repeat assessment." },
    ],
    quoteItems: ["How many cycles occur before response imaging and surgical review?", "Is the surgery a separate quotation, and who owns the operative date?"],
    records: ["Biopsy and complete staging imaging", "Written surgical assessment and planned response checkpoint"],
    followUp:
      "The post-cycle review documents response and transfers doses and toxicities to the operating team. Further post-operative treatment remains a separate decision.",
    related: ["Chemotherapy", "Adjuvant Chemotherapy", "Targeted Therapy", "Immunotherapy"],
    figureSrc: "/costs/neoadjuvant-chemotherapy-illustration.webp",
    figureAlt: "Medical illustration showing staging, pre-operative chemotherapy cycles, response review and coordinated surgery planning",
    untaggedCities: ["bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Adjuvant Chemotherapy",
    shortName: "adjuvant chemotherapy",
    briefName: "Adjuvant Chemotherapy",
    slug: "adjuvant-chemotherapy",
    definition:
      "Adjuvant chemotherapy is systemic treatment given after an operation to lower the risk from microscopic cancer cells that surgery and scans cannot show.",
    indication:
      "It may be considered when final pathology, stage, biomarkers and evidence show that post-operative chemotherapy offers a worthwhile reduction in recurrence risk.",
    notAutomatic:
      "Not every removed cancer needs chemotherapy, and delayed wound recovery, limited expected benefit, frailty or an alternative targeted or endocrine plan can change the recommendation.",
    selection:
      "The medical oncologist reviews the final pathology — not only the pre-operative biopsy — together with margins, nodes, biomarkers, surgical recovery and organ function.",
    approaches: [
      { label: "Chemotherapy", detail: "The parent treatment family; this sheet addresses post-operative intent." },
      { label: "Neoadjuvant Chemotherapy", detail: "Treatment before surgery, with a different response and timing question." },
      { label: "Targeted Therapy", detail: "May accompany or replace cytotoxic treatment in selected biomarker-defined pathways." },
    ],
    administration:
      "Regimen-specific cycles begin after adequate surgical recovery and are usually delivered in infusion day-care, sometimes with oral medicines.",
    duration: "post-operative cycles commonly span three to six months, depending on cancer and regimen",
    setting:
      "Usually outpatient. Wound problems, infection or treatment complications can require admission and delay the next cycle.",
    monitoring:
      "Blood counts and organ function are checked before cycles. Clinical review watches wound recovery and toxicity; surveillance imaging follows the disease-specific plan.",
    sideEffects:
      "Possible fatigue, nausea, reduced counts, infection, hair loss or neuropathy depend on the regimen. Post-operative nutrition and recovery can affect tolerance.",
    travel:
      "The first question is whether the safe post-operative start window permits travel. Pathology review and recovery should be confirmed before flights are booked.",
    flyHome:
      "Later cycles may transfer home if the receiving oncologist accepts the regimen and has the final pathology, operative note, doses and toxicity record.",
    drivers: [
      { label: "Final pathology and regimen", detail: "Stage and biology determine whether treatment and costly additions are indicated." },
      { label: "Number of cycles", detail: "The course, not one day-care visit, is the relevant budget." },
      { label: "Post-operative recovery", detail: "Delayed healing can add tests, lodging or admission." },
      { label: "Added targeted medicine", detail: "Biomarker-led additions can materially change the invoice." },
      { label: "Supportive care", detail: "Growth factors and transfusions are not always bundled." },
    ],
    quoteItems: ["Has final pathology, not only the biopsy, been reviewed?", "How does the proposed start date account for wound recovery and travel?"],
    records: ["Final surgical pathology and operative note", "Post-operative discharge and wound-recovery summary"],
    followUp:
      "The completion summary should document all doses, delays and toxicities. Surveillance then follows the cancer-specific plan.",
    related: ["Chemotherapy", "Neoadjuvant Chemotherapy", "Maintenance Therapy", "Targeted Therapy"],
    figureSrc: "/costs/adjuvant-chemotherapy-illustration.webp",
    figureAlt: "Medical illustration showing final pathology review, post-operative chemotherapy cycles, toxicity checks and surveillance",
    untaggedCities: ["bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Palliative Chemotherapy",
    shortName: "palliative chemotherapy",
    briefName: "Palliative Chemotherapy",
    slug: "palliative-chemotherapy",
    definition:
      "Palliative chemotherapy uses anticancer medicines when the stated goal is disease control, symptom relief or longer life rather than cure.",
    indication:
      "It may be considered for advanced or recurrent cancer when expected benefit, symptoms, performance status and the patient's goals support treatment.",
    notAutomatic:
      "More treatment is not always better: frailty, rapid decline, severe toxicity, low expected benefit or a preference for comfort-focused care can make chemotherapy inappropriate.",
    selection:
      "The oncologist should state the treatment goal, chance of meaningful benefit in plain language, alternatives and the point at which treatment would stop. Pathology and biomarkers still matter.",
    approaches: [
      { label: "Chemotherapy", detail: "The parent treatment family; this pathway is defined by non-curative intent." },
      { label: "Targeted Therapy", detail: "A possible alternative when an actionable target and evidence exist." },
      { label: "Supportive care without anticancer medicine", detail: "A valid clinical option that should not be hidden from the discussion." },
    ],
    administration:
      "Lower-intensity or standard regimen-specific cycles may be infused or taken orally. Treatment continues only while benefit and tolerance justify the burden.",
    duration: "outpatient cycles with explicit response and stop checkpoints rather than a guaranteed fixed course",
    setting:
      "Usually outpatient, but advanced disease and complications make admission more likely. Symptom control and palliative-care access should exist alongside day-care.",
    monitoring:
      "Symptoms, function, blood tests and interval imaging are reviewed. A scan is not the only measure: treatment burden and the patient's goals matter.",
    sideEffects:
      "Fatigue, nausea, cytopenias, infection, neuropathy or appetite change may reduce quality of life. The balance between benefit and burden must be revisited.",
    travel:
      "International travel can consume time and energy. Compare the clinical value of care near home with any cost or access advantage before committing to repeated cycles abroad.",
    flyHome:
      "Travel should occur only when symptoms are stable and care is arranged at home. A deteriorating patient may be safer receiving treatment and palliative support locally.",
    drivers: [
      { label: "Regimen intensity", detail: "Single-agent symptom-control treatment and a multi-drug regimen are different budgets." },
      { label: "Number of cycles before reassessment", detail: "Stop rules should be explicit." },
      { label: "Symptom and supportive care", detail: "Pain, nutrition, drainage or transfusion support may exceed the day-care fee." },
      { label: "Admission risk", detail: "Advanced disease can turn outpatient planning into inpatient care." },
      { label: "Travel burden", detail: "Companion time and flexible return plans are clinically relevant costs." },
    ],
    quoteItems: ["What is the stated goal and the first stop-or-continue checkpoint?", "Is palliative and symptom support included or separately arranged?"],
    records: ["Current staging, symptom and performance-status summary", "Prior treatment benefit, toxicity and reason for stopping"],
    followUp:
      "Each review should ask whether treatment is helping the outcomes that matter to the patient. Home palliative and emergency contacts should be arranged before return.",
    related: ["Chemotherapy", "Targeted Therapy", "Immunotherapy", "Maintenance Therapy"],
    figureSrc: "/costs/palliative-chemotherapy-illustration.webp",
    figureAlt: "Medical illustration showing goals-of-care review, symptom-aware chemotherapy, treatment cycles and benefit reassessment",
    untaggedCities: ["bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Antibody-Drug Conjugate Therapy",
    shortName: "antibody-drug conjugate therapy",
    briefName: "Antibody-Drug Conjugate Therapy",
    slug: "antibody-drug-conjugate-therapy",
    definition:
      "An antibody-drug conjugate links a target-seeking antibody to a cytotoxic payload, aiming to carry the drug toward cancer cells that express the relevant surface marker.",
    indication:
      "It may be considered in selected breast, gastric, lung, haematological and other cancers when the target, line of therapy and regulatory evidence support a specific conjugate.",
    notAutomatic:
      "A target-positive report does not make every conjugate appropriate, and products with different antibodies, linkers and payloads are not interchangeable.",
    selection:
      "Pathology confirms target expression or another required biomarker. Previous treatments, lung, liver, cardiac, marrow and neurological status may alter eligibility and monitoring.",
    approaches: [
      { label: "Targeted Therapy", detail: "The broader target-directed family; many targeted drugs do not carry a cytotoxic payload." },
      { label: "Chemotherapy", detail: "A cytotoxic alternative or partner with a different delivery mechanism." },
      { label: "Molecular Targeted Therapy", detail: "Selected by a genomic alteration rather than necessarily a surface antigen." },
    ],
    administration:
      "The named conjugate is usually infused in day-care on a repeating schedule. Pharmacy handling, premedication and observation depend on the product.",
    duration: "repeated infusions over weeks or months while benefit and tolerance justify treatment",
    setting:
      "Infusion day-care with access to urgent respiratory, neurological or haematology review when the product's known toxicities require it.",
    monitoring:
      "Blood counts and organ tests are common; some products require lung-symptom, cardiac, eye or neuropathy surveillance and interval imaging.",
    sideEffects:
      "Possible cytopenias, nausea, fatigue, neuropathy, eye effects, cardiac effects or drug-specific lung inflammation vary across conjugates. The exact product consent matters.",
    travel:
      "Confirm that the named product can be sourced for every planned cycle and that delayed product-specific toxicity can be managed after return.",
    flyHome:
      "Later infusions may transfer home only if the identical product, dosing plan and monitoring are available. New breathlessness or other serious toxicity should delay travel.",
    drivers: [
      { label: "Exact conjugate and target", detail: "Products are not price-equivalent or clinically interchangeable." },
      { label: "Dose and vial use", detail: "Weight-based dosing can materially change medicine cost." },
      { label: "Number of cycles", detail: "A single-infusion quote is not the course." },
      { label: "Target testing", detail: "Pathology review and validated assay may be separate." },
      { label: "Product-specific monitoring", detail: "Lung, cardiac, eye or neurological checks vary by conjugate." },
    ],
    quoteItems: ["Which exact antibody-drug conjugate, dose and cycles are quoted?", "Which product-specific toxicity monitoring and emergency care are included?"],
    records: ["Target biomarker pathology with assay details", "Prior therapies and lung, cardiac or neuropathy history"],
    followUp:
      "The handover should name the conjugate, dose, cumulative administrations and product-specific warning signs.",
    related: ["Targeted Therapy", "Chemotherapy", "Molecular Targeted Therapy"],
    figureSrc: "/costs/antibody-drug-conjugate-illustration.webp",
    figureAlt: "Medical illustration showing a surface target, antibody carrier, linked drug payload and toxicity review",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Maintenance Therapy",
    shortName: "maintenance therapy",
    briefName: "Maintenance Therapy",
    slug: "maintenance-therapy",
    definition:
      "Maintenance therapy is ongoing, often lower-intensity treatment given after initial disease control to delay progression or recurrence in a protocol where maintenance has evidence.",
    indication:
      "It may be considered after response or stable disease in selected ovarian, lung, colorectal, haematological and other pathways, using chemotherapy, targeted, immune or endocrine medicines.",
    notAutomatic:
      "A response does not automatically justify indefinite treatment; benefit, biomarkers, residual toxicity, quality of life and alternatives must support maintenance.",
    selection:
      "The team reviews induction response, pathology, biomarkers, cumulative toxicity and the evidence for the proposed maintenance medicine. A stop rule should be explicit.",
    approaches: [
      { label: "Lower-intensity chemotherapy", detail: "Selected protocols continue one component after combination induction." },
      { label: "Targeted Therapy", detail: "Biomarker-led oral or infused maintenance in supported settings." },
      { label: "Immunotherapy", detail: "Continued immune treatment where the disease-specific protocol uses it." },
    ],
    administration:
      "Maintenance may be an oral daily medicine or a periodic infusion. The calendar is less intensive than induction in some protocols, but it still requires prescribing and monitoring.",
    duration: "months or a protocol-defined period, with repeated stop-or-continue reviews",
    setting:
      "Usually outpatient. Oral treatment can reduce day-care visits but does not eliminate pharmacy, laboratory and consultation costs.",
    monitoring:
      "Blood tests, symptom review and interval imaging assess toxicity and disease control. Cumulative effects can change dose or stop treatment.",
    sideEffects:
      "Effects depend entirely on the maintenance medicine and may include fatigue, cytopenias, gastrointestinal symptoms, blood-pressure change or immune toxicity.",
    travel:
      "A long maintenance course is rarely a reason to remain abroad continuously. Build a safe transfer plan and a reliable medicine supply rather than a year-long hotel assumption.",
    flyHome:
      "Maintenance can often continue at home if medicine access, monitoring and a prescriber are secured. The Indian team should define dose, stop rules and next imaging.",
    drivers: [
      { label: "Maintenance medicine", detail: "Oral generic, targeted, immune and cytotoxic maintenance have different prices." },
      { label: "Duration", detail: "Monthly cost over a long period is the relevant budget." },
      { label: "Induction already received", detail: "Maintenance pricing should not quietly include or omit induction." },
      { label: "Monitoring frequency", detail: "Scans and laboratory tests continue despite lower treatment intensity." },
      { label: "Dose holds and stop rules", detail: "Unused medicine and revised dispensing can affect cost." },
    ],
    quoteItems: ["Is induction excluded, and what duration of maintenance is priced?", "What are the protocol stop rules and home-monitoring requirements?"],
    records: ["Induction regimen, response scans and cumulative toxicity", "Biomarker reports supporting the maintenance option"],
    followUp:
      "Follow-up repeatedly balances disease control, cumulative toxicity and quality of life. The home team needs the planned duration and stop rules.",
    related: ["Chemotherapy", "Targeted Therapy", "Immunotherapy", "Hormone Therapy"],
    figureSrc: "/costs/maintenance-therapy-illustration.webp",
    figureAlt: "Medical illustration showing induction response, a lower-intensity maintenance plan, repeated monitoring and stop rules",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Intraperitoneal Chemotherapy",
    shortName: "intraperitoneal chemotherapy",
    briefName: "Intraperitoneal Chemotherapy",
    slug: "intraperitoneal-chemotherapy",
    definition:
      "Intraperitoneal chemotherapy delivers anticancer medicine into the abdominal cavity through a catheter or as part of an operative pathway, creating different exposure from an intravenous infusion.",
    indication:
      "It may be considered in selected ovarian or peritoneal-surface protocols, including carefully selected catheter-based programmes or an operative heated-chemotherapy pathway.",
    notAutomatic:
      "Peritoneal disease does not automatically make someone an intraperitoneal candidate, and catheter IP chemotherapy, HIPEC and PIPAC are not interchangeable procedures.",
    selection:
      "Disease distribution, operation history, catheter feasibility, organ function and multidisciplinary evidence determine whether an IP route is reasonable and which form is meant.",
    approaches: [
      { label: "Catheter-based intraperitoneal cycles", detail: "Medicine delivered through an abdominal port on protocol-defined days." },
      { label: "Cytoreductive Surgery with HIPEC", detail: "Heated intraoperative chemotherapy after cytoreduction; a separate surgical sheet." },
      { label: "PIPAC", detail: "Pressurised aerosol chemotherapy during laparoscopy; not the same product." },
    ],
    administration:
      "Delivery may use an implanted peritoneal port during repeated cycles or occur in theatre as part of a defined procedure. The route, drug, temperature and surgical component must be named.",
    duration: "tied to repeated IP cycles or to the cytoreductive operation and its hospital recovery",
    setting:
      "Catheter cycles may be day-care; operative forms require anaesthesia and admission. A generic infusion quote is insufficient.",
    monitoring:
      "Blood tests, abdominal symptoms, catheter function and response imaging are reviewed. Operative pathways add wound, bowel and inpatient monitoring.",
    sideEffects:
      "Possible abdominal pain, nausea, infection, catheter problems, cytopenias or organ toxicity depend on the drug and route. Operative HIPEC carries separate surgical risks.",
    travel:
      "International patients must know whether the quote is catheter IP, HIPEC or another procedure and whether surgery, port placement and systemic cycles are separate.",
    flyHome:
      "Travel follows recovery from the actual route used. An operative pathway requires surgical clearance; catheter cycles need a local port and monitoring plan.",
    drivers: [
      { label: "Catheter IP versus operative delivery", detail: "Day-care cycles and cytoreductive surgery are not comparable invoices." },
      { label: "Drug and number of cycles", detail: "The intraperitoneal route does not standardise medicine cost." },
      { label: "Port placement", detail: "Insertion and later catheter complications may be separate." },
      { label: "Surgical component", detail: "Cytoreduction, ICU and hospital nights can dominate the bill." },
      { label: "Systemic chemotherapy", detail: "Intravenous treatment between IP cycles is usually another line." },
    ],
    quoteItems: ["Does 'intraperitoneal' mean catheter cycles, HIPEC or another route?", "Are surgery or port placement, drug, systemic cycles and complication care included?"],
    records: ["Operative and peritoneal-disease reports", "Imaging, pathology and prior systemic chemotherapy summary"],
    followUp:
      "Follow-up checks abdominal recovery, catheter function if present and disease response. Operative and drug records should transfer together.",
    related: ["Chemotherapy", "Cytoreductive Surgery with HIPEC", "PIPAC", "Ovarian Cancer Cytoreductive Surgery"],
    figureSrc: "/costs/intraperitoneal-chemotherapy-illustration.webp",
    figureAlt: "Medical illustration showing surgical review, abdominal access, local intraperitoneal drug delivery and systemic treatment planning",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "Intrathecal Chemotherapy",
    shortName: "intrathecal chemotherapy",
    briefName: "Intrathecal Chemotherapy",
    slug: "intrathecal-chemotherapy",
    definition:
      "Intrathecal chemotherapy delivers medicine into cerebrospinal fluid through a lumbar puncture or an implanted ventricular reservoir because ordinary bloodstream dosing may not reach the CNS adequately.",
    indication:
      "It may be considered for selected leptomeningeal disease or as CNS-directed treatment or prophylaxis in specific leukaemia and lymphoma protocols.",
    notAutomatic:
      "Brain or spinal symptoms do not automatically justify intrathecal treatment; diagnosis, CSF flow, pressure, systemic disease and neurological status must support it.",
    selection:
      "The haematology or neuro-oncology team reviews imaging, CSF studies, pathology, neurological examination and the parent systemic protocol before choosing lumbar or reservoir access.",
    approaches: [
      { label: "Lumbar-puncture administration", detail: "Repeated day-care spinal access when anatomy and protocol allow." },
      { label: "Ommaya-reservoir administration", detail: "Ventricular access after neurosurgical placement; device and theatre costs are separate unless bundled." },
      { label: "Systemic CNS-penetrant treatment", detail: "A different strategy used alone or alongside intrathecal dosing in selected protocols." },
    ],
    administration:
      "Medicine is injected into CSF through lumbar puncture or a reservoir under sterile conditions. Dose, frequency and CSF sampling follow the disease-specific protocol.",
    duration: "repeated day-care lumbar punctures or reservoir administrations on a protocol-defined calendar",
    setting:
      "Often day-care, with observation after administration. Reservoir insertion is a neurosurgical procedure and complications can require admission.",
    monitoring:
      "Neurological symptoms, blood counts, CSF findings and imaging are followed. Headache, fever, new weakness or confusion needs prompt assessment.",
    sideEffects:
      "Possible headache, nausea, chemical meningitis, infection, bleeding or neurological toxicity vary by medicine and access route. Device complications are additional.",
    travel:
      "Coordinate the parent leukaemia, lymphoma or solid-tumour plan rather than travelling for isolated spinal injections without systemic care.",
    flyHome:
      "Later doses may continue at home only if a receiving haematology or neuro-oncology team can use the same protocol and access device safely.",
    drivers: [
      { label: "Lumbar versus Ommaya access", detail: "Reservoir placement adds neurosurgery and device costs." },
      { label: "Number of administrations", detail: "Prophylactic and treatment calendars differ." },
      { label: "Medicine and CSF testing", detail: "Drug and serial laboratory work should be named." },
      { label: "Parent systemic protocol", detail: "Intrathecal dosing is rarely the whole cancer treatment." },
      { label: "Neurological complication care", detail: "Imaging or admission may be separate." },
    ],
    quoteItems: ["Is lumbar puncture or Ommaya access assumed, and who places the device?", "How many doses and CSF tests are included, and is systemic treatment separate?"],
    records: ["Brain and spine imaging plus CSF reports", "Haematology or oncology protocol and prior CNS-directed treatment"],
    followUp:
      "The CNS treatment record should include access route, medicines, doses and CSF response. Neurological and systemic teams need one shared plan.",
    related: ["Chemotherapy", "Bone Marrow Transplantation", "Stem Cell Transplantation"],
    figureSrc: "/costs/intrathecal-chemotherapy-illustration.webp",
    figureAlt: "Medical illustration showing CNS indication review, lumbar or ventricular access, cerebrospinal-fluid drug delivery and neurological monitoring",
    specialistLabel: "Haematology and neuro-oncology specialists",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
  {
    procedure: "CAR-T Cell Therapy",
    shortName: "CAR-T cell therapy",
    briefName: "CAR-T Cell Therapy",
    slug: "car-t-cell-therapy",
    definition:
      "CAR-T cell therapy collects a patient's T cells, genetically engineers them to recognise a cancer target, expands them, then returns them after lymphodepleting treatment.",
    indication:
      "It may be considered for selected relapsed or refractory blood cancers when the diagnosis, target, prior lines, organ function and an authorised programme support it.",
    notAutomatic:
      "CAR-T is not a general treatment for every cancer, and active infection, unstable disease, organ dysfunction, absent target or lack of programme eligibility may prevent treatment.",
    selection:
      "A CAR-T centre verifies pathology, target expression, prior therapy, disease control during manufacturing, organ function, infection status and caregiver readiness before accepting a patient.",
    approaches: [
      { label: "Apheresis and manufactured autologous CAR-T", detail: "Collection, manufacturing, bridging, lymphodepletion and infusion form one connected pathway." },
      { label: "Stem Cell Transplantation", detail: "A different cellular pathway that may be an alternative or later consideration in selected diseases." },
      { label: "Targeted or antibody therapy", detail: "Potential bridging or alternative treatment depending on disease and evidence." },
    ],
    administration:
      "The pathway includes apheresis, off-site or on-site manufacturing, possible bridging therapy, lymphodepletion, a single cell infusion and close post-infusion monitoring.",
    duration: "apheresis and manufacturing followed by infusion and at least three to six weeks near the programme",
    setting:
      "Hospital or specialised cellular-therapy unit with rapid access to ICU and staff experienced in cytokine-release syndrome and neurotoxicity.",
    monitoring:
      "Frequent clinical observations and laboratory tests follow infusion. Fever, low blood pressure, breathing difficulty, confusion or seizures require urgent protocol-based assessment.",
    sideEffects:
      "Major risks include cytokine-release syndrome, immune-effector-cell neurotoxicity, infection, prolonged cytopenias and later immune deficiency. Severity cannot be predicted from a package price.",
    travel:
      "The budget must include manufacturing uncertainty, bridging treatment, caregiver stay and the required radius around the CAR-T centre after discharge.",
    flyHome:
      "Return travel occurs only after the CAR-T team clears the patient and a receiving haematology team is prepared. Early departure after infusion is unsafe.",
    drivers: [
      { label: "CAR-T product and manufacturing", detail: "Cell manufacture is the dominant cost and can fail or be delayed." },
      { label: "Apheresis and bridging therapy", detail: "Disease control while cells are made is a separate clinical and financial variable." },
      { label: "Lymphodepletion and admission", detail: "Chemotherapy, bed days and monitoring must be named." },
      { label: "ICU and toxicity management", detail: "CRS or neurotoxicity can materially change the bill." },
      { label: "Post-infusion stay", detail: "Weeks near the centre are part of the real trip budget." },
    ],
    quoteItems: ["What happens financially if manufacturing is delayed or fails?", "How many admission, ICU and nearby monitoring days are included?"],
    records: ["Complete haematopathology, target and prior-line records", "Infection, organ-function and transplant history"],
    followUp:
      "Long-term haematology follow-up tracks response, infections, blood counts and immune recovery. Carry the product and toxicity summary home.",
    related: ["Stem Cell Transplantation", "Bone Marrow Transplantation", "Chemotherapy", "Targeted Therapy"],
    figureSrc: "/costs/car-t-cell-therapy-illustration.webp",
    figureAlt: "Medical illustration showing apheresis, CAR-T cell engineering, lymphodepleting treatment and monitored cell infusion",
    specialistLabel: "CAR-T and cellular-therapy specialists",
    untaggedCities: ["mumbai", "bengaluru"],
  },
  {
    procedure: "Bone Marrow Transplantation",
    shortName: "bone marrow transplantation",
    briefName: "Bone Marrow Transplantation",
    slug: "bone-marrow-transplantation",
    definition:
      "Bone marrow transplantation is haematopoietic stem-cell transplantation using a planned graft after conditioning; despite the familiar name, graft cells may come from marrow, peripheral blood or cord blood.",
    indication:
      "It may be considered for selected leukaemias, lymphomas, myeloma, marrow-failure, immune or inherited disorders after disease and transplant-risk assessment.",
    notAutomatic:
      "A cancer diagnosis alone does not establish transplant eligibility, and donor availability, disease status, organ function, infection and alternatives can change the recommendation.",
    selection:
      "The transplant team defines autologous versus allogeneic intent, graft source, donor match, conditioning, graft-versus-host prevention and infection plan before travel.",
    approaches: [
      { label: "Stem Cell Transplantation", detail: "The broader HCT pathway; this catalog uses a shared slug across Medical Oncology and Hematology." },
      { label: "Autologous Stem Cell Transplant", detail: "The patient's own collected cells after high-dose treatment." },
      { label: "Allogeneic Stem Cell Transplant", detail: "A donor graft with graft-versus-host and infection considerations." },
    ],
    administration:
      "After donor or collection work-up, conditioning is given, stem cells are infused, and the patient remains under close inpatient or unit-based monitoring through early engraftment.",
    duration: "four to eight weeks in or near the transplant unit, sometimes longer after complications",
    setting:
      "Specialised transplant ward and isolation-capable follow-up, not ordinary infusion day-care. ICU, blood bank and infection support are core programme requirements.",
    monitoring:
      "Daily counts, infection surveillance, organ tests, graft function and — for allogeneic grafts — graft-versus-host monitoring continue through early recovery.",
    sideEffects:
      "Conditioning can cause mucositis, cytopenias, infection, organ toxicity and infertility. Allogeneic grafts add graft-versus-host disease and donor-related risks.",
    travel:
      "Donor work-up, caregiver stay, safe nearby housing and a return-home transplant physician belong in the budget before conditioning begins.",
    flyHome:
      "Travel follows engraftment, infection stability and transplant-team clearance. A fixed hotel checkout date cannot determine discharge.",
    drivers: [
      { label: "Autologous versus allogeneic graft", detail: "Donor and graft-versus-host work make these different episodes." },
      { label: "Donor search and HLA testing", detail: "Registry or unrelated donor logistics may sit outside the first estimate." },
      { label: "Conditioning regimen", detail: "Intensity and medicines affect admission and toxicity." },
      { label: "Hospital and ICU days", detail: "Complications can extend the largest variable part of the bill." },
      { label: "Blood products and infection treatment", detail: "Usage cannot be fixed in advance." },
    ],
    quoteItems: ["What graft source, donor and conditioning assumptions define this range?", "Which donor-search, ICU, blood-product and post-discharge days are excluded?"],
    records: ["Full haematology and marrow records", "HLA, donor, infection and prior-transplant information"],
    followUp:
      "Long-term transplant follow-up covers graft function, infection, vaccination, graft-versus-host disease and organ effects. A receiving transplant physician is essential.",
    related: ["Stem Cell Transplantation", "CAR-T Cell Therapy", "Intrathecal Chemotherapy"],
    figureSrc: "/costs/bone-marrow-transplantation-illustration.webp",
    figureAlt: "Medical illustration showing donor or graft planning, conditioning, stem-cell infusion and monitored engraftment",
    specialistLabel: "Haematology transplant specialists",
  },
  {
    procedure: "Stem Cell Transplantation",
    shortName: "stem cell transplantation",
    briefName: "Stem Cell Transplantation",
    slug: "stem-cell-transplantation",
    definition:
      "Stem cell transplantation, or haematopoietic cell transplantation, restores blood-forming cells after conditioning using the patient's own collected cells or a donor graft.",
    indication:
      "It may be considered for selected blood cancers, marrow failure, immune and inherited disorders when transplant risk and expected benefit support the pathway.",
    notAutomatic:
      "Autologous and allogeneic transplants are not interchangeable, and not every patient with relapsed disease is fit for either.",
    selection:
      "Disease status, previous treatment, age and fitness, organ function, infection status, graft source and donor matching determine the transplant type and timing.",
    approaches: [
      { label: "Autologous Stem Cell Transplant", detail: "Collection and return of the patient's own cells after high-dose treatment." },
      { label: "Allogeneic Stem Cell Transplant", detail: "Matched or partially matched donor cells with graft-versus-host prevention." },
      { label: "Bone Marrow Transplantation", detail: "A familiar overlapping term; the quote must name actual graft source and protocol." },
    ],
    administration:
      "Cells are collected or sourced from a donor, conditioning is delivered, the graft is infused, and the patient is monitored through marrow suppression and early engraftment.",
    duration: "three to eight weeks in or near the unit, with longer follow-up for allogeneic pathways",
    setting:
      "Specialist transplant ward with isolation, blood-bank, infection and ICU support. This is not a standard medical-oncology day-care course.",
    monitoring:
      "Counts, infections, organ function and graft recovery are followed closely. Allogeneic recipients also need graft-versus-host and immune-suppression monitoring.",
    sideEffects:
      "Risks include severe infection, bleeding, mucositis, organ toxicity and infertility; allogeneic transplant adds graft-versus-host disease and graft failure.",
    travel:
      "International planning includes collection or donor logistics, caregiver housing, a prolonged nearby period and a receiving transplant service at home.",
    flyHome:
      "The transplant team clears travel only after adequate recovery and a safe receiving plan. The calendar can extend for infection or graft complications.",
    drivers: [
      { label: "Autologous versus allogeneic", detail: "Donor, immunosuppression and length-of-stay assumptions differ." },
      { label: "Graft source and donor matching", detail: "Peripheral blood, marrow and cord pathways carry different logistics." },
      { label: "Conditioning", detail: "Regimen intensity changes medicine and supportive-care use." },
      { label: "Engraftment and complications", detail: "Hospital nights and ICU cannot be guaranteed." },
      { label: "Post-discharge monitoring", detail: "Weeks near the unit remain part of trip cost." },
    ],
    quoteItems: ["Is this autologous or allogeneic, and what graft source is assumed?", "Which collection, donor, conditioning, ICU and nearby follow-up costs are included?"],
    records: ["Disease, marrow and prior-treatment records", "Collection, HLA, donor and infection work-up where available"],
    followUp:
      "Long-term follow-up covers graft function, infection, vaccination and late organ effects. Allogeneic recipients require ongoing graft-versus-host review.",
    related: ["Bone Marrow Transplantation", "CAR-T Cell Therapy", "Intrathecal Chemotherapy"],
    figureSrc: "/costs/stem-cell-transplantation-illustration.webp",
    figureAlt: "Medical illustration showing stem-cell collection or matching, conditioning, graft infusion and early recovery monitoring",
    specialistLabel: "Stem-cell transplant specialists",
  },
  {
    procedure: "Dendritic Cell Therapy",
    shortName: "dendritic cell therapy",
    briefName: "Dendritic Cell Therapy",
    slug: "dendritic-cell-therapy",
    definition:
      "Dendritic cell therapy generally refers to an individualised vaccine approach in which antigen-presenting cells are prepared to stimulate an immune response against cancer.",
    indication:
      "Its established role is limited and highly indication-specific; some programmes offer it in selected or investigational settings after standard options and evidence are reviewed.",
    notAutomatic:
      "It should not replace proven chemotherapy, targeted therapy, immunotherapy, surgery or radiation merely because it is described as personalised or immune boosting.",
    selection:
      "A medical oncologist should explain the evidence for the exact cancer, product manufacturing, regulatory status, trial context, alternatives and measurable treatment goal before collection.",
    approaches: [
      { label: "Autologous dendritic-cell vaccine", detail: "Patient-derived cells prepared with a defined antigen and manufacturing protocol." },
      { label: "Immunotherapy", detail: "A broader, often more established treatment family that should not be conflated with cell vaccines." },
      { label: "Clinical-trial participation", detail: "May provide appropriate governance when the approach remains investigational." },
    ],
    administration:
      "The pathway may include leukapheresis, laboratory preparation and staged injections or infusions. Manufacturing method and quality controls must be described.",
    duration: "cell collection followed by manufacturing and staged administrations on a programme-specific calendar",
    setting:
      "Collection and administration are often outpatient, but a credible programme needs regulated cell processing, clinical oversight and adverse-event reporting.",
    monitoring:
      "The programme should define baseline disease measurement, adverse-event review and a scheduled response assessment rather than relying on nonspecific immune tests.",
    sideEffects:
      "Possible effects include injection reactions, fever, fatigue or collection-related issues. Uncertain effectiveness and opportunity cost are also material considerations.",
    travel:
      "Do not travel on the strength of testimonials. Request protocol, regulatory status, evidence, manufacturing details, total cost and what standard treatment would be delayed.",
    flyHome:
      "Travel timing follows collection and administration schedules. Ongoing cancer care and response assessment should remain with a qualified oncology team at home.",
    drivers: [
      { label: "Manufacturing protocol", detail: "Collection, antigen method and laboratory processing define the product." },
      { label: "Number of administrations", detail: "Staged programmes need a full-course quote." },
      { label: "Regulatory or trial setting", detail: "Governance and monitoring matter as much as price." },
      { label: "Concurrent standard treatment", detail: "Chemotherapy or other proven care is usually a separate invoice." },
      { label: "Travel and opportunity cost", detail: "Time abroad may delay evidence-based care." },
    ],
    quoteItems: ["What is the regulatory status and published evidence for this exact cancer?", "What happens if cell manufacture fails, and which standard treatment must not be delayed?"],
    records: ["Complete pathology, staging and prior standard-treatment records", "Written protocol and regulatory information from the proposed programme"],
    followUp:
      "Response should be assessed with accepted cancer-specific measures. Standard oncology follow-up must continue regardless of the vaccine programme.",
    related: ["Immunotherapy", "Immune Checkpoint Inhibitor Therapy", "Precision Oncology"],
    figureSrc: "/costs/dendritic-cell-therapy-illustration.webp",
    figureAlt: "Medical illustration showing evidence review, cell collection, laboratory preparation and staged dendritic-cell administrations",
    untaggedCities: ["delhi-ncr", "mumbai", "bengaluru", "chennai", "hyderabad"],
  },
];

export const medicalOncologyArticles: CostArticle[] = profiles.map(createMedicalOncologyArticle);

export const medicalOncologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  medicalOncologyArticles.map((article) => [article.slug, article]),
);
