import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_SE = "/blogs/breast-cancer-radiation-side-effects";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const BCS_COST = "/costs/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is DCIS?</strong> Ductal carcinoma in situ is a condition in which abnormal cells are confined to the lining of the breast's milk ducts and have not invaded surrounding breast tissue. It is commonly called stage 0 breast cancer.</p><p class="article-quick-answer__body"><strong>Is DCIS cancer?</strong> DCIS is non-invasive or pre-invasive. It has not spread beyond the ducts, but it may develop into invasive breast cancer in some cases.</p><p class="article-quick-answer__body"><strong>Does DCIS cause symptoms?</strong> Usually, no. Most DCIS is detected through an abnormal mammogram. Occasionally, it can cause a lump or nipple discharge.</p><p class="article-quick-answer__body"><strong>How is DCIS diagnosed?</strong> An abnormal mammogram may lead to additional imaging and a breast biopsy. The biopsy confirms whether abnormal cells are confined to the ducts and provides information such as DCIS grade.</p><p class="article-quick-answer__body"><strong>What are the main treatments for DCIS?</strong> Treatment may include lumpectomy, mastectomy, radiation therapy and hormone therapy, depending on the extent and characteristics of the DCIS.</p><p class="article-quick-answer__body"><strong>Is chemotherapy needed for DCIS?</strong> Chemotherapy is generally not used for pure DCIS because the abnormal cells have not invaded surrounding tissue. The treatment approach is different if invasive cancer is found alongside the DCIS.</p><p class="article-quick-answer__body"><strong>Can DCIS come back after treatment?</strong> It can recur in the treated breast, and a person can also develop another breast cancer. The risk depends on several factors and the treatment received.</p><p class="article-quick-answer__body"><strong>How much does DCIS treatment cost in India?</strong> There is no single fixed cost. Expenses depend on whether treatment involves lumpectomy or mastectomy, pathology, radiation, hormone therapy, hospitalization and other individual requirements.</p><p class="article-quick-answer__body"><strong>Can DCIS be treated in India?</strong> Yes. DCIS can be managed by multidisciplinary breast cancer teams in India, including breast surgeons, surgical oncologists, pathologists, radiologists and radiation oncologists.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Ductal carcinoma in situ, or DCIS, is often discovered during a mammogram before a woman notices any breast symptoms. It is sometimes described as [stage 0](${STAGES}) breast cancer or non-invasive breast cancer. The important point is that the abnormal cells are still confined to the milk ducts and have not invaded the surrounding breast tissue.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `That makes DCIS very different from invasive breast cancer. At the same time, doctors generally take DCIS seriously because some DCIS can progress to invasive breast cancer if it is left untreated, and currently it is not possible to predict with complete certainty which individual lesions will progress. Treatment therefore has to balance two things: removing or controlling the abnormal cells while avoiding more treatment than a particular patient actually needs.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For someone diagnosed with DCIS in India, understanding the [pathology report](${PATH}) is especially important. The size, grade, extent of DCIS, surgical margins, hormone-receptor status and the distribution of the abnormal area can all influence the treatment discussion. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [diagnosis explainer](${DIAGNOSIS}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about a DCIS treatment plan",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your DCIS pathology](${wa("Please review my DCIS pathology and imaging and advise on treatment in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-consult-visual.webp",
    alt: "Ductal carcinoma in situ DCIS showing abnormal cells confined inside a breast milk duct",
    caption: "DCIS is non-invasive: the abnormal cells remain inside the ducts. Treatment is still discussed because some DCIS can later become invasive if left untreated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Exactly Is Ductal Carcinoma in Situ?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The breast contains a network of milk ducts. These ducts carry milk toward the nipple. In DCIS, abnormal cells develop within the lining of these ducts. The cells have not broken through the duct wall into the surrounding breast tissue. That distinction is what makes DCIS non-invasive. Once cancer cells break through the duct wall and invade nearby breast tissue, the diagnosis changes to invasive breast cancer. So, DCIS is not the same thing as invasive ductal carcinoma.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is DCIS Called Stage 0?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `DCIS is commonly referred to as stage 0 breast cancer. Stage 0 means that abnormal cells have been found at their original site without evidence that they have invaded surrounding breast tissue. This is different from stages I through IV, which are used for invasive breast cancer. It is worth remembering that "stage 0" does not mean that the finding should simply be ignored. It means the disease has been identified before invasion has occurred. See [breast cancer stages](${STAGES}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is DCIS Dangerous?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS itself has not invaded surrounding tissue or spread to distant organs. The concern is what may happen if some DCIS progresses and becomes invasive. Researchers are still studying why some lesions progress while others may never become invasive. The National Cancer Institute notes that there is currently no reliable way to determine with certainty which individual DCIS lesions will progress to invasive disease. This uncertainty is one reason treatment recommendations can sometimes be difficult to understand.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does DCIS Cause Symptoms?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Most people with DCIS do not have obvious symptoms. It is frequently discovered during routine breast screening, particularly when a mammogram shows an area of abnormal calcification. Occasionally a person may notice a breast lump, nipple discharge, a change in the nipple or a localized breast change. These symptoms are not specific to DCIS.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is DCIS Often Found on a Mammogram?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-imaging-visual.webp",
    alt: "Mammography used to detect ductal carcinoma in situ before symptoms appear",
    caption: "DCIS often appears as tiny calcium deposits on a mammogram. Imaging alone cannot confirm the diagnosis; a biopsy is required.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS can produce tiny deposits of calcium called microcalcifications. These may be visible on a mammogram even when the breast feels completely normal. This is one reason screening mammography can detect breast abnormalities before they become clinically obvious. According to NCI's physician information, more than 90% of DCIS cases are diagnosed by mammography alone in the cited screening context.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens After an Abnormal Mammogram?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `An abnormal mammogram does not automatically mean DCIS. Additional evaluation may include diagnostic mammography, breast ultrasound, further breast imaging when appropriate and an image-guided biopsy. The biopsy is what establishes the diagnosis. A radiologist may use stereotactic guidance, ultrasound guidance or another appropriate technique depending on where the abnormality is located. See [diagnosis tests](${DIAGNOSIS}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is a Biopsy Necessary?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Imaging can identify an area that looks abnormal. It cannot reliably tell whether that area contains DCIS, another type of breast lesion or an invasive cancer. A biopsy removes tissue for examination by a pathologist. The pathology report can then establish whether abnormal cells are confined to the ducts and provide important information about the DCIS.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send DCIS imaging and biopsy for review",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your mammogram and biopsy](${wa("Please review my mammogram and biopsy and confirm whether this is DCIS and what treatment is needed in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Understanding a DCIS Pathology Report",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Receiving a pathology report can be overwhelming because it contains medical terminology that may not be familiar. Several parts are particularly important: grade, size or extent, distribution, hormone-receptor status and, after surgery, surgical margins. See the [pathology report explainer](${PATH}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "DCIS Grade",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS is commonly classified as low grade, intermediate grade or high grade. The grade describes how abnormal the cells look under the microscope and provides information about how quickly the cells are behaving. High-grade DCIS generally has more abnormal cellular features and is associated with a higher risk of recurrence and progression than low-grade disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: 'What Does "Comedo" Mean in DCIS?',
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may see the term comedo necrosis or comedo-type DCIS in a pathology report. This refers to dead or necrotic material within the involved ducts. Comedo-type DCIS is generally associated with higher-grade disease and a greater likelihood of associated invasive cancer than some other patterns. However, one word on a pathology report should not be interpreted in isolation. Your breast specialist should consider the entire pathology report.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Does the Size of DCIS Matter?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The area of DCIS can influence treatment planning. A small localized area may be suitable for [breast-conserving surgery](${LUMP}). A larger area may make breast conservation technically difficult, particularly if removing the entire area would leave an unacceptable breast shape. The distribution also matters. DCIS found in several separate areas of the breast may lead the surgeon to recommend mastectomy rather than lumpectomy.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Surgical Margins in DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A surgical margin is the edge of the tissue removed during surgery. After lumpectomy, the pathologist examines the edges of the specimen. The goal is to determine whether DCIS extends to the margin. If DCIS is present at or too close to the margin according to the treating team's criteria, additional surgery may be recommended. This can sometimes mean another lumpectomy. In other situations, mastectomy may be considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Main Treatment Options for DCIS?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-surgery-visual.webp",
    alt: "Surgical planning for DCIS lumpectomy or mastectomy in India",
    caption: "Lumpectomy with or without radiation, or mastectomy, is chosen according to the extent of DCIS, margins and the patient's preferences.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The main treatment options include lumpectomy, lumpectomy followed by [radiation](${RAD}) in appropriate patients, [mastectomy](${SURGERY}), and [hormone therapy](${HT}) for selected hormone-receptor-positive DCIS. The appropriate approach depends on the extent and characteristics of the disease.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Compare lumpectomy and mastectomy for DCIS",
    href: consult("Breast-Conserving Surgery"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about lumpectomy vs mastectomy](${wa("Please advise whether lumpectomy or mastectomy is more appropriate for my DCIS in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy for DCIS",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lumpectomy is also called breast-conserving surgery. The surgeon removes the DCIS along with a surrounding margin of normal breast tissue while preserving most of the breast. It may be appropriate when the DCIS is localized and can be removed while leaving an acceptable amount of healthy breast tissue. The removed tissue is sent to pathology. The pathology report then confirms whether the DCIS has been completely removed and whether there is any unexpected invasive cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Radiation Needed After Lumpectomy for DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation is commonly recommended after breast-conserving surgery for DCIS. Its purpose is to reduce the risk of the disease returning in the treated breast, either as DCIS or invasive breast cancer. However, radiation is not necessarily appropriate for every person. Some carefully selected patients with lower-risk disease may discuss omission of radiation with their doctors. The decision depends on factors such as age, grade, size, margins and other features. See [radiation therapy](${RAD}) and [radiation side effects](${RAD_SE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lumpectomy Be Done Without Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In selected circumstances, it may be considered. For example, some older patients or people with significant health problems may discuss avoiding radiation. There is also ongoing research into whether carefully selected patients with low-risk DCIS can be safely managed with less intensive treatment. NCI notes that active surveillance is an area of ongoing research, and longer-term evidence is still needed before it can be considered appropriate for everyone with low-risk DCIS. This is an important distinction. Active surveillance is not currently a universal replacement for surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Mastectomy Recommended for DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Mastectomy removes the entire breast containing the DCIS. It may be considered when the DCIS covers a large portion of the breast, DCIS is present in multiple separate areas, clear margins cannot be achieved with breast-conserving surgery, or the breast would be significantly distorted by removing the affected area. These decisions are individualized. Reconstruction can be discussed at the same time; see [reconstruction after mastectomy](${RECON}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether mastectomy is needed for this DCIS",
    href: consult("Mastectomy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about mastectomy](${wa("Please advise whether mastectomy is needed for my DCIS and whether reconstruction can be planned in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Mastectomy Cure DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mastectomy removes the breast containing the DCIS and provides very strong local control. NCI reports that people with DCIS generally have an excellent prognosis, with more than 98% alive five years after diagnosis in the cited population. However, no cancer treatment should be described as a guarantee. The final pathology matters because an invasive cancer can occasionally be found in the surgical specimen even when the initial biopsy showed DCIS.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Lymph Node Surgery Needed for DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Usually, lymph-node surgery is not necessary for a straightforward lumpectomy for DCIS. However, sentinel lymph node biopsy may be performed during mastectomy because if invasive cancer is unexpectedly found afterward, performing the sentinel node procedure later may not be feasible in the same way. The decision should be made before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can DCIS Turn Out to Be Invasive Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Sometimes the initial needle biopsy samples only part of the abnormal area. A larger surgical specimen may subsequently show an invasive component that was not captured in the original biopsy. This is one reason the final surgical pathology report can be important in determining whether the treatment plan needs to change.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does DCIS Need Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For pure DCIS, chemotherapy is generally not part of standard treatment. The reason is straightforward: the abnormal cells have not invaded the surrounding tissue. If invasive breast cancer is identified in the surgical specimen, however, the situation changes. The treatment team would then assess the invasive cancer according to its stage, ER, PR, HER2 status and other relevant factors. See [ER, PR and HER2](${ERPR}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Hormone Therapy Used for DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `It can be. If DCIS is hormone receptor-positive, hormone therapy may be discussed after surgery. Tamoxifen is one option. For some postmenopausal women, an aromatase inhibitor may also be considered. Hormone therapy in DCIS is primarily used to reduce the risk of another DCIS or invasive breast cancer. It is not the same treatment approach used for advanced hormone receptor-positive invasive breast cancer. See [hormone therapy](${HT}) and [side effects](${HT_SE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does HER2 Matter in DCIS?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER and PR testing can help guide treatment decisions. HER2 is different. NCI notes that HER2 is generally not routinely tested in DCIS in the same way it is for invasive breast cancer. If invasive cancer is identified, however, HER2 testing becomes relevant to the treatment decision.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can DCIS Be Treated Without Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `This is an area of active research. Some clinical trials are examining whether carefully selected low-risk DCIS can be monitored rather than immediately treated with surgery. However, there is still uncertainty about which individual lesions will progress. NCI notes that longer follow-up is needed to determine whether active monitoring can safely replace surgery for selected patients. Therefore, a patient should not assume that a diagnosis of "low-grade DCIS" automatically means observation is appropriate.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is the Treatment Decision Made?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single treatment that is right for every person with DCIS. Your breast cancer team may consider the size of the DCIS, location, number of areas involved, grade, presence of necrosis, surgical margins, breast size and shape, age, other medical conditions, hormone-receptor status, personal preferences, ability to undergo radiation and previous radiation treatment. This is why two people with DCIS can receive different treatment plans.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "DCIS Treatment in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "India has breast cancer centres that can provide the complete diagnostic and treatment pathway for DCIS. A typical team may include a breast surgeon, surgical oncologist, breast radiologist, pathologist, radiation oncologist, medical oncologist when required and a reconstructive surgeon when appropriate. For a straightforward DCIS diagnosis, the treatment may be much less extensive than the treatment required for invasive breast cancer. That is why obtaining the pathology and imaging before deciding on treatment is important. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can review slides and imaging before confirming surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Should International Patients Get Their Pathology Reviewed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Pathology determines whether the abnormal cells are truly confined to the ducts. It also determines grade and other characteristics that influence treatment. For an international patient considering treatment in India, the hospital may review original biopsy slides, tissue blocks, the pathology report, mammograms, ultrasound, MRI and previous medical records. A second pathology review can be particularly useful when the diagnosis or grade is unclear or when treatment recommendations differ between doctors. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should an International Patient Bring to India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If you are traveling to India after a DCIS diagnosis, try to bring the original biopsy report, pathology slides if available, tissue blocks if available, mammography images, ultrasound images, MRI images if performed, previous consultation notes, a medication list, previous breast surgery records and family history information. Digital copies are useful, but the hospital may request original pathology material for review. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can arrange pathology review before the first operation.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send records before you travel for DCIS care",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my DCIS pathology and mammograms for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does DCIS Treatment Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The cost of treating DCIS varies considerably. A patient undergoing a small lumpectomy has a very different treatment pathway from someone requiring mastectomy and reconstruction. Potential expenses include diagnostic imaging, breast biopsy, pathology review, surgery, hospitalization, radiation therapy, hormone therapy, additional surgery if margins are not clear, reconstruction where appropriate and follow-up consultations. For this reason, a generic "DCIS treatment package" can be misleading. The appropriate estimate should be based on the patient's pathology and proposed treatment plan. See the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Breast-conserving surgery doctors](${BCS_DOCTORS}) · [cost](${BCS_COST}) · [mastectomy doctors](${MAST_DOCTORS}) · [cost](${MAST_COST}) · [reconstruction doctors](${RECON_DOCTORS}) · [cost](${RECON_COST}) · [hormone therapy](${HT_DOCTORS}) · [cost](${HT_COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a DCIS treatment estimate",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a cost estimate](${wa("Please share a DCIS treatment estimate in India based on lumpectomy or mastectomy, radiation and pathology review.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Recovery After Lumpectomy for DCIS",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lumpectomy is generally less extensive than mastectomy. Recovery depends on the size and location of the excision, the surgical technique, whether lymph-node surgery was performed, individual healing and whether additional surgery is required. Some patients return to normal activities relatively quickly. However, the breast may remain swollen or bruised for some time. Radiation, if recommended, begins after the surgical wound has healed sufficiently.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Recovery After Mastectomy for DCIS",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Recovery from mastectomy generally takes longer than recovery from a small lumpectomy. If reconstruction is performed at the same time, recovery may be different again. Patients may need wound care, drain management, pain medication, activity restrictions, follow-up appointments and physiotherapy when indicated. The surgical team should provide specific instructions before discharge.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-followup-visual.webp",
    alt: "Follow-up after DCIS lumpectomy or mastectomy",
    caption: "Follow-up watches the treated breast or chest wall, the opposite breast, hormone-therapy side effects and new symptoms.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens After DCIS Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Follow-up remains important. Depending on the treatment, your doctor may monitor the treated breast, the opposite breast, surgical scars, new breast symptoms, hormone therapy side effects and imaging results. If you had breast-conserving surgery, surveillance of the remaining breast tissue is particularly important. The follow-up schedule should be individualized. See [follow-up tests](${FOLLOW}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can DCIS Come Back?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. DCIS can recur in the treated breast after breast-conserving treatment. A recurrence may be DCIS again or may be invasive breast cancer. The risk depends on factors such as the original DCIS characteristics and treatment. Radiation after lumpectomy reduces the risk of recurrence in the treated breast. Mastectomy has a very low local recurrence risk, although ongoing follow-up remains appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can DCIS Occur in the Other Breast?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can. A diagnosis of DCIS in one breast does not mean the other breast is automatically affected. However, people who have had DCIS remain at risk of developing another breast cancer. Hormone therapy may be recommended in selected hormone receptor-positive cases partly because it can lower the risk of developing another DCIS or invasive breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does DCIS Affect Life Expectancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS has an excellent prognosis. The NCI reports that more than 98% of people diagnosed with DCIS are alive five years after diagnosis in the cited population. Individual outcomes can differ, and population statistics cannot predict what will happen to one particular patient. The key point is that DCIS is generally identified before invasive spread has occurred.",
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
    text: "GAF Healthcare can help an international patient send biopsy slides, mammograms and the pathology report for review before travel, then coordinate a breast surgeon, pathologist and radiation oncologist in India. The useful output is a written plan: whether lumpectomy is feasible, whether radiation is likely, and what the case-specific estimate includes.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    [
      "Is DCIS the same as breast cancer?",
      "DCIS is classified as a non-invasive or pre-invasive breast cancer and is also called stage 0 breast cancer. The abnormal cells remain inside the milk ducts.",
    ],
    [
      "Is DCIS a serious diagnosis?",
      "It should be evaluated and treated according to its characteristics because some DCIS can progress to invasive cancer. However, DCIS has an excellent overall prognosis.",
    ],
    [
      "Can DCIS spread to lymph nodes?",
      "Pure DCIS has not invaded beyond the ducts, so it does not behave like invasive breast cancer. If invasive cancer is found alongside DCIS, lymph-node evaluation becomes more relevant.",
    ],
    [
      "Is chemotherapy needed for DCIS?",
      "Chemotherapy is generally not used for pure DCIS. If invasive cancer is discovered, treatment is reconsidered according to the invasive cancer's characteristics.",
    ],
    [
      "Is radiation necessary after lumpectomy for DCIS?",
      "Radiation is commonly recommended after lumpectomy, but selected patients may discuss omission with their doctors based on individual risk factors.",
    ],
    [
      "Is mastectomy always necessary for DCIS?",
      "No. Many patients can undergo breast-conserving surgery. Mastectomy may be recommended when DCIS is extensive, multicentric or cannot be removed with satisfactory margins.",
    ],
    [
      "Can DCIS be cured?",
      "DCIS has an excellent prognosis, and most people can be successfully treated. The NCI reports more than 98% five-year relative survival in the cited population.",
    ],
    [
      "Can DCIS become invasive breast cancer?",
      "Yes. Some DCIS can progress to invasive disease, although doctors cannot currently predict with certainty which individual lesions will do so.",
    ],
    [
      "Is hormone therapy useful for DCIS?",
      "It may be considered when the DCIS is hormone receptor-positive. Tamoxifen and, for some postmenopausal women, aromatase inhibitors may be options.",
    ],
    [
      "Can DCIS be treated in India?",
      "Yes. Diagnosis and treatment can be provided through multidisciplinary breast cancer centers in India.",
    ],
    [
      "How much does DCIS treatment cost in India?",
      "There is no universal cost. The amount depends on the surgery, pathology, radiation, medication and other treatment requirements.",
    ],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Final Takeaway",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS is an important breast abnormality because it is detected before cancer cells have invaded the surrounding breast tissue. For many women, the diagnosis comes unexpectedly after a routine mammogram. The next step is not to assume that every DCIS requires the same treatment. The pathology report matters. The grade, size, distribution, margins and hormone-receptor status, along with the patient's age, health and preferences, help the treatment team decide between breast-conserving surgery, mastectomy, radiation and hormone therapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Research is also examining whether carefully selected low-risk DCIS can be monitored instead of immediately treated, but this remains an evolving area and is not appropriate for everyone. For patients coming to India, obtaining a review of the biopsy, imaging and pathology before finalizing treatment can make the consultation much more productive. Most importantly, DCIS is not the same as invasive breast cancer. It is a diagnosis that gives doctors an opportunity to intervene while the abnormal cells remain confined to the milk ducts.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan DCIS treatment in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Pathology report](${PATH}) · [diagnosis](${DIAGNOSIS}) · [stages](${STAGES})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP}) · [reconstruction](${RECON})\n- [Radiation](${RAD}) · [hormone therapy](${HT})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS}) · [reconstruction doctors](${RECON_DOCTORS})\n- [International patients](${INTL}) · [cost guide](${COST})`,
  },
];

const now = "2026-09-28T03:00:00.000Z";
const SLUG = "ductal-carcinoma-in-situ-dcis-treatment-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_ductal_carcinoma_in_situ_dcis_treatment_india",
  slug: SLUG,
  title: "Ductal Carcinoma in Situ (DCIS): Symptoms, Diagnosis, Treatment and Cost in India",
  excerpt:
    "What DCIS is, how it is found on a mammogram, when lumpectomy, radiation or mastectomy is used, and what international patients should bring to India.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "DCIS", "stage 0", "lumpectomy", "India", "travel"],
  image: "/uploads/articles/dcis-consult-visual.webp",
  imageAlt: "Ductal carcinoma in situ DCIS showing abnormal cells confined inside a breast milk duct",
  status: "published",
  featured: true,
  seoTitle: "Ductal Carcinoma in Situ (DCIS): Treatment & Cost in India",
  seoDescription:
    "Learn about DCIS symptoms, diagnosis, grade, lumpectomy, mastectomy, radiation, hormone therapy and treatment cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/dcis-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "DCIS treatment in India",
    "ductal carcinoma in situ",
    "DCIS symptoms",
    "DCIS diagnosis",
    "DCIS treatment",
    "DCIS treatment cost in India",
    "DCIS surgery in India",
    "DCIS stage 0 breast cancer",
    "DCIS lumpectomy",
    "DCIS mastectomy",
    "DCIS radiation therapy",
    "DCIS hormone therapy",
    "low grade DCIS",
    "high grade DCIS",
    "DCIS pathology",
    "DCIS treatment for international patients",
    "breast cancer stage 0 treatment in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Pathology report", href: PATH },
    { label: "Lumpectomy vs mastectomy", href: LUMP },
    { label: "Surgery", href: SURGERY },
    { label: "Radiation", href: RAD },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["dcis-consult-visual.webp", article.imageAlt],
  ["dcis-imaging-visual.webp", "Mammography used to detect DCIS"],
  ["dcis-surgery-visual.webp", "Surgical planning for DCIS"],
  ["dcis-followup-visual.webp", "Follow-up after DCIS treatment"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_lumpectomy_vs_mastectomy",
  "art_breast_cancer_surgery_in_india",
  "art_breast_cancer_stages_0_1_2_3_4",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  "art_breast_cancer_pathology_report_explained",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "DCIS treatment", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
