import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and worked on.",
};

export default function ProjectsPage() {
  const projects = getPosts("projects");
  const rows = projects.map((project, index) =>
    projectToRow(project, index, projects.length)
  );

  return (
    <ManifestPage active="projects">
      <RowsSection heading="projects" kicker="BUILT" rows={rows} />
    </ManifestPage>
  );
}
