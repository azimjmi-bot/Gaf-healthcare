import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { SURGICAL_GASTROENTEROLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_SURGICAL_GASTRO = [
  "Liver Resection (Hepatectomy)",
  "Gastrectomy",
  "Esophagectomy",
  "Sleeve Gastrectomy",
] as const;

type ExclusiveSg = Exclude<
  (typeof SURGICAL_GASTROENTEROLOGY_PROCEDURES)[number],
  (typeof SHARED_SURGICAL_GASTRO)[number]
>;

type SgProfile = {
  procedure: ExclusiveSg;
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
  related: ExclusiveSg[];
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
      "Delhi, Gurugram, Noida and Faridabad are separate HPB, transplant and colorectal corridors. Confirm the exact theatre and ICU campus before booking: a cross-NCR transfer with drains, a fresh anastomosis or a new graft is not a routine taxi ride.",
    lodging:
      "Choose flexible lodging near the named campus with a bathroom that can support drain or stoma care, a companion bed and a night-time route back to the treating ICU.",
    recovery:
      "Winter pollution and long NCR transfers can complicate a healing anastomosis, a new liver graft or a fresh stoma. Follow the team's diet, wound and outdoor-air advice rather than generic city walking plans.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon flooding can interfere with timed theatre lists, transplant call-in or an urgent return for a leak, bleed or graft concern.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and verify lift access, pharmacy hours and a reliable night-time route back to the treating campus.",
    recovery:
      "Humidity and monsoon travel make wound care, drain bags, stoma appliances and reliable transport practical parts of discharge planning after GI or HPB surgery.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is distant from several hospital districts. Cross-city traffic can turn a short map distance into a long transfer after major pancreatic, liver or colorectal surgery.",
    lodging:
      "A lift-accessible stay near the treating campus is usually more useful than an airport hotel; confirm pharmacy access and the first drain, pathology or immunosuppression review.",
    recovery:
      "Milder weather can make a longer hotel step-down more comfortable after Whipple, transplant or rectal surgery, but it does not remove leak, bleed or rejection risk. Arrange the first clinical review before fixing departure.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several GI-surgery campuses have comparatively direct airport access, but heat and travel after major abdominal surgery still require a planned vehicle and companion.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named campus with space for drain or stoma supplies and easy access for leak, fever or graft review.",
    recovery:
      "Heat can worsen dehydration after bowel resection, pancreatic reconstruction or a new stoma. Fluid and diet targets must come from the treating team.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad create different emergency-return journeys, so name the HPB or colorectal campus before lodging.",
    lodging:
      "Keep a capable companion and flexible, lift-accessible lodging within the response radius specified by the surgical gastroenterology team.",
    recovery:
      "Summer heat and a long airport transfer can worsen fatigue after liver, pancreas or rectal surgery. Plan hydration, indoor rest and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range. It does not establish candidacy, open versus laparoscopic versus robotic access, ICU nights, reconstruction or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare the exact GI operation, reconstruction, ICU assumption, pathology and follow-up rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Procedure- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not establish HPB, transplant or colorectal capability, ICU backup or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Procedure- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Professional, facility, device, ICU, pharmacy and follow-up charges may be billed separately.",
  },
  {
    country: "Singapore",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the actual anatomy, reconstruction and ICU plan rather than a general GI-surgery package.",
  },
  {
    country: "Germany",
    stay: "Procedure- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, device scope and post-travel GI-surgery follow-up require direct confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, emergency access and who reviews pathology, immunosuppression or a stoma after return.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, device, ICU and follow-up charges may be billed separately; [US_COST] is a comparison range, not a bundled quotation.",
  },
];

function makeCities(profile: SgProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that relationship is absent, cards must remain empty; a generic GI-surgery or hospital label cannot verify current case acceptance. This is a catalog gap, not a ranking or availability claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader surgical gastroenterology ecosystem, but this page does not infer that every listed centre performs ${profile.shortName}. ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Procedure & Recovery`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare evaluation, surgical approach, ICU or reconstruction needs and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.arrival} Confirm the named ${profile.specialist}, exact campus, reconstruction plan and route for urgent GI-surgery reassessment.`,
          `${place.lodging} ${place.recovery}`,
          gate,
          "Send complete surgical gastroenterology records before non-refundable travel. Remote review can change after examination, imaging, endoscopy or blood tests.",
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
          `Ask the provider to name the ${profile.specialist}, campus, open versus laparoscopic versus robotic assumptions, reconstruction, ICU allowance, exclusions, emergency terms and follow-up.`,
          `Budget separately for travel through ${place.airport}, nearby lodging, a companion, medicines and extra nights if monitoring is prolonged.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send GI surgery notes, relevant endoscopy, CT, MRI, pathology and the current medicine list before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist}. Confirm ICU, blood-bank, interventional and emergency leak or bleed backup.`,
          `${profile.recovery} ${place.recovery} Travel home only after the team reviews wounds, diet, drains or immunosuppression and fitness to fly.`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact campus, lead clinician, reconstruction or graft assumptions, ICU plan and handover in writing. General accreditation does not establish current capability or outcomes.",
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
            a: `It should name ${profile.procedure}, the clinician and campus, approach, reconstruction, ICU, imaging, exclusions and emergency terms.`,
          },
        ],
      },
    };
  });
}

function createSgArticle(profile: SgProfile): CostArticle {
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
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare individualized assessment, surgical options, recovery, risks and travel for international patients.`,
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
      `${profile.procedure} in India is typically planned at [INDIA_COST]. The cost may cover the named specialist, theatre time, stated imaging, routine medicines and the listed hospital stay, while extra reconstruction, staplers, ICU nights or another procedure depend on the written scope. The stored stay is [STAY], but monitoring and travel timing are individualized.`,
      `Major price drivers are ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}. Revision surgery, a different approach or an unexpected reconstruction can materially change the bill.`,
      "Planning Range ≠ Final Hospital Quotation. A qualified surgical gastroenterology team must review records, anatomy and alternatives before an itemized offer is meaningful.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}. It should be replaced by an itemized quotation tied to a named ${profile.specialist}, campus, reconstruction plan and ICU assumption.`,
      `Cost can change with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A different approach, extra organ resection or a combined procedure describes a different episode.`,
      "Compare estimates line by line. Do not derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national range, and keep flights, lodging, companion costs, long-term medicines and nutrition support visible.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may include different approaches, reconstructions, ICU nights or devices. Compare professional fees, theatre time, staplers or mesh, imaging, ICU, medicines, exclusions and emergency terms.`,
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
        "Suitability depends on individual assessment by a qualified surgical gastroenterologist or GI surgeon and, where relevant, hepatology, oncology, interventional radiology or a multidisciplinary team. This page cannot diagnose a reader or recommend a personal operation.",
      ],
      how: [
        profile.technique,
        `Relevant options include ${approachNames}; they are not interchangeable package names.`,
        `${profile.admission} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        "The receiving team should reconcile anticoagulants, nutrition, infection, previous abdominal surgery and any bowel-prep or fasting plan before a date is fixed.",
        "Follow fasting and medicine-hold instructions from the treating team. Report fever, jaundice, bleeding, severe pain or another material change before travel.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Diet, wound care, drain or stoma instructions and activity limits are stated. Written instructions take priority over generic travel advice.",
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
          "A consultation should separate the intended target — oesophagus, stomach, small bowel, colon, rectum, liver, bile duct, pancreas, abdominal wall or another named structure — from other disease that may still need medicines, endoscopy, chemotherapy, radiation or a different operation.",
          "No page can promise complete disease clearance, cure, weight change, graft function or a complication-free course.",
        ],
      },
      {
        id: "risks-and-considerations",
        heading: `Risks and Considerations after ${profile.procedure}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on anatomy, prior surgery, nutrition, infection, emergency versus planned timing and the actual technique.",
          `${profile.recovery} A lower price does not reduce the need for ICU access or structured follow-up.`,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: `Recovery and travel after ${profile.procedure}`,
        paragraphs: [
          `${profile.admission} ${profile.recovery}`,
          "International patients should distinguish procedure time, hospital stay, recommended days in India and longer-term recovery at home. Discharge is not the same as fitness to fly.",
          `${profile.followUp} Flights should remain flexible until the team confirms diet, wound status, drain or stoma stability and travel fitness.`,
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
        { label: "Itemized estimate", detail: "Match clinician, campus, approach, reconstruction, ICU, imaging, monitoring, exclusions and emergency terms." },
        { label: "Arrival reassessment", detail: "Repeat examination, blood tests, imaging or endoscopy only when clinically indicated before final consent." },
        { label: "Surgery and monitored recovery", detail: `${profile.technique} ${profile.admission}` },
        { label: "Discharge and nearby review", detail: `${profile.recovery} Confirm medicines, warning signs and emergency contacts.` },
        { label: "Handover home", detail: `${profile.followUp} Carry the operative report, pathology and device or immunosuppression details where relevant.` },
      ],
    },
    journey: [
      { label: "Submit relevant records", detail: profile.records.join("; ") + "." },
      { label: "Obtain specialist review", detail: `A named ${profile.specialist} assesses indication, anatomy, alternatives and travel suitability.` },
      { label: "Clarify goals and uncertainty", detail: "Discuss symptoms, prior treatment and what this operation cannot promise." },
      { label: "Confirm individualized candidacy", detail: profile.candidacy },
      { label: "Compare itemized estimates", detail: "Hold procedure, reconstruction, ICU, imaging, monitoring and emergency terms constant." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable travel, a capable companion and lodging near the exact campus." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Complete informed consent", detail: `Review alternatives, ${profile.risks.toLowerCase()} and the possibility that the plan changes.` },
      { label: "Undergo the planned operation", detail: profile.technique },
      { label: "Complete monitored recovery", detail: `${profile.admission} Establish safe oral intake, drain or stoma care and activity limits.` },
      { label: "Attend nearby follow-up", detail: `${profile.recovery} Obtain explicit fitness-to-fly advice.` },
      { label: "Transfer care home", detail: `${profile.followUp} Share the report and emergency plan with the local clinician.` },
    ],
    documents: [
      ...profile.records,
      "Current medicines, allergies and recent blood tests where relevant",
      "Surgical gastroenterology notes and any available endoscopy, colonoscopy, CT, MRI, MRCP, PET-CT or ultrasound reports",
      "Previous operative notes, pathology, chemotherapy or radiation records where relevant",
      "Passport and companion information needed for travel and consent",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other countries require quotations because comparable, procedure-specific packages are not reliably available in the catalog.",
      "A meaningful comparison holds clinician, licensed facility, surgical approach, reconstruction, ICU, complication terms and follow-up constant.",
    ],
    destinationNote:
      "International comparisons are indicative and may not represent identical packages. Anatomy, reconstruction, ICU nights, complications, currency and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad retain [INDIA_COST] because no verified city tariffs are stored. Their pages address distinct airport, geography, climate, lodging and follow-up logistics without inventing local prices.",
      `Doctor and hospital cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship. Missing mappings leave cards empty rather than borrowing generic GI-surgery entities.`,
    ],
    whyIndia: [
      `Some international patients evaluate India for access to a named ${profile.specialist}, HPB or colorectal infrastructure and a national self-pay planning range below the stored United States reference. Price alone is not a clinical reason to travel.`,
      "The relevant questions are individualized acceptance, licensed facility, ICU and blood-bank backup, reconstruction or graft capability where relevant and continuity after return.",
      "No provider is ranked and no outcome is promised. Unstable sepsis, untreated jaundice, inadequate records or safer established care near home may make travel inappropriate.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered, and what medical, endoscopic or surgical options were discussed?`,
      "How were my imaging, endoscopy, pathology and previous operations assessed?",
      `Who is the named ${profile.specialist}, and at which exact campus will the operation occur?`,
      `Does the quotation use the exact name ${profile.procedure}?`,
      "Which consultations, blood tests, imaging and endoscopy are included?",
      "Are specialist, theatre, anaesthesia and recovery-room fees included?",
      "Is this an open, laparoscopic or robotic plan, and what finding would change it?",
      "Are staplers, mesh, drains or other devices assumed, and are manufacturer details provided?",
      "Would extra organ resection, a stoma, vein reconstruction or a different procedure change the quotation?",
      "How many ward or ICU nights and which room category are included?",
      "How are extra nights, leak, bleed, reoperation or a complication billed?",
      "Which discharge medicines, nutrition support and stoma supplies are included?",
      "Is pathology charging included if tissue is taken?",
      "When can I fly, eat, work or resume other activity?",
      "Which follow-up visits, drain reviews or immunosuppression reviews are included?",
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
        a: `${profile.procedure} is typically planned at [INDIA_COST]. This stored national range is not a quotation; anatomy, reconstruction, ICU, devices, monitoring and written terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.candidacy },
      {
        q: "Is GI surgery in India automatically cheaper?",
        a: "It may cost less than some self-pay markets, but quotations are not automatically comparable. Compare exact scope, clinician, facility, reconstruction, ICU and follow-up.",
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
        a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad have relevant surgical gastroenterology ecosystems, but actual availability requires an exact clinician and campus confirmation.",
      },
      { q: "What follow-up is needed after returning home?", a: `${profile.followUp} The plan should name who reviews pathology, drains, stoma care or immunosuppression.` },
    ],
    doctorHeading: `${profile.procedure} specialists in India`,
    cityDoctorHeading: `${profile.procedure} specialists in [CITY]`,
    doctorIntro:
      `Profiles are drawn dynamically only when ${profile.procedure} appears in an exact current CMS procedure relationship. Verify specialty scope, availability and campus; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals and GI surgery centres for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact live entity relationships for ${profile.procedure}. A general GI-surgery or accreditation label does not establish current case acceptance, ICU backup or outcomes.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/surgical-gastroenterology/${slug}-anatomy.webp`,
        alt: profile.imageAlts[0],
        caption: "Educational anatomy diagram; it is not a patient-specific diagnosis or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/surgical-gastroenterology/${slug}-procedure.webp`,
        alt: profile.imageAlts[1],
        caption: "Conceptual procedure diagram; the actual plan depends on examination and informed consent.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/surgical-gastroenterology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Recovery milestones vary; the treating team's instructions and travel clearance take priority.",
        fit: "contain",
      },
    ],
  };
}

const commonInclusions: LabelledDetail[] = [
  { label: "Clinical assessment", detail: "Named surgical gastroenterology consultation, records review and procedure-focused examination when explicitly listed." },
  { label: "Surgical episode", detail: "Specialist, theatre time, standard instruments and recovery-room or ICU care within the written scope." },
  { label: "Imaging and tests", detail: "Stated blood tests and listed CT, MRI, MRCP, endoscopy or ultrasound only; unlisted advanced imaging is extra." },
  { label: "Routine aftercare", detail: "Standard medicines, nutrition as listed, observation and stated early follow-up only when itemized." },
  { label: "Documentation", detail: "Discharge summary, operative report and pathology or immunosuppression details where applicable." },
];

const commonExclusions: LabelledDetail[] = [
  { label: "Changed scope", detail: "Extra organ resection, a stoma, vein reconstruction or a different operation found after arrival." },
  { label: "Complications", detail: "Unplanned tests, ICU extension, reoperation, prolonged stay or readmission unless expressly covered." },
  { label: "Premium devices", detail: "Additional staplers, mesh, implants or energy devices beyond the written estimate." },
  { label: "Extended aftercare", detail: "Long-term medicines, nutrition support, stoma supplies, remote review or follow-up beyond the included period." },
  { label: "Travel and living", detail: "Flights, visa, local transport, lodging, meals, companion costs and personal expenses." },
];

const profiles: SgProfile[] = [
  {
    procedure: "Liver Transplantation",
    shortName: "liver transplantation",
    specialist: "liver transplant or hepatobiliary surgeon",
    definition:
      "Liver transplantation replaces a failing liver with a graft from a living or deceased donor when medical treatment can no longer sustain liver function.",
    candidacy:
      "It may be considered for selected cirrhosis, acute liver failure, selected liver tumours or metabolic liver disease after transplant-committee review of MELD or PELD, imaging, infection and social support.",
    limits:
      "Transplantation does not treat every liver tumour and is not a same-week tourist operation. Living-donor and deceased-donor grafts are different CMS procedures. Immunosuppression is lifelong and is not a brochure wait-list.",
    evaluation:
      "Assessment includes liver tests, viral serology, contrast imaging or MRI, cardiopulmonary review, psychosocial assessment and a named transplant ICU. Donor type is decided after that work, not from a package name.",
    technique:
      "The diseased liver is removed and a whole or partial graft is implanted with hepatic-vein, portal-vein, arterial and biliary anastomoses. ICU monitoring of graft flow, bile output and immunosuppression follows.",
    approaches: [
      { label: "Deceased-donor whole-liver graft", detail: "Allocation and blood-group matching govern timing; wait-list days are not a hotel booking." },
      { label: "Living-donor partial graft", detail: "Donor and recipient operations occur on the same campus; donor safety is a separate consent." },
      { label: "Split or reduced graft", detail: "Used in selected paediatric or size-mismatch settings after technical review." },
    ],
    duration: "Often 6–12 hours of theatre time, longer if prior surgery or vascular reconstruction is required",
    admission: "Typically includes ICU then ward stay; [STAY] is a planning band, not a discharge promise.",
    recovery:
      "Early recovery centres on graft function, bile drainage, infection watch and immunosuppression levels. Flying requires documented graft stability, wound review and a medicine plan.",
    risks:
      "Risks include bleeding, bile leak, hepatic-artery or portal-vein thrombosis, infection, rejection, primary graft non-function, reoperation and need for retransplantation.",
    urgent: "fever, jaundice, sudden drain-output change, abdominal swelling, bleeding or missed immunosuppression doses",
    drivers: [
      { label: "Donor type", detail: "Living-donor and deceased-donor episodes have different theatre, ICU and ethics costs." },
      { label: "MELD or acuity", detail: "Acute failure and high-dependency ICU change blood-product and stay assumptions." },
      { label: "Vascular or biliary reconstruction", detail: "Prior surgery or variant anatomy extends theatre time." },
      { label: "Immunosuppression and infection work-up", detail: "Induction agents and cultures are not always inside a headline package." },
      { label: "Retransplant or prior abdominal surgery", detail: "A second graft or a hostile abdomen is a different sitting." },
    ],
    inclusions: [...commonInclusions, { label: "Listed transplant ICU window", detail: "Only the stated ICU and ward nights; extra graft-dysfunction days are usually extra." }],
    exclusions: [...commonExclusions, { label: "Donor work-up billed separately", detail: "Living-donor evaluation may sit on another invoice." }],
    records: ["Hepatology notes and MELD or PELD data", "Cross-sectional liver imaging", "Viral and tumour-marker results", "Prior transplant or resection notes if any"],
    followUp: "Follow-up reviews graft enzymes, drug levels, infection prophylaxis and imaging as directed by the transplant team.",
    quoteQuestions: ["Is living-donor work-up included?", "How many ICU nights are assumed?", "Who manages immunosuppression after return?"],
    related: ["Living Donor Liver Transplantation", "Deceased Donor Liver Transplantation", "Liver Retransplantation"],
    campusFocus: "Name the transplant ICU, not only a GI-surgery brand, before booking Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad lodging.",
    imageAlts: [
      "Medical illustration of native liver anatomy, hepatic vessels and bile duct involved in liver transplantation",
      "Clinical diagram of a donor liver graft being implanted with vascular and biliary anastomoses",
      "Liver-transplant recovery pathway showing ICU graft monitoring, immunosuppression review and travel clearance",
    ],
  },
  {
    procedure: "Living Donor Liver Transplantation",
    shortName: "living donor liver transplantation",
    specialist: "living-donor liver transplant surgeon",
    definition:
      "Living donor liver transplantation uses a portion of a healthy donor's liver to replace the recipient's failing liver, with both operations performed on the same campus.",
    candidacy:
      "It may be considered when a medically suitable, ethically reviewed donor is available and the recipient's disease already meets transplant-committee criteria.",
    limits:
      "This is not deceased-donor transplantation and not a liver resection performed for tumour alone. Donor safety can cancel the recipient list. This page does not rank donors or promise regeneration.",
    evaluation:
      "Recipient work-up plus donor volumetry, vascular mapping, liver-fat assessment, psychosocial review and independent donor advocacy must finish before a date is fixed.",
    technique:
      "The donor hepatectomy removes a planned right or left graft. The recipient hepatectomy follows, then the graft is implanted with inflow, outflow and biliary reconstruction. Both patients recover in monitored settings.",
    approaches: [
      { label: "Right-lobe adult graft", detail: "Used when remnant and graft volumes already allow it; remnant insufficiency is a donor-safety limit." },
      { label: "Left-lobe or left-lateral graft", detail: "Commoner in paediatric or smaller-recipient settings after volumetry." },
      { label: "ABO or complex vascular reconstruction", detail: "A different technical and ICU episode if written after review." },
    ],
    duration: "Two linked operations, often a full theatre day for each list when anatomy is straightforward",
    admission: "Donor and recipient stays differ; stored [STAY] covers both planning bands, not identical discharge dates.",
    recovery:
      "The donor recovers from hepatectomy; the recipient recovers from transplant and immunosuppression. Neither should fly until the named team documents wound, drain and graft or remnant stability.",
    risks:
      "Recipient risks include bleed, bile leak, thrombosis, rejection and infection. Donor risks include bleed, bile leak, remnant dysfunction, infection, reoperation and, rarely, death. No page assigns probabilities.",
    urgent: "fever, bile in the drain, sudden pain, jaundice, bleeding or missed immunosuppressant doses",
    drivers: [
      { label: "Graft side and volume", detail: "Right-lobe, left-lobe and left-lateral grafts are different theatre days." },
      { label: "Donor imaging and ethics review", detail: "Volumetry, fat fraction and independent consent are not optional add-ons." },
      { label: "Two ICU pathways", detail: "Donor and recipient monitoring are separate resource lines." },
      { label: "Biliary reconstruction complexity", detail: "Duct-to-duct versus hepaticojejunostomy changes leak risk and stay." },
      { label: "ABO or retransplant setting", detail: "Incompatible or second-graft lists are different episodes." },
    ],
    inclusions: [...commonInclusions, { label: "Named donor and recipient theatre", detail: "Only when both lists are written on the same estimate." }],
    exclusions: [...commonExclusions, { label: "Cancelled donor list", detail: "Last-minute donor unsuitability can void a recipient date without making a cheaper package." }],
    records: ["Recipient hepatology file", "Donor CT volumetry and MRCP", "Independent donor-consent notes", "Infection and tumour-marker panel"],
    followUp: "Both patients need named follow-up: remnant and wound review for the donor; graft function and drug levels for the recipient.",
    quoteQuestions: ["Are donor and recipient billed on one invoice?", "What happens if the donor is declined after arrival?", "Is remnant imaging included?"],
    related: ["Liver Transplantation", "Deceased Donor Liver Transplantation", "Pediatric Liver Transplantation"],
    campusFocus: "Donor and recipient must share one named Indian campus with a transplant ICU; two tourist theatres do not satisfy this sheet.",
    imageAlts: [
      "Medical illustration of living-donor liver anatomy showing a planned right or left graft and remnant liver",
      "Clinical diagram of simultaneous donor hepatectomy and recipient implantation in living donor liver transplantation",
      "Living-donor transplant recovery pathway showing donor remnant review, recipient immunosuppression and travel clearance",
    ],
  },
  {
    procedure: "Deceased Donor Liver Transplantation",
    shortName: "deceased donor liver transplantation",
    specialist: "deceased-donor liver transplant surgeon",
    definition:
      "Deceased donor liver transplantation implants a whole or split graft from a deceased donor when allocation, blood group and a named transplant ICU already allow it.",
    candidacy:
      "It may be considered for listed patients whose disease severity, infection status and social support already meet the transplant committee's written criteria.",
    limits:
      "This is not living-donor transplantation. Wait-list timing is not a hotel reservation. Allocation rules, not a coordinator brochure, decide when a graft appears.",
    evaluation:
      "Listing requires imaging, serology, cardiopulmonary clearance and a named centre that can accept an offer. International patients must understand they may wait, be declined or need a living-donor alternative.",
    technique:
      "When a matched graft is accepted, the native liver is removed and the graft is implanted with venous, arterial and biliary anastomoses. Cold-ischaemia time and ICU graft-flow checks govern the first hours.",
    approaches: [
      { label: "Whole-liver deceased-donor graft", detail: "The usual adult reconstruction when size and quality allow it." },
      { label: "Split-liver graft", detail: "A shared graft for two recipients after technical review." },
      { label: "Marginal or extended-criteria graft", detail: "A different risk conversation, not a cheaper upgrade." },
    ],
    duration: "Often 6–10 hours once the graft is accepted; offer-to-theatre timing is unpredictable",
    admission: "ICU then ward; stored [STAY] assumes an accepted graft, not wait-list hotel nights.",
    recovery:
      "Recovery follows graft function, bile output, infection and immunosuppression. Travel home is considered only after the team documents stability — not after a fixed night count.",
    risks:
      "Risks include primary non-function, vascular thrombosis, bile leak, infection, rejection, bleeding, reoperation and need for a second graft.",
    urgent: "fever, rising bilirubin, sudden drain change, abdominal pain or missed medicines",
    drivers: [
      { label: "Wait-list and offer timing", detail: "Hotel nights before a graft are usually outside the surgical package." },
      { label: "Graft quality", detail: "Steatosis or extended-criteria grafts change ICU and complication risk." },
      { label: "Cold-ischaemia and reconstruction", detail: "Longer ischaemia or variant arteries extend theatre and monitoring." },
      { label: "Blood products", detail: "Coagulopathy and prior surgery change transfusion lines." },
      { label: "Immunosuppression protocol", detail: "Induction and infection prophylaxis may be billed separately." },
    ],
    inclusions: [...commonInclusions, { label: "Accepted-graft theatre and ICU", detail: "Wait-list lodging is not assumed." }],
    exclusions: [...commonExclusions, { label: "Unused offer or cancelled list", detail: "A declined graft does not convert the estimate into a cheaper day-care bill." }],
    records: ["Listing letter and blood group", "Recent cross-sectional imaging", "Infection screen", "Prior abdominal or transplant notes"],
    followUp: "The transplant team sets enzyme, drug-level and infection-review intervals after return.",
    quoteQuestions: ["Are wait-list hotel nights included?", "What happens if no graft is offered during the stay?", "Is split-graft reconstruction assumed?"],
    related: ["Liver Transplantation", "Living Donor Liver Transplantation", "Liver Retransplantation"],
    campusFocus: "Confirm a named deceased-donor programme and ICU that can accept an offer in that city; a GI-surgery listing is not a wait-list.",
    imageAlts: [
      "Medical illustration of a whole deceased-donor liver graft with hepatic veins, portal vein, artery and bile duct",
      "Clinical diagram of deceased-donor liver implantation after native hepatectomy",
      "Deceased-donor transplant recovery pathway showing wait-list uncertainty, ICU graft checks and travel clearance",
    ],
  },
  {
    procedure: "Pediatric Liver Transplantation",
    shortName: "pediatric liver transplantation",
    specialist: "paediatric liver transplant or paediatric HPB surgeon",
    definition:
      "Pediatric liver transplantation replaces a child's failing liver with a whole, reduced or living-donor graft when hepatology and a paediatric ICU already agree that medical therapy is not enough.",
    candidacy:
      "It may be considered for biliary atresia after unsuccessful Kasai, selected metabolic disease, acute liver failure or selected tumours after paediatric transplant-committee review.",
    limits:
      "This is not an adult transplant list with a smaller bed. Paediatric hepatology, paediatric ICU, nutrition and family lodging are part of the episode. Outcomes are not promised from adult ranges.",
    evaluation:
      "Assessment includes PELD or equivalent acuity, imaging, metabolic work-up, vaccination status, nutrition and a donor plan — living left-lateral graft or deceased reduced graft — written before travel.",
    technique:
      "The native liver is removed and a size-matched graft is implanted, often with microvascular arterial anastomosis and Roux biliary reconstruction. Paediatric ICU monitoring follows.",
    approaches: [
      { label: "Living-donor left-lateral graft", detail: "Common when a suitable adult donor and remnant already allow it." },
      { label: "Deceased reduced or split graft", detail: "Depends on offer timing and size match." },
      { label: "Combined metabolic or retransplant sitting", detail: "A different ICU and ethics conversation if that is the honest brief." },
    ],
    duration: "Often a long theatre day; microvascular and biliary work can extend the list",
    admission: "Paediatric ICU then ward; stored [STAY] is a planning band for child and caregiver, not a school-return date.",
    recovery:
      "Recovery includes graft function, feeding progression, infection watch and caregiver training for medicines. Flying requires paediatric-team clearance, not an adult night count.",
    risks:
      "Risks include vascular thrombosis, bile leak, infection, rejection, feeding difficulty, developmental impact of prolonged illness, reoperation and graft loss.",
    urgent: "fever, irritability with jaundice, bile-drain change, feeding refusal or missed immunosuppressants",
    drivers: [
      { label: "Child size and graft type", detail: "Left-lateral living grafts and reduced deceased grafts are different sittings." },
      { label: "Paediatric ICU and nutrition", detail: "Parenteral nutrition and isolation beds change the bill." },
      { label: "Prior Kasai or abdominal surgery", detail: "Adhesions extend theatre time." },
      { label: "Caregiver lodging", detail: "A second adult is usually required and is rarely inside the surgical package." },
      { label: "Vaccination and infection work-up", detail: "Delayed lists after infection are clinical, not optional upgrades." },
    ],
    inclusions: [...commonInclusions, { label: "Paediatric ICU window as written", detail: "Adult ICU substitution is not assumed." }],
    exclusions: [...commonExclusions, { label: "Caregiver living costs", detail: "Parent hotel, food and lost work are outside the graft quotation." }],
    records: ["Paediatric hepatology notes", "Kasai or prior operative notes", "Imaging and metabolic tests", "Immunisation record"],
    followUp: "Paediatric transplant follow-up covers drug levels, growth, infection prophylaxis and school or travel advice.",
    quoteQuestions: ["Is a paediatric ICU named?", "Is living-donor left-lateral work-up included?", "Are caregiver rooms included?"],
    related: ["Living Donor Liver Transplantation", "Liver Transplantation", "Liver Retransplantation"],
    campusFocus: "Name a paediatric ICU and paediatric hepatology desk on the same campus; an adult HPB list is not a child's graft.",
    imageAlts: [
      "Medical illustration of a child's liver, bile ducts and a size-matched left-lateral graft used in paediatric transplantation",
      "Clinical diagram of paediatric liver-graft implantation with microvascular arterial and Roux biliary reconstruction",
      "Paediatric liver-transplant recovery pathway showing ICU monitoring, feeding progression and caregiver medicine training",
    ],
  },
  {
    procedure: "Liver Retransplantation",
    shortName: "liver retransplantation",
    specialist: "retransplant hepatobiliary surgeon",
    definition:
      "Liver retransplantation replaces a failed liver graft with another graft when the cause of failure and a named retransplant list already allow a second implant.",
    candidacy:
      "It may be considered for selected hepatic-artery thrombosis, chronic rejection, recurrent disease or primary non-function after the committee reviews technical feasibility and infection.",
    limits:
      "This is not a first transplant and not a routine liver resection. A hostile abdomen, vascular injury and higher blood-product use are expected talking points. It is a poor first international experiment.",
    evaluation:
      "Review includes cause of graft failure, vascular imaging, infection, immunosuppression history, residual vessels and whether a living or deceased graft is even technically possible.",
    technique:
      "The failed graft is explanted, often with difficult dissection, then a new graft is implanted with whatever inflow, outflow and biliary reconstruction the remaining anatomy allows.",
    approaches: [
      { label: "Early retransplant for graft failure", detail: "Urgent sitting when primary non-function or early thrombosis is the brief." },
      { label: "Late retransplant for chronic rejection or disease", detail: "A planned but still high-resource list after infection control." },
      { label: "Living versus deceased second graft", detail: "Donor type is decided after vessel mapping, not from a cheaper package." },
    ],
    duration: "Often longer than a first transplant because of adhesions and reconstruction",
    admission: "ICU-heavy stay; stored [STAY] is a planning band for a second graft, not a first-transplant calendar.",
    recovery:
      "Recovery repeats graft-function, infection and immunosuppression monitoring on a more hostile abdomen. Travel fitness is slower to document than after an uncomplicated first graft.",
    risks:
      "Risks include massive bleeding, vascular unreconstructability, bile leak, infection, further graft loss, multi-organ failure and death. This page assigns no rates.",
    urgent: "fever, graft-enzyme spike, bleeding, bile leak or anuria",
    drivers: [
      { label: "Cause of first-graft failure", detail: "Thrombosis, rejection and recurrent disease are different ICU stories." },
      { label: "Residual vascular anatomy", detail: "Need for jump grafts or arterial conduits changes theatre time." },
      { label: "Infection and immunosuppression load", detail: "Resistant organisms and high drug levels change stay." },
      { label: "Blood-product use", detail: "A reoperative abdomen often exceeds a first-graft transfusion plan." },
      { label: "Donor type for the second graft", detail: "Living-donor ethics after one failure is a separate consent." },
    ],
    inclusions: [...commonInclusions, { label: "Reoperative transplant ICU", detail: "Only the stated second-graft window." }],
    exclusions: [...commonExclusions, { label: "Unreconstructable vessels", detail: "Intraoperative abandonment is a different episode, not a refundable tourist day." }],
    records: ["First-transplant operative note", "Cause-of-failure imaging", "Immunosuppression log", "Infection cultures"],
    followUp: "The retransplant team sets closer enzyme, drug-level and imaging intervals than a first graft.",
    quoteQuestions: ["Is arterial-conduit reconstruction assumed?", "How many blood units are budgeted?", "What happens if vessels cannot be reconstructed?"],
    related: ["Liver Transplantation", "Deceased Donor Liver Transplantation", "Living Donor Liver Transplantation"],
    campusFocus: "A second graft needs a named retransplant list and blood bank on the same campus; a first-graft brochure is not enough.",
    imageAlts: [
      "Medical illustration of a failed liver graft with thrombosed vessels and the planned second-graft anatomy",
      "Clinical diagram of explanting a failed liver graft and implanting a second graft with vascular reconstruction",
      "Liver retransplantation recovery pathway showing intensive graft monitoring, infection watch and delayed travel clearance",
    ],
  },
  {
    procedure: "Whipple Procedure (Pancreaticoduodenectomy)",
    shortName: "Whipple procedure",
    specialist: "hepatobiliary or pancreatic surgeon",
    definition:
      "The Whipple procedure is a complex operation used to treat selected diseases of the pancreas, bile duct and nearby digestive structures, including some pancreatic cancers. The pancreatic head, duodenum, gallbladder and bile-duct segment are removed and the remaining pancreas, bile duct and stomach or duodenum are reconstructed.",
    candidacy:
      "It may be considered for selected pancreatic-head, periampullary, distal-bile-duct or duodenal lesions when imaging already suggests resectability and a multidisciplinary team has reviewed stage, fitness and alternatives.",
    limits:
      "This surgical-gastroenterology sheet is not the surgical-oncology Whipple Procedure article; the clinical idea overlaps, the CMS slug does not. Whipple does not treat body-or-tail disease that belongs on distal pancreatectomy, and it does not promise cure.",
    evaluation:
      "Assessment includes pancreas-protocol CT or MRI, CA 19-9 where relevant, bilirubin drainage status, fitness for major reconstruction and whether vein involvement would change or cancel the list.",
    technique:
      "After exploration for unexpected metastases, the pancreatic head, duodenum, distal bile duct and gallbladder are removed. Pancreaticojejunostomy, hepaticojejunostomy and gastro- or duodenojejunostomy restore continuity. ICU monitoring of drain amylase and gastric emptying follows.",
    approaches: [
      { label: "Classic Whipple with antrectomy", detail: "Stomach division when that reconstruction is the honest plan." },
      { label: "Pylorus-preserving pancreaticoduodenectomy", detail: "Selected when duodenal and pyloric margins allow it." },
      { label: "Vein-resection Whipple", detail: "Portal or SMV reconstruction is a different sitting if imaging already shows abutment." },
    ],
    duration: "Often 5–8 hours, longer with vascular reconstruction",
    admission: "ICU then ward; stored [STAY] reflects a major pancreatic reconstruction, not a cholecystectomy calendar.",
    recovery:
      "Early recovery includes drain monitoring, delayed gastric emptying, stepwise diet and enzyme or glucose review. Flying requires documented drain plan, oral intake and wound review.",
    risks:
      "Risks include pancreatic or anastomotic leak, delayed gastric emptying, bleeding, infection, pancreatic insufficiency, diabetes, bile leak and need for additional intervention or reoperation.",
    urgent: "high drain output, fever, vomiting that will not settle, bleeding or sudden abdominal pain",
    drivers: [
      { label: "Tumour location and resectability", detail: "Head versus uncinate and vein abutment change theatre time." },
      { label: "Need for vascular reconstruction", detail: "Vein resection is not inside a straightforward Whipple quote." },
      { label: "Preoperative biliary drainage", detail: "ERCP or PTBD and lingering jaundice change infection risk." },
      { label: "Open versus minimally invasive approach", detail: "Laparoscopic or robotic Whipple, where offered, changes device lines." },
      { label: "Pancreatic texture and leak risk", detail: "Soft pancreas and small ducts increase drain and ICU use." },
    ],
    inclusions: [...commonInclusions, { label: "Listed pancreatic reconstruction", detail: "Pancreaticojejunostomy and biliary join as written; vein grafts are extra unless named." }],
    exclusions: [...commonExclusions, { label: "Neoadjuvant or adjuvant oncology", detail: "Chemotherapy or radiation sits on other sheets." }],
    records: ["Pancreas-protocol CT or MRI", "ERCP or PTBD notes if drained", "Pathology or EUS-FNA if already taken", "Nutrition and diabetes history"],
    followUp: "Follow-up reviews pathology, enzyme replacement, glucose, drains and whether oncology review is needed.",
    quoteQuestions: ["Is vein reconstruction assumed?", "Are pancreatic staplers and drains included?", "How many ICU nights are written?"],
    related: ["Distal Pancreatectomy", "Pancreatectomy", "Bile Duct Cancer Surgery"],
    campusFocus: "Name a fistula-aware HPB ICU and a surgeon who actually performs pancreaticoduodenectomy, not a generic GI list.",
    imageAlts: [
      "Medical illustration of the pancreatic head, bile duct, duodenum and nearby vessels involved in a Whipple procedure",
      "Clinical diagram of pancreaticoduodenectomy and reconstruction with pancreatic, biliary and intestinal anastomoses",
      "Whipple recovery pathway showing ICU drain monitoring, delayed gastric emptying review and nutrition follow-up",
    ],
  },
  {
    procedure: "Distal Pancreatectomy",
    shortName: "distal pancreatectomy",
    specialist: "hepatobiliary or pancreatic surgeon",
    definition:
      "Distal pancreatectomy removes the body and tail of the pancreas, with or without the spleen, when a lesion sits to the left of the portal vein.",
    candidacy:
      "It may be considered for selected cystic lesions, neuroendocrine tumours, distal pancreatic cancers or trauma after imaging maps the relationship to the splenic vessels and future remnant.",
    limits:
      "This is not a Whipple and not a total pancreatectomy. Spleen preservation is not always honest. It does not treat pancreatic-head disease.",
    evaluation:
      "Assessment includes pancreas-protocol imaging, lesion biology, vaccination planning if splenectomy is likely, and whether laparoscopic or robotic access is even appropriate.",
    technique:
      "The body and tail are mobilised and divided to the left of the portal vein. The spleen is preserved or removed according to vessel involvement. The pancreatic stump is closed with stapler or suture and drained as planned.",
    approaches: [
      { label: "Spleen-preserving distal pancreatectomy", detail: "Selected when splenic vessels can be spared honestly." },
      { label: "Distal pancreatectomy with splenectomy", detail: "Used when vessels or nodes require the spleen." },
      { label: "Minimally invasive distal pancreatectomy", detail: "Laparoscopic or robotic lists where anatomy and expertise allow; not automatically superior." },
    ],
    duration: "Often 2–5 hours depending on adhesions, spleen status and approach",
    admission: "Usually ward with selective ICU; stored [STAY] is shorter than a Whipple band but still not day-care.",
    recovery:
      "Recovery watches the pancreatic stump for leak, vaccine planning if the spleen was removed, and glucose or enzyme changes. Flying waits on drain output and oral intake.",
    risks:
      "Risks include pancreatic-stump leak, bleeding, infection, new diabetes, enzyme insufficiency, splenic-vein thrombosis and, after splenectomy, infection risk that needs vaccination counselling.",
    urgent: "fever, rising drain amylase, left-upper-quadrant pain or vomiting",
    drivers: [
      { label: "Spleen preservation versus splenectomy", detail: "Vaccines, energy devices and stay differ." },
      { label: "Open versus laparoscopic or robotic access", detail: "Stapler loads change the device line." },
      { label: "Lesion biology", detail: "Oncologic lymphadenectomy is not a cystic-lesion list." },
      { label: "Stump-closure method", detail: "Extra stapler cartridges or a drain week change the bill." },
      { label: "Prior left-upper-quadrant surgery", detail: "Adhesions extend theatre time." },
    ],
    inclusions: [...commonInclusions, { label: "Listed stump closure and drain", detail: "Only the stated stapler or suture method." }],
    exclusions: [...commonExclusions, { label: "Unplanned splenectomy devices", detail: "Energy devices and vaccines may be extra if not written." }],
    records: ["Pancreas-protocol CT or MRI", "EUS or pathology if available", "Vaccination record", "Diabetes history"],
    followUp: "Follow-up reviews stump leak, pathology, vaccines if the spleen was removed, and glucose or enzyme needs.",
    quoteQuestions: ["Is splenectomy assumed?", "How many stapler loads are included?", "Are post-splenectomy vaccines included?"],
    related: ["Whipple Procedure (Pancreaticoduodenectomy)", "Pancreatectomy", "Gallbladder Cancer Surgery"],
    campusFocus: "Confirm who would divide the pancreas left of the portal vein and whether the spleen is honestly in the plan.",
    imageAlts: [
      "Medical illustration of the pancreatic body and tail to the left of the portal vein, with the spleen nearby",
      "Clinical diagram of distal pancreatectomy showing division of the pancreas and optional splenectomy",
      "Distal-pancreatectomy recovery pathway showing stump-leak watch, vaccine counselling and travel clearance",
    ],
  },
  {
    procedure: "Pancreatectomy",
    shortName: "pancreatectomy",
    specialist: "hepatobiliary or pancreatic surgeon",
    definition:
      "Pancreatectomy removes part or, in selected cases, all of the pancreas when disease extent is not captured by a named Whipple or distal-pancreatectomy template.",
    candidacy:
      "It may be considered after imaging shows disease that needs a central, extended or total resection, or when a prior pancreatic operation must be revised.",
    limits:
      "This umbrella sheet is not the surgical-oncology pancreatic-surgery article and not an automatic Whipple or distal list. Total pancreatectomy creates insulin-deficient diabetes and is not a package upgrade.",
    evaluation:
      "Assessment maps whether the honest operation is Whipple, distal, central or total, and whether reconstruction, enzyme replacement and diabetes education are already required.",
    technique:
      "The named portion of pancreas is mobilised and removed. Reconstruction, if any remnant remains, joins pancreas to bowel. After total removal, biliary and intestinal joins are completed without a pancreatic anastomosis.",
    approaches: [
      { label: "Central pancreatectomy", detail: "Selected small neck lesions when both remnants can be preserved honestly." },
      { label: "Extended or multi-visceral pancreatectomy", detail: "Additional organs make a different ICU episode." },
      { label: "Total pancreatectomy", detail: "Removes the entire gland; diabetes and enzyme replacement start immediately." },
    ],
    duration: "Highly variable: a limited central resection is not a total pancreatectomy day",
    admission: "ICU use depends on extent; stored [STAY] is a mixed planning band until the named operation is written.",
    recovery:
      "Recovery follows the actual resection: remnant leak watch after partial removal, or immediate diabetes and enzyme education after total removal. Travel waits on glucose stability and oral intake.",
    risks:
      "Risks include leak from a remnant or anastomosis, bleeding, infection, new or brittle diabetes, malabsorption and need for reoperation. Total pancreatectomy adds lifelong insulin dependence.",
    urgent: "hypoglycaemia, fever, high drain output or vomiting",
    drivers: [
      { label: "Which pancreas is actually removed", detail: "Central, extended and total lists are different invoices." },
      { label: "Reconstruction versus no remnant", detail: "A pancreatic join is not present after total removal." },
      { label: "Diabetes and enzyme start-up", detail: "Education and medicines may sit outside the theatre package." },
      { label: "Combined organ resection", detail: "Stomach, colon or vessel work changes ICU nights." },
      { label: "Revision after prior pancreatic surgery", detail: "A hostile field is not a first-list price." },
    ],
    inclusions: [...commonInclusions, { label: "Named pancreatic extent", detail: "The estimate must say which part of the gland is removed." }],
    exclusions: [...commonExclusions, { label: "Lifelong diabetes supplies", detail: "Insulin and enzyme refills after return are usually personal costs." }],
    records: ["Pancreas imaging", "Prior pancreatic operative notes", "Glucose and nutrition history", "Multidisciplinary recommendation"],
    followUp: "Follow-up names the remnant or the total-pancreatectomy endocrine and exocrine plan, plus pathology review.",
    quoteQuestions: ["Which named pancreatic operation is being priced?", "Is total pancreatectomy assumed?", "Are insulin and enzyme teaching included?"],
    related: ["Whipple Procedure (Pancreaticoduodenectomy)", "Distal Pancreatectomy", "Biliary Reconstruction"],
    campusFocus: "Refuse a generic pancreatectomy package; the estimate must name Whipple, distal, central or total before anyone books flights.",
    imageAlts: [
      "Medical illustration of the whole pancreas showing head, neck, body and tail so the extent of pancreatectomy can be discussed",
      "Clinical diagram comparing central, extended and total pancreatectomy concepts",
      "Pancreatectomy recovery pathway showing remnant leak watch or diabetes and enzyme education after total removal",
    ],
  },
  {
    procedure: "Biliary Reconstruction",
    shortName: "biliary reconstruction",
    specialist: "hepatobiliary surgeon",
    definition:
      "Biliary reconstruction repairs or replaces a damaged, strictured or surgically divided bile duct, often with a hepaticojejunostomy that joins bile ducts to a Roux loop of jejunum.",
    candidacy:
      "It may be considered after bile-duct injury, selected strictures, excision of a choledochal cyst or when a cancer resection leaves ducts that cannot be joined end to end.",
    limits:
      "This is not a routine cholecystectomy and not ERCP stenting. A percutaneous drain may still be needed first. Reconstruction does not restore a perfectly normal biliary tree.",
    evaluation:
      "Assessment includes MRCP or percutaneous cholangiography, liver function, sepsis control, injury classification if post-cholecystectomy, and whether a delayed repair after drainage is safer than an immediate join.",
    technique:
      "After adhesions are cleared and healthy duct mucosa is identified, a Roux-en-Y jejunal loop is usually brought up for hepaticojejunostomy. Drains and, sometimes, anastomotic stents are placed as planned.",
    approaches: [
      { label: "Hepaticojejunostomy after injury", detail: "The usual repair when the duct cannot be joined primarily." },
      { label: "Delayed reconstruction after drainage", detail: "Sepsis and inflammation may force weeks of PTBD first." },
      { label: "Reconstruction after planned bile-duct resection", detail: "Oncologic or choledochal-cyst excision with a planned Roux join." },
    ],
    duration: "Often 3–6 hours depending on adhesions and duct number",
    admission: "Ward with selective ICU; stored [STAY] assumes a controlled join, not uncontrolled biliary sepsis.",
    recovery:
      "Recovery watches bile in the drain, liver tests and oral intake. Flying waits on drain plan and absence of uncontrolled leak or cholangitis.",
    risks:
      "Risks include bile leak, cholangitis, anastomotic stricture, bleeding, liver dysfunction, need for percutaneous drainage and reoperation.",
    urgent: "fever with jaundice, bile flooding the drain, abdominal pain or shaking chills",
    drivers: [
      { label: "Injury level or number of ducts", detail: "High hilar injuries are not a mid-duct join." },
      { label: "Sepsis and preoperative drainage", detail: "PTBD weeks change the episode before theatre." },
      { label: "Timing of repair", detail: "Immediate versus delayed reconstruction are different resource stories." },
      { label: "Prior open biliary surgery", detail: "A hostile porta hepatis extends theatre time." },
      { label: "Need for liver resection", detail: "Combined hepatectomy belongs on another sheet if that is the honest plan." },
    ],
    inclusions: [...commonInclusions, { label: "Listed Roux biliary join", detail: "Only the stated hepaticojejunostomy; extra ducts or stents may be extra." }],
    exclusions: [...commonExclusions, { label: "Unplanned hepatectomy", detail: "A different CMS procedure if a lobe must come out." }],
    records: ["MRCP or percutaneous cholangiogram", "Injury or operative notes", "Liver-function trend", "Drain or ERCP history"],
    followUp: "Follow-up reviews liver tests, cholangitis symptoms and whether imaging of the join is needed.",
    quoteQuestions: ["Is delayed repair after PTBD assumed?", "How many duct orifices are being joined?", "Is a percutaneous drain included?"],
    related: ["Bile Duct Cancer Surgery", "Gallbladder Cancer Surgery", "Whipple Procedure (Pancreaticoduodenectomy)"],
    campusFocus: "Name an HPB surgeon who reconstructs bile ducts and an interventional radiology desk that can drain a leak.",
    imageAlts: [
      "Medical illustration of the bile ducts and porta hepatis showing a stricture or injury that may need biliary reconstruction",
      "Clinical diagram of hepaticojejunostomy joining hepatic ducts to a Roux loop of jejunum",
      "Biliary-reconstruction recovery pathway showing bile-drain monitoring, liver-test review and cholangitis watch",
    ],
  },
  {
    procedure: "Gallbladder Cancer Surgery",
    shortName: "gallbladder cancer surgery",
    specialist: "hepatobiliary or GI oncology surgeon",
    definition:
      "Gallbladder cancer surgery removes the gallbladder with a rim or segment of adjacent liver and regional nodes when staging already suggests the disease is resectable.",
    candidacy:
      "It may be considered when imaging and, if already performed, cholecystectomy pathology show a tumour that a multidisciplinary team judges operable, without distant metastases that would cancel resection.",
    limits:
      "This is not a simple laparoscopic cholecystectomy for stones. Port-site excision, liver-bed resection and node dissection are decided after staging. It does not replace chemotherapy when that is the honest next step.",
    evaluation:
      "Assessment includes liver-protocol CT or MRI, tumour markers where used, residual gallbladder fossa review after a prior cholecystectomy, and fitness for liver-bed resection.",
    technique:
      "A radical cholecystectomy removes the gallbladder, a wedge or anatomical portion of segments IVb/V and selected nodes. Bile-duct excision is added only if the cystic duct or common duct is involved.",
    approaches: [
      { label: "Radical cholecystectomy with liver-bed resection", detail: "The usual oncologic sitting when the fossa is involved." },
      { label: "Completion surgery after incidental finding", detail: "Reoperation after a stone cholecystectomy when pathology shows cancer." },
      { label: "Extended resection with bile-duct excision", detail: "A different HPB episode if the duct is involved." },
    ],
    duration: "Often 3–6 hours depending on prior surgery and duct involvement",
    admission: "Ward with selective ICU; stored [STAY] is longer than stone cholecystectomy.",
    recovery:
      "Recovery includes liver-bed drain watch, pathology review and discussion of adjuvant treatment. Flying waits on drain output and wound review.",
    risks:
      "Risks include bleeding, bile leak, liver dysfunction, infection, bile-duct injury, incomplete clearance and need for further oncology treatment.",
    urgent: "bile in the drain, fever, jaundice or bleeding",
    drivers: [
      { label: "Incidental versus planned cancer operation", detail: "Completion surgery after a prior cholecystectomy is a reoperative abdomen." },
      { label: "Extent of liver-bed resection", detail: "A wedge is not an anatomical IVb/V resection." },
      { label: "Bile-duct excision", detail: "Adds reconstruction and leak risk." },
      { label: "Node dissection and pathology", detail: "Frozen section can change the sitting." },
      { label: "Open versus minimally invasive approach", detail: "Oncologic laparoscopy is not a stone-gallbladder package." },
    ],
    inclusions: [...commonInclusions, { label: "Listed liver-bed resection", detail: "Only the stated liver volume and node plan." }],
    exclusions: [...commonExclusions, { label: "Adjuvant chemotherapy", detail: "Medical-oncology treatment sits on another sheet." }],
    records: ["Staging CT or MRI", "Prior cholecystectomy and pathology if incidental", "Liver-function tests", "Multidisciplinary notes"],
    followUp: "Pathology, drain plan and whether medical or radiation oncology should review are named before departure.",
    quoteQuestions: ["Is liver-bed resection included?", "Is bile-duct excision assumed?", "Is this completion surgery after a prior cholecystectomy?"],
    related: ["Bile Duct Cancer Surgery", "Biliary Reconstruction", "Distal Pancreatectomy"],
    campusFocus: "Confirm an HPB or GI-oncology list that actually resects gallbladder cancer, not a stone-cholecystectomy day-care tariff.",
    imageAlts: [
      "Medical illustration of the gallbladder, liver bed of segments IVb and V, and nearby bile duct involved in gallbladder cancer surgery",
      "Clinical diagram of radical cholecystectomy with liver-bed resection and regional node sampling",
      "Gallbladder-cancer surgery recovery pathway showing drain monitoring, pathology review and oncology follow-up discussion",
    ],
  },
  {
    procedure: "Bile Duct Cancer Surgery",
    shortName: "bile duct cancer surgery",
    specialist: "hepatobiliary or bile-duct cancer surgeon",
    definition:
      "Bile duct cancer surgery resects cholangiocarcinoma of the extrahepatic or hilar ducts when future-liver remnant and vascular anatomy already allow reconstruction.",
    candidacy:
      "It may be considered after MRCP or cholangiography, staging and jaundice control when a multidisciplinary team judges the ductal tumour resectable.",
    limits:
      "This is not ERCP stenting and not a Whipple unless the lesion sits at the lower duct and pancreaticoduodenectomy is the honest operation. Unresectable hilar disease may need drainage only.",
    evaluation:
      "Assessment includes the Bismuth level, future-liver remnant, portal-vein or artery involvement, need for preoperative drainage or embolization, and fitness for major hepatectomy plus biliary reconstruction.",
    technique:
      "The involved duct segment is removed with an appropriate liver volume when the hilum is involved, then hepaticojejunostomy restores bile flow. Frozen section of duct margins may extend the resection.",
    approaches: [
      { label: "Mid-duct excision with hepaticojejunostomy", detail: "Selected extrahepatic tumours without major hepatectomy." },
      { label: "Hilar resection with hemihepatectomy", detail: "The usual sitting for many Klatskin tumours after remnant planning." },
      { label: "Lower-duct disease requiring Whipple", detail: "Belongs on the pancreaticoduodenectomy sheet if that is the honest operation." },
    ],
    duration: "Often 5–10 hours when hepatectomy and reconstruction are combined",
    admission: "ICU-capable stay; stored [STAY] assumes major HPB reconstruction, not a stent exchange.",
    recovery:
      "Recovery watches remnant function, bile leak, infection and nutrition. Flying waits on liver tests, drain plan and jaundice trend.",
    risks:
      "Risks include liver failure, bile leak, vascular injury, infection, bleeding, incomplete margin and need for percutaneous drainage or reoperation.",
    urgent: "deepening jaundice, fever, bile leak or confusion from liver dysfunction",
    drivers: [
      { label: "Bismuth level and remnant volume", detail: "A mid-duct excision is not a right trisectionectomy." },
      { label: "Preoperative drainage or portal embolization", detail: "Weeks of preparation change the trip, not only the theatre day." },
      { label: "Vascular reconstruction", detail: "Portal-vein resection is a different sitting." },
      { label: "Jaundice and cholangitis control", detail: "Operating in uncontrolled sepsis is a different risk conversation." },
      { label: "Pathology and frozen-section extensions", detail: "A longer duct or more liver may be removed after the first cut." },
    ],
    inclusions: [...commonInclusions, { label: "Listed duct and liver resection", detail: "Only the stated remnant plan and Roux join." }],
    exclusions: [...commonExclusions, { label: "Preoperative portal embolization", detail: "A separate interventional episode if required." }],
    records: ["MRCP or percutaneous cholangiogram", "Future-liver-remnant imaging", "ERCP or PTBD notes", "Staging and tumour-marker file"],
    followUp: "Follow-up reviews remnant function, pathology margins and whether oncology or interventional drainage is still needed.",
    quoteQuestions: ["Is major hepatectomy assumed?", "Is preoperative drainage included?", "What remnant volume is being planned?"],
    related: ["Biliary Reconstruction", "Whipple Procedure (Pancreaticoduodenectomy)", "Gallbladder Cancer Surgery"],
    campusFocus: "Name an HPB list that resects cholangiocarcinoma and can drain a remnant leak; a stent clinic is not this operation.",
    imageAlts: [
      "Medical illustration of extrahepatic and hilar bile ducts showing a cholangiocarcinoma and the future liver remnant",
      "Clinical diagram of bile-duct resection with hepaticojejunostomy and optional hemihepatectomy",
      "Bile-duct cancer surgery recovery pathway showing remnant-function checks, bile-leak watch and oncology review",
    ],
  },
  {
    procedure: "Anti-Reflux Surgery (Nissen Fundoplication)",
    shortName: "Nissen fundoplication",
    specialist: "foregut or anti-reflux surgeon",
    definition:
      "Anti-reflux surgery with Nissen fundoplication wraps the gastric fundus around the lower oesophagus to restore a barrier against reflux after manometry and pH testing already support an operation.",
    candidacy:
      "It may be considered for objectively confirmed gastro-oesophageal reflux that persists despite medicines, or for selected patients who cannot stay on long-term acid suppression, after a named foregut assessment.",
    limits:
      "This is not endoscopic POEM, not a hiatal-hernia sheet by itself, and not a weight-loss operation. A wrap does not treat every chest pain and can cause gas-bloat or dysphagia.",
    evaluation:
      "Assessment includes endoscopy, high-resolution manometry, pH or pH-impedance testing and a look at hiatus anatomy. A wrap without motility data is not the honest plan on this sheet.",
    technique:
      "Usually laparoscopically, the hiatus is assessed, any hernia reduced, crura approximated and a 360-degree fundus wrap constructed around the lower oesophagus. A bougie or calibration method may be used as the surgeon prefers.",
    approaches: [
      { label: "Laparoscopic Nissen (360°) wrap", detail: "The named CMS operation when motility allows a complete wrap." },
      { label: "Partial wrap if motility is impaired", detail: "A Toupet or Dor-type wrap is a different technical choice if manometry forbids 360°." },
      { label: "Open revision fundoplication", detail: "Prior wrap failure or hostile abdomen is not a first laparoscopic package." },
    ],
    duration: "Often 1.5–3 hours for a first laparoscopic wrap",
    admission: "Usually a short stay; stored [STAY] is not a same-day tourist wrap.",
    recovery:
      "Early recovery uses a staged soft diet, watches swallow and gas-bloat, and avoids heavy lifting. Flying waits on oral intake and the team's dysphagia advice.",
    risks:
      "Risks include wrap herniation, dysphagia, gas-bloat, inability to belch or vomit, bleeding, infection, viscus injury, wrap disruption and need for dilation or revision.",
    urgent: "inability to swallow saliva, severe chest or abdominal pain, fever or vomiting that will not settle",
    drivers: [
      { label: "Manometry and pH findings", detail: "A wrap without objective reflux work-up is a different, less honest episode." },
      { label: "Hiatus-hernia size", detail: "A large hernia repair is not a slim Nissen." },
      { label: "Primary versus revision wrap", detail: "Redo fundoplication is a reoperative mediastinum." },
      { label: "Mesh at the hiatus", detail: "Only if written; mesh is not automatic." },
      { label: "Open versus laparoscopic or robotic access", detail: "Device lines change; superiority is not claimed." },
    ],
    inclusions: [...commonInclusions, { label: "Listed wrap and crural repair", detail: "Only the stated fundoplication; extra mesh or revision work is extra." }],
    exclusions: [...commonExclusions, { label: "Unplanned myotomy or POEM", detail: "Achalasia surgery is a different CMS procedure." }],
    records: ["Endoscopy report", "Manometry", "pH or pH-impedance study", "Prior anti-reflux or bariatric notes"],
    followUp: "Follow-up reviews swallow, reflux symptoms, diet progression and whether a wrap complication needs imaging.",
    quoteQuestions: ["Are manometry and pH included?", "Is hiatus mesh assumed?", "Is this a first wrap or a revision?"],
    related: ["Hiatal Hernia Surgery", "Heller Myotomy for Achalasia", "Gastric Bypass Surgery"],
    campusFocus: "Name a foregut list that reads manometry; an endoscopy unit that performs POEM is a different specialty sheet.",
    imageAlts: [
      "Medical illustration of the gastro-oesophageal junction, fundus and hiatus involved in Nissen fundoplication",
      "Clinical diagram of a 360-degree fundus wrap around the lower oesophagus after crural repair",
      "Nissen fundoplication recovery pathway showing staged soft diet, swallow review and activity limits",
    ],
  },
  {
    procedure: "Hiatal Hernia Surgery",
    shortName: "hiatal hernia surgery",
    specialist: "foregut or hiatal-hernia surgeon",
    definition:
      "Hiatal hernia surgery reduces stomach or other viscera from the chest back into the abdomen and repairs the diaphragmatic hiatus, often with an anti-reflux wrap when reflux physiology supports it.",
    candidacy:
      "It may be considered for a symptomatic sliding or para-oesophageal hernia — including selected volvulus risk, anaemia or reflux — after imaging and a named foregut review.",
    limits:
      "This is not a groin hernia repair and not an automatic Nissen. Mesh versus suture and wrap versus no wrap are decided after anatomy and motility, not from a package name. The CMS currently has no verified clinician cards for this slug.",
    evaluation:
      "Assessment includes contrast swallow or CT, endoscopy, and manometry if a wrap is planned. Acute incarceration is a different emergency episode.",
    technique:
      "The hernia is reduced, the sac is managed as planned, crura are approximated, and a fundoplication may be added. Mesh is used only if the team judges the hiatus needs it.",
    approaches: [
      { label: "Laparoscopic hiatal repair", detail: "Usual first approach when the mediastinum can be dissected safely." },
      { label: "Para-oesophageal hernia repair", detail: "A larger mediastinal dissection than a small sliding hernia." },
      { label: "Open or revisional hiatal repair", detail: "Giant hernias, mesh complications or recurrence are not first-list prices." },
    ],
    duration: "Often 2–5 hours depending on hernia size and revision status",
    admission: "Short to moderate stay; stored [STAY] lengthens if the hernia was giant or acute.",
    recovery:
      "Recovery uses a staged diet, watches dysphagia and recurrence symptoms, and limits lifting. Flying waits on swallow and wound review.",
    risks:
      "Risks include recurrence, dysphagia, wrap or mesh problems, pneumothorax, viscus injury, bleeding, infection and need for revision.",
    urgent: "sudden chest pain, inability to swallow, vomiting, fever or breathing difficulty",
    drivers: [
      { label: "Sliding versus para-oesophageal anatomy", detail: "A giant type III or IV hernia is not a small sliding defect." },
      { label: "Primary versus recurrent hernia", detail: "Re-do mediastinal dissection changes time and risk." },
      { label: "Mesh use", detail: "Mesh is a device line and a complication conversation, not a default upgrade." },
      { label: "Added fundoplication", detail: "A wrap needs motility data and extra theatre time." },
      { label: "Acute volvulus or obstruction", detail: "Emergency lists are not elective packages." },
    ],
    inclusions: [...commonInclusions, { label: "Listed hiatal repair", detail: "Only the stated reduction and crural repair." }],
    exclusions: [...commonExclusions, { label: "Unplanned gastrectomy", detail: "Ischaemic stomach is a different sitting." }],
    records: ["Contrast swallow or CT", "Endoscopy", "Manometry if a wrap is planned", "Prior hiatal or bariatric notes"],
    followUp: "Follow-up reviews swallow, reflux, recurrence symptoms and mesh or wrap concerns if used.",
    quoteQuestions: ["Is mesh included?", "Is a fundoplication assumed?", "Is this a para-oesophageal or sliding hernia repair?"],
    related: ["Anti-Reflux Surgery (Nissen Fundoplication)", "Heller Myotomy for Achalasia", "Gastric Bypass Surgery"],
    campusFocus: "Cards may stay empty until a verified hiatal-hernia mapping exists; do not borrow a generic hernia or Nissen card.",
    imageAlts: [
      "Medical illustration of a hiatal hernia with stomach migrating through the diaphragmatic hiatus into the chest",
      "Clinical diagram of hiatal hernia reduction, crural repair and optional fundoplication",
      "Hiatal-hernia surgery recovery pathway showing staged diet, swallow review and lifting restrictions",
    ],
  },
  {
    procedure: "Heller Myotomy for Achalasia",
    shortName: "Heller myotomy",
    specialist: "foregut or achalasia surgeon",
    definition:
      "Heller myotomy divides the tight lower-oesophageal sphincter muscle through an abdominal approach so swallowed food can enter the stomach in selected achalasia.",
    candidacy:
      "It may be considered when high-resolution manometry confirms achalasia and a clinician judges that surgical myotomy, rather than endoscopic POEM or pneumatic dilation, is the honest next step.",
    limits:
      "This is not POEM — that lives on the Gastroenterology sheet — and not a Nissen performed for reflux alone. A partial wrap is often added to limit reflux; it does not restore perfectly normal swallowing. The CMS currently has no verified clinician cards for this slug.",
    evaluation:
      "Assessment includes timed barium swallow, endoscopy to exclude pseudoachalasia, Chicago-classification manometry and a discussion of POEM versus Heller versus dilation.",
    technique:
      "Usually laparoscopically, the circular muscle at the oesophagogastric junction is divided onto the stomach for a planned distance. A partial Dor or Toupet fundoplication is often constructed to reduce reflux.",
    approaches: [
      { label: "Laparoscopic Heller myotomy with partial wrap", detail: "The usual surgical sitting when abdominal access is chosen." },
      { label: "Heller myotomy without wrap", detail: "Selected after prior surgery or when a wrap is judged unwise." },
      { label: "Revisional myotomy after failed dilation or POEM", detail: "A hostile junction is not a first Heller package." },
    ],
    duration: "Often 1.5–3 hours for a first laparoscopic myotomy",
    admission: "Usually a short stay; stored [STAY] is not a same-day tourist myotomy.",
    recovery:
      "Recovery uses a staged diet, watches leak and reflux, and reviews swallow. Flying waits on oral intake and the team's leak check.",
    risks:
      "Risks include mucosal perforation, leak, reflux, residual dysphagia, bleeding, infection and need for further dilation, POEM or revision.",
    urgent: "fever, chest or abdominal pain, inability to swallow saliva or vomiting blood",
    drivers: [
      { label: "Chicago classification and prior treatment", detail: "Type III achalasia and prior POEM change the conversation." },
      { label: "Partial wrap versus no wrap", detail: "A Dor or Toupet adds theatre time and a reflux discussion." },
      { label: "Mucosal perforation repair", detail: "An unexpected hole changes drains and stay." },
      { label: "Open versus laparoscopic access", detail: "Revisions may need an open field." },
      { label: "Need for later endoscopy", detail: "POEM remains a different specialty sheet if that is the honest alternative." },
    ],
    inclusions: [...commonInclusions, { label: "Listed myotomy and wrap", detail: "Only the stated muscle division and named partial wrap." }],
    exclusions: [...commonExclusions, { label: "Unplanned oesophageal resection", detail: "End-stage mega-oesophagus is a different operation." }],
    records: ["High-resolution manometry", "Timed barium swallow", "Endoscopy", "Prior dilation or POEM notes"],
    followUp: "Follow-up reviews swallow, reflux, weight and whether further motility treatment is needed.",
    quoteQuestions: ["Is a partial wrap included?", "Has POEM been discussed as an alternative?", "What happens if the mucosa is opened?"],
    related: ["Anti-Reflux Surgery (Nissen Fundoplication)", "Hiatal Hernia Surgery", "Gastric Bypass Surgery"],
    campusFocus: "Cards may stay empty until a verified Heller mapping exists; do not borrow a POEM or Nissen card.",
    imageAlts: [
      "Medical illustration of a tight lower-oesophageal sphincter in achalasia with the planned Heller myotomy line",
      "Clinical diagram of laparoscopic Heller myotomy dividing circular muscle and adding a partial fundoplication",
      "Heller myotomy recovery pathway showing leak check, staged diet and swallow follow-up",
    ],
  },
  {
    procedure: "Colorectal Cancer Surgery",
    shortName: "colorectal cancer surgery",
    specialist: "colorectal or GI oncology surgeon",
    definition:
      "Colorectal cancer surgery removes the affected portion of the colon or rectum and may involve reconstruction or a temporary or permanent stoma depending on the disease and operation.",
    candidacy:
      "It may be considered when colonoscopy, staging and a multidisciplinary team already support resection of an operable colon or rectal primary.",
    limits:
      "This umbrella sheet is not the named LAR, APR, TME or surgical-oncology rectal-cancer articles. It does not promise sphincter salvage or that adjuvant treatment will be unnecessary.",
    evaluation:
      "Assessment includes complete colonoscopy when possible, CT staging, MRI for rectal tumours, CEA where used, fitness for anastomosis versus stoma, and whether neoadjuvant treatment should come first.",
    technique:
      "The involved bowel is mobilised with its lymphovascular pedicle, divided, and joined or brought out as a stoma. Rectal cases may require TME-plane dissection. Approach may be open, laparoscopic or robotic.",
    approaches: [
      { label: "Colon cancer resection with anastomosis", detail: "Right, left or sigmoid sitting when a join is honest." },
      { label: "Rectal resection with TME principles", detail: "Height on MRI decides LAR versus APR more than a package name." },
      { label: "Emergency obstruction or perforation surgery", detail: "A different stoma-heavy episode, not an elective oncology list." },
    ],
    duration: "Often 2–6 hours depending on site, adhesions and reconstruction",
    admission: "Ward with selective ICU; stored [STAY] covers bowel recovery, not a day-care tariff.",
    recovery:
      "Recovery includes ileus watch, diet progression, wound and, if present, stoma teaching. Flying waits on bowel function, stoma independence and wound review.",
    risks:
      "Risks include anastomotic leak, ileus, obstruction, bleeding, infection, stoma complications, urinary or sexual-function change after pelvic dissection and need for reoperation or further oncology treatment.",
    urgent: "fever, severe abdominal pain, stoma that stops working, heavy bleeding or vomiting",
    drivers: [
      { label: "Colon versus rectum and tumour height", detail: "A right colectomy is not a low rectal TME." },
      { label: "Anastomosis versus stoma", detail: "A permanent or diverting stoma changes stay and supplies." },
      { label: "Neoadjuvant radiation or chemotherapy", detail: "Timing and tissue quality change the sitting." },
      { label: "Open versus laparoscopic or robotic access", detail: "Device lines change; superiority is not claimed." },
      { label: "Emergency versus elective presentation", detail: "Obstruction or perforation is not an elective quote." },
    ],
    inclusions: [...commonInclusions, { label: "Listed bowel resection and join or stoma", detail: "Only the stated reconstruction; extra staplers or an unplanned stoma may be extra." }],
    exclusions: [...commonExclusions, { label: "Long-term stoma supplies and adjuvant treatment", detail: "Appliances, chemotherapy and radiation sit outside most theatre packages." }],
    records: ["Colonoscopy and pathology", "Staging CT and rectal MRI if relevant", "CEA and prior oncology notes", "Previous abdominal surgery notes"],
    followUp: "Follow-up reviews pathology, stoma or anastomosis function and whether medical or radiation oncology should see the patient.",
    quoteQuestions: ["Is a stoma assumed?", "Is this colon or rectal surgery?", "Are circular staplers included?"],
    related: ["Colorectal Resection", "Low Anterior Resection (LAR)", "Abdominoperineal Resection (APR)"],
    campusFocus: "Name a colorectal list that can create and teach a stoma; a generic GI-surgery brand is not a tumour-height plan.",
    imageAlts: [
      "Medical illustration of the colon and rectum showing a tumour location that may require colorectal cancer surgery",
      "Clinical diagram of bowel resection, lymphovascular pedicle and anastomosis or stoma reconstruction",
      "Colorectal-cancer surgery recovery pathway showing ileus watch, diet progression and stoma teaching where relevant",
    ],
  },
  {
    procedure: "Colorectal Resection",
    shortName: "colorectal resection",
    specialist: "colorectal or GI surgeon",
    definition:
      "Colorectal resection removes a segment of colon or rectum for selected cancer, diverticular disease, inflammatory-bowel complications or another named indication, then joins the bowel or forms a stoma.",
    candidacy:
      "It may be considered when imaging and endoscopy already show a segment that cannot be managed with medicines or endoscopic treatment alone.",
    limits:
      "This is not automatically a cancer operation and not a named LAR or APR. Diverticular and IBD sittings have different nutrition and stoma conversations. It does not promise that a join will be possible.",
    evaluation:
      "Assessment includes the indication — cancer, diverticulitis, IBD, volvulus or ischaemia — plus fitness for anastomosis, steroid or biologic exposure and prior abdominal surgery.",
    technique:
      "The diseased segment is mobilised and removed. An anastomosis or stoma is constructed according to contamination, nutrition and height. Approach may be open or minimally invasive.",
    approaches: [
      { label: "Segmental colectomy with anastomosis", detail: "When contamination and nutrition already allow a join." },
      { label: "Hartmann or other stoma-forming resection", detail: "Used when a join would be unsafe." },
      { label: "IBD or revisional resection", detail: "Prior laparotomy and medicines change leak risk and stay." },
    ],
    duration: "Often 2–5 hours depending on adhesions and indication",
    admission: "Usually several ward nights; stored [STAY] lengthens after sepsis or a new stoma.",
    recovery:
      "Recovery follows bowel function, wound and stoma teaching if created. Flying waits on diet, stoma independence and absence of leak signs.",
    risks:
      "Risks include leak, abscess, ileus, bleeding, infection, stoma complications, injury to ureter or other structures and need for reoperation.",
    urgent: "fever, abdominal rigidity, stoma necrosis or cessation, or vomiting",
    drivers: [
      { label: "Indication — cancer, diverticular disease or IBD", detail: "Sepsis and steroids change the invoice." },
      { label: "Primary anastomosis versus stoma", detail: "A Hartmann sitting is not an elective join." },
      { label: "Elective versus emergency", detail: "Perforation lists use more ICU and antibiotics." },
      { label: "Prior abdominal surgery", detail: "Adhesiolysis extends theatre time." },
      { label: "Approach and stapler use", detail: "Laparoscopic or robotic access changes device lines." },
    ],
    inclusions: [...commonInclusions, { label: "Listed segmental resection", detail: "Only the stated segment and reconstruction." }],
    exclusions: [...commonExclusions, { label: "Later stoma reversal", detail: "Reversal is a separate CMS procedure if it ever becomes appropriate." }],
    records: ["Colonoscopy or imaging of the segment", "Pathology if already taken", "IBD medicine list if relevant", "Prior operative notes"],
    followUp: "Follow-up reviews pathology or IBD plan, anastomosis or stoma function and whether reversal will ever be discussed.",
    quoteQuestions: ["Is this cancer or benign disease?", "Is a stoma assumed?", "Is later reversal included?"],
    related: ["Colorectal Cancer Surgery", "Ostomy / Stoma Surgery", "Low Anterior Resection (LAR)"],
    campusFocus: "Confirm the indication on the estimate — cancer, diverticular disease or IBD — before anyone treats this as a single package.",
    imageAlts: [
      "Medical illustration of a diseased colon or rectum segment prepared for colorectal resection",
      "Clinical diagram of segmental bowel resection with anastomosis or Hartmann stoma",
      "Colorectal-resection recovery pathway showing bowel-function return, wound care and optional stoma teaching",
    ],
  },
  {
    procedure: "Low Anterior Resection (LAR)",
    shortName: "low anterior resection",
    specialist: "colorectal or rectal-cancer surgeon",
    definition:
      "Low anterior resection removes the rectum while preserving the anal sphincter, joining descending colon to the remaining rectal cuff or anal canal, often after total mesorectal excision.",
    candidacy:
      "It may be considered for selected mid or low rectal cancers when height, sphincter function and staging already allow a join rather than a permanent stoma.",
    limits:
      "LAR is not APR and not a promise of normal bowel function. A diverting ileostomy is common and is a separate teaching conversation. Neighbouring surgical-oncology rectal-cancer and TME sheets share the clinical idea under different slugs.",
    evaluation:
      "Assessment includes colonoscopy, pelvic MRI for height and CRM, staging CT, sphincter function and whether neoadjuvant chemoradiation should precede surgery.",
    technique:
      "The rectum is mobilised in the TME plane, divided below the tumour, and a stapled or hand-sewn anastomosis is created. A diverting loop ileostomy is often added to protect a low join.",
    approaches: [
      { label: "LAR with diverting ileostomy", detail: "Common for low anastomoses; reversal is a later operation." },
      { label: "LAR without diversion", detail: "Selected higher joins when leak risk is judged acceptable." },
      { label: "Ultra-low or intersphincteric reconstruction", detail: "A different function conversation, not a menu upgrade." },
    ],
    duration: "Often 3–6 hours depending on pelvis, radiation and approach",
    admission: "Several ward nights; stored [STAY] includes stoma teaching when a diverting ileostomy is used.",
    recovery:
      "Recovery includes ileus watch, low-anterior-resection syndrome counselling, stoma care if diverted, and pelvic drain review. Flying waits on stoma independence and leak watch.",
    risks:
      "Risks include anastomotic leak, pelvic abscess, bleeding, ileus, stoma complications, urinary or sexual-function change, low-anterior-resection syndrome and need for a permanent stoma.",
    urgent: "fever, pelvic pain, cloudy drain fluid, stoma that stops working or heavy rectal bleeding",
    drivers: [
      { label: "Tumour height on MRI", detail: "A mid-rectal join is not an ultra-low anastomosis." },
      { label: "Diverting stoma", detail: "Ileostomy teaching and later reversal are extra episodes if not written." },
      { label: "Neoadjuvant radiation", detail: "Irradiated pelvises change leak risk and theatre time." },
      { label: "Open versus laparoscopic or robotic TME", detail: "Device lines change; quality of mesorectum matters more than access marketing." },
      { label: "Prior pelvic surgery", detail: "A hostile pelvis is not a first LAR price." },
    ],
    inclusions: [...commonInclusions, { label: "Listed rectal anastomosis", detail: "Circular stapler and named diversion only if written." }],
    exclusions: [...commonExclusions, { label: "Ileostomy reversal", detail: "A later sitting unless the same estimate names it." }],
    records: ["Pelvic MRI", "Colonoscopy and pathology", "Staging CT", "Neoadjuvant treatment notes if any"],
    followUp: "Follow-up reviews pathology, stoma or anastomosis function, LARS symptoms and oncology review.",
    quoteQuestions: ["Is a diverting ileostomy assumed?", "Is ileostomy reversal included?", "Was neoadjuvant treatment already given?"],
    related: ["Total Mesorectal Excision (TME)", "Ostomy / Stoma Surgery", "Abdominoperineal Resection (APR)"],
    campusFocus: "Name a rectal-cancer list that can teach a diverting ileostomy; sphincter salvage is a height decision, not a city slogan.",
    imageAlts: [
      "Medical illustration of the rectum and sphincter showing a mid or low tumour suitable for low anterior resection",
      "Clinical diagram of rectal resection, stapled anastomosis and optional diverting ileostomy",
      "LAR recovery pathway showing leak watch, stoma teaching and bowel-function counselling",
    ],
  },
  {
    procedure: "Abdominoperineal Resection (APR)",
    shortName: "abdominoperineal resection",
    specialist: "colorectal or rectal-cancer surgeon",
    definition:
      "Abdominoperineal resection removes the rectum and anus when sphincter salvage is not honest, leaving a permanent end colostomy and a perineal wound.",
    candidacy:
      "It may be considered for selected very low rectal cancers, recurrent disease involving the sphincter, or other conditions where a safe anastomosis cannot be constructed.",
    limits:
      "APR is not LAR. A permanent stoma is the reconstruction, not a temporary inconvenience. This page does not rank sphincter-preserving alternatives as morally superior.",
    evaluation:
      "Assessment includes pelvic MRI, colonoscopy, staging, sphincter involvement and a stoma-therapy review before travel so the permanent colostomy is understood, not discovered after the perineal wound.",
    technique:
      "The rectum is mobilised from above, often in an extralevator plane when indicated, and the anus and sphincter complex are removed from the perineum. An end colostomy is matured and the perineal wound is closed or reconstructed.",
    approaches: [
      { label: "Standard APR with end colostomy", detail: "The usual sitting when the sphincter cannot be restored." },
      { label: "Extralevator APR", detail: "A wider perineal resection for selected low tumours." },
      { label: "APR with flap reconstruction of the perineum", detail: "A plastic-surgery add-on if the defect needs it." },
    ],
    duration: "Often 3–7 hours depending on pelvis, radiation and perineal reconstruction",
    admission: "Longer than many colon resections; stored [STAY] includes stoma teaching and perineal-wound care.",
    recovery:
      "Recovery includes two wounds — abdomen and perineum — plus permanent colostomy teaching. Sitting, flying and sexual-function counselling are individualized. Travel waits on wound and stoma independence.",
    risks:
      "Risks include perineal-wound breakdown, pelvic abscess, bleeding, stoma complications, urinary or sexual-function change, hernia and need for further oncology treatment.",
    urgent: "perineal wound opening, fever, stoma retraction or necrosis, or heavy bleeding",
    drivers: [
      { label: "Sphincter and pelvic-floor involvement", detail: "Extralevator work is not a standard perineal disc." },
      { label: "Neoadjuvant radiation", detail: "Irradiated perineums heal slowly and may need flaps." },
      { label: "Flap versus primary perineal closure", detail: "Plastic-surgery time is a different invoice." },
      { label: "Permanent stoma education", detail: "Appliances after discharge are rarely inside the theatre package." },
      { label: "Open versus minimally invasive abdominal phase", detail: "The perineal phase still creates a second wound." },
    ],
    inclusions: [...commonInclusions, { label: "Listed permanent colostomy and perineal closure", detail: "Flap reconstruction only if named." }],
    exclusions: [...commonExclusions, { label: "Long-term stoma appliances and flap revision", detail: "Home supplies and later wound surgery are usually extra." }],
    records: ["Pelvic MRI showing sphincter relationship", "Colonoscopy and pathology", "Radiation notes if given", "Stoma-therapy counselling record"],
    followUp: "Follow-up reviews the perineal wound, colostomy, pathology and oncology plan.",
    quoteQuestions: ["Is a plastic-surgery flap assumed?", "Are home stoma supplies included?", "Has permanent-stoma teaching happened before travel?"],
    related: ["Low Anterior Resection (LAR)", "Ostomy / Stoma Surgery", "Total Mesorectal Excision (TME)"],
    campusFocus: "Confirm stoma therapy and perineal-wound support on the same campus before booking a short hotel stay.",
    imageAlts: [
      "Medical illustration of a very low rectal tumour involving the anal sphincter, showing why APR may be considered",
      "Clinical diagram of abdominoperineal resection with permanent end colostomy and perineal wound",
      "APR recovery pathway showing perineal-wound care, permanent stoma teaching and delayed travel clearance",
    ],
  },
  {
    procedure: "Total Mesorectal Excision (TME)",
    shortName: "total mesorectal excision",
    specialist: "colorectal or rectal-cancer surgeon",
    definition:
      "Total mesorectal excision is the anatomical plane used in rectal-cancer surgery to remove the rectum with its mesorectal fat and nodes as an intact package.",
    candidacy:
      "It may be considered whenever a rectal cancer operation is planned and quality of the mesorectal plane — not only bowel continuity — is the oncologic product.",
    limits:
      "TME is a plane, not a consumer upgrade on LAR or APR. It does not decide sphincter salvage by itself. Neighbouring LAR, APR and surgical-oncology rectal-cancer sheets describe the named reconstructions.",
    evaluation:
      "Assessment is the rectal-cancer work-up: MRI for CRM and height, colonoscopy, staging and whether neoadjuvant treatment should precede a high-quality TME.",
    technique:
      "Dissection follows the mesorectal fascia to the planned distal margin. The specimen is inspected for completeness. Reconstruction then follows as LAR or, if sphincters cannot be saved, APR.",
    approaches: [
      { label: "TME with sphincter-preserving reconstruction", detail: "Usually reported as LAR when height allows a join." },
      { label: "TME as part of APR", detail: "The same plane with a permanent stoma when salvage is not honest." },
      { label: "Open, laparoscopic or robotic TME", detail: "Access is a tool; incomplete mesorectum is not excused by a robot." },
    ],
    duration: "Often 3–6 hours as part of the named rectal resection",
    admission: "Follows the reconstruction — LAR or APR — not a separate day-care TME tariff.",
    recovery:
      "Recovery follows the reconstruction and any stoma. Pathology will comment on mesorectal completeness. Flying waits on bowel or stoma function and wound review.",
    risks:
      "Risks are those of pelvic rectal surgery: leak or perineal breakdown depending on reconstruction, nerve injury affecting bladder or sexual function, bleeding, infection and incomplete mesorectum requiring further treatment discussion.",
    urgent: "fever, pelvic pain, stoma failure or inability to pass urine",
    drivers: [
      { label: "Which reconstruction sits on the TME plane", detail: "LAR and APR bills are not interchangeable." },
      { label: "MRI CRM and neoadjuvant treatment", detail: "Threatened margins change timing and tissue quality." },
      { label: "Quality of mesorectum as the product", detail: "A partial mesorectal excision for a high tumour is a different sitting." },
      { label: "Pelvic-nerve preservation effort", detail: "Time in a narrow pelvis is not a cosmetic extra." },
      { label: "Access platform", detail: "Robotic time is a device line, not a completeness guarantee." },
    ],
    inclusions: [...commonInclusions, { label: "Listed TME-plane rectal resection", detail: "The estimate must still name LAR or APR reconstruction." }],
    exclusions: [...commonExclusions, { label: "A second named reconstruction", detail: "Do not pay twice for TME plus LAR unless two sittings are truly planned." }],
    records: ["Pelvic MRI", "Colonoscopy and pathology", "Staging CT", "Named reconstruction plan — LAR or APR"],
    followUp: "Pathology should report mesorectal completeness, nodes and margins; oncology and stoma follow-up follow the reconstruction.",
    quoteQuestions: ["Is the reconstruction LAR or APR?", "Will pathology report mesorectal completeness?", "Is neoadjuvant treatment already complete?"],
    related: ["Low Anterior Resection (LAR)", "Abdominoperineal Resection (APR)", "Colorectal Cancer Surgery"],
    campusFocus: "Ask for the reconstruction name on the same line as TME; a plane without LAR or APR is not a bookable package.",
    imageAlts: [
      "Medical illustration of the rectum and mesorectal fascia showing the total mesorectal excision plane",
      "Clinical diagram of TME dissection around an intact mesorectal package before LAR or APR reconstruction",
      "TME recovery pathway showing pathology review of mesorectal completeness, pelvic-function review and travel clearance",
    ],
  },
  {
    procedure: "Ostomy / Stoma Surgery",
    shortName: "ostomy or stoma surgery",
    specialist: "colorectal surgeon or stoma surgeon",
    definition:
      "Ostomy or stoma surgery brings a loop or end of bowel through the abdominal wall so stool can leave into an appliance when diversion or permanent interruption of the gut is the honest operation.",
    candidacy:
      "It may be considered for protection of a low anastomosis, obstruction, perforation, IBD, incontinence or after APR, or when an existing stoma needs revision or reversal assessment.",
    limits:
      "This is not automatically a reversal. Loop ileostomy, end colostomy and revision are different sittings. Appliances are a lifelong or months-long cost after many lists.",
    evaluation:
      "Assessment includes the reason for diversion, site marking by a stoma therapist, nutrition, and whether this is formation, revision or a later reversal conversation.",
    technique:
      "A marked site is opened, the chosen bowel is matured as a loop or end stoma, and the appliance is fitted before discharge teaching. Reversal, if ever appropriate, is a separate join.",
    approaches: [
      { label: "Loop ileostomy or colostomy", detail: "Often temporary protection of a distal join." },
      { label: "End stoma", detail: "Often permanent after APR or a Hartmann procedure." },
      { label: "Stoma revision or reversal", detail: "A later sitting; reversal is never promised on a formation quote." },
    ],
    duration: "Formation alone may be 1–2 hours; combined resection lists follow the parent operation",
    admission: "Stored [STAY] assumes teaching time, not only theatre minutes.",
    recovery:
      "Recovery is appliance independence: output, skin care and when to seek help. Flying waits on a stable appliance and the team's dehydration advice.",
    risks:
      "Risks include retraction, necrosis, stenosis, hernia, high-output dehydration, skin breakdown, obstruction and need for revision. Reversal has leak risk of its own.",
    urgent: "dusky or black stoma, high output with dizziness, severe skin breakdown or obstruction",
    drivers: [
      { label: "Formation versus revision versus reversal", detail: "Three different invoices share this CMS name." },
      { label: "Ileostomy versus colostomy", detail: "Output and supply costs differ." },
      { label: "Combined resection", detail: "A stoma added to LAR or Hartmann is not a standalone day-case." },
      { label: "Stoma-therapy teaching and supplies", detail: "Home appliances are often excluded." },
      { label: "Parastomal hernia or hostile abdomen", detail: "Revision mesh work is a different sitting." },
    ],
    inclusions: [...commonInclusions, { label: "Listed stoma formation or named revision", detail: "Only the stated loop or end; reversal is extra unless written." }],
    exclusions: [...commonExclusions, { label: "Home appliances and reversal", detail: "Months of bags and a later join are usually personal or separate bills." }],
    records: ["Indication notes — leak protection, obstruction, IBD or APR", "Site-marking record", "Prior stoma or resection notes", "Nutrition labs"],
    followUp: "Follow-up reviews appliance fit, output, skin and whether reversal will ever be appropriate.",
    quoteQuestions: ["Is this formation, revision or reversal?", "How many days of appliances are included?", "Is stoma-therapy teaching included?"],
    related: ["Low Anterior Resection (LAR)", "Abdominoperineal Resection (APR)", "Colorectal Resection"],
    campusFocus: "Name a stoma therapist on the treating campus; a theatre that can 'make a bag' without teaching is not this sheet.",
    imageAlts: [
      "Medical illustration of ileostomy and colostomy sites on the abdominal wall with bowel brought through the rectus",
      "Clinical diagram of loop versus end stoma maturation and appliance placement",
      "Stoma-surgery recovery pathway showing appliance teaching, skin-care review and dehydration watch",
    ],
  },
  {
    procedure: "Gastric Bypass Surgery",
    shortName: "gastric bypass surgery",
    specialist: "bariatric or metabolic GI surgeon",
    definition:
      "Gastric bypass surgery creates a small gastric pouch and connects it to a Roux or one-anastomosis jejunal limb so food bypasses most of the stomach and the first small bowel.",
    candidacy:
      "It may be considered for selected obesity or metabolic disease when a surgical-gastroenterology or bariatric team already judges that a bypass, rather than sleeve or medical therapy, is the honest operation.",
    limits:
      "This surgical-gastroenterology slug is not the Bariatric Surgery Roux-en-Y article and not a sleeve gastrectomy. It does not promise a weight number or diabetes remission. Revision after a prior sleeve or band is a different sitting.",
    evaluation:
      "Assessment includes BMI and comorbidity review, endoscopy, nutrition and psychology screening as used by the named programme, and whether a hiatus hernia should be repaired at the same time.",
    technique:
      "A pouch is stapled from the upper stomach. A Roux-en-Y or one-anastomosis limb is joined to the pouch, and bowel measurements are recorded. Leak testing is performed as planned. Long-term vitamin follow-up starts before discharge.",
    approaches: [
      { label: "Roux-en-Y gastric bypass", detail: "Two joins — gastrojejunostomy and jejunojejunostomy — when that is the named plan." },
      { label: "One-anastomosis or mini-gastric bypass", detail: "A different bile-reflux conversation and CMS-neighbouring bariatric slug." },
      { label: "Revisional bypass after prior bariatric surgery", detail: "A hostile stomach is not a first-bypass package." },
    ],
    duration: "Often 1.5–4 hours depending on adhesions and whether this is a revision",
    admission: "Usually a short stay; stored [STAY] still requires leak watch and diet teaching.",
    recovery:
      "Recovery uses a staged liquid-to-puree diet, watches leak and thrombosis, and starts vitamin supplementation. Flying waits on oral fluids, wound review and the team's dumping-symptom advice.",
    risks:
      "Risks include leak, bleeding, stricture, internal hernia, dumping, ulcer, nutritional deficiency, gallstones, weight regain and need for revision. No page promises a weight outcome.",
    urgent: "fever, tachycardia, vomiting that will not settle, chest pain or calf swelling",
    drivers: [
      { label: "Primary versus revisional bypass", detail: "Prior sleeve, band or bypass changes stapler load and risk." },
      { label: "Roux-en-Y versus one-anastomosis construction", detail: "Limb lengths and bile-reflux counselling differ." },
      { label: "BMI and comorbidity", detail: "OSA, diabetes and VTE risk change ICU and stay." },
      { label: "Stapler and reinforcement devices", detail: "Loads are a material line on most quotes." },
      { label: "Concurrent hiatal repair", detail: "A hernia repair is extra if not written." },
    ],
    inclusions: [...commonInclusions, { label: "Listed stapled bypass", detail: "Only the named limb construction and stated stapler loads." }],
    exclusions: [...commonExclusions, { label: "Lifelong vitamins and later revision", detail: "Supplements and weight-regain surgery are outside most packages." }],
    records: ["Weight and comorbidity history", "Endoscopy", "Prior bariatric operative notes if any", "Nutrition laboratory panel"],
    followUp: "Follow-up is nutritional: vitamins, protein, dumping symptoms, and whether the local bariatric or GI team will own long-term care.",
    quoteQuestions: ["Is this Roux-en-Y or one-anastomosis?", "How many stapler loads are included?", "Are vitamins and dietitian visits included?"],
    related: ["Anti-Reflux Surgery (Nissen Fundoplication)", "Hiatal Hernia Surgery", "Heller Myotomy for Achalasia"],
    campusFocus: "Confirm this is the surgical-gastroenterology bypass slug, not the bariatric Roux-en-Y sheet, and name who owns lifelong nutrition.",
    imageAlts: [
      "Medical illustration of the stomach and small bowel before gastric bypass, showing the planned pouch and Roux limb",
      "Clinical diagram of gastric-pouch creation and gastrojejunal anastomosis used in gastric bypass surgery",
      "Gastric-bypass recovery pathway showing leak watch, staged diet and long-term vitamin follow-up",
    ],
  },
];

export const SURGICAL_GASTRO_EXCLUSIVE_PROCEDURES = profiles.map((profile) => profile.procedure);

export const surgicalGastroenterologyArticles = profiles.map(createSgArticle);

export const surgicalGastroenterologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  surgicalGastroenterologyArticles.map((article) => [article.slug, article]),
);