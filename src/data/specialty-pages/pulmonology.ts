import { PULMONOLOGY_PROFILES } from "@/data/cost-articles/pulmonology-profiles";
import { toSlug } from "@/lib/taxonomy";
import { cityEditorialsFromProcedureArticles } from "./city-editorials";
import type { SpecialtyPageProfile } from "./types";

const slugs = PULMONOLOGY_PROFILES.map((profile) => toSlug(profile.procedure));
const byCluster = (cluster: (typeof PULMONOLOGY_PROFILES)[number]["cluster"]) =>
  PULMONOLOGY_PROFILES
    .filter((profile) => profile.cluster === cluster)
    .map((profile) => toSlug(profile.procedure));
const pricingGroups = [...new Set(PULMONOLOGY_PROFILES.map((profile) => profile.unit))].map(
  (unit) => ({
    name: `Services quoted ${unit}`,
    basis: unit,
    explanation:
      "Compare the named procedure, anaesthesia or sedation, devices, pathology, monitoring and admission scope before comparing totals.",
    procedureSlugs: PULMONOLOGY_PROFILES
      .filter((profile) => profile.unit === unit)
      .map((profile) => toSlug(profile.procedure)),
  }),
);

export const pulmonologyIndiaProfile = {
  specialtySlug: "pulmonology",
  countrySlug: "india",
  locale: "en",
  status: "published",
  allowIndex: true,
  lastReviewed: "2026-09-14",
  seoTitle: "Pulmonology in India: Procedures and Cost Guide",
  seoDescription:
    "Explore pulmonology in India, including bronchoscopy, lung and pleural diagnostics, airway treatment, transplant care, costs, specialists and hospitals.",
  introAnswer:
    "Pulmonology assesses and treats diseases of the lungs, airways and pleura. GAF’s current India catalog includes diagnostic sampling, therapeutic bronchoscopy, pleural procedures and lung transplantation; the appropriate service depends on imaging, breathing reserve, oxygen needs, bleeding risk, the clinical question and whether a result will change treatment.",
  terminology: {
    careItem: "respiratory service",
    careItems: "respiratory services",
    practitioner: "pulmonologist",
    practitioners: "pulmonologists",
    durationLabel: "Typical procedure or stay",
  },
  overview: [
    "Pulmonology, also called respiratory medicine, covers airway, lung-parenchymal and pleural disease. Evaluation may use symptoms, examination, chest imaging, pulmonary-function testing, microbiology and tissue sampling. Interventional pulmonology adds flexible or rigid bronchoscopy, ultrasound-guided sampling, airway treatment and selected pleural procedures.",
    "A procedure should answer a defined question or solve a defined problem. Bronchoscopy can inspect the airway and obtain washings or tissue. EBUS and needle aspiration sample structures beside the airway. Transbronchial biopsy and cryobiopsy obtain peripheral lung tissue with different specimen sizes and risks. Thoracoscopy or pleuroscopy examines the pleural space. Therapeutic procedures may restore an obstructed airway or drain pleural fluid.",
    "Technique and setting depend on oxygen reserve, airway anatomy, target location, bleeding and pneumothorax risk, anticoagulants, anaesthetic needs and available rescue support. A respiratory physician may coordinate with thoracic surgery, oncology, radiology, pathology, microbiology, critical care and transplant teams. Catalog relationships do not establish that every listed service is available at every hospital.",
  ],
  conditions: [
    {
      name: "Airway lesions and obstruction",
      summary:
        "Visible narrowing, tumour, retained secretions or unexplained airway change may require diagnostic or therapeutic bronchoscopy after CT and clinical review.",
      procedureSlugs: [
        "bronchoscopy",
        "rigid-bronchoscopy",
        "endobronchial-biopsy",
        "bronchoscopic-tumor-debulking",
        "airway-stenting",
      ],
    },
    {
      name: "Lung nodules and thoracic lymph nodes",
      summary:
        "Target location and the tissue needed for pathology or molecular testing guide EBUS, TBNA, endobronchial or transbronchial sampling.",
      procedureSlugs: [
        "ebus-endobronchial-ultrasound",
        "tbna-transbronchial-needle-aspiration",
        "transbronchial-lung-biopsy",
        "endobronchial-biopsy",
      ],
    },
    {
      name: "Diffuse and interstitial lung disease",
      summary:
        "Selected cases may need transbronchial forceps or cryobiopsy only after multidisciplinary review of HRCT pattern, physiology and procedural risk.",
      procedureSlugs: [
        "transbronchial-lung-biopsy",
        "cryo-lung-biopsy",
      ],
    },
    {
      name: "Pleural effusion and pleural disease",
      summary:
        "Fluid, pleural thickening or suspected infection or malignancy may require drainage, biopsy or thoracoscopic inspection according to imaging and stability.",
      procedureSlugs: [
        "medical-thoracoscopy",
        "medical-pleuroscopy",
        "pleural-biopsy",
        "chest-tube-intercostal-drainage",
      ],
    },
    {
      name: "Airway foreign body",
      summary:
        "Suspected aspiration can require urgent flexible or rigid bronchoscopy with anaesthesia and airway-rescue planning.",
      procedureSlugs: [
        "bronchoscopy",
        "rigid-bronchoscopy",
        "foreign-body-removal-by-bronchoscopy",
      ],
    },
    {
      name: "Advanced lung disease",
      summary:
        "Lung transplantation is a separate multidisciplinary programme requiring disease, functional, psychosocial, donor and transplant-risk assessment.",
      procedureSlugs: ["lung-transplantation"],
    },
  ],
  treatmentGroups: [
    {
      name: "Diagnostic pulmonology",
      summary:
        "Airway inspection, ultrasound and tissue or fluid sampling are selected by target location and the diagnostic information required.",
      procedureSlugs: byCluster("Diagnostic pulmonology"),
    },
    {
      name: "Interventional pulmonology",
      summary:
        "Therapeutic airway procedures require equipment, anaesthesia and a documented plan for bleeding, obstruction and respiratory deterioration.",
      procedureSlugs: byCluster("Interventional pulmonology"),
    },
    {
      name: "Pleural disease",
      summary:
        "Drainage, biopsy and thoracoscopic procedures use different access, tissue and admission scopes.",
      procedureSlugs: byCluster("Pleural disease"),
    },
    {
      name: "Advanced lung disease and transplant",
      summary:
        "Transplant evaluation and treatment involve a complete multidisciplinary programme rather than a stand-alone operation.",
      procedureSlugs: byCluster("Advanced lung disease and transplant"),
    },
  ],
  selection: [
    "Selection begins with the clinical problem and recent chest imaging. The team defines whether the goal is visual inspection, microbiology, cytology, histology, nodal staging, airway reopening, pleural drainage or transplant assessment. A larger specimen is not automatically better when a lower-risk test can answer the question.",
    "Target position influences access. Central airways and adjacent lymph nodes differ from peripheral lung and pleural targets. Oxygen requirement, lung function, pulmonary hypertension, bleeding risk, anticoagulants, infection, neck and jaw access, anaesthetic risk and ability to tolerate a pneumothorax affect the plan.",
    "The service must match available support. Fluoroscopy, radial or linear ultrasound, rigid-airway control, pathology handling, interventional radiology, thoracic surgery, intensive care and transplant systems are relevant only to specific procedures. Their presence must be confirmed for the named campus.",
  ],
  treatmentProcess: [
    { label: "Clinical question", detail: "The respiratory team defines the symptom, imaging finding or treatment problem the service must address." },
    { label: "Imaging and physiology", detail: "CT location, airway or pleural anatomy, oxygen needs and pulmonary function are reviewed." },
    { label: "Risk assessment", detail: "Bleeding, anticoagulants, infection, anaesthesia, pneumothorax and rescue needs are assessed." },
    { label: "Procedure selection", detail: "The clinician chooses the least invasive service likely to provide the required diagnosis or treatment." },
    { label: "Procedure and sampling", detail: "Identity, target, route, sedation or anaesthesia and specimen allocation are checked during delivery." },
    { label: "Recovery monitoring", detail: "Breathing, oxygen, bleeding, pain and procedure-specific complications are observed." },
    { label: "Results and next decision", detail: "Pathology, microbiology or clinical response is reviewed with the relevant multidisciplinary team." },
    { label: "Follow-up", detail: "The patient receives warning signs, medication advice, pending-result arrangements and a respiratory-care plan." },
  ],
  costExplanation: [
    "Pulmonology prices must retain their stored billing unit. A bronchoscopy, biopsy procedure, theatre intervention, drainage episode and transplant programme are not comparable units. The table groups services by basis rather than calculating one misleading respiratory-medicine average.",
    "The quotation should state flexible or rigid technique, imaging or ultrasound guidance, sedation or general anaesthesia, biopsy tools, stent or drainage device, specimen processing, pathology and microbiology, ward or intensive-care cover and scheduled review.",
    "Unexpected bleeding, pneumothorax, respiratory support, additional tissue studies, a changed device or longer admission can alter cost. Flights, accommodation, oxygen arrangements and care after return are separate unless written into the estimate.",
  ],
  pricingGroups,
  costFactors: [
    { label: "Procedure and target", detail: "Inspection, nodal sampling, peripheral biopsy, airway treatment and pleural access require different resources." },
    { label: "Sedation or anaesthesia", detail: "Flexible day-care and rigid theatre procedures have different staffing and recovery needs." },
    { label: "Guidance", detail: "Ultrasound, fluoroscopy and other localisation tools may be required for selected targets." },
    { label: "Sampling and laboratory work", detail: "Cytology, histology, microbiology and molecular testing must be allocated and priced explicitly." },
    { label: "Devices", detail: "Stents, drains, blockers, cryoprobes and other single-use or implantable items can dominate cost." },
    { label: "Respiratory support", detail: "Oxygen, ventilation, high-dependency care and intensive care are additional when needed." },
    { label: "Admission", detail: "Day care, theatre recovery, ward stay and transplant admission are not equivalent." },
    { label: "Complications", detail: "Bleeding, pneumothorax, infection or airway deterioration may require unplanned treatment." },
  ],
  mayInclude: [
    "Pulmonologist or interventional-pulmonologist consultation when stated",
    "The named procedure with stated sedation or anaesthesia",
    "Standard procedure-suite or theatre resources",
    "Routine monitoring and recovery observation",
    "Specified sampling tools and standard consumables",
    "The pathology or microbiology tests expressly listed",
    "Discharge instructions and the scheduled first review",
  ],
  mayBeAdditional: [
    "New CT, PET, pulmonary-function or cardiac assessment",
    "Advanced guidance, extra biopsy tools or a changed procedure",
    "Stents, drains, blockers and other devices",
    "Special stains, cultures, molecular tests and external pathology review",
    "Blood products, embolization, thoracic surgery or intensive care",
    "Treatment required after a diagnosis is established",
    "Extra nights, oxygen, medicines and later follow-up",
    "Travel, lodging and local transport",
  ],
  technologies: [
    {
      name: "Flexible bronchoscopy",
      what: "A steerable scope used to inspect segmental airways and perform lavage, brushing or selected biopsy.",
      why: "It provides direct airway access with a smaller instrument than rigid bronchoscopy.",
      procedureSlugs: ["bronchoscopy", "endobronchial-biopsy", "transbronchial-lung-biopsy"],
    },
    {
      name: "Endobronchial ultrasound",
      what: "Ultrasound at the bronchoscope tip visualises structures beside the airway and guides needle sampling.",
      why: "It may sample mediastinal or hilar nodes and selected lesions without surgical access.",
      procedureSlugs: ["ebus-endobronchial-ultrasound", "tbna-transbronchial-needle-aspiration"],
    },
    {
      name: "Rigid bronchoscopy platform",
      what: "A straight open airway tube used under general anaesthesia for ventilation, suction and larger therapeutic tools.",
      why: "It may provide airway control for selected obstruction, bleeding, foreign-body or stent procedures.",
      procedureSlugs: ["rigid-bronchoscopy", "airway-stenting", "bronchoscopic-tumor-debulking", "foreign-body-removal-by-bronchoscopy"],
    },
    {
      name: "Cryobiopsy equipment",
      what: "A probe freezes tissue to obtain a larger specimen than standard forceps in selected lung-biopsy pathways.",
      why: "It may improve tissue architecture but requires bleeding and pneumothorax safeguards.",
      procedureSlugs: ["cryo-lung-biopsy"],
    },
    {
      name: "Medical thoracoscopy systems",
      what: "Pleural-space access allows direct inspection, fluid management and selected biopsy.",
      why: "It can combine diagnosis and pleural intervention in appropriately selected patients.",
      procedureSlugs: ["medical-thoracoscopy", "medical-pleuroscopy", "pleural-biopsy"],
    },
  ],
  internationalPatientInformation: [
    "Send recent chest CT images in DICOM format, reports, pulmonary-function results, oxygen use, previous pathology or microbiology and a clear clinical question before travel. A remote proposal remains provisional until the respiratory and anaesthesia teams review the patient.",
    "Confirm the exact campus, procedure, sedation or anaesthesia, specimen tests and rescue arrangements. Stay close enough for the first review and pending results; flexible travel is important after biopsy, drainage, airway treatment or any change in breathing.",
    "Before departure, obtain the procedure report, images where available, pathology and microbiology status, device details, medicine changes, urgent warning signs and the clinician responsible for pending results and follow-up.",
  ],
  recordsRequired: [
    "Recent chest X-ray and CT images in DICOM format with reports",
    "PET or other relevant imaging when already performed",
    "Pulmonary-function tests and oxygen requirement",
    "Previous bronchoscopy, pathology, cytology and microbiology reports",
    "Current symptoms, respiratory diagnoses and treatment history",
    "Blood count, coagulation and relevant kidney or liver tests",
    "Anticoagulants, antiplatelet medicines, allergies and current medicines",
    "Cardiac, anaesthetic and ventilation history",
    "Transplant records when advanced lung disease is being assessed",
    "Home respiratory clinician contact and follow-up plan",
  ],
  stayDuration: [
    "Many diagnostic services are day care, but observation and fitness to fly depend on sedation, bleeding, oxygen needs and pneumothorax risk. Results may take several days and can lead to additional tests or treatment.",
    "Rigid airway intervention, pleural drainage, respiratory deterioration and transplantation can require admission. Departure should remain flexible until the treating clinician confirms stability, device care and access to urgent review.",
  ],
  countryComparison: [
    "India has GAF-linked pulmonologists and hospitals across several cities, but the useful comparison is the named service and support at a named campus. Confirm equipment, anaesthesia, pathology handling and rescue capability rather than relying on a specialty label.",
    "Travel may be unsafe for unstable breathing, significant bleeding, untreated infection or urgent airway compromise. Compare the complete plan and continuity of care, not only the procedure range.",
  ],
  relatedSpecialtySlugs: [
    "medical-oncology",
    "radiation-oncology",
    "surgical-oncology",
    "cardiac-surgery",
  ],
  faqs: [
    { q: "What does a pulmonologist treat?", a: "Pulmonologists assess diseases of the airways, lung tissue and pleura and may coordinate diagnostic, medical and interventional care." },
    { q: "Is bronchoscopy always required for a lung problem?", a: "No. It is used when direct inspection, sampling or airway treatment is likely to change care and its risks are acceptable." },
    { q: "What is the difference between flexible and rigid bronchoscopy?", a: "Flexible scopes reach branching airways for inspection and sampling; rigid bronchoscopy creates a larger controlled airway corridor under general anaesthesia for selected interventions." },
    { q: "How is a lung-biopsy method selected?", a: "Target location, tissue requirement, imaging pattern, breathing reserve, bleeding and pneumothorax risk and available alternatives guide selection." },
    { q: "How much do pulmonology procedures cost in India?", a: "Costs are shown by the stored procedure basis. A day-care bronchoscopy, theatre intervention, drainage episode and transplant programme must not be averaged together." },
    { q: "Are pathology tests included?", a: "Only when the estimate lists the required cytology, histology, stains, cultures or molecular tests. Specimen collection and laboratory analysis may be separate." },
    { q: "Which hospitals provide pulmonology services in India?", a: "The page lists hospitals with current GAF specialty relationships. Confirm the exact procedure, equipment and support at the named campus." },
    { q: "Which pulmonologists are listed in India?", a: "The directory uses stored specialty, hospital and city relationships. Placement is not a ranking or proof of procedure-specific expertise." },
    { q: "What records are needed before a respiratory procedure?", a: "Recent chest imaging, respiratory history, oxygen needs, pulmonary function, medicines and previous pathology or microbiology are commonly required." },
    { q: "Can a patient fly soon after lung biopsy?", a: "Not automatically. Pneumothorax, bleeding, oxygen needs, sedation and airline conditions affect clearance." },
    { q: "Does a hospital specialty listing prove that every procedure is available?", a: "No. Confirm the exact campus, clinician, equipment, date and rescue arrangements in writing." },
    { q: "When is lung transplantation considered?", a: "It is considered only after multidisciplinary assessment of advanced lung disease, expected benefit, contraindications, support and programme eligibility." },
  ],
  cityFaqQuestions: [
    "Is bronchoscopy always required for a lung problem?",
    "How is a lung-biopsy method selected?",
    "Are pathology tests included?",
    "What records are needed before a respiratory procedure?",
    "Can a patient fly soon after lung biopsy?",
    "Does a hospital specialty listing prove that every procedure is available?",
  ],
  cityEditorials: cityEditorialsFromProcedureArticles(slugs),
  medicalDisclaimer:
    "This page provides general educational and travel-planning information. GAF ranges are indicative planning figures, not quotations, procedure recommendations or promises of availability or outcome. The diagnosis, procedure, sampling plan, anaesthesia, risk management, follow-up and fitness to travel must be decided by qualified respiratory and relevant multidisciplinary clinicians after reviewing the patient and complete records.",
} satisfies SpecialtyPageProfile;
