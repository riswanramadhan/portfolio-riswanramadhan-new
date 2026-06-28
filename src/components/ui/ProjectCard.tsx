"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import type { Project } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/navigation/TransitionLink";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  animationIndex?: number;
  reduceMotion?: boolean;
}

export function ProjectCard({
  project,
  priority = false,
  animationIndex = 0,
  reduceMotion = false,
}: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.99 }}
      transition={{
        duration: reduceMotion ? 0 : 0.58,
        delay: reduceMotion ? 0 : animationIndex * 0.065,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: "spring", stiffness: 180, damping: 24 },
      }}
      className="group min-w-0"
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        transitionLabel={project.title}
        className="block rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[7px] bg-[#eeeeec] shadow-[inset_0_0_0_1px_rgba(17,17,17,.06)]">
        <span
          className={cn(
            "absolute left-4 top-4 z-10 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-[0_8px_22px_rgba(0,0,0,.12)] backdrop-blur-xl sm:left-5 sm:top-5",
            project.category === "Real Project"
              ? "border-white/10 bg-[#1c1c1e] text-white"
              : "border-white/70 bg-white/82 text-[#1c1c1e]",
          )}
        >
          {project.category}
        </span>
        <Image
          src={project.image}
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

        <div className="mt-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#777]">
              {project.type}
            </p>
            <h3 className="max-w-[520px] break-words pr-2 text-[clamp(1.35rem,2.1vw,1.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#1a1a1a] [overflow-wrap:anywhere]">
              {project.title}
            </h3>
          </div>
          <span className="mt-6 hidden size-8 shrink-0 items-center justify-center rounded-full border border-black/10 sm:flex">
            <ArrowUpRight className="icon-motion-diagonal size-3.5" strokeWidth={1.7} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/9 bg-[#fafafa] px-3 py-1.5 text-[11px] font-medium text-[#555]"
            >
              {tag}
            </span>
          ))}
        </div>
      </TransitionLink>
    </motion.article>
  );
}
