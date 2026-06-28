"use client";

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

interface HeroPortraitRevealProps {
  blackWhiteSrc: string;
  colorSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function HeroPortraitReveal({
  blackWhiteSrc,
  colorSrc,
  alt,
  className,
  priority = false,
}: HeroPortraitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tapTimerRef = useRef<number | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reveal = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 360, damping: 38, mass: 0.42 });
  const smoothY = useSpring(pointerY, { stiffness: 360, damping: 38, mass: 0.42 });
  const smoothReveal = useSpring(reveal, { stiffness: 260, damping: 30, mass: 0.45 });

  const brushMask = useMotionTemplate`
    radial-gradient(
      ellipse clamp(78px,9vw,118px) clamp(106px,12vw,158px)
      at ${smoothX}px ${smoothY}px,
      rgba(0,0,0,1) 0%,
      rgba(0,0,0,.94) 42%,
      rgba(0,0,0,.46) 62%,
      transparent 80%
    ),
    radial-gradient(
      ellipse clamp(38px,4.6vw,62px) clamp(62px,6vw,86px)
      at calc(${smoothX}px - clamp(42px,4vw,58px)) calc(${smoothY}px + 18px),
      rgba(0,0,0,.9) 0%,
      rgba(0,0,0,.45) 54%,
      transparent 78%
    ),
    radial-gradient(
      ellipse clamp(34px,4vw,54px) clamp(48px,5vw,74px)
      at calc(${smoothX}px + clamp(38px,3.8vw,54px)) calc(${smoothY}px - 24px),
      rgba(0,0,0,.82) 0%,
      rgba(0,0,0,.38) 52%,
      transparent 78%
    )
  `;

  useEffect(
    () => () => {
      if (tapTimerRef.current !== null) {
        window.clearTimeout(tapTimerRef.current);
      }
    },
    [],
  );

  const moveBrush = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  const showTapBrush = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "touch") return;
    moveBrush(event);
    reveal.set(1);
    if (tapTimerRef.current !== null) {
      window.clearTimeout(tapTimerRef.current);
    }
    tapTimerRef.current = window.setTimeout(() => {
      reveal.set(0);
      tapTimerRef.current = null;
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full touch-pan-y select-none drop-shadow-[0_24px_24px_rgba(0,0,0,.14)]",
        className,
      )}
      onPointerEnter={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        moveBrush(event);
        reveal.set(1);
      }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        moveBrush(event);
        reveal.set(1);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") reveal.set(0);
      }}
      onPointerDown={showTapBrush}
    >
      <Image
        src={blackWhiteSrc}
        alt={alt}
        fill
        priority={priority}
        draggable={false}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 760px"
        className="pointer-events-none object-contain object-bottom"
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: smoothReveal,
          WebkitMaskImage: brushMask,
          maskImage: brushMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
        aria-hidden="true"
      >
        <Image
          src={colorSrc}
          alt=""
          fill
          loading="eager"
          draggable={false}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 760px"
          className="object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
}
