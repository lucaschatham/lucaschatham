import type { Metadata } from "next";
import { ManifestPage } from "@/components/manifest";
import { AuroraDeploymentExperience } from "@/components/aurora-deployment-experience";
import { getPost, parseTags } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

const auroraPost = getPost("side-quests", "aurora-inl");
const auroraTags = parseTags(auroraPost?.frontmatter.tags);

export const metadata: Metadata = {
  title: "Aurora-INL Deployment Evidence",
  description: "A public-source model of Aurora-INL as a reactor built once on site and once in evidence.",
  keywords: auroraTags,
  alternates: {
    canonical: `${SITE_URL}/side-quests/aurora-inl`,
  },
  openGraph: {
    title: "Aurora-INL Deployment Evidence",
    description: "A public-source model of Aurora-INL's site, safety-basis, fuel, and licensing evidence.",
    url: `${SITE_URL}/side-quests/aurora-inl`,
    type: "article",
    tags: auroraTags,
  },
};

export default function AuroraInlPage() {
  return (
    <ManifestPage active="side-quests">
      <AuroraDeploymentExperience tags={auroraTags} />
    </ManifestPage>
  );
}
