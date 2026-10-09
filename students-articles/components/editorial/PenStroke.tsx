"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PenStrokeProps = {
  /** "load": CSS draw on page load. "view": GSAP draw when scrolled into view. */
  mode?: "load" | "view";
  className?: string;
};

/** A hand-drawn red underline, drawn right to left like Persian script. */
export function PenStroke({ mode = "view", className }: PenStrokeProps) {
  const path = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const el = path.current;
    if (mode !== "view" || !el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, [mode]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className={cn("block h-2 w-full overflow-visible text-mark", className)}
    >
      <path
        ref={path}
        className={cn("pen", mode === "load" && "pen-intro")}
        d="M99 2 C 86 3.5, 66 1, 52 3.5 S 18 7, 1 5"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
