"use client";

import Link from "next/link";
import { useRef } from "react";
import { ThemeSwitch } from "@/components/theme-switch";

type NavigationItem = {
  key: string;
  href: string;
  label: string;
};

export function NavigationTools({
  active,
  links,
}: {
  active: string | null;
  links: NavigationItem[];
}) {
  const mobileRef = useRef<HTMLDetailsElement>(null);

  function coordinateDisclosures() {
    if (!mobileRef.current?.open) return;

    document
      .querySelectorAll<HTMLDetailsElement>(
        "details[data-site-disclosure][open]"
      )
      .forEach((details) => {
        if (details !== mobileRef.current) details.open = false;
      });
  }

  function closeMobileMenu() {
    if (mobileRef.current) mobileRef.current.open = false;
  }

  return (
    <div className="nav-tools">
      <ThemeSwitch />
      <details
        className="mobile-nav"
        data-site-disclosure
        ref={mobileRef}
        onToggle={coordinateDisclosures}
      >
        <summary aria-label="Open navigation">Menu</summary>
        <div className="mobile-nav-menu">
          {links.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                prefetch={false}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="#contact" onClick={closeMobileMenu}>
            Contact
          </a>
        </div>
      </details>
    </div>
  );
}
