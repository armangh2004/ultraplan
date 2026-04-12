"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { cn } from "@/lib/utils";

interface TextSplitProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  splitBy?: "chars" | "words";
  staggerDelay?: number;
  duration?: number;
}

export default function TextSplit({
  children,
  className,
  as: Tag = "div",
  splitBy = "chars",
  staggerDelay = 0.03,
  duration = 0.8,
}: TextSplitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (!ref.current) return;

    const effectiveSplit = isTouch ? "words" : splitBy;
    const split = new SplitType(ref.current, { types: effectiveSplit === "chars" ? "chars" : "words" });
    const elements = effectiveSplit === "chars" ? split.chars : split.words;

    if (!elements || elements.length === 0) {
      split.revert();
      return;
    }

    gsap.set(elements, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerDelay,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [children, splitBy, staggerDelay, duration, isTouch]);

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
