export type Destination = {
  slug: string;
  city: string;
  country: string;
  region: string;
  headline: string;
  summary: string;
  image: string;
  specialties: string[];
  recoveryNote: string;
  stay: string;
  language: string;
};

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  image: string;
  usRange: string;
  partnerRange: string;
  stay: string;
  destinations: string[];
  includes: string[];
  notes: string;
};

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  destinationSlug: string;
  accreditation: string;
  focus: string;
  image: string;
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

export const destinations: Destination[] = [
  {
    slug: "seoul",
    city: "Seoul",
    country: "South Korea",
    region: "East Asia",
    headline: "Precision aesthetics in the world’s most exacting clinics.",
    summary:
      "Gangnam’s private floors are built for international patients: same-day imaging, bilingual coordinators, and surgeons who treat facial harmony as architecture. Velora holds reserved consult slots at three JCI partners.",
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Facial aesthetics", "Dermatology", "Eyes & contour"],
    recoveryNote: "Hotel-adjacent recovery suites in Cheongdam, 8–14 nights typical.",
    stay: "8–14 nights",
    language: "English, Korean, Mandarin",
  },
  {
    slug: "istanbul",
    city: "Istanbul",
    country: "Türkiye",
    region: "Europe & Anatolia",
    headline: "Hair, smile, and metabolic surgery at European scale.",
    summary:
      "Istanbul combines high-volume specialist teams with five-star Bosphorus recovery. We work only with hospitals that publish complication rates and keep a dedicated international ward.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe8a80a5?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Hair restoration", "Dental", "Bariatric"],
    recoveryNote: "Bosphorus or Nişantaşı residences with nurse visits on day 1–3.",
    stay: "5–10 nights",
    language: "English, Turkish, Arabic, German",
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    region: "Southeast Asia",
    headline: "Hospitality-grade campuses for complex elective care.",
    summary:
      "Bangkok’s flagship hospitals feel like hotels that happen to run full ICU. Ideal for multi-procedure plans, gender-affirming pathways, and patients who want a longer, gentler recovery.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Cosmetic surgery", "Dental reconstruction", "Wellness"],
    recoveryNote: "Sukhumvit recovery apartments with in-room nursing on request.",
    stay: "10–21 nights",
    language: "English, Thai, Japanese, Arabic",
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Gulf",
    headline: "Discreet luxury care a short-haul flight from Europe and Africa.",
    summary:
      "For patients who want Western protocols, private floors, and zero logistics friction. Dubai is our preferred hub for executive physicals, cardiology, and aesthetic work with hotel-connected hospitals.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Cardiology", "Executive diagnostics", "Aesthetics"],
    recoveryNote: "Jumeirah or Downtown residences; same-campus hotels available.",
    stay: "4–10 nights",
    language: "English, Arabic, Hindi, French",
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    headline: "Oncology, cardiac, and second-opinion medicine without compromise.",
    summary:
      "When the brief is not savings but certainty. Singapore’s private campuses are our recommendation for complex diagnosis, oncology pathways, and patients flying from Australia or the US West Coast.",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Oncology", "Cardiac surgery", "Second opinions"],
    recoveryNote: "Orchard and Novena recovery hotels with hospital shuttle.",
    stay: "7–16 nights",
    language: "English, Mandarin, Malay",
  },
  {
    slug: "mexico-city",
    city: "Mexico City",
    country: "Mexico",
    region: "Americas",
    headline: "US-trained specialists a three-hour flight from Texas.",
    summary:
      "Polanco and Santa Fe private hospitals offer dental full-arch, joints, and bariatric programs with US board-trained surgeons. Ideal when you want time-zone overlap with family at home.",
    image:
      "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1800&q=80",
    specialties: ["Dental full-arch", "Orthopedics", "Bariatric"],
    recoveryNote: "Polanco suites; family rooms available for US companions.",
    stay: "6–12 nights",
    language: "English, Spanish",
  },
];

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
    destinations: ["seoul", "bangkok", "istanbul", "dubai"],
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
    destinations: ["istanbul", "dubai"],
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
    destinations: ["istanbul", "bangkok", "mexico-city"],
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
    destinations: ["singapore", "mexico-city", "dubai", "bangkok"],
    includes: [
      "Implant brand of record",
      "Physiotherapy from day one",
      "Companion lodging",
      "Fit-to-fly clearance",
    ],
    notes:
      "BMI, bone quality, and prior hardware are reviewed before a destination is even proposed.",
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
    destinations: ["singapore", "dubai", "bangkok"],
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
    destinations: ["singapore", "dubai", "bangkok", "istanbul"],
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
    destinations: ["singapore", "dubai", "seoul"],
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
    destinations: ["istanbul", "mexico-city", "bangkok"],
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
    destinationSlug: "seoul",
    accreditation: "JCI",
    focus: "Facial architecture & dermatology",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "bosphorus-international",
    name: "Bosphorus International",
    city: "Istanbul",
    destinationSlug: "istanbul",
    accreditation: "JCI · ISO 9001",
    focus: "Hair, dental, bariatric",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "sukhumvit-campus",
    name: "Sukhumvit Medical Campus",
    city: "Bangkok",
    destinationSlug: "bangkok",
    accreditation: "JCI",
    focus: "Multi-specialty elective & wellness",
    image:
      "https://images.unsplash.com/photo-1538108142413-76d1c2d5d0c2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "marina-private",
    name: "Marina Private Hospital",
    city: "Dubai",
    destinationSlug: "dubai",
    accreditation: "JCI · DHA",
    focus: "Cardiac, diagnostics, aesthetics",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "orchard-precision",
    name: "Orchard Precision Centre",
    city: "Singapore",
    destinationSlug: "singapore",
    accreditation: "JCI · MOH",
    focus: "Oncology & cardiac",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "polanco-surgical",
    name: "Polanco Surgical Institute",
    city: "Mexico City",
    destinationSlug: "mexico-city",
    accreditation: "JCI · CSG",
    focus: "Dental, joints, metabolic",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
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

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function hospitalsForDestination(slug: string) {
  return hospitals.filter((h) => h.destinationSlug === slug);
}

export function treatmentsForDestination(slug: string) {
  return treatments.filter((t) => t.destinations.includes(slug));
}
