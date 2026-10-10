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
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
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

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Lumpectomy removes the breast tumour and a margin of surrounding tissue while preserving most of the breast. It is commonly followed by radiation therapy.</p><p class="article-quick-answer__body">Mastectomy removes the entire breast and may be recommended when breast-conserving surgery is not suitable, when there are multiple areas of cancer, when the tumour is large relative to breast size, after certain previous treatments, or based on patient preference and clinical circumstances.</p><p class="article-quick-answer__body">For appropriately selected patients with early-stage breast cancer, lumpectomy followed by radiation and mastectomy provide comparable long-term survival. The choice therefore depends on the specific cancer, treatment plan, anatomy, radiation considerations and the patient's preferences.</p><p class="article-quick-answer__body">Lumpectomy: preserves most of the breast but usually requires radiation.</p><p class="article-quick-answer__body">Mastectomy: removes the breast and may reduce the likelihood of needing radiation in some early-stage situations, although radiation can still be required.</p><p class="article-quick-answer__body">Neither surgery is automatically appropriate for every patient.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `When breast cancer is diagnosed and surgery is recommended, one of the most important decisions may be whether to have breast-conserving surgery (lumpectomy) or a mastectomy. This comparison supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [surgery guide](${SURGERY}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about lumpectomy vs mastectomy",
    href: consult("Lumpectomy vs Mastectomy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your imaging](${wa("Please advise whether lumpectomy or mastectomy is more suitable in my case.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lumpectomy-vs-mastectomy-consult-visual.webp",
    alt: "Lumpectomy vs mastectomy for breast cancer showing breast-conserving surgery and complete breast removal",
    caption: "This is not simply a choice between removing less and removing more. Follow-up radiation, reconstruction and recovery differ.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A lumpectomy is a type of breast-conserving surgery. The surgeon removes the breast tumour, a margin of surrounding normal tissue, and additional tissue when required for adequate cancer removal. Most of the breast remains in place. Lymph nodes under the arm may also be assessed, commonly through a sentinel lymph node biopsy.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Lumpectomy may also be called breast-conserving surgery, partial mastectomy, wide local excision or segmental mastectomy. For most patients, [radiation therapy](${RADIATION}) is recommended after the breast has healed. Some patients may also require [chemotherapy](${CHEMO}), [hormone therapy](${HORMONE}), [HER2-targeted therapy](${HER2}) or immunotherapy in selected situations.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-Conserving Surgery Doctors in India](${LUMPECTOMY_DOCTORS})\n- [Lumpectomy Cost in India](${LUMPECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A mastectomy removes the entire breast containing the cancer. It may involve removal of breast tissue, skin, the nipple and areola in some procedures, and other nearby tissue when clinically necessary. Some techniques can preserve selected breast skin or the nipple-areola complex in appropriately selected patients.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Mastectomy Doctors in India](${MASTECTOMY_DOCTORS})\n- [Mastectomy Cost in India](${MASTECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy vs Mastectomy: Key Differences",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Lumpectomy | Mastectomy |\n| --- | --- | --- |\n| Breast tissue removed | Tumour + surrounding margin | Entire breast |\n| Most of breast preserved | Yes | No |\n| Radiation | Usually required | May or may not be required |\n| Reconstruction | Usually not required | May be considered |\n| Breast appearance | Most of breast remains | Reconstruction or flat closure are options |\n| Additional surgery | May be needed if margins contain cancer | May be required depending on reconstruction |\n| Lymph-node assessment | May be performed | May be performed |\n| Suitable for every breast cancer | No | No |\n| Long-term survival in selected early-stage patients | Comparable with mastectomy when followed by appropriate radiation | Comparable with breast-conserving surgery plus appropriate radiation |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask which option is medically suitable](${consult("Lumpectomy vs Mastectomy")}) · [WhatsApp +91 90443 46292](${wa("Can I have lumpectomy, or is mastectomy recommended in my case?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Lumpectomy or Mastectomy Improve Survival?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For appropriately selected patients with [early-stage](${STAGES}) breast cancer, research has shown that breast-conserving surgery followed by radiation provides survival outcomes comparable to mastectomy. Having a mastectomy does not automatically mean a better survival outcome simply because more breast tissue has been removed. These comparisons apply to patients who are appropriate candidates for both approaches and who receive the recommended additional treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Lumpectomy Usually Considered?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lumpectomy-vs-mastectomy-imaging-visual.webp",
    alt: "Surgeon and patient reviewing mammograms while discussing whether conservation is possible",
    caption: "Tumour size relative to the breast, number of tumours, imaging and the ability to receive radiation all affect eligibility.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lumpectomy may be an option when the cancer can be removed adequately while preserving an acceptable amount and shape of the breast. Factors that can support breast-conserving surgery include a tumour that is relatively small compared with the breast, a cancer confined to an area that can be removed adequately, ability to receive appropriate radiation therapy, no contraindication to breast-conserving treatment, and a surgical plan that can achieve appropriate margins.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Might Mastectomy Be Recommended?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mastectomy may be considered when the cancer is large relative to the breast, there are multiple areas of cancer, the tumour cannot be removed with satisfactory breast conservation, the patient has previously received radiation to the chest, a previous lumpectomy did not completely remove the cancer, the cancer type or location makes breast conservation unsuitable, the patient prefers mastectomy after discussing the options, or there is a substantially increased genetic or familial risk. Inflammatory breast cancer is another situation in which mastectomy can form part of treatment after appropriate systemic therapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Lumpectomy Always Require Radiation?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lumpectomy-vs-mastectomy-radiation-visual.webp",
    alt: "Radiation oncologist reviewing a session calendar with a patient after lumpectomy",
    caption: "Most patients who have lumpectomy for invasive cancer or DCIS receive radiation. Selected low-risk patients may omit it.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For most patients who undergo lumpectomy for invasive breast cancer or DCIS, [radiation](${RADIATION}) is part of the treatment plan. The radiation plan can depend on age, tumour size, tumour biology, lymph-node status, surgical margins, previous treatment and the overall clinical situation. There are also selected patients for whom radiation may be omitted under specific circumstances.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Mastectomy Always Mean No Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. One common misconception is that mastectomy completely eliminates the need for radiation. Some patients still require radiation after mastectomy, particularly when there are factors such as significant lymph-node involvement, a larger tumour or cancer involving certain surgical margins. Lumpectomy does not automatically mean more treatment, and mastectomy does not automatically mean no radiation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Mastectomy and Reconstruction",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lumpectomy-vs-mastectomy-reconstruction-visual.webp",
    alt: "Reconstructive surgeon discussing flat closure and implant options after mastectomy",
    caption: "After mastectomy, options include flat closure, an external prosthesis, implant reconstruction or tissue-based reconstruction — immediate or delayed.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Patients undergoing mastectomy may choose flat closure, an external breast prosthesis, implant reconstruction, autologous tissue reconstruction, immediate reconstruction or delayed reconstruction. The possibility of radiation can influence reconstruction planning. See [Breast Reconstruction After Mastectomy](${RECON}), [reconstruction doctors](${RECON_DOCTORS}) and [reconstruction cost](${RECON_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Nipple-Sparing Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A nipple-sparing mastectomy removes breast tissue while preserving the nipple-areola complex in selected patients. It is often discussed together with reconstruction. The breast surgeon needs to assess tumour location, distance from the nipple, nipple involvement, imaging findings, skin and breast anatomy and cancer characteristics.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Nipple-Sparing Mastectomy Doctors in India](${NSM_DOCTORS})\n- [Nipple-Sparing Mastectomy Cost](${NSM_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Oncoplastic Breast Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Oncoplastic breast surgery combines cancer removal with reconstructive techniques. It can be considered when removing the tumour could otherwise cause a noticeable change in breast shape.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Oncoplastic Breast Surgery Doctors in India](${ONCO_DOCTORS})\n- [Oncoplastic Breast Surgery Cost](${ONCO_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens to the Lymph Nodes?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A sentinel lymph node biopsy is commonly performed in appropriate patients. The surgeon identifies the first lymph nodes that are most likely to receive drainage from the tumour area and removes them for pathological examination. The lymph-node findings can affect cancer staging, radiation planning and systemic treatment decisions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens If Cancer Cells Are Found at the Surgical Margin?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After lumpectomy, the pathologist evaluates whether cancer cells are present at the edges of the removed tissue. If additional tissue needs to be removed to achieve an appropriate margin, another surgery may sometimes be required. In some situations, a mastectomy may subsequently be considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Recovery After Lumpectomy and Mastectomy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After lumpectomy, many patients experience pain or tenderness around the incision, swelling, bruising, temporary changes in breast shape, numbness around the surgical area and fatigue. After mastectomy, recovery can involve incision discomfort, chest tightness, swelling, temporary or permanent numbness, limited arm movement initially, drain management and a longer recovery when reconstruction is performed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy vs Mastectomy: Cost Considerations",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `With lumpectomy, the overall treatment cost may include surgery, anaesthesia, hospital stay, pathology, lymph-node assessment, [radiation](${EBRT_COST}) and additional systemic treatment. With mastectomy, the cost may include mastectomy, reconstruction if chosen, radiation where indicated and additional systemic treatment. Comparing only the initial operation can give an incomplete picture. See the [cost guide](${COST}), [lumpectomy cost](${LUMPECTOMY_COST}) and [mastectomy cost](${MASTECTOMY_COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a surgery quotation",
    href: consult("Lumpectomy vs Mastectomy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send quotations for lumpectomy and mastectomy pathways in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can You Choose Mastectomy Even If Lumpectomy Is Possible?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In some cases, yes. A patient who is medically eligible for breast-conserving surgery may still choose mastectomy after discussing the alternatives. The decision can be influenced by personal preferences, previous treatment, family history, genetic risk, concerns about future surgery, willingness or ability to undergo radiation, and reconstruction preferences.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Mastectomy Prevent Breast Cancer From Coming Back?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mastectomy removes most of the breast tissue, but it does not guarantee that breast cancer can never return. Cancer can recur in the chest wall or surrounding tissues. The NCI notes that local recurrence can occur after mastectomy as well as after breast-conserving surgery. Radiation after lumpectomy helps reduce the risk of return in the treated breast.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Which Surgery Is Better for You?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no universal answer. A breast cancer team may consider tumour size and location, number of tumours, [stage](${BY_STAGE}), lymph-node involvement, [ER/PR and HER2 status](${BIOMARKERS}), genetic factors, previous radiation, overall health, ability to receive radiation, reconstruction preferences, and need for [chemotherapy](${CHEMO_COST}), [hormone therapy](${HORMONE_COST}), [targeted therapy](${TARGETED_COST}) or [immunotherapy](${IMMUNO_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Surgical oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can review [pathology and imaging](${DIAGNOSIS}) before travel. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm stay length. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("Please review my imaging and pathology to advise lumpectomy versus mastectomy before I travel to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Breast Surgeon",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Am I medically eligible for breast-conserving surgery?",
      "Why are you recommending this particular surgery?",
      "How large is the tumour compared with my breast?",
      "Is there more than one area of cancer?",
      "Will I need radiation after lumpectomy or after mastectomy?",
      "Will my lymph nodes be examined?",
      "Could I need another surgery after lumpectomy?",
      "What reconstruction options are available if I choose mastectomy?",
      "Would chemotherapy be needed before surgery?",
      "How will ER, PR and HER2 results affect my treatment?",
      "Should I obtain a second opinion before surgery?",
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
    text: "Is lumpectomy safer than mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Both are established breast cancer surgical approaches. The appropriate option depends on the cancer and patient. For appropriately selected early-stage patients, lumpectomy followed by radiation and mastectomy have comparable survival outcomes.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is mastectomy better than lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal answer. Some patients are better suited to mastectomy, while others are candidates for breast-conserving surgery. When both are appropriate for early-stage disease, the decision involves medical factors as well as patient preferences.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does lumpectomy always require chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Chemotherapy is determined by the characteristics of the cancer, not simply by whether lumpectomy was performed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does mastectomy eliminate the need for chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Chemotherapy and other systemic treatments may still be required after mastectomy depending on the cancer's stage and biology.",
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
    text: "Most patients receiving breast-conserving surgery receive radiation, although there are selected situations where radiation may be omitted.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I need radiation after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some patients require radiation after mastectomy depending on tumour size, lymph-node involvement and other pathological factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I have reconstruction after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Reconstruction can be immediate or delayed and can use implants, tissue from another part of the body, or a combination of approaches.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can nipple-sparing mastectomy be performed for every patient?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Nipple preservation depends on tumour location, nipple involvement, imaging and other clinical factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can lumpectomy be performed for Stage 2 breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can be an option for selected Stage 2 patients. The suitability depends on tumour characteristics, breast anatomy and the overall treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What happens if cancer is found at the edge of the lumpectomy specimen?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Additional surgery may sometimes be required to remove more tissue. In some circumstances, mastectomy may be considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How do I decide between lumpectomy and mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Discuss the medical suitability of each approach with your breast surgeon and oncology team. Consider the complete treatment pathway, including radiation, systemic therapy, reconstruction and your own preferences.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy vs Mastectomy: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lumpectomy and mastectomy are both established surgical approaches for breast cancer, but they are not interchangeable for every patient. Lumpectomy preserves most of the breast and is commonly followed by radiation. Mastectomy removes the entire breast and may be appropriate when breast conservation is not suitable or when a patient chooses it after discussing the options.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The decision should be based on cancer characteristics, imaging, pathology, stage, radiation requirements, reconstruction options and patient preferences.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me decide between lumpectomy and mastectomy in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Breast Cancer Surgery in India](${SURGERY})\n- [Lumpectomy doctors](${LUMPECTOMY_DOCTORS}) · [cost](${LUMPECTOMY_COST})\n- [Mastectomy doctors](${MASTECTOMY_DOCTORS}) · [cost](${MASTECTOMY_COST})\n- [Nipple-sparing mastectomy](${NSM_COST})\n- [Oncoplastic breast surgery](${ONCO_COST})\n- [Breast reconstruction](${RECON})\n- [Radiation therapy](${RADIATION})\n- [Chemotherapy](${CHEMO})\n- [Hormone therapy](${HORMONE})\n- [Treatment for international patients](${INTL})`,
  },
];

const now = "2026-09-27T20:30:00.000Z";
const SLUG = "lumpectomy-vs-mastectomy";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_lumpectomy_vs_mastectomy",
  slug: SLUG,
  title: "Lumpectomy vs Mastectomy: Which Breast Cancer Surgery Is Right for You?",
  excerpt:
    "How lumpectomy and mastectomy differ, when each is considered, radiation and reconstruction implications, recovery and why the complete pathway matters more than the first operation.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "lumpectomy", "mastectomy", "surgery", "India", "travel"],
  image: "/uploads/articles/lumpectomy-vs-mastectomy-consult-visual.webp",
  imageAlt: "Lumpectomy vs mastectomy for breast cancer showing breast-conserving surgery and complete breast removal",
  status: "published",
  featured: true,
  seoTitle: "Lumpectomy vs Mastectomy: Differences, Benefits & Recovery",
  seoDescription:
    "Lumpectomy vs mastectomy explained: understand the differences, eligibility, radiation, reconstruction, recovery and costs for breast cancer surgery in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/lumpectomy-vs-mastectomy-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "Lumpectomy vs mastectomy",
    "lumpectomy vs mastectomy",
    "lumpectomy or mastectomy",
    "breast cancer surgery options",
    "breast conserving surgery vs mastectomy",
    "lumpectomy in India",
    "mastectomy in India",
    "lumpectomy cost in India",
    "mastectomy cost in India",
    "breast cancer surgery in India",
    "radiation after lumpectomy",
    "radiation after mastectomy",
    "breast reconstruction after mastectomy",
    "nipple sparing mastectomy",
    "oncoplastic breast surgery",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Breast Cancer Surgery in India", href: SURGERY },
    { label: "Lumpectomy cost", href: LUMPECTOMY_COST },
    { label: "Mastectomy cost", href: MASTECTOMY_COST },
    { label: "Radiation Therapy", href: RADIATION },
    { label: "Breast Reconstruction", href: RECON },
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
  { id: "media_lvm_consult", url: "/uploads/articles/lumpectomy-vs-mastectomy-consult-visual.webp", name: "lumpectomy-vs-mastectomy-consult-visual.webp", alt: article.imageAlt, addedAt: now },
  { id: "media_lvm_imaging", url: "/uploads/articles/lumpectomy-vs-mastectomy-imaging-visual.webp", name: "lumpectomy-vs-mastectomy-imaging-visual.webp", alt: "Imaging review for conservation eligibility", addedAt: now },
  { id: "media_lvm_rad", url: "/uploads/articles/lumpectomy-vs-mastectomy-radiation-visual.webp", name: "lumpectomy-vs-mastectomy-radiation-visual.webp", alt: "Radiation planning after lumpectomy", addedAt: now },
  { id: "media_lvm_recon", url: "/uploads/articles/lumpectomy-vs-mastectomy-reconstruction-visual.webp", name: "lumpectomy-vs-mastectomy-reconstruction-visual.webp", alt: "Reconstruction options after mastectomy", addedAt: now },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

const siblingIds = [
  "art_breast_cancer_surgery_in_india",
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_radiation_therapy_for_breast_cancer",
  "art_breast_reconstruction_after_mastectomy_india",
  "art_hormone_therapy_breast_cancer_india",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_treatment_by_stage",
];
for (const siblingId of siblingIds) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Lumpectomy vs Mastectomy", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
