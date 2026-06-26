"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-reading-progress=""
      style={{
        position: "sticky",
        top: "calc(env(safe-area-inset-top, 0px) + 56px)",
        zIndex: 9,
        height: "2px",
        marginTop: "-1px",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        data-reading-progress-bar=""
        style={{
          width: "100%",
          height: "100%",
          background: "var(--pulse)",
          boxShadow: "0 0 8px var(--pulse)",
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />
    </div>
  );
}
