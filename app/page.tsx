import {
  CareerThroughline,
  Hero,
  Lede,
  ManifestPage,
  RowsSection,
  projectToRow,
} from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { orderPortfolioProjects } from "@/lib/portfolio-order";
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
    "Product leader for enterprise AI, data operations, and high-stakes customer workflows.",
};

export default function Home() {
  const work = orderPortfolioProjects(getPosts("work")).map((project) =>
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
      <CareerThroughline />
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
