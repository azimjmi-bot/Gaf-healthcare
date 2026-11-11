export { DENTISTRY_COST, DENTISTRY_CLUSTER_BY_PROCEDURE } from "./treatment-cost-ranges";

export const DENTISTRY_SUMMARIES: Record<string, string> = {
  "Dental Implants":
    "Replace a missing tooth root with a titanium fixture when bone, bite and healing already support an implant and not a bridge-only pathway. Full-mouth implant programmes stay on the neighbouring Full Mouth Dental Implants slug.",
  "Full Mouth Dental Implants":
    "Restore a full arch or both arches with implant-supported fixed teeth when edentulous jaws already write a named full-mouth plan. Single-tooth implants keep the Dental Implants slug; removable dentures remain a different product.",
  "Dental Crowns and Bridges":
    "Cover damaged teeth or replace a short span with fixed crowns and bridges when preparation, occlusion and periodontal health already belong on a restorative list. Veneers and full-mouth rehab are neighbouring products.",
  Dentures:
    "Fit a removable complete or partial denture when remaining teeth, ridges and budget already write a removable pathway rather than fixed implants. Implant-supported dentures sit inside Full Mouth Dental Implants when that is the named plan.",
  "Full Mouth Rehabilitation":
    "Rebuild worn, broken or failing dentition across both arches when vertical dimension, occlusion and aesthetics already require a staged multidisciplinary plan. Smile makeover is the neighbouring cosmetic-led slug.",
  "Braces and Orthodontic Treatment":
    "Align teeth with fixed braces when crowding, bite or jaw relationships already write orthodontics. Clear aligners stay on the neighbouring slug; jaw surgery is a different product when skeletal discrepancy dominates.",
  "Clear Aligners":
    "Move teeth with a sequenced clear-aligner series when case complexity already fits removable trays rather than fixed braces. Braces remain the neighbouring orthodontic slug for complex bite work.",
  "Wisdom Tooth Removal":
    "Remove one or more third molars when pain, infection, cyst risk or orthodontic plans already write extraction. Simple tooth extraction stays on the neighbouring slug for non-wisdom teeth.",
  "Jaw Surgery":
    "Correct skeletal jaw discrepancy with orthognathic surgery when orthodontics alone cannot finish the bite. Braces or aligners often accompany the pathway and keep their own slugs.",
  "Root Canal Treatment":
    "Treat pulp infection or irreversible pulpitis when the tooth can still be restored after cleaning and filling the canals. Extraction is the neighbouring product when the tooth cannot be saved.",
  "Gum Surgery":
    "Treat advanced periodontal disease or soft-tissue defects with flap, graft or resective work when non-surgical cleaning alone is no longer enough. Implants and crowns stay neighbouring restorative slugs.",
  "Smile Makeover":
    "Coordinate veneers, whitening, aligners or restorative work into a named aesthetic plan when records already write a multi-step smile design. Full mouth rehabilitation remains the structural rebuild slug.",
  "Dental Veneers":
    "Bond thin ceramic or composite shells when enamel, bite and gum health already support veneers rather than crowns. Whitening and smile makeover sit on neighbouring cosmetic slugs.",
  "Teeth Whitening":
    "Lighten tooth shade with supervised bleaching when enamel and existing restorations already allow whitening. Veneers are a different product when shape or colour cannot be corrected by bleach alone.",
  "Dental Fillings":
    "Restore cavities with composite or other direct fillings when decay is limited and the tooth does not yet need a crown or root canal. Crowns and root canal stay neighbouring restorative slugs.",
  "Tooth Extraction":
    "Remove a tooth when decay, fracture, infection or orthodontic plans already write extraction. Wisdom tooth removal keeps the third-molar slug; implants or bridges may follow on neighbouring products.",
};

export const DENTISTRY_CONDITIONS = [
  "Missing Teeth",
  "Tooth Decay",
  "Gum Disease",
  "Malocclusion",
  "Impacted Wisdom Teeth",
  "Tooth Discolouration",
  "Worn or Broken Teeth",
  "Jaw Misalignment",
  "Edentulism",
  "Dental Infection",
];
