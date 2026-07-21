"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const options = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
] as const;

export function ThemeSwitch() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const { theme, resolvedTheme, setTheme } = useTheme();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const ActiveIcon = mounted && resolvedTheme === "light" ? SunIcon : MoonIcon;

  useEffect(() => {
    function closeDisclosures(event: KeyboardEvent | PointerEvent) {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;

      if (
        event instanceof PointerEvent &&
        event.target instanceof Node &&
        document.querySelector(".nav-tools")?.contains(event.target)
      ) {
        return;
      }

      document
        .querySelectorAll<HTMLDetailsElement>(
          "details[data-site-disclosure][open]"
        )
        .forEach((details) => {
          details.open = false;
        });
    }

    document.addEventListener("keydown", closeDisclosures);
    document.addEventListener("pointerdown", closeDisclosures);
    return () => {
      document.removeEventListener("keydown", closeDisclosures);
      document.removeEventListener("pointerdown", closeDisclosures);
    };
  }, []);

  function coordinateDisclosures() {
    if (!detailsRef.current?.open) return;

    document
      .querySelectorAll<HTMLDetailsElement>(
        "details[data-site-disclosure][open]"
      )
      .forEach((details) => {
        if (details !== detailsRef.current) details.open = false;
      });
  }

  return (
    <details
      className="theme-switch"
      data-site-disclosure
      ref={detailsRef}
      onToggle={coordinateDisclosures}
    >
      <summary aria-label="Choose color theme" title="Choose color theme">
        {mounted ? <ActiveIcon /> : <span className="theme-placeholder" />}
      </summary>
      <fieldset className="theme-menu">
        <legend className="sr-only">Color theme</legend>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <label key={option.value}>
              <input
                className="theme-radio"
                type="radio"
                name="color-theme"
                value={option.value}
                checked={mounted && theme === option.value}
                onChange={() => {
                  setTheme(option.value);
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
              />
              <Icon />
              <span>{option.label}</span>
              <CheckIcon />
            </label>
          );
        })}
      </fieldset>
    </details>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 15.1A8.5 8.5 0 0 1 8.9 3.6 8.5 8.5 0 1 0 20.4 15.1Z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="theme-check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
