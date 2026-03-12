import fs from "fs";
import path from "path";

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  published?: boolean;
  image?: string;
  url?: string;
};

export type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

function getContentDir(type: "blog" | "projects") {
  return path.join(process.cwd(), "content", type);
}

function parseFrontmatter(raw: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: { title: "", description: "", date: "" },
      content: raw,
    };
  }

  const yamlBlock = match[1];
  const content = match[2];

  const frontmatter: Record<string, string | boolean> = {};
  for (const line of yamlBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: string | boolean = line.slice(colonIndex + 1).trim();
    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true;
    if (value === "false") value = false;
    frontmatter[key] = value;
  }

  return { frontmatter: frontmatter as unknown as Frontmatter, content };
}

export function getPosts(type: "blog" | "projects"): Post[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { frontmatter, content } = parseFrontmatter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter,
      content,
    };
  });

  // Filter out unpublished posts in production
  const filtered =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => p.frontmatter.published !== false)
      : posts;

  // Sort by date, newest first
  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPost(
  type: "blog" | "projects",
  slug: string
): Post | undefined {
  const dir = getContentDir(type);
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(raw);
  return { slug, frontmatter, content };
}
