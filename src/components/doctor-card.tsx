import Image from "next/image";
import Link from "next/link";
import { Building2, Star } from "lucide-react";
import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doc-card">
      <div className="doc-card__pcol">
        <div className="doc-card__photo">
          <Link href={`/doctors/${doctor.slug}`} className="doc-card__photolink" aria-label={`View ${doctor.name} profile`}>
            <Image src={doctor.image} alt={doctor.name} fill className="object-cover object-top" sizes="220px" />
          </Link>
          {doctor.featured ? (
            <span className="card-fbadge">
              <Star className="size-3 fill-amber-500 text-amber-500" />
              Featured
            </span>
          ) : null}
        </div>
        <p className="doc-card__cap">{doctor.name}</p>
      </div>
      <div className="doc-card__main">
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
        {doctor.experience ? <p className="doc-card__exp">{doctor.experience.replace(/Experience$/i, "experience")}</p> : null}
        <p className="doc-card__bio">{doctor.excerpt}</p>
        <Link href={`/doctors/${doctor.slug}`} className="doc-card__readmore">
          Read more
        </Link>
      </div>
    </article>
  );
}
