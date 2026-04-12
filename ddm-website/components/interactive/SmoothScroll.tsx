"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      duration: 1.5,
      smoothWheel: true,
      touchMultiplier: 0,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let running = true;
    function raf(time: number) {
      lenis.raf(time);
      if (running) requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      running = false;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isTouch, reducedMotion]);

  return <>{children}</>;
}
