import {
  Hero,
  ManifestPage,
  Portrait,
  RowsSection,
  homeEssayRows,
} from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

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
    "Operator. Building software, writing essays, broadcasting for the people figuring out what AI changes.",
};

export default function Home() {
  const essays = homeEssayRows(getPosts("blog"));

  return (
    <ManifestPage active="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <Portrait />
      <RowsSection
        heading="essays"
        kicker="LATEST"
        rows={essays}
        allHref="/essays"
        allLabel="View all essays"
      />
    </ManifestPage>
  );
}
