"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroSectionContent from "./HeroSection";

gsap.registerPlugin(ScrollTrigger);

const HeroSectionClient = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /** 🔵 Parallax Background */
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

      /** 🔵 Floating Orbs */
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

      /** 🔵 Text Entrance Timeline */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(".hero-heading-1", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-heading-2", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
        .from(".hero-paragraph", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      /** 🔵 Main Card Entrance */
      gsap.from(".hero-main-card", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.3,
      });

      /** 🔵 Main Card Floating */
      gsap.to(".hero-main-card", {
        y: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /** 🔵 Floating Cards */
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

      /** 🔵 Scroll Indicator */
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
    },
    { scope: sectionRef } // ← useGSAP scope برای تمیزکاری اتوماتیک
  );

  return (
    <div ref={sectionRef}>
      <HeroSectionContent />
    </div>
  );
};

export default HeroSectionClient;
