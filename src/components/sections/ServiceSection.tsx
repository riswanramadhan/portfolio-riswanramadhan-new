"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { fadeUp, softSpring, stagger } from "@/lib/animations";
import { sectionContent, services } from "@/lib/portfolio-data";
import { useFloatingPreviewMotion } from "@/lib/use-floating-preview";
import { cn } from "@/lib/utils";
import { FloatingCursorPreview } from "@/components/ui/FloatingCursorPreview";

export function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const previewMotion = useFloatingPreviewMotion(reduceMotion);
  const activeService = activeIndex === null ? null : services[activeIndex];

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
      id="service"
      aria-labelledby="service-heading"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setActiveIndex(null);
          previewMotion.resetDirection();
        }
      }}
      className="relative w-full scroll-mt-0 bg-[var(--surface-soft)] px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-[74px] lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <motion.h2
          id="service-heading"
          variants={fadeUp}
          className="section-heading mb-10 sm:mb-14"
        >
          {sectionContent.service.heading}
        </motion.h2>

        <motion.div variants={stagger} className="border-t border-black/12">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                layout
                key={service.id}
                variants={fadeUp}
                transition={reduceMotion ? { duration: 0 } : softSpring}
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
                  "group relative overflow-hidden border-b border-black/12 transition-[background-color,color,border-color,box-shadow] duration-700 ease-[var(--ease-apple)]",
                  isActive
                    ? "my-2 min-h-[230px] rounded-[24px] border-transparent bg-[#1c1c1e] text-white shadow-[0_24px_65px_rgba(0,0,0,.14)] md:min-h-[205px]"
                    : "min-h-[116px] bg-transparent text-[#1d1d1f] sm:min-h-[128px]",
                )}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-20 cursor-pointer rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
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
                  aria-expanded={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  aria-label={`${isActive ? "Close" : "Open"} ${service.title} details`}
                >
                  <span className="sr-only">{service.title}</span>
                </button>

                <AnimatePresence initial={false} mode="wait">
                  {isActive ? (
                    <motion.div
                      id={`service-panel-${service.id}`}
                      key="active"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none relative z-10 flex min-h-[230px] flex-col justify-center px-6 py-8 sm:px-9 md:min-h-[205px] md:px-11"
                    >
                      <span className="mb-5 block text-[10px] font-medium tracking-[0.22em] text-white/45">
                        [{service.number}]
                      </span>
                      <h3 className="max-w-[760px] text-[clamp(2rem,4.4vw,3.55rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
                        {service.title}
                      </h3>
                      <p className="mt-5 max-w-[600px] text-[13px] leading-[1.65] text-white/58 sm:text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32 }}
                      className="pointer-events-none flex min-h-[116px] items-center justify-between gap-4 px-2 sm:min-h-[128px] sm:px-4"
                    >
                      <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                        <span className="mt-1 text-[9px] font-medium tracking-[0.18em] text-black/40 sm:mt-2">
                          [{service.number}]
                        </span>
                        <h3 className="text-[clamp(1.75rem,4.7vw,3.45rem)] font-semibold leading-none tracking-[-0.06em]">
                          {service.title}
                        </h3>
                      </div>
                      <ArrowRight
                        className="icon-motion-slide size-6 shrink-0 transition-transform duration-700 ease-[var(--ease-apple)] sm:size-8"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <FloatingCursorPreview
        image={activeService?.image}
        alt={activeService?.imageAlt}
        visible={activeService !== null}
        x={previewMotion.x}
        y={previewMotion.y}
        rotate={previewMotion.rotate}
        reduceMotion={reduceMotion}
      />
    </motion.section>
  );
}
