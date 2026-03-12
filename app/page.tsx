import { getPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getPosts("blog").slice(0, 5);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">
          Lucas Chatham
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Building things at the intersection of health, technology, and design.
          Writing about what I learn along the way.
        </p>
      </section>

      {posts.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-4">Recent posts</h2>
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
        </section>
      )}
    </div>
  );
}
