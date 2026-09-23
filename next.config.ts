import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const labelReviewOrigin = "https://label-review-7b3.lucaschatham.com";

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
  async rewrites() {
    // The independently deployed app uses these root-relative paths. Fallback
    // rewrites keep existing website files and routes ahead of the app proxy.
    return {
      fallback: [
        {
          source: "/alcohol-by-volume-automated-label-check",
          destination: `${labelReviewOrigin}/`,
        },
        ...["assets", "ocr", "samples"].map((directory) => ({
          source: `/${directory}/:path*`,
          destination: `${labelReviewOrigin}/${directory}/:path*`,
        })),
        {
          source: "/api/warning-appearance",
          destination: `${labelReviewOrigin}/api/warning-appearance`,
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        // Preserve the website's www canonical host while allowing the app
        // and its dependencies to load directly on the requested apex URL.
        source: "/:path((?!alcohol-by-volume-automated-label-check/?$|(?:assets|ocr|samples)(?:/|$)|api/warning-appearance/?$).*)",
        has: [{ type: "host", value: "lucaschatham.com" }],
        destination: "https://www.lucaschatham.com/:path",
        permanent: false,
      },
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
