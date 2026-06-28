"use client";

import { motion, useReducedMotion } from "motion/react";

interface ProjectCaseSectionProps {
  index: string;
  label: string;
  children: string;
}

export function ProjectCaseSection({
  index,
  label,
  children,
}: ProjectCaseSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-7 border-t border-black/9 py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:py-14"
    >
      <div className="flex items-start gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/42">
        <span>[{index}]</span>
        <h2>{label}</h2>
      </div>
      <p className="max-w-[760px] text-[clamp(1.3rem,2.7vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.04em] text-[#222]">
        {children}
      </p>
    </motion.section>
  );
}
