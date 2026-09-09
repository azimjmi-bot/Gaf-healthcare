export const ORTHOPEDICS_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Total Knee Replacement": {
    us: "$35,000–$70,000",
    partner: "$5,500–$12,000",
    stay: "4–7 nights",
  },
  "Robotic Knee Replacement": {
    us: "$40,000–$80,000",
    partner: "$7,000–$15,000",
    stay: "4–7 nights",
  },
  "Partial Knee Replacement": {
    us: "$25,000–$50,000",
    partner: "$4,500–$10,000",
    stay: "3–5 nights",
  },
  "Revision Knee Replacement": {
    us: "$50,000–$100,000",
    partner: "$9,000–$18,000",
    stay: "5–10 nights",
  },
  "Total Hip Replacement": {
    us: "$40,000–$80,000",
    partner: "$6,000–$13,000",
    stay: "4–7 nights",
  },
  "Revision Hip Replacement": {
    us: "$55,000–$110,000",
    partner: "$10,000–$20,000",
    stay: "5–10 nights",
  },
  "Hip Resurfacing": {
    us: "$30,000–$65,000",
    partner: "$6,500–$14,000",
    stay: "4–7 nights",
  },
  "Shoulder Replacement": {
    us: "$30,000–$60,000",
    partner: "$6,000–$13,000",
    stay: "3–6 nights",
  },
  "ACL Reconstruction (Anterior Cruciate Ligament)": {
    us: "$15,000–$40,000",
    partner: "$2,500–$6,500",
    stay: "1–3 nights",
  },
  "PCL Reconstruction (Posterior Cruciate Ligament)": {
    us: "$18,000–$45,000",
    partner: "$3,000–$7,500",
    stay: "1–3 nights",
  },
  "Meniscus Repair": {
    us: "$8,000–$22,000",
    partner: "$1,800–$4,500",
    stay: "Outpatient or 1 night",
  },
  "Rotator Cuff Repair": {
    us: "$15,000–$40,000",
    partner: "$2,800–$7,000",
    stay: "1–3 nights",
  },
  "Arthroscopic Surgery": {
    us: "$10,000–$30,000",
    partner: "$2,000–$5,500",
    stay: "Outpatient or 1–2 nights",
  },
  "Fracture Fixation": {
    us: "$12,000–$40,000",
    partner: "$2,500–$8,000",
    stay: "2–6 nights",
  },
  "ORIF (Open Reduction and Internal Fixation)": {
    us: "$15,000–$45,000",
    partner: "$3,000–$9,000",
    stay: "2–6 nights",
  },
  "Non-Union Repair": {
    us: "$25,000–$70,000",
    partner: "$5,000–$14,000",
    stay: "4–8 nights",
  },
  "Carpal Tunnel Release": {
    us: "$4,000–$12,000",
    partner: "$800–$2,200",
    stay: "Outpatient",
  },
  "Tendon Repair": {
    us: "$8,000–$22,000",
    partner: "$1,500–$5,000",
    stay: "Outpatient or 1–2 nights",
  },
  "Hand Reconstruction": {
    us: "$15,000–$45,000",
    partner: "$3,500–$10,000",
    stay: "2–5 nights",
  },
  "Ankle Replacement": {
    us: "$30,000–$70,000",
    partner: "$7,000–$16,000",
    stay: "3–6 nights",
  },
  "Bunion Surgery": {
    us: "$8,000–$20,000",
    partner: "$1,500–$4,500",
    stay: "Outpatient or 1 night",
  },
  "Achilles Repair": {
    us: "$10,000–$28,000",
    partner: "$2,000–$6,000",
    stay: "1–3 nights",
  },
};

export const ORTHOPEDICS_SUMMARIES: Record<string, string> = {
  "Total Knee Replacement":
    "Replace a worn knee when arthritis already belongs on a named joint list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad. Robotic and partial sheets sit beside this slug; revision is a different list when the first implant already failed.",
  "Robotic Knee Replacement":
    "Robot-assisted knee replacement when the named arthroplasty list already writes the plan on CT. Conventional TKR remains the neighbouring slug — this sheet is the robot product.",
  "Partial Knee Replacement":
    "Resurface one compartment when the other two already stay honest. Total knee is a different slug when the whole joint is the honest implant.",
  "Revision Knee Replacement":
    "Revise a failed knee implant when infection, loosening or instability already belongs on a revision list. First-time TKR stays on its own sheet.",
  "Total Hip Replacement":
    "Replace a worn hip when arthritis or AVN already writes arthroplasty. Resurfacing and revision sit on neighbouring Orthopedics slugs; paediatric hip reconstruction remains Pediatric Orthopaedic.",
  "Revision Hip Replacement":
    "Revise a failed hip implant when stem, cup or infection already belongs on a named revision floor. Primary THR is a different sheet.",
  "Hip Resurfacing":
    "Resurface a selected hip when bone quality already makes a conventional stem dishonest. This is not the paediatric hip-preservation sheet.",
  "Shoulder Replacement":
    "Replace a destroyed shoulder when arthritis or cuff-tear arthropathy already writes arthroplasty. Reverse versus anatomic is written after films — not from a brochure implant name.",
  "ACL Reconstruction (Anterior Cruciate Ligament)":
    "Reconstruct an ACL when instability already belongs on a sports list in India. PCL, meniscus and generic arthroscopy sit on neighbouring slugs.",
  "PCL Reconstruction (Posterior Cruciate Ligament)":
    "Reconstruct a PCL when posterior sag already belongs on a named sports list. ACL remains a different graft plan.",
  "Meniscus Repair":
    "Repair a meniscus when tissue already holds a stitch. Meniscectomy-only work stays inside the arthroscopy sheet when repair is dishonest.",
  "Rotator Cuff Repair":
    "Repair a rotator cuff when retraction and fatty change already make the indication honest. Shoulder replacement is a different slug when the joint is gone.",
  "Arthroscopic Surgery":
    "Arthroscopy when a named sports list already writes a scope and not a named ligament product. ACL, PCL, meniscus and cuff keep their own slugs.",
  "Fracture Fixation":
    "Fix an adult fracture when reduction already needs metal. ORIF is the open-reduction slug; paediatric fracture fixation remains on Pediatric Orthopaedic.",
  "ORIF (Open Reduction and Internal Fixation)":
    "Open reduction and internal fixation when closed methods already failed. The broader fracture-fixation sheet is the family; this slug is the ORIF product.",
  "Non-Union Repair":
    "Treat a non-union when a fracture already failed to unite. Bone graft, revision hardware and infection work-up are written after films.",
  "Carpal Tunnel Release":
    "Release a carpal tunnel when NCS already confirms compression. Endoscopic versus open is written after examination — not from a day-care brochure.",
  "Tendon Repair":
    "Repair an adult tendon when laceration or rupture already belongs on a hand or sports list. Paediatric tendon-repair surgery is a different Pediatric Orthopaedic slug.",
  "Hand Reconstruction":
    "Reconstruct a hand when trauma, nerve or tendon already needs more than a single release. Carpal tunnel and tendon repair stay on neighbouring slugs.",
  "Ankle Replacement":
    "Replace a destroyed ankle when fusion is no longer the honest first tool. Bunion and Achilles sit on the same Foot & Ankle cluster, not this implant.",
  "Bunion Surgery":
    "Correct a bunion when footwear and osteotomy already belong on a named foot list. Recurrence versus first correction is written after standing films.",
  "Achilles Repair":
    "Repair an Achilles when rupture already belongs on a named foot-and-ankle list. Acute versus chronic reconstruction is written after examination.",
};

export const ORTHOPEDICS_CLUSTER_BY_PROCEDURE: Record<string, string> = {
  "Total Knee Replacement": "Joint Replacement",
  "Robotic Knee Replacement": "Joint Replacement",
  "Partial Knee Replacement": "Joint Replacement",
  "Revision Knee Replacement": "Joint Replacement",
  "Total Hip Replacement": "Joint Replacement",
  "Revision Hip Replacement": "Joint Replacement",
  "Hip Resurfacing": "Joint Replacement",
  "Shoulder Replacement": "Joint Replacement",
  "ACL Reconstruction (Anterior Cruciate Ligament)": "Sports & Arthroscopy",
  "PCL Reconstruction (Posterior Cruciate Ligament)": "Sports & Arthroscopy",
  "Meniscus Repair": "Sports & Arthroscopy",
  "Rotator Cuff Repair": "Sports & Arthroscopy",
  "Arthroscopic Surgery": "Sports & Arthroscopy",
  "Fracture Fixation": "Trauma",
  "ORIF (Open Reduction and Internal Fixation)": "Trauma",
  "Non-Union Repair": "Trauma",
  "Carpal Tunnel Release": "Hand & Upper Limb",
  "Tendon Repair": "Hand & Upper Limb",
  "Hand Reconstruction": "Hand & Upper Limb",
  "Ankle Replacement": "Foot & Ankle",
  "Bunion Surgery": "Foot & Ankle",
  "Achilles Repair": "Foot & Ankle",
};
