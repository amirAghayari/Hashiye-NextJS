"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CTASection from "./CTASection";

const CTASectionClient = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const blob = el.querySelector(".blob");
      const content = el.querySelector(".content");
      const sparkles = el.querySelector(".sparkles");

      if (blob) {
        gsap.to(blob, {
          scale: 1.3,
          opacity: 0.6,
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      if (content) {
        gsap.from(content, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (sparkles) {
        gsap.to(sparkles, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <CTASection />
    </div>
  );
};

export default CTASectionClient;
