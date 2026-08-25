import {
  Hero,
  ManifestPage,
  RowsSection,
  projectToRow,
} from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { orderPortfolioProjects } from "@/lib/portfolio-order";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

const openSourceProjects = [
  {
    title: "Nuclear Atlas",
    dek: "Nuclear Atlas brings scattered nuclear industry facts into one searchable map. Each claim links back to its source so people can check the evidence themselves.",
    href: "https://github.com/lucaschatham/nuclear-atlas",
    meta: "MIT",
    tags: ["Open Data", "Nuclear Energy"],
    icon: {
      label: "3D radioactive sign",
      image: "/images/open-source/nuclear-atlas-radioactive.png",
    },
  },
  {
    title: "Operation Learn West Coast Swing",
    dek: "This is a free, structured guide for learning West Coast Swing, plus a dataset of moves and teaching materials. Every visual links to where it came from, so learners and teachers can verify and improve it.",
    href: "https://github.com/lucaschatham/operation-learn-west-coast-swing",
    meta: "CC BY-SA 4.0",
    tags: ["Open Curriculum", "Dance"],
    icon: {
      label: "3D footprints",
      image: "/images/open-source/west-coast-swing-footprints.png",
    },
  },
  {
    title: "RemNote Connect",
    dek: "RemNote Connect lets other tools talk to your notes without sending them to someone else’s server. That means you can use scripts, terminal commands, or AI helpers while your data stays on your computer.",
    href: "https://github.com/lucaschatham/remnoteconnect",
    meta: "MIT",
    tags: ["Local First", "Learning"],
    icon: {
      label: "3D chain link",
      image: "/images/open-source/remnote-connect-link.png",
    },
  },
];
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
  const work = orderPortfolioProjects(getPosts("work"))
    .map((project) => projectToRow(project, "projects"));

  return (
    <ManifestPage active="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      {work.length > 0 && (
        <RowsSection
          heading="work"
          kicker=""
          rows={work}
        />
      )}
      <RowsSection
        heading="Open Source"
        kicker=""
        description="Open source projects are free, open, and available to everyone, which means anyone can inspect them, use them, suggest improvements, or build on them. The projects below I’ve either authored or helped move forward."
        rows={openSourceProjects}
      />
    </ManifestPage>
  );
}
