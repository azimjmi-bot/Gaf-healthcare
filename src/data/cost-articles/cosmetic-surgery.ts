import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { COSMETIC_PROCEDURES, toSlug } from "../../lib/taxonomy";

type CosmeticProcedure = (typeof COSMETIC_PROCEDURES)[number];

type CosmeticProfile = {
  procedure: CosmeticProcedure;
  shortName: string;
  specialist: string;
  area: string;
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
  related: CosmeticProcedure[];
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
      "Delhi, Gurugram, Noida and Faridabad are separate treatment corridors. Confirm the operating facility before booking because cross-NCR travel can be uncomfortable with swelling, dressings or restricted movement.",
    lodging:
      "Choose flexible, lift-accessible lodging near the named facility, with privacy for wound care and enough room for a companion.",
    recovery:
      "Seasonal heat, winter air pollution and long road transfers should be considered when planning hydration, outdoor walking and wound protection.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are different recovery bases. Peak traffic and monsoon disruption can complicate timed reviews or an urgent return to the operating facility.",
    lodging:
      "Stay on the same side of the harbour as the confirmed facility and verify lift access, air conditioning and a clean space for dressings or compression garments.",
    recovery:
      "Humidity and monsoon travel make dry dressings, skin care and dependable transport practical parts of discharge planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts, and cross-city traffic can make an apparently short journey difficult after anaesthesia or surgery.",
    lodging:
      "A quiet, lift-accessible stay near the treating facility is usually more useful than an airport hotel; verify easy access to follow-up and pharmacy services.",
    recovery:
      "Milder weather does not remove clot, wound or hydration precautions. Plan short walks and the first review before fixing a departure date.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several treatment districts have comparatively direct airport access, but heat, humidity and travel after anaesthesia still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named facility with lift access and a clean area for wound and garment care.",
    recovery:
      "Heat can worsen discomfort and dehydration, while humidity can complicate dressings. Follow the treating team's skin, wound and fluid instructions.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major treatment districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the treating team.",
    recovery:
      "Summer heat and the long airport transfer can worsen fatigue. Plan hydration, mobility and the first post-procedure review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, surgeon, facility, implant, technique or final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare surgeon, licensed facility, anaesthesia, implant or device scope, revisions, emergency terms and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and facility",
    context:
      "International-patient coordination does not by itself establish procedure availability, accreditation, specialist suitability or aftercare.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, anaesthesia, implant, pharmacy and follow-up charges may be separated in self-pay estimates.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate for the precise procedure, treatment areas, anaesthesia and recovery plan.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, facility charges, implant scope and post-travel follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, revision policy and who provides wound review after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, anaesthesia, implant and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: CosmeticProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and facility cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic plastic-surgery label cannot verify current procedure capability. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has plastic and aesthetic surgery services, but this page does not infer that every listed facility performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare technique, facility scope, recovery and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact facility, anaesthesia plan and route for urgent reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete records before non-refundable travel. Remote review can change after examination, updated tests or a more detailed goals discussion.",
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither value is a city tariff, admission promise or treatment recommendation.`,
          `${profile.technique} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are material clinical and resource differences, not premium upgrades.`,
          `Ask the provider to name the ${profile.specialist}, facility, technique, anaesthesia, implants or devices, admission allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, flexible lodging, a companion, dressings or garments and extended stay if recovery changes.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send medical history, medicines, allergies, previous procedure records and requested standardized photographs before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}; a remote image review is not final medical clearance or an outcome simulation.`,
          `Complete the planned wound or dressing review and travel-fitness assessment before flying home. ${place.recovery}`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the licensed operating facility, lead clinician, anaesthesia and emergency support, procedure-specific equipment, recovery arrangements and handover in writing. General accreditation does not establish current capability or outcomes.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored; an itemized provider estimate is required.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A qualified ${profile.specialist} with procedure-relevant scope should assess it. Cards appear only for exact CMS relationships and are not rankings.`,
          },
          { q: `Where should a patient stay in ${place.city}?`, a: `${place.lodging} ${place.arrival}` },
          {
            q: "When can an international patient fly home?",
            a: `There is no universal flight date. ${profile.recovery} The treating team must document travel fitness.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and facility, treatment areas, technique, anaesthesia, implants or devices, included care, exclusions and revision terms.`,
          },
        ],
      },
    };
  });
}

function createCosmeticArticle(profile: CosmeticProfile): CostArticle {
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
    seoTitle: `${profile.procedure} Cost in India: Procedure, Risks & Recovery`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, technique, inclusions, risks and travel recovery.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, technique, facility and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} The aim is proportionate change agreed through informed consent, not a standardized ideal or guaranteed appearance.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the surgeon, anaesthesia, operating facility, routine medicines and stated follow-up, while implants, garments or extra nights depend on the written scope. The stored stay is [STAY], but discharge and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Complications, added areas or revision work can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified clinician must assess health, anatomy, expectations, alternatives and the ability to complete recovery before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named clinician, facility, treatment area and technique.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different implant, anaesthetic, number of areas or revision plan describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, garments, wound care and extended follow-up visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different treatment areas, techniques or support. Compare professional fees, operating-facility scope, anaesthesia, implants or devices, garments, follow-up, extra-night rates and complication or revision terms.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches to ${profile.procedure}`,
      intro: [
        `${profile.technique} The approaches below are clinical options, not tiers of attractiveness.`,
        `A qualified ${profile.specialist} should explain which route fits the individual's anatomy, goals and health, what scars or limitations it introduces and what could change the plan.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from anatomy, goals, health and recovery needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `Who May Consider ${profile.procedure}?`,
    overview: {
      what: [profile.definition, profile.technique, profile.limits],
      who: [profile.candidacy, "Suitability requires individual medical, anatomical and psychological assessment; concern about appearance alone does not establish surgical candidacy."],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile medicines and supplements, ask about tobacco or nicotine, alcohol, pregnancy possibility and clot history, and discuss expectations without judging appearance.",
        "Follow the treating team's fasting and medicine instructions. Report fever, skin infection, respiratory illness or another material health change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Swelling, bruising, discomfort, wound care, dressings, drains, positioning or compression requirements vary with the operation. Written instructions take priority over generic travel advice.",
        profile.risks,
        `${profile.followUp} Seek urgent clinical help for ${profile.urgent}; use the treating team's emergency thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "realistic-expectations",
        heading: `Goals and realistic limits of ${profile.procedure}`,
        paragraphs: [
          profile.limits,
          "A consultation should define the anatomical concern in neutral terms, discuss non-surgical or no-treatment alternatives and explain scars, asymmetry and normal biological variability.",
          "Photographs may support remote planning but cannot predict healing or ethically guarantee a digitally simulated appearance.",
        ],
      },
      {
        id: "risks-and-side-effects",
        heading: `Risks and Side Effects of ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on health, nicotine exposure, anatomy, previous procedures, technique and aftercare.",
          `${profile.recovery} A lower price does not reduce the need for emergency access, appropriate follow-up or a realistic revision policy.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish discharge from fitness to fly. Time near the facility allows wound, swelling, implant, garment or dressing review before a longer journey.",
          `${profile.followUp} Flights should remain flexible until the treating team confirms mobility, symptom control and travel fitness.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, garments or dressings, complication contingency and follow-up at home.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation, directory profile or photograph review is not medical clearance.",
      ],
      stages: [
        { label: "Records and goals review", detail: profile.evaluation },
        { label: "Suitability and expectations", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Technique and alternatives", detail: `Discuss ${approachNames}, no treatment and relevant non-surgical options.` },
        { label: "Itemized estimate", detail: "Match clinician, facility, treatment areas, technique, anaesthesia, implants or devices, recovery care, exclusions and revision terms." },
        { label: "Arrival and reassessment", detail: "Repeat examination, photography, laboratory testing, imaging or anaesthetic assessment only when clinically indicated." },
        { label: "Procedure and immediate recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, wound care, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the operative note, implant record where relevant and follow-up plan.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses health, anatomy, goals, alternatives and travel suitability.` },
      { label: "Clarify expectations", detail: "Discuss the requested change in neutral terms, acceptable trade-offs, scars, uncertainty and what treatment cannot promise." },
      { label: "Confirm individualized suitability", detail: `${profile.candidacy} Psychological readiness and adequate recovery support matter.` },
      { label: "Compare itemized estimates", detail: "Hold procedure, areas, professional fees, facility, anaesthesia, implants or devices, aftercare and revision terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and suitable lodging near the exact facility." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, expected scars or limitations, ${profile.risks.toLowerCase()} and the possibility of changing or cancelling the plan.` },
      { label: "Undergo the agreed procedure", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe pain control, mobility and wound or dressing care.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the procedure report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines and supplements, allergies and relevant recent laboratory results",
      "Previous anaesthetic or clotting complications and current medical-condition summaries",
      "Previous cosmetic procedure notes and implant cards where applicable",
      "Standardized photographs only if requested securely by the treating clinician",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, treatment areas, technique, anaesthesia, implants or devices, aftercare and revision terms constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Health, anatomy, technique, added areas, complications, currency and recovery can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and facility cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic plastic-surgery entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, hospital-based operating services and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, procedure-specific experience, anaesthesia and emergency arrangements, implant traceability where relevant and continuity after return.",
      "No provider is ranked and no appearance is promised. Medical instability, unmanaged expectations, nicotine exposure, inadequate recovery support or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what no-treatment or non-surgical alternatives were discussed?`,
      "How were my health, anatomy, previous procedures and expectations assessed?",
      "What can this procedure realistically change, and what will it not change?",
      `Who is the named ${profile.specialist}, and at which exact licensed facility will care occur?`,
      `Does the quotation use the exact name ${profile.procedure} and list every treatment area?`,
      "Which consultations, blood tests, imaging, photography and anaesthesia assessment are included?",
      "Are surgeon, assistant, anaesthesia, operating-room and recovery-room fees included?",
      "Which implant, prosthesis, graft-processing method or medical device is assumed, if relevant?",
      "Are implant manufacturer, model, size, warranty and traceability records provided where applicable?",
      "Which medicines, dressings, drains, compression garments and scar-care supplies are included?",
      "Is day care or overnight admission included, and what room category applies?",
      "How are extra nights, emergency review, readmission or another procedure billed?",
      "What symptoms require urgent local care or return to the treating facility?",
      "What wound, drain, dressing, garment, bathing and sleeping-position instructions apply?",
      "When can I walk, work, exercise, lift, drive and resume other activities?",
      "Which follow-up visits are included before and after I return home?",
      "How are complications handled after I leave India?",
      "What is the written revision policy, waiting period and fee structure?",
      "When and by whom will fitness to fly be assessed?",
      "What operative note, implant card, photographs and emergency contacts will I receive?",
      "Which costs are explicitly excluded from the quotation?",
      "Who will coordinate wound or implant follow-up with my clinician at home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; technique, facility, anaesthesia, devices and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `Who may consider ${profile.shortName}?`, a: profile.candidacy },
      { q: "Is cosmetic surgery in India automatically cheaper?", a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, anaesthesia, devices, aftercare and revision terms." },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: profile.technique },
      { q: `How long does ${profile.shortName} take?`, a: `${profile.duration}. Actual timing depends on anatomy, treatment extent and the clinical course.` },
      { q: "How long is the hospital or facility stay?", a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: "What are the important risks?", a: profile.risks },
      { q: "When can an international patient fly home?", a: `There is no fixed flight day. ${profile.recovery} The treating team must document travel fitness.` },
      { q: "Which Indian cities offer this procedure?", a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant care ecosystems, but actual availability requires an exact clinician and facility confirmation." },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews wounds, swelling, implants or other procedure-specific concerns.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and facility; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and facilities for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} facilities in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general cosmetic-surgery, plastic-surgery or accreditation label does not establish current case acceptance, licensed theatre scope, emergency support, implant availability or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/cosmetic-surgery/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it does not prescribe an aesthetic ideal or predict a result.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/cosmetic-surgery/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/cosmetic-surgery/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named specialist consultation, medical-history review and procedure-focused examination when explicitly listed." },
  { label: "Operating episode", detail: "Surgeon, assistant, licensed operating facility, standard equipment and recovery-room care within the written scope." },
  { label: "Anaesthesia", detail: "Anaesthetist assessment and the stated local, sedation or general anaesthetic plan; confirm medicines and duration assumptions." },
  { label: "Routine aftercare", detail: "Standard dressings, routine medicines and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, procedure note and implant or device record where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "Added treatment areas, combined procedures, unexpected technical work or a different operation." },
  { label: "Complications", detail: "Unplanned tests, emergency treatment, readmission, prolonged stay or another procedure unless expressly covered." },
  { label: "Revision", detail: "Later revision, scar treatment or implant replacement unless the written policy says otherwise." },
  { label: "Extended aftercare", detail: "Long-term medicines, dressings, garments, therapy or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: CosmeticProfile[] = [
  {
    procedure: "Rhinoplasty",
    shortName: "rhinoplasty",
    specialist: "plastic, facial plastic or appropriately trained ENT surgeon",
    area: "external nose and, when indicated, internal nasal support",
    definition: "Rhinoplasty reshapes selected bone, cartilage or soft tissue of the nose; a combined functional plan may also address airflow.",
    candidacy: "It may be considered by medically suitable adults, or selected patients after facial growth, who have a specific structural concern, realistic expectations and time for prolonged swelling to settle.",
    limits: "It cannot guarantee facial symmetry, a particular celebrity feature or perfect breathing. Cosmetic and functional goals must be separated and documented.",
    evaluation: "Assessment may include external and internal nasal examination, breathing history, standardized photographs and, only when indicated, endoscopy or imaging.",
    technique: "Through open or closed access, the surgeon may alter the nasal bones, septal or tip cartilage, support grafts and soft tissue while preserving or improving structural support.",
    approaches: [
      { label: "Closed rhinoplasty", detail: "Incisions remain inside the nostrils; exposure and suitability depend on the required structural work." },
      { label: "Open rhinoplasty", detail: "An additional columellar incision permits wider exposure for complex tip, graft or revision work." },
      { label: "Functional septorhinoplasty", detail: "Structural reshaping is combined with airway-focused work when clinically indicated; this is not merely a cosmetic add-on." },
    ],
    duration: "Often several hours, with revision or major graft work potentially longer",
    admission: "Many cases use day care or a short stay; airway concerns, nausea, bleeding or comorbidity can change this.",
    recovery: "Splints, swelling and bruising are common early; nasal refinement can continue for months, and flying requires review for bleeding, obstruction and comfort.",
    risks: "Relevant risks include bleeding, infection, persistent swelling, asymmetry, contour irregularity, scarring, altered sensation, breathing change, septal problems and revision surgery.",
    urgent: "heavy bleeding, breathing difficulty, fever, worsening pain, visual symptoms or a rapidly increasing swelling",
    drivers: [
      { label: "Primary or revision anatomy", detail: "Scar tissue, missing support and prior grafts make revision planning and operating time less predictable." },
      { label: "Functional work", detail: "Septal, valve or turbinate treatment changes scope and should be itemized separately from aesthetic reshaping." },
      { label: "Graft requirements", detail: "Septal, ear or rib cartilage harvest changes theatre resources, scars and recovery." },
      { label: "Open or closed access", detail: "Access follows anatomy and goals; neither route is universally superior." },
      { label: "Anaesthesia and facility", detail: "Complexity, airway planning and monitored recovery influence the professional and facility bill." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Breathing and nasal-trauma history", "Previous rhinoplasty or septal operative notes", "Relevant scans or endoscopy reports where available"],
    followUp: "Follow-up reviews splints, wounds, airflow, infection, evolving swelling and scar maturation; local ENT or plastic-surgery support may be needed after return.",
    quoteQuestions: ["Is functional airway work included?", "Which graft source is assumed?", "Who manages a breathing problem after return?"],
    related: ["Facelift", "Blepharoplasty", "Otoplasty", "Neck Lift"],
    imageAlts: [
      "Medical illustration identifying nasal bone, upper lateral cartilage, septum, tip cartilage and airway structures relevant to rhinoplasty",
      "Clinical diagram comparing closed intranasal access with open columellar access and structural cartilage work during rhinoplasty",
      "Rhinoplasty recovery pathway showing splint care, swelling review, breathing checks and individualized fitness to travel",
    ],
  },
  {
    procedure: "Liposuction",
    shortName: "liposuction",
    specialist: "plastic surgeon",
    area: "localized subcutaneous fat in selected body areas",
    definition: "Liposuction removes selected subcutaneous fat through small access sites using a cannula; it is contour surgery, not treatment for obesity or a substitute for skin excision.",
    candidacy: "It may suit medically fit adults with localized fat, reasonably stable weight, useful skin elasticity, realistic contour goals and capacity to use garments and mobilize after treatment.",
    limits: "It does not reliably tighten substantial loose skin, remove visceral fat, treat cellulite or guarantee smooth symmetry.",
    evaluation: "The surgeon maps each proposed area, assesses skin quality, asymmetry, hernia, venous and clot risk, medicines, nicotine exposure and safe total treatment extent.",
    technique: "Fluid is introduced into mapped subcutaneous tissue and a cannula removes fat in controlled planes; access, assistance technology and volume are individualized.",
    approaches: [
      { label: "Conventional tumescent liposuction", detail: "Cannula aspiration follows infiltration; area and volume determine anaesthesia and monitoring." },
      { label: "Power-assisted liposuction", detail: "A mechanically assisted cannula may help selected fibrous areas but does not guarantee smoother results." },
      { label: "Ultrasound or energy-assisted liposuction", detail: "Energy may support selected contour work but adds device-specific tissue and burn considerations." },
    ],
    duration: "From about one hour for a limited area to several hours for multiple areas",
    admission: "Limited treatment may be day care; larger-volume or combined treatment may require monitored overnight care.",
    recovery: "Bruising, swelling, drainage and garment use are common; mobility starts early, while final contour assessment waits for swelling to settle.",
    risks: "Risks include bleeding, infection, seroma, contour irregularity, asymmetry, altered sensation, skin injury, fluid shifts, blood clots and rare fat embolic or anaesthetic complications.",
    urgent: "breathlessness, chest pain, fainting, one-sided leg swelling, fever, severe pain or rapidly increasing swelling",
    drivers: [
      { label: "Number and size of areas", detail: "Each mapped zone changes operating time, fluid management and garment needs." },
      { label: "Total aspirate and health", detail: "Larger-volume treatment requires stricter selection, monitoring and sometimes staging." },
      { label: "Skin quality", detail: "Loose skin may require excision rather than more aspiration; this changes scars and costs." },
      { label: "Assistance technology", detail: "Power, ultrasound or other devices change consumables and risks without guaranteeing superiority." },
      { label: "Combined procedures", detail: "Adding abdominoplasty or fat transfer materially changes the operation and recovery." },
    ],
    inclusions: [...commonInclusions, { label: "Compression garment", detail: "Only the specified first garment and size; replacements are often separate." }],
    exclusions: commonExclusions,
    records: ["Weight and contour history", "Previous abdominal or body-contouring records", "Clotting, venous disease and anaesthetic history"],
    followUp: "Follow-up checks fluid balance, wounds, seroma, skin viability, contour evolution, garment fit and clot symptoms.",
    quoteQuestions: ["Which exact areas are included?", "What aspirate or safety limit is planned?", "Is the first compression garment included?"],
    related: ["Tummy Tuck", "Fat Transfer", "Gynecomastia Surgery", "Arm Lift"],
    imageAlts: [
      "Medical body-map illustration showing subcutaneous fat layers and common areas that may be assessed for liposuction",
      "Cross-sectional clinical illustration showing controlled cannula movement within subcutaneous fat while protecting skin, fascia and deeper structures",
      "Liposuction recovery pathway showing compression garment care, early mobility, swelling monitoring and travel clearance",
    ],
  },
  {
    procedure: "Breast Augmentation",
    shortName: "breast augmentation",
    specialist: "plastic surgeon",
    area: "breast volume and shape",
    definition: "Breast augmentation adds volume using an implant or, in selected cases, transferred fat; it does not automatically correct significant skin or nipple descent.",
    candidacy: "It may be considered by medically suitable adults with stable expectations who understand implant surveillance, future surgery and the limits of symmetry.",
    limits: "No implant is lifetime-guaranteed, cup size cannot be promised precisely, and surgery cannot create perfect symmetry or stop future tissue change.",
    evaluation: "Assessment covers breast and chest-wall anatomy, skin envelope, asymmetry, pregnancy and breastfeeding plans, family and imaging history, implant preferences and previous surgery.",
    technique: "The surgeon creates an implant pocket above or below selected chest tissues, or harvests and prepares fat for conservative grafting, using an incision suited to anatomy and plan.",
    approaches: [
      { label: "Subglandular implant", detail: "The implant lies behind breast tissue and in front of pectoral muscle; coverage and suitability vary." },
      { label: "Subpectoral or dual-plane implant", detail: "Muscle partly covers the implant, changing animation, discomfort and contour trade-offs." },
      { label: "Fat-transfer augmentation", detail: "Prepared autologous fat provides limited incremental volume and may require staged treatment." },
    ],
    duration: "Commonly one to several hours depending on implant, lift or grafting scope",
    admission: "Often day care or one night, with longer monitoring when combined procedures or medical needs require it.",
    recovery: "Support garments, swelling and chest tightness are common; lifting and upper-body activity are restricted before gradual return.",
    risks: "Risks include bleeding, infection, scarring, asymmetry, sensation change, capsular contracture, implant displacement, rupture, rippling, need for surveillance and future implant surgery.",
    urgent: "breathlessness, fever, rapidly enlarging breast swelling, severe one-sided pain, wound opening or implant exposure",
    drivers: [
      { label: "Implant or fat transfer", detail: "Implant cost, traceability and surveillance differ from harvest and graft-processing requirements." },
      { label: "Implant specifications", detail: "Manufacturer, fill, surface, dimensions and warranty must be documented without claiming one brand is best." },
      { label: "Pocket and incision", detail: "Anatomy and tissue coverage determine access and plane, not package tier." },
      { label: "Lift combination", detail: "Adding mastopexy changes scars, operating time, blood supply considerations and recovery." },
      { label: "Revision anatomy", detail: "Capsule, rupture or previous pockets require a separate revision plan." },
    ],
    inclusions: [...commonInclusions, { label: "Implants", detail: "Only when manufacturer, model, size range, warranty and taxes are explicitly stated." }],
    exclusions: commonExclusions,
    records: ["Breast imaging where clinically indicated", "Previous breast surgery and implant cards", "Relevant family, pregnancy and breastfeeding history"],
    followUp: "Follow-up checks wounds, implant position, infection, capsule symptoms and longer-term implant surveillance; future replacement is not assumed to be included.",
    quoteQuestions: ["Which implant and warranty are included?", "What pocket and incision are proposed?", "What long-term surveillance is recommended?"],
    related: ["Breast Lift", "Breast Reduction", "Fat Transfer"],
    imageAlts: [
      "Medical cross-section showing breast tissue, pectoral muscle, chest wall and common implant placement planes used in augmentation",
      "Clinical illustration comparing subglandular, subpectoral and dual-plane breast implant placement without implying a preferred result",
      "Breast augmentation recovery pathway showing support garment use, wound review, implant checks and gradual return to upper-body activity",
    ],
  },
  {
    procedure: "Tummy Tuck",
    shortName: "tummy tuck surgery",
    specialist: "plastic surgeon",
    area: "abdominal skin, subcutaneous tissue and selected fascial laxity",
    definition: "Abdominoplasty removes selected excess abdominal skin and fat and may repair midline fascial separation; it is not a weight-loss operation.",
    candidacy: "It may suit medically fit adults with stable weight, excess lower-abdominal skin or selected abdominal-wall laxity who accept a long scar and substantial recovery.",
    limits: "It cannot guarantee a flat abdomen, remove visceral fat or prevent future change from weight fluctuation, pregnancy or ageing.",
    evaluation: "Assessment includes skin and fat distribution, scars, hernia or rectus separation, prior abdominal surgery, pregnancy plans, clot risk and nicotine exposure.",
    technique: "The surgeon raises an abdominal skin-fat flap, treats selected fascial laxity, repositions the umbilicus when required and removes planned excess tissue before layered closure.",
    approaches: [
      { label: "Mini abdominoplasty", detail: "Limited lower-abdominal excision without full umbilical transposition suits a narrower anatomical problem." },
      { label: "Full abdominoplasty", detail: "Broader undermining, umbilical transposition and possible fascial repair address upper and lower abdomen." },
      { label: "Extended abdominoplasty", detail: "Longer lateral excision addresses flank excess but increases scar length and wound burden." },
    ],
    duration: "Usually several hours and longer when extended or combined with other procedures",
    admission: "One or more nights may be planned because mobility, drains, pain control and clot prevention require monitoring.",
    recovery: "Early flexed posture, drains or garments and restricted lifting may be needed; return to full activity takes longer than discharge.",
    risks: "Risks include bleeding, infection, seroma, delayed healing, wide or raised scars, numbness, asymmetry, skin or umbilical loss, blood clots and revision surgery.",
    urgent: "breathlessness, chest pain, calf swelling, fever, wound separation, darkening skin or rapidly increasing abdominal swelling",
    drivers: [
      { label: "Mini, full or extended scope", detail: "Excision extent, umbilical work and scar length materially change theatre and aftercare." },
      { label: "Fascial repair", detail: "Selected rectus separation repair adds technical and recovery requirements." },
      { label: "Prior surgery or hernia", detail: "Scars, mesh or hernia require records and may need another specialty." },
      { label: "Liposuction combination", detail: "Additional zones change fluid balance, contour risk and garment requirements." },
      { label: "Admission and clot prevention", detail: "Health, extent and mobility alter monitoring and prophylaxis." },
    ],
    inclusions: [...commonInclusions, { label: "Drains and garment", detail: "Specified drains, initial dressings and one garment only when written into the quote." }],
    exclusions: commonExclusions,
    records: ["Weight, pregnancy and abdominal-symptom history", "Prior abdominal operative notes and mesh details", "Hernia imaging where clinically indicated"],
    followUp: "Follow-up reviews drains, wounds, skin and umbilical viability, seroma, mobility, garment fit and clot symptoms.",
    quoteQuestions: ["Is fascial repair included?", "Is liposuction included and for which areas?", "How are drains and seroma managed after travel?"],
    related: ["Liposuction", "Arm Lift", "Fat Transfer"],
    imageAlts: [
      "Medical illustration of abdominal skin, subcutaneous fat, rectus muscles, fascia and umbilicus relevant to tummy tuck planning",
      "Clinical diagram showing lower abdominal tissue excision, selected fascial repair and umbilical management during abdominoplasty",
      "Tummy tuck recovery pathway showing flexed positioning, drain and garment care, clot prevention, wound review and travel clearance",
    ],
  },
  {
    procedure: "Breast Reduction",
    shortName: "breast reduction",
    specialist: "plastic surgeon",
    area: "breast skin, glandular and fatty tissue",
    definition: "Breast reduction removes and reshapes selected breast tissue and skin while repositioning the nipple-areola on a planned blood supply.",
    candidacy: "It may be considered by medically suitable patients with disproportionate breast volume, physical symptoms or functional limitations who accept scars and possible breastfeeding or sensation changes.",
    limits: "It cannot guarantee symptom relief, exact cup size, perfect symmetry, preserved sensation or future breastfeeding.",
    evaluation: "Assessment covers symptoms, breast measurements, asymmetry, skin quality, imaging where indicated, pregnancy plans, nicotine exposure and healing risk.",
    technique: "The surgeon removes selected skin, fat and gland, preserves the nipple on a tissue pedicle when feasible and reshapes the remaining breast.",
    approaches: [
      { label: "Vertical reduction", detail: "A periareolar and vertical scar may suit selected volumes and skin envelopes." },
      { label: "Wise-pattern reduction", detail: "An anchor-shaped scar allows broader skin removal for larger or more ptotic breasts." },
      { label: "Free nipple graft", detail: "In selected very large reductions the nipple may be grafted, with major sensation and breastfeeding trade-offs." },
    ],
    duration: "Usually several hours, depending on volume, asymmetry and technique",
    admission: "Day care or one or more nights may be used depending on health, blood loss, pain and facility protocol.",
    recovery: "A support bra, wound care and lifting restrictions are common; swelling and breast shape continue to settle after travel.",
    risks: "Risks include bleeding, infection, delayed healing, asymmetry, contour change, prominent scars, altered sensation, fat necrosis, nipple or skin loss and revision.",
    urgent: "rapid swelling, fever, wound opening, darkening nipple or skin, severe one-sided pain, breathlessness or calf swelling",
    drivers: [
      { label: "Resection and skin extent", detail: "Volume, ptosis and asymmetry determine pattern, operating time and pathology needs." },
      { label: "Pedicle choice", detail: "Blood supply, sensation and anatomy guide technique; no pedicle is universally best." },
      { label: "Imaging and pathology", detail: "Age, symptoms and local policy can add imaging or specimen assessment." },
      { label: "Combined liposuction", detail: "Lateral chest treatment changes scope and garment requirements." },
      { label: "Healing risk", detail: "Nicotine, diabetes and large resections can alter monitoring and length of stay." },
    ],
    inclusions: [...commonInclusions, { label: "Specimen handling", detail: "Pathology is included only when explicitly listed in the estimate." }],
    exclusions: commonExclusions,
    records: ["Breast symptoms and imaging where available", "Previous breast surgery or biopsy records", "Pregnancy, breastfeeding and family history"],
    followUp: "Follow-up checks nipple and skin blood supply, wounds, infection, fluid collection, scars, symmetry and pathology results where obtained.",
    quoteQuestions: ["Which scar pattern and pedicle are planned?", "Is specimen pathology included?", "How might sensation and breastfeeding be affected?"],
    related: ["Breast Lift", "Breast Augmentation", "Liposuction"],
    imageAlts: [
      "Medical illustration showing breast skin envelope, glandular tissue, fatty tissue, nipple-areola and pectoral muscle relevant to reduction surgery",
      "Clinical diagram comparing vertical and Wise-pattern breast reduction incisions and tissue-pedicle concepts",
      "Breast reduction recovery pathway showing support bra use, nipple and wound checks, lifting restrictions and scar follow-up",
    ],
  },
  {
    procedure: "Facelift",
    shortName: "facelift surgery",
    specialist: "plastic or facial plastic surgeon",
    area: "lower face, jawline and selected neck tissues",
    definition: "Facelift surgery repositions selected facial and neck soft tissues and removes limited excess skin; it does not change every feature or stop ageing.",
    candidacy: "It may suit medically fit adults with lower-face or jawline laxity, realistic expectations and willingness to accept scars and prolonged swelling.",
    limits: "It does not guarantee a particular age, identity or expression and may not address eyelids, brow, skin texture or volume without separate treatment.",
    evaluation: "Assessment covers facial and neck anatomy, skin quality, hairline, scars, facial nerve function, medicines, nicotine exposure and prior fillers, threads or surgery.",
    technique: "Incisions around the ear and hairline provide access to reposition selected superficial musculoaponeurotic or deeper tissues, with skin redraped without excessive tension.",
    approaches: [
      { label: "SMAS facelift", detail: "The superficial musculoaponeurotic layer is tightened or repositioned using a technique selected for anatomy." },
      { label: "Deep-plane facelift", detail: "Dissection and release occur in a deeper plane; this is not automatically superior and requires specific expertise." },
      { label: "Limited-incision facelift", detail: "Shorter access may suit limited laxity but has narrower correction and is not equivalent to every full facelift." },
    ],
    duration: "Usually several hours and longer when combined with neck, eyelid or fat-grafting procedures",
    admission: "Day care or a short overnight stay may be used; blood-pressure control, drains or combined work can extend observation.",
    recovery: "Swelling, bruising, tightness and temporary sensory change are expected considerations; social recovery and tissue settling extend beyond discharge.",
    risks: "Risks include bleeding or hematoma, infection, scarring, hairline change, asymmetry, sensory change, facial nerve injury, skin loss, contour irregularity and revision.",
    urgent: "rapid one-sided swelling, severe pain, facial weakness, breathing difficulty, fever or darkening skin",
    drivers: [
      { label: "Tissue plane and extent", detail: "Limited, SMAS and deep-plane operations differ in dissection and resources." },
      { label: "Neck combination", detail: "Platysma or submental work adds anatomy, scars and recovery." },
      { label: "Prior procedures", detail: "Fillers, threads, energy devices or surgery can alter planes and uncertainty." },
      { label: "Added eyelid or fat work", detail: "Combined procedures increase operating time and swelling." },
      { label: "Anaesthesia and observation", detail: "Extent and health determine monitoring and blood-pressure management." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Previous facial procedure, filler and thread records", "Facial nerve or skin-condition history", "Current medicines affecting bleeding"],
    followUp: "Follow-up checks hematoma, facial movement, skin viability, wounds, hairline scars, swelling and longer-term contour settling.",
    quoteQuestions: ["Which tissue plane and neck work are included?", "How are prior fillers or threads handled?", "Who reviews facial movement after return?"],
    related: ["Neck Lift", "Blepharoplasty", "Fat Transfer", "Rhinoplasty"],
    imageAlts: [
      "Medical illustration showing facial skin, superficial musculoaponeurotic system, retaining tissues, jawline and platysma relevant to facelift planning",
      "Clinical diagram showing incision zones and conceptual SMAS versus deeper tissue repositioning without depicting a guaranteed result",
      "Facelift recovery pathway showing hematoma checks, head elevation, wound and facial movement review, swelling and travel clearance",
    ],
  },
  {
    procedure: "Hair Transplant",
    shortName: "hair transplantation",
    specialist: "qualified hair-restoration or plastic surgeon",
    area: "scalp donor and recipient zones",
    definition: "Hair transplantation redistributes follicles from a donor area to planned recipient sites; it does not create new follicles or stop untreated hair loss.",
    candidacy: "It may suit selected adults with a stable diagnosis, adequate donor supply, realistic density expectations and a plan for ongoing native-hair change.",
    limits: "Donor supply is finite, graft survival and density cannot be guaranteed, and progressive hair loss may require medical management or later planning.",
    evaluation: "Assessment should establish the cause and pattern of loss, scalp health, donor density, hair calibre, medicines, previous grafting and whether laboratory or dermatology review is indicated.",
    technique: "Follicular units are harvested by individual extraction or a donor strip, prepared carefully and placed into recipient sites designed around safe density and direction.",
    approaches: [
      { label: "Follicular unit extraction", detail: "Individual follicular units are removed through small punches, producing many small donor wounds." },
      { label: "Follicular unit transplantation", detail: "A donor strip is removed and dissected into grafts, leaving a linear scar." },
      { label: "Staged transplantation", detail: "Large plans may be divided to respect donor supply, procedure duration and healing." },
    ],
    duration: "Several hours and sometimes a long day depending on verified graft count and team workflow",
    admission: "Usually an outpatient procedure; prolonged observation is not a substitute for appropriate selection and sterile technique.",
    recovery: "Scalp crusting, swelling and temporary shedding may occur; graft protection and washing instructions are important before travel.",
    risks: "Risks include bleeding, infection, folliculitis, scarring, numbness, donor depletion, poor growth, unnatural direction, shock loss and need for further treatment.",
    urgent: "fever, spreading redness, pus, uncontrolled bleeding, severe swelling, visual symptoms or escalating pain",
    drivers: [
      { label: "Verified graft plan", detail: "Count should follow donor and recipient assessment, not a sales package." },
      { label: "FUE or strip harvest", detail: "Harvest method changes staffing, time, donor scars and consumables." },
      { label: "Donor limitations", detail: "Density, calibre, scarring and prior harvest constrain safe planning." },
      { label: "Recipient complexity", detail: "Hairline, crown, beard or scar grafting require different design and placement." },
      { label: "Clinical team and session length", detail: "Licensed supervision, graft handling and prolonged procedure resources affect cost." },
    ],
    inclusions: [...commonInclusions, { label: "Graft handling", detail: "The estimate should state the planned count, counting method and what happens if fewer grafts are safely available." }],
    exclusions: commonExclusions,
    records: ["Hair-loss diagnosis and treatment history", "Previous transplant graft counts and donor records", "Scalp disease and relevant laboratory results"],
    followUp: "Follow-up checks donor and recipient healing, infection, shedding and growth progression while managing ongoing native-hair loss separately.",
    quoteQuestions: ["How is graft count verified?", "Who performs harvesting and site creation?", "How is progressive native-hair loss managed?"],
    related: ["Facelift", "Fat Transfer"],
    imageAlts: [
      "Medical scalp illustration showing follicle anatomy, donor zone, recipient zone and hair growth direction relevant to transplantation",
      "Clinical diagram comparing follicular unit extraction punches with strip harvesting and recipient-site placement",
      "Hair transplant recovery pathway showing graft protection, washing, crusting, temporary shedding and staged growth review",
    ],
  },
  {
    procedure: "Breast Lift",
    shortName: "breast lift surgery",
    specialist: "plastic surgeon",
    area: "breast skin envelope and nipple-areola position",
    definition: "Breast lift surgery reshapes the skin envelope and breast tissue and repositions the nipple-areola; it does not necessarily add volume.",
    candidacy: "It may suit medically fit adults with breast descent, stable expectations and acceptance of scars, asymmetry and possible sensation or breastfeeding changes.",
    limits: "A lift cannot guarantee upper-pole fullness, exact symmetry or permanent position; augmentation or reduction is a separate decision.",
    evaluation: "Assessment covers degree of descent, tissue volume, skin quality, asymmetry, imaging where indicated, pregnancy plans, nicotine and previous surgery.",
    technique: "The surgeon removes selected skin, reshapes supporting tissue and repositions the nipple-areola using a scar pattern matched to anatomy.",
    approaches: [
      { label: "Periareolar lift", detail: "A limited scar around the areola suits selected minor descent and has contour limitations." },
      { label: "Vertical lift", detail: "A periareolar and vertical scar permits greater reshaping." },
      { label: "Wise-pattern lift", detail: "An additional inframammary scar addresses more skin excess and ptosis." },
    ],
    duration: "Usually several hours, particularly when combined with implant, reduction or asymmetry work",
    admission: "Often day care or one night, with clinical needs and combined procedures determining observation.",
    recovery: "Support bra use, wound care and lifting restrictions are common while scars and shape mature over months.",
    risks: "Risks include bleeding, infection, delayed healing, asymmetry, altered sensation, prominent scars, fat necrosis, nipple or skin loss and revision.",
    urgent: "rapid swelling, fever, wound opening, severe one-sided pain, darkening nipple or skin, breathlessness or calf swelling",
    drivers: [
      { label: "Degree of descent", detail: "Skin excess and nipple position determine scar pattern and reshaping." },
      { label: "Lift alone or augmentation", detail: "Adding an implant changes cost, risks, traceability and surveillance." },
      { label: "Asymmetry work", detail: "Different treatment on each side increases planning and operating time." },
      { label: "Previous surgery", detail: "Existing scars and altered blood supply affect technique." },
      { label: "Healing and admission", detail: "Health, nicotine and combined procedures affect monitoring." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Previous breast surgery and scar records", "Breast imaging where clinically indicated", "Pregnancy, breastfeeding and nicotine history"],
    followUp: "Follow-up reviews nipple and skin blood supply, wounds, scars, support-bra use, symmetry and longer-term shape settling.",
    quoteQuestions: ["Which scar pattern is planned?", "Is an implant or reduction included?", "How may sensation and breastfeeding change?"],
    related: ["Breast Augmentation", "Breast Reduction", "Fat Transfer"],
    imageAlts: [
      "Medical illustration of breast skin envelope, supporting tissue, nipple-areola and inframammary fold relevant to mastopexy",
      "Clinical diagram comparing periareolar, vertical and Wise-pattern breast lift incision concepts",
      "Breast lift recovery pathway showing support bra use, nipple and wound checks, activity restrictions and scar maturation",
    ],
  },
  {
    procedure: "Blepharoplasty",
    shortName: "blepharoplasty",
    specialist: "plastic, facial plastic or oculoplastic surgeon",
    area: "upper or lower eyelid skin, muscle and fat compartments",
    definition: "Blepharoplasty modifies selected eyelid skin, muscle or fat; functional upper-lid surgery and cosmetic contour surgery require different documentation.",
    candidacy: "It may suit medically fit adults with a defined upper- or lower-eyelid concern, realistic expectations and healthy enough ocular surface and eyelid support.",
    limits: "It cannot guarantee symmetry, remove every wrinkle or correct brow position, ptosis or dark pigmentation unless separately assessed.",
    evaluation: "Assessment may include eyelid position, brow, ocular surface, dry-eye symptoms, vision, lower-lid support, standardized photographs and formal visual fields when functional surgery is considered.",
    technique: "Through an upper crease, lower lash-line or transconjunctival access, selected skin, muscle or fat is removed, repositioned or preserved while protecting eyelid function.",
    approaches: [
      { label: "Upper blepharoplasty", detail: "Upper crease access treats selected skin and fat while avoiding excessive removal and incomplete closure." },
      { label: "Lower transconjunctival approach", detail: "Internal lower-lid access treats selected fat without an external skin incision." },
      { label: "Lower transcutaneous approach", detail: "External access permits skin and muscle work but requires careful lid-support assessment." },
    ],
    duration: "Often one to several hours depending on upper, lower, bilateral and support procedures",
    admission: "Usually day care, although combined surgery, vision concerns or medical needs may extend observation.",
    recovery: "Bruising, swelling, dryness and temporary visual blur can occur; contact lenses, eye rubbing and travel require individualized advice.",
    risks: "Risks include bleeding, infection, dry eye, asymmetry, scarring, lid malposition, incomplete closure, double vision and rare vision-threatening orbital bleeding.",
    urgent: "severe eye pain, sudden visual change, rapidly increasing swelling, persistent vomiting, inability to close the eye or significant bleeding",
    drivers: [
      { label: "Upper, lower or both", detail: "Each lid and side changes operating time and recovery." },
      { label: "Functional assessment", detail: "Ptosis, brow position or visual-field work may require separate evaluation." },
      { label: "Fat preservation or repositioning", detail: "Anatomy determines whether tissue is removed, moved or supported." },
      { label: "Lid-support procedure", detail: "Canthal support adds scope when lower-lid laxity warrants it." },
      { label: "Combined facial surgery", detail: "Brow lift or facelift changes anaesthesia and swelling." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Eye disease, dry-eye and vision history", "Previous eyelid, laser or facial procedure records", "Visual-field or ophthalmology results where indicated"],
    followUp: "Follow-up checks vision, ocular surface, lid closure and position, wounds, swelling and scarring; urgent eye access must be explicit.",
    quoteQuestions: ["Is this cosmetic, functional or combined?", "Is eyelid support required?", "Who provides emergency eye review?"],
    related: ["Facelift", "Rhinoplasty", "Fat Transfer"],
    imageAlts: [
      "Medical illustration showing upper and lower eyelid skin, orbicularis muscle, orbital septum, fat compartments and globe",
      "Clinical diagram comparing upper-crease, lower transconjunctival and lower transcutaneous blepharoplasty access",
      "Blepharoplasty recovery pathway showing cold-compress guidance, eye lubrication, vision checks, swelling review and travel clearance",
    ],
  },
  {
    procedure: "Gynecomastia Surgery",
    shortName: "gynecomastia surgery",
    specialist: "plastic surgeon",
    area: "male chest glandular tissue, subcutaneous fat and skin",
    definition: "Gynecomastia surgery reduces selected glandular tissue, fat or excess skin after the underlying chest enlargement has been appropriately assessed.",
    candidacy: "It may suit medically fit adults, and selected adolescents after specialist review, with persistent enlargement, stable expectations and no untreated reversible cause.",
    limits: "Surgery cannot guarantee perfect symmetry, invisible scars or prevent recurrence from medicines, hormones, substances or weight change.",
    evaluation: "Assessment distinguishes gland, fat, skin excess and concerning masses and reviews medicines, supplements, hormones, liver or endocrine history and indicated tests.",
    technique: "Liposuction treats selected fat, direct excision removes firm gland, and skin excision is reserved for substantial excess; approaches may be combined.",
    approaches: [
      { label: "Liposuction-dominant treatment", detail: "Cannula contouring suits selected fatty enlargement but cannot reliably remove dense gland." },
      { label: "Gland excision", detail: "A planned incision permits removal of firm tissue and specimen assessment when indicated." },
      { label: "Skin-reduction approach", detail: "More extensive scars may be required for substantial skin excess." },
    ],
    duration: "Usually one to several hours depending on gland, fat, skin and symmetry work",
    admission: "Often day care or one night; extent, drains and medical needs determine observation.",
    recovery: "Compression, bruising, swelling and lifting restrictions are common while chest contour and scars mature.",
    risks: "Risks include bleeding, hematoma, infection, seroma, contour depression or residual fullness, asymmetry, sensation change, nipple or skin injury, scars and revision.",
    urgent: "rapid one-sided swelling, severe pain, fever, wound opening, darkening nipple skin, breathlessness or calf swelling",
    drivers: [
      { label: "Gland, fat or skin", detail: "Tissue composition determines excision, liposuction or longer scars." },
      { label: "One or both sides", detail: "Asymmetry may require different work on each side." },
      { label: "Cause evaluation", detail: "Indicated endocrine, liver, medicine or imaging review may sit outside a surgical package." },
      { label: "Specimen pathology", detail: "Suspicious or excised tissue may require separately itemized assessment." },
      { label: "Garment and drains", detail: "Extent affects compression and postoperative monitoring." },
    ],
    inclusions: [...commonInclusions, { label: "Compression garment", detail: "One stated garment only when listed; replacements are separate." }],
    exclusions: commonExclusions,
    records: ["Medicine, supplement and hormone history", "Relevant endocrine, liver or imaging results", "Previous chest surgery records"],
    followUp: "Follow-up reviews hematoma, nipple and skin viability, wounds, seroma, garment fit, pathology where obtained and contour settling.",
    quoteQuestions: ["What proportion is gland, fat or skin?", "Is cause evaluation and pathology included?", "Is one compression garment included?"],
    related: ["Liposuction", "Tummy Tuck", "Fat Transfer"],
    imageAlts: [
      "Medical cross-section showing male chest skin, subcutaneous fat, glandular tissue, nipple-areola, pectoral muscle and chest wall",
      "Clinical diagram comparing liposuction cannula treatment, periareolar gland excision and selected skin-reduction approaches",
      "Gynecomastia surgery recovery pathway showing compression, hematoma checks, wound care, lifting restrictions and contour review",
    ],
  },
  {
    procedure: "Brazilian Butt Lift",
    shortName: "Brazilian butt lift",
    specialist: "plastic surgeon with current fat-grafting safety protocols",
    area: "donor-site subcutaneous fat and buttock subcutaneous contour",
    definition: "Brazilian butt lift harvests fat by liposuction, processes it and injects selected fat into the buttock subcutaneous plane; it is not a lifting operation in every case.",
    candidacy: "It may be considered only for medically suitable adults with adequate donor tissue, realistic goals, capacity for positioning restrictions and access to a team using current safety protocols.",
    limits: "Transferred volume and retention cannot be guaranteed, high-volume goals may be unsafe, and loose skin may require a different operation.",
    evaluation: "Assessment maps donor and recipient anatomy, skin laxity, prior injections or surgery, clot and anaesthetic risk, medicines, nicotine and ability to comply with recovery.",
    technique: "Fat is harvested, prepared and injected in controlled passes into the planned subcutaneous plane; avoidance of deep intramuscular injection is a critical safety principle.",
    approaches: [
      { label: "Subcutaneous fat grafting", detail: "Prepared fat is placed above the gluteal fascia using a safety-focused plan and appropriate visualization protocol." },
      { label: "Staged grafting", detail: "A second procedure may be safer than pursuing excessive volume in one sitting." },
      { label: "Excisional buttock lift", detail: "Loose skin may require tissue excision and a scar; this is anatomically different from fat transfer." },
    ],
    duration: "Several hours depending on donor areas, safe harvest and grafting scope",
    admission: "Monitored recovery and one or more nights may be advised according to extent, health and travel circumstances.",
    recovery: "Donor garments, positioning limits, early mobility and close monitoring are important; discharge is not the same as fitness for a long flight.",
    risks: "Risks include bleeding, infection, seroma, contour irregularity, fat necrosis, asymmetry, low graft retention, blood clots and rare but potentially fatal fat embolism.",
    urgent: "breathlessness, chest pain, confusion, collapse, rapid heart rate, one-sided leg swelling, fever or rapidly increasing pain",
    drivers: [
      { label: "Donor areas", detail: "Number and size of liposuction zones change time, fluid management and garments." },
      { label: "Safety protocol", detail: "Subcutaneous-only placement, visualization, cannula and team practices must be confirmed rather than inferred from price." },
      { label: "Planned volume and staging", detail: "Safety and tissue capacity override requested volume; another stage is a separate episode." },
      { label: "Prior injections", detail: "Unknown fillers or grafts can change anatomy and may need imaging or make treatment unsuitable." },
      { label: "Admission and travel", detail: "Clot risk, positioning and long-haul travel influence monitoring and stay." },
    ],
    inclusions: [...commonInclusions, { label: "Donor garments", detail: "Only named garments and donor zones in the written estimate." }],
    exclusions: commonExclusions,
    records: ["Previous buttock injections or grafting records", "Clot, anaesthetic and cardiopulmonary history", "Weight and donor-site procedure history"],
    followUp: "Follow-up checks breathing and clot symptoms, donor wounds, fluid collection, skin, grafted tissues, positioning and contour evolution.",
    quoteQuestions: ["Is fat placement subcutaneous-only?", "What visualization and safety protocol is used?", "How are suspected fat embolism and clots managed?"],
    related: ["Fat Transfer", "Liposuction", "Tummy Tuck"],
    imageAlts: [
      "Medical cross-section showing buttock skin, subcutaneous fat, gluteal fascia, muscle and major vessels relevant to fat-grafting safety",
      "Clinical safety diagram showing donor fat harvest, processing and subcutaneous-only buttock placement above the gluteal fascia",
      "Brazilian butt lift recovery pathway showing donor garments, pressure precautions, early mobility, clot and breathing warning signs and travel review",
    ],
  },
  {
    procedure: "Fat Transfer",
    shortName: "fat transfer",
    specialist: "plastic surgeon",
    area: "selected donor fat and a defined facial or body recipient area",
    definition: "Fat transfer harvests the patient's own fat, prepares it and places small amounts into a selected recipient area; retention is biologically variable.",
    candidacy: "It may suit medically fit adults with an appropriate donor site, a defined volume or contour concern, realistic retention expectations and willingness to consider staged treatment.",
    limits: "It cannot guarantee graft survival, exact volume, symmetry or permanent correction; recipient-site anatomy and safety limits take priority.",
    evaluation: "Assessment identifies donor and recipient sites, skin and tissue quality, previous injections, vascular risk, medicines, nicotine and whether another procedure better fits the concern.",
    technique: "Fat is harvested by controlled liposuction, processed and injected in small aliquots within anatomically appropriate tissue planes.",
    approaches: [
      { label: "Facial fat grafting", detail: "Small-volume placement addresses selected facial compartments with swelling and vascular safety considerations." },
      { label: "Breast fat grafting", detail: "Conservative placement may address contour or modest volume and can affect imaging interpretation." },
      { label: "Body contour fat grafting", detail: "Larger donor and recipient plans require procedure-specific safety and should not be treated as one generic service." },
    ],
    duration: "One to several hours depending on donor and recipient areas and planned volume",
    admission: "Often day care or a short stay; larger body treatment and medical needs may require longer monitoring.",
    recovery: "Both donor and recipient sites swell and bruise; pressure, garment and activity advice differ by anatomical area.",
    risks: "Risks include bleeding, infection, contour irregularity, asymmetry, fat necrosis, calcification, oil cysts, low retention and rare vascular or fat-embolism complications depending on site.",
    urgent: "visual change after facial treatment, breathlessness, chest pain, neurological symptoms, fever or rapidly increasing swelling",
    drivers: [
      { label: "Donor and recipient areas", detail: "Each anatomical site changes access, volume, garments and safety considerations." },
      { label: "Volume and staging", detail: "Tissue capacity and perfusion limit safe placement; another stage is separately priced." },
      { label: "Processing method", detail: "Equipment and handling vary, but no method guarantees survival." },
      { label: "Previous fillers or grafts", detail: "Unknown material or scar tissue may require investigation." },
      { label: "Combined surgery", detail: "Adding a lift, implant or excision materially changes anaesthesia and recovery." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Previous filler, injection or graft records", "Donor-area surgery and scar history", "Relevant breast imaging when breast grafting is proposed"],
    followUp: "Follow-up reviews donor wounds, recipient perfusion, infection, nodules, fat necrosis, swelling and volume evolution before judging retention.",
    quoteQuestions: ["Which donor and recipient areas are included?", "What volume and tissue plane are planned?", "How are nodules or fat necrosis evaluated?"],
    related: ["Liposuction", "Breast Augmentation", "Facelift", "Brazilian Butt Lift"],
    imageAlts: [
      "Medical illustration identifying donor subcutaneous fat and example facial, breast and body recipient tissue planes for fat transfer",
      "Clinical diagram showing fat harvest, processing and small-aliquot placement into an anatomically selected recipient plane",
      "Fat transfer recovery pathway showing donor garment care, recipient pressure precautions, swelling review and staged retention assessment",
    ],
  },
  {
    procedure: "Otoplasty",
    shortName: "otoplasty",
    specialist: "plastic or appropriately trained ENT surgeon",
    area: "external ear cartilage and skin",
    definition: "Otoplasty reshapes or repositions selected external-ear cartilage, commonly to address prominence or a defined contour concern.",
    candidacy: "It may suit medically fit adults and selected children with mature enough cartilage, personal readiness, realistic expectations and capacity for headband and wound care.",
    limits: "It cannot guarantee identical ears, invisible scars or protection from future trauma, and treatment should not be driven by coercion or bullying alone.",
    evaluation: "Assessment compares both ears, cartilage folds, conchal depth, skin, hearing concerns, previous trauma or surgery and the patient's own goals.",
    technique: "Usually through a crease behind the ear, cartilage may be scored, folded, sutured or selectively reduced before the ear is stabilized closer to the head.",
    approaches: [
      { label: "Cartilage-sparing sutures", detail: "Permanent or long-lasting sutures create or reinforce folds without broad cartilage removal." },
      { label: "Cartilage scoring", detail: "Controlled weakening helps reshape firmer cartilage but has contour and scarring trade-offs." },
      { label: "Conchal reduction or setback", detail: "Selected conchal cartilage or position is addressed when prominence arises from this anatomy." },
    ],
    duration: "Often one to several hours for bilateral treatment",
    admission: "Usually day care, with observation adjusted for age, anaesthesia, nausea, pain or bleeding.",
    recovery: "A dressing and later headband may protect the ears; pressure, contact sport and sleeping position require temporary modification.",
    risks: "Risks include bleeding or hematoma, infection, chondritis, asymmetry, recurrence, suture problems, contour irregularity, sensation change, scarring and revision.",
    urgent: "severe increasing ear pain, tight swelling, fever, drainage, pale or darkening skin or a displaced dressing",
    drivers: [
      { label: "One or both ears", detail: "Bilateral planning and asymmetry increase operative detail." },
      { label: "Cartilage anatomy", detail: "Fold, concha and stiffness determine sutures, scoring or reduction." },
      { label: "Primary or revision", detail: "Scar tissue, exposed sutures and cartilage loss make revision more complex." },
      { label: "Age and anaesthesia", detail: "Cooperation, safeguarding and anaesthetic approach influence facility needs." },
      { label: "Dressings and follow-up", detail: "Headband protocol and wound access matter for international travel." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Ear trauma, infection and surgery history", "Hearing or congenital-ear records where relevant", "Previous suture or implant details"],
    followUp: "Follow-up checks hematoma, skin and cartilage infection, wounds, sutures, symmetry, headband fit and recurrence.",
    quoteQuestions: ["Which cartilage feature is being treated?", "What headband schedule is required?", "Who handles cartilage infection after return?"],
    related: ["Rhinoplasty", "Facelift", "Blepharoplasty"],
    imageAlts: [
      "Medical illustration identifying helix, antihelix, concha, lobule and posterior ear cartilage relevant to otoplasty",
      "Clinical diagram showing posterior access, antihelical fold sutures and selected conchal setback concepts during otoplasty",
      "Otoplasty recovery pathway showing protective dressing, headband use, hematoma and infection checks and return to contact activity",
    ],
  },
  {
    procedure: "Neck Lift",
    shortName: "neck lift surgery",
    specialist: "plastic or facial plastic surgeon",
    area: "submental region, platysma, jawline and neck skin",
    definition: "Neck lift surgery treats selected neck skin, fat and platysma laxity; it may be performed alone or with lower-face surgery.",
    candidacy: "It may suit medically fit adults with a defined neck or submental concern, realistic expectations and willingness to accept scars and swelling.",
    limits: "It cannot guarantee a sharp jawline, perfect symmetry or correction of skeletal, glandular or skin-quality issues outside the planned layers.",
    evaluation: "Assessment distinguishes skin laxity, subcutaneous fat, platysma bands, chin and jaw support, salivary glands, prior procedures, medicines and nicotine.",
    technique: "Through incisions beneath the chin and/or around the ear, selected fat may be treated, platysma repositioned and skin redraped without excessive tension.",
    approaches: [
      { label: "Submental approach", detail: "Under-chin access addresses selected fat and central platysma but has limited effect on broad skin excess." },
      { label: "Lateral neck lift", detail: "Incisions around the ear permit wider tissue repositioning and skin redraping." },
      { label: "Combined face and neck lift", detail: "Lower-face and neck tissues are treated together, increasing scope and recovery." },
    ],
    duration: "Usually several hours, especially when combined with facelift or fat grafting",
    admission: "Day care or a short overnight stay may be used depending on extent, drains and medical needs.",
    recovery: "Swelling, bruising, tightness and temporary numbness are common considerations; head position, drains and wound care are individualized.",
    risks: "Risks include bleeding or hematoma, infection, asymmetry, contour irregularity, visible scars, nerve injury, skin loss, prolonged swelling and revision.",
    urgent: "rapid neck swelling, breathing or swallowing difficulty, facial weakness, fever, severe pain or darkening skin",
    drivers: [
      { label: "Skin, fat and platysma extent", detail: "The layers requiring treatment determine access and operating time." },
      { label: "Submental or lateral access", detail: "Scar position and correction differ by anatomy." },
      { label: "Facelift combination", detail: "Combined lower-face work is a larger episode, not an included synonym." },
      { label: "Prior energy or threads", detail: "Scarred planes can change predictability and technique." },
      { label: "Anaesthesia and drains", detail: "Extent and health affect monitoring." },
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    records: ["Previous facial, neck, filler, thread and energy-device records", "Thyroid, salivary and swallowing history", "Medicines affecting bleeding"],
    followUp: "Follow-up checks hematoma, breathing, facial movement, skin viability, drains, wounds and evolving contour.",
    quoteQuestions: ["Is this a neck lift alone or combined facelift?", "Which tissue layers are addressed?", "How is urgent neck swelling managed?"],
    related: ["Facelift", "Liposuction", "Fat Transfer"],
    imageAlts: [
      "Medical side-view illustration showing submental fat, platysma, jawline, neck skin and deeper structures relevant to neck lift planning",
      "Clinical diagram comparing submental access, platysma treatment and lateral skin-redraping concepts during neck lift surgery",
      "Neck lift recovery pathway showing head elevation, drain and hematoma checks, facial movement review and travel clearance",
    ],
  },
  {
    procedure: "Arm Lift",
    shortName: "arm lift surgery",
    specialist: "plastic surgeon",
    area: "upper-arm skin and subcutaneous tissue",
    definition: "Arm lift surgery, or brachioplasty, removes selected excess upper-arm skin and fat; the trade-off is a visible scar whose length follows the anatomical problem.",
    candidacy: "It may suit medically fit adults with stable weight and substantial upper-arm skin laxity who accept scars, compression and lifting restrictions.",
    limits: "It cannot make arms identical, erase scars or substitute for weight stabilization; liposuction alone may not treat loose skin.",
    evaluation: "Assessment covers skin and fat distribution, axillary extension, scars, lymphatic or swelling history, previous weight loss, nicotine, diabetes and clot risk.",
    technique: "Through an incision placed along the inner or posterior arm, selected skin and fat are removed; liposuction may be added conservatively before layered closure.",
    approaches: [
      { label: "Limited-incision arm lift", detail: "An axillary scar treats selected proximal laxity but cannot correct the entire arm." },
      { label: "Standard brachioplasty", detail: "A longer upper-arm scar addresses broader skin excess." },
      { label: "Extended brachioplasty", detail: "Excision continues toward the chest for lateral excess, increasing scar and wound burden." },
    ],
    duration: "Usually several hours depending on bilateral extent and chest-wall extension",
    admission: "Day care or one or more nights may be used according to extent, drains, mobility and health.",
    recovery: "Compression, swelling, wound care and restrictions on lifting and shoulder movement are common while scars mature.",
    risks: "Risks include bleeding, infection, seroma, delayed healing, wide scars, asymmetry, numbness, nerve injury, lymphatic swelling, blood clots and revision.",
    urgent: "hand swelling or weakness, severe increasing pain, fever, wound separation, darkening skin, breathlessness or calf swelling",
    drivers: [
      { label: "Scar and excision extent", detail: "Limited, standard and extended patterns differ materially in time and wound care." },
      { label: "Liposuction combination", detail: "Added aspiration changes fluid, contour and garment planning." },
      { label: "Weight-loss anatomy", detail: "Thin tissues and broader laxity can increase closure and healing demands." },
      { label: "Lymphatic and nerve risk", detail: "Prior surgery or swelling history may change suitability and monitoring." },
      { label: "Garments and admission", detail: "Extent and bilateral mobility needs affect aftercare." },
    ],
    inclusions: [...commonInclusions, { label: "Compression garment", detail: "One specified garment only when itemized; replacements are separate." }],
    exclusions: commonExclusions,
    records: ["Weight-loss and bariatric surgery history", "Arm, axillary or breast surgery records", "Lymphatic swelling, clotting and nerve history"],
    followUp: "Follow-up reviews hand circulation and movement, wounds, seroma, swelling, garments, scar maturation and clot symptoms.",
    quoteQuestions: ["How long and where will the scars be?", "Is chest-wall extension or liposuction included?", "How is arm or hand swelling managed?"],
    related: ["Liposuction", "Tummy Tuck", "Breast Lift"],
    imageAlts: [
      "Medical illustration showing upper-arm skin, subcutaneous fat, fascia, major nerves and lymphatic region relevant to brachioplasty",
      "Clinical diagram comparing limited, standard and extended arm lift excision and scar patterns",
      "Arm lift recovery pathway showing compression, hand circulation and movement checks, lifting restrictions, wound care and scar follow-up",
    ],
  },
];

export const cosmeticSurgeryArticles = profiles.map(createCosmeticArticle);

export const cosmeticSurgeryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  cosmeticSurgeryArticles.map((article) => [article.slug, article]),
);
