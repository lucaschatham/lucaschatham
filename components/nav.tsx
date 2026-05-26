import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative flex items-center justify-between py-6">
      <Link
        href="/"
        className="font-semibold text-neutral-900 dark:text-neutral-100"
      >
        Lucas Chatham
      </Link>
      <details className="group">
        <summary
          aria-label="Open menu"
          className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-neutral-50 dark:focus:ring-neutral-100 dark:focus:ring-offset-neutral-950 [&::-webkit-details-marker]:hidden"
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
        </summary>
        <div className="absolute right-0 top-16 z-10 min-w-40 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <Link
            href="/projects"
            className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
          >
            Projects
          </Link>
        </div>
      </details>
    </nav>
  );
}
