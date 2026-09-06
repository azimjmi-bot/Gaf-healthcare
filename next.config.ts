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
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
