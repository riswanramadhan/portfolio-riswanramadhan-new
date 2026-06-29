"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

export type HoverColorRevealImageProps = {
  src: string;
  blackWhiteSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  brushSize?: number;
};

export function HoverColorRevealImage({
  src,
  blackWhiteSrc,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 520px",
  brushSize = 92,
}: HoverColorRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, {
    stiffness: 420,
    damping: 34,
    mass: 0.28,
  });
  const smoothY = useSpring(rawY, {
    stiffness: 420,
    damping: 34,
    mass: 0.28,
  });
  const trailX = useSpring(rawX, {
    stiffness: 210,
    damping: 30,
    mass: 0.46,
  });
  const trailY = useSpring(rawY, {
    stiffness: 210,
    damping: 30,
    mass: 0.46,
  });

  const leadRadius = Math.round(brushSize * 0.72);
  const bodyWidth = Math.round(brushSize * 1.08);
  const bodyHeight = Math.round(brushSize * 0.84);
  const softLobe = Math.round(brushSize * 0.66);
  const lowerLobeWidth = Math.round(brushSize * 0.58);
  const lowerLobeHeight = Math.round(brushSize * 0.82);
  const horizontalOffset = Math.round(brushSize * 0.52);
  const verticalOffset = Math.round(brushSize * 0.2);

  const maskImage = useMotionTemplate`
    radial-gradient(
      circle ${leadRadius}px at ${rawX}px ${rawY}px,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.72) 22%,
      rgba(0,0,0,0.34) 52%,
      rgba(0,0,0,0.1) 76%,
      transparent 100%
    ),
    radial-gradient(
      ellipse ${bodyWidth}px ${bodyHeight}px at ${smoothX}px ${smoothY}px,
      rgba(0,0,0,0.66) 0%,
      rgba(0,0,0,0.3) 46%,
      rgba(0,0,0,0.08) 74%,
      transparent 100%
    ),
    radial-gradient(
      circle ${softLobe}px at calc(${trailX}px - ${horizontalOffset}px) calc(${trailY}px + ${verticalOffset}px),
      rgba(0,0,0,0.48) 0%,
      rgba(0,0,0,0.2) 48%,
      transparent 100%
    ),
    radial-gradient(
      ellipse ${lowerLobeWidth}px ${lowerLobeHeight}px at calc(${smoothX}px + ${horizontalOffset}px) calc(${smoothY}px + ${verticalOffset}px),
      rgba(0,0,0,0.38) 0%,
      rgba(0,0,0,0.14) 52%,
      transparent 100%
    )
  `;

  useEffect(() => {
    function updateHover(nextValue: boolean) {
      if (hoveringRef.current === nextValue) return;
      hoveringRef.current = nextValue;
      setIsHovering(nextValue);
    }

    function handlePointerMove(event: PointerEvent) {
      const container = containerRef.current;

      if (!container || event.pointerType === "touch") {
        updateHover(false);
        return;
      }

      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        updateHover(false);
        return;
      }

      // getBoundingClientRect includes the hero's CSS scale. Masks use the
      // element's unscaled coordinate system, so convert back to local pixels.
      const x =
        (event.clientX - rect.left) * (container.clientWidth / rect.width);
      const y =
        (event.clientY - rect.top) * (container.clientHeight / rect.height);

      if (!hoveringRef.current || reduceMotion) {
        smoothX.jump(x);
        smoothY.jump(y);
        trailX.jump(x);
        trailY.jump(y);
      }

      rawX.set(x);
      rawY.set(y);
      updateHover(true);
    }

    function hideReveal() {
      updateHover(false);
    }

    // Window-level tracking keeps the whole portrait responsive even where
    // hero copy or controls visually overlap its lower area.
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideReveal);
    document.documentElement.addEventListener("mouseleave", hideReveal);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideReveal);
      document.documentElement.removeEventListener("mouseleave", hideReveal);
    };
  }, [rawX, rawY, reduceMotion, smoothX, smoothY, trailX, trailY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none relative isolate overflow-hidden touch-pan-y select-none",
        className,
      )}
    >
      <Image
        src={blackWhiteSrc ?? src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        draggable={false}
        className={cn(
          "hover-color-reveal-image__base pointer-events-none select-none object-cover",
          imageClassName,
        )}
      />

      <motion.div
        className="hover-color-reveal-image__overlay pointer-events-none absolute inset-0"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
        }}
        aria-hidden="true"
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          className={cn(
            "pointer-events-none select-none object-cover",
            imageClassName,
          )}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
