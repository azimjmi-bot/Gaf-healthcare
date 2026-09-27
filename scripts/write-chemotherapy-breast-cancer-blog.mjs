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
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";
const MED_DOCTORS = "/doctors/India/Medical-Oncology";
const MED_HOSPITALS = "/hospitals/India/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Chemotherapy is a systemic treatment that uses anti-cancer medicines to destroy or control breast cancer cells.</p><p class="article-quick-answer__body">It may be recommended:</p><ul class="article-quick-answer__list"><li>Before surgery to shrink a tumour or treat cancer systemically before an operation</li><li>After surgery to reduce the risk of recurrence in patients for whom chemotherapy is appropriate</li><li>For metastatic breast cancer to control disease or symptoms</li></ul><p class="article-quick-answer__body">Chemotherapy is not required for every breast cancer patient. The decision depends on cancer stage, tumour biology, ER/PR and HER2 status, lymph-node involvement and other clinical factors.</p><p class="article-quick-answer__body">Treatment is usually given in cycles, with periods of treatment followed by recovery. The number of cycles and medicines depend on the selected regimen.</p><p class="article-quick-answer__body">The cost in India varies according to the chemotherapy medicines, dose, number of cycles, supportive medicines, hospital/day-care charges, investigations and the patient's treatment plan. There is no single fixed chemotherapy cost for every breast cancer patient.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy is one of the systemic treatments used to treat breast cancer. It uses medicines that travel through the bloodstream to destroy or control cancer cells. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF whether chemotherapy applies",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology report](${wa("Please review my breast cancer records to see if chemotherapy is needed in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-breast-infusion-visual.webp",
    alt: "Chemotherapy for breast cancer in India showing oncology treatment and intravenous chemotherapy",
    caption: "Many regimens are given as day-care infusions. The medicine, dose and cycle count — not a generic package — determine the quotation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Chemotherapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy uses medicines that target rapidly dividing cells. Because chemotherapy medicines circulate throughout the body, they can treat cancer cells that may have moved away from the original breast tumour but are not yet detectable on imaging.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `This is different from [surgery](${LUMPECTOMY_COST}) and [radiation therapy](${RADIATION}), which primarily treat specific areas of the body. Chemotherapy can therefore form part of a multimodal breast cancer treatment plan.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Depending on the situation, a patient may receive chemotherapy → surgery → radiation, or surgery → chemotherapy → radiation, or another sequence determined by the oncology team. Medical oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) decide the sequence from the type and [stage](${STAGES}) of breast cancer.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Every Breast Cancer Patient Need Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Chemotherapy is not automatically required simply because someone has been diagnosed with breast cancer.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Doctors consider [cancer stage](${BY_STAGE}), tumour size, lymph-node involvement, tumour grade, [ER, PR and HER2 status](${BIOMARKERS}), breast cancer subtype, age and menopausal status, overall health, previous treatment, response to treatment, and certain genomic or molecular test results in selected patients.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The purpose is to determine whether chemotherapy is likely to provide enough benefit to justify its potential risks and side effects. For some hormone-receptor-positive early breast cancers, additional genomic testing may help inform the chemotherapy decision in appropriate patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Chemotherapy Used for Breast Cancer?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-breast-cycles-visual.webp",
    alt: "Medical oncologist discussing a chemotherapy cycle calendar with a patient",
    caption: "Neoadjuvant treatment comes before surgery. Adjuvant treatment comes after. Metastatic treatment is planned around disease control.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "1. Chemotherapy Before Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy given before surgery is called neoadjuvant chemotherapy. The treatment may be used to reduce tumour size, make surgery easier or possible, treat microscopic cancer cells throughout the body, assess how the cancer responds to treatment, and help guide subsequent treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Neoadjuvant treatment is particularly relevant in some larger or locally advanced breast cancers and in selected [HER2-positive](${HER2}) and triple-negative cancers. Depending on the cancer subtype, neoadjuvant treatment may include chemotherapy combined with [targeted therapy](${TARGETED_COST}) or [immunotherapy](${IMMUNO_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "2. Chemotherapy After Surgery",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy given after surgery is called adjuvant chemotherapy. The objective is to treat cancer cells that may remain elsewhere in the body even when the visible tumour has been removed after [lumpectomy](${LUMPECTOMY_COST}) or [mastectomy](${MASTECTOMY_COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The need for adjuvant chemotherapy depends on the patient's risk profile and tumour biology. It is not automatically recommended after every breast cancer operation.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "3. Chemotherapy for Metastatic Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In Stage 4 breast cancer, chemotherapy may be used when systemic treatment is appropriate. The treatment goal is generally different from treatment of early-stage disease.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For metastatic breast cancer, treatment may aim to control the cancer, reduce symptoms, slow disease progression, maintain quality of life and extend survival. The choice between chemotherapy, hormone therapy, targeted therapy and other systemic treatments depends strongly on the cancer subtype.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether chemotherapy belongs before or after surgery](${consult("Chemotherapy")}) · [WhatsApp +91 90443 46292](${wa("Should my breast cancer chemotherapy be neoadjuvant or adjuvant?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy and Breast Cancer Subtypes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "One of the most important aspects of breast cancer treatment is that different biological subtypes can respond differently to systemic therapies.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Hormone-Receptor-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If a breast cancer is ER-positive and/or PR-positive, [hormone therapy](${HORMONE}) can play an important role. Chemotherapy may or may not be required. The decision depends on the overall risk and characteristics of the cancer.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "HER2-Positive Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `HER2-positive breast cancers can be treated with [HER2-directed therapies](${HER2}). Chemotherapy may be combined with HER2-targeted treatment in appropriate patients. The exact combination depends on the stage and treatment setting.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Triple-Negative Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Triple-negative breast cancer does not have significant expression of ER, PR or HER2. Chemotherapy is an important component of treatment for many patients with triple-negative disease. In selected situations, [immunotherapy](${IMMUNO_COST}) may also form part of treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Many Chemotherapy Cycles Are Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal number of chemotherapy cycles for breast cancer. The number depends on the type of breast cancer, stage, treatment objective, selected chemotherapy regimen, whether chemotherapy is being given before or after surgery, whether other systemic treatments are being used, patient response and tolerance of treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some regimens involve a small number of cycles, while others involve a longer course. The oncologist should provide a treatment schedule explaining medicine names, dose, frequency, number of cycles, expected duration, blood tests required and supportive medicines.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should not compare their number of cycles directly with another patient's treatment because the underlying cancers and treatment regimens may be different.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp +91 90443 46292 about cycle count",
    href: wa("How many chemotherapy cycles would I need, and what would a quotation include?"),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is a Chemotherapy Cycle?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A chemotherapy cycle generally consists of a treatment period followed by a recovery period — for example, chemotherapy → recovery → chemotherapy → recovery. The interval allows healthy cells and the body to recover between treatments.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A cycle is not necessarily one day of treatment. Some chemotherapy regimens involve treatment on one day, while others may involve several treatment days followed by a longer recovery period.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Chemotherapy Given?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Intravenous chemotherapy.** Many breast cancer chemotherapy medicines are administered through a vein. This may be done through a peripheral IV line, a central venous access device or an implanted port. The choice depends on the treatment plan and the patient's veins and treatment duration.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Oral chemotherapy.** Some anti-cancer medicines are taken by mouth. Oral treatment still requires careful monitoring because dosage, timing and side effects remain important. The route of administration depends on the specific medicine and treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens on a Chemotherapy Day?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-breast-blood-test-visual.webp",
    alt: "Medical oncologist reviewing blood-test results with a patient before a chemotherapy cycle",
    caption: "A typical visit includes assessment, blood counts, pre-medication, the infusion and a period of observation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A typical chemotherapy visit may involve medical assessment of current symptoms and side effects, blood tests to decide whether treatment can proceed, medication review, pre-medication to reduce nausea or allergic reactions, the chemotherapy infusion, observation, and discharge if the treatment is provided as day care.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does a Chemotherapy Session Take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single duration. The time can depend on the number of medicines, infusion speed, pre-medications, observation requirements, hydration, laboratory testing and the type of chemotherapy regimen.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some treatment visits may take a few hours, while others can take longer. Patients travelling internationally should ask their hospital how long they should expect to remain at the hospital on each treatment day.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Common Side Effects of Breast Cancer Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy affects cancer cells but can also affect some healthy cells. Possible side effects include fatigue, nausea, vomiting, hair loss, reduced appetite, mouth sores, changes in taste, diarrhoea or constipation, reduced blood-cell counts, increased risk of infection, numbness or tingling in hands and feet, menstrual changes and fertility effects.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not every patient experiences all of these effects. Side effects vary according to the specific chemotherapy medicines and the individual patient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Fatigue During Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is common during cancer treatment. It may be caused by chemotherapy, anaemia, poor sleep, reduced food intake, emotional stress, other medicines or the cancer itself. Patients should discuss persistent or severe fatigue with their oncology team because potentially treatable causes may need to be evaluated.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Hair Loss During Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines cause significant hair loss, while others may cause less. Hair loss can affect scalp hair, eyebrows, eyelashes and other body hair. Hair usually begins to grow back after chemotherapy ends, although the timing varies between patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Nausea and Vomiting",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern chemotherapy protocols commonly include medicines designed to prevent or reduce chemotherapy-related nausea and vomiting. Patients should take anti-nausea medicines exactly as prescribed. If nausea or vomiting becomes difficult to control, the oncology team should be informed because treatment can often be adjusted.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Low Blood Counts",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can temporarily reduce blood-cell production in the bone marrow. This may affect white blood cells, red blood cells and platelets. A low white blood-cell count can increase infection risk. Low red blood-cell levels can contribute to fatigue. Low platelet levels can increase the risk of bleeding or bruising. For this reason, blood tests are commonly performed during chemotherapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Peripheral Neuropathy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines can cause peripheral neuropathy. Symptoms may include tingling, numbness, burning sensations, sensitivity to touch and weakness. Patients should tell their oncology team if these symptoms develop. Early reporting can help doctors determine whether treatment adjustments are necessary.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Chemotherapy Side Effects Be Managed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Many chemotherapy side effects can be managed or reduced with supportive treatment. Depending on the problem, the oncology team may use anti-nausea medicines, pain medicines, nutritional support, medicines to manage diarrhoea or constipation, growth-factor support in selected situations, treatment for infections or dose adjustments.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should not stop or modify chemotherapy medicines themselves. Any significant side effect should be discussed with the treating oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should You Eat During Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single \"chemotherapy diet\" suitable for everyone. The nutritional goal is generally to maintain adequate calories, protein, fluids, vitamins and minerals. Patients may find it easier to eat smaller, more frequent, protein-rich meals that are easier to tolerate.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If nausea, mouth sores or taste changes make eating difficult, a dietitian or oncology team can provide individualized advice. Patients should also be cautious about supplements and herbal products because some can interact with cancer medicines.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can You Work During Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients continue working during chemotherapy, while others need to reduce their workload or take time away from work. It depends on the chemotherapy regimen, side effects, type of work, travel requirements, energy levels, infection risk and overall health. There is no universal rule.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can You Travel During Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Travel may be possible for some patients, but it needs to be discussed with the treating oncology team. For international patients receiving chemotherapy in India, treatment planning should consider the chemotherapy schedule, blood counts, risk of infection, recovery between cycles, hospital access, emergency care, follow-up appointments and flight timing.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is generally sensible to avoid planning international travel immediately around a treatment session without discussing the timing with the oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy for International Patients in India",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-breast-international-visual.webp",
    alt: "International patient meeting a day-care nurse before a chemotherapy visit in India",
    caption: "Share pathology and imaging before travel so the regimen, cycle count and stay length can be estimated.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `International patients often need to coordinate chemotherapy over several weeks or months. Before travelling, it can be useful to obtain a preliminary treatment opinion based on the [biopsy and histopathology](${DIAGNOSIS}), ER/PR and HER2 results, imaging, previous treatment and medical history. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A possible pathway is: medical records shared → oncology review → additional testing if required → treatment plan → cost estimate → travel to India → chemotherapy → monitoring and follow-up → return home or continue treatment in India. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm what to send.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my breast cancer records for a chemotherapy opinion before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer Chemotherapy Cost in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single fixed chemotherapy price. See [Chemotherapy Cost in India](${CHEMO_COST}), [Chemotherapy Doctors in India](${CHEMO_DOCTORS}) and the [breast cancer treatment cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The total cost can vary according to chemotherapy medicines, drug dosage, number of cycles, treatment regimen, supportive medicines, blood tests, doctor consultations, day-care or hospital charges, port placement where required, management of side effects and other systemic treatments.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A published hospital quotation should therefore specify the actual chemotherapy regimen rather than simply giving a generic \"cost per cycle.\"",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a chemotherapy quotation",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send a case-specific quotation for breast cancer chemotherapy in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Usually Included in a Chemotherapy Cost?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Cost component | May be included? |\n| --- | --- |\n| Medical oncology consultation | Depends on hospital |\n| Chemotherapy medicines | Depends on quotation |\n| Day-care/infusion charges | Depends on hospital |\n| Pre-medications | Depends on regimen |\n| Blood tests | May be separate |\n| Imaging | Usually separate |\n| Supportive medicines | May be separate |\n| Port placement | Usually separate |\n| Hospital admission | Depends on treatment |\n| Management of complications | Usually additional |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact inclusions should be confirmed directly with the treating hospital.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can Chemotherapy Costs Differ Between Patients?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Two patients may both be diagnosed with breast cancer but receive very different chemotherapy bills. Costs can differ because one patient may receive a different chemotherapy regimen, a different drug dose, fewer or more cycles, targeted therapy in addition to chemotherapy, immunotherapy in addition to chemotherapy, or more supportive medicines.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Therefore, comparing only the number of cycles does not provide a meaningful cost comparison.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy vs Targeted Therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These treatments are different, although they may sometimes be given together. Chemotherapy generally targets rapidly dividing cells. [Targeted therapy](${TARGETED_COST}) is designed to act on specific molecular characteristics of cancer — for example, HER2-targeted medicines in appropriate HER2-positive breast cancers.`,
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
    text: "Chemotherapy vs Hormone Therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Hormone therapy](${HORMONE}) works differently from chemotherapy. For hormone-receptor-positive breast cancer, hormone therapy may be used to interfere with hormonal signals that help certain cancer cells grow. It may be given after surgery, before surgery in selected situations, or for metastatic disease. Chemotherapy may or may not be required in addition.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone Therapy Cost in India](${HORMONE_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy vs Immunotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Immunotherapy](${IMMUNO_COST}) works by helping the immune system recognize and attack cancer cells. It is not appropriate for every breast cancer patient. It may be used in selected breast cancer settings, including certain triple-negative breast cancers.`,
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
    text: "What Happens After the Final Chemotherapy Cycle?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Finishing chemotherapy does not necessarily mean that breast cancer treatment is complete. Depending on the patient's treatment plan, the next steps may include surgery, [radiation therapy](${RADIATION}), [hormone therapy](${HORMONE}), targeted therapy, immunotherapy, follow-up imaging, blood tests and long-term surveillance.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy Before Surgery: Example",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A patient with locally advanced HER2-positive breast cancer may receive systemic treatment before surgery. A simplified pathway could be: diagnosis → biopsy → HER2 testing → neoadjuvant systemic treatment → surgery → radiation/systemic treatment. The actual medicines and sequence depend on the patient's individual diagnosis.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy After Surgery: Example",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A patient with an early-stage breast cancer for whom chemotherapy is recommended may have: diagnosis → [lumpectomy](${LUMPECTOMY_COST}) → pathology → chemotherapy → [radiation](${EBRT_COST}) → [hormone therapy](${HORMONE_COST}). This is an example rather than a standard sequence for every patient.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy for Stage 4 Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For metastatic breast cancer, systemic therapy is central to treatment. Chemotherapy may be used depending on cancer subtype, previous treatment, rate of disease progression, symptoms, organ involvement, hormone-receptor status, HER2 status and other biomarkers.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For some metastatic breast cancers, hormone therapy or targeted therapy may be preferred over chemotherapy depending on the tumour biology. The treatment objective is generally disease control and management rather than simply removing the original breast tumour.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Records Should International Patients Bring?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients travelling to India for chemotherapy should ideally bring copies of all previous medical records: biopsy and histopathology, ER, PR, HER2 and other biomarker reports; mammography, ultrasound, MRI, CT, PET-CT and bone scans where applicable; surgery reports, chemotherapy records, radiation records, previous medication lists and discharge summaries; plus allergies, other medical conditions, current medicines and previous treatment side effects.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If possible, pathology slides or tissue blocks may also be requested for review.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Medical Oncologist",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Why do I need chemotherapy?",
      "Is chemotherapy being given before or after surgery?",
      "What chemotherapy medicines will I receive?",
      "How many cycles are planned?",
      "How frequently will I receive treatment?",
      "How long will each visit take?",
      "What side effects are most likely?",
      "Which side effects require urgent medical attention?",
      "Will I need a port?",
      "What blood tests are required?",
      "Can I continue working?",
      "Can I travel between cycles?",
      "What should I eat during treatment?",
      "Will I need additional treatment after chemotherapy?",
      "What is included in the treatment quotation?",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Should a Patient Contact the Oncology Team?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients receiving chemotherapy should have clear instructions from their treatment team about symptoms that require urgent assessment. Depending on the chemotherapy regimen, these may include fever, chills, difficulty breathing, severe vomiting, persistent diarrhoea, significant bleeding, severe weakness, new confusion and signs of infection.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact emergency instructions should be provided by the treating oncology team because risks vary between chemotherapy regimens.",
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
    text: "Is chemotherapy necessary for every breast cancer patient?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. The need for chemotherapy depends on stage, tumour biology, lymph-node status and other clinical factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How many chemotherapy cycles are needed for breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal number. The number of cycles depends on the specific chemotherapy regimen and treatment objective.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can chemotherapy be given before breast cancer surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. This is called neoadjuvant chemotherapy and is used in selected patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can chemotherapy be given after surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. This is called adjuvant chemotherapy and may be recommended depending on the patient's risk and tumour characteristics.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How long does one chemotherapy session take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It varies according to the medicines, infusion schedule, pre-medications and monitoring requirements. Some treatments take a few hours, while others can take longer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does chemotherapy cause hair loss?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines cause significant hair loss, while others may cause less. The oncology team can explain the expected effects of the specific regimen.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does chemotherapy cause nausea?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can. Anti-nausea medicines are commonly used to prevent or control chemotherapy-related nausea and vomiting.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can chemotherapy affect fertility?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines can affect fertility. Patients who may wish to have children in the future should discuss fertility preservation with their oncology team before treatment begins.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I work while receiving chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients continue working, while others reduce their workload or take time off. The decision depends on the treatment and how the patient feels.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can international patients receive chemotherapy in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. International patients can seek chemotherapy treatment in India. Their medical records can be reviewed before travel to help develop a treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How much does chemotherapy for breast cancer cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single fixed price. Cost depends on the medicines, dosage, number of cycles, supportive treatment, investigations and hospital charges.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can chemotherapy be combined with targeted therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. In selected breast cancers, particularly certain HER2-positive cancers, chemotherapy and targeted therapy may be used together.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can chemotherapy be combined with immunotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes, in selected treatment settings. Whether this is appropriate depends on the cancer subtype, stage and treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy for Breast Cancer in India: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy is an important treatment option for some breast cancer patients, but it is not automatically required for everyone. The decision depends on the complete cancer profile, including stage, tumour size, lymph-node involvement, ER and PR status, HER2 status, tumour grade, breast cancer subtype, previous treatment and overall health.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can be given before surgery, after surgery or for metastatic breast cancer. For international patients considering treatment in India, the most useful first step is to have the complete pathology and medical records reviewed by a medical oncology team.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan chemotherapy for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})\n- [Medical Oncology Doctors in India](${MED_DOCTORS})\n- [Medical Oncology Hospitals in India](${MED_HOSPITALS})\n- [Radiation Therapy for Breast Cancer](${RADIATION})\n- [Hormone Therapy for Breast Cancer](${HORMONE})\n- [HER2-Positive Breast Cancer Treatment](${HER2})\n- [Breast Reconstruction After Mastectomy](${RECON})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Treatment for international patients](${INTL})`,
  },
];

const now = "2026-09-27T19:30:00.000Z";
const SLUG = "chemotherapy-for-breast-cancer-in-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_chemotherapy_for_breast_cancer_in_india",
  slug: SLUG,
  title: "Chemotherapy for Breast Cancer in India: Cost, Cycles and Side Effects",
  excerpt:
    "When chemotherapy is used before or after surgery, how cycles work, side effects and why India quotations must name the regimen rather than a generic per-cycle price.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "chemotherapy", "neoadjuvant", "India", "travel", "systemic therapy"],
  image: "/uploads/articles/chemo-breast-infusion-visual.webp",
  imageAlt:
    "Chemotherapy for breast cancer in India showing oncology treatment and intravenous chemotherapy",
  status: "published",
  featured: true,
  seoTitle: "Chemotherapy for Breast Cancer in India | Cost, Cycles & Side Effects",
  seoDescription:
    "Learn about chemotherapy for breast cancer in India, including treatment cycles, cost, side effects, chemotherapy before or after surgery and international patient care.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/chemo-breast-infusion-visual.webp",
  allowIndex: true,
  keywords: [
    "Chemotherapy for breast cancer in India",
    "breast cancer chemotherapy",
    "chemotherapy cost for breast cancer in India",
    "breast cancer chemotherapy cost",
    "chemotherapy cycles for breast cancer",
    "chemotherapy before breast cancer surgery",
    "chemotherapy after breast cancer surgery",
    "chemotherapy side effects",
    "breast cancer chemotherapy hospitals in India",
    "breast cancer chemotherapy doctors in India",
    "neoadjuvant chemotherapy breast cancer",
    "adjuvant chemotherapy breast cancer",
    "chemotherapy for Stage 2 breast cancer",
    "chemotherapy for Stage 3 breast cancer",
    "chemotherapy for triple-negative breast cancer",
    "chemotherapy for HER2-positive breast cancer",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Chemotherapy Cost in India", href: CHEMO_COST },
    { label: "Chemotherapy Doctors in India", href: CHEMO_DOCTORS },
    { label: "Radiation Therapy for Breast Cancer", href: RADIATION },
    { label: "Hormone Therapy for Breast Cancer", href: HORMONE },
    { label: "HER2-Positive Breast Cancer Treatment", href: HER2 },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
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
    id: "media_chemo_infusion",
    url: "/uploads/articles/chemo-breast-infusion-visual.webp",
    name: "chemo-breast-infusion-visual.webp",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_chemo_blood",
    url: "/uploads/articles/chemo-breast-blood-test-visual.webp",
    name: "chemo-breast-blood-test-visual.webp",
    alt: "Blood-count review before a chemotherapy cycle",
    addedAt: now,
  },
  {
    id: "media_chemo_cycles",
    url: "/uploads/articles/chemo-breast-cycles-visual.webp",
    name: "chemo-breast-cycles-visual.webp",
    alt: "Chemotherapy cycle calendar discussion",
    addedAt: now,
  },
  {
    id: "media_chemo_intl",
    url: "/uploads/articles/chemo-breast-international-visual.webp",
    name: "chemo-breast-international-visual.webp",
    alt: "International patient arriving for day-care chemotherapy",
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
  "art_radiation_therapy_for_breast_cancer",
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
      label: "Chemotherapy for Breast Cancer in India",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
