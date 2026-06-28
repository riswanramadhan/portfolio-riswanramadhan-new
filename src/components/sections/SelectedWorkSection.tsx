"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { fadeScale, fadeUp } from "@/lib/animations";
import {
  type FilterCategory,
  projects,
  sectionContent,
  workFilters,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/ui/PillButton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionFrame } from "@/components/ui/SectionFrame";

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <motion.section
      id="work"
      aria-labelledby="work-heading"
      variants={fadeScale}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-6"
    >
      <SectionFrame variant="white" className="px-5 pb-16 pt-20 sm:px-8 md:px-12 md:pb-20 md:pt-24 lg:px-[74px] lg:pb-28 lg:pt-28">
        <span
          className="pointer-events-none absolute inset-x-0 top-6 text-center text-[clamp(4.2rem,13vw,10rem)] font-bold leading-none tracking-[-0.08em] text-[#f3f3f1]"
          aria-hidden="true"
        >
          {sectionContent.work.backgroundLabel}
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <motion.h2
            id="work-heading"
            variants={fadeUp}
            className="section-heading text-center"
          >
            {sectionContent.work.heading}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mb-12 mt-11 flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between md:mb-16"
          >
            <div
              className="flex flex-wrap items-center gap-1 rounded-full bg-[#f2f2f4] p-1.5"
              role="tablist"
              aria-label="Filter selected work"
            >
              {workFilters.map((filter) => {
                const isActive = activeFilter === filter.label;

                return (
                  <button
                    type="button"
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.label)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="selected-work-grid"
                    className={cn(
                      "group relative flex min-h-9 items-center gap-1 rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors duration-500 ease-[var(--ease-apple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:px-4",
                      isActive ? "text-black" : "text-[#777] hover:text-black",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="work-filter-indicator"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,.09)]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative z-10">{filter.label}</span>
                    <sup className="relative z-10 text-[8px] text-[#999]">
                      [{filter.count}]
                    </sup>
                  </button>
                );
              })}
            </div>

            <PillButton
              variant="light"
              onClick={() => setActiveFilter("All")}
              ariaLabel="Show all selected work"
            >
              {sectionContent.work.viewAll}
            </PillButton>
          </motion.div>

          <p className="sr-only" aria-live="polite">
            Showing {filteredProjects.length} projects in {activeFilter}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              id="selected-work-grid"
              key={activeFilter}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-16 lg:gap-x-12"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priority={activeFilter === "All" && index < 2}
                  animationIndex={index}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionFrame>
    </motion.section>
  );
}
