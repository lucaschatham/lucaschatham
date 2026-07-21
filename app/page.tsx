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
  jobTitle: "Founder, product operator, and advisor",
  sameAs: [
    "https://www.linkedin.com/in/lucaschatham/",
    "https://github.com/lucaschatham",
    "https://x.com/lukeoutthebox",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  description:
    "Lucas Chatham advises founders and executives on high-stakes AI products and operating systems.",
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
