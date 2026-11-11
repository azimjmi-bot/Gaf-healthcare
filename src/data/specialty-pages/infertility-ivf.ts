import { indiaSpecialtyProfile } from "./india-specialty-profile";

export const infertilityIvfIndiaProfile = indiaSpecialtyProfile({
  specialtySlug: "infertility-ivf",
  terminology: {
    careItem: "fertility procedure",
    careItems: "fertility procedures",
    practitioner: "fertility specialist",
    practitioners: "fertility specialists",
    durationLabel: "Typical cycle or stay",
  },
  definition:
    "Infertility & IVF care evaluates and treats difficulty conceiving through medical stimulation, intrauterine insemination, in vitro fertilisation, ICSI, gamete or embryo cryopreservation, genetic testing of embryos, and selected fertility-preserving surgeries. Selection depends on both partners' diagnoses, ovarian reserve, semen quality, uterine and tubal findings, prior treatment response, age, and applicable legal rules for donor gametes.",
  selectionFocus: [
    "couple diagnosis, ovarian reserve and semen analysis",
    "uterine, tubal and hormonal evaluation",
    "cycle type, laboratory capability and legal donor or gamete rules",
  ],
  records: [
    "AMH, FSH, estradiol and antral follicle count where relevant",
    "Semen analysis and prior andrology notes",
    "Pelvic ultrasound, HSG or saline sonogram reports",
    "Prior IVF/IUI cycle summaries, stimulation charts and embryo reports",
  ],
  costFocus: [
    "the exact cycle, laboratory add-on or fertility-preserving procedure",
    "medications, monitoring visits, embryology fees, cryostorage and legal donor work",
  ],
  relatedSpecialtySlugs: ["gynecology", "urology"],
});
