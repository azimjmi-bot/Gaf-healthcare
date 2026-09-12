import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { CARDIOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

type CardiologyExclusive = Exclude<
  (typeof CARDIOLOGY_PROCEDURES)[number],
  "TAVR/TAVI (Transcatheter Aortic Valve Replacement)"
>;

type CardiologyProfile = {
  procedure: CardiologyExclusive;
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
  related: string[];
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
      "Delhi, Gurugram, Noida and Faridabad are separate cardiac corridors. Confirm the exact cath-lab or device campus before booking because a cross-NCR transfer soon after contrast, sedation or a new implant can be difficult.",
    lodging:
      "Choose flexible lodging near the named campus with lift access, a companion bed and a way to reach the CCU or device clinic quickly.",
    recovery:
      "Winter air pollution and summer heat can affect outdoor walking after a procedure. Use indoor mobility and the treating team's fluid and activity advice.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed blood tests, device checks or an urgent return for chest pain or bleeding.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access and a reliable route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make wound or puncture-site care and reliable transport practical parts of discharge planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after angiography, ablation or device implantation.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy and follow-up access.",
    recovery:
      "Milder weather does not remove clot, bleeding or device precautions. Arrange short walks and the first clinical or device review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several cardiac campuses have comparatively direct airport access, but heat, humidity and travel after sedation still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with safe water and easy access for puncture-site or device-wound care.",
    recovery:
      "Heat can worsen dehydration after contrast or diuretics. Fluid and activity targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the cardiac team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after a procedure. Plan hydration, indoor walking and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, device, access route, ICU assumption or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact procedure, stent or device, imaging, ICU allowance, emergency cardiac surgery backup and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish cath-lab capability, device stock, electrophysiology availability or continuity after return.",
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
      "Request a self-pay estimate tied to the actual anatomy, device and monitoring plan rather than a general heart-care package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, implant scope and post-travel device or rhythm follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who programmes a device or reviews rhythm after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, imaging, device and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: CardiologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic cardiology or cath-lab label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader cardiac-care ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, device or access scope, monitoring and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, access or implant plan and route for urgent cardiac reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete cardiac records before non-refundable travel. Remote review can change after examination, repeat imaging or laboratory tests.",
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
          `Ask the provider to name the ${profile.specialist}, campus, access or implant assumptions, imaging, ICU or CCU allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send ECG, imaging, previous procedure reports and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm cath-lab or EP-lab readiness, device stock where relevant and cardiac emergency backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews symptoms, puncture sites or device function and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, imaging, device or stent assumptions, CCU or observation plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `It should name ${profile.procedure}, the clinician and campus, access or implant assumptions, imaging, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createCardiologyArticle(profile: CardiologyProfile): CostArticle {
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
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, device or access scope, monitoring, risks and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, technique, device and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} Selection among ${approachNames} depends on anatomy, rhythm or vessel findings and the treating team's assessment, not on a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, cath-lab or procedure-room time, stated imaging, routine medicines and the listed hospital stay, while extra stents, devices, ICU nights or another procedure depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Emergency treatment, additional lesions or a different implant can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified cardiology team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, access or implant plan and monitoring assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different device, extra vessel, mapping system or prolonged CCU stay describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and device follow-up visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different lesions, devices or monitoring. Compare professional fees, cath-lab or EP-lab time, imaging, implants, ICU or CCU nights, medicines, exclusions and emergency terms.`,
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
        "Suitability depends on individual assessment by a qualified cardiology team. This page cannot diagnose a reader or recommend a personal procedure.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile antiplatelets, anticoagulants, diabetes medicines, contrast allergy, kidney function and infection risk before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report chest pain, fever, bleeding, a new neurological symptom or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Puncture-site care, device-wound care, rhythm monitoring and activity limits are individualized. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — a vessel, valve, septum, rhythm circuit or pacing indication — from other cardiac disease that may still need medicines, rehabilitation or another procedure.",
          "No page can promise symptom relief, arrhythmia freedom, vessel patency or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on heart function, kidney function, prior procedures, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for emergency access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure time, hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms mobility, puncture-site or device stability and travel fitness.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, device follow-up and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, medicines and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, access or implant, imaging, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, ECG, blood tests or imaging only when clinically indicated before final consent." },
        { label: "Procedure and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the procedure report, device card where relevant and follow-up plan.` },
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
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe mobility, puncture-site or device care and symptom control.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests including kidney function where relevant",
      "ECG and any available echocardiogram, angiography, CT or electrophysiology reports",
      "Previous cardiac procedure, device or surgery notes and implant cards",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, access or implant, imaging, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, device, emergency timing, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic cardiology entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, hospital cath-lab or EP-lab services and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, emergency cardiac backup, device traceability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable acute illness, inadequate records, unmanaged kidney or bleeding risk, or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical or alternative interventional options were discussed?`,
      "How were my symptoms, heart function, kidney function and previous procedures assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the procedure occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, ECG, echo, blood tests and advanced imaging are included?",
      "Are specialist, cath-lab or EP-lab, anaesthesia or sedation and recovery-room fees included?",
      "Which stent, valve device, pacemaker, ICD, CRT system or closure device is assumed?",
      "Are manufacturer, model, size and implant-card details provided where applicable?",
      "How many additional stents, leads or devices would change the quotation?",
      "How many ward, CCU or ICU nights and which room category are included?",
      "How are extra nights, emergency surgery, another vessel or a complication billed?",
      "Which antiplatelets, anticoagulants and discharge medicines are included?",
      "What contrast, kidney-protection or allergy plan applies?",
      "What puncture-site, device-wound or rhythm instructions apply after discharge?",
      "When can I walk, work, fly and resume other activity?",
      "Which follow-up visits, device interrogations or rhythm reviews are included?",
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
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, device, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is cardiology treatment in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, device, imaging, monitoring and follow-up.",
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
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant cardiac ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews medicines, wounds or device function.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and cardiac centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general cardiology, cath-lab or accreditation label does not establish current case acceptance, device stock, emergency backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/cardiology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/cardiology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on imaging and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/cardiology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named cardiology consultation, records review and procedure-focused examination when explicitly listed." },
  { label: "Procedure episode", detail: "Specialist, cath-lab or EP-lab time, standard equipment and recovery-room care within the written scope." },
  { label: "Imaging and tests", detail: "Stated ECG, blood tests and listed cardiac imaging only; unlisted CT, MRI or intravascular imaging is extra." },
  { label: "Routine aftercare", detail: "Standard medicines, puncture-site or wound care and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, procedure report and device or implant card where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "Additional vessels, lesions, devices, mapping time or a different procedure found after arrival." },
  { label: "Complications", detail: "Unplanned tests, emergency treatment, surgery, prolonged ICU or CCU stay or readmission unless expressly covered." },
  { label: "Premium devices", detail: "A different stent, valve, pacemaker, ICD, CRT system or closure device from the one written in the estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, rehabilitation, remote monitoring or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: CardiologyProfile[] = [
  {
    procedure: "Coronary Angioplasty & Stenting",
    shortName: "coronary angioplasty and stenting",
    specialist: "interventional cardiologist",
    definition:
      "Coronary angioplasty and stenting, also called PCI, uses a catheter, balloon and usually a stent to open a narrowed or blocked coronary artery and restore blood flow to heart muscle.",
    candidacy:
      "It may be considered after angiography shows a flow-limiting stenosis or in selected acute coronary syndromes, when the heart team judges that PCI is appropriate rather than medicines alone or bypass surgery.",
    limits:
      "PCI treats selected coronary narrowings. It does not reverse atherosclerosis, replace risk-factor care or guarantee that every vessel or chronic occlusion can be opened.",
    evaluation:
      "Assessment may include ECG, blood tests, echocardiography, kidney function, antiplatelet planning and coronary angiography. Intravascular imaging is added only when clinically indicated.",
    technique:
      "From a wrist or groin artery, a guide catheter reaches the coronary ostium. A wire crosses the lesion, a balloon dilates it and a stent is often deployed; the number of lesions and stents is decided during the case.",
    approaches: [
      { label: "Balloon angioplasty", detail: "Balloon dilatation without a stent is used selectively when a stent is unsuitable or as a step before stenting." },
      { label: "Drug-eluting stent PCI", detail: "A medicated stent scaffolds the artery and reduces restenosis risk compared with balloon-only treatment in many settings." },
      { label: "Imaging-guided or complex PCI", detail: "Intravascular imaging, rotablation or multivessel work may be required for calcification, bifurcation or long disease." },
    ],
    duration: "Often 30–90 minutes for a straightforward lesion; complex or multivessel PCI can take several hours",
    admission: "Many planned cases use 1–3 nights; acute coronary syndrome, access-site bleeding or kidney injury can extend CCU stay.",
    recovery: "Puncture-site rest, dual antiplatelet therapy and a gradual return to activity are common; flying requires review of bleeding, chest pain and kidney function.",
    risks:
      "Risks include bleeding, vessel injury, contrast-related kidney injury, arrhythmia, stent thrombosis, restenosis, heart attack, stroke, emergency surgery and, in high-risk disease, death.",
    urgent: "chest pain, breathlessness, heavy bleeding, a cold or pulseless limb, stroke symptoms, fever or collapse",
    drivers: [
      { label: "Number of vessels and lesions", detail: "Each additional stenosis changes wires, balloons, stents, time and contrast." },
      { label: "Stent type and count", detail: "Drug-eluting stents and extra stents are major bill lines and must be itemized." },
      { label: "Emergency versus planned PCI", detail: "Primary PCI for myocardial infarction uses different staffing, CCU and medicine assumptions." },
      { label: "Complexity and imaging", detail: "CTO, bifurcation, calcium modification or intravascular imaging change resources." },
      { label: "Kidney function and CCU stay", detail: "Contrast load, access-site complications and heart-failure monitoring alter length of stay." },
    ],
    inclusions: [...commonInclusions, { label: "Stents in the written plan", detail: "Only the number and type of stents expressly listed; extras are separately billed." }],
    exclusions: commonExclusions,
    records: ["ECG and cardiac-enzyme results where available", "Coronary angiography discs or reports", "Echocardiogram and kidney-function tests", "Antiplatelet, anticoagulant and allergy history"],
    followUp: "Follow-up reviews medicines, puncture site, lipids and symptoms; a local cardiologist should supervise dual antiplatelet therapy and secondary prevention.",
    quoteQuestions: ["How many stents and which type are assumed?", "Is intravascular imaging included?", "What is the plan if emergency bypass is required?"],
    related: ["Coronary Angiography", "CTO Angioplasty (Chronic Total Occlusion)", "Peripheral Angioplasty"],
    imageAlts: [
      "Medical illustration of a coronary artery with atherosclerotic narrowing reducing blood flow to heart muscle",
      "Clinical diagram showing catheter access, balloon dilatation and stent placement during coronary angioplasty",
      "PCI recovery pathway showing puncture-site care, dual antiplatelet therapy, CCU monitoring and fitness-to-fly review",
    ],
  },
  {
    procedure: "Coronary Angiography",
    shortName: "coronary angiography",
    specialist: "interventional cardiologist",
    definition:
      "Coronary angiography is a catheter-based X-ray study that uses contrast to map the coronary arteries and show whether significant narrowing is present.",
    candidacy:
      "It may be considered when symptoms, ECG, stress testing or CT findings suggest coronary disease that would change management, or when another cardiac procedure requires a coronary roadmap.",
    limits:
      "Angiography is diagnostic. It does not treat a blockage unless PCI is separately planned and consented, and a normal angiogram does not exclude every form of heart disease.",
    evaluation:
      "Assessment includes history, ECG, kidney function, contrast-allergy review, blood tests and usually echocardiography before deciding whether invasive angiography is the next step.",
    technique:
      "A thin catheter is advanced from the wrist or groin to the coronary ostia. Contrast outlines each artery on fluoroscopy; pressure measurements or PCI may follow only if already planned or urgently required.",
    approaches: [
      { label: "Diagnostic coronary angiography", detail: "Images the arteries to decide medicines, PCI or surgery without treating a lesion in the same sitting unless separately agreed." },
      { label: "Same-sitting PCI", detail: "If a treatable stenosis is found and consent covers it, angioplasty may follow immediately; this is a different episode for costing." },
      { label: "Adjunct physiology or imaging", detail: "Pressure-wire or intravascular imaging is used selectively and should be listed if assumed in the estimate." },
    ],
    duration: "Often 20–60 minutes for a diagnostic study; longer if PCI is added",
    admission: "Many studies are day-care or overnight; kidney disease, access-site issues or unplanned PCI can extend stay.",
    recovery: "Puncture-site rest and hydration matter early; travel fitness depends on access site, contrast load and whether PCI occurred.",
    risks:
      "Risks include bleeding, vessel injury, contrast allergy, kidney injury, arrhythmia, stroke, heart attack and, rarely, the need for emergency treatment.",
    urgent: "chest pain, heavy bleeding, a cold limb, rash with breathing difficulty, reduced urine or collapse",
    drivers: [
      { label: "Diagnostic study versus PCI", detail: "A brochure angiography price does not include unplanned stenting." },
      { label: "Access site and complexity", detail: "Graft angiography, anomalous arteries or difficult access increase time and consumables." },
      { label: "Adjunct tests", detail: "FFR, IVUS or OCT change the bill when used." },
      { label: "Kidney protection", detail: "Hydration protocols and extra observation after contrast may add nights." },
      { label: "Emergency setting", detail: "Unstable presentation uses different staffing and CCU assumptions." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["ECG and symptom timeline", "Prior CT coronary angiogram or stress-test reports", "Kidney-function and contrast-allergy history", "Current antiplatelet and anticoagulant list"],
    followUp: "Follow-up explains the images, whether PCI or surgery is advised, medicine changes and puncture-site care.",
    quoteQuestions: ["Does the estimate include unplanned PCI?", "Are FFR or intravascular imaging included?", "What kidney-protection steps are planned?"],
    related: ["Coronary Angioplasty & Stenting", "CTO Angioplasty (Chronic Total Occlusion)"],
    imageAlts: [
      "Medical illustration of the right and left coronary arteries arising from the aortic root and supplying the heart",
      "Clinical diagram of a catheter in the aortic root injecting contrast to outline coronary arteries during angiography",
      "Coronary angiography pathway from records and kidney review through imaging, treatment decision and puncture-site recovery",
    ],
  },
  {
    procedure: "Atrial Fibrillation Ablation",
    shortName: "atrial fibrillation ablation",
    specialist: "cardiac electrophysiologist",
    definition:
      "Atrial fibrillation ablation is a catheter procedure that isolates or modifies the electrical triggers of AF, most often around the pulmonary veins, to reduce AF burden in selected patients.",
    candidacy:
      "It may be considered for symptomatic AF when medicines are not tolerated or not preferred, after a structured discussion of stroke prevention, rate or rhythm control and procedural risk.",
    limits:
      "Ablation does not guarantee permanent sinus rhythm, does not replace anticoagulation decisions and is not appropriate solely because AF was recorded once.",
    evaluation:
      "Assessment includes ECG or Holter documentation of AF, echocardiography, stroke-risk review, anticoagulation plan and often CT or MRI of the left atrium before mapping.",
    technique:
      "Catheters enter the heart from the veins. After transseptal access, a mapping system guides pulmonary-vein isolation using radiofrequency, cryoballoon or another energy source selected by the electrophysiologist.",
    approaches: [
      { label: "Radiofrequency pulmonary-vein isolation", detail: "Point-by-point or high-power short-duration RF lesions isolate the veins under 3D mapping." },
      { label: "Cryoballoon isolation", detail: "A balloon delivers freeze lesions at the vein ostia when anatomy is suitable." },
      { label: "Additional substrate ablation", detail: "Selected persistent AF or atrial flutter circuits may need extra lesions; this is not automatic." },
    ],
    duration: "Often 2–4 hours depending on mapping, energy source and additional arrhythmias",
    admission: "Usually 1–3 nights for rhythm and access-site observation; tamponade or stroke symptoms extend monitoring.",
    recovery: "Groin-site rest, a blanking period for residual AF and continued anticoagulation are common; flying requires review of bleeding, rhythm and neurological status.",
    risks:
      "Risks include bleeding, vascular injury, cardiac perforation or tamponade, stroke, pulmonary-vein stenosis, phrenic-nerve injury, atrial-esophageal injury, arrhythmia recurrence and need for another procedure.",
    urgent: "chest pain, severe breathlessness, neurological symptoms, heavy groin bleeding, fever or collapse",
    drivers: [
      { label: "Paroxysmal versus persistent AF", detail: "Longer-standing AF may need more mapping time and additional lesions." },
      { label: "Mapping and energy source", detail: "3D mapping, cryoballoon or pulsed-field systems change consumables." },
      { label: "Transseptal and imaging support", detail: "ICE, TOE or CT integration may be required." },
      { label: "Anticoagulation plan", detail: "Periprocedural anticoagulation and later stroke-prevention medicines affect cost and stay." },
      { label: "Repeat ablation", detail: "Prior ablation, scars and incomplete isolation make a second sitting more complex." },
    ],
    inclusions: [...commonInclusions, { label: "Mapping system", detail: "Only the stated mapping or balloon system; an unlisted energy platform is extra." }],
    exclusions: commonExclusions,
    records: ["ECG or Holter confirming AF", "Echocardiogram and left-atrial imaging", "Anticoagulation and stroke-risk records", "Prior ablation or cardioversion notes"],
    followUp: "Follow-up reviews rhythm, anticoagulation, puncture sites and symptoms during the blanking period; a local EP or cardiology clinic should continue monitoring.",
    quoteQuestions: ["Which energy source and mapping system are assumed?", "Is left-atrial CT or ICE included?", "How is anticoagulation managed around the procedure?"],
    related: ["Radiofrequency Ablation", "ICD Implantation (Implantable Cardioverter-Defibrillator)", "Pacemaker Implantation"],
    imageAlts: [
      "Medical illustration of the left atrium and pulmonary veins where atrial fibrillation triggers commonly arise",
      "Clinical diagram of transseptal catheter mapping and pulmonary-vein isolation during AF ablation",
      "AF ablation recovery pathway showing groin care, rhythm monitoring, anticoagulation review and travel clearance",
    ],
  },
  {
    procedure: "Pacemaker Implantation",
    shortName: "pacemaker implantation",
    specialist: "electrophysiologist or device-trained cardiologist",
    definition:
      "Pacemaker implantation places a pulse generator and leads, usually via a vein under the collarbone, to treat selected slow or paused heart rhythms that do not recover on their own.",
    candidacy:
      "It may be considered for symptomatic bradycardia, high-grade atrioventricular block or other pacing indications after reversible causes such as medicines or electrolyte disturbance are excluded.",
    limits:
      "A pacemaker treats selected conduction problems. It does not treat coronary disease, heart-failure symptoms unrelated to pacing or every palpitation.",
    evaluation:
      "Assessment includes ECG or rhythm monitoring, echocardiography, medicine review and infection screening. Device choice — single-chamber, dual-chamber or another system — follows the indication.",
    technique:
      "Under local anaesthesia with sedation as needed, a pocket is made and leads are placed in the planned chambers, tested and connected to the generator. A chest X-ray and device check follow.",
    approaches: [
      { label: "Single-chamber pacemaker", detail: "Usually a ventricular lead when atrial pacing is not required." },
      { label: "Dual-chamber pacemaker", detail: "Atrial and ventricular leads restore atrioventricular synchrony when indicated." },
      { label: "Leadless system", detail: "A capsule in the ventricle is a different CMS procedure and should not be assumed in a transvenous pacemaker quote." },
    ],
    duration: "Often 45–120 minutes depending on anatomy, leads and testing",
    admission: "Usually 1–3 nights for wound, lead-position and pacing checks; pneumothorax or pocket hematoma can extend stay.",
    recovery: "Arm restrictions on the implant side, wound care and a scheduled device interrogation are typical; flying requires wound and lead stability review.",
    risks:
      "Risks include bleeding or pocket hematoma, infection, lead displacement, pneumothorax, vascular injury, perforation, device malfunction and need for revision.",
    urgent: "wound swelling or discharge, fever, hiccups with dizziness, fainting, chest pain, breathlessness or arm swelling",
    drivers: [
      { label: "Single- versus dual-chamber device", detail: "Lead count and generator type are major cost lines." },
      { label: "MRI-conditional features", detail: "Specified generators and leads change the device invoice." },
      { label: "Anatomy and venous access", detail: "Occluded veins or prior devices increase time and may require extraction expertise." },
      { label: "Infection-prevention protocol", detail: "Antibiotics, pocket management and possible antibiotic envelope use should be explicit." },
      { label: "Follow-up clinic", detail: "Interrogation visits and remote monitoring may sit outside the implant package." },
    ],
    inclusions: [...commonInclusions, { label: "Named pacemaker system", detail: "Only the stated generator and lead configuration; upgrades are extra." }],
    exclusions: commonExclusions,
    records: ["ECG or Holter showing the pacing indication", "Echocardiogram", "Medicine list including rate-slowing drugs", "Prior device or central-line history"],
    followUp: "Follow-up checks the pocket, lead thresholds, battery and programming; a device clinic at home must be identified before travel.",
    quoteQuestions: ["Is a single- or dual-chamber system assumed?", "Which generator and lead models are included?", "Who will interrogate the device after I return home?"],
    related: ["Leadless Pacemaker Implantation", "ICD Implantation (Implantable Cardioverter-Defibrillator)", "CRT/CRT-D Implantation"],
    imageAlts: [
      "Medical illustration of the heart's conduction system and chambers relevant to bradycardia pacing",
      "Clinical diagram of a transvenous pacemaker generator with leads in the right atrium and right ventricle",
      "Pacemaker recovery pathway showing pocket care, arm restrictions, device interrogation and travel clearance",
    ],
  },
  {
    procedure: "MitraClip",
    shortName: "MitraClip therapy",
    specialist: "structural-heart or interventional cardiologist with a heart-team review",
    definition:
      "MitraClip is a catheter-based edge-to-edge repair that grasps mitral-valve leaflets to reduce selected mitral regurgitation without open-heart valve surgery.",
    candidacy:
      "It may be considered for significant mitral regurgitation when anatomy on transoesophageal echo is suitable and surgery is high risk or not the preferred option after Heart Team review.",
    limits:
      "Not every regurgitant valve can be clipped. Unsuitable leaflets, infective endocarditis, need for other cardiac surgery or insufficient imaging quality may make the procedure inappropriate.",
    evaluation:
      "Assessment requires detailed echocardiography, often TOE, coronary assessment, frailty and surgical-risk review, and a documented Heart Team discussion.",
    technique:
      "From a femoral vein, transseptal puncture reaches the left atrium. Under TOE guidance, the clip is steered to grasp both leaflets; more than one clip may be needed.",
    approaches: [
      { label: "Single-clip repair", detail: "One device may suffice when a discrete regurgitant jet and leaflet length allow it." },
      { label: "Multi-clip repair", detail: "Complex jets or residual regurgitation may require additional clips and more imaging time." },
      { label: "Surgical mitral repair or replacement", detail: "Open or minimally invasive surgery remains the alternative when anatomy or durability favors it." },
    ],
    duration: "Often 2–4 hours depending on imaging, clip count and residual regurgitation",
    admission: "Typically several nights with CCU monitoring; residual regurgitation, access-site bleeding or stroke symptoms extend stay.",
    recovery: "Groin-site care, echo review and heart-failure medicine adjustment are common; flying requires review of volume status, puncture sites and neurological status.",
    risks:
      "Risks include bleeding, vascular injury, clip detachment, residual or worsened regurgitation, iatrogenic mitral stenosis, stroke, cardiac perforation, infection and need for surgery.",
    urgent: "breathlessness, chest pain, neurological symptoms, heavy groin bleeding, fever or collapse",
    drivers: [
      { label: "Number of clips", detail: "Each additional clip is a major device cost." },
      { label: "Imaging intensity", detail: "TOE, anaesthesia and possible 3D guidance change professional and facility charges." },
      { label: "Primary versus secondary MR", detail: "Leaflet and ventricular anatomy change procedure time and clip strategy." },
      { label: "Heart-failure support", detail: "CCU stay, diuretics and inotropes may be required around the procedure." },
      { label: "Surgical backup", detail: "Hybrid-room readiness and a named cardiac surgeon should be confirmed, not inferred." },
    ],
    inclusions: [...commonInclusions, { label: "Clip devices in the written plan", detail: "Only the stated number of MitraClip or equivalent devices." }],
    exclusions: commonExclusions,
    records: ["Complete transthoracic and transoesophageal echo studies", "Coronary angiography or CT coronary assessment", "Heart-failure and surgical-risk records", "Prior mitral-procedure notes"],
    followUp: "Follow-up reviews residual regurgitation, clip stability, medicines and volume status with a local heart-failure or structural clinic.",
    quoteQuestions: ["How many clips are assumed?", "Is TOE and anaesthesia included?", "What is the plan if residual regurgitation requires surgery?"],
    related: ["Balloon Mitral Valvotomy", "TAVR/TAVI (Transcatheter Aortic Valve Replacement)", "Coronary Angiography"],
    imageAlts: [
      "Medical illustration of the mitral valve between the left atrium and left ventricle with a regurgitant jet",
      "Clinical diagram of transseptal catheter delivery of an edge-to-edge clip grasping both mitral leaflets",
      "MitraClip recovery pathway showing CCU monitoring, echo review, groin care and travel clearance",
    ],
  },
  {
    procedure: "ICD Implantation (Implantable Cardioverter-Defibrillator)",
    shortName: "ICD implantation",
    specialist: "electrophysiologist",
    definition:
      "An ICD is a device that can pace the heart and deliver antitachycardia pacing or a shock if a dangerous ventricular arrhythmia occurs.",
    candidacy:
      "It may be considered for secondary prevention after a survived dangerous arrhythmia, or for primary prevention when heart-function and guideline criteria support it after reversible causes are addressed.",
    limits:
      "An ICD does not treat the underlying cardiomyopathy, replace heart-failure medicines or prevent every sudden event. Inappropriate shocks can occur.",
    evaluation:
      "Assessment includes ECG, echocardiography or MRI, kidney function, infection screening, life-expectancy and preference discussion, and whether a CRT-D rather than a simple ICD is indicated.",
    technique:
      "Similar to pacemaker implantation, a generator is placed in a pocket and defibrillator leads are positioned and tested. Defibrillation testing is used selectively rather than routinely in every case.",
    approaches: [
      { label: "Single- or dual-chamber ICD", detail: "Lead configuration follows pacing need and arrhythmia history." },
      { label: "Subcutaneous ICD", detail: "An extravascular system may be considered when transvenous leads should be avoided; it is a different device plan." },
      { label: "CRT-D", detail: "When resynchronization is also indicated, the CRT/CRT-D pathway is the correct estimate, not a standard ICD quote." },
    ],
    duration: "Often 1–2 hours depending on leads, testing and venous anatomy",
    admission: "Usually 1–4 nights for wound, lead and arrhythmia observation.",
    recovery: "Arm restrictions, wound care and a scheduled interrogation are typical; patients need a written shock-response plan before travel.",
    risks:
      "Risks include infection, hematoma, lead displacement, pneumothorax, perforation, inappropriate or appropriate shocks, psychological distress and need for lead or generator revision.",
    urgent: "multiple shocks, fainting, wound infection, chest pain, breathlessness or a swollen arm",
    drivers: [
      { label: "Primary versus secondary prevention", detail: "Indication changes counseling, possible additional tests and stay." },
      { label: "Lead and generator type", detail: "Single, dual, subcutaneous or CRT-capable systems have different invoices." },
      { label: "Defibrillation testing", detail: "When performed, anaesthesia and extra observation may apply." },
      { label: "Extraction or upgrade", detail: "Prior leads make the sitting a revision, not a first implant." },
      { label: "Remote monitoring", detail: "Home transmitters may be extra unless listed." },
    ],
    inclusions: [...commonInclusions, { label: "Named ICD system", detail: "Only the stated generator and lead set." }],
    exclusions: commonExclusions,
    records: ["ECG or arrhythmia recordings", "Echocardiogram or cardiac MRI", "Heart-failure treatment history", "Prior device records"],
    followUp: "Follow-up programmes detection zones, reviews shocks and battery life, and coordinates a local device clinic.",
    quoteQuestions: ["Is this a transvenous or subcutaneous ICD?", "Is CRT-D actually required instead?", "Who manages shocks after I return home?"],
    related: ["CRT/CRT-D Implantation", "Pacemaker Implantation", "Radiofrequency Ablation"],
    imageAlts: [
      "Medical illustration of ventricular chambers and the conduction system relevant to sudden-arrhythmia risk",
      "Clinical diagram of an ICD generator with a defibrillator lead in the right ventricle",
      "ICD recovery pathway showing pocket care, device interrogation, shock-response planning and travel clearance",
    ],
  },
  {
    procedure: "CTO Angioplasty (Chronic Total Occlusion)",
    shortName: "CTO angioplasty",
    specialist: "interventional cardiologist experienced in chronic total occlusions",
    definition:
      "CTO angioplasty is a specialized PCI that attempts to open a coronary artery that has been completely occluded for a prolonged period, usually using dual access, dedicated wires and a higher contrast and radiation budget.",
    candidacy:
      "It may be considered for selected patients with ongoing symptoms or ischemia in the CTO territory when viability is plausible and a high-volume CTO operator judges the attempt appropriate.",
    limits:
      "Not every occlusion can or should be opened. Failed crossing, perforation risk, kidney limits or more suitable bypass surgery may stop or cancel the attempt.",
    evaluation:
      "Assessment includes prior angiograms, ischemia or viability testing, kidney function, dual-access planning and a frank discussion of success uncertainty and contrast load.",
    technique:
      "Antegrade wiring, dissection-reentry or retrograde collateral techniques may be used. Intravascular imaging often guides stenting if the vessel is recanalized.",
    approaches: [
      { label: "Antegrade wire escalation", detail: "Specialized wires and microcatheters attempt to cross from the proximal cap." },
      { label: "Dissection-reentry", detail: "Used when the true lumen cannot be wired directly; it increases complexity." },
      { label: "Retrograde approach", detail: "A collateral channel is used to reach the distal cap; dual access and longer time are expected." },
    ],
    duration: "Often several hours; some attempts are staged",
    admission: "Usually 1–4 nights; perforation, contrast injury or a long case can extend CCU stay.",
    recovery: "Two access sites may need care. Kidney function, chest symptoms and dual antiplatelet therapy are reviewed before travel.",
    risks:
      "Risks include those of PCI plus higher chances of perforation, tamponade, contrast nephropathy, radiation exposure, donor-vessel injury on retrograde cases and unsuccessful recanalization.",
    urgent: "chest pain, breathlessness, heavy bleeding, low blood pressure, reduced urine or collapse",
    drivers: [
      { label: "Antegrade versus retrograde strategy", detail: "Dual access, extra wires and longer lab time change the bill." },
      { label: "Stent length after recanalization", detail: "A long reconstructed segment uses more stents than a simple PCI." },
      { label: "Contrast and staging", detail: "Kidney limits may require a second sitting rather than one package day." },
      { label: "Covered-stent or pericardial backup", detail: "Perforation equipment and surgical backup should be explicit." },
      { label: "Operator and lab readiness", detail: "CTO work is not the same as elective single-stent PCI." },
    ],
    inclusions: [...commonInclusions, { label: "Dedicated CTO equipment", detail: "Only listed microcatheters, wires and stents; extras used during a difficult case may be billed separately." }],
    exclusions: commonExclusions,
    records: ["Complete prior angiogram files", "Ischemia or viability studies", "Kidney-function trend", "Prior CABG or PCI reports"],
    followUp: "Follow-up reviews kidney function, dual antiplatelet therapy, access sites and whether residual disease needs another plan.",
    quoteQuestions: ["Is dual access assumed?", "What happens if the occlusion cannot be crossed?", "Is a covered-stent and surgical-backup plan included?"],
    related: ["Coronary Angioplasty & Stenting", "Coronary Angiography"],
    imageAlts: [
      "Medical illustration of a chronically occluded coronary artery with bridging collaterals supplying the downstream territory",
      "Clinical diagram of dual arterial access and specialized wires attempting to recanalize a chronic total occlusion",
      "CTO angioplasty recovery pathway showing dual puncture-site care, kidney-function checks, CCU review and travel clearance",
    ],
  },
  {
    procedure: "Radiofrequency Ablation",
    shortName: "radiofrequency ablation",
    specialist: "cardiac electrophysiologist",
    definition:
      "Cardiac radiofrequency ablation delivers controlled heat through a catheter to interrupt a selected arrhythmia circuit after an electrophysiology study maps the responsible pathway or focus.",
    candidacy:
      "It may be considered for documented SVT, atrial flutter, some ventricular ectopy or selected VT when medicines are insufficient or not preferred and the circuit is judged amenable to RF energy.",
    limits:
      "This page is not the AF-ablation pathway. RF does not guarantee arrhythmia freedom, and some circuits cannot be safely reached.",
    evaluation:
      "Assessment includes a 12-lead ECG of the clinical tachycardia when possible, Holter data, echocardiography and a medicine review. VT ablation needs a more detailed structural and ICD review.",
    technique:
      "Diagnostic catheters record activation. Once the target is identified, RF energy is applied with temperature and impedance monitoring; 3D mapping is used when anatomy is complex.",
    approaches: [
      { label: "SVT or accessory-pathway ablation", detail: "Targets a re-entry circuit or extra connection after a diagnostic EP study." },
      { label: "Typical atrial-flutter ablation", detail: "A cavotricuspid-isthmus line is a common, more standardized RF target." },
      { label: "Ventricular ablation", detail: "VT or frequent PVCs may need 3D mapping, longer time and sometimes epicardial access." },
    ],
    duration: "From about one hour for a straightforward SVT to several hours for complex VT",
    admission: "Usually 1–3 nights; tamponade, heart block or VT storm extends monitoring.",
    recovery: "Groin-site rest and a period of rhythm observation are common; flying requires review of recurrence, block and access-site stability.",
    risks:
      "Risks include bleeding, vascular injury, heart block needing a pacemaker, perforation or tamponade, stroke in left-sided cases, coronary injury, arrhythmia recurrence and incomplete ablation.",
    urgent: "fainting, a very slow pulse, chest pain, heavy groin bleeding, neurological symptoms or collapse",
    drivers: [
      { label: "Arrhythmia type", detail: "SVT, flutter and VT have different mapping times and risk profiles." },
      { label: "3D mapping", detail: "Electroanatomic mapping systems change consumables." },
      { label: "Left-sided or epicardial access", detail: "Transseptal, retrograde aortic or epicardial work increases complexity." },
      { label: "ICD interaction", detail: "VT ablation in device patients needs programming and possible extra observation." },
      { label: "Repeat procedure", detail: "Prior ablation scars change the sitting." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["12-lead ECG of the clinical tachycardia if available", "Holter or device recordings", "Echocardiogram", "Prior EP-study or ablation reports"],
    followUp: "Follow-up reviews recurrence, medicines, puncture sites and whether a pacemaker or another ablation is needed.",
    quoteQuestions: ["Which arrhythmia is being targeted?", "Is 3D mapping included?", "What is the pacemaker plan if heart block occurs?"],
    related: ["Atrial Fibrillation Ablation", "Pacemaker Implantation", "ICD Implantation (Implantable Cardioverter-Defibrillator)"],
    imageAlts: [
      "Medical illustration of cardiac conduction pathways and an example re-entry circuit targeted by radiofrequency ablation",
      "Clinical diagram of diagnostic and ablation catheters mapping a tachycardia circuit and delivering radiofrequency energy",
      "Radiofrequency ablation recovery pathway showing groin care, rhythm observation, heart-block checks and travel clearance",
    ],
  },
  {
    procedure: "Balloon Mitral Valvotomy",
    shortName: "balloon mitral valvotomy",
    specialist: "interventional cardiologist experienced in balloon mitral valvotomy",
    definition:
      "Balloon mitral valvotomy, also called PTMC or BMV, uses a balloon across a stenotic mitral valve to split fused commissures, most often in rheumatic mitral stenosis with suitable anatomy.",
    candidacy:
      "It may be considered for significant symptomatic mitral stenosis when the Wilkins or equivalent score supports a balloon strategy and left-atrial thrombus has been excluded.",
    limits:
      "Heavily calcified, more-than-mildly regurgitant or thrombus-associated valves are usually surgical. BMV does not treat mitral regurgitation as a primary problem.",
    evaluation:
      "Assessment includes echocardiography with valve scoring, TOE to exclude left-atrial appendage thrombus, rhythm review and a plan for anticoagulation in AF.",
    technique:
      "After transseptal puncture, an Inoue or equivalent balloon is positioned across the mitral valve and inflated in a stepwise fashion while residual gradient and new regurgitation are watched.",
    approaches: [
      { label: "Inoue balloon valvotomy", detail: "The most common single-balloon technique when commissures are suitable." },
      { label: "Stepwise inflation", detail: "Balloon size is increased cautiously to reduce the chance of severe regurgitation." },
      { label: "Surgical mitral valve replacement", detail: "The alternative when score, regurgitation or thrombus makes BMV unsuitable." },
    ],
    duration: "Often 1–2 hours after imaging and transseptal access",
    admission: "Usually 2–5 nights for rhythm, regurgitation and access-site observation.",
    recovery: "Groin-site care, echo review and AF anticoagulation planning are typical; flying requires review of residual stenosis, new regurgitation and volume status.",
    risks:
      "Risks include cardiac tamponade, severe mitral regurgitation requiring surgery, stroke or embolism, residual stenosis, arrhythmia, vascular injury and, rarely, death.",
    urgent: "sudden breathlessness, chest pain, neurological symptoms, heavy bleeding or collapse",
    drivers: [
      { label: "Valve score and balloon strategy", detail: "Unfavorable anatomy increases the chance of a second procedure or surgery." },
      { label: "TOE and thrombus exclusion", detail: "Imaging and possible anticoagulation delay change the episode." },
      { label: "AF and stroke prevention", detail: "Rhythm and anticoagulation are separate from the balloon invoice." },
      { label: "Surgical backup", detail: "Acute severe regurgitation needs an available cardiac-surgery team." },
      { label: "Repeat BMV", detail: "Restenosis after a prior balloon is a different risk discussion." },
    ],
    inclusions: [...commonInclusions, { label: "Valvotomy balloon", detail: "The stated balloon system only." }],
    exclusions: commonExclusions,
    records: ["Echocardiogram with mitral-valve score", "TOE excluding left-atrial thrombus", "ECG and anticoagulation history", "Prior BMV or mitral-surgery notes"],
    followUp: "Follow-up reviews residual gradient, regurgitation, rhythm and secondary prophylaxis for rheumatic disease where relevant.",
    quoteQuestions: ["What is the valve score and thrombus status?", "Is surgical backup confirmed?", "How will new mitral regurgitation be managed?"],
    related: ["MitraClip", "Coronary Angiography", "TAVR/TAVI (Transcatheter Aortic Valve Replacement)"],
    imageAlts: [
      "Medical illustration of a stenotic mitral valve with fused commissures limiting left-ventricular filling",
      "Clinical diagram of transseptal balloon inflation splitting mitral commissures during balloon mitral valvotomy",
      "Balloon mitral valvotomy recovery pathway showing echo review, rhythm and anticoagulation checks, groin care and travel clearance",
    ],
  },
  {
    procedure: "CRT/CRT-D Implantation",
    shortName: "CRT or CRT-D implantation",
    specialist: "electrophysiologist",
    definition:
      "Cardiac resynchronization therapy places an additional left-ventricular lead, usually via the coronary sinus, so both ventricles can be paced together in selected heart-failure patients with electrical dyssynchrony.",
    candidacy:
      "It may be considered when reduced ejection fraction, a wide QRS or pacing-induced dyssynchrony and guideline heart-failure treatment support resynchronization after reversible causes are addressed.",
    limits:
      "Not every wide-QRS or low-EF patient responds. Unsuitable coronary-sinus anatomy, narrow QRS without another pacing indication or untreated reversible cardiomyopathy may make CRT inappropriate.",
    evaluation:
      "Assessment includes ECG QRS morphology, echocardiography, kidney function, guideline-directed medicines and whether a defibrillator (CRT-D) or pacemaker (CRT-P) is indicated.",
    technique:
      "A right-ventricular lead, often an atrial lead and a coronary-sinus LV lead are placed and connected to a CRT generator. LV-lead position is chosen for electrical delay and stability.",
    approaches: [
      { label: "CRT-P", detail: "Resynchronization pacing without defibrillation when sudden-death therapy is not indicated." },
      { label: "CRT-D", detail: "Adds ICD therapy when primary or secondary prevention criteria are also met." },
      { label: "His-bundle or left-bundle pacing", detail: "Conduction-system pacing may be discussed as an alternative strategy in selected anatomy." },
    ],
    duration: "Often 2–4 hours because the LV lead can be technically demanding",
    admission: "Usually 2–5 nights for heart-failure observation, lead stability and programming.",
    recovery: "Arm restrictions, wound care, heart-failure medicine review and a scheduled CRT interrogation are typical before travel.",
    risks:
      "Risks include those of device implantation plus coronary-sinus dissection, phrenic stimulation, high LV-lead thresholds, infection, lead displacement and lack of clinical response.",
    urgent: "worsening breathlessness, shocks if a CRT-D is present, wound infection, fainting or a swollen arm",
    drivers: [
      { label: "CRT-P versus CRT-D", detail: "The defibrillator generator is a major cost difference." },
      { label: "LV-lead complexity", detail: "Difficult coronary-sinus anatomy, extra sheaths or a second attempt change time." },
      { label: "Upgrade from an existing pacemaker or ICD", detail: "Extraction or additional leads make this a revision sitting." },
      { label: "Heart-failure support", detail: "CCU care and medicine optimization may extend stay." },
      { label: "Optimization clinic", detail: "Echo-guided or device optimization visits may be extra." },
    ],
    inclusions: [...commonInclusions, { label: "Named CRT system", detail: "Stated CRT-P or CRT-D generator and three-lead configuration only." }],
    exclusions: commonExclusions,
    records: ["ECG showing QRS duration and morphology", "Echocardiogram with ejection fraction", "Heart-failure medicine list", "Prior pacemaker or ICD records"],
    followUp: "Follow-up programmes AV and VV timing, reviews response and coordinates a local heart-failure and device clinic.",
    quoteQuestions: ["Is CRT-P or CRT-D assumed?", "What is the plan if the coronary sinus cannot be used?", "Who will optimize the device after I return home?"],
    related: ["ICD Implantation (Implantable Cardioverter-Defibrillator)", "Pacemaker Implantation", "Leadless Pacemaker Implantation"],
    imageAlts: [
      "Medical illustration of delayed left-ventricular activation in a dilated heart relevant to cardiac resynchronization",
      "Clinical diagram of atrial, right-ventricular and coronary-sinus left-ventricular leads connected to a CRT generator",
      "CRT recovery pathway showing pocket care, heart-failure review, device optimization and travel clearance",
    ],
  },
  {
    procedure: "ASD Device Closure",
    shortName: "ASD device closure",
    specialist: "structural or congenital interventional cardiologist",
    definition:
      "ASD device closure is a catheter procedure that places an occluder across a secundum atrial septal defect when rims are adequate, avoiding surgical patch closure in selected patients.",
    candidacy:
      "It may be considered for a secundum ASD with right-heart volume overload or other accepted indications when imaging shows sufficient rims and no other defect requiring surgery.",
    limits:
      "This is not surgical ASD closure and not VSD or PDA closure. Primum defects, insufficient rims, additional lesions or pulmonary-hypertension concerns may make a device unsuitable.",
    evaluation:
      "Assessment includes echocardiography, often TOE or 3D imaging of rims, ECG, and a search for anomalous veins or other congenital lesions that would change the plan.",
    technique:
      "From a femoral vein, the defect is sized — sometimes with a balloon — and a double-disc occluder is deployed under echo and fluoroscopic guidance, then released if position and residual shunt are acceptable.",
    approaches: [
      { label: "Device closure of secundum ASD", detail: "A septal occluder is used when rims and size allow a stable waist." },
      { label: "Balloon sizing", detail: "Used selectively to confirm stretched diameter before device choice." },
      { label: "Surgical patch closure", detail: "Required when the defect type, rims or associated lesions are not device-suitable." },
    ],
    duration: "Often 1–2 hours depending on imaging and device repositioning",
    admission: "Usually 1–3 nights for rhythm, device-position and access-site observation.",
    recovery: "Antiplatelet therapy, echo review of device position and residual shunt, and puncture-site care are typical before travel.",
    risks:
      "Risks include device embolization, residual shunt, erosion, arrhythmia, thrombus, vascular injury, tamponade and need for surgical retrieval or closure.",
    urgent: "chest pain, breathlessness, fainting, neurological symptoms, heavy bleeding or collapse",
    drivers: [
      { label: "Defect size and device model", detail: "Occluder diameter is a major invoice line." },
      { label: "Imaging modality", detail: "TOE, ICE or 3D echo change professional and facility charges." },
      { label: "Balloon sizing", detail: "Adds time and consumables when used." },
      { label: "Associated defects", detail: "Finding a second lesion can convert the plan to surgery." },
      { label: "Surgical backup", detail: "Embolized-device retrieval readiness should be confirmed." },
    ],
    inclusions: [...commonInclusions, { label: "Named occluder", detail: "Only the stated ASD device size and brand family." }],
    exclusions: commonExclusions,
    records: ["Echocardiogram detailing defect size and rims", "TOE or 3D imaging where available", "ECG", "Prior congenital-heart records"],
    followUp: "Follow-up echo checks device position, residual shunt and erosion symptoms; antiplatelet duration is individualized.",
    quoteQuestions: ["Which occluder size is assumed from current imaging?", "Is TOE or ICE included?", "What is the retrieval plan if the device embolizes?"],
    related: ["Coronary Angiography", "Balloon Mitral Valvotomy", "MitraClip"],
    imageAlts: [
      "Medical illustration of a secundum atrial septal defect allowing blood to pass between the atria",
      "Clinical diagram of a catheter-delivered double-disc occluder spanning an atrial septal defect",
      "ASD device-closure recovery pathway showing echo checks, antiplatelet therapy, groin care and travel clearance",
    ],
  },
  {
    procedure: "Peripheral Angioplasty",
    shortName: "peripheral angioplasty",
    specialist: "interventional cardiologist or vascular interventional specialist",
    definition:
      "Peripheral angioplasty uses a catheter, balloon and sometimes a stent to open a narrowed artery outside the coronary circulation, most often in a leg, to improve blood flow.",
    candidacy:
      "It may be considered for lifestyle-limiting claudication or selected critical limb ischemia when imaging shows a treatable lesion and walking therapy or surgery is not the better first option.",
    limits:
      "This is not coronary PCI and not carotid stenting. Diffuse small-vessel disease, untreated infection in a threatened limb or unrealistic expectations of walking distance may make angioplasty inappropriate.",
    evaluation:
      "Assessment includes pulses, ankle-brachial index or duplex, CT or catheter angiography of the runoff, kidney function, diabetes control and a wound or podiatry review when ulcers are present.",
    technique:
      "From a femoral or alternative access, wires cross the stenosis or occlusion. Balloons, drug-coated balloons or stents are used according to vessel and lesion type.",
    approaches: [
      { label: "Balloon angioplasty", detail: "Plain or drug-coated balloons treat selected femoropopliteal or iliac stenoses." },
      { label: "Stent-supported angioplasty", detail: "A stent is used when recoil, dissection or lesion location requires scaffolding." },
      { label: "Surgical bypass or endarterectomy", detail: "Still preferred for some long occlusions or common-femoral disease." },
    ],
    duration: "Often 1–3 hours depending on runoff, occlusions and the number of stations treated",
    admission: "Usually 1–3 nights; a threatened limb, renal impairment or access-site bleeding can extend stay.",
    recovery: "Walking is often encouraged early. Wound care for ulcers, antiplatelets and kidney-function checks continue after discharge.",
    risks:
      "Risks include bleeding, vessel rupture, distal embolization, worsening ischemia, contrast kidney injury, reperfusion problems, infection and need for emergency surgery or amputation in severe disease.",
    urgent: "a suddenly cold or painful limb, heavy bleeding, chest pain, reduced urine or fever in a wound",
    drivers: [
      { label: "Arterial territory and length", detail: "Iliac, femoropopliteal and below-knee work have different devices and times." },
      { label: "Stent or drug-coated balloon use", detail: "These consumables dominate many invoices." },
      { label: "Runoff quality", detail: "Poor outflow increases procedure time and residual-risk counseling." },
      { label: "Critical limb ischemia", detail: "Ulcers, infection and pain control change admission." },
      { label: "Repeat intervention", detail: "In-stent restenosis is a different sitting from a first angioplasty." },
    ],
    inclusions: [...commonInclusions, { label: "Listed peripheral devices", detail: "Only the stated balloons or stents for named arterial segments." }],
    exclusions: commonExclusions,
    records: ["Vascular imaging of the affected limb", "Ankle-brachial or duplex reports", "Diabetes, kidney and wound records", "Prior peripheral or coronary procedure notes"],
    followUp: "Follow-up reviews walking, pulses or duplex, wounds and antiplatelet therapy with a local vascular or cardiology clinic.",
    quoteQuestions: ["Which arterial segments are included?", "Are drug-coated balloons or stents assumed?", "What is the plan if runoff cannot be restored?"],
    related: ["Coronary Angioplasty & Stenting", "Carotid Artery Stenting", "Coronary Angiography"],
    imageAlts: [
      "Medical illustration of a narrowed femoral or iliac artery reducing blood flow to the lower limb",
      "Clinical diagram of a guidewire, balloon and optional stent treating a peripheral arterial stenosis",
      "Peripheral angioplasty recovery pathway showing access-site care, walking review, kidney checks and travel clearance",
    ],
  },
  {
    procedure: "Carotid Artery Stenting",
    shortName: "carotid artery stenting",
    specialist: "interventional cardiologist or neurovascular specialist working with a stroke team",
    definition:
      "Carotid artery stenting places a stent in a narrowed carotid artery, usually with an embolic-protection device, as a selected alternative to surgical endarterectomy.",
    candidacy:
      "It may be considered for selected significant carotid stenosis when anatomy, surgical risk or prior neck surgery makes stenting the agreed option after neurological and vascular review.",
    limits:
      "CAS is not automatically preferable to endarterectomy. Unfavorable arch anatomy, heavy thrombus or a recent major stroke may make the procedure unsafe.",
    evaluation:
      "Assessment includes duplex or CT/MR angiography, neurological examination, heart-risk review and a documented discussion of endarterectomy versus stenting.",
    technique:
      "From femoral or radial access, the arch and carotid are engaged. A filter or other protection device is used when feasible, the lesion is predilated if needed and a stent is deployed.",
    approaches: [
      { label: "Protected carotid stenting", detail: "An embolic-protection device is used whenever anatomy allows." },
      { label: "Transfemoral or transradial access", detail: "Access follows arch anatomy and operator plan." },
      { label: "Carotid endarterectomy", detail: "Surgery remains the comparative standard for many patients and is a different episode." },
    ],
    duration: "Often 1–2 hours depending on arch anatomy and protection-device use",
    admission: "Usually 1–4 nights for neurological and blood-pressure observation.",
    recovery: "Blood-pressure control, neurological checks and puncture-site care are central; flying requires a documented neurological review.",
    risks:
      "Risks include stroke or TIA, bleeding, hyperperfusion, bradycardia or hypotension from carotid-sinus stimulation, vessel injury, restenosis and, rarely, death.",
    urgent: "new weakness, speech difficulty, visual loss, severe headache, heavy bleeding or collapse",
    drivers: [
      { label: "Symptomatic versus asymptomatic stenosis", detail: "Indication changes consent, monitoring and sometimes stay." },
      { label: "Stent and protection device", detail: "These implants are major cost lines." },
      { label: "Arch anatomy", detail: "Difficult access increases time and complication readiness." },
      { label: "Blood-pressure and neuro-observation", detail: "ICU or high-dependency nights may be required." },
      { label: "Surgical alternative", detail: "A same-admission endarterectomy is not included in a CAS quote." },
    ],
    inclusions: [...commonInclusions, { label: "Named carotid stent and protection device", detail: "Only the stated implant set." }],
    exclusions: commonExclusions,
    records: ["Carotid duplex or CTA/MRA", "Neurological assessment notes", "Prior stroke or TIA records", "Cardiac-risk and medicine list"],
    followUp: "Follow-up reviews neurological status, blood pressure, duplex surveillance and antiplatelet therapy.",
    quoteQuestions: ["Why is stenting preferred to endarterectomy?", "Which protection device is included?", "What is the stroke-response pathway on this campus?"],
    related: ["Peripheral Angioplasty", "Coronary Angiography", "Coronary Angioplasty & Stenting"],
    imageAlts: [
      "Medical illustration of a narrowed internal carotid artery in the neck and its relationship to brain blood flow",
      "Clinical diagram of embolic-protection-device placement and carotid stent deployment",
      "Carotid stenting recovery pathway showing neurological observations, blood-pressure control, puncture-site care and travel clearance",
    ],
  },
  {
    procedure: "Leadless Pacemaker Implantation",
    shortName: "leadless pacemaker implantation",
    specialist: "electrophysiologist experienced with leadless pacing",
    definition:
      "A leadless pacemaker is a self-contained pacing capsule delivered through a large femoral vein and fixed in the right ventricle, avoiding a chest pocket and transvenous leads.",
    candidacy:
      "It may be considered for selected ventricular pacing indications when avoiding leads or a pocket is advantageous and anatomy allows safe retrieval-or-abandonment planning.",
    limits:
      "Not every bradycardia is a leadless indication. Dual-chamber physiology, CRT need, inadequate femoral access or lack of a trained implanter may make a transvenous pacemaker more appropriate.",
    evaluation:
      "Assessment includes the pacing indication, venous access imaging when needed, infection or pocket-problem history, and whether atrial pacing or defibrillation is also required.",
    technique:
      "A delivery catheter advances the capsule from the femoral vein into the right ventricle. After fixation and electrical testing, the device is released. A large-bore venous closure plan is required.",
    approaches: [
      { label: "Single-chamber ventricular leadless pacemaker", detail: "The most common current indication when ventricular pacing alone is acceptable." },
      { label: "Selected dual-chamber leadless systems", detail: "Used only where the specific platform and indication are available and documented." },
      { label: "Conventional transvenous pacemaker", detail: "Remains the default when atrial leads, CRT or local expertise require it." },
    ],
    duration: "Often 45–120 minutes depending on positioning and testing",
    admission: "Usually 1–3 nights for pacing checks and femoral-access observation.",
    recovery: "Groin precautions after large-bore access and a scheduled interrogation are typical; flying requires access-site and pacing-threshold review.",
    risks:
      "Risks include femoral vascular injury, cardiac perforation or tamponade, device dislodgement, elevated thresholds, inability to retrieve later and need for a conventional system.",
    urgent: "heavy groin bleeding, chest pain, fainting, breathlessness, a swollen leg or collapse",
    drivers: [
      { label: "Device platform", detail: "The capsule itself is the dominant consumable." },
      { label: "Large-bore access management", detail: "Closure devices and vascular backup should be itemized." },
      { label: "Need for atrial pacing or CRT", detail: "If those needs appear, the sitting is no longer a simple leadless implant." },
      { label: "Retrieval or additional device later", detail: "Battery end-of-life strategy must be discussed, not assumed to be free." },
      { label: "Implanting-team availability", detail: "A named operator credentialed for the platform is required." },
    ],
    inclusions: [...commonInclusions, { label: "Named leadless pacemaker", detail: "Only the stated capsule platform." }],
    exclusions: commonExclusions,
    records: ["ECG documenting the pacing indication", "Echocardiogram", "Prior pocket infection or lead-extraction history", "Femoral-access or venous-disease notes"],
    followUp: "Follow-up interrogates thresholds and battery and watches the femoral access site; a clinic familiar with the platform must be identified at home.",
    quoteQuestions: ["Which leadless platform is included?", "What is the vascular-closure and perforation plan?", "Who can interrogate this device after I return home?"],
    related: ["Pacemaker Implantation", "ICD Implantation (Implantable Cardioverter-Defibrillator)", "CRT/CRT-D Implantation"],
    imageAlts: [
      "Medical illustration of the right ventricle and femoral venous route used for leadless pacemaker delivery",
      "Clinical diagram of a leadless pacing capsule being released from a delivery catheter in the right ventricle",
      "Leadless pacemaker recovery pathway showing large-bore groin care, pacing checks, perforation warning signs and travel clearance",
    ],
  },
];

export const cardiologyArticles = profiles.map(createCardiologyArticle);

export const cardiologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  cardiologyArticles.map((article) => [article.slug, article]),
);
