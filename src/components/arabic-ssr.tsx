import type { CatalogQuery } from "@/lib/catalog";
import {
  campusLocation,
  designationLabel,
  experienceBadge,
  keyProcedureLabels,
  listingBio,
} from "@/lib/doctor-profile";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import type { Doctor } from "@/lib/doctors";
import type { AppLocale } from "@/lib/i18n/languages";
import { medicalPhrase } from "@/lib/i18n/medical-phrases";
import { localePath } from "@/lib/i18n/path";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";
import { consultToWhatsappHref } from "@/lib/site";

export function arHref(path: string) {
  return localePath(path, "ar");
}

/** JSON-LD for a page already known to be published. Avoids extra async header reads. */
export function SsrJsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function ArabicDoctorSsrCard({ doctor }: { doctor: Doctor }) {
  const messages = uiCatalogFor("ar");
  const profileHref = arHref(`/doctors/${doctor.slug}`);
  const hospitalHref = arHref(`/hospitals/${doctor.hospitalSlug}`);
  const consultHref = consultToWhatsappHref(`/consult?doctor=${doctor.slug}`);
  const bio = listingBio(doctor);
  const procedures = keyProcedureLabels(doctor).map((item) => medicalPhrase(item, "ar"));
  const shown = procedures.slice(0, 6);
  const extra = procedures.length - shown.length;
  const experience = experienceBadge(doctor);
  const designation = designationLabel(doctor);
  const location = campusLocation(doctor, undefined, "ar");

  return (
    <article className="dcard">
      <div className="dcard__top">
        <div className="dcard__avatar">
          {/* Plain img so the portrait is in the HTML document, not a client image runtime. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doctor.image || "/doctors/avatar-placeholder.webp"}
            alt={doctor.imageAlt || doctor.name}
            width={108}
            height={108}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="dcard__id">
          <div className="dcard__name-row">
            <h2 className="dcard__name">
              <a href={profileHref}>{doctor.name}</a>
              {doctor.featured ? (
                <span className="dcard__chip" aria-label={messages["card.featured"]}>
                  مميز
                </span>
              ) : null}
            </h2>
            <span className="dcard__chip">{taxonomyLabel(doctor.specialty, "ar")}</span>
          </div>
          <p className="dcard__role">{doctor.title}</p>
          <ul className="dcard__facts">
            {experience ? <li>{experience}</li> : null}
            <li>{messages["card.designation"].replace("{title}", designation)}</li>
            {doctor.qualifications ? (
              <li>
                <span dir="ltr">{doctor.qualifications}</span>
              </li>
            ) : null}
            {doctor.education.filter(Boolean).slice(0, 3).map((line, index) => (
              <li key={`${line}-${index}`}>
                <span dir="ltr">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dcard__aside">
          <a href={hospitalHref} className="dcard__hosp">
            <span>
              <strong>{doctor.hospitalName}</strong>
              {location ? <span>{location}</span> : null}
            </span>
          </a>
          <div className="dcard__cta">
            <a href={profileHref} className="dcard__btn dcard__btn--book">
              {messages["card.viewProfile"]}
            </a>
            <a
              href={consultHref}
              className="dcard__btn dcard__btn--consult"
              target="_blank"
              rel="noreferrer noopener"
            >
              {messages["card.requestConsult"]}
            </a>
          </div>
        </div>
      </div>

      <div className="dcard__bottom">
        <div className="dcard__about">
          {bio ? <p className="dcard__bio">{bio}</p> : null}
          <a href={profileHref} className="dcard__more">
            {messages["card.viewProfile"]}
          </a>
        </div>

        {procedures.length > 0 ? (
          <div className="dcard__procs">
            <p>{messages["card.keyProcedures"]}</p>
            <ul>
              {shown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {extra > 0 ? <p>و{extra} إجراءات أخرى على الملف</p> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function visiblePages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const want = new Set([1, total, current - 1, current, current + 1]);
  return [...want].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
}

export function ArabicSsrPager({
  page,
  totalPages,
  query,
  basePath,
  label,
  previousLabel = "السابق",
  nextLabel = "التالي",
  locale = "ar",
}: {
  page: number;
  totalPages: number;
  query?: CatalogQuery;
  basePath: CatalogBasePath;
  label: string;
  previousLabel?: string;
  nextLabel?: string;
  locale?: AppLocale;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(nextPage: number) {
    const path = prettyCatalogPath(basePath, query ?? {});
    const suffix = nextPage > 1 ? `?page=${nextPage}` : "";
    return localePath(`${path}${suffix}`, locale);
  }

  const nums = visiblePages(page, totalPages);

  return (
    <nav className="hosp-pager" aria-label={label}>
      {page > 1 ? (
        <a href={hrefFor(page - 1)} className="hosp-pager__btn">
          {previousLabel}
        </a>
      ) : (
        <span className="hosp-pager__btn is-disabled">{previousLabel}</span>
      )}
      <ol className="hosp-pager__pages">
        {nums.map((n, i) => {
          const prev = nums[i - 1];
          const gap = prev && n - prev > 1;
          return (
            <li key={n} className="flex items-center gap-1">
              {gap ? <span className="hosp-pager__ellipsis">…</span> : null}
              {n === page ? (
                <span className="hosp-pager__num is-current" aria-current="page">
                  {n}
                </span>
              ) : (
                <a href={hrefFor(n)} className="hosp-pager__num">
                  {n}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      {page < totalPages ? (
        <a href={hrefFor(page + 1)} className="hosp-pager__btn hosp-pager__btn--next">
          {nextLabel}
        </a>
      ) : (
        <span className="hosp-pager__btn is-disabled">{nextLabel}</span>
      )}
    </nav>
  );
}
