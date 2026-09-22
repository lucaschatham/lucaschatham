import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [{
      source: "/briefings/:path*",
      headers: [
        { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    }];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/essays",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/essays/:slug",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
};

export default nextConfig;
