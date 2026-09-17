import { doctorHasProcedure } from "@/lib/catalog";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";

export function hospitalSpecialtyCardDescription({
  hospital,
  specialty,
  doctors,
  procedures,
  selectedProcedure,
  practitionerPlural = "specialists",
}: {
  hospital: Hospital;
  specialty: string;
  doctors: Doctor[];
  procedures: { name: string; slug: string }[];
  selectedProcedure?: string;
  practitionerPlural?: string;
}) {
  if (selectedProcedure) {
    const matchedDoctors = doctors.filter((doctor) =>
      doctorHasProcedure(doctor, selectedProcedure),
    );
    return `${hospital.name} is listed for ${selectedProcedure} in ${hospital.city} because GAF's current data records the procedure at this campus and connects ${matchedDoctors.length} affiliated ${practitionerPlural} with the same procedure. This is a catalog relationship, not confirmation that the procedure is suitable or currently scheduled for a specific patient.`;
  }

  const procedureNames = procedures.slice(0, 4).map((procedure) => procedure.name);
  const procedureSummary =
    procedureNames.length > 0
      ? ` Validated hospital-and-doctor mappings include ${procedureNames.join(", ")}${procedures.length > procedureNames.length ? ` and ${procedures.length - procedureNames.length} more` : ""}.`
      : "";
  return `${hospital.name} is listed for ${specialty} in ${hospital.city} because GAF's current data connects this campus with ${doctors.length} affiliated ${practitionerPlural}.${procedureSummary}`;
}
