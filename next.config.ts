import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
    root: new URL(".", import.meta.url).pathname,
  },
};

export default nextConfig;
