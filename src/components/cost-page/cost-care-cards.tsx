import { LocaleLink as Link } from "@/components/locale-link";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { experienceBadge, keyProcedureLabels } from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";

export function CostHospitalCard({
  hospital,
  doctorCount,
  consultHref,
}: {
  hospital: Hospital;
  doctorCount: number;
  consultHref: string;
}) {
  const specialties = hospital.specialties.slice(0, 4);
  return (
    <article className="cost-hcard">
      <div className="cost-hcard__visual">
        <HospitalCampusVisual hospital={hospital} className="cost-hcard__art" />
      </div>
      <div className="cost-hcard__body">
        <h3 className="cost-hcard__name">
          <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
        </h3>
        <p className="cost-hcard__meta">
          {hospital.city}, {hospital.country}
        </p>
        <AccreditationSeals accreditation={hospital.accreditation} size="sm" labeled />
        {specialties.length > 0 ? (
          <ul className="cost-hcard__chips">
            {specialties.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : null}
        <p className="cost-hcard__count">
          {doctorCount > 0
            ? `${doctorCount} listed ${doctorCount === 1 ? "doctor" : "doctors"} for this pathway`
            : "Consultant match on request"}
        </p>
        {hospital.languages ? (
          <p className="cost-hcard__lang">Languages listed: {hospital.languages}</p>
        ) : null}
        <div className="cost-hcard__cta">
          <Link href={`/hospitals/${hospital.slug}`} className="cost-btn cost-btn--ghost">
            View Hospital
          </Link>
          <Link href={consultHref} className="cost-btn cost-btn--primary">
            Request Cost
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CostDoctorCard({
  doctor,
  consultHref,
}: {
  doctor: Doctor;
  consultHref: string;
}) {
  const experience = experienceBadge(doctor);
  const procedures = keyProcedureLabels(doctor).slice(0, 3);
  return (
    <article className="cost-dcard">
      <div className="cost-dcard__photo">
        {/* Catalog portraits are local static files; match directory cards. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doctor.image || "/doctors/avatar-placeholder.webp?v=2"}
          alt={doctor.image ? doctor.imageAlt || doctor.name : ""}
        />
      </div>
      <div className="cost-dcard__body">
        <h3 className="cost-dcard__name">
          <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
        </h3>
        <p className="cost-dcard__spec">{doctor.specialty}</p>
        <p className="cost-dcard__meta">
          <Link href={`/hospitals/${doctor.hospitalSlug}`}>{doctor.hospitalName}</Link>
          {" · "}
          {doctor.city}
        </p>
        {experience ? <p className="cost-dcard__exp">{experience}</p> : null}
        {procedures.length > 0 ? (
          <p className="cost-dcard__procs">{procedures.join(" · ")}</p>
        ) : null}
        {doctor.languages ? <p className="cost-dcard__lang">{doctor.languages}</p> : null}
        <div className="cost-dcard__cta">
          <Link href={`/doctors/${doctor.slug}`} className="cost-btn cost-btn--primary">
            View Profile
          </Link>
          <Link href={consultHref} className="cost-btn cost-btn--ghost">
            Request Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}
