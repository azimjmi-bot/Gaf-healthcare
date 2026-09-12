import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { NEUROSURGERY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_NEUROSURGERY = [
  "Gamma Knife",
  "CyberKnife",
  "Stereotactic Radiosurgery (SRS)",
  "Spinal Tumor Surgery",
  "Skull Base Surgery",
] as const;

type ExclusiveNs = Exclude<
  (typeof NEUROSURGERY_PROCEDURES)[number],
  (typeof SHARED_NEUROSURGERY)[number]
>;

type NsProfile = {
  procedure: ExclusiveNs;
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
  related: ExclusiveNs[];
  imageAlts: [string, string, string];
  campusFocus: string;
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; arrival: string; lodging: string; recovery: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate neuro-ICU and theatre corridors. Confirm the exact campus before booking: a cross-NCR transfer after craniotomy, a fresh shunt or a coiled aneurysm is not a routine taxi ride.",
    lodging:
      "Choose flexible lodging near the named campus with a companion bed, a quiet room for neurological observation and a night-time route back to the treating neuro-ICU.",
    recovery:
      "Winter pollution and long NCR transfers can worsen headache, wound care or shunt concern. Follow the team's activity, wound and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon flooding can interfere with timed theatre lists or an urgent return for CSF leak, seizure or shunt blockage.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, pharmacy hours and a reliable night-time route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make cranial-wound care, shunt-site protection and reliable transport practical parts of discharge planning after neurosurgery.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after craniotomy, DBS or paediatric craniofacial work.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy access and the first wound, shunt or programming review.",
    recovery:
      "Milder weather can make a longer hotel step-down more comfortable after brain or spine-adjacent neurosurgery, but it does not remove leak, seizure or device risk. Arrange the first clinical review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several neurosurgery campuses have comparatively direct airport access, but heat and travel after craniotomy or shunt surgery still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with space for wound or device care and easy access for fever, CSF leak or seizure review.",
    recovery:
      "Heat can worsen dehydration and headache after intracranial surgery or a new shunt. Fluid and activity targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the neuro-ICU campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the neurosurgery team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after craniotomy, vascular or paediatric neurosurgery. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, open versus endoscopic versus endovascular access, ICU nights, implants or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact neurosurgical operation, implant or device, ICU assumption, pathology and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish neuro-ICU, vascular or paediatric capability or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, device, ICU, imaging and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual anatomy, implant and ICU plan rather than a general neurosurgery package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, device scope and post-travel neurosurgery follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews pathology, devices or imaging after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, device, ICU and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: NsProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic neurosurgery or hospital label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader neurosurgery ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, surgical approach, ICU or device needs and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, approach and route for urgent neurological reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete neurosurgery records before non-refundable travel. Remote review can change after examination, MRI, angiography or EEG.",
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
          `Ask the provider to name the ${profile.specialist}, campus, open versus endoscopic versus endovascular assumptions, implants, ICU allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send neurosurgery notes, relevant MRI or CT, angiography or EEG and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm neuro-ICU, imaging and emergency CSF-leak, seizure or bleed backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews wounds, devices or neurological status and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, implant or corridor assumptions, ICU plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `It should name ${profile.procedure}, the clinician and campus, approach, implants, ICU, imaging, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createNsArticle(profile: NsProfile): CostArticle {
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
    seoTitle: `${profile.procedure} Cost in India: Procedure, Hospitals & Planning Range`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, surgical options, hospitals, recovery, risks and travel for international patients.`,
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
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, theatre time, stated imaging, routine medicines and the listed hospital stay, while extra implants, navigation, ICU nights or another procedure depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Revision surgery, a different approach or an unexpected implant can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified neurosurgery team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, approach and ICU assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different corridor, extra implant or a combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and rehabilitation visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different approaches, implants, ICU nights or imaging. Compare professional fees, theatre time, navigation or devices, ICU, medicines, exclusions and emergency terms.`,
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
        "Suitability depends on individual assessment by a qualified neurosurgeon and, where relevant, neurology, radiation oncology, interventional neuroradiology or a multidisciplinary team. This page cannot diagnose a reader or recommend a personal operation.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, seizure medicines, infection and any implant or device history before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report fever, new weakness, severe headache, CSF leak or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Wound care, device or shunt instructions and activity limits are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — brain parenchyma, skull base, vessel, ventricle, CSF pathway, functional circuit or paediatric suture — from disease that may still need medicines, radiosurgery, endovascular treatment or a different operation.",
          "No page can promise complete resection, seizure freedom, device success or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, prior surgery, anticoagulation, infection, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for neuro-ICU access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure time, hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms wound status, device stability, seizure control and travel fitness.`,
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
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, medicines and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, approach, implants, ICU, imaging, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, blood tests, MRI, angiography or EEG only when clinically indicated before final consent." },
        { label: "Surgery and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the operative report, imaging and device or pathology details where relevant.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, anatomy, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this operation cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, implant, ICU, imaging, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned operation", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish neurological stability, wound or device care and activity limits.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Neurosurgery notes and any available MRI, CT, angiography, PET, EEG or previous operative reports",
      "Pathology, molecular testing, radiation or chemotherapy records where relevant",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, surgical approach, implant, ICU, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, implants, ICU nights, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic neurosurgery entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, neuro-ICU infrastructure and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, neuro-ICU and imaging backup, implant or corridor capability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable intracranial haemorrhage, untreated infection, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical, radiosurgical or endovascular options were discussed?`,
      "How were my MRI, angiography, EEG and previous operations assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the operation occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, blood tests, MRI, CT and angiography are included?",
      "Are specialist, theatre, anaesthesia and recovery-room fees included?",
      "Is this an open, endoscopic, stereotactic or endovascular plan, and what finding would change it?",
      "Are neuronavigation, monitoring, shunts, clips, coils or stimulators assumed, and are manufacturer details provided?",
      "Would extra resection, a second stage or a different procedure change the quotation?",
      "How many ward or ICU nights and which room category are included?",
      "How are extra nights, CSF leak, bleed, reoperation or a complication billed?",
      "Which discharge medicines and rehabilitation sessions are included?",
      "Is pathology or molecular testing included if tissue is taken?",
      "When can I fly, walk, work or resume other activity?",
      "Which follow-up visits, imaging or device-programming reviews are included?",
      "How are complications handled after I leave India?",
      "When and by whom will fitness to fly be assessed?",
      "What operative report, images and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my clinician after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, implants, ICU, imaging, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is neurosurgery in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, implants, ICU and follow-up.",
      },
      { q: "What assessment is needed before surgery?", a: profile.evaluation },
      { q: "What happens during the operation?", a: profile.technique },
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
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant neurosurgery ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews pathology, imaging, devices or seizures.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and neurosurgery centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general neurosurgery or accreditation label does not establish current case acceptance, neuro-ICU backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/neurosurgery/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/neurosurgery/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/neurosurgery/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named neurosurgery consultation, records review and procedure-focused examination when explicitly listed." },
  { label: "Surgical episode", detail: "Specialist, theatre time, standard instruments and recovery-room or neuro-ICU care within the written scope." },
  { label: "Imaging and tests", detail: "Stated blood tests and listed MRI, CT, angiography or EEG only; unlisted advanced imaging is extra." },
  { label: "Routine aftercare", detail: "Standard medicines, observation and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, operative report and pathology or device details where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "Extra resection, a second stage, a different corridor or another operation found after arrival." },
  { label: "Complications", detail: "Unplanned tests, ICU extension, reoperation, prolonged stay or readmission unless expressly covered." },
  { label: "Premium devices", detail: "Additional clips, coils, shunts, stimulators or navigation beyond the written estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, rehabilitation, remote review or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: NsProfile[] = [
  {
    procedure: "Brain Tumor Surgery",
    shortName: "brain tumor surgery",
    specialist: "neurosurgeon or neuro-oncology surgeon",
    definition:
      "Brain tumor surgery in India may involve open craniotomy, minimally invasive or endoscopic approaches depending on tumour location, size, pathology and surgical goals. Treatment planning typically includes imaging, neurosurgical evaluation, anaesthesia, surgery, hospital care and postoperative monitoring.",
    candidacy:
      "It may be considered for selected intra-axial or extra-axial tumours when MRI already supports resection or debulking and a multidisciplinary team has reviewed location, expected pathology and alternatives such as biopsy or radiosurgery.",
    limits:
      "This umbrella sheet is not glioma, meningioma or pituitary surgery by another name. It does not promise complete resection, neurological recovery or that radiation or chemotherapy will be unnecessary.",
    evaluation:
      "Assessment includes contrast MRI, sometimes functional MRI or DTI, fitness for craniotomy, and whether navigation, monitoring or awake mapping should already be written into the estimate.",
    technique:
      "After anaesthesia and positioning, a planned craniotomy or keyhole corridor exposes the lesion. The tumour is removed or debulked under magnification, often with neuronavigation. Tissue goes to pathology; the bone flap is replaced and the patient recovers in a neuro-ICU or high-dependency bay.",
    approaches: [
      { label: "Open craniotomy", detail: "The usual sitting when exposure and haemostasis need a wider window." },
      { label: "Awake craniotomy with mapping", detail: "Selected eloquent-cortex tumours; extra monitoring time is not a cosmetic upgrade." },
      { label: "Endoscopic or keyhole corridor", detail: "Used when anatomy already makes a smaller route honest; neighbouring endoscopic slugs exist." },
    ],
    duration: "Often 3–8 hours depending on location, adhesions and mapping",
    admission: "Neuro-ICU then ward; stored [STAY] is a planning band, not a discharge promise.",
    recovery:
      "Early recovery includes neurological checks, wound care, steroid or seizure-medicine review and pathology discussion. Flying waits on wound status, seizure control and the team's travel advice.",
    risks:
      "Risks include bleeding, infection, seizures, brain swelling, stroke, CSF leak, new neurological deficit, incomplete resection and need for further surgery or oncology treatment.",
    urgent: "sudden weakness, seizure, CSF leak, fever or rapidly worsening headache",
    drivers: [
      { label: "Tumour location and eloquence", detail: "A convexity meningioma is not an insular glioma list." },
      { label: "Extent of resection versus biopsy", detail: "Debulking and stereotactic biopsy are different episodes." },
      { label: "Navigation, monitoring or awake mapping", detail: "These add theatre time and device lines." },
      { label: "ICU nights and repeat imaging", detail: "Swelling or a new deficit extends stay." },
      { label: "Pathology and molecular testing", detail: "Frozen section and NGS panels may be billed separately." },
    ],
    inclusions: [...commonInclusions, { label: "Listed craniotomy window", detail: "Only the stated corridor and ICU nights." }],
    exclusions: [...commonExclusions, { label: "Adjuvant radiation or chemotherapy", detail: "Oncology treatment sits on other sheets." }],
    records: ["Contrast brain MRI", "Prior operative or biopsy notes", "Neurological examination", "Medicine list including anticoagulants"],
    followUp: "Follow-up reviews pathology, wound, seizures and whether radiation or medical oncology should see the patient.",
    quoteQuestions: ["Is neuronavigation included?", "Is awake mapping assumed?", "How many ICU nights are written?"],
    related: ["Glioma Surgery", "Meningioma Surgery", "Pituitary Tumor Surgery"],
    campusFocus: "Name a neuro-ICU and a surgeon who actually resects intracranial tumours, not a generic neurology clinic.",
    imageAlts: [
      "Medical illustration of a brain tumour location relative to cortex, white-matter tracts and the planned craniotomy window",
      "Clinical diagram of craniotomy, tumour resection and neuronavigation used in brain tumor surgery",
      "Brain-tumor-surgery recovery pathway showing neuro-ICU checks, pathology review and travel clearance",
    ],
  },
  {
    procedure: "Glioma Surgery",
    shortName: "glioma surgery",
    specialist: "neuro-oncology neurosurgeon",
    definition:
      "Glioma surgery removes or debulks a glial tumour inside the brain, often using mapping, fluorescence or navigation so as much tumour as is safe can be taken while eloquent function is protected.",
    candidacy:
      "It may be considered when imaging and, where available, prior histology already support an intra-axial glioma and a team judges that resection or maximal safe debulking is appropriate.",
    limits:
      "This is not the umbrella brain-tumour sheet and not radiosurgery. Complete microscopic clearance is often not honest. Molecular profile and adjuvant treatment are separate conversations.",
    evaluation:
      "Assessment includes MRI with sequences that map the lesion to motor, language or visual pathways, fitness for awake surgery if indicated, and whether 5-ALA or similar fluorescence is even stocked.",
    technique:
      "A craniotomy is planned over the tumour. Mapping, navigation or fluorescence may guide resection. Tissue is sent for histology and, when written, molecular tests. Closure and neuro-ICU observation follow.",
    approaches: [
      { label: "Maximal safe resection", detail: "The usual oncologic sitting when function can be monitored." },
      { label: "Awake language or motor mapping", detail: "Selected eloquent gliomas; extra time is clinical, not cosmetic." },
      { label: "Biopsy-first strategy", detail: "When resection is judged too hazardous; neighbouring stereotactic-biopsy slug exists." },
    ],
    duration: "Often 4–8 hours when mapping is used",
    admission: "Neuro-ICU then ward; stored [STAY] lengthens if swelling or a new deficit appears.",
    recovery:
      "Recovery watches new weakness or speech change, steroids, seizures and pathology. Flying waits on neurological stability and wound review.",
    risks:
      "Risks include new neurological deficit, seizures, swelling, bleeding, infection, CSF leak, incomplete resection and need for further oncology treatment.",
    urgent: "new weakness, aphasia, seizure, fever or CSF leak",
    drivers: [
      { label: "Eloquence and mapping", detail: "Insular or language-cortex lists are not a right-frontal glioma." },
      { label: "Fluorescence or intraoperative imaging", detail: "5-ALA and iMRI are device lines if used." },
      { label: "Molecular testing", detail: "IDH, MGMT and NGS panels are often extra." },
      { label: "Primary versus recurrent glioma", detail: "A reoperative field changes time and risk." },
      { label: "Adjuvant plan", detail: "Radiation and chemotherapy sit on other sheets." },
    ],
    inclusions: [...commonInclusions, { label: "Listed glioma resection", detail: "Mapping or fluorescence only if written." }],
    exclusions: [...commonExclusions, { label: "Unplanned second-look surgery", detail: "Residual tumour on early MRI is a different sitting." }],
    records: ["Brain MRI with functional sequences if available", "Prior glioma pathology", "Seizure history", "Oncology notes if already treated"],
    followUp: "Pathology, molecular results and oncology or radiation review are named before departure.",
    quoteQuestions: ["Is 5-ALA or iMRI included?", "Is awake mapping assumed?", "Are molecular tests included?"],
    related: ["Brain Tumor Surgery", "Stereotactic Brain Biopsy", "Meningioma Surgery"],
    campusFocus: "Confirm who maps eloquent cortex and who reads the molecular report; a generic craniotomy package is not a glioma list.",
    imageAlts: [
      "Medical illustration of an intra-axial glioma near eloquent cortex and white-matter tracts",
      "Clinical diagram of glioma resection using neuronavigation and optional awake mapping",
      "Glioma-surgery recovery pathway showing neurological checks, pathology review and oncology follow-up",
    ],
  },
  {
    procedure: "Meningioma Surgery",
    shortName: "meningioma surgery",
    specialist: "skull-base or convexity neurosurgeon",
    definition:
      "Meningioma surgery removes a tumour arising from the meninges, ranging from a convexity mass to a skull-base lesion wrapped around nerves and vessels.",
    candidacy:
      "It may be considered when growth, mass effect, seizures or cranial-nerve risk already support resection after MRI and, where relevant, vascular imaging.",
    limits:
      "This is not glioma surgery and not automatic radiosurgery. Observation or Gamma Knife may remain honest for selected small, asymptomatic meningiomas. Complete removal is not always safe.",
    evaluation:
      "Assessment includes MRI, sometimes CT bone windows or angiography, and whether a convexity, parasagittal or skull-base corridor is the honest plan.",
    technique:
      "A craniotomy or skull-base approach exposes the dural origin. The tumour is dissected from brain, sinus or cranial nerves as far as is safe. Dura is repaired and the bone flap replaced.",
    approaches: [
      { label: "Convexity meningioma resection", detail: "A comparatively direct sitting when the sinus is not involved." },
      { label: "Parasagittal or sinus-involved resection", detail: "Venous reconstruction or residual tumour may be the honest limit." },
      { label: "Skull-base meningioma approach", detail: "Neighbouring endoscopic or open skull-base slugs apply when that corridor is used." },
    ],
    duration: "Often 3–10 hours depending on base and venous involvement",
    admission: "Neuro-ICU then ward; stored [STAY] is longer for skull-base work.",
    recovery:
      "Recovery includes wound and CSF-leak watch, seizure medicines and cranial-nerve review. Flying waits on leak status and neurological stability.",
    risks:
      "Risks include bleeding, venous infarction, CSF leak, infection, seizures, cranial-nerve injury, residual tumour and need for radiosurgery or further surgery.",
    urgent: "CSF leak, sudden weakness, seizure or wound swelling",
    drivers: [
      { label: "Convexity versus skull base", detail: "A sphenoid-wing list is not a convexity afternoon." },
      { label: "Venous-sinus involvement", detail: "Reconstruction or residual tumour changes ICU risk." },
      { label: "Dural reconstruction materials", detail: "Grafts and sealants may be extra lines." },
      { label: "Primary versus recurrent meningioma", detail: "Reoperation after radiation is a different sitting." },
      { label: "Need for later radiosurgery", detail: "Gamma Knife remains a shared radiation-oncology product." },
    ],
    inclusions: [...commonInclusions, { label: "Listed meningioma corridor", detail: "Only the stated approach and dural repair." }],
    exclusions: [...commonExclusions, { label: "Planned residual plus radiosurgery", detail: "A later GK sitting is a different invoice." }],
    records: ["Brain MRI with dura and sinus views", "CT bone windows if skull base", "Prior meningioma notes", "Seizure history"],
    followUp: "Follow-up reviews residual tumour, wound, seizures and whether radiosurgery should be discussed.",
    quoteQuestions: ["Is sinus reconstruction assumed?", "Is this convexity or skull base?", "Are dural grafts included?"],
    related: ["Brain Tumor Surgery", "Endoscopic Skull Base Surgery", "Glioma Surgery"],
    campusFocus: "Name who would dissect the sinus or skull-base nerves; do not borrow the ENT Skull Base Surgery article as this meningioma slug.",
    imageAlts: [
      "Medical illustration of a meningioma arising from the dura along the convexity or skull base",
      "Clinical diagram of meningioma resection from brain, venous sinus and cranial nerves",
      "Meningioma-surgery recovery pathway showing CSF-leak watch, seizure review and residual-tumour follow-up",
    ],
  },
  {
    procedure: "Pituitary Tumor Surgery",
    shortName: "pituitary tumor surgery",
    specialist: "pituitary or endoscopic skull-base neurosurgeon",
    definition:
      "Pituitary tumor surgery removes or debulks an adenoma or related sellar mass, most often through a transsphenoidal corridor, to relieve optic-nerve pressure or control hormone excess or deficiency.",
    candidacy:
      "It may be considered for visual-field threat, selected secreting adenomas or apoplexy after endocrinology and MRI already support an operation rather than medicines alone.",
    limits:
      "This is not open skull-base surgery by default and not a promise of hormone cure. Neighbouring endoscopic skull-base surgery is a corridor slug, not a cheaper endoscope count.",
    evaluation:
      "Assessment includes pituitary MRI, visual fields, a full hormone panel and whether medical therapy for prolactinoma has already been tried.",
    technique:
      "Usually under general anaesthesia, a transnasal transsphenoidal route reaches the sella. The adenoma is removed under the endoscope or microscope. The sellar floor is reconstructed to limit CSF leak.",
    approaches: [
      { label: "Endoscopic transsphenoidal resection", detail: "The usual first corridor when anatomy allows it." },
      { label: "Microscopic transsphenoidal resection", detail: "Still used in selected houses; not automatically inferior." },
      { label: "Open or combined skull-base approach", detail: "Giant or invasive adenomas may need a different sitting." },
    ],
    duration: "Often 2–5 hours for a first transsphenoidal list",
    admission: "Usually a shorter stay than open craniotomy; stored [STAY] still includes diabetes-insipidus watch.",
    recovery:
      "Recovery watches vision, sodium, urine output, CSF rhinorrhoea and hormone replacement. Flying waits on sodium stability and leak status.",
    risks:
      "Risks include CSF leak, meningitis, diabetes insipidus, hormone deficiency, vision change, carotid injury, residual tumour and need for further surgery or radiation.",
    urgent: "clear nasal drip, fever, sudden vision loss or extreme thirst and urine output",
    drivers: [
      { label: "Hormone type and medical alternatives", detail: "A prolactinoma on cabergoline is not a first surgical package." },
      { label: "Size and cavernous-sinus invasion", detail: "Knosp-grade invasion changes residual-tumour risk." },
      { label: "Reconstruction and lumbar drain", detail: "CSF-leak prevention is a device and stay line." },
      { label: "Revision after prior transsphenoidal surgery", detail: "A hostile sella is not a first list." },
      { label: "Endocrinology and ICU sodium watch", detail: "Diabetes insipidus extends stay." },
    ],
    inclusions: [...commonInclusions, { label: "Listed transsphenoidal sitting", detail: "Hormone assays and visual fields only if written." }],
    exclusions: [...commonExclusions, { label: "Lifelong hormone replacement", detail: "Hydrocortisone or desmopressin after return is usually personal." }],
    records: ["Pituitary MRI", "Visual-field test", "Hormone panel", "Prior medical or surgical pituitary notes"],
    followUp: "Endocrinology, vision and MRI residual review are named before departure.",
    quoteQuestions: ["Is endoscopic or microscopic access assumed?", "Are hormone assays included?", "What happens if a CSF leak needs a lumbar drain?"],
    related: ["Endoscopic Skull Base Surgery", "Endoscopic Brain Surgery", "Meningioma Surgery"],
    campusFocus: "Name pituitary endocrinology on the same campus; a weekend tourist endoscope is not a sodium-watch list.",
    imageAlts: [
      "Medical illustration of a pituitary adenoma in the sella pressing on the optic chiasm",
      "Clinical diagram of transsphenoidal endoscopic removal of a pituitary tumour and sellar reconstruction",
      "Pituitary-surgery recovery pathway showing sodium watch, vision review and CSF-leak precautions",
    ],
  },
  {
    procedure: "Endoscopic Brain Surgery",
    shortName: "endoscopic brain surgery",
    specialist: "neuroendoscopy neurosurgeon",
    definition:
      "Endoscopic brain surgery reaches an intracranial target through a small corridor with a camera, often via a ventricle or keyhole, when anatomy already makes that route honest.",
    candidacy:
      "It may be considered for selected ventricular tumours, colloid cysts, hydrocephalus procedures or other lesions a team judges reachable without an unnecessarily wide craniotomy.",
    limits:
      "This is not open brain-tumour surgery and not ETV by itself. Conversion to craniotomy can still be required. Neighbouring ETV and endoscopic skull-base slugs are different corridors.",
    evaluation:
      "Assessment includes MRI that shows a ventricular or cisternal path, and whether bleeding risk would force an open plan instead.",
    technique:
      "A burr hole or small craniotomy admits the endoscope. The target is inspected, biopsied or removed under irrigation. Haemostasis and closure follow; conversion is discussed in consent.",
    approaches: [
      { label: "Intraventricular endoscopy", detail: "Used for selected cysts, tumours or CSF pathways." },
      { label: "Keyhole endoscopic-assisted craniotomy", detail: "A hybrid when the endoscope assists an open window." },
      { label: "Conversion to open craniotomy", detail: "Not a failure of planning if bleeding or reach demands it." },
    ],
    duration: "Often 1.5–4 hours when the corridor stays endoscopic",
    admission: "Shorter than many open lists; stored [STAY] still includes CSF and bleed watch.",
    recovery:
      "Recovery watches headache, CSF leak from the burr hole, fever and neurological status. Flying waits on wound and the team's CSF advice.",
    risks:
      "Risks include bleeding, infection, CSF leak, incomplete removal, injury to ventricular walls or fornix, and need to convert to open surgery.",
    urgent: "decreasing consciousness, high fever, wound leak or new weakness",
    drivers: [
      { label: "Ventricular versus cisternal target", detail: "A colloid cyst is not a skull-base endoscope." },
      { label: "Need to convert to craniotomy", detail: "An open finish is a different invoice if not written." },
      { label: "Irrigation and haemostasis devices", detail: "Specialist endoscopes may be extra lines." },
      { label: "Combined ETV or shunt", detail: "CSF diversion is a neighbouring slug if that is the honest product." },
      { label: "Revision after prior ventricular surgery", detail: "Adhesions change time and risk." },
    ],
    inclusions: [...commonInclusions, { label: "Listed endoscopic corridor", detail: "Conversion to craniotomy only if written." }],
    exclusions: [...commonExclusions, { label: "Unplanned open finish", detail: "A converted list is not the same package." }],
    records: ["Brain MRI showing the corridor", "Prior ventricular or shunt notes", "Neurological examination"],
    followUp: "Follow-up reviews residual lesion, CSF pathway and wound.",
    quoteQuestions: ["What happens if conversion to craniotomy is needed?", "Is ETV assumed in the same sitting?", "Which endoscope system is quoted?"],
    related: ["Endoscopic Third Ventriculostomy (ETV)", "Brain Tumor Surgery", "Stereotactic Brain Biopsy"],
    campusFocus: "Confirm a neuroendoscopy list and a plan for open conversion; a sinus endoscope is not this sheet.",
    imageAlts: [
      "Medical illustration of an endoscope entering a cerebral ventricle toward an intraventricular lesion",
      "Clinical diagram of endoscopic brain surgery through a burr hole with optional conversion to craniotomy",
      "Endoscopic-brain-surgery recovery pathway showing CSF-leak watch, neurological checks and travel clearance",
    ],
  },
  {
    procedure: "Endoscopic Skull Base Surgery",
    shortName: "endoscopic skull base surgery",
    specialist: "endoscopic skull-base neurosurgeon",
    definition:
      "Endoscopic skull base surgery reaches the sella, anterior cranial base or related corridors through the nose, reconstructing the defect so brain and CSF stay sealed.",
    candidacy:
      "It may be considered for selected pituitary, craniopharyngioma, meningioma or CSF-leak repairs when imaging already writes an endonasal rather than open corridor.",
    limits:
      "This is not the ENT Skull Base Surgery article and not open skull-base surgery. Reconstruction and CSF-leak risk are the product, not a brochure endoscope count.",
    evaluation:
      "Assessment includes MRI, CT sinus anatomy, hormone and vision tests where relevant, and whether a nasoseptal flap is already expected.",
    technique:
      "An endonasal corridor is opened, the lesion addressed, and the skull-base defect reconstructed with grafts or a flap. A lumbar drain is used only if planned.",
    approaches: [
      { label: "Endonasal sellar and parasellar work", detail: "The usual pituitary-adjacent corridor." },
      { label: "Extended endonasal approach", detail: "Anterior fossa or clival work is a longer reconstruction." },
      { label: "Combined open and endoscopic sitting", detail: "A two-team list when one corridor is not enough." },
    ],
    duration: "Often 3–7 hours depending on reconstruction",
    admission: "Stored [STAY] includes CSF-leak watch; lumbar-drain days extend it.",
    recovery:
      "Recovery limits nose blowing, watches rhinorrhoea and vision, and reviews hormones if the sella was entered. Flying waits on leak status.",
    risks:
      "Risks include CSF leak, meningitis, vascular injury, vision or hormone change, flap failure and need for further reconstruction.",
    urgent: "salty nasal drip, fever, sudden vision loss or severe headache",
    drivers: [
      { label: "Extent of the endonasal corridor", detail: "Sellar work is not an extended clival list." },
      { label: "Flap reconstruction", detail: "Nasoseptal flaps add ENT time if a second team is used." },
      { label: "Lumbar drain", detail: "Extra days and infection risk." },
      { label: "Revision leak repair", detail: "A hostile skull base is not a first adenoma price." },
      { label: "Two-specialty fees", detail: "ENT participation may be a separate line." },
    ],
    inclusions: [...commonInclusions, { label: "Listed endonasal reconstruction", detail: "Flap and drain only if written." }],
    exclusions: [...commonExclusions, { label: "Unplanned open conversion", detail: "A craniotomy finish is another episode." }],
    records: ["MRI and sinus CT", "Vision and hormone tests if sellar", "Prior endonasal notes"],
    followUp: "Follow-up reviews leak, smell, hormones and residual tumour.",
    quoteQuestions: ["Is a nasoseptal flap included?", "Is ENT billed separately?", "Is a lumbar drain assumed?"],
    related: ["Pituitary Tumor Surgery", "Meningioma Surgery", "Endoscopic Brain Surgery"],
    campusFocus: "The CMS currently tags few endoscopic-skull-base clinicians; empty cards must stay empty rather than borrowing the ENT skull-base article.",
    imageAlts: [
      "Medical illustration of the sella and anterior skull base reached through an endonasal endoscopic corridor",
      "Clinical diagram of endoscopic skull-base resection and nasoseptal-flap reconstruction",
      "Endoscopic-skull-base recovery pathway showing CSF-leak precautions, vision review and travel clearance",
    ],
  },
  {
    procedure: "Stereotactic Brain Biopsy",
    shortName: "stereotactic brain biopsy",
    specialist: "stereotactic neurosurgeon",
    definition:
      "Stereotactic brain biopsy samples an intracranial lesion along a planned frame or frameless trajectory when resection is not the first honest step.",
    candidacy:
      "It may be considered for deep, multiple or eloquent lesions when histology is needed to choose radiation, chemotherapy or observation.",
    limits:
      "This is not tumour resection and not radiosurgery. A non-diagnostic sample can still occur. Neighbouring stereotactic brain surgery covers other trajectory work.",
    evaluation:
      "Assessment includes MRI that can be fused to the stereotactic system, coagulation status and whether a frame or frameless plan is already written.",
    technique:
      "After registration, a small opening is made and a needle follows the planned path. Cores are sent for frozen and permanent pathology. A post-biopsy scan may be obtained.",
    approaches: [
      { label: "Frame-based stereotactic biopsy", detail: "Used when the house still prefers a rigid frame." },
      { label: "Frameless neuronavigated biopsy", detail: "Image guidance without a frame when accuracy is judged adequate." },
      { label: "Biopsy plus planned resection later", detail: "Two sittings if the first only answers histology." },
    ],
    duration: "Often 1–2 hours of theatre time plus imaging registration",
    admission: "Usually a short stay; stored [STAY] covers bleed watch, not a craniotomy week.",
    recovery:
      "Recovery watches delayed haemorrhage, headache and pathology turnaround. Flying waits on a stable scan if one was obtained.",
    risks:
      "Risks include bleeding along the tract, infection, seizure, non-diagnostic tissue, neurological deficit and need for a second biopsy or resection.",
    urgent: "sudden weakness, decreasing consciousness, seizure or severe headache",
    drivers: [
      { label: "Frame versus frameless system", detail: "Registration time and device lines differ." },
      { label: "Depth and eloquence", detail: "A brainstem trajectory is not a right-frontal sample." },
      { label: "Frozen-section and molecular tests", detail: "Pathology may be a separate invoice." },
      { label: "Need for a post-biopsy scan", detail: "Extra imaging is often excluded." },
      { label: "Conversion to craniotomy", detail: "If bleeding forces an open sitting, the episode changes." },
    ],
    inclusions: [...commonInclusions, { label: "Listed trajectory and cores", detail: "Only the stated number of samples." }],
    exclusions: [...commonExclusions, { label: "Non-diagnostic repeat biopsy", detail: "A second trajectory is another sitting unless written." }],
    records: ["Brain MRI suitable for fusion", "Coagulation tests", "Prior biopsy attempts"],
    followUp: "Pathology must reach the treating oncologist or neurosurgeon; a non-diagnostic result needs an explicit next step.",
    quoteQuestions: ["Is a post-biopsy CT included?", "How many cores are assumed?", "What happens if tissue is non-diagnostic?"],
    related: ["Brain Tumor Surgery", "Stereotactic Brain Surgery", "Glioma Surgery"],
    campusFocus: "The CMS currently tags few biopsy-only clinicians; do not fill cards from a generic craniotomy list.",
    imageAlts: [
      "Medical illustration of a stereotactic trajectory from the skull surface to a deep brain lesion",
      "Clinical diagram of frame or frameless needle biopsy of an intracranial tumour",
      "Stereotactic-biopsy recovery pathway showing bleed watch, pathology review and next-step planning",
    ],
  },
  {
    procedure: "Aneurysm Clipping",
    shortName: "aneurysm clipping",
    specialist: "cerebrovascular neurosurgeon",
    definition:
      "Aneurysm clipping places a microsurgical clip across the neck of an intracranial aneurysm so blood no longer fills the sac, after angiography has already written an open rather than endovascular plan.",
    candidacy:
      "It may be considered for selected ruptured or unruptured aneurysms when location, neck morphology and a multidisciplinary review favour clipping over coiling.",
    limits:
      "This is not coiling and not a promise that every aneurysm should be treated. Ruptured and unruptured lists have different ICU stories.",
    evaluation:
      "Assessment includes CTA, MRA or catheter angiography, Hunt-Hess or WFNS grade if ruptured, and whether delayed ischaemia risk already implies a long ICU.",
    technique:
      "A craniotomy exposes the parent vessel. Temporary clips may be used while the definitive clip is placed across the neck. Intraoperative angiography or Doppler may confirm exclusion. Neuro-ICU vasospasm watch follows if the aneurysm had ruptured.",
    approaches: [
      { label: "Elective unruptured clipping", detail: "A planned sitting when rupture risk already justifies treatment." },
      { label: "Clipping after subarachnoid haemorrhage", detail: "ICU, EVD and vasospasm care dominate the bill." },
      { label: "Complex or giant aneurysm clipping", detail: "Bypass or trapping is a neighbouring cerebral-bypass conversation." },
    ],
    duration: "Often 3–7 hours depending on location and rupture status",
    admission: "Neuro-ICU-heavy; stored [STAY] is longer after rupture than after an elective clip.",
    recovery:
      "Recovery includes neurological checks, sodium, vasospasm monitoring if ruptured, and wound care. Flying waits on clinical stability, not a package night count.",
    risks:
      "Risks include stroke, bleeding, vessel injury, seizures, hydrocephalus, infection, residual aneurysm and need for further treatment.",
    urgent: "new weakness, severe headache, decreasing consciousness or fever",
    drivers: [
      { label: "Ruptured versus unruptured status", detail: "SAH ICU is not an elective clip afternoon." },
      { label: "Location and neck morphology", detail: "A middle-cerebral bifurcation is not a giant basilar list." },
      { label: "Temporary clipping and monitoring", detail: "MEP/SSEP and intraoperative angiogram add lines." },
      { label: "EVD or later shunt", detail: "Hydrocephalus after SAH is a neighbouring product." },
      { label: "Need for bypass", detail: "Cerebral bypass is a different CMS slug if that is the honest plan." },
    ],
    inclusions: [...commonInclusions, { label: "Listed clip and craniotomy", detail: "Vasospasm ICU only as written." }],
    exclusions: [...commonExclusions, { label: "Extended SAH ICU", detail: "Triple-H or endovascular rescue is extra unless named." }],
    records: ["Catheter angiogram or high-quality CTA/MRA", "SAH grade if ruptured", "Prior endovascular notes"],
    followUp: "Follow-up imaging confirms exclusion; neurology and rehabilitation are named after rupture.",
    quoteQuestions: ["Is this ruptured or unruptured?", "How many ICU nights are assumed?", "Is intraoperative angiography included?"],
    related: ["Aneurysm Coiling", "Cerebral Bypass", "AVM Surgery"],
    campusFocus: "Name a cerebrovascular list and a neuro-ICU that treats vasospasm; a general craniotomy brand is not a clip.",
    imageAlts: [
      "Medical illustration of an intracranial aneurysm on a cerebral artery showing the sac and neck",
      "Clinical diagram of microsurgical clip placement across an aneurysm neck after craniotomy",
      "Aneurysm-clipping recovery pathway showing neuro-ICU vasospasm watch, imaging confirmation and travel clearance",
    ],
  },
  {
    procedure: "Aneurysm Coiling",
    shortName: "aneurysm coiling",
    specialist: "neurovascular interventional specialist",
    definition:
      "Aneurysm coiling fills an intracranial aneurysm with endovascular coils, sometimes with a stent or balloon, so blood no longer circulates in the sac.",
    candidacy:
      "It may be considered when angiography already writes an endovascular rather than open plan for a ruptured or unruptured aneurysm.",
    limits:
      "This is not clipping. Residual filling and later retreatment can occur. The CMS currently tags few coiling-only clinicians; cards must stay empty rather than borrowing a clip list.",
    evaluation:
      "Assessment includes catheter angiography, antiplatelet planning if a stent is likely, and rupture status.",
    technique:
      "From a groin or wrist puncture, a microcatheter is navigated into the aneurysm. Coils are deployed, with stent or balloon assistance if written. The patient recovers with puncture-site and neurological observation.",
    approaches: [
      { label: "Primary coiling", detail: "Used when the neck already holds coils." },
      { label: "Stent- or balloon-assisted coiling", detail: "Antiplatelets and device lines change the episode." },
      { label: "Flow diversion where that is the honest device", detail: "A different implant conversation if written after review." },
    ],
    duration: "Often 1.5–4 hours of angiography time",
    admission: "Shorter than many clip lists if unruptured; stored [STAY] still lengthens after SAH.",
    recovery:
      "Recovery watches the puncture site, delayed ischaemia and, after rupture, vasospasm. Flying waits on neurological stability and the team's antiplatelet plan.",
    risks:
      "Risks include stroke, aneurysm rupture during coiling, coil migration, puncture-site bleeding, residual aneurysm and need for retreatment or later clipping.",
    urgent: "new weakness, severe headache, groin swelling or decreasing consciousness",
    drivers: [
      { label: "Coil and stent inventory", detail: "Device count is a material line, not a brochure coil number." },
      { label: "Rupture status", detail: "SAH ICU dominates an otherwise endovascular day." },
      { label: "Antiplatelet protocol", detail: "Stent-assisted work needs medicines that change bleed risk." },
      { label: "Need for retreatment", detail: "A second coiling is another invoice." },
      { label: "Conversion or rescue clipping", detail: "An open finish is a different slug." },
    ],
    inclusions: [...commonInclusions, { label: "Listed coils and access", detail: "Stents and flow diverters only if named." }],
    exclusions: [...commonExclusions, { label: "Unplanned extra coils or stents", detail: "Inventory beyond the written count is extra." }],
    records: ["Catheter angiogram", "Rupture status", "Antiplatelet history"],
    followUp: "Follow-up angiography or MRA timing is named; residual filling is not a personal failure.",
    quoteQuestions: ["How many coils and which stents are assumed?", "Is this ruptured or unruptured?", "Is follow-up angiography included?"],
    related: ["Aneurysm Clipping", "Stroke Thrombectomy", "AVM Embolization"],
    campusFocus: "Cards may stay nearly empty; do not borrow clipping faculty to imply a coiling list.",
    imageAlts: [
      "Medical illustration of an intracranial aneurysm being approached by a microcatheter from the arterial tree",
      "Clinical diagram of coil embolization of an aneurysm with optional stent assistance",
      "Aneurysm-coiling recovery pathway showing puncture-site care, neurological checks and follow-up angiography",
    ],
  },
  {
    procedure: "AVM Surgery",
    shortName: "AVM surgery",
    specialist: "cerebrovascular or AVM neurosurgeon",
    definition:
      "AVM surgery microsurgically disconnects and removes an arteriovenous malformation so arterial blood no longer shunts directly into veins.",
    candidacy:
      "It may be considered after haemorrhage or for selected unruptured AVMs when grade, location and a multidisciplinary review favour resection over embolization or radiosurgery.",
    limits:
      "This is not embolization and not Gamma Knife. Spetzler-Martin grade is a discussion aid, not a price list. Complete removal is not always honest.",
    evaluation:
      "Assessment includes catheter angiography, MRI and whether staged embolization should precede resection.",
    technique:
      "A craniotomy exposes the nidus. Feeders are disconnected, the nidus is removed and draining veins are taken last. Intraoperative angiography may confirm clearance.",
    approaches: [
      { label: "Microsurgical AVM resection", detail: "The named CMS product when an open list is honest." },
      { label: "Resection after staged embolization", detail: "Two invoices if embolization is a separate sitting." },
      { label: "Observation or radiosurgery instead", detail: "Neighbouring GK/SRS sheets when surgery is not the first plan." },
    ],
    duration: "Often 4–10 hours depending on grade and location",
    admission: "Neuro-ICU then ward; stored [STAY] is a major vascular band.",
    recovery:
      "Recovery watches delayed swelling or haemorrhage, seizures and neurological function. Flying waits on a stable examination and wound review.",
    risks:
      "Risks include bleeding, stroke, seizures, normal-perfusion-pressure breakthrough, incomplete removal, infection and need for further embolization or radiosurgery.",
    urgent: "sudden headache, new weakness, seizure or decreasing consciousness",
    drivers: [
      { label: "Spetzler-Martin grade and eloquence", detail: "A small silent AVM is not a grade-V list." },
      { label: "Prior haemorrhage", detail: "A ruptured field changes ICU risk." },
      { label: "Staged embolization", detail: "A separate endovascular sitting if used." },
      { label: "Intraoperative angiography", detail: "An extra imaging line." },
      { label: "Need for later radiosurgery", detail: "Residual nidus is a different product." },
    ],
    inclusions: [...commonInclusions, { label: "Listed nidus resection", detail: "Preoperative embolization only if written." }],
    exclusions: [...commonExclusions, { label: "Separate embolization sitting", detail: "AVM embolization is a neighbouring slug." }],
    records: ["Catheter angiogram", "MRI of the nidus", "Haemorrhage history"],
    followUp: "Follow-up angiography looks for residual nidus; seizures and rehabilitation are individualized.",
    quoteQuestions: ["Is preoperative embolization included?", "What grade is being assumed?", "Is intraoperative angiography included?"],
    related: ["AVM Embolization", "Aneurysm Clipping", "Stereotactic Brain Surgery"],
    campusFocus: "Name a cerebrovascular list that actually resects AVMs; radiosurgery remains a shared radiation product.",
    imageAlts: [
      "Medical illustration of a cerebral AVM nidus with feeding arteries and draining veins",
      "Clinical diagram of microsurgical AVM resection after craniotomy, taking feeders before the draining vein",
      "AVM-surgery recovery pathway showing ICU haemorrhage watch, angiography confirmation and travel clearance",
    ],
  },
  {
    procedure: "AVM Embolization",
    shortName: "AVM embolization",
    specialist: "neurovascular interventional specialist",
    definition:
      "AVM embolization delivers liquid embolic or particles through a microcatheter to reduce or, in selected cases, close an arteriovenous malformation.",
    candidacy:
      "It may be considered as a prelude to surgery or radiosurgery, or as targeted treatment of a high-risk feature, after angiography already writes an endovascular step.",
    limits:
      "This is not open AVM surgery and not a promise of complete cure in one sitting. The CMS currently has no verified clinician cards for this slug.",
    evaluation:
      "Assessment includes catheter angiography, the goal — nidal reduction versus cure — and how many stages are already expected.",
    technique:
      "From arterial access, a microcatheter is navigated into selected feeders. Embolic agent is injected under continuous imaging. Neurological status is checked after the sitting.",
    approaches: [
      { label: "Preoperative nidal reduction", detail: "A planned first stage before open resection." },
      { label: "Targeted embolization of a high-risk feature", detail: "Aneurysms on feeders or a bleeding point." },
      { label: "Attempted curative embolization", detail: "Only when angioarchitecture already allows it." },
    ],
    duration: "Often 2–5 hours per stage",
    admission: "Usually shorter than open AVM surgery; stored [STAY] is per stage, not for a whole treatment course.",
    recovery:
      "Recovery watches delayed ischaemia or haemorrhage and the puncture site. Flying waits on neurological stability after each stage.",
    risks:
      "Risks include stroke, haemorrhage, catheter retention, incomplete closure, skin or cranial-nerve injury from aberrant embolic and need for further stages or surgery.",
    urgent: "sudden headache, new deficit, groin swelling or seizure",
    drivers: [
      { label: "Number of stages", detail: "A three-stage plan is not one package night." },
      { label: "Embolic-agent volume", detail: "Onyx or similar agents are material lines." },
      { label: "Goal — reduction versus cure", detail: "The invoice should name the goal." },
      { label: "Later surgery or radiosurgery", detail: "Neighbouring slugs if those sittings follow." },
      { label: "Ruptured versus unruptured timing", detail: "Acute haemorrhage changes ICU use." },
    ],
    inclusions: [...commonInclusions, { label: "Listed embolization stage", detail: "Only the stated feeders and agent volume." }],
    exclusions: [...commonExclusions, { label: "Further stages", detail: "A second sitting is another invoice unless written." }],
    records: ["Catheter angiogram", "Staged-treatment plan", "Haemorrhage history"],
    followUp: "Each stage needs an explicit next angiogram or surgical date; this page does not schedule a course.",
    quoteQuestions: ["How many stages are assumed?", "Is this preoperative reduction or attempted cure?", "Which embolic agent is quoted?"],
    related: ["AVM Surgery", "Aneurysm Coiling", "Aneurysm Clipping"],
    campusFocus: "Cards must remain empty until a verified embolization mapping exists; do not borrow AVM-surgery faculty.",
    imageAlts: [
      "Medical illustration of an AVM nidus with a microcatheter in a feeding artery ready for embolization",
      "Clinical diagram of liquid-embolic injection into selected AVM feeders under angiography",
      "AVM-embolization recovery pathway showing stage review, neurological checks and next-sitting planning",
    ],
  },
  {
    procedure: "Stroke Thrombectomy",
    shortName: "stroke thrombectomy",
    specialist: "neurovascular interventional specialist",
    definition:
      "Stroke thrombectomy retrieves clot from a large intracranial artery during acute ischaemic stroke when imaging already shows an occlusion that endovascular removal may reopen.",
    candidacy:
      "It may be considered for selected large-vessel occlusions within a time or tissue window after CTA or perfusion imaging, not as an elective tourist procedure.",
    limits:
      "This is not cerebral bypass and not IV thrombolysis alone. The Neurology filter also lists this slug; this page is the neurosurgery/endovascular sitting. Time-critical stroke is a poor first international experiment.",
    evaluation:
      "Assessment is hyperacute: NIHSS, last-known-well, CTA or angiogram, ASPECTS or perfusion, and whether IV thrombolysis has already been given.",
    technique:
      "From arterial access, a stent retriever or aspiration catheter engages the clot. Recanalization is checked on angiography. The patient recovers in a stroke or neuro-ICU.",
    approaches: [
      { label: "Stent-retriever thrombectomy", detail: "A common first device strategy." },
      { label: "Aspiration thrombectomy", detail: "Used alone or in combination." },
      { label: "Rescue stenting or tandem-lesion work", detail: "A different device and antiplatelet conversation." },
    ],
    duration: "Often 45–150 minutes of angiography time once the team is in theatre",
    admission: "Stroke-ICU stay; stored [STAY] covers the ischaemic-stroke admission, not only the puncture.",
    recovery:
      "Recovery follows stroke rehabilitation, swallow, blood pressure and puncture-site care. Flying is often delayed until the stroke team documents stability.",
    risks:
      "Risks include haemorrhage, vessel injury, reperfusion swelling, incomplete recanalization, puncture-site complications and persistent disability.",
    urgent: "worsening weakness, decreasing consciousness, headache or groin swelling",
    drivers: [
      { label: "Time window and infarct size", detail: "A large completed infarct is not a first-pass success story." },
      { label: "Device strategy", detail: "Retrievers, aspiration and rescue stents are material lines." },
      { label: "IV thrombolysis already given", detail: "Bleed risk and pharmacy lines change." },
      { label: "Stroke-ICU and rehabilitation days", detail: "The puncture is not the whole admission." },
      { label: "Tandem cervical occlusion", detail: "Carotid stenting is extra if needed." },
    ],
    inclusions: [...commonInclusions, { label: "Listed thrombectomy sitting", detail: "ICU and rehab days only as written." }],
    exclusions: [...commonExclusions, { label: "Long-term rehabilitation", detail: "Weeks of therapy after return are usually separate." }],
    records: ["CTA or angiogram", "Last-known-well and NIHSS", "Thrombolysis record if given"],
    followUp: "Stroke secondary prevention, imaging and rehabilitation ownership must be named before departure — if travel is even appropriate.",
    quoteQuestions: ["Is this an elective transfer or a hyperacute sitting?", "Which devices are assumed?", "How many ICU nights are included?"],
    related: ["Cerebral Bypass", "Aneurysm Coiling", "Aneurysm Clipping"],
    campusFocus: "Confirm a 24-hour stroke thrombectomy rota; a scheduled craniotomy list is not this product.",
    imageAlts: [
      "Medical illustration of a large-vessel occlusion in the middle cerebral artery causing acute ischaemic stroke",
      "Clinical diagram of endovascular stent-retriever thrombectomy removing intracranial clot",
      "Stroke-thrombectomy recovery pathway showing ICU monitoring, rehabilitation and secondary-prevention review",
    ],
  },
  {
    procedure: "Cerebral Bypass",
    shortName: "cerebral bypass",
    specialist: "cerebrovascular bypass surgeon",
    definition:
      "Cerebral bypass joins an extracranial artery, often the superficial temporal artery, to an intracranial vessel so blood can reach brain that chronic ischaemia or a complex aneurysm has put at risk.",
    candidacy:
      "It may be considered for selected moyamoya, chronic occlusive disease or complex aneurysms after perfusion imaging already writes a bypass rather than acute thrombectomy.",
    limits:
      "This is not stroke thrombectomy. The CMS currently has no verified clinician cards for this slug. Bypass does not treat every TIA or completed infarct.",
    evaluation:
      "Assessment includes catheter angiography, perfusion studies, and whether direct STA-MCA, indirect synangiosis or a combined plan is honest.",
    technique:
      "Donor and recipient vessels are prepared under the microscope. An anastomosis is sewn, flow is checked, and the patient recovers with strict blood-pressure and graft-patency monitoring.",
    approaches: [
      { label: "Direct STA-MCA bypass", detail: "The usual adult sitting when vessels already allow it." },
      { label: "Indirect synangiosis", detail: "More often discussed in paediatric moyamoya." },
      { label: "Bypass as part of aneurysm trapping", detail: "A combined vascular sitting, not a tourist extra." },
    ],
    duration: "Often 4–8 hours of microsurgery",
    admission: "Neuro-ICU then ward; stored [STAY] assumes graft-patency watch.",
    recovery:
      "Recovery watches graft pulse, blood pressure, seizures and wound. Flying waits on documented patency and neurological stability.",
    risks:
      "Risks include graft occlusion, stroke, bleeding, hyperperfusion, infection, seizure and need for revision.",
    urgent: "sudden weakness, loss of graft pulse, severe headache or seizure",
    drivers: [
      { label: "Direct versus indirect bypass", detail: "Two different theatre days." },
      { label: "Moyamoya versus atherosclerotic indication", detail: "Perfusion risk differs." },
      { label: "Combined aneurysm work", detail: "Trapping plus bypass is not a simple STA-MCA." },
      { label: "Intraoperative flow measurement", detail: "Extra device lines." },
      { label: "Paediatric versus adult list", detail: "Anaesthesia and ICU change." },
    ],
    inclusions: [...commonInclusions, { label: "Listed anastomosis", detail: "Only the stated donor and recipient." }],
    exclusions: [...commonExclusions, { label: "Revision for graft occlusion", detail: "A second sitting is another invoice." }],
    records: ["Catheter angiogram", "Perfusion imaging", "TIA or haemorrhage history"],
    followUp: "Follow-up imaging of graft patency and blood-pressure targets must be named.",
    quoteQuestions: ["Is this direct STA-MCA or indirect synangiosis?", "Is intraoperative flowmetry included?", "What happens if the graft occludes?"],
    related: ["Stroke Thrombectomy", "Aneurysm Clipping", "AVM Surgery"],
    campusFocus: "Cards must remain empty until a verified bypass mapping exists; do not borrow thrombectomy or clip faculty.",
    imageAlts: [
      "Medical illustration of chronic intracranial ischaemia and the superficial temporal artery used as a bypass donor",
      "Clinical diagram of STA-MCA cerebral bypass anastomosis on the brain surface",
      "Cerebral-bypass recovery pathway showing graft-patency checks, blood-pressure control and travel clearance",
    ],
  },
  {
    procedure: "Deep Brain Stimulation",
    shortName: "deep brain stimulation",
    specialist: "functional neurosurgeon",
    definition:
      "Deep brain stimulation implants electrodes in a selected brain target and connects them to a pulse generator so Parkinson disease, tremor or dystonia can be modulated after a named functional-neurosurgery review.",
    candidacy:
      "It may be considered when medicines no longer hold motor symptoms, cognition and imaging already support a target, and a multidisciplinary team judges DBS rather than lesioning or focused ultrasound.",
    limits:
      "This is not a cure and not a brochure battery count. The Neurology filter also lists this slug. Programming is lifelong. Laterality and target are decided after records, not from a package name.",
    evaluation:
      "Assessment includes diagnosis confirmation, levodopa response where relevant, MRI, neuropsychological testing and whether a staged or same-day IPG is planned.",
    technique:
      "Electrodes are placed with stereotactic guidance, sometimes with microelectrode recording or asleep imaging confirmation. Leads are tunnelled to a chest or abdominal pulse generator. Programming starts after swelling settles.",
    approaches: [
      { label: "STN or GPi DBS for Parkinson disease", detail: "Target choice is clinical, not a consumer upgrade." },
      { label: "Vim or other tremor targets", detail: "A different circuit if tremor is the brief." },
      { label: "Staged versus same-day IPG", detail: "Two anaesthetics change the invoice if staged." },
    ],
    duration: "Often 3–7 hours depending on laterality and recording",
    admission: "Usually a few nights; stored [STAY] is not the programming course.",
    recovery:
      "Recovery includes lead-site care, IPG-site care and a first programming visit. Flying waits on wound review and the team's stimulation plan.",
    risks:
      "Risks include haemorrhage, infection, lead malposition, hardware failure, stimulation-side effects, mood or speech change and need for revision.",
    urgent: "fever at the IPG, sudden loss of benefit, new weakness or wound drainage",
    drivers: [
      { label: "Laterality", detail: "Bilateral leads are not a unilateral package." },
      { label: "Device model and rechargeability", detail: "IPG choice is a material line." },
      { label: "Microelectrode recording time", detail: "Awake mapping lengthens theatre." },
      { label: "Programming visits", detail: "Often excluded after discharge." },
      { label: "Battery replacement years later", detail: "A separate sitting." },
    ],
    inclusions: [...commonInclusions, { label: "Listed leads and IPG", detail: "Only the named laterality and generator." }],
    exclusions: [...commonExclusions, { label: "Long-term programming and replacement", detail: "Years of clinic visits are outside most theatre packages." }],
    records: ["Movement-disorder diagnosis notes", "MRI", "Levodopa-challenge or tremor video if used", "Neuropsychology report"],
    followUp: "A named programmer must exist after return; this page does not provide remote stimulation recipes.",
    quoteQuestions: ["Is the IPG included?", "Is this unilateral or bilateral?", "How many programming visits are included?"],
    related: ["Stereotactic Brain Surgery", "Epilepsy Surgery", "Stereotactic Brain Biopsy"],
    campusFocus: "Name a functional-neurosurgery list and a programmer; a general craniotomy brand is not a DBS service.",
    imageAlts: [
      "Medical illustration of deep-brain-stimulation targets in the basal ganglia and the planned electrode paths",
      "Clinical diagram of DBS lead placement and connection to a chest pulse generator",
      "DBS recovery pathway showing wound care, first programming visit and long-term follow-up",
    ],
  },
  {
    procedure: "Epilepsy Surgery",
    shortName: "epilepsy surgery",
    specialist: "epilepsy neurosurgeon",
    definition:
      "Epilepsy surgery removes, disconnects or modulates the brain region generating seizures when video-EEG and MRI already write an operation rather than medicines alone.",
    candidacy:
      "It may be considered for drug-resistant epilepsy after a named epilepsy-monitoring work-up, not after a single seizure or an unread MRI.",
    limits:
      "This is not a promise of seizure freedom. Neighbouring stereotactic and DBS slugs cover other trajectory or stimulation work. VNS lives on the Neurology sheet if that is the honest device.",
    evaluation:
      "Assessment includes video-EEG, MRI, sometimes PET or SPECT, neuropsychological testing and whether a resective, disconnective or neuromodulation plan is honest.",
    technique:
      "If resection is planned, a craniotomy exposes the zone — often temporal — and the tissue is removed under mapping. Alternative sittings include hemispheric disconnection or implantation of monitoring or stimulation hardware.",
    approaches: [
      { label: "Anterior temporal lobectomy or selective amygdalohippocampectomy", detail: "Common when mesial temporal sclerosis is the brief." },
      { label: "Extra-temporal resection after invasive monitoring", detail: "Grid or SEEG sittings are extra stages." },
      { label: "Disconnective or hemispheric surgery", detail: "A different paediatric or catastrophic-epilepsy conversation." },
    ],
    duration: "Resection often 3–7 hours; invasive monitoring adds days",
    admission: "Stored [STAY] covers the named sitting, not a two-week SEEG admission unless written.",
    recovery:
      "Recovery watches seizures, wound, mood and memory counselling. Flying waits on seizure control and wound review.",
    risks:
      "Risks include memory or language change, visual-field defect, infection, bleeding, incomplete seizure control, need for further surgery and medication continuation.",
    urgent: "cluster seizures, fever, CSF leak or new weakness",
    drivers: [
      { label: "Resective versus invasive-monitoring first", detail: "SEEG or grids are a separate admission." },
      { label: "Temporal versus extra-temporal zone", detail: "Mapping time differs." },
      { label: "Paediatric versus adult list", detail: "PICU and family lodging change the trip." },
      { label: "Need for later neuromodulation", detail: "DBS or VNS is another product." },
      { label: "Neuropsychology and rehab", detail: "Often excluded after discharge." },
    ],
    inclusions: [...commonInclusions, { label: "Listed resective or named sitting", detail: "SEEG days only if written." }],
    exclusions: [...commonExclusions, { label: "Invasive-monitoring admission", detail: "A grid or SEEG week is another invoice." }],
    records: ["Video-EEG report", "Epilepsy-protocol MRI", "Neuropsychology", "Medicine list"],
    followUp: "Seizure diary, medicines and a named epileptologist after return must be planned before travel.",
    quoteQuestions: ["Is SEEG included?", "Is this temporal lobectomy or another resection?", "Are neuropsychology visits included?"],
    related: ["Stereotactic Brain Surgery", "Deep Brain Stimulation", "Endoscopic Brain Surgery"],
    campusFocus: "Name an epilepsy-monitoring unit and a surgeon who resect; a generic seizure clinic is not this sheet.",
    imageAlts: [
      "Medical illustration of a mesial temporal seizure focus and the hippocampus targeted in epilepsy surgery",
      "Clinical diagram of temporal-lobe resection or disconnection used for drug-resistant epilepsy",
      "Epilepsy-surgery recovery pathway showing seizure watch, medicine review and travel clearance",
    ],
  },
  {
    procedure: "Stereotactic Brain Surgery",
    shortName: "stereotactic brain surgery",
    specialist: "stereotactic or functional neurosurgeon",
    definition:
      "Stereotactic brain surgery reaches a deep target along a planned trajectory for biopsy, lesioning, lead placement or other named work that is not radiosurgery.",
    candidacy:
      "It may be considered when imaging already writes a precise path and the honest product is a trajectory rather than an open craniotomy or a Gamma Knife sitting.",
    limits:
      "This is not SRS, Gamma Knife or CyberKnife — those remain shared radiation-oncology slugs. It is not automatically DBS; that neighbouring slug names the implant.",
    evaluation:
      "Assessment includes MRI suitable for fusion, the named purpose — biopsy, lesion or lead — and whether a frame is required.",
    technique:
      "After registration, a small opening admits the probe, electrode or lesioning device along the planned path. Confirmation imaging may be obtained before closure.",
    approaches: [
      { label: "Stereotactic biopsy", detail: "Neighbouring dedicated biopsy slug when sampling is the only product." },
      { label: "Stereotactic lesioning", detail: "Selected functional indications when that is still the honest plan." },
      { label: "Trajectory for lead or catheter", detail: "DBS or drainage hardware is named on the estimate." },
    ],
    duration: "Often 1–4 hours depending on the named payload",
    admission: "Usually short; stored [STAY] is not a craniotomy week.",
    recovery:
      "Recovery watches tract haemorrhage and the function that the sitting was meant to change. Flying waits on a stable examination.",
    risks:
      "Risks include bleeding, infection, malposition, incomplete effect, neurological deficit and need for another trajectory or an open operation.",
    urgent: "sudden weakness, decreasing consciousness, seizure or fever",
    drivers: [
      { label: "What travels down the trajectory", detail: "Biopsy, lesion and lead are different invoices." },
      { label: "Frame versus frameless guidance", detail: "Device lines differ." },
      { label: "Confirmation imaging", detail: "Intraoperative MRI or CT may be extra." },
      { label: "Functional mapping time", detail: "Awake testing lengthens the list." },
      { label: "Confusion with radiosurgery", detail: "SRS is a different CMS product." },
    ],
    inclusions: [...commonInclusions, { label: "Listed trajectory and payload", detail: "The estimate must name biopsy, lesion or lead." }],
    exclusions: [...commonExclusions, { label: "A radiosurgery sitting", detail: "GK, CyberKnife and SRS stay on radiation sheets." }],
    records: ["MRI for fusion", "Named purpose of the trajectory", "Prior stereotactic notes"],
    followUp: "Follow-up depends on the payload — pathology, lesion effect or lead programming.",
    quoteQuestions: ["Is this biopsy, lesioning or lead placement?", "Is confirmation imaging included?", "Is a frame assumed?"],
    related: ["Stereotactic Brain Biopsy", "Deep Brain Stimulation", "Epilepsy Surgery"],
    campusFocus: "Refuse a generic stereotactic package; the quotation must name the payload before anyone books flights.",
    imageAlts: [
      "Medical illustration of a stereotactic frame or frameless system aiming a probe at a deep brain target",
      "Clinical diagram of stereotactic brain surgery delivering a biopsy needle, lesion or lead along a planned path",
      "Stereotactic-brain-surgery recovery pathway showing tract-bleed watch, purpose-specific follow-up and travel clearance",
    ],
  },
  {
    procedure: "Hydrocephalus Surgery",
    shortName: "hydrocephalus surgery",
    specialist: "paediatric or CSF-pathway neurosurgeon",
    definition:
      "Hydrocephalus surgery treats excess cerebrospinal fluid, most often by placing a ventriculoperitoneal shunt, when imaging already writes diversion rather than medicines alone.",
    candidacy:
      "It may be considered for obstructive or communicating hydrocephalus with symptoms or imaging progression after a named neurosurgeon reviews whether ETV is still an alternative.",
    limits:
      "This is not ETV. A shunt is a lifelong device with blockage and infection risk. Neighbouring ETV is the first conversation when anatomy still allows a stoma.",
    evaluation:
      "Assessment includes MRI or CT of ventricles, cause — tumour, haemorrhage, infection, idiopathic — and whether a programmable valve is already expected.",
    technique:
      "A ventricular catheter is placed, connected to a valve and tunnelled to the peritoneum or another terminus. Intraoperative confirmation and a post-operative scan may be obtained.",
    approaches: [
      { label: "Ventriculoperitoneal shunt", detail: "The usual first diversion." },
      { label: "Programmable-valve shunt", detail: "A device line and later adjustment visits." },
      { label: "Revision of a blocked or infected shunt", detail: "A different sitting from a first implant." },
    ],
    duration: "Often 1–2 hours for a first VP shunt",
    admission: "Stored [STAY] covers infection and function watch, not only theatre minutes.",
    recovery:
      "Recovery watches fontanelle or headache, fever, abdominal pain and shunt function. Flying waits on a working device and wound review.",
    risks:
      "Risks include blockage, infection, over- or under-drainage, abdominal injury, seizure and need for repeated revisions across life.",
    urgent: "fever, redness along the tubing, drowsiness, vomiting or a tense fontanelle in a child",
    drivers: [
      { label: "First implant versus revision", detail: "An infected shunt is not a first VP price." },
      { label: "Valve type", detail: "Programmable valves add device and clinic costs." },
      { label: "Cause of hydrocephalus", detail: "Tumour-related lists may need a second oncologic sitting." },
      { label: "Paediatric versus adult ICU", detail: "Family lodging is rarely inside the package." },
      { label: "Whether ETV was still possible", detail: "A missed ETV conversation is not a cheaper shunt." },
    ],
    inclusions: [...commonInclusions, { label: "Listed shunt and valve", detail: "Only the named terminus and valve." }],
    exclusions: [...commonExclusions, { label: "Later revisions and adjustments", detail: "Lifelong blockage risk is not a prepaid package." }],
    records: ["Ventricular MRI or CT", "Cause of hydrocephalus", "Prior shunt or ETV notes"],
    followUp: "A named clinician must exist for blockage or fever after return; families need written warning signs.",
    quoteQuestions: ["Is a programmable valve included?", "Is this a first shunt or a revision?", "Was ETV discussed?"],
    related: ["Endoscopic Third Ventriculostomy (ETV)", "Chiari Surgery", "Endoscopic Brain Surgery"],
    campusFocus: "Name who revises shunts after hours; a daytime theatre that places a tube without on-call cover is not this sheet.",
    imageAlts: [
      "Medical illustration of enlarged cerebral ventricles in hydrocephalus and the planned ventricular catheter path",
      "Clinical diagram of ventriculoperitoneal shunt placement from the ventricle through a valve to the abdomen",
      "Hydrocephalus-surgery recovery pathway showing shunt-function checks, infection watch and travel clearance",
    ],
  },
  {
    procedure: "Endoscopic Third Ventriculostomy (ETV)",
    shortName: "endoscopic third ventriculostomy",
    specialist: "neuroendoscopy or paediatric neurosurgeon",
    definition:
      "Endoscopic third ventriculostomy opens a stoma in the floor of the third ventricle so CSF can bypass an obstruction without a first shunt, when anatomy already allows it.",
    candidacy:
      "It may be considered for selected obstructive hydrocephalus — aqueduct stenosis or some tumours — after MRI shows a workable third-ventricle floor.",
    limits:
      "This is not a VP shunt and not a guarantee that a shunt will never be needed. The CMS currently has no verified clinician cards for this slug. Failure can present as recurrent raised pressure.",
    evaluation:
      "Assessment includes MRI of the aqueduct and prepontine space, age, and whether a prior shunt already complicates the anatomy.",
    technique:
      "Through a frontal burr hole the endoscope enters the lateral then third ventricle. A stoma is created in the floor and inspected for flow. Closure and a short observation period follow.",
    approaches: [
      { label: "Primary ETV", detail: "Used when the floor and cistern already look workable." },
      { label: "ETV after shunt failure", detail: "A different sitting; residual hardware may stay or come out." },
      { label: "ETV plus choroid-plexus work or biopsy", detail: "Extra time if a tumour is sampled in the same corridor." },
    ],
    duration: "Often 45–120 minutes when the anatomy cooperates",
    admission: "Usually shorter than shunt revision for infection; stored [STAY] still includes failure watch.",
    recovery:
      "Recovery watches delayed ETV failure — often headache, vomiting or drowsiness. Flying waits on a documented period of stability.",
    risks:
      "Risks include bleeding, hypothalamic or basilar-artery injury, infection, stoma closure, need for a shunt and, rarely, serious neurological injury.",
    urgent: "drowsiness, vomiting, tense fontanelle or sudden collapse after an initially good interval",
    drivers: [
      { label: "Age and ETV success likelihood", detail: "Young infants fail more often; that is a clinical, not a price, fact." },
      { label: "Prior shunt", detail: "Hardware and adhesions change the sitting." },
      { label: "Need for simultaneous biopsy", detail: "A tumour sample is extra pathology." },
      { label: "Conversion to shunt", detail: "An unsuccessful stoma may become a VP shunt the same admission." },
      { label: "Paediatric ICU", detail: "Family lodging is usually extra." },
    ],
    inclusions: [...commonInclusions, { label: "Listed ETV stoma", detail: "Same-admission shunt only if written." }],
    exclusions: [...commonExclusions, { label: "Later shunt after ETV failure", detail: "A delayed VP shunt is another invoice." }],
    records: ["MRI showing aqueduct and third-ventricle floor", "Age and prior shunt history", "Cause of obstruction"],
    followUp: "Families need written failure signs; a delayed collapse after a ‘successful’ ETV is a recognised pattern.",
    quoteQuestions: ["What happens if ETV fails in the same admission?", "Is a backup shunt included?", "Is this a first ETV or after shunt failure?"],
    related: ["Hydrocephalus Surgery", "Endoscopic Brain Surgery", "Chiari Surgery"],
    campusFocus: "Cards must remain empty until a verified ETV mapping exists; do not borrow a generic hydrocephalus-shunt card.",
    imageAlts: [
      "Medical illustration of obstructive hydrocephalus and the third-ventricle floor targeted in ETV",
      "Clinical diagram of an endoscope creating a stoma in the third-ventricle floor to bypass aqueduct obstruction",
      "ETV recovery pathway showing delayed-failure watch, wound care and travel clearance",
    ],
  },
  {
    procedure: "Chiari Surgery",
    shortName: "Chiari surgery",
    specialist: "Chiari or paediatric neurosurgeon",
    definition:
      "Chiari surgery decompresses the foramen magnum, usually by removing a small area of bone and sometimes opening the dura, so cerebellar tonsils have more room and CSF can flow.",
    candidacy:
      "It may be considered for symptomatic Chiari I — headache, syrinx, or neurological signs — after MRI already writes decompression rather than observation.",
    limits:
      "This is not a cosmetic cranioplasty and not automatic syrinx shunting. Headache that is not Chiari-related will not be fixed by bone removal.",
    evaluation:
      "Assessment includes MRI of the craniocervical junction and whole spine for syrinx, and whether hydrocephalus should be treated first.",
    technique:
      "The patient is prone. Suboccipital bone and often the C1 arch are removed. Dura may be opened and patched. The team watches CSF leak and neurological status afterwards.",
    approaches: [
      { label: "Bony decompression alone", detail: "Selected when the team judges dura opening unnecessary." },
      { label: "Decompression with duraplasty", detail: "The more common sitting when a syrinx or tight dura is the brief." },
      { label: "Combined hydrocephalus treatment", detail: "Shunt or ETV first if raised pressure is the driver." },
    ],
    duration: "Often 2–4 hours",
    admission: "Stored [STAY] includes CSF-leak and pain control, not a tourist weekend.",
    recovery:
      "Recovery includes neck-wound care, headache pattern review and activity limits. Flying waits on leak status and pain control.",
    risks:
      "Risks include CSF leak, infection, persistent symptoms, craniocervical instability, haemorrhage and need for further decompression or hydrocephalus treatment.",
    urgent: "clear wound drainage, fever, new weakness or severe neck swelling",
    drivers: [
      { label: "Dura opening versus bone-only", detail: "Duraplasty adds leak risk and graft lines." },
      { label: "Syrinx presence", detail: "Does not automatically add a syrinx shunt." },
      { label: "Paediatric versus adult anatomy", detail: "PICU and family lodging change the trip." },
      { label: "Prior posterior-fossa surgery", detail: "Revision is a hostile field." },
      { label: "Need to treat hydrocephalus first", detail: "A neighbouring slug if that is the honest first step." },
    ],
    inclusions: [...commonInclusions, { label: "Listed foramen-magnum decompression", detail: "Duraplasty only if written." }],
    exclusions: [...commonExclusions, { label: "Syrinx shunt or later fusion", detail: "Additional products if instability or syrinx persists." }],
    records: ["Craniocervical MRI", "Spine MRI for syrinx", "Symptom timeline"],
    followUp: "Follow-up MRI of the syrinx and symptom review are named; persistent headache needs an honest differential.",
    quoteQuestions: ["Is duraplasty included?", "Is a syrinx shunt assumed?", "Was hydrocephalus excluded?"],
    related: ["Hydrocephalus Surgery", "Craniosynostosis Surgery", "Endoscopic Third Ventriculostomy (ETV)"],
    campusFocus: "Confirm posterior-fossa experience and CSF-leak backup; a generic spine list is not Chiari decompression.",
    imageAlts: [
      "Medical illustration of Chiari I tonsillar descent through the foramen magnum and a cervical syrinx",
      "Clinical diagram of suboccipital decompression and optional duraplasty for Chiari malformation",
      "Chiari-surgery recovery pathway showing CSF-leak watch, neck-wound care and syrinx imaging follow-up",
    ],
  },
  {
    procedure: "Craniosynostosis Surgery",
    shortName: "craniosynostosis surgery",
    specialist: "paediatric neurosurgeon working with craniofacial colleagues",
    definition:
      "Craniosynostosis surgery releases a prematurely fused skull suture and reshapes the infant vault so the brain has room to grow, after examination and CT already write a reconstructive rather than cosmetic plan.",
    candidacy:
      "It may be considered for single-suture or syndromic craniosynostosis when a paediatric team judges timing, anaesthesia risk and whether endoscopic strip or open vault remodelling is honest.",
    limits:
      "This is a Neurosurgery slug, not a cosmetic cranioplasty brochure. Helmet therapy after endoscopic release is a separate commitment. Syndromic cases may need later midface or airway surgery.",
    evaluation:
      "Assessment includes clinical suture examination, low-dose CT when needed, paediatric anaesthesia fitness, and whether a helmet protocol is already funded after an endoscopic strip.",
    technique:
      "Either a limited endoscopic suturectomy or an open vault remodelling is performed. Blood-loss planning, paediatric ICU and family lodging are part of the episode.",
    approaches: [
      { label: "Endoscopic strip craniectomy with helmet", detail: "Selected young infants; helmet months are usually extra." },
      { label: "Open cranial-vault remodelling", detail: "Used when age or deformity already writes a wider reconstruction." },
      { label: "Syndromic multi-suture work", detail: "Airway and later craniofacial sittings are different invoices." },
    ],
    duration: "Endoscopic lists may be shorter; open vault remodelling is often several hours",
    admission: "Paediatric ICU then ward; stored [STAY] is for the child and a caregiver, not a school-return date.",
    recovery:
      "Recovery includes blood-count watch, wound care and, after endoscopic release, helmet fitting. Flying waits on paediatric-team clearance.",
    risks:
      "Risks include bleeding, transfusion, infection, incomplete correction, need for later revision, helmet non-adherence after endoscopic work and anaesthetic events in infants.",
    urgent: "pallor, fever, wound swelling or reduced responsiveness",
    drivers: [
      { label: "Endoscopic versus open vault", detail: "Two different blood-loss and helmet stories." },
      { label: "Single suture versus syndromic disease", detail: "Airway and later facial surgery change the lifetime bill." },
      { label: "Infant blood-bank readiness", detail: "Transfusion planning is not optional." },
      { label: "Helmet therapy months", detail: "Usually excluded from the theatre package." },
      { label: "Caregiver lodging", detail: "A second adult is required and rarely included." },
    ],
    inclusions: [...commonInclusions, { label: "Listed paediatric vault sitting", detail: "Helmets and later craniofacial work only if written." }],
    exclusions: [...commonExclusions, { label: "Helmet and later midface surgery", detail: "Months of orthosis and syndromic sittings are separate." }],
    records: ["Paediatric neurosurgery notes", "CT if already obtained", "Syndromic work-up if relevant", "Weight and vaccination record"],
    followUp: "Head-shape, development and, after endoscopic work, helmet compliance must be owned by a named paediatric team after return.",
    quoteQuestions: ["Is this endoscopic strip or open vault remodelling?", "Are helmets included?", "Is a paediatric ICU named?"],
    related: ["Chiari Surgery", "Hydrocephalus Surgery", "Endoscopic Brain Surgery"],
    campusFocus: "Name a paediatric ICU and craniofacial colleague on the same campus; an adult cosmetic list is not craniosynostosis surgery.",
    imageAlts: [
      "Medical illustration of an infant skull with a fused cranial suture causing compensatory head-shape change",
      "Clinical diagram comparing endoscopic strip craniectomy and open cranial-vault remodelling for craniosynostosis",
      "Craniosynostosis-surgery recovery pathway showing paediatric ICU monitoring, helmet follow-up and travel clearance",
    ],
  },
];

export const NEUROSURGERY_EXCLUSIVE_PROCEDURES = profiles.map((profile) => profile.procedure);

export const neurosurgeryArticles = profiles.map(createNsArticle);

export const neurosurgeryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  neurosurgeryArticles.map((article) => [article.slug, article]),
);
