import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { MDXContent } from "@/components/mdx";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getPosts("projects");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPost("projects", slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
      url: `${SITE_URL}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPost("projects", slug);
  if (!project) notFound();

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          {project.frontmatter.title}
        </h1>
        <p className="text-neutral-500">{project.frontmatter.description}</p>
        {project.frontmatter.url && (
          <a
            href={project.frontmatter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          >
            Visit {new URL(project.frontmatter.url).hostname} &rarr;
          </a>
        )}
      </header>
      <MDXContent source={project.content} />
    </article>
  );
}
