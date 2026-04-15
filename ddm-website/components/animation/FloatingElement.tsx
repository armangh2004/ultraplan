"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  amplitude = 8,
  duration = 4,
  className,
}: FloatingElementProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [-amplitude, amplitude] }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}
