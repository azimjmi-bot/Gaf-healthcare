import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { CARDIAC_SURGERY_PROCEDURES } from "../../lib/taxonomy";

type CardiacSurgeryProfile = {
  procedure: (typeof CARDIAC_SURGERY_PROCEDURES)[number];
  briefName: string;
  shortName: string;
  slug: string;
  specialist: string;
  definition: string;
  indication: string;
  limits: string;
  evaluation: string;
  technique: string;
  approaches: LabelledDetail[];
  duration: string;
  criticalCare: string;
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
  figureAlt: string;
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    arrival: string;
    recovery: string;
    lodging: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate treatment corridors. Confirm the operating campus before booking: a cross-NCR transfer can be slow, and daily family travel to a cardiac ICU should not depend on crossing the region.",
    recovery:
      "Winter air pollution can aggravate cough or breathlessness after a sternotomy, while summer heat can complicate walking and hydration. Ask the clinical team whether indoor rehabilitation and protected transport are sensible.",
    lodging:
      "Choose lift-accessible, flexible accommodation close to the named campus, with a caregiver able to return promptly if symptoms change.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic, harbour crossings and monsoon disruption can delay pre-admission testing or an urgent return after discharge.",
    recovery:
      "Wet pavements, stairs and long vehicle journeys are poor early-mobility plans after chest surgery. Confirm where wound review, anticoagulation testing and rehabilitation will occur.",
    lodging:
      "Stay on the same side of the harbour as the confirmed hospital and keep the return booking changeable until the postoperative review.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport is north of the city and can be far from cardiac hospital districts. An airport hotel may be convenient on arrival but unsuitable for recovery or rapid review; book only after the exact campus is named.",
    recovery:
      "Milder weather may help short supervised walks, but traffic can still turn a nearby address into a long journey. A rehabilitation plan and emergency return route matter more than climate.",
    lodging:
      "Use accessible accommodation near the treating campus, with space for a caregiver and reliable transport for blood tests and follow-up.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several hospital corridors have relatively direct airport access, but heat and humidity make an immediate airport-to-admission schedule unwise. Allow time for rest, repeat imaging and anaesthetic review.",
    recovery:
      "Air-conditioned indoor recovery, hydration and wound care are practical in hot weather. Flight clearance still depends on clinical stability, not a short airport transfer.",
    lodging:
      "Select flexible accommodation near the confirmed campus and arrange a vehicle that avoids prolonged outdoor waiting after discharge.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport is south of major hospital districts. Jubilee Hills, Kondapur and Secunderabad create materially different transfer and emergency-return journeys, so do not choose a base from the city name alone.",
    recovery:
      "Summer heat can worsen fatigue and dehydration during early walking. Plan indoor rehabilitation and confirm whether follow-up occurs at the operating campus or another clinic.",
    lodging:
      "Remain within the response radius specified by the team, with an accessible room, a caregiver and flexible checkout if recovery takes longer.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India value is a national planning band. A named Heart Team must review the diagnosis, anatomy, fitness and proposed procedure before a hospital can issue an itemized estimate.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private international-care market",
    context:
      "Compare the exact operation, prosthesis or device, intensive-care allowance, complications and follow-up rather than headline cardiac packages.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private international hospitals",
    context:
      "International coordination does not establish candidacy, implant availability, surgeon responsibility or a safe handover after return.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Procedure- and recovery-dependent",
    positioning: "Regional premium private care",
    context:
      "Travel may be shorter for some families, while professional, implant, ICU and rehabilitation charges may remain separate.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Procedure- and recovery-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Request an international self-pay estimate tied to current imaging and the exact cardiac pathway, not a general surgery bundle.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Procedure- and recovery-dependent",
    positioning: "European specialist cardiac care",
    context:
      "International acceptance, professional billing, implant rules and postoperative arrangements vary and must be established before travel.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Procedure- and recovery-dependent",
    positioning: "Private self-pay for many visitors",
    context:
      "Overseas patients should verify clinical acceptance, quote boundaries and who provides anticoagulation, wound and cardiac follow-up.",
  },
  {
    country: "United States",
    stay: "Procedure- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Hospital, surgeon, anaesthesia, implant, imaging and rehabilitation bills may be separate; [US_COST] is a stored comparison range, not one guaranteed quotation.",
  },
];

function makeCities(profile: CardiacSurgeryProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const catalogGap =
      `Doctor and hospital cards in ${place.city} must come only from live catalog relationships that exactly tag ${profile.procedure}. ` +
      "When that mapping is absent, the cards must remain empty: do not borrow a generic cardiac entity. An empty area is a catalog gap, not a ranking, outcome or capability statement.";

    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader cardiac-care ecosystem, but this article does not infer that every listed institution performs ${profile.shortName}. ${catalogGap}`,
      logistics: `${place.airport}: ${place.arrival} ${place.recovery}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named hospital issues an itemized estimate; this is not a city price.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Cardiac Care`,
        seoDescription:
          `${profile.briefName} cost in ${place.city} uses the [INDIA_COST] India planning range. Review candidacy, procedure scope, recovery and local logistics.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is the national planning range, not a ${place.city} tariff or a promise of acceptance.`,
        intro: [
          `${profile.indication} ${profile.evaluation}`,
          `${place.arrival} A long-haul patient should have a rest and reassessment interval before an elective procedure.`,
          `${place.recovery} ${place.lodging}`,
          catalogGap,
          "Send complete imaging and prior operative records before paying for non-refundable travel. The final plan may change after examination, repeat tests or multidisciplinary review.",
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither token is a city tariff, admission promise or final quotation.`,
          `${profile.technique} ${profile.criticalCare}`,
        ],
        costExplanation: [
          `The estimate changes with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical differences, not premium upgrades.`,
          `Ask the hospital to identify the ${profile.specialist}, exact campus, operation or device, anaesthesia, perfusion where relevant, blood products, ICU allowance, exclusions and extra-day policy.`,
          `Budget separately for travel through ${place.airport}, ${place.lodging.toLowerCase()} Keep flights flexible until fitness to travel is documented.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send current echo, angiography or CT and all prior cardiac records before booking travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist} and allow for repeat assessment after arrival. ${place.arrival}`,
          `${profile.recovery} ${place.lodging} Travel home only after wound, rhythm, oxygenation and mobility review.`,
        ],
        hospitalDiscussion: [
          catalogGap,
          "Confirm the exact operating campus, named lead clinician, cardiac anaesthesia, perfusion or catheter support as applicable, ICU escalation and follow-up in writing. General accreditation does not establish procedure-specific availability or outcomes.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. This article has no verified ${place.city}-only tariff; an itemized estimate follows clinical record review.`,
          },
          {
            q: `Which ${place.city} clinician should review ${profile.shortName}?`,
            a: `A named ${profile.specialist} should lead or review the case. Cards appear only for exact live mappings; placement is not a ranking or an experience claim.`,
          },
          {
            q: `Where should the patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.arrival}`,
          },
          {
            q: "When can the patient fly home?",
            a: `There is no universal date. ${profile.recovery} The treating team must confirm stability and fitness to fly.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should identify ${profile.procedure}, the named team and campus, clinical assumptions, implants or grafts, ICU and ward allowances, exclusions, complication terms and planned follow-up.`,
          },
        ],
      },
    };
  });
}

function createCardiacSurgeryArticle(profile: CardiacSurgeryProfile): CostArticle {
  const approaches = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-12",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Procedure, Risks & Recovery`,
    seoDescription:
      `${profile.briefName} cost in India is typically [INDIA_COST]. Review candidacy, approaches, inclusions, risks, recovery and international travel planning.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle:
      `${profile.definition} The stored national planning range is [INDIA_COST]; a named ${profile.specialist} must confirm candidacy, scope and a case-specific estimate.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} ${profile.limits}`,
      `${profile.technique} The decision belongs to a multidisciplinary cardiac team and informed consent, not to a package label.`,
      "The catalog supplies [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for broad planning. Tokens prevent editorial prices from drifting; they are not acceptance, outcomes, city tariffs or final bills.",
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored stay is [STAY], but preoperative optimization, intensive care, complications and discharge readiness determine the actual episode.`,
      `${profile.technique} Commonly discussed pathways include ${approaches}; they are selected from anatomy, disease and patient goals rather than price.`,
      `${profile.criticalCare} ${profile.recovery} International travel should remain flexible until the treating team documents fitness.`,
    ],
    indiaCost: [
      `The [INDIA_COST] value is the national catalog planning range for ${profile.shortName}. It applies only to the procedure name and assumptions written in a hospital letter; it is not a guaranteed package or a tariff for any provider or city.`,
      `Important drivers are ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. An added graft, prosthesis, reconstruction, prolonged ICU stay or changed access can describe a different clinical episode.`,
      "Compare itemized quotations using the same diagnosis and procedure scope. Never derive separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from this national token, and keep flights, lodging, rehabilitation and care after return outside the comparison.",
    ],
    costComponents: profile.inclusions,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two ${profile.shortName} estimates may not describe the same care. Compare ${profile.drivers
        .slice(0, 4)
        .map((item) => item.label.toLowerCase())
        .join(", ")}, named implants or grafts, operating and ICU assumptions, professional fees and complication terms. A higher quote does not prove better safety or outcomes.`,
    inclusions: profile.inclusions,
    exclusions: profile.exclusions,
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} The options below are clinical strategies, not consumer upgrades.`,
        `A named ${profile.specialist} should explain why the proposed approach fits, what alternatives were considered and what finding could change the plan.`,
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected from anatomy, disease, fitness and goals",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Considered?`,
    overview: {
      what: [profile.definition, profile.technique, profile.limits],
      who: [profile.indication, profile.evaluation],
      how: [
        profile.technique,
        `Possible forms include ${approaches}. They are not interchangeable quote labels.`,
        `${profile.criticalCare} The stated procedure time is ${profile.duration}.`,
      ],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        `The receiving ${profile.specialist} should review complete source imaging, reconcile anticoagulants, antiplatelets and other medicines, assess infection and organ function, and explain alternatives and consent.`,
        "Do not stop anticoagulation or antiplatelet treatment without the prescribing and procedural teams. New chest pain, fainting, breathlessness, fever or instability requires prompt local assessment rather than waiting for travel.",
      ],
      recovery: [
        `${profile.criticalCare} ${profile.recovery}`,
        `The catalog stay [STAY] is an orientation, not a discharge date. Wound condition, rhythm, oxygen need, kidney and neurological function, mobility and reliable medicines affect readiness.`,
        profile.risks,
        `${profile.followUp} Seek urgent clinical help for ${profile.urgent}; follow the treating team's own emergency thresholds.`,
      ],
    },
    topicSections: [
      {
        id: "risks-and-recovery",
        heading: `Risks and recovery after ${profile.briefName}`,
        paragraphs: [
          profile.risks,
          "This is not an exhaustive consent list and assigns no probability. Risk depends on current anatomy, urgency, prior operations, frailty, other organs and the actual technique.",
          `${profile.recovery} No article can promise technical success, survival, a complication-free course or a fixed return date.`,
        ],
      },
    ],
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget extends beyond [INDIA_COST]. Include remote review, tests outside the estimate, companion travel, nearby lodging, medicines, rehabilitation, complication contingency and follow-up at home.`,
        "Travel follows written clinical acceptance and an itemized estimate. A visa invitation, directory profile or scheduled consultation is not medical clearance.",
      ],
      stages: [
        { label: "Record and imaging review", detail: `The ${profile.specialist} reviews diagnosis, source imaging, prior treatment and current stability.` },
        { label: "Multidisciplinary decision", detail: `Confirm indication, alternatives, approach and what could alter or cancel ${profile.shortName}.` },
        { label: "Itemized clinical estimate", detail: "Match professional, facility, implant or graft, ICU, ward, investigation and complication assumptions." },
        { label: "Arrival and reassessment", detail: "Repeat examination, imaging, laboratory and anaesthetic assessment as clinically indicated before final consent." },
        { label: "Procedure and critical care", detail: `${profile.technique} ${profile.criticalCare}` },
        { label: "Ward recovery and rehabilitation", detail: profile.recovery },
        { label: "Nearby review and handover", detail: `Review wounds, rhythm, medicines and travel fitness, then provide records. ${profile.followUp}` },
      ],
    },
    journey: [
      { label: "Send complete records", detail: profile.records.join("; ") + "." },
      { label: "Obtain named-team review", detail: `A ${profile.specialist} confirms whether the records support further assessment and whether travel appears reasonable.` },
      { label: "Discuss indication and alternatives", detail: `${profile.limits} Ask what new finding could change or cancel the plan.` },
      { label: "Confirm exact entity mapping", detail: `Use only clinicians and hospitals currently mapped to ${profile.procedure}; if none are mapped, leave entity cards empty rather than borrowing generic cardiac listings.` },
      { label: "Compare itemized estimates", detail: "Use matching clinical assumptions and compare implants, grafts, operating resources, ICU days, exclusions and escalation terms." },
      { label: "Arrange documents and funding", detail: "Complete visa, companion, payment and contingency arrangements without treating a visa letter as clinical acceptance." },
      { label: "Book flexible travel and lodging", detail: "Use refundable flights and accessible lodging near the exact campus, allowing enough time for preoperative reassessment." },
      { label: "Repeat assessment after arrival", detail: profile.evaluation },
      { label: "Give informed consent", detail: `Review the planned approach, alternatives, uncertainty, procedure-specific risks and the possibility that ${profile.shortName} cannot proceed as expected.` },
      { label: "Complete treatment and monitored recovery", detail: `${profile.technique} ${profile.criticalCare}` },
      { label: "Learn discharge care", detail: "The patient and caregiver review wounds, medicines, mobility, diet, rehabilitation, warning signs and emergency contacts." },
      { label: "Complete nearby review", detail: "Remain nearby until the team reviews early recovery and explicitly discusses fitness to fly." },
      { label: "Carry a complete handover", detail: "Take the operative or procedure note, implant and graft details, imaging, discharge summary, medicine list and follow-up plan." },
      { label: "Continue care at home", detail: profile.followUp },
    ],
    documents: [
      ...profile.records,
      "Current medication list, including anticoagulants and antiplatelet medicines",
      "Allergies, blood group, recent blood tests and infection history",
      "Passport, visa and companion documents needed for travel",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF catalog ranges. Other country rows are explicitly modelled relative private-care bands, not official tariffs, provider quotes or evidence that a program will accept the case.",
      "A valid comparison holds procedure scope, implant or graft assumptions, ICU coverage and follow-up constant. Currency and billing structures can still make rows unlike.",
    ],
    destinationNote:
      "All values are planning information. Anatomy, urgency, implants, clinical course, complications, currency and length of stay can change the final bill; no country row predicts availability, safety or outcome.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad use [INDIA_COST] because the catalog contains no verified city tariff for these procedures. The overlays change airport, commute, climate, lodging and recovery logistics without inventing local prices.",
      "Doctor and hospital cards must resolve only from exact live procedure relationships. Where mappings are absent they remain empty; this article supplies no generic substitutes, ranking, volume, capability or outcome claim.",
    ],
    whyIndia: [
      `Some international patients compare India for access to a named ${profile.specialist} and a national self-pay planning range below typical United States figures. Price alone is not a clinical reason to travel.`,
      "Responsible selection requires case acceptance, an exact procedure and implant plan, critical-care support, an itemized estimate, a safe companion and continuity after return. These points need direct confirmation.",
      "Emergency disease, clinical instability, inability to sustain follow-up or appropriate funded care near home may make international travel unsuitable. This article names no best provider and makes no outcome claim.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} being considered now, and what are the alternatives?`,
      "Which imaging, anatomy or physiological finding drives the recommendation?",
      `Who is the named ${profile.specialist} responsible for the plan?`,
      "At which exact campus will the procedure and critical care occur?",
      "Does the quotation use the exact catalog procedure name?",
      "What could postpone, change or cancel treatment after arrival?",
      "Which consultations, imaging and laboratory tests are included?",
      "Which anaesthesia, perfusion, catheter-lab or hybrid-room resources are included?",
      "Which grafts, prostheses, devices, patches or conduits are assumed?",
      "Which blood products and routine inpatient medicines are included?",
      "How many ventilation, ICU and ward days are allowed?",
      "How are extra days, major bleeding, infection, organ support and reintervention billed?",
      "Which surgeon, anaesthetist, perfusion, imaging or other professional fees are separate?",
      "Which discharge medicines, rehabilitation and first follow-up are included?",
      "What anticoagulation or antiplatelet plan applies before and after treatment?",
      "What warning signs require immediate local care or return to the hospital?",
      "What caregiver skills and accessible accommodation are required?",
      "When and by whom will fitness to fly be assessed?",
      "Which records and implant identifiers will be supplied at discharge?",
      "Who accepts clinical responsibility after the patient returns home?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This national catalog range is not a quotation; anatomy, approach, implants, ICU use and hospital terms determine the final bill.`,
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: `When is ${profile.shortName} considered?`, a: profile.indication },
      { q: "Who may need a different plan or delay?", a: profile.limits },
      { q: "What evaluation is needed before acceptance?", a: profile.evaluation },
      { q: "How is the procedure performed?", a: profile.technique },
      { q: "Which approaches may be discussed?", a: `${approaches}. Selection is clinical, not a package upgrade.` },
      { q: "How long does the procedure and admission take?", a: `${profile.duration}. The stored [STAY] is a broad travel guide, not a promised discharge date.` },
      { q: "What are the important risks?", a: profile.risks },
      { q: "What can change the estimate?", a: `Important drivers include ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}.` },
      { q: "What does early recovery involve?", a: `${profile.criticalCare} ${profile.recovery}` },
      { q: "When can an international patient fly home?", a: "Only after the treating team reviews clinical stability, wounds or access site, rhythm, oxygenation, mobility and the follow-up plan; there is no universal date." },
      { q: "What follow-up is required?", a: profile.followUp },
    ],
    doctorHeading: `${profile.specialist}s for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} specialists in [CITY]`,
    doctorIntro:
      `Profiles must be rendered only when a live relationship exactly maps the clinician to ${profile.procedure}. If no exact mapping exists, leave cards empty rather than borrowing a generic cardiologist or surgeon. Verify current role, responsibility, campus and availability; placement is not a ranking, volume or outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards must follow exact live procedure relationships. General cardiac branding or accreditation does not prove current program capability, implant stock, critical-care availability, volume or outcomes; absent mappings stay empty.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/cardiac-surgery/${profile.slug}-illustration.webp`,
        alt: profile.figureAlt,
        caption: "A general educational illustration, not patient-specific anatomy, a treatment recommendation or an outcome forecast.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/cardiac-surgery/cardiac-surgery-care-pathway.webp",
        alt: `Records review, Heart Team decision, procedure, critical care and recovery pathway for ${profile.shortName}`,
        caption: "The actual pathway depends on candidacy, anatomy, the selected procedure and clinical progress.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/cardiac-surgery/cardiac-surgery-international-journey.webp",
        alt: `International record review, travel, cardiac care, discharge and home follow-up journey for ${profile.shortName}`,
        caption: "Written clinical acceptance precedes travel, and discharge and fitness to fly are individualized.",
        fit: "contain",
      },
    ],
  };
}

const profiles: CardiacSurgeryProfile[] = [
  {
    procedure: "CABG (Coronary Artery Bypass Grafting)",
    briefName: "CABG (Coronary Artery Bypass Grafting)",
    shortName: "coronary artery bypass grafting",
    slug: "cabg-coronary-artery-bypass-grafting",
    specialist: "Cardiac surgeon",
    definition:
      "CABG creates new routes around important coronary artery narrowings using arterial or venous grafts so blood can reach heart muscle beyond the blockages.",
    indication:
      "It may be recommended for selected left-main or complex multivessel disease, diabetes with suitable multivessel anatomy, impaired ventricular function, or symptoms or ischemia not adequately managed by medicines or PCI.",
    limits:
      "CABG is not automatic for every angiographic narrowing. Frailty, limited viable myocardium, severe noncardiac illness, unsuitable distal vessels, uncontrolled infection or anatomy better treated medically or by PCI can alter the decision.",
    evaluation:
      "A Heart Team reviews symptoms, coronary angiography source images, ischemia and viability when relevant, ventricular and valve function, kidney and lung status, diabetes, stroke and vascular history, bleeding risk and conduit availability.",
    technique:
      "Through a sternotomy in most cases, the surgeon connects grafts beyond diseased coronary segments. The internal thoracic artery is commonly used for the LAD; radial artery and saphenous vein grafts are selected according to targets, conduit quality and patient factors.",
    approaches: [
      { label: "On-pump CABG", detail: "Cardiopulmonary bypass supports circulation while the surgeon constructs grafts, often with the heart arrested." },
      { label: "Off-pump CABG", detail: "Selected grafts are constructed on the beating heart; it is not inherently superior and requires anatomy and team experience suited to complete revascularization." },
      { label: "Arterial, venous or mixed conduits", detail: "Internal thoracic and radial arteries and saphenous vein have different suitability; the plan should name anticipated targets and graft sources." },
      { label: "Minimally invasive or hybrid revascularization", detail: "Selected LAD grafting may use a smaller access and combine with PCI; complex multivessel disease often still needs standard exposure." },
    ],
    duration: "often about 3–6 hours, longer with multiple grafts, difficult targets or associated procedures",
    criticalCare:
      "Postoperative cardiac ICU care monitors bleeding, rhythm, heart and lung function, neurological status, kidney function and glucose; ventilation and vasoactive support vary with the clinical course.",
    recovery:
      "Walking and breathing exercises begin in hospital. Sternotomy precautions commonly continue for several weeks, while fatigue and cardiac rehabilitation improve gradually; graft protection requires lifelong risk-factor treatment.",
    risks:
      "CABG risks include bleeding or transfusion, graft occlusion, myocardial infarction, atrial fibrillation or other rhythm disturbance, stroke or delirium, kidney or lung injury, wound or graft-harvest infection and death.",
    urgent:
      "new or persistent chest pain, severe breathlessness, fainting, new weakness or speech change, palpitations with instability, fever, wound drainage or rapidly increasing leg swelling",
    drivers: [
      { label: "Number and location of bypass targets", detail: "Distal-vessel quality and complete revascularization determine graft work, not a fixed package count." },
      { label: "Conduit selection and harvesting", detail: "Single or bilateral internal thoracic, radial and saphenous conduits require distinct assessment and harvesting." },
      { label: "On-pump versus off-pump strategy", detail: "Perfusion and stabilization resources differ; selection should not compromise needed grafts." },
      { label: "Associated valve or aortic work", detail: "A combined procedure is materially different from isolated CABG." },
      { label: "Urgency, ventricular function and comorbidity", detail: "Recent infarction, poor function, kidney disease, lung disease or frailty can extend ICU and recovery." },
    ],
    inclusions: [
      { label: "Coronary and surgical review", detail: "Review of angiography, ventricular function, graft targets and operative candidacy." },
      { label: "Planned graft construction", detail: "The expected number of targets and conduit harvest should be stated without guaranteeing a graft to an unsuitable vessel." },
      { label: "Anaesthesia, theatre and perfusion", detail: "Cardiac anaesthesia and cardiopulmonary bypass when the planned technique uses it." },
      { label: "Quoted cardiac ICU and ward stay", detail: "Defined ventilation, ICU and ward allowances with routine inpatient monitoring." },
      { label: "Routine discharge planning", detail: "Wound, medicine, walking and first-review instructions within the written scope." },
    ],
    exclusions: [
      { label: "Additional valve, aortic or carotid procedure", detail: "Associated work not named in the isolated CABG estimate." },
      { label: "Mechanical circulatory or prolonged organ support", detail: "IABP, ECMO, dialysis or extended ventilation unless expressly included." },
      { label: "Re-exploration or major complication care", detail: "Bleeding, infection, infarction or stroke treatment beyond stated terms." },
      { label: "Long-term cardiac rehabilitation", detail: "Supervised rehabilitation and chronic prevention medicines after included visits." },
      { label: "Travel and companion costs", detail: "Flights, lodging, meals, local transport and date changes." },
    ],
    records: ["Coronary angiography report and complete source images", "Echocardiogram and ventricular-function assessment", "ECG and ischemia or viability testing if performed", "Prior PCI and stent details", "Vein, radial-artery or vascular assessments if already performed"],
    followUp:
      "Follow-up covers wound and sternum healing, rhythm, symptoms, cardiac rehabilitation and lifelong secondary prevention with antiplatelet therapy, lipid lowering, blood-pressure, diabetes and smoking management as individually prescribed.",
    quoteQuestions: [
      "How many distal targets and which conduits are anticipated?",
      "Is internal thoracic, radial-artery or endoscopic vein harvesting planned?",
      "Why is on-pump or off-pump CABG proposed, and could the strategy change?",
      "Does the estimate assume complete revascularization or a hybrid PCI stage?",
      "How are perioperative antiplatelet medicines and prior stents managed?",
    ],
    related: ["Redo CABG", "Minimally Invasive Cardiac Surgery", "Robotic Cardiac Surgery", "Heart Valve Repair"],
    figureAlt: "Medical illustration of internal thoracic artery, radial artery and vein bypass grafts carrying blood around blocked coronary arteries",
  },
  {
    procedure: "Heart Valve Replacement",
    briefName: "Heart Valve Replacement",
    shortName: "heart valve replacement",
    slug: "heart-valve-replacement",
    specialist: "Valve Heart Team specialist",
    definition:
      "Heart valve replacement removes or excludes a severely diseased native valve and implants a mechanical or biological prosthesis when durable repair is unsuitable.",
    indication:
      "Replacement may be considered for severe symptomatic stenosis or regurgitation, ventricular consequences, or another guideline-supported indication after valve type, anatomy, life expectancy and patient goals are reviewed.",
    limits:
      "Mild or moderate disease, a repairable valve, active infection requiring a different pathway, prohibitive operative risk or anatomy suited to catheter treatment may make routine surgical replacement inappropriate.",
    evaluation:
      "Transthoracic and often transoesophageal echo define the affected valve, mechanism, severity, chamber response and pulmonary pressure; coronary assessment, CT, rhythm, organ fitness, infection and dental review are added as indicated.",
    technique:
      "Surgical replacement usually uses cardiopulmonary bypass to excise diseased tissue and secure a sized prosthesis. Mechanical valves are durable but generally require lifelong vitamin-K-antagonist anticoagulation; tissue valves avoid lifelong valve-related VKA for many patients but can deteriorate.",
    approaches: [
      { label: "Mechanical prosthesis", detail: "Often considered when durability is important and reliable lifelong VKA monitoring is acceptable; direct oral anticoagulants are not substitutes for mechanical-valve anticoagulation." },
      { label: "Bioprosthetic valve", detail: "Avoids lifelong mechanical-valve VKA for many patients, but age, degeneration and possible future reintervention matter; early antithrombotic treatment is individualized." },
      { label: "Surgical versus transcatheter pathway", detail: "Age, anatomy, surgical risk, durability, coronary access and future interventions are reviewed by a Heart Team." },
    ],
    duration: "often about 3–6 hours for isolated surgical replacement",
    criticalCare: "Cardiac ICU monitoring addresses bleeding, ventricular function, rhythm, prosthetic-valve function, neurological status and organ recovery.",
    recovery: "Sternotomy recovery and progressive walking commonly take several weeks; anticoagulation education, wound review and cardiac rehabilitation begin before discharge.",
    risks: "Risks include bleeding, stroke, infection including prosthetic-valve endocarditis, thrombosis, paravalvular leak, conduction disturbance, kidney or lung injury, prosthesis-patient mismatch, reoperation and death.",
    urgent: "sudden breathlessness, chest pain, fainting, new neurological symptoms, persistent fever, bleeding, black stools, unstable palpitations or a major anticoagulation problem",
    drivers: [
      { label: "Valve position and disease mechanism", detail: "Aortic, mitral, tricuspid and pulmonary replacements are different operations." },
      { label: "Mechanical versus tissue implant", detail: "Prosthesis selection changes implant and lifelong medication assumptions." },
      { label: "Single versus combined procedure", detail: "CABG, aortic or another valve procedure broadens scope." },
      { label: "Previous surgery or endocarditis", detail: "Re-entry, tissue destruction and infection treatment increase complexity." },
      { label: "Heart and organ function", detail: "Pulmonary hypertension, ventricular dysfunction or kidney disease may extend critical care." },
    ],
    inclusions: [
      { label: "Valve-team assessment", detail: "Imaging review, candidacy and documented prosthesis discussion." },
      { label: "One named valve prosthesis", detail: "Position, type, expected model family and sizing assumptions should be written." },
      { label: "Surgery, anaesthesia and perfusion", detail: "The planned replacement episode and bypass resources." },
      { label: "Quoted ICU and ward allowance", detail: "Routine monitoring and stated inpatient medicines." },
      { label: "Initial anticoagulation plan", detail: "Education and early testing only as expressly included." },
    ],
    exclusions: [
      { label: "Additional valve, CABG or aortic work", detail: "Any combined operation not stated." },
      { label: "Extended infection or organ-support care", detail: "Prolonged antibiotics, dialysis, ventilation or reoperation." },
      { label: "Permanent pacemaker", detail: "A separate implant unless the estimate explicitly includes it." },
      { label: "Long-term anticoagulation and surveillance", detail: "Medicines, INR testing, echo and later intervention." },
      { label: "Travel and rehabilitation", detail: "International travel, lodging and longer-term cardiac rehabilitation." },
    ],
    records: ["Complete echocardiogram images and reports", "Transoesophageal echo or cardiac CT if performed", "Coronary angiography or CT coronary assessment", "Blood cultures and infection treatment records if endocarditis is suspected", "Anticoagulation history and pregnancy plans where relevant"],
    followUp: "Lifelong valve follow-up includes symptoms, examination and interval echo. Mechanical valves require reliable VKA/INR management; tissue valves require surveillance for degeneration, and all patients need endocarditis-prevention advice appropriate to their situation.",
    quoteQuestions: ["Which valve position, prosthesis type and model assumptions are included?", "Why is repair not expected to be durable?", "What anticoagulation and INR access are required after return?", "How will prosthesis size and mismatch risk be assessed?"],
    related: ["Heart Valve Repair", "Mitral Valve Repair", "Aortic Valve Replacement", "Double Valve Replacement"],
    figureAlt: "Medical illustration comparing a mechanical heart valve prosthesis with a biological tissue valve used for surgical replacement",
  },
  {
    procedure: "Heart Valve Repair",
    briefName: "Heart Valve Repair",
    shortName: "heart valve repair",
    slug: "heart-valve-repair",
    specialist: "Valve repair cardiac surgeon",
    definition: "Heart valve repair reshapes and supports native leaflets, annulus, chords or adjacent structures to restore competent flow without replacing the valve.",
    indication: "Repair may be preferred for selected severe regurgitation when anatomy is repairable and a durable result is expected, particularly for degenerative mitral disease and selected tricuspid or aortic lesions.",
    limits: "Heavy calcification, extensive tissue destruction, rheumatic restriction, active endocarditis damage or anatomy unlikely to yield durable competence may require replacement instead.",
    evaluation: "High-quality transthoracic and transoesophageal echo defines mechanism, segments, annular size, ventricular response and repairability; coronary assessment, rhythm and organ fitness complete planning.",
    technique: "On bypass, the surgeon corrects the lesion with techniques such as leaflet resection or reconstruction, chordal replacement, commissural work and an annuloplasty ring; intraoperative transoesophageal echo tests the result.",
    approaches: [
      { label: "Leaflet and chordal reconstruction", detail: "Resection, neochords or other lesion-specific repair restores leaflet motion and coaptation." },
      { label: "Annuloplasty", detail: "A ring or band supports annular size and shape; implant type should be named." },
      { label: "Repair with possible replacement", detail: "Consent and the estimate should state what happens if intraoperative assessment shows repair is not durable." },
    ],
    duration: "often about 3–6 hours, depending on valve and reconstruction",
    criticalCare: "ICU care monitors bleeding, ventricular function, rhythm, residual regurgitation or stenosis and organ recovery.",
    recovery: "Recovery follows access and clinical course; sternotomy protection often lasts several weeks, with echo, medicine review and progressive rehabilitation.",
    risks: "Risks include residual or recurrent valve dysfunction, systolic anterior motion in mitral repair, bleeding, stroke, rhythm or conduction problems, infection, conversion to replacement, reoperation, organ injury and death.",
    urgent: "new breathlessness, fainting, chest pain, unstable palpitations, fever, wound drainage, bleeding or sudden swelling",
    drivers: [
      { label: "Valve and lesion complexity", detail: "Leaflet prolapse, restriction, annular dilation and tissue destruction need different repairs." },
      { label: "Repair implants and techniques", detail: "Rings, bands, neochords and patches must match the operative plan." },
      { label: "Likelihood of replacement", detail: "A contingency prosthesis changes consent and estimate boundaries." },
      { label: "Minimally invasive versus sternotomy access", detail: "Access changes equipment and suitability, not the requirement for a durable repair." },
      { label: "Associated arrhythmia or coronary work", detail: "Ablation, appendage management or CABG broadens scope." },
    ],
    inclusions: [
      { label: "Repairability assessment", detail: "Expert imaging review and a lesion-specific repair plan." },
      { label: "Named repair implants", detail: "Annuloplasty and chordal or patch materials stated in the letter." },
      { label: "Anaesthesia, surgery and perfusion", detail: "Including intraoperative echo where written." },
      { label: "Quoted ICU and ward allowance", detail: "Routine postoperative monitoring within limits." },
      { label: "First postoperative echo", detail: "Only when named in the scope." },
    ],
    exclusions: [
      { label: "Conversion to valve replacement", detail: "Prosthesis and changed operative scope unless the contingency is priced." },
      { label: "Additional valve, CABG or rhythm surgery", detail: "Combined procedures not stated." },
      { label: "Pacemaker or major complication care", detail: "Separate unless expressly covered." },
      { label: "Long-term medicines and imaging", detail: "Antithrombotic treatment, rhythm care and later echo." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and outpatient rehabilitation." },
    ],
    records: ["Transthoracic and transoesophageal echocardiogram images", "Coronary assessment where indicated", "Rhythm monitoring and atrial-fibrillation history", "Prior endocarditis and blood-culture records", "Prior cardiac operative notes"],
    followUp: "Follow-up assesses residual and recurrent dysfunction, ventricular remodeling and rhythm. Anticoagulation after repair depends on valve, rhythm, repair and patient factors; repair does not automatically eliminate anticoagulation.",
    quoteQuestions: ["What lesion-specific repair is planned?", "What predicts a durable repair in this case?", "Is intraoperative echo included?", "What is the clinical and billing plan if replacement becomes necessary?"],
    related: ["Mitral Valve Repair", "Heart Valve Replacement", "Minimally Invasive Cardiac Surgery", "Robotic Cardiac Surgery"],
    figureAlt: "Medical illustration of native heart valve leaflet, chordal and annuloplasty-ring techniques used to repair regurgitation",
  },
  {
    procedure: "Heart Transplant Surgery",
    briefName: "Heart Transplant Surgery",
    shortName: "heart transplantation",
    slug: "heart-transplant-surgery",
    specialist: "Heart transplant program specialist",
    definition: "Heart transplantation replaces a failing heart with a deceased-donor organ after formal multidisciplinary evaluation, legal eligibility, listing and allocation.",
    indication: "Evaluation may be considered for selected end-stage heart failure when optimized medicines, devices and other surgical options do not provide an acceptable durable pathway.",
    limits: "Active uncontrolled infection, malignancy, irreversible severe organ disease, prohibitive pulmonary vascular resistance, inability to adhere to lifelong care or ineligibility under applicable allocation rules can defer or prevent listing.",
    evaluation: "A transplant program assesses heart failure, pulmonary pressures, kidney, liver and lung function, infection and vaccination, cancer screening, blood group and sensitization, nutrition, psychosocial support, adherence, funding and legal eligibility.",
    technique: "Only after an organ is allocated under applicable rules does the team coordinate donor procurement and implant the donor heart, usually orthotopically; timing cannot be scheduled or guaranteed.",
    approaches: [
      { label: "Evaluation and listing", detail: "Formal candidacy and allocation precede surgery; payment or international travel cannot guarantee listing or a donor." },
      { label: "Bridge to transplant", detail: "Medicines, temporary support or an LVAD may support selected candidates while waiting, as a separate clinical episode." },
      { label: "Orthotopic transplantation", detail: "The donor heart is implanted after procurement and compatibility review, followed by lifelong transplant care." },
    ],
    duration: "implantation often takes about 6–10 hours, separate from an unpredictable evaluation and donor-wait period",
    criticalCare: "Transplant ICU care monitors primary graft function, rejection, infection, bleeding, pulmonary pressure, kidney and neurological function while immunosuppression is established.",
    recovery: "Nearby residence commonly continues for frequent graft, medicine and infection reviews. Recovery extends for months and lifelong immunosuppression and specialist follow-up are mandatory.",
    risks: "Risks include no suitable donor becoming available, primary graft dysfunction, rejection, severe infection, bleeding, stroke, kidney injury, thrombosis, medication toxicity, later malignancy, graft coronary vasculopathy and death.",
    urgent: "fever, breathlessness, rapid weight gain, fainting, chest symptoms, reduced urine, severe diarrhoea or vomiting, neurological change or inability to take immunosuppressants",
    drivers: [
      { label: "Evaluation, legal eligibility and listing", detail: "Multisystem and psychosocial assessment does not guarantee acceptance." },
      { label: "Unpredictable donor wait", detail: "Hospitalization and support while waiting cannot be packaged as a fixed schedule." },
      { label: "Donor procurement and transport", detail: "Allocation, retrieval and ischemic-time logistics are program-governed." },
      { label: "Mechanical circulatory support", detail: "Temporary support or LVAD is a separate high-resource episode." },
      { label: "Immunosuppression, rejection and infection care", detail: "Long-term medicines and surveillance extend well beyond implantation." },
    ],
    inclusions: [
      { label: "Defined transplant evaluation", detail: "Only tests and consultations expressly listed." },
      { label: "Implantation episode", detail: "Applicable only after lawful allocation and final acceptance." },
      { label: "Quoted donor-procurement lines", detail: "Retrieval and transport only where legally and explicitly stated." },
      { label: "Quoted transplant ICU and ward care", detail: "Defined routine monitoring and immunosuppression allowance." },
      { label: "Early transplant teaching", detail: "Medicine, infection and follow-up education within the stated period." },
    ],
    exclusions: [
      { label: "Guarantee of listing, donor or timing", detail: "No fee can purchase an organ or promise allocation." },
      { label: "Care during a prolonged donor wait", detail: "Admission, inotropes, temporary support or LVAD unless named." },
      { label: "Rejection, infection or graft failure treatment", detail: "Biopsy, advanced treatment, retransplant or prolonged ICU outside terms." },
      { label: "Lifelong medicines and surveillance", detail: "Immunosuppression, laboratory tests, biopsies or imaging after the included interval." },
      { label: "Relocation and caregiver living costs", detail: "Long-term nearby residence, travel and support." },
    ],
    records: ["Complete heart-failure history and imaging", "Right-heart catheterization and pulmonary-resistance data", "All prior cardiac operations and implanted-device records", "Blood group and sensitization testing", "Kidney, liver, lung, infection, vaccination, malignancy-screening and psychosocial assessments"],
    followUp: "Lifelong transplant care includes immunosuppressant levels, graft and rejection surveillance, infection prevention, renal and metabolic monitoring, vaccination guidance, adherence support and screening for graft vasculopathy and malignancy.",
    quoteQuestions: ["Does the figure cover evaluation only or a defined implantation episode?", "What legal, residency, allocation and funding rules govern candidacy?", "What happens clinically and financially during an indefinite donor wait?", "Are donor procurement, rejection surveillance and lifelong medicines separate?", "Who provides transplant-level follow-up after return?"],
    related: ["LVAD Implantation", "Congenital Heart Surgery", "Redo CABG", "Heart Valve Replacement"],
    figureAlt: "Medical illustration of formal transplant evaluation, deceased-donor allocation, donor-heart implantation and lifelong follow-up",
  },
  {
    procedure: "Aortic Root Replacement",
    briefName: "Aortic Root Replacement",
    shortName: "aortic root replacement",
    slug: "aortic-root-replacement",
    specialist: "Aortic cardiac surgeon",
    definition: "Aortic root replacement removes diseased aortic root tissue beside the heart and reconstructs it with a graft while reimplanting the coronary arteries, with valve replacement or preservation as appropriate.",
    indication: "It may be considered for root aneurysm, dissection, destructive infection or genetic aortopathy when size, growth, symptoms, valve function, family history and guideline thresholds support intervention.",
    limits: "A diameter alone is not a universal indication. Body size, syndrome, growth and anatomy matter; prohibitive comorbidity or anatomy suited to surveillance or another repair can change timing.",
    evaluation: "ECG-gated CT or MRI maps the root and entire aorta; echo assesses valve and ventricular function. Coronary anatomy, genetic and family history, kidney function and prior surgery complete planning.",
    technique: "On bypass, diseased root tissue is replaced and coronary buttons are reimplanted. A composite valve-graft conduit replaces the valve, while a valve-sparing root replacement preserves suitable native leaflets.",
    approaches: [
      { label: "Composite graft with mechanical valve", detail: "Replaces root and valve and generally requires lifelong VKA anticoagulation." },
      { label: "Composite graft with tissue valve", detail: "Avoids mechanical-valve anticoagulation for many patients but introduces structural valve degeneration considerations." },
      { label: "Valve-sparing root replacement", detail: "Preserves suitable native leaflets; durability depends on anatomy and repair quality." },
    ],
    duration: "often about 5–8 hours, longer with arch, coronary or redo complexity",
    criticalCare: "ICU care closely tracks major bleeding, coronary perfusion, ventricular function, neurological status, kidney and other organ recovery.",
    recovery: "Sternotomy and general recovery take several weeks; blood-pressure control, imaging surveillance and genetic-family advice may remain lifelong.",
    risks: "Important risks include major bleeding and transfusion, coronary-button complications or infarction, stroke, kidney or organ injury, rhythm disturbance, infection, residual or recurrent valve dysfunction, reoperation and death.",
    urgent: "sudden chest or back pain, collapse, new neurological deficit, severe breathlessness, fever, wound drainage, major bleeding or unstable palpitations",
    drivers: [
      { label: "Root pathology and urgency", detail: "Elective aneurysm, acute dissection and endocarditis are very different episodes." },
      { label: "Valve-sparing versus composite conduit", detail: "Leaflet suitability and prosthesis choice change operative work and follow-up." },
      { label: "Arch or ascending-aorta extension", detail: "Added reconstruction and cerebral protection increase complexity." },
      { label: "Coronary-button and prior-surgery anatomy", detail: "Reimplantation and adhesions can increase bleeding and ischemic risk." },
      { label: "Genetic aortopathy and organ condition", detail: "Extent and surveillance depend on the whole-aorta disease." },
    ],
    inclusions: [
      { label: "Whole-aorta and valve review", detail: "Source CT or MRI and echo assessment." },
      { label: "Named root graft and valve strategy", detail: "Composite conduit or valve-sparing plan with contingency." },
      { label: "Cardiac surgery, anaesthesia and perfusion", detail: "Including stated cerebral-protection resources if arch work is planned." },
      { label: "Quoted ICU and ward allowance", detail: "Routine blood, organ and neurological monitoring within limits." },
      { label: "Early postoperative imaging", detail: "Only the modality and timing named in the letter." },
    ],
    exclusions: [
      { label: "Unplanned arch, coronary or valve work", detail: "Additional reconstruction outside scope." },
      { label: "Major bleeding and organ support", detail: "Re-exploration, massive transfusion, dialysis or prolonged ventilation." },
      { label: "Permanent pacemaker or reintervention", detail: "Separate unless stated." },
      { label: "Genetic testing and lifelong aortic imaging", detail: "Family evaluation and surveillance after the included interval." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and outpatient recovery support." },
    ],
    records: ["ECG-gated CT or MRI of the complete aorta", "Echocardiogram source images", "Prior aortic measurements with dates", "Genetic testing and family aortic history", "Prior cardiac or aortic operative notes"],
    followUp: "Lifelong follow-up includes blood-pressure control and imaging of the graft, valve and residual aorta. Prosthesis-specific anticoagulation applies, and genetic aortopathy may require family screening.",
    quoteQuestions: ["Is the plan valve-sparing or a composite conduit, and why?", "Which graft and valve prosthesis are assumed?", "Does disease extend into the arch?", "What cerebral and organ-protection strategy is planned?", "Is lifelong surveillance arranged after return?"],
    related: ["Aortic Aneurysm Surgery", "Aortic Valve Replacement", "Heart Valve Replacement", "Redo CABG"],
    figureAlt: "Medical illustration of an aortic root graft with reimplanted coronary buttons and valve-sparing and composite-valve alternatives",
  },
  {
    procedure: "Mitral Valve Repair",
    briefName: "Mitral Valve Repair",
    shortName: "mitral valve repair",
    slug: "mitral-valve-repair",
    specialist: "Mitral valve repair surgeon",
    definition: "Mitral valve repair corrects leaflet, chordal and annular causes of regurgitation while preserving the patient's native valve.",
    indication: "It may be preferred for severe primary mitral regurgitation when a durable repair is likely, and considered selectively in secondary regurgitation after ventricular and multidisciplinary assessment.",
    limits: "Severe calcification, rheumatic restriction, destructive infection or anatomy unlikely to hold a durable repair may require replacement or another pathway.",
    evaluation: "Transthoracic and transoesophageal echo identify prolapsing segments, flail tissue, restriction, calcification, annular dimensions, ventricular function and pulmonary pressure; coronary and rhythm assessment are added as indicated.",
    technique: "Repair may use leaflet resection, artificial chords, commissural or cleft work and an annuloplasty ring. Intraoperative transoesophageal echo assesses residual regurgitation, gradient and systolic anterior motion before leaving theatre.",
    approaches: [
      { label: "Degenerative leaflet repair", detail: "Segment-specific resection or neochords restore coaptation, usually with annuloplasty." },
      { label: "Functional mitral repair", detail: "Selected ventricular disease may use annuloplasty or another intervention after heart-failure optimization." },
      { label: "Sternotomy, minimally invasive or robotic access", detail: "Access is selected only if it supports a complete durable repair and safe management of complications." },
    ],
    duration: "often about 3–6 hours for isolated repair",
    criticalCare: "ICU monitoring focuses on ventricular function, residual regurgitation or stenosis, systolic anterior motion, rhythm, bleeding and organ recovery.",
    recovery: "Walking advances in hospital; access-specific wound care and rehabilitation continue for weeks. Rhythm and anticoagulation plans are individualized rather than inferred from valve preservation.",
    risks: "Risks include residual or recurrent regurgitation, mitral stenosis, systolic anterior motion, conversion to replacement, atrial fibrillation, stroke, bleeding, infection, organ injury, reoperation and death.",
    urgent: "new breathlessness, fainting, chest pain, unstable palpitations, fever, wound drainage, bleeding or rapid fluid gain",
    drivers: [
      { label: "Leaflet and chordal pathology", detail: "Single-segment prolapse and complex bileaflet or calcific disease require different repairs." },
      { label: "Repair ring and neochord requirements", detail: "Implants and technique should be itemized." },
      { label: "Access route", detail: "Sternotomy, thoracotomy and robotic access use different resources and candidacy criteria." },
      { label: "Atrial fibrillation or tricuspid work", detail: "Ablation, appendage or associated valve work broadens scope." },
      { label: "Ventricular and pulmonary condition", detail: "Poor function or pulmonary hypertension can lengthen support." },
    ],
    inclusions: [
      { label: "Mitral repairability review", detail: "Expert source-echo review and segment-specific plan." },
      { label: "Annuloplasty and repair materials", detail: "Expected ring, chords and patches where written." },
      { label: "Anaesthesia, intraoperative echo and perfusion", detail: "Only as stated in the estimate." },
      { label: "Quoted ICU and ward allowance", detail: "Routine postoperative care within defined limits." },
      { label: "Early postoperative echo", detail: "Assessment of repair and ventricular response if included." },
    ],
    exclusions: [
      { label: "Conversion to mitral replacement", detail: "Prosthesis and changed scope unless priced as a contingency." },
      { label: "Ablation, tricuspid or coronary surgery", detail: "Associated work not named." },
      { label: "Pacemaker or complication care", detail: "Additional unless expressly covered." },
      { label: "Long-term anticoagulation and echo", detail: "Medicines, INR if needed and surveillance after the included period." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and outpatient rehabilitation." },
    ],
    records: ["Complete transthoracic echocardiogram", "Transoesophageal echo source images and segment analysis", "Coronary assessment where indicated", "Rhythm-monitor and atrial-fibrillation history", "Prior endocarditis or cardiac-surgery records"],
    followUp: "Follow-up assesses residual or recurrent regurgitation, gradient, ventricular remodeling and rhythm. Anticoagulation depends on rhythm, repair and patient factors; selected patients still need temporary or long-term treatment.",
    quoteQuestions: ["Which mitral segments and repair techniques are anticipated?", "What is the estimated likelihood of durable repair?", "Is annuloplasty and intraoperative echo included?", "What is the replacement contingency?", "Will atrial-fibrillation or tricuspid surgery be added?"],
    related: ["Heart Valve Repair", "Heart Valve Replacement", "Minimally Invasive Cardiac Surgery", "Robotic Cardiac Surgery"],
    figureAlt: "Medical illustration of mitral leaflet prolapse corrected with artificial chords and an annuloplasty ring",
  },
  {
    procedure: "Aortic Valve Replacement",
    briefName: "Aortic Valve Replacement",
    shortName: "surgical aortic valve replacement",
    slug: "aortic-valve-replacement",
    specialist: "Aortic valve Heart Team specialist",
    definition: "Surgical aortic valve replacement removes a diseased aortic valve and implants a mechanical or tissue prosthesis through an operation using cardiopulmonary bypass.",
    indication: "It may be considered for severe symptomatic aortic stenosis or regurgitation, ventricular effects, or selected asymptomatic high-risk findings after surgical and transcatheter options are compared.",
    limits: "Moderate disease without another indication, active infection needing an endocarditis strategy, prohibitive surgery or anatomy and goals favoring TAVR may make routine surgical AVR inappropriate.",
    evaluation: "Echo confirms severity and ventricular response; CT can assess aorta and anatomy, while coronary assessment, surgical risk, frailty, kidney function, age, life expectancy and preferences guide the Heart Team decision.",
    technique: "Through sternotomy or selected smaller access, the surgeon excises the valve, debrides calcium and implants a sized prosthesis on bypass. A small annulus may require a strategy to avoid severe prosthesis-patient mismatch.",
    approaches: [
      { label: "Mechanical surgical valve", detail: "Offers durability but generally requires lifelong VKA anticoagulation; DOACs are not an alternative for a mechanical valve." },
      { label: "Surgical tissue valve", detail: "Often avoids lifelong valve-related VKA but can degenerate and may require future valve-in-valve or surgery." },
      { label: "SAVR versus TAVR", detail: "The Heart Team weighs age, anatomy, surgical risk, durability, coronary access, aorta, other surgery and patient goals." },
    ],
    duration: "often about 3–5 hours for isolated surgical AVR",
    criticalCare: "Cardiac ICU monitoring addresses bleeding, ventricular function, rhythm and conduction, prosthetic-valve performance, neurological status and organ recovery.",
    recovery: "Sternotomy recovery commonly takes several weeks with progressive walking and rehabilitation; the antithrombotic plan depends on prosthesis and patient factors.",
    risks: "Risks include bleeding, stroke, infection, paravalvular leak, prosthesis mismatch, thrombosis, conduction disturbance or pacemaker, kidney or lung injury, reoperation and death.",
    urgent: "sudden breathlessness, chest pain, fainting, new neurological change, fever, major bleeding, unstable palpitations or an anticoagulation problem",
    drivers: [
      { label: "Mechanical versus tissue prosthesis", detail: "Implant and lifelong care differ." },
      { label: "Annulus size and root anatomy", detail: "Root enlargement or another strategy may be needed to avoid mismatch." },
      { label: "Aorta, coronary or other valve work", detail: "Combined procedures change scope." },
      { label: "SAVR versus TAVR decision", detail: "These are distinct pathways with different resources and future implications." },
      { label: "Frailty and organ function", detail: "Clinical reserve affects ICU and rehabilitation." },
    ],
    inclusions: [
      { label: "Heart Team and imaging review", detail: "Assessment of surgical versus catheter options." },
      { label: "Named surgical prosthesis", detail: "Mechanical or tissue family and sizing assumptions." },
      { label: "Surgery, anaesthesia and perfusion", detail: "The planned isolated AVR episode." },
      { label: "Quoted ICU and ward allowance", detail: "Routine postoperative monitoring within limits." },
      { label: "Initial antithrombotic teaching", detail: "Early plan and testing only as written." },
    ],
    exclusions: [
      { label: "Aortic-root enlargement or other surgery", detail: "Additional aortic, CABG or valve work not named." },
      { label: "Permanent pacemaker", detail: "Separate unless explicitly included." },
      { label: "Major bleeding or organ-support care", detail: "Re-exploration, dialysis and prolonged ICU beyond terms." },
      { label: "Long-term anticoagulation and surveillance", detail: "Medicines, INR, echo and future intervention." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and longer-term rehabilitation." },
    ],
    records: ["Complete echocardiogram source images", "Cardiac CT if performed", "Coronary angiography or CT coronary assessment", "Prior valve and aortic measurements", "Anticoagulation history and preferences"],
    followUp: "Lifelong follow-up checks symptoms and prosthetic function. Mechanical valves require VKA/INR management; tissue valves need structural-degeneration surveillance, and antithrombotic therapy is individualized.",
    quoteQuestions: ["Why is surgical AVR favored over TAVR?", "Which prosthesis type, model family and size are assumed?", "How will prosthesis-patient mismatch be reduced?", "Could root enlargement or CABG be required?", "What anticoagulation access is needed after return?"],
    related: ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", "Heart Valve Replacement", "Aortic Root Replacement", "Double Valve Replacement"],
    figureAlt: "Medical illustration of calcified aortic valve removal and surgical placement of mechanical and tissue prosthesis options",
  },
  {
    procedure: "TAVR/TAVI (Transcatheter Aortic Valve Replacement)",
    briefName: "TAVR/TAVI (Transcatheter Aortic Valve Replacement)",
    shortName: "TAVR or TAVI",
    slug: "tavr-tavi-transcatheter-aortic-valve-replacement",
    specialist: "Structural Heart Team specialist",
    definition: "TAVR, also called TAVI, treats selected severe aortic stenosis by delivering a collapsible tissue valve through a catheter, most often from the femoral artery, without open-heart valve replacement.",
    indication: "It may be considered for severe symptomatic aortic stenosis and selected other guideline-supported settings after a multidisciplinary Heart Team weighs age, life expectancy, surgical risk, anatomy, durability and patient goals.",
    limits: "TAVR is not open surgery and is not suitable for every valve or patient. Active infection, unsuitable annulus or access, need for other cardiac surgery, unfavorable coronary or root anatomy, or durability priorities may favor surgery or another plan.",
    evaluation: "Echo confirms valve severity; ECG-gated TAVR CT sizes the annulus, assesses calcium, coronary heights, root and iliofemoral access. Coronary, renal, rhythm, frailty, dental or infection and surgical assessments complete Heart Team review.",
    technique: "In a catheter or hybrid laboratory, the team advances a crimped bioprosthetic valve—usually transfemorally—and deploys it within the diseased aortic valve under imaging, with immediate assessment of gradient, leak, coronary flow and conduction.",
    approaches: [
      { label: "Transfemoral TAVR", detail: "Preferred when iliofemoral access is suitable; closure devices and vascular backup are part of planning." },
      { label: "Alternative-access TAVR", detail: "Used selectively when femoral access is unsuitable; route and invasiveness vary and must be explicit." },
      { label: "Surgical AVR instead", detail: "May be more appropriate for younger patients, unfavorable anatomy, bicuspid or aortic disease, endocarditis or needed CABG/other surgery." },
    ],
    duration: "often about 1–3 hours, with planning and monitored recovery outside procedure time",
    criticalCare: "Monitoring may occur in a cardiac ICU or high-dependency setting and focuses on access bleeding, vascular injury, stroke, rhythm and heart block, valve function, coronary flow and kidney function.",
    recovery: "After uncomplicated transfemoral treatment, mobilization may begin early, but access healing, rhythm observation and follow-up echo govern discharge; catheter treatment does not guarantee next-day flight fitness.",
    risks: "Risks include death, stroke, major vascular injury or bleeding, annular rupture, coronary obstruction, paravalvular leak, valve malposition or embolization, kidney injury, infection and new conduction block requiring a permanent pacemaker.",
    urgent: "sudden breathlessness, chest pain, fainting, new weakness or speech change, a painful or enlarging access-site swelling, bleeding, fever, slow or unstable pulse",
    drivers: [
      { label: "Valve platform and size", detail: "Implant selection follows CT anatomy, not a generic device package." },
      { label: "Transfemoral versus alternative access", detail: "Access route changes team, facility and recovery needs." },
      { label: "Coronary and annular anatomy", detail: "Low coronaries, heavy calcium and prior valves can require protection strategies." },
      { label: "Pacemaker and vascular risk", detail: "Conduction observation and vascular intervention may extend admission." },
      { label: "Renal function and contrast planning", detail: "Kidney protection and added imaging influence the episode." },
    ],
    inclusions: [
      { label: "Multidisciplinary Heart Team review", detail: "Documented catheter-versus-surgery decision." },
      { label: "TAVR planning imaging", detail: "CT and other studies only when expressly listed." },
      { label: "One named transcatheter valve", detail: "Platform, size assumptions and supply terms." },
      { label: "Catheter or hybrid room and anaesthesia", detail: "Imaging, access and closure resources as written." },
      { label: "Quoted monitored stay and early echo", detail: "Rhythm and valve checks within defined limits." },
    ],
    exclusions: [
      { label: "Alternative-access conversion or emergency surgery", detail: "Additional rescue resources unless stated." },
      { label: "Permanent pacemaker", detail: "A separate implant and admission unless included." },
      { label: "Coronary or peripheral intervention", detail: "PCI, protection stents or vascular repair outside scope." },
      { label: "Major bleeding, stroke or kidney support", detail: "Complication care beyond written terms." },
      { label: "Long-term antithrombotic therapy and echo", detail: "Medicines and surveillance after the included period." },
    ],
    records: ["Complete echocardiogram source images", "ECG-gated TAVR CT files and report", "Coronary angiography or CT coronary assessment", "Peripheral vascular imaging", "ECG, rhythm, kidney-function and prior-valve records"],
    followUp: "Follow-up includes access-site and rhythm review, echo assessment and valve surveillance. Antiplatelet or anticoagulant treatment depends on bleeding risk and other indications; patients should not self-combine therapies.",
    quoteQuestions: ["Which valve platform and size does CT support?", "Is transfemoral access feasible and what is the backup route?", "What are the coronary-obstruction, vascular and pacemaker plans?", "Why is TAVR preferred over surgical AVR for this patient?", "Does the estimate include planning CT, closure devices and a pacemaker contingency?"],
    related: ["Aortic Valve Replacement", "Heart Valve Replacement", "Aortic Root Replacement", "Minimally Invasive Cardiac Surgery"],
    figureAlt: "Medical illustration of a transcatheter tissue aortic valve advanced through femoral access and deployed inside a stenotic native valve",
  },
  {
    procedure: "Aortic Aneurysm Surgery",
    briefName: "Aortic Aneurysm Surgery",
    shortName: "aortic aneurysm surgery",
    slug: "aortic-aneurysm-surgery",
    specialist: "Multidisciplinary aortic surgeon",
    definition: "Aortic aneurysm surgery replaces, excludes or reinforces a dangerously enlarged segment of the thoracic aorta using open, endovascular or hybrid reconstruction selected from location and anatomy.",
    indication: "Intervention may be considered for symptoms, rapid growth, threshold size adjusted for segment, body size and genetic syndrome, saccular or other high-risk morphology, or complications such as dissection or rupture.",
    limits: "Not every aneurysm requires immediate repair. Stable smaller disease may need surveillance and blood-pressure control, while frailty, anatomy or emergency instability changes the balance and technique.",
    evaluation: "Thin-slice CT angiography or MRI maps the entire aorta, branches and access vessels; echo, coronary assessment, kidney and lung function, neurological and genetic history guide a multidisciplinary plan.",
    technique: "Open repair replaces diseased aorta with a graft and may use bypass, hypothermia or circulatory arrest; endovascular repair deploys a stent graft through arteries, while hybrid repair combines branch rerouting and stenting.",
    approaches: [
      { label: "Open ascending or arch repair", detail: "May require cardiopulmonary bypass, cerebral protection and circulatory arrest." },
      { label: "Open descending or thoracoabdominal repair", detail: "Requires strategies for spinal cord, kidney, bowel and distal-organ protection." },
      { label: "Endovascular or hybrid repair", detail: "Depends on landing zones, branch vessels and access; surveillance and reintervention remain possible." },
    ],
    duration: "often about 5–10 hours for open repair; endovascular and hybrid times vary with extent",
    criticalCare: "ICU care focuses on bleeding, neurological and spinal-cord function, kidney, bowel and limb perfusion, respiratory support and blood-pressure control.",
    recovery: "Open recovery commonly takes weeks to months; endovascular recovery may be shorter but still needs access care and lifelong imaging for endoleak, migration and residual aortic disease.",
    risks: "Risks include catastrophic bleeding, stroke, spinal-cord ischemia and paralysis for relevant segments, kidney failure, bowel or limb ischemia, respiratory failure, endoleak after stenting, infection, reintervention and death.",
    urgent: "sudden severe chest, back or abdominal pain, collapse, new weakness or paralysis, loss of speech, a cold painful limb, severe breathlessness or access-site bleeding",
    drivers: [
      { label: "Aortic segment and extent", detail: "Ascending, arch, descending and thoracoabdominal disease require different organ-protection plans." },
      { label: "Open, endovascular or hybrid strategy", detail: "Grafts, stents, branch work and facilities differ materially." },
      { label: "Emergency rupture or dissection", detail: "Urgency and organ malperfusion dominate resources and risk." },
      { label: "Cerebral, spinal and visceral protection", detail: "Monitoring, drainage, perfusion and branch reconstruction depend on segment." },
      { label: "Genetic disease and prior repair", detail: "Connective-tissue disorders and redo anatomy affect extent and durability." },
    ],
    inclusions: [
      { label: "Whole-aorta imaging review", detail: "Aortic segment, branches, landing zones and access." },
      { label: "Named graft, stent or hybrid plan", detail: "Devices and branch assumptions stated." },
      { label: "Aortic surgery and anaesthesia", detail: "Perfusion and monitoring appropriate to written extent." },
      { label: "Quoted ICU and ward allowance", detail: "Defined neurological and organ monitoring." },
      { label: "Early postoperative imaging", detail: "Only when specified." },
    ],
    exclusions: [
      { label: "Additional branch or aortic segments", detail: "Expanded reconstruction beyond planned extent." },
      { label: "Major bleeding or organ support", detail: "Massive transfusion, dialysis, prolonged ventilation or bowel treatment." },
      { label: "Staged repair and later endovascular work", detail: "Future aortic episodes unless bundled explicitly." },
      { label: "Lifelong surveillance and reintervention", detail: "Serial CT or MRI and endoleak or residual-disease treatment." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and extended recovery." },
    ],
    records: ["Complete CT angiography or MRI of the entire aorta", "Prior aortic measurements and source images", "Echo and coronary assessment", "Genetic and family aortic history", "All prior open and endovascular operative notes and device identifiers"],
    followUp: "Lifelong blood-pressure management and CT or MRI surveillance of repaired and unrepaired aorta are essential. Endovascular grafts require endoleak and migration monitoring; genetic disease may require family evaluation.",
    quoteQuestions: ["Which aortic segments and branch vessels are included?", "Why is open, endovascular or hybrid repair proposed?", "What cerebral, spinal-cord, kidney and bowel protection is planned?", "Which grafts or stent devices are assumed?", "Which staged procedures and lifelong scans remain separate?"],
    related: ["Aortic Root Replacement", "Aortic Valve Replacement", "Redo CABG", "Minimally Invasive Cardiac Surgery"],
    figureAlt: "Medical illustration comparing open graft replacement and endovascular stent-graft exclusion of thoracic aortic aneurysm segments",
  },
  {
    procedure: "Minimally Invasive Cardiac Surgery",
    briefName: "Minimally Invasive Cardiac Surgery",
    shortName: "minimally invasive cardiac surgery",
    slug: "minimally-invasive-cardiac-surgery",
    specialist: "Minimally invasive cardiac surgeon",
    definition: "Minimally invasive cardiac surgery uses smaller thoracic incisions for a specifically indicated valve, coronary or other heart operation while preserving the same clinical treatment goal.",
    indication: "It may be considered when the underlying operation and anatomy can be treated completely through limited access and the patient can tolerate peripheral cannulation, one-lung ventilation or other technique-specific needs.",
    limits: "The label is not a diagnosis. Extensive coronary targets, aortic disease, emergency instability, severe vascular disease, prior adhesions or need for multiple procedures may make sternotomy safer or more complete.",
    evaluation: "The team first confirms the underlying operation, then reviews echo, coronary and CT anatomy, aorta and peripheral vessels, lung function, chest history and the likelihood of safe conversion.",
    technique: "Through a mini-thoracotomy or partial sternotomy, the team performs the named operation using specialized instruments and often peripheral bypass cannulation; consent includes conversion to full sternotomy when safety or completeness requires it.",
    approaches: [
      { label: "Mini-thoracotomy valve surgery", detail: "Selected mitral, tricuspid or aortic operations through a lateral incision." },
      { label: "Partial sternotomy", detail: "Limited central access often used for selected aortic-valve or aortic procedures." },
      { label: "Minimally invasive coronary bypass", detail: "Selected coronary targets, often LAD-focused; it is not a substitute for required complete multivessel grafting." },
    ],
    duration: "often about 3–6 hours, depending on the underlying operation and access",
    criticalCare: "ICU monitoring remains cardiac-surgical care, including bleeding, heart and lung function, rhythm, vascular cannulation sites and organ recovery.",
    recovery: "A smaller incision may reduce some early discomfort and speed mobility for selected patients, but bypass, lung recovery and the underlying heart operation still determine discharge and rehabilitation.",
    risks: "Risks include bleeding, stroke, heart or lung injury, groin-vessel complications, nerve injury, rhythm disturbance, incomplete treatment, conversion to sternotomy, infection, organ injury and death.",
    urgent: "chest pain, severe breathlessness, fainting, neurological symptoms, fever, wound or groin drainage, enlarging swelling, bleeding or an unstable rhythm",
    drivers: [
      { label: "Underlying cardiac operation", detail: "Mitral repair, AVR and coronary grafting are not one product." },
      { label: "Incision and cannulation strategy", detail: "Thoracotomy, partial sternotomy and peripheral bypass use different resources." },
      { label: "Specialized instruments and imaging", detail: "Endoscopic equipment and intraoperative echo should be explicit." },
      { label: "Conversion to sternotomy", detail: "The clinical and billing contingency must be written." },
      { label: "Prior surgery and vascular suitability", detail: "Adhesions and peripheral disease may preclude limited access." },
    ],
    inclusions: [
      { label: "Underlying-operation assessment", detail: "The exact valve, graft or other procedure—not just the access label." },
      { label: "Named minimally invasive access", detail: "Incision, cannulation and special equipment assumptions." },
      { label: "Anaesthesia, imaging and perfusion", detail: "As required by the stated procedure." },
      { label: "Quoted ICU and ward allowance", detail: "Cardiac postoperative care within limits." },
      { label: "Access-site and wound follow-up", detail: "Early review where stated." },
    ],
    exclusions: [
      { label: "Conversion to sternotomy", detail: "Changed resources unless expressly included." },
      { label: "Additional cardiac work", detail: "Valve, graft or aortic procedures beyond scope." },
      { label: "Vascular or lung complication care", detail: "Repair, prolonged ventilation or added ICU." },
      { label: "Long-term rehabilitation and surveillance", detail: "Depends on the underlying operation." },
      { label: "Travel and lodging", detail: "Flights, companion and recovery accommodation." },
    ],
    records: ["Records defining the underlying cardiac indication", "Echo and coronary source imaging", "Chest and peripheral-vessel CT if performed", "Lung-function testing where relevant", "Prior chest surgery and radiation records"],
    followUp: "Follow-up is determined by the underlying valve, coronary or other operation, plus thoracic and cannulation-site healing. Limited access does not remove the need for cardiac rehabilitation or lifelong disease management.",
    quoteQuestions: ["What exact cardiac operation sits behind the minimally invasive label?", "Which incision and cannulation route are planned?", "Could full sternotomy provide a safer or more complete result?", "What triggers conversion and how is it billed?", "What outcome-neutral reason supports this access for this anatomy?"],
    related: ["Robotic Cardiac Surgery", "Mitral Valve Repair", "Aortic Valve Replacement", "CABG (Coronary Artery Bypass Grafting)"],
    figureAlt: "Medical illustration of mini-thoracotomy and partial-sternotomy access routes for selected valve and coronary operations",
  },
  {
    procedure: "Robotic Cardiac Surgery",
    briefName: "Robotic Cardiac Surgery",
    shortName: "robot-assisted cardiac surgery",
    slug: "robotic-cardiac-surgery",
    specialist: "Robot-assisted cardiac surgeon",
    definition: "Robotic cardiac surgery uses console-controlled instruments and small ports to perform a defined operation, most commonly selected mitral repair or limited coronary and intracardiac procedures.",
    indication: "It may be considered when the underlying lesion is suitable, peripheral vessels and chest anatomy permit safe access, and a trained team can deliver the complete intended operation.",
    limits: "A robot is an access tool, not an indication or quality guarantee. Complex aortic disease, extensive coronary targets, severe vascular disease, emergency instability, adhesions or combined procedures may require another approach.",
    evaluation: "Detailed imaging confirms the underlying operation and repairability; CT may assess chest, aorta and iliofemoral cannulation, while lung function, prior surgery and comorbidity determine suitability.",
    technique: "The surgeon operates from a console while bedside staff place ports, establish bypass where required and manage instruments. The plan must include rapid conversion to thoracotomy or sternotomy if exposure, bleeding or safety requires it.",
    approaches: [
      { label: "Robotic mitral repair", detail: "Selected repairable mitral lesions with peripheral bypass and intraoperative echo." },
      { label: "Robot-assisted coronary bypass", detail: "Usually selected internal-thoracic-to-LAD grafting, sometimes within a hybrid revascularization plan." },
      { label: "Thoracoscopic or open alternative", detail: "A nonrobotic limited incision or sternotomy may provide safer, more complete treatment." },
    ],
    duration: "often about 4–7 hours, depending on the underlying operation and docking",
    criticalCare: "Postoperative care remains cardiac ICU care, with added attention to one-lung ventilation effects, port sites, peripheral cannulation, bleeding and completeness of the underlying repair.",
    recovery: "Port wounds may heal faster than a sternotomy, but fatigue, bypass effects, lung recovery and rehabilitation follow the actual heart operation; no platform guarantees faster discharge.",
    risks: "Risks include bleeding, vascular or lung injury, stroke, phrenic or other nerve injury, incomplete repair or grafting, conversion to open surgery, rhythm disturbance, infection, organ injury and death.",
    urgent: "new chest pain, severe breathlessness, fainting, neurological change, fever, port or groin bleeding, enlarging swelling or unstable palpitations",
    drivers: [
      { label: "Underlying operation and complexity", detail: "Mitral reconstruction and coronary grafting require distinct plans." },
      { label: "Robotic platform and trained team availability", detail: "The article does not assert a campus has a robot or an active program." },
      { label: "Peripheral cannulation and one-lung ventilation", detail: "Vascular and respiratory assessment affects resources." },
      { label: "Docking, instruments and intraoperative imaging", detail: "Specialized consumables and echo should be itemized." },
      { label: "Conversion or hybrid PCI contingency", detail: "Additional treatment boundaries must be written." },
    ],
    inclusions: [
      { label: "Underlying-procedure and access assessment", detail: "Clinical indication, repair or graft plan and robotic suitability." },
      { label: "Named robotic instruments and consumables", detail: "Only those stated in the quote." },
      { label: "Console, bedside, anaesthesia and perfusion teams", detail: "Including imaging where written." },
      { label: "Quoted ICU and ward allowance", detail: "Routine cardiac recovery within limits." },
      { label: "Port and cannulation-site review", detail: "Early follow-up if included." },
    ],
    exclusions: [
      { label: "Conversion to open surgery", detail: "Thoracotomy or sternotomy resources unless stated." },
      { label: "Hybrid PCI or additional cardiac work", detail: "A separate stage unless bundled." },
      { label: "Vascular, lung or major complication care", detail: "Repair and extended ICU outside terms." },
      { label: "Long-term disease follow-up", detail: "Determined by the underlying valve or coronary operation." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and outpatient recovery." },
    ],
    records: ["Records defining the exact valve or coronary indication", "Echo and coronary source images", "Chest, aortic and iliofemoral CT if performed", "Pulmonary assessment", "Prior chest surgery and radiation records"],
    followUp: "Follow-up addresses the underlying repair or bypass, rhythm, cardiac rehabilitation and port and cannulation wounds. Platform use does not replace disease-specific lifelong care.",
    quoteQuestions: ["What exact operation will the robot assist?", "Does the named campus currently accept this operation robotically?", "Who performs console and bedside roles?", "What triggers conversion and how is it billed?", "If hybrid PCI is proposed, is it included?"],
    related: ["Minimally Invasive Cardiac Surgery", "Mitral Valve Repair", "CABG (Coronary Artery Bypass Grafting)", "Heart Valve Repair"],
    figureAlt: "Medical illustration of console-controlled robotic instruments entering through chest ports for a selected mitral or coronary operation",
  },
  {
    procedure: "LVAD Implantation",
    briefName: "LVAD Implantation",
    shortName: "left ventricular assist device implantation",
    slug: "lvad-implantation",
    specialist: "Advanced heart-failure and LVAD specialist",
    definition: "An LVAD is a durable mechanical pump that moves blood from the left ventricle to the aorta for selected advanced heart-failure patients as a bridge to transplant, bridge to decision or destination therapy.",
    indication: "Implantation may be considered when advanced heart failure remains severe despite optimized treatment and the multidisciplinary team judges that expected benefit, right-heart function, adherence and support justify device therapy.",
    limits: "Irreversible severe right-heart, neurological, hepatic or renal dysfunction, active infection, prohibitive bleeding risk, inability to manage equipment or absent reliable caregiver and follow-up can make LVAD unsafe.",
    evaluation: "Assessment includes hemodynamics, right- and left-heart function, coronary and valve disease, kidney, liver, lung and neurological status, infection and nutrition, bleeding and thrombosis risk, psychosocial readiness, caregiver capacity and goals.",
    technique: "The surgeon implants an inflow cannula in the left ventricle and an outflow graft to the aorta; the pump connects through a driveline to external controllers and batteries. The patient and caregiver must learn power, alarms, driveline care and emergencies.",
    approaches: [
      { label: "Bridge to transplant", detail: "Supports an eligible listed or potentially eligible patient while donor timing remains uncertain." },
      { label: "Destination therapy", detail: "Long-term support when transplantation is not planned, with lifelong device-clinic care." },
      { label: "Temporary support or biventricular strategy", detail: "Shock or severe right-heart failure may require different temporary or additional support, not a routine LVAD package." },
    ],
    duration: "often about 4–8 hours for implantation, followed by weeks of recovery and device training",
    criticalCare: "ICU management balances pump speed, right-heart function, bleeding, anticoagulation, rhythm and end-organ recovery; temporary right-ventricular or other support may be required.",
    recovery: "Recovery includes physical rehabilitation and demonstrated competence with controller changes, batteries, alarms, driveline dressing and emergency plans. The device and anticoagulation require lifelong specialist access.",
    risks: "Risks include major bleeding, pump or systemic thrombosis, stroke, driveline or deep infection, right-heart failure, arrhythmia, hemolysis, device malfunction, gastrointestinal bleeding, reoperation and death.",
    urgent: "any device alarm, power interruption, collapse, new neurological symptoms, bleeding, dark urine, fever, driveline redness or drainage, severe breathlessness or rapidly increasing swelling",
    drivers: [
      { label: "Device model and complete equipment kit", detail: "Pump, controllers, batteries, charger and backup equipment must be named." },
      { label: "Bridge versus destination pathway", detail: "Goals and long-term program responsibilities differ." },
      { label: "Right-heart failure risk", detail: "Temporary RV support or biventricular therapy can transform the episode." },
      { label: "ICU recovery and rehabilitation", detail: "Bleeding, organ function and training determine stay." },
      { label: "Lifelong anticoagulation and device clinic", detail: "Monitoring and consumables continue beyond implantation." },
    ],
    inclusions: [
      { label: "Advanced heart-failure evaluation", detail: "Hemodynamic, organ, psychosocial and caregiver assessment." },
      { label: "Named LVAD and equipment", detail: "Pump and exact controller, battery and backup inventory." },
      { label: "Implantation, anaesthesia and perfusion", detail: "The planned device episode." },
      { label: "Quoted ICU, ward and rehabilitation", detail: "Defined support and training period." },
      { label: "Patient and caregiver device training", detail: "Competency and emergency teaching within scope." },
    ],
    exclusions: [
      { label: "Temporary RVAD, ECMO or biventricular support", detail: "Separate rescue or additional support unless stated." },
      { label: "Pump exchange or major complication care", detail: "Thrombosis, bleeding, stroke or deep infection." },
      { label: "Long-term driveline supplies and equipment replacement", detail: "Dressings, batteries, controllers and repairs after included period." },
      { label: "Lifelong anticoagulation and device-clinic monitoring", detail: "Medicines, INR and specialist follow-up." },
      { label: "Transplant evaluation or surgery", detail: "A separate program and episode if bridge therapy succeeds." },
    ],
    records: ["Complete advanced heart-failure history and imaging", "Right-heart catheterization and hemodynamics", "All implanted-device and prior cardiac-surgery records", "Kidney, liver, lung and neurological assessments", "Infection, bleeding, psychosocial and caregiver evaluations"],
    followUp: "Lifelong LVAD-program follow-up monitors pump parameters, anticoagulation, hemolysis, driveline infection, right-heart function, blood pressure, nutrition and equipment. A local team must be able to manage emergencies after return.",
    quoteQuestions: ["Which LVAD model and full backup-equipment inventory are included?", "Is the goal bridge to transplant or destination therapy?", "What is the right-heart support contingency?", "How long are rehabilitation and caregiver training funded?", "Who supplies driveline materials, batteries, repairs and 24-hour emergency support after return?"],
    related: ["Heart Transplant Surgery", "CABG (Coronary Artery Bypass Grafting)", "Heart Valve Repair", "Redo CABG"],
    figureAlt: "Medical illustration of a durable LVAD pump, ventricular inflow, aortic outflow graft, driveline, controller and external batteries",
  },
  {
    procedure: "Redo CABG",
    briefName: "Redo CABG",
    shortName: "repeat coronary artery bypass grafting",
    slug: "redo-cabg",
    specialist: "Redo coronary cardiac surgeon",
    definition: "Redo CABG is repeat bypass surgery after a previous cardiac operation, performed when graft failure or progressive native coronary disease requires surgical revascularization.",
    indication: "It may be considered for selected important ischemia or symptoms when anatomy is unsuitable for PCI, viable myocardium and graft targets remain, and the expected benefit justifies elevated re-entry risk.",
    limits: "Repeat surgery is not first-time CABG at a higher price. Poor distal targets, absent conduits, limited viability, severe frailty or a feasible PCI or medical pathway can make redo surgery inappropriate.",
    evaluation: "Coronary angiography defines native and graft disease; CT maps the sternum's relation to patent grafts, aorta and heart. Viability, ventricular function, conduit availability, prior operative notes and PCI options are reviewed by a Heart Team.",
    technique: "The team plans safe re-entry through adhesions, protects any patent grafts, selects remaining arterial or venous conduits and constructs bypasses to useful distal targets, using on-pump or selected off-pump support.",
    approaches: [
      { label: "Redo sternotomy CABG", detail: "Careful re-entry and adhesiolysis precede grafting; peripheral access or bypass may be prepared before opening." },
      { label: "Alternative-incision or limited grafting", detail: "Selected targets may be reached without full re-entry when anatomy permits." },
      { label: "PCI or hybrid revascularization", detail: "May avoid repeat surgery or complement a limited graft plan after Heart Team review." },
    ],
    duration: "often about 5–8 hours, with wide variation from re-entry, adhesions and graft work",
    criticalCare: "ICU monitoring emphasizes bleeding, myocardial function, graft perfusion, neurological and kidney status; recovery may be longer than after uncomplicated first-time CABG.",
    recovery: "Adhesiolysis, blood loss and prior disease can slow recovery. Sternotomy protection, walking and rehabilitation generally take weeks, with prevention treatment continuing lifelong.",
    risks: "Risks include injury to a patent graft, heart or aorta during re-entry, major bleeding and transfusion, myocardial infarction, stroke, kidney or lung injury, infection, graft failure, reoperation and death.",
    urgent: "new chest pain, severe breathlessness, collapse, neurological symptoms, unstable palpitations, fever, wound drainage or increasing swelling",
    drivers: [
      { label: "Re-entry anatomy and adhesions", detail: "CT relationship of sternum, heart and patent grafts shapes preparation." },
      { label: "Patent grafts requiring protection", detail: "Internal thoracic and other graft injury can be catastrophic." },
      { label: "Remaining conduit and target quality", detail: "Prior harvest and distal disease limit options." },
      { label: "On-pump, off-pump or alternative access", detail: "Support and exposure depend on anatomy." },
      { label: "Combined valve or aortic work", detail: "Associated redo reconstruction broadens risk and resources." },
    ],
    inclusions: [
      { label: "Redo-specific CT and angiography review", detail: "Mapping re-entry, grafts, targets and conduits." },
      { label: "Planned re-entry and graft construction", detail: "Expected access, targets and conduits." },
      { label: "Anaesthesia and perfusion preparation", detail: "Including pre-entry bypass access only if written." },
      { label: "Quoted blood, ICU and ward allowance", detail: "Defined routine support recognizing higher complexity." },
      { label: "Routine discharge and rehabilitation plan", detail: "Within stated follow-up." },
    ],
    exclusions: [
      { label: "Major re-entry injury or massive bleeding", detail: "Additional repair, transfusion and organ support." },
      { label: "Additional valve or aortic procedure", detail: "Combined work not named." },
      { label: "Mechanical circulatory support", detail: "IABP, ECMO or other devices unless stated." },
      { label: "PCI or later revascularization", detail: "Separate stage unless bundled." },
      { label: "Long-term rehabilitation and travel", detail: "Outpatient recovery, flights and lodging." },
    ],
    records: ["All prior cardiac operative notes and graft diagrams", "Current coronary and bypass-graft angiography images", "Contrast CT showing sternum, heart, aorta and graft relationships", "Echo and viability assessment where relevant", "Prior conduit harvest and PCI records"],
    followUp: "Follow-up covers wound healing, rhythm, rehabilitation and lifelong secondary prevention. The discharge record should clearly diagram new and retained grafts for future interventions.",
    quoteQuestions: ["How does CT characterize re-entry risk?", "Which old grafts remain patent and how will they be protected?", "Which conduits and distal targets remain usable?", "Could PCI or an alternative incision reduce risk?", "What blood-product and mechanical-support contingencies are outside the quote?"],
    related: ["CABG (Coronary Artery Bypass Grafting)", "Minimally Invasive Cardiac Surgery", "Robotic Cardiac Surgery", "Aortic Aneurysm Surgery"],
    figureAlt: "Medical illustration of repeat sternotomy adhesions, patent bypass graft protection and placement of new coronary grafts",
  },
  {
    procedure: "Double Valve Replacement",
    briefName: "Double Valve Replacement",
    shortName: "double valve replacement",
    slug: "double-valve-replacement",
    specialist: "Multivalve cardiac surgeon",
    definition: "Double valve replacement implants prostheses in two diseased heart-valve positions during one operation, commonly aortic and mitral, when durable repair is unsuitable.",
    indication: "It may be considered when two valves each meet an accepted intervention threshold and replacement offers a more durable or feasible result than repair.",
    limits: "Two abnormal echoes do not automatically justify two replacements. The team should distinguish primary from secondary lesions, assess repair options and avoid replacing a valve that does not independently warrant intervention.",
    evaluation: "Transthoracic and transoesophageal echo define both mechanisms, severity, ventricular and right-heart function and pulmonary pressure; coronary assessment, rhythm, organ fitness and prosthesis preferences complete planning.",
    technique: "On cardiopulmonary bypass, the surgeon excises or excludes both diseased valves and implants appropriately sized mechanical, tissue or mixed prostheses, while managing interaction between valves and conduction tissue.",
    approaches: [
      { label: "Two mechanical valves", detail: "Offers durability but requires lifelong VKA anticoagulation and reliable INR monitoring." },
      { label: "Two tissue valves", detail: "Often avoids lifelong valve-related VKA but exposes both positions to structural degeneration." },
      { label: "Mixed prostheses or repair-plus-replacement", detail: "Age, anatomy, durability, anticoagulation and repairability may support different choices at each valve." },
    ],
    duration: "often about 5–8 hours, longer with complex reconstruction or associated procedures",
    criticalCare: "ICU monitoring addresses longer bypass effects, bleeding, ventricular and right-heart function, pulmonary pressure, rhythm, conduction, both prostheses and organ recovery.",
    recovery: "Recovery may be slower than after isolated valve surgery; sternotomy healing, anticoagulation education and cardiac rehabilitation usually continue for weeks.",
    risks: "Risks include major bleeding, stroke, low cardiac output, right-heart failure, prosthetic thrombosis or leak, heart block or pacemaker, infection, kidney or lung injury, reoperation and death.",
    urgent: "sudden breathlessness, chest pain, fainting, neurological symptoms, fever, major bleeding, unstable palpitations or difficulty obtaining anticoagulation",
    drivers: [
      { label: "Two valve positions and mechanisms", detail: "Aortic-mitral, mitral-tricuspid and other combinations differ." },
      { label: "Two prosthesis selections", detail: "Mechanical, tissue or mixed implants change cost and lifelong care." },
      { label: "Repair option for either valve", detail: "Repair-plus-replacement may be preferable and changes scope." },
      { label: "Longer bypass and ventricular condition", detail: "Pulmonary hypertension and right-heart function affect ICU needs." },
      { label: "Associated CABG, aortic or rhythm work", detail: "Combined procedures further broaden the episode." },
    ],
    inclusions: [
      { label: "Multivalve imaging and Heart Team review", detail: "Independent indication and repairability assessment for each valve." },
      { label: "Two named prostheses", detail: "Positions, types and sizing assumptions." },
      { label: "Surgery, anaesthesia and perfusion", detail: "The planned two-valve episode." },
      { label: "Quoted ICU and ward allowance", detail: "Routine multivalve postoperative care within limits." },
      { label: "Initial anticoagulation and echo", detail: "Only as stated." },
    ],
    exclusions: [
      { label: "Third valve, CABG or aortic work", detail: "Additional procedure not named." },
      { label: "Pacemaker or mechanical support", detail: "Separate unless expressly included." },
      { label: "Major bleeding and extended organ support", detail: "Complication care beyond terms." },
      { label: "Lifelong anticoagulation and two-valve surveillance", detail: "Medicines, INR and future imaging." },
      { label: "Travel and rehabilitation", detail: "Flights, lodging and outpatient rehabilitation." },
    ],
    records: ["Complete transthoracic and transoesophageal echo images", "Coronary assessment", "Rhythm and pulmonary-pressure assessments", "Prior valve surgery or endocarditis records", "Anticoagulation history and prosthesis preferences"],
    followUp: "Lifelong follow-up monitors both prostheses, ventricular function, pulmonary pressure and rhythm. Mechanical prostheses require VKA/INR management; tissue prostheses require degeneration surveillance.",
    quoteQuestions: ["Does each valve independently meet an intervention threshold?", "Could either valve be repaired?", "Which prosthesis is proposed for each position and why?", "How will two prostheses affect anticoagulation?", "Are pacemaker and low-output contingencies included?"],
    related: ["Heart Valve Replacement", "Heart Valve Repair", "Mitral Valve Repair", "Aortic Valve Replacement"],
    figureAlt: "Medical illustration of two prosthetic valves implanted in aortic and mitral positions with mechanical and tissue choices",
  },
  {
    procedure: "Congenital Heart Surgery",
    briefName: "Congenital Heart Surgery",
    shortName: "congenital heart surgery",
    slug: "congenital-heart-surgery",
    specialist: "Congenital heart surgeon",
    definition: "Congenital heart surgery is an umbrella category for anatomy-specific repair or palliation of heart and great-vessel differences present from birth in children or adults.",
    indication: "Timing and procedure depend on the exact diagnosis, physiology, symptoms, oxygenation, growth, ventricular and valve function, pulmonary pressure, prior stages and likely natural history.",
    limits: "The broad label is not a quote-ready operation. Some lesions need observation or catheter treatment, some require staged palliation, and irreversible pulmonary vascular disease, infection or organ instability can alter candidacy.",
    evaluation: "A congenital team reviews complete echo images, CT, MRI or catheterization as indicated, oxygenation and hemodynamics, rhythm, genetic and extracardiac conditions, growth, prior operations and the patient's or family's goals.",
    technique: "The operation may close a shunt, repair a valve, reconstruct an outflow or arch, redirect veins, or create a staged circulation using patches, conduits, bypass or circulatory-arrest strategies tailored to individual anatomy.",
    approaches: [
      { label: "Biventricular repair", detail: "Reconstructs circulation using two functioning ventricles when anatomy and physiology permit." },
      { label: "Staged single-ventricle palliation", detail: "A sequence rather than one repair; each stage has distinct candidacy and long-term consequences." },
      { label: "Surgery, catheter treatment or hybrid care", detail: "The team selects and sometimes combines pathways according to anatomy, age and physiology." },
    ],
    duration: "from about 3 hours for selected isolated repairs to 10 hours or more for complex reconstruction",
    criticalCare: "Congenital cardiac ICU care monitors anatomy-specific circulation, oxygenation, bleeding, rhythm, ventricular and valve function, pulmonary pressure, neurological status, feeding and organ recovery.",
    recovery: "Recovery ranges widely with age, anatomy and stage. Feeding, growth, oxygen, mobility and family teaching may determine discharge, and congenital cardiology follow-up is generally lifelong.",
    risks: "Risks are anatomy-specific and can include residual shunt or obstruction, valve dysfunction, low cardiac output, arrhythmia or heart block, pulmonary hypertensive events, bleeding, neurological or organ injury, reintervention, death and failure to reach a later planned stage.",
    urgent: "blue or unusually pale color, breathing difficulty, fainting, persistent fever, poor feeding, marked lethargy, reduced urine, new swelling, wound drainage or an important oxygen-saturation change",
    drivers: [
      { label: "Exact anatomy and physiology", detail: "Diagnosis name alone does not define operative scope." },
      { label: "Age, size, nutrition and urgency", detail: "Neonatal, pediatric and adult congenital episodes differ." },
      { label: "Primary repair versus staged palliation", detail: "One operation cannot be priced as an entire lifetime pathway." },
      { label: "Patches, conduits, valves and associated work", detail: "Implants and reconstructions must be explicit." },
      { label: "Prior operations and organ condition", detail: "Adhesions, collaterals, pulmonary pressure and ventricular function affect complexity." },
    ],
    inclusions: [
      { label: "Congenital multidisciplinary review", detail: "Anatomy, physiology, stage and alternatives." },
      { label: "Exact named operation", detail: "Repair or palliation and associated work rather than the umbrella label." },
      { label: "Patches, conduits and bypass resources", detail: "Only devices and materials stated." },
      { label: "Quoted congenital cardiac ICU and ward allowance", detail: "Age-appropriate monitoring within limits." },
      { label: "Family or patient discharge teaching", detail: "Medicines, feeding, wounds and warning signs." },
    ],
    exclusions: [
      { label: "Additional or later staged procedures", detail: "Future congenital operations or catheter interventions." },
      { label: "Unexpected reconstruction or mechanical support", detail: "Added anatomy, ECMO or reoperation outside terms." },
      { label: "Prolonged feeding, respiratory or organ support", detail: "Extended ICU and multidisciplinary care." },
      { label: "Lifelong congenital follow-up", detail: "Imaging, rhythm, exercise, pregnancy and reintervention care." },
      { label: "Family travel and living costs", detail: "Parent or companion flights, lodging, meals and schedule changes." },
    ],
    records: ["Complete congenital diagnosis and physiology summary", "All echocardiogram image loops and reports", "Catheterization, CT and MRI source files", "Every prior operative note, diagram, shunt, conduit and implant detail", "Oxygen saturation, growth, feeding, rhythm, genetic and extracardiac records"],
    followUp: "Lifelong congenital cardiology follow-up tracks residual anatomy, ventricular and valve function, rhythm, exercise, growth or pregnancy issues, endocarditis prevention and timing of catheter or surgical reintervention.",
    quoteQuestions: ["What exact anatomy and named operation does the estimate assume?", "Is the goal complete repair or one stage of palliation?", "Which associated lesions and implants are included?", "What finding could change the plan after arrival?", "Does the receiving team provide age-appropriate congenital ICU and lifelong handover?"],
    related: ["Heart Valve Repair", "Aortic Root Replacement", "Heart Transplant Surgery", "Double Valve Replacement"],
    figureAlt: "Medical illustration of individualized congenital heart pathways including septal repair, outflow reconstruction and staged circulation",
  },
];

export const cardiacSurgeryArticles: CostArticle[] = profiles.map(createCardiacSurgeryArticle);

export const cardiacSurgeryArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  cardiacSurgeryArticles.map((article) => [article.slug, article]),
);

