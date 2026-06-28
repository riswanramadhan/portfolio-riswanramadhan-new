"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  LayoutGrid,
  Palette,
  Search,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { revealLeft, revealRight, stagger } from "@/lib/animations";
import {
  sectionContent,
  services,
  type ServiceIconName,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const serviceIconMap: Record<ServiceIconName, LucideIcon> = {
  Code: Code2,
  Search,
  Layout: LayoutGrid,
  Palette,
};

export function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        activeIndex !== null &&
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [activeIndex]);

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

        <motion.div variants={stagger} className="flex flex-col gap-3 sm:gap-2">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            const ServiceIcon = serviceIconMap[service.icon];

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
                  if (event.pointerType === "mouse") setActiveIndex(index);
                }}
                className={cn(
                  "group relative min-h-[142px] overflow-hidden rounded-[24px] border transition-[background-color,color,border-color,box-shadow] duration-700 ease-[var(--ease-apple)] sm:min-h-[128px]",
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
                    if (
                      event.detail > 0 &&
                      window.matchMedia("(hover: hover) and (pointer: fine)").matches
                    ) {
                      return;
                    }
                    const nextIndex = isActive ? null : index;
                    setActiveIndex(nextIndex);
                  }}
                  onFocus={(event) => {
                    if (!event.currentTarget.matches(":focus-visible")) return;
                    setActiveIndex(index);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setActiveIndex(null);
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
                  <div className="flex min-h-[142px] items-start gap-4 py-6 sm:min-h-[128px] sm:items-center sm:gap-6 sm:py-0">
                    <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6">
                      <span
                        className={cn(
                          "mt-1 text-[9px] font-medium tracking-[0.18em] transition-colors duration-500 sm:mt-2",
                          isActive ? "text-white/45" : "text-black/40",
                        )}
                      >
                        [{service.number}]
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[clamp(1.55rem,4.2vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                          {service.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-4 max-w-[680px] text-[12px] leading-[1.65] transition-colors duration-500 sm:mt-3 sm:text-[13px] sm:leading-[1.55]",
                            isActive ? "text-white/55" : "text-black/47",
                          )}
                        >
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "hidden size-10 shrink-0 items-center justify-center rounded-full border sm:flex",
                        isActive
                          ? "border-white/14 bg-white/8 text-white/72"
                          : "border-black/8 bg-white/45 text-black/55",
                      )}
                      aria-hidden="true"
                    >
                      <ServiceIcon className="size-4" strokeWidth={1.6} />
                    </span>

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
                    <div className="max-w-[850px] pb-8 pl-10 pt-2 sm:pb-9 sm:pl-12 sm:pt-0 lg:pb-10 lg:pl-14">
                      <p className="text-[13px] leading-[1.75] text-white/68 sm:text-sm sm:leading-[1.7]">
                        {service.fullDescription}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2 sm:mt-5">
                        {service.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className={cn(
                              "rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-[10px] font-medium text-white/65",
                              !service.featuredKeywords.includes(keyword) && "hidden sm:inline-flex",
                            )}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
