import Image from "next/image";

/** Keep in sync with images.remotePatterns in next.config.mjs. */
const OPTIMIZABLE_HOSTS = new Set(["images.unsplash.com", "enter.ginger.healthcare", "i.ytimg.com"]);

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZABLE_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

/**
 * Below-the-fold card cover for the homepage. CMS covers are often 1600px
 * remote originals, so route them through next/image (responsive, lazy) when
 * the host is allowed, and fall back to a lazy <img> otherwise so an unknown
 * host never breaks rendering.
 */
export function HomeCover({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  if (!src) return null;
  if (canOptimize(src)) {
    return <Image src={src} alt={alt} fill sizes={sizes} loading="lazy" className="object-cover" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />;
}
