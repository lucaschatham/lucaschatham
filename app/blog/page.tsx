import { getPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on technology, health, and building things.",
};

export default function BlogPage() {
  const posts = getPosts("blog");

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              basePath="blog"
            />
          ))}
        </div>
      )}
    </div>
  );
}
