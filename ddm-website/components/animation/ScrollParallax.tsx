"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ScrollParallax({
  children,
  speed = 0.3,
  className,
}: ScrollParallaxProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
