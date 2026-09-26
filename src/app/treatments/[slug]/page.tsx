import type { Metadata } from "next";
import { costPath } from "@/lib/catalog-links";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { DoctorCard } from "@/components/doctor-card";
import { HospitalCard } from "@/components/hospital-card";
import { LocaleLink as Link } from "@/components/locale-link";
import { MarkdownBody } from "@/components/markdown-body";
import {
  publishedCuratedTreatments,
  resolvePublishedCuratedTreatment,
} from "@/lib/cms/curated-treatment-store";
import type { CuratedTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { LOCALES, type AppLocale } from "@/lib/i18n/languages";
import {
  localizedAbsoluteUrl,
  withLocaleMetadata,
} from "@/lib/i18n/metadata";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { treatmentUi } from "@/lib/i18n/treatment-ui";
import { whatsappHref } from "@/lib/site";
import { getCountry, getSpecialty } from "@/lib/taxonomy";
import { catalogTreatments } from "@/lib/treatments";
import { treatmentEditorialBodyForDisplay } from "@/lib/curated-treatment-editorial";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const treatment = resolvePublishedCuratedTreatment(slug, locale);
  if (!treatment) {
    return { robots: { index: false, follow: false } };
  }
  const copy = treatment.translations[locale]!;
  const title = copy.seoTitle || copy.name;
  const description = copy.metaDescription || copy.shortDescription;
  return withLocaleMetadata(
    {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: treatment.image
          ? [{ url: treatment.image, alt: copy.imageAlt || copy.name }]
          : undefined,
      },
    },
    `/treatments/${treatment.slug}`,
    locale,
    LOCALES,
  );
}

function structuredData(
  slug: string,
  copy: CuratedTreatmentTranslation,
  specialtyName: string,
  locale: AppLocale,
) {
  const url = localizedAbsoluteUrl(`/treatments/${slug}`, locale);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "MedicalProcedure",
      "@id": `${url}#treatment`,
      name: copy.name,
      description: copy.metaDescription || copy.shortDescription,
      url,
      procedureType: copy.treatmentType || undefined,
      bodyLocation: undefined,
      inLanguage: locale,
      relevantSpecialty: specialtyName || undefined,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "GAF Healthcare",
          item: localizedAbsoluteUrl("/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Treatments",
          item: localizedAbsoluteUrl("/treatments", locale),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.name,
          item: url,
        },
      ],
    },
  ];
  if (copy.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: copy.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function TreatmentProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const treatment = resolvePublishedCuratedTreatment(slug, locale);
  if (!treatment) notFound();
  if (slug !== treatment.slug) {
    redirect(localePath(`/treatments/${treatment.slug}`, locale));
  }

  const copy = treatment.translations[locale]!;
  const ui = treatmentUi(locale);
  const specialty = getSpecialty(treatment.specialtySlug);
  const destinations = treatment.destinationSlugs
    .map((destinationSlug) => getCountry(destinationSlug))
    .filter((row) => row !== undefined);
  const doctorsBySlug = new Map(
    doctorsForLocale(locale).map((row) => [row.slug, row]),
  );
  const hospitalsBySlug = new Map(
    hospitalsForLocale(locale).map((row) => [row.slug, row]),
  );
  const doctors = treatment.doctorSlugs
    .map((doctorSlug) => doctorsBySlug.get(doctorSlug))
    .filter((row) => row !== undefined);
  const hospitals = treatment.hospitalSlugs
    .map((hospitalSlug) => hospitalsBySlug.get(hospitalSlug))
    .filter((row) => row !== undefined);
  const costs =
    locale === "en"
      ? treatment.costPageSlugs
          .map((costSlug) =>
            catalogTreatments.find((row) => row.slug === costSlug),
          )
          .filter((row) => row !== undefined)
      : [];
  const relatedBySlug = new Map(
    publishedCuratedTreatments(locale).map((row) => [row.slug, row]),
  );
  const related = treatment.relatedTreatmentSlugs
    .map((relatedSlug) => relatedBySlug.get(relatedSlug))
    .filter((row) => row !== undefined);
  const keyInformation = [
    [ui.treatmentType, copy.treatmentType],
    [ui.specialty, taxonomyLabel(specialty?.name, locale)],
    [ui.subspecialty, treatment.subspecialty],
    [ui.hospitalStay, copy.hospitalStay],
    [ui.recoveryPeriod, copy.recoveryPeriod],
    [ui.treatmentSetting, copy.treatmentSetting],
    [ui.technology, copy.technology],
  ].filter(([, value]) => value);
  const schema = structuredData(
    treatment.slug,
    copy,
    taxonomyLabel(specialty?.name, locale),
    locale,
  );
  const specialtyLabel = taxonomyLabel(specialty?.name, locale);
  const heroFactCount = [
    specialtyLabel,
    copy.treatmentType,
    copy.hospitalStay,
    copy.recoveryPeriod,
    destinations.length > 0 ? "destinations" : "",
  ].filter(Boolean).length;
  const sectionNavigation = [
    { href: "#treatment-guide", label: ui.overview, visible: true },
    { href: "#treatment-process", label: ui.process, visible: copy.process.length > 0 },
    { href: "#treatment-destinations", label: ui.destinations, visible: destinations.length > 0 },
    { href: "#treatment-hospitals", label: ui.hospitals, visible: hospitals.length > 0 },
    { href: "#treatment-doctors", label: ui.doctors, visible: doctors.length > 0 },
    { href: "#treatment-costs", label: ui.costGuides, visible: costs.length > 0 },
    { href: "#treatment-faqs", label: ui.faqs, visible: copy.faqs.length > 0 },
    { href: "#related-treatments", label: ui.related, visible: related.length > 0 },
  ].filter((item) => item.visible);

  return (
    <main className="treatment-profile">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="treatment-profile__hero">
        {treatment.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={treatment.image}
              alt={copy.imageAlt || copy.name}
              className="treatment-profile__hero-image"
            />
            <div className="treatment-profile__hero-shade" />
          </>
        ) : null}
        <div className="page-wrap treatment-profile__hero-content">
          <nav className="treatment-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">{ui.breadcrumbsHome}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/treatments">{ui.treatments}</Link>
            <span aria-hidden="true">/</span>
            <span>{copy.name}</span>
          </nav>
          <div
            className={`treatment-profile__hero-grid ${
              heroFactCount < 2 ? "treatment-profile__hero-grid--single" : ""
            }`}
          >
            <div>
              <p className="eyebrow">
                {specialtyLabel}
                {treatment.subspecialty ? ` · ${treatment.subspecialty}` : ""}
              </p>
              <h1>{copy.name}</h1>
              <p className="treatment-profile__lede">{copy.shortDescription}</p>
              <a
                href={whatsappHref(copy.name)}
                target="_blank"
                rel="noreferrer"
                className="treatment-profile__primary"
              >
                {ui.coordinator} <ArrowRight className="size-4 icon-forward" />
              </a>
            </div>
            {heroFactCount >= 2 ? (
              <aside className="treatment-profile__hero-card">
              <p>{ui.keyInformation}</p>
              <dl>
                {specialtyLabel ? (
                  <div>
                    <dt>{ui.specialty}</dt>
                    <dd>{specialtyLabel}</dd>
                  </div>
                ) : null}
                {copy.treatmentType ? (
                  <div>
                    <dt>{ui.treatmentType}</dt>
                    <dd>{copy.treatmentType}</dd>
                  </div>
                ) : null}
                {copy.hospitalStay ? (
                  <div>
                    <dt>{ui.hospitalStay}</dt>
                    <dd>{copy.hospitalStay}</dd>
                  </div>
                ) : null}
                {copy.recoveryPeriod ? (
                  <div>
                    <dt>{ui.recoveryPeriod}</dt>
                    <dd>{copy.recoveryPeriod}</dd>
                  </div>
                ) : null}
                {destinations.length > 0 ? (
                  <div>
                    <dt>{ui.destinations}</dt>
                    <dd>
                      {destinations
                        .map((destination) =>
                          taxonomyLabel(destination.name, locale),
                        )
                        .join(" · ")}
                    </dd>
                  </div>
                ) : null}
              </dl>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <nav className="treatment-page-nav" aria-label={ui.treatments}>
        <div className="page-wrap">
          {sectionNavigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="treatment-guide-shell">
        <div className="page-wrap treatment-profile__content">
          <article className="treatment-article" id="treatment-guide">
          <section className="treatment-article__section treatment-article__intro">
            <p className="eyebrow">{ui.overview}</p>
            <MarkdownBody source={treatmentEditorialBodyForDisplay(copy, locale)} />
          </section>

          {copy.process.length > 0 ? (
            <section className="treatment-article__section" id="treatment-process">
              <h2>{ui.process}</h2>
              <ol className="treatment-process">
                {copy.process.map((step, index) => (
                  <li key={step.id}>
                    <span>{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      {step.description ? <p>{step.description}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          </article>

          {keyInformation.length > 0 ? (
            <aside className="treatment-key-info">
              <h2>{ui.keyInformation}</h2>
              <dl>
                {keyInformation.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={whatsappHref(copy.name)}
                target="_blank"
                rel="noreferrer"
              >
                {ui.coordinator} <ArrowRight className="size-4 icon-forward" />
              </a>
            </aside>
          ) : null}
        </div>
      </section>

      {destinations.length > 0 ? (
        <section
          className="treatment-related-section treatment-destinations"
          id="treatment-destinations"
        >
          <div className="page-wrap">
            <p className="eyebrow">{ui.destinations}</p>
            <h2>{ui.destinations}</h2>
            <ul>
              {destinations.map((destination) => (
                <li key={destination.slug}>
                  <MapPin className="size-5" aria-hidden="true" />
                  {taxonomyLabel(destination.name, locale)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {hospitals.length > 0 ? (
        <section className="treatment-related-section" id="treatment-hospitals">
          <div className="page-wrap">
            <p className="eyebrow">{ui.hospitals}</p>
            <h2>{ui.hospitals}</h2>
            <div className="treatment-related-list">
              {hospitals.map((hospital) => (
                <HospitalCard key={hospital.slug} hospital={hospital} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {doctors.length > 0 ? (
        <section
          className="treatment-related-section treatment-related-section--soft"
          id="treatment-doctors"
        >
          <div className="page-wrap">
            <p className="eyebrow">{ui.doctors}</p>
            <h2>{ui.doctors}</h2>
            <div className="treatment-related-list">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {costs.length > 0 ? (
        <section
          className="treatment-related-section treatment-related-section--ink"
          id="treatment-costs"
        >
          <div className="page-wrap">
            <p className="eyebrow">{ui.costGuides}</p>
            <h2>{ui.costGuides}</h2>
            <p>{ui.costLede}</p>
            <div className="treatment-cost-grid">
              {costs.map((cost) => (
                <article key={cost.slug}>
                  <h3>{cost.name}</h3>
                  <p>{cost.summary}</p>
                  <Link href={costPath(cost.name)}>
                    {ui.viewCost} <ArrowRight className="size-4 icon-forward" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {copy.faqs.length > 0 ? (
        <section className="treatment-related-section" id="treatment-faqs">
          <div className="page-wrap treatment-faqs">
            <p className="eyebrow">{ui.faqs}</p>
            <h2>{ui.faqs}</h2>
            {copy.faqs.map((faq) => (
              <details key={faq.id}>
                <summary>
                  {faq.question} <ChevronDown className="size-4" aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section
          className="treatment-related-section treatment-related-section--soft"
          id="related-treatments"
        >
          <div className="page-wrap">
            <p className="eyebrow">{ui.related}</p>
            <h2>{ui.related}</h2>
            <div className="treatment-related-treatment-grid">
              {related.map((row) => (
                <Link key={row.slug} href={`/treatments/${row.slug}`}>
                  <span>{row.translations[locale]!.name}</span>
                  <ArrowRight className="size-4 icon-forward" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
