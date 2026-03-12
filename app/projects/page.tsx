import { getPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and worked on.",
};

export default function ProjectsPage() {
  const projects = getPosts("projects");

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-neutral-500">No projects yet.</p>
      ) : (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {projects.map((project) => (
            <PostCard
              key={project.slug}
              slug={project.slug}
              frontmatter={project.frontmatter}
              basePath="projects"
            />
          ))}
        </div>
      )}
    </div>
  );
}
