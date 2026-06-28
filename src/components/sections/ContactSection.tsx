"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  fadeScale,
  revealLeft,
  revealRight,
  stagger,
} from "@/lib/animations";
import {
  contactLinks,
  profile,
  sectionContent,
} from "@/lib/portfolio-data";
import { PillButton } from "@/components/ui/PillButton";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SocialPill } from "@/components/ui/SocialPill";
import { StatusPill } from "@/components/ui/StatusPill";

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-heading"
      variants={fadeScale}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-0"
    >
      <SectionFrame
        variant="light"
        className="min-h-[620px] px-5 py-14 sm:px-8 md:px-14 md:py-18"
      >
        <motion.div
          variants={stagger}
          className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-[1280px] flex-col items-center justify-between text-center md:min-h-[500px]"
        >
          <motion.div variants={revealLeft}>
            <StatusPill label={profile.availability} />
          </motion.div>

          <div className="my-12 flex flex-col items-center sm:my-10">
            <motion.h2
              id="contact-heading"
              variants={revealLeft}
              className="max-w-[880px] text-[clamp(2.8rem,7.5vw,6.1rem)] font-bold uppercase leading-[0.86] tracking-[-0.07em] text-[#181818]"
            >
              {sectionContent.contact.heading}
            </motion.h2>
            <motion.p
              variants={revealRight}
              className="mt-7 max-w-[650px] text-sm leading-[1.7] text-[#5f5f5f] sm:text-base"
            >
              {sectionContent.contact.description}
            </motion.p>
            <motion.div variants={revealLeft} className="mt-8">
              <PillButton
                href={profile.emailHref}
                ariaLabel={`${profile.contactCta} by email`}
                className="px-6"
              >
                {profile.contactCta}
              </PillButton>
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            {contactLinks.map((link, index) => (
              <motion.div
                key={link.label}
                variants={index % 2 === 0 ? revealLeft : revealRight}
              >
                <SocialPill
                  link={link}
                  compact
                  profile={link.icon === "User"}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionFrame>
    </motion.section>
  );
}
