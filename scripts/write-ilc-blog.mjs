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
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const BCS_COST = "/costs/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is invasive lobular carcinoma?</strong> Invasive lobular carcinoma is a type of invasive breast cancer that begins in the milk-producing lobules and grows into surrounding breast tissue.</p><p class="article-quick-answer__body"><strong>How common is ILC?</strong> ILC accounts for approximately 10% to 15% of invasive breast cancers.</p><p class="article-quick-answer__body"><strong>Does ILC cause a lump?</strong> Not always. ILC can grow in thin strands through breast tissue rather than forming a distinct lump, so some patients notice thickening, fullness or a subtle change instead.</p><p class="article-quick-answer__body"><strong>Is ILC harder to detect on a mammogram?</strong> It can be. Its diffuse growth pattern may make it less obvious on mammography or ultrasound than a more typical mass-forming breast cancer.</p><p class="article-quick-answer__body"><strong>Is invasive lobular carcinoma usually hormone receptor-positive?</strong> Many ILCs are hormone receptor-positive, although individual tumors can have different biomarker profiles.</p><p class="article-quick-answer__body"><strong>How is ILC treated?</strong> Treatment depends on stage and tumor biology. Surgery is commonly used, with radiation, hormone therapy, chemotherapy or targeted therapy added when indicated.</p><p class="article-quick-answer__body"><strong>Is chemotherapy always needed for ILC?</strong> No. Chemotherapy is not automatically required. The decision depends on factors including stage, grade, biomarkers and the overall risk profile.</p><p class="article-quick-answer__body"><strong>Can ILC affect both breasts?</strong> It is more likely to involve both breasts than many other breast cancer types.</p><p class="article-quick-answer__body"><strong>Can ILC spread to other organs?</strong> Yes. Like other invasive breast cancers, ILC can spread through the lymphatic system or bloodstream. Its pattern of spread can differ from invasive ductal carcinoma.</p><p class="article-quick-answer__body"><strong>How much does invasive lobular carcinoma treatment cost in India?</strong> There is no single price. The cost depends on the stage, surgery, pathology, radiation, medicines and whether chemotherapy or targeted treatment is required. A case-specific estimate is more useful than a generic figure.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Not every breast cancer forms a clear, easily felt lump. Invasive lobular carcinoma (ILC) is a good example. ILC begins in the milk-producing lobules and then grows into the surrounding tissue. It accounts for roughly 10% to 15% of invasive breast cancers and has features that make it different from the more common invasive ductal carcinoma. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [pathology report](${PATH}) explainer.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to review your ILC pathology and imaging",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa("Please review my invasive lobular carcinoma pathology and imaging and advise on treatment in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/ilc-consult-visual.webp",
    alt: "Invasive lobular carcinoma showing cancer cells spreading through the breast lobules and surrounding tissue",
    caption: "ILC may cause thickening or a subtle change rather than a firm, round lump. Persistent changes still need assessment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Invasive Lobular Carcinoma?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The breast contains milk-producing glands called lobules. These lobules connect to the milk ducts, which carry milk toward the nipple. Invasive lobular carcinoma begins in the cells lining these lobules. Invasive means the cancer cells have moved beyond the lobule where they started and entered the surrounding breast tissue. This is different from lobular carcinoma in situ (LCIS), which remains within the lobules and is generally considered a marker of increased risk rather than an invasive cancer itself. That distinction is important when reading a pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ILC vs Invasive Ductal Carcinoma",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The two names describe where the cancer began.\n\n| Feature | Invasive lobular carcinoma | Invasive ductal carcinoma |\n| --- | --- | --- |\n| Starting point | Milk-producing lobules | Milk ducts |\n| Growth pattern | Often single-file or diffuse | More often forms a defined mass |\n| Frequency | About 10–15% of invasive breast cancers | Most common invasive breast cancer |\n| Palpable lump | May be subtle or absent | More commonly forms a noticeable mass |\n| Hormone receptors | Frequently hormone receptor-positive | Variable |\n| Imaging | Can be more difficult to define | Often easier to visualise as a mass |\n| Treatment | Based on stage and biomarkers | Based on stage and biomarkers |\n\nThe differences help explain the disease, but they do not mean that every ILC behaves in exactly the same way. The patient's individual pathology and stage remain central to treatment decisions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Does ILC Grow Differently?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "One important feature of lobular cancer is loss of a cell-adhesion protein called E-cadherin. When this protein is absent, cancer cells can lose some of the normal connections that hold neighbouring cells together. The cells can grow in a more dispersed, single-file pattern instead of forming a compact mass. This helps explain why a person with ILC may have significant cancer in the breast without having an obvious hard lump.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Symptoms of ILC?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ILC can be difficult to recognise because its symptoms may be subtle. Possible changes include thickening of part of the breast, fullness or swelling, a change in size or shape, a firm area that is difficult to define, skin changes, nipple inversion, nipple discharge, a change in texture, a lump in some cases, or swollen lymph nodes. Some people have no noticeable symptoms and are diagnosed through imaging. If a breast change persists, it should be assessed rather than assumed to be a normal variation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ILC Always Cause a Lump?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. This is one of the most important things to understand about lobular breast cancer. ILC often grows in thin strands through the breast rather than creating a rounded tumor. Instead of saying \"I found a lump,\" a patient may describe thickening, a slight change in how the breast looks, or a firm area that does not feel like a distinct lump. These subtle changes still deserve evaluation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can ILC Be Difficult to Detect?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The diffuse growth pattern can make ILC less obvious on physical examination and some imaging tests. The American Cancer Society notes that ILC can be harder to feel during a breast examination or see on mammography or ultrasound because it tends to spread through the breast in thin strands. This does not mean that mammography is ineffective. It means that the entire clinical picture matters. If symptoms and imaging do not match, doctors may recommend additional evaluation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Mammography, Ultrasound and MRI for ILC",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/ilc-imaging-visual.webp",
    alt: "MRI used to map the extent of invasive lobular carcinoma in the body",
    caption: "MRI can help show how extensively ILC involves the breast when mammography and ultrasound are less clear.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mammography is commonly used to investigate breast abnormalities. ILC may not always appear as a clearly defined mass. It can instead cause architectural distortion, asymmetry, an area of increased density or subtle tissue changes. The radiologist needs to interpret the images alongside the physical examination.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ultrasound can help investigate a suspicious area and examine lymph nodes. It may not fully show the extent of lobular cancer in every patient. If the clinical findings, mammogram and ultrasound do not provide a clear picture, additional imaging may be considered.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "MRI can be particularly useful when doctors need to understand the extent of disease within the breast. It may help identify additional areas of cancer, the overall extent of the tumor, disease in another part of the same breast, or findings that are difficult to characterise on conventional imaging. NCI notes that the linear growth pattern of lobular carcinoma can make mammography less sensitive and increase the utility of MRI. MRI is not automatically required for every patient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Invasive Lobular Carcinoma Diagnosed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Imaging can identify a suspicious area. The diagnosis requires tissue. A typical pathway may include clinical examination, mammography, ultrasound, MRI when appropriate, core needle biopsy, pathology examination, ER and PR testing, HER2 testing, tumor grading and staging investigations when required. The [biopsy](${DIAGNOSIS}) is the key step that confirms the diagnosis.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether you need MRI before surgery",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about imaging](${wa("Please advise whether I need MRI in addition to mammogram and ultrasound for invasive lobular carcinoma in India.")})`,
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
    text: `The [pathology report](${PATH}) may confirm histological type (lobular, ductal or another type), grade, ER and PR status, HER2 status, the size of the invasive component, lymphovascular invasion and lymph-node status if nodes were removed. These findings are interpreted together rather than individually.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Invasive Lobular Carcinoma Usually ER-Positive?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Many ILCs are hormone receptor-positive. The American Cancer Society notes that ILCs are usually hormone receptor-positive and generally tend to grow more slowly than many other breast cancers. \"Usually\" does not mean \"always.\" A patient's own pathology report determines whether [hormone therapy](${HT}) is relevant. See [ER, PR and HER2](${ERPR}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does HER2 Matter in ILC?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Although many ILCs are hormone receptor-positive and HER2-negative, HER2 testing is still important. NCI identifies ER, PR and HER2 among the key biomarkers used to classify breast cancers and guide treatment. If a tumor is HER2-positive, [HER2-targeted therapy](${HER2}) may become part of treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is ILC Staged?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The [stage](${STAGES}) describes how far the cancer has progressed. Staging considers tumor size, lymph-node involvement, distant spread, grade, ER, PR and HER2. NCI distinguishes between clinical prognostic staging before treatment and pathological prognostic staging after surgery. Two patients with the same histological type can receive very different treatment plans.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ILC Need Genetic Testing?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Genetic testing is not automatically required simply because a tumor is lobular. Some patients may be offered hereditary cancer testing based on age at diagnosis, family history, multiple cancers in the family, a personal history of certain cancers, bilateral breast cancer or other clinical features. The decision should be based on established genetic-testing criteria rather than the word \"lobular\" alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Early-Stage ILC Treated?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/ilc-surgery-visual.webp",
    alt: "Surgical planning for invasive lobular carcinoma after imaging and pathology review",
    caption: "Lobular histology by itself does not automatically require mastectomy. The extent of disease in the breast guides the operation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For operable ILC, [surgery](${SURGERY}) is often an important part of treatment. Options may include breast-conserving surgery, mastectomy, sentinel lymph-node biopsy and other lymph-node procedures when indicated. The choice depends on the extent of disease, tumor size, imaging findings, lymph-node status and other clinical factors.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can ILC Be Treated With Lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Lobular histology by itself does not automatically require mastectomy. [Breast-conserving surgery](${LUMP}) can be considered when the cancer can be removed with appropriate margins while preserving an acceptable amount of breast tissue. NCI notes that all histological types of invasive breast cancer may be treated with breast-conserving surgery followed by radiation when appropriate. ILC can sometimes be more extensive than it initially appears, which is one reason careful imaging before surgery matters.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Mastectomy Considered for ILC?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Mastectomy may be considered when the tumor is extensive, multiple areas of cancer are present, clear margins cannot be achieved with breast-conserving surgery, the breast would be significantly distorted by removing the tumor, or the patient has other factors affecting surgical choice. The decision should be based on the actual extent of disease rather than the diagnosis of ILC alone. [Reconstruction](${RECON}) can be discussed at the same time.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Are Surgical Margins Important in ILC?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The surgeon needs to remove the cancer with an appropriate margin of surrounding tissue. This can sometimes be challenging when ILC spreads in a diffuse pattern. If cancer cells remain at the surgical margin, additional surgery may be considered. The final pathology report helps determine whether the margins are satisfactory.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ILC Require Lymph-Node Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph-node evaluation is commonly considered for invasive breast cancer. For many patients with clinically node-negative disease, sentinel lymph-node biopsy is used to check the first draining nodes. If nodes contain cancer, the plan may change depending on the number of involved nodes and other features. More extensive axillary surgery is not automatically required for every patient.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about lumpectomy versus mastectomy for ILC",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about surgery](${wa("Please advise whether lumpectomy or mastectomy is more appropriate for my invasive lobular carcinoma in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ILC Require Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Not necessarily. Patients sometimes assume that every invasive cancer automatically requires [chemotherapy](${CHEMO}). The decision depends on stage, grade, ER/PR and HER2 status, lymph-node involvement, tumor biology, patient factors and sometimes genomic testing. NCI notes that tumor histology, stage, grade and molecular status all contribute to treatment selection. Because many ILCs are hormone receptor-positive, chemotherapy decisions need to be individualised.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Genomic Tests Help Decide About Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For some patients with hormone receptor-positive, HER2-negative invasive breast cancer, genomic assays such as Oncotype DX and MammaPrint can provide additional information about the likelihood of benefit from chemotherapy. NCI lists gene-expression profiling among molecular approaches used in breast cancer. Whether such a test is appropriate depends on the individual cancer. It is not automatically necessary for every patient with ILC.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Invasive Lobular Carcinoma",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/ilc-followup-visual.webp",
    alt: "Long-term hormone therapy discussion after hormone receptor-positive invasive lobular carcinoma",
    caption: "Many ILCs are hormone receptor-positive. Endocrine therapy may continue for several years.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is particularly relevant when ILC is estrogen receptor-positive or progesterone receptor-positive. Depending on menopausal status, treatment may include tamoxifen, aromatase inhibitors or ovarian suppression in selected premenopausal patients. Treatment may continue for several years. Many ILC tumors depend on hormone signalling for growth. For patients taking long-term endocrine therapy, [side effects](${HT_SE}) and adherence should be discussed regularly.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What If ILC Is HER2-Positive or Triple-Negative?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If testing shows that the cancer is HER2-positive, HER2-directed treatment may be included, often with chemotherapy, surgery, radiation and hormone therapy when the tumor is also hormone receptor-positive. Triple-negative ILC is less common. In that situation the tumor does not express estrogen receptors, progesterone receptors or HER2, so treatment is different from the more commonly encountered hormone receptor-positive ILC. Chemotherapy and immunotherapy may be considered depending on stage. NCI notes that treatment selection is based on stage and molecular characteristics rather than histological type alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can ILC Be Treated With Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Radiation](${RAD}) may be recommended after breast-conserving surgery. It can also be recommended after mastectomy in selected patients depending on tumor size, lymph-node involvement and other risk factors. Radiation is a local treatment, while chemotherapy and many drug treatments are systemic.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens If ILC Has Spread to Lymph Nodes or Distant Organs?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Lymph-node involvement affects staging and can influence the plan. Treatment may include combinations of surgery, radiation, chemotherapy, hormone therapy, HER2-targeted treatment and other systemic therapies. Because ILC is invasive, it can also spread through the lymphatic system or bloodstream. The American Cancer Society notes that ILC can spread to bones, liver, lungs and brain and may have a greater tendency than ductal carcinoma to involve certain less typical sites, including the digestive tract, ovaries or lining of the abdomen. If distant spread is suspected, staging investigations are performed. See [recurrence](${RECUR}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does ILC Behave Differently After Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ILC can have a somewhat different pattern of recurrence compared with invasive ductal carcinoma. The American Cancer Society notes that when ILC recurs, it may recur later than ductal carcinoma, sometimes more than 10 years after the original diagnosis. This is one reason long-term [follow-up](${FOLLOW}) remains important, including completing recommended hormone therapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Metastatic Invasive Lobular Carcinoma?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Metastatic ILC means the cancer has spread from the breast to distant parts of the body. Treatment at this stage is primarily systemic: hormone therapy, targeted therapy, chemotherapy, immunotherapy in appropriate settings and other systemic treatments. Radiation or surgery can still be useful for particular symptoms or specific sites of disease.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about hormone therapy or chemotherapy for ILC",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about systemic treatment](${wa("Please advise whether I need chemotherapy or hormone therapy for invasive lobular carcinoma in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Invasive Lobular Carcinoma Treatment in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "India has multidisciplinary cancer centres where ILC can be evaluated and treated. A comprehensive team may include a breast surgical oncologist, medical oncologist, radiation oncologist, breast radiologist, pathologist, reconstructive surgeon, genetic counsellor when indicated and an oncology rehabilitation team. For international patients, reviewing pathology and imaging before travel can save time and show whether additional tests are needed before surgery. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm the extent of disease before an operation is booked.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Pathology Review Important for International Patients?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If your biopsy was performed outside India, an Indian cancer centre may recommend reviewing the original pathology to confirm invasive lobular carcinoma, grade, ER, PR, HER2 and other features. The hospital may request the original slides or tissue blocks. A review can be particularly useful when treatment recommendations differ between doctors. See the [international-patient guide](${INTL}).`,
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
    text: "Bring the original pathology report, biopsy slides, tissue blocks if available, mammography, ultrasound and MRI images, CT or PET scans if performed, previous consultation notes, surgical records, medication list and genetic test results if available. Digital copies are useful, but original pathology material may be needed for review. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can coordinate pathology review before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Invasive Lobular Carcinoma Treatment Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single price. Cost depends on diagnostic imaging, pathology review, biopsy, MRI, surgery, sentinel lymph-node biopsy, hospitalisation, radiation, chemotherapy, hormone therapy, HER2-targeted treatment, immunotherapy when indicated, reconstruction and follow-up. A patient requiring lumpectomy and hormone therapy will have a very different cost from someone requiring mastectomy, chemotherapy, radiation and targeted treatment. GAF Healthcare provides a case-specific quotation after reviewing the records. See the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Breast-conserving surgery doctors](${BCS_DOCTORS}) · [cost](${BCS_COST}) · [mastectomy doctors](${MAST_DOCTORS}) · [cost](${MAST_COST}) · [reconstruction](${RECON_DOCTORS}) · [cost](${RECON_COST}) · [chemotherapy](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST}) · [hormone therapy](${HT_DOCTORS}) · [cost](${HT_COST}) · [targeted therapy](${TARGETED_DOCTORS}) · [cost](${TARGETED_COST}) · [immunotherapy](${IMMUNO_DOCTORS}) · [cost](${IMMUNO_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does ILC Treatment Take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no standard duration. Some patients undergo surgery first and then receive radiation or systemic treatment. Others receive systemic treatment before surgery. The sequence depends on tumor size, lymph-node status, HER2 status, hormone-receptor status, grade, overall stage and the planned operation. International patients should ask the hospital for an estimated timeline before arranging flights and accommodation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens After ILC Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Follow-up may include clinical examinations, breast imaging, monitoring hormone therapy, management of side effects, assessment of arm and shoulder function, reconstruction follow-up and monitoring for new symptoms. There is no universal need for routine PET-CT in every asymptomatic survivor. The surveillance plan should be based on the treatment history and clinical situation.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a case-specific ILC estimate",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a cost estimate](${wa("Please share a case-specific treatment and cost estimate for invasive lobular carcinoma in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Questions Should You Ask Your ILC Specialist?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is this definitely invasive lobular carcinoma, and what are the grade, size and lymph-node findings?",
      "Is the cancer multifocal, ER-positive, PR-positive or HER2-positive?",
      "Can I have breast-conserving surgery, and would MRI change the surgical plan?",
      "Do I need sentinel lymph-node biopsy, and is reconstruction appropriate?",
      "Do I need chemotherapy, and would a genomic test help?",
      "Will I need hormone therapy, targeted therapy or radiation, and how long will treatment take?",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How GAF Healthcare Can Help",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "GAF Healthcare can help international patients send pathology and imaging for review, coordinate surgical and medical oncology opinions in India, and obtain a case-specific treatment and cost estimate. The pathway depends on the extent of disease in the breast and the current biomarker profile.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Is invasive lobular carcinoma a serious type of breast cancer?", "ILC is an invasive breast cancer, meaning it has grown beyond the lobules into surrounding tissue. Its seriousness depends on the stage, grade, biomarkers and other characteristics of the individual tumor."],
    ["Is ILC worse than invasive ductal carcinoma?", "The two cancers have different biological and growth characteristics, so comparing them as simply better or worse is misleading. Treatment and outlook depend on the individual cancer's stage, grade and biomarkers."],
    ["Can ILC be felt as a lump?", "Sometimes, but not always. It can grow diffusely through breast tissue and may instead cause thickening or a change in breast shape."],
    ["Is ILC usually hormone receptor-positive?", "Many ILCs are hormone receptor-positive, although individual tumors vary. The pathology report determines whether hormone therapy is appropriate."],
    ["Does ILC require chemotherapy?", "Not automatically. Chemotherapy decisions depend on stage, grade, biomarkers, lymph-node status and other clinical factors."],
    ["Can ILC be treated with lumpectomy?", "Yes. Breast-conserving surgery can be considered when the cancer can be adequately removed while preserving the breast."],
    ["Is mastectomy necessary for ILC?", "No, not simply because the cancer is lobular. It may be recommended when the disease is extensive or cannot be adequately removed with breast-conserving surgery."],
    ["Does ILC spread to lymph nodes?", "It can. Lymph-node assessment is therefore part of staging for many patients with invasive breast cancer."],
    ["Can ILC spread to the other breast?", "ILC is more likely than many other breast cancers to be found in both breasts. Appropriate imaging and clinical assessment help evaluate the opposite breast."],
    ["Can ILC recur many years later?", "Yes. The American Cancer Society notes that ILC can recur later than invasive ductal carcinoma, sometimes more than 10 years after the initial diagnosis."],
    ["Can ILC be treated in India?", "Yes. Treatment can be provided through multidisciplinary breast cancer centres involving surgical oncology, medical oncology, radiation oncology, radiology and pathology."],
    ["How much does ILC treatment cost in India?", "There is no fixed cost. The total depends on the stage, surgery, pathology, radiation and systemic treatment required."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "ILC: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Invasive lobular carcinoma begins in the milk-producing lobules and may spread through the breast in thin strands rather than forming a clearly defined lump. The word \"lobular\" does not determine treatment by itself. Stage, grade, ER, PR, HER2, lymph-node status and how extensive the disease is within the breast guide the plan. For international patients coming to India, a detailed review of pathology and imaging before travel is particularly useful.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan invasive lobular carcinoma treatment in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Diagnosis](${DIAGNOSIS}) · [pathology report](${PATH})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP}) · [reconstruction](${RECON})\n- [Hormone therapy](${HT}) · [HER2-positive](${HER2})\n- [Follow-up](${FOLLOW}) · [recurrence](${RECUR})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS}) · [reconstruction doctors](${RECON_DOCTORS})\n- [International patients](${INTL}) · [cost guide](${COST})`,
  },
];

const now = "2026-09-28T02:00:00.000Z";
const SLUG = "invasive-lobular-carcinoma-treatment-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_invasive_lobular_carcinoma_treatment_india",
  slug: SLUG,
  title: "Invasive Lobular Carcinoma: Symptoms, Diagnosis, Treatment and Cost in India",
  excerpt:
    "How invasive lobular carcinoma is diagnosed, staged and treated in India, including surgery, hormone therapy and why MRI is sometimes more useful than mammography.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "invasive lobular carcinoma", "ILC", "India", "travel"],
  image: "/uploads/articles/ilc-consult-visual.webp",
  imageAlt: "Invasive lobular carcinoma showing cancer cells spreading through the breast lobules and surrounding tissue",
  status: "published",
  featured: true,
  seoTitle: "Invasive Lobular Carcinoma: Treatment & Cost in India",
  seoDescription:
    "Learn about invasive lobular carcinoma symptoms, diagnosis, staging, surgery, chemotherapy, hormone therapy and treatment cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/ilc-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "invasive lobular carcinoma treatment in India",
    "invasive lobular carcinoma",
    "invasive lobular carcinoma symptoms",
    "invasive lobular carcinoma diagnosis",
    "invasive lobular carcinoma treatment",
    "invasive lobular carcinoma surgery",
    "invasive lobular carcinoma cost in India",
    "ILC breast cancer",
    "lobular breast cancer treatment",
    "lobular breast cancer symptoms",
    "lobular breast cancer surgery",
    "invasive lobular carcinoma vs ductal carcinoma",
    "hormone receptor positive lobular breast cancer",
    "HER2 positive lobular breast cancer",
    "lobular breast cancer chemotherapy",
    "lobular breast cancer treatment in India",
    "lobular breast cancer doctors in India",
    "lobular breast cancer hospitals in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Diagnosis", href: DIAGNOSIS },
    { label: "Hormone therapy", href: HT },
    { label: "Surgery", href: SURGERY },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  "art_hormone_therapy_breast_cancer_india",
  "art_breast_cancer_surgery_in_india",
  "art_lumpectomy_vs_mastectomy",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Invasive lobular carcinoma", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
