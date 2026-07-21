import { ManifestPage, RowsSection, projectToRow } from "@/components/manifest";
import { getPosts } from "@/lib/content";
import { orderPortfolioProjects } from "@/lib/portfolio-order";
import { SITE_URL } from "@/lib/constants";
import { getProjectProfile } from "@/lib/project-manifest";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected AI product, operating-system, and advisory work from Lucas Chatham.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = orderPortfolioProjects(getPosts("work"));
  const featuredRows = projects
    .filter(
      (project) => getProjectProfile(project.slug)?.featureTier === "featured"
    )
    .map((project) => projectToRow(project, "projects"));
  const additionalRows = projects
    .filter(
      (project) => getProjectProfile(project.slug)?.featureTier === "additional"
    )
    .map((project) => projectToRow(project, "projects"));

  return (
    <ManifestPage active="projects">
      <section className="projects-intro" aria-labelledby="projects-heading">
        <p className="projects-kicker">Advisory and operating work</p>
        <h1 id="projects-heading">Systems for hard operating problems.</h1>
        <p>
          I help founders and executives make expert-led work visible, turn it
          into products and operating systems, and build the proof teams need
          to trust and scale it.
        </p>
      </section>
      <RowsSection
        heading="Featured work"
        kicker="SELECTED"
        rows={featuredRows}
      />
      <RowsSection
        heading="Additional work"
        kicker="EARLIER + FOUNDER"
        rows={additionalRows}
      />
    </ManifestPage>
  );
}
