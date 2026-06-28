"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type MotionValue,
} from "motion/react";

interface FloatingCursorPreviewProps {
  image?: string;
  alt?: string;
  visible: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  reduceMotion?: boolean;
  dark?: boolean;
}

const subscribeToClient = () => () => undefined;

export function FloatingCursorPreview({
  image,
  alt = "Project preview",
  visible,
  x,
  y,
  rotate,
  reduceMotion = false,
  dark = false,
}: FloatingCursorPreviewProps) {
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {visible && image ? (
        <motion.figure
          key={image}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            x,
            y,
            rotate: reduceMotion ? 0 : rotate,
          }}
          className="pointer-events-none fixed left-0 top-0 z-[100] aspect-[16/10] w-[min(300px,calc(100vw-28px))] overflow-hidden rounded-[18px] border border-white/25 bg-[#d7d7d7] shadow-[0_28px_80px_rgba(0,0,0,.28)]"
          aria-hidden="true"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="300px"
            className="object-cover"
          />
          <span
            className={dark ? "absolute inset-0 ring-1 ring-inset ring-white/12" : "absolute inset-0 ring-1 ring-inset ring-black/6"}
          />
        </motion.figure>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
