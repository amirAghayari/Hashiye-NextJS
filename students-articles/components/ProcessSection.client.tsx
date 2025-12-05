"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessSectionContent from "./ProcessSection";

gsap.registerPlugin(ScrollTrigger);

const ProcessSectionClient = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "100% 100%",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      const heading = el.querySelector(".process-heading");
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
          },
        });
      }

      const items = el.querySelectorAll(".process-item");

      items.forEach((item, index) => {
        const card = item.querySelector(".group");
        const icon = item.querySelector("svg");
        const targets = [icon, card].filter(Boolean);

        gsap.set(targets, { opacity: 0, y: 20 });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        const enter = () => gsap.to(item, { y: -8, duration: 0.3 });
        const leave = () => gsap.to(item, { y: 0, duration: 0.3 });

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        return () => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <ProcessSectionContent />
    </div>
  );
};

export default ProcessSectionClient;
