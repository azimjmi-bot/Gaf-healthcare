import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const DCIS = "/blogs/ductal-carcinoma-in-situ-dcis-treatment-india";
const ILC = "/blogs/invasive-lobular-carcinoma-treatment-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is a breast cancer pathology report?</strong> It is a report prepared by a pathologist after examining a biopsy or surgical tissue sample. It provides important information about the type and characteristics of the cancer and helps doctors plan treatment.</p><p class="article-quick-answer__body"><strong>What does tumor grade mean?</strong> Grade describes how abnormal the cancer cells look under a microscope and gives information about how quickly the cancer may grow. Breast cancers are commonly assigned Grade 1, 2 or 3 using the Nottingham grading system.</p><p class="article-quick-answer__body"><strong>What are surgical margins?</strong> Margins are the edges of the tissue removed during surgery. A negative margin means cancer cells were not found at the examined edge; a positive or involved margin means cancer cells reach the edge.</p><p class="article-quick-answer__body"><strong>What does lymphovascular invasion mean?</strong> It means cancer cells are seen inside small blood vessels or lymphatic vessels within the tumor. It can be associated with a greater risk of spread, but its presence does not by itself prove that the cancer has spread elsewhere.</p><p class="article-quick-answer__body"><strong>What does lymph-node status mean?</strong> It indicates whether cancer cells were found in the lymph nodes examined during surgery or biopsy. The number and location of affected nodes can contribute to staging and treatment decisions.</p><p class="article-quick-answer__body"><strong>What is Ki-67?</strong> Ki-67 is a marker of cell proliferation. It gives an indication of how actively cancer cells are dividing, but it should not be interpreted on its own because testing and interpretation can vary.</p><p class="article-quick-answer__body"><strong>What do ER and PR mean?</strong> ER and PR are hormone receptors. Their presence can indicate that the cancer may respond to hormone-based treatment.</p><p class="article-quick-answer__body"><strong>What does HER2 mean?</strong> HER2 is a protein that can be present at higher levels in some breast cancers. HER2 status helps determine whether HER2-targeted treatment may be appropriate.</p><p class="article-quick-answer__body"><strong>Does a high grade automatically mean Stage 3 or Stage 4 cancer?</strong> No. Grade and stage are different. Grade describes the characteristics of the cancer cells, while stage describes how extensive the cancer is in the body.</p><p class="article-quick-answer__body"><strong>Can the pathology report determine treatment by itself?</strong> Usually not. Treatment decisions combine pathology, biomarkers, imaging, stage, overall health, previous treatment and other clinical information.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A breast cancer pathology report can look intimidating. You may see terms such as invasive carcinoma, Nottingham grade, tumor size, margins, lymph nodes, lymphovascular invasion, ER, PR, HER2 and Ki-67—sometimes all on the same page. It is easy to read the report and focus on one number or one word. But breast cancer treatment is rarely decided from one result alone. Doctors use these findings, along with imaging, clinical examination and [staging](${STAGES}), to understand the cancer and plan treatment. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [diagnosis explainer](${DIAGNOSIS}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your pathology report",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your report](${wa("Please review my breast cancer pathology report and explain the next treatment steps in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pathology-lab-visual.webp",
    alt: "Breast cancer pathology report showing tumor grade margins lymph nodes ER PR HER2 and Ki-67",
    caption: "Lymph-node examination is one of the body findings that later appear on the pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Breast Cancer Pathology Report?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A pathology report is prepared after a pathologist examines a tissue sample. The sample may come from a core needle biopsy, surgical biopsy, lumpectomy or mastectomy. The pathologist examines the tissue under a microscope and may perform additional tests to identify the type and characteristics of the cancer. The final report can help establish the diagnosis, contribute to staging and guide treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For breast cancer, the report can contain considerably more information than simply saying \"cancer present.\" It may tell your treatment team the type of cancer, whether it is invasive, tumor size, tumor grade, whether lymph nodes contain cancer, whether lymphovascular invasion is present, whether the surgical margins are clear, ER, PR and HER2 status, Ki-67, and other pathological or molecular findings. Not every pathology report contains exactly the same sections.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Biopsy Report vs Surgical Pathology Report",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A biopsy usually examines a small portion of the abnormal area. A surgical specimen may contain the entire tumor and surrounding tissue. Because a larger specimen provides more tissue to examine, the final surgical pathology report may contain information that was not available from the original biopsy — more accurate tumor size, margins, lymphovascular invasion, lymph-node involvement, the extent of invasive disease and associated DCIS. This is why your final pathology report after [surgery](${SURGERY}) may look considerably longer than your original biopsy report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"Invasive Breast Cancer\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `One of the first things to look for is whether the report describes the cancer as in situ or invasive. In situ disease remains within the structure where it originated. For example, [ductal carcinoma in situ (DCIS)](${DCIS}) is confined to the milk ducts. Invasive breast cancer has grown beyond the original structure into surrounding breast tissue. The distinction matters because invasive breast cancer can have access to lymphatic and blood vessels and therefore has the potential to spread beyond the breast.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Histologic Type?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The pathology report may identify the type of breast cancer. Common types include invasive ductal carcinoma, [invasive lobular carcinoma](${ILC}), DCIS and special histologic subtypes. Invasive ductal carcinoma is the most common invasive type. Invasive lobular carcinoma begins in the milk-producing lobules and has some different pathological characteristics. The histologic type is one piece of the overall picture. It is not usually enough on its own to determine treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Tumor Size Mean?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pathology-consult-visual.webp",
    alt: "Measuring the surgical area after breast cancer surgery to compare with pathology tumor size",
    caption: "Tumor size on the report is the measured invasive component, usually in millimetres or centimetres. It is only one part of stage.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The pathology report may state the size of the invasive tumor, usually in millimetres or centimetres. For example, \"Invasive carcinoma: 18 mm\" means the measured invasive component is 18 millimetres. Tumor size contributes to the T category of breast cancer staging. It does not tell you the complete stage. Doctors also consider lymph nodes, distant spread and other factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Breast Cancer Grade Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Grade is not the same as stage. This is one of the most important distinctions to understand. Grade describes what the cancer cells look like under the microscope and how closely they resemble normal breast cells. Breast cancer commonly uses the Nottingham grading system. The pathologist evaluates tubule or gland formation, nuclear appearance and mitotic activity. Each receives a score, which is combined to produce the overall grade.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Are Grade 1, Grade 2 and Grade 3 Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Grade 1 cells generally look more similar to normal breast cells and tend to have less aggressive microscopic features. Grade 2 is intermediate — more abnormalities than Grade 1 but fewer than Grade 3. Grade 3 cells look considerably different from normal breast cells and generally have features associated with faster growth. The grade can contribute to prognosis and treatment planning, but it should always be interpreted alongside the rest of the pathology and staging information.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Grade vs Stage: What Is the Difference?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Grade asks: \"What do the cancer cells look like and how abnormal are they?\" Stage asks: \"How much cancer is there and where has it spread?\" A Grade 3 cancer is not automatically Stage 3. Likewise, a lower-grade cancer can still be advanced if it has spread beyond the breast. See [stages 0–4](${STAGES}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Nottingham Score?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may see something like \"Nottingham score: 6/9.\" The score is calculated from the three microscopic features used for grading. The usual interpretation is 3–5 for Grade 1, 6–7 for Grade 2 and 8–9 for Grade 3. These ranges are based on the standard Nottingham grading approach. A score should not be interpreted separately from tumor type, stage and biomarkers.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask what your grade and stage mean together",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about grade vs stage](${wa("My pathology report shows a grade and a stage. Please explain what they mean for treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Surgical Margins?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Margins are the edges of the tissue removed during surgery. Imagine the surgeon removes the tumor together with a surrounding area of tissue. The pathologist examines the edges of that specimen to determine whether cancer cells extend all the way to the examined edge. The exact margin assessment and its clinical meaning depend on the type of cancer and the [operation](${LUMP}) performed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does \"Negative Margin\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A negative margin generally means that cancer cells were not found at the examined surgical edge. You may also hear clear margin, clean margin or negative margin. These terms generally indicate that no cancer cells were identified at the relevant specimen edge.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does \"Positive Margin\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A positive or involved margin means cancer cells are present at the edge of the removed tissue. This can mean that additional treatment or surgery may need to be considered. The next step depends on the specific pathology, operation and treatment plan. A positive margin should not be interpreted as proof that cancer has already spread throughout the body. It is a finding about the edge of the surgical specimen.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Lymphovascular Invasion?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may see \"LVI: Present\" or \"Lymphovascular invasion: Not identified.\" Lymphovascular invasion means that cancer cells are seen within small lymphatic or blood vessels in or around the tumor. It can indicate a greater potential for cancer cells to travel outside the primary tumor. It does not automatically mean that the cancer has spread to distant organs. It is one pathological risk feature among several.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Lymph-Node Status Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph nodes are small structures that form part of the immune system. Breast cancer can spread to nearby lymph nodes, particularly those in the axilla, or underarm. A report that says \"0/3 lymph nodes involved\" generally means that three lymph nodes were examined and none contained cancer. \"2/12 lymph nodes positive\" means cancer was found in two of the 12 examined nodes. The number and location of involved nodes contribute to the N category of staging.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Does Sentinel Lymph Node Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `During some breast cancer surgeries, doctors remove one or more sentinel lymph nodes — the first nodes to which cancer cells are likely to travel from the breast. A negative sentinel-node result can provide important staging information. A positive result does not automatically mean distant metastatic disease. See [lymphedema after lymph-node treatment](${LYMPH}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about margins and lymph-node findings",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about margins or nodes](${wa("Please review my surgical margins and lymph-node status and advise on the next step in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does ER Positive Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `ER stands for estrogen receptor. If breast cancer cells have estrogen receptors, the cancer is described as ER-positive. Estrogen can stimulate the growth of hormone receptor-positive breast cancer, so patients may be candidates for [endocrine or hormone therapy](${HT}). The report may provide both the receptor status and the percentage of cells showing staining.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does PR Positive Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `PR stands for progesterone receptor. The report may state PR positive or negative, the percentage of cells positive and the intensity of staining. ER and PR are interpreted together with other features of the cancer because hormone-receptor status can influence systemic treatment. See [ER, PR and HER2 treatment](${ERPR}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does HER2 Positive Mean?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pathology-followup-visual.webp",
    alt: "Blood and tissue biomarker testing for ER PR HER2 and Ki-67 after a breast cancer diagnosis",
    caption: "ER, PR, HER2 and Ki-67 are measured on the tumor tissue. Blood tests may support the overall work-up but do not replace the pathology report.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `HER2 stands for human epidermal growth factor receptor 2. Some breast cancers have higher levels of HER2 or increased HER2 gene activity and may be eligible for [HER2-targeted treatments](${HER2}). Testing can involve immunohistochemistry, commonly reported as 0, 1+, 2+ or 3+. A 2+ result may require additional testing, such as in-situ hybridisation. Interpret HER2 using the complete report rather than a single number.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Ki-67?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ki-67 is a marker of cell proliferation. It gives an indication of how many tumor cells are actively going through the cell cycle and dividing. You may see a result such as Ki-67: 15% or Ki-67: 40%. A higher percentage generally indicates greater proliferative activity. Ki-67 is one of the more frequently misunderstood parts of a breast cancer report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does a High Ki-67 Mean Aggressive Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not by itself. Higher Ki-67 can be associated with faster-growing cancer, but there is no single universally reliable Ki-67 cutoff that works for every patient and every laboratory. ASCO has noted limitations in the standardisation and interpretation of Ki-67, particularly for intermediate values. A result such as 25% should not automatically be labelled \"high risk\" without considering ER, PR, HER2, grade, tumor size, lymph-node status, stage and other genomic or molecular tests.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask how ER, PR, HER2 and Ki-67 affect treatment",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about biomarkers](${wa("Please explain my ER, PR, HER2 and Ki-67 results and what they mean for treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Tumor Necrosis?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some pathology reports mention necrosis. Necrosis means that some tumor tissue has died. It can sometimes be described in association with particular tumor types or pathological patterns. Its significance depends on the overall pathology rather than simply whether the word \"necrosis\" appears.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"No Lymphovascular Invasion Identified\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is generally a favorable pathological finding compared with the presence of lymphovascular invasion. It means the pathologist did not identify cancer cells within the lymphatic or blood vessels examined in the specimen. It does not guarantee that cancer has not spread elsewhere. Staging still requires consideration of lymph nodes, imaging and other clinical information.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"No DCIS Identified\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS stands for ductal carcinoma in situ. Some invasive breast cancers occur alongside an area of DCIS. If the report says no DCIS is identified, it means the pathologist did not find DCIS in the examined specimen. This does not change the diagnosis of invasive cancer if invasive cancer is already present.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"Invasive Component\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If a report says \"Invasive carcinoma: 15 mm,\" the 15 mm measurement refers to the invasive portion of the tumor. There may also be a larger area of associated DCIS. This distinction can matter when interpreting the pathology and staging.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"Multifocal\" or \"Multicentric\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These terms describe more than one tumor focus. Multifocal generally means multiple tumor areas within the same region or quadrant of the breast. Multicentric generally refers to tumors occurring in different areas or quadrants. The distinction can influence surgical planning, although treatment decisions depend on the complete clinical picture.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does \"Unifocal\" Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Unifocal means that one main tumor focus was identified. This is generally straightforward, but it is only one component of the pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Perineural Invasion?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some pathology reports may mention perineural invasion. This means cancer cells are seen surrounding or involving a nerve. It is less commonly emphasised in routine breast cancer reports than tumor size, grade, lymph nodes, margins and receptor status. If it appears on your report, ask your oncologist or pathologist how it affects your specific case.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Biomarkers in Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Biomarkers are measurable features of cancer cells that can provide information about the disease and potential treatment options. Important breast cancer biomarkers include ER, PR, HER2 and Ki-67. Depending on the clinical situation, additional molecular or genomic testing may also be considered. NCI notes that biomarker testing is an important part of evaluating breast cancer and can help guide treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Genomic Tests Such as Oncotype DX?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients with certain types of early-stage breast cancer may undergo genomic testing. Examples include Oncotype DX, MammaPrint, Prosigna and EndoPredict. These tests examine the activity of multiple genes. They are not required for every patient. In selected situations, they can help doctors estimate recurrence risk or determine whether chemotherapy is likely to provide meaningful benefit.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Pathology Report Tell You the Exact Treatment You Need?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not by itself. A report might show ER positive, PR positive, HER2 negative, Grade 2 and a tumor of 18 mm. That is useful information. An oncologist still needs to consider age, menopausal status, lymph-node findings, stage, medical history, imaging and other factors. The pathology report is a major part of the decision-making process — not the entire decision.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Should You Keep Your Original Pathology Slides and Tissue Blocks?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pathology-team-visual.webp",
    alt: "Clinician showing lymph-node locations on the body before a pathology second opinion",
    caption: "Bring slides, blocks and the full report if you want another cancer centre to review the same tissue.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is particularly useful when seeking a second opinion. A cancer centre may request the original pathology report, pathology slides, paraffin-embedded tissue blocks, immunohistochemistry reports and molecular test reports. The American Cancer Society notes that pathology material can sometimes be sent to another centre for review. This is especially relevant for international patients who may later travel for treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Pathology Report Be Reviewed Again?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. A second pathologist can review the original tissue when the diagnosis is unusual, the pathology is complicated, treatment recommendations are unclear, the patient is seeking a second opinion, or the original report does not match the clinical findings. A second review does not necessarily mean the first report was wrong. Pathology interpretation can be complex, particularly in unusual tumors or borderline findings. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can review original slides before recommending a change in plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Bring to India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If you are travelling to India for breast cancer treatment, bring the complete diagnostic record rather than only the latest report. Carry the original biopsy report, surgical pathology, ER, PR, HER2 and Ki-67 reports, genomic testing if performed, slides or tissue blocks when available, mammography, ultrasound and MRI reports, CT or PET-CT reports, the actual imaging files, the operative report, chemotherapy records, radiation summary, current medicines and previous treatment response. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can coordinate pathology review with surgical oncology, medical oncology and radiation oncology before a treatment plan is confirmed.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send slides and reports before you travel",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your pathology records](${wa("I would like to send my breast cancer pathology report, slides and imaging for review in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How GAF Healthcare Can Help International Breast Cancer Patients",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients, the pathology report is often one of the first documents an oncology team needs to review. GAF Healthcare can coordinate the collection of medical records and help patients connect with appropriate cancer specialists in India for evaluation. Depending on the diagnosis, this may involve surgical oncology, medical oncology, radiation oncology, breast imaging, pathology review and genetic or molecular testing.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Is Grade 3 breast cancer the same as Stage 3?", "No. Grade describes the microscopic appearance and behavior of the cancer cells. Stage describes how extensive the cancer is and whether it has spread. They are separate concepts."],
    ["Is a positive margin the same as metastatic cancer?", "No. A positive margin means cancer cells were found at the edge of the removed surgical tissue. It does not mean that cancer has spread to distant organs."],
    ["Is lymphovascular invasion the same as lymph-node metastasis?", "No. Lymphovascular invasion means cancer cells were seen in lymphatic or blood vessels within the tumor. Lymph-node metastasis means cancer cells were found in lymph nodes. They are different pathological findings."],
    ["Is high Ki-67 always bad?", "Ki-67 provides information about cell proliferation, but it should not be interpreted alone. The reliability and clinical usefulness of intermediate Ki-67 values can be limited."],
    ["Can ER-positive breast cancer be treated with hormone therapy?", "Hormone receptor-positive breast cancers may be treated with endocrine therapy when clinically appropriate. The specific medicine depends on menopausal status, stage and previous treatment."],
    ["What does HER2 2+ mean?", "HER2 2+ on immunohistochemistry is generally considered an equivocal result and may require additional testing to determine HER2 status."],
    ["Does a negative lymph node mean the cancer cannot spread?", "No. Negative lymph nodes are an important finding, but they do not guarantee that recurrence or distant spread is impossible."],
    ["Should I get a second pathology opinion?", "It can be useful in selected situations, particularly when the diagnosis is unusual, the treatment plan is unclear or you are seeking care at another cancer centre."],
    ["Can I bring my pathology slides to India?", "Yes. Patients can ask their original hospital or pathology laboratory about obtaining slides or tissue blocks for review."],
    ["Which part of the pathology report is most important?", "There is no single section that is universally most important. Tumor type, size, grade, margins, lymph-node status, ER, PR, HER2 and other findings are interpreted together."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Pathology Report: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer pathology report is much more than a diagnosis. Grade 3 does not automatically mean Stage 3. Lymphovascular invasion does not automatically mean metastatic cancer. A positive margin does not mean cancer has spread throughout the body. A high Ki-67 should not be interpreted on its own. Look at the entire picture. If you are travelling to India, keep the original reports, imaging, treatment records and — when available — slides or tissue blocks.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer treatment in India using my pathology report.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Diagnosis and biopsy](${DIAGNOSIS})\n- [ER, PR and HER2](${ERPR}) · [HER2-positive treatment](${HER2})\n- [Hormone therapy](${HT})\n- [Stages 0–4](${STAGES})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP})\n- [DCIS](${DCIS}) · [invasive lobular carcinoma](${ILC})\n- [Follow-up tests](${FOLLOW}) · [recurrence](${RECUR})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS}) · [hormone-therapy doctors](${HT_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-28T00:30:00.000Z";
const SLUG = "breast-cancer-pathology-report-explained";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_pathology_report_explained",
  slug: SLUG,
  title: "Breast Cancer Pathology Report Explained: Grade, Margins, Lymphovascular Invasion, Ki-67 and More",
  excerpt:
    "How to read grade, margins, lymph nodes, lymphovascular invasion, ER, PR, HER2 and Ki-67 on a breast cancer pathology report before you travel for treatment.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "pathology", "biomarkers", "diagnosis", "India", "travel"],
  image: "/uploads/articles/pathology-lab-visual.webp",
  imageAlt: "Breast cancer pathology report showing tumor grade margins lymph nodes ER PR HER2 and Ki-67",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Pathology Report Explained: Grade, Margins, Ki-67 & More",
  seoDescription:
    "Understand your breast cancer pathology report, including tumor grade, margins, lymph nodes, lymphovascular invasion, ER, PR, HER2 and Ki-67.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pathology-lab-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer pathology report",
    "breast cancer pathology report explained",
    "breast cancer pathology report meaning",
    "breast cancer grade",
    "Nottingham grade breast cancer",
    "breast cancer margins",
    "positive margin breast cancer",
    "negative margin breast cancer",
    "lymphovascular invasion breast cancer",
    "lymph node status breast cancer",
    "Ki-67 breast cancer",
    "ER positive breast cancer",
    "PR positive breast cancer",
    "HER2 positive breast cancer",
    "breast cancer pathology report India",
    "breast cancer pathology second opinion",
  ],
  relatedLinks: [
    { label: "Diagnosis and biopsy", href: DIAGNOSIS },
    { label: "ER, PR and HER2", href: ERPR },
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Stages 0–4", href: STAGES },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  "art_er_pr_her2_breast_cancer_treatment_india",
  "art_breast_cancer_stages_0_1_2_3_4",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Pathology report explained", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
