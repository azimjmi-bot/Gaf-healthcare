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
import { CtaBand } from "@/components/page-shell";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import {
  aboutParagraphs,
  bedsLabel,
  cityTravel,
  doctorInitials,
  featuredDoctors,
  featuredSpecialties,
  featureBar,
  fromUsd,
  groupFaculty,
  heroLede,
  hospitalFaqs,
  infrastructure,
  internationalServices,
  isEyeCampus,
  peopleNoun,
  popularTreatments,
  pullQuote,
  specialtyBlurb,
  whyChoose,
  yearsLabel,
} from "@/lib/hospital-profile";
import { hospitalsPath } from "@/lib/catalog-links";
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

function IconFor({ slug, className }: { slug: string; className?: string }) {
  const Icon = SPECIALTY_ICON[slug] ?? Building2;
  return <Icon className={className} />;
}

export function HospitalProfileView({
  hospital,
  faculty,
  pathways,
  nearby,
}: {
  hospital: Hospital;
  faculty: Doctor[];
  pathways: Treatment[];
  nearby: Hospital[];
}) {
  const groups = groupFaculty(faculty, pathways);
  const facultyGroups = groups.filter((g) => g.doctors.length > 0);
  const specialtyCards = featuredSpecialties(facultyGroups.length ? facultyGroups : groups, 6);
  const popular = popularTreatments(groups, 5);
  const topDoctors = featuredDoctors(faculty, 4);
  const moreProcedures = Math.max(0, pathways.length - popular.length);
  const moreDoctors = Math.max(0, faculty.length - topDoctors.length);
  const travel = cityTravel(hospital);
  const beds = bedsLabel(hospital.beds);
  const about = aboutParagraphs(hospital);
  const why = whyChoose(hospital, faculty.length);
  const features = featureBar(hospital);
  const infra = infrastructure(hospital);
  const intl = internationalServices();
  const faqs = hospitalFaqs(hospital, faculty, groups);
  const eye = isEyeCampus(hospital);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(travel.mapsQuery)}`;
  const tel = site.phone.replace(/[^\d+]/g, "");

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "specialties", label: "Specialties" },
    { id: "procedures", label: "Procedures" },
    { id: "doctors", label: "Doctors" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "international", label: "International patients" },
    { id: "faqs", label: "FAQs" },
    { id: "location", label: "Location" },
  ];

  return (
    <div className="hospital-profile">
      <section className="hp-hero">
        <div className="hp-wrap">
          <nav className="hp-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/hospitals">Hospitals</Link>
            <span>/</span>
            <Link href={hospitalsPath({ destination: hospital.country })}>
              {hospital.country}
            </Link>
            <span>/</span>
            <Link href={hospitalsPath({ destination: hospital.country, city: hospital.city })}>
              {hospital.city}
            </Link>
            <span>/</span>
            <span aria-current="page">{hospital.name}</span>
          </nav>

          <div className="hp-hero__grid">
            <div>
              <h1 className="hp-hero__title">{hospital.name}</h1>
              <p className="hp-hero__place">
                {hospital.city}, {hospital.country}
              </p>
              <p className="hp-hero__lede">{heroLede(hospital)}</p>
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
                    Est. {hospital.established}
                  </li>
                ) : null}
              </ul>
              <div className="hp-hero__cta">
                <Button asChild className="hp-btn-primary">
                  <Link href={`/consult?hospital=${hospital.slug}`}>Get a treatment plan</Link>
                </Button>
                <Button asChild variant="outline" className="hp-btn-secondary">
                  <a href={`tel:${tel}`}>
                    <span className="inline-flex items-center gap-2">
                      Talk to a coordinator
                    </span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="hp-hero__visual">
              <HospitalCampusVisual hospital={hospital} className="hp-hero__art" />
              <HospitalGalleryButton hospital={hospital} />
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
            <p className="eyebrow">Overview</p>
            <h2>About the hospital</h2>
            {about.map((p) => (
              <p key={p.slice(0, 24)} className="hp-prose">
                {p}
              </p>
            ))}
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <a href="#procedures">See procedures on this campus</a>
            </Button>
            <dl className="hp-statrow">
              {beds ? (
                <div>
                  <dt>Beds</dt>
                  <dd>{hospital.beds}</dd>
                </div>
              ) : null}
              {hospital.established ? (
                <div>
                  <dt>Opened</dt>
                  <dd>{hospital.established}</dd>
                </div>
              ) : null}
              <div>
                <dt>Accreditation</dt>
                <dd>
                  <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
                </dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{hospital.languages}</dd>
              </div>
            </dl>
          </div>
          <figure className="hp-quote">
            <HospitalCampusVisual hospital={hospital} className="hp-quote__art" />
            <blockquote>
              <p>{pullQuote(hospital)}</p>
              <footer>{hospital.name}</footer>
            </blockquote>
          </figure>
        </div>
        <div className="hp-wrap">
          <h3 className="hp-subhead">Why families choose this campus</h3>
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
          <p className="eyebrow">Departments</p>
          <h2>{eye ? "Eye care on this campus" : "Specialties on this campus"}</h2>
          <p className="hp-prose">
            {eye
              ? "This house is an eye hospital. Other specialties stay on general campuses — we will not dump a kidney or spine list onto an ophthalmic floor."
              : "A few of the departments this campus actually staffs. The rest live on the full doctor and procedure lists."}
          </p>
          <ul className="hp-spec-row">
            {specialtyCards.map((g) => (
              <li key={g.slug} className="hp-spec-card">
                <span className="hp-spec-card__icon">
                  <IconFor slug={g.slug} className="size-6" />
                </span>
                <h3>{g.name}</h3>
                <p>{specialtyBlurb(g.slug)}</p>
                <Link href={`/hospitals/${hospital.slug}/doctors#doctors-${g.slug}`}>
                  {g.doctors.length
                    ? `View ${peopleNoun(g.slug, g.doctors.length)}`
                    : "Ask for a match"}
                </Link>
              </li>
            ))}
          </ul>
          {facultyGroups.length > specialtyCards.length ? (
            <p className="mt-6">
              <Link href={`/hospitals/${hospital.slug}/doctors`} className="hp-viewall">
                View all departments
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
                <p className="eyebrow">Planning ranges</p>
                <h2>Popular procedures</h2>
              </div>
              <Link href={`/hospitals/${hospital.slug}/procedures`} className="hp-viewall">
                View All Procedures
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <p className="hp-note">Five named lists on this campus. The rest open under View All Procedures. USD figures are planning ranges, not quotes.</p>
            {popular.length === 0 ? (
              <p className="mt-6 text-muted-foreground">
                Procedure sheets for this campus are being filed. A coordinator can still advise from records.
              </p>
            ) : (
              <ul className="hp-proc-list">
                {popular.map((row) => (
                  <li key={row.treatment.slug}>
                    <span className="hp-thumb">
                      <IconFor slug={row.specialtySlug} className="size-5" />
                    </span>
                    <div>
                      <Link href={`/costs/${row.treatment.slug}`}>{row.treatment.name}</Link>
                      <p>{row.specialty}</p>
                    </div>
                    <strong>{fromUsd(row.treatment.partnerRange)}</strong>
                    <Link href={`/costs/${row.treatment.slug}`} className="hp-row-arrow" aria-label={`${row.treatment.name} cost`}>
                      <ChevronRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {moreProcedures > 0 ? (
              <p className="hp-more">
                {moreProcedures} further {moreProcedures === 1 ? "procedure" : "procedures"} sit under{" "}
                <Link href={`/hospitals/${hospital.slug}/procedures`}>View All Procedures</Link>.
              </p>
            ) : null}
          </div>
          <div id="doctors" className="scroll-mt-28">
            <div className="hp-box-head">
              <div>
                <p className="eyebrow">Faculty</p>
                <h2>Top doctors</h2>
              </div>
              <Link href={`/hospitals/${hospital.slug}/doctors`} className="hp-viewall">
                View All Doctors
                <ChevronRight className="size-4" />
              </Link>
            </div>
            {topDoctors.length === 0 ? (
              <p className="mt-6 text-muted-foreground">
                Named consultants for this campus are being matched. Request a plan and we will advise.
              </p>
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
                        {d.specialty}
                        {yearsLabel(d) ? ` · ${yearsLabel(d)} experience` : ""}
                      </p>
                    </div>
                    <Link href={`/doctors/${d.slug}`} className="hp-viewall hp-viewall--tight">
                      View profile
                      <ChevronRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {moreDoctors > 0 ? (
              <p className="hp-more">
                {moreDoctors} further {moreDoctors === 1 ? "doctor" : "doctors"} sit under{" "}
                <Link href={`/hospitals/${hospital.slug}/doctors`}>View All Doctors</Link>.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section id="infrastructure" className="hp-section scroll-mt-28">
        <div className="hp-wrap hp-split">
          <div>
            <p className="eyebrow">Campus</p>
            <h2>Infrastructure and technology</h2>
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
            <p className="eyebrow">Travel</p>
            <h2>International patient services</h2>
            <ul className="hp-intl">
              {intl.map((s) => {
                const Icon =
                  s.title === "Visa assistance"
                    ? FileCheck
                    : s.title === "Travel planning"
                      ? Plane
                      : s.title === "Airport pickup"
                        ? Car
                        : s.title === "Interpreters"
                          ? Languages
                          : s.title === "Companion stay"
                            ? BedDouble
                            : s.title === "Records transfer"
                              ? FolderOpen
                              : s.title === "Cost clarity"
                                ? Wallet
                                : Home;
                return (
                  <li key={s.title}>
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
              <p>
                Travelling for treatment? A GAF Healthcare coordinator holds the visa letter, the pickup and the first night
                so the family is not improvising at arrivals.
              </p>
              <Link href={`/consult?hospital=${hospital.slug}`}>Ask for that help</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-section hp-section--tint">
        <div className="hp-wrap hp-split">
          <div id="location" className="scroll-mt-28">
            <p className="eyebrow">Find us</p>
            <h2>Location</h2>
            <div className="hp-map">
              <HospitalCampusVisual hospital={hospital} className="hp-map__art" />
              <MapPin className="hp-map__pin" />
            </div>
            <p className="mt-4 font-medium">
              {hospital.name}, {hospital.city}, {hospital.country}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Nearest airport: {travel.airport}. {travel.airportHint}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{travel.centreHint}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="hp-btn-primary">
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href={hospitalsPath({ destination: hospital.country, city: hospital.city })}>
                  Other campuses in {hospital.city}
                </Link>
              </Button>
            </div>
          </div>
          <div id="faqs" className="scroll-mt-28">
            <p className="eyebrow">Questions</p>
            <h2>FAQs</h2>
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
            <h2>Other campuses in {hospital.city}</h2>
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
          <h2>Ready to begin your treatment journey?</h2>
          <p>
            Share records, meet the consultant on camera, then decide. No mill clinic, no obligation to book the first
            name we show you.
          </p>
          <Button asChild className="hp-btn-gold">
            <Link href={`/consult?hospital=${hospital.slug}`}>Get your treatment plan</Link>
          </Button>
          <ul className="hp-trust">
            <li>
              <CalendarCheck className="size-4" />
              Reply within a business day
            </li>
            <li>
              <UserRound className="size-4" />
              Named specialist, not a roster
            </li>
            <li>
              <ShieldCheck className="size-4" />
              No obligation
            </li>
            <li>
              <Lock className="size-4" />
              Records stay confidential
            </li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
