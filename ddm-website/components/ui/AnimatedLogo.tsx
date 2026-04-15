"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface AnimatedLogoProps {
  className?: string;
  /** Show full "Dream Drive Motors" text (for footer) */
  full?: boolean;
}

export default function AnimatedLogo({
  className,
  full = false,
}: AnimatedLogoProps) {
  const prefersReduced = useReducedMotion();

  if (full) {
    return (
      <Link href="/" className={className} aria-label="Dream Drive Motors - Home">
        <span className="font-headline italic text-primary text-2xl tracking-tight">
          DDM
        </span>
      </Link>
    );
  }

  if (prefersReduced) {
    return (
      <Link href="/" className={className} aria-label="Dream Drive Motors - Home">
        <span className="font-headline italic text-primary text-2xl tracking-tight">
          DDM
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={className} aria-label="Dream Drive Motors - Home">
      <motion.span
        className="font-headline italic text-primary text-2xl tracking-tight inline-block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        DDM
      </motion.span>
    </Link>
  );
}
