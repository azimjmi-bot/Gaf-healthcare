export type Treatment = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  image: string;
  usRange: string;
  partnerRange: string;
  stay: string;
  hospitalSlugs: string[];
  conditions: string[];
  procedures: string[];
  includes: string[];
  notes: string;
};

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  country: string;
  accreditation: string;
  focus: string;
  image: string;
  summary: string;
  languages: string;
  icu: string;
};

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  hospitalSlug: string;
  specialty: string;
  treatmentSlugs: string[];
  credentials: string;
  languages: string;
  years: string;
  cases: string;
  image: string;
  bio: string;
};

export type Story = {
  slug: string;
  name: string;
  from: string;
  treatment: string;
  destination: string;
  quote: string;
  detail: string;
  savings: string;
};

export const treatments: Treatment[] = [
  {
    slug: "facial-aesthetics",
    name: "Facial aesthetics",
    category: "Cosmetic",
    summary:
      "Rhinoplasty, deep-plane facelift, eyelid surgery, and fat grafting planned as a single facial architecture — not a menu of add-ons.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
    usRange: "$18,000–$45,000",
    partnerRange: "$6,800–$16,500",
    stay: "10–14 nights",
    hospitalSlugs: ["cheongdam-atelier", "sukhumvit-campus", "bosphorus-international", "marina-private"],
    conditions: ["Facial aging", "Nasal deformity", "Eyelid ptosis"],
    procedures: ["Deep-plane facelift", "Rhinoplasty", "Blepharoplasty"],
    includes: [
      "3D imaging and surgeon matching",
      "Pre-op labs and anesthesia review",
      "Private recovery suite",
      "Stitch removal and virtual follow-up",
    ],
    notes:
      "We never book a surgeon you have not video-met. Revision cases are routed only to high-volume revision specialists.",
  },
  {
    slug: "hair-restoration",
    name: "Hair restoration",
    category: "Cosmetic",
    summary:
      "FUE and DHI programs with published graft survival, not shop-front mill clinics. Density planning is reviewed by a Velora medical advisor before you fly.",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=80",
    usRange: "$12,000–$20,000",
    partnerRange: "$2,400–$5,800",
    stay: "4–6 nights",
    hospitalSlugs: ["bosphorus-international", "marina-private"],
    conditions: ["Androgenetic alopecia", "Hair loss"],
    procedures: ["FUE", "DHI", "PRP"],
    includes: [
      "Trichoscopy and graft map",
      "Hotel with clinic transfer",
      "PRP protocol where indicated",
      "12-month growth check-ins",
    ],
    notes:
      "Maximum daily graft caps are enforced. We decline clinics that overharvest donor areas.",
  },
  {
    slug: "dental-reconstruction",
    name: "Dental reconstruction",
    category: "Dental",
    summary:
      "Full-arch implants, veneers, and smile design with in-house labs so you are not waiting on a second city for the prosthesis.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    usRange: "$28,000–$60,000",
    partnerRange: "$8,500–$19,000",
    stay: "7–12 nights (or two visits)",
    hospitalSlugs: ["bosphorus-international", "sukhumvit-campus", "polanco-surgical"],
    conditions: ["Edentulism", "Failed dentition"],
    procedures: ["Full-arch implants", "Veneers", "Smile design"],
    includes: [
      "CBCT and digital smile design",
      "Provisional and final prosthesis",
      "Night-guard and hygiene kit",
      "Warranty handled through Velora",
    ],
    notes:
      "Bone-graft and sinus-lift cases are staged. We will tell you honestly if two trips are safer than one.",
  },
  {
    slug: "orthopedics",
    name: "Joints & orthopedics",
    category: "Surgical",
    summary:
      "Hip and knee replacement, spine decompression, and sports reconstruction with robotic systems and accelerated rehab protocols.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    usRange: "$35,000–$80,000",
    partnerRange: "$11,000–$28,000",
    stay: "12–18 nights",
    hospitalSlugs: ["orchard-precision", "polanco-surgical", "marina-private", "sukhumvit-campus"],
    conditions: ["Osteoarthritis", "Joint pain", "Spine degeneration"],
    procedures: ["Hip replacement", "Knee replacement", "Spine decompression"],
    includes: [
      "Implant brand of record",
      "Physiotherapy from day one",
      "Companion lodging",
      "Fit-to-fly clearance",
    ],
    notes:
      "BMI, bone quality, and prior hardware are reviewed before a hospital is even proposed.",
  },
  {
    slug: "cardiac",
    name: "Cardiac care",
    category: "Surgical",
    summary:
      "Angioplasty, bypass, and valve programs in hospitals with 24/7 cath labs and published mortality dashboards.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    usRange: "$80,000–$180,000",
    partnerRange: "$18,000–$42,000",
    stay: "10–16 nights",
    hospitalSlugs: ["orchard-precision", "marina-private", "sukhumvit-campus"],
    conditions: ["Coronary artery disease", "Valvular disease"],
    procedures: ["Angioplasty", "Bypass", "Valve repair"],
    includes: [
      "Records assembled into a single dossier",
      "Second-opinion panel before travel",
      "ICU-capable hospital only",
      "Medevac protocol on file",
    ],
    notes:
      "Cardiac cases require a physician-to-physician handoff. Velora will not book on price alone.",
  },
  {
    slug: "fertility",
    name: "Fertility & IVF",
    category: "Reproductive",
    summary:
      "IVF, egg freezing, and donor pathways in labs with transparent success rates, not marketing percentages.",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3b8c5?auto=format&fit=crop&w=1600&q=80",
    usRange: "$18,000–$30,000 / cycle",
    partnerRange: "$4,800–$9,500 / cycle",
    stay: "Flexible; often 2 visits",
    hospitalSlugs: ["orchard-precision", "marina-private", "sukhumvit-campus", "bosphorus-international"],
    conditions: ["Infertility", "Diminished ovarian reserve"],
    procedures: ["IVF", "Egg freezing"],
    includes: [
      "Protocol designed with your home OB",
      "Medication logistics",
      "Embryo storage year one",
      "Counseling session",
    ],
    notes:
      "Legal frameworks for donors and surrogacy differ by country. We brief you in writing before any deposit.",
  },
  {
    slug: "oncology",
    name: "Oncology pathways",
    category: "Complex care",
    summary:
      "Second opinions, proton and precision programs, and surgery at campuses that already treat international oncology patients at volume.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    usRange: "Varies widely",
    partnerRange: "Quoted after records review",
    stay: "By protocol",
    hospitalSlugs: ["orchard-precision", "marina-private", "cheongdam-atelier"],
    conditions: ["Solid tumors", "Cancer second opinion"],
    procedures: ["Tumor board review", "Oncologic surgery"],
    includes: [
      "Tumor board review",
      "Pathology re-read",
      "Treatment calendar",
      "Family housing options",
    ],
    notes:
      "This is not a discount pathway. It is a speed-and-access pathway when wait times or insurance walls at home are the problem.",
  },
  {
    slug: "bariatric",
    name: "Bariatric & metabolic",
    category: "Surgical",
    summary:
      "Sleeve and bypass with mandatory nutritional follow-up. We decline any program that treats this as a three-day tourist package.",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1600&q=80",
    usRange: "$18,000–$35,000",
    partnerRange: "$5,500–$11,000",
    stay: "7–10 nights",
    hospitalSlugs: ["bosphorus-international", "polanco-surgical", "sukhumvit-campus"],
    conditions: ["Obesity", "Metabolic syndrome"],
    procedures: ["Gastric sleeve", "Gastric bypass"],
    includes: [
      "Dietitian-led prep",
      "Leak test and imaging",
      "12-month remote follow-up",
      "Vitamin protocol",
    ],
    notes:
      "Sleep apnea, reflux, and diabetes status change which procedure we will even discuss.",
  },
];

export const hospitals: Hospital[] = [
  {
    slug: "cheongdam-atelier",
    name: "Cheongdam Atelier Hospital",
    city: "Seoul",
    country: "South Korea",
    accreditation: "JCI",
    focus: "Facial architecture & dermatology",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A private Gangnam campus built for international facial work: same-day 3D imaging, reserved theatre blocks, and recovery suites a walk from Cheongdam.",
    languages: "English, Korean, Mandarin",
    icu: "Level II · overnight observation floors",
  },
  {
    slug: "bosphorus-international",
    name: "Bosphorus International",
    city: "Istanbul",
    country: "Türkiye",
    accreditation: "JCI · ISO 9001",
    focus: "Hair, dental, bariatric",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "High-volume specialist teams with a dedicated international ward and published complication dashboards. Recovery on the European shore.",
    languages: "English, Turkish, Arabic, German",
    icu: "Full ICU · 24/7 on-call",
  },
  {
    slug: "sukhumvit-campus",
    name: "Sukhumvit Medical Campus",
    city: "Bangkok",
    country: "Thailand",
    accreditation: "JCI",
    focus: "Multi-specialty elective & wellness",
    image:
      "https://images.unsplash.com/photo-1538108142413-76d1c2d5d0c2?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A hotel-grade campus with full ICU, in-house labs, and apartments for longer recoveries. Ideal for multi-procedure plans.",
    languages: "English, Thai, Japanese, Arabic",
    icu: "Tertiary ICU · on-campus hotel",
  },
  {
    slug: "marina-private",
    name: "Marina Private Hospital",
    city: "Dubai",
    country: "United Arab Emirates",
    accreditation: "JCI · DHA",
    focus: "Cardiac, diagnostics, aesthetics",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Western protocols, private floors, and hotel-connected wards. Preferred for executive physicals, cardiology, and discreet aesthetic work.",
    languages: "English, Arabic, Hindi, French",
    icu: "24/7 cath lab · cardiac ICU",
  },
  {
    slug: "orchard-precision",
    name: "Orchard Precision Centre",
    city: "Singapore",
    country: "Singapore",
    accreditation: "JCI · MOH",
    focus: "Oncology & cardiac",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    summary:
      "When the brief is certainty: tumor boards, re-reads, and cardiac surgery at a campus that already treats international patients at volume.",
    languages: "English, Mandarin, Malay",
    icu: "Tertiary ICU · oncology isolation",
  },
  {
    slug: "polanco-surgical",
    name: "Polanco Surgical Institute",
    city: "Mexico City",
    country: "Mexico",
    accreditation: "JCI · CSG",
    focus: "Dental, joints, metabolic",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
    summary:
      "US-trained specialists three hours from Texas. Family rooms, time-zone overlap, and in-house dental labs for full-arch work.",
    languages: "English, Spanish",
    icu: "Surgical ICU · companion rooms",
  },
];

export const doctors: Doctor[] = [
  {
    slug: "min-seo-park",
    name: "Dr. Min-seo Park",
    title: "Facial architecture",
    hospitalSlug: "cheongdam-atelier",
    specialty: "Plastic surgery",
    treatmentSlugs: ["facial-aesthetics"],
    credentials: "Board-certified, Korean Society of Plastic Surgery · Harvard observership",
    languages: "English, Korean",
    years: "18 years",
    cases: "2,400+ facial procedures",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Park treats the face as a single plane — rhinoplasty, lids, and deep-plane work planned together. She declines add-on lists that do not serve the architecture.",
  },
  {
    slug: "hana-lee",
    name: "Dr. Hana Lee",
    title: "Dermatologic surgery",
    hospitalSlug: "cheongdam-atelier",
    specialty: "Dermatology",
    treatmentSlugs: ["facial-aesthetics"],
    credentials: "Seoul National University · ASDS international fellow",
    languages: "English, Korean, Mandarin",
    years: "14 years",
    cases: "Energy and injectables protocols published annually",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Lee runs the non-surgical floor at Cheongdam: lasers, scar revision, and skin quality work sequenced around any theatre date so recovery is not guesswork.",
  },
  {
    slug: "emre-yildiz",
    name: "Dr. Emre Yıldız",
    title: "Hair restoration",
    hospitalSlug: "bosphorus-international",
    specialty: "Hair surgery",
    treatmentSlugs: ["hair-restoration"],
    credentials: "ISHRS member · Istanbul University",
    languages: "English, Turkish, German",
    years: "16 years",
    cases: "FUE capped at 3,500 grafts/day",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Yıldız will not overharvest. Density maps are reviewed by Velora before you fly; donor area photography is part of every discharge pack.",
  },
  {
    slug: "leyla-kaplan",
    name: "Dr. Leyla Kaplan",
    title: "Prosthodontics",
    hospitalSlug: "bosphorus-international",
    specialty: "Dental reconstruction",
    treatmentSlugs: ["dental-reconstruction"],
    credentials: "Board prosthodontist · in-house digital lab director",
    languages: "English, Turkish, Arabic",
    years: "12 years",
    cases: "Full-arch and smile design",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Kaplan’s lab sits on the same floor as theatre. Provisionals and finals are not couriered across a city — which is why two-visit cases are the exception, not the rule.",
  },
  {
    slug: "niran-chaiwat",
    name: "Dr. Niran Chaiwat",
    title: "Aesthetic & reconstructive",
    hospitalSlug: "sukhumvit-campus",
    specialty: "Plastic surgery",
    treatmentSlugs: ["facial-aesthetics", "bariatric"],
    credentials: "Thai Board · ASAPS international",
    languages: "English, Thai",
    years: "20 years",
    cases: "Body and facial combined plans",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Chaiwat prefers longer, gentler recoveries on campus. Combined procedures are staged against BMI, anemia, and a written nutrition plan — not a tourist calendar.",
  },
  {
    slug: "amira-hassan",
    name: "Dr. Amira Hassan",
    title: "Interventional cardiology",
    hospitalSlug: "marina-private",
    specialty: "Cardiology",
    treatmentSlugs: ["cardiac"],
    credentials: "Cleveland Clinic trained · DHA consultant",
    languages: "English, Arabic, French",
    years: "19 years",
    cases: "PCI, valves, complex CAD",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Hassan will not accept a case on price. Records are reviewed physician-to-physician; medevac protocol is on file before you book a flight.",
  },
  {
    slug: "wei-tan",
    name: "Dr. Wei Tan",
    title: "Surgical oncology",
    hospitalSlug: "orchard-precision",
    specialty: "Oncology",
    treatmentSlugs: ["oncology"],
    credentials: "NCCS · FRCS · tumor board chair",
    languages: "English, Mandarin",
    years: "22 years",
    cases: "GI, breast, precision pathways",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Tan’s pathway starts with a re-read, not a quote. If Singapore is not the right campus, the dossier says so in writing.",
  },
  {
    slug: "ananya-rao",
    name: "Dr. Ananya Rao",
    title: "Reproductive medicine",
    hospitalSlug: "orchard-precision",
    specialty: "Fertility",
    treatmentSlugs: ["fertility"],
    credentials: "MRCOG · ESHRE certified lab",
    languages: "English, Tamil, Mandarin",
    years: "15 years",
    cases: "IVF, egg freeze, donor briefings",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Rao’s lab publishes real rates, not marketing percentages. A third cycle is sometimes advised against — and that letter is part of the product.",
  },
  {
    slug: "sofia-reyes",
    name: "Dr. Sofía Reyes",
    title: "Adult reconstruction",
    hospitalSlug: "polanco-surgical",
    specialty: "Orthopedics",
    treatmentSlugs: ["orthopedics"],
    credentials: "AAOS international · robotic hip/knee",
    languages: "English, Spanish",
    years: "17 years",
    cases: "Primary and revision joints",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Reyes uses implant brands of record and starts physiotherapy on day one. Fit-to-fly is not a suggestion — it is a signed clearance.",
  },
  {
    slug: "miguel-orta",
    name: "Dr. Miguel Orta",
    title: "Metabolic surgery",
    hospitalSlug: "polanco-surgical",
    specialty: "Bariatric",
    treatmentSlugs: ["bariatric"],
    credentials: "IFSO · US fellowship",
    languages: "English, Spanish",
    years: "13 years",
    cases: "Sleeve and bypass with 12-month follow-up",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Orta declines three-day tourist packages. Sleep apnea, reflux, and diabetes status decide the procedure — not the brochure.",
  },
];

export const stories: Story[] = [
  {
    slug: "elena",
    name: "Elena M.",
    from: "Austin, USA",
    treatment: "Deep-plane facelift",
    destination: "Seoul",
    quote: "I expected a clinic. I got a private floor, a coordinator who texted my daughter, and a surgeon who refused a procedure I did not need.",
    detail:
      "Elena flew with a companion for twelve nights in Cheongdam. Two virtual consults preceded the trip. At six months she had stitch-level photos reviewed by the same surgeon — from home.",
    savings: "Quoted $38k in Dallas · completed at $14.2k all-in",
  },
  {
    slug: "james",
    name: "James R.",
    from: "Manchester, UK",
    treatment: "FUE 3,200 grafts",
    destination: "Istanbul",
    quote: "Every mill clinic wanted 5,000 grafts in a day. Velora capped me at 3,200 and the donor area still looks like hair.",
    detail:
      "James stayed five nights on the Bosphorus. PRP on day 8 was done locally in Manchester under a protocol Velora sent to his GP.",
    savings: "UK private quote £14k · completed at £3.9k including hotel",
  },
  {
    slug: "priya",
    name: "Priya & Arun S.",
    from: "Dubai / London",
    treatment: "IVF, two cycles",
    destination: "Singapore",
    quote: "We needed a lab that would tell us the real numbers. The coordinator sat with us while the embryologist explained the report line by line.",
    detail:
      "Two short stays. Medications shipped ahead. A third cycle was advised against — and they put that in writing.",
    savings: "Not the point — wait time at home was eleven months",
  },
];

export const steps = [
  {
    n: "01",
    title: "Tell us the brief",
    body: "A 12-minute intake. Records if you have them. What you want — and what you will not accept.",
  },
  {
    n: "02",
    title: "We assemble a dossier",
    body: "Two or three matched surgeons, hospital CVs, all-in cost, stay length, and the questions we want you to ask on video.",
  },
  {
    n: "03",
    title: "You meet them on camera",
    body: "No deposit until you have spoken to the surgeon. If the fit is wrong, we restart. That is the product.",
  },
  {
    n: "04",
    title: "Travel, theatre, recovery",
    body: "Flights, visas, transfers, a named coordinator in your time zone, and a recovery address that is not a tourist hostel.",
  },
  {
    n: "05",
    title: "Home, still held",
    body: "Wound checks, GP letters, and a 12-month line back to the operating team. You do not disappear at the airport.",
  },
];

export const faqs = [
  {
    q: "Are these hospitals actually accredited?",
    a: "We only contract JCI or equivalent national accreditation (DHA, MOH Singapore, CSG). Accreditation is verified annually, not copied from a brochure.",
  },
  {
    q: "How much do you charge?",
    a: "The consult and dossier are complimentary. If you proceed, Velora’s atelier fee is included in the all-in quote — typically 8–12% of the clinical package — covering coordination, second-opinion routing, and 12-month aftercare. No surprise add-ons after you accept.",
  },
  {
    q: "What if something goes wrong abroad?",
    a: "Every itinerary includes a written complication pathway: the on-call clinician, the hospital’s international desk, and when we escalate to local private emergency care or medevac. Complication insurance is offered on every surgical case.",
  },
  {
    q: "Can my own doctor be involved?",
    a: "Yes. We prefer it. We send a structured letter and imaging pack to your GP or specialist before you fly, and a discharge summary within 72 hours of leaving theatre.",
  },
  {
    q: "Do you handle visas and companions?",
    a: "Invitation letters, appointment confirmations, and companion lodging are standard. We do not file immigration applications, but we tell you exactly which visa class you need and the hospital letter that supports it.",
  },
  {
    q: "Is this medical advice?",
    a: "No. Velora arranges access to licensed clinicians. Treatment decisions are made between you and the operating physician. Cost ranges on this site are estimates, not offers.",
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getHospital(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

export function doctorsForHospital(slug: string) {
  return doctors.filter((d) => d.hospitalSlug === slug);
}

export function treatmentsForHospital(slug: string) {
  return treatments.filter((t) => t.hospitalSlugs.includes(slug));
}

export function doctorsForTreatment(slug: string) {
  return doctors.filter((d) => d.treatmentSlugs.includes(slug));
}
