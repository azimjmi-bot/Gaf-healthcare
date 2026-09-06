import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import { destinations, steps, stories, treatments } from "@/lib/data";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=80"
          alt="Quiet luxury hotel corridor at dusk"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/25" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <p className="eyebrow text-gold">Private medical travel</p>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            Care at the world&apos;s best tables.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
            {site.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-gold px-8 text-ink hover:bg-gold/90"
            >
              <Link href="/consult">Request a dossier</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-transparent px-8 text-ivory hover:bg-white/10 hover:text-ivory"
            >
              <Link href="/destinations">Explore destinations</Link>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-8 text-sm">
            <div>
              <dt className="text-ivory/55">Partner campuses</dt>
              <dd className="mt-1 font-heading text-3xl">18</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Cities</dt>
              <dd className="mt-1 font-heading text-3xl">6</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Coordinator hours</dt>
              <dd className="mt-1 font-heading text-3xl">24/7</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Why Velora</p>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl">
              Not a marketplace. A house.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-[1.05rem] leading-relaxed text-muted-foreground">
            <p>
              Most medical tourism sites auction you to whoever pays for leads.
              We keep a short list: JCI hospitals, surgeons we have sat with,
              recovery addresses we would send our own family to.
            </p>
            <p>
              You receive a written dossier — two or three options, all-in cost,
              stay length, complication pathway — then you meet the surgeon on
              camera. Nothing is booked until that conversation is done.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Atlas</p>
              <h2 className="mt-3 font-heading text-4xl md:text-5xl">Destinations</h2>
            </div>
            <Link
              href="/destinations"
              className="hidden items-center gap-2 text-sm md:inline-flex"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative min-h-72 overflow-hidden rounded-2xl"
              >
                <Image
                  src={d.image}
                  alt={`${d.city}, ${d.country}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="text-xs tracking-[0.2em] uppercase text-gold">
                    {d.country}
                  </p>
                  <h3 className="mt-1 font-heading text-3xl">{d.city}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ivory/75">
                    {d.specialties.join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="eyebrow">Pathways</p>
        <h2 className="mt-3 font-heading text-4xl md:text-5xl">Treatments we arrange</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {treatments.slice(0, 6).map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition hover:border-primary/30"
            >
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {t.category}
                </p>
                <h3 className="mt-2 font-heading text-3xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.summary}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span>
                  Typical partner range{" "}
                  <span className="text-foreground">{t.partnerRange}</span>
                </span>
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8 h-11 rounded-full px-6">
          <Link href="/treatments">All treatments</Link>
        </Button>
      </section>

      <section className="border-y border-border bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow">Choreography</p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">Five movements</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n}>
                <p className="font-heading text-2xl text-gold">{s.n}</p>
                <h3 className="mt-3 font-heading text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="eyebrow">Letters</p>
        <h2 className="mt-3 font-heading text-4xl md:text-5xl">From the road home</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {stories.map((s) => (
            <blockquote
              key={s.slug}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8"
            >
              <p className="font-heading text-2xl leading-snug">&ldquo;{s.quote}&rdquo;</p>
              <footer className="mt-8 text-sm text-muted-foreground">
                <p className="text-foreground">{s.name}</p>
                <p>
                  {s.from} · {s.treatment} · {s.destination}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
