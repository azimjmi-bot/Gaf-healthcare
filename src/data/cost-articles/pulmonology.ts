import { PULMONOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { PULMONOLOGY_PROFILES } from "./pulmonology-profiles";

export type PulmonologyProcedure = (typeof PULMONOLOGY_PROCEDURES)[number];

export type PulmonologyCluster =
  | "Diagnostic pulmonology"
  | "Interventional pulmonology"
  | "Pleural disease"
  | "Advanced lung disease and transplant";

export type PulmonologyProfile = {
  procedure: PulmonologyProcedure;
  shortName: string;
  cluster: PulmonologyCluster;
  specialist: string;
  unit: string;
  definition: string;
  mechanism: string;
  candidacy: string;
  limits: string;
  evaluation: string;
  technique: string;
  monitoring: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  inclusionExtra: LabelledDetail;
  exclusionExtra: LabelledDetail;
  records: string[];
  quoteQuestions: string[];
  related: string[];
  topics: { id: string; heading: string; paragraphs: string[] }[];
  faqExtra: { q: string; a: string }[];
  campusFocus: string;
  imageAlts: [string, string, string];
};

export const PULMONOLOGY_PILOT_PROCEDURES = ["Bronchoscopy"] as const;

const CLUSTER_NOTES: Record<PulmonologyCluster, string> = {
  "Diagnostic pulmonology":
    "Diagnostic pulmonology connects respiratory symptoms and chest imaging to physiological tests, airway inspection and tissue or microbiology sampling. The question being answered determines whether a wash, brushing, forceps biopsy, needle aspiration or parenchymal biopsy is appropriate.",
  "Interventional pulmonology":
    "Interventional pulmonology uses flexible and rigid bronchoscopes, ultrasound, thermal or cryotherapy tools, balloons and stents to diagnose and treat central-airway disease. The service requires an equipped bronchoscopy suite, anaesthesia and a plan for bleeding or respiratory deterioration.",
  "Pleural disease":
    "Pleural medicine evaluates fluid, air, infection and malignancy in the thin space between lung and chest wall. Ultrasound-guided sampling, drainage, pleural biopsy, thoracoscopy and pleurodesis answer different questions and carry different follow-up needs.",
  "Advanced lung disease and transplant":
    "Advanced lung-disease teams combine pulmonology, transplant surgery, critical care, rehabilitation and lifelong follow-up. Selection is based on disease trajectory, physiology, comorbidity, infection and social support—not diagnosis alone.",
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; campus: string; lodging: string; climate: string; ecosystem: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    campus:
      "Delhi, Gurugram, Noida and Faridabad are separate hospital corridors. Confirm where CT review, bronchoscopy, pathology collection and any repeat visit occur because peak-hour transfers can be long.",
    lodging:
      "Choose lift-accessible lodging near the named respiratory unit, with reliable power if oxygen or non-invasive ventilation is used and a route back for fever, bleeding or worsening breathlessness.",
    climate:
      "Winter air pollution and extreme summer heat can aggravate respiratory symptoms; travel timing and indoor recovery should be discussed with the treating team.",
    ecosystem:
      "Delhi NCR has tertiary respiratory departments, interventional bronchoscopy suites, thoracic oncology pathways, respiratory ICUs and selected lung-transplant programmes across multiple campuses.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    campus:
      "Mumbai and Navi Mumbai campuses are not interchangeable. Confirm the exact bronchoscopy suite, pathology laboratory and emergency campus before choosing accommodation, particularly during monsoon traffic.",
    lodging:
      "Stay on the same side of the harbour as the treating campus, with lift access and space for oxygen or respiratory equipment if prescribed.",
    climate:
      "Humidity and monsoon conditions can worsen fatigue and complicate equipment transport; flexible departure dates are practical after biopsy or pleural drainage.",
    ecosystem:
      "Mumbai combines multi-specialty pulmonology departments, oncology institutes with lung-cancer diagnostic pathways, pleural services and respiratory critical care.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    campus:
      "The airport is distant from most hospital districts. Name the imaging site, procedure campus and pathology-return visit so cross-city travel is not added during early recovery.",
    lodging:
      "Accommodation near the confirmed campus is more useful than an airport hotel, especially after sedation or while a chest drain remains.",
    climate:
      "Milder weather does not remove the risk of post-biopsy pneumothorax, fever or oxygen desaturation; complete the scheduled review before onward travel.",
    ecosystem:
      "Bengaluru has tertiary respiratory medicine, interventional pulmonology, sleep and advanced-lung-disease services across several multi-specialty centres.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    campus:
      "Some hospital corridors have direct airport access, but imaging, bronchoscopy, pathology and transplant follow-up may occur in different buildings. Confirm the complete pathway.",
    lodging:
      "Use air-conditioned, flexible lodging near the respiratory campus with reliable electricity for any oxygen concentrator or PAP device.",
    climate:
      "Heat and humidity increase fluid loss and fatigue; patients using oxygen should follow their prescribed flow and equipment-safety plan rather than changing it themselves.",
    ecosystem:
      "Chennai has long-established respiratory medicine, interventional bronchoscopy, thoracic oncology, pleural and selected lung-transplant services.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    campus:
      "The airport lies south of the main hospital districts. Confirm whether CT, bronchoscopy, ICU backup and pathology review are on one campus before fixing transfers.",
    lodging:
      "Keep flexible lodging and a companion within the response radius advised by the pulmonology team, not solely near the airport.",
    climate:
      "Hot months and long transfers can increase breathlessness and fatigue; arrange indoor recovery and oxygen logistics where prescribed.",
    ecosystem:
      "Hyderabad hosts multi-specialty respiratory departments with bronchoscopy, EBUS, pleural procedures, respiratory ICU and advanced-lung-disease pathways.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored figure covers the named procedure only as written. Diagnostic versus therapeutic scope, anaesthesia, devices, pathology and ICU assumptions must be itemized.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Direct quotation required",
    context:
      "Compare scope type, biopsy or intervention, anaesthesia, pathology, molecular testing and complication terms rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Direct quotation required",
    context:
      "International coordination does not establish tissue adequacy, pathology turnaround, oxygen needs or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Direct quotation required",
    context:
      "Pulmonologist, facility, anaesthesia, device, imaging, pathology and follow-up charges may be separate.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Request an estimate tied to the imaging target, technique, device, tissue studies and expected admission.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private billing varies",
    context:
      "Professional billing, eligibility, device scope and postoperative respiratory follow-up require provider confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, urgent respiratory access, pathology delivery and home handover.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Pulmonologist, anaesthesia, facility, pathology and device charges may be separate; [US_COST] is a comparison range, not a quotation.",
  },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  {
    label: "Named respiratory consultation",
    detail: "Records and imaging review by the operating pulmonologist when explicitly listed.",
  },
  {
    label: "Pre-procedure assessment",
    detail: "Stated blood tests, ECG, oxygen assessment, urine tests and anaesthesia review; unlisted work-up is extra.",
  },
  {
    label: "Procedure suite and sedation",
    detail: "Bronchoscopy or procedure-room time, standard monitoring, sedation or anaesthesia and recovery care within scope.",
  },
  {
    label: "Quoted hospital stay",
    detail: "The stated day-care or ward category, routine oxygen, nursing and medicines for the listed nights.",
  },
  {
    label: "Standard specimen processing",
    detail: "Histopathology, cytology or microbiology only when itemized; molecular panels and special stains may be separate.",
  },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Changed procedural scope",
    detail: "A diagnostic scope becoming therapeutic, rigid-bronchoscopy conversion or an additional biopsy or drainage procedure.",
  },
  {
    label: "Complications and escalation",
    detail: "Unplanned ICU, ventilation, transfusion, chest drain, re-intervention, readmission or extra nights unless covered.",
  },
  {
    label: "Premium devices and consumables",
    detail: "Airway stents, valves, cryoprobes, catheters and single-use scopes beyond the written specification.",
  },
  {
    label: "Advanced diagnostics",
    detail: "PET-CT, molecular or biomarker testing, special microbiology, expert pathology review and repeat imaging unless listed.",
  },
  {
    label: "Travel and ongoing care",
    detail: "Flights, visa, insurance, lodging, companion, home oxygen, rehabilitation and treatment after return.",
  },
];

const COMMON_DRIVERS: LabelledDetail[] = [
  {
    label: "Imaging and physiological testing",
    detail: "Chest CT or HRCT, PET-CT, spirometry, DLCO, arterial blood gas and echocardiography add lines only when clinically relevant.",
  },
  {
    label: "Respiratory reserve and anaesthesia",
    detail: "Low oxygen, severe airflow limitation, pulmonary hypertension and comorbidity change sedation, monitoring and ICU probability.",
  },
  {
    label: "Hospital category and room",
    detail: "Campus tier, room class, bronchoscopy-suite resources and city shift facility and nursing charges.",
  },
  {
    label: "Pathology and follow-up",
    detail: "Tissue adequacy, microbiology, molecular testing, repeat procedures and review after results alter the complete diagnostic cost.",
  },
];

const COMMON_RECORDS = [
  "Recent pulmonology consultation and medication list",
  "Chest X-ray, CT chest or HRCT reports and image files where available",
  "Pulmonary function tests including spirometry and DLCO where performed",
  "Oxygen prescription, CPAP/BiPAP settings and recent admission summaries where relevant",
];

function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

function lastSentence(text: string): string {
  return text.match(/[^.!?]+[.!?]/g)?.at(-1)?.trim() ?? text;
}

function seoTitleFor(profile: PulmonologyProfile): string {
  const full = `${profile.procedure} Cost in India: Planning Guide`;
  if (full.length <= 70) return full;
  return `${profile.shortName.charAt(0).toUpperCase()}${profile.shortName.slice(1)} Cost in India: Planning Guide`;
}

function seoDescriptionFor(profile: PulmonologyProfile): string {
  const lead = `${profile.procedure} cost in India is [INDIA_COST] ${profile.unit}.`;
  const full = `${lead} Compare technique, sedation, devices, pathology, stay and respiratory follow-up.`;
  return full.length <= 165
    ? full
    : `${profile.shortName} cost in India is [INDIA_COST] ${profile.unit}. Compare technique, pathology, stay and follow-up.`;
}

function makeCities(profile: PulmonologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic Pulmonology or hospital label cannot verify current acceptance. This is a catalog gap, not an availability or quality claim.";
    return {
      citySlug,
      ecosystem: `${place.ecosystem} This page does not infer that every centre performs ${profile.shortName} or has every approach listed. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.campus} ${place.lodging} ${place.climate}`,
      costNote: `No verified ${place.city}-only tariff for ${profile.shortName} is stored. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Planning Guide`,
        seoDescription: `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national range. Compare technique, pathology, stay and local respiratory logistics.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle: `Plan ${profile.shortName} in ${place.city} with a named pulmonologist, exact technique, sedation, devices and follow-up. [INDIA_COST] is a national range, not a local tariff.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.campus} Sedation, breathlessness, oxygen and a chest drain can limit independent travel, so arrange a companion.`,
          `${place.lodging} ${place.climate}`,
          gate,
          "Send records before non-refundable travel. A remote opinion can change after examination, image review, oxygen assessment and anaesthesia review in person.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST] ${profile.unit}, with [STAY] used for broad trip planning. Neither is a local tariff, recommendation or acceptance promise.`,
          `Confirm the named ${profile.specialist}, campus, approach, ${profile.inclusionExtra.label.toLowerCase()}, pathology or microbiology, oxygen plan and where urgent respiratory review would happen.`,
        ],
        costExplanation: [
          `${profile.drivers[0].detail} ${profile.drivers[1].detail}`,
          "Ask for clinician, technique, anaesthesia, devices, suite, ward nights, pathology, follow-up and complication terms in writing.",
          `Budget separately for travel through ${place.airport}, nearby lodging, companion support, medicines, oxygen equipment and extra nights if pathology or respiratory monitoring delays departure.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send ${profile.records[0].toLowerCase()}, ${profile.records[1].toLowerCase()} and current oxygen or respiratory-support details where applicable.`,
          `Obtain written acceptance from a named ${profile.specialist} and verify the campus, anaesthesia, ICU backup, device availability and pathology pathway.`,
          `${profile.recovery} ${place.climate} Carry the procedure, pathology and oxygen or device plan for local follow-up.`,
        ],
        hospitalDiscussion: [
          gate,
          `General accreditation does not establish current ${profile.shortName} acceptance or equipment. ${profile.campusFocus}`,
        ],
        faqs: [
          {
            q: `How much does ${profile.procedure} cost in ${place.city}?`,
            a: `[INDIA_COST] is the stored national planning range ${profile.unit}. No verified ${place.city}-only tariff is stored; request an itemized quotation from a named campus.`,
          },
          {
            q: `Which ${place.city} clinician should assess me for ${profile.shortName}?`,
            a: `A named ${profile.specialist} should review your records and imaging. Dynamic cards require an exact CMS relationship and are not rankings.`,
          },
          {
            q: `Where should I stay in ${place.city} after ${profile.shortName}?`,
            a: `${place.lodging} ${place.campus}`,
          },
        ],
      },
    };
  });
}

export function createPulmonologyArticle(profile: PulmonologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const short = profile.shortName;
  return {
    procedure: profile.procedure,
    shortName: short,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: firstSentence(profile.recovery),
    seoTitle: seoTitleFor(profile),
    seoDescription: seoDescriptionFor(profile),
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle: `A planning guide to ${short} in India: its respiratory purpose, technique, sedation or anaesthesia, tissue or device costs, recovery and follow-up—not an outcome promise.`,
    introduction: [
      profile.mechanism,
      profile.limits,
      "This guide compares quotations; it cannot diagnose, choose a procedure or decide timing. A respiratory specialist must connect symptoms, imaging, physiology and laboratory findings and explain uncertainty.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST] ${profile.unit}, with [STAY] as the stored stay guide. The range commonly covers the named pulmonologist, procedure suite, standard monitoring, sedation or anaesthesia, routine consumables and quoted ward care; CT or PET review, advanced devices, pathology, molecular testing, ICU and treatment after results may be separate. [US_COST] is the comparison reference.`,
      `${profile.drivers[0].detail} ${profile.drivers[1].detail}`,
      `Planning Range ≠ Final Hospital Quotation. Current imaging, respiratory reserve, oxygen needs and assessment by a named ${profile.specialist} come before technique, risks and a final offer are meaningful.`,
    ],
    indiaCost: [
      `[INDIA_COST] is the stored India planning range for ${short}, ${profile.unit}, and [US_COST] the stored self-pay comparison. Neither is a guaranteed package; changed technique, extra pathology, ICU support or a longer stay alters the amount.`,
      `A usable estimate names the clinician, campus, approach, ${profile.inclusionExtra.label.toLowerCase()}, sedation or anaesthesia, oxygen, ward nights, specimen studies and follow-up, with professional, facility, device, imaging and laboratory lines separated.`,
      "Budget separately for flights, visa, insurance, transfers, companion, lodging, meals, home oxygen or equipment and local follow-up unless included.",
    ],
    costDrivers: [...profile.drivers, ...COMMON_DRIVERS],
    whyQuotesDiffer: `Two quotations for ${short} may describe different diagnostic versus therapeutic scope, devices, sedation, respiratory monitoring, pathology, ward category and complication coverage. Compare those lines before totals.`,
    inclusions: [...COMMON_INCLUSIONS, profile.inclusionExtra],
    exclusions: [...COMMON_EXCLUSIONS, profile.exclusionExtra],
    approachComparison: {
      heading: `${profile.procedure}: approaches and where they differ`,
      intro: [
        "The approach follows the clinical question, imaging target, airway or pleural anatomy, respiratory reserve and available equipment. Each option has different consumables, monitoring and follow-up, so the quotation must name it.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Individual respiratory assessment determines suitability",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [profile.definition],
      who: [profile.candidacy],
      how: [profile.technique, profile.monitoring],
      variations: profile.approaches.map((item) => ({
        label: item.label,
        detail: firstSentence(item.detail),
      })),
      preparation: [
        profile.evaluation,
        "Clinicians direct fasting, inhalers, anticoagulants, diabetes medicines, antibiotics and oxygen. Active infection or unstable breathing may postpone an elective procedure.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        `Follow the oxygen, activity and equipment plan. Seek urgent respiratory help for ${profile.urgent}.`,
      ],
    },
    topicSections: [
      {
        id: "subspecialty",
        heading: `${profile.cluster}: the subspecialty behind ${profile.procedure}`,
        paragraphs: [CLUSTER_NOTES[profile.cluster]],
      },
      ...profile.topics,
      {
        id: "risks",
        heading: `Risks and side effects of ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "Ask before travel who pays for unplanned ventilation, ICU, chest drainage, transfusion, repeat biopsy, readmission or a second procedure.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        "International planning starts with records and a named respiratory question. A remote opinion is provisional until examination, image review and anaesthesia assessment confirm the plan.",
      ],
      stages: [
        { label: "Send records", detail: `Provide ${profile.records[0].toLowerCase()} and recent imaging files.` },
        { label: "Remote review", detail: `A named ${profile.specialist} reviews whether ${short} answers the clinical question.` },
        { label: "Define scope", detail: "Name diagnostic or therapeutic intent, technique, samples, devices and likely stay." },
        { label: "Itemize quotation", detail: "Clinician, suite, anaesthesia, consumables, pathology, ward and exclusions." },
        { label: "Plan travel", detail: "Flexible flights, accessible lodging, companion and oxygen or equipment logistics." },
        { label: "Arrive and reassess", detail: "Examination, oxygen assessment, imaging and pre-anaesthetic review." },
        { label: "Confirm consent", detail: "Purpose, alternatives, risks, possible escalation and sample limitations." },
        { label: "Complete procedure", detail: `The consented ${short} with respiratory monitoring.` },
        { label: "Early recovery", detail: "Airway, oxygen level, bleeding, pain and sedation recovery." },
        { label: "Review results", detail: "Imaging, cytology, histopathology or microbiology and any next step." },
        { label: "Clear travel", detail: "Written travel fitness, medicines, oxygen and urgent-contact plan." },
        { label: "Handover home", detail: "Procedure note, images, pathology and follow-up schedule for the home team." },
      ],
    },
    journey: [
      { label: "Define the question", detail: "Symptoms, diagnosis, imaging target and prior treatment." },
      { label: "Collect records", detail: "CT or HRCT, physiology, pathology and admission history." },
      { label: "Identify specialist", detail: `Named ${profile.specialist} and exact campus.` },
      { label: "Assess reserve", detail: "Oxygen, lung function, comorbidity and anaesthesia fitness." },
      { label: "Choose technique", detail: "Diagnostic or therapeutic method for the findings." },
      { label: "Compare quotes", detail: "Same scope, devices, samples, nights and follow-up." },
      { label: "Plan travel", detail: "Flexible travel, accessible lodging, companion and oxygen." },
      { label: "Confirm consent", detail: "Purpose, alternatives, risks and possible escalation." },
      { label: "Complete care", detail: "Procedure and monitored recovery." },
      { label: "Process samples", detail: "Cytology, histopathology, microbiology or molecular tests." },
      { label: "Attend review", detail: "Results, oxygen or device plan and next treatment." },
      { label: "Handover home", detail: "Procedure record and respiratory follow-up schedule." },
    ],
    documents: [...profile.records, ...COMMON_RECORDS],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      `India and US values use stored GAF planning ranges; other countries require direct quotations. Compare the same intent, technique, devices, sedation, pathology, ward category and complication terms for ${short}.`,
    ],
    destinationNote:
      "International comparisons are indicative. Currency, changed findings, an added device or biopsy, pathology scope and respiratory monitoring alter the final amount.",
    cityIntro: [
      `Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad use [INDIA_COST] because no verified city tariff is stored. City overlays add campus geography, transfers, climate, oxygen logistics and follow-up without inventing prices. Cards require an exact current ${profile.procedure} CMS relationship.`,
    ],
    whyIndia: [
      `Some patients consider India for ${short} because tertiary respiratory teams, interventional bronchoscopy, pleural services, pathology and respiratory critical care can be coordinated with a national planning range. Price alone is not a clinical reason to travel.`,
      "Evaluate clinician, licensure, campus, equipment, anaesthesia, ICU backup, pathology quality, urgent access and home handover. No provider is ranked and no outcome is promised; unstable breathing or suitable local care can make travel inappropriate.",
    ],
    questionsToAsk: [
      `Who is the named ${profile.specialist}, and at which campus?`,
      `What clinical question will ${short} answer or treat?`,
      "Is the scope diagnostic, therapeutic or both?",
      "Which approach is planned, and what might change it?",
      "Are pulmonologist, anaesthesia and procedure-suite fees included?",
      "Which imaging and respiratory tests are needed before the procedure?",
      "Which scopes, needles, probes, stents, valves, drains or catheters are assumed?",
      "Which cytology, histopathology and microbiology studies are included?",
      "Is molecular or biomarker testing included when tissue is obtained?",
      "How many day-care or ward nights are quoted?",
      "Are oxygen, non-invasive ventilation and ICU escalation covered?",
      "What is charged if another procedure or repeat sample is needed?",
      "How are pneumothorax, bleeding, ventilation and readmission billed?",
      "When will results be ready, and is the results consultation included?",
      "Which symptoms require urgent review and where?",
      "When may I work, exercise and fly?",
      "Who coordinates respiratory follow-up after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.procedure} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST] ${profile.unit}. This national range is not a quotation; technique, sedation, devices, pathology, ward nights and written terms determine the amount.`,
      },
      { q: `What is ${profile.procedure}?`, a: profile.definition },
      { q: `When is ${short} considered?`, a: profile.candidacy },
      {
        q: `What does the ${short} planning range usually include?`,
        a: `It commonly includes the named respiratory specialist, procedure suite, routine monitoring, sedation or anaesthesia, standard consumables and quoted stay. Imaging, advanced devices, pathology panels and treatment after results may be separate.`,
      },
      { q: `What assessment is needed before ${short}?`, a: profile.evaluation },
      {
        q: `How long does ${short} take?`,
        a: `${profile.duration}. Preparation and monitored recovery add time, and pathology or microbiology can extend the overall diagnostic journey.`,
      },
      { q: `Is hospitalization needed after ${short}?`, a: `${profile.admission} Discharge follows respiratory and clinical criteria, not a package calendar.` },
      { q: `What are the important risks of ${short}?`, a: profile.risks },
      {
        q: `When can an international patient fly after ${short}?`,
        a: `There is no universal flight day. ${lastSentence(profile.recovery)} The treating team must document travel fitness.`,
      },
      ...profile.faqExtra,
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro: `Profiles appear only when ${profile.procedure} is an exact current CMS relationship. Verify respiratory subspecialty, availability and campus; placement is not a ranking or outcome claim.`,
    hospitalHeading: `Hospitals and respiratory centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro: `Cards follow exact live relationships for ${profile.procedure}. A general Pulmonology or accreditation label does not establish current acceptance, equipment or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/pulmonology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational respiratory anatomy; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/pulmonology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure pathway; the actual plan depends on examination, imaging and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/pulmonology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery and result timelines vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

export const pulmonologyArticles = PULMONOLOGY_PROFILES.map(createPulmonologyArticle);

export const pulmonologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  pulmonologyArticles.map((article) => [article.slug, article]),
);
