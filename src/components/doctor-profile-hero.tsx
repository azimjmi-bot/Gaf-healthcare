import Link from "next/link";
import {
  Award,
  Building2,
  CalendarDays,
  Crown,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  Medal,
  MessageCircle,
  Settings2,
  Stethoscope,
  Users,
} from "lucide-react";
import { DoctorClinicianVisual } from "@/components/doctor-clinician-visual";
import {
  campusChip,
  campusLine,
  educationStat,
  experienceBadge,
  heroHighlights,
} from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { yearsLabel } from "@/lib/hospital-profile";
import { whatsappHref } from "@/lib/site";

const HIGHLIGHT_ICONS = [Medal, Users, Settings2, Heart];

export function DoctorProfileHero({
  doctor,
  hospital,
}: {
  doctor: Doctor;
  hospital: Hospital | undefined;
}) {
  const highlights = heroHighlights(doctor);
  const years = yearsLabel(doctor);
  const experience = experienceBadge(doctor);
  const campus = campusLine(doctor, hospital);
  const chipCampus = campusChip(doctor, hospital);
  const wa = whatsappHref(
    `Hello — I would like to arrange a consult with ${doctor.name} at ${campus}.`,
  );

  return (
    <section className="dhero">
      <div className="dhero__inner">
        <nav className="dhero__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/doctors">Doctors</Link>
          <span>/</span>
          <Link href={`/doctors?specialty=${encodeURIComponent(doctor.specialty)}`}>
            {doctor.specialty}
          </Link>
          <span>/</span>
          <span aria-current="page">{doctor.name}</span>
        </nav>

        <div className="dhero__grid">
          <div>
            <ul className="dhero__pills">
              {doctor.featured ? (
                <li className="dhero__pill dhero__pill--gold">
                  <Crown className="size-3.5" />
                  Featured Expert
                </li>
              ) : null}
              {experience ? (
                <li className="dhero__pill">
                  <Award className="size-3.5" />
                  {experience}
                </li>
              ) : null}
              <li className="dhero__pill">
                <MapPin className="size-3.5" />
                {chipCampus}
              </li>
            </ul>

            <h1 className="dhero__name">{doctor.name}</h1>
            {doctor.qualifications ? (
              <p className="dhero__degrees">{doctor.qualifications}</p>
            ) : null}
            <p className="dhero__title">{doctor.title}</p>
            {hospital ? (
              <p className="dhero__place">
                <Link href={`/hospitals/${hospital.slug}`}>{campus}</Link>
              </p>
            ) : (
              <p className="dhero__place">
                {doctor.city}, {doctor.country}
              </p>
            )}

            {highlights.length > 0 ? (
              <ul className="dhero__highlights">
                {highlights.map((label, i) => {
                  const Icon = HIGHLIGHT_ICONS[i] ?? Medal;
                  return (
                    <li key={label}>
                      <span className="dhero__hi-icon">
                        <Icon className="size-4" />
                      </span>
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <div className="dhero__actions">
              <Link className="dhero__book" href={`/consult?doctor=${doctor.slug}`}>
                <CalendarDays className="size-4" />
                Book a consultation
                <span aria-hidden="true">→</span>
              </Link>
              <a className="dhero__contact" href={wa} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                Contact now
              </a>
            </div>
            <p className="dhero__sla">
              <span className="dhero__dot" />
              Usually responds within 24 hours
            </p>
          </div>

          <div className="dhero__visual-wrap">
            <div className="dhero__orb dhero__orb--a" />
            <div className="dhero__orb dhero__orb--b" />
            <DoctorClinicianVisual name={doctor.name} slug={doctor.slug} className="dhero__art" />
          </div>
        </div>

        <ul className="dhero__stats">
          <li>
            <Stethoscope className="size-5" />
            <div>
              <p className="dhero__stat-k">Experience</p>
              <p>{years ? `${years} of experience` : "Experience listed on the profile"}</p>
            </div>
          </li>
          <li>
            <Building2 className="size-5" />
            <div>
              <p className="dhero__stat-k">Hospital</p>
              <p>
                {chipCampus}, {doctor.country}
              </p>
            </div>
          </li>
          <li>
            <GraduationCap className="size-5" />
            <div>
              <p className="dhero__stat-k">Education</p>
              <p>{educationStat(doctor)}</p>
            </div>
          </li>
          <li>
            <Languages className="size-5" />
            <div>
              <p className="dhero__stat-k">Languages</p>
              <p>{doctor.languages}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
