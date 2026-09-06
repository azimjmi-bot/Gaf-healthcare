import Link from "next/link";
import { Building2, Star } from "lucide-react";
import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doc-card">
      <div className="doc-card__main">
        {doctor.featured ? (
          <span className="card-fbadge card-fbadge--inline">
            <Star className="size-3 fill-amber-500 text-amber-500" />
            Featured
          </span>
        ) : null}
        <Link href={`/doctors/${doctor.slug}`} className="doc-card__name">
          {doctor.name}
        </Link>
        {doctor.qualifications ? <p className="doc-card__quals">{doctor.qualifications}</p> : null}
        <p className="doc-card__title">{doctor.title}</p>
        <Link href={`/hospitals/${doctor.hospitalSlug}`} className="doc-card__hosp">
          <Building2 className="size-4 shrink-0 text-[#F26522]" />
          <span>
            {doctor.hospitalName}, {doctor.city}
          </span>
        </Link>
        {doctor.experience ? (
          <p className="doc-card__exp">{doctor.experience.replace(/Experience$/i, "experience")}</p>
        ) : null}
        {doctor.bio ? <p className="doc-card__bio">{doctor.bio}</p> : null}
        <Link href={`/doctors/${doctor.slug}`} className="doc-card__readmore">
          View profile
        </Link>
      </div>
    </article>
  );
}
