export type { Treatment } from "@/lib/treatments";
export type { Hospital } from "@/lib/hospitals";
export type { Doctor } from "@/lib/doctors";

export {
  RADIATION_PROCEDURES,
  radiationProcedureSlug,
  toSlug,
} from "@/lib/taxonomy";

export {
  hospitals,
  getHospital,
  hospitalsMatchingPseo,
  groupHospitalsForDirectory,
} from "@/lib/hospitals";
export { treatments, getTreatment, treatmentsForHospital } from "@/lib/treatments";
export {
  doctors,
  getDoctor,
  doctorsForHospital,
  doctorsForTreatment,
  doctorsMatchingPseo,
  groupDoctorsForDirectory,
  groupDoctorsUnderHospitals,
} from "@/lib/doctors";

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

export const stories: Story[] = [];

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
