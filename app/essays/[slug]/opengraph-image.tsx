import { ImageResponse } from "next/og";
import { EditorialSocialCard } from "@/components/editorial-social-card";
import { getPost } from "@/lib/content";
import { formatPostTitle, formatShortDate } from "@/lib/formatting";

export const alt = "Essay by Lucas Chatham";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function EssayOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  const title = post
    ? formatPostTitle(post.frontmatter.title, post.frontmatter.subtitle)
    : "Essay";

  return new ImageResponse(
    <EditorialSocialCard
      eyebrow="Essay"
      title={title}
      description={
        post?.frontmatter.description ??
        "An essay on technology, operating systems, and human judgment."
      }
      meta={post ? formatShortDate(post.frontmatter.date) : undefined}
    />,
    size
  );
}
