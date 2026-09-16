import { LocaleLink as Link } from "@/components/locale-link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { getDoctor } from "@/lib/data";
import { experienceYears } from "@/lib/doctor-discovery";
import { doctorsPath } from "@/lib/catalog-links";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compare radiation oncologists",
  description: "Compare listed radiation oncologists on experience, hospital, city and mapped techniques. This is not a clinical ranking.",
  robots: { index: false, follow: false },
};

function parseIds(raw: string | string[] | undefined) {
  const text = Array.isArray(raw) ? raw[0] : raw;
  if (!text) return [];
  return [...new Set(text.split(",").map((part) => part.trim()).filter(Boolean))].slice(0, 4);
}

export default async function DoctorComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string | string[] }>;
}) {
  const ids = parseIds((await searchParams).ids);
  const doctors = ids.map((slug) => getDoctor(slug)).filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <>
      <PageIntro
        eyebrow="Doctor discovery"
        title="Compare specialists"
        lede="This table lists catalog facts side by side. It is not a statement of medical superiority, outcome or rank."
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {doctors.length < 2 ? (
          <p className="text-muted-foreground">
            Select two to four specialists from a doctor list, then open compare.{" "}
            <Link href={doctorsPath({ destination: "India", specialty: "Radiation Oncology" })} className="underline-offset-4 hover:underline">
              Best Radiation Oncologists in India
            </Link>
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="min-w-[720px] w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Field</th>
                  {doctors.map((doctor) => (
                    <th key={doctor.slug} className="px-4 py-3 font-heading text-xl">
                      <Link href={`/doctors/${doctor.slug}`} className="text-gold underline underline-offset-4">
                        {doctor.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Designation", doctors.map((doctor) => doctor.title)],
                  ["Specialty", doctors.map((doctor) => doctor.specialty)],
                  ["Experience", doctors.map((doctor) => {
                    const years = experienceYears(doctor);
                    return years ? `${years} years listed` : doctor.experience || "—";
                  })],
                  ["Qualifications", doctors.map((doctor) => doctor.qualifications || "—")],
                  ["Hospital", doctors.map((doctor) => doctor.hospitalName)],
                  ["City", doctors.map((doctor) => doctor.city)],
                  ["Clinical focus", doctors.map((doctor) => doctor.specializations.slice(0, 4).join("; ") || "—")],
                  ["Procedures", doctors.map((doctor) => doctor.procedures.slice(0, 6).join("; ") || "—")],
                  ["Languages", doctors.map((doctor) => doctor.languages || "—")],
                ].map(([label, values]) => (
                  <tr key={String(label)} className="border-t border-border align-top">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">{label}</th>
                    {(values as string[]).map((value, index) => (
                      <td key={`${label}-${doctors[index]?.slug}`} className="px-4 py-3 text-muted-foreground">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-6 text-sm">
          <Link href="/consult" className="underline-offset-4 hover:underline">
            Request a Consultation
          </Link>
          {" · "}
          <Link href="/consult" className="underline-offset-4 hover:underline">
            Plan Treatment in India
          </Link>
        </p>
      </section>
      <CtaBand />
    </>
  );
}
