"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import {
  motion,
  animate,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

const LAMBO_SRC = "/images/garage/lambo-aventador.jpg";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroLambo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const flareLeftRef = useRef<HTMLDivElement>(null);
  const flareRightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const [entranceComplete, setEntranceComplete] = useState(false);

  // ─── Mouse tilt ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-1.5, 1.5]),
    { stiffness: 150, damping: 20 }
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [1, -1]),
    { stiffness: 150, damping: 20 }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
      mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    },
    [isTouch, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // ─── Scroll parallax ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const scrollBrightness = useTransform(scrollYProgress, [0, 1], [0.35, 0.15]);

  // Apply scroll-driven brightness to the inner image div after entrance
  useMotionValueEvent(scrollBrightness, "change", (latest) => {
    if (entranceComplete && imageWrapRef.current) {
      imageWrapRef.current.style.filter = `brightness(${latest})`;
    }
  });

  // ─── Entrance animation ───
  useEffect(() => {
    const imageWrap = imageWrapRef.current;
    const mask = maskRef.current;
    const flareL = flareLeftRef.current;
    const flareR = flareRightRef.current;
    if (!imageWrap || !mask || !flareL || !flareR) return;

    if (reducedMotion) {
      imageWrap.style.filter = "brightness(0.35)";
      imageWrap.style.transform = "scale(1)";
      mask.style.opacity = "0";
      setEntranceComplete(true);
      return;
    }

    // Initial: total darkness
    imageWrap.style.filter = "brightness(0)";
    imageWrap.style.transform = "scale(1.06)";
    mask.style.opacity = "1";
    flareL.style.opacity = "0";
    flareL.style.transform = "translate(-50%, -50%) scale(0.3)";
    flareR.style.opacity = "0";
    flareR.style.transform = "translate(50%, -50%) scale(0.3)";

    const controls: Array<{ stop: () => void }> = [];
    const d = 0.3;

    // Flare L bloom
    controls.push(animate(0, 1, {
      duration: 0.35, ease: [0.33, 1, 0.68, 1], delay: d,
      onUpdate: (t) => {
        flareL.style.opacity = String(t);
        flareL.style.transform = `translate(-50%, -50%) scale(${lerp(0.3, 1, t)})`;
      },
    }));

    // Flare R bloom
    controls.push(animate(0, 1, {
      duration: 0.35, ease: [0.33, 1, 0.68, 1], delay: d + 0.06,
      onUpdate: (t) => {
        flareR.style.opacity = String(t);
        flareR.style.transform = `translate(50%, -50%) scale(${lerp(0.3, 1, t)})`;
      },
    }));

    // Spotlight sweep
    controls.push(animate(0, 1, {
      duration: 0.5, ease: [0.33, 0, 0.67, 1], delay: d + 0.3,
      onUpdate: (t) => {
        mask.style.setProperty("--spot-x", `${lerp(15, 50, t)}%`);
        mask.style.setProperty("--spot-size", `${lerp(20, 60, t)}%`);
      },
    }));

    // Image brightens + scale
    controls.push(animate(0, 1, {
      duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: d + 0.35,
      onUpdate: (t) => {
        imageWrap.style.filter = `brightness(${lerp(0, 0.25, t)})`;
        imageWrap.style.transform = `scale(${lerp(1.06, 1.03, t)})`;
      },
    }));

    // Spotlight expand + mask fade
    controls.push(animate(0, 1, {
      duration: 0.6, ease: [0.33, 0, 0.67, 1], delay: d + 0.8,
      onUpdate: (t) => {
        mask.style.setProperty("--spot-size", `${lerp(60, 250, t)}%`);
        mask.style.opacity = String(1 - t);
      },
    }));

    // Final brightness + scale settle
    controls.push(animate(0, 1, {
      duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: d + 0.85,
      onUpdate: (t) => {
        imageWrap.style.filter = `brightness(${lerp(0.25, 0.35, t)})`;
        imageWrap.style.transform = `scale(${lerp(1.03, 1, t)})`;
      },
    }));

    // Flares fade out
    controls.push(animate(0, 1, {
      duration: 0.5, ease: [0.55, 0, 1, 0.68], delay: d + 1.1,
      onUpdate: (t) => {
        const op = String(1 - t);
        const sc = lerp(1, 1.8, t);
        flareL.style.opacity = op;
        flareL.style.transform = `translate(-50%, -50%) scale(${sc})`;
        flareR.style.opacity = op;
        flareR.style.transform = `translate(50%, -50%) scale(${sc})`;
      },
    }));

    const timeout = setTimeout(() => setEntranceComplete(true), (d + 1.6) * 1000);

    return () => {
      controls.forEach((c) => c.stop());
      clearTimeout(timeout);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden hidden md:block"
      style={{ perspective: "1200px" }}
      onMouseMove={!isTouch ? handleMouseMove : undefined}
      onMouseLeave={!isTouch ? handleMouseLeave : undefined}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
        }}
      >
        {/* Scroll parallax wrapper — only applies y/scale AFTER entrance */}
        <motion.div
          className="absolute inset-0"
          style={entranceComplete ? { y: scrollY, scale: scrollScale } : {}}
        >
          {/* Image wrapper — entrance animation targets this via ref */}
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-[filter,transform]"
          >
            <Image
              src={LAMBO_SRC}
              alt="Lamborghini Aventador"
              fill
              priority
              className="object-cover object-[center_60%]"
              sizes="100vw"
              quality={90}
            />
          </div>
        </motion.div>

        {/* Spotlight mask */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            ["--spot-x" as string]: "15%",
            ["--spot-size" as string]: "20%",
            background:
              "radial-gradient(ellipse var(--spot-size) var(--spot-size) at var(--spot-x) 55%, transparent 0%, black 100%)",
          }}
        />

        {/* Headlight flare — left */}
        <div
          ref={flareLeftRef}
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "30%", width: "100px", height: "50px",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,240,200,0.3) 40%, rgba(212,175,55,0.08) 70%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />

        {/* Headlight flare — right */}
        <div
          ref={flareRightRef}
          className="absolute pointer-events-none"
          style={{
            top: "50%", right: "28%", width: "100px", height: "50px",
            transform: "translate(50%, -50%)",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,240,200,0.3) 40%, rgba(212,175,55,0.08) 70%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.6) 85%, black 100%)",
            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
