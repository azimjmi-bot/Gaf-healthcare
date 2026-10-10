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
const LUMPECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Breast cancer diagnosis usually involves several steps rather than a single test. Doctors may use a clinical breast examination, mammography, ultrasound, breast MRI in selected situations, and a biopsy to determine whether an abnormal area contains cancer.</p><p class="article-quick-answer__body">A biopsy provides tissue for pathology, which identifies the type and characteristics of the cancer. Additional tests commonly include ER (estrogen receptor), PR (progesterone receptor) and HER2 testing. These results are important because they help determine which treatments are likely to be appropriate.</p><p class="article-quick-answer__body">Doctors also assess the tumour size, lymph-node involvement and whether the cancer has spread elsewhere to determine its stage. The final treatment plan may involve surgery, chemotherapy, radiation therapy, hormone therapy, targeted therapy or immunotherapy, depending on the individual diagnosis.</p><p class="article-quick-answer__body">For international patients seeking treatment in India, sending the complete pathology report, biopsy results, receptor testing and imaging records for review before travel can help the treating team understand the diagnosis and plan the next steps.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast cancer diagnosis usually involves several steps rather than a single test. Doctors may use a clinical breast examination, mammography, ultrasound, breast MRI in selected situations, and a biopsy to determine whether an abnormal area contains cancer. This explainer supports the [Breast Cancer Treatment in India](${PILLAR}) pathway, the [ER, PR and HER2](${BIOMARKERS}) guide, the [stages 0–4 explainer](${STAGES}) and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your diagnosis records",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-diagnosis-imaging-visual.png",
    alt: "Adult patient in a radiology suite with a mammography unit, ultrasound cart, MRI scanner and a clinician holding a clipboard",
    caption: "Diagnosis usually combines a clinical examination with mammography, ultrasound and, in selected cases, MRI — imaging alone does not replace a biopsy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Accurate Breast Cancer Diagnosis Matters",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast lump or abnormal mammogram does not automatically mean breast cancer. Several conditions can produce similar findings, including benign breast changes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore, doctors usually combine:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Clinical examination",
      "Breast imaging",
      "Tissue sampling when required",
      "Pathology",
      "Biomarker testing",
      "Staging investigations",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The objective is to answer several different questions:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is cancer present?",
      "What type of breast cancer is it?",
      "What are its biological characteristics?",
      "How large is the tumour?",
      "Has it reached nearby lymph nodes?",
      "Has it spread to other parts of the body?",
      "Which treatments may be appropriate?",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This information forms the foundation of the treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the First Signs That Lead to Breast Cancer Testing?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer can present in different ways. Possible signs include:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "A new lump in the breast",
      "Thickening in part of the breast",
      "Change in breast size or shape",
      "Changes in the skin",
      "Nipple inversion",
      "Nipple discharge, particularly when it is unusual or bloody",
      "Persistent breast or nipple changes",
      "A swollen lymph node in the armpit",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, some breast cancers do not cause noticeable symptoms. They may be detected through screening mammography before a person notices a change. Any new or persistent breast change should be assessed by an appropriate healthcare professional.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Step 1: Clinical Breast Examination",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The diagnostic process may begin with a physical examination. The doctor may examine both breasts, the area around the nipple, the skin, the armpit and nearby lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The doctor may ask about when the change was first noticed, whether it has changed over time, previous breast problems, previous breast biopsies, family history, previous breast imaging, and menstrual and reproductive history where relevant.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A physical examination cannot by itself confirm breast cancer. Imaging and, when indicated, biopsy provide additional information.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Step 2: Mammography",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mammography uses low-dose X-rays to produce images of the breast. It can identify abnormalities that may not be detectable by physical examination.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mammography may show masses, calcifications, changes in breast tissue, architectural distortion or other suspicious findings. The radiologist interprets the images and determines whether further evaluation is necessary.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mammography is used both in screening and in the diagnostic evaluation of breast symptoms.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Diagnostic Mammography vs Screening Mammography",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These terms can sometimes be confusing.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Screening mammography** is usually performed in people without symptoms as part of breast cancer screening according to age, risk and local recommendations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Diagnostic mammography** is performed when there is a specific concern, such as a breast lump, an abnormal screening result, a nipple change or other breast symptoms. Diagnostic imaging may include additional views or be combined with ultrasound.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Step 3: Breast Ultrasound",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast ultrasound uses sound waves to create images of breast tissue. It may be particularly useful for evaluating a lump or an abnormality seen on mammography.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ultrasound can help determine whether a lesion appears cystic, solid, complex or suspicious. It can also be used to examine nearby lymph nodes. Ultrasound is often used alongside mammography rather than necessarily replacing it.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Step 4: Breast MRI",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast MRI uses magnetic fields and contrast material in many situations to produce detailed images. It is not required for every breast cancer patient.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "MRI may be considered in selected situations, such as assessing the extent of known breast cancer, evaluating the opposite breast in selected circumstances, assessing patients with certain high-risk factors, evaluating breast implants, or clarifying findings from other imaging. The decision to perform MRI depends on the clinical situation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Send your mammogram, ultrasound or MRI for a second look](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Imaging Confirm Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Imaging can identify suspicious abnormalities, but imaging alone generally cannot provide the complete pathological diagnosis. A suspicious mass on mammography or ultrasound may require a biopsy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The biopsy allows a pathologist to examine actual tissue under a microscope. This is one of the most important steps in confirming breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Breast Biopsy?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-diagnosis-biopsy-visual.png",
    alt: "Gloved hands hold an ultrasound probe and a thin biopsy needle above skin, with a pathology cassette ready for tissue cores",
    caption: "A core needle biopsy samples tissue under imaging guidance so pathology can confirm whether cancer is present.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast biopsy removes a sample of tissue from the suspicious area. The sample is sent to a pathology laboratory for examination. Different biopsy methods may be used depending on the lesion.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common approaches include:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Core needle biopsy",
      "Fine-needle aspiration in selected situations",
      "Vacuum-assisted biopsy in selected situations",
      "Surgical biopsy in specific circumstances",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many suspicious breast lesions, a core needle biopsy is commonly used because it provides a tissue sample suitable for detailed pathological assessment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During a Core Needle Biopsy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A core biopsy is usually performed using a local anaesthetic. A typical process may involve identifying the suspicious area using imaging, cleaning the skin, giving local anaesthesia, inserting a biopsy needle, removing several small tissue samples and sending the samples to pathology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact method depends on whether the lesion is best visualized by ultrasound, mammography, MRI or another imaging technique.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does a Breast Biopsy Spread Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is a common concern. A properly performed diagnostic biopsy is an established part of breast cancer evaluation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should discuss individual concerns with their treating doctor, but avoiding a medically indicated biopsy because of fear that it will spread cancer can delay diagnosis and treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp your biopsy report to GAF](${wa("Please review my breast biopsy and pathology report for treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does the Pathology Report Tell You?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The pathology report provides information about the tissue removed during biopsy or surgery. It can help establish whether cancer is present, the cancer type, tumour grade, invasive versus non-invasive disease, hormone receptor status, HER2 status and other pathological features.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After surgery, the pathology report may contain additional information that was not available from the initial biopsy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Invasive vs Non-Invasive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "One of the first important distinctions is whether the cancer is non-invasive or invasive.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Ductal carcinoma in situ (DCIS)** is a non-invasive breast condition in which abnormal cells are confined to the milk ducts. It is often considered an early form of breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Invasive breast cancer** means cancer cells have moved beyond the structure in which they originally developed into surrounding breast tissue. Invasive breast cancers require treatment planning based on their pathology and [stage](${STAGES}).",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Common Types of Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer has several histological types. Common invasive types include invasive ductal carcinoma and invasive lobular carcinoma. There are also less common pathological types.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact type is determined by a pathologist based on the tissue sample. The type of breast cancer is only one part of the overall diagnosis.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Tumour Grade?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tumour grade describes how abnormal the cancer cells appear under a microscope and provides information about how the tumour is behaving biologically. Breast cancers are commonly assigned Grade 1, Grade 2 or Grade 3.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Grade is different from stage. This distinction is important.",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Grade describes characteristics of the cancer cells.",
      "Stage describes the extent of cancer in the body.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A cancer can therefore have a particular grade and a completely different [stage](${STAGES}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are ER and PR Tests?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-diagnosis-pathology-visual.png",
    alt: "Anatomical chest illustration with a tissue core moving into a cassette, then a microscope, then three assay wells for estrogen receptors, progesterone receptors and HER2",
    caption: "ER, PR and HER2 are read from tumour tissue. The combination helps decide whether hormone therapy or HER2-targeted treatment may have a role.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `After breast cancer is confirmed, the tumour is commonly tested for hormone receptors. The two major hormone receptors are estrogen receptor (ER) and progesterone receptor (PR). These tests help determine whether the cancer may respond to [endocrine or hormone therapy](${HORMONE_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A tumour may be ER-positive, PR-positive, both ER and PR positive, ER-negative or PR-negative. The exact interpretation depends on the pathology report. Read the full [ER, PR and HER2 explainer](${BIOMARKERS}).",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is ER Status Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Estrogen can stimulate the growth of some breast cancer cells. If a tumour has estrogen receptors, endocrine therapy may be an important part of treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common endocrine treatments include tamoxifen, anastrozole, letrozole, exemestane, and ovarian-function suppression in selected premenopausal patients. The treatment depends on factors such as menopausal status, cancer stage and recurrence risk.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether hormone therapy applies](${consult("Hormone Therapy")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is HER2?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2 stands for human epidermal growth factor receptor 2. HER2 is a protein involved in cell growth and signalling. Some breast cancers have abnormally high HER2 activity.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These cancers are referred to as HER2-positive breast cancers when they meet the relevant testing criteria. HER2 status is important because HER2-positive cancers may respond to [HER2-targeted treatment](${TARGETED_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is HER2 Tested?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2 can be assessed using laboratory tests performed on tumour tissue. One common method is immunohistochemistry (IHC). Results can be reported as 0, 1+, 2+ or 3+.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A 3+ result is generally considered HER2-positive. An IHC 2+ result is usually considered equivocal and may require additional testing, such as in situ hybridization (ISH), depending on the pathology process. The treating team should interpret the result in the context of the complete pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is HER2 Status Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2-positive breast cancer can be treated with HER2-targeted medicines. These may include trastuzumab, pertuzumab, trastuzumab emtansine, trastuzumab deruxtecan, and other HER2-directed medicines in selected situations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Which treatment is appropriate depends on the stage, previous treatment and clinical circumstances.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Targeted Therapy Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask about HER2-targeted therapy](${consult("Targeted Therapy")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Triple-Negative Breast Cancer Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer refers to breast cancer that does not express estrogen receptors, progesterone receptors or HER2.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Because these three targets are absent, hormone therapy and HER2-targeted therapy do not have the same role. Treatment may instead involve [surgery](${LUMPECTOMY_COST}), [chemotherapy](${CHEMO_COST}), [radiation](${EBRT_COST}), [immunotherapy](${IMMUNO_COST}) in selected patients, and other treatments depending on the clinical situation.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Are ER, PR and HER2 Often Discussed Together?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Test | What it assesses | Why it matters |\n| --- | --- | --- |\n| ER | Estrogen receptor | Helps determine suitability for endocrine therapy |\n| PR | Progesterone receptor | Provides additional tumour biology information |\n| HER2 | HER2 protein/gene activity | Helps determine suitability for HER2-targeted therapy |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These results are combined with tumour [stage](${STAGES}) and other pathological information to develop the treatment plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Breast Cancer Staging?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-diagnosis-staging-visual.png",
    alt: "Transparent human body showing a highlighted chest site, a lymph-node chain under the arm, and internal organs used in staging",
    caption: "Staging asks three questions: how large is the primary tumour, are nearby lymph nodes involved, and has the cancer reached distant organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Once cancer has been diagnosed, doctors determine how far it has progressed. The commonly used TNM system considers T (primary tumour), N (nearby lymph nodes) and M (distant metastasis). These findings contribute to the overall stage.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast cancer stages are generally grouped from Stage 0 through Stage 4. The [staging process](${STAGES}) helps doctors determine treatment and prognosis. Treatment itself is covered in the [treatment-by-stage](${BY_STAGE}) guide.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Breast Cancer Staged?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Staging may involve different tests depending on the patient's diagnosis. Possible investigations include physical examination, breast imaging, lymph-node evaluation, blood tests, CT scans, PET-CT, bone imaging, MRI and other investigations when clinically indicated.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not every patient needs every test. For early-stage breast cancer, extensive scans looking for distant disease may not always be necessary. The treating team decides which investigations are appropriate.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Share your staging scans with GAF",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Lymph Nodes and Why Are They Tested?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph nodes are small structures that are part of the lymphatic system. Breast cancer can spread to nearby lymph nodes, particularly those in the armpit.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors may evaluate lymph nodes using ultrasound, needle biopsy, sentinel lymph node biopsy or axillary lymph node surgery. The findings can influence cancer staging and treatment planning.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Sentinel Lymph Node Biopsy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A sentinel lymph node biopsy identifies and removes the first lymph nodes to which cancer is likely to spread from the breast. It is commonly used for selected patients with clinically node-negative breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The removed nodes are examined by a pathologist. The results help determine whether cancer has spread to the lymphatic system.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens If Cancer Is Found in the Lymph Nodes?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The presence of cancer in lymph nodes can affect staging and treatment planning. The medical team considers the number of affected nodes, the size of tumour deposits, primary tumour characteristics, ER/PR status, HER2 status and other pathological findings.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph-node involvement does not automatically mean that cancer has spread to distant organs. This distinction is important.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Metastatic Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Metastatic breast cancer, also called Stage 4 breast cancer, means the cancer has spread to distant parts of the body. Common sites can include bone, liver, lungs and brain.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Additional imaging may be required when metastatic disease is suspected. Treatment is usually focused on controlling the cancer throughout the body, managing symptoms and maintaining quality of life.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Second Pathology Opinion Be Useful?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A second pathology review can sometimes be valuable, particularly when the diagnosis is unusual, receptor results are unexpected, treatment decisions depend on a specific pathology finding, the original pathology report is incomplete, or the patient is seeking a second opinion abroad.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients, the receiving hospital may review the existing pathology material or request additional testing. Multidisciplinary teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) routinely review overseas reports before travel.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Diagnosis for International Patients Coming to India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "International patients should ideally organize their diagnostic records before travelling. A useful medical file may contain:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Pathology: biopsy report, histopathology, ER, PR, HER2, Ki-67 where reported, and other biomarker or molecular tests where performed",
      "Imaging: mammography, ultrasound, MRI, CT, PET-CT and bone imaging where applicable",
      "Previous treatment: surgery reports, chemotherapy records, radiation records and a medication list",
      "Other medical information: previous illnesses, allergies, current medicines and relevant laboratory results",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp your complete medical file before travel](${wa("I would like to send my breast cancer diagnosis records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Should International Patients Repeat All Tests in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. The Indian treating team may accept existing investigations if they are sufficiently recent, technically adequate and clinically appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, doctors may recommend repeating certain tests when reports are incomplete, imaging quality is inadequate, the treatment plan requires updated information, pathology requires confirmation, or the previous test is too old. Patients should not assume that every test will automatically need to be repeated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Biopsy Samples Be Reviewed in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes, in appropriate circumstances, a hospital may review existing pathology material. Patients should ask the receiving hospital whether they require original pathology slides, paraffin tissue blocks, digital pathology files or original reports.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If the hospital requests physical pathology material, patients should follow its instructions for safe transport and documentation. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can advise what to send.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Diagnosis Determines Treatment",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The diagnostic process ultimately leads to a treatment plan. These are examples, not universal treatment pathways.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Hormone receptor-positive breast cancer** may involve [surgery](${LUMPECTOMY_COST}), [radiation](${EBRT_COST}), [hormone therapy](${HORMONE_COST}), [chemotherapy](${CHEMO_COST}) in selected patients, and other systemic treatment where appropriate.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**HER2-positive breast cancer** may involve surgery, chemotherapy, [HER2-targeted therapy](${TARGETED_COST}), radiation, and hormone therapy if ER/PR-positive.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Triple-negative breast cancer** may involve surgery, chemotherapy, radiation and [immunotherapy](${IMMUNO_COST}) in selected settings.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Start the Breast Cancer Treatment in India pathway](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does Breast Cancer Diagnosis Take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The timeline varies depending on the number of tests required. A straightforward pathway may include imaging → biopsy → pathology → receptor testing → treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "More complex cases may require additional imaging, repeat pathology review, additional biomarker testing and multidisciplinary discussion. International patients should therefore avoid booking a very short trip based only on the assumption that diagnosis and treatment planning will be completed in a single day.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Diagnosis and Cost in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The cost of diagnosis varies according to the investigations required. Potential components include consultation, mammography, ultrasound, MRI, biopsy, histopathology, immunohistochemistry, HER2 testing, blood tests, CT/PET-CT and other staging investigations.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Not every patient requires all of these tests. The final diagnostic cost depends on the patient's symptoms, existing records and clinical findings. See the [breast cancer treatment cost guide](${COST}) for how diagnosis sits next to [surgery](${MASTECTOMY_COST}), [chemotherapy](${CHEMO_COST}) and other treatment costs.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Request a diagnosis and treatment estimate](${consult("Breast Cancer Treatment in India")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Doctor After a Breast Cancer Diagnosis",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should consider asking:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "What type of breast cancer do I have?",
      "Is it invasive or non-invasive?",
      "What is the tumour grade?",
      "What is my ER result?",
      "What is my PR result?",
      "What is my HER2 result?",
      "What is the tumour size?",
      "Are lymph nodes involved?",
      "What is my cancer stage?",
      "Do I need additional staging scans?",
      "Do I need genetic or molecular testing?",
      "Will I need surgery?",
      "Will I need chemotherapy?",
      "Will I need radiation?",
      "Will I need hormone therapy?",
      "Will I need targeted therapy or immunotherapy?",
      "Should I obtain a second pathology opinion?",
      "What should I do before travelling for treatment?",
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
    text: "Can a mammogram confirm breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A mammogram can identify suspicious abnormalities, but a biopsy is generally required to establish a tissue diagnosis.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is a biopsy always required?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "When imaging or clinical findings are suspicious for cancer, tissue sampling is commonly required to establish the diagnosis. The exact approach depends on the clinical situation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What is the difference between biopsy and pathology?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A biopsy is the process of obtaining tissue. Pathology is the examination of that tissue by a pathologist to determine what it contains and its characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What do ER and PR mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER and PR refer to estrogen and progesterone receptors. Their presence can indicate that endocrine therapy may be useful.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What does HER2-positive mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It means the breast cancer meets the accepted criteria for increased HER2 activity based on tumour testing. HER2-positive cancers may be treated with HER2-targeted medicines.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What does triple-negative breast cancer mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It means the cancer does not express estrogen receptors, progesterone receptors or HER2.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is HER2 2+ positive?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "An IHC result of 2+ is generally considered equivocal rather than definitively positive and may require additional HER2 testing.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does a breast lump always mean cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Many breast lumps are benign. However, a new or persistent lump should be evaluated by a healthcare professional.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast cancer be detected before symptoms appear?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Screening can detect some breast cancers before they produce noticeable symptoms.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can international patients send pathology reports to India before travelling?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes, hospitals and medical teams may review medical records before an international patient's arrival. The exact documents accepted and whether additional testing is required should be confirmed with the receiving hospital.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Should I bring my biopsy slides to India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Sometimes. The receiving hospital may request the original slides or tissue blocks for pathology review. Confirm this before travelling.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does every breast cancer patient need a PET-CT?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Staging investigations depend on the clinical situation. A PET-CT is not automatically required for every breast cancer patient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Diagnosis: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "An accurate breast cancer diagnosis requires more than identifying a lump or abnormal scan. The diagnostic pathway may include:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Clinical examination → Imaging → Biopsy → Histopathology → ER/PR/HER2 testing → Staging → Multidisciplinary treatment planning",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The pathology report is particularly important because it identifies the tumour's biological characteristics and helps determine which treatments may be appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients travelling to India, sending the complete medical record before travel can help the receiving medical team review the diagnosis and identify any additional tests that may be required.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Plan treatment after your diagnosis",
    href: consult("Breast Cancer Treatment in India"),
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [ER, PR and HER2 results](${BIOMARKERS})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Breast Cancer Stages 0–4](${STAGES})\n- [Breast Cancer Treatment Cost in India](${COST})\n- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})\n- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})\n- [Targeted Therapy Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})\n- [Immunotherapy Doctors in India](${IMMUNO_DOCTORS})\n- [Immunotherapy Cost in India](${IMMUNO_COST})\n- [Breast-Conserving Surgery in India](${LUMPECTOMY_COST})\n- [Lumpectomy doctors](${LUMPECTOMY_DOCTORS})\n- [Mastectomy in India](${MASTECTOMY_COST})\n- [Mastectomy doctors](${MASTECTOMY_DOCTORS})`,
  },
];

const now = "2026-09-27T14:00:00.000Z";
const SLUG = "breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  slug: SLUG,
  title: "Breast Cancer Diagnosis: Tests, Biopsy, ER, PR and HER2 Explained",
  excerpt:
    "How breast cancer is diagnosed — clinical exam, mammography, ultrasound, MRI, biopsy, pathology, ER, PR and HER2 testing, and staging — and which records international patients should send before travelling to India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "diagnosis", "biopsy", "ER", "PR", "HER2", "India", "travel"],
  image: "/uploads/articles/breast-cancer-diagnosis-imaging-visual.png",
  imageAlt:
    "Breast cancer diagnosis process showing mammography biopsy pathology ER PR and HER2 testing",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Diagnosis in India | Biopsy, ER, PR & HER2 Tests",
  seoDescription:
    "Understand breast cancer diagnosis in India, including mammography, ultrasound, biopsy, pathology, ER, PR, HER2 testing, staging and treatment planning.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-diagnosis-imaging-visual.png",
  allowIndex: true,
  keywords: [
    "breast cancer diagnosis",
    "breast cancer diagnosis in India",
    "breast cancer tests",
    "breast cancer biopsy",
    "breast cancer pathology",
    "ER PR HER2 testing",
    "HER2 test for breast cancer",
    "estrogen receptor breast cancer",
    "progesterone receptor breast cancer",
    "breast cancer staging",
    "breast cancer diagnosis for international patients",
    "breast cancer treatment in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "ER, PR and HER2 results", href: BIOMARKERS },
    { label: "Breast Cancer Treatment by Stage", href: BY_STAGE },
    { label: "Breast Cancer Stages 0–4", href: STAGES },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
    { label: "Hormone therapy cost in India", href: HORMONE_COST },
    { label: "Targeted therapy cost in India", href: TARGETED_COST },
    { label: "Chemotherapy cost in India", href: CHEMO_COST },
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
    id: "media_bc_diagnosis_imaging",
    url: "/uploads/articles/breast-cancer-diagnosis-imaging-visual.png",
    name: "breast-cancer-diagnosis-imaging-visual.png",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_bc_diagnosis_biopsy",
    url: "/uploads/articles/breast-cancer-diagnosis-biopsy-visual.png",
    name: "breast-cancer-diagnosis-biopsy-visual.png",
    alt: "Ultrasound-guided core needle biopsy with a pathology cassette",
    addedAt: now,
  },
  {
    id: "media_bc_diagnosis_pathology",
    url: "/uploads/articles/breast-cancer-diagnosis-pathology-visual.png",
    name: "breast-cancer-diagnosis-pathology-visual.png",
    alt: "Tissue from the chest wall moving through pathology to ER, PR and HER2 assays",
    addedAt: now,
  },
  {
    id: "media_bc_diagnosis_staging",
    url: "/uploads/articles/breast-cancer-diagnosis-staging-visual.png",
    name: "breast-cancer-diagnosis-staging-visual.png",
    alt: "Human body showing primary site, lymph nodes and distant organs used in staging",
    addedAt: now,
  },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

const siblingIds = [
  "art_er_pr_her2_breast_cancer_treatment_india",
  "art_breast_cancer_stages_0_1_2_3_4",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_treatment_by_stage",
];
for (const siblingId of siblingIds) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, {
      label: "Breast Cancer Diagnosis: Tests, Biopsy, ER, PR and HER2",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
