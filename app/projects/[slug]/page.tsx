import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, parseTags } from "@/lib/content";
import { MDXContent } from "@/components/mdx";
import { ManifestPage } from "@/components/manifest";
import { TagList } from "@/components/tag-list";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  getProjectProfile,
  type BrandUnit,
  type ProjectBrand,
  type ProjectSnapshotItem,
} from "@/lib/project-manifest";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getPosts("work");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPost("work", slug);
  if (!project) return {};
  const tags = parseTags(project.frontmatter.tags);

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    keywords: tags,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
      tags,
      url: `${SITE_URL}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      images: [`${SITE_URL}/projects/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPost("work", slug);
  const profile = getProjectProfile(slug);
  if (!project || !profile) notFound();
  const tags = parseTags(project.frontmatter.tags);
  const relatedProject = getPost("work", profile.relatedSlug);

  const hero =
    profile.heroStatement ??
    project.frontmatter.hero ??
    project.frontmatter.description;
  const image = profile.media.image ?? project.frontmatter.image;
  const imageAlt =
    profile.media.imageAlt ??
    project.frontmatter.imageAlt ??
    `${project.frontmatter.title} project visual`;
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.frontmatter.title,
    description: project.frontmatter.description,
    url: `${SITE_URL}/projects/${slug}`,
    dateCreated: project.frontmatter.date,
    image: image ? `${SITE_URL}${image}` : undefined,
    keywords: tags,
    creator: {
      "@type": "Person",
      name: "Lucas Chatham",
      url: SITE_URL,
    },
  };

  return (
    <ManifestPage active="projects">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <article className="content-shell">
        <header className="mb-8">
          <ProjectBrandMark brand={profile.brand} slug={slug} />
          <p className="project-year">{project.frontmatter.year}</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {project.frontmatter.title}
          </h1>
          <TagList tags={tags} placement="detail" />
          <p className="project-hero-statement">{hero}</p>
          <ProjectSnapshot items={profile.snapshot} />
          <ProjectAttribution>{profile.attribution}</ProjectAttribution>
          <ProjectHeroMedia image={image} alt={imageAlt} />
        </header>
        <MDXContent source={project.content} />
        {relatedProject && (
          <ProjectNext
            relatedSlug={relatedProject.slug}
            relatedTitle={relatedProject.frontmatter.title}
            relatedDescription={relatedProject.frontmatter.description}
          />
        )}
      </article>
    </ManifestPage>
  );
}

function ProjectAttribution({ children }: { children: string }) {
  return (
    <aside className="project-attribution">
      <p className="project-attribution-label">Scope and attribution</p>
      <p>{children}</p>
    </aside>
  );
}

function ProjectNext({
  relatedSlug,
  relatedTitle,
  relatedDescription,
}: {
  relatedSlug: string;
  relatedTitle: string;
  relatedDescription: string;
}) {
  return (
    <footer className="project-next">
      <div>
        <p className="project-next-label">Related case</p>
        <Link href={`/projects/${relatedSlug}`} prefetch={false}>
          <strong>{relatedTitle}</strong>
          <span>{relatedDescription}</span>
          <span aria-hidden="true">View case →</span>
        </Link>
      </div>
      <div>
        <p className="project-next-label">Have a hard problem?</p>
        <a className="hero-action hero-action-primary" href="#contact">
          Discuss a hard problem
        </a>
      </div>
    </footer>
  );
}

function ProjectHeroMedia({
  image,
  alt,
}: {
  image?: string;
  alt: string;
}) {
  if (!image) return null;

  return (
    <figure className="project-hero-media">
      <a
        className="project-hero-media-link"
        href={image}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={image} alt={alt} />
        <span className="project-hero-media-open">
          View full-size artifact <span aria-hidden="true">↗</span>
        </span>
      </a>
    </figure>
  );
}

function ProjectSnapshot({ items }: { items: readonly ProjectSnapshotItem[] }) {
  return (
    <section className="project-snapshot" aria-label="Project snapshot">
      {items.map((item) => (
        <article className="project-snapshot-item" key={item.label}>
          <span className="project-snapshot-label">{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
    </section>
  );
}

function ProjectBrandMark({
  brand,
  slug,
}: {
  brand: ProjectBrand;
  slug: string;
}) {
  return (
    <div className={`project-brand project-brand-${slug}`}>
      <BrandTile unit={brand.primary} />
      {brand.secondary && (
        <>
          <span className="project-brand-arrow" aria-hidden="true">
            →
          </span>
          <BrandTile unit={brand.secondary} secondary />
        </>
      )}
    </div>
  );
}

function BrandTile({
  unit,
  secondary = false,
}: {
  unit: BrandUnit;
  secondary?: boolean;
}) {
  const classNames = [
    "project-brand-tile",
    secondary ? "secondary" : "",
    "has-image",
    unit.variant === "wide" ? "wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      aria-label={unit.label}
      title={unit.label}
    >
      <img
        src={unit.image}
        alt=""
        width={unit.variant === "wide" ? 520 : 100}
        height={unit.variant === "wide" ? 199 : 100}
      />
    </div>
  );
}
