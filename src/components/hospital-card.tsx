import { LocaleLink as Link } from "@/components/locale-link";
import { BedDouble, CalendarDays, MapPin, Stethoscope } from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { HospitalGalleryButton } from "@/components/hospital-gallery";
import type { Hospital } from "@/lib/hospitals";
import { displayBio, isEyeCampus } from "@/lib/hospital-profile";
import { whatsappHref } from "@/lib/site";
import { hospitalsPath } from "@/lib/catalog-links";
import { getRequestLocale } from "@/lib/i18n/request";
import { interpolate } from "@/lib/i18n/messages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { doctorsForHospitalLocale } from "@/lib/locale-catalog";
import { compareSpecialties } from "@/lib/taxonomy";

const CHIP_LIMIT = 6;

function specialtiesOnCard(hospital: Hospital, faculty: { specialty: string; specialtySlug: string }[]) {
  const fromFaculty = [...new Map(faculty.map((d) => [d.specialtySlug, d.specialty])).entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => compareSpecialties(a.slug, b.slug));
  if (fromFaculty.length) return fromFaculty;
  return hospital.specialtySlugs.map((slug, i) => ({ slug, name: hospital.specialties[i] ?? slug }));
}

function wa(hospital: Hospital, city: string, intent: string, hello: string) {
  return whatsappHref(interpolate(hello, { name: hospital.name, city, intent }));
}

export async function HospitalCard({ hospital }: { hospital: Hospital }) {
  const locale = await getRequestLocale();
  const t = uiCatalogFor(locale);
  const faculty = doctorsForHospitalLocale(hospital.slug, locale);
  const specialties = specialtiesOnCard(hospital, faculty);
  const shown = specialties.slice(0, CHIP_LIMIT);
  const extra = specialties.length - shown.length;
  const eye = isEyeCampus(hospital);
  const blurb = displayBio(hospital.bio);
  const cityLabel = taxonomyLabel(hospital.city, locale);
  const countryLabel = taxonomyLabel(hospital.country, locale);

  return (
    <article className="hcard">
      <div className="hcard__visual">
        <HospitalCampusVisual hospital={hospital} className="hcard__art" />
        <HospitalGalleryButton
          hospital={hospital}
          locale={locale}
          label={t["hp.photos"]}
          className="hcard__photos"
        />
      </div>

      <div className="hcard__main">
        <h2 className="hcard__title">
          <Link href={`/hospitals/${hospital.slug}`}>{hospital.name}</Link>
        </h2>
        <AccreditationSeals accreditation={hospital.accreditation} size="sm" labeled />
        <p className="hcard__bio">{blurb}</p>
        <Link href={`/hospitals/${hospital.slug}`} className="hcard__more">
          {t["hp.readMore"]}
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
                  {taxonomyLabel(spec.name, locale)}
                </Link>
              </li>
            ))}
            {extra > 0 ? (
              <li className="hcard__morechip">{interpolate(t["hp.moreChip"], { count: extra })}</li>
            ) : null}
          </ul>
        ) : null}
      </div>

      <div className="hcard__aside">
        <ul className="hcard__facts">
          {hospital.established ? (
            <li>
              <CalendarDays className="size-4" />
              <span>
                {t["hp.established"]} <strong>{hospital.established}</strong>
              </span>
            </li>
          ) : null}
          {hospital.beds ? (
            <li>
              <BedDouble className="size-4" />
              <span>
                {t["hp.bedCount"]} <strong>{hospital.beds}</strong>
              </span>
            </li>
          ) : null}
          <li>
            <Stethoscope className="size-4" />
            <span>{eye ? t["hp.eyeHospital"] : t["hp.multi"]}</span>
          </li>
          <li>
            <MapPin className="size-4" />
            <span>
              {t["hp.locationLabel"]}{" "}
              <strong>
                {cityLabel}, {countryLabel}
              </strong>
            </span>
          </li>
        </ul>
        <div className="hcard__cta">
          <a
            className="hcard__btn hcard__btn--book"
            href={wa(hospital, cityLabel, t["hp.waBookIntent"], t["hp.waHello"])}
            target="_blank"
            rel="noreferrer"
          >
            {t["hp.book"]}
          </a>
          <a
            className="hcard__btn hcard__btn--wa"
            href={wa(hospital, cityLabel, t["hp.waChatIntent"], t["hp.waHello"])}
            target="_blank"
            rel="noreferrer"
          >
            {t["hp.whatsapp"]}
          </a>
          <a
            className="hcard__btn hcard__btn--plan"
            href={wa(hospital, cityLabel, t["hp.waPlanIntent"], t["hp.waHello"])}
            target="_blank"
            rel="noreferrer"
          >
            {t["hp.requestPlan"]}
          </a>
        </div>
      </div>
    </article>
  );
}
