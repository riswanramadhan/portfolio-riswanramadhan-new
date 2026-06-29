"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { fadeScale, revealLeft, revealRight } from "@/lib/animations";
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
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [hasScrolled, setHasScrolled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(
    () => {
      if (activeFilter === "All") return projects;
      if (activeFilter === "Real Project") {
        return projects.filter((project) => project.type === "Real Project");
      }
      return projects.filter((project) => project.type !== "Real Project");
    },
    [activeFilter],
  );
  const visibleProjects = filteredProjects.slice(0, 4);

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
      <SectionFrame variant="white" className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-18 lg:px-[74px] lg:py-20">
        <span
          className="pointer-events-none absolute inset-x-0 top-6 text-center text-[clamp(4.2rem,13vw,10rem)] font-bold leading-none tracking-[-0.08em] text-[#f3f3f1]"
          aria-hidden="true"
        >
          {sectionContent.work.backgroundLabel}
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <motion.h2
            id="work-heading"
            variants={revealLeft}
            className="section-heading text-center"
          >
            {sectionContent.work.heading}
          </motion.h2>

          <motion.div
            variants={revealRight}
            className="mb-7 mt-11 flex flex-col gap-5 border-b border-black/10 pb-6 md:mb-16"
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
                    onClick={() => {
                      setHasScrolled(false);
                      carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                      setActiveFilter(filter.label);
                    }}
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
          </motion.div>

          <p className="sr-only" aria-live="polite">
            Showing {visibleProjects.length} of {filteredProjects.length} projects in {activeFilter}
          </p>

          <div className="mb-4 flex items-center justify-between md:hidden" aria-hidden="true">
            <span className="text-[11px] font-medium tracking-[-0.01em] text-black/45">
              Swipe to explore
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/7 bg-[#f2f2f4] py-1.5 pl-3 pr-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/52 shadow-[0_6px_18px_rgba(0,0,0,.06)]">
              4 selected
              <ChevronsRight className="mobile-swipe-cue size-3.5" strokeWidth={1.8} />
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFilter}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative -mx-5 sm:-mx-8 md:mx-0"
            >
              <div
                id="selected-work-grid"
                ref={carouselRef}
                onScroll={(event) => {
                  if (event.currentTarget.scrollLeft > 12 && !hasScrolled) {
                    setHasScrolled(true);
                  }
                }}
                className="mobile-work-carousel flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-5 sm:px-8 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-16 md:overflow-visible md:px-0 md:pb-0 lg:gap-x-12"
              >
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    priority={activeFilter === "All" && index < 2}
                    animationIndex={index}
                    reduceMotion={Boolean(reduceMotion)}
                    className="w-[84vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none"
                  />
                ))}

                <article className="w-[56vw] max-w-[230px] shrink-0 snap-start md:hidden">
                  <TransitionLink
                    href="/work"
                    transitionLabel="Work"
                    aria-label="View all work"
                    className="group flex h-full min-h-[420px] flex-col items-center justify-center gap-5 rounded-[28px] border border-black/7 bg-[#f2f2f4] px-6 text-center shadow-[0_18px_50px_rgba(0,0,0,.07)] transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-apple)] active:scale-[.985]"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-[#1c1c1e] text-white shadow-[0_12px_30px_rgba(0,0,0,.2)]">
                      <ArrowUpRight className="icon-motion-diagonal size-5" strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold tracking-[-0.035em] text-[#1d1d1f]">
                        View all work
                      </span>
                      <span className="mt-1.5 block text-[11px] leading-[1.45] text-black/42">
                        Continue to all {projects.length} projects
                      </span>
                    </span>
                  </TransitionLink>
                </article>
              </div>

              <div
                className={cn(
                  "pointer-events-none absolute right-2 top-[38%] z-20 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/82 text-black shadow-[0_10px_28px_rgba(0,0,0,.14)] backdrop-blur-xl transition-opacity duration-500 md:hidden",
                  hasScrolled ? "opacity-0" : "opacity-100",
                )}
                aria-hidden="true"
              >
                <ChevronsRight className="mobile-swipe-cue size-4" strokeWidth={1.8} />
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={revealLeft}
            className="mt-8 flex justify-center border-t border-black/8 pt-8 md:mt-16 md:pt-10"
          >
            <PillButton
              href="/work"
              ariaLabel="View all portfolio work"
              className="min-w-[176px]"
            >
              {sectionContent.work.viewAll}
            </PillButton>
          </motion.div>
        </div>
      </SectionFrame>
    </motion.section>
  );
}
