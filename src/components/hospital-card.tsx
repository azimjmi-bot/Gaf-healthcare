import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Hospital } from "@/lib/hospitals";
import { doctorsForHospital } from "@/lib/doctors";

function facultyLabel(faculty: { specialtySlug: string }[]) {
  const radiation = faculty.filter((d) => d.specialtySlug === "radiation-oncology").length;
  const surgical = faculty.filter((d) => d.specialtySlug === "surgical-oncology").length;
  const parts: string[] = [];
  if (radiation) {
    parts.push(radiation === 1 ? "1 radiation oncologist" : `${radiation} radiation oncologists`);
  }
  if (surgical) {
    parts.push(surgical === 1 ? "1 surgical oncologist" : `${surgical} surgical oncologists`);
  }
  return parts.join(" · ") || "Faculty being matched";
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  const faculty = doctorsForHospital(hospital.slug);
  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs tracking-[0.18em] uppercase text-gold">
        {hospital.specialties.join(" · ")}
      </p>
      <Link href={`/hospitals/${hospital.slug}`} className="mt-2 block font-heading text-2xl hover:text-gold">
        {hospital.name}
      </Link>
      <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5 text-[#F26522]" />
        {hospital.city}, {hospital.country}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{hospital.accreditation}</p>
      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{hospital.bio}</p>
      {hospital.procedures.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {hospital.procedures.slice(0, 6).map((procedure) => (
            <Link
              key={procedure}
              href={`/hospitals?procedure=${encodeURIComponent(procedure)}&destination=${encodeURIComponent(hospital.country)}&city=${encodeURIComponent(hospital.city)}`}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              {procedure}
            </Link>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-sm">
        <Link href={`/hospitals/${hospital.slug}`} className="underline-offset-4 hover:underline">
          {facultyLabel(faculty)}
        </Link>
        {" · "}
        <Link href={`/hospitals/${hospital.slug}`} className="underline-offset-4 hover:underline">
          View campus
        </Link>
      </p>
    </article>
  );
}
