"use client";

import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  fadeScale,
  revealLeft,
  revealRight,
  stagger,
} from "@/lib/animations";
import { navItems, profile, socialLinks } from "@/lib/portfolio-data";
import { PillButton } from "@/components/ui/PillButton";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SocialPill } from "@/components/ui/SocialPill";
import { StatusPill } from "@/components/ui/StatusPill";
import { HoverColorRevealImage } from "@/components/ui/HoverColorRevealImage";
import { CvPreviewModal } from "@/components/ui/CvPreviewModal";
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [cvOpen, setCvOpen] = useState(false);
  const cvTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <motion.section
        id="home"
        aria-labelledby="hero-title"
        variants={fadeScale}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 h-[100svh] min-h-0 scroll-mt-0 overflow-visible"
      >
        <SectionFrame className="h-full overflow-visible">
        <div className="hero-ambient" aria-hidden="true">
          <span className="hero-ambient__orb hero-ambient__orb--one" />
          <span className="hero-ambient__orb hero-ambient__orb--two" />
          <span className="hero-ambient__orb hero-ambient__orb--three" />
        </div>
        <motion.div
          variants={stagger}
          className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-visible px-5 py-5 sm:px-8 sm:py-7 lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:px-12 lg:pb-0 lg:pt-8"
        >
          <motion.header
            variants={revealLeft}
            className="relative z-30 flex items-center justify-between gap-3"
          >
            <StatusPill label={profile.availability} />

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  transitionLabel={item.label}
                  className="group relative py-2 text-[12px] font-medium text-[#4d4d4d] transition-colors duration-500 ease-[var(--ease-apple)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  {item.label}
                  {item.count ? (
                    <sup className="ml-1 text-[8px] text-[#929292]">
                      [{item.count}]
                    </sup>
                  ) : null}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-black transition-transform duration-500 ease-[var(--ease-apple)] group-hover:scale-x-100" />
                </TransitionLink>
              ))}
            </nav>

          </motion.header>

          <motion.h1
            id="hero-title"
            variants={revealLeft}
            aria-label={profile.name}
            className="relative left-[-3vw] z-[2] mt-[clamp(2rem,6svh,5rem)] flex w-full justify-self-center flex-col items-center justify-center px-1 text-center text-[clamp(2.25rem,11.4vw,6.2rem)] font-bold uppercase leading-[0.82] tracking-[-0.085em] sm:left-0 sm:text-[clamp(4.5rem,12vw,7.5rem)] lg:flex-row lg:gap-[0.09em] lg:text-[clamp(6rem,8.25vw,7.9rem)]"
          >
            <span className="w-full text-center text-[#111111] lg:w-auto" aria-hidden="true">
              {profile.firstName}
            </span>
            <span className="outline-text w-full text-center lg:w-auto" aria-hidden="true">
              {profile.lastName}
            </span>
          </motion.h1>

          <motion.div
            variants={revealRight}
            className="relative left-[-4vw] z-10 mx-auto h-full min-h-0 w-[min(100vw,680px)] origin-bottom translate-y-[4%] scale-[1.10] justify-self-center will-change-transform sm:left-0 sm:w-[min(82vw,760px)] sm:translate-y-[7%] sm:scale-[1.14] lg:w-[min(56vw,820px)] lg:translate-y-[10%] lg:scale-[1.18]"
          >
            <HoverColorRevealImage
              src={profile.heroAvatarColor}
              blackWhiteSrc={profile.heroAvatarBlackWhite}
              alt={profile.heroAvatarAlt}
              priority
              sizes="(max-width: 640px) 105vw, (max-width: 1024px) 88vw, 900px"
              className="h-full w-full drop-shadow-[0_24px_24px_rgba(0,0,0,.14)]"
              imageClassName="object-contain object-bottom"
            />
          </motion.div>

          <motion.footer
            variants={stagger}
            className="relative z-20 flex flex-col items-start gap-4 pb-0 pt-3 lg:absolute lg:bottom-8 lg:left-12 lg:right-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-0 lg:pt-0"
          >
            <motion.div
              variants={revealLeft}
              className="max-w-[300px] lg:max-w-[410px]"
            >
              <p className="mb-2 text-[clamp(1.1rem,4.7vw,1.45rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#171717] lg:mb-3 lg:text-[clamp(1.25rem,2.2vw,1.65rem)]">
                {profile.role}
              </p>
              <p className="mb-4 max-w-[290px] text-[12px] leading-[1.5] text-[#666] sm:text-[13px] lg:mb-5 lg:text-sm lg:leading-[1.6]">
                {profile.description}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <PillButton href={profile.emailHref}>{profile.primaryCta}</PillButton>
                <button
                  ref={cvTriggerRef}
                  type="button"
                  onClick={() => setCvOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={cvOpen}
                  className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-black/9 bg-white/76 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-[#1d1d1f] shadow-[0_10px_28px_rgba(0,0,0,.09)] backdrop-blur-xl transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:border-black/14 hover:bg-white hover:shadow-[0_15px_34px_rgba(0,0,0,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:text-[13px]"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#1c1c1e] text-white shadow-[0_7px_18px_rgba(0,0,0,.2)] transition-transform duration-500 ease-[var(--ease-apple)] group-hover:rotate-[-5deg] group-hover:scale-105">
                    <FileText className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  {profile.cv.label}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              className="hero-social-cycle flex w-full flex-wrap gap-2 lg:w-auto lg:flex-col lg:items-stretch lg:gap-3"
            >
              {socialLinks.map((link) => (
                <motion.div key={link.label} variants={revealRight}>
                  <SocialPill
                    link={link}
                    compact
                    iconOnlyOnMobile
                    className="lg:min-w-[138px]"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.footer>
        </motion.div>
        </SectionFrame>
      </motion.section>

      <CvPreviewModal
        open={cvOpen}
        onClose={() => setCvOpen(false)}
        triggerRef={cvTriggerRef}
      />
    </>
  );
}
