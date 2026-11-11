import { DENTISTRY_PROCEDURES } from "@/lib/taxonomy";

export const DENTISTRY_SELECTION_NOTE =
  "GAF Healthcare's doctor listings are based on available professional information such as specialty, qualifications, experience, hospital affiliation and documented areas of clinical expertise. The listing is intended to help patients compare relevant dentists and should not be interpreted as a clinical ranking or endorsement. Inclusion does not constitute a medical ranking or guarantee of treatment outcome.";

export const dentistryDoctorMethodology = {
  question: "How does GAF identify dentists?",
  answer:
    "GAF Healthcare's doctor listings are based on available professional information such as specialty, qualifications, experience, hospital affiliation and documented areas of clinical expertise. The listing is intended to help patients compare relevant dentists and should not be interpreted as a clinical ranking or endorsement. Featured labels mark complete, reviewable profiles, not outcome scores.",
};

export const dentistryHowToChoose = [
  "Start with the dental diagnosis — missing teeth, decay, gum disease, bite problems or aesthetics — rather than a package name.",
  "Match implant, orthodontic, oral-surgery or restorative work to a clinician who actually documents that procedure, not only a dentistry specialty label.",
  "Ask whether imaging, laboratory work and review visits occur on one named campus, and who owns follow-up after you return home.",
  "Use GAF treatment-cost guides to understand billing scope, then request a written estimate after records review. Consultation fees and treatment packages are different figures.",
];

export const dentistryProcedureBlurbs: Record<string, string> = Object.fromEntries(
  DENTISTRY_PROCEDURES.map((name) => [
    name,
    `${name} appears here only when an exact catalog procedure relationship exists. Use the existing ${name} cost guide for materials, stay and billing scope; doctor cards are not a clinical ranking.`,
  ]),
);

export const dentistryCityNotes: Record<
  string,
  { intro: string; logistics: string; existingHub: string }
> = {
  "delhi-ncr": {
    intro:
      "Delhi NCR dental care is spread across Delhi, Gurugram, Noida and Faridabad. A city card is not a promise that imaging, laboratory work and review visits occur at the first campus you message.",
    logistics:
      "Choose lodging after the treating campus is named. Cross-NCR commuting soon after oral surgery or implant placement is a planning problem, not a ranking of suburbs.",
    existingHub: "/costs/India/Delhi-NCR/Dentistry",
  },
  mumbai: {
    intro:
      "Mumbai and Navi Mumbai are different daily bases for multi-visit dental pathways such as crowns, aligners or full-mouth rehabilitation.",
    logistics:
      "Stay on the same side of the harbour as the confirmed clinic. Monsoon travel is a logistics issue, not evidence that outcomes differ by campus.",
    existingHub: "/costs/India/Mumbai/Dentistry",
  },
  bengaluru: {
    intro:
      "Bengaluru lists dentistry across several hospital and clinic districts rather than one corridor. Confirm where surgery, laboratory try-ins and emergency review occur.",
    logistics:
      "Airport transfers are long; a stay near the treating campus is usually more useful than an airport hotel during staged prosthetic work.",
    existingHub: "/costs/India/Bengaluru/Dentistry",
  },
  chennai: {
    intro:
      "Chennai dental campuses may offer comparatively direct airport access, but heat and multi-visit laboratory pathways still require flexible lodging.",
    logistics:
      "Plan air-conditioned recovery space and a reliable return route for suture care or prosthesis adjustment.",
    existingHub: "/costs/India/Chennai/Dentistry",
  },
  hyderabad: {
    intro:
      "Hyderabad dental care clusters differ between Jubilee Hills, Hi-Tech City and Secunderabad. Name the campus before booking lodging.",
    logistics:
      "Summer heat and a long airport transfer matter after implants, extractions or jaw surgery; keep the first review before fixing departure.",
    existingHub: "/costs/India/Hyderabad/Dentistry",
  },
};

export const dentistryIndiaFaqs = [
  {
    q: "How should I choose a dentist in India through GAF?",
    a: "Match the exact procedure you need to a catalog-linked dentist, confirm the campus and request a written estimate after records review. Listings are not outcome rankings.",
  },
  {
    q: "Do GAF dentistry listings rank clinics?",
    a: "No. Inclusion reflects specialty, affiliation and documented procedure relationships in the catalog, not a clinical league table.",
  },
  {
    q: "Can suitability for implants or jaw surgery be confirmed before travel?",
    a: "Records and imaging can support a preliminary opinion, but final suitability may require examination, updated scans and review by the treating team.",
  },
];

export const dentistryContentInventory = {
  selectionNote: DENTISTRY_SELECTION_NOTE,
  methodology: dentistryDoctorMethodology,
  howToChoose: dentistryHowToChoose,
  procedureBlurbs: dentistryProcedureBlurbs,
  cityNotes: dentistryCityNotes,
  faqs: dentistryIndiaFaqs,
};
