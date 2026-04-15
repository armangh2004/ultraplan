"use client";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  children: React.ReactNode;
  className?: string;
}

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up": return { x: 0, y: distance };
    case "down": return { x: 0, y: -distance };
    case "left": return { x: distance, y: 0 };
    case "right": return { x: -distance, y: 0 };
  }
}

export default function ScrollReveal({
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  once = true,
  children,
  className,
}: ScrollRevealProps) {
  const prefersReduced = useFramerReducedMotion();

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const offset = getOffset(direction, distance);

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: "blur(8px)", scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      {children}
    </motion.div>
  );
}
