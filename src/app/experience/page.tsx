import type { Metadata } from "next";

import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { RouteTitle } from "@/components/navigation/RouteTitle";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Experience — Riswan Ramadhan",
  description: "Experience building digital products for local businesses, communities, and learning platforms.",
};

const principles = [
  ["Products over decoration", "Every interface decision should make the product easier to understand and use."],
  ["Systems that can grow", "Reusable foundations keep future features coherent instead of creating visual debt."],
  ["Close to real users", "The best direction appears when design stays connected to actual context and feedback."],
] as const;

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      <SubpageHeader />
      <section className="mx-auto grid min-h-[66svh] w-full max-w-[1360px] items-end gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:px-16 lg:pb-24 lg:pt-24">
        <Reveal direction="left">
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/38">
              Building since 2024
            </p>
            <RouteTitle
              label="Experience"
              className="text-[clamp(3.8rem,10vw,9rem)]"
            />
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.08} className="lg:justify-self-end">
          <p className="max-w-[470px] text-[clamp(1.35rem,2.7vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.04em] text-black/78">
            Learning through products that serve businesses, teams, and communities in the real world.
          </p>
        </Reveal>
      </section>

      <ExperienceSection />

      <section className="mx-auto w-full max-w-[1230px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal direction="left">
          <p className="mb-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/38">
            Principles carried forward
          </p>
        </Reveal>
        <div className="grid gap-9 md:grid-cols-3">
          {principles.map(([title, description], index) => (
            <Reveal
              key={title}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.06}
            >
              <article className="border-t border-black/10 pt-5">
                <span className="text-[10px] text-black/30">[0{index + 1}]</span>
                <h2 className="mt-8 text-[24px] font-semibold tracking-[-0.045em]">
                  {title}
                </h2>
                <p className="mt-4 text-[13px] leading-[1.65] text-black/48">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
