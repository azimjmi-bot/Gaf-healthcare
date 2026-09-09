import Link from "next/link";
import { MapPin } from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import type { Hospital } from "@/lib/hospitals";
import { doctorsForHospital } from "@/lib/doctors";
import { compareSpecialties } from "@/lib/taxonomy";

const CHIP_LIMIT = 8;

function specialtiesOnCard(hospital: Hospital, faculty: { specialty: string; specialtySlug: string }[]) {
  const fromFaculty = [...new Map(faculty.map((d) => [d.specialtySlug, d.specialty])).entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => compareSpecialties(a.slug, b.slug));
  if (fromFaculty.length) return fromFaculty;
  return hospital.specialtySlugs.map((slug, i) => ({ slug, name: hospital.specialties[i] ?? slug }));
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  const faculty = doctorsForHospital(hospital.slug);
  const specialties = specialtiesOnCard(hospital, faculty);
  const shown = specialties.slice(0, CHIP_LIMIT);
  const extra = specialties.length - shown.length;

  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <Link href={`/hospitals/${hospital.slug}`} className="block font-heading text-2xl hover:text-gold">
        {hospital.name}
      </Link>
      <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5 text-[#F26522]" />
        {hospital.city}, {hospital.country}
      </p>
      <div className="mt-3">
        <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
      </div>
      {shown.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {shown.map((spec) => (
            <li key={spec.slug}>
              <Link
                href={`/hospitals?specialty=${encodeURIComponent(spec.name)}&destination=${encodeURIComponent(hospital.country)}&city=${encodeURIComponent(hospital.city)}`}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                {spec.name}
              </Link>
            </li>
          ))}
          {extra > 0 ? (
            <li className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
              +{extra} more
            </li>
          ) : null}
        </ul>
      ) : null}
      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{hospital.bio}</p>
      <p className="mt-4 text-sm">
        {faculty.length
          ? `${faculty.length} named ${faculty.length === 1 ? "consultant" : "consultants"}`
          : "Named consultants being matched"}
        {" · "}
        <Link href={`/hospitals/${hospital.slug}`} className="underline-offset-4 hover:underline">
          View campus
        </Link>
      </p>
    </article>
  );
}
