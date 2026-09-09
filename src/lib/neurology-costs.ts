export const NEUROLOGY_COST: Record<string, { us: string; partner: string; stay: string }> = {
  EEG: {
    us: "$400–$1,500",
    partner: "$80–$250",
    stay: "Outpatient",
  },
  "Video EEG": {
    us: "$3,000–$15,000",
    partner: "$800–$2,500",
    stay: "1–5 nights of monitoring",
  },
  "Electromyography (EMG)": {
    us: "$400–$1,500",
    partner: "$80–$280",
    stay: "Outpatient",
  },
  "Nerve Conduction Study": {
    us: "$350–$1,200",
    partner: "$70–$220",
    stay: "Outpatient",
  },
  "Evoked Potentials": {
    us: "$300–$1,200",
    partner: "$70–$220",
    stay: "Outpatient",
  },
  "Lumbar Puncture": {
    us: "$1,500–$4,000",
    partner: "$200–$600",
    stay: "Outpatient or 1 night",
  },
  "IV Thrombolysis": {
    us: "$10,000–$30,000",
    partner: "$1,500–$4,500",
    stay: "3–7 nights (stroke ICU)",
  },
  "Transcranial Doppler (TCD)": {
    us: "$400–$1,200",
    partner: "$80–$250",
    stay: "Outpatient",
  },
  "Carotid Doppler": {
    us: "$300–$900",
    partner: "$50–$180",
    stay: "Outpatient",
  },
  "MRI-Guided Focused Ultrasound (MRgFUS)": {
    us: "$40,000–$80,000",
    partner: "$12,000–$25,000",
    stay: "1–3 nights",
  },
  "Botulinum Toxin Therapy": {
    us: "$1,500–$4,000",
    partner: "$250–$800",
    stay: "Outpatient",
  },
  Plasmapheresis: {
    us: "$8,000–$25,000",
    partner: "$1,500–$4,500",
    stay: "5–10 sessions typical",
  },
  "IVIG (Intravenous Immunoglobulin)": {
    us: "$10,000–$40,000",
    partner: "$2,000–$8,000",
    stay: "2–5 infusion days",
  },
  "Nerve and Muscle Biopsy": {
    us: "$4,000–$12,000",
    partner: "$800–$2,500",
    stay: "Outpatient or 1 night",
  },
  "Vagus Nerve Stimulation (VNS)": {
    us: "$30,000–$60,000",
    partner: "$8,000–$18,000",
    stay: "1–3 nights",
  },
  "Sleep Study (Polysomnography)": {
    us: "$1,500–$5,000",
    partner: "$250–$700",
    stay: "1 night in the sleep lab",
  },
  "Migraine Nerve Block": {
    us: "$800–$2,500",
    partner: "$150–$500",
    stay: "Outpatient",
  },
};

export const NEUROLOGY_SUMMARIES: Record<string, string> = {
  EEG: "Record cortical rhythms when seizures, encephalopathy or a first unprovoked event already write an EEG list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Video EEG keeps a neighbouring Neurology slug when a captured event is the question. This is a planning range, not a quote.",
  "Video EEG":
    "Capture events on camera with continuous EEG when the history already writes inpatient monitoring, not a ten-minute outpatient tracing. EEG remains the routine slug. Vagus nerve stimulation stays a neighbouring epilepsy product.",
  "Electromyography (EMG)":
    "Needle EMG when weakness, denervation or a myopathy already write electrodiagnosis. Nerve conduction study is a neighbouring slug; EMG/NCS on a faculty list maps to this pair, not a third product.",
  "Nerve Conduction Study":
    "Surface conduction when neuropathy, entrapment or CIDP already write NCS. EMG stays the needle slug. Plasmapheresis and IVIG sit under neuromuscular therapy, not under this diagnostic sheet.",
  "Evoked Potentials":
    "Visual, auditory or somatosensory potentials when MS, optic pathway or intraoperative monitoring already write an EP list. EEG is a different diagnostic slug.",
  "Lumbar Puncture":
    "CSF when meningitis, Guillain-Barré, MS or idiopathic intracranial hypertension already write an LP. This is not a neurosurgical drain sheet.",
  "IV Thrombolysis":
    "Intravenous alteplase or tenecteplase when a clock and non-contrast CT already write lytic therapy. Mechanical thrombectomy remains the shared Stroke Thrombectomy slug with Neurosurgery.",
  "Transcranial Doppler (TCD)":
    "Bedside intracranial flow when vasospasm, sickle-cell stroke risk or intracranial stenosis already write TCD. Carotid Doppler is a neck vessel slug, not this window.",
  "Carotid Doppler":
    "Extracranial carotid duplex when TIA, bruit or pre-operative risk already write a neck Doppler. TCD remains the intracranial window.",
  "MRI-Guided Focused Ultrasound (MRgFUS)":
    "Incisionless thalamotomy when tremor already writes focused ultrasound and not a DBS implant. Deep brain stimulation remains the shared Neurosurgery slug.",
  "Botulinum Toxin Therapy":
    "Targeted toxin when cervical dystonia, hemifacial spasm, spasticity or chronic migraine already write injections. Migraine nerve block is a neighbouring headache slug, not this toxin product.",
  Plasmapheresis:
    "Plasma exchange when GBS, myasthenia crisis or antibody-mediated disease already write a course of sessions. IVIG is a neighbouring infusion slug, not the same product.",
  "IVIG (Intravenous Immunoglobulin)":
    "Immunoglobulin when CIDP, myasthenia or antibody-mediated neuropathy already write IVIG rather than plasma exchange. Plasmapheresis keeps its own sheet.",
  "Nerve and Muscle Biopsy":
    "Tissue when electrodiagnosis and MRI still leave vasculitis, myositis or an unexplained neuropathy unanswered. EMG and NCS stay diagnostic neighbours.",
  "Vagus Nerve Stimulation (VNS)":
    "Implant a vagus stimulator when drug-resistant epilepsy already writes neuromodulation and not resective epilepsy surgery. Epilepsy surgery remains on Neurosurgery. EEG and video EEG stay diagnostic neighbours.",
  "Sleep Study (Polysomnography)":
    "Overnight polysomnography when OSA, narcolepsy work-up or REM behaviour already write a sleep lab night. This is a Neurology sheet, not a pulmonology airway stent product.",
  "Migraine Nerve Block":
    "Occipital or pericranial block when chronic migraine already writes a block clinic. Botulinum toxin therapy is a neighbouring movement and headache slug.",
};

export const NEUROLOGY_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  EEG: "Neurodiagnostics",
  "Video EEG": "Neurodiagnostics",
  "Electromyography (EMG)": "Neurodiagnostics",
  "Nerve Conduction Study": "Neurodiagnostics",
  "Evoked Potentials": "Neurodiagnostics",
  "Lumbar Puncture": "Neurodiagnostics",
  "IV Thrombolysis": "Stroke & Neurovascular",
  "Stroke Thrombectomy": "Stroke & Neurovascular",
  "Transcranial Doppler (TCD)": "Stroke & Neurovascular",
  "Carotid Doppler": "Stroke & Neurovascular",
  "Deep Brain Stimulation": "Movement Disorders",
  "MRI-Guided Focused Ultrasound (MRgFUS)": "Movement Disorders",
  "Botulinum Toxin Therapy": "Movement Disorders",
  Plasmapheresis: "Neuromuscular",
  "IVIG (Intravenous Immunoglobulin)": "Neuromuscular",
  "Nerve and Muscle Biopsy": "Neuromuscular",
  "Vagus Nerve Stimulation (VNS)": "Epilepsy",
  "Sleep Study (Polysomnography)": "Sleep / Headache",
  "Migraine Nerve Block": "Sleep / Headache",
};

export const NEUROLOGY_CONDITIONS = [
  "Epilepsy and first seizure",
  "Ischaemic stroke and TIA",
  "Parkinson disease and tremor",
  "Dystonia and spasticity",
  "Guillain-Barré and CIDP",
  "Myasthenia gravis",
  "Peripheral neuropathy",
  "Multiple sclerosis",
  "Migraine",
  "Obstructive sleep apnoea work-up",
];

export const NEUROLOGY_SHARED = ["Deep Brain Stimulation", "Stroke Thrombectomy"] as const;
