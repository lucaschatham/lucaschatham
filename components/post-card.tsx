import Link from "next/link";
import type { Frontmatter } from "@/lib/content";

type PostCardProps = {
  slug: string;
  frontmatter: Frontmatter;
  basePath: "blog" | "projects";
};

export function PostCard({ slug, frontmatter, basePath }: PostCardProps) {
  return (
    <Link
      href={`/${basePath}/${slug}`}
      className="block py-4 group min-h-[44px]"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-neutral-900 group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-400">
            {frontmatter.title}
          </h3>
          {frontmatter.url && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              Live
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {frontmatter.description}
        </p>
        <time className="text-xs text-neutral-400 dark:text-neutral-600">
          {formatDate(frontmatter.date)}
        </time>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
