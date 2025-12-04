"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessSectionContent from "./ProcessSection";

gsap.registerPlugin(ScrollTrigger);

const ProcessSectionClient = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current as HTMLElement;

      // Animation for the section background
      gsap.fromTo(
        sectionEl,
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "100% 100%",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          duration: 1,
          ease: "none",
        }
      );

      // Animation for the heading
      const heading = sectionEl.querySelector<HTMLElement>(".process-heading");
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animation for the description
      const description =
        sectionEl.querySelector<HTMLParagraphElement>(".process-heading p");
      if (description && heading) {
        gsap.from(description, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        });
      }

      // Staggered animation for process items
      const items = sectionEl.querySelectorAll<HTMLElement>(".process-item");
      items.forEach((item, index) => {
        const icon = item.querySelector<SVGElement>("svg");
        const content = item.querySelector<HTMLDivElement>(
          "div > div:not([class*='absolute'])"
        );

        // Initial state
        const targets = [icon, content].filter(Boolean) as gsap.TweenTarget[];
        gsap.set(targets, { opacity: 0, y: 20 });

        // Scroll animation
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.4)",
          onComplete: () => {
            if (targets.length > 0) {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              });
            }
          },
        });

        // Hover effect
        const handleMouseEnter = () => {
          gsap.to(item, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup event listeners
        return () => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <ProcessSectionContent />
    </div>
  );
};

export default ProcessSectionClient;
