"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  duration?: number;
  sizes?: string;
  fill?: boolean;
}

function getClipPath(direction: Direction): { from: string; to: string } {
  switch (direction) {
    case "up":
      return { from: "inset(100% 0 0 0)", to: "inset(0 0 0 0)" };
    case "left":
      return { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0)" };
    case "right":
      return { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0)" };
  }
}

export default function ImageReveal({
  src,
  alt,
  className,
  direction = "up",
  duration = 1,
  sizes,
  fill = false,
}: ImageRevealProps) {
  const prefersReduced = useReducedMotion();
  const { from, to } = getClipPath(direction);

  const imageElement = fill ? (
    <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
  ) : (
    <Image src={src} alt={alt} width={1920} height={1080} sizes={sizes} className="h-full w-full object-cover" />
  );

  if (prefersReduced) {
    return <div className={cn("overflow-hidden", className)}>{imageElement}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: to }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
    >
      {imageElement}
    </motion.div>
  );
}
