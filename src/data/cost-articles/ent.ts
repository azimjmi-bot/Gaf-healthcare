import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { ENT_PROCEDURES, toSlug } from "../../lib/taxonomy";

type EntExclusive = Exclude<
  (typeof ENT_PROCEDURES)[number],
  "Rhinoplasty" | "Transoral Robotic Surgery (TORS)"
>;

type EntProfile = {
  procedure: EntExclusive;
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
  related: Array<(typeof ENT_PROCEDURES)[number]>;
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
      "Delhi, Gurugram, Noida and Faridabad are separate ENT corridors. Confirm the exact theatre, audiology or implant campus before booking because a cross-NCR transfer soon after nasal packing, ear-canal precautions or a new implant is difficult.",
    lodging:
      "Choose flexible lodging near the named campus with a humidifier option if advised, a companion bed and a way to reach the treating team quickly for bleeding or airway concern.",
    recovery:
      "Winter air pollution and dry summer air can irritate a healing nose, throat or airway. Follow the team's saline, voice and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed audiology, packing removal or an urgent return for bleeding.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, clean water for nasal or oral rinses and a reliable route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make ear-canal protection, nasal-dressing care and reliable transport practical parts of discharge planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after sinus surgery, ear surgery or implant placement.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy and first dressing or mapping access.",
    recovery:
      "Milder weather does not remove bleeding, ear-pressure or voice precautions. Arrange the first clinical or audiology review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several ENT campuses have comparatively direct airport access, but heat, humidity and travel after anaesthesia still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with safe water for rinses and easy access for packing, ear-dressing or implant-wound care.",
    recovery:
      "Heat can worsen dehydration after tonsil or throat surgery. Fluid and diet targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the ENT team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after packing, ear surgery or implant work. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, implant, approach, ICU assumption or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact ENT procedure, implant or device, imaging, anaesthesia, emergency airway backup and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish otology, rhinology, implant programming or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, implant, imaging, pharmacy and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual anatomy, implant and rehabilitation plan rather than a general ENT package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, implant scope and post-travel audiology or voice follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who programmes a device or reviews healing after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, imaging, implant and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: EntProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic ENT or theatre label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader ENT ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, implant or approach scope, monitoring and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, approach or implant plan and route for urgent ENT reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete ENT records before non-refundable travel. Remote review can change after examination, endoscopy, audiology or imaging.",
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
          `Ask the provider to name the ${profile.specialist}, campus, approach or implant assumptions, imaging, observation allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send ENT notes, relevant imaging or audiology and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm theatre, implant or audiology readiness where relevant and emergency airway or bleeding backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews symptoms, dressings or device function and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, imaging, implant or packing assumptions, observation plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `It should name ${profile.procedure}, the clinician and campus, approach or implant assumptions, imaging, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createEntArticle(profile: EntProfile): CostArticle {
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
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, approach or implant scope, monitoring, risks and travel.`,
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
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, theatre or procedure-room time, stated imaging, routine medicines and the listed hospital stay, while extra implants, navigation, reconstruction or another procedure depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Emergency treatment, revision work or a different implant can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified ENT team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, approach or implant plan and monitoring assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different implant, extra sinus or a combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and rehabilitation visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different sides, implants or monitoring. Compare professional fees, theatre time, imaging, implants, observation nights, medicines, exclusions and emergency terms.`,
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
        "Suitability depends on individual assessment by a qualified ENT specialist and, where relevant, audiology, speech or a multidisciplinary team. This page cannot diagnose a reader or recommend a personal procedure.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, allergy, infection, airway risk and any hearing or voice baseline before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report fever, bleeding, sudden hearing change, airway difficulty or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Nasal, ear or throat care, voice or hearing restrictions and activity limits are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — septum, sinus, eardrum, ossicle, cochlea, tonsil, larynx, thyroid or another named structure — from other ENT disease that may still need medicines, therapy or another procedure.",
          "No page can promise airflow, hearing, voice, tumour clearance or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, prior surgery, infection, implant type, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for emergency access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure time, hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms mobility, dressing or device stability and travel fitness.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, audiology or voice therapy and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, medicines and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, approach or implant, imaging, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, endoscopy, audiology or imaging only when clinically indicated before final consent." },
        { label: "Procedure and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the procedure report, implant card where relevant and follow-up plan.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, anatomy, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this procedure cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, implant, imaging, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned procedure", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe oral intake, dressing or implant care and symptom control.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "ENT notes and any available endoscopy, CT, MRI or audiology reports",
      "Previous ear, nose, throat or neck procedure notes and implant cards",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, approach or implant, imaging, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, implant, emergency timing, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic ENT entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, hospital ENT theatres and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, emergency airway or bleeding backup, implant traceability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable airway disease, active infection, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical or alternative surgical options were discussed?`,
      "How were my symptoms, imaging, hearing or voice tests and previous procedures assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the procedure occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, blood tests, endoscopy, audiology and CT or MRI are included?",
      "Are specialist, theatre, anaesthesia and recovery-room fees included?",
      "Which implant, prosthesis, navigation system or cochlear/BAHA device is assumed?",
      "Are manufacturer, model and implant-card details provided where applicable?",
      "Would an extra side, sinus, graft or device change the quotation?",
      "How many ward or observation nights and which room category are included?",
      "How are extra nights, bleeding, another procedure or a complication billed?",
      "Which discharge medicines, packing or dressings are included?",
      "What nasal, ear or throat care instructions apply after discharge?",
      "When can I fly, work, speak, blow my nose or resume other activity?",
      "Which follow-up visits, packing removals, mapping or voice reviews are included?",
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
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, implant, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is ENT treatment in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, implant, imaging, monitoring and follow-up.",
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
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant ENT ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews dressings, hearing, voice or implant function.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and ENT centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general ENT or accreditation label does not establish current case acceptance, implant stock, emergency backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/ent/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/ent/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/ent/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named ENT consultation, records review and procedure-focused examination when explicitly listed." },
  { label: "Procedure episode", detail: "Specialist, theatre or procedure-room time, standard equipment and recovery-room care within the written scope." },
  { label: "Imaging and tests", detail: "Stated blood tests, endoscopy and listed CT, MRI or audiology only; unlisted navigation or stroboscopy is extra." },
  { label: "Routine aftercare", detail: "Standard medicines, packing or dressing care and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, procedure report and implant card where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "An additional side, sinus, graft, implant or a different procedure found after arrival." },
  { label: "Complications", detail: "Unplanned tests, emergency treatment, revision, prolonged stay or readmission unless expressly covered." },
  { label: "Premium devices", detail: "A different implant, prosthesis, navigation system or cochlear/BAHA platform from the one written in the estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, speech or hearing rehabilitation, remote mapping or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: EntProfile[] = [
  {
    procedure: "Septoplasty",
    shortName: "septoplasty",
    specialist: "ENT specialist or rhinologist",
    definition:
      "Septoplasty is a surgical procedure used to straighten a deviated nasal septum and improve nasal airflow when structural blockage causes symptoms.",
    candidacy:
      "It may be considered for persistent nasal obstruction attributed to septal deviation after examination and, where needed, medical therapy for allergy or turbinate swelling.",
    limits:
      "Septoplasty treats selected structural blockage. It is not cosmetic rhinoplasty, does not treat every form of sinus disease and does not guarantee that every breathing complaint will resolve.",
    evaluation:
      "Assessment includes history, nasal examination or endoscopy, allergy review and sometimes CT when sinus disease is also suspected. Photographs are used only if a combined external change is being discussed.",
    technique:
      "Under anaesthesia, the surgeon works through the nostrils to lift mucosa, remove or reposition selected septal cartilage or bone, and close the lining. Packing or splints may be used.",
    approaches: [
      { label: "Conventional septoplasty", detail: "A standard endonasal correction of the obstructing septal segment." },
      { label: "Endoscopic septoplasty", detail: "An endoscope may improve visualisation of posterior deviation; it is not automatically superior." },
      { label: "Septoplasty with turbinate surgery", detail: "Selected inferior-turbinate reduction may be added when swelling also limits airflow; this is a different invoice line if not listed." },
    ],
    duration: "Often 45–90 minutes depending on the deviation and combined work",
    admission: "Many cases are day-care or overnight; bleeding, packing discomfort or combined sinus work can extend stay.",
    recovery:
      "Nasal congestion, blood-stained discharge and packing or splint care are common early. Flying requires review of bleeding, packing status and the team's nose-blowing advice.",
    risks:
      "Risks include bleeding, infection, septal haematoma, septal perforation, persistent obstruction, crusting, altered sensation, change in nasal shape in selected cases and need for revision.",
    urgent: "heavy nasal bleeding, sudden swelling, fever, severe headache, vision change or difficulty breathing",
    drivers: [
      { label: "Complexity of the deviation", detail: "Posterior, revision or severely deformed septa take more time and grafts." },
      { label: "Combined turbinate or sinus work", detail: "Extra procedures change theatre time and consumables." },
      { label: "Revision septoplasty", detail: "Prior surgery increases difficulty and graft need." },
      { label: "Packing and observation", detail: "Overnight stay after bleeding risk is not always in a day-care quote." },
      { label: "Anaesthesia and imaging", detail: "CT or extra endoscopy should be listed if assumed." },
    ],
    inclusions: [...commonInclusions, { label: "Listed septal work", detail: "Only the stated septal correction; unlisted rhinoplasty is extra." }],
    exclusions: commonExclusions,
    records: ["ENT notes describing obstruction and examination", "Nasal endoscopy report if available", "Sinus CT if already done", "Allergy and medicine list"],
    followUp: "Follow-up reviews packing or splints, crusting and airflow. A local ENT should continue saline care and watch for perforation symptoms.",
    quoteQuestions: ["Is turbinate reduction included?", "Is this a revision case?", "When will packing or splints be removed?"],
    related: ["FESS (Functional Endoscopic Sinus Surgery)", "Balloon Sinuplasty", "Rhinoplasty"],
    imageAlts: [
      "Medical illustration of a nasal septum dividing the nasal cavities and a deviation narrowing one airway",
      "Clinical diagram of endonasal septoplasty repositioning septal cartilage beneath the mucosa",
      "Septoplasty recovery pathway showing packing or splint care, saline rinses, bleeding watch and travel clearance",
    ],
  },
  {
    procedure: "FESS (Functional Endoscopic Sinus Surgery)",
    shortName: "functional endoscopic sinus surgery",
    specialist: "ENT specialist or rhinologist experienced in endoscopic sinus surgery",
    definition:
      "Functional endoscopic sinus surgery uses a camera and instruments through the nose to open selected blocked sinus pathways and treat chronic sinus or polyp disease while avoiding external facial incisions.",
    candidacy:
      "It may be considered for chronic rhinosinusitis or nasal polyps that persist after adequate medical therapy, or for selected mucoceles, fungal disease or other structural sinus problems after CT review.",
    limits:
      "FESS cannot reverse every form of mucosal inflammation. Allergy, aspirin-exacerbated disease or immunodeficiency may still need long-term medical care. It is not balloon sinuplasty.",
    evaluation:
      "Assessment includes endoscopy, a period of medical therapy where appropriate, sinus CT mapped to the surgical plan, and review of smell, asthma and prior surgery.",
    technique:
      "Through the nostrils, the surgeon identifies landmarks, opens the planned sinus ostia, removes selected polyps or bone obstructing drainage and preserves as much healthy mucosa as anatomy allows.",
    approaches: [
      { label: "Limited or targeted FESS", detail: "Opens only the sinuses shown to be diseased on CT and endoscopy." },
      { label: "Complete or extended FESS", detail: "More sinuses, including frontal or sphenoid work, when disease extent requires it." },
      { label: "Image-guided FESS", detail: "Navigation may be used in revision or distorted anatomy; it is not required for every case." },
    ],
    duration: "Often 1–3 hours depending on the number of sinuses and revision status",
    admission: "Usually 1–3 nights; extensive polyps, bleeding or combined septoplasty can extend observation.",
    recovery:
      "Nasal rinses, crusting and a blocked sensation are common. Flying requires review of bleeding, packing and the team's altitude advice.",
    risks:
      "Risks include bleeding, infection, adhesions, persistent or recurrent symptoms, orbital injury, cerebrospinal-fluid leak in rare cases, smell change and need for revision.",
    urgent: "heavy bleeding, sudden vision change, severe headache, clear watery nasal leak, high fever or eye swelling",
    drivers: [
      { label: "Number of sinuses involved", detail: "Unilateral maxillary work differs from pansinus or frontal disease." },
      { label: "Polyps and revision status", detail: "Revision and extensive polyposis increase time and navigation use." },
      { label: "Image-guided navigation", detail: "A navigation system is a major extra if not listed." },
      { label: "Combined septoplasty or turbinate surgery", detail: "These are separate episodes unless written in." },
      { label: "Pathology and packing", detail: "Specimen processing and observation nights change the bill." },
    ],
    inclusions: [...commonInclusions, { label: "Listed sinus sides and cells", detail: "Only the sinuses named in the estimate." }],
    exclusions: commonExclusions,
    records: ["Endoscopy notes", "Sinus CT on disc if possible", "Medicine and allergy list including steroids or biologics", "Prior sinus-surgery reports"],
    followUp: "Follow-up debridement and medical therapy for the underlying mucosa are part of care. A local rhinology or ENT clinic should continue rinses.",
    quoteQuestions: ["Which sinuses are included?", "Is navigation included?", "Is septoplasty assumed?"],
    related: ["Septoplasty", "Balloon Sinuplasty", "Skull Base Surgery"],
    imageAlts: [
      "Medical illustration of maxillary, ethmoid, frontal and sphenoid sinuses around the nasal cavity",
      "Clinical diagram of an endoscope passing through the nostril to open a blocked sinus ostium",
      "FESS recovery pathway showing nasal rinses, debridement visits, bleeding watch and travel clearance",
    ],
  },
  {
    procedure: "Balloon Sinuplasty",
    shortName: "balloon sinuplasty",
    specialist: "ENT specialist experienced with balloon sinus dilation",
    definition:
      "Balloon sinuplasty dilates a selected sinus ostium with a balloon catheter to improve drainage in carefully chosen cases, usually without removing large amounts of bone.",
    candidacy:
      "It may be considered for limited, well-mapped ostial obstruction when the surgeon judges that dilation can help and more extensive FESS is not the first plan.",
    limits:
      "Balloon dilation is not a substitute for FESS when polyps, fungal debris or complex anatomy require tissue removal. It does not treat every headache attributed to sinuses.",
    evaluation:
      "Assessment includes endoscopy and CT to confirm which ostia are candidates and whether disease extent exceeds a balloon strategy.",
    technique:
      "A guide and balloon are advanced to the planned ostium under endoscopic and sometimes fluoroscopic or lighted-guide confirmation, inflated to dilate the opening, then withdrawn.",
    approaches: [
      { label: "Office or theatre balloon dilation", detail: "Setting depends on anaesthesia need and anatomy." },
      { label: "Selected-ostium dilation", detail: "Only named sinuses are treated; unlisted sides are extra." },
      { label: "Conversion to FESS", detail: "If anatomy or disease requires tissue removal, the sitting becomes FESS and should be re-quoted." },
    ],
    duration: "Often 30–90 minutes depending on the number of ostia",
    admission: "Many cases are day-care or overnight; conversion to FESS changes stay.",
    recovery:
      "Mild congestion and rinse care are common. Flying depends on bleeding, pain and the team's advice after dilation.",
    risks:
      "Risks include bleeding, infection, failure to improve drainage, need for later FESS, rare orbital or skull-base injury and recurrence of ostial narrowing.",
    urgent: "heavy bleeding, vision change, severe headache, fever or clear watery nasal leak",
    drivers: [
      { label: "Number of ostia dilated", detail: "Each additional sinus uses another balloon or time." },
      { label: "Theatre versus clinic setting", detail: "Anaesthesia changes the facility line." },
      { label: "Conversion to FESS", detail: "A balloon quote does not include unplanned ethmoidectomy." },
      { label: "Image confirmation", detail: "Fluoroscopy or navigation may be extra." },
      { label: "Prior surgery", detail: "Scarred ostia are a different sitting." },
    ],
    inclusions: [...commonInclusions, { label: "Named balloon system", detail: "Only the stated number of ostia and balloon kit." }],
    exclusions: commonExclusions,
    records: ["Sinus CT", "Endoscopy notes", "Prior medical-therapy record", "Allergy list"],
    followUp: "Follow-up checks ostial patency and whether residual disease needs medicines or FESS.",
    quoteQuestions: ["Which ostia are included?", "What is the plan if FESS is required?", "Is the balloon kit itemized?"],
    related: ["FESS (Functional Endoscopic Sinus Surgery)", "Septoplasty", "Skull Base Surgery"],
    imageAlts: [
      "Medical illustration of a narrowed sinus ostium limiting drainage from a sinus cavity",
      "Clinical diagram of a balloon catheter dilating a sinus opening under endoscopic guidance",
      "Balloon sinuplasty recovery pathway showing rinses, symptom review and decision about further FESS",
    ],
  },
  {
    procedure: "Tympanoplasty",
    shortName: "tympanoplasty",
    specialist: "otologist or ENT specialist experienced in middle-ear surgery",
    definition:
      "Tympanoplasty repairs a perforated eardrum and, when needed, the middle-ear mechanism, aiming to reduce infection risk and support hearing in selected patients.",
    candidacy:
      "It may be considered for a persistent tympanic-membrane perforation when the ear is reasonably dry or infection is controlled and hearing tests support an operation discussion.",
    limits:
      "Tympanoplasty does not restore every hearing loss, especially when the inner ear is also damaged. Active uncontrolled infection or extensive cholesteatoma may need a different plan such as mastoidectomy.",
    evaluation:
      "Assessment includes otoscopy, audiometry, sometimes CT if mastoid disease is suspected, and a review of previous ear surgery.",
    technique:
      "Through the ear canal or a small post-auricular incision, the surgeon places a graft (often temporalis fascia or cartilage) to close the perforation and may reconstruct ossicles if they are diseased.",
    approaches: [
      { label: "Myringoplasty / type I tympanoplasty", detail: "Graft closure of the drum when ossicles are intact." },
      { label: "Tympanoplasty with ossiculoplasty", detail: "Adds reconstruction of the hearing bones when they are eroded." },
      { label: "Combined mastoid work", detail: "Cholesteatoma or mastoid disease makes this a different episode from isolated drum repair." },
    ],
    duration: "Often 1–2.5 hours depending on graft and ossicular work",
    admission: "Usually 1–3 nights for dressing and dizziness observation.",
    recovery:
      "Ear-canal precautions, dry-ear advice and a staged hearing review are typical. Flying requires the team's advice on pressure change and packing.",
    risks:
      "Risks include graft failure, persistent discharge, hearing not improving as expected, infection, taste disturbance, dizziness, tinnitus and, rarely, facial-nerve injury.",
    urgent: "facial weakness, heavy bleeding, severe spinning dizziness, high fever or sudden hearing drop",
    drivers: [
      { label: "Size and site of the perforation", detail: "Anterior or total perforations are more demanding." },
      { label: "Ossicular reconstruction", detail: "A prosthesis is a major extra if not listed." },
      { label: "Mastoid disease", detail: "Conversion to mastoidectomy changes the quote." },
      { label: "Revision ear surgery", detail: "Prior grafts and scarring increase time." },
      { label: "Facial-nerve monitoring", detail: "Should be explicit when used." },
    ],
    inclusions: [...commonInclusions, { label: "Listed graft and prosthesis", detail: "Only the stated graft material and ossicular implant." }],
    exclusions: commonExclusions,
    records: ["Otoscopy or endoscopy photos if available", "Audiogram", "Prior ear-surgery notes", "CT if mastoid disease is questioned"],
    followUp: "Follow-up checks graft take, infection and a later audiogram. Water precautions continue until the team clears the ear.",
    quoteQuestions: ["Is ossiculoplasty included?", "Is mastoidectomy assumed?", "When is water sport or flying allowed?"],
    related: ["Mastoidectomy", "Stapedectomy / Stapedotomy", "Cochlear Implantation"],
    imageAlts: [
      "Medical illustration of the eardrum, middle-ear space and ossicles with a perforation in the tympanic membrane",
      "Clinical diagram of a graft being placed to close an eardrum perforation during tympanoplasty",
      "Tympanoplasty recovery pathway showing dry-ear care, dressing review, audiogram and travel clearance",
    ],
  },
  {
    procedure: "Mastoidectomy",
    shortName: "mastoidectomy",
    specialist: "otologist experienced in mastoid and cholesteatoma surgery",
    definition:
      "Mastoidectomy removes diseased air cells from the mastoid bone behind the ear, most often for cholesteatoma or chronic mastoid infection, and may be combined with tympanoplasty.",
    candidacy:
      "It may be considered when imaging and examination show cholesteatoma, unsafe chronic ear disease or complications that medical therapy cannot clear.",
    limits:
      "Mastoidectomy is not a simple hearing operation. Hearing may stay the same, worsen or later need reconstruction. Residual or recurrent cholesteatoma can occur.",
    evaluation:
      "Assessment includes microscopy, audiometry, CT of the temporal bone and a discussion of canal-wall-up versus canal-wall-down strategy.",
    technique:
      "Through a post-auricular incision, the surgeon drills mastoid air cells, identifies the facial-nerve course, clears disease and decides how much canal wall to preserve, often with facial-nerve monitoring.",
    approaches: [
      { label: "Canal-wall-up mastoidectomy", detail: "Preserves the ear-canal wall when disease and anatomy allow." },
      { label: "Canal-wall-down mastoidectomy", detail: "Creates an open cavity when disease or anatomy requires wider clearance." },
      { label: "Combined tympanoplasty", detail: "Drum and ossicular work may be staged or done in the same sitting." },
    ],
    duration: "Often 2–5 hours depending on disease extent",
    admission: "Usually 2–5 nights for pain, dizziness and dressing observation.",
    recovery:
      "A bulky dressing, activity limits and later cavity care are common. Flying requires review of dizziness, wound and the open-cavity plan if used.",
    risks:
      "Risks include facial-nerve injury, hearing loss, dizziness, tinnitus, taste change, infection, cerebrospinal-fluid leak, residual cholesteatoma and need for second-look surgery.",
    urgent: "facial weakness, clear watery ear leak, high fever, severe spinning or sudden hearing loss",
    drivers: [
      { label: "Extent of cholesteatoma", detail: "Labyrinthine or sinus-tympanic disease increases time." },
      { label: "Canal-wall strategy", detail: "Open-cavity care and later clinic visits differ." },
      { label: "Facial-nerve monitoring", detail: "Should be a named line when used." },
      { label: "Staged second look", detail: "A later sitting is not included unless written." },
      { label: "Revision mastoidectomy", detail: "Prior cavities are more complex." },
    ],
    inclusions: [...commonInclusions, { label: "Listed mastoid approach", detail: "Only the stated canal-wall plan and graft work." }],
    exclusions: commonExclusions,
    records: ["Temporal-bone CT", "Audiogram", "Prior ear-surgery notes", "Microscopy description of the drum and attic"],
    followUp: "Follow-up includes wound and cavity care and later imaging or second-look decisions. A local otology clinic must be identified.",
    quoteQuestions: ["Is this canal-wall-up or down?", "Is a second-look surgery included?", "Is facial-nerve monitoring included?"],
    related: ["Tympanoplasty", "Stapedectomy / Stapedotomy", "Cochlear Implantation"],
    imageAlts: [
      "Medical illustration of mastoid air cells behind the ear and their relationship to the middle ear and facial nerve",
      "Clinical diagram of mastoid drilling to clear diseased air cells while identifying the facial-nerve course",
      "Mastoidectomy recovery pathway showing dressing care, dizziness review, cavity cleaning and travel clearance",
    ],
  },
  {
    procedure: "Stapedectomy / Stapedotomy",
    shortName: "stapedectomy or stapedotomy",
    specialist: "otologist experienced in stapes surgery",
    definition:
      "Stapedotomy or stapedectomy reconstructs a fixed stapes — most often from otosclerosis — by creating a small opening or removing part of the stapes and placing a prosthesis to restore sound transmission.",
    candidacy:
      "It may be considered for conductive hearing loss with an audiometric pattern and examination consistent with otosclerosis after the team discusses hearing-aid alternatives.",
    limits:
      "Inner-ear hearing loss will not be fully corrected. Bilateral disease is usually treated one ear at a time. The operation does not treat every form of conductive loss.",
    evaluation:
      "Assessment includes microscopy, tuning-fork and audiometry with reflex testing, and sometimes CT to exclude other middle-ear disease.",
    technique:
      "Through the ear canal, the surgeon confirms stapes fixation, creates a small fenestra or removes the stapes superstructure, places a piston prosthesis and seals the oval window.",
    approaches: [
      { label: "Stapedotomy", detail: "A small fenestra in the footplate with a piston prosthesis is the common modern approach." },
      { label: "Stapedectomy", detail: "Larger footplate removal is used in selected anatomy." },
      { label: "Hearing-aid alternative", detail: "Amplification remains an option and is a different care pathway." },
    ],
    duration: "Often 45–120 minutes",
    admission: "Usually 1–3 nights for dizziness observation.",
    recovery:
      "Dizziness, ear fullness and dry-ear precautions are common. Flying requires the team's advice because pressure change can be poorly tolerated early.",
    risks:
      "Risks include dizziness, taste disturbance, tinnitus, prosthesis displacement, incomplete hearing gain, sensorineural hearing loss, infection and, rarely, facial-nerve injury or dead ear.",
    urgent: "severe spinning, facial weakness, sudden hearing drop, heavy discharge or high fever",
    drivers: [
      { label: "Stapedotomy versus stapedectomy", detail: "Technique and prosthesis choice change consumables." },
      { label: "Revision stapes surgery", detail: "A second prosthesis sitting is more complex." },
      { label: "Laser or microdrill use", detail: "Named technology should be listed if assumed." },
      { label: "Bilateral disease staging", detail: "The second ear is a separate episode." },
      { label: "Dizziness observation", detail: "Extra nights are not always in a short-stay quote." },
    ],
    inclusions: [...commonInclusions, { label: "Named stapes prosthesis", detail: "Only the stated piston or bucket-handle implant." }],
    exclusions: commonExclusions,
    records: ["Audiogram with bone and air conduction", "ENT notes on otosclerosis diagnosis", "Prior stapes-surgery notes if revision", "CT if already performed"],
    followUp: "Follow-up reviews dizziness, prosthesis stability and a later audiogram. Water and pressure precautions continue until cleared.",
    quoteQuestions: ["Which prosthesis is included?", "Is this a revision stapes operation?", "When is flying allowed?"],
    related: ["Tympanoplasty", "BAHA Implantation (Bone Anchored Hearing Aid)", "Cochlear Implantation"],
    imageAlts: [
      "Medical illustration of the stapes bone in the oval window and fixation typical of otosclerosis",
      "Clinical diagram of a stapedotomy piston prosthesis connecting the incus to the oval-window fenestra",
      "Stapes-surgery recovery pathway showing dizziness observation, dry-ear care, audiogram and travel clearance",
    ],
  },
  {
    procedure: "Cochlear Implantation",
    shortName: "cochlear implantation",
    specialist: "otologist or cochlear-implant surgeon working with an audiology team",
    definition:
      "Cochlear implantation places an internal receiver-stimulator and an electrode array in the cochlea so a sound processor can stimulate the hearing nerve in selected severe-to-profound hearing loss.",
    candidacy:
      "It may be considered when hearing aids no longer give enough access to sound, after audiology, imaging and a structured discussion of rehabilitation commitment.",
    limits:
      "A cochlear implant does not restore natural acoustic hearing. Outcomes vary with duration of deafness, residual nerve function and rehabilitation. It is not a BAHA.",
    evaluation:
      "Assessment includes unaided and aided audiometry, speech testing, CT or MRI of the cochlea and nerve, vaccination review and counselling about mapping.",
    technique:
      "Through a post-auricular incision the receiver is seated, a mastoid and facial-recess approach reaches the round window or cochleostomy, and the electrode is inserted and tested.",
    approaches: [
      { label: "Unilateral cochlear implant", detail: "One ear is implanted when that is the agreed indication." },
      { label: "Sequential or simultaneous bilateral implantation", detail: "A second device is a separate or combined invoice and must be named." },
      { label: "Hybrid or electro-acoustic systems", detail: "Used only when residual low-frequency hearing and the specific electrode are appropriate." },
    ],
    duration: "Often 2–4 hours depending on anatomy and testing",
    admission: "Usually 3–7 nights; mapping begins later as an outpatient process.",
    recovery:
      "Wound care, magnet and processor timing, and dizziness review come first. Programming and rehabilitation continue for months and are not the same as hospital stay.",
    risks:
      "Risks include infection, device failure, dizziness, taste change, facial-nerve stimulation or injury, meningitis, electrode misplacement, need for revision and variable hearing outcome.",
    urgent: "wound infection, facial weakness, high fever, severe dizziness or device-site swelling",
    drivers: [
      { label: "Implant system and electrode", detail: "The internal device is usually the dominant cost line." },
      { label: "Unilateral versus bilateral", detail: "A second implant roughly doubles device cost." },
      { label: "Imaging and candidacy testing", detail: "MRI, CT and speech testing may sit outside a surgery quote." },
      { label: "Mapping and rehabilitation", detail: "Processor fitting, spare parts and therapy are often extra." },
      { label: "Revision or anomalous cochlea", detail: "Malformed or ossified cochleae increase time." },
    ],
    inclusions: [...commonInclusions, { label: "Named implant package", detail: "Only the stated internal device and first processor if written in." }],
    exclusions: commonExclusions,
    records: ["Aided and unaided audiograms", "Speech-perception scores", "Cochlear CT or MRI", "Vaccination and prior ear-surgery notes"],
    followUp: "Follow-up includes wound review, switch-on, serial mapping and auditory rehabilitation with a clinic that programmes that device brand.",
    quoteQuestions: ["Which implant brand and electrode are included?", "Is the external processor included?", "How many mapping sessions are included?"],
    related: ["BAHA Implantation (Bone Anchored Hearing Aid)", "Tympanoplasty", "Mastoidectomy"],
    imageAlts: [
      "Medical illustration of the cochlea and auditory nerve showing where an electrode array is intended to sit",
      "Clinical diagram of a cochlear implant receiver under the skin and an electrode entering the cochlea",
      "Cochlear-implant pathway showing surgery, wound care, processor switch-on, mapping and rehabilitation",
    ],
  },
  {
    procedure: "BAHA Implantation (Bone Anchored Hearing Aid)",
    shortName: "BAHA implantation",
    specialist: "otologist experienced with bone-anchored hearing devices",
    definition:
      "A bone-anchored hearing aid uses an implant in the skull bone to transmit vibration to the inner ear, for selected conductive or mixed losses or single-sided deafness when a conventional aid is unsuitable.",
    candidacy:
      "It may be considered after a trial of a soft-band or test processor when anatomy, skin and hearing tests support an osseointegrated device.",
    limits:
      "BAHA does not treat every sensorineural loss and is not a cochlear implant. Skin reactions and implant loss can occur. It does not reconstruct a closed ear canal.",
    evaluation:
      "Assessment includes audiometry, a processor trial where possible, CT if anatomy is uncertain, and skin and hygiene counselling.",
    technique:
      "A titanium fixture is placed in the temporal bone. A percutaneous abutment or a transcutaneous magnet system is used according to the chosen platform, then the processor is fitted after osseointegration.",
    approaches: [
      { label: "Percutaneous abutment system", detail: "A skin-penetrating abutment holds the processor after healing." },
      { label: "Transcutaneous magnet system", detail: "An internal magnet avoids an open abutment when the platform allows it." },
      { label: "Soft-band trial without implant", detail: "A non-surgical trial is a different product from implantation." },
    ],
    duration: "Often 45–120 minutes",
    admission: "Usually 1–3 nights; processor fitting follows weeks later.",
    recovery:
      "Skin and implant-site care come first. The processor is not usually loaded immediately. Flying depends on wound review, not on hearing outcome.",
    risks:
      "Risks include skin infection or overgrowth, implant loosening, failure of osseointegration, incomplete hearing benefit and need for revision or a different device.",
    urgent: "implant-site infection, implant movement, high fever or spreading redness",
    drivers: [
      { label: "Implant platform", detail: "The fixture and processor family dominate the invoice." },
      { label: "Percutaneous versus magnet system", detail: "Different hardware and aftercare." },
      { label: "Bone quality and two-stage surgery", detail: "Thin bone may require a staged fixture." },
      { label: "Processor accessories", detail: "Spares and wireless kits are often extra." },
      { label: "Revision of a failed fixture", detail: "A second implant is a new episode." },
    ],
    inclusions: [...commonInclusions, { label: "Named BAHA system", detail: "Only the stated fixture and first processor if written in." }],
    exclusions: commonExclusions,
    records: ["Audiogram", "Soft-band or processor-trial notes", "Prior mastoid or canal-atresia records", "Skin and infection history"],
    followUp: "Follow-up checks osseointegration, skin and processor fitting with a clinic familiar with that platform.",
    quoteQuestions: ["Which BAHA platform is included?", "Is the sound processor included?", "Is this one-stage or two-stage?"],
    related: ["Cochlear Implantation", "Tympanoplasty", "Mastoidectomy"],
    imageAlts: [
      "Medical illustration of skull bone behind the ear transmitting vibration toward the cochlea",
      "Clinical diagram of a bone-anchored fixture and external processor on the temporal bone",
      "BAHA recovery pathway showing implant-site care, osseointegration wait, processor fitting and travel clearance",
    ],
  },
  {
    procedure: "Tonsillectomy",
    shortName: "tonsillectomy",
    specialist: "ENT specialist, including paediatric ENT when the patient is a child",
    definition:
      "Tonsillectomy removes the palatine tonsils, commonly considered for recurrent tonsillitis, significant tonsil-related obstruction or other selected indications after specialist review.",
    candidacy:
      "It may be considered for frequent documented tonsil infections, sleep-related obstruction with large tonsils, or other accepted indications when watchful waiting is no longer appropriate.",
    limits:
      "Tonsillectomy does not treat every sore throat or every form of sleep apnea. Adult and paediatric recoveries differ. Combined adenoidectomy is a different invoice if not listed.",
    evaluation:
      "Assessment includes infection history, airway and sleep history, examination and, when sleep apnea is the question, a sleep study if the team needs it.",
    technique:
      "Under general anaesthesia the tonsils are dissected from the tonsillar fossae using the surgeon's chosen technique, with careful haemostasis before extubation.",
    approaches: [
      { label: "Cold or conventional dissection", detail: "A common technique with ligatures or bipolar haemostasis." },
      { label: "Hot or energy-device tonsillectomy", detail: "Various energy tools may be used; none is universally superior." },
      { label: "Tonsillectomy with adenoidectomy", detail: "Added when adenoids also obstruct; it must be named in the quote." },
    ],
    duration: "Often 30–60 minutes",
    admission: "Usually 1–2 nights for pain, hydration and bleeding observation; higher-risk airways may stay longer.",
    recovery:
      "Throat pain, referred ear pain and a soft diet are common for days. Secondary bleeding can occur after discharge. Flying requires review of pain, intake and bleeding risk.",
    risks:
      "Risks include primary or secondary bleeding, pain, dehydration, infection, anaesthesia and airway complications, and, rarely, significant haemorrhage requiring return to theatre.",
    urgent: "any fresh bleeding from the mouth, inability to drink, breathing difficulty or high fever",
    drivers: [
      { label: "Adult versus paediatric case", detail: "Pain control and stay assumptions differ." },
      { label: "Sleep-apnea comorbidity", detail: "ICU or longer observation may be required." },
      { label: "Combined adenoidectomy", detail: "A second procedure line if not listed." },
      { label: "Bleeding risk and return to theatre", detail: "Complications are not automatically included." },
      { label: "Technique and consumables", detail: "Energy devices may be itemized." },
    ],
    inclusions: [...commonInclusions, { label: "Listed tonsil technique", detail: "Only the stated dissection method and one side pair of tonsils." }],
    exclusions: commonExclusions,
    records: ["Infection or sleep-symptom timeline", "Sleep study if already done", "Bleeding or clotting history", "Paediatric weight and vaccine notes where relevant"],
    followUp: "Follow-up reviews healing fossae and hydration. Families need a written bleeding-action plan before travel.",
    quoteQuestions: ["Is adenoidectomy included?", "What is the bleeding-return plan?", "How many observation nights are included?"],
    related: ["Adenoidectomy", "Sleep Apnea Surgery", "Microlaryngeal Surgery"],
    imageAlts: [
      "Medical illustration of palatine tonsils in the oropharynx and their relationship to the airway",
      "Clinical diagram of tonsil dissection from the tonsillar fossa during tonsillectomy",
      "Tonsillectomy recovery pathway showing pain and hydration care, bleeding watch, diet advice and travel clearance",
    ],
  },
  {
    procedure: "Adenoidectomy",
    shortName: "adenoidectomy",
    specialist: "ENT specialist or paediatric ENT specialist",
    definition:
      "Adenoidectomy removes enlarged or chronically infected adenoid tissue from the nasopharynx to improve nasal breathing or reduce selected ear or sinus problems.",
    candidacy:
      "It may be considered for adenoid hyperplasia causing obstruction, persistent otitis media with effusion in selected children, or recurrent nasopharyngeal infection after examination.",
    limits:
      "Adenoidectomy does not treat every blocked nose. Allergy and turbinate disease may persist. It is not a tonsillectomy unless both are planned.",
    evaluation:
      "Assessment includes nasal and nasopharyngeal examination, sometimes endoscopy or X-ray, hearing tests if ears are involved, and a decision about combining tonsil or ear-tube work.",
    technique:
      "Under general anaesthesia, adenoid tissue is removed through the mouth under mirror or endoscopic view, with haemostasis of the nasopharyngeal bed.",
    approaches: [
      { label: "Standalone adenoidectomy", detail: "Used when tonsils do not meet operative criteria." },
      { label: "Adenotonsillectomy", detail: "Combined sitting when both tissues are indicated." },
      { label: "Adenoidectomy with ear tubes", detail: "Grommets are a different CMS procedure and must be listed if planned." },
    ],
    duration: "Often 20–45 minutes",
    admission: "Often day-care or overnight; combined tonsil work follows the tonsil stay.",
    recovery:
      "Nasal voice, mild neck odour and rinse or saline advice are common. Flying depends on bleeding, intake and whether tonsils were also removed.",
    risks:
      "Risks include bleeding, infection, velopharyngeal insufficiency in rare cases, neck pain, recurrence of adenoid tissue and anaesthesia complications.",
    urgent: "bleeding from the nose or mouth, breathing difficulty, inability to drink or high fever",
    drivers: [
      { label: "Standalone versus combined tonsil surgery", detail: "The combined sitting is not a simple add-on price." },
      { label: "Ear-tube pairing", detail: "Grommets change the episode." },
      { label: "Endoscopic technique", detail: "May be listed separately." },
      { label: "Age and airway risk", detail: "Very young children may need longer observation." },
      { label: "Revision adenoidectomy", detail: "Regrowth is a different sitting." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Airway and sleep history", "Hearing tests if ears are involved", "Prior adenoid or tonsil notes", "Paediatric medical summary"],
    followUp: "Follow-up reviews breathing and, if relevant, middle-ear status. Allergy care may still be needed.",
    quoteQuestions: ["Are tonsils included?", "Are ear tubes included?", "What observation is planned overnight?"],
    related: ["Tonsillectomy", "Sleep Apnea Surgery", "Tympanoplasty"],
    imageAlts: [
      "Medical illustration of adenoid tissue in the nasopharynx behind the nasal cavity",
      "Clinical diagram of adenoid removal from the nasopharynx under oral view",
      "Adenoidectomy recovery pathway showing nasal-breathing review, bleeding watch and travel clearance",
    ],
  },
  {
    procedure: "Sleep Apnea Surgery",
    shortName: "sleep apnea surgery",
    specialist: "ENT specialist experienced in sleep surgery, often with sleep-medicine input",
    definition:
      "Sleep apnea surgery is a group of airway operations used in selected obstructive sleep apnea when anatomy and a failed or declined CPAP discussion support a surgical plan.",
    candidacy:
      "It may be considered after a sleep study and airway examination when CPAP is not tolerated or not the chosen first option and a correctable obstruction is identified.",
    limits:
      "Surgery is not a guaranteed cure for OSA. Residual apnea is common. This page is not a single named technique such as UPPP or tongue-base surgery; the actual operation must be specified.",
    evaluation:
      "Assessment includes a diagnostic sleep study, BMI and medical-risk review, drug-induced sleep endoscopy or awake endoscopy when used, and a CPAP-alternative discussion.",
    technique:
      "The surgeon addresses the named collapse sites — palate, tonsils, tongue base or nose — using the planned technique. Multilevel work is common and must be itemized.",
    approaches: [
      { label: "Palatal or tonsillar surgery", detail: "Addresses oropharyngeal collapse when that is the documented site." },
      { label: "Tongue-base or hyoid-related procedures", detail: "Used only when examination supports retrolingual obstruction." },
      { label: "Nasal procedures as adjuncts", detail: "Septoplasty or turbinate work may help CPAP or airflow but is not standalone OSA surgery." },
    ],
    duration: "Often 1–4 hours depending on levels treated",
    admission: "Usually 2–5 nights because airway swelling requires observation; ICU may be used in higher-risk OSA.",
    recovery:
      "Sore throat, nasal care and sleep-position advice are common. Flying requires review of oxygenation, swelling and pain, not a package night count.",
    risks:
      "Risks include bleeding, airway swelling, residual or worse apnea, velopharyngeal insufficiency, dysphagia, infection and anaesthesia complications in patients with OSA.",
    urgent: "breathing difficulty, bleeding, inability to swallow saliva or falling oxygen levels",
    drivers: [
      { label: "Number of airway levels", detail: "Multilevel surgery is not a single-site quote." },
      { label: "OSA severity and comorbidity", detail: "ICU observation changes the bill." },
      { label: "Sleep endoscopy and planning", detail: "DISE may be a separate sitting." },
      { label: "Combined nasal surgery", detail: "Septoplasty must be listed if included." },
      { label: "Revision sleep surgery", detail: "Prior UPPP or implants increase complexity." },
    ],
    inclusions: [...commonInclusions, { label: "Named airway levels", detail: "Only the palate, tonsil, tongue or nasal work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Diagnostic sleep study", "BMI and comorbidity list", "CPAP-trial notes if any", "Airway-endoscopy report"],
    followUp: "Follow-up includes a planned repeat sleep study when the team needs objective residual-apnea data and continued medical OSA care.",
    quoteQuestions: ["Which airway levels are included?", "Is ICU observation included?", "Is a postoperative sleep study included?"],
    related: ["Tonsillectomy", "Adenoidectomy", "Septoplasty"],
    imageAlts: [
      "Medical illustration of palate, tonsils and tongue-base narrowing the pharyngeal airway during sleep",
      "Clinical diagram of selected palatal or tongue-base surgery to enlarge the airway",
      "Sleep-apnea surgery recovery pathway showing airway observation, pain and swallow care and later sleep-study review",
    ],
  },
  {
    procedure: "Vocal Cord Surgery",
    shortName: "vocal cord surgery",
    specialist: "laryngologist or ENT specialist experienced in voice surgery",
    definition:
      "Vocal cord surgery treats selected lesions or positions of the vocal folds — such as polyps, cysts or selected paralysis procedures — to support voice or airway after specialist voice assessment.",
    candidacy:
      "It may be considered when a documented cord lesion or immobility persists despite voice therapy or medical care and stroboscopy supports an operation.",
    limits:
      "Surgery cannot guarantee a professional singing voice. Some lesions are better observed. This is not the same CMS procedure as microlaryngeal surgery even when a microscope is used.",
    evaluation:
      "Assessment includes voice history, laryngoscopy with stroboscopy when available, and a speech-language review before consent.",
    technique:
      "Most lesions are approached through the mouth with a laryngoscope; the lesion is removed or injected with microsurgical instruments while protecting the layered vocal-fold structure.",
    approaches: [
      { label: "Phonomicrosurgery for a benign lesion", detail: "Removes or dissects a polyp, cyst or selected nodule." },
      { label: "Injection or medialisation for paralysis", detail: "A different reconstructive plan when the cord cannot meet its pair." },
      { label: "Office laser or biopsy procedures", detail: "Used for selected superficial lesions; they are not automatically equivalent to theatre microsurgery." },
    ],
    duration: "Often 30–90 minutes",
    admission: "Day-care to 2 nights depending on airway risk and the procedure.",
    recovery:
      "Voice rest, humidification and later therapy are typical. Flying depends on airway swelling, not on when the voice 'sounds normal'.",
    risks:
      "Risks include voice change, scarring, incomplete lesion removal, recurrence, bleeding, airway swelling and, rarely, the need for a temporary airway.",
    urgent: "breathing difficulty, noisy breathing, heavy bleeding or inability to swallow",
    drivers: [
      { label: "Lesion type and laterality", detail: "Bilateral or deep lesions are more demanding." },
      { label: "Injection material or implant", detail: "Medialisation hardware is a major extra." },
      { label: "Laser use", detail: "Should be listed if assumed." },
      { label: "Voice therapy package", detail: "Therapy is often billed separately." },
      { label: "Airway observation", detail: "High-risk airways may need overnight monitoring." },
    ],
    inclusions: [...commonInclusions, { label: "Listed cord procedure", detail: "Only the stated lesion side and technique." }],
    exclusions: commonExclusions,
    records: ["Stroboscopy or laryngoscopy report", "Voice-therapy notes", "Pathology if a prior biopsy exists", "Occupational voice demands"],
    followUp: "Follow-up combines wound or injection review with speech therapy. A local laryngology or voice clinic should continue care.",
    quoteQuestions: ["Is this excision, injection or medialisation?", "Is voice therapy included?", "Is laser listed?"],
    related: ["Microlaryngeal Surgery", "Tonsillectomy", "Head & Neck Cancer Surgery"],
    imageAlts: [
      "Medical illustration of the larynx and vocal folds showing a lesion on one cord",
      "Clinical diagram of microlaryngoscopic instruments working on a vocal-fold lesion through the mouth",
      "Vocal-cord surgery recovery pathway showing voice rest, therapy review, airway watch and travel clearance",
    ],
  },
  {
    procedure: "Microlaryngeal Surgery",
    shortName: "microlaryngeal surgery",
    specialist: "laryngologist experienced in microlaryngoscopy",
    definition:
      "Microlaryngeal surgery is microscope-assisted surgery of the larynx performed through a rigid laryngoscope, used to diagnose or treat selected vocal-fold and laryngeal lesions.",
    candidacy:
      "It may be considered when a laryngeal lesion needs precise excision or biopsy under magnification, or when office examination cannot finish the diagnosis.",
    limits:
      "It is a technique family, not a promise of voice improvement. Malignant lesions may need a different oncologic pathway such as head-and-neck cancer surgery or TORS.",
    evaluation:
      "Assessment includes laryngoscopy, imaging when deep or malignant disease is suspected, and anaesthetic airway planning.",
    technique:
      "After suspension laryngoscopy, the microscope or endoscope magnifies the larynx. The lesion is biopsied or excised with microinstruments or a laser, and haemostasis is confirmed before waking.",
    approaches: [
      { label: "Diagnostic microlaryngoscopy and biopsy", detail: "Obtains tissue when cancer or another diagnosis is uncertain." },
      { label: "Therapeutic phonomicrosurgery", detail: "Excises a selected benign lesion under magnification." },
      { label: "Laser microlaryngeal work", detail: "Used for selected lesions; airway fire precautions apply." },
    ],
    duration: "Often 30–90 minutes",
    admission: "Day-care to 2 nights depending on airway oedema risk.",
    recovery:
      "Voice rest and humidification are common. Flying depends on airway swelling and pathology results that might change the plan.",
    risks:
      "Risks include dental or tongue injury from the laryngoscope, voice change, bleeding, airway swelling, laser-related injury and incomplete diagnosis if sampling is limited.",
    urgent: "breathing difficulty, stridor, heavy bleeding or inability to swallow",
    drivers: [
      { label: "Diagnostic versus therapeutic intent", detail: "Biopsy-only sittings differ from bilateral lesion work." },
      { label: "Laser platform", detail: "A named laser may be extra." },
      { label: "Pathology processing", detail: "Frozen section or special stains change the bill." },
      { label: "Difficult airway", detail: "Jet ventilation or extra anaesthetic time should be explicit." },
      { label: "Need for further oncologic surgery", detail: "A cancer operation is a new episode." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Laryngoscopy report", "Prior biopsy if any", "Neck imaging if a mass is suspected", "Voice and airway-symptom timeline"],
    followUp: "Follow-up reviews pathology, voice and whether further ENT oncology or therapy is needed.",
    quoteQuestions: ["Is this biopsy or excision?", "Is a laser included?", "What is the plan if cancer is found?"],
    related: ["Vocal Cord Surgery", "Head & Neck Cancer Surgery", "Transoral Robotic Surgery (TORS)"],
    imageAlts: [
      "Medical illustration of the larynx under magnification showing layered vocal-fold structure",
      "Clinical diagram of suspension laryngoscopy and microscope-guided instruments in the larynx",
      "Microlaryngeal surgery recovery pathway showing airway watch, voice rest, pathology review and travel clearance",
    ],
  },
  {
    procedure: "Thyroid Surgery",
    shortName: "thyroid surgery",
    specialist: "ENT or head-and-neck surgeon experienced in thyroidectomy",
    definition:
      "Thyroid surgery removes part or all of the thyroid gland for selected nodules, goitre or cancer when an ENT or head-and-neck team holds the list. Oncologic thyroidectomy for thyroid cancer may also sit on a surgical-oncology sheet.",
    candidacy:
      "It may be considered for compressive goitre, cytology that warrants removal, Graves disease selected for surgery, or thyroid cancer after multidisciplinary review.",
    limits:
      "This page is not a promise of a scarless or remote-access result. Recurrent-nerve or parathyroid injury can occur. Completion thyroidectomy is a different sitting.",
    evaluation:
      "Assessment includes ultrasound, cytology, thyroid function, vocal-cord check and, when cancer is suspected, a staging discussion. Nerve monitoring is planned when the team uses it.",
    technique:
      "Through a neck incision the surgeon identifies the recurrent laryngeal nerves and parathyroids, removes the planned lobe or whole gland, and checks haemostasis. A drain may be used.",
    approaches: [
      { label: "Hemithyroidectomy / lobectomy", detail: "Removes one lobe when disease is limited." },
      { label: "Total thyroidectomy", detail: "Removes both lobes when indication requires it." },
      { label: "Thyroidectomy with neck dissection", detail: "Nodal surgery is a different, larger episode if not listed." },
    ],
    duration: "Often 1.5–3 hours depending on laterality and nodes",
    admission: "Usually 1–4 nights for calcium and voice observation.",
    recovery:
      "Neck-wound care, calcium checks and voice review are typical. Flying requires stable calcium, a quiet wound and the team's airway advice.",
    risks:
      "Risks include bleeding or haematoma, recurrent-laryngeal-nerve injury, hypoparathyroidism, infection, need for thyroid hormone, incomplete resection and, rarely, airway emergency.",
    urgent: "neck swelling with breathing difficulty, tetany or tingling with low calcium, high fever or wound bleeding",
    drivers: [
      { label: "Hemi- versus total thyroidectomy", detail: "Gland volume and two-nerve dissection change time." },
      { label: "Nerve monitoring", detail: "Should be a named line when used." },
      { label: "Neck dissection", detail: "Oncologic nodal work is not a simple add-on." },
      { label: "Retrosternal goitre", detail: "May need longer stay or thoracic backup." },
      { label: "Calcium replacement and hormone", detail: "Long-term medicines are often extra." },
    ],
    inclusions: [...commonInclusions, { label: "Listed gland resection", detail: "Only the stated lobe or total thyroidectomy." }],
    exclusions: commonExclusions,
    records: ["Thyroid ultrasound and cytology", "Thyroid-function tests", "Vocal-cord examination", "Prior neck-surgery notes"],
    followUp: "Follow-up reviews calcium, voice, histology and hormone replacement with endocrinology and ENT.",
    quoteQuestions: ["Is this a lobe or a total thyroidectomy?", "Is nerve monitoring included?", "Is neck dissection assumed?"],
    related: ["Head & Neck Cancer Surgery", "Vocal Cord Surgery", "Skull Base Surgery"],
    imageAlts: [
      "Medical illustration of the thyroid gland, recurrent laryngeal nerves and parathyroid glands in the neck",
      "Clinical diagram of planned thyroid-lobe removal while protecting the recurrent laryngeal nerve",
      "Thyroid-surgery recovery pathway showing calcium checks, voice review, wound care and travel clearance",
    ],
  },
  {
    procedure: "Head & Neck Cancer Surgery",
    shortName: "head and neck cancer surgery",
    specialist: "head-and-neck ENT surgeon working with a tumour board",
    definition:
      "Head and neck cancer surgery removes a selected primary tumour of the upper aerodigestive tract or neck and may include reconstruction or neck dissection after multidisciplinary review.",
    candidacy:
      "It may be considered when biopsy and staging show a resectable ENT primary and the tumour board agrees that surgery is part of the plan rather than radiotherapy or systemic therapy alone.",
    limits:
      "This is not a single named resection. Oral cancer surgery, TORS and neck dissection also exist as other CMS procedures. Reconstruction, tracheostomy and adjuvant treatment are often separate episodes.",
    evaluation:
      "Assessment includes biopsy, imaging, dental and nutrition review, airway planning and a documented multidisciplinary discussion.",
    technique:
      "The surgeon resects the named primary with an appropriate margin, addresses planned neck levels and reconstructs only if that reconstruction is in the written plan.",
    approaches: [
      { label: "Transoral or limited open resection", detail: "Used for selected accessible primaries." },
      { label: "Composite resection with reconstruction", detail: "A free flap or pedicled flap is a major extra episode if needed." },
      { label: "Surgery plus adjuvant therapy", detail: "Radiotherapy or chemoradiation is not included in a surgery quote unless written." },
    ],
    duration: "From about two hours for a limited resection to many hours with reconstruction",
    admission: "Usually 5–14 nights; flaps, tracheostomy or ICU extend stay.",
    recovery:
      "Airway, swallow and wound care dominate early recovery. Flying requires a stable airway, nutrition plan and the oncology team's clearance.",
    risks:
      "Risks include bleeding, infection, flap or wound failure, speech or swallow change, fistula, nerve injury, incomplete margin control, recurrence and anaesthesia or ICU complications.",
    urgent: "airway obstruction, flap colour change, heavy bleeding, high fever or inability to handle secretions",
    drivers: [
      { label: "Primary site and T-stage", detail: "A small oral lesion differs from a laryngectomy-scale sitting." },
      { label: "Neck dissection laterality", detail: "Nodal work multiplies time." },
      { label: "Reconstruction", detail: "Microvascular flaps dominate many invoices." },
      { label: "ICU and tracheostomy", detail: "Airway support is often extra unless listed." },
      { label: "Adjuvant treatment", detail: "Radiation is a separate specialty sheet." },
    ],
    inclusions: [...commonInclusions, { label: "Named resection and neck levels", detail: "Only the primary and nodal work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Biopsy and histopathology", "Staging CT, MRI or PET as available", "Tumour-board summary", "Nutrition and airway notes"],
    followUp: "Follow-up is oncologic: wounds, swallow, histology, adjuvant planning and surveillance with a local head-and-neck team.",
    quoteQuestions: ["Which primary and neck levels are included?", "Is reconstruction included?", "Is ICU or tracheostomy assumed?"],
    related: ["Transoral Robotic Surgery (TORS)", "Thyroid Surgery", "Microlaryngeal Surgery"],
    imageAlts: [
      "Medical illustration of oral cavity, pharynx and neck nodal levels relevant to head-and-neck cancer surgery",
      "Clinical diagram of planned primary resection and neck-level clearance without implying a specific outcome",
      "Head-and-neck cancer surgery recovery pathway showing airway and swallow care, wound review and oncology follow-up",
    ],
  },
  {
    procedure: "Skull Base Surgery",
    shortName: "skull base surgery",
    specialist: "ENT skull-base surgeon working with neurosurgery on the same plan",
    definition:
      "Skull base surgery approaches selected lesions at the interface of the nose, ear or neck with the cranial base, often using endoscopic endonasal or lateral routes with a combined ENT–neurosurgery team.",
    candidacy:
      "It may be considered for selected pituitary, sinonasal, petroclival or other skull-base lesions after imaging and a joint ENT–neurosurgery review.",
    limits:
      "This page is not a single corridor or a promise of complete resection. Endoscopic skull base surgery also exists as a neurosurgery-listed name. CSF leak, hormone or cranial-nerve effects can occur.",
    evaluation:
      "Assessment includes high-resolution imaging, endoscopy, pituitary or hearing tests as relevant, and a documented two-specialty plan for reconstruction of the defect.",
    technique:
      "Depending on the lesion, the team works through the nose with endoscopes or through a lateral otologic or open approach, removes the planned tumour or disease, and reconstructs the skull-base defect.",
    approaches: [
      { label: "Endoscopic endonasal approach", detail: "Used for selected midline lesions when anatomy allows." },
      { label: "Lateral or otologic skull-base approach", detail: "Used for temporal-bone or petroclival disease." },
      { label: "Open craniofacial approach", detail: "Reserved for disease that cannot be reached safely endoscopically." },
    ],
    duration: "Often several hours; complex cases can occupy a full theatre day",
    admission: "Usually 5–12 nights with ICU observation for CSF leak, vision or hormone issues.",
    recovery:
      "Nasal restrictions, CSF-leak precautions and sometimes hormone replacement dominate early recovery. Flying requires explicit neurosurgical and ENT clearance.",
    risks:
      "Risks include cerebrospinal-fluid leak, meningitis, bleeding, vision or cranial-nerve injury, hormone deficiency, stroke in rare vascular cases, incomplete resection and need for further treatment.",
    urgent: "clear watery nasal leak, high fever, sudden vision loss, severe headache, neck stiffness or confusion",
    drivers: [
      { label: "Approach corridor", detail: "Endonasal versus lateral versus open work uses different teams and time." },
      { label: "Reconstruction of the defect", detail: "Nasoseptal flaps or grafts should be itemized." },
      { label: "ICU and CSF-leak care", detail: "Lumbar drains or extra nights change the bill." },
      { label: "Navigation and neuromonitoring", detail: "Major extras if not listed." },
      { label: "Two-specialty professional fees", detail: "ENT and neurosurgery fees may be billed separately." },
    ],
    inclusions: [...commonInclusions, { label: "Named corridor and reconstruction", detail: "Only the approach and flap plan written in the estimate." }],
    exclusions: commonExclusions,
    records: ["CT and MRI of the skull base", "Endoscopy notes", "Hormone or hearing tests as relevant", "Prior sinus or neurosurgery notes"],
    followUp: "Follow-up is shared: nasal debridement, CSF-leak watch, imaging and endocrinology or hearing care as indicated.",
    quoteQuestions: ["Is neurosurgery included in the fee?", "What reconstruction is assumed?", "How many ICU nights are included?"],
    related: ["FESS (Functional Endoscopic Sinus Surgery)", "Mastoidectomy", "Head & Neck Cancer Surgery"],
    imageAlts: [
      "Medical illustration of the anterior and lateral skull base beneath the brain and behind the sinuses",
      "Clinical diagram of an endoscopic endonasal approach to a midline skull-base lesion with planned reconstruction",
      "Skull-base surgery recovery pathway showing CSF-leak precautions, ICU observation, nasal care and travel clearance",
    ],
  },
];

export const entArticles = profiles.map(createEntArticle);

export const entArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  entArticles.map((article) => [article.slug, article]),
);