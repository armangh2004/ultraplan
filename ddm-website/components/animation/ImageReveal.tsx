"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  duration?: number;
  sizes?: string;
  fill?: boolean;
}

function getClipPath(direction: Direction): { from: string; to: string } {
  switch (direction) {
    case "up":
      return {
        from: "inset(100% 0 0 0)",
        to: "inset(0 0 0 0)",
      };
    case "left":
      return {
        from: "inset(0 100% 0 0)",
        to: "inset(0 0 0 0)",
      };
    case "right":
      return {
        from: "inset(0 0 0 100%)",
        to: "inset(0 0 0 0)",
      };
  }
}

export default function ImageReveal({
  src,
  alt,
  className,
  direction = "up",
  duration = 1,
  sizes,
  fill = false,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const { from, to } = getClipPath(direction);

    const tween = gsap.fromTo(
      container,
      { clipPath: from },
      {
        clipPath: to,
        duration,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [direction, duration, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={reducedMotion ? undefined : { clipPath: getClipPath(direction).from }}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
