"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { profile } from "@/lib/portfolio-data";

interface CvPreviewModalProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const focusableSelector = [
  "button:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const subscribeToClient = () => () => undefined;

export function CvPreviewModal({
  open,
  onClose,
  triggerRef,
}: CvPreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const triggerElement = triggerRef.current;
    const previous = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      reduceMotion ? 0 : 180,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.overflow = previous.bodyOverflow;
      window.scrollTo(0, scrollY);

      window.setTimeout(() => {
        if (triggerElement) {
          triggerElement.focus();
        } else {
          previouslyFocused?.focus();
        }
      }, 0);
    };
  }, [onClose, open, reduceMotion, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[220] flex items-end justify-center bg-black/42 p-0 backdrop-blur-md sm:items-center sm:p-5 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-description"
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f2f2f7] text-[#1d1d1f] shadow-[0_35px_100px_rgba(0,0,0,.35)] outline-none sm:h-[min(92dvh,900px)] sm:max-w-[1040px] sm:rounded-[30px] sm:border sm:border-white/55"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.965 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.46,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <header className="relative z-20 flex shrink-0 items-start gap-3 border-b border-black/8 bg-white/72 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-2xl sm:items-center sm:px-6 sm:py-4">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-[#1c1c1e] text-white shadow-[0_10px_26px_rgba(0,0,0,.2)] sm:mt-0">
                <FileText className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <h2
                    id="cv-modal-title"
                    className="text-[17px] font-semibold tracking-[-0.025em] sm:text-[19px]"
                  >
                    Curriculum Vitae
                  </h2>
                  <span className="text-[11px] font-medium text-black/42">
                    2-page PDF · 141 KB
                  </span>
                </div>
                <p
                  id="cv-modal-description"
                  className="mt-0.5 line-clamp-2 text-[11px] leading-[1.35] text-black/48 sm:text-[12px]"
                >
                  {profile.name} — {profile.professionalTitle}. Scroll to preview both pages.
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close curriculum vitae preview"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/7 bg-black/5 text-black/58 transition-all duration-300 hover:rotate-90 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <X className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[radial-gradient(circle_at_top,rgba(255,255,255,.96),transparent_45%),#e8e8ed] px-3 py-4 [scrollbar-gutter:stable] sm:px-6 sm:py-6 lg:px-8">
              <div className="mx-auto flex w-full max-w-[820px] flex-col gap-4 sm:gap-6">
                {profile.cv.previewPages.map((page, index) => (
                  <figure
                    key={page}
                    className="overflow-hidden rounded-[10px] border border-black/7 bg-white shadow-[0_18px_50px_rgba(0,0,0,.13)] sm:rounded-[15px]"
                  >
                    <Image
                      src={page}
                      alt={`Curriculum Vitae page ${index + 1} of ${profile.cv.previewPages.length}`}
                      width={1440}
                      height={2037}
                      sizes="(max-width: 640px) 94vw, 820px"
                      className="h-auto w-full"
                      priority={index === 0}
                      unoptimized
                    />
                    <figcaption className="sr-only">
                      Page {index + 1} of {profile.cv.previewPages.length}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <footer className="relative z-20 grid shrink-0 grid-cols-2 gap-2.5 border-t border-black/8 bg-white/78 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-2xl sm:flex sm:justify-end sm:px-6 sm:py-4">
              <a
                href={profile.cv.driveHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/9 bg-white px-4 text-[12px] font-medium text-black shadow-[0_8px_22px_rgba(0,0,0,.07)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:min-w-[150px] sm:text-[13px]"
              >
                View in Drive
                <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                href={profile.cv.pdfHref}
                download={profile.cv.downloadName}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1c1c1e] px-4 text-[12px] font-medium text-white shadow-[0_12px_28px_rgba(0,0,0,.22)] transition-all duration-400 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_16px_34px_rgba(0,0,0,.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:min-w-[150px] sm:text-[13px]"
              >
                Download PDF
                <Download className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
