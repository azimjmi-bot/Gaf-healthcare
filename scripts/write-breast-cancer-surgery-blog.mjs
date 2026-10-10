import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RADIATION = "/blogs/radiation-therapy-for-breast-cancer";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const COMPARE = "/blogs/lumpectomy-vs-mastectomy";
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const LUMPECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const NSM_COST = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const NSM_DOCTORS = "/doctors/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCO_COST = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const ONCO_DOCTORS = "/doctors/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";
const SURG_DOCTORS = "/doctors/India/Surgical-Oncology";
const SURG_HOSPITALS = "/hospitals/India/Surgical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Breast cancer surgery in India may include lumpectomy, mastectomy, lymph-node surgery, nipple-sparing mastectomy, oncoplastic breast surgery and breast reconstruction.</p><p class="article-quick-answer__body">Lumpectomy removes the tumour while preserving most of the breast and is commonly followed by radiation therapy.</p><p class="article-quick-answer__body">Mastectomy removes the entire breast and may be recommended when breast-conserving surgery is not suitable or when the patient chooses mastectomy after discussing the available options.</p><p class="article-quick-answer__body">Lymph-node surgery may be performed to determine whether cancer has spread to nearby lymph nodes.</p><p class="article-quick-answer__body">Breast reconstruction may be performed immediately during mastectomy or at a later time.</p><p class="article-quick-answer__body">The cost depends on the procedure, hospital, city, surgeon, reconstruction, pathology, hospital stay and additional cancer treatment. There is no single fixed price for breast cancer surgery in India.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast cancer surgery is an important part of treatment for many patients. Depending on the type and [stage](${STAGES}), surgery may involve breast-conserving surgery (lumpectomy), mastectomy, lymph-node surgery, nipple-sparing mastectomy, oncoplastic surgery or [breast reconstruction](${RECON}). This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF which operation applies",
    href: consult("Breast Cancer Surgery"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your imaging and biopsy](${wa("Please review my records for breast cancer surgery in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/surgery-breast-lumpectomy-visual.webp",
    alt: "Breast cancer surgery in India including lumpectomy, mastectomy and breast reconstruction",
    caption: `Surgery is not always first. Some patients receive systemic treatment before the operation. Compare [lumpectomy versus mastectomy](${COMPARE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Breast Cancer Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast cancer surgery involves removing the cancer from the breast and, when appropriate, evaluating nearby lymph nodes. The type of surgery depends on tumour size and location, number of tumours, breast size, [stage](${BY_STAGE}), lymph-node involvement, [ER, PR and HER2 status](${BIOMARKERS}), response to treatment before surgery, previous radiation, genetic or familial risk, patient preference and reconstruction plans.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The two main breast operations are lumpectomy and mastectomy. Lymph-node surgery may be performed with either procedure when indicated. Surgical oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) plan this with medical and radiation oncology.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Types of Breast Cancer Surgery in India",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "1. Breast-Conserving Surgery (Lumpectomy)",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast-conserving surgery, commonly called a lumpectomy, removes the cancer along with a margin of surrounding tissue while leaving most of the breast intact. It may also be called partial mastectomy, wide local excision or segmental mastectomy.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For appropriately selected patients, lumpectomy followed by [radiation](${RADIATION}) can provide survival outcomes comparable to mastectomy. The surgeon locates the tumour, removes it with surrounding tissue, sends the specimen for pathology, may perform sentinel lymph-node surgery, and closes and reshapes the surgical area.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-Conserving Surgery Doctors in India](${LUMPECTOMY_DOCTORS})\n- [Breast-Conserving Surgery Cost in India](${LUMPECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "2. Mastectomy",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/surgery-breast-mastectomy-visual.webp",
    alt: "Surgeon discussing mastectomy and reconstruction options with a patient",
    caption: "Mastectomy may be simple, skin-sparing, nipple-sparing or modified radical. These procedures are not interchangeable.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A mastectomy involves removing the entire breast containing the cancer. It may be recommended when the tumour is large relative to breast size, there are multiple areas of cancer, breast conservation would not provide an appropriate surgical result, previous radiation limits further irradiation, a previous breast-conserving operation did not achieve satisfactory margins, or the patient chooses mastectomy after discussing the alternatives.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Mastectomy Doctors in India](${MASTECTOMY_DOCTORS})\n- [Mastectomy Cost in India](${MASTECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "3. Nipple-Sparing Mastectomy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Nipple-sparing mastectomy removes the breast tissue while preserving the nipple-areola complex in appropriately selected patients. It is generally considered as part of a mastectomy and reconstruction strategy. Suitability depends on tumour location, distance between tumour and nipple, nipple involvement, imaging, cancer characteristics and breast anatomy.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Nipple-Sparing Mastectomy Doctors in India](${NSM_DOCTORS})\n- [Nipple-Sparing Mastectomy Cost](${NSM_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "4. Oncoplastic Breast Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Oncoplastic breast surgery combines cancer removal with techniques used to maintain or restore breast shape. It can be particularly useful when removing the tumour would otherwise create a significant change in breast appearance. Oncoplastic surgery is still cancer surgery first: the priority is appropriate removal of the cancer.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Oncoplastic Breast Surgery Doctors in India](${ONCO_DOCTORS})\n- [Oncoplastic Breast Surgery Cost](${ONCO_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "5. Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast reconstruction restores breast shape after mastectomy or, in selected cases, after significant breast tissue removal. Reconstruction can be immediate (during the same operation) or delayed. Depending on the patient, reconstruction can involve implants, tissue from another part of the body, or a combination. The possibility of [radiation](${RADIATION}) is an important consideration.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast Reconstruction After Mastectomy](${RECON})\n- [Breast Reconstruction Doctors in India](${RECON_DOCTORS})\n- [Breast Reconstruction Cost](${RECON_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask which surgical pathway fits](${consult("Breast Cancer Surgery")}) · [WhatsApp +91 90443 46292](${wa("Should I have lumpectomy, mastectomy or reconstruction in India?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "6. Sentinel Lymph Node Biopsy",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/surgery-breast-lymph-visual.webp",
    alt: "Surgeon explaining sentinel lymph-node assessment at the underarm",
    caption: "Sentinel nodes are the first nodes most likely to receive drainage from the tumour area. The findings affect staging, radiation and systemic treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A sentinel lymph node biopsy identifies the first lymph nodes that are most likely to receive drainage from the tumour area. These nodes are removed and examined by a pathologist. The results can provide information about cancer stage, need for additional lymph-node surgery, radiation planning and further systemic treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "7. Axillary Lymph Node Dissection",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "An axillary lymph node dissection (ALND) involves removing a larger number of lymph nodes from the armpit. It is not necessary for every breast cancer patient. Whether it is recommended depends on sentinel lymph-node findings, extent of lymph-node disease, type of breast surgery, previous treatment and overall cancer characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Every Breast Cancer Patient Need Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `No. Surgery is an important part of treatment for many patients with non-metastatic breast cancer, but the sequence of treatment varies. Some patients with locally advanced breast cancer may receive neoadjuvant [chemotherapy](${CHEMO}), [HER2-targeted therapy](${HER2}) or [immunotherapy](${IMMUNO_COST}) before surgery.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Surgery Before or After Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Both approaches are possible. A patient may undergo diagnosis → surgery → pathology → additional treatment. Another patient may undergo diagnosis → systemic treatment → surgery → additional treatment (neoadjuvant therapy). This can be particularly relevant for some HER2-positive cancers, triple-negative breast cancers, larger tumours and locally advanced breast cancers.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Tests Are Done Before Breast Cancer Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before surgery, evaluation may include [breast imaging and biopsy](${DIAGNOSIS}) (mammography, ultrasound, MRI when indicated, core needle biopsy, histopathology), biomarker testing for ER, PR and HER2, additional staging investigations when clinically indicated, blood tests, anaesthesia assessment and cardiac evaluation when indicated. Not every patient needs every test.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During Breast Cancer Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A typical pathway includes preoperative planning, anaesthesia, tumour or breast removal, lymph-node assessment when indicated, reconstruction or reshaping when planned, pathology of the removed tissue, and recovery with postoperative instructions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Recovery Time After Breast Cancer Surgery?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/surgery-breast-recovery-visual.webp",
    alt: "Nurse checking a postoperative dressing for an international surgery patient",
    caption: "Recovery after lumpectomy differs from mastectomy with reconstruction. Ask about drains, driving, work and travel clearance before booking flights.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Recovery varies substantially depending on the procedure. A straightforward lumpectomy may have a different recovery from mastectomy with reconstruction. Common postoperative symptoms may include pain, swelling, bruising, fatigue, tightness, numbness around the surgical site and reduced shoulder movement.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**After lumpectomy** patients may have breast tenderness, swelling, bruising, scar formation, temporary changes in breast shape and numbness. If lymph-node surgery is performed at the same time, there may also be discomfort or restricted arm movement.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**After mastectomy** recovery can involve chest discomfort, incision pain, tightness, swelling, numbness, drain care and arm and shoulder exercises. If reconstruction is performed, recovery can be longer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Surgery Fits With Other Treatments",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `After lumpectomy, [radiation](${RADIATION}) is commonly part of the plan. After mastectomy, radiation may still be required depending on tumour size, lymph-node involvement, surgical margins and other pathological findings. [Chemotherapy](${CHEMO}) can be given before or after surgery. [Hormone therapy](${HORMONE}) is used for hormone-receptor-positive cancers. [Targeted therapy](${TARGETED_COST}) may be used when a molecular target such as HER2 is present. [Immunotherapy](${IMMUNO_COST}) may be considered in selected triple-negative settings.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Surgery Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single cost for breast cancer surgery in India. A published Apollo Hospitals estimate currently places breast cancer surgery at approximately ₹1 lakh to ₹2.5 lakh, while noting that hospital, location, room category and complications can affect the final amount. This is a hospital-specific published estimate, not a universal India-wide price. See the [cost guide](${COST}), [lumpectomy cost](${LUMPECTOMY_COST}) and [mastectomy cost](${MASTECTOMY_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The actual cost can depend on lumpectomy or mastectomy, surgeon, hospital, city, anaesthesia, operating-room charges, pathology, lymph-node surgery, hospital stay, reconstruction, complications and additional procedures.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a surgery quotation",
    href: consult("Breast Cancer Surgery"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send a case-specific quotation for breast cancer surgery in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Included in Breast Cancer Surgery Cost?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Cost component | May be included |\n| --- | --- |\n| Surgeon fee | Yes, depending on quotation |\n| Anaesthesia | Depends on quotation |\n| Operating-room charges | Depends on quotation |\n| Hospital room | Depends on package |\n| Nursing | Depends on package |\n| Pathology | May be separate |\n| Lymph-node surgery | May be separate |\n| Medicines | May be separate |\n| Reconstruction | Usually separate or procedure-specific |\n| Follow-up | Depends on hospital |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A lumpectomy may be followed by surgery → [radiation](${EBRT_COST}) → systemic treatment. A mastectomy may involve reconstruction and radiation may still be needed. Compare the complete pathway, not just the surgical bill.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How International Patients Can Prepare",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Useful documents include the [biopsy and histopathology](${DIAGNOSIS}), ER/PR and HER2 results, mammography, ultrasound, MRI if performed, CT/PET-CT where applicable, previous treatment records, medication list, previous surgical reports and discharge summaries. See the [international-patient guide](${INTL}). Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm what to send.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my records for a breast cancer surgery opinion before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Choosing a Hospital and When to Seek a Second Opinion",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Ask whether the hospital has a dedicated oncology department, whether breast cancer surgery is performed regularly, whether surgical, medical and radiation oncology are available, whether pathology and reconstruction are onsite, and what is included in the quotation. See [Surgical Oncology Doctors in India](${SURG_DOCTORS}) and [Surgical Oncology Hospitals](${SURG_HOSPITALS}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A second opinion can be particularly useful when there are multiple treatment options, major surgery has been recommended, mastectomy versus lumpectomy is unclear, reconstruction is being considered, neoadjuvant therapy has been recommended, or the pathology is complex.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Before Breast Cancer Surgery",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "What type of breast cancer do I have, and what is the stage?",
      "What are my ER, PR and HER2 results?",
      "Am I a candidate for lumpectomy?",
      "Why are you recommending lumpectomy or mastectomy?",
      "Will lymph-node surgery be required?",
      "Is nipple-sparing or oncoplastic surgery appropriate?",
      "Can reconstruction be performed immediately?",
      "Will radiation affect the reconstruction plan?",
      "How long will I stay in hospital, and when can I travel home?",
      "What is included and excluded in the quotation?",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is the most common type of breast cancer surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The main surgical approaches are breast-conserving surgery (lumpectomy) and mastectomy. The appropriate procedure depends on the individual cancer and treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is lumpectomy better than mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neither operation is universally better. For appropriately selected early-stage patients, lumpectomy followed by radiation and mastectomy have comparable survival outcomes. The choice depends on medical suitability and patient preferences.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How long does breast cancer surgery take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The duration varies according to the procedure. A straightforward lumpectomy can differ considerably from a mastectomy combined with lymph-node surgery and reconstruction.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How long do I stay in the hospital after breast cancer surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hospital stay varies according to the operation, reconstruction, recovery and individual hospital protocol. Patients should obtain an expected stay from their treating hospital.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast cancer surgery be done after chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Chemotherapy or other systemic treatment may be given before surgery in selected patients. This is known as neoadjuvant treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I have reconstruction during mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Immediate reconstruction can be performed during the same surgical episode in appropriately selected patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is nipple-sparing mastectomy suitable for everyone?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. It depends on tumour location, nipple involvement, imaging and other clinical factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is radiation required after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not for every patient. Radiation depends on tumour characteristics, lymph-node findings and other pathological factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is chemotherapy required after breast cancer surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. The decision depends on the cancer's stage, biology and other clinical factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How much does breast cancer surgery cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single nationwide price. Published hospital estimates vary, and the final amount depends on the surgical procedure and additional services. Apollo Hospitals currently publishes an illustrative ₹1 lakh–₹2.5 lakh range for breast cancer surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can international patients have breast cancer surgery in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. International patients can seek breast cancer treatment in India. Medical records can generally be reviewed before travel so that the hospital can assess the diagnosis and proposed treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Surgery in India: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer surgery in India can involve considerably more than removing a tumour. The surgical plan may include lumpectomy, mastectomy, sentinel lymph-node biopsy, axillary lymph-node surgery, nipple-sparing mastectomy, oncoplastic breast surgery and breast reconstruction.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The most useful question is not simply "Which breast cancer surgery is best?" It is: "Which surgical approach is appropriate for my cancer, and what will my complete treatment pathway look like after surgery?" See [lumpectomy versus mastectomy](${COMPARE}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Start the Breast Cancer Treatment in India pathway",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer surgery in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "GAF Healthcare Resources",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Lumpectomy vs Mastectomy](${COMPARE})\n- [Lumpectomy doctors](${LUMPECTOMY_DOCTORS}) · [cost](${LUMPECTOMY_COST})\n- [Mastectomy doctors](${MASTECTOMY_DOCTORS}) · [cost](${MASTECTOMY_COST})\n- [Nipple-sparing mastectomy](${NSM_COST})\n- [Oncoplastic breast surgery](${ONCO_COST})\n- [Breast reconstruction](${RECON})\n- [Radiation therapy](${RADIATION})\n- [Chemotherapy](${CHEMO})\n- [Hormone therapy](${HORMONE})\n- [Treatment for international patients](${INTL})`,
  },
];

const now = "2026-09-27T20:00:00.000Z";
const SLUG = "breast-cancer-surgery-in-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_surgery_in_india",
  slug: SLUG,
  title: "Breast Cancer Surgery in India: Procedures, Recovery and Cost",
  excerpt:
    "Lumpectomy, mastectomy, lymph-node surgery, nipple-sparing and oncoplastic options, reconstruction timing, recovery and why India surgical quotes must be itemized.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "surgery", "lumpectomy", "mastectomy", "India", "travel"],
  image: "/uploads/articles/surgery-breast-lumpectomy-visual.webp",
  imageAlt: "Breast cancer surgery in India including lumpectomy, mastectomy and breast reconstruction",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Surgery in India | Procedures, Recovery & Cost",
  seoDescription:
    "Learn about breast cancer surgery in India, including lumpectomy, mastectomy, lymph-node surgery, reconstruction, recovery and treatment costs.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/surgery-breast-lumpectomy-visual.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer surgery in India",
    "breast cancer surgery",
    "breast cancer surgery cost in India",
    "breast cancer operation in India",
    "lumpectomy in India",
    "mastectomy in India",
    "breast-conserving surgery",
    "breast cancer surgery recovery",
    "mastectomy recovery",
    "lumpectomy recovery",
    "nipple-sparing mastectomy",
    "oncoplastic breast surgery",
    "breast reconstruction after mastectomy",
    "breast cancer surgery hospitals in India",
    "breast cancer surgeons in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Lumpectomy vs Mastectomy", href: COMPARE },
    { label: "Lumpectomy cost", href: LUMPECTOMY_COST },
    { label: "Mastectomy cost", href: MASTECTOMY_COST },
    { label: "Breast Reconstruction", href: RECON },
    { label: "Radiation Therapy", href: RADIATION },
    { label: "Chemotherapy", href: CHEMO },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  { id: "media_surg_lump", url: "/uploads/articles/surgery-breast-lumpectomy-visual.webp", name: "surgery-breast-lumpectomy-visual.webp", alt: article.imageAlt, addedAt: now },
  { id: "media_surg_mast", url: "/uploads/articles/surgery-breast-mastectomy-visual.webp", name: "surgery-breast-mastectomy-visual.webp", alt: "Mastectomy and reconstruction discussion", addedAt: now },
  { id: "media_surg_lymph", url: "/uploads/articles/surgery-breast-lymph-visual.webp", name: "surgery-breast-lymph-visual.webp", alt: "Lymph-node surgery explanation", addedAt: now },
  { id: "media_surg_recov", url: "/uploads/articles/surgery-breast-recovery-visual.webp", name: "surgery-breast-recovery-visual.webp", alt: "Postoperative recovery after breast cancer surgery", addedAt: now },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

const siblingIds = [
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_radiation_therapy_for_breast_cancer",
  "art_breast_reconstruction_after_mastectomy_india",
  "art_hormone_therapy_breast_cancer_india",
  "art_her2_positive_breast_cancer_treatment_india",
  "art_breast_cancer_treatment_india_international_patients",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_treatment_by_stage",
];
for (const siblingId of siblingIds) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Breast Cancer Surgery in India", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
