import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { MDXContent } from "@/components/mdx";
import { ManifestPage } from "@/components/manifest";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

type ProjectBrand = {
  primary: BrandUnit;
  secondary?: BrandUnit;
};

type BrandUnit = {
  label: string;
  mark?: string;
  image?: string;
  variant?: "square" | "wide";
};

const projectBrands: Record<string, ProjectBrand> = {
  "daybreaker-health": {
    primary: {
      label: "Daybreaker Health",
      image: "/images/brands/daybreaker-health-logo.jpg",
    },
  },
  checkfit: {
    primary: { label: "CheckFit", image: "/images/brands/checkfit-logo.jpg" },
  },
  imerit: {
    primary: { label: "iMerit", image: "/images/brands/imerit-logo.jpg" },
  },
  "blue-vision-labs-lyft": {
    primary: {
      label: "Blue Vision Labs",
      image: "/images/brands/blue-vision-labs-logo.jpg",
    },
    secondary: { label: "Lyft", image: "/images/brands/lyft-logo.jpg" },
  },
  gymnazo: {
    primary: { label: "Gymnazo", image: "/images/brands/gymnazo-logo.jpg" },
  },
  "monster-fitness": {
    primary: {
      label: "Monster Fitness",
      image: "/images/brands/monster-fitness-logo.png",
      variant: "wide",
    },
  },
};

export async function generateStaticParams() {
  const projects = getPosts("work");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPost("work", slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
      url: `${SITE_URL}/projects/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPost("work", slug);
  if (!project) notFound();

  return (
    <ManifestPage active="projects">
      <article className="content-shell">
        <header className="mb-8">
          <ProjectBrandMark brand={projectBrands[slug]} slug={slug} />
          <p className="project-year">{project.frontmatter.year}</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {project.frontmatter.title}
          </h1>
          <p className="text-[var(--mute)]">{project.frontmatter.description}</p>
        </header>
        <MDXContent source={project.content} />
      </article>
    </ManifestPage>
  );
}

function ProjectBrandMark({
  brand,
  slug,
}: {
  brand?: ProjectBrand;
  slug: string;
}) {
  if (!brand) return null;

  return (
    <div className={`project-brand project-brand-${slug}`}>
      <BrandTile unit={brand.primary} />
      {brand.secondary && (
        <>
          <span className="project-brand-arrow" aria-hidden="true">
            -&gt;
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
    unit.image ? "has-image" : "",
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
      {unit.image ? (
        <img
          src={unit.image}
          alt=""
          width={unit.variant === "wide" ? 520 : 100}
          height={unit.variant === "wide" ? 199 : 100}
        />
      ) : (
        <>
          <span className="project-brand-mark">{unit.mark}</span>
          <span className="project-brand-label">{unit.label}</span>
        </>
      )}
    </div>
  );
}
