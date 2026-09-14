import { costArticles } from "@/data/cost-articles";
import { treatments } from "@/lib/treatments";
import { getSpecialty } from "@/lib/taxonomy";
import { cityEditorialsFromProcedureArticles } from "./city-editorials";
import type {
  SpecialtyPageProfile,
  SpecialtyPricingGroup,
  SpecialtyTerminology,
  SpecialtyTreatmentGroup,
} from "./types";

type ClinicalConfig = {
  specialtySlug: string;
  terminology: SpecialtyTerminology;
  definition: string;
  selectionFocus: string[];
  records: string[];
  costFocus: string[];
  relatedSpecialtySlugs: string[];
};

const CONFIGS: ClinicalConfig[] = [
  {
    specialtySlug: "surgical-oncology",
    terminology: { careItem: "cancer operation", careItems: "cancer operations", practitioner: "surgical oncologist", practitioners: "surgical oncologists", durationLabel: "Typical operation or stay" },
    definition: "Surgical oncology evaluates whether a solid tumour can and should be removed, how wide the operation must be, and how surgery fits with systemic therapy or radiation. The plan depends on tumour site, stage, resectability, pathology, reconstruction needs and the patient’s operative fitness.",
    selectionFocus: ["site-specific staging and resectability", "margin, nodal and organ-preservation goals", "reconstruction, anaesthesia and postoperative support"],
    records: ["Pathology report, slides or blocks", "Site-specific staging images in DICOM format", "Prior chemotherapy, immunotherapy or radiation summary", "Operative notes from previous cancer surgery"],
    costFocus: ["the exact resection and reconstruction planned", "theatre time, implants, pathology, ward or intensive-care requirements"],
    relatedSpecialtySlugs: ["medical-oncology", "radiation-oncology", "gastroenterology"],
  },
  {
    specialtySlug: "hematology",
    terminology: { careItem: "hematology service", careItems: "hematology services", practitioner: "hematologist", practitioners: "hematologists", durationLabel: "Typical course or stay" },
    definition: "Hematology assesses disorders of blood, marrow and lymphatic tissue, including malignant and non-malignant disease. Diagnosis and treatment depend on blood counts, morphology, marrow findings, flow cytometry, molecular results, transfusion needs, infection risk and organ function.",
    selectionFocus: ["confirmed lineage and disease classification", "donor, HLA and transplant eligibility where relevant", "cytopenia, infection, bleeding and organ-function risk"],
    records: ["Serial complete blood counts and peripheral-smear reports", "Bone-marrow aspirate, biopsy, flow-cytometry and cytogenetic reports", "Molecular testing and treatment-response records", "Transfusion, infection and HLA-typing history"],
    costFocus: ["diagnostic episode, treatment cycle or complete transplant programme", "donor work-up, medicines, blood products, isolation and complication support"],
    relatedSpecialtySlugs: ["medical-oncology", "pediatric-hematology", "nephrology"],
  },
  {
    specialtySlug: "pediatric-hematology",
    terminology: { careItem: "pediatric blood-care service", careItems: "pediatric blood-care services", practitioner: "pediatric hematologist", practitioners: "pediatric hematologists", durationLabel: "Typical course or stay" },
    definition: "Pediatric hematology manages blood and marrow disorders in infants, children and adolescents using age- and weight-specific assessment. The pathway must account for diagnosis, growth, development, prior treatment, infection and transfusion history, donor options and long-term effects.",
    selectionFocus: ["age-specific disease classification and dosing", "growth, fertility and late-effect considerations", "family support, donor assessment and pediatric intensive-care access"],
    records: ["Pediatric blood counts and smear reports", "Marrow, flow-cytometry, cytogenetic and molecular reports", "Growth chart, vaccination and infection history", "Transfusion, donor and HLA records"],
    costFocus: ["weight-based treatment, diagnostic episode or transplant programme", "pediatric ward, donor work, blood products, isolation and family accommodation"],
    relatedSpecialtySlugs: ["hematology", "medical-oncology", "pediatric-cardiac-surgery"],
  },
  {
    specialtySlug: "cardiac-surgery",
    terminology: { careItem: "heart operation", careItems: "heart operations", practitioner: "cardiac surgeon", practitioners: "cardiac surgeons", durationLabel: "Typical operation or stay" },
    definition: "Cardiac surgery treats selected coronary, valve, aortic and structural heart disease through open, minimally invasive or hybrid operations. Selection depends on anatomy, symptom burden, ventricular function, coronary and valve findings, operative risk and whether catheter-based treatment is appropriate.",
    selectionFocus: ["coronary, valve and aortic anatomy", "ventricular, lung, kidney and neurological risk", "open, minimally invasive, hybrid and catheter alternatives"],
    records: ["Echocardiogram images and report", "Coronary angiogram or CT angiography in DICOM format", "ECG, rhythm monitoring and cardiac-function records", "Previous cardiac operation or catheter-procedure notes"],
    costFocus: ["the named operation, graft, valve or aortic prosthesis", "heart-lung bypass, intensive care, blood products and rehabilitation"],
    relatedSpecialtySlugs: ["cardiology", "pediatric-cardiac-surgery", "pulmonology"],
  },
  {
    specialtySlug: "pediatric-cardiac-surgery",
    terminology: { careItem: "congenital heart procedure", careItems: "congenital heart procedures", practitioner: "pediatric cardiac surgeon", practitioners: "pediatric cardiac surgeons", durationLabel: "Typical procedure or stay" },
    definition: "Pediatric cardiac surgery treats congenital heart defects in newborns, children and selected adults with congenital disease. Timing and technique depend on precise anatomy, oxygenation, pressure and flow effects, growth, previous palliation and the need for staged treatment.",
    selectionFocus: ["segmental congenital anatomy and haemodynamics", "age, weight, oxygenation and growth", "single-stage repair, palliation or catheter-based alternatives"],
    records: ["Congenital echocardiogram images and report", "Cardiac CT, MRI or catheterization data", "Birth, growth, oxygen-saturation and medication history", "Prior shunt, repair or catheter-procedure notes"],
    costFocus: ["the exact repair, palliation or catheter procedure", "pediatric perfusion, implants, intensive care and possible staged treatment"],
    relatedSpecialtySlugs: ["cardiac-surgery", "cardiology", "pediatric-hematology"],
  },
  {
    specialtySlug: "cardiology",
    terminology: { careItem: "cardiology procedure", careItems: "cardiology procedures", practitioner: "cardiologist", practitioners: "cardiologists", durationLabel: "Typical procedure or stay" },
    definition: "Cardiology assesses and treats coronary, rhythm, valve, structural and heart-failure conditions with medicines, imaging and catheter-based procedures. A safe plan requires a defined diagnosis, anatomy, symptom burden, ventricular function, rhythm and comparison with medical or surgical alternatives.",
    selectionFocus: ["coronary, rhythm, valve or structural diagnosis", "ventricular function and kidney, bleeding or stroke risk", "medical, catheter-based and surgical alternatives"],
    records: ["ECG and rhythm-monitoring reports", "Echocardiogram images and report", "Coronary angiogram, CT or cardiac MRI", "Current cardiac medicines and prior intervention notes"],
    costFocus: ["diagnostic study, device or named catheter intervention", "contrast, implants, electrophysiology mapping, observation and intensive care"],
    relatedSpecialtySlugs: ["cardiac-surgery", "pediatric-cardiac-surgery", "nephrology"],
  },
  {
    specialtySlug: "bariatric-surgery",
    terminology: { careItem: "metabolic operation", careItems: "metabolic operations", practitioner: "bariatric surgeon", practitioners: "bariatric surgeons", durationLabel: "Typical operation or stay" },
    definition: "Bariatric and metabolic surgery treats selected patients with obesity and related metabolic disease through procedures that alter stomach capacity, intestinal flow or both. Selection requires body-mass and comorbidity assessment, previous weight treatment, nutrition and psychological review, anaesthetic risk and commitment to lifelong follow-up.",
    selectionFocus: ["weight history and obesity-related disease", "nutrition, eating behaviour and psychological readiness", "reflux, previous abdominal surgery and long-term follow-up capacity"],
    records: ["Weight, height and longitudinal weight history", "Diabetes, sleep-apnoea, liver and cardiovascular assessments", "Nutrition and psychological evaluations", "Previous bariatric or abdominal operation notes"],
    costFocus: ["the exact primary or revision operation", "stapling devices, anaesthesia, leak assessment, ward stay and nutritional follow-up"],
    relatedSpecialtySlugs: ["gastroenterology", "surgical-gastroenterology", "cardiology"],
  },
  {
    specialtySlug: "cosmetic-surgery",
    terminology: { careItem: "plastic surgery procedure", careItems: "plastic surgery procedures", practitioner: "plastic surgeon", practitioners: "plastic surgeons", durationLabel: "Typical procedure or stay" },
    definition: "Cosmetic and reconstructive plastic surgery changes form, restores tissue or addresses functional consequences using procedure-specific operative planning. Suitability depends on anatomy, goals, skin and tissue quality, previous surgery, healing risk, anaesthesia and whether expectations are clinically achievable.",
    selectionFocus: ["anatomy, function and clearly defined treatment goals", "skin, scar, smoking, healing and anaesthetic risk", "implant, graft, staged-procedure and revision considerations"],
    records: ["Standardized clinical photographs when appropriate", "Previous plastic-surgery procedure and implant records", "Medical conditions, medicines, smoking and healing history", "Relevant imaging or specialist reports for reconstructive cases"],
    costFocus: ["the named procedure, treated areas and whether surgery is staged", "implants, garments, grafts, anaesthesia, facility and aftercare"],
    relatedSpecialtySlugs: ["ent", "surgical-oncology", "ophthalmology"],
  },
  {
    specialtySlug: "ent",
    terminology: { careItem: "ENT procedure", careItems: "ENT procedures", practitioner: "ENT specialist", practitioners: "ENT specialists", durationLabel: "Typical procedure or stay" },
    definition: "Ear, nose and throat care covers hearing, sinus, airway, voice, swallowing, sleep and head-and-neck disorders. Procedure choice depends on examination, endoscopy, hearing or vestibular tests, imaging, pathology, airway risk and the functional outcome being pursued.",
    selectionFocus: ["ear, nasal, sinus, airway, voice or swallowing diagnosis", "endoscopic, audiological and imaging findings", "hearing, breathing, speech and nerve-preservation goals"],
    records: ["ENT examination and endoscopy reports", "Audiogram, tympanometry or vestibular testing", "CT or MRI images for sinus, temporal-bone or neck disease", "Pathology and previous ENT operation notes"],
    costFocus: ["the exact endoscopic, microscopic, airway or implant procedure", "navigation, hearing implant, prosthesis, pathology and postoperative monitoring"],
    relatedSpecialtySlugs: ["pulmonology", "neurosurgery", "cosmetic-surgery"],
  },
  {
    specialtySlug: "gastroenterology",
    terminology: { careItem: "digestive-care procedure", careItems: "digestive-care procedures", practitioner: "gastroenterologist", practitioners: "gastroenterologists", durationLabel: "Typical procedure or stay" },
    definition: "Gastroenterology evaluates and treats diseases of the oesophagus, stomach, bowel, liver, pancreas and bile ducts using clinical assessment, endoscopy, imaging and medical therapy. The correct procedure depends on symptoms, anatomy, laboratory findings, bleeding or infection risk and the diagnostic or therapeutic goal.",
    selectionFocus: ["upper GI, bowel, liver, pancreatic or biliary diagnosis", "endoscopic findings, imaging and laboratory evidence", "bleeding, infection, sedation and perforation risk"],
    records: ["Prior endoscopy reports, images and pathology", "Abdominal CT, MRI, MRCP or ultrasound images", "Liver tests, blood count and coagulation results", "Digestive symptoms, medicines and previous procedure notes"],
    costFocus: ["diagnostic versus therapeutic endoscopy and the exact intervention", "sedation, devices, pathology, imaging guidance and admission"],
    relatedSpecialtySlugs: ["surgical-gastroenterology", "bariatric-surgery", "surgical-oncology"],
  },
  {
    specialtySlug: "surgical-gastroenterology",
    terminology: { careItem: "digestive operation", careItems: "digestive operations", practitioner: "GI surgeon", practitioners: "GI surgeons", durationLabel: "Typical operation or stay" },
    definition: "Surgical gastroenterology treats selected oesophageal, stomach, bowel, liver, pancreatic, biliary and abdominal-wall disease. Planning depends on diagnosis, anatomy, disease extent, nutrition, organ function, previous operations and whether endoscopic, laparoscopic, robotic or open treatment is most appropriate.",
    selectionFocus: ["site-specific anatomy and disease extent", "nutrition, liver, pancreatic and bowel function", "endoscopic, minimally invasive and open alternatives"],
    records: ["Endoscopy, pathology and prior biopsy reports", "Abdominal CT, MRI, MRCP or PET images", "Liver, kidney, nutrition and coagulation tests", "Previous abdominal-operation notes and discharge summaries"],
    costFocus: ["the named resection, reconstruction or transplant programme", "staplers, energy devices, implants, pathology, intensive care and nutrition support"],
    relatedSpecialtySlugs: ["gastroenterology", "surgical-oncology", "bariatric-surgery"],
  },
  {
    specialtySlug: "urology",
    terminology: { careItem: "urology procedure", careItems: "urology procedures", practitioner: "urologist", practitioners: "urologists", durationLabel: "Typical procedure or stay" },
    definition: "Urology treats urinary-tract, prostate, kidney, bladder and selected male-reproductive conditions with endoscopic, percutaneous, laparoscopic, robotic or open procedures. Choice depends on diagnosis, anatomy, stone or tumour burden, kidney function, infection, continence and fertility goals.",
    selectionFocus: ["kidney, ureter, bladder, prostate or reproductive diagnosis", "imaging, renal function, infection and obstruction", "organ preservation, continence, fertility and minimally invasive alternatives"],
    records: ["Urinary CT, MRI, ultrasound or nuclear-renogram images", "Urine culture, kidney-function and PSA results where relevant", "Pathology and cystoscopy reports", "Previous stone, prostate, bladder or kidney procedure notes"],
    costFocus: ["the exact endoscopic, stone, reconstructive or cancer procedure", "laser, disposable scopes, stents, implants, pathology and admission"],
    relatedSpecialtySlugs: ["nephrology", "surgical-oncology", "gynecology"],
  },
  {
    specialtySlug: "spine-surgery",
    terminology: { careItem: "spine procedure", careItems: "spine procedures", practitioner: "spine surgeon", practitioners: "spine surgeons", durationLabel: "Typical procedure or stay" },
    definition: "Spine surgery treats selected compression, instability, deformity, trauma and tumour conditions after symptoms, neurological findings and imaging are correlated. The plan must distinguish decompression from fusion, define levels and approach, and compare surgery with non-operative care where appropriate.",
    selectionFocus: ["symptom, examination and imaging correlation", "neurological deficit, instability, deformity and pain source", "levels, approach, implants and non-operative alternatives"],
    records: ["Spine MRI and CT images in DICOM format", "Standing X-rays or dynamic films where relevant", "Neurological examination and electrodiagnostic reports", "Previous spine procedure and implant records"],
    costFocus: ["region, number of levels, approach and decompression or fusion scope", "implants, navigation, monitoring, graft, intensive care and rehabilitation"],
    relatedSpecialtySlugs: ["neurosurgery", "neurology", "orthopedics"],
  },
  {
    specialtySlug: "pediatric-orthopaedic",
    terminology: { careItem: "pediatric orthopaedic procedure", careItems: "pediatric orthopaedic procedures", practitioner: "pediatric orthopaedic surgeon", practitioners: "pediatric orthopaedic surgeons", durationLabel: "Typical procedure or stay" },
    definition: "Pediatric orthopaedics treats congenital, developmental, growth-related and traumatic bone and joint conditions in children. Decisions depend on age, growth remaining, alignment, function, neuromuscular status, imaging and the effect of treatment on future development.",
    selectionFocus: ["age, growth remaining and developmental stage", "alignment, gait, function and neuromuscular status", "casting, guided growth, reconstruction and staged-treatment alternatives"],
    records: ["Growth chart and developmental history", "Standing or age-appropriate X-rays and relevant MRI or CT", "Gait, neurological and physiotherapy assessments", "Previous casting, bracing or operation records"],
    costFocus: ["the exact correction, side, level and whether treatment is staged", "pediatric implants, casts, imaging, rehabilitation and family stay"],
    relatedSpecialtySlugs: ["orthopedics", "spine-surgery", "neurology"],
  },
  {
    specialtySlug: "orthopedics",
    terminology: { careItem: "orthopaedic procedure", careItems: "orthopaedic procedures", practitioner: "orthopaedic surgeon", practitioners: "orthopaedic surgeons", durationLabel: "Typical procedure or stay" },
    definition: "Orthopaedics treats joint degeneration, sports injury, trauma, non-union and limb conditions using non-operative care, arthroscopy, fixation, reconstruction or replacement. Selection depends on symptoms, examination, imaging, alignment, bone quality, activity goals and previous treatment.",
    selectionFocus: ["joint, ligament, fracture or limb diagnosis", "pain, instability, alignment, bone quality and function", "rehabilitation, implant and joint-preservation alternatives"],
    records: ["Weight-bearing X-rays and relevant MRI or CT", "Clinical examination and functional assessment", "Previous injection, physiotherapy and operation records", "Implant details for revision surgery"],
    costFocus: ["the exact joint, side, implant and primary or revision scope", "navigation or robotics, grafts, fixation, ward stay and rehabilitation"],
    relatedSpecialtySlugs: ["pediatric-orthopaedic", "spine-surgery", "neurology"],
  },
  {
    specialtySlug: "ophthalmology",
    terminology: { careItem: "eye procedure", careItems: "eye procedures", practitioner: "ophthalmologist", practitioners: "ophthalmologists", durationLabel: "Typical procedure or recovery" },
    definition: "Ophthalmology evaluates and treats cataract, corneal, retinal, glaucoma, refractive and ocular-motility conditions. Procedure choice depends on visual function, examination, ocular imaging, pressure, biometry, retinal or optic-nerve status and realistic visual goals.",
    selectionFocus: ["anterior-segment, retinal, glaucoma or motility diagnosis", "visual acuity, pressure, imaging and biometry", "lens, corneal, retinal and refractive alternatives"],
    records: ["Visual-acuity and refraction records", "Slit-lamp, retinal, OCT and pressure findings", "Biometry, corneal topography or visual-field tests", "Previous eye procedure and implanted-lens details"],
    costFocus: ["eye, procedure, lens or device and whether treatment is staged", "imaging, consumables, anaesthesia, medicines and follow-up"],
    relatedSpecialtySlugs: ["neurology", "pediatric-orthopaedic", "cosmetic-surgery"],
  },
  {
    specialtySlug: "gynecology",
    terminology: { careItem: "gynecology procedure", careItems: "gynecology procedures", practitioner: "gynecologist", practitioners: "gynecologists", durationLabel: "Typical procedure or stay" },
    definition: "Gynecology treats uterine, ovarian, cervical, pelvic-floor and reproductive-health conditions through medical, endoscopic, minimally invasive or open care. Selection depends on diagnosis, symptoms, imaging, pathology, fertility goals, menopausal status and cancer risk.",
    selectionFocus: ["uterine, ovarian, cervical or pelvic-floor diagnosis", "bleeding, pain, imaging, pathology and anaemia", "fertility, organ preservation and minimally invasive alternatives"],
    records: ["Pelvic ultrasound and MRI images where relevant", "Cervical screening, hysteroscopy and pathology reports", "Menstrual, obstetric and fertility history", "Previous pelvic-operation notes and current blood tests"],
    costFocus: ["the exact diagnostic, fertility-preserving or definitive procedure", "laparoscopy or robotics, pathology, blood products and postoperative care"],
    relatedSpecialtySlugs: ["urology", "surgical-oncology", "medical-oncology"],
  },
  {
    specialtySlug: "neurosurgery",
    terminology: { careItem: "neurosurgical procedure", careItems: "neurosurgical procedures", practitioner: "neurosurgeon", practitioners: "neurosurgeons", durationLabel: "Typical procedure or stay" },
    definition: "Neurosurgery treats selected brain, spine, nerve and cerebrovascular conditions using open, endoscopic, stereotactic or endovascular techniques. Planning depends on neurological findings, lesion location, imaging, pathology, urgency, functional risk and comparison with observation, radiation or medical care.",
    selectionFocus: ["brain, spine, nerve or vascular anatomy", "neurological deficit, seizure, pressure and urgency", "open, endoscopic, stereotactic, endovascular and non-operative alternatives"],
    records: ["Brain or spine MRI and CT images in DICOM format", "Angiography, functional imaging or tractography when performed", "Neurological, seizure and medicine history", "Pathology and previous neurosurgical procedure notes"],
    costFocus: ["the exact lesion, approach and open or minimally invasive technique", "navigation, monitoring, implants, intensive care and pathology"],
    relatedSpecialtySlugs: ["neurology", "spine-surgery", "radiation-oncology"],
  },
  {
    specialtySlug: "neurology",
    terminology: { careItem: "neurology service", careItems: "neurology services", practitioner: "neurologist", practitioners: "neurologists", durationLabel: "Typical test, treatment or stay" },
    definition: "Neurology diagnoses and manages disorders of the brain, spinal cord, nerves and muscles using clinical examination, imaging, electrophysiology and disease-specific treatment. The pathway depends on onset, neurological pattern, urgency, test validity, functional impact and whether a procedural or surgical opinion is needed.",
    selectionFocus: ["time course and localization of neurological symptoms", "imaging, EEG, nerve, muscle and laboratory evidence", "stroke, seizure, movement, immune and neuromuscular treatment risks"],
    records: ["Neurology clinic and examination notes", "Brain or spine MRI and CT images", "EEG, EMG, nerve-conduction or sleep-study reports", "Medicine trials, response and adverse-effect history"],
    costFocus: ["diagnostic test, monitoring admission or named treatment course", "devices, medicines, imaging, laboratory work and rehabilitation"],
    relatedSpecialtySlugs: ["neurosurgery", "spine-surgery", "ophthalmology"],
  },
  {
    specialtySlug: "nephrology",
    terminology: { careItem: "kidney-care service", careItems: "kidney-care services", practitioner: "nephrologist", practitioners: "nephrologists", durationLabel: "Typical session, procedure or stay" },
    definition: "Nephrology manages acute and chronic kidney disease, dialysis, immune-mediated kidney disorders and medical aspects of transplantation. Decisions depend on kidney function trend, urine findings, fluid and electrolyte status, blood pressure, imaging, biopsy evidence, comorbidities and transplant eligibility.",
    selectionFocus: ["acute versus chronic kidney dysfunction and cause", "fluid, electrolyte, blood-pressure and dialysis needs", "biopsy, immune treatment, access and transplant pathways"],
    records: ["Serial creatinine, eGFR, electrolyte and urine-protein results", "Urinalysis, immune and infection investigations", "Kidney ultrasound, CT or biopsy report and slides", "Dialysis prescription, vascular-access and transplant records"],
    costFocus: ["consultation, biopsy, dialysis session, access procedure or transplant programme", "medicines, laboratory monitoring, disposables, donor work and admission"],
    relatedSpecialtySlugs: ["urology", "cardiology", "hematology"],
  },
];

function proceduresFor(specialtySlug: string) {
  return treatments.filter((treatment) =>
    treatment.specialtySlugs.includes(specialtySlug),
  );
}

function classifyTreatment(name: string) {
  const value = name.toLowerCase();
  if (/(biopsy|aspiration|angiograph|endoscop|scopy|eeg|emg|test|monitor|mapping|diagnostic)/.test(value)) {
    return "Diagnostic and assessment procedures";
  }
  if (/(transplant|car-t)/.test(value)) return "Transplant and advanced programmes";
  if (/(ablation|stent|embol|catheter|arthroscop|laser|injection|lithotrips|angioplast|tavr|tavi|drain|dialysis)/.test(value)) {
    return "Interventional and minimally invasive care";
  }
  if (/(surgery|replacement|ectomy|repair|reconstruction|bypass|fusion|decompression|fixation|resection|craniotom|osteotomy|plasty)/.test(value)) {
    return "Operative care";
  }
  return "Medical and procedure-based care";
}

function treatmentGroups(slugsAndNames: { slug: string; name: string }[]): SpecialtyTreatmentGroup[] {
  const groups = new Map<string, string[]>();
  for (const procedure of slugsAndNames) {
    const name = classifyTreatment(procedure.name);
    groups.set(name, [...(groups.get(name) ?? []), procedure.slug]);
  }
  return [...groups].map(([name, procedureSlugs]) => ({
    name,
    summary:
      "These catalog services share a broad delivery setting, but each keeps its own indication, technique, risks, duration and written estimate.",
    procedureSlugs,
  }));
}

function pricingBasis(name: string) {
  const value = name.toLowerCase();
  if (/(transplant|car-t)/.test(value)) return "Per complete named programme";
  if (/(chemotherapy|immunotherapy|dialysis|plasmapheresis)/.test(value)) {
    return "Per named cycle or session";
  }
  if (/(radiotherapy|therapy|rehabilitation)/.test(value)) {
    return "Per defined course or treatment plan";
  }
  if (/(biopsy|aspiration|angiograph|endoscop|scopy|eeg|emg|test|monitor|mapping)/.test(value)) {
    return "Per diagnostic or assessment episode";
  }
  return "Per named procedure and stated admission";
}

function pricingGroups(slugsAndNames: { slug: string; name: string }[]): SpecialtyPricingGroup[] {
  const groups = new Map<string, string[]>();
  for (const procedure of slugsAndNames) {
    const basis = pricingBasis(procedure.name);
    groups.set(basis, [...(groups.get(basis) ?? []), procedure.slug]);
  }
  return [...groups].map(([basis, procedureSlugs]) => ({
    name: basis.replace(/^Per /, ""),
    basis,
    explanation:
      "Compare only estimates that name the same clinical scope, technique, devices, admission, monitoring and exclusions.",
    procedureSlugs,
  }));
}

function profileFromConfig(config: ClinicalConfig): SpecialtyPageProfile {
  const specialty = getSpecialty(config.specialtySlug);
  if (!specialty) throw new Error(`Unknown specialty ${config.specialtySlug}`);
  const procedures = proceduresFor(config.specialtySlug);
  const procedureSlugs = procedures.map((procedure) => procedure.slug);
  const articleCoverage =
    procedureSlugs.filter((slug) => Boolean(costArticles[slug])).length /
    procedureSlugs.length;
  const publishable = articleCoverage >= 0.9;
  const conditions = [...new Set(procedures.flatMap((procedure) => procedure.conditions))]
    .map((name) => ({
      name,
      summary: `The appropriate ${config.terminology.careItem} depends on the confirmed diagnosis, severity, patient factors and whether it will change treatment or function.`,
      procedureSlugs: procedures
        .filter((procedure) => procedure.conditions.includes(name))
        .map((procedure) => procedure.slug),
    }))
    .filter((condition) => condition.procedureSlugs.length > 0)
    .slice(0, 10);
  const decisionText = config.selectionFocus.join(", ");
  const priceText = config.costFocus.join("; ");

  return {
    specialtySlug: config.specialtySlug,
    countrySlug: "india",
    locale: "en",
    status: publishable ? "published" : "draft",
    allowIndex: publishable,
    lastReviewed: "2026-09-14",
    seoTitle: `${specialty.name} in India: Procedures and Cost Guide`,
    seoDescription: `Review ${specialty.name.toLowerCase()} in India, including ${config.terminology.careItems}, selection, planning costs, connected doctors, hospitals and eligible city guides.`,
    introAnswer: config.definition,
    terminology: config.terminology,
    overview: [
      config.definition,
      `A specialty label is not a treatment recommendation. Safe planning requires ${decisionText}. The named ${config.terminology.practitioner} must review original records and explain alternatives, material risks, expected recovery and follow-up before travel or cost is finalized.`,
      `The directory below uses current catalog relationships for ${procedures.length} ${config.terminology.careItems}. It does not rank clinicians or guarantee that every service is available at every campus. GAF confirms the doctor, hospital, clinical scope and written estimate for an individual case.`,
    ],
    conditions,
    treatmentGroups: treatmentGroups(procedures),
    selection: [
      `Selection begins with a confirmed diagnosis and a precise clinical question. Review includes ${config.selectionFocus[0]} and ${config.selectionFocus[1]}. A procedure name or scan finding alone is not enough to establish suitability.`,
      `The treating team considers ${config.selectionFocus[2]}, current symptoms, medicines, previous treatment, comorbidities and the patient’s goals. Urgent or unstable illness may make travel inappropriate.`,
      `Alternatives and sequencing must be explicit. The specialist should explain why the proposed ${config.terminology.careItem} is preferred, what result is expected to change care, and how recovery and follow-up will continue after the patient returns home.`,
    ],
    treatmentProcess: [
      { label: "Record review", detail: `The ${config.terminology.practitioner} reviews the diagnosis, prior treatment, current symptoms and original imaging or test material.` },
      { label: "Clinical assessment", detail: `The team confirms ${decisionText} and identifies missing investigations or urgent risks.` },
      { label: "Options discussion", detail: "Reasonable non-procedural, procedural and staged alternatives are compared with expected benefit and material risk." },
      { label: "Named plan", detail: `The written plan identifies the exact ${config.terminology.careItem}, technique, responsible clinician, campus and anticipated schedule.` },
      { label: "Pre-treatment checks", detail: "Anaesthetic, medicine, infection, bleeding, organ-function and support requirements are checked as relevant." },
      { label: "Treatment and monitoring", detail: "The named team delivers care with procedure-specific safety checks and escalation arrangements." },
      { label: "Discharge and handover", detail: "The patient receives records, warning signs, medicine instructions, pending-result ownership and a follow-up plan." },
    ],
    costExplanation: [
      `A ${specialty.name.toLowerCase()} estimate is useful only when its billing basis and clinical scope are stated. Important scope includes ${priceText}. Unlike units must not be combined into one specialty average.`,
      "The written estimate should separate the named procedure or course from tests, professional fees, devices, medicines, pathology, ward care, intensive care and follow-up. Optional or complication-triggered charges should remain separate.",
      "Catalog ranges are planning figures, not hospital quotations. The final amount can change after record review, examination, additional testing or a change in technique, device, duration or admission.",
    ],
    pricingGroups: pricingGroups(procedures),
    costFactors: [
      { label: "Clinical scope", detail: config.costFocus[0] },
      { label: "Resources and support", detail: config.costFocus[1] },
      { label: "Diagnostic work", detail: "Repeat imaging, pathology, laboratory or physiological testing may be required before treatment." },
      { label: "Technique and devices", detail: "Approach, guidance, implants, disposables and specialist equipment can materially change cost." },
      { label: "Admission", detail: "Day care, ward, high-dependency and intensive-care scopes are not interchangeable." },
      { label: "Recovery and follow-up", detail: "Medicines, rehabilitation, wound or device care and scheduled reviews should be itemized." },
      { label: "Unexpected care", detail: "Complications, extra procedures or a longer stay cannot be guaranteed inside a standard package." },
    ],
    mayInclude: [
      `Initial ${config.terminology.practitioner} consultation and record review`,
      `The named ${config.terminology.careItem} and stated technique`,
      "Standard facility, nursing and monitoring expressly listed",
      "Named routine medicines, consumables or devices",
      "Specified laboratory, imaging or pathology work",
      "Discharge summary and first scheduled review",
    ],
    mayBeAdditional: [
      "Repeat specialist consultation or multidisciplinary review",
      "New imaging, pathology review or diagnostic testing",
      "Alternative, upgraded or additional devices and consumables",
      "Blood products, intensive care or treatment of complications",
      "Additional procedures, medicines or a longer admission",
      "Rehabilitation and follow-up beyond the stated period",
      "Flights, accommodation, meals and local transport",
    ],
    technologies: [
      {
        name: "Procedure-specific equipment and clinical support",
        what: `The equipment, imaging, laboratory, anaesthetic and recovery resources required for the selected ${config.terminology.careItem}.`,
        why: "Availability must be confirmed for the named procedure, clinician, campus and treatment date rather than inferred from a hospital specialty label.",
        procedureSlugs,
      },
    ],
    internationalPatientInformation: [
      `Send the listed records before travel so a named ${config.terminology.practitioner} can determine whether remote review is sufficient or further assessment is required. A preliminary opinion is not final clearance for treatment or flying.`,
      "Confirm the exact campus, clinician, procedure scope, estimate assumptions, expected stay, attendant needs and emergency arrangements before booking travel. Keep flights and lodging flexible until the clinical plan is accepted.",
      "Before departure, obtain procedure and discharge records, pathology or test results, device details where relevant, medicine changes, warning signs and named contacts for pending results and follow-up at home.",
    ],
    recordsRequired: [
      ...config.records,
      "Current symptoms, diagnoses and recent clinic notes",
      "Current medicines, allergies and major medical conditions",
      "Recent blood count, kidney and liver function where relevant",
      "Previous treatment dates, response and complications",
      "Passport details only after a clinical provider requests them for travel documentation",
      "Home clinician contact and proposed follow-up arrangements",
    ],
    stayDuration: [
      `Stay varies across the listed ${config.terminology.careItems}; use the procedure row as planning guidance rather than a promise. The treating team decides observation, admission and fitness to fly after reviewing clinical risk and recovery.`,
      "International patients should allow time for assessment, pending results and an early review. A changed plan, complication or need for rehabilitation can extend the stay, so flexible travel arrangements are safer than a fixed departure immediately after treatment.",
    ],
    countryComparison: [
      `India has GAF-linked ${config.terminology.practitioners} and hospitals across several cities. Compare a named clinician, campus and complete clinical scope rather than assuming all hospitals offer every ${config.terminology.careItem}.`,
      "Compare like-for-like billing units, technique, devices, tests, admission, follow-up and exclusions. Travel cost and a headline procedure range should not outweigh clinical suitability, urgency or continuity of care.",
    ],
    relatedSpecialtySlugs: config.relatedSpecialtySlugs,
    faqs: [
      { q: `What does a ${config.terminology.practitioner} do?`, a: `A ${config.terminology.practitioner} evaluates the relevant diagnosis, explains treatment options and coordinates procedure-specific assessment, delivery and follow-up.` },
      { q: `How is a ${config.terminology.careItem} selected?`, a: `Selection depends on ${decisionText}, prior treatment, current health, alternatives and the patient’s goals.` },
      { q: `How much does ${specialty.name.toLowerCase()} cost in India?`, a: "The table shows planning ranges by compatible billing basis. A personalized written estimate is required because one specialty average would combine unlike scopes." },
      { q: "Are all tests and devices included?", a: "Only items expressly named in the estimate are included. Confirm imaging, pathology, laboratory work, medicines, implants, disposables and monitoring." },
      { q: "Which doctors are listed?", a: `The page lists catalog-connected ${config.terminology.practitioners}. It is not a ranking, and the named clinician must accept and review the case.` },
      { q: "Which hospitals are listed?", a: "Hospitals require a matching specialist relationship for this page. Confirm the exact procedure, clinician, campus, equipment and date directly." },
      { q: "What records are required before review?", a: `Records commonly include ${config.records.slice(0, 3).join(", ")}, plus current clinical notes and medicines.` },
      { q: "Can suitability be confirmed before travel?", a: "Records can support a preliminary opinion, but final suitability may require examination, updated tests and review by the treating and anaesthesia teams." },
      { q: "How long should an international patient stay?", a: `Use each procedure’s ${config.terminology.durationLabel.toLowerCase()} as guidance. Recovery, results, complications and fitness to fly can change the plan.` },
      { q: "Can follow-up continue at home?", a: "Often, if the treating and home teams agree on records, medicines, warning signs, pending results and responsibility for follow-up." },
      { q: "Does a hospital listing guarantee availability?", a: "No. A catalog relationship does not guarantee acceptance, equipment, scheduling or procedure availability at every campus." },
      { q: "Are outcomes guaranteed?", a: "No. Expected benefits and risks are individual, and no clinician or facilitator can guarantee an outcome." },
    ],
    cityFaqQuestions: [
      `How is a ${config.terminology.careItem} selected?`,
      "Are all tests and devices included?",
      "What records are required before review?",
      "Can suitability be confirmed before travel?",
      "How long should an international patient stay?",
      "Does a hospital listing guarantee availability?",
    ],
    cityEditorials: cityEditorialsFromProcedureArticles(procedureSlugs),
    medicalDisclaimer: `This page provides general educational and travel-planning information. GAF catalog ranges are indicative planning figures, not quotations, recommendations or promises of availability or outcome. Diagnosis, selection, technique, risks, recovery and fitness to travel must be decided by a qualified ${config.terminology.practitioner} and relevant multidisciplinary clinicians after reviewing the patient and complete records.`,
  };
}

export const catalogSpecialtyProfiles = CONFIGS.map(profileFromConfig);
