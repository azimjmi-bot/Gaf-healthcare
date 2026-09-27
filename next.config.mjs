/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "172.30.0.2",
    "*.trycloudflare.com",
  ],
  // Locale prefixes are rewritten in src/proxy.ts so x-gaf-locale is set
  // on the same request. Do not also rewrite here — that can strip /ar
  // before the proxy sees it and leave the page in English.
  async redirects() {
    return [
      { source: "/destinations", destination: "/hospitals", permanent: true },
      { source: "/destinations/:slug", destination: "/hospitals", permanent: true },
      { source: "/speciality", destination: "/specialties", permanent: true },
      { source: "/specialities", destination: "/specialties", permanent: true },
      { source: "/specialty", destination: "/specialties", permanent: true },
      { source: "/costs/facial-aesthetics", destination: "/costs", permanent: true },
      { source: "/costs/hair-restoration", destination: "/costs", permanent: true },
      { source: "/costs/dental-reconstruction", destination: "/costs", permanent: true },
      { source: "/costs/orthopedics", destination: "/costs", permanent: true },
      { source: "/costs/cardiac", destination: "/costs", permanent: true },
      { source: "/costs/fertility", destination: "/costs", permanent: true },
      { source: "/costs/oncology", destination: "/costs", permanent: true },
      { source: "/costs/bariatric", destination: "/costs", permanent: true },
      {
        source: "/costs/ebrt",
        destination: "/costs/external-beam-radiotherapy-ebrt",
        permanent: true,
      },
      {
        source: "/costs/3d-crt",
        destination: "/costs/3d-conformal-radiotherapy-3d-crt",
        permanent: true,
      },
      { source: "/journey", destination: "/blogs", permanent: true },
      { source: "/stories", destination: "/blogs", permanent: true },
      {
        source: "/blog/breast-cancer-treatment-by-stage",
        destination: "/blogs/breast-cancer-treatment-by-stage",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-treatment-cost-in-india",
        destination: "/blogs/breast-cancer-treatment-cost-in-india",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-stages-0-1-2-3-4",
        destination: "/blogs/breast-cancer-stages-0-1-2-3-4",
        permanent: true,
      },
      {
        source: "/blog/er-pr-her2-breast-cancer-treatment-india",
        destination: "/blogs/er-pr-her2-breast-cancer-treatment-india",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
        destination: "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-treatment-india-international-patients",
        destination: "/blogs/breast-cancer-treatment-india-international-patients",
        permanent: true,
      },
      {
        source: "/blog/her2-positive-breast-cancer-treatment-india",
        destination: "/blogs/her2-positive-breast-cancer-treatment-india",
        permanent: true,
      },
      {
        source: "/blog/hormone-therapy-breast-cancer-india",
        destination: "/blogs/hormone-therapy-breast-cancer-india",
        permanent: true,
      },
      {
        source: "/blog/breast-reconstruction-after-mastectomy-india",
        destination: "/blogs/breast-reconstruction-after-mastectomy-india",
        permanent: true,
      },
      {
        source: "/blog/radiation-therapy-for-breast-cancer",
        destination: "/blogs/radiation-therapy-for-breast-cancer",
        permanent: true,
      },
      {
        source: "/blog/chemotherapy-for-breast-cancer-in-india",
        destination: "/blogs/chemotherapy-for-breast-cancer-in-india",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-surgery-in-india",
        destination: "/blogs/breast-cancer-surgery-in-india",
        permanent: true,
      },
      {
        source: "/blog/lumpectomy-vs-mastectomy",
        destination: "/blogs/lumpectomy-vs-mastectomy",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-targeted-therapy-side-effects",
        destination: "/blogs/breast-cancer-targeted-therapy-side-effects",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-hormone-therapy-side-effects",
        destination: "/blogs/breast-cancer-hormone-therapy-side-effects",
        permanent: true,
      },
      {
        source: "/blog/breast-cancer-chemotherapy-side-effects",
        destination: "/blogs/breast-cancer-chemotherapy-side-effects",
        permanent: true,
      },
      { source: "/about", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Static crawl file. Long-lived so Hostinger CDN can answer PageSpeed
        // and Googlebot from the edge; the CSP lets Lighthouse fetch it from
        // the page origin (its robots-txt audit otherwise times out).
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Content-Security-Policy",
            value: "connect-src 'self'; script-src 'none'; object-src 'none'; frame-src 'none'",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        // Static images under /public. Every asset here is content-addressed
        // in practice (versioned query string, timestamped CMS uploads, or
        // generated infographics replaced under a new slug), so a year-long
        // immutable cache is safe and keeps repeat visits off the network.
        source: "/:path*/:file(.*\\.(?:webp|png|jpg|jpeg|svg|avif|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    // 60 is used for small photo tiles (destination cards) where the
    // default 75 spends bytes that are invisible at ~200px.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "enter.ginger.healthcare",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
