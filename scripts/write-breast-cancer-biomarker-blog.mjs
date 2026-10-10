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
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">ER, PR and HER2 are biological markers used to classify breast cancer and guide treatment. ER means estrogen receptors, PR means progesterone receptors, and HER2 means human epidermal growth factor receptor 2. An ER-positive/HER2-negative cancer may be treated with endocrine therapy. A HER2-positive cancer may be considered for HER2-targeted treatment. A tumour can be both hormone receptor-positive and HER2-positive. These results do not replace stage, grade, lymph-node findings or overall health.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER, PR and HER2 are important biological markers used to classify breast cancer and guide treatment. ER refers to estrogen receptors, PR to progesterone receptors, and HER2 to human epidermal growth factor receptor 2.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer may be ER-positive, PR-positive, HER2-positive, or have different combinations of these markers. These results help doctors determine whether treatments such as hormone therapy or HER2-targeted therapy may be appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For example, an ER-positive/HER2-negative cancer may be treated with [endocrine therapy](${HORMONE_COST}), while a HER2-positive cancer may be considered for [HER2-targeted treatment](${TARGETED_COST}). A cancer can also be both hormone receptor-positive and HER2-positive, in which case more than one type of systemic treatment may have a role.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `ER, PR and HER2 results do not determine the complete treatment plan by themselves. Doctors also consider tumour size, lymph-node involvement, [stage](${STAGES}), tumour grade, menopausal status, previous treatment and other pathological findings. This explainer supports the [Breast Cancer Treatment in India](${PILLAR}) pathway, the [treatment-by-stage](${BY_STAGE}) guide and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your ER, PR and HER2 report",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-receptors-visual.png",
    alt: "Three circular medical panels showing estrogen-receptor locks, progesterone-receptor locks, and tall HER2 surface spikes on a cell membrane",
    caption: "ER and PR are lock-like hormone receptors. HER2 is a growth-signal protein on the cell surface. The three results are read together.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are ER, PR and HER2 in Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer is not a single disease. Two patients can both be diagnosed with breast cancer but have very different tumour biology and therefore require different treatment approaches.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Three of the most important biomarkers routinely discussed in breast cancer are:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "ER — Estrogen Receptor",
      "PR — Progesterone Receptor",
      "HER2 — Human Epidermal Growth Factor Receptor 2",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These markers are usually assessed using tissue obtained through a biopsy or surgery. The results help the oncology team understand how the cancer cells behave and which treatments may be useful.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In India, multidisciplinary teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) use these results together with stage and pathology to plan treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does ER-Positive Breast Cancer Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER-positive breast cancer means that the cancer cells have estrogen receptors. Estrogen can stimulate the growth of some breast cancer cells.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `When a tumour is ER-positive, treatment that interferes with estrogen signalling may be useful. This is known as endocrine therapy or [hormone therapy](${HORMONE_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common endocrine treatments include tamoxifen, anastrozole, letrozole, exemestane, and ovarian-function suppression in selected premenopausal patients.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact treatment depends on factors such as age, menopausal status, cancer stage, recurrence risk and previous treatment.",
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
    text: "What Does PR-Positive Breast Cancer Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "PR stands for progesterone receptor. A PR-positive result means the cancer cells have progesterone receptors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "PR status is interpreted alongside ER status and other tumour characteristics. For example, a pathology report may describe a tumour as ER-positive / PR-positive, ER-positive / PR-negative, ER-negative / PR-positive, or ER-negative / PR-negative.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The combination provides information about the biological characteristics of the tumour.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Hormone Receptor-Positive Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may hear doctors use the term hormone receptor-positive breast cancer. This generally refers to breast cancer that expresses estrogen receptors and/or progesterone receptors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore: ER-positive and/or PR-positive → hormone receptor-positive. This distinction is important because hormone receptor-positive breast cancers may respond to endocrine treatment.",
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
    text: "HER2 is a protein involved in signalling that helps cells grow and divide. Some breast cancers have abnormally increased HER2 activity.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These cancers are classified as HER2-positive when they meet the relevant testing criteria. HER2 status is important because HER2-positive breast cancers may respond to medicines specifically designed to [target the HER2 pathway](${TARGETED_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Targeted Therapy Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Are ER, PR and HER2 Tested?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-biomarker-testing-visual.png",
    alt: "Visual process from a core-needle biopsy and tissue cassette, through a microscope and stain scores, to a report that guides medicine or surgery",
    caption: "The markers are read from tumour tissue. Equivocal HER2 stains may need a second laboratory method before treatment is chosen.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These biomarkers are generally assessed using tumour tissue. The tissue may come from a core needle biopsy, other biopsy procedures, or breast surgery.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The pathology laboratory examines the tumour and performs the relevant tests.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "ER and PR",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER and PR are commonly evaluated using immunohistochemistry (IHC). The report may provide a percentage of tumour cells showing receptor expression and an intensity or scoring description.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "HER2",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2 is commonly assessed using IHC. Results may be reported as 0, 1+, 2+ or 3+.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "An IHC 3+ result is generally considered HER2-positive. An IHC 2+ result is usually considered equivocal and may require additional testing, such as in situ hybridization (ISH). The final interpretation should come from the pathology report and treating team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Are ER, PR and HER2 So Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These results can directly affect treatment decisions.",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "ER-positive may indicate a role for endocrine therapy.",
      "PR-positive provides additional information about hormone receptor biology.",
      "HER2-positive may indicate a role for HER2-targeted therapy.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The results are combined with other information to create the treatment plan. Doctors do not generally decide treatment based on one biomarker alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Common ER, PR and HER2 Combinations",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer can have different combinations of these biomarkers.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| ER | PR | HER2 | General biological classification |\n| --- | --- | --- | --- |\n| Positive | Positive | Negative | Hormone receptor-positive, HER2-negative |\n| Positive | Negative | Negative | Hormone receptor-positive, HER2-negative |\n| Negative | Positive | Negative | Hormone receptor-positive based on PR expression |\n| Positive | Positive | Positive | Hormone receptor-positive and HER2-positive |\n| Positive | Negative | Positive | Hormone receptor-positive and HER2-positive |\n| Negative | Negative | Positive | HER2-positive |\n| Negative | Negative | Negative | Triple-negative |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This table is a simplified explanation. The treating team may also consider additional pathological and molecular information.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-biomarker-pathways-visual.png",
    alt: "Four visual treatment pathways: hormone-receptor disease with pills, HER2-positive disease with a targeted vial, dual biology with both medicines, and triple-negative disease with a drip and shield",
    caption: "Hormone therapy, HER2-directed medicines, both together, or chemotherapy with selected immunotherapy — the pathway follows the receptor pattern.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER-Positive, PR-Positive, HER2-Negative Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is a common biological category of breast cancer. The cancer expresses hormone receptors but does not meet the criteria for HER2-positive disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Treatment may include [surgery](${LUMPECTOMY_COST}), [radiation therapy](${EBRT_COST}), [endocrine therapy](${HORMONE_COST}), [chemotherapy](${CHEMO_COST}) in selected patients, and other systemic treatments depending on the individual case.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Endocrine therapy is an important component for many patients with hormone receptor-positive disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER-Positive, PR-Negative, HER2-Negative Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A tumour does not have to be positive for both ER and PR to be considered hormone receptor-positive. If the tumour is ER-positive but PR-negative, endocrine therapy may still have an important role.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The oncology team will consider ER expression, PR expression, HER2 status, tumour grade, tumour size, lymph-node status, stage and other pathological features. Therefore, a PR-negative result does not automatically mean that hormone therapy will not work.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER-Negative, PR-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER-negative/PR-positive results are less common. When this pattern appears, the pathology and clinical context may need careful review.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treating team may consider whether additional testing or pathology review is appropriate. Patients should avoid interpreting one receptor result independently from the rest of the pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER-Positive, HER2-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer can be both hormone receptor-positive and HER2-positive. This is an important distinction.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Such a tumour may have two relevant treatment pathways: endocrine treatment because of hormone receptor expression, and HER2-targeted treatment because of HER2 positivity.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the stage and other factors, treatment may also include chemotherapy, surgery and radiation therapy. The exact sequence depends on the individual case.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask how dual-positive disease is treated",
    href: consult("Targeted Therapy"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER-Negative, PR-Negative, HER2-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This tumour does not express ER or PR but meets the criteria for HER2-positive disease. HER2-targeted treatment may therefore be an important part of systemic treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on stage and treatment setting, chemotherapy, surgery and radiation may also be involved.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Triple-Negative Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer is generally defined by the absence of estrogen receptors, progesterone receptors and HER2.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Because these three targets are absent, endocrine therapy and standard HER2-targeted therapy do not have the same role. Treatment can include [chemotherapy](${CHEMO_COST}), surgery, [radiation therapy](${EBRT_COST}), [immunotherapy](${IMMUNO_COST}) in selected situations, and other systemic treatment where appropriate.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})\n- [Immunotherapy Doctors in India](${IMMUNO_DOCTORS})\n- [Immunotherapy Cost in India](${IMMUNO_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask about triple-negative treatment options](${consult("Immunotherapy")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ER/PR/HER2 Status Determine the Stage?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-cancer-biomarker-vs-stage-visual.png",
    alt: "Split visual: a cell with receptors and medicines on the left, and a torso with local, nodal and distant organ spread on the right",
    caption: "Biology describes what the tumour is like. Stage describes how far it has spread. Both are needed for a treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. This is an important distinction. Biomarker status and cancer stage are different things.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Biomarkers** describe biological characteristics of the tumour. **[Stage](${STAGES})** describes how extensive the cancer is — tumour size, lymph-node involvement and distant spread.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A patient can therefore have Stage 1, 2, 3 or 4 ER-positive cancer. The treatment plan can be very different even though the tumour has the same receptor status.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ER/PR/HER2 Status Affect Breast Cancer Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. These results are important components of treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER-positive / HER2-negative disease may include endocrine therapy. HER2-positive disease may include HER2-targeted treatment. Triple-negative disease may rely more heavily on chemotherapy and, in selected situations, immunotherapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, these are broad categories rather than individual treatment prescriptions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER, PR and HER2 Results After a Biopsy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The initial biopsy may establish the diagnosis and provide receptor information. However, surgery can provide additional tissue for pathology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The surgical pathology report may provide information about final tumour size, histological type, tumour grade, lymph-node status, margins, ER, PR, HER2 and other pathological features.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Sometimes additional testing or review is necessary after surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can HER2 Results Change Between Biopsy and Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Biological characteristics can sometimes show differences between samples. This is one reason pathology is an important part of ongoing treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If there is an unexpected result or a result that does not fit the overall clinical picture, doctors may consider repeat or confirmatory testing. Patients should discuss any difference between biopsy and surgical pathology with their treating oncologist and pathologist.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Role of Ki-67?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ki-67 is a marker of cell proliferation. It can provide information about how actively tumour cells are dividing. It may appear on a breast cancer pathology report.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, Ki-67 is different from ER, PR and HER2. It should not be interpreted in isolation. Its clinical usefulness can vary depending on the specific treatment situation and laboratory methodology.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ER/PR/HER2 and Breast Cancer Treatment by Stage",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 0",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Stage 0 includes non-invasive disease such as DCIS. Treatment may involve [breast-conserving surgery](${LUMPECTOMY_COST}), [mastectomy](${MASTECTOMY_COST}) in selected situations, [radiation](${EBRT_COST}) after breast-conserving surgery, and endocrine therapy in selected hormone receptor-positive cases.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 1",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Early-stage invasive breast cancer may be treated with surgery, radiation where indicated, endocrine therapy if hormone receptor-positive, HER2-targeted treatment if HER2-positive, and chemotherapy in selected patients. The exact treatment depends on tumour size, biology and other risk factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 2",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 2 disease may require a combination of surgery, chemotherapy, HER2-targeted therapy, radiation and endocrine therapy. The sequence may vary. Some patients receive systemic therapy before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 3",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Locally advanced breast cancer often requires multimodal treatment. Depending on tumour biology, treatment may involve systemic therapy before surgery, surgery, radiation, endocrine therapy, HER2-targeted therapy and other systemic treatments. The exact sequence is individualized.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Stage 4",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 breast cancer has spread to distant parts of the body. Treatment is primarily systemic and depends heavily on tumour biology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone receptor-positive disease may receive endocrine-based treatment. HER2-positive disease may receive HER2-directed treatment. Triple-negative disease may be treated with chemotherapy and selected immunotherapy or other systemic approaches. Treatment can change over time depending on response and disease progression.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For how stage changes the sequence, read [Breast Cancer Stages 0–4](${STAGES}) and [treatment by stage](${BY_STAGE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does Hormone Therapy Work in ER-Positive Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy aims to reduce the ability of estrogen to stimulate cancer cells. Depending on the medicine, it may block estrogen receptors, reduce estrogen production, or suppress ovarian estrogen production.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Tamoxifen** blocks estrogen's effects in breast tissue.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Aromatase inhibitors** such as anastrozole, letrozole and exemestane reduce estrogen production and are commonly used in postmenopausal patients.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Ovarian-function suppression** may be used in selected premenopausal patients, sometimes together with another endocrine medicine.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does HER2-Targeted Therapy Work?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2-targeted medicines are designed to interfere with HER2-driven signalling. Examples include trastuzumab, pertuzumab, trastuzumab emtansine and trastuzumab deruxtecan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The medicine used depends on the treatment setting. For example, the treatment of newly diagnosed early-stage disease can differ substantially from treatment of metastatic disease that has already received HER2-directed therapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Patient Receive Both Hormone Therapy and HER2-Targeted Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. This can occur when a breast cancer is both hormone receptor-positive and HER2-positive. The patient may receive a treatment plan that addresses both biological pathways.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the stage, this can include chemotherapy + HER2-targeted therapy + surgery + radiation + endocrine therapy. Not every patient needs all of these treatments.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does the Treatment Team Decide What Comes First?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment sequencing depends on stage, tumour size, lymph-node involvement, ER/PR status, HER2 status, tumour grade, the patient's health, menopausal status, planned surgery, need for radiation and previous treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients undergo surgery first. Others receive systemic treatment before surgery. This is known as neoadjuvant treatment.",
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
    text: "Why Is Neoadjuvant Treatment Used?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neoadjuvant treatment is treatment given before the main local treatment, usually surgery. It may include chemotherapy, HER2-targeted therapy and endocrine therapy in selected situations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential reasons include shrinking the tumour, treating microscopic disease early, assessing treatment response and helping determine subsequent treatment. The decision depends on the patient's specific cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Hormone Receptor Status Affect Chemotherapy Decisions?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can be one of several factors considered. Doctors may evaluate ER/PR status, HER2 status, tumour size, grade, lymph nodes, menopausal status and other pathological or genomic information where appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For some hormone receptor-positive, HER2-negative cancers, additional genomic testing may help inform chemotherapy decisions. Whether such testing is useful depends on the individual clinical situation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do All ER-Positive Patients Need Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. ER-positive breast cancer can range from very small, lower-risk tumours to more advanced or biologically aggressive cancers. Chemotherapy decisions depend on multiple factors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients may receive surgery, radiation and endocrine therapy, while others may require chemotherapy as well. The treatment plan should be based on the complete pathology and clinical assessment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do All HER2-Positive Patients Need the Same Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. HER2-positive breast cancer includes different clinical situations. Treatment can vary according to tumour size, lymph-node status, stage, whether treatment is before or after surgery, previous HER2-targeted therapy, and whether the disease is metastatic.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore, the term \"HER2-positive\" alone is not enough to determine the entire treatment regimen.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Know About ER, PR and HER2?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For patients travelling to India for treatment, these reports are particularly important. Before travelling, collect:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Biopsy report",
      "Histopathology report",
      "ER result",
      "PR result",
      "HER2 result",
      "HER2 confirmatory testing if performed",
      "Imaging reports",
      "Previous surgery reports",
      "Chemotherapy records",
      "Radiation records",
      "Previous targeted therapy",
      "Current medicines",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The Indian treating team can use these records to understand the previous diagnosis and treatment. GAF Healthcare coordinates this review with teams in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp your pathology for a biomarker review",
    href: wa("I would like a review of my ER, PR and HER2 breast cancer report for treatment in India."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Should International Patients Repeat ER, PR and HER2 Testing in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. The treating hospital may accept existing reports.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, repeat or confirmatory testing may be considered if the report is incomplete, the testing methodology is unclear, the result is equivocal, the result is unexpected, the treatment decision depends on confirmation, or the pathology material needs specialist review.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should ask the receiving hospital before travelling whether additional testing is expected.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does an ER/PR/HER2 Pathology Report Look Like?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A simplified report might contain information such as:",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Marker | Example result |\n| --- | --- |\n| ER | Positive |\n| PR | Positive |\n| HER2 IHC | 0 / 1+ / 2+ / 3+ |\n| HER2 ISH | If required |\n| Tumour grade | Grade 1, 2 or 3 |\n| Histological type | e.g. invasive carcinoma |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact format varies between laboratories. A patient should have the complete report interpreted by the treating medical team rather than relying on one line.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After receiving the pathology report, consider asking:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is my cancer ER-positive or ER-negative?",
      "Is it PR-positive or PR-negative?",
      "What is my HER2 result?",
      "Does my HER2 result require confirmatory testing?",
      "What is my tumour grade?",
      "What is my cancer stage?",
      "Are lymph nodes involved?",
      "Is my cancer hormone receptor-positive?",
      "Is my cancer HER2-positive?",
      "Do I need hormone therapy?",
      "Do I need HER2-targeted therapy?",
      "Do I need chemotherapy?",
      "Will I need radiation therapy?",
      "Should I have genomic or molecular testing?",
      "Should I have a pathology second opinion?",
      "What treatment should happen first?",
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
    text: "What does ER-positive breast cancer mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It means the cancer cells express estrogen receptors. Endocrine therapy may therefore be an important part of treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What does PR-positive breast cancer mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It means the cancer cells express progesterone receptors. PR status is interpreted alongside ER, HER2 and other tumour characteristics.",
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
    text: "It means the tumour meets accepted criteria for increased HER2 activity based on pathology testing. HER2-targeted medicines may therefore be considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast cancer be ER-positive and HER2-positive?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. A tumour can express hormone receptors and also be HER2-positive.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast cancer be ER-positive but PR-negative?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. ER and PR are separate biomarkers, so they can have different results.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What does triple-negative mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer lacks estrogen receptors, progesterone receptors and HER2 according to the relevant testing criteria.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does HER2-positive mean the cancer is Stage 4?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. HER2 status and stage are different characteristics. A HER2-positive cancer can be diagnosed at an early stage or at an advanced stage.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does ER-positive mean the cancer is less serious?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER status alone cannot determine how serious a cancer is. Stage, tumour biology and multiple other factors are important.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does every ER-positive patient need hormone therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Endocrine therapy is commonly considered for hormone receptor-positive breast cancer, but the final treatment plan depends on the individual clinical situation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does every HER2-positive patient need trastuzumab?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Trastuzumab has an important role in many HER2-positive breast cancer treatment settings, but whether it is appropriate and how it is used depends on the individual diagnosis and previous treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can ER, PR or HER2 status change?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tumour biology can sometimes differ between samples or between the original tumour and recurrent/metastatic disease. When clinically appropriate, doctors may recommend reassessment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can international patients have their pathology reviewed in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. A hospital may review pathology reports and, where necessary, the original slides or tissue blocks.",
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
    text: "ER, PR and HER2: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER, PR and HER2 are among the most important biomarkers used in breast cancer treatment planning.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**ER** indicates estrogen receptor expression and can identify patients who may benefit from endocrine therapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**PR** provides additional information about hormone receptor biology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**HER2** identifies cancers that may benefit from HER2-targeted treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Importantly, these markers should never be interpreted separately from cancer stage and the rest of the pathology report.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A complete breast cancer treatment plan may involve surgery, chemotherapy, radiation therapy, hormone therapy, HER2-targeted therapy and immunotherapy in selected situations. The combination and sequence depend on the individual patient.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients considering treatment in India, sending the complete pathology and imaging records before travel can help the receiving oncology team understand the diagnosis and plan the next steps.",
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Breast Cancer Stages 0–4](${STAGES})\n- [Breast Cancer Treatment Cost in India](${COST})\n- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})\n- [Targeted Therapy Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})\n- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})\n- [Immunotherapy Doctors in India](${IMMUNO_DOCTORS})\n- [Immunotherapy Cost in India](${IMMUNO_COST})\n- [Breast-Conserving Surgery in India](${LUMPECTOMY_COST})\n- [Lumpectomy doctors](${LUMPECTOMY_DOCTORS})\n- [Mastectomy in India](${MASTECTOMY_COST})\n- [Mastectomy doctors](${MASTECTOMY_DOCTORS})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Start the Breast Cancer Treatment in India pathway](${consult("Breast Cancer Treatment in India")})`,
  },
];

const now = "2026-09-27T13:00:00.000Z";

const article = {
  id: "art_er_pr_her2_breast_cancer_treatment_india",
  slug: "er-pr-her2-breast-cancer-treatment-india",
  title: "ER-Positive, PR-Positive and HER2-Positive Breast Cancer: What Do These Results Mean?",
  excerpt:
    "What ER, PR and HER2 results mean, how the combinations change treatment, and which pathology records international patients should send before travelling to India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "ER", "PR", "HER2", "India", "travel"],
  image: "/uploads/articles/breast-cancer-receptors-visual.png",
  imageAlt:
    "ER PR and HER2 breast cancer biomarkers explained with treatment pathways",
  status: "published",
  featured: true,
  seoTitle: "ER, PR & HER2 Positive Breast Cancer | Treatment in India",
  seoDescription:
    "Understand ER, PR and HER2 results in breast cancer, what positive and negative results mean, and how they influence treatment options in India.",
  canonical: "https://gaf.healthcare/blogs/er-pr-her2-breast-cancer-treatment-india",
  ogImage: "/uploads/articles/breast-cancer-receptors-visual.png",
  allowIndex: true,
  keywords: [
    "ER PR HER2 breast cancer",
    "ER positive breast cancer",
    "PR positive breast cancer",
    "HER2 positive breast cancer",
    "ER PR HER2 testing",
    "hormone receptor positive breast cancer",
    "HER2 negative breast cancer",
    "triple negative breast cancer",
    "ER positive HER2 negative breast cancer",
    "ER positive HER2 positive breast cancer",
    "breast cancer receptor status",
    "breast cancer treatment in India",
    "ER PR HER2 test cost in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Breast Cancer Treatment by Stage", href: BY_STAGE },
    { label: "Breast Cancer Stages 0–4", href: STAGES },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
    { label: "Hormone therapy cost in India", href: HORMONE_COST },
    { label: "Targeted therapy cost in India", href: TARGETED_COST },
    { label: "Chemotherapy cost in India", href: CHEMO_COST },
    { label: "Immunotherapy cost in India", href: IMMUNO_COST },
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
    id: "media_bc_receptors_visual",
    url: "/uploads/articles/breast-cancer-receptors-visual.png",
    name: "breast-cancer-receptors-visual.png",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_bc_biomarker_pathways",
    url: "/uploads/articles/breast-cancer-biomarker-pathways-visual.png",
    name: "breast-cancer-biomarker-pathways-visual.png",
    alt: "Four visual treatment pathways from hormone therapy to triple-negative care",
    addedAt: now,
  },
  {
    id: "media_bc_biomarker_testing",
    url: "/uploads/articles/breast-cancer-biomarker-testing-visual.png",
    name: "breast-cancer-biomarker-testing-visual.png",
    alt: "How tumour tissue is tested for ER, PR and HER2",
    addedAt: now,
  },
  {
    id: "media_bc_biomarker_vs_stage",
    url: "/uploads/articles/breast-cancer-biomarker-vs-stage-visual.png",
    name: "breast-cancer-biomarker-vs-stage-visual.png",
    alt: "Biology versus extent of disease as two separate medical facts",
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
