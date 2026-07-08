import {
  Hero,
  Lede,
  ManifestPage,
  RowsSection,
  projectToRow,
} from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Chatham",
  url: SITE_URL,
  image: `${SITE_URL}/images/lucas-portrait-clean.jpg`,
  sameAs: ["https://x.com/lukeoutthebox"],
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  description:
    "Founder Operator building high-trust AI systems that turn messy real-world data into decisions people can bet on.",
};

export default function Home() {
  const work = getPosts("work").map((project) =>
    projectToRow(project, "projects")
  );

  return (
    <ManifestPage active="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <Lede />
      {work.length > 0 && (
        <RowsSection
          heading="work"
          kicker="PROOF"
          rows={work}
        />
      )}
    </ManifestPage>
  );
}
