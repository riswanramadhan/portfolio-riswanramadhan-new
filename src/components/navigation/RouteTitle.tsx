"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface RouteTitleProps {
  label: "Work" | "Service" | "Experience" | "Contact";
  className?: string;
}

export function RouteTitle({ label, className }: RouteTitleProps) {
  const layoutId = `route-title-${label.toLowerCase()}`;

  return (
    <h1
      className={cn(
        "flex items-baseline font-semibold uppercase leading-[0.82] tracking-[-0.08em]",
        className,
      )}
    >
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        /
      </motion.span>
      <motion.span
        layoutId={layoutId}
        transition={{ layout: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
      >
        {label}
      </motion.span>
    </h1>
  );
}
