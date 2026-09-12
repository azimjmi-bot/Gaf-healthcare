import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { BARIATRIC_PROCEDURES, toSlug } from "../../lib/taxonomy";

type BariatricProcedure = (typeof BARIATRIC_PROCEDURES)[number];

type BariatricProfile = {
  procedure: BariatricProcedure;
  briefName: string;
  shortName: string;
  specialist: string;
  kind: "surgical" | "endoscopic" | "altered-anatomy";
  definition: string;
  candidacy: string;
  limits: string;
  evaluation: string;
  technique: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  diet: string;
  nutrition: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  inclusions: LabelledDetail[];
  exclusions: LabelledDetail[];
  records: string[];
  followUp: string;
  quoteQuestions: string[];
  related: BariatricProcedure[];
  figureAlt: string;
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    arrival: string;
    lodging: string;
    followUp: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate care corridors. Confirm the exact campus before booking because a cross-NCR trip soon after anaesthesia, laparoscopy or endoscopy can be difficult.",
    lodging:
      "Choose flexible lodging near the named campus with a lift, safe drinking water and a way to prepare the prescribed liquid and puréed diet.",
    followUp:
      "Winter air pollution and summer heat can alter outdoor walking and hydration plans; use indoor walking and the treating team's fluid advice when needed.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed blood tests, dietetic reviews or urgent return for vomiting or abdominal pain.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify refrigeration, food hygiene and access without long stair climbs.",
    followUp:
      "Humidity and monsoon travel make wound care, oral hydration and reliable transport practical parts of the discharge plan, not evidence that care differs in quality.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts, and cross-city traffic can turn a short map distance into a long transfer after treatment. Book only after the operating or endoscopy campus is named.",
    lodging:
      "A lift-accessible stay near the treating campus is more useful than an airport hotel; confirm a kitchenette or suitable meal service for staged diet progression.",
    followUp:
      "Milder weather does not remove dehydration, clot or wound precautions. Arrange short indoor walks and easy access to the first clinical and dietetic reviews.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several hospital districts have comparatively direct airport access, but heat, humidity and travel after anaesthesia still require a planned vehicle, a companion and nearby recovery.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with safe water and dependable access to the prescribed high-protein liquids and soft foods.",
    followUp:
      "Heat can make hydration planning especially important. Fluid targets and electrolyte advice must come from the treating team rather than from a generic travel schedule.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Kondapur and Secunderabad create different emergency-return journeys, so establish the exact campus before choosing lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the team, with facilities for the staged postoperative diet.",
    followUp:
      "Summer heat and a long airport transfer can worsen poor intake or fatigue. Plan hydration, indoor walking and the first review before fixing the departure date.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India value is a national planning band. Individual candidacy, anatomy, the exact procedure and follow-up obligations must be reviewed before an itemized estimate.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private international-care market",
    context:
      "Compare the exact procedure, devices or stapling, admission allowance, nutrition support, complication terms and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private international hospitals",
    context:
      "International coordination does not establish candidacy, procedure availability or continuity of dietetic and laboratory care after return.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Procedure- and recovery-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for some families, while professional, facility, device, pharmacy and follow-up charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Procedure- and recovery-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Request an international self-pay estimate tied to the actual anatomy and procedure rather than a general weight-management package.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Procedure- and recovery-dependent",
    positioning: "European elective specialist care",
    context:
      "Eligibility, professional billing, device scope and post-treatment nutritional follow-up vary and should be confirmed before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who provides laboratory and dietetic care after discharge.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, anaesthesia, device and follow-up charges may be billed separately; [US_COST] is a comparison range, not one bundled quotation.",
  },
];

function makeCities(profile: BariatricProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} must resolve only from live catalog relationships that exactly tag ${profile.procedure}. ` +
      "If that exact CMS entity relationship is absent, cards must remain empty; do not borrow a generic bariatric, surgical or endoscopy entity. This is a catalog gap, not a ranking, capability or outcome statement.";
    const modality =
      profile.kind === "endoscopic"
        ? "Confirm the therapeutic endoscopist, anaesthesia plan, device or suture scope and route for urgent reassessment."
        : profile.kind === "altered-anatomy"
          ? "Prior operative notes and imaging must be reviewed because adhesions and altered anatomy can change the plan after arrival."
          : "Confirm the bariatric surgeon, anaesthesia plan, planned anatomy, leak assessment and route for urgent reassessment.";

    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader weight-management ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.followUp}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; this is not a city price or guaranteed package.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Planning Guide`,
        seoDescription:
          `${profile.briefName} cost in ${place.city} uses the [INDIA_COST] national planning range. Review candidacy, scope, nutrition, recovery and travel.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} ${modality}`,
          `${place.lodging} ${place.followUp}`,
          gate,
          "Send complete records before non-refundable travel. Remote acceptance can change after examination, repeat tests, endoscopy or imaging.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither token is a city tariff, admission promise or medical recommendation.`,
          `${profile.technique} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical differences, not premium upgrades.`,
          `Ask the provider to identify the named ${profile.specialist}, exact campus, anatomy, anaesthesia, devices or stapling, ward allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, ${place.lodging.toLowerCase()} Keep flights flexible until intake, mobility and fitness to travel are reviewed.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send weight history, comorbidity records, prior treatment and relevant imaging or endoscopy before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. ${modality}`,
          `${profile.diet} ${place.followUp} Travel home only after the team reviews oral intake, warning signs and follow-up access.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, anaesthesia and emergency support, procedure-specific consumables, dietetic pathway and handover in writing. General accreditation does not establish current availability or results.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored; the final amount follows record review and an itemized estimate.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A named ${profile.specialist} should assess the case. Cards appear only for exact live CMS relationships; placement is not a ranking or experience claim.`,
          },
          {
            q: `Where should the patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.arrival}`,
          },
          {
            q: "When can the patient fly home?",
            a: `There is no universal date. ${profile.recovery} The treating team must review intake, mobility, complications and clot risk.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and campus, procedural assumptions, included devices or stapling, admission, exclusions, complication terms and follow-up.`,
          },
        ],
      },
    };
  });
}

function createBariatricArticle(profile: BariatricProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
  const modality =
    profile.kind === "endoscopic"
      ? "This is a therapeutic endoscopic procedure, not surgery: there are no abdominal incisions, but anaesthesia, device-related risks and structured follow-up still matter."
      : profile.kind === "altered-anatomy"
        ? "This is an altered-anatomy case. Adhesions, prior staple lines or implants and incomplete operative records can change access, risk, duration and whether conversion is appropriate."
        : "This changes gastrointestinal anatomy surgically, usually through laparoscopic access; access method does not determine candidacy or guarantee a particular recovery.";

  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Treatment, Nutrition & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare individualized candidacy, procedure scope, risks, nutrition and travel planning.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; a named ${profile.specialist} must confirm individualized candidacy and scope.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} ${modality}`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for broad planning. These tokens are not acceptance, a city tariff, an outcome forecast or a final bill.",
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored stay is [STAY], but assessment, anatomy, oral intake and discharge criteria determine the actual episode. This is a national comparison range, not a provider quotation or treatment recommendation.`,
      `${profile.definition} ${modality}`,
      `${profile.diet} Hydration and adequate protein need an individualized plan. Before travel, confirm written acceptance, quote scope, warning signs and follow-up at home.`,
    ],
    indiaCost: [
      `The [INDIA_COST] value is the national catalog planning range for ${profile.shortName}. It applies only to the procedure and assumptions written in a provider letter; it is not a guaranteed package or tariff for any city or centre.`,
      `Important drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A changed device, reconstruction, admission or complication may describe a materially different episode.`,
      "Compare itemized estimates with the same clinical scope. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep travel, lodging, supplements and long-term monitoring visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may describe different anatomy or support. Compare ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}, professional fees, included consumables, admission limits, dietetic care and complication terms. A higher quote does not establish better care or results.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} The approaches below are clinical strategies, not consumer upgrades.`,
        `A named ${profile.specialist} should explain why the proposed route fits the individual's anatomy and needs, and what finding could change or cancel it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from anatomy, health, prior treatment and follow-up needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, modality],
      who: [profile.candidacy, profile.limits],
      how: [
        profile.technique,
        `The procedural forms discussed here include ${approachNames}; they are not interchangeable package labels.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile medicines, screen for tobacco, alcohol or substance risks, assess eating behaviour and mental health without stigma, and discuss contraception or pregnancy timing where relevant.",
        "Follow the treating team's fasting and diabetes-medicine instructions. Report fever, new abdominal symptoms, uncontrolled glucose or another material health change before travel or treatment.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        `${profile.diet} Small frequent sips, the prescribed protein plan and avoidance of dehydration are early priorities; inability to keep fluids down needs prompt advice.`,
        `${profile.nutrition} Follow-up must not end with the return flight.`,
        profile.risks,
        `${profile.followUp} Seek urgent clinical help for ${profile.urgent}; use the treating team's own emergency thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "nutrition-and-follow-up",
        heading: `Nutrition and follow-up after ${profile.briefName}`,
        paragraphs: [
          profile.diet,
          profile.nutrition,
          "The individual team sets fluid, protein, supplement and laboratory targets. Generic internet schedules should not replace instructions adapted to kidney, liver, diabetes or other medical needs.",
        ],
      },
      {
        id: "risks-and-recovery",
        heading: `Risks and recovery after ${profile.briefName}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, prior treatment, current health and the actual technique.",
          `${profile.recovery} No article can promise a particular weight, metabolic response, symptom change or complication-free course.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, supplements, dietetic care, complication contingency and monitoring at home.`,
        "Travel follows written clinical acceptance and an itemized estimate. A visa invitation, directory profile or appointment is not medical clearance.",
      ],
      stages: [
        { label: "Records and goals review", detail: profile.evaluation },
        { label: "Individualized candidacy discussion", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternative selection", detail: `Discuss ${approachNames}, non-procedural care and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, technique, devices, anaesthesia, admission, nutrition, exclusions and complication terms." },
        { label: "Arrival and reassessment", detail: "Repeat examination, laboratory, imaging, endoscopy or anaesthetic assessment when clinically indicated before final consent." },
        { label: "Treatment and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Diet progression and discharge", detail: `${profile.diet} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Long-term handover", detail: `${profile.nutrition} ${profile.followUp}` },
      ],
    },
    journey: [
      { label: "Assemble complete records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, alternatives, anatomy and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss health goals, eating pattern, reflux or metabolic issues and what treatment cannot promise." },
      { label: "Confirm individualized candidacy", detail: `${profile.candidacy} Avoid using one universal BMI cutoff without the wider clinical assessment.` },
      { label: "Compare itemized estimates", detail: "Use the same procedure assumptions and compare professional, facility, device, admission and follow-up scope." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and suitable lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned treatment", detail: profile.technique },
      { label: "Establish oral intake", detail: `${profile.diet} Hydration and protein tolerance matter before discharge.` },
      { label: "Complete nearby review", detail: `Review symptoms, intake, medicines and travel fitness; ${profile.recovery.toLowerCase()}` },
      { label: "Transfer care home", detail: `${profile.followUp} Carry the procedure report, discharge summary, diet plan and laboratory schedule.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent laboratory results",
      "Weight trajectory, prior structured weight-management treatment and relevant dietetic notes",
      "Diabetes, sleep-apnoea, cardiovascular, liver, kidney and reflux records where applicable",
      "Passport and companion documentation needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other rows are modelled relative private-care bands, not official tariffs, provider quotes or evidence of availability.",
      "A meaningful comparison holds procedure, anatomy, device or stapling scope, admission, complication terms and long-term nutrition support constant.",
    ],
    destinationNote:
      "All values are planning information. Candidacy, anatomy, technique, devices, clinical course, complications, currency and length of stay can change the final amount; no row predicts availability or outcomes.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their overlays address different airport, geography, climate, lodging, hydration and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards must resolve from live CMS entities that exactly carry the ${profile.procedure} relationship. Missing exact mappings must leave cards empty. An empty card area is an explicit catalog gap, not a ranking, hidden recommendation, capability claim or evidence that care is unavailable.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist} and a national self-pay planning range below typical United States figures. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, exact procedure scope, anaesthesia and emergency arrangements, transparent follow-up, and whether nutrition and laboratory monitoring can continue after return.",
      "No provider is ranked. Acute illness, uncontrolled medical or psychological risk, inability to maintain hydration or follow-up, or suitable established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered now, and what non-procedural alternatives were discussed?`,
      "How were my health goals, weight history, eating pattern and prior treatment considered?",
      "Which findings support candidacy, and what could postpone or cancel treatment?",
      `Who is the named ${profile.specialist}, and at which exact campus will care occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, laboratory tests, imaging and endoscopy are included?",
      "Which anaesthesia assessment and anaesthesia fees are included?",
      "Which staplers, sutures, implants, balloons or other consumables are assumed?",
      "What change in anatomy could alter the procedure after arrival?",
      "How many ward or observation nights and which room category are included?",
      "How are extra nights, high-dependency care, readmission or another procedure billed?",
      "Which medicines, clot prevention and discharge prescriptions are included?",
      "What leak, bleeding or other complication assessment is planned when clinically indicated?",
      "What liquid, puréed, soft and regular-texture diet progression will I receive?",
      "Who sets my hydration and protein plan, and how is poor intake managed?",
      "Which vitamins, minerals or other supplements are recommended for my actual procedure?",
      "Which dietetic and clinical follow-up visits are included?",
      "Which lifelong laboratory monitoring is relevant, and who will arrange it at home?",
      "What symptoms require urgent local care or return to the treating centre?",
      "When and by whom will fitness to fly be assessed?",
      "What records and emergency contacts will I receive before departure?",
      "Who will coordinate care with my clinician and dietitian after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This national stored range is not a quotation; anatomy, technique, admission and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      { q: "Is there one BMI threshold for every patient?", a: profile.limits },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: `${profile.technique} ${modality}` },
      { q: `How long does ${profile.shortName} take?`, a: `${profile.duration}. Actual timing depends on anatomy and the clinical course.` },
      { q: "What diet follows treatment?", a: profile.diet },
      { q: "How important are hydration and protein?", a: `${profile.nutrition} The treating team individualizes targets and advises on intolerance.` },
      { q: "What are the important risks?", a: profile.risks },
      { q: "When can an international patient fly home?", a: `There is no fixed flight day. ${profile.recovery} The treating team must document travel fitness.` },
      { q: "What long-term follow-up is needed?", a: `${profile.followUp} ${profile.nutrition}` },
    ],
    doctorHeading: `${profile.specialist}s for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} ${profile.specialist}s in [CITY]`,
    doctorIntro:
      `Profiles must be drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Missing mappings must leave cards empty. Verify the clinician's role, availability and campus; placement is not a ranking, volume, capability or outcome claim.`,
    hospitalHeading: `Hospitals and centres for ${profile.shortName} in India`,
    cityHospitalHeading: `Centres for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      `Cards must follow exact live entity relationships for ${profile.procedure}. A general bariatric, surgery, endoscopy or accreditation label does not establish current case acceptance, emergency support, device scope, dietetic continuity or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/bariatric-surgery/${slug}-illustration.webp`,
        alt: profile.figureAlt,
        caption: "A general educational illustration, not a patient-specific anatomy, recommendation or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/bariatric-surgery/bariatric-treatment-pathway.webp",
        alt: `Records, individualized assessment, treatment and monitored recovery pathway for ${profile.shortName}`,
        caption: "The actual pathway depends on candidacy, anatomy, procedure and clinical course.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/bariatric-surgery/bariatric-nutrition-follow-up.webp",
        alt: `Diet progression, hydration, protein, nutritional monitoring and home follow-up after ${profile.shortName}`,
        caption: "Diet, supplements and laboratory monitoring must be individualized by the treating team.",
        fit: "contain",
      },
    ],
  };
}

const profiles: BariatricProfile[] = [
  {
    procedure: "Sleeve Gastrectomy",
    briefName: "Sleeve Gastrectomy",
    shortName: "sleeve gastrectomy",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "Sleeve gastrectomy removes much of the greater-curvature stomach and leaves a narrow gastric tube without rerouting the intestine.",
    candidacy:
      "It may be considered within individualized obesity care when health risks, prior treatment, reflux, eating behaviour, operative fitness and the ability to sustain follow-up support that choice.",
    limits:
      "No single BMI number decides every case. Severe uncontrolled reflux, a large hiatal problem, active substance misuse, untreated eating disorder or inability to complete nutrition follow-up may favour delay or another pathway.",
    evaluation:
      "Review includes weight and treatment history, nutrition and psychosocial assessment, reflux symptoms and selective endoscopy, sleep-apnoea and cardiometabolic evaluation, laboratory deficiencies and anaesthetic fitness.",
    technique:
      "Usually through laparoscopic ports, the surgeon frees the greater curve and divides the stomach vertically with staplers over a sizing tube; the removed stomach is extracted and the staple line is inspected.",
    approaches: [
      { label: "Laparoscopic sleeve", detail: "The usual multi-port surgical access, with the final sleeve calibrated to anatomy rather than a package name." },
      { label: "Sleeve with indicated hiatal repair", detail: "A separately documented repair when preoperative and intraoperative findings support it." },
      { label: "Bypass instead of sleeve", detail: "May be discussed when reflux, metabolic needs or other anatomy makes intestinal rerouting more appropriate." },
    ],
    duration: "often about one to two hours for a primary uncomplicated case, with longer time when additional work is required",
    admission:
      "This is an inpatient operation; monitoring focuses on pain, bleeding, nausea, breathing, mobility and the ability to sip fluids.",
    diet:
      "The team advances clear or full liquids to puréed, soft and then regular-texture foods in stages; dates vary, and eating slowly with small portions remains important.",
    nutrition:
      "Frequent small sips and an individualized protein plan reduce dehydration and poor intake. Long-term multivitamin use and periodic blood tests for iron, B12, folate, vitamin D and other indicated nutrients remain relevant.",
    recovery:
      "Walking begins early, while lifting, driving, work and flights resume only as pain control, wounds, intake and clot risk permit.",
    risks:
      "Specific concerns include staple-line leak or bleeding, narrowing or twisting, clot, infection, gallstones, nutritional deficiency and new or worsened gastro-oesophageal reflux.",
    urgent:
      "persistent rapid pulse, fever, worsening upper abdominal or shoulder pain, breathing difficulty, black stools, repeated vomiting or inability to keep fluids down",
    drivers: [
      { label: "Primary sleeve versus added hiatal repair", detail: "A documented repair changes theatre scope and consumables." },
      { label: "Stapler loads and reinforcement strategy", detail: "The written estimate should identify assumptions without implying one method is universally superior." },
      { label: "Reflux and endoscopy work-up", detail: "Symptoms or mucosal findings can redirect the operation." },
      { label: "Medical and anaesthetic complexity", detail: "Sleep apnoea, diabetes and cardiopulmonary disease may change monitoring." },
      { label: "Admission and complication care", detail: "Extra imaging, drainage, endoscopy or reoperation is outside many routine allowances." },
    ],
    inclusions: [
      { label: "Bariatric and nutrition assessment", detail: "The consultations and baseline laboratory scope expressly listed." },
      { label: "Laparoscopic sleeve operation", detail: "Named surgeon, theatre, anaesthesia and the planned primary procedure." },
      { label: "Staplers and stated consumables", detail: "Loads, sizing equipment and reinforcement only as written." },
      { label: "Quoted ward monitoring", detail: "Defined nights, routine medicines and mobilization support." },
      { label: "Initial diet and discharge plan", detail: "Written progression, supplements, emergency contacts and included reviews." },
    ],
    exclusions: [
      { label: "Hiatal hernia or other additional surgery", detail: "Separate unless the indication and scope are written." },
      { label: "Leak, bleeding or stenosis treatment", detail: "Imaging, drainage, stenting, transfusion or return to theatre may be additional." },
      { label: "Extended admission or critical care", detail: "Days beyond the stated allowance and organ support." },
      { label: "Later gallbladder or reflux treatment", detail: "New symptoms and later procedures are separate episodes." },
      { label: "Long-term supplements and monitoring", detail: "Vitamins, blood tests and dietetic care after included visits." },
    ],
    records: ["Weight and structured-treatment history", "Reflux, endoscopy or hiatal-hernia records", "Nutrition and relevant psychosocial assessments"],
    followUp:
      "Follow-up reviews wounds, reflux, intake, medication changes and weight trajectory, then continues with nutrition, laboratory surveillance and coordination with primary and metabolic care.",
    quoteQuestions: [
      "How many stapler loads and what reinforcement assumption are included?",
      "Is a hiatal repair planned or priced only if found?",
      "How will reflux symptoms or endoscopy findings change the plan?",
      "What investigation and treatment are available if a sleeve leak is suspected?",
    ],
    related: ["Gastric Bypass (Roux-en-Y)", "Endoscopic Sleeve Gastroplasty (ESG)", "Gastric Sleeve Revision Surgery", "Metabolic Surgery for Type 2 Diabetes"],
    figureAlt: "Medical illustration of the greater-curvature stomach removed to create a narrow gastric sleeve while leaving the intestine in continuity",
  },
  {
    procedure: "Gastric Bypass (Roux-en-Y)",
    briefName: "Roux-en-Y Gastric Bypass",
    shortName: "Roux-en-Y gastric bypass",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "Roux-en-Y gastric bypass creates a small stomach pouch and connects it to a Roux limb of small bowel while digestive juices meet food farther downstream.",
    candidacy:
      "It may be considered when individualized assessment supports bariatric surgery, particularly when reflux, diabetes or another clinical feature makes bypass preferable to a sleeve.",
    limits:
      "There is no universal BMI cutoff independent of health and context. Untreated nutritional deficiency, inability to avoid smoking or ulcer-promoting medicines, unsafe operative risk or unreliable lifelong follow-up may require another plan.",
    evaluation:
      "Assessment covers prior abdominal surgery, reflux and selective endoscopy, nutrition and eating pattern, diabetes medicines, sleep apnoea, micronutrient status, psychosocial readiness and anaesthetic fitness.",
    technique:
      "The surgeon divides the upper stomach into a pouch, measures bowel limbs, creates gastrojejunal and jejunojejunal joins, and closes or addresses mesenteric defects according to the operative plan.",
    approaches: [
      { label: "Laparoscopic Roux-en-Y bypass", detail: "The standard minimally invasive reconstruction in suitable anatomy." },
      { label: "Bypass with indicated hiatal repair", detail: "Adds documented hiatus work when reflux anatomy requires it." },
      { label: "Sleeve or OAGB alternative", detail: "Different anatomy, reflux and nutritional trade-offs should be discussed rather than treated as price tiers." },
    ],
    duration: "often about two to four hours for a primary case, depending on anatomy and associated work",
    admission:
      "Inpatient monitoring addresses bleeding, leak, nausea, oral intake, glucose medicines, breathing, clot prevention and early mobility.",
    diet:
      "Liquids progress to puréed, soft and regular textures under the team's schedule; small meals, slow eating and separation of drinking from meals may reduce intolerance.",
    nutrition:
      "Hydration and protein need active planning. Lifelong procedure-specific supplements and blood monitoring commonly include iron, B12, folate, calcium, vitamin D and other nutrients guided by results.",
    recovery:
      "Activity increases gradually after discharge; work, lifting and flying depend on wounds, intake, bowel function, medication stability and clot risk.",
    risks:
      "Risks include leak, bleeding, ulcer, stricture, bowel obstruction, dumping symptoms, hypoglycaemia, micronutrient deficiency, gallstones and internal hernia that can present later with intermittent or acute pain.",
    urgent:
      "rapid pulse, fever, severe or recurrent abdominal pain, persistent vomiting, breathing difficulty, black stools, fainting or inability to maintain fluids",
    drivers: [
      { label: "Pouch and limb reconstruction", detail: "The written plan should state the intended reconstruction without marketing a limb length as universally better." },
      { label: "Primary versus prior abdominal surgery", detail: "Adhesions can increase time and alter access." },
      { label: "Reflux, ulcer and endoscopy assessment", detail: "Findings and medicine risks affect selection and follow-up." },
      { label: "Diabetes medicine management", detail: "Insulin or other agents may need close perioperative adjustment." },
      { label: "Admission and complication care", detail: "Leak, obstruction or bleeding investigations can materially change the episode." },
    ],
    inclusions: [
      { label: "Multidisciplinary bypass assessment", detail: "Clinical, nutrition, laboratory and anaesthetic review as listed." },
      { label: "Roux-en-Y reconstruction", detail: "Surgeon, theatre, anaesthesia and both planned bowel joins." },
      { label: "Staplers and stated consumables", detail: "The pouch and anastomotic devices specified in the estimate." },
      { label: "Quoted inpatient monitoring", detail: "Defined ward allowance, routine medicines and glucose management." },
      { label: "Diet, supplement and review plan", detail: "Initial progression, prescriptions and included follow-up." },
    ],
    exclusions: [
      { label: "Additional hernia or gallbladder surgery", detail: "Separate unless clinically indicated and written." },
      { label: "Leak, ulcer, stricture or obstruction care", detail: "Imaging, endoscopy, drainage or reoperation outside routine scope." },
      { label: "Extended ward or critical care", detail: "Days and organ support beyond the allowance." },
      { label: "Later internal-hernia assessment", detail: "New abdominal symptoms may require a separate emergency episode." },
      { label: "Lifelong supplements and laboratory tests", detail: "Ongoing nutrition care after included visits." },
    ],
    records: ["Weight and prior treatment history", "Reflux, ulcer and endoscopy records", "Diabetes treatment and recent glycaemic records"],
    followUp:
      "Long-term review covers intake, dumping or hypoglycaemia symptoms, ulcer risks, medication changes and lifelong nutrition laboratory surveillance; new significant abdominal pain warrants assessment.",
    quoteQuestions: [
      "Which pouch, limb and anastomotic assumptions are written in the plan?",
      "How are mesenteric defects managed in the proposed operation?",
      "What education is provided about dumping and post-meal hypoglycaemia?",
      "Who evaluates possible internal hernia after I return home?",
    ],
    related: ["Sleeve Gastrectomy", "Mini Gastric Bypass (OAGB/MGB)", "Metabolic Surgery for Type 2 Diabetes", "Gastric Sleeve Revision Surgery"],
    figureAlt: "Medical illustration of a small gastric pouch connected to a Roux small-bowel limb with a downstream jejunojejunal connection",
  },
  {
    procedure: "Mini Gastric Bypass (OAGB/MGB)",
    briefName: "One-Anastomosis Gastric Bypass",
    shortName: "mini gastric bypass (OAGB/MGB)",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "One-anastomosis gastric bypass creates a long gastric pouch joined to a loop of small bowel, producing restriction and intestinal bypass through one gastrojejunal connection.",
    candidacy:
      "It may be considered after individualized obesity and metabolic assessment when the expected benefits and nutritional obligations fit the person's anatomy, reflux profile and follow-up access.",
    limits:
      "A universal BMI threshold is not enough. Significant reflux concerns, untreated deficiencies, unsuitable bowel or gastric anatomy, operative risk or inability to sustain lifelong monitoring may favour another strategy.",
    evaluation:
      "Review includes reflux and selective endoscopy, prior abdominal procedures, nutrition and eating pattern, liver and metabolic health, micronutrients, medication risks and anaesthetic assessment.",
    technique:
      "The surgeon forms a narrow gastric pouch and brings up a measured loop of jejunum for one gastrojejunal anastomosis; the selected bypass length must be individualized and documented.",
    approaches: [
      { label: "Laparoscopic OAGB", detail: "A one-join loop reconstruction in selected anatomy." },
      { label: "Roux-en-Y bypass instead", detail: "May be preferable when bile reflux or other anatomy makes a Roux configuration more appropriate." },
      { label: "Sleeve instead of bypass", detail: "Avoids intestinal bypass but has different reflux and nutritional considerations." },
    ],
    duration: "often about two to three hours for a primary case, with anatomy and adhesions affecting time",
    admission:
      "Inpatient care monitors bleeding, leak, nausea, hydration, glucose, breathing and early mobility before diet progression.",
    diet:
      "The prescribed sequence usually moves from liquids to puréed and soft foods before regular textures, with small slow meals and attention to food intolerance.",
    nutrition:
      "Hydration, adequate protein, lifelong supplements and periodic blood tests are central because bypass length can affect iron, B12, folate, calcium, vitamin D and other nutrients.",
    recovery:
      "Walking begins early; return to work, lifting and flight waits for reliable intake, bowel function, pain control and individualized clot advice.",
    risks:
      "Specific concerns include leak, bleeding, ulcer, stricture, bile reflux, dumping, diarrhoea, protein or micronutrient deficiency, gallstones and later bowel obstruction.",
    urgent:
      "fever, rapid pulse, worsening abdominal pain, repeated vomiting, black stools, breathing difficulty, fainting, severe diarrhoea or inability to drink",
    drivers: [
      { label: "Documented bypass length", detail: "The anatomy and nutritional implications should be explicit rather than sold as a standard upgrade." },
      { label: "Reflux and endoscopy findings", detail: "Bile or acid reflux concerns can redirect reconstruction." },
      { label: "Prior abdominal surgery", detail: "Adhesions may alter access and duration." },
      { label: "Metabolic and nutritional complexity", detail: "Existing diabetes or deficiencies add assessment and monitoring." },
      { label: "Admission and complication care", detail: "Endoscopy, imaging or another operation may exceed routine scope." },
    ],
    inclusions: [
      { label: "OAGB candidacy assessment", detail: "Clinical, reflux, nutrition and anaesthesia review as stated." },
      { label: "One-anastomosis reconstruction", detail: "Named surgeon, theatre, anaesthesia and documented bowel plan." },
      { label: "Stapling and anastomotic consumables", detail: "Only devices specified in writing." },
      { label: "Quoted ward course", detail: "Defined nights, routine medicines and monitoring." },
      { label: "Diet and supplementation plan", detail: "Initial progression and included reviews." },
    ],
    exclusions: [
      { label: "Conversion to Roux-en-Y or another operation", detail: "Different reconstruction unless expressly included." },
      { label: "Leak, bleeding, ulcer or obstruction care", detail: "Additional imaging, endoscopy, drainage or surgery." },
      { label: "Extended admission or critical care", detail: "Care beyond stated allowances." },
      { label: "Later bile-reflux evaluation or revision", detail: "Separate investigation and treatment." },
      { label: "Long-term supplements and laboratory monitoring", detail: "Ongoing costs after the included period." },
    ],
    records: ["Weight and prior treatment history", "Reflux symptoms and any endoscopy", "Nutrition, liver and metabolic laboratory records"],
    followUp:
      "Follow-up assesses reflux, bowel symptoms, protein intake, medications and weight trajectory, with lifelong laboratory surveillance and a clear route for investigating persistent bile reflux.",
    quoteQuestions: [
      "What bypass length is proposed, and how was it individualized?",
      "How will bile-reflux risk influence the choice between OAGB and Roux-en-Y?",
      "Which protein and micronutrient monitoring schedule is provided?",
      "What revision pathway is available for persistent bile reflux?",
    ],
    related: ["Gastric Bypass (Roux-en-Y)", "Sleeve Gastrectomy", "Metabolic Surgery for Type 2 Diabetes", "SADI-S Surgery"],
    figureAlt: "Medical illustration of a long gastric pouch connected through one gastrojejunal anastomosis to a loop of small bowel",
  },
  {
    procedure: "Gastric Balloon",
    briefName: "Intragastric Balloon",
    shortName: "gastric balloon",
    specialist: "Therapeutic endoscopist",
    kind: "endoscopic",
    definition:
      "A gastric balloon is a temporary space-occupying device placed in the stomach endoscopically or, for selected products, swallowed and then filled under the product protocol.",
    candidacy:
      "It may be considered within a structured weight-management program when a temporary endoscopic tool fits the person's goals, anatomy, prior treatment and capacity for dietary and behavioural follow-up.",
    limits:
      "It is not surgery and no single BMI value establishes suitability. Prior gastric surgery, important ulcer or hernia disease, pregnancy, unsafe anaesthesia risk or inability to return for required removal may preclude placement.",
    evaluation:
      "The team reviews prior stomach or oesophageal disease and surgery, reflux, medicines, pregnancy possibility, eating behaviour, nutrition, anaesthetic fitness and the device's placement and mandatory removal timetable.",
    technique:
      "For an endoscopically placed balloon, the clinician inspects the upper gut, positions the device in the stomach and fills it to the product protocol; placement and planned removal belong to one care pathway.",
    approaches: [
      { label: "Endoscopically placed fluid-filled balloon", detail: "Placed and later removed during upper endoscopy under the relevant anaesthesia plan." },
      { label: "Other temporary balloon protocols", detail: "Product-specific filling, imaging and removal requirements must be named rather than generalized." },
      { label: "No device or surgical alternative", detail: "Medication, lifestyle care or surgery may fit better after individualized review." },
    ],
    duration: "placement commonly takes less than an hour, plus assessment, anaesthesia recovery and observation",
    admission:
      "Placement is commonly day-care or overnight observation, but early nausea, pain or poor intake can require additional fluids, medicines or admission.",
    diet:
      "Clear liquids usually begin first and advance through fuller liquids and soft textures under device-specific instructions; small portions and slow eating help identify intolerance.",
    nutrition:
      "Hydration is a particular early concern during nausea, and protein intake should follow the dietitian's plan. Long-term deficiency risk is not the same as intestinal bypass, but nutrition review remains important.",
    recovery:
      "Nausea, cramping, reflux and reduced intake can be prominent in the first days; travel should wait until fluids and symptoms are manageable and a removal plan is secured.",
    risks:
      "Specific risks include substantial nausea or vomiting, pain, reflux, dehydration, ulceration, balloon deflation or migration, obstruction, pancreatitis, aspiration and the need for early endoscopic removal.",
    urgent:
      "inability to keep fluids down, reduced urine, severe or persistent pain, abdominal swelling, vomiting blood, black stools, breathing difficulty or signs of device migration",
    drivers: [
      { label: "Balloon product and fill protocol", detail: "Device supply and required imaging or endoscopy differ." },
      { label: "Placement anaesthesia and observation", detail: "Sedation depth and intolerance can change the episode." },
      { label: "Included removal procedure", detail: "Removal date, anaesthesia and facility must be priced, not assumed." },
      { label: "Early intolerance treatment", detail: "IV fluids, medicines or urgent removal can add care." },
      { label: "Structured follow-up program", detail: "Dietetic, behavioural and medical visits may be separate." },
    ],
    inclusions: [
      { label: "Device suitability review", detail: "History, medicines, nutrition and anaesthesia assessment as written." },
      { label: "Named balloon device", detail: "Product, fill protocol and intended duration." },
      { label: "Endoscopic placement and anaesthesia", detail: "When the selected device uses endoscopic placement." },
      { label: "Quoted observation and medicines", detail: "Defined recovery, anti-nausea and acid-suppression scope." },
      { label: "Removal and follow-up schedule", detail: "Included only when the estimate explicitly states both." },
    ],
    exclusions: [
      { label: "Pre-placement diagnostic endoscopy or treatment", detail: "Ulcer biopsy or other findings may be separate." },
      { label: "IV fluids or admission for intolerance", detail: "Additional unless included." },
      { label: "Urgent early removal", detail: "Confirm endoscopy, anaesthesia and device-disposal fees." },
      { label: "Scheduled removal", detail: "Not included unless expressly written into the full pathway." },
      { label: "Ongoing medication and weight-management care", detail: "Later dietetic, behavioural or medical treatment." },
    ],
    records: ["Prior endoscopy and upper-gastrointestinal records", "Any previous abdominal or bariatric operative notes", "Weight-management, nutrition and medicine history"],
    followUp:
      "Follow-up manages tolerance and eating behaviour, tracks the fixed removal deadline, and transitions to a sustainable medical, nutritional or surgical plan before the device is removed.",
    quoteQuestions: [
      "Which balloon product, fill material and intended duration are proposed?",
      "Are both placement and scheduled removal included in the estimate?",
      "Who provides urgent endoscopic removal if intolerance develops?",
      "What medication and hydration protocol is used during early intolerance?",
    ],
    related: ["Endoscopic Sleeve Gastroplasty (ESG)", "Sleeve Gastrectomy", "Metabolic Surgery for Type 2 Diabetes"],
    figureAlt: "Medical illustration of a temporary filled intragastric balloon occupying space within the stomach without changing intestinal anatomy",
  },
  {
    procedure: "Endoscopic Sleeve Gastroplasty (ESG)",
    briefName: "Endoscopic Sleeve Gastroplasty",
    shortName: "endoscopic sleeve gastroplasty",
    specialist: "Therapeutic endoscopist",
    kind: "endoscopic",
    definition:
      "Endoscopic sleeve gastroplasty uses full-thickness internal sutures to fold the stomach into a narrower tubular shape without removing stomach or making abdominal incisions.",
    candidacy:
      "It may be considered as part of individualized obesity care when an endoscopic option fits the person's health, prior treatment, anatomy and willingness to complete structured nutrition and behavioural follow-up.",
    limits:
      "It is not a surgical sleeve and no universal BMI threshold decides suitability. Prior gastric surgery, important ulcer or hernia disease, bleeding risk, unsafe anaesthesia or inability to sustain follow-up may make ESG inappropriate.",
    evaluation:
      "Assessment includes weight and treatment history, eating pattern, reflux, medicines and bleeding risk, nutrition and psychosocial review, anaesthetic fitness and endoscopic evaluation of gastric anatomy.",
    technique:
      "Under general anaesthesia or deep sedation, a therapeutic endoscope and suturing platform place a planned pattern of full-thickness sutures that plicate and shorten the stomach.",
    approaches: [
      { label: "Primary ESG", detail: "An internal suture pattern in an untreated stomach using a named endoscopic platform." },
      { label: "Endoscopic suture revision", detail: "A separate altered-suture scenario when plications loosen or anatomy changes." },
      { label: "Balloon, medication or surgery instead", detail: "Alternatives differ in reversibility, anatomy, risk and long-term monitoring." },
    ],
    duration: "often about one to two hours, plus anaesthesia recovery and observation",
    admission:
      "ESG is commonly day-care or short observation, but pain, nausea, poor intake or another concern can require overnight monitoring.",
    diet:
      "A staged liquid, puréed and soft-food plan protects the new plications before gradual texture progression; exact timing follows the endoscopy team's protocol.",
    nutrition:
      "Small frequent sips and adequate protein are important during early restriction. ESG does not bypass bowel, but dietetic care and laboratory testing remain individualized.",
    recovery:
      "Cramping, nausea and fatigue may occur early; normal activity returns gradually after intake stabilizes, while heavy exertion follows the treating team's instructions.",
    risks:
      "Specific risks include pain, nausea, bleeding, infection, leak or perigastric collection, suture disruption, narrowing, reflux, anaesthesia events and possible later endoscopic or surgical treatment.",
    urgent:
      "fever, rapid pulse, increasing abdominal or shoulder pain, repeated vomiting, vomiting blood, black stools, breathing difficulty or inability to drink",
    drivers: [
      { label: "Endoscopic suturing platform and suture count", detail: "The device and consumables should be explicit." },
      { label: "Primary versus prior gastric intervention", detail: "Existing scars or devices change complexity." },
      { label: "Anaesthesia and observation", detail: "Airway risk and poor intake can alter monitoring." },
      { label: "Pre-procedure endoscopic findings", detail: "Ulcer, hernia or other disease can postpone or redirect treatment." },
      { label: "Structured aftercare", detail: "Dietetic and behavioural support may or may not be bundled." },
    ],
    inclusions: [
      { label: "ESG suitability and nutrition assessment", detail: "The consultations and tests listed in the estimate." },
      { label: "Therapeutic endoscopy and anaesthesia", detail: "Named endoscopist, endoscopy room and recovery." },
      { label: "Suturing platform and stated sutures", detail: "The procedure-specific device scope." },
      { label: "Quoted observation and medicines", detail: "Defined anti-nausea, pain and acid-suppression care." },
      { label: "Diet progression and included reviews", detail: "Written plan and follow-up interval." },
    ],
    exclusions: [
      { label: "Treatment of ulcer or other findings", detail: "Biopsy, medicines or delay may be separate." },
      { label: "Additional sutures or repeat ESG", detail: "Future endoscopic revision is not routine inclusion." },
      { label: "Admission for poor intake or complication", detail: "Extra nights, imaging, drainage or surgery." },
      { label: "Conversion to bariatric surgery", detail: "A separate assessment and altered-anatomy episode." },
      { label: "Long-term medication and dietetic program", detail: "Care beyond stated visits." },
    ],
    records: ["Weight and prior treatment history", "Prior upper endoscopy or gastric procedure records", "Nutrition, eating-behaviour and relevant psychosocial assessments"],
    followUp:
      "Follow-up assesses suture-related symptoms, intake, reflux and eating behaviour, with long-term medical and dietetic support; recurrent hunger or weight change does not by itself prove suture failure.",
    quoteQuestions: [
      "Which endoscopic suturing platform and suture pattern are proposed?",
      "How many follow-up dietetic and behavioural visits are included?",
      "What investigation is available if leak or perigastric infection is suspected?",
      "How would prior ESG sutures affect any later surgery?",
    ],
    related: ["Gastric Balloon", "Sleeve Gastrectomy", "Gastric Sleeve Revision Surgery"],
    figureAlt: "Medical illustration of an endoscope placing full-thickness internal gastric sutures to create an endoscopic sleeve without stomach removal",
  },
  {
    procedure: "Metabolic Surgery for Type 2 Diabetes",
    briefName: "Metabolic Surgery for Type 2 Diabetes",
    shortName: "metabolic surgery for type 2 diabetes",
    specialist: "Metabolic and bariatric surgeon",
    kind: "surgical",
    definition:
      "Metabolic surgery uses a selected bariatric operation—commonly sleeve or gastric bypass—to alter gastrointestinal anatomy as part of type 2 diabetes and obesity care.",
    candidacy:
      "It may be considered after individualized review of diabetes duration and control, medicines, obesity-related health burden, operative fitness, prior treatment and ability to maintain lifelong follow-up.",
    limits:
      "No rigid universal BMI threshold or HbA1c guarantees benefit. Uncertain diabetes type, active acute complications, unsafe operative risk, untreated nutrition or psychological concerns, or absent follow-up may require delay or another strategy.",
    evaluation:
      "An endocrinology-informed work-up confirms diabetes type, duration, HbA1c and complications, insulin or other medicines, hypoglycaemia history, kidney and cardiovascular health, nutrition, reflux and anaesthetic fitness.",
    technique:
      "The actual operation must be named—such as sleeve, Roux-en-Y or OAGB—because pouch, staple line, bowel joins, risks and nutritional obligations differ.",
    approaches: [
      { label: "Sleeve-based metabolic surgery", detail: "Removes greater-curvature stomach without intestinal bypass; reflux and metabolic context matter." },
      { label: "Roux-en-Y gastric bypass", detail: "Creates a pouch and Roux reconstruction with distinct medication, dumping and nutrition considerations." },
      { label: "One-anastomosis bypass", detail: "A loop reconstruction requiring explicit bile-reflux and nutritional discussion." },
    ],
    duration: "depends on the named operation and associated work, commonly ranging from roughly one to four hours",
    admission:
      "Inpatient monitoring includes glucose, medicine adjustment, hydration, breathing, clot prevention and procedure-specific surgical observations.",
    diet:
      "Liquids progress to puréed, soft and regular textures according to the chosen operation; carbohydrate quality and meal timing also matter as medicines change.",
    nutrition:
      "Hydration and protein plans are individualized. Lifelong supplements and laboratory monitoring follow the actual operation, with particular attention to iron, B12, folate, calcium and vitamin D after bypass.",
    recovery:
      "Glucose medicines can require rapid reassessment, but no medicine should be stopped without instructions; activity and travel depend on the actual operation and clinical stability.",
    risks:
      "Risks combine those of the selected operation with hypoglycaemia, hyperglycaemia, dehydration, dumping after bypass, micronutrient deficiency and the possibility that diabetes medicines remain necessary.",
    urgent:
      "severe hypo- or hyperglycaemia, confusion, repeated vomiting, inability to drink, fever, rapid pulse, worsening abdominal pain, black stools or breathing difficulty",
    drivers: [
      { label: "Actual named operation", detail: "Sleeve, Roux-en-Y and OAGB are different procedures and estimates." },
      { label: "Diabetes type, medicines and complications", detail: "Insulin, kidney disease and cardiovascular assessment alter care." },
      { label: "Reflux and gastrointestinal anatomy", detail: "Can redirect procedure choice." },
      { label: "Glucose monitoring and medical co-management", detail: "Perioperative adjustment must be explicit." },
      { label: "Long-term nutrition and diabetes follow-up", detail: "Continuing care is not a one-time surgical fee." },
    ],
    inclusions: [
      { label: "Metabolic and surgical assessment", detail: "Diabetes, obesity, nutrition and anaesthesia review as stated." },
      { label: "The exact named operation", detail: "The estimate must identify sleeve, Roux-en-Y, OAGB or another procedure." },
      { label: "Procedure-specific consumables", detail: "Staplers, sutures and devices only as written." },
      { label: "Quoted inpatient glucose monitoring", detail: "Defined ward period and medication adjustment." },
      { label: "Discharge diabetes and nutrition plan", detail: "Written medicines, monitoring, diet and included reviews." },
    ],
    exclusions: [
      { label: "Endocrine tests for uncertain diabetes type", detail: "Additional specialist or laboratory work." },
      { label: "Treatment of diabetes complications", detail: "Kidney, eye, nerve or cardiovascular care remains separate." },
      { label: "Surgical complication or extended admission", detail: "Depends on the named operation and quote terms." },
      { label: "Continuous glucose equipment and medicines", detail: "Ongoing prescriptions after discharge." },
      { label: "Lifelong nutrition and metabolic surveillance", detail: "Tests and appointments beyond included visits." },
    ],
    records: ["Diabetes diagnosis, duration, HbA1c and glucose records", "Complete insulin and other medicine history", "Kidney, eye, nerve and cardiovascular complication assessments"],
    followUp:
      "Shared follow-up with diabetes, primary-care and bariatric teams adjusts medicines safely, monitors hypoglycaemia and complications, and continues procedure-specific nutrition surveillance without assuming remission.",
    quoteQuestions: [
      "Which exact metabolic operation is proposed, and why does it fit my diabetes and reflux profile?",
      "Who adjusts insulin and other glucose-lowering medicines before and after treatment?",
      "How will hypoglycaemia be monitored after I leave India?",
      "Which diabetes outcomes remain uncertain and which medicines may still be needed?",
    ],
    related: ["Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Mini Gastric Bypass (OAGB/MGB)", "SADI-S Surgery"],
    figureAlt: "Medical illustration comparing sleeve and bypass gastrointestinal anatomy considered within individualized type 2 diabetes care",
  },
  {
    procedure: "Gastric Sleeve Revision Surgery",
    briefName: "Gastric Sleeve Revision Surgery",
    shortName: "gastric sleeve revision surgery",
    specialist: "Revisional bariatric surgeon",
    kind: "altered-anatomy",
    definition:
      "Gastric sleeve revision re-operates on a prior sleeve to address a defined problem such as severe reflux, stenosis, twisting, dilation, fistula or clinically important recurrence after reassessment.",
    candidacy:
      "It may be considered only when symptoms, anatomy, nutrition and prior treatment identify a correctable problem and the expected trade-offs fit the individual's goals and follow-up capacity.",
    limits:
      "Weight change alone does not select an operation or universal BMI cutoff. Unclear anatomy, untreated eating or medical drivers, active inflammation, major deficiency or unsafe operative risk may require investigation or non-surgical care first.",
    evaluation:
      "Complete prior operative reports and stapling details, contrast imaging, endoscopy, reflux testing when indicated, nutrition laboratories, symptom and eating assessment and anaesthetic review are central.",
    technique:
      "The surgeon enters an adhesed upper abdomen, defines the prior staple line and hiatus, then performs the planned repair, re-sleeve or conversion—often to Roux-en-Y—only if current findings support it.",
    approaches: [
      { label: "Conversion to Roux-en-Y bypass", detail: "Commonly discussed for severe reflux or selected sleeve problems, with new bowel joins and lifelong bypass monitoring." },
      { label: "Targeted repair or endoscopic treatment", detail: "Selected stenosis, fistula or leak-related problems may need dilation, stenting or repair rather than a new bariatric operation." },
      { label: "Re-sleeve in selected anatomy", detail: "Requires evidence of a dilated segment and careful reflux and leak-risk discussion." },
    ],
    duration: "often longer than a primary sleeve, commonly two to five hours depending on adhesions and reconstruction",
    admission:
      "Inpatient monitoring follows the actual revision and may be longer because adhesiolysis, leak, bleeding and altered anatomy require close observation.",
    diet:
      "Diet restarts with liquids and progresses according to the new repair or reconstruction; prior tolerance does not justify skipping stages.",
    nutrition:
      "Hydration and protein require close attention. Supplements and lifelong laboratory monitoring follow the final anatomy, especially when revision creates an intestinal bypass.",
    recovery:
      "Recovery depends on adhesiolysis and reconstruction rather than the old sleeve scar; travel waits for stable intake, wounds, bowel function and complication review.",
    risks:
      "Revision-specific risks include injury during adhesiolysis, leak from a new or old staple line, bleeding, stricture, fistula, reflux persistence, bowel obstruction, nutritional deficiency and another intervention.",
    urgent:
      "fever, rapid pulse, increasing abdominal or shoulder pain, repeated vomiting, black stools, breathing difficulty, wound drainage or inability to drink",
    drivers: [
      { label: "Reason for revision", detail: "Reflux, stenosis, fistula and anatomical dilation require different work." },
      { label: "Adhesions and prior staple-line anatomy", detail: "Operative reports and current imaging shape theatre time." },
      { label: "Repair versus re-sleeve versus bypass", detail: "These are materially different reconstructions." },
      { label: "Endoscopy and contrast assessment", detail: "Often essential before a reliable estimate." },
      { label: "Leak or complication contingency", detail: "Drainage, stenting or prolonged admission may be needed." },
    ],
    inclusions: [
      { label: "Revisional anatomy assessment", detail: "Prior records, imaging, endoscopy and nutrition review as listed." },
      { label: "Named revision procedure", detail: "Repair, re-sleeve or conversion must be explicit." },
      { label: "Adhesiolysis and stated consumables", detail: "Only the anticipated scope and devices written." },
      { label: "Quoted inpatient monitoring", detail: "Defined ward or higher-acuity allowance." },
      { label: "New diet and supplement plan", detail: "Instructions matched to final anatomy and included follow-up." },
    ],
    exclusions: [
      { label: "Unexpected extensive adhesiolysis or organ repair", detail: "Additional work beyond documented assumptions." },
      { label: "Different conversion after intraoperative findings", detail: "A changed reconstruction may alter the estimate." },
      { label: "Leak, fistula or bleeding treatment", detail: "Imaging, stent, drainage, transfusion or reoperation." },
      { label: "Extended admission or critical care", detail: "Care beyond stated limits." },
      { label: "Lifelong bypass supplements and monitoring", detail: "Ongoing costs when final anatomy includes bypass." },
    ],
    records: ["All prior sleeve operative notes and discharge summaries", "Current endoscopy, contrast study and reflux testing", "Weight trajectory, symptoms, nutrition and prior complication records"],
    followUp:
      "Follow-up tracks the problem that prompted revision, the new anatomy, reflux, intake and deficiencies, with lifelong monitoring if conversion adds intestinal bypass.",
    quoteQuestions: [
      "Which prior operative details are still missing before the quote is reliable?",
      "Is the plan repair, re-sleeve or conversion to bypass, and what finding could change it?",
      "How are adhesiolysis and unexpected staple-line findings billed?",
      "What leak-management resources and follow-up are included?",
    ],
    related: ["Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Endoscopic Sleeve Gastroplasty (ESG)", "Gastric Band Removal"],
    figureAlt: "Medical illustration of altered sleeve anatomy assessed for adhesiolysis, targeted repair, re-sleeve or conversion to gastric bypass",
  },
  {
    procedure: "SADI-S Surgery",
    briefName: "SADI-S Surgery",
    shortName: "SADI-S surgery",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "SADI-S combines a sleeve stomach with division just beyond the pylorus and one duodeno-ileal anastomosis, leaving a shortened common channel for nutrient absorption.",
    candidacy:
      "It may be considered for selected individuals needing a substantial metabolic operation, including some after sleeve, when operative risk and reliable lifelong protein, supplement and laboratory follow-up are acceptable.",
    limits:
      "No universal BMI threshold alone justifies malabsorption. Existing protein-calorie malnutrition, major diarrhoeal disease, advanced liver disease, inability to take supplements or limited long-term monitoring may make SADI-S unsafe.",
    evaluation:
      "Assessment includes prior sleeve anatomy if present, endoscopy and reflux review, bowel and liver history, comprehensive protein and micronutrient laboratories, bone health, medication review and anaesthetic fitness.",
    technique:
      "The surgeon creates or assesses a sleeve, divides the duodenum beyond the pylorus and joins it to a measured distal ileal loop, preserving one duodeno-ileal anastomosis.",
    approaches: [
      { label: "Primary sleeve plus SADI-S", detail: "Sleeve and intestinal reconstruction during one planned episode." },
      { label: "Second-stage SADI-S after sleeve", detail: "An altered-anatomy operation requiring the old sleeve records and current assessment." },
      { label: "BPD/DS or gastric bypass alternative", detail: "Different numbers of joins, channel anatomy, reflux and nutritional burdens." },
    ],
    duration: "often about three to five hours, with prior sleeve adhesions or associated work adding time",
    admission:
      "Inpatient monitoring addresses leak, bleeding, bowel function, hydration, protein intake, clot risk and early metabolic changes.",
    diet:
      "Liquids advance to puréed, soft and regular textures under a staged plan, while stool changes and tolerance are reviewed rather than normalized without assessment.",
    nutrition:
      "Adequate protein, hydration and lifelong procedure-specific vitamin and mineral replacement are essential. Regular testing includes protein status, blood count, iron, B12, folate, calcium, fat-soluble vitamins and other indicated nutrients.",
    recovery:
      "Walking starts early, but reliable intake and bowel function matter before discharge; return and flight timing remain flexible because dehydration and diarrhoea can delay readiness.",
    risks:
      "Risks include duodenal or sleeve leak, bleeding, ulcer, bile reflux, obstruction, diarrhoea, foul stools, dehydration, protein-calorie malnutrition, fat-soluble vitamin deficiency, bone disease and later revision.",
    urgent:
      "fever, rapid pulse, severe abdominal pain, persistent vomiting or diarrhoea, reduced urine, swelling, profound weakness, black stools or breathing difficulty",
    drivers: [
      { label: "Primary versus second-stage operation", detail: "Prior sleeve anatomy and adhesions change scope." },
      { label: "Measured bowel and common-channel plan", detail: "Must be documented with its nutritional rationale." },
      { label: "Baseline protein and micronutrient status", detail: "Deficiencies require treatment and may delay surgery." },
      { label: "Liver, bowel and metabolic comorbidity", detail: "Can alter candidacy and monitoring." },
      { label: "Long-term laboratory and dietetic support", detail: "Essential care may sit outside the hospital letter." },
    ],
    inclusions: [
      { label: "SADI-S candidacy and nutrition work-up", detail: "Comprehensive medical, anatomy and laboratory review as stated." },
      { label: "Sleeve and duodeno-ileal procedure", detail: "Primary or second-stage scope must be named." },
      { label: "Staplers, sutures and stated consumables", detail: "Procedure-specific devices in writing." },
      { label: "Quoted inpatient monitoring", detail: "Defined ward care, medicines and initial nutrition support." },
      { label: "Protein, supplement and laboratory plan", detail: "Written prescriptions and included early reviews." },
    ],
    exclusions: [
      { label: "Correction of pre-existing malnutrition", detail: "Protein or micronutrient treatment before surgery." },
      { label: "Unexpected revision of prior sleeve", detail: "Additional altered-anatomy work." },
      { label: "Leak, obstruction or severe diarrhoea care", detail: "Imaging, nutrition support, drainage or reoperation." },
      { label: "Extended admission or critical care", detail: "Care beyond stated limits." },
      { label: "Lifelong supplements and surveillance", detail: "Continuing protein products, vitamins, tests and visits." },
    ],
    records: ["Prior sleeve records and current anatomy imaging if applicable", "Protein, liver, bone and comprehensive micronutrient results", "Bowel symptoms, nutrition assessment and weight-treatment history"],
    followUp:
      "Lifelong bariatric and dietetic follow-up monitors protein intake, stool pattern, liver and bone health and deficiencies; persistent diarrhoea, oedema or weakness requires prompt review.",
    quoteQuestions: [
      "Is this primary SADI-S or a second stage after sleeve?",
      "What bowel measurements and common-channel plan are proposed?",
      "Which protein and fat-soluble vitamin monitoring is included?",
      "Who manages severe diarrhoea or protein malnutrition after return?",
    ],
    related: ["Duodenal Switch (BPD/DS)", "Sleeve Gastrectomy", "Mini Gastric Bypass (OAGB/MGB)", "Metabolic Surgery for Type 2 Diabetes"],
    figureAlt: "Medical illustration of sleeve anatomy connected through one duodeno-ileal anastomosis to a shortened absorptive bowel channel in SADI-S",
  },
  {
    procedure: "Duodenal Switch (BPD/DS)",
    briefName: "Biliopancreatic Diversion with Duodenal Switch",
    shortName: "duodenal switch (BPD/DS)",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "BPD/DS combines sleeve gastrectomy with duodenal division and two bowel connections that separate food from biliopancreatic secretions until a short common channel.",
    candidacy:
      "It may be considered for carefully selected individuals when the intended metabolic effect outweighs substantial malabsorption risk and lifelong specialist nutrition care is dependable.",
    limits:
      "A high BMI alone is not enough. Protein malnutrition, major bowel or liver disease, inability to adhere to supplements, pregnancy plans requiring reassessment or poor access to lifelong laboratory monitoring may favour another procedure.",
    evaluation:
      "Work-up includes gastrointestinal and prior surgical anatomy, liver and bowel health, comprehensive protein, vitamin, mineral and bone assessment, eating pattern, psychosocial support and anaesthetic fitness.",
    technique:
      "After creating or confirming a sleeve, the surgeon divides the duodenum, constructs an alimentary limb and a biliopancreatic limb, then joins them to form the measured common channel.",
    approaches: [
      { label: "Primary BPD/DS", detail: "Sleeve and two-anastomosis intestinal reconstruction in one planned operation." },
      { label: "Staged DS after sleeve", detail: "A later altered-anatomy operation when reassessment supports adding malabsorption." },
      { label: "SADI-S alternative", detail: "Uses one duodeno-ileal anastomosis and different bowel configuration; it is not the same procedure." },
    ],
    duration: "often about four to six hours or longer when staged anatomy, adhesions or associated work is present",
    admission:
      "Inpatient care monitors multiple staple and join sites, bleeding, bowel function, hydration, protein tolerance, clot risk and metabolic changes.",
    diet:
      "A staged liquid-to-puréed-to-soft progression precedes regular textures, with explicit management of stool frequency, dietary fat tolerance and meal protein.",
    nutrition:
      "High-priority protein intake, hydration and lifelong intensive vitamin and mineral replacement are mandatory. Serial testing includes albumin or other protein markers, iron, B12, folate, calcium, fat-soluble vitamins and bone health.",
    recovery:
      "Recovery and travel depend on wounds, intake, bowel pattern and laboratory stability; diarrhoea, dehydration or poor protein tolerance can extend nearby care.",
    risks:
      "Risks include sleeve or anastomotic leak, bleeding, obstruction, ulcer, diarrhoea, foul stools, dehydration, severe protein-calorie malnutrition, fat-soluble vitamin deficiency, anaemia, bone disease, liver complications and revision.",
    urgent:
      "fever, rapid pulse, severe abdominal pain, persistent vomiting or diarrhoea, reduced urine, oedema, marked weakness, black stools, confusion or breathing difficulty",
    drivers: [
      { label: "Primary versus staged altered anatomy", detail: "Prior sleeve and adhesions change time and risk." },
      { label: "Alimentary, biliopancreatic and common-channel plan", detail: "Bowel measurements and rationale must be explicit." },
      { label: "Baseline protein and micronutrient status", detail: "Correction may be required before treatment." },
      { label: "Number of anastomoses and consumables", detail: "This is not interchangeable with SADI-S." },
      { label: "Lifelong nutrition infrastructure", detail: "Specialist tests and supplements are essential continuing costs." },
    ],
    inclusions: [
      { label: "DS medical and nutrition assessment", detail: "Anatomy, liver, bowel, bone and deficiency review as stated." },
      { label: "Sleeve and two-anastomosis reconstruction", detail: "Primary or staged scope and bowel plan." },
      { label: "Staplers, sutures and stated consumables", detail: "All named procedural devices." },
      { label: "Quoted inpatient monitoring", detail: "Defined ward care and initial nutrition support." },
      { label: "Intensive supplement and laboratory plan", detail: "Written prescriptions and included early reviews." },
    ],
    exclusions: [
      { label: "Preoperative deficiency correction", detail: "Protein, vitamin, mineral or bone treatment." },
      { label: "Unexpected prior-sleeve repair", detail: "Added altered-anatomy work." },
      { label: "Leak, obstruction or malnutrition treatment", detail: "Drainage, reoperation, enteral or parenteral nutrition." },
      { label: "Extended admission or critical care", detail: "Beyond the stated allowance." },
      { label: "Lifelong supplements and laboratory surveillance", detail: "Continuing high-intensity nutrition costs." },
    ],
    records: ["Complete prior bariatric records if staged", "Protein, liver, bone and comprehensive micronutrient studies", "Bowel history, nutrition assessment and prior weight treatment"],
    followUp:
      "Lifelong specialist follow-up monitors protein status, bowel symptoms, anaemia, fat-soluble vitamins, liver and bone health; deficiency or oedema can require urgent nutrition treatment or revision assessment.",
    quoteQuestions: [
      "Is the operation primary or staged after a previous sleeve?",
      "What alimentary, biliopancreatic and common-channel measurements are proposed?",
      "How does this plan differ anatomically and nutritionally from SADI-S?",
      "Who can provide urgent protein nutrition support after I return home?",
    ],
    related: ["SADI-S Surgery", "Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Metabolic Surgery for Type 2 Diabetes"],
    figureAlt: "Medical illustration of sleeve stomach, alimentary limb, biliopancreatic limb and short common channel created during BPD/DS",
  },
  {
    procedure: "Gastric Banding (Lap-Band)",
    briefName: "Adjustable Gastric Banding",
    shortName: "gastric banding (Lap-Band)",
    specialist: "Bariatric surgeon",
    kind: "surgical",
    definition:
      "Adjustable gastric banding places an inflatable silicone band around the upper stomach and connects it to a subcutaneous port for later fluid adjustments.",
    candidacy:
      "It is now less commonly selected as a first operation but may be considered for an informed individual whose anatomy, eating pattern, operative profile and reliable access to repeated adjustments fit the device.",
    limits:
      "No universal BMI threshold makes a band appropriate. Significant oesophageal motility problems, inability to attend fills and surveillance, high-risk eating patterns or unwillingness to accept possible removal may favour another pathway.",
    evaluation:
      "Assessment includes swallowing and reflux symptoms, selective endoscopy or contrast study, eating behaviour, prior abdominal surgery, nutrition, device expectations, anaesthetic fitness and a practical long-term adjustment plan.",
    technique:
      "Through laparoscopic access, the surgeon passes the adjustable band around the upper stomach, secures it and connects tubing to a port fixed under the abdominal skin.",
    approaches: [
      { label: "Primary laparoscopic adjustable band", detail: "Band and access port placement with a documented device and follow-up plan." },
      { label: "Band adjustment program", detail: "Serial fills or defills are part of ongoing care, not proof that placement is complete treatment." },
      { label: "Sleeve or bypass alternative", detail: "Different anatomy without the same port, slippage and erosion considerations." },
    ],
    duration: "often about one hour for uncomplicated primary placement, plus anaesthesia and recovery",
    admission:
      "Short inpatient or observation care monitors pain, nausea, swallowing and early intake; the band is not usually tightened aggressively at placement.",
    diet:
      "Liquids advance through puréed and soft textures according to the team's protocol, followed by small well-chewed meals and avoidance of eating through obstruction symptoms.",
    nutrition:
      "Hydration and protein still matter, particularly after an adjustment. The band does not intentionally bypass absorption, but vomiting or poor intake can cause deficiency and requires assessment.",
    recovery:
      "Walking begins early, while lifting and travel follow wound, port-site and intake review; future adjustment access must be arranged before leaving.",
    risks:
      "Specific risks include band slippage, pouch or oesophageal dilation, dysphagia, reflux, port or tubing failure, infection, band erosion into the stomach, repeated vomiting and eventual deflation, revision or removal.",
    urgent:
      "inability to swallow liquids, repeated vomiting, severe upper abdominal pain, fever, port redness or drainage, vomiting blood, black stools or sudden reflux worsening",
    drivers: [
      { label: "Named band and port device", detail: "Device availability and replacement terms should be stated." },
      { label: "Placement versus adjustment package", detail: "Fills, defills and imaging are ongoing episodes." },
      { label: "Swallowing and oesophageal assessment", detail: "Symptoms may require contrast imaging or endoscopy." },
      { label: "Prior upper-abdominal surgery", detail: "Adhesions can alter access." },
      { label: "Long-term device surveillance", detail: "Port, tubing, slippage and erosion care may be separate." },
    ],
    inclusions: [
      { label: "Band suitability assessment", detail: "Eating, reflux, oesophageal, nutrition and anaesthesia review." },
      { label: "Named band and access port", detail: "Manufacturer or model and supplied components as written." },
      { label: "Laparoscopic placement and anaesthesia", detail: "Surgeon and facility episode." },
      { label: "Quoted observation and imaging", detail: "Defined ward and any stated contrast check." },
      { label: "Initial adjustment and diet plan", detail: "Only the number of visits explicitly included." },
    ],
    exclusions: [
      { label: "Later fills, defills and imaging", detail: "Ongoing adjustment episodes unless bundled." },
      { label: "Port or tubing replacement", detail: "Device malfunction care." },
      { label: "Slippage, erosion or infection treatment", detail: "Endoscopy, admission, revision or removal." },
      { label: "Conversion to sleeve or bypass", detail: "A separate altered-anatomy operation." },
      { label: "Long-term nutrition and device surveillance", detail: "Care beyond included visits." },
    ],
    records: ["Eating, swallowing and reflux history", "Any endoscopy, contrast study or oesophageal testing", "Prior weight treatment and abdominal operative records"],
    followUp:
      "Long-term access to band adjustments and surveillance is essential. New dysphagia, reflux or vomiting prompts deflation and assessment for slippage, dilation or erosion rather than repeated tightening.",
    quoteQuestions: [
      "Which band and port device is included?",
      "How many fills, defills and contrast checks are included?",
      "Who can adjust or urgently deflate the band after I return home?",
      "How are slippage, erosion, port failure and eventual removal handled?",
    ],
    related: ["Gastric Band Removal", "Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)"],
    figureAlt: "Medical illustration of an adjustable silicone band around the upper stomach connected by tubing to a subcutaneous access port",
  },
  {
    procedure: "Gastric Band Removal",
    briefName: "Gastric Band Removal",
    shortName: "gastric band removal",
    specialist: "Revisional bariatric surgeon",
    kind: "altered-anatomy",
    definition:
      "Gastric band removal explants the adjustable band, tubing and port from previously operated anatomy, with additional repair guided by slippage, erosion, scarring or infection.",
    candidacy:
      "Removal may be considered for erosion, slippage, obstruction, reflux, oesophageal or pouch dilation, infection, device failure, intolerance or a change in the person's treatment plan.",
    limits:
      "Removal is not automatically simple or automatically combined with another bariatric operation. Active erosion or infection, oesophageal dysfunction, scar and nutritional status may favour staged care.",
    evaluation:
      "The team needs the implant record and fill history, symptoms, contrast imaging and often endoscopy, prior operative notes, nutrition assessment and a plan for removal alone versus later conversion.",
    technique:
      "The surgeon releases adhesions, disconnects and removes the port, tubing and band, and assesses the fibrous capsule and stomach; erosion may require endoscopic, laparoscopic or staged repair.",
    approaches: [
      { label: "Laparoscopic band, tubing and port removal", detail: "Used when the device can be safely mobilized from outside the stomach." },
      { label: "Endoscopic or combined removal for erosion", detail: "Selected when part of the band has entered the stomach; repair and observation differ." },
      { label: "Staged conversion to sleeve or bypass", detail: "Often separated when inflammation, scarring or oesophageal dysfunction makes same-sitting conversion unsafe." },
    ],
    duration: "often about one to three hours, with erosion, dense adhesions or gastric repair extending the procedure",
    admission:
      "Observation or inpatient care depends on simple explant versus erosion, stomach repair, infection or conversion; altered anatomy makes fixed package timing unreliable.",
    diet:
      "Liquids may progress to soft and regular textures according to whether the stomach or oesophagus required repair; same-day normal eating should not be assumed.",
    nutrition:
      "Hydration and protein support healing. Removal ends restriction from the device but does not end obesity, nutrition or oesophageal follow-up; deficiencies from prolonged poor intake should be corrected.",
    recovery:
      "Recovery follows the amount of adhesiolysis and repair. Travel waits for stable swallowing, intake, wounds and confirmation that no leak or infection concern remains.",
    risks:
      "Removal-specific risks include bleeding, gastric or oesophageal injury, leak, infection, retained device material, persistent dysphagia or reflux, adhesions and the need for drainage, repair or a later conversion.",
    urgent:
      "fever, rapid pulse, worsening upper abdominal or shoulder pain, repeated vomiting, inability to swallow liquids, vomiting blood, black stools, wound drainage or breathing difficulty",
    drivers: [
      { label: "Reason for removal", detail: "Intolerance, slippage, erosion and infection are different operations." },
      { label: "Band erosion and gastric repair", detail: "Endoscopy, combined access or staged care may be required." },
      { label: "Adhesions and fibrous capsule", detail: "Prior records cannot fully predict dissection." },
      { label: "Removal alone versus conversion", detail: "Sleeve or bypass is a separate reconstruction unless explicitly planned." },
      { label: "Port, tubing and retained components", detail: "The complete explant scope should be written." },
    ],
    inclusions: [
      { label: "Altered-anatomy assessment", detail: "Implant history, imaging, endoscopy and nutrition review as stated." },
      { label: "Band, tubing and port explant", detail: "All planned device components must be identified." },
      { label: "Expected adhesiolysis and capsule work", detail: "Only the written anticipated scope." },
      { label: "Quoted observation or ward stay", detail: "Matched to removal alone or repair." },
      { label: "Post-removal diet and follow-up", detail: "Swallowing, wound and longer-term care plan." },
    ],
    exclusions: [
      { label: "Endoscopic erosion treatment", detail: "Separate unless clearly included." },
      { label: "Unexpected stomach or oesophageal repair", detail: "Additional work beyond assumptions." },
      { label: "Leak, abscess or infection care", detail: "Imaging, drainage, antibiotics or reoperation." },
      { label: "Same-sitting or later bariatric conversion", detail: "Sleeve or bypass requires its own indication and quote." },
      { label: "Long-term weight and nutrition management", detail: "Continuing care after explant." },
    ],
    records: ["Band model, implant card, fill history and port records", "Original operative note and all revision records", "Current endoscopy, contrast imaging, swallowing and infection assessments"],
    followUp:
      "Follow-up reassesses swallowing, reflux, oesophageal or pouch dilation, wound and nutritional recovery, then builds a non-procedural or staged bariatric plan without assuming immediate conversion.",
    quoteQuestions: [
      "Does the quote include removal of the band, all tubing and the port?",
      "Is erosion suspected, and will endoscopic or combined removal be available?",
      "What stomach or oesophageal repair might be needed?",
      "Why is conversion planned in the same sitting or deferred to a later stage?",
    ],
    related: ["Gastric Banding (Lap-Band)", "Sleeve Gastrectomy", "Gastric Bypass (Roux-en-Y)", "Gastric Sleeve Revision Surgery"],
    figureAlt: "Medical illustration of altered upper-stomach anatomy during removal of an adjustable band, connecting tubing and subcutaneous port",
  },
];

export const bariatricSurgeryArticles: CostArticle[] = profiles.map(createBariatricArticle);

export const bariatricSurgeryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  bariatricSurgeryArticles.map((article) => [article.slug, article]),
);
