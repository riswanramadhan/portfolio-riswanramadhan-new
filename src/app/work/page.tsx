import type { Metadata } from "next";

import { projects } from "@/lib/portfolio-data";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RouteTitle } from "@/components/navigation/RouteTitle";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Selected Work — Riswan Ramadhan",
  description: "A selection of digital products, websites, and product design work by Riswan Ramadhan.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <SubpageHeader />
      <section className="mx-auto w-full max-w-[1360px] px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-16 lg:pb-32 lg:pt-24">
        <div className="mb-16 flex flex-col gap-7 border-b border-black/9 pb-10 md:flex-row md:items-end md:justify-between lg:mb-20">
          <Reveal direction="left">
            <RouteTitle
              label="Work"
              className="text-[clamp(3.8rem,10vw,9rem)]"
            />
          </Reveal>
          <Reveal direction="right" delay={0.08}>
            <p className="max-w-[390px] text-[14px] leading-[1.65] text-black/52 md:text-right">
              Digital products built through clear thinking, useful systems, and a careful eye for how people actually use them.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index < 2}
              animationIndex={index}
            />
          ))}
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
