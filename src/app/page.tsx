import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/article-body";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/page-shell";
import { listPublishedPosts } from "@/lib/blogs";
import { HospitalCard } from "@/components/hospital-card";
import { doctors, hospitals, treatments } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default function HomePage() {
  const published = listPublishedPosts();
  const posts = [...published.filter((p) => p.featured), ...published.filter((p) => !p.featured)].slice(0, 4);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: "GAF Healthcare",
          url: SITE_URL,
          description:
            "Named radiation, surgical and medical oncologists, haematologists, cardiac surgeons, cardiologists, bariatric surgeons, cosmetic surgeons, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists, neurosurgeons, neurologists and nephrologists in India — Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad — including Dr. Sanjeev Gulati, Dr. Ajit Singh Narula, Dr. Alka Bhasin, Dr. Sumit Singh, Dr. M V Padma Srivastava, Dr. Vinay Goyal, Dr. Sandeep Vaishya, Dr. Aditya Gupta, Dr. Varindera Paul Singh, Dr. Usha M Kumar, Dr. Suneeta Mittal, Dr. Alka Kriplani, Dr. Sudipto Pakrasi, Dr. Jeewan Singh Titiyal and Dr. Sameer Kaushal — with partner hospital costs in USD.",
          areaServed: ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"].map((city) => ({
            "@type": "City",
            name: city,
            containedInPlace: { "@type": "Country", name: "India" },
          })),
        }}
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=80"
          alt="Quiet corridor in a modern accredited hospital"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/35" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <p className="eyebrow text-gold">GAF Healthcare · Oncology, ENT and GI care · India</p>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl leading-[0.95] md:text-7xl lg:text-[5.25rem]">
            Oncologists, ENT and GI in India. Hospitals. Costs.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
            Named medical, radiation and surgical oncologists, haematologists, cardiac surgeons, cardiologists, bariatric surgeons, cosmetic surgeons, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, orthopaedic surgeons, ophthalmologists, gynecologists and neurosurgeons in Delhi NCR, Mumbai,
            Bengaluru, Chennai and Hyderabad. Meet them on camera. Read USD planning ranges before you fly.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-gold px-8 text-ink hover:bg-gold/90"
            >
              <Link href="/doctors">Browse doctors</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-transparent px-8 text-ivory hover:bg-white/10 hover:text-ivory"
            >
              <Link href="/hospitals">View hospitals</Link>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-4xl grid-cols-2 gap-6 border-t border-white/15 pt-8 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-ivory/55">Doctors</dt>
              <dd className="mt-1 font-heading text-3xl">{doctors.length}</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Hospitals</dt>
              <dd className="mt-1 font-heading text-3xl">{hospitals.length}</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Cost sheets</dt>
              <dd className="mt-1 font-heading text-3xl">{treatments.length}</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Blogs</dt>
              <dd className="mt-1 font-heading text-3xl">{published.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="eyebrow">Index</p>
        <h2 className="mt-3 font-heading text-4xl md:text-5xl">The only four rooms</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <IndexCard
            href="/doctors"
            kicker="01"
            title="Doctors"
            body="Radiation, surgical and medical oncologists, haematologists, cardiac surgeons, cardiologists, bariatric surgeons, cosmetic surgeons, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists and neurosurgeons you meet on camera before any deposit."
          />
          <IndexCard
            href="/hospitals"
            kicker="02"
            title="Hospitals"
            body="JCI campuses in Delhi NCR, Mumbai, Bengaluru, Chennai, and Hyderabad — oncology, ENT, gastroenterology, HPB, urology, spine, pulmonology, pediatric orthopaedic, orthopedics, ophthalmology, gynecology and neurosurgery."
          />
          <IndexCard
            href="/costs"
            kicker="03"
            title="Treatment Cost"
            body="US cash-pay beside partner ranges for radiation, surgery, transplant, bariatric, cosmetic, ENT, GI, HPB, urology, spine, pulmonology, pediatric orthopaedic, orthopedics, ophthalmology, gynecology and neurosurgery."
          />
          <IndexCard
            href="/blogs"
            kicker="04"
            title="Blogs"
            body="IMRT versus 3D-CRT, proton flights, short-stay SRS, and records before you book."
          />
        </div>
      </section>

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Faculty</p>
              <h2 className="mt-3 font-heading text-4xl md:text-5xl">Doctors</h2>
            </div>
            <Link href="/doctors" className="hidden items-center gap-2 text-sm md:inline-flex">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ...doctors.filter((d) => d.featured && d.specialtySlug === "radiation-oncology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "surgical-oncology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "medical-oncology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "hematology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "pediatric-hematology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "cardiac-surgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "pediatric-cardiac-surgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "cardiology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "bariatric-surgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "cosmetic-surgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "ent").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "gastroenterology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "surgical-gastroenterology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "urology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "spine-surgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "pulmonology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "pediatric-orthopaedic").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "orthopedics").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "ophthalmology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "gynecology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "neurosurgery").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "neurology").slice(0, 2),
              ...doctors.filter((d) => d.featured && d.specialtySlug === "nephrology").slice(0, 2),
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/doctors/${d.slug}`}
                className="group rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-xs tracking-[0.18em] uppercase text-gold">{d.specialty}</p>
                <h3 className="mt-1 font-heading text-2xl">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.qualifications}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {d.city}, {d.country}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Campuses</p>
            <h2 className="mt-3 font-heading text-4xl md:text-5xl">Hospitals</h2>
          </div>
          <Link href="/hospitals" className="hidden items-center gap-2 text-sm md:inline-flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6">
          {hospitals.slice(0, 3).map((h) => (
            <HospitalCard key={h.slug} hospital={h} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Ledger</p>
            <h2 className="mt-3 font-heading text-4xl md:text-5xl">Treatment cost</h2>
          </div>
          <Link href="/costs" className="hidden items-center gap-2 text-sm md:inline-flex">
            Full table <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {treatments.slice(0, 6).map((t) => (
            <Link
              key={t.slug}
              href={`/costs/${t.slug}`}
              className="grid gap-2 px-6 py-5 md:grid-cols-12 md:items-center"
            >
              <p className="font-heading text-2xl md:col-span-4">{t.name}</p>
              <p className="text-sm text-muted-foreground md:col-span-4">US {t.usRange}</p>
              <p className="text-sm md:col-span-3">Partner {t.partnerRange}</p>
              <ArrowRight className="hidden size-4 justify-self-end md:col-span-1 md:block" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Desk</p>
              <h2 className="mt-3 font-heading text-4xl md:text-5xl">Blogs</h2>
            </div>
            <Link href="/blogs" className="hidden items-center gap-2 text-sm md:inline-flex">
              All notes <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-52 overflow-hidden bg-[#dce8ee]">
                  {post.image ? (
                    <CoverImage
                      src={post.image}
                      alt={post.imageAlt || ""}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-[0.18em] uppercase text-gold">{post.category}</p>
                  <h3 className="mt-2 font-heading text-2xl leading-snug">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function IndexCard({
  href,
  kicker,
  title,
  body,
}: {
  href: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="group rounded-2xl border border-border bg-card p-6">
      <p className="font-heading text-gold">{kicker}</p>
      <h3 className="mt-4 flex items-center gap-2 font-heading text-2xl">
        {title}
        <ArrowRight className="size-4 opacity-0 transition group-hover:opacity-100" />
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Link>
  );
}
