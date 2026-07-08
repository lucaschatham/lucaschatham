import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { MDXContent } from "@/components/mdx";
import { ManifestPage } from "@/components/manifest";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const work = getPosts("work");
  return work.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPost("work", slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
      url: `${SITE_URL}/work/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/work/${slug}`,
    },
  };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPost("work", slug);
  if (!project) notFound();

  return (
    <ManifestPage active="work">
      <article className="content-shell">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {project.frontmatter.title}
          </h1>
          <p className="text-[var(--mute)]">{project.frontmatter.description}</p>
        </header>
        <MDXContent source={project.content} />
      </article>
    </ManifestPage>
  );
}
