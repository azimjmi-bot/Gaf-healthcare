import type { UrologyProfile } from "./urology";

export const UROLOGY_PROFILES: UrologyProfile[] = [
  {
    procedure: "PCNL (Percutaneous Nephrolithotomy)",
    shortName: "PCNL",
    cluster: "Endourology and stone disease",
    specialist: "endourologist",
    unit: "per operation",
    definition:
      "PCNL (percutaneous nephrolithotomy) removes large or complex kidney stones through a small tract made in the back directly into the kidney, using a nephroscope and a laser, ultrasonic or pneumatic device to fragment and extract the stone under anaesthesia.",
    mechanism:
      "Kidney stones form when minerals such as calcium oxalate, uric acid, struvite or cystine crystallise in concentrated urine inside the collecting system. Stones that fill the renal pelvis and several calyces (staghorn stones), very hard stones and lower-pole stones behind narrow anatomy are hard to clear from inside the ureter, which is why a direct percutaneous tract is used.",
    candidacy:
      "PCNL may be considered for kidney stones commonly larger than about two centimetres, staghorn or multiple calyceal stones, hard stones that resisted shock-wave treatment, stones with obstruction or recurrent infection, and anatomy such as a horseshoe kidney where flexible ureteroscopy is unlikely to clear the burden.",
    limits:
      "This is not ESWL, ureteroscopy or RIRS, which are separate slugs for smaller or ureteric stones. The stored range is a single-operation planning band; a staged second-look PCNL, a supplementary RIRS or a stent removal after departure is not presumed inside it.",
    evaluation:
      "Assessment includes a non-contrast CT of the kidneys, ureters and bladder to measure stone size, Hounsfield density and calyceal anatomy, kidney-function tests, a urine culture with sensitivities, a clotting profile and, where a poorly functioning kidney is suspected, a nuclear renal scan.",
    technique:
      "Under general anaesthesia, the patient is positioned prone or supine and a ureteric catheter is often placed first so contrast can outline the collecting system. Guided by ultrasound or fluoroscopy, the surgeon punctures a chosen calyx, passes a guidewire and dilates a tract to standard, mini or ultra-mini size. A nephroscope enters the kidney, the stone is broken with holmium laser, ultrasonic or pneumatic energy and the fragments are removed.",
    monitoring:
      "A nephrostomy tube, a ureteric stent, both or neither ('tubeless') is left depending on bleeding, residual fragments and infection risk. Monitoring covers haemoglobin, urine output and colour, temperature, blood pressure and pain, because bleeding and sepsis most often extend the stay.",
    approaches: [
      { label: "Standard PCNL (about 24–30 Fr tract)", detail: "The classic wide tract clears large staghorn burdens quickly. It carries more bleeding risk and usually a nephrostomy tube." },
      { label: "Mini-PCNL (about 14–20 Fr)", detail: "A narrower tract with laser fragmentation for moderate burdens. Less bleeding, but longer operating time for very large stones." },
      { label: "Ultra-mini or micro-PCNL", detail: "Very small tracts for selected smaller stones, often tubeless. Not suited to high-volume staghorn disease." },
      { label: "Supine versus prone positioning", detail: "Supine allows simultaneous retrograde access (ECIRS); prone gives wider upper-pole access. Anatomy and surgeon preference decide." },
    ],
    duration: "Commonly about 1.5–3 hours of theatre time, longer for staghorn or multi-tract cases",
    admission:
      "Most patients stay two to five nights; the stored [STAY] reflects that. A nephrostomy tube is usually removed after one to three days, and a stent may remain for one to four weeks.",
    recovery:
      "Flank soreness and blood-tinged urine settle over one to two weeks. Flying is usually discussed after the nephrostomy is out, bleeding has settled, there is no fever and a stent-removal plan exists, which is often one to two weeks after surgery.",
    risks:
      "Risks include bleeding that may need transfusion or, rarely, embolisation; infection and urosepsis; injury to the pleura, colon or spleen depending on the tract; urine leak; residual fragments needing a second procedure; ureteric stent symptoms; and, rarely, loss of kidney function or nephrectomy.",
    urgent: "heavy bleeding or clots in the urine, fever with chills, severe flank pain, breathlessness or inability to pass urine",
    drivers: [
      { label: "Stone burden and complexity", detail: "A staghorn stone filling several calyces needs more theatre time, often multiple tracts or a second sitting, than a single two-centimetre stone." },
      { label: "Stone hardness (Hounsfield density)", detail: "Dense calcium oxalate monohydrate or cystine stones take longer to fragment and use more laser fibre." },
      { label: "Tract size and number", detail: "Mini sets, single-use scopes and a second or third tract each change consumable costs and bleeding risk." },
      { label: "Infection status", detail: "A positive culture means pre-treatment antibiotics, possible delay and higher sepsis and ICU probability." },
      { label: "Kidney anatomy and function", detail: "Horseshoe kidney, calyceal diverticulum, prior surgery or a poorly functioning kidney add planning and risk." },
      { label: "Tube strategy and staging", detail: "Tubeless discharge, a nephrostomy for several days or a planned second-look nephroscopy alter nights and follow-up." },
    ],
    inclusionExtra: { label: "Percutaneous access and fragmentation devices", detail: "The stated tract set, nephroscope, laser or ultrasonic energy and the initial nephrostomy or stent when itemized." },
    exclusionExtra: { label: "Second-look or supplementary procedures", detail: "A staged PCNL, adjunct RIRS or ESWL for residual fragments and stent removal after departure are separate unless written." },
    records: [
      "Non-contrast CT KUB report and images with stone size and density",
      "Previous stone-treatment operative notes (ESWL, ureteroscopy, PCNL)",
      "Nuclear renal scan or CT urogram if kidney function or anatomy was questioned",
      "Stone-analysis and 24-hour urine metabolic results where available",
    ],
    quoteQuestions: [
      "Is this standard, mini or ultra-mini PCNL, and why?",
      "How many tracts are anticipated, and what if more are needed?",
      "Will a nephrostomy tube or stent be left, and who removes it?",
      "Is a second-look procedure for residual fragments included?",
    ],
    related: ["RIRS (Retrograde Intrarenal Surgery)", "ESWL (Extracorporeal Shock Wave Lithotripsy)", "Ureteroscopy"],
    topics: [
      {
        id: "pcnl-versus-alternatives",
        heading: "PCNL versus RIRS and ESWL: how the stone decides",
        paragraphs: [
          "Stone size, density and location are the variables the endourologist weighs. Shock-wave lithotripsy suits smaller, softer stones in accessible positions. Flexible ureteroscopy with laser (RIRS) reaches most calyces through the ureter and handles moderate burdens, but very large or very hard stones need many passes and often leave fragments. PCNL trades a small tract through the kidney for direct access and the most complete single-session clearance of large burdens.",
          "Combined approaches exist: endoscopic combined intrarenal surgery (ECIRS) uses a percutaneous tract and a retrograde flexible scope at the same time. A quotation should say whether a combination or a planned second stage is anticipated.",
        ],
      },
      {
        id: "after-pcnl",
        heading: "Nephrostomy tubes, stents and stone prevention after PCNL",
        paragraphs: [
          "A nephrostomy tube drains the kidney through the tract and is usually removed on the ward once the urine clears. A ureteric stent keeps the ureter open while swelling settles and is removed by cystoscopy, often two to four weeks later; urgency, frequency and mild bladder discomfort are expected with a stent, but fever or heavy bleeding is not.",
          "Stone analysis and a metabolic evaluation guide prevention through hydration targets, diet and sometimes medicines. A follow-up ultrasound or low-dose CT is usually scheduled with the home urologist. Ask whether stone analysis is included in the pathology line.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will I be stone-free after one PCNL?",
        a: "Many patients are, but staghorn and multiple-calyx stones sometimes need a second-look procedure or a supplementary RIRS. Post-operative imaging confirms clearance, and the quotation should say how a second stage is charged.",
      },
      {
        q: "Can I fly with a ureteric stent in place?",
        a: "Often yes, once bleeding and fever have settled, but the stent must be removed on a documented date, either before departure or by a named urologist at home. A forgotten stent can encrust and cause serious problems.",
      },
    ],
    campusFocus:
      "Name the campus with a fluoroscopy-equipped endourology theatre, laser and ultrasonic lithotripsy, interventional radiology for bleeding and an ICU, not a general surgical list.",
    imageAlts: [
      "Medical infographic of PCNL anatomy showing a kidney with a large staghorn stone in the renal pelvis and calyces, a percutaneous tract through the back and a nephroscope reaching the stone",
      "Step-by-step PCNL pathway infographic showing CT stone assessment, urine culture, percutaneous puncture and tract dilation, laser or ultrasonic fragmentation, fragment removal and nephrostomy or stent placement",
      "PCNL recovery pathway infographic showing nephrostomy-tube removal, bleeding and fever monitoring, imaging to confirm stone clearance, stent-removal plan and travel clearance",
    ],
  },
  {
    procedure: "RIRS (Retrograde Intrarenal Surgery)",
    shortName: "RIRS",
    cluster: "Endourology and stone disease",
    specialist: "endourologist",
    unit: "per operation",
    definition:
      "RIRS (retrograde intrarenal surgery) treats kidney stones from inside the urinary tract: a flexible ureteroscope is passed through the urethra, bladder and ureter into the kidney, and a holmium or thulium laser fragments or dusts the stone without any incision or tract through the skin.",
    mechanism:
      "Stones sitting in the renal pelvis or calyces can obstruct urine flow, cause pain, bleeding and infection, and slowly damage the kidney. The ureter is a natural corridor to the kidney, so a flexible scope of a few millimetres can reach most calyces; the limit is how much stone volume can be lasered and cleared through that narrow channel in one sitting.",
    candidacy:
      "RIRS may be considered for kidney stones commonly up to about two centimetres, lower-pole stones that ESWL is unlikely to clear, stones in patients on anticoagulants or with bleeding disorders where a percutaneous tract is risky, obese patients, and residual fragments after PCNL or ESWL.",
    limits:
      "This is not PCNL, ESWL or simple ureteroscopy, which are separate slugs. The stored range is a single-operation band; a pre-stenting sitting to widen the ureter, a staged second RIRS for a large burden or stent removal after departure is not presumed inside it.",
    evaluation:
      "Assessment includes a non-contrast CT KUB for stone size, number, density and calyceal anatomy, kidney-function tests, urine culture with sensitivities, clotting profile where relevant, and a review of previous stent or ureteroscopy history because a tight ureter may need pre-stenting.",
    technique:
      "Under general or spinal anaesthesia, a rigid cystoscope places a guidewire and often a ureteral access sheath into the ureter. A flexible ureteroscope is advanced into the renal pelvis and steered into each calyx under direct vision and fluoroscopy. A thin laser fibre dusts the stone into fine particles or fragments it for basket retrieval, and the kidney is inspected for residual pieces.",
    monitoring:
      "A ureteric stent is commonly left for a few days to weeks to protect the ureter after the sheath; some surgeons leave a short stent on a string or none at all. Monitoring covers pain, fever, urine colour and the ability to void, since sepsis is the complication most likely to extend the stay.",
    approaches: [
      { label: "Dusting with high-frequency laser", detail: "The stone is reduced to fine dust that passes spontaneously. Fewer basket passes, but small residual fragments are more common." },
      { label: "Fragmentation and basket retrieval", detail: "Larger pieces are lasered and removed with a nitinol basket. Confirms clearance but takes more passes through the access sheath." },
      { label: "Single-use versus reusable flexible scopes", detail: "Disposable scopes avoid reprocessing damage; reusable scopes lower per-case cost. The quotation should name which is assumed." },
      { label: "Pre-stented or staged RIRS", detail: "A stent placed one to two weeks earlier passively dilates a tight ureter; a second sitting may be planned for large burdens." },
    ],
    duration: "Commonly about 1–2 hours of theatre time, longer for multiple or dense stones",
    admission:
      "Many patients stay one to three nights; the stored [STAY] reflects that. Same-day discharge is possible in selected cases, and a stent, if placed, is removed one to four weeks later.",
    recovery:
      "Stent discomfort, mild burning and pink urine are common for several days. Flying is usually discussed once fever and bleeding have settled and a stent-removal date is fixed, often within one to two weeks of surgery.",
    risks:
      "Risks include urinary infection and sepsis, bleeding, ureteric injury or perforation, ureteral access-sheath trauma, stricture later, residual fragments requiring another procedure, stent-related pain and urgency, and, rarely, failed access needing a staged procedure.",
    urgent: "fever with chills, severe flank pain not relieved by medicines, heavy bleeding or clots, or inability to pass urine",
    drivers: [
      { label: "Stone size and number", detail: "Total stone volume decides laser time and whether one sitting is realistic; multi-calyx disease often needs staging." },
      { label: "Stone density and composition", detail: "Hard calcium oxalate monohydrate and cystine stones laser slowly and increase fibre and theatre time." },
      { label: "Scope type", detail: "Single-use digital flexible scopes are a material consumable line compared with reusable fibre-optic instruments." },
      { label: "Laser platform", detail: "High-power holmium with pulse modulation or thulium fibre laser changes equipment charges and dusting efficiency." },
      { label: "Pre-stenting and access sheath", detail: "A separate stenting sitting, or an access sheath and stent on the day, add procedure and device lines." },
      { label: "Infection and anticoagulation", detail: "A positive culture or bridging anticoagulation adds antibiotics, delays and monitoring." },
    ],
    inclusionExtra: { label: "Flexible ureteroscope, laser and access sheath", detail: "The stated scope type, laser fibre, access sheath, basket and the initial stent when itemized." },
    exclusionExtra: { label: "Pre-stenting and staged sittings", detail: "A separate stent-placement procedure, a second RIRS for residual stone and stent removal after departure are separate unless written." },
    records: [
      "Non-contrast CT KUB report and images with stone size, number and density",
      "Previous ureteroscopy, stent or ESWL records and any ureteric injury history",
      "Anticoagulant or antiplatelet prescriptions and the indication for them",
      "Stone-analysis and metabolic work-up results where available",
    ],
    quoteQuestions: [
      "Is a single-use or reusable flexible scope assumed?",
      "Is pre-stenting anticipated, and is that sitting included?",
      "Will a stent be left, for how long, and who removes it?",
      "Is a second sitting for residual stone included?",
    ],
    related: ["PCNL (Percutaneous Nephrolithotomy)", "Ureteroscopy", "ESWL (Extracorporeal Shock Wave Lithotripsy)"],
    topics: [
      {
        id: "rirs-versus-pcnl-eswl",
        heading: "RIRS versus PCNL and ESWL: matching the tool to the stone",
        paragraphs: [
          "For stones up to about two centimetres, RIRS and ESWL are the usual contenders. ESWL is less invasive and needs no anaesthesia tract, but hard or lower-pole stones fragment poorly and may need several sessions. RIRS clears these under direct vision in one anaesthetic but involves a stent and scope-related risks. Above two centimetres, PCNL generally achieves more complete clearance per sitting, and RIRS becomes a staged or supplementary option chosen when a percutaneous tract is undesirable.",
          "Anticoagulation, obesity, a solitary kidney, bleeding disorders and patient preference all shift the balance. A written plan should say why RIRS was chosen and what a large or unexpectedly hard stone would change.",
        ],
      },
      {
        id: "stents-after-rirs",
        heading: "Living with a ureteric stent after RIRS",
        paragraphs: [
          "A stent is a soft tube from kidney to bladder that keeps urine flowing while the ureter recovers. Frequency, urgency, flank ache on voiding and pink urine are expected; fever, heavy bleeding or unrelenting pain are not. Stents on an extraction string can be removed at home or in clinic without cystoscopy; others need a brief cystoscopic removal.",
          "The stent must not be forgotten. Ask for a written removal date and who is responsible, especially if removal will happen after you return home. A stent left for months can encrust and require a more complex operation.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Does RIRS leave a scar?",
        a: "No. RIRS is performed entirely through the natural urinary passage, so there is no skin incision. Discomfort comes from the stent and irritation of the urethra and bladder rather than from a wound.",
      },
      {
        q: "Why might a stent be placed before the RIRS itself?",
        a: "If the ureter is narrow, forcing a scope or access sheath can injure it. A stent left for one to two weeks gently dilates the ureter so the definitive RIRS is safer; this adds a separate procedure to the estimate.",
      },
    ],
    campusFocus:
      "Name the campus with flexible digital ureteroscopes, a high-power holmium or thulium laser and fluoroscopy; a general cystoscopy list without a laser platform is not an RIRS service.",
    imageAlts: [
      "Medical infographic of RIRS anatomy showing the urethra, bladder, ureter and kidney with a flexible ureteroscope passed retrograde into a calyx holding a stone and a laser fibre at its tip",
      "Step-by-step RIRS pathway infographic showing CT stone assessment, urine culture, guidewire and access-sheath placement, flexible ureteroscopy with laser dusting or fragmentation, basket retrieval and stent placement",
      "RIRS recovery pathway infographic showing stent-symptom expectations, fever and bleeding checks, imaging to confirm clearance, stent-removal date and travel clearance",
    ],
  },
  {
    procedure: "Ureteroscopy",
    shortName: "ureteroscopy",
    cluster: "Endourology and stone disease",
    specialist: "endourologist",
    unit: "per operation",
    definition:
      "Ureteroscopy passes a thin rigid, semi-rigid or flexible scope through the urethra and bladder into the ureter to see and treat a problem directly — most often a ureteric stone, which is fragmented with a laser or pneumatic probe and removed, but also strictures, small tumours or unexplained bleeding.",
    mechanism:
      "The ureters are narrow muscular tubes carrying urine from each kidney to the bladder. A stone that leaves the kidney can lodge at the narrowest points, causing severe colicky pain, obstruction and sometimes infection behind the blockage. Ureteroscopy relieves the obstruction by removing the stone under vision rather than waiting for it to pass.",
    candidacy:
      "Ureteroscopy may be considered for ureteric stones that have not passed after a period of observation, stones causing uncontrolled pain, infection or kidney impairment, stones too large or too dense for spontaneous passage or ESWL, and for diagnosing or treating a ureteric stricture or suspected upper-tract tumour.",
    limits:
      "This is not RIRS of the kidney or PCNL, which are separate slugs, and a diagnostic ureteroscopy with biopsy for suspected cancer is a different oncology conversation. The stored range is a single-operation band; an emergency stent placed elsewhere before travel, a staged sitting or stent removal after departure is separate.",
    evaluation:
      "Assessment includes a non-contrast CT KUB confirming stone position, size and density and the degree of kidney swelling (hydronephrosis), kidney-function tests, urine analysis and culture with sensitivities, clotting profile where indicated and a review of previous ureteric procedures.",
    technique:
      "Under general or spinal anaesthesia, a cystoscope identifies the ureteric opening and a guidewire is passed beyond the stone under fluoroscopy. A semi-rigid ureteroscope is advanced along the wire to the stone in the lower or mid ureter, or a flexible scope for the upper ureter. The stone is fragmented with a holmium laser or pneumatic lithotripter and pieces are removed with a basket or left as dust.",
    monitoring:
      "A ureteric stent is often placed for a few days if the ureter is swollen, injured or was tightly gripping the stone; uncomplicated cases may be left stentless. Monitoring covers pain, temperature, urine colour and voiding, and the stent plan is written into the discharge summary.",
    approaches: [
      { label: "Semi-rigid ureteroscopy", detail: "The workhorse for lower and mid-ureteric stones. Direct vision, good irrigation and simple basketing." },
      { label: "Flexible ureteroscopy", detail: "Used for upper-ureteric stones or stones pushed back into the kidney. Requires a laser and often an access sheath." },
      { label: "Laser versus pneumatic lithotripsy", detail: "Holmium laser dusts most stones with less retropulsion; pneumatic probes are faster on some stones but can push them back into the kidney." },
      { label: "Stented versus stentless", detail: "A short-term stent protects a swollen ureter; stentless discharge avoids stent symptoms in uncomplicated cases." },
    ],
    duration: "Commonly about 30–90 minutes of theatre time depending on stone position and impaction",
    admission:
      "Many patients go home the same day or after one night; the stored [STAY] reflects that. A stent, if placed, is removed within days to a few weeks depending on ureteric swelling.",
    recovery:
      "Burning on urination, frequency and pink urine typically settle within a few days. Flying is usually discussed once pain is controlled, there is no fever and any stent has been removed or has a documented removal date, often within about a week.",
    risks:
      "Risks include urinary infection and sepsis, bleeding, ureteric perforation or avulsion (rare but serious), stone migration back into the kidney needing RIRS, residual fragments, stent symptoms, later ureteric stricture and failed access needing a stent and staged procedure.",
    urgent: "fever with chills, uncontrolled flank pain, heavy bleeding or inability to pass urine",
    drivers: [
      { label: "Stone position and impaction", detail: "A stone embedded in an inflamed upper ureter takes longer and may need a flexible scope, laser and stent." },
      { label: "Stone size and density", detail: "Larger or harder stones need more laser time; very large proximal stones may be pushed back and treated as RIRS." },
      { label: "Scope and energy source", detail: "Flexible digital scopes and laser fibres cost more than semi-rigid pneumatic lithotripsy." },
      { label: "Infection behind the stone", detail: "An obstructed infected kidney may need urgent drainage first, antibiotics and a delayed definitive procedure." },
      { label: "Stent strategy", detail: "Whether a stent is placed, its type and who removes it change device and follow-up lines." },
      { label: "Bilateral or repeat procedures", detail: "Stones in both ureters or a staged second sitting are separate theatre episodes." },
    ],
    inclusionExtra: { label: "Ureteroscope, lithotripsy energy and basket", detail: "The stated semi-rigid or flexible scope, laser or pneumatic energy, basket and the initial stent when itemized." },
    exclusionExtra: { label: "Emergency drainage and staged procedures", detail: "An urgent stent or nephrostomy for an infected obstructed kidney, a second sitting and stent removal after departure are separate unless written." },
    records: [
      "Non-contrast CT KUB with stone position, size, density and hydronephrosis grade",
      "Emergency-department notes and any prior stent or nephrostomy placement",
      "Previous ureteric procedure notes and stricture history",
      "Stone-analysis results and recurrent-stone history where available",
    ],
    quoteQuestions: [
      "Is a semi-rigid or flexible scope planned, and with which energy source?",
      "If the stone migrates into the kidney, is RIRS in the same sitting included?",
      "Will a stent be placed, and who removes it?",
    ],
    related: ["RIRS (Retrograde Intrarenal Surgery)", "ESWL (Extracorporeal Shock Wave Lithotripsy)", "PCNL (Percutaneous Nephrolithotomy)"],
    topics: [
      {
        id: "ureteroscopy-versus-eswl",
        heading: "Ureteroscopy versus ESWL and watchful waiting for ureteric stones",
        paragraphs: [
          "Small ureteric stones often pass on their own with fluids, pain control and sometimes an alpha-blocker, so a period of observation is reasonable when pain is controlled, kidney function is normal and there is no infection. ESWL can treat visible ureteric stones without an anaesthetic tract but has lower clearance for impacted, hard or lower-ureteric stones and may need repeat sessions.",
          "Ureteroscopy offers direct, single-session removal at the cost of an anaesthetic and possible stent. Uncontrolled pain, fever, a solitary kidney, kidney impairment or a stone unlikely to pass tilt the decision towards early ureteroscopy.",
        ],
      },
      {
        id: "obstructed-infected-kidney",
        heading: "Why an infected, obstructed kidney changes the plan",
        paragraphs: [
          "A stone blocking the ureter with infection behind it is an emergency. Urine cannot drain, bacteria multiply under pressure and sepsis can develop quickly. In that setting the safe sequence is drainage first — a stent or a nephrostomy tube — plus antibiotics, and definitive stone removal days or weeks later once the infection has cleared.",
          "International patients should not travel with an untreated obstructed infected kidney. If drainage has already been done at home, send those records; the Indian team will plan the definitive ureteroscopy around the existing stent.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will I definitely need a stent after ureteroscopy?",
        a: "Not always. Uncomplicated removal of a small stone can be stentless. A stent is more likely after an impacted stone, ureteric swelling or injury, or when an access sheath was used, and it is usually removed within a few weeks.",
      },
      {
        q: "Can ureteroscopy treat stones in both ureters at once?",
        a: "Sometimes, if both are accessible and the patient is well, but bilateral treatment increases time, stent use and risk. Many surgeons prefer staging. The quotation should say whether one or both sides are included.",
      },
    ],
    campusFocus:
      "Name a campus with semi-rigid and flexible ureteroscopes, laser lithotripsy and fluoroscopy, plus the ability to place an emergency nephrostomy if an obstructed kidney is found.",
    imageAlts: [
      "Medical infographic of ureteroscopy anatomy showing the urethra, bladder, both ureters and kidneys with a stone lodged in one ureter and a semi-rigid ureteroscope advanced up to it",
      "Step-by-step ureteroscopy pathway infographic showing CT confirmation, urine culture, guidewire placement, ureteroscope advancement, laser or pneumatic fragmentation, basket removal and optional stent",
      "Ureteroscopy recovery pathway infographic showing same-day or overnight discharge, burning and pink urine expectations, fever warning, stent-removal plan and travel clearance",
    ],
  },
  {
    procedure: "ESWL (Extracorporeal Shock Wave Lithotripsy)",
    shortName: "ESWL",
    cluster: "Endourology and stone disease",
    specialist: "urologist experienced in shock-wave lithotripsy",
    unit: "per session",
    definition:
      "ESWL (extracorporeal shock wave lithotripsy) breaks kidney or ureteric stones from outside the body: focused shock waves generated by a lithotripter are aimed at the stone under X-ray or ultrasound guidance so it fragments into pieces small enough to pass in the urine over the following days and weeks.",
    mechanism:
      "Shock waves travel through water and body tissue and release their energy at the interface with a hard object. Each pulse creates compressive and tensile stress that cracks the stone surface; several thousand pulses over a session reduce it to gravel. Fragmentation depends on stone hardness, size, position and the distance from skin to stone, which is why not every stone suits ESWL.",
    candidacy:
      "ESWL may be considered for kidney stones commonly under about one and a half to two centimetres, especially in the renal pelvis or upper and mid calyces, softer stones of lower Hounsfield density, selected ureteric stones and patients who prefer a non-invasive first attempt when kidney function is normal and there is no infection.",
    limits:
      "This is not ureteroscopy, RIRS or PCNL, which are separate slugs. The stored range is a per-session planning band; many stones need two or three sessions, and a pre-ESWL stent, a rescue ureteroscopy for a fragment column or imaging to confirm clearance are separate unless written.",
    evaluation:
      "Assessment includes a non-contrast CT KUB to measure stone size, density and skin-to-stone distance, a plain X-ray to check whether the stone is visible for targeting, kidney-function tests, urine culture, a clotting screen and a pregnancy test where relevant, plus a review of anticoagulants, pacemakers and aortic aneurysm.",
    technique:
      "The patient lies on the lithotripter table, awake with sedation and painkillers or occasionally under anaesthesia. The stone is located by fluoroscopy or ultrasound and the shock-wave head is coupled to the skin with gel. Pulses are delivered at a controlled rate and energy, gradually increasing, while the operator re-checks targeting and watches the stone break up. A session typically delivers a few thousand shocks.",
    monitoring:
      "Afterwards the patient passes fragments over days to weeks and may have colicky pain, so analgesics and sometimes an alpha-blocker are prescribed. Follow-up X-ray or ultrasound at a few weeks checks clearance and decides whether another session, ureteroscopy or observation is needed.",
    approaches: [
      { label: "Electromagnetic lithotripters", detail: "The most common modern platform. Adjustable focal zone and energy with fluoroscopic and ultrasound targeting." },
      { label: "Electrohydraulic and piezoelectric systems", detail: "Older or niche generators with different pain and fragmentation profiles. The machine model matters to results." },
      { label: "Single versus planned multi-session courses", detail: "Larger or harder stones are often treated in two or three sessions weeks apart; the estimate should say what is assumed." },
      { label: "Pre-stented ESWL", detail: "A stent may be placed for larger stones to prevent a fragment column blocking the ureter; this is a separate procedure." },
    ],
    duration: "Commonly about 45–60 minutes per session",
    admission:
      "ESWL is usually an outpatient or overnight procedure; the stored [STAY] reflects that. Patients typically leave the same day with pain medicines and a follow-up imaging date.",
    recovery:
      "Bruising over the flank, blood-stained urine and episodes of colic as fragments pass are common for a week or two. Flying is usually discussed after pain is controlled, there is no fever and the team has scheduled follow-up imaging or a repeat session.",
    risks:
      "Risks include pain from passing fragments, a column of fragments blocking the ureter (steinstrasse) needing a stent or ureteroscopy, urinary infection and sepsis, bleeding around the kidney (perirenal haematoma), skin bruising, incomplete fragmentation needing further sessions or a different procedure and, rarely, injury to nearby organs.",
    urgent: "fever with chills, severe pain not relieved by medicines, heavy bleeding, or no urine output",
    drivers: [
      { label: "Number of sessions", detail: "A per-session price for a one-centimetre soft stone is not the same as a three-session course for a dense stone." },
      { label: "Stone density and skin-to-stone distance", detail: "High Hounsfield density and a long skin-to-stone distance reduce fragmentation and increase repeat sessions." },
      { label: "Stone location", detail: "Lower-pole calyceal stones clear fragments poorly and more often need a second session or a switch to RIRS." },
      { label: "Lithotripter type and sedation", detail: "Machine platform, sedation versus anaesthesia and imaging used for targeting change facility charges." },
      { label: "Pre-stenting and rescue procedures", detail: "A stent before ESWL or a ureteroscopy for a fragment column are separate episodes." },
      { label: "Follow-up imaging", detail: "X-ray, ultrasound or CT to confirm clearance is often billed separately from the session." },
    ],
    inclusionExtra: { label: "Lithotripter session and targeting", detail: "The stated number of shock-wave sessions, sedation, fluoroscopic or ultrasound targeting and recovery observation." },
    exclusionExtra: { label: "Repeat sessions and rescue treatment", detail: "Further sessions beyond those written, a pre-ESWL stent, ureteroscopy for a fragment column and follow-up imaging after departure are separate." },
    records: [
      "Non-contrast CT KUB with stone size, Hounsfield density and skin-to-stone distance",
      "Plain abdominal X-ray showing whether the stone is radio-opaque",
      "Pacemaker, aortic aneurysm, pregnancy and anticoagulant status",
      "Previous ESWL sessions and their imaging results where available",
    ],
    quoteQuestions: [
      "How many sessions does the estimate assume, and what does an extra session cost?",
      "Is a stent recommended before ESWL, and is that included?",
      "Which imaging confirms clearance, and is it included?",
      "What is the plan if fragments block the ureter?",
    ],
    related: ["RIRS (Retrograde Intrarenal Surgery)", "Ureteroscopy", "PCNL (Percutaneous Nephrolithotomy)"],
    topics: [
      {
        id: "eswl-suitability",
        heading: "Which stones suit ESWL and which do not",
        paragraphs: [
          "ESWL works best on stones under about one and a half centimetres, of moderate density, in the renal pelvis or upper calyces, in a patient of average build. Cystine and calcium oxalate monohydrate stones, very dense stones on CT, lower-pole stones behind a narrow infundibulum and stones in obese patients with a long skin-to-stone distance all fragment or clear poorly.",
          "ESWL is avoided in pregnancy, uncorrected bleeding disorders, active urinary infection, untreated obstruction below the stone and an aneurysm in the shock-wave path; pacemakers need precautions. A urologist should explain why ESWL is a reasonable first step rather than an endoscopic procedure.",
        ],
      },
      {
        id: "eswl-as-a-course",
        heading: "ESWL is often a course, not a single visit",
        paragraphs: [
          "Because fragments take time to pass and a first session may only partly break the stone, follow-up imaging at two to four weeks is standard. A second or third session may follow, or the team may switch to RIRS if the stone proves too hard. An international patient must either stay several weeks or arrange follow-up sessions and imaging at home.",
          "Ask whether the estimate is one session or a course, and who assesses clearance. A per-session headline can look small against an endoscopic procedure but may not be cheaper after three sessions plus imaging.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is ESWL painful?",
        a: "Most patients describe a tapping or stinging sensation that is managed with sedation and painkillers; some centres use general anaesthesia. Colic as fragments pass over the following days can be more uncomfortable than the session itself.",
      },
      {
        q: "How do I know the stone is gone after ESWL?",
        a: "Only follow-up imaging — X-ray, ultrasound or CT a few weeks later — confirms clearance. Feeling better is not proof, because silent fragments can remain. Ask whether that imaging is included and where it will be done.",
      },
    ],
    campusFocus:
      "Name the campus with its own lithotripter, fluoroscopy and a urology team able to convert to ureteroscopy or stenting if fragments obstruct; a mobile-unit visit without endoscopic backup is a different service.",
    imageAlts: [
      "Medical infographic of ESWL anatomy showing a kidney with a stone in the renal pelvis and focused shock waves from an external lithotripter head converging on the stone through the flank",
      "Step-by-step ESWL pathway infographic showing CT and X-ray targeting assessment, urine culture, positioning on the lithotripter, shock-wave delivery under imaging, fragment passage and follow-up imaging",
      "ESWL recovery pathway infographic showing same-day discharge, fragment passage with pain control, fever and blockage warning signs, follow-up imaging and decision on a further session",
    ],
  },
  {
    procedure: "Pyeloplasty",
    shortName: "pyeloplasty",
    cluster: "Reconstructive urology",
    specialist: "urologist experienced in laparoscopic or robotic reconstruction",
    unit: "per operation",
    definition:
      "Pyeloplasty is reconstructive surgery for a narrowed junction between the kidney's collecting system and the ureter (ureteropelvic junction obstruction). The narrowed segment is removed and the healthy renal pelvis is re-joined to the ureter over a stent so urine can drain freely, most often through laparoscopic or robotic keyhole incisions.",
    mechanism:
      "The ureteropelvic junction (UPJ) is where the funnel-shaped renal pelvis narrows into the ureter. A congenital muscular defect, a crossing blood vessel compressing the junction, scarring from stones or previous surgery can obstruct it. Urine backs up, the pelvis dilates (hydronephrosis), pressure rises and, over time, kidney function can decline while pain and infection recur.",
    candidacy:
      "Pyeloplasty may be considered when imaging shows UPJ obstruction with symptoms such as flank pain (often after fluids or alcohol), recurrent infection or stones, when a nuclear scan shows delayed drainage with preserved function, or in children when hydronephrosis progresses or function falls on serial scans.",
    limits:
      "This is not ureteroscopy or endopyelotomy, and it is not nephrectomy for a non-functioning kidney, which the urologist may recommend instead when function is very poor. The stored range is a single-operation band; stent removal after departure and a redo procedure for recurrent narrowing are not presumed inside it.",
    evaluation:
      "Assessment includes ultrasound and a CT urogram or MR urogram to define the anatomy and any crossing vessel, a diuretic nuclear renal scan (MAG3 or DTPA) to measure the kidney's share of function and drainage, kidney-function tests, urine culture and, in children, a paediatric anaesthesia review.",
    technique:
      "Under general anaesthesia, three to four small ports are placed and the kidney and upper ureter are exposed. In the Anderson-Hynes dismembered technique the narrowed segment is cut out, the pelvis is trimmed if very dilated, the ureter is spatulated and a wide, watertight join is sewn over a double-J stent, transposing the ureter in front of any crossing vessel. A drain may be left near the repair.",
    monitoring:
      "The stent usually stays for four to six weeks and a bladder catheter for a day or two to keep pressure low across the repair. Monitoring covers drain output, urine leak, fever, pain and bowel recovery; ultrasound and a repeat nuclear scan months later confirm drainage.",
    approaches: [
      { label: "Laparoscopic dismembered pyeloplasty", detail: "The standard keyhole approach with intracorporeal suturing. Small scars and short stay." },
      { label: "Robot-assisted pyeloplasty", detail: "Robotic instruments ease fine suturing, especially in redo cases or small children. Platform charges are higher." },
      { label: "Open pyeloplasty", detail: "A flank or abdominal incision, still used in some infants, complex anatomy or where keyhole platforms are unavailable." },
      { label: "Endopyelotomy", detail: "An endoscopic incision of the narrowing for selected short strictures. Less invasive, with lower durability, and not this slug." },
    ],
    duration: "Commonly about 2–3.5 hours of theatre time, longer for redo or complex anatomy",
    admission:
      "Most patients stay three to six nights; the stored [STAY] reflects that. The catheter comes out within a day or two, the drain when output is minimal, and the stent at four to six weeks.",
    recovery:
      "Port-site discomfort settles over one to two weeks and stent symptoms persist until removal. Flying is usually discussed once the drain is out, there is no urine leak or fever and a stent-removal date is fixed, often around one to two weeks after surgery.",
    risks:
      "Risks include urine leak at the join, bleeding, infection, injury to bowel or nearby vessels, stent-related symptoms, prolonged ileus, recurrent narrowing needing balloon dilation or redo surgery, and, in kidneys with poor function, failure to improve pain or function despite a technically sound repair.",
    urgent: "fever with chills, worsening flank or abdominal pain, drain fluid that looks like urine, heavy bleeding or vomiting with a distended abdomen",
    drivers: [
      { label: "Laparoscopic, robotic or open approach", detail: "Robotic platform fees and disposable instruments sit above laparoscopic costs; open surgery may lengthen the stay." },
      { label: "Primary versus redo repair", detail: "Scarring from previous surgery or endopyelotomy prolongs dissection and raises complication and conversion risk." },
      { label: "Crossing vessel and anatomy", detail: "A crossing vessel, horseshoe kidney or a very dilated pelvis needing reduction adds operative time." },
      { label: "Paediatric versus adult episode", detail: "Children need paediatric anaesthesia, ward and imaging protocols, which change the estimate." },
      { label: "Concurrent stones", detail: "Removing stones from the dilated pelvis during pyeloplasty adds instruments and time." },
      { label: "Stent and follow-up imaging", detail: "Stent removal by cystoscopy and the nuclear scan months later are often separate lines." },
    ],
    inclusionExtra: { label: "Reconstruction, stent and drain", detail: "The stated laparoscopic, robotic or open repair, the double-J stent, catheter and drain when itemized." },
    exclusionExtra: { label: "Stent removal, redo and late imaging", detail: "Cystoscopic stent removal after departure, balloon dilation or redo pyeloplasty and follow-up nuclear scans are separate unless written." },
    records: [
      "CT or MR urogram images showing the UPJ and any crossing vessel",
      "Diuretic nuclear renal scan (MAG3 or DTPA) with split function and drainage curve",
      "Ultrasound series documenting hydronephrosis over time",
      "Previous endopyelotomy, stenting or pyeloplasty notes where relevant",
    ],
    quoteQuestions: [
      "Is the repair laparoscopic, robotic or open, and why?",
      "How long will the stent stay, and is its removal included?",
      "What is the plan if the kidney's function is lower than expected on the scan?",
    ],
    related: ["Urinary Tract Reconstruction", "Pediatric Urological Surgery", "RIRS (Retrograde Intrarenal Surgery)"],
    topics: [
      {
        id: "repair-or-remove",
        heading: "Repair or remove: how kidney function shapes the decision",
        paragraphs: [
          "A diuretic nuclear scan measures each kidney's share of total function and how quickly it drains. When the obstructed kidney retains a meaningful share of function, pyeloplasty aims to protect it. When function has fallen very low and the kidney causes pain or infection, the urologist may discuss nephrectomy instead, because reconstructing a kidney that no longer works well may not relieve symptoms.",
          "The threshold is individual and depends on age, the other kidney and symptoms. Ask what the scan showed and what result would have changed the recommendation.",
        ],
      },
      {
        id: "pyeloplasty-in-children",
        heading: "Pyeloplasty in infants and children",
        paragraphs: [
          "Many UPJ obstructions are detected on antenatal ultrasound. Not all need surgery; some improve as the child grows, so serial ultrasound and nuclear scans guide timing. Surgery is considered when hydronephrosis worsens, function falls or infection occurs.",
          "Children are treated in a paediatric anaesthesia and ward environment, often with smaller ports or an open approach in infants, and stent removal may need a brief anaesthetic. The family's stay and follow-up plan should be written before travel.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will pyeloplasty restore lost kidney function?",
        a: "It aims to stop further loss and relieve obstruction. Function already lost may not return, especially in long-standing obstruction. The follow-up nuclear scan measures drainage and stability rather than promising recovery.",
      },
      {
        q: "Can a crossing blood vessel be the cause?",
        a: "Yes. A lower-pole artery crossing in front of the UPJ can compress it, especially in adults. During dismembered pyeloplasty the ureter is repositioned in front of the vessel so the new join is not compressed.",
      },
    ],
    campusFocus:
      "Name a campus with laparoscopic or robotic reconstructive urology, nuclear medicine for renal scans and, for children, a paediatric anaesthesia and ward team.",
    imageAlts: [
      "Medical infographic of pyeloplasty anatomy showing a kidney with a dilated renal pelvis narrowing at the ureteropelvic junction, a crossing vessel and the normal ureter below",
      "Step-by-step pyeloplasty pathway infographic showing CT or MR urogram, nuclear renal scan, laparoscopic or robotic port placement, excision of the narrowed segment, re-joining pelvis to ureter over a stent and drain placement",
      "Pyeloplasty recovery pathway infographic showing catheter and drain removal, urine-leak and fever monitoring, stent removal at four to six weeks and a follow-up nuclear scan",
    ],
  },
  {
    procedure: "Radical Nephrectomy",
    shortName: "radical nephrectomy",
    cluster: "Urologic oncology",
    specialist: "uro-oncologist",
    unit: "per operation",
    definition:
      "Radical nephrectomy removes the whole kidney together with the surrounding fatty tissue (Gerota's fascia), usually for a kidney tumour that is too large, too central or too complex to remove with a partial nephrectomy. The adrenal gland and regional lymph nodes are removed only when imaging or findings suggest involvement.",
    mechanism:
      "Kidney tumours, most commonly renal cell carcinoma, arise from the tubular cells and grow within the kidney before invading the renal vein, surrounding fat or nearby organs. Because the remaining kidney can usually carry the body's filtering load, removing the affected kidney entirely is an established way to clear a large or central tumour when sparing healthy tissue is not realistic.",
    candidacy:
      "Radical nephrectomy may be considered for renal masses commonly larger than about seven centimetres, central tumours involving the renal hilum or collecting system, tumours extending into the renal vein or inferior vena cava, suspected locally advanced disease, or a non-functioning kidney with intractable pain or infection when the other kidney has adequate function.",
    limits:
      "This is not partial nephrectomy, which is owned by the surgical-oncology sheet, and it is not treatment for metastatic disease, which needs a multidisciplinary oncology plan. The stored range is a single-operation band; adjuvant systemic therapy, surveillance imaging and treatment of a vena cava thrombus with vascular or cardiac support are separate.",
    evaluation:
      "Assessment includes a contrast CT or MRI of the abdomen to stage the tumour and check the renal vein, vena cava and lymph nodes, a chest CT for lung spread, kidney-function tests with an estimate of how the remaining kidney will cope, blood counts, liver tests and calcium, urine analysis and an anaesthetic review of cardiac and pulmonary fitness.",
    technique:
      "Under general anaesthesia, the kidney is approached laparoscopically, robotically or through an open incision. The renal artery and vein are identified and divided in sequence, the ureter is clipped and cut, and the kidney is freed within Gerota's fascia and removed intact in a retrieval bag or through the incision. Lymph nodes or the adrenal are taken when indicated, and the specimen goes to histopathology.",
    monitoring:
      "Monitoring covers blood pressure, haemoglobin, urine output from the remaining kidney, creatinine, pain and bowel function. A drain may be used briefly. Histopathology, usually available within one to two weeks, determines tumour type, grade and stage and whether surveillance or adjuvant therapy follows.",
    approaches: [
      { label: "Laparoscopic radical nephrectomy", detail: "The standard for most localized tumours. Small incisions and a shorter stay." },
      { label: "Robot-assisted radical nephrectomy", detail: "Used by some teams for large or complex tumours and vein involvement. Platform charges are higher." },
      { label: "Open radical nephrectomy", detail: "Chosen for very large tumours, vena cava thrombus, adjacent-organ invasion or when keyhole surgery is unsafe." },
      { label: "With or without lymph-node or adrenal removal", detail: "Added when imaging or operative findings suggest involvement; changes time and pathology scope." },
    ],
    duration: "Commonly about 2–4 hours of theatre time, longer for open surgery or vein involvement",
    admission:
      "Most patients stay four to eight nights; the stored [STAY] reflects that. Keyhole cases are at the shorter end, open surgery and vena cava work at the longer end, sometimes with an ICU night.",
    recovery:
      "Fatigue and incision discomfort improve over two to four weeks. Flying is usually discussed after the drain and staples are out, creatinine is stable, histopathology has been reviewed and there is no fever or wound problem, often two to three weeks after surgery.",
    risks:
      "Risks include bleeding and transfusion, injury to bowel, spleen, liver, pancreas or major vessels, chest infection, blood clots, wound problems, a fall in kidney function in the remaining kidney and later chronic kidney disease, incisional hernia after open surgery, and the possibility that histopathology shows more advanced disease than imaging suggested.",
    urgent: "heavy bleeding, fever with chills, breathlessness or chest pain, a swollen painful leg, very low urine output or worsening abdominal distension",
    drivers: [
      { label: "Tumour size and stage", detail: "A large tumour invading fat, renal vein or vena cava lengthens surgery, may need vascular support and raises transfusion and ICU probability." },
      { label: "Laparoscopic, robotic or open approach", detail: "Robotic platform fees exceed laparoscopic costs; open surgery often means a longer stay and more analgesia." },
      { label: "Lymph-node dissection and adrenalectomy", detail: "Extra dissection and pathology when nodes or adrenal are involved." },
      { label: "Remaining kidney function", detail: "Pre-existing CKD may need nephrology input and closer monitoring, occasionally dialysis planning." },
      { label: "Pathology scope", detail: "Immunohistochemistry, molecular tests or a second opinion add lines beyond routine histopathology." },
      { label: "Adjuvant therapy and surveillance", detail: "Immunotherapy for high-risk disease and follow-up CT scans are outside the operation estimate." },
    ],
    inclusionExtra: { label: "Kidney removal and routine histopathology", detail: "The stated laparoscopic, robotic or open nephrectomy, specimen retrieval and standard histopathology of the kidney." },
    exclusionExtra: { label: "Adjuvant therapy and surveillance imaging", detail: "Systemic therapy, vascular or cardiac support for a vena cava thrombus and follow-up CT scans are separate unless written." },
    records: [
      "Contrast CT or MRI abdomen report and images with tumour size, stage and venous involvement",
      "Chest CT and any bone or brain imaging performed for staging",
      "Kidney-function tests with an estimate of the remaining kidney's function",
      "Biopsy or previous oncology consultation notes where available",
    ],
    quoteQuestions: [
      "Why is radical rather than partial nephrectomy recommended for this tumour?",
      "Is lymph-node or adrenal removal planned, and is that pathology included?",
      "How will the remaining kidney's function be monitored after surgery?",
      "Who discusses histopathology and any adjuvant therapy, and is that consultation included?",
    ],
    related: ["Partial Nephrectomy", "Urinary Diversion", "Kidney Transplantation"],
    topics: [
      {
        id: "radical-versus-partial",
        heading: "Radical versus partial nephrectomy: preserving kidney tissue when safe",
        paragraphs: [
          "For smaller, peripheral tumours, partial nephrectomy removes the tumour with a margin and preserves the rest of the kidney, reducing the long-term risk of chronic kidney disease. Radical nephrectomy is preferred when the tumour is large or central, involves the renal vein, when a safe margin cannot be achieved or when the kidney is already non-functioning.",
          "Tumour complexity scores from CT help the uro-oncologist explain the choice. Ask what the imaging showed about size, location and vein involvement, and why whole-kidney removal was recommended for you.",
        ],
      },
      {
        id: "living-with-one-kidney",
        heading: "Living with one kidney after nephrectomy",
        paragraphs: [
          "A single healthy kidney can usually maintain adequate filtration, although overall function falls and some patients develop mild chronic kidney disease over years. Blood pressure control, avoiding kidney-toxic medicines, hydration and periodic creatinine and urine-protein checks protect the remaining kidney.",
          "Oncology surveillance runs alongside: CT or ultrasound at intervals determined by stage and grade for several years. The home urologist or oncologist should receive the operative note, histopathology and a written surveillance schedule.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will I need dialysis after radical nephrectomy?",
        a: "Usually not, provided the other kidney is healthy. Pre-operative tests estimate how the remaining kidney will cope. Patients with existing kidney disease need nephrology input before surgery and closer follow-up afterwards.",
      },
      {
        q: "Is a biopsy needed before removing a kidney tumour?",
        a: "Often not, because contrast CT or MRI is usually characteristic and biopsy carries its own risks. Biopsy is considered when the diagnosis is uncertain, when lymphoma or infection is possible or when surveillance is being weighed against surgery.",
      },
    ],
    campusFocus:
      "Name a campus with uro-oncology, laparoscopic or robotic platforms, vascular surgery backup for vein involvement, ICU and a histopathology laboratory reporting kidney tumours.",
    imageAlts: [
      "Medical infographic of radical nephrectomy anatomy showing a kidney with a large central tumour, the renal artery and vein, surrounding fatty fascia, the adrenal gland above and the healthy opposite kidney",
      "Step-by-step radical nephrectomy pathway infographic showing contrast CT staging, chest CT, kidney-function assessment, laparoscopic or open vessel control, removal of the kidney within its fascia and histopathology",
      "Radical nephrectomy recovery pathway infographic showing ICU or ward monitoring, creatinine and urine-output checks, drain removal, histopathology review and surveillance planning before travel",
    ],
  },
  {
    procedure: "TURP (Transurethral Resection of the Prostate)",
    shortName: "TURP",
    cluster: "Prostate and voiding (BPH)",
    specialist: "urologist",
    unit: "per operation",
    definition:
      "TURP (transurethral resection of the prostate) removes the inner, obstructing part of an enlarged prostate through the urethra using a resectoscope and an electrical loop, with no external incision. It is the long-established reference operation for benign prostatic hyperplasia (BPH) causing bothersome urinary symptoms or complications.",
    mechanism:
      "The prostate surrounds the urethra just below the bladder. With age its transition zone enlarges and squeezes the urethra, so the bladder must work harder to empty. Over time this causes a weak stream, frequency, night-time urination, incomplete emptying and sometimes retention, infection, bladder stones or kidney back-pressure. Removing the inner tissue reopens the channel.",
    candidacy:
      "TURP may be considered for moderate to severe BPH symptoms that persist despite medicines, urinary retention requiring a catheter, recurrent infections or bladder stones due to obstruction, blood in the urine from the prostate, or kidney impairment from back-pressure, typically for prostates of small to moderate size.",
    limits:
      "This is not surgery for prostate cancer, which follows the shared Radical Prostatectomy sheet, and not HoLEP or GreenLight laser, which are separate slugs. The stored range is a single-operation band; a pre-operative trial without catheter, a later procedure for a bladder-neck contracture or medicines for overactive bladder are not presumed inside it.",
    evaluation:
      "Assessment includes a symptom score, urine flow rate and post-void residual measurement, ultrasound of the prostate and kidneys to estimate prostate volume and check for back-pressure, PSA with digital rectal examination to consider cancer, urine culture, kidney-function tests and, where bladder function is uncertain, urodynamic studies.",
    technique:
      "Under spinal or general anaesthesia, a resectoscope is passed along the urethra to the prostate. A wire loop carrying electrical current shaves the obstructing tissue in strips from the bladder neck to just above the sphincter, while irrigation keeps the view clear. Bleeding points are sealed, the tissue chips are washed out for histopathology and a catheter with irrigation is placed.",
    monitoring:
      "Continuous bladder irrigation runs until the urine clears, usually overnight. Monitoring covers bleeding, clot retention, sodium and haemoglobin (particularly after monopolar resection), temperature and pain. The catheter is usually removed after one to three days and a trial of voiding confirms the bladder empties.",
    approaches: [
      { label: "Monopolar TURP", detail: "The classic technique using glycine irrigation. Carries a small risk of TUR syndrome from fluid absorption, so resection time is limited." },
      { label: "Bipolar TURP", detail: "Uses saline irrigation, which removes TUR-syndrome risk and allows longer resection. Now the common standard." },
      { label: "Bipolar enucleation or vaporization (TUEB, TUVP)", detail: "Variants that peel or vaporize tissue with bipolar energy; overlap with laser enucleation in scope." },
      { label: "Laser alternatives (HoLEP, GreenLight)", detail: "Separate slugs chosen for larger prostates or anticoagulated patients; each has its own equipment and cost profile." },
    ],
    duration: "Commonly about 45–90 minutes of theatre time depending on prostate size",
    admission:
      "Most patients stay two to four nights; the stored [STAY] reflects that. Irrigation runs the first night, and the catheter is removed once urine is clear and the patient is mobile.",
    recovery:
      "Burning, urgency and blood-tinged urine are common for two to four weeks as the raw surface heals. Flying is usually discussed after the catheter is out, voiding is confirmed, bleeding has settled and there is no fever, often about one to two weeks after surgery.",
    risks:
      "Risks include bleeding and clot retention, infection, TUR syndrome with monopolar resection, retrograde ejaculation (very common and usually permanent), erectile changes in some men, temporary or, rarely, persistent incontinence, urethral stricture or bladder-neck contracture later, failure to void requiring a longer catheter and regrowth of tissue over years.",
    urgent: "heavy bleeding or clots with inability to pass urine, fever with chills, severe pain or confusion after surgery",
    drivers: [
      { label: "Prostate volume", detail: "A larger gland means longer resection time, more bleeding risk and sometimes a recommendation to switch to HoLEP instead." },
      { label: "Monopolar versus bipolar platform", detail: "Bipolar generators and saline irrigation cost more per case but shorten sodium monitoring and allow longer resection." },
      { label: "Retention and catheter history", detail: "Men already in retention may need a longer catheter period and bladder-function assessment." },
      { label: "Anticoagulation and comorbidity", detail: "Bridging anticoagulants, cardiac disease and diabetes raise bleeding and monitoring lines." },
      { label: "Histopathology findings", detail: "Incidental cancer in the resected chips leads to a separate oncology consultation and staging." },
      { label: "Bladder stones or diverticulum", detail: "Simultaneous stone fragmentation adds instruments and theatre time." },
    ],
    inclusionExtra: { label: "Resectoscope, energy platform and irrigation", detail: "The stated monopolar or bipolar resection, irrigation fluids, catheter and histopathology of the resected tissue." },
    exclusionExtra: { label: "Retention management and late strictures", detail: "Prolonged catheterisation, a failed voiding trial needing re-catheterisation, later urethrotomy for stricture and oncology follow-up after incidental cancer are separate unless written." },
    records: [
      "Symptom score, urine flow rate and post-void residual results",
      "Prostate and kidney ultrasound with prostate volume and any hydronephrosis",
      "PSA value with rectal-examination findings and any prostate biopsy",
      "Medicine list including alpha-blockers, 5-alpha-reductase inhibitors and anticoagulants",
    ],
    quoteQuestions: [
      "Is monopolar or bipolar TURP planned, and why for my prostate size?",
      "Would HoLEP or laser vaporization suit my gland better, and how do those quotes differ?",
      "How many catheter days are assumed, and what happens if I cannot void after removal?",
    ],
    related: ["HoLEP (Holmium Laser Enucleation)", "GreenLight Laser Surgery", "Radical Prostatectomy"],
    topics: [
      {
        id: "turp-holep-greenlight",
        heading: "TURP versus HoLEP versus GreenLight: how prostate size and bleeding risk decide",
        paragraphs: [
          "TURP remains the reference for small to moderate prostates and is widely available. HoLEP removes the whole inner gland in one piece regardless of size and suits very large prostates, with less bleeding but a longer learning curve and a morcellation step. GreenLight photoselective vaporization seals tissue as it removes it, which helps men on anticoagulants, but yields no tissue for histopathology and is slower on very large glands.",
          "Equipment availability, surgeon experience, prostate volume, anticoagulation and the need for tissue diagnosis drive the choice. Ask the urologist which they recommend for your measured volume and why.",
        ],
      },
      {
        id: "sexual-function-after-turp",
        heading: "Ejaculation, erection and continence after TURP",
        paragraphs: [
          "Retrograde ejaculation — semen entering the bladder rather than leaving the body — is very common after TURP and is usually permanent, though orgasm sensation is generally preserved. Erectile function is unchanged for most men, but some report a decline, and pre-existing erectile dysfunction is common in this age group.",
          "Early urgency and small leaks are expected while the raw surface heals; persistent stress incontinence is uncommon because the sphincter is preserved. These points belong in the consent discussion before travel, particularly for men planning to father children.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Does TURP treat prostate cancer?",
        a: "No. TURP relieves obstruction from benign enlargement. The resected tissue is examined and occasionally shows incidental cancer, which then needs a separate oncology assessment; men with suspected cancer follow a different pathway.",
      },
      {
        q: "Can BPH symptoms return after TURP?",
        a: "Tissue can regrow slowly over years, and some men develop a bladder-neck contracture or urethral stricture that mimics recurrence. Persistent symptoms may also reflect an overactive or weak bladder rather than the prostate, which is why pre-operative assessment matters.",
      },
    ],
    campusFocus:
      "Name the campus with bipolar resection platforms, a urology ward experienced in irrigation and catheter care, and histopathology; confirm whether HoLEP or laser is also available if your gland is large.",
    imageAlts: [
      "Medical infographic of TURP anatomy showing the bladder, an enlarged prostate compressing the urethra, the external sphincter below and a resectoscope loop removing the inner obstructing tissue",
      "Step-by-step TURP pathway infographic showing symptom score and flow test, prostate ultrasound and PSA, urine culture, transurethral resection with irrigation, chip removal for histopathology and catheter placement",
      "TURP recovery pathway infographic showing overnight irrigation, catheter removal and voiding trial, bleeding and fever warnings, four-week healing expectations and travel clearance",
    ],
  },
  {
    procedure: "HoLEP (Holmium Laser Enucleation)",
    shortName: "HoLEP",
    cluster: "Prostate and voiding (BPH)",
    specialist: "urologist trained in laser enucleation",
    unit: "per operation",
    definition:
      "HoLEP (holmium laser enucleation of the prostate) removes the entire enlarged inner part of the prostate through the urethra: a holmium laser separates the adenoma from its capsule along a natural plane, the lobes are pushed into the bladder and a morcellator cuts them into pieces for removal. It treats benign enlargement of any size without an external incision.",
    mechanism:
      "In BPH the transition zone grows into a lobulated adenoma that compresses the urethra while the outer capsule remains thin. Because a plane exists between adenoma and capsule, the whole obstructing mass can be peeled away rather than shaved in pieces, which is why enucleation achieves a complete removal comparable to open surgery through a scope.",
    candidacy:
      "HoLEP may be considered for bothersome BPH symptoms or retention when medicines have failed, particularly for large prostates (commonly above about eighty millilitres) where TURP is less suitable, for men on anticoagulants or with bleeding risk, and for those wanting a durable single operation with tissue available for histopathology.",
    limits:
      "This is not TURP or GreenLight vaporization, which are separate slugs, and not prostate cancer surgery. The stored range is a single-operation band; prolonged catheterisation after a failed voiding trial, treatment of a later bladder-neck contracture or medicines for persistent urgency are separate.",
    evaluation:
      "Assessment includes a symptom score, flow rate and post-void residual, transrectal or abdominal ultrasound for prostate volume, PSA with digital rectal examination, urine culture, kidney-function tests, and urodynamics where bladder weakness is suspected; anticoagulant plans are agreed with the prescribing physician.",
    technique:
      "Under spinal or general anaesthesia, a resectoscope carries the holmium laser fibre to the prostate. The surgeon incises at the bladder neck and develops the plane between adenoma and capsule, enucleating the lateral and median lobes and pushing them into the bladder. A morcellator then fragments and suctions the tissue out, bleeding points are lasered and a catheter is placed.",
    monitoring:
      "Irrigation is often brief or not needed because laser haemostasis is effective. Monitoring covers bleeding, clot retention, temperature and pain, and the catheter is usually removed within a day or two, followed by a voiding trial. All removed tissue is sent for histopathology.",
    approaches: [
      { label: "Three-lobe HoLEP", detail: "The classic technique enucleating median and lateral lobes separately. Well suited to very large glands." },
      { label: "En-bloc or two-lobe HoLEP", detail: "Enucleates the adenoma as one or two pieces with early apical release to protect the sphincter. Shorter operating time in experienced hands." },
      { label: "Thulium laser enucleation (ThuLEP)", detail: "The same principle with a thulium laser; tissue effects differ slightly. Equipment availability decides." },
      { label: "Bipolar enucleation (BipolEP)", detail: "Enucleation using bipolar energy without a laser. Similar anatomy, different consumables." },
    ],
    duration: "Commonly about 1–2.5 hours of theatre time depending on prostate size",
    admission:
      "Most patients stay two to four nights; the stored [STAY] reflects that. Some centres discharge within twenty-four hours after a successful voiding trial.",
    recovery:
      "Urgency, frequency and mild stress leakage are common for several weeks after the large cavity is created and usually improve. Flying is usually discussed after the catheter is out, voiding is confirmed and there is no bleeding or fever, often about one to two weeks after surgery.",
    risks:
      "Risks include bleeding, infection, transient stress incontinence (more noticeable than after TURP but usually resolving over weeks to months), retrograde ejaculation, urethral stricture or bladder-neck contracture, bladder injury during morcellation (rare), failure to void initially and, rarely, persistent incontinence.",
    urgent: "heavy bleeding or inability to pass urine, fever with chills, severe lower abdominal pain or confusion",
    drivers: [
      { label: "Prostate volume", detail: "Very large glands lengthen enucleation and morcellation time; the technique still applies, unlike TURP." },
      { label: "Laser platform and fibre", detail: "High-power holmium generators, fibre type and the morcellator are material equipment and consumable lines." },
      { label: "Anticoagulation management", detail: "Continuing or bridging anticoagulants adds monitoring but is a common reason HoLEP is chosen." },
      { label: "Retention and bladder function", detail: "Long-standing retention may need urodynamics and a longer catheter period after surgery." },
      { label: "Surgeon and centre volume", detail: "HoLEP has a long learning curve; specialised centres price the platform and expertise differently." },
      { label: "Histopathology and incidental cancer", detail: "The large tissue volume is examined; unexpected cancer triggers separate oncology work-up." },
    ],
    inclusionExtra: { label: "Holmium laser enucleation and morcellation", detail: "The stated laser platform, fibre, morcellator, catheter and histopathology of the enucleated tissue." },
    exclusionExtra: { label: "Prolonged catheterisation and late contracture", detail: "Re-catheterisation after a failed voiding trial, pelvic-floor therapy for persistent leakage and later urethrotomy are separate unless written." },
    records: [
      "Prostate volume on ultrasound with symptom score, flow rate and residual",
      "PSA value, rectal-examination findings and any biopsy history",
      "Anticoagulant or antiplatelet prescriptions with the prescribing physician's plan",
      "Catheter or retention history and any urodynamic study",
    ],
    quoteQuestions: [
      "How many HoLEP cases does this campus perform, and which laser platform is used?",
      "Will anticoagulants be continued, and how is that handled?",
      "What support is offered if stress leakage persists beyond a few weeks?",
    ],
    related: ["TURP (Transurethral Resection of the Prostate)", "GreenLight Laser Surgery", "Radical Prostatectomy"],
    topics: [
      {
        id: "holep-large-prostate",
        heading: "Why HoLEP is often recommended for very large prostates",
        paragraphs: [
          "TURP shaves tissue in strips and becomes less efficient and more bleeding-prone as gland size rises, which is why open or laparoscopic simple prostatectomy was historically used for very large glands. HoLEP removes the same tissue through the urethra with laser haemostasis, so size is not a limiting factor and blood loss is generally low.",
          "The trade-offs are equipment cost, a longer learning curve and a period of stress leakage while the large cavity heals. For moderate glands, TURP and HoLEP are both reasonable, and the recommendation often reflects surgeon experience and platform availability.",
        ],
      },
      {
        id: "holep-continence",
        heading: "Temporary leakage after HoLEP and what helps",
        paragraphs: [
          "Because the whole adenoma is removed down to the capsule, the external sphincter must manage a much larger cavity at first. Urgency and leakage on coughing or standing are common early and improve over weeks to months for most men. Pelvic-floor exercises are typically started once the catheter is out.",
          "Early apical release techniques aim to reduce sphincter stretch. Ask how your surgeon protects the sphincter, what proportion of their patients still leak at three months in their own experience, and what follow-up is available at home.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is HoLEP better than TURP?",
        a: "Neither is universally better. HoLEP suits large glands and anticoagulated men and removes more tissue in one operation; TURP is well established for smaller glands and more widely available. The urologist matches the method to your prostate volume and health.",
      },
      {
        q: "Will HoLEP leave any tissue for testing?",
        a: "Yes. Unlike vaporization, HoLEP removes intact tissue that is morcellated and sent for histopathology, so incidental cancer can be detected.",
      },
    ],
    campusFocus:
      "Name the campus with a high-power holmium laser, a morcellator and surgeons who perform enucleation regularly; a TURP-only list is not a HoLEP service.",
    imageAlts: [
      "Medical infographic of HoLEP anatomy showing the bladder, an enlarged prostate adenoma inside its thin capsule compressing the urethra, and a laser fibre developing the plane between adenoma and capsule",
      "Step-by-step HoLEP pathway infographic showing prostate volume measurement, PSA and urine culture, laser enucleation of the lobes into the bladder, morcellation and removal, laser haemostasis and catheter placement",
      "HoLEP recovery pathway infographic showing early catheter removal and voiding trial, pelvic-floor exercises for temporary leakage, bleeding and fever warnings, histopathology review and travel clearance",
    ],
  },
  {
    procedure: "GreenLight Laser Surgery",
    shortName: "GreenLight laser prostate surgery",
    cluster: "Prostate and voiding (BPH)",
    specialist: "urologist experienced in photoselective vaporization",
    unit: "per operation",
    definition:
      "GreenLight laser surgery, or photoselective vaporization of the prostate (PVP), uses a high-power 532-nanometre laser passed through a cystoscope to vaporize the obstructing inner prostate tissue layer by layer while sealing blood vessels, opening the urethral channel for men with benign prostatic enlargement without an external incision.",
    mechanism:
      "The green wavelength is absorbed strongly by haemoglobin in blood-rich prostate tissue and poorly by water, so energy is concentrated in a thin surface layer that vaporizes instantly while the underlying vessels coagulate. This gives a nearly bloodless field, which is the property that makes the technique attractive for men who cannot stop blood thinners.",
    candidacy:
      "GreenLight laser surgery may be considered for bothersome BPH symptoms or retention despite medicines in small to moderate prostates, particularly in men on anticoagulants or antiplatelets, those with cardiac or bleeding risk in whom minimal blood loss matters, and men who prefer a short stay and early catheter removal.",
    limits:
      "This is not TURP or HoLEP, which are separate slugs, and it produces no tissue for histopathology, so it is not a diagnostic operation for suspected cancer. The stored range is a single-operation band; a second session for a very large gland, prolonged catheterisation or later stricture treatment are separate.",
    evaluation:
      "Assessment includes a symptom score, flow rate and post-void residual, ultrasound for prostate volume and kidney back-pressure, PSA with digital rectal examination and a low threshold for MRI or biopsy when cancer is suspected because no tissue will be obtained, urine culture, kidney-function tests and an anticoagulation plan.",
    technique:
      "Under spinal or general anaesthesia, a cystoscope carries a side-firing laser fibre to the prostate. The surgeon sweeps the beam across the obstructing lobes, vaporizing tissue from the bladder neck towards the apex while staying clear of the sphincter, and lowers the power to coagulate any bleeding. Saline irrigation clears the view, and a catheter is placed at the end.",
    monitoring:
      "Irrigation is usually unnecessary and the catheter often comes out the same or next day. Monitoring covers voiding, bleeding, temperature and irritative symptoms, which can be more pronounced than after resection because of the treated surface.",
    approaches: [
      { label: "Standard photoselective vaporization", detail: "Layer-by-layer vaporization of the lobes. Suits small to moderate glands with excellent haemostasis." },
      { label: "Vapo-enucleation or anatomical PVP", detail: "Uses the laser to enucleate larger lobes partly before vaporizing them. Extends the technique to bigger prostates." },
      { label: "Higher-power 180-watt platforms", detail: "Faster vaporization than earlier generators, shortening theatre time on larger glands." },
      { label: "Alternatives when tissue is needed", detail: "TURP or HoLEP provide histopathology; they are separate slugs chosen when cancer must be excluded." },
    ],
    duration: "Commonly about 45–90 minutes of theatre time depending on prostate size",
    admission:
      "Most patients stay one to three nights; the stored [STAY] reflects that. Same-day discharge with a short catheter period is common in well men.",
    recovery:
      "Burning, frequency and urgency are common for two to six weeks and are the main early complaint. Flying is usually discussed once the catheter is out, voiding is confirmed and there is no fever or heavy bleeding, often within one to two weeks of surgery.",
    risks:
      "Risks include irritative voiding symptoms that can last weeks, infection, bleeding (low but not zero, especially when the scar sloughs at two to three weeks), retrograde ejaculation, urethral stricture or bladder-neck contracture, incomplete tissue removal in large glands needing re-treatment, and, rarely, incontinence.",
    urgent: "inability to pass urine, fever with chills, heavy bleeding or clots, or severe pelvic pain",
    drivers: [
      { label: "Prostate volume", detail: "Vaporization is slower than enucleation on large glands; very large prostates may need longer sessions or a different method." },
      { label: "Laser platform and fibre", detail: "The generator power and the single-use fibre are material consumable lines that vary by centre." },
      { label: "Anticoagulation", detail: "Continuing blood thinners is often the reason for choosing this technique and adds monitoring rather than reversal costs." },
      { label: "Pre-operative cancer exclusion", detail: "Because no tissue is obtained, MRI or biopsy before surgery may be advised and billed separately." },
      { label: "Retention history", detail: "Men in retention may need a longer catheter period and bladder assessment." },
      { label: "Re-treatment risk", detail: "Residual tissue in large glands can require a second procedure, usually a separate invoice." },
    ],
    inclusionExtra: { label: "GreenLight laser platform and fibre", detail: "The stated laser generator, side-firing fibre, cystoscope, irrigation and catheter; no histopathology is produced." },
    exclusionExtra: { label: "Cancer exclusion and re-treatment", detail: "Pre-operative MRI or biopsy, a second vaporization for residual tissue and later stricture treatment are separate unless written." },
    records: [
      "Prostate volume on ultrasound with symptom score, flow rate and residual",
      "PSA value, rectal-examination findings and any MRI or biopsy",
      "Anticoagulant or antiplatelet prescriptions with the cardiologist's or physician's plan",
      "Catheter or retention history and previous prostate procedures",
    ],
    quoteQuestions: [
      "Which GreenLight generator and fibre are used, and is the fibre single-use?",
      "Has cancer been reasonably excluded, given that no tissue will be examined?",
      "What is the plan if my gland is too large to clear in one session?",
    ],
    related: ["TURP (Transurethral Resection of the Prostate)", "HoLEP (Holmium Laser Enucleation)", "Radical Prostatectomy"],
    topics: [
      {
        id: "greenlight-anticoagulated",
        heading: "GreenLight for men who cannot stop blood thinners",
        paragraphs: [
          "Men with coronary stents, atrial fibrillation or mechanical heart valves often cannot pause anticoagulants safely. Photoselective vaporization coagulates as it removes tissue, so blood loss is minimal and the operation can frequently proceed with anticoagulation continued or briefly modified under cardiology guidance. This is the technique's main clinical niche.",
          "The trade-offs are more irritative symptoms afterwards, no tissue for diagnosis and slower progress on very large glands. HoLEP also performs well in anticoagulated men, so the recommendation depends on gland size and platform availability.",
        ],
      },
      {
        id: "no-tissue-diagnosis",
        heading: "No tissue, no biopsy: excluding cancer before vaporization",
        paragraphs: [
          "TURP and HoLEP send removed tissue to pathology, which occasionally detects unsuspected cancer. Vaporization destroys the tissue, so the urologist relies on PSA, rectal examination and, where suspicion exists, MRI or biopsy before surgery. Men with a raised PSA or an abnormal examination may be advised to have those tests first or to choose a tissue-yielding technique.",
          "Ask how cancer has been considered in your case and whether additional pre-operative tests are recommended; they may be separate invoices.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "How long do burning and urgency last after GreenLight laser surgery?",
        a: "Irritative symptoms commonly last two to six weeks and gradually settle as the treated surface heals. Fluids, avoiding bladder irritants and sometimes short-term medicines help; fever or inability to pass urine are not part of normal recovery.",
      },
      {
        q: "Is GreenLight suitable for a very large prostate?",
        a: "It can be done with newer high-power platforms or vapo-enucleation techniques, but progress is slower and residual tissue is more likely. Many urologists recommend HoLEP for very large glands; the measured volume should guide the discussion.",
      },
    ],
    campusFocus:
      "Name the campus with a current-generation GreenLight platform and a urology team used to anticoagulated patients; confirm whether HoLEP or TURP is also offered if your gland is large or tissue diagnosis is needed.",
    imageAlts: [
      "Medical infographic of GreenLight laser anatomy showing the bladder, an enlarged prostate narrowing the urethra and a side-firing green laser beam vaporizing the inner tissue while sealing blood vessels",
      "Step-by-step GreenLight laser pathway infographic showing symptom score and flow test, prostate volume and PSA review, anticoagulation plan, cystoscopic laser vaporization, coagulation and short catheter placement",
      "GreenLight laser recovery pathway infographic showing same- or next-day catheter removal, irritative symptom expectations for several weeks, bleeding and fever warnings and travel clearance",
    ],
  },
  {
    procedure: "TURBT (Transurethral Resection of Bladder Tumor)",
    shortName: "TURBT",
    cluster: "Urologic oncology",
    specialist: "uro-oncologist",
    unit: "per operation",
    definition:
      "TURBT (transurethral resection of bladder tumour) removes a bladder tumour through the urethra with a resectoscope and an electrical loop or laser, sending the tissue and underlying muscle for histopathology. It is both the diagnostic step that stages bladder cancer and the treatment for tumours confined to the bladder lining.",
    mechanism:
      "Most bladder cancers arise from the urothelium lining the bladder and first appear as papillary growths or flat patches, often causing blood in the urine without pain. Whether the tumour has invaded the muscle wall determines everything that follows, which is why the resection must include muscle in the specimen. Non-muscle-invasive tumours are treated endoscopically and watched; muscle-invasive disease needs radical treatment.",
    candidacy:
      "TURBT may be considered when cystoscopy or imaging shows a bladder tumour, when blood in the urine or abnormal urine cytology needs a tissue diagnosis, for recurrence found during surveillance cystoscopy, and as a repeat (re-staging) resection when the first specimen lacked muscle or showed high-grade disease.",
    limits:
      "This is not radical cystectomy, which follows the shared surgical-oncology sheet, and not intravesical chemotherapy or BCG courses, which are separate treatments. The stored range is a single-resection band; a re-staging TURBT within weeks, BCG or chemotherapy instillations and surveillance cystoscopies are not presumed inside it.",
    evaluation:
      "Assessment includes urine analysis and cytology, flexible cystoscopy describing tumour number, size and appearance, CT urography or ultrasound of the upper tracts, kidney-function tests, blood counts, urine culture and an anaesthetic review; for suspected muscle invasion, MRI or staging CT may precede or follow the resection.",
    technique:
      "Under spinal or general anaesthesia, a resectoscope is passed into the bladder and the whole bladder is mapped, often with white light and blue-light or narrow-band imaging to reveal flat lesions. Each tumour is resected down to and including a sample of muscle, the base is cauterised, tissue is collected in labelled containers and a catheter is placed. A single dose of intravesical chemotherapy may be given within hours if bleeding is minimal.",
    monitoring:
      "Monitoring covers bleeding and clot retention, signs of bladder perforation (abdominal pain, poor irrigation return), temperature and voiding after the catheter is removed within one to two days. Histopathology defines grade, stage and whether muscle was present, and drives the follow-up plan.",
    approaches: [
      { label: "Conventional loop resection", detail: "Piecemeal resection with a monopolar or bipolar loop. The standard for most papillary tumours." },
      { label: "En-bloc resection", detail: "Removes the tumour in one piece with laser or specialised loops for better specimen orientation in selected tumours." },
      { label: "Enhanced imaging (blue-light or NBI)", detail: "Photodynamic or narrow-band imaging highlights flat or small lesions that white light can miss; adds a dye or platform charge." },
      { label: "Re-staging TURBT", detail: "A second resection two to six weeks later for high-grade or T1 tumours or when muscle was absent; a separate episode." },
    ],
    duration: "Commonly about 30–90 minutes of theatre time depending on tumour number and size",
    admission:
      "Most patients stay one to three nights; the stored [STAY] reflects that. Small single tumours may allow same-day discharge; large or multiple tumours need irrigation overnight.",
    recovery:
      "Burning, frequency and blood-tinged urine typically settle within one to two weeks. Flying is usually discussed after the catheter is out, voiding is normal, bleeding has stopped and the histopathology has been reviewed so the follow-up plan is written, often about one to two weeks after surgery.",
    risks:
      "Risks include bleeding and clot retention, urinary infection, bladder perforation (usually managed with a longer catheter, rarely needing open repair), obturator nerve stimulation causing a leg jerk and lateral-wall injury, urethral stricture, incomplete resection or understaging needing a repeat procedure, and side effects from any intravesical chemotherapy.",
    urgent: "heavy bleeding or clots with inability to pass urine, fever with chills, severe lower abdominal pain or a distended abdomen",
    drivers: [
      { label: "Tumour number, size and location", detail: "Multiple or large tumours and lateral-wall or diverticular lesions lengthen the resection and raise perforation risk." },
      { label: "Enhanced imaging and en-bloc platforms", detail: "Blue-light dye, NBI systems or laser en-bloc equipment add lines beyond a standard resectoscope." },
      { label: "Re-staging resection", detail: "High-grade or T1 tumours often require a second TURBT, usually a separate invoice." },
      { label: "Intravesical therapy", detail: "A single post-operative chemotherapy dose or a BCG induction course is billed separately." },
      { label: "Histopathology scope", detail: "Multiple labelled specimens, deep muscle review and immunostains add pathology charges." },
      { label: "Upper-tract and staging imaging", detail: "CT urography, MRI or bone scan when muscle invasion is suspected are usually separate." },
    ],
    inclusionExtra: { label: "Resection, mapping and histopathology", detail: "The stated resectoscope platform, bladder mapping, resection of visible tumours with muscle sampling and standard histopathology." },
    exclusionExtra: { label: "Re-staging TURBT and intravesical therapy", detail: "A second resection, BCG or chemotherapy instillations, surveillance cystoscopies and radical treatment if muscle invasion is found are separate unless written." },
    records: [
      "Cystoscopy report describing tumour number, size, appearance and location",
      "Urine cytology and any previous bladder histopathology",
      "CT urography or ultrasound of the kidneys and ureters",
      "Previous intravesical BCG or chemotherapy records and surveillance history",
    ],
    quoteQuestions: [
      "Will blue-light or narrow-band imaging be used, and is it included?",
      "Is a single post-operative intravesical chemotherapy dose planned and included?",
      "If histopathology shows high-grade or T1 disease, how is a re-staging TURBT charged?",
      "Who explains the pathology and the surveillance or BCG plan, and is that visit included?",
    ],
    related: ["Radical Cystectomy", "Urinary Diversion", "Bladder Reconstruction"],
    topics: [
      {
        id: "staging-through-turbt",
        heading: "How TURBT stages bladder cancer and why muscle in the specimen matters",
        paragraphs: [
          "The pathologist needs to see whether cancer cells have reached the detrusor muscle. Tumours confined to the lining (Ta) or the layer just beneath it (T1) are non-muscle-invasive and are managed with resection, surveillance and, for higher risk, intravesical BCG. Muscle-invasive tumours (T2 or deeper) need radical cystectomy, radiotherapy-based treatment or systemic therapy.",
          "If the specimen lacks muscle, staging is incomplete and a repeat resection is standard. Grade, the presence of carcinoma in situ and tumour size and number all feed the risk group that determines follow-up intensity.",
        ],
      },
      {
        id: "after-turbt-surveillance",
        heading: "Surveillance and intravesical treatment after TURBT",
        paragraphs: [
          "Non-muscle-invasive bladder cancer recurs often, so cystoscopy is repeated at intervals for years — every three months at first for higher-risk disease. Intravesical BCG (a weakened bacterium instilled into the bladder weekly for six weeks, then maintenance) or chemotherapy reduces recurrence in eligible patients and is delivered as an outpatient course.",
          "For international patients the practical question is where this surveillance and instillation programme will happen. A written plan naming a home urologist, the schedule and the pathology to carry is part of a complete quotation.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is TURBT a cure for bladder cancer?",
        a: "For many non-muscle-invasive tumours TURBT removes all visible disease, but recurrence is common and surveillance is lifelong. For muscle-invasive tumours TURBT is a diagnostic and staging step and further radical treatment is needed.",
      },
      {
        q: "Why would I need a second TURBT within a few weeks?",
        a: "A re-staging resection is recommended for high-grade or T1 tumours and whenever the first specimen lacked muscle, because residual tumour or understaging is frequent. It is a separate operation and usually a separate invoice.",
      },
    ],
    campusFocus:
      "Name the campus with uro-oncology, enhanced-imaging cystoscopy where offered, a histopathology laboratory reporting bladder tumours and an intravesical therapy programme or a handover plan for one at home.",
    imageAlts: [
      "Medical infographic of TURBT anatomy showing a bladder in cross-section with a papillary tumour on the lining, the layers of the bladder wall including the detrusor muscle and a resectoscope loop at the tumour base",
      "Step-by-step TURBT pathway infographic showing urine cytology and cystoscopy, CT urography, bladder mapping with enhanced imaging, resection including muscle, labelled specimens to histopathology and optional single-dose intravesical chemotherapy",
      "TURBT recovery pathway infographic showing catheter removal, bleeding and perforation warnings, histopathology review, risk grouping, re-staging resection or BCG decision and surveillance cystoscopy schedule",
    ],
  },
  {
    procedure: "Bladder Reconstruction",
    shortName: "bladder reconstruction",
    cluster: "Reconstructive urology",
    specialist: "reconstructive urologist",
    unit: "per operation",
    definition:
      "Bladder reconstruction is major surgery that rebuilds or enlarges the bladder — most often by augmenting it with a patch of bowel (augmentation cystoplasty) or by creating a new bladder from bowel after removal of the original (orthotopic neobladder) — so that urine can be stored at safe low pressure and passed through the urethra rather than into an external bag.",
    mechanism:
      "A healthy bladder stretches to store urine at low pressure and empties completely on command. Neurological disease, radiation, tuberculosis, interstitial cystitis or congenital defects can make it small, stiff and high-pressure, threatening the kidneys and causing incontinence; bladder cancer may require its removal altogether. Bowel tissue is compliant and can be detubularised and reshaped into a low-pressure reservoir.",
    candidacy:
      "Bladder reconstruction may be considered for a small, high-pressure or non-compliant bladder that has failed medicines and botulinum toxin, for kidney-threatening pressures in neurogenic bladder, for contracted bladders after tuberculosis or radiation, and as an orthotopic neobladder after cystectomy when the urethra is cancer-free and the patient can self-catheterise if needed.",
    limits:
      "This is not radical cystectomy itself, which follows the shared surgical-oncology sheet, and not incontinent urinary diversion (ileal conduit), which is a separate slug. The stored range is a single-operation band; staged procedures, later stone or stricture treatment and long-term self-catheterisation supplies are separate.",
    evaluation:
      "Assessment includes video-urodynamics to measure bladder capacity, pressure and compliance, cystoscopy, imaging of the kidneys and ureters, kidney-function tests and electrolytes, an assessment of hand function and willingness to self-catheterise, bowel history, nutritional status and, in cancer cases, confirmation that the urethral margin is clear.",
    technique:
      "Under general anaesthesia through an open lower-abdominal incision or robotically, a segment of small bowel (or occasionally colon) is isolated on its blood supply and the bowel is rejoined. The segment is opened along its length and folded into a patch or a pouch. In augmentation the patch is sewn onto the opened bladder; in a neobladder the pouch is joined to the ureters and the urethra. Catheters and stents drain the reconstruction while it heals.",
    monitoring:
      "Monitoring covers bowel recovery, drain output, electrolytes and acid-base balance, urine leak, infection and mucus in the catheter, which needs regular flushing. The catheter typically stays two to three weeks and a contrast study confirms the pouch is watertight before it is removed and voiding or self-catheterisation training begins.",
    approaches: [
      { label: "Augmentation cystoplasty (ileocystoplasty)", detail: "A patch of small bowel enlarges the existing bladder. Most patients self-catheterise afterwards." },
      { label: "Orthotopic neobladder (e.g. Studer, Hautmann)", detail: "A complete bowel reservoir joined to the urethra after cystectomy. Requires a cancer-free urethra and motivated patient." },
      { label: "Continent cutaneous pouch (e.g. Indiana pouch)", detail: "A bowel reservoir emptied by catheterising a small abdominal stoma when the urethra cannot be used." },
      { label: "Open versus robot-assisted reconstruction", detail: "Robotic intracorporeal reconstruction is offered at some centres; platform charges are higher and operative time longer." },
    ],
    duration: "Commonly about 4–7 hours of theatre time depending on the type of reconstruction",
    admission:
      "Most patients stay seven to fourteen nights; the stored [STAY] reflects that. An ICU or high-dependency night is common, and bowel recovery sets the pace of discharge.",
    recovery:
      "Fatigue, incision discomfort and mucus in the urine persist for weeks, and continence with a neobladder improves over months. Flying is usually discussed after the catheter has been removed following a watertight contrast study, electrolytes are stable and emptying or self-catheterisation is reliable, often three to five weeks after surgery.",
    risks:
      "Risks include bleeding, infection, bowel leak or obstruction, urine leak from the reconstruction, blood clots, metabolic acidosis and vitamin B12 deficiency from bowel absorption, mucus retention and stones in the reservoir, reservoir perforation, night-time incontinence or failure to empty requiring self-catheterisation, ureteric stricture and, over decades, a small risk of malignancy in the bowel segment.",
    urgent: "fever with chills, severe abdominal pain or distension, vomiting, no urine or catheter output, or sudden heavy bleeding",
    drivers: [
      { label: "Type of reconstruction", detail: "An augmentation patch, a neobladder and a continent pouch differ substantially in operative time, stents and stay." },
      { label: "Combined cystectomy", detail: "When the bladder is removed at the same sitting, the oncology operation is a separate scope on the shared sheet." },
      { label: "Open versus robotic approach", detail: "Robotic intracorporeal reconstruction adds platform fees but may shorten recovery for some patients." },
      { label: "Previous surgery, radiation or tuberculosis", detail: "Scarred tissue and short ureters complicate dissection and anastomoses." },
      { label: "ICU and bowel recovery", detail: "Prolonged ileus, nutrition support or an ICU stay add daily charges." },
      { label: "Catheters, stents and training", detail: "Ureteric stents, suprapubic and urethral catheters and self-catheterisation teaching are itemized differently across centres." },
    ],
    inclusionExtra: { label: "Bowel segment reconstruction, stents and catheters", detail: "The stated augmentation, neobladder or pouch construction, ureteric stents, catheters, drain and the contrast study before catheter removal." },
    exclusionExtra: { label: "Cystectomy, staged procedures and long-term supplies", detail: "The cancer operation, later stone or stricture treatment, self-catheterisation supplies and vitamin supplementation are separate unless written." },
    records: [
      "Video-urodynamic study with capacity, pressures and compliance",
      "Cystoscopy report and any bladder biopsy or cancer histopathology with urethral margin status",
      "Imaging of kidneys and ureters (ultrasound, CT or MR urogram)",
      "Neurological diagnosis, bowel history and previous pelvic surgery or radiation records",
    ],
    quoteQuestions: [
      "Which type of reconstruction is planned, and why for my bladder and urethra?",
      "Will I need to self-catheterise, and is teaching included?",
      "How long will the catheter and stents stay, and is the contrast study included?",
      "How are electrolytes and vitamin B12 monitored after I return home?",
    ],
    related: ["Urinary Diversion", "Radical Cystectomy", "Urinary Tract Reconstruction"],
    topics: [
      {
        id: "neobladder-or-conduit",
        heading: "Neobladder or ileal conduit: choosing after cystectomy",
        paragraphs: [
          "A neobladder restores voiding through the urethra without an external bag but requires a longer operation, a cancer-free urethra, regular timed voiding, acceptance of some night-time leakage and the ability to self-catheterise if emptying is incomplete. An ileal conduit is simpler and more predictable but means a permanent stoma and appliance.",
          "Age, kidney function, bowel health, hand function, motivation and tumour location all influence the recommendation. Both are legitimate choices; the decision should be made with a stoma nurse and the surgeon before travel, because it changes the operation, the stay and the follow-up.",
        ],
      },
      {
        id: "living-with-a-bowel-bladder",
        heading: "Living with a bowel-based bladder",
        paragraphs: [
          "Bowel tissue keeps producing mucus, so the reservoir must be flushed or emptied fully to avoid retention and stones, and fluids should be generous. Bowel also absorbs urinary salts, so periodic blood tests check for acidosis and, after years, vitamin B12 deficiency. Many patients with an augmented bladder empty by clean intermittent self-catheterisation several times a day.",
          "Continence with a neobladder improves over the first year with timed voiding and pelvic-floor exercises; night-time leakage is common. Lifelong urology follow-up, including kidney imaging, is part of the commitment.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will I be able to pass urine normally after a neobladder?",
        a: "Most patients learn to void by relaxing the pelvic floor and gently straining at timed intervals. Daytime continence usually improves over months; night-time leakage is common, and some patients need intermittent self-catheterisation to empty fully.",
      },
      {
        q: "Why is self-catheterisation part of the plan for augmentation cystoplasty?",
        a: "The enlarged bladder often cannot contract strongly enough to empty on its own, especially in neurogenic bladder. Clean intermittent catheterisation several times a day empties it fully, protects the kidneys and reduces infection and stones. Willingness and hand function are checked before surgery.",
      },
    ],
    campusFocus:
      "Name a campus with reconstructive urology, stoma and continence nursing, ICU, and long-term follow-up capacity; a general surgical list without urodynamics and self-catheterisation teaching is not a reconstruction service.",
    imageAlts: [
      "Medical infographic of bladder reconstruction anatomy showing a small high-pressure bladder alongside an augmented bladder with a bowel patch and an orthotopic neobladder pouch joined to the ureters and urethra",
      "Step-by-step bladder reconstruction pathway infographic showing video-urodynamics, cystoscopy and imaging, isolating a bowel segment, detubularising and folding it into a patch or pouch, joining to bladder or urethra and ureters, and placing stents and catheters",
      "Bladder reconstruction recovery pathway infographic showing ICU and bowel recovery, catheter flushing for mucus, contrast study before catheter removal, voiding or self-catheterisation training, electrolyte monitoring and travel clearance",
    ],
  },
  {
    procedure: "Urinary Diversion",
    shortName: "urinary diversion",
    cluster: "Reconstructive urology",
    specialist: "reconstructive urologist or uro-oncologist",
    unit: "per operation",
    definition:
      "Urinary diversion re-routes urine away from a removed or non-functioning bladder to the outside of the body. The most common form is the ileal conduit, in which a short segment of small bowel carries urine from the ureters to a stoma on the abdominal wall that drains continuously into an external appliance; continent pouches emptied by catheter are an alternative.",
    mechanism:
      "When the bladder has been removed for cancer, or is so damaged by radiation, neurological disease, fistula or trauma that it cannot safely store urine, the kidneys still need an unobstructed, low-pressure outlet. A bowel segment provides a living tube or reservoir with its own blood supply that can be joined to the ureters and brought to the skin.",
    candidacy:
      "Urinary diversion may be considered after radical cystectomy for muscle-invasive bladder cancer when a neobladder is unsuitable or not wanted, for intractable incontinence or fistula after pelvic radiation, for a devastated bladder from neurological disease or trauma, and for some children with complex congenital anomalies.",
    limits:
      "This is not radical cystectomy, which follows the shared surgical-oncology sheet, and not orthotopic neobladder, which sits under Bladder Reconstruction. The stored range is a single-operation band; stoma appliances after discharge, revision of a stenosed stoma or ureteric anastomosis and treatment of the underlying cancer are separate.",
    evaluation:
      "Assessment includes imaging of the kidneys and ureters, kidney-function tests and electrolytes, cystoscopy or oncology staging where relevant, bowel history and previous abdominal surgery or radiation, nutritional status, a stoma-nurse assessment marking the ideal stoma site on the abdomen, and an anaesthetic review of fitness for major surgery.",
    technique:
      "Under general anaesthesia, open or robotically, a segment of ileum about fifteen centimetres long is isolated on its blood supply and the bowel is rejoined. Both ureters are joined to one end of the segment over temporary stents, and the other end is brought through the abdominal wall to form a spouted stoma at the pre-marked site. A stoma appliance is fitted in theatre and drains are placed.",
    monitoring:
      "Monitoring covers stoma colour and output, ureteric stent drainage, bowel recovery, electrolytes, drain output for urine leak and infection. Stents are usually removed after one to three weeks, and stoma nurses teach appliance changes before discharge.",
    approaches: [
      { label: "Ileal conduit", detail: "The most common incontinent diversion. A bowel tube carries urine to a stoma draining into an appliance." },
      { label: "Continent cutaneous pouch (e.g. Indiana pouch)", detail: "A bowel reservoir emptied by catheterising a small flush stoma several times daily, without a bag." },
      { label: "Cutaneous ureterostomy", detail: "Ureters brought directly to the skin, used in frail patients or children when bowel cannot be used; higher stenosis risk." },
      { label: "Open versus robotic construction", detail: "Robotic intracorporeal conduit formation is available at some centres and carries higher platform fees." },
    ],
    duration: "Commonly about 3–5 hours of theatre time for the diversion alone; longer when combined with cystectomy",
    admission:
      "Most patients stay seven to fourteen nights; the stored [STAY] reflects that. Bowel recovery, stent management and stoma teaching set the pace of discharge.",
    recovery:
      "Fatigue and incision discomfort improve over four to six weeks, while confidence with the appliance grows over the first month. Flying is usually discussed after the stents are out, the stoma is healthy, electrolytes are stable and the patient or companion can manage appliance changes, often three to four weeks after surgery.",
    risks:
      "Risks include bleeding, infection, bowel leak or obstruction, urine leak at the ureteric join, blood clots, stoma problems (retraction, prolapse, hernia or narrowing), ureteric stricture, kidney infection, stones, metabolic acidosis and vitamin B12 deficiency over time, and gradual decline in kidney function if drainage is obstructed.",
    urgent: "fever with chills, a dark or dusky stoma, no urine output into the appliance, severe abdominal pain or vomiting, or flank pain with fever",
    drivers: [
      { label: "Type of diversion", detail: "An ileal conduit, a continent pouch and a ureterostomy differ in operative time, consumables and teaching needs." },
      { label: "Combined cystectomy", detail: "When the bladder is removed at the same sitting, the oncology operation is a separate scope on the shared sheet." },
      { label: "Open versus robotic approach", detail: "Robotic intracorporeal diversion adds platform fees; open surgery may lengthen the stay." },
      { label: "Prior radiation or surgery", detail: "Irradiated bowel and scarred ureters raise leak and stricture risk and may require alternative segments." },
      { label: "ICU and bowel recovery", detail: "Ileus, nutrition support or an ICU stay add daily charges." },
      { label: "Stoma care and appliances", detail: "Stoma-nurse teaching, initial appliances and long-term supplies are itemized differently across centres and countries." },
    ],
    inclusionExtra: { label: "Bowel segment diversion, stents and stoma formation", detail: "The stated conduit or pouch construction, ureteric stents, stoma formation, initial appliances and stoma-nurse teaching during admission." },
    exclusionExtra: { label: "Cystectomy, long-term appliances and revisions", detail: "The cancer operation, stoma supplies after discharge, revision for stoma or ureteric narrowing and oncology treatment are separate unless written." },
    records: [
      "Kidney and ureter imaging (CT urogram or ultrasound) with kidney-function tests",
      "Cancer staging and histopathology where cystectomy is planned",
      "Previous abdominal or pelvic surgery and radiation records",
      "Neurological diagnosis or fistula work-up where relevant, and bowel history",
    ],
    quoteQuestions: [
      "Which diversion is planned, and why was a neobladder or continent pouch not chosen?",
      "Is stoma-nurse teaching included, and how many appliances are supplied at discharge?",
      "How long will the ureteric stents stay, and who removes them?",
      "How are kidney function and electrolytes followed after I return home?",
    ],
    related: ["Bladder Reconstruction", "Radical Cystectomy", "Urinary Tract Reconstruction"],
    topics: [
      {
        id: "living-with-a-urostomy",
        heading: "Living with a urostomy",
        paragraphs: [
          "A urostomy drains continuously, so the appliance is worn at all times and emptied several times a day, with a night-drainage bag for sleep. Skin protection around the stoma, correct appliance sizing and hydration to keep urine flowing are the daily fundamentals. Mucus threads in the urine are normal because the conduit is bowel.",
          "Most people return to work, travel and exercise; swimming is possible with a secure appliance. Stoma nurses at home are the long-term resource, so ask for a written handover and a supplies plan before leaving India.",
        ],
      },
      {
        id: "protecting-the-kidneys",
        heading: "Protecting the kidneys after diversion",
        paragraphs: [
          "The ureteric joins can narrow over time, and infection can travel up to the kidneys, so periodic ultrasound or CT, kidney-function tests and electrolytes are standard for life. Unexplained flank pain, fever or falling urine output should prompt imaging rather than waiting.",
          "Bowel absorbs salts from urine, and long segments can cause metabolic acidosis; vitamin B12 levels are checked after several years because the terminal ileum is sometimes used. These checks are usually done by the home urologist or nephrologist.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is an ileal conduit permanent?",
        a: "Usually, yes. Conversion to a neobladder or continent pouch is possible in selected patients but is a major further operation. Most people adapt well to a conduit with good stoma care and support.",
      },
      {
        q: "Can I travel by air with a urostomy?",
        a: "Yes, once the surgical team has cleared you. Carry spare appliances in hand luggage, empty the bag before boarding, drink enough fluid and keep a letter describing the stoma for security screening.",
      },
    ],
    campusFocus:
      "Name a campus with reconstructive urology or uro-oncology, dedicated stoma nursing, ICU and a written supplies handover; a general surgical ward without stoma nurses is not a diversion service.",
    imageAlts: [
      "Medical infographic of urinary diversion anatomy showing both ureters joined to an isolated segment of small bowel that passes through the abdominal wall to a stoma with an external collection appliance",
      "Step-by-step urinary diversion pathway infographic showing kidney imaging and stoma-site marking, isolating an ileal segment, joining the ureters over stents, forming the stoma, fitting the appliance and stoma-nurse teaching",
      "Urinary diversion recovery pathway infographic showing bowel recovery, stent removal, stoma and skin care training, electrolyte and kidney-function checks, supplies handover and travel clearance",
    ],
  },
  {
    procedure: "Kidney Transplantation",
    shortName: "kidney transplantation",
    cluster: "Kidney transplantation",
    specialist: "transplant urologist working with a transplant nephrologist",
    unit: "per transplant episode",
    definition:
      "Kidney transplantation places a healthy kidney from a living or deceased donor into the lower abdomen of a person with kidney failure, joining its artery and vein to the pelvic vessels and its ureter to the bladder, so the new kidney filters blood and produces urine while the failed kidneys are usually left in place.",
    mechanism:
      "End-stage kidney disease from diabetes, hypertension, glomerulonephritis, polycystic disease or other causes leaves the kidneys unable to clear waste or balance fluid and electrolytes. Dialysis replaces part of this work; a transplanted kidney can replace most of it, but the immune system recognises it as foreign, so lifelong immunosuppression is needed to prevent rejection.",
    candidacy:
      "Kidney transplantation may be considered for advanced or end-stage kidney disease, on dialysis or approaching it, when a transplant nephrologist judges the recipient fit for major surgery and immunosuppression, active infection and cancer have been excluded, and — for international patients in India — a legally eligible living donor is available and approved.",
    limits:
      "This is the umbrella transplant sheet; Living Donor, Deceased Donor and ABO-Incompatible Kidney Transplantation are separate slugs, and evaluation, graft biopsy and paired exchange sit under nephrology. The stored range is a recipient-episode band; donor surgery, induction agents, desensitisation, dialysis while waiting and years of immunosuppression are commonly separate.",
    evaluation:
      "Assessment includes blood group and HLA typing with crossmatch against the donor, dialysis history, cardiac evaluation (echocardiogram and often stress testing or angiography), screening for hepatitis, HIV, tuberculosis, CMV and cancer, imaging of the pelvic vessels and bladder and, in India, legal documentation of the donor relationship for the authorisation committee.",
    technique:
      "Under general anaesthesia, a curved incision is made in the lower abdomen and the iliac vessels are exposed without entering the peritoneum. The donor kidney's renal vein is joined to the external iliac vein and the renal artery to the external or internal iliac artery; once clamps are released the kidney should turn pink and begin to make urine. The donor ureter is tunnelled into the bladder over a stent, a drain is placed and the wound closed.",
    monitoring:
      "Monitoring covers hourly urine output, creatinine trend, fluid balance, blood pressure, drain output, Doppler ultrasound of graft blood flow and immunosuppressant drug levels. Delayed graft function may need temporary dialysis. The catheter comes out within days, the stent at two to six weeks, and clinic visits with laboratories are frequent in the first three months.",
    approaches: [
      { label: "Living-donor transplantation", detail: "A related or legally approved donor gives one kidney in a planned operation. Shortest cold-ischaemia time and scheduled timing." },
      { label: "Deceased-donor transplantation", detail: "A kidney allocated from a brain-dead or circulatory-death donor through state registries; not accessible to overseas patients travelling to India." },
      { label: "ABO-incompatible or HLA-sensitised transplantation", detail: "Desensitisation with plasma exchange and antibody-depleting agents before a mismatched living-donor graft. Separate slug with added cost and risk." },
      { label: "Pre-emptive transplantation", detail: "Transplant before dialysis begins, when a donor is ready and function is falling; avoids access surgery and dialysis costs." },
    ],
    duration: "Commonly about 3–4 hours of theatre time for the recipient operation",
    admission:
      "Recipients commonly stay ten to twenty-one nights including early ICU or high-dependency care; the stored [STAY] reflects that. Outpatient follow-up in the city continues for several weeks after discharge.",
    recovery:
      "Energy returns over one to two months as creatinine settles and medicines are adjusted, with a restricted-hygiene period while immunosuppression is highest. Flying is usually discussed after the stent is out, creatinine and drug levels are stable, there is no infection or rejection concern and a home transplant clinic has accepted the handover, often four to eight weeks after surgery.",
    risks:
      "Risks include bleeding, blood clot in the graft artery or vein (which can cause graft loss), urine leak or ureteric stricture, wound infection or lymphocele, delayed graft function needing dialysis, acute rejection, infections related to immunosuppression (CMV, BK virus, pneumonia, urinary infection), new-onset diabetes, drug toxicity, cardiovascular events, an increased long-term cancer risk and eventual chronic graft failure.",
    urgent: "fever, a sudden fall in urine output, pain or swelling over the graft, rising blood pressure with headache, breathlessness, or any missed immunosuppressant doses",
    drivers: [
      { label: "Donor type and compatibility", detail: "A compatible living donor is the base case; ABO-incompatible or highly sensitised recipients need desensitisation that can multiply costs." },
      { label: "Induction and maintenance immunosuppression", detail: "Antibody induction agents (basiliximab, thymoglobulin) and the maintenance regimen are often billed separately and continue for life." },
      { label: "Recipient comorbidity", detail: "Cardiac disease, diabetes, obesity and prior transplants increase work-up, ICU probability and complication risk." },
      { label: "Dialysis during the episode", detail: "Sessions before surgery and for delayed graft function are often separate lines." },
      { label: "Legal and evaluation pathway", detail: "Authorisation-committee documentation, HLA testing and repeat crossmatches add time and charges before a date is fixed." },
      { label: "Post-transplant monitoring", detail: "Drug levels, viral PCRs, Doppler scans and protocol biopsies in the first months are rarely inside a package." },
    ],
    inclusionExtra: { label: "Recipient operation and early graft monitoring", detail: "The stated recipient surgery, ICU or high-dependency nights, standard immunosuppression during admission and routine post-operative laboratories and Doppler as written." },
    exclusionExtra: { label: "Donor surgery, desensitisation and lifelong medicines", detail: "The donor nephrectomy, plasma exchange or antibody therapy, dialysis while waiting, induction agents and immunosuppression after discharge are separate unless written." },
    records: [
      "Blood group, HLA typing, PRA or DSA results and any previous crossmatch",
      "Dialysis prescription, access details and kidney-disease history",
      "Cardiac evaluation (echocardiogram, stress test or angiography) and infection screening",
      "Donor identity, relationship documents and donor medical evaluation where a living donor exists",
    ],
    quoteQuestions: [
      "Does the estimate cover the recipient only, or the donor operation as well?",
      "Which induction agent and maintenance regimen are assumed, and are they included?",
      "How is dialysis for delayed graft function charged?",
      "What does the legal authorisation process require from us, and how long does it take?",
    ],
    related: ["Living Donor Kidney Transplantation", "ABO-Incompatible Kidney Transplantation", "Kidney Transplant Evaluation and Follow-up"],
    topics: [
      {
        id: "legal-framework-india",
        heading: "The legal framework for transplantation in India",
        paragraphs: [
          "India's Transplantation of Human Organs and Tissues Act permits living donation from near relatives and, with additional scrutiny, from others motivated by affection, and prohibits any payment for organs. Foreign recipients must present documentation from their home country confirming the donor relationship, and each case is reviewed by a hospital or state authorisation committee before surgery. Deceased-donor kidneys are allocated to domestic wait-lists, so overseas patients should not travel expecting one.",
          "The paperwork takes time and can delay a transplant date after arrival. Ask the hospital's transplant coordinator for the exact document list before booking travel.",
        ],
      },
      {
        id: "life-after-transplant",
        heading: "Immunosuppression and life after transplantation",
        paragraphs: [
          "A typical regimen combines a calcineurin inhibitor such as tacrolimus, an antiproliferative such as mycophenolate and, often, low-dose steroid. Doses are adjusted to blood levels, and missed doses risk rejection. Infection precautions, sun protection, blood-pressure and glucose control and avoiding kidney-toxic medicines become permanent habits.",
          "Follow-up is intensive at first — laboratories weekly, then monthly — and continues lifelong. A named transplant clinic at home must accept the patient before departure, with a written medicine list, target drug levels and a plan for fever or falling urine output.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Can an international patient receive a deceased-donor kidney in India?",
        a: "In practice, no. Deceased-donor organs are allocated through state registries to domestic wait-lists. International patients need a legally eligible living donor who travels with them and is approved by the authorisation committee.",
      },
      {
        q: "Are my own kidneys removed during transplantation?",
        a: "Usually not. The new kidney is placed in the lower abdomen and the native kidneys are left unless they cause infection, uncontrolled blood pressure, are very large polycystic kidneys or need space; removing them is a separate operation.",
      },
    ],
    campusFocus:
      "Name a campus with a registered transplant programme, an authorisation committee process, transplant nephrology and urology, HLA laboratory access, dialysis backup and ICU; a nephrology clinic alone is not a transplant service.",
    imageAlts: [
      "Medical infographic of kidney transplantation anatomy showing the failed native kidneys left in place and a donor kidney in the lower abdomen with its artery and vein joined to the iliac vessels and its ureter joined to the bladder",
      "Step-by-step kidney transplantation pathway infographic showing compatibility testing and legal approval, recipient fitness work-up, the recipient operation with vascular and ureteric anastomoses, ICU monitoring and immunosuppression",
      "Kidney transplantation recovery pathway infographic showing urine-output and creatinine monitoring, drug-level adjustment, stent removal, infection precautions, home transplant-clinic handover and travel clearance",
    ],
  },
  {
    procedure: "Living Donor Kidney Transplantation",
    shortName: "living-donor kidney transplantation",
    cluster: "Kidney transplantation",
    specialist: "transplant urologist working with a transplant nephrologist",
    unit: "per transplant episode",
    definition:
      "Living donor kidney transplantation is a planned pair of operations: a healthy, legally approved donor has one kidney removed, usually laparoscopically, and it is immediately transplanted into a recipient with kidney failure. It is the form of transplantation international patients can realistically plan in India.",
    mechanism:
      "A person with two healthy kidneys can donate one and live a normal life with the remaining kidney, which enlarges to take over most of the function. The donated kidney, removed with its artery, vein and ureter intact and flushed with cold solution, is connected to the recipient's pelvic vessels and bladder within minutes, which is why living-donor grafts tend to start working quickly.",
    candidacy:
      "Living donor kidney transplantation may be considered when a recipient with advanced kidney disease has a willing donor who is a near relative or otherwise legally eligible, whose blood group and crossmatch are compatible (or can be made so with desensitisation), and who passes a full medical, surgical and psychosocial evaluation confirming donation is safe for them.",
    limits:
      "This is not deceased-donor or ABO-incompatible transplantation, which are separate slugs, and it does not include the recipient's evaluation or long-term follow-up, which sit under nephrology. The stored range describes the paired episode as quoted; some hospitals invoice donor and recipient separately, and induction agents, desensitisation and lifelong medicines are commonly outside it.",
    evaluation:
      "Donor assessment includes blood group and HLA compatibility, measured kidney function, urine protein, blood pressure, glucose, a CT angiogram to map the kidney vessels, infection and cancer screening, psychological assessment and legal documentation of the relationship. Recipient assessment covers cardiac fitness, infection screening and imaging of the pelvic vessels and bladder.",
    technique:
      "The donor operation is usually laparoscopic: the kidney is freed, the ureter, artery and vein are divided and the kidney is removed through a small incision and flushed with cold solution. In an adjacent theatre the kidney is implanted by joining its vein and artery to the recipient's iliac vessels and the ureter to the bladder over a stent.",
    monitoring:
      "Donor monitoring covers pain, creatinine, wound and mobility, with discharge usually within a few days. Recipient monitoring covers urine output, creatinine, Doppler graft flow, fluid balance, drain output and immunosuppressant levels, with early ICU or high-dependency care and frequent laboratories after discharge.",
    approaches: [
      { label: "Laparoscopic donor nephrectomy", detail: "The standard donor operation: small ports and a short extraction incision, quicker recovery than open surgery." },
      { label: "Robot-assisted donor nephrectomy", detail: "Offered at some centres; similar recovery with higher platform charges." },
      { label: "Open donor nephrectomy", detail: "Reserved for unusual vascular anatomy or when keyhole surgery is unsafe; longer donor recovery." },
      { label: "Pre-emptive or dialysis-dependent recipient", detail: "Transplanting before dialysis starts avoids access surgery; established dialysis patients need sessions timed around the operation." },
    ],
    duration: "Commonly about 2–3 hours for the donor operation and 3–4 hours for the recipient",
    admission:
      "Recipients commonly stay ten to twenty-one nights including early ICU care, and donors three to five nights; the stored [STAY] reflects the recipient episode. Outpatient follow-up in the city continues for several weeks.",
    recovery:
      "Donors return to light activity within two to four weeks; recipients regain energy over one to two months as medicines are adjusted. Flying is usually discussed for the pair after the recipient's stent is out, creatinine and drug levels are stable, there is no infection or rejection concern and a home transplant clinic has accepted both, often four to eight weeks after surgery.",
    risks:
      "Donor risks include bleeding, infection, wound problems, injury to nearby organs, blood clots, a small lifelong rise in blood pressure or protein leak and rare conversion to open surgery. Recipient risks include vascular thrombosis, urine leak or stricture, delayed graft function, rejection, infections from immunosuppression, new-onset diabetes, drug toxicity and eventual graft failure.",
    urgent: "for the recipient, fever, falling urine output, pain or swelling over the graft or missed doses; for the donor, fever, heavy bleeding, severe pain or breathlessness",
    drivers: [
      { label: "Donor and recipient billed together or separately", detail: "Some hospitals quote one paired episode; others issue two invoices. Compare like with like." },
      { label: "Compatibility and desensitisation", detail: "A compatible pair is the base case; ABO or HLA incompatibility adds plasma exchange and antibody therapy under a separate slug." },
      { label: "Induction and maintenance immunosuppression", detail: "Induction agents and the maintenance regimen are often outside the surgical estimate and continue for life." },
      { label: "Donor operation approach", detail: "Laparoscopic, robotic or open donor nephrectomy changes theatre time, consumables and donor stay." },
      { label: "Recipient comorbidity and dialysis", detail: "Cardiac disease, diabetes, prior transplants and dialysis sessions around surgery add lines." },
      { label: "Legal process and repeat testing", detail: "Authorisation-committee documentation and repeat crossmatches add time and charges before a date is fixed." },
    ],
    inclusionExtra: { label: "Donor nephrectomy and recipient implantation as quoted", detail: "The stated donor operation, recipient surgery, ICU or high-dependency nights, standard in-hospital immunosuppression and routine laboratories and Doppler as written." },
    exclusionExtra: { label: "Desensitisation, lifelong medicines and long-term donor follow-up", detail: "Plasma exchange or antibody therapy, induction agents, immunosuppression after discharge and the donor's annual checks at home are separate unless written." },
    records: [
      "Donor and recipient blood group, HLA typing and crossmatch results",
      "Donor kidney-function tests, urine protein and CT angiogram of the kidneys",
      "Recipient dialysis history, cardiac evaluation and infection screening",
      "Legal documents establishing the donor–recipient relationship for the authorisation committee",
    ],
    quoteQuestions: [
      "Is this one paired estimate or separate donor and recipient invoices?",
      "Which donor operation is planned, and how many nights does the donor stay?",
      "Which induction agent and maintenance regimen are assumed, and are they included?",
      "What documents does the authorisation committee need, and how long does approval take after arrival?",
    ],
    related: ["Kidney Transplantation", "ABO-Incompatible Kidney Transplantation", "Kidney Transplant Evaluation and Follow-up"],
    topics: [
      {
        id: "donor-safety",
        heading: "Protecting the living donor",
        paragraphs: [
          "Donor evaluation exists to confirm that giving a kidney is safe for that person: two kidneys of good function, normal blood pressure and glucose, no protein leak, no transmissible infection or cancer and a stable psychosocial situation. The side with more complex vessels is usually left with the donor. Donation is voluntary and the donor can withdraw at any point without explanation.",
          "After donation the remaining kidney adapts, and most donors live normally. Annual blood pressure, creatinine and urine-protein checks are recommended for life, and this follow-up should be arranged at home before travel.",
        ],
      },
      {
        id: "coordinating-two-operations",
        heading: "Coordinating two patients, one date",
        paragraphs: [
          "Both operations happen on the same day in adjacent theatres, so both people must be fit, infection-free and legally approved before the date is fixed. A cold, a urinary infection or a dental problem in either can postpone surgery. Flexible travel and accommodation for donor, recipient and a companion are essential.",
          "Recovery runs on two timelines: the donor is usually discharged within days, while the recipient stays longer and attends frequent clinic visits before both are cleared to fly.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Who can be a living kidney donor for an international patient in India?",
        a: "A near relative — spouse, parent, child, sibling, grandparent or grandchild — is the usual legal category, with documentary proof of the relationship. Non-related donors face stricter scrutiny, and any payment is prohibited. The hospital's transplant coordinator explains the exact requirements.",
      },
      {
        q: "How long does the donor take to recover?",
        a: "After laparoscopic donor nephrectomy most donors leave hospital within a few days, resume light activity within two to four weeks and heavier work after about six weeks. Lifelong annual checks of blood pressure, creatinine and urine protein are advised.",
      },
    ],
    campusFocus:
      "Name a campus with a registered living-donor programme, laparoscopic donor surgery, transplant nephrology, an authorisation committee process, HLA laboratory access, dialysis backup and ICU.",
    imageAlts: [
      "Medical infographic of living donor kidney transplantation anatomy showing a donor with one kidney removed laparoscopically and the recipient with the donated kidney implanted in the lower abdomen joined to the iliac vessels and bladder",
      "Step-by-step living donor transplantation pathway infographic showing donor and recipient compatibility testing, legal approval, coordinated donor nephrectomy and recipient implantation, ICU monitoring and immunosuppression start",
      "Living donor transplantation recovery pathway infographic showing donor discharge within days, recipient creatinine and urine-output monitoring, drug-level adjustment, stent removal, home clinic handover for both and travel clearance",
    ],
  },
  {
    procedure: "Deceased Donor Kidney Transplantation",
    shortName: "deceased-donor kidney transplantation",
    cluster: "Kidney transplantation",
    specialist: "transplant urologist working with a transplant nephrologist",
    unit: "per transplant episode",
    definition:
      "Deceased donor kidney transplantation implants a kidney recovered from a donor after brain death or circulatory death into a recipient on a transplant waiting list. The kidney is preserved in cold solution and transported, matched by blood group and HLA through an allocation registry, and transplanted urgently when the recipient is called in.",
    mechanism:
      "After death is legally certified and the family consents, organs are perfused with cold preservation solution and recovered in a coordinated operation. Cold storage slows metabolism but injury accumulates with time, so kidneys are transplanted within hours; the longer the cold-ischaemia time and the older or less stable the donor, the more likely the graft is to work slowly at first and need temporary dialysis.",
    candidacy:
      "Deceased donor kidney transplantation may be considered for people with end-stage kidney disease who have no suitable living donor and who are registered on a national or state waiting list where they reside. In India, allocation is to domestic wait-lists through state registries, so international patients travelling for treatment should not expect access to a deceased-donor kidney.",
    limits:
      "This is not living-donor or ABO-incompatible transplantation, which are separate slugs. The stored range is a recipient-episode band for domestic listing context only; wait-list dialysis, registry fees, induction agents, temporary dialysis for delayed graft function and lifelong immunosuppression are outside it, and no wait-list place or timing can be promised.",
    evaluation:
      "Assessment includes blood group and HLA typing with a stored serum for crossmatch, kidney-disease and dialysis history, cardiac evaluation, infection and cancer screening, imaging of the pelvic vessels and bladder, and confirmation of eligibility for the relevant registry. Fitness must be re-confirmed rapidly when an organ offer arrives, often at night.",
    technique:
      "When an offer is accepted, the recipient is admitted urgently, a final crossmatch is completed and dialysis may be given first. Under general anaesthesia the kidney is implanted in the lower abdomen by joining its vein and artery to the iliac vessels and its ureter to the bladder over a stent. Because cold-ischaemia time is longer than in living donation, the kidney may not produce urine immediately.",
    monitoring:
      "Monitoring covers urine output, creatinine, Doppler graft flow, fluid balance and drug levels, with dialysis continued if graft function is delayed. Induction immunosuppression is commonly stronger than for living-donor grafts. Stent removal, frequent laboratories and viral monitoring follow over the first months.",
    approaches: [
      { label: "Donation after brain death (DBD)", detail: "The commonest deceased-donor source; the heart is still beating during recovery, limiting warm ischaemia." },
      { label: "Donation after circulatory death (DCD)", detail: "Recovery after the heart stops; higher rates of delayed graft function but comparable longer-term outcomes in many series." },
      { label: "Machine perfusion of the kidney", detail: "Pulsatile cold perfusion during storage may reduce delayed graft function; availability varies by centre." },
      { label: "Dual or expanded-criteria kidneys", detail: "Kidneys from older or comorbid donors, sometimes transplanted as a pair, offered to selected recipients with informed consent." },
    ],
    duration: "Commonly about 3–4 hours of theatre time, after urgent admission when an organ is offered",
    admission:
      "Recipients commonly stay ten to twenty-one nights including early ICU care; the stored [STAY] reflects that. Delayed graft function can extend the stay and add dialysis sessions.",
    recovery:
      "Energy returns over one to three months, more slowly when the graft starts late. Travel is discussed only after graft function, drug levels and infection screening are stable and a home transplant clinic has accepted the handover; for domestic recipients this is typically six to eight weeks or longer.",
    risks:
      "Risks include delayed graft function needing dialysis, primary non-function, vascular thrombosis, urine leak or stricture, acute rejection (somewhat more likely than after living donation), donor-transmitted infection or, rarely, malignancy, infections related to immunosuppression, new-onset diabetes, cardiovascular events and eventual graft failure.",
    urgent: "fever, a sudden fall in urine output, pain or swelling over the graft, breathlessness, or missed immunosuppressant doses",
    drivers: [
      { label: "Donor type and cold-ischaemia time", detail: "DCD, expanded-criteria and long-transported kidneys raise the probability of delayed graft function and dialysis days." },
      { label: "Induction and maintenance immunosuppression", detail: "Stronger induction (often thymoglobulin) and the maintenance regimen are usually separate and lifelong." },
      { label: "Dialysis before and after", detail: "Wait-list dialysis and sessions for a slow-starting graft are separate lines." },
      { label: "Recipient comorbidity", detail: "Cardiac disease, diabetes and prior transplants increase monitoring and ICU probability." },
      { label: "Registry and testing", detail: "Listing, repeat HLA antibody screening and the final crossmatch add charges outside surgery." },
      { label: "Machine perfusion and organ transport", detail: "Where used, perfusion devices and logistics are billed differently across programmes." },
    ],
    inclusionExtra: { label: "Recipient implantation and early monitoring as quoted", detail: "The stated urgent admission, recipient operation, ICU or high-dependency nights, standard in-hospital immunosuppression and routine laboratories and Doppler as written." },
    exclusionExtra: { label: "Wait-list dialysis, delayed-function dialysis and lifelong medicines", detail: "Dialysis while waiting or for a slow graft, induction agents, immunosuppression after discharge and registry fees are separate unless written." },
    records: [
      "Blood group, HLA typing and current antibody (PRA or DSA) results",
      "Registry listing status and dialysis prescription in the country of residence",
      "Cardiac evaluation and infection screening within the past year",
      "Previous transplant or sensitising event history (transfusions, pregnancies)",
    ],
    quoteQuestions: [
      "Is a deceased-donor kidney realistically accessible to me as a non-resident, or is this page for context?",
      "How is dialysis for delayed graft function charged?",
      "Which induction agent is assumed for a deceased-donor graft, and is it included?",
    ],
    related: ["Kidney Transplantation", "Living Donor Kidney Transplantation", "Hemodialysis"],
    topics: [
      {
        id: "allocation-and-eligibility",
        heading: "How deceased-donor kidneys are allocated in India",
        paragraphs: [
          "Deceased-donor organs in India are allocated through state organ and tissue transplant organisations, coordinated nationally, to patients registered on domestic waiting lists by blood group, waiting time, medical urgency and match. Registration requires residency-linked documentation, and foreign nationals are not prioritised. This page exists so patients understand the pathway, not because it is a travel product.",
          "International patients with kidney failure should therefore pursue listing at home and, where a legally eligible living donor exists, consider Living Donor Kidney Transplantation in India instead.",
        ],
      },
      {
        id: "delayed-graft-function",
        heading: "Delayed graft function: why a deceased-donor kidney may start slowly",
        paragraphs: [
          "Cold storage, donor age and instability before recovery injure the kidney's tubules. Many deceased-donor grafts take days to weeks to produce adequate urine, during which dialysis continues. This is not the same as rejection, although a biopsy may be needed to tell the two apart when creatinine does not fall as expected.",
          "Delayed graft function lengthens the stay, adds dialysis sessions and laboratories, and is the main reason deceased-donor episodes cost more than their surgical estimate suggests.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Can I register on an Indian deceased-donor waiting list as a foreign national?",
        a: "Not in practice. Registries serve domestic residents, and allocation policies do not prioritise foreign nationals. Register in your home country and discuss living donation if a legally eligible donor is available.",
      },
      {
        q: "How long is the wait for a deceased-donor kidney?",
        a: "It varies widely by blood group, sensitisation and region, from months to many years. No hospital can promise a timeframe, and wait-list dialysis continues throughout.",
      },
    ],
    campusFocus:
      "Name a campus registered with the state transplant organisation, with transplant nephrology and urology, HLA laboratory access, dialysis backup and ICU, and ask directly whether a non-resident can be listed before assuming any pathway exists.",
    imageAlts: [
      "Medical infographic of deceased donor kidney transplantation anatomy showing a preserved donor kidney in cold storage and its implantation in the recipient's lower abdomen joined to the iliac vessels and bladder",
      "Step-by-step deceased donor transplantation pathway infographic showing registry listing and antibody screening, urgent organ offer and final crossmatch, dialysis if needed, recipient implantation and ICU monitoring with induction immunosuppression",
      "Deceased donor transplantation recovery pathway infographic showing delayed graft function with dialysis, creatinine and urine-output monitoring, drug-level adjustment, stent removal and home clinic handover",
    ],
  },
  {
    procedure: "ABO-Incompatible Kidney Transplantation",
    shortName: "ABO-incompatible kidney transplantation",
    cluster: "Kidney transplantation",
    specialist: "transplant nephrologist and transplant urologist experienced in desensitisation",
    unit: "per transplant episode",
    definition:
      "ABO-incompatible kidney transplantation allows a living donor whose blood group does not match the recipient's to donate, by first lowering the recipient's anti-blood-group antibodies with plasma exchange or immunoadsorption and an antibody-depleting drug (rituximab), then transplanting when the antibody level is low enough and continuing enhanced immunosuppression afterwards.",
    mechanism:
      "Blood-group antigens sit on kidney blood vessels as well as red cells. A recipient's natural anti-A or anti-B antibodies would attack an incompatible kidney within hours (hyperacute rejection). Removing these antibodies before surgery and suppressing their return allows the graft to establish 'accommodation', after which the kidney tolerates the antibodies that gradually reappear.",
    candidacy:
      "ABO-incompatible transplantation may be considered when the only willing, legally eligible living donor has an incompatible blood group, the recipient's starting antibody level is within a range the programme can lower safely, no paired exchange is available, and the recipient accepts the additional cost, infection risk and monitoring that desensitisation involves.",
    limits:
      "This is not a compatible living-donor transplant, and paired kidney exchange — often the preferred alternative — sits under nephrology. The stored range is an enhanced episode band; the number of plasma-exchange sessions, rituximab and immunoglobulin doses, extra laboratories and a longer stay vary considerably and must be written into the estimate.",
    evaluation:
      "Assessment includes the recipient's baseline anti-A or anti-B titre, blood group and HLA crossmatch (HLA incompatibility on top of ABO incompatibility raises risk substantially), the full recipient and donor transplant work-up, infection screening with particular attention to hepatitis B and CMV given the extra immunosuppression, and vascular access planning for plasma exchange.",
    technique:
      "Desensitisation begins one to four weeks before surgery: rituximab is given, and plasma exchange or immunoadsorption sessions remove antibody until the titre falls below the programme's threshold, often with intravenous immunoglobulin. The donor nephrectomy and recipient implantation then proceed as in a compatible living-donor transplant, with antibody titres checked daily for the first two weeks in case rebound requires further exchanges.",
    monitoring:
      "Monitoring covers antibody titres, creatinine and urine output, Doppler flow, coagulation and calcium after plasma exchange, infection surveillance and drug levels. Early biopsy is common if creatinine rises, to distinguish antibody-mediated rejection from other causes. Enhanced immunosuppression continues for months.",
    approaches: [
      { label: "Plasma exchange with rituximab", detail: "The most widely used protocol: several exchanges before surgery, with fresh frozen plasma or albumin replacement." },
      { label: "Antigen-specific immunoadsorption", detail: "Columns that remove only anti-A or anti-B antibody, sparing clotting factors; equipment availability varies." },
      { label: "Paired kidney exchange instead", detail: "Swapping donors between two incompatible pairs avoids desensitisation entirely; a nephrology slug and often the first choice where a registry exists." },
      { label: "Combined ABO- and HLA-incompatible protocols", detail: "Additional desensitisation for HLA antibodies; highest complexity and risk, offered selectively." },
    ],
    duration: "Commonly 1–4 weeks of desensitisation before a 3–4 hour recipient operation",
    admission:
      "Recipients commonly stay fourteen to twenty-eight nights across desensitisation and surgery, including ICU; the stored [STAY] reflects that. Pre-operative exchanges may be done as day cases or inpatient depending on access and distance.",
    recovery:
      "Energy returns over two to three months, with a longer period of infection precautions than after compatible transplantation. Flying is usually discussed after antibody titres and creatinine have been stable for several weeks, the stent is out, infection screens are clear and a home transplant clinic experienced in ABO-incompatible follow-up has accepted the patient, often six to ten weeks after surgery.",
    risks:
      "Risks include all standard transplant risks plus antibody-mediated rejection, bleeding related to clotting-factor removal by plasma exchange, catheter-related infection, allergic reactions to plasma products, a higher rate of viral and bacterial infection from intensified immunosuppression, and the possibility that titres cannot be lowered sufficiently and the transplant is postponed or abandoned after costs have been incurred.",
    urgent: "fever, a sudden fall in urine output, pain over the graft, unusual bleeding or bruising, breathlessness or missed doses",
    drivers: [
      { label: "Baseline antibody titre", detail: "A high starting titre means more plasma-exchange sessions, more immunoglobulin and a greater chance of postponement." },
      { label: "Desensitisation method", detail: "Plasma exchange with replacement fluids versus antigen-specific immunoadsorption columns differ markedly in consumable cost." },
      { label: "Rituximab, immunoglobulin and induction agents", detail: "These biological agents are high-value lines, often billed separately and by dose." },
      { label: "Rebound after surgery", detail: "Post-operative exchanges for rising titres and early biopsies add unplanned sessions." },
      { label: "Additional HLA incompatibility", detail: "Combined protocols multiply laboratories, sessions and risk." },
      { label: "Extended stay and monitoring", detail: "Daily titres for two weeks and a longer admission add laboratory and ward charges." },
    ],
    inclusionExtra: { label: "Desensitisation sessions and transplant as written", detail: "The stated number of plasma-exchange or immunoadsorption sessions, rituximab and immunoglobulin doses, donor and recipient operations, ICU nights and daily titres during admission." },
    exclusionExtra: { label: "Extra sessions, postponement costs and lifelong medicines", detail: "Exchanges beyond the stated number, costs incurred if titres cannot be lowered, additional biologicals and immunosuppression after discharge are separate unless written." },
    records: [
      "Recipient and donor blood groups with the recipient's baseline anti-A or anti-B titre",
      "HLA typing and crossmatch results showing whether HLA incompatibility also exists",
      "Full donor evaluation and legal relationship documents",
      "Hepatitis B, CMV and other infection screening for the recipient",
    ],
    quoteQuestions: [
      "How many plasma-exchange or immunoadsorption sessions does the estimate assume, and what does each extra session cost?",
      "Are rituximab, immunoglobulin and induction agents included, and at what doses?",
      "What is charged if the titre cannot be lowered and the transplant is postponed?",
      "Was paired kidney exchange considered as an alternative?",
    ],
    related: ["Living Donor Kidney Transplantation", "Paired Kidney Exchange (Swap Transplant)", "Kidney Transplantation"],
    topics: [
      {
        id: "abo-versus-paired-exchange",
        heading: "ABO-incompatible transplant or paired exchange?",
        paragraphs: [
          "When a willing donor has the wrong blood group, two routes exist. Paired exchange swaps donors between two or more incompatible pairs so each recipient receives a compatible kidney, avoiding desensitisation and its costs and infection risk; it depends on a registry finding a match and on legal approval for unrelated donation within the swap. ABO-incompatible transplantation uses the original donor immediately but adds antibody removal, biological agents and closer monitoring.",
          "Programmes differ in what they offer. Ask which route the team recommends for your titre and why, and whether a swap registry is accessible in your situation.",
        ],
      },
      {
        id: "accommodation-and-follow-up",
        heading: "Accommodation and long-term follow-up",
        paragraphs: [
          "After the first two to four weeks, the graft usually becomes resistant to the antibodies that return — a state called accommodation — and titres are no longer routinely lowered. Long-term outcomes in experienced programmes approach those of compatible transplants, but infection risk in the first months is higher because of the extra immunosuppression.",
          "The home transplant clinic must understand ABO-incompatible follow-up: when to check titres, how to interpret a rising creatinine and which infections to screen for. A written protocol should travel with the patient.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Can the transplant be cancelled after desensitisation has started?",
        a: "Yes. If antibody titres do not fall enough or rebound, or if an infection develops, the team may postpone or abandon surgery. Costs already incurred for exchanges and biological agents are usually not refundable, so ask how this scenario is billed.",
      },
      {
        q: "Does the donor need any special treatment in an ABO-incompatible transplant?",
        a: "No. Desensitisation is directed at the recipient's antibodies. The donor undergoes the standard evaluation and laparoscopic donor nephrectomy.",
      },
    ],
    campusFocus:
      "Name a campus with an established ABO-incompatible protocol, apheresis or immunoadsorption capability, an immunology laboratory reporting titres daily, transplant nephrology and urology, and ICU; a programme that has not done these transplants regularly is a different service.",
    imageAlts: [
      "Medical infographic of ABO-incompatible transplantation showing incompatible donor and recipient blood groups, plasma exchange removing anti-blood-group antibodies from the recipient and the donor kidney implanted after the titre falls",
      "Step-by-step ABO-incompatible transplantation pathway infographic showing baseline titre and crossmatch, rituximab and plasma-exchange sessions, titre threshold check, donor and recipient operations and daily titre monitoring",
      "ABO-incompatible transplantation recovery pathway infographic showing titre and creatinine surveillance, rebound exchanges if needed, infection precautions, accommodation phase, home clinic protocol handover and travel clearance",
    ],
  },
  {
    procedure: "Urethroplasty",
    shortName: "urethroplasty",
    cluster: "Reconstructive urology",
    specialist: "reconstructive urologist",
    unit: "per operation",
    definition:
      "Urethroplasty is open reconstructive surgery for a urethral stricture — a scarred, narrowed segment of the tube that carries urine from the bladder. The scarred segment is either removed and the healthy ends rejoined, or opened and widened with a graft, usually of tissue from the inside of the cheek, to restore a durable, wide channel.",
    mechanism:
      "The urethra runs from the bladder neck through the prostate, the pelvic floor and the length of the penis. Injury from a fall astride, pelvic fracture, catheterisation or instrumentation, infection or lichen sclerosus causes scar (spongiofibrosis) that contracts and narrows the lumen. Symptoms include a weak spray, straining, dribbling, infections and retention; repeated dilatation or urethrotomy often fails because scar re-forms.",
    candidacy:
      "Urethroplasty may be considered for strictures that recur after one or two internal urethrotomies or dilatations, for long or dense strictures where endoscopic treatment is unlikely to last, for strictures after pelvic-fracture injury, for lichen sclerosus involving the urethra, and for men who want a durable repair rather than lifelong self-dilatation.",
    limits:
      "This is not VIU (visual internal urethrotomy), which is a separate endoscopic slug, and not hypospadias repair in children. The stored range is a single-stage operation band; two-stage repairs for severe disease, a later catheter contrast study after departure and treatment of a recurrent narrowing are not presumed inside it.",
    evaluation:
      "Assessment includes a retrograde urethrogram with a voiding study to map the length, location and number of strictures, uroflowmetry and post-void residual, urethroscopy, urine culture, kidney-function tests, examination of the oral cavity if a buccal graft is planned, and a review of previous urethrotomies, catheters and any pelvic injury imaging.",
    technique:
      "Under general or spinal anaesthesia, the urethra is exposed through a perineal or penile incision. For a short bulbar stricture the scarred segment is excised and the ends are spatulated and sewn together (anastomotic urethroplasty). For longer strictures the urethra is opened along the narrowing and a graft harvested from the inner cheek is sewn in to widen it (substitution urethroplasty). A catheter is left to splint the repair.",
    monitoring:
      "Monitoring covers wound and perineal swelling, catheter drainage, bleeding, pain from the cheek harvest site and infection. The catheter stays two to three weeks and is removed after a contrast study shows the repair is watertight. Flow rate and symptoms are checked at intervals for years because recurrence can be late.",
    approaches: [
      { label: "Excision and primary anastomosis", detail: "Removes a short bulbar stricture and rejoins healthy urethra. Most durable option for short segments." },
      { label: "Buccal mucosal graft (dorsal or ventral onlay)", detail: "Widens a longer stricture with a graft from the cheek. The workhorse for bulbar and many penile strictures." },
      { label: "Two-stage urethroplasty", detail: "For severe scarring or lichen sclerosus: the urethra is opened and grafted, then tubularised months later. Two operations." },
      { label: "Non-transecting techniques", detail: "Preserve the blood supply by widening without fully dividing the urethra; used in selected bulbar strictures." },
    ],
    duration: "Commonly about 2–4 hours of theatre time depending on stricture length and graft harvest",
    admission:
      "Most patients stay two to five nights; the stored [STAY] reflects that. Some centres discharge earlier with the catheter in place and review in clinic.",
    recovery:
      "Perineal soreness, a sore cheek and catheter discomfort are expected for two to three weeks. Flying is usually discussed after the catheter has been removed following a satisfactory contrast study and voiding is confirmed, often three to four weeks after surgery, unless the team arranges the catheter study at home.",
    risks:
      "Risks include bleeding, infection, wound breakdown, urine leak or fistula, recurrent stricture (more likely with longer strictures and lichen sclerosus), altered sensation or chordee (penile curvature) after penile repairs, post-void dribbling, changes in ejaculation, erectile difficulty in a small proportion after bulbar surgery, and numbness or tightness at the cheek graft site.",
    urgent: "fever with chills, heavy bleeding, a catheter that stops draining, severe perineal swelling or inability to pass urine after catheter removal",
    drivers: [
      { label: "Stricture length and location", detail: "A short bulbar stricture suits a quick anastomotic repair; long penile or pan-urethral disease needs grafts and more time." },
      { label: "Single versus two-stage repair", detail: "Severe scarring or lichen sclerosus may need two operations months apart, each a separate invoice." },
      { label: "Graft harvest", detail: "Buccal mucosa harvest adds operative time and oral aftercare; some repairs use skin flaps instead." },
      { label: "Previous failed treatment", detail: "Multiple prior urethrotomies or repairs create dense scar and lengthen dissection." },
      { label: "Pelvic-fracture urethral injury", detail: "Posterior strictures after trauma are more complex and may need bone or crural manoeuvres." },
      { label: "Catheter study and follow-up", detail: "The contrast study before catheter removal and years of flow checks are often separate lines." },
    ],
    inclusionExtra: { label: "Urethral reconstruction and graft harvest", detail: "The stated anastomotic or graft urethroplasty, buccal graft harvest, catheter and the pre-removal contrast study when itemized." },
    exclusionExtra: { label: "Second stages and recurrence treatment", detail: "A planned second-stage tubularisation, a catheter study after departure and treatment of a recurrent stricture are separate unless written." },
    records: [
      "Retrograde urethrogram and voiding study images showing stricture length and location",
      "Uroflowmetry and post-void residual results",
      "Previous urethrotomy, dilatation or urethroplasty operative notes",
      "Pelvic-fracture or injury records and any lichen sclerosus biopsy",
    ],
    quoteQuestions: [
      "Is an anastomotic or graft repair planned, and is it single- or two-stage?",
      "Where will the catheter contrast study be done, and is it included?",
      "What is your own recurrence experience for strictures like mine, and how is a recurrence treated?",
    ],
    related: ["VIU (Visual Internal Urethrotomy)", "Urinary Tract Reconstruction", "Hypospadias Repair"],
    topics: [
      {
        id: "urethroplasty-versus-urethrotomy",
        heading: "Urethroplasty versus repeated urethrotomy",
        paragraphs: [
          "Internal urethrotomy cuts the scar from inside and is quick and low-risk, but scar tends to re-form, and each repeat makes the stricture longer and denser. For a first short bulbar stricture an urethrotomy is reasonable; after it fails, most reconstructive urologists advise urethroplasty rather than a second or third cut, because durability falls sharply with repetition.",
          "Some men choose regular self-dilatation to keep a stricture open without surgery. It is an option, not a cure, and should be an informed choice weighed against a definitive repair.",
        ],
      },
      {
        id: "buccal-graft",
        heading: "Why the inside of the cheek is used as a graft",
        paragraphs: [
          "Buccal mucosa is hairless, accustomed to a wet environment, tough, easy to harvest and heals quickly; it has become the standard substitution tissue for the urethra. The harvest site inside the cheek is left open or closed with dissolving stitches and is sore for a couple of weeks, with soft diet and mouthwash advised.",
          "Long strictures may need grafts from both cheeks or the lower lip. Persistent numbness or tightness at the harvest site is uncommon but should be part of the consent discussion.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "How durable is urethroplasty?",
        a: "Anastomotic repairs of short bulbar strictures are the most durable; graft repairs of longer strictures recur more often, and lichen sclerosus recurs most. Late recurrence is possible, so flow checks continue for years. No repair is guaranteed permanent.",
      },
      {
        q: "Will urethroplasty affect erections or ejaculation?",
        a: "Most men notice no change. A small proportion report temporary or lasting erectile changes after bulbar surgery, and some notice post-void dribbling or altered ejaculation. Penile repairs can occasionally cause curvature. Discuss these before consent.",
      },
    ],
    campusFocus:
      "Name a campus with a reconstructive urologist who performs urethroplasty regularly, fluoroscopy for urethrography and a plan for the catheter study; a general urology list offering only urethrotomy is a different service.",
    imageAlts: [
      "Medical infographic of urethroplasty anatomy showing the male urethra from bladder to tip with a scarred narrowed bulbar segment, and the repair options of excising the segment or widening it with a buccal mucosal graft",
      "Step-by-step urethroplasty pathway infographic showing retrograde urethrogram and flow test, perineal exposure of the urethra, excision or graft placement, buccal graft harvest and catheter splinting",
      "Urethroplasty recovery pathway infographic showing perineal and cheek care, catheter for two to three weeks, contrast study before removal, voiding check and long-term flow surveillance",
    ],
  },
  {
    procedure: "VIU (Visual Internal Urethrotomy)",
    shortName: "VIU",
    cluster: "Reconstructive urology",
    specialist: "urologist",
    unit: "per procedure",
    definition:
      "VIU (visual internal urethrotomy) is an endoscopic procedure for a short urethral stricture: a urethrotome is passed along the urethra under direct vision and the scar is cut with a cold knife or laser at one or more points to reopen the channel, after which a catheter is left briefly while the cut heals.",
    mechanism:
      "A urethral stricture is a ring or segment of scar tissue within the spongy tissue around the urethra that contracts and narrows the lumen. Cutting through the scar releases the constriction and allows the urethra to expand; the intention is that the cut heals open with fresh lining. Scar often re-forms, which is why the procedure works best for short, first-time strictures with little surrounding fibrosis.",
    candidacy:
      "VIU may be considered for a first, short (commonly under about one and a half centimetres) bulbar stricture with limited scar depth, for patients unfit for or not wanting open reconstruction, for a stricture causing retention that needs rapid relief, and occasionally for a short recurrence after urethroplasty.",
    limits:
      "This is not urethroplasty, which is the durable open repair and a separate slug. The stored range is a single-procedure band; repeat urethrotomies, a self-dilatation programme, catheter care after departure and eventual urethroplasty when the stricture recurs are not presumed inside it.",
    evaluation:
      "Assessment includes a retrograde urethrogram or urethroscopy to confirm the stricture is short and single, uroflowmetry and post-void residual, urine culture, kidney-function tests and a review of previous urethrotomies or dilatations, because prior failed treatment strongly favours urethroplasty instead.",
    technique:
      "Under spinal or general anaesthesia, a guidewire or ureteric catheter is passed through the narrowing under vision. The urethrotome blade or laser fibre incises the scar, typically at the twelve o'clock position and sometimes at additional points, until a standard cystoscope passes easily. The bladder is inspected and a catheter is placed.",
    monitoring:
      "Monitoring covers bleeding, voiding and infection. The catheter is usually removed after one to five days, and the flow rate is checked at intervals. Some urologists teach clean intermittent self-dilatation for weeks to months to reduce early recurrence, which patients should understand before choosing this route.",
    approaches: [
      { label: "Cold-knife urethrotomy", detail: "The standard technique with a sharp blade. Quick, inexpensive and widely available." },
      { label: "Laser urethrotomy", detail: "Holmium or thulium laser incision; tissue effects differ, and platform charges are higher. Outcomes are broadly similar." },
      { label: "Urethrotomy with adjuncts", detail: "Injection of anti-scarring agents or drug-coated balloon dilatation at the time of cutting; evidence and availability vary." },
      { label: "Urethral dilatation", detail: "Stretching the stricture with graded dilators rather than cutting; similar durability for short strictures." },
    ],
    duration: "Commonly about 15–30 minutes of theatre time",
    admission:
      "Most patients go home the same day or after one night; the stored [STAY] reflects that. The catheter may stay a few days and be removed in clinic.",
    recovery:
      "Mild burning and blood-tinged urine settle within a few days. Flying is usually discussed once the catheter is out, voiding is confirmed and there is no fever or heavy bleeding, often within a week of the procedure.",
    risks:
      "Risks include bleeding, infection, extravasation of irrigation fluid into the perineum, a false passage, urethral pain, erectile changes (uncommon), incontinence when the cut extends near the sphincter (rare), and — the most common problem — recurrence of the stricture, which becomes more likely with each repeat urethrotomy.",
    urgent: "fever with chills, heavy bleeding or clots, inability to pass urine after the catheter is removed, or severe perineal or scrotal swelling",
    drivers: [
      { label: "Stricture length and prior treatment", detail: "A first short stricture is the ideal case; longer or previously treated strictures raise recurrence and may make VIU a poor choice." },
      { label: "Cold knife versus laser", detail: "Laser platforms add equipment charges without clear durability advantage for most short strictures." },
      { label: "Adjuncts and self-dilatation programme", detail: "Anti-scarring injections, drug-coated balloons or dilator kits are separate lines." },
      { label: "Catheter duration", detail: "A catheter removed in clinic days later may add a visit or a delayed departure." },
      { label: "Retention and infection", detail: "Emergency presentation with an infected, obstructed bladder changes the sequence and stay." },
      { label: "Conversion to urethroplasty", detail: "If the stricture proves long or dense, the team may recommend open repair instead, a different invoice." },
    ],
    inclusionExtra: { label: "Urethrotomy, catheter and early review", detail: "The stated cold-knife or laser urethrotomy, cystoscopy, catheter and the first voiding check when itemized." },
    exclusionExtra: { label: "Repeat urethrotomy, dilators and urethroplasty", detail: "Further urethrotomies, a self-dilatation kit, catheter care after departure and eventual open reconstruction are separate unless written." },
    records: [
      "Retrograde urethrogram or urethroscopy report showing stricture length and site",
      "Uroflowmetry and post-void residual results",
      "Previous urethrotomy, dilatation or catheter-trauma history",
      "Urine culture and any history of urinary retention",
    ],
    quoteQuestions: [
      "Is my stricture short enough for VIU to be a reasonable first choice, and what is the recurrence risk in your experience?",
      "Will I be taught self-dilatation, and is a dilator kit included?",
      "If this recurs, do you offer urethroplasty, and how is that quoted?",
    ],
    related: ["Urethroplasty", "TURP (Transurethral Resection of the Prostate)", "Urinary Tract Reconstruction"],
    topics: [
      {
        id: "viu-recurrence",
        heading: "Why urethrotomy often needs to be repeated — and why repeating it is discouraged",
        paragraphs: [
          "Cutting scar exposes raw tissue that heals by forming more scar. For a short first-time stricture, a single urethrotomy may hold for years; for longer strictures or after a previous cut, recurrence within months is common. Each repeat lengthens the scar and reduces the chance that any later repair will succeed.",
          "Most reconstructive urologists therefore treat urethrotomy as a one-time, or at most two-time, option and move to urethroplasty when it fails. Patients travelling for treatment should understand this before choosing the cheaper, quicker procedure.",
        ],
      },
      {
        id: "self-dilatation",
        heading: "Clean intermittent self-dilatation after VIU",
        paragraphs: [
          "Some urologists ask patients to pass a lubricated catheter or dilator themselves at regular intervals for several months to keep the healed channel open. It can reduce early recurrence but requires teaching, supplies and commitment, and it carries small risks of infection and trauma.",
          "Ask whether your team recommends it, how long for and where supplies will come from after you return home.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is VIU a permanent cure for a urethral stricture?",
        a: "Often not. It relieves the narrowing, and for a short first stricture may last years, but recurrence is common. Urethroplasty is the more durable option when strictures recur.",
      },
      {
        q: "How soon can I travel after VIU?",
        a: "Usually within days once the catheter is out and voiding is confirmed. A catheter removed in clinic a few days later, or a self-dilatation plan, should be settled before the return flight is fixed.",
      },
    ],
    campusFocus:
      "Name a campus with cystoscopic urethrotomy and access to a reconstructive urologist for urethroplasty if the stricture proves unsuitable or recurs.",
    imageAlts: [
      "Medical infographic of VIU anatomy showing the male urethra with a short ring of scar tissue narrowing the bulbar segment and an endoscopic urethrotome blade positioned to incise the scar under vision",
      "Step-by-step VIU pathway infographic showing urethrogram and flow test, urine culture, guidewire passage through the stricture, cold-knife or laser incision of the scar, cystoscope passage and catheter placement",
      "VIU recovery pathway infographic showing catheter removal within days, voiding check, optional self-dilatation teaching, flow-rate surveillance and the plan for urethroplasty if the stricture recurs",
    ],
  },
  {
    procedure: "Urinary Tract Reconstruction",
    shortName: "urinary tract reconstruction",
    cluster: "Reconstructive urology",
    specialist: "reconstructive urologist",
    unit: "per operation",
    definition:
      "Urinary tract reconstruction covers open, laparoscopic or robotic operations that repair damaged or obstructed ureters and related structures — ureteric strictures, injuries after surgery or radiation, fistulas between the urinary tract and vagina or bowel, and retroperitoneal fibrosis — by re-joining, re-implanting, replacing or bypassing the affected segment so urine drains freely from kidney to bladder.",
    mechanism:
      "The ureters are thin tubes with a delicate blood supply, easily injured during pelvic or abdominal surgery, damaged by radiation, stones or instrumentation, or compressed by scar tissue. A narrowed or leaking ureter causes flank pain, infection, urine leakage and silent loss of kidney function. Reconstruction restores a wide, well-vascularised channel using the patient's own tissue.",
    candidacy:
      "Urinary tract reconstruction may be considered for ureteric strictures that fail or are unsuitable for stenting or balloon dilatation, ureteric injury recognised after pelvic surgery, vesicovaginal or ureterovaginal fistula, radiation-induced ureteric damage with preserved kidney function, and retroperitoneal fibrosis or ureteric obstruction after failed endoscopic treatment.",
    limits:
      "This is not pyeloplasty, urethroplasty, bladder reconstruction or urinary diversion, which are separate slugs. The stored range is a single-operation band; a preliminary nephrostomy or stent placed elsewhere, staged procedures, stent removal after departure and treatment of recurrent narrowing are not presumed inside it.",
    evaluation:
      "Assessment includes CT or MR urography and often a retrograde or antegrade pyelogram to define the length and site of the stricture or leak, a nuclear renal scan to confirm the kidney is worth saving, cystoscopy and vaginal examination for fistula, kidney-function tests, urine culture, and a review of previous operations and radiation, which determine which tissue is available for repair.",
    technique:
      "Under general anaesthesia, open, laparoscopic or robotic, the damaged segment is exposed and the approach depends on its location. Lower ureteric strictures are commonly re-implanted into the bladder, with a psoas hitch or Boari flap of bladder to bridge a gap. Mid-ureteric defects are excised and rejoined (ureteroureterostomy). Long defects may need a bowel segment (ileal ureter), a buccal graft onlay or, rarely, autotransplantation. Fistulas are separated, closed in layers and interposed with tissue. A stent and drain are left.",
    monitoring:
      "Monitoring covers drain output for urine leak, fever, bowel recovery when bowel is used, kidney function and stent position. The catheter and drain come out within days, the stent at four to eight weeks, and imaging months later confirms drainage without narrowing.",
    approaches: [
      { label: "Ureteric re-implantation with psoas hitch or Boari flap", detail: "For lower-ureteric strictures or injuries: the bladder is mobilised or a flap created to reach healthy ureter." },
      { label: "Ureteroureterostomy", detail: "Excision of a short mid-ureteric segment and end-to-end repair over a stent." },
      { label: "Ileal ureter or buccal graft ureteroplasty", detail: "For long defects: a bowel segment replaces the ureter, or a cheek graft widens a long stricture, increasingly done robotically." },
      { label: "Fistula repair (vesicovaginal or ureterovaginal)", detail: "Transvaginal or abdominal closure with tissue interposition; timing after injury or radiation matters." },
    ],
    duration: "Commonly about 2–5 hours of theatre time depending on the segment and technique",
    admission:
      "Most patients stay four to eight nights; the stored [STAY] reflects that. Bowel-based repairs and fistula surgery sit at the longer end.",
    recovery:
      "Incision discomfort and stent symptoms are expected for several weeks, and fistula repairs need a prolonged catheter. Flying is usually discussed after the drain is out with no leak, there is no fever and a stent-removal date or catheter study is fixed, often two to four weeks after surgery.",
    risks:
      "Risks include urine leak, bleeding, infection, injury to bowel or vessels, recurrent stricture, reflux into the kidney after re-implantation, bowel-related complications and metabolic changes when an ileal ureter is used, fistula recurrence, loss of kidney function if drainage fails, and the possibility that intra-operative findings require a different reconstruction than planned.",
    urgent: "fever with chills, drain fluid that looks like urine, worsening flank or abdominal pain, vomiting with distension, or continued leakage from the vagina after fistula repair",
    drivers: [
      { label: "Length and location of the defect", detail: "A short lower-ureteric re-implant is a different operation from a long ileal ureter or bilateral repair." },
      { label: "Open, laparoscopic or robotic approach", detail: "Robotic reconstruction is common in specialised centres and adds platform fees." },
      { label: "Prior radiation or multiple operations", detail: "Irradiated, scarred tissue limits options, raises leak risk and can require bowel or graft substitution." },
      { label: "Preliminary drainage", detail: "A nephrostomy or stent to protect the kidney before definitive repair is a separate episode." },
      { label: "Bowel use and ICU", detail: "Ileal ureter or complex fistula repair adds bowel recovery time and sometimes ICU." },
      { label: "Stents, catheter studies and imaging", detail: "Stent removal, contrast studies and follow-up renal scans are often separate lines." },
    ],
    inclusionExtra: { label: "Ureteric or fistula reconstruction, stent and drain", detail: "The stated re-implantation, ureteroureterostomy, substitution or fistula repair, the ureteric stent, catheter and drain when itemized." },
    exclusionExtra: { label: "Preliminary drainage, staged repairs and late imaging", detail: "A prior nephrostomy or stent, a second-stage procedure, stent removal after departure and follow-up nuclear scans are separate unless written." },
    records: [
      "CT or MR urogram and any retrograde or antegrade pyelogram showing the stricture, leak or fistula",
      "Nuclear renal scan with split kidney function",
      "Operative notes from the surgery or radiation that caused the injury",
      "Current nephrostomy or stent details and dates",
    ],
    quoteQuestions: [
      "Which reconstruction is planned, and what would make you change it during surgery?",
      "Will bowel or a graft be needed, and how does that change the stay and follow-up?",
      "How long will the stent stay, and who removes it?",
      "For fistula repair, how long will the catheter stay, and when is the repair tested?",
    ],
    related: ["Pyeloplasty", "Bladder Reconstruction", "Urinary Diversion"],
    topics: [
      {
        id: "timing-of-repair",
        heading: "Timing: immediate drainage, delayed repair",
        paragraphs: [
          "When a ureteric injury or fistula is recognised, the first step is usually to protect the kidney with a stent or nephrostomy and let inflammation settle. Definitive repair is often planned weeks to months later, when tissue planes have recovered and imaging has defined the defect. Radiation-related damage may need an even longer interval.",
          "International patients frequently arrive with a nephrostomy or stent already in place. Send those records and dates; the team plans the definitive reconstruction around the existing drainage and the kidney's measured function.",
        ],
      },
      {
        id: "fistula-repair",
        heading: "Vesicovaginal and ureterovaginal fistula",
        paragraphs: [
          "A fistula is an abnormal connection between the urinary tract and the vagina, most often after hysterectomy, obstructed labour or radiation, causing continuous urine leakage. Small early fistulas occasionally close with catheter drainage; most need surgery, either through the vagina or the abdomen, with healthy tissue placed between the closed layers.",
          "Success depends on healthy tissue, tension-free closure and uninterrupted catheter drainage afterwards, typically two to three weeks, and a contrast study before the catheter is removed. Radiation fistulas are the most challenging and sometimes lead to diversion instead.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Can a ureteric stricture be treated without open surgery?",
        a: "Short, recent strictures sometimes respond to balloon dilatation or endoscopic incision with a stent, and long-term stenting is an option for patients unfit for surgery. Durable relief for longer or recurrent strictures usually requires reconstruction.",
      },
      {
        q: "Will my kidney recover after reconstruction?",
        a: "Reconstruction aims to protect the function that remains and relieve obstruction. Function already lost may not return, which is why a nuclear scan is done first; a kidney with very poor function may be better removed than reconstructed.",
      },
    ],
    campusFocus:
      "Name a campus with reconstructive urology experienced in ureteric and fistula repair, laparoscopic or robotic platforms, interventional radiology for nephrostomy and nuclear medicine for renal scans.",
    imageAlts: [
      "Medical infographic of urinary tract reconstruction anatomy showing both kidneys, ureters and bladder with a narrowed lower ureteric segment and the repair options of re-implantation with a bladder flap, end-to-end repair and a bowel substitute",
      "Step-by-step urinary tract reconstruction pathway infographic showing CT urogram and nuclear scan, preliminary stent or nephrostomy, exposure of the damaged segment, excision and re-implantation or substitution over a stent, and drain placement",
      "Urinary tract reconstruction recovery pathway infographic showing drain and catheter removal, urine-leak and fever monitoring, stent removal at four to eight weeks, follow-up imaging and travel clearance",
    ],
  },
  {
    procedure: "Hypospadias Repair",
    shortName: "hypospadias repair",
    cluster: "Pediatric urology",
    specialist: "pediatric urologist",
    unit: "per operation",
    definition:
      "Hypospadias repair is reconstructive surgery, usually in infancy or early childhood, for a congenital condition in which the urethral opening sits on the underside of the penis rather than at the tip, often with downward curvature (chordee) and an incomplete foreskin. The operation creates a new urethral channel to the tip, straightens the penis and reconstructs the skin.",
    mechanism:
      "During fetal development the urethral folds normally fuse along the underside of the penis to the tip. In hypospadias fusion stops early, leaving the opening anywhere from just below the tip (distal) to the scrotum or perineum (proximal). The tissue beyond the opening is often thin and tethered, causing curvature. The further back the opening, the more tissue must be built and the more complex the repair.",
    candidacy:
      "Hypospadias repair may be considered for boys with a urethral opening away from the tip, particularly when the stream sprays or points downwards, when curvature is present, or when the appearance is expected to cause difficulty; timing is commonly between about six and eighteen months of age, though older children and adults with untreated or failed repairs are also treated.",
    limits:
      "This is not circumcision, which should be avoided before repair because the foreskin is often needed, and not adult urethroplasty for acquired stricture, a separate slug. The stored range is a single-stage repair band; planned two-stage repairs for proximal hypospadias, fistula or stricture revision and hormonal pre-treatment are not presumed inside it.",
    evaluation:
      "Assessment includes examination of the opening's position, the degree of curvature, the quality of the urethral plate and foreskin, the position of the testes, kidney ultrasound in proximal or syndromic cases, a paediatric anaesthesia review and sometimes hormonal or genetic testing when hypospadias is severe or associated with undescended testes.",
    technique:
      "Under general anaesthesia with a caudal or penile block, the penis is degloved and straightened if curved. For distal hypospadias the urethral plate is tubularised (TIP or Snodgrass repair) over a small stent, often with a dartos flap for cover. For proximal forms a longer channel is built from foreskin or buccal graft, sometimes in two stages months apart. The glans is reconstructed and skin closed, and a dressing and stent or catheter are placed.",
    monitoring:
      "Monitoring covers pain control, bleeding, dressing integrity and stent or catheter drainage into a double nappy or bag. The dressing and stent are usually removed after five to ten days. Parents watch for fistula (a second stream), spraying or difficulty voiding as healing completes over weeks.",
    approaches: [
      { label: "Tubularised incised plate (TIP / Snodgrass)", detail: "The most common distal repair: the urethral plate is incised, tubularised and covered with a flap." },
      { label: "Onlay or tubularised preputial flap", detail: "Foreskin tissue on its blood supply builds a longer channel for mid or proximal hypospadias." },
      { label: "Two-stage repair with graft", detail: "For proximal cases with poor plate or severe curvature: graft placed first, tubularised six months later." },
      { label: "Redo repair", detail: "Correction of fistula, stricture or breakdown after previous surgery, often using buccal mucosa." },
    ],
    duration: "Commonly about 1–3 hours of theatre time depending on severity",
    admission:
      "Most children stay one to three nights; the stored [STAY] reflects that. Some distal repairs are day cases, while proximal or two-stage repairs stay longer.",
    recovery:
      "Swelling, bruising and irritability are expected for one to two weeks, with the dressing and stent removed at the first review. Flying is usually discussed after the stent is out, the child is voiding comfortably and the wound is healing without fistula or infection, often around ten to fourteen days after surgery.",
    risks:
      "Risks include urethrocutaneous fistula (a leak of urine through the skin), meatal stenosis or urethral stricture, wound breakdown or glans dehiscence, residual curvature, urethral diverticulum, bleeding, infection, poor cosmetic result and the need for revision surgery, more likely with proximal hypospadias and redo repairs.",
    urgent: "the child not passing urine for many hours, heavy bleeding through the dressing, fever, a dressing or stent that has slipped, or severe swelling",
    drivers: [
      { label: "Severity and position of the opening", detail: "Distal repairs are quicker and single-stage; proximal repairs need flaps or grafts and often two operations." },
      { label: "Single versus two-stage repair", detail: "Two operations six months apart mean two admissions, two trips and two invoices." },
      { label: "Curvature and plate quality", detail: "Severe chordee or a poor urethral plate lengthens surgery and may change technique on the table." },
      { label: "Redo surgery", detail: "Scarred tissue after failed repair needs buccal grafts and more time." },
      { label: "Paediatric anaesthesia and ward", detail: "Children's anaesthesia, nerve blocks and parental accommodation change the episode." },
      { label: "Hormonal pre-treatment and imaging", detail: "Testosterone before surgery in selected cases and kidney ultrasound add lines." },
    ],
    inclusionExtra: { label: "Hypospadias reconstruction, stent and dressing", detail: "The stated single-stage repair, urethral stent or catheter, dressing, paediatric anaesthesia and the first dressing-removal review when itemized." },
    exclusionExtra: { label: "Second stages and revisions", detail: "A planned second stage, fistula or stricture revision, hormonal pre-treatment and follow-up after departure are separate unless written." },
    records: [
      "Paediatric urology examination notes describing the opening position, curvature and foreskin",
      "Photographs where the family is comfortable providing them, or a recent clinic description",
      "Kidney ultrasound and any hormonal or genetic testing",
      "Previous hypospadias surgery notes if this is a redo repair",
    ],
    quoteQuestions: [
      "Is this a single-stage or two-stage repair, and why for my child's anatomy?",
      "How long will the stent stay, and where is the dressing removed?",
      "What is your own fistula and revision experience for repairs like this?",
      "Is parental accommodation on the ward included?",
    ],
    related: ["Pediatric Urological Surgery", "Urethroplasty", "Varicocele Surgery"],
    topics: [
      {
        id: "timing-and-circumcision",
        heading: "Timing of repair and why circumcision should wait",
        paragraphs: [
          "Most paediatric urologists repair hypospadias between roughly six and eighteen months, when anaesthesia is safe, tissues handle well and the child is unlikely to remember the operation. Later repair is entirely possible but healing and psychological considerations differ.",
          "The foreskin is frequently used as a flap or graft, so ritual or routine circumcision before repair can remove the tissue the surgeon needs. Families planning circumcision should discuss it with the urologist first; it is often performed as part of the repair.",
        ],
      },
      {
        id: "after-hypospadias-repair",
        heading: "Fistula, stricture and long-term follow-up",
        paragraphs: [
          "A urethrocutaneous fistula appears as a second stream or a drip from the underside and usually needs a small revision at least six months after the first repair. Meatal stenosis shows as a thin, forceful stream or straining. Both are more common after proximal repairs and are the main reasons follow-up continues into childhood.",
          "Toilet training, stream direction, appearance at puberty and, later, sexual function are reviewed over years. A home paediatric urologist should receive the operative note and a written follow-up plan before the family leaves India.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will my child need more than one operation?",
        a: "Distal hypospadias is usually corrected in one operation. Proximal hypospadias with severe curvature is often planned in two stages about six months apart, and a proportion of all repairs need a later revision for fistula or narrowing.",
      },
      {
        q: "Can hypospadias be repaired in adults?",
        a: "Yes, though tissues are less forgiving, complication rates are higher and buccal grafts are used more often. Adults with untreated hypospadias or failed childhood repairs are treated by reconstructive or paediatric urologists with adult experience.",
      },
    ],
    campusFocus:
      "Name a campus with a paediatric urologist who performs hypospadias repair regularly, paediatric anaesthesia, a children's ward with parental accommodation and a plan for the dressing and stent review.",
    imageAlts: [
      "Medical infographic of hypospadias anatomy showing the normal urethral opening at the tip compared with distal, mid-shaft and proximal openings on the underside of the penis with associated curvature and hooded foreskin",
      "Step-by-step hypospadias repair pathway infographic showing paediatric urology assessment, anaesthesia and nerve block, degloving and straightening, tubularising the urethral plate over a stent, glans and skin reconstruction and dressing",
      "Hypospadias repair recovery pathway infographic showing double-nappy stent drainage, dressing and stent removal at the first review, watching for fistula or narrow stream, and follow-up planning before travel",
    ],
  },
  {
    procedure: "Pediatric Urological Surgery",
    shortName: "pediatric urological surgery",
    cluster: "Pediatric urology",
    specialist: "pediatric urologist",
    unit: "per operation",
    definition:
      "Pediatric urological surgery covers operations on the kidneys, ureters, bladder and genitalia of infants, children and adolescents — such as correction of vesicoureteral reflux, surgery for an undescended testis (orchidopexy), removal of a non-functioning kidney, posterior urethral valve ablation, ureterocele or duplex-system surgery and bladder procedures for neurogenic dysfunction — performed within a children's anaesthesia and ward environment.",
    mechanism:
      "Many childhood urological problems are congenital: a valve mechanism at the ureter–bladder junction that fails and allows urine to reflux towards the kidneys, a testis that did not complete its descent into the scrotum, obstructing membranes in the urethra of newborn boys, or duplicated collecting systems. Left untreated, some cause recurrent infection, kidney scarring, fertility or hormonal consequences, or growth-related complications, while others resolve as the child grows.",
    candidacy:
      "Pediatric urological surgery may be considered when a paediatric urologist has confirmed a condition that will not resolve with growth or medicines — recurrent febrile infections with high-grade reflux, a testis still undescended after about six months of age, obstruction shown on imaging, a symptomatic ureterocele or duplex anomaly, or bladder dysfunction threatening the kidneys — and family logistics allow a planned admission.",
    limits:
      "This is a family-of-procedures sheet; hypospadias repair and pyeloplasty are separate slugs, and adult prostate or stone surgery belongs elsewhere. The stored range is a general planning band for one paediatric operation; the exact procedure, staged plans, imaging series and long-term follow-up must be written into a case-specific estimate.",
    evaluation:
      "Assessment includes a paediatric urology consultation, kidney and bladder ultrasound, a voiding cystourethrogram or nuclear cystogram where reflux is suspected, a DMSA scan for kidney scarring or a MAG3 scan for drainage, urine culture, kidney-function tests when both kidneys may be affected, and a paediatric anaesthesia review including the child's weight, feeding and any syndromic features.",
    technique:
      "Under general anaesthesia with a caudal or regional block, the operation depends on the diagnosis. Reflux may be treated by endoscopic injection of a bulking agent at the ureteric opening or by open or laparoscopic ureteric re-implantation. Orchidopexy brings the testis into the scrotum through a groin incision or laparoscopically for an intra-abdominal testis. Posterior urethral valves are incised through a small cystoscope. Non-functioning kidneys are removed laparoscopically.",
    monitoring:
      "Monitoring covers pain control, fluid intake, voiding or catheter drainage, wound checks and temperature. Many procedures are day cases or one-night stays; re-implantation and nephrectomy stay longer. Follow-up imaging months later confirms the result — resolution of reflux, testis position or improved drainage.",
    approaches: [
      { label: "Endoscopic injection for reflux", detail: "A bulking agent injected under the ureteric opening through a cystoscope. Day case; may need repeating." },
      { label: "Ureteric re-implantation", detail: "Open or laparoscopic re-routing of the ureter through a longer bladder tunnel for higher-grade reflux." },
      { label: "Orchidopexy (open or laparoscopic)", detail: "Mobilising and fixing an undescended testis in the scrotum; laparoscopy for testes inside the abdomen, sometimes staged." },
      { label: "Valve ablation and other endoscopic surgery", detail: "Cystoscopic incision of posterior urethral valves or ureterocele puncture in infants." },
    ],
    duration: "Commonly about 30 minutes to 3 hours of theatre time depending on the operation",
    admission:
      "Most children stay one to four nights; the stored [STAY] reflects that. Endoscopic procedures and orchidopexy are often day cases; re-implantation and nephrectomy stay longer.",
    recovery:
      "Discomfort and irritability settle over days to a week for endoscopic and groin procedures and over two to three weeks for open bladder or kidney surgery. Flying is usually discussed after the child is eating, voiding and pain-controlled, any catheter is out and the wound review is satisfactory, often one to two weeks after surgery.",
    risks:
      "Risks depend on the operation and include bleeding, infection, wound problems, anaesthetic reactions, persistent or recurrent reflux, ureteric obstruction after re-implantation, testicular atrophy or retraction after orchidopexy, urine leak, injury to nearby structures and the need for a second procedure; long-term kidney function and fertility depend on the underlying condition as much as the surgery.",
    urgent: "fever, the child not passing urine for many hours, vomiting with a distended abdomen, a swollen discoloured scrotum, heavy bleeding or inconsolable pain",
    drivers: [
      { label: "Which operation is planned", detail: "An endoscopic injection, an orchidopexy and an open re-implantation are different episodes under one family name." },
      { label: "Open, laparoscopic or endoscopic approach", detail: "Laparoscopic orchidopexy or nephrectomy adds equipment but shortens recovery for some children." },
      { label: "Staged or bilateral surgery", detail: "Two-stage orchidopexy or bilateral re-implantation means more theatre time or two admissions." },
      { label: "Child's age, weight and comorbidity", detail: "Infants and children with syndromes or kidney impairment need more intensive anaesthesia and monitoring." },
      { label: "Imaging series", detail: "Nuclear scans, cystograms and ultrasound before and after surgery are often separate lines." },
      { label: "Parental accommodation and follow-up", detail: "Ward accommodation for a parent, interpreters and follow-up visits vary across campuses." },
    ],
    inclusionExtra: { label: "The named paediatric operation and anaesthesia", detail: "The stated procedure, paediatric anaesthesia and nerve block, ward nights, catheter or stent when used and the first follow-up review when itemized." },
    exclusionExtra: { label: "Staged procedures, imaging series and long-term follow-up", detail: "A second stage, repeat endoscopic injection, nuclear scans and cystograms after departure and years of paediatric follow-up are separate unless written." },
    records: [
      "Paediatric urology consultation notes with the working diagnosis",
      "Kidney and bladder ultrasound, cystogram and nuclear scan reports",
      "Growth, feeding and developmental history with any syndromic diagnosis",
      "Previous urological surgery notes and infection history",
    ],
    quoteQuestions: [
      "Exactly which operation is being quoted, and is it single-stage or staged?",
      "Is a parent's accommodation on the ward included?",
      "Which follow-up imaging is needed, and where will it be done?",
      "What is the plan if intra-operative findings differ from the imaging?",
    ],
    related: ["Hypospadias Repair", "Pyeloplasty", "Urinary Tract Reconstruction"],
    topics: [
      {
        id: "reflux-in-children",
        heading: "Vesicoureteral reflux: when children need surgery",
        paragraphs: [
          "Reflux is graded from one to five on a cystogram. Low grades often resolve as the child grows and are managed with observation, hygiene, treatment of constipation and sometimes low-dose antibiotic prophylaxis. Surgery is considered for high-grade reflux with breakthrough febrile infections, new kidney scarring on DMSA or reflux persisting into later childhood.",
          "Endoscopic injection is quick and day-case but may need repeating; ureteric re-implantation is more durable but is a larger operation with a longer stay. The paediatric urologist explains which suits the grade and the child.",
        ],
      },
      {
        id: "undescended-testis",
        heading: "Undescended testis and the case for early orchidopexy",
        paragraphs: [
          "A testis that has not reached the scrotum by about six months of age is unlikely to descend on its own. Orchidopexy is commonly advised between six and eighteen months to support future fertility and hormone function and to allow the testis to be examined easily in later life. Testes located inside the abdomen are found and brought down laparoscopically, sometimes in two stages.",
          "Families travelling for this should plan the child's age, the possibility of a staged operation and a follow-up examination at home to confirm the testis has stayed in position.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will my child need general anaesthesia?",
        a: "Yes. Almost all paediatric urological surgery is performed under general anaesthesia by a paediatric anaesthetist, often with a caudal or regional block for pain relief afterwards. The pre-operative review checks the child's weight, feeding and any medical conditions.",
      },
      {
        q: "Can a parent stay with the child in hospital?",
        a: "Most children's wards in India accommodate one parent at the bedside; some charge for this. Confirm the arrangement, meals and interpreter support in writing before travel.",
      },
    ],
    campusFocus:
      "Name a campus with a dedicated paediatric urologist, paediatric anaesthesia and intensive care, a children's ward with parental accommodation and paediatric nuclear-medicine imaging.",
    imageAlts: [
      "Medical infographic of paediatric urology anatomy showing a child's kidneys, ureters and bladder with vesicoureteral reflux on one side, an undescended testis in the groin and the normal scrotal position",
      "Step-by-step paediatric urological surgery pathway infographic showing paediatric urology consultation, ultrasound and cystogram, paediatric anaesthesia, the named operation such as reflux injection or orchidopexy, and ward recovery with a parent",
      "Paediatric urological surgery recovery pathway infographic showing pain control and feeding, catheter or wound check, fever warning signs, follow-up imaging months later and travel clearance",
    ],
  },
  {
    procedure: "Penile Implant",
    shortName: "penile implant surgery",
    cluster: "Andrology",
    specialist: "andrologist or prosthetic urologist",
    unit: "per operation",
    definition:
      "Penile implant surgery places a prosthesis inside the two erectile cylinders of the penis to allow a rigid erection on demand for men with erectile dysfunction that has not responded to medicines, injections or vacuum devices. Inflatable devices use a pump in the scrotum and a fluid reservoir; malleable (semi-rigid) devices are bent into position by hand.",
    mechanism:
      "An erection normally results from blood filling the paired corpora cavernosa and being trapped there by venous compression. Diabetes, vascular disease, nerve injury after prostate or pelvic surgery, Peyronie's disease and some medicines impair this mechanism. An implant replaces the failed hydraulic tissue with a device, so the ability to achieve rigidity no longer depends on blood flow or nerve signals; sensation, orgasm and ejaculation are generally unchanged.",
    candidacy:
      "Penile implant surgery may be considered for men with organic erectile dysfunction who have tried and failed or cannot tolerate oral medicines, intracavernosal injections and vacuum devices, for erectile dysfunction after radical prostatectomy or pelvic surgery that has not recovered, for Peyronie's disease with severe curvature and poor rigidity, and for selected cases of priapism-related fibrosis.",
    limits:
      "This is not treatment for premature ejaculation, low libido or hormonal deficiency, and not Peyronie's plaque surgery without an implant. The stored range is a single-operation band; the device model materially changes price, and revision or replacement for infection or mechanical failure is a separate operation.",
    evaluation:
      "Assessment includes a detailed sexual and medical history, examination of the penis and scrotum for curvature, plaques or fibrosis, glucose control (HbA1c) because infection risk rises with poor control, urine culture, screening for skin infection, sometimes a penile Doppler ultrasound, and a discussion with the partner where possible about expectations, device type and permanence.",
    technique:
      "Under general or spinal anaesthesia with strict infection precautions, a small incision is made at the base of the penis or in the scrotum. Each corpus cavernosum is opened and dilated, measured and fitted with a cylinder. For a three-piece inflatable device the pump is placed in the scrotum and the fluid reservoir behind the pubic bone or in the abdomen; components are connected and tested. The incision is closed and a light dressing and often a catheter placed overnight.",
    monitoring:
      "Monitoring covers pain, swelling, bleeding, wound and signs of infection, with the catheter removed the next morning. The device is left deflated for several weeks; the surgeon teaches inflation and deflation at a review at about four to six weeks, after which sexual activity can resume when comfortable.",
    approaches: [
      { label: "Three-piece inflatable implant", detail: "Cylinders, scrotal pump and separate reservoir. Most natural flaccid and erect states; highest device cost and mechanical complexity." },
      { label: "Two-piece inflatable implant", detail: "Pump and reservoir combined in the scrotum. Avoids abdominal reservoir placement, with somewhat less rigidity and flaccidity range." },
      { label: "Malleable (semi-rigid) implant", detail: "Bendable rods with no mechanical parts. Simplest, lowest cost and useful for men with limited hand dexterity; the penis remains semi-firm." },
      { label: "Implant with Peyronie's correction", detail: "Modelling, plaque incision or grafting at the time of implantation for significant curvature; adds time and risk." },
    ],
    duration: "Commonly about 1–2 hours of theatre time",
    admission:
      "Most patients stay one to three nights; the stored [STAY] reflects that. Some centres perform the operation as a day case with next-morning catheter removal.",
    recovery:
      "Swelling and bruising of the penis and scrotum are expected for one to three weeks, with the device kept deflated. Flying is usually discussed once the wound is dry, pain is controlled and there is no sign of infection, often one to two weeks after surgery, with device activation taught at the first review or by a home urologist.",
    risks:
      "Risks include infection (the most serious, usually requiring removal of the device and later re-implantation), bleeding and haematoma, erosion of a component through the skin or urethra, mechanical failure over years needing revision, a perceived shortening of the penis, altered sensation, pump or reservoir malposition, autoinflation, and dissatisfaction if expectations were not aligned; the implant is irreversible in that natural erections do not return after removal.",
    urgent: "fever, increasing pain or redness of the penis or scrotum, discharge from the wound, a component visible or felt through the skin, or inability to pass urine",
    drivers: [
      { label: "Device type and manufacturer", detail: "A three-piece inflatable implant with an antibiotic or hydrophilic coating costs substantially more than a malleable device." },
      { label: "Peyronie's disease or fibrosis", detail: "Curvature correction or dilating scarred tissue after priapism or infection adds time, instruments and risk." },
      { label: "Diabetes control and infection prevention", detail: "Poor glycaemic control may delay surgery; antibiotic protocols and coated devices add lines." },
      { label: "Revision versus primary surgery", detail: "Replacing an infected or failed implant is longer and riskier than a first implant." },
      { label: "Anaesthesia and stay", detail: "Day-case versus overnight admission and regional versus general anaesthesia change facility charges." },
      { label: "Follow-up teaching", detail: "Device-activation visits and any partner counselling are itemized differently across centres." },
    ],
    inclusionExtra: { label: "The named prosthesis and implantation", detail: "The stated device manufacturer, model and coating, implantation, catheter, dressings and the activation-teaching review when itemized." },
    exclusionExtra: { label: "Revision, replacement and Peyronie's surgery", detail: "Removal or exchange for infection or mechanical failure, plaque surgery beyond modelling and warranty administration are separate unless written." },
    records: [
      "Andrology or urology notes describing erectile dysfunction, prior treatments tried and response",
      "HbA1c and glucose records, cardiovascular history and medicines",
      "Prostate or pelvic surgery, radiation or Peyronie's disease history",
      "Penile Doppler ultrasound or previous implant records where available",
    ],
    quoteQuestions: [
      "Exactly which device manufacturer, model and coating are quoted, and is a malleable alternative priced?",
      "What is your infection-prevention protocol, and what happens if the device becomes infected?",
      "Is the activation-teaching visit included, and can it be done by a urologist at home?",
      "Does the manufacturer's warranty apply in my country?",
    ],
    related: ["Varicocele Surgery", "Radical Prostatectomy", "Urethroplasty"],
    topics: [
      {
        id: "choosing-a-device",
        heading: "Inflatable or malleable: choosing a device",
        paragraphs: [
          "Three-piece inflatable devices give the most natural appearance when deflated and the firmest erection when inflated, at the highest cost and with a scrotal pump to operate. Malleable rods are simple, reliable and cheaper, suit men with limited hand function, but keep the penis semi-firm at all times, which some find inconvenient. Two-piece devices sit between.",
          "Body habitus, previous abdominal surgery, dexterity, partner preference and budget all matter. A quotation must name the device; a 'penile implant' price without a model is not comparable.",
        ],
      },
      {
        id: "implant-infection",
        heading: "Infection: the risk that shapes the whole pathway",
        paragraphs: [
          "Because the implant is a foreign body, infection usually means removing it, treating with antibiotics and re-implanting months later, often into a scarred and shortened penis. Surgeons therefore insist on good glucose control, treating any skin or urinary infection first, antibiotic-coated devices, meticulous skin preparation and 'no-touch' techniques.",
          "Ask about the surgeon's own protocol and their infection experience, and what the estimate covers if removal is needed. Fever or increasing pain in the weeks after surgery must be reviewed urgently, at home if you have already travelled.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will a penile implant change sensation or orgasm?",
        a: "Usually not. Sensation, orgasm and ejaculation depend on nerves and glands that are not removed, although some men notice altered sensation at first. The implant provides rigidity; it does not restore desire or natural erections.",
      },
      {
        q: "How long does a penile implant last?",
        a: "Inflatable devices are mechanical and can fail after many years of use, when a revision operation replaces components. Malleable rods have no moving parts and rarely fail mechanically. Neither is guaranteed for life, and infection can shorten device life at any stage.",
      },
    ],
    campusFocus:
      "Name a campus with an andrologist or prosthetic urologist who implants regularly, stocks the named device, follows a written infection-prevention protocol and provides activation teaching; a general urology list that rarely implants is a different service.",
    imageAlts: [
      "Medical infographic of penile implant anatomy showing the paired erectile cylinders of the penis with inflatable cylinders inside them, a pump in the scrotum and a fluid reservoir in the lower abdomen, alongside a malleable rod alternative",
      "Step-by-step penile implant pathway infographic showing andrology assessment and glucose check, device selection, infection precautions, small penoscrotal incision, cylinder placement and pump and reservoir positioning, and wound closure",
      "Penile implant recovery pathway infographic showing overnight catheter removal, swelling and infection monitoring, device kept deflated for several weeks, activation teaching at review and travel clearance",
    ],
  },
  {
    procedure: "Varicocele Surgery",
    shortName: "varicocele surgery",
    cluster: "Andrology",
    specialist: "andrologist or urologist experienced in microsurgical varicocelectomy",
    unit: "per operation",
    definition:
      "Varicocele surgery (varicocelectomy) ties off or blocks the enlarged, poorly draining veins around the testis inside the scrotum or in the groin, most precisely with an operating microscope, to relieve aching, protect testicular growth in adolescents and, in selected men, improve semen parameters as part of fertility care.",
    mechanism:
      "The testicular veins drain upwards through the spermatic cord; on the left, the vein enters the renal vein at a right angle and its valves are prone to failure, so blood pools and the veins dilate like varicose veins. Pooled warm blood raises scrotal temperature and may expose the testis to metabolic stress, which is thought to impair sperm production in some men and slow growth of the affected testis in adolescents.",
    candidacy:
      "Varicocele surgery may be considered for a palpable varicocele with persistent aching, for an adolescent whose affected testis is smaller than the other on ultrasound, and for a man in an infertile couple with a palpable varicocele and abnormal semen analysis when the partner's fertility has been assessed and the couple has discussed the alternatives, including assisted reproduction.",
    limits:
      "This is not surgery for a hydrocele or hernia, and it is not assisted reproduction. Varicoceles found only on ultrasound (subclinical) are generally not operated. The stored range is a single-operation band for one side; bilateral repair, embolisation by interventional radiology and fertility treatment are separate.",
    evaluation:
      "Assessment includes examination standing and lying with a straining manoeuvre to grade the varicocele, scrotal ultrasound with testicular volumes and Doppler, semen analysis (usually two samples) in men seeking fertility, hormone tests where indicated, and, in adolescents, comparison of testicular volumes over time; the partner's fertility evaluation should be available when fertility is the indication.",
    technique:
      "Under general, spinal or local anaesthesia with sedation, a small incision is made in the groin below the inguinal canal (subinguinal) or in the inguinal region. The spermatic cord is lifted and, under an operating microscope, each dilated vein is identified and tied while the testicular artery, lymphatics and vas deferens are preserved. Laparoscopic ligation of the veins higher in the abdomen is an alternative. The cord is returned and the wound closed.",
    monitoring:
      "Monitoring covers pain, swelling, bruising and wound healing, usually as a day case. Semen analysis is repeated at three to six months in fertility cases because sperm take that long to develop; adolescents have testicular volumes re-measured at intervals.",
    approaches: [
      { label: "Microsurgical subinguinal varicocelectomy", detail: "Operating-microscope ligation below the canal. Lowest recurrence and hydrocele rates in most series; longer operating time." },
      { label: "Inguinal (Ivanissevich) or high retroperitoneal (Palomo) ligation", detail: "Open ligation without a microscope; simpler but higher hydrocele or recurrence rates." },
      { label: "Laparoscopic varicocelectomy", detail: "Veins clipped high in the abdomen; useful for bilateral disease, with equipment charges and a small hydrocele risk." },
      { label: "Percutaneous embolisation", detail: "Interventional radiology blocks the vein from inside via a catheter; no incision, but recurrence and contrast exposure differ. A separate service." },
    ],
    duration: "Commonly about 45–90 minutes of theatre time per side under the microscope",
    admission:
      "Most patients go home the same day or after one night; the stored [STAY] reflects that. Scrotal support and rest are advised for the first days.",
    recovery:
      "Groin discomfort and mild scrotal swelling settle within one to two weeks, with heavy lifting and sport avoided for two to four weeks. Flying is usually discussed within a few days once pain is controlled and the wound is dry; semen analysis follow-up happens months later at home.",
    risks:
      "Risks include hydrocele (fluid around the testis) from lymphatic injury, recurrence or persistence of the varicocele, injury to the testicular artery with testicular atrophy (rare, and least likely with microsurgery), bleeding, infection, wound pain or numbness, and no improvement in semen parameters or pregnancy rates despite a technically successful operation.",
    urgent: "fever, rapidly increasing scrotal swelling or discolouration, severe pain or wound discharge",
    drivers: [
      { label: "Microsurgical versus other techniques", detail: "Operating-microscope surgery takes longer and needs specialist skill but lowers hydrocele and recurrence rates." },
      { label: "One side or both", detail: "Bilateral repair roughly doubles operating time and is quoted separately." },
      { label: "Adolescent versus adult indication", detail: "Adolescents need paediatric anaesthesia and serial ultrasound volume measurements." },
      { label: "Fertility work-up", detail: "Semen analyses, hormone tests and the partner's evaluation are usually outside the surgical estimate." },
      { label: "Anaesthesia type and stay", detail: "Local with sedation as a day case costs less than general anaesthesia with an overnight stay." },
      { label: "Recurrent or redo varicocele", detail: "Surgery after failed ligation or embolisation is longer and often microsurgical." },
    ],
    inclusionExtra: { label: "Microsurgical or laparoscopic ligation as stated", detail: "The stated technique, one side unless written otherwise, anaesthesia, day-case or overnight stay and the first wound review when itemized." },
    exclusionExtra: { label: "Fertility work-up and follow-up semen analysis", detail: "Semen analyses, hormone tests, the partner's evaluation, assisted reproduction and treatment of hydrocele or recurrence are separate unless written." },
    records: [
      "Andrology or urology examination notes with varicocele grade and side",
      "Scrotal ultrasound with testicular volumes and Doppler findings",
      "Two semen analyses where fertility is the indication",
      "Partner's fertility evaluation and any previous fertility treatment",
    ],
    quoteQuestions: [
      "Is the operation microsurgical, and is an operating microscope used routinely?",
      "Is the quote for one side or both?",
      "Which follow-up semen analysis or ultrasound is recommended, and where?",
      "What are the alternatives, including embolisation and assisted reproduction, for our situation?",
    ],
    related: ["Penile Implant", "Pediatric Urological Surgery", "Hypospadias Repair"],
    topics: [
      {
        id: "varicocele-and-fertility",
        heading: "Varicocele repair and fertility: what the evidence supports",
        paragraphs: [
          "Repair is most likely to help when the varicocele is palpable, semen parameters are abnormal and the female partner has normal or correctable fertility. Semen quality often improves over six months, and some couples conceive naturally, but improvement is not guaranteed and pregnancy depends on both partners. Subclinical varicoceles and men with normal semen analysis are generally not offered surgery for fertility.",
          "Couples should discuss timing against the partner's age and the option of assisted reproduction with a fertility specialist; surgery and IVF are not mutually exclusive, and some men undergo repair to improve sperm for later assisted treatment.",
        ],
      },
      {
        id: "adolescent-varicocele",
        heading: "Varicocele in adolescents",
        paragraphs: [
          "Varicoceles often appear at puberty and most cause no harm. Surgery is considered when the affected testis is noticeably smaller than the other on ultrasound, when pain persists or when semen analysis in an older adolescent is abnormal. Many are simply observed with annual examination and ultrasound.",
          "When surgery is chosen, microsurgical or laparoscopic artery- and lymphatic-sparing techniques reduce hydrocele risk, and testicular growth is followed for years afterwards.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Will varicocele surgery guarantee a pregnancy?",
        a: "No. It may improve semen parameters in selected men, and some couples conceive afterwards, but outcomes depend on both partners and on factors surgery does not change. Discuss expectations with an andrologist and a fertility specialist before travelling.",
      },
      {
        q: "Is embolisation as good as surgery for varicocele?",
        a: "Embolisation avoids an incision and is done by interventional radiology, with quick recovery. Recurrence and technical failure rates differ from microsurgery and vary between centres. Availability, anatomy and preference decide; it is quoted separately.",
      },
    ],
    campusFocus:
      "Name a campus with an andrologist who performs microsurgical varicocelectomy with an operating microscope, andrology laboratory support for semen analysis and, where relevant, a linked fertility service.",
    imageAlts: [
      "Medical infographic of varicocele anatomy showing the testis and spermatic cord with dilated, tortuous testicular veins on the left side compared with normal veins on the right and the preserved testicular artery and vas deferens",
      "Step-by-step varicocele surgery pathway infographic showing examination and scrotal ultrasound, semen analysis, small subinguinal incision, microscope-guided ligation of dilated veins with artery and lymphatic preservation and wound closure",
      "Varicocele surgery recovery pathway infographic showing same-day discharge with scrotal support, activity restrictions for two to four weeks, hydrocele and swelling warning signs, and semen analysis or testicular volume follow-up at three to six months",
    ],
  },
];
