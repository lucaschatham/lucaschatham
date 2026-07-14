import type { Metadata } from "next";
import { ManifestPage } from "@/components/manifest";
import { AuroraDeploymentExperience } from "@/components/aurora-deployment-experience";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aurora-INL Deployment Evidence",
  description: "A public-source model of Aurora-INL as a reactor built once on site and once in evidence.",
  alternates: {
    canonical: `${SITE_URL}/side-quests/aurora-inl`,
  },
  openGraph: {
    title: "Aurora-INL Deployment Evidence",
    description: "A public-source model of Aurora-INL's site, safety-basis, fuel, and licensing evidence.",
    url: `${SITE_URL}/side-quests/aurora-inl`,
    type: "article",
  },
};

export default function AuroraInlPage() {
  return (
    <ManifestPage active="side-quests">
      <AuroraDeploymentExperience />
    </ManifestPage>
  );
}
