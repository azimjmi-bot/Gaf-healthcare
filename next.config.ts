import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "172.30.0.2",
    "*.trycloudflare.com",
  ],
  async redirects() {
    return [
      { source: "/destinations", destination: "/hospitals", permanent: true },
      { source: "/destinations/:slug", destination: "/hospitals", permanent: true },
      { source: "/treatments", destination: "/costs", permanent: true },
      { source: "/treatments/:slug", destination: "/costs/:slug", permanent: true },
      { source: "/costs/facial-aesthetics", destination: "/costs", permanent: true },
      { source: "/costs/hair-restoration", destination: "/costs", permanent: true },
      { source: "/costs/dental-reconstruction", destination: "/costs", permanent: true },
      { source: "/costs/orthopedics", destination: "/costs", permanent: true },
      { source: "/costs/cardiac", destination: "/costs", permanent: true },
      { source: "/costs/fertility", destination: "/costs", permanent: true },
      { source: "/costs/oncology", destination: "/costs", permanent: true },
      { source: "/costs/bariatric", destination: "/costs", permanent: true },
      { source: "/journey", destination: "/blogs", permanent: true },
      { source: "/stories", destination: "/blogs", permanent: true },
      { source: "/about", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "enter.ginger.healthcare",
      },
    ],
  },
};

export default nextConfig;
