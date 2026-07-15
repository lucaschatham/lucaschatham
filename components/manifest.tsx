import Link from "next/link";
import type { ReactNode } from "react";
import { TagList } from "@/components/tag-list";
import { parseTags, type Post } from "@/lib/content";

type NavKey = "home" | "essays" | "projects" | "side-quests";

type Row = {
  title: string;
  subtitle?: string;
  dek: ReactNode;
  href: string;
  meta: string;
  tags?: string[];
  logo?: RowLogo;
};

type RowLogo = {
  label: string;
  image?: string;
  mark?: string;
  variant?: "square" | "wide";
  secondary?: Omit<RowLogo, "secondary">;
};

const projectRowLogos: Record<string, RowLogo> = {
  "daybreaker-health": {
    label: "Daybreaker Health",
    image: "/images/brands/daybreaker-health-logo.jpg",
  },
  checkfit: {
    label: "CheckFit",
    image: "/images/brands/checkfit-logo.jpg",
  },
  imerit: {
    label: "iMerit",
    image: "/images/brands/imerit-logo.jpg",
  },
  "blue-vision-labs-lyft": {
    label: "Blue Vision Labs",
    image: "/images/brands/blue-vision-labs-logo.jpg",
    secondary: {
      label: "Lyft",
      image: "/images/brands/lyft-logo.jpg",
    },
  },
  gymnazo: {
    label: "Gymnazo",
    image: "/images/brands/gymnazo-logo.jpg",
  },
  "monster-fitness": {
    label: "Monster Fitness",
    image: "/images/brands/monster-fitness-logo.png",
    variant: "wide",
  },
};

function projectListDek(project: Post): ReactNode {
  switch (project.slug) {
    case "imerit":
      return (
        <>
          Built <span className="row-pop">Ground Control</span>, a data analytics
          platform giving real-time operating visibility into{" "}
          <span className="row-pop">6,000+</span> annotators for enterprise AI
          clients including <span className="row-pop">JOHN DEERE</span>,{" "}
          <span className="row-pop">CRUISE</span>, and{" "}
          <span className="row-pop">NETFLIX</span>.
        </>
      );
    case "blue-vision-labs-lyft":
      return (
        <>
          Scaled computer-vision data ingestion and mapping operations from{" "}
          <span className="row-pop">3 cities -&gt; 2 countries</span>, helping
          produce one of the largest public autonomous-vehicle street-mapping
          datasets of its time,{" "}
          <span className="row-pop">acq&apos;d by Lyft</span>.
        </>
      );
    case "daybreaker-health":
      return (
        <>
          Founded a <span className="row-pop">diagnostics-driven</span> longevity
          company that turns bloodwork, genetics, lifestyle data, and coaching
          into personalized protocols and measurable{" "}
          <span className="row-pop">retesting loops</span>.
        </>
      );
    case "checkfit":
      return (
        <>
          Founded an <span className="row-pop">AI movement coach</span> that turns
          goals, soreness, sleep, nutrition, constraints, and schedule changes
          into adaptive training and biomechanics decisions.
        </>
      );
    case "gymnazo":
      return (
        <>
          Helped turn expert movement coaching into repeatable products,
          curriculum, and sales systems tied to{" "}
          <span className="row-pop">209% YoY revenue growth</span>, a{" "}
          <span className="row-pop">$2,000 certification</span>,{" "}
          <span className="row-pop">3,500+ customers</span>, and demand strong
          enough to justify a{" "}
          <span className="row-pop">third location</span>.
        </>
      );
    case "monster-fitness":
      return (
        <>
          Scaled the sales team while still in{" "}
          <span className="row-pop">high school</span>, coached{" "}
          <span className="row-pop">6 sales agents</span>, wrote the playbook,
          and helped drive{" "}
          <span className="row-pop">3x annual revenue</span> and{" "}
          <span className="row-pop">NPS 31 -&gt; 68</span>.
        </>
      );
    default:
      return project.frontmatter.description;
  }
}

export function postToRow(
  post: Post,
  basePath: "blog" | "work" | "side-quests"
): Row {
  return {
    title: post.frontmatter.title,
    subtitle: post.frontmatter.subtitle,
    dek: post.frontmatter.description,
    href: `/${basePath}/${post.slug}`,
    meta: formatEssayDate(post.frontmatter.date),
    tags: parseTags(post.frontmatter.tags),
  };
}

export function projectToRow(
  project: Post,
  basePath: "projects" | "side-quests" = "projects"
): Row {
  const isPortfolioProject = basePath === "projects";

  return {
    title: project.frontmatter.title,
    dek: isPortfolioProject
      ? projectListDek(project)
      : project.frontmatter.description,
    href: project.frontmatter.url ?? `/${basePath}/${project.slug}`,
    meta: isPortfolioProject
      ? project.frontmatter.year ?? ""
      : project.frontmatter.url
        ? "Live"
        : "Read",
    tags: parseTags(project.frontmatter.tags),
    logo: isPortfolioProject ? projectRowLogos[project.slug] : undefined,
  };
}

export function ManifestPage({
  active,
  children,
}: {
  active: NavKey;
  children: ReactNode;
}) {
  return (
    <>
      <div className="page">
        <ManifestNav active={active} />
        <main id="main">{children}</main>
        <SocialFooter />
        <ManifestFooter />
      </div>
    </>
  );
}

export function ManifestNav({ active }: { active: NavKey }) {
  const links: { key: NavKey; href: string; label: string }[] = [
    { key: "projects", href: "/projects", label: "Work" },
    { key: "essays", href: "/essays", label: "Essays" },
    { key: "side-quests", href: "/side-quests", label: "Side Quests" },
  ];

  const homeActive = active === "home";

  return (
    <nav className="nav" aria-label="Primary">
      <Link
        href="/"
        prefetch={false}
        className={homeActive ? "home-link active" : "home-link"}
        aria-label="Lucas Chatham — home"
        aria-current={homeActive ? "page" : undefined}
      >
        <span className="home-signal" aria-hidden="true" />
        Home
      </Link>
      <div className="nav-links">
        {links.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              href={item.href}
              prefetch={false}
              className={isActive ? "active" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="dot" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="hero-cine" aria-labelledby="home-hero-title">
      <img
        src="/images/lucas-portrait-clean.jpg"
        srcSet="/images/lucas-portrait-clean-430.jpg 430w, /images/lucas-portrait-clean-860.jpg 860w, /images/lucas-portrait-clean.jpg 1200w"
        sizes="(max-width: 520px) 100vw, 520px"
        alt="Portrait of Lucas Chatham"
        width="1200"
        height="1800"
        fetchPriority="high"
        decoding="async"
      />
      <div className="scrim" aria-hidden="true" />
      <h1 className="name" id="home-hero-title">
        <Link href="/" aria-label="Lucas Chatham — home">
          Lucas
          <br />
          <b>Chatham</b>
        </Link>
        <span className="hero-role">
          <span className="hero-role-main">Founder operator · Product leader</span>
        </span>
      </h1>
    </section>
  );
}

export function Lede() {
  return (
    <section className="lede" aria-label="Positioning">
      <p className="proof-line">
        I lead products for enterprise AI, data operations, and high-stakes
        customer workflows.
      </p>
      <div className="hero-actions" aria-label="Primary actions">
        <Link className="hero-action hero-action-primary" href="#work-heading">
          View selected work
          <ArrowRightIcon />
        </Link>
        <a className="hero-action" href="mailto:chathamworks@gmail.com">
          Email Lucas
        </a>
      </div>
    </section>
  );
}

export function CareerThroughline() {
  return (
    <section className="throughline" aria-labelledby="throughline-heading">
      <div className="throughline-heading-row">
        <h2 id="throughline-heading">Career throughline</h2>
      </div>
      <p className="throughline-summary">
        Across AI, mapping, health, coaching, and sales:
      </p>
      <ol className="throughline-path">
        <li>Make invisible work legible</li>
        <li>Turn judgment into systems</li>
        <li>Scale trust with proof</li>
      </ol>
    </section>
  );
}

export function RowsSection({
  heading,
  kicker,
  rows,
  headingLevel = 2,
  allHref,
  allLabel,
  emptyLabel,
}: {
  heading: string;
  kicker: string;
  rows: Row[];
  headingLevel?: 1 | 2;
  allHref?: string;
  allLabel?: string;
  emptyLabel?: string;
}) {
  const headingId = `${heading.toLowerCase().replace(/\s+/g, "-")}-heading`;
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section className="man" aria-labelledby={headingId}>
      <Heading className="h" id={headingId}>
        <span className="l">{heading}</span>
        {kicker && <span className="n">{kicker}</span>}
      </Heading>
      {rows.map((row) => (
        <ManifestRow key={`${row.href}-${row.title}`} row={row} />
      ))}
      {rows.length === 0 && emptyLabel && (
        <p className="empty-state">{emptyLabel}</p>
      )}
      {rows.length > 0 && allHref && allLabel && (
        <Link className="all" href={allHref}>
          {allLabel}
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}

function ManifestRow({ row }: { row: Row }) {
  const isExternal = row.href.startsWith("http");
  const className = "r";
  const content = (
    <>
      <div className="row-main">
        {row.logo && <RowLogoMark logo={row.logo} />}
        <div className="t">
          {row.title}
          {row.subtitle && <span className="st">{row.subtitle}</span>}
          <TagList tags={row.tags} placement="row" />
          <span className="s">{row.dek}</span>
        </div>
      </div>
      <div className={row.meta ? "meta" : "meta meta-icon-only"}>
        {row.meta && <span>{row.meta}</span>}
        <ArrowUpRightIcon />
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        className={className}
        href={row.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={row.href} prefetch={false}>
      {content}
    </Link>
  );
}

function RowLogoMark({ logo }: { logo: RowLogo }) {
  return (
    <span
      className={logo.secondary ? "row-logo row-logo-pair" : "row-logo"}
      aria-label={logo.label}
      title={logo.label}
    >
      <RowLogoTile logo={logo} />
      {logo.secondary && (
        <>
          <span className="row-logo-arrow" aria-hidden="true">
            -&gt;
          </span>
          <RowLogoTile logo={logo.secondary} secondary />
        </>
      )}
    </span>
  );
}

function RowLogoTile({
  logo,
  secondary = false,
}: {
  logo: Omit<RowLogo, "secondary">;
  secondary?: boolean;
}) {
  const className = [
    "row-logo-tile",
    logo.image ? "has-image" : "",
    logo.variant === "wide" ? "wide" : "",
    secondary ? "secondary" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} aria-hidden="true">
      {logo.image ? (
        <img
          src={logo.image}
          alt=""
          width={logo.variant === "wide" ? 520 : 100}
          height={logo.variant === "wide" ? 199 : 100}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="row-logo-mark">{logo.mark}</span>
      )}
    </span>
  );
}

export function SocialFooter() {
  return (
    <nav className="com" aria-label="Social">
      <a
        href="https://www.linkedin.com/in/lucaschatham/"
        rel="me noopener"
        aria-label="LinkedIn"
      >
        <span className="ic">
          <LinkedInIcon />
        </span>
        LinkedIn
      </a>
      <a
        href="mailto:chathamworks@gmail.com"
        rel="me"
        aria-label="Email Lucas Chatham"
      >
        <span className="ic">
          <EmailIcon />
        </span>
        Email
      </a>
      <a
        href="https://github.com/lucaschatham"
        rel="me noopener"
        aria-label="GitHub"
      >
        <span className="ic">
          <GitHubIcon />
        </span>
        GitHub
      </a>
      <a
        href="https://levelwithlucas.lucaschatham.com/archive"
        rel="me noopener"
        aria-label="Blog newsletter"
      >
        <span className="ic">
          <NewsletterIcon />
        </span>
        Blog
      </a>
      {/* X hidden for now — uncomment to restore.
      <a href="https://x.com/lukeoutthebox" rel="me noopener" aria-label="X (formerly Twitter)"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></span>X</a>
      */}
      {/* Podcast is hidden until a real destination exists.
      <span
        className="social-disabled"
        role="link"
        aria-disabled="true"
        aria-label="Podcast"
      >
        <span className="ic">
          <PodcastIcon />
        </span>
        Podcast
      </span>
      */}
    </nav>
  );
}

export function ManifestFooter() {
  return <footer className="ft">© Lucas Chatham · Made in California</footer>;
}

function formatEssayDate(dateString: string): string {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArrowUpRightIcon() {
  return (
    <svg className="arr" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17L17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.2-8 5-8-5V6l8 5 8-5v2.2Z" />
    </svg>
  );
}

function NewsletterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zM4 6l8 5 8-5H4zm0 12V8.236l8 5 8-5V18H4z" />
    </svg>
  );
}

// Hidden until podcast links return.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PodcastIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 4.69a3.41 3.41 0 1 1 0 6.82 3.41 3.41 0 0 1 0-6.82zm0 14.74c-2.84 0-5.36-1.46-6.83-3.66a1.7 1.7 0 0 1 .73-2.5c1.8-.88 3.9-1.39 6.1-1.39 2.2 0 4.3.51 6.1 1.39a1.7 1.7 0 0 1 .73 2.5A8.18 8.18 0 0 1 12 19.43z" />
    </svg>
  );
}
