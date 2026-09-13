import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { NEPHROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_NEPHROLOGY = [
  "Kidney Transplantation",
  "Living Donor Kidney Transplantation",
  "Deceased Donor Kidney Transplantation",
  "ABO-Incompatible Kidney Transplantation",
  "Plasmapheresis",
] as const;

type ExclusiveNeph = Exclude<
  (typeof NEPHROLOGY_PROCEDURES)[number],
  (typeof SHARED_NEPHROLOGY)[number]
>;

type NephProfile = {
  procedure: ExclusiveNeph;
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
  related: ExclusiveNeph[];
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
      "Delhi, Gurugram, Noida and Faridabad are separate dialysis, ICU and transplant-clinic corridors. Confirm the exact campus before booking: a cross-NCR transfer after a new fistula, permcath or graft biopsy is not a routine taxi ride.",
    lodging:
      "Choose flexible lodging near the named dialysis unit or nephrology ward with a companion bed, a refrigerator for medicines and a night-time route back to the treating campus.",
    recovery:
      "Winter pollution and long NCR transfers can worsen fluid overload, access-site care or post-biopsy rest. Follow the team's fluid, diet and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable dialysis bases. Peak traffic and monsoon flooding can interfere with timed HD slots or an urgent return for catheter sepsis, peritonitis or bleeding after biopsy.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, pharmacy hours and a reliable night-time route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make access-site dressings, PD bag storage and reliable transport practical parts of discharge planning after nephrology care.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a missed HD slot or a long transfer after CRRT, fistula surgery or paediatric dialysis teaching.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy access and the first dialysis, wound or laboratory review.",
    recovery:
      "Milder weather can make a longer hotel step-down more comfortable during dialysis training, but it does not remove access, infection or fluid risk. Arrange the first clinical review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several nephrology campuses have comparatively direct airport access, but heat and travel after HD, PD training or biopsy still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with space for PD supplies or fistula-arm care and easy access for fever, bleeding or fluid review.",
    recovery:
      "Heat can worsen dehydration between HD sessions or after a new PD catheter. Fluid and salt targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the dialysis or ICU campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the nephrology team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after HD, biopsy or access surgery. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, dialysis frequency, access type, ICU nights or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Treatment- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact renal replacement or access sitting, laboratory bundle, medicines and follow-up rather than a headline kidney package.",
  },
  {
    country: "Thailand",
    stay: "Treatment- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish dialysis-slot continuity, CRRT capability or transplant-clinic handover after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Treatment- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, consumable, ICU, laboratory and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Treatment- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual modality, access and monitoring plan rather than a general nephrology package.",
  },
  {
    country: "Germany",
    stay: "Treatment- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, consumable scope and post-travel nephrology follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Treatment- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews laboratories or immunosuppression after return.",
  },
  {
    country: "United States",
    stay: "Treatment- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, consumable, ICU and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: NephProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic nephrology or hospital label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader kidney-care ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Treatment & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, modality or access plan, monitoring and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, modality or access plan and route for urgent renal reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete nephrology records before non-refundable travel. Remote review can change after examination, laboratories, imaging or biopsy.",
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
          `Ask the provider to name the ${profile.specialist}, campus, session versus admission assumptions, consumables, ICU allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send nephrology notes, recent creatinine or eGFR, dialysis prescriptions and access or transplant records before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm dialysis-slot, ICU or laboratory backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews access, wounds, fluid status and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, modality or access assumptions, ICU plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `It should name ${profile.procedure}, the clinician and campus, modality or access, consumables, ICU, laboratories, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createNephArticle(profile: NephProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Treatment, Hospitals & Planning Range`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, treatment options, hospitals, recovery, risks and travel for international patients.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, technique, hospital and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} Selection among ${approachNames} depends on kidney function, disease and the treating team's assessment, not on a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, stated sessions or procedure time, listed laboratories and the stored stay, while extra access work, ICU nights, pathology or another modality depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A different modality, extra consumable or an unexpected admission can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified nephrology team must review records, kidney function and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, modality or access plan and monitoring assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different session count, extra access sitting or a combined ICU list describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and dialysis continuity visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different session counts, access devices, ICU nights or laboratories. Compare professional fees, consumables, medicines, ICU, exclusions and emergency terms.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches to ${profile.procedure}`,
      intro: [
        `${profile.technique} The options below are clinical strategies, not consumer upgrades.`,
        `A named ${profile.specialist} should explain which route fits the individual's kidney function and condition, and what finding could change or cancel it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from kidney function, diagnosis, risk and follow-up needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Is ${profile.procedure} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, profile.limits],
      who: [
        profile.candidacy,
        "Suitability depends on individual assessment by a qualified nephrologist and, where relevant, transplant surgery, interventional radiology, critical care or a multidisciplinary team. This page cannot diagnose a reader or recommend a personal treatment.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, blood pressure medicines, immunosuppression and any access or transplant history before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report fever, access bleeding, severe breathlessness or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Access care, fluid targets and activity limits are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — residual kidney function, volume control, access, histology or transplant immunology — from disease that may still need another modality, medicines or an operation on a neighbouring Urology sheet.",
          "No page can promise dialysis independence, graft survival or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on residual kidney function, anticoagulation, infection, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for laboratory or dialysis backup.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish a single session or procedure, hospital stay, recommended days in India and longer-term kidney care at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms access stability, fluid status, bleeding risk and travel fitness.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, extra dialysis sessions and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Treatment and alternatives", detail: `Discuss ${approachNames}, medicines and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, modality or access, consumables, ICU, laboratories, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, blood tests, imaging or biopsy only when clinically indicated before final consent." },
        { label: "Treatment and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the prescription, access or pathology details where relevant.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, kidney function, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this pathway cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold modality, access, session count, laboratories, medicines and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned treatment", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish access stability, fluid targets and activity limits.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Nephrology notes and any available creatinine, eGFR, electrolytes, urinalysis or dialysis prescriptions",
      "Biopsy, HLA, crossmatch, immunosuppression or previous transplant records where relevant",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, modality or access, session count, ICU, complication terms and follow-up constant. Recurring dialysis figures are not one-time theatre packages unless the estimate says so.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Modality, session count, access, ICU nights, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic nephrology entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, dialysis or ICU infrastructure and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, dialysis-slot or ICU backup, access or laboratory capability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable pulmonary oedema, untreated infection, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical or surgical alternatives were discussed?`,
      "How were my creatinine, eGFR, dialysis records and previous access or transplant operations assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will treatment occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, blood tests, imaging and dialysis sessions are included?",
      "Are specialist, facility, consumable and recovery-room or ICU fees included?",
      "Is this an outpatient session, a day-care procedure or an admission, and what finding would change it?",
      "Are access devices, PD fluid, dialyzers or biopsy pathology assumed, and are manufacturer details provided?",
      "Would extra sessions, a different modality or another procedure change the quotation?",
      "How many ward or ICU nights and which room category are included?",
      "How are extra nights, bleeding, infection, access failure or a complication billed?",
      "Which discharge medicines and dietary reviews are included?",
      "Is pathology, immunofluorescence or HLA testing included if those studies are taken?",
      "When can I fly, walk, work or resume other activity?",
      "Which follow-up visits, laboratories or dialysis slots are included?",
      "How are complications handled after I leave India?",
      "When and by whom will fitness to fly be assessed?",
      "What prescription, access or pathology details and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my clinician after I return home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; kidney function, access, session count, ICU, laboratories and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is nephrology treatment in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, consumables, ICU and follow-up.",
      },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the treatment or procedure?", a: profile.technique },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Actual timing depends on kidney function, findings during the episode and the clinical course.`,
      },
      { q: "How long is the hospital stay?", a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed flight day. ${profile.recovery} The treating team must document travel fitness.`,
      },
      {
        q: "Which Indian cities offer this treatment?",
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant nephrology ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews laboratories, access, dialysis or immunosuppression.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and nephrology centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general nephrology or accreditation label does not establish current case acceptance, dialysis-slot backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/nephrology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/nephrology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual treatment diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/nephrology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery or ongoing-care milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named nephrology consultation, records review and treatment-focused examination when explicitly listed." },
  { label: "Treatment episode", detail: "Specialist, stated sessions or procedure time, standard consumables and recovery-room or ICU care within the written scope." },
  { label: "Laboratories and tests", detail: "Stated blood tests and listed imaging or pathology only; unlisted HLA, immunofluorescence or cultures are extra." },
  { label: "Routine aftercare", detail: "Standard medicines, observation and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, prescription and pathology or access details where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "Extra sessions, a different modality, a new access or another procedure found after arrival." },
  { label: "Complications", detail: "Unplanned tests, ICU extension, re-intervention, prolonged stay or readmission unless expressly covered." },
  { label: "Premium consumables", detail: "Additional dialyzers, PD fluid, catheters or pathology panels beyond the written estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, ESA or iron therapy, remote review or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: NephProfile[] = [
  {
    procedure: "Hemodialysis",
    shortName: "hemodialysis",
    specialist: "nephrologist",
    definition:
      "Hemodialysis in India filters blood through a dialyzer several times a week when residual kidney function can no longer control volume, solutes or symptoms. Costs vary with session frequency, facility, vascular access, laboratories and associated medical care.",
    candidacy:
      "It may be considered for selected advanced CKD or acute kidney injury when a nephrologist already judges that intermittent HD, rather than PD, CRRT or conservative care, is the honest first modality.",
    limits:
      "This is not peritoneal dialysis, CRRT or SLED. The stored [INDIA_COST] is an annual planning band for typical maintenance HD, not a one-time theatre package and not a promise of transplant listing.",
    evaluation:
      "Assessment includes creatinine, eGFR, electrolytes, volume status, infection screen and whether a fistula, graft or catheter is already usable.",
    technique:
      "Blood is withdrawn through an arteriovenous fistula, graft or central catheter, passed through a dialyzer and returned. A typical session lasts about four hours. Anticoagulation, ultrafiltration and dry-weight targets are set for that sitting.",
    approaches: [
      { label: "In-centre maintenance HD", detail: "The usual thrice-weekly sitting when a stable outpatient slot already exists." },
      { label: "Hospital-based or acute HD", detail: "Used for fluid overload, hyperkalaemia or the first sittings after access creation." },
      { label: "Home HD where a house already supports it", detail: "A different training and machine conversation if written after review." },
    ],
    duration: "About 3.5–4.5 hours per session; frequency is individualized",
    admission: "Often outpatient; stored [STAY] describes typical session cadence, not a hotel week.",
    recovery:
      "Between sessions patients watch fluid, access thrill and blood pressure. Flying waits on access stability, haemoglobin and the team's travel advice — HD itself has no conventional 'recovery period'.",
    risks:
      "Risks include low blood pressure, cramps, fatigue, access bleeding or infection, electrolyte shifts and, rarely, dialysis disequilibrium. Long-term vascular access problems are common enough that a salvage plan should already be named.",
    urgent: "access bleeding that will not stop, fever with a catheter, sudden breathlessness or chest pain",
    drivers: [
      { label: "Session frequency and duration", detail: "Twice-weekly HD is not a thrice-weekly annual invoice." },
      { label: "Access type", detail: "A mature fistula sitting is not a permcath-plus-antibiotics week." },
      { label: "In-centre versus hospital admission", detail: "Acute HD in ICU is a different episode." },
      { label: "ESA, iron and transfusion", detail: "Supportive medicines are often billed separately." },
      { label: "Laboratories and water-quality overhead", detail: "Monthly bloods and isolation rooms add lines." },
    ],
    inclusions: [...commonInclusions, { label: "Listed HD sessions", detail: "Only the stated number of sittings and consumables." }],
    exclusions: [...commonExclusions, { label: "Unplanned extra sessions", detail: "A fourth weekly sitting is another invoice unless written." }],
    records: ["Recent creatinine, eGFR and electrolytes", "Dialysis prescription if already on HD", "Access history", "Blood-pressure and diabetes notes"],
    followUp: "A named local HD unit must exist after return; this page does not transfer a slot.",
    quoteQuestions: ["Is the price per session or per year?", "How many sessions a week are assumed?", "Are ESA and iron included?"],
    related: ["Peritoneal Dialysis", "AV Fistula Creation", "Central Venous Catheter (Permcath) Insertion"],
    campusFocus: "Name a dialysis unit that can honour timed slots and isolation if needed; a generic OPD nephrology clinic is not an HD list.",
    imageAlts: [
      "Medical infographic of hemodialysis showing vascular access, blood flow through a dialyzer and cleaned blood returning to the patient",
      "Step-by-step hemodialysis pathway showing nephrology assessment, access check, a dialysis session and laboratory monitoring",
      "Hemodialysis ongoing-care pathway showing fluid targets, access-site care and travel clearance between sessions",
    ],
  },
  {
    procedure: "Peritoneal Dialysis",
    shortName: "peritoneal dialysis",
    specialist: "nephrologist experienced in home PD",
    definition:
      "Peritoneal dialysis uses the peritoneal membrane and a catheter to exchange dialysis fluid at home or in hospital, when residual function and training already write PD rather than in-centre HD.",
    candidacy:
      "It may be considered for selected ESKD when a team judges that CAPD or APD is appropriate, the abdomen can host a catheter and a helper can learn exchanges.",
    limits:
      "This is not hemodialysis and not CRRT. CAPD catheter insertion is a neighbouring access slug. The stored [INDIA_COST] is an annual planning band, not a one-time implant price.",
    evaluation:
      "Assessment includes residual urine output, hernia or prior abdominal surgery, vision and whether a training week is already funded.",
    technique:
      "Dialysis fluid is instilled through a peritoneal catheter, dwells, then drains. CAPD uses manual exchanges; APD uses a cycler overnight. Infection-prevention steps are part of the product.",
    approaches: [
      { label: "CAPD", detail: "Daytime manual exchanges when a trained patient or helper already exists." },
      { label: "APD / cycler PD", detail: "Overnight automated exchanges; the machine and fluid volume are material lines." },
      { label: "Urgent-start PD", detail: "Selected when a new catheter must be used before full healing." },
    ],
    duration: "Training often 3–7 days; thereafter exchanges are daily at home",
    admission: "Stored [STAY] is usually a training admission, then home PD.",
    recovery:
      "After training, care is ongoing rather than a wound-healing week. Flying waits on exit-site status, a supply plan and the team's peritonitis teaching.",
    risks:
      "Risks include peritonitis, exit-site or tunnel infection, catheter malfunction, hernia, ultrafiltration failure and the later need to switch to HD.",
    urgent: "cloudy bags, fever, severe abdominal pain or a leaking exit site",
    drivers: [
      { label: "CAPD versus APD", detail: "Cycler rental and fluid volume change the annual invoice." },
      { label: "Training length", detail: "A longer hotel-plus-ward week is not inside a brochure bag count." },
      { label: "Peritonitis treatment", detail: "Admission and intraperitoneal antibiotics are extra unless named." },
      { label: "Catheter insertion sitting", detail: "Neighbouring CAPD-catheter slug if that is a separate invoice." },
      { label: "Home supply logistics", detail: "Fluid delivery after return is rarely inside an India package." },
    ],
    inclusions: [...commonInclusions, { label: "Listed training and fluid", detail: "Only the stated bags, cycler days and teaching sessions." }],
    exclusions: [...commonExclusions, { label: "Home fluid after departure", detail: "Months of bags in another country are a different supply chain." }],
    records: ["Residual urine volume", "Prior abdominal surgery notes", "Hernia examination", "Helper availability"],
    followUp: "A named PD programme must exist after return for bag supply and peritonitis advice.",
    quoteQuestions: ["Is this CAPD or APD?", "How many training nights are included?", "Are home bags after discharge included?"],
    related: ["CAPD Catheter Insertion", "Hemodialysis", "Percutaneous Renal Biopsy"],
    campusFocus: "Name who teaches exchanges and who answers a cloudy-bag call at night; a daytime HD floor is not a PD service.",
    imageAlts: [
      "Medical infographic of peritoneal dialysis showing a peritoneal catheter, dialysis fluid in the abdomen and waste-fluid drainage",
      "Step-by-step peritoneal-dialysis pathway showing training, a CAPD or APD exchange and infection-prevention checks",
      "Peritoneal-dialysis home-care pathway showing exit-site care, supply planning and peritonitis warning signs",
    ],
  },
  {
    procedure: "Continuous Renal Replacement Therapy (CRRT)",
    shortName: "CRRT",
    specialist: "critical-care nephrologist",
    definition:
      "CRRT is slow, continuous dialysis used in ICU when shock or severe fluid overload makes intermittent HD poorly tolerated.",
    candidacy:
      "It may be considered for selected AKI in intensive care after a named intensivist and nephrologist already write continuous rather than intermittent replacement.",
    limits:
      "This is not maintenance HD and not SLED. It is a poor first international-tourism product: unstable ICU patients should rarely travel to start CRRT.",
    evaluation:
      "Assessment is bedside: haemodynamics, anticoagulation risk, access and whether SLED or a short HD run would still be honest.",
    technique:
      "A large-vein catheter feeds a continuous circuit. Fluid and solute are removed over many hours. Filters, replacement fluid and anticoagulation are titrated in ICU.",
    approaches: [
      { label: "CVVH / CVVHD / CVVHDF", detail: "Mode is chosen from solute and volume goals, not from a brochure name." },
      { label: "Anticoagulated circuit", detail: "Citrate or heparin adds bleeding and calcium-monitoring lines." },
      { label: "Step-down to SLED or HD", detail: "A later intermittent sitting is a neighbouring slug." },
    ],
    duration: "Often 24 hours or more per filter circuit; total ICU days vary",
    admission: "ICU-only; stored [STAY] is ICU days as quoted, not a ward package.",
    recovery:
      "Recovery follows the ICU illness, not the filter change. Flying is often inappropriate until the critical illness itself has resolved.",
    risks:
      "Risks include low blood pressure, bleeding from anticoagulation, electrolyte shifts, hypothermia, access infection and circuit clotting.",
    urgent: "fresh bleeding, sudden hypotension, catheter dislodgement or circuit alarm that the ICU team cannot clear",
    drivers: [
      { label: "ICU days and filter count", detail: "Each circuit and each night is a material line." },
      { label: "Anticoagulation strategy", detail: "Citrate protocols add laboratory cost." },
      { label: "Access insertion", detail: "A new dialysis catheter may be a neighbouring slug." },
      { label: "Vasopressors and ventilation", detail: "The CRRT invoice is not the whole ICU bill." },
      { label: "Later SLED or HD", detail: "Step-down modalities are different products." },
    ],
    inclusions: [...commonInclusions, { label: "Listed CRRT circuit days", detail: "Only the stated filters and replacement fluid." }],
    exclusions: [...commonExclusions, { label: "The rest of the ICU bill", detail: "Ventilation, antibiotics and nutrition are usually separate." }],
    records: ["ICU notes and vasopressor list", "Creatinine and electrolytes", "Anticoagulation history", "Access details"],
    followUp: "Handover must name who continues dialysis after ICU; this page does not export a CRRT prescription.",
    quoteQuestions: ["How many ICU days and filters are assumed?", "Is citrate anticoagulation included?", "Is the dialysis catheter included?"],
    related: ["Sustained Low-Efficiency Dialysis (SLED)", "Hemodialysis", "Dialysis Catheter Placement"],
    campusFocus: "Confirm a 24-hour CRRT-capable ICU; a scheduled HD chair is not this product.",
    imageAlts: [
      "Medical infographic of CRRT showing an ICU circuit, replacement fluid and slow continuous blood purification",
      "Step-by-step CRRT pathway showing ICU assessment, catheter access, continuous filtration and haemodynamic monitoring",
      "CRRT recovery pathway showing step-down planning, laboratory checks and later intermittent dialysis discussion",
    ],
  },
  {
    procedure: "Sustained Low-Efficiency Dialysis (SLED)",
    shortName: "SLED",
    specialist: "critical-care nephrologist",
    definition:
      "SLED is a hybrid ICU dialysis lasting several hours at slower blood-flow rates when haemodynamics already write something between CRRT and a short HD run.",
    candidacy:
      "It may be considered for selected ICU AKI when a team judges that SLED is better tolerated than intermittent HD and CRRT is not required or not available.",
    limits:
      "This is not CRRT and not outpatient HD. Few CMS clinicians are tagged; cards must stay limited to exact mappings. Unstable ICU transfer for SLED is a poor first medical-travel experiment.",
    evaluation:
      "Assessment includes blood pressure support, anticoagulation risk and whether a conventional HD machine can be run in hybrid mode.",
    technique:
      "A dialysis catheter connects to a machine programmed for longer, slower solute and fluid removal, typically over 6–12 hours, with ICU monitoring.",
    approaches: [
      { label: "Daytime SLED", detail: "A common hybrid sitting on a conventional HD machine." },
      { label: "Extended nocturnal SLED", detail: "Longer hours when volume removal must be gentler." },
      { label: "Conversion to CRRT or HD", detail: "A different invoice if the modality changes." },
    ],
    duration: "Often 6–12 hours per sitting",
    admission: "ICU or HDU; stored [STAY] is those days as quoted.",
    recovery:
      "Recovery follows the critical illness. Flying waits on dialysis independence or a stable intermittent plan, not on a package night count.",
    risks:
      "Risks include hypotension, bleeding, electrolyte shifts, access complications and incomplete solute control if hours are shortened.",
    urgent: "hypotension, circuit clotting, access bleeding or a sudden rise in potassium",
    drivers: [
      { label: "Hours per sitting", detail: "A 12-hour SLED is not a 4-hour HD price." },
      { label: "ICU versus HDU", detail: "Room category dominates the bill." },
      { label: "Filter and machine time", detail: "After-hours technician fees may be extra." },
      { label: "Need to convert to CRRT", detail: "A continuous circuit is a neighbouring slug." },
      { label: "Access insertion", detail: "A new catheter is often excluded." },
    ],
    inclusions: [...commonInclusions, { label: "Listed SLED hours", detail: "Only the stated sittings and filters." }],
    exclusions: [...commonExclusions, { label: "Conversion to CRRT", detail: "A continuous circuit is another product." }],
    records: ["ICU haemodynamic chart", "Potassium and bicarbonate", "Access details", "Prior HD or CRRT notes"],
    followUp: "Name who writes the next modality after SLED; do not treat a hybrid sitting as a destination therapy.",
    quoteQuestions: ["How many hours per sitting are assumed?", "Is this ICU or HDU?", "What happens if CRRT is needed instead?"],
    related: ["Continuous Renal Replacement Therapy (CRRT)", "Hemodialysis", "Dialysis Catheter Placement"],
    campusFocus: "The CMS currently tags few SLED-only clinicians; empty or sparse cards must stay honest.",
    imageAlts: [
      "Medical infographic of SLED showing a slower, longer hybrid dialysis circuit used in ICU or HDU",
      "Step-by-step SLED pathway showing haemodynamic review, extended dialysis hours and laboratory checks",
      "SLED recovery pathway showing step-down to intermittent HD or further ICU care",
    ],
  },
  {
    procedure: "Dialysis Catheter Placement",
    shortName: "dialysis catheter placement",
    specialist: "nephrologist or interventional colleague placing dialysis access",
    definition:
      "Dialysis catheter placement inserts a large-vein line so HD or ICU dialysis can start before a fistula is ready, or when temporary access is the honest first step.",
    candidacy:
      "It may be considered when dialysis is needed and a mature AV fistula or graft is not available, after imaging of the planned vein.",
    limits:
      "This is not permcath insertion by another name when the CMS already splits tunnelled cuffed catheters, and not AV fistula creation. Infection risk rises the longer a non-tunnelled line stays.",
    evaluation:
      "Assessment includes coagulation, vein ultrasound and whether a tunnelled permcath or a fistula should already be the next sitting.",
    technique:
      "Under sterile conditions and usually ultrasound, a dialysis catheter is placed in an internal jugular or femoral vein. Position is checked and HD can follow if written.",
    approaches: [
      { label: "Non-tunnelled internal-jugular catheter", detail: "The usual urgent HD access." },
      { label: "Femoral temporary catheter", detail: "Selected when the neck veins are not usable." },
      { label: "Immediate conversion plan to permcath or fistula", detail: "A second slug if that sitting is already booked." },
    ],
    duration: "Often 20–60 minutes of procedure time",
    admission: "Outpatient or one night; stored [STAY] is not an HD week.",
    recovery:
      "Recovery watches puncture-site bleeding, pneumothorax risk after neck lines and line function at the first HD. Flying waits on a stable chest and a working access plan.",
    risks:
      "Risks include bleeding, arterial puncture, infection, thrombosis, pneumothorax, malposition and the later need for a different access.",
    urgent: "swelling of the neck or groin, shortness of breath, fever or a catheter that will not flow",
    drivers: [
      { label: "Site and imaging guidance", detail: "Ultrasound and fluoroscopy may be extra lines." },
      { label: "Same-day first HD", detail: "The catheter invoice is not the dialysis sitting." },
      { label: "Tunnelled versus non-tunnelled intent", detail: "Permcath is a neighbouring slug if that is the honest device." },
      { label: "Coagulopathy correction", detail: "Plasma or platelet cover is often excluded." },
      { label: "Later fistula creation", detail: "Durable access is a different sitting." },
    ],
    inclusions: [...commonInclusions, { label: "Listed catheter and site", detail: "Only the named vein and device." }],
    exclusions: [...commonExclusions, { label: "The first HD session", detail: "Dialysis time is usually a separate line." }],
    records: ["Coagulation tests", "Vein ultrasound if already done", "Urgency of dialysis", "Prior catheter history"],
    followUp: "A date for fistula or permcath conversion should be named if a temporary line is only a bridge.",
    quoteQuestions: ["Is ultrasound guidance included?", "Is this tunnelled or non-tunnelled?", "Is the first HD session included?"],
    related: ["Central Venous Catheter (Permcath) Insertion", "AV Fistula Creation", "Hemodialysis"],
    campusFocus: "Name who places emergency dialysis lines after hours; a clinic that only writes prescriptions is not this sheet.",
    imageAlts: [
      "Medical infographic of a temporary dialysis catheter entering a central vein for hemodialysis access",
      "Step-by-step dialysis-catheter pathway showing vein mapping, ultrasound-guided insertion and first-use check",
      "Dialysis-catheter recovery pathway showing site care, infection watch and planned conversion to durable access",
    ],
  },
  {
    procedure: "AV Fistula Creation",
    shortName: "AV fistula creation",
    specialist: "vascular access or transplant surgeon working with a nephrologist",
    definition:
      "AV fistula creation joins an artery to a vein, usually in the arm, so repeated HD needles can be used once the vein has matured.",
    candidacy:
      "It may be considered when long-term HD is already anticipated and vessel mapping supports a radiocephalic or brachiocephalic fistula rather than a long-term catheter.",
    limits:
      "This is not dialysis access management (salvage) and not permcath insertion. Maturation takes weeks; a fresh fistula is not ready for needles the next morning.",
    evaluation:
      "Assessment includes arterial and venous duplex mapping, heart-failure risk and whether a graft should be discussed if veins are inadequate.",
    technique:
      "Under local or regional anaesthesia, selected vessels are anastomosed. The patient recovers with arm-elevation and thrill checks. Needling waits on documented maturation.",
    approaches: [
      { label: "Radiocephalic (wrist) fistula", detail: "Preferred when the vessels already allow it." },
      { label: "Brachiocephalic (elbow) fistula", detail: "Used when wrist vessels are unsuitable." },
      { label: "Graft if veins are inadequate", detail: "A different implant conversation if written after mapping." },
    ],
    duration: "Often 45–120 minutes",
    admission: "Day-care or 1–2 nights; stored [STAY] is not the maturation interval.",
    recovery:
      "Recovery protects the arm from blood-pressure cuffs and heavy loads. Flying waits on wound review; first needling is a later clinic decision.",
    risks:
      "Risks include failure to mature, thrombosis, steal syndrome, infection, bleeding, aneurysm and the later need for angioplasty or a new access.",
    urgent: "loss of thrill, rapidly expanding bruise, cold painful hand or wound drainage",
    drivers: [
      { label: "Mapped vessel quality", detail: "A hostile arm is not a first-wrist-fistula afternoon." },
      { label: "Anaesthesia type", detail: "Regional block and day-care fees differ." },
      { label: "Need for a graft", detail: "Prosthetic material is a material line." },
      { label: "Same-admission catheter HD", detail: "A bridge line is a neighbouring slug." },
      { label: "Later fistuloplasty", detail: "Access management is a different product." },
    ],
    inclusions: [...commonInclusions, { label: "Listed anastomosis", detail: "Only the named laterality and vessel pair." }],
    exclusions: [...commonExclusions, { label: "Maturation angioplasties", detail: "Later salvage sits on the access-management slug." }],
    records: ["Vessel mapping duplex", "HD start date if known", "Heart-failure notes", "Dominant-arm preference"],
    followUp: "A named access clinic must document thrill and first-needle timing; do not fly home assuming the fistula is ready.",
    quoteQuestions: ["Which vessels are assumed?", "Is mapping included?", "When will first needling be assessed?"],
    related: ["Dialysis Access Management", "Hemodialysis", "Dialysis Catheter Placement"],
    campusFocus: "Name a surgeon who creates fistulas and a nephrologist who will needle them; a catheter-only unit is not this sheet.",
    imageAlts: [
      "Medical infographic of an arteriovenous fistula showing an artery joined to a vein in the forearm for hemodialysis needles",
      "Step-by-step AV-fistula pathway showing vessel mapping, anastomosis and maturation checks before first needling",
      "AV-fistula recovery pathway showing thrill checks, arm-care rules and later dialysis use",
    ],
  },
  {
    procedure: "Dialysis Access Management",
    shortName: "dialysis access management",
    specialist: "interventional nephrologist or access surgeon",
    definition:
      "Dialysis access management treats stenosis, thrombosis or dysfunction in an existing fistula or graft so HD can continue without immediately creating a new access.",
    candidacy:
      "It may be considered when a mature access already has poor flows, prolonged bleeding, high venous pressures or thrombosis after examination and imaging.",
    limits:
      "This is not first-time AV fistula creation and not a promise that every failing access can be salvaged. A new fistula or catheter may still be required.",
    evaluation:
      "Assessment includes examination of thrill and bruit, duplex or fistulogram and whether the patient can miss or delay an HD sitting.",
    technique:
      "Under imaging, balloon angioplasty, thrombectomy or limited surgical revision is performed. HD may follow the same day if written.",
    approaches: [
      { label: "Fistuloplasty / angioplasty", detail: "The usual first salvage for stenosis." },
      { label: "Thrombectomy of a clotted access", detail: "Time-critical; delay changes success and the invoice." },
      { label: "Surgical revision", detail: "Selected when endovascular salvage is not honest." },
    ],
    duration: "Often 30–120 minutes depending on clot burden",
    admission: "Outpatient or one night; stored [STAY] is not a new-fistula maturation month.",
    recovery:
      "Recovery watches recurrence of poor flows and access bleeding. Flying waits on a working HD sitting after the intervention.",
    risks:
      "Risks include re-thrombosis, vessel rupture, bleeding, infection, steal and the need for a new access or catheter.",
    urgent: "loss of thrill after the procedure, expanding haematoma or a missed HD sitting with rising potassium",
    drivers: [
      { label: "Stenosis versus thrombosis", detail: "A clotted graft is not an elective balloon." },
      { label: "Stents or devices", detail: "Implants are material lines if used." },
      { label: "Same-day HD", detail: "The salvage invoice is not the dialysis sitting." },
      { label: "Repeat interventions", detail: "Access surveillance often needs more than one sitting." },
      { label: "Conversion to a new fistula", detail: "Creation is a neighbouring slug." },
    ],
    inclusions: [...commonInclusions, { label: "Listed salvage sitting", detail: "Only the stated imaging and device." }],
    exclusions: [...commonExclusions, { label: "A new access", detail: "Fistula creation is another product." }],
    records: ["Access type and laterality", "Recent HD flow problems", "Prior fistulograms", "Anticoagulation list"],
    followUp: "The next HD must confirm usable flows; surveillance intervals should be written before departure.",
    quoteQuestions: ["Is this angioplasty or thrombectomy?", "Are stents included?", "Is same-day HD included?"],
    related: ["AV Fistula Creation", "Hemodialysis", "Central Venous Catheter (Permcath) Insertion"],
    campusFocus: "Confirm same-day imaging salvage; a ward that only refers out for fistuloplasty is not this sheet.",
    imageAlts: [
      "Medical infographic of a stenosed hemodialysis fistula with a balloon angioplasty concept for restoring flow",
      "Step-by-step dialysis-access-management pathway showing examination, fistulogram and salvage intervention",
      "Access-management recovery pathway showing flow checks, next hemodialysis sitting and surveillance planning",
    ],
  },
  {
    procedure: "Percutaneous Renal Biopsy",
    shortName: "percutaneous renal biopsy",
    specialist: "nephrologist performing native-kidney biopsy",
    definition:
      "Percutaneous renal biopsy samples native kidney tissue under imaging so histology can explain proteinuria, unexplained AKI or a suspected glomerular disease.",
    candidacy:
      "It may be considered when blood and urine tests already write a question that only tissue can answer, and blood pressure and coagulation are acceptable.",
    limits:
      "This is not a transplant graft biopsy and not a treatment by itself. Immunofluorescence and electron microscopy may be extra lines. A non-diagnostic sample can still occur.",
    evaluation:
      "Assessment includes blood pressure, platelet count, coagulation, kidney ultrasound and whether immunosuppression should wait on histology.",
    technique:
      "The patient lies prone. Under ultrasound, a spring-loaded needle takes cores from the lower pole. Observation for bleeding follows. Tissue is sent for light microscopy and, when written, IF and EM.",
    approaches: [
      { label: "Ultrasound-guided native biopsy", detail: "The usual first sitting." },
      { label: "CT-guided biopsy", detail: "Selected when ultrasound windows are poor." },
      { label: "Biopsy deferred for medical therapy", detail: "Honest when risk already outweighs the histologic question." },
    ],
    duration: "Needle time is short; observation often lasts several hours",
    admission: "Day-care or one night; stored [STAY] covers bleed watch.",
    recovery:
      "Recovery limits heavy lifting and watches haematuria. Flying waits on a stable haemoglobin and the team's bleed advice.",
    risks:
      "Risks include visible haematuria, perinephric haematoma, pain, infection, rare need for embolization or transfusion, and a non-diagnostic sample.",
    urgent: "clot-passing haematuria, fainting, expanding flank pain or fever",
    drivers: [
      { label: "IF and electron microscopy", detail: "Special stains are often billed separately." },
      { label: "Blood-pressure control before the needle", detail: "Delay for hypertension is clinical, not a cheaper package." },
      { label: "Overnight observation", detail: "A day-care discharge is not an ICU bleed watch." },
      { label: "Need for embolization", detail: "Interventional radiology is extra unless named." },
      { label: "Later immunosuppression", detail: "Treatment after histology sits on other invoices." },
    ],
    inclusions: [...commonInclusions, { label: "Listed cores and light microscopy", detail: "IF and EM only if written." }],
    exclusions: [...commonExclusions, { label: "Non-diagnostic repeat biopsy", detail: "A second sitting is another invoice." }],
    records: ["Urine protein and sediment", "Creatinine trend", "Coagulation and platelet count", "Kidney ultrasound"],
    followUp: "Histology must reach the treating nephrologist; a non-diagnostic result needs an explicit next step.",
    quoteQuestions: ["Are immunofluorescence and EM included?", "How many hours of observation are assumed?", "What happens if bleeding needs embolization?"],
    related: ["Kidney Transplant Graft Biopsy", "Kidney Transplant Evaluation and Follow-up", "Hemodialysis"],
    campusFocus: "Name who reads IF and EM on the same campus; a needle without a renal pathologist is not this sheet.",
    imageAlts: [
      "Medical infographic of native-kidney anatomy showing an image-guided biopsy needle path into the renal cortex",
      "Step-by-step kidney-biopsy pathway showing laboratory checks, ultrasound-guided sampling and pathology review",
      "Percutaneous-renal-biopsy recovery pathway showing observation for bleeding, haematuria watch and diagnosis discussion",
    ],
  },
  {
    procedure: "Kidney Transplant Graft Biopsy",
    shortName: "kidney transplant graft biopsy",
    specialist: "transplant nephrologist",
    definition:
      "A kidney transplant graft biopsy samples the allograft when creatinine, DSA or a protocol schedule already writes histology of the transplanted kidney, not the native kidneys.",
    candidacy:
      "It may be considered for selected graft dysfunction, suspected rejection or protocol surveillance after a named transplant nephrologist reviews immunosuppression and imaging.",
    limits:
      "This is not a native percutaneous renal biopsy and not the transplant operation. The CMS currently tags few graft-biopsy-only clinicians; cards must stay limited to exact mappings.",
    evaluation:
      "Assessment includes creatinine trend, DSA, BK virus, ultrasound of the graft and whether anticoagulation or antiplatelets must be held.",
    technique:
      "Under ultrasound the allograft — usually in the iliac fossa — is sampled. Cores go for rejection scoring, C4d and, when written, molecular studies. Observation for bleeding follows.",
    approaches: [
      { label: "Indication biopsy for rising creatinine", detail: "The usual sitting when rejection is in the differential." },
      { label: "Protocol surveillance biopsy", detail: "Used only when a programme already writes that schedule." },
      { label: "Biopsy after treatment of rejection", detail: "A second sitting to judge response." },
    ],
    duration: "Needle time is short; observation often lasts several hours",
    admission: "Day-care or one night; stored [STAY] covers graft-bleed watch.",
    recovery:
      "Recovery watches graft-site pain and haematuria. Flying waits on a stable creatinine and haemoglobin. Immunosuppression is not stopped for travel convenience.",
    risks:
      "Risks include bleeding, haematuria, infection, arteriovenous fistula in the graft, and a sample that does not settle the rejection question.",
    urgent: "graft-site swelling, heavy haematuria, fainting or fever",
    drivers: [
      { label: "Indication versus protocol biopsy", detail: "Surveillance programmes add extra sittings." },
      { label: "C4d and molecular diagnostics", detail: "Banff work-up may be extra." },
      { label: "Treatment of rejection the same admission", detail: "Plasma exchange or ATG is a different invoice." },
      { label: "Native-kidney confusion", detail: "Do not price this as a first native biopsy." },
      { label: "Sparse faculty mapping", detail: "Cards stay honest if only one tagged clinician exists." },
    ],
    inclusions: [...commonInclusions, { label: "Listed graft cores", detail: "Special stains only if written." }],
    exclusions: [...commonExclusions, { label: "Rejection treatment", detail: "ATG, plasma exchange or IVIG are other products." }],
    records: ["Transplant date and immunosuppression", "Creatinine and DSA", "BK/CMV results", "Graft ultrasound"],
    followUp: "A named transplant nephrologist must interpret Banff scoring and adjust medicines before departure.",
    quoteQuestions: ["Is this a protocol or indication biopsy?", "Are C4d and DSA included?", "Is rejection treatment assumed?"],
    related: ["Percutaneous Renal Biopsy", "Kidney Transplant Evaluation and Follow-up", "Paired Kidney Exchange (Swap Transplant)"],
    campusFocus: "The CMS currently tags few graft-biopsy clinicians; do not fill cards from a native-biopsy list.",
    imageAlts: [
      "Medical infographic of a transplanted kidney in the iliac fossa with an ultrasound-guided biopsy needle path",
      "Step-by-step graft-biopsy pathway showing DSA review, sampling of the allograft and Banff pathology",
      "Graft-biopsy recovery pathway showing bleed watch, immunosuppression review and rejection-treatment planning",
    ],
  },
  {
    procedure: "CAPD Catheter Insertion",
    shortName: "CAPD catheter insertion",
    specialist: "nephrologist or surgeon placing PD access",
    definition:
      "CAPD catheter insertion places a peritoneal dialysis catheter so home PD can start after healing and training, when the abdomen already writes that access.",
    candidacy:
      "It may be considered when a PD pathway is already chosen and mapping of prior surgery or hernia risk supports a catheter rather than HD access.",
    limits:
      "This is not the peritoneal-dialysis therapy slug and not a permcath. Few CMS clinicians are tagged; cards must stay limited to exact mappings.",
    evaluation:
      "Assessment includes hernia, prior laparotomy, exit-site planning and whether laparoscopic or open placement is honest.",
    technique:
      "Under anaesthesia the catheter is tunnelled into the pelvis. A flush confirms flow. PD training usually waits days to weeks unless urgent-start PD is written.",
    approaches: [
      { label: "Percutaneous or peritoneoscopic insertion", detail: "Selected when anatomy already allows a limited approach." },
      { label: "Laparoscopic insertion", detail: "Used when adhesions or omentum already write a camera list." },
      { label: "Open surgical insertion", detail: "Still honest after complex abdominal surgery." },
    ],
    duration: "Often 30–90 minutes",
    admission: "Usually 1–3 nights; stored [STAY] is not the training week unless written.",
    recovery:
      "Recovery protects the exit site and delays full-volume exchanges until the team allows them. Flying waits on wound review and a bowel-function check.",
    risks:
      "Risks include leak, peritonitis, malposition, bowel injury, hernia, blockage and the need to revise or remove the catheter.",
    urgent: "fluid leak, severe abdominal pain, fever or a catheter that will not drain",
    drivers: [
      { label: "Insertion technique", detail: "Laparoscopic time is not a bedside percutaneous price." },
      { label: "Urgent-start PD", detail: "Early exchanges change leak risk and the invoice." },
      { label: "Hernia repair in the same sitting", detail: "A combined list is extra unless named." },
      { label: "Later PD training", detail: "Neighbouring peritoneal-dialysis slug if that week is separate." },
      { label: "Sparse faculty mapping", detail: "Cards stay honest when few clinicians are tagged." },
    ],
    inclusions: [...commonInclusions, { label: "Listed catheter and insertion", detail: "Training bags only if written." }],
    exclusions: [...commonExclusions, { label: "Home PD supplies", detail: "Months of fluid are a therapy-slug conversation." }],
    records: ["Prior abdominal surgery", "Hernia examination", "PD versus HD decision notes", "Helper availability"],
    followUp: "Exit-site teaching and a first-flush plan must be named before departure.",
    quoteQuestions: ["Is insertion laparoscopic or percutaneous?", "Is training included?", "What happens if the catheter malpositions?"],
    related: ["Peritoneal Dialysis", "Hemodialysis", "Central Venous Catheter (Permcath) Insertion"],
    campusFocus: "The CMS currently tags few CAPD-catheter clinicians; do not borrow a generic HD list.",
    imageAlts: [
      "Medical infographic of a CAPD catheter tunnelled through the abdominal wall into the pelvis for peritoneal dialysis",
      "Step-by-step CAPD-catheter pathway showing abdominal assessment, insertion and a flush check",
      "CAPD-catheter recovery pathway showing exit-site care, delayed first exchanges and training handover",
    ],
  },
  {
    procedure: "Central Venous Catheter (Permcath) Insertion",
    shortName: "permcath insertion",
    specialist: "nephrologist or interventional colleague placing tunnelled HD access",
    definition:
      "Permcath insertion places a tunnelled, cuffed central venous catheter for hemodialysis when a fistula is not yet ready or is not possible.",
    candidacy:
      "It may be considered when HD is needed for more than a few days and mapping already writes a tunnelled line rather than a non-tunnelled temporary catheter or an immediate fistula.",
    limits:
      "This is not non-tunnelled dialysis catheter placement and not AV fistula creation. Infection and central-vein stenosis remain long-term risks.",
    evaluation:
      "Assessment includes vein ultrasound, coagulation and whether the internal jugular vein is still usable after prior lines.",
    technique:
      "Under ultrasound and usually fluoroscopy, a cuffed catheter is tunnelled to a neck or chest exit site with the tip in the cavo-atrial region. HD can follow if written.",
    approaches: [
      { label: "Right internal-jugular permcath", detail: "The usual first tunnelled sitting." },
      { label: "Left-sided or alternative-vein permcath", detail: "Used when the right IJ is occluded." },
      { label: "Exchange of a failing tunnelled line", detail: "A revision sitting, not a first insertion price." },
    ],
    duration: "Often 30–90 minutes",
    admission: "Outpatient or one night; stored [STAY] is not an HD week.",
    recovery:
      "Recovery watches tunnel bleeding and the first HD flows. Flying waits on a chest check if one was obtained and a working line.",
    risks:
      "Risks include bleeding, infection, thrombosis, pneumothorax, arrhythmia, malposition and later central-vein stenosis.",
    urgent: "tunnel swelling, fever, sudden shortness of breath or a line that will not aspirate",
    drivers: [
      { label: "Fluoroscopy and vein mapping", detail: "Imaging lines differ by house." },
      { label: "First insertion versus exchange", detail: "A hostile neck is not a first permcath." },
      { label: "Same-day HD", detail: "The device invoice is not the sitting." },
      { label: "Later fistula creation", detail: "Durable access remains a neighbouring slug." },
      { label: "Infection treatment", detail: "Line sepsis admissions are extra." },
    ],
    inclusions: [...commonInclusions, { label: "Listed tunnelled catheter", detail: "Only the named vein and device." }],
    exclusions: [...commonExclusions, { label: "Fistula creation", detail: "AVF surgery is another sitting." }],
    records: ["Vein ultrasound", "Prior catheter history", "Coagulation tests", "HD start plan"],
    followUp: "Exit-site care and a fistula timeline should be written if the permcath is only a bridge.",
    quoteQuestions: ["Is fluoroscopy included?", "Is this a first insertion or an exchange?", "Is the first HD included?"],
    related: ["Dialysis Catheter Placement", "AV Fistula Creation", "Hemodialysis"],
    campusFocus: "Name who exchanges infected permcaths; a clinic that only books HD chairs is not this sheet.",
    imageAlts: [
      "Medical infographic of a tunnelled cuffed permcath from a chest exit site into the central veins for hemodialysis",
      "Step-by-step permcath pathway showing vein mapping, tunnelled insertion and tip-position check",
      "Permcath recovery pathway showing tunnel care, first hemodialysis and planned fistula conversion",
    ],
  },
  {
    procedure: "Paired Kidney Exchange (Swap Transplant)",
    shortName: "paired kidney exchange",
    specialist: "transplant nephrologist coordinating a swap pair or chain",
    definition:
      "Paired kidney exchange matches incompatible living donor–recipient pairs so each recipient can receive a compatible kidney, when immunology already writes a swap rather than a directed graft.",
    candidacy:
      "It may be considered when a willing living donor is ABO- or HLA-incompatible with their intended recipient and a registered exchange programme already exists.",
    limits:
      "This is not the Kidney Transplantation operation slug, which remains on Urology. It is not ABO-incompatible desensitization by default. Swap logistics can fail if a pair withdraws.",
    evaluation:
      "Assessment includes HLA, DSA, crossmatch, donor work-up and whether a two-way swap or a longer chain is already the honest plan.",
    technique:
      "Two or more transplants are coordinated, often on the same day, so kidneys move between pairs. Nephrology owns matching, immunosuppression planning and follow-up; the operations sit on the shared Urology sheets.",
    approaches: [
      { label: "Two-way swap", detail: "The simplest pairing when two couples already match." },
      { label: "Longer chain or list exchange", detail: "More logistics, more points of failure." },
      { label: "Swap versus ABO-incompatible transplant", detail: "Desensitization is a different shared Urology product." },
    ],
    duration: "Matching may take weeks to months; the surgical day follows Urology estimates",
    admission: "Stored [STAY] reflects the coordinated admission, not the matching wait.",
    recovery:
      "Recovery follows living-donor and recipient operations. Flying waits on both sides' wound, creatinine and immunosuppression plans.",
    risks:
      "Risks include pair withdrawal, last-minute positive crossmatch, the usual donor and recipient surgical risks, rejection and infection. A swap is not a guarantee of a graft.",
    urgent: "fever, falling urine output, wound problems or a last-minute match collapse before theatre",
    drivers: [
      { label: "Number of pairs in the chain", detail: "A three-way day is not a two-way invoice." },
      { label: "Donor and recipient work-up depth", detail: "HLA and cardiac clearance add lines." },
      { label: "The operations themselves", detail: "Kidney Transplantation remains the shared Urology slug." },
      { label: "Induction immunosuppression", detail: "Often billed separately." },
      { label: "Failed match after work-up", detail: "Laboratories may still be charged." },
    ],
    inclusions: [...commonInclusions, { label: "Listed matching work-up", detail: "Operations only if the Urology sitting is written into the same estimate." }],
    exclusions: [...commonExclusions, { label: "The surgical transplant invoices", detail: "Use the shared Kidney Transplantation sheets for the operations." }],
    records: ["Intended donor blood group and HLA", "Recipient PRA/DSA", "Prior transplant history", "Programme registration notes"],
    followUp: "Both recipients need named transplant-nephrology follow-up; this page does not run a national swap registry.",
    quoteQuestions: ["Does the quote include the operations or only matching?", "How many pairs are assumed?", "What is charged if a pair withdraws?"],
    related: ["Kidney Transplant Evaluation and Follow-up", "Kidney Transplant Graft Biopsy", "Hemodialysis"],
    campusFocus: "Name a registered exchange programme; a brochure 'swap' without HLA logistics is not this sheet.",
    imageAlts: [
      "Medical infographic of paired kidney exchange showing two incompatible donor–recipient pairs crossing to compatible grafts",
      "Step-by-step paired-exchange pathway showing HLA review, match confirmation and coordinated transplant day",
      "Paired-exchange follow-up pathway showing dual-recipient immunosuppression and laboratory monitoring",
    ],
  },
  {
    procedure: "Kidney Transplant Evaluation and Follow-up",
    shortName: "kidney transplant evaluation and follow-up",
    specialist: "transplant nephrologist",
    definition:
      "Kidney transplant evaluation and follow-up is the nephrology work-up and graft-surveillance pathway — HLA, DSA, protocol laboratories and biopsy thresholds — not the operation itself.",
    candidacy:
      "It may be considered when CKD already approaches listing, a living donor is being screened, or an existing graft needs structured follow-up after a named transplant nephrologist reviews the file.",
    limits:
      "This is not Kidney Transplantation, living-donor, deceased-donor or ABO-incompatible surgery — those remain shared Urology slugs. It is not a paired-exchange matching day by itself.",
    evaluation:
      "Assessment includes GFR trend, cardiovascular fitness, infection screen, cancer screen, HLA/crossmatch and caregiver support.",
    technique:
      "Recipient and, where relevant, donor pathways run as outpatient or short-stay investigations. After a graft exists, clinics titrate immunosuppression and decide when a graft biopsy is due.",
    approaches: [
      { label: "Pre-listing recipient evaluation", detail: "Cardiac, infection and cancer screens before activation." },
      { label: "Living-donor medical clearance", detail: "Nephrology clearance is not the donor operation." },
      { label: "Post-graft protocol follow-up", detail: "Laboratories, DSA and biopsy thresholds after the Urology sitting." },
    ],
    duration: "Work-up is usually spread over days to weeks of outpatient visits",
    admission: "Mostly outpatient; stored [STAY] is not the transplant admission.",
    recovery:
      "There is no single recovery week for evaluation. After a graft, travel waits on creatinine, wound status from the surgical team and a written immunosuppression list.",
    risks:
      "Evaluation itself carries test-specific risks. Follow-up risks include rejection missed between visits, drug toxicity, infection and the need for graft biopsy or admission.",
    urgent: "after a graft: fever, falling urine, breathlessness or missed immunosuppression",
    drivers: [
      { label: "Breadth of the work-up", detail: "Cardiac catheterisation or PET adds invoices." },
      { label: "Donor versus recipient pathway", detail: "Two people generate two bills." },
      { label: "HLA and DSA panels", detail: "Repeat testing is common." },
      { label: "The operation itself", detail: "Shared Urology transplant slugs own that sitting." },
      { label: "Long-term immunosuppression", detail: "Years of medicines are outside most evaluation packages." },
    ],
    inclusions: [...commonInclusions, { label: "Listed evaluation visits", detail: "Only the named laboratories and consults." }],
    exclusions: [...commonExclusions, { label: "The transplant operation", detail: "Use the shared Urology Kidney Transplantation sheet." }],
    records: ["GFR trend and dialysis status", "HLA/DSA if already done", "Cardiac evaluation", "Donor relationship notes if living donation"],
    followUp: "A named transplant clinic must exist after return; this page does not list a patient on an Indian deceased-donor wait-list.",
    quoteQuestions: ["Which tests are in the work-up bundle?", "Is donor evaluation included?", "Does this quote include the operation?"],
    related: ["Paired Kidney Exchange (Swap Transplant)", "Kidney Transplant Graft Biopsy", "Percutaneous Renal Biopsy"],
    campusFocus: "Name transplant nephrology and the surgical team separately; an evaluation package is not a theatre booking.",
    imageAlts: [
      "Medical infographic of kidney-transplant evaluation showing recipient and living-donor work-up streams meeting at compatibility testing",
      "Step-by-step transplant-evaluation pathway showing laboratories, HLA/crossmatch, listing discussion and later graft follow-up",
      "Transplant follow-up pathway showing immunosuppression monitoring, DSA checks and graft-biopsy thresholds",
    ],
  },
];

export const NEPHROLOGY_EXCLUSIVE_PROCEDURES = profiles.map((profile) => profile.procedure);

export const nephrologyArticles = profiles.map(createNephArticle);

export const nephrologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  nephrologyArticles.map((article) => [article.slug, article]),
);
