import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ManifestPage } from "@/components/manifest";
import { MDXContent } from "@/components/mdx";
import { ReadingProgress } from "@/components/reading-progress";
import { TagList } from "@/components/tag-list";
import { SITE_URL } from "@/lib/constants";
import { getPost, getPosts, parseTags } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPosts("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) return {};

  const title = formatPostTitle(post.frontmatter.title, post.frontmatter.subtitle);
  const tags = parseTags(post.frontmatter.tags);

  return {
    title,
    description: post.frontmatter.description,
    keywords: tags,
    openGraph: {
      title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags,
      url: `${SITE_URL}/essays/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/essays/${slug}`,
    },
  };
}

export default async function EssayPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) notFound();

  const tags = parseTags(post.frontmatter.tags);

  return (
    <ManifestPage active="essays">
      <ReadingProgress />
      <article className="content-shell">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.subtitle && (
            <p className="text-xl text-[var(--silver-200)] leading-tight mb-3">
              {post.frontmatter.subtitle}
            </p>
          )}
          <TagList tags={tags} placement="detail" />
          <time className="text-sm text-[var(--mute)]">
            {new Date(`${post.frontmatter.date}T00:00:00`).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>
        </header>
        <MDXContent source={post.content} />
      </article>
    </ManifestPage>
  );
}

function formatPostTitle(title: string, subtitle?: string) {
  return subtitle ? `${title}: ${subtitle}` : title;
}
