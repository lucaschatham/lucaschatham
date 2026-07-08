import type { Post } from "@/lib/content";

const portfolioProjectOrder = [
  "imerit",
  "blue-vision-labs-lyft",
  "daybreaker-health",
  "checkfit",
  "gymnazo",
  "monster-fitness",
];

export function orderPortfolioProjects(projects: Post[]): Post[] {
  return [...projects].sort((a, b) => {
    const aIndex = portfolioProjectOrder.indexOf(a.slug);
    const bIndex = portfolioProjectOrder.indexOf(b.slug);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });
}
