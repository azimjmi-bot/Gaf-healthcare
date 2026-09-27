import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is targeted therapy for breast cancer?</strong> Targeted therapy uses medicines designed to act on specific proteins, genes or biological pathways involved in breast cancer growth. It is used only when the cancer has a relevant target.</p><p class="article-quick-answer__body"><strong>Who may receive targeted therapy?</strong> Targeted treatment may be used for some HER2-positive, hormone receptor-positive, triple-negative or BRCA-mutated breast cancers, depending on the cancer's biomarkers and clinical situation.</p><p class="article-quick-answer__body"><strong>What are the common side effects?</strong> Depending on the drug, side effects can include diarrhea, fatigue, nausea, mouth sores, skin or nail changes, low blood counts, liver problems and infusion reactions.</p><p class="article-quick-answer__body"><strong>Can HER2-targeted therapy affect the heart?</strong> Yes. Some HER2-targeted medicines, including trastuzumab, can affect heart function. Heart function is commonly assessed before and during treatment using tests such as an echocardiogram or MUGA scan.</p><p class="article-quick-answer__body"><strong>Does targeted therapy cause hair loss like chemotherapy?</strong> Some targeted medicines can cause hair changes, but the pattern and severity vary considerably between drugs. Targeted therapy should not automatically be expected to cause the same hair loss as chemotherapy.</p><p class="article-quick-answer__body"><strong>Are targeted therapy side effects permanent?</strong> Many side effects improve after treatment ends, but the duration varies by medicine and by patient. Some complications can be serious and require specific treatment or monitoring.</p><p class="article-quick-answer__body"><strong>Is targeted therapy given with chemotherapy?</strong> Sometimes. Certain targeted drugs are combined with chemotherapy, while others may be used with hormone therapy or alone, depending on the cancer subtype and treatment setting.</p><p class="article-quick-answer__body"><strong>How is targeted therapy monitored?</strong> Monitoring can include blood tests, liver-function tests, heart-function testing, assessment of symptoms and, for some medicines, monitoring of blood sugar or other specific parameters.</p><p class="article-quick-answer__body"><strong>Can targeted therapy be given to international patients in India?</strong> Targeted breast cancer treatments are available in Indian cancer centres, but the appropriate drug depends on pathology, biomarkers, stage, previous treatment and the oncologist's treatment plan.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Targeted therapy has changed the treatment of several types of breast cancer. Unlike traditional [chemotherapy](${CHEMO}), targeted drugs are designed to act on particular proteins, genes or pathways that help cancer cells grow and survive. This makes treatment more specific, but it does not mean that targeted therapy is free from side effects. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway, the [HER2-positive treatment guide](${HER2}) and the [diagnosis explainer](${DIAGNOSIS}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about targeted therapy side effects",
    href: consult("Targeted Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology and medicine list](${wa("Please review my breast cancer records and advise on targeted therapy side effects and monitoring in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/targeted-therapy-side-effects-infusion-visual.webp",
    alt: "Breast cancer targeted therapy and HER2 treatment side effects and monitoring",
    caption: "The side effects depend heavily on the drug being used. A patient receiving trastuzumab may have different concerns from someone taking a CDK4/6 inhibitor.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Targeted Therapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Targeted therapy is a form of precision cancer treatment. Instead of treating cancer simply according to its location in the body, doctors look at biological characteristics of the tumour.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These characteristics can include [HER2 status](${HER2}), [hormone receptor status](${HORMONE}), BRCA1 or BRCA2 mutations, PIK3CA mutations and other molecular features. If a cancer has a target that can be treated with an available medicine, targeted therapy may become part of the treatment plan. This is why the [pathology and molecular testing](${DIAGNOSIS}) performed after a breast cancer diagnosis are so important.`,
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
    text: "Does Targeted Therapy Have Fewer Side Effects Than Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. This is a common misunderstanding. Targeted medicines are designed to affect particular cancer-related targets, which can reduce damage to some normal cells. However, the same targets or biological pathways may also be present in healthy tissues.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "As a result, targeted therapies can still cause significant side effects. The side-effect profile is different from traditional chemotherapy rather than simply being \"better\" or \"milder.\"",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Common Targeted Therapies Used in Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The term "targeted therapy" covers several different groups of medicines. Medical oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) choose among them after reviewing [ER, PR and HER2 results](${BIOMARKERS}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "HER2-targeted therapies",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These are used for [HER2-positive breast cancer](${HER2}). Examples include trastuzumab, pertuzumab, trastuzumab emtansine (T-DM1), trastuzumab deruxtecan (T-DXd), tucatinib, neratinib and lapatinib. The appropriate medicine depends on whether the cancer is early-stage or advanced and on previous treatments.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "CDK4/6 inhibitors",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These are used in selected hormone receptor-positive, HER2-negative breast cancers and are often discussed together with [hormone therapy](${HORMONE}). Examples include palbociclib, ribociclib and abemaciclib. They interfere with proteins involved in cell division.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "PARP inhibitors and PI3K/AKT pathway treatments",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Olaparib and talazoparib can be used for selected breast cancers associated with BRCA mutations. Certain targeted medicines can be used when specific molecular alterations are present, such as PIK3CA-related changes or alterations involving the AKT pathway. This is one reason why treatment cannot be selected simply from the [breast cancer stage](" + STAGES + ").",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask which targeted medicine applies in your case](${consult("Targeted Therapy")}) · [WhatsApp +91 90443 46292](${wa("Which targeted therapy is appropriate for my breast cancer biomarkers, and what side effects should I expect?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "HER2-Targeted Therapy and Its Side Effects",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/targeted-therapy-side-effects-heart-visual.webp",
    alt: "Echocardiogram heart-function monitoring during HER2-targeted breast cancer treatment",
    caption: "Some HER2-targeted medicines, including trastuzumab, can affect heart function. An echocardiogram or MUGA scan is commonly used before and during treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "HER2 is a protein involved in cell growth. Some breast cancers have unusually high levels of HER2 and are therefore called HER2-positive. Several medicines specifically target this protein or the pathway around it. Trastuzumab is one of the best-known examples. However, HER2 treatment is not a single-drug treatment category. Different drugs have different side effects.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "1. Heart problems with HER2-targeted therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "One of the most important concerns with some HER2-targeted medicines is their potential effect on heart function. Trastuzumab and some other HER2-targeted treatments can reduce heart function in some patients. The risk can be higher when treatment is combined with certain chemotherapy medicines that can also affect the heart.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This does not mean that everyone receiving trastuzumab will develop heart problems. Instead, it means the heart should be monitored. Doctors may perform an echocardiogram (ECHO) or MUGA scan before treatment and at intervals during treatment. The exact monitoring schedule depends on the medicine, treatment plan and the patient's risk factors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients should tell their oncology team if they develop new shortness of breath, unusual or severe fatigue, leg swelling, a fast or irregular heartbeat, or reduced ability to perform normal activities. These symptoms can have many causes, but they should be assessed during HER2-targeted treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "2. Diarrhea",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Diarrhea is particularly important with some targeted medicines. It can occur with drugs such as lapatinib, neratinib, tucatinib and certain combinations involving pertuzumab. The severity varies. Persistent diarrhea can lead to dehydration and electrolyte problems, so it should not simply be ignored. If diarrhea continues or becomes severe, contact the treating team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "3. Liver problems",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted therapies can affect liver function. This is one reason doctors may order regular blood tests during treatment. Medicines such as lapatinib, neratinib and tucatinib can require liver-function monitoring. Contact your doctor if you develop yellowing of the skin or eyes, dark urine, significant itching, unusual abdominal pain or marked weakness.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "4. Lung problems",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Certain targeted medicines can cause inflammation or injury in the lungs. This is particularly important with trastuzumab deruxtecan (T-DXd), where serious interstitial lung disease or pneumonitis can occur. Report new or worsening cough, shortness of breath, difficulty breathing, chest discomfort or fever associated with respiratory symptoms. Early reporting matters because lung inflammation may need prompt treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "5. Infusion reactions",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted medicines are given intravenously. During or shortly after an infusion, some patients may develop chills, fever, flushing, rash, breathing difficulty, dizziness or changes in blood pressure. The medical team monitors patients during infusions and can provide medicines to manage or reduce the risk of reactions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "6. Fatigue, skin, mouth sores and low blood counts",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is possible with many targeted therapies. It may be difficult to determine whether the tiredness is coming from targeted therapy, chemotherapy, anemia, poor sleep, the cancer itself, hormone therapy or emotional stress. A simple blood test may sometimes identify a treatable cause.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted medicines affect the skin and nails: dry skin, rash, redness, itching, nail changes, increased skin sensitivity or hair changes. Mouth ulcers or soreness can make eating and drinking uncomfortable. Do not wait until you cannot eat or drink normally before reporting the problem.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/targeted-therapy-side-effects-blood-visual.webp",
    alt: "Blood-test monitoring of blood counts and liver function during targeted therapy",
    caption: "Some targeted therapies, particularly CDK4/6 inhibitors, can lower white cells, red cells or platelets. Regular blood tests are often part of monitoring.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "CDK4/6 Inhibitors: What Side Effects Should Patients Expect?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "CDK4/6 inhibitors are used for selected hormone receptor-positive, HER2-negative breast cancers. The three main medicines are palbociclib, ribociclib and abemaciclib. Although they belong to the same general class, their side-effect profiles are not identical.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Common problems can include low blood counts, fatigue, nausea, diarrhea, mouth sores and headache. Some can also cause liver abnormalities. Rarely, serious lung inflammation can occur.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Are Blood Tests Important During Targeted Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Blood tests are not simply routine paperwork. They allow the oncology team to see how your body is responding to treatment. Depending on the drug, doctors may monitor white blood cells, hemoglobin, platelets, liver enzymes, kidney function, blood sugar, cholesterol and other relevant laboratory values.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact tests depend on the medicine. For example, some PI3K-targeted medicines can raise blood glucose, while everolimus can affect blood sugar and blood lipids.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Targeted Therapy Cause Hair Loss or Weight Changes?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hair changes depend on the medicine. Some targeted treatments cause hair thinning or hair changes. Others have little effect on hair. This is different from the generalized hair loss commonly associated with several [chemotherapy](" + CHEMO + ") regimens. If hair changes are important to you, ask the oncologist about the specific medicine rather than assuming all targeted treatments behave in the same way.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Weight changes are not a universal side effect. They can occur indirectly because of appetite changes, diarrhea, reduced activity, nausea, fluid retention with some treatments, or other cancer medicines being given at the same time. A sudden or unexplained weight change should be discussed with your doctor.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Do Targeted Therapy Side Effects Last?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single timeline. Some side effects begin within days or weeks of starting treatment. Others develop later. Many side effects improve when treatment is completed and the body recovers, but the time required varies considerably between medicines and individuals. Some serious complications can require longer monitoring even after the medicine has been stopped.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Targeted Therapy Be Stopped Because of Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Sometimes treatment needs to be paused, reduced or changed. But this is a medical decision. If a side effect becomes difficult, the first step should generally be to contact the treating oncology team rather than simply skipping doses. Depending on the drug and the problem, doctors may consider supportive medicines, temporary treatment interruption, dose adjustment, changing treatment or additional monitoring.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Symptoms Should Be Reported Immediately?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "New breathing difficulty",
      "Persistent or severe cough",
      "Chest pain",
      "Significant leg swelling",
      "Severe diarrhea",
      "High fever or severe chills",
      "Unusual bleeding",
      "Yellow skin or eyes",
      "Severe rash",
      "Swelling of the face or throat",
      "Confusion or fainting",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Do not wait for the next scheduled appointment if you develop concerning symptoms. For severe breathing difficulty, chest pain or another medical emergency, seek emergency care immediately.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Targeted Therapy vs Chemotherapy: Are the Side Effects the Same?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Treatment | Typical concerns depend on the drug |\n| --- | --- |\n| Chemotherapy | Hair loss, nausea, low blood counts, neuropathy, fatigue and other systemic effects |\n| HER2-targeted therapy | Heart function, infusion reactions, diarrhea and, with certain drugs, lung toxicity |\n| CDK4/6 inhibitors | Low blood counts, fatigue, diarrhea and liver abnormalities |\n| PARP inhibitors | Nausea, fatigue, anemia and other blood-count changes |\n| PI3K/AKT pathway drugs | Diarrhea, rash, blood-sugar changes and liver abnormalities |\n| Antibody-drug conjugates | Nausea, fatigue, blood-count changes and drug-specific toxicities |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The table is a broad guide rather than a prediction of what one patient will experience. Both treatments can cause fatigue and nausea, but their side-effect patterns are different.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Targeted Therapy Be Given With Chemotherapy, Before Surgery or After Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Some targeted medicines are specifically used in combination with [chemotherapy](${CHEMO_COST}). HER2-positive breast cancer is a common example. Other targeted treatments may be combined with [hormone therapy](${HORMONE_COST}) rather than chemotherapy. The combination depends on subtype, [stage](${BY_STAGE}), biomarker results, previous treatment and whether the cancer is newly diagnosed, recurrent or metastatic.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Certain targeted therapies may be incorporated into neoadjuvant treatment before surgery. For HER2-positive breast cancer, targeted treatment may be combined with chemotherapy before surgery in appropriate patients. Some targeted treatments are also used after surgery to reduce the risk of recurrence. For example, trastuzumab is commonly used as part of treatment for HER2-positive early breast cancer, with the overall treatment duration depending on the clinical situation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In advanced or metastatic breast cancer, targeted therapy is generally aimed at controlling the disease, relieving symptoms and helping patients maintain quality of life for as long as possible. Treatment can continue as long as it remains effective and the side effects are acceptable.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a targeted-therapy monitoring plan",
    href: consult("Targeted Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send a case-specific quotation for breast cancer targeted therapy and monitoring in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Targeted Therapy for International Patients in India",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/targeted-therapy-side-effects-followup-visual.webp",
    alt: "International patient reviewing targeted-therapy records and recovery plan with an oncologist in India",
    caption: "If a targeted drug has already been started in another country, bring the exact generic name, dose and treatment schedule. Brand names can differ between countries.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For an international patient, targeted therapy requires more planning than simply arranging a hospital appointment. The Indian oncology team will usually need to review the complete cancer record. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Important documents include the biopsy and histopathology reports, ER and PR results, HER2 testing, FISH testing where relevant, Ki-67 where reported, molecular or genetic test results, previous chemotherapy and targeted therapy, previous surgery, radiation records, current medicines, recent blood-test results and recent imaging.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm stay length and laboratory schedules.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and previous targeted-therapy records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Pathology Review Matters Before Targeted Therapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Targeted therapy should not be selected simply because someone has been diagnosed with breast cancer. The target has to be demonstrated or otherwise clinically established according to the treatment being considered. HER2-directed therapy is intended for cancers with the appropriate HER2 status. Similarly, certain targeted medicines require specific genetic or molecular findings. If an international patient brings pathology from another country, the Indian cancer centre may recommend a pathology review or additional testing before finalizing treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Targeted Therapy Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single price for "targeted therapy." The cost depends on the medicine, dose, the patient's body size or treatment requirements, frequency of administration, treatment duration, combination with [chemotherapy](${CHEMO_COST}) or [hormone therapy](${HORMONE_COST}), hospital and infusion charges, required laboratory monitoring, imaging and other follow-up. Some targeted medicines are oral tablets, while others are given by intravenous infusion.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A reliable quotation should be based on the specific drug and treatment protocol rather than a generic breast cancer price. See [Targeted Therapy Cost in India](${TARGETED_COST}), [chemotherapy doctors](${CHEMO_DOCTORS}) and [immunotherapy cost](${IMMUNO_COST}) when those pathways are also being considered.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Can Patients Make Targeted Therapy Easier?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Keep a symptom diary with the date, medicine taken, symptoms, severity, temperature when relevant, bowel changes and any new medication. Maintain one digital and one physical copy of pathology, blood tests, imaging, treatment summaries, prescriptions and the medication list.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If you are receiving treatment in India as an international patient, make sure you know how to reach the hospital oncology team outside normal clinic hours. Even common medicines and supplements can interact with cancer treatment — tell your oncologist or pharmacist before starting anything new.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist Before Starting Targeted Therapy",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "What target does my treatment address?",
      "Is my cancer HER2-positive? Are additional molecular tests required?",
      "Is the treatment being given before or after surgery?",
      "What is the generic name? Is it an infusion or tablet?",
      "How frequently will I receive it, and how long is treatment expected to continue?",
      "Do I need an echocardiogram? How often will blood tests be performed?",
      "Do I need liver-function testing or other medicine-specific tests?",
      "Which symptoms should I expect, and which require an immediate call?",
      "What should I do if I develop diarrhea or fever?",
      "What happens if my blood counts fall?",
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
    text: "Is targeted therapy safer than chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is not accurate to describe targeted therapy as universally safer. Its side effects are different and depend strongly on the medicine. Some targeted therapies have relatively manageable side effects, while others can cause serious complications.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does trastuzumab damage the heart?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Trastuzumab can affect heart function in some patients. This is why heart function is assessed before and during treatment in appropriate patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can heart function recover after trastuzumab?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In many cases, treatment-related decreases in heart function improve after treatment is interrupted or stopped, although serious heart problems can occur in some patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does targeted therapy cause nausea?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted medicines can cause nausea or vomiting, but the likelihood varies by drug.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does targeted therapy cause diarrhea?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Diarrhea is an important side effect of several targeted medicines, including some HER2-targeted and pathway-targeted drugs.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy cause liver damage?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted medicines can affect liver function. Blood tests may therefore be performed regularly during treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy cause low white blood cells?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. CDK4/6 inhibitors and some other targeted medicines can reduce blood-cell counts, including white blood cells.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy cause hair loss?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some targeted drugs can cause hair thinning or hair loss, but this varies considerably between medicines.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy be taken as tablets?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some targeted treatments are oral medicines, while others are administered intravenously or by injection.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How long does targeted therapy continue?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal duration. Some treatments are given for a defined period in early breast cancer, while treatment for advanced disease may continue as long as it remains effective and tolerable.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy cure HER2-positive breast cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In early-stage breast cancer, HER2-targeted treatment is an important component of therapy and can substantially improve outcomes for appropriate patients. Whether an individual patient can be cured depends on the stage, tumour characteristics and response to the complete treatment plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can targeted therapy be combined with hormone therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Certain targeted treatments are specifically used together with endocrine therapy in hormone receptor-positive, HER2-negative breast cancer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Targeted Therapy Side Effects: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Targeted therapy is not one treatment and it does not have one standard set of side effects. The experience of a patient receiving trastuzumab can be very different from someone taking a CDK4/6 inhibitor, PARP inhibitor or another targeted medicine.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most important thing is to know which drug you are receiving and what that particular drug needs to be monitored for. For HER2-targeted treatment, heart monitoring can be particularly important. For some oral targeted medicines, blood counts, liver function, blood sugar or bowel symptoms may need closer attention. And for certain drugs, new respiratory symptoms require prompt assessment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For international patients travelling to India, treatment planning should begin with a complete review of the pathology and previous treatment records. Once the cancer subtype, biomarkers and previous therapies are clear, the oncology team can determine whether targeted therapy is appropriate, which medicine is suitable and what monitoring will be required.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer targeted therapy and monitoring in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [HER2-Positive Breast Cancer Treatment](${HER2})\n- [ER, PR and HER2 results](${BIOMARKERS})\n- [Breast Cancer Diagnosis](${DIAGNOSIS})\n- [Hormone therapy](${HORMONE})\n- [Chemotherapy](${CHEMO})\n- [Treatment cost in India](${COST})\n- [Treatment for international patients](${INTL})\n- [Targeted therapy doctors](${TARGETED_DOCTORS}) · [cost](${TARGETED_COST})\n- [Hormone therapy doctors](${HORMONE_DOCTORS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS})`,
  },
];

const now = "2026-09-27T21:00:00.000Z";
const SLUG = "breast-cancer-targeted-therapy-side-effects";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_targeted_therapy_side_effects",
  slug: SLUG,
  title: "Breast Cancer Targeted Therapy Side Effects: HER2 Treatment, Monitoring and Recovery in India",
  excerpt:
    "How HER2-targeted medicines, CDK4/6 inhibitors and other targeted drugs differ in side effects, why heart and blood-test monitoring matter, and how international patients plan treatment in India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "targeted therapy", "HER2", "side effects", "India", "travel"],
  image: "/uploads/articles/targeted-therapy-side-effects-infusion-visual.webp",
  imageAlt: "Breast cancer targeted therapy and HER2 treatment side effects and monitoring",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Targeted Therapy Side Effects: HER2 Treatment & Monitoring",
  seoDescription:
    "Learn about targeted therapy side effects for breast cancer, including HER2 treatment, heart monitoring, diarrhea, liver problems and recovery in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/targeted-therapy-side-effects-infusion-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer targeted therapy side effects",
    "targeted therapy side effects breast cancer",
    "HER2 targeted therapy side effects",
    "trastuzumab side effects breast cancer",
    "targeted therapy for HER2 positive breast cancer",
    "breast cancer targeted therapy heart problems",
    "targeted therapy diarrhea breast cancer",
    "targeted therapy liver problems",
    "CDK4/6 inhibitor side effects",
    "breast cancer targeted therapy cost in India",
    "targeted therapy for breast cancer in India",
    "HER2 treatment side effects",
    "breast cancer targeted treatment recovery",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "HER2-Positive Breast Cancer", href: HER2 },
    { label: "Targeted therapy cost", href: TARGETED_COST },
    { label: "Targeted therapy doctors", href: TARGETED_DOCTORS },
    { label: "Hormone therapy", href: HORMONE },
    { label: "Chemotherapy", href: CHEMO },
    { label: "Diagnosis and HER2 testing", href: DIAGNOSIS },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  {
    id: "media_ttse_infusion",
    url: "/uploads/articles/targeted-therapy-side-effects-infusion-visual.webp",
    name: "targeted-therapy-side-effects-infusion-visual.webp",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_ttse_heart",
    url: "/uploads/articles/targeted-therapy-side-effects-heart-visual.webp",
    name: "targeted-therapy-side-effects-heart-visual.webp",
    alt: "Echocardiogram heart-function monitoring during HER2-targeted treatment",
    addedAt: now,
  },
  {
    id: "media_ttse_blood",
    url: "/uploads/articles/targeted-therapy-side-effects-blood-visual.webp",
    name: "targeted-therapy-side-effects-blood-visual.webp",
    alt: "Blood-test monitoring during targeted therapy",
    addedAt: now,
  },
  {
    id: "media_ttse_followup",
    url: "/uploads/articles/targeted-therapy-side-effects-followup-visual.webp",
    name: "targeted-therapy-side-effects-followup-visual.webp",
    alt: "Follow-up consultation for targeted-therapy recovery",
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
  "art_hormone_therapy_breast_cancer_india",
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  "art_er_pr_her2_breast_cancer_treatment_india",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_treatment_india_international_patients",
];
for (const siblingId of siblingIds) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, {
      label: "Targeted Therapy Side Effects",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
