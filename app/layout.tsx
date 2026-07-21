import type { Metadata } from "next";
import type { Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";
import "./redesign.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const portraitUrl = `${SITE_URL}/images/lucas-portrait-clean.jpg`;
const iconHref =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' rx='32' fill='%231A1C1F'/%3E%3Crect x='16' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='124' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='16' y='70' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='70' width='40' height='40' fill='%23CB3A2D'/%3E%3Crect x='124' y='70' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='16' y='124' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='124' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='124' y='124' width='40' height='40' fill='%236B6E72'/%3E%3C/svg%3E";
export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: portraitUrl,
        width: 1200,
        height: 1800,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.variable}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
