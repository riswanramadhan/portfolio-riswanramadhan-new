"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type RevealDirection = "left" | "right" | "up";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  amount?: number;
}

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  up: { x: 0, y: 24 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  amount = 0.18,
}: RevealProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const offset = offsets[direction];

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: "-36px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("min-w-0", className)}
    >
      {children}
    </motion.div>
  );
}
