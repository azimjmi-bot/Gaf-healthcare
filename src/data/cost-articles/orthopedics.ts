import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";

type OrthoProfile = {
  procedure: string;
  shortName: string;
  briefName: string;
  slug: string;
  figure: string;
  figureAlt: string;
  definition: string;
  indication: string;
  nonCandidate: string;
  evaluation: string;
  approaches: LabelledDetail[];
  technique: string;
  duration: string;
  stayNote: string;
  recovery: string;
  implantNote: string;
  distinctiveRisks: string;
  drivers: LabelledDetail[];
  quoteItems: string[];
  documents: string[];
  followUp: string;
  related: string[];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  { city: string; airport: string; ecosystem: string; logistics: string; rehab: string }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    ecosystem:
      "Delhi NCR currently holds the deepest procedure-tagged Orthopedics roster in the GAF catalog, spanning joint replacement, sports lists and trauma campuses across Delhi, Gurugram, Noida and Faridabad. Breadth is useful only after imaging shows which list the case belongs on.",
    logistics:
      "Choose lodging after the operating campus is named. Cross-NCR traffic can turn a short map distance into a poor daily physiotherapy commute. Winter air quality and summer heat also affect outdoor walking practice.",
    rehab:
      "Ask whether the first physiotherapy sessions occur on the ward, in a hospital gym or at a nearby outpatient clinic, and whether a companion can attend. Hotel stairs and bathroom grab-rails matter more here than airport proximity.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    ecosystem:
      "Mumbai and Navi Mumbai listings should be treated as separate recovery geographies. A tagged sports or arthroplasty clinician on one side of the harbour is not interchangeable with a campus on the other.",
    logistics:
      "Stay on the same side of the harbour as the confirmed campus. Peak traffic and monsoon disruption can make early follow-up visits impractical from an airport hotel.",
    rehab:
      "Crutch or walker practice after discharge is easier when the apartment is close to the treating campus and not dependent on a harbour crossing. Confirm lift access before booking.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    ecosystem:
      "Bengaluru has a substantial private orthopaedic market, but this article only surfaces clinicians tagged to the exact procedure. Several pathways currently have no Bengaluru relationship in the catalog and therefore need a records-first match.",
    logistics:
      "The airport sits north of the city while many hospital districts are south or east. Do not book a recovery apartment until the campus is written on the estimate; transfers often exceed an hour.",
    rehab:
      "Milder weather can make outdoor walking practice easier, but climate is not a substitute for a named arthroplasty or sports list, implant confirmation or a written physiotherapy plan.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    ecosystem:
      "Chennai's current Orthopedics entity graph is more concentrated than NCR. That can simplify a second opinion on one campus, provided the named clinician's role matches implant arthroplasty, arthroscopy, trauma or hand work.",
    logistics:
      "Airport access is often shorter than in Bengaluru or Hyderabad, which helps repeat X-rays and early physiotherapy. Heat and humidity still argue for air-conditioned lodging near the campus rather than a beach stay.",
    rehab:
      "Plan hydration, indoor walking routes and companion help for the first outdoor sessions. A short airport road is not a short rehabilitation pathway.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    ecosystem:
      "Hyderabad listings are split across districts such as Jubilee Hills, Kondapur and Secunderabad. Those campuses are not one interchangeable city service; the quotation must name the address.",
    logistics:
      "The airport is south of the main hospital belt. Transfers of 45–70 minutes are common. A serviced apartment near the named campus is a better recovery base than an airport hotel.",
    rehab:
      "Longer airport transfers make same-day arrival surgery unwise. Build a rest and imaging day, then remain nearby until the first wound and physiotherapy review.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India range is a comparison band. A named orthopaedic team must review imaging before issuing a case-specific quotation that states the implant or graft assumption.",
  },
  {
    country: "Turkey",
    costLevel: [1.1, 1.8],
    stay: "Approach- and implant-dependent",
    positioning: "Packaged private-care market",
    context:
      "Confirm whether the published figure is primary or revision work and whether the implant, graft or hardware brand is included.",
  },
  {
    country: "Thailand",
    costLevel: [1.3, 2.2],
    stay: "Approach- and implant-dependent",
    positioning: "Private international hospitals",
    context:
      "International desks are established; implant choice, robotic assistance and physiotherapy nights still need an itemised letter.",
  },
  {
    country: "United Arab Emirates",
    costLevel: [2.2, 3.6],
    stay: "Approach- and implant-dependent",
    positioning: "Regional premium private care",
    context:
      "Shorter travel for many Gulf patients may offset higher private hospital, implant and rehabilitation charges.",
  },
  {
    country: "Singapore",
    costLevel: [2.8, 4.8],
    stay: "Approach- and implant-dependent",
    positioning: "High-cost specialist private care",
    context:
      "Strong implant and rehabilitation infrastructure at premium self-pay rates; professional and implant fees may be separated.",
  },
  {
    country: "Germany",
    costLevel: [2.5, 4.5],
    stay: "Approach- and implant-dependent",
    positioning: "European orthopaedic centres",
    context:
      "Structured specialist care with higher facility and professional costs for international self-pay patients.",
  },
  {
    country: "United Kingdom",
    costLevel: [2.2, 4],
    stay: "Approach- and implant-dependent",
    positioning: "Private self-pay for most visitors",
    context:
      "Overseas patients generally need private arrangements; clarify whether physiotherapy and later review are part of the episode.",
  },
  {
    country: "United States",
    stay: "Approach- and implant-dependent",
    positioning: "Highest self-pay reference",
    context:
      "Facility, surgeon, implant, anaesthesia, imaging and physiotherapy can be billed by separate entities; [US_COST] is a comparison range.",
  },
];

function makeCities(profile: OrthoProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    return {
      citySlug,
      ecosystem: `${place.ecosystem} ${profile.definition}`,
      logistics: `${place.airport}: ${place.logistics}`,
      costNote:
        `No verified ${place.city}-only tariff is stored. Use [INDIA_COST] as the national planning band until a named hospital issues an itemised estimate.`,
      page: {
        seoTitle: `${profile.briefName} Cost in ${place.city}, India: Doctors & Hospitals`,
        seoDescription: `${profile.briefName} in ${place.city} uses the [INDIA_COST] India planning range. Review implant or graft terms, physiotherapy and live GAF doctor records.`,
        heading: `${profile.briefName} Cost in ${place.city}, India`,
        subtitle: `${profile.definition} The [INDIA_COST] figure is a national planning band—not a ${place.city} tariff. Final cost follows imaging, implant or graft choice, bone quality and the written treatment plan.`,
        intro: [
          place.ecosystem,
          `${place.logistics} ${place.rehab}`,
          `${profile.indication} ${profile.evaluation}`,
          `Hospital and doctor cards for ${profile.shortName} appear only through live procedure tags. A general Orthopedics label is not treated as proof that this operation, implant inventory or rehabilitation pathway is available on that campus.`,
        ],
        answer: [
          `${profile.briefName} in ${place.city} is planned against [INDIA_COST], with [STAY] in the current catalog. This is an India planning band, not a ${place.city} quotation.`,
          `${profile.implantNote} ${profile.recovery}`,
        ],
        costExplanation: [
          `${profile.implantNote} The national band can move with ${profile.drivers
            .slice(0, 3)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. It should not be split into an invented city tariff.`,
          "Ask the hospital to name the surgeon, exact campus, implant or graft assumption, anaesthesia, included ward nights, physiotherapy sessions and extra-day policy.",
          `Outside the hospital letter, budget travel through ${place.airport}, companion lodging, local transport, medicines and a flexible return flight after physiotherapy clearance.`,
        ],
        factors: [
          ...profile.drivers.slice(0, 3),
          { label: `Named ${place.city} campus`, detail: "The estimate should identify the exact hospital, implant or graft, room category, included nights and physiotherapy terms." },
        ],
        medicalTourism: [
          `Send standing X-rays or MRI files, not only a one-line report, before booking travel to ${place.city}.`,
          `Arrive through ${place.airport} with time for examination, repeat imaging and anaesthetic review. ${place.rehab}`,
          "Remain close enough for the first wound and physiotherapy review. The treating team—not an airline schedule—decides fitness to fly.",
        ],
        hospitalDiscussion: [
          `Hospital cards in ${place.city} should appear only when a live GAF relationship connects the campus to ${profile.procedure}. This page names no provider and makes no volume or robotic-capability claim.`,
          "Confirm the implant or graft assumption, physiotherapy plan, exact operating address and what happens if the stay is extended.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored India planning range. No verified ${place.city}-only price is stored. The final amount follows imaging, implant or graft choice, stay and the named campus.`,
          },
          {
            q: `Which ${place.city} doctors perform ${profile.shortName}?`,
            a: "Only profiles dynamically matched to this exact procedure are shown. Placement is not a ranking, and an empty city list means a records-first match is required.",
          },
          {
            q: `Where should a patient stay in ${place.city}?`,
            a: `${place.logistics} Keep bookings flexible until the operating address and first physiotherapy visit are written.`,
          },
          {
            q: "Are physiotherapy sessions included?",
            a: "Only if the itemised letter says so. Ask how many inpatient and outpatient sessions are bundled and what later rehabilitation costs.",
          },
          {
            q: "When can the patient fly home?",
            a: "There is no universal flight date. The team should review the wound, swelling, mobility aids, clot-prevention plan and imaging before clearing travel.",
          },
        ],
      },
    };
  });
}

function createOrthopedicsArticle(profile: OrthoProfile): CostArticle {
  const approachSummary = profile.approaches.map((item) => item.label).join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug: profile.slug,
    lastUpdated: "2026-09-11",
    duration: profile.duration,
    recoveryGlance: profile.recovery,
    seoTitle: `${profile.briefName} Cost in India: Price, Hospitals & Doctors`,
    seoDescription: `${profile.briefName} cost in India is typically [INDIA_COST]. Compare implant or graft terms, physiotherapy, cities and international-patient planning.`,
    heading: `${profile.briefName} Cost in India`,
    heroSubtitle: `${profile.definition} The stored India planning range is [INDIA_COST], compared with [US_COST] typical US self-pay. Final cost depends on imaging, implant or graft choice, bone quality and the written treatment plan.`,
    introduction: [
      `${profile.definition} ${profile.indication}`,
      `${profile.evaluation} Actual image files matter more than a diagnosis written on a travel form.`,
      `The catalog stores [INDIA_COST] for India, [US_COST] for typical US self-pay and [STAY] for planning. Those tokens keep this page aligned with the cost sheet. They are not quotations or outcome forecasts.`,
    ],
    answer: [
      `${profile.briefName} in India is typically planned at [INDIA_COST]. The stored stay is [STAY], but implant work, revision, infection or slower physiotherapy can make an individual pathway shorter or longer.`,
      `${profile.technique} Pathways often discussed include ${approachSummary}. A qualified orthopaedic team chooses among them after imaging; this page does not recommend an operation.`,
      `${profile.implantNote} ${profile.recovery} Return flights should stay flexible until the wound and mobility are reviewed.`,
    ],
    indiaCost: [
      `The [INDIA_COST] range is a national planning band for ${profile.shortName} as quoted. It may include the scheduled operation, professional fees, operating room, anaesthesia, a stated implant or graft assumption and a defined ward allowance. It does not establish one hospital's price.`,
      `${profile.implantNote} Other drivers include ${profile.drivers
        .map((item) => item.label.toLowerCase())
        .join(", ")}. A change from primary to revision work, or from one implant class to another, is a different episode—not a cosmetic upgrade.`,
      "Do not infer separate Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad prices from the national range. Until a verified city figure exists, compare named teams and written inclusions while keeping travel and physiotherapy costs separate.",
    ],
    costComponents: [
      {
        label: "Orthopaedic consultation and records review",
        detail: `Review of symptoms, prior operations and imaging that leads to a plan for ${profile.shortName}.`,
      },
      {
        label: "Pre-operative imaging and laboratory tests",
        detail: profile.evaluation,
      },
      {
        label: "Surgeon, anaesthesia and operating room",
        detail: "Professional and facility fees for the scheduled episode, including the stated approach.",
      },
      {
        label: "Implant, graft or hardware as written",
        detail: profile.implantNote,
      },
      {
        label: "Ward stay, nursing and medicines",
        detail: `${profile.stayNote} Confirm room category and included nights rather than relying only on [STAY].`,
      },
      {
        label: "Physiotherapy and discharge imaging",
        detail: "Inpatient sessions and the first postoperative X-ray or review are included only when the letter says so.",
      },
    ],
    whyQuotesDiffer: `Two ${profile.shortName} letters may describe different implants, grafts, laterality, revision work or physiotherapy assumptions. Compare the named surgeon, campus, implant brand class, included nights and exclusions before comparing totals. A higher price is not proof of a better result.`,
    costDrivers: profile.drivers,
    inclusions: [
      {
        label: "Named specialist assessment",
        detail: "A consultation with the clinician expected to operate, where the hospital bundles it.",
      },
      {
        label: "The written procedure",
        detail: `The estimate should use the exact name ${profile.procedure} rather than a generic “ortho package.”`,
      },
      {
        label: "Theatre and anaesthesia",
        detail: "Operating-room, surgeon and anaesthesia fees for the scheduled case.",
      },
      {
        label: "Stated implant, graft or hardware",
        detail: "Only the brand class or graft type written on the letter. A substitution can change the amount.",
      },
      {
        label: "Quoted ward stay and routine inpatient care",
        detail: "Room category, included nights, routine medicines and discharge summary where bundled.",
      },
    ],
    exclusions: [
      {
        label: "Additional imaging or specialist clearance",
        detail: "Repeat MRI, CT, bone-density testing, dental or medical clearance may sit outside the first estimate.",
      },
      {
        label: "Premium or different implants and grafts",
        detail: "A change in implant constraint, bearing, graft source or hardware generally creates a new line.",
      },
      {
        label: "Bilateral, revision or unexpected additional work",
        detail: "A second side, infection debridement or unplanned reconstruction is not automatically inside a primary quote.",
      },
      {
        label: "Extended stay, ICU or complication care",
        detail: "Extra nights, clot treatment, transfusion or intensive care are usually billed according to use.",
      },
      {
        label: "Outpatient physiotherapy, travel and companion costs",
        detail: "Later rehab, flights, visas, hotels and meals are normally outside the hospital episode.",
      },
    ],
    approachComparison: {
      heading: `Approaches related to ${profile.briefName}`,
      intro: [
        `${profile.technique} These are clinical options, not consumer upgrades.`,
        "The receiving team should explain why its proposed route fits the current imaging and what finding could change that route after arrival.",
      ],
      rows: profile.approaches.map((item) => ({
        name: item.label,
        relative: "Selected by diagnosis, bone quality and prior surgery",
        detail: item.detail,
      })),
    },
    overviewHeading: `What Is ${profile.briefName}?`,
    whoHeading: `When Is ${profile.briefName} Recommended?`,
    overview: {
      what: [profile.definition, profile.technique],
      who: [profile.indication, profile.nonCandidate],
      how: [
        profile.technique,
        `Options commonly discussed are ${approachSummary}. Incision, implants, grafts and associated work depend on the joint or bone being treated.`,
        `${profile.stayNote} Early recovery usually includes pain control, clot-prevention measures as advised, wound checks and physiotherapy appropriate to the procedure.`,
      ],
      variations: profile.approaches,
      preparation: [
        `${profile.evaluation} Send complete image files rather than screenshots.`,
        "The receiving team sets fasting and medicine instructions. Report fever, dental infection, calf swelling or a sudden increase in pain before travel; these may alter timing.",
      ],
      recovery: [
        `${profile.stayNote} ${profile.recovery}`,
        `The catalog stay of [STAY] is planning information, not a discharge promise.`,
        profile.distinctiveRisks,
        `${profile.followUp} International patients need a written handover and a local clinician after return.`,
      ],
    },
    fullPathway: {
      intro: [
        `A complete ${profile.shortName} budget includes more than [INDIA_COST]. Add remote review, tests that are not bundled, companion travel, lodging, local transport, outpatient physiotherapy and contingency for extra nights.`,
        "Travel should follow a written clinical plan and itemised estimate. A visa letter is not medical clearance.",
      ],
      stages: [
        {
          label: "Records and imaging review",
          detail: "Share recent X-rays or MRI, clinic notes, prior operative records and current medicines.",
        },
        {
          label: "Remote orthopaedic discussion",
          detail: "A named surgeon explains whether this procedure, another option or further tests are appropriate.",
        },
        {
          label: "Itemised planning estimate",
          detail: "Match the exact procedure to implant or graft, included nights, physiotherapy and exclusions.",
        },
        {
          label: "Arrival and reassessment",
          detail: "Allow time for examination, repeat imaging, blood tests and anaesthetic review.",
        },
        {
          label: "Operation and ward recovery",
          detail: `${profile.technique} ${profile.stayNote}`,
        },
        {
          label: "Physiotherapy, nearby review and handover",
          detail: `${profile.recovery} Travel only after the team reviews the wound and mobility.`,
        },
      ],
    },
    journey: [
      { label: "Send complete records", detail: "Provide imaging files, reports, medicines and all prior operative notes." },
      { label: "Confirm clinical acceptance", detail: "A named orthopaedic team reviews diagnosis, laterality, implant or graft needs and travel timing." },
      { label: "Compare itemised quotations", detail: "Use the same operative scope and implant class; do not compare a partial letter with a comprehensive episode." },
      { label: "Plan flexible travel", detail: "Arrange documents, refundable flights and lodging near the exact campus, with slack for physiotherapy." },
      { label: "Repeat assessment after arrival", detail: "Examination, indicated imaging and anaesthesia review precede final consent." },
      { label: "Surgery and monitored recovery", detail: "Care follows the agreed approach, with escalation according to the clinical course rather than package limits." },
      { label: "Start physiotherapy", detail: "Inpatient sessions usually begin as the team allows. Confirm what continues after discharge." },
      { label: "Discharge and remain nearby", detail: "Learn wound, medicine, weight-bearing and warning-sign instructions before leaving the hospital." },
      { label: "Complete local review", detail: "Remain nearby until the first review and a fitness-to-fly discussion." },
      { label: "Continue rehabilitation at home", detail: profile.followUp },
    ],
    documents: [
      ...profile.documents,
      "Recent X-rays and, where already performed, MRI or CT files rather than a one-line report",
      "Clinic notes describing pain, function, walking distance and previous operations",
      "Current medication list, allergies and relevant medical history",
      "Recent blood count, kidney function, coagulation and infection tests if already available",
      "Passport copies for the patient and accompanying companion",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values come from the stored GAF registry. Other rows are modelled from relative private-care levels and are not official tariffs.",
      "International comparisons fail when one letter prices a primary implant and another prices revision work, a different bearing or a longer physiotherapy stay. Obtain like-for-like written estimates.",
    ],
    destinationNote:
      "International costs vary by diagnosis, implant or graft, laterality, hospital, surgeon, physiotherapy and package terms. India and United States figures are GAF catalog ranges; other rows are modelled planning estimates, not hospital quotations.",
    cityIntro: [
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad inherit [INDIA_COST] until a verified city figure is stored. City chips open the existing Orthopedics filter URL for this procedure.",
      "Clinician and hospital cards resolve dynamically. This module names no provider and does not claim robotic inventory, case volume or outcomes.",
    ],
    whyIndia: [
      "Some international patients consider India for access to a named arthroplasty or sports team, modern private campuses and a self-pay planning band below typical United States figures. Cost alone is not a reason to travel.",
      "The useful questions are whether the proposed team treats this exact procedure, whether the implant or graft class is named, whether physiotherapy is planned, and whether the quotation is readable.",
      "No doctor or hospital is described as best. Established funded care near home may be more appropriate. An unstable infection or fracture may be unsafe for commercial travel.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended now, and what non-operative options were considered?`,
      "Who will operate, and at which exact campus?",
      "Which implant, bearing, graft or hardware class is assumed, and is that cost fixed?",
      "Are surgeon, anaesthesia, theatre, room and routine medicines included?",
      "How many hospital nights are included, and what is the extra-day rate?",
      "How many inpatient and outpatient physiotherapy sessions are included?",
      "Are pre-operative X-rays, MRI and blood tests included?",
      "What happens if the plan changes to revision, a second side or additional hardware?",
      "Are clot-prevention medicines and postoperative X-rays included?",
      "What is excluded from the written amount?",
      "When will fitness to fly be assessed?",
      ...profile.quoteItems,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: `${profile.briefName} is typically planned at [INDIA_COST]. This stored range is not a hospital quotation. Implant or graft choice, laterality, stay and physiotherapy change the final amount.`,
      },
      {
        q: `What is ${profile.shortName}?`,
        a: profile.definition,
      },
      {
        q: `When is ${profile.shortName} considered?`,
        a: profile.indication,
      },
      {
        q: "Does every patient with this diagnosis need the same operation?",
        a: `${profile.nonCandidate} Timing and approach require individual orthopaedic review.`,
      },
      {
        q: "What tests are needed before treatment?",
        a: profile.evaluation,
      },
      {
        q: "How much do implants or grafts affect the price?",
        a: profile.implantNote,
      },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `${profile.duration} Associated work and the patient's condition can extend this. The hospital must confirm its own estimate.`,
      },
      {
        q: "How long is the hospital stay?",
        a: `${profile.stayNote} The catalog planning stay is [STAY]. Use the named hospital's written plan.`,
      },
      {
        q: "How long might recovery take?",
        a: `${profile.recovery} Activity and flight dates remain individualized.`,
      },
      {
        q: "Are physiotherapy charges included?",
        a: "Only if the quotation says so. Ask how many inpatient sessions, walking aids and later outpatient visits are bundled.",
      },
      {
        q: "Which Indian cities are listed for this procedure?",
        a: "City pages exist for Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Doctor cards appear only where the catalog currently tags this exact procedure.",
      },
      {
        q: "How should an international patient choose a surgeon?",
        a: "Choose a clinician whose listed procedures include this operation, who reviews the images, and whose campus and implant plan are written. Directory placement is not a ranking.",
      },
      {
        q: "Can a remote consultation be arranged?",
        a: "Yes, where the listed team offers it. Send imaging files and prior records. Final suitability can still depend on examination in India.",
      },
      {
        q: "What happens if the final cost exceeds the estimate?",
        a: "Ask for an updated itemised statement showing the clinical reason: different implant, extra imaging, longer stay or additional work. The initial range is not a capped package.",
      },
    ],
    doctorHeading: `Doctors to consider for ${profile.shortName} in India`,
    cityDoctorHeading: `${profile.briefName} Doctors in [CITY]`,
    doctorIntro: `Profiles are pulled only when ${profile.procedure} appears in the clinician's current procedure list. Verify role, implant or sports focus, availability and campus. Placement is not a ranking.`,
    hospitalHeading: `Hospitals for ${profile.shortName} in India`,
    cityHospitalHeading: `Hospitals for ${profile.briefName} in [CITY]`,
    hospitalIntro:
      "Hospital cards follow live doctor-to-campus relationships. Accreditation or a general Orthopedics label does not prove current implant inventory, robotic systems, rehabilitation facilities or outcomes.",
    relatedProcedures: profile.related,
    relatedBlogs: [
      { href: "/costs/India/Orthopedics", label: "Orthopedics treatment costs in India" },
      {
        href: `/doctors/India/Orthopedics/${profile.procedure.replace(/[()]/g, "").replace(/\s+/g, "-")}`,
        label: `${profile.briefName} doctors in India`,
      },
      {
        href: `/hospitals/India/Orthopedics/${profile.procedure.replace(/[()]/g, "").replace(/\s+/g, "-")}`,
        label: `hospitals for ${profile.shortName} in India`,
      },
    ],
    figures: [
      {
        after: "overview",
        src: profile.figure,
        alt: profile.figureAlt,
        caption: "A simplified educational illustration, not the anatomy of a specific patient.",
        fit: "contain",
      },
      {
        after: "how",
        src: "/costs/orthopedic-treatment-pathway.webp",
        alt: `Illustration of imaging, surgery, physiotherapy and follow-up for ${profile.shortName}`,
        caption: "The care pathway begins with imaging and a named team; rehabilitation length depends on the case.",
        fit: "contain",
      },
      {
        after: "journey",
        src: "/costs/orthopedic-international-journey.webp",
        alt: `Illustration of records review, travel to India and rehabilitation after ${profile.shortName}`,
        caption: "Records review comes before travel. Visa approval and fitness to fly are never guaranteed by a cost estimate.",
        fit: "contain",
      },
    ],
  };
}

const profiles: OrthoProfile[] = [
  {
    procedure: "Total Knee Replacement",
    shortName: "total knee replacement",
    briefName: "Total Knee Replacement",
    slug: "total-knee-replacement",
    figure: "/costs/total-knee-replacement-illustration.webp",
    figureAlt: "Illustration showing a worn knee joint and the placement of total knee replacement components",
    definition:
      "Total knee replacement resurfaces the worn ends of the thigh bone, shin bone and usually the kneecap with metal and plastic implants when arthritis or other damage has destroyed the joint surface.",
    indication:
      "It may be considered when pain, stiffness or deformity from osteoarthritis, inflammatory arthritis or selected osteonecrosis persist after medicines, injections, weight management and physiotherapy, and imaging shows advanced joint damage.",
    nonCandidate:
      "Infection, untreated medical instability, or a knee that can still be managed without replacing all compartments may lead to delay, a partial replacement discussion or another plan.",
    evaluation:
      "Standing X-rays are central. MRI is not routine for established bone-on-bone arthritis but may be used when another diagnosis is possible. Blood tests, medical clearance and dental review are common before elective arthroplasty.",
    approaches: [
      { label: "Cemented total knee replacement", detail: "The most common fixation method in many older patients; the quotation should name the implant class." },
      { label: "Cementless or hybrid fixation", detail: "May be discussed when bone quality is judged suitable. It is not automatically better or cheaper." },
      { label: "Conventional versus computer- or robot-assisted planning", detail: "Assistance tools change imaging and theatre resources. Robotic knee replacement has its own GAF sheet when that is the priced product." },
    ],
    technique:
      "Under anaesthesia the damaged cartilage is removed and sized components are fixed to the femur, tibia and often the patella. Alignment, ligament balance and wound closure follow the team's method.",
    duration: "often 1–2 hours for an uncomplicated primary knee; deformity or extra work can extend this",
    stayNote: "An uncomplicated primary stay is often a few nights; the catalog planning stay is [STAY].",
    recovery:
      "Walking usually starts with a frame or crutches in hospital. Independent walking and return to desk work take weeks; heavier activity is staged. The treating team sets stairs, kneeling and flight advice.",
    implantNote:
      "Implant brand, constraint, bearing and whether one or both knees are replaced can move the bill as much as the surgeon fee. The letter must name the assumed implant class.",
    distinctiveRisks:
      "Discussion may include infection, clot, stiffness, nerve irritation, implant wear or loosening, and the possible need for later revision—without generic success percentages.",
    drivers: [
      { label: "Implant class and constraint", detail: "A standard primary implant is not priced like a constrained or revision-style component." },
      { label: "Unilateral versus bilateral surgery", detail: "Two knees in one admission change theatre time, blood loss, stay and rehabilitation." },
      { label: "Deformity and bone quality", detail: "Severe bowing, bone loss or osteoporosis can require extra components or a longer operation." },
      { label: "Primary versus unexpected revision work", detail: "Hidden bone loss or a change of plan is not a standard TKR package." },
      { label: "Physiotherapy and stay", detail: "Extra nights or outpatient sessions after the allowance usually add charges." },
    ],
    quoteItems: ["Is the quoted implant cemented or cementless, and which constraint class?", "If both knees may need replacement, are they priced separately?"],
    documents: ["Standing knee X-rays in two planes", "Record of injections, physiotherapy and walking aids already tried"],
    followUp: "Follow-up usually includes wound review, X-rays, clot-prevention advice and a staged physiotherapy programme. Lifelong implant surveillance is individualised.",
    related: ["Robotic Knee Replacement", "Partial Knee Replacement", "Revision Knee Replacement", "Total Hip Replacement"],
  },
  {
    procedure: "Robotic Knee Replacement",
    shortName: "robotic knee replacement",
    briefName: "Robotic Knee Replacement",
    slug: "robotic-knee-replacement",
    figure: "/costs/robotic-knee-replacement-illustration.webp",
    figureAlt: "Illustration of CT-based planning and robotic-arm guidance beside a knee implant",
    definition:
      "Robotic knee replacement is a total or partial knee arthroplasty in which a planning system and robotic arm help the surgeon execute bone cuts and implant position according to a preoperative plan.",
    indication:
      "It may be discussed when a patient already meets criteria for knee replacement and the treating team uses a robotic workflow. The robot does not create an indication that conventional arthroplasty would not have.",
    nonCandidate:
      "If imaging does not support replacement, or the campus cannot run the planned system for that implant, conventional TKR or non-operative care may be more appropriate.",
    evaluation:
      "Many robotic workflows add a planning CT. Standing X-rays, medical clearance and the same infection screen as conventional arthroplasty still apply.",
    approaches: [
      { label: "Robot-assisted total knee replacement", detail: "Uses the robotic plan for a three-compartment replacement." },
      { label: "Robot-assisted partial knee replacement", detail: "May be used when only one compartment is being resurfaced." },
      { label: "Conventional knee replacement", detail: "Remains the neighbouring GAF sheet when a robot is not part of the priced pathway." },
    ],
    technique:
      "After planning scans, the surgeon registers the knee, the system constrains cuts to the plan, and the implant is seated. The surgeon remains responsible for balancing and decisions.",
    duration: "often 1.5–2.5 hours including registration; planning CT sits outside theatre time",
    stayNote: "Stay is usually similar to conventional knee replacement; the catalog planning stay is [STAY].",
    recovery:
      "Early walking and physiotherapy resemble other knee replacements. The robot does not guarantee a shorter recovery or a specific flight date.",
    implantNote:
      "Robotic time, planning CT and a compatible implant can sit above a conventional TKR letter. Confirm whether the system fee and CT are included.",
    distinctiveRisks:
      "Risks remain those of knee replacement—infection, clot, stiffness, fracture or the need to abandon the robot if registration fails—plus radiation from planning CT where used.",
    drivers: [
      { label: "Planning CT and system fee", detail: "These lines are often separate from a conventional TKR package." },
      { label: "Compatible implant", detail: "The robot is typically tied to a specific implant family." },
      { label: "Total versus partial plan", detail: "The priced product must match the compartment being replaced." },
      { label: "Conversion to conventional technique", detail: "Ask how the bill changes if the robot is not used." },
      { label: "Physiotherapy and stay", detail: "Assistance technology does not automatically shorten included nights." },
    ],
    quoteItems: ["Is the planning CT included?", "Which robotic system and compatible implant are assumed?"],
    documents: ["Standing knee X-rays", "Any planning CT already performed"],
    followUp: "Surveillance matches other knee replacements: wound care, X-rays and physiotherapy. The robot does not remove the need for later review.",
    related: ["Total Knee Replacement", "Partial Knee Replacement", "Revision Knee Replacement", "Total Hip Replacement"],
  },
  {
    procedure: "Partial Knee Replacement",
    shortName: "partial knee replacement",
    briefName: "Partial Knee Replacement",
    slug: "partial-knee-replacement",
    figure: "/costs/partial-knee-replacement-illustration.webp",
    figureAlt: "Illustration highlighting one worn knee compartment and a unicompartmental implant",
    definition:
      "Partial knee replacement resurfaces only the damaged compartment of the knee—usually the inner side—while leaving healthy cartilage and ligaments in the other compartments.",
    indication:
      "It may be considered when arthritis is limited to one compartment, ligaments are competent, and alignment can be restored without replacing the whole joint.",
    nonCandidate:
      "Inflammatory arthritis in multiple compartments, significant ligament failure, or arthritis that has already crossed the whole joint usually points toward total knee replacement instead.",
    evaluation:
      "Standing X-rays of both knees and a careful ligament examination are essential. MRI may help when X-rays understate cartilage loss in another compartment.",
    approaches: [
      { label: "Medial unicompartmental replacement", detail: "The most common partial replacement when inner-compartment arthritis is isolated." },
      { label: "Lateral or patellofemoral replacement", detail: "Less common patterns that still require the rest of the joint to be suitable." },
      { label: "Conversion to total knee replacement", detail: "May be required if unexpected wear is found; the quotation should say how that change is billed." },
    ],
    technique:
      "Through a smaller exposure than many total knees, the worn compartment is prepared and a unicompartmental implant is fixed. The remaining cartilage is left in place.",
    duration: "often 1–1.5 hours when anatomy is straightforward",
    stayNote: "Stay is often shorter than a total knee; the catalog planning stay is [STAY].",
    recovery:
      "Many patients mobilise quickly, but swelling and quadriceps recovery still take weeks. The team sets kneeling, twisting and flight advice.",
    implantNote:
      "A partial implant is a different product from a total knee. Confirm brand, compartment and what happens if the operation converts to TKR.",
    distinctiveRisks:
      "Discussion includes the possibility that arthritis progresses in the remaining compartments, loosening, and conversion to a total knee later.",
    drivers: [
      { label: "Which compartment is replaced", detail: "Medial, lateral and patellofemoral implants are not interchangeable products." },
      { label: "Conversion risk", detail: "An intra-operative change to TKR uses different implants and theatre time." },
      { label: "Ligament and alignment status", detail: "Extra balancing or staging can extend the episode." },
      { label: "Imaging beyond standing X-rays", detail: "MRI to clear other compartments may be a separate charge." },
      { label: "Later physiotherapy", detail: "Shorter stay does not always mean fewer outpatient sessions." },
    ],
    quoteItems: ["Which compartment and implant are priced?", "How is conversion to total knee replacement billed?"],
    documents: ["Standing X-rays of both knees", "MRI if already obtained to assess other compartments"],
    followUp: "Review watches the replaced compartment and the remaining joint. New pain in another part of the knee needs assessment rather than assuming implant failure.",
    related: ["Total Knee Replacement", "Robotic Knee Replacement", "Meniscus Repair", "Arthroscopic Surgery"],
  },
  {
    procedure: "Revision Knee Replacement",
    shortName: "revision knee replacement",
    briefName: "Revision Knee Replacement",
    slug: "revision-knee-replacement",
    figure: "/costs/revision-knee-replacement-illustration.webp",
    figureAlt: "Illustration of a previous knee implant being exchanged for revision components",
    definition:
      "Revision knee replacement removes some or all of a previous knee implant and reconstructs the joint with revision components when the first replacement has loosened, worn, become unstable or become infected.",
    indication:
      "It may be considered for loosening, instability, osteolysis, fracture around the implant, stiffness that fails other treatment, or infection after a staged work-up.",
    nonCandidate:
      "A painful knee with a well-fixed implant and no clear mechanical or infectious cause may need further investigation rather than immediate revision. Active untreated medical problems can delay surgery.",
    evaluation:
      "Serial X-rays, inflammatory blood tests, joint aspiration when infection is possible, and CT for bone loss are common. Prior operative notes and implant stickers are essential.",
    approaches: [
      { label: "Single-stage revision", detail: "May be discussed when infection is excluded or selected infection protocols allow it." },
      { label: "Two-stage revision for infection", detail: "Uses a spacer, antibiotics and a later reconstructive stage—two hospital episodes, not one package." },
      { label: "Partial component exchange", detail: "Only when a clearly isolated problem can be corrected without removing the whole implant." },
    ],
    technique:
      "The surgeon exposes the old implant, removes loose or infected material, reconstructs bone loss with augments, sleeves, cones or stems, and seats revision components.",
    duration: "often 2–4 hours or longer when bone loss or infection work is extensive",
    stayNote: "Stay is usually longer than a primary TKR; the catalog planning stay is [STAY].",
    recovery:
      "Weight-bearing and motion restrictions depend on bone reconstruction. Rehabilitation is slower than a first replacement. Travel should wait for wound and medical clearance.",
    implantNote:
      "Revision stems, cones, constrained inserts and spacers can dominate the bill. A primary TKR letter is not a valid comparison.",
    distinctiveRisks:
      "Risks include recurrent infection, further bone loss, stiffness, neurovascular injury and the possibility that reconstruction cannot restore a durable joint.",
    drivers: [
      { label: "Infection versus aseptic loosening", detail: "Two-stage infection care is a different resource pathway." },
      { label: "Bone-loss reconstruction", detail: "Augments, cones, sleeves and allograft add implant cost and theatre time." },
      { label: "Constraint and stems", detail: "Revision implants are priced differently from primary condylar knees." },
      { label: "Need for specialist investigations", detail: "Aspiration, nuclear medicine or CT can sit outside the first estimate." },
      { label: "Longer stay and rehabilitation", detail: "Extended physiotherapy and monitoring are common." },
    ],
    quoteItems: ["Is this priced as single-stage or two-stage surgery?", "Which revision implant, stems and cones are assumed?"],
    documents: ["Prior implant stickers and operative notes", "Serial X-rays and any aspiration results"],
    followUp: "Closer surveillance is usual after revision, especially when infection was treated. Long-term implant and infection follow-up remain individualised.",
    related: ["Total Knee Replacement", "Robotic Knee Replacement", "Revision Hip Replacement", "Non-Union Repair"],
  },
  {
    procedure: "Total Hip Replacement",
    shortName: "total hip replacement",
    briefName: "Total Hip Replacement",
    slug: "total-hip-replacement",
    figure: "/costs/total-hip-replacement-illustration.webp",
    figureAlt: "Illustration of a worn hip socket and a total hip replacement stem and cup",
    definition:
      "Total hip replacement replaces the damaged ball and socket of the hip with a stem, head and cup so that painful bone-on-bone contact is no longer the bearing surface.",
    indication:
      "It may be considered for advanced osteoarthritis, selected avascular necrosis, inflammatory arthritis or certain fractures when pain and function no longer respond to non-operative care.",
    nonCandidate:
      "Active infection, untreated medical risk, or a hip that may still be served by injection, osteotomy or resurfacing in a carefully selected patient can change the plan.",
    evaluation:
      "Pelvis and hip X-rays are essential. MRI or CT may be used for avascular necrosis or unusual anatomy. Medical and anaesthetic clearance follow the same elective-arthroplasty pattern.",
    approaches: [
      { label: "Posterior or lateral approach", detail: "Common exposures; each has different immediate precautions." },
      { label: "Anterior approach", detail: "Used in selected campuses; it is not automatically less expensive or universally better." },
      { label: "Cemented, cementless or hybrid implants", detail: "Fixation choice follows age, bone quality and surgeon preference and should be named on the quote." },
    ],
    technique:
      "The femoral head is removed, the socket is prepared for a cup, a stem is seated in the femur, and a head articulates with the liner. Soft-tissue repair and precautions complete the case.",
    duration: "often 1–2 hours for an uncomplicated primary hip",
    stayNote: "An uncomplicated primary stay is often a few nights; the catalog planning stay is [STAY].",
    recovery:
      "Walking with aids usually starts in hospital. Hip precautions, if used, are team-specific. Driving, work and flights depend on laterality, aid use and wound healing.",
    implantNote:
      "Bearing (metal, ceramic, polyethylene), stem design and whether the hip is primary or complex can change the amount as much as the city.",
    distinctiveRisks:
      "Discussion may include dislocation, leg-length difference, clot, infection, fracture and later wear—without promising a particular activity level.",
    drivers: [
      { label: "Bearing and stem choice", detail: "Ceramic or specialised stems are not always inside a standard package." },
      { label: "Approach and theatre time", detail: "Complex anatomy or prior metalwork increases resources." },
      { label: "Avascular necrosis or dysplasia", detail: "May need extra imaging or specialised cups." },
      { label: "Laterality", detail: "Staged or simultaneous two-hip care is a different episode." },
      { label: "Physiotherapy and precautions teaching", detail: "Confirm how many sessions and walking aids are included." },
    ],
    quoteItems: ["Which bearing and fixation method are assumed?", "Are hip precautions and walking aids included?"],
    documents: ["Pelvis and lateral hip X-rays", "MRI if avascular necrosis has already been investigated"],
    followUp: "Wound review, X-rays and a walking programme are usual. Dental and infection precautions after arthroplasty should come from the treating team.",
    related: ["Hip Resurfacing", "Revision Hip Replacement", "Total Knee Replacement", "Fracture Fixation"],
  },
  {
    procedure: "Revision Hip Replacement",
    shortName: "revision hip replacement",
    briefName: "Revision Hip Replacement",
    slug: "revision-hip-replacement",
    figure: "/costs/revision-hip-replacement-illustration.webp",
    figureAlt: "Illustration of a previous hip implant being exchanged for revision components",
    definition:
      "Revision hip replacement removes and replaces some or all of a previous hip implant when loosening, wear, instability, fracture or infection has made the first reconstruction unreliable.",
    indication:
      "It may be considered after imaging and infection work-up show a mechanical or infectious reason that cannot be managed by observation or limited intervention.",
    nonCandidate:
      "Unexplained pain without loosening or infection, or a patient unfit for a long reconstructive operation, may need further tests or non-operative support first.",
    evaluation:
      "Serial X-rays, CT for bone loss, inflammatory markers and aspiration when infection is possible are typical. Prior implant records are required to plan extraction tools.",
    approaches: [
      { label: "Acetabular revision", detail: "Cup, liner or both are exchanged when the socket is the problem." },
      { label: "Femoral revision", detail: "Stem removal and a longer or modular stem may be required." },
      { label: "Two-stage revision for infection", detail: "Spacer and later reconstruction are separate admissions." },
    ],
    technique:
      "The surgeon exposes the hip, extracts loose or infected components, reconstructs bone, and implants revision cups, cages or stems as planned.",
    duration: "often 2–5 hours depending on extraction difficulty and bone loss",
    stayNote: "Stay is usually longer than primary hip replacement; the catalog planning stay is [STAY].",
    recovery:
      "Weight-bearing may be protected. Rehabilitation is slower, and dislocation precautions may be stricter. Fitness to fly needs an individual review.",
    implantNote:
      "Revision cups, cages, modular stems and dual-mobility bearings can dominate cost. Do not compare this letter with a primary THR package.",
    distinctiveRisks:
      "Risks include fracture during extraction, dislocation, nerve injury, recurrent infection and the possibility of further revision.",
    drivers: [
      { label: "Which components are revised", detail: "Cup-only work is not the same as a full stem-and-cup reconstruction." },
      { label: "Infection protocol", detail: "Two-stage care doubles theatre and implant events." },
      { label: "Bone-loss implants", detail: "Cages, augments and modular stems add material cost." },
      { label: "Extraction difficulty", detail: "Well-fixed cementless stems can extend theatre time substantially." },
      { label: "Protected weight-bearing support", detail: "Longer stay, frames and later physiotherapy add trip cost." },
    ],
    quoteItems: ["Which components will be removed and replaced?", "Is dual-mobility or a cage included in the implant line?"],
    documents: ["Prior hip implant records", "Serial X-rays and any CT or aspiration results"],
    followUp: "Closer radiographic and infection surveillance is common. The home clinician needs the implant record and weight-bearing rules.",
    related: ["Total Hip Replacement", "Hip Resurfacing", "Revision Knee Replacement", "Non-Union Repair"],
  },
  {
    procedure: "Hip Resurfacing",
    shortName: "hip resurfacing",
    briefName: "Hip Resurfacing",
    slug: "hip-resurfacing",
    figure: "/costs/hip-resurfacing-illustration.webp",
    figureAlt: "Illustration comparing a hip resurfacing cap with a conventional hip replacement stem",
    definition:
      "Hip resurfacing shapes the femoral head and covers it with a metal cap while placing a cup in the socket, preserving more femoral bone than a conventional stemmed hip replacement.",
    indication:
      "It may be considered for selected younger patients with good bone quality and osteoarthritis who, after counselling about metal bearings, are judged suitable by a surgeon who performs the procedure.",
    nonCandidate:
      "Poor bone quality, certain shapes of deformity, metal sensitivity, kidney disease or an anatomy better served by a stemmed total hip usually exclude resurfacing.",
    evaluation:
      "X-rays assess head shape and bone stock. Metal-ion counselling, kidney function and a discussion of activity goals belong in the consent, not on a cost page.",
    approaches: [
      { label: "Metal-on-metal resurfacing", detail: "The usual bearing; follow-up may include metal-ion blood tests." },
      { label: "Conversion to total hip replacement", detail: "May be required if bone is unsuitable; the quote should explain that change." },
      { label: "Conventional total hip replacement", detail: "The neighbouring sheet when resurfacing is not the honest implant." },
    ],
    technique:
      "The femoral head is reshaped, a cap is cemented or impacted, and a socket cup is placed. Component position is critical to reduce edge-loading.",
    duration: "often 1.5–2.5 hours in selected anatomy",
    stayNote: "Stay is often similar to primary hip replacement; the catalog planning stay is [STAY].",
    recovery:
      "Early walking resembles other hip reconstructions. High-impact advice and metal-bearing follow-up are individualised.",
    implantNote:
      "Resurfacing implants and possible later ion tests are a different product from a standard THR. Confirm the implant and monitoring plan.",
    distinctiveRisks:
      "Discussion includes femoral-neck fracture, metal-bearing reactions, and the chance of later conversion to a stemmed hip.",
    drivers: [
      { label: "Suitability after bone-stock review", detail: "Unsuitable anatomy should not be forced into a resurfacing package." },
      { label: "Implant and monitoring", detail: "Ion tests and specialised follow-up may be extra." },
      { label: "Conversion to THR", detail: "A different implant set and theatre time." },
      { label: "Surgeon familiarity with resurfacing", detail: "Not every arthroplasty list offers this implant." },
      { label: "Activity counselling time", detail: "Does not change the implant line but should be on the clinical plan." },
    ],
    quoteItems: ["Is metal-ion follow-up included?", "How is conversion to a stemmed hip billed if bone is unsuitable?"],
    documents: ["Pelvis and hip X-rays showing head shape", "Kidney-function results if already available"],
    followUp: "Follow-up may include X-rays and, where the team uses them, metal-ion blood tests. Report new groin pain or noises rather than ignoring them.",
    related: ["Total Hip Replacement", "Revision Hip Replacement", "Total Knee Replacement", "Shoulder Replacement"],
  },
  {
    procedure: "Shoulder Replacement",
    shortName: "shoulder replacement",
    briefName: "Shoulder Replacement",
    slug: "shoulder-replacement",
    figure: "/costs/shoulder-replacement-illustration.webp",
    figureAlt: "Illustration of a worn shoulder joint and conceptual replacement components",
    definition:
      "Shoulder replacement substitutes the damaged ball, and often the socket, with an anatomic or reverse prosthesis when arthritis or certain irreparable cuff problems destroy comfortable motion.",
    indication:
      "It may be considered for osteoarthritis, cuff-tear arthropathy, selected fractures or failed prior surgery when pain and function no longer respond to physiotherapy and injections.",
    nonCandidate:
      "Active infection, insufficient bone for the planned implant, or a problem that can still be treated with cuff repair or arthroscopy may change the operation.",
    evaluation:
      "X-rays and often CT for glenoid bone, plus MRI when the cuff status is uncertain, guide anatomic versus reverse planning.",
    approaches: [
      { label: "Anatomic total shoulder replacement", detail: "Used when the rotator cuff is functional and the glenoid can support a standard socket." },
      { label: "Reverse shoulder replacement", detail: "Often discussed when the cuff is not reconstructible or in selected fractures." },
      { label: "Hemiarthroplasty", detail: "Replaces the ball only in selected trauma or bone-stock situations." },
    ],
    technique:
      "Through a deltopectoral or similar approach the surgeon prepares the humerus and glenoid for the chosen implant and repairs soft tissue as planned.",
    duration: "often 1.5–3 hours depending on implant type and bone loss",
    stayNote: "Stay is often a few nights; the catalog planning stay is [STAY].",
    recovery:
      "The arm is usually supported in a sling. Physiotherapy is staged to protect subscapularis or deltoid function. Reaching, driving and flights are individualised.",
    implantNote:
      "Reverse versus anatomic implants, glenoid bone grafts and fracture stems change cost. The letter must name the planned prosthesis type.",
    distinctiveRisks:
      "Discussion includes dislocation or instability of a reverse implant, fracture, infection, nerve injury and limited overhead motion.",
    drivers: [
      { label: "Anatomic versus reverse prosthesis", detail: "These are different implant families and rehabilitation plans." },
      { label: "Glenoid bone loss", detail: "Augments or grafts add theatre and material cost." },
      { label: "Prior cuff or fracture surgery", detail: "Scar and hardware removal extend the episode." },
      { label: "CT planning", detail: "May be billed separately from the operation." },
      { label: "Sling and physiotherapy protocol", detail: "Confirm how many supervised sessions are included." },
    ],
    quoteItems: ["Is the plan anatomic or reverse, and which implant family?", "Is CT planning included?"],
    documents: ["Shoulder X-rays", "MRI or CT already performed for cuff or glenoid bone"],
    followUp: "Sling time, wound review and a staged deltoid or cuff programme are usual. Overhead strength recovery is gradual and not promised on a calendar.",
    related: ["Rotator Cuff Repair", "Arthroscopic Surgery", "Total Knee Replacement", "Fracture Fixation"],
  },
  {
    procedure: "ACL Reconstruction (Anterior Cruciate Ligament)",
    shortName: "ACL reconstruction",
    briefName: "ACL Reconstruction",
    slug: "acl-reconstruction-anterior-cruciate-ligament",
    figure: "/costs/acl-reconstruction-illustration.webp",
    figureAlt: "Illustration of a torn anterior cruciate ligament and a reconstructed graft",
    definition:
      "ACL reconstruction replaces a torn anterior cruciate ligament with a tendon graft so the shin bone is better controlled during pivoting, after the original ligament cannot be relied upon.",
    indication:
      "It may be considered for symptomatic instability, a wish to return to pivoting sport, or combined meniscus injury after shared decision-making. Not every ACL tear is reconstructed.",
    nonCandidate:
      "A low-demand patient who is stable after rehabilitation, or a knee that first needs infection or stiffness treatment, may not proceed to reconstruction.",
    evaluation:
      "Clinical tests and MRI confirm the tear and look for meniscus or cartilage injury. X-rays assess alignment and open growth plates in younger patients.",
    approaches: [
      { label: "Hamstring autograft", detail: "A common graft; donor-site symptoms should be discussed." },
      { label: "Patellar-tendon or quadriceps autograft", detail: "Different donor-site and rehabilitation implications." },
      { label: "Allograft", detail: "Avoids a donor site but has different cost, availability and counselling points." },
    ],
    technique:
      "Through arthroscopic portals the surgeon removes the remnant as needed, drills tunnels, and fixes a graft in the femur and tibia. Meniscus work may be added.",
    duration: "often 1–2 hours; meniscus or extra-articular work can extend this",
    stayNote: "Many patients stay overnight or go home the same day; the catalog planning stay is [STAY].",
    recovery:
      "Crutches and a brace are used as advised. Return to pivoting sport is measured in months, not days, and depends on strength testing rather than a fixed date.",
    implantNote:
      "Graft choice, fixation buttons or screws, and added meniscus repair can change the estimate. Ask whether the graft and implants are included.",
    distinctiveRisks:
      "Discussion includes graft failure, stiffness, infection, numbness near the harvest site and the chance that a meniscus repair changes the rehabilitation timeline.",
    drivers: [
      { label: "Graft type", detail: "Autograft versus allograft and harvest method change consumables and time." },
      { label: "Associated meniscus or cartilage work", detail: "Repair is a different product from isolated ACL reconstruction." },
      { label: "Revision ACL", detail: "Tunnel bone grafting or staged reconstruction is not a primary package." },
      { label: "Brace and physiotherapy protocol", detail: "Months of rehab dominate the trip more than the theatre hour." },
      { label: "Open growth plates", detail: "Paediatric techniques and later review differ from adult tunnels." },
    ],
    quoteItems: ["Which graft and fixation devices are included?", "Is meniscus repair priced if MRI shows a tear?"],
    documents: ["Knee MRI", "Clinic note describing giving-way episodes and sport goals"],
    followUp: "Physiotherapy is the treatment after the graft is in. Strength, swelling and graft-protection rules guide running and sport, not a brochure week count.",
    related: ["PCL Reconstruction (Posterior Cruciate Ligament)", "Meniscus Repair", "Arthroscopic Surgery", "Fracture Fixation"],
  },
  {
    procedure: "PCL Reconstruction (Posterior Cruciate Ligament)",
    shortName: "PCL reconstruction",
    briefName: "PCL Reconstruction",
    slug: "pcl-reconstruction-posterior-cruciate-ligament",
    figure: "/costs/pcl-reconstruction-illustration.webp",
    figureAlt: "Illustration of a posterior cruciate ligament injury and conceptual reconstruction",
    definition:
      "PCL reconstruction replaces a torn or insufficient posterior cruciate ligament with a graft so the shin bone is less able to sag backwards on the thigh bone.",
    indication:
      "It may be considered for symptomatic posterior instability, combined ligament injury, or selected isolated tears that fail bracing and physiotherapy. Many isolated PCL injuries are treated without reconstruction.",
    nonCandidate:
      "A stable, well-rehabilitated isolated tear, or a knee that first needs alignment or meniscus staging, may not proceed to surgery.",
    evaluation:
      "Posterior drawer testing, stress X-rays in some protocols and MRI define grade and associated posterolateral or ACL injury.",
    approaches: [
      { label: "Single-bundle reconstruction", detail: "A common arthroscopic reconstruction when the indication is isolated." },
      { label: "Double-bundle or combined-ligament reconstruction", detail: "Used when more than the PCL must be restored." },
      { label: "Bracing and rehabilitation without reconstruction", detail: "Still the first pathway for many isolated injuries." },
    ],
    technique:
      "Arthroscopic tunnels are placed for a graft that resists posterior sag. Combined corner or ACL work, if planned, lengthens the operation.",
    duration: "often 1.5–3 hours; combined ligaments take longer",
    stayNote: "Stay is often 1–3 nights; the catalog planning stay is [STAY].",
    recovery:
      "A PCL-specific brace and prone exercises are common. Return to sport is slow. Early kneeling or hamstring loading may be restricted.",
    implantNote:
      "Graft, PCL brace and possible combined-ligament implants should be named. An ACL letter is not a valid comparison.",
    distinctiveRisks:
      "Residual sag, stiffness, graft stretching and the need to treat an associated corner injury later should be discussed.",
    drivers: [
      { label: "Isolated versus multi-ligament injury", detail: "Corner or ACL work is a different episode." },
      { label: "Brace protocol", detail: "A specialised PCL brace may be an extra line." },
      { label: "Graft choice", detail: "Allograft availability and cost differ from autograft." },
      { label: "Stress imaging", detail: "May be billed separately." },
      { label: "Longer physiotherapy", detail: "PCL rehab is not a short ACL copy." },
    ],
    quoteItems: ["Is a PCL brace included?", "Is this priced as isolated PCL or a multi-ligament reconstruction?"],
    documents: ["Knee MRI", "Any stress X-rays already performed"],
    followUp: "Brace time and strength milestones are longer than many ACL pathways. The home physiotherapist needs the written protocol.",
    related: ["ACL Reconstruction (Anterior Cruciate Ligament)", "Meniscus Repair", "Arthroscopic Surgery", "Fracture Fixation"],
  },
  {
    procedure: "Meniscus Repair",
    shortName: "meniscus repair",
    briefName: "Meniscus Repair",
    slug: "meniscus-repair",
    figure: "/costs/meniscus-repair-illustration.webp",
    figureAlt: "Illustration of a torn knee meniscus and conceptual suture repair",
    definition:
      "Meniscus repair stitches a torn shock-absorbing cartilage back to a position where it may heal, rather than simply removing the torn piece.",
    indication:
      "It may be considered for tears in vascular zones, especially in younger or athletic patients, or when an ACL is being reconstructed and the meniscus can be saved.",
    nonCandidate:
      "Degenerative inner-edge tears with poor healing potential are often treated with partial meniscectomy or non-operative care instead of repair.",
    evaluation:
      "MRI describes tear pattern, zone and associated ligament injury. Examination looks for locking, swelling and alignment.",
    approaches: [
      { label: "Arthroscopic suture repair", detail: "All-inside, inside-out or outside-in stitches depending on the tear." },
      { label: "Partial meniscectomy", detail: "Removal of unstable tissue when repair is not realistic; this sits closer to the generic arthroscopy sheet." },
      { label: "Meniscus root or ramp repair", detail: "Technically different repairs that change implants and rehabilitation." },
    ],
    technique:
      "Through arthroscopy the surgeon inspects the tear, prepares the rim and places sutures or anchors. Weight-bearing rules depend on the repair type.",
    duration: "often 45–90 minutes; root repairs and combined ACL work take longer",
    stayNote: "Many repairs are day-care or one night; the catalog planning stay is [STAY].",
    recovery:
      "Protected weight-bearing and limited deep flexion are common for weeks. Healing, not comfort alone, sets running and squat timelines.",
    implantNote:
      "Suture devices and anchors should be named. A meniscectomy-only letter is cheaper for a reason: it is a different operation.",
    distinctiveRisks:
      "The repair may not heal, stiffness can occur, and a later meniscectomy may still be needed.",
    drivers: [
      { label: "Repair versus meniscectomy", detail: "Implants and rehab restrictions differ sharply." },
      { label: "Tear pattern", detail: "Root and ramp repairs use more devices and time." },
      { label: "Combined ACL reconstruction", detail: "Should be priced as combined work, not two vague packages." },
      { label: "Brace and non-weight-bearing period", detail: "Aids and extra hotel nights add trip cost." },
      { label: "MRI quality", detail: "A repeat scan before travel may be extra." },
    ],
    quoteItems: ["Is this priced as repair or meniscectomy?", "How many suture devices are assumed?"],
    documents: ["Knee MRI describing tear zone and pattern", "Note of locking or combined ligament injury"],
    followUp: "Protection of the repair is the priority. Premature deep squats or running can undo the stitches even if the knee feels comfortable.",
    related: ["ACL Reconstruction (Anterior Cruciate Ligament)", "Arthroscopic Surgery", "PCL Reconstruction (Posterior Cruciate Ligament)", "Total Knee Replacement"],
  },
  {
    procedure: "Rotator Cuff Repair",
    shortName: "rotator cuff repair",
    briefName: "Rotator Cuff Repair",
    slug: "rotator-cuff-repair",
    figure: "/costs/rotator-cuff-repair-illustration.webp",
    figureAlt: "Illustration of a torn rotator cuff tendon and conceptual repair",
    definition:
      "Rotator cuff repair reattaches torn tendons of the shoulder to bone so that lifting the arm can be powered by those tendons again, when the tissue is judged repairable.",
    indication:
      "It may be considered for traumatic or selected degenerative tears with weakness or night pain after a physiotherapy trial, when MRI shows repairable tissue.",
    nonCandidate:
      "Massive retracted tears with fatty replacement, or arthritis that already needs a reverse shoulder, may be better served by another operation or by rehabilitation alone.",
    evaluation:
      "Examination of strength and MRI (or ultrasound) describe tear size, retraction and muscle quality. X-rays look for arthritis that would change the plan to replacement.",
    approaches: [
      { label: "Arthroscopic repair", detail: "Anchors and sutures placed through portals; the usual modern approach." },
      { label: "Mini-open repair", detail: "Used in selected tear patterns or when arthroscopy is not suitable." },
      { label: "Partial repair or tendon transfer discussion", detail: "When a complete repair is not realistic." },
    ],
    technique:
      "The tendon edge is prepared, bone is prepared at the footprint, and anchors secure the tendon. Biceps or acromial work may be added if planned.",
    duration: "often 1–2 hours; larger tears take longer",
    stayNote: "Stay is often one night or day-care; the catalog planning stay is [STAY].",
    recovery:
      "A sling is usual for several weeks. Physiotherapy is slow by design. Premature lifting is a common reason repairs fail.",
    implantNote:
      "Anchor number and type, plus any patch, can change the consumable line. Ask how many anchors are assumed.",
    distinctiveRisks:
      "Re-tear, stiffness, infection and incomplete strength recovery should be discussed. MRI healing and comfort do not always match.",
    drivers: [
      { label: "Tear size and retraction", detail: "Larger tears use more anchors and theatre time." },
      { label: "Need for additional shoulder work", detail: "Biceps tenodesis or acromioplasty should be listed if planned." },
      { label: "Patch or augmentation", detail: "Not part of a standard repair letter unless named." },
      { label: "Sling and physiotherapy length", detail: "Outpatient rehab dominates the trip after a short stay." },
      { label: "Arthritis on X-ray", detail: "May convert the plan toward shoulder replacement." },
    ],
    quoteItems: ["How many anchors are included?", "Is biceps or acromial work part of the same letter?"],
    documents: ["Shoulder MRI", "X-rays if already performed"],
    followUp: "Sling compliance and delayed strengthening are the aftercare. The home physiotherapist needs the written phase protocol.",
    related: ["Shoulder Replacement", "Arthroscopic Surgery", "Tendon Repair", "Fracture Fixation"],
  },
  {
    procedure: "Arthroscopic Surgery",
    shortName: "arthroscopic surgery",
    briefName: "Arthroscopic Surgery",
    slug: "arthroscopic-surgery",
    figure: "/costs/arthroscopic-surgery-illustration.webp",
    figureAlt: "Illustration of a camera and instruments being used inside a joint",
    definition:
      "Arthroscopic surgery uses a camera and small instruments through portals to inspect and treat a joint when the planned work is a scope-based procedure rather than a named ligament reconstruction or replacement.",
    indication:
      "It may be considered for selected locking meniscus fragments, loose bodies, diagnostic uncertainty after imaging, or defined cartilage procedures. It is not a general ‘clean-up’ for every painful joint.",
    nonCandidate:
      "Advanced arthritis that needs replacement, or a named ACL/PCL/cuff product that already has its own sheet, should not be billed as generic arthroscopy.",
    evaluation:
      "MRI or X-rays should define the target. A request that only says “arthroscopy” is not enough to quote honestly.",
    approaches: [
      { label: "Knee arthroscopy", detail: "Meniscectomy, loose-body removal or chondroplasty as specifically indicated." },
      { label: "Shoulder arthroscopy", detail: "Subacromial or biceps work when cuff repair or replacement is not the product." },
      { label: "Other joints", detail: "Ankle, elbow or hip arthroscopy only when the team names the joint and the goal." },
    ],
    technique:
      "Saline distends the joint, the camera maps the problem, and instruments treat only the planned lesion. Conversion to open surgery should be discussed in consent.",
    duration: "often 30–90 minutes depending on the joint and the work found",
    stayNote: "Often day-care or one night; the catalog planning stay is [STAY].",
    recovery:
      "Walking or sling use depends on the joint. Swelling can last weeks. This is not automatically a faster recovery than a named reconstruction if extra work is done.",
    implantNote:
      "If anchors, shavers or extra implants are used, they should be listed. A diagnostic-only scope is a different price from a reconstructive scope.",
    distinctiveRisks:
      "Stiffness, infection, fluid extravasation and the finding that more surgery is needed should be discussed.",
    drivers: [
      { label: "Which joint and which lesion", detail: "Generic arthroscopy is not a comparable product across joints." },
      { label: "Diagnostic versus reconstructive work", detail: "Found-and-fixed lesions change time and implants." },
      { label: "Conversion to a named procedure", detail: "ACL, cuff or replacement work belongs on those sheets." },
      { label: "Day-care versus overnight observation", detail: "Confirm the room assumption." },
      { label: "Physiotherapy after unexpected findings", detail: "May be extra." },
    ],
    quoteItems: ["Which joint and which exact procedure are priced?", "What happens if a repair or reconstruction is required?"],
    documents: ["MRI of the joint to be scoped", "A clinic note stating the mechanical symptom being treated"],
    followUp: "The discharge note should state what was actually done. Rehabilitation follows that finding, not the word arthroscopy.",
    related: ["Meniscus Repair", "ACL Reconstruction (Anterior Cruciate Ligament)", "Rotator Cuff Repair", "Total Knee Replacement"],
  },
  {
    procedure: "Fracture Fixation",
    shortName: "fracture fixation",
    briefName: "Fracture Fixation",
    slug: "fracture-fixation",
    figure: "/costs/fracture-fixation-illustration.webp",
    figureAlt: "Illustration of a broken long bone and conceptual plate-and-screw fixation",
    definition:
      "Fracture fixation holds broken bone fragments in a stable position with plates, screws, nails or wires so healing can occur in acceptable alignment.",
    indication:
      "It may be considered when a fracture is displaced, unstable, involves a joint, has failed closed treatment, or belongs to a pattern that heals poorly in a cast alone.",
    nonCandidate:
      "Stable, well-aligned fractures that can be treated in a cast or brace, or a patient who needs resuscitation before any implant, should not be forced into an elective fixation package.",
    evaluation:
      "X-rays in two planes, and CT for joint or complex patterns, define the fragments. Soft-tissue status and medical fitness decide timing.",
    approaches: [
      { label: "Internal fixation with plate or nail", detail: "The usual adult pathway when the skin and bone allow." },
      { label: "External fixation", detail: "Used when soft tissues or infection risk prevent immediate internal hardware." },
      { label: "Closed treatment", detail: "Still appropriate for many stable patterns; it is not a cheaper version of this sheet." },
    ],
    technique:
      "The surgeon reduces the fragments—closed or open—and applies hardware that matches the bone. ORIF is the named open-reduction product on a neighbouring sheet.",
    duration: "often 1–3 hours; periarticular or segmental fractures take longer",
    stayNote: "Stay depends on the bone, swelling and walking ability; the catalog planning stay is [STAY].",
    recovery:
      "Weight-bearing rules are fracture-specific. Casts or boots may still be needed. Healing X-rays, not a hotel booking, decide when hardware has done its job.",
    implantNote:
      "Nail versus plate, locking screws and joint-spanning hardware change cost. Confirm the implant set for the named bone.",
    distinctiveRisks:
      "Infection, non-union, malunion, implant irritation and the need for later removal should be discussed.",
    drivers: [
      { label: "Which bone and joint involvement", detail: "A simple fibula is not priced like a tibial plateau." },
      { label: "Open versus closed soft tissues", detail: "Open fractures add washouts and possible staged surgery." },
      { label: "Nail, plate or external frame", detail: "Different implant families." },
      { label: "Need for bone graft", detail: "May appear if comminution is severe." },
      { label: "Later implant removal", detail: "Usually a separate episode." },
    ],
    quoteItems: ["Which bone and which implant set are priced?", "Is this an isolated fracture or a staged open-fracture pathway?"],
    documents: ["Injury X-rays and CT if already performed", "Tetanus and open-wound records where relevant"],
    followUp: "Serial X-rays watch healing. Smoking, diabetes and early weight-bearing against advice are common reasons healing slows.",
    related: ["ORIF (Open Reduction and Internal Fixation)", "Non-Union Repair", "Tendon Repair", "Total Hip Replacement"],
  },
  {
    procedure: "ORIF (Open Reduction and Internal Fixation)",
    shortName: "ORIF",
    briefName: "ORIF",
    slug: "orif-open-reduction-and-internal-fixation",
    figure: "/costs/orif-illustration.webp",
    figureAlt: "Illustration of a displaced fracture being aligned and fixed with internal hardware",
    definition:
      "ORIF means the fracture is opened, the fragments are seen and reduced under direct vision, and internal hardware holds that reduction. It is a more specific product than the broader fracture-fixation sheet.",
    indication:
      "It may be considered when closed reduction cannot restore joint surface or alignment, or when the chosen implant requires an open approach.",
    nonCandidate:
      "Fractures that can be nailed or reduced closed, or wounds that first need external fixation, should not be labelled ORIF for convenience.",
    evaluation:
      "CT is common for intra-articular patterns. Soft-tissue swelling may delay the open approach even when the indication is already clear.",
    approaches: [
      { label: "Articular ORIF", detail: "Restores a joint surface with plates and screws under direct vision." },
      { label: "Diaphyseal open reduction", detail: "Used when closed nailing is not suitable." },
      { label: "Staged ORIF after external fixation", detail: "Two theatre events; price them separately." },
    ],
    technique:
      "An incision exposes the fragments, reduction clamps restore anatomy, and plates or screws are applied. Cartilage fragments may need buried implants.",
    duration: "often 1.5–4 hours for intra-articular work",
    stayNote: "Stay follows swelling and pain control; the catalog planning stay is [STAY].",
    recovery:
      "Joint fractures often need delayed weight-bearing and supervised motion to limit stiffness. Hardware irritation can appear months later.",
    implantNote:
      "Anatomic plates and locking screws for a named joint should be specified. A generic ‘fracture package’ is not an ORIF quote.",
    distinctiveRisks:
      "Wound problems, stiffness, post-traumatic arthritis and the need for later metal removal are particular to open articular work.",
    drivers: [
      { label: "Joint surface comminution", detail: "More fragments mean more theatre time and implants." },
      { label: "Soft-tissue delay", detail: "A spanning frame first is a second procedure." },
      { label: "Anatomic plate systems", detail: "Joint-specific plates cost more than generic trauma sets." },
      { label: "Need for bone graft or substitutes", detail: "May be extra." },
      { label: "Later hardware removal", detail: "Ask whether it is contemplated and priced separately." },
    ],
    quoteItems: ["Which joint or bone is this ORIF for?", "Is a spanning external fixator already done or still required?"],
    documents: ["Injury CT and X-rays", "Photographs or notes of swelling and wounds"],
    followUp: "Motion starts when the surgeon judges the fixation and wound safe. Stiffness prevention and healing X-rays run in parallel.",
    related: ["Fracture Fixation", "Non-Union Repair", "Ankle Replacement", "Hand Reconstruction"],
  },
  {
    procedure: "Non-Union Repair",
    shortName: "non-union repair",
    briefName: "Non-Union Repair",
    slug: "non-union-repair",
    figure: "/costs/non-union-repair-illustration.webp",
    figureAlt: "Illustration of a bone that failed to heal and conceptual repair with graft and hardware",
    definition:
      "Non-union repair treats a fracture that has not united in the expected time by improving stability, biology or both—often with revision hardware and bone graft.",
    indication:
      "It may be considered when serial X-rays show no progressive healing, the patient has pain or instability at the old fracture, and infection has been considered.",
    nonCandidate:
      "A delayed union that is still progressing, or an untreated infection, needs a different sequence. Smoking cessation and metabolic work-up may come first.",
    evaluation:
      "Serial X-rays, CT, inflammatory markers and sometimes a bone-infection work-up define atrophic versus hypertrophic non-union and whether hardware is loose.",
    approaches: [
      { label: "Revision fixation and compression", detail: "For hypertrophic non-unions that mainly lacked stability." },
      { label: "Bone grafting with revision hardware", detail: "For atrophic non-unions that need biology as well as stability." },
      { label: "Staged infection treatment", detail: "Debridement and later reconstruction if infection is present." },
    ],
    technique:
      "Old hardware may be removed, the non-union is freshened, graft or substitute is added if planned, and a more stable construct is applied.",
    duration: "often 2–4 hours depending on implant removal and graft harvest",
    stayNote: "Stay is often longer than a simple fracture fixation; the catalog planning stay is [STAY].",
    recovery:
      "Protected weight-bearing can last months. Healing is judged on CT or X-rays, not on the date of surgery.",
    implantNote:
      "Revision nails or plates, graft harvest or substitutes, and possible BMP-type products (if used and permitted) should be named. They are rarely inside a primary fracture letter.",
    distinctiveRisks:
      "Persistent non-union, infection, graft-site pain and the need for further surgery should be discussed honestly.",
    drivers: [
      { label: "Infection status", detail: "Infected non-union is a staged pathway." },
      { label: "Graft source", detail: "Iliac-crest harvest, allograft or substitutes change cost and pain." },
      { label: "Revision implant", detail: "Longer nails or locked plates differ from the first construct." },
      { label: "Metabolic and smoking work-up", detail: "May add clinic visits before theatre." },
      { label: "Duration of protected mobilisation", detail: "Hotel and companion time often exceed the hospital stay." },
    ],
    quoteItems: ["Is bone graft included, and from which source?", "Has infection been excluded in the priced pathway?"],
    documents: ["Serial X-rays from the original injury", "CT of the non-union and prior implant records"],
    followUp: "Healing checks are months-long. The home surgeon needs the construct details and weight-bearing rules.",
    related: ["Fracture Fixation", "ORIF (Open Reduction and Internal Fixation)", "Revision Knee Replacement", "Tendon Repair"],
  },
  {
    procedure: "Carpal Tunnel Release",
    shortName: "carpal tunnel release",
    briefName: "Carpal Tunnel Release",
    slug: "carpal-tunnel-release",
    figure: "/costs/carpal-tunnel-release-illustration.webp",
    figureAlt: "Illustration of a compressed median nerve at the wrist and conceptual ligament release",
    definition:
      "Carpal tunnel release divides the ligament over the median nerve at the wrist so that night pain, numbness and weakness from compression may improve.",
    indication:
      "It may be considered when typical symptoms persist after splints and activity change, especially if nerve tests show compression or thenar weakness is appearing.",
    nonCandidate:
      "Hand symptoms from neck nerves, untreated hypothyroidism discussion, or very mild intermittent symptoms may stay non-operative. Surgery does not treat every tingling hand.",
    evaluation:
      "Clinical tests are central. Nerve-conduction studies are commonly used. Ultrasound or MRI is reserved for unusual anatomy.",
    approaches: [
      { label: "Open release", detail: "A short palmar incision; the usual reliable method." },
      { label: "Endoscopic release", detail: "A smaller skin scar in selected hands; not automatically cheaper or safer." },
      { label: "Continued non-operative care", detail: "Splints and injection remain options when tests and symptoms are mild." },
    ],
    technique:
      "Under local or regional anaesthesia the ligament is divided under direct or endoscopic vision, taking care of the nerve and palmar structures.",
    duration: "often 15–45 minutes",
    stayNote: "Usually day-care; the catalog planning stay is [STAY].",
    recovery:
      "Finger motion starts early. Grip strength and scar sensitivity improve over weeks. Heavy lifting and motorcycle riding timelines are individualised.",
    implantNote:
      "There is typically no implant. Endoscopic equipment, if used, should be stated. Combined trigger-finger or other hand work is extra.",
    distinctiveRisks:
      "Scar tenderness, incomplete relief, nerve injury and the rare need for revision should be discussed.",
    drivers: [
      { label: "Open versus endoscopic", detail: "Equipment and facility fees differ." },
      { label: "Bilateral release", detail: "Two sides in one sitting change dressing care and function." },
      { label: "Nerve-conduction tests", detail: "May be billed before the procedure." },
      { label: "Combined hand procedures", detail: "Should be listed separately." },
      { label: "Anaesthesia choice", detail: "Local, block or sedation changes the facility line." },
    ],
    quoteItems: ["Is this open or endoscopic, and is nerve testing included?", "If both wrists are symptomatic, are they priced together?"],
    documents: ["Nerve-conduction report if already done", "Note of night pain, numbness distribution and thenar weakness"],
    followUp: "Scar massage and activity advice are usually enough. Persistent numbness may reflect pre-existing nerve damage rather than a failed release.",
    related: ["Tendon Repair", "Hand Reconstruction", "Arthroscopic Surgery", "Fracture Fixation"],
  },
  {
    procedure: "Tendon Repair",
    shortName: "tendon repair",
    briefName: "Tendon Repair",
    slug: "tendon-repair",
    figure: "/costs/tendon-repair-illustration.webp",
    figureAlt: "Illustration of a torn tendon and conceptual suture repair",
    definition:
      "Tendon repair sutures a lacerated or ruptured tendon so that the muscle can again move the finger, wrist or other joint the tendon serves.",
    indication:
      "It may be considered for open lacerations, selected closed ruptures, and after infection is controlled in delayed presentations. Timing is often urgent for open injuries.",
    nonCandidate:
      "A chronic rupture with a large gap, a destroyed pulley system, or a wound that first needs washout may require reconstruction rather than a simple repair.",
    evaluation:
      "Examination of cascade and strength, X-rays for associated fracture, and a clear description of the wound or rupture site guide the plan.",
    approaches: [
      { label: "Primary tendon suture", detail: "For clean, prompt presentations." },
      { label: "Delayed repair after washout", detail: "Used when the wound is contaminated; it may be a staged admission." },
      { label: "Tendon reconstruction or graft", detail: "For chronic gaps; this is closer to hand reconstruction than a simple suture." },
    ],
    technique:
      "The tendon ends are retrieved and sutured with a core-and-epitendinous technique, then the pulley system is protected. Associated nerve or artery injuries should be listed if treated.",
    duration: "often 45–120 minutes depending on how many tendons and whether nerves are repaired",
    stayNote: "Often day-care or one night; the catalog planning stay is [STAY].",
    recovery:
      "A protective splint and early protected motion are common. Healing is measured in weeks; heavy gripping is delayed. Therapy visits dominate the trip after a short stay.",
    implantNote:
      "Suture material is usually modest. Splints, therapy and any nerve repair or graft change the real bill more than the theatre hour.",
    distinctiveRisks:
      "Rupture of the repair, adhesions, infection and the need for later tenolysis should be discussed.",
    drivers: [
      { label: "Number of tendons and zone", detail: "A single extensor is not priced like multiple flexors in zone II." },
      { label: "Associated nerve or vessel repair", detail: "Microsurgical time is extra." },
      { label: "Splint and hand therapy", detail: "Often the largest post-discharge cost." },
      { label: "Open contaminated wound", detail: "Washout and delayed suture are two events." },
      { label: "Need for graft", detail: "Moves the case toward reconstruction." },
    ],
    quoteItems: ["How many tendons are priced, and is nerve repair included?", "How many hand-therapy visits are bundled?"],
    documents: ["Wound or rupture description and photographs if available", "X-rays if a foreign body or fracture is possible"],
    followUp: "Hand therapy is not optional after most flexor repairs. The home therapist needs the written motion protocol.",
    related: ["Hand Reconstruction", "Carpal Tunnel Release", "Achilles Repair", "Fracture Fixation"],
  },
  {
    procedure: "Hand Reconstruction",
    shortName: "hand reconstruction",
    briefName: "Hand Reconstruction",
    slug: "hand-reconstruction",
    figure: "/costs/hand-reconstruction-illustration.webp",
    figureAlt: "Illustration of an injured hand and a conceptual reconstruction of tendons or joints",
    definition:
      "Hand reconstruction restores function after trauma, tendon loss, nerve injury or deformity when a single release or simple suture is not enough.",
    indication:
      "It may be considered after combined tendon-nerve injuries, failed simple repairs, selected rheumatoid deformity, or staged reconstruction when the wound is ready.",
    nonCandidate:
      "An isolated carpal tunnel or a clean single-tendon laceration belongs on those simpler sheets. Active infection should be controlled first.",
    evaluation:
      "Examination of sensation, cascade and joints, X-rays, and sometimes nerve studies or MRI define what can be reconstructed in one sitting.",
    approaches: [
      { label: "Staged tendon reconstruction", detail: "Silicone rod then graft in selected flexor injuries." },
      { label: "Combined nerve and tendon reconstruction", detail: "Longer theatre time and therapy." },
      { label: "Joint or soft-tissue reconstruction", detail: "Used when deformity or instability is the main problem." },
    ],
    technique:
      "The plan is individual: grafts, transfers, nerve repair or joint procedures are combined only as imaging and examination support. This page cannot specify one sequence.",
    duration: "often 2–5 hours depending on how many structures are reconstructed",
    stayNote: "Stay is often a few nights; the catalog planning stay is [STAY].",
    recovery:
      "Splinting and therapy are prolonged. Function returns over months. International patients should plan a longer nearby stay than for carpal tunnel release.",
    implantNote:
      "Grafts, rods, plates or joint implants must be named. A ‘hand package’ without a structure list is not comparable.",
    distinctiveRisks:
      "Stiffness, incomplete function, graft failure and the need for further stages should be expected topics, not surprises.",
    drivers: [
      { label: "Number of stages", detail: "Rod-then-graft pathways are two admissions." },
      { label: "Microsurgical nerve work", detail: "Adds time and magnification resources." },
      { label: "Implants or rods", detail: "Must appear as named lines." },
      { label: "Therapy intensity", detail: "Daily therapy near the campus can exceed the hospital fee." },
      { label: "Skin or flap needs", detail: "Soft-tissue cover is a different reconstructive event." },
    ],
    quoteItems: ["Which structures will be reconstructed in this admission?", "Is this a one-stage or two-stage plan?"],
    documents: ["Prior operative notes and photographs", "Nerve studies if already performed"],
    followUp: "Therapy and staged reviews are the treatment after the stitches. The home hand therapist needs the protocol and any implant record.",
    related: ["Tendon Repair", "Carpal Tunnel Release", "Fracture Fixation", "ORIF (Open Reduction and Internal Fixation)"],
  },
  {
    procedure: "Ankle Replacement",
    shortName: "ankle replacement",
    briefName: "Ankle Replacement",
    slug: "ankle-replacement",
    figure: "/costs/ankle-replacement-illustration.webp",
    figureAlt: "Illustration of a worn ankle joint and conceptual ankle replacement implants",
    definition:
      "Ankle replacement resurfaces the worn tibia and talus with a mobile or fixed-bearing implant so that a stiff, painful arthritic ankle can move through a prosthetic joint rather than a fusion.",
    indication:
      "It may be considered for advanced ankle arthritis with enough bone and alignment to support an implant, after counselling about fusion as the alternative.",
    nonCandidate:
      "Severe deformity, poor bone, neuropathy, active infection or a patient who would be better served by fusion should not be forced into replacement.",
    evaluation:
      "Standing ankle and alignment X-rays, often CT, and a discussion of neighbouring joints (subtalar, midfoot) precede implant choice.",
    approaches: [
      { label: "Primary total ankle replacement", detail: "For selected arthritis with correctable alignment." },
      { label: "Ankle fusion", detail: "Still the honest alternative for many patterns; it is not priced on this sheet." },
      { label: "Revision ankle replacement", detail: "A different implant and bone-loss problem if a prior implant failed." },
    ],
    technique:
      "Through an anterior or other planned approach the surgeon cuts the tibia and talus to the implant plan and seats the components, correcting alignment as designed.",
    duration: "often 2–3 hours for a primary replacement",
    stayNote: "Stay is often several nights; the catalog planning stay is [STAY].",
    recovery:
      "A period of protected weight-bearing in a boot or cast is common. Swelling lasts weeks. Fitness to fly needs wound and swelling review.",
    implantNote:
      "Ankle implants are a specialised product. Confirm brand class, whether additional osteotomies are included, and that fusion is not what was actually priced.",
    distinctiveRisks:
      "Wound problems, loosening, bearing wear, adjacent-joint arthritis and the possible later conversion to fusion should be discussed.",
    drivers: [
      { label: "Implant system", detail: "Specialised ankle implants dominate the material line." },
      { label: "Alignment osteotomies", detail: "Extra cuts or fusions of neighbouring joints change the episode." },
      { label: "Prior infection or hardware", detail: "Removal and staging add theatre events." },
      { label: "CT planning", detail: "May be separate." },
      { label: "Protected-weight-bearing stay", detail: "Hotel time with a boot can exceed the ward stay." },
    ],
    quoteItems: ["Which ankle implant is assumed?", "Are alignment osteotomies or subtalar work included?"],
    documents: ["Standing ankle and alignment X-rays", "CT if already performed"],
    followUp: "Wound watch is important because the anterior incision can be slow to settle. X-rays and boot weaning are staged.",
    related: ["Bunion Surgery", "Achilles Repair", "Total Knee Replacement", "ORIF (Open Reduction and Internal Fixation)"],
  },
  {
    procedure: "Bunion Surgery",
    shortName: "bunion surgery",
    briefName: "Bunion Surgery",
    slug: "bunion-surgery",
    figure: "/costs/bunion-surgery-illustration.webp",
    figureAlt: "Illustration of a hallux valgus bunion and a conceptually realigned first toe",
    definition:
      "Bunion surgery realigns the first metatarsal and great toe when a hallux valgus deformity causes pain, shoe conflict or lesser-toe problems that no longer respond to footwear change.",
    indication:
      "It may be considered for painful bunions after wider shoes, orthoses and activity change fail, when X-rays show a deformity that an osteotomy or fusion can correct.",
    nonCandidate:
      "A painless bump treated only for appearance, or a foot that mainly needs medical management of swelling, should not be operated on from a brochure photograph.",
    evaluation:
      "Standing foot X-rays measure angles. Circulation, neuropathy and lesser-toe deformity change the osteotomy or fusion choice.",
    approaches: [
      { label: "Distal or shaft osteotomy", detail: "For moderate deformities with a congruent joint." },
      { label: "Proximal osteotomy or tarsometatarsal fusion (Lapidus)", detail: "For larger angles or instability of the first ray." },
      { label: "Lesser-toe procedures", detail: "Added when claw or crossover toes are part of the same painful foot." },
    ],
    technique:
      "The surgeon cuts and realigns bone, tightens or loosens soft tissue, and fixes the correction with screws or a plate. Dressings and a postoperative shoe protect the osteotomy.",
    duration: "often 45–120 minutes; added lesser-toe work extends this",
    stayNote: "Often day-care or one night; the catalog planning stay is [STAY].",
    recovery:
      "A postoperative shoe or boot is usual. Swelling lasts weeks to months. Flights and long walks should wait for wound and swelling advice.",
    implantNote:
      "Screws, plates and any lesser-toe implants should be named. Bilateral surgery is a different functional recovery, not two cheap copies.",
    distinctiveRisks:
      "Recurrence, stiffness, transfer pain, prominent hardware and delayed bone healing should be discussed.",
    drivers: [
      { label: "Osteotomy versus Lapidus fusion", detail: "Different hardware and healing times." },
      { label: "Lesser-toe work", detail: "Adds theatre time and extra shoes or pins." },
      { label: "Bilateral correction", detail: "Walking help and hotel needs change." },
      { label: "Bone quality", detail: "May require different fixation." },
      { label: "Postoperative shoe period", detail: "Companion support matters more than the short stay." },
    ],
    quoteItems: ["Which osteotomy or fusion is priced?", "Are lesser toes included, and is this one foot or both?"],
    documents: ["Standing foot X-rays", "Note of footwear trial and pain location"],
    followUp: "Suture care, swelling control and a staged return to normal shoes are the aftercare. Recurrence risk is not removed by paying more.",
    related: ["Ankle Replacement", "Achilles Repair", "Fracture Fixation", "Tendon Repair"],
  },
  {
    procedure: "Achilles Repair",
    shortName: "Achilles repair",
    briefName: "Achilles Repair",
    slug: "achilles-repair",
    figure: "/costs/achilles-repair-illustration.webp",
    figureAlt: "Illustration of an Achilles tendon rupture and conceptual repair",
    definition:
      "Achilles repair sutures a ruptured Achilles tendon so that push-off strength can be restored, when the team judges that an operation rather than functional bracing is appropriate.",
    indication:
      "It may be considered for complete ruptures in patients who need strong push-off, delayed presentations with a gap, or failed non-operative care. Many acute ruptures can also be treated in a boot.",
    nonCandidate:
      "A partial tear, a patient who chooses functional bracing, or a chronic gap that needs reconstruction rather than end-to-end suture requires a different plan.",
    evaluation:
      "Examination (gap, Thompson test) and ultrasound or MRI confirm completeness and gap size. Timing from injury changes the technique.",
    approaches: [
      { label: "Open end-to-end repair", detail: "For many acute complete ruptures." },
      { label: "Minimally invasive or percutaneous repair", detail: "Selected techniques with different sural-nerve counselling." },
      { label: "Reconstruction for chronic rupture", detail: "May need a graft or V-Y advancement; not an acute-repair package." },
    ],
    technique:
      "The tendon ends are approximated and sutured, sometimes through a smaller incision. The ankle is then protected in a splint or boot with a planned movement protocol.",
    duration: "often 45–90 minutes for an acute repair; reconstructions take longer",
    stayNote: "Often one night; the catalog planning stay is [STAY].",
    recovery:
      "A boot with heel wedges or a cast is common. Weight-bearing is staged. Running is months away. Wound problems over the Achilles need prompt review.",
    implantNote:
      "Suture anchors or a graft for chronic reconstruction should be named. A boot is part of the real cost even if the hospital stay is short.",
    distinctiveRisks:
      "Re-rupture, wound breakdown, sural-nerve irritation and calf weakness should be discussed. Non-operative care has its own re-rupture discussion.",
    drivers: [
      { label: "Acute versus chronic gap", detail: "Reconstruction is a different product." },
      { label: "Open versus percutaneous technique", detail: "Implants and nerve risk counselling differ." },
      { label: "Boot and wedge protocol", detail: "Often purchased or billed separately." },
      { label: "Wound-risk factors", detail: "Diabetes or smoking can extend stay and dressings." },
      { label: "Physiotherapy length", detail: "Calf strength recovery is months, not the overnight stay." },
    ],
    quoteItems: ["Is this an acute repair or a chronic reconstruction?", "Is the functional boot included?"],
    documents: ["Ultrasound or MRI of the Achilles", "Date of injury and any boot treatment already started"],
    followUp: "Boot weaning and eccentric strengthening are supervised. Sudden pop or wound drainage needs urgent local review.",
    related: ["Tendon Repair", "Bunion Surgery", "Ankle Replacement", "Fracture Fixation"],
  },
];

export const orthopedicsArticles: CostArticle[] = profiles.map(createOrthopedicsArticle);

export const orthopedicsArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  orthopedicsArticles.map((article) => [article.slug, article]),
);
