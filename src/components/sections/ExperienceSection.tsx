"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  fadeScale,
  revealLeft,
  revealRight,
  stagger,
} from "@/lib/animations";
import { experiences, sectionContent } from "@/lib/portfolio-data";
import {
  useDesktopFloatingPreview,
  useFloatingPreviewMotion,
} from "@/lib/use-floating-preview";
import { cn } from "@/lib/utils";
import { FloatingCursorPreview } from "@/components/ui/FloatingCursorPreview";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { TechIcon } from "@/components/ui/TechIcon";

interface ExperienceSectionProps {
  compact?: boolean;
}

export function ExperienceSection({ compact = false }: ExperienceSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const desktopPreviewEnabled = useDesktopFloatingPreview();
  const previewMotion = useFloatingPreviewMotion(reduceMotion);
  const previewExperience =
    previewIndex === null ? null : experiences[previewIndex];

  return (
    <motion.section
      id="experience"
      aria-labelledby="experience-heading"
      variants={fadeScale}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onPointerLeave={(event) => {
        if (desktopPreviewEnabled && event.pointerType === "mouse") {
          setPreviewIndex(null);
          previewMotion.resetDirection();
        }
      }}
      className="scroll-mt-0"
    >
      <SectionFrame
        variant="dark"
        className={cn(
          "bg-[#1c1c1e] px-5 sm:px-8 md:px-12 lg:px-[74px]",
          compact
            ? "py-16 md:py-20 lg:py-20"
            : "py-20 md:py-24 lg:py-28",
        )}
      >
        <div className="relative mx-auto w-full max-w-[1280px]">
          <span
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(4.3rem,13vw,10.5rem)] font-bold leading-none tracking-[-0.08em] text-white/[0.035]"
            aria-hidden="true"
          >
            {sectionContent.experience.backgroundLabel}
          </span>

          <motion.div
            variants={revealLeft}
            className="relative z-10 flex flex-col gap-5 border-b border-white/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2 id="experience-heading" className="section-heading text-white">
              {sectionContent.experience.heading}
            </h2>
            <p className="max-w-[180px] text-[12px] leading-[1.45] text-white/48 sm:text-right">
              {sectionContent.experience.metric}
            </p>
          </motion.div>

          <motion.div variants={stagger} className="relative z-10">
            {experiences.map((experience, index) => {
              const isExpanded = expandedIndex === index;
              const isActive = isExpanded || previewIndex === index;

              return (
                <motion.article
                  key={experience.id}
                  variants={index % 2 === 0 ? revealLeft : revealRight}
                  onPointerEnter={(event) => {
                    if (
                      expandedIndex !== null ||
                      !desktopPreviewEnabled ||
                      event.pointerType !== "mouse"
                    ) {
                      return;
                    }
                    previewMotion.resetDirection();
                    previewMotion.snapToPointer(event.clientX, event.clientY);
                    setPreviewIndex(index);
                  }}
                  onPointerMove={(event) => {
                    if (
                      expandedIndex !== null ||
                      !desktopPreviewEnabled ||
                      event.pointerType !== "mouse"
                    ) {
                      return;
                    }
                    if (previewIndex !== index) setPreviewIndex(index);
                    previewMotion.moveToPointer(event.clientX, event.clientY);
                  }}
                  className={cn(
                    "group relative border-b border-white/12 transition-[background-color,border-color] duration-700 ease-[var(--ease-apple)] last:border-b-0",
                    isActive && "border-transparent bg-white/[0.055]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedIndex(isExpanded ? null : index);
                      setPreviewIndex(null);
                      previewMotion.resetDirection();
                    }}
                    aria-expanded={isExpanded}
                    aria-controls={`experience-panel-${experience.id}`}
                    className="grid min-h-[118px] w-full grid-cols-1 items-center gap-4 px-3 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/65 lg:grid-cols-[minmax(0,1fr)_170px_44px] lg:gap-7 lg:px-5 lg:py-5"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-medium tracking-[-0.025em] text-white transition-transform duration-700 ease-[var(--ease-apple)] sm:text-[19px] lg:group-hover:translate-x-1">
                        {experience.company}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-white/45 sm:text-[15px]">
                        {experience.role}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-[12px] font-medium text-white/52 lg:justify-end lg:text-right">
                      <time>{experience.period}</time>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/36 lg:hidden">
                        {isExpanded ? "Close details" : "View details"}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "hidden size-10 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-700 ease-[var(--ease-apple)] lg:flex",
                        isActive
                          ? "rotate-0 bg-white text-black"
                          : "rotate-12 bg-white/5 text-white/65",
                      )}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="icon-motion-orbit size-4" strokeWidth={1.5} />
                    </span>
                  </button>

                  <motion.div
                    id={`experience-panel-${experience.id}`}
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      height: {
                        duration: reduceMotion ? 0 : 0.62,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: reduceMotion ? 0 : 0.36 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-7 px-3 pb-9 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:px-5 lg:pb-11">
                      <div>
                        <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.13em] text-white/42">
                          <span>{experience.type}</span>
                          <span aria-hidden="true">·</span>
                          <span>{experience.location}</span>
                        </div>
                        <p className="mt-4 text-[13px] leading-[1.75] text-white/62 sm:text-sm">
                          {experience.summary}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {experience.tools.map((tool) => (
                            <TechIcon key={tool} tool={tool} inverted compact />
                          ))}
                        </div>
                      </div>

                      <ul className="space-y-3 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        {experience.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-[13px] leading-[1.65] text-white/58"
                          >
                            <span className="mt-[0.65em] size-1 shrink-0 rounded-full bg-white/35" aria-hidden="true" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </SectionFrame>

      <FloatingCursorPreview
        image={previewExperience?.image}
        alt={previewExperience?.imageAlt}
        visible={
          desktopPreviewEnabled &&
          expandedIndex === null &&
          previewExperience !== null
        }
        x={previewMotion.x}
        y={previewMotion.y}
        rotate={previewMotion.rotate}
        reduceMotion={reduceMotion}
        dark
      />
    </motion.section>
  );
}
