"use client";

import { motion, useReducedMotion } from "motion/react";

import { AnimatedNumberLine } from "@/components/ui/AnimatedNumberLine";

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
  const entranceX = Number(index) % 2 === 0 ? 36 : -36;

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, x: entranceX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <AnimatedNumberLine
        number={index}
        index={Math.max(Number(index) - 1, 0)}
        total={4}
        orientation="vertical"
        isLast={Number(index) === 4}
      >
        <div className="grid gap-7 py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12 md:py-14">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/42">
            {label}
          </h2>
          <p className="max-w-[760px] text-[clamp(1.3rem,2.7vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.04em] text-[#222]">
            {children}
          </p>
        </div>
      </AnimatedNumberLine>
    </motion.section>
  );
}
