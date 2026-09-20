import type { ReactNode } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { Check, Clock, Stethoscope, BedDouble } from "lucide-react";
import type { CostArticle } from "@/data/cost-articles/types";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import type { Treatment } from "@/lib/treatments";

export function CostHero({
  article,
  treatment,
  place = "India",
  country = "India",
  countryLabel,
  eyebrow,
  priceRange,
  stay,
  heading,
  lede,
  subtitle,
  consultHref,
  hospitalsHref,
  doctorsHref,
  children,
}: {
  article: CostArticle;
  treatment: Treatment;
  place?: string;
  /** Taxonomy country name, used for the breadcrumb links. */
  country?: string;
  /** Country name as the CMS writes it, used in visible copy. */
  countryLabel?: string;
  eyebrow?: string;
  /** Planning band for this country. Defaults to the catalog's India partner range. */
  priceRange?: string;
  stay?: string;
  heading: string;
  lede?: string;
  /** Short procedure-specific line immediately under the H1. */
  subtitle?: string;
  consultHref: string;
  hospitalsHref: string;
  doctorsHref?: string;
  children?: ReactNode;
}) {
  const countryName = countryLabel ?? country;
  const range = priceRange ?? treatment.partnerRange;
  const stayLabel = stay ?? treatment.stay;
  const procedurePath = costsFilterPath({
    destination: country,
    specialty: catalogSpecialtyName(treatment),
    procedure: treatment.name,
  });
  const trail = place.replace(`, ${countryName}`, "");
  return (
    <section className="cost-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="cost-hero__grid">
          <div className="cost-hero__copy">
            <nav aria-label="Breadcrumb" className="cost-crumbs">
              <Link href={costsFilterPath({ destination: country })}>{countryName}</Link>
              <span aria-hidden>›</span>
              <Link href={costsFilterPath({ destination: country, specialty: catalogSpecialtyName(treatment) })}>
                {catalogSpecialtyName(treatment)}
              </Link>
              <span aria-hidden>›</span>
              <Link href={procedurePath}>{article.briefName || article.procedure}</Link>
              {place !== countryName ? (
                <>
                  <span aria-hidden>›</span>
                  <span>{trail}</span>
                </>
              ) : null}
            </nav>
            <p className="cost-hero__eyebrow">{eyebrow ?? `${countryName} planning ranges`}</p>
            <h1 className="cost-hero__title">{heading}</h1>
            {subtitle ? <p className="cost-hero__subtitle">{subtitle}</p> : null}
          </div>
          <aside className="cost-price">
            <p className="cost-price__kicker">{place}</p>
            <p className="cost-price__num">{range}</p>
            <p className="cost-price__sub">Typical international-patient hospital package</p>
            <p className="cost-price__note">
              Indicative estimate. Final cost depends on hospital, specialist, treatment plan and clinical
              requirements.
            </p>
          </aside>
          <div className="cost-hero__meta">
            {lede && !subtitle ? <p className="cost-hero__lede">{lede}</p> : null}
            <p className="cost-hero__facts">
              <span>
                <BedDouble className="size-4" />
                {stayLabel} typical hospital stay
              </span>
              {article.duration ? (
                <span>
                  <Clock className="size-4" />
                  {treatment.specialtySlug === "medical-oncology"
                    ? "Treatment timeline"
                    : "Procedure duration"}: {article.duration}
                </span>
              ) : null}
              <span>
                <Stethoscope className="size-4" />
                Doctor review recommended before travel
              </span>
            </p>
            <div className="cost-hero__actions">
              <Link href={consultHref} className="cost-btn cost-btn--primary">
                Get a Personalized Cost Estimate
              </Link>
              <Link href={hospitalsHref} className="cost-btn cost-btn--ghost">
                Compare Hospitals
              </Link>
              {doctorsHref ? (
                <Link href={doctorsHref} className="cost-btn cost-btn--ghost">
                  Find Doctors
                </Link>
              ) : null}
            </div>
            <p className="cost-trust">
              <span>
                <Check className="size-3.5" /> No obligation
              </span>
              <span>
                <Check className="size-3.5" /> Doctor review
              </span>
              <span>
                <Check className="size-3.5" /> Hospital options
              </span>
              <span>
                <Check className="size-3.5" /> International patient support
              </span>
            </p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
