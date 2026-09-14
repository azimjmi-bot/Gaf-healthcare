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

/**
 * Specialty-specific clinical content that cannot be inferred from a taxonomy
 * name. Procedures, conditions, prices, entities and city evidence stay live
 * catalog relationships, exactly as they do on the Radiation Oncology profile.
 */
export type SpecialtyClinicalConfig = {
  specialtySlug: string;
  terminology: SpecialtyTerminology;
  definition: string;
  selectionFocus: string[];
  records: string[];
  costFocus: string[];
  relatedSpecialtySlugs: string[];
};

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

export function indiaSpecialtyProfile(
  config: SpecialtyClinicalConfig,
): SpecialtyPageProfile {
  const specialty = getSpecialty(config.specialtySlug);
  if (!specialty) throw new Error(`Unknown specialty ${config.specialtySlug}`);
  const procedures = proceduresFor(config.specialtySlug);
  const procedureSlugs = procedures.map((procedure) => procedure.slug);
  const articleCoverage =
    procedureSlugs.filter((slug) => Boolean(costArticles[slug])).length /
    procedureSlugs.length;
  // Long-form guides carry the clinical detail a city page relies on, so a
  // thin inventory stays an editable draft instead of an indexable hub.
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
