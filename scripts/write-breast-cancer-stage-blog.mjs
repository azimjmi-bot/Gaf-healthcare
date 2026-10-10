import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const LUMPECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const ONCOPLASTIC_DOCTORS = "/doctors/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const ONCOPLASTIC_COST = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const NSM_DOCTORS = "/doctors/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const NSM_COST = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT_DOCTORS = "/doctors/India/Radiation-Oncology/EBRT";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer treatment is not the same for every patient. The treatment plan depends on how far the cancer has spread, the size and location of the tumour, whether lymph nodes are involved, and the biological characteristics of the cancer such as ER, PR and HER2 status.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For this reason, knowing the breast cancer stage is an important part of understanding the treatment plan. However, stage alone does not determine treatment. Doctors also consider tumour grade, biomarkers, menopausal status, overall health and other characteristics of the cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In India, breast cancer treatment is commonly planned through a multidisciplinary cancer team that may include surgical oncology, medical oncology, radiation oncology, radiology, pathology and reconstructive specialists. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) work this way. The Indian Council of Medical Research (ICMR) also describes multidisciplinary evaluation and stage-based management for breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `This guide explains how breast cancer treatment may differ between Stage 1, Stage 2, Stage 3 and Stage 4, including [surgery](${LUMPECTOMY_COST}), [chemotherapy](${CHEMO_COST}), [radiation therapy](${EBRT_COST}), [hormone therapy](${HORMONE_COST}), [targeted therapy](${TARGETED_COST}) and [immunotherapy](${IMMUNO_COST}). It supports the main [Breast Cancer Treatment in India](${PILLAR}) pathway rather than replacing it.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Important:** The treatment approaches described below are general medical information. The appropriate treatment for an individual patient must be determined by the treating oncology team after reviewing pathology, imaging, biomarkers and staging.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your staging records",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Breast Cancer Stage Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Cancer staging describes how much cancer is present in the body and whether it has spread beyond the original tumour.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For breast cancer, doctors use information from:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Physical examination",
      "Mammography",
      "Breast ultrasound",
      "MRI when appropriate",
      "Biopsy",
      "Histopathology",
      "Lymph-node assessment",
      "ER testing",
      "PR testing",
      "HER2 testing",
      "Tumour grade",
      "Other molecular or genetic tests when clinically appropriate",
      "Imaging or investigations used to evaluate distant spread",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern breast cancer staging incorporates not only the traditional TNM factors—tumour, lymph nodes and metastasis—but also biological characteristics such as ER, PR and HER2 status. This means that two patients with apparently similar tumour sizes may not necessarily have exactly the same stage or treatment plan.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-stages-overview.png",
    alt: "Four-panel diagram showing breast cancer becoming more extensive from Stage 1 localized disease through Stage 4 distant spread",
    caption: "Stage describes extent: a small localized cancer is not planned the same way as extensive regional disease or distant metastasis.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The broad stages are:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Stage | General description |\n| --- | --- |\n| Stage 0 | Non-invasive disease such as ductal carcinoma in situ (DCIS) |\n| Stage 1 | Usually a small invasive cancer with limited or no lymph-node involvement |\n| Stage 2 | A larger tumour and/or involvement of a limited number of nearby lymph nodes |\n| Stage 3 | More extensive local or regional disease, including involvement of multiple lymph nodes or nearby tissues |\n| Stage 4 | Cancer that has spread to distant organs or tissues |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact definition of a stage can be more complex because breast cancer staging also incorporates tumour biology and TNM characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Treatment by Stage",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 1 Breast Cancer Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 breast cancer is generally an early-stage breast cancer. The tumour is relatively small and has not spread extensively to nearby lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many patients, surgery is the main initial treatment. Depending on the tumour and the patient's circumstances, surgery may involve breast-conserving surgery or mastectomy. Lymph nodes may also be evaluated, commonly through a sentinel lymph node biopsy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Breast-conserving surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast-conserving surgery, also known as lumpectomy, removes the cancerous area along with a margin of surrounding tissue while preserving most of the breast.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It may be considered when:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "The tumour can be removed with clear margins.",
      "The amount of breast tissue that needs to be removed is acceptable.",
      "There are no other factors making breast conservation unsuitable.",
      "The patient and treatment team consider it appropriate.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `After breast-conserving surgery, [radiation therapy](${EBRT_COST}) is commonly recommended because it reduces the risk of cancer returning in the treated breast.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For patients considering this option, GAF Healthcare can provide information about:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-Conserving Surgery (Lumpectomy) Doctors in India](${LUMPECTOMY_DOCTORS})\n- [Breast-Conserving Surgery (Lumpectomy) Cost in India](${LUMPECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Mastectomy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A mastectomy removes the entire breast. It may be considered when breast-conserving surgery is not appropriate or when mastectomy is preferred after discussion with the treating team.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Different types of mastectomy may be available depending on the patient's anatomy, tumour location, cancer characteristics and reconstruction plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Mastectomy Doctors in India](${MASTECTOMY_DOCTORS})\n- [Mastectomy Cost in India](${MASTECTOMY_COST})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-stage-surgery-options.png",
    alt: "Four-card diagram of lumpectomy, mastectomy, oncoplastic surgery and sentinel lymph-node biopsy used in early-stage breast cancer",
    caption: "Early-stage surgery may conserve the breast, remove it, reshape remaining tissue, or sample the first draining lymph nodes.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Lymph-node assessment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Even when breast cancer is detected at an early stage, doctors may need to determine whether cancer cells have reached nearby lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A sentinel lymph node biopsy identifies and examines the first lymph nodes to which breast cancer is most likely to spread.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The results can influence:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Further surgery",
      "Radiation therapy",
      "Chemotherapy",
      "Other systemic treatments",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Additional treatment after surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery may not be the only treatment required for Stage 1 breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the tumour's biology, additional treatment may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone therapy](${HORMONE_COST})\n- [Chemotherapy](${CHEMO_COST})\n- [HER2-targeted therapy](${TARGETED_COST})\n- [Radiation therapy](${EBRT_COST})\n- Other systemic treatment in selected situations`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, hormone-receptor-positive cancers may be treated with endocrine therapy, while HER2-positive cancers may require HER2-directed treatment. The need for chemotherapy depends on multiple factors rather than stage alone.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether lumpectomy is possible](${consult("Breast-Conserving Surgery (Lumpectomy)")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 2 Breast Cancer Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 2 breast cancer generally involves a larger tumour and/or limited involvement of nearby lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment is usually multimodal, meaning more than one form of treatment may be required.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the individual case, treatment may include:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Surgery",
      "Lymph-node assessment or surgery",
      "Chemotherapy",
      "Radiation therapy",
      "Hormone therapy",
      "Targeted therapy",
      "Immunotherapy in selected cases",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The sequence can vary. Some patients undergo surgery first, while others receive systemic treatment before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Surgery for Stage 2 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The surgical options may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Lumpectomy.** Breast-conserving surgery may be possible in selected Stage 2 cancers. If the tumour can be removed while preserving an acceptable amount and shape of breast tissue, [lumpectomy](${LUMPECTOMY_COST}) followed by [radiation](${EBRT_COST}) may be considered.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Mastectomy** may be recommended when the tumour is extensive relative to breast size, there are multiple areas of cancer, breast conservation is not considered appropriate, or the patient chooses [mastectomy](${MASTECTOMY_COST}) after discussing the available options.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Oncoplastic breast surgery.** Some patients may be candidates for oncoplastic breast surgery, which combines cancer removal with plastic-surgical techniques to help maintain breast shape.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Oncoplastic Breast Surgery Doctors in India](${ONCOPLASTIC_DOCTORS})\n- [Oncoplastic Breast Surgery Cost in India](${ONCOPLASTIC_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Nipple-sparing mastectomy.** For appropriately selected patients, nipple-sparing mastectomy may be considered as part of a mastectomy and reconstruction strategy. Eligibility depends on factors such as tumour location, involvement of the nipple-areola complex and other clinical findings.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Nipple-Sparing Mastectomy Doctors in India](${NSM_DOCTORS})\n- [Nipple-Sparing Mastectomy Cost in India](${NSM_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Chemotherapy Before Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `In some Stage 2 breast cancers, [chemotherapy](${CHEMO_COST}) or other systemic therapy may be given before surgery. This is called neoadjuvant treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential reasons for using treatment before surgery include:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Reducing tumour size",
      "Treating microscopic disease elsewhere in the body early",
      "Assessing how the tumour responds to treatment",
      "Potentially making surgery more manageable",
      "Helping guide subsequent treatment based on response",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The decision depends heavily on tumour biology, including HER2 and hormone-receptor status.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether chemotherapy should come before surgery",
    href: consult("Chemotherapy"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Radiation Therapy After Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation therapy is commonly used after breast-conserving surgery. After mastectomy, radiation may also be recommended in selected patients, particularly when there are significant risk factors such as lymph-node involvement or more extensive disease.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation planning is individualized based on:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Type of surgery",
      "Tumour characteristics",
      "Lymph-node findings",
      "Surgical margins",
      "Other pathological factors",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Radiation oncology doctors in India](${EBRT_DOCTORS})\n- [EBRT cost in India](${EBRT_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 3 Breast Cancer Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 breast cancer is more locally or regionally advanced. The cancer may involve a larger tumour, several nearby lymph nodes, the skin of the breast, the chest wall or other nearby structures.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, Stage 3 breast cancer is different from Stage 4 because Stage 3 does not by definition mean that cancer has spread to distant organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment is generally more intensive and often involves several treatment modalities.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-stage3-sequence.png",
    alt: "Four-step diagram of Stage 3 breast cancer treatment: neoadjuvant systemic therapy, surgery, radiation, then further medicines",
    caption: "Many Stage 3 plans start with systemic therapy, then surgery, radiation and further medicines chosen by subtype and response.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Neoadjuvant Treatment Is Often Important",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many Stage 3 breast cancers, treatment may begin with systemic therapy before surgery. This is known as neoadjuvant therapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on tumour biology, it can include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Chemotherapy](${CHEMO_COST})\n- [HER2-targeted therapy](${TARGETED_COST})\n- [Immunotherapy](${IMMUNO_COST}) in selected cases\n- Other systemic treatment`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The purpose can include shrinking the primary tumour, treating disease that may exist elsewhere at a microscopic level and assessing the tumour's response before surgery.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact combination depends on whether the cancer is hormone receptor positive, HER2 positive, triple negative or another biological subtype.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Surgery After Neoadjuvant Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Once the initial systemic treatment is completed, the oncology team reassesses the disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery may then involve:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Breast-conserving surgery in selected cases",
      "Mastectomy",
      "Sentinel lymph-node surgery in appropriate situations",
      "Axillary lymph-node dissection when indicated",
      "Reconstruction in selected patients",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The type of surgery depends on the response to treatment and the original extent and characteristics of the cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Radiation Therapy for Stage 3 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation therapy is generally an important part of treatment after surgery for Stage 3 breast cancer. It may involve treatment of the breast or chest wall and regional lymph-node areas. [Radiation planning](${EBRT_COST}) is individualized according to surgical findings, tumour characteristics and lymph-node involvement.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Systemic Treatment After Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Additional systemic treatment may be recommended following surgery. Depending on the cancer subtype and response to treatment, this may include chemotherapy, hormone therapy, HER2-targeted therapy, immunotherapy or other targeted medicines.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For HER2-positive disease, HER2-directed medicines may form an important part of treatment. For hormone-receptor-positive disease, endocrine therapy may be used. Some patients with triple-negative breast cancer may be candidates for immunotherapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Request a Stage 3 treatment sequence](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 4 Breast Cancer Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 breast cancer is also called metastatic breast cancer. It means that breast cancer has spread to distant parts of the body, which can include areas such as bones, liver, lungs or brain.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The presence of distant metastasis makes Stage 4 different from Stages 1–3.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment for Stage 4 breast cancer is usually focused on controlling the cancer, reducing symptoms, maintaining quality of life and extending survival. Treatment can sometimes control metastatic breast cancer for prolonged periods, although Stage 4 breast cancer is generally considered difficult to cure.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 4,
    text: "Systemic Therapy in Stage 4 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Because the cancer has spread beyond the breast and nearby lymph nodes, systemic treatment usually plays a central role.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the tumour subtype, treatment may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Hormone therapy** may be used when the cancer is hormone-receptor positive. It works by interfering with hormonal signals that can help certain breast cancer cells grow.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone Therapy for Breast Cancer Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**HER2-targeted therapy.** For HER2-positive breast cancer, targeted therapies may be used to specifically interfere with HER2-driven cancer growth. The exact treatment depends on previous therapies, disease characteristics and the patient's overall treatment plan.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Targeted Therapy for Breast Cancer Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Chemotherapy** may be used for metastatic breast cancer, particularly when the cancer subtype or clinical situation makes chemotherapy appropriate. It may be given alone or in combination with other systemic therapies.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Chemotherapy for Breast Cancer Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Immunotherapy** is used in selected breast cancer situations rather than universally. Its suitability depends on factors such as tumour subtype and biomarker results.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Immunotherapy for Breast Cancer Doctors in India](${IMMUNO_DOCTORS})\n- [Immunotherapy Cost in India](${IMMUNO_COST})`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Discuss metastatic treatment options on WhatsApp",
    href: wa("I would like to discuss Stage 4 / metastatic breast cancer treatment options in India."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Breast Cancer Subtype Changes Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Two patients with the same stage of breast cancer can receive very different treatments. One of the most important reasons is the biological subtype of the cancer.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-subtype-treatment.png",
    alt: "Four-card diagram showing ER-positive, PR-positive, HER2-positive and triple-negative breast cancer and the treatment class each subtype may use",
    caption: "Hormone therapy, HER2-directed medicines, chemotherapy and immunotherapy are chosen from receptor and HER2 results, not from stage alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "ER-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If breast cancer cells have estrogen receptors, the cancer is described as ER-positive. [Hormone therapy](${HORMONE_COST}) can form an important part of treatment for hormone-receptor-positive disease. Treatment may include endocrine medicines such as tamoxifen or aromatase inhibitors, depending on the patient's circumstances.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "PR-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Progesterone receptor status is another biomarker used to characterize breast cancer. Doctors generally consider ER and PR together with other pathological and clinical information when developing a treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "HER2-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `HER2 is a protein that can promote the growth of certain breast cancer cells. When a tumour is HER2-positive, [HER2-directed treatment](${TARGETED_COST}) may become an important part of the treatment strategy. The treatment approach can differ significantly from that used for HER2-negative disease.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Triple-Negative Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer does not have significant expression of estrogen receptors, progesterone receptors or HER2.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Because hormone therapy and HER2-targeted therapy do not apply in the same way, treatment strategies can differ from hormone-receptor-positive or HER2-positive cancers. [Chemotherapy](${CHEMO_COST}) is an important component in many cases, and [immunotherapy](${IMMUNO_COST}) may be considered for selected patients depending on the clinical and biomarker profile.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask how ER, PR and HER2 change the plan](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Treatment: Surgery vs Medicines vs Radiation",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is useful to understand that these treatments serve different purposes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `| Treatment | Main role |\n| --- | --- |\n| [Lumpectomy](${LUMPECTOMY_COST}) | Removes the tumour while preserving most of the breast |\n| [Mastectomy](${MASTECTOMY_COST}) | Removes the breast |\n| Lymph-node surgery | Determines or treats lymph-node involvement |\n| [Chemotherapy](${CHEMO_COST}) | Uses medicines to treat cancer cells throughout the body |\n| [Radiation therapy](${EBRT_COST}) | Uses radiation to treat specific areas at risk |\n| [Hormone therapy](${HORMONE_COST}) | Targets hormone-driven breast cancer |\n| [Targeted therapy](${TARGETED_COST}) | Targets specific molecular features such as HER2 |\n| [Immunotherapy](${IMMUNO_COST}) | Helps the immune system recognize and attack cancer in selected situations |\n| [Breast reconstruction](${RECON_COST}) | Restores breast shape after breast removal or tissue loss |`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Most patients do not receive every treatment listed above. The combination depends on the stage and biology of the cancer, the patient's health, previous treatments and other clinical considerations.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Treatment Include More Than One Procedure?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Breast cancer treatment is often a sequence rather than a single procedure.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, a patient might have:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Diagnosis → biopsy → staging → chemotherapy → surgery → radiation → hormone therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Another patient may have:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Diagnosis → surgery → radiation → hormone therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A patient with HER2-positive disease may have:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Diagnosis → systemic therapy → surgery → radiation → HER2-targeted treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These are only examples. They should not be interpreted as standard treatment schedules for every patient. The treatment sequence is determined after reviewing the individual cancer profile.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction After Breast Cancer Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast reconstruction may be considered after mastectomy or, in selected situations, as part of the overall surgical plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Reconstruction can be immediate or delayed, and implant-based or tissue-based.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The timing depends on factors such as:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Need for radiation",
      "Type of mastectomy",
      "Overall health",
      "Patient preference",
      "Surgical considerations",
      "Cancer treatment plan",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast Reconstruction Doctors in India](${RECON_DOCTORS})\n- [Breast Reconstruction Cost in India](${RECON_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask about reconstruction timing](${consult("Breast Reconstruction")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Doctors Decide the Treatment Plan",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer treatment plan is usually developed by considering several pieces of information together.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**1. Tumour size.** The size of the primary tumour contributes to staging and can influence the choice of surgery and other treatments.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**2. Lymph-node involvement.** The presence and extent of lymph-node involvement can change both the stage and treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**3. Distant metastasis.** If cancer has spread to distant organs, the treatment approach changes substantially and is generally focused on systemic disease control.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**4. ER and PR status.** Hormone receptor status can determine whether hormone therapy is appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**5. HER2 status.** HER2-positive cancers may be treated with HER2-targeted medicines.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**6. Tumour grade.** Grade provides information about how abnormal the cancer cells look and can help characterize the cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**7. Other biomarkers and molecular findings.** Additional testing may be recommended in selected patients to help guide treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**8. Previous treatment.** For recurrent or metastatic cancer, doctors also consider treatments the patient has already received.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**9. General health.** Other medical conditions, age, menopausal status and overall health can affect treatment selection.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Treatment in India for International Patients",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "International patients travelling to India for breast cancer treatment generally need to organize more than the medical treatment itself.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The process may involve collecting medical records, obtaining pathology reports, sharing biopsy and imaging reports, sending pathology slides or blocks when requested, obtaining a medical opinion, reviewing treatment options, comparing hospitals and specialists, receiving a treatment estimate, planning travel and accommodation, completing treatment in India, and arranging follow-up after returning home.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `GAF Healthcare coordinates this pathway with named teams in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad). Start from the [Breast Cancer Treatment in India](${PILLAR}) pillar, then compare the relevant [doctors](/doctors/India/Surgical-Oncology) and [cost sheets](/costs/India/Surgical-Oncology).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For patients seeking a second opinion, it is particularly useful to provide the treating team with the complete diagnostic history rather than only the latest report.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Important documents may include:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Mammography reports",
      "Breast ultrasound reports",
      "MRI reports",
      "Biopsy report",
      "Histopathology report",
      "ER/PR results",
      "HER2 results",
      "Ki-67 where available",
      "Previous chemotherapy records",
      "Previous radiation records",
      "Surgical reports",
      "Discharge summaries",
      "CT/PET or other relevant imaging",
      "Medication history",
    ],
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send records for an India second opinion",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Treatment Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single price for breast cancer treatment in India. The total cost depends on the treatment required.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, the overall expense can change according to:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Type of surgery",
      "Hospital",
      "City",
      "Surgeon and oncology team",
      "Need for reconstruction",
      "Number of chemotherapy cycles",
      "Type of chemotherapy medicines",
      "Radiation treatment plan",
      "Targeted medicines",
      "Immunotherapy",
      "Diagnostic investigations",
      "Length of hospital stay",
      "Management of treatment-related complications",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For this reason, patients should avoid comparing only the price of a single procedure when estimating the total cost of breast cancer treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For procedure-specific information, see the GAF Healthcare cost pages:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-Conserving Surgery Cost](${LUMPECTOMY_COST})\n- [Mastectomy Cost](${MASTECTOMY_COST})\n- [Nipple-Sparing Mastectomy Cost](${NSM_COST})\n- [Oncoplastic Breast Surgery Cost](${ONCOPLASTIC_COST})\n- [Breast Reconstruction Cost](${RECON_COST})\n- [Chemotherapy Cost](${CHEMO_COST})\n- [Immunotherapy Cost](${IMMUNO_COST})\n- [Targeted Therapy Cost](${TARGETED_COST})\n- [Hormone Therapy Cost](${HORMONE_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A personalized estimate should be prepared after reviewing the patient's diagnosis and proposed treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Request a personalized India estimate](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Stage 1 vs Stage 2 vs Stage 3 vs Stage 4 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Stage 1 | Stage 2 | Stage 3 | Stage 4 |\n| --- | --- | --- | --- | --- |\n| General extent | Small, localized cancer | Larger and/or limited regional spread | More extensive regional disease | Distant metastatic disease |\n| Lymph nodes | None or limited involvement | May involve nearby nodes | Often more extensive involvement | May or may not be involved |\n| Surgery | Common | Common | Usually part of multimodal treatment | Surgery may be used selectively |\n| Chemotherapy | Selected patients | Commonly considered depending on biology | Often an important part of treatment | Frequently used depending on subtype and disease |\n| Radiation | Common after breast-conserving surgery | Common in appropriate cases | Usually an important part of treatment | Used selectively for disease control or symptoms |\n| Hormone therapy | If hormone-receptor positive | If hormone-receptor positive | If hormone-receptor positive | If hormone-receptor positive |\n| Targeted therapy | If indicated by biomarkers | If indicated | If indicated | Often important for appropriate biomarker-positive disease |\n| Immunotherapy | Selected cases | Selected cases | Selected cases | Selected cases |\n| Main treatment objective | Treat localized cancer and reduce recurrence risk | Treat breast cancer and regional disease | Control extensive local/regional disease | Control metastatic disease and symptoms |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This table provides a broad overview only. Actual treatment decisions are individualized according to tumour biology, pathology, staging and patient factors.",
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
    text: "Is Stage 1 breast cancer curable?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 breast cancer is an early-stage disease, and treatment is generally aimed at eliminating the cancer and reducing the risk of recurrence. The individual outlook depends on tumour biology, treatment and other clinical factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is chemotherapy always required for Stage 1 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Chemotherapy is not automatically required for every Stage 1 breast cancer. The decision depends on factors including tumour biology, lymph-node findings, tumour characteristics and, in selected situations, additional genomic or molecular testing.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is surgery required for Stage 2 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery is commonly part of treatment for Stage 2 breast cancer, although the sequence may vary. Some patients receive systemic therapy before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is the main difference between Stage 2 and Stage 3 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 generally represents more extensive local or regional disease than Stage 2. Stage 3 can involve larger tumours, nearby structures or more extensive lymph-node involvement.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Stage 3 breast cancer be treated with surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Surgery can be part of Stage 3 treatment, often after systemic treatment given before surgery. Radiation and additional systemic treatment may also be required.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does Stage 4 breast cancer mean the cancer has spread?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Stage 4 breast cancer is metastatic breast cancer, meaning it has spread to distant parts of the body.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is Stage 4 breast cancer treatable?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Stage 4 breast cancer can be treated. Treatment is generally aimed at controlling the disease, reducing symptoms, maintaining quality of life and extending survival. Different systemic treatments may be used depending on the cancer subtype and previous treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does HER2 status affect breast cancer treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. HER2-positive breast cancers may be treated with HER2-directed therapies, making HER2 testing an important part of treatment planning.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does ER-positive breast cancer require hormone therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is commonly used for hormone-receptor-positive breast cancer, but the specific medicine and duration depend on the patient's individual circumstances.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast reconstruction be performed after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Reconstruction may be performed immediately or at a later stage. The timing depends on the patient's cancer treatment plan, including whether radiation is required, as well as surgical and personal considerations.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I get a second opinion for breast cancer treatment in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. A second opinion can be obtained by sharing pathology, imaging and other medical records with another breast cancer treatment team. For international patients, sending complete pathology information can be particularly useful before travelling.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Which doctors treat breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer treatment may involve several specialists, including surgical oncologists, medical oncologists, radiation oncologists, breast surgeons, radiologists, pathologists and reconstructive or plastic surgeons. The appropriate combination depends on the patient's diagnosis and treatment plan.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp GAF with your pathology reports",
    href: wa("I would like a second opinion on breast cancer treatment by stage. I can share pathology and imaging reports."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Final Takeaway",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer treatment by stage is not a simple four-step formula.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 generally involves localized disease and is commonly treated with surgery, with additional treatment based on pathology and tumour biology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 2 may involve a larger tumour and/or nearby lymph nodes. Surgery, systemic therapy and radiation may be combined depending on the individual case.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 represents more extensive local or regional disease. Treatment often involves systemic therapy before surgery, followed by surgery, radiation and additional systemic treatment where indicated.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 means metastatic breast cancer. Treatment generally focuses on systemic control of the disease, management of symptoms and maintaining quality of life, with treatment selected according to the cancer's biological characteristics and previous therapies.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most important point is that stage is only one part of the treatment decision. ER, PR, HER2, tumour grade, lymph-node status, molecular characteristics, previous treatment and the patient's overall health can all influence the final treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For the complete care pathway, hospitals and planning ranges, read [Breast Cancer Treatment in India](${PILLAR}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Start the Breast Cancer Treatment in India pathway](${consult("Breast Cancer Treatment in India")})`,
  },
];

const now = "2026-09-27T09:00:00.000Z";

const article = {
  id: "art_breast_cancer_treatment_by_stage",
  slug: "breast-cancer-treatment-by-stage",
  title: "Breast Cancer Treatment by Stage: Stage 1, 2, 3 and 4",
  excerpt:
    "How Stage 1, 2, 3 and 4 breast cancer treatment can differ — surgery, chemotherapy, radiation, hormone therapy, targeted therapy and immunotherapy — and what international patients should send before travelling to India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "breast cancer",
    "staging",
    "India",
    "HER2",
    "travel",
  ],
  image: "/uploads/articles/breast-cancer-stages-overview.png",
  imageAlt:
    "Diagram of breast cancer Stages 1 to 4, from a small localized tumour to distant organ spread",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Treatment by Stage 1, 2, 3 & 4 | India Guide",
  seoDescription:
    "Understand breast cancer treatment by stage, including Stage 1, 2, 3 and 4. Learn about surgery, chemotherapy, radiation, hormone therapy, targeted therapy and immunotherapy in India.",
  canonical: "https://gaf.healthcare/blogs/breast-cancer-treatment-by-stage",
  ogImage: "/uploads/articles/breast-cancer-stages-overview.png",
  allowIndex: true,
  keywords: [
    "Breast cancer treatment by stage",
    "Stage 1 breast cancer treatment",
    "Stage 2 breast cancer treatment",
    "Stage 3 breast cancer treatment",
    "Stage 4 breast cancer treatment",
    "breast cancer treatment in India",
    "breast cancer treatment by stage in India",
    "Stage 1 breast cancer treatment in India",
    "Stage 2 breast cancer treatment in India",
    "Stage 3 breast cancer treatment in India",
    "Stage 4 breast cancer treatment in India",
    "breast cancer surgery in India",
    "breast cancer chemotherapy",
    "breast cancer radiation therapy",
    "HER2 positive breast cancer treatment",
    "ER positive breast cancer treatment",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Lumpectomy cost in India", href: LUMPECTOMY_COST },
    { label: "Mastectomy cost in India", href: MASTECTOMY_COST },
    { label: "Chemotherapy cost in India", href: CHEMO_COST },
    { label: "Hormone therapy cost in India", href: HORMONE_COST },
    { label: "Targeted therapy cost in India", href: TARGETED_COST },
    { label: "Immunotherapy cost in India", href: IMMUNO_COST },
    { label: "Breast reconstruction cost in India", href: RECON_COST },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) {
  store.categories.push("Surgical Oncology");
}
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  {
    id: "media_bc_stages_overview",
    url: "/uploads/articles/breast-cancer-stages-overview.png",
    name: "breast-cancer-stages-overview.png",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_bc_stage_surgery",
    url: "/uploads/articles/breast-cancer-stage-surgery-options.png",
    name: "breast-cancer-stage-surgery-options.png",
    alt: "Four-card diagram of lumpectomy, mastectomy, oncoplastic surgery and sentinel lymph-node biopsy",
    addedAt: now,
  },
  {
    id: "media_bc_stage3_sequence",
    url: "/uploads/articles/breast-cancer-stage3-sequence.png",
    name: "breast-cancer-stage3-sequence.png",
    alt: "Stage 3 multimodal sequence from neoadjuvant therapy through surgery, radiation and further medicines",
    addedAt: now,
  },
  {
    id: "media_bc_subtype",
    url: "/uploads/articles/breast-cancer-subtype-treatment.png",
    name: "breast-cancer-subtype-treatment.png",
    alt: "How ER, PR, HER2 and triple-negative subtype change breast cancer treatment",
    addedAt: now,
  },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
