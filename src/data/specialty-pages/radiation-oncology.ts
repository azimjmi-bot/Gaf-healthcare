import type { SpecialtyPageProfile } from "./types";

export const radiationOncologyIndiaProfile = {
  specialtySlug: "radiation-oncology",
  countrySlug: "india",
  locale: "en",
  status: "published",
  allowIndex: true,
  lastReviewed: "2026-09-14",
  seoTitle: "Radiation Oncology in India: Treatment and Cost Guide",
  seoDescription:
    "Understand radiation oncology in India, including treatment selection, planning, technology, course costs, records, stays and international patient care.",
  introAnswer:
    "Radiation oncology in India uses carefully planned external beams or internal sources to treat cancer and selected non-cancer conditions. The appropriate technique and course depend on the treatment site, intended number of fractions, nearby sensitive organs and planning complexity; a radiation oncologist confirms these after reviewing the diagnosis, imaging and any previous radiation.",
  overview: [
    "Radiation oncology is the medical specialty that uses ionising radiation to damage the DNA of abnormal cells while limiting dose to healthy tissue. A radiation oncologist is the physician who assesses whether radiation is appropriate, defines its intent, prescribes dose and fractionation, and manages treatment-related effects. External beam radiotherapy directs radiation from a machine outside the body; brachytherapy instead places a sealed source inside or close to the target for a steep, local dose fall-off.",
    "Planning usually begins with simulation, often a treatment-position CT with a mask, vacuum cushion or other immobilisation. The radiation oncologist contours the tumour or postoperative target and organs at risk, sometimes fusing MRI or PET information; dosimetrists and medical physicists then calculate and quality-check the plan. Fractionation divides the prescribed dose into treatment sessions. Fraction size and schedule differ by disease, intent, normal-tissue tolerance, prior treatment and the patient's ability to attend.",
    "Radiation may be used with curative intent as the main treatment, before or after surgery, or alongside systemic therapy. It can also be used palliatively to relieve symptoms such as pain, bleeding, obstruction or neurological pressure. Decisions often involve medical oncology, surgical oncology, radiology, pathology and site-specific specialists; transplant teams direct total body irradiation, while neurosurgery or ophthalmology may be central to intracranial or ocular cases.",
  ],
  conditions: [
    {
      name: "Breast cancer",
      summary:
        "Radiation may follow breast-conserving surgery or selected mastectomies, treat regional nodes, or provide symptom control.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "brachytherapy",
        "interstitial-brachytherapy",
        "intraoperative-radiotherapy-iort",
      ],
    },
    {
      name: "Prostate cancer",
      summary:
        "External beam, stereotactic treatment or an implant may suit selected disease, depending on risk group, anatomy and urinary function.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "stereotactic-body-radiotherapy-sbrt",
        "brachytherapy",
        "interstitial-brachytherapy",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Lung cancer",
      summary:
        "Radiation may be definitive, stereotactic for selected early tumours, postoperative in specific circumstances, or palliative.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "stereotactic-body-radiotherapy-sbrt",
        "cyberknife",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Brain tumours and brain metastases",
      summary:
        "Focal radiosurgery, fractionated treatment or broader fields may be considered according to diagnosis, burden, location and previous treatment.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "stereotactic-radiosurgery-srs",
        "cyberknife",
        "gamma-knife",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Head and neck cancers",
      summary:
        "Conformal external beams can limit dose near sensitive structures; selected accessible targets may use an implant.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "brachytherapy",
        "interstitial-brachytherapy",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Cervical and other gynecologic cancers",
      summary:
        "Pelvic external beams and image-guided brachytherapy may complement each other in selected cervical and other gynecologic pathways.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "brachytherapy",
        "intracavitary-brachytherapy",
        "interstitial-brachytherapy",
      ],
    },
    {
      name: "Rectal and esophageal cancers",
      summary:
        "Radiation may accompany chemotherapy before surgery, form selected definitive treatment, or control symptoms; stage and operability shape timing.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Liver and oligometastatic tumours",
      summary:
        "Ablative radiation may suit a limited number of defined targets when motion and organ-dose constraints can be met.",
      procedureSlugs: [
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "stereotactic-body-radiotherapy-sbrt",
        "cyberknife",
        "proton-beam-therapy",
      ],
    },
    {
      name: "Bone and spine metastases",
      summary:
        "Radiation can relieve pain or protect neurological function; stability, cord compression, prior dose and prognosis guide technique.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
        "stereotactic-body-radiotherapy-sbrt",
        "cyberknife",
      ],
    },
    {
      name: "Hematologic and transplant indications",
      summary:
        "Local radiation may treat lymphoma or symptoms; TBI is reserved for selected transplant conditioning protocols.",
      procedureSlugs: ["external-beam-radiotherapy-ebrt", "total-body-irradiation-tbi"],
    },
    {
      name: "Selected intraocular tumours",
      summary:
        "An ocular plaque may suit selected tumours after specialist review of dimensions, location and stage.",
      procedureSlugs: ["plaque-brachytherapy", "proton-beam-therapy"],
    },
  ],
  treatmentGroups: [
    {
      name: "External beam radiotherapy",
      summary:
        "Machine-delivered photon techniques range from three-dimensional fields to inverse-planned and image-verified courses.",
      procedureSlugs: [
        "external-beam-radiotherapy-ebrt",
        "3d-conformal-radiotherapy-3d-crt",
        "intensity-modulated-radiotherapy-imrt",
        "image-guided-radiotherapy-igrt",
      ],
    },
    {
      name: "Stereotactic radiation and radiosurgery",
      summary:
        "Highly focused treatment for selected small brain or body targets may be delivered on a conventional or named platform.",
      procedureSlugs: [
        "stereotactic-radiosurgery-srs",
        "stereotactic-body-radiotherapy-sbrt",
        "cyberknife",
        "gamma-knife",
      ],
    },
    {
      name: "Brachytherapy and internal radiation",
      summary:
        "Sealed sources can be placed in a cavity, directly in tissue or against the eye, with applicator-specific planning.",
      procedureSlugs: [
        "brachytherapy",
        "intracavitary-brachytherapy",
        "interstitial-brachytherapy",
        "plaque-brachytherapy",
      ],
    },
    {
      name: "Specialized radiation pathways",
      summary:
        "These pathways require indication-specific infrastructure and coordination with surgery or transplant care.",
      procedureSlugs: [
        "proton-beam-therapy",
        "intraoperative-radiotherapy-iort",
        "total-body-irradiation-tbi",
      ],
    },
  ],
  selection: [
    "No technique is universally preferable. Selection starts with tumour type, pathology, stage, site and intent; palliative, postoperative and ablative treatments have different goals. CT, MRI or PET defines disease extent and informs combinations with surgery or systemic therapy.",
    "Target size, shape and motion, organ-at-risk geometry, required precision, previous dose and normal-tissue tolerance may favour conventional external beams, IMRT with IGRT, stereotactic treatment, brachytherapy or selected proton plans. A platform name does not replace this comparison.",
    "Performance status, age, pregnancy possibility, comorbidities, ability to remain still, anaesthesia needs and capacity to complete treatment also matter. The radiation oncologist integrates patient factors with pathology and imaging, using multidisciplinary review when other cancer, transplant or organ-specific teams are relevant.",
  ],
  treatmentProcess: [
    {
      label: "Records review",
      detail:
        "The team reviews pathology, staging images, operative notes, systemic therapy and complete prior radiation dose information.",
    },
    {
      label: "Consultation and MDT decision",
      detail:
        "A radiation oncologist examines the patient, clarifies intent and alternatives, and seeks multidisciplinary input where needed.",
    },
    {
      label: "Simulation",
      detail:
        "The patient is positioned reproducibly for planning CT, with immobilisation, contrast, motion assessment or preparation protocols as indicated.",
    },
    {
      label: "Target contouring",
      detail:
        "The oncologist outlines target volumes and organs at risk, incorporating MRI, PET, pathology and surgical information when useful.",
    },
    {
      label: "Plan creation",
      detail:
        "Dosimetrists and physicists calculate beam or source arrangements to meet the prescription and normal-tissue constraints.",
    },
    {
      label: "Plan review and quality assurance",
      detail:
        "The clinical plan is checked, approved and subjected to technique-appropriate physics and machine quality assurance.",
    },
    {
      label: "Treatment delivery",
      detail:
        "Fractions or implant insertions are delivered with identity, position and safety checks; image guidance is used when prescribed.",
    },
    {
      label: "On-treatment assessment",
      detail:
        "The team monitors symptoms, skin, nutrition, blood tests and treatment tolerance, adjusting supportive care or replanning if clinically required.",
    },
    {
      label: "Completion and follow-up",
      detail:
        "The patient receives a treatment summary, early toxicity advice, emergency instructions and a site-specific clinical and imaging follow-up plan.",
    },
  ],
  costExplanation: [
    "The displayed India amount is a dynamic GAF planning estimate, not a quotation. Confirm whether it covers a complete course, planning, one session, one insertion or only the radiation component of surgery or transplant. Session prices are misleading when fraction schedules differ.",
    "An external beam estimate may include review, simulation, immobilisation, contouring, dosimetry, physics checks, image guidance, scheduled fractions and treatment reviews. MRI or PET fusion, fiducials, replanning, extra fractions, concurrent medicines and later scans may be separate.",
    "Brachytherapy, plaque and IORT can add theatre, anaesthesia, applicators or implants, source logistics, insertion imaging and ward care. External beams are usually outpatient; implants, anaesthesia, transplant or surgery may require day-care or admission. Lodging and transport are generally separate.",
  ],
  costFactors: [
    { label: "Technique", detail: "Conformal, modulated, stereotactic, proton and implant plans use different resources." },
    { label: "Fractions and targets", detail: "Session and target counts affect machine time, reviews and lodging." },
    { label: "Target geometry", detail: "Irregular targets near critical organs require more planning and quality assurance." },
    { label: "Image guidance", detail: "Daily imaging, surface guidance or tracking may be a separate line." },
    { label: "Motion management", detail: "Breath control, gating or tracking adds simulation and delivery work." },
    { label: "Previous radiation", detail: "Re-irradiation requires prior-dose reconstruction and cumulative tolerance review." },
    { label: "Planning imaging", detail: "MRI, PET-CT, motion CT or repeat simulation may be additional." },
    { label: "Immobilisation and fiducials", detail: "Custom supports or marker placement vary by site and technique." },
    { label: "Anaesthesia and theatre", detail: "Some paediatric, brachytherapy, plaque and IORT pathways need them." },
    { label: "Applicators and implants", detail: "Device type, needle count, fabrication and source handling affect cost." },
    { label: "Concurrent care", detail: "Systemic therapy, nutrition, medicines, monitoring and admission may be separate." },
  ],
  mayInclude: [
    "Radiation oncologist consultation and records review, if stated in the estimate",
    "CT simulation and standard immobilisation for the quoted treatment site",
    "Target and organ-at-risk contouring with treatment planning",
    "Dosimetry, medical physics review and plan-specific quality assurance",
    "The stated technique and number of scheduled treatment fractions",
    "Image guidance at the frequency specified in the treatment letter",
    "Routine on-treatment reviews and basic toxicity advice",
    "A completion summary and initial follow-up consultation, when expressly listed",
  ],
  mayBeAdditional: [
    "New pathology review, laboratory tests, MRI, PET-CT or other staging studies",
    "Fiducial insertion, specialist immobilisation, sedation or repeated anaesthesia",
    "Adaptive replanning, repeat simulation or fractions beyond the written prescription",
    "Brachytherapy applicators, custom plaque work, theatre, source handling or extra insertions",
    "Chemotherapy, immunotherapy, surgery, transplant admission and supportive medicines",
    "Feeding access, transfusion, intensive care or unplanned inpatient treatment",
    "Later surveillance imaging, rehabilitation and care after return home",
    "Flights, visa costs, accommodation, meals and local transport for patient and companion",
  ],
  technologies: [
    {
      name: "Linear accelerator (LINAC)",
      what: "A machine that generates and shapes high-energy external beams, often with onboard imaging.",
      why: "It delivers conventional, modulated and selected stereotactic plans after appropriate quality checks.",
      procedureSlugs: ["external-beam-radiotherapy-ebrt"],
    },
    {
      name: "3D conformal radiotherapy (3D-CRT)",
      what: "CT-based planning shapes beams to a three-dimensional target without inverse modulation.",
      why: "It can suit targets whose coverage and organ constraints allow a conformal plan.",
      procedureSlugs: ["3d-conformal-radiotherapy-3d-crt"],
    },
    {
      name: "Intensity-modulated radiotherapy (IMRT)",
      what: "Inverse planning varies beam intensity around complex targets.",
      why: "It may lower dose to selected organs when simpler fields cannot meet constraints.",
      procedureSlugs: ["intensity-modulated-radiotherapy-imrt"],
    },
    {
      name: "Image-guided radiotherapy (IGRT)",
      what: "Imaging checks daily position and anatomy against the approved plan.",
      why: "It manages setup uncertainty when margins are tight or organs move.",
      procedureSlugs: ["image-guided-radiotherapy-igrt"],
    },
    {
      name: "Volumetric modulated arc therapy (VMAT)",
      what: "VMAT delivers modulation during gantry rotation; it is an IMRT-family technique, not a separate CMS procedure.",
      why: "It can deliver suitable plans efficiently, but target and organ constraints determine use.",
      procedureSlugs: ["intensity-modulated-radiotherapy-imrt", "image-guided-radiotherapy-igrt"],
    },
    {
      name: "SRS and SBRT",
      what: "Stereotactic methods tightly treat selected small brain or body targets.",
      why: "They allow short courses when definition, motion control and organ tolerance permit.",
      procedureSlugs: ["stereotactic-radiosurgery-srs", "stereotactic-body-radiotherapy-sbrt"],
    },
    {
      name: "CyberKnife",
      what: "A robotic stereotactic platform with repeated image tracking.",
      why: "It can deliver SRS or SBRT; the clinical indication determines suitability.",
      procedureSlugs: ["cyberknife"],
    },
    {
      name: "Gamma Knife",
      what: "A dedicated intracranial system using frame- or mask-based localisation.",
      why: "It may treat selected brain or skull-base targets after specialist assessment.",
      procedureSlugs: ["gamma-knife"],
    },
    {
      name: "Proton beam therapy",
      what: "Protons deposit most energy at a planned depth with limited exit dose.",
      why: "This may help selected paediatric, skull-base or re-irradiation plans, but not every cancer.",
      procedureSlugs: ["proton-beam-therapy"],
    },
    {
      name: "Brachytherapy systems",
      what: "Applicators, needles or plaques position sealed sources in or beside a target.",
      why: "Short dose fall-off can support selected gynecologic, prostate, breast, head-and-neck or ocular pathways.",
      procedureSlugs: [
        "brachytherapy",
        "intracavitary-brachytherapy",
        "interstitial-brachytherapy",
        "plaque-brachytherapy",
      ],
    },
  ],
  internationalPatientInformation: [
    "Send pathology, DICOM imaging, stage, operation and systemic-therapy details, plus any previous radiation plan, before booking. A remote proposal remains provisional until examination and simulation; request clinical acceptance, the intended technique and an itemized estimate for the exact campus.",
    "Allow for consultation, simulation, planning and quality assurance before treatment, then stay near the unit for all fractions, insertions and reviews. Keep accommodation and return travel flexible because replanning, toxicity or clinical change can alter the calendar.",
    "Before departure, obtain the treatment summary, dose, fractions, site, technique, medicine advice and follow-up plan. Confirm warning symptoms, fitness to fly and the clinician responsible at home; arrange an interpreter for consent when needed.",
  ],
  recordsRequired: [
    "Pathology report, biopsy report and relevant molecular results",
    "Recent CT, MRI and PET images in DICOM format with reports",
    "Cancer stage, clinic notes and multidisciplinary recommendations",
    "Operative notes and final surgical histopathology, if applicable",
    "Systemic therapy names, doses, dates and treatment response",
    "Complete prior radiation plan, dose summary, fields and dates",
    "Current medicines, allergies and significant medical conditions",
    "Recent blood counts, kidney and liver tests when clinically relevant",
    "Implant, pacemaker, pregnancy-status or anaesthesia information where applicable",
    "Contact details for the current oncologist and intended follow-up clinician",
  ],
  stayDuration: [
    "Stay follows the pathway. A short radiosurgery course still needs planning and review, while conventional external beam or proton treatment can require weekday attendance over weeks. Simulation and plan preparation precede the first fraction.",
    "Brachytherapy may require repeated day-care or inpatient insertions; plaque treatment includes placement, dwell and removal; IORT follows surgery; and TBI sits within transplant admission. Departure remains flexible pending review and travel clearance.",
  ],
  countryComparison: [
    "India self-pay estimates may differ from other countries, but compare only like-for-like diagnosis, technique, targets, fractions, simulation, guidance, anaesthesia and follow-up. Currency and billing structure also affect totals.",
    "Travel may not suit urgent or complex care. Insurance, daily attendance, language, acute-effect support and continuity near home can outweigh price differences; compare written plans after review and secure local follow-up.",
  ],
  relatedSpecialtySlugs: [
    "medical-oncology",
    "surgical-oncology",
    "hematology",
    "pediatric-hematology",
    "neurosurgery",
    "ophthalmology",
  ],
  faqs: [
    {
      q: "What does a radiation oncologist do?",
      a: "The physician confirms the indication, prescribes dose and fractions, contours anatomy, approves the plan and manages effects with the oncology team.",
    },
    {
      q: "Is radiotherapy the same as chemotherapy?",
      a: "No. Radiotherapy delivers ionising radiation; chemotherapy is medicine that circulates. Disease-specific plans sometimes use both.",
    },
    {
      q: "How many radiation sessions are usually required?",
      a: "There is no universal number. One fraction is one portion of the prescribed dose, and schedules vary from one or a few stereotactic sessions to multi-week courses according to diagnosis, intent and normal-tissue tolerance.",
    },
    {
      q: "Is radiation treatment painful?",
      a: "External beam delivery is usually not felt, though positioning and later effects can be uncomfortable. Brachytherapy placement may need anaesthesia.",
    },
    {
      q: "Does the patient become radioactive?",
      a: "External beams do not make a patient radioactive. Temporary-source precautions end after removal; permanent seeds require specific safety advice.",
    },
    {
      q: "How are IMRT, IGRT and VMAT related?",
      a: "IMRT modulates intensity, IGRT verifies position, and VMAT delivers an IMRT-family plan in arcs. They may be combined.",
    },
    {
      q: "Is stereotactic radiosurgery an operation?",
      a: "No. SRS is focused intracranial radiation without surgical removal, although some systems use a fixation frame.",
    },
    {
      q: "When is brachytherapy combined with external beam radiation?",
      a: "Selected protocols use an internal boost with external beam treatment. The diagnosis, anatomy and prescribed total dose determine whether both are needed.",
    },
    {
      q: "Can radiation be given again to a previously treated area?",
      a: "Sometimes. Feasibility depends on the original dose, interval, current geometry and cumulative organ tolerance; risk may be higher.",
    },
    {
      q: "Why is simulation needed?",
      a: "Simulation establishes reproducible positioning and the anatomical dataset for contouring and dose calculation, with site-specific preparation when needed.",
    },
    {
      q: "How can I find a radiation oncologist in India?",
      a: "Use the live doctor directory to compare stored specialty, hospital, city and procedure relationships, then ask a named clinician to review the case. Directory placement is not a ranking.",
    },
    {
      q: "What side effects can occur?",
      a: "Effects depend on site, dose, fractions and concurrent therapy. The clinician should explain relevant acute and late effects and urgent warnings.",
    },
    {
      q: "How much does radiation therapy cost in India?",
      a: "The current GAF procedure table shows dynamic India planning ranges because one specialty-wide average would mix unlike treatments. The final quotation depends on technique, targets, fractions, planning, hospital and additional care.",
    },
    {
      q: "Which hospitals offer Radiation Oncology in India?",
      a: "The hospital section shows facilities with a current Radiation Oncology relationship in the GAF catalog. Confirm the exact campus, machine, technique and treatment-date availability directly; the list is not a ranking.",
    },
    {
      q: "How should course quotations be compared?",
      a: "Match site, technique, fractions and targets, then compare planning, guidance, anaesthesia, implants, reviews and exclusions. Session and course prices differ.",
    },
    {
      q: "When can an international patient fly home?",
      a: "There is no universal date. Site, acute effects, anaesthesia, neurological stability, concurrent therapy and access to care determine clearance.",
    },
    {
      q: "What follow-up is needed after radiotherapy?",
      a: "Follow-up reviews recovery and response through site-specific examination and imaging. Carry the dose summary and continue with the agreed local team.",
    },
    {
      q: "What records are needed for a radiation treatment estimate?",
      a: "The team commonly needs pathology, current staging images, previous treatment and any prior radiation dose records. Additional tests depend on the diagnosis and proposed technique.",
    },
  ],
  medicalDisclaimer:
    "This page provides general educational and travel-planning information. Dynamic GAF price and stay figures are indicative planning estimates, not hospital quotations or promises of availability or outcome. Radiation technique, dose, fractions, timing, suitability and fitness to travel must be decided by a qualified radiation oncologist and relevant multidisciplinary clinicians after review of the patient, pathology, imaging, prior radiation and current condition.",
} satisfies SpecialtyPageProfile;
