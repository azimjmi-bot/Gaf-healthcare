import type { PulmonologyProfile } from "./pulmonology";

export const PULMONOLOGY_PROFILES: PulmonologyProfile[] = [
  {
    procedure: "Bronchoscopy",
    shortName: "bronchoscopy",
    cluster: "Diagnostic pulmonology",
    specialist: "pulmonologist or interventional pulmonologist",
    unit: "per procedure",
    definition:
      "Bronchoscopy is a minimally invasive airway procedure in which a thin flexible scope with a light, camera and working channel passes through the nose or mouth, larynx and trachea into the bronchi. It can inspect the airway, wash cells and microbes from a lung segment, brush or biopsy a lesion and, in therapeutic cases, remove secretions or treat an obstruction.",
    mechanism:
      "The trachea divides into right and left main bronchi, then progressively smaller airways. CT shows their shape from outside, but bronchoscopy gives a live view of the lining and lets the pulmonologist collect material from a precise segment. Saline introduced and suctioned back as bronchoalveolar lavage can identify infection, inflammation or malignant cells; forceps, brushings or needles collect tissue. A flexible scope reaches segmental bronchi, while a rigid scope creates a larger airway corridor for bleeding control and therapeutic tools.",
    candidacy:
      "Bronchoscopy may be considered for persistent or unexplained cough, coughing blood, an abnormal chest X-ray or CT, a lung nodule or mass near an airway, unexplained collapse of a lung segment, recurrent or unusual infection, suspected airway narrowing or foreign body, and for obtaining lavage, cytology or biopsy when the result would change treatment.",
    limits:
      "This sheet covers standard flexible bronchoscopy and its common diagnostic sampling. EBUS, rigid bronchoscopy, transbronchial lung biopsy, endobronchial biopsy, TBNA, tumour debulking and foreign-body removal have separate active CMS slugs. The stored range is one procedure, not all possible samples, molecular studies or later treatment.",
    evaluation:
      "Assessment typically includes the actual CT chest or HRCT images, not only the report, oxygen saturation and respiratory examination, blood count and clotting tests when biopsy is planned, medication and anticoagulant review, pulmonary function or arterial blood gas in people with limited reserve, urine or sputum microbiology where relevant and an anaesthesia review if deep sedation is anticipated.",
    technique:
      "After fasting and consent, monitoring is applied and the nose and throat are numbed with local anaesthetic. With conscious sedation or, in selected cases, general anaesthesia, the flexible bronchoscope passes through the vocal cords into the trachea. The pulmonologist maps both bronchial trees, photographs abnormalities and performs only the agreed sampling: suction, saline lavage, brushing, forceps biopsy or a needle technique. Oxygen is given and saturation, heart rhythm and blood pressure are watched throughout.",
    monitoring:
      "Recovery staff monitor breathing, oxygen level, pulse, blood pressure, alertness and any bleeding until sedation and throat numbness recede. Food and drink wait until swallowing is safe. A chest X-ray is not routine after inspection or lavage but is obtained if a peripheral biopsy was performed or chest pain, breathlessness or low oxygen raises concern for pneumothorax.",
    approaches: [
      {
        label: "Flexible diagnostic bronchoscopy",
        detail:
          "A slim scope under local anaesthetic and moderate sedation inspects segmental airways and permits washings, brushings and selected biopsies. It is usually day care.",
      },
      {
        label: "Bronchoalveolar lavage (BAL)",
        detail:
          "Sterile saline is instilled into a chosen lung segment and recovered for bacterial, fungal, tuberculosis, cytology or inflammatory studies. Laboratory panels drive cost.",
      },
      {
        label: "Endobronchial brushing or forceps biopsy",
        detail:
          "Visible mucosal or tumour tissue is sampled through the working channel. Bleeding risk and histopathology are greater than with inspection alone.",
      },
      {
        label: "Therapeutic flexible bronchoscopy",
        detail:
          "Secretions or mucus plugs are suctioned and selected minor obstructions treated. Major bleeding, central obstruction, stenting or foreign bodies usually need rigid bronchoscopy.",
      },
    ],
    duration: "Commonly about 20–60 minutes for the scope, plus preparation and monitored sedation recovery",
    admission:
      "Most uncomplicated flexible bronchoscopies are day-care procedures or require one night; the stored [STAY] reflects that. Frailty, low oxygen, substantial bleeding, pneumothorax or a therapeutic intervention can require admission.",
    recovery:
      "A numb or sore throat, hoarse voice, cough, sleepiness and small blood streaks after biopsy can occur for a day or two. A responsible adult should accompany the patient after sedation, and driving, alcohol and important decisions are avoided for the period instructed by the anaesthesia team. Flying is discussed after breathing and oxygen return to baseline and any biopsy-related pneumothorax has been excluded.",
    risks:
      "Risks include cough, throat irritation, transient low oxygen, wheeze or bronchospasm, nausea or reaction to sedatives, fever after lavage, bleeding after biopsy, infection and an inadequate or non-diagnostic sample. Pneumothorax is uncommon after airway inspection or lavage but becomes a relevant risk when a transbronchial lung biopsy is added; severe bleeding, respiratory deterioration or need for intubation is uncommon but requires immediate support.",
    urgent:
      "worsening breathlessness, chest pain, coughing more than small streaks of blood, fever with chills, confusion or blue lips",
    drivers: [
      {
        label: "Diagnostic versus therapeutic purpose",
        detail:
          "Inspection and lavage use fewer tools than mucus-plug clearance, bleeding control or treatment of an obstruction and may have different anaesthesia and admission needs.",
      },
      {
        label: "Sampling plan",
        detail:
          "BAL, brushings, forceps biopsies and needle samples each add consumables and separate cytology, microbiology or histopathology lines.",
      },
      {
        label: "Flexible versus rigid backup",
        detail:
          "A flexible day-care scope differs from a theatre procedure with rigid-bronchoscopy and anaesthesia backup for obstruction or significant bleeding.",
      },
      {
        label: "Respiratory reserve",
        detail:
          "Severe COPD, low oxygen, pulmonary hypertension or recent respiratory failure can require arterial blood gas testing, anaesthesia, high-dependency monitoring or ICU.",
      },
      {
        label: "Infection precautions and microbiology",
        detail:
          "Suspected tuberculosis or unusual infection may need isolation, special cultures, PCR or fungal studies and longer laboratory turnaround.",
      },
      {
        label: "Pathology and molecular testing",
        detail:
          "Routine cytology or histology is different from immunohistochemistry and lung-cancer biomarker panels; tissue adequacy may require another procedure.",
      },
    ],
    inclusionExtra: {
      label: "Flexible bronchoscope and agreed sampling",
      detail:
        "The stated scope, local anaesthetic, standard lavage, brushing or forceps consumables and initial specimen handling when itemized.",
    },
    exclusionExtra: {
      label: "EBUS, rigid intervention and advanced tissue studies",
      detail:
        "Ultrasound-guided nodal sampling, rigid bronchoscopy, stents, tumour ablation, molecular panels and repeat biopsy are separate unless written.",
    },
    records: [
      "Chest CT or HRCT report and complete image files showing the airway or lung target",
      "Previous bronchoscopy, lavage, cytology, histopathology and microbiology reports",
      "Current oxygen requirement, baseline saturation and recent respiratory admission records",
      "Anticoagulant or antiplatelet prescriptions and relevant allergies",
    ],
    quoteQuestions: [
      "Is this inspection only, lavage, brushing, forceps biopsy or a combination?",
      "Is moderate sedation or general anaesthesia planned?",
      "Which microbiology, cytology, histopathology and molecular studies are included?",
      "Is rigid-bronchoscopy or ICU backup available if bleeding or obstruction is encountered?",
    ],
    related: [
      "EBUS (Endobronchial Ultrasound)",
      "Rigid Bronchoscopy",
      "Endobronchial Biopsy",
    ],
    topics: [
      {
        id: "bronchoscopy-sampling",
        heading: "Inspection, lavage and biopsy answer different questions",
        paragraphs: [
          "Inspection describes the airway surface: inflammation, secretions, narrowing, bleeding or a visible lesion. Bronchoalveolar lavage samples cells and microbes from smaller airways and alveoli beyond the camera's view. Brushings scrape cells from a surface, while forceps remove a small piece of visible tissue. The CT target and suspected diagnosis determine which are useful; collecting every sample routinely adds risk and cost without necessarily improving the answer.",
          "Laboratory handling must be decided before the scope. Tuberculosis and fungal cultures need sterile microbiology containers, cytology needs cell-preserving fluid and a tumour biopsy needs formalin with enough viable tissue for immunohistochemistry and molecular testing. Ask the team to state the specimen plan and what happens if the sample is inadequate.",
        ],
      },
      {
        id: "bronchoscopy-versus-ebus-rigid",
        heading: "When EBUS or rigid bronchoscopy is a different procedure",
        paragraphs: [
          "Standard flexible bronchoscopy sees the inside of the airway but cannot see lymph nodes beyond its wall. EBUS adds an ultrasound probe and needle to sample mediastinal or hilar nodes for lung-cancer staging and other diagnoses; it therefore uses different equipment, cytology support and a separate cost sheet. A peripheral lung nodule may require navigation, radial ultrasound, transbronchial biopsy or a CT-guided route instead.",
          "Rigid bronchoscopy uses a metal tube under general anaesthesia to secure a large airway and accommodate stents, balloons, suction and tumour-debulking tools. It is chosen for major central obstruction, large foreign bodies or bleeding control—not as a more expensive version of routine inspection.",
        ],
      },
    ],
    faqExtra: [
      {
        q: "Is bronchoscopy painful?",
        a: "Local anaesthetic numbs the nose and throat, and sedation reduces awareness and discomfort. Coughing or pressure can still occur. General anaesthesia is reserved for selected interventions, children or patients who cannot tolerate moderate sedation.",
      },
      {
        q: "How long do bronchoscopy results take?",
        a: "The visual findings are discussed the same day. Cytology or routine histopathology often takes several working days; cultures for tuberculosis or fungi and molecular biomarker testing can take longer. The result-review plan should be confirmed before travel.",
      },
      {
        q: "Can bronchoscopy diagnose lung cancer?",
        a: "It can diagnose cancers visible in or reachable from an airway, provided enough representative tissue is obtained. Peripheral nodules or lymph nodes may need transbronchial biopsy, EBUS or a CT-guided route, and a non-diagnostic sample does not exclude cancer.",
      },
    ],
    campusFocus:
      "Name the campus with a dedicated bronchoscopy suite, continuous respiratory monitoring, pathology and microbiology handling, anaesthesia support and access to rigid bronchoscopy or ICU if escalation is needed.",
    imageAlts: [
      "Patient-education medical infographic showing the nose and mouth, larynx, trachea, right and left bronchi and a flexible bronchoscope passing into a segmental airway, with callouts for camera, working channel and sampling target",
      "Step-by-step bronchoscopy pathway infographic showing pulmonology and CT review, fasting and medication check, local anaesthetic and sedation, flexible scope airway inspection, lavage or biopsy sampling and monitored recovery",
      "Bronchoscopy recovery infographic showing throat and sedation precautions, oxygen and bleeding monitoring, specimen processing, warning symptoms, result review and individualized fitness-to-fly clearance",
    ],
  },
];
