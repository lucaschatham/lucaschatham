import Link from "next/link";
import type { ReactNode } from "react";
import { NavigationTools } from "@/components/navigation-tools";
import { TagList } from "@/components/tag-list";
import { CONTACT_MAILTO } from "@/lib/constants";
import { parseTags, type Post } from "@/lib/content";
import { formatShortDate } from "@/lib/formatting";
import { getProjectProfile } from "@/lib/project-manifest";

type NavKey = "home" | "essays" | "projects" | "side-quests";

type Row = {
  title: string;
  subtitle?: string;
  dek: ReactNode;
  href: string;
  meta: string;
  tags?: string[];
  logo?: RowLogo;
  icon?: RowIcon;
};

type RowIcon = {
  label: string;
  image: string;
};

type RowLogo = {
  label: string;
  image: string;
  variant?: "square" | "wide";
  secondary?: Omit<RowLogo, "secondary">;
};

const sideQuestRowIcons: Record<string, RowIcon> = {
  "aurora-inl": {
    label: "Laboratory flask",
    image: "/images/side-quests/icons/lab.webp",
  },
  "diy-gym": {
    label: "Dumbbell",
    image: "/images/side-quests/icons/gym.webp",
  },
  "home-remodel-custom-furniture": {
    label: "Hand tools",
    image: "/images/side-quests/icons/tools.webp",
  },
  "remnote-connect": {
    label: "Connected links",
    image: "/images/side-quests/icons/link.webp",
  },
};

export function postToRow(
  post: Post,
  basePath: "blog" | "essays" | "work" | "side-quests"
): Row {
  return {
    title: post.frontmatter.title,
    subtitle: post.frontmatter.subtitle,
    dek: post.frontmatter.description,
    href: `/${basePath}/${post.slug}`,
    meta: formatShortDate(post.frontmatter.date),
    tags: parseTags(post.frontmatter.tags),
  };
}

export function projectToRow(
  project: Post,
  basePath: "projects" | "side-quests" = "projects"
): Row {
  const isPortfolioProject = basePath === "projects";
  const profile = isPortfolioProject
    ? getProjectProfile(project.slug)
    : undefined;

  return {
    title: project.frontmatter.title,
    dek: profile?.cardDescription ?? project.frontmatter.description,
    href: `/${basePath}/${project.slug}`,
    meta: isPortfolioProject
      ? project.frontmatter.year ?? ""
      : "Read",
    tags: parseTags(project.frontmatter.tags),
    logo: profile
      ? {
          ...profile.brand.primary,
          secondary: profile.brand.secondary,
        }
      : undefined,
    icon: isPortfolioProject ? undefined : sideQuestRowIcons[project.slug],
  };
}

export function ManifestPage({
  active,
  children,
}: {
  active: NavKey | null;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page">
        <ManifestNav active={active} />
        <main id="main">{children}</main>
        <SocialFooter />
        <ManifestFooter />
      </div>
    </>
  );
}

export function ManifestNav({ active }: { active: NavKey | null }) {
  const links: { key: NavKey; href: string; label: string }[] = [
    { key: "projects", href: "/#work-heading", label: "Work" },
    {
      key: "essays",
      href: "https://levelwithlucas.lucaschatham.com/archive",
      label: "Essays",
    },
    { key: "side-quests", href: "/side-quests", label: "Side Quests" },
  ];

  const homeActive = active === "home";

  return (
    <header className="site-header">
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
                {item.label}
              </Link>
            );
          })}
          <a href="#contact">Contact</a>
        </div>
        <NavigationTools active={active} links={links} />
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero-cine" aria-labelledby="home-hero-title">
      <div className="hero-story">
        <h1 className="name" id="home-hero-title">
          Lucas <b>Chatham</b>
        </h1>
        <div className="hero-meta">
          <p className="hero-role">
            Founder <span aria-hidden="true">·</span> Operator
          </p>
        </div>
        <p className="hero-proposition">
          I design and build AI systems you can trust when mistakes cost lives,
          money, or time, from autonomous vehicles to healthcare.
        </p>
        <Link
          className="hero-action hero-action-primary"
          href="#work-heading"
        >
          View selected work
          <ArrowRightIcon />
        </Link>
      </div>
      <figure className="hero-portrait">
        <img
          src="/images/lucas-portrait-clean.jpg"
          srcSet="/images/lucas-portrait-clean-430.jpg 430w, /images/lucas-portrait-clean-860.jpg 860w, /images/lucas-portrait-clean.jpg 1200w"
          sizes="(max-width: 780px) calc(100vw - 32px), (max-width: 1200px) 42vw, 500px"
          alt="Portrait of Lucas Chatham"
          width="1200"
          height="1800"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </section>
  );
}

export function CareerThroughline() {
  return (
    <section className="throughline" aria-labelledby="throughline-heading">
      <h2 id="throughline-heading">
        <span className="throughline-heading-line">Different Industries</span>
        <span className="throughline-heading-line">Same Jobs</span>
      </h2>
      <p className="throughline-summary">
        I keep finding the same problem: valuable work trapped in someone&apos;s
        head or scattered across messy operations. I make it visible, turn it
        into a system, and measure whether it works.
      </p>
      <ul className="throughline-proofs" aria-label="Selected career evidence">
        <li>
          <Link href="/projects/blue-vision-labs-lyft">
            <span className="throughline-domain">Mapping</span>
            <strong>3 city pilots → 2 countries</strong>
            <span className="throughline-source">Blue Vision Labs / Lyft</span>
            <span className="throughline-tile-arrow"><ArrowUpRightIcon /></span>
          </Link>
        </li>
        <li>
          <Link href="/projects/imerit">
            <span className="throughline-domain">AI operations</span>
            <strong>6,000+ annotators · 20+ tools · 5 time zones</strong>
            <span className="throughline-source">iMerit Ground Control</span>
            <span className="throughline-tile-arrow"><ArrowUpRightIcon /></span>
          </Link>
        </li>
        <li>
          <Link href="/projects/gymnazo">
            <span className="throughline-domain">Coaching</span>
            <strong>11+ coaches trained · 209% YoY growth</strong>
            <span className="throughline-source">Gymnazo</span>
            <span className="throughline-tile-arrow"><ArrowUpRightIcon /></span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export function RowsSection({
  heading,
  kicker,
  description,
  rows,
  headingLevel = 2,
  allHref,
  allLabel,
  emptyLabel,
}: {
  heading: string;
  kicker: string;
  description?: string;
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
      <div className="man-heading">
        <Heading className="h" id={headingId}>
          <span className="l">{heading}</span>
          {kicker && <span className="n" aria-hidden="true">{kicker}</span>}
        </Heading>
        {description && <p className="man-description">{description}</p>}
      </div>
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
          <span className="row-title-line">
            {row.icon && <RowIconMark icon={row.icon} />}
            <span>{row.title}</span>
          </span>
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

function RowIconMark({ icon }: { icon: RowIcon }) {
  return (
    <span className="side-quest-icon" aria-hidden="true" title={icon.label}>
      <img
        src={icon.image}
        alt=""
        width="500"
        height="500"
        loading="lazy"
        decoding="async"
      />
    </span>
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
            →
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
    "has-image",
    logo.variant === "wide" ? "wide" : "",
    secondary ? "secondary" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} aria-hidden="true">
      <img
        src={logo.image}
        alt=""
        width={logo.variant === "wide" ? 520 : 100}
        height={logo.variant === "wide" ? 199 : 100}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

export function SocialFooter() {
  return (
    <section className="contact-band" id="contact" aria-labelledby="contact-heading">
      <div className="contact-copy">
        <h2 id="contact-heading">Contact →</h2>
      </div>
      <nav className="com" aria-label="Social">
      <a
        href="https://www.linkedin.com/in/lucaschatham/"
        rel="me noopener"
        target="_blank"
        aria-label="LinkedIn (opens in a new tab)"
      >
        <span className="ic">
          <LinkedInIcon />
        </span>
        LinkedIn
        <span aria-hidden="true">↗</span>
      </a>
      <a
        href={CONTACT_MAILTO}
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
        target="_blank"
        aria-label="GitHub (opens in a new tab)"
      >
        <span className="ic">
          <GitHubIcon />
        </span>
        GitHub
        <span aria-hidden="true">↗</span>
      </a>
      <a
        href="https://levelwithlucas.lucaschatham.com/subscribe"
        rel="noopener"
        target="_blank"
        aria-label="Newsletter (opens in a new tab)"
      >
        <span className="ic">
          <NewsletterIcon />
        </span>
        Newsletter
        <span aria-hidden="true">↗</span>
      </a>
      <a
        href="https://x.com/lukeoutthebox"
        rel="me noopener"
        target="_blank"
        aria-label="@lukeoutthebox on X (opens in a new tab)"
      >
        <span className="ic">
          <XIcon />
        </span>
      </a>
      </nav>
    </section>
  );
}

export function ManifestFooter() {
  return (
    <footer className="ft">
      <span>© {new Date().getFullYear()} Lucas Chatham</span>
      <span>Made in California</span>
    </footer>
  );
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
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 4v5h5V7H6Zm7 0v2h5V7h-5Zm0 4v2h5v-2h-5Zm-7 3v2h12v-2H6Zm0 4v1h12v-1H6Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
