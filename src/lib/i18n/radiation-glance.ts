import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { treatments } from "@/lib/treatments";

/**
 * Stored catalog rows for the India radiation directory glance table.
 * Durations are translations of the exact stay strings. An unmapped stay is
 * omitted rather than printed in English or replaced with a new clinical claim.
 */
export type RadiationGlanceRow = {
  procedure: string;
  name: string;
  href?: string;
  indiaUsd: string;
  usUsd: string;
  durationAr: string;
};

const GLANCE_PROCEDURES = [
  "External Beam Radiotherapy (EBRT)",
  "3D Conformal Radiotherapy (3D-CRT)",
  "Intensity-Modulated Radiotherapy (IMRT)",
  "Image-Guided Radiotherapy (IGRT)",
  "Stereotactic Body Radiotherapy (SBRT)",
  "Stereotactic Radiosurgery (SRS)",
  "Brachytherapy",
  "CyberKnife",
  "Gamma Knife",
  "Proton Beam Therapy",
] as const;

const STAY_AR: Record<string, string> = {
  "15–35 sessions typical · 4–7 weeks": "عادة 15–35 جلسة · 4–7 أسابيع",
  "15–35 sessions typical · usually outpatient": "عادة 15–35 جلسة · غالبًا دون مبيت",
  "4–7 weeks of fractions": "4–7 أسابيع من الجلسات",
  "1–5 sessions": "1–5 جلسات",
  "1 session typical": "جلسة واحدة في العادة",
  "4–8 weeks of fractions": "4–8 أسابيع من الجلسات",
  "1–7 nights": "1–7 ليالٍ",
  "2–8 nights": "2–8 ليالٍ",
  "3–7 nights": "3–7 ليالٍ",
  "Tied to theatre stay": "مرتبطة بمدة الإقامة الجراحية",
  "By transplant protocol": "حسب بروتوكول الزراعة",
};

export function radiationPlanningGlance(
  procedures: { sourceName: string; href: string }[],
): RadiationGlanceRow[] {
  const hrefByName = new Map(procedures.map((row) => [row.sourceName, row.href]));
  return GLANCE_PROCEDURES.flatMap((name) => {
    const treatment = treatments.find((row) => row.name === name);
    const durationAr = treatment?.stay ? STAY_AR[treatment.stay] : undefined;
    if (!treatment?.partnerRange || !treatment.usRange || !durationAr) return [];
    return [
      {
        procedure: name,
        name: taxonomyLabel(name, "ar"),
        href: hrefByName.get(name),
        indiaUsd: treatment.partnerRange,
        usUsd: treatment.usRange,
        durationAr,
      },
    ];
  });
}
