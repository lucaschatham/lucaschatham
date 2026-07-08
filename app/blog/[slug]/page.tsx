import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { MDXContent } from "@/components/mdx";
import { ManifestPage } from "@/components/manifest";
import { ReadingProgress } from "@/components/reading-progress";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPosts("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) return {};
  const title = formatPostTitle(post.frontmatter.title, post.frontmatter.subtitle);

  return {
    title,
    description: post.frontmatter.description,
    openGraph: {
      title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      url: `${SITE_URL}/blog/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) notFound();

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
