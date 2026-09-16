import { LocaleLink as Link } from "@/components/locale-link";
import { QuickAnswer } from "@/components/quick-answer";
import {
  radiationOncologyConsultPrep,
  radiationOncologyInternationalNote,
  radiationOncologyQuestionsToAsk,
} from "@/data/doctor-pages/radiation-oncology";
import { costsFilterPath, doctorsPath } from "@/lib/catalog-links";
import {
  doctorQuickFacts,
  doctorRelevanceCopy,
  relatedCostTreatments,
  relatedDoctorBlogs,
  similarDoctors,
} from "@/lib/doctor-discovery";
import { doctorWhoAnswer } from "@/lib/doctor-quick-answers";
import type { Doctor } from "@/lib/doctors";

export function DoctorProfileGraph({
  doctor,
  pool,
}: {
  doctor: Doctor;
  pool: Doctor[];
}) {
  const similar = similarDoctors(doctor, pool);
  const costs = relatedCostTreatments(doctor);
  const blogs = relatedDoctorBlogs(doctor);
  const facts = doctorQuickFacts(doctor);
  const isRadiation = doctor.specialtySlug === "radiation-oncology";
  const specialtyHref = doctorsPath({
    destination: "India",
    city: doctor.city,
    specialty: doctor.specialty,
  });
  const specialtyCostHref = costsFilterPath({
    destination: "India",
    city: doctor.city,
    specialty: doctor.specialty,
  });

  return (
    <div className="mt-12 space-y-12">
      <QuickAnswer items={[doctorWhoAnswer(doctor)]} variant="embed" />

      <section>
        <h2 className="font-heading text-3xl">Quick facts</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-card px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-heading text-3xl">Why this doctor may be relevant</h2>
        <p className="prose-gaf mt-3">{doctorRelevanceCopy(doctor)}</p>
        <p className="mt-3 text-sm">
          <Link href={specialtyHref} className="underline-offset-4 hover:underline">
            {isRadiation
              ? `Best Radiation Oncologists in ${doctor.city}, India`
              : `${doctor.specialty} doctors in ${doctor.city}`}
          </Link>
        </p>
      </section>

      {doctor.procedures.length > 0 ? (
        <section>
          <h2 className="font-heading text-3xl">Related radiation treatments</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Short context only. Technique explanations stay on existing GAF treatment pages.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {doctor.procedures.map((name) => (
              <li key={name}>
                <Link
                  href={doctorsPath({
                    destination: "India",
                    specialty: doctor.specialty,
                    procedure: name,
                  })}
                  className="underline-offset-4 hover:underline"
                >
                  {name} specialists in India
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {costs.length > 0 ? (
        <section>
          <h2 className="font-heading text-3xl">Related treatment costs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            These are existing GAF planning ranges, not this doctor’s personal prices.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {costs.map((row) => (
              <li key={row.slug}>
                <Link href={row.href} className="block rounded-xl border border-border bg-card p-4 hover:border-primary/30">
                  <p className="font-medium">{row.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View cost guide{row.partnerRange ? ` · ${row.partnerRange}` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="font-heading text-3xl">Related GAF treatment guides</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href={specialtyCostHref} className="underline-offset-4 hover:underline">
              {doctor.specialty} treatment in {doctor.city}, India
            </Link>
          </li>
          {blogs.map((row) => (
            <li key={row.slug}>
              <Link href={row.href} className="underline-offset-4 hover:underline">
                {row.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {similar.length > 0 ? (
        <section>
          <h2 className="font-heading text-3xl">Similar specialists</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Similarity uses specialty, city, hospital and shared procedure mappings. It is not a ranking.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {similar.map((row) => (
              <li key={row.slug}>
                <Link href={`/doctors/${row.slug}`} className="block rounded-xl border border-border bg-card p-4 hover:border-primary/30">
                  <p className="font-heading text-2xl">{row.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.hospitalName} · {row.city}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {isRadiation ? (
        <>
          <section>
            <h2 className="font-heading text-3xl">Consultation preparation</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {radiationOncologyConsultPrep.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-heading text-3xl">Questions to ask</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {radiationOncologyQuestionsToAsk.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-heading text-3xl">International patient assistance</h2>
            <p className="prose-gaf mt-3">{radiationOncologyInternationalNote}</p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href={`/consult?doctor=${doctor.slug}`} className="underline-offset-4 hover:underline">
                Request a Consultation
              </Link>
              <Link href="/consult" className="underline-offset-4 hover:underline">
                Get a Medical Opinion
              </Link>
              <Link href="/consult" className="underline-offset-4 hover:underline">
                Plan Treatment in India
              </Link>
            </p>
          </section>
        </>
      ) : null}
    </div>
  );
}
