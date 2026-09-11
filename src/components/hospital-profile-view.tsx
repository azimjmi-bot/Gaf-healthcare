import { LocaleLink as Link } from "@/components/locale-link";
import {
  Activity,
  Ambulance,
  Award,
  BedDouble,
  Bone,
  Brain,
  Building2,
  CalendarCheck,
  Car,
  ChevronRight,
  Droplets,
  Ear,
  Eye,
  FileCheck,
  FolderOpen,
  HeartPulse,
  Home,
  Languages,
  Lock,
  MapPin,
  Microscope,
  Plane,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  UserRound,
  Video,
  Wallet,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { HospitalGalleryButton } from "@/components/hospital-gallery";
import { HospitalSectionNav } from "@/components/hospital-section-nav";
import { MarkdownBody } from "@/components/markdown-body";
import { CtaBand } from "@/components/page-shell";
import { publicMarkdown } from "@/lib/markdown";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import {
  doctorInitials,
  featuredDoctors,
  featuredSpecialties,
  groupFaculty,
  isEyeCampus,
  popularTreatments,
  yearsLabelLocalized,
} from "@/lib/hospital-profile";
import { hospitalsPath } from "@/lib/catalog-links";
import type { AppLocale } from "@/lib/i18n/languages";
import {
  bedsLabelLocalized,
  cityTravelLocalized,
  featureBarLocalized,
  fromUsdLocalized,
  heroLedeLocalized,
  hospitalFaqsLocalized,
  infrastructureLocalized,
  internationalServicesLocalized,
  peopleNounLocalized,
  pullQuoteLocalized,
  specialtyBlurbLocalized,
  whyChooseLocalized,
} from "@/lib/i18n/hospital-copy";
import { interpolate } from "@/lib/i18n/messages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { site } from "@/lib/site";

const SPECIALTY_ICON: Record<string, LucideIcon> = {
  "radiation-oncology": ScanEye,
  "surgical-oncology": Activity,
  "medical-oncology": Syringe,
  hematology: Droplets,
  "pediatric-hematology": UserRound,
  "cardiac-surgery": HeartPulse,
  "pediatric-cardiac-surgery": HeartPulse,
  cardiology: HeartPulse,
  "bariatric-surgery": Activity,
  "cosmetic-surgery": Sparkles,
  ent: Ear,
  gastroenterology: Stethoscope,
  "surgical-gastroenterology": Stethoscope,
  urology: Droplets,
  "spine-surgery": Bone,
  pulmonology: Wind,
  "pediatric-orthopaedic": Bone,
  orthopedics: Bone,
  ophthalmology: Eye,
  gynecology: Sparkles,
  neurosurgery: Brain,
  neurology: Brain,
  nephrology: Droplets,
};

const INTL_ICON: Record<string, LucideIcon> = {
  visa: FileCheck,
  travel: Plane,
  airport: Car,
  interpreters: Languages,
  companion: BedDouble,
  records: FolderOpen,
  cost: Wallet,
  after: Home,
};

function IconFor({ slug, className }: { slug: string; className?: string }) {
  const Icon = SPECIALTY_ICON[slug] ?? Building2;
  return <Icon className={className} />;
}

export function HospitalProfileView({
  hospital,
  faculty,
  pathways,
  nearby,
  locale = "en",
}: {
  hospital: Hospital;
  faculty: Doctor[];
  pathways: Treatment[];
  nearby: Hospital[];
  locale?: AppLocale;
}) {
  const groups = groupFaculty(faculty, pathways);
  const facultyGroups = groups.filter((g) => g.doctors.length > 0);
  const specialtyCards = featuredSpecialties(facultyGroups.length ? facultyGroups : groups, 6);
  const popular = popularTreatments(groups, 5);
  const topDoctors = featuredDoctors(faculty, 4);
  const moreProcedures = Math.max(0, pathways.length - popular.length);
  const moreDoctors = Math.max(0, faculty.length - topDoctors.length);
  const travel = cityTravelLocalized(hospital, locale);
  const beds = bedsLabelLocalized(hospital.beds, locale);
  const why = whyChooseLocalized(hospital, faculty.length, locale);
  const features = featureBarLocalized(hospital, locale);
  const infra = infrastructureLocalized(hospital, locale);
  const intl = internationalServicesLocalized(locale);
  const faqs = hospitalFaqsLocalized(hospital, faculty, groups, locale);
  const eye = isEyeCampus(hospital);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(travel.mapsQuery)}`;
  const tel = site.phone.replace(/[^\d+]/g, "");
  const t = uiCatalogFor(locale);
  const cityLabel = taxonomyLabel(hospital.city, locale);
  const countryLabel = taxonomyLabel(hospital.country, locale);

  const nav = [
    { id: "overview", label: t["hp.nav.overview"] },
    { id: "specialties", label: t["hp.nav.specialties"] },
    { id: "procedures", label: t["hp.nav.procedures"] },
    { id: "doctors", label: t["hp.nav.doctors"] },
    { id: "infrastructure", label: t["hp.nav.infrastructure"] },
    { id: "international", label: t["hp.nav.international"] },
    { id: "faqs", label: t["hp.nav.faqs"] },
    { id: "location", label: t["hp.nav.location"] },
  ];

  return (
    <div className="hospital-profile">
      <section className="hp-hero">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label={t["hp.crumbAria"]}>
            <Link href="/">{t["hp.home"]}</Link>
            <span>/</span>
            <Link href="/hospitals">{t["hp.hospitals"]}</Link>
            <span>/</span>
            <Link href={hospitalsPath({ destination: hospital.country })}>
              {countryLabel}
            </Link>
            <span>/</span>
            <Link href={hospitalsPath({ destination: hospital.country, city: hospital.city })}>
              {cityLabel}
            </Link>
            <span>/</span>
            <span aria-current="page">{hospital.name}</span>
          </nav>

          <div className="hp-hero__grid">
            <div>
              <h1 className="hp-hero__title">{hospital.name}</h1>
              <p className="hp-hero__place">
                {cityLabel}, {countryLabel}
              </p>
              <p className="hp-hero__lede">{heroLedeLocalized(hospital, locale)}</p>
              <AccreditationSeals accreditation={hospital.accreditation} />
              <ul className="hp-badges">
                {beds ? (
                  <li>
                    <BedDouble className="size-3.5" />
                    {beds}
                  </li>
                ) : null}
                {hospital.established ? (
                  <li>
                    <CalendarCheck className="size-3.5" />
                    {interpolate(t["hp.est"], { year: hospital.established })}
                  </li>
                ) : null}
              </ul>
              <div className="hp-hero__cta">
                <Button asChild className="hp-btn-primary">
                  <Link href={`/consult?hospital=${hospital.slug}`}>{t["hp.plan"]}</Link>
                </Button>
                <Button asChild variant="outline" className="hp-btn-secondary">
                  <a href={`tel:${tel}`}>
                    <span className="inline-flex items-center gap-2">{t["hp.talk"]}</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="hp-hero__visual">
              <HospitalCampusVisual hospital={hospital} className="hp-hero__art" />
              <HospitalGalleryButton hospital={hospital} locale={locale} label={t["hp.photos"]} />
            </div>
          </div>
        </div>
        <div className="hp-featurebar">
          <div className="hp-wrap hp-featurebar__row">
            {features.map((f) => (
              <p key={f.label} className="hp-featurebar__item">
                {f.label}
              </p>
            ))}
          </div>
        </div>
      </section>

      <HospitalSectionNav items={nav} />

      <section id="overview" className="hp-section scroll-mt-28">
        <div className="hp-wrap hp-about">
          <div>
            <p className="eyebrow">{t["hp.overview"]}</p>
            <h2>{t["hp.about"]}</h2>
            <MarkdownBody source={publicMarkdown(hospital.bio)} className="hp-prose md-body--profile" />
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <a href="#procedures">{t["hp.seeProcedures"]}</a>
            </Button>
            <dl className="hp-statrow">
              {beds ? (
                <div>
                  <dt>{t["hp.beds"]}</dt>
                  <dd>{hospital.beds}</dd>
                </div>
              ) : null}
              {hospital.established ? (
                <div>
                  <dt>{t["hp.opened"]}</dt>
                  <dd>{hospital.established}</dd>
                </div>
              ) : null}
              <div>
                <dt>{t["hp.accreditation"]}</dt>
                <dd>
                  <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
                </dd>
              </div>
              <div>
                <dt>{t["hp.languages"]}</dt>
                <dd>{hospital.languages}</dd>
              </div>
            </dl>
          </div>
          <figure className="hp-quote">
            <HospitalCampusVisual hospital={hospital} className="hp-quote__art" />
            <blockquote>
              <p>{pullQuoteLocalized(hospital, locale)}</p>
              <footer>{hospital.name}</footer>
            </blockquote>
          </figure>
        </div>
        <div className="hp-wrap">
          <h3 className="hp-subhead">{t["hp.why"]}</h3>
          <ul className="hp-why">
            {why.map((card, i) => {
              const Icon = [UserRound, ShieldCheck, HeartPulse, Languages, Plane, Video][i] ?? Award;
              return (
                <li key={card.title}>
                  <Icon className="hp-why__icon" />
                  <p className="hp-why__title">{card.title}</p>
                  <p>{card.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="specialties" className="hp-section hp-section--tint scroll-mt-28">
        <div className="hp-wrap">
          <p className="eyebrow">{t["hp.departments"]}</p>
          <h2>{eye ? t["hp.eyeCare"] : t["hp.specialtiesOn"]}</h2>
          <p className="hp-prose">{eye ? t["hp.eyeLede"] : t["hp.specLede"]}</p>
          <ul className="hp-spec-row">
            {specialtyCards.map((g) => (
              <li key={g.slug} className="hp-spec-card">
                <span className="hp-spec-card__icon">
                  <IconFor slug={g.slug} className="size-6" />
                </span>
                <h3>{taxonomyLabel(g.name, locale)}</h3>
                <p>{specialtyBlurbLocalized(g.slug, locale)}</p>
                <Link href={`/hospitals/${hospital.slug}/doctors#doctors-${g.slug}`}>
                  {g.doctors.length
                    ? interpolate(t["hp.viewPeople"], {
                        people: peopleNounLocalized(g.slug, g.doctors.length, locale),
                      })
                    : t["hp.askMatch"]}
                </Link>
              </li>
            ))}
          </ul>
          {facultyGroups.length > specialtyCards.length ? (
            <p className="mt-6">
              <Link href={`/hospitals/${hospital.slug}/doctors`} className="hp-viewall">
                {t["hp.viewDepartments"]}
                <ChevronRight className="size-4" />
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section id="procedures" className="hp-section scroll-mt-28">
        <div className="hp-wrap hp-split">
          <div>
            <div className="hp-box-head">
              <div>
                <p className="eyebrow">{t["hp.planningRanges"]}</p>
                <h2>{t["hp.popular"]}</h2>
              </div>
              <Link href={`/hospitals/${hospital.slug}/procedures`} className="hp-viewall">
                {t["hp.viewAllProcedures"]}
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <p className="hp-note">{t["hp.procNote"]}</p>
            {popular.length === 0 ? (
              <p className="mt-6 text-muted-foreground">{t["hp.procEmpty"]}</p>
            ) : (
              <ul className="hp-proc-list">
                {popular.map((row) => (
                  <li key={row.treatment.slug}>
                    <span className="hp-thumb">
                      <IconFor slug={row.specialtySlug} className="size-5" />
                    </span>
                    <div>
                      <Link href={`/costs/${row.treatment.slug}`}>
                        {taxonomyLabel(row.treatment.name, locale)}
                      </Link>
                      <p>{taxonomyLabel(row.specialty, locale)}</p>
                    </div>
                    <strong>{fromUsdLocalized(row.treatment.partnerRange, locale)}</strong>
                    <Link
                      href={`/costs/${row.treatment.slug}`}
                      className="hp-row-arrow"
                      aria-label={interpolate(t["hp.costAria"], {
                        name: taxonomyLabel(row.treatment.name, locale),
                      })}
                    >
                      <ChevronRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {moreProcedures > 0 ? (
              <p className="hp-more">
                {interpolate(t["hp.moreProcs"], {
                  count: moreProcedures,
                  noun: moreProcedures === 1 ? t["hp.procedureOne"] : t["hp.procedureMany"],
                })}{" "}
                <Link href={`/hospitals/${hospital.slug}/procedures`}>{t["hp.viewAllProcedures"]}</Link>.
              </p>
            ) : null}
          </div>
          <div id="doctors" className="scroll-mt-28">
            <div className="hp-box-head">
              <div>
                <p className="eyebrow">{t["hp.faculty"]}</p>
                <h2>{t["hp.topDoctors"]}</h2>
              </div>
              <Link href={`/hospitals/${hospital.slug}/doctors`} className="hp-viewall">
                {t["hp.viewAllDoctors"]}
                <ChevronRight className="size-4" />
              </Link>
            </div>
            {topDoctors.length === 0 ? (
              <p className="mt-6 text-muted-foreground">{t["hp.doctorsEmpty"]}</p>
            ) : (
              <ul className="hp-doc-list">
                {topDoctors.map((d) => (
                  <li key={d.slug}>
                    <span className="hp-avatar" aria-hidden>
                      {doctorInitials(d.name)}
                    </span>
                    <div>
                      <Link href={`/doctors/${d.slug}`}>{d.name}</Link>
                      <p>{d.title}</p>
                      <p className="hp-doc-list__meta">
                        {taxonomyLabel(d.specialty, locale)}
                        {yearsLabelLocalized(d, locale) ? ` · ${yearsLabelLocalized(d, locale)}` : ""}
                      </p>
                    </div>
                    <Link href={`/doctors/${d.slug}`} className="hp-viewall hp-viewall--tight">
                      {t["hp.viewProfile"]}
                      <ChevronRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {moreDoctors > 0 ? (
              <p className="hp-more">
                {interpolate(t["hp.moreDoctors"], {
                  count: moreDoctors,
                  noun: moreDoctors === 1 ? t["hp.doctorOne"] : t["hp.doctorMany"],
                })}{" "}
                <Link href={`/hospitals/${hospital.slug}/doctors`}>{t["hp.viewAllDoctors"]}</Link>.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section id="infrastructure" className="hp-section scroll-mt-28">
        <div className="hp-wrap hp-split">
          <div>
            <p className="eyebrow">{t["hp.campus"]}</p>
            <h2>{t["hp.infra"]}</h2>
            <ul className="hp-infra">
              {infra.map((tile) => (
                <li key={tile.title}>
                  <Microscope className="size-4" />
                  <div>
                    <p>{tile.title}</p>
                    <span>{tile.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="international" className="scroll-mt-28">
            <p className="eyebrow">{t["hp.travel"]}</p>
            <h2>{t["hp.intl"]}</h2>
            <ul className="hp-intl">
              {intl.map((s) => {
                const Icon = INTL_ICON[s.id] ?? Home;
                return (
                  <li key={s.id}>
                    <Icon className="size-5" />
                    <div>
                      <p>{s.title}</p>
                      <span>{s.body}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="hp-support">
              <Ambulance className="size-5" />
              <p>{t["hp.support"]}</p>
              <Link href={`/consult?hospital=${hospital.slug}`}>{t["hp.askHelp"]}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-section hp-section--tint">
        <div className="hp-wrap hp-split">
          <div id="location" className="scroll-mt-28">
            <p className="eyebrow">{t["hp.findUs"]}</p>
            <h2>{t["hp.location"]}</h2>
            <div className="hp-map">
              <HospitalCampusVisual hospital={hospital} className="hp-map__art" />
              <MapPin className="hp-map__pin" />
            </div>
            <p className="mt-4 font-medium">
              {hospital.name}, {cityLabel}, {countryLabel}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {interpolate(t["hp.airport"], { airport: travel.airport, hint: travel.airportHint })}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{travel.centreHint}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="hp-btn-primary">
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  {t["hp.directions"]}
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href={hospitalsPath({ destination: hospital.country, city: hospital.city })}>
                  {interpolate(t["hp.otherCampuses"], { city: cityLabel })}
                </Link>
              </Button>
            </div>
          </div>
          <div id="faqs" className="scroll-mt-28">
            <p className="eyebrow">{t["hp.questions"]}</p>
            <h2>{t["hp.faqs"]}</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {nearby.length > 0 ? (
        <section className="hp-section">
          <div className="hp-wrap">
            <h2>{interpolate(t["hp.otherCampuses"], { city: cityLabel })}</h2>
            <ul className="hp-nearby">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={`/hospitals/${n.slug}`}>
                    <p>{n.name}</p>
                    <AccreditationSeals accreditation={n.accreditation} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="hp-journey">
        <div className="hp-wrap">
          <h2>{t["hp.journey"]}</h2>
          <p>{t["hp.journeyLede"]}</p>
          <Button asChild className="hp-btn-gold">
            <Link href={`/consult?hospital=${hospital.slug}`}>{t["hp.getPlan"]}</Link>
          </Button>
          <ul className="hp-trust">
            <li>
              <CalendarCheck className="size-4" />
              {t["hp.trust1"]}
            </li>
            <li>
              <UserRound className="size-4" />
              {t["hp.trust2"]}
            </li>
            <li>
              <ShieldCheck className="size-4" />
              {t["hp.trust3"]}
            </li>
            <li>
              <Lock className="size-4" />
              {t["hp.trust4"]}
            </li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
