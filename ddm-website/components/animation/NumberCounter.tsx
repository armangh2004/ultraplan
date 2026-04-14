"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
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
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(end);
      return;
    }

    if (!ref.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(obj.value);
      },
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [end, duration, reducedMotion]);

  const formatted = decimals > 0
    ? displayValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.round(displayValue).toLocaleString("en-US");

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
