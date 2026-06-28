"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { fadeScale, fadeUp, stagger } from "@/lib/animations";
import { experiences, sectionContent } from "@/lib/portfolio-data";
import { useFloatingPreviewMotion } from "@/lib/use-floating-preview";
import { cn } from "@/lib/utils";
import { FloatingCursorPreview } from "@/components/ui/FloatingCursorPreview";
import { SectionFrame } from "@/components/ui/SectionFrame";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const previewMotion = useFloatingPreviewMotion(reduceMotion);
  const activeExperience = activeIndex === null ? null : experiences[activeIndex];

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        activeIndex !== null &&
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
        previewMotion.resetDirection();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [activeIndex, previewMotion]);

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      variants={fadeScale}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setActiveIndex(null);
          previewMotion.resetDirection();
        }
      }}
      className="scroll-mt-0"
    >
      <SectionFrame
        variant="dark"
        className="bg-[#1c1c1e] px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-[74px] lg:py-28"
      >
        <div className="relative mx-auto w-full max-w-[1280px]">
          <span
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(4.3rem,13vw,10.5rem)] font-bold leading-none tracking-[-0.08em] text-white/[0.035]"
            aria-hidden="true"
          >
            {sectionContent.experience.backgroundLabel}
          </span>

          <motion.div
            variants={fadeUp}
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
              const isActive = activeIndex === index;

              return (
                <motion.article
                  key={experience.id}
                  variants={fadeUp}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    previewMotion.resetDirection();
                    previewMotion.snapToPointer(event.clientX, event.clientY);
                    setActiveIndex(index);
                  }}
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse") return;
                    if (!isActive) setActiveIndex(index);
                    previewMotion.moveToPointer(event.clientX, event.clientY);
                  }}
                  className={cn(
                    "group relative border-b border-white/12 transition-[background-color,border-color] duration-700 ease-[var(--ease-apple)] last:border-b-0",
                    isActive && "border-transparent bg-white/[0.055]",
                  )}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      const nextIndex = isActive ? null : index;
                      setActiveIndex(nextIndex);
                      if (nextIndex === null) {
                        previewMotion.resetDirection();
                      } else {
                        previewMotion.moveToElement(event.currentTarget.getBoundingClientRect());
                      }
                    }}
                    onFocus={(event) => {
                      if (!event.currentTarget.matches(":focus-visible")) return;
                      setActiveIndex(index);
                      previewMotion.moveToElement(event.currentTarget.getBoundingClientRect());
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setActiveIndex(null);
                        previewMotion.resetDirection();
                        event.currentTarget.blur();
                      }
                    }}
                    aria-pressed={isActive}
                    aria-label={`Preview ${experience.company} experience`}
                    className="grid min-h-[118px] w-full grid-cols-1 items-center gap-4 px-3 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white md:grid-cols-[minmax(0,1fr)_170px_44px] md:gap-7 md:px-5 md:py-5"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-medium tracking-[-0.025em] text-white transition-transform duration-700 ease-[var(--ease-apple)] group-hover:translate-x-1 sm:text-[19px]">
                        {experience.company}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-white/45 sm:text-[15px]">
                        {experience.role}
                      </p>
                    </div>

                    <time className="text-[12px] font-medium text-white/52 md:text-right">
                      {experience.period}
                    </time>

                    <span
                      className={cn(
                        "hidden size-10 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-700 ease-[var(--ease-apple)] md:flex",
                        isActive
                          ? "rotate-0 bg-white text-black"
                          : "rotate-12 bg-white/5 text-white/65",
                      )}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="icon-motion-orbit size-4" strokeWidth={1.5} />
                    </span>
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </SectionFrame>

      <FloatingCursorPreview
        image={activeExperience?.image}
        alt={activeExperience?.imageAlt}
        visible={activeExperience !== null}
        x={previewMotion.x}
        y={previewMotion.y}
        rotate={previewMotion.rotate}
        reduceMotion={reduceMotion}
        dark
      />
    </motion.section>
  );
}
