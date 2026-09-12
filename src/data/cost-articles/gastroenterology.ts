import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { GASTROENTEROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

type GiProcedure = (typeof GASTROENTEROLOGY_PROCEDURES)[number];

type GiProfile = {
  procedure: GiProcedure;
  shortName: string;
  specialist: string;
  definition: string;
  candidacy: string;
  limits: string;
  evaluation: string;
  technique: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  inclusions: LabelledDetail[];
  exclusions: LabelledDetail[];
  records: string[];
  followUp: string;
  quoteQuestions: string[];
  related: GiProcedure[];
  imageAlts: [string, string, string];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; arrival: string; lodging: string; recovery: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate GI corridors. Confirm the exact endoscopy or ERCP campus before booking: a cross-NCR transfer soon after bowel prep, biliary stenting or a bleeding admission is difficult.",
    lodging:
      "Choose flexible lodging near the named campus with a bathroom that can support bowel prep, a companion bed and a route back for delayed bleeding or pancreatitis concern.",
    recovery:
      "Winter pollution and street-food exposure can complicate a healing gut. Follow the team's diet, hydration and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed bowel prep, ERCP observation or an urgent return for GI bleeding.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, clean water for prep or rinses and a reliable night-time route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make hydration, dietary progression and reliable transport practical parts of discharge planning after endoscopy or third-space work.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after sedation, ERCP or endoscopic resection.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy access and a first pathology or stent-review appointment.",
    recovery:
      "Milder weather does not remove bleeding, pancreatitis or dehydration risk. Arrange the first clinical or dietitian review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several GI campuses have comparatively direct airport access, but heat and travel after bowel prep or sedation still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with safe water for prep and easy access for stent, biopsy or bleeding review.",
    recovery:
      "Heat can worsen dehydration after prep, POEM or metabolic endoscopy. Fluid and diet targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the endoscopy campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the gastroenterology team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after ERCP, resection or liver sampling. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, therapeutic add-ons, stent choice, observation nights or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact GI procedure, diagnostic versus therapeutic work, stent or device, sedation, emergency backup and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish advanced-endoscopy capability, pathology turnaround or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, device, imaging, pharmacy and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual lesion, duct anatomy and observation plan rather than a general endoscopy package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, device scope and post-travel GI follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews pathology or a stent after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, device, imaging and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: GiProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic gastroenterology or endoscopy label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader gastroenterology ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, diagnostic versus therapeutic scope, monitoring and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, diagnostic versus therapeutic plan and route for urgent GI reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete gastroenterology records before non-refundable travel. Remote review can change after examination, endoscopy, imaging or blood tests.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither value is a city tariff, admission promise or treatment recommendation.`,
          `${profile.technique} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical and resource differences, not premium upgrades.`,
          `Ask the provider to name the ${profile.specialist}, campus, diagnostic versus therapeutic assumptions, devices, observation allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send GI notes, relevant endoscopy, imaging or liver tests and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm endoscopy-unit, ERCP or interventional readiness where relevant and emergency bleeding or pancreatitis backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews symptoms, diet, devices or pathology and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, imaging, stent or device assumptions, observation plan and handover in writing. General accreditation does not establish current capability or outcomes.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored; an itemized provider estimate is required.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A named ${profile.specialist} should assess it. Cards appear only for exact CMS relationships and are not rankings.`,
          },
          { q: `Where should a patient stay in ${place.city}?`, a: `${place.lodging} ${place.arrival}` },
          {
            q: "When can an international patient fly home?",
            a: `There is no universal flight date. ${profile.recovery} The treating team must document travel fitness.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and campus, diagnostic versus therapeutic assumptions, devices, imaging, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createGiArticle(profile: GiProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Evaluation, Procedure & Recovery`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, diagnostic versus therapeutic scope, monitoring, risks and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, technique, hospital and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} Selection among ${approachNames} depends on anatomy, disease extent and the treating team's assessment, not on a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, endoscopy or procedure-room time, stated imaging, routine medicines and the listed hospital stay, while extra stents, clips, pathology or another procedure depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Emergency treatment, a therapeutic add-on or a different device can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified gastroenterology team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, diagnostic versus therapeutic plan and monitoring assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different stent, extra polyp or a combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and nutrition support visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different lesions, ducts, devices or monitoring. Compare professional fees, endoscopy-unit time, imaging, devices, observation nights, medicines, exclusions and emergency terms.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches to ${profile.procedure}`,
      intro: [
        `${profile.technique} The options below are clinical strategies, not consumer upgrades.`,
        `A named ${profile.specialist} should explain which route fits the individual's anatomy and condition, and what finding could change or cancel it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from anatomy, diagnosis, risk and follow-up needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Is ${profile.procedure} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, profile.limits],
      who: [
        profile.candidacy,
        "Suitability depends on individual assessment by a qualified gastroenterologist and, where relevant, hepatology, interventional radiology or a multidisciplinary team. This page cannot diagnose a reader or recommend a personal procedure.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, allergy, infection, airway or aspiration risk and any bowel-prep or fasting plan before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report fever, bleeding, jaundice, severe pain or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Diet, hydration and activity limits are stated. Written instructions take priority over generic travel advice.",
        profile.risks,
        `${profile.followUp} Seek urgent help for ${profile.urgent}; use the treating team's emergency thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "clinical-limits",
        heading: `What ${profile.procedure} can and cannot address`,
        paragraphs: [
          profile.limits,
          "A consultation should separate the intended target — oesophagus, stomach, small bowel, colon, bile duct, pancreas, liver or another named structure — from other GI disease that may still need medicines, surgery or another endoscopic procedure.",
          "No page can promise complete diagnosis, cure, weight change, stone clearance or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, prior endoscopy, anticoagulation, infection, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for emergency access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure time, hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms diet, bleeding risk, device stability and travel fitness.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, nutrition support and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, medicines and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, diagnostic versus therapeutic scope, devices, imaging, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, blood tests, imaging or endoscopy only when clinically indicated before final consent." },
        { label: "Procedure and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the procedure report, pathology and device details where relevant.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, anatomy, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this procedure cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, device, imaging, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned procedure", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe oral intake, symptom control and device or diet instructions.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Gastroenterology notes and any available endoscopy, colonoscopy, ERCP, CT, MRI, MRCP or ultrasound reports",
      "Previous GI procedure notes, pathology and stent or device records",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, diagnostic versus therapeutic scope, devices, imaging, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, devices, emergency timing, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic gastroenterology entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, hospital endoscopy units and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, emergency bleeding or pancreatitis backup, device traceability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable GI bleeding, untreated jaundice, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical, endoscopic or surgical options were discussed?`,
      "How were my symptoms, imaging, endoscopy reports and previous procedures assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the procedure occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, blood tests, imaging and endoscopy are included?",
      "Are specialist, endoscopy-unit, sedation or anaesthesia and recovery-room fees included?",
      "Is this a diagnostic procedure only, or are therapeutic interventions assumed?",
      "Which stents, clips, balloons, sutures or other devices are assumed?",
      "Are manufacturer and model details provided where a device is used?",
      "Would an extra polyp, stone, stent or a different procedure change the quotation?",
      "How many ward or observation nights and which room category are included?",
      "How are extra nights, bleeding, pancreatitis, another procedure or a complication billed?",
      "Which discharge medicines and dietary instructions are included?",
      "Is pathology or biopsy charging included if tissue is taken?",
      "When can I fly, eat, work or resume other activity?",
      "Which follow-up visits, stent reviews or dietitian reviews are included?",
      "How are complications handled after I leave India?",
      "When and by whom will fitness to fly be assessed?",
      "What procedure report, images and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my clinician after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, therapeutic add-ons, devices, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is gastroenterology treatment in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, devices, imaging, monitoring and follow-up.",
      },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: profile.technique },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Actual timing depends on anatomy, findings during the case and the clinical course.`,
      },
      { q: "How long is the hospital stay?", a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed flight day. ${profile.recovery} The treating team must document travel fitness.`,
      },
      {
        q: "Which Indian cities offer this procedure?",
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant gastroenterology ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews pathology, diet, stents or symptoms.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and gastroenterology centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general gastroenterology or accreditation label does not establish current case acceptance, device stock, emergency backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/gastroenterology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/gastroenterology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/gastroenterology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named gastroenterology consultation, records review and procedure-focused examination when explicitly listed." },
  { label: "Procedure episode", detail: "Specialist, endoscopy or procedure-room time, standard equipment and recovery-room care within the written scope." },
  { label: "Imaging and tests", detail: "Stated blood tests and listed ultrasound, CT, MRI, MRCP or endoscopy only; unlisted advanced imaging is extra." },
  { label: "Routine aftercare", detail: "Standard medicines, observation and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, procedure report and pathology or device details where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "An additional polyp, stone, stent, biopsy series or a different procedure found after arrival." },
  { label: "Complications", detail: "Unplanned tests, emergency treatment, repeat endoscopy, prolonged stay or readmission unless expressly covered." },
  { label: "Premium devices", detail: "A different stent, clip, balloon, suturing system or drainage device from the one written in the estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, nutrition support, remote review or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: GiProfile[] = [
  {
    procedure: "Upper GI Endoscopy (Gastroscopy)",
    shortName: "upper GI endoscopy",
    specialist: "gastroenterologist or endoscopist",
    definition:
      "Upper GI endoscopy uses a flexible camera passed through the mouth to examine the oesophagus, stomach and first part of the small intestine and may allow biopsy or selected treatment.",
    candidacy:
      "It may be considered for persistent upper-abdominal symptoms, suspected ulcer, reflux-related evaluation, bleeding, anaemia, swallowing difficulty or abnormal imaging after a clinician reviews the history.",
    limits:
      "Gastroscopy sees the upper tract only. It does not examine the colon, does not treat every source of anaemia and is not a promise that every symptom will have a visible cause.",
    evaluation:
      "Assessment includes history, medicines that affect bleeding, and whether biopsy, CLO testing or a therapeutic add-on is already planned. Fasting instructions come from the treating team.",
    technique:
      "After fasting and sedation or local throat spray as advised, the endoscope is passed through the mouth. The lining is inspected; biopsies or simple treatments are added only if planned or newly indicated.",
    approaches: [
      { label: "Diagnostic gastroscopy", detail: "Inspection with or without biopsy when the question is mucosal disease." },
      { label: "Gastroscopy with biopsy", detail: "Tissue sampling for histology or infection testing; pathology may be billed separately." },
      { label: "Therapeutic upper GI endoscopy", detail: "Dilation, hemostasis or stenting is a different episode if not written in the diagnostic estimate." },
    ],
    duration: "Often 10–30 minutes of procedure time, longer if treatment is added",
    admission: "Usually day-care after sedation; bleeding, perforation concern or a therapeutic add-on can extend stay.",
    recovery:
      "Throat discomfort, bloating and sedation drowsiness are common early. Flying requires review of bleeding, diet and the team's activity advice.",
    risks:
      "Risks include bleeding, perforation, aspiration, sedation-related complications, sore throat, missed lesions and need for another procedure.",
    urgent: "vomiting blood, black stools, severe chest or abdominal pain, fever or breathing difficulty",
    drivers: [
      { label: "Diagnostic versus therapeutic work", detail: "A look-and-biopsy list is not a dilation or bleeding list." },
      { label: "Sedation or anaesthesia", detail: "Anaesthetist-supported lists change facility charges." },
      { label: "Number of biopsies", detail: "Pathology is often a separate line." },
      { label: "Barrett or surveillance protocol", detail: "Mapped biopsies take more time." },
      { label: "Same-day colonoscopy", detail: "A combined list is a different invoice if not quoted." },
    ],
    inclusions: [...commonInclusions, { label: "Listed upper-tract inspection", detail: "Only the stated diagnostic or named therapeutic work." }],
    exclusions: commonExclusions,
    records: ["Prior gastroscopy reports", "Ulcer or reflux notes", "Blood-count and iron studies if anaemia is the indication"],
    followUp: "Follow-up reviews symptoms, histology and whether medicines or another procedure are needed.",
    quoteQuestions: ["Is biopsy or CLO testing included?", "Is this diagnostic only?", "Is same-day colonoscopy assumed?"],
    related: ["Colonoscopy", "Endoscopic Hemostasis", "Foreign Body Removal"],
    imageAlts: [
      "Medical illustration of the oesophagus, stomach and duodenum examined during upper GI endoscopy",
      "Clinical diagram of a flexible endoscope passing through the mouth into the stomach",
      "Upper GI endoscopy recovery pathway showing sedation observation, diet restart and travel clearance",
    ],
  },
  {
    procedure: "Colonoscopy",
    shortName: "colonoscopy",
    specialist: "gastroenterologist or colonoscopist",
    definition:
      "Colonoscopy is an endoscopic procedure used to examine the lining of the large intestine and, when appropriate, diagnose or treat conditions such as polyps, bleeding or other bowel abnormalities.",
    candidacy:
      "It may be considered for screening, rectal bleeding, change in bowel habit, anaemia, inflammatory-bowel assessment or follow-up of known polyps after a clinician reviews the indication and preparation risk.",
    limits:
      "Colonoscopy examines the colon and usually the terminal ileum. It does not replace small-bowel capsule or CT when those organs are the question, and a poor prep can hide disease.",
    evaluation:
      "Assessment includes indication, anticoagulation, bowel-prep plan, comorbidities and whether polypectomy is already expected. Quality of previous prep matters if this is a repeat examination.",
    technique:
      "After bowel preparation and sedation as advised, a flexible colonoscope is advanced through the rectum to inspect the colon. Polyps may be removed and biopsies taken when indicated.",
    approaches: [
      { label: "Diagnostic colonoscopy", detail: "Inspection with or without biopsy when no polyp treatment is planned." },
      { label: "Therapeutic colonoscopy with polypectomy", detail: "Number, size and location of polyps change time, devices and bleeding risk." },
      { label: "Advanced lesion removal", detail: "EMR or ESD for a large colonic lesion is a different CMS procedure if that is the honest plan." },
    ],
    duration: "Often 20–60 minutes depending on prep, anatomy and polypectomy",
    admission: "Usually day-care; large polypectomy, bleeding or incomplete recovery from sedation can extend stay.",
    recovery:
      "Bloating, gas and sedation drowsiness are common. After polypectomy, delayed bleeding can occur days later. Flying requires review of bleeding risk and the team's diet advice.",
    risks:
      "Risks include bleeding, perforation, post-polypectomy bleeding, abdominal pain, sedation-related complications, incomplete examination and missed lesions.",
    urgent: "heavy rectal bleeding, severe abdominal pain, fever, dizziness or inability to pass gas after a therapeutic list",
    drivers: [
      { label: "Diagnostic versus therapeutic colonoscopy", detail: "Polypectomy is not automatically inside a screening quote." },
      { label: "Number, size and location of polyps", detail: "Right-sided or large lesions take more time and clips." },
      { label: "Bowel-preparation quality", detail: "A repeat prep or incomplete study changes the episode." },
      { label: "Sedation or anaesthesia", detail: "Propofol lists differ from moderate sedation." },
      { label: "Pathology charges", detail: "Each specimen may be billed separately." },
    ],
    inclusions: [...commonInclusions, { label: "Listed colonic inspection", detail: "Only the stated diagnostic or named polypectomy work." }],
    exclusions: commonExclusions,
    records: ["Prior colonoscopy and pathology", "Bowel-habit notes", "Anticoagulant list", "Screening or IBD indication"],
    followUp: "Follow-up reviews histology, surveillance interval and whether another procedure is needed.",
    quoteQuestions: ["Is polypectomy included?", "How many pathology specimens are assumed?", "What happens if prep is inadequate?"],
    related: ["Endoscopic Mucosal Resection (EMR)", "Endoscopic Submucosal Dissection (ESD)", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of the colon and rectum showing a polyp on the mucosal lining",
      "Clinical diagram of a colonoscope advancing through the large intestine toward a polyp",
      "Colonoscopy recovery pathway showing bowel prep, sedation observation, bleeding watch and travel clearance",
    ],
  },
  {
    procedure: "ERCP",
    shortName: "ERCP",
    specialist: "interventional gastroenterologist or pancreaticobiliary endoscopist",
    definition:
      "ERCP combines endoscopy and X-ray imaging to diagnose and treat selected problems involving the bile ducts and pancreatic duct, including certain stones and blockages.",
    candidacy:
      "It may be considered when imaging suggests bile-duct stones, a stricture, a leak or selected pancreatic-duct disease and a clinician judges that endoscopic access is appropriate.",
    limits:
      "ERCP is not a first-line look at the stomach or colon. Diagnostic-only ERCP is uncommon once MRCP or EUS can answer the question. It is not a substitute for surgery when anatomy cannot be reached.",
    evaluation:
      "Assessment includes liver tests, ultrasound, MRCP or CT, coagulation, and whether sphincterotomy, stone extraction or stenting is already expected.",
    technique:
      "Under sedation or anaesthesia, a side-viewing endoscope reaches the duodenal papilla. The duct is cannulated, contrast is injected and planned therapy — sphincterotomy, stone removal or stenting — is performed when indicated.",
    approaches: [
      { label: "Therapeutic ERCP for stones", detail: "Sphincterotomy and extraction when choledocholithiasis is the indication." },
      { label: "ERCP with biliary stenting", detail: "Plastic or metal stents for obstruction; the stent itself may be a separate line." },
      { label: "Pancreatic-duct ERCP", detail: "Selected leaks or strictures; pancreatitis risk and device choice differ from biliary work." },
    ],
    duration: "Often 30–90 minutes depending on anatomy and interventions",
    admission: "Day-care to 2 nights is stored; pancreatitis, cholangitis or incomplete drainage can extend stay.",
    recovery:
      "Observation for pancreatitis, bleeding and infection is typical. Flying requires stable liver tests or a documented drainage plan and the team's advice.",
    risks:
      "Risks include pancreatitis, bleeding, infection or cholangitis, perforation, stent blockage or migration, failed cannulation and need for PTBD or surgery.",
    urgent: "severe abdominal pain, vomiting, fever, jaundice, black stools or dizziness after ERCP",
    drivers: [
      { label: "Bile-duct versus pancreatic-duct work", detail: "Different risk and device profiles." },
      { label: "Stone burden and lithotripsy", detail: "Large or multiple stones take more time." },
      { label: "Stent type", detail: "Plastic versus metal should be named." },
      { label: "Altered anatomy or prior ERCP", detail: "Revision or Roux anatomy is a different sitting." },
      { label: "Observation and pancreatitis care", detail: "Extra nights are often outside a day-care quote." },
    ],
    inclusions: [...commonInclusions, { label: "Listed ductal intervention", detail: "Only the stated cannulation and named therapy." }],
    exclusions: commonExclusions,
    records: ["MRCP, CT or ultrasound", "Liver-function tests", "Prior ERCP reports", "Stent cards if previously placed"],
    followUp: "Follow-up reviews symptoms, liver tests, stent plan and whether another ERCP or PTBD is needed.",
    quoteQuestions: ["Is sphincterotomy included?", "Which stent is assumed?", "How many observation nights are included?"],
    related: ["Bile Duct Stone Removal", "Biliary Stenting", "Cholangioscopy"],
    imageAlts: [
      "Medical illustration of the bile duct, gallbladder and pancreatic duct meeting at the duodenal papilla",
      "Clinical diagram of a side-viewing endoscope cannulating the bile duct during ERCP",
      "ERCP recovery pathway showing pancreatitis watch, liver-test review and travel clearance",
    ],
  },
  {
    procedure: "Endoscopic Ultrasound (EUS)",
    shortName: "endoscopic ultrasound",
    specialist: "advanced endoscopist or EUS specialist",
    definition:
      "Endoscopic ultrasound uses an echoendoscope to image the gut wall and adjacent organs such as the pancreas and bile duct from inside the digestive tract and may allow guided sampling.",
    candidacy:
      "It may be considered to stage a lesion, evaluate a pancreatic or biliary abnormality, or obtain tissue when cross-sectional imaging has already framed the question.",
    limits:
      "EUS is not a replacement for colonoscopy or routine gastroscopy. Therapeutic EUS drainage is a different sitting if not written. A negative sample does not always exclude disease.",
    evaluation:
      "Assessment includes prior CT or MRI, coagulation, and whether fine-needle aspiration or biopsy is planned. Sedation needs are reviewed.",
    technique:
      "An echoendoscope is passed like an upper endoscope. Ultrasound images guide inspection and, when indicated, a needle samples a lymph node, pancreas or other target.",
    approaches: [
      { label: "Diagnostic EUS", detail: "Imaging without sampling when anatomy or staging is the question." },
      { label: "EUS-guided FNA or FNB", detail: "Needle sampling; pathology and on-site cytology may be extra." },
      { label: "Therapeutic EUS", detail: "Drainage or other intervention is not assumed in a diagnostic quote." },
    ],
    duration: "Often 20–60 minutes depending on sampling",
    admission: "Usually day-care; pancreatitis after pancreatic sampling or a therapeutic add-on can extend stay.",
    recovery:
      "Sore throat and sedation drowsiness are common. After pancreatic sampling, pain and pancreatitis watch apply. Flying requires the team's review.",
    risks:
      "Risks include bleeding, infection, pancreatitis where the pancreas is sampled, perforation, sedation-related complications and inconclusive tissue.",
    urgent: "severe abdominal pain, vomiting, fever, black stools or breathing difficulty",
    drivers: [
      { label: "Diagnostic versus sampling EUS", detail: "Needles and pathology change the bill." },
      { label: "Target location", detail: "Pancreatic-head versus mediastinal work uses different time." },
      { label: "Number of passes", detail: "Repeat sampling is not always included." },
      { label: "Sedation", detail: "Longer therapeutic lists may need anaesthesia support." },
      { label: "Same-session ERCP", detail: "A combined list is a different quotation." },
    ],
    inclusions: [...commonInclusions, { label: "Listed EUS imaging", detail: "Only the stated diagnostic or named sampling work." }],
    exclusions: commonExclusions,
    records: ["CT or MRI of the lesion", "Prior endoscopy", "Coagulation tests", "Oncology notes if staging is the indication"],
    followUp: "Follow-up reviews histology, staging discussion and whether ERCP, surgery or surveillance follows.",
    quoteQuestions: ["Is FNA or FNB included?", "Is on-site cytology assumed?", "Is same-session ERCP quoted?"],
    related: ["ERCP", "Endoscopic Mucosal Resection (EMR)", "Liver Biopsy"],
    imageAlts: [
      "Medical illustration of the stomach wall and pancreas as imaged from inside the gut during EUS",
      "Clinical diagram of an echoendoscope and needle sampling a pancreatic lesion",
      "EUS recovery pathway showing sedation observation, pancreatitis watch and pathology review",
    ],
  },
  {
    procedure: "Capsule Endoscopy",
    shortName: "capsule endoscopy",
    specialist: "gastroenterologist experienced in small-bowel capsule studies",
    definition:
      "Capsule endoscopy uses a swallowable camera to photograph the small-bowel lining when bleeding or other disease is suspected after standard endoscopy has already been considered.",
    candidacy:
      "It may be considered for obscure gastrointestinal bleeding, suspected small-bowel Crohn's disease or selected iron-deficiency anaemia after gastroscopy and colonoscopy have been honest.",
    limits:
      "The capsule cannot take biopsies or treat bleeding. Retention is a recognised risk when strictures exist. It is not a substitute for enteroscopy when therapy is already needed.",
    evaluation:
      "Assessment includes prior endoscopy, imaging for stricture risk, and whether a patency capsule is required before the diagnostic capsule is swallowed.",
    technique:
      "The patient swallows the capsule after preparation as advised. Images are recorded over several hours and later read. The capsule is usually passed in stool.",
    approaches: [
      { label: "Small-bowel capsule", detail: "The usual study after negative bidirectional endoscopy." },
      { label: "Patency capsule first", detail: "Used when stricture risk is material; this is an extra episode if not listed." },
      { label: "Colon capsule", detail: "A different study if the colon is the target; confirm the written name." },
    ],
    duration: "Swallowing is brief; recording often lasts 8 hours or more while the reader later interprets images",
    admission: "Usually outpatient; retention or incomplete transit may need further care.",
    recovery:
      "Most people resume activity after the recording period. Travel should wait until the team confirms transit or a retrieval plan if the capsule is retained.",
    risks:
      "Risks include capsule retention, incomplete small-bowel views, aspiration in selected patients, missed lesions and need for enteroscopy or surgery.",
    urgent: "persistent vomiting, severe abdominal pain or failure to pass the capsule when instructed to report it",
    drivers: [
      { label: "Patency testing", detail: "A stricture work-up is not inside every swallow quote." },
      { label: "Reader time and software", detail: "Interpretation is a professional line." },
      { label: "Incomplete study", detail: "Repeat capsules or enteroscopy are extra." },
      { label: "Preparation", detail: "Bowel prep quality affects completeness." },
      { label: "Subsequent enteroscopy", detail: "Therapy is a different CMS procedure." },
    ],
    inclusions: [...commonInclusions, { label: "Listed capsule study", detail: "Only the stated swallowable-camera study and report." }],
    exclusions: commonExclusions,
    records: ["Gastroscopy and colonoscopy reports", "Imaging for stricture risk", "Bleeding or anaemia work-up"],
    followUp: "Follow-up reviews the capsule report and whether enteroscopy, medicines or surgery follow.",
    quoteQuestions: ["Is a patency capsule included?", "Who reads the study?", "What happens if the capsule is retained?"],
    related: ["Enteroscopy", "Colonoscopy", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of the small intestine and a swallowable camera capsule moving through the lumen",
      "Clinical diagram of capsule endoscopy recording images of the small-bowel lining",
      "Capsule endoscopy pathway showing swallow, recording period, transit check and report review",
    ],
  },
  {
    procedure: "Enteroscopy",
    shortName: "enteroscopy",
    specialist: "gastroenterologist experienced in deep small-bowel endoscopy",
    definition:
      "Enteroscopy uses a specialised endoscope, often with a balloon or overtube, to reach farther into the small intestine than a standard gastroscopy when a target has already been identified.",
    candidacy:
      "It may be considered when capsule endoscopy or imaging has named a small-bowel bleeding site, polyp or stricture that may need biopsy or treatment.",
    limits:
      "Enteroscopy is not a first screening test. Complete small-bowel intubation is not guaranteed. It is not the same CMS procedure as capsule endoscopy.",
    evaluation:
      "Assessment includes capsule or CT/MR enterography, coagulation and whether tattoo, dilation or hemostasis is already planned.",
    technique:
      "Under sedation or anaesthesia, a balloon or spiral enteroscope is advanced from the mouth or the colon. The named segment is inspected and treated if indicated.",
    approaches: [
      { label: "Antegrade balloon enteroscopy", detail: "From the mouth when the target is proximal." },
      { label: "Retrograde enteroscopy", detail: "From the colon when the target is distal." },
      { label: "Therapeutic enteroscopy", detail: "Hemostasis, polypectomy or dilation should be named." },
    ],
    duration: "Often 60–180 minutes depending on depth and therapy",
    admission: "Day-care to overnight; perforation concern or long anaesthesia can extend stay.",
    recovery:
      "Bloating and sore throat are common. After therapy, bleeding and perforation watch apply. Flying requires the team's review.",
    risks:
      "Risks include perforation, bleeding, pancreatitis in selected antegrade cases, sedation-related complications, incomplete reach and need for surgery.",
    urgent: "severe abdominal pain, vomiting, fever, bleeding or dizziness",
    drivers: [
      { label: "Route and depth", detail: "Antegrade versus retrograde lists differ." },
      { label: "Therapeutic add-ons", detail: "Clips, dilation or polypectomy change consumables." },
      { label: "Anaesthesia time", detail: "Long lists need more recovery." },
      { label: "Prior surgery", detail: "Adhesions can limit progress." },
      { label: "Need for a second sitting", detail: "Incomplete reach is not a failed package refund unless written." },
    ],
    inclusions: [...commonInclusions, { label: "Listed small-bowel intubation", detail: "Only the stated route and named therapy." }],
    exclusions: commonExclusions,
    records: ["Capsule or enterography reports", "Prior endoscopy", "Bleeding notes"],
    followUp: "Follow-up reviews whether the target was reached, histology and further therapy.",
    quoteQuestions: ["Is this antegrade or retrograde?", "Is therapy included?", "What if the target cannot be reached?"],
    related: ["Capsule Endoscopy", "Endoscopic Hemostasis", "Endoscopic Mucosal Resection (EMR)"],
    imageAlts: [
      "Medical illustration of the jejunum and ileum beyond the reach of a standard endoscope",
      "Clinical diagram of a balloon enteroscope advancing through the small bowel",
      "Enteroscopy recovery pathway showing observation, bleeding watch and travel clearance",
    ],
  },
  {
    procedure: "Biliary Stenting",
    shortName: "biliary stenting",
    specialist: "interventional gastroenterologist",
    definition:
      "Biliary stenting places a plastic or metal tube through an endoscope, usually during ERCP, to drain a blocked bile duct caused by stone, stricture or selected tumours.",
    candidacy:
      "It may be considered when jaundice, cholangitis or a planned operation requires duct drainage and imaging has already shown obstruction.",
    limits:
      "Stenting relieves selected obstruction; it does not remove every stone or treat the underlying cancer. PTBD is a different CMS procedure when ERCP cannot reach the duct. Plastic and metal stents are not interchangeable quotes.",
    evaluation:
      "Assessment includes bilirubin, imaging, coagulation and whether a plastic bridge or a metal stent is the honest plan.",
    technique:
      "During ERCP, the duct is cannulated and a guidewire is placed. The chosen stent is deployed across the stricture or after stone work. Cholangioscopy is not assumed.",
    approaches: [
      { label: "Plastic biliary stent", detail: "Often temporary; exchange timing should be written." },
      { label: "Self-expanding metal stent", detail: "Used in selected unresectable or long-term plans; device cost dominates." },
      { label: "EUS-guided biliary drainage", detail: "A rescue route when ERCP fails; not inside a standard stent quote." },
    ],
    duration: "Often 30–90 minutes as part of a therapeutic ERCP",
    admission: "Usually 1–3 nights while jaundice and infection are watched.",
    recovery:
      "Itching and jaundice may improve over days if drainage works. Flying requires improving liver tests or a documented plan and the team's advice.",
    risks:
      "Risks include pancreatitis, cholangitis, stent blockage or migration, bleeding, perforation and need for repeat ERCP or PTBD.",
    urgent: "fever, worsening jaundice, severe pain or vomiting after stenting",
    drivers: [
      { label: "Plastic versus metal stent", detail: "Device cost and exchange plan differ." },
      { label: "Hilar versus distal obstruction", detail: "Multiple stents may be needed." },
      { label: "Infection at presentation", detail: "Cholangitis extends stay." },
      { label: "Failed ERCP rescue", detail: "PTBD is a separate sheet." },
      { label: "Stent-exchange calendar", detail: "Later ERCPs are extra unless written." },
    ],
    inclusions: [...commonInclusions, { label: "Named stent", detail: "Only the stated plastic or metal device." }],
    exclusions: commonExclusions,
    records: ["MRCP or CT", "Bilirubin trend", "Prior ERCP and stent type"],
    followUp: "Follow-up reviews drainage, stent-exchange timing and oncology or stone-clearance plans.",
    quoteQuestions: ["Plastic or metal?", "How many stents?", "Is exchange included?"],
    related: ["ERCP", "Bile Duct Stone Removal", "PTBD (Percutaneous Transhepatic Biliary Drainage)"],
    imageAlts: [
      "Medical illustration of a narrowed bile duct causing backup of bile toward the liver",
      "Clinical diagram of a plastic or metal stent crossing a biliary stricture",
      "Biliary-stenting recovery pathway showing jaundice review, infection watch and exchange planning",
    ],
  },
  {
    procedure: "Bile Duct Stone Removal",
    shortName: "bile duct stone removal",
    specialist: "interventional gastroenterologist",
    definition:
      "Bile duct stone removal uses ERCP techniques — sphincterotomy, balloon or basket extraction and sometimes lithotripsy — to clear stones from the common bile duct.",
    candidacy:
      "It may be considered when ultrasound, MRCP or blood tests show choledocholithiasis, especially with pain, jaundice or cholangitis, after a clinician confirms the duct is the problem.",
    limits:
      "This page is not a gallbladder-removal quote. Stones left in the gallbladder may still need cholecystectomy. Very large or intrahepatic stones may need cholangioscopy or surgery.",
    evaluation:
      "Assessment includes LFTs, imaging and whether the gallbladder is still in situ. Anticoagulation and cholangitis status change timing.",
    technique:
      "After cannulation, a sphincterotomy is often performed. Stones are extracted with a balloon or basket; mechanical lithotripsy is added when needed. A temporary stent may be left if clearance is incomplete.",
    approaches: [
      { label: "Balloon or basket extraction", detail: "Used for many ductal stones after sphincterotomy." },
      { label: "Mechanical lithotripsy", detail: "For larger stones; extra time and devices." },
      { label: "Cholangioscopy-assisted lithotripsy", detail: "A different CMS procedure when direct vision is required." },
    ],
    duration: "Often 30–90 minutes depending on stone burden",
    admission: "Day-care to 2 nights; cholangitis or incomplete clearance extends stay.",
    recovery:
      "Observation for pancreatitis and infection is typical. Flying requires documented clearance or a stent plan and the team's advice.",
    risks:
      "Risks include pancreatitis, bleeding, cholangitis, perforation, retained stones, sphincterotomy complications and need for repeat ERCP.",
    urgent: "fever, severe pain, jaundice, vomiting or black stools",
    drivers: [
      { label: "Stone number and size", detail: "Lithotripsy changes time." },
      { label: "Cholangitis", detail: "Urgent drainage can precede complete clearance." },
      { label: "Temporary stent", detail: "Incomplete sitting needs another list." },
      { label: "Gallbladder still present", detail: "Cholecystectomy is a surgical quote." },
      { label: "Altered anatomy", detail: "Prior bypass makes access harder." },
    ],
    inclusions: [...commonInclusions, { label: "Listed extraction attempt", detail: "Only the stated ERCP stone work." }],
    exclusions: commonExclusions,
    records: ["Ultrasound or MRCP", "Liver tests", "Gallbladder status"],
    followUp: "Follow-up reviews residual stones, stent removal and surgical referral if the gallbladder remains.",
    quoteQuestions: ["Is complete clearance assumed?", "Is a temporary stent included?", "Is cholecystectomy part of this letter?"],
    related: ["ERCP", "Cholangioscopy", "Biliary Stenting"],
    imageAlts: [
      "Medical illustration of gallstones in the common bile duct below the liver and gallbladder",
      "Clinical diagram of balloon extraction of a bile-duct stone after sphincterotomy",
      "Bile-duct stone-removal recovery pathway showing pancreatitis watch, clearance imaging and travel advice",
    ],
  },
  {
    procedure: "Cholangioscopy",
    shortName: "cholangioscopy",
    specialist: "advanced pancreaticobiliary endoscopist",
    definition:
      "Cholangioscopy uses a miniature camera passed through an ERCP endoscope to look directly inside the bile duct when fluoroscopy is not enough to manage stones or evaluate a stricture.",
    candidacy:
      "It may be considered for difficult ductal stones, indeterminate strictures or selected targeted biopsies after standard ERCP imaging has already been reviewed.",
    limits:
      "Cholangioscopy is not a first ERCP. It does not replace surgery for every complex stone. SpyGlass-class systems are not assumed in a basic ERCP quote.",
    evaluation:
      "Assessment includes prior ERCP, stone or stricture imaging and whether electrohydraulic or laser lithotripsy is planned.",
    technique:
      "After biliary access, the cholangioscope is advanced into the duct. Stones can be fragmented under vision and tissue sampled from a stricture.",
    approaches: [
      { label: "Cholangioscopy for difficult stones", detail: "Direct-vision lithotripsy when baskets fail." },
      { label: "Cholangioscopy-guided biopsy", detail: "Indeterminate stricture sampling." },
      { label: "Mapping before surgery", detail: "Selected preoperative assessment; not a resection quote." },
    ],
    duration: "Often 45–120 minutes as an advanced ERCP add-on",
    admission: "Day-care to 2 nights depending on lithotripsy and infection risk.",
    recovery:
      "Similar to ERCP, with extra attention to cholangitis after instrumentation. Flying requires the team's drainage and infection advice.",
    risks:
      "Risks include pancreatitis, cholangitis, bleeding, perforation, unsuccessful lithotripsy and need for PTBD or surgery.",
    urgent: "fever, jaundice, severe pain or vomiting",
    drivers: [
      { label: "Single-operator system cost", detail: "The cholangioscope is a major extra if not listed." },
      { label: "Lithotripsy energy", detail: "Laser versus electrohydraulic devices differ." },
      { label: "Biopsy and pathology", detail: "Stricture work adds histology." },
      { label: "Prior failed ERCP", detail: "Revision lists take longer." },
      { label: "Rescue PTBD", detail: "A different specialty sheet if endoscopy fails." },
    ],
    inclusions: [...commonInclusions, { label: "Listed cholangioscopy", detail: "Only the stated direct-vision duct work." }],
    exclusions: commonExclusions,
    records: ["Prior ERCP cholangiograms", "MRCP", "Stone or stricture notes"],
    followUp: "Follow-up reviews clearance, histology and further ERCP or surgery.",
    quoteQuestions: ["Is the cholangioscope included?", "Is lithotripsy assumed?", "What if stones remain?"],
    related: ["ERCP", "Bile Duct Stone Removal", "Biliary Stenting"],
    imageAlts: [
      "Medical illustration of a cholangioscope inside the bile duct looking at a stone or stricture",
      "Clinical diagram of direct-vision lithotripsy of a difficult bile-duct stone",
      "Cholangioscopy recovery pathway showing infection watch, clearance review and travel clearance",
    ],
  },
  {
    procedure: "Peroral Endoscopic Myotomy (POEM)",
    shortName: "POEM",
    specialist: "third-space endoscopist experienced in achalasia myotomy",
    definition:
      "POEM is an endoscopic myotomy that creates a submucosal tunnel in the oesophagus to cut selected muscle fibres for achalasia or related motility disorders after manometry has confirmed the diagnosis.",
    candidacy:
      "It may be considered for confirmed achalasia when timed barium, endoscopy and high-resolution manometry agree and a clinician discusses Heller myotomy and dilation as alternatives.",
    limits:
      "POEM is not a fundoplication and does not treat every cause of dysphagia. Reflux can occur after myotomy. G-POEM and Z-POEM are different CMS procedures.",
    evaluation:
      "Assessment includes esophageal manometry, timed barium swallow, endoscopy to exclude pseudoachalasia and a discussion of reflux risk.",
    technique:
      "Under anaesthesia, a mucosal incision is made, a submucosal tunnel is created and a planned length of circular muscle is cut. The incision is then closed with clips.",
    approaches: [
      { label: "Anterior POEM", detail: "A common tunnel orientation for type I or II achalasia." },
      { label: "Posterior POEM", detail: "Selected when prior myotomy or anatomy suggests it." },
      { label: "Longer myotomy for type III", detail: "Spastic achalasia may need a longer cut; this is not a different package name for a better result." },
    ],
    duration: "Often 1–3 hours depending on myotomy length",
    admission: "Usually 2–4 nights with a leak check before diet advancement.",
    recovery:
      "Chest discomfort and a staged diet are typical. Flying requires a documented swallow check and the team's reflux and diet advice.",
    risks:
      "Risks include leak or perforation, bleeding, infection, pneumothorax or pneumoperitoneum, reflux, incomplete symptom relief and need for further treatment.",
    urgent: "fever, severe chest pain, vomiting, subcutaneous emphysema or breathing difficulty",
    drivers: [
      { label: "Achalasia subtype and myotomy length", detail: "Type III work takes longer." },
      { label: "Prior dilation or Heller", detail: "Revision tunnels are harder." },
      { label: "Leak study and stay", detail: "Contrast swallow nights should be listed." },
      { label: "Clip closure and devices", detail: "Tunnel equipment is not a diagnostic gastroscopy." },
      { label: "Reflux medicines after", detail: "Long-term PPI is often extra." },
    ],
    inclusions: [...commonInclusions, { label: "Listed oesophageal myotomy", detail: "Only the stated POEM tunnel and closure." }],
    exclusions: commonExclusions,
    records: ["High-resolution manometry", "Timed barium swallow", "Prior dilation or Heller notes"],
    followUp: "Follow-up reviews swallowing, reflux and whether dilation or surgery is later considered.",
    quoteQuestions: ["Is a leak study included?", "How many inpatient nights?", "Is this distinct from G-POEM?"],
    related: ["Esophageal Manometry", "G-POEM", "Z-POEM"],
    imageAlts: [
      "Medical illustration of a tight lower oesophageal sphincter typical of achalasia",
      "Clinical diagram of a submucosal tunnel and circular-muscle myotomy during POEM",
      "POEM recovery pathway showing leak check, staged diet and travel clearance",
    ],
  },
  {
    procedure: "G-POEM",
    shortName: "G-POEM",
    specialist: "third-space endoscopist experienced in pyloromyotomy",
    definition:
      "G-POEM (gastric peroral endoscopic myotomy) is an endoscopic pyloromyotomy that opens the pyloric muscle in selected people with gastroparesis after emptying studies have been reviewed.",
    candidacy:
      "It may be considered when documented delayed gastric emptying persists despite medical therapy and a clinician has discussed jejunal feeding, gastric stimulators or surgery as alternatives.",
    limits:
      "G-POEM is not a weight-loss operation and not oesophageal POEM. It does not guarantee that nausea will resolve. Bariatric / Metabolic Endoscopy is a different CMS name.",
    evaluation:
      "Assessment includes gastric-emptying scintigraphy or equivalent, endoscopy to exclude obstruction and a medicine review.",
    technique:
      "A gastric submucosal tunnel is created toward the pylorus and a planned pyloric myotomy is performed, then closed.",
    approaches: [
      { label: "Pyloromyotomy for idiopathic gastroparesis", detail: "Selected after failed medicines." },
      { label: "Pyloromyotomy after diabetes-related delay", detail: "Glycaemic and nutrition plans remain separate." },
      { label: "Rescue after other pyloric therapy", detail: "Prior Botox or surgery changes difficulty." },
    ],
    duration: "Often 1–2.5 hours",
    admission: "Usually 2–4 nights with a diet-advancement plan.",
    recovery:
      "Nausea can persist while emptying adapts. Flying requires hydration, diet tolerance and the team's advice.",
    risks:
      "Risks include leak, bleeding, infection, incomplete emptying improvement, dumping-like symptoms and need for further nutrition support.",
    urgent: "vomiting that prevents fluids, fever, severe pain or abdominal distension",
    drivers: [
      { label: "Severity of emptying delay", detail: "Nutrition support may be extra." },
      { label: "Diabetes control", detail: "Not part of the endoscopic quote." },
      { label: "Prior pyloric therapy", detail: "Revision work is harder." },
      { label: "Stay and dietitian review", detail: "Should be itemized." },
      { label: "Need for feeding access", detail: "A different episode if required." },
    ],
    inclusions: [...commonInclusions, { label: "Listed pyloric myotomy", detail: "Only the stated G-POEM." }],
    exclusions: commonExclusions,
    records: ["Gastric-emptying study", "Endoscopy excluding mechanical obstruction", "Diabetes and nutrition notes"],
    followUp: "Follow-up reviews symptoms, emptying if repeated and nutrition.",
    quoteQuestions: ["Is dietitian follow-up included?", "Is this distinct from oesophageal POEM?", "How many nights are included?"],
    related: ["Peroral Endoscopic Myotomy (POEM)", "Bariatric / Metabolic Endoscopy", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of the stomach and a narrowed pylorus delaying emptying",
      "Clinical diagram of an endoscopic pyloric myotomy performed through a gastric tunnel during G-POEM",
      "G-POEM recovery pathway showing diet advancement, hydration review and travel clearance",
    ],
  },
  {
    procedure: "Z-POEM",
    shortName: "Z-POEM",
    specialist: "third-space endoscopist experienced in Zenker myotomy",
    definition:
      "Z-POEM is a tunnelled endoscopic myotomy for a Zenker diverticulum, cutting the cricopharyngeal bar through a submucosal tunnel rather than an open neck operation.",
    candidacy:
      "It may be considered for a symptomatic Zenker pouch with dysphagia or aspiration after a swallow study confirms the anatomy.",
    limits:
      "Z-POEM is not oesophageal achalasia POEM. Recurrence can occur. Open or rigid endoscopic diverticulotomy may still be appropriate in some anatomy.",
    evaluation:
      "Assessment includes swallow study or endoscopy of the pouch and a discussion of aspiration risk and alternatives.",
    technique:
      "A mucosal incision is made, a tunnel reaches the cricopharyngeal muscle and a planned myotomy is performed, then closed.",
    approaches: [
      { label: "Tunnelled Z-POEM", detail: "Used when anatomy allows a safe submucosal approach." },
      { label: "Flexible endoscopic septotomy", detail: "A different technique some teams use; confirm the written name." },
      { label: "Open or rigid surgery", detail: "Still considered for selected large or recurrent pouches." },
    ],
    duration: "Often 45–120 minutes",
    admission: "Usually 2–4 nights with a leak or swallow check.",
    recovery:
      "A staged diet and aspiration precautions are typical. Flying requires a documented swallow plan.",
    risks:
      "Risks include leak, mediastinitis, bleeding, recurrence of the pouch, incomplete symptom relief and anaesthesia-related complications.",
    urgent: "fever, neck swelling, chest pain, breathing difficulty or inability to swallow saliva",
    drivers: [
      { label: "Pouch size", detail: "Larger bars take more time." },
      { label: "Prior Zenker treatment", detail: "Revision risk is higher." },
      { label: "Swallow-study nights", detail: "Should be listed." },
      { label: "Airway risk", detail: "Aspiration history changes monitoring." },
      { label: "Alternative open surgery", detail: "A different quote if chosen." },
    ],
    inclusions: [...commonInclusions, { label: "Listed Zenker myotomy", detail: "Only the stated Z-POEM." }],
    exclusions: commonExclusions,
    records: ["Swallow study", "Endoscopy of the pouch", "Aspiration history"],
    followUp: "Follow-up reviews swallowing and whether residual bar needs further treatment.",
    quoteQuestions: ["Is a contrast swallow included?", "Is this distinct from achalasia POEM?", "What is the leak plan?"],
    related: ["Peroral Endoscopic Myotomy (POEM)", "Esophageal Manometry", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of a Zenker diverticulum pouch behind the cricopharyngeal bar",
      "Clinical diagram of a submucosal tunnel approaching the Zenker septum during Z-POEM",
      "Z-POEM recovery pathway showing swallow check, staged diet and travel clearance",
    ],
  },
  {
    procedure: "Endoscopic Mucosal Resection (EMR)",
    shortName: "EMR",
    specialist: "advanced endoscopist experienced in mucosal resection",
    definition:
      "EMR lifts a selected mucosal lesion on a fluid cushion and removes it with a snare, aiming for complete endoscopic resection when invasion depth allows.",
    candidacy:
      "It may be considered for a polyp or early mucosal lesion in the oesophagus, stomach, duodenum or colon after optical assessment and, where needed, staging.",
    limits:
      "EMR is not ESD. Piecemeal resection can leave residual tissue. Deep invasion needs surgery or another pathway. STER treats selected submucosal tumours, not typical mucosal polyps.",
    evaluation:
      "Assessment includes the index endoscopy, photos, biopsy if already taken and whether MRI or EUS is needed before lifting.",
    technique:
      "The lesion is lifted and snared, sometimes in pieces. Clips may close the defect. Specimens go to pathology.",
    approaches: [
      { label: "Cap or injection-assisted EMR", detail: "Common for many colonic and gastric mucosal lesions." },
      { label: "Piecemeal EMR", detail: "Used when en-bloc snare is not feasible; recurrence surveillance matters." },
      { label: "Conversion to ESD or surgery", detail: "If lift fails or invasion is suspected; that is a different quote." },
    ],
    duration: "Often 20–90 minutes depending on size and site",
    admission: "Day-care to overnight; large gastric or duodenal EMR may need longer observation.",
    recovery:
      "Bleeding can be delayed. Diet and activity limits depend on site. Flying requires a documented bleeding plan.",
    risks:
      "Risks include bleeding, delayed bleeding, perforation, incomplete resection, stricture in selected oesophageal cases and need for further treatment.",
    urgent: "vomiting blood, black stools, severe pain, fever or dizziness",
    drivers: [
      { label: "Lesion size and site", detail: "Right colon, duodenum and oesophagus differ." },
      { label: "Piecemeal versus en-bloc", detail: "Time and recurrence follow-up change." },
      { label: "Clips and devices", detail: "Should be listed." },
      { label: "Pathology", detail: "Margins and invasion decide next care." },
      { label: "Overnight watch", detail: "Not inside every day-care letter." },
    ],
    inclusions: [...commonInclusions, { label: "Listed mucosal resection", detail: "Only the stated lesion and site." }],
    exclusions: commonExclusions,
    records: ["Index endoscopy photos", "Prior biopsy", "Staging imaging if already done"],
    followUp: "Follow-up reviews histology, scar check and whether ESD or surgery is later needed.",
    quoteQuestions: ["Which lesion and site?", "Is piecemeal EMR assumed?", "Are clips included?"],
    related: ["Endoscopic Submucosal Dissection (ESD)", "Colonoscopy", "STER (Submucosal Tunneling Endoscopic Resection)"],
    imageAlts: [
      "Medical illustration of a mucosal lesion sitting on the inner GI wall layers",
      "Clinical diagram of fluid lift and snare removal of a mucosal lesion during EMR",
      "EMR recovery pathway showing bleeding watch, pathology review and travel clearance",
    ],
  },
  {
    procedure: "Endoscopic Submucosal Dissection (ESD)",
    shortName: "ESD",
    specialist: "advanced endoscopist experienced in submucosal dissection",
    definition:
      "ESD dissects a selected early GI neoplasm from the submucosa with an endoscopic knife, aiming for an en-bloc specimen when depth and margins are judged suitable.",
    candidacy:
      "It may be considered for an early oesophageal, gastric, colonic or rectal lesion after optical diagnosis and staging suggest endoscopic cure is possible.",
    limits:
      "ESD is not EMR and not surgical gastrectomy or colectomy. Deeper invasion, poor lift or high-risk histology can convert the plan. Outcomes are not guaranteed.",
    evaluation:
      "Assessment includes detailed endoscopy, biopsy strategy, and EUS or cross-sectional imaging when depth is uncertain.",
    technique:
      "After marking and injection, the mucosa is incised and the submucosa dissected so the lesion comes out in one piece when feasible. The defect is inspected and sometimes closed.",
    approaches: [
      { label: "Gastric ESD", detail: "Common for selected early gastric neoplasia." },
      { label: "Colorectal ESD", detail: "Used for large laterally spreading lesions when EMR is not the honest first option." },
      { label: "Oesophageal ESD", detail: "Stricture risk after circumferential work should be discussed." },
    ],
    duration: "Often 1–4 hours depending on size and fibrosis",
    admission: "Usually 1–3 nights with bleeding and perforation observation.",
    recovery:
      "Diet is advanced after a stable night. Flying requires a quiet defect and the team's bleeding advice.",
    risks:
      "Risks include bleeding, delayed bleeding, perforation, stricture, incomplete or non-curative resection and need for surgery.",
    urgent: "bleeding, severe pain, fever, abdominal rigidity or dizziness",
    drivers: [
      { label: "Lesion size and fibrosis", detail: "Prior biopsy or tattoo can slow dissection." },
      { label: "Organ site", detail: "Oesophagus, stomach and colon have different device and stay profiles." },
      { label: "Closure devices", detail: "Clips or suturing should be named." },
      { label: "Inpatient nights", detail: "ESD is rarely a true screening-day quote." },
      { label: "Non-curative histology", detail: "Surgery afterwards is a different episode." },
    ],
    inclusions: [...commonInclusions, { label: "Listed en-bloc dissection", detail: "Only the stated ESD lesion." }],
    exclusions: commonExclusions,
    records: ["High-quality endoscopy photos", "Histology", "EUS or staging scans if done"],
    followUp: "Follow-up reviews curative criteria, scar check and oncology referral if needed.",
    quoteQuestions: ["Which organ and lesion size?", "How many nights?", "What if histology is non-curative?"],
    related: ["Endoscopic Mucosal Resection (EMR)", "STER (Submucosal Tunneling Endoscopic Resection)", "Colonoscopy"],
    imageAlts: [
      "Medical illustration of GI wall layers showing a mucosal neoplasm planned for en-bloc ESD",
      "Clinical diagram of endoscopic knife dissection in the submucosa during ESD",
      "ESD recovery pathway showing inpatient observation, pathology review and travel clearance",
    ],
  },
  {
    procedure: "STER (Submucosal Tunneling Endoscopic Resection)",
    shortName: "STER",
    specialist: "third-space endoscopist experienced in submucosal tumour resection",
    definition:
      "STER removes a selected submucosal tumour through an endoscopic tunnel, aiming to extract the lesion while preserving the gut lining when size and location allow.",
    candidacy:
      "It may be considered for a small oesophageal or gastric submucosal tumour, such as a selected GIST or leiomyoma, after EUS characterises the lesion.",
    limits:
      "STER is not ESD of a mucosal cancer and not surgical wedge resection. Large, irregular or high-risk tumours may need surgery. Complete oncologic staging is not implied.",
    evaluation:
      "Assessment includes EUS, cross-sectional imaging when needed and a discussion of surgical alternatives.",
    technique:
      "A tunnel is created, the lesion is dissected from the muscularis and extracted, then the entry is closed.",
    approaches: [
      { label: "Oesophageal STER", detail: "Used for selected intramural lesions." },
      { label: "Gastric STER", detail: "Location on the wall changes difficulty." },
      { label: "Conversion to surgery", detail: "If the lesion cannot be safely tunnelled." },
    ],
    duration: "Often 1–3 hours",
    admission: "Usually 2–4 nights with a leak check.",
    recovery:
      "Chest or abdominal discomfort and a staged diet are typical. Flying requires a documented closure plan.",
    risks:
      "Risks include leak, bleeding, infection, incomplete resection, recurrence and need for surgery.",
    urgent: "fever, severe pain, vomiting, subcutaneous emphysema or bleeding",
    drivers: [
      { label: "Lesion size and layer", detail: "Muscularis propria lesions are harder." },
      { label: "Site", detail: "GEJ versus gastric body differ." },
      { label: "Closure method", detail: "Clips or suturing should be listed." },
      { label: "Pathology type", detail: "Further oncology care is extra." },
      { label: "Surgical backup", detail: "Same-day theatre access may be priced separately." },
    ],
    inclusions: [...commonInclusions, { label: "Listed tunnelled resection", detail: "Only the stated STER lesion." }],
    exclusions: commonExclusions,
    records: ["EUS report", "Prior endoscopy", "Cross-sectional imaging if done"],
    followUp: "Follow-up reviews histology, leak status and surveillance.",
    quoteQuestions: ["What size and site?", "Is surgical backup included?", "How many nights?"],
    related: ["Endoscopic Submucosal Dissection (ESD)", "Endoscopic Ultrasound (EUS)", "Peroral Endoscopic Myotomy (POEM)"],
    imageAlts: [
      "Medical illustration of a submucosal tumour in the oesophageal or gastric wall",
      "Clinical diagram of a submucosal tunnel used to dissect and extract the lesion during STER",
      "STER recovery pathway showing leak watch, diet advancement and pathology review",
    ],
  },
  {
    procedure: "Endoscopic Hemostasis",
    shortName: "endoscopic hemostasis",
    specialist: "gastroenterologist experienced in GI-bleeding endoscopy",
    definition:
      "Endoscopic hemostasis treats selected gastrointestinal bleeding using injection, thermal therapy, clips or other endoscopic tools after the bleeding site is identified.",
    candidacy:
      "It may be considered when vomiting blood, black stools or a falling haemoglobin points to an accessible GI source and resuscitation has started.",
    limits:
      "This is not variceal band ligation, which is a separate CMS procedure. Massive bleeding may need radiology or surgery. A first look may not stop every vessel.",
    evaluation:
      "Assessment includes haemodynamics, transfusion need, anticoagulation and whether the source is likely upper or lower tract.",
    technique:
      "After resuscitation, endoscopy locates the lesion. Injection, coagulation, clips or spray are applied as anatomy allows. A second look may be needed.",
    approaches: [
      { label: "Injection and thermal therapy", detail: "Used for many ulcers." },
      { label: "Mechanical clipping", detail: "For visible vessels or post-polypectomy bleeding." },
      { label: "Combination therapy", detail: "More than one method is common; each device should be listed." },
    ],
    duration: "Often 20–60 minutes after resuscitation; timing is clinical, not elective tourism",
    admission: "Overnight to 3 nights is stored; shock or rebleeding extends ICU stay.",
    recovery:
      "Monitoring for rebleeding and a staged diet follow. Flying is unsafe until the team documents stability and haemoglobin trend.",
    risks:
      "Risks include rebleeding, perforation, aspiration, sedation complications, incomplete control and need for embolisation or surgery.",
    urgent: "recurrent vomiting of blood, collapse, severe pain or fever",
    drivers: [
      { label: "Urgency and resuscitation", detail: "ICU and blood products dominate many invoices." },
      { label: "Source and devices", detail: "Clips, probes and spray are extras if not listed." },
      { label: "Second-look endoscopy", detail: "Often a separate sitting." },
      { label: "Anticoagulation reversal", detail: "Medicines and delay change cost." },
      { label: "Rescue radiology or surgery", detail: "Different teams and quotes." },
    ],
    inclusions: [...commonInclusions, { label: "Listed hemostatic attempt", detail: "Only the stated endoscopic methods." }],
    exclusions: commonExclusions,
    records: ["Admission notes", "Haemoglobin trend", "Prior ulcer or endoscopy reports", "Anticoagulant list"],
    followUp: "Follow-up reviews rebleeding risk, ulcer medicines and whether elective therapy is needed.",
    quoteQuestions: ["Is ICU included?", "Are clips and blood products included?", "Is a second look assumed?"],
    related: ["Variceal Band Ligation", "Upper GI Endoscopy (Gastroscopy)", "Colonoscopy"],
    imageAlts: [
      "Medical illustration of an ulcer with a visible vessel in the stomach lining",
      "Clinical diagram of endoscopic clipping or thermal treatment of a bleeding point",
      "Hemostasis recovery pathway showing resuscitation, rebleeding watch and travel delay until stability",
    ],
  },
  {
    procedure: "Variceal Band Ligation",
    shortName: "variceal band ligation",
    specialist: "gastroenterologist or hepatologist experienced in portal-hypertension endoscopy",
    definition:
      "Variceal band ligation places elastic bands on oesophageal varices to reduce bleeding risk in portal hypertension after the varices have been seen at endoscopy.",
    candidacy:
      "It may be considered for acute variceal bleeding or for surveillance banding when large oesophageal varices are documented and a clinician has discussed beta-blockers.",
    limits:
      "Banding does not treat the underlying liver disease. Gastric varices often need a different method. It is not the same CMS procedure as generic endoscopic hemostasis.",
    evaluation:
      "Assessment includes liver-disease severity, haemoglobin, coagulation and whether this is an emergency or elective banding session.",
    technique:
      "A banding device is fitted to the endoscope. Varix columns are sucked and banded. Several sessions are often required.",
    approaches: [
      { label: "Emergency banding for bleeding", detail: "After resuscitation; ICU is often extra." },
      { label: "Elective eradication sessions", detail: "Repeated lists until varices flatten; each session may be billed." },
      { label: "Combined medical therapy", detail: "Beta-blockers and liver-disease care are not the banding quote." },
    ],
    duration: "Often 15–40 minutes per session",
    admission: "Overnight to 2 nights; acute bleed admissions are longer.",
    recovery:
      "Chest discomfort and dietary caution are common. Flying after an acute bleed requires documented stability, not a package date.",
    risks:
      "Risks include post-banding ulcer bleeding, chest pain, perforation, aspiration, incomplete eradication and recurrent variceal bleed.",
    urgent: "vomiting blood, black stools, collapse or fever",
    drivers: [
      { label: "Emergency versus elective session", detail: "Bleed admissions include resuscitation." },
      { label: "Number of sessions", detail: "Eradication is rarely one sitting." },
      { label: "Banding devices", detail: "Should be listed per session." },
      { label: "ICU and transfusion", detail: "Often excluded from a day-care figure." },
      { label: "Underlying liver care", detail: "Transplant or TIPS evaluation is another pathway." },
    ],
    inclusions: [...commonInclusions, { label: "Listed banding session", detail: "Only the stated oesophageal banding list." }],
    exclusions: commonExclusions,
    records: ["Prior endoscopy of varices", "Liver-function and platelet counts", "Bleed history"],
    followUp: "Follow-up schedules further banding and hepatology care.",
    quoteQuestions: ["Is this emergency or elective?", "How many sessions are assumed?", "Are transfusions included?"],
    related: ["Endoscopic Hemostasis", "Liver Biopsy", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of oesophageal varices in a patient with portal hypertension",
      "Clinical diagram of elastic bands placed on oesophageal variceal columns during ligation",
      "Variceal banding recovery pathway showing bleed watch, session planning and hepatology follow-up",
    ],
  },
  {
    procedure: "Foreign Body Removal",
    shortName: "foreign body removal",
    specialist: "gastroenterologist with airway-aware endoscopy support",
    definition:
      "Endoscopic foreign body removal retrieves a swallowed object from the oesophagus or stomach when timing and anatomy make endoscopy the appropriate tool.",
    candidacy:
      "It may be considered for impaction, sharp objects, batteries or objects that have not passed, after imaging and airway risk are reviewed.",
    limits:
      "Not every object can be retrieved safely. Some need surgery. This is not a diagnostic gastroscopy package. Food bolus without a foreign object may still need dilation of a stricture afterwards.",
    evaluation:
      "Assessment includes what was swallowed, time since ingestion, radiographs and whether anaesthesia and airway protection are required.",
    technique:
      "Under appropriate sedation or anaesthesia, retrieval devices such as snares, graspers or overtubes are used. An airway plan is established first.",
    approaches: [
      { label: "Oesophageal food-bolus relief", detail: "May reveal a stricture that later needs dilation." },
      { label: "Sharp or battery retrieval", detail: "Urgency and overtube use change risk." },
      { label: "Failed endoscopic retrieval", detail: "Surgery is a different quote." },
    ],
    duration: "Often 15–60 minutes depending on the object",
    admission: "Day-care to overnight; perforation concern or late presentation extends stay.",
    recovery:
      "Throat discomfort is common. Flying requires exclusion of perforation and the team's advice.",
    risks:
      "Risks include perforation, bleeding, aspiration, mucosal injury, failed retrieval and need for surgery.",
    urgent: "chest pain, fever, vomiting, neck swelling or breathing difficulty",
    drivers: [
      { label: "Object type and timing", detail: "Batteries and sharp objects are emergencies." },
      { label: "Airway anaesthesia", detail: "Often required and should be listed." },
      { label: "Overtube and retrieval devices", detail: "Consumables vary." },
      { label: "Associated stricture", detail: "Later dilation is extra." },
      { label: "Surgical rescue", detail: "A different team and quote." },
    ],
    inclusions: [...commonInclusions, { label: "Listed retrieval attempt", detail: "Only the stated endoscopic removal." }],
    exclusions: commonExclusions,
    records: ["Description of the object", "Radiographs", "Time since ingestion"],
    followUp: "Follow-up reviews mucosal injury and whether a stricture needs later treatment.",
    quoteQuestions: ["Is anaesthesia included?", "What if retrieval fails?", "Is dilation of a stricture included?"],
    related: ["Upper GI Endoscopy (Gastroscopy)", "Endoscopic Hemostasis", "Esophageal Manometry"],
    imageAlts: [
      "Medical illustration of a swallowed foreign object lodged in the oesophageal lumen",
      "Clinical diagram of endoscopic graspers retrieving a foreign body through an overtube",
      "Foreign-body recovery pathway showing airway observation, perforation watch and travel clearance",
    ],
  },
  {
    procedure: "Liver Biopsy",
    shortName: "liver biopsy",
    specialist: "hepatologist or gastroenterologist experienced in percutaneous liver sampling",
    definition:
      "Percutaneous liver biopsy uses a needle through the skin to obtain a core of liver tissue when blood tests and imaging have not fully explained liver disease.",
    candidacy:
      "It may be considered for unexplained enzyme abnormalities, staging of selected chronic liver diseases or characterisation of a lesion after clotting and imaging allow a percutaneous route.",
    limits:
      "This is not a transjugular biopsy. Sampling error can occur. It does not treat the liver disease. Focal lesions may need a targeted or image-guided approach that should be named.",
    evaluation:
      "Assessment includes coagulation, platelet count, ultrasound of the puncture path and whether a transjugular route is safer because of ascites or coagulopathy.",
    technique:
      "After local anaesthetic and imaging guidance as planned, a core needle obtains tissue. Observation follows for bleeding.",
    approaches: [
      { label: "Ultrasound-guided percutaneous core", detail: "The usual route when clotting is acceptable." },
      { label: "Targeted lesion biopsy", detail: "A different sitting if a mass is the question." },
      { label: "Transjugular route instead", detail: "A different CMS procedure when percutaneous biopsy is unsafe." },
    ],
    duration: "Often 15–30 minutes of sampling time after consent and marking",
    admission: "Day-care to overnight observation for bleeding.",
    recovery:
      "Right-shoulder or site pain can occur. Flying requires a stable haemoglobin plan and the team's bleeding advice.",
    risks:
      "Risks include bleeding, bile leak, infection, pain, inadequate sample and, rarely, injury to nearby organs.",
    urgent: "increasing abdominal pain, dizziness, fever, shortness of breath or a rapidly expanding bruise",
    drivers: [
      { label: "Image guidance", detail: "Ultrasound or CT time should be listed." },
      { label: "Coagulation correction", detail: "Products are extra." },
      { label: "Observation hours", detail: "Overnight stay is not always in a day-care figure." },
      { label: "Pathology stains", detail: "Special stains and copper or iron studies may be extra." },
      { label: "Need to convert to transjugular", detail: "A different sheet." },
    ],
    inclusions: [...commonInclusions, { label: "Listed percutaneous core", detail: "Only the stated percutaneous sample." }],
    exclusions: commonExclusions,
    records: ["Liver-function tests", "Coagulation and platelets", "Ultrasound or elastography", "Medication list"],
    followUp: "Follow-up reviews histology and the hepatology treatment plan.",
    quoteQuestions: ["Is ultrasound guidance included?", "How long is observation?", "Are special stains included?"],
    related: ["Transjugular Liver Biopsy", "Variceal Band Ligation", "Endoscopic Ultrasound (EUS)"],
    imageAlts: [
      "Medical illustration of the liver under the ribs and a planned percutaneous biopsy path",
      "Clinical diagram of an ultrasound-guided needle obtaining a liver core",
      "Liver-biopsy recovery pathway showing observation for bleeding, pathology review and travel clearance",
    ],
  },
  {
    procedure: "Transjugular Liver Biopsy",
    shortName: "transjugular liver biopsy",
    specialist: "interventional hepatologist or radiologist working with the GI team",
    definition:
      "Transjugular liver biopsy samples the liver through a hepatic vein from the neck when a percutaneous needle is considered unsafe because of coagulopathy, ascites or selected anatomy.",
    candidacy:
      "It may be considered when histology is still needed and percutaneous biopsy risk is high, sometimes with hepatic-vein pressure measurements in the same sitting.",
    limits:
      "This is not a percutaneous liver biopsy and not a TIPS procedure. Pressure studies are extra if not written. Sample quality can differ from a percutaneous core.",
    evaluation:
      "Assessment includes coagulation, ascites imaging, and whether pressure gradients are requested.",
    technique:
      "Under imaging, a jugular vein is accessed, a catheter reaches a hepatic vein and a needle obtains tissue from within the vein. Pressures may be recorded.",
    approaches: [
      { label: "Transjugular biopsy alone", detail: "Tissue without pressure studies." },
      { label: "Biopsy plus hepatic-vein pressures", detail: "Portal-hypertension work; should be named." },
      { label: "Conversion or additional percutaneous sample", detail: "Only if later judged necessary." },
    ],
    duration: "Often 45–90 minutes",
    admission: "Overnight to 2 nights for puncture-site and bleeding watch.",
    recovery:
      "Neck discomfort and bed rest instructions are typical. Flying requires a stable puncture site and the team's advice.",
    risks:
      "Risks include neck haematoma, arrhythmia, capsular puncture, bleeding, infection, inadequate sample and contrast-related reactions.",
    urgent: "neck swelling, breathing difficulty, chest pain, dizziness or fever",
    drivers: [
      { label: "Pressure studies", detail: "A major extra if not listed." },
      { label: "IR suite time", detail: "Not an endoscopy-room charge." },
      { label: "Coagulopathy support", detail: "Products change the bill." },
      { label: "Sample adequacy", detail: "Repeat sitting is extra." },
      { label: "Stay", detail: "Overnight observation should be written." },
    ],
    inclusions: [...commonInclusions, { label: "Listed transjugular sample", detail: "Only the stated venous-route biopsy." }],
    exclusions: commonExclusions,
    records: ["Coagulation", "Ascites imaging", "Indication for histology versus pressures"],
    followUp: "Follow-up reviews histology, pressures if measured and hepatology care.",
    quoteQuestions: ["Are pressure studies included?", "Who performs the puncture?", "How many nights?"],
    related: ["Liver Biopsy", "Variceal Band Ligation", "PTBD (Percutaneous Transhepatic Biliary Drainage)"],
    imageAlts: [
      "Medical illustration of jugular access leading through the heart toward a hepatic vein",
      "Clinical diagram of a transjugular needle sampling liver tissue from inside a hepatic vein",
      "Transjugular-biopsy recovery pathway showing neck-site care, pressure-study review and travel clearance",
    ],
  },
  {
    procedure: "PTBD (Percutaneous Transhepatic Biliary Drainage)",
    shortName: "PTBD",
    specialist: "interventional radiologist working with the gastroenterology team",
    definition:
      "PTBD is an image-guided drain placed through the liver into a blocked bile duct when ERCP cannot reach or adequately drain the obstruction.",
    candidacy:
      "It may be considered for jaundice or cholangitis after failed or impossible ERCP, or as planned drainage for selected hilar or postoperative anatomy.",
    limits:
      "PTBD is not ERCP and not a surgical bypass. External bags, internal-external catheters and later stent internalisation are different stages. Infection and tube dislodgement can occur.",
    evaluation:
      "Assessment includes bilirubin, prior ERCP attempts, CT or MRCP of the level of block and coagulation.",
    technique:
      "Under ultrasound and fluoroscopy, a needle enters a bile duct through the liver. A wire and drain are placed to an external bag or internalised when possible.",
    approaches: [
      { label: "External biliary drain", detail: "Bile drains to a bag; nursing education is required." },
      { label: "Internal-external catheter", detail: "A longer tube that also crosses into the bowel." },
      { label: "Later internalization or rendezvous", detail: "A second sitting with ERCP may follow; extra unless written." },
    ],
    duration: "Often 60–120 minutes in an interventional suite",
    admission: "Usually 2–5 nights while jaundice and infection are watched.",
    recovery:
      "Drain care, output recording and infection watch dominate. Flying with an external bag requires a documented nursing plan and the team's advice.",
    risks:
      "Risks include bleeding, bile leak, infection, tube blockage or dislodgement, pneumothorax in rare access routes and need for repeat drainage or surgery.",
    urgent: "fever, drain falling out, sudden bleeding around the tube, increasing jaundice or severe pain",
    drivers: [
      { label: "Left versus right duct access", detail: "Hilar disease may need more than one drain." },
      { label: "External versus internalised system", detail: "Device and nursing differ." },
      { label: "Cholangitis at presentation", detail: "ICU and antibiotics extend stay." },
      { label: "Rendezvous ERCP later", detail: "A separate gastroenterology sitting." },
      { label: "Tube changes", detail: "Later IR visits are extra." },
    ],
    inclusions: [...commonInclusions, { label: "Listed percutaneous drain", detail: "Only the stated PTBD access and catheter." }],
    exclusions: commonExclusions,
    records: ["Failed or impossible ERCP notes", "MRCP or CT", "Bilirubin trend"],
    followUp: "Follow-up reviews drain care, internalization plans and oncology or stone treatment.",
    quoteQuestions: ["External or internal-external?", "Is a later rendezvous included?", "Who teaches drain care?"],
    related: ["ERCP", "Biliary Stenting", "Transjugular Liver Biopsy"],
    imageAlts: [
      "Medical illustration of a blocked bile duct inside the liver requiring percutaneous drainage",
      "Clinical diagram of a needle and drain passing through the liver into a bile duct",
      "PTBD recovery pathway showing drain-bag care, infection watch and internalization planning",
    ],
  },
  {
    procedure: "Esophageal Manometry",
    shortName: "esophageal manometry",
    specialist: "gastroenterologist or motility specialist who reads high-resolution studies",
    definition:
      "Esophageal manometry measures pressure patterns in the oesophagus to classify swallowing disorders such as achalasia before dilation, POEM or anti-reflux decisions.",
    candidacy:
      "It may be considered for dysphagia, non-cardiac chest pain or pre-operative assessment when endoscopy has not fully explained symptoms.",
    limits:
      "Manometry does not treat the disorder. A printout without a named reader is not a Chicago-classification diagnosis. It is not pH-impedance testing unless that study is separately written.",
    evaluation:
      "Assessment includes prior endoscopy, medicines that affect motility and whether pH testing is also requested.",
    technique:
      "A thin catheter is passed through the nose into the oesophagus. The patient swallows measured sips while sensors record pressures. The study is later interpreted.",
    approaches: [
      { label: "High-resolution manometry", detail: "The usual modern study." },
      { label: "Manometry plus pH or impedance", detail: "A different add-on if reflux quantification is needed." },
      { label: "Repeat study after treatment", detail: "Not inside the first diagnostic quote." },
    ],
    duration: "Often 20–40 minutes in the motility lab",
    admission: "Outpatient.",
    recovery:
      "Nasal discomfort is brief. Travel is usually unrestricted unless another procedure is combined the same week.",
    risks:
      "Risks include nasal or throat discomfort, gagging, uncommon epistaxis and an uninterpretable study if the catheter cannot be placed.",
    urgent: "uncontrolled nosebleed or severe chest pain after the catheter is removed — uncommon and should be reported",
    drivers: [
      { label: "Named reader", detail: "Interpretation is the product." },
      { label: "pH-impedance add-on", detail: "A separate line." },
      { label: "Failed intubation", detail: "Repeat sitting may be extra." },
      { label: "Same-week POEM planning", detail: "The myotomy is a different sheet." },
      { label: "Anaesthesia", detail: "Rarely needed and should be listed if used." },
    ],
    inclusions: [...commonInclusions, { label: "Listed motility study", detail: "Only the stated manometry and report." }],
    exclusions: commonExclusions,
    records: ["Prior gastroscopy", "Swallow symptoms", "Medicines affecting motility"],
    followUp: "Follow-up reviews the classification and whether POEM, dilation or medical care follows.",
    quoteQuestions: ["Who interprets the study?", "Is pH testing included?", "Is this bundled with POEM?"],
    related: ["Peroral Endoscopic Myotomy (POEM)", "Anorectal Manometry", "Upper GI Endoscopy (Gastroscopy)"],
    imageAlts: [
      "Medical illustration of the oesophagus and lower oesophageal sphincter where pressures are recorded",
      "Clinical diagram of a nasal manometry catheter sensing swallow pressures",
      "Esophageal-manometry pathway showing catheter placement, swallow protocol and report review",
    ],
  },
  {
    procedure: "Anorectal Manometry",
    shortName: "anorectal manometry",
    specialist: "gastroenterologist or motility specialist experienced in pelvic-floor testing",
    definition:
      "Anorectal manometry measures pressures and sensation in the rectum and anal canal to evaluate incontinence, constipation or pre-operative pelvic-floor questions.",
    candidacy:
      "It may be considered when faecal incontinence, outlet obstruction or selected pre-surgical planning needs objective sphincter and sensation data.",
    limits:
      "The test does not treat incontinence. Biofeedback is a separate programme. It is not a colonoscopy and not oesophageal manometry.",
    evaluation:
      "Assessment includes bowel-habit history, prior anorectal examination and whether balloon expulsion or endoanal ultrasound is also requested.",
    technique:
      "A thin catheter is placed in the anal canal. The patient follows squeeze, rest and push instructions. Sensation thresholds may be recorded.",
    approaches: [
      { label: "Standard anorectal manometry", detail: "Pressures and sensation." },
      { label: "Manometry plus balloon expulsion", detail: "Outlet-obstruction work; should be named." },
      { label: "Later biofeedback", detail: "Therapy is not the diagnostic quote." },
    ],
    duration: "Often 20–40 minutes",
    admission: "Outpatient.",
    recovery:
      "Mild rectal awareness can follow. Travel is usually unrestricted.",
    risks:
      "Risks include discomfort, uncommon bleeding in fragile mucosa and an incomplete study if the patient cannot follow manoeuvres.",
    urgent: "significant rectal bleeding after the test",
    drivers: [
      { label: "Add-on tests", detail: "Balloon expulsion or ultrasound change the bill." },
      { label: "Named interpreter", detail: "The report is the product." },
      { label: "Biofeedback programme", detail: "Extra sessions." },
      { label: "Combined colonoscopy", detail: "A different procedure if planned." },
      { label: "Paediatric versus adult protocol", detail: "Confirm the written pathway." },
    ],
    inclusions: [...commonInclusions, { label: "Listed anorectal study", detail: "Only the stated manometry and report." }],
    exclusions: commonExclusions,
    records: ["Bowel-habit diary or notes", "Prior anorectal examination", "Obstetric or surgical history if relevant"],
    followUp: "Follow-up reviews whether biofeedback, medicines or surgery is discussed.",
    quoteQuestions: ["Is balloon expulsion included?", "Who reads the study?", "Is biofeedback included?"],
    related: ["Esophageal Manometry", "Colonoscopy", "Endoscopic Mucosal Resection (EMR)"],
    imageAlts: [
      "Medical illustration of the rectum and anal sphincter complex assessed during anorectal manometry",
      "Clinical diagram of a catheter recording rest, squeeze and push pressures",
      "Anorectal-manometry pathway showing the study, report review and optional biofeedback planning",
    ],
  },
  {
    procedure: "Bariatric / Metabolic Endoscopy",
    shortName: "bariatric or metabolic endoscopy",
    specialist: "gastroenterologist experienced in endoscopic weight-loss procedures",
    definition:
      "Bariatric / metabolic endoscopy is an umbrella name for endoscopic weight-loss or metabolic work — such as selected gastric suturing or balloons — when a surgical bypass is not the first plan.",
    candidacy:
      "It may be considered after BMI, comorbidity and prior bariatric treatment are reviewed and a clinician discusses surgical alternatives, diet and follow-up commitment.",
    limits:
      "This CMS name is not the Bariatric Surgery sheet for Endoscopic Sleeve Gastroplasty (ESG) or Gastric Balloon. Those named surgical-bariatric pathways keep their own articles. Weight change is not promised.",
    evaluation:
      "Assessment includes BMI history, endoscopy to exclude ulcer or large hiatus hernia, nutrition review and whether a named device or suturing system is proposed.",
    technique:
      "Under anaesthesia, the chosen endoscopic method reduces gastric volume or places a space-occupying device. The exact technique must be written; this page does not invent a single device.",
    approaches: [
      { label: "Endoscopic suturing or volume-reduction methods", detail: "When a gastroplasty-class technique is proposed; confirm it is not billed as the separate ESG surgical-bariatric slug." },
      { label: "Intragastric balloon methods", detail: "When a balloon is proposed; confirm it is not billed as the separate Gastric Balloon bariatric slug." },
      { label: "Other listed metabolic endoscopy", detail: "Only a method named in the estimate." },
    ],
    duration: "Often 30–90 minutes depending on the named method",
    admission: "Day-care to 2 nights for nausea and hydration watch.",
    recovery:
      "Nausea, cramping and a staged liquid diet are common. Flying requires hydration, diet tolerance and the team's advice.",
    risks:
      "Risks include bleeding, perforation, dehydration, nausea, device migration or early removal, incomplete weight change and need for further intervention.",
    urgent: "vomiting that prevents fluids, severe pain, fever, black stools or chest pain",
    drivers: [
      { label: "Named device or suturing system", detail: "The technology line dominates." },
      { label: "BMI and comorbidity work-up", detail: "Cardiology or sleep studies may be extra." },
      { label: "Dietitian follow-up", detail: "Programmes last months and are often excluded." },
      { label: "Device removal later", detail: "Balloons need a second sitting." },
      { label: "Conversion to surgery", detail: "A different specialty sheet." },
    ],
    inclusions: [...commonInclusions, { label: "Named endoscopic method", detail: "Only the device or suturing plan written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Weight and comorbidity history", "Prior bariatric or endoscopic notes", "Nutrition assessment"],
    followUp: "Follow-up is nutritional and device-specific; removal or further therapy is planned separately.",
    quoteQuestions: ["Which named method is this?", "Is this the ESG or balloon bariatric-surgery sheet?", "Is dietitian follow-up included?"],
    related: ["G-POEM", "Upper GI Endoscopy (Gastroscopy)", "Peroral Endoscopic Myotomy (POEM)"],
    imageAlts: [
      "Medical illustration of the stomach showing volume-reduction or space-occupying endoscopic concepts",
      "Clinical diagram of endoscopic suturing or balloon placement without naming a guaranteed result",
      "Metabolic-endoscopy recovery pathway showing staged diet, hydration watch and programme follow-up",
    ],
  },
];

export const gastroenterologyArticles = profiles.map(createGiArticle);

export const gastroenterologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  gastroenterologyArticles.map((article) => [article.slug, article]),
);
