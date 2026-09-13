import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { NEUROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_NEUROLOGY = ["Deep Brain Stimulation", "Stroke Thrombectomy"] as const;

type ExclusiveNeurology = Exclude<
  (typeof NEUROLOGY_PROCEDURES)[number],
  (typeof SHARED_NEUROLOGY)[number]
>;

type NeurologyProfile = {
  procedure: ExclusiveNeurology;
  shortName: string;
  specialist: string;
  definition: string;
  candidacy: string;
  distinction: string;
  evaluation: string;
  technique: string;
  approaches: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  records: string[];
  followUp: string;
  quoteQuestions: string[];
  related: ExclusiveNeurology[];
  campusFocus: string;
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
      "Delhi, Gurugram, Noida and Faridabad are separate clinical corridors. Confirm the exact campus because a cross-NCR transfer during seizures, weakness or an infusion reaction is not routine sightseeing.",
    lodging:
      "Choose flexible lodging close to the named campus, with lift access, a capable companion and a reliable route back at night.",
    recovery:
      "Winter pollution, heat and long road transfers can compound fatigue or headache; follow the treating team's activity and hydration instructions.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption matter for timed recordings, infusions and urgent neurological review.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, pharmacy hours and overnight transport.",
    recovery:
      "Humidity and monsoon travel make dressing care, mobility support and a contingency night practical parts of discharge planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts, and cross-city traffic can interfere with an overnight study, infusion slot or early review.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm power, refrigeration if medicines require it and the first review.",
    recovery:
      "Milder weather may help nearby recovery but does not remove seizure, bleeding, infusion or neurological risk.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Some clinical corridors have direct airport access, but heat and travel after sedation, lumbar puncture, infusion or prolonged monitoring still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with easy access for new weakness, fever, severe headache or another warning sign.",
    recovery:
      "Heat can aggravate dehydration and post-procedure fatigue; individualized fluid advice takes priority over generic travel guidance.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the neurology team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after testing, injection or infusion; plan indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish neurological candidacy, session count, device choice, admission or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact test, treatment course, specialist interpretation, consumables and follow-up rather than a headline neurology package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish monitoring capability, emergency support or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, medicine, device, laboratory and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual protocol, dose, sessions and monitoring plan.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, medicine or device scope and post-travel follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews results after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, medicine, device and follow-up charges may be separate; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  {
    label: "Neurology assessment",
    detail:
      "Named specialist records review, focused examination and treatment discussion when explicitly itemized.",
  },
  {
    label: "Planned episode",
    detail:
      "The stated recording, sampling, injection, infusion or implant session and standard facility resources within the written scope.",
  },
  {
    label: "Standard consumables",
    detail:
      "Routine electrodes, needles, tubing, medicines or disposables only to the quantity and specification listed.",
  },
  {
    label: "Monitoring and observation",
    detail:
      "The stated physiological monitoring, recovery area, ward or sleep-lab time rather than an open-ended admission.",
  },
  {
    label: "Report and early review",
    detail:
      "A formal procedure or interpretation report, discharge instructions and stated early follow-up.",
  },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Changed clinical scope",
    detail:
      "A different test, extra session, higher dose, additional biopsy site or new treatment after reassessment.",
  },
  {
    label: "Complications and extended stay",
    detail:
      "Unplanned imaging, medicines, ICU, intervention, prolonged monitoring or readmission unless expressly covered.",
  },
  {
    label: "Unlisted medicines and devices",
    detail:
      "Long-term therapy, premium implants, replacement components or take-home supplies outside the estimate.",
  },
  {
    label: "Extended follow-up",
    detail:
      "Rehabilitation, repeat interpretation, programming, maintenance courses and care after the included period.",
  },
  {
    label: "Travel and living",
    detail:
      "Flights, visas, transport, lodging, meals, companion costs and personal expenses.",
  },
];

function makeCities(profile: NeurologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic neurology or hospital label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader neurological-care ecosystem, but this page does not infer that every centre performs ${profile.shortName}. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Neurology Planning`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare protocol, specialist, monitoring, recovery and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, protocol and route for urgent neurological reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete neurological records before non-refundable travel. Remote review can change after examination, imaging, electrophysiology or laboratory review.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither value is a city tariff, acceptance promise or treatment recommendation.`,
          `${profile.technique} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical resource differences, not premium upgrades.`,
          `Ask the provider to name the ${profile.specialist}, campus, protocol, dose or device, interpretation, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send neurological notes, imaging, test traces and medicine history before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist} and confirm laboratory, imaging, ward or emergency backup appropriate to this procedure.`,
          `${profile.recovery} ${place.recovery} Travel only after the team documents clinical stability.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, protocol assumptions, emergency plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            q: "When can an international patient travel home?",
            a: `There is no universal date. ${profile.recovery} The treating team must document travel fitness.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and campus, protocol, dose or device, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createArticle(profile: NeurologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const approaches = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Neurology Treatment & Planning Range`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, protocol, inclusions, risks, recovery and international travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, protocol, provider and follow-up must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.distinction}`,
      `${profile.technique} Relevant approaches include ${approaches}; selection follows the clinical question rather than a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] as a United States self-pay reference and [STAY] for broad planning. These tokens are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The written scope should identify the named specialist, protocol, stated sessions or procedure time, standard consumables, interpretation and observation. The stored stay is [STAY], but monitoring and travel timing remain individual.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A changed dose, additional session, different device or unexpected admission describes a different bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified neurology team must review records, indication, alternatives and safety before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. Replace it with an itemized quotation tied to a named ${profile.specialist}, campus, protocol, monitoring plan and follow-up assumptions.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. Compare like with like: a short diagnostic sitting, prolonged capture, multi-session course and implanted-device pathway are not interchangeable.`,
      "Do not derive Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range. Keep [US_COST], flights, lodging, companion costs, long-term medicines, rehabilitation and complication contingencies visible.",
    ],
    costComponents: [
      ...COMMON_INCLUSIONS,
      {
        label: "Procedure-specific resource",
        detail: `${profile.technique} The estimate should state exactly which part is included.`,
      },
    ],
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may assume different protocols, sessions, doses, consumables, interpretation or observation. Compare professional, facility, medicine or device, complication and follow-up lines.`,
    inclusions: [
      ...COMMON_INCLUSIONS,
      {
        label: "Named protocol",
        detail: `Only the explicitly stated ${profile.procedure} protocol, dose, sites or sessions.`,
      },
    ],
    exclusions: [
      ...COMMON_EXCLUSIONS,
      {
        label: "Procedure-specific extension",
        detail: `${profile.followUp} Later testing or treatment is excluded unless written.`,
      },
    ],
    approachComparison: {
      heading: `Approaches to ${profile.procedure}`,
      intro: [
        `${profile.technique} The approaches below answer different clinical questions and are not consumer upgrades.`,
        `A named ${profile.specialist} should explain which route fits the individual and what finding could alter, postpone or cancel it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from indication, anatomy, urgency, risk and follow-up needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Is ${profile.procedure} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, profile.distinction],
      who: [
        profile.candidacy,
        "Suitability depends on individual assessment by a qualified neurologist and, where relevant, neurophysiology, radiology, pathology, anaesthesia, rehabilitation or another multidisciplinary service. This page cannot diagnose or recommend personal treatment.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approaches}; the report or treatment plan must state which one was used.`,
        `${profile.admission} Expected procedure time: ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, antiplatelets, antiseizure medicines, immunotherapy, allergies, pregnancy status and previous neurological procedures as relevant.",
        "Follow only the treating team's instructions about fasting, sleep deprivation, medicine reduction or medicine holds. Report fever, infection, new deficit or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Written instructions should cover activity, wound or puncture care, medicines, supervision, results and escalation. They take priority over generic travel advice.",
        profile.risks,
        `${profile.followUp} Seek urgent help for ${profile.urgent}; use the treating team's thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "clinical-distinction",
        heading: `What ${profile.procedure} does — and does not — mean`,
        paragraphs: [
          profile.distinction,
          "The consultation should identify the precise diagnostic question or therapeutic target. Similar catalog names may use different equipment, staffing, medicines, anaesthesia and follow-up.",
          "No educational page can promise a diagnostic answer, symptom control, treatment response or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and considerations for ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on indication, urgency, comorbidity, medicines, access, monitoring and the actual protocol.",
          "A lower estimate does not reduce the need for qualified interpretation, emergency support or continuity after discharge.",
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure duration, observation or hospital stay, recommended days nearby and longer-term neurological care at home. Discharge is not fitness to fly.",
          `${profile.followUp} Keep travel flexible until results, warning signs and the handover plan have been reviewed.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, rehabilitation and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Neurological assessment", detail: `${profile.candidacy} ${profile.distinction}` },
        { label: "Options and alternatives", detail: `Discuss ${approaches}, conservative care and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, protocol, sessions, dose or device, monitoring, interpretation, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, imaging, laboratory or physiological testing only when clinically indicated before final consent." },
        { label: "Procedure or treatment", detail: profile.technique },
        { label: "Observation and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Results and handover", detail: `${profile.followUp} Carry reports, device or dose details and follow-up instructions.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: `${profile.records.join("; ")}.` },
      { label: "Obtain named specialist review", detail: `A ${profile.specialist} assesses indication, alternatives, risks and travel suitability.` },
      { label: "Clarify the clinical question", detail: `${profile.distinction} Ask what result or response would change management.` },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold protocol, sessions, dose, sites, device, interpretation, observation and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Complete the named protocol", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Reconcile medicines and warning signs.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit travel advice and reports.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and escalation plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, doses, allergies and adverse-reaction history",
      "Neurology consultation notes and previous EEG, EMG, imaging, CSF, pathology or sleep reports where relevant",
      "Anticoagulant, antiplatelet, infection, renal, cardiac and anaesthesia records where relevant",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds indication, clinician, licensed facility, protocol, sessions, dose or device, interpretation, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Urgency, protocol, sessions, medicines, devices, complications, currency and stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their overlays address airport, geography, climate, lodging and follow-up without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic Neurology entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, relevant diagnostic or treatment infrastructure and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, protocol-specific staff and equipment, emergency backup, interpretation quality and continuity after return.",
      "No provider is ranked and no outcome is promised. Hyperacute illness, unstable neurological status, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what alternatives were discussed?`,
      "What exact clinical question or treatment target is written in my referral?",
      `Who is the named ${profile.specialist}, and at which exact campus will care occur?`,
      `Does the quotation use the exact CMS name ${profile.procedure}?`,
      "Which consultations, examinations, blood tests and imaging are included?",
      "Which protocol, body sites, recording channels, dose, sessions or device model are assumed?",
      "Are specialist interpretation and a signed report included?",
      "Are facility, medicine, consumable, anaesthesia and monitoring fees included?",
      "Is this outpatient, day care, overnight monitoring or an admission, and what could change that?",
      "How many sessions, ward nights or observation hours are included?",
      "How are extra sessions, failed capture, non-diagnostic sampling or a changed plan billed?",
      "What contraindications and medicine holds will be checked?",
      "Which complications can the campus manage without transfer?",
      "How are unplanned imaging, ICU, blood products or readmission billed?",
      "Which discharge medicines, dressings or devices are included?",
      "When will preliminary and final reports be available?",
      "When may I fly, work, drive, exercise or resume normal activity?",
      "Which follow-up visits, programming, infusions or rehabilitation sessions are included?",
      "How are complications handled after I leave India?",
      "What records, emergency contacts and handover will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my clinician after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This national range is not a quotation; protocol, sessions, dose or device, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: `What is the most important distinction for ${profile.shortName}?`,
        a: profile.distinction,
      },
      { q: "What assessment is needed first?", a: profile.evaluation },
      { q: "What happens during it?", a: profile.technique },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Timing can change with the protocol and clinical course.`,
      },
      {
        q: "How long is the hospital stay?",
        a: `${profile.admission} Discharge follows clinical criteria, not a package calendar.`,
      },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient travel home?",
        a: `There is no fixed travel date. ${profile.recovery} The treating team must document stability.`,
      },
      {
        q: "Which Indian cities offer this care?",
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      {
        q: "What follow-up is needed after returning home?",
        a: `${profile.followUp} The plan should name who reviews results, medicines, wounds, devices or repeat treatment.`,
      },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and neurology centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live CMS entity relationships for ${profile.procedure}. A general neurology or accreditation label does not establish current case acceptance, protocol capability or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/neurology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy or mechanism diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/neurology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure pathway; the actual protocol depends on assessment and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/neurology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery and ongoing-care milestones vary; the treating team's instructions take priority.",
        fit: "contain",
      },
    ],
  };
}

const profiles: NeurologyProfile[] = [
  {
    procedure: "EEG",
    shortName: "routine EEG",
    specialist: "neurologist or clinical neurophysiologist",
    definition: "A routine EEG is an outpatient recording of electrical activity from scalp electrodes, usually during wakefulness and brief drowsiness.",
    candidacy: "It may support assessment of suspected seizures, encephalopathy or episodic altered awareness when a short interictal sample can answer the referral question.",
    distinction: "Routine EEG is not prolonged Video EEG: it may show interictal abnormalities but often does not capture a typical event, and a normal trace does not exclude epilepsy.",
    evaluation: "Review the event description, medicines, prior traces and whether sleep deprivation or activation with flashing lights and deep breathing is appropriate.",
    technique: "A technologist measures the scalp, applies surface electrodes, checks impedance and records background activity with activation procedures; a qualified clinician interprets the trace.",
    approaches: [
      { label: "Standard awake EEG", detail: "A short outpatient electrical recording with eye opening, breathing and photic activation when safe." },
      { label: "Sleep-deprived EEG", detail: "Used when drowsiness or sleep may improve yield; transport and supervision require planning." },
      { label: "Portable EEG", detail: "A bedside recording when illness or mobility prevents laboratory testing." },
    ],
    duration: "Commonly about 30–60 minutes of recording plus electrode setup",
    admission: "Usually outpatient with no overnight stay.",
    recovery: "There is no wound recovery; wash electrode paste out and follow safety advice if sleep deprivation or a seizure occurred.",
    risks: "EEG is non-invasive. Activation can rarely provoke symptoms or a seizure; skin irritation and fatigue after sleep deprivation can occur.",
    urgent: "a prolonged seizure, repeated events without recovery or new persistent weakness",
    drivers: [
      { label: "Routine versus sleep-deprived protocol", detail: "Extra preparation and recording time change staffing." },
      { label: "Recording duration", detail: "A short trace is not prolonged capture." },
      { label: "Portable versus laboratory setting", detail: "Bedside equipment and travel differ." },
      { label: "Activation procedures", detail: "Photic stimulation and hyperventilation require individualized safety checks." },
      { label: "Specialist interpretation", detail: "A signed neurophysiology report is a material deliverable." },
    ],
    records: ["Event description or witness video", "Antiseizure medicine list", "Previous EEG reports", "Brain imaging if available"],
    followUp: "A neurologist should correlate the trace with the events and decide whether Video EEG or another test is needed.",
    quoteQuestions: ["Is sleep deprivation requested?", "How many recording minutes are included?", "Is specialist interpretation included?"],
    related: ["Video EEG", "Evoked Potentials", "Sleep Study (Polysomnography)"],
    campusFocus: "Confirm an EEG laboratory and named interpreter; a generic consultation room does not establish recording capability.",
    imageAlts: [
      "Patient-education diagram showing scalp EEG electrodes recording cerebral electrical signals into a multichannel trace",
      "Numbered routine EEG pathway showing electrode placement, activation procedures and specialist interpretation",
      "Routine EEG aftercare diagram showing paste removal, seizure precautions and report review with a neurologist",
    ],
  },
  {
    procedure: "Video EEG",
    shortName: "prolonged Video EEG monitoring",
    specialist: "epileptologist or clinical neurophysiologist",
    definition: "Video EEG synchronizes continuous scalp electrical recording with video so clinicians can capture and classify a patient's typical events.",
    candidacy: "It may be considered when routine EEG is insufficient, events need electroclinical correlation or presurgical epilepsy assessment requires monitored capture.",
    distinction: "Video EEG is not a routine outpatient EEG: monitoring may last 1–5 nights, and supervised antiseizure medication reduction may be used only in a staffed unit with rescue protocols.",
    evaluation: "Review event frequency, prior EEG and MRI, antiseizure medicines, injury risk and whether medication reduction, sleep deprivation or activation is justified.",
    technique: "Continuous electrodes and synchronized video record behaviour before, during and after events; staff mark episodes, test responsiveness and maintain seizure precautions.",
    approaches: [
      { label: "Inpatient epilepsy monitoring unit", detail: "Continuous observation with rapid clinical response and possible supervised medicine adjustment." },
      { label: "Ambulatory Video EEG", detail: "Home or outpatient capture without the same immediate ward response." },
      { label: "Presurgical monitoring", detail: "A broader pathway that may add neuropsychology, MRI review or invasive monitoring later." },
    ],
    duration: "Often 1–5 nights, depending on event capture and clinical purpose",
    admission: "Usually an epilepsy-monitoring admission for prolonged studies; ambulatory protocols differ.",
    recovery: "Resume the agreed medicine schedule, check scalp irritation and follow driving and seizure-safety advice after discharge.",
    risks: "Captured seizures can cause injury, aspiration or status epilepticus; supervised medicine reduction can increase seizure frequency, and electrodes may irritate skin.",
    urgent: "a prolonged seizure, breathing difficulty, injury or repeated events without baseline recovery",
    drivers: [
      { label: "Monitoring nights", detail: "One night and five nights use different bed, staff and interpretation resources." },
      { label: "Inpatient versus ambulatory capture", detail: "Emergency response capability differs." },
      { label: "Medication-reduction protocol", detail: "This requires prescribing, observation and rescue medication." },
      { label: "Event count and review", detail: "More captured events increase physician review time." },
      { label: "Presurgical work-up", detail: "Imaging and neuropsychology are separate unless itemized." },
    ],
    records: ["Typical-event videos and diary", "Prior EEG traces and reports", "Brain MRI", "Complete antiseizure medicine schedule"],
    followUp: "An epileptologist should explain whether events were epileptic, non-epileptic or still unclassified and provide a medicine and safety plan.",
    quoteQuestions: ["How many monitoring nights are included?", "Is medication reduction planned?", "What happens if no typical event is captured?"],
    related: ["EEG", "Vagus Nerve Stimulation (VNS)", "Sleep Study (Polysomnography)"],
    campusFocus: "Confirm a staffed epilepsy monitoring unit with rescue medication and continuous observation; an unattended recorder is not an inpatient Video EEG service.",
    imageAlts: [
      "Patient-education diagram showing synchronized scalp EEG channels, bedside video and captured seizure behaviour",
      "Numbered Video EEG pathway showing monitored admission, event capture and electroclinical specialist review",
      "Video EEG discharge diagram showing medicine reconciliation, seizure precautions and epilepsy follow-up",
    ],
  },
  {
    procedure: "Electromyography (EMG)",
    shortName: "needle electromyography",
    specialist: "neurologist or clinical neurophysiologist trained in EMG",
    definition: "Needle EMG samples electrical activity within selected muscles to assess motor units, denervation and patterns of nerve, root, neuromuscular-junction or muscle disease.",
    candidacy: "It may be considered for focal weakness, suspected radiculopathy, motor-neuron disorder, myopathy or another question that requires muscle-level physiology.",
    distinction: "EMG is the needle muscle examination; Nerve Conduction Study uses surface stimulation and recording. They are distinct tests but are often combined in one electrodiagnostic session.",
    evaluation: "Map symptoms and examination findings to exact muscles, review bleeding risk, implanted stimulators and prior spine, nerve or muscle studies.",
    technique: "A fine recording needle is inserted into selected muscles at rest and during activation; the physician interprets insertional, spontaneous and motor-unit activity in clinical context.",
    approaches: [
      { label: "Focused limb EMG", detail: "Selected muscles answer a focal nerve or root question." },
      { label: "Generalized neuromuscular study", detail: "Multiple regions may be sampled when disease is diffuse." },
      { label: "EMG combined with NCS", detail: "Common, but the quotation should name both components." },
    ],
    duration: "Often 30–90 minutes depending on muscles and accompanying NCS",
    admission: "Outpatient; admission is not normally required.",
    recovery: "Brief muscle soreness or bruising can occur; follow individual anticoagulant and activity advice.",
    risks: "Risks include pain, bruising, minor bleeding and rare infection; sampling near the chest requires additional pneumothorax caution.",
    urgent: "progressive swelling, severe chest pain or shortness of breath after chest-wall muscle sampling",
    drivers: [
      { label: "Number and location of muscles", detail: "A focused hand study is not a multi-region assessment." },
      { label: "EMG alone versus combined NCS", detail: "Needle and surface components use different time and materials." },
      { label: "Complex neuromuscular protocols", detail: "Repetitive stimulation or single-fibre methods are additional work." },
      { label: "Anticoagulation precautions", detail: "Site selection and medical review may change." },
      { label: "Specialist interpretation", detail: "Localization and a signed report are central deliverables." },
    ],
    records: ["Weakness and sensory timeline", "Spine or nerve imaging", "Anticoagulant list", "Prior EMG/NCS report"],
    followUp: "The referring clinician should correlate physiology with examination and imaging; EMG findings do not independently dictate surgery.",
    quoteQuestions: ["How many limbs or regions are planned?", "Does the price include NCS?", "Are repetitive or single-fibre studies included?"],
    related: ["Nerve Conduction Study", "Nerve and Muscle Biopsy", "Evoked Potentials"],
    campusFocus: "Confirm a physician-led electrodiagnostic laboratory; equipment alone does not establish muscle selection or interpretation quality.",
    imageAlts: [
      "Patient-education diagram showing a recording needle in selected muscle and motor-unit electrical activity",
      "Numbered EMG pathway showing clinical mapping, muscle sampling at rest and activation, and interpretation",
      "EMG aftercare diagram showing brief soreness care, bleeding watch and diagnostic follow-up",
    ],
  },
  {
    procedure: "Nerve Conduction Study",
    shortName: "nerve conduction study",
    specialist: "neurologist or clinical neurophysiologist trained in nerve conduction",
    definition: "A Nerve Conduction Study uses surface electrodes and brief electrical stimulation to measure sensory and motor nerve responses.",
    candidacy: "It may be considered for entrapment neuropathy, polyneuropathy, focal nerve injury or demyelinating disease when latency, amplitude and conduction velocity can localize dysfunction.",
    distinction: "NCS is a surface stimulation and recording test, not needle EMG, although both are commonly combined to distinguish nerve, root and muscle patterns.",
    evaluation: "Review symptom distribution, temperature, oedema, skin integrity, implanted electronic devices and prior electrodiagnostic results.",
    technique: "Surface electrodes stimulate and record along selected nerves; the clinician compares response latency, amplitude, conduction velocity and side-to-side patterns.",
    approaches: [
      { label: "Focused entrapment study", detail: "Tests selected nerves across a suspected compression site." },
      { label: "Polyneuropathy protocol", detail: "Samples upper and lower-limb sensory and motor nerves." },
      { label: "Combined NCS and needle EMG", detail: "Adds muscle sampling to answer localization questions." },
    ],
    duration: "Often 30–75 minutes depending on nerves and accompanying EMG",
    admission: "Outpatient with no routine hospital stay.",
    recovery: "No wound care is expected from surface testing; temporary tingling or skin irritation usually settles.",
    risks: "Brief discomfort, startle and minor skin irritation can occur; device-specific precautions are reviewed for implanted electronics.",
    urgent: "unexpected persistent weakness, severe pain or an implanted-device concern after testing",
    drivers: [
      { label: "Number of limbs and nerves", detail: "A single entrapment protocol differs from generalized neuropathy testing." },
      { label: "NCS alone versus EMG", detail: "Combined testing adds needle examination." },
      { label: "Special protocols", detail: "Late responses, repetitive stimulation or comparison studies add time." },
      { label: "Temperature and technical repetition", detail: "Cold limbs or artefact may require warming and repeat traces." },
      { label: "Interpretation complexity", detail: "Localization and clinical correlation require specialist review." },
    ],
    records: ["Symptom map", "Diabetes or toxin history", "Implanted-device details", "Previous NCS/EMG"],
    followUp: "A clinician should interpret whether findings fit entrapment, axonal loss, demyelination or another process and plan next steps.",
    quoteQuestions: ["Which nerves and limbs are included?", "Is needle EMG separate?", "Are late responses and comparison studies included?"],
    related: ["Electromyography (EMG)", "Nerve and Muscle Biopsy", "Evoked Potentials"],
    campusFocus: "Confirm calibrated neurophysiology equipment and a named interpreter; a generic nerve clinic is not proof of NCS capability.",
    imageAlts: [
      "Patient-education diagram showing surface stimulation and recording electrodes measuring motor and sensory nerve responses",
      "Numbered nerve conduction pathway showing electrode placement, brief stimulation and response interpretation",
      "Nerve conduction aftercare diagram showing skin comfort, report review and next-step localization",
    ],
  },
  {
    procedure: "Evoked Potentials",
    shortName: "evoked potentials",
    specialist: "clinical neurophysiologist or neurologist",
    definition: "Evoked potentials record nervous-system responses to controlled visual, auditory or somatosensory stimuli and assess conduction along specific pathways.",
    candidacy: "They may be considered when optic, auditory brainstem or central sensory pathway conduction is clinically relevant and routine examination or imaging leaves a focused question.",
    distinction: "Visual, auditory and somatosensory evoked potentials test different pathways; they are not interchangeable and are not a routine EEG.",
    evaluation: "Name the pathway, review vision or hearing correction, peripheral nerve disease, imaging and factors that can degrade stimulus delivery or recording.",
    technique: "Scalp and peripheral electrodes average small responses to repeated pattern-reversal visual, click auditory or electrical somatosensory stimulation.",
    approaches: [
      { label: "Visual evoked potentials", detail: "Pattern stimulation assesses conduction from each eye through the visual pathway." },
      { label: "Brainstem auditory evoked responses", detail: "Clicks assess auditory nerve and brainstem timing." },
      { label: "Somatosensory evoked potentials", detail: "Peripheral stimulation assesses conduction through spinal and cortical sensory pathways." },
    ],
    duration: "Usually 45–120 minutes depending on modalities and sides",
    admission: "Outpatient; no overnight admission is normally needed.",
    recovery: "No procedural recovery is expected, although stimulation fatigue or mild electrode-site irritation may occur.",
    risks: "Testing is non-invasive apart from brief surface stimulation; discomfort, eye strain or headache can occur, and technical limitations may make results inconclusive.",
    urgent: "new persistent neurological symptoms unrelated to the expected brief stimulation",
    drivers: [
      { label: "Modality count", detail: "One visual pathway and combined visual, auditory and somatosensory testing are different scopes." },
      { label: "Bilateral recordings", detail: "Side-specific stimulation and repeats add time." },
      { label: "Technical repeat requirements", detail: "Noise or poor stimulus delivery can extend testing." },
      { label: "Sedation needs", detail: "Rarely considered and materially changes monitoring." },
      { label: "Specialist interpretation", detail: "Latency and waveform analysis require a formal report." },
    ],
    records: ["Neurological examination", "Vision or hearing reports", "Relevant MRI", "Prior evoked-potential traces"],
    followUp: "Results should be correlated with examination and imaging; latency change alone is not a stand-alone diagnosis.",
    quoteQuestions: ["Which modalities are ordered?", "Are both sides included?", "Is sedation assumed or excluded?"],
    related: ["EEG", "Nerve Conduction Study", "Electromyography (EMG)"],
    campusFocus: "Confirm the exact visual, auditory or somatosensory protocol and interpreter; one modality does not establish all three.",
    imageAlts: [
      "Patient-education diagram showing visual auditory and somatosensory stimuli producing measured nervous-system responses",
      "Numbered evoked-potential pathway showing stimulus delivery, signal averaging and latency interpretation",
      "Evoked-potential follow-up diagram showing report correlation with examination and imaging",
    ],
  },
  {
    procedure: "Lumbar Puncture",
    shortName: "diagnostic lumbar puncture",
    specialist: "neurologist or experienced procedural clinician",
    definition: "Lumbar puncture passes a needle between lower lumbar vertebrae to measure pressure when indicated and sample cerebrospinal fluid for laboratory analysis.",
    candidacy: "It may be considered for suspected infection, inflammation, haemorrhage not resolved by imaging, pressure disorder or another specific CSF question.",
    distinction: "Lumbar puncture is CSF sampling, not a neurosurgical lumbar drain. Contraindication checks for mass effect, coagulopathy, infection and cardiorespiratory stability come before the needle.",
    evaluation: "Review neurological examination, need for brain imaging, platelets and coagulation, anticoagulants, local infection, opening-pressure conditions and exact CSF tests.",
    technique: "With sterile technique in lateral or seated position, a lumbar needle enters the subarachnoid space; opening pressure may be measured and labelled tubes go promptly to the laboratory.",
    approaches: [
      { label: "Bedside diagnostic LP", detail: "Landmark-guided sampling after contraindications are addressed." },
      { label: "Image-guided LP", detail: "Fluoroscopy or ultrasound assistance for difficult anatomy or prior failure." },
      { label: "Opening-pressure protocol", detail: "Requires an appropriate lateral position and documentation before CSF removal." },
    ],
    duration: "Often 20–45 minutes plus observation and laboratory handling",
    admission: "Usually outpatient or day care; acute illness may independently require admission.",
    recovery: "Hydration and activity advice are individualized; post-dural puncture headache is typically postural and may require reassessment or an epidural blood patch.",
    risks: "Risks include post-dural puncture headache, back discomfort, bleeding, infection, traumatic tap, nerve irritation and rare herniation when contraindications are missed.",
    urgent: "fever, severe non-settling headache, new weakness, confusion, seizure or bladder dysfunction",
    drivers: [
      { label: "Bedside versus image guidance", detail: "Radiology equipment and professional fees differ." },
      { label: "CSF laboratory panel", detail: "Culture, cytology, oligoclonal bands and molecular tests are separate lines." },
      { label: "Opening-pressure measurement", detail: "Positioning and manometer documentation matter." },
      { label: "Observation needs", detail: "Acute infection work-up is not a simple outpatient sample." },
      { label: "Blood-patch treatment", detail: "Management of persistent post-dural puncture headache is separate unless stated." },
    ],
    records: ["Brain imaging if obtained", "Platelet and coagulation results", "Anticoagulant list", "Requested CSF tests"],
    followUp: "A named clinician must receive time-sensitive microbiology and final CSF results and explain whether further treatment is needed.",
    quoteQuestions: ["Which CSF tests are included?", "Will opening pressure be measured?", "Is image guidance or a blood patch included if needed?"],
    related: ["Evoked Potentials", "Nerve and Muscle Biopsy", "EEG"],
    campusFocus: "Confirm rapid CSF laboratory handling and emergency imaging access; a procedure room without result follow-up is incomplete.",
    imageAlts: [
      "Patient-education diagram showing a lumbar needle entering the lower spinal CSF space below the spinal cord",
      "Numbered lumbar puncture pathway showing contraindication checks, sterile CSF sampling and labelled laboratory tubes",
      "Lumbar puncture recovery diagram showing postural headache monitoring, warning signs and result follow-up",
    ],
  },
  {
    procedure: "IV Thrombolysis",
    shortName: "intravenous stroke thrombolysis",
    specialist: "acute stroke neurologist",
    definition: "IV thrombolysis gives alteplase or tenecteplase to an eligible patient with hyperacute ischaemic stroke after immediate imaging excludes haemorrhage.",
    candidacy: "It is considered in a time-critical local stroke pathway after onset or last-known-well time, deficit, imaging, blood pressure, bleeding risk and contraindications are assessed.",
    distinction: "This is emergency treatment, not elective medical travel. It is not Stroke Thrombectomy; suspected large-vessel occlusion still needs rapid thrombectomy assessment under the existing shared Neurosurgery article.",
    evaluation: "Emergency review includes exact timing, stroke scale, non-contrast brain imaging, vascular imaging when indicated, glucose, blood pressure, anticoagulants and recent bleeding or surgery.",
    technique: "After consent appropriate to the emergency, weight-based alteplase infusion or protocol-specific tenecteplase bolus is administered with close neurological and blood-pressure monitoring.",
    approaches: [
      { label: "Alteplase protocol", detail: "Weight-based bolus and infusion under an acute stroke protocol." },
      { label: "Tenecteplase protocol", detail: "A weight-based bolus used in selected systems and patients." },
      { label: "Thrombolysis plus thrombectomy pathway", detail: "Eligible treatment should not delay transfer for large-vessel thrombectomy." },
    ],
    duration: "Minutes for eligibility and dosing, followed by at least the protocol-specified stroke-unit monitoring",
    admission: "Emergency stroke-unit or ICU admission; [STAY] is not an elective travel plan.",
    recovery: "Recovery depends on the stroke, not the infusion alone; swallowing, mobility, rehabilitation, secondary prevention and repeat imaging guide discharge.",
    risks: "The major risk is intracranial haemorrhage; systemic bleeding, angioedema and treatment of a stroke mimic are also considered.",
    urgent: "any stroke symptom now—call local emergency services immediately rather than arranging travel",
    drivers: [
      { label: "Emergency imaging", detail: "Brain and vascular imaging are integral time-critical resources." },
      { label: "Alteplase versus tenecteplase", detail: "Drug and dosing protocols differ." },
      { label: "Stroke-unit or ICU care", detail: "Monitoring and the stroke itself dominate the episode." },
      { label: "Thrombectomy transfer", detail: "Large-vessel occlusion adds a separate shared pathway." },
      { label: "Rehabilitation and complications", detail: "Swallowing care, bleeding treatment and rehabilitation are not a drug-only bill." },
    ],
    records: ["Exact onset or last-known-well time", "Anticoagulant and antiplatelet use", "Recent surgery or bleeding history", "Emergency brain and vascular imaging"],
    followUp: "Local stroke specialists must coordinate repeat imaging, cause investigation, rehabilitation and secondary prevention.",
    quoteQuestions: ["Which thrombolytic protocol is used?", "Are emergency imaging and stroke-unit care included?", "How is thrombectomy transfer handled?"],
    related: ["Carotid Doppler", "Transcranial Doppler (TCD)", "Nerve Conduction Study"],
    campusFocus: "Confirm a round-the-clock stroke code with immediate CT and escalation; an elective neurology clinic is not a thrombolysis service.",
    imageAlts: [
      "Patient-education diagram showing an ischaemic cerebral artery clot and intravenous thrombolytic medicine with haemorrhage screening",
      "Numbered hyperacute stroke pathway showing emergency imaging, alteplase or tenecteplase eligibility and monitored treatment",
      "Stroke thrombolysis recovery diagram showing haemorrhage watch, swallow assessment, rehabilitation and prevention",
    ],
  },
  {
    procedure: "Transcranial Doppler (TCD)",
    shortName: "transcranial Doppler",
    specialist: "neurovascular neurologist or trained sonographer with physician interpretation",
    definition: "Transcranial Doppler uses low-frequency ultrasound through cranial acoustic windows to measure blood-flow velocity in intracranial arteries.",
    candidacy: "It may be considered for vasospasm surveillance, selected sickle-cell screening, intracranial stenosis or emboli monitoring when a defined protocol exists.",
    distinction: "TCD examines intracranial vessels through temporal, orbital or suboccipital windows; Carotid Doppler is an extracranial neck duplex and is not a substitute.",
    evaluation: "Name the vascular question, review prior angiography, identify the required vessels and consider whether poor acoustic windows may limit the examination.",
    technique: "A probe is positioned over cranial windows to identify vessels by depth, direction and waveform; velocities and ratios are interpreted against the indication.",
    approaches: [
      { label: "Intracranial velocity study", detail: "Maps major basal arteries through available acoustic windows." },
      { label: "Serial vasospasm monitoring", detail: "Repeated studies track trends after subarachnoid haemorrhage." },
      { label: "Emboli or vasomotor testing", detail: "Specialized protocols require longer monitoring and defined stimuli." },
    ],
    duration: "Often 30–60 minutes; specialized monitoring can take longer",
    admission: "Usually bedside or outpatient; the underlying illness may require admission.",
    recovery: "No recovery is usually needed; results must be interpreted in context of the acoustic window and other vascular imaging.",
    risks: "Diagnostic ultrasound is non-invasive; pressure discomfort can occur, and an inadequate acoustic window can yield a limited or non-diagnostic study.",
    urgent: "new face, arm or speech symptoms, sudden severe headache or reduced consciousness",
    drivers: [
      { label: "Routine map versus serial monitoring", detail: "Repeated ICU surveillance is not one outpatient study." },
      { label: "Acoustic-window difficulty", detail: "Longer attempts or alternative imaging may be required." },
      { label: "Emboli detection", detail: "Extended bilateral monitoring uses additional time." },
      { label: "Bedside versus laboratory setting", detail: "Portable ICU work changes logistics." },
      { label: "Specialist interpretation", detail: "Velocities without vascular context are incomplete." },
    ],
    records: ["Prior CTA/MRA/angiography", "Stroke or haemorrhage timeline", "Sickle-cell records if relevant", "Previous TCD trends"],
    followUp: "A neurovascular clinician should decide whether findings require CTA, MRA, angiography or a change in acute management.",
    quoteQuestions: ["Which intracranial vessels are included?", "Is this one study or serial monitoring?", "What happens if acoustic windows are inadequate?"],
    related: ["Carotid Doppler", "IV Thrombolysis", "Evoked Potentials"],
    campusFocus: "Confirm transcranial probes and trained interpretation; a neck vascular ultrasound service is not automatically TCD.",
    imageAlts: [
      "Patient-education diagram showing ultrasound through a temporal cranial window measuring intracranial artery velocity",
      "Numbered transcranial Doppler pathway showing window selection, waveform acquisition and neurovascular interpretation",
      "TCD follow-up diagram showing trend review, inadequate-window limits and escalation to vascular imaging",
    ],
  },
  {
    procedure: "Carotid Doppler",
    shortName: "carotid duplex ultrasound",
    specialist: "neurovascular clinician or vascular sonography service with physician interpretation",
    definition: "Carotid Doppler is an extracranial neck duplex study combining vessel imaging and Doppler waveforms to assess carotid plaque, stenosis and flow.",
    candidacy: "It may be considered after TIA or stroke, for a carotid bruit or in selected surveillance when the result can alter management.",
    distinction: "Carotid Doppler examines extracranial neck arteries, not intracranial windows used by TCD. The CMS currently has 0 doctor mappings, so honest doctor cards remain empty.",
    evaluation: "Review symptoms, side, prior CTA/MRA or surgery and whether a complete bilateral common, internal and external carotid protocol is requested.",
    technique: "A linear probe images each neck artery, assesses plaque and records colour and spectral Doppler velocities for formal interpretation.",
    approaches: [
      { label: "Bilateral carotid duplex", detail: "Standard anatomical and velocity assessment of both neck carotid systems." },
      { label: "Post-treatment surveillance", detail: "Targets restenosis after endarterectomy or stenting." },
      { label: "Duplex followed by CTA or MRA", detail: "Cross-sectional imaging may clarify discordant or severe findings." },
    ],
    duration: "Often 30–60 minutes",
    admission: "Outpatient; no hospital stay is normally required.",
    recovery: "No procedural recovery is expected; urgent symptoms override scheduled report follow-up.",
    risks: "The test is non-invasive. Mild probe pressure can be uncomfortable, and calcification, anatomy or technique can limit grading.",
    urgent: "new face, arm or speech symptoms or sudden visual loss",
    drivers: [
      { label: "Unilateral versus bilateral scope", detail: "A complete stroke study usually assesses both sides." },
      { label: "Initial versus surveillance study", detail: "Prior stent or surgery changes measurements and interpretation." },
      { label: "Technical difficulty", detail: "Calcification and high bifurcation can limit views." },
      { label: "Additional vertebral assessment", detail: "The quote should state whether vertebral arteries are included." },
      { label: "Formal interpretation", detail: "Velocity criteria and clinical correlation require a signed report." },
    ],
    records: ["TIA or stroke timeline", "Prior carotid imaging", "Endarterectomy or stent records", "Vascular-risk medicines"],
    followUp: "A stroke or vascular clinician should correlate duplex grading with symptoms and other imaging before treatment decisions.",
    quoteQuestions: ["Are both carotids and vertebral arteries included?", "Is this surveillance after surgery or stenting?", "Who provides the signed interpretation?"],
    related: ["Transcranial Doppler (TCD)", "IV Thrombolysis", "EEG"],
    campusFocus: "There are currently 0 exact CMS doctor mappings; cards must remain empty rather than borrowing generic neurologists.",
    imageAlts: [
      "Patient-education diagram showing an extracranial neck carotid artery plaque assessed by colour and spectral duplex",
      "Numbered carotid Doppler pathway showing bilateral neck scanning, velocity measurement and stenosis interpretation",
      "Carotid duplex follow-up diagram showing report correlation, urgent stroke signs and additional imaging decisions",
    ],
  },
  {
    procedure: "MRI-Guided Focused Ultrasound (MRgFUS)",
    shortName: "MRI-guided focused ultrasound",
    specialist: "movement-disorders neurologist with a functional neurosurgery and MRI team",
    definition: "MRgFUS is an incisionless MRI-guided procedure that focuses ultrasound energy to create a small thalamic lesion for selected medication-refractory tremor.",
    candidacy: "It may be considered for carefully selected essential tremor or tremor-dominant Parkinsonian symptoms after neurological diagnosis, medicine review, MRI and skull-density assessment.",
    distinction: "MRgFUS is an incisionless thalamotomy, not Deep Brain Stimulation: it creates a fixed lesion and does not implant a programmable system. Exact CMS cards are few and must remain sparse.",
    evaluation: "Assessment includes tremor phenotype, disability, cognition, gait, MRI contraindications, skull-density suitability and discussion of DBS or continued medical therapy.",
    technique: "With the head fixed in a stereotactic frame inside MRI, low-energy sonications test targeting before thermal sonications create the planned unilateral thalamic lesion.",
    approaches: [
      { label: "Unilateral thalamotomy", detail: "The established conceptual pathway for selected dominant-hand tremor." },
      { label: "Staged contralateral discussion", detail: "A separate later risk-benefit assessment, not an automatic package." },
      { label: "MRgFUS versus DBS", detail: "Fixed incisionless lesioning and adjustable implanted stimulation have different trade-offs." },
    ],
    duration: "Several hours in the MRI suite plus observation",
    admission: "Often day care or one night, depending on neurological and gait observation.",
    recovery: "Head-frame pin sites, balance, speech, sensation and tremor response are reviewed; new gait instability can delay travel.",
    risks: "Risks include imbalance, ataxia, numbness, weakness, speech or swallowing change, headache, pin-site problems and incomplete or recurrent tremor control.",
    urgent: "new weakness, persistent swallowing difficulty, severe imbalance or reduced consciousness",
    drivers: [
      { label: "MRI and focused-ultrasound platform", detail: "Specialized suite time is central to the bill." },
      { label: "Skull-density assessment", detail: "CT-based suitability testing is required by many pathways." },
      { label: "Frame and sonication time", detail: "Target testing and thermal monitoring vary." },
      { label: "Observation for gait or speech change", detail: "An extra night changes scope." },
      { label: "Staged second-side evaluation", detail: "A later contralateral procedure is a separate episode." },
    ],
    records: ["Movement-disorders diagnosis", "Medicine trials", "Brain MRI", "Skull-density CT if already obtained"],
    followUp: "Movement-disorders follow-up should assess tremor, gait, speech and medicines; MRgFUS does not provide programmable adjustment.",
    quoteQuestions: ["Is skull-density CT included?", "Is the planned target unilateral?", "How are gait or speech changes monitored?"],
    related: ["Botulinum Toxin Therapy", "Vagus Nerve Stimulation (VNS)", "Electromyography (EMG)"],
    campusFocus: "Confirm the dedicated MRgFUS platform and combined movement-disorders/MRI team; few exact cards are expected.",
    imageAlts: [
      "Patient-education diagram showing MRI-guided converging ultrasound beams focused on a selected thalamic tremor target",
      "Numbered MRgFUS pathway showing frame placement, test sonications and monitored incisionless thalamotomy",
      "MRgFUS recovery diagram showing gait speech sensation and tremor review before travel",
    ],
  },
  {
    procedure: "Botulinum Toxin Therapy",
    shortName: "neurological botulinum toxin therapy",
    specialist: "neurologist experienced in indication-specific botulinum toxin injection",
    definition: "Botulinum toxin therapy uses targeted intramuscular or pericranial injections to reduce excessive neuromuscular activity in defined neurological conditions.",
    candidacy: "It may be considered for chronic migraine, focal dystonia, spasticity or selected other indications after phenotype, goals and previous treatment are documented.",
    distinction: "The indication, toxin product, total units, dilution, muscles or pericranial sites and session interval are essential. Chronic-migraine injection is not a Migraine Nerve Block.",
    evaluation: "Document diagnosis, prior response, swallowing or breathing problems, weakness pattern, fixed contracture, medicines and the planned functional or headache goal.",
    technique: "A clinician injects a named toxin into protocol-specific muscles or pericranial sites, sometimes using EMG or ultrasound guidance; effect develops over days and later wears off.",
    approaches: [
      { label: "Chronic migraine protocol", detail: "Uses distributed pericranial and neck sites according to the named protocol." },
      { label: "Dystonia injection plan", detail: "Muscle selection and dose follow the abnormal posture or movement." },
      { label: "Spasticity treatment", detail: "Goal-based limb injections may use EMG or ultrasound guidance with rehabilitation." },
    ],
    duration: "Often 20–60 minutes per session",
    admission: "Usually outpatient with brief observation.",
    recovery: "Avoid unapproved manipulation of injection sites and monitor swallowing, breathing or generalized weakness; benefit and adverse effects are reviewed before repeat dosing.",
    risks: "Risks include pain, bruising, unwanted local weakness, neck weakness, eyelid droop, dysphagia and rare spread causing generalized weakness or breathing difficulty.",
    urgent: "difficulty swallowing or breathing, generalized weakness or a severe allergic reaction",
    drivers: [
      { label: "Indication and protocol", detail: "Migraine, dystonia and spasticity require different sites and goals." },
      { label: "Toxin product and total units", detail: "Products and units are not simply interchangeable." },
      { label: "Number and depth of muscles", detail: "Multi-limb spasticity uses more time and medicine." },
      { label: "EMG or ultrasound guidance", detail: "Guidance adds specialist and equipment resources." },
      { label: "Repeat-session schedule", detail: "One sitting is not a maintenance course." },
    ],
    records: ["Exact indication", "Previous toxin product, units and response", "Swallowing or respiratory history", "Therapy goals"],
    followUp: "Review benefit, weakness and duration of effect before repeating; rehabilitation or preventive migraine care continues separately.",
    quoteQuestions: ["Which toxin product and how many units are included?", "Which muscles or migraine sites are planned?", "Is EMG or ultrasound guidance included?"],
    related: ["Migraine Nerve Block", "Electromyography (EMG)", "MRI-Guided Focused Ultrasound (MRgFUS)"],
    campusFocus: "Confirm indication-specific injection expertise and the named toxin supply; a cosmetic injection service is not this Neurology pathway.",
    imageAlts: [
      "Patient-education diagram showing targeted botulinum toxin injection sites for migraine dystonia or limb spasticity",
      "Numbered botulinum therapy pathway showing goal selection, dose and site mapping, and targeted injection",
      "Botulinum therapy follow-up diagram showing delayed effect, weakness monitoring and repeat-session review",
    ],
  },
  {
    procedure: "Plasmapheresis",
    shortName: "neurological plasma exchange",
    specialist: "neurologist coordinating with an apheresis medicine team",
    definition: "Therapeutic plasmapheresis removes and replaces plasma across repeated sessions to reduce circulating pathogenic antibodies or inflammatory factors in selected neurological disease.",
    candidacy: "It may be considered for selected Guillain–Barré syndrome, myasthenia gravis crisis or exacerbation, and other antibody-mediated neurological disorders when timing and alternatives are reviewed.",
    distinction: "Neurology owns this exclusive treatment object despite the shared Nephrology taxonomy. Pricing must state a course and per-session assumptions, not treat plasma exchange as dialysis or a one-off drug infusion.",
    evaluation: "Review diagnosis, urgency, haemodynamics, blood count, fibrinogen, electrolytes, infection, vascular access and whether IVIG is an alternative rather than an addition.",
    technique: "Blood passes through an apheresis circuit; plasma is discarded and replaced with albumin and, when indicated, plasma while calcium and vital signs are monitored.",
    approaches: [
      { label: "Peripheral-access exchange", detail: "Possible when veins support repeated high-flow sessions." },
      { label: "Central-line exchange", detail: "Adds insertion, infection and thrombosis considerations." },
      { label: "Acute multi-session course", detail: "Session number and spacing follow disease and response, not a generic package." },
    ],
    duration: "Often 2–4 hours per session across an individualized course",
    admission: "Outpatient, ward or ICU depending on weakness, breathing, swallowing and access.",
    recovery: "Monitor blood pressure, calcium symptoms, access sites, strength and breathing; the underlying disease determines rehabilitation and travel.",
    risks: "Risks include low blood pressure, citrate-related low calcium, bleeding from reduced fibrinogen, allergic reaction, infection or thrombosis from central access and line complications.",
    urgent: "worsening breathing or swallowing, fainting, fever at a central line or uncontrolled bleeding",
    drivers: [
      { label: "Number of exchange sessions", detail: "Course pricing must state every assumed sitting." },
      { label: "Plasma volume and replacement fluid", detail: "Albumin and plasma quantities differ by patient and indication." },
      { label: "Peripheral versus central access", detail: "Line insertion and care may be separate." },
      { label: "Ward versus ICU setting", detail: "Respiratory or autonomic instability changes the episode." },
      { label: "Laboratory and calcium support", detail: "Fibrinogen, electrolytes and replacement are recurring lines." },
    ],
    records: ["Neurological diagnosis and severity", "Respiratory and swallowing assessment", "Blood count, fibrinogen and electrolytes", "Vascular-access history"],
    followUp: "Neurology must define response assessment, rehabilitation and maintenance immunotherapy; plasma exchange effect may be temporary.",
    quoteQuestions: ["Is the figure per session or full course?", "How many exchanges and what replacement fluid are assumed?", "Is central-line insertion included?"],
    related: ["IVIG (Intravenous Immunoglobulin)", "Nerve Conduction Study", "Electromyography (EMG)"],
    campusFocus: "Confirm apheresis staffing, vascular-access and neurological respiratory backup; a dialysis label alone does not establish plasma exchange.",
    imageAlts: [
      "Patient-education diagram showing blood separated in an apheresis circuit with plasma removed and replacement fluid returned",
      "Numbered neurological plasmapheresis pathway showing access, plasma exchange and calcium and vital-sign monitoring",
      "Plasma exchange ongoing-care diagram showing multi-session course review, access care and neurological reassessment",
    ],
  },
  {
    procedure: "IVIG (Intravenous Immunoglobulin)",
    shortName: "intravenous immunoglobulin therapy",
    specialist: "neurologist experienced in immune-mediated neurological disease",
    definition: "IVIG infuses pooled human immunoglobulin in a weight- and indication-based dose for selected immune-mediated neurological disorders.",
    candidacy: "It may be considered for selected GBS, CIDP, myasthenia gravis, multifocal motor neuropathy or another supported indication after alternatives and urgency are reviewed.",
    distinction: "IVIG pricing must state patient weight, dose per kilogram, total grams, infusion days and product; it is not plasmapheresis and the two are not automatically combined.",
    evaluation: "Confirm diagnosis, weight, previous response, renal function, hydration, thrombotic risk, IgA-related reaction history and concurrent medicines.",
    technique: "A named IVIG product is infused intravenously at a stepped rate with vital-sign monitoring; dose may be divided across several days.",
    approaches: [
      { label: "Acute loading course", detail: "A higher total course divided according to indication and tolerance." },
      { label: "Maintenance infusion", detail: "Repeated dosing interval is individualized from response and adverse effects." },
      { label: "IVIG versus plasma exchange", detail: "Selection considers urgency, access, renal or thrombotic risk and evidence for the condition." },
    ],
    duration: "Several hours per infusion, often across 1–5 days depending on dose and tolerance",
    admission: "Day care, ward or ICU according to disease severity and reaction risk.",
    recovery: "Maintain individualized hydration, watch headache and systemic symptoms, and reassess strength or function over the expected clinical interval.",
    risks: "Risks include headache, aseptic meningitis, infusion reaction, haemolysis, thrombosis, fluid stress and renal injury; product and patient factors matter.",
    urgent: "chest pain, breathlessness, unilateral swelling, severe headache with neck stiffness, dark urine or reduced urine output",
    drivers: [
      { label: "Weight and total dose", detail: "Total grams are central to medicine cost." },
      { label: "Product and vial use", detail: "Brand, concentration and unavoidable vial rounding should be explicit." },
      { label: "Infusion days and rate", detail: "Slow or divided dosing adds chair or bed time." },
      { label: "Ward versus day care", detail: "Severe GBS or MG is not a routine infusion-chair episode." },
      { label: "Renal and thrombotic monitoring", detail: "Laboratories and risk mitigation may add resources." },
    ],
    records: ["Exact immune-neurology diagnosis", "Current weight and planned dose", "Renal function", "Thrombosis and prior infusion-reaction history"],
    followUp: "A neurologist should document objective response, adverse effects and whether maintenance, another immunotherapy or rehabilitation is needed.",
    quoteQuestions: ["What weight, dose per kilogram and total grams are quoted?", "Which product and how many infusion days?", "How are renal and thrombotic risks monitored?"],
    related: ["Plasmapheresis", "Nerve Conduction Study", "Electromyography (EMG)"],
    campusFocus: "Confirm the named IVIG product, monitored infusion capability and emergency response; a medicine price without administration scope is incomplete.",
    imageAlts: [
      "Patient-education diagram showing weight-based intravenous immunoglobulin flowing through an infusion line with renal and clot-risk checks",
      "Numbered IVIG pathway showing dose calculation, stepped monitored infusion and neurological response assessment",
      "IVIG ongoing-care diagram showing hydration advice, reaction warning signs and maintenance-course review",
    ],
  },
  {
    procedure: "Nerve and Muscle Biopsy",
    shortName: "nerve and muscle biopsy",
    specialist: "neuromuscular neurologist coordinating surgeon and neuropathologist",
    definition: "Nerve and Muscle Biopsy removes an explicitly selected nerve, muscle or both so specialized pathology can assess neuropathy, myopathy, vasculitis, inflammation or storage disease.",
    candidacy: "It may be considered when clinical examination, laboratory, genetics, imaging and EMG/NCS leave a tissue question likely to alter management.",
    distinction: "The exact tissue, side and site must be named; sural nerve and quadriceps, deltoid or other muscle samples answer different questions. The CMS currently has no cards, so empty cards are honest.",
    evaluation: "A neuromuscular team selects a clinically affected but not end-stage site, reviews sensory loss from nerve removal, bleeding risk, imaging and pathology handling requirements.",
    technique: "Through a small incision, the surgeon removes the planned fascicle or muscle specimen without crushing it; tissue is divided and transported correctly for histology, enzyme, immunologic or electron-microscopy studies.",
    approaches: [
      { label: "Muscle biopsy only", detail: "Site follows weakness pattern, MRI and EMG while avoiding severely replaced muscle." },
      { label: "Sensory nerve biopsy", detail: "Often sural nerve, with expected permanent numbness in its distribution." },
      { label: "Combined nerve and muscle biopsy", detail: "Used for selected vasculitic or systemic questions and requires coordinated pathology." },
    ],
    duration: "Often 45–120 minutes plus specimen processing",
    admission: "Usually day care or one night depending on anaesthesia and mobility.",
    recovery: "Protect the wound, plan mobility around the sampled site and expect defined sensory loss after nerve biopsy; pathology may take time.",
    risks: "Risks include pain, bleeding, infection, scar, delayed healing, weakness at the muscle site, permanent sensory deficit after nerve sampling and non-diagnostic tissue.",
    urgent: "expanding swelling, fever, wound drainage, severe new weakness or uncontrolled pain",
    drivers: [
      { label: "Exact tissue and number of sites", detail: "One muscle is not a combined nerve-and-muscle operation." },
      { label: "Anaesthesia and theatre setting", detail: "Local and general anaesthesia use different resources." },
      { label: "Neuropathology panel", detail: "Histochemistry, immunostains and electron microscopy must be itemized." },
      { label: "Specimen transport", detail: "Fresh, frozen and fixed tissue require coordinated handling." },
      { label: "Non-diagnostic repeat work", detail: "A second site is not automatically included." },
    ],
    records: ["EMG/NCS report", "Muscle MRI if obtained", "Genetic and autoimmune tests", "Anticoagulant and wound-healing history"],
    followUp: "The neuromuscular clinician and neuropathologist should integrate tissue with physiology and genetics before treatment is changed.",
    quoteQuestions: ["Which exact tissue, side and site are planned?", "Which pathology techniques are included?", "What permanent sensory deficit is expected after nerve biopsy?"],
    related: ["Electromyography (EMG)", "Nerve Conduction Study", "IVIG (Intravenous Immunoglobulin)"],
    campusFocus: "There are no current exact CMS cards; confirm surgeon-to-neuropathology specimen handling without populating generic profiles.",
    imageAlts: [
      "Patient-education diagram showing separately selected peripheral nerve and skeletal muscle biopsy sites with pathology handling",
      "Numbered nerve and muscle biopsy pathway showing site selection, careful tissue removal and specialized neuropathology",
      "Biopsy recovery diagram showing wound care, expected sensory change and integrated pathology review",
    ],
  },
  {
    procedure: "Vagus Nerve Stimulation (VNS)",
    shortName: "vagus nerve stimulation implantation",
    specialist: "epileptologist working with an implanting surgeon",
    definition: "VNS implants a pulse generator in the chest with a lead around the left cervical vagus nerve to provide intermittent stimulation for selected drug-resistant epilepsy.",
    candidacy: "It may be considered after an epilepsy team confirms drug resistance and reviews resective or disconnective surgery, dietary therapy and other neuromodulation options.",
    distinction: "VNS is not resective epilepsy surgery and not Deep Brain Stimulation. It is usually adjunctive rather than a cure, and one exact CMS card should remain one rather than being expanded generically.",
    evaluation: "Review seizure type and burden, Video EEG, imaging, medicines, prior surgery, voice and swallowing, cardiac history and device follow-up access at home.",
    technique: "Under anaesthesia, a generator is placed under chest skin and connected to electrodes wrapped around the left vagus nerve; stimulation is activated and programmed over later visits.",
    approaches: [
      { label: "New VNS implantation", detail: "Includes cervical lead and chest generator placement." },
      { label: "Generator replacement", detail: "A later battery procedure, not a new lead implantation price." },
      { label: "Programming pathway", detail: "Gradual parameter adjustment is separate from the operation itself." },
    ],
    duration: "Often 1–2 hours for implantation",
    admission: "Usually day care or 1–2 nights depending on anaesthesia and seizure observation.",
    recovery: "Neck and chest wounds are reviewed before programming increases; hoarseness or cough may occur during stimulation.",
    risks: "Risks include infection, bleeding, vagus-nerve injury, voice change, cough, throat discomfort, swallowing difficulty, device malfunction and anaesthesia complications.",
    urgent: "breathing or swallowing difficulty, wound infection, device exposure or a major seizure change",
    drivers: [
      { label: "Generator and lead model", detail: "Implant specification and warranty should be explicit." },
      { label: "New implant versus replacement", detail: "Lead dissection differs from battery exchange." },
      { label: "Anaesthesia and hospital stay", detail: "Seizure and airway monitoring can extend care." },
      { label: "Programming visits", detail: "Activation and titration require repeat specialist appointments." },
      { label: "Long-term battery replacement", detail: "Future generator surgery is outside the first implant." },
    ],
    records: ["Seizure diary and medicine trials", "Video EEG and MRI", "Prior epilepsy surgery review", "Voice, swallowing and cardiac history"],
    followUp: "A local epilepsy service must program the device, track seizures and medicines and arrange future battery care.",
    quoteQuestions: ["Which generator and lead model are included?", "How many programming visits are included?", "Who will manage the device after return?"],
    related: ["Video EEG", "EEG", "MRI-Guided Focused Ultrasound (MRgFUS)"],
    campusFocus: "Preserve the single exact CMS mapping; confirm implantation and long-term programming rather than borrowing generic epilepsy profiles.",
    imageAlts: [
      "Patient-education diagram showing a chest pulse generator connected to a lead around the left cervical vagus nerve",
      "Numbered VNS pathway showing epilepsy review, lead and generator implantation, and later activation",
      "VNS recovery diagram showing neck and chest wound care, voice monitoring and ongoing programming",
    ],
  },
  {
    procedure: "Sleep Study (Polysomnography)",
    shortName: "overnight polysomnography",
    specialist: "sleep neurologist or sleep-medicine physician with an accredited sleep laboratory",
    definition: "Polysomnography is an attended overnight sleep-laboratory recording of brain activity, eye movements, muscle tone, airflow, breathing effort, oxygen, heart rhythm and limb movement.",
    candidacy: "It may be considered for suspected sleep-disordered breathing, parasomnia, narcolepsy pathway, nocturnal seizures or movement disorder when an attended multichannel study can answer the question.",
    distinction: "This is an overnight channel-based sleep-lab investigation, not a pulmonology airway procedure and not routine EEG; the CMS currently has no exact cards.",
    evaluation: "Review sleep schedule, symptoms, medicines, seizure history, cardiorespiratory disease and whether diagnostic, split-night, PAP titration or additional daytime testing is ordered.",
    technique: "A technologist applies scalp, eye, chin, limb, airflow, effort, oxygen and ECG sensors, observes overnight and scores sleep stages, respiratory events, arousals and movements.",
    approaches: [
      { label: "Diagnostic attended PSG", detail: "A full overnight baseline recording in a sleep laboratory." },
      { label: "Split-night study", detail: "Diagnostic recording may transition to PAP titration if predefined criteria are met." },
      { label: "PSG with extended EEG or daytime MSLT", detail: "Additional channels or next-day testing must be explicitly ordered." },
    ],
    duration: "One overnight recording, with setup before sleep and scoring afterward",
    admission: "A sleep-lab night rather than a ward admission; medical instability requires a different setting.",
    recovery: "Remove sensor paste, resume the agreed schedule and await scored interpretation; sleep disruption may cause next-day fatigue.",
    risks: "Testing is non-invasive; skin irritation, poor sleep, anxiety and an inconclusive night can occur, and severe findings may require prompt clinical follow-up.",
    urgent: "severe breathing distress, prolonged nocturnal seizure or dangerous sleepiness affecting driving",
    drivers: [
      { label: "Diagnostic versus titration protocol", detail: "PAP equipment and technologist work differ." },
      { label: "Channel count and extended EEG", detail: "Nocturnal seizure questions need additional coverage." },
      { label: "Attended laboratory staffing", detail: "Overnight observation is central to PSG." },
      { label: "Additional MSLT", detail: "Next-day nap testing is a separate protocol." },
      { label: "Scoring and physician interpretation", detail: "Raw channels require formal scoring and clinical review." },
    ],
    records: ["Sleep diary", "Medicine and caffeine schedule", "Prior home sleep test", "Seizure or parasomnia videos if relevant"],
    followUp: "A sleep clinician should explain respiratory, neurological and movement findings and whether PAP, further seizure testing or another treatment is appropriate.",
    quoteQuestions: ["Is this diagnostic, split-night or titration PSG?", "Are extended EEG channels included?", "Is next-day MSLT included or separate?"],
    related: ["EEG", "Video EEG", "Nerve Conduction Study"],
    campusFocus: "There are no current exact CMS cards; confirm an attended multichannel sleep laboratory without substituting generic pulmonology or Neurology profiles.",
    imageAlts: [
      "Patient-education diagram showing overnight polysomnography sensors for EEG eyes chin airflow effort oxygen ECG and limbs",
      "Numbered sleep-study pathway showing evening sensor setup, attended overnight recording and scored interpretation",
      "Polysomnography follow-up diagram showing paste removal, fatigue precautions and sleep-clinic result review",
    ],
  },
  {
    procedure: "Migraine Nerve Block",
    shortName: "migraine nerve block",
    specialist: "headache neurologist or trained pain clinician",
    definition: "A migraine nerve block injects local anaesthetic, sometimes with an additional agent, around selected occipital or pericranial nerves to interrupt pain signalling.",
    candidacy: "It may be considered for selected migraine, status migrainosus or occipital-predominant headache after diagnosis and red-flag causes are reviewed.",
    distinction: "This is a local occipital or pericranial injection, not Botulinum Toxin Therapy. Drug, side, nerve target and whether steroid is used must be stated.",
    evaluation: "Confirm headache diagnosis, pattern, neurological examination, allergies, anticoagulants, pregnancy status, prior response and the exact nerve or trigger-point target.",
    technique: "After skin preparation, a small volume is injected near the greater or lesser occipital or another selected pericranial nerve using landmarks or ultrasound when indicated.",
    approaches: [
      { label: "Greater or lesser occipital block", detail: "Unilateral or bilateral injection based on pain distribution." },
      { label: "Other pericranial nerve blocks", detail: "Supraorbital, supratrochlear or auriculotemporal targets require explicit naming." },
      { label: "Local anaesthetic with or without steroid", detail: "Medicine choice and risk differ and should be documented." },
    ],
    duration: "Often 10–30 minutes plus brief observation",
    admission: "Outpatient with short observation.",
    recovery: "Temporary scalp numbness, tenderness or dizziness may occur; follow individualized driving and wound advice.",
    risks: "Risks include injection pain, bleeding, infection, dizziness, vasovagal symptoms, temporary numbness, local hair or skin change when steroid is used and rare nerve injury.",
    urgent: "breathing difficulty, rapidly expanding swelling, fever or new persistent neurological deficit",
    drivers: [
      { label: "Number of nerves and sides", detail: "One unilateral occipital block differs from multiple bilateral targets." },
      { label: "Drug selection", detail: "Local anaesthetic and steroid assumptions should be explicit." },
      { label: "Landmark versus ultrasound guidance", detail: "Imaging adds equipment and clinician time." },
      { label: "Single versus repeat session", detail: "One injection is not a scheduled course." },
      { label: "Combined headache treatment", detail: "Infusion, Botox or preventive medicines are separate unless listed." },
    ],
    records: ["Headache diary and diagnosis", "Preventive and rescue medicines", "Anticoagulant and allergy list", "Prior nerve block or Botox response"],
    followUp: "A headache clinician should document duration of benefit, adverse effects and the preventive plan rather than repeating injections automatically.",
    quoteQuestions: ["Which nerves and sides are included?", "Which local anaesthetic and is steroid planned?", "Is ultrasound guidance or a repeat session included?"],
    related: ["Botulinum Toxin Therapy", "EEG", "Sleep Study (Polysomnography)"],
    campusFocus: "Confirm a headache-specific diagnosis and named injection targets; a generic pain injection does not establish a migraine nerve block.",
    imageAlts: [
      "Patient-education diagram showing greater occipital and selected pericranial nerve targets for local migraine injections",
      "Numbered migraine nerve-block pathway showing headache review, target marking and local injection",
      "Migraine nerve-block aftercare diagram showing temporary numbness, warning signs and preventive-treatment review",
    ],
  },
];

export const NEUROLOGY_EXCLUSIVE_PROCEDURES = profiles.map((profile) => profile.procedure);

export const neurologyArticles = profiles.map(createArticle);

export const neurologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  neurologyArticles.map((article) => [article.slug, article]),
);
