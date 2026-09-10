import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { CoverImage } from "@/components/article-body";
import { HomeSearch } from "@/components/home/home-search";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { JsonLd } from "@/components/json-ld";
import {
  GOOGLE_MAPS_URL,
  GOOGLE_PROFILE,
  HOME_COST_SLUGS,
  HOME_DESTINATIONS,
  HOME_REVIEWS,
  HOME_VIDEOS,
  YOUTUBE_CHANNEL,
} from "@/data/home";
import { listPublishedPosts } from "@/lib/blogs";
import { doctors, hospitals, treatments } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import type { Treatment } from "@/lib/treatments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function startingPrice(range: string) {
  const n = range.match(/\$?([\d,]+)/);
  return n ? `from $${n[1]}` : range;
}

export default function HomePage() {
  const published = listPublishedPosts();
  const posts = [...published.filter((p) => p.featured), ...published.filter((p) => !p.featured)].slice(0, 3);
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
          url: SITE_URL,
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
          <p className="eyebrow text-gold">Global care · without borders</p>
          <h1>Trusted Care Beyond Borders</h1>
          <p className="home-hero__lede">
            Compare listed doctors, hospitals and treatment costs across our destinations. Plan your
            medical journey with a named consultant before you fly.
          </p>
          <HomeSearch />
        </div>
      </section>

      <section className="home-trust">
        <ul>
          <li>
            <HeartHandshake />
            Personalized guidance
          </li>
          <li>
            <Building2 />
            Access to listed hospitals
          </li>
          <li>
            <ShieldCheck />
            Transparent planning ranges
          </li>
          <li>
            <Compass />
            Support at every step
          </li>
        </ul>
      </section>

      <section id="destinations" className="home-section scroll-mt-24">
        <div className="home-head">
          <div>
            <p className="eyebrow">Destinations</p>
            <h2>Top Destinations</h2>
          </div>
          <Link href="/hospitals" className="home-more">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-destgrid">
          {HOME_DESTINATIONS.map((place) => (
            <Link
              key={place.name}
              href={`/hospitals?destination=${encodeURIComponent(place.filter)}`}
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
            <p className="eyebrow">Doctors</p>
            <h2>Meet Our Doctors</h2>
          </div>
          <Link href="/doctors" className="home-more">
            View all doctors <ArrowRight className="size-4" />
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
            <p className="eyebrow">Hospitals</p>
            <h2>Hospitals We Work With</h2>
          </div>
          <Link href="/hospitals" className="home-more">
            View all hospitals <ArrowRight className="size-4" />
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
            <p className="eyebrow">Treatment costs</p>
            <h2>Plan your care with confidence</h2>
            <p>Indicative India planning ranges from the cost sheets — not hospital quotations.</p>
          </div>
          <Link href="/costs" className="home-more">
            View all cost sheets <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="home-costgrid">
          {sheets.map((row) => (
            <Link key={row.slug} href={`/costs/${row.slug}`} className="home-cost">
              <p>{row.category}</p>
              <strong>{row.name}</strong>
              <em>{startingPrice(row.partnerRange)}</em>
              <span>{row.partnerRange} typical package</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <p className="eyebrow">Patient stories</p>
            <h2>People. Real Journeys.</h2>
          </div>
          <a href={YOUTUBE_CHANNEL} className="home-more" target="_blank" rel="noreferrer">
            More on YouTube <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="home-videogrid">
          {HOME_VIDEOS.map((video) => (
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
            <p className="eyebrow">Desk</p>
            <h2>Latest Insights &amp; Guides</h2>
          </div>
          <Link href="/blogs" className="home-more">
            View all blogs <ArrowRight className="size-4" />
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
            <p className="eyebrow">Google reviews</p>
            <h2>What Our Patients Say</h2>
            <p>
              {GOOGLE_PROFILE.rating} from {GOOGLE_PROFILE.reviewCount} reviews on the GAF Healthcare Pvt Ltd
              Google listing.
            </p>
          </div>
          <a href={GOOGLE_MAPS_URL} className="home-more" target="_blank" rel="noreferrer">
            Read on Google <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="home-reviewgrid">
          {HOME_REVIEWS.map((review) => (
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
          <h2>Your Health Journey Starts Here</h2>
          <p>Share your records. Receive suitable doctor and hospital options with an indicative estimate.</p>
        </div>
        <Link href="/consult" className="home-finale__btn">
          Request a Dossier
        </Link>
      </section>
    </>
  );
}
