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
  procedures: string[];
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

export const RADIATION_PROCEDURES = [
  "External Beam Radiotherapy (EBRT)",
  "3D Conformal Radiotherapy (3D-CRT)",
  "Intensity-Modulated Radiotherapy (IMRT)",
  "Image-Guided Radiotherapy (IGRT)",
  "Stereotactic Radiosurgery (SRS)",
  "Stereotactic Body Radiotherapy (SBRT)",
  "CyberKnife",
  "Gamma Knife",
  "Proton Beam Therapy",
  "Brachytherapy",
  "Intracavitary Brachytherapy",
  "Interstitial Brachytherapy",
  "Plaque Brachytherapy",
  "Intraoperative Radiotherapy (IORT)",
  "Total Body Irradiation (TBI)",
] as const;

export function radiationProcedureSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const RADIATION_HOSPITALS = [
  "cheongdam-atelier",
  "bosphorus-international",
  "sukhumvit-campus",
  "marina-private",
  "orchard-precision",
  "polanco-surgical",
  "aerocity-international",
  "gurgaon-joint-institute",
  "bandra-private",
  "whitefield-precision",
  "adyar-cardiac",
  "hitec-surgical",
];

const RADIATION_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "External Beam Radiotherapy (EBRT)": {
    us: "$12,000–$25,000",
    partner: "$4,200–$9,800",
    stay: "4–6 weeks of fractions",
  },
  "3D Conformal Radiotherapy (3D-CRT)": {
    us: "$14,000–$28,000",
    partner: "$4,800–$11,000",
    stay: "4–6 weeks of fractions",
  },
  "Intensity-Modulated Radiotherapy (IMRT)": {
    us: "$18,000–$40,000",
    partner: "$6,500–$14,500",
    stay: "4–7 weeks of fractions",
  },
  "Image-Guided Radiotherapy (IGRT)": {
    us: "$20,000–$45,000",
    partner: "$7,200–$16,000",
    stay: "4–7 weeks of fractions",
  },
  "Stereotactic Radiosurgery (SRS)": {
    us: "$25,000–$55,000",
    partner: "$8,500–$18,000",
    stay: "1–5 sessions",
  },
  "Stereotactic Body Radiotherapy (SBRT)": {
    us: "$22,000–$50,000",
    partner: "$8,000–$17,500",
    stay: "1–5 sessions",
  },
  CyberKnife: {
    us: "$30,000–$70,000",
    partner: "$11,000–$24,000",
    stay: "1–5 sessions",
  },
  "Gamma Knife": {
    us: "$28,000–$65,000",
    partner: "$10,500–$22,000",
    stay: "1 session typical",
  },
  "Proton Beam Therapy": {
    us: "$90,000–$180,000",
    partner: "$28,000–$55,000",
    stay: "4–8 weeks of fractions",
  },
  Brachytherapy: {
    us: "$15,000–$35,000",
    partner: "$5,500–$13,000",
    stay: "1–7 nights",
  },
  "Intracavitary Brachytherapy": {
    us: "$16,000–$38,000",
    partner: "$6,000–$14,000",
    stay: "1–7 nights",
  },
  "Interstitial Brachytherapy": {
    us: "$18,000–$42,000",
    partner: "$6,800–$15,500",
    stay: "2–8 nights",
  },
  "Plaque Brachytherapy": {
    us: "$20,000–$45,000",
    partner: "$7,500–$16,000",
    stay: "3–7 nights",
  },
  "Intraoperative Radiotherapy (IORT)": {
    us: "$22,000–$48,000",
    partner: "$8,200–$17,000",
    stay: "Tied to theatre stay",
  },
  "Total Body Irradiation (TBI)": {
    us: "$35,000–$80,000",
    partner: "$12,000–$28,000",
    stay: "By transplant protocol",
  },
};

export const treatments: Treatment[] = RADIATION_PROCEDURES.map((name) => {
  const cost = RADIATION_COST[name];
  return {
    slug: radiationProcedureSlug(name),
    name,
    category: "Radiation Oncology",
    summary: `Radiation Oncology — ${name} delivered at JCI-accredited partner campuses with physics QA, peer-reviewed plans, and a named radiation oncologist before you travel.`,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    usRange: cost.us,
    partnerRange: cost.partner,
    stay: cost.stay,
    hospitalSlugs: RADIATION_HOSPITALS,
    conditions: ["Solid tumors", "Cancer second opinion"],
    procedures: [name],
    includes: [
      "Simulation CT and contouring review",
      "Physics QA and peer plan check",
      "Named radiation oncologist on camera before travel",
      "Discharge summary to your home oncologist",
    ],
    notes:
      "Fractions, energy, and whether protons or brachytherapy are appropriate are decided after records review — not from a brochure price.",
  };
});

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
  {
    slug: "aerocity-international",
    name: "Aerocity International Hospital",
    city: "Delhi NCR",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Cardiac, oncology, international ward",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A private Delhi NCR campus beside the airport corridor — 24/7 cath lab, tumor board, and an international desk that meets night landings.",
    languages: "English, Hindi, Punjabi, Arabic",
    icu: "Cardiac and oncology ICU",
  },
  {
    slug: "gurgaon-joint-institute",
    name: "Gurgaon Joint Institute",
    city: "Delhi NCR",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Orthopedics & sports reconstruction",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Robotic hip and knee programmes in Gurugram with same-week physiotherapy and companion apartments for US and Gulf families.",
    languages: "English, Hindi",
    icu: "Surgical ICU",
  },
  {
    slug: "bandra-private",
    name: "Bandra Private Hospital",
    city: "Mumbai",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Fertility, cardiac, executive care",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A sea-facing private floor in Bandra West: IVF lab with published rates and a cardiology unit used to international second opinions.",
    languages: "English, Hindi, Marathi",
    icu: "Cardiac ICU · neonatal support",
  },
  {
    slug: "whitefield-precision",
    name: "Whitefield Precision Centre",
    city: "Bengaluru",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Oncology, orthopedics, diagnostics",
    image:
      "https://images.unsplash.com/photo-1538108142413-76d1c2d5d0c2?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Bengaluru’s east-side campus for tumor boards and joint replacement, with English-first coordinators for patients flying from the Gulf and Africa.",
    languages: "English, Kannada, Hindi, Tamil",
    icu: "Tertiary ICU",
  },
  {
    slug: "adyar-cardiac",
    name: "Adyar Cardiac Campus",
    city: "Chennai",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Cardiology & cardiothoracic surgery",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Chennai’s high-volume cardiac house: bypass, valves, and cath-lab programmes with published mortality dashboards.",
    languages: "English, Tamil, Hindi",
    icu: "24/7 cardiac ICU",
  },
  {
    slug: "hitec-surgical",
    name: "HITEC Surgical Institute",
    city: "Hyderabad",
    country: "India",
    accreditation: "JCI · NABH",
    focus: "Dental reconstruction, bariatric, elective surgery",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Hyderabad’s HITEC City private institute — in-house dental labs and metabolic surgery with a 12-month remote follow-up protocol.",
    languages: "English, Telugu, Hindi",
    icu: "Surgical ICU",
  },
];

export const doctors: Doctor[] = [
  {
    slug: "min-seo-park",
    name: "Dr. Min-seo Park",
    title: "Radiation oncologist",
    hospitalSlug: "cheongdam-atelier",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["external-beam-radiotherapy-ebrt", "3d-conformal-radiotherapy-3d-crt", "intensity-modulated-radiotherapy-imrt"],
    procedures: ["External Beam Radiotherapy (EBRT)", "3D Conformal Radiotherapy (3D-CRT)", "Intensity-Modulated Radiotherapy (IMRT)"],
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
    title: "Radiation oncologist",
    hospitalSlug: "cheongdam-atelier",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["intensity-modulated-radiotherapy-imrt", "image-guided-radiotherapy-igrt", "stereotactic-radiosurgery-srs"],
    procedures: ["Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)", "Stereotactic Radiosurgery (SRS)"],
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
    title: "Radiation oncologist",
    hospitalSlug: "bosphorus-international",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["stereotactic-radiosurgery-srs", "stereotactic-body-radiotherapy-sbrt", "cyberknife"],
    procedures: ["Stereotactic Radiosurgery (SRS)", "Stereotactic Body Radiotherapy (SBRT)", "CyberKnife"],
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
    title: "Radiation oncologist",
    hospitalSlug: "bosphorus-international",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["cyberknife", "gamma-knife", "proton-beam-therapy"],
    procedures: ["CyberKnife", "Gamma Knife", "Proton Beam Therapy"],
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
    title: "Radiation oncologist",
    hospitalSlug: "sukhumvit-campus",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["proton-beam-therapy", "brachytherapy", "intracavitary-brachytherapy"],
    procedures: ["Proton Beam Therapy", "Brachytherapy", "Intracavitary Brachytherapy"],
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
    title: "Radiation oncologist",
    hospitalSlug: "marina-private",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["intracavitary-brachytherapy", "interstitial-brachytherapy", "plaque-brachytherapy"],
    procedures: ["Intracavitary Brachytherapy", "Interstitial Brachytherapy", "Plaque Brachytherapy"],
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
    title: "Radiation oncologist",
    hospitalSlug: "orchard-precision",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["plaque-brachytherapy", "intraoperative-radiotherapy-iort", "total-body-irradiation-tbi"],
    procedures: ["Plaque Brachytherapy", "Intraoperative Radiotherapy (IORT)", "Total Body Irradiation (TBI)"],
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
    title: "Radiation oncologist",
    hospitalSlug: "orchard-precision",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["total-body-irradiation-tbi", "external-beam-radiotherapy-ebrt", "3d-conformal-radiotherapy-3d-crt"],
    procedures: ["Total Body Irradiation (TBI)", "External Beam Radiotherapy (EBRT)", "3D Conformal Radiotherapy (3D-CRT)"],
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
    title: "Radiation oncologist",
    hospitalSlug: "polanco-surgical",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["3d-conformal-radiotherapy-3d-crt", "intensity-modulated-radiotherapy-imrt", "image-guided-radiotherapy-igrt"],
    procedures: ["3D Conformal Radiotherapy (3D-CRT)", "Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)"],
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
    title: "Radiation oncologist",
    hospitalSlug: "polanco-surgical",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["image-guided-radiotherapy-igrt", "stereotactic-radiosurgery-srs", "stereotactic-body-radiotherapy-sbrt"],
    procedures: ["Image-Guided Radiotherapy (IGRT)", "Stereotactic Radiosurgery (SRS)", "Stereotactic Body Radiotherapy (SBRT)"],
    credentials: "IFSO · US fellowship",
    languages: "English, Spanish",
    years: "13 years",
    cases: "Sleeve and bypass with 12-month follow-up",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Orta declines three-day tourist packages. Sleep apnea, reflux, and diabetes status decide the procedure — not the brochure.",
  },
  {
    slug: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    title: "Radiation oncologist",
    hospitalSlug: "aerocity-international",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["stereotactic-body-radiotherapy-sbrt", "cyberknife", "gamma-knife"],
    procedures: ["Stereotactic Body Radiotherapy (SBRT)", "CyberKnife", "Gamma Knife"],
    credentials: "DM Cardiology · Cleveland Clinic observership · NABH consultant",
    languages: "English, Hindi",
    years: "21 years",
    cases: "PCI, valves, complex CAD",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Mehta reviews every incoming angiogram before a flight is booked. Delhi NCR is his preference when time-to-theatre matters more than a tourist itinerary.",
  },
  {
    slug: "kavita-sharma",
    name: "Dr. Kavita Sharma",
    title: "Radiation oncologist",
    hospitalSlug: "aerocity-international",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["gamma-knife", "proton-beam-therapy", "brachytherapy"],
    procedures: ["Gamma Knife", "Proton Beam Therapy", "Brachytherapy"],
    credentials: "DM Oncology · AIIMS · ESMO member",
    languages: "English, Hindi",
    years: "16 years",
    cases: "Breast, GI, precision pathways",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Sharma starts with a pathology re-read. If Delhi is not the right campus, that is the first sentence of the dossier.",
  },
  {
    slug: "rohan-malhotra",
    name: "Dr. Rohan Malhotra",
    title: "Radiation oncologist",
    hospitalSlug: "gurgaon-joint-institute",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["brachytherapy", "intracavitary-brachytherapy", "interstitial-brachytherapy"],
    procedures: ["Brachytherapy", "Intracavitary Brachytherapy", "Interstitial Brachytherapy"],
    credentials: "MS Ortho · robotic hip/knee · AO fellow",
    languages: "English, Hindi, Punjabi",
    years: "14 years",
    cases: "Primary and revision joints",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Malhotra uses implant brands of record and will not clear a patient to fly until physiotherapy day-five numbers are met.",
  },
  {
    slug: "priya-desai",
    name: "Dr. Priya Desai",
    title: "Radiation oncologist",
    hospitalSlug: "bandra-private",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["interstitial-brachytherapy", "plaque-brachytherapy", "intraoperative-radiotherapy-iort"],
    procedures: ["Interstitial Brachytherapy", "Plaque Brachytherapy", "Intraoperative Radiotherapy (IORT)"],
    credentials: "MRCOG · ESHRE certified lab",
    languages: "English, Hindi, Marathi",
    years: "13 years",
    cases: "IVF, egg freeze",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Desai’s Bandra lab publishes cycle rates without marketing percentages. A third cycle is sometimes advised against — in writing.",
  },
  {
    slug: "vikram-iyer",
    name: "Dr. Vikram Iyer",
    title: "Radiation oncologist",
    hospitalSlug: "whitefield-precision",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["intraoperative-radiotherapy-iort", "total-body-irradiation-tbi", "external-beam-radiotherapy-ebrt"],
    procedures: ["Intraoperative Radiotherapy (IORT)", "Total Body Irradiation (TBI)", "External Beam Radiotherapy (EBRT)"],
    credentials: "MS Ortho · spine fellowship Singapore",
    languages: "English, Kannada, Hindi",
    years: "18 years",
    cases: "Spine decompression, joints",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Iyer will stage a Bengaluru admission around imaging you already have — no repeat MRI if the disk is readable.",
  },
  {
    slug: "meera-nair",
    name: "Dr. Meera Nair",
    title: "Radiation oncologist",
    hospitalSlug: "whitefield-precision",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["external-beam-radiotherapy-ebrt", "3d-conformal-radiotherapy-3d-crt", "intensity-modulated-radiotherapy-imrt"],
    procedures: ["External Beam Radiotherapy (EBRT)", "3D Conformal Radiotherapy (3D-CRT)", "Intensity-Modulated Radiotherapy (IMRT)"],
    credentials: "MCh · NCCS observership",
    languages: "English, Malayalam, Kannada",
    years: "15 years",
    cases: "Breast and GI oncology",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Nair chairs Whitefield’s Tuesday tumor board. International patients get the same slot as local ones — not a tourist add-on.",
  },
  {
    slug: "lakshmi-narayan",
    name: "Dr. Lakshmi Narayan",
    title: "Radiation oncologist",
    hospitalSlug: "adyar-cardiac",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["intensity-modulated-radiotherapy-imrt", "image-guided-radiotherapy-igrt", "stereotactic-radiosurgery-srs"],
    procedures: ["Intensity-Modulated Radiotherapy (IMRT)", "Image-Guided Radiotherapy (IGRT)", "Stereotactic Radiosurgery (SRS)"],
    credentials: "MCh CTVS · FRCS",
    languages: "English, Tamil, Hindi",
    years: "24 years",
    cases: "Bypass and valve programmes",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Narayan operates only in ICU-capable theatres. Chennai volume is the point — not a three-day package.",
  },
  {
    slug: "sameer-reddy",
    name: "Dr. Sameer Reddy",
    title: "Radiation oncologist",
    hospitalSlug: "hitec-surgical",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["stereotactic-radiosurgery-srs", "stereotactic-body-radiotherapy-sbrt", "cyberknife"],
    procedures: ["Stereotactic Radiosurgery (SRS)", "Stereotactic Body Radiotherapy (SBRT)", "CyberKnife"],
    credentials: "MDS Prostho · in-house digital lab",
    languages: "English, Telugu, Hindi",
    years: "11 years",
    cases: "Full-arch and smile design",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Reddy’s lab is on the same floor as theatre in HITEC City. Provisionals are not couriered across Hyderabad.",
  },
  {
    slug: "nisha-rao",
    name: "Dr. Nisha Rao",
    title: "Radiation oncologist",
    hospitalSlug: "hitec-surgical",
    specialty: "Radiation Oncology",
    treatmentSlugs: ["cyberknife", "gamma-knife", "proton-beam-therapy"],
    procedures: ["CyberKnife", "Gamma Knife", "Proton Beam Therapy"],
    credentials: "IFSO · MS GI surgery",
    languages: "English, Telugu, Hindi",
    years: "12 years",
    cases: "Sleeve and bypass with 12-month follow-up",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    bio: "Dr. Rao declines tourist bariatric packages. Diabetes and reflux status decide the procedure before a Hyderabad date is offered.",
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
