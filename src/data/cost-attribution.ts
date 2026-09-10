export type CostAttributionPerson = {
  role: string;
  name: string;
  credential: string;
  image: string;
  imageAlt: string;
  affiliations: string[];
  bio: string;
  more: string;
};

export const COST_CONTENT_CURATOR: CostAttributionPerson = {
  role: "Content Curator",
  name: "Dr. Shabnam Choudhary",
  credential: "BDS",
  image: "/costs/shabnam-choudhary.webp",
  imageAlt: "Portrait of Dr. Shabnam Choudhary",
  affiliations: [
    "Al-Ameen Medical College, Bijapur, Karnataka",
    "Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru",
  ],
  bio: "Dr. Shabnam Choudhary, BDS, is a dental professional who graduated from Al-Ameen Medical College, Bijapur, Karnataka. She contributes to the curation and development of medically informative healthcare content, helping ensure that information is structured clearly and presented in a patient-friendly manner.",
  more: "She organises treatment-cost information on GAF Healthcare so international patients can read inclusions, exclusions, and planning ranges clearly. Her role is editorial, not a substitute for an individual medical opinion.",
};

export const COST_MEDICAL_REVIEWER: CostAttributionPerson = {
  role: "Medically Reviewed By",
  name: "Dr. Saffiyyah Chaudhary",
  credential: "BDS",
  image: "/costs/saffiyyah-chaudhary.webp",
  imageAlt: "Portrait of Dr. Saffiyyah Chaudhary",
  affiliations: [
    "Al-Ameen Medical College, Bijapur, Karnataka",
    "Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru",
  ],
  bio: "Dr. Saffiyyah Chaudhary, BDS, is a dental professional who graduated from Al-Ameen Medical College, Bijapur, Karnataka. She provides medical review of healthcare content to help ensure that clinical information is accurate, understandable, and appropriately presented for patients and their families.",
  more: "She reviews GAF Healthcare treatment-cost pages so clinical statements stay accurate and appropriately framed. Final treatment decisions still belong to the treating doctor after a review of the patient’s records.",
};

export const COST_ATTRIBUTION = [COST_CONTENT_CURATOR, COST_MEDICAL_REVIEWER];
