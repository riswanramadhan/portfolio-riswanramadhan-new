import type { Metadata } from "next";

import { pageContent } from "@/lib/portfolio-data";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { RouteTitle } from "@/components/navigation/RouteTitle";
import { AnimatedNumberLine } from "@/components/ui/AnimatedNumberLine";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Experience | Riswan Ramadhan",
  description: pageContent.experience.metadataDescription,
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      <SubpageHeader />
      <section className="mx-auto grid min-h-[66svh] w-full max-w-[1360px] items-end gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:px-16 lg:pb-24 lg:pt-24">
        <Reveal direction="left">
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/38">
              {pageContent.experience.eyebrow}
            </p>
            <RouteTitle
              label="Experience"
              className="text-[clamp(3.6rem,7vw,6.3rem)]"
            />
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.08} className="lg:justify-self-end">
          <p className="max-w-[470px] text-[clamp(1.35rem,2.7vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.04em] text-black/78">
            {pageContent.experience.lead}
          </p>
        </Reveal>
      </section>

      <ExperienceSection />

      <section className="mx-auto w-full max-w-[1230px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal direction="left">
          <p className="mb-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/38">
            {pageContent.experience.principlesHeading}
          </p>
        </Reveal>
        <div className="grid gap-0 lg:grid-cols-3">
          {pageContent.experience.principles.map(([title, description], index) => (
            <Reveal
              key={title}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.06}
            >
              <AnimatedNumberLine
                number={`0${index + 1}`}
                index={index}
                total={pageContent.experience.principles.length}
                isLast={index === pageContent.experience.principles.length - 1}
              >
                <div className={index < pageContent.experience.principles.length - 1 ? "lg:pr-9" : undefined}>
                  <h2 className="text-[24px] font-semibold tracking-[-0.045em]">
                    {title}
                  </h2>
                  <p className="mt-4 text-[13px] leading-[1.65] text-black/48">
                    {description}
                  </p>
                </div>
              </AnimatedNumberLine>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
