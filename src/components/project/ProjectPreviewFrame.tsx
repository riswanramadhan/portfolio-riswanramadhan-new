"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/lib/portfolio-data";

export function ProjectPreviewFrame({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-[calc(100%-40px)] max-w-[1100px] rounded-[18px] border border-black/8 bg-white/64 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,.1)] backdrop-blur-xl sm:w-[calc(100%-64px)] sm:p-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[11px] bg-[#dddddb]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover transition-transform duration-1000 ease-[var(--ease-apple)] hover:scale-[1.015]"
        />
      </div>
    </motion.figure>
  );
}
