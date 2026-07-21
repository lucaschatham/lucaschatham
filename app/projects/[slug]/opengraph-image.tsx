import { ImageResponse } from "next/og";
import { EditorialSocialCard } from "@/components/editorial-social-card";
import { getPost } from "@/lib/content";
import { getProjectProfile } from "@/lib/project-manifest";

export const alt = "Lucas Chatham project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPost("work", slug);
  const profile = getProjectProfile(slug);

  return new ImageResponse(
    <EditorialSocialCard
      eyebrow="Selected work"
      title={project?.frontmatter.title ?? "Project case study"}
      description={
        profile?.cardDescription ??
        project?.frontmatter.description ??
        "AI product and operating-system work from Lucas Chatham."
      }
      meta={project?.frontmatter.year}
    />,
    size
  );
}
