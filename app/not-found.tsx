import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-semibold tracking-tight mb-4">404</h1>
      <p className="text-neutral-500 mb-6">This page doesn't exist.</p>
      <Link
        href="/"
        className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 underline underline-offset-2 min-h-[44px] flex items-center"
      >
        Go home
      </Link>
    </div>
  );
}
