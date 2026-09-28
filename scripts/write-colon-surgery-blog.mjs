import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/colon-cancer-treatment-in-india";
const SURGERY_BLOG = "/blogs/colon-cancer-surgery-in-india";
const COLECTOMY = "/costs/India/Surgical-Oncology/Colectomy";
const CRC_SURG = "/costs/India/Surgical-Gastroenterology/Colorectal-Cancer-Surgery";
const RECTAL = "/costs/India/Surgical-Oncology/Rectal-Cancer-Surgery";
const LIVER = "/costs/India/Surgical-Oncology/Liver-Resection-(Hepatectomy)";
const CRS = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery";
const HIPEC = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const OSTOMY = "/costs/India/Surgical-Gastroenterology/Ostomy-Stoma-Surgery";
const COLONOSCOPY = "/costs/India/Gastroenterology/Colonoscopy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const GI_DOCS = "/doctors/India/Surgical-Gastroenterology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
const BREAST = "/treatments/breast-cancer-treatment-in-india";
const PROSTATE = "/treatments/prostate-cancer-treatment-in-india";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (markup) => ({ id: id("html"), type: "html", html: markup });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>Colon cancer surgery is usually performed by removing the cancer-bearing section of the colon along with surrounding tissue and nearby lymph nodes.</strong></p><p class="article-quick-answer__body">The type of operation depends mainly on <strong>where the tumour is located</strong>.</p><p class="article-quick-answer__body">Common operations include:</p><ul class="article-quick-answer__list"><li>Right hemicolectomy</li><li>Extended right hemicolectomy</li><li>Left hemicolectomy</li><li>Extended left hemicolectomy</li><li>Sigmoid colectomy</li><li>Transverse colectomy</li><li>Subtotal colectomy</li><li>Total colectomy in selected patients</li><li>Local/endoscopic removal for certain very early cancers</li></ul><p class="article-quick-answer__body">Surgery may be performed through:</p><ul class="article-quick-answer__list"><li><strong>Open surgery</strong></li><li><strong>Laparoscopic surgery</strong></li><li><strong>Robotic-assisted surgery</strong></li></ul><p class="article-quick-answer__body">After removing the tumour, the surgeon may reconnect the bowel. This connection is called an <strong>anastomosis</strong>.</p><p class="article-quick-answer__body">Some patients require a temporary or permanent <strong>ileostomy or colostomy</strong>, depending on the operation and clinical circumstances.</p><p class="article-quick-answer__body">The removed tissue is examined by a pathologist to determine the final stage and other features that may influence further treatment.</p></aside>`;

const locTable = `<div class="md-body"><table><thead><tr><th>Tumour location</th><th>Possible operation</th></tr></thead><tbody><tr><td>Caecum</td><td>Right hemicolectomy</td></tr><tr><td>Ascending colon</td><td>Right hemicolectomy</td></tr><tr><td>Hepatic flexure</td><td>Right or extended right hemicolectomy</td></tr><tr><td>Transverse colon</td><td>Transverse or extended colectomy</td></tr><tr><td>Splenic flexure</td><td>Left or extended left hemicolectomy</td></tr><tr><td>Descending colon</td><td>Left hemicolectomy</td></tr><tr><td>Sigmoid colon</td><td>Sigmoid colectomy</td></tr></tbody></table></div>`;

const approachTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Open</th><th>Laparoscopic</th><th>Robotic</th></tr></thead><tbody><tr><td>Incision</td><td>Larger</td><td>Several small incisions</td><td>Several small incisions</td></tr><tr><td>Camera</td><td>Direct/open view</td><td>Laparoscope</td><td>Robotic 3D camera</td></tr><tr><td>Surgeon control</td><td>Direct</td><td>Direct instrument control</td><td>Console-controlled instruments</td></tr><tr><td>Recovery</td><td>Often longer</td><td>Often faster</td><td>Often comparable to minimally invasive recovery</td></tr><tr><td>Cost</td><td>Usually lower than robotic</td><td>Variable</td><td>Usually higher</td></tr><tr><td>Availability</td><td>Widely available</td><td>Widely available at major centres</td><td>Selected centres</td></tr><tr><td>Suitable for</td><td>Complex and routine cases</td><td>Many suitable cases</td><td>Selected suitable cases</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${CRC_SURG}">Colorectal cancer surgery</a></td><td>$8,000–$20,000</td></tr><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td></tr><tr><td><a href="${LIVER}">Liver resection</a></td><td>$10,000–$26,000</td></tr><tr><td><a href="${HIPEC}">CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td><a href="${OSTOMY}">Ostomy / stoma surgery</a></td><td>$2,500–$6,800</td></tr><tr><td><a href="${EBRT}">EBRT</a> when indicated</td><td>$1,000–$6,000+</td></tr></tbody></table></div>`;

const faqs = [
  ["What is the most common surgery for colon cancer?", "The operation depends on tumour location. Segmental colectomy, including right or left hemicolectomy and sigmoid colectomy, are commonly performed depending on where the cancer is located."],
  ["Is colon cancer surgery possible through laparoscopy?", "Yes. Laparoscopic colectomy is an established approach for many suitable patients. However, open surgery may be more appropriate for certain complex or emergency cases."],
  ["Is robotic colon cancer surgery available in India?", "Yes. Robotic-assisted colorectal surgery is available at selected Indian hospitals. Its suitability depends on the tumour, patient anatomy and surgeon expertise."],
  ["Is robotic surgery better than laparoscopic surgery?", "Neither should automatically be considered better for every patient. Both are minimally invasive approaches, and the appropriate technique depends on the individual clinical situation."],
  ["How much colon is removed during surgery?", "The amount depends on tumour location and the required oncological resection. Usually, only the affected section and associated regional lymphatic tissue are removed rather than the entire colon."],
  ["Will I need a colostomy?", "Not necessarily. Many patients have their bowel reconnected during the operation. A temporary or permanent stoma may be necessary in selected situations."],
  ["How many lymph nodes are removed?", "The number varies, but examination of at least 12 regional lymph nodes is generally used as an important benchmark for adequate pathological staging."],
  ["How long do I stay in hospital after colon cancer surgery?", "Many patients remain in hospital for several days and sometimes around a week, depending on the operation and recovery. Complications can extend the stay. GAF planning notes for colectomy are typically 5–10 nights."],
  ["How long does recovery take?", "Initial recovery often takes several weeks, while complete recovery from major abdominal surgery can take longer."],
  ["Can colon cancer surgery be done in Stage 4 disease?", "Yes, in selected patients. Surgery may be considered for the primary tumour or metastatic disease in the liver, lungs or peritoneum depending on resectability and treatment goals."],
  ["Can liver metastases be removed during colon cancer treatment?", "Selected patients can undergo liver resection or other local treatment. A multidisciplinary assessment is required."],
  ["What happens after colon cancer surgery?", "The surgical specimen is examined by pathology. The final stage and pathological characteristics help determine whether chemotherapy or other treatment is required."],
  ["Is chemotherapy always required after surgery?", "No. The need for chemotherapy depends on the pathological stage and risk factors."],
  ["What is the cost of colon cancer surgery in India?", "The cost varies by hospital, city, surgical technique, complexity, ICU requirement, length of stay, pathology and other treatment needs. GAF planning ranges include approximately $7,000–$18,000 for colectomy and $8,000–$20,000 for colorectal cancer surgery. An individualized quotation is more reliable than a single national average."],
  ["Can international patients undergo colon cancer surgery in India?", "Yes. Major Indian hospitals treat international patients and may coordinate medical records, consultations, treatment estimates and other logistics."],
  ["Should I get a second opinion before colon cancer surgery?", "A second opinion can be useful when major surgery has been recommended, the disease is locally advanced or metastatic, or there are multiple possible treatment approaches."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Colon cancer surgery in India** involves removing the part of the colon containing the cancer, together with an appropriate margin of healthy tissue and regional lymph nodes. Depending on the location and extent of the tumour, surgery may be performed as a **partial colectomy, hemicolectomy, sigmoid colectomy, subtotal colectomy or, in selected cases, total colectomy**."),
  p("The operation may be performed using **open, laparoscopic or robotic-assisted surgery**. The choice depends on the tumour's location and extent, previous abdominal operations, bowel obstruction or perforation, the patient's overall health, the surgeon's expertise and the resources available at the hospital."),
  p("For many patients with localized colon cancer, surgery is the main treatment and may be performed with curative intent. Depending on the final pathology and stage, [chemotherapy](" + CHEMO + ") may be recommended after surgery."),
  p("For patients with metastatic colon cancer, surgery may still have an important role in selected situations, particularly when the primary tumour is causing obstruction or bleeding, or when metastatic disease in organs such as the [liver](" + LIVER + ") or lungs can potentially be treated surgically."),
  p("This article is the surgery hub for the colon cluster. The broader pathway — stage, molecular tests and systemic medicines — is in [Colon Cancer Treatment in India](" + PILLAR + "). It is **not** a rectal-cancer page: tumours of the rectum often need a different mix of surgery, chemotherapy and radiation. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [colectomy](" + COLECTOMY + ") are **$7,000–$18,000** (typically 5–10 nights). The broader [colorectal cancer surgery](" + CRC_SURG + ") sheet lists **$8,000–$20,000**. These are planning ranges, not hospital quotations."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") and [surgical gastroenterologists](" + GI_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/doctors/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/doctors/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology/Colectomy). Partner [surgical-oncology hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) are a typical first filter."),
  btn("Ask about colon cancer surgery in India", consult("Colon Cancer Surgery")),
  p("[WhatsApp +91 90443 46292 with tumour location, colonoscopy and CT](" + wa("Please review my colon tumour location, colonoscopy and CT and advise which colectomy may be appropriate in India.") + ")"),
  img(
    "/uploads/articles/colon-sx-anatomy.webp",
    "Transparent adult body with a teal colon and a gold tumour overlay used to explain colon cancer surgery",
    "The operation follows tumour location and lymphatic drainage, not a brochure name such as robotic or laparoscopic.",
  ),

  h2("What Is Colon Cancer Surgery?"),
  p("Colon cancer surgery is an operation performed to remove a malignant tumour from the large intestine. For a typical colon cancer operation, the surgeon removes the section of colon containing the tumour, a margin of surrounding healthy tissue, and regional lymph nodes and associated lymphatic tissue."),
  p("The remaining ends of the bowel are often joined together. This is called an **anastomosis**. The exact amount of colon removed depends on tumour location, tumour size, depth of invasion, involvement of nearby structures, blood supply, lymphatic drainage, previous abdominal surgery, presence of obstruction or perforation, and whether metastatic disease is present."),
  p("The objective is not simply to remove the visible tumour. The operation must follow appropriate **oncological surgical principles** so that the cancer and relevant regional lymphatic tissue are adequately removed. The National Cancer Institute describes surgery as the most common treatment for colon cancer and includes polypectomy, local excision and partial colectomy among surgical approaches."),

  h2("Is Surgery Necessary for Colon Cancer?"),
  p("For many patients with localized colon cancer, surgery is the principal treatment. However, **not every colon cancer requires the same type of surgery**."),
  p("Very early cancers discovered within a suitable polyp may sometimes be completely removed during [colonoscopy](" + COLONOSCOPY + ") (**$200–$550**, day-care). Larger or deeper cancers generally require removal of the affected segment of the colon. Patients with advanced disease may need a combination of systemic treatment and surgery."),
  p("The decision depends on cancer stage, tumour location, resectability, molecular characteristics, presence of metastases, symptoms, general health and previous treatment. Indian Council of Medical Research guidance identifies resection as the treatment of choice for most patients with localized colon cancer, with subsequent treatment determined by pathology and stage."),
  btn("Ask whether colectomy is appropriate", consult("Colectomy")),

  h2("Types of Colon Cancer Surgery"),
  p("The operation is selected according to the tumour's location."),
  img(
    "/uploads/articles/colon-sx-resection.webp",
    "Transparent adult abdomen showing a teal right-colon segment and gold tumour used to explain right hemicolectomy",
    "Right hemicolectomy is a location decision. It is not an upgrade over left hemicolectomy.",
  ),
  h3("1. Right hemicolectomy"),
  p("A right hemicolectomy is generally performed for cancers involving the caecum, ascending colon, hepatic flexure or selected proximal transverse-colon tumours. The surgeon removes the affected portion of the right side of the colon along with regional lymph nodes. The remaining small intestine is usually joined to the remaining colon — an **ileocolic anastomosis**."),
  h3("2. Extended right hemicolectomy"),
  p("An extended right hemicolectomy removes more of the colon than a conventional right hemicolectomy. It may be considered when the tumour extends toward the transverse colon or when the location and blood supply require a wider resection."),
  h3("3. Left hemicolectomy"),
  p("A left hemicolectomy may be performed for cancers involving the descending colon, splenic flexure or selected distal transverse-colon tumours. The affected section is removed with its associated lymphatic drainage. The remaining colon is then connected to the appropriate downstream bowel."),
  h3("4. Extended left hemicolectomy"),
  p("In selected tumours involving the splenic flexure or adjacent portions of the colon, a more extensive left-sided resection may be required. The exact operation depends on tumour location and the need to obtain appropriate margins and lymph-node clearance."),
  h3("5. Sigmoid colectomy"),
  p("A sigmoid colectomy removes the sigmoid colon. After removal, the remaining colon is generally connected to the rectum when this is safe and technically appropriate."),
  h3("6. Transverse colectomy"),
  p("A transverse colectomy removes a portion of the transverse colon. For some transverse-colon tumours, an extended colectomy may be preferred to achieve appropriate oncological resection."),
  h3("7. Subtotal colectomy"),
  p("A subtotal colectomy removes most of the colon while leaving part of the colon behind. It may be considered for extensive synchronous disease, certain hereditary cancer syndromes, multiple polyps, synchronous tumours or selected emergency presentations. The decision is highly individualized."),
  h3("8. Total colectomy"),
  p("A total colectomy removes the entire colon. It is **not required for most colon cancer patients**. It may be considered in selected patients with familial adenomatous polyposis, extensive polyposis, synchronous cancers, certain inflammatory bowel disease-related situations, multiple high-risk lesions or other specific clinical circumstances. The American Cancer Society notes that total colectomy is not commonly required simply to remove an ordinary colon cancer."),
  h3("9. Local or endoscopic resection"),
  p("Some very early colon cancers may be removed through the colonoscope, including a malignant polyp or a carefully selected superficial lesion. If pathology suggests a significant risk of residual cancer or lymph-node involvement, formal colon resection may subsequently be recommended. Cancer Research UK describes local resection as an option for selected small, early colon cancers."),

  h2("Colon Cancer Surgery by Tumour Location"),
  html(locTable),
  p("This table is an overview rather than a surgical prescription. The actual operation is determined by the surgeon after reviewing imaging, colonoscopy, pathology and the patient's anatomy."),

  h2("Open vs Laparoscopic vs Robotic Colon Cancer Surgery"),
  p("One of the most common questions patients ask is: **which is better — open, laparoscopic or robotic colon cancer surgery?** There is no single answer for every patient. The important question is whether the chosen approach allows the cancer to be removed safely and according to accepted oncological principles."),
  img(
    "/uploads/articles/colon-sx-clinic.webp",
    "Adult patient in clinic with a colon overlay while a colorectal surgeon explains colectomy",
    "Ask why this approach is recommended for this tumour — not only which technology is newest.",
  ),
  h3("Open colon cancer surgery"),
  p("Open surgery is performed through a larger abdominal incision. It provides direct access, is useful for complex or extensive disease, may be preferred when minimally invasive surgery is unsuitable, and can be important in emergency surgery. Limitations include a larger incision, generally longer recovery compared with uncomplicated minimally invasive surgery, and potentially greater postoperative discomfort. Open surgery remains an important part of colorectal cancer surgery and is not an outdated procedure."),
  h3("Laparoscopic colon cancer surgery"),
  p("Laparoscopic surgery uses several small abdominal incisions, a camera and specialized instruments. Potential benefits include smaller incisions, less postoperative pain in many patients, earlier mobility, shorter recovery in suitable cases and smaller scars. Cancer Research UK notes that patients generally recover more quickly after keyhole surgery, while also emphasizing that some patients cannot have laparoscopic surgery and that conversion to open surgery may sometimes be necessary."),
  h3("Robotic colon cancer surgery"),
  p("Robotic-assisted surgery is another minimally invasive approach. The surgeon controls specialized robotic instruments from a console. The system can provide magnified three-dimensional visualization, articulating instruments, fine instrument control, stable camera positioning and improved ergonomics. **The robot does not perform the operation independently. The surgeon remains in control.** Robotic surgery may be useful for technically demanding procedures, but it is not automatically required for every colon cancer."),
  p("Neither laparoscopic nor robotic surgery should automatically be considered better for every patient. The choice can depend on tumour location, surgical complexity, patient anatomy, previous operations, surgeon experience, hospital resources, cost and availability. Patients should ask: **why are you recommending this approach for my tumour?**"),
  btn("Ask whether laparoscopic or robotic colectomy is appropriate", consult("Colectomy")),
  h3("When is open surgery preferred?"),
  p("Open surgery may be appropriate when the tumour is very large, the cancer involves adjacent organs, there is extensive local invasion, bowel perforation, severe obstruction, significant abdominal adhesions, emergency surgery is required, or minimally invasive surgery cannot safely achieve the required resection. Conversion from laparoscopic or robotic surgery to open surgery is not necessarily a surgical failure. It can be the safest decision for the patient."),

  h2("What Is an Oncologically Adequate Colon Cancer Operation?"),
  p("A cancer operation is not judged only by how small the incision is. Important considerations include adequate bowel margins, appropriate lymph-node removal, correct vascular and mesocolic dissection, avoidance of tumour disruption, complete removal of involved adjacent structures when necessary, and proper pathological assessment."),
  p("The American Cancer Society states that at least **12 nearby lymph nodes** are generally removed and examined during colon cancer surgery. The number retrieved can vary depending on the operation and individual anatomy. The pathology report should document the number of nodes examined and how many contain cancer."),

  h2("What Happens to the Removed Colon?"),
  p("After surgery, the specimen is sent to a pathology laboratory. The pathologist examines tumour type, tumour size, depth of invasion, surgical margins, lymph nodes, lymphovascular invasion, perineural invasion and other pathological features. The final pathology determines the **pathological stage** and may determine whether chemotherapy or other postoperative treatment is recommended. Additional [molecular testing](" + PRECISION + ") (**$2,000–$7,000**) may use this tissue."),

  h2("What Is an Anastomosis?"),
  p("An anastomosis is a surgical connection between two sections of bowel — for example small intestine to remaining colon, or remaining colon to rectum. A major concern after colorectal surgery is an **anastomotic leak**, where the surgical connection does not heal completely. The risk varies according to the type of operation and patient factors."),

  h2("Colostomy, Ileostomy and Stomas"),
  p("A **colostomy** creates an opening of the colon through the abdominal wall so stool exits into an external pouch. It can be temporary or permanent. An **ileostomy** brings the end of the small intestine through the abdominal wall and can divert stool away from a healing bowel connection. It is sometimes temporary and can potentially be reversed after adequate healing."),
  p("**Not every patient needs a stoma.** Many patients undergoing colon cancer surgery do not require a permanent stoma. A stoma may be considered when the bowel cannot safely be reconnected, there is obstruction or perforation, emergency surgery is required, the surgical connection needs protection, the disease involves multiple bowel segments, or an immediate anastomosis is unsafe. Cancer Research UK notes that whether a permanent stoma is required can sometimes only become clear during the operation. [Ostomy / stoma surgery](" + OSTOMY + ") planning ranges are **$2,500–$6,800**."),
  p("[WhatsApp +91 90443 46292 about whether a stoma is likely](" + wa("Please advise whether a temporary or permanent stoma is likely with my planned colon cancer surgery in India.") + ")"),

  h2("Colon Cancer Surgery for Obstruction or Perforation"),
  p("A colon tumour can block the passage of stool — **malignant bowel obstruction**. Symptoms can include severe abdominal pain, abdominal swelling, vomiting, constipation, inability to pass gas and cramping. This can become a surgical emergency. Treatment may include emergency colectomy, stoma formation, colonic stent in selected cases, diversion, or planned surgery after the obstruction is relieved."),
  p("A tumour can occasionally cause a hole in the colon — **perforation** — with contamination of the abdominal cavity and severe infection. Emergency surgery carries different risks from planned elective surgery."),
  p("**Severe abdominal pain with vomiting, inability to pass stool or gas, sudden abdominal distension, fever after a known perforation risk, or collapse requires urgent assessment in a local emergency department — not a delayed WhatsApp message.**"),

  h2("When the Tumour Invades Nearby Organs"),
  p("Sometimes colon cancer grows directly into neighbouring structures such as small intestine, abdominal wall, bladder, ureter, stomach, pancreas or other adjacent tissues. If the disease remains potentially removable, the surgeon may perform an **en bloc resection**, removing the tumour and involved adjacent structures together rather than cutting through the tumour. Such surgery should generally be planned at a centre experienced in complex gastrointestinal oncology."),

  h2("Can Stage 4 Colon Cancer Be Treated With Surgery?"),
  p("Yes, in selected patients. Stage IV colon cancer does not automatically mean that surgery has no role. Surgery may be considered when liver metastases are potentially removable, lung metastases are limited and potentially treatable, the primary tumour causes obstruction or significant bleeding, metastatic disease responds sufficiently to systemic therapy, or the overall pattern of disease permits potentially complete treatment."),
  p("Some patients may undergo systemic therapy first and surgery later. This is sometimes called **conversion therapy** when initially unresectable metastatic disease becomes potentially resectable following treatment. Recent India-specific consensus work emphasizes individualized management of metastatic colorectal cancer, including assessment of potentially curable oligometastatic disease."),
  img(
    "/uploads/articles/colon-sx-liver.webp",
    "Transparent adult torso showing a gold colon tumour and teal liver metastases used to explain selected liver surgery",
    "A liver metastasis does not automatically mean surgery is impossible. Number, size, vessels and remaining liver decide.",
  ),
  h3("Liver metastasis surgery"),
  p("The liver is a common site for colorectal cancer metastasis. Selected patients may undergo liver resection, ablation, combined colorectal and liver surgery, systemic therapy followed by liver surgery, or other local treatments. GAF planning ranges for [liver resection (hepatectomy)](" + LIVER + ") are **$10,000–$26,000**."),
  btn("Ask about liver-metastasis surgery", consult("Liver Resection (Hepatectomy)")),
  h3("Lung metastasis surgery"),
  p("Selected patients with lung metastases may be evaluated for pulmonary metastasectomy, ablation, stereotactic radiation or systemic treatment."),
  h3("CRS and HIPEC"),
  p("Some colon cancers spread to the peritoneum. In selected patients, treatment may involve [cytoreductive surgery](" + CRS + ") (**$10,000–$24,000**) with or without [HIPEC](" + HIPEC + ") (**$18,000–$40,000**). CRS/HIPEC is a highly specialised procedure and should not be presented as routine treatment for every patient with metastatic colon cancer."),

  h2("Who Is a Candidate for Colon Cancer Surgery?"),
  p("The surgical team generally evaluates tumour location, size, local invasion, lymph-node involvement, distant metastases, obstruction, perforation and bleeding; plus age, heart, lung, kidney and liver function, nutritional status, physical fitness, previous abdominal surgery and other medical conditions; plus previous chemotherapy or radiation, molecular profile and response to systemic treatment."),

  h2("Tests and Preparation Before Surgery"),
  p("Preoperative assessment may include complete blood count, kidney and liver function, electrolytes, blood sugar, ECG, chest assessment, anaesthesia evaluation, CEA, CT imaging, colonoscopy and biopsy/pathology review. ICMR's colorectal cancer consensus recommends colonoscopy with biopsy, appropriate CT imaging for colon cancer, blood tests and CEA as part of the diagnostic and staging evaluation."),
  p("The surgical team may advise patients to stop smoking, reduce alcohol, improve nutrition, correct anaemia, control diabetes, review medications, maintain physical activity where possible, complete bowel preparation when required, follow fasting instructions and arrange postoperative support. Enhanced Recovery After Surgery, or **ERAS**, pathways are designed to reduce unnecessary physiological stress. Updated ERAS Society recommendations were published in 2025."),

  h2("What Happens on the Day of Surgery?"),
  p("Most elective colon cancer operations are performed under general anaesthesia. During surgery the abdomen is accessed through the selected approach, the tumour-bearing section is identified and mobilised, associated blood vessels and lymphatic tissue are addressed, the affected section is removed, the specimen is sent for pathology, the bowel is reconnected when appropriate, a stoma may be created if required, and the wounds are closed. There is no single standard operating time. A straightforward colectomy may take several hours, while complex multivisceral or metastatic surgery can take considerably longer."),

  h2("Hospital Stay and Recovery"),
  p("Hospital stay varies with type of surgery, open versus minimally invasive approach, age, general health, bowel function, ability to eat and drink, pain control, mobility, complications and presence of a stoma. Cancer Research UK notes that patients undergoing colectomy may stay in hospital for around a week, although the exact duration varies. GAF planning notes **5–10 nights** for [colectomy](" + COLECTOMY + "). With modern enhanced-recovery pathways, some patients may be discharged earlier when they meet appropriate recovery criteria."),
  p("Many patients feel substantially better within several weeks, but full recovery from major abdominal surgery can take longer. Recovery may be slower after open surgery, emergency surgery, extensive resection, complications, malnutrition, older age or significant medical conditions."),
  h3("Diet and bowel changes"),
  p("Eating patterns often change temporarily. Patients may initially tolerate smaller meals, easily digested foods, adequate fluids and protein-rich foods. As bowel function stabilises, the diet can generally be expanded. Some patients notice more frequent bowel movements, loose stools, constipation, urgency or gas. Persistent or severe bowel problems should be discussed with the treating team."),
  h3("Possible complications"),
  p("Possible complications include bleeding, infection, blood clots, pneumonia, wound infection, bowel obstruction, ileus, anastomotic leak, urinary complications, injury to nearby structures, heart or lung complications, need for reoperation and stoma-related complications. An **anastomotic leak** occurs when the bowel connection does not heal properly. Possible symptoms include fever, increasing abdominal pain, rapid heart rate, abdominal swelling and feeling increasingly unwell. Treatment may involve antibiotics, drainage, bowel rest, interventional radiology or additional surgery."),
  p("There is a common fear that operating on a cancer tumour will cause it to spread. Modern oncological surgery is specifically designed to remove the tumour without unnecessary disruption. There is no reason to avoid a medically indicated colon cancer operation because of a general fear that surgery itself will “spread” the cancer."),

  h2("Colon Cancer Surgery and Chemotherapy"),
  p("Surgery and chemotherapy often work together. For localized colon cancer the sequence is often **surgery → pathology → decision about chemotherapy**. For Stage III colon cancer, postoperative chemotherapy is commonly considered. For selected Stage II cancers, chemotherapy may be considered when high-risk pathological features are present. ICMR guidance specifically identifies Stage III and selected high-risk Stage II patients as groups in whom postoperative chemotherapy may be considered. GAF planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**. [Targeted therapy](" + TARGETED + ") (**$8,000–$30,000**) and [immunotherapy](" + IMMUNO + ") (**$15,000–$45,000**) are generally more relevant in advanced disease."),
  btn("Ask about chemotherapy after colectomy", consult("Chemotherapy")),

  h2("Colon Cancer Surgery Cost in India"),
  p("There is **no single price** that applies to every patient. The final cost can depend on type of colectomy, open/laparoscopic/robotic approach, hospital, city, surgeon, operating-room time, anaesthesia, ICU, room category, pathology, molecular testing, length of stay, complications, additional organ resection, stoma creation and postoperative chemotherapy."),
  html(costTable),
  p("A generic “colon cancer surgery package” can be misleading because two patients with the same diagnosis may require very different operations. City pages such as [Delhi NCR colectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/costs/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/costs/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/costs/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/costs/India/Hyderabad/Surgical-Oncology/Colectomy) use the same national range unless a hospital issues a verified quotation."),
  btn("Ask for an itemised colectomy quotation", consult("Colon Cancer Surgery Cost in India")),
  p("[WhatsApp +91 90443 46292 for drug, stay and surgery pricing](" + wa("Please send an itemised colon cancer surgery quotation in India covering the colectomy, stay, pathology and any planned chemotherapy.") + ")"),

  h2("How to Choose a Hospital for Colon Cancer Surgery in India"),
  p("Look for colorectal surgical expertise, gastrointestinal pathology with molecular testing, on-site [medical oncology](" + MED_DOCS + "), advanced imaging, minimally invasive surgery where appropriate, ability to manage locally advanced and metastatic disease, intensive care, multidisciplinary cancer care and international-patient support."),
  ul([
    "[Surgical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology)",
    "[Surgical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Surgical-Oncology)",
    "[Surgical oncology hospitals in Chennai](/hospitals/India/Chennai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Surgical-Oncology)",
  ]),

  h2("Questions to Ask a Colon Cancer Surgeon"),
  ol([
    "Where exactly is my tumour located, and what operation are you recommending?",
    "How much colon and how many lymph nodes will be removed?",
    "Will the operation be open, laparoscopic or robotic, and why?",
    "Is there a possibility of converting to open surgery or needing a temporary or permanent stoma?",
    "What are the major risks, expected hospital stay and recovery time?",
    "When will pathology and molecular testing be available, and could I need chemotherapy afterwards?",
    "If there are liver or lung metastases, can they be treated surgically, and what is the estimated total cost?",
  ]),

  h2("Warning Signs After Colon Cancer Surgery"),
  p("Patients should seek urgent medical advice for high or persistent fever, increasing abdominal pain, severe abdominal swelling, persistent vomiting, heavy bleeding, severe diarrhoea, inability to pass stool or gas, shortness of breath, chest pain, severe weakness, redness or discharge from the wound, or sudden deterioration. The treating hospital should provide specific postoperative emergency instructions before discharge."),
  p("**Chest pain, sudden shortness of breath, collapse, or rapidly worsening abdominal pain after discharge belong in a local emergency department.**"),

  h2("Follow-Up and Recurrence"),
  p("Follow-up may involve physical examination, CEA testing, CT imaging, colonoscopy, oncology review and surgical review. Surgery can be performed with **curative intent** for many localized cancers. Selected patients with metastatic disease may also undergo potentially curative surgery when all visible disease can be appropriately treated. Recurrence is still possible. Regular surveillance is therefore important. No surgeon can responsibly guarantee a cure before reviewing the complete clinical information."),

  h2("Colon Cancer Surgery in India for International Patients"),
  p("A typical pathway is: send colonoscopy, biopsy, CT/MRI/PET, CEA and previous treatment records; specialist review; treatment recommendation; itemised cost estimate; visa documentation; travel; preoperative assessment in India; surgery; pathology; postoperative oncology if required; return-home planning with a written summary."),
  ul([
    "Colonoscopy, biopsy and histopathology reports, plus slides or blocks when available",
    "CT chest/abdomen/pelvis, MRI or PET-CT where performed",
    "CEA, blood tests, previous surgery or chemotherapy records, molecular reports and current medicines",
  ]),

  h2("The Bottom Line"),
  p("Colon cancer surgery is not one single operation. The correct procedure depends primarily on **tumour location, stage, local extent, metastatic disease and the patient's overall condition**. The least invasive operation is not automatically the correct operation. The most important objective is **safe, complete and oncologically appropriate cancer removal**."),
  p("For patients travelling to India, the hospital should ideally be able to provide the complete pathway: diagnosis, staging, surgical planning, operation, pathology, oncology treatment, recovery and follow-up. Start with [Colon Cancer Treatment in India](" + PILLAR + ") if you also need chemotherapy, immunotherapy or molecular-testing context."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and systemic medicines around the operation.",
    "[Colectomy cost in India](" + COLECTOMY + ") — GAF planning range $7,000–$18,000.",
    "[Colorectal cancer surgery cost](" + CRC_SURG + ") — $8,000–$20,000 planning range.",
    "[Liver resection](" + LIVER + ") — selected metastases, $10,000–$26,000.",
    "[CRS with HIPEC](" + HIPEC + ") — selected peritoneal disease.",
    "[Chemotherapy](" + CHEMO + ") — adjuvant therapy after pathology.",
    "[Rectal cancer surgery](" + RECTAL + ") — a different operation when the tumour is rectal.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a colectomy or hemicolectomy plan in India — after a new colonoscopy diagnosis, for obstruction risk, or when liver metastases are being considered for resection. Share the colonoscopy PDF, biopsy, CT files, CEA and any molecular report. A coordinator can introduce a [surgical oncologist](" + SURG_DOCS + ") and, when systemic therapy is part of the plan, a [medical oncologist](" + MED_DOCS + "), then help collect an itemised quotation covering the operation, stay, pathology and planned duration."),
  btn("Share records for a surgery review", consult("Colon Cancer Surgery")),
  p("[WhatsApp +91 90443 46292 with colonoscopy, stage and CT](" + wa("I would like to share my colonoscopy, biopsy, stage and CT for a colon cancer surgery second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified colorectal surgeon, surgical oncologist or medical oncologist. Colon cancer surgery is highly individualized. The choice of operation, approach, stoma and duration of stay depends on tumour location, pathology, imaging, previous treatment, overall health and other clinical factors. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — surgical treatment, staging and options by stage."),
  p("2. [ICMR — Consensus Document for Management of Colorectal Cancer](https://main.icmr.nic.in/sites/default/files/guidelines/Colorectal%20Cancer.pdf) — India-specific diagnosis, staging, surgery and adjuvant treatment."),
  p("3. [ICMR guideline repository — colorectal cancer](https://www.icmr.gov.in) — Government of India consensus hosting."),
  p("4. [American Cancer Society — Surgery for Colon Cancer](https://www.cancer.org/cancer/types/colon-rectal-cancer/treating/colon-surgery.html) — colectomy, lymph-node removal, open and laparoscopic surgery."),
  p("5. [Cancer Research UK — Types of surgery for bowel cancer](https://www.cancerresearchuk.org/about-cancer/bowel-cancer/treatment/treatment-surgery) — local resection, colectomy, stomas and approaches."),
  p("6. [Cancer Research UK — Surgery to remove bowel cancer](https://www.cancerresearchuk.org/about-cancer/bowel-cancer/treatment/treatment-surgery/removing-part-of-the-bowel) — partial and total colectomy, anastomosis and stomas."),
  p("7. [Cancer Research UK — After bowel cancer surgery](https://www.cancerresearchuk.org/about-cancer/bowel-cancer/treatment/treatment-surgery/after-surgery) — recovery, nutrition, hospital stay and complications."),
  p("8. [ERAS Society — colorectal perioperative care](https://erassociety.org) — evidence-based enhanced-recovery recommendations, including the 2025 update."),
  p("9. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — resource-stratified recommendations for early colorectal cancer."),
  p("10. [GAF Healthcare colectomy cost sheet](" + COLECTOMY + ") — indicative USD planning ranges; costs vary by hospital, city and surgical plan."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T17:30:00.000Z";
const SLUG = "colon-cancer-surgery-in-india";

const article = {
  id: "art_colon_cancer_surgery_in_india",
  slug: SLUG,
  title: "Colon Cancer Surgery in India: Colectomy, Approaches and Recovery",
  excerpt:
    "Hemicolectomy, anastomosis and stomas: how tumour location decides the operation, when laparoscopic or robotic surgery is appropriate, and GAF planning ranges for colectomy in India.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["colon cancer", "colectomy", "hemicolectomy", "colorectal surgery", "India"],
  image: "/uploads/articles/colon-sx-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon and a gold tumour overlay used to explain colon cancer surgery",
  status: "published",
  featured: true,
  seoTitle: "Colon Cancer Surgery in India: Colectomy, Recovery and Cost",
  seoDescription:
    "Colon cancer surgery in India: hemicolectomy, open vs laparoscopic vs robotic, stomas, lymph nodes and recovery. GAF colectomy planning ranges and records to send first.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-sx-anatomy.webp",
  allowIndex: true,
  keywords: [
    "colon cancer surgery in India",
    "colectomy India",
    "right hemicolectomy",
    "laparoscopic colon cancer surgery",
    "robotic colectomy India",
    "colon cancer stoma",
    "colon cancer surgery cost in India",
    "lymph nodes colon cancer surgery",
    "colon cancer recovery",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Colectomy cost in India", href: COLECTOMY },
    { label: "Colorectal cancer surgery cost", href: CRC_SURG },
    { label: "Liver resection cost", href: LIVER },
    { label: "Chemotherapy cost in India", href: CHEMO },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-sx-anatomy.webp", article.imageAlt],
  [
    "colon-sx-resection.webp",
    "Transparent adult abdomen showing a teal right-colon segment and gold tumour used to explain right hemicolectomy",
  ],
  [
    "colon-sx-clinic.webp",
    "Adult patient in clinic with a colon overlay while a colorectal surgeon explains colectomy",
  ],
  [
    "colon-sx-liver.webp",
    "Transparent adult torso showing a gold colon tumour and teal liver metastases used to explain selected liver surgery",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
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
console.log(
  "wrote",
  article.slug,
  "blocks",
  blocks.length,
  "ctas",
  blocks.filter((b) => b.type === "button" || (b.type === "paragraph" && /wa\.me|\/consult\?/.test(b.text || ""))).length,
);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(SURGERY_BLOG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Surgery remains the central curative treatment for many localized colon cancers. The operation is selected according to the location of the tumour.",
    "Surgery remains the central curative treatment for many localized colon cancers. The operation is selected according to the location of the tumour. How hemicolectomy, stomas and open versus laparoscopic versus robotic approaches are planned is covered in [Colon Cancer Surgery in India](/blogs/colon-cancer-surgery-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked surgery blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("colon-cancer-surgery-in-india")) {
  llms = llms.replace(
    "and [hormone therapy for prostate cancer](https://gaf.healthcare/blogs/hormone-therapy-for-prostate-cancer).",
    ", [hormone therapy for prostate cancer](https://gaf.healthcare/blogs/hormone-therapy-for-prostate-cancer) and [colon cancer surgery in India](https://gaf.healthcare/blogs/colon-cancer-surgery-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
