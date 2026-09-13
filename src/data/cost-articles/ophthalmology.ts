import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { OPHTHALMOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";

const SHARED_OPHTHALMOLOGY = ["Blepharoplasty"] as const;

type OphthalmologyProcedure = Exclude<
  (typeof OPHTHALMOLOGY_PROCEDURES)[number],
  (typeof SHARED_OPHTHALMOLOGY)[number]
>;

type OphthalmologyProfile = {
  procedure: OphthalmologyProcedure;
  shortName: string;
  specialist: string;
  definition: string;
  candidacy: string;
  assessment: string;
  technique: string;
  approaches: LabelledDetail[];
  lensOptions: LabelledDetail[];
  duration: string;
  admission: string;
  recovery: string;
  risks: string;
  urgent: string;
  drivers: LabelledDetail[];
  records: string[];
  quoteQuestions: string[];
  related: OphthalmologyProcedure[];
  imageAlts: [string, string, string];
};

type OphthalmologyProfileInput = Pick<
  OphthalmologyProfile,
  | "procedure"
  | "shortName"
  | "specialist"
  | "definition"
  | "candidacy"
  | "assessment"
  | "technique"
  | "approaches"
  | "lensOptions"
  | "drivers"
  | "related"
  | "imageAlts"
> &
  Partial<OphthalmologyProfile>;

export const OPHTHALMOLOGY_EXCLUSIVE_PROCEDURES =
  OPHTHALMOLOGY_PROCEDURES.filter(
    (procedure): procedure is OphthalmologyProcedure =>
      !SHARED_OPHTHALMOLOGY.includes(
        procedure as (typeof SHARED_OPHTHALMOLOGY)[number],
      ),
  );

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    campus: string;
    lodging: string;
    local: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    campus:
      "Delhi, Gurugram, Noida and Faridabad are separate clinical corridors. Confirm whether examination, biometry, surgery and next-day review occur at one campus before booking transport.",
    lodging:
      "Choose a quiet, lift-accessible stay near the named eye unit, with a companion and a reliable route back if pain or vision changes.",
    local:
      "Winter pollution, dust and long road transfers can complicate eye protection and drop timing. Follow the clinician's shield, hygiene and outdoor-exposure instructions.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    campus:
      "Mumbai and Navi Mumbai are not interchangeable bases. Peak traffic, harbour crossings and monsoon disruption matter when biometry and early postoperative checks are time-specific.",
    lodging:
      "Stay on the same side of the harbour as the confirmed campus and verify lift access, clean hand-washing facilities and sheltered transport.",
    local:
      "Humidity and heavy rain make a dry eye shield, protected transfers and flexible departure practical, without changing the surgeon's review criteria.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    campus:
      "The airport is distant from several eye-care districts, and cross-city traffic can turn a brief review into a long journey. Name the measurement, operating and emergency-review sites.",
    lodging:
      "A stay near the treating eye campus is usually more useful than an airport hotel. Arrange a companion because dilation and early postoperative vision can affect navigation.",
    local:
      "Milder weather does not remove infection, pressure or retinal warning signs. Complete the scheduled eye examination before fixing onward travel.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    campus:
      "Some eye-care corridors have comparatively direct airport access, but the exact campus still controls transfer time for measurements, surgery and review.",
    lodging:
      "Use air-conditioned, flexible lodging near the named unit, with easy vehicle access and clean storage for drops and the protective shield.",
    local:
      "Heat and glare can make protected travel uncomfortable. Sunglasses may help comfort when approved, but they do not replace the eye shield or prescribed drops.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    campus:
      "The airport is south of major hospital districts. Jubilee Hills, Hi-Tech City and Secunderabad produce different transfer plans, so confirm every clinical location first.",
    lodging:
      "Keep flexible lodging and a companion within the response radius advised by the eye team, rather than assuming an airport-area stay is suitable.",
    local:
      "Summer heat and a long airport transfer can add fatigue while drops are frequent. Plan indoor recovery and the first review before departure.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored figure is a national per-eye planning range. It does not specify lens model, technique, investigations, candidacy or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Eye- and review-dependent",
    positioning: "Quotation required",
    context:
      "Compare laterality, measurements, exact IOL, surgeon and facility scope, drops, reviews and complication terms rather than a headline package.",
  },
  {
    country: "Thailand",
    stay: "Eye- and review-dependent",
    positioning: "Quotation required",
    context:
      "International coordination does not establish retinal suitability, lens availability, postoperative pressure review or continuity after return.",
  },
  {
    country: "United Arab Emirates",
    stay: "Eye- and review-dependent",
    positioning: "Quotation required",
    context:
      "Professional, day-care, diagnostic, IOL, pharmacy and follow-up charges may be billed separately and require written confirmation.",
  },
  {
    country: "Singapore",
    stay: "Eye- and review-dependent",
    positioning: "Private self-pay varies",
    context:
      "Request an estimate tied to the examined eye, optical biometry, selected lens and any retinal, corneal or glaucoma work.",
  },
  {
    country: "Germany",
    stay: "Eye- and review-dependent",
    positioning: "Private billing varies",
    context:
      "Eligibility, professional billing, IOL scope and postoperative ophthalmology follow-up require direct provider confirmation.",
  },
  {
    country: "United Kingdom",
    stay: "Eye- and review-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas patients should verify acceptance, quote boundaries, early review, urgent access and handover to a local ophthalmologist.",
  },
  {
    country: "United States",
    stay: "Eye- and review-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, surgeon, diagnostic, IOL and follow-up charges may be separate; [US_COST] is a per-eye comparison range, not a bundled quotation.",
  },
];

const INCLUSIONS: LabelledDetail[] = [
  {
    label: "Named-eye clinical assessment",
    detail:
      "The quotation should identify right eye, left eye or both and include the stated surgeon consultation and day-care assessment.",
  },
  {
    label: "Routine measurements",
    detail:
      "List optical biometry, keratometry and any stated refraction, slit-lamp, dilation, IOP or retina checks rather than assuming every test.",
  },
  {
    label: "Consented cataract procedure",
    detail:
      "Name phacoemulsification, manual small-incision surgery or femtosecond-assisted steps and the operating ophthalmologist.",
  },
  {
    label: "Exact intraocular lens",
    detail:
      "Manufacturer, model, power, optical category and toric axis where relevant should match the lens calculation and consent.",
  },
  {
    label: "Day-care episode",
    detail:
      "State theatre, local anaesthesia or sedation assumptions, medicines, consumables, recovery observation and discharge review.",
  },
  {
    label: "Early follow-up",
    detail:
      "Name included reviews, pressure or wound checks, routine drops and the emergency contact period.",
  },
];

const EXCLUSIONS: LabelledDetail[] = [
  {
    label: "Second eye",
    detail:
      "A per-eye quotation does not include the other eye unless both eyes and separate dates are explicitly listed.",
  },
  {
    label: "Additional diagnostics",
    detail:
      "Corneal topography or tomography, macular or optic-nerve OCT, ultrasound and specialist retina review may be separate.",
  },
  {
    label: "Complex or combined surgery",
    detail:
      "Poor posterior-capsule or zonular support, vitrectomy, glaucoma work, corneal treatment or another procedure requires separate scope.",
  },
  {
    label: "Complications and later treatment",
    detail:
      "Extra visits, injections, pressure treatment, retinal care, IOL repositioning or exchange and later laser capsulotomy are not presumed included.",
  },
  {
    label: "Travel and living",
    detail:
      "Flights, visa, insurance, transfers, companion, lodging, meals, extra nights and care after returning home are separate.",
  },
];

function completeProfile(input: OphthalmologyProfileInput): OphthalmologyProfile {
  return {
    ...input,
    duration:
      "commonly a short day-care operation, with theatre and recovery time varying by eye, technique and complexity",
    admission:
      "Most planned adult cataract pathways use day care; medical needs, combined surgery or a complication can require longer observation or admission.",
    recovery:
      "Vision and comfort change at different rates. Drops, protection and examination findings guide work, driving and flying.",
    risks:
      "Risks include infection, inflammation, bleeding, pressure or corneal problems, wound leak, retinal detachment, macular swelling, residual refractive error, dysphotopsia, posterior-capsule rupture, vitreous loss, IOL displacement, further treatment and loss of vision.",
    urgent:
      "marked or worsening pain, sudden vision reduction, increasing redness, discharge, new flashes or many floaters, a curtain or shadow, injury, severe nausea or a clinician-specified pressure warning",
    records: [
      "Ophthalmology consultation notes and cataract diagnosis for each eye",
      "Current and previous spectacle or contact-lens prescription",
      "Slit-lamp, dilated retina and intraocular-pressure findings",
      "Optical biometry and keratometry printouts when already available",
      "Corneal topography or tomography and macular or optic-nerve OCT when performed",
      "Prior eye operation, laser, injection and implant records",
      "Diabetes, hypertension and other relevant medical records",
      "Current medicines, eye drops, allergies and anticoagulant information",
    ],
    quoteQuestions: [
      "Is the quotation explicitly per eye?",
      "Are right and left eyes separately itemized?",
      "Which exact IOL manufacturer, model and optical category are assumed?",
      "What could require a different lens calculation or surgical plan?",
    ],
    ...input,
  };
}

function makeCities(profile: OphthalmologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic Ophthalmology, eye-care or hospital label cannot verify current case acceptance. This is a catalog gap, not an availability or quality claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader eye-care ecosystem, but this page does not infer that every centre accepts this cataract or offers every IOL or technique. Confirm the named ophthalmologist, exact eye, operating campus, measurements, lens and emergency pathway. ${gate}`,
      logistics: `${place.airport}: ${place.campus} ${place.lodging} ${place.local}`,
      costNote:
        `No verified ${place.city}-only cataract tariff is stored. Use [INDIA_COST] as the national per-eye planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `Cataract Surgery Cost in ${place.city}, India: Per-Eye Planning`,
        seoDescription:
          `Cataract Surgery cost in ${place.city} uses the [INDIA_COST] national per-eye range. Compare assessment, technique, IOL, day care and review.`,
        heading: `Cataract Surgery Cost in ${place.city}, India`,
        subtitle:
          `Plan one eye at a time with named measurements, IOL and follow-up. [INDIA_COST] is not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.assessment}`,
          `${place.campus} Dilation can blur vision, so arrange a companion and do not plan to drive unless the clinical team says it is safe.`,
          `${place.lodging} ${place.local}`,
          gate,
          "Send records before non-refundable travel. Remote review can change after slit-lamp examination, refraction, dilation, pressure measurement, retina assessment and repeat biometry.",
        ],
        answer: [
          `Cataract Surgery in ${place.city} is planned against [INDIA_COST] per eye, with [STAY] used only for broad trip planning. Neither is a local tariff, treatment recommendation or acceptance promise.`,
          "Confirm whether one or two eyes are proposed, separate operating dates, exact IOL, technique, day-care scope, included checks and where urgent review occurs.",
        ],
        costExplanation: [
          "Cataract density, pupil size, cornea, axial length, astigmatism, ocular comorbidity, posterior-capsule support, technique and lens model can alter resources.",
          "Ask for named surgeon, named eye, IOL model, tests, anaesthesia, theatre, routine drops, scheduled reviews, exclusions and complication terms in writing.",
          `Budget separately for travel through ${place.airport}, nearby lodging, companion support, local transport, take-home medicines and extra nights if the second eye or a review is delayed.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send eye notes, biometry, keratometry, retina imaging and relevant medical records before travel to ${place.city}.`,
          "Obtain written acceptance from a named ophthalmologist and verify the exact campus, IOL availability, day-care facility and urgent ophthalmic contact.",
          `${profile.recovery} ${place.local} Carry the procedure note and IOL sticker for local follow-up.`,
        ],
        hospitalDiscussion: [
          gate,
          "General accreditation does not establish current lens stock, surgeon acceptance or case-specific support. Verify all three for the named eye and date.",
        ],
        faqs: [
          {
            q: `How much does Cataract Surgery cost in ${place.city}?`,
            a: `[INDIA_COST] is the stored national per-eye planning range. No verified ${place.city}-only tariff is stored; request an itemized quotation.`,
          },
          {
            q: `Which ${place.city} clinician should assess cataract?`,
            a: "A named ophthalmologist or cataract surgeon should assess each eye. Dynamic cards require an exact CMS relationship and are not recommendations.",
          },
          {
            q: `Where should a patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.campus}`,
          },
          {
            q: "Can both eyes be treated during one trip?",
            a: "Possibly, but they are usually planned as separate eyes and often separate sittings. Timing follows the surgeon's assessment and first-eye review.",
          },
          {
            q: "What should the local estimate name?",
            a: "It should name eye, surgeon, campus, technique, exact IOL, investigations, day-care scope, drops, reviews, exclusions and complication terms.",
          },
        ],
      },
    };
  });
}

function createOphthalmologyArticle(
  profile: OphthalmologyProfile,
): CostArticle {
  const slug = toSlug(profile.procedure);
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: "Cataract Surgery Cost in India: Per-Eye Lens & Care Guide",
    seoDescription:
      "Cataract Surgery cost in India is [INDIA_COST] per eye. Compare eye tests, phaco or manual technique, exact IOL, day care, risks and recovery.",
    heading: "Cataract Surgery Cost in India",
    heroSubtitle:
      "A per-eye planning guide to assessment, lens choices, day-care surgery, recovery and international travel—not a promise of visual outcome.",
    introduction: [
      `${profile.definition} ${profile.candidacy}`,
      "Cataracts can affect the eyes differently. One eye may need treatment while the fellow eye is observed. Each needs its own examination, calculation, consent and quotation. Two-eye plans should show separate dates and what first-eye findings could change the second plan.",
      `${profile.assessment} The examination also asks whether corneal disease, glaucoma, macular disease, diabetic retinopathy, previous refractive surgery, a very long or short eye, inflammation or weak lens support may limit the expected benefit or alter technique.`,
      "This guide compares quotations; it cannot diagnose cataract, select an IOL or decide timing. An ophthalmologist must connect symptoms and findings, discuss alternatives and explain individual uncertainty.",
    ],
    answer: [
      "Cataract Surgery in India is typically planned at [INDIA_COST] per eye. Confirm whether a quote covers the right eye, left eye or both on separate dates; the ophthalmologist, day-care theatre, optical biometry, keratometry, exact IOL, drops and reviews should be itemized. [US_COST] is also per eye, and [STAY] is only a trip-planning guide.",
      "Cataract density, corneal astigmatism, eye length, pupil, retina or optic-nerve disease, previous eye surgery, lens-support weakness, technique and IOL design can change the plan and bill. Lens categories involve tradeoffs, not guaranteed spectacle independence or a particular visual result.",
      "Planning Range ≠ Final Hospital Quotation. A slit-lamp and dilated assessment, pressure check, measurements and surgeon review are required before candidacy, lens choice, risks and a final offer are meaningful.",
    ],
    indiaCost: [
      "[INDIA_COST] is the stored India planning range per eye. It is not a two-eye total or a guaranteed package. [US_COST] is likewise a per-eye reference. Currency movement, a changed lens, additional imaging, complex surgery or extra review can alter the final amount.",
      "An estimate should name eye, surgeon, campus, technique, IOL manufacturer, model, power and category. Separate professional, diagnostic, facility, lens, pharmacy and follow-up lines, including a changed-placement plan.",
      "For both eyes, request separate estimates and dates. The fellow eye can have different astigmatism, cataract, power, comorbidity or support; first-eye findings inform but do not determine its plan.",
      "Budget separately for flights, visa, insurance, transfers, companion, lodging, meals, protection, drops, extra nights and local follow-up unless expressly included.",
    ],
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      "Two cataract quotations may describe different eyes, tests, techniques, lens models, anaesthesia assumptions, follow-up or complication coverage. Compare those clinical and resource lines before comparing totals.",
    inclusions: INCLUSIONS,
    exclusions: EXCLUSIONS,
    approachComparison: {
      heading: "Cataract surgery methods and where they differ",
      intro: [
        "The approach is selected for the examined eye; it is not a quality ladder. Surgeon judgment, cataract density, corneal health, pupil, zonules, posterior capsule, available equipment and patient needs all matter.",
        "Femtosecond assistance performs selected steps but does not remove the need for a surgeon, phaco or another lens-removal method, IOL insertion and careful postoperative review.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Individual eye assessment determines suitability",
        detail: item.detail,
      })),
    },
    overviewHeading: "What Is Cataract Surgery?",
    whoHeading: "When Might Cataract Surgery Be Considered?",
    overview: {
      what: [
        profile.definition,
        "The natural lens sits behind the iris and focuses light. Surgery removes its cloudy material and usually places an IOL in the retained capsular bag.",
        "IOL power is calculated from measurements, but healing, corneal shape, prior surgery and retinal or optic-nerve function still affect the result.",
      ],
      who: [
        profile.candidacy,
        "Severity is not appearance alone. The ophthalmologist relates glare, reading, work, mobility and driving difficulty to findings and excludes other causes. Urgent eye disease needs another pathway.",
      ],
      how: [
        profile.technique,
        "After eye marking, dilation and anaesthesia, a small incision provides access. The surgeon opens the capsule, removes lens material, inserts the IOL when support permits, checks the wound and applies protection.",
        "A posterior-capsule tear or weak zonules may require vitreous management, another IOL position, sutures or staged surgery; consent should address this.",
      ],
      variations: profile.approaches,
      preparation: [
        profile.assessment,
        "Optical biometry estimates eye length and IOL power; keratometry measures corneal curvature. Contact lenses, ocular-surface instability or previous refractive surgery may require repeat measurements.",
        "Reconcile medicines and allergies. Clinicians direct anticoagulants, diabetes medicines, glaucoma drops, fasting, hygiene and infection precautions.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        "Use prescribed drops cleanly. Wear the shield, avoid rubbing and protect the eye from dirty water, dust and impact.",
        "Driving, lifting, exercise, swimming, work hazards and flying need individualized instructions. Reviews check healing, IOL, pressure and vision.",
        `Seek urgent ophthalmic help for ${profile.urgent}; sudden symptoms require examination, not only remote messaging.`,
      ],
    },
    topicSections: [
      {
        id: "eye-assessment",
        heading: "The preoperative eye assessment",
        paragraphs: [
          "Slit-lamp examination confirms the cataract and reviews cornea, iris, pupil and support. Refraction records correction; dilation permits retinal assessment. IOP, optic nerve and macula matter because cataract is not the only cause of reduced vision.",
          "A blocked retinal view may prompt ultrasound. OCT, corneal topography or tomography and dry-eye treatment follow specific findings or lens goals.",
        ],
      },
      {
        id: "lens-options",
        heading: "Monofocal, toric, multifocal, trifocal and EDOF lenses",
        paragraphs: [
          "A monofocal IOL targets one main focal zone; glasses may remain useful. A toric IOL addresses selected regular corneal astigmatism and requires reliable measurements and alignment.",
          "Multifocal and trifocal designs distribute light across focal zones but can introduce halos, glare or contrast tradeoffs. EDOF lenses extend a focus range with near-vision and optical tradeoffs. Corneal, macular and optic-nerve health affect suitability.",
          "No category promises spectacle independence or a specific result. Discuss night driving, near work, screens, occupation, ocular disease, cost and alternatives.",
        ],
      },
      {
        id: "complex-cataract",
        heading: "Cataract severity, support and combined surgery",
        paragraphs: [
          "A dense cataract, small pupil, shallow chamber, weak corneal endothelium, trauma, pseudoexfoliation, unstable zonules or unusual eye length can change instruments, time and risk. Posterior-capsule and zonular support govern IOL placement.",
          "Combined vitrectomy, glaucoma surgery, corneal treatment or pupil devices make a different episode requiring specific consent, coordination, consumables, follow-up and quotation.",
        ],
      },
      {
        id: "risks",
        heading: "Procedure-specific risks and later changes",
        paragraphs: [
          profile.risks,
          "The capsule behind the IOL can cloud later. A separate YAG laser capsulotomy may be appropriate; it is not recurrent cataract or presumed part of the surgical quote.",
        ],
      },
      {
        id: "two-eye-planning",
        heading: "Planning one eye and the fellow eye",
        paragraphs: [
          "The more symptomatic or appropriate eye may be treated first. Eyes are commonly scheduled on separate dates for first-eye review, although practice varies. Ask what interval and findings could alter the fellow-eye plan.",
          "Keep the first-eye operative note, IOL label, biometry and follow-up. They inform later care without implying identical healing.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        "International planning starts with records and a named-eye clinical question, not a package reservation.",
        "An appointment or remote opinion is provisional until in-person examination and measurements confirm the plan.",
      ],
      stages: [
        { label: "Send records", detail: "Provide eye notes, imaging, prior surgery and medical history." },
        { label: "Remote triage", detail: "A named team considers in-person assessment." },
        { label: "Eye examination", detail: "Complete refraction, slit-lamp, dilation, IOP and retina checks." },
        { label: "Measurements", detail: "Perform biometry, keratometry and indicated imaging." },
        { label: "Discuss choices", detail: "Compare observation, technique, target and suitable lenses." },
        { label: "Itemize quotation", detail: "Name eye, surgeon, IOL, day care, reviews and exclusions." },
        { label: "Confirm on arrival", detail: "Validate examination and measurements before consent." },
        { label: "Complete procedure", detail: "Perform consented lens removal and IOL placement." },
        { label: "Review early", detail: "Check wound, inflammation, pressure, IOL and vision." },
        { label: "Plan fellow eye", detail: "Reassess need, timing and lens separately." },
        { label: "Clear travel", detail: "Review findings, drops and urgent-care access." },
        { label: "Handover home", detail: "Carry operative note, IOL label and follow-up plan." },
      ],
    },
    journey: [
      { label: "Define the eye", detail: "Document symptoms and laterality." },
      { label: "Collect records", detail: "Gather examination, imaging and prior procedure details." },
      { label: "Identify clinician", detail: "Confirm ophthalmologist and campus." },
      { label: "Assess each eye", detail: "Review cataract, cornea, pressure, support and retina." },
      { label: "Measure", detail: "Complete biometry and keratometry." },
      { label: "Discuss choices", detail: "Review alternatives, technique, target and lens." },
      { label: "Compare quotes", detail: "Hold eye, lens, tests and follow-up constant." },
      { label: "Plan travel", detail: "Arrange flexible travel, lodging and companion." },
      { label: "Confirm consent", detail: "Recheck eye, risks and possible changes." },
      { label: "Complete day care", detail: "Undergo treatment and monitored recovery." },
      { label: "Protect and review", detail: "Use drops and shield; attend examination." },
      { label: "Handover home", detail: "Share operative record, IOL label and schedule." },
    ],
    documents: profile.records,
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values use stored GAF per-eye ranges. The other countries require direct quotations because lens, diagnostics, professional billing and review scope are not reliably comparable as a single package.",
      "Compare the same eye, cataract complexity, surgeon role, technique, exact IOL, tests, day-care setting, medicines, visits and complication terms. A lower headline with a different lens or follow-up is not like-for-like.",
    ],
    destinationNote:
      "International comparisons are indicative. Currency, measurements, lens availability, changed findings, additional treatment and length of stay can change the final amount.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad use [INDIA_COST] because no verified city tariff is stored. Their overlays add campus geography, airport transfer, lodging, climate and early-review logistics without inventing local prices or capabilities.",
      "Doctor and hospital cards resolve only from CMS entities carrying an exact current Cataract Surgery relationship. Missing mappings leave cards empty rather than borrowing generic Ophthalmology or hospital entities.",
    ],
    whyIndia: [
      "Some patients consider India for named ophthalmologists, eye diagnostics, day-care infrastructure and a national self-pay range. Price alone is not a clinical reason to travel, and listing does not establish acceptance.",
      "Evaluate surgeon, licensure, campus, IOL traceability, measurements, day-care processes, relevant specialist support, urgent access and home handover.",
      "No provider is ranked and no visual outcome is promised. Unstable eye or medical disease, insufficient records or suitable local care can make travel inappropriate.",
    ],
    questionsToAsk: [
      "Which eye is being quoted, and is every amount explicitly per eye?",
      "Does the fellow eye need treatment or observation?",
      "Who is the operating ophthalmologist, and at which exact campus?",
      "Could another corneal, retinal, optic-nerve or glaucoma condition limit benefit?",
      "Are refraction, slit-lamp, dilation, IOP and retina checks complete?",
      "Are optical biometry and keratometry included?",
      "Is corneal imaging or macular OCT indicated?",
      "Is phaco, manual small-incision or femtosecond assistance planned?",
      "Why does that technique fit this cataract and eye?",
      "What refractive target and uncertainty are discussed?",
      "Which exact IOL manufacturer, model, power and category are quoted?",
      "What lens-design tradeoffs apply to this eye?",
      "Could glasses still be needed?",
      "How is toric eligibility and alignment checked?",
      "Do cataract density, pupil, zonules or capsule add complexity?",
      "What if support is inadequate for the intended lens?",
      "Could vitrectomy, pupil, glaucoma or retinal work be needed?",
      "Which professional, facility and day-care lines are included?",
      "Which drops, shield and reviews are included?",
      "How are changed scope and complications billed?",
      "Which symptoms require urgent review, and where?",
      "When is the first postoperative examination?",
      "What guides timing of a second eye?",
      "When may I work, exercise, drive and fly?",
      "Which operative and IOL records will I receive?",
      "Who coordinates follow-up after I return home?",
    ],
    faqs: [
      {
        q: "How much does Cataract Surgery cost in India?",
        a: "[INDIA_COST] is a per-eye planning range, not a two-eye total. Tests, technique, IOL and follow-up define the quotation.",
      },
      {
        q: "Is cataract pricing per eye?",
        a: "[INDIA_COST] and [US_COST] are per eye. A two-eye plan should itemize each eye and date.",
      },
      {
        q: "Can both eyes be operated on the same day?",
        a: "Practice varies, but eyes are commonly scheduled separately. The surgeon should explain timing and how first-eye findings affect the fellow eye.",
      },
      {
        q: "Which tests are needed before surgery?",
        a: "Assessment includes refraction, slit-lamp, dilation, IOP and retina checks, biometry and keratometry; other imaging follows findings.",
      },
      {
        q: "What is phacoemulsification?",
        a: "Phaco uses ultrasound through a small incision to fragment and remove lens material before suitable IOL placement.",
      },
      {
        q: "How is manual small-incision surgery different?",
        a: "It removes the lens through a self-sealing tunnel without phaco ultrasound and may suit selected dense cataracts.",
      },
      {
        q: "Does femtosecond laser replace the surgeon?",
        a: "No. It assists selected steps; a surgeon still removes lens material, places the IOL and manages care.",
      },
      {
        q: "How is an IOL selected?",
        a: "No lens suits every eye. Designs differ in optical aims, eligibility, tradeoffs and cost.",
      },
      {
        q: "Will glasses be unnecessary afterward?",
        a: "That cannot be promised. Target, healing, residual prescription and ocular health can leave a need for glasses.",
      },
      {
        q: "What are the important risks?",
        a: profile.risks,
      },
      {
        q: "What care is needed after surgery?",
        a: "Use drops and shield, avoid rubbing and contamination, follow activity limits, attend reviews and act on warnings.",
      },
      {
        q: "When can an international patient fly home?",
        a: "There is no universal date. The ophthalmologist should confirm stable findings, drops, follow-up and urgent-care access.",
      },
    ],
    doctorHeading: "Cataract surgeons and ophthalmologists in India",
    cityDoctorHeading: "Cataract surgeons and ophthalmologists in [CITY]",
    doctorIntro:
      "Profiles require an exact CMS Cataract Surgery relationship. Verify the ophthalmologist, assessment, technique and campus; placement is not a recommendation.",
    hospitalHeading: "Hospitals and day-care eye units for Cataract Surgery in India",
    cityHospitalHeading: "Cataract Surgery hospitals and eye units in [CITY]",
    hospitalIntro:
      "Cards follow exact live CMS relationships for Cataract Surgery. A general Ophthalmology, accreditation or eye-care label does not establish current surgeon acceptance, IOL availability, case-specific support or results.",
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: "/images/cost/ophthalmology/cataract-surgery-anatomy.webp",
        alt: profile.imageAlts[0],
        fit: "contain",
      },
      {
        after: "how",
        src: "/images/cost/ophthalmology/cataract-surgery-procedure.webp",
        alt: profile.imageAlts[1],
        fit: "contain",
      },
      {
        after: "journey",
        src: "/images/cost/ophthalmology/cataract-surgery-recovery.webp",
        alt: profile.imageAlts[2],
        fit: "contain",
      },
    ],
  };
}

const cataractProfile = completeProfile({
  procedure: "Cataract Surgery",
  shortName: "cataract surgery",
  specialist: "ophthalmologist experienced in cataract and intraocular-lens surgery",
  definition:
    "Cataract surgery removes the eye's cloudy natural lens and usually replaces it with a calculated intraocular lens, or IOL.",
  candidacy:
    "It may be considered when lens clouding meaningfully affects daily tasks or prevents necessary examination or treatment inside the eye, after symptoms, alternatives, ocular health and general fitness are reviewed.",
  assessment:
    "A procedure-specific work-up includes refraction, slit-lamp examination, pupil dilation, intraocular-pressure measurement and retina and optic-nerve checks, followed by optical biometry and keratometry for IOL planning.",
  technique:
    "The surgeon opens the front capsule, removes cloudy lens material by phacoemulsification or another selected method, preserves the capsular bag when safe and inserts the planned IOL if support is adequate.",
  approaches: [
    {
      label: "Phacoemulsification",
      detail:
        "Ultrasound removes lens material through a small incision, adjusted for cataract and corneal characteristics.",
    },
    {
      label: "Manual small-incision cataract surgery",
      detail:
        "The lens is removed through a self-sealing tunnel without phaco ultrasound, including for selected dense cataracts.",
    },
    {
      label: "Femtosecond-assisted cataract surgery",
      detail:
        "A laser assists selected steps before surgeon-controlled lens removal and IOL placement, without promising a better result.",
    },
  ],
  lensOptions: [
    {
      label: "Monofocal IOL",
      detail:
        "Targets one principal focal zone; glasses often remain useful for other distances or residual prescription.",
    },
    {
      label: "Toric IOL",
      detail:
        "Addresses selected regular corneal astigmatism and depends on reliable keratometry and rotational alignment.",
    },
    {
      label: "Multifocal or trifocal IOL",
      detail:
        "Distributes light across focal zones, with possible glare, halos and contrast tradeoffs and eye-specific eligibility.",
    },
    {
      label: "EDOF IOL",
      detail:
        "Extends a range of focus but has near-vision and optical tradeoffs and does not ensure spectacle independence.",
    },
  ],
  drivers: [
    {
      label: "One eye or two-eye plan",
      detail:
        "Each eye needs separate assessment, calculation, date and quotation.",
    },
    {
      label: "Cataract density and pupil",
      detail:
        "Density or a small pupil can change instruments and time.",
    },
    {
      label: "Cornea and ocular surface",
      detail:
        "Astigmatism, corneal weakness or dry eye can alter testing and planning.",
    },
    {
      label: "Retina, macula and optic nerve",
      detail:
        "Retinal or glaucoma findings can add imaging and specialist review.",
    },
    {
      label: "Biometry and prior surgery",
      detail:
        "Unusual eye length or prior refractive surgery can change calculations.",
    },
    {
      label: "IOL design and model",
      detail:
        "Lens designs require different devices and counselling.",
    },
    {
      label: "Technique and equipment",
      detail:
        "Surgical methods use different equipment and consumables.",
    },
    {
      label: "Capsular and zonular support",
      detail:
        "Weak support may require devices, another IOL position or staged care.",
    },
    {
      label: "Combined surgery",
      detail:
        "Combined eye procedures require added consent and resources.",
    },
    {
      label: "Reviews and complication terms",
      detail:
        "Included reviews, medicines and later treatment differ.",
    },
  ],
  related: [
    "Phacoemulsification Cataract Surgery",
    "Femto Laser Cataract Surgery",
    "Pediatric Cataract Surgery",
    "Vitrectomy",
  ],
  imageAlts: [
    "Realistic cataract education infographic showing a cloudy natural lens, clear intraocular lens implant and four clinical scenes for examination, measurement, cataract anatomy and IOL selection",
    "Realistic seven-stage cataract surgery journey showing ophthalmology consultation, slit-lamp assessment, optical measurements, lens choice, day-care procedure, eye protection and clinical review",
    "Realistic five-stage cataract recovery pathway showing prescribed eye drops, protective shield, cautious return to activity, slit-lamp follow-up and urgent telephone review for warning symptoms",
  ],
});

type ScaledOphthalmologyProfile = {
  procedure: OphthalmologyProcedure;
  shortName: string;
  unit: "per eye" | "per injection" | "per course";
  specialist: string;
  anatomy: string;
  indication: string;
  assessment: string;
  technique: string;
  distinction: string;
  approaches: [LabelledDetail, LabelledDetail, LabelledDetail];
  recovery: string;
  risks: string;
  urgent: string;
  driverTerms: [string, string, string, string];
  related: OphthalmologyProcedure[];
};

function scaledDrivers(profile: ScaledOphthalmologyProfile): LabelledDetail[] {
  return [
    ...profile.driverTerms.map((label) => ({
      label,
      detail: `${label} changes the procedure-specific planning, resources or follow-up for ${profile.shortName}.`,
    })),
    {
      label: "Diagnostic scope",
      detail: "Examination, imaging and functional tests must match the indication.",
    },
    {
      label: "Named clinician and facility",
      detail: "Professional, day-care, theatre and monitoring scope can differ.",
    },
    {
      label: "Anaesthesia and medical needs",
      detail: "Cooperation, age and comorbidity can change support and observation.",
    },
    {
      label: "Devices, tissue and medicines",
      detail: "Implants, donor tissue, laser, tamponade or drugs must be itemized.",
    },
    {
      label: "Changed findings",
      detail: "New examination or operative findings can alter or stage treatment.",
    },
    {
      label: "Follow-up and complications",
      detail: "Included reviews and unplanned treatment vary between quotations.",
    },
  ];
}

function makeScaledCities(
  profile: ScaledOphthalmologyProfile,
): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate =
      `Doctor and hospital cards in ${place.city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
      "If that exact relationship is absent, cards must remain empty; a generic Ophthalmology, eye-care or hospital label cannot verify current case acceptance. This is a catalog gap, not an availability or quality claim.";
    return {
      citySlug,
      ecosystem:
        `${place.city} has a broader eye-care ecosystem, but this page does not infer that every centre performs ${profile.shortName}. ${profile.distinction} Confirm the named ${profile.specialist}, exact campus, diagnostic pathway, treatment scope and urgent-care route. ${gate}`,
      logistics:
        `${place.airport}: ${place.campus} ${place.lodging} ${place.local} ` +
        `For ${profile.shortName}, schedule the first procedure-specific review before onward travel and keep written access to the treating unit.`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national ${profile.unit} planning range until a named provider issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Clinical Planning`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national ${profile.unit} range. Compare assessment, scope, recovery and travel.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.distinction} [INDIA_COST] is not a ${place.city} tariff or final quotation.`,
        intro: [
          `${profile.indication} ${profile.assessment}`,
          `${place.campus} Dilation, treatment or early recovery can affect navigation, so arrange a companion when the treating team advises one.`,
          `${place.lodging} ${place.local}`,
          gate,
          `Send complete records before non-refundable travel. Remote review for ${profile.shortName} can change after examination, imaging or functional testing.`,
        ],
        answer: [
          `${profile.procedure} in ${place.city} uses [INDIA_COST] ${profile.unit} for planning, with [STAY] only a broad trip guide. Neither is a city tariff, recommendation or acceptance promise.`,
          `Confirm the named clinician, campus, diagnosis, laterality, technique, device or medicine, anaesthesia, reviews, exclusions and urgent pathway.`,
        ],
        costExplanation: [
          `The estimate changes with ${profile.driverTerms.join(", ").toLowerCase()} and the stated follow-up.`,
          `Ask for the ${profile.unit} basis, named clinician, tests, facility, consumables, medicines, reviews, exclusions and complication terms in writing.`,
          `Budget separately for travel through ${place.airport}, lodging, companion support, transport, medicines and extra nights.`,
        ],
        factors: scaledDrivers(profile).slice(0, 4),
        medicalTourism: [
          `Send consultation notes, imaging, test outputs, prior procedures and current medicines before travel to ${place.city}.`,
          `Obtain written acceptance from a named ${profile.specialist} and verify procedure-specific equipment, tissue, implant or medicine availability at the exact campus.`,
          `${profile.recovery} ${place.local} Carry the treatment note and follow-up plan home.`,
        ],
        hospitalDiscussion: [
          gate,
          "General accreditation does not establish current clinician acceptance, device or tissue availability, emergency support or case-specific suitability.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `[INDIA_COST] is the stored national ${profile.unit} planning range. No verified ${place.city}-only tariff is stored; request an itemized quotation.`,
          },
          {
            q: `Who should assess ${profile.shortName} in ${place.city}?`,
            a: `A named ${profile.specialist} should assess it. Dynamic cards require exact CMS relationships and are not recommendations.`,
          },
          {
            q: `Where should a patient stay in ${place.city}?`,
            a: `${place.lodging} ${place.campus}`,
          },
          {
            q: "When can an international patient travel onward?",
            a: `There is no universal date. ${profile.recovery} The treating clinician must review fitness.`,
          },
          {
            q: "What should the local estimate name?",
            a: `It should name diagnosis, eye or side, clinician, campus, technique, devices or medicines, reviews, exclusions and changed-scope terms.`,
          },
        ],
      },
    };
  });
}

function createScaledArticle(
  profile: ScaledOphthalmologyProfile,
): CostArticle {
  const slug = toSlug(profile.procedure);
  const drivers = scaledDrivers(profile);
  const inclusions: LabelledDetail[] = [
    {
      label: "Procedure-specific assessment",
      detail: `Named ${profile.specialist} review, examination and stated diagnostic tests.`,
    },
    {
      label: "Consented treatment",
      detail: `${profile.procedure}, laterality and technique exactly as written.`,
    },
    {
      label: "Facility and anaesthesia",
      detail: "Stated day-care or theatre use, anaesthesia, monitoring and recovery.",
    },
    {
      label: "Named device, tissue or medicine",
      detail: "Model, donor tissue, laser, tamponade or drug when relevant.",
    },
    {
      label: "Routine consumables and medicines",
      detail: "Only supplies and peri-procedure medicines listed in the offer.",
    },
    {
      label: "Early review and handover",
      detail: "Scheduled checks, treatment note, warning signs and home plan.",
    },
  ];
  const exclusions: LabelledDetail[] = [
    {
      label: "Additional diagnostics",
      detail: "Unlisted imaging, laboratory, functional testing or specialist review.",
    },
    {
      label: "Changed or combined treatment",
      detail: "A different technique, added procedure or staged care unless itemized.",
    },
    {
      label: "Extra devices or medicines",
      detail: "Unlisted implant, donor tissue, tamponade, injection or take-home drug.",
    },
    {
      label: "Complication care",
      detail: "Extra visits, admission, re-operation or prolonged treatment unless covered.",
    },
    {
      label: "Travel and living",
      detail: "Flights, visa, insurance, transfers, lodging, meals and companion costs.",
    },
  ];
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.procedure,
    slug,
    lastUpdated: "2026-09-13",
    duration:
      "procedure time and observation vary with indication, technique, anaesthesia and findings",
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.procedure} Cost in India: Scope, Risks & Recovery`,
    seoDescription:
      `${profile.procedure} cost in India is [INDIA_COST] ${profile.unit}. Compare assessment, technique, inclusions, risks, recovery and travel.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.distinction} A cautious ${profile.unit} guide to clinical scope, quotation and follow-up.`,
    introduction: [
      `${profile.anatomy} ${profile.indication}`,
      `${profile.assessment} A remote opinion cannot replace the receiving clinician's examination, measurements and review of original images or test outputs.`,
      `${profile.distinction} The label on a package is not enough: diagnosis, eye or side, exact intervention, devices or medicines, anaesthesia, monitoring and follow-up must align.`,
      "This guide helps compare quotations and plan travel. It cannot diagnose disease, select treatment or predict vision. Observation, medicines, optical correction, laser, injection or another operation may be more appropriate after individual review.",
    ],
    answer: [
      `${profile.procedure} in India is planned at [INDIA_COST] ${profile.unit}. A useful estimate names the diagnosis, treated eye or side, ${profile.specialist}, examination and imaging, exact technique, device, tissue or medicine, facility and anaesthesia scope, routine consumables, discharge medicines and scheduled reviews. [US_COST] uses the stored comparison unit, while [STAY] is only a broad trip-planning guide.`,
      `${profile.distinction} Cost changes with ${profile.driverTerms.join(", ").toLowerCase()}, changed findings and the emergency or follow-up terms. A short headline offer may omit clinically necessary lines.`,
      "Planning Range ≠ Final Hospital Quotation. Records review and an in-person ophthalmic assessment are required before candidacy, treatment scope, risks and an itemized offer are meaningful.",
    ],
    indiaCost: [
      `[INDIA_COST] is the stored national planning range ${profile.unit}; [US_COST] is a comparison reference using the catalog's stated unit. Neither is a tariff, acceptance decision or final bill.`,
      `The quotation should identify ${profile.procedure}, diagnosis, eye or laterality, clinician, campus, approach, anaesthesia, named devices, donor tissue or medicines, observation, reviews and exclusions.`,
      `Cost drivers include ${profile.driverTerms.join(", ").toLowerCase()}, diagnostic scope, facility, medical needs, altered findings and follow-up. Ask what triggers another procedure, device, injection, admission or visit.`,
      "Keep flights, visa, insurance, airport and local transfers, companion support, suitable lodging, meals, take-home medicines, extra nights and ophthalmology follow-up outside the clinical total unless expressly included.",
    ],
    costDrivers: drivers,
    whyQuotesDiffer:
      `Two ${profile.shortName} quotations may use different diagnoses, units, tests, techniques, clinicians, devices, medicines, facilities and follow-up. Compare those lines before totals.`,
    inclusions,
    exclusions,
    approachComparison: {
      heading: `Approaches and alternatives for ${profile.procedure}`,
      intro: [
        "Approaches are clinical choices, not a quality ladder. Anatomy, disease mechanism, severity, previous treatment, ocular health, general health and clinician judgment guide selection.",
        `${profile.distinction} Ask why the proposed approach fits and what finding would change, postpone or stop it.`,
      ],
      rows: profile.approaches.map((approach) => ({
        name: approach.label,
        relative: "Suitability follows procedure-specific examination",
        detail: approach.detail,
      })),
    },
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [
        profile.anatomy,
        profile.distinction,
        "Ophthalmic terms can describe different tissue layers, disease mechanisms and treatment goals. The written plan should use the exact term rather than a broader eye-surgery label.",
      ],
      who: [
        profile.indication,
        "Symptoms alone or an image alone may not establish candidacy. The clinician should connect examination and functional impact, consider alternatives and explain uncertainty from coexisting corneal, lens, pressure, retinal, optic-nerve, eyelid, orbital or systemic disease.",
      ],
      how: [
        profile.technique,
        "Before treatment, the team confirms identity, eye or side, consent, allergies, medicines and equipment. Anaesthesia and monitoring follow age, cooperation, procedure and medical risk.",
        "Unexpected anatomy, tissue behaviour, pressure, bleeding, visualization or safety concern may limit, alter or stage treatment. The consent and quotation should explain the relevant contingency.",
      ],
      variations: profile.approaches,
      preparation: [
        profile.assessment,
        "Send original imaging and test printouts, prior operative notes, implant or injection records, current prescriptions, allergies and medical conditions. Repeat testing may be needed when measurements are old, incomplete or inconsistent.",
        "Follow only the treating team's medicine, fasting, contact-lens, hygiene and drop instructions. Arrange a responsible companion when dilation, sedation, anaesthesia or reduced vision makes independent travel unsafe.",
      ],
      recovery: [
        profile.recovery,
        "Use drops, tablets, shield, positioning or wound care exactly as prescribed. Avoid rubbing, contamination and activity that the clinician restricts; do not infer permission to drive or fly from discharge alone.",
        `Risks include ${profile.risks} Risk varies with the individual eye and procedure; consent should cover likely consequences, alternatives and possible additional treatment.`,
        `Seek urgent ophthalmic assessment for ${profile.urgent}. Sudden symptoms require an examination rather than reliance on remote messaging.`,
      ],
    },
    topicSections: [
      {
        id: "anatomy-and-indication",
        heading: `Anatomy and indication for ${profile.procedure}`,
        paragraphs: [
          `${profile.anatomy} ${profile.indication}`,
          "The assessment should identify the structure causing symptoms or risk and document important neighbouring tissue. Coexisting disease can change expected benefit, technique and follow-up.",
        ],
      },
      {
        id: "clinical-distinction",
        heading: "The clinical distinction that changes the quote",
        paragraphs: [
          profile.distinction,
          "Do not compare a broad package with a procedure-specific plan. Hold laterality, diagnosis, approach, device or medicine, anaesthesia, setting, monitoring and reviews constant.",
        ],
      },
      {
        id: "technique",
        heading: `How ${profile.shortName} is performed`,
        paragraphs: [
          profile.technique,
          "A safe sequence includes verification, consent, sterile preparation, procedure-specific monitoring, documented treatment and discharge criteria. Added work needs separate clinical justification.",
        ],
      },
      {
        id: "risks-and-urgent-care",
        heading: "Risks, limitations and urgent review",
        paragraphs: [
          `Procedure-specific risks include ${profile.risks}`,
          `Urgent review is needed for ${profile.urgent}. The patient should know the named contact and where an examination can occur after hours.`,
        ],
      },
      {
        id: "recovery-and-continuity",
        heading: "Recovery, monitoring and continuity",
        paragraphs: [
          profile.recovery,
          "Carry the examination findings, procedure note, device or tissue label, medicine list and review plan home. Local follow-up should be arranged before travel, especially when serial imaging, pressure checks, suture care or repeated treatment may be needed.",
        ],
      },
    ],
    fullPathway: {
      intro: [
        "International care starts with complete records and a named clinical question, not a package reservation.",
        "Acceptance remains provisional until examination confirms diagnosis, suitability and scope.",
      ],
      stages: [
        { label: "Submit records", detail: "Send notes, imaging, tests and prior treatment." },
        { label: "Named review", detail: `A ${profile.specialist} assesses the request.` },
        { label: "Confirm diagnosis", detail: "Complete procedure-specific examination and imaging." },
        { label: "Compare alternatives", detail: "Discuss observation and other suitable treatments." },
        { label: "Define scope", detail: "Name eye, side, technique, device, tissue or medicine." },
        { label: "Itemize estimate", detail: `Use the correct ${profile.unit} basis and exclusions.` },
        { label: "Plan travel", detail: "Arrange flexible travel, companion and nearby lodging." },
        { label: "Reassess arrival", detail: "Update examination, tests and consent." },
        { label: "Complete treatment", detail: "Perform only the consented procedure-specific scope." },
        { label: "Monitor recovery", detail: "Follow written protection, medicine and review instructions." },
        { label: "Review safety", detail: `Check for ${profile.urgent}.` },
        { label: "Handover home", detail: "Transfer records and ongoing review plan." },
      ],
    },
    journey: [
      { label: "Define concern", detail: "Document symptoms, diagnosis and eye or side." },
      { label: "Gather records", detail: "Collect images, tests and prior treatment." },
      { label: "Identify clinician", detail: `Confirm the ${profile.specialist}.` },
      { label: "Review remotely", detail: "Check whether travel assessment is reasonable." },
      { label: "Examine in person", detail: "Confirm anatomy, diagnosis and suitability." },
      { label: "Discuss alternatives", detail: "Compare reasonable non-surgical and procedural options." },
      { label: "Write treatment plan", detail: "Name technique and all material inputs." },
      { label: "Compare estimates", detail: `Hold the ${profile.unit} scope constant.` },
      { label: "Plan trip", detail: "Keep flights and lodging flexible." },
      { label: "Confirm consent", detail: "Review risks and possible plan changes." },
      { label: "Treat and monitor", detail: "Complete consented scope and immediate checks." },
      { label: "Complete handover", detail: "Carry records, warnings and follow-up." },
    ],
    documents: [
      "Ophthalmology consultation and symptom history",
      "Visual acuity, refraction and slit-lamp findings when relevant",
      "Procedure-specific imaging and original test outputs",
      "Intraocular-pressure, optic-nerve and retinal findings when relevant",
      "Previous eye operation, laser, injection and implant records",
      "Current eye drops and systemic medicines with doses",
      "Allergies, anaesthesia history and relevant medical conditions",
      "Passport, visa, companion and local follow-up details",
    ],
    cities: makeScaledCities(profile),
    destinations: DESTINATIONS.map((destination) => ({
      ...destination,
      context:
        destination.country === "India"
          ? `The stored India figure is a national ${profile.unit} planning range for ${profile.shortName}, not a quotation or acceptance decision.`
          : destination.country === "United States"
            ? `[US_COST] is the stored comparison reference for ${profile.shortName}; professional, facility, device, medicine and follow-up billing may differ.`
            : `Request a direct ${profile.unit} quotation for ${profile.shortName}; diagnosis, technique, devices, medicines and follow-up may not be comparable.`,
    })),
    destinationIntro: [
      `India and United States values use stored catalog references for ${profile.shortName}. Other countries require direct quotations because comparable procedure-specific scope is not reliably stored.`,
      `Compare the same diagnosis, laterality, ${profile.unit} basis, technique, clinician, facility, device or medicine, monitoring and follow-up.`,
    ],
    destinationNote:
      "International figures are indicative. Currency, changed findings, staged treatment, complications and length of stay can change the final bill.",
    cityIntro: [
      `Five city overlays retain [INDIA_COST] because no verified city tariff is stored for ${profile.shortName}. They add local campus, airport, lodging, climate and review logistics without inventing prices or capabilities.`,
      `Cards require an exact current CMS relationship for ${profile.procedure}; missing mappings remain empty rather than borrowing generic Ophthalmology entities.`,
    ],
    whyIndia: [
      `Some international patients consider India for access to named ${profile.specialist} care, diagnostic infrastructure and a national self-pay planning range. Price alone is not a clinical reason to travel.`,
      "Evaluate licensure, named campus, procedure-specific experience, equipment, device, tissue or medicine traceability, infection controls, urgent support and home handover.",
      "No provider is ranked and no outcome is promised. Unstable disease, urgent local needs, inadequate records or appropriate dependable care near home may make elective travel unsuitable.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} considered, and what alternatives remain?`,
      "What exact diagnosis, eye or side is documented?",
      `Who is the named ${profile.specialist}, and at which campus?`,
      "Which examination findings establish candidacy?",
      `Is [INDIA_COST] applied ${profile.unit}?`,
      "What exact technique is planned?",
      "Which finding could change or stop treatment?",
      "Which device, tissue, laser, tamponade or medicine is assumed?",
      "Which clinician, facility and anaesthesia fees are included?",
      "Which consumables and routine medicines are included?",
      "What observation or admission is assumed?",
      "Which alternatives were considered and why?",
      "What coexisting eye disease could limit benefit?",
      "How are additional treatment and complications billed?",
      "Which drops, wound care or positioning instructions apply?",
      "Which warning signs require urgent examination?",
      "Which scheduled reviews and tests are included?",
      "When may I work, exercise, drive and fly?",
      "Could treatment be staged, repeated or revised?",
      "Who coordinates follow-up after I return home?",
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `[INDIA_COST] is a national ${profile.unit} planning range, not a quotation. Tests, exact scope, facility and follow-up determine the offer.`,
      },
      {
        q: `What is ${profile.shortName}?`,
        a: `${profile.procedure} treats the procedure-specific anatomy described above; the written plan must name its exact scope.`,
      },
      {
        q: "Who may be considered?",
        a: `A named ${profile.specialist} confirms indication after examination, testing, alternatives and individual eye risks are reviewed.`,
      },
      {
        q: "What assessment is needed?",
        a: "Procedure-specific examination, imaging or functional testing must confirm diagnosis, anatomy, laterality and relevant coexisting eye disease.",
      },
      {
        q: "How is the treatment performed?",
        a: profile.technique,
      },
      {
        q: "What is the most important distinction?",
        a: profile.distinction,
      },
      {
        q: "What alternatives should be discussed?",
        a: `The options include ${profile.approaches.map((item) => item.label).join(", ")} according to examination and goals.`,
      },
      {
        q: "What are the important risks?",
        a: profile.risks,
      },
      {
        q: "What does recovery involve?",
        a: profile.recovery,
      },
      {
        q: "Which symptoms need urgent review?",
        a: `Seek prompt ophthalmic assessment for ${profile.urgent}.`,
      },
      {
        q: "Is the result guaranteed?",
        a: "No. Individual anatomy, disease, healing and coexisting eye conditions create uncertainty; the clinician should explain realistic aims without promising an outcome.",
      },
      {
        q: "When can an international patient fly home?",
        a: "There is no universal date. The treating clinician must review stability, medicines, restrictions, scheduled follow-up and access to urgent care.",
      },
    ],
    doctorHeading: `${profile.procedure} ophthalmologists in India`,
    cityDoctorHeading: `${profile.procedure} ophthalmologists in [CITY]`,
    doctorIntro:
      `Profiles require an exact current CMS relationship for ${profile.procedure}. Verify clinician, scope, campus and availability; placement is not a ranking or outcome claim.`,
    hospitalHeading: `Hospitals and eye units for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals and eye units in [CITY]`,
    hospitalIntro:
      `Cards follow exact live CMS relationships for ${profile.procedure}. A general eye-care label does not establish current acceptance, resources or results.`,
    relatedProcedures: profile.related,
    figures: (["anatomy", "procedure", "recovery"] as const).map(
      (kind, index) => ({
        after: (["overview", "how", "journey"] as const)[index],
        src: `/images/cost/ophthalmology/${slug}-${kind}.webp`,
        alt:
          kind === "anatomy"
            ? `Realistic ${profile.procedure} anatomy and mechanism composition showing ${profile.anatomy} with procedure-specific clinical examination scenes`
            : kind === "procedure"
              ? `Realistic numbered ${profile.procedure} pathway showing assessment, preparation, ${profile.technique} and immediate clinical review`
              : `Realistic ${profile.procedure} recovery composition with patient-care scenes showing monitoring, protection, follow-up and urgent review after ${profile.shortName}`,
        fit: "contain" as const,
      }),
    ),
  };
}

const scaledProfiles: ScaledOphthalmologyProfile[] = [
  {
    procedure: "Phacoemulsification Cataract Surgery",
    shortName: "phacoemulsification cataract surgery",
    unit: "per eye",
    specialist: "cataract surgeon",
    anatomy: "Phacoemulsification removes cloudy lens material from the capsular bag with an ultrasound handpiece before an intraocular lens is placed when support permits.",
    indication: "It may suit an adult cataract affecting useful vision after cornea, pupil, zonules, posterior capsule, retina and optic nerve are assessed.",
    assessment: "Refraction, slit-lamp examination, dilation, IOP and retina checks, optical biometry and keratometry define the named-eye plan.",
    technique: "Through a small incision, the surgeon creates a capsular opening, divides and aspirates the lens with controlled ultrasound, preserves the bag and inserts the calculated IOL.",
    distinction: "Phaco names ultrasound lens removal; it is not synonymous with femtosecond assistance, manual small-incision extraction or a particular premium IOL.",
    approaches: [
      { label: "Conventional phaco", detail: "Surgeon-created incisions and capsulotomy with ultrasound lens removal." },
      { label: "Femto-assisted phaco", detail: "Laser-assisted early steps followed by surgeon-controlled phaco and IOL placement." },
      { label: "Manual small-incision surgery", detail: "Lens extraction without phaco ultrasound for selected eyes." },
    ],
    recovery: "Use prescribed drops and shield, avoid rubbing and contamination, and attend corneal, pressure, wound and IOL checks before driving or flying.",
    risks: "corneal swelling, capsule rupture, vitreous loss, infection, inflammation, pressure change, macular swelling, retinal detachment, IOL displacement, residual refractive error and further surgery",
    urgent: "worsening pain, sudden vision loss, increasing redness, discharge, flashes, many floaters or a curtain-like shadow",
    driverTerms: ["Cataract density", "Ultrasound and consumables", "IOL model", "Capsular support"],
    related: ["Cataract Surgery", "Femto Laser Cataract Surgery", "Pediatric Cataract Surgery"],
  },
  {
    procedure: "Femto Laser Cataract Surgery",
    shortName: "femtosecond laser cataract surgery",
    unit: "per eye",
    specialist: "cataract surgeon trained in femtosecond-assisted surgery",
    anatomy: "Femtosecond-assisted cataract surgery applies planned laser pulses to selected corneal, anterior-capsule and lens structures before lens removal and IOL placement.",
    indication: "It may be considered for a suitable cataract eye after pupil, cornea, docking anatomy, capsule, zonules, retina and refractive goals are reviewed.",
    assessment: "Slit-lamp and dilated examination, IOP, retina checks, optical biometry, keratometry and laser-docking suitability are assessed.",
    technique: "The eye is docked to the laser for selected incisions, capsulotomy and lens fragmentation; the surgeon then removes lens material, inserts the IOL and checks the wound.",
    distinction: "The laser assists selected steps but does not replace the operating surgeon, complete lens removal, IOL placement or postoperative care, and it does not promise a better outcome.",
    approaches: [
      { label: "Femto-assisted phaco", detail: "Laser capsulotomy or fragmentation followed by phaco." },
      { label: "Conventional phaco", detail: "Manual early steps with ultrasound lens removal." },
      { label: "Manual small-incision surgery", detail: "Non-phaco extraction for selected cataracts." },
    ],
    recovery: "Drops, shield, wound, corneal and IOP reviews follow the individual eye; driving, exercise and travel await clinician advice.",
    risks: "docking difficulty, suction loss, incomplete laser cuts, corneal or capsular injury, inflammation, infection, pressure change, capsule rupture, retinal problems and additional surgery",
    urgent: "marked pain, reduced vision, redness, discharge, flashes, floaters, shadow or severe nausea",
    driverTerms: ["Laser docking", "Laser consumables", "Cataract complexity", "IOL model"],
    related: ["Cataract Surgery", "Phacoemulsification Cataract Surgery", "Pediatric Cataract Surgery"],
  },
  {
    procedure: "LASIK Eye Surgery",
    shortName: "LASIK",
    unit: "per eye",
    specialist: "corneal and refractive surgeon",
    anatomy: "LASIK reshapes corneal stroma with an excimer laser beneath a hinged corneal flap while the natural lens remains in place.",
    indication: "It may suit selected stable refractive errors when corneal thickness, shape, ocular surface, pupil, retina and expectations support treatment.",
    assessment: "Stable refraction, corrected vision, slit-lamp examination, tear-film review, pachymetry, corneal topography or tomography and retinal evaluation are required.",
    technique: "A femtosecond laser or microkeratome creates a flap, excimer laser ablates calculated stromal tissue, and the flap is repositioned without routine sutures.",
    distinction: "LASIK creates a flap; SMILE removes a stromal lenticule through a small incision, while ICL places a phakic lens without corneal laser reshaping.",
    approaches: [
      { label: "Femto-LASIK", detail: "Femtosecond-created flap followed by excimer ablation." },
      { label: "SMILE", detail: "Lenticule extraction without a LASIK flap." },
      { label: "Surface ablation or ICL", detail: "Alternative corneal-surface or phakic-lens pathways." },
    ],
    recovery: "Use drops, avoid eye rubbing and water contamination, and attend flap, ocular-surface and refraction reviews before driving or contact sport.",
    risks: "dry eye, flap displacement or striae, infection, inflammation, glare, halos, variable night vision, undercorrection, overcorrection, ectasia and retreatment",
    urgent: "pain, reduced vision, increasing redness, discharge, trauma, marked light sensitivity or a displaced-flap concern",
    driverTerms: ["Bilateral or single-eye plan", "Laser platform", "Corneal mapping", "Enhancement terms"],
    related: ["SMILE Eye Surgery", "ICL (Implantable Collamer Lens)", "Corneal Cross-Linking (C3R)"],
  },
  {
    procedure: "SMILE Eye Surgery",
    shortName: "SMILE",
    unit: "per eye",
    specialist: "corneal and refractive surgeon trained in lenticule extraction",
    anatomy: "SMILE uses a femtosecond laser to create a refractive stromal lenticule inside the cornea, removed through a small incision without a LASIK flap.",
    indication: "It may suit selected stable refractive errors after corneal shape, thickness, ocular surface, pupil, retinal health and treatment range are checked.",
    assessment: "Refraction, corrected acuity, slit-lamp examination, pachymetry, topography or tomography, tear-film and dilated retinal review guide candidacy.",
    technique: "The laser creates the lenticule and access incision; the surgeon identifies its planes, dissects attachments and extracts it before checking the cornea.",
    distinction: "SMILE is lenticule extraction without a hinged flap; LASIK uses flap-based excimer ablation, and ICL is a removable phakic intraocular lens.",
    approaches: [
      { label: "SMILE", detail: "Small-incision femtosecond lenticule extraction." },
      { label: "LASIK", detail: "Flap creation followed by excimer reshaping." },
      { label: "Surface ablation or ICL", detail: "Alternatives according to cornea and prescription." },
    ],
    recovery: "Prescribed drops, no rubbing, ocular-surface care and serial vision and corneal checks guide return to driving, work, water and sport.",
    risks: "difficult lenticule dissection, retained tissue, interface inflammation, infection, dry eye, glare, halos, undercorrection, overcorrection, ectasia and additional treatment",
    urgent: "pain, falling vision, redness, discharge, trauma, severe light sensitivity or a new shadow",
    driverTerms: ["Laser platform", "Prescription range", "Corneal tomography", "Lenticule complexity"],
    related: ["LASIK Eye Surgery", "ICL (Implantable Collamer Lens)", "Corneal Cross-Linking (C3R)"],
  },
  {
    procedure: "ICL (Implantable Collamer Lens)",
    shortName: "implantable collamer lens surgery",
    unit: "per eye",
    specialist: "refractive surgeon experienced in phakic IOL implantation",
    anatomy: "An ICL is a phakic lens placed behind the iris and in front of the natural crystalline lens, leaving the natural lens inside the eye.",
    indication: "It may suit selected refractive errors when corneal laser is unsuitable or not preferred and anterior-chamber depth, angle, endothelium and lens are appropriate.",
    assessment: "Refraction, anterior-chamber depth, white-to-white or other sizing, endothelial count, angle and IOP assessment, pupil and retinal checks guide lens selection.",
    technique: "Through a small incision, the folded lens enters the anterior chamber and is positioned behind the iris; centration, vault and pressure are checked.",
    distinction: "ICL is a phakic intraocular implant, not LASIK or SMILE corneal tissue removal and not cataract surgery replacing the natural lens.",
    approaches: [
      { label: "Phakic ICL", detail: "Implant behind iris with natural lens retained." },
      { label: "Corneal laser", detail: "LASIK, SMILE or surface treatment when suitable." },
      { label: "Lens replacement or optical correction", detail: "Different risk profile or non-surgical alternative." },
    ],
    recovery: "Use drops and shield and attend early IOP, inflammation, vault, angle and lens-position checks before driving, exercise or travel.",
    risks: "infection, inflammation, pressure rise, angle narrowing, endothelial loss, cataract formation, incorrect vault, lens rotation, glare, residual refractive error and removal or exchange",
    urgent: "pain, blurred or reduced vision, halos with nausea, redness, discharge, injury or sudden new floaters",
    driverTerms: ["ICL model and power", "Sizing measurements", "Toric alignment", "Pressure monitoring"],
    related: ["LASIK Eye Surgery", "SMILE Eye Surgery", "Cataract Surgery"],
  },
  {
    procedure: "Corneal Transplantation",
    shortName: "penetrating corneal transplantation",
    unit: "per course",
    specialist: "corneal transplant surgeon",
    anatomy: "Penetrating keratoplasty replaces a full-thickness circular corneal button, including stroma, Descemet membrane and endothelium, with donor tissue.",
    indication: "It may be considered for selected full-thickness scar, ectasia, infection damage or graft failure when a lamellar procedure cannot address all diseased layers.",
    assessment: "Slit-lamp examination, corneal imaging, pachymetry, endothelial review, ocular-surface, pressure, lens, retina and infection assessment define graft scope.",
    technique: "The surgeon trephines recipient cornea, removes the full-thickness button, positions screened donor tissue and secures it with sutures before checking the chamber and wound.",
    distinction: "PK is full thickness; DMEK replaces Descemet membrane and endothelium, DSEK adds posterior stroma, and DALK retains healthy recipient endothelium.",
    approaches: [
      { label: "Penetrating keratoplasty", detail: "Full-thickness donor corneal button." },
      { label: "Endothelial keratoplasty", detail: "DMEK or DSEK for selected endothelial failure." },
      { label: "DALK", detail: "Deep stromal replacement with endothelium retained." },
    ],
    recovery: "Long-term drops, shield, pressure, graft, suture, refraction and rejection surveillance are required; travel must preserve access to urgent corneal review.",
    risks: "graft rejection or failure, infection, wound leak, suture problems, astigmatism, pressure rise, cataract, retinal complications, trauma-related wound opening and repeat graft",
    urgent: "redness, light sensitivity, pain, reduced vision, discharge, wound injury or a clinician-defined rejection warning",
    driverTerms: ["Donor tissue", "Graft type", "Suture management", "Combined eye surgery"],
    related: ["DMEK", "DSEK", "DALK", "Corneal Cross-Linking (C3R)"],
  },
  {
    procedure: "DMEK",
    shortName: "DMEK",
    unit: "per course",
    specialist: "corneal surgeon experienced in endothelial keratoplasty",
    anatomy: "DMEK replaces diseased Descemet membrane and endothelium with a very thin donor membrane while retaining the recipient's anterior cornea and stroma.",
    indication: "It may suit selected endothelial failure such as Fuchs dystrophy or endothelial decompensation when other corneal layers are sufficiently clear.",
    assessment: "Slit-lamp examination, pachymetry, endothelial assessment, corneal imaging, lens, iris, anterior-chamber, IOP and retinal status guide suitability.",
    technique: "Recipient Descemet membrane is removed, a donor membrane scroll is injected and unfolded, and an air or gas bubble supports attachment.",
    distinction: "DMEK is membrane-and-endothelium replacement; DSEK includes a stromal-endothelial disc, PK is full thickness, and DALK retains endothelium.",
    approaches: [
      { label: "DMEK", detail: "Thin Descemet membrane and endothelial graft." },
      { label: "DSEK", detail: "Posterior stromal-endothelial donor disc." },
      { label: "Penetrating keratoplasty", detail: "Full-thickness replacement for broader disease." },
    ],
    recovery: "Supine positioning when instructed, drops and early graft-attachment, bubble, IOP and rejection checks continue with long-term endothelial follow-up.",
    risks: "graft detachment, rebubbling, upside-down or failed graft, rejection, infection, pressure rise, pupillary block, cell loss, corneal haze and repeat transplantation",
    urgent: "pain, nausea, sudden blur, redness, light sensitivity, discharge or a dark fixed pupil concern",
    driverTerms: ["Donor membrane", "Graft preparation", "Air or gas support", "Rebubbling terms"],
    related: ["DSEK", "Corneal Transplantation", "DALK"],
  },
  {
    procedure: "DSEK",
    shortName: "DSEK",
    unit: "per course",
    specialist: "corneal surgeon experienced in endothelial keratoplasty",
    anatomy: "DSEK replaces endothelium and Descemet membrane together with a thin layer of donor posterior stroma, creating a stromal-endothelial disc.",
    indication: "It may suit selected endothelial failure when replacing posterior layers can restore corneal clarity and the remaining cornea is suitable.",
    assessment: "Corneal thickness, clarity, endothelium, anterior chamber, lens, iris, IOP, prior surgery and retinal potential are reviewed.",
    technique: "Recipient posterior membrane is removed, the prepared donor disc is inserted and unfolded, and air or gas supports adherence to recipient stroma.",
    distinction: "DSEK carries a stromal-endothelial disc; DMEK uses thinner membrane and endothelium alone, while PK replaces full thickness.",
    approaches: [
      { label: "DSEK or DSAEK", detail: "Posterior stromal-endothelial disc transplantation." },
      { label: "DMEK", detail: "Membrane-and-endothelium graft without donor stroma." },
      { label: "Penetrating keratoplasty", detail: "Full-thickness graft for broader disease." },
    ],
    recovery: "Positioning, drops and early disc-attachment, bubble, IOP and corneal checks are followed by rejection and endothelial surveillance.",
    risks: "disc detachment, rebubbling, graft failure or rejection, infection, pressure rise, pupillary block, interface haze, refractive change and repeat graft",
    urgent: "pain, sudden blur, redness, light sensitivity, nausea, discharge or a rejection warning",
    driverTerms: ["Donor disc", "Tissue preparation", "Air or gas support", "Combined cataract work"],
    related: ["DMEK", "Corneal Transplantation", "DALK"],
  },
  {
    procedure: "DALK",
    shortName: "deep anterior lamellar keratoplasty",
    unit: "per course",
    specialist: "corneal transplant surgeon experienced in lamellar dissection",
    anatomy: "DALK removes diseased corneal stroma down toward Descemet membrane while retaining the recipient's healthy Descemet layer and endothelium.",
    indication: "It may suit selected stromal scar or keratoconus when endothelium remains healthy and full-thickness replacement is unnecessary.",
    assessment: "Slit-lamp examination, tomography, pachymetry, scar-depth imaging, endothelial status, ocular surface, IOP and retina guide depth and feasibility.",
    technique: "The surgeon separates and removes anterior and deep stroma, preserves recipient Descemet membrane, places a donor stromal graft and sutures it.",
    distinction: "DALK is stromal transplantation with recipient endothelium retained; PK is full thickness, while DMEK and DSEK treat posterior endothelial disease.",
    approaches: [
      { label: "DALK", detail: "Deep stromal graft with endothelium retained." },
      { label: "Penetrating keratoplasty", detail: "Full-thickness graft if deeper layers require replacement." },
      { label: "Non-transplant care", detail: "Lenses or cross-linking for selected earlier disease." },
    ],
    recovery: "Drops, shield, wound, suture, interface, pressure and refraction reviews continue over an extended course with protection from trauma.",
    risks: "Descemet perforation, conversion to full-thickness graft, interface haze, infection, rejection of donor layers, suture problems, astigmatism, pressure rise and repeat surgery",
    urgent: "pain, redness, light sensitivity, reduced vision, discharge, wound injury or sudden fluid-interface change",
    driverTerms: ["Scar depth", "Donor stroma", "Dissection method", "Suture course"],
    related: ["Corneal Transplantation", "DMEK", "DSEK", "Corneal Cross-Linking (C3R)"],
  },
  {
    procedure: "Glaucoma Surgery",
    shortName: "glaucoma surgery",
    unit: "per course",
    specialist: "glaucoma surgeon",
    anatomy: "Glaucoma damages the optic nerve, often in relation to intraocular pressure and aqueous drainage through the angle; surgery is an umbrella covering distinct pressure-lowering routes.",
    indication: "Surgery may be considered when documented glaucoma threatens vision despite suitable medicines or laser, or when pressure control and adherence needs justify intervention.",
    assessment: "Glaucoma type, gonioscopy, serial IOP, optic-disc and nerve imaging, visual fields, cornea, lens, conjunctiva and prior treatment guide selection.",
    technique: "The chosen procedure improves outflow or reduces aqueous production through laser, trabecular or angle work, bleb filtration, a drainage device or another named method.",
    distinction: "Glaucoma surgery is an umbrella, not one operation; outpatient laser, trabeculectomy bleb filtration and tube-and-plate implantation have different anatomy, risks and follow-up.",
    approaches: [
      { label: "Outpatient laser", detail: "Angle or ciliary laser for selected glaucoma." },
      { label: "Trabeculectomy", detail: "Filtering bleb created under conjunctiva." },
      { label: "Drainage device", detail: "Tube carries aqueous to an implanted plate." },
    ],
    recovery: "Pressure, inflammation, wound, bleb or tube and optic-nerve monitoring are method-specific; glaucoma drops change only on clinician instruction.",
    risks: "pressure too high or low, inflammation, bleeding, infection, corneal injury, cataract, scarring, bleb or tube problems, vision loss and further treatment",
    urgent: "pain, nausea, sudden reduced vision, marked redness, discharge, wound leak or clinician-defined pressure symptoms",
    driverTerms: ["Glaucoma type", "Named operation", "Prior treatment", "Pressure follow-up"],
    related: ["Laser Glaucoma Surgery", "Trabeculectomy", "Glaucoma Drainage Device / Valve Implantation"],
  },
  {
    procedure: "Laser Glaucoma Surgery",
    shortName: "laser glaucoma treatment",
    unit: "per course",
    specialist: "glaucoma ophthalmologist",
    anatomy: "Laser glaucoma treatment targets selected drainage-angle tissue or ciliary structures to alter aqueous outflow or production without creating a trabeculectomy bleb or implanting a tube.",
    indication: "It may suit selected open-angle, angle-closure or refractory glaucoma only after the exact type, angle anatomy, pressure target and alternatives are established.",
    assessment: "Gonioscopy, serial IOP, optic-nerve imaging, visual fields, corneal status, medicines and prior laser define the named laser plan.",
    technique: "After topical anaesthesia and lens placement when required, the ophthalmologist applies a specified laser pattern and checks pressure and inflammation afterward.",
    distinction: "Outpatient laser such as SLT is not trabeculectomy filtration or valve implantation; laser type, target, repeatability and expected medication plan must be named.",
    approaches: [
      { label: "Trabecular laser", detail: "Targets drainage meshwork in selected open-angle glaucoma." },
      { label: "Iridotomy or other angle laser", detail: "Creates or modifies a pathway for selected angle mechanisms." },
      { label: "Incisional surgery", detail: "Bleb or tube pathway when laser is unsuitable." },
    ],
    recovery: "Short-term drops when prescribed and prompt IOP and inflammation checks are followed by ongoing fields, nerve imaging and medicine review.",
    risks: "temporary or sustained pressure rise, inflammation, discomfort, corneal or iris injury, bleeding, incomplete response, need for medicines and later surgery",
    urgent: "pain, nausea, sudden blur, halos, marked redness, discharge or a clinician-defined pressure warning",
    driverTerms: ["Laser type", "One or both eyes", "Prior laser", "Post-laser IOP checks"],
    related: ["Glaucoma Surgery", "Trabeculectomy", "Glaucoma Drainage Device / Valve Implantation"],
  },
  {
    procedure: "Trabeculectomy",
    shortName: "trabeculectomy",
    unit: "per course",
    specialist: "glaucoma surgeon experienced in bleb management",
    anatomy: "Trabeculectomy creates a guarded drainage channel through sclera so aqueous collects beneath conjunctiva in a filtering bleb.",
    indication: "It may be considered when glaucoma requires a lower pressure than medicines or laser provide and conjunctival, lens and visual status support filtration.",
    assessment: "Glaucoma type, target IOP, fields, optic nerve, conjunctiva, prior surgery, inflammation, medicines and ability to attend frequent reviews are assessed.",
    technique: "The surgeon creates conjunctival and scleral flaps, forms an internal opening, modulates scarring, closes the guarded flap and shapes the bleb.",
    distinction: "Trabeculectomy is bleb filtration; it differs from outpatient laser and from a drainage-device tube leading to a plate.",
    approaches: [
      { label: "Trabeculectomy", detail: "Guarded filtering channel and conjunctival bleb." },
      { label: "Drainage device", detail: "Tube-and-plate aqueous diversion." },
      { label: "Laser or angle procedure", detail: "Different pathway for suitable glaucoma." },
    ],
    recovery: "Frequent early IOP, chamber, wound and bleb checks may require suture adjustment or other bleb care; drops and activity restrictions change with findings.",
    risks: "low or high pressure, shallow chamber, wound or bleb leak, infection, bleeding, cataract, choroidal or retinal problems, scarring, failure and further surgery",
    urgent: "pain, reduced vision, redness, discharge, nausea, a leaking-eye concern or injury near the bleb",
    driverTerms: ["Conjunctival scarring", "Antifibrotic plan", "Bleb interventions", "Frequent IOP reviews"],
    related: ["Glaucoma Surgery", "Laser Glaucoma Surgery", "Glaucoma Drainage Device / Valve Implantation"],
  },
  {
    procedure: "Glaucoma Drainage Device / Valve Implantation",
    shortName: "glaucoma drainage device implantation",
    unit: "per course",
    specialist: "glaucoma surgeon experienced in tube and plate implants",
    anatomy: "A glaucoma drainage device uses a tube from the anterior chamber or another chosen location to carry aqueous toward a plate secured beneath conjunctiva.",
    indication: "It may be considered for selected glaucoma where prior filtration failed or scarring, inflammation, anatomy or pressure needs favour a device.",
    assessment: "Glaucoma type, IOP target, cornea, chamber, conjunctiva, prior surgery, lens, retina and implant-site anatomy guide device and tube location.",
    technique: "The surgeon positions the plate, primes or ligates the named device as appropriate, inserts and covers the tube and closes conjunctiva.",
    distinction: "A tube-and-plate implant is not trabeculectomy bleb filtration or outpatient laser; valved and non-valved devices have different early flow management.",
    approaches: [
      { label: "Valved device", detail: "Valve mechanism influences early aqueous flow." },
      { label: "Non-valved device", detail: "Tube restriction is managed while a plate capsule forms." },
      { label: "Trabeculectomy or laser", detail: "Alternative pressure pathways for selected eyes." },
    ],
    recovery: "Early and serial IOP, tube, cornea, chamber, plate and wound checks guide drops, restrictions and any flow-modulating intervention.",
    risks: "low or high pressure, tube blockage, exposure or migration, corneal damage, double vision, bleeding, infection, retinal or choroidal problems, device failure and revision",
    urgent: "pain, sudden blur, redness, discharge, nausea, visible tube exposure, wound leak or double vision change",
    driverTerms: ["Device model", "Tube location", "Prior surgery", "Flow management"],
    related: ["Glaucoma Surgery", "Trabeculectomy", "Laser Glaucoma Surgery"],
  },
  {
    procedure: "Vitrectomy",
    shortName: "vitrectomy",
    unit: "per course",
    specialist: "vitreoretinal surgeon",
    anatomy: "Vitrectomy removes vitreous gel through pars plana ports so the surgeon can address blood, membranes, traction, infection or retinal pathology and may use fluid, air, gas or silicone oil.",
    indication: "It may be considered for selected vitreous haemorrhage, membrane, traction, infection, retained material or as part of retinal detachment or macular-hole care.",
    assessment: "Dilated retinal examination, OCT, fundus imaging and ultrasound when the view is blocked define macula, retina, vitreous, lens and detachment status.",
    technique: "Small ports provide illumination, infusion and cutting; vitreous and indicated membranes are removed, retinal treatment is completed and a chosen tamponade may be placed.",
    distinction: "Vitrectomy names vitreous removal and access; retinal detachment repair additionally reattaches retina, while macular-hole surgery includes macular membrane work and gas planning.",
    approaches: [
      { label: "Vitrectomy alone", detail: "Vitreous removal for a named indication." },
      { label: "Vitrectomy with retinal repair", detail: "Adds laser, cryotherapy or tamponade." },
      { label: "Scleral buckle or observation", detail: "Alternative for selected retinal disease." },
    ],
    recovery: "Drops, shield and retina, pressure and lens checks follow the indication; gas or oil may require positioning and strict altitude, flight or anaesthesia restrictions.",
    risks: "retinal tear or detachment, bleeding, infection, pressure change, cataract, macular swelling, tamponade problems, recurrent disease and further surgery",
    urgent: "pain, vision drop, increasing redness, discharge, flashes, floaters, curtain shadow, nausea or positioning difficulty",
    driverTerms: ["Retinal indication", "Membrane work", "Tamponade choice", "Combined lens surgery"],
    related: ["Retinal Detachment Surgery", "Macular Hole Surgery", "Intravitreal Anti-VEGF Injection"],
  },
  {
    procedure: "Retinal Detachment Surgery",
    shortName: "retinal detachment surgery",
    unit: "per course",
    specialist: "vitreoretinal surgeon",
    anatomy: "Retinal detachment separates neurosensory retina from supporting tissue; breaks, vitreous traction, fluid extent and macular involvement guide repair.",
    indication: "A suspected detachment needs urgent local retinal assessment; surgery may use vitrectomy, scleral buckle, pneumatic treatment or a combination according to findings.",
    assessment: "Dilated peripheral retinal examination, drawings or imaging, OCT for macula and ultrasound when the view is blocked map breaks and detachment.",
    technique: "The surgeon seals retinal breaks and supports reattachment using buckle, vitrectomy, laser or cryotherapy and air, gas or silicone oil as individually planned.",
    distinction: "Detachment repair is directed at retinal breaks and reattachment; vitrectomy alone has broader indications, and macular-hole surgery targets a central retinal defect.",
    approaches: [
      { label: "Vitrectomy repair", detail: "Removes traction and uses retinopexy and tamponade." },
      { label: "Scleral buckle", detail: "External support indents the wall near breaks." },
      { label: "Pneumatic or combined repair", detail: "Selected gas-based or multi-method pathway." },
    ],
    recovery: "Retinal, pressure and tamponade checks are time-sensitive; positioning and gas-related flight, altitude and anaesthesia restrictions must be followed exactly.",
    risks: "failure to reattach, proliferative scarring, new breaks, bleeding, infection, pressure change, cataract, double vision, refractive change and repeat surgery",
    urgent: "new curtain or shadow, increasing flashes or floaters, sudden vision loss, pain, redness, discharge or severe nausea",
    driverTerms: ["Detachment extent", "Macular status", "Repair method", "Gas or oil tamponade"],
    related: ["Vitrectomy", "Macular Hole Surgery", "Intravitreal Anti-VEGF Injection"],
  },
  {
    procedure: "Intravitreal Anti-VEGF Injection",
    shortName: "intravitreal anti-VEGF injection",
    unit: "per injection",
    specialist: "retina specialist",
    anatomy: "An intravitreal injection delivers anti-VEGF medicine through the pars plana into the vitreous cavity to treat selected retinal or choroidal vascular leakage or growth.",
    indication: "It may be used for selected wet macular degeneration, diabetic macular oedema, retinal-vein occlusion or another confirmed indication after retinal review.",
    assessment: "Visual acuity, dilated retinal examination and OCT establish macular fluid; diagnosis may also require angiographic imaging, IOP and systemic-risk review.",
    technique: "The named eye and drug are verified, antiseptic prepares lids and ocular surface, local anaesthetic is used, medicine is injected and immediate safety is checked.",
    distinction: "Pricing is per injection, not a complete treatment course; OCT response and disease activity determine whether and when ongoing injections are advised.",
    approaches: [
      { label: "Anti-VEGF injection", detail: "Named medicine delivered intravitreally." },
      { label: "Alternative intravitreal medicine", detail: "Different mechanism and risk profile when indicated." },
      { label: "Laser or surgery", detail: "Separate treatment for selected retinal conditions." },
    ],
    recovery: "Mild surface irritation can occur, but each injection needs infection warnings, follow-up and a documented OCT-based ongoing schedule rather than a fixed course promise.",
    risks: "endophthalmitis, retinal tear or detachment, bleeding, inflammation, pressure rise, lens injury, systemic concern and need for repeated injections",
    urgent: "increasing pain, marked redness, discharge, light sensitivity, falling vision, new floaters, flashes or a curtain shadow",
    driverTerms: ["Drug and dose", "Per-injection unit", "OCT monitoring", "Ongoing schedule"],
    related: ["Vitrectomy", "Retinal Detachment Surgery", "Macular Hole Surgery"],
  },
  {
    procedure: "Macular Hole Surgery",
    shortName: "macular hole surgery",
    unit: "per course",
    specialist: "vitreoretinal surgeon",
    anatomy: "A macular hole is a central full-thickness retinal defect; vitreomacular traction and internal limiting membrane relationships guide surgery.",
    indication: "Vitrectomy may be considered for a suitable OCT-confirmed macular hole after size, stage, duration, fellow eye and alternatives are reviewed.",
    assessment: "Dilated examination and high-quality macular OCT document hole dimensions, traction, epiretinal tissue and other retinal or lens disease.",
    technique: "Vitrectomy releases traction, a fine membrane peel is commonly performed around the macula, and an air or gas bubble supports closure while healing.",
    distinction: "Macular-hole surgery is vitrectomy plus macular membrane and gas planning; it differs from peripheral retinal-detachment repair and from injection treatment.",
    approaches: [
      { label: "Vitrectomy with membrane peel", detail: "Traction release, macular peel and gas." },
      { label: "Observation", detail: "Selected early or small findings under OCT review." },
      { label: "Alternative complex-hole technique", detail: "Additional tissue strategy for selected holes." },
    ],
    recovery: "Drops, retinal and pressure checks, procedure-specific positioning and strict gas-related flight, altitude and anaesthesia restrictions apply.",
    risks: "failure or reopening, retinal tear or detachment, infection, bleeding, pressure change, cataract, visual distortion, gas problems and repeat surgery",
    urgent: "pain, sudden vision reduction, redness, discharge, flashes, floaters, curtain shadow or inability to follow gas safety",
    driverTerms: ["Hole size and duration", "Membrane technique", "Gas choice", "Positioning and OCT"],
    related: ["Vitrectomy", "Retinal Detachment Surgery", "Intravitreal Anti-VEGF Injection"],
  },
  {
    procedure: "Pediatric Cataract Surgery",
    shortName: "pediatric cataract surgery",
    unit: "per eye",
    specialist: "pediatric ophthalmologist and cataract surgeon",
    anatomy: "A child's cloudy lens can obstruct the developing visual axis; treatment must address cataract removal, age-appropriate IOL or aphakia correction and visual development.",
    indication: "Surgery may be time-sensitive when a unilateral or bilateral cataract threatens visual development, but timing follows age, density, laterality and examination.",
    assessment: "Child-friendly or anaesthetized examination reviews fixation, refraction, cataract, eye size, pressure, retina, systemic associations and visual potential.",
    technique: "Under general anaesthesia, the surgeon clears the lens and visual axis, manages capsule and vitreous as age requires, and follows a planned IOL or aphakia pathway.",
    distinction: "Pediatric surgery is not adult phaco scaled down: general anaesthesia, visual-axis management, changing eye power, aphakia correction and amblyopia therapy are central.",
    approaches: [
      { label: "Primary IOL", detail: "Age- and eye-specific lens implantation with correction plan." },
      { label: "Aphakia pathway", detail: "Contact lens or glasses after lens removal." },
      { label: "Observation", detail: "Only when cataract does not require immediate clearing." },
    ],
    recovery: "Care includes drops, shield, anaesthesia recovery, refraction, glasses or contact lens, patching or amblyopia therapy, pressure checks and long-term visual-development review.",
    risks: "infection, inflammation, visual-axis opacity, glaucoma, retinal problems, IOL or refractive change, anaesthesia complications, amblyopia and further procedures",
    urgent: "pain, redness, discharge, light avoidance, loss of fixation, vomiting, shield injury or caregiver concern about sudden visual behaviour",
    driverTerms: ["Child age and laterality", "General anaesthesia", "IOL or aphakia plan", "Amblyopia follow-up"],
    related: ["Cataract Surgery", "Phacoemulsification Cataract Surgery", "Squint / Strabismus Surgery"],
  },
  {
    procedure: "Squint / Strabismus Surgery",
    shortName: "strabismus surgery",
    unit: "per course",
    specialist: "strabismus ophthalmologist or pediatric ophthalmologist",
    anatomy: "Strabismus reflects ocular misalignment involving extraocular-muscle action, binocular control and sometimes nerve, orbital or vision disorders.",
    indication: "Muscle surgery may be considered after alignment measurements, refraction, vision, symptoms, stability, cause and non-surgical options are reviewed.",
    assessment: "Distance and near measurements in diagnostic gaze, motility, fixation, binocular function, refraction, amblyopia, double vision and neurological signs guide muscle planning.",
    technique: "Through conjunctival access, selected extraocular muscles are recessed, resected, plicated, transposed or adjusted according to the measured plan.",
    distinction: "The operation changes selected muscle force or position; it does not replace refraction or amblyopia treatment and cannot promise exact alignment or binocular function.",
    approaches: [
      { label: "Recession", detail: "Weakens action by moving muscle insertion back." },
      { label: "Resection or plication", detail: "Strengthens selected muscle action." },
      { label: "Adjustable or transposition plan", detail: "Specialized method for selected patterns." },
    ],
    recovery: "Redness, irritation and temporary double vision are monitored; drops, activity guidance, alignment measurements, refraction and amblyopia care continue.",
    risks: "undercorrection, overcorrection, new or persistent double vision, slipped or lost muscle, infection, scarring, globe injury, anterior-segment ischaemia and repeat surgery",
    urgent: "severe pain, reduced vision, marked swelling, discharge, fever, increasing double vision with neurological symptoms or inability to move the eye",
    driverTerms: ["Number of muscles", "Alignment pattern", "Adjustable sutures", "Amblyopia care"],
    related: ["Pediatric Cataract Surgery", "Oculoplastic Surgery", "Eyelid Reconstruction Surgery"],
  },
  {
    procedure: "Oculoplastic Surgery",
    shortName: "functional oculoplastic surgery",
    unit: "per course",
    specialist: "oculoplastic surgeon",
    anatomy: "Oculoplastic surgery covers functional disease of eyelids, orbit and lacrimal structures that protect the globe and ocular surface.",
    indication: "It may treat selected ptosis, malposition, orbital lesion, exposure, trauma or lacrimal problem after function, vision and tissue are assessed.",
    assessment: "Vision, pupils, eye movements, globe position, eyelid height and closure, ocular surface, lacrimal function and imaging or pathology when indicated define scope.",
    technique: "The surgeon repairs the specifically diagnosed lid, orbital or lacrimal structure using an approach matched to function and tissue requirements.",
    distinction: "Functional oculoplasty is an umbrella distinct from cosmetic Blepharoplasty; eyelid reconstruction replaces a defined defect, while DCR creates tear drainage into the nose.",
    approaches: [
      { label: "Functional eyelid surgery", detail: "Treats position, closure or ptosis." },
      { label: "Orbital surgery", detail: "Addresses selected lesion, fracture or compression." },
      { label: "Lacrimal or reconstructive surgery", detail: "DCR or tissue repair for a named defect." },
    ],
    recovery: "Cold care when advised, lubrication, wound and vision checks, head elevation and procedure-specific restrictions continue with pathology or imaging review when relevant.",
    risks: "bleeding behind the eye, vision loss, infection, scarring, asymmetry, dry eye, exposure, double vision, nerve or muscle injury, recurrence and revision",
    urgent: "vision reduction, severe pain, tense swelling, new double vision, inability to close the eye, bleeding, fever or discharge",
    driverTerms: ["Functional diagnosis", "Eyelid or orbital scope", "Imaging or pathology", "Graft or implant"],
    related: ["Eyelid Reconstruction Surgery", "Dacryocystorhinostomy (DCR) / Tear Duct Surgery", "Squint / Strabismus Surgery"],
  },
  {
    procedure: "Eyelid Reconstruction Surgery",
    shortName: "eyelid reconstruction",
    unit: "per course",
    specialist: "oculoplastic reconstructive surgeon",
    anatomy: "Eyelid reconstruction restores anterior and posterior lamellae, lid margin, canthal support and closure needed to protect the cornea.",
    indication: "It may follow tumour removal, trauma, scar, infection damage or tissue loss when direct closure cannot restore safe form and function.",
    assessment: "Defect size, depth and location, remaining lid, canthi, tear drainage, ocular surface, vision, pathology margins and donor tissue are assessed.",
    technique: "The surgeon reconstructs missing layers with local advancement or rotation, flap, graft or staged technique while aligning margin and protecting the globe.",
    distinction: "Reconstruction restores a defined functional defect and differs from cosmetic Blepharoplasty; pathology clearance and corneal protection can determine timing and extent.",
    approaches: [
      { label: "Direct or local tissue repair", detail: "Closes suitable smaller defects." },
      { label: "Flap reconstruction", detail: "Moves vascularized nearby tissue." },
      { label: "Graft or staged reconstruction", detail: "Replaces missing lamella or extensive defect." },
    ],
    recovery: "Lubrication, shield, wound, flap or graft viability, lid closure, margin, vision and pathology checks guide staged division, suture removal or revision.",
    risks: "bleeding, infection, flap or graft loss, lid malposition, poor closure, corneal exposure, scarring, asymmetry, tear-drainage injury and revision",
    urgent: "reduced vision, severe pain, darkening flap, wound opening, active bleeding, inability to close the eye, fever or discharge",
    driverTerms: ["Defect size and layers", "Flap or graft", "Pathology margins", "Staged reconstruction"],
    related: ["Oculoplastic Surgery", "Dacryocystorhinostomy (DCR) / Tear Duct Surgery", "Squint / Strabismus Surgery"],
  },
  {
    procedure: "Dacryocystorhinostomy (DCR) / Tear Duct Surgery",
    shortName: "DCR tear duct surgery",
    unit: "per course",
    specialist: "oculoplastic or lacrimal surgeon",
    anatomy: "DCR creates a drainage passage between the lacrimal sac and nasal cavity, bypassing an obstructed nasolacrimal duct; canaliculi remain a separate proximal pathway.",
    indication: "It may suit selected tearing, recurrent sac infection or obstruction after the level and cause of blockage are confirmed and acute infection is managed.",
    assessment: "Lid and punctal examination, irrigation or probing, nasal review and imaging or endoscopy when indicated distinguish sac or duct blockage from canalicular or pump problems.",
    technique: "Through an external skin or endoscopic nasal approach, bone and mucosa are opened to connect sac with nose; a silicone stent may be used.",
    distinction: "DCR bypasses a sac or nasolacrimal-duct obstruction; it does not correct every cause of tearing, and external versus endoscopic access follows anatomy and expertise.",
    approaches: [
      { label: "External DCR", detail: "Skin approach to sac and nasal passage." },
      { label: "Endoscopic DCR", detail: "Nasal endoscopic route without external incision." },
      { label: "Canalicular treatment", detail: "Different pathway for proximal blockage." },
    ],
    recovery: "Nasal and eye drops, wound or endoscopic review, bleeding precautions and stent care when used continue until drainage and healing are reassessed.",
    risks: "bleeding, infection, scar, nasal adhesion, persistent tearing, closure of the passage, stent displacement, canalicular injury, orbital injury and revision",
    urgent: "heavy nose bleeding, eye swelling, vision change, severe pain, fever, discharge, breathing concern or displaced stent",
    driverTerms: ["Blockage level", "External or endoscopic route", "Nasal work", "Silicone stent"],
    related: ["Oculoplastic Surgery", "Eyelid Reconstruction Surgery", "Squint / Strabismus Surgery"],
  },
  {
    procedure: "Corneal Cross-Linking (C3R)",
    shortName: "corneal cross-linking",
    unit: "per eye",
    specialist: "corneal surgeon experienced in ectasia",
    anatomy: "Corneal cross-linking applies riboflavin and controlled ultraviolet A exposure to corneal stroma to increase biomechanical stability in selected ectatic corneas.",
    indication: "It may be considered for documented progressive keratoconus or ectasia when corneal thickness, scarring, age and ocular-surface status support treatment.",
    assessment: "Serial refraction, pachymetry and corneal topography or tomography document progression, thinnest point and shape; slit-lamp and retinal checks address other disease.",
    technique: "In epithelium-off treatment the central epithelium is removed, riboflavin is applied and thickness is checked before a controlled UVA protocol; a bandage lens is placed.",
    distinction: "C3R aims to stabilize progression, not provide refractive correction or promise clearer unaided vision; glasses, contact lenses or later surgery may still be needed.",
    approaches: [
      { label: "Epithelium-off cross-linking", detail: "Riboflavin saturation after epithelial removal." },
      { label: "Alternative protocol", detail: "Modified exposure only when clinically justified." },
      { label: "Optical or transplant pathway", detail: "Lenses or graft for different disease needs." },
    ],
    recovery: "Pain, light sensitivity and blur are expected concerns during epithelial healing; drops, bandage-lens removal, infection and haze checks precede serial tomography.",
    risks: "infection, delayed epithelial healing, corneal haze or scar, sterile infiltrate, thinning, endothelial injury, persistent pain, reduced vision and need for transplant",
    urgent: "increasing pain, redness, discharge, falling vision, lost bandage lens, marked light sensitivity or a new white corneal spot",
    driverTerms: ["One or both eyes", "Tomography evidence", "Treatment protocol", "Bandage-lens follow-up"],
    related: ["DALK", "Corneal Transplantation", "LASIK Eye Surgery", "SMILE Eye Surgery"],
  },
];

export const OPHTHALMOLOGY_PILOT_PROCEDURES = ["Cataract Surgery"] as const;

export const ophthalmologyArticles = [
  createOphthalmologyArticle(cataractProfile),
  ...scaledProfiles.map(createScaledArticle),
];

export const ophthalmologyArticlesBySlug: Record<string, CostArticle> =
  Object.fromEntries(
    ophthalmologyArticles.map((article) => [article.slug, article]),
  );
