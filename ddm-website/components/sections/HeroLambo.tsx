"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

const LAMBO_SRC = "/images/garage/lambo-aventador.jpg";

/**
 * Full-bleed hero background: the Lambo sits behind all hero text.
 * Cinematic reveal on load, parallax on scroll, mouse-tilt.
 * Rendered as position:absolute inside the hero <header>.
 */
export default function HeroLambo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const flareLeftRef = useRef<HTMLDivElement>(null);
  const flareRightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  // ─── Mouse tilt ───
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTouch || !perspectiveRef.current) return;
      const rect = perspectiveRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(perspectiveRef.current, {
        rotateY: dx * 1.5,
        rotateX: -dy * 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    if (!perspectiveRef.current) return;
    gsap.to(perspectiveRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrap = imageWrapRef.current;
    const mask = maskRef.current;
    const flareL = flareLeftRef.current;
    const flareR = flareRightRef.current;
    if (!container || !imageWrap || !mask || !flareL || !flareR) return;

    if (reducedMotion) {
      gsap.set(imageWrap, { filter: "brightness(0.35)" });
      gsap.set(mask, { opacity: 0 });
      return;
    }

    // ─── Initial: total darkness ───
    gsap.set(imageWrap, { filter: "brightness(0)", scale: 1.06 });
    gsap.set(mask, { opacity: 1 });
    gsap.set(flareL, { opacity: 0, scale: 0.3 });
    gsap.set(flareR, { opacity: 0, scale: 0.3 });

    // ─── Phase 1: Entrance (~1.8s) — fires immediately since it's above the fold ───
    const entrance = gsap.timeline({ delay: 0.3 });

    // Headlight flares bloom
    entrance.to(flareL, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0);
    entrance.to(flareR, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.06);

    // Spotlight sweep: radial hole moves left → center → full
    entrance.to(mask, {
      "--spot-x": "50%",
      "--spot-size": "60%",
      duration: 0.5,
      ease: "power2.inOut",
    }, 0.3);

    // Image brightens (but stays subdued so text is readable)
    entrance.to(imageWrap, {
      filter: "brightness(0.25)",
      scale: 1.03,
      duration: 0.6,
      ease: "power2.out",
    }, 0.35);

    // Spotlight expands to full, mask disappears
    entrance.to(mask, {
      "--spot-x": "50%",
      "--spot-size": "250%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, 0.8);

    // Final brightness — stays dim enough for text readability
    entrance.to(imageWrap, {
      filter: "brightness(0.35)",
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    }, 0.85);

    // Flares fade out
    entrance.to([flareL, flareR], {
      opacity: 0,
      scale: 1.8,
      duration: 0.5,
      ease: "power2.in",
    }, 1.1);

    // ─── Phase 2: Scroll parallax ───
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Car drifts slower (parallax) and fades slightly
    scrollTl.to(imageWrap, {
      y: 120,
      scale: 0.96,
      filter: "brightness(0.15)",
      duration: 1,
      ease: "none",
    }, 0);

    // ─── Mouse tilt ───
    if (!isTouch && container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      entrance.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
      if (!isTouch && container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [reducedMotion, isTouch, handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={perspectiveRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Car image — fills the entire hero */}
        <div
          ref={imageWrapRef}
          className="absolute inset-0 will-change-[filter,transform]"
        >
          <Image
            src={LAMBO_SRC}
            alt="Lamborghini Aventador"
            fill
            priority
            className="object-cover object-[center_60%]"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Spotlight mask */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            ["--spot-x" as string]: "15%",
            ["--spot-size" as string]: "20%",
            background:
              "radial-gradient(ellipse var(--spot-size) var(--spot-size) at var(--spot-x) 55%, transparent 0%, black 100%)",
          }}
        />

        {/* Headlight flare — left */}
        <div
          ref={flareLeftRef}
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "30%",
            width: "100px",
            height: "50px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,240,200,0.3) 40%, rgba(212,175,55,0.08) 70%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />

        {/* Headlight flare — right */}
        <div
          ref={flareRightRef}
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            right: "28%",
            width: "100px",
            height: "50px",
            transform: "translate(50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,240,200,0.3) 40%, rgba(212,175,55,0.08) 70%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Dark overlay gradient for text readability — stronger at top where text is */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.6) 85%, black 100%)",
            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
