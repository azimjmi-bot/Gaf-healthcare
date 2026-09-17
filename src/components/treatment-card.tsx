import { ArrowUpRight, MapPin } from "lucide-react";
import { LocaleLink as Link } from "@/components/locale-link";
import type { CuratedTreatment } from "@/lib/cms/curated-treatment-types";
import type { AppLocale } from "@/lib/i18n/languages";
import { treatmentUi } from "@/lib/i18n/treatment-ui";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { getCountry, getSpecialty } from "@/lib/taxonomy";

export function TreatmentCard({
  treatment,
  locale,
}: {
  treatment: CuratedTreatment;
  locale: AppLocale;
}) {
  const copy = treatment.translations[locale]!;
  const ui = treatmentUi(locale);
  const specialty = getSpecialty(treatment.specialtySlug);
  const destinations = treatment.destinationSlugs
    .map((slug) => getCountry(slug))
    .filter((row) => row !== undefined);

  return (
    <article className="treatment-card">
      {treatment.image ? (
        <Link
          href={`/treatments/${treatment.slug}`}
          className="treatment-card__image"
          aria-label={copy.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={treatment.image}
            alt={copy.imageAlt || copy.name}
            loading="lazy"
          />
        </Link>
      ) : (
        <div className="treatment-card__image treatment-card__image--empty" />
      )}
      <div className="treatment-card__body">
        <div className="treatment-card__meta">
          <span>
            {taxonomyLabel(specialty?.name, locale)}
          </span>
          {treatment.featured ? <em>{ui.featured}</em> : null}
        </div>
        <h2>
          <Link href={`/treatments/${treatment.slug}`}>{copy.name}</Link>
        </h2>
        <p>{copy.shortDescription}</p>
        {destinations.length > 0 ? (
          <div className="treatment-card__destinations">
            <MapPin className="size-4" aria-hidden="true" />
            <span>
              {ui.availableIn}:{" "}
              {destinations
                .map((destination) =>
                  taxonomyLabel(destination?.name, locale),
                )
                .join(" · ")}
            </span>
          </div>
        ) : null}
        <Link
          href={`/treatments/${treatment.slug}`}
          className="treatment-card__link"
        >
          {ui.viewTreatment} <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
