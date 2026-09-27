import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const CHEMO_SE = "/blogs/breast-cancer-chemotherapy-side-effects";
const TARGETED_SE = "/blogs/breast-cancer-targeted-therapy-side-effects";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is neoadjuvant therapy for breast cancer?</strong> Neoadjuvant therapy is treatment given before breast cancer surgery. It may include chemotherapy, targeted therapy, immunotherapy or, in selected situations, hormone therapy.</p><p class="article-quick-answer__body"><strong>Why is treatment given before surgery?</strong> It may shrink the tumor, make breast-conserving surgery possible, treat cancer cells elsewhere in the body early, and show how the tumor responds to treatment.</p><p class="article-quick-answer__body"><strong>Which breast cancers commonly receive neoadjuvant treatment?</strong> It may be considered for larger tumors, lymph-node-positive disease, high-grade cancers, HER2-positive breast cancer, triple-negative breast cancer and inflammatory breast cancer. The decision is individualized.</p><p class="article-quick-answer__body"><strong>Is neoadjuvant therapy the same as chemotherapy?</strong> No. Chemotherapy is one type of neoadjuvant treatment. Depending on the cancer subtype, treatment before surgery may also include HER2-targeted therapy, immunotherapy or hormone therapy.</p><p class="article-quick-answer__body"><strong>Can neoadjuvant treatment shrink a tumor enough to avoid mastectomy?</strong> Sometimes. Tumor shrinkage can make breast-conserving surgery possible for some patients who initially were not suitable candidates.</p><p class="article-quick-answer__body"><strong>Does everyone need chemotherapy before breast cancer surgery?</strong> No. Some patients are better suited to surgery first, while others may benefit from treatment before surgery.</p><p class="article-quick-answer__body"><strong>How long does neoadjuvant treatment take?</strong> The duration depends on the cancer subtype, treatment regimen and response. Some regimens involve several cycles over a number of months.</p><p class="article-quick-answer__body"><strong>What happens if the tumor disappears before surgery?</strong> Imaging may show no detectable tumor, but that does not automatically mean surgery can be skipped. The surgical plan depends on the cancer type, treatment response and current evidence.</p><p class="article-quick-answer__body"><strong>What is pathological complete response?</strong> It means that no residual invasive cancer is found in the breast and sampled lymph nodes when the surgical tissue is examined under a microscope after neoadjuvant treatment. The exact definition can vary by study.</p><p class="article-quick-answer__body"><strong>Can neoadjuvant therapy be given in India?</strong> Yes. Breast cancer centers in India use multidisciplinary treatment approaches that can include medical oncology, breast surgery, radiation oncology, pathology and diagnostic imaging.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For some people with breast cancer, surgery is the first major treatment. For others, doctors recommend treatment before surgery. This approach is called neoadjuvant therapy. A patient may reasonably ask, “If the cancer needs to be removed, why aren't we operating immediately?” There are several reasons. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [chemotherapy](${CHEMO}) and [surgery](${SURGERY}) explainers.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF whether treatment should start before surgery",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology](${wa("Please review my records and advise whether neoadjuvant therapy before surgery is appropriate in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/neoadjuvant-infusion-visual.webp",
    alt: "Neoadjuvant breast cancer treatment before surgery showing chemotherapy and tumor response",
    caption: "Neoadjuvant therapy is given before surgery so doctors can shrink the tumour, treat microscopic disease early and see how the cancer responds.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Neoadjuvant Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Neoadjuvant therapy means treatment given before the main local treatment, usually surgery. The most familiar example is [chemotherapy](${CHEMO}) before surgery, but the approach is broader. Depending on the type of breast cancer, it can involve chemotherapy, [HER2-targeted therapy](${HER2}), immunotherapy or [hormone therapy](${HT}) in selected patients. ER, PR and HER2 status, tumour size, lymph-node involvement, grade and [clinical stage](${BY_STAGE}) all help doctors decide whether treatment before surgery is appropriate. See [what ER, PR and HER2 results mean](${BIOMARKERS}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Give Treatment Before Removing the Tumour?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is more than one reason. A large tumour may become smaller after systemic treatment, which can sometimes make surgery less extensive. Some patients initially require a mastectomy because of the size or extent of the tumour; if it responds well, [breast-conserving surgery](${LUMP}) may become an option in selected cases. Systemic treatment also reaches the bloodstream and can address microscopic cancer cells throughout the body. And the tumour's response can provide information that may influence treatment after surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Which Patients May Need Neoadjuvant Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single tumour size or stage that automatically means neoadjuvant treatment is required. Doctors look at the complete picture. It may be considered for larger tumours, lymph-node-positive disease, high-grade breast cancer, [HER2-positive](${HER2}) breast cancer, triple-negative breast cancer, inflammatory breast cancer and locally advanced disease. These are examples rather than an exhaustive list. Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm the sequence after reviewing pathology and imaging.`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/neoadjuvant-consult-visual.webp",
    alt: "Multidisciplinary planning for neoadjuvant breast cancer treatment",
    caption: "The plan depends on subtype, stage, biomarkers and whether breast-conserving surgery is a goal.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Neoadjuvant Therapy for HER2-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `HER2-positive breast cancer is one of the situations where treatment before surgery has become particularly important. Treatment may combine chemotherapy with [HER2-targeted medicines](${TARGETED_SE}). The exact combination depends on the disease characteristics and the protocol selected by the oncology team. The amount of cancer remaining at surgery can influence subsequent treatment. Current approaches often involve a planned sequence of therapy before and after surgery rather than treating each step independently.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Neoadjuvant Therapy for Triple-Negative Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer does not have estrogen receptors, progesterone receptors or excess HER2. Because hormone therapy and HER2-targeted therapy are not options for the cancer itself, systemic chemotherapy has an important role. For appropriate patients with early-stage or locally advanced triple-negative breast cancer, chemotherapy may be given before surgery, sometimes together with immunotherapy such as pembrolizumab. Treatment decisions depend on stage, eligibility and the overall clinical situation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Neoadjuvant Therapy for Inflammatory Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Inflammatory breast cancer is a distinct and aggressive form of breast cancer. Because it often involves a large area of the breast and skin, treatment usually begins with systemic therapy rather than immediate surgery. Surgery generally follows systemic treatment, with modified radical mastectomy used as the standard surgical approach. [Radiation](${RAD}) is also commonly incorporated. This is a different pathway from that used for many small, early breast cancers.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Hormone Therapy Be Given Before Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `In selected patients, yes. This is sometimes called neoadjuvant endocrine therapy. It may be considered particularly in certain postmenopausal patients with hormone receptor-positive breast cancer when chemotherapy is not appropriate or when the goal is to reduce tumour size before surgery. It is not routinely used as a substitute for chemotherapy in every patient. See the [hormone therapy guide](${HT}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens Before Neoadjuvant Treatment Starts?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Treatment usually begins only after the cancer has been characterised. The evaluation may include a biopsy confirming invasive breast cancer; pathology for ER, PR, HER2, grade and histologic type; imaging such as mammography, ultrasound, MRI, CT or PET-CT when indicated; lymph-node assessment and possible node biopsy; and a medical assessment of blood counts, kidney and liver function, heart function when relevant, existing conditions and current medicines. See [diagnosis and biopsy](${DIAGNOSIS}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2 status can significantly influence the plan. A patient with HER2-positive disease may be eligible for HER2-targeted treatment; a HER2-negative cancer follows a different pathway. If there is uncertainty about the HER2 result, the treating centre may recommend pathology review. ER and PR indicate whether the cancer has hormone receptors and affect both the treatment sequence and treatments after surgery. Carry the original immunohistochemistry report rather than only a summary stating \"hormone positive.\"",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/neoadjuvant-imaging-visual.webp",
    alt: "Response imaging during neoadjuvant breast cancer therapy",
    caption: "Imaging during treatment helps the team decide whether surgery can be less extensive.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is the Response Monitored?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors do not simply give treatment and wait until surgery. Monitoring can involve physical examination of the breast and lymph nodes, imaging when appropriate, review of symptoms, blood tests and side-effect checks. If breast conservation is being considered, repeat radiographic assessment is particularly important.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What If the Tumour Gets Smaller?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "That is generally evidence that the cancer is responding. But tumour shrinkage does not automatically determine the final surgery. The surgeon will consider original and current extent, location, imaging, pathology, breast size, previous treatment and patient preference. Some patients may become candidates for lumpectomy. Others may still require mastectomy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What If the Tumour Does Not Shrink?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not every breast cancer responds in the same way. If the cancer does not respond adequately, the team may reassess the plan. Patients with progressive disease during preoperative therapy may transition to another regimen or proceed to surgery when feasible.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a neoadjuvant treatment review",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about chemotherapy or targeted therapy before surgery](${wa("Please advise on chemotherapy or targeted therapy before breast cancer surgery in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Pathological Complete Response?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "You may hear the abbreviation pCR. In broad terms, it means that after neoadjuvant treatment, no residual invasive cancer is identified in the breast and sampled lymph nodes when the surgical specimen is examined under the microscope. The precise definition can vary by study. pCR is particularly useful in certain subtypes because it shows how strongly the tumour responded.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A pathological complete response is a very encouraging finding, but it does not mean the cancer is cured or that recurrence is impossible. Patients still require the rest of their recommended treatment and follow-up. Conversely, residual cancer after neoadjuvant treatment does not mean that treatment has failed completely. Additional treatments may be available based on the amount and characteristics of residual disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens After Neoadjuvant Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Once the planned preoperative treatment has been completed, the patient is reassessed. If surgery remains appropriate, the operation may involve lumpectomy, mastectomy, sentinel lymph-node biopsy, axillary lymph-node surgery and [breast reconstruction](${RECON}). The approach depends on the response and the original cancer characteristics.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Preoperative chemotherapy can sometimes reduce the need for axillary lymph-node dissection in patients who initially have node-positive disease. That does not mean every patient who responds well can avoid lymph-node surgery. The decision is based on original nodal status, treatment response, surgical assessment and current guidelines.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tumour shrinkage can make lumpectomy possible for some patients who initially appeared to need mastectomy. Shrinkage alone does not guarantee that lumpectomy will be appropriate. The surgical plan should be discussed again after neoadjuvant treatment, because it may be influenced by response of the primary tumour and nodes, original location, post-treatment imaging and breast anatomy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Side Effects Can Neoadjuvant Therapy Cause?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Chemotherapy](${CHEMO_SE}) side effects can include fatigue, nausea, hair loss, reduced blood-cell counts, increased infection risk, mouth sores, changes in appetite, neuropathy and menstrual or fertility changes. Not everyone experiences all of them. [HER2-targeted medicines](${TARGETED_SE}) have their own profile; doctors may monitor heart function and recommend a baseline cardiac assessment. Immunotherapy can cause immune-related side effects involving the skin, thyroid, liver, lungs, intestines or other endocrine organs. Report symptoms promptly because some require treatment interruption or medicines that suppress the immune response.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Neoadjuvant Treatment Affect Fertility?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some systemic treatments can affect fertility. This is particularly important for younger patients who may want children after treatment. If fertility preservation matters, discuss it before treatment begins. Options may include egg freezing, embryo freezing or other approaches depending on age, treatment urgency, ovarian reserve and circumstances.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/neoadjuvant-recovery-visual.webp",
    alt: "Follow-up after neoadjuvant therapy and before breast cancer surgery",
    caption: "International patients should plan enough time in India for cycles, imaging and the operation — or agree which cycles can be given at home.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Work, Travel and How Long to Stay in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Some patients continue working; others need reduced hours. The experience depends on the regimen, side effects, type of work and recovery between cycles. There is no single stay length. Some international patients travel for consultation, staging and planning and then return home for part of systemic treatment. Others remain in India for several cycles. The decision depends on the schedule, visa, home-country oncology support, drug availability, monitoring, cost and preference. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Indian cancer centres provide multidisciplinary treatment including medical oncology, breast surgery, radiation oncology, pathology and imaging. Planning can often begin with a remote review of the biopsy, immunohistochemistry, imaging, previous records and medical history. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can confirm cycle timing.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and imaging for a neoadjuvant treatment plan in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Neoadjuvant Treatment Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no meaningful single price. Expenses may include consultation, pathology review, imaging, [chemotherapy](${CHEMO_COST}), [targeted therapy](${TARGETED_COST}), [immunotherapy](${IMMUNO_COST}), blood tests, infusion charges, supportive medicines, day-care services, [surgery](${MAST_COST}) after systemic treatment and radiation when indicated. Medicines can account for a substantial part of the cost, particularly when targeted therapies or immunotherapy are involved. A reliable estimate should be prepared after reviewing the pathology and plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Bring?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bring the biopsy report, ER, PR, HER2 and Ki-67 results, genomic tests if performed, mammogram, ultrasound, MRI, CT or PET-CT files, previous consultation notes, medication list, medical history, previous cancer-treatment records and genetic reports if available. If treatment has already started, also bring drug names, doses, dates, number of cycles completed, response information and side-effect records.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Why do I need treatment before surgery, and would surgery first be an alternative?",
      "What is my subtype, ER/PR/HER2 result, nodal status and clinical stage?",
      "Which medicines will I receive, how many cycles, and how will we monitor response?",
      "Could treatment make lumpectomy possible? Will I still need lymph-node surgery?",
      "When will surgery take place, and will I need radiation afterward?",
      "Could treatment affect fertility? Can some treatment be completed in my home country?",
      "How long should I expect to stay in India?",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Neoadjuvant Therapy vs Adjuvant Therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neoadjuvant therapy is given before surgery. Adjuvant therapy is given after surgery. Both are used to reduce the risk of breast cancer returning and to treat cancer cells that may exist beyond the primary tumour. A patient may receive both: diagnosis → neoadjuvant treatment → surgery → additional systemic treatment → radiation when indicated. The exact sequence varies by subtype.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not everyone needs treatment before surgery. For some patients, surgery is the appropriate first treatment. The choice depends on tumour size, lymph-node status, ER/PR, HER2, grade, subtype, clinical stage, surgical feasibility and patient-specific factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["What is neoadjuvant therapy for breast cancer?", "It is treatment given before breast cancer surgery. It may include chemotherapy, targeted therapy, immunotherapy or, in selected situations, hormone therapy."],
    ["Why is treatment given before surgery?", "It may shrink the tumour, make breast-conserving surgery possible, treat cancer cells elsewhere in the body early, and show how the tumour responds."],
    ["Which breast cancers commonly receive neoadjuvant treatment?", "It may be considered for larger tumours, node-positive disease, high-grade cancers, HER2-positive, triple-negative and inflammatory breast cancer."],
    ["Is neoadjuvant therapy the same as chemotherapy?", "No. Chemotherapy is one type. Treatment before surgery may also include HER2-targeted therapy, immunotherapy or hormone therapy."],
    ["Can neoadjuvant treatment shrink a tumor enough to avoid mastectomy?", "Sometimes. Shrinkage can make breast-conserving surgery possible for some patients who initially were not suitable candidates."],
    ["Does everyone need chemotherapy before breast cancer surgery?", "No. Some patients are better suited to surgery first."],
    ["How long does neoadjuvant treatment take?", "The duration depends on subtype, regimen and response. Some regimens involve several cycles over a number of months."],
    ["What happens if the tumor disappears before surgery?", "Imaging may show no detectable tumour, but that does not automatically mean surgery can be skipped."],
    ["What is pathological complete response?", "It means no residual invasive cancer is found in the breast and sampled lymph nodes when the surgical tissue is examined under a microscope."],
    ["Can neoadjuvant therapy be given in India?", "Yes. Indian cancer centres use multidisciplinary approaches that include medical oncology, breast surgery, radiation, pathology and imaging."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Neoadjuvant Therapy: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neoadjuvant therapy can shrink tumours, sometimes make breast-conserving surgery possible, treat microscopic disease early and show how the cancer responds. It is particularly relevant for some HER2-positive, triple-negative, high-grade, larger or lymph-node-positive cancers, as well as inflammatory breast cancer. It is not automatically better or necessary for every patient. For international patients, have the biopsy, immunohistochemistry, imaging and previous records reviewed before travelling so the oncologist and breast surgeon can determine the sequence.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan treatment before breast cancer surgery in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Chemotherapy](${CHEMO}) · [side effects](${CHEMO_SE})\n- [HER2-positive treatment](${HER2})\n- [Hormone therapy](${HT})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP})\n- [Chemotherapy doctors](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS}) · [cost](${IMMUNO_COST})\n- [Targeted therapy doctors](${TARGETED_DOCTORS}) · [cost](${TARGETED_COST})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T23:30:00.000Z";
const SLUG = "breast-cancer-neoadjuvant-therapy";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_neoadjuvant_therapy",
  slug: SLUG,
  title: "Breast Cancer Neoadjuvant Therapy: Treatment Before Surgery, Benefits, Side Effects and What to Expect in India",
  excerpt:
    "How chemotherapy, targeted therapy or immunotherapy before surgery can shrink a tumour, guide later treatment and change the surgical plan in India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "neoadjuvant", "chemotherapy", "surgery", "India", "travel"],
  image: "/uploads/articles/neoadjuvant-infusion-visual.webp",
  imageAlt: "Neoadjuvant breast cancer treatment before surgery showing chemotherapy and tumor response",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Neoadjuvant Therapy: Treatment Before Surgery in India",
  seoDescription:
    "Learn about neoadjuvant therapy for breast cancer, including chemotherapy, targeted therapy, immunotherapy, benefits, side effects and surgery in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/neoadjuvant-infusion-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer neoadjuvant therapy",
    "neoadjuvant therapy for breast cancer",
    "neoadjuvant chemotherapy breast cancer",
    "chemotherapy before breast cancer surgery",
    "breast cancer treatment before surgery",
    "neoadjuvant treatment in India",
    "neoadjuvant chemotherapy in India",
    "breast cancer chemotherapy before surgery",
    "HER2 positive neoadjuvant therapy",
    "triple negative breast cancer neoadjuvant therapy",
    "neoadjuvant therapy and lumpectomy",
    "breast cancer treatment before mastectomy",
    "pathological complete response breast cancer",
    "pCR breast cancer",
    "neoadjuvant therapy cost in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Chemotherapy", href: CHEMO },
    { label: "Surgery in India", href: SURGERY },
    { label: "HER2-positive treatment", href: HER2 },
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
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_breast_cancer_surgery_in_india",
  "art_her2_positive_breast_cancer_treatment_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Neoadjuvant Therapy", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
