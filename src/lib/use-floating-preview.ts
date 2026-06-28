"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useMotionValue, useSpring } from "motion/react";

const PREVIEW_WIDTH = 300;
const PREVIEW_RATIO = 10 / 16;
const VIEWPORT_MARGIN = 14;
const CURSOR_GAP = 28;
const positionSpring = { stiffness: 250, damping: 30, mass: 0.55 };
const rotationSpring = { stiffness: 180, damping: 20, mass: 0.45 };
const DESKTOP_PREVIEW_QUERY =
  "(min-width: 1024px) and (any-hover: hover) and (any-pointer: fine)";

function subscribeToDesktopPreview(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_PREVIEW_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopPreviewSnapshot() {
  return window.matchMedia(DESKTOP_PREVIEW_QUERY).matches;
}

export function useDesktopFloatingPreview() {
  return useSyncExternalStore(
    subscribeToDesktopPreview,
    getDesktopPreviewSnapshot,
    () => false,
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function getPreviewSize() {
  const width = Math.min(PREVIEW_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  return { width, height: width * PREVIEW_RATIO };
}

function getPointerPosition(clientX: number, clientY: number) {
  const { width, height } = getPreviewSize();
  const opensLeft =
    clientX + CURSOR_GAP + width > window.innerWidth - VIEWPORT_MARGIN;
  const targetX = opensLeft
    ? clientX - width - CURSOR_GAP
    : clientX + CURSOR_GAP;

  return {
    x: clamp(
      targetX,
      VIEWPORT_MARGIN,
      window.innerWidth - width - VIEWPORT_MARGIN,
    ),
    y: clamp(
      clientY - height / 2,
      VIEWPORT_MARGIN,
      window.innerHeight - height - VIEWPORT_MARGIN,
    ),
  };
}

export function useFloatingPreviewMotion(reduceMotion: boolean) {
  const targetX = useMotionValue(VIEWPORT_MARGIN);
  const targetY = useMotionValue(VIEWPORT_MARGIN);
  const targetRotate = useMotionValue(0);
  const x = useSpring(targetX, positionSpring);
  const y = useSpring(targetY, positionSpring);
  const rotate = useSpring(targetRotate, rotationSpring);
  const positioned = useRef(false);
  const lastPointerX = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const settleRotation = useCallback(() => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => targetRotate.set(0), 90);
  }, [targetRotate]);

  const setPosition = useCallback(
    (nextX: number, nextY: number, snap = false) => {
      if (snap || !positioned.current) {
        targetX.jump(nextX);
        targetY.jump(nextY);
        x.jump(nextX);
        y.jump(nextY);
      } else {
        targetX.set(nextX);
        targetY.set(nextY);
      }
      positioned.current = true;
    },
    [targetX, targetY, x, y],
  );

  const snapToPointer = useCallback(
    (clientX: number, clientY: number) => {
      const next = getPointerPosition(clientX, clientY);
      setPosition(next.x, next.y, true);
      targetRotate.jump(0);
      rotate.jump(0);
      lastPointerX.current = clientX;
    },
    [rotate, setPosition, targetRotate],
  );

  const moveToPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (reduceMotion && positioned.current) return;

      const next = getPointerPosition(clientX, clientY);
      setPosition(next.x, next.y);

      if (!reduceMotion && lastPointerX.current !== null) {
        targetRotate.set(
          clamp((clientX - lastPointerX.current) * 0.16, -7, 7),
        );
        settleRotation();
      }
      lastPointerX.current = clientX;
    },
    [reduceMotion, setPosition, settleRotation, targetRotate],
  );

  const moveToElement = useCallback(
    (rect: DOMRect) => {
      const { width, height } = getPreviewSize();
      const centeredX = rect.left + rect.width / 2 - width / 2;
      const hasRoomAbove = rect.top - height - 16 >= VIEWPORT_MARGIN;
      const nextY = hasRoomAbove ? rect.top - height - 16 : rect.bottom + 16;

      setPosition(
        clamp(
          centeredX,
          VIEWPORT_MARGIN,
          window.innerWidth - width - VIEWPORT_MARGIN,
        ),
        clamp(
          nextY,
          VIEWPORT_MARGIN,
          window.innerHeight - height - VIEWPORT_MARGIN,
        ),
        true,
      );
      targetRotate.jump(0);
      rotate.jump(0);
      lastPointerX.current = null;
    },
    [rotate, setPosition, targetRotate],
  );

  const resetDirection = useCallback(() => {
    positioned.current = false;
    lastPointerX.current = null;
    targetRotate.jump(0);
    rotate.jump(0);
  }, [rotate, targetRotate]);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

  return {
    x,
    y,
    rotate,
    moveToPointer,
    snapToPointer,
    moveToElement,
    resetDirection,
  };
}
