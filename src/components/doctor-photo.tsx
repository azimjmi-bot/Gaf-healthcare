import type { Doctor } from "@/lib/doctors";

/**
 * Placeholder portrait. The two renditions let the browser fetch the 240px
 * file for the ~100px circular avatars used in cards (covers 2x DPR) instead
 * of the 400px master, and the query string busts caches when the file
 * changes because the asset is served with an immutable Cache-Control.
 */
export const AVATAR_PLACEHOLDER = "/doctors/avatar-placeholder.webp?v=3";
export const AVATAR_PLACEHOLDER_SRCSET =
  "/doctors/avatar-placeholder-240.webp?v=3 240w, /doctors/avatar-placeholder.webp?v=3 400w";

type Props = {
  doctor: Pick<Doctor, "name" | "image" | "imageAlt">;
  /** CSS width of the rendered avatar, e.g. "6.4rem"; drives srcset selection. */
  sizes: string;
  loading?: "eager" | "lazy";
};

/**
 * Catalog portraits and the shared placeholder are local static files, so a
 * plain <img> is used (matching the directory cards) rather than next/image.
 */
export function DoctorPhoto({ doctor, sizes, loading = "lazy" }: Props) {
  if (doctor.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={doctor.image} alt={doctor.imageAlt || doctor.name} loading={loading} decoding="async" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={AVATAR_PLACEHOLDER}
      srcSet={AVATAR_PLACEHOLDER_SRCSET}
      sizes={sizes}
      width={400}
      height={400}
      alt=""
      loading={loading}
      decoding="async"
    />
  );
}
