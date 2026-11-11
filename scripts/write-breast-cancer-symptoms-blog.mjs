import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) => `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) => `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const CHEMO_TX = "/treatments/chemotherapy-in-india";
const ADJ = "/treatments/adjuvant-chemotherapy-in-india";
const NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const RECON_TX = "/treatments/breast-reconstruction-in-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PATHOLOGY = "/blogs/breast-cancer-pathology-report-explained";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";

const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const NSM = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCOPLASTIC = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";

const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
const LUMP_DOCS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const MAST_DOCS = "/doctors/India/Surgical-Oncology/Mastectomy";
const DELHI_LUMP = "/costs/India/Delhi-NCR/Surgical-Oncology/Lumpectomy";
const MUMBAI_LUMP = "/costs/India/Mumbai/Surgical-Oncology/Lumpectomy";
const BLR_LUMP = "/costs/India/Bengaluru/Surgical-Oncology/Lumpectomy";
const CHN_LUMP = "/costs/India/Chennai/Surgical-Oncology/Lumpectomy";
const HYD_LUMP = "/costs/India/Hyderabad/Surgical-Oncology/Lumpectomy";
const DELHI_MAST = "/costs/India/Delhi-NCR/Surgical-Oncology/Mastectomy";
const MUMBAI_MAST = "/costs/India/Mumbai/Surgical-Oncology/Mastectomy";
const BLR_MAST = "/costs/India/Bengaluru/Surgical-Oncology/Mastectomy";
const DELHI_HOSP = "/hospitals/India/Delhi-NCR/Surgical-Oncology";
const MUMBAI_HOSP = "/hospitals/India/Mumbai/Surgical-Oncology";
const BLR_HOSP = "/hospitals/India/Bengaluru/Surgical-Oncology";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Most common early sign</strong></td><td>A new lump or thickening in the breast or underarm</td></tr><tr><td><strong>Other warning signs</strong></td><td>Skin dimpling, nipple retraction or discharge, redness, swelling, armpit or collarbone nodes</td></tr><tr><td><strong>Does every lump mean cancer?</strong></td><td>No. Many lumps are benign (cysts, fibroadenomas) — but new changes need assessment</td></tr><tr><td><strong>Can cancer occur without a lump?</strong></td><td>Yes. Screening, skin changes, inflammatory breast cancer or nipple changes may appear first</td></tr><tr><td><strong>How is it confirmed?</strong></td><td>Clinical exam, mammography/ultrasound (± MRI), then biopsy and receptor testing — see <a href="${DIAG}">diagnosis tests</a></td></tr><tr><td><strong>Treatment pathway in India</strong></td><td><a href="${PILLAR}">Breast cancer treatment in India</a></td></tr><tr><td><strong>GAF lumpectomy planning</strong></td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a>, typically <strong>1–3 nights</strong></td></tr><tr><td><strong>GAF mastectomy planning</strong></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a>, typically <strong>3–6 nights</strong></td></tr><tr><td><strong>Systemic chemotherapy</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> (outpatient cycles)</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer symptoms</strong> often start with a new lump, but painless skin, nipple or armpit changes also matter. Do not wait for pain. After diagnosis, treatment may include surgery, chemotherapy, radiation, hormone therapy or targeted drugs. GAF planning for <a href="${LUMPECTOMY}">lumpectomy</a> is <strong>$3,500–$8,000</strong> (typically <strong>1–3 nights</strong>) and for <a href="${MASTECTOMY}">mastectomy</a> is <strong>$4,500–$10,000</strong> (typically <strong>3–6 nights</strong>). These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose breast cancer. A new breast change needs local clinical assessment. Emergency symptoms belong in a local emergency department.</p></aside>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Warning sign</th><th>What you may notice</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast lump</td><td>New firm or unusual mass</td><td>Common presenting symptom</td></tr><tr><td>Armpit lump</td><td>Swelling under the arm</td><td>May involve lymph nodes</td></tr><tr><td>Breast enlargement</td><td>One breast changes size</td><td>May reflect tissue changes</td></tr><tr><td>Skin dimpling</td><td>Indentations or puckering</td><td>May indicate tissue pulling</td></tr><tr><td>Skin redness</td><td>Redness or darkening</td><td>May occur with inflammatory changes</td></tr><tr><td>Nipple retraction</td><td>Nipple turns inward</td><td>New retraction needs assessment</td></tr><tr><td>Nipple discharge</td><td>Blood or unexplained fluid</td><td>May indicate a duct-related condition</td></tr><tr><td>Breast pain</td><td>Persistent localised discomfort</td><td>Assess if unexplained</td></tr><tr><td>Skin thickening</td><td>Firm or thickened tissue</td><td>May be associated with disease</td></tr><tr><td>Nipple rash</td><td>Persistent scaling or crusting</td><td>May need review for Paget disease</td></tr><tr><td>Collarbone swelling</td><td>Enlarged lymph node</td><td>May indicate node involvement</td></tr><tr><td>Breast swelling</td><td>Rapid enlargement or warmth</td><td>Can occur in inflammatory breast cancer</td></tr></tbody></table></div>`;

const painTable = `<div class="md-body"><table><thead><tr><th>Type of breast discomfort</th><th>Possible explanation</th></tr></thead><tbody><tr><td>Pain before menstruation</td><td>Hormonal changes</td></tr><tr><td>General breast tenderness</td><td>Hormonal or benign breast conditions</td></tr><tr><td>Localised persistent pain</td><td>Requires clinical assessment</td></tr><tr><td>Nipple discomfort</td><td>May have several causes</td></tr><tr><td>Pain with a lump</td><td>Needs examination</td></tr><tr><td>Pain with skin changes</td><td>Needs prompt assessment</td></tr></tbody></table></div>`;

const ageTable = `<div class="md-body"><table><thead><tr><th>Age group</th><th>What to know</th></tr></thead><tbody><tr><td>Below 30 years</td><td>Lumps are often benign, but new changes still need assessment</td></tr><tr><td>30–39 years</td><td>Breast cancer can occur; investigate persistent or unusual changes</td></tr><tr><td>40–49 years</td><td>Risk generally increases; discuss screening based on personal risk</td></tr><tr><td>50–59 years</td><td>Age-related risk increases; screening becomes particularly important</td></tr><tr><td>60 years and above</td><td>Continued screening and prompt evaluation of new symptoms</td></tr></tbody></table></div>`;

const lumpTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Possible cancerous lump</th><th>Possible benign lump</th></tr></thead><tbody><tr><td>Texture</td><td>May be hard or firm</td><td>May be soft, firm or rubbery</td></tr><tr><td>Shape</td><td>May be irregular or rounded</td><td>Often smooth or well-defined</td></tr><tr><td>Movement</td><td>May feel fixed or mobile</td><td>Often mobile, depending on type</td></tr><tr><td>Pain</td><td>Frequently painless, but can hurt</td><td>May be painless or tender</td></tr><tr><td>Growth</td><td>May increase over time</td><td>May remain stable or change</td></tr><tr><td>Diagnosis</td><td>Requires imaging and often biopsy</td><td>Imaging and sometimes biopsy</td></tr></tbody></table></div>`;

const testsTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Main purpose</th></tr></thead><tbody><tr><td>Clinical breast examination</td><td>Identify physical abnormalities</td></tr><tr><td>Mammography</td><td>Detect suspicious breast changes</td></tr><tr><td>Breast ultrasound</td><td>Examine lumps; distinguish cysts from solid lesions</td></tr><tr><td>Breast MRI</td><td>Detailed imaging in selected cases</td></tr><tr><td>Core needle biopsy</td><td>Confirm diagnosis through tissue examination</td></tr><tr><td>ER and PR testing</td><td>Identify hormone receptor status</td></tr><tr><td>HER2 testing</td><td>Determine HER2 status</td></tr><tr><td>Ki-67 testing</td><td>Assess tumour cell proliferation where used</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General description</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive disease, such as DCIS</td></tr><tr><td>Stage I</td><td>Small invasive cancer with limited or no lymph node involvement</td></tr><tr><td>Stage II</td><td>Larger tumour and/or limited nearby lymph node involvement</td></tr><tr><td>Stage III</td><td>More extensive local disease or regional lymph node involvement</td></tr><tr><td>Stage IV</td><td>Cancer has spread to distant organs</td></tr></tbody></table></div>`;

const hospitalTable = `<div class="md-body"><table><thead><tr><th>Hospital capability</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncology</td><td>Expertise in breast cancer operations</td></tr><tr><td>Medical oncology</td><td>Chemotherapy, targeted therapy and systemic treatment</td></tr><tr><td>Radiation oncology</td><td>Access to appropriate radiation techniques</td></tr><tr><td>Breast imaging</td><td>Mammography, ultrasound and MRI</td></tr><tr><td>Histopathology</td><td>Accurate tissue diagnosis and biomarker testing</td></tr><tr><td>Reconstructive surgery</td><td>Breast reconstruction where appropriate</td></tr><tr><td>Multidisciplinary tumour board</td><td>Coordinated treatment planning</td></tr><tr><td>International patient support</td><td>Assistance with travel and treatment coordination</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay</th></tr></thead><tbody><tr><td><a href="${LUMPECTOMY}">Breast-conserving surgery / lumpectomy</a></td><td>$3,500–$8,000</td><td>1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>3–6 nights</td></tr><tr><td><a href="${ONCOPLASTIC}">Oncoplastic breast surgery</a></td><td>$4,500–$11,000</td><td>2–5 nights</td></tr><tr><td><a href="${NSM}">Nipple-sparing mastectomy</a></td><td>$5,500–$12,000</td><td>3–6 nights</td></tr><tr><td><a href="${RECON_COST}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>4–8 nights</td></tr><tr><td><a href="${SLNB}">Sentinel lymph node biopsy</a></td><td>$2,000–$5,500</td><td>1–2 nights</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${EBRT}">External beam radiotherapy</a></td><td>$1,000–$6,000+</td><td>Outpatient course</td></tr><tr><td><a href="${HORMONE_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Long-term treatment</td></tr></tbody></table></div>`;

const cityTable = `<div class="md-body"><table><thead><tr><th>City</th><th>Lumpectomy cost sheet</th><th>Mastectomy planning</th></tr></thead><tbody><tr><td>Delhi NCR</td><td><a href="${DELHI_LUMP}">$3,500–$8,000</a></td><td><a href="${DELHI_MAST}">$4,500–$10,000</a></td></tr><tr><td>Mumbai</td><td><a href="${MUMBAI_LUMP}">$3,500–$8,000</a></td><td><a href="${MUMBAI_MAST}">$4,500–$10,000</a></td></tr><tr><td>Bengaluru</td><td><a href="${BLR_LUMP}">$3,500–$8,000</a></td><td><a href="${BLR_MAST}">$4,500–$10,000</a></td></tr><tr><td>Chennai</td><td><a href="${CHN_LUMP}">$3,500–$8,000</a></td><td>$4,500–$10,000 national band</td></tr><tr><td>Hyderabad</td><td><a href="${HYD_LUMP}">$3,500–$8,000</a></td><td>$4,500–$10,000 national band</td></tr></tbody></table></div>`;

const screenTable = `<div class="md-body"><table><thead><tr><th>Screening</th><th>Diagnostic testing</th></tr></thead><tbody><tr><td>For people without breast symptoms</td><td>For people with symptoms or abnormal findings</td></tr><tr><td>Aims to detect cancer early</td><td>Investigates a specific concern</td></tr><tr><td>Often uses screening mammography</td><td>May involve diagnostic mammography, ultrasound and biopsy</td></tr><tr><td>Follows an age- and risk-based schedule</td><td>Depends on clinical findings</td></tr></tbody></table></div>`;

const faqs = [
  ["What is usually the first sign of breast cancer?", "A new lump or thickening in the breast is a common first sign. Some people first notice nipple, skin or armpit changes. Others have no symptoms and are diagnosed through screening."],
  ["Can breast cancer develop without pain?", "Yes. Many early breast cancers are painless. A painless lump still needs examination."],
  ["Are all breast lumps cancerous?", "No. Many lumps are benign cysts or fibroadenomas. Touch alone cannot tell the difference — imaging and sometimes biopsy are needed."],
  ["Can breast cancer occur before the age of 30?", "Yes, though it is less common. New or persistent breast changes should be assessed at any age — see breast cancer in young women."],
  ["What does an early breast cancer lump feel like?", "It may feel firm, hard or different from surrounding tissue. Some are painless; others are tender. Feel alone is not diagnostic."],
  ["Can breast cancer cause nipple discharge?", "Yes. Unexplained discharge — especially bloody or spontaneous discharge from one nipple — should be evaluated. Non-cancerous causes also exist."],
  ["Does breast cancer always cause a visible lump?", "No. Skin changes, nipple changes, swelling or mammographic findings may appear without a distinct lump."],
  ["What are the signs of inflammatory breast cancer?", "Rapid swelling, redness or darkening, warmth, skin thickening and an orange-peel appearance. A typical lump may be absent. Seek prompt assessment."],
  ["Can men develop breast cancer?", "Yes, though it is uncommon. Warning signs include a lump near the nipple, retraction, discharge and skin changes."],
  ["How is breast cancer confirmed?", "Usually by biopsy after clinical examination and imaging. Receptor testing (ER, PR, HER2) then guides treatment — see the diagnosis guide."],
  ["Can a normal mammogram rule out breast cancer completely?", "No. Mammograms miss some cancers. A new lump or persistent change after a normal mammogram still needs assessment."],
  ["At what age should women start breast cancer screening?", "Recommendations vary by country and personal risk. Discuss an individual schedule with your doctor, especially with family history or inherited risk."],
  ["Is breast cancer treatable?", "Yes. Many forms are treatable, especially before distant spread. Options may include surgery, chemotherapy, radiation, hormone therapy, targeted therapy or immunotherapy."],
  ["Is breast cancer treatment available in India?", "Yes. Specialist centres offer surgery, systemic therapy, radiation and reconstruction. See breast cancer treatment in India and the international-patient guide."],
  ["When should I seek a second opinion for breast cancer?", "Before major surgery or systemic therapy decisions, or when reviewing stage, biomarkers or reconstruction options."],
  ["Does having risk factors mean I will develop breast cancer?", "No. Many people with risk factors never develop cancer, and many patients have no family history. WHO notes most cases occur without specific risk factors beyond sex and age."],
  ["What documents should international patients prepare?", "Pathology and IHC reports, mammography/ultrasound/MRI or PET reports with DICOM where possible, surgery and treatment records, medications and recent blood tests."],
  ["What is the cost of breast cancer surgery in India?", "GAF planning for lumpectomy is $3,500–$8,000 (1–3 nights) and mastectomy $4,500–$10,000 (3–6 nights). Full pathways vary — see the cost guide."],
];

const RELATED = [
  ["Breast Cancer Treatment in India", PILLAR],
  ["Breast Cancer Diagnosis Tests (Biopsy, ER/PR/HER2)", DIAG],
  ["Breast Cancer Stages 0–4 Explained", STAGES],
  ["Breast Cancer Treatment by Stage", BY_STAGE],
  ["Breast Cancer Treatment Cost in India", COST_BLOG],
  ["Breast Cancer Surgery in India", SURGERY],
  ["Chemotherapy for Breast Cancer in India", CHEMO_BLOG],
  ["Radiation Therapy for Breast Cancer", RAD],
  ["Hormone Therapy for Breast Cancer", HORMONE],
  ["HER2-Positive Breast Cancer Treatment", HER2],
  ["ER/PR/HER2 Biomarker Guide", BIOMARKERS],
  ["Breast Reconstruction After Mastectomy", RECON],
  ["Breast Cancer for International Patients", INTL],
  ["Breast Cancer in Young Women", YOUNG],
  ["Pathology Report Explained", PATHOLOGY],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer is one of the most common cancers affecting women worldwide. Recognising warning signs and seeking advice when something changes can make an important difference."),
  p("The first sign is often a new lump. Breast cancer does not always begin with a lump, though — nipple changes, skin dimpling, shape change or armpit swelling can appear first. Some people notice nothing in early stages."),
  p("**A breast lump does not automatically mean cancer.** Cysts and fibroadenomas are common. A new or unusual breast change should still never be ignored."),
  p("This guide covers early symptoms, how doctors investigate them and treatment pathways in India, including [breast cancer treatment in India](" + PILLAR + "). Companion explainers cover [diagnosis tests](" + DIAG + "), [stages](" + STAGES + ") and [treatment cost in India](" + COST_BLOG + ")."),
  p("GAF Healthcare planning for [lumpectomy](" + LUMPECTOMY + ") is **$3,500–$8,000** (typically **1–3 nights**) and for [mastectomy](" + MASTECTOMY + ") is **$4,500–$10,000** (typically **3–6 nights**). Neighbouring [chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**. These are partner planning ranges, not quotations."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") often start with [lumpectomy](" + LUMP_DOCS + ") and [mastectomy](" + MAST_DOCS + ") lists, alongside [medical oncology](" + MED_DOCS + "). Partner hospitals in [Delhi NCR](" + DELHI_HOSP + "), [Mumbai](" + MUMBAI_HOSP + ") and [Bengaluru](" + BLR_HOSP + ") are a typical first filter — see also the [international patients guide](" + INTL + ")."),
  btn("Ask about a breast lump or breast cancer work-up in India", consult("Breast Cancer Symptoms / Diagnosis")),
  p("[WhatsApp +91 90443 46292 with mammogram, ultrasound and biopsy reports](" + wa("I have a breast lump / breast changes. I can share mammogram, ultrasound and biopsy reports for a specialist review in India.") + ")"),
  img("/uploads/articles/breast-cancer-symptoms-signs.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with icon callouts for lump, dimpling, discharge and pain", "A new lump is the best-known warning sign, but skin, nipple and armpit changes also deserve assessment."),

  h2("What Are the Early Symptoms of Breast Cancer?"),
  p("The most common warning sign is a new lump or thickening in the breast or underarm. Other possible symptoms include:"),
  ul([
    "A lump in the breast or armpit",
    "Swelling in part or all of one breast",
    "A change in the size or shape of the breast",
    "Dimpling or puckering of breast skin",
    "Redness, thickening or scaling of the breast skin",
    "A nipple that turns inward or changes position",
    "Unusual nipple discharge, particularly blood-stained discharge",
    "Persistent changes around the nipple or areola",
    "Swelling or a lump near the collarbone",
    "Persistent pain in the breast or nipple area",
  ]),
  p("Not everyone with breast cancer experiences these symptoms. Some cancers are found through screening before any change is noticed."),
  p("**Important:** If you notice a new breast lump or unexplained change, arrange a medical assessment. Do not wait for pain to develop."),

  h2("What Are the 12 Warning Signs of Breast Cancer?"),
  h3("1. A new lump in the breast"),
  p("It may feel hard, firm, distinct, thickened or painless. Some cancerous lumps are irregular; others feel soft, rounded or tender. Texture alone cannot diagnose cancer."),
  h3("2. A lump or swelling in the armpit"),
  p("Breast cancer can involve axillary lymph nodes, causing a lump, firmness or swelling. Nodes can also enlarge from infection."),
  h3("3. Changes in breast size or shape"),
  p("Natural asymmetry is common. New enlargement, contour change or distortion of one breast needs attention."),
  h3("4. Dimpling or puckering of breast skin"),
  p("The skin may look dimpled, puckered, pulled inward or uneven. An orange-peel appearance (*peau d'orange*) should be evaluated."),
  h3("5. Redness or darkening of the breast skin"),
  p("Redness, darkening, bruising-like colour, thickening or persistent inflammation can have many causes. Warmth with rapid enlargement needs prompt review."),
  h3("6. Nipple turning inward"),
  p("New nipple retraction, flattening or directional change matters. Long-standing inverted nipples that have not changed are different."),
  h3("7. Unusual nipple discharge"),
  p("Pay attention to blood-stained, clear/watery, spontaneous, one-sided or persistent discharge, especially with a lump."),
  h3("8. Persistent breast or nipple pain"),
  p("Most breast pain is hormonal or benign. Persistent localised pain — especially with a lump or skin change — should be checked."),
  h3("9. Thickening of breast skin or tissue"),
  p("A firm patch without a clear lump can still be significant."),
  h3("10. Changes around the nipple and areola"),
  p("Persistent scaling, crusting, rash or colour change can occasionally relate to Paget disease of the breast. Do not assume it is only eczema."),
  h3("11. Swelling near the collarbone"),
  p("Enlarged nodes above or below the collarbone need evaluation even though many causes are benign."),
  h3("12. Unexplained swelling of the entire breast"),
  p("Rapid enlargement, heaviness, warmth or redness can occur in **inflammatory breast cancer**, which may lack a distinct lump. Do not wait for a lump if swelling develops quickly."),
  html(compareTable),
  btn("Share imaging for a breast specialist opinion", consult("Breast Cancer Diagnosis")),
  p("[WhatsApp +91 90443 46292 if symptoms are changing quickly](" + wa("I have rapid breast swelling or skin changes and need guidance on urgent assessment and treatment options in India.") + ")"),

  h2("Can You Have Breast Cancer Without a Lump?"),
  p("Yes. Tumours may be too small to feel, or may present as skin, nipple or imaging changes first. DCIS is often found on mammography. Inflammatory breast cancer can cause redness and swelling without a typical mass. A normal-feeling breast does not guarantee the absence of cancer."),

  h2("Does Breast Cancer Cause Pain?"),
  p("Early breast cancer often does not hurt. Many people find a painless lump. Pain can still occur."),
  html(painTable),
  p("Most breast pain is not cancer. Persistent unexplained pain with other changes should not be ignored."),

  h2("Early Breast Cancer Symptoms in Women by Age"),
  html(ageTable),
  p("Age alone cannot decide whether a lump is harmless. Women with strong family history, inherited mutations or prior chest radiation may need earlier, individualised screening — see [breast cancer in young women](" + YOUNG + ")."),

  h2("Breast Cancer Symptoms in Men"),
  p("Male breast cancer is uncommon but real. Warning signs include a lump behind or near the nipple, nipple retraction, blood-stained discharge, redness or scaling, skin changes and underarm swelling. Any new breast or nipple lump in a man should be assessed."),

  h2("What Does a Breast Cancer Lump Feel Like?"),
  p("There is no single feel. Cancerous lumps may be hard, firm, irregular, fixed or painless — or soft, rounded, tender or painful. Benign lumps can feel hard too."),
  p("**You cannot reliably distinguish cancerous from non-cancerous lumps by touch alone.**"),
  html(lumpTable),

  h2("What Causes Breast Cancer?"),
  p("Breast cancer develops when abnormal breast cells grow uncontrollably, often starting in ducts or lobules. There is no single cause."),
  ul([
    "**Increasing age** — risk generally rises with age",
    "**Family history** — especially multiple relatives or younger diagnoses",
    "**Inherited mutations** — including BRCA1 and BRCA2",
    "**Hormonal factors** — early menstruation, late menopause, some postmenopausal hormone therapy",
    "**Previous breast cancer** or prior chest radiation",
    "**Lifestyle factors** — alcohol, inactivity, excess weight after menopause, smoking",
  ]),
  p("Many people with risk factors never develop breast cancer, and many patients have no family history. WHO notes that about 80% of breast cancers occur in women without specific risk factors other than sex and age."),

  h2("How Is Breast Cancer Diagnosed?"),
  ol([
    "**Clinical breast examination** — lumps, symmetry, skin, nipple, armpit and collarbone nodes",
    "**Mammography** — masses, microcalcifications and patterns that may not be felt",
    "**Breast ultrasound** — cysts versus solid masses; guidance for biopsy",
    "**Breast MRI** — selected high-risk, extent or unclear imaging cases",
    "**Biopsy** — core needle, fine needle aspiration or surgical biopsy to confirm diagnosis",
    "**Receptor and biomarker testing** — ER, PR, HER2 and sometimes Ki-67",
  ]),
  img("/uploads/articles/breast-cancer-symptoms-diagnosis.webp", "Canva-style unlabeled illustration of a patient beside a breast imaging diagram with mammogram, ultrasound, biopsy and lab icons", "Diagnosis usually combines examination, imaging and tissue biopsy with biomarker testing."),
  p("Full pathways are explained in [breast cancer diagnosis tests](" + DIAG + "), [pathology report explained](" + PATHOLOGY + ") and [ER/PR/HER2 treatment](" + BIOMARKERS + ")."),
  html(testsTable),
  btn("Ask how to organise biopsy and IHC review in India", consult("Breast Cancer Diagnosis / IHC Review")),

  h2("What Are the Different Types of Breast Cancer?"),
  ul([
    "**DCIS** — abnormal cells inside ducts without invasion; often found on mammography",
    "**Invasive ductal carcinoma (IDC)** — most common invasive type",
    "**Invasive lobular carcinoma (ILC)** — starts in lobules; can be harder to feel or see",
    "**Triple-negative** — ER/PR/HER2 negative; chemotherapy (± immunotherapy) may be central",
    "**HER2-positive** — may grow faster but has targeted options — see [HER2-positive treatment](" + HER2 + ")",
    "**Inflammatory breast cancer** — rapid swelling, redness, peau d'orange; lump may be absent",
  ]),
  img("/uploads/articles/breast-cancer-symptoms-inflammatory.webp", "Canva-style unlabeled illustration highlighting inflammatory breast changes with swelling, peau d'orange and urgency icons", "Inflammatory breast cancer can progress quickly without a typical lump."),

  h2("What Are the Stages of Breast Cancer?"),
  p("Staging uses the TNM system (tumour, nodes, metastasis). Broad groups:"),
  html(stageTable),
  p("Details and treatment by stage: [stages explainer](" + STAGES + ") and [treatment by stage](" + BY_STAGE + ")."),

  h2("What Happens If Breast Cancer Is Diagnosed?"),
  p("A multidisciplinary team plans care. Options may include breast-conserving surgery, mastectomy, sentinel node biopsy, [chemotherapy](" + CHEMO_TX + ") ([neoadjuvant](" + NEO + ") or [adjuvant](" + ADJ + ")), radiation, hormone therapy, targeted therapy and immunotherapy."),
  p("Surgery pathways: [breast cancer surgery in India](" + SURGERY + "). Reconstruction: [breast reconstruction](" + RECON + ") and [reconstruction treatment](" + RECON_TX + "). Systemic and radiation companions: [chemotherapy for breast cancer](" + CHEMO_BLOG + "), [radiation therapy](" + RAD + "), [hormone therapy](" + HORMONE + ")."),
  p("Not every patient needs every modality."),

  h2("Breast Cancer Treatment Cost in India"),
  p("Costs depend on stage, biology, surgery, medicines, radiation, reconstruction, hospital and city. Full context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  html(costTable),
  html(cityTable),
  p("Targeted therapy and immunotherapy sheets ([targeted therapy](" + TARGETED + "), [immunotherapy](" + IMMUNO + ")) are case-specific and should not be added blindly into a total."),
  btn("Request an itemised breast cancer estimate", consult("Breast Cancer Treatment Cost")),
  p("[WhatsApp +91 90443 46292 with stage and IHC summary](" + wa("Please help estimate breast cancer treatment in India. I can share stage, ER/PR/HER2 and preferred city.") + ")"),

  h2("Breast Cancer Treatment in India for International Patients"),
  html(hospitalTable),
  p("GAF Healthcare can help identify suitable hospitals, share records, arrange opinions and estimates, coordinate appointments and support medical travel — see [international patients](" + INTL + ")."),
  ul([
    "Biopsy, histopathology and IHC reports",
    "Mammography, ultrasound, MRI or PET-CT with DICOM where available",
    "Previous surgery and systemic therapy records",
    "Current medications and recent blood tests",
  ]),
  p("Do not delay urgent local assessment simply to arrange international travel."),

  h2("Can Breast Cancer Be Prevented?"),
  ul([
    "Maintain a healthy weight and exercise regularly",
    "Limit or avoid alcohol; avoid smoking",
    "Eat a balanced diet",
    "Discuss hormone therapy risks with your doctor",
    "Understand family history; consider genetic counselling when indicated",
    "Follow an appropriate screening plan",
  ]),
  p("Healthy habits reduce risk but do not eliminate it."),

  h2("Breast Cancer Screening and Breast Awareness"),
  html(screenTable),
  p("If you have a new lump or suspicious symptom, do not wait for the next routine screen — seek diagnostic evaluation."),
  p("Breast awareness means knowing what is normal for you: new lumps, shape change, dimpling, nipple retraction, discharge, redness, swelling or armpit change."),
  img("/uploads/articles/breast-cancer-symptoms-when-to-see.webp", "Canva-style unlabeled illustration of a patient with breast-change icons for timely medical review", "New or unexplained breast changes should be assessed even when painless."),

  h2("When Should You See a Doctor?"),
  ul([
    "A new lump in the breast or armpit",
    "Unexplained change in breast size or shape",
    "Nipple discharge, especially blood-stained",
    "A newly inverted nipple",
    "Persistent skin dimpling",
    "A nipple rash or scaling that does not improve",
    "Unexplained swelling or thickening",
    "A persistent localised breast change",
  ]),
  p("Seek prompt care for rapid swelling, significant redness or warmth. These signs do not always mean cancer, but they need assessment. Sudden severe symptoms, fever with a red swollen breast, or collapse belong in a **local emergency department**."),
  btn("Start a breast cancer consultation request", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 to coordinate next steps](" + wa("I need help coordinating a breast cancer consultation or second opinion in India.") + ")"),

  h2("Frequently Asked Questions About Breast Cancer Symptoms"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "A new lump is the most common warning sign, but skin, nipple and node changes also matter.",
    "Most lumps are not cancer — yet new changes need proper assessment.",
    "Breast cancer can occur without a lump or without pain.",
    "Diagnosis relies on examination, imaging and biopsy with biomarker testing.",
    "GAF lumpectomy planning is $3,500–$8,000; mastectomy $4,500–$10,000.",
    "International patients should organise pathology and DICOM imaging before travel.",
  ]),

  h2("Top Medical Sources and References"),
  ol([
    "[WHO — Breast cancer fact sheet](https://www.who.int/news-room/fact-sheets/detail/breast-cancer)",
    "[NCI — Breast cancer signs and symptoms](https://www.cancer.gov/types/breast/symptoms)",
    "[American Cancer Society — Signs and symptoms of breast cancer](https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/breast-cancer-signs-and-symptoms.html)",
    "[CDC — Symptoms of breast cancer](https://www.cdc.gov/breast-cancer/symptoms/)",
    "[NHS — Symptoms of breast cancer in women](https://www.nhs.uk/conditions/breast-cancer-in-women/symptoms-of-breast-cancer-in-women/)",
    "[ICMR-NICPR — Breast cancer](https://cancerindia.org.in/breast-cancer/)",
    "[GAF Healthcare — Breast cancer treatment cost in India](" + COST_BLOG + ")",
  ]),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Explore Breast Cancer Care in India"),
  p("Recognising a breast change is the first step. Confirmed diagnosis, staging and biology then guide surgery, medicines and radiation."),
  p("GAF Healthcare assists international patients exploring breast cancer care in India by coordinating records, consultations and estimates. Website: [https://gaf.healthcare/](https://gaf.healthcare/)."),
  btn("Contact GAF Healthcare about breast cancer treatment", consult("Breast Cancer Treatment in India")),

  h2("Medical Disclaimer"),
  p("This article is for general educational purposes and does not replace consultation, diagnosis or treatment advice from a qualified professional. Breast symptoms require individual assessment. Cost figures are indicative planning ranges. Emergency symptoms belong in a local emergency department."),
];

const now = "2026-11-11T13:40:00.000Z";
const SLUG = "breast-cancer-symptoms";

const article = {
  id: "art_breast_cancer_symptoms",
  slug: SLUG,
  title: "Breast Cancer Symptoms: Early Warning Signs, Causes, Diagnosis and When to See a Doctor",
  excerpt:
    "Breast cancer does not always cause pain or noticeable symptoms in its early stages. A new breast lump, nipple discharge, skin dimpling, changes in breast shape or swelling under the arm can be warning signs. Learn what to look for, how breast cancer is diagnosed and when to seek medical attention.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "breast cancer",
    "breast cancer symptoms",
    "breast lump",
    "early warning signs",
    "breast cancer diagnosis",
    "India",
  ],
  image: "/uploads/articles/breast-cancer-symptoms-signs.webp",
  imageAlt:
    "Canva-style unlabeled illustration of a patient beside a breast diagram with icon callouts for lump, dimpling, discharge and pain",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Symptoms: 12 Early Warning Signs You Should Know",
  seoDescription:
    "Learn the early symptoms of breast cancer, including breast lumps, nipple changes, skin dimpling and swelling. Understand diagnosis, risk factors and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-symptoms-signs.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer symptoms",
    "Early signs of breast cancer",
    "Early symptoms of breast cancer in women",
    "Breast cancer warning signs",
    "Breast lump symptoms",
    "Signs of breast cancer in women",
    "Breast cancer symptoms in men",
    "Breast cancer diagnosis",
    "Breast cancer treatment in India",
    "When to see a doctor for a breast lump",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["breast-cancer-symptoms-signs.webp", article.imageAlt],
  ["breast-cancer-symptoms-diagnosis.webp", "Canva-style unlabeled illustration of a patient beside a breast imaging diagram with mammogram, ultrasound, biopsy and lab icons"],
  ["breast-cancer-symptoms-inflammatory.webp", "Canva-style unlabeled illustration highlighting inflammatory breast changes with swelling, peau d'orange and urgency icons"],
  ["breast-cancer-symptoms-when-to-see.webp", "Canva-style unlabeled illustration of a patient with breast-change icons for timely medical review"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  if (llms.includes("breast-cancer-treatment-in-india")) {
    llms = llms.replace(
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india)",
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india), [breast cancer symptoms](https://gaf.healthcare/blogs/breast-cancer-symptoms)",
    );
  } else {
    llms = llms.replace(
      /(- \[Blogs\]\(https:\/\/gaf\.healthcare\/blogs\):[^\n]+)/,
      `$1, [breast cancer symptoms](https://gaf.healthcare/blogs/breast-cancer-symptoms)`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function linkFromRelated(slug, label) {
  const post = store.articles.find((row) => row.slug === slug);
  if (!post) return false;
  const href = `/blogs/${SLUG}`;
  post.relatedLinks = post.relatedLinks || [];
  if (!post.relatedLinks.some((row) => row.href === href)) {
    post.relatedLinks.push({ label, href });
  }
  for (let i = 0; i < post.blocks.length; i++) {
    if (post.blocks[i].type === "heading" && /Related Reading/i.test(post.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, post.blocks.length); j++) {
        if (post.blocks[j].type === "list" && !post.blocks[j].items.some((item) => item.includes(href))) {
          post.blocks[j].items.push(`[${label}](${href})`);
        }
      }
      break;
    }
  }
  return true;
}

for (const slug of [
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-cancer-stages-0-1-2-3-4",
  "breast-cancer-surgery-in-india",
  "breast-cancer-treatment-india-international-patients",
]) {
  if (linkFromRelated(slug, "Breast Cancer Symptoms")) console.log("linked from", slug);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
