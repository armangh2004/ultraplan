"use client";

import { motion, useReducedMotion } from "framer-motion";

interface HeroFadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroFadeIn({ children, className }: HeroFadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <header className={className}>{children}</header>;
  }

  return (
    <motion.header
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.header>
  );
}
