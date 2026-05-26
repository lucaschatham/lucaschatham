import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="font-semibold text-neutral-900 dark:text-neutral-100"
      >
        Lucas Chatham
      </Link>
      <Link
        href="https://www.linkedin.com/in/lucaschatham/"
        className="flex min-h-11 items-center rounded-full border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-neutral-50"
        rel="noreferrer"
        target="_blank"
      >
        Connect
      </Link>
    </nav>
  );
}
