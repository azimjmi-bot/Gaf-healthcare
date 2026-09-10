import { LocaleLink as Link } from "@/components/locale-link";
import { BedDouble, CalendarDays, MapPin, Stethoscope } from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { HospitalGalleryButton } from "@/components/hospital-gallery";
import type { Hospital } from "@/lib/hospitals";
import { doctorsForHospital } from "@/lib/data";
import { displayBio, isEyeCampus } from "@/lib/hospital-profile";
import { whatsappHref } from "@/lib/site";
import { hospitalsPath } from "@/lib/catalog-links";
import { compareSpecialties } from "@/lib/taxonomy";

const CHIP_LIMIT = 6;

function specialtiesOnCard(hospital: Hospital, faculty: { specialty: string; specialtySlug: string }[]) {
  const fromFaculty = [...new Map(faculty.map((d) => [d.specialtySlug, d.specialty])).entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => compareSpecialties(a.slug, b.slug));
  if (fromFaculty.length) return fromFaculty;
  return hospital.specialtySlugs.map((slug, i) => ({ slug, name: hospital.specialties[i] ?? slug }));
}

function wa(hospital: Hospital, intent: string) {
  return whatsappHref(
    `Hello — I am writing about ${hospital.name} in ${hospital.city}. ${intent}`,
  );
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  const faculty = doctorsForHospital(hospital.slug);
  const specialties = specialtiesOnCard(hospital, faculty);
  const shown = specialties.slice(0, CHIP_LIMIT);
  const extra = specialties.length - shown.length;
  const eye = isEyeCampus(hospital);
  const blurb = displayBio(hospital.bio);

  return (
    <article className="hcard">
      <div className="hcard__visual">
        <HospitalCampusVisual hospital={hospital} className="hcard__art" />
        <HospitalGalleryButton hospital={hospital} label="View Photos" className="hcard__photos" />
      </div>

      <div className="hcard__main">
        <h2 className="hcard__title">
          <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
        </h2>
        <AccreditationSeals accreditation={hospital.accreditation} size="sm" labeled />
        <p className="hcard__bio">{blurb}</p>
        <Link href={`/hospitals/${hospital.slug}`} className="hcard__more">
          Read More →
        </Link>
        {shown.length > 0 ? (
          <ul className="hcard__chips">
            {shown.map((spec) => (
              <li key={spec.slug}>
                <Link
                  href={hospitalsPath({
                    destination: hospital.country,
                    city: hospital.city,
                    specialty: spec.name,
                  })}
                >
                  {spec.name}
                </Link>
              </li>
            ))}
            {extra > 0 ? <li className="hcard__morechip">+{extra} more</li> : null}
          </ul>
        ) : null}
      </div>

      <div className="hcard__aside">
        <ul className="hcard__facts">
          {hospital.established ? (
            <li>
              <CalendarDays className="size-4" />
              <span>
                Established in: <strong>{hospital.established}</strong>
              </span>
            </li>
          ) : null}
          {hospital.beds ? (
            <li>
              <BedDouble className="size-4" />
              <span>
                Number of beds: <strong>{hospital.beds}</strong>
              </span>
            </li>
          ) : null}
          <li>
            <Stethoscope className="size-4" />
            <span>{eye ? "Eye hospital" : "Multi speciality"}</span>
          </li>
          <li>
            <MapPin className="size-4" />
            <span>
              Location:{" "}
              <strong>
                {hospital.city}, {hospital.country}
              </strong>
            </span>
          </li>
        </ul>
        <div className="hcard__cta">
          <a
            className="hcard__btn hcard__btn--book"
            href={wa(hospital, "I would like to book an appointment.")}
            target="_blank"
            rel="noreferrer"
          >
            Book Appointment
          </a>
          <a
            className="hcard__btn hcard__btn--wa"
            href={wa(hospital, "Please connect me on WhatsApp.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
          <a
            className="hcard__btn hcard__btn--plan"
            href={wa(hospital, "I would like a treatment plan for this campus.")}
            target="_blank"
            rel="noreferrer"
          >
            Request Treatment Plan
          </a>
        </div>
      </div>
    </article>
  );
}
