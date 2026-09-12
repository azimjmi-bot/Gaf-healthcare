import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { HEMATOLOGY_PROCEDURES } from "../../lib/taxonomy";
import { medicalOncologyArticles } from "./medical-oncology";

type HematologyProfile = {
  procedure: string;
  shortName: string;
  briefName: string;
  slug: string;
  specialist: string;
  definition: string;
  indication: string;
  limits: string;
  evaluation: string;
  process: string;
  setting: string;
  duration: string;
  recovery: string;
  travel: string;
  followUp: string;
  risks: string;
  urgent: string;
  approaches: LabelledDetail[];
  drivers: LabelledDetail[];
  inclusions: LabelledDetail[];
  exclusions: LabelledDetail[];
  records: string[];
  timeline: LabelledDetail[];
  quoteQuestions: string[];
  related: string[];
  figureAlt: string;
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; logistics: string; environment: string; lodging: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    logistics:
      "Delhi, Gurugram, Noida and Faridabad are separate care corridors. Confirm the transplant or procedure campus before choosing accommodation; a cross-NCR journey is unsuitable during neutropenia or immediately after sedation.",
    environment:
      "Winter air pollution and seasonal respiratory infections deserve explicit discussion for an immunocompromised patient. The treating team may advise indoor recovery, masking and transport that avoids crowds.",
    lodging:
      "Use flexible lodging close to the named campus, with a private bathroom and reliable food hygiene when prolonged outpatient monitoring is required.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    logistics:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic and monsoon disruption can interfere with timed blood tests, donor collection or urgent return to the transplant unit.",
    environment:
      "Humidity and monsoon travel complicate line care and daily attendance; this is a practical planning issue, not evidence that outcomes differ by city.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and ask how quickly the patient must be able to return for fever or bleeding.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    logistics:
      "The airport is far from several hospital districts, and cross-city traffic can make a short map distance a long clinical delay. Book only after the exact haematology campus is named.",
    environment:
      "Milder weather does not remove infection precautions or the need for rapid access to a blood bank, apheresis service or transplant ward.",
    lodging:
      "Choose lift-accessible accommodation near the treating campus, not an airport hotel, and verify cooking, cleaning and caregiver arrangements for the outpatient phase.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    logistics:
      "Several hospital districts have relatively direct airport access, but heat, humidity and travel after sedation or conditioning still require a planned vehicle and a nearby caregiver.",
    environment:
      "Hydration, food safety and line protection in hot weather should follow the unit's instructions. Climate is not a substitute for infection-control advice.",
    lodging:
      "Air-conditioned, flexible accommodation near the named unit is more useful than a distant leisure stay, particularly when blood counts are checked frequently.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    logistics:
      "The airport is south of major hospital districts. Jubilee Hills, Kondapur and Secunderabad create different emergency-return journeys, so confirm the campus before booking.",
    environment:
      "Summer heat can worsen fatigue and dehydration during conditioning or count recovery. Transport and indoor recovery should be arranged around the clinical schedule.",
    lodging:
      "Keep a caregiver and flexible lodging within the response radius specified by the unit; an airport-road hotel may be too far for urgent assessment.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India value is a planning band. A named Hematology specialist must review diagnosis, disease status, donor or graft details and organ fitness before a case-specific quotation.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Protocol- and recovery-dependent",
    positioning: "Private international-care market",
    context:
      "Confirm donor work, graft procurement, laboratory testing, ward isolation, complications and outpatient monitoring rather than comparing a headline package.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Protocol- and recovery-dependent",
    positioning: "Private international hospitals",
    context:
      "International-patient support does not establish transplant eligibility, donor availability, laboratory scope or a safe handover after return.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Protocol- and recovery-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for some families, while professional fees, graft services, medicines and complication care may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Protocol- and recovery-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Request an international self-pay estimate tied to the diagnosis, protocol and donor or specimen work rather than a general haematology package.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Protocol- and recovery-dependent",
    positioning: "European elective specialist care",
    context:
      "Eligibility, donor-registry access, professional billing and post-treatment arrangements vary and must be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Protocol- and recovery-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should verify acceptance, donor or laboratory access, quote boundaries and who provides follow-up after discharge.",
  },
  {
    country: "United States",
    stay: "Protocol- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Hospital, specialist, donor, laboratory and pharmacy charges may be billed separately; [US_COST] is a comparison range, not one bundled quotation.",
  },
];

function makeCities(profile: HematologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const transplant = /transplant/i.test(profile.procedure);
    const procedureLogistics = transplant
      ? `${profile.briefName} requires a written admission plan, a caregiver and rapid access to the transplant unit during the aplastic and early recovery periods.`
      : `${profile.briefName} is usually a planned diagnostic sitting, but sedation, platelet count, anticoagulants and the route for urgent post-procedure advice must be confirmed.`;
    const gap =
      `Only live directory relationships that tag ${profile.procedure} should populate ${place.city} specialist and hospital cards. ` +
      "An empty card area is a catalog gap, not a ranking or evidence that the service is unavailable.";

    return {
      citySlug,
      ecosystem:
        `${place.city} has broader Hematology services, but this article does not infer that every listed centre performs ${profile.shortName}. ${gap}`,
      logistics: `${place.airport}: ${place.logistics} ${place.environment}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as a national planning range until a named hospital issues an itemized estimate; it is not a guaranteed package.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Hematology Care`,
        seoDescription:
          `${profile.briefName} cost in ${place.city} uses the [INDIA_COST] India planning range. Review eligibility, quote scope, Hematology specialists and travel logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or a final hospital quotation.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.logistics} ${procedureLogistics}`,
          `${place.environment} ${place.lodging}`,
          gap,
          "Send complete records for remote review before making non-refundable arrangements; acceptance can change after examination, repeat testing or donor review.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored for broad travel planning. Neither token promises eligibility, admission length or a final bill.`,
          `${profile.process} ${profile.setting}`,
        ],
        costExplanation: [
          `The estimate changes with ${profile.drivers
            .slice(0, 4)
            .map((driver) => driver.label.toLowerCase())
            .join(", ")}. These are clinical differences, not consumer upgrades.`,
          `Ask the hospital to identify the ${profile.specialist}, exact campus, protocol, included laboratory or graft work, ward allowance, complication policy and follow-up.`,
          `Budget separately for travel through ${place.airport}, ${place.lodging.toLowerCase()} Keep return travel flexible until the treating team confirms fitness.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send the diagnosis, treatment history and ${transplant ? "HLA, donor and graft-source information" : "blood counts, coagulation results and marrow-testing request"} before travel to ${place.city}.`,
          `Arrive only after written clinical acceptance and a named ${profile.specialist}; ${procedureLogistics}`,
          `${profile.travel} ${place.lodging}`,
        ],
        hospitalDiscussion: [
          gap,
          `Confirm the named ${profile.specialist}, exact campus, emergency pathway and itemized scope. General accreditation does not prove current transplant capacity, donor-registry access or haematopathology turnaround.`,
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. There is no verified ${place.city}-only tariff in this article; an itemized hospital estimate follows specialist record review.`,
          },
          {
            q: `Which ${place.city} specialist should review ${profile.shortName}?`,
            a: `A ${profile.specialist} should lead or review the case. Cards must match this exact procedure dynamically; placement is not a ranking.`,
          },
          {
            q: `Where should the patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.logistics}`,
          },
          {
            q: "When can the patient fly home?",
            a: profile.travel,
          },
          {
            q: "What must the written estimate state?",
            a: `It should identify the procedure, named specialist, clinical assumptions, included tests or graft work, medicines, ward or day-care allowance, exclusions and complication policy.`,
          },
        ],
      },
    };
  });
}

function createHematologyArticle(profile: HematologyProfile): CostArticle {
  const approachNames = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Hematology Treatment & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Compare eligibility, procedure-specific quote scope, Hematology specialists, risks and travel planning.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored India planning range is [INDIA_COST]; a ${profile.specialist} must confirm eligibility and issue a case-specific plan.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.process} ${profile.setting}`,
      "The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for broad travel planning. These are comparison tokens, not medical acceptance, an outcome forecast or a hospital quotation.",
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored stay is [STAY], but the actual episode depends on eligibility, the procedure-specific plan, complications and discharge criteria.`,
      `${profile.process} ${profile.duration}. A written estimate should use the exact procedure name and state its clinical assumptions.`,
      `${profile.setting} ${profile.travel}`,
    ],
    indiaCost: [
      `The [INDIA_COST] value is the stored national planning range for ${profile.shortName}. It may cover only the items expressly named in a hospital letter and does not establish a tariff for any city or provider.`,
      `Important drivers include ${profile.drivers
        .map((driver) => driver.label.toLowerCase())
        .join(", ")}. A changed donor, graft, conditioning plan, laboratory work-up or complication can describe a materially different episode.`,
      "Do not divide the national range into invented city prices. Compare itemized estimates after record review, and budget travel, caregiver lodging and care after return separately.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two estimates for ${profile.shortName} may not describe the same clinical pathway. Compare eligibility assumptions, ${profile.drivers
        .slice(0, 4)
        .map((driver) => driver.label.toLowerCase())
        .join(", ")}, included medicines or laboratory work, ward limits and complication terms line by line. A higher quote does not prove a better outcome.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Clinical pathways related to ${profile.briefName}`,
      intro: [
        `${profile.limits} The alternatives below are selected clinically, not as price upgrades.`,
        `A ${profile.specialist} should explain why the proposed pathway fits the diagnosis and what finding could change it.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from diagnosis, fitness and laboratory findings",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Considered?`,
    overview: {
      what: [profile.definition, profile.process, profile.limits],
      who: [profile.indication, profile.evaluation],
      how: [
        profile.process,
        `Related approaches include ${approachNames}; they are not interchangeable package labels.`,
        `${profile.setting} ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        `The receiving ${profile.specialist} should review the complete files, reconcile medicines and explain consent, alternatives and what could postpone or cancel the procedure.`,
        "Report fever, active infection, new bleeding, breathing difficulty or a material change in condition promptly; urgent local care should not be delayed for travel.",
      ],
      recovery: [
        `${profile.recovery} ${profile.followUp}`,
        `The catalog stay of [STAY] is a planning aid, not a discharge promise. ${profile.travel}`,
        profile.risks,
        `Seek urgent clinical help for ${profile.urgent}. Follow the treating team's own emergency thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "risks-and-safety",
        heading: `Risks and safety considerations for ${profile.briefName}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and does not assign likelihood. Individual risks depend on diagnosis, current blood counts, comorbidity and the actual protocol.",
          `A ${profile.specialist} must discuss alternatives, uncertainty and the signs that need urgent assessment; no page can promise success or an uncomplicated recovery.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget extends beyond [INDIA_COST]. Include record review, tests outside the letter, companion travel, lodging, medicines, complication contingency and follow-up at home.`,
        "Travel should follow written clinical acceptance. A visa invitation or directory profile is not medical clearance.",
      ],
      stages: profile.timeline,
    },
    journey: [
      { label: "Send complete records", detail: profile.records.join("; ") + "." },
      {
        label: "Obtain specialist acceptance",
        detail: `A named ${profile.specialist} confirms whether the proposed procedure and travel are reasonable from the available evidence.`,
      },
      {
        label: "Clarify alternatives and uncertainty",
        detail: `${profile.limits} Ask what new result could change or cancel the plan.`,
      },
      {
        label: "Compare itemized estimates",
        detail: "Use the same clinical assumptions and compare laboratory, pharmacy, ward, professional and complication terms.",
      },
      {
        label: "Plan flexible travel",
        detail: "Arrange documents, a capable caregiver when required, refundable travel and accommodation close to the exact campus.",
      },
      {
        label: "Repeat assessment after arrival",
        detail: profile.evaluation,
      },
      {
        label: "Complete the planned procedure",
        detail: profile.process,
      },
      {
        label: "Monitor recovery",
        detail: `${profile.recovery} ${profile.urgent} require prompt review.`,
      },
      {
        label: "Receive discharge records",
        detail: "Carry the procedure summary, laboratory or pathology results, medicine list, emergency contacts and follow-up schedule.",
      },
      {
        label: "Continue care at home",
        detail: profile.followUp,
      },
    ],
    documents: profile.records,
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF ranges. Other country rows are modelled relative private-care bands, not official tariffs or proof that a centre will accept the case.",
      "International comparisons are unreliable unless diagnosis, donor or specimen work, protocol, ward scope, medicines and complication coverage match.",
    ],
    destinationNote:
      "All values are planning information. Disease status, donor or graft source, testing, medicines, complications, currency and length of stay can change the final amount; no row predicts safety or outcome.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad use [INDIA_COST] because no verified city tariffs are stored. Their overlays address different airport, commute, climate and caregiver logistics without inventing local prices.",
      "Specialist and hospital cards must resolve from current procedure relationships. This article names no provider and makes no ranking, volume, accreditation or outcome claim.",
    ],
    whyIndia: [
      `Some international patients compare India for access to a named ${profile.specialist} and a self-pay planning range below typical United States figures. Price alone is not a reason to travel.`,
      "Clinical acceptance, exact quote scope, emergency capacity, caregiver logistics and continuity after return need direct confirmation.",
      "Urgent illness, uncontrolled infection, lack of a safe caregiver plan or funded appropriate care near home may make international travel unsuitable.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered now, and what alternatives were discussed?`,
      "Which diagnosis, pathology or laboratory result drives the recommendation?",
      `Who is the named ${profile.specialist} responsible for the plan?`,
      "At which exact campus will each stage occur?",
      "What could postpone, change or cancel the procedure after arrival?",
      "Does the quotation use the exact procedure name and clinical assumptions?",
      "Which consultations, laboratory tests and imaging are included?",
      "Which medicines, blood products and supportive care are included?",
      "How many day-care visits or ward nights are allowed?",
      "How are intensive care, infection, bleeding and an extended stay billed?",
      "Which professional, laboratory, pharmacy or donor charges are separate?",
      "What caregiver presence and nearby accommodation are required?",
      "What emergency symptoms require return to the unit?",
      "Who provides care if the patient becomes unwell after returning home?",
      "When is fitness to fly assessed, and must return travel remain flexible?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a quote; eligibility, the exact pathway and hospital terms determine the final amount.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.indication },
      { q: "Who may not be ready for this procedure?", a: profile.limits },
      { q: "What records are needed before acceptance?", a: profile.evaluation },
      { q: "What happens during the procedure?", a: profile.process },
      { q: `How long does ${profile.shortName} take?`, a: `${profile.duration}. The stored [STAY] is only a travel-planning guide.` },
      { q: "Is admission required?", a: profile.setting },
      { q: "What are the important risks?", a: profile.risks },
      {
        q: "What can change the hospital estimate?",
        a: `Key drivers include ${profile.drivers.map((driver) => driver.label.toLowerCase()).join(", ")}.`,
      },
      { q: "When can an international patient fly home?", a: profile.travel },
      { q: "What follow-up is needed?", a: profile.followUp },
    ],
    doctorHeading: `${profile.specialist}s for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} ${profile.specialist}s in [CITY]`,
    doctorIntro:
      `Profiles must be drawn dynamically only when ${profile.procedure} appears in current procedure relationships. Verify the clinician's Hematology role, responsibility for this pathway, availability and campus. Placement is not a ranking or an experience or outcome claim.`,
    hospitalHeading: `Hematology hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hematology hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards should follow live entity relationships. A general oncology or accreditation label does not establish current transplant beds, apheresis, donor access, haematopathology scope, ICU support or outcomes.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/hematology/${profile.slug}-illustration.webp`,
        alt: profile.figureAlt,
        caption: "A general educational illustration, not a patient-specific treatment recommendation or outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/hematology/hematology-treatment-pathway.webp",
        alt: `Records review, specialist assessment, procedure and recovery pathway for ${profile.shortName}`,
        caption: "The actual sequence depends on diagnosis, eligibility and the treating Hematology team's protocol.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/hematology/hematology-international-journey.webp",
        alt: `International record review, travel, Hematology care and follow-up journey for ${profile.shortName}`,
        caption: "Written clinical acceptance precedes travel, and fitness to fly is assessed individually.",
        fit: "contain",
      },
    ],
  };
}

const profiles: HematologyProfile[] = [
  {
    procedure: "Autologous Stem Cell Transplant",
    shortName: "autologous stem cell transplant",
    briefName: "Autologous Stem Cell Transplant",
    slug: "autologous-stem-cell-transplant",
    specialist: "Transplant hematologist",
    definition:
      "An autologous stem cell transplant collects and cryopreserves the patient's own blood-forming stem cells, gives high-dose chemotherapy, then returns those cells to restore marrow production.",
    indication:
      "It may consolidate response in selected myeloma or lymphoma pathways and is also used for certain other protocol-defined diseases when disease control and organ fitness are adequate.",
    limits:
      "It is not suitable merely because cells can be collected. Progressive disease, inadequate collection, active infection or organ dysfunction may require delay, another strategy or care near home.",
    evaluation:
      "Review includes diagnosis and response imaging, prior regimens, marrow reserve, cardiac, lung, kidney and liver assessment, infection screening, dental review where required and an apheresis collection plan.",
    process:
      "Stem cells are mobilised with medicines, collected by apheresis and frozen. After high-dose conditioning, the thawed cells are infused; blood counts then fall before engraftment.",
    setting:
      "Collection is usually outpatient, while conditioning and the neutropenic period may be inpatient or closely supervised ambulatory care with immediate admission access.",
    duration: "mobilisation and collection take days, followed by conditioning, infusion and commonly two to three weeks to initial count recovery",
    recovery:
      "Fatigue, appetite and immune recovery continue after engraftment; blood counts, infection risk and organ effects determine discharge rather than a fixed package day.",
    travel:
      "Long-haul travel waits for count recovery, clinical stability and explicit clearance. The patient should not book departure for the day neutrophils first rise.",
    followUp:
      "The transplant team monitors counts, infection, medicines and disease response, then hands care to a local hematologist with vaccination and survivorship plans.",
    risks:
      "Important risks include severe infection during neutropenia, mucositis, nausea, diarrhoea, bleeding, organ toxicity, infertility and failure or delay of count recovery. Autologous grafts do not cause graft-versus-host disease.",
    urgent: "fever, rigors, uncontrolled diarrhoea or vomiting, bleeding, chest pain, breathlessness or new confusion",
    approaches: [
      { label: "Peripheral-blood autograft", detail: "The usual graft source after successful mobilisation and apheresis." },
      { label: "Additional mobilisation or plerixafor", detail: "Considered when predicted or actual stem-cell yield is inadequate." },
      { label: "Non-transplant consolidation", detail: "A clinical alternative when disease response, collection or fitness does not support high-dose therapy." },
    ],
    drivers: [
      { label: "Mobilisation and collection yield", detail: "Extra apheresis days or rescue mobilisation changes the episode." },
      { label: "Conditioning regimen", detail: "Diagnosis-specific high-dose therapy changes medicines and monitoring." },
      { label: "Cryopreservation and cell processing", detail: "Collection, testing, freezing and storage must be itemized." },
      { label: "Neutropenic ward and engraftment time", detail: "Delayed count recovery adds nights and supportive care." },
      { label: "Infection, transfusion or ICU support", detail: "Complications are not predictable package add-ons." },
    ],
    inclusions: [
      { label: "Transplant eligibility assessment", detail: "Disease response, organ function and infection review as stated." },
      { label: "Mobilisation and quoted apheresis sessions", detail: "Named medicines and collection-day allowance." },
      { label: "Cell processing and cryopreservation", detail: "Testing, freezing and storage period only when written." },
      { label: "Conditioning and stem-cell infusion", detail: "The named regimen, pharmacy and infusion episode." },
      { label: "Quoted transplant stay and monitoring", detail: "Blood counts, stated blood products and routine supportive care within defined limits." },
    ],
    exclusions: [
      { label: "Failed or repeat mobilisation", detail: "Additional medicines and collection days unless expressly included." },
      { label: "Disease therapy before transplant", detail: "Salvage or bridging treatment needed to reach response." },
      { label: "Critical care and major infection treatment", detail: "ICU, prolonged antimicrobials or organ support outside the allowance." },
      { label: "Extended cryostorage", detail: "Storage beyond the quoted interval and disposal arrangements." },
      { label: "Later maintenance and revaccination", detail: "Post-transplant medicines, vaccines and surveillance after the included visits." },
    ],
    records: ["Complete pathology and disease-response imaging", "All prior regimens and toxicities", "Recent marrow and blood counts", "Organ-function and infection-screen results", "Any previous stem-cell collection report"],
    timeline: [
      { label: "Eligibility and response review", detail: "Confirm disease indication, response, organ fitness and infection status." },
      { label: "Mobilisation", detail: "Growth factor with or without chemotherapy and plerixafor according to collection risk." },
      { label: "Apheresis and freezing", detail: "Collect until the protocol target is met, test and cryopreserve the autograft." },
      { label: "Conditioning and infusion", detail: "Give high-dose therapy, then reinfuse the patient's thawed cells." },
      { label: "Aplasia and engraftment", detail: "Provide infection precautions, transfusions and symptom support while counts recover." },
      { label: "Discharge and handover", detail: "Confirm stability, medicines, emergency thresholds, vaccination and disease follow-up." },
    ],
    quoteQuestions: [
      "Which mobilisation medicines and how many apheresis days are included?",
      "What CD34 collection target is planned and what happens if it is not reached?",
      "How long is cryostorage included?",
      "Which conditioning regimen is priced?",
      "Which transfusions and antimicrobial prophylaxis are included?",
      "What count and clinical criteria govern discharge?",
    ],
    related: ["Stem Cell Transplantation", "Bone Marrow Transplantation", "Bone Marrow Biopsy"],
    figureAlt: "Medical illustration of a patient's stem cells being collected, cryopreserved and returned after high-dose conditioning",
  },
  {
    procedure: "Allogeneic Stem Cell Transplant",
    shortName: "allogeneic stem cell transplant",
    briefName: "Allogeneic Stem Cell Transplant",
    slug: "allogeneic-stem-cell-transplant",
    specialist: "Transplant hematologist",
    definition:
      "An allogeneic stem cell transplant replaces blood formation with stem cells from another person after conditioning and adds a donor immune effect against selected blood cancers or marrow disorders.",
    indication:
      "It may be considered for selected acute leukaemias, myelodysplastic syndromes, marrow-failure disorders and other high-risk haematological diseases after disease, donor and fitness review.",
    limits:
      "A donor match alone is not an indication. Uncontrolled infection, refractory disease, major organ impairment or lack of safe long-term follow-up can make transplant unsafe or require a different plan.",
    evaluation:
      "Work-up includes disease genetics and remission status, high-resolution HLA typing, donor health and infectious screening, organ testing, psychosocial and caregiver assessment and a graft-versus-host disease prevention plan.",
    process:
      "After conditioning, donor peripheral-blood or marrow cells are infused. Immunosuppression supports engraftment and limits graft-versus-host disease while infection surveillance continues.",
    setting:
      "This is a transplant-unit episode with protective precautions and rapid ICU, blood-bank, microbiology and specialist access; outpatient phases still require residence near the unit.",
    duration: "donor work-up precedes conditioning and infusion, followed by several weeks to engraftment and months of close immune and GVHD monitoring",
    recovery:
      "Blood-count recovery is only the first milestone. Immune reconstitution, graft-versus-host disease, viral reactivation and immunosuppressant management continue for months.",
    travel:
      "Return requires stable engraftment, controlled complications, reliable medicines and a receiving transplant clinician. A fixed six-week flight can be medically unrealistic.",
    followUp:
      "Serial chimerism, disease assessment, infection surveillance, immunosuppressant levels, GVHD review and later vaccination require a written shared-care plan.",
    risks:
      "Risks include graft failure, severe infection, acute or chronic graft-versus-host disease, viral reactivation, organ toxicity, relapse, infertility and treatment-related death.",
    urgent: "fever, rash, jaundice, persistent diarrhoea, mouth or eye dryness, breathing difficulty, bleeding or inability to take immunosuppressants",
    approaches: [
      { label: "Matched related donor transplant", detail: "A suitably HLA-matched family donor after independent donor assessment." },
      { label: "Matched unrelated donor transplant", detail: "Registry search and donor procurement add distinct timing and charges." },
      { label: "Alternative-donor transplant", detail: "Haploidentical or cord strategies use different graft and GVHD-prevention assumptions." },
    ],
    drivers: [
      { label: "Donor type and HLA work-up", detail: "Related, unrelated and alternative donors require different searches and testing." },
      { label: "Graft source and procurement", detail: "Peripheral blood, marrow and cord products have different collection logistics." },
      { label: "Conditioning intensity", detail: "Myeloablative and reduced-intensity regimens differ in pharmacy and toxicity." },
      { label: "GVHD prophylaxis and monitoring", detail: "Medicines, levels and cellular manipulation must be explicit." },
      { label: "Engraftment, infection and complication care", detail: "Length of stay and high-cost supportive care vary substantially." },
    ],
    inclusions: [
      { label: "Recipient eligibility work-up", detail: "Disease, organ, infection and psychosocial assessment as quoted." },
      { label: "Quoted donor testing", detail: "Specified HLA, health and infectious testing for the proposed donor." },
      { label: "Graft collection and processing", detail: "Only the source, collection and laboratory work stated." },
      { label: "Conditioning, infusion and GVHD prevention", detail: "Named regimens and stated pharmacy allowance." },
      { label: "Transplant ward and routine surveillance", detail: "Defined nights, counts, drug levels and infection tests." },
    ],
    exclusions: [
      { label: "Unrelated-donor registry procurement", detail: "Search, confirmatory typing and international courier fees unless named." },
      { label: "Therapy needed to reach remission", detail: "Bridging or salvage treatment before conditioning." },
      { label: "Major GVHD or infection treatment", detail: "Prolonged admission, advanced antimicrobials or second-line immunosuppression." },
      { label: "Graft failure or second donation", detail: "Repeat collection, boost or second transplant." },
      { label: "Long-term immunosuppression and survivorship", detail: "Medicines, vaccines and late-effect care after the included interval." },
    ],
    records: ["Full pathology, cytogenetics and molecular results", "Response marrow and imaging", "Complete treatment and infection history", "Recipient HLA typing and any donor reports", "Organ-function tests and current medicines"],
    timeline: [
      { label: "Disease and fitness review", detail: "Confirm indication, disease control, comorbidity and alternatives." },
      { label: "Donor selection", detail: "Complete high-resolution HLA typing, donor assessment and graft-source choice." },
      { label: "Conditioning", detail: "Deliver the disease- and fitness-appropriate preparative regimen." },
      { label: "Graft infusion", detail: "Infuse the tested donor product and begin the planned GVHD prophylaxis." },
      { label: "Engraftment and surveillance", detail: "Monitor counts, chimerism, infection, organ effects and acute GVHD." },
      { label: "Long-term shared care", detail: "Manage immune suppression, chronic GVHD, relapse surveillance and revaccination." },
    ],
    quoteQuestions: [
      "Which donor relationship, HLA match and graft source does the quote assume?",
      "Are donor assessment, collection and travel included?",
      "Which conditioning and GVHD-prevention regimens are priced?",
      "Which chimerism, CMV and other viral tests are included?",
      "How are graft failure and donor lymphocyte infusion billed?",
      "Who manages immunosuppression after return?",
    ],
    related: ["Matched Unrelated Donor Transplant", "Haploidentical Stem Cell Transplant", "Bone Marrow Transplantation"],
    figureAlt: "Medical illustration of an HLA-selected donor graft, conditioning, infusion and immune recovery after allogeneic transplant",
  },
  {
    procedure: "Haploidentical Stem Cell Transplant",
    shortName: "haploidentical stem cell transplant",
    briefName: "Haploidentical Stem Cell Transplant",
    slug: "haploidentical-stem-cell-transplant",
    specialist: "Transplant hematologist",
    definition:
      "A haploidentical transplant is an allogeneic transplant from a related donor who shares one HLA haplotype, commonly a parent, child or partially matched sibling.",
    indication:
      "It may offer an alternative donor route for selected high-risk blood cancers or marrow disorders when a fully matched donor is unavailable or waiting is clinically undesirable.",
    limits:
      "A readily available relative is not automatically a safe donor. Donor-specific antibodies, infection, disease status, organ fitness and the centre's haploidentical protocol can change selection.",
    evaluation:
      "Assessment includes high-resolution family HLA typing, donor-specific anti-HLA antibodies, donor health and infection testing, recipient disease status and organ function, and a written graft-versus-host prevention strategy.",
    process:
      "The related donor provides peripheral-blood stem cells or marrow. Conditioning is followed by graft infusion and protocol-specific immune control, often post-transplant cyclophosphamide with additional immunosuppression.",
    setting:
      "Care belongs in a transplant unit experienced with the stated haploidentical platform, with cellular processing, infection surveillance, blood-bank and critical-care support.",
    duration: "family typing and donor work-up precede a multi-week transplant admission, followed by months of infection, chimerism and GVHD monitoring",
    recovery:
      "Engraftment, immune recovery and immunosuppressant taper are individual. Viral reactivation, GVHD or delayed count recovery can extend nearby residence.",
    travel:
      "Travel home waits for stable graft function, manageable immunosuppression and a receiving clinician able to monitor infection, chimerism and GVHD.",
    followUp:
      "The plan should name chimerism and viral testing, GVHD assessment, drug-level monitoring, disease surveillance, donor contact and vaccination.",
    risks:
      "Risks include graft failure or rejection, severe infection, cytokine-related complications, acute or chronic GVHD, viral reactivation, organ toxicity, relapse and treatment-related death.",
    urgent: "fever, rash, diarrhoea, jaundice, breathing difficulty, bleeding, confusion or missed immunosuppressant doses",
    approaches: [
      { label: "Post-transplant cyclophosphamide platform", detail: "A common approach using cyclophosphamide after graft infusion plus additional immune suppression." },
      { label: "Ex-vivo graft manipulation", detail: "Selected centres deplete particular cells; laboratory scope and cost differ materially." },
      { label: "Fully matched donor route", detail: "A matched sibling or unrelated donor may remain preferable when timing and clinical factors allow." },
    ],
    drivers: [
      { label: "Family HLA typing and donor-specific antibodies", detail: "Several relatives may need testing before selection." },
      { label: "Graft source and cell processing", detail: "Marrow, peripheral blood and manipulated products are not one invoice." },
      { label: "GVHD-prevention platform", detail: "Post-transplant cyclophosphamide and ex-vivo strategies use different resources." },
      { label: "Conditioning intensity", detail: "Disease and fitness determine regimen and toxicity." },
      { label: "Viral surveillance, engraftment and complications", detail: "Extended monitoring and admission can dominate the final bill." },
    ],
    inclusions: [
      { label: "Recipient and family HLA assessment", detail: "The relatives and antibody testing expressly named." },
      { label: "Selected donor work-up and collection", detail: "Health screening, source and collection allowance as written." },
      { label: "Graft processing", detail: "Routine or manipulated processing only when specified." },
      { label: "Conditioning and haploidentical GVHD prophylaxis", detail: "Named medicines, including post-transplant cyclophosphamide if planned." },
      { label: "Ward, engraftment and quoted surveillance", detail: "Defined nights, chimerism and viral monitoring." },
    ],
    exclusions: [
      { label: "Testing multiple additional donors", detail: "Extra family typing, antibody work or desensitisation outside the allowance." },
      { label: "Advanced graft manipulation", detail: "Cell selection or depletion not named in a standard quote." },
      { label: "Bridging disease treatment", detail: "Therapy needed before conditioning." },
      { label: "Graft failure, severe infection or GVHD", detail: "Second graft, ICU or prolonged high-cost therapy." },
      { label: "Long-term medicines and monitoring", detail: "Immunosuppression, viral tests and survivorship after the quoted period." },
    ],
    records: ["Pathology, genetics and current disease assessment", "Recipient and available family HLA reports", "Donor-specific antibody testing if done", "Prior infection and treatment history", "Recipient organ-function and donor health records"],
    timeline: [
      { label: "Recipient assessment", detail: "Confirm disease indication, timing, fitness and matched-donor alternatives." },
      { label: "Family donor comparison", detail: "Type relatives, assess antibodies and select a medically suitable donor." },
      { label: "Donor collection and conditioning", detail: "Coordinate graft procurement with the recipient's preparative regimen." },
      { label: "Graft and immune-control protocol", detail: "Infuse cells and deliver the stated post-graft immune strategy." },
      { label: "Engraftment and infection monitoring", detail: "Track counts, chimerism, viral reactivation and GVHD." },
      { label: "Shared long-term follow-up", detail: "Continue immunosuppression, disease review, vaccination and donor-related planning." },
    ],
    quoteQuestions: [
      "How many family members and which HLA tests are included?",
      "Is donor-specific antibody testing and any desensitisation included?",
      "Does the plan use marrow or peripheral blood?",
      "Is post-transplant cyclophosphamide or ex-vivo manipulation assumed?",
      "Which viral PCR and chimerism schedule is included?",
      "What is the contingency if the chosen donor becomes unavailable?",
    ],
    related: ["Allogeneic Stem Cell Transplant", "Matched Unrelated Donor Transplant", "Stem Cell Transplantation"],
    figureAlt: "Medical illustration of a half-matched family donor, graft preparation, post-transplant immune control and engraftment",
  },
  {
    procedure: "Bone Marrow Biopsy",
    shortName: "bone marrow biopsy",
    briefName: "Bone Marrow Biopsy",
    slug: "bone-marrow-biopsy",
    specialist: "Hematologist",
    definition:
      "A bone marrow biopsy removes a small core of marrow, usually from the posterior pelvic bone, so architecture, cellularity, fibrosis and infiltrating disease can be examined by haematopathology.",
    indication:
      "It may investigate unexplained blood-count abnormalities, diagnose or stage leukaemia, lymphoma, myeloma or marrow disorders, and assess response when the result will affect care.",
    limits:
      "A biopsy is not interchangeable with an aspiration: the core answers architectural questions. It should not be repeated solely for travel convenience when recent adequate material answers the clinical question.",
    evaluation:
      "The team reviews the indication, recent blood count and platelets, anticoagulants or antiplatelet medicines, bleeding history, allergies, infection at the site and whether local anaesthesia, sedation or image guidance is needed.",
    process:
      "After sterile preparation and local anaesthetic, a trephine needle obtains a core from the posterior iliac crest. Pressure and a dressing are applied, and the labelled core goes for fixation and specialist review.",
    setting:
      "Most biopsies are outpatient or day-care. Sedation, severe thrombocytopenia, difficult anatomy or image guidance can require longer observation and a companion.",
    duration: "the sampling usually takes about 15–30 minutes, with additional consent, preparation, observation and laboratory processing time",
    recovery:
      "Local soreness and bruising are common for a few days. The patient follows dressing, activity and medicine instructions while awaiting a report that may take several days.",
    travel:
      "Same-day long-haul travel is unwise after sedation or ongoing bleeding. Departure should follow observation, stable wound review and a plan for receiving pathology results.",
    followUp:
      "A Hematologist should integrate morphology, immunohistochemistry and any paired flow, cytogenetic or molecular results rather than treating the core report in isolation.",
    risks:
      "Risks include pain, bruising, bleeding, infection, an inadequate or crushed core and rarely injury to nearby structures. Sedation adds its own breathing and recovery risks.",
    urgent: "bleeding that does not stop with pressure, fever, increasing redness or swelling, severe pain, fainting or breathing difficulty after sedation",
    approaches: [
      { label: "Posterior iliac crest trephine", detail: "The standard site for an adult core when anatomy and safety allow." },
      { label: "Image-guided biopsy", detail: "Used selectively for difficult anatomy, a focal lesion or a prior inadequate bedside sample." },
      { label: "Biopsy with same-sitting aspiration", detail: "Common when architecture and liquid marrow studies are both needed; each specimen has distinct handling." },
    ],
    drivers: [
      { label: "Local anaesthesia versus sedation", detail: "Sedation adds assessment, monitoring and recovery resources." },
      { label: "Bedside versus image guidance", detail: "CT guidance is a different facility episode." },
      { label: "Core adequacy and repeat sampling", detail: "An inadequate specimen may require another procedure." },
      { label: "Haematopathology work-up", detail: "Immunohistochemistry, special stains and expert review depend on the question." },
      { label: "Paired flow, cytogenetics and molecular tests", detail: "These are not automatically included with core histology." },
    ],
    inclusions: [
      { label: "Hematology assessment and consent", detail: "Indication, bleeding risk and medicine review." },
      { label: "Local anaesthetic and trephine sampling", detail: "One stated site and attempt allowance." },
      { label: "Routine observation and dressing", detail: "Post-procedure checks within the day-care episode." },
      { label: "Core histology processing", detail: "Fixation, decalcification and routine morphology when named." },
      { label: "Written haematopathology report", detail: "Report scope and expected turnaround should be stated." },
    ],
    exclusions: [
      { label: "Sedation or anaesthesia", detail: "Additional unless the estimate expressly includes it." },
      { label: "CT-guided sampling", detail: "Imaging suite and radiology professional charges." },
      { label: "Flow cytometry and genetic testing", detail: "Separate fresh specimen handling and laboratory panels." },
      { label: "Repeat procedure for inadequate core", detail: "Confirm the laboratory and fee policy." },
      { label: "Treatment after diagnosis", detail: "Transfusions, chemotherapy and admission are separate care." },
    ],
    records: ["Clinical question and suspected diagnosis", "Recent complete blood count and blood film", "Coagulation results when indicated", "Current anticoagulants and antiplatelet medicines", "Prior marrow reports, slides or molecular results"],
    timeline: [
      { label: "Indication and safety review", detail: "Clarify the question, platelet and bleeding risk, medicines and anaesthesia plan." },
      { label: "Consent and positioning", detail: "Mark the posterior iliac site and use sterile local anaesthesia." },
      { label: "Trephine sampling", detail: "Obtain an adequate intact core and any separately ordered aspirate." },
      { label: "Observation", detail: "Apply pressure, inspect bleeding and provide wound instructions." },
      { label: "Laboratory processing", detail: "Fix, decalcify, stain and add justified ancillary studies." },
      { label: "Integrated clinical review", detail: "Discuss the result with blood counts, flow and genetic findings." },
    ],
    quoteQuestions: [
      "Is one trephine core and local anaesthetic included?",
      "Is sedation planned, and what fasting and escort rules apply?",
      "Is aspiration performed in the same sitting?",
      "Which histology stains and immunohistochemistry are included?",
      "Are flow cytometry, cytogenetics and molecular tests separate?",
      "What happens if the core is inadequate?",
    ],
    related: ["Bone Marrow Aspiration", "Bone Marrow Transplantation", "Intrathecal Chemotherapy"],
    figureAlt: "Medical illustration of a trephine needle obtaining an intact bone marrow core from the posterior iliac crest",
  },
  {
    procedure: "Bone Marrow Aspiration",
    shortName: "bone marrow aspiration",
    briefName: "Bone Marrow Aspiration",
    slug: "bone-marrow-aspiration",
    specialist: "Hematologist",
    definition:
      "Bone marrow aspiration withdraws liquid marrow, usually from the posterior iliac crest, for cell morphology, flow cytometry, cytogenetics, molecular testing or microbiology.",
    indication:
      "It may evaluate unexplained cytopenias or abnormal cells, diagnose and monitor leukaemia and other marrow diseases, and provide fresh material for tests that cannot be performed reliably on a decalcified core.",
    limits:
      "Aspiration does not show marrow architecture as a trephine core does, and a dry tap can occur in fibrosis or a packed marrow. The correct specimen set follows the clinical question.",
    evaluation:
      "Preparation reviews the requested laboratory panels and specimen tubes as well as blood count, bleeding risk, anticoagulants, allergies, site infection and the need for local anaesthetic or sedation.",
    process:
      "A marrow needle enters the posterior iliac bone after local anaesthetic, and small liquid aliquots are drawn promptly into the correct tubes. Slides should be made before clotting and specimens routed without delay.",
    setting:
      "Most aspirations are outpatient or day-care. Sedation, paediatric care, severe bleeding risk or a combined image-guided procedure can extend monitoring.",
    duration: "sampling often takes 10–20 minutes, while preparation, observation and time-sensitive specimen handling extend the visit",
    recovery:
      "Brief sharp pain during aspiration and local soreness or bruising can occur. Dressing and activity instructions apply after discharge.",
    travel:
      "Travel follows haemostasis and recovery from any sedation. Before departure, establish who receives time-sensitive flow or genetic results and how urgent findings will be managed.",
    followUp:
      "Morphology should be integrated with flow cytometry, chromosome and molecular tests selected for the question; some results return later than the initial smear review.",
    risks:
      "Risks include pain, bruising, bleeding, infection, a diluted or clotted sample and a dry tap that may require repositioning or a trephine biopsy. Sedation has separate risks.",
    urgent: "persistent bleeding, fever, spreading redness, severe worsening pain, fainting or breathing difficulty after sedation",
    approaches: [
      { label: "Aspiration for morphology and flow", detail: "Fresh liquid marrow supports smears and immunophenotyping when routed promptly." },
      { label: "Aspiration for cytogenetics or molecular testing", detail: "Dedicated tubes and adequate viable material are required for the ordered assays." },
      { label: "Combined aspirate and trephine biopsy", detail: "Used when both cellular detail and tissue architecture are clinically necessary." },
    ],
    drivers: [
      { label: "Number and type of laboratory panels", detail: "Morphology, flow, cytogenetics, molecular and cultures are separate workflows." },
      { label: "Local anaesthesia versus sedation", detail: "Sedation changes staffing and recovery." },
      { label: "Combined trephine biopsy", detail: "A core adds sampling and histology processing." },
      { label: "Dry tap or inadequate specimen", detail: "Repeat positioning or biopsy may be needed." },
      { label: "Urgent handling and expert review", detail: "Acute leukaemia work-up may require rapid multi-laboratory coordination." },
    ],
    inclusions: [
      { label: "Hematology review and test plan", detail: "Clinical question, safety and specimen routing." },
      { label: "Local anaesthetic and aspiration", detail: "The stated site and sampling attempt allowance." },
      { label: "Smear preparation and routine morphology", detail: "Only when expressly part of the laboratory scope." },
      { label: "Routine observation and dressing", detail: "Haemostasis and discharge instructions." },
      { label: "Initial written result", detail: "Turnaround and whether ancillary results follow separately." },
    ],
    exclusions: [
      { label: "Trephine biopsy and histology", detail: "A separate core procedure unless bundled." },
      { label: "Flow cytometry", detail: "Antibody panels depend on the suspected disease." },
      { label: "Cytogenetic and molecular panels", detail: "Karyotype, FISH and sequencing are not routine aspiration fees." },
      { label: "Sedation or image guidance", detail: "Facility and professional charges unless named." },
      { label: "Repeat sampling after dry tap", detail: "Confirm whether another site or biopsy is included." },
    ],
    records: ["Clinical indication and differential diagnosis", "Recent complete blood count and blood film", "Exact requested flow and genetic panels", "Current medicines and bleeding history", "Prior marrow morphology, flow and genetic reports"],
    timeline: [
      { label: "Test and safety planning", detail: "Choose required panels, tubes and transport before inserting the needle." },
      { label: "Consent and local anaesthesia", detail: "Review pain, bleeding, dry-tap and sedation considerations." },
      { label: "Liquid marrow collection", detail: "Draw small aliquots and avoid dilution where possible." },
      { label: "Immediate specimen routing", detail: "Prepare smears and send viable samples to the correct laboratories." },
      { label: "Observation and discharge", detail: "Confirm haemostasis and provide wound and emergency advice." },
      { label: "Integrated result review", detail: "Combine morphology with flow, cytogenetic and molecular results as they return." },
    ],
    quoteQuestions: [
      "Which aspiration site, anaesthetic and number of attempts are included?",
      "Which morphology and flow cytometry panels are priced?",
      "Are karyotype, FISH and molecular tests included or separate?",
      "Will slides be made at the bedside before clotting?",
      "Is a trephine biopsy included if the aspirate is a dry tap?",
      "Who communicates urgent preliminary findings?",
    ],
    related: ["Bone Marrow Biopsy", "Bone Marrow Transplantation", "Intrathecal Chemotherapy"],
    figureAlt: "Medical illustration of liquid bone marrow being aspirated into specimen tubes for morphology, flow and genetic testing",
  },
  {
    procedure: "Matched Unrelated Donor Transplant",
    shortName: "matched unrelated donor transplant",
    briefName: "Matched Unrelated Donor Transplant",
    slug: "matched-unrelated-donor-transplant",
    specialist: "Transplant hematologist",
    definition:
      "A matched unrelated donor transplant is an allogeneic stem cell transplant using a volunteer donor selected through a registry by high-resolution HLA matching and medical suitability.",
    indication:
      "It may be considered for selected leukaemias, myelodysplastic or marrow-failure disorders when allogeneic transplant is indicated and no suitable matched family donor is available.",
    limits:
      "A preliminary registry match is not a secured graft. Confirmatory typing, donor availability, disease timing, recipient antibodies, infection and organ fitness can redirect the plan.",
    evaluation:
      "The transplant team confirms disease indication and urgency, performs high-resolution recipient HLA typing and antibody testing, requests registry search and confirmatory donor samples, and assesses recipient organ and infection status.",
    process:
      "After a registry donor is confirmed and medically cleared, collection and courier timing are coordinated with recipient conditioning. The tested marrow or peripheral-blood graft is infused with protocol-specific GVHD prophylaxis.",
    setting:
      "The procedure requires a transplant programme able to coordinate registry, collection centre, courier, cell laboratory and ward while providing infection, GVHD and critical-care support.",
    duration: "registry search and donor clearance can take weeks, followed by the transplant admission and commonly six to twelve weeks of nearby early monitoring",
    recovery:
      "Recovery includes engraftment, immune reconstitution and ongoing GVHD and infection surveillance; donor delays or complications can move every travel date.",
    travel:
      "Return travel requires graft stability, controlled GVHD and infection, a dependable drug supply and a home transplant team. Donor collection timing should not dictate an inflexible return ticket.",
    followUp:
      "Chimerism, disease status, immunosuppressant levels, CMV and other infection surveillance, GVHD review, registry reporting and vaccination continue after discharge.",
    risks:
      "Risks include graft failure, severe infection, acute or chronic GVHD, viral reactivation, organ toxicity, relapse, donor cancellation and treatment-related death.",
    urgent: "fever, rash, diarrhoea, jaundice, cough or breathlessness, bleeding, confusion or inability to obtain immunosuppressants",
    approaches: [
      { label: "Matched unrelated peripheral-blood graft", detail: "A common registry product with collection and courier coordination." },
      { label: "Matched unrelated marrow graft", detail: "Selected by disease and protocol; donor theatre and transport differ." },
      { label: "Alternative donor while search continues", detail: "Haploidentical or cord options may be considered when disease urgency outweighs search time." },
    ],
    drivers: [
      { label: "Registry search and confirmatory HLA typing", detail: "Search breadth and international testing create separate charges." },
      { label: "Donor procurement and courier", detail: "Collection-centre, registry and transport fees may use foreign currency." },
      { label: "Graft source and donor availability", detail: "Marrow and peripheral blood have different logistics, and dates can change." },
      { label: "Conditioning and GVHD prevention", detail: "Protocol and mismatch details determine medicines and monitoring." },
      { label: "Engraftment, infection and extended stay", detail: "Complications and delayed recovery can exceed package limits." },
    ],
    inclusions: [
      { label: "Recipient transplant assessment", detail: "Disease, organ, infection and antibody review." },
      { label: "Quoted registry search stage", detail: "State whether preliminary search or full confirmatory work is included." },
      { label: "Specified donor procurement", detail: "Registry, collection and courier lines only when itemized." },
      { label: "Conditioning, graft infusion and GVHD prophylaxis", detail: "Named recipient regimens." },
      { label: "Quoted ward and early monitoring", detail: "Defined nights, chimerism, drug levels and infection surveillance." },
    ],
    exclusions: [
      { label: "Additional registry searches or donor changes", detail: "New confirmatory typing and work-up after cancellation." },
      { label: "International procurement and courier surcharges", detail: "Currency, collection-centre and transport costs unless fixed in writing." },
      { label: "Bridging therapy during search", detail: "Disease control while waiting for donor clearance." },
      { label: "Graft failure, severe GVHD or ICU", detail: "Second graft and prolonged complication treatment." },
      { label: "Long-term follow-up and registry reporting costs", detail: "Medicines, tests, vaccines and care after the quoted interval." },
    ],
    records: ["Complete pathology, genetics and response assessments", "High-resolution recipient HLA typing", "Anti-HLA antibody results", "Prior donor-search reports and registry identifiers", "Treatment, infection and organ-function records"],
    timeline: [
      { label: "Recipient indication and urgency", detail: "Confirm transplant need, disease-control window and alternative donors." },
      { label: "Registry search", detail: "Identify candidates using high-resolution HLA data and availability." },
      { label: "Confirmatory donor work-up", detail: "Repeat typing, medical clearance and final graft-source selection." },
      { label: "Collection and courier coordination", detail: "Synchronise donor product transport with recipient conditioning safely." },
      { label: "Conditioning, infusion and engraftment", detail: "Deliver protocol care with GVHD and infection prevention." },
      { label: "Shared care and registry follow-up", detail: "Monitor graft, disease, infection and GVHD and complete required reporting." },
    ],
    quoteQuestions: [
      "Does the quote include preliminary search, confirmatory typing or both?",
      "Which registry, donor centre, collection and courier fees are included?",
      "What exchange-rate or donor-cancellation terms apply?",
      "Does the plan assume peripheral blood or marrow?",
      "What alternative is planned if the donor is delayed or withdraws?",
      "Are post-transplant chimerism, viral testing and registry follow-up included?",
    ],
    related: ["Allogeneic Stem Cell Transplant", "Haploidentical Stem Cell Transplant", "Stem Cell Transplantation"],
    figureAlt: "Medical illustration of registry HLA matching, unrelated donor collection, graft courier transport and recipient infusion",
  },
];

export const hematologyExclusiveArticles: CostArticle[] = profiles.map(createHematologyArticle);

export const hematologyExclusiveArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  hematologyExclusiveArticles.map((article) => [article.slug, article]),
);

const hematologyProcedureNames = new Set<string>(HEMATOLOGY_PROCEDURES);
const sharedHematologyArticles = medicalOncologyArticles.filter((article) =>
  hematologyProcedureNames.has(article.procedure),
);

/** All active Hematology guides, reusing clinically valid shared articles by slug. */
export const hematologyArticles: CostArticle[] = [
  ...hematologyExclusiveArticles,
  ...sharedHematologyArticles,
];
