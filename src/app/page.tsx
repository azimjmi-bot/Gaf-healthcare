import Image from "next/image";
import { LocaleLink as Link } from "@/components/locale-link";
import { ArrowRight, Building2, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { CoverImage } from "@/components/article-body";
import { HomeSearch } from "@/components/home/home-search";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { JsonLd } from "@/components/json-ld";
import {
  GOOGLE_MAPS_URL,
  GOOGLE_PROFILE,
  HOME_COST_SLUGS,
  YOUTUBE_CHANNEL,
} from "@/data/home";
import { listPublishedPosts } from "@/lib/blogs";
import { doctors, hospitals, treatments } from "@/lib/data";
import { hospitalsPath } from "@/lib/catalog-links";
import { localizeBlog, localizeHomeExtras, localizeMessages } from "@/lib/i18n/localize";
import { LOCALES } from "@/lib/i18n/languages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { SITE_URL } from "@/lib/seo";
import type { Treatment } from "@/lib/treatments";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  return withLocaleMetadata(
    {
      title: messages["seo.homeTitle"],
      description: messages["seo.homeDescription"],
      openGraph: {
        title: messages["seo.homeTitle"],
        description: messages["seo.homeDescription"],
        url: SITE_URL,
        type: "website",
      },
    },
    "/",
    locale,
    LOCALES,
  );
}

function startingPrice(range: string) {
  const n = range.match(/\$?([\d,]+)/);
  return n ? `from $${n[1]}` : range;
}

export default async function HomePage() {
  const locale = await getRequestLocale();
  const t = await localizeMessages(locale);
  const extras = await localizeHomeExtras(locale);
  const published = listPublishedPosts();
  const posts = await Promise.all(
    [...published.filter((p) => p.featured), ...published.filter((p) => !p.featured)]
      .slice(0, 3)
      .map((post) => localizeBlog(post, locale, false)),
  );
  const faculty = [
    ...doctors.filter((d) => d.featured && d.specialtySlug === "radiation-oncology").slice(0, 1),
    ...doctors.filter((d) => d.featured && d.specialtySlug === "surgical-oncology").slice(0, 1),
    ...doctors.filter((d) => d.featured && d.specialtySlug === "cardiac-surgery").slice(0, 1),
    ...doctors.filter((d) => d.featured && d.specialtySlug === "orthopedics").slice(0, 1),
    ...doctors.filter((d) => d.featured && d.specialtySlug === "ophthalmology").slice(0, 1),
  ];
  const campuses = hospitals.filter((h, i, all) => all.findIndex((x) => x.citySlug === h.citySlug) === i).slice(0, 5);
  const sheets = HOME_COST_SLUGS.map((slug) => treatments.find((t) => t.slug === slug)).filter(
    (row): row is Treatment => Boolean(row),
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: "GAF Healthcare",
          url: locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`,
          sameAs: [YOUTUBE_CHANNEL, GOOGLE_MAPS_URL],
          description:
            "Named radiation, surgical and medical oncologists, haematologists, cardiac surgeons, cardiologists, bariatric surgeons, cosmetic surgeons, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists, neurosurgeons, neurologists and nephrologists in India — Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad — with partner hospital costs in USD.",
          areaServed: ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"].map((city) => ({
            "@type": "City",
            name: city,
            containedInPlace: { "@type": "Country", name: "India" },
          })),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: GOOGLE_PROFILE.rating,
            reviewCount: GOOGLE_PROFILE.reviewCount,
            bestRating: "5",
          },
        }}
      />

      <section className="home-hero">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=80"
          alt="Reception desk in a modern hospital"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="home-hero__shade" />
        <div className="home-hero__inner">
          <p className="eyebrow text-gold">{t["home.heroEyebrow"]}</p>
          <h1>{t["home.heroTitle"]}</h1>
          <p className="home-hero__lede">{t["home.heroLede"]}</p>
          <HomeSearch />
        </div>
      </section>

      <section className="home-trust">
        <ul>
          <li>
            <HeartHandshake />
            {t["home.trust1"]}
          </li>
          <li>
            <Building2 />
            {t["home.trust2"]}
          </li>
          <li>
            <ShieldCheck />
            {t["home.trust3"]}
          </li>
          <li>
            <Compass />
            {t["home.trust4"]}
          </li>
        </ul>
      </section>

      <section id="destinations" className="home-section scroll-mt-24">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.destinationsEyebrow"]}</p>
            <h2>{t["home.destinationsTitle"]}</h2>
          </div>
          <Link href="/hospitals" className="home-more">
            {t["home.viewAll"]} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-destgrid">
          {extras.destinations.map((place) => (
            <Link
              key={place.name}
              href={hospitalsPath({ destination: place.filter })}
              className="home-dest"
            >
              <Image src={place.image} alt={place.imageAlt} fill className="object-cover" sizes="(min-width: 900px) 16vw, 50vw" />
              <span>
                <strong>{place.name}</strong>
                <em>{place.blurb}</em>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.doctorsEyebrow"]}</p>
            <h2>{t["home.doctorsTitle"]}</h2>
          </div>
          <Link href="/doctors" className="home-more">
            {t["home.viewDoctors"]} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-docgrid">
          {faculty.map((doctor) => (
            <Link key={doctor.slug} href={`/doctors/${doctor.slug}`} className="home-doc">
              <span className="home-doc__photo">
                {/* Catalog portraits are local files, matching directory cards. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.image || "/doctors/avatar-placeholder.webp?v=2"}
                  alt={doctor.image ? doctor.imageAlt || doctor.name : ""}
                />
              </span>
              <strong>{doctor.name}</strong>
              <em>{doctor.specialty}</em>
              <span>
                {doctor.city}, {doctor.country}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.hospitalsEyebrow"]}</p>
            <h2>{t["home.hospitalsTitle"]}</h2>
          </div>
          <Link href="/hospitals" className="home-more">
            {t["home.viewHospitals"]} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-hospgrid">
          {campuses.map((hospital) => (
            <Link key={hospital.slug} href={`/hospitals/${hospital.slug}`} className="home-hosp">
              <span className="home-hosp__visual">
                <HospitalCampusVisual hospital={hospital} className="home-hosp__art" />
              </span>
              <strong>{hospital.name}</strong>
              <span>
                {hospital.city}, {hospital.country}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.costsEyebrow"]}</p>
            <h2>{t["home.costsTitle"]}</h2>
            <p>{t["home.costsLede"]}</p>
          </div>
          <Link href="/costs" className="home-more">
            {t["home.viewCosts"]} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-costgrid">
          {sheets.map((row) => (
            <Link key={row.slug} href={`/costs/${row.slug}`} className="home-cost">
              <p>{row.category}</p>
              <strong>{row.name}</strong>
              <em>{startingPrice(row.partnerRange)}</em>
              <span>{row.partnerRange} {t["home.typicalPackage"]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.storiesEyebrow"]}</p>
            <h2>{t["home.storiesTitle"]}</h2>
          </div>
          <a href={YOUTUBE_CHANNEL} className="home-more" target="_blank" rel="noreferrer">
            {t["home.moreYoutube"]} <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="home-videogrid">
          {extras.videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              className="home-video"
              target="_blank"
              rel="noreferrer"
            >
              <span className="home-video__thumb">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 900px) 24vw, 100vw"
                />
                <span className="home-video__play" aria-hidden>
                  ▶
                </span>
              </span>
              <strong>{video.title}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.deskEyebrow"]}</p>
            <h2>{t["home.deskTitle"]}</h2>
          </div>
          <Link href="/blogs" className="home-more">
            {t["home.viewBlogs"]} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-bloggrid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="home-blog">
              <span className="home-blog__img">
                {post.image ? (
                  <CoverImage src={post.image} alt={post.imageAlt || ""} className="h-full w-full object-cover" />
                ) : null}
              </span>
              <p>{post.category}</p>
              <strong>{post.title}</strong>
              <span>{post.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <p className="eyebrow">{t["home.reviewsEyebrow"]}</p>
            <h2>{t["home.reviewsTitle"]}</h2>
            <p>
              {GOOGLE_PROFILE.rating} from {GOOGLE_PROFILE.reviewCount} reviews on the GAF Healthcare Pvt Ltd
              Google listing.
            </p>
          </div>
          <a href={GOOGLE_MAPS_URL} className="home-more" target="_blank" rel="noreferrer">
            {t["home.readGoogle"]} <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="home-reviewgrid">
          {extras.reviews.map((review) => (
            <blockquote key={review.name} className="home-review">
              <p>★★★★★</p>
              <p>{review.text}</p>
              <footer>{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="home-finale">
        <div>
          <h2>{t["home.finaleTitle"]}</h2>
          <p>{t["home.finaleLede"]}</p>
        </div>
        <Link href="/consult" className="home-finale__btn">
          {t["home.finaleButton"]}
        </Link>
      </section>
    </>
  );
}
