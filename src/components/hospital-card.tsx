import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Hospital } from "@/lib/hospitals";
import { doctorsForHospital } from "@/lib/doctors";

function facultyLabel(faculty: { specialtySlug: string }[]) {
  const radiation = faculty.filter((d) => d.specialtySlug === "radiation-oncology").length;
  const surgical = faculty.filter((d) => d.specialtySlug === "surgical-oncology").length;
  const medical = faculty.filter((d) => d.specialtySlug === "medical-oncology").length;
  const hematology = faculty.filter((d) => d.specialtySlug === "hematology").length;
  const pediatricHematology = faculty.filter((d) => d.specialtySlug === "pediatric-hematology").length;
  const cardiac = faculty.filter((d) => d.specialtySlug === "cardiac-surgery").length;
  const pediatricCardiac = faculty.filter((d) => d.specialtySlug === "pediatric-cardiac-surgery").length;
  const cardiology = faculty.filter((d) => d.specialtySlug === "cardiology").length;
  const bariatric = faculty.filter((d) => d.specialtySlug === "bariatric-surgery").length;
  const cosmetic = faculty.filter((d) => d.specialtySlug === "cosmetic-surgery").length;
  const ent = faculty.filter((d) => d.specialtySlug === "ent").length;
  const gastro = faculty.filter((d) => d.specialtySlug === "gastroenterology").length;
  const surgicalGastro = faculty.filter((d) => d.specialtySlug === "surgical-gastroenterology").length;
  const urology = faculty.filter((d) => d.specialtySlug === "urology").length;
  const spine = faculty.filter((d) => d.specialtySlug === "spine-surgery").length;
  const parts: string[] = [];
  if (radiation) {
    parts.push(radiation === 1 ? "1 radiation oncologist" : `${radiation} radiation oncologists`);
  }
  if (surgical) {
    parts.push(surgical === 1 ? "1 surgical oncologist" : `${surgical} surgical oncologists`);
  }
  if (medical) {
    parts.push(medical === 1 ? "1 medical oncologist" : `${medical} medical oncologists`);
  }
  if (hematology) {
    parts.push(hematology === 1 ? "1 hematologist" : `${hematology} hematologists`);
  }
  if (pediatricHematology) {
    parts.push(
      pediatricHematology === 1 ? "1 pediatric hematologist" : `${pediatricHematology} pediatric hematologists`,
    );
  }
  if (cardiac) {
    parts.push(cardiac === 1 ? "1 cardiac surgeon" : `${cardiac} cardiac surgeons`);
  }
  if (pediatricCardiac) {
    parts.push(
      pediatricCardiac === 1 ? "1 pediatric cardiac surgeon" : `${pediatricCardiac} pediatric cardiac surgeons`,
    );
  }
  if (cardiology) {
    parts.push(cardiology === 1 ? "1 cardiologist" : `${cardiology} cardiologists`);
  }
  if (bariatric) {
    parts.push(bariatric === 1 ? "1 bariatric surgeon" : `${bariatric} bariatric surgeons`);
  }
  if (cosmetic) {
    parts.push(cosmetic === 1 ? "1 cosmetic surgeon" : `${cosmetic} cosmetic surgeons`);
  }
  if (ent) {
    parts.push(ent === 1 ? "1 ENT surgeon" : `${ent} ENT surgeons`);
  }
  if (gastro) {
    parts.push(gastro === 1 ? "1 gastroenterologist" : `${gastro} gastroenterologists`);
  }
  if (surgicalGastro) {
    parts.push(
      surgicalGastro === 1 ? "1 surgical gastroenterologist" : `${surgicalGastro} surgical gastroenterologists`,
    );
  }
  if (urology) {
    parts.push(urology === 1 ? "1 urologist" : `${urology} urologists`);
  }
  if (spine) {
    parts.push(spine === 1 ? "1 spine surgeon" : `${spine} spine surgeons`);
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
