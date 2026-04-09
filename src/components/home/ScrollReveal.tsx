"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ScrollRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  amount = 0.24,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
