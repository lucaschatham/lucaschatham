import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio projects and past work from Lucas Chatham.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getPosts("work");
  const rows = projects.map((project) => projectToRow(project, "projects"));

  return (
    <ManifestPage active="projects">
      <RowsSection heading="projects" kicker="" rows={rows} />
    </ManifestPage>
  );
}
