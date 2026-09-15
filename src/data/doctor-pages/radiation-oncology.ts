import { RADIATION_PROCEDURES } from "@/lib/taxonomy";

export const RADIATION_ONCOLOGY_SELECTION_NOTE =
  "GAF Healthcare's selection of doctors is based on available professional information such as specialty, experience, qualifications, hospital affiliation, clinical focus and relevant treatment expertise. Inclusion does not constitute a medical ranking or guarantee of treatment outcome.";

export const radiationOncologyDoctorMethodology = {
  question: "How does GAF identify radiation oncologists in India?",
  answer:
    "Listed specialists are radiation oncologists in the current GAF catalog for India, with a named hospital, city and procedure relationships where those mappings exist. Featured labels mark complete, reviewable profiles. They are not clinical ranks, outcome scores or a claim that one doctor is better than another.",
};

export const radiationOncologyHowToChoose = [
  "Start with the cancer type, prior treatment and the clinical question — curative, adjuvant, salvage or symptom control.",
  "Match the likely technique (external beam, stereotactic, brachytherapy or proton) to a unit that actually delivers it, not only to a specialty label.",
  "Ask whether planning, simulation and daily treatment occur on one named campus, and who owns follow-up after you return home.",
  "Use GAF treatment-cost guides to understand billing scope, then request a written estimate after records review. Doctor consultation fees and treatment packages are different figures.",
];

export const radiationOncologyConditionLinks = [
  { name: "Breast cancer", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
  { name: "Prostate cancer", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
  { name: "Head and neck cancers", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
  { name: "Cervical and other gynecologic cancers", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
  { name: "Lung cancer", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
  { name: "Brain tumours and brain metastases", href: "/costs/India/Radiation-Oncology", note: "Pathway context on the Radiation Oncology specialty guide." },
];

export const radiationOncologyProcedureBlurbs: Record<string, string> = {
  "External Beam Radiotherapy (EBRT)":
    "External beams deliver radiation from a machine outside the body. A useful doctor shortlist names the campus that will simulate and treat, then the existing EBRT cost guide explains fractions and billing scope.",
  "3D Conformal Radiotherapy (3D-CRT)":
    "3D-CRT shapes beams to a reconstructed target. Compare it with IMRT on the existing technique guide rather than treating the label as a quality rank.",
  "Intensity-Modulated Radiotherapy (IMRT)":
    "IMRT modulates beam intensity to spare nearby organs. VMAT is a delivery pattern used with IMRT at some units; GAF does not publish a separate VMAT doctor URL. The existing IMRT cost guide remains the technique page.",
  "Image-Guided Radiotherapy (IGRT)":
    "IGRT verifies position before or during treatment. It is often combined with IMRT; confirm both on the written plan and use the existing IGRT cost page for scope.",
  "Stereotactic Radiosurgery (SRS)":
    "SRS is focused intracranial radiation, not an operation. Selection, immobilisation and fraction count belong on the existing SRS cost guide.",
  "Stereotactic Body Radiotherapy (SBRT)":
    "SBRT delivers high dose in few fractions to selected extra-cranial targets. The SBRT cost guide covers stay and planning; doctors here are those mapped to the procedure.",
  CyberKnife:
    "CyberKnife is one radiosurgery platform. A machine name is not itself an indication; the existing CyberKnife cost page and a named radiation oncologist must both be confirmed.",
  "Gamma Knife":
    "Gamma Knife is a dedicated intracranial radiosurgery system. Only catalog-linked specialists appear here; the Gamma Knife cost guide remains the canonical technique page.",
  "Proton Beam Therapy":
    "Proton therapy is a distinct beam and a distinct estimate. Use the existing proton cost guide and the travel note on when a flight is justified.",
  Brachytherapy:
    "Brachytherapy places a source in or beside the target. Logistics, anaesthesia and insertions are covered on the existing brachytherapy cost and travel guides.",
  "Intracavitary Brachytherapy":
    "Intracavitary implants are used in selected gynecologic pathways. The dedicated cost sheet explains the episode; this page lists mapped doctors only.",
  "Interstitial Brachytherapy":
    "Interstitial implants use needles or catheters in tissue. Confirm indication on the existing cost sheet before comparing doctor cards.",
  "Plaque Brachytherapy":
    "Plaque treatment is a specialised ocular pathway. Few catalog specialists are mapped; the plaque cost guide remains the clinical explanation.",
  "Intraoperative Radiotherapy (IORT)":
    "IORT is given during surgery. It requires a combined theatre pathway; the IORT cost page is the canonical description.",
  "Total Body Irradiation (TBI)":
    "TBI sits inside transplant conditioning. The TBI cost guide and the transplant team, not a doctor card alone, define the episode.",
};

export const radiationOncologyCityNotes: Record<
  string,
  { intro: string; logistics: string; existingHub: string }
> = {
  "delhi-ncr": {
    intro:
      "Delhi NCR is the largest listed radiation-oncology roster in this catalog, spread across Delhi, Gurugram, Noida and Faridabad rather than one hospital street. A city card is not a promise that simulation and daily fractions occur at the first campus you message.",
    logistics:
      "Choose lodging after the treating campus is named. Cross-NCR commuting during a multi-week course is a planning problem, not a ranking of suburbs.",
    existingHub: "/costs/India/Delhi-NCR/Radiation-Oncology",
  },
  mumbai: {
    intro:
      "Mumbai currently lists fewer radiation oncologists than the other four cities. Harbour geography still matters: Mumbai and Navi Mumbai are different daily bases for a fraction course.",
    logistics:
      "Stay on the same side of the harbour as the confirmed unit. Monsoon travel is a logistics issue, not evidence that outcomes differ by campus.",
    existingHub: "/costs/India/Mumbai/Radiation-Oncology",
  },
  bengaluru: {
    intro:
      "Bengaluru specialists sit along several corridors while the airport sits well north. The relevant journey is the repeated trip to the treating bunker, not the arrival transfer.",
    logistics:
      "An airport hotel is a poor recovery base for daily radiation. Confirm Whitefield, south-city or central campuses before booking.",
    existingHub: "/costs/India/Bengaluru/Radiation-Oncology",
  },
  chennai: {
    intro:
      "Chennai has an established international-patient corridor and a listed radiation-oncology faculty across several districts. Airport access is useful only after the fraction location is known.",
    logistics:
      "Heat and humidity affect comfort during repeated outpatient visits. They do not change the clinical criteria for technique or dose.",
    existingHub: "/costs/India/Chennai/Radiation-Oncology",
  },
  hyderabad: {
    intro:
      "Hyderabad's listed radiation oncologists sit in a relatively compact hospital belt south of the airport. Campus names in Jubilee Hills, Banjara Hills and similar corridors are not interchangeable bunkers.",
    logistics:
      "The airport transfer is long enough that same-day arrival and simulation is often unwise. Keep return flights flexible through the first on-treatment review.",
    existingHub: "/costs/India/Hyderabad/Radiation-Oncology",
  },
};

export const radiationOncologyIndiaFaqs = [
  {
    q: "Who are the best radiation oncologists in India?",
    a: "GAF lists radiation oncologists from the current catalog by specialty, city, hospital and procedure relationships. “Best” is the discovery heading for that search intent. It is not a clinical ranking, outcome score or guarantee.",
  },
  {
    q: "How many radiation oncologists does GAF list in India?",
    a: "The live count on this page is the number of current catalog records. It changes when mappings are added or removed and is not a census of every radiation oncologist in the country.",
  },
  {
    q: "Which cities have listed radiation oncologists?",
    a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. City pages exist where the catalog has specialists; counts differ by city and are not quality scores.",
  },
  {
    q: "Which radiation oncologists in India are associated with IMRT?",
    a: "Open the IMRT doctor list from this page. Cards appear only when IMRT is an exact procedure relationship. The IMRT cost guide remains the place to read technique, indications and planning ranges.",
  },
  {
    q: "Which radiation oncologists treat prostate cancer?",
    a: "GAF does not store a separate cancer-type field on every doctor. Use the Radiation Oncology specialty guide for prostate-pathway context, then review specialists mapped to relevant techniques such as IMRT, IGRT, SBRT or brachytherapy.",
  },
  {
    q: "Does a doctor listing include a personal treatment price?",
    a: "No. Treatment-cost pages are planning ranges for named techniques. A consultation fee, if quoted, is separate and is issued after records review.",
  },
  {
    q: "Can I compare radiation oncologists?",
    a: "Yes. Compare two to four listed specialists on experience, qualifications, hospital, city and mapped techniques. Comparison is not a statement of medical superiority.",
  },
  {
    q: "What records should I send before choosing a doctor?",
    a: "Pathology, imaging in DICOM where possible, stage, prior surgery or systemic therapy, and any previous radiation plan. A remote opinion can change after examination and simulation.",
  },
];

export const radiationOncologyConsultPrep = [
  "Pathology report and immunohistochemistry if already done.",
  "Staging imaging in DICOM where possible, plus the written report.",
  "Operative notes, prior systemic therapy and any previous radiation plan, including dose and volumes if available.",
  "A named clinical question: curative, adjuvant, salvage or symptom control.",
];

export const radiationOncologyQuestionsToAsk = [
  "Where will simulation and daily treatment take place, and is that the same campus as the consultation?",
  "Which technique is planned, and why not an alternative already documented on GAF’s cost guides?",
  "Who owns follow-up after you return home, and what is sent back to the referring team?",
  "What is the written estimate for the planned course — separate from any consultation fee?",
];

export const radiationOncologyInternationalNote =
  "GAF Healthcare coordinates records review, a named consultation, campus confirmation and travel timing for international patients. A listing is not an appointment and not a treatment package.";

/** Existing GAF URLs reused by doctor discovery. Do not duplicate these topics. */
export const radiationOncologyContentInventory = [
  { url: "/costs/India/Radiation-Oncology", topic: "specialty guide", kind: "specialty" },
  { url: "/costs/India/Delhi-NCR/Radiation-Oncology", topic: "city specialty", kind: "city" },
  { url: "/costs/India/Mumbai/Radiation-Oncology", topic: "city specialty", kind: "city" },
  { url: "/costs/India/Bengaluru/Radiation-Oncology", topic: "city specialty", kind: "city" },
  { url: "/costs/India/Chennai/Radiation-Oncology", topic: "city specialty", kind: "city" },
  { url: "/costs/India/Hyderabad/Radiation-Oncology", topic: "city specialty", kind: "city" },
  { url: "/costs/external-beam-radiotherapy-ebrt", topic: "EBRT", kind: "cost" },
  { url: "/costs/intensity-modulated-radiotherapy-imrt", topic: "IMRT", kind: "cost" },
  { url: "/costs/image-guided-radiotherapy-igrt", topic: "IGRT", kind: "cost" },
  { url: "/costs/stereotactic-body-radiotherapy-sbrt", topic: "SBRT", kind: "cost" },
  { url: "/costs/stereotactic-radiosurgery-srs", topic: "SRS", kind: "cost" },
  { url: "/costs/proton-beam-therapy", topic: "proton", kind: "cost" },
  { url: "/costs/brachytherapy", topic: "brachytherapy", kind: "cost" },
  { url: "/blogs/imrt-vs-3d-crt", topic: "technique comparison", kind: "blog" },
  { url: "/blogs/when-proton-is-worth-the-flight", topic: "proton travel", kind: "blog" },
  { url: "/blogs/srs-sbrt-and-a-short-stay", topic: "stereotactic travel", kind: "blog" },
  { url: "/blogs/brachytherapy-travel-logistics", topic: "brachytherapy travel", kind: "blog" },
] as const;

export const radiationOncologyProcedureNames = [...RADIATION_PROCEDURES];
