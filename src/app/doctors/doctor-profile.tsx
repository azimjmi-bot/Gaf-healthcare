import { LocaleLink as Link } from "@/components/locale-link";
import { notFound } from "next/navigation";
import { AccreditationSeals } from "@/components/accreditation-seals";
import { DoctorProfileHero } from "@/components/doctor-profile-hero";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/page-shell";
import { getHospital, getTreatment } from "@/lib/data";
import { MarkdownBody } from "@/components/markdown-body";
import { displayBio } from "@/lib/hospital-profile";
import { doctorsForHospitalLocale, getDoctorForLocale } from "@/lib/locale-catalog";
import { publicMarkdown } from "@/lib/markdown";
import { doctorsPath } from "@/lib/catalog-links";
import { breadcrumbJsonLd, physicianJsonLd } from "@/lib/seo";
import { doctorPageMetadata } from "@/lib/i18n/page-meta";
import { localizeHospital, localizeMessages } from "@/lib/i18n/localize";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export async function doctorProfileMetadata(slug: string): Promise<Metadata> {
  return doctorPageMetadata(slug);
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-10">
      <h2 className="font-heading text-3xl">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export async function DoctorProfile({ slug }: { slug: string }) {
  const locale = await getRequestLocale();
  const d = getDoctorForLocale(slug, locale);
  if (!d) notFound();
  const t = await localizeMessages(locale);
  const hospitalRaw = getHospital(d.hospitalSlug);
  const hospital = hospitalRaw ? await localizeHospital(hospitalRaw, locale) : undefined;
  const pathways = d.treatmentSlugs.map((s) => getTreatment(s)).filter(Boolean);
  const colleagues = doctorsForHospitalLocale(d.hospitalSlug, locale)
    .filter((x) => x.slug !== d.slug && x.specialtySlug === d.specialtySlug)
    .slice(0, 6);

  return (
    <>
      <JsonLd data={physicianJsonLd(d, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t["profile.doctors"], path: "/doctors" },
            {
              name: taxonomyLabel(d.specialty, locale),
              path: doctorsPath({ destination: "India", specialty: d.specialty }),
            },
            {
              name: taxonomyLabel(d.city, locale),
              path: doctorsPath({ destination: "India", city: d.city }),
            },
            { name: d.name, path: `/doctors/${d.slug}` },
          ],
          locale,
        )}
      />
      <DoctorProfileHero doctor={d} hospital={hospital} locale={locale} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-5 md:px-8 md:py-20">
        <h3 className="text-sm tracking-[0.2em] text-gold uppercase">{t["profile.about"].replace("{name}", d.name)}</h3>
        <h2 className="mt-3 font-heading text-3xl">{t["profile.summary"]}</h2>
        <MarkdownBody source={publicMarkdown(d.bio)} className="md-body--profile mt-5" />
        {hospital ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs tracking-[0.18em] uppercase text-gold">{t["profile.practisesAt"]}</p>
            <Link href={`/hospitals/${hospital.slug}`} className="mt-2 block font-heading text-3xl hover:text-gold">
              {hospital.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {taxonomyLabel(hospital.city, locale)}, {taxonomyLabel(hospital.country, locale)}
            </p>
            <div className="mt-3">
              <AccreditationSeals accreditation={hospital.accreditation} size="sm" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{displayBio(hospital.bio)}</p>
            <Link
              href={`/hospitals/${hospital.slug}`}
              className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
            >
              {t["profile.hospitalFaculty"]}
            </Link>
          </div>
        ) : null}
        <ProfileList title={t["profile.specializations"]} items={d.specializations} />
        <ProfileList title={t["profile.procedures"]} items={d.proceduresExpertise} />
        <ProfileList title={t["profile.education"]} items={d.education} />
        <ProfileList title={t["profile.affiliations"]} items={d.affiliations} />
        <ProfileList title={t["profile.memberships"]} items={d.memberships} />
        <ProfileList title={t["profile.awards"]} items={d.awards} />
        <ProfileList title={t["profile.research"]} items={d.research} />
      </article>

      {pathways.length > 0 ? (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
            <h2 className="font-heading text-3xl">{t["profile.relatedCosts"]}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {pathways.map((row) =>
                row ? (
                  <li key={row.slug}>
                    <Link
                      href={`/costs/${row.slug}`}
                      className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                    >
                      <p className="font-heading text-2xl">{taxonomyLabel(row.name, locale)}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t["profile.partnerRange"]
                          .replace("{partner}", row.partnerRange)
                          .replace("{us}", row.usRange)}
                      </p>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {colleagues.length > 0 ? (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-heading text-3xl">
              {t["profile.colleagues"]
                .replace("{specialty}", taxonomyLabel(d.specialty, locale))
                .replace("{hospital}", hospital?.name ?? "")}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {colleagues.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/doctors/${c.slug}`}
                    className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{c.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.qualifications}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
