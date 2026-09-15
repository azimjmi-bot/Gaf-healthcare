import type {
  CityEditorial,
  CostArticle,
  CostCitySlug,
  DestinationRow,
  LabelledDetail,
} from "./types";
import { toSlug } from "../../lib/taxonomy";

/**
 * Pediatric Hematology procedures that already share a Hematology or Medical
 * Oncology article keep that canonical sheet. This bundle only adds the three
 * pediatric-owned slugs that had no long-form guide, so haploidentical,
 * allogeneic, autologous, matched-unrelated, CAR-T, biopsy and aspiration
 * never receive a second page.
 */
export const PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES = [
  "Pediatric Bone Marrow Transplantation",
  "Matched Sibling Donor Transplant",
  "Hematopoietic Stem Cell Transplantation",
] as const;

type PediatricHematologyProcedure = (typeof PEDIATRIC_HEMATOLOGY_NEW_PROCEDURES)[number];

type PediatricHematologyProfile = {
  procedure: PediatricHematologyProcedure;
  shortName: string;
  briefName: string;
  specialist: string;
  definition: string;
  candidacy: string;
  distinction: string;
  scopeShort: string;
  limits: string;
  evaluation: string;
  process: string;
  setting: string;
  duration: string;
  stayGlance: string;
  admission: string;
  recovery: string;
  travel: string;
  followUp: string;
  risks: string;
  urgent: string;
  lateEffects: string;
  caregiver: string;
  unitFocus: string;
  graftOrDonor: string;
  consent: string;
  approaches: LabelledDetail[];
  drivers: LabelledDetail[];
  records: string[];
  quoteQuestions: string[];
  related: string[];
  campusFocus: string;
  imageAlts: [string, string, string];
};

const CITY_CONTEXT: Record<
  CostCitySlug,
  {
    city: string;
    airport: string;
    arrival: string;
    lodging: string;
    environment: string;
    pathwayNote: string;
  }
> = {
  "delhi-ncr": {
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    arrival:
      "Delhi, Gurugram, Noida and Faridabad are separate paediatric-hospital corridors. Confirm the transplant campus, isolation floor and parent lodging before booking, because a cross-NCR journey is unsuitable during neutropenia or immediately after a fever spike.",
    lodging:
      "Use lift-accessible lodging inside the response radius the unit names, with a private bathroom, space for one parent to sleep, reliable food hygiene and a night-time route back to the paediatric emergency desk.",
    environment:
      "Winter air pollution and seasonal respiratory viruses deserve explicit discussion for an immunocompromised child. Indoor recovery, masking in crowds and avoiding school or playgrounds until the team agrees are practical issues, not city rankings.",
    pathwayNote:
      "The region lists the largest number of Pediatric Hematology consultants in this catalog, so donor work, paediatric intensive care and early outpatient counts can often be arranged in one geography when the named campus actually runs a children’s transplant programme.",
  },
  mumbai: {
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    arrival:
      "Mumbai and Navi Mumbai are not interchangeable recovery bases. Peak traffic, harbour crossings and monsoon disruption matter when a neutropenic child must return for a blood product, a fever review or a donor-related appointment.",
    lodging:
      "Stay on the same side of the harbour as the confirmed paediatric unit. Verify lift access, a private bathroom, a kitchen or trusted meal plan and transport that avoids prolonged standing with a child who is unwell.",
    environment:
      "Humidity and monsoon travel complicate central-line care and daily clinic attendance. That is a logistics problem; it is not evidence that transplant outcomes differ by city.",
    pathwayNote:
      "Paediatric transplant capacity here is concentrated in a few campuses. A general children’s hospital label does not prove current isolation beds, apheresis or a named paediatric transplant physician for this pathway.",
  },
  bengaluru: {
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    arrival:
      "The airport sits well north of most hospital districts, so the first transfer is long. Cross-city traffic can turn a routine count check into a seated journey that is poorly tolerated by a child recovering from conditioning.",
    lodging:
      "A serviced stay near the treating campus is more useful than an airport hotel. Plan simple meals, a parent sleeping space, pharmacy access and level indoor walking rather than tourist itineraries.",
    environment:
      "A milder climate can make a multi-week family stay more comfortable, but it does not reduce infection risk, graft-versus-host watch or the need for rapid access to a paediatric blood bank.",
    pathwayNote:
      "Several listed campuses keep haematology and intensive care in one building, which helps when a whole transplant episode is completed in a single visit. Confirm that the children’s unit, not only an adult floor, is the named site.",
  },
  chennai: {
    city: "Chennai",
    airport: "Chennai International Airport",
    arrival:
      "Several hospital corridors have comparatively direct airport access, which helps when a family must return repeatedly. Heat and a car journey after conditioning still need a planned vehicle, a parent and the team’s agreement.",
    lodging:
      "Use air-conditioned, flexible accommodation near the named paediatric campus with lift access, a private bathroom and a straightforward route back for fever, bleeding or breathing difficulty.",
    environment:
      "Heat and humidity can worsen dehydration, mucositis discomfort and fatigue. Follow the unit’s fluid, diet and line-care instructions rather than improvising because the weather feels familiar.",
    pathwayNote:
      "The international-patient corridor here is long established, so interpreters, visa-extension paperwork and attendant letters are administrative routine. That convenience does not replace a named paediatric transplant physician.",
  },
  hyderabad: {
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    arrival:
      "The airport lies south of the hospital belt. Jubilee Hills, Banjara Hills, Hi-Tech City and Secunderabad produce different transfer times, so confirm the paediatric transplant and follow-up campus before committing to lodging.",
    lodging:
      "Keep a capable parent and flexible, lift-accessible lodging inside the response radius the team advises, with pharmacy access and a private bathroom for line care and isolation-period hygiene.",
    environment:
      "Summer heat and the long airport transfer compound post-conditioning fatigue. Plan indoor recovery, short supported walks and attendance at the first count reviews before fixing a departure date.",
    pathwayNote:
      "Oncology and haematology capacity sits in a compact corridor, so a second paediatric opinion between campuses rarely means changing city. Confirm which campus actually admits children for this transplant pathway.",
  },
};

const DESTINATIONS: DestinationRow[] = [
  {
    country: "India",
    stay: "[STAY]",
    positioning: "GAF catalog planning range",
    context:
      "The stored India figure is a national planning range for the named paediatric transplant programme and its stated stay. It does not establish eligibility, donor or graft source, conditioning, isolation nights or a final quotation.",
  },
  {
    country: "Turkey",
    stay: "Protocol- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Compare donor work, graft procurement, paediatric isolation, parent lodging, laboratory testing and complication terms rather than a headline transplant package.",
  },
  {
    country: "Thailand",
    stay: "Protocol- and recovery-dependent",
    positioning: "Depends on procedure and hospital",
    context:
      "International coordination does not by itself establish paediatric transplant eligibility, donor availability, paediatric intensive-care cover or continuity after the family returns home.",
  },
  {
    country: "United Arab Emirates",
    stay: "Protocol- and recovery-dependent",
    positioning: "Quotation required",
    context:
      "Specialist, facility, graft, pharmacy and complication charges are frequently billed separately, so a single quoted figure may not be the comparable one.",
  },
  {
    country: "Singapore",
    stay: "Protocol- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Request a self-pay estimate tied to the child’s diagnosis, graft source, conditioning and expected paediatric-unit stay. Subsidised local billing and private international billing differ.",
  },
  {
    country: "Germany",
    stay: "Protocol- and recovery-dependent",
    positioning: "Varies significantly",
    context:
      "Eligibility, professional billing, donor-registry access and post-travel paediatric follow-up need direct confirmation. Inpatient norms after transplant are often longer than in self-pay markets.",
  },
  {
    country: "United Kingdom",
    stay: "Protocol- and recovery-dependent",
    positioning: "Private self-pay varies",
    context:
      "Overseas families should verify acceptance, quotation boundaries, emergency access and who reviews graft function once they have travelled home.",
  },
  {
    country: "United States",
    stay: "Protocol- and recovery-dependent",
    positioning: "Stored self-pay reference",
    context:
      "Facility, specialist, donor, laboratory and pharmacy charges are usually separate, and [US_COST] is a comparison range for the programme rather than a bundled paediatric-transplant quotation.",
  },
];

const COST_COMPONENTS: LabelledDetail[] = [
  { label: "Paediatric transplant physician", detail: "The named children’s haematologist leading the programme." },
  { label: "Donor or graft work", detail: "HLA, donor assessment, collection or product procurement as quoted." },
  { label: "Conditioning and infusion", detail: "Weight-based preparative medicines and the graft infusion episode." },
  { label: "Paediatric isolation ward", detail: "Stated nights, room category and parent rooming-in where included." },
  { label: "Blood products and laboratory", detail: "Transfusions, counts, drug levels and infection tests within limits." },
  { label: "Pharmacy during admission", detail: "Immunosuppression, antimicrobials and supportive medicines as named." },
  { label: "Paediatric intensive care assumption", detail: "Only the ICU nights expressly written into the letter." },
];

const COMMON_INCLUSIONS: LabelledDetail[] = [
  { label: "Paediatric haematology review", detail: "Record review and eligibility discussion as itemized." },
  { label: "Named transplant plan", detail: "The consented paediatric pathway and stated graft assumptions." },
  { label: "Quoted donor or graft work", detail: "Only the HLA, collection or product steps written in the letter." },
  { label: "Conditioning and graft infusion", detail: "Named regimen, pharmacy and infusion episode." },
  { label: "Stated paediatric-unit stay", detail: "Isolation nights, routine monitoring and parent presence rules as quoted." },
  { label: "Discharge documents", detail: "Summary, medicine list, warning signs and early review." },
];

const COMMON_EXCLUSIONS: LabelledDetail[] = [
  { label: "Bridging disease treatment", detail: "Therapy needed to reach the disease status the transplant assumes." },
  { label: "Changed donor or graft source", detail: "A different donor, product or cell-processing method." },
  { label: "Complications and escalation", detail: "Intensive care, graft failure, severe infection or GVHD beyond the allowance." },
  { label: "Unrelated-registry or extra family testing", detail: "Search, courier or additional relatives unless named." },
  { label: "Long-term medicines and vaccination", detail: "Immunosuppression, vaccines and late-effect care after the included visits." },
  { label: "Parent lodging and travel", detail: "Flights, visas, meals and nearby accommodation unless expressly bundled." },
];

function lead(text: string) {
  return text.match(/^.*?\.(?=\s|$)/)?.[0] ?? text;
}

function cityGate(profile: PediatricHematologyProfile, city: string) {
  return (
    `Doctor and hospital cards for ${city} resolve only from exact live CMS relationships for ${profile.procedure}. ` +
    "If that exact relationship is absent, cards must remain empty; a general Pediatric Hematology or children’s-hospital label cannot verify current case acceptance for this pathway. That is a catalog gap, not a ranking or availability claim."
  );
}

function makeCities(profile: PediatricHematologyProfile): CityEditorial[] {
  return (Object.keys(CITY_CONTEXT) as CostCitySlug[]).map((citySlug) => {
    const place = CITY_CONTEXT[citySlug];
    const gate = cityGate(profile, place.city);
    return {
      citySlug,
      ecosystem:
        `${place.city} has broader children’s blood-care services, but this page does not infer that every listed campus performs ${profile.shortName} or admits every referred child. ${place.pathwayNote} ${profile.campusFocus} ${gate}`,
      logistics: `${place.airport}: ${place.arrival} ${place.environment}`,
      costNote:
        `No verified ${place.city}-only tariff is stored for ${profile.shortName}. Use [INDIA_COST] as the national planning range until a named hospital issues an itemized estimate; it is not a city price.`,
      page: {
        seoTitle: `${profile.procedure} Cost in ${place.city}, India: Pediatric Planning`,
        seoDescription:
          `${profile.procedure} cost in ${place.city} uses the [INDIA_COST] national planning range. Compare paediatric-unit scope, donor or graft work, parent stay and travel logistics.`,
        heading: `${profile.procedure} Cost in ${place.city}, India`,
        subtitle:
          `${profile.definition} [INDIA_COST] is a national planning range, not a ${place.city} tariff or a final quotation.`,
        intro: [
          `${profile.candidacy} ${profile.evaluation}`,
          `${place.pathwayNote} Confirm the named ${profile.specialist}, the exact paediatric campus, where the child is isolated and where a parent can stay.`,
          `${place.arrival} ${place.lodging}`,
          gate,
          `Send complete paediatric records before booking non-refundable travel to ${place.city}. A remote opinion can change after examination, repeat marrow tests, donor review or infection screening.`,
        ],
        answer: [
          `${profile.procedure} in ${place.city} is planned against [INDIA_COST], with [STAY] stored only for broad trip planning. Neither figure is a city tariff, an acceptance promise or a recommendation.`,
          `${profile.process} ${profile.admission}`,
        ],
        costExplanation: [
          `The estimate can change with ${profile.drivers
            .slice(0, 4)
            .map((item) => item.label.toLowerCase())
            .join(", ")}. These are clinical and resource differences rather than premium upgrades.`,
          "Ask for the named paediatric transplant physician, graft or donor assumptions, conditioning, isolation nights, parent rooming-in, blood-product policy, complication terms and follow-up in writing.",
          `Budget separately for travel through ${place.airport}, lodging near the campus for at least one parent, meals, take-home medicines and extra nights if counts or complications delay departure.`,
        ],
        factors: profile.drivers.slice(0, 4),
        medicalTourism: [
          `Send marrow reports, HLA results, growth charts, vaccination and infection history, and current medicines before travelling to ${place.city} with a child.`,
          "Obtain written acceptance from a named paediatric transplant physician, and confirm paediatric intensive-care access, blood-bank cover and parent lodging rules before conditioning begins.",
          `${profile.travel} ${place.lodging}`,
        ],
        hospitalDiscussion: [
          gate,
          "Confirm the exact children’s campus, the named paediatric haematologist, isolation policy, parent rooming-in and an emergency contact in writing. Adult transplant accreditation does not establish current paediatric-unit capacity.",
        ],
        faqs: [
          {
            q: `How much does ${profile.shortName} cost in ${place.city}?`,
            a: `Use [INDIA_COST] as the stored national planning range. No verified ${place.city}-only tariff is stored, so an itemized provider estimate is required before you budget.`,
          },
          {
            q: `Which ${place.city} clinician should assess ${profile.shortName}?`,
            a: `A named ${profile.specialist} should assess it. Cards appear only for exact live CMS relationships and are not rankings.`,
          },
          {
            q: `Where should the family stay in ${place.city}?`,
            a: `${place.lodging} ${place.arrival}`,
          },
          {
            q: "When can the child fly home?",
            a: `There is no universal date. ${profile.travel} The treating team must document fitness to fly.`,
          },
          {
            q: "What should the written estimate identify?",
            a: `It should name ${profile.procedure}, the paediatric unit, donor or graft assumptions, conditioning, isolation nights, parent stay rules and complication terms.`,
          },
        ],
      },
    };
  });
}

function createPediatricHematologyArticle(profile: PediatricHematologyProfile): CostArticle {
  const slug = toSlug(profile.procedure);
  const topDrivers = profile.drivers
    .slice(0, 4)
    .map((item) => item.label.toLowerCase())
    .join(", ");
  return {
    procedure: profile.procedure,
    shortName: profile.shortName,
    briefName: profile.briefName,
    slug,
    lastUpdated: "2026-09-15",
    duration: profile.duration,
    recoveryGlance: profile.stayGlance,
    seoTitle: `${profile.procedure} Cost in India: Pediatric Care, Stay & Price Guide`,
    seoDescription:
      `${profile.procedure} cost in India is typically [INDIA_COST]. Compare paediatric-unit scope, donor or graft work, parent stay, recovery and the international family pathway.`,
    heading: `${profile.procedure} Cost in India`,
    heroSubtitle:
      `${profile.definition} Understand the [INDIA_COST] planning range, how the paediatric unit, donor or graft source and parent stay change it, and what follow-up adds.`,
    introduction: [
      profile.candidacy,
      `${profile.scopeShort} Two children with the same diagnosis can therefore be quoted differently without either figure being wrong.`,
      "This page explains what the paediatric pathway involves, what moves the estimate and which records a remote team needs. It cannot choose a donor, graft source or conditioning plan for an individual child.",
      "[INDIA_COST], [US_COST] and [STAY] are planning tokens, not tariffs. Match any quotation to the named paediatric unit, the donor or graft assumptions and the isolation stay actually planned.",
    ],
    answer: [
      `${profile.procedure} in India is typically planned at [INDIA_COST]. A useful estimate names the child’s diagnosis, the paediatric transplant physician, the donor or graft source, conditioning, isolation nights, parent rooming-in and the early review. ${profile.scopeShort} Stored stay is [STAY], though discharge and clearance to fly follow individual recovery.`,
      `The variables that move the figure most are ${topDrivers}. Changed donor findings, infection or a longer admission produce a different bill.`,
      "Planning Range ≠ Final Hospital Quotation. Records review and qualified paediatric haematology assessment come before any itemized offer.",
    ],
    indiaCost: [
      `The [INDIA_COST] value is GAF's stored national planning range for ${profile.shortName}, not a fixed package. Replace it with an itemized quotation naming the ${profile.specialist}, the children’s campus, the graft or donor plan, the expected nights and parent lodging rules.`,
      `Cost moves with ${profile.drivers.map((item) => item.label.toLowerCase()).join(", ")}. A paediatric isolation episode is not comparable with an adult transplant-floor package that happens to admit teenagers.`,
      "Do not derive city tariffs from the national band. Keep [US_COST], flights, visas, parent lodging, medicines, extra nights and a complication contingency in the same budget.",
    ],
    costComponents: COST_COMPONENTS,
    costDrivers: profile.drivers,
    whyQuotesDiffer:
      `Two ${profile.shortName} estimates can assume different donors, graft sources, conditioning intensity, isolation nights, parent rooming-in and complication terms. Compare line items, not totals.`,
    inclusions: [
      ...COMMON_INCLUSIONS,
      { label: "Named paediatric pathway", detail: `Only the stated ${profile.shortName} assumptions are included.` },
    ],
    exclusions: COMMON_EXCLUSIONS,
    overviewHeading: `What Is ${profile.procedure}?`,
    whoHeading: `When Might ${profile.procedure} Be Considered?`,
    overview: {
      what: [profile.definition, profile.distinction],
      who: [
        `A qualified ${profile.specialist} must assess suitability, normally with paediatric intensive-care, transfusion and infectious-disease support. ${profile.unitFocus}`,
        "A remote opinion can change after examination, repeat testing and independent donor review.",
      ],
      how: [profile.process, `${profile.setting} Theatre or infusion time is ${profile.duration}.`],
      variations: profile.approaches,
      preparation: [
        profile.evaluation,
        profile.consent,
        "Reconcile current medicines, transfusion history, live vaccines and allergies before travel. Consent should name the graft or donor plan and what findings could change it.",
      ],
      recovery: [
        `${profile.admission} ${profile.recovery}`,
        profile.risks,
        `Seek urgent help for ${profile.urgent}.`,
      ],
    },
    topicSections: [
      {
        id: "paediatric-unit",
        heading: `Why ${profile.briefName} belongs on a children’s transplant unit`,
        paragraphs: [
          profile.unitFocus,
        ],
      },
      {
        id: "graft-or-donor",
        heading: "Donor, graft source and what the quotation must name",
        paragraphs: [
          profile.graftOrDonor,
        ],
      },
      {
        id: "parent-and-consent",
        heading: "Parent stay, sibling ethics and consent",
        paragraphs: [
          profile.caregiver,
        ],
      },
      {
        id: "conditioning-and-infection",
        heading: "Conditioning, infection windows and isolation",
        paragraphs: [
          "Counts fall after conditioning. Fever during that window is an emergency for the paediatric unit, not a reason to wait for a scheduled clinic. The stored stay of [STAY] is a planning aid, not a discharge promise.",
        ],
      },
      {
        id: "late-effects",
        heading: "Growth, fertility, vaccines and school return",
        paragraphs: [
          profile.lateEffects,
        ],
      },
      {
        id: "recovery-and-travel",
        heading: "Follow-up, fitness to fly and care after return",
        paragraphs: [
          "Discharge from the paediatric ward is not the same as clearance to fly. Keep return tickets flexible until the named team documents graft function, infection stability and a receiving clinician.",
        ],
      },
    ],
    journey: [
      { label: "Submit paediatric records", detail: "Marrow reports, HLA, growth chart, vaccines, infection and transfusion history." },
      { label: "Specialist review", detail: `A named ${profile.specialist} reads the files with a parent present.` },
      { label: "Donor or graft confirmation", detail: "HLA, product availability and independent donor assessment where relevant." },
      { label: "Organ and infection work-up", detail: "Heart, lung, kidney, liver, dental and infection screens as indicated." },
      { label: "Written transplant plan", detail: "Intent, graft source, conditioning, isolation and parent stay rules." },
      { label: "Itemized cost estimate", detail: "Programme and stay quoted apart from bridging therapy and late-effect care." },
      { label: "Medical visa and family travel", detail: "An invitation letter supports the visa for the child and a parent." },
      { label: "Arrival and reassessment", detail: "Examination, repeat tests, donor re-check and consent." },
      { label: "Conditioning and infusion", detail: `The consented ${profile.shortName} and planned monitoring.` },
      { label: "Isolation and count recovery", detail: "Line care, transfusions, fever pathways and parent rooming-in." },
      { label: "Early outpatient phase", detail: "Nearby lodging while counts, medicines and infection risk are still watched." },
      { label: "Fitness-to-fly review", detail: "The team documents stability, medicines and a receiving clinician." },
      { label: "Return home and handover", detail: "Documents, vaccines plan, school advice and named follow-up." },
    ],
    documents: [
      ...profile.records,
      "Growth chart and vaccination record",
      "Current medicines, allergies and transfusion history",
      "Passport, visa and accompanying-parent details",
      "Home paediatric haematologist contact for shared care",
    ],
    cities: makeCities(profile),
    destinations: DESTINATIONS,
    destinationIntro: [
      "India and United States values are stored GAF catalog ranges. Other countries need direct quotations holding diagnosis, graft or donor source, conditioning and paediatric isolation nights constant.",
    ],
    destinationNote:
      "Comparisons are indicative and may not represent identical programmes. Disease status, donor or graft source, complications, currency and length of stay change the final amount.",
    cityIntro: [
      "The five listed cities retain [INDIA_COST] because no verified city tariffs are stored. Their overlays add airport geography, climate, parent lodging and recovery logistics rather than local prices.",
      `Cards resolve only from CMS entities carrying the exact ${profile.procedure} relationship, so missing mappings leave cards empty.`,
    ],
    whyIndia: [
      `Families evaluate India for access to a named ${profile.specialist}, a paediatric isolation unit, and a self-pay planning range below the stored United States reference. Cost alone is not a clinical reason to travel with a child.`,
      "What matters is individual acceptance, a children’s transplant programme rather than an adult floor, paediatric intensive-care support, and who continues immune recovery after return.",
      "No provider is ranked here and no outcome is promised. Unstable infection, lack of a parent who can stay, or treatment already under way locally can make an elective trip inappropriate.",
    ],
    whyCostDiffers: [
      "This page carries a planning range. A hospital letter is an estimate written against a named paediatric pathway, campus, room category and stated nights, so the two are not expected to match.",
      "If two hospitals quote differently, read the line items before assuming one is overcharging: one may include donor harvest and parent lodging while the other bills them later.",
    ],
    questionsToAsk: [
      `Why is ${profile.shortName} recommended for this child, and what alternatives remain?`,
      "Is the intent curative, disease-modifying or another stated goal?",
      `Who is the named ${profile.specialist}, and at which children’s campus?`,
      "Will the child be admitted to a paediatric transplant unit or an adult floor?",
      "Which parent can stay overnight, and is that lodging included?",
      "What donor or graft source does the quotation assume?",
      "What findings could change the consented donor or graft plan?",
      "Was this case discussed in a paediatric transplant meeting?",
      "Is any treatment needed before conditioning?",
      "Which existing tests are accepted rather than repeated?",
      "Which physician, facility and pharmacy fees are included?",
      "Which blood products and infection tests are assumed?",
      "How are paediatric intensive care and extra nights billed?",
      "How many isolation nights and which room category are assumed?",
      "What warning signs need urgent return before we fly?",
      "When are counts reviewed, and who explains them to the parent?",
      "Who continues immunosuppression and vaccination at home?",
      "When is fitness to fly assessed, and must return travel stay flexible?",
      "What school, live-vaccine and fertility counselling is planned?",
      "What happens if the chosen donor or graft becomes unavailable?",
      ...profile.quoteQuestions,
    ],
    faqs: [
      {
        q: `How much does ${profile.shortName} cost in India?`,
        a: "[INDIA_COST] is a national planning range rather than a quotation. Paediatric-unit scope, donor or graft work, isolation nights and parent stay determine the final bill.",
      },
      { q: `What is ${profile.shortName}?`, a: profile.definition },
      { q: "What decides the clinical scope of this pathway?", a: lead(profile.distinction) },
      { q: "Which records are needed before acceptance?", a: lead(profile.evaluation) },
      { q: "Who may be considered for this pathway?", a: lead(profile.candidacy) },
      {
        q: `How long does ${profile.shortName} take?`,
        a: `The clinical episode is ${profile.duration}. Complications and delayed count recovery can change it.`,
      },
      { q: "How long is the hospital stay?", a: `${lead(profile.admission)} Clinical criteria, not a schedule, determine discharge.` },
      { q: "What are the important risks?", a: lead(profile.risks) },
      { q: "Can a parent stay with the child?", a: lead(profile.caregiver) },
      { q: "What follow-up is needed after the admission?", a: `${lead(profile.followUp)} Late-effect and vaccine plans are often separate.` },
      { q: "When can an international family fly home?", a: `There is no fixed date. ${lead(profile.travel)} The team must confirm fitness to fly.` },
      { q: "What late effects should families ask about?", a: lead(profile.lateEffects) },
    ],
    doctorHeading: `Pediatric hematologists to consider for ${profile.procedure} in India`,
    cityDoctorHeading: `Pediatric hematologists for ${profile.procedure} in [CITY]`,
    doctorIntro:
      `Profiles appear only where ${profile.procedure} is an exact current CMS relationship. Placement is not a ranking or an outcome claim.`,
    hospitalHeading: `Hospitals for ${profile.procedure} in India`,
    cityHospitalHeading: `${profile.procedure} hospitals in [CITY]`,
    hospitalIntro:
      `Cards follow exact CMS relationships for ${profile.procedure}. A children’s-hospital or adult-transplant label does not establish current paediatric-unit acceptance.`,
    relatedProcedures: profile.related,
    figures: [
      {
        after: "overview",
        src: `/images/cost/pediatric-hematology/${slug}-illustration.webp`,
        alt: profile.imageAlts[0],
        caption: `Educational illustration for ${profile.shortName} on a paediatric haematology pathway.`,
        fit: "contain",
      },
      {
        after: "how",
        src: `/images/cost/pediatric-hematology/${slug}-pathway.webp`,
        alt: profile.imageAlts[1],
        caption: "Donor or graft assumptions, conditioning and isolation depend on the named paediatric plan.",
        fit: "contain",
      },
      {
        after: "journey",
        src: `/images/cost/pediatric-hematology/${slug}-recovery.webp`,
        alt: profile.imageAlts[2],
        caption: "Count recovery, parent stay and fitness to fly vary between children.",
        fit: "contain",
      },
    ],
  };
}

function pediatricDrivers(...specific: LabelledDetail[]): LabelledDetail[] {
  return [
    ...specific,
    { label: "Paediatric isolation nights", detail: "A longer aplastic period adds ward, pharmacy and blood-product use." },
    { label: "Parent rooming-in and nearby lodging", detail: "Whether a parent bed is inside the quote changes the family budget." },
    { label: "Infection, transfusion or intensive care", detail: "Complications are not predictable package add-ons." },
    { label: "Weight-based pharmacy", detail: "Doses, levels and extra medicines scale with the child’s size and protocol." },
    { label: "Unplanned change of donor or product", detail: "A different graft describes a different episode and invoice." },
  ];
}

const profiles: PediatricHematologyProfile[] = [
  {
    procedure: "Pediatric Bone Marrow Transplantation",
    shortName: "pediatric bone marrow transplantation",
    briefName: "Pediatric Bone Marrow Transplantation",
    specialist: "pediatric transplant hematologist",
    definition:
      "Pediatric bone marrow transplantation is a children’s-unit haematopoietic transplant: weight-based conditioning, a named paediatric isolation floor and a parent who can stay through the infection window, rather than an adult transplant admission that happens to accept a child.",
    candidacy:
      "It may be discussed for selected paediatric leukaemias, marrow-failure syndromes, inherited marrow or immune disorders and a small number of solid tumours when a paediatric transplant team judges that the expected benefit justifies the risk after disease control and organ fitness are reviewed.",
    distinction:
      "The product is the paediatric programme, not the familiar adult phrase ‘bone marrow transplant’. Adult Bone Marrow Transplantation in this catalog is a separate Medical Oncology sheet; this page is about where the child sleeps, who doses the medicines, and whether a parent can remain on the isolation floor.",
    scopeShort:
      "Whether the child is admitted to a paediatric transplant unit with parent rooming-in, or to an adult floor, changes both safety planning and the bill.",
    limits:
      "A brochure that treats ‘all ages’ is not an indication. Uncontrolled infection, inadequate disease control, lack of a parent who can stay, or absence of paediatric intensive care can make travel unsafe or require care nearer home.",
    evaluation:
      "Review includes age-specific diagnosis and response, growth and nutrition, prior treatment and organ toxicity, infection and vaccination history, transfusion records, HLA and donor options, and a written plan for who stays with the child overnight.",
    process:
      "After eligibility and donor or graft confirmation, the child receives protocol-defined conditioning dosed to weight and age, then the planned graft. Counts fall; the paediatric unit manages infection precautions, transfusions and mucositis while a parent remains nearby.",
    setting:
      "Care belongs on a paediatric transplant or isolation ward with paediatric intensive-care backup, a blood bank used to children, and nursing that already runs this pathway — not a first international experiment on an adult floor.",
    duration: "work-up precedes a multi-week isolation admission, commonly followed by nearby outpatient monitoring until the team agrees travel is reasonable",
    stayGlance: "Six to twelve weeks with a parent nearby",
    admission:
      "The stored stay is six to twelve weeks with a parent nearby. Discharge from isolation follows counts, infection stability and the unit’s own criteria rather than a package day.",
    recovery:
      "Fatigue, appetite, line care and immune recovery continue after the first neutrophils appear. School, live vaccines and crowded places wait for explicit paediatric advice.",
    travel:
      "Long-haul travel waits for count recovery, controlled infection, reliable medicines and a receiving paediatric haematologist. Do not book departure for the day counts first rise.",
    followUp:
      "The paediatric transplant team monitors counts, infection, medicines and disease response, then hands care to a home paediatric haematologist with vaccination, growth and late-effect plans.",
    risks:
      "Important risks include severe infection during neutropenia, mucositis, bleeding, organ toxicity from conditioning, graft failure, graft-versus-host disease when a donor graft is used, infertility and treatment-related death. Likelihood is individual and is not stated as a percentage here.",
    urgent: "fever, rigors, uncontrolled diarrhoea or vomiting, bleeding, breathing difficulty, new confusion or a central-line problem",
    lateEffects:
      "Children need a written plan for growth, endocrine follow-up, fertility counselling appropriate to age, revaccination and school return. Those visits are part of paediatric transplant care and are often excluded from the admission letter.",
    caregiver:
      "One capable parent or guardian usually stays through isolation. Confirm whether a parent bed is inside the room, whether a second adult can rotate, and how meals, laundry and night calls to the paediatric desk work.",
    unitFocus:
      "Paediatric nursing, child-life support, weight-based pharmacy and a parent who can remain are the clinical setting. Transferring a child to an adult transplant floor because a bed is free is a different service and should be named before you travel.",
    graftOrDonor:
      "The quotation must still name autologous versus allogeneic intent and the graft source, because those choices live on other catalog sheets. This page’s job is to insist that whatever graft is used is delivered as a children’s-unit protocol with parent stay, not as an adult programme with a paediatric add-on.",
    consent:
      "Consent is given by parents or legal guardians after age-appropriate explanation to the child. If a sibling will donate, that child needs a separate assessment and cannot be treated as a convenience donor for the recipient’s itinerary.",
    approaches: [
      { label: "Paediatric isolation-unit transplant", detail: "The intended setting: children’s nursing, parent rooming-in and paediatric intensive-care backup." },
      { label: "Age- and weight-based conditioning", detail: "Doses follow paediatric protocols; adult milligram charts are not interchangeable." },
      { label: "Adult-floor admission", detail: "Not equivalent even if the hospital performs adult transplants; name the actual ward before comparing quotes." },
    ],
    drivers: pediatricDrivers(
      { label: "Paediatric-unit versus adult-floor admission", detail: "Nursing, pharmacy, isolation and parent stay are different resources." },
      { label: "Age, weight and conditioning protocol", detail: "Paediatric regimens and monitoring are not scaled-down adult packages." },
      { label: "Diagnosis-specific disease control", detail: "Bridging therapy needed to reach the assumed remission is usually extra." },
    ),
    records: [
      "Paediatric diagnosis, genetics and response marrow reports",
      "Growth chart, nutrition and vaccination record",
      "Transfusion, infection and central-line history",
      "HLA reports and any donor work already done",
      "Prior paediatric chemotherapy or radiation summaries",
    ],
    quoteQuestions: [
      "Is the child admitted to a paediatric transplant unit, and can a parent stay overnight?",
      "Which weight-based conditioning protocol is priced?",
      "Which paediatric intensive-care nights are assumed?",
      "Are child-life, school-liaison and late-effect visits included?",
      "What happens if the adult floor is offered instead of the children’s unit?",
    ],
    related: [
      "Hematopoietic Stem Cell Transplantation",
      "Matched Sibling Donor Transplant",
      "Bone Marrow Biopsy",
    ],
    campusFocus:
      "Confirm that the named campus runs a children’s transplant programme rather than boarding a child on an adult isolation ward.",
    imageAlts: [
      "Pediatric bone marrow transplantation illustrated for a pediatric hematology pathway with a child on an isolation ward and a parent nearby",
      "Pediatric hematology pathway showing records review, weight-based conditioning, graft infusion and parent-supported isolation",
      "Pediatric hematology recovery after bone marrow transplantation including count checks, vaccines and fitness to fly",
    ],
  },
  {
    procedure: "Matched Sibling Donor Transplant",
    shortName: "matched sibling donor transplant",
    briefName: "Matched Sibling Donor Transplant",
    specialist: "pediatric transplant hematologist",
    definition:
      "A matched sibling donor transplant is an allogeneic transplant in which a brother or sister is a fully HLA-matched donor after independent medical assessment, not simply because the children share a household.",
    candidacy:
      "It may be considered when allogeneic transplant is indicated for a child and high-resolution typing shows a suitable HLA-identical sibling who is medically fit to donate, after disease status, infection and family counselling are reviewed.",
    distinction:
      "A fully matched sibling is a different donor class from a haploidentical parent and from a matched unrelated registry donor. Those routes have their own catalog sheets. This page is about confirmatory HLA identity, the ethics of a child donor, and how sibling harvest is sequenced with the recipient’s conditioning.",
    scopeShort:
      "Whether the quote assumes an HLA-identical sibling harvest, a haploidentical parent or a registry donor changes the clinical episode and the bill.",
    limits:
      "Sharing a home is not a match. Donor-specific antibodies, an unfit sibling, active infection in either child, or a family that cannot support two simultaneous medical events can make this route unsafe or require another donor plan.",
    evaluation:
      "Work-up includes high-resolution HLA typing of the recipient and proposed sibling, confirmatory typing, infectious and organ screening of both children, donor-specific antibody review, and a written plan for who consents for the donor child.",
    process:
      "The sibling donor undergoes an independent paediatric assessment, then marrow harvest or, less often in young children, peripheral-blood collection. The recipient starts conditioning only after the graft is secured. Infusion is followed by graft-versus-host prevention and infection surveillance.",
    setting:
      "Both children need a paediatric hospital that can anaesthetise a donor child, run a transplant isolation floor for the recipient, and keep their pathways medically separate so the donor is not treated as a convenience.",
    duration: "family typing and dual work-up precede the recipient’s multi-week isolation admission, with the donor child’s recovery measured in days and the recipient’s immune recovery in months",
    stayGlance: "Six to ten weeks with a parent nearby",
    admission:
      "The stored stay is six to ten weeks with a parent nearby for the recipient. The donor child’s admission is usually much shorter and should be quoted as its own episode.",
    recovery:
      "The recipient’s count recovery is only the first milestone. Graft-versus-host disease, viral reactivation and immunosuppressant management continue. The donor child needs a separate pain, bleeding and school-return plan.",
    travel:
      "The recipient flies only after stable engraftment and explicit clearance. The donor child should not be assumed fit to travel on the recipient’s timetable; each child needs their own fitness-to-fly decision.",
    followUp:
      "Shared-care notes should cover chimerism, infection, immunosuppressant levels, GVHD review, the donor child’s recovery, and later vaccination of the recipient.",
    risks:
      "Recipient risks include graft failure, severe infection, acute or chronic graft-versus-host disease, viral reactivation, organ toxicity, relapse and treatment-related death. The donor child faces anaesthesia, pain, bleeding, iron loss and, rarely, collection complications. Neither child’s risk is a promised percentage.",
    urgent: "fever, rash, jaundice, persistent diarrhoea, breathing difficulty, bleeding, missed immunosuppressants, or donor-site bleeding that does not stop",
    lateEffects:
      "The recipient needs growth, fertility, endocrine and vaccine counselling. The donor child needs a documented recovery review and should not be lost to follow-up because attention shifts to the recipient.",
    caregiver:
      "One parent cannot safely be the sole overnight carer for both a donor child waking from anaesthesia and a recipient entering isolation. Ask how the unit staffs two paediatric events in one family and where each child sleeps.",
    unitFocus:
      "Matched sibling work is a two-patient paediatric operation. A unit that can transplant adults but cannot assess, anaesthetise and recover a child donor is not offering this pathway, even if HLA typing was done elsewhere.",
    graftOrDonor:
      "HLA identity must be confirmed at high resolution, not inferred from a family story. Marrow harvest remains common in paediatric sibling donation because cell dose per kilogram and graft-versus-host considerations differ from adult peripheral-blood practice. Haploidentical and matched-unrelated options stay on their own pages if the sibling is not suitable.",
    consent:
      "The donor child requires an independent paediatric clinician and, where the hospital uses one, a donor advocate. Parents consent for both children, but the donor’s welfare is a separate duty and is not satisfied by the recipient’s transplant consent form.",
    approaches: [
      { label: "HLA-identical sibling marrow harvest", detail: "The usual paediatric donor collection after independent fitness review and anaesthesia." },
      { label: "Sibling peripheral-blood collection", detail: "Used selectively; growth-factor exposure and venous access in a child need explicit justification." },
      { label: "Alternative donor if the sibling is unfit", detail: "Haploidentical or unrelated routes are different episodes with different timing and charges." },
    ],
    drivers: pediatricDrivers(
      { label: "Confirmatory HLA identity and dual screening", detail: "Both children need typing, infection tests and organ review." },
      { label: "Donor-child harvest setting", detail: "Anaesthesia, marrow harvest or apheresis is a separate paediatric episode." },
      { label: "Graft-versus-host prevention", detail: "Medicines, levels and monitoring follow the allogeneic sibling protocol." },
    ),
    records: [
      "Recipient diagnosis, genetics and disease-status reports",
      "High-resolution HLA reports for both children",
      "Donor-child health, infection and anaesthesia history",
      "Recipient infection, transfusion and prior-treatment records",
      "Family counselling or ethics notes if already written",
    ],
    quoteQuestions: [
      "Is confirmatory high-resolution HLA identity included for both children?",
      "Who independently assesses and consents the donor child?",
      "Is sibling marrow harvest or peripheral-blood collection assumed, and is anaesthesia included?",
      "Are the donor admission and the recipient isolation quoted as separate episodes?",
      "What is the contingency if the sibling is found unfit after travel?",
    ],
    related: [
      "Pediatric Bone Marrow Transplantation",
      "Haploidentical Stem Cell Transplant",
      "Matched Unrelated Donor Transplant",
    ],
    campusFocus:
      "Confirm that the campus can assess and recover a child donor as well as isolate the recipient, and that those two pathways are staffed separately.",
    imageAlts: [
      "Matched sibling donor transplant illustrated for a pediatric hematology pathway with HLA-identical brother or sister donation",
      "Pediatric hematology sibling-donor pathway showing confirmatory HLA typing, independent donor assessment and harvest",
      "Pediatric hematology recovery after matched sibling donor transplant including donor wound care and recipient counts",
    ],
  },
  {
    procedure: "Hematopoietic Stem Cell Transplantation",
    shortName: "hematopoietic stem cell transplantation",
    briefName: "Hematopoietic Stem Cell Transplantation",
    specialist: "pediatric transplant hematologist",
    definition:
      "Hematopoietic stem cell transplantation in this catalog is the paediatric graft-source programme: marrow, peripheral-blood stem cells or cord blood chosen and dosed for a child’s weight, delivered by a named paediatric transplant physician on a unit that already treats children.",
    candidacy:
      "It may be considered for paediatric leukaemia, marrow failure or selected solid tumours when a paediatric transplant meeting has named the graft source, the cell-dose target and the unit that will isolate the child.",
    distinction:
      "Adult Stem Cell Transplantation and Bone Marrow Transplantation sheets explain autologous versus allogeneic intent in general terms. This page is about which product a child actually receives — marrow, peripheral blood or cord — and whether the cell dose per kilogram can be met.",
    scopeShort:
      "Whether the plan is a marrow harvest, a peripheral-blood collection or a cord-blood unit, and whether the cell dose per kilogram is adequate, changes the episode and the bill.",
    limits:
      "A stored cord unit or an adult apheresis service on site is not an indication. Inadequate cell dose, uncontrolled infection, missing paediatric transplant cover or a first international case at that campus can require a different plan.",
    evaluation:
      "Planning names the graft source, predicted nucleated-cell or CD34 dose per kilogram, HLA if a donor product is used, the child’s weight trajectory, infection screen and the paediatric unit that will infuse and isolate.",
    process:
      "The selected product is collected or released and tested. After conditioning, the graft is infused and the child is monitored for engraftment, infection and, where relevant, graft-versus-host disease.",
    setting:
      "The named product is a paediatric transplant physician and a unit that already infuses children — marrow harvests, cord-blood handling or paediatric apheresis as required — not a laboratory that has processed adult grafts and is willing to try.",
    duration: "graft-source confirmation and cell-dose planning precede conditioning, infusion and commonly four to ten weeks in or near the paediatric unit",
    stayGlance: "Four to ten weeks in a paediatric unit",
    admission:
      "The stored stay is four to ten weeks in a paediatric unit. Cord-blood engraftment can be slower than marrow or peripheral-blood grafts, which can extend isolation without anyone having made a billing error.",
    recovery:
      "Time to count recovery depends on the graft source and cell dose, not on a hotel checkout date. Immune reconstitution, line care and infection precautions continue after the first neutrophils.",
    travel:
      "Fitness to fly follows graft function, infection stability and a receiving paediatric haematologist who understands the graft source used. A cord-blood recipient may need a longer nearby stay than a well-dosed marrow graft.",
    followUp:
      "The plan should name chimerism or graft-function tests appropriate to the product, infection surveillance, vaccination, and who stores leftover or backup product information.",
    risks:
      "Risks include delayed or failed engraftment, especially when cell dose is marginal, severe infection, organ toxicity from conditioning, graft-versus-host disease with allogeneic products, relapse and treatment-related death. Cord, marrow and peripheral-blood products do not share one risk profile.",
    urgent: "fever, bleeding, breathing difficulty, severe mucositis preventing medicines, line problems or a sudden drop in already-recovering counts",
    lateEffects:
      "Graft source does not remove the need for growth, fertility, endocrine and school counselling. Cord-blood recipients may have a different immune-reconstitution timetable, which should appear in the handover, not only in the admission brochure.",
    caregiver:
      "A parent still needs to stay through isolation regardless of whether the graft is marrow, peripheral blood or cord. Ask where the parent sleeps and how quickly they can reach the paediatric desk if the child spikes a fever at nearby lodging.",
    unitFocus:
      "Cell processing, product storage and paediatric infusion competence sit together. A campus that can collect adult peripheral-blood stem cells but cannot dose, thaw or infuse a paediatric cord unit is offering a different service from the name on this page.",
    graftOrDonor:
      "Marrow remains a common paediatric graft because surgeons can target a nucleated-cell dose for a small recipient. Peripheral-blood collections are used when protocols specify them. Cord-blood units are selected by HLA, cell dose and the child’s weight; an undersized unit is a clinical problem, not a cheaper variant.",
    consent:
      "Parents consent to a named product and cell-dose target, including what happens if the collected or released unit is inadequate. Age-appropriate explanation to the child still applies. A donor child, if any, is consented on the sibling or haploidentical pathway, not as a footnote here.",
    approaches: [
      { label: "Paediatric bone-marrow graft", detail: "Harvest planned to a nucleated-cell dose per kilogram for the recipient’s current weight." },
      { label: "Paediatric peripheral-blood stem cells", detail: "Apheresis when the protocol specifies it; venous access and growth-factor use must be explicit." },
      { label: "Umbilical cord-blood unit", detail: "Selected by HLA and cell dose; thawing, infusion and slower engraftment are part of the quoted pathway." },
    ],
    drivers: pediatricDrivers(
      { label: "Graft source and cell dose per kilogram", detail: "Marrow, peripheral blood and cord are different products and invoices." },
      { label: "Product processing, storage and thaw", detail: "Laboratory handling of a paediatric or cord unit is not an adult apheresis fee." },
      { label: "Engraftment tempo", detail: "Slower count recovery, especially after cord blood, adds isolation and supportive care." },
    ),
    records: [
      "Paediatric diagnosis and disease-status marrow reports",
      "Current weight, growth chart and transfusion history",
      "Proposed graft-source report, cell-dose calculation or cord-unit details",
      "HLA reports when an allogeneic product is planned",
      "Infection screen and prior paediatric treatment summaries",
    ],
    quoteQuestions: [
      "Which graft source and cell-dose target per kilogram does the quote assume?",
      "Is marrow harvest, paediatric apheresis or cord-unit procurement included?",
      "What happens if the collected or released product is below the target dose?",
      "Are thaw, processing and backup-product fees included?",
      "Is slower cord-blood engraftment reflected in the isolation-night allowance?",
    ],
    related: [
      "Pediatric Bone Marrow Transplantation",
      "Autologous Stem Cell Transplant",
      "Allogeneic Stem Cell Transplant",
    ],
    campusFocus:
      "Confirm that the campus already infuses the named paediatric graft source, including cord-blood handling if that is the plan, rather than improvising from an adult laboratory.",
    imageAlts: [
      "Hematopoietic stem cell transplantation illustrated for a pediatric hematology pathway with marrow, peripheral-blood and cord graft sources",
      "Pediatric hematology graft-source pathway comparing marrow harvest, peripheral-blood collection and cord-blood cell dose",
      "Pediatric hematology recovery after HSCT showing isolation, graft-source-dependent count recovery and fitness to fly",
    ],
  },
];

export const pediatricHematologyArticles: CostArticle[] = profiles.map(createPediatricHematologyArticle);

export const pediatricHematologyArticlesBySlug: Record<string, CostArticle> = Object.fromEntries(
  pediatricHematologyArticles.map((article) => [article.slug, article]),
);
