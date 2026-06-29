"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  motion,
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

interface PortraitSize {
  width: number;
  height: number;
}

const BRUSH_TAIL_SCALE = 0.62;

export function HeroPortraitReveal({
  blackWhiteSrc,
  colorSrc,
  alt,
  className,
  priority = false,
}: HeroPortraitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const tapTimerRef = useRef<number | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [portraitSize, setPortraitSize] = useState<PortraitSize>({
    width: 100,
    height: 100,
  });
  const maskId = `portrait-brush-${useId().replace(/:/g, "")}`;
  const textureId = `portrait-texture-${useId().replace(/:/g, "")}`;

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const pointerAngle = useMotionValue(-6);
  const reveal = useMotionValue(0);

  const leadX = useSpring(pointerX, { stiffness: 520, damping: 42, mass: 0.32 });
  const leadY = useSpring(pointerY, { stiffness: 520, damping: 42, mass: 0.32 });
  const middleX = useSpring(pointerX, { stiffness: 270, damping: 34, mass: 0.48 });
  const middleY = useSpring(pointerY, { stiffness: 270, damping: 34, mass: 0.48 });
  const tailX = useSpring(pointerX, { stiffness: 150, damping: 28, mass: 0.62 });
  const tailY = useSpring(pointerY, { stiffness: 150, damping: 28, mass: 0.62 });
  const smoothAngle = useSpring(pointerAngle, {
    stiffness: 260,
    damping: 34,
    mass: 0.46,
  });
  const smoothReveal = useSpring(reveal, {
    stiffness: 190,
    damping: 27,
    mass: 0.62,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const bounds = container.getBoundingClientRect();
      setPortraitSize({
        width: Math.max(container.clientWidth, bounds.width, 1),
        height: Math.max(container.clientHeight, bounds.height, 1),
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const updateBrush = (
      clientX: number,
      clientY: number,
      pointerType: string,
      touchTap = false,
    ) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return false;

      const inside =
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom;

      if (!inside) {
        if (pointerType !== "touch") {
          reveal.set(0);
          lastPointRef.current = null;
        }
        return false;
      }

      if (pointerType === "touch" && !touchTap) return false;

      const x = ((clientX - bounds.left) / bounds.width) * portraitSize.width;
      const y = ((clientY - bounds.top) / bounds.height) * portraitSize.height;
      const previous = lastPointRef.current;

      if (previous && !reduceMotion) {
        const dx = x - previous.x;
        const dy = y - previous.y;
        if (Math.abs(dx) + Math.abs(dy) > 1.5) {
          const direction = (Math.atan2(dy, dx) * 180) / Math.PI;
          const readableDirection = Math.max(-68, Math.min(68, direction));
          pointerAngle.set(readableDirection);
        }
      }

      pointerX.set(x);
      pointerY.set(y);
      lastPointRef.current = { x, y };
      reveal.set(1);
      return true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateBrush(event.clientX, event.clientY, event.pointerType);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      const touchedPortrait = updateBrush(
        event.clientX,
        event.clientY,
        event.pointerType,
        true,
      );
      if (!touchedPortrait) return;

      if (tapTimerRef.current !== null) {
        window.clearTimeout(tapTimerRef.current);
      }
      tapTimerRef.current = window.setTimeout(() => {
        reveal.set(0);
        lastPointRef.current = null;
        tapTimerRef.current = null;
      }, 1200);
    };

    const handleWindowLeave = () => {
      reveal.set(0);
      lastPointRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
      if (tapTimerRef.current !== null) {
        window.clearTimeout(tapTimerRef.current);
      }
    };
  }, [
    pointerAngle,
    pointerX,
    pointerY,
    portraitSize.height,
    portraitSize.width,
    reduceMotion,
    reveal,
  ]);

  const renderBrush = (
    x: typeof leadX,
    y: typeof leadY,
    opacity: number,
    scale: number,
  ) => (
    <motion.g
      style={{
        x,
        y,
        rotate: reduceMotion ? -6 : smoothAngle,
        scale,
        opacity,
      }}
    >
      <g filter={`url(#${textureId})`}>
        <path
          d="M-102 -3 C-88 -15 -69 -18 -47 -15 C-23 -20 2 -13 25 -15 C52 -17 79 -13 103 -2 C86 5 67 8 43 8 C18 14 -8 9 -34 13 C-59 16 -84 10 -102 -3 Z"
          fill="white"
        />
        <path
          d="M-94 12 C-66 7 -39 16 -12 11 C19 6 45 15 78 7 C87 6 94 8 100 11 C73 18 44 17 18 18 C-18 21 -56 22 -94 12 Z"
          fill="white"
          opacity=".72"
        />
      </g>

      <path d="M-91 -19 C-51 -12 -13 -17 24 -12 C52 -9 73 -12 94 -8" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity=".7" />
      <path d="M-97 19 C-64 14 -31 24 5 18 C39 13 69 20 91 14" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity=".62" />
      <path d="M-80 25 C-50 21 -27 28 -3 23 C26 19 49 25 72 20" fill="none" stroke="white" strokeWidth="1.15" strokeLinecap="round" opacity=".45" />

    </motion.g>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full touch-pan-y select-none drop-shadow-[0_24px_24px_rgba(0,0,0,.14)]",
        className,
      )}
    >
      <Image
        src={blackWhiteSrc}
        alt={alt}
        fill
        priority={priority}
        draggable={false}
        sizes="(max-width: 640px) 105vw, (max-width: 1024px) 88vw, 900px"
        className="pointer-events-none object-contain object-bottom"
      />

      <motion.svg
        viewBox={`0 0 ${portraitSize.width} ${portraitSize.height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full overflow-hidden"
        style={{ opacity: smoothReveal }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={textureId}
            x="-18%"
            y="-65%"
            width="136%"
            height="230%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.14"
              numOctaves="2"
              seed="19"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={portraitSize.width}
            height={portraitSize.height}
            style={{ maskType: "alpha" }}
          >
            {reduceMotion ? (
              renderBrush(pointerX as typeof leadX, pointerY as typeof leadY, 1, 0.8)
            ) : (
              <>
                {renderBrush(tailX, tailY, 0.18, BRUSH_TAIL_SCALE)}
                {renderBrush(middleX, middleY, 0.42, 0.71)}
                {renderBrush(leadX, leadY, 1, 0.8)}
              </>
            )}
          </mask>
        </defs>

        <image
          href={colorSrc}
          x="0"
          y="0"
          width={portraitSize.width}
          height={portraitSize.height}
          preserveAspectRatio="xMidYMax meet"
          mask={`url(#${maskId})`}
        />
      </motion.svg>
    </div>
  );
}
