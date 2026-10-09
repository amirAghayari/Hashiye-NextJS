"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A hairline at the top of the screen that fills (right to left) as the article is read. */
export function ReadingProgress({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetRef.current;
    if (!bar.current || !target) return;

    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: target, start: "top 80%", end: "bottom 60%", scrub: true },
      }
    );
  }, [targetRef]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={bar}
        className="h-full origin-right bg-foreground"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
