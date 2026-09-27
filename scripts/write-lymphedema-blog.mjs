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
const RAD_SE = "/blogs/breast-cancer-radiation-side-effects";
const NEO = "/blogs/breast-cancer-neoadjuvant-therapy";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RAD_DOCTORS = "/doctors/India/Radiation-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is lymphedema after breast cancer treatment?</strong> Lymphedema is swelling caused by a buildup of lymph fluid when the lymphatic system has been damaged or its drainage has been reduced. After breast cancer treatment, it most commonly affects the arm, hand, breast or chest wall on the treated side.</p><p class="article-quick-answer__body"><strong>Why does breast cancer treatment cause lymphedema?</strong> Lymph nodes and lymphatic vessels can be affected by lymph-node surgery and radiation therapy. Removing or damaging lymphatic pathways can make it harder for lymph fluid to drain normally.</p><p class="article-quick-answer__body"><strong>What are the early signs?</strong> Early symptoms can include a feeling of heaviness, tightness, fullness or swelling in the arm, hand, breast or chest area. Rings, watches or clothing may also feel tighter.</p><p class="article-quick-answer__body"><strong>Can lymphedema happen years after breast cancer treatment?</strong> Yes. It can develop months or years after treatment, so new swelling should not automatically be attributed to an old surgery or ignored.</p><p class="article-quick-answer__body"><strong>Does lymphedema mean breast cancer has returned?</strong> No. Lymphedema itself does not mean that cancer has returned. However, unexplained or new swelling should be assessed by a doctor to determine its cause.</p><p class="article-quick-answer__body"><strong>Can lymphedema be cured?</strong> There is currently no universal cure for established lymphedema, but treatment can reduce swelling, improve function and help prevent complications.</p><p class="article-quick-answer__body"><strong>How is breast-cancer-related lymphedema treated?</strong> Treatment may include compression garments, exercise, skin care, specialized lymphatic therapy and other interventions. Selected patients may be evaluated for surgical procedures.</p><p class="article-quick-answer__body"><strong>Can I exercise after breast cancer surgery?</strong> In most cases, appropriate physical activity and gradual exercises are part of recovery. The exact timing and type of exercise should be discussed with the treating team, particularly after lymph-node surgery.</p><p class="article-quick-answer__body"><strong>Does every patient who has lymph nodes removed develop lymphedema?</strong> No. The risk varies according to the extent of lymph-node treatment, radiation, individual factors and other aspects of treatment.</p><p class="article-quick-answer__body"><strong>Can lymphedema treatment be provided in India?</strong> Yes. Breast cancer centers in India may provide multidisciplinary assessment involving surgical oncology, rehabilitation, physiotherapy and, where appropriate, specialists experienced in lymphedema management.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Lymphedema is one of the complications that some people experience after breast cancer treatment. It usually affects the arm, hand, breast or chest area on the side where treatment was performed. It can develop soon after [surgery](${SURGERY}) or [radiation](${RAD_SE}), but in some people it appears months or even years later. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about lymphedema risk after surgery",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa("Please review my records and advise on lymphedema risk and treatment after breast cancer in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lymphedema-measure-visual.webp",
    alt: "Lymphedema after breast cancer treatment showing arm swelling and lymphatic drainage",
    caption: "Early measurement and recognition make lymphedema easier to manage. New swelling should be assessed rather than ignored.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The lymphatic system is a network of vessels and lymph nodes that helps move lymph fluid through the body. When this drainage system is damaged or blocked, fluid can accumulate in the affected area. After breast cancer treatment, it most commonly affects the arm or hand on the side where surgery or radiation was performed. Some patients can also develop swelling in the breast or chest wall. The condition can range from barely noticeable swelling to more persistent changes in the tissues.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can Breast Cancer Treatment Cause Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most important treatment-related risk factors include removal of lymph nodes, extensive axillary lymph-node surgery, radiation involving regional lymph nodes, a combination of surgery and radiation, and infection or injury affecting lymphatic drainage. The more lymphatic pathways that are removed or damaged, the greater the potential for drainage problems. Treatment does not mean that lymphedema is inevitable.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is the Role of Axillary Lymph Nodes?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The axillary lymph nodes are located in the armpit. Breast cancer can spread to these nodes, which is why they may need to be assessed during treatment. Depending on the situation, doctors may perform a sentinel lymph-node biopsy or a more extensive lymph-node procedure. A sentinel lymph-node biopsy generally removes fewer nodes than an axillary lymph-node dissection. This difference can matter when considering the potential risk of lymphedema.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Sentinel Lymph-Node Biopsy vs Axillary Dissection",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These procedures are not the same. A sentinel lymph-node biopsy identifies and removes the first nodes that drain the breast. If those nodes do not contain cancer, further lymph-node surgery may not be necessary in many situations. An axillary lymph-node dissection removes a larger number of nodes from the armpit and may be recommended when there is more significant involvement or in particular clinical circumstances. Because more lymphatic tissue is affected, axillary dissection generally carries a greater lymphedema risk than sentinel-node surgery. The appropriate procedure depends on the patient's cancer and treatment plan. See [surgery in India](${SURGERY}) and [neoadjuvant therapy](${NEO}), which can sometimes reduce the extent of later node surgery.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Early Symptoms of Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymphedema does not always begin with obvious swelling. Early symptoms can include a feeling of heaviness in the arm, tightness, fullness, mild swelling, reduced flexibility, skin feeling tighter, rings or watches becoming tighter, difficulty fitting into clothing on one side, or a sensation that one arm feels different from the other. Some people notice symptoms before visible swelling becomes obvious. That is why changes in how the arm feels can be worth discussing with the treating team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Lymphedema Swelling Look Like?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In early stages, the difference between the two arms may be very subtle. As lymphedema progresses, swelling can become more noticeable around the hand, wrist, forearm, upper arm, breast or chest wall. The skin may become thicker or feel firmer in longstanding cases. Not every swollen arm after breast cancer treatment is lymphedema. Infection, blood clots, injury and other conditions can also cause swelling.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Affect the Breast?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Lymphedema does not always occur in the arm. Some patients develop swelling or changes in the breast, chest wall or area around the surgical site — heaviness, tightness, skin thickening, changes in shape or a feeling of fullness. Breast swelling after surgery can also occur as part of normal healing. The timing and clinical examination help doctors determine whether the symptoms are related to lymphedema or another postoperative change.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Affect the Hand?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some patients notice swelling around the hand or fingers. Rings may become tight, making a fist may be harder, finger movement may reduce, and the skin may feel tight or full. Hand swelling should be assessed rather than assumed to be lymphedema.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about new arm or hand swelling",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 if one arm feels heavier](${wa("I have heaviness or swelling in my arm after breast cancer treatment. Please advise.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Can Lymphedema Develop?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single time at which it appears. It can develop shortly after treatment, several months later or years later. Completing breast cancer treatment does not necessarily mean the risk disappears immediately. A new change in the treated arm or chest should be discussed with a healthcare professional.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Who Is More Likely to Develop Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Risk varies between individuals. Factors associated with increased risk include more extensive lymph-node surgery, axillary dissection, regional lymph-node radiation, a higher number of nodes removed, higher body weight, infection or inflammation, injury to the affected limb, and previous treatment involving the lymphatic system. Having one or more risk factors does not mean lymphedema will definitely develop.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Radiation Therapy Increase Lymphedema Risk?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Radiation](${RAD}) involving regional lymph nodes can affect lymphatic drainage. The risk can be higher when radiation is combined with more extensive lymph-node surgery. Radiation may still be an important part of treatment for appropriate patients. Doctors balance the benefits of cancer treatment against potential side effects when developing an individual plan. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm whether sentinel-node surgery is appropriate.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Lymphedema the Same as Cancer Recurrence?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `No. Lymphedema is a problem with lymphatic fluid drainage. Breast cancer recurrence means that cancer has returned. A patient who later develops swelling should not assume either explanation without an evaluation. Cancer involving lymph nodes or tissues that interfere with drainage can sometimes contribute to swelling. Persistent or unexplained swelling needs assessment. See the [recurrence guide](${RECUR}) and [follow-up tests](${FOLLOW}).`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lymphedema-consult-visual.webp",
    alt: "Lymphedema consult after breast cancer surgery or radiation",
    caption: "Report new heaviness, tightness or arm swelling rather than waiting for the next appointment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Lymphedema Diagnosed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In many patients, diagnosis begins with a medical history and physical examination. The doctor may compare the affected and unaffected limbs and assess swelling, skin changes, limb circumference, tissue texture, range of motion, symptoms and previous treatment. There is no single test that every patient needs. Depending on the situation, specialists may use limb-volume measurements, bioimpedance, ultrasound, lymphoscintigraphy, indocyanine green lymphatic imaging or other specialised lymphatic imaging.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether swelling needs a lymphedema assessment",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about diagnosis](${wa("Please advise how lymphedema is diagnosed after breast cancer treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Complex Decongestive Therapy?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lymphedema-compression-visual.webp",
    alt: "Compression sleeve fitting for breast cancer–related lymphedema",
    caption: "Compression and specialist physiotherapy are common treatments when swelling develops. The garment should be appropriately fitted.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "One commonly used approach is complex decongestive therapy (CDT). It can include compression, exercise, skin care, manual lymphatic techniques and education about self-management. Treatment is individualised. Not every patient requires exactly the same combination or intensity of therapy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does Compression Help?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Compression garments provide controlled pressure around the affected area. This can help support fluid movement and control swelling. Depending on the patient's condition, compression may involve sleeves, gloves or gauntlets, bandaging, or specialised garments for the chest. The garment should be appropriately fitted. A poorly fitting compression garment can be uncomfortable and may not provide the intended benefit.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/lymphedema-physio-visual.webp",
    alt: "Guided arm exercises after breast cancer lymph-node treatment",
    caption: "Gentle movement and rehabilitation help maintain shoulder mobility and lymphatic flow.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Exercise Help Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Appropriate exercise can include gentle range-of-motion work, stretching, gradual strengthening, aerobic activity and breathing exercises. Exercise should generally be introduced progressively. People recovering from surgery may need guidance about when to begin specific movements, particularly after extensive surgery or complications.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Should You Avoid Using the Arm After Surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Routine avoidance of normal arm use is generally not the goal. Historically, patients were sometimes given extensive restrictions after lymph-node surgery. Current approaches emphasise a gradual return to normal activity and appropriately progressed exercise rather than permanently avoiding the arm. Your surgeon or rehabilitation specialist can advise you about lifting, resistance exercise and timing based on your operation and recovery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Weight Training Cause Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is a common concern. Many survivors worry that lifting weights will trigger swelling. Current rehabilitation approaches generally support gradually introduced resistance exercise when appropriate rather than avoiding strength training altogether. The important principle is progression. If you are starting resistance exercise after surgery or lymph-node treatment, begin at an appropriate level and increase gradually under professional guidance when needed.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about physiotherapy after lymph-node surgery",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about prevention and treatment](${wa("Please advise on prevention and treatment of arm swelling after breast cancer surgery.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What About Blood Pressure Checks on the Treated Arm?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients are often told to avoid blood pressure measurements, injections or blood draws in the arm on the treated side. Modern evidence does not clearly support blanket avoidance of all routine procedures in every patient solely because they are at risk of lymphedema. The practical approach should be individualised. Tell healthcare professionals about your surgery and lymph-node treatment so they can consider the safest option available.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Blood Tests Be Done From the Affected Arm?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If another arm is readily available, some clinicians may prefer it. An occasional blood draw from the treated side does not automatically mean that lymphedema will develop. The decision can depend on the patient's lymph-node treatment, existing lymphedema and the availability of alternative access.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Infections Make Lymphedema Worse?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Lymphedema can make the affected area more vulnerable to skin infections such as cellulitis. Seek prompt medical attention for increasing redness, warmth, pain, rapid swelling, fever, chills or feeling generally unwell. These symptoms should not be managed as routine lymphedema. An infection may require medical treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Skin Care Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Healthy skin provides an important barrier against infection. If you have lymphedema, basic skin care can include keeping the skin clean, moisturising dry skin, treating cuts promptly, avoiding unnecessary skin injury, looking after nails and cuticles, and monitoring for redness or infection. The aim is to reduce opportunities for bacteria to enter damaged skin.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Be Prevented?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no guaranteed way to prevent breast-cancer-related lymphedema. Risk can sometimes be reduced by using the least extensive lymph-node surgery that is appropriate for the cancer, following postoperative exercise guidance, maintaining a healthy body weight where appropriate, looking after the skin, treating infections promptly, recognising early swelling and seeking assessment when symptoms appear. The cancer treatment should always remain the priority. Lymph-node surgery should not be avoided when it is medically necessary simply because of concern about lymphedema.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Go Away on Its Own?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Mild postoperative swelling can sometimes improve as healing progresses. Established lymphedema is different. Once the lymphatic system has been significantly impaired, persistent swelling may require ongoing management. Early assessment is therefore useful. It is better to have a mild symptom evaluated than to wait until swelling becomes severe.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Be Cured?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is currently no universal cure for established lymphedema. However, many patients can manage the condition effectively. Treatment aims to reduce swelling, improve movement, reduce discomfort, protect the skin, prevent infections, improve daily function and maintain long-term control. Some patients may also be evaluated for surgical procedures when conservative management is insufficient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Lymphedema Surgery Considered?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Surgical treatment is not required for everyone. Selected patients may be assessed for lymphovenous bypass (connecting small lymphatic vessels to nearby veins), vascularized lymph-node transfer, or specialised liposuction when longstanding lymphedema includes significant fatty tissue accumulation. These procedures require specialist assessment. The appropriate operation depends on the condition of the patient's lymphatic system and the type and severity of lymphedema. Patients who have developed persistent breast-cancer-related lymphedema may be evaluated by specialists in lymphatic surgery. Before surgery, doctors may perform detailed lymphatic imaging. Not every patient is a candidate for every procedure.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lymphedema After Breast Cancer: What Should You Do?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Compare both arms or hands and notice whether the swelling is persistent",
      "Look for redness, warmth or pain",
      "Contact your cancer care team and ask whether you need a lymphedema assessment",
      "Follow recommended exercise and compression guidance",
      "Do not start aggressive massage or compression without advice if swelling appeared suddenly or is painful",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Lymphedema Affect Quality of Life?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Even when swelling is relatively mild, patients may experience heaviness, tightness, reduced arm movement, difficulty with clothing, difficulty exercising, self-consciousness and anxiety about worsening symptoms. For some patients, the psychological effect can be significant. Managing lymphedema is therefore not simply about reducing arm circumference. The broader goal is helping the person return to comfortable daily life.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Know Before Breast Cancer Surgery in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If you are travelling to India for breast cancer surgery, lymphedema should be part of the pre-treatment discussion. Ask whether you need lymph-node surgery, whether sentinel-node biopsy is appropriate, whether you need an axillary dissection or regional radiation, what your estimated risk is, when you can begin arm exercises, whether you should see a physiotherapist, and which symptoms should make you contact the hospital. See the [international-patient guide](${INTL}).`,
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
    text: `Before leaving India, keep the operative report, lymph-node pathology, final pathology, radiation summary, chemotherapy records, medication list, rehabilitation recommendations and follow-up plan. If swelling develops later, your local doctor can use this information to understand exactly what lymph-node and cancer treatments you received. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can coordinate surgical oncology, radiation oncology, physiotherapy and lymphedema management.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send records for a lymphedema plan in India",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my surgery and radiation records for a lymphedema plan in India.")})`,
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
    text: `International patients undergoing breast cancer treatment in India may require coordinated care across several specialties: breast surgical oncology, medical oncology, radiation oncology, pathology, radiology, physiotherapy and rehabilitation, and lymphedema management. GAF Healthcare can help international patients coordinate medical records, consultations and treatment planning with hospitals and specialists in India. The exact specialist pathway depends on the patient's diagnosis and previous treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["What is lymphedema after breast cancer treatment?", "It is swelling from a buildup of lymph fluid when drainage has been reduced. It most commonly affects the arm, hand, breast or chest wall on the treated side."],
    ["Can lymphedema happen after sentinel lymph-node biopsy?", "Yes, although the risk is generally lower than with more extensive axillary lymph-node surgery."],
    ["Can lymphedema happen after breast reconstruction?", "It can. The risk depends largely on the lymph-node and radiation treatment rather than reconstruction alone."],
    ["Can radiation cause lymphedema?", "Yes. Radiation involving regional lymphatic areas can increase the risk."],
    ["Can lymphedema appear 10 years after breast cancer treatment?", "Yes. New swelling should still be evaluated rather than automatically attributed to lymphedema."],
    ["Is arm swelling always lymphedema?", "No. Other causes include infection, injury, blood clots and other medical conditions."],
    ["Does lymphedema mean the cancer has returned?", "No. Lymphedema itself is not cancer recurrence. New unexplained swelling should still be assessed."],
    ["Can I exercise if I have lymphedema?", "Often yes. Gradually introduced exercise is commonly part of management, but intensity should be individualised."],
    ["Should I wear a compression sleeve all the time?", "Not necessarily. Timing and duration depend on severity, activity and the treatment plan."],
    ["Can lymphedema be treated without surgery?", "Yes. Many patients are managed with compression, exercise, skin care and specialised therapy."],
    ["Is lymphedema treatment available in India?", "Yes. Assessment and management can be coordinated through cancer centres, rehabilitation services and lymphatic specialists."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lymphedema: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymphedema is a possible long-term complication of breast cancer treatment, particularly after lymph-node surgery and regional radiation. The first symptoms can be subtle — heaviness, tightness or fullness. Do not ignore new or persistent changes, and do not confuse lymphedema with recurrence. Many patients never develop significant lymphedema. For those who do, treatment can help control the condition. Discuss lymph-node surgery, radiation, postoperative exercise and prevention with your team before the procedure, and get swelling assessed early.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan lymphedema care after breast cancer treatment in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP})\n- [Reconstruction](${RECON})\n- [Radiation](${RAD}) · [radiation side effects](${RAD_SE})\n- [Neoadjuvant therapy](${NEO})\n- [Follow-up tests](${FOLLOW})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Radiation oncology doctors](${RAD_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-28T00:00:00.000Z";
const SLUG = "breast-cancer-lymphedema";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_lymphedema",
  slug: SLUG,
  title: "Breast Cancer and Lymphedema: Causes, Symptoms, Prevention and Treatment in India",
  excerpt:
    "Why arm or chest swelling can occur after lymph-node surgery or radiation, how to recognise it early, and which prevention and treatment options are used in India.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "lymphedema", "rehabilitation", "India", "travel"],
  image: "/uploads/articles/lymphedema-measure-visual.webp",
  imageAlt: "Lymphedema after breast cancer treatment showing arm swelling and lymphatic drainage",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer and Lymphedema: Symptoms, Prevention & Treatment in India",
  seoDescription:
    "Learn about lymphedema after breast cancer treatment, including causes, symptoms, risk factors, prevention, compression, exercise and treatment in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/lymphedema-measure-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer lymphedema",
    "lymphedema after breast cancer",
    "breast cancer related lymphedema",
    "lymphedema after lymph node removal",
    "breast cancer lymphedema symptoms",
    "arm swelling after breast cancer surgery",
    "lymphedema after mastectomy",
    "lymphedema after lumpectomy",
    "lymphedema after axillary lymph node dissection",
    "breast cancer lymphedema treatment",
    "lymphedema treatment in India",
    "lymphedema prevention after breast cancer",
    "breast cancer surgery lymphedema",
    "lymphoedema after breast cancer",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Surgery in India", href: SURGERY },
    { label: "Radiation therapy", href: RAD },
    { label: "Radiation side effects", href: RAD_SE },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_breast_cancer_surgery_in_india",
  "art_radiation_therapy_for_breast_cancer",
  "art_breast_cancer_radiation_side_effects",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Lymphedema", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
