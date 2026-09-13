import Image from "next/image";
import avatarPlaceholder from "../../public/doctors/avatar-placeholder.webp";
import type { Doctor } from "@/lib/doctors";

type Props = {
  doctor: Pick<Doctor, "name" | "image" | "imageAlt">;
  /** CSS width of the rendered avatar, e.g. "6.4rem"; drives srcset selection. */
  sizes: string;
  loading?: "eager" | "lazy";
};

/**
 * Doctor portrait with the shared placeholder fallback.
 *
 * The placeholder is a static import so it ships content-hashed under
 * /_next/static/media (long-lived immutable cache on every host, unlike files
 * served straight from /public) and goes through next/image, which picks a
 * rendition close to the ~100px circular avatars instead of the 400px master.
 * CMS-supplied portraits can live on any host, so they stay a plain <img>.
 */
export function DoctorPhoto({ doctor, sizes, loading = "lazy" }: Props) {
  if (doctor.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={doctor.image} alt={doctor.imageAlt || doctor.name} loading={loading} decoding="async" />;
  }
  return <Image src={avatarPlaceholder} alt="" sizes={sizes} loading={loading} />;
}
