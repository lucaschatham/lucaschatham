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

type ProjectSnapshotItem = {
  label: string;
  value: string;
  detail: string;
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

const projectSnapshots: Record<string, ProjectSnapshotItem[]> = {
  "daybreaker-health": [
    {
      label: "Role",
      value: "Founder",
      detail: "Built the product logic, diagnostic workflow, and service model.",
    },
    {
      label: "System",
      value: "Clinical-adjacent",
      detail: "Bloodwork, genetics, lifestyle data, protocols, and coaching.",
    },
    {
      label: "Proof",
      value: "Retesting loops",
      detail: "Personalized protocols tied back to measurable follow-through.",
    },
  ],
  checkfit: [
    {
      label: "Role",
      value: "Founder / builder",
      detail: "Turned 14+ years of coaching judgment into product logic and a beta app.",
    },
    {
      label: "System",
      value: "Adaptive plans",
      detail: "Translated goals, recovery, schedule, nutrition, and pain signals into decisions.",
    },
    {
      label: "Proof",
      value: "Working beta",
      detail: "Generated and adjusted coaching plans from real user context.",
    },
  ],
  imerit: [
    {
      label: "Role",
      value: "Senior Product Manager",
      detail: "Owned product vision, requirements, roadmap, and stakeholder alignment.",
    },
    {
      label: "System",
      value: "Ground Control",
      detail: "Data analytics platform for distributed enterprise AI operations.",
    },
    {
      label: "Proof",
      value: "6,000+ annotators",
      detail: "Real-time visibility across tools, teams, time zones, and customers.",
    },
  ],
  "blue-vision-labs-lyft": [
    {
      label: "Role",
      value: "Mapping operations",
      detail: "Tested, redesigned, deployed, and scaled field capture systems.",
    },
    {
      label: "System",
      value: "Camera-phone mapping",
      detail: "City-scale 3D maps from real-world fleet capture.",
    },
    {
      label: "Proof",
      value: "3 cities -> 2 countries",
      detail: "Helped produce a major public autonomous-vehicle street dataset.",
    },
  ],
  gymnazo: [
    {
      label: "Role",
      value: "Operator",
      detail: "Converted expert movement coaching into products, curriculum, and sales systems.",
    },
    {
      label: "System",
      value: "Coach scaling",
      detail: "Made founder-level judgment reproducible across coaches and customers.",
    },
    {
      label: "Proof",
      value: "3,500+ customers",
      detail: "Helped support 209% YoY growth, a $2,000 certification, and a third location.",
    },
  ],
  "monster-fitness": [
    {
      label: "Role",
      value: "Sales operator",
      detail: "Scaled the sales team while still in high school.",
    },
    {
      label: "System",
      value: "Sales playbook",
      detail: "Built repeatable sales, follow-up, retention, upsell, and account workflows.",
    },
    {
      label: "Proof",
      value: "3x revenue",
      detail: "Coached 6 sales agents and helped lift NPS from 31 to 68.",
    },
  ],
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
          <ProjectHeroMedia
            image={project.frontmatter.image}
            title={project.frontmatter.title}
          />
          <ProjectSnapshot items={projectSnapshots[slug]} />
        </header>
        <MDXContent source={project.content} />
      </article>
    </ManifestPage>
  );
}

function ProjectHeroMedia({
  image,
  title,
}: {
  image?: string;
  title: string;
}) {
  if (!image) return null;

  return (
    <figure className="project-hero-media">
      <img src={image} alt={`${title} project visual`} />
    </figure>
  );
}

function ProjectSnapshot({ items }: { items?: ProjectSnapshotItem[] }) {
  if (!items?.length) return null;

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
