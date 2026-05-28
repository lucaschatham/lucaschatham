import type { Metadata } from "next";
import type { Viewport } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./global.css";

const portraitUrl = `${SITE_URL}/images/lucas-portrait-clean.jpg`;
const iconHref =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' rx='32' fill='%23000'/%3E%3Ctext x='90' y='120' font-family='ui-sans-serif,system-ui,-apple-system,sans-serif' font-weight='700' font-size='92' fill='%233aafff' text-anchor='middle'%3ELC%3C/text%3E%3C/svg%3E";
const socialDescription =
  "Building technology to help you live healthier, longer. Weekly newsletter on health science. Maker at heart.";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "Lucas",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lucas",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: iconHref, type: "image/svg+xml" }],
    apple: [{ url: iconHref }],
  },
  openGraph: {
    title: SITE_NAME,
    description: socialDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: portraitUrl,
        width: 1200,
        height: 1500,
        alt: "Lucas Chatham",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@lukeoutthebox",
    creator: "@lukeoutthebox",
    title: SITE_NAME,
    description: socialDescription,
    images: [portraitUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
