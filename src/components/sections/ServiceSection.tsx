"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { revealLeft, revealRight, stagger } from "@/lib/animations";
import { sectionContent, services } from "@/lib/portfolio-data";
import {
  useDesktopFloatingPreview,
  useFloatingPreviewMotion,
} from "@/lib/use-floating-preview";
import { cn } from "@/lib/utils";
import { FloatingCursorPreview } from "@/components/ui/FloatingCursorPreview";

export function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const desktopPreviewEnabled = useDesktopFloatingPreview();
  const previewMotion = useFloatingPreviewMotion(reduceMotion);
  const previewService =
    previewIndex === null ? null : services[previewIndex];

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        activeIndex !== null &&
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
        setPreviewIndex(null);
        previewMotion.resetDirection();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [activeIndex, previewMotion]);

  return (
    <motion.section
      ref={sectionRef}
      id="service"
      aria-labelledby="service-heading"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      onPointerLeave={(event) => {
        if (desktopPreviewEnabled && event.pointerType === "mouse") {
          setActiveIndex(null);
          setPreviewIndex(null);
          previewMotion.resetDirection();
        }
      }}
      className="relative w-full scroll-mt-0 overflow-hidden bg-[var(--surface-soft)] px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-[74px] lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <motion.h2
          id="service-heading"
          variants={revealLeft}
          className="section-heading mb-10 sm:mb-14"
        >
          {sectionContent.service.heading}
        </motion.h2>

        <motion.div variants={stagger} className="flex flex-col gap-2">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                layout
                key={service.id}
                variants={index % 2 === 0 ? revealLeft : revealRight}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        layout: {
                          duration: 0.62,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                onPointerEnter={(event) => {
                  if (
                    !desktopPreviewEnabled ||
                    event.pointerType !== "mouse"
                  ) {
                    return;
                  }
                  previewMotion.resetDirection();
                  previewMotion.snapToPointer(event.clientX, event.clientY);
                  setActiveIndex(index);
                  setPreviewIndex(index);
                }}
                onPointerMove={(event) => {
                  if (
                    !desktopPreviewEnabled ||
                    event.pointerType !== "mouse"
                  ) {
                    return;
                  }
                  if (!isActive) setActiveIndex(index);
                  if (previewIndex !== index) setPreviewIndex(index);
                  previewMotion.moveToPointer(event.clientX, event.clientY);
                }}
                className={cn(
                  "group relative min-h-[116px] overflow-hidden rounded-[24px] border transition-[background-color,color,border-color,box-shadow] duration-700 ease-[var(--ease-apple)] sm:min-h-[128px]",
                  isActive
                    ? "border-transparent bg-[#1c1c1e] text-white shadow-[0_24px_65px_rgba(0,0,0,.14)]"
                    : "border-black/8 bg-white/35 text-[#1d1d1f] shadow-[0_8px_28px_rgba(0,0,0,.025)] hover:bg-white/55 hover:shadow-[0_14px_38px_rgba(0,0,0,.055)]",
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "absolute inset-0 z-20 cursor-pointer rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
                    isActive
                      ? "focus-visible:ring-white"
                      : "focus-visible:ring-black",
                  )}
                  onClick={(event) => {
                    if (desktopPreviewEnabled && event.detail > 0) return;
                    const nextIndex = isActive ? null : index;
                    setActiveIndex(nextIndex);
                    if (nextIndex === null) {
                      setPreviewIndex(null);
                      previewMotion.resetDirection();
                    }
                  }}
                  onFocus={(event) => {
                    if (!event.currentTarget.matches(":focus-visible")) return;
                    setActiveIndex(index);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setActiveIndex(null);
                      setPreviewIndex(null);
                      previewMotion.resetDirection();
                      event.currentTarget.blur();
                    }
                  }}
                  aria-expanded={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  aria-label={`${isActive ? "Close" : "Open"} ${service.title} details`}
                >
                  <span className="sr-only">{service.title}</span>
                </button>

                <div className="pointer-events-none relative z-10 px-5 sm:px-8 lg:px-10">
                  <div className="flex min-h-[116px] items-center gap-4 sm:min-h-[128px] sm:gap-6">
                    <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6">
                      <span
                        className={cn(
                          "mt-1 text-[9px] font-medium tracking-[0.18em] transition-colors duration-500 sm:mt-2",
                          isActive ? "text-white/45" : "text-black/40",
                        )}
                      >
                        [{service.number}]
                      </span>
                      <h3 className="text-[clamp(1.7rem,4.2vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                        {service.title}
                      </h3>
                    </div>

                    <motion.span
                      initial={false}
                      animate={{
                        rotate: isActive ? -45 : 0,
                        backgroundColor: isActive
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0)",
                        color: isActive ? "#111111" : "#1d1d1f",
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current/15 sm:size-10"
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-5 sm:size-6" strokeWidth={1.35} />
                    </motion.span>
                  </div>

                  <motion.div
                    id={`service-panel-${service.id}`}
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 8,
                    }}
                    transition={{
                      height: {
                        duration: reduceMotion ? 0 : 0.62,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: reduceMotion ? 0 : 0.42 },
                      y: {
                        duration: reduceMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[660px] pb-7 pl-10 text-[13px] leading-[1.65] text-white/60 sm:pb-9 sm:pl-12 sm:text-sm lg:pb-10 lg:pl-14">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <FloatingCursorPreview
        image={previewService?.image}
        alt={previewService?.imageAlt}
        visible={desktopPreviewEnabled && previewService !== null}
        x={previewMotion.x}
        y={previewMotion.y}
        rotate={previewMotion.rotate}
        reduceMotion={reduceMotion}
      />
    </motion.section>
  );
}
