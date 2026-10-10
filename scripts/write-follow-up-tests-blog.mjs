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
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD_SE = "/blogs/breast-cancer-radiation-side-effects";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const CHEMO_SE = "/blogs/breast-cancer-chemotherapy-side-effects";
const TARGETED_SE = "/blogs/breast-cancer-targeted-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
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

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What tests are usually done after breast cancer treatment?</strong> Follow-up commonly includes medical appointments, physical examination and mammography when breast tissue remains. Other tests are added when symptoms, examination findings or the patient's treatment history make them appropriate.</p><p class="article-quick-answer__body"><strong>Do I need a mammogram after breast cancer treatment?</strong> Usually, yes, if breast tissue remains. After breast-conserving surgery, mammography of the treated breast is generally performed about 6–12 months after surgery and radiation, followed by regular mammograms.</p><p class="article-quick-answer__body"><strong>Do I need mammography after a mastectomy?</strong> The removed breast generally does not require routine mammography. If only one breast was removed, the remaining breast usually continues to need mammographic surveillance.</p><p class="article-quick-answer__body"><strong>Do breast cancer survivors need routine PET-CT scans?</strong> Not routinely if they have no symptoms or clinical findings suggesting recurrence. PET-CT and other advanced imaging may be used when there is a specific reason to investigate possible recurrence or spread.</p><p class="article-quick-answer__body"><strong>Are blood tests used to detect breast cancer recurrence?</strong> Routine blood tests are not generally used as the main surveillance method for asymptomatic patients with treated early-stage breast cancer. Blood tests may be appropriate when symptoms or other clinical findings require investigation.</p><p class="article-quick-answer__body"><strong>When is breast MRI used after breast cancer?</strong> MRI is not automatically required for every breast cancer survivor. It may be recommended for selected patients based on factors such as breast cancer risk, age, genetics, breast density or specific clinical findings.</p><p class="article-quick-answer__body"><strong>What if I develop a new lump after treatment?</strong> Contact your doctor. A new lump or other breast or chest-wall change may have several causes, including treatment-related changes, but it should be assessed rather than assumed to be recurrence.</p><p class="article-quick-answer__body"><strong>Can recurrence occur even when my mammogram is normal?</strong> Yes. Mammography is an important surveillance tool, but it cannot detect every recurrence. New or persistent symptoms should be reported even after a normal imaging result.</p><p class="article-quick-answer__body"><strong>How long do I need follow-up after breast cancer?</strong> Follow-up continues for years. Appointments are generally more frequent during the earlier years and become less frequent over time, although the exact schedule is individualized.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Finishing breast cancer treatment does not mean that medical care suddenly stops. The next phase is follow-up care: regular appointments, physical examinations and breast imaging. The exact plan depends on the original cancer, its [stage](/blogs/breast-cancer-stages-0-1-2-3-4), treatment received and whether ongoing medicines need monitoring. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [diagnosis explainer](${DIAGNOSIS}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about a follow-up plan",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa("Please review my records and advise on breast cancer follow-up tests after treatment in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/followup-tests-mammogram-visual.webp",
    alt: "Breast cancer follow-up tests including mammogram MRI PET CT and blood tests after treatment",
    caption: "More testing does not automatically mean better follow-up. The right tests are the ones that answer a specific clinical question.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Follow-Up Needed After Breast Cancer Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer follow-up has several purposes. The first is to look for signs that the cancer has returned. The second is to monitor side effects that may continue after treatment. The third is to manage long-term health issues related to cancer treatment and general health. For some patients, follow-up also includes monitoring long-term medicines such as endocrine therapy. A follow-up appointment is not simply a cancer scan. It is a broader assessment of your health after treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During a Follow-Up Appointment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A visit may be quite straightforward. Your doctor may ask about new breast changes, pain, swelling, shortness of breath, bone or back pain, neurological symptoms, medication side effects, menopausal symptoms, arm swelling or lymphedema, and general health. A physical examination of the treated breast or chest wall, the remaining breast, surgical area and lymph-node regions may then be performed. The exact examination depends on the treatment history.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Often Should You See Your Doctor?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal schedule. Frequency depends on the type of breast cancer, original stage, treatment received, current medication, treatment-related complications, overall health and new symptoms. Visits are often every 3–6 months initially, becoming less frequent as more time passes. After five years, annual visits are common, although individual plans vary.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Mammogram After Breast-Conserving Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If you had a [lumpectomy](${LUMP}) or other breast-conserving surgery, you generally continue mammographic surveillance. The treated breast looks different after surgery, and [radiation](${RAD_SE}) can also change the tissue. The first post-treatment mammogram — generally around 6–12 months after surgery and radiation — establishes a new baseline for future comparison.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Why Is the First Mammogram After Treatment Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It gives the radiologist a new reference point. The breast may have scar tissue, surgical changes, skin thickening, radiation-related changes or architectural distortion. These findings can make interpretation different from a routine screening mammogram. Future images can then be compared with the post-treatment baseline to recognise whether a finding is stable or has changed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Mammogram After Mastectomy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If the entire breast has been removed, routine mammography of that side is generally no longer necessary because there is little or no breast tissue to image. If only one breast was removed, the remaining breast usually continues to need mammographic surveillance. Nipple-sparing or skin-sparing procedures can require individualised advice because some breast tissue may remain. After [bilateral mastectomy](${SURGERY}), routine mammography is generally not required, but chest-wall examination continues. A new lump, swelling or skin change should still be evaluated.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Do I Need a Mammogram Every Year?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many survivors who retain breast tissue, annual mammography is part of ongoing surveillance. Some patients are advised to have imaging more frequently for a period of time. The plan should be based on your surgery, remaining breast tissue, age, risk factors and previous findings.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Diagnostic Mammogram, and When Is Ultrasound Used?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A diagnostic mammogram is performed when there is a specific concern — a new lump, focal pain, skin or nipple changes, or an abnormal screening mammogram. Additional views and ultrasound may be used. Ultrasound can help distinguish certain fluid-filled structures from solid masses and is often used alongside mammography rather than as a replacement. If a suspicious abnormality remains, a biopsy may be recommended.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/followup-tests-consult-visual.webp",
    alt: "Oncology follow-up visit after breast cancer treatment",
    caption: "A follow-up visit is a broader assessment of health after treatment, not simply a cancer scan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do Breast Cancer Survivors Need Breast MRI?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/followup-tests-mri-visual.webp",
    alt: "Breast MRI used selectively after breast cancer treatment",
    caption: "MRI is not automatically required for every survivor. It is used when it answers a specific question.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast MRI is a powerful tool, but it is not necessary for every patient who has previously had breast cancer. It may be considered for high inherited risk, BRCA or other pathogenic variants, strong family history, age at diagnosis, breast density, particular imaging findings or clinical concern. MRI can also produce findings that require additional imaging or biopsy, so it is not simply a more detailed mammogram.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After lumpectomy, MRI may help when mammography and ultrasound cannot clearly characterise a new finding. It should not automatically replace mammography in routine follow-up. After mastectomy, MRI is not routinely required. A new lump or change along the chest wall or [reconstruction](${RECON}) may be investigated with ultrasound, MRI, mammography of remaining tissue or other imaging.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do I Need a PET-CT, CT or Bone Scan?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For patients who have completed treatment for early-stage breast cancer and have no symptoms or concerning findings, routine PET-CT is generally not part of standard surveillance. Routine bone scans, liver imaging and chest imaging have not been shown to improve survival or quality of life in asymptomatic patients after treatment for stages I–III breast cancer. That does not mean PET-CT is never useful. It can be very useful when there is a specific clinical question.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Advanced imaging may be considered for a suspicious new lesion, persistent unexplained symptoms, a concerning examination, abnormal conventional imaging, suspected distant spread, or monitoring known metastatic cancer. A CT scan may be appropriate if there is a specific concern involving the lungs, liver or other organs. Bone scans may be used for persistent unexplained bone pain. See the [recurrence guide](${RECUR}) if new findings need investigation.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether you need PET-CT or MRI",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about your imaging plan](${wa("Do I need mammogram, MRI or PET-CT for follow-up after breast cancer treatment?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do Blood Tests Detect Breast Cancer Recurrence?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/followup-tests-blood-visual.webp",
    alt: "Blood tests during breast cancer follow-up when clinically indicated",
    caption: "Routine blood tests are not generally the main surveillance method for asymptomatic early-stage patients.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Blood tests can be useful in many situations, but they are not a universal screening tool for recurrence. Routine blood tests and tumour-marker testing are not generally recommended as the main surveillance method for asymptomatic patients treated for early-stage breast cancer. They may still be ordered to investigate symptoms or monitor organ function.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What About CA 15-3 and CEA?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "CA 15-3 and CEA are blood markers that may be associated with breast cancer. For routine surveillance of asymptomatic patients after early-stage treatment, these markers are not generally used as a substitute for clinical assessment and appropriate imaging. A doctor may use tumour markers in selected situations, particularly in known advanced disease. Normal blood results do not prove that breast cancer has not returned. Many recurrences do not produce abnormalities on routine blood tests.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Symptoms Should I Report Between Appointments?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "New lump in the breast or chest wall, new swelling or skin dimpling",
      "Persistent redness or nipple changes",
      "New swelling under the arm or unexplained arm swelling",
      "Persistent chest, bone or back pain",
      "Persistent cough or breathing difficulty",
      "Unexplained weight loss or new neurological symptoms",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These symptoms do not automatically mean recurrence. There can be many other explanations. But they deserve assessment. A normal mammogram is reassuring, but it cannot detect every possible recurrence — for example in the chest wall after mastectomy, in lymph nodes, or in another part of the body.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What If My Mammogram Shows BI-RADS 3, 4 or 5?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "BI-RADS is a standardised system used to describe breast imaging findings. BI-RADS 3 is considered probably benign and generally leads to short-interval imaging follow-up rather than immediate biopsy. BI-RADS 4 is a suspicious abnormality for which biopsy may be recommended. BI-RADS 5 is highly suggestive of malignancy and generally requires tissue diagnosis. A BI-RADS score is an imaging assessment. It is not the same as a cancer stage.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can Imaging Be Difficult After Surgery, and What Is Fat Necrosis?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgery and radiation can produce scarring, architectural distortion, skin thickening, fluid collections, fat necrosis and changes around the surgical site. Some of these findings can look concerning on imaging. Comparison with previous scans is therefore extremely valuable. Fat necrosis involves damaged fatty tissue. It can feel like a lump and may appear suspicious. Additional imaging or biopsy may be needed to distinguish it from recurrence. A new lump after treatment should be assessed rather than assumed to be cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Genetic Testing, HER2 Monitoring, Hormone Therapy and Bone Density",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Genetic testing is not a routine follow-up scan. Some survivors may benefit from genetic assessment because of age at diagnosis, family history, bilateral disease, male breast cancer in the family, triple-negative disease in certain age groups or a known familial mutation. If a pathogenic inherited mutation is identified, the long-term surveillance plan may change.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Patients who received certain [HER2-targeted treatments](${HER2}) may need cardiac monitoring. Patients on [endocrine therapy](${HT_SE}) may discuss hot flashes, joint pain, bone health, menstrual changes, sexual health and adherence. Aromatase inhibitors can contribute to bone loss; a DEXA scan is a bone-health test, not a recurrence scan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Records Should International Patients Keep?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Keep more than the discharge summary. A complete record should include the original biopsy and pathology, ER, PR, HER2, Ki-67, genetic testing if performed, operative and lymph-node reports, margin status, chemotherapy, targeted therapy, immunotherapy and hormone-therapy details, the radiation summary, and imaging files — not just written reports. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Some international patients return to the same Indian hospital for follow-up. Others arrange periodic consultations in India while receiving routine care closer to home. Some aspects can be handled remotely — new imaging, pathology, blood reports, medication history and symptoms — but a new lump or swelling should not wait for an online consult alone. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm the schedule. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can store or review imaging files.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and imaging for a follow-up plan in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should I Ask, and What Is a Survivorship Care Plan?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "When is my next appointment and next mammogram?",
      "Do I need MRI, blood tests, PET-CT or CT?",
      "Which symptoms should make me contact you immediately?",
      "How long will I continue endocrine therapy?",
      "Do I need bone-density testing or cardiac monitoring?",
      "Who will coordinate long-term follow-up, and what records should I keep?",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A survivorship care plan summarises the diagnosis, stage, treatment received, follow-up schedule, recommended imaging, possible late effects, medication plan and contact information. It is particularly useful if you will be returning to another country.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Follow-Up Tests: A Simple Way to Think About Them",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Routine surveillance is performed because your treatment history means you should be monitored — for many patients, clinical follow-up and mammography when breast tissue remains. Tests for symptoms are ordered because something has changed: a new lump leads to examination, mammogram or ultrasound, and possibly biopsy. Tests for treatment effects are performed because a particular treatment can affect another part of the body, such as cardiac monitoring after certain systemic treatments. That is why two survivors may have very different schedules.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["What tests are usually done after breast cancer treatment?", "Follow-up commonly includes medical appointments, physical examination and mammography when breast tissue remains. Other tests are added when they answer a specific question."],
    ["Do I need a mammogram after breast cancer treatment?", "Usually yes if breast tissue remains. After breast-conserving surgery, the first mammogram is generally about 6–12 months after surgery and radiation."],
    ["Do I need mammography after a mastectomy?", "The removed breast generally does not require routine mammography. The remaining breast usually continues to need surveillance."],
    ["Do breast cancer survivors need routine PET-CT scans?", "Not routinely if there are no symptoms or clinical findings suggesting recurrence."],
    ["Are blood tests used to detect breast cancer recurrence?", "They are not generally the main surveillance method for asymptomatic early-stage patients."],
    ["When is breast MRI used after breast cancer?", "It may be recommended for selected patients based on risk, genetics, density or a specific clinical finding."],
    ["What if I develop a new lump after treatment?", "Contact your doctor. It may have several causes, including treatment-related changes, but it should be assessed."],
    ["Can recurrence occur even when my mammogram is normal?", "Yes. Mammography cannot detect every recurrence. Report new or persistent symptoms even after a normal result."],
    ["How long do I need follow-up after breast cancer?", "Follow-up continues for years. Appointments are usually more frequent at first and become less frequent over time."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Follow-Up Tests: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Follow-up is not about having every possible scan. For many people treated for early-stage breast cancer, it includes regular clinical visits and mammography when breast tissue remains. Routine PET-CT, CT, bone scans and extensive blood testing are generally not required when there are no symptoms. A new lump, persistent pain, swelling, skin change, breathing problem, unexplained weight loss or neurological symptom should still be discussed. International patients should keep the complete cancer record — pathology, imaging files, operative reports, chemotherapy records, radiation summary and medication history.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer follow-up and survivorship care in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Diagnosis](${DIAGNOSIS})\n- [Recurrence](${RECUR})\n- [Hormone therapy side effects](${HT_SE})\n- [Chemotherapy side effects](${CHEMO_SE})\n- [Targeted therapy side effects](${TARGETED_SE})\n- [Radiation side effects](${RAD_SE})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Reconstruction doctors](${RECON_DOCTORS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS})\n- [Hormone therapy doctors](${HT_DOCTORS})\n- [Targeted therapy doctors](${TARGETED_DOCTORS})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T23:00:00.000Z";
const SLUG = "breast-cancer-follow-up-tests";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_follow_up_tests",
  slug: SLUG,
  title: "Breast Cancer Follow-Up Tests After Treatment: Mammograms, MRI, Blood Tests and When Scans Are Needed",
  excerpt:
    "Which mammograms, MRI, PET-CT, CT and blood tests are used after breast cancer treatment — and why more scanning is not automatically better follow-up.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "follow-up", "mammogram", "surveillance", "India", "travel"],
  image: "/uploads/articles/followup-tests-mammogram-visual.webp",
  imageAlt: "Breast cancer follow-up tests including mammogram MRI PET CT and blood tests after treatment",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Follow-Up Tests: Mammogram, MRI, Blood Tests & Scans",
  seoDescription:
    "Learn which breast cancer follow-up tests may be needed after treatment, including mammograms, MRI, PET-CT, CT scans, blood tests and when they are used.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/followup-tests-mammogram-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer follow-up tests",
    "breast cancer follow up after treatment",
    "breast cancer surveillance",
    "mammogram after breast cancer treatment",
    "MRI after breast cancer",
    "PET CT after breast cancer",
    "CT scan after breast cancer",
    "blood tests after breast cancer treatment",
    "breast cancer recurrence tests",
    "breast cancer follow-up mammogram",
    "mammogram after lumpectomy",
    "mammogram after mastectomy",
    "breast cancer follow-up in India",
    "breast cancer surveillance in India",
    "breast cancer follow-up for international patients",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Diagnosis and biopsy", href: DIAGNOSIS },
    { label: "Recurrence", href: RECUR },
    { label: "Hormone therapy side effects", href: HT_SE },
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
  "art_breast_cancer_hormone_therapy_side_effects",
  "art_breast_cancer_recurrence_treatment_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Follow-Up Tests", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
