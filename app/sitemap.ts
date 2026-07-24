import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

const AI_CONSULTING_URL = `${SITE_URL}/ai-consulting`;

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getPosts("blog").map((post) => ({
    url: `${SITE_URL}/essays/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  const work = getPosts("work").map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  const sideQuests = getPosts("side-quests").map((project) => ({
    url: `${SITE_URL}/side-quests/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  const staticPages = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/essays`, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/side-quests`, lastModified: new Date() },
    { url: AI_CONSULTING_URL, lastModified: new Date() },
  ];

  return [...staticPages, ...blogPosts, ...work, ...sideQuests];
}
