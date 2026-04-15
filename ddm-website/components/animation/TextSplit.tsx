"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { cn } from "@/lib/utils";

interface TextSplitProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  splitBy?: "chars" | "words";
  staggerDelay?: number;
  duration?: number;
}

/* Map common HTML tags to their motion equivalents */
const motionTags: Record<string, React.ComponentType<React.ComponentProps<typeof motion.div>>> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
};

export default function TextSplit({
  children,
  className,
  as: Tag = "div",
  splitBy = "chars",
  staggerDelay = 0.03,
  duration = 0.8,
}: TextSplitProps) {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const StaticTag = Tag as React.ElementType;
    return <StaticTag className={cn(className)}>{children}</StaticTag>;
  }

  const effectiveSplit = isTouch ? "words" : splitBy;
  const MotionTag = motionTags[Tag] || motion.div;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  const renderWords = () => {
    const words = children.split(/\s+/).filter(Boolean);
    return words.map((word, i) => (
      <React.Fragment key={i}>
        <motion.span variants={itemVariants} className="inline-block">
          {word}
        </motion.span>
        {i < words.length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </React.Fragment>
    ));
  };

  const renderChars = () => {
    const chars = children.split("");
    return chars.map((char, i) => (
      <motion.span
        key={i}
        variants={itemVariants}
        className="inline-block"
        style={char === " " ? { width: "0.3em" } : undefined}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
    >
      {effectiveSplit === "words" ? renderWords() : renderChars()}
    </MotionTag>
  );
}
