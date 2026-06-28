"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { PortfolioProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { TechIcon } from "@/components/ui/TechIcon";

interface ProjectCardProps {
  project: PortfolioProject;
  priority?: boolean;
  animationIndex?: number;
  reduceMotion?: boolean;
}

export function ProjectCard({
  project,
  priority = false,
  animationIndex = 0,
  reduceMotion,
}: ProjectCardProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;
  const entranceX = animationIndex % 2 === 0 ? -36 : 36;

  return (
    <motion.article
      layout
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, x: entranceX, scale: 0.985 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, x: -entranceX * 0.4, scale: 0.99 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.006,
              transition: {
                type: "spring",
                stiffness: 240,
                damping: 24,
                delay: 0,
              },
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.64,
        delay: shouldReduceMotion ? 0 : animationIndex * 0.065,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: "spring", stiffness: 180, damping: 24 },
        y: { type: "spring", stiffness: 240, damping: 24 },
        scale: { type: "spring", stiffness: 220, damping: 24 },
      }}
      className="group h-full min-w-0"
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        transitionLabel={project.title}
        className="block h-full overflow-hidden rounded-[28px] border border-black/7 bg-white/82 p-3 shadow-[0_18px_50px_rgba(0,0,0,.075)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-700 ease-[var(--ease-apple)] hover:border-black/10 hover:bg-white hover:shadow-[0_28px_70px_rgba(0,0,0,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:p-4"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[19px] bg-[#eeeeec] shadow-[inset_0_0_0_1px_rgba(17,17,17,.06)]">
          <span
            className={cn(
              "absolute left-4 top-4 z-10 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-[0_8px_22px_rgba(0,0,0,.12)] backdrop-blur-xl sm:left-5 sm:top-5",
              project.type === "Real Project"
                ? "border-white/10 bg-[#1c1c1e] text-white"
                : "border-white/70 bg-white/82 text-[#1c1c1e]",
            )}
          >
            {project.type}
          </span>
          <Image
            src={project.previewImage}
            alt={project.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 46vw, 520px"
            className="object-cover transition-transform duration-1000 ease-[var(--ease-apple)] group-hover:scale-[1.035]"
          />
          <span className="absolute right-5 top-5 flex size-11 translate-y-2 scale-95 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-[0_12px_28px_rgba(0,0,0,.25)] transition-all duration-500 ease-[var(--ease-apple)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="icon-motion-diagonal size-4" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        <div className="px-2 pb-2">
          <div className="mt-5 flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-medium leading-[1.45] text-[#777] sm:text-[12px]">
                {project.subtitle}
              </p>
              <h3 className="max-w-[520px] break-words pr-2 text-[clamp(1.35rem,2.1vw,1.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#1a1a1a] [overflow-wrap:anywhere]">
                {project.title}
              </h3>
            </div>
            <span className="mt-6 hidden size-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_7px_18px_rgba(0,0,0,.06)] sm:flex">
              <ArrowUpRight className="icon-motion-diagonal size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </div>

          <p className="mt-4 max-w-[580px] text-[12px] leading-[1.6] text-[#666] sm:text-[13px]">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-black/9 bg-[#f7f7f8] px-3 py-1.5 text-[11px] font-medium text-[#555]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 border-t border-black/7 pt-3">
            {project.tools.map((tool) => (
              <TechIcon key={tool} tool={tool} compact />
            ))}
          </div>
        </div>
      </TransitionLink>
    </motion.article>
  );
}
