import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const BCS_COST = "/costs/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is DCIS?</strong> Ductal carcinoma in situ is a non-invasive condition in which abnormal cells remain inside the milk ducts and have not invaded surrounding breast tissue. It is often called stage 0 breast cancer.</p><p class="article-quick-answer__body"><strong>Is DCIS cancer?</strong> It is classified as stage 0 or non-invasive breast cancer. The cells have not spread outside the duct, which is why the outlook after appropriate treatment is generally excellent.</p><p class="article-quick-answer__body"><strong>Does DCIS cause symptoms?</strong> Usually not. Most cases are found on a mammogram. Occasionally a lump, nipple discharge or a localised change is noticed.</p><p class="article-quick-answer__body"><strong>How is DCIS diagnosed?</strong> After an abnormal mammogram, diagnostic imaging and an image-guided biopsy are used. The pathology report confirms DCIS, grade, hormone-receptor status and margin information after surgery.</p><p class="article-quick-answer__body"><strong>What are the main treatments for DCIS?</strong> Common options are lumpectomy, lumpectomy plus radiation in appropriate patients, mastectomy, and hormone therapy for selected hormone-receptor-positive DCIS.</p><p class="article-quick-answer__body"><strong>Is chemotherapy needed for DCIS?</strong> Chemotherapy is not usually used for pure DCIS because the cells have not invaded surrounding tissue.</p><p class="article-quick-answer__body"><strong>Can DCIS come back after treatment?</strong> A local recurrence is possible, particularly after breast-conserving treatment. Regular imaging and follow-up remain important.</p><p class="article-quick-answer__body"><strong>How much does DCIS treatment cost in India?</strong> Cost depends on whether the plan is lumpectomy, mastectomy, radiation, reconstruction and hormone therapy. A useful estimate is based on the actual pathology and surgical plan.</p><p class="article-quick-answer__body"><strong>Can DCIS be treated in India?</strong> Yes. Breast surgeons, radiation oncologists and reconstructive teams in Indian cancer centres routinely treat DCIS.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Ductal carcinoma in situ, or DCIS, is often discovered during a mammogram before a woman notices any breast symptoms. It is sometimes described as [stage 0](${STAGES}) or non-invasive breast cancer. The important point is that the abnormal cells are still confined to the milk ducts and have not invaded the surrounding tissue. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [diagnosis explainer](${DIAGNOSIS}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about a DCIS treatment plan",
    href: consult("Breast-Conserving Surgery"),
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
    caption: "DCIS is non-invasive: the abnormal cells remain inside the ducts. Treatment is still needed because some DCIS can later become invasive if left untreated.",
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
    text: "DCIS means abnormal cells are lining a milk duct but have not broken through the duct wall into the surrounding breast tissue. That is why it is called in situ — in its original place. It is different from invasive ductal carcinoma, where cells have already entered the surrounding tissue and can reach lymph nodes or distant organs.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is DCIS Called Stage 0, and Is It Dangerous?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Stage 0 means the disease has not invaded. DCIS is not an emergency in the same way as metastatic cancer, but it is not something to ignore. Untreated DCIS can later become invasive in some patients. The goal of treatment is to remove or control the abnormal cells and reduce that risk.",
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
    text: "Most people with DCIS have no symptoms. Occasionally someone notices a lump, nipple discharge, a nipple change or a localised breast change. Because DCIS is often silent, screening mammography is how it is usually found.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-imaging-visual.webp",
    alt: "Mammography used to detect ductal carcinoma in situ",
    caption: "DCIS is often found as calcifications on a mammogram. An image-guided biopsy is needed before treatment is planned.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is DCIS Diagnosed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `After an abnormal mammogram, additional evaluation may include diagnostic mammography, ultrasound, further imaging when appropriate and image-guided biopsy. A biopsy is necessary because imaging alone cannot confirm whether calcifications are DCIS, invasive cancer or a benign finding. See [how ER, PR and HER2 testing fits the report](${DIAGNOSIS}).`,
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
    text: "The report usually describes grade (low, intermediate or high), whether comedo-type necrosis is present, the estimated size or extent, hormone-receptor status and, after surgery, the surgical margins. High-grade DCIS and larger areas of disease can influence whether radiation or mastectomy is discussed. \"Comedo\" refers to a pattern of dead cells inside the duct and is often associated with higher-grade DCIS.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can review the original slides before recommending a change in plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Main Treatment Options?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/dcis-surgery-visual.webp",
    alt: "Surgical planning for DCIS lumpectomy or mastectomy",
    caption: "Lumpectomy with or without radiation, or mastectomy, is chosen according to the extent of DCIS, margins and the patient's preferences.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The main options are [lumpectomy](${LUMP}), lumpectomy followed by [radiation](${RAD}) in appropriate patients, [mastectomy](${SURGERY}), and [hormone therapy](${HT}) for selected hormone-receptor-positive DCIS. Chemotherapy is not usually needed for pure DCIS.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast-conserving surgery doctors](${BCS_DOCTORS}) · [cost](${BCS_COST})\n- [Mastectomy doctors](${MAST_DOCTORS}) · [cost](${MAST_COST})\n- [Reconstruction doctors](${RECON_DOCTORS}) · [cost](${RECON_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy, Radiation and Mastectomy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lumpectomy removes the area of DCIS with a margin of normal tissue. Radiation is often recommended afterward to reduce the chance of DCIS or invasive cancer returning in the remaining breast. Some patients with small, low-grade DCIS and wide margins may discuss omitting radiation. That decision should be made with the radiation oncologist, not assumed from a generic article.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mastectomy may be considered when DCIS covers a large portion of the breast, is present in multiple separate areas, clear margins cannot be achieved, or the breast would be significantly distorted by excision. Mastectomy removes the breast tissue at risk. Reconstruction can be discussed at the same time; see [reconstruction after mastectomy](${RECON}). Lymph-node surgery is not routinely required for pure DCIS, but a sentinel-node procedure may be added if invasive cancer is found in the final specimen or if mastectomy is planned.",
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
    text: "Hormone Therapy, HER2 and Observation",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy may be offered after breast-conserving treatment for hormone-receptor-positive DCIS to reduce the risk of a future event in either breast. HER2 testing is not used to select chemotherapy for pure DCIS the way it is in invasive disease. Observation without surgery is not standard care for most patients; clinical trials or highly selected situations are exceptions and need specialist discussion.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is the Treatment Decision Made?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Size, location and number of areas of DCIS",
      "Grade and presence of necrosis",
      "Surgical margins and breast size or shape",
      "Age, other medical conditions and hormone-receptor status",
      "Ability to undergo radiation and previous radiation treatment",
      "Personal preferences, including reconstruction",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "DCIS Treatment in India for International Patients",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A typical team includes a breast surgeon or surgical oncologist, breast radiologist, pathologist, radiation oncologist, medical oncologist when required and a reconstructive surgeon when appropriate. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bring the original biopsy report, slides or tissue blocks if available, mammography, ultrasound and MRI images, previous consultation notes, medication list, previous breast-surgery records and family-history information. Indian hospitals often review the original pathology before confirming the operation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast units in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm imaging and surgery dates.`,
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
    text: "There is no single DCIS price. Potential expenses include diagnostic imaging, biopsy, pathology review, surgery, hospitalisation, radiation, hormone therapy, additional surgery if margins are not clear, reconstruction where appropriate and follow-up consultations. A useful quotation is based on the actual surgical and radiation plan rather than a generic stage-0 package.",
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
    text: "Recovery and Follow-Up",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Recovery after lumpectomy depends on the size and location of the excision, whether lymph-node surgery was performed and whether a second operation is needed for margins. After mastectomy, patients may need wound care, drain management, pain medication, activity restrictions and physiotherapy. DCIS can recur locally; it can also appear in the other breast. Life expectancy after treated DCIS is generally excellent, which is why the treatment discussion often focuses on local control and quality of life.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Is DCIS the same as breast cancer?", "It is classified as stage 0 or non-invasive breast cancer. The cells have not invaded surrounding tissue."],
    ["Is DCIS a serious diagnosis?", "It needs treatment and follow-up, but it is not the same as invasive or metastatic breast cancer."],
    ["Can DCIS spread to lymph nodes?", "Pure DCIS does not spread to lymph nodes. If invasive cancer is found in the final specimen, lymph-node assessment may be added."],
    ["Is chemotherapy needed for DCIS?", "Chemotherapy is not usually used for pure DCIS."],
    ["Is radiation necessary after lumpectomy for DCIS?", "It is often recommended. Some selected low-risk cases may discuss omitting it with the radiation oncologist."],
    ["Is mastectomy always necessary for DCIS?", "No. Many patients can be treated with lumpectomy, with or without radiation."],
    ["Can DCIS be cured?", "After appropriate local treatment, the outlook is generally excellent."],
    ["Can DCIS become invasive breast cancer?", "Yes, if left untreated some DCIS can later become invasive. That is why treatment is offered."],
    ["Is hormone therapy useful for DCIS?", "It may be offered for hormone-receptor-positive DCIS after breast-conserving treatment."],
    ["Can DCIS be treated in India?", "Yes. Indian breast units routinely treat DCIS with surgery, radiation and, when appropriate, reconstruction."],
    ["How much does DCIS treatment cost in India?", "Cost depends on the operation, radiation and whether reconstruction is planned. Ask for a plan-based estimate."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "DCIS: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "DCIS is non-invasive, usually found on a mammogram, and treated to prevent a later invasive cancer. The operation and whether radiation or hormone therapy is added depend on extent, grade, margins and your preferences. Bring the original slides and imaging if you are travelling to India so the team can confirm the plan before surgery.",
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Lumpectomy vs mastectomy](${LUMP})\n- [Surgery in India](${SURGERY})\n- [Reconstruction](${RECON})\n- [Radiation therapy](${RAD})\n- [Hormone therapy](${HT})\n- [Diagnosis](${DIAGNOSIS})\n- [Stages](${STAGES})\n- [International patients](${INTL})`,
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
    { label: "Lumpectomy vs mastectomy", href: LUMP },
    { label: "Surgery", href: SURGERY },
    { label: "Radiation", href: RAD },
    { label: "Diagnosis", href: DIAGNOSIS },
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

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_lumpectomy_vs_mastectomy",
  "art_breast_cancer_surgery_in_india",
  "art_breast_cancer_stages_0_1_2_3_4",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
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
