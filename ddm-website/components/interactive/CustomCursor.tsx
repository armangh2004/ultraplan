"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const lerp = 0.5;
    pos.current.x += (target.current.x - pos.current.x) * lerp;
    pos.current.y += (target.current.y - pos.current.y) * lerp;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, input, select, textarea, [data-cursor]");
      setIsHovering(!!el);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion, isVisible, animate]);

  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        className="rounded-full transition-all duration-200 ease-out"
        style={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          backgroundColor: isHovering ? "transparent" : "rgba(212, 175, 55, 0.4)",
          borderWidth: isHovering ? 1.5 : 0,
          borderStyle: "solid",
          borderColor: "rgba(212, 175, 55, 0.35)",
          transform: `translate(${isHovering ? -16 : 0}px, ${isHovering ? -16 : 0}px)`,
        }}
      />
    </div>
  );
}
