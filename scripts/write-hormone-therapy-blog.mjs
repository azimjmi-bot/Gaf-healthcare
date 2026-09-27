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
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
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
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Hormone therapy, also called endocrine therapy, is used for breast cancers that have hormone receptors, particularly estrogen receptor (ER)-positive and/or progesterone receptor (PR)-positive cancers. It works by reducing the effect of estrogen or progesterone on cancer cells and can be used before or after other treatments depending on the individual cancer plan.</p><p class="article-quick-answer__body">Common hormone therapy medicines include tamoxifen and aromatase inhibitors such as anastrozole, letrozole and exemestane. Some patients may also receive ovarian-function suppression or other endocrine treatments.</p><p class="article-quick-answer__body">Hormone therapy may be recommended after surgery to reduce the risk of recurrence, and it can also be used in advanced or metastatic hormone receptor-positive breast cancer. The choice of treatment depends on menopausal status, tumour biology, previous treatment, recurrence risk, other medical conditions and the overall treatment plan.</p><p class="article-quick-answer__body">Treatment duration can extend for several years, although the exact duration varies between patients. The cost in India depends on the medicine, duration, monitoring and whether other treatments are required.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is a type of systemic treatment for breast cancer. Unlike [surgery](${LUMPECTOMY_COST}) or [radiation therapy](${EBRT_COST}), which primarily target specific areas of the body, hormone therapy works throughout the body. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway, the [ER, PR and HER2 explainer](${BIOMARKERS}) and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF whether hormone therapy applies",
    href: consult("Hormone Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your ER/PR report](${wa("Please review my ER/PR report for hormone therapy in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-receptors-visual.webp",
    alt: "Adult torso beside a magnified estrogen-receptor diagram being blocked by endocrine tablets",
    caption: "Hormone therapy does not add hormones. It blocks estrogen's effect or lowers estrogen production so receptor-positive cells are less able to grow.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Hormone Therapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is mainly used when breast cancer cells depend on hormones such as estrogen or progesterone to grow. The treatment is also called endocrine therapy, hormonal therapy or anti-hormonal therapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Despite the name, hormone therapy for breast cancer does not mean giving hormones to treat cancer. Instead, it generally works by blocking the action of estrogen, lowering estrogen levels, or preventing estrogen from stimulating cancer cells.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) use ER and PR results together with [stage](${STAGES}) and [HER2 status](${HER2}) to decide whether endocrine treatment belongs in the plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Who Needs Hormone Therapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is generally considered when testing shows that the cancer is hormone receptor-positive. Breast cancer pathology commonly includes testing for estrogen receptor (ER), progesterone receptor (PR) and [HER2](${BIOMARKERS}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A tumour may therefore be described as ER-positive, PR-positive, ER-positive/PR-positive or hormone receptor-positive. The pathology report helps the oncology team determine whether endocrine therapy is likely to be useful.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If a tumour does not express hormone receptors, hormone therapy generally does not form the same role in treatment. This is why [pathology and receptor testing](${DIAGNOSIS}) are critical parts of breast cancer treatment planning.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does Hormone Therapy Work?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy can work through different mechanisms. The two major approaches are:",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Blocking the effect of estrogen — some medicines attach to estrogen receptors and interfere with estrogen's ability to stimulate cancer cells.",
      "Reducing estrogen production — other medicines reduce the amount of estrogen produced by the body.",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The appropriate approach depends partly on whether the patient is premenopausal or postmenopausal.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Common Hormone Therapy Medicines",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-consultation-visual.webp",
    alt: "Patient and medical oncologist reviewing a tablet blister pack and pathology folder",
    caption: "The medicine chosen — tamoxifen, an aromatase inhibitor, or ovarian-function suppression — depends on menopausal status and the rest of the pathology.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Tamoxifen",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tamoxifen is a selective estrogen receptor modulator, commonly known as a SERM. It works by blocking estrogen's effects in breast tissue. Tamoxifen can be used in both premenopausal and postmenopausal patients, although the overall treatment strategy varies according to the patient's circumstances.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Aromatase Inhibitors",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common aromatase inhibitors include anastrozole, letrozole and exemestane. These medicines reduce estrogen production in the body. They are commonly used in postmenopausal patients. In some premenopausal patients, an aromatase inhibitor may be used together with ovarian-function suppression.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Ovarian-Function Suppression",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For some premenopausal patients, doctors may recommend treatment that suppresses ovarian estrogen production. This can be combined with endocrine medicines depending on the individual's cancer characteristics and treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The decision depends on age, menopausal status, tumour characteristics, recurrence risk, previous treatments and tolerance of treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask which endocrine medicine applies](${consult("Hormone Therapy")}) · [WhatsApp +91 90443 46292](${wa("Which hormone therapy medicine is appropriate for my ER/PR-positive breast cancer?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy Before or After Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy can be incorporated into breast cancer treatment at different points.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Before Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In selected patients, endocrine therapy may be considered before surgery. This approach is called neoadjuvant endocrine therapy. It may be used in specific clinical situations, particularly for some hormone receptor-positive cancers. However, it is not required for every patient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "After Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is frequently used as adjuvant treatment for appropriate hormone receptor-positive breast cancers. The objective is to reduce the risk that cancer cells remaining elsewhere in the body could grow in the future.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Depending on the individual treatment plan, endocrine therapy may be given after [breast-conserving surgery](${LUMPECTOMY_COST}), [mastectomy](${MASTECTOMY_COST}), [chemotherapy](${CHEMO_COST}) or [radiation therapy](${EBRT_COST}). The sequence can vary.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Early-Stage Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For early-stage hormone receptor-positive breast cancer, treatment may involve several components. A typical pathway might include: Diagnosis → Surgery → Pathology → Risk assessment → Additional treatment → Hormone therapy. See [treatment by stage](${BY_STAGE}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the individual case, additional treatments may include radiation therapy, chemotherapy and targeted therapy. Not every patient needs all of these treatments.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Advanced or Metastatic Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy can also be an important treatment for hormone receptor-positive advanced or metastatic breast cancer. In this setting, treatment is usually aimed at controlling the disease, slowing progression and maintaining quality of life for as long as possible.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Endocrine therapy may be combined with other systemic medicines depending on the cancer's characteristics and previous treatment. Treatment selection can change over time if the cancer stops responding to a particular therapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Premenopausal Women",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-menopausal-visual.webp",
    alt: "Clinician with a younger patient holding an injection pen and an older patient holding a tablet pack",
    caption: "Premenopausal treatment may include tamoxifen or ovarian-function suppression. Postmenopausal treatment more often uses an aromatase inhibitor.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Menopausal status is important when selecting endocrine treatment. In premenopausal women, the ovaries continue producing significant amounts of estrogen.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore, treatment may involve tamoxifen, ovarian-function suppression, or ovarian-function suppression plus an aromatase inhibitor. The appropriate approach depends on the patient's individual risk profile and treatment goals.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is important not to select hormone therapy based only on age. Menopausal status and ovarian function need to be considered by the treating oncologist.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Postmenopausal Women",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Postmenopausal women generally have lower ovarian estrogen production. Aromatase inhibitors are commonly used in this setting. Possible medicines include anastrozole, letrozole and exemestane. Tamoxifen may also have a role in some treatment plans.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The choice depends on the patient's cancer characteristics, previous treatment, medical history and tolerance.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Is Hormone Therapy Given?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is usually a long-term treatment. Many patients receive endocrine therapy for several years. However, the exact duration is individualized.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Factors that may influence duration include cancer stage, tumour biology, recurrence risk, menopausal status, previous endocrine treatment, treatment tolerance and risk of recurrence over time. Some patients may change from one endocrine medicine to another during treatment.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp +91 90443 46292 about treatment duration",
    href: wa("How long would hormone therapy last in my case, and what would a quotation include?"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Side Effects of Hormone Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Side effects vary according to the medicine. Some patients experience relatively mild symptoms, while others may find certain side effects more difficult to tolerate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common side effects can include hot flashes, night sweats, joint or muscle discomfort, fatigue, mood changes, vaginal dryness and changes in sexual health. The side-effect profile differs between tamoxifen and aromatase inhibitors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Tamoxifen: Important Side Effects",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tamoxifen can cause symptoms such as hot flashes, night sweats, vaginal symptoms, menstrual changes and mood changes. Rare but important risks can include blood clots and certain changes in the lining of the uterus. Patients should discuss their individual risk factors with their oncologist.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Aromatase Inhibitors: Important Side Effects",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Aromatase inhibitors can commonly cause joint pain, muscle discomfort, hot flashes, stiffness and fatigue. Long-term treatment may also affect bone health in some patients. For patients taking aromatase inhibitors, doctors may monitor bone health and recommend appropriate measures based on individual risk.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Hormone Therapy Cause Menopause?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy can cause or intensify menopausal symptoms. This is particularly relevant for premenopausal patients receiving ovarian-function suppression.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Symptoms may include hot flashes, sweating, changes in menstrual periods, vaginal dryness, changes in sexual function and mood changes. However, the exact experience varies significantly between patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Hormone Therapy Be Stopped Because of Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should not stop endocrine therapy on their own. If side effects become difficult to manage, the oncology team may consider changing the medication, adjusting the treatment strategy, managing individual symptoms, or switching between endocrine therapies when medically appropriate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The goal is to maintain effective cancer treatment while making long-term therapy as manageable as possible.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy vs Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Hormone Therapy | Chemotherapy |\n| --- | --- | --- |\n| Main mechanism | Targets hormone signalling | Uses anticancer drugs to damage/kill cancer cells |\n| Main use | Hormone receptor-positive cancers | Used for selected breast cancers |\n| Treatment | Usually long-term | Often given in defined cycles |\n| Administration | Often oral; some treatments injectable | Usually intravenous, sometimes oral depending on regimen |\n| Side effects | Often endocrine-related | Can include fatigue, nausea, hair loss, blood-count changes and others |\n| Applicability | Depends strongly on ER/PR status | Depends on tumour characteristics and clinical risk |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Some patients receive both. Others may not require [chemotherapy](${CHEMO_COST}) but may still receive hormone therapy.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy vs Targeted Therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Targeted therapy](${TARGETED_COST}) is different from endocrine therapy. For example, [HER2-targeted medicines](${HER2}) are designed to interfere with HER2-driven cancer biology. Hormone therapy, in contrast, targets hormone signalling.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A patient can sometimes receive both approaches if the cancer has characteristics that make both treatments appropriate.",
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
    text: "Hormone Therapy vs Immunotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Immunotherapy](${IMMUNO_COST}) works by helping the immune system recognize or attack cancer cells through specific immune mechanisms. It is different from endocrine treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Whether immunotherapy has a role depends on the biological characteristics of the breast cancer and the patient's clinical situation. Therefore, hormone therapy should not be considered interchangeable with immunotherapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Immunotherapy Doctors in India](${IMMUNO_DOCTORS})\n- [Immunotherapy Cost in India](${IMMUNO_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Hormone Therapy Be Combined With Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Radiation therapy and endocrine therapy work differently and may both form part of treatment for appropriate patients. For example, a patient undergoing breast-conserving surgery may receive lumpectomy → [radiation therapy](${EBRT_COST}) → hormone therapy. The actual sequence varies according to the treatment plan.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Tests Are Needed Before Hormone Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The treatment team generally needs a confirmed diagnosis and [pathology assessment](${DIAGNOSIS}) before selecting endocrine therapy.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Important information may include histopathology, ER status, PR status, HER2 status, tumour grade, cancer stage, lymph-node status, menopausal status, previous cancer treatment and other medical conditions. Additional tests may be recommended depending on the treatment being considered.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why ER and PR Testing Matters",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "ER and PR testing provides important information about whether breast cancer cells have hormone receptors. A positive hormone receptor result can influence the treatment plan.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For international patients seeking treatment in India, it is therefore useful to bring the complete pathology report, rather than only a summary diagnosis. If possible, patients should also bring the original pathology slides or blocks when their treating hospital requests them for review. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During Follow-Up?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy usually involves long-term follow-up. During appointments, doctors may review medication adherence, side effects, menopausal symptoms, bone health where relevant, other medicines, new symptoms and overall cancer follow-up.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should tell their doctor about persistent or severe symptoms rather than discontinuing treatment independently.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy and Bone Health",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-bone-health-visual.webp",
    alt: "Patient on a medical imaging table during follow-up monitoring while a clinician reviews the scan",
    caption: "Aromatase inhibitors can affect bone health in some patients, so follow-up may include bone-density assessment and other monitoring.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bone health can be particularly relevant for patients taking aromatase inhibitors. Estrogen has an important role in maintaining bone strength. Reducing estrogen levels can therefore contribute to bone loss in some patients.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on individual risk, doctors may consider bone-density assessment, calcium and vitamin D intake, weight-bearing physical activity, lifestyle measures and medicines to protect bone health when appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy and Fertility",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fertility can be an important consideration for younger patients. Because endocrine therapy can last for several years, women who may want future pregnancies should discuss fertility and treatment timing with their oncology team before starting treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fertility preservation may need to be considered before certain cancer treatments. The approach must be individualized because cancer treatment should not be delayed inappropriately.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for International Patients in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "International patients considering breast cancer treatment in India should ideally have their pathology and treatment records reviewed before travelling.",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Biopsy report and histopathology report",
      "ER/PR report and HER2 report",
      "Imaging reports",
      "Previous surgery, chemotherapy and radiation records",
      "Current medication list and previous endocrine therapy details",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A patient already taking hormone therapy should bring the exact medicine name, dose and duration. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm what to send.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my hormone-receptor reports for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Determines the Cost of Hormone Therapy in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy can be considerably different from surgery or chemotherapy because many endocrine medicines are taken over a long period. See [Hormone Therapy Cost in India](${HORMONE_COST}) and the [breast cancer treatment cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The overall cost may depend on the medicine selected, brand or formulation, treatment duration, ovarian-function suppression if required, follow-up consultations, monitoring tests, bone-density monitoring where appropriate, and other medicines used alongside endocrine therapy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is therefore no single cost applicable to every patient. For a personalized estimate, the treatment plan and medication requirements should be reviewed by the treating oncology team.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a hormone-therapy quotation",
    href: consult("Hormone Therapy"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Hormone Therapy Cost Compared With Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The two treatments have very different cost structures. Chemotherapy often involves multiple treatment cycles, hospital or day-care administration, pre-treatment tests, medicines administered during each cycle, supportive medicines and periodic monitoring.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy may involve a medicine taken over an extended period, with regular follow-up. Therefore, comparing a single chemotherapy cycle with a full course of endocrine treatment does not provide a meaningful picture of total treatment expense. Patients should ask for a treatment-specific quotation based on the prescribed regimen.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist About Hormone Therapy",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is my breast cancer hormone receptor-positive?",
      "What are my ER and PR results?",
      "Am I premenopausal or postmenopausal for treatment purposes?",
      "Which endocrine therapy is being recommended?",
      "Why is this particular medicine being selected?",
      "How long will I need to take it?",
      "What side effects should I expect?",
      "How can side effects be managed?",
      "Will I need bone-density monitoring?",
      "Could my treatment change later?",
      "How does hormone therapy fit with chemotherapy or radiation?",
      "What should I do if I miss a dose?",
      "Could treatment affect fertility?",
      "What follow-up tests will I need?",
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
    text: "What is hormone therapy for breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is systemic treatment used mainly for hormone receptor-positive breast cancer. It reduces the effect or production of hormones that can stimulate cancer cells.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Who needs hormone therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is generally considered for patients whose breast cancer expresses hormone receptors, particularly ER and/or PR.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is hormone therapy the same as chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. They work through different mechanisms. Hormone therapy targets hormone signalling, while chemotherapy uses anticancer drugs that act through different mechanisms.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is hormone therapy given before or after surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can be used at different stages of treatment. For many patients with early-stage hormone receptor-positive breast cancer, it is given as adjuvant treatment after surgery, but treatment sequencing varies.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How long do I need hormone therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Treatment commonly lasts for several years, but the duration depends on individual cancer characteristics, recurrence risk, menopausal status, previous treatment and tolerance.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can men receive hormone therapy for breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Breast cancer can occur in men, and hormone receptor-positive breast cancer in men may be treated with endocrine therapy when clinically appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does hormone therapy cause hair loss?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hair loss is not generally the same type of prominent side effect associated with some chemotherapy regimens. However, individual medicines can have different side-effect profiles.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can hormone therapy be taken with chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Depending on the treatment plan, endocrine therapy may be part of a broader treatment strategy that also includes chemotherapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can hormone therapy be combined with targeted therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some hormone receptor-positive cancers may also have other biological characteristics that make targeted therapy appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What happens if hormone therapy causes severe side effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Speak with the treating oncologist. Depending on the situation, the doctor may manage the symptoms or consider a different endocrine treatment. Patients should not stop treatment without medical advice.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is hormone therapy used for triple-negative breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Triple-negative breast cancer does not express estrogen or progesterone receptors, so endocrine therapy generally does not have the same role as it does in hormone receptor-positive breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How much does hormone therapy cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The cost varies according to the medicine, treatment duration, monitoring and whether additional endocrine treatments such as ovarian-function suppression are required.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy for Breast Cancer in India: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is an important component of treatment for many patients with hormone receptor-positive breast cancer. The treatment plan depends on ER and PR status, HER2 status, cancer stage, menopausal status, recurrence risk, previous treatment, other medical conditions, and patient preferences and treatment tolerance.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common endocrine treatments include tamoxifen and aromatase inhibitors, while selected premenopausal patients may also receive ovarian-function suppression. Because hormone therapy can continue for several years, understanding both its benefits and possible side effects is important before starting treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For patients seeking breast cancer treatment in India, the endocrine treatment plan should be integrated with surgery, chemotherapy, radiation and other systemic treatments where appropriate.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan hormone therapy for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [ER, PR and HER2 results](${BIOMARKERS})\n- [HER2-Positive Breast Cancer Treatment](${HER2})\n- [Breast Cancer Diagnosis](${DIAGNOSIS})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Breast Cancer Treatment Cost in India](${COST})\n- [Treatment for international patients](${INTL})\n- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})\n- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})\n- [Targeted Therapy Doctors in India](${TARGETED_DOCTORS})\n- [Targeted Therapy Cost in India](${TARGETED_COST})`,
  },
];

const now = "2026-09-27T17:00:00.000Z";
const SLUG = "hormone-therapy-breast-cancer-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_hormone_therapy_breast_cancer_india",
  slug: SLUG,
  title: "Hormone Therapy for Breast Cancer: Who Needs It, How It Works and Cost in India",
  excerpt:
    "Who needs endocrine therapy, how tamoxifen and aromatase inhibitors work, treatment duration, side effects and why India quotes must be case-specific.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "hormone therapy", "endocrine therapy", "tamoxifen", "India", "travel"],
  image: "/uploads/articles/hormone-therapy-receptors-visual.webp",
  imageAlt:
    "Hormone therapy for hormone receptor-positive breast cancer showing endocrine treatment pathway",
  status: "published",
  featured: true,
  seoTitle: "Hormone Therapy for Breast Cancer | Treatment & Cost in India",
  seoDescription:
    "Learn who needs hormone therapy for breast cancer, how tamoxifen and aromatase inhibitors work, treatment duration, side effects and cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/hormone-therapy-receptors-visual.webp",
  allowIndex: true,
  keywords: [
    "hormone therapy for breast cancer",
    "hormone therapy for breast cancer in India",
    "breast cancer hormone therapy",
    "breast cancer endocrine therapy",
    "tamoxifen for breast cancer",
    "aromatase inhibitors breast cancer",
    "hormone receptor positive breast cancer",
    "ER positive breast cancer treatment",
    "PR positive breast cancer treatment",
    "hormone therapy cost in India",
    "breast cancer treatment in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "ER, PR and HER2 results", href: BIOMARKERS },
    { label: "HER2-Positive Breast Cancer Treatment", href: HER2 },
    { label: "Breast Cancer Diagnosis", href: DIAGNOSIS },
    { label: "Breast Cancer Treatment by Stage", href: BY_STAGE },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
    { label: "Hormone therapy cost in India", href: HORMONE_COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) {
  store.categories.push("Medical Oncology");
}
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  {
    id: "media_ht_receptors",
    url: "/uploads/articles/hormone-therapy-receptors-visual.webp",
    name: "hormone-therapy-receptors-visual.webp",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_ht_consult",
    url: "/uploads/articles/hormone-therapy-consultation-visual.webp",
    name: "hormone-therapy-consultation-visual.webp",
    alt: "Endocrine-therapy consultation with tablets and pathology folder",
    addedAt: now,
  },
  {
    id: "media_ht_meno",
    url: "/uploads/articles/hormone-therapy-menopausal-visual.webp",
    name: "hormone-therapy-menopausal-visual.webp",
    alt: "Premenopausal and postmenopausal endocrine options",
    addedAt: now,
  },
  {
    id: "media_ht_bone",
    url: "/uploads/articles/hormone-therapy-bone-health-visual.webp",
    name: "hormone-therapy-bone-health-visual.webp",
    alt: "Follow-up imaging during long-term hormone therapy",
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
      label: "Hormone Therapy for Breast Cancer in India",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
