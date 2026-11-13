import "@/styles/article.css";
import "@/styles/treatments.css";
import "@/styles/hipec.css";
import type { Metadata } from "next";
import { ArrowRight, ChevronDown, FileText, Phone, Shield, Users, Clock, CheckCircle2, AlertTriangle, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappHref, site } from "@/lib/site";
import { localizedAbsoluteUrl } from "@/lib/i18n/metadata";

export const dynamic = "force-static";

const WHATSAPP_RECORDS = whatsappHref(
  "Please review my medical records and share a specialist opinion on HIPEC surgery in India.",
);
const WHATSAPP_ESTIMATE = whatsappHref(
  "Please review my medical records and share a case-specific treatment estimate for HIPEC surgery in India.",
);
const WHATSAPP_ELIGIBILITY = whatsappHref(
  "I would like to understand whether I am eligible for HIPEC surgery in India.",
);
const WHATSAPP_COORDINATOR = whatsappHref(
  "I would like to speak with GAF Healthcare about HIPEC surgery in India.",
);

// Public canonical for this slug. The curated CMS record
// `hipec-surgery-in-india` in content/curated-treatments.json is retained for
// catalog relationships; this route is the dedicated patient-facing page.
const PAGE_URL = "/treatments/hipec-surgery-in-india";

export const metadata: Metadata = {
  title: "HIPEC Surgery in India: Cost, Procedure, Recovery & Treatment",
  description:
    "Explore HIPEC surgery in India, including treatment costs, procedure, eligibility, recovery, clinical outcomes and specialist cancer care for international patients.",
  keywords: [
    "HIPEC surgery in India",
    "HIPEC treatment in India",
    "HIPEC surgery cost in India",
    "Cytoreductive surgery and HIPEC",
    "CRS HIPEC treatment",
    "Hyperthermic intraperitoneal chemotherapy",
    "Best HIPEC surgeons in India",
    "Peritoneal cancer treatment in India",
    "HIPEC procedure for cancer",
    "HIPEC surgery success rate",
    "Pseudomyxoma peritonei treatment in India",
    "HIPEC for ovarian cancer",
    "HIPEC for colon cancer",
  ],
  alternates: { canonical: localizedAbsoluteUrl(PAGE_URL, "en") },
  openGraph: {
    title: "HIPEC Surgery in India: Cost, Procedure, Recovery & Treatment",
    description:
      "Explore HIPEC surgery in India, including treatment costs, procedure, eligibility, recovery, clinical outcomes and specialist cancer care for international patients.",
    type: "article",
    images: [
      {
        url: "/treatments/hipec-procedure-illustration.webp",
        alt: "HIPEC hyperthermic intraperitoneal chemotherapy procedure illustration",
      },
    ],
  },
};

// Schema is defined after FAQS to reference them — see bottom of file.
// We use a function so it can reference the FAQS array defined below.
function buildSchema() {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${localizedAbsoluteUrl(PAGE_URL, "en")}#webpage`,
      url: localizedAbsoluteUrl(PAGE_URL, "en"),
      name: "HIPEC Surgery in India: Cost, Procedure, Recovery & Treatment",
      description:
        "Explore HIPEC surgery in India, including treatment costs, procedure, eligibility, recovery, clinical outcomes and specialist cancer care for international patients.",
      inLanguage: "en",
      audience: { "@type": "MedicalAudience", audienceType: "Patient" },
      medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    },
    {
      "@type": "MedicalProcedure",
      "@id": `${localizedAbsoluteUrl(PAGE_URL, "en")}#procedure`,
      name: "HIPEC Surgery (Hyperthermic Intraperitoneal Chemotherapy)",
      alternateName: ["CRS-HIPEC", "Cytoreductive Surgery with HIPEC"],
      description:
        "HIPEC is an advanced cancer treatment combining cytoreductive surgery with heated chemotherapy delivered directly into the abdominal cavity. Used for selected patients with pseudomyxoma peritonei, peritoneal mesothelioma, ovarian, colorectal and gastric cancers.",
      procedureType: "Surgical Oncology",
      bodyLocation: "Abdominal cavity, peritoneal surface",
      url: localizedAbsoluteUrl(PAGE_URL, "en"),
      relevantSpecialty: "Surgical Oncology",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Delhi NCR" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Bengaluru" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Hyderabad" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "GAF Healthcare", item: localizedAbsoluteUrl("/", "en") },
        { "@type": "ListItem", position: 2, name: "Treatments", item: localizedAbsoluteUrl("/treatments", "en") },
        { "@type": "ListItem", position: 3, name: "HIPEC Surgery in India", item: localizedAbsoluteUrl(PAGE_URL, "en") },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
  };
}

const FAQS = [
  {
    q: "What is HIPEC surgery?",
    a: "HIPEC stands for Hyperthermic Intraperitoneal Chemotherapy. It is a specialised cancer treatment in which heated chemotherapy is circulated directly inside the abdominal cavity, usually after surgeons remove visible cancer deposits through cytoreductive surgery (CRS). It is primarily used for selected cancers involving the peritoneal lining.",
  },
  {
    q: "What is the full form of HIPEC?",
    a: "The full form of HIPEC is Hyperthermic Intraperitoneal Chemotherapy. Hyperthermic means heated, intraperitoneal means inside the abdominal cavity, and chemotherapy refers to medicines used to destroy or control cancer cells.",
  },
  {
    q: "What is the difference between CRS and HIPEC?",
    a: "CRS, or cytoreductive surgery, involves removing visible cancer deposits from the abdominal cavity. HIPEC involves circulating heated chemotherapy inside the abdomen after surgical removal of visible disease. Both procedures are commonly combined for the treatment of selected peritoneal malignancies.",
  },
  {
    q: "Which cancers can be treated with HIPEC?",
    a: "HIPEC may be considered for selected patients with pseudomyxoma peritonei, peritoneal mesothelioma, ovarian cancer, colorectal cancer with peritoneal metastases, gastric cancer with peritoneal metastases and certain appendiceal malignancies. The evidence and indications differ for each cancer type.",
  },
  {
    q: "Is HIPEC surgery suitable for stage 4 cancer?",
    a: "Some patients with stage IV cancer may be eligible if the disease is predominantly confined to the peritoneum and complete cytoreduction is achievable. However, widespread metastases involving multiple distant organs may make the procedure unsuitable. Stage alone does not determine eligibility.",
  },
  {
    q: "What is the success rate of HIPEC surgery?",
    a: "There is no single success rate for HIPEC surgery. Outcomes depend on cancer type, tumour burden, PCI score, completeness of cytoreduction, tumour biology and patient fitness. A specialist should explain survival and recurrence data relevant to the patient's specific diagnosis.",
  },
  {
    q: "Can HIPEC cure peritoneal cancer?",
    a: "In selected patients with certain peritoneal malignancies, complete cytoreductive surgery combined with an appropriate HIPEC regimen may offer the possibility of long-term remission and potentially curative treatment. However, recurrence remains possible, and not every patient benefits.",
  },
  {
    q: "How long does HIPEC surgery take?",
    a: "The operation can take several hours and may last approximately 6–12 hours or longer in particularly complex cases. The duration depends on the extent of tumour deposits, organs requiring removal, complexity of reconstruction and HIPEC protocol.",
  },
  {
    q: "How long does a patient stay in hospital after HIPEC?",
    a: "Hospitalisation commonly lasts around 1–3 weeks, but it can be shorter or considerably longer depending on the procedure and recovery. Patients who experience complications, delayed bowel recovery or infections may require additional hospital care.",
  },
  {
    q: "Is HIPEC surgery painful?",
    a: "Patients receive general anaesthesia during surgery and pain-management treatment afterwards. Abdominal discomfort is expected following extensive surgery, but it is managed using appropriate medications, monitoring and supportive care.",
  },
  {
    q: "What chemotherapy drugs are used in HIPEC?",
    a: "Commonly used drugs include mitomycin C, cisplatin, oxaliplatin and doxorubicin. The drug selection depends on the cancer type, treatment protocol, kidney function and the treating centre's experience.",
  },
  {
    q: "Is HIPEC better than conventional chemotherapy?",
    a: "HIPEC and conventional chemotherapy have different roles. HIPEC provides local chemotherapy inside the abdomen, whereas systemic chemotherapy treats cancer throughout the body. Some patients may require both approaches. The best treatment depends on the primary cancer and available clinical evidence.",
  },
  {
    q: "Can ovarian cancer patients undergo HIPEC?",
    a: "Selected patients with stage III epithelial ovarian cancer may be considered for HIPEC during interval cytoreductive surgery after neoadjuvant chemotherapy, particularly when the disease is stable or responding. It is not routinely recommended for every ovarian cancer patient or every recurrence.",
  },
  {
    q: "Can colon cancer patients undergo HIPEC?",
    a: "Selected patients with colorectal cancer that has spread to the peritoneum may be considered for cytoreductive surgery. However, ASCO does not recommend adding oxaliplatin-based HIPEC to CRS for colorectal peritoneal metastases. The exact treatment protocol should be discussed with a specialist.",
  },
  {
    q: "What is the PCI score in HIPEC surgery?",
    a: "PCI stands for Peritoneal Cancer Index. It measures the extent of cancer within the abdominal cavity by dividing the abdomen into 13 regions and scoring tumour deposits in each region. The score ranges from 0 to 39. A higher score often indicates more extensive disease.",
  },
  {
    q: "What are the risks of HIPEC surgery?",
    a: "Potential complications include infection, bleeding, kidney injury, bowel leakage, intestinal obstruction, blood clots, respiratory problems, electrolyte imbalances and chemotherapy-related toxicity. Serious complications can occur, which is why specialist surgical and intensive-care facilities are essential.",
  },
  {
    q: "How long does it take to recover from HIPEC surgery?",
    a: "Initial hospital recovery may take several weeks, while complete recovery can take a few months. Recovery depends on the extent of surgery, organ resections, nutritional status, complications and the patient's overall health.",
  },
  {
    q: "Can HIPEC be performed without cytoreductive surgery?",
    a: "In standard CRS-HIPEC treatment, HIPEC is combined with cytoreductive surgery. There are other intraperitoneal chemotherapy approaches, including PIPAC, but they are different procedures with different indications. The appropriate approach depends on the diagnosis and treatment objective.",
  },
  {
    q: "What is the difference between open and closed HIPEC?",
    a: "In open HIPEC, the abdominal cavity remains accessible during chemotherapy circulation, allowing manual distribution of the solution. In closed HIPEC, the abdomen is temporarily closed and the heated chemotherapy circulates through specialised tubes. Both are established delivery techniques.",
  },
  {
    q: "Is HIPEC surgery available in India?",
    a: "India has specialist cancer centres and surgical oncology teams involved in CRS-HIPEC treatment and peritoneal surface malignancy care. Patients should confirm the current availability of the procedure, the experience of the individual surgeon and the hospital's postoperative critical-care facilities.",
  },
  {
    q: "How much does HIPEC surgery cost in India?",
    a: "There is no single fixed cost for HIPEC surgery in India. The final estimate depends on cancer type, disease extent, surgical complexity, chemotherapy drugs, ICU stay and hospitalisation. A hospital can provide a more accurate estimate after reviewing the patient's medical records and imaging.",
  },
  {
    q: "Can international patients travel to India for HIPEC surgery?",
    a: "Yes, international patients can seek specialist evaluation and treatment in India. However, they should submit medical records for preliminary review before travelling. Fitness to travel and the timing of surgery must be determined by the treating medical team.",
  },
  {
    q: "Does HIPEC cause hair loss?",
    a: "Hair loss is not an inevitable consequence of HIPEC. Some chemotherapy drugs used during perfusion may be absorbed systemically, but the risk of hair loss depends on the drug, dose and whether the patient also receives systemic chemotherapy.",
  },
  {
    q: "Can cancer return after HIPEC surgery?",
    a: "Yes. Cancer recurrence is possible even after complete cytoreductive surgery and HIPEC. The risk depends on tumour biology, cancer type, completeness of cytoreduction and other clinical factors. Regular follow-up and surveillance are important.",
  },
  {
    q: "Is HIPEC surgery safe for elderly patients?",
    a: "Age alone does not determine whether a patient can undergo HIPEC. Doctors assess overall fitness, frailty, heart and lung function, kidney function, nutritional status and the expected benefits of surgery. Some elderly patients may be suitable, while others may face unacceptable risks.",
  },
  {
    q: "What is the difference between HIPEC and PIPAC?",
    a: "HIPEC uses heated liquid chemotherapy circulated inside the abdomen, generally during cytoreductive surgery. PIPAC uses pressurised aerosolised chemotherapy delivered laparoscopically. The procedures have different treatment objectives and should not be considered interchangeable.",
  },
  {
    q: "Will a patient need chemotherapy after HIPEC?",
    a: "Some patients may require additional systemic chemotherapy after surgery, depending on their cancer type, pathology results, previous treatments and recurrence risk. Others may be advised surveillance. The decision is individualised by the multidisciplinary oncology team.",
  },
  {
    q: "Which specialist should I consult for HIPEC surgery?",
    a: "Patients should consult a surgical oncologist with specific experience in peritoneal surface malignancies and CRS-HIPEC. The evaluation should also involve medical oncology, radiology, pathology and anaesthesia specialists as appropriate.",
  },
  {
    q: "Is HIPEC suitable for patients with liver metastases?",
    a: "Extensive liver metastases may make CRS-HIPEC unsuitable in many situations. However, selected patients with limited liver involvement may be assessed individually at specialist centres. The decision depends on the primary cancer, distribution of disease and whether all relevant tumour deposits can be treated.",
  },
  {
    q: "What documents are required for a HIPEC consultation in India?",
    a: "Patients should ideally provide their histopathology report, recent CT or MRI images, previous operation notes, chemotherapy records, discharge summaries, tumour marker results and current blood investigations. Complete documentation helps the specialist assess whether CRS-HIPEC is appropriate.",
  },
  {
    q: "What is the Peritoneal Cancer Index and why does it matter?",
    a: "The Peritoneal Cancer Index (PCI) is a scoring system that measures the extent and distribution of tumour deposits inside the abdominal cavity across 13 regions. Scores range from 0 to 39. A higher PCI indicates more extensive disease and may affect eligibility for cytoreductive surgery. However, there is no universal PCI threshold — the acceptable score depends on the cancer type, disease location and surgical expertise.",
  },
];

export default function HipecSurgeryPage() {
  const schema = buildSchema();
  return (
    <main className="hipec-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hipec-hero">
        <div className="page-wrap hipec-hero__inner">
          <nav className="treatment-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/treatments">Treatments</a>
            <span aria-hidden="true">/</span>
            <span>HIPEC Surgery in India</span>
          </nav>

          <div className="hipec-hero__content">
            <div className="hipec-hero__text">
              <p className="eyebrow">Surgical Oncology · Peritoneal Surface Malignancies</p>
              <h1>HIPEC Surgery in India: Treatment, Cost, Procedure and Recovery</h1>
              <p className="hipec-hero__lede">
                HIPEC surgery in India is an advanced cancer treatment that combines cytoreductive
                surgery with heated chemotherapy delivered directly into the abdominal cavity. It may
                be considered for carefully selected patients with pseudomyxoma peritonei, peritoneal
                mesothelioma, and certain ovarian, colorectal, gastric and appendiceal cancers.
              </p>
              <div className="hipec-hero__ctas">
                <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                  <WhatsAppIcon />
                  Share records for specialist review
                  <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
                </a>
                <a href={WHATSAPP_COORDINATOR} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--outline">
                  <Phone className="size-4" aria-hidden="true" />
                  Speak to a coordinator
                </a>
              </div>
            </div>

            <aside className="hipec-hero__card">
              <p className="hipec-hero__card-label">Key facts</p>
              <dl className="hipec-key-facts">
                <div><dt>Procedure type</dt><dd>Surgical Oncology</dd></div>
                <div><dt>Also known as</dt><dd>CRS-HIPEC</dd></div>
                <div><dt>Temperature</dt><dd>41–43°C chemotherapy</dd></div>
                <div><dt>Surgery duration</dt><dd>6–12+ hours</dd></div>
                <div><dt>Hospital stay</dt><dd>1–3 weeks (variable)</dd></div>
                <div><dt>Full recovery</dt><dd>2–4 months</dd></div>
                <div><dt>Destination</dt><dd>India</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ───────────────────────────────────────────────── */}
      <nav className="treatment-page-nav" aria-label="Page sections">
        <div className="page-wrap">
          {[
            ["#what-is-hipec", "What is HIPEC"],
            ["#crs-hipec", "CRS vs HIPEC"],
            ["#cancer-types", "Cancer Types"],
            ["#eligibility", "Eligibility"],
            ["#procedure", "Procedure"],
            ["#risks", "Risks"],
            ["#cost", "Cost"],
            ["#international", "For Patients"],
            ["#faqs", "FAQs"],
          ].map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </nav>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="page-wrap hipec-layout">
        <article className="hipec-article">

          {/* 1. WHAT IS HIPEC */}
          <section id="what-is-hipec" className="hipec-section">
            <p className="eyebrow">Overview</p>
            <h2>What Is HIPEC Surgery?</h2>

            {/* Quick answer box */}
            <aside className="article-quick-answer">
              <p className="article-quick-answer__label">Quick answer</p>
              <h3>HIPEC Surgery in India</h3>
              <p className="article-quick-answer__body">
                <strong>What is it?</strong> Hyperthermic Intraperitoneal Chemotherapy — heated
                chemotherapy circulated inside the abdominal cavity after surgical removal of visible
                cancer deposits.
              </p>
              <p className="article-quick-answer__body">
                <strong>Who is it for?</strong> Carefully selected patients with pseudomyxoma
                peritonei, peritoneal mesothelioma, and selected ovarian, colorectal, gastric or
                appendiceal cancers involving the peritoneal lining.
              </p>
              <p className="article-quick-answer__body">
                <strong>What is the cost in India?</strong> No single fixed price exists. The cost
                depends on surgical complexity, disease extent, ICU stay and chemotherapy drugs.
                GAF Healthcare coordinates case-based estimates after medical record review.
              </p>
              <p className="article-quick-answer__body">
                <strong>How long is recovery?</strong> Hospital stay is typically 1–3 weeks; full
                recovery commonly takes 2–4 months depending on the extent of surgery.
              </p>
            </aside>

            <p>
              HIPEC surgery — Hyperthermic Intraperitoneal Chemotherapy — is an advanced cancer
              treatment that delivers heated chemotherapy directly into the abdominal cavity after
              surgeons remove visible cancer deposits through an operation called cytoreductive
              surgery (CRS).
            </p>
            <p>
              The treatment is designed to address cancers that have spread to the peritoneum, the
              thin membrane lining the abdominal cavity and covering many abdominal organs. Unlike
              conventional intravenous chemotherapy, HIPEC delivers a concentrated chemotherapy
              solution directly into the abdomen, heated to approximately 41–43°C, and circulates
              it throughout the cavity for a carefully controlled period.
            </p>

            <figure className="hipec-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/treatments/hipec-procedure-illustration.webp"
                alt="HIPEC procedure illustration showing heated chemotherapy circulating inside the abdominal cavity through perfusion tubes"
                width={800}
                height={600}
                loading="lazy"
              />
              <figcaption>
                HIPEC delivers heated chemotherapy (41–43°C) directly into the abdominal cavity
                following cytoreductive surgery to treat microscopic residual cancer cells.
              </figcaption>
            </figure>

            <p>
              HIPEC is not a universal treatment for advanced cancer. Its suitability depends on the
              primary cancer, extent of peritoneal disease, possibility of complete tumour removal,
              previous treatment and the patient&apos;s overall health. A detailed evaluation by an
              experienced surgical oncology team is essential before treatment decisions are made.
            </p>

            {/* CTA 1 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <WhatsAppIcon />
                Share medical records for a specialist opinion
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 2. CRS vs HIPEC */}
          <section id="crs-hipec" className="hipec-section">
            <h2>CRS and HIPEC: Are They the Same Treatment?</h2>
            <p>
              CRS and HIPEC are two separate but complementary components of a combined cancer
              treatment.
            </p>
            <p>
              <strong>Cytoreductive Surgery (CRS)</strong> involves surgically removing visible
              cancer deposits from the abdominal cavity, including affected peritoneal tissue and,
              where necessary, portions of involved organs.
            </p>
            <p>
              <strong>Hyperthermic Intraperitoneal Chemotherapy (HIPEC)</strong> follows
              cytoreductive surgery. Heated chemotherapy is circulated inside the abdominal cavity
              to treat microscopic cancer cells that may remain after visible tumour removal.
            </p>

            <figure className="hipec-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/treatments/crs-hipec-combined-treatment.webp"
                alt="CRS-HIPEC combined treatment: left panel shows surgical removal of peritoneal tumour deposits; right panel shows heated chemotherapy perfusion"
                width={800}
                height={600}
                loading="lazy"
              />
              <figcaption>
                CRS-HIPEC is a combined approach: cytoreductive surgery removes visible tumour
                deposits, followed by HIPEC targeting residual microscopic disease.
              </figcaption>
            </figure>

            <div className="hipec-table-wrap">
              <table>
                <caption>Main components of CRS-HIPEC treatment</caption>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>What it involves</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Cytoreductive surgery</td><td>Removal of visible tumour deposits</td></tr>
                  <tr><td>Peritonectomy</td><td>Removal of affected sections of the peritoneal lining</td></tr>
                  <tr><td>Organ resection</td><td>Removal of affected organs or portions of organs when necessary</td></tr>
                  <tr><td>HIPEC</td><td>Circulation of heated chemotherapy inside the abdomen</td></tr>
                  <tr><td>Postoperative care</td><td>Monitoring, recovery, nutrition and further cancer treatment where indicated</td></tr>
                </tbody>
              </table>
            </div>

            <div className="hipec-callout hipec-callout--warning">
              <AlertTriangle className="size-5" aria-hidden="true" />
              <p>
                <strong>Important:</strong> HIPEC cannot compensate for substantial visible cancer
                that cannot be surgically removed. The possibility of achieving complete
                cytoreduction is one of the most important factors in determining whether
                CRS-HIPEC is appropriate.
              </p>
            </div>
          </section>

          {/* 3. CANCER TYPES */}
          <section id="cancer-types" className="hipec-section">
            <h2>Which Cancers Can Be Treated With HIPEC Surgery?</h2>
            <p>
              HIPEC is primarily used for selected cancers that originate in or spread to the
              peritoneal surface. The evidence supporting its use differs considerably between
              cancer types.
            </p>

            <div className="hipec-cancer-grid">
              {[
                {
                  title: "Pseudomyxoma Peritonei (PMP)",
                  body: "A rare condition usually associated with a mucin-producing tumour of the appendix causing abnormal mucus accumulation in the abdomen. CRS-HIPEC is an established specialist treatment for suitable patients.",
                },
                {
                  title: "Peritoneal Mesothelioma",
                  body: "A rare cancer of the abdominal lining. For carefully selected patients, complete cytoreductive surgery combined with HIPEC is an important specialist treatment approach.",
                },
                {
                  title: "Ovarian Cancer",
                  body: "Selected patients with stage III epithelial ovarian cancer who have responded to neoadjuvant chemotherapy may be considered for HIPEC during interval cytoreductive surgery (OVHIPEC-1 trial evidence).",
                },
                {
                  title: "Colorectal Cancer With Peritoneal Metastases",
                  body: "Selected patients with peritoneal-confined disease may be considered for cytoreduction. ASCO specifically recommends against adding oxaliplatin-based HIPEC to CRS for colorectal peritoneal metastases.",
                },
                {
                  title: "Gastric Cancer",
                  body: "In highly selected patients with limited peritoneal disease and favourable response to systemic treatment, CRS-HIPEC may be considered. The evidence remains evolving.",
                },
                {
                  title: "Appendiceal Malignancies",
                  body: "Some appendiceal malignancies can spread across peritoneal surfaces. Depending on grade, histology and resectability, patients may be considered for CRS-HIPEC.",
                },
              ].map((item) => (
                <div key={item.title} className="hipec-cancer-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>

            {/* CTA 2 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_ELIGIBILITY} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <WhatsAppIcon />
                Ask if your cancer type is eligible for HIPEC
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 4. ELIGIBILITY */}
          <section id="eligibility" className="hipec-section">
            <h2>Who Is Eligible for HIPEC Surgery?</h2>
            <p>
              Not every patient diagnosed with peritoneal metastases is suitable for HIPEC. Patient
              selection is one of the most important aspects of treatment planning. A
              multidisciplinary team generally evaluates the following factors.
            </p>

            <div className="hipec-eligibility-grid">
              {[
                { icon: <CheckCircle2 className="size-5" />, title: "Cancer type and histopathology", body: "The primary cancer, tumour grade, histological subtype and molecular characteristics help determine whether CRS-HIPEC is appropriate." },
                { icon: <CheckCircle2 className="size-5" />, title: "Extent of peritoneal disease", body: "The distribution and volume of tumour deposits are assessed using the Peritoneal Cancer Index (PCI), which measures spread across 13 abdominal regions." },
                { icon: <CheckCircle2 className="size-5" />, title: "Possibility of complete cytoreduction", body: "The surgeon must determine whether visible cancer can be removed completely or with minimal residual disease. Extensive involvement of critical structures may make surgery unsuitable." },
                { icon: <CheckCircle2 className="size-5" />, title: "Absence of uncontrolled distant metastases", body: "Extensive disease involving distant organs such as the lungs or widespread liver metastases may reduce the potential benefit of major abdominal surgery." },
                { icon: <CheckCircle2 className="size-5" />, title: "General health and fitness", body: "The patient should be sufficiently fit to tolerate prolonged surgery, anaesthesia and postoperative recovery." },
                { icon: <CheckCircle2 className="size-5" />, title: "Nutritional and organ function", body: "Kidney, liver, heart and lung function, haemoglobin, serum albumin and nutritional status are all assessed to evaluate surgical risk." },
              ].map((item) => (
                <div key={item.title} className="hipec-eligibility-card">
                  <span className="hipec-eligibility-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hipec-callout hipec-callout--info">
              <Shield className="size-5" aria-hidden="true" />
              <div>
                <p><strong>Who may not be suitable?</strong></p>
                <ul className="hipec-list">
                  <li>Cancer extensively spread outside the abdominal cavity</li>
                  <li>Complete or meaningful cytoreduction not technically achievable</li>
                  <li>Extensive involvement of small bowel or mesentery</li>
                  <li>Severe uncontrolled medical conditions</li>
                  <li>Patient unlikely to tolerate a major operation</li>
                  <li>Expected benefit does not justify the surgical risks</li>
                </ul>
                <p className="hipec-callout__note">Age alone should not automatically exclude a patient. Functional status, frailty and overall clinical condition are more useful considerations.</p>
              </div>
            </div>

            {/* CTA 3 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <FileText className="size-4" aria-hidden="true" />
                Submit records for eligibility assessment
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 5. PCI */}
          <section id="pci" className="hipec-section">
            <h2>Understanding the Peritoneal Cancer Index (PCI)</h2>
            <p>
              The Peritoneal Cancer Index is a scoring system used to assess the extent and
              distribution of cancer inside the abdominal cavity. The abdomen is divided into 13
              regions, each receiving a lesion-size score. Scores are summed to produce a PCI
              ranging from 0 to 39.
            </p>

            <div className="hipec-pci-layout">
              <figure className="hipec-figure hipec-figure--pci">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/treatments/peritoneal-cancer-index-diagram.webp"
                  alt="Peritoneal Cancer Index body diagram showing 13 abdominal regions scored for tumour involvement"
                  width={500}
                  height={667}
                  loading="lazy"
                />
                <figcaption>
                  The PCI divides the abdomen into 13 regions. Each region is scored 0–3 based on
                  the size of the largest tumour deposit.
                </figcaption>
              </figure>

              <div>
                <div className="hipec-table-wrap">
                  <table>
                    <caption>PCI lesion-size scores</caption>
                    <thead>
                      <tr><th>Score</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>LS-0</td><td>No visible tumour</td></tr>
                      <tr><td>LS-1</td><td>Tumour deposits up to 0.5 cm</td></tr>
                      <tr><td>LS-2</td><td>Tumour deposits 0.5 cm to 5 cm</td></tr>
                      <tr><td>LS-3</td><td>Tumour deposits greater than 5 cm or confluent disease</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="hipec-callout hipec-callout--warning">
                  <AlertTriangle className="size-5" aria-hidden="true" />
                  <p>
                    A PCI score should never be interpreted in isolation. The location of tumour
                    deposits — especially involvement of the small bowel and mesentery — can be just
                    as important as the overall score. There is no single PCI threshold that applies
                    to every cancer type.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. PROCEDURE */}
          <section id="procedure" className="hipec-section">
            <h2>How Is HIPEC Surgery Performed?</h2>
            <p>
              CRS-HIPEC is a complex operation performed under general anaesthesia in a specialist
              operating theatre with an experienced surgical oncology and anaesthesia team.
            </p>

            <ol className="treatment-process">
              {[
                { title: "General Anaesthesia and Preparation", desc: "The patient receives general anaesthesia. Continuous monitoring of heart rate, blood pressure, oxygen levels, body temperature and other vital parameters is established." },
                { title: "Exploration of the Abdominal Cavity", desc: "The surgeon examines the abdominal cavity to determine the distribution and extent of cancer. The PCI is assessed during surgery. If disease is significantly more extensive than expected, the team may decide that proceeding is not appropriate." },
                { title: "Cytoreductive Surgery", desc: "The surgeon removes visible cancer deposits. This may involve removal of affected peritoneal tissue, omentectomy, bowel resection, appendicectomy, splenectomy or removal of reproductive organs in selected patients. The objective is complete macroscopic cytoreduction (CC-0)." },
                { title: "Preparation for HIPEC", desc: "Specialised inflow and outflow tubes are positioned inside the abdominal cavity and temperature monitoring systems are connected." },
                { title: "Heated Chemotherapy Circulation", desc: "Chemotherapy is mixed with a carrier solution and heated to 41–43°C. The solution is circulated through the abdominal cavity for 30–120 minutes depending on the protocol. Common drugs include mitomycin C, cisplatin, oxaliplatin and doxorubicin." },
                { title: "Completion and Drainage", desc: "After the prescribed treatment duration, the chemotherapy solution is drained and the abdomen is rinsed where appropriate." },
                { title: "Closure and Postoperative Care", desc: "Surgical incisions are closed and the patient is transferred to the ICU or high-dependency unit for close monitoring." },
              ].map((step, i) => (
                <li key={step.title}>
                  <span>{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3>Open vs Closed HIPEC Technique</h3>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Technique</th><th>Description</th><th>Notes</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Closed-abdomen (standard)</td>
                    <td>Abdomen is temporarily closed; solution circulates through specialised tubes</td>
                    <td>Sealed cavity for chemotherapy exposure</td>
                  </tr>
                  <tr>
                    <td>Open-abdomen (Coliseum)</td>
                    <td>Abdominal cavity remains accessible; surgeon manually distributes solution</td>
                    <td>Allows direct distribution of chemotherapy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. COMPARISONS */}
          <section id="comparisons" className="hipec-section">
            <h2>HIPEC vs Conventional Chemotherapy</h2>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Feature</th><th>Conventional Chemotherapy</th><th>HIPEC</th></tr>
                </thead>
                <tbody>
                  <tr><td>Administration</td><td>Usually intravenous or oral</td><td>Directly into the abdominal cavity</td></tr>
                  <tr><td>Temperature</td><td>Not heated for this purpose</td><td>Heated to 41–43°C</td></tr>
                  <tr><td>Setting</td><td>Outpatient or inpatient cycles</td><td>During a surgical operation</td></tr>
                  <tr><td>Target</td><td>Cancer throughout the body</td><td>Microscopic disease within the abdomen</td></tr>
                  <tr><td>Surgery required</td><td>Not necessarily</td><td>Usually combined with CRS</td></tr>
                  <tr><td>Duration</td><td>Repeated cycles</td><td>Usually one intraoperative perfusion</td></tr>
                </tbody>
              </table>
            </div>

            <h2>HIPEC vs PIPAC</h2>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Feature</th><th>HIPEC</th><th>PIPAC</th></tr>
                </thead>
                <tbody>
                  <tr><td>Full form</td><td>Hyperthermic Intraperitoneal Chemotherapy</td><td>Pressurised Intraperitoneal Aerosol Chemotherapy</td></tr>
                  <tr><td>Surgical access</td><td>Usually during open CRS</td><td>Usually laparoscopic</td></tr>
                  <tr><td>Delivery</td><td>Heated liquid chemotherapy</td><td>Pressurised aerosol</td></tr>
                  <tr><td>Cytoreduction</td><td>Combined with CRS (removes visible tumour)</td><td>Does not itself remove visible tumour</td></tr>
                  <tr><td>Main objective</td><td>Treat microscopic residual disease after cytoreduction</td><td>Deliver local chemotherapy to peritoneal disease</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. SUCCESS RATES */}
          <section id="outcomes" className="hipec-section">
            <h2>HIPEC Surgery Outcomes and Clinical Evidence</h2>
            <p>
              There is no single reliable success rate applicable to all HIPEC patients. Outcomes
              vary substantially based on cancer type, PCI score, completeness of cytoreduction,
              previous treatment, patient fitness and centre experience.
            </p>

            <div className="hipec-table-wrap">
              <table>
                <caption>How HIPEC outcomes are measured</caption>
                <thead>
                  <tr><th>Measurement</th><th>What it means</th></tr>
                </thead>
                <tbody>
                  <tr><td>Complete cytoreduction rate</td><td>Proportion of patients in whom visible disease is completely removed</td></tr>
                  <tr><td>Overall survival</td><td>Percentage of patients alive at a specified time</td></tr>
                  <tr><td>Progression-free survival</td><td>Time during which cancer does not progress</td></tr>
                  <tr><td>Recurrence rate</td><td>Proportion of patients whose cancer returns</td></tr>
                  <tr><td>Treatment-related mortality</td><td>Death associated with the procedure or complications</td></tr>
                </tbody>
              </table>
            </div>

            <div className="hipec-evidence-cards">
              <div className="hipec-evidence-card">
                <h3>Ovarian Cancer</h3>
                <p>The OVHIPEC-1 randomised trial demonstrated improved survival outcomes in selected patients with stage III epithelial ovarian cancer receiving interval cytoreductive surgery with HIPEC after neoadjuvant chemotherapy.</p>
              </div>
              <div className="hipec-evidence-card">
                <h3>Colorectal Peritoneal Metastases</h3>
                <p>ASCO supports consideration of complete CRS with systemic chemotherapy in selected patients. ASCO specifically recommends against adding oxaliplatin-based HIPEC to CRS for colorectal peritoneal metastases.</p>
              </div>
              <div className="hipec-evidence-card">
                <h3>Pseudomyxoma Peritonei</h3>
                <p>CRS-HIPEC is an established treatment approach for appropriately selected patients. Multi-society guidelines support its use for resectable PMP with favourable histology.</p>
              </div>
            </div>

            {/* CTA 4 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_COORDINATOR} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <MessageCircle className="size-4" aria-hidden="true" />
                Ask about outcomes for your specific diagnosis
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 9. RISKS */}
          <section id="risks" className="hipec-section">
            <h2>Risks and Complications of HIPEC Surgery</h2>
            <p>
              CRS-HIPEC is a major and technically demanding operation. Patients should understand
              the potential complications before consenting to treatment.
            </p>

            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Complication</th><th>Description</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Infection", "Wound, abdominal or bloodstream infection"],
                    ["Bleeding", "Blood loss during or after surgery"],
                    ["Bowel leakage", "Leakage from an intestinal surgical connection"],
                    ["Intestinal obstruction", "Blockage caused by postoperative adhesions or complications"],
                    ["Kidney injury", "May occur due to chemotherapy exposure or perioperative factors"],
                    ["Blood clots", "Deep vein thrombosis or pulmonary embolism"],
                    ["Respiratory complications", "Pneumonia, breathing difficulties or ventilatory support"],
                    ["Electrolyte disturbances", "Changes in sodium, potassium and other blood chemicals"],
                    ["Prolonged bowel inactivity", "Temporary or persistent difficulty with bowel function"],
                    ["Kidney toxicity (chemo)", "Particularly with some cisplatin-based regimens"],
                    ["Bone marrow suppression", "Low blood counts, depending on drug used"],
                  ].map(([comp, desc]) => (
                    <tr key={comp}><td>{comp}</td><td>{desc}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hipec-callout hipec-callout--warning">
              <AlertTriangle className="size-5" aria-hidden="true" />
              <p>
                CRS-HIPEC carries significant risks, including potentially life-threatening
                complications. Risks should be discussed individually with the surgeon and
                anaesthetist. Ask about the centre&apos;s own complication rates and postoperative
                intensive care facilities.
              </p>
            </div>

            {/* CTA 5 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_COORDINATOR} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--outline">
                <WhatsAppIcon />
                Speak to a care coordinator about risks and preparation
              </a>
            </div>
          </section>

          {/* 10. PREOP TESTS */}
          <section id="investigations" className="hipec-section">
            <h2>Preoperative Investigations Before HIPEC</h2>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Investigation</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                  {[
                    ["CT abdomen and pelvis (contrast)", "Evaluate tumour distribution and extent"],
                    ["CT chest", "Assess possible distant spread"],
                    ["MRI", "Additional assessment of selected disease sites"],
                    ["PET-CT", "Used selectively where clinically indicated"],
                    ["Diagnostic laparoscopy", "Assess disease distribution and resectability"],
                    ["Histopathology review", "Confirm cancer diagnosis and tumour subtype"],
                    ["Immunohistochemistry", "Help identify tumour origin and characteristics"],
                    ["Tumour markers (CEA, CA-125, CA 19-9)", "Depending on cancer type"],
                    ["Complete blood count", "Assess haemoglobin and blood cells"],
                    ["Kidney and liver function tests", "Assess organ fitness for surgery"],
                    ["Serum albumin", "Assess nutritional status"],
                    ["Echocardiography / ECG", "Assess cardiac fitness when indicated"],
                    ["Pulmonary function", "Assess respiratory fitness when required"],
                  ].map(([inv, purpose]) => (
                    <tr key={inv}><td>{inv}</td><td>{purpose}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Molecular Testing</h3>
            <p>
              For certain cancers, molecular profiling may influence the overall treatment plan,
              including mismatch repair (MMR) and MSI status, KRAS, NRAS and BRAF mutations, HER2
              status, and BRCA1/BRCA2 alterations. These tests do not independently establish HIPEC
              eligibility but may guide systemic therapy planning.
            </p>
          </section>

          {/* 11. RECOVERY */}
          <section id="recovery" className="hipec-section">
            <h2>Recovery After HIPEC Surgery</h2>
            <p>
              Recovery following CRS-HIPEC is generally longer than after routine abdominal surgery
              because of the extent of tissue removal, potential organ resections and heated
              chemotherapy.
            </p>

            <figure className="hipec-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/treatments/hipec-recovery-timeline.webp"
                alt="HIPEC recovery timeline showing stages from ICU monitoring through discharge and return to normal activity over several months"
                width={1200}
                height={675}
                loading="lazy"
              />
              <figcaption>
                HIPEC recovery is staged over several weeks to months — the duration depends on
                the extent of surgery, presence of complications and individual patient factors.
              </figcaption>
            </figure>

            <div className="hipec-recovery-steps">
              {[
                { phase: "Days 1–3", title: "Intensive care monitoring", body: "Blood pressure, circulation, breathing, kidney function, electrolytes, pain and wound drainage are monitored closely in the ICU or HDU." },
                { phase: "Week 1", title: "Stabilisation and early mobility", body: "Gradual introduction of movement, breathing exercises and nutrition. Some patients receive initial nutrition through a feeding tube or intravenous route." },
                { phase: "Weeks 2–3", title: "Ward recovery", body: "Increasing mobility and gradual return to oral eating. Hospital stay varies; there is no fixed discharge date applicable to all patients." },
                { phase: "Weeks 4–8", title: "Home recovery", body: "Activities gradually increase per surgeon&apos;s instructions. Heavy lifting and strenuous exercise should be avoided. Follow-up visits continue." },
                { phase: "Months 2–4+", title: "Full recovery", body: "Full recovery may take several months, particularly after extensive bowel surgery or multiple organ resections. Follow-up imaging and further cancer treatment are planned as needed." },
              ].map((step) => (
                <div key={step.phase} className="hipec-recovery-step">
                  <div className="hipec-recovery-step__phase">{step.phase}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3>Nutrition and Diet After HIPEC Surgery</h3>
            <p>
              Nutrition plays an important role in recovery. Patients may experience temporary
              digestive problems, reduced appetite or weight loss. A dietitian typically recommends
              small, frequent, protein-rich meals and adequate fluid intake. Dietary recommendations
              should be individualised, especially if the patient has undergone bowel resection or
              developed a stoma.
            </p>
            <div className="hipec-callout hipec-callout--info">
              <Shield className="size-5" aria-hidden="true" />
              <p>
                Patients should not start restrictive diets, herbal remedies or high-dose supplements
                without discussing them with their oncology team.
              </p>
            </div>
          </section>

          {/* 12. COST */}
          <section id="cost" className="hipec-section">
            <h2>HIPEC Surgery Cost in India</h2>

            <aside className="article-quick-answer">
              <p className="article-quick-answer__label">Cost guidance</p>
              <h3>How much does HIPEC surgery cost in India?</h3>
              <p className="article-quick-answer__body">
                <strong>No single fixed price exists.</strong> CRS-HIPEC is a resource-intensive
                procedure. The final cost depends on cancer type, disease extent, surgical
                complexity, chemotherapy drugs, duration of ICU care and total hospitalisation.
              </p>
              <p className="article-quick-answer__body">
                <strong>How GAF Healthcare can help:</strong> We coordinate case-based treatment
                estimates from specialist hospitals after reviewing your medical records and imaging.
                This gives you a meaningful and personalised indication — not an advertised starting
                price that may not reflect the actual cost of your treatment.
              </p>
            </aside>

            <h3>What Determines the Cost of HIPEC Surgery?</h3>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Cost component</th><th>What it covers</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Initial consultation", "Surgical oncology and medical oncology assessments"],
                    ["Diagnostic investigations", "CT, MRI, PET-CT, pathology and laboratory testing"],
                    ["Cytoreductive surgery", "Surgeon fees, operating theatre and surgical consumables"],
                    ["HIPEC procedure", "Perfusion machine, chemotherapy drugs and related materials"],
                    ["Anaesthesia", "Specialist anaesthesia and monitoring"],
                    ["ICU admission", "Intensive care and monitoring"],
                    ["Hospital stay", "Room, nursing and inpatient services"],
                    ["Medicines", "Antibiotics, pain management and supportive medication"],
                    ["Blood products", "Transfusion if required"],
                    ["Additional treatment", "Systemic chemotherapy or other cancer treatment when indicated"],
                  ].map(([comp, desc]) => (
                    <tr key={comp}><td>{comp}</td><td>{desc}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>How to Obtain an Accurate HIPEC Treatment Estimate</h3>
            <p>To obtain a meaningful cost estimate, the hospital generally requires:</p>
            <ol className="hipec-ordered-list">
              <li>Confirmed histopathology report</li>
              <li>Recent CT or MRI imaging</li>
              <li>Previous operation reports and surgical notes</li>
              <li>Previous chemotherapy records</li>
              <li>Current blood investigations</li>
              <li>Patient age and general medical history</li>
              <li>Information about any previous cancer recurrence</li>
            </ol>

            <div className="hipec-callout hipec-callout--teal">
              <CheckCircle2 className="size-5" aria-hidden="true" />
              <p>
                <strong>GAF Healthcare recommendation:</strong> Always request an itemised quotation
                rather than relying on an advertised starting price. The initial estimate should
                clearly distinguish from the final bill, which may change if additional procedures,
                extended ICU care or complications become necessary.
              </p>
            </div>

            {/* CTA 6 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_ESTIMATE} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <FileText className="size-4" aria-hidden="true" />
                Request a case-based HIPEC treatment estimate
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 13. WHY INDIA */}
          <section id="why-india" className="hipec-section">
            <h2>Why Consider India for HIPEC Surgery?</h2>
            <p>
              India is an established destination for international patients seeking complex cancer
              treatment, with tertiary-care hospitals, specialist oncology departments and
              multidisciplinary treatment services.
            </p>

            <div className="hipec-why-grid">
              {[
                { icon: <Users className="size-6" />, title: "Multidisciplinary cancer care", body: "Surgical oncology, medical oncology, radiology, pathology, anaesthesia and critical-care services within large tertiary-care institutions." },
                { icon: <Shield className="size-6" />, title: "Specialist evaluation", body: "Access to surgical oncologists experienced in complex abdominal and peritoneal malignancies and CRS-HIPEC treatment." },
                { icon: <CheckCircle2 className="size-6" />, title: "Advanced diagnostics", body: "Major cancer centres provide imaging, pathology and molecular diagnostic services that support treatment planning." },
                { icon: <Clock className="size-6" />, title: "Coordinated treatment", body: "International patient departments assist with appointments, admissions, interpretation and travel arrangements." },
                { icon: <FileText className="size-6" />, title: "Treatment coordination", body: "Services include medical report collection, consultation coordination, estimate procurement and visa documentation support." },
                { icon: <ArrowRight className="size-6" />, title: "Potential cost advantages", body: "The overall cost of treatment in India may be competitive compared with some international destinations, though actual cost depends on surgical complexity and hospital selection." },
              ].map((item) => (
                <div key={item.title} className="hipec-why-card">
                  <span className="hipec-why-icon" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 14. INTERNATIONAL PATIENTS */}
          <section id="international" className="hipec-section">
            <h2>HIPEC Surgery in India for International Patients</h2>
            <p>
              International patients considering HIPEC surgery should undergo medical evaluation
              before travelling. CRS-HIPEC is a major procedure — arriving without a preliminary
              assessment may result in unnecessary travel or delays.
            </p>

            <ol className="treatment-process">
              {[
                { title: "Share Medical Records", desc: "Submit histopathology reports, recent CT/MRI scans, previous surgical records, chemotherapy history, current blood investigations, discharge summaries and current medications." },
                { title: "Specialist Medical Evaluation", desc: "Medical records are forwarded to an appropriate surgical oncology team for preliminary assessment. The specialist may request additional imaging or investigations before providing an opinion." },
                { title: "Treatment Recommendation", desc: "The treating team determines whether CRS-HIPEC should be considered, whether further systemic treatment is required or whether another approach would be more appropriate." },
                { title: "Treatment Estimate", desc: "The hospital prepares an estimate based on the proposed surgical procedure, expected hospital stay and clinical requirements." },
                { title: "Visa and Travel Planning", desc: "International patients should check Indian medical visa requirements. Travel should only be finalised after the treating team confirms the patient is medically suitable." },
                { title: "Hospital Admission and Treatment", desc: "On arrival, the patient undergoes clinical reassessment and preoperative investigations. The final treatment plan is confirmed by the treating team." },
                { title: "Postoperative Recovery", desc: "Postoperative monitoring, nutritional support, physiotherapy and follow-up care are provided." },
                { title: "Return Travel and Follow-up", desc: "The surgeon provides written fitness-to-travel advice and a follow-up plan before the patient returns home. Do not book return flights based on a fixed number of days — recovery after CRS-HIPEC is highly individual." },
              ].map((step, i) => (
                <li key={step.title}>
                  <span>{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* CTA 7 */}
            <div className="hipec-cta-block">
              <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary">
                <WhatsAppIcon />
                Start your medical travel process
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 15. GAF ASSISTANCE */}
          <section id="gaf-assistance" className="hipec-section hipec-section--tint">
            <h2>How GAF Healthcare Assists International HIPEC Patients</h2>
            <p>
              GAF Healthcare facilitates international patients seeking specialised cancer treatment
              in India. For patients considering CRS-HIPEC, the process begins with understanding
              the diagnosis and collecting relevant medical records.
            </p>

            <div className="hipec-assist-grid">
              {[
                "Collection and organisation of medical reports",
                "Coordination of specialist consultations",
                "Assistance in obtaining hospital treatment opinions",
                "Coordination of treatment estimates",
                "Assistance with hospital appointment scheduling",
                "Medical visa documentation support",
                "Airport transfers and accommodation coordination",
                "Interpreter assistance where required",
                "Coordination of hospital admission",
                "Assistance with follow-up arrangements",
              ].map((item) => (
                <div key={item} className="hipec-assist-item">
                  <CheckCircle2 className="size-4 hipec-assist-check" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hipec-callout hipec-callout--teal">
              <Shield className="size-5" aria-hidden="true" />
              <p>
                <strong>Our priority</strong> is to help patients access an appropriate specialist
                opinion rather than encouraging surgery without a proper medical assessment. A
                patient may be advised systemic chemotherapy, another surgical approach or
                supportive treatment instead of HIPEC. The final decision belongs to the treating
                medical team and the patient.
              </p>
            </div>

            {/* CTA 8 */}
            <div className="hipec-cta-block hipec-cta-block--center">
              <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary hipec-cta--lg">
                <WhatsAppIcon />
                Share your reports for a specialist opinion
                <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
              </a>
              <a href={WHATSAPP_COORDINATOR} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--outline">
                <Phone className="size-4" aria-hidden="true" />
                Speak to a coordinator
              </a>
            </div>
          </section>

          {/* 16. FAQS */}
          <section id="faqs" className="hipec-section">
            <p className="eyebrow">FAQs</p>
            <h2>Frequently Asked Questions About HIPEC Surgery in India</h2>
            <div className="treatment-faqs">
              {FAQS.map((faq, i) => (
                <details key={i}>
                  <summary>
                    {faq.q}
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related reading — canonical CMS blog URLs */}
          <section id="related-reading" className="hipec-section">
            <h2>Related Reading</h2>
            <p>
              Patient guides that expand on peritoneal disease and the CRS-HIPEC pathway:
            </p>
            <ul className="hipec-related-list">
              <li>
                <a href="/blogs/what-is-hipec-surgery">What Is HIPEC Surgery?</a>
              </li>
              <li>
                <a href="/blogs/peritoneal-metastases-treatment">Peritoneal Metastases Treatment</a>
              </li>
              <li>
                <a href="/blogs/peritoneal-carcinomatosis">Peritoneal Carcinomatosis</a>
              </li>
            </ul>
          </section>

          {/* 17. REFERENCES */}
          <section id="references" className="hipec-section hipec-section--muted">
            <h2>Medical and Scientific References</h2>
            <p className="hipec-references-note">
              This page is informed by clinical guidelines, peer-reviewed publications and
              specialist oncology organisations. References should be reviewed periodically as
              clinical evidence evolves.
            </p>
            <ol className="hipec-references-list">
              {[
                { label: "Peritoneal Surface Oncology Group International (PSOGI)", url: "https://peritoneum.org/" },
                { label: "ASCO — Treatment of metastatic colorectal cancer (CRS and HIPEC)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10506310/" },
                { label: "ESMO — Evidence-based guidelines for metastatic colorectal and gynaecological cancers", url: "https://www.esmo.org/guidelines" },
                { label: "Multi-Society Clinical Practice Guideline on CRS-HIPEC (2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11826033/" },
                { label: "Ontario Health / Cancer Care Ontario — HIPEC with cytoreductive surgery guideline", url: "https://pubmed.ncbi.nlm.nih.gov/32669924/" },
                { label: "SOAPC — Consensus guidelines for anaesthesia and perioperative management of CRS-HIPEC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6921319/" },
                { label: "INDEPSO–ISPSM — Indian consensus on enhanced recovery after CRS (2025)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11732209/" },
                { label: "NICE — Guidance on cytoreductive surgery with HIPEC (HTG569)", url: "https://www.nice.org.uk/guidance/HTG569" },
                { label: "OVHIPEC-1 — Long-term survival: cytoreductive surgery with or without HIPEC in ovarian cancer", url: "https://pubmed.ncbi.nlm.nih.gov/37708912/" },
                { label: "ASO Practice Guideline — Management of colorectal peritoneal metastases", url: "https://pubmed.ncbi.nlm.nih.gov/40587073/" },
              ].map((ref, i) => (
                <li key={i}>
                  <a href={ref.url} target="_blank" rel="noreferrer noopener">
                    {ref.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>

        </article>

        {/* ── STICKY SIDEBAR ─────────────────────────────────────────── */}
        <aside className="hipec-sidebar">
          <div className="hipec-sidebar__card">
            <h2>Considering HIPEC Surgery in India?</h2>
            <p>
              Every patient&apos;s diagnosis is different. Share your medical records for a
              specialist review before travelling.
            </p>
            <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--primary hipec-cta--full">
              <WhatsAppIcon />
              Share medical records
              <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
            </a>
            <a href={WHATSAPP_ESTIMATE} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--outline hipec-cta--full hipec-sidebar__second-cta">
              Request a treatment estimate
            </a>

            <dl className="hipec-sidebar__contact">
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="hipec-sidebar__quick-links">
            <h3>Quick links</h3>
            <ul>
              {[
                ["#what-is-hipec", "What is HIPEC?"],
                ["#cancer-types", "Which cancers?"],
                ["#eligibility", "Eligibility criteria"],
                ["#pci", "PCI score explained"],
                ["#procedure", "How it is performed"],
                ["#risks", "Risks & complications"],
                ["#recovery", "Recovery timeline"],
                ["#cost", "Cost in India"],
                ["#international", "For international patients"],
                ["#faqs", "30 FAQs"],
                ["/blogs/what-is-hipec-surgery", "What Is HIPEC Surgery?"],
                ["/blogs/peritoneal-metastases-treatment", "Peritoneal metastases"],
                ["/blogs/peritoneal-carcinomatosis", "Peritoneal carcinomatosis"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href}>
                    {label}
                    <ArrowRight className="size-3 icon-forward" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ── FINAL CTA BANNER ────────────────────────────────────────── */}
      <section className="hipec-final-cta">
        <div className="page-wrap hipec-final-cta__inner">
          <div>
            <h2>Considering HIPEC Surgery in India?</h2>
            <p>
              Before travelling, obtain a specialist assessment of your medical records to
              understand whether CRS-HIPEC may be appropriate for your diagnosis. GAF Healthcare
              coordinates consultations with specialist cancer hospitals in India, obtains treatment
              estimates and organises the medical travel process.
            </p>
          </div>
          <div className="hipec-final-cta__actions">
            <a href={WHATSAPP_RECORDS} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--bright hipec-cta--lg">
              <WhatsAppIcon />
              Share medical records for a specialist opinion
              <ArrowRight className="size-4 icon-forward" aria-hidden="true" />
            </a>
            <a href={WHATSAPP_ESTIMATE} target="_blank" rel="noreferrer" className="hipec-cta hipec-cta--outline-bright">
              Request a treatment estimate
            </a>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────────── */}
      <section className="hipec-disclaimer">
        <div className="page-wrap">
          <p>
            <strong>Medical Disclaimer:</strong> This article is intended for educational and
            informational purposes only. It does not replace a consultation with a qualified
            oncologist or surgical oncologist. HIPEC is a complex procedure with significant risks,
            and its suitability depends on the underlying cancer, extent of disease, patient fitness
            and current clinical evidence. Treatment decisions should be made following individual
            medical assessment and discussion of alternative options.
          </p>
          <p>
            <strong>Written by:</strong> GAF Healthcare Medical Content Team. &nbsp;
            <strong>Last reviewed:</strong> November 2026. &nbsp;
            <strong>References:</strong> See sources listed above.
          </p>
        </div>
      </section>
    </main>
  );
}
