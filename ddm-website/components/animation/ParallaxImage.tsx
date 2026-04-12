"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  speed?: number;
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  speed = 0.3,
  src,
  alt,
  className,
  fill = false,
  priority = false,
  sizes,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current || !imageRef.current) return;

    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    let tween: gsap.core.Tween;

    if (isTouch) {
      // On mobile: subtle scale instead of Y translation
      tween = gsap.fromTo(
        image,
        { scale: 1.0 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    } else {
      // On desktop: Y translation parallax
      const distance = speed * 100;
      tween = gsap.fromTo(
        image,
        { y: -distance },
        {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) {
          st.kill();
        }
      });
    };
  }, [speed, isTouch, reducedMotion]);

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <div ref={imageRef} className="h-full w-full">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            priority={priority}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
