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
const LUMPECTOMY_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const MASTECTOMY_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const NSM_DOCTORS = "/doctors/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const NSM_COST = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCOPLASTIC_DOCTORS = "/doctors/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const ONCOPLASTIC_COST = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT_COST = "/costs/India/Radiation-Oncology/EBRT";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Breast reconstruction after mastectomy is a surgical procedure used to rebuild the shape and appearance of the breast after breast cancer surgery. Reconstruction can be performed at the same time as mastectomy (immediate reconstruction) or months or years later (delayed reconstruction).</p><p class="article-quick-answer__body">The main options include implant-based reconstruction and autologous reconstruction, which uses tissue from another part of the patient's body. Some patients may also undergo nipple-sparing mastectomy, allowing the nipple and surrounding skin to be preserved when medically appropriate.</p><p class="article-quick-answer__body">The choice depends on factors such as the type and stage of breast cancer, planned radiation or chemotherapy, breast anatomy, overall health, previous surgeries, personal preferences and the reconstructive surgeon's assessment. Reconstruction may involve one or more operations, and recovery varies according to the technique used.</p><p class="article-quick-answer__body">The cost of breast reconstruction in India varies considerably because it depends on the reconstruction technique, surgical complexity, hospital, implants or tissue-transfer requirements, investigations, length of stay and whether additional procedures are required. International patients should obtain a case-specific quotation after medical records and imaging have been reviewed.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A [mastectomy](${MASTECTOMY_COST}) removes some or all of the breast tissue as part of breast cancer treatment. Breast reconstruction is a surgical procedure that attempts to recreate the breast mound after this operation. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [cost guide](${COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about reconstruction timing",
    href: consult("Breast Reconstruction"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your surgery records](${wa("Please review my mastectomy records for breast reconstruction in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-reconstruction-implant-visual.webp",
    alt: "Reconstructive surgeon showing a silicone implant model to a clothed patient",
    caption: "Implant-based reconstruction uses an implant or a tissue expander. The alternative is autologous reconstruction using the patient's own tissue.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Breast Reconstruction After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Reconstruction can be performed during the same operation as mastectomy, after the mastectomy has healed, after completion of chemotherapy or radiation, or in stages over several months.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The goal is not to recreate a breast that is identical to the original breast. Instead, reconstruction aims to create a breast shape and contour that fits the patient's body and personal preferences.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast reconstruction is usually planned between the breast cancer surgeon and reconstructive/plastic surgeon. In some cases, radiation oncology and medical oncology are also involved because cancer treatment can affect when reconstruction should be performed. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) coordinate this as part of the broader treatment pathway rather than as an isolated cosmetic procedure.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Do Patients Consider Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "After mastectomy, some patients choose reconstruction because they want to restore breast shape or feel more comfortable with their body. Others may decide not to have reconstruction and instead use an external breast prosthesis or choose a flat closure.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single reconstruction option that is appropriate for every patient. The decision may depend on cancer treatment requirements, type of mastectomy, whether radiation therapy is planned, breast size and shape, available tissue, previous abdominal or chest surgery, general health, smoking status, body weight, personal preferences, expected recovery time and willingness to undergo additional procedures.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Immediate vs Delayed Breast Reconstruction",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-reconstruction-timing-visual.webp",
    alt: "Two patients with a surgeon illustrating immediate versus delayed reconstruction timing",
    caption: "Immediate reconstruction happens in the same operation as mastectomy. Delayed reconstruction waits until cancer treatment has progressed or finished.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Immediate Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Immediate reconstruction is performed during the same surgical session as the mastectomy — for example, mastectomy → reconstruction during the same operation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential advantages include reconstructing the breast during the initial surgery, retaining more of the natural breast skin in some patients, avoiding a separate period without a reconstructed breast, and fewer separate major operations in selected cases.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `However, immediate reconstruction is not suitable for everyone. If additional cancer treatment is expected, particularly [radiation therapy](${EBRT_COST}), the timing and reconstruction technique require careful planning.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Delayed Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Delayed reconstruction is performed after the mastectomy. It may take place several months later, after [chemotherapy](${CHEMO_COST}), after radiation therapy, or after other cancer treatments have been completed.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Delayed reconstruction may be considered when the priority is completing cancer treatment first or when radiation could significantly influence the reconstruction strategy. The interval between mastectomy and reconstruction varies from patient to patient.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask whether immediate or delayed reconstruction fits](${consult("Breast Reconstruction")}) · [WhatsApp +91 90443 46292](${wa("Should my reconstruction be immediate or delayed after mastectomy?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Main Types of Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast reconstruction generally falls into two broad categories: implant-based reconstruction and autologous or tissue-based reconstruction. Some patients undergo a combination of techniques.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "1. Implant-Based Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Implant reconstruction uses a breast implant to create the reconstructed breast. In some cases, reconstruction can involve placement of an implant directly during surgery. In other cases, a tissue expander is initially used.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Is a Tissue Expander?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A tissue expander is a temporary device used to gradually stretch the breast skin and surrounding tissues. The process may involve placement of the expander during surgery, gradual expansion over time, and replacement of the expander with a permanent implant during another procedure.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential advantages of implant-based reconstruction may include avoiding tissue from another part of the body, less extensive surgery than some tissue-transfer procedures, and a relatively predictable breast volume.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential limitations can include multiple procedures, implant-related complications, capsular contracture, infection, implant displacement and changes in breast appearance over time. Patients should discuss the expected lifespan of implants and the possibility of future procedures with their surgeon.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "2. Autologous Breast Reconstruction",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-reconstruction-tissue-visual.webp",
    alt: "Surgeon indicating a possible abdominal tissue-donor site on a clothed patient",
    caption: "Autologous reconstruction uses the patient's own tissue, often from the abdomen, back or thigh. It is a longer operation with a donor-site scar.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Autologous reconstruction uses the patient's own tissue to create the reconstructed breast. The tissue may come from the abdomen, back, thigh or other suitable donor sites.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The tissue can be transferred while maintaining its blood supply or may be completely detached and reconnected to blood vessels using microsurgical techniques. One commonly discussed approach is abdominal tissue reconstruction.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Potential advantages can include a breast made from the patient's own tissue, a more natural tissue feel in some patients, and no permanent breast implant.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Because tissue is taken from another part of the body, the procedure can involve a longer operation, a donor-site scar, longer recovery, additional surgical risks and more complex postoperative monitoring. Not every patient has sufficient tissue or is medically suitable for this type of reconstruction.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Implant vs Autologous Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Implant-Based | Autologous Reconstruction |\n| --- | --- | --- |\n| Main material | Breast implant | Patient's own tissue |\n| Donor site required | No | Yes |\n| Surgical complexity | Often lower, depending on case | Often more complex |\n| Multiple procedures | May be required | May be required |\n| Recovery | Depends on technique | Often longer |\n| Effect of radiation | Important consideration | Also important |\n| Suitable for everyone | No | No |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast Reconstruction Doctors in India](${RECON_DOCTORS})\n- [Breast Reconstruction Cost in India](${RECON_COST})`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "WhatsApp +91 90443 46292 about implant vs tissue",
    href: wa("Please advise whether implant or autologous reconstruction is more suitable in my case."),
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Reconstruction Be Done With Nipple-Sparing Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `In selected patients, breast reconstruction can be performed alongside [nipple-sparing mastectomy](${NSM_COST}). During nipple-sparing mastectomy, breast tissue is removed while the nipple-areola complex and some of the surrounding breast skin are preserved.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This can potentially provide a more natural breast appearance after reconstruction. However, nipple-sparing surgery is not appropriate for every breast cancer patient. Factors considered may include tumour location, tumour involvement near the nipple, breast anatomy, cancer characteristics, surgical assessment and patient-specific risk factors.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Nipple-Sparing Mastectomy Doctors in India](${NSM_DOCTORS})\n- [Nipple-Sparing Mastectomy Cost](${NSM_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction and Oncoplastic Surgery: Are They the Same?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Oncoplastic breast surgery](${ONCOPLASTIC_COST}) combines cancer surgery with plastic-surgery principles to reshape the breast after removal of the tumour. It is commonly associated with [breast-conserving surgery](${LUMPECTOMY_COST}), although reconstructive techniques can be used in different breast cancer operations.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast reconstruction after mastectomy, on the other hand, generally involves rebuilding the breast after most or all of the breast tissue has been removed. Both approaches aim to achieve an appropriate cancer operation while considering breast appearance and body shape.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Oncoplastic Breast Surgery Doctors in India](${ONCOPLASTIC_DOCTORS})\n- [Oncoplastic Breast Surgery Cost](${ONCOPLASTIC_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Does Radiation Therapy Affect Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation therapy is an important factor when planning reconstruction. Radiation can affect the skin and underlying tissues and may influence healing and the final appearance of a reconstructed breast.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For this reason, the treatment team may discuss whether radiation is required, whether reconstruction should be immediate or delayed, which reconstructive technique may be appropriate, and whether additional procedures could be needed later. There is no universal rule. This is particularly important for patients who require [post-mastectomy radiation](${EBRT_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens Before Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before surgery, the medical team usually reviews the patient's complete cancer and treatment history. This may include [diagnosis](${DIAGNOSIS}) records — biopsy reports, histopathology, tumour characteristics, [ER, PR and HER2 status](${BIOMARKERS}), imaging and [cancer stage](${STAGES}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Doctors may also need information about previous breast surgery, chemotherapy, radiation therapy, hormone therapy, targeted treatment, other medical conditions and previous abdominal or chest operations.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The reconstructive surgeon evaluates breast size and shape, skin availability, chest-wall anatomy, available donor tissue and scarring from previous procedures. If radiation or additional systemic treatment is expected, these factors are incorporated into the reconstruction plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens During Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The exact operation depends on the reconstruction technique.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Implant-based reconstruction:** mastectomy → implant or tissue expander placement → healing → further expansion or implant exchange if required. Some patients may need additional procedures to improve symmetry.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "**Autologous reconstruction:** mastectomy → tissue harvested from donor area → tissue transferred to the chest → blood vessels connected where required → breast shaped and reconstructed. The actual procedure is considerably more detailed and varies between reconstructive techniques.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does Recovery Take?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/breast-reconstruction-recovery-visual.webp",
    alt: "International patient with a suitcase and discharge folder during a postoperative dressing check",
    caption: "Recovery and travel clearance depend on the technique. Tissue-based reconstruction usually needs a longer stay than a straightforward implant procedure.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Recovery depends heavily on the type of reconstruction. A straightforward implant-based reconstruction may have a different recovery pathway from a complex tissue-transfer operation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "During recovery, patients may experience pain or tightness, swelling, bruising, temporary changes in sensation, reduced physical activity, incision discomfort and fatigue. Patients undergoing tissue-based reconstruction may also need to recover from the donor-site operation.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The surgeon will provide specific instructions regarding wound care, physical activity, lifting restrictions, exercise, driving, work and follow-up appointments.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Possible Complications of Breast Reconstruction",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Like other major surgical procedures, breast reconstruction carries risks. Potential complications may include infection, bleeding, fluid accumulation, wound-healing problems, scarring, changes in sensation, asymmetry, implant-related complications, capsular contracture, tissue loss in flap reconstruction, donor-site complications and the need for additional surgery.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The actual risk varies according to the technique, patient factors and other cancer treatments. Patients should discuss procedure-specific risks with the reconstructive surgeon before surgery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Will the Reconstructed Breast Feel the Same?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Usually, a reconstructed breast does not feel exactly the same as the original breast. Sensation can change substantially after mastectomy because breast tissue and nerves are removed or altered.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients experience numbness, reduced sensation, altered sensitivity, tightness or gradual changes in sensation over time. The final appearance and feel also depend on the reconstruction method.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Reconstruction Be Done Years After Mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Delayed breast reconstruction can be performed months or even years after mastectomy in appropriately selected patients. A patient who previously chose not to undergo reconstruction can discuss reconstructive options later.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The reconstructive plan may be influenced by previous radiation, previous surgery, scar tissue, available tissue, current health and cancer history. A new surgical assessment is required before proceeding.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Breast Reconstruction Treat Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `No. Breast reconstruction is intended to restore breast shape after cancer surgery. It does not replace cancer treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast cancer treatment may involve [surgery](${MASTECTOMY_COST}), [chemotherapy](${CHEMO_COST}), [radiation therapy](${EBRT_COST}), [hormone therapy](${HORMONE_COST}), [targeted therapy](${TARGETED_COST}) and [immunotherapy](${IMMUNO_COST}). The cancer treatment plan always takes priority when determining reconstruction timing. See [Breast Cancer Treatment in India](${PILLAR}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction After Mastectomy: What About Radiation and Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Chemotherapy** may be given before or after surgery depending on the cancer subtype and [treatment-by-stage](${BY_STAGE}) plan. If chemotherapy is planned, the timing of reconstruction needs to be coordinated with systemic treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Radiation** may be recommended after mastectomy for selected patients. Because radiation can affect reconstructed tissues, the reconstructive surgeon and radiation oncologist should coordinate treatment planning.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `**Hormone therapy** for [hormone receptor-positive](${HORMONE}) disease generally does not require the same surgical scheduling considerations as chemotherapy or radiation, but the overall cancer treatment plan remains relevant. [HER2-positive](${HER2}) disease may add targeted therapy to the sequence.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Reconstruction Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single fixed price for breast reconstruction in India. The final cost can vary substantially. See [Breast Reconstruction Cost in India](${RECON_COST}) and the [breast cancer treatment cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Major cost factors may include the type of reconstruction, implant or tissue-expander requirements, autologous tissue-transfer technique, surgical complexity, hospital charges, surgeon and specialist fees, anaesthesia, diagnostic investigations, medicines, length of hospital stay, additional procedures, follow-up treatment and management of complications if they occur.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a reconstruction quotation",
    href: consult("Breast Reconstruction"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific quote](${wa("Please send a case-specific quotation for breast reconstruction after mastectomy in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction Cost vs Mastectomy Cost",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `These are not necessarily the same surgical expense. A [mastectomy](${MASTECTOMY_COST}) is the cancer-removal operation. Breast reconstruction is an additional reconstructive procedure that may be performed during the same operation or separately.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on the treatment plan, a patient may therefore receive a quotation covering mastectomy, reconstruction, hospitalization, anaesthesia, implants or reconstructive materials, diagnostic tests and postoperative care. Patients should ask hospitals to clearly explain what is included.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Mastectomy Doctors in India](${MASTECTOMY_DOCTORS})\n- [Mastectomy Cost in India](${MASTECTOMY_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction for International Patients",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `India is a treatment destination for international patients seeking breast cancer surgery and reconstructive procedures. Preparation is particularly important because reconstruction may involve significant recovery time. See the [international-patient guide](${INTL}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Before travelling, patients should ideally provide the biopsy report, histopathology, ER/PR/HER2 results, imaging reports and files, previous surgery records, chemotherapy and radiation records, medication list and medical history.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The patient may meet a breast surgical oncologist, reconstructive/plastic surgeon, medical oncologist, radiation oncologist, radiologist and pathologist. Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm what to send.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "International patients should allow sufficient time for the initial postoperative review, wound assessment, drain management where applicable, recovery and travel clearance. The exact duration should be determined by the treating team rather than relying on a standard number of days.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my mastectomy and reconstruction records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How to Choose a Breast Reconstruction Team in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Patients comparing hospitals should look beyond the reconstruction procedure itself. Important questions include whether the hospital has a multidisciplinary breast cancer team, whether the surgical team performs the required reconstruction technique, how radiation will affect the plan, what is included in the quotation, and what happens if another procedure is required.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ask specifically about the procedure being considered rather than simply asking whether a hospital performs \"breast reconstruction.\" Some reconstruction pathways involve staged procedures. Understanding this before treatment can help patients plan both financially and logistically.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask the Reconstructive Surgeon",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Am I medically suitable for breast reconstruction?",
      "Can I have immediate reconstruction?",
      "Would delayed reconstruction be more appropriate?",
      "Will I require radiation therapy?",
      "How could radiation affect reconstruction?",
      "Which reconstruction techniques are suitable for me?",
      "Would an implant or my own tissue be more appropriate?",
      "Will I need more than one operation?",
      "What will recovery involve?",
      "What complications should I know about?",
      "How will reconstruction affect future breast cancer follow-up?",
      "What costs are included in the treatment quotation?",
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
    text: "Can breast reconstruction be done at the same time as mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Immediate reconstruction can be performed during the same operation as mastectomy in selected patients.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can reconstruction be performed after radiation therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Reconstruction can be performed after radiation, although previous radiation can affect tissue quality and influence the choice of reconstruction technique.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is breast reconstruction mandatory after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Some patients choose reconstruction, while others prefer an external prosthesis or a flat closure.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Is breast reconstruction considered cosmetic surgery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In the context of breast cancer treatment, reconstruction is generally performed to restore the breast following cancer surgery. It should be considered as part of the overall cancer treatment and recovery plan.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Which is better: implants or tissue reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single option that is appropriate for everyone. The decision depends on anatomy, cancer treatment, radiation, health, available tissue and personal preferences.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can reconstruction be performed after nipple-sparing mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Nipple-sparing mastectomy is commonly considered in conjunction with reconstruction when the patient meets the appropriate criteria.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Will the reconstructed breast have normal sensation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Sensation is often altered after mastectomy and reconstruction. Numbness or reduced sensation can occur.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does breast reconstruction increase the risk of breast cancer coming back?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Reconstruction itself is not a substitute for cancer treatment. Decisions about recurrence risk and follow-up depend on the original cancer and its treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How many surgeries are required?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients complete reconstruction in one operation, while others require staged procedures. The number depends on the reconstruction technique and individual circumstances.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How much does breast reconstruction cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no universal price. The cost depends on the reconstruction technique, hospital, surgical complexity, implants or tissue-transfer requirements, investigations and other treatment factors.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can international patients undergo breast reconstruction in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes, international patients can seek breast reconstruction in India. Their medical records should ideally be reviewed before travel so the treating team can plan consultation, investigations and treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can breast reconstruction be done years after mastectomy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Delayed reconstruction may be considered months or years after mastectomy, depending on the patient's health, previous treatments and reconstructive options.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Reconstruction After Mastectomy in India: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast reconstruction is an important option for patients who have undergone or are planning mastectomy for breast cancer. The main approaches are implant-based reconstruction, tissue-based/autologous reconstruction, immediate reconstruction and delayed reconstruction.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The decision is influenced by cancer treatment, radiation requirements, breast anatomy, available tissue, overall health and personal preferences. For international patients, it is particularly important to have pathology, imaging and previous treatment records reviewed before travelling.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast reconstruction after mastectomy in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Breast Reconstruction Doctors in India](${RECON_DOCTORS})\n- [Breast Reconstruction Cost in India](${RECON_COST})\n- [Mastectomy Doctors in India](${MASTECTOMY_DOCTORS})\n- [Mastectomy Cost in India](${MASTECTOMY_COST})\n- [Nipple-Sparing Mastectomy Doctors in India](${NSM_DOCTORS})\n- [Nipple-Sparing Mastectomy Cost](${NSM_COST})\n- [Oncoplastic Breast Surgery Doctors in India](${ONCOPLASTIC_DOCTORS})\n- [Oncoplastic Breast Surgery Cost](${ONCOPLASTIC_COST})\n- [Hormone Therapy for Breast Cancer](${HORMONE})\n- [HER2-Positive Breast Cancer Treatment](${HER2})\n- [Breast Cancer Treatment by Stage](${BY_STAGE})\n- [Breast Cancer Treatment Cost in India](${COST})\n- [Treatment for international patients](${INTL})`,
  },
];

const now = "2026-09-27T18:00:00.000Z";
const SLUG = "breast-reconstruction-after-mastectomy-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_reconstruction_after_mastectomy_india",
  slug: SLUG,
  title: "Breast Reconstruction After Mastectomy: Options, Timing and Cost in India",
  excerpt:
    "Implant versus autologous reconstruction, immediate versus delayed timing, how radiation changes the plan, and why India quotes must be case-specific.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "breast reconstruction", "mastectomy", "India", "travel", "surgery"],
  image: "/uploads/articles/breast-reconstruction-implant-visual.webp",
  imageAlt:
    "Breast reconstruction options after mastectomy including implant and tissue-based reconstruction",
  status: "published",
  featured: true,
  seoTitle: "Breast Reconstruction After Mastectomy in India | Options & Cost",
  seoDescription:
    "Learn about breast reconstruction after mastectomy in India, including implant and tissue reconstruction, immediate or delayed surgery, recovery, radiation and cost.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-reconstruction-implant-visual.webp",
  allowIndex: true,
  keywords: [
    "breast reconstruction after mastectomy",
    "breast reconstruction in India",
    "breast reconstruction cost in India",
    "breast reconstruction after breast cancer",
    "breast reconstruction surgery India",
    "implant breast reconstruction India",
    "autologous breast reconstruction India",
    "immediate breast reconstruction",
    "delayed breast reconstruction",
    "breast reconstruction after mastectomy cost",
    "breast reconstruction surgeons in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Breast Reconstruction Cost in India", href: RECON_COST },
    { label: "Mastectomy Cost in India", href: MASTECTOMY_COST },
    { label: "Nipple-Sparing Mastectomy", href: NSM_COST },
    { label: "Oncoplastic Breast Surgery", href: ONCOPLASTIC_COST },
    { label: "Hormone Therapy for Breast Cancer", href: HORMONE },
    { label: "HER2-Positive Breast Cancer Treatment", href: HER2 },
    { label: "Breast Cancer Treatment Cost in India", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) {
  store.categories.push("Surgical Oncology");
}
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  {
    id: "media_recon_implant",
    url: "/uploads/articles/breast-reconstruction-implant-visual.webp",
    name: "breast-reconstruction-implant-visual.webp",
    alt: article.imageAlt,
    addedAt: now,
  },
  {
    id: "media_recon_timing",
    url: "/uploads/articles/breast-reconstruction-timing-visual.webp",
    name: "breast-reconstruction-timing-visual.webp",
    alt: "Immediate versus delayed reconstruction timing",
    addedAt: now,
  },
  {
    id: "media_recon_tissue",
    url: "/uploads/articles/breast-reconstruction-tissue-visual.webp",
    name: "breast-reconstruction-tissue-visual.webp",
    alt: "Autologous tissue-donor site planning",
    addedAt: now,
  },
  {
    id: "media_recon_recovery",
    url: "/uploads/articles/breast-reconstruction-recovery-visual.webp",
    name: "breast-reconstruction-recovery-visual.webp",
    alt: "Postoperative recovery for an international reconstruction patient",
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
      label: "Breast Reconstruction After Mastectomy in India",
      href: HREF,
    });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
