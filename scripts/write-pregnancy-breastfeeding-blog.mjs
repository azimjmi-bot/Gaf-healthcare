#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-during-pregnancy-breastfeeding-treatment-india";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/breast-cancer-chemotherapy-in-india";
const CHEMO_ALT = "/blogs/chemotherapy-for-breast-cancer-in-india";
const RAD_BLOG = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const TNBC = "/blogs/triple-negative-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const DIAG_ALT = "/blogs/breast-cancer-diagnosis";
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const STAGES = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PREG_EXISTING = "/blogs/breast-cancer-during-pregnancy-treatment-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON_BLOG = "/blogs/breast-reconstruction-after-mastectomy-india";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";
const BLR = "/doctors/India/Bengaluru/Medical-Oncology";
const CHN = "/doctors/India/Chennai/Medical-Oncology";
const HYD = "/doctors/India/Hyderabad/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can breast cancer develop in pregnancy?</strong></td><td>Yes — also during lactation or the first year after delivery (pregnancy-associated breast cancer).</td></tr><tr><td><strong>First imaging test</strong></td><td>Breast ultrasound — no ionising radiation; mammography/biopsy when clinically needed</td></tr><tr><td><strong>Surgery</strong></td><td>Can be performed during pregnancy when indicated — <a href="${SURGERY}">surgery guide</a></td></tr><tr><td><strong>Chemotherapy</strong></td><td>Selected regimens may be considered after the first trimester — <a href="${CHEMO_BLOG}">chemo guide</a></td></tr><tr><td><strong>Usually postponed</strong></td><td>Radiation, hormone therapy, HER2-targeted drugs and immunotherapy until after delivery</td></tr><tr><td><strong>Breastfeeding on chemo</strong></td><td>Generally not safe — many medicines pass into breast milk</td></tr><tr><td><strong>Terminate pregnancy?</strong></td><td>Not automatically — many patients receive selected treatment while continuing pregnancy</td></tr><tr><td><strong>India planning ranges</strong></td><td><a href="${CHEMO}">Chemo</a> $1,500–$8,000+ · <a href="${LUMPECTOMY}">lumpectomy</a> $3,500–$8,000 · <a href="${MASTECTOMY}">mastectomy</a> $4,500–$10,000</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer during pregnancy or breastfeeding</strong> needs coordinated oncology and obstetric care. Pregnancy or lactation should not delay evaluation of a suspicious lump. GAF figures are partner planning ranges, not hospital quotations.</p></aside>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Warning sign</th><th>What to look for</th></tr></thead><tbody><tr><td>Persistent breast lump</td><td>A lump that does not disappear or continues to grow</td></tr><tr><td>Unusual swelling</td><td>One breast becomes noticeably larger or changes shape</td></tr><tr><td>Skin dimpling</td><td>Skin appears pulled inward</td></tr><tr><td>Nipple inversion</td><td>A nipple newly turns inward</td></tr><tr><td>Bloody nipple discharge</td><td>Spontaneous discharge, particularly from one breast</td></tr><tr><td>Underarm lump</td><td>A new swelling in the armpit</td></tr><tr><td>Persistent redness</td><td>Redness that does not improve as expected</td></tr><tr><td>Skin thickening</td><td>Unusual orange-peel appearance</td></tr><tr><td>Non-healing changes</td><td>Persistent abnormal area despite appropriate treatment</td></tr></tbody></table></div>`;

const imagingTable = `<div class="md-body"><table><thead><tr><th>Imaging test</th><th>General role during pregnancy</th></tr></thead><tbody><tr><td>Breast ultrasound</td><td>Common first-line investigation; no ionising radiation</td></tr><tr><td>Mammography</td><td>Can be used when clinically necessary</td></tr><tr><td>MRI without gadolinium</td><td>May be considered in selected cases</td></tr><tr><td>MRI with gadolinium</td><td>Generally avoided unless essential</td></tr><tr><td>CT scan</td><td>Only when clinically justified after risk-benefit assessment</td></tr><tr><td>PET-CT</td><td>Generally avoided unless exceptional circumstances</td></tr></tbody></table></div>`;

const treatTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>General approach during pregnancy</th></tr></thead><tbody><tr><td>Surgery</td><td>Can be performed when clinically indicated</td></tr><tr><td>Chemotherapy</td><td>Certain regimens may be considered after the first trimester</td></tr><tr><td>Radiation therapy</td><td>Generally postponed until after delivery</td></tr><tr><td>Hormone therapy</td><td>Postponed until after delivery</td></tr><tr><td>HER2-targeted therapy</td><td>Generally avoided during pregnancy</td></tr><tr><td>Immunotherapy</td><td>Generally avoided during pregnancy</td></tr><tr><td>Antibody-drug conjugates</td><td>Generally avoided during pregnancy</td></tr></tbody></table></div>`;

const fertilityTable = `<div class="md-body"><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>Egg freezing</td><td>Mature eggs are collected and frozen</td></tr><tr><td>Embryo freezing</td><td>Eggs are fertilised and resulting embryos are frozen</td></tr><tr><td>Ovarian tissue freezing</td><td>Ovarian tissue is removed and stored for possible future use</td></tr><tr><td>Ovarian suppression</td><td>GnRH agonists during chemotherapy as an added protective measure</td></tr></tbody></table></div>`;

const hospitalTable = `<div class="md-body"><table><thead><tr><th>Specialist or facility</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncologist</td><td>Surgery and local treatment planning</td></tr><tr><td>Medical oncologist</td><td>Chemotherapy and systemic treatment</td></tr><tr><td>Obstetrician / maternal-fetal medicine</td><td>Pregnancy care, monitoring and delivery planning</td></tr><tr><td>Breast radiologist / pathologist</td><td>Pregnancy-appropriate imaging and biomarkers</td></tr><tr><td>Radiation oncologist</td><td>Planning treatment after delivery when indicated</td></tr><tr><td>Neonatologist</td><td>Newborn assessment and care</td></tr><tr><td>Fertility specialist</td><td>Future reproductive planning</td></tr><tr><td>Psycho-oncology support</td><td>Emotional and psychological care</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical notes</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Selected regimens after first trimester when indicated</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Before surgery when planned</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>After surgery · timing individualised</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>Radiation usually after delivery</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${RECON}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>Often deferred until after pregnancy/treatment</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Generally after delivery</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Postponed until after delivery</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>HER2 / other drugs generally after delivery</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Generally avoided during pregnancy</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Genomic / testing pathway planning</td></tr></tbody></table></div>`;

const faqs = [
  ["Can breast cancer develop during pregnancy?", "Yes. Breast cancer can develop during pregnancy. A suspicious lump should be assessed promptly rather than being attributed automatically to hormonal changes."],
  ["Can breast cancer develop while breastfeeding?", "Yes. Breast cancer can develop during lactation. A persistent lump, bloody discharge or unusual skin change requires medical evaluation."],
  ["Is ultrasound safe during pregnancy?", "Yes. Breast ultrasound does not use ionising radiation and is commonly the first imaging investigation for a pregnant woman with a breast lump."],
  ["Can mammography be performed during pregnancy?", "Yes, when clinically necessary. The radiologist and treating team should assess the expected benefit and use appropriate imaging protocols."],
  ["Is a breast biopsy safe during pregnancy?", "A core needle biopsy can be performed during pregnancy when required. It is an important method of confirming the diagnosis."],
  ["Can chemotherapy be given during pregnancy?", "Certain chemotherapy medicines may be considered after the first trimester. Chemotherapy is generally avoided during the first trimester and stopped sufficiently before delivery."],
  ["Can a pregnant woman undergo breast cancer surgery?", "Yes. Surgery can be performed during pregnancy when clinically indicated, with appropriate anaesthetic and obstetric planning."],
  ["Can radiation therapy be given during pregnancy?", "Breast radiation therapy is generally postponed until after delivery because of potential risks to the developing baby."],
  ["Can trastuzumab be given during pregnancy?", "Trastuzumab is generally contraindicated during pregnancy because of potential fetal complications, including reduced amniotic fluid."],
  ["Can a woman continue breastfeeding during chemotherapy?", "Generally, no. Many chemotherapy medicines can pass into breast milk and may harm the baby. Discuss the specific medicine and schedule with the oncologist."],
  ["Can a woman breastfeed after mastectomy?", "The removed breast cannot produce milk. Breastfeeding from the unaffected breast may be possible if medicines and other medical factors allow it."],
  ["Can a woman breastfeed after lumpectomy?", "Some women can breastfeed after lumpectomy, although radiation may reduce milk production in the treated breast."],
  ["Does a breast biopsy mean breastfeeding must stop?", "Not necessarily. Breastfeeding can often continue after a core needle biopsy, subject to the doctor's advice and the patient's recovery."],
  ["Does breast cancer during pregnancy mean the baby will develop cancer?", "No. Breast cancer in the mother does not mean the baby will develop breast cancer. The main concern is the potential effect of certain treatments on fetal development."],
  ["Does a woman have to terminate her pregnancy after a breast cancer diagnosis?", "No. Pregnancy termination is not automatically required. Many patients can receive selected treatments during pregnancy. The decision must be individualised with oncology and obstetric teams."],
  ["Can a woman become pregnant after breast cancer treatment?", "Yes. Pregnancy may be possible after treatment. Timing depends on subtype, treatment history, recurrence risk and reproductive health."],
  ["Is breast cancer during pregnancy curable?", "Some patients with early-stage disease can be treated with the intention of cure. Outcome depends on stage, tumour biology and the ability to deliver appropriate treatment."],
  ["Is treatment available in India for international patients?", "Yes. India may offer diagnosis, surgery, chemotherapy and coordinated obstetric care. Select the hospital based on the patient's medical requirements."],
];

const RELATED = [
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer during pregnancy (related guide)", PREG_EXISTING],
  ["Breast cancer in young women", YOUNG],
  ["Breast cancer symptoms", SYMPTOMS],
  ["Breast cancer diagnosis", DIAG_ALT],
  ["Breast cancer diagnosis tests (ER/PR/HER2)", DIAG],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer surgery in India", SURGERY],
  ["Lumpectomy vs mastectomy", LUMP],
  ["Breast reconstruction after mastectomy", RECON_BLOG],
  ["Chemotherapy for breast cancer", CHEMO_ALT],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Radiation therapy for breast cancer", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer", HER2],
  ["Triple-negative breast cancer", TNBC],
  ["ER/PR/HER2 results explained", ERPR],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const IMG1 = "/uploads/articles/pregnancy-breast-cancer-overview.webp";
const IMG2 = "/uploads/articles/pregnancy-breast-cancer-ultrasound.webp";
const IMG3 = "/uploads/articles/pregnancy-breast-cancer-treatment-timing.webp";
const IMG4 = "/uploads/articles/pregnancy-breast-cancer-breastfeeding-care.webp";

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer can develop during pregnancy or while a woman is breastfeeding. Breast enlargement, tenderness and milk-related changes can make a suspicious lump harder to recognise, but diagnosis and treatment should not be delayed. This guide explains warning signs, diagnostic tests, treatment options, pregnancy-related precautions, breastfeeding considerations and specialist care available for [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [symptoms](" + SYMPTOMS + "), [diagnosis](" + DIAG_ALT + "), [young women and fertility](" + YOUNG + "), [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO_BLOG + "), [HER2-positive disease](" + HER2 + "), [triple-negative disease](" + TNBC + ") and [treatment cost](" + COST_BLOG + ")."),
  btn("Ask GAF to review pregnancy breast cancer records", consult("Breast Cancer During Pregnancy")),
  p("[WhatsApp +91 90443 46292 with oncology and antenatal reports](" + wa("Please review my breast cancer reports during pregnancy/breastfeeding and advise on treatment options in India.") + ")"),
  img(IMG1, "Pregnant woman in clinic consultation beside a circular breast anatomy diagram suggesting pregnancy-associated breast cancer evaluation", "Pregnancy or breastfeeding should not delay assessment of a suspicious breast lump."),

  h2("Can breast cancer develop during pregnancy or breastfeeding?"),
  p("Yes. Breast cancer can develop during pregnancy, shortly after childbirth or while breastfeeding. This is often discussed as **pregnancy-associated breast cancer (PABC)** — commonly including diagnosis during pregnancy, within the first year after delivery or during lactation (definitions vary between studies)."),
  p("It is uncommon but important because pregnancy and breastfeeding naturally change the breasts — enlargement, tenderness, milk-filled ducts, lumps, nipple changes and inflammation are frequent. Most of these changes are not cancer. A persistent or suspicious lump, however, should never be ignored."),
  p("**Most important message:** Pregnancy or breastfeeding should not be a reason to postpone evaluation of a suspicious breast lump."),

  h2("Why can breast cancer be difficult to detect during pregnancy?"),
  p("Hormonal changes prepare the breasts for breastfeeding. Oestrogen, progesterone and other hormones stimulate growth, so breasts may become larger, heavier, more sensitive and denser — making abnormalities harder to recognise."),
  p("A woman may assume a lump is milk accumulation, a blocked duct, engorgement, mastitis, a fibroadenoma or normal hormonal change. Those explanations may be correct, but they should not be assumed without assessment when a lump persists or looks suspicious."),
  h3("Why diagnosis may be delayed"),
  ul([
    "Belief that breast lumps are normal in pregnancy",
    "Tenderness attributed only to hormones",
    "Initial treatment as a breastfeeding-related problem",
    "Avoiding imaging due to radiation concerns",
    "Delaying biopsy due to breastfeeding fears",
    "Advice to wait until after delivery",
  ]),
  p("Delaying diagnosis can allow cancer to progress. Doctors can select appropriate investigations while considering pregnancy and fetal safety."),

  h2("Symptoms of breast cancer during pregnancy and breastfeeding"),
  p("Symptoms are broadly similar to breast cancer outside pregnancy, but pregnancy and lactation can make some changes less obvious. Overview: [breast cancer symptoms](" + SYMPTOMS + ")."),
  { id: id("html"), type: "html", html: symptomTable },
  h3("Is a breast lump during breastfeeding usually cancer?"),
  p("No. Common benign causes include galactoceles, plugged ducts, mastitis, abscesses, fibroadenomas and other benign changes. A lump that persists, enlarges or does not respond to appropriate treatment needs medical evaluation."),
  h3("Can breast cancer look like mastitis?"),
  p("Yes. Inflammatory breast cancer and some other presentations can cause redness, swelling, warmth and skin thickening that resemble infection. If symptoms do not improve as expected with appropriate treatment, the patient should be reassessed."),

  h2("What is pregnancy-associated breast cancer?"),
  p("PABC is breast cancer diagnosed during pregnancy or in the period around childbirth and breastfeeding. It is not one biological subtype — patients may have hormone receptor-positive, [HER2-positive](" + HER2 + "), [triple-negative](" + TNBC + ") or other invasive subtypes. Biology determines which treatments may help — see [ER/PR/HER2 explained](" + ERPR + ")."),
  p("Pregnancy itself should not be described as a direct cause of breast cancer. Hormonal and reproductive factors influence lifetime risk, but an individual diagnosis cannot usually be attributed to one pregnancy or breastfeeding experience."),
  p("Some PABC cases are diagnosed later because normal breast changes delay recognition. Outlook depends on stage, size, nodes, ER/PR/HER2, grade, treatment response and access to care — not pregnancy alone."),

  h2("How is breast cancer diagnosed during pregnancy?"),
  p("A pregnant woman with a suspicious lump should undergo appropriate diagnostic assessment selected by symptoms, age, pregnancy stage and clinical findings. Detail: [diagnosis guide](" + DIAG + ")."),
  ol([
    "**Clinical breast examination** — both breasts, nipple/skin, underarm nodes, lump duration/growth, pain/redness, prior breast disease, family history, gestational age",
    "**Breast ultrasound** — usual first imaging test; no ionising radiation; helps distinguish solid vs fluid lesions and guide biopsy",
    "**Mammography when indicated** — can be performed when clinically necessary; do not refuse a medically needed test solely because of pregnancy",
    "**Breast MRI** — contrast-enhanced MRI with gadolinium is generally avoided unless compelling clinical reason",
    "**Core needle biopsy** — confirms cancer; can be done in pregnancy/lactation; discuss bleeding, infection and milk-leakage/fistula risk in lactation",
    "**Pathology and biomarkers** — type, grade, ER, PR, HER2 and other markers that guide treatment",
  ]),
  img(IMG2, "Pregnant woman undergoing breast ultrasound beside a circular diagram of ultrasound assessment of breast tissue", "Ultrasound is generally the first imaging investigation for a pregnant woman with a breast lump."),
  btn("Request a second opinion on pregnancy breast imaging and biopsy", consult("Breast Cancer Pregnancy Diagnosis")),

  h2("Is breast imaging safe during pregnancy?"),
  p("Select the investigation that provides necessary information while minimising avoidable exposure. A necessary test should not automatically wait until after delivery if delay could harm staging or diagnosis."),
  { id: id("html"), type: "html", html: imagingTable },

  h2("Is a breast biopsy safe during pregnancy and breastfeeding?"),
  p("Yes, when medically necessary. Core needle biopsy provides tissue for diagnosis and biomarkers. It is a local procedure and does not directly expose the baby to radiation. During lactation there is a small risk of bleeding, infection, milk leakage or milk fistula — not a reason to avoid a necessary biopsy."),

  h2("How is breast cancer staged during pregnancy?"),
  p("Staging assesses tumour size, nearby nodes and distant spread. Pregnancy influences imaging choices — ultrasound and MRI without contrast are often considered when suitable; other tests when clinically necessary. Accurate staging still matters because it drives treatment. Context: [breast cancer stages](" + STAGES + ")."),

  h2("How is breast cancer treated during pregnancy?"),
  p("Breast cancer can be treated during pregnancy. The plan must consider maternal health and the developing baby, based on stage, subtype, trimester, desire to continue pregnancy, urgency and available options. Multidisciplinary care is essential — breast surgery, medical and radiation oncology, obstetrics/maternal-fetal medicine, radiology, pathology, neonatology and fertility when appropriate."),
  { id: id("html"), type: "html", html: treatTable },
  p("These are general principles — not a prescription. Broader options: [treatment options](" + OPTIONS + ") and [treatment in India](" + TX_BREAST + ")."),
  img(IMG3, "Pregnant woman discussing multidisciplinary treatment timing beside a circular conceptual diagram of surgery and chemotherapy planning in pregnancy", "Surgery and selected chemotherapy may be possible in pregnancy; radiation and many targeted medicines are usually deferred."),

  h2("Breast cancer surgery during pregnancy"),
  p("Surgery is important for many pregnant patients. Choice depends on tumour size, extent, pregnancy stage and whether radiation will be needed. Guide: [breast cancer surgery in India](" + SURGERY + "); comparison: [lumpectomy vs mastectomy](" + LUMP + ")."),
  ul([
    "**Breast-conserving surgery** — removes tumour with a margin; radiation is usually required afterwards and is ordinarily given after delivery, so timing must be planned carefully",
    "**Mastectomy** — may be preferred when conservation is unsuitable or radiation cannot be scheduled safely within the needed timeline",
    "**Sentinel node biopsy** — may be considered in selected patients; tracer choice needs specialist planning in pregnancy",
    "**Reconstruction** — often secondary when cancer treatment is urgent; many patients discuss reconstruction after delivery",
  ]),
  p("GAF planning: [lumpectomy](" + LUMPECTOMY + ") **$3,500–$8,000**; [mastectomy](" + MASTECTOMY + ") **$4,500–$10,000**; [sentinel node biopsy](" + SLNB + ") as indicated; [reconstruction](" + RECON + ") **$6,000–$18,000** (often deferred)."),

  h2("Chemotherapy during pregnancy: when is it possible?"),
  p("Chemotherapy is important for several subtypes, but timing matters. Detail: [chemotherapy for breast cancer](" + CHEMO_ALT + ") and [chemotherapy in India](" + CHEMO_BLOG + ")."),
  ul([
    "**First trimester** — generally avoided due to miscarriage and congenital abnormality risk; urgent need requires oncology–obstetric discussion",
    "**Second trimester** — selected anthracycline-based regimens (e.g. doxorubicin with cyclophosphamide) and selected taxanes may be considered under specialist supervision",
    "**Third trimester** — some chemotherapy may still be possible; stop sufficiently before delivery to allow blood-count recovery",
  ]),
  p("Possible fetal concerns include premature birth, low birth weight, growth restriction, temporary fetal blood-count effects and delivery too soon after chemotherapy. Obstetric teams often add growth assessments and monitoring. **Never start chemotherapy from a general online list.**"),
  p("GAF [chemotherapy](" + CHEMO + ") planning is **$1,500–$8,000+**; neoadjuvant/adjuvant sheets **$2,500–$10,000** each."),
  p("[WhatsApp GAF to coordinate oncology and obstetric timing before travel](" + wa("I need help coordinating breast cancer treatment timing during pregnancy with specialists in India.") + ")"),

  h2("Which treatments are generally avoided during pregnancy?"),
  ul([
    "**Hormone therapy** — tamoxifen, letrozole, anastrozole, exemestane generally postponed until after delivery ([hormone therapy guide](" + HT_BLOG + "))",
    "**HER2-targeted therapy** — trastuzumab, pertuzumab, lapatinib, neratinib, T-DM1, trastuzumab deruxtecan generally avoided; trastuzumab linked to reduced amniotic fluid ([HER2 guide](" + HER2 + "))",
    "**Immunotherapy** — checkpoint inhibitors such as pembrolizumab generally avoided",
    "**PARP inhibitors and many targeted medicines** — generally not used in pregnancy ([targeted therapy guide](" + TARGETED_BLOG + "))",
  ]),
  p("A treatment that works outside pregnancy may not be appropriate during pregnancy. Timing must be planned carefully."),

  h2("Can treatment be delayed until after delivery?"),
  p("Sometimes selected treatments can wait — but not for every patient. The decision depends on stage, biology, progression rate, gestational age, whether surgery or pregnancy-compatible chemotherapy can start now, and expected time to delivery. Delaying necessary treatment without specialist advice can be dangerous."),

  h2("Does a woman need to terminate her pregnancy after diagnosis?"),
  p("Not automatically. Many patients can receive appropriately selected treatment during pregnancy. Decisions depend on stage, subtype, urgency, gestational age and the patient's values. In some aggressive situations requiring treatment that cannot safely be given in pregnancy, difficult discussions may be needed with oncology, obstetrics, maternal-fetal medicine and counselling support — without pressure or judgement."),
  btn("Discuss pregnancy-compatible treatment pathways with GAF", consult("Pregnancy Associated Breast Cancer Treatment")),

  h2("Can breast cancer be treated while breastfeeding?"),
  p("Yes — diagnostic evaluation and certain procedures can proceed during lactation. Once cancer treatment begins, breastfeeding may need to stop or pause depending on medicines and procedures."),
  ul([
    "**Mammography** — possible when indicated; feeding or expressing milk beforehand may improve image quality",
    "**MRI** — may be used when indicated; for many gadolinium agents, interruption of breastfeeding is not routinely required — confirm with the radiologist",
    "**Biopsy** — core needle biopsy can be performed; discuss milk-leakage risk",
    "**Surgery** — possible when indicated; temporary breastfeeding changes may be needed",
  ]),
  img(IMG4, "Woman in postpartum clinic counselling beside a circular diagram of lactating breast tissue and medicine-safety considerations", "Breastfeeding decisions during cancer treatment depend on the specific medicines and procedures involved."),

  h2("Can a woman continue breastfeeding during chemotherapy?"),
  p("Generally, no. Many chemotherapy medicines pass into breast milk and may harm the baby. Even if only one breast has cancer, systemic medicines can reach both breasts. Milk expressed during unsafe systemic treatment should not be assumed safe for later use. Oncology advice is required for pumping, discarding milk and whether maintaining supply is practical."),

  h2("Can a woman breastfeed after breast cancer treatment?"),
  ul([
    "**After mastectomy** — the removed breast cannot produce milk; the other breast may still allow breastfeeding if medically appropriate",
    "**After lumpectomy** — some women can breastfeed; milk volume may be reduced, especially after radiation",
    "**After radiation** — treated breast may produce less or no milk; unaffected breast may still support feeding",
    "**During hormone therapy** — tamoxifen and aromatase inhibitors are generally incompatible with breastfeeding",
  ]),

  h2("Can a woman become pregnant after breast cancer treatment?"),
  p("Yes. Timing and safety depend on subtype, treatment history and recurrence risk. Some patients need years of hormone therapy before attempting pregnancy; selected temporary interruption of endocrine therapy may be discussed — never independently. Also see [breast cancer in young women](" + YOUNG + ")."),

  h2("Fertility preservation before breast cancer treatment"),
  p("Women diagnosed during pregnancy or breastfeeding may still want future children. Discuss fertility early if chemotherapy or other treatments may affect ovarian function. Pregnancy itself can limit available options — a reproductive specialist should advise."),
  { id: id("html"), type: "html", html: fertilityTable },

  h2("How is breast cancer managed after delivery?"),
  p("Postpartum care may include surgery, radiation, hormone therapy, HER2-targeted therapy, immunotherapy, additional chemotherapy, genetic counselling and fertility support. Delivery does not always need to be early, and caesarean section is not automatically required — timing and mode of delivery follow obstetric indications plus maternal treatment needs."),

  h2("What are the risks to the baby?"),
  p("Risks depend on trimester at diagnosis, treatments received, chemotherapy timing, maternal health, gestational age at delivery and other obstetric factors. Maternal breast cancer does not mean the baby will develop cancer. Monitoring may include antenatal visits, growth ultrasound, amniotic fluid assessment, planning around chemo schedules and neonatal assessment after birth."),

  h2("Emotional and psychological support"),
  p("A cancer diagnosis during pregnancy or breastfeeding can be overwhelming — concerns about survival, the baby's health, breastfeeding, future fertility, family responsibilities and finances are common. Support may include psycho-oncology, obstetric and fertility counselling, social work, family counselling, support groups and palliative care when needed. Psychological care should be part of the plan, not an afterthought."),

  h2("Breast cancer during pregnancy: treatment in India"),
  p("Hospital selection should prioritise coordinated oncology and obstetric services. Filter specialists by city: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + "). Also see [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") oncology directories and [medical oncology hospitals](" + MED_HOSP + ")."),
  { id: id("html"), type: "html", html: hospitalTable },
  ol([
    "Breast biopsy/histopathology and ER/PR/HER2 (ISH/FISH if done)",
    "Breast ultrasound/mammography/MRI reports and imaging copies",
    "Pregnancy confirmation, gestational age and antenatal records",
    "Previous treatment records, current medicines and allergies",
    "Family history and genetic reports if available",
  ]),
  p("Travel for pregnant patients should be discussed with obstetric and oncology teams before arrangements. Practical sequencing: [international patient guide](" + INTL + "). GAF helps organise reports, consultations and hospital coordination; treating hospitals remain responsible for clinical care. Request a written plan and itemised estimate before travel."),
  btn("Start an international pregnancy breast cancer records review", consult("Breast Cancer Treatment in India")),

  h2("What is the cost of breast cancer treatment during pregnancy in India?"),
  p("There is no single fixed cost. Totals may include cancer treatment plus specialist pregnancy monitoring. Use named GAF planning ranges for oncology components:"),
  { id: id("html"), type: "html", html: costTable },
  p("Obstetric antenatal monitoring, delivery and newborn care costs vary by hospital and clinical need — ask for itemised obstetric figures separately rather than assuming a package price. Wider oncology context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  p("Request an estimate covering diagnosis/staging, surgery, chemotherapy, postpartum radiation, targeted/hormone medicines after delivery, antenatal monitoring, delivery/hospitalisation, newborn care if required, and follow-up — and which figures are confirmed versus plan-dependent."),
  btn("Request a written pregnancy breast cancer treatment estimate", consult("Pregnancy Breast Cancer Cost Estimate")),
  p("[WhatsApp +91 90443 46292 for a personalised estimate](" + wa("Please provide a personalised estimate for breast cancer treatment during pregnancy or breastfeeding in India.") + ")"),

  h2("When should a pregnant or breastfeeding woman see a doctor?"),
  ul([
    "A breast lump that persists or continues to grow",
    "New nipple inversion or bloody nipple discharge",
    "Persistent redness, swelling or skin dimpling",
    "An underarm lump",
    "Breast changes that do not improve with appropriate treatment",
  ]),
  p("Do not wait until delivery or the end of breastfeeding to examine a suspicious lump. Most pregnancy and lactation breast changes are benign — only appropriate assessment can establish the cause."),

  h2("Frequently asked questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key takeaways"),
  ul([
    "Breast cancer can develop during pregnancy and breastfeeding",
    "Most lumps are benign, but persistent lumps need assessment",
    "Ultrasound is generally the first imaging test in pregnancy",
    "Mammography and biopsy may be performed when clinically indicated",
    "Surgery can be performed during pregnancy when required",
    "Selected chemotherapy may be considered after the first trimester",
    "Radiation, hormone therapy and HER2-targeted medicines are generally postponed until after delivery",
    "Breastfeeding is generally not compatible with chemotherapy and many systemic medicines",
    "Pregnancy termination is not automatically required",
    "Coordinated oncology and obstetric care is essential",
  ]),
  p("A breast cancer diagnosis during pregnancy or breastfeeding is difficult, but treatment is often possible. Early diagnosis, careful planning and coordinated specialist care help protect maternal health while considering the baby's wellbeing."),
  btn("Discuss the next treatment step with GAF Healthcare", consult("Breast Cancer During Pregnancy")),

  h2("Recommended further reading"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Medical sources and references"),
  ol([
    "[ASCO — Management of Cancer During Pregnancy: Clinical Practice Guideline, 2025](https://doi.org/10.1200/JCO-25-02115)",
    "[NCI — Breast Cancer Treatment During Pregnancy](https://www.cancer.gov/types/breast/hp/pregnancy-breast-treatment-pdq)",
    "[NCI — Breast Cancer During Pregnancy](https://www.cancer.gov/types/breast/breast-cancer-during-pregnancy)",
    "[ACS — Treating Breast Cancer During Pregnancy](https://www.cancer.org/cancer/types/breast-cancer/treatment/treating-breast-cancer-during-pregnancy.html)",
    "[Society for Maternal-Fetal Medicine — Cancer in Pregnancy](https://pmc.ncbi.nlm.nih.gov/articles/PMC13344446/)",
    "[ICMR — Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[ACR Appropriateness Criteria](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Appropriateness-Criteria)",
    "[NCI — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
  ]),
  p("*This article is for general educational purposes and does not replace medical advice, diagnosis or an individualised treatment plan. Treatment during pregnancy or breastfeeding must be planned by a qualified oncology and obstetric team. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),
];

const now = "2026-11-12T18:40:00.000Z";
const article = {
  id: "art_breast_cancer_during_pregnancy_breastfeeding_treatment_india",
  slug: SLUG,
  title:
    "Breast Cancer During Pregnancy and Breastfeeding: Symptoms, Diagnosis, Treatment and Care in India",
  excerpt:
    "Breast cancer can develop during pregnancy or while a woman is breastfeeding. Breast enlargement, tenderness and milk-related changes can make a suspicious lump harder to recognise, but diagnosis and treatment should not be delayed. This guide explains warning signs, diagnostic tests, treatment options, pregnancy-related precautions, breastfeeding considerations and specialist care available in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "pregnancy",
    "breastfeeding",
    "PABC",
    "India",
    "cost",
  ],
  image: IMG1,
  imageAlt:
    "Pregnant woman in clinic consultation beside a circular breast anatomy diagram suggesting pregnancy-associated breast cancer evaluation",
  status: "published",
  featured: false,
  seoTitle: "Breast Cancer During Pregnancy and Breastfeeding: Treatment in India",
  seoDescription:
    "Can breast cancer be treated during pregnancy or breastfeeding? Learn about symptoms, diagnosis, safe imaging, surgery, chemotherapy, treatment timing and care options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer during pregnancy",
    "Breast cancer during breastfeeding",
    "Pregnancy-associated breast cancer",
    "Breast cancer symptoms during pregnancy",
    "Breast cancer while breastfeeding",
    "Breast cancer diagnosis during pregnancy",
    "Breast cancer treatment during pregnancy",
    "Chemotherapy during pregnancy",
    "Breast surgery during pregnancy",
    "Breast cancer and pregnancy in India",
    "Breast cancer during lactation",
    "Breast cancer while nursing",
    "Pregnancy after breast cancer",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pregnancy-breast-cancer-overview.webp", article.imageAlt],
  [
    "pregnancy-breast-cancer-ultrasound.webp",
    "Pregnant woman undergoing breast ultrasound beside a circular diagram of ultrasound assessment of breast tissue",
  ],
  [
    "pregnancy-breast-cancer-treatment-timing.webp",
    "Pregnant woman discussing multidisciplinary treatment timing beside a circular conceptual diagram of surgery and chemotherapy planning in pregnancy",
  ],
  [
    "pregnancy-breast-cancer-breastfeeding-care.webp",
    "Woman in postpartum clinic counselling beside a circular diagram of lactating breast tissue and medicine-safety considerations",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`)) {
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

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer during pregnancy and breastfeeding](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer during pregnancy and breastfeeding](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists slug");
}

for (const relatedSlug of [
  "breast-cancer-in-young-women-treatment-india",
  "breast-cancer-during-pregnancy-treatment-india",
  "her2-positive-breast-cancer-treatment-india",
  "triple-negative-breast-cancer-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({
      label: "Breast cancer during pregnancy and breastfeeding",
      href,
    });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading|Recommended further reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(
            `[Breast Cancer During Pregnancy and Breastfeeding — Treatment in India](${href})`,
          );
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
