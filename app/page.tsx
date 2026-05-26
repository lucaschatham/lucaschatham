type IconProps = {
  className?: string;
};

const links = [
  {
    title: "LinkedIn",
    description: "Career, company updates, and ways to reach me.",
    href: "https://www.linkedin.com/in/lucaschatham/",
    status: "Open profile",
    icon: LinkedInIcon,
  },
  {
    title: "Newsletter",
    description: "Notes on what I am building, learning, and thinking through.",
    href: null,
    status: "Coming soon",
    icon: NewsletterIcon,
  },
  {
    title: "GitHub",
    description: "Code, experiments, and public projects.",
    href: "https://github.com/lucaschatham",
    status: "Open profile",
    icon: GitHubIcon,
  },
];

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function NewsletterIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4.75 6.75h14.5v10.5H4.75z" />
      <path d="m5.25 7.25 6.75 5.5 6.75-5.5" />
      <path d="m5.5 16.75 4.45-4" />
      <path d="m18.5 16.75-4.45-4" />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.08 1.83 2.82 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23A11.48 11.48 0 0 1 12 6.09c1.02 0 2.03.14 2.99.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18a4.63 4.63 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.43.38.82 1.1.82 2.23v3.3c0 .32.21.7.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

function LinkCard({ link }: { link: (typeof links)[number] }) {
  const Icon = link.icon;
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-medium text-neutral-950 dark:text-neutral-50">
          {link.title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          {link.description}
        </span>
      </span>
      <span className="shrink-0 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        {link.status}
      </span>
    </>
  );

  if (!link.href) {
    return (
      <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 p-4 opacity-85 dark:border-neutral-800 dark:bg-neutral-900/50">
        {content}
      </div>
    );
  }

  return (
    <a
      className="group flex min-h-24 items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:focus:ring-neutral-100 dark:focus:ring-offset-neutral-950"
      href={link.href}
      rel="noreferrer"
      target="_blank"
    >
      {content}
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col justify-center py-8">
      <section className="mb-10">
        <div className="mb-8 w-44 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:w-56">
          <img
            alt="Lucas Chatham"
            className="aspect-[3/4] w-full object-cover object-top"
            src="/images/lucas-portrait-clean.jpg"
          />
        </div>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
          lucaschatham.com
        </p>
        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          Lucas Chatham
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          A simple hub for my work, writing, code, and updates.
        </p>
      </section>

      <section aria-label="Primary links" className="grid gap-3">
        {links.map((link) => (
          <LinkCard key={link.title} link={link} />
        ))}
      </section>
    </div>
  );
}
