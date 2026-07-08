import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getPosts("blog").map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  const work = getPosts("work").map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  const sideQuests = getPosts("side-quests").map((project) => ({
    url: `${SITE_URL}/side-quests/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  const staticPages = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/essays`, lastModified: new Date() },
    { url: `${SITE_URL}/work`, lastModified: new Date() },
    { url: `${SITE_URL}/side-quests`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
  ];

  return [...staticPages, ...blogPosts, ...work, ...sideQuests];
}
