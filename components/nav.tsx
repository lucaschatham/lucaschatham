import Link from "next/link";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="font-semibold text-neutral-900 dark:text-neutral-100"
      >
        Lucas Chatham
      </Link>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 min-h-[44px] flex items-center"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
