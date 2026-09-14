import { MEDICAL_ONCOLOGY_PROCEDURES, toSlug } from "@/lib/taxonomy";
import { cityEditorialsFromProcedureArticles } from "./city-editorials";
import type { SpecialtyPageProfile } from "./types";

const slugs = MEDICAL_ONCOLOGY_PROCEDURES.map(toSlug);
const systemicMedicineSlugs = [
  "chemotherapy",
  "immunotherapy",
  "targeted-therapy",
  "hormone-therapy",
  "molecular-targeted-therapy",
  "immune-checkpoint-inhibitor-therapy",
  "neoadjuvant-chemotherapy",
  "adjuvant-chemotherapy",
  "palliative-chemotherapy",
  "antibody-drug-conjugate-therapy",
  "maintenance-therapy",
];
const locoregionalSlugs = [
  "intraperitoneal-chemotherapy",
  "intrathecal-chemotherapy",
];
const cellularSlugs = [
  "car-t-cell-therapy",
  "bone-marrow-transplantation",
  "stem-cell-transplantation",
  "dendritic-cell-therapy",
];

export const medicalOncologyIndiaProfile = {
  specialtySlug: "medical-oncology",
  countrySlug: "india",
  locale: "en",
  status: "published",
  allowIndex: true,
  lastReviewed: "2026-09-14",
  seoTitle: "Medical Oncology in India: Treatments and Cost Guide",
  seoDescription:
    "Review medical oncology in India, including systemic therapies, biomarker-led selection, treatment costs, monitoring, hospitals, doctors and travel planning.",
  introAnswer:
    "Medical oncology uses anticancer medicines such as chemotherapy, immunotherapy, targeted therapy and hormone therapy. The appropriate regimen, dose, route and number of cycles depend on pathology, stage, biomarkers, previous treatment, organ function and the patient’s goals; a medical oncologist must review those factors before treatment or cost can be estimated.",
  terminology: {
    careItem: "therapy",
    careItems: "therapies",
    practitioner: "medical oncologist",
    practitioners: "medical oncologists",
    durationLabel: "Typical regimen or stay",
  },
  overview: [
    "Medical oncology is the specialty responsible for assessing and delivering systemic anticancer treatment. Unlike surgery or radiation, a systemic medicine can circulate through the body, although route, tissue penetration and biological target differ by treatment. The medical oncologist interprets pathology, stage, molecular findings, prior response and the patient’s health to define treatment intent and choose an evidence-based regimen.",
    "A treatment name is not a complete prescription. Chemotherapy requires named medicines, doses, cycle intervals and supportive care. Immunotherapy and targeted treatment require indication-specific evidence and may require a biomarker. Hormone therapy depends on receptor biology. Cellular therapy and transplantation involve eligibility assessment, collection or donor planning, conditioning, inpatient capability and prolonged monitoring.",
    "Treatment may be curative, neoadjuvant before local treatment, adjuvant after surgery, maintenance after response, or palliative for disease control and symptoms. Benefit and toxicity are reassessed during treatment. A multidisciplinary team may include surgical and radiation oncologists, pathologists, radiologists, organ-specific specialists, pharmacists, nurses, nutrition teams and palliative-care clinicians.",
  ],
  conditions: [
    {
      name: "Breast cancer",
      summary:
        "Pathology, stage, hormone receptors, HER2 status, genomic context and previous treatment determine whether chemotherapy, endocrine, targeted, immune or antibody-drug conjugate therapy may be considered.",
      procedureSlugs: systemicMedicineSlugs,
    },
    {
      name: "Lung cancer",
      summary:
        "Histology, stage, performance status and molecular testing can distinguish chemotherapy, immunotherapy and alteration-directed treatment pathways.",
      procedureSlugs: [
        "chemotherapy",
        "immunotherapy",
        "targeted-therapy",
        "precision-oncology",
        "molecular-targeted-therapy",
        "immune-checkpoint-inhibitor-therapy",
      ],
    },
    {
      name: "Gastrointestinal cancers",
      summary:
        "Site, stage, resectability, pathology and relevant biomarkers shape perioperative, advanced-disease and selected intraperitoneal treatment decisions.",
      procedureSlugs: [
        "chemotherapy",
        "targeted-therapy",
        "immunotherapy",
        "neoadjuvant-chemotherapy",
        "adjuvant-chemotherapy",
        "intraperitoneal-chemotherapy",
      ],
    },
    {
      name: "Gynecologic cancers",
      summary:
        "Systemic therapy may be used before or after surgery or for recurrent disease, with maintenance, targeted, immune or intraperitoneal approaches limited to appropriate protocols.",
      procedureSlugs: [
        "chemotherapy",
        "targeted-therapy",
        "immunotherapy",
        "maintenance-therapy",
        "intraperitoneal-chemotherapy",
      ],
    },
    {
      name: "Genitourinary cancers",
      summary:
        "Kidney, bladder, prostate and other genitourinary cancers use different combinations of endocrine, cytotoxic, immune and targeted treatment after disease-specific review.",
      procedureSlugs: [
        "chemotherapy",
        "immunotherapy",
        "targeted-therapy",
        "hormone-therapy",
        "immune-checkpoint-inhibitor-therapy",
      ],
    },
    {
      name: "Head, neck and other solid tumours",
      summary:
        "Medicine selection depends on primary site, pathology, stage, previous local treatment and validated biomarkers rather than one solid-tumour package.",
      procedureSlugs: [
        "chemotherapy",
        "immunotherapy",
        "targeted-therapy",
        "neoadjuvant-chemotherapy",
        "adjuvant-chemotherapy",
      ],
    },
    {
      name: "Leukaemia, lymphoma and myeloma",
      summary:
        "Haematological cancers may require disease-specific systemic regimens, CNS-directed treatment, transplantation or selected cellular therapy under a haematology-led pathway.",
      procedureSlugs: [
        "chemotherapy",
        "targeted-therapy",
        "intrathecal-chemotherapy",
        "car-t-cell-therapy",
        "bone-marrow-transplantation",
        "stem-cell-transplantation",
      ],
    },
  ],
  treatmentGroups: [
    {
      name: "Systemic anticancer medicines",
      summary:
        "Cytotoxic, immune, targeted, endocrine and conjugated medicines use different selection tests, dosing schedules and toxicity monitoring.",
      procedureSlugs: systemicMedicineSlugs,
    },
    {
      name: "Molecular assessment and treatment selection",
      summary:
        "Precision oncology connects validated pathology and molecular findings to a clinical decision; a test result alone does not establish treatment benefit.",
      procedureSlugs: ["precision-oncology"],
    },
    {
      name: "Route-specific chemotherapy",
      summary:
        "Intraperitoneal and intrathecal delivery are indication-specific procedures with access, monitoring and complication requirements beyond an ordinary infusion.",
      procedureSlugs: locoregionalSlugs,
    },
    {
      name: "Cellular and transplant programmes",
      summary:
        "Collection, manufacturing or donor work, conditioning, inpatient monitoring and post-treatment follow-up make these complete programmes rather than single medicine administrations.",
      procedureSlugs: cellularSlugs,
    },
  ],
  selection: [
    "Selection starts with a confirmed diagnosis. Histology, grade, stage, disease burden and treatment intent are reviewed alongside operative and radiation plans. A recurrence may need repeat biopsy because tumour biology and treatment sensitivity can change.",
    "Predictive biomarkers are used only where evidence supports them for the tumour and line of therapy. Receptor results, genomic alterations and immune markers must be interpreted with sample quality, timing and previous treatment. A broad molecular panel does not guarantee an actionable medicine.",
    "Performance status, blood counts, kidney and liver function, infection, heart or lung disease, autoimmune conditions, fertility goals, pregnancy possibility, current medicines and prior toxicity influence dose, schedule and suitability. Patient goals and the balance between likely benefit, burden and alternatives remain central.",
  ],
  treatmentProcess: [
    { label: "Diagnosis and staging", detail: "Pathology, imaging and clinical findings establish the cancer type, extent and treatment intent." },
    { label: "Biomarker review", detail: "Indication-specific receptor, molecular or immune-marker results are checked for validity and clinical relevance." },
    { label: "Regimen selection", detail: "The oncologist names the medicines, route, dose basis, schedule, expected cycles, alternatives and treatment goal." },
    { label: "Pre-treatment assessment", detail: "Blood counts, organ function, infection risk, medicines, comorbidities and supportive-care needs are reviewed." },
    { label: "Treatment delivery", detail: "Tablets, injections, infusions or programme-specific procedures are delivered with identity, dose and safety checks." },
    { label: "Toxicity monitoring", detail: "Symptoms, examination and laboratory results guide supportive care, delay, dose modification or urgent review." },
    { label: "Response assessment", detail: "Clinical findings, imaging, markers or marrow assessment are compared with the treatment goal at appropriate intervals." },
    { label: "Adjustment and follow-up", detail: "Treatment may continue, change or stop according to benefit, toxicity, patient preference and available alternatives." },
  ],
  costExplanation: [
    "Medical-oncology prices are meaningful only when the billing basis is explicit. A figure may cover one cycle, a set number of cycles, a monthly medicine supply, one administration, testing plus consultation, or an entire cellular-therapy or transplant episode. These scopes must not be combined into one specialty average.",
    "Medicine name, brand or biosimilar, dose, body-size basis, vial sharing, cycle count and pharmacy procurement can dominate a systemic-treatment estimate. Day-care, clinician fees, premedication, laboratory monitoring, scans, supportive medicines and management of complications may be billed separately.",
    "A written estimate should identify the regimen and assumed duration, then separate predictable treatment from costs triggered by toxicity, admission, dose change or disease reassessment. Travel and accommodation between cycles are not hospital treatment charges.",
  ],
  pricingGroups: [
    {
      name: "Systemic medicine regimens",
      basis: "Per cycle, interval or defined regimen scope",
      explanation:
        "The stored range is not comparable until medicine names, dose basis, cycle count and included monitoring are stated.",
      procedureSlugs: systemicMedicineSlugs,
    },
    {
      name: "Molecular assessment",
      basis: "Per test-and-review episode",
      explanation:
        "Confirm specimen review, assay scope, interpretation and oncology consultation rather than comparing the panel price alone.",
      procedureSlugs: ["precision-oncology"],
    },
    {
      name: "Route-specific administration",
      basis: "Per named administration procedure or course",
      explanation:
        "Access placement, theatre or day-care, medicine, monitoring and repeat administrations must be itemized.",
      procedureSlugs: locoregionalSlugs,
    },
    {
      name: "Cellular and transplant programmes",
      basis: "Per complete named treatment programme",
      explanation:
        "Eligibility, collection or donor work, manufacturing, conditioning, admission, intensive monitoring and follow-up define the scope.",
      procedureSlugs: cellularSlugs,
    },
  ],
  costFactors: [
    { label: "Medicine and dose", detail: "Drug selection, dose basis, vial size, brand and schedule materially change cost." },
    { label: "Number of cycles", detail: "One-cycle and planned-course totals are not interchangeable." },
    { label: "Biomarker testing", detail: "Pathology review and validated molecular or immune tests may be separate." },
    { label: "Administration setting", detail: "Oral supply, day-care infusion, procedure suite and inpatient delivery use different resources." },
    { label: "Monitoring", detail: "Blood tests, imaging, cardiac checks and toxicity reviews vary by regimen." },
    { label: "Supportive care", detail: "Antiemetics, growth factors, transfusion, infection treatment and nutrition may add cost." },
    { label: "Complications", detail: "Unplanned emergency care, admission or intensive care is not predictable in a package." },
    { label: "Cellular or donor work", detail: "Collection, manufacturing, HLA testing and donor evaluation apply only to selected programmes." },
  ],
  mayInclude: [
    "Medical oncologist consultation and review of available records",
    "The named medicine or regimen for the stated cycle or period",
    "Standard administration and day-care nursing when expressly listed",
    "Routine premedication and immediate observation stated in the estimate",
    "Specified blood tests and scheduled treatment reviews",
    "A treatment summary and initial follow-up plan",
  ],
  mayBeAdditional: [
    "Pathology re-review, receptor testing, molecular profiling or repeat biopsy",
    "Medicines outside the named regimen, dose escalation or additional cycles",
    "Ports, intrathecal or intraperitoneal access and anaesthesia",
    "Scans, cardiac testing and specialist consultations",
    "Growth factors, transfusions, antibiotics and other supportive treatment",
    "Emergency treatment, admission, intensive care or management of immune toxicity",
    "Collection, manufacturing, donor search, conditioning and prolonged stay for cellular therapy or transplant",
    "Flights, accommodation, meals and local transport",
  ],
  technologies: [
    {
      name: "Validated biomarker testing",
      what: "Pathology, receptor, molecular or immune-marker testing performed for a defined clinical question.",
      why: "It may identify or exclude an evidence-supported therapy and prevent treatment based on an unvalidated assumption.",
      procedureSlugs: ["precision-oncology", "targeted-therapy", "molecular-targeted-therapy", "immunotherapy"],
    },
    {
      name: "Oncology infusion day-care",
      what: "A monitored setting for medicine verification, vascular access, infusion and immediate reaction management.",
      why: "It supports safe delivery of intravenous regimens but does not prove that every drug is stocked at every campus.",
      procedureSlugs: ["chemotherapy", "immunotherapy", "immune-checkpoint-inhibitor-therapy", "antibody-drug-conjugate-therapy"],
    },
    {
      name: "Intrathecal and intraperitoneal access",
      what: "Procedure-specific access used to deliver medicine into cerebrospinal fluid or the abdominal cavity.",
      why: "Route-specific treatment requires trained teams, sterile technique and complication monitoring.",
      procedureSlugs: locoregionalSlugs,
    },
    {
      name: "Cell processing and transplant support",
      what: "Collection, laboratory, donor, blood-bank and inpatient systems required by a named cellular or transplant programme.",
      why: "The complete programme and emergency capability matter more than a therapy label alone.",
      procedureSlugs: cellularSlugs,
    },
  ],
  internationalPatientInformation: [
    "Send pathology, staging images, prior treatment dates, current medicines and available biomarker reports before travel. The medical oncologist must confirm the diagnosis, treatment intent and exact regimen; a remote opinion remains provisional until clinical assessment and any required repeat testing.",
    "Plan around treatment intervals rather than one hospital visit. Confirm where blood tests, pharmacy dispensing, infusion and emergency review occur, and whether monitoring can safely transfer to a clinician at home. Keep travel flexible through the first administration because tolerance may change the schedule.",
    "Before departure, obtain the named regimen, doses, dates, toxicity record, response assessment and urgent-warning plan. Carry contact details for both treating and home teams and confirm medicine access if treatment continues after return.",
  ],
  recordsRequired: [
    "Pathology and biopsy reports, including receptor or marker results",
    "Pathology slides or blocks when re-review may be requested",
    "Recent CT, MRI, PET or other staging images with reports",
    "Cancer stage, clinic notes and multidisciplinary recommendations",
    "Molecular or genomic reports with specimen date and assay details",
    "Previous surgery, radiation and systemic-treatment summaries",
    "Medicine names, doses, dates, response and significant toxicity",
    "Recent blood count, kidney and liver function results",
    "Current medicines, allergies, infections and major medical conditions",
    "Home oncologist contact and proposed follow-up arrangements",
  ],
  stayDuration: [
    "Stay depends on the regimen and where monitoring occurs. Some infusions are day care but repeat every few weeks; tablets may still require early laboratory and toxicity review. A patient should not assume the entire planned course must occur in one country or that it can safely be split.",
    "Cellular therapy, transplantation, severe toxicity or route-specific procedures can require admission and weeks near the treating unit. Fitness to fly depends on clinical stability, blood counts, infection risk, treatment effects and access to urgent care after return.",
  ],
  countryComparison: [
    "India has GAF-linked oncology clinicians and hospitals across several cities, but the relevant comparison is a named regimen at a named campus. Medicine procurement, biomarker testing, monitoring and emergency cover should be confirmed in writing; catalog presence is not a guarantee of stock or acceptance.",
    "Compare like-for-like treatment intent, medicine and dose, cycle assumptions, tests, administration, supportive care and follow-up. Travel may be unsuitable when urgent treatment, frequent monitoring or continuity close to home is more important than a headline price difference.",
  ],
  relatedSpecialtySlugs: [
    "radiation-oncology",
    "surgical-oncology",
    "hematology",
    "pediatric-hematology",
  ],
  faqs: [
    { q: "What does a medical oncologist do?", a: "A medical oncologist evaluates cancer, defines systemic-treatment intent, selects and monitors medicines, manages toxicity and coordinates with other cancer specialists." },
    { q: "Is medical oncology the same as chemotherapy?", a: "No. Chemotherapy is one treatment type. Medical oncology also includes endocrine, targeted, immune and selected cellular treatments." },
    { q: "How is a systemic treatment selected?", a: "Selection depends on pathology, stage, biomarkers, previous treatment, organ function, expected benefit, toxicity, alternatives and the patient’s goals." },
    { q: "Does every cancer need molecular testing?", a: "No. Testing should answer a validated question for the cancer and treatment setting; broad testing does not always change care." },
    { q: "How many treatment cycles are required?", a: "There is no universal number. The regimen, intent, response and toxicity determine planned and completed cycles." },
    { q: "How much does medical oncology cost in India?", a: "Costs must be compared by regimen and billing basis. The table keeps cycle, test, administration and programme scopes separate and does not calculate one misleading specialty average." },
    { q: "Are medicines included in a chemotherapy estimate?", a: "Only when the written estimate names them. Confirm drug, dose, cycle, administration, premedication, tests and supportive medicines." },
    { q: "Can treatment continue after returning home?", a: "Sometimes, if both teams agree the regimen, medicine supply, monitoring and emergency plan. A formal handover is required." },
    { q: "What records are needed for a medical-oncology review?", a: "Pathology, staging images, prior treatment, biomarker reports, recent laboratory results and current clinical notes are commonly required." },
    { q: "Which hospitals provide medical oncology in India?", a: "The page lists hospitals with current GAF specialty relationships. Confirm the exact campus, regimen, pharmacy availability and acceptance directly." },
    { q: "Which doctors provide medical oncology in India?", a: "The directory uses stored specialty and hospital relationships. Profiles are not rankings, and a named oncologist must review the case." },
    { q: "When can a patient fly after treatment?", a: "The treating clinician decides based on toxicity, blood counts, infection risk, hydration, thrombosis risk and access to care." },
  ],
  cityFaqQuestions: [
    "How is a systemic treatment selected?",
    "How many treatment cycles are required?",
    "Are medicines included in a chemotherapy estimate?",
    "Can treatment continue after returning home?",
    "What records are needed for a medical-oncology review?",
    "When can a patient fly after treatment?",
  ],
  cityEditorials: cityEditorialsFromProcedureArticles(slugs),
  medicalDisclaimer:
    "This page provides general educational and travel-planning information. GAF catalog ranges are indicative planning figures, not medicine quotations, treatment recommendations or promises of acceptance or outcome. Diagnosis, treatment intent, regimen, dose, route, timing, monitoring and fitness to travel must be decided by a qualified medical oncologist and relevant multidisciplinary clinicians after reviewing the patient and complete records.",
} satisfies SpecialtyPageProfile;
