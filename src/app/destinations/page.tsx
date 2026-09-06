import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { destinations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
};

export default function DestinationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Atlas"
        title="Six cities. One standard."
        lede="We do not add a destination because it is fashionable. Each city on this list has hospitals we have walked, coordinators we trust at 2 a.m., and a recovery map we would use ourselves."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-8">
          {destinations.map((d, i) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2"
            >
              <div className={`relative min-h-72 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={d.image}
                  alt={`${d.city}, ${d.country}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow">{d.region}</p>
                <h2 className="mt-3 font-heading text-4xl">
                  {d.city}
                  <span className="text-muted-foreground">, {d.country}</span>
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{d.headline}</p>
                <p className="mt-4 text-sm text-muted-foreground">{d.specialties.join(" · ")}</p>
                <p className="mt-8 text-sm">Typical stay {d.stay}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
