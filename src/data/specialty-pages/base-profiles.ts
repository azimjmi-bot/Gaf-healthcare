import { bariatricSurgeryIndiaProfile } from "./bariatric-surgery";
import { cardiacSurgeryIndiaProfile } from "./cardiac-surgery";
import { cardiologyIndiaProfile } from "./cardiology";
import { cosmeticSurgeryIndiaProfile } from "./cosmetic-surgery";
import { entIndiaProfile } from "./ent";
import { gastroenterologyIndiaProfile } from "./gastroenterology";
import { gynecologyIndiaProfile } from "./gynecology";
import { hematologyIndiaProfile } from "./hematology";
import { medicalOncologyIndiaProfile } from "./medical-oncology";
import { nephrologyIndiaProfile } from "./nephrology";
import { neurologyIndiaProfile } from "./neurology";
import { neurosurgeryIndiaProfile } from "./neurosurgery";
import { ophthalmologyIndiaProfile } from "./ophthalmology";
import { orthopedicsIndiaProfile } from "./orthopedics";
import { pediatricCardiacSurgeryIndiaProfile } from "./pediatric-cardiac-surgery";
import { pediatricHematologyIndiaProfile } from "./pediatric-hematology";
import { pediatricOrthopaedicIndiaProfile } from "./pediatric-orthopaedic";
import { pulmonologyIndiaProfile } from "./pulmonology";
import { radiationOncologyIndiaProfile } from "./radiation-oncology";
import { spineSurgeryIndiaProfile } from "./spine-surgery";
import { surgicalGastroenterologyIndiaProfile } from "./surgical-gastroenterology";
import { surgicalOncologyIndiaProfile } from "./surgical-oncology";
import { urologyIndiaProfile } from "./urology";
import type { SpecialtyPageProfile } from "./types";

export const BASE_SPECIALTY_PROFILES: readonly SpecialtyPageProfile[] = [
  radiationOncologyIndiaProfile,
  medicalOncologyIndiaProfile,
  pulmonologyIndiaProfile,
  surgicalOncologyIndiaProfile,
  hematologyIndiaProfile,
  pediatricHematologyIndiaProfile,
  cardiacSurgeryIndiaProfile,
  pediatricCardiacSurgeryIndiaProfile,
  cardiologyIndiaProfile,
  bariatricSurgeryIndiaProfile,
  cosmeticSurgeryIndiaProfile,
  entIndiaProfile,
  gastroenterologyIndiaProfile,
  surgicalGastroenterologyIndiaProfile,
  urologyIndiaProfile,
  spineSurgeryIndiaProfile,
  pediatricOrthopaedicIndiaProfile,
  orthopedicsIndiaProfile,
  ophthalmologyIndiaProfile,
  gynecologyIndiaProfile,
  neurosurgeryIndiaProfile,
  neurologyIndiaProfile,
  nephrologyIndiaProfile,
];

export function baseSpecialtyProfileFor(
  specialtySlug: string,
  countrySlug = "india",
) {
  return BASE_SPECIALTY_PROFILES.find(
    (profile) =>
      profile.specialtySlug === specialtySlug &&
      profile.countrySlug === countrySlug,
  );
}
