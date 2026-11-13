#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "life-after-breast-cancer-treatment";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-after-treatment";
const FOLLOW_OLD = "/blogs/breast-cancer-follow-up-tests";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_ALT = "/blogs/breast-cancer-radiation-therapy-in-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const CHEMO_ALT = "/blogs/breast-cancer-chemotherapy-in-india";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_ALT = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const META = "/blogs/metastatic-breast-cancer-stage-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PREG = "/blogs/breast-cancer-during-pregnancy-breastfeeding-treatment-india";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const RAD_SE = "/blogs/breast-cancer-radiation-side-effects";
const CHEMO_SE = "/blogs/breast-cancer-chemotherapy-side-effects";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const LUMP_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const IMG1 = "/uploads/articles/life-after-breast-cancer-overview.webp";
const IMG2 = "/uploads/articles/life-after-breast-cancer-diet.webp";
const IMG3 = "/uploads/articles/life-after-breast-cancer-exercise.webp";
const IMG4 = "/uploads/articles/life-after-breast-cancer-mental-health.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is survivorship?</strong></td><td>Recovery, long-term side-effect care and quality of life during and after breast cancer treatment</td></tr><tr><td><strong>Common challenges</strong></td><td>Fatigue, pain, lymphoedema, menopause symptoms, body-image changes and fear of recurrence</td></tr><tr><td><strong>Diet &amp; exercise</strong></td><td>Balanced sustainable eating; gradual activity (often aiming toward 150 minutes moderate activity weekly when safe)</td></tr><tr><td><strong>Follow-up</strong></td><td>Continue oncology review and appropriate mammography — see <a href="${FOLLOW}">follow-up after treatment</a></td></tr><tr><td><strong>Related care</strong></td><td><a href="${TX_BREAST}">Treatment in India</a> · <a href="${LYMPH}">lymphoedema</a> · <a href="${HT_ALT}">hormone therapy</a> · <a href="${RECUR}">recurrence</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Life after breast cancer treatment</strong> is gradual recovery with medical support — finishing treatment does not mean every side effect disappears immediately.</p></aside>`;

const effectsTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Possible effects after treatment</th></tr></thead><tbody><tr><td>Breast surgery</td><td>Pain, tightness, numbness, scar discomfort and changes in breast appearance</td></tr><tr><td>Mastectomy</td><td>Changes in body image, chest-wall sensation and shoulder movement</td></tr><tr><td>Chemotherapy</td><td>Fatigue, neuropathy, memory or concentration difficulties and menopause symptoms</td></tr><tr><td>Radiation therapy</td><td>Skin changes, breast firmness, swelling and occasional long-term tissue effects</td></tr><tr><td>Hormone therapy</td><td>Joint pain, hot flushes, vaginal dryness and bone-density changes</td></tr><tr><td>HER2-targeted therapy</td><td>Possible heart-function effects with certain medicines</td></tr><tr><td>Lymph-node surgery or radiation</td><td>Risk of lymphoedema and reduced shoulder mobility</td></tr></tbody></table></div>`;

const dietTable = `<div class="md-body"><table><thead><tr><th>Food group</th><th>Examples</th></tr></thead><tbody><tr><td>Vegetables</td><td>Spinach, carrots, beans, broccoli, cauliflower and gourds</td></tr><tr><td>Fruits</td><td>Apples, oranges, papaya, guava, berries and seasonal fruits</td></tr><tr><td>Whole grains</td><td>Oats, whole-wheat roti, brown rice and millets</td></tr><tr><td>Protein</td><td>Dal, chickpeas, beans, eggs, fish, chicken, paneer and yoghurt</td></tr><tr><td>Healthy fats</td><td>Nuts, seeds and suitable vegetable oils</td></tr><tr><td>Dairy or alternatives</td><td>Milk, curd, yoghurt or fortified alternatives</td></tr></tbody></table></div>`;

const warningTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What to do</th></tr></thead><tbody><tr><td>New lump in the breast or near the mastectomy scar</td><td>Arrange prompt medical assessment</td></tr><tr><td>New lump in the armpit or collarbone area</td><td>Contact the treating team</td></tr><tr><td>Persistent unexplained bone pain</td><td>Seek medical evaluation</td></tr><tr><td>New or worsening breathlessness</td><td>Arrange prompt assessment; emergency care if severe</td></tr><tr><td>Persistent unexplained cough</td><td>Discuss with the doctor</td></tr><tr><td>New severe headache or neurological symptoms</td><td>Seek urgent medical assessment</td></tr><tr><td>Sudden arm swelling with redness or fever</td><td>Seek prompt medical care</td></tr><tr><td>Sudden chest pain or severe breathlessness</td><td>Seek emergency care</td></tr><tr><td>Severe back pain with leg weakness or bladder problems</td><td>Seek emergency care immediately</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Survivorship relevance</th></tr></thead><tbody><tr><td><a href="${LUMP_COST}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving pathway; remaining breast needs ongoing surveillance care</td></tr><tr><td><a href="${MAST_COST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Chest-wall recovery, reconstruction choices and opposite-breast screening</td></tr><tr><td><a href="${CHEMO_COST}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Fatigue, neuropathy, fertility and selected cardiac review after treatment</td></tr><tr><td><a href="${HT_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Multi-year medicine review, menopause symptoms and bone-health monitoring</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Post-radiation tissue changes, shoulder mobility and late-effect review</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named treatment pathways — not invented rehab package prices. Physiotherapy, dietitian visits and follow-up fees vary by centre; request an itemised estimate for your survivorship plan.</p>`;

const faqs = [
  ["How long does it take to recover after breast cancer treatment?", "Recovery varies. Some patients resume many activities within a few months, while others experience fatigue, pain, menopause symptoms or emotional difficulties for longer. The type of treatment and individual health influence recovery."],
  ["Is it normal to feel tired months after chemotherapy?", "Yes, persistent fatigue can occur after chemotherapy. However, anaemia, sleep problems, thyroid disorders, depression and other conditions may also contribute. Discuss ongoing fatigue with your doctor."],
  ["Can breast cancer survivors live a normal life?", "Many patients return to work, travel, family responsibilities and everyday activities after treatment. Some may need continuing medicines, rehabilitation or long-term monitoring."],
  ["What should I eat after breast cancer treatment?", "Aim for a balanced diet containing vegetables, fruits, whole grains, legumes, nuts and adequate protein. There is no single food or diet that prevents recurrence."],
  ["Should breast cancer survivors avoid dairy products?", "There is no general requirement for all breast cancer survivors to avoid dairy. Milk, curd and other dairy products can be part of a balanced diet if tolerated and appropriate for the patient's health."],
  ["Is soy safe after breast cancer?", "Normal dietary soy foods are generally considered safe for most breast cancer survivors. Concentrated soy or isoflavone supplements should be discussed with the treating team."],
  ["Can exercise reduce fatigue after breast cancer treatment?", "Yes. Exercise is recommended for many cancer survivors and can help reduce fatigue and improve physical function. The programme should be adapted to the patient's medical condition."],
  ["Can breast cancer survivors lift weights?", "Many can, including some patients with lymphoedema. Start gradually and use appropriate guidance, particularly after surgery or when there are bone or shoulder problems."],
  ["Can lymphoedema develop years after breast cancer surgery?", "Yes. Lymphoedema can develop months or years after lymph-node surgery or radiation. New arm or hand swelling should be assessed."],
  ["Can a woman become pregnant after breast cancer treatment?", "Pregnancy may be possible for some women, depending on age, ovarian function and previous treatment. Patients should discuss fertility and pregnancy plans with their oncologist and fertility specialist."],
  ["Can breast cancer survivors use hormone replacement therapy?", "Systemic hormone replacement therapy is generally not routinely recommended after breast cancer, especially for hormone-sensitive disease. Any hormonal treatment should be discussed with the oncologist and relevant specialist."],
  ["Why do I feel anxious before every follow-up appointment?", "Fear of recurrence is common. Counselling, CBT, mindfulness-based programmes and clear communication with the oncology team can help manage persistent anxiety."],
  ["Can I travel after breast cancer treatment?", "Many patients can travel after treatment, but timing depends on recovery, ongoing medicines, infection risk, mobility and other health factors. Discuss travel plans with your treating doctor."],
  ["Do I need to continue seeing an oncologist after treatment ends?", "Yes. Follow-up remains important for monitoring recurrence, managing long-term side effects and reviewing ongoing medicines."],
  ["Does completing treatment mean breast cancer will never return?", "No. Recurrence remains possible, although many patients never experience it. Appropriate follow-up and awareness of new symptoms remain important."],
  ["Can I take herbal supplements after breast cancer treatment?", "Do not assume that herbal products are safe. Some can interact with hormone therapy, chemotherapy or other medicines. Discuss supplements with your treating team before using them."],
  ["Is depression common after breast cancer treatment?", "Some patients experience depression, anxiety or emotional distress during and after treatment. These problems are treatable, and professional support should be sought when symptoms persist or affect daily life."],
  ["Can I stop hormone therapy once I feel healthy?", "No. Feeling well does not mean the prescribed treatment is no longer needed. Continue hormone therapy for the recommended duration unless your oncologist advises a change."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Completing breast cancer treatment is a major milestone, but recovery does not always happen immediately. Some patients experience fatigue, pain, changes in body image, menopause symptoms, lymphoedema or anxiety about recurrence. This guide explains how to manage life after breast cancer treatment, including nutrition, exercise, emotional health, fertility, long-term side effects and survivorship care for patients planning [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [follow-up after treatment](" + FOLLOW + "), [follow-up tests guide](" + FOLLOW_OLD + "), [lymphoedema](" + LYMPH + "), [hormone therapy](" + HT_ALT + "), [recurrence](" + RECUR + "), [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO + "), [radiation](" + RAD + ") and [cost](" + COST + ")."),
  btn("Ask GAF to review a breast cancer survivorship plan", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with treatment summary and current symptoms](" + wa("Please review my breast cancer treatment records and advise on recovery, rehabilitation and survivorship care in India.") + ")"),
  img(IMG1, "Breast cancer survivor discussing recovery and survivorship care with a clinician beside soft circular icons for diet exercise and wellbeing", "Finishing treatment is a milestone — recovery and long-term care continue afterwards."),

  h2("What Does Life After Breast Cancer Treatment Look Like?"),
  p("Completing treatment can bring relief and achievement, yet returning to everyday life often takes time. Some people regain strength within a few months; others continue to feel physical or emotional effects long after [chemotherapy](" + CHEMO_ALT + "), [surgery](" + SURGERY + ") or [radiation](" + RAD_ALT + ") ends."),
  p("Life after breast cancer treatment may involve:"),
  ul([
    "Recovering from surgery and rebuilding physical strength.",
    "Managing fatigue after chemotherapy or radiation.",
    "Adjusting to changes in breast appearance and body image.",
    "Managing menopause symptoms or changes in sexual health.",
    "Monitoring bone and heart health.",
    "Returning to work and family responsibilities.",
    "Managing anxiety and fear of cancer recurrence.",
    "Continuing hormone therapy or other maintenance medicines.",
    "Attending regular follow-up appointments.",
  ]),
  p("Finishing treatment does not mean every side effect disappears immediately. With medical support, rehabilitation, nutrition and emotional care, many patients return to meaningful everyday activities."),

  h2("What Is Breast Cancer Survivorship?"),
  p("Breast cancer survivorship is the period during and after cancer treatment focused on recovery, long-term health and quality of life. Some people like the word *survivor*; others prefer simply to be described as someone who has completed or is still receiving treatment."),
  p("Survivorship care is not limited to patients who have finished every medicine. A patient who completed surgery and chemotherapy but continues [hormone therapy](" + HT + ") for several years is also receiving survivorship care."),
  p("A survivorship programme may include:"),
  ol([
    "Monitoring for recurrence or a new breast cancer.",
    "Managing long-term treatment-related side effects.",
    "Supporting physical recovery.",
    "Addressing emotional and psychological health.",
    "Supporting nutrition and physical activity.",
    "Managing fertility and sexual health concerns.",
    "Maintaining general health through routine medical care.",
  ]),
  p("The aim is to help patients live as well as possible after breast cancer — not only to check whether disease returns. Staging context: [breast cancer stages](" + STAGES + ")."),

  h2("What Happens to the Body After Breast Cancer Treatment?"),
  p("Different treatments affect different parts of the body. Side effects depend on medicines, radiation, surgery, age, general health and individual sensitivity. Some improve over time; others continue or appear months or years later."),
  { id: id("html"), type: "html", html: effectsTable },
  p("Not every patient experiences these problems. The treating team can identify which late effects are relevant. See also [chemotherapy side effects](" + CHEMO_SE + "), [radiation side effects](" + RAD_SE + ") and [hormone therapy side effects](" + HT_SE + ")."),

  h2("Fatigue After Breast Cancer Treatment"),
  p("Fatigue is one of the most common challenges after cancer treatment. It is not always ordinary tiredness — a patient may feel exhausted even after sleeping or resting. Shopping, cooking or a short walk may require more effort than before."),
  h3("Why Does Fatigue Continue?"),
  ul([
    "Recovery from chemotherapy or radiation.",
    "Anaemia, poor sleep, pain or hormone therapy.",
    "Menopause symptoms, anxiety or depression.",
    "Poor nutrition or reduced physical activity.",
    "Other medical conditions, including thyroid or heart problems.",
  ]),
  p("Persistent fatigue should not automatically be blamed on cancer treatment. A doctor may need to investigate treatable causes."),
  h3("How Can Fatigue Be Managed?"),
  ul([
    "Start with short walks or gentle movement and increase gradually.",
    "Maintain regular sleep and waking times.",
    "Eat regular, balanced meals and drink enough fluids.",
    "Avoid trying to complete every task in one day; take planned breaks.",
    "Discuss persistent fatigue with the oncology team.",
  ]),
  p("The 2024 ASCO–Society for Integrative Oncology guideline recommends exercise, cognitive behavioural therapy (CBT) and mindfulness-based programmes for cancer-related fatigue after treatment, adapted to the patient's health and ability."),
  btn("Ask about fatigue and rehabilitation support", consult("Breast Cancer Treatment in India")),

  h2("Pain, Shoulder Stiffness and Restricted Arm Movement"),
  p("Some patients continue to feel pain or discomfort after [lumpectomy or mastectomy](" + LUMP + ") — in the breast, chest wall, armpit, shoulder or upper arm. Symptoms may include tightness around the scar, burning or tingling, numbness, sensitivity to touch, pain when raising the arm, or pulling sensations during movement."),
  p("Possible causes include healing tissues, scar formation, nerve irritation, muscle tightness, lymph-node surgery effects, radiation-related tissue changes and post-mastectomy pain syndrome. Persistent or worsening pain should be assessed rather than simply accepted."),
  p("Help may include physiotherapy, gentle shoulder and arm exercises, scar management after the wound has healed, pain-relieving medicines, treatment for nerve-related pain and specialist pain management. Avoid aggressive massage or stretching over an unhealed surgical wound."),
  p("Breast surgery and lymph-node procedures can also limit shoulder movement — difficulty raising the arm, reaching behind the back, combing hair or lifting objects. A physiotherapist may recommend gentle shoulder rolls, wall-climbing exercises, arm raises, shoulder-blade movements, stretching and gradual strengthening. Timing depends on surgery type, reconstruction and wound healing — follow the surgeon's instructions, especially after reconstruction."),

  h2("Lymphoedema After Breast Cancer Treatment"),
  p("Lymphoedema is swelling from lymphatic fluid build-up when lymph nodes or vessels are affected by surgery or radiation. It most commonly affects the arm on the treated side; the hand, chest wall or breast area may also be involved. Full guide: [breast cancer lymphoedema](" + LYMPH + ")."),
  ul([
    "Watch for arm or hand swelling, heaviness, skin tightness, reduced flexibility, discomfort, or jewellery/sleeves feeling tighter.",
    "Lymphoedema may develop soon after treatment or several years later.",
    "Maintain a healthy weight, stay active, follow recommended arm exercises and protect the skin from cuts and infections.",
    "Appropriately planned exercise is generally possible and can be beneficial — do not avoid all arm activity out of fear.",
    "Management may include compression garments, specialist physiotherapy, exercise programmes, manual lymphatic drainage in selected cases, skin care and infection-prevention education.",
  ]),
  p("Sudden redness, warmth, pain and fever in a swollen arm may indicate infection and require prompt medical attention."),
  p("[WhatsApp +91 90443 46292 about lymphoedema assessment in India](" + wa("I have arm swelling after breast cancer treatment. Please help arrange lymphoedema assessment and rehabilitation in India.") + ")"),

  h2("Menopause, Fertility and Sexual Health"),
  p("Chemotherapy, hormone therapy and ovarian suppression can affect ovarian function and cause menopause-like symptoms — hot flushes, night sweats, irregular or absent periods, vaginal dryness, reduced sexual desire, sleep disturbance, mood changes, joint discomfort and difficulty concentrating."),
  p("In some younger women, periods may return after chemotherapy; in others, ovarian function may not recover. Return of periods does not always mean fertility has returned to its previous level. See [breast cancer in young women](" + YOUNG + ") and [pregnancy and breastfeeding](" + PREG + ")."),
  h3("Fertility and Pregnancy After Treatment"),
  p("Pregnancy may be possible for some women after treatment, depending on age, ovarian function, previous chemotherapy, current medicines and other factors. Discuss plans with both the oncologist and a fertility specialist."),
  p("Some carefully selected patients with hormone receptor-positive early breast cancer may discuss a temporary interruption of endocrine therapy to attempt pregnancy. This is not suitable for everyone and requires specialist assessment. Never stop tamoxifen, aromatase inhibitors or ovarian suppression independently."),
  p("Whenever possible, fertility preservation (egg or embryo freezing, and selected other approaches) should be discussed before chemotherapy begins."),
  h3("Managing Menopause Symptoms and Intimacy"),
  ul([
    "Lifestyle adjustments, non-hormonal medicines for selected symptoms, vaginal moisturisers and lubricants, sleep support and specialist menopause care.",
    "Systemic hormone replacement therapy is generally not routinely recommended after breast cancer, particularly for hormone-sensitive disease — discuss any hormonal treatment with the oncologist.",
    "Sexual health concerns — desire, comfort, confidence — are legitimate parts of survivorship; open communication, lubricants, pelvic or sexual-health counselling and psychological support can help.",
    "Patients with hormone-sensitive disease should discuss vaginal hormonal products with the oncology team before using them.",
  ]),
  btn("Discuss fertility and menopause concerns with GAF", consult("Breast Cancer Treatment in India")),

  h2("Memory, Bone Health and Heart Health"),
  h3("Cancer-Related Cognitive Changes"),
  p("Some patients describe difficulty remembering information, concentrating or organising tasks after chemotherapy (*chemo brain*). Practical help includes diaries or digital reminders, breaking tasks into smaller steps, consistent sleep, physical activity within limits and reducing distractions. Persistent difficulties warrant medical assessment — sleep problems, depression, anaemia, thyroid issues and medicines can contribute."),
  h3("Bone Health"),
  p("Aromatase inhibitors, ovarian suppression and chemotherapy-induced menopause can lower oestrogen and increase bone loss. Doctors may recommend DEXA bone mineral density testing, calcium and vitamin D evaluation, weight-bearing and resistance exercise, and bone-protective medicines for selected patients. Protect bones with calcium-rich foods, adequate vitamin D, suitable exercise, avoiding smoking and following recommended testing."),
  h3("Heart Health"),
  p("Anthracycline chemotherapy, certain HER2-targeted medicines and radiation near the heart may require cardiac attention. Report new or worsening breathlessness, leg or ankle swelling, unusual fatigue, palpitations, chest discomfort or reduced exercise ability. Sudden severe chest pain or breathlessness needs emergency care. Monitoring may include blood pressure, cholesterol, diabetes screening, ECG and echocardiography when indicated."),

  h2("Body Image After Mastectomy"),
  p("Breast cancer surgery can change how a patient sees and feels about their body. Some adjust comfortably; others feel sadness, loss of confidence or difficulty with intimacy and clothing — especially after mastectomy or when reconstruction has not been performed."),
  p("Options may include breast prostheses, specialised bras, [breast reconstruction](" + RECON + "), nipple reconstruction or tattooing in selected cases, clothing adjustments and counselling or peer support. Reconstruction is a personal choice, not medically necessary for every patient."),

  h2("Mental Health After Breast Cancer Treatment"),
  img(IMG4, "Breast cancer survivor speaking with a counsellor beside soft circular icons suggesting calm breathing and emotional support", "Fear of recurrence is common — clear follow-up plans and professional support can help."),
  p("Completing treatment does not automatically remove the emotional effects of cancer. Anxiety before every follow-up appointment, or worry that a new pain means recurrence, is commonly called *fear of cancer recurrence*."),
  ul([
    "Anxiety about cancer returning, depression or low mood, sleep problems.",
    "Fear of medical appointments, relationship changes, financial concerns.",
    "Difficulty returning to work, or feeling isolated from family or friends.",
  ]),
  p("Helpful steps: ask for a clear follow-up plan, understand which symptoms need attention, avoid repeatedly searching alarming online content, discuss persistent anxiety with a professional, consider counselling or CBT, connect with other survivors if helpful, and keep activities that provide meaning."),
  p("If sadness, hopelessness, anxiety or loss of interest persists and affects daily life, seek professional support. Severe emotional distress or thoughts of self-harm require immediate help from a qualified professional or emergency service."),
  p("[WhatsApp +91 90443 46292 for survivorship and counselling coordination](" + wa("Please help coordinate breast cancer survivorship care and counselling support in India.") + ")"),

  h2("Diet After Breast Cancer Treatment"),
  img(IMG2, "Balanced Indian meal with vegetables dal whole grains and fruit beside a soft circular nutrition concept for breast cancer survivors", "A practical Indian diet can support recovery — no single food prevents recurrence."),
  p("Nutrition supports strength, bone health, weight management and lower risk of other chronic conditions. No particular food or diet has been proven to cure breast cancer or guarantee it will not return. Focus on a practical, sustainable eating pattern rather than restrictive rules."),
  { id: id("html"), type: "html", html: dietTable },
  p("A balanced Indian diet is suitable — dal with vegetables and roti, vegetable khichdi with curd, grilled fish with rice and vegetables, paneer with seasonal vegetables, chana or rajma with brown rice, oats with nuts and fruit, or eggs with whole-grain toast."),
  ul([
    "**Sugar:** eliminating all sugar does not selectively starve cancer cells; limiting sugary drinks and excessive sweets still supports metabolic health.",
    "**Soy:** normal dietary soy foods (tofu, soybeans, soy milk) are generally considered safe for most survivors; high-dose isoflavone supplements need oncologist discussion.",
    "**Supplements:** high-dose antioxidants or herbal products are not automatic — discuss with the team, especially during hormone therapy or targeted treatment.",
  ]),
  h3("Weight Management"),
  p("Some patients gain weight during treatment; others lose weight. Changes may relate to reduced activity, menopause, hormone therapy, steroids, appetite changes, emotional eating or muscle loss. Practical steps: regular meals with protein, more vegetables and whole grains, limit sugary drinks, avoid extreme diets, combine aerobic activity with strength training, and seek dietitian support when needed. Unexplained weight loss needs medical assessment — do not try to lose more weight if underweight."),

  h2("Exercise After Breast Cancer Treatment"),
  img(IMG3, "Breast cancer survivor walking outdoors with gentle arm mobility exercises suggested by soft circular movement icons", "Gradual exercise can reduce fatigue and rebuild strength when medically appropriate."),
  p("Exercise can improve strength, cardiovascular fitness, flexibility, sleep, mood, fatigue, confidence and quality of life. It may also help with weight and bone health."),
  ul([
    "**Walking** — a simple starting point; begin with short distances and increase gradually.",
    "**Strength training** — light resistance to rebuild muscle; seek guidance with bone problems or significant lymphoedema.",
    "**Stretching** — improves shoulder movement and reduces stiffness.",
    "**Yoga** — modified yoga for flexibility, balance and relaxation; avoid positions that strain healing areas.",
    "**Swimming** — may be suitable after wounds have healed and the team approves.",
  ]),
  p("A long-term goal for many adult cancer survivors is at least 150 minutes of moderate-intensity activity per week (or an equivalent mix), strength training on two or more days when safe, and regular movement breaks. Start at a manageable level after surgery or treatment. Patients with bone metastases, heart problems, severe fatigue, significant lymphoedema or other complications need an individual plan."),
  btn("Request an exercise and rehab pathway review", consult("Breast Cancer Treatment in India")),

  h2("Returning to Work After Breast Cancer Treatment"),
  p("Returning to work can rebuild routine and independence, but some patients are not ready immediately. Challenges include fatigue, reduced concentration, pain, frequent appointments, difficulty lifting, anxiety about workload and changes in confidence."),
  ul([
    "Discuss a gradual return and flexible hours with your employer.",
    "Take short breaks; avoid heavy physical work until medically cleared.",
    "Keep follow-up appointments and discuss reasonable adjustments if symptoms persist.",
  ]),
  p("Do not feel pressured to resume the previous workload before you are ready."),

  h2("Long-Term Follow-Up and Warning Signs"),
  p("Survivorship does not replace regular oncology follow-up. Continue the schedule recommended by the treating team — clinical examination, mammography of remaining breast tissue when indicated, hormone-therapy review, assessment of long-term side effects, and bone or heart monitoring when appropriate."),
  p("Routine PET-CT, CT scans, bone scans or tumour-marker tests are not generally required for every asymptomatic patient after early-stage treatment. Investigations should be based on clinical need. Detailed guide: [breast cancer follow-up after treatment](" + FOLLOW + ") and the earlier [follow-up tests article](" + FOLLOW_OLD + ")."),
  p("Patients should not ignore new or persistent symptoms:"),
  { id: id("html"), type: "html", html: warningTable },
  p("Not every symptom means cancer has returned. Many have other causes. Obtain appropriate medical advice. Distant-disease context: [metastatic / Stage 4 breast cancer](" + META + ") and [recurrence treatment](" + RECUR + ")."),

  h2("How Family Members Can Support a Breast Cancer Survivor"),
  ul([
    "Accompany the patient to appointments when requested and help organise medical records.",
    "Support healthy meals and encourage gentle physical activity.",
    "Help with household responsibilities during recovery.",
    "Listen without dismissing concerns; respect decisions about appearance and treatment.",
    "Support return to work and social activities; recognise when professional emotional support is needed.",
  ]),
  p("Support should not mean treating the patient as permanently unwell or unable to make decisions. Caregivers also need to look after their own health."),

  h2("Breast Cancer Survivorship Care in India"),
  p("India is a destination considered by many patients seeking breast cancer treatment and follow-up. For patients who completed treatment in India or are returning from another country, plan survivorship care before leaving the treating hospital."),
  ul([
    "Medical oncology follow-up, breast surgery review and appropriate breast imaging.",
    "Physiotherapy, rehabilitation and lymphoedema management.",
    "Bone-health and cardiac assessment when indicated.",
    "Nutrition counselling, psychological support, and fertility or sexual-health counselling where required.",
  ]),
  p("Services vary by hospital. Confirm the centre can provide the follow-up and rehabilitation needed."),
  h3("Why Is a Written Treatment Summary Important?"),
  p("A treatment summary helps the next doctor understand what the patient received — diagnosis and stage, histopathology, ER/PR/HER2 status, surgery details, chemotherapy and radiation summaries, targeted and hormone therapy history, significant side effects, recommended follow-up and long-term monitoring tests."),
  p("This is especially important for patients returning to Tanzania, Kenya, Uganda, Ethiopia, Zambia, Cameroon, Iraq, Oman, Saudi Arabia and other countries after treatment in India. Pathway: [international patients](" + INTL + ")."),
  p("Specialists: [medical oncology](" + MED_DOCS + "), [surgical oncology](" + SURG_DOCS + "), [radiation oncology](" + RAD_DOCS + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + ")."),

  h2("Survivorship Cost Planning in India"),
  p("There is no single price for rehabilitation or survivorship packages. Costs depend on consultation frequency, physiotherapy, imaging, management of side effects and whether new symptoms require further tests. Related named treatment pathway ranges used for planning (not invented rehab package prices):"),
  { id: id("html"), type: "html", html: costTable },
  p("See the broader [breast cancer treatment cost guide](" + COST + "). GAF Healthcare can help request a case-specific estimate for follow-up and supportive care — we do not invent fixed package prices for every survivor."),
  btn("Request a survivorship and follow-up estimate", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 for a case-specific survivorship cost review](" + wa("Please review my breast cancer records and share a survivorship follow-up and rehabilitation estimate in India.") + ")"),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare assists international patients exploring medical treatment and follow-up coordination in India. Support may include arranging consultations, coordinating review of previous medical records, assisting with follow-up appointments, helping organise investigations recommended by the treating team, coordinating access to rehabilitation or supportive services where available, and supporting communication between patients and hospitals."),
  p("Medical decisions, diagnosis and treatment recommendations remain the responsibility of the treating healthcare professionals."),
  btn("Talk to GAF about life after breast cancer treatment", consult("Breast Cancer Treatment in India")),

  h2("Frequently Asked Questions About Life After Breast Cancer Treatment"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Thoughts"),
  p("Life after breast cancer treatment is not simply waiting for the next follow-up appointment. It is about rebuilding strength, managing long-term effects and finding a comfortable way to return to everyday life."),
  p("Some patients recover quickly. Others need more time and support for fatigue, pain, menopause symptoms, lymphoedema, body-image changes or anxiety about recurrence. A good survivorship plan addresses physical health, emotional well-being, nutrition, exercise, fertility concerns and long-term monitoring."),
  p("Patients do not have to manage every problem alone. Oncologists, physiotherapists, dietitians, counsellors and other specialists can all contribute. The goal is not merely to complete medical care — it is to move forward with the best possible health, confidence and quality of life."),

  h2("Medical Sources and References"),
  ol([
    "[NCI – Living with Breast Cancer and Survivorship](https://www.cancer.gov/types/breast/breast-cancer-survivorship)",
    "[American Cancer Society – Living as a Breast Cancer Survivor](https://www.cancer.org/cancer/types/breast-cancer/living-as-a-breast-cancer-survivor.html)",
    "[ASCO – Management of Fatigue in Adult Survivors of Cancer: ASCO–SIO Guideline Update](https://ascopubs.org/doi/10.1200/JCO.24.00541)",
    "[NCI – Late Effects of Cancer Treatment](https://www.cancer.gov/about-cancer/coping/survivorship/late-effects)",
    "[American Cancer Society – Diet and Physical Activity Guideline for Cancer Survivors](https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer/acs-nutrition-and-physical-activity-guideline-for-survivors.html)",
    "[ACOG – Breast Cancer Survivorship: Health and Fertility After Treatment](https://www.acog.org/womens-health/faqs/breast-cancer-survivorship-health-and-fertility-after-treatment)",
    "[NCI – Follow-Up Medical Care After Cancer Treatment](https://www.cancer.gov/about-cancer/coping/survivorship/follow-up-care)",
    "[American Cancer Society – Long-Term and Late Effects of Cancer](https://www.cancer.org/cancer/survivorship/long-term-side-effects-of-cancer.html)",
    "[ASCO Educational Book – Optimizing Breast Cancer Survivorship, 2026](https://ascopubs.org/doi/10.1200/EDBK-26-517396)",
    "[NCCN – Survivorship Guidelines Insights, Version 2.2025](https://escholarship.org/uc/item/62c7b03t)",
  ]),
  p("*Medical disclaimer: This article is intended for general education and does not replace individual medical advice. Exercise, nutrition, fertility, hormone treatment and rehabilitation plans should be tailored to the patient's diagnosis, treatment history and current health. Patients should discuss persistent or new symptoms with their treating healthcare team.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Treatment in India](${TX_BREAST})`,
    `[Breast Cancer Follow-Up After Treatment](${FOLLOW})`,
    `[Breast Cancer Follow-Up Tests](${FOLLOW_OLD})`,
    `[Breast Cancer Lymphoedema](${LYMPH})`,
    `[Hormone Therapy for Breast Cancer](${HT_ALT})`,
    `[Breast Cancer Recurrence Treatment in India](${RECUR})`,
    `[Metastatic Breast Cancer (Stage 4)](${META})`,
    `[Breast Cancer Surgery in India](${SURGERY})`,
    `[Lumpectomy vs Mastectomy](${LUMP})`,
    `[Radiation Therapy for Breast Cancer](${RAD})`,
    `[Chemotherapy for Breast Cancer in India](${CHEMO})`,
    `[Breast Reconstruction After Mastectomy](${RECON})`,
    `[Breast Cancer in Young Women](${YOUNG})`,
    `[Pregnancy and Breastfeeding](${PREG})`,
    `[Breast Cancer Treatment Cost in India](${COST})`,
    `[International Patients](${INTL})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_life_after_breast_cancer_treatment",
  slug: SLUG,
  title: "Life After Breast Cancer Treatment: Recovery, Diet, Exercise and Survivorship",
  excerpt:
    "Completing breast cancer treatment is a major milestone, but recovery does not always happen immediately. Some patients experience fatigue, pain, changes in body image, menopause symptoms, lymphoedema or anxiety about recurrence. This guide explains how to manage life after breast cancer treatment, including nutrition, exercise, emotional health, fertility, long-term side effects and survivorship care in India.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T11:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "survivorship", "recovery", "diet", "exercise", "India"],
  image: IMG1,
  imageAlt: "Breast cancer survivor discussing recovery and survivorship care with a clinician",
  status: "published",
  featured: true,
  seoTitle: "Life After Breast Cancer Treatment: Recovery, Diet, Exercise and Survivorship",
  seoDescription:
    "Learn what life is like after breast cancer treatment. Explore recovery, long-term side effects, diet, exercise, mental health, fertility and survivorship care in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Life after breast cancer treatment",
    "Breast cancer survivorship",
    "Recovery after breast cancer treatment",
    "Life after breast cancer surgery",
    "Diet after breast cancer treatment",
    "Exercise after breast cancer",
    "Long-term side effects of breast cancer treatment",
    "Fatigue after chemotherapy",
    "Lymphoedema after breast cancer surgery",
    "Mental health after breast cancer",
    "Breast cancer survivor care",
    "Breast cancer recovery in India",
    "Breast cancer rehabilitation",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: TX_BREAST },
    { label: "Follow-up after treatment", href: FOLLOW },
    { label: "Lymphoedema", href: LYMPH },
    { label: "Hormone therapy", href: HT_ALT },
    { label: "Recurrence", href: RECUR },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["life-after-breast-cancer-overview.webp", article.imageAlt],
  [
    "life-after-breast-cancer-diet.webp",
    "Balanced Indian meal with vegetables dal whole grains and fruit beside a soft circular nutrition concept for breast cancer survivors",
  ],
  [
    "life-after-breast-cancer-exercise.webp",
    "Breast cancer survivor walking outdoors with gentle arm mobility exercises suggested by soft circular movement icons",
  ],
  [
    "life-after-breast-cancer-mental-health.webp",
    "Breast cancer survivor speaking with a counsellor beside soft circular icons suggesting calm breathing and emotional support",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`)) {
    store.media.push({
      id: mediaId,
      url: `/uploads/articles/${file}`,
      name: file,
      alt,
      addedAt: now,
    });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length, "articles", store.articles.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [life after breast cancer treatment](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Life after breast cancer treatment](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "breast-cancer-follow-up-tests",
  "breast-cancer-lymphedema",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-recurrence-treatment-india",
  "metastatic-breast-cancer-stage-4",
  "breast-cancer-surgery-in-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-in-young-women-treatment-india",
  "breast-reconstruction-after-mastectomy-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Life after breast cancer treatment", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related articles");
