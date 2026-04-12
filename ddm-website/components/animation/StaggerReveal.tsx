"use client";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface StaggerRevealProps {
  staggerDelay?: number;
  direction?: "up" | "down";
  distance?: number;
  children: React.ReactNode;
  className?: string;
}

export default function StaggerReveal({
  staggerDelay = 0.12,
  direction = "up",
  distance = 40,
  children,
  className,
}: StaggerRevealProps) {
  const prefersReduced = useFramerReducedMotion();

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const yOffset = direction === "up" ? distance : -distance;

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
