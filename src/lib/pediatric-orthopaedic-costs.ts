export const PEDIATRIC_ORTHOPAEDIC_COST: Record<string, { us: string; partner: string; stay: string }> = {
  "Clubfoot Correction Surgery": {
    us: "$6,000–$18,000",
    partner: "$1,200–$3,800",
    stay: "1–3 nights; staged casts may follow",
  },
  "Pediatric Fracture Surgery": {
    us: "$8,000–$25,000",
    partner: "$1,500–$4,800",
    stay: "1–3 nights",
  },
  "Pediatric Deformity Correction": {
    us: "$20,000–$60,000",
    partner: "$4,500–$13,000",
    stay: "4–10 nights",
  },
  "Limb Lengthening Surgery": {
    us: "$50,000–$150,000",
    partner: "$12,000–$28,000",
    stay: "7–14 nights; outpatient lengthening in-city",
  },
  "Limb Reconstruction Surgery": {
    us: "$40,000–$120,000",
    partner: "$10,000–$25,000",
    stay: "7–14 nights",
  },
  "Developmental Dysplasia of Hip Surgery": {
    us: "$15,000–$40,000",
    partner: "$3,500–$9,500",
    stay: "3–7 nights",
  },
  "Pediatric Hip Reconstruction": {
    us: "$25,000–$70,000",
    partner: "$6,000–$16,000",
    stay: "4–8 nights",
  },
  "Hip Preservation Surgery": {
    us: "$20,000–$55,000",
    partner: "$5,000–$14,000",
    stay: "3–6 nights",
  },
  "Pediatric Scoliosis Surgery": {
    us: "$80,000–$180,000",
    partner: "$12,000–$28,000",
    stay: "7–14 nights",
  },
  "Pediatric Spinal Deformity Correction": {
    us: "$90,000–$200,000",
    partner: "$14,000–$32,000",
    stay: "8–16 nights",
  },
  "Cerebral Palsy Orthopedic Surgery": {
    us: "$18,000–$70,000",
    partner: "$4,000–$14,000",
    stay: "4–10 nights",
  },
  "Pediatric Foot & Ankle Surgery": {
    us: "$8,000–$25,000",
    partner: "$1,800–$6,000",
    stay: "1–4 nights",
  },
  "Pediatric Fracture Fixation": {
    us: "$10,000–$30,000",
    partner: "$2,000–$7,000",
    stay: "1–4 nights",
  },
  "Tendon Repair Surgery": {
    us: "$8,000–$22,000",
    partner: "$1,500–$5,000",
    stay: "Outpatient or 1–2 nights",
  },
  "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)": {
    us: "$15,000–$45,000",
    partner: "$3,500–$10,000",
    stay: "2–5 nights",
  },
};

export const PEDIATRIC_ORTHOPAEDIC_SUMMARIES: Record<string, string> = {
  "Clubfoot Correction Surgery":
    "Correct clubfoot when Ponseti casts already failed or a named paediatric orthopaedic list in Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad already writes theatre. Relapse versus first correction is written after examination — not from a brochure cast count.",
  "Pediatric Fracture Surgery":
    "Operate a child’s fracture when reduction already fails closed care. Fixation sits on a neighbouring slug when hardware, not the indication, is the product.",
  "Pediatric Deformity Correction":
    "Correct a limb deformity when growth, osteotomy and a paediatric list already belong together. Lengthening and reconstruction are separate sheets when those tools are the honest product.",
  "Limb Lengthening Surgery":
    "Lengthen a short limb when discrepancy already belongs on a named paediatric reconstruction list in India. Frame versus nail, and whether reconstruction follows, are written after films — not from a hotel calendar.",
  "Limb Reconstruction Surgery":
    "Rebuild a paediatric limb when infection, congenital deficiency or failed trauma already needs more than a single osteotomy. Lengthening is a different slug when distraction is the product.",
  "Developmental Dysplasia of Hip Surgery":
    "Treat DDH when harness or closed reduction already failed, or age already writes an open list. Pediatric hip reconstruction and SCFE sit on neighbouring slugs.",
  "Pediatric Hip Reconstruction":
    "Reconstruct a child’s hip when coverage, osteotomy or salvage already belongs on a named paediatric floor. DDH and SCFE remain separate indications.",
  "Hip Preservation Surgery":
    "Preserve a young hip when osteotomy or impingement work already belongs before replacement is honest. This paediatric sheet is not an adult arthroplasty brochure.",
  "Pediatric Scoliosis Surgery":
    "Instrument a child’s scoliosis when bracing already failed or curve magnitude already writes fusion or growing-rod work. Adult scoliosis correction remains on the Spine Surgery slug.",
  "Pediatric Spinal Deformity Correction":
    "Correct paediatric kyphosis, congenital or neuromuscular deformity when a children’s spine list already agrees. Adult spinal deformity correction is a different Spine Surgery sheet.",
  "Cerebral Palsy Orthopedic Surgery":
    "Address gait, hip and contracture when a child with cerebral palsy already belongs on a named paediatric orthopaedic list. Single-event multilevel work is written after gait analysis — not from a hotel length.",
  "Pediatric Foot & Ankle Surgery":
    "Operate a child’s foot or ankle when clubfoot is not the honest label. Clubfoot correction remains its own slug.",
  "Pediatric Fracture Fixation":
    "Place hardware for a paediatric fracture when stability already needs metal. The broader fracture-surgery sheet is the indication; this slug is the fixation product.",
  "Tendon Repair Surgery":
    "Repair a paediatric tendon when laceration or CP-related transfer already belongs on a children’s list. Transfers for cerebral palsy sit beside the CP sheet, not instead of it.",
  "SCFE Hip Surgery (Slipped Capital Femoral Epiphysis)":
    "Pin or reconstruct a slipped capital femoral epiphysis when a child’s hip already belongs on an urgent paediatric list in India. DDH and hip reconstruction remain separate slugs.",
};
