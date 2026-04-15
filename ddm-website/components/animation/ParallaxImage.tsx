"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  speed?: number;
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  speed = 0.3,
  src,
  alt,
  className,
  fill = false,
  priority = false,
  sizes,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const distance = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  if (prefersReduced) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className="h-full w-full">
          {fill ? (
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
          ) : (
            <Image src={src} alt={alt} width={1920} height={1080} priority={priority} sizes={sizes} className="h-full w-full object-cover" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <motion.div className="h-full w-full" style={isTouch ? { scale } : { y }}>
        {fill ? (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : (
          <Image src={src} alt={alt} width={1920} height={1080} priority={priority} sizes={sizes} className="h-full w-full object-cover" />
        )}
      </motion.div>
    </div>
  );
}
