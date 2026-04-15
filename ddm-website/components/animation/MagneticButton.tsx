"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

export default function MagneticButton({
  strength = 0.3,
  className,
  children,
}: MagneticButtonProps) {
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      const maxOffset = 10;
      x.set(Math.max(-maxOffset, Math.min(maxOffset, deltaX)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, deltaY)));
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={cn(className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
