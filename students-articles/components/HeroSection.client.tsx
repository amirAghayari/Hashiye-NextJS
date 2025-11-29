"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSectionContent from "./HeroSection";

gsap.registerPlugin(ScrollTrigger);
const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(".hero-background", {
        y: 150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating orbs animation
      gsap.to(".hero-orb-1", {
        scale: 1.2,
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".hero-orb-2", {
        scale: 1.2,
        x: -30,
        y: 20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Text content entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".hero-heading-1",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-heading-2",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.7"
        )
        .from(
          ".hero-paragraph",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-buttons",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        );

      // Visual element animations
      gsap.from(".hero-main-card", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.3,
      });

      // Main card floating animation
      gsap.to(".hero-main-card", {
        y: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Floating cards animations
      gsap.to(".hero-floating-card-1", {
        y: 15,
        x: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".hero-floating-card-2", {
        y: -15,
        x: -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Scroll indicator animation
      gsap.from(".hero-scroll-indicator", {
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
      });

      gsap.to(".scroll-dot", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={sectionRef}>
      <HeroSectionContent />
    </div>
  );
};

export default HeroSection;
