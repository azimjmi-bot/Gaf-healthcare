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

export const OPHTHALMOLOGY_PILOT_PROCEDURES = ["Cataract Surgery"] as const;

export const ophthalmologyArticles = [
  createOphthalmologyArticle(cataractProfile),
];

export const ophthalmologyArticlesBySlug: Record<string, CostArticle> =
  Object.fromEntries(
    ophthalmologyArticles.map((article) => [article.slug, article]),
  );
