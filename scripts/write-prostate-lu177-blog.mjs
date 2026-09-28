import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/prostate-cancer-treatment-in-india";
const OPTIONS = "/blogs/prostate-cancer-treatment-options-india";
const NONSURG = "/blogs/prostate-cancer-treatment-without-surgery";
const RARP = "/blogs/robotic-prostatectomy-in-india";
const RAD = "/blogs/radiation-therapy-for-prostate-cancer";
const BRACHY_BLOG = "/blogs/brachytherapy-for-prostate-cancer";
const DIET = "/blogs/prostate-cancer-diet";
const RECUR = "/blogs/prostate-cancer-recurrence-after-surgery";
const AS = "/blogs/active-surveillance-prostate-cancer";
const DX = "/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet";
const SX = "/blogs/prostate-cancer-symptoms";
const GG = "/blogs/gleason-score-grade-group-prostate-cancer";
const STAGES = "/blogs/prostate-cancer-stages-1-to-4";
const LU = "/blogs/lutetium-177-psma-therapy-in-india";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (markup) => ({ id: id("html"), type: "html", html: markup });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is Lutetium-177 PSMA therapy?</strong></p><p class="article-quick-answer__body">Lu-177 PSMA therapy is a targeted radioligand treatment that delivers radioactive lutetium-177 to prostate cancer cells expressing PSMA.</p><p class="article-quick-answer__body"><strong>Who may be eligible?</strong></p><p class="article-quick-answer__body">Eligibility depends on several factors, including:</p><ul class="article-quick-answer__list"><li>Confirmed prostate cancer</li><li>Metastatic disease in the treatment settings where Lu-177 PSMA is appropriate</li><li>PSMA-positive disease on PET imaging</li><li>Disease progression or treatment setting appropriate for the specific indication</li><li>Adequate kidney function</li><li>Adequate bone-marrow reserve</li><li>Overall health sufficient to tolerate treatment</li></ul><p class="article-quick-answer__body">The exact eligibility criteria depend on the approved indication, country, product and treatment protocol.</p><p class="article-quick-answer__body"><strong>How is the treatment given?</strong></p><p class="article-quick-answer__body">Lu-177 PSMA is administered through an intravenous infusion.</p><p class="article-quick-answer__body">A commonly used regimen for Lu-177 PSMA-617 is approximately <strong>7.4 GBq (200 mCi) every 6 weeks</strong>, for up to six cycles in patients who continue to benefit and meet safety criteria.</p><p class="article-quick-answer__body"><strong>What are the main side effects?</strong></p><p class="article-quick-answer__body">Common or important side effects include:</p><ul class="article-quick-answer__list"><li>Fatigue</li><li>Dry mouth</li><li>Nausea</li><li>Reduced blood-cell counts</li><li>Kidney toxicity</li><li>Reduced appetite</li><li>Changes in taste</li><li>Salivary-gland effects</li></ul><p class="article-quick-answer__body">Bone-marrow suppression and kidney toxicity require particular attention during treatment.</p><p class="article-quick-answer__body"><strong>What is the cost of Lu-177 PSMA therapy in India?</strong></p><p class="article-quick-answer__body">There is no single national price.</p><p class="article-quick-answer__body">Published Indian sources currently show very wide ranges depending on the radiopharmaceutical source, hospital, dose, services included and whether the quotation is for the therapy alone or a complete treatment package.</p><p class="article-quick-answer__body">Some published Indian estimates place therapy around <strong>₹3.5 lakh–₹7 lakh per cycle</strong>, while specific institutional pricing can be substantially lower or higher depending on the product and package.</p><p class="article-quick-answer__body">A written, itemised quotation is therefore much more useful than a generic online price.</p></aside>`;

const quoteTable = `<div class="md-body"><table><thead><tr><th>Cost component</th><th>Included?</th></tr></thead><tbody><tr><td>Pre-treatment consultation</td><td>Confirm</td></tr><tr><td>PSMA PET/CT</td><td>Confirm</td></tr><tr><td>Lu-177 PSMA radiopharmaceutical</td><td>Confirm</td></tr><tr><td>Administration</td><td>Confirm</td></tr><tr><td>Hospital/day-care stay</td><td>Confirm</td></tr><tr><td>Radiation-safety monitoring</td><td>Confirm</td></tr><tr><td>Blood tests</td><td>Confirm</td></tr><tr><td>Kidney-function tests</td><td>Confirm</td></tr><tr><td>Post-treatment imaging</td><td>Confirm</td></tr><tr><td>Medicines</td><td>Confirm</td></tr><tr><td>Follow-up consultation</td><td>Confirm</td></tr><tr><td>Additional scans</td><td>Confirm</td></tr><tr><td>Emergency care if required</td><td>Confirm</td></tr></tbody></table></div>`;

const vsChemo = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Lu-177 PSMA</th><th>Chemotherapy</th></tr></thead><tbody><tr><td>Treatment type</td><td>Radioligand therapy</td><td>Cytotoxic systemic therapy</td></tr><tr><td>Target</td><td>PSMA-expressing cells</td><td>Rapidly dividing cells</td></tr><tr><td>Administration</td><td>Usually IV</td><td>Usually IV or oral depending on drug</td></tr><tr><td>PSMA PET needed</td><td>Generally for treatment selection</td><td>Not usually</td></tr><tr><td>Major concerns</td><td>Salivary glands, marrow, kidneys</td><td>Marrow, gastrointestinal effects, neuropathy and others depending on drug</td></tr><tr><td>Can treat metastatic disease?</td><td>Yes, in selected PSMA-positive disease</td><td>Yes</td></tr><tr><td>Requires specialist nuclear medicine infrastructure</td><td>Yes</td><td>Not specifically</td></tr></tbody></table></div>`;

const faqs = [
  ["What is Lutetium-177 PSMA therapy?", "It is a targeted radioligand treatment in which lutetium-177 is attached to a PSMA-targeting molecule. The molecule binds to PSMA-expressing prostate cancer cells and delivers beta radiation to the tumour."],
  ["Who is eligible for Lu-177 PSMA therapy?", "Eligibility depends on the disease setting, PSMA expression, previous treatment, kidney function, bone-marrow function and overall health. Current international indications are broader than the original VISION population, so eligibility should be assessed using the latest applicable regulatory and clinical criteria."],
  ["Is PSMA PET required before Lu-177 PSMA?", "PSMA PET is generally central to patient selection because it demonstrates whether the cancer expresses the molecular target and helps identify the distribution of disease."],
  ["How many cycles of Lu-177 PSMA are needed?", "A commonly used regimen is 7.4 GBq every six weeks for up to six cycles, although the actual number can vary according to response and toxicity."],
  ["How often is Lu-177 PSMA given?", "A common schedule is once every six weeks."],
  ["Is Lu-177 PSMA painful?", "The infusion itself is generally not painful apart from IV insertion. Some patients may experience nausea, fatigue or other treatment-related symptoms."],
  ["What are the most common side effects?", "Fatigue, dry mouth, nausea and reductions in blood counts are among the important adverse effects. Kidney function also needs monitoring."],
  ["Does Lu-177 PSMA cause dry mouth?", "Yes. Salivary glands can receive radiation from the treatment, making dry mouth one of the characteristic side effects."],
  ["Does Lu-177 PSMA damage the kidneys?", "Kidney toxicity is a recognized risk, which is why renal function is assessed before and during treatment."],
  ["Can Lu-177 PSMA lower PSA?", "Yes. Many responding patients experience a PSA decline, although the timing and degree vary."],
  ["Can PSA rise after the first Lu-177 PSMA cycle?", "Yes. PSA changes should be interpreted in context, and early fluctuations do not necessarily prove treatment failure."],
  ["How effective is Lu-177 PSMA therapy?", "In the VISION trial population, Lu-177 PSMA-617 improved imaging-based progression-free survival and overall survival compared with standard care. Median overall survival was 15.3 versus 11.3 months. These trial results should not be interpreted as an individual survival prediction."],
  ["Is Lu-177 PSMA a cure?", "It is generally used to control advanced prostate cancer rather than as a guaranteed cure."],
  ["Can Lu-177 PSMA be used before chemotherapy?", "In selected treatment settings, yes. The FDA expanded the mCRPC indication in 2025 to certain patients after ARPI treatment who were considered appropriate to delay taxane chemotherapy."],
  ["Can Lu-177 PSMA be used for hormone-sensitive metastatic prostate cancer?", "The international regulatory landscape changed in July 2026 when the FDA approved Lu-177 vipivotide tetraxetan with an ARPI for selected PSMA-positive metastatic androgen pathway modulation-naïve or hormone-sensitive disease. The availability and indication in India must be confirmed locally."],
  ["How much does Lu-177 PSMA therapy cost in India?", "Published Indian sources vary considerably. A recent India-focused source gives an indicative range of approximately ₹3.5–7 lakh per cycle, while individual hospitals and radiopharmaceutical products can have substantially different pricing."],
  ["How much does six cycles of Lu-177 PSMA cost in India?", "There is no universal price. Using ₹3.5–7 lakh as an illustrative per-cycle range gives approximately ₹21–42 lakh for six cycles before any separately billed services. This is only an arithmetic planning illustration, not a hospital quotation."],
  ["Can international patients get Lu-177 PSMA therapy in India?", "Selected Indian centres provide Lu-177 PSMA therapy, but international patients should have their medical records and PSMA PET reviewed before travel."],
  ["How long should an international patient stay in India?", "The required stay varies by centre and treatment protocol. The hospital should provide a cycle-by-cycle schedule before travel."],
  ["Can I fly after Lu-177 PSMA therapy?", "Travel may be possible after an appropriate radiation-safety interval, but the exact timing depends on the treatment activity and local radiation-safety requirements. Obtain written clearance and a treatment certificate from the treating centre."],
  ["Can Lu-177 PSMA therapy be repeated?", "Additional cycles may be possible if the disease continues to respond and kidney function, blood counts and overall clinical condition remain acceptable."],
  ["What happens if Lu-177 PSMA does not work?", "The oncology team can reassess the disease and consider other systemic treatments, chemotherapy, targeted therapies, additional radiation, clinical trials or supportive treatment depending on the patient's previous treatment and disease biology."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Lutetium-177 PSMA therapy**, also called **Lu-177 PSMA radioligand therapy (RLT)**, is a targeted treatment for selected patients with advanced prostate cancer."),
  p("Instead of delivering radiation from outside the body, the treatment carries a radioactive form of lutetium-177 directly to prostate cancer cells that express **prostate-specific membrane antigen (PSMA)**."),
  p("A PSMA-targeting molecule attaches to the cancer cell. The lutetium-177 then delivers beta radiation over a short distance, damaging the targeted cancer cell and nearby tumour tissue. This approach is known as **radioligand therapy** or **targeted radionuclide therapy**."),
  p("It is particularly important in **PSMA-positive metastatic prostate cancer**, especially when the disease has progressed despite previous systemic treatment. How metastatic stage is assigned is covered in [Prostate Cancer Stages 1 to 4](" + STAGES + "). How PSMA PET is used in diagnosis is covered in [Prostate Cancer Diagnosis](" + DX + ")."),
  p("The treatment has moved from an experimental approach into established clinical practice for selected patients. In the VISION phase 3 trial, Lu-177 PSMA-617 plus standard care improved both imaging-based progression-free survival and overall survival in a specific group of patients with metastatic castration-resistant prostate cancer (mCRPC)."),
  p("The treatment landscape is also changing rapidly. In March 2025, the U.S. FDA expanded Pluvicto's indication to certain PSMA-positive mCRPC patients after androgen-receptor pathway inhibitor treatment who were considered appropriate to delay taxane chemotherapy. In July 2026, the FDA approved an additional indication in combination with an androgen-receptor pathway inhibitor for selected PSMA-positive metastatic androgen pathway modulation-naïve or hormone-sensitive disease."),
  p("This means that **eligibility should always be assessed using the patient's current disease status and the treatment regulations applicable in the country where treatment is being given** — including India."),
  p("This is the radioligand hub for the prostate cluster. It sits beside [treatment without surgery](" + NONSURG + "), [treatment options](" + OPTIONS + "), [radiation](" + RAD + "), [recurrence after surgery](" + RECUR + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Medical-Oncology), [Mumbai](/doctors/India/Mumbai/Medical-Oncology), [Bengaluru](/doctors/India/Bengaluru/Medical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Medical-Oncology) are a typical first filter."),
  btn("Ask whether Lu-177 PSMA is appropriate", consult("Lutetium-177 PSMA Therapy")),
  p("[WhatsApp +91 90443 46292 with your PSMA PET and treatment history](" + wa("Please review my PSMA PET, PSA and previous prostate cancer treatment and advise whether Lu-177 PSMA therapy in India is appropriate.") + ")"),
  img(
    "/uploads/articles/pca-lu-anatomy.webp",
    "Transparent male body with a gold prostate, teal pelvic nodes and gold traces along the spine used to explain PSMA-targeted radioligand therapy",
    "Lu-177 PSMA is systemic. One infusion can reach PSMA-expressing disease in several places at once. It is not the same as a radiation beam aimed at one field.",
  ),

  h2("What Is Lutetium-177 PSMA Therapy?"),
  p("Lutetium-177 PSMA therapy belongs to a group of treatments called **radioligand therapies**. The treatment has two important components."),
  p("**1. PSMA-targeting molecule.** The ligand is designed to recognize and bind to PSMA."),
  p("**2. Lutetium-177.** Lutetium-177 is a radioactive isotope that emits beta radiation."),
  p("When the ligand binds to a PSMA-expressing cancer cell, the radioactive payload delivers radiation to the tumour. The concept can be simplified as: **PSMA target → ligand attaches → Lu-177 delivers radiation → cancer-cell damage**."),
  p("The radiation travels only a limited distance through tissue, which allows treatment to be concentrated around PSMA-expressing disease rather than exposing the entire body to the same radiation dose."),
  p("It is not completely tumour-specific. Normal tissues that express or accumulate PSMA-targeting compounds can also receive radiation. This is why kidney, salivary-gland and blood-count monitoring are important."),

  h2("What Does PSMA Stand For?"),
  p("**PSMA means prostate-specific membrane antigen.** PSMA is a protein found on prostate cells and is often expressed at much higher levels in prostate cancer."),
  p("Many clinically significant prostate cancers express PSMA, which makes it useful for both **imaging** and **treatment**. This is the foundation of the **theranostic approach**: the same biological target can first be identified using PSMA PET imaging and then targeted using a radioactive therapeutic molecule."),

  h2("What Is Theranostics?"),
  p("**Theranostics** combines diagnosis and treatment around the same biological target. In prostate cancer, the concept commonly works like this:"),
  ol([
    "**Find the target.** A PSMA PET scan identifies whether the cancer expresses PSMA. See [diagnosis](" + DX + ").",
    "**Confirm distribution.** Doctors assess where the PSMA-positive disease is located.",
    "**Treat the target.** A PSMA-targeting molecule carrying lutetium-177 is administered.",
    "**Monitor response.** PSA, blood tests, symptoms and imaging are used to assess whether treatment is working and whether another cycle is appropriate.",
  ]),
  p("This is one of the major reasons PSMA PET has become so important in modern prostate cancer care."),

  h2("Is Lu-177 PSMA Chemotherapy?"),
  p("**No.** Lu-177 PSMA therapy is not conventional chemotherapy. Chemotherapy circulates cytotoxic medicines throughout the body. Lu-177 PSMA is a **radioligand therapy**. The radioactive payload is carried to cells expressing the PSMA target."),
  p("This does not mean the treatment has no systemic effects. The radioactive compound circulates through the bloodstream and some normal organs are exposed. The difference is the treatment mechanism. [Chemotherapy cost in India](" + CHEMO + ") remains a separate planning line when taxanes are still on the table."),

  h2("Is Lu-177 PSMA the Same as Radiation Therapy?"),
  p("It is a form of radiation treatment, but it is fundamentally different from conventional [external-beam radiation](" + RAD + ")."),
  p("**External-beam radiation** is produced by a machine outside the body and directed toward a defined treatment area. GAF Healthcare planning ranges include [EBRT](" + EBRT + ") **$1,000–$6,000+** and [IMRT](" + IMRT + ") **$6,500–$14,500**."),
  p("**Lu-177 PSMA therapy** is administered into the bloodstream and travels to PSMA-expressing disease. This allows multiple metastatic sites to be treated during the same systemic therapy. It is also different from [brachytherapy](" + BRACHY_BLOG + "), which places a radioactive source inside the prostate."),

  h2("Which Prostate Cancer Patients May Receive Lu-177 PSMA Therapy?"),
  p("The answer depends on the **specific treatment indication**."),
  p("Historically, the strongest phase 3 evidence came from patients with metastatic, castration-resistant, PSMA-positive prostate cancer whose disease had progressed after androgen-receptor pathway inhibitor treatment and previous taxane chemotherapy. This was the population studied in the VISION trial."),
  p("The field has moved beyond the original VISION population. The FDA expanded Pluvicto's mCRPC indication in 2025 to include selected patients who had received an ARPI and were considered appropriate to delay taxane chemotherapy. In July 2026, the FDA also approved Lu-177 vipivotide tetraxetan with ARPI therapy for selected PSMA-positive metastatic androgen pathway modulation-naïve or hormone-sensitive disease."),
  p("Therefore, an article written using only the original “after chemotherapy” eligibility criteria would now be incomplete. **The exact indication available to a patient in India must be confirmed with the treating nuclear medicine and oncology team.**"),
  btn("Ask about Lu-177 eligibility in India", consult("Lu-177 PSMA Eligibility")),

  h2("Main Eligibility Criteria for Lu-177 PSMA Therapy"),
  p("A patient is generally assessed across several categories."),
  h3("1. Confirmed prostate cancer"),
  p("The patient must have a diagnosis of prostate cancer. Pathology is usually reviewed together with imaging and treatment history. [Gleason score and Grade Group](" + GG + ") remain part of that record even when the current question is metastatic treatment."),
  h3("2. Appropriate disease stage"),
  p("Lu-177 PSMA is primarily used for **advanced or metastatic disease in defined treatment settings**. It is not a routine treatment for newly diagnosed low-risk localized prostate cancer. See [stages 1 to 4](" + STAGES + ") and [active surveillance](" + AS + ")."),
  h3("3. PSMA-positive disease"),
  p("This is one of the most important requirements. A PSMA PET scan is generally performed to determine whether the cancer expresses enough PSMA to make targeted treatment reasonable. The imaging should represent the patient's current disease status."),
  p("SNMMI consensus guidance recommends recent PSMA PET imaging for treatment selection and notes the importance of assessing both PSMA-positive and potentially PSMA-negative disease."),
  h3("4. Adequate kidney function"),
  p("The kidneys are an important route of clearance for the radioligand. Renal function is assessed before treatment. Patients with severe kidney impairment may not be suitable, or treatment may require modification depending on the circumstances."),
  h3("5. Adequate bone-marrow function"),
  p("Blood counts are checked before treatment. Doctors pay particular attention to haemoglobin, white-cell count, neutrophils and platelets. Patients with significant pre-existing marrow suppression may have a higher risk of treatment-related complications."),
  h3("6. Overall clinical condition"),
  p("The treatment team also considers performance status, symptoms, disease burden, previous therapies, organ function, expected benefit and alternative treatment options. Lu-177 PSMA should not be selected solely because a PSMA PET scan is positive."),
  p("[WhatsApp +91 90443 46292 with blood counts and kidney results](" + wa("Please review my blood counts, kidney function and PSMA PET for Lu-177 PSMA eligibility in India.") + ")"),

  h2("What Is PSMA-Positive Disease?"),
  p("A PSMA-positive scan means that the cancer demonstrates sufficient tracer uptake to indicate the presence of the molecular target. There is an important distinction. A patient may have **PSMA-positive lesions** and also **PSMA-negative lesions**."),
  p("The second situation matters because Lu-177 PSMA may not adequately target cancer that does not express the target. Treatment selection can require careful review of the complete PSMA PET/CT rather than simply reading the words “PSMA positive.”"),
  p("The VISION trial used specific imaging criteria to ensure that patients did not have clinically significant PSMA-negative disease that could undermine the effectiveness of targeted treatment."),

  h2("Why Is PSMA PET Done Before Lu-177 PSMA Therapy?"),
  p("PSMA PET serves as the **companion diagnostic** for PSMA-targeted therapy. It helps answer whether the cancer is PSMA-positive, where the disease is, how extensive it is, whether there are lesions with little or no PSMA uptake, and whether the target is sufficiently expressed to justify treatment."),
  p("The treatment should not be thought of as simply “giving lutetium.” The key question is whether **the cancer can be effectively targeted by the radioligand**. How PSMA PET sits with PSA, MRI and biopsy is in [Prostate Cancer Diagnosis](" + DX + ")."),

  h2("Does a High PSMA Uptake Mean Lu-177 PSMA Will Definitely Work?"),
  p("No. High PSMA expression can make a patient more suitable for treatment, but it does not guarantee a response. Treatment response also depends on cancer biology, disease burden, previous treatments, PSMA heterogeneity, overall health, bone-marrow reserve and other molecular characteristics. PSMA expression is an important selection factor, not a guarantee of treatment success."),

  h2("What Tests Are Done Before Lu-177 PSMA Therapy?"),
  p("The pre-treatment assessment commonly includes cancer evaluation (PSA, testosterone, PSMA PET/CT, previous CT/MRI, bone imaging when relevant, previous treatment records), blood tests (complete blood count, creatinine, kidney-function assessment, liver-function tests, electrolytes), and clinical assessment (performance status, pain, urinary symptoms, hydration status, medication review, previous treatment toxicity)."),
  p("The EANM/SNMMI guideline recommends appropriate renal and marrow assessment before treatment."),

  h2("What Happens Before the First Cycle?"),
  p("The first cycle is generally not booked immediately after a patient arrives at the hospital. The treatment team first confirms eligibility."),
  p("A typical pathway is: medical records review → oncology/nuclear medicine consultation → PSMA PET/CT → blood and kidney-function assessment → eligibility review → treatment planning → Lu-177 PSMA administration."),
  p("This is particularly important for international patients. It is better to have the records reviewed before travelling to India whenever possible."),

  h2("How Is Lu-177 PSMA Therapy Given?"),
  p("The treatment is usually administered intravenously. A typical treatment day includes clinical assessment, blood-test review, hydration (oral or intravenous according to the centre's protocol), anti-nausea medication if required, radioligand administration through an IV line, observation, and radiation-safety instructions."),
  img(
    "/uploads/articles/pca-lu-infusion.webp",
    "Male patient receiving an intravenous infusion while a clinician works, with a gold-spine overlay of PSMA-targeted disease",
    "The infusion itself is usually brief. The hospital visit can still last several hours because of checks, observation and radiation-safety briefing.",
  ),

  h2("How Long Does a Lu-177 PSMA Treatment Take?"),
  p("The exact duration varies between centres. The treatment itself may not take very long, but the complete hospital visit can take several hours. Some centres use outpatient or day-care models. Others keep patients under observation or admit them for a short period because of radiation-safety requirements and local regulations."),
  p("International patients should therefore ask the hospital: **“How many hours or nights do I need to stay in the hospital for each cycle?”** This can make a significant difference to travel planning."),

  h2("How Many Lu-177 PSMA Cycles Are Needed?"),
  p("A commonly used regimen for Lu-177 PSMA-617 is **7.4 GBq (200 mCi) every 6 weeks, for up to 6 cycles.** Treatment is not automatically six cycles for everyone. A cycle may be delayed, dose-adjusted, stopped or continued depending on response, blood counts, kidney function, side effects, disease progression and overall clinical benefit."),
  p("The EANM/SNMMI guideline describes six-week intervals as the approved regimen for the established Lu-177 PSMA-617 protocol and notes that clinical practice may use different intervals or activities in selected settings."),

  h2("What Happens Between Treatment Cycles?"),
  p("The period between cycles is not simply “waiting.” The medical team monitors PSA, complete blood count, creatinine, kidney function, symptoms, pain, fatigue, salivary-gland symptoms and treatment tolerance."),
  p("The EANM/SNMMI guideline recommends blood counts and creatinine monitoring approximately 2–3 weeks after each cycle and additional assessment before subsequent treatment."),

  h2("Does PSA Fall Immediately After Lu-177 PSMA?"),
  p("Not necessarily. PSA response can take time. There can also be early fluctuations. The EANM/SNMMI guideline notes that PSA may be affected by early treatment-related changes and that PSA response becomes more reliable after the early treatment period, particularly after the second cycle. Doctors therefore do not usually declare treatment failure based on a single early PSA value."),

  h2("How Is Response to Lu-177 PSMA Measured?"),
  p("Doctors use several measures: the PSA trend; symptoms such as bone pain, energy, appetite and physical activity; blood counts and kidney function for safety; and imaging (PSMA PET/CT, CT, MRI or other imaging depending on the disease)."),
  p("The EANM/SNMMI guideline identifies PSMA PET/CT as an important imaging modality for restaging and recommends a second imaging modality when appropriate to identify potentially PSMA-negative disease."),

  h2("What Are the Benefits of Lu-177 PSMA Therapy?"),
  p("The main potential benefits include targeted radiation to PSMA-expressing cancer, treatment of multiple metastatic sites simultaneously, reduction in tumour burden in some patients, PSA reduction in responding patients, delayed radiographic progression, potential improvement in cancer-related symptoms, and potential improvement in overall survival in appropriate treatment populations."),
  p("The VISION phase 3 trial found median imaging-based progression-free survival of **8.7 months versus 3.4 months** and median overall survival of **15.3 versus 11.3 months** for Lu-177 PSMA-617 plus standard care compared with standard care alone in the studied mCRPC population."),
  p("These figures describe a clinical trial population. They **do not predict how long an individual patient will live**."),

  h2("Is Lu-177 PSMA a Cure for Prostate Cancer?"),
  p("For advanced metastatic prostate cancer, Lu-177 PSMA is generally considered a disease-control treatment rather than a guaranteed cure. Some patients experience substantial responses. Others have limited or temporary benefit. The cancer can eventually become resistant to treatment."),
  p("The goal may therefore be to reduce disease activity, delay progression, reduce symptoms, maintain quality of life and extend survival. The treatment objective should be discussed individually with the treating oncology team."),

  h2("Side Effects of Lu-177 PSMA Therapy"),
  p("The most important side effects involve salivary glands, bone marrow, kidneys, the gastrointestinal system and general energy levels. Not every patient experiences all of these effects."),
  img(
    "/uploads/articles/pca-lu-organs.webp",
    "Transparent male figure with gold salivary glands, teal kidneys and a gold prostate used to explain Lu-177 monitoring",
    "Targeted does not mean side-effect free. Salivary glands and kidneys can receive radiation and are watched throughout the course.",
  ),
  h3("1. Dry mouth"),
  p("**Xerostomia**, or dry mouth, is one of the characteristic side effects of Lu-177 PSMA therapy. This occurs because salivary glands can show PSMA-related uptake. Symptoms may include dry mouth, increased thirst, difficulty swallowing dry food, changes in taste and oral discomfort. The EANM/SNMMI guideline recommends supportive measures such as water, artificial saliva products or xylitol-containing lozenges for appropriate patients."),
  h3("2. Fatigue"),
  p("Fatigue is common during systemic cancer treatment. After Lu-177 PSMA, patients may experience reduced energy, sleepiness, lower exercise tolerance and general weakness. Fatigue can also be caused by advanced cancer, anaemia, pain, hormone therapy or previous chemotherapy. Severe fatigue should not automatically be attributed to the radioligand."),
  h3("3. Reduced blood counts"),
  p("Lu-177 PSMA can affect bone marrow. Possible changes include anaemia, reduced white blood cells, neutropenia and reduced platelets. This risk can be greater in patients with extensive bone metastases, previous chemotherapy or poor baseline marrow reserve. Regular blood counts are therefore essential. The EANM/SNMMI guideline provides specific management pathways for clinically significant haematological toxicity, including delaying or modifying treatment when necessary."),
  h3("4. Kidney toxicity"),
  p("The kidneys are an important clearance pathway. Renal toxicity is therefore monitored throughout treatment. Doctors may check creatinine, eGFR, electrolytes and overall kidney function. Patients with significant kidney impairment may not be suitable for treatment or may require an altered approach. The current Pluvicto prescribing information includes renal toxicity among its important warnings and precautions."),
  h3("5. Nausea"),
  p("Some patients experience nausea around the treatment period. It may be managed with anti-nausea medicines. Severe or persistent vomiting should be reported because dehydration can place additional stress on the kidneys."),
  h3("6. Appetite changes and taste"),
  p("Some patients report reduced appetite, taste changes, dry mouth and nausea. These effects can make eating more difficult. Maintaining adequate nutrition is particularly important in patients with advanced cancer. Practical eating notes are in [Prostate Cancer Diet](" + DIET + ")."),
  h3("7. Bone pain flare"),
  p("Some patients with extensive bone metastases may experience a temporary increase in tumour-related pain shortly after treatment. The EANM/SNMMI guideline describes a possible pain flare during the first week and notes that it can subsequently improve in responding patients. Pain should still be reported because severe new pain can have other causes."),
  h3("8. Rare or serious complications"),
  p("Serious complications are less common but can include severe bone-marrow suppression, significant kidney injury, severe infection related to low blood counts, serious bleeding related to thrombocytopenia, persistent severe salivary-gland toxicity and other organ toxicity. The treatment should be delivered in a centre equipped to provide nuclear medicine therapy, radiation safety and appropriate medical monitoring."),
  p("**New weakness, numbness or loss of bladder or bowel control in a man with known prostate cancer and possible spinal metastases requires urgent evaluation in a local emergency department — not a delayed WhatsApp message.**"),

  h2("Does Lu-177 PSMA Cause Hair Loss?"),
  p("Hair loss is **not one of the defining toxicities** of Lu-177 PSMA therapy in the way it can be with some chemotherapy regimens. If a patient experiences significant hair loss, other medicines or previous chemotherapy should also be considered."),

  h2("Does Lu-177 PSMA Cause Infertility?"),
  p("The issue is less central in men receiving Lu-177 PSMA for advanced metastatic prostate cancer because many patients are older and are also receiving long-term androgen-deprivation therapy. However, systemic radiation exposure can affect reproductive tissues. Men who may wish to preserve fertility should discuss this **before treatment**."),

  h2("Does Lu-177 PSMA Damage the Kidneys?"),
  p("It can. The kidneys receive some radiation because they participate in clearing the radioligand. This is why kidney function is checked before treatment, hydration is encouraged when medically appropriate, creatinine/eGFR are monitored, and treatment may be delayed or adjusted if significant toxicity occurs."),

  h2("Why Are Salivary Glands Affected?"),
  p("Salivary glands naturally show PSMA-related tracer uptake. When Lu-177 PSMA is administered, some of the radioactive compound reaches these glands. The radiation can therefore affect saliva production. This is one reason dry mouth is a characteristic adverse effect."),

  h2("How Can Dry Mouth Be Managed?"),
  p("Depending on the treatment centre's protocol, supportive measures may include frequent water intake, artificial saliva, sugar-free or xylitol lozenges, good oral hygiene, regular dental care, and saliva-stimulating measures when medically appropriate. The EANM/SNMMI guideline specifically discusses artificial saliva and xylitol products for symptomatic relief."),

  h2("Radiation Safety After Lu-177 PSMA Therapy"),
  p("Lu-177 emits radiation after administration. Because some radioactivity remains in the patient's body temporarily, the treatment centre provides radiation-safety instructions. These may include guidance about time spent close to other people, sleeping arrangements, bathroom hygiene, handwashing, handling bodily fluids, laundry, travel, and contact with children or pregnant women."),
  p("The exact restrictions depend on the administered activity, local regulations and the patient's individual circumstances. **The hospital's radiation-safety instructions should always take priority over generic internet advice.**"),

  h2("Can a Patient Go Home After Lu-177 PSMA Therapy?"),
  p("Yes, in some centres and treatment protocols. Other centres may require a short hospital stay. The decision depends on radiation levels, local regulations, treatment activity, hospital infrastructure, the patient's home circumstances and radiation-safety requirements. Patients travelling from abroad should confirm this before booking accommodation."),

  h2("Can International Patients Travel After Lu-177 PSMA Therapy?"),
  p("Travel may be possible, but it should be planned around radiation-safety requirements. Airports may use radiation detectors, and some patients can trigger sensitive detection systems shortly after radionuclide treatment. The hospital should provide documentation of the treatment and administered radiopharmaceutical."),
  p("International patients should ask the nuclear medicine team: when can I fly, do I need a treatment certificate, can I pass airport radiation screening, how long should I maintain precautions, and are there restrictions on public transport?"),

  h2("What Should International Patients Carry When Travelling Home?"),
  ul([
    "Treatment summary, radiopharmaceutical name, date of administration and administered activity",
    "Radiation-safety certificate",
    "Latest blood reports, PSA results and imaging reports",
    "Medication list and treating doctor's contact information",
  ]),
  p("This can be particularly useful if the next cycle will be performed in another country."),

  h2("Lu-177 PSMA Therapy Cost in India"),
  p("Cost is one of the most searched questions by international prostate cancer patients. There is **no single fixed Lu-177 PSMA therapy cost in India**. The price varies because the treatment is not simply the cost of the radioactive isotope."),
  p("A complete treatment may include PSMA PET/CT, the radiopharmaceutical, treatment administration, hospital/day-care charges, nuclear medicine physician fees, medical physicist/radiation-safety services, blood tests, kidney-function testing, post-treatment imaging, medications, accommodation or inpatient stay, and follow-up consultation."),
  p("GAF Healthcare does not publish a dedicated Lu-177 catalog page. Adjacent systemic planning ranges on this site include [hormone therapy](" + HT + ") **$1,000–$4,500**, [chemotherapy](" + CHEMO + ") **$1,500–$8,000+** and [targeted therapy](" + TARGETED + "). Surgery and external radiation remain separate lines: [radical prostatectomy](" + RP + ") **$7,000–$18,000**, including city pages such as [Delhi NCR prostatectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy)."),

  h2("What Is the Current Cost of Lu-177 PSMA Therapy in India?"),
  p("Published Indian sources show a very broad range. One recent India-focused medical source gives an indicative range of approximately **₹3.5 lakh to ₹7 lakh per cycle**, with four to six cycles often used depending on the clinical protocol. For international planning that is roughly **$4,000–$8,500 per cycle** at current conversion — an illustration, not a GAF quotation."),
  p("A published Medanta hospital tariff document lists **₹1.50 lakh per dose for BRIT Lu-177 PSMA therapy** and ₹2.75 lakh for a non-carrier-added BRIT Lu-177 PSMA therapy code, illustrating why the source of the radiopharmaceutical and the hospital's billing structure can substantially affect the final quotation."),
  p("Other Indian providers publish still different package prices. Some centres quote substantially higher amounts for imported or branded products and international-patient packages. Therefore, it would be misleading to present one number as **“the cost of Lu-177 PSMA therapy in India.”**"),
  p("For international patients, a reasonable approach is to budget based on a **written hospital quotation**, rather than relying on a generic internet figure. A current published private-sector reference of roughly **₹3.5–7 lakh per cycle** can be used only as an indicative planning range, not as a guaranteed price."),
  btn("Ask for an itemised Lu-177 quotation", consult("Lu-177 PSMA Cost in India")),
  p("[WhatsApp +91 90443 46292 for a cycle-by-cycle cost list](" + wa("Please send an itemised Lu-177 PSMA quotation in India covering the radiopharmaceutical, PSMA PET, hospital stay and blood tests.") + ")"),

  h2("Why Does Lu-177 PSMA Cost Differ So Much in India?"),
  ul([
    "**Radiopharmaceutical source** and formulation.",
    "**Activity administered** — the dose is determined clinically.",
    "**Hospital** — government, academic and private centres may have different pricing structures.",
    "**City** — infrastructure and operating costs differ.",
    "**Imported versus domestically supplied product.**",
    "**Hospital stay** — some centres include admission and radiation-safety monitoring; others bill these separately.",
    "**Imaging** — PSMA PET, post-treatment SPECT/CT and other scans may be charged separately.",
  ]),

  h2("Indian-Source vs Imported Lu-177 PSMA"),
  p("Patients sometimes see very different quotations and assume that the cheaper option must be inferior. That conclusion should not be made simply from price."),
  p("The important questions are which radiopharmaceutical is being used, who manufactures it, what regulatory approvals apply, what ligand is attached to Lu-177, what treatment protocol is being followed, what activity will be administered, what monitoring is included, and whether the product is being used within its approved indication or under another regulatory pathway."),
  p("A hospital should be able to explain the product and treatment protocol in writing. Do not compare two prices without comparing what is actually included."),

  h2("What Should Be Included in a Lu-177 PSMA Cost Estimate?"),
  p("For international patients, ask for an itemised quotation covering:"),
  html(quoteTable),
  p("This prevents a low advertised price from becoming a much higher final bill."),

  h2("How Much Does a Full Course Cost?"),
  p("A full course can involve multiple cycles. If a centre quotes **₹3.5–7 lakh per cycle**, four cycles would theoretically correspond to approximately **₹14–28 lakh**, while six cycles would correspond to approximately **₹21–42 lakh**, before adding services that may not be included."),
  p("These are arithmetic illustrations based on the published per-cycle range, **not treatment quotations**. The actual number of cycles and total cost depend on clinical response, toxicity, treatment protocol and the hospital's pricing."),

  h2("Is Lu-177 PSMA Therapy Covered by Insurance in India?"),
  p("Coverage depends on the insurance company, policy terms, product used, hospital, approved indication, pre-authorisation requirements, and whether the therapy is categorized as covered cancer treatment under the policy. Patients should obtain written confirmation before starting treatment. Do not assume that because a hospital offers the therapy, the insurance policy automatically covers it."),

  h2("Lu-177 PSMA Therapy in India for International Patients"),
  p("India has developed significant nuclear-medicine and theranostics capacity, making Lu-177 PSMA therapy an option considered by some international prostate cancer patients. The process can be organized in stages."),
  p("**Before travelling**, send the pathology report, PSA trend, testosterone, previous treatment history, PSMA PET/CT, CT/MRI, bone imaging, blood counts, kidney-function results and current medicines. The hospital's nuclear medicine and oncology teams can then assess eligibility."),
  img(
    "/uploads/articles/pca-lu-bones.webp",
    "Male patient in clinic with a gold pelvic overlay of bladder, prostate and spine while a clinician explains metastatic disease",
    "Have the PSMA PET files reviewed before you fly. A positive scan is not the same as a treatment booking.",
  ),

  h2("International Patient Treatment Pathway"),
  ol([
    "**Remote medical review** of records before travel.",
    "**Confirm PSMA positivity** — a recent PSMA PET/CT is reviewed or arranged.",
    "**Treatment quotation** — the hospital provides an itemised estimate.",
    "**Travel to India** after the treatment schedule is confirmed.",
    "**Pre-treatment assessment** — blood tests and clinical evaluation.",
    "**First Lu-177 PSMA cycle** — the radioligand is administered.",
    "**Radiation-safety period** — the patient follows the hospital's precautions.",
    "**Follow-up** — PSA, blood counts and kidney function are monitored.",
    "**Next cycle** if the patient remains eligible, either remaining in India or returning according to the treating centre and travel plan.",
  ]),

  h2("What Happens If PSMA PET Shows Some PSMA-Negative Lesions?"),
  p("This is an important treatment-planning issue. If some lesions are PSMA-negative while others are strongly PSMA-positive, Lu-177 PSMA may not adequately treat all areas of disease. Doctors may therefore consider additional imaging, CT/MRI, FDG PET in selected cases, biopsy of unusual lesions, another systemic treatment, combination treatment, or local treatment of selected lesions."),
  p("The EANM/SNMMI guideline emphasizes the importance of identifying potentially PSMA-negative disease because it can influence treatment selection."),

  h2("Can Lu-177 PSMA Be Combined With Hormone Therapy?"),
  p("Yes. In many treatment settings, androgen-deprivation therapy remains part of the overall prostate cancer treatment strategy. The exact combination depends on the disease setting. The FDA's 2026 approval of Lu-177 vipivotide tetraxetan for selected metastatic androgen pathway modulation-naïve or hormone-sensitive disease specifically involves combination with an androgen-receptor pathway inhibitor."),
  p("Patients should therefore not stop ADT or another prostate cancer medicine simply because Lu-177 PSMA is being started. [Hormone therapy](" + HT + ") planning ranges on this site are **$1,000–$4,500** and are a separate line from the radioligand quotation."),

  h2("Can Lu-177 PSMA Be Given With Chemotherapy?"),
  p("The answer depends on the treatment protocol and clinical setting. Combination approaches are an area of active research and may be considered in selected circumstances. However, Lu-177 PSMA should not simply be added to chemotherapy without a specialist assessment. Bone-marrow toxicity is particularly important when treatments that suppress blood counts are combined."),

  h2("Can Lu-177 PSMA Be Repeated After the First Course?"),
  p("Potentially, but this is highly individualized. Some patients may receive additional cycles if disease continues to respond, side effects remain acceptable, blood counts and kidney function remain adequate, and the treatment team believes additional benefit is likely. Other patients may stop because of disease progression, significant toxicity, poor performance status, loss of PSMA expression or lack of clinical benefit."),

  h2("What Happens If Lu-177 PSMA Stops Working?"),
  p("If the cancer progresses, doctors reassess the entire treatment strategy. Possible options may include another androgen-receptor pathway treatment, [chemotherapy](" + CHEMO + "), PARP-targeted therapy for selected genomic alterations, other radioligand therapies in selected settings, [external radiation](" + RAD + ") for symptomatic lesions, radium-223 in appropriate bone-predominant disease, clinical trials, and supportive and palliative treatment."),
  p("The next step depends heavily on what treatments the patient has already received. See [recurrence after surgery](" + RECUR + ") when the original treatment was prostatectomy, and [treatment options](" + OPTIONS + ") for the wider menu."),

  h2("Lu-177 PSMA vs Chemotherapy"),
  html(vsChemo),
  p("Neither treatment is universally superior. The choice depends on the patient's disease and previous treatment."),

  h2("Lu-177 PSMA vs Hormone Therapy"),
  p("Hormone therapy changes androgen signalling. Lu-177 PSMA directly delivers radiation to PSMA-expressing cancer cells. They can be used at different points in the same patient's treatment journey. A patient with metastatic prostate cancer may receive ADT and other systemic therapies before becoming eligible for Lu-177 PSMA."),

  h2("Lu-177 PSMA vs Radium-223"),
  p("Both are radioactive treatments, but they are fundamentally different. **Lu-177 PSMA** targets PSMA-expressing prostate cancer cells. **Radium-223** targets areas of increased bone turnover and is used primarily in selected patients with symptomatic bone-predominant metastatic castration-resistant prostate cancer without certain visceral metastases. The choice depends on disease distribution and previous treatments."),

  h2("Lu-177 PSMA vs External Radiation"),
  p("External radiation generally treats a specific anatomical region. Lu-177 PSMA is systemic and can target multiple PSMA-positive metastases throughout the body. However, external radiation can be extremely useful for controlling pain or preventing complications from a particular bone or soft-tissue metastasis. The treatments can sometimes be used as part of the same overall care plan. See [Radiation Therapy for Prostate Cancer](" + RAD + ")."),

  h2("What Is the VISION Trial?"),
  p("The **VISION trial** was a landmark phase 3 study that established strong evidence for Lu-177 PSMA-617 in a selected group of patients with advanced PSMA-positive mCRPC. The trial included patients who had previously received an androgen-receptor pathway inhibitor and one or two taxane regimens."),
  p("Patients receiving Lu-177 PSMA-617 plus standard care had longer imaging-based progression-free survival, longer overall survival and longer time to symptomatic skeletal events. Median overall survival was **15.3 months versus 11.3 months** in the treatment and control groups, respectively."),
  p("These results were in a heavily pre-treated population. They should not be used to predict an individual patient's outcome."),

  h2("What Did the 2025 FDA Expansion Change?"),
  p("In March 2025, the FDA expanded Pluvicto's mCRPC indication. The treatment became available for certain adults with PSMA-positive mCRPC who had received ARPI therapy and were considered appropriate to delay taxane chemotherapy. This was an important change because it allowed treatment in selected patients **before taxane chemotherapy**, rather than restricting the indication to patients who had already received taxanes."),

  h2("What Changed in 2026?"),
  p("On **July 31, 2026**, the FDA approved Lu-177 vipivotide tetraxetan in combination with an androgen receptor pathway inhibitor for selected adults with PSMA-positive metastatic androgen pathway modulation-naïve or hormone-sensitive prostate cancer. This represents a significant expansion of the treatment landscape."),
  p("However, treatment availability and approved indications are **country-specific**. Therefore, Indian patients should ask the treating centre which indication, product and regulatory pathway applies to their case."),

  h2("Is Lu-177 PSMA Available in India?"),
  p("Lu-177 PSMA radioligand therapy is available at selected nuclear medicine and cancer centres in India. However, **availability of a treatment does not mean every patient is eligible**."),
  p("The centre should have appropriate nuclear medicine infrastructure, radiation-safety systems, radiopharmaceutical handling capability, trained nuclear medicine specialists, medical physics support, laboratory monitoring and emergency medical support. Patients should also verify which radiopharmaceutical product is being used and under what approved or regulated treatment pathway."),

  h2("How to Choose a Lu-177 PSMA Treatment Centre in India"),
  p("Price should not be the only factor."),
  h3("Medical questions"),
  ul([
    "How many Lu-177 PSMA patients do you treat?",
    "Which PSMA radiopharmaceutical do you use, and which PSMA PET tracer?",
    "Who interprets the PSMA PET?",
    "How do you assess eligibility, including blood-count and kidney criteria?",
  ]),
  h3("Treatment questions"),
  ul([
    "What activity will be administered, how many cycles, and how far apart?",
    "Will the dose be adjusted based on toxicity?",
    "Is post-treatment SPECT/CT performed?",
  ]),
  h3("Safety questions"),
  ul([
    "What radiation precautions are required, and how long will I remain in the hospital?",
    "What happens if my blood counts fall, and how is kidney toxicity monitored?",
    "What emergency support is available?",
  ]),
  h3("Cost questions"),
  ul([
    "Is the PSMA PET, radiopharmaceutical, hospital stay, blood tests and post-treatment imaging included?",
    "What happens if a cycle is delayed?",
    "Are international-patient charges different?",
  ]),

  h2("Questions International Patients Should Ask Before Flying to India"),
  ol([
    "Has my PSMA PET been reviewed by your nuclear medicine team?",
    "Am I eligible based on my current disease status?",
    "Which Lu-177 PSMA product will be used, and is it domestically supplied or imported?",
    "What is the dose per cycle, and how many cycles are expected?",
    "How many days do I need to remain in India per cycle, and is hospital admission required?",
    "What is the complete cost per cycle, and what is excluded from the quotation?",
    "When can I fly home after treatment, and will I receive a radiation-safety certificate?",
    "Can subsequent cycles be coordinated with my doctor in my home country?",
    "What blood tests are required before the next cycle?",
    "What happens if my PSA rises or my blood counts fall?",
  ]),

  h2("Myths About Lu-177 PSMA Therapy"),
  ul([
    "**Myth: it cures every advanced prostate cancer.** Fact: it can produce meaningful responses in selected patients, but advanced prostate cancer can eventually progress despite treatment.",
    "**Myth: a positive PSMA PET means the patient automatically qualifies.** Fact: PSMA positivity is important but is only one part of eligibility.",
    "**Myth: Lu-177 PSMA has no side effects because it is targeted.** Fact: salivary glands and kidneys can also receive radiation.",
    "**Myth: six cycles are mandatory.** Fact: six cycles may be the planned maximum in a common protocol, but treatment can be delayed, adjusted or stopped.",
    "**Myth: the cheapest Lu-177 PSMA treatment is automatically the same as the most expensive.** Fact: compare itemised treatment plans, not headlines.",
    "**Myth: PSMA PET is only needed to diagnose prostate cancer.** Fact: it is also used for staging, recurrence assessment and selecting patients for PSMA-targeted therapy.",
    "**Myth: Lu-177 PSMA is chemotherapy.** Fact: it is a radioligand therapy, not conventional chemotherapy.",
  ]),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Takeaway"),
  p("**Lutetium-177 PSMA therapy is a targeted radioligand treatment that delivers radiation directly to PSMA-expressing prostate cancer cells.**"),
  p("Its role is particularly important in advanced prostate cancer, especially metastatic disease in treatment settings where PSMA-targeted radioligand therapy is appropriate. The most important eligibility factor is not simply having advanced prostate cancer. The cancer needs to demonstrate the appropriate **PSMA target**, and the patient must also have adequate organ function and an overall treatment profile that makes the therapy reasonable."),
  p("The treatment commonly involves repeated IV administrations, often at approximately six-week intervals. A widely used Lu-177 PSMA-617 regimen is **7.4 GBq every six weeks for up to six cycles**, although treatment can be modified or stopped depending on response and toxicity."),
  p("The major side effects to understand are **dry mouth, fatigue, reduced blood counts and kidney toxicity**. Monitoring is therefore an essential part of treatment rather than something done only after complications occur."),
  p("For patients considering treatment in India, **cost varies substantially**. Published Indian sources currently show anything from institution-specific lower-cost radiopharmaceutical pricing to several lakh rupees per cycle in private-sector treatment packages. Ask for a **complete, written and itemised quotation** covering the radiopharmaceutical, dose, hospital stay, monitoring, imaging and follow-up."),
  p("For international patients, the safest approach is to have the medical records and recent PSMA PET/CT reviewed by the treating centre **before travelling to India**. That can prevent an unnecessary trip when the disease does not meet the centre's eligibility criteria."),

  h2("Related Prostate Cancer Resources"),
  p("This article is the radioligand hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Prostate Cancer Diagnosis](" + DX + ") — how PSMA PET sits with PSA, MRI and biopsy.",
    "[Prostate Cancer Stages 1 to 4](" + STAGES + ") — why metastatic disease is not one stage number.",
    "[Gleason Score and Grade Group](" + GG + ") — the microscope map still on the pathology report.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — where radioligand therapy sits in the menu.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — systemic and radiation options.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — external beams versus a circulating radioligand.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation of a different kind.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — when PSA later rises.",
    "[Hormone therapy cost in India](" + HT + ") — ADT remains part of many Lu-177 pathways.",
    "[Prostate Cancer Diet](" + DIET + ") — eating when dry mouth and appetite change.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — coordinated staging, PSMA PET and Lu-177.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who are asking whether Lu-177 PSMA is the next step in India. Share the recent PSMA PET/CT files (not a one-line “PSMA positive”), the PSA trend, testosterone, blood counts, kidney function, and the complete treatment history including ARPI and taxane exposure. A coordinator can introduce a [medical oncologist](" + MED_DOCS + ") and, when external radiation is still on the table, a [radiation oncologist](" + RAD_DOCS + "), then help collect an itemised quotation covering the radiopharmaceutical, stay and monitoring."),
  btn("Share PSMA PET files for a Lu-177 review", consult("Lutetium-177 PSMA Therapy")),
  p("[WhatsApp +91 90443 46292 with your PSMA PET and blood reports](" + wa("I would like to share my PSMA PET, PSA, blood counts and kidney function for a Lu-177 PSMA second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is for educational purposes only and does not replace consultation with a qualified oncologist, urologic oncologist or nuclear medicine specialist."),
  p("Lu-177 PSMA therapy is not appropriate for every patient with prostate cancer. Eligibility depends on disease stage, PSMA expression, previous treatments, blood counts, kidney function, overall health and the treatment indication approved or permitted in the relevant country."),
  p("Treatment protocols, radiopharmaceutical products, prices and regulatory approvals can change. Patients should obtain a current treatment assessment and written quotation from the treating centre before making travel or treatment arrangements."),
  p("Do not stop hormone therapy, chemotherapy or any other cancer treatment without speaking with your treating doctor."),

  h2("Top 5 Sources"),
  p("1. [FDA — July 2026 Pluvicto Approval](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-lutetium-lu-177-vipivotide-tetraxetan-androgen-receptor-pathway-inhibitor-therapy) — Lu-177 vipivotide tetraxetan with an ARPI for selected metastatic androgen pathway modulation-naïve or hormone-sensitive disease."),
  p("2. [FDA — 2025 Pluvicto Indication Expansion](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-expands-pluvictos-metastatic-castration-resistant-prostate-cancer-indication) — selected PSMA-positive mCRPC after ARPI who may appropriately delay taxane chemotherapy."),
  p("3. [EANM/SNMMI — 177Lu-PSMA Radioligand Therapy Guideline](https://snmmi.org/common/Uploaded%20files/Web/Clinical%20Practice/Procedure%20Standards/2023-01-27/EANM_SNMMI_Guideline%20Use%20of%20177Lu_PSMA%20Therapy%20Final.pdf) — patient selection, administration, monitoring, dose schedules and side-effect management."),
  p("4. [NEJM — Lutetium-177–PSMA-617 for Metastatic Castration-Resistant Prostate Cancer](https://www.nejm.org/doi/full/10.1056/NEJMoa2107322) — the VISION phase 3 trial."),
  p("5. [Medanta — Nuclear Medicine Published Tariff](https://cdnbbsr.s3waas.gov.in/s35679fb79d04e9ed91e292858c54df4e8/uploads/2026/01/202601081828840099.pdf) — a real-world Indian reference showing how Lu-177 PSMA pricing can vary by product category."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T09:30:00.000Z";
const SLUG = "lutetium-177-psma-therapy-in-india";

const article = {
  id: "art_lutetium_177_psma_therapy_in_india",
  slug: SLUG,
  title: "Lutetium-177 PSMA Therapy in India: Eligibility, Procedure, Cost and Side Effects",
  excerpt:
    "Lu-177 PSMA is radioligand therapy, not chemotherapy. Who may be eligible, how 7.4 GBq cycles work, side effects, and why Indian prices need an itemised quotation.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["prostate cancer", "Lu-177 PSMA", "radioligand therapy", "PSMA PET", "mCRPC", "India"],
  image: "/uploads/articles/pca-lu-anatomy.webp",
  imageAlt:
    "Transparent male body with a gold prostate, teal pelvic nodes and gold traces along the spine used to explain PSMA-targeted radioligand therapy",
  status: "published",
  featured: true,
  seoTitle: "Lutetium-177 PSMA Therapy in India: Eligibility, Cost, Side Effects",
  seoDescription:
    "Lu-177 PSMA radioligand therapy for PSMA-positive metastatic prostate cancer: eligibility, 7.4 GBq cycles, dry mouth and kidney monitoring, and why Indian cost is not one number.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-lu-anatomy.webp",
  allowIndex: true,
  keywords: [
    "Lutetium-177 PSMA therapy in India",
    "Lu-177 PSMA",
    "PSMA radioligand therapy",
    "Lu-177 PSMA cost India",
    "PSMA-positive mCRPC",
    "VISION trial",
    "Pluvicto India",
    "Lu-177 side effects",
    "PSMA PET before Lu-177",
    "7.4 GBq PSMA",
    "radioligand therapy prostate cancer",
  ],
  relatedLinks: [
    { label: "Prostate cancer diagnosis", href: DX },
    { label: "Prostate cancer stages 1 to 4", href: STAGES },
    { label: "Treatment without surgery", href: NONSURG },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-lu-anatomy.webp", article.imageAlt],
  [
    "pca-lu-infusion.webp",
    "Male patient receiving an intravenous infusion while a clinician works, with a gold-spine overlay of PSMA-targeted disease",
  ],
  [
    "pca-lu-organs.webp",
    "Transparent male figure with gold salivary glands, teal kidneys and a gold prostate used to explain Lu-177 monitoring",
  ],
  [
    "pca-lu-bones.webp",
    "Male patient in clinic with a gold pelvic overlay of bladder, prostate and spine while a clinician explains metastatic disease",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
    store.media.push({
      id: mediaId,
      url: `/uploads/articles/${file}`,
      name: file,
      alt,
      addedAt: now,
    });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

const luLink = { label: "Lutetium-177 PSMA therapy in India", href: LU };
for (const siblingId of [
  "art_prostate_cancer_stages_1_to_4",
  "art_gleason_score_grade_group_prostate_cancer",
  "art_prostate_cancer_symptoms",
  "art_prostate_cancer_diagnosis_psa_mri_biopsy_psma_pet",
  "art_active_surveillance_prostate_cancer",
  "art_prostate_cancer_recurrence_after_surgery",
  "art_prostate_cancer_diet",
  "art_brachytherapy_for_prostate_cancer",
  "art_radiation_therapy_for_prostate_cancer",
  "art_robotic_prostatectomy_in_india",
  "art_prostate_cancer_treatment_without_surgery",
  "art_prostate_cancer_treatment_options_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((row) => row.href === LU)) {
    sibling.relatedLinks.unshift(luLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log(
  "wrote",
  article.slug,
  "blocks",
  blocks.length,
  "ctas",
  blocks.filter((b) => b.type === "button" || (b.type === "paragraph" && /wa\.me|\/consult\?/.test(b.text || ""))).length,
);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(LU)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "[targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy), radiopharmaceutical therapy, or a combination of treatments.",
    "[targeted therapy](/costs/India/Medical-Oncology/Targeted-Therapy), [radiopharmaceutical therapy](/blogs/lutetium-177-psma-therapy-in-india), or a combination of treatments.",
  );
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "How Stage 1 to 4, TNM, PSA and Grade Group combine is covered in [Prostate Cancer Stages 1 to 4](/blogs/prostate-cancer-stages-1-to-4).",
    "How Stage 1 to 4, TNM, PSA and Grade Group combine is covered in [Prostate Cancer Stages 1 to 4](/blogs/prostate-cancer-stages-1-to-4). Eligibility, cycles and cost for radioligand treatment are covered in [Lutetium-177 PSMA Therapy in India](/blogs/lutetium-177-psma-therapy-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked Lu-177 blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("lutetium-177-psma-therapy-in-india")) {
  llms = llms.replace(
    "and [prostate cancer stages 1 to 4](https://gaf.healthcare/blogs/prostate-cancer-stages-1-to-4).",
    ", [prostate cancer stages 1 to 4](https://gaf.healthcare/blogs/prostate-cancer-stages-1-to-4) and [Lutetium-177 PSMA therapy in India](https://gaf.healthcare/blogs/lutetium-177-psma-therapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
