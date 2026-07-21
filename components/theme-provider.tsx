"use client";

import { useEffect } from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ThemeColorSync />
    </NextThemesProvider>
  );
}

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === "light" ? "#ffffff" : "#030712";
    const tags = document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

    tags.forEach((tag) => {
      tag.content = color;
      tag.removeAttribute("media");
    });
  }, [resolvedTheme]);

  return null;
}
