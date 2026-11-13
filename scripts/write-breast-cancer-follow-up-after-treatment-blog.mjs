#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-follow-up-after-treatment";
const OLD_SLUG = "breast-cancer-follow-up-tests";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_ALT = "/blogs/breast-cancer-radiation-therapy-in-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const CHEMO_ALT = "/blogs/breast-cancer-chemotherapy-in-india";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_ALT = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const META = "/blogs/metastatic-breast-cancer-stage-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const LUMP_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const IMG1 = "/uploads/articles/breast-cancer-follow-up-consult.webp";
const IMG2 = "/uploads/articles/breast-cancer-follow-up-mammogram.webp";
const IMG3 = "/uploads/articles/breast-cancer-follow-up-surveillance.webp";
const IMG4 = "/uploads/articles/breast-cancer-follow-up-survivorship.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Why follow-up?</strong></td><td>Monitor recovery, watch for recurrence or a new breast cancer, manage side effects and review ongoing medicines</td></tr><tr><td><strong>Typical schedule</strong></td><td>Often every 3–6 months for 2–3 years, then 6–12 months, then yearly — individualised by risk</td></tr><tr><td><strong>Key imaging</strong></td><td>Mammography of remaining breast tissue when indicated; not routine mammography of a fully removed breast</td></tr><tr><td><strong>Routine PET-CT / tumour markers?</strong></td><td>Generally not for asymptomatic early-stage survivors — use when symptoms or findings justify them</td></tr><tr><td><strong>Related care</strong></td><td><a href="${TX_BREAST}">Breast cancer treatment in India</a> · <a href="${RECUR}">recurrence</a> · <a href="${LYMPH}">lymphoedema</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer follow-up after treatment</strong> focuses on clinical review and appropriate mammography — not every possible scan at every visit.</p></aside>`;

const scheduleTable = `<div class="md-body"><table><thead><tr><th>Period after treatment</th><th>Common follow-up pattern</th></tr></thead><tbody><tr><td>First 2–3 years</td><td>Approximately every 3–6 months</td></tr><tr><td>Years 4–5</td><td>Approximately every 6–12 months</td></tr><tr><td>After 5 years</td><td>Usually once a year</td></tr></tbody></table></div>`;

const notRoutineTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Routine use in an asymptomatic survivor</th></tr></thead><tbody><tr><td>PET-CT</td><td>Not generally recommended</td></tr><tr><td>CT chest/abdomen/pelvis</td><td>Not generally recommended</td></tr><tr><td>Bone scans</td><td>Not generally recommended</td></tr><tr><td>Routine chest X-rays</td><td>Not generally recommended</td></tr><tr><td>Liver ultrasound</td><td>Not generally recommended</td></tr><tr><td>Routine CA 15-3 or CEA</td><td>Not generally recommended</td></tr><tr><td>Routine brain MRI</td><td>Not generally recommended</td></tr><tr><td>Routine breast MRI for everyone</td><td>Not generally recommended</td></tr></tbody></table></div>`;

const carePlanTable = `<div class="md-body"><table><thead><tr><th>Section</th><th>Information to include</th></tr></thead><tbody><tr><td>Original diagnosis</td><td>Cancer type, stage, grade and receptor status</td></tr><tr><td>Surgery</td><td>Type of operation and date</td></tr><tr><td>Pathology</td><td>Tumour size, lymph-node status and margin results</td></tr><tr><td>Chemotherapy</td><td>Medicines, cycles and dates</td></tr><tr><td>Radiation</td><td>Treatment area and completion date</td></tr><tr><td>Hormone therapy</td><td>Medicine, planned duration and monitoring</td></tr><tr><td>Targeted therapy</td><td>Medicines and treatment schedule</td></tr><tr><td>Follow-up</td><td>Consultation and mammography schedule</td></tr><tr><td>Side effects</td><td>Possible late effects and warning signs</td></tr><tr><td>Emergency contacts</td><td>Who to contact if new symptoms develop</td></tr><tr><td>General health</td><td>Exercise, nutrition, bone health and other screening</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Follow-up relevance</th></tr></thead><tbody><tr><td><a href="${LUMP_COST}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving pathway; remaining breast needs surveillance mammography</td></tr><tr><td><a href="${MAST_COST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Operated side usually no routine mammogram; opposite breast still screened</td></tr><tr><td><a href="${CHEMO_COST}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>May need blood counts, neuropathy and selected cardiac review</td></tr><tr><td><a href="${HT_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Multi-year medicine review, bone health and side-effect monitoring</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Post-radiation breast/chest-wall and late-effect review</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges, not hospital quotations. Follow-up visit and mammography fees vary by centre — request an itemised estimate for your schedule.</p>`;

const faqs = [
  ["How often should I visit my oncologist after breast cancer treatment?", "A commonly used schedule is every 3–6 months during the first few years, every 6–12 months during years four and five, and annually thereafter. Your doctor may recommend a different schedule based on your risk and treatment history."],
  ["When should I have my first mammogram after breast cancer surgery?", "After breast-conserving surgery and radiation, the first surveillance mammogram is commonly performed around 6–12 months after radiation is completed. Your treating team will confirm the appropriate date."],
  ["Do I need a mammogram after mastectomy?", "Routine mammography is generally not performed on the side where the breast has been completely removed. If the opposite breast remains, it generally continues to require surveillance mammography."],
  ["Is an annual PET-CT necessary after breast cancer treatment?", "No. Routine annual PET-CT is not generally recommended for asymptomatic patients treated for early-stage breast cancer. It may be used when symptoms or clinical findings justify further investigation."],
  ["Are blood tests required every six months after breast cancer treatment?", "Not for everyone. Blood tests are selected according to symptoms, ongoing medicines, treatment-related risks and other medical conditions."],
  ["Should I check CA 15-3 regularly?", "CA 15-3 is not generally recommended as a routine recurrence-screening test for asymptomatic patients after early-stage breast cancer treatment. It may have a role in selected patients with advanced disease."],
  ["Can breast cancer return even if my mammogram is normal?", "Yes. Mammography is useful but cannot detect every recurrence. A recurrence may develop in the chest wall, lymph nodes or distant organs. New or persistent symptoms should be assessed even if the latest mammogram was normal."],
  ["Do I need an MRI after breast cancer treatment?", "Not everyone needs breast MRI. It may be recommended for selected high-risk patients or when mammography and ultrasound do not adequately explain a clinical finding."],
  ["How long should I continue follow-up after breast cancer treatment?", "Follow-up generally continues for many years. Some hormone receptor-positive cancers can recur long after the original treatment, so long-term care remains important."],
  ["Do I need to continue hormone therapy during follow-up?", "If hormone therapy has been prescribed, continue it for the recommended duration unless your oncologist advises otherwise. Do not stop it independently because of side effects; discuss alternatives with your doctor."],
  ["Can I travel after completing breast cancer treatment?", "Many patients can travel after treatment, but the timing depends on recovery, current medicines, infection risk, blood counts, mobility and other medical factors. Ask the treating team before making travel plans."],
  ["What should I do if I find a new lump?", "Contact your treating doctor for an examination. A new lump does not always mean cancer has returned, but it should not be ignored."],
  ["Can I exercise after breast cancer treatment?", "Many patients can exercise safely and benefit from regular physical activity. The programme should be adjusted for surgical recovery, lymphoedema, heart health and bone involvement."],
  ["Is follow-up necessary if I feel completely healthy?", "Yes. Some important changes may not cause symptoms initially. Regular consultations and recommended mammography remain important even when you feel well."],
  ["Can follow-up appointments be done online?", "Some follow-up consultations can be conducted virtually, particularly when reviewing symptoms, reports or ongoing medicines. A physical examination or imaging may still be necessary depending on the situation."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Completing breast cancer treatment is an important milestone, but regular follow-up remains essential. Follow-up appointments help doctors monitor recovery, detect possible recurrence, manage long-term side effects and check the health of the remaining breast tissue. This guide explains the recommended follow-up schedule, mammograms, other investigations, warning signs and survivorship care for patients planning [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [recurrence](" + RECUR + "), [metastatic / Stage 4 disease](" + META + "), [surgery](" + SURGERY + "), [lumpectomy vs mastectomy](" + LUMP + "), [radiation](" + RAD + "), [chemotherapy](" + CHEMO + "), [hormone therapy](" + HT + "), [lymphoedema](" + LYMPH + ") and [cost](" + COST + ")."),
  btn("Ask GAF to review a breast cancer follow-up plan", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with surgery, radiation and medicine summaries](" + wa("Please review my breast cancer treatment records and advise on a follow-up schedule and care in India.") + ")"),
  img(IMG1, "Breast cancer survivor reviewing a follow-up and survivorship care plan with an oncologist beside a soft circular calendar diagram", "Follow-up is organised care after treatment — not every possible test at every visit."),

  h2("Why Is Follow-Up Important After Breast Cancer Treatment?"),
  p("Completing breast cancer treatment can bring relief, but it does not mean that medical care is over. Patients who have undergone surgery, chemotherapy, radiation therapy or other treatments usually need regular follow-up with their cancer care team."),
  p("Follow-up serves several purposes:"),
  ul([
    "Monitoring recovery after surgery and other treatments.",
    "Checking for signs of breast cancer recurrence.",
    "Detecting a new cancer in the opposite breast.",
    "Monitoring the remaining breast tissue after breast-conserving surgery.",
    "Managing long-term side effects of chemotherapy, radiation and hormone therapy.",
    "Assessing bone health and heart health when relevant.",
    "Supporting physical and emotional recovery.",
    "Reviewing ongoing medicines and preventive health needs.",
  ]),
  p("The purpose is not to perform every possible test at every visit. It is to use appropriate examinations and investigations based on the patient's original diagnosis, treatment history, current symptoms and risk factors."),

  h2("What Happens During Breast Cancer Follow-Up?"),
  p("A follow-up appointment is generally more than a discussion about whether cancer has returned. The doctor reviews the patient's health, asks about new symptoms, examines the relevant areas and checks for treatment-related complications."),
  p("A typical appointment may include:"),
  ol([
    "Review of current health and any new symptoms.",
    "Physical examination of the breast or chest wall.",
    "Examination of the armpits and nearby lymph-node regions.",
    "Review of mammography or other imaging, if due.",
    "Assessment of treatment-related side effects.",
    "Review of hormone therapy or other ongoing medicines.",
    "Advice about exercise, nutrition and general health.",
    "Planning of the next follow-up appointment.",
  ]),
  p("Some consultations can be conducted virtually when an in-person examination or investigation is not required. However, new symptoms or abnormal findings may require a physical visit."),

  h2("Breast Cancer Follow-Up Schedule: How Often Should You See Your Doctor?"),
  p("There is no single schedule suitable for every patient. Follow-up depends on the original cancer stage, tumour biology, surgery, radiation treatment, ongoing medicines and risk of recurrence."),
  p("A commonly used follow-up pattern after treatment for early-stage breast cancer is:"),
  { id: id("html"), type: "html", html: scheduleTable },
  p("This is a general framework, not a fixed rule. Patients with locally advanced disease, residual cancer after preoperative chemotherapy, complex treatment histories or new symptoms may need closer monitoring. Risk-based approaches (including recent ASCO guidance) support individualised surveillance rather than identical testing for every survivor."),
  p("Ask the treating oncologist for a written schedule explaining when consultations, mammograms and any other investigations are due. Broader staging context: [breast cancer stages](" + STAGES + ")."),
  btn("Request a written survivorship schedule review", consult("Breast Cancer Treatment in India")),

  h2("What Is the Difference Between Follow-Up and Screening?"),
  p("**Breast cancer screening** generally refers to tests performed in people who do not have a known breast cancer diagnosis, with the aim of detecting cancer early."),
  p("**Breast cancer follow-up** refers to medical care after a patient has already been diagnosed and treated for breast cancer. Follow-up may include mammography, physical examination and assessment of treatment-related effects."),
  p("A patient who has undergone breast cancer treatment should follow a surveillance plan designed for their medical history rather than relying only on the general population screening schedule."),

  h2("Mammography After Breast Cancer Treatment"),
  p("Mammography is one of the most important investigations used to monitor breast tissue after treatment. It uses low-dose X-rays to create images of the breast and can help identify suspicious changes before they become noticeable during a physical examination. The need for mammography depends mainly on the type of surgery performed — see [surgery in India](" + SURGERY + ") and [lumpectomy vs mastectomy](" + LUMP + ")."),
  img(IMG2, "Woman undergoing mammography with a technologist in a calm clinic beside a soft circular breast imaging concept", "Surveillance mammography is planned around remaining breast tissue and prior radiation."),

  h3("1. Mammography After Lumpectomy"),
  p("A lumpectomy removes the tumour while preserving most of the breast. Because breast tissue remains, mammography is generally recommended after treatment."),
  p("The first surveillance mammogram is commonly performed around 6–12 months after completing [radiation therapy](" + RAD + "), depending on the clinical situation and local protocol. After that, regular mammography is recommended."),
  p("Risk-based patterns discussed in recent ASCO guidance include annual mammography during early years after breast-conserving surgery, with selected lower-risk patients aged 50 or older possibly extending intervals after remaining recurrence-free, while younger patients and those with triple-negative or HER2-positive disease often continue annual surveillance. These recommendations should not be applied automatically — the treating team decides."),

  h3("2. Mammography After Mastectomy"),
  p("A mastectomy removes most or all of the breast tissue on the operated side. Routine mammography is generally not performed on the side where the entire breast has been removed."),
  ul([
    "After a right-sided mastectomy, the left breast generally continues to need surveillance mammography.",
    "After bilateral mastectomy, routine mammography is generally not required on either side.",
    "If a new lump or skin change develops near the surgical scar, the doctor may recommend ultrasound, MRI or a biopsy.",
  ]),

  h3("3. Mammography After Breast Reconstruction"),
  p("Some patients undergo breast reconstruction after mastectomy using implants or their own tissue. Routine screening mammography is generally not performed on a reconstructed breast after mastectomy. New lumps, skin changes or persistent discomfort should still be assessed — often with ultrasound, MRI or another test."),

  h3("4. Is Mammography Painful After Breast Surgery?"),
  p("Some patients experience discomfort during mammography, particularly if the treated breast is sensitive or has scar tissue. Tell the radiographer about previous surgery, radiation, reconstruction or tenderness before the examination so positioning can be adjusted."),

  h2("What Other Tests Are Needed After Breast Cancer Treatment?"),
  p("Mammography is important, but it is not the only part of follow-up. Other tests may be needed when a patient has specific symptoms, abnormal examination findings, ongoing treatment requirements or a risk of long-term complications."),
  img(IMG3, "Clinician explaining breast cancer surveillance options beside a soft circular diagram of mammography ultrasound MRI and clinical examination", "Investigations are selected for a clinical reason — not as an automatic annual package."),

  h3("1. Breast Ultrasound"),
  p("Breast ultrasound uses sound waves to examine breast tissue and nearby structures. It may be recommended for a new lump, an unclear mammogram finding, a lump near a surgical scar, an enlarged lymph node or further assessment of a specific finding. It is not generally a replacement for routine mammography when mammography is indicated."),

  h3("2. Breast MRI"),
  p("MRI may be considered for selected high inherited or familial risk, certain younger patients with dense tissue and additional risk factors, unclear findings on mammography or ultrasound, evaluation of a suspected recurrence, or selected complex reconstruction cases. MRI is not routinely required for every breast cancer survivor."),

  h3("3. CT Scan, PET-CT, Bone Scan and Brain MRI"),
  p("CT, PET-CT, bone scan and brain MRI may be recommended when symptoms or examination findings raise concern about spread or another medical problem — for example persistent unexplained bone pain, neurological symptoms, or suspected distant disease (see [metastatic breast cancer](" + META + "))."),
  p("Routine CT of the chest, abdomen and pelvis, annual PET-CT, routine bone scans or routine brain MRI are generally **not** recommended solely to search for distant recurrence in asymptomatic patients after early-stage treatment."),

  h2("Are Blood Tests Necessary After Breast Cancer Treatment?"),
  p("Patients often expect regular blood tests after completing treatment. The need depends on the treatment received, ongoing medicines, symptoms and other health conditions."),
  ul([
    "**Complete blood count** — recovery from chemotherapy, fatigue symptoms or medicines that affect blood counts.",
    "**Liver and kidney function** — medicines that require monitoring, symptoms, or preparation for certain investigations.",
    "**Calcium and vitamin D** — when bone health monitoring is clinically appropriate, especially with aromatase inhibitors or ovarian suppression.",
    "**Tumour markers (CA 15-3, CEA)** — may be used in selected advanced disease settings; not recommended as routine recurrence screening for otherwise healthy early-stage survivors.",
  ]),
  p("A normal tumour marker does not guarantee that cancer has not returned. An elevated result does not automatically mean recurrence. Doctors interpret results with symptoms, examination and imaging."),

  h2("Which Tests Are Not Routinely Recommended for Every Breast Cancer Survivor?"),
  p("More tests do not always mean better monitoring. Unnecessary investigations can cause anxiety, false alarms, additional procedures and avoidable expense."),
  p("For most patients treated for early-stage breast cancer who have no symptoms or concerning examination findings, routine surveillance generally focuses on medical history, physical examination and mammography of remaining breast tissue when indicated."),
  { id: id("html"), type: "html", html: notRoutineTable },
  p("These tests can still be important when symptoms, examination findings or a specific clinical concern justify them. The aim is appropriate testing, not simply more testing. See also [recurrence warning signs](" + RECUR + ")."),
  p("[WhatsApp +91 90443 46292 if you have been offered routine PET-CT without symptoms](" + wa("I completed breast cancer treatment and was offered routine PET-CT. Please advise whether this is needed and help review my follow-up plan in India.") + ")"),

  h2("Follow-Up After Chemotherapy"),
  p("Chemotherapy can affect several parts of the body. Some side effects improve within weeks or months, while others may last longer. Follow-up after [chemotherapy](" + CHEMO_ALT + ") may include assessment of persistent fatigue, neuropathy, memory or concentration changes, menstrual and fertility concerns, heart function after certain medicines, bone health, blood counts when indicated and emotional well-being."),
  h3("Heart Monitoring After Chemotherapy"),
  p("Certain chemotherapy medicines, particularly anthracyclines, and some HER2-targeted treatments can affect heart function. Depending on medicines, cumulative doses and risk factors, doctors may recommend an echocardiogram or other cardiac assessment. Report new breathlessness, leg swelling, chest discomfort, unusual fatigue or palpitations."),
  h3("Peripheral Neuropathy"),
  p("Some chemotherapy medicines can damage peripheral nerves — tingling, numbness, burning, difficulty with fine tasks or balance problems. Persistent symptoms should be discussed because they may affect daily activities and safety."),
  h3("Fertility and Menstrual Health"),
  p("Chemotherapy may affect ovarian function and fertility. Younger patients who wish to have children should discuss concerns with their oncologist and, where appropriate, a fertility specialist."),

  h2("Follow-Up After Radiation Therapy"),
  p("After [radiation](" + RAD_ALT + "), doctors may assess skin changes, breast swelling or firmness, pain or tenderness, changes in breast shape, shoulder stiffness, lung-related symptoms after chest radiation and rare long-term heart effects depending on the treated side and technique."),
  p("Report persistent cough, worsening breathlessness, chest pain or new swelling rather than assuming these are always normal consequences of radiation."),

  h2("Follow-Up During Hormone Therapy"),
  p("Many patients with hormone receptor-positive breast cancer take [hormone therapy](" + HT_ALT + ") for several years — tamoxifen, letrozole, anastrozole, exemestane or ovarian suppression medicines. Follow-up is important because these medicines can have long-term effects. See also [hormone therapy side effects](" + HT_SE + ")."),
  h3("Monitoring During Tamoxifen"),
  p("Doctors may review menstrual or menopausal symptoms, unusual vaginal bleeding, blood-clot symptoms and medicine tolerance. Unusual vaginal bleeding should be assessed promptly. Seek urgent care for sudden leg swelling or pain, chest pain or unexplained breathlessness."),
  h3("Monitoring During Aromatase Inhibitor Treatment"),
  p("Aromatase inhibitors can cause joint pain, muscle discomfort, hot flushes, vaginal dryness and loss of bone density. Bone mineral density testing and bone-protection measures may be recommended."),
  h3("Should Hormone Therapy Be Stopped After Five Years?"),
  p("Not necessarily. Some patients may continue beyond five years depending on stage, lymph-node involvement, recurrence risk, side effects and overall health. Do not stop prescribed hormone therapy without discussing risks and alternatives with the oncologist."),
  btn("Ask about hormone-therapy monitoring in India", consult("Hormone Therapy for Breast Cancer")),

  h2("Bone Health After Breast Cancer Treatment"),
  p("Aromatase inhibitors, ovarian suppression and chemotherapy-induced menopause can affect bone density. Doctors may recommend DEXA bone mineral density testing, adequate calcium intake, vitamin D assessment, weight-bearing and resistance exercise, and medicines to protect bone health in selected patients."),
  p("A DEXA scan is different from a bone scan used to investigate suspected cancer spread."),

  h2("Lymphoedema Monitoring After Breast Cancer Surgery"),
  p("Lymphoedema is swelling from lymphatic fluid build-up, commonly affecting the arm after certain lymph-node surgery or radiation. Symptoms include arm or hand swelling, heaviness, skin tightness, reduced flexibility, discomfort and difficulty with jewellery or clothing on the affected side. Read the dedicated [lymphoedema guide](" + LYMPH + ")."),
  p("Lymphoedema can develop months or years after treatment. Management may include specialist assessment, compression garments, exercise programmes, manual lymphatic drainage in selected patients, skin care and infection-prevention education. Sudden redness, warmth, pain and fever in a swollen arm may indicate infection and need prompt assessment."),

  h2("What Symptoms Should Breast Cancer Survivors Watch For?"),
  p("Not every symptom indicates recurrence. Many are caused by treatment effects, ageing or unrelated conditions. Persistent or unexplained changes should still be discussed."),
  h3("Changes in the Breast or Chest Wall"),
  ul(["A new lump in the remaining breast.", "Thickening or hardening of breast tissue.", "New skin dimpling.", "Persistent redness or swelling.", "Nipple inversion or unusual discharge.", "A new lump near a mastectomy scar.", "Persistent unexplained pain."]),
  h3("Changes in the Armpit or Neck"),
  ul(["A new lump in the armpit.", "Swelling near the collarbone.", "Unexplained neck swelling.", "Persistent arm swelling."]),
  h3("General Symptoms"),
  ul(["Persistent unexplained bone pain.", "Unexplained weight loss.", "Persistent cough.", "New or worsening breathlessness.", "Persistent abdominal discomfort.", "Unusual headaches.", "New weakness or balance problems."]),
  h3("Symptoms That Require Emergency Care"),
  ul(["A seizure.", "Sudden weakness or confusion.", "Severe headache with neurological symptoms.", "Severe back pain with leg weakness or numbness.", "Loss of bladder or bowel control.", "Sudden severe breathlessness.", "Severe chest pain."]),
  p("These emergency symptoms should not wait for the next routine appointment. Distant-disease context: [Stage 4 breast cancer](" + META + ")."),

  h2("Does Every Breast Cancer Survivor Need a PET-CT Scan Every Year?"),
  p("No. This is one of the most common misconceptions about breast cancer follow-up. PET-CT can be useful when doctors need to investigate suspected recurrence or assess disease in selected situations, but routine annual PET-CT is not generally recommended for asymptomatic early-stage survivors."),
  ul([
    "It may identify findings that are not cancer.",
    "False-positive results can lead to unnecessary biopsies and procedures.",
    "It involves radiation exposure.",
    "It can increase anxiety.",
    "Routine intensive imaging has not demonstrated a clear survival advantage in this setting.",
  ]),

  h2("Can Breast Cancer Recurrence Be Detected Early During Follow-Up?"),
  p("Follow-up aims to identify new breast cancers, local recurrence and clinically significant symptoms. Mammography can help detect suspicious changes in remaining breast tissue. Clinical examination may identify new lumps, skin changes or enlarged lymph nodes."),
  p("No follow-up programme can guarantee that every recurrence will be detected before symptoms develop. Patients should seek advice for new changes rather than waiting for the next scheduled scan. More detail: [breast cancer recurrence](" + RECUR + ")."),

  h2("What Is a Breast Cancer Survivorship Care Plan?"),
  p("A survivorship care plan is a written document that explains what happens after the main course of cancer treatment. It helps the patient, oncologist and other clinicians understand the treatment history and future care requirements."),
  { id: id("html"), type: "html", html: carePlanTable },
  p("Keep a copy and share it with doctors involved in ongoing care — especially when travelling between countries."),
  img(IMG4, "Breast cancer survivor walking outdoors with soft circular icons suggesting exercise bone health and emotional wellbeing", "Survivorship care supports quality of life as well as recurrence monitoring."),

  h2("Can Breast Cancer Survivors Live a Normal Life After Treatment?"),
  p("Many patients return to work, family responsibilities, travel and everyday activities after completing treatment. Recovery differs: some regain previous activity within months; others experience longer-lasting fatigue, pain, arm stiffness, lymphoedema or emotional distress."),
  h3("Exercise After Breast Cancer Treatment"),
  p("Regular physical activity can support recovery. Depending on condition, activities may include walking, gentle stretching, yoga, strength training, cycling or swimming. Patients with recent surgery or bone metastases should seek medical advice before starting a new programme."),
  h3("Nutrition After Breast Cancer Treatment"),
  p("There is no single diet that prevents recurrence. A balanced diet can support a healthy weight and recovery. Discuss supplements and herbal products with doctors — some can interfere with medicines."),
  h3("Emotional and Mental Health"),
  p("Fear of recurrence is common. Support may include counselling, psycho-oncology services, support groups, family support and help from survivorship or palliative care teams when appropriate."),

  h2("Follow-Up After Breast Cancer Treatment in India"),
  p("India has hospitals and cancer centres that provide breast cancer treatment and follow-up. Continuity of care matters whether treatment was completed in India or abroad."),
  ol([
    "**Follow-up with the treating oncologist** — review diagnosis, response, ongoing medicines and surveillance; request a written schedule before leaving hospital.",
    "**Access to breast imaging** — confirm where mammography will be performed; same-centre comparison helps when practical, but do not delay necessary tests.",
    "**Long-term side-effect services** — cardiology, bone health, physiotherapy, lymphoedema care, fertility counselling, nutrition and psychological support when needed.",
    "**Coordination with local doctors** — especially for [international patients](" + INTL + ").",
  ]),
  p("Specialists in [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), and national filters for [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") oncology can support follow-up and second opinions."),

  h2("Follow-Up Cost Planning in India"),
  p("There is no single price for breast cancer follow-up. Costs depend on consultation frequency, mammography, selected blood tests, management of side effects and whether new symptoms require restaging. Related treatment pathway ranges used for planning:"),
  { id: id("html"), type: "html", html: costTable },
  p("See the broader [breast cancer treatment cost guide](" + COST + "). GAF Healthcare can help request a case-specific follow-up estimate — we do not invent fixed package prices for every survivor."),
  btn("Request a follow-up and imaging estimate", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 for a case-specific follow-up cost review](" + wa("Please review my breast cancer records and share a follow-up consultation and imaging estimate in India.") + ")"),

  h2("Follow-Up for International Patients Returning Home"),
  p("For patients travelling from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Cameroon, Iraq, Oman, Saudi Arabia and other countries, follow-up planning should begin before returning home."),
  ul([
    "Original biopsy and pathology reports.",
    "ER, PR and HER2 results.",
    "Operation notes and discharge summary.",
    "Chemotherapy and radiation treatment records.",
    "Current medicine list and hormone-therapy plan.",
    "Previous and latest mammography reports and digital image files.",
    "Written follow-up schedule and treating-hospital contacts.",
  ]),
  p("A local doctor can help with routine care; suspected recurrence or complex complications may still need specialist oncology review. Pathway: [international patients](" + INTL + ")."),

  h2("How GAF Healthcare Can Help With Follow-Up Care in India"),
  p("GAF Healthcare assists international patients exploring treatment and medical coordination in India. For breast cancer survivors, support may include arranging follow-up consultations, coordinating review of pathology and treatment records, assisting with recommended mammography and investigations, helping patients understand their follow-up schedule, coordinating opinions for new symptoms and supporting hospital and travel arrangements."),
  p("The treating oncologist remains responsible for deciding which tests are necessary and interpreting results. Patients with emergency symptoms should seek immediate local medical attention rather than waiting to arrange travel."),
  btn("Talk to GAF about survivorship coordination", consult("Breast Cancer Treatment in India")),

  h2("Frequently Asked Questions About Breast Cancer Follow-Up"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Thoughts"),
  p("Completing breast cancer treatment is a major milestone, but follow-up remains an important part of long-term care. A good plan includes regular consultations, appropriate mammography, monitoring of treatment-related side effects and attention to new symptoms."),
  p("More tests do not automatically mean better care. For most patients who have completed treatment for early-stage breast cancer and have no symptoms, routine care generally focuses on clinical assessment and mammography rather than repeated PET-CT scans, CT scans or tumour-marker testing."),
  p("Leave the treating hospital with a clear written survivorship plan — when to return, which investigations are required, which medicines to continue and what symptoms need medical attention."),

  h2("Medical Sources and References"),
  ol([
    "[ASCO – Breast Cancer Follow-Up and Surveillance After Primary Treatment: Guideline Update, 2026](https://ascopubs.org/doi/10.1200/JCO-26-01700)",
    "[American Cancer Society – Living as a Breast Cancer Survivor](https://www.cancer.org/cancer/types/breast-cancer/living-as-a-breast-cancer-survivor.html)",
    "[NCI – Breast Cancer Treatment (PDQ), including post-treatment surveillance](https://www.cancer.gov/types/breast/hp/breast-treatment-pdq)",
    "[NCI – Follow-Up Medical Care After Cancer Treatment](https://www.cancer.gov/about-cancer/coping/survivorship/follow-up-care)",
    "[American Cancer Society – Follow-Up Care After Cancer Treatment](https://www.cancer.org/cancer/survivorship/importance-of-follow-up-care.html)",
    "[NICE NG101 – Early and Locally Advanced Breast Cancer](https://www.nice.org.uk/guidance/ng101/chapter/recommendations)",
    "[American College of Radiology – Breast imaging guidance](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Practice-Parameters-and-Technical-Standards)",
    "[SEOM-GEICAM-SOLTI early-stage breast cancer guidelines, 2025 update](https://pmc.ncbi.nlm.nih.gov/articles/PMC12790541/)",
  ]),
  p("*Medical disclaimer: This article is for general educational purposes and does not replace individual medical advice. Follow-up schedules and investigations should be personalised by the treating oncology team. Patients with new or worsening symptoms should seek medical assessment rather than waiting for their next routine appointment.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Treatment in India](${TX_BREAST})`,
    `[Breast Cancer Follow-Up Tests (earlier guide)](/blogs/${OLD_SLUG})`,
    `[Breast Cancer Recurrence Treatment in India](${RECUR})`,
    `[Metastatic Breast Cancer (Stage 4)](${META})`,
    `[Breast Cancer Surgery in India](${SURGERY})`,
    `[Lumpectomy vs Mastectomy](${LUMP})`,
    `[Radiation Therapy for Breast Cancer](${RAD})`,
    `[Chemotherapy for Breast Cancer in India](${CHEMO})`,
    `[Hormone Therapy for Breast Cancer](${HT})`,
    `[Breast Cancer Lymphoedema](${LYMPH})`,
    `[Breast Cancer Treatment Cost in India](${COST})`,
    `[International Patients](${INTL})`,
    `[Diagnosis tests (ER/PR/HER2)](${DIAG})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_breast_cancer_follow_up_after_treatment",
  slug: SLUG,
  title: "Breast Cancer Follow-Up After Treatment: Mammograms, Tests, Follow-Up Schedule and Recurrence Monitoring in India",
  excerpt:
    "Completing breast cancer treatment is an important milestone, but regular follow-up remains essential. Follow-up appointments help doctors monitor recovery, detect possible recurrence, manage long-term side effects and check the health of the remaining breast tissue. This guide explains the recommended follow-up schedule, mammograms, other investigations, warning signs and survivorship care for patients in India.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T09:30:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "follow-up", "survivorship", "mammogram", "India"],
  image: IMG1,
  imageAlt: "Breast cancer survivor reviewing a follow-up and survivorship care plan with an oncologist",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Follow-Up After Treatment: Schedule, Mammograms and Tests",
  seoDescription:
    "Learn about breast cancer follow-up after surgery, chemotherapy and radiation. Understand mammogram schedules, blood tests, recurrence symptoms and survivorship care in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer follow-up after treatment",
    "Breast cancer follow-up schedule",
    "Mammogram after breast cancer treatment",
    "Tests after breast cancer surgery",
    "Breast cancer recurrence monitoring",
    "Follow-up after mastectomy",
    "Follow-up after lumpectomy",
    "Breast cancer surveillance",
    "Breast cancer follow-up guidelines",
    "Blood tests after breast cancer treatment",
    "Breast cancer screening after chemotherapy",
    "Breast cancer survivorship care",
    "Breast cancer follow-up in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: TX_BREAST },
    { label: "Breast cancer recurrence", href: RECUR },
    { label: "Metastatic breast cancer (Stage 4)", href: META },
    { label: "Lymphoedema", href: LYMPH },
    { label: "Hormone therapy", href: HT },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

const nowMedia = now;
for (const [file, alt] of [
  [IMG1.slice("/uploads/articles/".length), article.imageAlt],
  [
    "breast-cancer-follow-up-mammogram.webp",
    "Woman undergoing mammography with a technologist in a calm clinic beside a soft circular breast imaging concept",
  ],
  [
    "breast-cancer-follow-up-surveillance.webp",
    "Clinician explaining breast cancer surveillance options beside a soft circular diagram of mammography ultrasound MRI and clinical examination",
  ],
  [
    "breast-cancer-follow-up-survivorship.webp",
    "Breast cancer survivor walking outdoors with soft circular icons suggesting exercise bone health and emotional wellbeing",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`)) {
    store.media.push({
      id: mediaId,
      url: `/uploads/articles/${file}`,
      name: file,
      alt,
      addedAt: nowMedia,
    });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

// Keep older follow-up guide but stop indexing it; canonical redirect handles SEO
const old = store.articles.find((row) => row.slug === OLD_SLUG);
if (old) {
  old.allowIndex = false;
  old.canonical = `https://gaf.healthcare/blogs/${SLUG}`;
  old.updatedAt = now;
  old.relatedLinks = old.relatedLinks || [];
  if (!old.relatedLinks.some((row) => row.href === `/blogs/${SLUG}`)) {
    old.relatedLinks.unshift({ label: "Breast cancer follow-up after treatment", href: `/blogs/${SLUG}` });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length, "articles", store.articles.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer follow-up after treatment](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer follow-up after treatment](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "breast-cancer-recurrence-treatment-india",
  "metastatic-breast-cancer-stage-4",
  "breast-cancer-surgery-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-lymphedema",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  OLD_SLUG,
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer follow-up after treatment", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related articles");
