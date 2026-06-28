"use client";

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
import { HeroPortraitReveal } from "@/components/ui/HeroPortraitReveal";
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="home"
      aria-labelledby="hero-title"
      variants={fadeScale}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      className="h-[100svh] min-h-0 scroll-mt-0"
    >
      <SectionFrame className="h-full">
        <motion.div
          variants={stagger}
          className="relative mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-hidden px-5 py-5 sm:px-8 sm:py-7 lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:px-12 lg:pb-0 lg:pt-8"
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
            className="relative z-[2] mt-[clamp(2rem,6svh,5rem)] flex flex-col items-center justify-center px-1 text-center text-[clamp(2.4rem,12.5vw,6.2rem)] font-bold uppercase leading-[0.82] tracking-[-0.085em] sm:text-[clamp(4.5rem,12vw,7.5rem)] lg:flex-row lg:gap-[0.09em] lg:text-[clamp(6rem,8.25vw,7.9rem)]"
          >
            <span className="text-[#111111]" aria-hidden="true">
              {profile.firstName}
            </span>
            <span className="outline-text" aria-hidden="true">
              {profile.lastName}
            </span>
          </motion.h1>

          <motion.div
            variants={revealRight}
            className="relative z-10 mx-auto h-full min-h-0 w-[min(92vw,650px)] sm:w-[min(78vw,700px)] lg:w-[min(52vw,760px)]"
          >
            <HeroPortraitReveal
              blackWhiteSrc={profile.heroAvatarBlackWhite}
              colorSrc={profile.heroAvatarColor}
              alt={profile.heroAvatarAlt}
              priority
            />
          </motion.div>

          <motion.footer
            variants={stagger}
            className="relative z-20 flex flex-col items-start gap-4 pb-0 pt-3 lg:absolute lg:bottom-8 lg:left-12 lg:right-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-0 lg:pt-0"
          >
            <motion.div variants={revealLeft} className="max-w-[300px]">
              <p className="mb-2 text-[clamp(1.1rem,4.7vw,1.45rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#171717] lg:mb-3 lg:text-[clamp(1.25rem,2.2vw,1.65rem)]">
                {profile.role}
              </p>
              <p className="mb-4 max-w-[290px] text-[12px] leading-[1.5] text-[#666] sm:text-[13px] lg:mb-5 lg:text-sm lg:leading-[1.6]">
                {profile.description}
              </p>
              <PillButton href={profile.emailHref}>{profile.primaryCta}</PillButton>
            </motion.div>

            <motion.div
              variants={stagger}
              className="flex w-full flex-wrap gap-2 lg:w-auto lg:flex-col lg:items-stretch lg:gap-3"
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
  );
}
