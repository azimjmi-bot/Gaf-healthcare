import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
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
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is breast cancer recurrence?</strong> Breast cancer recurrence means that breast cancer has returned after treatment. It may occur in the breast or chest wall, nearby lymph nodes, or distant organs. (cancer.gov)</p><p class="article-quick-answer__body"><strong>What are the three types of recurrence?</strong> Recurrence can be local, regional or distant (metastatic) depending on where the cancer returns. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Can breast cancer come back after a mastectomy?</strong> Yes. A mastectomy removes the breast, but cancer can still recur in the chest wall, surgical area or nearby lymph nodes, although the risk depends on the original cancer and treatment.</p><p class="article-quick-answer__body"><strong>Can breast cancer come back after lumpectomy?</strong> Yes. Cancer can recur in the treated breast. Radiation after breast-conserving surgery is commonly used to reduce local recurrence risk when indicated. (cancer.gov)</p><p class="article-quick-answer__body"><strong>What are common signs of local recurrence?</strong> A new lump or thickening, changes around a surgical scar, breast or chest-wall swelling, skin changes, nipple changes or persistent pain may require evaluation. (cancer.gov)</p><p class="article-quick-answer__body"><strong>What are signs of distant recurrence?</strong> Symptoms depend on where the cancer has spread. Persistent bone pain, unexplained breathing problems, neurological symptoms, jaundice or unexplained weight loss can require assessment. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Does every new symptom mean the cancer has returned?</strong> No. Many symptoms after breast cancer treatment have non-cancerous explanations. Doctors may need examination, imaging or biopsy to determine the cause.</p><p class="article-quick-answer__body"><strong>How is recurrent breast cancer diagnosed?</strong> Depending on the symptoms and location, doctors may use physical examination, imaging, blood tests and biopsy. The cancer may also be tested again for ER, PR and HER2 because biomarkers can change. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Can recurrent breast cancer be treated?</strong> Yes. Treatment depends on whether the recurrence is local, regional or distant and on the cancer's current biology and previous treatment. (cancer.gov)</p><p class="article-quick-answer__body"><strong>How much does recurrent breast cancer treatment cost in India?</strong> There is no fixed cost. It depends on the location of recurrence, previous treatment, pathology, surgery, radiation and systemic medicines required.</p><p class="article-quick-answer__body"><strong>Can recurrence happen many years later?</strong> Yes. Although many recurrences occur during the first few years, breast cancer can return much later as well. (cancer.gov)</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Finishing breast cancer treatment is a major milestone. But for many survivors, another question remains: can the cancer come back? The answer is yes. Breast cancer can recur after treatment, sometimes months or years later. Recurrence is not inevitable. Risk varies with the original [stage](${STAGES}), biology, lymph-node involvement, treatment received and other characteristics. (cancer.gov) This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [follow-up tests](${FOLLOW}) explainer.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about a suspected recurrence",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa("Please review my records and advise on possible breast cancer recurrence treatment in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/recurrence-consult-visual.webp",
    alt: "Breast cancer recurrence showing local regional and distant recurrence pathways and follow-up care",
    caption: "A new change on the chest wall or around a surgical site should be examined rather than assumed to be scar tissue.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Breast Cancer Recurrence Mean?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "When breast cancer disappears after treatment and later returns, doctors call this recurrent breast cancer. It can happen because a small number of cancer cells survived the original treatment and remained undetectable. Those cells may stay inactive for some time before beginning to grow again. (cancer.gov) This does not necessarily mean that the original treatment was unsuccessful. Treatment removes or destroys detectable disease, but microscopic cells may remain below the detection limits of imaging and other tests.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Recurrence the Same as a New Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. If a woman previously had cancer in her left breast and later develops a completely new cancer in the right breast, doctors may classify it as a second primary breast cancer rather than recurrence. (cancer.gov) The distinction is made using the clinical history, location, pathology and other findings. A second primary cancer has its own diagnosis and treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Types of Breast Cancer Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors generally describe recurrence as local, regional or distant depending on where the cancer returns. Local recurrence means the cancer returns in the same breast after breast-conserving surgery or near the original surgical site. After mastectomy, local recurrence can occur in the chest wall or mastectomy area. Regional recurrence returns in nearby lymph nodes or tissues — underarm nodes, nodes near the collarbone, or nearby neck or chest regions. Distant recurrence appears away from the breast and regional nodes. This is also called metastatic breast cancer. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Recur After Lumpectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. [Lumpectomy](${LUMP}) preserves most of the breast, so tissue remains after surgery. If cancer returns in the treated breast, it may be a local recurrence. [Radiation](${RAD}) is commonly used after breast-conserving surgery when appropriate because it lowers local recurrence risk. NCI reports that locoregional recurrence rates have declined substantially with modern treatment. (cancer.gov) A new lump after lumpectomy does not automatically mean recurrence. Scar tissue and other treatment-related changes can feel similar, which is why examination and imaging matter.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Recur After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. [Mastectomy](${SURGERY}) removes the breast, but it does not remove every cell in the body. A recurrence can develop in the skin, chest wall, scar area or nearby lymph nodes. The risk depends on the original cancer and its characteristics. Mastectomy reduces the risk of local breast recurrence but does not make recurrence biologically impossible.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Does Breast Cancer Recurrence Usually Happen?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Many recurrences occur during the first few years after treatment. Recurrence can also happen much later. NCI notes that breast cancer may recur many years after the initial treatment. (cancer.gov) This is particularly relevant for some hormone receptor-positive cancers, where the risk can continue for years. Follow-up should not simply stop after an arbitrary period.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Increases the Risk of Breast Cancer Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single factor that determines whether recurrence will happen. Doctors consider original [stage](${STAGES}), tumor size, lymph-node involvement, [grade](${PATH}), ER, PR and HER2 status, subtype, response to treatment, treatment received, surgical margins and other pathological features. The American Cancer Society emphasises that recurrence risk cannot be predicted precisely for an individual using a general recurrence rate. (cancer.org)`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does Lymph-Node Involvement Increase Recurrence Risk?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph-node involvement is one factor doctors consider. Cancer found in regional nodes indicates that the disease has moved beyond the original tumor. It does not tell the entire story. Doctors also consider the number of affected nodes, tumor biology and the treatment response.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does Tumor Biology Affect Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Breast cancer is not one disease. Hormone-receptor status and HER2 status influence both treatment and recurrence patterns. Hormone receptor-positive cancers can remain sensitive to [endocrine treatment](${HT}) for years. [HER2-positive](${HER2}) cancers have specific targeted therapies. Triple-negative breast cancer has a different pattern of recurrence risk. The original [pathology report](${PATH}) is an important part of long-term follow-up.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask how your original pathology affects recurrence risk",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about recurrence risk](${wa("Please review my original pathology and advise on breast cancer recurrence risk and follow-up in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Signs of Local Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Possible signs include a new lump, new thickening or firmness, a change in breast shape, skin dimpling, redness, swelling, nipple inversion, changes around the surgical scar or persistent chest-wall pain. After mastectomy, some patients notice a new firm area or nodule along the chest wall or scar. NCI recommends discussing unusual changes with the treating doctor rather than trying to decide at home whether they represent recurrence. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Signs of Regional Recurrence?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/recurrence-exam-visual.webp",
    alt: "Underarm and collarbone lymph-node examination for regional breast cancer recurrence",
    caption: "A lump under the arm, near the collarbone or in the neck should be assessed. Infection can cause similar swelling.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Regional recurrence may involve lymph nodes. Possible symptoms include a lump under the arm, swelling near the collarbone, a lump or swelling in the neck, persistent swelling in an arm, or pain around the affected region. These symptoms can have causes other than cancer. A swollen node can also occur because of infection. Persistent or unexplained findings should be evaluated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Signs of Distant Recurrence?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/recurrence-plan-visual.webp",
    alt: "Persistent bone or back pain assessment when distant breast cancer recurrence is a concern",
    caption: "Persistent bone pain, cough, jaundice or new neurological symptoms should be reported. They do not automatically mean metastatic disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Symptoms depend on where the cancer has spread. Bone-related symptoms can include persistent bone, back or hip pain that becomes progressively worse. Lung-related symptoms can include a persistent cough, shortness of breath or chest discomfort. Liver-related symptoms can include abdominal discomfort, loss of appetite, jaundice or unexplained weight loss. Brain-related symptoms can include persistent headaches, weakness, numbness, balance problems, seizures or changes in vision or speech. These symptoms do not automatically indicate metastatic breast cancer. Persistent or unexplained symptoms should be reported. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Breast Cancer Recurrence Always Cause Symptoms?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Some recurrences are found during a clinical examination or imaging before the patient notices anything. That is one reason [follow-up care](${FOLLOW}) remains important. Routine follow-up does not mean having every possible scan at every appointment. The surveillance plan is generally based on the original cancer, treatment and current clinical situation. (cancer.org)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Do I Need PET-CT Scans Regularly to Check for Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. Advanced imaging is not automatically required at every follow-up visit for every survivor. Doctors decide whether imaging is needed based on symptoms, physical findings, the original cancer, treatment history and current clinical concerns. If recurrence is suspected, imaging is then selected according to the area being investigated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Breast Cancer Recurrence Diagnosed?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/recurrence-imaging-visual.webp",
    alt: "Restaging CT scan used when breast cancer recurrence needs to be mapped in the body",
    caption: "Imaging and biopsy help confirm whether a new finding is recurrence, a second primary cancer or a non-cancerous change.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The evaluation depends on where the suspected recurrence is located. It may involve physical examination, mammography, ultrasound, MRI, CT, PET-CT, bone imaging, blood tests and biopsy. A biopsy is often important when there is a suspicious new lesion because imaging alone may not establish whether the finding represents recurrent cancer. (cancer.gov) See [diagnosis and biopsy](${DIAGNOSIS}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Might a Biopsy Be Needed Again?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients often ask why another biopsy is needed after a previous diagnosis. The new lesion could be scar tissue, infection, a benign growth, recurrent breast cancer or a new primary cancer. A biopsy can provide tissue confirmation when appropriate and may allow doctors to reassess the tumor's biology.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can ER, PR or HER2 Change When Breast Cancer Recurs?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Tumor biomarkers can sometimes differ between the original cancer and a recurrence. NCI notes that ER status, for example, may change at recurrence and that treatment decisions should consider receptor status at the time of recurrence when tissue is available. (cancer.gov) The treatment plan should be based on the current disease as well as the original cancer history.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether a new biopsy is needed",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about a new finding](${wa("I have a new lump or symptom after breast cancer treatment. Please advise on tests and recurrence care in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens After Recurrence Is Confirmed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The first step is usually restaging. Doctors need to determine exactly where the cancer has returned and whether it is local, regional or distant. The evaluation may include imaging and biopsy. NCI describes this as reassessing the cancer to determine its current extent. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Local Breast Cancer Recurrence Treated?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment depends on what the patient received the first time. A patient who previously had lumpectomy may have a different pathway from someone who underwent mastectomy. If a local recurrence occurs after breast-conserving surgery and radiation, mastectomy may be considered. If recurrence occurs after mastectomy, surgery to remove the recurrent lesion may be possible in selected cases. Radiation may also be considered depending on previous treatment and current disease. (cancer.org)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Regional Recurrence Treated?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Regional recurrence may involve lymph nodes or nearby tissues. Treatment can involve combinations of surgery, radiation, [chemotherapy](${CHEMO}), hormone therapy, targeted therapy and other systemic treatments. The exact approach depends on the location, previous treatment and current tumor biology. NCI notes that patients with locoregional recurrence should generally undergo restaging before treatment is selected. (cancer.gov)`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Distant Breast Cancer Recurrence Treated?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Distant recurrence is also called metastatic breast cancer. Treatment is primarily systemic. Depending on the subtype, it may include hormone therapy, targeted therapy, chemotherapy, immunotherapy in appropriate situations and other systemic medicines. Radiation or surgery may be used for specific problems such as pain or complications from a particular metastatic site. NCI notes that treatment decisions depend partly on previous treatment, tumor biomarkers and the patient's current disease. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Recurrent Breast Cancer Mean Stage 4?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. A local or regional recurrence does not automatically mean stage IV disease. Stage IV refers to distant metastatic disease. If the cancer has returned only in the breast, chest wall or regional lymph nodes, doctors may describe it as locoregional recurrence. If it has spread to distant organs, it is metastatic disease. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Local Recurrence Be Treated Again?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In some patients, yes. After lumpectomy and radiation, a local recurrence may be treated with mastectomy in appropriate cases. After mastectomy, a localised chest-wall recurrence may sometimes be surgically removed and/or treated with radiation depending on previous treatment. Additional systemic treatment may also be recommended. NCI notes that some locoregional recurrences can respond to further treatment and that selected patients can have prolonged disease control. (cancer.gov)",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about surgery or systemic options after recurrence",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about treatment after recurrence](${wa("Please advise on local, regional or distant breast cancer recurrence treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What If Breast Cancer Recurs After Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The plan does not simply repeat the original chemotherapy automatically. Doctors consider which drugs were used previously, how long ago they were given, how the cancer responded, current ER/PR/HER2 status, the location of recurrence and other available options. A different combination may be recommended.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What If Recurrence Happens While Taking Hormone Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `This situation requires careful evaluation. The oncologist may review the original hormone-receptor status, current biopsy results, previous endocrine therapy, how long the patient has been receiving treatment, whether the cancer has developed resistance, and whether targeted treatment can be combined with endocrine therapy. If [side effects](${HT_SE}) made it hard to stay on treatment, say so — the medicine can sometimes be changed rather than stopped without advice.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Targeted Therapy or Immunotherapy Be Used?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Targeted therapy can be used when the cancer has a relevant target. Patients with HER2-positive recurrent disease may receive HER2-directed treatments. Other molecular characteristics can also influence options, which is another reason current pathology matters. Immunotherapy is not appropriate for every recurrent breast cancer. Its use depends on subtype, biomarkers, disease setting and previous treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Difference Between Recurrence and Treatment Resistance?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "These terms are related but not identical. Recurrence generally means the cancer has returned after a period when it was no longer detectable. Progression means the cancer is continuing to grow or spread despite treatment. (cancer.org) A doctor will use the treatment history and timing to determine which description applies.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lifestyle Changes Prevent Breast Cancer Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No lifestyle measure can guarantee that breast cancer will not return. Maintaining overall health remains important. Your care team may discuss regular physical activity, a healthy body weight, balanced nutrition, limiting alcohol, avoiding tobacco, managing other medical conditions and following prescribed long-term cancer treatment. These measures are part of general survivorship care. They should not replace cancer treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Follow-Up Is Needed After Breast Cancer Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Follow-up is individualised. It may include medical history, physical examination, breast imaging, medication review, assessment of treatment side effects and monitoring for new symptoms. The American Cancer Society notes that follow-up plans depend on the original cancer, stage and treatment received. (cancer.org) Not every patient needs the same tests. See [follow-up tests](${FOLLOW}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Do After Returning Home?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before leaving India, request a complete treatment summary: original and final surgical pathology, ER/PR/HER2 results, genetic testing if performed, imaging reports and files, operative report, chemotherapy record, radiation summary, current medicines and the follow-up schedule. If recurrence is suspected later, these documents help the new team understand exactly what treatment was previously given. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can an International Patient Return to India for Recurrence Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some patients return to the same hospital because their previous records are already available. Others seek a second opinion or treatment at a different centre. If you are returning after several years, send previous treatment records before travel whenever possible. The hospital may request updated imaging or pathology before recommending treatment. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can restage and plan treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Recurrence Treatment Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no standard cost. Recurrence can require a completely different pathway from the original cancer. Possible expenses include consultation, biopsy, pathology review, PET-CT or other staging imaging when indicated, surgery, radiation, chemotherapy, hormone therapy, targeted therapy, immunotherapy, hospitalisation and supportive care. A localised recurrence may involve surgery and radiation. A metastatic recurrence may involve long-term systemic treatment. These are fundamentally different situations, so a single \"recurrence treatment cost\" is not clinically meaningful. GAF Healthcare reviews the records and provides a case-specific estimate. See the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can coordinate restaging, surgery and systemic treatment. Related doctor and cost pages include [mastectomy doctors](${MAST_DOCTORS}) · [cost](${MAST_COST}), [reconstruction](${RECON_DOCTORS}) · [cost](${RECON_COST}), [chemotherapy](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST}), [hormone therapy](${HT_DOCTORS}) · [cost](${HT_COST}), [targeted therapy](${TARGETED_DOCTORS}) · [cost](${TARGETED_COST}) and [immunotherapy](${IMMUNO_DOCTORS}) · [cost](${IMMUNO_COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a case-specific recurrence estimate",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a cost estimate](${wa("Please review my recurrence records and share a treatment and cost estimate in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Doctor If Breast Cancer Comes Back",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is this definitely recurrent breast cancer, or could it be a second primary cancer?",
      "Has the recurrence been confirmed by biopsy, and what are the current ER, PR and HER2 results?",
      "Is it local, regional or distant, and which organs or lymph nodes are involved?",
      "What treatments have I already received, and does previous radiation change the options?",
      "Is surgery, radiation, targeted therapy or immunotherapy relevant now?",
      "What is the goal of treatment, and can care continue near my home?",
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
    text: "GAF Healthcare can help international patients send previous pathology, imaging and treatment summaries to cancer teams in India, arrange restaging when needed, and obtain a case-specific treatment and cost estimate. The specialist pathway depends on whether the finding is local, regional or distant and on the current biology of the disease.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Can breast cancer come back after 10 years?", "Yes. Breast cancer can recur many years after the original treatment. (cancer.gov)"],
    ["Can breast cancer come back after a mastectomy?", "Yes. Recurrence can occur in the chest wall, surgical area or regional lymph nodes even after the breast has been removed."],
    ["Can breast cancer come back after lumpectomy?", "Yes. A recurrence can occur in the treated breast. Radiation after breast-conserving surgery reduces local recurrence risk when appropriately used."],
    ["Is recurrence always stage 4?", "No. Local and regional recurrence are not automatically stage IV. Stage IV refers to distant metastatic disease. (cancer.gov)"],
    ["Does every lump after breast cancer mean recurrence?", "No. Scar tissue, cysts, infection and other benign conditions can cause new lumps or thickening. A new or persistent abnormality should be assessed."],
    ["Can recurrent breast cancer be cured?", "Some local or regional recurrences can be treated with surgery, radiation and systemic therapy, and selected patients can achieve long-term disease control. Distant recurrence is generally managed as metastatic disease with systemic treatment. (cancer.gov)"],
    ["Can ER or HER2 status change when cancer comes back?", "Yes. Biomarkers can sometimes differ between the original tumor and recurrence, which is why testing the recurrent tumor may be useful when tissue is available. (cancer.gov)"],
    ["Does recurrence always cause symptoms?", "No. Some recurrences may be identified during examination or imaging before symptoms become obvious."],
    ["Do I need regular PET-CT after breast cancer treatment?", "Not automatically. Follow-up testing depends on the original cancer, treatment history, symptoms and clinical findings."],
    ["Can breast cancer recurrence be treated in India?", "Yes. Treatment can include surgery, radiation, chemotherapy, hormone therapy, targeted therapy or immunotherapy depending on the location and biology of the recurrence."],
    ["How much does recurrent breast cancer treatment cost in India?", "There is no fixed amount. The cost depends on whether the recurrence is local, regional or metastatic and on the treatment required."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Recurrence: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer recurrence means that cancer has returned after treatment, but it is not one single situation. A return in the treated breast or chest wall is different from a return in nearby lymph nodes, and both are different from spread to distant organs. (cancer.gov) Confirm the new finding, restage it, and retest ER, PR and HER2 when tissue is available. Keep a complete record of the original diagnosis and treatment if you may later need care in India.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer recurrence care in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Follow-up tests](${FOLLOW}) · [pathology report](${PATH})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP})\n- [Radiation](${RAD}) · [chemotherapy](${CHEMO})\n- [Hormone therapy](${HT}) · [HER2-positive treatment](${HER2})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS}) · [reconstruction doctors](${RECON_DOCTORS})\n- [International patients](${INTL}) · [cost guide](${COST})`,
  },
];

const now = "2026-09-28T01:00:00.000Z";
const SLUG = "breast-cancer-recurrence-treatment-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_recurrence_treatment_india",
  slug: SLUG,
  title: "Breast Cancer Recurrence: Signs, Types, Risk Factors, Diagnosis and Treatment in India",
  excerpt:
    "How local, regional and distant breast cancer recurrence is recognised, investigated and treated in India, and which records international patients should bring.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "recurrence", "metastatic", "India", "travel"],
  image: "/uploads/articles/recurrence-consult-visual.webp",
  imageAlt: "Breast cancer recurrence showing local regional and distant recurrence pathways and follow-up care",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Recurrence: Signs, Types, Treatment & Cost in India",
  seoDescription:
    "Learn about breast cancer recurrence, including local, regional and distant recurrence, symptoms, diagnosis, treatment and recurrence care in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/recurrence-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer recurrence",
    "breast cancer recurrence symptoms",
    "breast cancer recurrence signs",
    "recurrent breast cancer",
    "breast cancer recurrence treatment",
    "breast cancer recurrence treatment in India",
    "breast cancer recurrence after mastectomy",
    "breast cancer recurrence after lumpectomy",
    "local breast cancer recurrence",
    "regional breast cancer recurrence",
    "distant breast cancer recurrence",
    "metastatic breast cancer recurrence",
    "breast cancer recurrence diagnosis",
    "breast cancer recurrence cost in India",
    "recurrent breast cancer surgery",
    "recurrent breast cancer chemotherapy",
    "breast cancer recurrence for international patients",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Follow-up tests", href: FOLLOW },
    { label: "Pathology report explained", href: PATH },
    { label: "By stage", href: "/blogs/breast-cancer-treatment-by-stage" },
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
  "art_breast_cancer_follow_up_tests",
  "art_breast_cancer_pathology_report_explained",
  "art_breast_cancer_surgery_in_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Recurrence treatment", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
