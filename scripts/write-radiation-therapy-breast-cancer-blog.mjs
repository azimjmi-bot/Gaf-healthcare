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
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const IMRT_BLOG = "/blogs/imrt-vs-3d-crt";
const EBRT_RECORDS = "/blogs/records-before-you-book-ebrt";
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const LUMPECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const RAD_DOCTORS = "/doctors/India/Radiation-Oncology";
const RAD_HOSPITALS = "/hospitals/India/Radiation-Oncology";
const RAD_COSTS = "/costs/India/Radiation-Oncology";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";
const EBRT_DOCTORS = "/doctors/India/Radiation-Oncology/EBRT";
const IMRT_COST = "/costs/India/Radiation-Oncology/IMRT";
const CRT_COST = "/costs/India/Radiation-Oncology/3D-CRT";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Radiation therapy uses high-energy radiation to destroy or control breast cancer cells in a specific treatment area.</p><p class="article-quick-answer__body">It is commonly recommended after breast-conserving surgery (lumpectomy) to reduce the risk of cancer returning in the treated breast.</p><p class="article-quick-answer__body">After mastectomy, radiation may be recommended for selected patients, particularly when factors such as tumour size, lymph-node involvement or other pathological findings indicate a higher risk of recurrence.</p><p class="article-quick-answer__body">Radiation may also be used in selected patients with metastatic breast cancer to control symptoms or treat a specific area of disease.</p><p class="article-quick-answer__body">Treatment is planned individually using imaging and radiation-planning systems. The number of treatment sessions varies according to the patient's cancer and radiation protocol.</p><p class="article-quick-answer__body">Radiation therapy is not required for every breast cancer patient, and mastectomy does not automatically mean that radiation can be avoided.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation therapy is an important part of breast cancer treatment for many patients. It uses high-energy radiation to destroy or control cancer cells in a specific area of the body. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF whether radiation applies",
    href: consult("Breast Cancer Radiation Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology and surgery records](${wa("Please review my breast cancer records to see if radiation therapy is needed in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-breast-planning-visual.webp",
    alt: "Radiation therapy for breast cancer showing treatment planning and targeted radiation delivery",
    caption: "Radiation is planned on a CT simulation before the first session so the dose can be aimed at the treatment area rather than the whole body.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Radiation Therapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation therapy, also called radiotherapy, uses high-energy radiation to damage the DNA of cancer cells and prevent them from continuing to grow and divide.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For breast cancer, radiation can be directed toward the breast after [lumpectomy](${LUMPECTOMY_COST}), the chest wall after [mastectomy](${MASTECTOMY_COST}), nearby lymph-node regions, or a specific metastatic tumour site when clinically indicated.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation is a local treatment, unlike [chemotherapy](${CHEMO_COST}), which travels throughout the body. A patient may receive both systemic treatment and radiation because they address different potential areas of cancer. Radiation oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR/Radiation-Oncology), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) plan this as part of the broader pathway rather than as an isolated procedure.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Radiation Used After Breast Cancer Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer surgery removes visible cancer from the breast. However, microscopic cancer cells may remain in the surrounding area even when the surgeon has removed the tumour successfully.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation is used to reduce the risk of cancer returning in the treated area. After breast-conserving surgery, radiation is commonly part of the treatment plan because the breast remains in place.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The National Cancer Institute notes that lumpectomy followed by radiation is an established alternative to mastectomy for appropriately selected early-stage breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Radiation Required After Lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many patients, yes. Radiation therapy is generally recommended after breast-conserving surgery for invasive breast cancer and DCIS, although selected patients may be able to omit radiation based on specific clinical characteristics.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The decision can depend on age, tumour size, tumour grade, [ER/PR status](${BIOMARKERS}), [HER2 status](${HER2}), lymph-node involvement, surgical margins, recurrence risk, overall health and other treatments. The treating radiation oncologist determines the appropriate approach.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-conserving surgery / lumpectomy cost](${LUMPECTOMY_COST})\n- [Lumpectomy doctors in India](${LUMPECTOMY_DOCTORS})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Radiation Required After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. Some patients do not require radiation after mastectomy. Others may benefit from it depending on their risk of local or regional recurrence.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Factors that may influence the decision include larger tumour size, significant lymph-node involvement, cancer involving the chest wall or skin, positive or close surgical margins and other pathological characteristics.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Therefore, the statement "mastectomy means no radiation" is not correct for every patient. The radiation recommendation is made after the final [pathology report](${DIAGNOSIS}) and other clinical information are reviewed.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether radiation is needed after lumpectomy or mastectomy](${consult("Breast Cancer Radiation Therapy")}) · [WhatsApp +91 90443 46292](${wa("Do I need radiation after lumpectomy or mastectomy?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Radiation Used After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Post-mastectomy radiation therapy may be recommended when the cancer has features suggesting a higher risk of recurrence in the chest wall or regional lymph nodes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Tumour size.** Larger tumours may have a different radiation requirement from smaller tumours.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Lymph-node involvement.** The number and extent of involved lymph nodes can influence the radiation plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Surgical margins.** The presence of cancer close to or at a surgical margin can affect treatment decisions.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Local tumour extension.** Cancer involving the skin or chest wall may require more extensive local treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The final decision should be based on the complete pathology and treatment history rather than one factor alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Areas Are Treated With Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation is not necessarily delivered to the entire body. The treatment area depends on the individual cancer.",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Whole breast — commonly used after breast-conserving surgery.",
      "Partial breast — selected patients may receive radiation focused on the area around the original tumour.",
      "Chest wall — this may be treated after mastectomy when indicated.",
      "Regional lymph nodes — axillary, supraclavicular or internal mammary nodes when the plan requires it.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact treatment area is determined during radiation planning.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Radiation Therapy Planned?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation treatment is carefully planned before the first treatment session.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A typical pathway includes: radiation oncology consultation → review of pathology and imaging → CT simulation → treatment planning → dose calculation → quality checks → radiation treatment → follow-up.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The objective is to deliver the prescribed dose to the target while minimizing exposure to nearby healthy organs.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is CT Simulation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "CT simulation is a planning procedure used to determine exactly how radiation should be delivered.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "During the simulation the patient is positioned in the treatment position, a CT scan is performed, the radiation oncology team identifies the treatment area and nearby organs, the radiation plan is designed, and the treatment position is reproduced during subsequent sessions.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For breast cancer, special positioning techniques may be used to reduce radiation exposure to nearby organs.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Deep Inspiration Breath Hold?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-breast-breath-hold-visual.webp",
    alt: "Patient practising a deep-inspiration breath-hold on a radiotherapy couch with a therapist coaching the breath",
    caption: "For selected left-sided treatments, a deep-inspiration breath hold can move the heart farther from the chest wall during the beam.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For selected patients, particularly when treating the left breast, a technique called deep inspiration breath hold (DIBH) may be considered. The patient takes a deep breath and holds it during radiation delivery.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "When the lungs are expanded, the heart can move farther away from the chest wall, potentially reducing the amount of radiation received by the heart.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Whether DIBH is appropriate depends on treatment side, anatomy, radiation plan, equipment and the patient's ability to follow breathing instructions. The radiation team determines whether this technique is appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Many Radiation Sessions Are Needed for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single number of sessions for every patient. The treatment schedule depends on the type of surgery, cancer stage, treatment area, radiation technique, patient characteristics, whether regional lymph nodes are treated and whether a boost is required.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation may be delivered over several weeks, a shorter hypofractionated schedule, or other specialized schedules in selected patients. Modern breast radiation has increasingly incorporated shorter treatment schedules for appropriate patients.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation oncologist should provide the exact number of sessions before treatment begins.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp +91 90443 46292 about session number",
    href: wa("How many breast radiation sessions would I need, and what would a quotation include?"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During a Radiation Session?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-breast-session-visual.webp",
    alt: "Patient positioned on a linear-accelerator couch during an external-beam radiotherapy session",
    caption: "The beam itself is brief. Most of the appointment is spent on positioning and verification.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Positioning.** The patient lies in the planned treatment position.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Verification.** The radiation team checks positioning using imaging or other verification techniques.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Radiation delivery.** The machine delivers radiation according to the treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Completion.** The patient can usually leave after the session if no other treatment is scheduled.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation itself is generally delivered for only a short period during the appointment, although the total time at the hospital can be longer because of positioning and verification.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Radiation Therapy Hurt?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation delivery itself is generally not painful. Patients do not normally feel the radiation being delivered. However, side effects can develop during or after a course of treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These may include skin changes, redness, darkening of the skin, breast swelling, tenderness and fatigue. The severity varies between patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Common Side Effects of Breast Radiation",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Skin Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The skin in the treated area may gradually become red, darker, dry, sensitive or irritated. These changes usually develop gradually rather than immediately after the first treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation team can recommend appropriate skin-care measures. Patients should avoid applying creams, oils or other products to the treatment area unless advised by the radiation oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Fatigue",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is one of the commonly reported side effects of radiation therapy. It may become more noticeable as treatment progresses. Daily travel, other cancer treatments, poor sleep, stress, anaemia and nutrition can also contribute.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should inform their treatment team if fatigue is severe or interfering significantly with daily activities.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Breast Swelling and Tenderness",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients experience breast swelling, heaviness, tenderness or temporary changes in breast texture. These effects may improve after treatment finishes, although some changes can persist.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Cause Long-Term Changes?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients experience longer-term effects after breast radiation. These can include changes in skin colour, changes in breast texture, fibrosis, changes in breast size or shape, lymphedema in selected patients and rare effects involving nearby organs.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern radiation planning techniques are designed to reduce unnecessary radiation exposure to surrounding tissues. The individual risk depends on the treatment area, technique and patient's anatomy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation and Lymphedema",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymphedema is swelling caused by impaired lymphatic drainage. Breast cancer patients can have an increased risk because of lymph-node surgery, radiation to lymph-node regions, or a combination of surgery and radiation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The risk varies between patients. Patients should report persistent swelling of the arm, hand, breast or chest area to their healthcare team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation and the Heart",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation for left-sided breast cancer can potentially expose part of the heart to radiation. Modern radiation planning attempts to minimize this exposure.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Techniques such as deep inspiration breath hold, advanced treatment planning, image guidance and careful target definition may be used when appropriate. The actual technique depends on the patient's anatomy and treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation and the Lungs",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Part of the lung may be close to the radiation treatment area. Radiation planning therefore includes assessment of the lung and other nearby structures. The treatment team aims to deliver the required dose to the cancer treatment area while minimizing unnecessary exposure to healthy tissue.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Be Given With Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation and [chemotherapy](${CHEMO_BLOG}) may both be part of breast cancer treatment, but they are often given sequentially rather than simultaneously.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For example, a patient may undergo surgery → chemotherapy → radiation. Another patient may have surgery → radiation → [hormone therapy](${HORMONE}). The sequence depends on cancer subtype, stage, surgery, chemotherapy regimen, need for [targeted treatment](${TARGETED_COST}), pathology and the overall treatment plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Be Given Before Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In most breast cancer treatment pathways, surgery is generally performed before breast radiation when radiation is part of breast-conserving treatment. However, radiation can be used before surgery in selected clinical situations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The treatment sequence depends on the specific diagnosis and treatment objective. For international patients, the oncology team should provide a complete treatment sequence rather than treating radiation as an isolated procedure. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation for Stage 1 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For selected [Stage 1](${STAGES}) breast cancers treated with lumpectomy, radiation is commonly recommended. The treatment objective is to reduce the risk of cancer returning in the treated breast.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some carefully selected patients, particularly older patients with specific low-risk hormone-receptor-positive cancers, may be candidates for omission of radiation. This is a clinical decision and should not be generalized to all Stage 1 patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation for Stage 2 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation may be part of treatment for [Stage 2](${BY_STAGE}) breast cancer. The recommendation depends on the type of surgery, tumour size, lymph-node involvement, surgical margins and cancer biology.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After lumpectomy, radiation is commonly considered. After mastectomy, radiation depends on the risk of local or regional recurrence.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation for Stage 3 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation is generally an important component of treatment for many Stage 3 breast cancers. A common treatment sequence can involve systemic treatment → surgery → radiation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation field may include the breast or chest wall and regional lymph-node areas depending on the disease. The final plan depends on the response to treatment and surgical pathology.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation for Stage 4 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 4 breast cancer is metastatic disease. Systemic therapy usually plays a central role. However, radiation can still be useful in selected situations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For example, radiation may be used to reduce pain from bone metastases, treat a symptomatic brain metastasis, control a localized tumour, reduce bleeding or relieve pressure on nearby structures. In metastatic disease, radiation is usually selected based on the specific clinical problem being treated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Treat Breast Cancer Without Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In most standard breast cancer treatment pathways, radiation is not simply substituted for surgery when surgery is appropriate. Radiation is generally used as part of a broader treatment strategy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "However, there are specific clinical situations in which radiation can be used when surgery is not possible or when the treatment objective is symptom control. The appropriate approach depends on the individual diagnosis.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation After Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation can affect reconstructed breast tissue. For this reason, the possibility of radiation should be discussed before deciding on [reconstruction](${RECON}) timing and technique.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients may have mastectomy → immediate reconstruction → radiation, while others may have mastectomy → radiation → delayed reconstruction.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The choice depends on cancer stage, need for radiation, reconstruction technique, patient anatomy, surgical preference and patient preference. A breast surgeon and reconstructive surgeon should ideally coordinate with the radiation oncologist. See [Breast Reconstruction Doctors in India](${RECON_DOCTORS}) and [reconstruction cost](${RECON_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Therapy Cost for Breast Cancer in India",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-breast-followup-visual.webp",
    alt: "Radiation oncologist reviewing a treatment-planning scan with a patient during a cost and session discussion",
    caption: "Ask for an itemized quotation after the radiation plan is known — technique, sessions and lymph-node fields change the total.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single fixed cost for breast radiation therapy in India. See [Radiation Therapy Cost in India](${RAD_COSTS}), [EBRT cost](${EBRT_COST}) and the [breast cancer treatment cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The total cost can depend on radiation technique, number of treatment sessions, treatment area, CT simulation, treatment planning, image guidance, radiation equipment, hospital, city, whether lymph nodes are included and additional planning procedures.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore, patients should request an itemized radiation quotation. The quotation should clearly state whether the following are included: radiation oncology consultation, CT simulation, treatment planning, dosimetry, radiation sessions, image guidance and follow-up consultation.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a radiation quotation",
    href: consult("Breast Cancer Radiation Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send a case-specific quotation for breast cancer radiation therapy in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Cost of Radiation Therapy After Lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The cost depends on the radiation schedule and technique. A patient receiving breast-only radiation may have a different treatment plan from a patient who also requires regional lymph-node irradiation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The total cost therefore cannot be accurately determined simply from the fact that the patient had a lumpectomy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Cost of Radiation After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Post-mastectomy radiation can involve treatment of the chest wall and potentially regional lymph-node areas. The cost depends on the treatment field, number of sessions, planning complexity, radiation technology and hospital. See [Mastectomy Cost in India](${MASTECTOMY_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should obtain a treatment-specific quotation after radiation planning.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Radiation Technology Is Used in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Modern cancer centres may use technologies and planning approaches such as [3D conformal radiation therapy](${CRT_COST}), [IMRT](${IMRT_COST}), image-guided radiation therapy, VMAT, deep inspiration breath hold and other specialized planning techniques. Compare [IMRT versus 3D-CRT](${IMRT_BLOG}) and review [what records to send before EBRT](${EBRT_RECORDS}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The appropriate technology is not determined simply by choosing the newest machine. The radiation oncologist selects a technique based on target location, patient anatomy, required dose, nearby organs and the treatment objective.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Radiation Oncology Doctors in India](${RAD_DOCTORS})\n- [Radiation Oncology Hospitals in India](${RAD_HOSPITALS})\n- [EBRT doctors in India](${EBRT_DOCTORS})\n- [EBRT cost in India](${EBRT_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Therapy vs Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Radiation Therapy | Chemotherapy |\n| --- | --- | --- |\n| Treatment type | Local | Systemic |\n| Main target | Specific treatment area | Cancer cells throughout the body |\n| Common breast cancer use | After surgery or selected metastatic sites | Before/after surgery or metastatic disease |\n| Administration | External radiation or other specialized approaches | IV or oral medicines |\n| Daily treatment | Often repeated sessions | Usually given in cycles |\n| Main side effects | Often localized to treatment area | Can affect multiple body systems |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A patient may receive both because they serve different purposes. See [Chemotherapy for Breast Cancer in India](${CHEMO_BLOG}) and [Chemotherapy Cost in India](${CHEMO_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Therapy vs Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery physically removes the cancer. Radiation damages cancer cells in the treatment area. For breast cancer, the two are often complementary.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For example, [lumpectomy](${LUMPECTOMY_COST}) → radiation is a common treatment pathway for appropriately selected patients. [Mastectomy](${MASTECTOMY_DOCTORS}) may or may not be followed by radiation depending on pathology.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Should Patients Prepare for Radiation Therapy?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Attend the radiation planning appointment.",
      "Follow positioning instructions.",
      "Tell the team about previous radiation.",
      "Tell the team about implants or reconstruction.",
      "Discuss pregnancy where relevant.",
      "Inform the team about medications and medical conditions.",
      "Ask about skin care.",
      "Plan transportation if daily travel is difficult.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should not make major changes to their medication or diet without discussing them with their medical team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can International Patients Complete Radiation Therapy in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes, but radiation usually involves repeated visits over a period of time. International patients therefore need to plan accommodation near the hospital, transportation, treatment dates, attendant arrangements, follow-up appointments, emergency contact arrangements and travel home after treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The exact duration depends on the prescribed radiation schedule. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm start and completion dates before final travel arrangements.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Records Should International Patients Send Before Travelling?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For a radiation opinion, useful records may include [pathology](${DIAGNOSIS}) (biopsy, histopathology, ER, PR, HER2 and other biomarkers), imaging (mammography, ultrasound, breast MRI, CT, PET-CT where applicable), surgery (operative report, final pathology, lymph-node pathology) and previous treatment (chemotherapy, targeted therapy and previous radiation records).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation oncologist may request the actual imaging or pathology material if the available reports are insufficient.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my breast cancer records for a radiation opinion before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Radiation Oncologist",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Why do I need radiation?",
      "What area will be treated?",
      "Will the lymph nodes be included?",
      "How many sessions will I need?",
      "What radiation technique will be used?",
      "Will I need CT simulation?",
      "Can deep inspiration breath hold be used?",
      "What side effects should I expect?",
      "What skin-care instructions should I follow?",
      "How long will each visit take?",
      "Can I continue normal activities?",
      "Can I travel during treatment?",
      "When can I return home?",
      "How will radiation affect reconstruction?",
      "What is included in the radiation cost estimate?",
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
    text: "Is radiation necessary after breast cancer surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not always. Radiation is commonly used after breast-conserving surgery and may be recommended after mastectomy depending on the patient's risk factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Do I need radiation after lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Many patients do, although selected low-risk patients may be able to omit it. The decision depends on the patient's age, tumour characteristics, pathology and overall treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Do I need radiation after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients do and others do not. Tumour size, lymph-node involvement, margins and other pathological findings can influence the recommendation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How many radiation sessions are needed for breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal number. The schedule depends on the treatment plan, cancer characteristics and radiation technique.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is radiation therapy painful?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation delivery itself is generally not painful. Side effects such as skin irritation, swelling or fatigue can develop during treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does radiation cause hair loss?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation affects hair only in the area being treated. Breast radiation does not normally cause the type of whole-body hair loss associated with some chemotherapy medicines.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I work during radiation therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Many patients continue some or all of their normal activities during radiation, although fatigue may increase as treatment progresses.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I travel while receiving radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It may be possible, but patients receiving daily or frequent treatment need to remain close enough to the treatment centre. International travel should be planned with the radiation oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can radiation be given after chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Chemotherapy and radiation can both be part of breast cancer treatment, and the sequence is determined by the oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can radiation damage the heart?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation to the left breast can expose part of the heart to radiation. Modern planning techniques aim to minimize this exposure, and techniques such as deep inspiration breath hold may be used for selected patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can radiation affect breast reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Radiation can influence reconstructed breast tissue and can affect reconstruction planning. The breast surgeon, reconstructive surgeon and radiation oncologist should coordinate when reconstruction is being considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How much does breast cancer radiation therapy cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single fixed price. Cost depends on the radiation technique, number of sessions, treatment area, planning requirements, hospital and other factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Therapy for Breast Cancer in India: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation therapy is an important component of breast cancer treatment for many patients, particularly after breast-conserving surgery. It may also be recommended after mastectomy when the cancer has characteristics associated with a higher risk of local or regional recurrence.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The radiation plan depends on breast cancer stage, tumour size, lymph-node involvement, surgical margins, type of surgery, ER/PR/HER2 status, previous treatment, reconstruction and individual anatomy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern radiation treatment is carefully planned to deliver radiation to the required area while limiting exposure to nearby healthy tissues. For international patients, radiation treatment requires additional planning because treatment may involve multiple hospital visits over several weeks or a shorter prescribed schedule.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most useful next step is to have the complete pathology, imaging and surgical records reviewed by a radiation oncology team so that the treatment area, number of sessions, technique and estimated cost can be determined for the individual patient.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan radiation therapy for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Radiation Oncology Doctors in India](${RAD_DOCTORS})\n- [Radiation Oncology Hospitals in India](${RAD_HOSPITALS})\n- [Radiation therapy cost in India](${RAD_COSTS})\n- [EBRT doctors](${EBRT_DOCTORS})\n- [EBRT cost](${EBRT_COST})\n- [Lumpectomy](${LUMPECTOMY_COST})\n- [Mastectomy](${MASTECTOMY_COST})\n- [Breast Reconstruction](${RECON})\n- [Chemotherapy for Breast Cancer](${CHEMO_BLOG})\n- [Hormone Therapy for Breast Cancer](${HORMONE})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Treatment for international patients](${INTL})`,
  },
];

const now = "2026-09-27T19:00:00.000Z";
const SLUG = "radiation-therapy-for-breast-cancer";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_radiation_therapy_for_breast_cancer",
  slug: SLUG,
  title: "Radiation Therapy for Breast Cancer: When Is It Needed and How Does It Work?",
  excerpt:
    "When radiation is needed after lumpectomy or mastectomy, how CT simulation and sessions work, side effects, reconstruction timing and why India quotes must be case-specific.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Radiation Oncology",
  tags: ["breast cancer", "radiation therapy", "radiotherapy", "India", "travel", "EBRT"],
  image: "/uploads/articles/radiation-breast-planning-visual.webp",
  imageAlt:
    "Radiation therapy for breast cancer showing treatment planning and targeted radiation delivery",
  status: "published",
  featured: true,
  seoTitle: "Radiation Therapy for Breast Cancer in India | Cost & Sessions",
  seoDescription:
    "Learn when radiation therapy is needed for breast cancer, how many sessions may be required, side effects, treatment planning and radiation cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/radiation-breast-planning-visual.webp",
  allowIndex: true,
  keywords: [
    "Radiation therapy for breast cancer",
    "radiation therapy for breast cancer in India",
    "breast cancer radiation therapy",
    "radiation after lumpectomy",
    "radiation after mastectomy",
    "breast cancer radiotherapy cost",
    "radiation therapy cost in India",
    "breast cancer radiation sessions",
    "radiation oncology for breast cancer",
    "breast cancer radiation side effects",
    "breast cancer radiation treatment",
    "radiation oncologist for breast cancer",
    "breast cancer treatment in India",
    "post mastectomy radiation therapy",
    "breast cancer radiotherapy in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Radiation Oncology Doctors in India", href: RAD_DOCTORS },
    { label: "EBRT cost in India", href: EBRT_COST },
    { label: "Lumpectomy", href: LUMPECTOMY_COST },
    { label: "Mastectomy", href: MASTECTOMY_COST },
    { label: "Breast Reconstruction After Mastectomy", href: RECON },
    { label: "Chemotherapy for Breast Cancer", href: CHEMO_BLOG },
    { label: "Hormone Therapy for Breast Cancer", href: HORMONE },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Radiation Oncology")) {
  store.categories.push("Radiation Oncology");
}
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  {
    id: "media_rt_planning",
    url: "/uploads/articles/radiation-breast-planning-visual.webp",
    name: "radiation-breast-planning-visual.webp",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_rt_session",
    url: "/uploads/articles/radiation-breast-session-visual.webp",
    name: "radiation-breast-session-visual.webp",
    alt: "External-beam radiotherapy session on a linear accelerator",
    addedAt: now,
  },
  {
    id: "media_rt_dibh",
    url: "/uploads/articles/radiation-breast-breath-hold-visual.webp",
    name: "radiation-breast-breath-hold-visual.webp",
    alt: "Deep-inspiration breath-hold coaching during breast radiotherapy",
    addedAt: now,
  },
  {
    id: "media_rt_followup",
    url: "/uploads/articles/radiation-breast-followup-visual.webp",
    name: "radiation-breast-followup-visual.webp",
    alt: "Radiation oncology consultation over a treatment-planning scan",
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
  "art_breast_reconstruction_after_mastectomy_india",
  "art_hormone_therapy_breast_cancer_india",
  "art_her2_positive_breast_cancer_treatment_india",
  "art_breast_cancer_treatment_india_international_patients",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
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
      label: "Radiation Therapy for Breast Cancer in India",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
