import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { DENTISTRY_PROCEDURES, toSlug } from "../../lib/taxonomy";

type DentistryProfile = {
  procedure: (typeof DENTISTRY_PROCEDURES)[number];
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
  related: Array<(typeof DENTISTRY_PROCEDURES)[number]>;
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
      "Delhi, Gurugram, Noida and Faridabad are separate dental corridors. Confirm the exact clinic or hospital campus before booking because a cross-NCR transfer soon after oral surgery, implant placement or jaw fixation is difficult.",
    lodging:
      "Choose flexible lodging near the named campus with a soft-food option, private bathroom and a way to reach the treating team quickly for bleeding or swelling concern.",
    recovery:
      "Winter air pollution and dry summer air can irritate a healing mouth. Follow the team's rinse, diet and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed laboratory try-ins, suture removal or an urgent return for bleeding.",
    lodging:
      "Stay on the same side of the harbour as the confirmed clinic and verify lift access, clean water for rinses and a reliable route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make soft-diet planning, oral hygiene and reliable transport practical parts of discharge planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after implant surgery, orthognathic work or complex extractions.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy and first dressing or adjustment access.",
    recovery:
      "Milder weather does not remove bleeding, swelling or bite-adjustment precautions. Arrange the first clinical review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several dental campuses have comparatively direct airport access, but heat, humidity and travel after anaesthesia still require a planned vehicle and companion for surgical cases.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with safe water for rinses and easy access for suture care or prosthesis adjustment.",
    recovery:
      "Heat can worsen dehydration after oral surgery. Fluid and soft-diet targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the dental team for surgical pathways.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after implants, extractions or jaw surgery. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, materials, laboratory scope, admission or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact dental procedure, materials, laboratory fees, imaging, anaesthesia and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish implant warranty terms, laboratory continuity or aftercare after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, laboratory, imaging, pharmacy and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual teeth, materials and staging plan rather than a general dentistry package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, material scope and post-travel dental follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who adjusts prostheses or reviews healing after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, laboratory, imaging and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: DentistryProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic dental or clinic label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader dentistry ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, materials, staging and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, materials plan and route for urgent dental reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete dental records before non-refundable travel. Remote review can change after examination, imaging or laboratory try-in.",
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
          `Ask the provider to name the ${profile.specialist}, campus, materials assumptions, laboratory work, monitoring, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if surgical monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send dental notes, relevant imaging and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm theatre or chair readiness, laboratory capacity and emergency bleeding backup where relevant.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews symptoms, sutures or prosthesis function and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, materials, laboratory assumptions, observation plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `There is no universal flight date. ${profile.recovery} The treating team must document travel fitness for surgical pathways.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and campus, materials assumptions, laboratory work, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

const commonInclusions: LabelledDetail[] = [
  { label: "Named dentist consultation", detail: "Records review and examination as listed in the estimate." },
  { label: "Stated imaging", detail: "OPG, CBCT or intraoral films only when expressly included." },
  { label: "Procedure as named", detail: "The exact dentistry pathway written on the quotation." },
  { label: "Routine medicines", detail: "Analgesia and antibiotics only as listed for the episode." },
  { label: "First review", detail: "The first suture, try-in or adjustment visit when included." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Additional teeth or arches", detail: "Work beyond the named units or arch is a separate episode." },
  { label: "Bone graft or sinus lift", detail: "Separate unless the indication and material are written." },
  { label: "Laboratory remakes after travel", detail: "Extra remakes, courier fees and long-term maintenance." },
  { label: "Complications and emergency care", detail: "Bleeding, infection, failed osseointegration or reoperation." },
  { label: "Flights and lodging", detail: "Travel, companion costs and hotel nights remain outside the clinical quote." },
];

function createDentistryArticle(profile: DentistryProfile): CostArticle {
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
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, materials, staging, risks and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, materials, clinic and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} Selection among ${approachNames} depends on anatomy, remaining tooth structure and the treating team's assessment, not on a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named dentist, chair or theatre time, stated imaging, routine medicines and the listed stay, while extra materials, grafts, laboratory remakes or another tooth depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Emergency treatment, failed integration or a different material can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified dental team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, materials plan and monitoring assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different material, extra tooth or a combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term maintenance and laboratory remakes visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different tooth counts, materials or laboratory scope. Compare professional fees, chair or theatre time, imaging, materials, observation nights, medicines, exclusions and emergency terms.`,
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
        "Suitability depends on individual assessment by a qualified dentist and, where relevant, an oral surgeon, orthodontist or prosthodontist. This page cannot diagnose a reader or recommend a personal procedure.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, allergy, infection risk and any bite or periodontal baseline before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team when anaesthesia is planned. Report fever, facial swelling, uncontrolled bleeding or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Soft diet, oral hygiene and activity limits are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — tooth, gum, bite or jaw — from other dental disease that may still need cleaning, medicines or another procedure.",
          "No page can promise lifelong implant success, perfect shade match, relapse-free orthodontics or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, smoking, periodontal disease, medical fitness, materials and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for emergency access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish chair time, any hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly after oral or jaw surgery.",
          `${profile.followUp} Flights should remain flexible until the team confirms swelling control, prosthesis stability and travel fitness where relevant.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, laboratory remakes and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, materials and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, materials, laboratory work, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination or imaging only when clinically indicated before final consent." },
        { label: "Procedure and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the procedure report, material or implant card where relevant and follow-up plan.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, anatomy, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this procedure cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, materials, laboratory scope, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion where needed and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned procedure", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe oral intake, hygiene care and symptom control.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice when surgery was involved.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local dentist.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Dental notes and any available OPG, CBCT or intraoral photographs",
      "Previous implant, orthodontic or oral-surgery notes and material cards",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, materials, laboratory scope, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, materials, laboratory work, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic dental entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, hospital dental theatres and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, emergency bleeding backup, material traceability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Active infection, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical or alternative dental options were discussed?`,
      "How were my teeth, gums, bite and previous procedures assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the procedure occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, radiographs, CBCT and laboratory steps are included?",
      "Are specialist, chair or theatre, anaesthesia and recovery-room fees included?",
      "Which implant, ceramic, aligner or prosthetic brand is assumed?",
      "Are manufacturer, lot and warranty details provided where applicable?",
      "Would an extra tooth, graft or arch change the quotation?",
      "How many ward or observation nights and which room category are included for surgical pathways?",
      "How are extra nights, bleeding, another procedure or a complication billed?",
      "Which discharge medicines, rinses or temporary prostheses are included?",
      "What diet and oral-hygiene instructions apply after discharge?",
      "When can I fly, work, chew harder foods or resume other activity?",
      "Which follow-up visits, try-ins or adjustments are included?",
      "How are complications handled after I leave India?",
      "When and by whom will fitness to fly be assessed after oral surgery?",
      "What procedure report, images and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my home dentist after I return?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, materials, laboratory scope and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is dentistry in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, materials, laboratory work, monitoring and follow-up.",
      },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: profile.technique },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Actual timing depends on anatomy, findings during the case and the clinical course.`,
      },
      { q: "How long is the hospital or clinic stay?", a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed flight day after surgical dentistry. ${profile.recovery} The treating team must document travel fitness when anaesthesia or oral surgery was involved.`,
      },
      {
        q: "Which Indian cities offer this procedure?",
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant dentistry ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews sutures, occlusion, implants or orthodontic progress.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and dental centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards must follow exact live entity relationships for ${profile.procedure}. A general dentistry, implant or accreditation label does not establish current case acceptance, laboratory continuity or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/dentistry/${slug}-illustration.webp`,
        alt: profile.imageAlts[0],
        caption: "A general educational illustration, not a patient-specific anatomy, recommendation or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/dentistry/dentistry-treatment-pathway.webp",
        alt: profile.imageAlts[1],
        caption: "The actual pathway depends on candidacy, anatomy, materials and clinical course.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/dentistry/dentistry-recovery-follow-up.webp",
        alt: profile.imageAlts[2],
        caption: "Diet, hygiene and review timing must be individualized by the treating team.",
        fit: "contain",
      },
    ],
  };
}

const profiles: DentistryProfile[] = [
  {
    procedure: "Dental Implants",
    shortName: "dental implants",
    specialist: "implant dentist or oral surgeon",
    definition:
      "Dental implants replace a missing tooth root with a biocompatible fixture that can later support a crown, bridge or denture when bone and healing allow.",
    candidacy:
      "It may be considered when one or more teeth are missing, remaining bone and gums can support a fixture, and medical fitness allows surgery and healing.",
    limits:
      "Implants are not automatic for every gap. Uncontrolled periodontal disease, heavy smoking, inadequate bone without grafting options, or inability to maintain hygiene may favour delay or another restorative plan.",
    evaluation:
      "Assessment includes medical history, periodontal status, bite analysis and usually OPG or CBCT to judge bone volume, nerves and sinus proximity.",
    technique:
      "After planning, the fixture is placed in the jaw under local anaesthesia or sedation; a healing period may precede the abutment and final crown.",
    approaches: [
      { label: "Single-tooth implant", detail: "One fixture and crown for an isolated gap when neighbouring teeth are sound." },
      { label: "Implant with staged loading", detail: "Healing and temporary prosthesis before the final crown when primary stability is limited." },
      { label: "Bridge or denture alternative", detail: "Discussed when implants are unsuitable or the patient prefers a non-surgical pathway." },
    ],
    duration: "often about 45–90 minutes per straightforward fixture, with longer time for grafts or multiple sites",
    admission: "Usually outpatient; overnight observation is uncommon unless sedation, medical risk or grafting requires it.",
    recovery:
      "Soft diet, oral hygiene around the site and activity limits dominate early days. Flying after uncomplicated placement is often possible within a few days once bleeding and swelling settle, but the team must confirm.",
    risks:
      "Risks include infection, bleeding, nerve injury near lower molars, sinus issues in the upper jaw, failed osseointegration and need for revision or grafting.",
    urgent: "uncontrolled bleeding, rapidly increasing facial swelling, fever, numbness that worsens, or inability to swallow",
    drivers: [
      { label: "Number of fixtures", detail: "Each additional implant multiplies surgery and prosthetic fees." },
      { label: "Bone graft or sinus lift", detail: "Augmentation materials and theatre time change the episode." },
      { label: "Prosthetic type", detail: "Crown versus multi-unit bridge assumptions must be written." },
      { label: "Imaging and guided surgery", detail: "CBCT and surgical guides may be extras." },
      { label: "Brand and abutment components", detail: "Manufacturer and prosthetic parts should be named." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["OPG or CBCT", "Periodontal charting", "Medical and smoking history"],
    followUp: "Follow-up checks healing, hygiene and prosthetic fit, then long-term maintenance with a home dentist.",
    quoteQuestions: ["How many fixtures and which brand are included?", "Is a graft assumed?", "What temporary prosthesis is provided during healing?"],
    related: ["Full Mouth Dental Implants", "Dental Crowns and Bridges", "Tooth Extraction"],
    imageAlts: [
      "Medical illustration of a titanium dental implant fixture in the jaw supporting a crown",
      "Clinical diagram of implant placement planning with bone volume and neighbouring teeth",
      "Dental implant recovery pathway showing soft diet, hygiene and prosthetic loading stages",
    ],
  },
  {
    procedure: "Full Mouth Dental Implants",
    shortName: "full mouth dental implants",
    specialist: "prosthodontist or oral surgeon leading an implant team",
    definition:
      "Full mouth dental implants restore an entire arch or both arches with implant-supported fixed or removable teeth when most or all natural teeth are missing or failing.",
    candidacy:
      "It may be considered for extensive tooth loss when bone, medical fitness and maintenance capacity support a full-arch implant plan rather than conventional dentures alone.",
    limits:
      "A brochure All-on-4 label is not a diagnosis. Severe bone loss, uncontrolled disease, unrealistic shade or bite expectations, or inability to attend staged visits may require another pathway.",
    evaluation:
      "Planning uses full-arch imaging, bite records, medical review and a written temporary-to-final prosthetic sequence.",
    technique:
      "Several fixtures are placed per arch according to the plan; a temporary prosthesis may be fitted the same day or after healing, with the final bridge after integration.",
    approaches: [
      { label: "Fixed full-arch implant bridge", detail: "Screw-retained or cemented bridge on multiple fixtures." },
      { label: "Implant-supported overdenture", detail: "Removable prosthesis retained on fewer fixtures when indicated." },
      { label: "Staged extraction and conversion", detail: "Failing teeth removed and converted to implant support when the plan requires it." },
    ],
    duration: "often several hours per arch on surgery day, with laboratory stages spanning weeks to months",
    admission: "Often 1–3 nights nearby for surgical recovery; some programmes are day-care with close follow-up.",
    recovery:
      "Swelling, soft diet and multiple try-in visits are expected. International patients should plan for staged returns or an extended India stay until the temporary prosthesis is stable.",
    risks:
      "Risks include infection, fixture failure, speech or bite adjustment needs, prosthesis fracture, sinus or nerve injury and the need for remakes.",
    urgent: "heavy bleeding, airway-threatening swelling, high fever, or prosthesis that cannot be worn safely",
    drivers: [
      { label: "One versus both arches", detail: "Double-arch work roughly doubles surgical and laboratory scope." },
      { label: "Fixture count and distribution", detail: "All-on-4 versus more fixtures changes materials and fees." },
      { label: "Same-day versus delayed loading", detail: "Temporary prosthesis logistics affect stay and cost." },
      { label: "Extractions and grafting", detail: "Clearance and augmentation add episodes." },
      { label: "Final material choice", detail: "Acrylic, composite or ceramic bridges are not interchangeable prices." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Full-arch CBCT or OPG", "Photographs and bite records", "List of failing teeth and prior prostheses"],
    followUp: "Long-term hygiene, screw checks and night-guard advice continue with a home dentist familiar with implant bridges.",
    quoteQuestions: ["How many fixtures per arch are planned?", "Is a same-day temporary included?", "What final material and warranty terms are written?"],
    related: ["Dental Implants", "Dentures", "Full Mouth Rehabilitation"],
    imageAlts: [
      "Medical illustration of a full-arch implant-supported fixed bridge replacing missing teeth",
      "Clinical diagram of multi-fixture full-mouth implant planning across an edentulous arch",
      "Full-mouth implant recovery pathway showing temporary prosthesis, soft diet and final bridge stages",
    ],
  },
  {
    procedure: "Dental Crowns and Bridges",
    shortName: "dental crowns and bridges",
    specialist: "restorative dentist or prosthodontist",
    definition:
      "Dental crowns cover damaged teeth; bridges replace a short span of missing teeth by linking crowns on neighbouring abutments or implants.",
    candidacy:
      "It may be considered when a tooth needs structural coverage after large fillings, root canal or fracture, or when a short edentulous span suits a fixed bridge.",
    limits:
      "Bridges sacrifice abutment tooth structure. Long spans, active gum disease or heavy parafunction may favour implants or removable options instead.",
    evaluation:
      "Review includes radiographs, pulp vitality, periodontal status, occlusion and shade matching for laboratory work.",
    technique:
      "Teeth are prepared, impressions or scans are taken, temporaries placed, and the laboratory crown or bridge is cemented or bonded after try-in.",
    approaches: [
      { label: "Single crown", detail: "Covers one tooth after preparation." },
      { label: "Fixed dental bridge", detail: "Replaces one or more missing teeth using abutments." },
      { label: "Implant-supported crown or bridge", detail: "Uses fixtures rather than natural abutments when that is the named plan." },
    ],
    duration: "usually two or more chair visits over one to three weeks depending on laboratory turnaround",
    admission: "Outpatient chairside care; no hospital night is typical.",
    recovery:
      "Temporary sensitivity and soft chewing on the side are common until cementation. Flying is rarely restricted after routine crown work.",
    risks:
      "Risks include pulp irritation, need for root canal later, cement washout, porcelain fracture, open margins and abutment tooth failure under bridges.",
    urgent: "severe pain after preparation, swelling, or a temporary that will not stay in place before travel",
    drivers: [
      { label: "Number of units", detail: "Each crown unit multiplies laboratory fees." },
      { label: "Material", detail: "Zirconia, porcelain-fused-to-metal and other ceramics differ in price." },
      { label: "Need for root canal or build-up", detail: "Foundation work is often separate." },
      { label: "Digital versus conventional impressions", detail: "Scanner and laboratory pathways vary." },
      { label: "Remakes and shade corrections", detail: "Extra try-ins can extend stay." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Bitewing or periapical radiographs", "Shade and photograph records", "Prior crown or root-canal notes"],
    followUp: "Home dentists should check margins, occlusion and hygiene around bridge pontics.",
    quoteQuestions: ["How many units are priced?", "Which ceramic system is assumed?", "Are temporaries and cementation visits included?"],
    related: ["Dental Veneers", "Dental Implants", "Root Canal Treatment"],
    imageAlts: [
      "Medical illustration of a dental crown covering a prepared tooth and a three-unit bridge spanning a gap",
      "Clinical diagram of tooth preparation and laboratory crown try-in stages",
      "Crown and bridge recovery pathway showing temporary coverage, cementation and bite check",
    ],
  },
  {
    procedure: "Dentures",
    shortName: "dentures",
    specialist: "prosthodontist or restorative dentist",
    definition:
      "Dentures are removable prostheses that replace missing teeth and supporting tissues for a partial or complete arch.",
    candidacy:
      "It may be considered when many teeth are missing, implant pathways are unsuitable or undesired, or a removable option is preferred for cost or medical reasons.",
    limits:
      "Dentures do not stop ridge resorption. Loose fits, gagging, and chewing limits are common; implant retention is a different product when indicated.",
    evaluation:
      "Assessment covers remaining teeth, ridge form, saliva, bite and whether immediate or conventional dentures are appropriate after extractions.",
    technique:
      "Impressions, bite registration and try-ins lead to a processed acrylic or flexible prosthesis that is adjusted after delivery.",
    approaches: [
      { label: "Complete denture", detail: "Replaces all teeth on an arch." },
      { label: "Partial denture", detail: "Replaces selected teeth while retaining others." },
      { label: "Immediate denture", detail: "Placed after extractions with expected relines as ridges heal." },
    ],
    duration: "typically several outpatient visits over two to six weeks",
    admission: "Outpatient; extractions scheduled with denture delivery may need a quiet recovery day nearby.",
    recovery:
      "Sore spots, speech adaptation and soft diet are expected. Relines may be required as tissues remodel.",
    risks:
      "Risks include sore spots, candida under the base, breakage, poor retention and aspiration risk if a broken piece is swallowed.",
    urgent: "severe ulceration, facial swelling after extractions, or a denture that cannot be worn after delivery",
    drivers: [
      { label: "Complete versus partial", detail: "Framework design changes laboratory cost." },
      { label: "Immediate versus conventional timing", detail: "Extractions and relines alter the pathway." },
      { label: "Material", detail: "Acrylic, flexible and cast-metal frameworks differ." },
      { label: "Number of try-ins", detail: "Extra shade or fit visits extend stay." },
      { label: "Reline and repair allowance", detail: "Must be written, not assumed." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["OPG if available", "List of remaining teeth", "Prior denture history"],
    followUp: "Periodic relines and oral-cancer screening of edentulous ridges continue at home.",
    quoteQuestions: ["Is an immediate denture included after extractions?", "How many try-ins are included?", "What reline policy applies in the first months?"],
    related: ["Full Mouth Dental Implants", "Tooth Extraction", "Full Mouth Rehabilitation"],
    imageAlts: [
      "Medical illustration of complete and partial removable dentures replacing missing teeth",
      "Clinical diagram of impression, try-in and denture delivery stages",
      "Denture adaptation pathway showing soft diet, sore-spot adjustment and home care",
    ],
  },
  {
    procedure: "Full Mouth Rehabilitation",
    shortName: "full mouth rehabilitation",
    specialist: "prosthodontist coordinating restorative and surgical colleagues",
    definition:
      "Full mouth rehabilitation rebuilds worn, broken or failing teeth across both arches to restore bite height, function and appearance through a staged multidisciplinary plan.",
    candidacy:
      "It may be considered when generalized wear, collapse of bite, failing restorations or combined functional and aesthetic problems cannot be fixed with isolated crowns.",
    limits:
      "This is not a single-day package. Active infection, untreated gum disease or unclear aesthetic goals must be resolved before irreversible preparation of many teeth.",
    evaluation:
      "Records include mounted models or digital scans, photographs, periodontal charting, pulp status and a written sequence of provisional then final restorations.",
    technique:
      "Provisional restorations establish a new bite; after testing comfort and speech, final crowns, veneers, implants or dentures are delivered in stages.",
    approaches: [
      { label: "Provisional-guided rehabilitation", detail: "Long-term temporaries test vertical dimension before finals." },
      { label: "Combined implant and tooth-supported plan", detail: "Mixes fixtures and natural abutments when anatomy requires it." },
      { label: "Orthodontic or surgical adjunct", detail: "Aligners, braces or jaw surgery when skeletal or crowding issues dominate." },
    ],
    duration: "often weeks to months of staged visits rather than a single theatre day",
    admission: "Mostly outpatient; surgical segments may need overnight observation.",
    recovery:
      "Speech and chewing adaptation under provisionals is expected. International patients should budget multiple visits or an extended stay.",
    risks:
      "Risks include pulp injury, restoration fracture, bite instability, aesthetic dissatisfaction and the need to revise the plan mid-course.",
    urgent: "acute pulpitis under provisionals, fracture that leaves a tooth unprotected, or infection",
    drivers: [
      { label: "Number of teeth restored", detail: "Unit count dominates laboratory fees." },
      { label: "Implant or orthodontic adjuncts", detail: "Separate specialty sheets may apply." },
      { label: "Provisional duration", detail: "Long testing phases add chair time." },
      { label: "Material for finals", detail: "Ceramic systems vary widely." },
      { label: "Laboratory remakes", detail: "Shade and bite corrections after travel are costly." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Full-mouth radiographs", "Photographs and bite records", "Periodontal and pulp assessments"],
    followUp: "Night guards, hygiene and periodic occlusal checks continue with the home dentist.",
    quoteQuestions: ["How many teeth are in the provisional and final plans?", "How long must provisionals be tested before finals?", "Which laboratory and materials are named?"],
    related: ["Smile Makeover", "Dental Crowns and Bridges", "Full Mouth Dental Implants"],
    imageAlts: [
      "Medical illustration of worn dentition rebuilt with crowns across both arches to restore bite height",
      "Clinical diagram of provisional full-mouth rehabilitation testing occlusion before final ceramics",
      "Full mouth rehabilitation pathway showing staging, provisional wear and final delivery",
    ],
  },
  {
    procedure: "Braces and Orthodontic Treatment",
    shortName: "braces and orthodontic treatment",
    specialist: "orthodontist",
    definition:
      "Braces use fixed brackets and wires to move teeth and improve bite relationships over a planned course of adjustments.",
    candidacy:
      "It may be considered for crowding, spacing, bite problems or preparation for restorative or surgical work when growth and periodontal health allow tooth movement.",
    limits:
      "Braces cannot reliably correct major skeletal jaw discrepancy alone. Active gum disease, poor hygiene or inability to attend adjustments makes treatment unsafe.",
    evaluation:
      "Records usually include photographs, radiographs and study models or scans, plus a written treatment duration estimate.",
    technique:
      "Brackets are bonded, wires activated and adjusted over months; retainers follow active movement.",
    approaches: [
      { label: "Metal fixed braces", detail: "Standard brackets for a wide range of malocclusions." },
      { label: "Ceramic fixed braces", detail: "Tooth-coloured brackets with similar mechanics." },
      { label: "Surgical orthodontics pathway", detail: "Combined with jaw surgery when skeletal correction is required." },
    ],
    duration: "often 12–30 months of active treatment depending on complexity",
    admission: "Outpatient; no hospital stay for routine bonding or adjustments.",
    recovery:
      "Soreness after activations is common. International patients must plan how adjustments continue after return or accept a long India stay.",
    risks:
      "Risks include white-spot lesions, root resorption, relapse without retainers, and unfinished treatment if follow-up lapses.",
    urgent: "wire poking that cuts the cheek severely, trauma dislodging brackets with pain, or signs of infection around attachments",
    drivers: [
      { label: "Case complexity", detail: "Extraction versus non-extraction plans differ." },
      { label: "Appliance type", detail: "Ceramic or specialty appliances may cost more." },
      { label: "Duration and visit count", detail: "Longer courses add fees." },
      { label: "Retention protocol", detail: "Fixed and removable retainers should be itemized." },
      { label: "Jaw surgery adjunct", detail: "A separate surgical estimate if indicated." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Orthodontic photographs", "OPG and lateral cephalogram if available", "Prior orthodontic history"],
    followUp: "Retainers and hygiene reviews continue for years; relapse risk rises if retainers are abandoned.",
    quoteQuestions: ["What is the estimated active treatment duration?", "Are retainers included?", "How will adjustments continue after I leave India?"],
    related: ["Clear Aligners", "Jaw Surgery", "Smile Makeover"],
    imageAlts: [
      "Medical illustration of fixed orthodontic braces moving crowded teeth into alignment",
      "Clinical diagram of bracket bonding and staged wire activations",
      "Orthodontic retention pathway showing retainers after active braces treatment",
    ],
  },
  {
    procedure: "Clear Aligners",
    shortName: "clear aligners",
    specialist: "orthodontist experienced with aligner systems",
    definition:
      "Clear aligners are a series of removable plastic trays that gradually move teeth according to a digital treatment plan.",
    candidacy:
      "It may be considered for mild to moderate crowding, spacing or bite issues when the patient can wear trays reliably for the prescribed hours.",
    limits:
      "Complex skeletal problems, large rotations or non-compliance often favour fixed braces instead. Marketing 'invisible' claims do not guarantee every case is suitable.",
    evaluation:
      "Digital scans or impressions, photographs and a software plan with attachment and refinement assumptions are reviewed before starting.",
    technique:
      "Attachments may be bonded; trays are worn in sequence, with refinements if tracking is imperfect.",
    approaches: [
      { label: "Full clear-aligner series", detail: "Complete digital plan with planned refinements." },
      { label: "Limited aligner course", detail: "Fewer trays for minor relapse or spacing." },
      { label: "Braces conversion", detail: "Switch to fixed appliances if aligners fail to track." },
    ],
    duration: "commonly several months to about two years depending on movement goals",
    admission: "Outpatient; trays are usually delivered after remote or in-person review of the digital plan.",
    recovery:
      "Temporary pressure with each new tray is expected. Travel is rarely restricted, but refinements require a plan for remote monitoring or return visits.",
    risks:
      "Risks include poor tracking, attachment failure, relapse without retainers, and unfinished goals if wear time is inadequate.",
    urgent: "severe allergic reaction to materials (rare) or trauma affecting bonded attachments",
    drivers: [
      { label: "Number of aligners and refinements", detail: "Extra stages change fees." },
      { label: "Brand and supervision model", detail: "Dentist-directed versus remote-only pathways differ." },
      { label: "Attachments and IPR", detail: "Interproximal reduction and bonded features should be disclosed." },
      { label: "Retention", detail: "Retainers after active trays are separate if not listed." },
      { label: "Conversion to braces", detail: "May restart costs if tracking fails." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Digital scan or impressions", "Photographs", "Prior orthodontic notes"],
    followUp: "Retainers and periodic bite checks continue with a home orthodontist or dentist.",
    quoteQuestions: ["How many trays and refinements are included?", "Is remote monitoring available after I leave?", "What happens if tracking fails?"],
    related: ["Braces and Orthodontic Treatment", "Smile Makeover", "Dental Veneers"],
    imageAlts: [
      "Medical illustration of clear aligner trays seating over teeth with bonded attachments",
      "Clinical diagram of digital aligner staging from crowded to aligned arches",
      "Clear aligner wear pathway showing daily hours, refinements and retainers",
    ],
  },
  {
    procedure: "Wisdom Tooth Removal",
    shortName: "wisdom tooth removal",
    specialist: "oral surgeon or dentist experienced with third molars",
    definition:
      "Wisdom tooth removal extracts one or more third molars that are erupted, partially erupted or impacted.",
    candidacy:
      "It may be considered for pain, infection, decay, cyst risk, orthodontic plans or pericoronitis when the tooth's position justifies removal.",
    limits:
      "Not every asymptomatic wisdom tooth must be removed. Deeply impacted teeth near the nerve require careful imaging and consent about numbness risk.",
    evaluation:
      "OPG or CBCT assesses roots, nerve proximity and sinus relationship; medical fitness for anaesthesia is reviewed.",
    technique:
      "Under local anaesthesia, sedation or general anaesthesia, the tooth is elevated or sectioned and the socket managed with sutures as needed.",
    approaches: [
      { label: "Simple erupted third-molar extraction", detail: "Forceps removal when access is adequate." },
      { label: "Surgical impacted removal", detail: "Flap, bone removal and sectioning as required." },
      { label: "Staged bilateral removal", detail: "One side at a time when risk or recovery capacity requires it." },
    ],
    duration: "often 20–60 minutes per tooth depending on impaction",
    admission: "Usually outpatient; overnight stay is uncommon unless general anaesthesia or medical risk requires monitoring.",
    recovery:
      "Swelling and soft diet for several days are typical. Flying soon after lower impacted removals should wait until bleeding risk and swelling are reviewed.",
    risks:
      "Risks include dry socket, infection, bleeding, temporary or permanent lip or tongue numbness, sinus communication and damage to neighbouring teeth.",
    urgent: "uncontrolled bleeding, rapidly increasing swelling, fever, difficulty breathing or swallowing, or numbness that is unexpected and worsening",
    drivers: [
      { label: "Number and depth of impactions", detail: "Four impacted teeth differ from one erupted molar." },
      { label: "Anaesthesia type", detail: "Local versus sedation versus GA changes facility fees." },
      { label: "Imaging", detail: "CBCT near the nerve may be extra." },
      { label: "Pathology", detail: "Cysts or infection change complexity." },
      { label: "Complication care", detail: "Dry-socket visits and antibiotics beyond the allowance." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["OPG or CBCT", "History of pericoronitis or antibiotics", "Medical and bleeding history"],
    followUp: "Suture review and symptom check; home dentist continues routine care.",
    quoteQuestions: ["How many wisdom teeth are included?", "Is CBCT included when the nerve is close?", "What anaesthesia level is assumed?"],
    related: ["Tooth Extraction", "Jaw Surgery", "Dental Fillings"],
    imageAlts: [
      "Medical illustration of erupted and impacted wisdom teeth in the posterior jaws",
      "Clinical diagram of surgical third-molar removal with flap and sectioning",
      "Wisdom tooth removal recovery pathway showing swelling control, soft diet and suture care",
    ],
  },
  {
    procedure: "Jaw Surgery",
    shortName: "jaw surgery",
    specialist: "oral and maxillofacial surgeon working with orthodontics",
    definition:
      "Jaw surgery (orthognathic surgery) repositions the upper jaw, lower jaw or both to correct skeletal bite problems that braces alone cannot finish.",
    candidacy:
      "It may be considered for significant underbite, open bite, asymmetry or sleep-related skeletal issues after orthodontic preparation and medical fitness review.",
    limits:
      "Surgery is not a cosmetic shortcut. Untreated periodontal disease, unrealistic expectations or incomplete orthodontic preparation can make outcomes unstable.",
    evaluation:
      "Cephalometric analysis, CBCT, orthodontic records and anaesthetic assessment define whether single-jaw or double-jaw surgery is planned.",
    technique:
      "Under general anaesthesia, the surgeon cuts and repositions jaw segments, fixes them with plates and screws, and coordinates postoperative orthodontics.",
    approaches: [
      { label: "Single-jaw osteotomy", detail: "Moves maxilla or mandible alone when that corrects the discrepancy." },
      { label: "Double-jaw surgery", detail: "Moves both jaws when the plan requires it." },
      { label: "Surgery-first or ortho-first sequencing", detail: "Timing relative to braces is individualized." },
    ],
    duration: "often three to six hours depending on one or both jaws",
    admission: "Usually 2–5 nights in hospital with swelling, diet and airway monitoring.",
    recovery:
      "Facial swelling, numbness and a soft or liquid diet last weeks. International patients need an extended India stay before flying; clearance is individualized.",
    risks:
      "Risks include bleeding, infection, relapse, plate issues, altered sensation of lip or chin, bite discrepancy needing further orthodontics and rare airway complications.",
    urgent: "breathing difficulty, uncontrolled bleeding, high fever, or sudden inability to open the airway or swallow saliva",
    drivers: [
      { label: "Single versus double jaw", detail: "Scope dominates theatre time." },
      { label: "Orthodontic package boundaries", detail: "Braces before and after may be billed separately." },
      { label: "Fixation hardware", detail: "Plates and screws should be itemized." },
      { label: "ICU or HDU assumption", detail: "Not all campuses include it." },
      { label: "Revision or elastics phase", detail: "Postoperative orthodontics continues costs." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Orthodontic work-up", "CBCT or cephalogram", "Medical and anaesthetic history"],
    followUp: "Orthodontic finishing, sensory monitoring and bite elastics continue for months with coordinated teams.",
    quoteQuestions: ["Is this single- or double-jaw surgery?", "Are pre- and post-surgical braces included?", "How many hospital nights are assumed?"],
    related: ["Braces and Orthodontic Treatment", "Wisdom Tooth Removal", "Full Mouth Rehabilitation"],
    imageAlts: [
      "Medical illustration of upper and lower jaw osteotomy lines used in orthognathic surgery",
      "Clinical diagram of planned jaw repositioning to correct skeletal bite discrepancy",
      "Jaw surgery recovery pathway showing hospital stay, soft diet and orthodontic finishing",
    ],
  },
  {
    procedure: "Root Canal Treatment",
    shortName: "root canal treatment",
    specialist: "endodontist or restorative dentist",
    definition:
      "Root canal treatment removes infected or inflamed pulp from inside a tooth, cleans the canals and seals them so the tooth can be restored.",
    candidacy:
      "It may be considered for irreversible pulpitis, pulp necrosis, abscess or when a tooth needs elective endodontics before a complex restoration.",
    limits:
      "Not every painful tooth can be saved. Vertical fractures, insufficient remaining structure or failed prior canals may favour extraction and replacement.",
    evaluation:
      "Clinical tests, periapical radiographs and sometimes CBCT assess canal anatomy and surrounding bone.",
    technique:
      "Access is made through the crown, canals are cleaned and shaped, then filled; a temporary or permanent restoration protects the tooth afterward.",
    approaches: [
      { label: "Primary root canal", detail: "First-time treatment of an inflamed or necrotic pulp." },
      { label: "Retreatment", detail: "Removal of prior filling material when infection persists." },
      { label: "Surgical endodontics", detail: "Apical surgery when orthograde retreatment is unsuitable." },
    ],
    duration: "often 45–120 minutes, sometimes over two visits",
    admission: "Outpatient chairside care.",
    recovery:
      "Mild tenderness for a few days is common. Flying is rarely restricted after uncomplicated treatment.",
    risks:
      "Risks include instrument separation, incomplete cleaning, flare-up, tooth fracture and need for extraction later if infection persists.",
    urgent: "rapid facial swelling, fever, or difficulty swallowing after treatment",
    drivers: [
      { label: "Tooth type", detail: "Molars with more canals cost more than front teeth." },
      { label: "Primary versus retreatment", detail: "Retreatments take longer." },
      { label: "Microscope and CBCT", detail: "May be itemized extras." },
      { label: "Post and core build-up", detail: "Often separate before a crown." },
      { label: "Crown after root canal", detail: "Structural coverage is usually a separate restorative fee." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Periapical radiograph", "Pain and swelling history", "Prior endodontic notes if retreatment"],
    followUp: "A definitive crown is often needed; home dentist monitors healing radiographs.",
    quoteQuestions: ["Is a molar or anterior tooth assumed?", "Is the final crown included?", "What if retreatment or apical surgery is needed?"],
    related: ["Dental Crowns and Bridges", "Tooth Extraction", "Dental Fillings"],
    imageAlts: [
      "Medical illustration of root canal cleaning and sealing inside a tooth",
      "Clinical diagram of access, canal preparation and obturation stages",
      "Root canal recovery pathway showing temporary filling and later crown coverage",
    ],
  },
  {
    procedure: "Gum Surgery",
    shortName: "gum surgery",
    specialist: "periodontist",
    definition:
      "Gum surgery treats advanced periodontal disease or soft-tissue defects through flap, resective, regenerative or grafting procedures after non-surgical cleaning.",
    candidacy:
      "It may be considered when deep pockets, bone loss, gum recession or aesthetics require surgical access beyond scaling and root planing alone.",
    limits:
      "Surgery cannot guarantee tooth preservation if mobility and bone loss are extreme. Smoking and uncontrolled diabetes worsen outcomes.",
    evaluation:
      "Full periodontal charting, radiographs and medical review precede a written surgical plan and maintenance schedule.",
    technique:
      "Under local anaesthesia, flaps are raised, roots cleaned, bone or soft tissue reshaped or grafted, and sutures placed.",
    approaches: [
      { label: "Flap debridement", detail: "Access surgery to clean deep root surfaces." },
      { label: "Regenerative or bone graft surgery", detail: "Attempts to rebuild selected defects." },
      { label: "Soft-tissue graft", detail: "Addresses recession or thin biotype around teeth or implants." },
    ],
    duration: "often 45–120 minutes per surgical field",
    admission: "Usually outpatient; overnight stay is rare.",
    recovery:
      "Soft diet and careful hygiene around sutures for one to two weeks. Flying after uncomplicated flap work is often possible within a few days once bleeding risk settles.",
    risks:
      "Risks include bleeding, infection, recession, tooth sensitivity, graft failure and continued tooth loss if maintenance lapses.",
    urgent: "uncontrolled bleeding, rapidly increasing swelling, fever, or graft site breakdown",
    drivers: [
      { label: "Number of quadrants", detail: "Multi-quadrant surgery multiplies fees." },
      { label: "Graft materials", detail: "Autograft versus substitute materials differ." },
      { label: "Regenerative membranes", detail: "Should be itemized when used." },
      { label: "Sedation", detail: "Optional comfort measures may be extra." },
      { label: "Maintenance programme", detail: "Ongoing cleanings are separate episodes." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Periodontal charting", "Full-mouth radiographs", "Smoking and diabetes status"],
    followUp: "Supportive periodontal maintenance every few months is essential; home cleaning technique is reviewed.",
    quoteQuestions: ["How many teeth or sites are included?", "Is a graft material assumed?", "What maintenance schedule is required afterward?"],
    related: ["Dental Implants", "Dental Crowns and Bridges", "Tooth Extraction"],
    imageAlts: [
      "Medical illustration of periodontal flap surgery around teeth with bone loss",
      "Clinical diagram of gum grafting to cover recession on a tooth root",
      "Gum surgery recovery pathway showing sutures, soft diet and periodontal maintenance",
    ],
  },
  {
    procedure: "Smile Makeover",
    shortName: "smile makeover",
    specialist: "cosmetic or restorative dentist coordinating specialists as needed",
    definition:
      "A smile makeover coordinates whitening, veneers, aligners, gum contouring or restorative work into a planned aesthetic sequence based on photographs and mock-ups.",
    candidacy:
      "It may be considered when a patient seeks aesthetic change and oral health is stable enough to support elective cosmetic dentistry.",
    limits:
      "A makeover is not a substitute for treating decay or gum disease first. Unrealistic 'celebrity smile' expectations and untreated bite problems undermine results.",
    evaluation:
      "Digital smile design or wax-up, photographs, periodontal clearance and discussion of reversible versus irreversible steps come before preparation.",
    technique:
      "Depending on the plan, teeth may be whitened, aligned, minimally prepared for veneers or restored, often with provisional mock-ups first.",
    approaches: [
      { label: "Additive cosmetic plan", detail: "Whitening, bonding or aligners with minimal preparation." },
      { label: "Veneer-led makeover", detail: "Ceramic veneers after mock-up approval." },
      { label: "Combined ortho-restorative plan", detail: "Aligners or braces before veneers or crowns." },
    ],
    duration: "from a few visits over weeks to several months when orthodontics is included",
    admission: "Outpatient; surgical adjuncts are uncommon for pure aesthetic plans.",
    recovery:
      "Sensitivity and adaptation to new shapes are expected. Travel between try-ins should stay flexible.",
    risks:
      "Risks include shade mismatch, need for remakes, pulp irritation after preparation, and dissatisfaction if mock-ups were skipped.",
    urgent: "severe post-preparation pain or a provisional that fails before finals",
    drivers: [
      { label: "Scope of teeth treated", detail: "How many teeth enter the smile zone." },
      { label: "Materials", detail: "Composite versus ceramic pathways differ." },
      { label: "Orthodontic pre-alignment", detail: "Adds months and fees." },
      { label: "Laboratory mock-ups", detail: "Should be included or priced separately." },
      { label: "Remakes after travel", detail: "Courier and remake fees add cost." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Smile photographs", "Periodontal clearance", "Prior cosmetic dentistry notes"],
    followUp: "Night guards when indicated and routine hygiene protect the aesthetic result.",
    quoteQuestions: ["Which teeth and materials are in the written plan?", "Is a reversible mock-up included before preparation?", "How are remakes handled after I leave India?"],
    related: ["Dental Veneers", "Teeth Whitening", "Clear Aligners", "Full Mouth Rehabilitation"],
    imageAlts: [
      "Medical illustration of a coordinated smile makeover combining whitening and veneers",
      "Clinical diagram of digital smile design mock-up before irreversible preparation",
      "Smile makeover pathway showing mock-up, provisional aesthetics and final ceramics",
    ],
  },
  {
    procedure: "Dental Veneers",
    shortName: "dental veneers",
    specialist: "cosmetic or restorative dentist",
    definition:
      "Dental veneers are thin ceramic or composite shells bonded to the front of teeth to change colour, shape or minor alignment when enamel and bite allow.",
    candidacy:
      "It may be considered for discoloration, chips, small gaps or shape concerns after whitening and orthodontic options are discussed.",
    limits:
      "Veneers remove some enamel in many protocols and are not ideal with heavy grinding, active gum disease or large restorations better served by crowns.",
    evaluation:
      "Photographs, mock-ups, bite analysis and shade selection precede irreversible preparation.",
    technique:
      "Teeth are prepared as planned, impressions or scans taken, temporaries placed, and final veneers bonded under isolation.",
    approaches: [
      { label: "Ceramic veneers", detail: "Laboratory porcelain or zirconia-glass ceramics." },
      { label: "Composite veneers", detail: "Direct or indirect resin options." },
      { label: "No-prep or minimal-prep designs", detail: "Only when enamel and aesthetics allow." },
    ],
    duration: "usually two to three visits over one to three weeks",
    admission: "Outpatient chairside care.",
    recovery:
      "Mild sensitivity is common. Flying after bonding is rarely restricted.",
    risks:
      "Risks include debonding, fracture, shade mismatch, pulp irritation and the need to replace veneers over years.",
    urgent: "veneer fracture leaving dentine exposed with severe pain, or allergic reaction to materials (rare)",
    drivers: [
      { label: "Number of veneers", detail: "Per-tooth laboratory fees accumulate." },
      { label: "Ceramic system", detail: "Material brands differ in price." },
      { label: "Mock-up and temporaries", detail: "Should be itemized." },
      { label: "Bite adjustment and night guard", detail: "Protective appliances may be extra." },
      { label: "Remakes", detail: "Shade corrections after travel." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Photographs and shade references", "Bite records", "Prior whitening or ortho history"],
    followUp: "Avoid biting hard objects; night guards when grinding is present; routine dental reviews.",
    quoteQuestions: ["How many veneers are priced?", "Is a mock-up included before preparation?", "Which ceramic system and warranty apply?"],
    related: ["Smile Makeover", "Teeth Whitening", "Dental Crowns and Bridges"],
    imageAlts: [
      "Medical illustration of thin ceramic veneers bonded to the front surfaces of teeth",
      "Clinical diagram of veneer preparation, temporaries and bonding stages",
      "Dental veneers recovery pathway showing bonding, bite check and home care",
    ],
  },
  {
    procedure: "Teeth Whitening",
    shortName: "teeth whitening",
    specialist: "dentist supervising bleaching",
    definition:
      "Teeth whitening lightens natural tooth shade using peroxide-based gels under professional supervision in-clinic or via take-home trays.",
    candidacy:
      "It may be considered for extrinsic or some intrinsic discoloration when enamel is sound and expectations about existing crowns or fillings are realistic.",
    limits:
      "Whitening does not change the colour of crowns, veneers or fillings. Severe tetracycline staining or enamel defects may need veneers instead.",
    evaluation:
      "Shade recording, caries and gum check, and discussion of sensitivity risk precede gel use.",
    technique:
      "In-clinic gels may be activated for a timed session, or custom trays are used at home with measured gel under dentist instruction.",
    approaches: [
      { label: "In-clinic whitening session", detail: "Supervised chairside bleaching." },
      { label: "Take-home tray whitening", detail: "Custom trays with dentist-supplied gel." },
      { label: "Combined protocol", detail: "Chairside boost plus home trays when indicated." },
    ],
    duration: "often one clinic session of about one hour, or one to two weeks of home trays",
    admission: "Outpatient; no hospital stay.",
    recovery:
      "Temporary sensitivity is common. Flying is unrestricted for whitening alone.",
    risks:
      "Risks include sensitivity, gum irritation from gel, uneven whitening and disappointment when restorations do not match.",
    urgent: "severe chemical burn of gums from mishandled gel, or marked allergic response (rare)",
    drivers: [
      { label: "In-clinic versus take-home", detail: "Protocols differ in fee and visits." },
      { label: "Number of sessions", detail: "Repeat bleaching adds cost." },
      { label: "Tray fabrication", detail: "Laboratory trays may be itemized." },
      { label: "Sensitivity management", detail: "Desensitizing products may be extra." },
      { label: "Later veneers if shade goals fail", detail: "A different product entirely." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Baseline shade photographs", "List of existing restorations", "Sensitivity history"],
    followUp: "Avoid staining foods briefly as advised; touch-up bleaching only under dental guidance.",
    quoteQuestions: ["Is this in-clinic, take-home or both?", "Are trays included?", "What shade change is realistically expected given my restorations?"],
    related: ["Dental Veneers", "Smile Makeover", "Dental Crowns and Bridges"],
    imageAlts: [
      "Medical illustration of professional teeth whitening gel applied to natural tooth enamel",
      "Clinical diagram of in-clinic whitening versus custom take-home trays",
      "Teeth whitening pathway showing shade recording, bleaching and sensitivity care",
    ],
  },
  {
    procedure: "Dental Fillings",
    shortName: "dental fillings",
    specialist: "general or restorative dentist",
    definition:
      "Dental fillings restore cavities by removing decay and placing a direct restorative material such as composite resin.",
    candidacy:
      "It may be considered for small to moderate decay or replacement of failed old fillings when the tooth does not yet need a crown or root canal.",
    limits:
      "Large cavities undermining cusps may need onlays or crowns. Deep decay near the pulp can lead to sensitivity or root canal later.",
    evaluation:
      "Clinical exam and bitewing radiographs map decay depth and contact points.",
    technique:
      "Decay is removed under local anaesthesia, the cavity is conditioned and filled, then shaped and polished for bite.",
    approaches: [
      { label: "Composite filling", detail: "Tooth-coloured direct resin for most modern restorations." },
      { label: "Replacement of failed filling", detail: "Removes old material and recurrent decay." },
      { label: "Protective liner and staged filling", detail: "Used when pulp proximity requires caution." },
    ],
    duration: "often 20–60 minutes per tooth",
    admission: "Outpatient chairside care.",
    recovery:
      "Numbness wears off in hours; avoid chewing on the side until sensation returns. Flying is unrestricted.",
    risks:
      "Risks include postoperative sensitivity, filling fracture, recurrent decay and need for root canal if pulp was already inflamed.",
    urgent: "severe lingering pain after anaesthesia wears off, facial swelling, or a filling that comes out leaving sharp tooth edges",
    drivers: [
      { label: "Number and size of surfaces", detail: "Multi-surface fillings cost more." },
      { label: "Material", detail: "Composite versus other materials." },
      { label: "Need for liners or build-ups", detail: "Deep cavities add steps." },
      { label: "Rubber dam and isolation", detail: "Quality technique should be assumed, not upsold as optional safety." },
      { label: "Later crown if walls fail", detail: "Separate restorative episode." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Bitewing radiographs", "List of sensitive teeth", "Prior filling history"],
    followUp: "Hygiene and dietary advice; review if sensitivity persists beyond the expected window.",
    quoteQuestions: ["How many teeth and surfaces are priced?", "Is composite assumed?", "What if the pulp is exposed during caries removal?"],
    related: ["Root Canal Treatment", "Dental Crowns and Bridges", "Tooth Extraction"],
    imageAlts: [
      "Medical illustration of a composite filling restoring a cavity in a molar",
      "Clinical diagram of decay removal and layered composite placement",
      "Dental filling pathway showing anaesthesia, restoration and bite adjustment",
    ],
  },
  {
    procedure: "Tooth Extraction",
    shortName: "tooth extraction",
    specialist: "dentist or oral surgeon",
    definition:
      "Tooth extraction removes a tooth that cannot or should not be saved because of decay, fracture, infection, gum disease or orthodontic planning.",
    candidacy:
      "It may be considered when restoration is impossible or unreasonable, infection cannot be controlled with the tooth in place, or space is required for orthodontics.",
    limits:
      "Extraction is irreversible. Wisdom teeth have a dedicated slug. Immediate implant placement is a separate decision and fee.",
    evaluation:
      "Radiographs assess roots and surrounding bone; medical history covers bleeding risk and anticoagulants.",
    technique:
      "Under local anaesthesia the tooth is loosened and removed; surgical flaps or sectioning are used when needed; sockets may be sutured.",
    approaches: [
      { label: "Simple extraction", detail: "Elevator and forceps when the tooth is accessible." },
      { label: "Surgical extraction", detail: "Flap and sectioning for broken or retained roots." },
      { label: "Multiple extractions", detail: "Sequenced removal when several teeth must go before dentures or implants." },
    ],
    duration: "often 15–45 minutes per tooth depending on difficulty",
    admission: "Usually outpatient; medical complexity may require hospital day-care.",
    recovery:
      "Gauze pressure, soft diet and socket care for several days. Flying after uncomplicated simple extractions is often possible within a day or two once bleeding stops; surgical sites need individualized advice.",
    risks:
      "Risks include bleeding, dry socket, infection, sinus opening in upper teeth, and damage to neighbouring structures.",
    urgent: "bleeding that soaks gauze repeatedly, rapidly increasing swelling, fever, or difficulty breathing",
    drivers: [
      { label: "Simple versus surgical", detail: "Bone removal changes fees." },
      { label: "Number of teeth", detail: "Multiple extractions accumulate." },
      { label: "Anaesthesia or sedation", detail: "Facility level varies." },
      { label: "Socket preservation graft", detail: "Separate if planned before implants." },
      { label: "Denture or implant follow-on", detail: "Different product sheets." },
    ],
    inclusions: [...commonInclusions, { label: "Named materials and laboratory steps", detail: "Only materials and lab work written in the estimate." }],
    exclusions: commonExclusions,
    records: ["Periapical or OPG radiograph", "Anticoagulant and medical history", "Prior infection or antibiotic use"],
    followUp: "Socket healing check; discuss replacement options with the home dentist if a gap remains.",
    quoteQuestions: ["Is this priced as simple or surgical?", "How many teeth are included?", "Is a socket graft or immediate denture assumed?"],
    related: ["Wisdom Tooth Removal", "Dental Implants", "Dentures"],
    imageAlts: [
      "Medical illustration of a tooth being extracted from the alveolar socket",
      "Clinical diagram of simple versus surgical extraction approaches",
      "Tooth extraction recovery pathway showing gauze pressure, soft diet and socket care",
    ],
  }
];

export const dentistryArticles = profiles.map(createDentistryArticle);

export const dentistryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  dentistryArticles.map((article) => [article.slug, article]),
);
