import type { Metadata } from "next";

import { pageContent, services } from "@/lib/portfolio-data";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { RouteTitle } from "@/components/navigation/RouteTitle";
import { AnimatedNumberLine } from "@/components/ui/AnimatedNumberLine";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services | Riswan Ramadhan",
  description: pageContent.service.metadataDescription,
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[var(--surface-warm)] text-[#1d1d1f]">
      <SubpageHeader />

      <section className="mx-auto grid min-h-[62svh] w-full max-w-[1360px] items-end gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:px-16 lg:pb-24 lg:pt-24">
        <Reveal direction="left">
          <RouteTitle
            label="Service"
            className="text-[clamp(4.2rem,12vw,11rem)] leading-[0.8]"
          />
        </Reveal>
        <Reveal direction="right" delay={0.08} className="lg:justify-self-end">
          <div className="max-w-[480px]">
            <p className="text-[clamp(1.35rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.04em]">
              {pageContent.service.lead}
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-black/50">
              {pageContent.service.supporting}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-black/8 bg-white px-5 py-20 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1230px] gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.055}
              className="h-full"
            >
              <article className="h-full rounded-[24px] border border-black/7 bg-[#f7f7f8] px-6 py-8 sm:p-9">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-black/35">
                  [{service.number}]
                </span>
                <h2 className="mt-7 text-[clamp(1.8rem,4vw,3.1rem)] font-semibold leading-[0.94] tracking-[-0.055em] sm:mt-8">
                  {service.title}
                </h2>
                <p className="mt-6 max-w-[520px] text-[13px] leading-[1.7] text-black/52 sm:mt-5 sm:text-sm sm:leading-[1.65]">
                  {service.shortDescription}
                </p>
                <p className="mt-5 max-w-[560px] text-[13px] leading-[1.75] text-black/62 sm:mt-4 sm:text-sm sm:leading-[1.7]">
                  {service.fullDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {service.keywords.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full border border-black/8 bg-white px-3 py-1.5 text-[11px] font-medium text-black/58 ${
                        service.featuredKeywords.includes(item) ? "" : "hidden sm:inline-flex"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceSection />

      <section className="bg-[#1c1c1e] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto w-full max-w-[1230px]">
          <Reveal direction="left">
            <p className="mb-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
              {pageContent.service.processHeading}
            </p>
          </Reveal>
          <div className="grid gap-0 lg:grid-cols-4">
            {pageContent.service.process.map(([number, title, description], index) => (
              <Reveal
                key={title}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.055}
              >
                <AnimatedNumberLine
                  number={number}
                  index={index}
                  total={pageContent.service.process.length}
                  theme="dark"
                  isLast={index === pageContent.service.process.length - 1}
                >
                  <div className={index < pageContent.service.process.length - 1 ? "lg:pr-8" : undefined}>
                    <h2 className="text-[24px] font-semibold tracking-[-0.04em]">
                      {title}
                    </h2>
                    <p className="mt-4 text-[13px] leading-[1.65] text-white/48">
                      {description}
                    </p>
                  </div>
                </AnimatedNumberLine>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
