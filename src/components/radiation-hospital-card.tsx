import { BedDouble, CalendarDays, MapPin } from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { LocaleLink as Link } from "@/components/locale-link";
import { doctorHasProcedure } from "@/lib/catalog";
import { hospitalSpecialtyCardDescription } from "@/lib/hospital-specialty-copy";
import type { RadiationHospitalRelationship } from "@/lib/radiation-hospital-page";
import { hospitalsPath } from "@/lib/catalog-links";

export function HospitalSpecialtyCard({
  relationship,
  specialtyName,
  practitioner,
  practitioners,
  selectedProcedure,
}: {
  relationship: RadiationHospitalRelationship;
  specialtyName: string;
  practitioner: string;
  practitioners: string;
  selectedProcedure?: string;
}) {
  const { hospital, doctors, procedures } = relationship;
  const shownProcedures = procedures.slice(0, 5);
  const shownDoctors = (
    selectedProcedure
      ? doctors.filter((doctor) => doctorHasProcedure(doctor, selectedProcedure))
      : doctors
  ).slice(0, 3);
  const description = hospitalSpecialtyCardDescription({
    hospital,
    specialty: specialtyName,
    doctors,
    procedures,
    selectedProcedure,
    practitionerSingular: practitioner,
    practitionerPlural: practitioners,
  });

  return (
    <article className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl">
            <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {hospital.city}, {hospital.country}
          </p>
        </div>
        <AccreditationSeals accreditation={hospital.accreditation} size="sm" labeled />
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {hospital.beds ? (
          <div className="flex items-center gap-2">
            <BedDouble className="size-4" />
            <dt className="sr-only">Beds</dt>
            <dd>{hospital.beds} beds</dd>
          </div>
        ) : null}
        {hospital.established ? (
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            <dt className="sr-only">Established</dt>
            <dd>Established {hospital.established}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {shownProcedures.length > 0 ? (
        <div className="mt-5">
          <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Validated procedures
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {shownProcedures.map((procedure) => (
              <li key={procedure.slug}>
                <Link
                  href={hospitalsPath({
                    destination: "India",
                    city: hospital.city,
                    specialty: specialtyName,
                    procedure: procedure.name,
                  })}
                  className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs"
                >
                  {procedure.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {shownDoctors.length > 0 ? (
        <details className="mt-5 rounded-xl border border-border bg-background px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium">
            View {practitioners} at this hospital
          </summary>
          <ul className="mt-3 space-y-2 text-sm">
            {shownDoctors.map((doctor) => (
              <li key={doctor.slug}>
                <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
                <span className="block text-xs text-muted-foreground">
                  {doctor.qualifications || doctor.title}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/hospitals/${hospital.slug}`} className="cost-btn cost-btn--ghost">
          View Hospital
        </Link>
        <Link href={`/hospitals/${hospital.slug}/procedures`} className="cost-btn cost-btn--ghost">
          View Procedures
        </Link>
        <Link
          href={`/consult?hospital=${hospital.slug}${selectedProcedure ? `&treatment=${encodeURIComponent(selectedProcedure)}` : ""}`}
          className="cost-btn cost-btn--primary"
        >
          Request Treatment Plan
        </Link>
      </div>
    </article>
  );
}

export const RadiationHospitalCard = HospitalSpecialtyCard;
