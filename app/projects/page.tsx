import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and worked on.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getPosts("projects");
  const rows = projects.map((project) => projectToRow(project));

  return (
    <ManifestPage active="projects">
      <RowsSection heading="projects" kicker="BUILT" rows={rows} />
    </ManifestPage>
  );
}
