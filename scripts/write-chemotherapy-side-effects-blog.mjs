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
const TARGETED_SE = "/blogs/breast-cancer-targeted-therapy-side-effects";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the most common chemotherapy side effects in breast cancer?</strong> Common side effects include fatigue, hair loss, nausea, vomiting, mouth sores, appetite changes, diarrhea or constipation, low blood counts and increased infection risk. Not everyone experiences all of them.</p><p class="article-quick-answer__body"><strong>Does breast cancer chemotherapy always cause hair loss?</strong> No. Hair loss depends on the chemotherapy drugs and doses used. Some regimens cause substantial hair loss, while others may cause less.</p><p class="article-quick-answer__body"><strong>Does chemotherapy always cause nausea?</strong> No. Modern anti-nausea medicines can prevent or reduce nausea for many patients, and the likelihood of nausea varies between chemotherapy regimens.</p><p class="article-quick-answer__body"><strong>Why does chemotherapy cause fatigue?</strong> Fatigue can result from the treatment itself and from problems such as anemia, reduced blood counts, poor sleep, reduced nutrition or the overall physical and emotional demands of cancer treatment.</p><p class="article-quick-answer__body"><strong>Can chemotherapy cause low white blood cells?</strong> Yes. Chemotherapy can temporarily reduce blood-forming cells in the bone marrow, which can lower white blood-cell counts and increase infection risk.</p><p class="article-quick-answer__body"><strong>Can breast cancer chemotherapy cause nerve damage?</strong> Some chemotherapy drugs, particularly taxanes and certain platinum drugs, can cause peripheral neuropathy, resulting in numbness, tingling, burning or weakness in the hands and feet.</p><p class="article-quick-answer__body"><strong>Can chemotherapy affect fertility?</strong> Yes. Some chemotherapy can affect ovarian function and fertility. If having children in the future matters to you, discuss fertility preservation before treatment begins whenever possible.</p><p class="article-quick-answer__body"><strong>Can chemotherapy cause early menopause?</strong> It can. Menstrual periods may become irregular or stop temporarily or permanently, depending on factors such as age and the chemotherapy regimen.</p><p class="article-quick-answer__body"><strong>How long does chemotherapy for breast cancer usually last?</strong> Adjuvant or neoadjuvant chemotherapy is often given over about 3–6 months, but the actual duration depends on the regimen and individual treatment plan.</p><p class="article-quick-answer__body"><strong>Do chemotherapy side effects disappear after treatment?</strong> Many short-term side effects improve after treatment ends, but some can take longer to recover from. A few, such as certain types of nerve damage or heart effects, can persist or appear later.</p><p class="article-quick-answer__body"><strong>Can chemotherapy be given in India?</strong> Yes. Chemotherapy for breast cancer is routinely administered in Indian cancer centers, usually through an oncology day-care or infusion facility, depending on the treatment regimen.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy is still an important part of breast cancer treatment for many patients, but not everyone with breast cancer needs it. When it is recommended, one of the first questions is not about the medicine itself. It is about what life will feel like during treatment. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [chemotherapy explainer](${CHEMO}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about your chemotherapy regimen",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology](${wa("Please review my breast cancer records and advise on chemotherapy side effects and recovery in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
    alt: "Breast cancer chemotherapy side effects including hair loss nausea fatigue neuropathy and recovery",
    caption: "Knowing what to expect can make chemotherapy less frightening and help you recognise when a symptom needs medical attention.",
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
    text: "Chemotherapy uses medicines that kill cancer cells or stop them from dividing. Unlike surgery or radiation, chemotherapy is a systemic treatment. The medicines travel through the bloodstream and can reach cancer cells throughout the body. This is useful because breast cancer cells can sometimes exist outside the original tumour even when they cannot be seen on scans. Chemotherapy also affects some healthy cells that divide quickly. That is the main reason side effects occur.",
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
    text: "Does Everyone With Breast Cancer Need Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `No. Some early-stage breast cancers have a sufficiently low expected benefit from chemotherapy that it may not be recommended. Doctors consider [stage](${BY_STAGE}), tumour size, grade, lymph-node involvement, [ER, PR and HER2](${BIOMARKERS}), subtype, age, overall health and genomic tests such as Oncotype DX and MammaPrint when appropriate. Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm whether chemotherapy is needed.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Chemotherapy Used?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before surgery (neoadjuvant chemotherapy) it can shrink the tumour and may make [breast-conserving surgery](${SURGERY}) possible in selected patients. After surgery (adjuvant chemotherapy) the aim is to destroy remaining cancer cells and reduce recurrence risk. For metastatic breast cancer, the strategy depends on subtype, previous treatments and how the disease responds.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Does Chemotherapy Cause Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy targets cells that divide quickly. Cancer cells often divide rapidly, but some healthy cells do too — including cells in hair follicles, bone marrow, mouth, digestive tract and reproductive organs. Side effects are not a measure of whether chemotherapy is working. A person can have significant side effects without getting more benefit from treatment. Another person can have very few side effects and still respond well.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "1. Hair Loss During Breast Cancer Chemotherapy",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-fatigue-visual.webp",
    alt: "Fatigue and hair-care support during breast cancer chemotherapy",
    caption: "Hair loss depends on the drugs and doses. In most patients, hair begins to grow back after chemotherapy finishes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hair loss is one of the side effects patients worry about most. Some chemotherapy regimens cause substantial hair loss. Others cause much less. Hair loss can affect scalp hair, eyebrows, eyelashes and body hair. Whether it happens depends on the particular chemotherapy medicines and doses.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "When Does Chemotherapy Hair Loss Start?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hair loss usually does not begin immediately after the first infusion. For regimens that cause significant hair loss, it often becomes noticeable during the early part of treatment. The hair may become thinner, shed gradually or fall out in larger amounts. Some people choose to cut their hair short before treatment because it makes the transition easier. Others prefer to wait. There is no medically correct choice.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does Hair Grow Back After Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In most patients, hair begins to grow back after chemotherapy finishes. The timing varies. The new hair can sometimes look different at first. It may be curly, thicker or thinner, a different texture or a slightly different colour. This temporary change is sometimes called \"chemo curls.\" For a small number of people, hair thinning can persist longer depending on the chemotherapy received.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can a Cold Cap Reduce Hair Loss?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some cancer centres offer scalp cooling. The scalp is cooled during chemotherapy to reduce blood flow to the hair follicles and potentially reduce chemotherapy exposure to them. It does not work equally well for every chemotherapy regimen or every patient. Availability also differs between hospitals. If preserving hair is important to you, ask the oncology centre whether scalp cooling is available and appropriate for your treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "2. Nausea and Vomiting",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Nausea is another common concern. Chemotherapy does not automatically mean that you will spend your treatment days vomiting. Modern oncology uses anti-nausea medicines before and after chemotherapy to prevent or control nausea. The risk depends on the particular chemotherapy regimen. Some patients have little nausea. Others may experience nausea for several days after treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Why Does Chemotherapy Cause Nausea?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can stimulate areas of the nervous system involved in vomiting and can also affect the digestive tract. The emotional experience of receiving chemotherapy can contribute as well. This is why nausea management often starts before the chemotherapy infusion, rather than waiting until the patient becomes sick.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Can Help With Chemotherapy Nausea?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Your oncology team may prescribe antiemetic medicines. Other practical measures can include eating smaller meals, drinking fluids regularly, avoiding strong food smells, eating bland foods when necessary, keeping easily tolerated snacks available and taking prescribed anti-nausea medicine on schedule. If vomiting continues despite medication, contact your cancer team. Dehydration can become a serious problem.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "3. Chemotherapy Fatigue",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is one of the most common chemotherapy side effects. It is not always the same as ordinary tiredness. You may feel as though even simple activities require much more effort. Fatigue can be related to chemotherapy, anemia, low blood counts, poor sleep, reduced food intake, pain, emotional stress, infection or other medications.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Exercise Help Chemotherapy Fatigue?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For many patients, gentle physical activity can be useful. Walking is often a practical option. You may need to reduce the intensity and duration compared with what you did before treatment. The goal is not to push through severe exhaustion. Instead, work with your medical team to find a level of activity that is safe and manageable.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "4. Low White Blood Cells and Infection Risk",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-blood-visual.webp",
    alt: "Blood-count monitoring during breast cancer chemotherapy",
    caption: "Chemotherapy can temporarily suppress bone-marrow activity. A fever during treatment can be an emergency.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can temporarily suppress bone-marrow activity. This can lower the number of white blood cells, including neutrophils. When the white blood-cell count becomes low, the body may have more difficulty fighting infections. Your oncology team will monitor blood counts during treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Is Neutropenia?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Neutropenia means that the number of neutrophils in the blood is lower than normal. Neutrophils are an important part of the immune system. The degree of neutropenia can affect infection risk and may influence whether the next chemotherapy cycle can proceed as planned. Some patients may receive medicines such as growth factors to help reduce the duration or severity of low white-cell counts, depending on their treatment regimen and risk.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Should I Do If I Develop a Fever During Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A fever during chemotherapy can be an emergency. Your oncology team should give you a specific temperature threshold and instructions for when to call. Do not simply take a fever-reducing medicine and wait if your oncology team has instructed you to seek urgent assessment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "5. Anemia During Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can reduce red blood-cell production. This can lead to anemia. Symptoms may include fatigue, weakness, shortness of breath during activity, dizziness and reduced exercise tolerance. Your blood counts will usually be monitored throughout treatment. The treatment depends on the severity and underlying cause.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "6. Low Platelets and Bleeding",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy regimens can reduce platelet counts. Platelets help the blood clot. A low platelet count may increase the tendency to bruise, bleed, develop nosebleeds or bleed from the gums. If you notice unexplained bleeding or extensive bruising, inform your oncology team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "7. Mouth Sores",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines can affect the cells lining the mouth. This can result in mouth ulcers, soreness, difficulty eating, difficulty swallowing and changes in taste. Good oral hygiene and early treatment can make these problems easier to manage. Your cancer team may recommend specific mouth rinses or other treatments.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "8. Changes in Taste and Appetite",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Food can taste different during chemotherapy. Some patients describe a metallic taste, reduced taste, foods tasting unusually bitter or reduced appetite. There is no need to force yourself to eat large meals. Smaller meals throughout the day can sometimes be easier. If weight loss is significant, ask for help from a dietitian experienced in cancer care.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "9. Constipation and Diarrhea",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can affect the digestive system. Some patients develop diarrhea. Others become constipated. Medications used alongside chemotherapy — particularly some anti-nausea medicines and pain medicines — can also affect bowel movements. Tell your treatment team if bowel changes are persistent or severe.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "10. Peripheral Neuropathy",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-neuropathy-visual.webp",
    alt: "Hand and fingertip assessment for chemotherapy neuropathy",
    caption: "Taxanes such as paclitaxel and docetaxel can cause numbness, tingling or burning in the hands and feet.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is one of the side effects patients often underestimate. Certain chemotherapy medicines, particularly taxanes such as paclitaxel and docetaxel, can affect peripheral nerves. You may notice tingling, numbness, burning, pins-and-needles sensations, increased sensitivity, pain or weakness. The symptoms often begin in the fingers or toes.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Chemotherapy Neuropathy Go Away?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Often, symptoms improve after treatment ends. But recovery can take time. For some people, nerve symptoms can persist for months or longer. In certain cases, nerve damage can be permanent. This is why it is important to tell your oncologist about neuropathy early. Your doctor may need to adjust the chemotherapy dose or schedule depending on the severity.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "11. Nail and Skin Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can cause brittle nails, nail discoloration, nail ridges, dry skin, skin pigmentation changes or rash. The specific effects depend on the chemotherapy medicine. Most changes improve after treatment, although nails can take time to grow out.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "12. Hand-Foot Syndrome",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some chemotherapy medicines can cause hand-foot syndrome. Early symptoms may include tingling, redness, burning or sensitivity. As it becomes more severe, the palms or soles can become painful, swollen or blistered. Some patients develop peeling or open areas. Tell your oncology team as soon as these symptoms begin because early intervention can prevent them from becoming more severe.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "13. Menstrual Changes and Menopause",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can affect ovarian function. For women who were menstruating before treatment, periods may become irregular, less frequent, temporarily absent or permanently absent. The likelihood of permanent menopause depends partly on age and the specific treatment. Younger patients may regain ovarian function after treatment, but this cannot be guaranteed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Chemotherapy Cause Infertility?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some chemotherapy can damage ovarian function and reduce fertility. The effect can be temporary or permanent. Age is an important factor, but the chemotherapy regimen also matters. If you may want children in the future, talk to your oncology team before chemotherapy begins. Fertility preservation can sometimes be arranged before treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Fertility Preservation Options Are Available?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on your circumstances, options may include egg freezing, embryo freezing, a fertility consultation or other fertility-preservation approaches. The appropriate option depends on your age, ovarian reserve, treatment urgency and personal circumstances. The important point is timing. Do not wait until chemotherapy has already started to raise the subject.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I Become Pregnant After Breast Cancer Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Many women can become pregnant after breast cancer treatment. However, the appropriate timing depends on the type of breast cancer and treatment. Patients receiving long-term [hormone therapy](${HT_SE}) may need to complete or temporarily interrupt treatment under medical supervision before attempting pregnancy. Pregnancy planning should therefore involve the oncology and fertility teams.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "14. Sexual Health Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Cancer treatment can affect sexual health in ways patients do not always expect. Possible issues include vaginal dryness, reduced sexual desire, menopausal symptoms, fatigue, changes in body image, and pain or discomfort. These concerns are legitimate medical issues. If you are experiencing them, tell your doctor. There may be ways to manage individual symptoms.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about fertility timing before chemotherapy",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about fertility and recovery](${wa("Please advise on fertility preservation and chemotherapy side-effect management for breast cancer in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "15. \"Chemo Brain\" and Concentration Problems",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients describe problems with concentration, memory, finding words, multitasking or mental clarity. This is commonly referred to as \"chemo brain.\" The experience is real, but it is not always possible to attribute every cognitive symptom directly to chemotherapy. Sleep problems, stress, fatigue, menopause and other factors can also affect concentration. If these problems interfere with work or daily life, mention them to your treatment team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "16. Heart-Related Side Effects",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Certain chemotherapy medicines can affect the heart. One example is the anthracycline group, which includes doxorubicin. The risk is not the same for everyone. It can depend on cumulative drug dose, other heart-affecting treatments, existing heart disease, high blood pressure, diabetes and other cardiovascular risk factors. For patients receiving treatments that can affect cardiac function, doctors may perform an echocardiogram or another assessment before and sometimes during treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "17. Can Chemotherapy Cause Long-Term Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Many chemotherapy side effects are temporary. But some can persist. Possible long-term effects include peripheral neuropathy, fertility problems, heart problems, persistent fatigue, cognitive difficulties and, rarely, certain second cancers. The risk depends on the drugs and doses used. Not every patient develops long-term complications.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does It Take to Recover From Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single recovery timeline. Different side effects recover at different speeds. Hair generally begins growing back after treatment, although the texture may initially be different. Blood counts often recover between treatment cycles or after treatment finishes. Fatigue may improve gradually over weeks or longer. Nerve symptoms can take considerably longer to improve and may sometimes persist. Ovarian function may recover in some women but not in others. This is why \"recovery after chemotherapy\" is not one specific date.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Cycles, Dose Changes and When to Call",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy is usually given in cycles: a treatment period followed by a rest period. A regimen might be given every two or three weeks. Before each cycle, doctors may check blood counts, kidney and liver function, symptoms and side effects. If toxicity is severe, they may give supportive medicines, change the dose, delay a cycle, substitute another medicine or stop a particular drug.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Contact your cancer team for fever, severe chills, difficulty breathing, uncontrolled vomiting, severe or persistent diarrhea, significant bleeding, unexplained bruising, severe weakness, confusion, severe allergic symptoms, or pain or redness around an infusion or catheter site. If you have severe breathing difficulty or another medical emergency, seek emergency care immediately.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Work, Exercise and Eating During Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some people continue working; others need reduced hours. It depends on the regimen, side effects and type of work. For many patients, walking, stretching and appropriately supervised exercise can help, but rest may be more appropriate when blood counts are low. There is no single chemotherapy diet. The usual goal is adequate nutrition, hydration and body weight. If you are losing significant weight, ask for a cancer dietitian.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Know?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy is usually not a single hospital visit. Before travelling, consider how many cycles are planned, how long you will need to remain in India, whether some cycles can be given at home, who will manage complications, and how emergency care will be arranged. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bring pathology, biopsy and surgical reports, ER, PR, HER2, Ki-67, genomic tests if performed, mammogram, ultrasound, MRI, CT or PET-CT files, previous surgery, chemotherapy, radiation and targeted-therapy records, and the current medication list. If you have already started chemotherapy, bring exact drug names, doses, dates, number of cycles, side effects and blood-test results.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Day-care units in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm cycle timing.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and current chemotherapy records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Chemotherapy Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single chemotherapy price. Cost depends on the medicines, number of cycles and whether [targeted therapy](${TARGETED_SE}) or immunotherapy is combined. Other costs may include consultation, blood tests, imaging, day-care charges, supportive medicines, port placement and hospitalization if complications occur. See [Chemotherapy Cost in India](${CHEMO_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy vs Targeted Therapy and Immunotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy generally affects rapidly dividing cells. [Targeted therapy](${TARGETED_SE}) acts on particular molecules or pathways. Some patients receive both — for example, [HER2-positive breast cancer](${HER2}) may be treated with chemotherapy plus HER2-targeted therapy. Immunotherapy helps the immune system recognise or attack cancer and is used in selected breast cancers, including certain triple-negative cases.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Does chemotherapy always cause hair loss?", "No. Hair loss depends on the drugs and doses used. Some breast cancer chemotherapy regimens cause substantial hair loss, while others have less effect on hair."],
    ["Will I vomit after chemotherapy?", "Not necessarily. Anti-nausea medicines are routinely used, and the likelihood of nausea depends on the specific regimen."],
    ["Can chemotherapy cause infertility?", "Yes. Some chemotherapy can affect ovarian function and fertility. If future pregnancy is important, discuss fertility preservation before treatment."],
    ["Can chemotherapy cause early menopause?", "Yes. Periods may become irregular or stop temporarily or permanently depending on age and treatment."],
    ["Can chemotherapy damage nerves?", "Yes. Certain medicines, particularly taxanes and some platinum drugs, can cause peripheral neuropathy."],
    ["Does chemotherapy weaken the immune system?", "Chemotherapy can lower white blood-cell counts, including neutrophils, which can increase infection risk."],
    ["Can I exercise during chemotherapy?", "Many patients can remain physically active at an appropriate level, but intensity should reflect your blood counts, symptoms and overall health."],
    ["Can I work during chemotherapy?", "Some patients continue working, while others need reduced hours or time away. The answer depends on the treatment and how you respond."],
    ["How long do breast cancer chemotherapy side effects last?", "Many short-term side effects improve after treatment ends, but some — particularly neuropathy, fertility effects or certain organ-related effects — can last longer."],
    ["Can chemotherapy cause heart problems?", "Certain chemotherapy medicines can affect the heart. Patients receiving these drugs may have heart function assessed before and sometimes during treatment."],
    ["How many chemotherapy cycles will I need?", "There is no universal number. The regimen, cancer subtype, stage and treatment response determine the schedule."],
    ["Can breast cancer chemotherapy be given in India?", "Yes. Chemotherapy is widely provided at cancer centres in India through oncology day-care and infusion facilities."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy Side Effects: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can be an important part of breast cancer treatment, but it is not required for everyone. When it is recommended, the plan is selected according to stage, biology, lymph-node status, biomarkers and other individual factors. You may not experience every listed side effect.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ask your oncologist which drugs you will receive, how many cycles are planned, which side effects are most likely, which symptoms require an urgent call, whether treatment could affect fertility, whether you need heart monitoring, and how long you should expect to stay in India if you are travelling. Supportive medicines and careful monitoring can make many side effects manageable. If something does not feel right, tell your cancer team early.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan chemotherapy, side-effect support and recovery for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Chemotherapy for Breast Cancer](${CHEMO})\n- [Targeted therapy side effects](${TARGETED_SE})\n- [Hormone therapy side effects](${HT_SE})\n- [HER2-positive treatment](${HER2})\n- [Diagnosis](${DIAGNOSIS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST})\n- [Targeted therapy doctors](${TARGETED_DOCTORS})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS})\n- [Hormone therapy doctors](${HORMONE_DOCTORS})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Reconstruction doctors](${RECON_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T22:00:00.000Z";
const SLUG = "breast-cancer-chemotherapy-side-effects";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_chemotherapy_side_effects",
  slug: SLUG,
  title: "Breast Cancer Chemotherapy Side Effects: Hair Loss, Nausea, Neuropathy, Fertility and Recovery in India",
  excerpt:
    "What hair loss, nausea, fatigue, neuropathy, infection risk and fertility changes can look like during breast cancer chemotherapy — and how international patients plan cycles in India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "chemotherapy", "side effects", "fertility", "India", "travel"],
  image: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
  imageAlt: "Breast cancer chemotherapy side effects including hair loss nausea fatigue neuropathy and recovery",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Chemotherapy Side Effects: Hair Loss, Nausea & Recovery",
  seoDescription:
    "Learn about breast cancer chemotherapy side effects, including hair loss, nausea, fatigue, neuropathy, fertility problems, infection risk and recovery in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer chemotherapy side effects",
    "chemotherapy side effects breast cancer",
    "breast cancer chemotherapy side effects in India",
    "chemotherapy hair loss breast cancer",
    "chemotherapy nausea breast cancer",
    "chemotherapy fatigue breast cancer",
    "chemotherapy neuropathy breast cancer",
    "chemotherapy fertility breast cancer",
    "chemotherapy menopause breast cancer",
    "chemotherapy infection risk",
    "chemotherapy low white blood cells",
    "breast cancer chemotherapy recovery",
    "chemotherapy cycles for breast cancer",
    "chemotherapy treatment in India",
    "breast cancer chemotherapy cost in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Chemotherapy for Breast Cancer", href: CHEMO },
    { label: "Chemotherapy cost", href: CHEMO_COST },
    { label: "Chemotherapy doctors", href: CHEMO_DOCTORS },
    { label: "Hormone therapy side effects", href: HT_SE },
    { label: "Targeted therapy side effects", href: TARGETED_SE },
    { label: "International patients", href: INTL },
    { label: "Diagnosis", href: DIAGNOSIS },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  { id: "media_cse_infusion", url: "/uploads/articles/chemo-side-effects-infusion-visual.webp", name: "chemo-side-effects-infusion-visual.webp", alt: article.imageAlt, addedAt: now },
  { id: "media_cse_fatigue", url: "/uploads/articles/chemo-side-effects-fatigue-visual.webp", name: "chemo-side-effects-fatigue-visual.webp", alt: "Fatigue and hair-care support during chemotherapy", addedAt: now },
  { id: "media_cse_neuropathy", url: "/uploads/articles/chemo-side-effects-neuropathy-visual.webp", name: "chemo-side-effects-neuropathy-visual.webp", alt: "Neuropathy assessment during chemotherapy", addedAt: now },
  { id: "media_cse_blood", url: "/uploads/articles/chemo-side-effects-blood-visual.webp", name: "chemo-side-effects-blood-visual.webp", alt: "Blood-count monitoring during chemotherapy", addedAt: now },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_breast_cancer_hormone_therapy_side_effects",
  "art_breast_cancer_targeted_therapy_side_effects",
  "art_her2_positive_breast_cancer_treatment_india",
  "art_breast_cancer_treatment_india_international_patients",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Chemotherapy Side Effects", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
