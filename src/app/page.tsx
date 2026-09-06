import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/page-shell";
import { doctors, hospitals, steps, stories, treatments } from "@/lib/data";
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
              <Link href="/doctors">Meet the doctors</Link>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-8 text-sm">
            <div>
              <dt className="text-ivory/55">Named doctors</dt>
              <dd className="mt-1 font-heading text-3xl">{doctors.length}</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Hospitals</dt>
              <dd className="mt-1 font-heading text-3xl">{hospitals.length}</dd>
            </div>
            <div>
              <dt className="text-ivory/55">Coordinator hours</dt>
              <dd className="mt-1 font-heading text-3xl">24/7</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="eyebrow">Index</p>
        <h2 className="mt-3 font-heading text-4xl md:text-5xl">How to read the house</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <IndexCard
            href="/doctors"
            kicker="01"
            title="Doctors"
            body="Named specialists you meet on camera before any deposit."
          />
          <IndexCard
            href="/hospitals"
            kicker="02"
            title="Hospitals"
            body="JCI campuses with international desks that actually answer."
          />
          <IndexCard
            href="/costs"
            kicker="03"
            title="Treatment Cost"
            body="US cash-pay beside partner ranges. Quotes come after the dossier."
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
            {doctors.slice(0, 8).map((d) => (
              <Link
                key={d.slug}
                href={`/doctors/${d.slug}`}
                className="group overflow-hidden rounded-2xl bg-card"
              >
                <div className="relative h-64">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs tracking-[0.18em] uppercase text-gold">{d.specialty}</p>
                  <h3 className="mt-1 font-heading text-2xl">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.title}</p>
                </div>
              </Link>
            ))}
          </div>
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
                  {s.from} · {s.treatment}
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
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary/30"
    >
      <p className="font-heading text-2xl text-gold">{kicker}</p>
      <h3 className="mt-4 font-heading text-3xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-sm">
        Open <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </p>
    </Link>
  );
}
