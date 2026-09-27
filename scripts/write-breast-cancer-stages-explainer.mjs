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
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const LUMPECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
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
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Breast cancer stage describes how extensive the cancer is. Doctors consider tumour size and local extent, nearby lymph-node involvement and whether the cancer has spread to distant organs. Stage 0 is usually non-invasive disease such as DCIS. Stages 1–3 are invasive cancers with increasing local or regional extent. Stage 4 is metastatic disease. Stage is only one part of the plan: ER, PR, HER2, grade and overall health can change treatment even when two patients share a stage.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer stage describes how extensive the cancer is in the body. Doctors primarily consider the size and extent of the breast tumour, nearby lymph-node involvement and whether the cancer has spread to distant organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer is commonly grouped into Stage 0, Stage 1, Stage 2, Stage 3 and Stage 4. Stage 0 generally refers to non-invasive disease such as ductal carcinoma in situ (DCIS), while Stages 1–3 describe invasive breast cancers with increasing local or regional extent. Stage 4 means the cancer has spread to distant parts of the body and is also called metastatic breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage is only one part of the diagnosis. Doctors also consider ER, PR and HER2 status, tumour grade, histological type, lymph-node findings, genomic or molecular information when appropriate, overall health and previous treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Treatment can include [surgery](${LUMPECTOMY_COST}), [chemotherapy](${CHEMO_COST}), [radiation therapy](${EBRT_COST}), [hormone therapy](${HORMONE_COST}), [HER2-targeted therapy](${TARGETED_COST}), [immunotherapy](${IMMUNO_COST}) or combinations of these. The same stage does not necessarily mean the same treatment for every patient. This explainer supports the [Breast Cancer Treatment in India](${PILLAR}) pathway, the [treatment-by-stage](${BY_STAGE}) guide and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your staging records",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-stages-visual.png",
    alt: "Visual sequence of breast cancer from cells confined in a duct, through a small then larger local tumour with nearby nodes, to distant spread in bone, liver, lung and brain",
    caption: "From left to right: non-invasive disease, a small invasive tumour, a larger tumour with nearby nodes, extensive regional disease, then distant organ spread.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Breast Cancer Staging?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer staging is the process doctors use to determine how far the cancer has developed or spread. A diagnosis of breast cancer provides only part of the information needed for treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors also need to understand:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "How large the primary tumour is",
      "Whether nearby lymph nodes contain cancer",
      "Whether cancer has spread beyond the breast and regional lymph nodes",
      "The biological characteristics of the tumour",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Staging brings much of this information together. In India, multidisciplinary teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) use it to:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Understand the extent of disease",
      "Plan treatment",
      "Determine whether treatment should begin with surgery or systemic therapy",
      "Decide whether radiation may be appropriate",
      "Assess whether distant disease needs treatment",
      "Communicate the diagnosis clearly between specialists",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Different Breast Cancer Stages?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer is commonly grouped into Stage 0, Stage 1, Stage 2, Stage 3 and Stage 4.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stages 1–3 are generally considered invasive breast cancer that has not spread to distant organs, although the exact extent varies considerably. Stage 4 is metastatic breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There are also more detailed subdivisions, such as Stage 1A, Stage 1B, Stage 2A, Stage 2B, Stage 3A, Stage 3B and Stage 3C. The exact stage is determined using the patient's clinical and pathological findings.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-extent-visual.png",
    alt: "Three-panel visual of contained local disease, regional spread to nearby nodes, and distant spread to other organs",
    caption: "Localized, regional and distant disease are different problems. Lymph nodes near the breast are not the same as distant metastasis.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Stage 0 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 0 generally refers to non-invasive breast cancer, most commonly ductal carcinoma in situ (DCIS). In DCIS, abnormal cells are confined to the milk ducts and have not invaded surrounding breast tissue.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Although Stage 0 is not the same as invasive breast cancer, it requires appropriate evaluation and treatment because some untreated DCIS can progress to invasive disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-conserving surgery](${LUMPECTOMY_COST})\n- [Radiation therapy](${EBRT_COST}) after breast-conserving surgery in selected cases\n- [Mastectomy](${MASTECTOMY_COST}) in selected patients\n- [Endocrine therapy](${HORMONE_COST}) for some hormone receptor-positive DCIS`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treatment depends on the extent and characteristics of the disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Stage 1 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 generally describes small invasive breast cancers with limited or no lymph-node involvement, depending on the specific substage and tumour characteristics.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 is divided into different categories, and the exact definition depends on tumour size, lymph-node findings and other staging factors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment may involve:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-conserving surgery](${LUMPECTOMY_COST})\n- [Mastectomy](${MASTECTOMY_COST})\n- Sentinel lymph node biopsy\n- [Radiation therapy](${EBRT_COST})\n- [Endocrine therapy](${HORMONE_COST})\n- [HER2-targeted therapy](${TARGETED_COST})\n- [Chemotherapy](${CHEMO_COST}) in selected patients`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The biological characteristics of the tumour are particularly important. For example, a small HER2-positive tumour may require a different systemic treatment strategy from a hormone receptor-positive, HER2-negative tumour.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether lumpectomy is possible](${consult("Breast-Conserving Surgery (Lumpectomy)")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Stage 2 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 2 generally represents a broader range of invasive breast cancers than Stage 1. The tumour may be larger, or nearby lymph nodes may be involved, depending on the specific substage.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment can include surgery, chemotherapy, radiation therapy, hormone therapy, HER2-targeted therapy and other systemic treatments where appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Some patients with Stage 2 breast cancer receive systemic treatment before surgery. This is called neoadjuvant therapy. See [treatment by stage](${BY_STAGE}) for how the sequence can change.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether treatment should start before surgery",
    href: consult("Chemotherapy"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Stage 3 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 breast cancer is generally considered locally advanced breast cancer. The cancer may involve more extensive lymph nodes, larger areas of the breast, or nearby structures or tissues in certain cases.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 is divided into several substages. Treatment often involves multiple treatment modalities.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A possible pathway may include: systemic treatment → surgery → radiation therapy → additional systemic treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact sequence depends on tumour biology, tumour size, lymph-node involvement, ER/PR status, HER2 status, response to preoperative treatment and other clinical findings.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Stage 4 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 breast cancer is also called metastatic breast cancer. It means that breast cancer has spread to distant parts of the body.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Possible sites of metastatic disease include bones, liver, lungs, brain and other distant organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 breast cancer is different from locally advanced Stage 3 disease because distant metastasis is present.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment generally focuses on systemic disease control, symptom management and maintaining quality of life.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on tumour biology, treatment may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone therapy](${HORMONE_COST})\n- [HER2-targeted therapy](${TARGETED_COST})\n- [Chemotherapy](${CHEMO_COST})\n- [Immunotherapy](${IMMUNO_COST}) in selected situations\n- Other targeted treatments\n- [Radiation therapy](${EBRT_COST}) for selected symptoms or sites of disease\n- Surgery in selected circumstances`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Discuss metastatic treatment options on WhatsApp",
    href: wa("I would like to discuss Stage 4 / metastatic breast cancer staging and treatment options in India."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the TNM Staging System?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors use the TNM system as part of breast cancer staging.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-tnm-visual.png",
    alt: "Three-panel visual of TNM staging: a measured primary tumour, a chain of regional lymph nodes, and dotted paths to distant organs",
    caption: "T is the primary tumour, N is nearby lymph nodes, and M is distant metastasis. Stage 4 is used when distant spread is established.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "TNM stands for:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**T — Tumour.** Describes the size and local extent of the primary breast tumour.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**N — Nodes.** Describes whether nearby lymph nodes contain cancer and the extent of involvement.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**M — Metastasis.** Describes whether the cancer has spread to distant organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These findings are combined with other information to determine the overall stage.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does T Mean in Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The T category describes the primary tumour. In general, doctors consider tumour size, extension into nearby structures and certain features of the tumour's local spread.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact T classification can be more detailed than simply measuring the largest dimension. This is one reason why patients should rely on the formal staging assessment rather than trying to determine their stage from tumour size alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does N Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The N category describes regional lymph-node involvement. Breast cancer may spread first to nearby lymph nodes, particularly those in the armpit.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors may assess lymph nodes through physical examination, ultrasound, needle biopsy, sentinel lymph node biopsy or axillary lymph node surgery. The pathology report after surgery may provide more definitive information.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does M Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**M0** means no evidence of distant metastasis. **M1** means distant metastasis is present. When M1 disease is established, the breast cancer is classified as Stage 4.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not every patient requires extensive testing for distant metastasis. Doctors select imaging and other investigations based on symptoms, clinical findings and the likelihood of metastatic disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Clinical Stage vs Pathological Stage",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may see terms such as clinical stage and pathological stage.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Clinical stage** is determined using information available before surgery. This can include physical examination, mammography, ultrasound, MRI, biopsy and imaging of other parts of the body when indicated.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Pathological stage** is determined using information obtained from tissue removed during surgery. This may provide more detailed information about tumour size, lymph-node involvement and tumour characteristics.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not every patient undergoes surgery, so a pathological stage is not always available.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Prognostic Staging?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern breast cancer staging can incorporate more than anatomical information. Breast cancer biology matters.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Factors such as ER status, PR status, HER2 status, tumour grade and other pathological features can influence how the cancer is classified and treated. This is why two patients with similar tumour sizes may have different treatment plans.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why ER, PR and HER2 Matter Alongside Stage",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage tells doctors where the cancer is and how extensive it is. ER, PR and HER2 provide information about what the cancer is biologically like.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**ER-positive / HER2-negative.** [Endocrine therapy](${HORMONE_COST}) may be an important part of treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**HER2-positive.** [HER2-targeted treatment](${TARGETED_COST}) may be considered.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Triple-negative.** [Chemotherapy](${CHEMO_COST}) and, in selected situations, [immunotherapy](${IMMUNO_COST}) may have important roles.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treatment plan depends on the complete diagnosis.",
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
    text: "Stage 1 vs Stage 2 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The difference between Stage 1 and Stage 2 is not simply \"small tumour versus large tumour.\"",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors consider tumour size, lymph-node involvement, tumour biology and other staging characteristics. Treatment may overlap between stages.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, both Stage 1 and Stage 2 breast cancers may be treated with surgery, but some Stage 2 cancers may require more extensive systemic treatment before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Stage 2 vs Stage 3 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 generally indicates more extensive regional disease. This can include more significant lymph-node involvement or extension into nearby tissues.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment is therefore often more intensive and commonly involves multiple modalities. However, stage alone does not determine every treatment decision. Tumour biology remains important.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Stage 3 vs Stage 4 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The key distinction is distant spread.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Stage 3.** The cancer may be extensive in the breast and regional lymph nodes but has not been established as distant metastatic disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Stage 4.** The cancer has spread to distant parts of the body. This distinction significantly changes the treatment strategy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Tumour Size Determine Breast Cancer Stage?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tumour size is important, but tumour size alone does not determine the overall stage.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A smaller tumour can have lymph-node involvement. A larger tumour may not necessarily have distant metastasis.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors consider T, N, M, biological characteristics and other relevant pathological findings. Therefore, a patient should not try to determine their stage solely from the size reported on an ultrasound or mammogram.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Lymph-Node Involvement Mean Stage 4?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Cancer in nearby lymph nodes does not automatically mean Stage 4.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Regional lymph-node involvement can occur in Stage 2 or Stage 3 breast cancer, depending on the extent. Stage 4 specifically means that the cancer has spread to distant sites.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This distinction is often important for patients who receive a pathology report showing positive lymph nodes.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Breast Cancer Stage Determined?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A typical staging pathway may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**1. Clinical assessment.** The doctor examines the breast and regional lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**2. Breast imaging.** Possible tests include mammography, ultrasound and MRI in selected situations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**3. Biopsy.** Tissue is obtained to confirm the diagnosis.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**4. Pathology.** The tumour is examined to determine histological type, grade, ER, PR, HER2 and other relevant features.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**5. Lymph-node assessment.** This may include imaging, biopsy or surgical evaluation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**6. Additional staging investigations.** These are selected according to the patient's clinical situation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**7. Multidisciplinary review.** The complete information is used to develop the treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do All Breast Cancer Patients Need a PET-CT?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. A PET-CT is not automatically required for every patient diagnosed with breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The need for additional imaging depends on stage, symptoms, clinical findings, laboratory results, suspicion of distant disease and treatment planning. Some early-stage patients may not need extensive imaging for distant metastasis. The treating team determines which investigations are appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do All Stage 4 Patients Need Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. When breast cancer is metastatic, treatment generally focuses on systemic control of the disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery may still have a role in selected circumstances, depending on symptoms, location of disease, response to systemic treatment, local complications and the individual treatment strategy. The presence of Stage 4 disease does not automatically mean that breast surgery is required.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Treatment by Stage",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-stage-pathways-visual.png",
    alt: "Visual sequence of treatment tools from local surgery, through surgery plus radiation and medicines, to systemic medicines as the main treatment when disease has spread",
    caption: "Local treatment dominates early disease. Medicines become more central as extent increases. The objects change; the biology still decides the exact mix.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 0 Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Treatment may include [breast-conserving surgery](${LUMPECTOMY_COST}), [radiation](${EBRT_COST}) in selected patients, [mastectomy](${MASTECTOMY_COST}) in selected cases, and [endocrine therapy](${HORMONE_COST}) for some hormone receptor-positive disease.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 1 Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the tumour: breast-conserving surgery or mastectomy, sentinel lymph node evaluation, radiation where indicated, endocrine therapy if hormone receptor-positive, HER2-targeted therapy if HER2-positive, and chemotherapy in selected patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 2 Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on tumour characteristics: surgery, chemotherapy, HER2-targeted therapy, radiation, endocrine therapy and other systemic treatment where appropriate. Some patients receive systemic treatment before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 3 Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment commonly involves multiple modalities, potentially including neoadjuvant systemic treatment, surgery, radiation, HER2-targeted treatment, endocrine therapy and additional systemic treatment. The exact sequence varies.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 4 Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment generally centers on systemic disease control. Depending on tumour biology: endocrine therapy, HER2-targeted therapy, chemotherapy, immunotherapy, other targeted medicines, radiation, and surgery in selected circumstances. Treatment may change as the disease responds or progresses.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For the full sequence by stage, read [Breast Cancer Treatment by Stage](${BY_STAGE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Neoadjuvant Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neoadjuvant treatment is treatment given before surgery. It can include chemotherapy, HER2-targeted therapy and endocrine therapy in selected cases.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors may recommend neoadjuvant treatment to reduce tumour size, treat microscopic disease early, treat involved lymph nodes, assess the tumour's response and help determine subsequent treatment. It is particularly relevant in some HER2-positive and triple-negative breast cancers.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Adjuvant Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Adjuvant treatment is treatment given after the main local treatment, usually surgery. Depending on the cancer, it may include chemotherapy, radiation therapy, hormone therapy, HER2-targeted therapy and other systemic treatments. The objective is to reduce the risk of cancer returning.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Stage Determine Whether Chemotherapy Is Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not by itself. Chemotherapy decisions may depend on stage, tumour size, lymph-node involvement, ER/PR status, HER2 status, tumour grade, age and general health, other pathological findings, and genomic testing in selected hormone receptor-positive cancers.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some early-stage cancers require chemotherapy, while some patients with more limited disease may not.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Stage Determine Whether Radiation Is Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage is one factor, but radiation decisions also depend on the type of surgery, tumour characteristics, lymph-node involvement, tumour size, margins and other pathological findings.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, radiation is generally an important component of breast-conserving treatment. After mastectomy, radiation is recommended for selected patients based on their risk and pathological findings.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Stage Determine Whether Hormone Therapy Is Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is primarily determined by hormone receptor status, not stage alone.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A Stage 1 ER-positive tumour may require endocrine therapy. A Stage 3 ER-positive tumour may also require endocrine therapy. A Stage 4 ER-positive tumour may be treated with endocrine therapy as part of systemic treatment. The specific medicine and treatment duration vary.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Stage Determine Whether Targeted Therapy Is Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For HER2-positive breast cancer, HER2 status is a major factor in determining whether HER2-targeted therapy may be appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treatment can differ according to stage, previous treatment, response to therapy, and whether the disease is early-stage or metastatic. Therefore, \"Stage 2 HER2-positive\" is still not enough information to identify one universal treatment regimen.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Stage and International Patients",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients seeking treatment in India, knowing the stage before travelling can help the receiving medical team understand the case.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should ideally provide:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Biopsy report",
      "Histopathology",
      "ER/PR results",
      "HER2 results",
      "Imaging reports",
      "Lymph-node information",
      "Previous treatment records",
      "Current medications",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If staging is incomplete, the Indian hospital may recommend additional investigations after arrival. GAF Healthcare coordinates this review with teams in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad).`,
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
    text: "Can Breast Cancer Stage Change?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The original stage assigned at diagnosis is generally used to describe the extent of the cancer at that time.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, the disease can later recur locally, recur regionally or spread to distant organs. A recurrence or metastatic spread is described based on the new clinical situation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should not assume that every later scan showing cancer automatically means the original stage has simply \"changed.\" The treating team should explain how the recurrence or progression is classified.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Return After Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Breast cancer can recur after treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Local** recurrence is in or near the original breast or surgical area. **Regional** recurrence is in nearby lymph nodes or tissues. **Distant** recurrence is in another part of the body and is metastatic breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treatment depends on the location, previous treatment and biological characteristics of the recurrent cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Stage 4 Breast Cancer Be Controlled?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Many patients with metastatic breast cancer receive ongoing systemic treatment to control the disease. Treatment may include hormone therapy, targeted therapy, chemotherapy, immunotherapy in selected situations, other systemic medicines and radiation for selected problems.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment may be adjusted over time based on disease response and tolerability. The goals of treatment are individualized and may include controlling cancer, managing symptoms and maintaining quality of life.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Stage and Cost of Treatment in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The stage of breast cancer can influence the overall treatment pathway and therefore the total cost. However, stage alone does not determine the price.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Cost may depend on surgery, hospital stay, chemotherapy, targeted therapy, immunotherapy, radiation therapy, hormone therapy, diagnostic testing, imaging, reconstruction, treatment duration and follow-up.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For this reason, international patients should request a case-specific quotation after medical records have been reviewed. Read [Breast Cancer Treatment Cost in India](${COST}) and the [Breast Cancer Treatment in India](${PILLAR}) pathway.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Request an itemized estimate](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Stage Affects Treatment Planning",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A simplified way to think about the treatment pathway is:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Stage 0 — treat localized non-invasive disease",
      "Stage 1 — treat localized invasive cancer and reduce recurrence risk",
      "Stage 2 — treat breast cancer with greater local/regional extent",
      "Stage 3 — treat locally advanced disease using multimodal therapy",
      "Stage 4 — treat cancer that has spread to distant organs using systemic treatment and selected local treatments",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These are broad descriptions. The actual treatment plan can be substantially different between two patients with the same stage because of tumour biology and other factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist About Your Stage",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After diagnosis, consider asking:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "What is my exact breast cancer stage?",
      "Is it Stage 0, 1, 2, 3 or 4?",
      "What is my T category?",
      "What is my N category?",
      "Is there evidence of distant metastasis?",
      "What is my ER status?",
      "What is my PR status?",
      "What is my HER2 status?",
      "What is my tumour grade?",
      "Is the cancer invasive?",
      "Are lymph nodes involved?",
      "Do I need additional staging scans?",
      "Do I need treatment before surgery?",
      "What treatments will I need after surgery?",
      "Is radiation required?",
      "Will I need hormone therapy?",
      "Will I need targeted therapy?",
      "Should I consider a second opinion?",
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
    text: "What are the stages of breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer is commonly grouped into Stage 0, Stage 1, Stage 2, Stage 3 and Stage 4. Each stage has more detailed substages based on the cancer's characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is Stage 0 actually breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 0 commonly refers to non-invasive disease such as DCIS. It is different from invasive breast cancer because abnormal cells remain confined to their original location.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is Stage 1 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 1 generally describes small invasive breast cancers with limited regional involvement. The exact classification depends on tumour and lymph-node characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is Stage 2 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 2 includes invasive breast cancers with greater tumour size and/or regional lymph-node involvement than typically seen in Stage 1, depending on the specific substage.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is Stage 3 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 generally refers to locally advanced breast cancer with more extensive regional disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is Stage 4 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 means the breast cancer has spread to distant parts of the body and is also called metastatic breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does lymph-node involvement mean Stage 4?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Cancer in nearby lymph nodes can occur in Stage 2 or Stage 3 disease. Stage 4 requires distant metastatic disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does a larger tumour always mean a higher stage?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Tumour size is important, but stage also considers lymph nodes and distant spread.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is Stage 3 breast cancer metastatic?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 3 is generally locally advanced disease. Stage 4 is metastatic disease involving distant organs.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Stage 1 breast cancer require chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some early-stage cancers have biological or pathological characteristics that make chemotherapy appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Stage 4 breast cancer be treated?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Treatment is available for metastatic breast cancer, although the treatment approach is different from that used for localized disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does breast cancer stage determine the treatment completely?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Stage is one part of treatment planning. ER, PR, HER2, tumour grade, pathology, patient factors and previous treatment also matter.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp GAF with your pathology reports",
    href: wa("I would like a second opinion on breast cancer staging. I can share pathology and imaging reports."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Stage: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer staging helps doctors understand how far the cancer has spread.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The broad stages are:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Stage 0: Non-invasive disease such as DCIS",
      "Stage 1: Early invasive disease",
      "Stage 2: Invasive disease with greater local/regional extent",
      "Stage 3: Locally advanced disease",
      "Stage 4: Metastatic disease with distant spread",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, stage is not the entire diagnosis. A complete treatment plan also considers ER, PR, HER2, tumour grade, histological type, lymph-node status, other pathological findings, patient health and previous treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients considering treatment in India, providing the complete pathology and imaging records before travel can help the treating team assess the stage and develop an appropriate treatment pathway.",
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Breast Cancer Treatment Cost in India](${COST})\n- [Breast-Conserving Surgery (Lumpectomy)](${LUMPECTOMY_COST})\n- [Lumpectomy doctors](${LUMPECTOMY_DOCTORS})\n- [Mastectomy](${MASTECTOMY_COST})\n- [Mastectomy doctors](${MASTECTOMY_DOCTORS})\n- [Breast Reconstruction](${RECON_COST})\n- [Reconstruction doctors](${RECON_DOCTORS})\n- [Chemotherapy](${CHEMO_COST})\n- [Chemotherapy doctors](${CHEMO_DOCTORS})\n- [Radiation Oncology](${EBRT_COST})\n- [Radiation doctors](${EBRT_DOCTORS})\n- [Hormone Therapy](${HORMONE_COST})\n- [Hormone therapy doctors](${HORMONE_DOCTORS})\n- [Targeted Therapy](${TARGETED_COST})\n- [Targeted therapy doctors](${TARGETED_DOCTORS})\n- [Immunotherapy](${IMMUNO_COST})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Start the Breast Cancer Treatment in India pathway](${consult("Breast Cancer Treatment in India")})`,
  },
];

const now = "2026-09-27T12:00:00.000Z";

const article = {
  id: "art_breast_cancer_stages_0_1_2_3_4",
  slug: "breast-cancer-stages-0-1-2-3-4",
  title: "What Does Breast Cancer Stage Mean? Stage 0, 1, 2, 3 and 4 Explained",
  excerpt:
    "How Stage 0, 1, 2, 3 and 4 breast cancer differ, what TNM means, why ER, PR and HER2 sit beside stage, and which records international patients should send before travelling to India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "staging", "TNM", "India", "travel"],
  image: "/uploads/articles/breast-cancer-stages-visual.png",
  imageAlt:
    "Breast cancer stages 0 1 2 3 and 4 showing tumour progression from cells in a duct through regional nodes to distant organs",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Stages 0–4 Explained | Treatment in India",
  seoDescription:
    "Understand breast cancer stages 0, 1, 2, 3 and 4, how TNM staging works, the role of ER, PR and HER2, and how stage influences treatment in India.",
  canonical: "https://gaf.healthcare/blogs/breast-cancer-stages-0-1-2-3-4",
  ogImage: "/uploads/articles/breast-cancer-stages-visual.png",
  allowIndex: true,
  keywords: [
    "breast cancer stages",
    "breast cancer stage 0",
    "stage 1 breast cancer",
    "stage 2 breast cancer",
    "stage 3 breast cancer",
    "stage 4 breast cancer",
    "breast cancer staging",
    "TNM breast cancer staging",
    "breast cancer lymph node involvement",
    "metastatic breast cancer",
    "breast cancer treatment by stage",
    "breast cancer treatment in India",
    "breast cancer stages and treatment",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Breast Cancer Treatment by Stage", href: BY_STAGE },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
    { label: "Lumpectomy cost in India", href: LUMPECTOMY_COST },
    { label: "Mastectomy cost in India", href: MASTECTOMY_COST },
    { label: "Chemotherapy cost in India", href: CHEMO_COST },
    { label: "Hormone therapy cost in India", href: HORMONE_COST },
    { label: "Targeted therapy cost in India", href: TARGETED_COST },
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
    id: "media_bc_stages_visual",
    url: "/uploads/articles/breast-cancer-stages-visual.png",
    name: "breast-cancer-stages-visual.png",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_bc_tnm_visual",
    url: "/uploads/articles/breast-cancer-tnm-visual.png",
    name: "breast-cancer-tnm-visual.png",
    alt: "TNM visual of tumour, nodes and distant organs",
    addedAt: now,
  },
  {
    id: "media_bc_extent_visual",
    url: "/uploads/articles/breast-cancer-extent-visual.png",
    name: "breast-cancer-extent-visual.png",
    alt: "Localized, regional and distant disease as three visual panels",
    addedAt: now,
  },
  {
    id: "media_bc_pathways_visual",
    url: "/uploads/articles/breast-cancer-stage-pathways-visual.png",
    name: "breast-cancer-stage-pathways-visual.png",
    alt: "Treatment tools changing as disease extent increases",
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
