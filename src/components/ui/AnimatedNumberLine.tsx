"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type RailTheme = "light" | "dark";
type RailOrientation = "responsive" | "horizontal" | "vertical";

interface AnimatedNumberLineProps {
  number: string;
  index: number;
  total: number;
  theme?: RailTheme;
  orientation?: RailOrientation;
  isLast?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AnimatedNumberLine({
  number,
  index,
  total,
  theme = "light",
  orientation = "responsive",
  isLast = index === total - 1,
  children,
  className,
  contentClassName,
}: AnimatedNumberLineProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const dark = theme === "dark";
  const stepDuration = 1.45;
  const cycleDuration = total * stepDuration + 1.1;
  const delay = index * stepDuration;
  const phase = stepDuration / cycleDuration;
  const nodeTimes = [0, phase * 0.08, phase * 0.28, phase * 0.64, 1];
  const flowTimes = [0, phase * 0.16, phase * 0.78, phase, 1];

  const renderNode = () => (
    <motion.span
      className={cn(
        "relative z-10 flex size-8 items-center justify-center rounded-full border text-[10px] font-semibold tracking-[0.08em] backdrop-blur-sm",
        dark
          ? "border-white/20 bg-[#232326] text-white/56 shadow-[0_7px_20px_rgba(0,0,0,.24)]"
          : "border-black/12 bg-white text-black/48 shadow-[0_7px_20px_rgba(0,0,0,.08)]",
      )}
      animate={
        reduceMotion
          ? undefined
          : {
              color: dark
                ? ["rgba(255,255,255,.56)", "#ffffff", "#dff9ff", "rgba(255,255,255,.56)", "rgba(255,255,255,.56)"]
                : ["rgba(0,0,0,.48)", "#174f63", "#0b7899", "rgba(0,0,0,.48)", "rgba(0,0,0,.48)"],
              borderColor: dark
                ? ["rgba(255,255,255,.2)", "rgba(177,238,255,.9)", "rgba(255,255,255,.2)", "rgba(255,255,255,.2)", "rgba(255,255,255,.2)"]
                : ["rgba(0,0,0,.12)", "rgba(69,184,218,.78)", "rgba(0,0,0,.12)", "rgba(0,0,0,.12)", "rgba(0,0,0,.12)"],
              boxShadow: dark
                ? [
                    "0 7px 20px rgba(0,0,0,.24)",
                    "0 0 0 5px rgba(122,220,249,.12), 0 0 22px rgba(132,226,255,.85)",
                    "0 0 0 2px rgba(122,220,249,.05), 0 0 8px rgba(132,226,255,.2)",
                    "0 7px 20px rgba(0,0,0,.24)",
                    "0 7px 20px rgba(0,0,0,.24)",
                  ]
                : [
                    "0 7px 20px rgba(0,0,0,.08)",
                    "0 0 0 5px rgba(69,184,218,.1), 0 0 20px rgba(69,184,218,.65)",
                    "0 0 0 2px rgba(69,184,218,.04), 0 0 7px rgba(69,184,218,.16)",
                    "0 7px 20px rgba(0,0,0,.08)",
                    "0 7px 20px rgba(0,0,0,.08)",
                  ],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: cycleDuration,
              delay,
              times: nodeTimes,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {number}
    </motion.span>
  );

  const renderHorizontalRail = () => !isLast ? (
    <span
      className={cn(
        "absolute left-8 right-[-16px] top-[15px] h-[2px] overflow-hidden",
        dark ? "bg-white/13" : "bg-black/10",
      )}
      aria-hidden="true"
    >
      {!reduceMotion ? (
        <motion.span
          className="absolute inset-0 origin-left bg-[linear-gradient(90deg,rgba(102,211,242,.08),rgba(170,237,255,.95),#ffffff)] shadow-[0_0_12px_rgba(126,222,250,.82)]"
          animate={{
            scaleX: [0, 0, 1, 1, 1],
            opacity: [0, 1, 1, 0, 0],
          }}
          transition={{
            duration: cycleDuration,
            delay,
            times: flowTimes,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </span>
  ) : null;

  const renderVerticalRail = () => !isLast ? (
    <span
      className={cn(
        "absolute bottom-0 left-[15px] top-8 w-[2px] overflow-hidden",
        dark ? "bg-white/13" : "bg-black/10",
      )}
      aria-hidden="true"
    >
      {!reduceMotion ? (
        <motion.span
          className="absolute inset-0 origin-top bg-[linear-gradient(180deg,rgba(102,211,242,.08),rgba(170,237,255,.95),#ffffff)] shadow-[0_0_12px_rgba(126,222,250,.82)]"
          animate={{
            scaleY: [0, 0, 1, 1, 1],
            opacity: [0, 1, 1, 0, 0],
          }}
          transition={{
            duration: cycleDuration,
            delay,
            times: flowTimes,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </span>
  ) : null;

  const responsive = orientation === "responsive";
  const horizontal = orientation === "horizontal";
  const vertical = orientation === "vertical";

  return (
    <article
      className={cn(
        "relative",
        responsive &&
          "grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-5 pb-11 last:pb-0 sm:pb-12 lg:block lg:pb-0",
        horizontal && "pl-0",
        vertical && "pb-10 pl-12 last:pb-0",
        className,
      )}
    >
      {responsive ? (
        <>
          <div className="relative col-start-1 row-start-1 min-h-full lg:hidden">
            {renderNode()}
            {renderVerticalRail()}
          </div>
          <div className="absolute inset-x-0 top-0 hidden lg:block">
            {renderNode()}
            {renderHorizontalRail()}
          </div>
        </>
      ) : null}

      {horizontal ? (
        <div className="absolute inset-x-0 top-0">
          {renderNode()}
          {renderHorizontalRail()}
        </div>
      ) : null}

      {vertical ? (
        <div className="absolute inset-y-0 left-0">
          {renderNode()}
          {renderVerticalRail()}
        </div>
      ) : null}

      <div
        className={cn(
          responsive &&
            "col-start-2 row-start-1 min-w-0 self-start pt-0 lg:block lg:pt-14",
          horizontal && "pt-14",
          vertical && "pt-0",
          contentClassName,
        )}
      >
        {children}
      </div>
    </article>
  );
}
