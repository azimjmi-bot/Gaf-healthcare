import "@/styles/article.css";
import "@/styles/hipec.css";
import type { Metadata } from "next";
import { whatsappHref } from "@/lib/site";

export const dynamic = "force-static";

const PAGE_URL = "/blog/what-is-hipec-surgery";
const SITE_URL = "https://gaf.healthcare";

const WA_RECORDS = whatsappHref(
  "Hello, I would like to share my medical records for a specialist HIPEC treatment opinion in India.",
);
const WA_ESTIMATE = whatsappHref(
  "Hello, I would like a treatment cost estimate for HIPEC surgery in India.",
);
const WA_ELIGIBILITY = whatsappHref(
  "Hello, I would like to know if I am eligible for HIPEC surgery in India.",
);
const WA_CONSULT = whatsappHref(
  "Hello, I would like to arrange a specialist consultation for HIPEC treatment in India.",
);
const WA_COORDINATOR = whatsappHref(
  "Hello, I would like to speak with a patient coordinator about HIPEC surgery in India.",
);

export const metadata: Metadata = {
  title: "What Is HIPEC Surgery? Procedure, Benefits & Treatment in India",
  description:
    "Learn what HIPEC surgery is, how heated chemotherapy works, eligible cancers, risks, recovery and access to specialist HIPEC treatment in India.",
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  keywords: [
    "What is HIPEC surgery",
    "HIPEC surgery in India",
    "HIPEC treatment in India",
    "Hyperthermic intraperitoneal chemotherapy",
    "HIPEC procedure",
    "Cytoreductive surgery and HIPEC",
    "CRS HIPEC treatment",
    "heated chemotherapy for cancer",
    "HIPEC surgery benefits",
    "HIPEC surgery risks",
    "HIPEC recovery time",
    "HIPEC for peritoneal cancer",
    "HIPEC for ovarian cancer",
    "HIPEC surgery cost in India",
    "peritoneal carcinomatosis treatment",
  ],
  openGraph: {
    title: "What Is HIPEC Surgery? Procedure, Benefits & Treatment in India",
    description:
      "HIPEC surgery combines cytoreductive surgery with heated chemotherapy inside the abdomen. Learn how it works and how to access specialist treatment in India.",
    url: `${SITE_URL}${PAGE_URL}`,
    type: "article",
    images: [{ url: `${SITE_URL}/treatments/hipec-procedure-illustration.webp`, width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${SITE_URL}${PAGE_URL}#webpage`,
      name: "What Is HIPEC Surgery? Procedure, Benefits & Treatment in India",
      description:
        "Learn what HIPEC surgery is, how heated chemotherapy works, eligible cancers, risks, recovery and access to specialist HIPEC treatment in India.",
      url: `${SITE_URL}${PAGE_URL}`,
      lastReviewed: "2026-11-01",
      inLanguage: "en",
      about: { "@type": "MedicalProcedure", name: "Hyperthermic Intraperitoneal Chemotherapy (HIPEC)" },
      audience: { "@type": "MedicalAudience", audienceType: "Patients, caregivers, medical professionals" },
      medicalAudience: { "@type": "MedicalAudience", audienceType: "Patients" },
      spatialCoverage: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Tanzania" },
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "Ethiopia" },
        { "@type": "Country", name: "Nigeria" },
      ],
      publisher: { "@type": "Organization", name: "GAF Healthcare", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: "What Is HIPEC Surgery?",
          item: `${SITE_URL}${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is HIPEC surgery in simple words?",
          acceptedAnswer: { "@type": "Answer", text: "HIPEC surgery is a specialised cancer treatment in which heated chemotherapy is circulated inside the abdominal cavity after surgeons remove visible cancer deposits. It is used for selected cancers affecting the peritoneum, the lining of the abdominal cavity." },
        },
        {
          "@type": "Question",
          name: "What does HIPEC stand for?",
          acceptedAnswer: { "@type": "Answer", text: "HIPEC stands for Hyperthermic Intraperitoneal Chemotherapy. Hyperthermic means heated, intraperitoneal means inside the abdominal cavity, and chemotherapy refers to medicines used to destroy or control cancer cells." },
        },
        {
          "@type": "Question",
          name: "Which cancers are treated with HIPEC?",
          acceptedAnswer: { "@type": "Answer", text: "HIPEC may be considered for selected patients with pseudomyxoma peritonei, peritoneal mesothelioma, ovarian cancer, colorectal cancer with peritoneal metastases, gastric cancer with peritoneal metastases and certain appendiceal malignancies. The strength of evidence differs between these conditions." },
        },
        {
          "@type": "Question",
          name: "Is HIPEC surgery a major operation?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. CRS-HIPEC is a major operation that may involve removal of the peritoneum, tumour deposits and affected portions of abdominal organs. Patients require general anaesthesia, postoperative monitoring and an extended recovery period." },
        },
        {
          "@type": "Question",
          name: "Can HIPEC cure cancer?",
          acceptedAnswer: { "@type": "Answer", text: "In selected patients with certain peritoneal malignancies, complete cytoreductive surgery combined with HIPEC may offer the possibility of long-term remission or potentially curative treatment. However, cancer recurrence remains possible even after complete surgery." },
        },
        {
          "@type": "Question",
          name: "Is HIPEC surgery available in India?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Specialist surgical oncology teams in India are involved in CRS-HIPEC and peritoneal surface malignancy management. Patients should verify that the specific hospital and surgeon currently offer the procedure for their cancer type." },
        },
        {
          "@type": "Question",
          name: "How much does HIPEC surgery cost in India?",
          acceptedAnswer: { "@type": "Answer", text: "The cost depends on the cancer type, extent of surgery, chemotherapy drugs, ICU requirements and hospitalisation. There is no single fixed price. Patients should share their medical records and imaging to obtain an individualised estimate from the treating hospital." },
        },
        {
          "@type": "Question",
          name: "What is the difference between HIPEC and conventional chemotherapy?",
          acceptedAnswer: { "@type": "Answer", text: "Conventional chemotherapy is usually given intravenously to treat cancer throughout the body. HIPEC delivers heated chemotherapy directly into the abdominal cavity during surgery to target microscopic disease on abdominal surfaces. Some patients may require both." },
        },
        {
          "@type": "Question",
          name: "What is the Peritoneal Cancer Index (PCI)?",
          acceptedAnswer: { "@type": "Answer", text: "PCI measures the distribution and extent of tumour deposits across 13 abdominal regions. The score ranges from 0 to 39 and helps surgeons assess disease burden and surgical feasibility. Location of deposits, particularly small bowel involvement, is also important." },
        },
        {
          "@type": "Question",
          name: "How long does recovery after HIPEC take?",
          acceptedAnswer: { "@type": "Answer", text: "Initial hospital recovery commonly lasts one to three weeks. Complete recovery may take several months. Duration depends on surgical complexity, bowel recovery, complications, nutritional status and general health." },
        },
        {
          "@type": "Question",
          name: "What is the difference between HIPEC and PIPAC?",
          acceptedAnswer: { "@type": "Answer", text: "HIPEC delivers heated liquid chemotherapy into the abdominal cavity during cytoreductive surgery. PIPAC delivers pressurised aerosolised chemotherapy through laparoscopic access and does not itself remove visible tumours. They have different indications and cannot be substituted for each other." },
        },
        {
          "@type": "Question",
          name: "Who is eligible for HIPEC surgery?",
          acceptedAnswer: { "@type": "Answer", text: "Eligibility depends on cancer type and histopathology, extent of peritoneal disease (PCI), feasibility of complete tumour removal, general health and organ function. A multidisciplinary team experienced in peritoneal malignancies makes the final assessment." },
        },
        {
          "@type": "Question",
          name: "Can international patients travel to India for HIPEC treatment?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. International patients can seek specialist evaluation in India. They should share medical records for preliminary assessment before travel. The treating team determines whether CRS-HIPEC is appropriate and when the patient is medically fit to travel home." },
        },
        {
          "@type": "Question",
          name: "What chemotherapy drugs are used in HIPEC?",
          acceptedAnswer: { "@type": "Answer", text: "Common agents include mitomycin C, cisplatin, oxaliplatin and doxorubicin. The drug depends on the primary cancer type, available evidence, kidney function and the treating centre's protocol. These agents are not interchangeable." },
        },
        {
          "@type": "Question",
          name: "Why is chemotherapy heated during HIPEC?",
          acceptedAnswer: { "@type": "Answer", text: "Heat may enhance the activity of certain chemotherapy drugs against cancer cells and allows the solution to contact peritoneal surfaces where microscopic cancer cells may remain after tumour removal. The effect varies by drug, temperature and tumour biology." },
        },
      ],
    },
  ],
};

function CtaButton({
  href,
  variant = "primary",
  children,
  fullWidth,
}: {
  href: string;
  variant?: "primary" | "outline" | "bright" | "outline-bright";
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={[
        "hipec-cta",
        variant === "primary" ? "hipec-cta--primary"
        : variant === "bright" ? "hipec-cta--bright"
        : variant === "outline-bright" ? "hipec-cta--outline-bright"
        : "hipec-cta--outline",
        fullWidth ? "hipec-cta--full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}

function QuickAnswer({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="article-quick-answer">
      {label && <p className="article-quick-answer__label">{label}</p>}
      <div className="article-quick-answer__body">{children}</div>
    </div>
  );
}

export default function WhatIsHipecSurgery() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="hipec-hero">
        <div className="page-wrap hipec-hero__inner">
          <nav aria-label="Breadcrumb" className="treatment-breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li aria-current="page">What Is HIPEC Surgery?</li>
            </ol>
          </nav>
          <div className="hipec-hero__content">
            <div className="hipec-hero__text">
              <p className="eyebrow">Cancer Treatment · Surgical Oncology</p>
              <h1>What Is HIPEC Surgery? A Complete Guide to Heated Chemotherapy and Treatment in India</h1>
              <p className="hipec-hero__lede">
                HIPEC surgery combines cytoreductive surgery with heated chemotherapy delivered directly into the abdominal cavity. India offers specialist surgical oncology evaluation and CRS-HIPEC treatment for carefully selected patients with peritoneal malignancies.
              </p>
              <div className="hipec-hero__ctas">
                <CtaButton href={WA_RECORDS}>Share Medical Records</CtaButton>
                <CtaButton href={WA_ELIGIBILITY} variant="outline">Check Eligibility</CtaButton>
              </div>
            </div>
            <div className="hipec-hero__card">
              <p className="hipec-hero__card-label">Quick Facts</p>
              <dl className="hipec-key-facts">
                <div><dt>Full name</dt><dd>Hyperthermic Intraperitoneal Chemotherapy</dd></div>
                <div><dt>Combined with</dt><dd>Cytoreductive surgery (CRS)</dd></div>
                <div><dt>Chemo temperature</dt><dd>41–43 °C</dd></div>
                <div><dt>Perfusion duration</dt><dd>30–120 minutes</dd></div>
                <div><dt>Surgery duration</dt><dd>6–12 hours</dd></div>
                <div><dt>Hospital stay</dt><dd>1–3 weeks typically</dd></div>
                <div><dt>Treatment in India</dt><dd>Specialist centres available</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
      <div className="page-wrap hipec-layout">
        <article className="hipec-article article-body">

          {/* 1. What Is HIPEC */}
          <section id="what-is-hipec" className="hipec-section">
            <h2>1. What Is HIPEC Surgery?</h2>
            <p>
              HIPEC surgery is an advanced cancer treatment in which heated chemotherapy is circulated directly inside the abdominal cavity to target microscopic cancer cells that may remain after visible tumours have been surgically removed.
            </p>
            <p>
              HIPEC stands for <strong>Hyperthermic Intraperitoneal Chemotherapy</strong>. It is performed alongside a major operation called cytoreductive surgery (CRS), which removes visible cancer deposits from the abdominal cavity. The treatment is primarily used for selected cancers affecting the peritoneum — the thin membrane lining the abdominal cavity.
            </p>
            <QuickAnswer label="In simple terms">
              <p>HIPEC is a specialised form of heated chemotherapy delivered inside the abdomen, usually after surgeons remove visible cancer through cytoreductive surgery (CRS).</p>
            </QuickAnswer>
            <figure className="hipec-figure">
              <img
                src="/treatments/hipec-procedure-illustration.webp"
                alt="HIPEC procedure illustration showing heated chemotherapy circulating inside the abdominal cavity"
                width={900}
                height={500}
                loading="lazy"
              />
              <figcaption>Illustration: heated chemotherapy circulated inside the abdominal cavity after cytoreductive surgery removes visible cancer deposits.</figcaption>
            </figure>
          </section>

          {/* 2. What Does HIPEC Stand For */}
          <section id="hipec-meaning" className="hipec-section">
            <h2>2. What Does HIPEC Stand For?</h2>
            <p>HIPEC is the abbreviation for Hyperthermic Intraperitoneal Chemotherapy. Each word describes an important part of the treatment.</p>
            <div className="hipec-table-wrap">
              <table>
                <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td>Hyperthermic</td><td>Heated to a controlled temperature</td></tr>
                  <tr><td>Intraperitoneal</td><td>Administered inside the abdominal cavity</td></tr>
                  <tr><td>Chemotherapy</td><td>Medicines used to destroy or control cancer cells</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Peritoneum */}
          <section id="peritoneum" className="hipec-section">
            <h2>3. Understanding the Peritoneum</h2>
            <p>The peritoneum is a thin membrane lining the abdominal cavity and covering many organs within it. When cancer cells detach from a primary tumour and attach to these surfaces, the condition is known as peritoneal metastasis or peritoneal carcinomatosis.</p>
            <h3>Which Cancers Can Spread to the Peritoneum?</h3>
            <ul>
              <li>Ovarian cancer</li>
              <li>Colorectal cancer</li>
              <li>Gastric or stomach cancer</li>
              <li>Appendiceal cancer</li>
              <li>Certain pancreatic cancers</li>
              <li>Primary peritoneal cancer</li>
              <li>Peritoneal mesothelioma (originates in the peritoneal lining)</li>
            </ul>
          </section>

          {/* 4. How Does HIPEC Work */}
          <section id="how-hipec-works" className="hipec-section">
            <h2>4. How Does HIPEC Surgery Work?</h2>
            <p>The procedure generally involves two major stages.</p>
            <h3>Stage 1: Cytoreductive Surgery (CRS)</h3>
            <p>The surgeon removes visible cancer deposits from the abdominal cavity, which may include affected sections of the peritoneum, omentum, bowel or other organs. The goal is complete macroscopic cytoreduction — no visible tumour remaining.</p>
            <h3>Stage 2: Hyperthermic Intraperitoneal Chemotherapy</h3>
            <p>Once CRS is completed, heated chemotherapy is circulated throughout the abdominal cavity using a specialised perfusion machine. The solution is heated to approximately 41–43 °C and circulated for 30–120 minutes, then drained before the surgical team completes the operation.</p>
            <figure className="hipec-figure">
              <img
                src="/treatments/crs-hipec-combined-treatment.webp"
                alt="CRS-HIPEC combined treatment diagram showing the two-stage procedure"
                width={900}
                height={500}
                loading="lazy"
              />
              <figcaption>CRS-HIPEC combines tumour-removal surgery with intraperitoneal heated chemotherapy perfusion.</figcaption>
            </figure>
          </section>

          {/* 5. Why Heat */}
          <section id="why-heated" className="hipec-section">
            <h2>5. Why Is Chemotherapy Heated During HIPEC?</h2>
            <p>Laboratory and clinical research suggests that heat can increase the activity of certain chemotherapy agents against cancer cells. Direct delivery into the abdominal cavity allows the treatment solution to contact peritoneal surfaces. The specialised equipment controls temperature, circulation and exposure duration throughout the procedure.</p>
            <div className="hipec-callout hipec-callout--warning">
              <p><strong>Important:</strong> Heating chemotherapy does not guarantee destruction of all cancer cells. Its clinical value must be evaluated separately for each cancer type and patient.</p>
            </div>
          </section>

          {/* 6. Which Cancers */}
          <section id="cancers-treated" className="hipec-section">
            <h2>6. Which Cancers Can Be Treated With HIPEC?</h2>
            <div className="hipec-cancer-grid">
              {[
                { name: "Pseudomyxoma Peritonei", desc: "CRS-HIPEC is an established specialist treatment for resectable pseudomyxoma peritonei." },
                { name: "Ovarian Cancer", desc: "Selected stage III patients receiving interval CRS after neoadjuvant chemo may be considered. Supported by the OVHIPEC-1 trial." },
                { name: "Colorectal Cancer", desc: "CRS may be considered for isolated peritoneal metastases. ASCO recommends against adding oxaliplatin-based HIPEC to CRS in this setting." },
                { name: "Gastric Cancer", desc: "May be considered in highly selected patients with limited peritoneal disease and feasible complete cytoreduction." },
                { name: "Peritoneal Mesothelioma", desc: "CRS-HIPEC is an important specialist approach for carefully selected patients." },
                { name: "Appendiceal Cancer", desc: "Depending on histological type and disease distribution, selected patients may benefit from CRS-HIPEC." },
              ].map((c) => (
                <div key={c.name} className="hipec-cancer-card">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="hipec-callout hipec-callout--info">
              <p>The strength of clinical evidence and treatment recommendations varies significantly between cancer types. Cancer-specific guidelines and multidisciplinary assessment are essential.</p>
            </div>
          </section>

          {/* CTA block 1 */}
          <div className="hipec-cta-block hipec-cta-block--center">
            <CtaButton href={WA_RECORDS}>Share Records for HIPEC Opinion</CtaButton>
            <CtaButton href={WA_ELIGIBILITY} variant="outline">Ask About Eligibility</CtaButton>
          </div>

          {/* 7. Eligibility */}
          <section id="eligibility" className="hipec-section">
            <h2>7. Who Is Eligible for HIPEC Surgery?</h2>
            <p>HIPEC is a major operation. Patient selection is one of the most important aspects of treatment. The specialist team generally considers:</p>
            <div className="hipec-eligibility-grid">
              {[
                { title: "Cancer Type", body: "Diagnosis and histopathology determine whether HIPEC is appropriate." },
                { title: "Extent of Disease", body: "Distribution of tumour deposits assessed by imaging and diagnostic laparoscopy." },
                { title: "Peritoneal Cancer Index", body: "Measures disease burden across 13 abdominal regions (score 0–39)." },
                { title: "Complete Cytoreduction", body: "Surgeon must determine whether visible disease can be removed completely." },
                { title: "General Health", body: "Patient must tolerate major surgery, anaesthesia and postoperative recovery." },
                { title: "Organ Function", body: "Kidney, liver and heart function assessed before surgery." },
              ].map((item) => (
                <div key={item.title} className="hipec-eligibility-card">
                  <span className="hipec-eligibility-icon">✓</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3>Who May Not Be Suitable?</h3>
            <ul>
              <li>Cancer extensively spread outside the abdominal cavity</li>
              <li>Complete cytoreduction unlikely to be achievable</li>
              <li>Extensive small bowel or mesenteric involvement</li>
              <li>Severe uncontrolled medical conditions</li>
              <li>Disease progressing rapidly despite systemic treatment</li>
              <li>Risks of surgery outweigh the expected benefits</li>
            </ul>
          </section>

          {/* 8. PCI */}
          <section id="pci" className="hipec-section">
            <h2>8. What Is the Peritoneal Cancer Index (PCI)?</h2>
            <p>The PCI is a scoring system used to assess the extent of cancer within the abdominal cavity. The abdomen is divided into 13 regions, each assigned a lesion-size score. The combined score ranges from 0 to 39.</p>
            <div className="hipec-pci-layout">
              <figure className="hipec-figure hipec-figure--pci">
                <img
                  src="/treatments/peritoneal-cancer-index-diagram.webp"
                  alt="Peritoneal Cancer Index PCI diagram showing 13 abdominal regions scored 0–3"
                  width={300}
                  height={320}
                  loading="lazy"
                />
                <figcaption>PCI scores cancer deposits across 13 abdominal regions (0–39 total).</figcaption>
              </figure>
              <div>
                <div className="hipec-table-wrap">
                  <table>
                    <thead><tr><th>Score</th><th>Description</th></tr></thead>
                    <tbody>
                      <tr><td>LS-0</td><td>No visible tumour</td></tr>
                      <tr><td>LS-1</td><td>Deposits up to 0.5 cm</td></tr>
                      <tr><td>LS-2</td><td>Deposits 0.5–5 cm</td></tr>
                      <tr><td>LS-3</td><td>Deposits &gt;5 cm or confluent disease</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">A higher PCI indicates greater tumour burden. There is no universal PCI cut-off — acceptable disease burden varies by cancer type.</p>
              </div>
            </div>
          </section>

          {/* 9. Procedure Steps */}
          <section id="procedure" className="hipec-section">
            <h2>9. What Happens During a HIPEC Procedure?</h2>
            <div className="hipec-recovery-steps">
              {[
                { phase: "Step 1", title: "General Anaesthesia", body: "The patient is given general anaesthesia. Vital signs, breathing, circulation and urine output are monitored continuously." },
                { phase: "Step 2", title: "Abdominal Examination", body: "The surgeon examines the cavity, assesses PCI and determines whether complete cytoreduction is feasible." },
                { phase: "Step 3", title: "Cytoreductive Surgery", body: "Visible tumour deposits are removed. This may include peritonectomy, omentectomy, bowel resection and removal of affected organs." },
                { phase: "Step 4", title: "HIPEC Tube Placement", body: "Specialised inflow and outflow tubes are positioned inside the abdominal cavity with temperature monitoring." },
                { phase: "Step 5", title: "Heated Chemotherapy Circulation", body: "Chemotherapy is heated to 41–43 °C and circulated for 30–120 minutes using a specialised perfusion machine." },
                { phase: "Step 6", title: "Drainage and Closure", body: "The chemotherapy solution is drained. The surgical team completes remaining steps and closes the abdomen." },
                { phase: "Step 7", title: "ICU Monitoring", body: "The patient is transferred to an intensive care unit for close observation of kidney function, blood counts and fluid balance." },
              ].map((step) => (
                <div key={step.phase} className="hipec-recovery-step">
                  <span className="hipec-recovery-step__phase">{step.phase}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. HIPEC vs Chemo */}
          <section id="hipec-vs-chemo" className="hipec-section">
            <h2>10. HIPEC vs Conventional Chemotherapy</h2>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Feature</th><th>Conventional Chemotherapy</th><th>HIPEC</th></tr>
                </thead>
                <tbody>
                  <tr><td>Administration</td><td>Usually intravenous or oral</td><td>Directly into abdominal cavity</td></tr>
                  <tr><td>Temperature</td><td>Not heated</td><td>Heated solution (41–43 °C)</td></tr>
                  <tr><td>Setting</td><td>Outpatient or inpatient</td><td>During surgery</td></tr>
                  <tr><td>Primary target</td><td>Cancer throughout the body</td><td>Microscopic disease on abdominal surfaces</td></tr>
                  <tr><td>Surgery required</td><td>Not necessarily</td><td>Combined with CRS</td></tr>
                  <tr><td>Pattern</td><td>Often repeated cycles</td><td>Intraoperative perfusion</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 11. HIPEC vs PIPAC */}
          <section id="hipec-vs-pipac" className="hipec-section">
            <h2>11. HIPEC vs PIPAC</h2>
            <p>PIPAC stands for Pressurised Intraperitoneal Aerosol Chemotherapy. It delivers chemotherapy as a pressurised aerosol via laparoscopy and does not itself remove visible tumours through cytoreductive surgery.</p>
            <div className="hipec-table-wrap">
              <table>
                <thead>
                  <tr><th>Feature</th><th>HIPEC</th><th>PIPAC</th></tr>
                </thead>
                <tbody>
                  <tr><td>Delivery</td><td>Heated liquid</td><td>Pressurised aerosol</td></tr>
                  <tr><td>Access</td><td>Open abdomen during CRS</td><td>Laparoscopic</td></tr>
                  <tr><td>Tumour removal</td><td>Combined with CRS</td><td>Does not itself remove visible tumours</td></tr>
                  <tr><td>Pattern</td><td>Usually intraoperative — single</td><td>May be repeated</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 12. Drugs */}
          <section id="drugs" className="hipec-section">
            <h2>12. What Chemotherapy Drugs Are Used in HIPEC?</h2>
            <div className="hipec-table-wrap">
              <table>
                <thead><tr><th>Drug</th><th>General Clinical Context</th></tr></thead>
                <tbody>
                  <tr><td>Mitomycin C</td><td>Used in selected appendiceal and colorectal peritoneal malignancy protocols</td></tr>
                  <tr><td>Cisplatin</td><td>Used in selected ovarian and other peritoneal malignancy protocols</td></tr>
                  <tr><td>Oxaliplatin</td><td>Used in certain colorectal protocols — ASCO recommends against in colorectal CRS setting</td></tr>
                  <tr><td>Doxorubicin</td><td>Used in selected specialised protocols</td></tr>
                </tbody>
              </table>
            </div>
            <p>Drug selection depends on the tumour type, available evidence, kidney function and the treating centre's protocol. Patients should request an explanation of the proposed chemotherapy regimen.</p>
          </section>

          {/* CTA block 2 */}
          <div className="hipec-cta-block hipec-cta-block--center">
            <CtaButton href={WA_CONSULT}>Arrange a Specialist Consultation</CtaButton>
          </div>

          {/* 13. Evidence */}
          <section id="evidence" className="hipec-section">
            <h2>13. What Does Clinical Research Say About HIPEC?</h2>
            <div className="hipec-evidence-cards">
              <div className="hipec-evidence-card">
                <h3>Pseudomyxoma Peritonei</h3>
                <p>CRS-HIPEC is an established specialist treatment for resectable pseudomyxoma peritonei, supported by international consensus recommendations.</p>
              </div>
              <div className="hipec-evidence-card">
                <h3>Ovarian Cancer</h3>
                <p>The OVHIPEC-1 randomised trial demonstrated improved recurrence-free and overall survival in selected stage III patients undergoing interval CRS.</p>
              </div>
              <div className="hipec-evidence-card">
                <h3>Colorectal Cancer</h3>
                <p>The PRODIGE 7 trial did not demonstrate an overall survival benefit from adding oxaliplatin-based HIPEC to CRS. ASCO recommends against it in this setting.</p>
              </div>
            </div>
            <div className="hipec-callout hipec-callout--teal">
              <p>Indian specialists should consider both international guidelines and the INDEPSO–ISPSM consensus recommendations when assessing peritoneal malignancies.</p>
            </div>
          </section>

          {/* 14. Recovery */}
          <section id="recovery" className="hipec-section">
            <h2>14. Recovery After HIPEC Surgery</h2>
            <figure className="hipec-figure">
              <img
                src="/treatments/hipec-recovery-timeline.webp"
                alt="HIPEC surgery recovery timeline from ICU through hospital discharge to full recovery"
                width={900}
                height={400}
                loading="lazy"
              />
              <figcaption>Typical HIPEC recovery timeline: ICU monitoring → hospital ward → discharge → full recovery over several months.</figcaption>
            </figure>
            <div className="hipec-recovery-steps">
              {[
                { phase: "Days 1–3", title: "ICU Monitoring", body: "Intensive monitoring of blood pressure, kidney function, urine output, blood counts and drain output." },
                { phase: "Week 1", title: "Mobilisation Begins", body: "Gradual mobilisation, breathing exercises and nutritional rehabilitation. Oral intake introduced depending on bowel recovery." },
                { phase: "Week 2+", title: "Increasing Activity", body: "Patients begin tolerating more food and increasing physical activity. Discharge depends on bowel function and recovery." },
                { phase: "Weeks 4–8", title: "Home Recovery", body: "Strenuous activities restricted per surgeon's instructions. Follow-up imaging and blood investigations continue." },
                { phase: "Months 2–6", title: "Full Recovery", body: "Complete recovery may take several months. Nutritional support and additional systemic cancer treatment may be required." },
              ].map((step) => (
                <div key={step.phase} className="hipec-recovery-step">
                  <span className="hipec-recovery-step__phase">{step.phase}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <QuickAnswer label="Hospital stay in India">
              <p>Hospitalisation commonly lasts around one to three weeks, although some patients require shorter or longer stays. International patients should avoid booking fixed return travel dates before surgery.</p>
            </QuickAnswer>
          </section>

          {/* 15. Cost */}
          <section id="cost" className="hipec-section">
            <h2>15. What Is the Cost of HIPEC Surgery in India?</h2>
            <p>The cost of HIPEC surgery in India varies according to the cancer type, extent of disease, complexity of cytoreductive surgery, chemotherapy protocol and postoperative requirements. <strong>There is no single fixed price applicable to every patient.</strong></p>
            <div className="hipec-table-wrap">
              <table>
                <caption>Major cost components that affect the final estimate</caption>
                <thead><tr><th>Component</th><th>What It Covers</th></tr></thead>
                <tbody>
                  <tr><td>Specialist consultation</td><td>Surgical and medical oncology assessment</td></tr>
                  <tr><td>Diagnostic investigations</td><td>CT, MRI, PET-CT and laboratory testing</td></tr>
                  <tr><td>Cytoreductive surgery</td><td>Surgeon, operating theatre and surgical materials</td></tr>
                  <tr><td>HIPEC treatment</td><td>Perfusion equipment, chemotherapy and related consumables</td></tr>
                  <tr><td>Anaesthesia</td><td>Specialist anaesthesia and monitoring</td></tr>
                  <tr><td>ICU admission</td><td>Intensive monitoring and postoperative care</td></tr>
                  <tr><td>Hospitalisation</td><td>Room, nursing and inpatient services</td></tr>
                  <tr><td>Medicines</td><td>Antibiotics, pain management and supportive treatment</td></tr>
                </tbody>
              </table>
            </div>
            <QuickAnswer label="How to get a cost estimate">
              <p>Share your histopathology report, recent CT or MRI imaging, previous surgical records, chemotherapy history and current blood investigations. The hospital can then review the case and prepare an initial itemised estimate. For international patients, the budget should also include accommodation, local transport and the possibility of a longer stay.</p>
            </QuickAnswer>
            <div className="hipec-cta-block hipec-cta-block--center">
              <CtaButton href={WA_ESTIMATE}>Request a Cost Estimate</CtaButton>
            </div>
          </section>

          {/* 16. International Patients */}
          <section id="international-patients" className="hipec-section">
            <h2>16. How Can International Patients Access HIPEC Treatment in India?</h2>
            <ol className="hipec-ordered-list">
              <li><strong>Submit Medical Records</strong> — histopathology, CT/MRI, previous surgery and chemotherapy history, discharge summaries.</li>
              <li><strong>Obtain a Specialist Opinion</strong> — the records are reviewed; further imaging or pathology review may be requested.</li>
              <li><strong>Understand Treatment Options</strong> — CRS-HIPEC, systemic chemotherapy or another approach is recommended based on evidence.</li>
              <li><strong>Obtain a Treatment Estimate</strong> — itemised quote based on proposed treatment and expected hospital stay.</li>
              <li><strong>Medical Visa and Travel</strong> — finalise travel only after the treating team confirms medical fitness.</li>
              <li><strong>Hospital Admission</strong> — clinical reassessment and preoperative investigations on arrival.</li>
              <li><strong>Recovery and Return Travel</strong> — the treating surgeon provides written fitness-to-travel advice before discharge.</li>
            </ol>
          </section>

          {/* 17. GAF Healthcare */}
          <section id="gaf-healthcare" className="hipec-section hipec-section--tint">
            <h2>17. How GAF Healthcare Assists Patients Seeking HIPEC Treatment</h2>
            <p>GAF Healthcare facilitates international patients seeking specialised cancer treatment in India. Our priority is to help patients access an appropriate specialist opinion rather than encouraging surgery without proper medical assessment.</p>
            <div className="hipec-assist-grid">
              {[
                "Medical report collection and organisation",
                "Specialist surgical oncology consultation coordination",
                "Hospital treatment opinion assistance",
                "Treatment estimate coordination",
                "Hospital appointment scheduling",
                "Medical visa documentation support",
                "Airport transfers and accommodation",
                "Interpreter assistance where required",
                "Hospital admission coordination",
                "Post-treatment follow-up arrangements",
              ].map((item) => (
                <div key={item} className="hipec-assist-item">
                  <span className="hipec-assist-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4">Patients from <strong>Tanzania, Kenya, Ethiopia, Uganda, Zambia, Nigeria, Iraq</strong> and other countries can approach GAF Healthcare for assistance with coordinating their medical evaluation and treatment journey in India.</p>
            <div className="hipec-cta-block hipec-cta-block--center">
              <CtaButton href={WA_COORDINATOR}>Speak With a Patient Coordinator</CtaButton>
              <CtaButton href={WA_RECORDS} variant="outline">Share Medical Records</CtaButton>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="hipec-section">
            <h2>Frequently Asked Questions About HIPEC Surgery in India</h2>
            <div className="treatment-faqs">
              {[
                {
                  q: "What is HIPEC surgery in simple words?",
                  a: "HIPEC surgery is a specialised cancer treatment in which heated chemotherapy is circulated inside the abdominal cavity after surgeons remove visible cancer deposits. It is used for selected cancers affecting the peritoneum.",
                },
                {
                  q: "What does HIPEC stand for?",
                  a: "HIPEC stands for Hyperthermic Intraperitoneal Chemotherapy. Hyperthermic means heated, intraperitoneal means inside the abdominal cavity, and chemotherapy refers to medicines used to destroy or control cancer cells.",
                },
                {
                  q: "Which cancers are treated with HIPEC?",
                  a: "HIPEC may be considered for selected patients with pseudomyxoma peritonei, peritoneal mesothelioma, ovarian cancer, colorectal peritoneal metastases, gastric peritoneal metastases and certain appendiceal malignancies. Evidence differs between these conditions.",
                },
                {
                  q: "Is HIPEC surgery a major operation?",
                  a: "Yes. CRS-HIPEC is a major operation that may involve removal of the peritoneum, tumour deposits and affected portions of abdominal organs. Patients require general anaesthesia, postoperative monitoring and an extended recovery period.",
                },
                {
                  q: "Can HIPEC cure cancer?",
                  a: "In selected patients with certain peritoneal malignancies, complete cytoreductive surgery combined with HIPEC may offer long-term remission or potentially curative treatment. Cancer recurrence remains possible even after complete surgery.",
                },
                {
                  q: "Why is chemotherapy heated during HIPEC?",
                  a: "Heat may enhance the activity of certain chemotherapy drugs. Delivering the solution directly into the abdominal cavity allows it to contact peritoneal surfaces where microscopic cancer cells may remain after tumour removal.",
                },
                {
                  q: "What is the difference between CRS and HIPEC?",
                  a: "CRS removes visible cancer deposits through surgery. HIPEC circulates heated chemotherapy inside the abdomen after tumour removal to target microscopic residual disease. The two are commonly combined for selected peritoneal malignancies.",
                },
                {
                  q: "What is the difference between HIPEC and PIPAC?",
                  a: "HIPEC delivers heated liquid chemotherapy into the abdominal cavity during cytoreductive surgery. PIPAC delivers pressurised aerosolised chemotherapy through laparoscopy and does not itself remove visible tumours. They have different indications.",
                },
                {
                  q: "What is the Peritoneal Cancer Index (PCI)?",
                  a: "PCI measures the distribution and extent of tumour deposits across 13 abdominal regions. The score ranges from 0 to 39 and helps surgeons assess disease burden and surgical feasibility.",
                },
                {
                  q: "What chemotherapy drugs are used in HIPEC?",
                  a: "Common agents include mitomycin C, cisplatin, oxaliplatin and doxorubicin. Drug selection depends on the primary cancer, available evidence, kidney function and the treating centre's protocol.",
                },
                {
                  q: "How long does HIPEC surgery take?",
                  a: "The operation may take approximately 6–12 hours or longer. Duration depends on tumour distribution, organs requiring removal, reconstruction needed and the chemotherapy protocol.",
                },
                {
                  q: "Is HIPEC suitable for stage 4 cancer?",
                  a: "Some patients with stage IV cancer may be considered if the disease is predominantly confined to the peritoneum and complete cytoreduction is achievable. Widespread distant metastases may make surgery unsuitable. Eligibility depends on individual clinical assessment.",
                },
                {
                  q: "What are the risks of HIPEC surgery?",
                  a: "Potential risks include infection, bleeding, bowel leakage, intestinal obstruction, kidney injury, blood clots, respiratory complications, electrolyte disturbances and chemotherapy-related toxicity.",
                },
                {
                  q: "How long does recovery after HIPEC take?",
                  a: "Initial hospital recovery commonly lasts one to three weeks. Complete recovery may take several months. Duration depends on surgical complexity, bowel recovery, complications and general health.",
                },
                {
                  q: "Is HIPEC surgery available in India?",
                  a: "Yes. Specialist surgical oncology teams in India are involved in CRS-HIPEC and peritoneal surface malignancy management. Patients should verify the specific hospital and surgeon have experience with their cancer type.",
                },
                {
                  q: "How much does HIPEC surgery cost in India?",
                  a: "The cost depends on cancer type, extent of surgery, chemotherapy drugs, ICU requirements and hospitalisation. There is no single fixed price. Share medical records and imaging to obtain an individualised estimate from the treating hospital.",
                },
                {
                  q: "Can international patients travel to India for HIPEC treatment?",
                  a: "Yes. International patients can seek specialist evaluation in India by sharing medical records for preliminary assessment before travel. The treating team determines suitability and when the patient is fit to travel home.",
                },
                {
                  q: "What documents are required for a HIPEC consultation in India?",
                  a: "Patients should provide histopathology reports, recent CT or MRI images, previous surgical records, chemotherapy history, discharge summaries, tumour marker results and current blood investigations.",
                },
                {
                  q: "How long should international patients stay in India after HIPEC?",
                  a: "Hospitalisation commonly lasts one to three weeks, but the overall time in India may be considerably longer due to postoperative recovery. Never book return flights based on a fixed number of days — the treating surgeon determines the appropriate travel date.",
                },
                {
                  q: "Does every patient with peritoneal cancer need HIPEC?",
                  a: "No. Some patients may benefit from systemic chemotherapy, surgery without HIPEC, targeted therapy, immunotherapy or supportive care. HIPEC is reserved for carefully selected patients based on cancer type and treatment suitability.",
                },
              ].map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <div><p>{faq.a}</p></div>
                </details>
              ))}
            </div>
          </section>

          {/* References */}
          <section id="references" className="hipec-section">
            <h2>Scientific References</h2>
            <p className="hipec-references-note">The following sources provide the clinical foundation for this article. Clinical evidence and treatment recommendations evolve; review these periodically.</p>
            <ol className="hipec-references-list">
              <li>Multi-Society Clinical Practice Guideline on CRS-HIPEC (2024). <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11826033/" target="_blank" rel="noopener noreferrer">pmc.ncbi.nlm.nih.gov/articles/PMC11826033/</a></li>
              <li>ASCO Guideline: Treatment of Metastatic Colorectal Cancer. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10506310/" target="_blank" rel="noopener noreferrer">pmc.ncbi.nlm.nih.gov/articles/PMC10506310/</a></li>
              <li>INDEPSO–ISPSM Indian Consensus on Enhanced Recovery After CRS With or Without HIPEC (2025). <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11732209/" target="_blank" rel="noopener noreferrer">pmc.ncbi.nlm.nih.gov/articles/PMC11732209/</a></li>
              <li>INDEPSO–ISPSM Consensus on Colorectal Peritoneal Metastases. <a href="https://pubmed.ncbi.nlm.nih.gov/39637347/" target="_blank" rel="noopener noreferrer">pubmed.ncbi.nlm.nih.gov/39637347/</a></li>
              <li>OVHIPEC-1 Clinical Trial: Long-Term Survival Outcomes. <a href="https://pubmed.ncbi.nlm.nih.gov/37708912/" target="_blank" rel="noopener noreferrer">pubmed.ncbi.nlm.nih.gov/37708912/</a></li>
            </ol>
          </section>

          {/* Related articles */}
          <section className="hipec-section">
            <h2>Related Articles</h2>
            <ul>
              <li><a href="/treatments/hipec-surgery-in-india">HIPEC Surgery in India – Full Treatment Guide</a></li>
              <li><a href="/blogs">More Cancer Treatment Articles</a></li>
            </ul>
          </section>

        </article>

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside className="hipec-sidebar">
          <div className="hipec-sidebar__card">
            <h2>Get a Specialist HIPEC Opinion</h2>
            <p>Share your medical records for a preliminary assessment from a specialist surgical oncology team in India.</p>
            <CtaButton href={WA_RECORDS} fullWidth>Share Medical Records</CtaButton>
            <div className="hipec-sidebar__second-cta">
              <CtaButton href={WA_ESTIMATE} variant="outline" fullWidth>Request Cost Estimate</CtaButton>
            </div>
            <dl className="hipec-sidebar__contact">
              <div><dt>WhatsApp</dt><dd><a href={WA_COORDINATOR}>+91 90443 46292</a></dd></div>
              <div><dt>Countries served</dt><dd>Tanzania, Kenya, Ethiopia, Uganda, Nigeria, Iraq &amp; more</dd></div>
            </dl>
          </div>
          <nav className="hipec-sidebar__quick-links" aria-label="Article sections">
            <h3>In This Article</h3>
            <ul>
              {[
                ["#what-is-hipec", "What Is HIPEC?"],
                ["#hipec-meaning", "What HIPEC Stands For"],
                ["#peritoneum", "Understanding the Peritoneum"],
                ["#how-hipec-works", "How HIPEC Works"],
                ["#cancers-treated", "Cancers Treated With HIPEC"],
                ["#eligibility", "Eligibility Criteria"],
                ["#pci", "Peritoneal Cancer Index"],
                ["#procedure", "The Procedure"],
                ["#evidence", "Clinical Research"],
                ["#recovery", "Recovery"],
                ["#cost", "Treatment Cost in India"],
                ["#international-patients", "International Patients"],
                ["#faqs", "FAQs"],
              ].map(([href, label]) => (
                <li key={href}><a href={href}>{label} →</a></li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {/* ── FINAL CTA BANNER ─────────────────────────────────────── */}
      <section className="hipec-final-cta" aria-label="Contact GAF Healthcare">
        <div className="page-wrap hipec-final-cta__inner">
          <div>
            <h2>Considering HIPEC Treatment in India?</h2>
            <p>
              A diagnosis involving the peritoneum can be overwhelming. GAF Healthcare facilitates international patients seeking specialised cancer treatment in India — from medical record review and specialist consultations to hospital admission and post-treatment follow-up.
            </p>
          </div>
          <div className="hipec-final-cta__actions">
            <CtaButton href={WA_RECORDS} variant="bright">Share Medical Records</CtaButton>
            <CtaButton href={WA_COORDINATOR} variant="outline-bright">Speak With a Coordinator</CtaButton>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────── */}
      <div className="hipec-disclaimer">
        <div className="page-wrap">
          <p><strong>Medical Disclaimer:</strong> This article is intended for educational and informational purposes only. It does not replace consultation with a qualified oncologist or surgical oncologist. CRS-HIPEC is a complex procedure with significant risks. Treatment suitability, expected outcomes and alternative treatment options must be assessed individually by an experienced multidisciplinary medical team.</p>
        </div>
      </div>
    </>
  );
}
