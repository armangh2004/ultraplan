"use client";

import { useRef, useState } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function NumberCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className,
}: NumberCounterProps) {
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReduced ? end : 0);
  const hasAnimated = useRef(false);

  const formatted =
    decimals > 0
      ? displayValue.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(displayValue).toLocaleString("en-US");

  return (
    <motion.span
      className={cn(className)}
      onViewportEnter={() => {
        if (hasAnimated.current || prefersReduced) return;
        hasAnimated.current = true;
        animate(0, end, {
          duration,
          ease: [0.33, 1, 0.68, 1],
          onUpdate: (latest) => setDisplayValue(latest),
        });
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
