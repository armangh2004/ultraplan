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
    const lerp = 0.08;
    pos.current.x += (target.current.x - pos.current.x) * lerp;
    pos.current.y += (target.current.y - pos.current.y) * lerp;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="rounded-full border transition-all duration-300 ease-out"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "rgba(212, 175, 55, 0.6)" : "rgba(212, 175, 55, 0.3)",
          transform: `translate(${isHovering ? -8 : 0}px, ${isHovering ? -8 : 0}px)`,
        }}
      />
    </div>
  );
}
