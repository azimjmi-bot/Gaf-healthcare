#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const SLUG = "breast-biopsy-breast-cancer-india";
const TX = "/treatments/breast-cancer-treatment-in-india";
const SYMP = "/blogs/breast-cancer-symptoms";
const DIAG = "/blogs/breast-cancer-diagnosis";
const DIAG2 = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SCREEN = "/blogs/breast-cancer-screening-india";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const MED = "/doctors/India/Medical-Oncology";
const SURG = "/doctors/India/Surgical-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";
const PREC = "/costs/India/Medical-Oncology/Precision-Oncology";
const MAST = "/costs/India/Surgical-Oncology/Mastectomy";
const LUMP = "/costs/India/Surgical-Oncology/Lumpectomy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";

let n = 0;
const id = (p) => `${p}_${(++n).toString().padStart(3, "0")}`;
const h2 = (t) => ({ id: id("h"), type: "heading", level: 2, text: t });
const h3 = (t) => ({ id: id("h"), type: "heading", level: 3, text: t });
const p = (t) => ({ id: id("p"), type: "paragraph", text: t });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const IMG1 = "/uploads/articles/breast-biopsy-overview.webp";
const IMG2 = "/uploads/articles/breast-biopsy-core-needle.webp";
const IMG3 = "/uploads/articles/breast-biopsy-pathology-biomarkers.webp";
const IMG4 = "/uploads/articles/breast-biopsy-recovery-results.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is a breast biopsy?</strong></td><td>A procedure that collects breast cells or tissue for pathology examination</td></tr><tr><td><strong>Does biopsy mean cancer?</strong></td><td>No — many biopsies show benign findings</td></tr><tr><td><strong>Preferred for suspected cancer</strong></td><td>Core needle biopsy when feasible (tissue for type, grade, biomarkers)</td></tr><tr><td><strong>Pain</strong></td><td>Usually local anaesthesia; brief sting, pressure, mild post-procedure soreness</td></tr><tr><td><strong>Key biomarkers</strong></td><td>ER, PR, HER2 (± Ki-67) when cancer is confirmed</td></tr><tr><td><strong>Planning</strong></td><td><a href="${DIAG2}">Diagnosis tests guide</a> · <a href="${TX}">treatment in India</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast biopsy in India</strong> confirms or rules out cancer and guides treatment planning — imaging alone is often not enough.</p></aside>`;

const tripleTable = `<div class="md-body"><table><thead><tr><th>Assessment</th><th>What it involves</th></tr></thead><tbody><tr><td>Clinical examination</td><td>Doctor examines breasts and nearby lymph nodes</td></tr><tr><td>Imaging</td><td>Mammography, ultrasound or MRI as clinically indicated</td></tr><tr><td>Pathology</td><td>Cells or tissue examined when indicated</td></tr></tbody></table></div>`;

const typeTable = `<div class="md-body"><table><thead><tr><th>Type of biopsy</th><th>Common use</th><th>Main feature</th></tr></thead><tbody><tr><td>FNAC</td><td>Cysts, selected lumps and lymph nodes</td><td>Collects cells or fluid</td></tr><tr><td>Core needle biopsy</td><td>Suspicious solid breast lumps</td><td>Collects tissue samples</td></tr><tr><td>Vacuum-assisted biopsy</td><td>Selected small lesions and calcifications</td><td>Collects multiple tissue samples</td></tr><tr><td>Ultrasound-guided biopsy</td><td>Lesions visible on ultrasound</td><td>Needle guided by ultrasound</td></tr><tr><td>Stereotactic biopsy</td><td>Mammography-only abnormalities</td><td>Needle guided by mammography</td></tr><tr><td>MRI-guided biopsy</td><td>MRI-only abnormalities</td><td>Needle guided by MRI</td></tr><tr><td>Surgical biopsy</td><td>Selected unresolved abnormalities</td><td>Removes part or all of the lesion</td></tr></tbody></table></div>`;

const durationTable = `<div class="md-body"><table><thead><tr><th>Procedure</th><th>General expectation</th></tr></thead><tbody><tr><td>FNAC</td><td>Usually a short outpatient procedure</td></tr><tr><td>Ultrasound-guided core biopsy</td><td>Often about 30–60 minutes including preparation</td></tr><tr><td>Stereotactic biopsy</td><td>May take longer due to positioning and imaging</td></tr><tr><td>MRI-guided biopsy</td><td>Often longer than ultrasound-guided biopsy</td></tr><tr><td>Surgical biopsy</td><td>Depends on the operation and anaesthesia</td></tr></tbody></table></div>`;

const biomarkerTable = `<div class="md-body"><table><thead><tr><th>Biomarker</th><th>What it tells doctors</th><th>Why it matters</th></tr></thead><tbody><tr><td>ER</td><td>Whether oestrogen receptors are present</td><td>Helps assess endocrine therapy</td></tr><tr><td>PR</td><td>Whether progesterone receptors are present</td><td>Adds hormone-receptor information</td></tr><tr><td>HER2</td><td>Whether HER2 is overexpressed or amplified</td><td>May guide HER2-targeted therapy</td></tr><tr><td>Ki-67</td><td>Estimates tumour cell proliferation</td><td>May contribute to tumour biology assessment</td></tr></tbody></table></div>`;

const biopsyVsSurgery = `<div class="md-body"><table><thead><tr><th>Breast biopsy</th><th>Breast cancer surgery</th></tr></thead><tbody><tr><td>Primarily diagnostic</td><td>Primarily therapeutic</td></tr><tr><td>Collects a sample or removes a selected abnormality</td><td>Removes cancer according to the treatment plan</td></tr><tr><td>Often needle-based under local anaesthesia</td><td>Usually an operation; may need general anaesthesia</td></tr><tr><td>Shorter recovery for most needle biopsies</td><td>Recovery depends on the operation</td></tr></tbody></table></div>`;

const costFactors = `<div class="md-body"><table><thead><tr><th>Cost component</th><th>What affects the price?</th></tr></thead><tbody><tr><td>Specialist consultation</td><td>Breast surgeon, radiologist or oncologist</td></tr><tr><td>Imaging guidance</td><td>Ultrasound, mammography or MRI</td></tr><tr><td>Biopsy procedure</td><td>FNAC, core needle, vacuum-assisted or surgical</td></tr><tr><td>Pathology</td><td>Routine histopathology</td></tr><tr><td>Immunohistochemistry</td><td>ER, PR and HER2 testing</td></tr><tr><td>Additional HER2 testing</td><td>ISH/FISH when indicated</td></tr><tr><td>Follow-up consultation</td><td>Result review and treatment planning</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>How it relates after biopsy</th></tr></thead><tbody><tr><td><a href="${PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected molecular / precision pathways when indicated after diagnosis</td></tr><tr><td><a href="${LUMP}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving surgery pathway when operable disease is confirmed</td></tr><tr><td><a href="${MAST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Selected surgical pathways after confirmed cancer</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>When systemic therapy is indicated by stage and biology</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named treatment pathways — not FNAC or core-biopsy package prices. Ask centres for an itemised estimate covering procedure, guidance, histopathology and biomarker tests.</p>`;

const faqs = [
  ["Does a breast biopsy mean I have cancer?", "No. A biopsy determines whether an abnormality is cancerous. Many breast biopsies show benign conditions."],
  ["Is a breast biopsy painful?", "Most needle biopsies use local anaesthesia. You may feel a brief sting from the injection and pressure during sampling. Mild soreness or bruising can occur afterwards."],
  ["Which biopsy is best for suspected breast cancer?", "Core needle biopsy is generally preferred because it provides tissue for histology and biomarker testing. The method still depends on the abnormality and imaging findings."],
  ["Is FNAC enough to diagnose breast cancer?", "FNAC can identify suspicious or malignant cells in selected cases, but it does not preserve tissue architecture and may not support full biomarker planning. Core needle biopsy is generally preferred when feasible."],
  ["How long does a breast biopsy take?", "Many needle biopsies are completed within about an hour including preparation. Duration varies with technique and imaging guidance."],
  ["Can I go home after a breast biopsy?", "Most patients having a needle biopsy return home the same day. Surgical biopsy may involve a different recovery plan."],
  ["How many days does a breast biopsy report take?", "Timing varies by laboratory and tests required. A straightforward report may arrive within a few working days; immunohistochemistry or HER2 confirmation can take longer."],
  ["What is the difference between a benign and malignant breast biopsy?", "Benign means cancer was not identified in the sampled tissue. Malignant means cancer cells were found. Both must be interpreted with imaging and clinical findings."],
  ["Can a biopsy spread breast cancer?", "There is no good evidence that a properly performed breast needle biopsy causes clinically meaningful spread. Accurate tissue diagnosis remains important."],
  ["What is a marker clip placed during breast biopsy?", "A very small device placed at the biopsy site in selected cases so doctors can locate the area later during imaging, surgery or treatment."],
  ["What happens if the biopsy is benign but the mammogram is suspicious?", "The team checks radiology–pathology concordance. If findings do not match, repeat biopsy or surgical biopsy may be recommended."],
  ["Do all breast cancer biopsies require ER, PR and HER2 testing?", "For newly diagnosed invasive breast cancer these biomarkers are important for treatment planning. Exact tests depend on the pathology and clinical situation."],
  ["Can I have a breast biopsy during pregnancy?", "A clinically necessary biopsy can be performed in pregnancy. The clinician chooses an appropriate procedure and imaging approach for the patient."],
  ["Is a breast biopsy performed under general anaesthesia?", "Most needle biopsies use local anaesthesia. Surgical biopsies may use local anaesthesia with sedation or general anaesthesia depending on the procedure."],
  ["Can a breast biopsy remove the entire lump?", "Some vacuum-assisted or surgical biopsies can remove a substantial part or all of a selected abnormality, but a diagnostic biopsy is not automatically definitive cancer surgery."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A breast biopsy collects a small sample of breast tissue or cells for microscopic examination. It is often recommended when examination or imaging identifies a suspicious lump or abnormality. This guide explains biopsy types, procedure, pain, pathology reports, biomarkers and what patients should know about getting a breast biopsy in India. Related care: [diagnosis tests](" + DIAG2 + "), [screening](" + SCREEN + "), [treatment in India](" + TX + ") and [cost](" + COST + ")."),
  btn("Ask GAF to arrange a breast biopsy consultation", consult("Breast Biopsy")),
  p("[WhatsApp +91 90443 46292 with imaging reports for biopsy pathway advice](" + wa("Please advise on breast biopsy options, pathology tests and estimated cost in India. I can share mammogram/ultrasound reports.") + ")"),
  img(IMG1, "Woman discussing a recommended breast biopsy plan with a breast specialist in a calm clinic", "A biopsy investigates a suspicious finding — it does not by itself confirm cancer."),

  h2("Why Might You Need a Breast Biopsy?"),
  p("Being told you need a breast biopsy can be frightening, but it does not mean cancer has been confirmed. Doctors remove a small sample so a pathologist can determine whether the abnormality is cancerous, non-cancerous or needs further investigation."),
  ul([
    "A breast lump feels suspicious on examination.",
    "Mammography, ultrasound or MRI shows a suspicious area or microcalcifications.",
    "A lump changes in size or appearance.",
    "A previous test produced an uncertain result.",
  ]),
  p("Imaging can identify an abnormality but cannot always establish what it is. For suspected breast cancer in India, core needle biopsy is generally preferred because tissue can be examined for tumour type, grade and biomarkers. See [breast cancer diagnosis](" + DIAG + ")."),

  h2("What Is a Breast Biopsy?"),
  p("A breast biopsy removes cells or tissue for laboratory examination. The report helps determine whether findings are benign or malignant, the cancer type if present, invasive versus non-invasive disease, tumour grade and whether hormone-receptor and HER2 testing are required."),
  h3("Does every breast lump need a biopsy?"),
  p("No. Many lumps are benign (for example fibroadenomas, simple cysts, fibrocystic changes or fat necrosis). Some can be assessed with examination and imaging alone. Others need biopsy when appearance is suspicious or findings are inconclusive. Decisions follow combined clinical, imaging and pathology assessment."),

  h2("When Is a Breast Biopsy Recommended?"),
  p("Recommendations often follow **triple assessment** — clinical examination, imaging and pathology considered together:"),
  { id: id("html"), type: "html", html: tripleTable },
  ul([
    "Suspicious breast lump or BI-RADS 4 / BI-RADS 5 imaging.",
    "Suspicious microcalcifications or architectural distortion.",
    "MRI-only abnormality needing sampling.",
    "Suspicious axillary lymph node.",
    "Persistent clinical concern or inadequate prior sampling.",
  ]),
  p("**Important:** BI-RADS 4 or 5 does not confirm cancer — it indicates further investigation, generally including tissue sampling. More on [screening and BI-RADS](" + SCREEN + ")."),
  btn("Request a second opinion on your imaging report", consult("Breast Cancer Diagnosis")),

  h2("What Are the Different Types of Breast Biopsy?"),
  img(IMG2, "Clinician performing an ultrasound-guided core needle breast biopsy in a calm outpatient setting", "Image-guided core needle biopsy is commonly used when a solid lesion is visible on ultrasound."),

  h3("A. Fine Needle Aspiration Cytology (FNAC)"),
  p("FNAC uses a very thin needle to collect cells or fluid. It is usually quick with minimal discomfort and no stitches. It can assess selected lumps, drain cysts or sample selected lymph nodes. Limitations: it collects cells rather than intact tissue architecture and may not support full biomarker assessment. Core needle biopsy is generally preferred when definitive tissue diagnosis and biomarkers are needed."),

  h3("B. Core Needle Biopsy (CNB)"),
  p("A hollow needle removes small cylindrical tissue cores, usually under local anaesthesia and often with ultrasound guidance. Tissue structure is preserved so pathologists can assess histological type, grade, invasive versus in-situ disease, ER, PR, HER2 and Ki-67 when appropriate — findings that guide treatment."),

  h3("C. Vacuum-Assisted Breast Biopsy (VAB)"),
  p("A specialised vacuum-assisted needle collects multiple samples through a small skin opening. It may be used for small abnormalities, suspicious microcalcifications or lesions needing more extensive sampling, and can reduce the need for surgical biopsy in selected cases."),

  h3("D. Ultrasound-Guided, Stereotactic and MRI-Guided Biopsy"),
  ul([
    "**Ultrasound-guided** — common for lesions visible on ultrasound.",
    "**Stereotactic** — mammography guidance for calcifications or abnormalities not seen well on ultrasound; a marker clip may be placed.",
    "**MRI-guided** — for MRI-only lesions or selected high-risk MRI findings; specialised and not available everywhere.",
  ]),

  h3("E. Surgical Breast Biopsy"),
  p("Incisional biopsy removes part of an abnormality; excisional biopsy removes the whole area, sometimes with a margin. Surgical biopsy may follow inconclusive needle sampling, radiology–pathology discordance or lesions that cannot be adequately sampled with a needle. Needle biopsy is preferred when it can provide a reliable diagnosis before treatment planning."),

  h2("Which Type of Breast Biopsy Is Best?"),
  { id: id("html"), type: "html", html: typeTable },
  p("There is no single best method for every patient. For suspected breast cancer, core needle biopsy is generally preferred when feasible. Choose the technique that answers the clinical question — not simply the newest or most expensive option. Discuss with [surgical oncology specialists](" + SURG + ") or your breast team."),

  h2("Is a Breast Biopsy Painful?"),
  p("Most image-guided needle biopsies use local anaesthesia. You may feel a brief sting from the anaesthetic, pressure when the needle is positioned, clicking from the device, and mild soreness, bruising or swelling afterwards. Sharp pain during sampling should be uncommon once the area is numb — tell the doctor if pain is significant."),
  { id: id("html"), type: "html", html: durationTable },
  btn("Ask about outpatient biopsy logistics in India", consult("Breast Biopsy")),

  h2("How Should You Prepare for a Breast Biopsy?"),
  ul([
    "Bring mammography, ultrasound, MRI and prior pathology reports.",
    "Tell the team about allergies, bleeding disorders and blood-thinning medicines.",
    "Mention pregnancy or breastfeeding.",
    "Do not stop prescribed anticoagulants on your own — ask the doctor first.",
    "Wear comfortable clothing; follow fasting instructions if sedation or general anaesthesia is planned.",
  ]),

  h2("What Happens During a Core Needle Breast Biopsy?"),
  ol([
    "Positioning so the abnormality can be imaged clearly.",
    "Locating the area with ultrasound or another modality.",
    "Skin cleaning and local anaesthesia.",
    "Small skin opening and guided needle placement.",
    "Collection of several tissue cores (clicking sounds are normal).",
    "Optional marker clip at the biopsy site.",
    "Pressure and a small dressing; most patients go home the same day.",
  ]),

  h2("What Happens After a Breast Biopsy?"),
  img(IMG4, "Woman resting after an outpatient breast biopsy while a clinician explains recovery and next steps", "Mild tenderness and bruising are common; seek care for heavy bleeding, fever or worsening pain."),
  p("Mild tenderness, swelling or bruising is usually temporary. Doctors may advise a cold pack, a supportive bra, avoiding strenuous activity for about 24 hours and keeping the site clean. Contact the team for uncontrolled bleeding, rapidly increasing swelling, severe pain, fever, spreading redness or unusual discharge."),

  h2("How Long Does It Take to Get Breast Biopsy Results?"),
  p("A straightforward report may be ready within a few working days. Extra sections, immunohistochemistry, HER2 confirmation or second-pathologist review can take longer. Ask when and how results will be shared."),

  h2("How to Understand a Breast Biopsy Report"),
  h3("Benign findings"),
  p("Cancer was not identified in the sampled tissue (for example fibroadenoma, fibrocystic change, cyst-related change or fat necrosis). Results must still match imaging. Radiology–pathology discordance may lead to repeat or surgical biopsy."),
  h3("Atypical or high-risk lesions"),
  p("Findings such as ADH, ALH, LCIS, selected papillary lesions or radial scar are not invasive cancer but may need excision or surveillance based on sampling, imaging and risk factors."),
  h3("Malignant findings"),
  p("Cancer cells are present (for example invasive ductal or lobular carcinoma, or DCIS). Further biomarker testing guides biology and treatment. See [stages](" + STAGES + ")."),

  h2("What Are ER, PR, HER2 and Ki-67 Tests?"),
  img(IMG3, "Pathologist examining breast biopsy tissue under a microscope with abstract biomarker testing concepts", "Biomarkers help classify hormone receptor-positive, HER2-positive and triple-negative disease."),
  p("When cancer is confirmed, biomarkers help choose therapy:"),
  { id: id("html"), type: "html", html: biomarkerTable },
  p("Equivocal HER2 IHC (often 2+) may need ISH confirmation. These tests support classification into hormone receptor-positive, HER2-positive and triple-negative groups but do not replace the full pathology report. Details: [ER/PR/HER2 diagnosis guide](" + DIAG2 + ")."),
  btn("Plan biomarker-informed treatment with GAF", consult("Breast Cancer Treatment")),

  h2("What Is the Difference Between a Breast Biopsy and Breast Cancer Surgery?"),
  { id: id("html"), type: "html", html: biopsyVsSurgery },
  p("An excisional biopsy can remove a small abnormality but is not necessarily definitive cancer surgery. Confirmed cancer may still need further surgery or systemic therapy. See [breast cancer surgery in India](" + SURGERY + ")."),

  h2("What If the Breast Biopsy Is Inconclusive?"),
  ol([
    "Review imaging and pathology together.",
    "Repeat core needle biopsy or use vacuum-assisted sampling.",
    "Obtain a second pathology opinion.",
    "Consider surgical biopsy in selected cases.",
  ]),
  p("A benign or inconclusive report should not end investigation if clinical and imaging findings remain suspicious."),

  h2("Breast Biopsy Cost in India"),
  p("Cost varies by method, hospital, city, imaging guidance and pathology tests. FNAC differs from image-guided core, vacuum-assisted or surgical biopsy. Factors include:"),
  { id: id("html"), type: "html", html: costFactors },
  p("There is no single nationwide price. Ask for an itemised estimate covering the procedure, guidance, anaesthesia/consumables, histopathology, ER/PR/HER2 (± ISH) and follow-up. Do not compare quotations unless inclusions match."),
  { id: id("html"), type: "html", html: costTable },
  p("Related GAF cost reading: [breast cancer treatment cost in India](" + COST + "). Specialists: [medical oncology](" + MED + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + ")."),
  p("[WhatsApp for an itemised biopsy and pathology estimate](" + wa("I need an itemised estimate for image-guided breast biopsy with histopathology and ER/PR/HER2 testing in India.") + ")"),

  h2("Getting a Breast Biopsy in India: International Patients"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries should share prior mammograms, ultrasound/MRI reports (DICOM when possible), pathology slides or blocks if already biopsied, medicines list and family history before travel. A typical pathway: specialist consultation → review of records → additional imaging if needed → image-guided biopsy → pathology ± biomarkers → multidisciplinary discussion. GAF Healthcare can coordinate appointments; clinical decisions remain with the treating team. See [international patients guide](" + INTL + ")."),
  btn("Coordinate biopsy and treatment travel with GAF", consult("Breast Cancer Treatment")),

  h2("What Happens After Breast Cancer Is Confirmed by Biopsy?"),
  p("Confirmation starts treatment planning: review type and grade, biomarkers, breast and axillary imaging, staging needs and multidisciplinary options. Treatment may include breast-conserving surgery or mastectomy, sentinel node assessment, chemotherapy, radiation, hormone therapy, HER2-targeted therapy or immunotherapy in selected cases. Neoadjuvant therapy before surgery makes an adequate pre-treatment core biopsy and biomarkers especially important. Continue with [follow-up testing](" + FOLLOW + ") after treatment."),

  h2("Frequently Asked Questions About Breast Biopsy"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion: Accurate Diagnosis Guides the Right Treatment"),
  p("An abnormal lump or mammogram does not automatically mean cancer. A breast biopsy moves care from suspicion to accurate diagnosis. Core needle biopsy is generally preferred for suspected breast cancer because it supports type, grade and biomarker assessment. Choose the method that fits the imaging target, and ask why that method — and which laboratory tests — are planned."),
  p("**An accurate diagnosis is the foundation of an appropriate breast cancer treatment plan.** Next steps: [breast cancer treatment in India](" + TX + ") · [symptoms](" + SYMP + ") · [screening](" + SCREEN + ")."),
  btn("Start a GAF breast care consultation", consult("Breast Cancer Treatment")),

  h2("References and Further Reading"),
  ol([
    "[National Cancer Institute – How Is Breast Cancer Diagnosed?](https://www.cancer.gov/types/breast/diagnosis)",
    "[ICMR – Consensus Document for Management of Breast Cancer](https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/Breast_Cancer.pdf)",
    "[MoHFW – Standard Treatment Guidelines](https://clinicalestablishments.mohfw.gov.in/sites/default/files/standard-treatment-guidelines/2611.pdf)",
    "[ICMR – Standard Treatment Workflows, Volume 3](https://www.icmr.gov.in/icmrobject/custom_data/pdf/downloadable-books/STW_Vol_3_2022.pdf)",
    "[National Guidelines in Histopathology – Carcinoma of the Breast](https://collegeofpathologists.com/images/NATIONAL%20GUIDELINES%20IN%20HISTOPATHOLOGY-HANDLING%20AND%20REPORTING%20OF%20CARCINOMA%20OF%20THE%20BREAST.pdf)",
    "[American College of Surgeons – Breast Biopsy](https://www.facs.org/for-patients/the-day-of-your-surgery/breast-cancer-surgery/preoperative-tests-and-imaging/biopsy/)",
    "[MedlinePlus – Breast Biopsy](https://medlineplus.gov/lab-tests/breast-biopsy/)",
    "[RadiologyInfo – Ultrasound-Guided Breast Biopsy](https://www.radiologyinfo.org/en/info/breastbius)",
    "[RadiologyInfo – Stereotactic Breast Biopsy](https://www.radiologyinfo.org/en/info/breastbixr)",
    "[National Cancer Institute – Tumour Marker Tests](https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-markers-fact-sheet)",
  ]),
  p("*Medical disclaimer: This article is for general educational purposes. It does not replace examination, imaging review, pathology interpretation or advice from a qualified healthcare professional.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Treatment in India](${TX})`,
    `[Breast Cancer Diagnosis Tests (Biopsy, ER/PR/HER2)](${DIAG2})`,
    `[Breast Cancer Diagnosis](${DIAG})`,
    `[Breast Cancer Screening in India](${SCREEN})`,
    `[Breast Cancer Symptoms](${SYMP})`,
    `[Breast Cancer Surgery](${SURGERY})`,
    `[Treatment Cost](${COST})`,
    `[International Patients](${INTL})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_breast_biopsy_breast_cancer_india",
  slug: SLUG,
  title: "Breast Biopsy for Breast Cancer: Types, Procedure, Pain, Risks, Results and Cost in India",
  excerpt:
    "A breast biopsy is a procedure in which a small sample of breast tissue or cells is collected and examined under a microscope. It is often recommended when an examination or imaging test identifies a suspicious lump or abnormality. This guide explains the different types of breast biopsy, how the procedure is performed, whether it hurts, how to understand the pathology report and what patients should know about getting a breast biopsy in India.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T12:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "biopsy", "core needle biopsy", "FNAC", "India"],
  image: IMG1,
  imageAlt: "Woman discussing a recommended breast biopsy plan with a breast specialist",
  status: "published",
  featured: true,
  seoTitle: "Breast Biopsy in India: Types, Procedure, Cost, Pain and Results",
  seoDescription:
    "Learn about breast biopsy in India, including core needle biopsy, FNAC, vacuum-assisted and surgical biopsy, procedure, pain, risks, pathology reports and cost.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast biopsy in India",
    "Breast biopsy procedure",
    "Breast biopsy cost in India",
    "Core needle biopsy breast",
    "FNAC breast test",
    "Breast lump biopsy",
    "Ultrasound-guided breast biopsy",
    "Stereotactic breast biopsy",
    "Vacuum-assisted breast biopsy",
    "Breast biopsy pain and recovery",
    "ER PR HER2 testing",
    "Breast cancer biopsy report",
    "BI-RADS 4 biopsy",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: TX },
    { label: "Diagnosis tests (ER/PR/HER2)", href: DIAG2 },
    { label: "Breast cancer diagnosis", href: DIAG },
    { label: "Breast cancer screening in India", href: SCREEN },
    { label: "Breast cancer surgery", href: SURGERY },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["breast-biopsy-overview.webp", article.imageAlt],
  ["breast-biopsy-core-needle.webp", "Clinician performing an ultrasound-guided core needle breast biopsy"],
  ["breast-biopsy-pathology-biomarkers.webp", "Pathologist examining breast biopsy tissue under a microscope"],
  ["breast-biopsy-recovery-results.webp", "Woman resting after an outpatient breast biopsy with clinician support"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((r) => r.id === mediaId || r.url === `/uploads/articles/${file}`)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}

const index = store.articles.findIndex((r) => r.id === article.id || r.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length, "articles", store.articles.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast biopsy in India](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast biopsy in India](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
}

for (const relatedSlug of [
  "breast-cancer-symptoms",
  "breast-cancer-diagnosis",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-cancer-screening-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-follow-up-tests",
]) {
  const related = store.articles.find((r) => r.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((r) => r.href === href)) {
    related.relatedLinks.push({ label: "Breast biopsy in India", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked related articles");
