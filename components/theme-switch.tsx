"use client";

import { useRef, useSyncExternalStore } from "react";
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

  return (
    <details className="theme-switch" ref={detailsRef}>
      <summary aria-label="Choose color theme" title="Choose color theme">
        {mounted ? <ActiveIcon /> : <span className="theme-placeholder" />}
      </summary>
      <div className="theme-menu" role="menu" aria-label="Color theme">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={mounted && theme === option.value}
              onClick={() => {
                setTheme(option.value);
                detailsRef.current?.removeAttribute("open");
              }}
            >
              <Icon />
              <span>{option.label}</span>
              <CheckIcon />
            </button>
          );
        })}
      </div>
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
