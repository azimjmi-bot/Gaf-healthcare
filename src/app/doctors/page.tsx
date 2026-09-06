import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { doctors, getHospital } from "@/lib/data";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctors" };

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string }>;
}) {
  const { specialty } = await searchParams;
  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));
  const list = specialty ? doctors.filter((d) => d.specialty === specialty) : doctors;

  return (
    <>
      <PageIntro
        eyebrow="Faculty"
        title="Named surgeons. Video first. Never a mill."
        lede="Every doctor on this list has sat with Velora. You will meet them on camera before a deposit. If the fit is wrong, we restart."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-wrap gap-2">
          <FilterChip href="/doctors" active={!specialty}>
            All
          </FilterChip>
          {specialties.map((s) => (
            <FilterChip
              key={s}
              href={`/doctors?specialty=${encodeURIComponent(s)}`}
              active={specialty === s}
            >
              {s}
            </FilterChip>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-16 text-muted-foreground">No doctors in this specialty yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => {
              const hospital = getHospital(d.hospitalSlug);
              return (
                <Link
                  key={d.slug}
                  href={`/doctors/${d.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative h-72">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-[0.18em] uppercase text-gold">{d.specialty}</p>
                    <h2 className="mt-2 font-heading text-2xl">{d.name}</h2>
                    <p className="text-sm text-muted-foreground">{d.title}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {hospital?.name} · {hospital?.city}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm ${
        active ? "bg-ink text-ivory" : "border border-border bg-card hover:border-primary/30"
      }`}
    >
      {children}
    </Link>
  );
}
