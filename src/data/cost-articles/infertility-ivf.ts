import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { INFERTILITY_IVF_PROCEDURES, toSlug } from "../../lib/taxonomy";

type InfertilityProfile = {
  procedure: (typeof INFERTILITY_IVF_PROCEDURES)[number];
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
  related: Array<(typeof INFERTILITY_IVF_PROCEDURES)[number]>;
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
      "Delhi, Gurugram, Noida and Faridabad host separate fertility corridors. Confirm the exact IVF campus and embryology laboratory before booking because stimulation monitoring and embryo-transfer timing do not tolerate a cross-NCR commute.",
    lodging:
      "Choose flexible lodging near the named campus so early-morning follicle scans, trigger timing and transfer-day fasting remain practical for both partners when both must attend.",
    recovery:
      "Winter pollution and dry summer air matter less than reliable transport to timed monitoring. Follow the clinic's rest advice after egg retrieval or transfer rather than generic city sightseeing plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with same-day hormone draws, trigger injections or a timed frozen-embryo transfer.",
    lodging:
      "Stay on the same side of the harbour as the confirmed fertility centre and verify a quiet room for post-retrieval rest and a reliable route back for urgent bleeding or OHSS review.",
    recovery:
      "Humidity and monsoon travel make companion support, soft diet after retrieval and reliable pharmacy access practical parts of cycle planning.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital and IVF districts. Cross-city traffic can turn a short map distance into a missed monitoring window during stimulation or a stressful transfer-day journey.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy hours for stimulation medicines and evening trigger doses.",
    recovery:
      "Milder weather does not remove OHSS, bleeding or anaesthetic precautions after retrieval. Arrange the first clinical review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several fertility campuses have comparatively direct airport access, but heat, humidity and travel after egg retrieval or laparoscopy still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with fridge space for medications that need cold storage and easy access for blood tests.",
    recovery:
      "Heat can worsen dehydration after retrieval or surgery. Fluid targets and activity limits must come from the treating fertility team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the IVF campus before lodging.",
    lodging:
      "Keep a capable companion and flexible lodging within the response radius specified by the fertility team for OHSS risk or post-surgical pathways.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after retrieval, micro-TESE or laparoscopic fertility surgery. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, medications, laboratory scope, donor legality, admission or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Cycle- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact fertility procedure, medications, embryology fees, monitoring, cryostorage and follow-up rather than a headline IVF package.",
  },
  {
    country: "Thailand",
    stay: "Cycle- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish donor or gamete legality, laboratory continuity or aftercare after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Cycle- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, laboratory, pharmacy, cryostorage and follow-up charges may be billed separately; confirm local assisted-reproduction rules.",
  },
  {
    country: "Singapore",
    stay: "Cycle- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual cycle type, laboratory add-ons and monitoring plan rather than a general fertility package.",
  },
  {
    country: "Germany",
    stay: "Cycle- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, genetic-testing scope and post-travel fertility follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Cycle- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who continues luteal support or pregnancy care after return.",
  },
  {
    country: "United States",
    stay: "Cycle- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, laboratory, medication and cryostorage charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: InfertilityProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic fertility or IVF clinic label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader infertility and IVF ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, laboratory scope, medications and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, embryology laboratory and route for urgent reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete fertility records before non-refundable travel. Remote review can change after examination, stimulation response or laboratory findings.",
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
          `Ask the provider to name the ${profile.specialist}, campus, medications assumptions, laboratory work, monitoring, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring or recovery is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send fertility notes, hormone results, semen analysis and prior cycle summaries before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm laboratory readiness, monitoring capacity and emergency OHSS or bleeding backup where relevant.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews symptoms, luteal support and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, laboratory assumptions, observation plan and handover in writing. General accreditation does not establish current IVF capability or outcomes.",
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
            a: `There is no universal flight date. ${profile.recovery} The treating team must document travel fitness after retrieval, transfer or surgery.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the clinician and campus, medications assumptions, laboratory work, monitoring, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

const commonInclusions: LabelledDetail[] = [
  { label: "Named fertility specialist consultation", detail: "Records review and examination as listed in the estimate." },
  { label: "Stated monitoring", detail: "Ultrasound and hormone checks only when expressly included." },
  { label: "Procedure as named", detail: "The exact fertility pathway written on the quotation." },
  { label: "Routine medicines in package", detail: "Only stimulation, trigger or luteal drugs listed for the episode." },
  { label: "First review", detail: "The first post-procedure or beta-hCG visit when included." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Additional cycles or attempts", detail: "A second stimulation, transfer or surgical sitting is a separate episode." },
  { label: "Donor gametes and legal clearances", detail: "Separate unless donor type, screening and legal pathway are written." },
  { label: "Genetic testing and cryostorage beyond the quote", detail: "PGT, biopsy, freezing and annual storage fees unless listed." },
  { label: "Complications and emergency care", detail: "OHSS, bleeding, infection, anaesthesia events or reoperation." },
  { label: "Flights and lodging", detail: "Travel, companion costs and hotel nights remain outside the clinical quote." },
];

function createInfertilityArticle(profile: InfertilityProfile): CostArticle {
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
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, laboratory scope, medications, risks and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; suitability, medications, clinic and recovery must be individualized.`,
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} Selection among ${approachNames} depends on diagnosis, laboratory findings and the treating team's assessment, not on a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for a United States self-pay reference and [STAY] for broad planning. These values are not city tariffs, medical acceptance, outcome forecasts or final bills.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named fertility specialist, stated monitoring, laboratory steps, routine medicines and the listed stay, while extra medications, donor work, genetic testing or another cycle depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Emergency treatment, a cancelled cycle or a different laboratory add-on can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified fertility team must review records, both partners where relevant and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, medications plan and laboratory assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different cycle type, donor pathway or combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term cryostorage and extra cycles visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different medications, laboratory steps or monitoring intensity. Compare professional fees, embryology work, imaging, observation nights, medicines, exclusions and emergency terms.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches to ${profile.procedure}`,
      intro: [
        `${profile.technique} The options below are clinical strategies, not consumer upgrades.`,
        `A named ${profile.specialist} should explain which route fits the individual's diagnosis and condition, and what finding could change or cancel it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from diagnosis, laboratory findings, risk and follow-up needs",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Is ${profile.procedure} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, profile.limits],
      who: [
        profile.candidacy,
        "Suitability depends on individual assessment by a qualified fertility specialist and, where relevant, an andrologist, embryologist or reproductive surgeon. This page cannot diagnose a reader or recommend a personal procedure.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, allergy, infection risk and any ovarian or anaesthetic baseline before a cycle or theatre date is fixed.",
        "Follow medicine-timing and fasting instructions from the treating team. Report fever, severe pelvic pain, rapid abdominal distension or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Activity limits, intercourse advice and luteal or surgical instructions are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended fertility target from other reproductive disease that may still need medicines, surgery or another laboratory pathway.",
          "No page can promise pregnancy, live birth, genetic normality or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on age, ovarian response, surgical findings, medical fitness, laboratory technique and the actual protocol.",
          `${profile.recovery} A lower price does not reduce the need for emergency access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish clinic visits, any hospital stay, recommended days in India and longer-term recovery at home. Discharge or embryo transfer is not the same as fitness to fly after retrieval or pelvic surgery.",
          `${profile.followUp} Flights should remain flexible until the team confirms symptom control, luteal support and travel fitness where relevant.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} trip budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, cryostorage and a complication contingency.`,
        "Travel should follow written clinical acceptance and an itemized estimate. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: [
        { label: "Records review", detail: profile.evaluation },
        { label: "Specialist assessment", detail: `${profile.candidacy} ${profile.limits}` },
        { label: "Procedure and alternatives", detail: `Discuss ${approachNames}, laboratory scope and what could alter the plan.` },
        { label: "Itemized estimate", detail: "Match clinician, campus, medications, laboratory work, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, ultrasound or labs only when clinically indicated before final consent." },
        { label: "Procedure and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the cycle or operative report, embryo or cryostorage details where relevant and follow-up plan.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, laboratory needs, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss prior treatment, partner factors and what this procedure cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, medications, laboratory scope, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion where needed and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned procedure", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe activity limits, medicines and symptom control.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice when retrieval or surgery was involved.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local fertility or obstetric team.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Hormone panels, ultrasound reports and semen analysis",
      "Previous IVF, IUI, surgery or cryostorage notes and consent forms",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, medications, laboratory scope, monitoring, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Diagnosis, medications, laboratory work, donor legality, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic fertility entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, IVF laboratory capacity and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, emergency OHSS or surgical backup, embryology continuity and care after return.",
      "No provider is ranked and no pregnancy outcome is promised. Active infection, inadequate records, legal barriers to donor care or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical or alternative fertility options were discussed?`,
      "How were ovarian reserve, semen quality, uterus and tubes assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the procedure occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, scans, hormone tests and laboratory steps are included?",
      "Are specialist, theatre or procedure-room, anaesthesia and recovery-room fees included?",
      "Which stimulation, trigger or luteal medicines are assumed?",
      "Are donor, genetic-testing or cryostorage fees written separately?",
      "Would a cancelled cycle, freeze-all or extra transfer change the quotation?",
      "How many ward or observation nights and which room category are included for surgical pathways?",
      "How are extra nights, OHSS, bleeding, another procedure or a complication billed?",
      "Which discharge medicines and pregnancy-test timing are included?",
      "What activity and travel instructions apply after discharge?",
      "When can I fly, work, exercise or resume intercourse?",
      "Which follow-up visits and embryo reports are included?",
      "How are complications handled after I leave India?",
      "When and by whom will fitness to fly be assessed after retrieval or surgery?",
      "What procedure report, embryo photos and emergency contacts will I receive?",
      "Which costs are explicitly excluded?",
      "Who will coordinate care with my home fertility or obstetric team after I return?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; diagnosis, medications, laboratory scope and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is fertility treatment in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, medications, laboratory work, monitoring and follow-up.",
      },
      { q: "What assessment is needed before treatment?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: profile.technique },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration}. Actual timing depends on response, laboratory findings and the clinical course.`,
      },
      { q: "How long is the hospital or clinic stay?", a: `${profile.admission} Discharge is based on clinical criteria, not a package calendar.` },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "When can an international patient fly home?",
        a: `There is no fixed flight day after fertility procedures. ${profile.recovery} The treating team must document travel fitness when retrieval, anaesthesia or pelvic surgery was involved.`,
      },
      {
        q: "Which Indian cities offer this procedure?",
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant infertility and IVF ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews pregnancy testing, luteal support or surgical healing.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and fertility centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards must follow exact live entity relationships for ${profile.procedure}. A general infertility, IVF or accreditation label does not establish current case acceptance, laboratory continuity or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/infertility-ivf/${slug}-illustration.webp`,
        alt: profile.imageAlts[0],
        caption: "A general educational illustration, not a patient-specific anatomy, recommendation or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/infertility-ivf/infertility-ivf-treatment-pathway.webp",
        alt: profile.imageAlts[1],
        caption: "The actual pathway depends on candidacy, laboratory findings, medications and clinical course.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/infertility-ivf/infertility-ivf-recovery-follow-up.webp",
        alt: profile.imageAlts[2],
        caption: "Activity limits, medicines and review timing must be individualized by the treating team.",
        fit: "contain",
      },
    ],
  };
}

const profiles: InfertilityProfile[] = [
  {
    procedure: "IVF Treatment",
    shortName: "IVF treatment",
    specialist: "fertility specialist leading an IVF team",
    definition:
      "IVF treatment retrieves mature eggs, fertilises them with sperm in the embryology laboratory and transfers a resulting embryo into the uterus when laboratory and uterine conditions allow.",
    candidacy:
      "It may be considered for tubal disease, unexplained infertility after appropriate work-up, endometriosis-related infertility, selected male-factor cases managed with IVF, or after unsuccessful simpler treatments when ovarian reserve and uterine receptivity support a cycle.",
    limits:
      "An IVF package label is not a diagnosis. Untreated hydrosalpinx, uncontrolled medical disease, inadequate ovarian reserve for the planned protocol, or legal barriers to the intended gamete source may require delay, surgery first or another pathway.",
    evaluation:
      "Assessment includes ovarian reserve testing, semen analysis, uterine cavity evaluation, infectious-disease screening and review of prior cycle summaries before stimulation starts.",
    technique:
      "Controlled ovarian stimulation is monitored with ultrasound and hormones; eggs are retrieved under sedation, fertilised in the laboratory and embryos cultured for cleavage-stage or blastocyst transfer or freeze-all according to the plan.",
    approaches: [
      { label: "Conventional IVF with own gametes", detail: "Eggs and partner or designated sperm are used without ICSI when fertilisation history supports it." },
      { label: "Freeze-all then FET", detail: "All suitable embryos are cryopreserved when fresh transfer is deferred for medical reasons." },
      { label: "IVF with planned add-ons named separately", detail: "ICSI, assisted hatching or PGT are separate line items when indicated, not silent upgrades." },
    ],
    duration: "often about 2–3 weeks of monitoring for stimulation and retrieval, with transfer timing individualized",
    admission: "Egg retrieval is usually day-care; overnight observation is uncommon unless OHSS risk or anaesthesia concern requires it.",
    recovery:
      "Mild cramping and spotting after retrieval are common. Flying after uncomplicated retrieval is often possible within a few days once bleeding and OHSS risk settle, but the team must confirm—especially after embryo transfer.",
    risks:
      "Risks include ovarian hyperstimulation, bleeding or infection after retrieval, anaesthetic events, multiple pregnancy if more than one embryo is transferred, cycle cancellation and unsuccessful fertilisation or implantation.",
    urgent: "rapid abdominal swelling, severe pelvic pain, shortness of breath, heavy bleeding, fever, or fainting after retrieval",
    drivers: [
      { label: "Stimulation protocol and medication dose", detail: "Gonadotropin type and quantity often dominate the medicine bill." },
      { label: "Laboratory technique", detail: "Conventional IVF versus ICSI or IMSI changes embryology fees." },
      { label: "Fresh versus freeze-all pathway", detail: "Cryopreservation and later FET add separate episodes." },
      { label: "Number of monitoring visits", detail: "Extra scans and hormone tests accumulate." },
      { label: "Embryo culture duration", detail: "Blastocyst culture and time-lapse systems may be extras." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "AMH and antral follicle count",
      "Semen analysis",
      "Prior IVF or IUI summaries",
    ],
    followUp: "Follow-up covers luteal support, pregnancy testing and early obstetric handover when pregnancy occurs; unsuccessful cycles need a written review before another attempt.",
    quoteQuestions: [
      "Which medicines and laboratory steps are included in one cycle fee?",
      "Is freeze-all priced separately from a later FET?",
      "What happens financially if the cycle is cancelled before retrieval?",
    ],
    related: ["ICSI Treatment", "Frozen Embryo Transfer (FET)", "Blastocyst Transfer"],
    imageAlts: [
      "Medical illustration of IVF showing ovarian stimulation, egg retrieval, laboratory fertilisation and embryo transfer",
      "Clinical diagram of an IVF cycle timeline with monitoring, trigger, retrieval and transfer stages",
      "IVF recovery pathway showing post-retrieval rest, luteal support and pregnancy-test timing",
    ],
  },
  {
    procedure: "ICSI Treatment",
    shortName: "ICSI treatment",
    specialist: "fertility specialist with an ICSI-capable embryology laboratory",
    definition:
      "ICSI treatment injects a single sperm into each mature egg in the laboratory to assist fertilisation when sperm quality, prior fertilisation failure or specific laboratory indications support micro-injection.",
    candidacy:
      "It may be considered for moderate to severe male-factor infertility, surgically retrieved sperm, prior IVF fertilisation failure, or selected unexplained cases when the embryology team advises ICSI rather than conventional insemination.",
    limits:
      "ICSI improves fertilisation chance in indicated cases; it does not guarantee embryo quality, euploidy or pregnancy. Using ICSI routinely without indication does not replace evaluation of both partners.",
    evaluation:
      "Review includes semen analysis, andrology history, prior fertilisation results and confirmation that the laboratory is prepared for micro-injection on retrieval day.",
    technique:
      "After egg retrieval, a single selected sperm is injected into each mature oocyte; resulting embryos are cultured and transferred or frozen according to the clinical plan.",
    approaches: [
      { label: "ICSI with ejaculated sperm", detail: "Used when concentration, motility or morphology support injection from an ejaculated sample." },
      { label: "ICSI with surgically retrieved sperm", detail: "Combined with TESE, TESA, PESA or micro-TESE when ejaculated sperm are absent or inadequate." },
      { label: "Rescue ICSI after failed conventional IVF", detail: "Selected only when laboratory timing and egg maturity allow; not a universal backup." },
    ],
    duration: "laboratory injection occurs on retrieval day; the surrounding stimulation cycle usually spans about 2–3 weeks",
    admission: "Same day-care pattern as IVF retrieval; the ICSI step itself does not usually add an overnight stay.",
    recovery:
      "Recovery mirrors IVF retrieval. Partner presence may be required on retrieval day when a fresh semen sample is planned.",
    risks:
      "Risks include those of IVF plus fertilisation failure despite injection, egg damage during injection and the same OHSS and multiple-pregnancy considerations as other IVF pathways.",
    urgent: "rapid abdominal swelling, severe pelvic pain, heavy bleeding, fever, or shortness of breath after retrieval",
    drivers: [
      { label: "Base IVF cycle fees", detail: "ICSI is usually an add-on to stimulation, retrieval and culture." },
      { label: "Sperm source", detail: "Surgical sperm retrieval is a separate theatre episode." },
      { label: "Number of mature eggs injected", detail: "Some laboratories price per injected oocyte." },
      { label: "Embryo culture and transfer plan", detail: "Blastocyst culture or freeze-all change the episode." },
      { label: "Genetic testing add-ons", detail: "PGT requires separate biopsy and analysis fees." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Detailed semen analysis",
      "Prior fertilisation reports",
      "Andrology or surgical sperm notes",
    ],
    followUp: "Embryo report review, luteal support and pregnancy testing follow the same structure as IVF; discuss whether future cycles still need ICSI.",
    quoteQuestions: [
      "Is ICSI priced per cycle or per injected egg?",
      "Is surgical sperm retrieval included or separate?",
      "Does the quote assume blastocyst culture?",
    ],
    related: ["IVF Treatment", "IMSI Treatment", "Micro-TESE"],
    imageAlts: [
      "Medical illustration of ICSI showing a micropipette injecting a single sperm into an egg",
      "Clinical diagram of ICSI within an IVF pathway from retrieval to embryo culture",
      "ICSI recovery pathway showing post-retrieval care and embryo-report follow-up",
    ],
  },
  {
    procedure: "IUI Treatment",
    shortName: "IUI treatment",
    specialist: "fertility specialist experienced in ovulation tracking and intrauterine insemination",
    definition:
      "IUI treatment places washed, prepared sperm directly into the uterine cavity around ovulation to improve the chance that sperm reach the egg without laboratory fertilisation outside the body.",
    candidacy:
      "It may be considered for unexplained infertility, mild male-factor infertility, cervical-factor issues, or donor-sperm conception when tubes are open and ovarian response can be monitored.",
    limits:
      "IUI is not a substitute for IVF when tubes are blocked, sperm are severely impaired, or several well-conducted IUI cycles have already failed. Success depends on accurate ovulation timing.",
    evaluation:
      "Confirm tubal patency, semen parameters suitable for preparation, ovulation pattern and infectious-disease screening before a timed insemination.",
    technique:
      "Ovulation is tracked naturally or with oral or injectable medicines; a prepared sperm sample is placed into the uterus with a soft catheter in an outpatient procedure.",
    approaches: [
      { label: "Natural-cycle IUI", detail: "Timed to spontaneous ovulation when ovarian reserve and cycles are regular." },
      { label: "Oral ovulation-induction IUI", detail: "Uses oral agents with monitoring when anovulation or timing support is needed." },
      { label: "Injectable stimulation IUI", detail: "Uses gonadotropins with closer monitoring and a higher multiple-pregnancy counselling need." },
    ],
    duration: "usually several monitoring visits over 1–2 weeks with a brief outpatient insemination",
    admission: "Outpatient; no hospital night is typical.",
    recovery:
      "Brief rest after insemination is common. Flying the same day is often possible after uncomplicated IUI, but follow the clinic's advice when stimulation medicines were used.",
    risks:
      "Risks include multiple pregnancy with stimulation, ovarian hyperstimulation with injectables, infection, spotting and cycle cancellation when follicle response is inadequate or excessive.",
    urgent: "severe pelvic pain, rapid abdominal swelling, heavy bleeding, fever, or fainting during a stimulated cycle",
    drivers: [
      { label: "Natural versus stimulated cycle", detail: "Injectable medicines raise monitoring and pharmacy cost." },
      { label: "Number of IUI attempts in the quote", detail: "Packages of three differ from a single cycle." },
      { label: "Sperm preparation source", detail: "Partner versus donor sperm changes screening and fees." },
      { label: "Monitoring intensity", detail: "Ultrasound and hormone visits accumulate." },
      { label: "Trigger medication", detail: "hCG or other triggers may be separate." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "HSG or tubal assessment",
      "Semen analysis",
      "Menstrual and ovulation history",
    ],
    followUp: "Pregnancy testing is timed after insemination; unsuccessful cycles need review of stimulation, timing and whether to continue IUI or move to IVF.",
    quoteQuestions: [
      "How many IUI attempts are included?",
      "Are stimulation medicines and monitoring included?",
      "Is donor sperm screening and purchase separate?",
    ],
    related: ["Ovulation Induction", "Ovarian Stimulation", "IVF Treatment"],
    imageAlts: [
      "Medical illustration of intrauterine insemination placing prepared sperm into the uterine cavity",
      "Clinical diagram of IUI timing with follicle monitoring and insemination day",
      "IUI follow-up pathway showing luteal phase and pregnancy-test timing",
    ],
  },
  {
    procedure: "IMSI Treatment",
    shortName: "IMSI treatment",
    specialist: "fertility specialist with an embryology laboratory offering high-magnification sperm selection",
    definition:
      "IMSI treatment selects sperm under ultra-high magnification before ICSI so the embryologist can avoid sperm with certain visible morphological defects when that laboratory technique is available and indicated.",
    candidacy:
      "It may be discussed after repeated ICSI failure, severe teratozoospermia, or high DNA-fragmentation contexts when the laboratory offers IMSI and counsels that evidence of benefit is selective rather than universal.",
    limits:
      "IMSI is an advanced sperm-selection tool, not a guarantee of fertilisation or pregnancy. Many successful ICSI cycles do not require IMSI; availability varies by laboratory.",
    evaluation:
      "Review ICSI history, sperm morphology and DNA studies where performed, and confirm the laboratory can perform high-magnification selection on the planned retrieval day.",
    technique:
      "Sperm are examined at high magnification; selected sperm are then injected into mature eggs using the ICSI technique, followed by standard embryo culture.",
    approaches: [
      { label: "IMSI with ejaculated sperm", detail: "High-magnification selection from a prepared ejaculated sample." },
      { label: "IMSI with surgically retrieved sperm", detail: "Used only when enough sperm can be visualised after surgical retrieval." },
      { label: "Standard ICSI alternative", detail: "Discussed when IMSI is unavailable or unlikely to change decisions." },
    ],
    duration: "adds laboratory time on retrieval day within a standard IVF stimulation cycle of about 2–3 weeks",
    admission: "Day-care retrieval as for IVF/ICSI.",
    recovery:
      "Recovery matches ICSI/IVF retrieval pathways.",
    risks:
      "Risks mirror ICSI, including egg damage, fertilisation failure and OHSS; IMSI itself mainly adds laboratory time and cost rather than a separate surgical risk.",
    urgent: "rapid abdominal swelling, severe pelvic pain, heavy bleeding, fever, or shortness of breath after retrieval",
    drivers: [
      { label: "Base IVF and ICSI fees", detail: "IMSI is typically layered on ICSI." },
      { label: "Laboratory IMSI surcharge", detail: "High-magnification systems are priced separately." },
      { label: "Sperm source", detail: "Surgical retrieval remains a separate episode." },
      { label: "Embryo culture plan", detail: "Blastocyst or freeze-all pathways change totals." },
      { label: "Repeat-cycle history complexity", detail: "Prior failure work-up can add tests." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Prior ICSI embryology reports",
      "Sperm morphology or DNA studies",
      "Andrology notes",
    ],
    followUp: "Review whether IMSI changed fertilisation or embryo yield before pricing another identical cycle.",
    quoteQuestions: [
      "Is IMSI available on the planned retrieval date?",
      "Is the IMSI fee fixed per cycle?",
      "What fertilisation results would lead you back to standard ICSI?",
    ],
    related: ["ICSI Treatment", "IVF Treatment", "PGT-A Testing"],
    imageAlts: [
      "Medical illustration of high-magnification sperm selection before ICSI injection",
      "Clinical diagram comparing standard ICSI and IMSI sperm-selection pathways",
      "IMSI cycle recovery pathway matching IVF retrieval follow-up",
    ],
  },
  {
    procedure: "Frozen Embryo Transfer (FET)",
    shortName: "frozen embryo transfer",
    specialist: "fertility specialist managing endometrial preparation and embryo thaw",
    definition:
      "Frozen embryo transfer warms a previously cryopreserved embryo and places it into a prepared uterine cavity in a cycle separate from ovarian stimulation and egg retrieval.",
    candidacy:
      "It may be considered when suitable frozen embryos exist after a prior IVF cycle, freeze-all for OHSS risk, PGT, or deferred transfer for medical or logistical reasons.",
    limits:
      "FET cannot create new embryos. Thin endometrium, uncorrected uterine cavity lesions, or embryos that do not survive thaw may cancel or defer the transfer.",
    evaluation:
      "Confirm embryo inventory and storage consent, uterine cavity normality, and whether a natural or programmed endometrial preparation is planned.",
    technique:
      "The endometrium is prepared with monitoring; the embryo is thawed and transferred with a catheter under ultrasound guidance when lining and timing criteria are met.",
    approaches: [
      { label: "Natural-cycle FET", detail: "Timed to spontaneous ovulation when cycles are regular." },
      { label: "Programmed hormone-replacement FET", detail: "Uses estrogen and progesterone to prepare the lining." },
      { label: "Modified natural FET", detail: "Adds a trigger or luteal support while still tracking a dominant follicle." },
    ],
    duration: "often about 2–4 weeks of endometrial preparation with a brief outpatient transfer visit",
    admission: "Outpatient transfer; overnight stay is not typical.",
    recovery:
      "Light activity limits are common for a short period. Flying after uncomplicated FET is often possible within a day or two, but luteal medicines and pregnancy-test timing must travel with the patient.",
    risks:
      "Risks include cycle cancellation, embryo non-survival after thaw, implantation failure, ectopic pregnancy and medication side effects from endometrial preparation.",
    urgent: "heavy bleeding, severe one-sided pelvic pain, fainting, or signs of allergic reaction to medicines",
    drivers: [
      { label: "Endometrial preparation protocol", detail: "Medication type and duration change pharmacy cost." },
      { label: "Number of embryos thawed or transferred", detail: "Additional thaws may be billed." },
      { label: "Embryo storage fees to date", detail: "Annual cryostorage is often separate." },
      { label: "Monitoring visits", detail: "Scans and hormone tests accumulate." },
      { label: "Assisted hatching or glue add-ons", detail: "Only if expressly written." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Embryo cryostorage inventory",
      "Prior IVF stimulation summary",
      "Uterine cavity assessment",
    ],
    followUp: "Luteal support continues until pregnancy testing and early pregnancy scan arrangements are clear with the home team.",
    quoteQuestions: [
      "How many embryos will be thawed in one fee?",
      "Are endometrial medicines included?",
      "What is the annual storage fee if transfer is deferred?",
    ],
    related: ["Blastocyst Transfer", "Embryo Freezing", "IVF Treatment"],
    imageAlts: [
      "Medical illustration of a thawed embryo being transferred into a prepared uterus",
      "Clinical diagram of frozen embryo transfer preparation with lining checks and transfer day",
      "FET follow-up pathway showing luteal support and pregnancy testing",
    ],
  },
  {
    procedure: "Blastocyst Transfer",
    shortName: "blastocyst transfer",
    specialist: "fertility specialist with extended embryo-culture laboratory capability",
    definition:
      "Blastocyst transfer places an embryo that has grown to day 5–6 blastocyst stage into the uterus, either in a fresh cycle after culture or as a frozen blastocyst in an FET cycle.",
    candidacy:
      "It may be considered when laboratory culture systems support extended culture and the clinical plan prefers blastocyst-stage selection or single-embryo transfer strategies.",
    limits:
      "Not every fertilised egg reaches blastocyst. Extended culture can result in no transfer if embryos arrest; that outcome is a laboratory finding, not a billing upgrade.",
    evaluation:
      "Confirm fertilisation method, number of embryos available for culture, uterine readiness and whether the transfer is fresh or frozen.",
    technique:
      "Embryos are cultured to blastocyst; a selected blastocyst is transferred with catheter guidance, or surplus blastocysts are cryopreserved when appropriate.",
    approaches: [
      { label: "Fresh blastocyst transfer", detail: "Transfer in the same cycle after retrieval when hormone and lining conditions allow." },
      { label: "Frozen blastocyst transfer", detail: "Thaw and transfer in a later FET cycle." },
      { label: "Elective single blastocyst transfer", detail: "Preferred when a good-quality blastocyst allows lower twin risk." },
    ],
    duration: "embryo culture extends 5–6 days after retrieval; FET blastocyst transfer follows endometrial preparation timing",
    admission: "Outpatient transfer; retrieval day-care applies only in fresh cycles.",
    recovery:
      "After transfer, light activity guidance and luteal support dominate. Travel advice depends on whether retrieval occurred in the same trip.",
    risks:
      "Risks include no blastocyst forming, failed implantation, ectopic pregnancy and multiple pregnancy if more than one blastocyst is transferred.",
    urgent: "heavy bleeding, severe pelvic pain, fainting, or rapidly worsening OHSS symptoms after a fresh cycle",
    drivers: [
      { label: "Extended culture laboratory fees", detail: "Day-5 culture may be priced above cleavage culture." },
      { label: "Fresh versus frozen pathway", detail: "FET adds a separate episode." },
      { label: "Number of blastocysts transferred", detail: "Single versus double transfer counselling changes risk and sometimes price." },
      { label: "Time-lapse or grading systems", detail: "May appear as extras." },
      { label: "PGT on blastocysts", detail: "Biopsy and testing are separate." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Embryology culture policy",
      "Prior embryo-stage outcomes",
      "Uterine lining assessment",
    ],
    followUp: "Confirm whether surplus blastocysts were frozen, storage consent and pregnancy-test timing.",
    quoteQuestions: [
      "Is blastocyst culture included in the IVF fee?",
      "What is billed if no blastocyst forms?",
      "Is single-embryo transfer the default plan?",
    ],
    related: ["Frozen Embryo Transfer (FET)", "IVF Treatment", "Embryo Freezing"],
    imageAlts: [
      "Medical illustration of a day-5 blastocyst ready for uterine transfer",
      "Clinical diagram of extended embryo culture from fertilisation to blastocyst transfer",
      "Blastocyst transfer recovery pathway with luteal support and testing",
    ],
  },
  {
    procedure: "Donor Egg IVF",
    shortName: "donor egg IVF",
    specialist: "fertility specialist experienced in donor-egg programmes and applicable legal pathways",
    definition:
      "Donor egg IVF uses eggs from a screened donor, fertilises them with designated sperm in the laboratory and transfers resulting embryos to the intended parent’s uterus when legally and medically appropriate.",
    candidacy:
      "It may be considered for diminished ovarian reserve, premature ovarian insufficiency, repeated poor egg or embryo quality, certain genetic indications, or age-related egg-factor infertility when counselling supports donor eggs.",
    limits:
      "Donor availability, identity rules, compensation rules and clinic licensing vary and can block travel plans. Donor-egg IVF does not treat unrepaired uterine factors that prevent implantation.",
    evaluation:
      "Confirm indication, recipient uterine evaluation, infectious and genetic screening pathways, legal consents and whether fresh or frozen donor eggs are proposed.",
    technique:
      "Donor stimulation and retrieval are coordinated with recipient endometrial preparation; fertilisation, culture and transfer or freeze follow the named laboratory plan.",
    approaches: [
      { label: "Fresh donor-egg cycle", detail: "Synchronises donor retrieval with recipient lining when logistics allow." },
      { label: "Frozen donor-egg bank pathway", detail: "Uses vitrified donor oocytes thawed for ICSI." },
      { label: "Donor-egg freeze-all then FET", detail: "Creates embryos for later transfer when fresh transfer is deferred." },
    ],
    duration: "recipient preparation often spans 2–6 weeks depending on synchronization and whether frozen eggs are used",
    admission: "Recipient transfer is outpatient; donor retrieval occurs on the donor’s pathway and is not the travelling patient’s surgery.",
    recovery:
      "Recipient recovery mirrors embryo transfer. Legal documents and embryo storage consents must be complete before travel home.",
    risks:
      "Risks include cycle cancellation, failed fertilisation, unsuccessful implantation, multiple pregnancy and the emotional and legal complexities of third-party reproduction.",
    urgent: "heavy bleeding, severe pelvic pain, fainting after transfer, or acute medication reactions",
    drivers: [
      { label: "Donor compensation and agency fees", detail: "Often the largest third-party line item." },
      { label: "Fresh versus frozen donor eggs", detail: "Bank fees differ from fresh-cycle coordination." },
      { label: "ICSI and culture fees", detail: "Usually required for thawed eggs." },
      { label: "Legal and counselling sessions", detail: "Mandatory steps may be billed separately." },
      { label: "Number of guaranteed mature eggs or blasts", detail: "Contract language must be read line by line." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Ovarian reserve history",
      "Uterine cavity assessment",
      "Prior failed autologous IVF summaries",
    ],
    followUp: "Clarify parental legal documentation, embryo disposition wishes and obstetric handover for donor-egg pregnancies.",
    quoteQuestions: [
      "What exactly is guaranteed in the donor contract?",
      "Are legal clearances included?",
      "How many eggs or blastocysts are included before extras apply?",
    ],
    related: ["IVF Treatment", "Donor Sperm IVF", "Frozen Embryo Transfer (FET)"],
    imageAlts: [
      "Educational diagram of donor-egg IVF showing donor egg, laboratory fertilisation and recipient embryo transfer",
      "Clinical pathway diagram for recipient endometrial preparation in a donor-egg cycle",
      "Donor-egg IVF follow-up pathway with luteal support and legal document checklist",
    ],
  },
  {
    procedure: "Donor Sperm IVF",
    shortName: "donor sperm IVF",
    specialist: "fertility specialist coordinating licensed donor-sperm use inside an IVF cycle",
    definition:
      "Donor sperm IVF fertilises the intended parent’s eggs—or donor eggs when that is the named plan—with screened donor sperm in the laboratory as part of an IVF or ICSI cycle.",
    candidacy:
      "It may be considered for azoospermia when surgical retrieval is unsuccessful or declined, severe male-factor infertility, certain genetic indications, or when a single intended parent requires donor sperm for IVF.",
    limits:
      "Clinic and national rules govern donor identity, quarantine and import. Donor sperm IVF does not bypass the need for adequate eggs and a receptive uterus.",
    evaluation:
      "Confirm indication, preferred donor-bank pathway, infectious and genetic screening standards, and whether IUI with donor sperm was considered as a simpler alternative.",
    technique:
      "Eggs are retrieved after stimulation; donor sperm are thawed and used for conventional IVF or ICSI; embryos are cultured for transfer or cryopreservation.",
    approaches: [
      { label: "IVF/ICSI with donor sperm and own eggs", detail: "Standard when ovarian reserve supports autologous eggs." },
      { label: "Donor sperm with donor eggs", detail: "Double-donor pathway only when both are medically and legally indicated." },
      { label: "Donor-sperm IUI alternative", detail: "Discussed when tubes are open and IVF is not yet required." },
    ],
    duration: "matches a standard IVF stimulation cycle of about 2–3 weeks once donor sperm are available on site",
    admission: "Day-care egg retrieval; transfer outpatient.",
    recovery:
      "Same as autologous IVF regarding retrieval and transfer recovery; ensure donor paperwork travels with the records.",
    risks:
      "Risks include IVF/ICSI procedural risks plus cycle cancellation if donor samples are unavailable, and the counselling load of third-party gametes.",
    urgent: "rapid abdominal swelling, severe pelvic pain, heavy bleeding, fever, or shortness of breath after retrieval",
    drivers: [
      { label: "Donor sperm purchase and shipping", detail: "Bank and courier fees are often separate." },
      { label: "IVF versus ICSI laboratory plan", detail: "Injection fees may apply." },
      { label: "Stimulation medicines", detail: "Autologous egg pathways still need gonadotropins." },
      { label: "Embryo freezing", detail: "Surplus embryo storage is extra." },
      { label: "Legal and counselling fees", detail: "May be mandatory and separate." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Andrology diagnosis",
      "Donor preference and prior IUI history",
      "Ovarian reserve tests",
    ],
    followUp: "Document donor identifiers allowed by law, embryo storage and obstetric follow-up plans.",
    quoteQuestions: [
      "Is donor sperm in stock locally or imported?",
      "Are quarantine and screening fees included?",
      "Is ICSI assumed with thawed donor sperm?",
    ],
    related: ["Donor Egg IVF", "IVF Treatment", "IUI Treatment"],
    imageAlts: [
      "Educational illustration of IVF using screened donor sperm with autologous eggs",
      "Clinical pathway diagram of donor-sperm IVF from stimulation to embryo transfer",
      "Donor-sperm IVF recovery and paperwork follow-up pathway",
    ],
  },
  {
    procedure: "Ovulation Induction",
    shortName: "ovulation induction",
    specialist: "fertility specialist experienced in anovulation and cycle monitoring",
    definition:
      "Ovulation induction uses oral or injectable medicines to prompt release of one or more eggs in people who do not ovulate regularly, with ultrasound and hormone monitoring to reduce multiple-pregnancy risk.",
    candidacy:
      "It may be considered for anovulatory infertility such as PCOS-related cycles when lifestyle measures are insufficient and tubes and sperm parameters support timed intercourse or IUI.",
    limits:
      "Induction is not appropriate as a stand-alone plan when tubes are blocked or sperm are severely abnormal. Over-response can force cancellation to avoid high-order multiples.",
    evaluation:
      "Assess ovulation history, BMI, glucose metabolism where relevant, semen analysis, tubal status and baseline ultrasound before prescribing stimulation.",
    technique:
      "Medicines are started early in the cycle; follicles are monitored; a trigger may be used; intercourse or IUI is timed to ovulation.",
    approaches: [
      { label: "Oral agent induction", detail: "Often first line in selected anovulatory patients." },
      { label: "Low-dose injectable induction", detail: "Used when oral agents fail, with careful monitoring." },
      { label: "Induction combined with IUI", detail: "Adds sperm preparation when timed intercourse is insufficient." },
    ],
    duration: "typically 1–3 weeks of medicines and monitoring per attempt",
    admission: "Outpatient monitoring; no routine hospital stay.",
    recovery:
      "Daily life usually continues. Travel is often flexible, but monitoring appointments are time-critical and should not be skipped for tourism.",
    risks:
      "Risks include multiple pregnancy, ovarian hyperstimulation with injectables, cyst formation and cycle cancellation for over- or under-response.",
    urgent: "severe pelvic pain, rapid abdominal distension, vomiting, shortness of breath, or dizziness during stimulation",
    drivers: [
      { label: "Oral versus injectable medicines", detail: "Gonadotropins cost more than oral agents." },
      { label: "Number of monitoring visits", detail: "Extra scans raise fees." },
      { label: "Conversion to IUI", detail: "Sperm preparation is separate." },
      { label: "Trigger medication", detail: "May be billed apart from the monitoring package." },
      { label: "Repeated cancelled cycles", detail: "Medicine waste policies vary." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Menstrual and ovulation history",
      "Semen analysis",
      "Tubal assessment",
    ],
    followUp: "Review follicle response and whether to continue induction, add IUI or escalate to IVF.",
    quoteQuestions: [
      "Which medicine protocol is assumed?",
      "How many scans are included?",
      "What is billed if the cycle is cancelled for over-response?",
    ],
    related: ["Ovarian Stimulation", "IUI Treatment", "IVF Treatment"],
    imageAlts: [
      "Medical illustration of ovulation induction with follicle growth and egg release",
      "Clinical diagram of monitored ovulation induction across a cycle",
      "Ovulation induction follow-up pathway with timing of intercourse or IUI",
    ],
  },
  {
    procedure: "Ovarian Stimulation",
    shortName: "ovarian stimulation",
    specialist: "fertility specialist supervising gonadotropin stimulation for assisted reproduction",
    definition:
      "Ovarian stimulation uses injectable gonadotropins and related medicines to mature multiple follicles for IVF, egg freezing or certain advanced fertility pathways under close ultrasound and hormone monitoring.",
    candidacy:
      "It may be considered when a planned IVF, ICSI or fertility-preservation cycle requires multi-follicular development and the patient accepts monitoring intensity and OHSS counselling.",
    limits:
      "Stimulation alone is not a complete IVF cycle. Poor reserve, uncontrolled illness, or inability to attend monitoring may make stimulation unsafe or futile.",
    evaluation:
      "Baseline hormones, antral follicle count, medical fitness, and protocol selection (antagonist, agonist or other) precede the first injection.",
    technique:
      "Daily or near-daily injections continue with serial monitoring; a trigger shot times final maturation before retrieval or before a freeze-only egg collection.",
    approaches: [
      { label: "Antagonist stimulation protocol", detail: "Common IVF protocol with flexible timing." },
      { label: "Agonist protocol", detail: "Selected based on diagnosis and clinic practice." },
      { label: "Mild or minimal stimulation", detail: "Uses lower doses when clinically appropriate." },
    ],
    duration: "usually about 8–14 days of injections plus monitoring before trigger",
    admission: "Outpatient injections and scans; hospital contact rises if OHSS develops.",
    recovery:
      "Bloating is common. Travel during late stimulation is discouraged because trigger and retrieval timing are fixed; after retrieval, OHSS watch continues.",
    risks:
      "Risks include OHSS, cycle cancellation, infection at injection sites, accidental early ovulation and emotional strain from daily monitoring.",
    urgent: "rapid weight gain, severe bloating, shortness of breath, decreased urine, vomiting, or faintness during or after stimulation",
    drivers: [
      { label: "Gonadotropin brand and total dose", detail: "Pharmacy cost scales with ampoules used." },
      { label: "Protocol type and add-on medicines", detail: "Agonist, antagonist and LH additives differ." },
      { label: "Monitoring frequency", detail: "Urban traffic can force extra local stay nights." },
      { label: "Trigger type", detail: "Dual trigger or special triggers may cost more." },
      { label: "Conversion to freeze-all", detail: "Changes subsequent FET budgeting." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "AMH and AFC",
      "Prior stimulation charts",
      "BMI and medical clearance notes",
    ],
    followUp: "Document total dose used, response category and whether the next cycle should modify protocol.",
    quoteQuestions: [
      "Is medication included or retail pharmacy?",
      "What OHSS prevention steps are planned?",
      "How are unused medicines handled?",
    ],
    related: ["IVF Treatment", "Egg Freezing", "Ovulation Induction"],
    imageAlts: [
      "Medical illustration of multi-follicular ovarian stimulation for IVF",
      "Clinical diagram of stimulation monitoring with ultrasound and hormone checks",
      "Ovarian stimulation recovery pathway including OHSS warning signs",
    ],
  },
  {
    procedure: "Egg Freezing",
    shortName: "egg freezing",
    specialist: "fertility specialist offering oocyte cryopreservation",
    definition:
      "Egg freezing stimulates the ovaries, retrieves mature eggs and vitrifies them for potential future fertilisation when the patient is not ready or able to conceive immediately.",
    candidacy:
      "It may be considered for planned fertility delay, before gonadotoxic treatment, or selected medical conditions that threaten ovarian reserve, after counselling about age-related success limits.",
    limits:
      "Freezing eggs does not guarantee future live birth. Egg quantity and age at freezing strongly influence later options; annual storage fees continue until disposition.",
    evaluation:
      "Ovarian reserve testing, infectious screening, medical fitness for stimulation and retrieval, and written consent covering storage duration and disposition are required.",
    technique:
      "Stimulation and retrieval resemble IVF; mature eggs are vitrified without fertilisation unless a combined plan says otherwise.",
    approaches: [
      { label: "Elective oocyte cryopreservation", detail: "For deferred reproduction after counselling." },
      { label: "Medical fertility-preservation freezing", detail: "Before chemotherapy, radiotherapy or surgery that threatens fertility." },
      { label: "Random-start or duostim protocols", detail: "Used when time to treatment is short." },
    ],
    duration: "about 2 weeks of stimulation and monitoring before retrieval in most cycles",
    admission: "Day-care retrieval under sedation.",
    recovery:
      "Cramping and bloating settle over days. Flying after uncomplicated retrieval often follows the same OHSS-aware guidance as IVF.",
    risks:
      "Risks include OHSS, bleeding or infection after retrieval, few eggs retrieved, egg survival loss at thaw in the future and storage-consent disputes if disposition wishes change.",
    urgent: "rapid abdominal swelling, severe pain, heavy bleeding, fever, or shortness of breath after retrieval",
    drivers: [
      { label: "Stimulation medicines", detail: "Major variable cost." },
      { label: "Number of eggs frozen", detail: "Some quotes tier laboratory fees by egg count." },
      { label: "Annual storage fees", detail: "Recurring until thaw or discard." },
      { label: "Anaesthesia and facility fees", detail: "For retrieval day." },
      { label: "Later ICSI thaw cycle", detail: "Future fertilisation is a separate episode." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "AMH and AFC",
      "Medical indication notes if oncology-related",
      "Consent and storage preferences",
    ],
    followUp: "Receive an egg-count report, storage contract and instructions for future thaw logistics with a fertility clinic at home or abroad.",
    quoteQuestions: [
      "How many eggs are assumed in the base price?",
      "What is the annual storage fee?",
      "Are future thaw and ICSI priced now or later?",
    ],
    related: ["Fertility Preservation", "Embryo Freezing", "Ovarian Stimulation"],
    imageAlts: [
      "Medical illustration of mature eggs being vitrified for cryopreservation",
      "Clinical diagram of an egg-freezing cycle from stimulation to retrieval and storage",
      "Egg-freezing recovery pathway with OHSS watch and storage paperwork",
    ],
  },
  {
    procedure: "Embryo Freezing",
    shortName: "embryo freezing",
    specialist: "fertility specialist and embryology laboratory offering embryo vitrification",
    definition:
      "Embryo freezing cryopreserves surplus or deferred embryos after IVF or ICSI so they can be thawed for a future frozen embryo transfer.",
    candidacy:
      "It may be considered when good-quality embryos remain after transfer, when a freeze-all strategy is chosen for OHSS or endometrial reasons, or when PGT results are pending.",
    limits:
      "Not all embryos survive thaw. Freezing does not improve an embryo that already has poor developmental potential.",
    evaluation:
      "Confirm fertilisation method, embryo stage at freezing, consent for storage duration and disposition, and infectious-disease testing requirements.",
    technique:
      "Embryos are vitrified at cleavage or blastocyst stage and stored in labelled cryodevices under laboratory chain-of-custody procedures.",
    approaches: [
      { label: "Freeze-all of the entire cohort", detail: "No fresh transfer in the stimulation cycle." },
      { label: "Surplus embryo freezing after fresh transfer", detail: "Cryopreserves remaining embryos." },
      { label: "Freezing after PGT biopsy", detail: "Stores embryos while genetic results return." },
    ],
    duration: "laboratory freezing occurs within days after retrieval; storage then continues by contract",
    admission: "No separate admission for freezing itself; retrieval admission follows the IVF pathway.",
    recovery:
      "Physical recovery is from retrieval or biopsy, not from freezing. Administrative recovery includes storage contracts and future FET planning.",
    risks:
      "Risks include embryo loss at thaw, labelling or shipping risks if transferred between laboratories, and ongoing storage fees.",
    urgent: "OHSS or retrieval complications as for IVF; freezing itself is laboratory work",
    drivers: [
      { label: "Number of embryos frozen", detail: "Per-embryo laboratory fees are common." },
      { label: "Stage at freezing", detail: "Blastocyst culture may add cost before freeze." },
      { label: "Annual storage", detail: "Recurring fee structure must be explicit." },
      { label: "PGT workflow", detail: "Biopsy plus freezing differs from freeze-only." },
      { label: "Inter-lab transport", detail: "Courier and acceptance fees if moving embryos." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Embryology report",
      "Storage consent",
      "Prior IVF cycle summary",
    ],
    followUp: "Keep storage invoices, embryo inventory and a plan for FET or disposition decisions.",
    quoteQuestions: [
      "Is freezing priced per embryo or per cohort?",
      "What is year-one versus renewal storage?",
      "Who pays if embryos are shipped later?",
    ],
    related: ["Frozen Embryo Transfer (FET)", "Egg Freezing", "Embryo Biopsy"],
    imageAlts: [
      "Medical illustration of embryos being placed into cryodevices for vitrification",
      "Clinical diagram of freeze-all versus surplus-embryo freezing pathways",
      "Embryo freezing follow-up pathway with storage contract and future FET planning",
    ],
  },
  {
    procedure: "Fertility Preservation",
    shortName: "fertility preservation",
    specialist: "fertility specialist coordinating preservation before gonadotoxic or fertility-threatening care",
    definition:
      "Fertility preservation plans and performs egg, embryo or, where available and appropriate, tissue cryopreservation before cancer therapy, gender-affirming treatment, or surgery that may reduce future fertility.",
    candidacy:
      "It may be considered when planned treatment threatens ovarian or testicular function and delay for preservation is oncologically or medically acceptable after multidisciplinary discussion.",
    limits:
      "Urgency of cancer care can limit stimulation options. Sperm banking, egg freezing and embryo freezing are different products; ovarian-tissue pathways are not universally available.",
    evaluation:
      "Urgent ovarian reserve assessment, oncology or surgical timeline, partner or donor gamete decisions, and infectious screening compressed into a short window.",
    technique:
      "Random-start stimulation for egg or embryo freezing, semen cryopreservation for male patients, or referral for tissue preservation when offered in specialist centres.",
    approaches: [
      { label: "Oocyte cryopreservation before therapy", detail: "Stimulation and egg freezing on a compressed timeline." },
      { label: "Embryo cryopreservation", detail: "When fertilisation with designated sperm is chosen." },
      { label: "Sperm cryopreservation", detail: "For male patients before gonadotoxic therapy." },
    ],
    duration: "often days to about two weeks depending on method and oncology clearance to delay",
    admission: "Day-care for egg retrieval; sperm banking is outpatient.",
    recovery:
      "Must align with the start date of chemotherapy, radiotherapy or surgery; fitness-to-fly decisions include both fertility and oncology teams.",
    risks:
      "Risks include treatment delay debates, OHSS, incomplete preservation if time is short, and emotional pressure under cancer timelines.",
    urgent: "oncology red flags take priority; also OHSS or retrieval complications when stimulation proceeded",
    drivers: [
      { label: "Method chosen", detail: "Eggs, embryos and sperm banking price differently." },
      { label: "Stimulation urgency protocols", detail: "Random-start may change medicine use." },
      { label: "Storage duration expectations", detail: "Long oncology pathways need clear renewal terms." },
      { label: "Multidisciplinary visits", detail: "Oncology and fertility consults may both bill." },
      { label: "Later warming cycle", detail: "Future use is a separate episode." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Oncology or surgical plan with dates",
      "Hormone panel",
      "Partner consent if embryo freezing",
    ],
    followUp: "Hand oncology and fertility teams a shared timeline, storage contract and contacts for future warming.",
    quoteQuestions: [
      "How many days of delay does preservation need?",
      "Which preservation method is realistic in that window?",
      "Are storage fees waived or reduced for medical preservation?",
    ],
    related: ["Egg Freezing", "Embryo Freezing", "Ovarian Stimulation"],
    imageAlts: [
      "Educational illustration of fertility preservation options before gonadotoxic therapy",
      "Clinical timeline diagram coordinating oncology treatment and fertility preservation",
      "Fertility preservation follow-up pathway with storage and later warming planning",
    ],
  },
  {
    procedure: "PGT-A Testing",
    shortName: "PGT-A testing",
    specialist: "fertility specialist working with a genetics laboratory for aneuploidy screening",
    definition:
      "PGT-A testing analyses embryo biopsy samples for chromosome aneuploidy so that transfer decisions can prioritise embryos with a higher chance of being chromosomally suitable, when counselling supports its use.",
    candidacy:
      "It may be discussed for advanced maternal age, repeated miscarriage, repeated implantation failure, or patient preference after counselling that PGT-A does not create healthier eggs and is not mandatory for every IVF cycle.",
    limits:
      "PGT-A is screening, not a prenatal diagnostic guarantee. Mosaicism reporting, false calls and embryos without results can complicate decisions. Legal and ethical frameworks vary.",
    evaluation:
      "Confirm IVF cohort size, biopsy laboratory capability, genetics partner turnaround time and whether freeze-all is required while awaiting results.",
    technique:
      "Trophectoderm cells are biopsied from blastocysts; samples are shipped or processed for chromosomal analysis; embryos remain frozen until reporting and transfer planning.",
    approaches: [
      { label: "PGT-A with freeze-all", detail: "Standard when results return after several days." },
      { label: "Targeted testing after prior aneuploidy history", detail: "Counselling-led use rather than universal add-on." },
      { label: "No-PGT alternative", detail: "Morphology-based selection when testing is declined or unsuitable." },
    ],
    duration: "biopsy on blastocyst day; genetic results often take several days to over a week depending on the laboratory",
    admission: "No separate hospital stay beyond the IVF retrieval pathway.",
    recovery:
      "Physical recovery follows IVF. Emotional recovery includes waiting for genetic reports and counselling on mosaic results.",
    risks:
      "Risks include biopsy-related embryo harm (uncommon in experienced labs), inconclusive results, discarding potentially viable mosaic embryos and cost without guaranteed live birth improvement in every group.",
    urgent: "retrieval or OHSS emergencies as for IVF; genetic results themselves are not acute medical emergencies",
    drivers: [
      { label: "Per-embryo testing fees", detail: "Cost scales with biopsied embryo count." },
      { label: "Biopsy laboratory charges", detail: "Separate from genetic analysis in some quotes." },
      { label: "Shipping and courier", detail: "When genetics is off-site." },
      { label: "Freeze-all FET pathway", detail: "Adds a later transfer episode." },
      { label: "Counselling visits", detail: "May be required and billed." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "IVF embryology reports",
      "Miscarriage or RIF history",
      "Genetic counselling notes",
    ],
    followUp: "Review the written genetics report with the fertility specialist before any thaw decision.",
    quoteQuestions: [
      "Is pricing per embryo or per cohort?",
      "How are mosaic results counselled?",
      "What is the result turnaround time?",
    ],
    related: ["Embryo Biopsy", "PGT-M / PGD Testing", "Frozen Embryo Transfer (FET)"],
    imageAlts: [
      "Medical illustration of blastocyst trophectoderm biopsy for PGT-A",
      "Clinical diagram of PGT-A workflow from biopsy to genetics report to FET",
      "PGT-A follow-up pathway showing report review and transfer planning",
    ],
  },
  {
    procedure: "PGT-M / PGD Testing",
    shortName: "PGT-M / PGD testing",
    specialist: "fertility specialist and genetics team for monogenic preimplantation testing",
    definition:
      "PGT-M, historically called PGD, tests embryos for a specific inherited monogenic disorder so that transfer can prioritise embryos that do not carry the targeted disease genotype when a known familial mutation is present.",
    candidacy:
      "It may be considered when both partners—or one relevant partner—carry a known pathogenic variant and want to reduce transmission risk through IVF with targeted embryo testing.",
    limits:
      "PGT-M requires a work-up probe or primer design that can take weeks. It does not screen for all genetic diseases unless combined with broader panels, and prenatal testing discussions still apply.",
    evaluation:
      "Genetic counselling, confirmation of the familial variant, laboratory probe development and an IVF plan that yields enough blastocysts for testing.",
    technique:
      "After IVF and biopsy, embryo samples undergo targeted genotyping; unaffected or appropriate embryos are selected for FET according to counselling and legal frameworks.",
    approaches: [
      { label: "PGT-M for a single known disorder", detail: "Most common targeted pathway." },
      { label: "PGT-M combined with PGT-A", detail: "When both aneuploidy screening and monogenic testing are planned and feasible." },
      { label: "Prenatal-testing alternative without IVF", detail: "Discussed when patients decline IVF-based testing." },
    ],
    duration: "probe work-up may add weeks before stimulation; biopsy results timing depends on the genetics laboratory",
    admission: "No extra admission beyond IVF retrieval.",
    recovery:
      "Same physical recovery as IVF; allow time for genetics counselling appointments while awaiting results.",
    risks:
      "Risks include no unaffected embryo available, allele dropout or inconclusive calls, IVF procedural risks and residual uncertainty addressed with prenatal diagnosis options.",
    urgent: "IVF retrieval emergencies; genetic results are managed in scheduled counselling",
    drivers: [
      { label: "Probe or work-up development fee", detail: "Often billed before the IVF cycle." },
      { label: "Per-embryo analysis", detail: "Scales with biopsied embryos." },
      { label: "Combined PGT-A charges", detail: "If both tests run." },
      { label: "Genetic counselling sessions", detail: "Usually required." },
      { label: "IVF cycle yielding few blasts", detail: "May force repeat stimulation." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Genetic test reports for the familial variant",
      "Counselling summary",
      "Pedigree information",
    ],
    followUp: "Store the genetics report, embryo statuses and prenatal-testing plan for any resulting pregnancy.",
    quoteQuestions: [
      "How long does probe design take before stimulation can start?",
      "Is work-up refundable if IVF is cancelled?",
      "Will PGT-A be run on the same biopsy?",
    ],
    related: ["PGT-A Testing", "Embryo Biopsy", "IVF Treatment"],
    imageAlts: [
      "Educational illustration of targeted PGT-M testing for a known monogenic condition",
      "Clinical pathway diagram from genetic counselling to IVF biopsy and unaffected-embryo transfer",
      "PGT-M follow-up pathway with genetics report review and prenatal testing discussion",
    ],
  },
  {
    procedure: "Embryo Biopsy",
    shortName: "embryo biopsy",
    specialist: "embryologist performing biopsy under a fertility specialist’s cycle plan",
    definition:
      "Embryo biopsy removes a few trophectoderm cells from a blastocyst for genetic testing while the embryo is cryopreserved pending results.",
    candidacy:
      "It may be considered when PGT-A or PGT-M is planned and blastocysts are available; biopsy is a laboratory step, not a stand-alone fertility treatment.",
    limits:
      "Cleavage-stage biopsy is largely historical in many laboratories. Biopsy cannot be performed if embryos do not reach a suitable blastocyst stage.",
    evaluation:
      "Confirm genetics test type, laboratory biopsy experience and consent for freeze-all while awaiting results.",
    technique:
      "A laser-assisted opening allows aspiration of trophectoderm cells; the embryo is vitrified and the sample is processed for genetics.",
    approaches: [
      { label: "Blastocyst trophectoderm biopsy", detail: "Current standard for most PGT pathways." },
      { label: "Biopsy with concurrent PGT-A", detail: "Aneuploidy screening indication." },
      { label: "Biopsy with PGT-M", detail: "Monogenic indication with prior probe set-up." },
    ],
    duration: "performed on day 5–6 of culture during the IVF laboratory phase",
    admission: "No separate patient admission for biopsy.",
    recovery:
      "Patient recovery follows retrieval; laboratory biopsy does not add a surgical recovery for the patient.",
    risks:
      "Risks include embryo non-survival, inconclusive biopsies and the general IVF risks of the parent cycle.",
    urgent: "patient urgencies are retrieval-related; biopsy issues are communicated by the laboratory team",
    drivers: [
      { label: "Per-embryo biopsy fee", detail: "Often separate from genetic analysis." },
      { label: "Number of blastocysts suitable for biopsy", detail: "Drives total cost." },
      { label: "Genetics shipping", detail: "Off-site laboratories add courier fees." },
      { label: "Re-biopsy rarity", detail: "If needed, usually extra." },
      { label: "Freeze and storage", detail: "Bundled or separate depending on clinic." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "PGT consent",
      "Embryology day-by-day notes",
      "Genetics laboratory requisition",
    ],
    followUp: "Track which embryos were biopsied, results returned and remaining untested inventory.",
    quoteQuestions: [
      "Is biopsy priced separately from PGT analysis?",
      "What happens financially if no blastocyst is suitable?",
      "Which genetics lab will process the samples?",
    ],
    related: ["PGT-A Testing", "PGT-M / PGD Testing", "Embryo Freezing"],
    imageAlts: [
      "Medical illustration of laser-assisted blastocyst trophectoderm biopsy",
      "Clinical diagram of biopsy, vitrification and genetics shipping workflow",
      "Embryo biopsy follow-up pathway linking results to FET planning",
    ],
  },
  {
    procedure: "Hysteroscopy",
    shortName: "hysteroscopy",
    specialist: "fertility specialist or reproductive surgeon skilled in hysteroscopic cavity surgery",
    definition:
      "Hysteroscopy inspects the uterine cavity with a camera through the cervix and can treat polyps, selected adhesions, septa or submucosal fibroids that interfere with implantation or miscarriage risk.",
    candidacy:
      "It may be considered for abnormal cavity imaging, repeated implantation failure work-up, retained products suspicion, or before IVF when a correctable intracavitary lesion is likely.",
    limits:
      "Hysteroscopy does not treat tubal blockage or ovarian reserve problems. Malignancy concern redirects to gynecologic oncology pathways.",
    evaluation:
      "Saline sonogram or hysterosalpingogram findings, bleeding history, infection screen and anaesthesia plan precede theatre booking.",
    technique:
      "Under sedation or anaesthesia, the cavity is distended and inspected; operative instruments treat targeted lesions when planned, with specimen pathology when tissue is removed.",
    approaches: [
      { label: "Diagnostic hysteroscopy", detail: "Inspection with biopsy when indicated." },
      { label: "Operative polypectomy or adhesiolysis", detail: "Treats designated intracavitary pathology." },
      { label: "Hysteroscopic septum or submucosal fibroid surgery", detail: "Selected when fertility goals support cavity reconstruction." },
    ],
    duration: "often 20–60 minutes of theatre time depending on operative findings",
    admission: "Usually day-care; overnight observation is uncommon unless bleeding or fluid-balance concern arises.",
    recovery:
      "Spotting and cramping for days are common. Flying after uncomplicated diagnostic hysteroscopy may be possible within a day or two; operative cases need individualized advice before IVF scheduling.",
    risks:
      "Risks include uterine perforation, bleeding, infection, fluid-overload syndromes with operative cases and incomplete resection requiring a second sitting.",
    urgent: "heavy bleeding, severe pain, fever, fainting, or difficulty breathing after the procedure",
    drivers: [
      { label: "Diagnostic versus operative scope", detail: "Theatre time and disposables differ." },
      { label: "Energy devices and fluid management", detail: "Complex resections cost more." },
      { label: "Anaesthesia type", detail: "Local, sedation or general alter facility fees." },
      { label: "Pathology charges", detail: "Tissue examination may be separate." },
      { label: "Second-look procedures", detail: "Staged care for dense adhesions." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Cavity imaging reports",
      "Prior IVF implantation history",
      "Menstrual and infection history",
    ],
    followUp: "Confirm pathology results, when the cavity is ready for embryo transfer and whether a second-look hysteroscopy is planned.",
    quoteQuestions: [
      "Is this priced as diagnostic or operative?",
      "Are energy devices included?",
      "How long after surgery before an FET can be booked?",
    ],
    related: ["Laparoscopy", "Fibroid Removal (Myomectomy)", "Frozen Embryo Transfer (FET)"],
    imageAlts: [
      "Medical illustration of hysteroscopy inspecting the uterine cavity through the cervix",
      "Clinical diagram of diagnostic versus operative hysteroscopy for fertility",
      "Hysteroscopy recovery pathway before returning to IVF or FET",
    ],
  },
  {
    procedure: "Laparoscopy",
    shortName: "laparoscopy",
    specialist: "reproductive surgeon or fertility specialist trained in laparoscopic pelvic surgery",
    definition:
      "Laparoscopy uses small abdominal ports and a camera to diagnose and treat selected pelvic conditions that affect fertility, such as endometriosis, adhesions, ovarian cysts or tubal disease, when imaging and goals support surgery.",
    candidacy:
      "It may be considered for suspected endometriosis, complex ovarian cysts, tubal repair evaluation, or unexplained infertility when a surgical look is expected to change management.",
    limits:
      "Laparoscopy is not automatic before every IVF cycle. Advanced age with clear IVF indication may favour moving to laboratory treatment without diagnostic surgery.",
    evaluation:
      "Pelvic imaging, prior operative notes, anaemia assessment, anaesthesia fitness and a written plan for what will be treated if found.",
    technique:
      "Ports are placed under anaesthesia; pelvic organs are inspected; endometriosis excision, adhesiolysis, cystectomy or tubal procedures proceed only as consented and safe.",
    approaches: [
      { label: "Diagnostic laparoscopy with dye test", detail: "Assesses pelvis and tubal spill." },
      { label: "Operative laparoscopy for endometriosis or adhesions", detail: "Treats disease expected to affect fertility." },
      { label: "Laparoscopy combined with hysteroscopy", detail: "When cavity and pelvis both need assessment in one sitting." },
    ],
    duration: "often 45–180 minutes depending on operative findings",
    admission: "Usually 0–1 night; longer if extensive excision or unexpected findings occur.",
    recovery:
      "Shoulder-tip gas pain and port-site soreness settle over days to a fortnight. International patients should plan several days nearby before long-haul flights after operative laparoscopy.",
    risks:
      "Risks include bleeding, infection, injury to bowel, bladder or vessels, conversion to open surgery, ovarian reserve impact after cystectomy and clot risk with reduced mobility.",
    urgent: "fever, heavy bleeding, severe abdominal pain, vomiting, calf swelling, chest pain, or shortness of breath",
    drivers: [
      { label: "Diagnostic versus extensive operative work", detail: "Excision time drives theatre fees." },
      { label: "Energy devices and disposables", detail: "Advanced stacks change cost." },
      { label: "Combined hysteroscopy", detail: "Adds a second procedure fee." },
      { label: "Overnight stay and blood products", detail: "Uncommon but material when needed." },
      { label: "Surgeon and facility category", detail: "Must be named on the estimate." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Pelvic MRI or ultrasound",
      "Prior laparoscopy notes",
      "Fertility goals statement",
    ],
    followUp: "Pathology review, wound checks and timing guidance for IVF or conception attempts after healing.",
    quoteQuestions: [
      "What operative steps are pre-authorised if endometriosis is found?",
      "Is a dye test included?",
      "How many nights are included if conversion occurs?",
    ],
    related: ["Endometriosis Surgery", "Ovarian Cyst Removal", "Hysteroscopy"],
    imageAlts: [
      "Medical illustration of pelvic laparoscopy for fertility assessment",
      "Clinical diagram of laparoscopic ports and dye test for tubal patency",
      "Laparoscopy recovery pathway with wound care and return-to-IVF timing",
    ],
  },
  {
    procedure: "Micro-TESE",
    shortName: "micro-TESE",
    specialist: "andrologist or urologist experienced in microsurgical testicular sperm extraction",
    definition:
      "Micro-TESE uses an operating microscope to identify wider seminiferous tubules and extract sperm from the testis for ICSI in men with non-obstructive azoospermia.",
    candidacy:
      "It may be considered for non-obstructive azoospermia when genetic counselling is complete, hormonal evaluation is done and the couple plans ICSI if sperm are found.",
    limits:
      "Sperm retrieval is not guaranteed. Micro-TESE does not restore natural ejaculated sperm production and may reduce testosterone if large volumes of tissue are removed.",
    evaluation:
      "Azoospermia confirmation on more than one semen analysis, FSH and testosterone, karyotype and Y-chromosome microdeletion testing where indicated, and female-partner fertility assessment.",
    technique:
      "Under anaesthesia, the testis is opened and examined with a microscope; targeted tissue is taken for immediate embryology search and possible cryopreservation.",
    approaches: [
      { label: "Micro-TESE with same-day ICSI", detail: "Fresh sperm used if oocytes are retrieved the same day." },
      { label: "Micro-TESE with sperm freezing", detail: "Cryopreserves retrieved sperm for a later ICSI cycle." },
      { label: "Bilateral exploration when indicated", detail: "Only with clear counselling about benefit versus tissue loss." },
    ],
    duration: "often 1–3 hours of theatre time depending on findings",
    admission: "Usually day-care or one night for pain control.",
    recovery:
      "Scrotal support, analgesia and activity limits for one to two weeks are typical. Flying after uncomplicated micro-TESE often waits until bleeding risk and swelling are acceptable to the surgeon—commonly several days.",
    risks:
      "Risks include bleeding, infection, haematoma, testosterone decline, failure to retrieve sperm, chronic orchialgia and need for donor-sperm backup plans.",
    urgent: "expanding scrotal swelling, heavy bleeding, fever, severe pain, or difficulty urinating",
    drivers: [
      { label: "Unilateral versus bilateral surgery", detail: "Operative time changes." },
      { label: "Fresh ICSI coordination", detail: "Same-day egg retrieval adds IVF fees." },
      { label: "Sperm freezing fees", detail: "If ICSI is deferred." },
      { label: "Microsurgery facility charges", detail: "Microscope and longer theatre slots." },
      { label: "Genetic testing already performed", detail: "May be separate pre-op costs." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Two semen analyses showing azoospermia",
      "Hormone and genetic tests",
      "Partner ovarian reserve summary",
    ],
    followUp: "Review retrieval outcome, testosterone symptoms and whether a second attempt or donor sperm is next.",
    quoteQuestions: [
      "Is same-day ICSI coordinated in the price?",
      "What if no sperm are found—how is billing handled?",
      "Is sperm freezing included?",
    ],
    related: ["TESE / TESA", "ICSI Treatment", "Donor Sperm IVF"],
    imageAlts: [
      "Medical illustration of microsurgical testicular sperm extraction under an operating microscope",
      "Clinical diagram of micro-TESE coordinated with ICSI on the same day or with freezing",
      "Micro-TESE recovery pathway with scrotal care and follow-up hormone review",
    ],
  },
  {
    procedure: "TESE / TESA",
    shortName: "TESE / TESA",
    specialist: "andrologist or urologist performing testicular sperm retrieval for ICSI",
    definition:
      "TESE (testicular sperm extraction) and TESA (testicular sperm aspiration) obtain sperm directly from the testis when ejaculated sperm are absent or unusable, for use with ICSI.",
    candidacy:
      "It may be considered for obstructive azoospermia, selected non-obstructive cases, or on-demand retrieval when frozen samples are unavailable and ICSI is planned.",
    limits:
      "Conventional TESE/TESA may be less successful than micro-TESE in non-obstructive azoospermia. These procedures do not repair the underlying cause of azoospermia.",
    evaluation:
      "Confirm azoospermia type, prior reconstructions, infectious screening and the embryology laboratory’s ability to process testicular samples.",
    technique:
      "Needle aspiration (TESA) or open biopsy extraction (TESE) gathers tubules or aspirate for embryology; samples may be used fresh or frozen.",
    approaches: [
      { label: "TESA aspiration", detail: "Needle technique for selected obstructive or diagnostic contexts." },
      { label: "Conventional TESE", detail: "Open biopsy extraction without microscope mapping." },
      { label: "Conversion discussion to micro-TESE", detail: "When non-obstructive physiology makes mapping preferable." },
    ],
    duration: "often 30–90 minutes depending on technique and findings",
    admission: "Usually outpatient or day-care.",
    recovery:
      "Scrotal support and limited activity for several days. Fitness to fly is individualized after bleeding risk settles.",
    risks:
      "Risks include haematoma, infection, pain, failed retrieval and reduced testosterone with repeated biopsies.",
    urgent: "expanding haematoma, fever, severe pain, or urinary retention",
    drivers: [
      { label: "TESA versus TESE technique", detail: "Open biopsy differs from aspiration pricing." },
      { label: "Fresh ICSI coordination", detail: "Adds IVF laboratory fees." },
      { label: "Cryopreservation of testicular sperm", detail: "Storage fees apply." },
      { label: "Repeat retrieval attempts", detail: "Separate episodes." },
      { label: "Anaesthesia choice", detail: "Local versus sedation or general." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Azoospermia work-up",
      "Prior retrieval attempts",
      "ICSI scheduling plan",
    ],
    followUp: "Confirm whether sperm were frozen, wound healing and next ICSI timing.",
    quoteQuestions: [
      "Is this TESA or TESE in the quote?",
      "Is embryology processing included?",
      "What is the plan if retrieval fails?",
    ],
    related: ["Micro-TESE", "PESA / MESA", "ICSI Treatment"],
    imageAlts: [
      "Medical illustration comparing TESA needle aspiration and TESE open biopsy",
      "Clinical diagram of testicular sperm retrieval feeding into ICSI",
      "TESE/TESA recovery pathway with scrotal support and wound review",
    ],
  },
  {
    procedure: "PESA / MESA",
    shortName: "PESA / MESA",
    specialist: "andrologist experienced in epididymal sperm retrieval",
    definition:
      "PESA (percutaneous epididymal sperm aspiration) and MESA (microsurgical epididymal sperm aspiration) collect sperm from the epididymis for ICSI, most often in obstructive azoospermia.",
    candidacy:
      "It may be considered after vasectomy, congenital bilateral absence of the vas, or other obstructive causes when epididymal sperm are expected and ICSI is planned.",
    limits:
      "These techniques are less suitable for non-obstructive azoospermia, where micro-TESE is usually preferred. They do not reverse obstruction for natural conception.",
    evaluation:
      "Confirm obstructive picture, CFTR counselling when relevant for congenital absence of the vas, and laboratory readiness for epididymal samples.",
    technique:
      "PESA uses a needle through the skin; MESA uses microsurgical exposure of epididymal tubules to aspirate sperm for ICSI or freezing.",
    approaches: [
      { label: "PESA with ICSI", detail: "Percutaneous aspiration under local anaesthesia or sedation." },
      { label: "MESA with microsurgical aspiration", detail: "Open microscopic epididymal harvest." },
      { label: "Backup TESE readiness", detail: "If epididymal sperm are absent." },
    ],
    duration: "often 30–120 minutes depending on PESA versus MESA",
    admission: "Usually outpatient; MESA may use a longer recovery bay stay.",
    recovery:
      "Scrotal bruising is common. Flying after uncomplicated PESA may be possible within a few days; MESA recovery can be longer.",
    risks:
      "Risks include haematoma, infection, pain, failed retrieval and epididymal scarring that complicates future attempts.",
    urgent: "expanding scrotal swelling, fever, severe pain, or drainage from puncture sites",
    drivers: [
      { label: "PESA versus MESA", detail: "Microsurgery costs more than percutaneous aspiration." },
      { label: "Same-day ICSI", detail: "Coordinates with partner egg retrieval." },
      { label: "Sperm freezing", detail: "If multiple ICSI cycles are planned." },
      { label: "CFTR or genetic counselling", detail: "May be separate." },
      { label: "Backup testicular retrieval", detail: "Billed if needed." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Obstructive azoospermia diagnosis",
      "CFTR results when indicated",
      "Partner IVF plan",
    ],
    followUp: "Document sperm yield, freezing status and whether reconstructive surgery was discussed as an alternative for future natural attempts.",
    quoteQuestions: [
      "Is backup TESE included if PESA fails?",
      "Are embryology processing fees listed?",
      "Is MESA available if PESA is insufficient?",
    ],
    related: ["TESE / TESA", "Micro-TESE", "ICSI Treatment"],
    imageAlts: [
      "Medical illustration of epididymal sperm aspiration for obstructive azoospermia",
      "Clinical diagram comparing PESA and MESA techniques before ICSI",
      "PESA/MESA recovery pathway with scrotal care and ICSI coordination",
    ],
  },
  {
    procedure: "Fibroid Removal (Myomectomy)",
    shortName: "fibroid removal (myomectomy)",
    specialist: "fertility specialist or reproductive surgeon experienced in uterus-preserving myomectomy",
    definition:
      "Fibroid removal (myomectomy) excises fibroids that distort the cavity or impair fertility while preserving the uterus, using hysteroscopic, laparoscopic or open approaches selected for fibroid type and fertility goals.",
    candidacy:
      "It may be considered when submucosal or cavity-distorting fibroids are linked to implantation failure, recurrent miscarriage or cavity distortion before IVF, after imaging maps size, number and FIGO type.",
    limits:
      "Myomectomy does not guarantee pregnancy or prevent new fibroids. Diffuse adenomyosis or countless small fibroids may not be solved by one operation. This fertility-context pathway is distinct from hysterectomy.",
    evaluation:
      "Detailed fibroid mapping with ultrasound or MRI, anaemia management, endometrial assessment and a written birth-spacing or caesarean counselling plan after deep myometrial incisions.",
    technique:
      "Fibroids are removed by the least traumatic route that safely reaches them; the uterus is repaired in layers when the myometrium is entered; specimens go to pathology.",
    approaches: [
      { label: "Hysteroscopic myomectomy", detail: "For selected submucosal fibroids via the cervix." },
      { label: "Laparoscopic myomectomy", detail: "For selected intramural or subserosal fibroids when fertility preservation is planned." },
      { label: "Open myomectomy", detail: "For large or numerous fibroids unsuitable for a safe keyhole repair." },
    ],
    duration: "often 1–3 hours depending on fibroid burden",
    admission: "Usually 1–3 nights; hysteroscopic cases may be day-care.",
    recovery:
      "Return to IVF or conception attempts waits for uterine healing—often months after deep myometrial surgery. Long-haul flights after open myomectomy typically need more recovery days than after hysteroscopy.",
    risks:
      "Risks include bleeding, transfusion, infection, adhesion formation, intrauterine scarring, need for unplanned hysterectomy in emergencies and uterine rupture risk in future pregnancy if the cavity or deep wall was entered.",
    urgent: "heavy vaginal bleeding, severe abdominal pain, fever, fainting, calf swelling, or chest pain",
    drivers: [
      { label: "Approach route", detail: "Hysteroscopic, laparoscopic and open fees differ widely." },
      { label: "Fibroid number and size", detail: "Theatre time scales with burden." },
      { label: "Blood products and ICU contingency", detail: "Anaemia raises risk lines." },
      { label: "Adhesion-prevention materials", detail: "May be extras." },
      { label: "Combined cavity procedures", detail: "Concurrent hysteroscopy adds fees." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "MRI or detailed ultrasound fibroid map",
      "Fertility and miscarriage history",
      "Haemoglobin and ferritin",
    ],
    followUp: "Pathology review, healing timeline before FET or conception, and obstetric planning for mode of delivery after myometrial repair.",
    quoteQuestions: [
      "Which route is planned and why?",
      "How long must we wait before embryo transfer?",
      "What is the emergency hysterectomy consent wording?",
    ],
    related: ["Hysteroscopy", "Laparoscopy", "Ovarian Cyst Removal"],
    imageAlts: [
      "Medical illustration of uterus-preserving myomectomy removing cavity-distorting fibroids",
      "Clinical diagram comparing hysteroscopic, laparoscopic and open myomectomy routes for fertility",
      "Myomectomy recovery pathway with healing interval before IVF or pregnancy",
    ],
  },
  {
    procedure: "Ovarian Cyst Removal",
    shortName: "ovarian cyst removal",
    specialist: "fertility specialist or reproductive surgeon experienced in ovary-sparing cystectomy",
    definition:
      "Ovarian cyst removal in a fertility context excises or drains selected benign ovarian cysts while aiming to preserve healthy ovarian tissue and future egg supply when imaging and markers support a benign pathway.",
    candidacy:
      "It may be considered for persistent cysts that cause pain, suspected endometriosis cysts impairing IVF access, or cysts that interfere with monitoring—after malignancy risk is assessed.",
    limits:
      "Cystectomy can reduce ovarian reserve. Suspected cancer redirects to oncology surgery. Simple physiologic cysts often need observation rather than surgery.",
    evaluation:
      "Ultrasound characteristics, tumour markers when indicated, AMH baseline, prior cyst history and whether IVF stimulation can proceed without surgery.",
    technique:
      "Laparoscopic cystectomy or drainage with ovary sparing is typical for benign-appearing cysts; endometriosis cyst walls may be excised with careful haemostasis to protect follicles.",
    approaches: [
      { label: "Laparoscopic ovarian cystectomy", detail: "Removes the cyst wall while sparing cortex when feasible." },
      { label: "Endometrioma surgery before IVF", detail: "Selected when cysts impede access or are otherwise indicated." },
      { label: "Observation or aspiration alternative", detail: "Discussed when surgery risks outweigh benefits for reserve." },
    ],
    duration: "often 45–150 minutes depending on laterality and adhesions",
    admission: "Usually 0–1 night after laparoscopy.",
    recovery:
      "Port-site pain settles over days to two weeks. AMH may fall after cystectomy; IVF timing should wait for clinical clearance and reserve reassessment.",
    risks:
      "Risks include bleeding, ovarian failure on the operated side, adhesion formation, cyst recurrence, chemical peritonitis if a dermoid spills and conversion to oophorectomy when tissue is not salvageable.",
    urgent: "fever, severe pain, heavy bleeding, vomiting, calf swelling, or chest pain",
    drivers: [
      { label: "Unilateral versus bilateral surgery", detail: "Doubles operative complexity when both sides need care." },
      { label: "Endometrioma versus simple cyst", detail: "Excision difficulty differs." },
      { label: "Adhesiolysis extent", detail: "Prior surgery raises theatre time." },
      { label: "Frozen-section pathology readiness", detail: "Oncology contingency planning." },
      { label: "Overnight stay and medicines", detail: "Standard facility variables." },
    ],
    inclusions: [...commonInclusions, { label: "Named laboratory and medicine steps", detail: "Only laboratory work and medicines written in the estimate." }],
    exclusions: commonExclusions,
    records: [
      "Pelvic ultrasound or MRI",
      "AMH and tumour markers when ordered",
      "Prior IVF stimulation notes if cysts interfered",
    ],
    followUp: "Review pathology, repeat AMH if planned, wound checks and timing for ovarian stimulation or expectant management.",
    quoteQuestions: [
      "Will cystectomy or oophorectomy be decided intraoperatively?",
      "How might surgery change AMH?",
      "How soon can stimulation start afterward?",
    ],
    related: ["Laparoscopy", "Endometriosis Surgery", "Egg Freezing"],
    imageAlts: [
      "Medical illustration of ovary-sparing laparoscopic ovarian cyst removal for fertility",
      "Clinical diagram of cystectomy aiming to preserve ovarian cortex and follicles",
      "Ovarian cyst removal recovery pathway with reserve reassessment before IVF",
    ],
  }
];

export const infertilityArticles = profiles.map(createInfertilityArticle);

export const infertilityArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  infertilityArticles.map((article) => [article.slug, article]),
);
