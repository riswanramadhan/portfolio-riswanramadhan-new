"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/lib/portfolio-data";
import { revealLeft, revealRight, stagger } from "@/lib/animations";
import { ProjectMeta } from "@/components/project/ProjectMeta";

export function ProjectDetailHero({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const shortTitle = project.title.split("—")[0].trim();

  return (
    <motion.section
      variants={stagger}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      className="mx-auto grid w-full max-w-[1360px] gap-14 px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)] lg:gap-24 lg:px-16 lg:pb-20 lg:pt-24"
    >
      <motion.div variants={revealLeft}>
        <div className="mb-7 flex flex-wrap gap-2.5">
          {project.categories.map((category) => (
            <span
              key={category}
              className="inline-flex min-h-9 items-center rounded-full border border-black/6 bg-white px-4 text-[12px] font-medium text-[#343434] shadow-[0_8px_22px_rgba(0,0,0,.06)]"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#171717]">
            {shortTitle}
          </h1>
          <span className="pb-1 text-[17px] font-medium text-black/42 sm:text-[20px]">
            /{project.category}
          </span>
        </div>

        <p className="mt-7 max-w-[610px] text-[14px] leading-[1.7] text-[#5f5f5f] sm:text-[15px]">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.livePreviewUrl}
            target={project.livePreviewUrl === "#" ? undefined : "_blank"}
            rel={project.livePreviewUrl === "#" ? undefined : "noreferrer"}
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#171717] px-5 text-[13px] font-medium text-white shadow-[0_13px_32px_rgba(0,0,0,.22)] transition-all duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Live Preview
            <ArrowUpRight className="icon-motion-diagonal size-4 transition-transform duration-500" />
          </a>
          <a
            href={project.contactUrl}
            className="inline-flex min-h-11 items-center rounded-full border border-black/8 bg-white px-5 text-[13px] font-medium text-black shadow-[0_9px_25px_rgba(0,0,0,.07)] transition-all duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:shadow-[0_13px_30px_rgba(0,0,0,.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      <motion.div variants={revealRight}>
        <ProjectMeta project={project} />
      </motion.div>
    </motion.section>
  );
}
