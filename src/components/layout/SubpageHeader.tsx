import { ArrowLeft } from "lucide-react";

import { profile } from "@/lib/portfolio-data";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { StatusPill } from "@/components/ui/StatusPill";
import { Reveal } from "@/components/ui/Reveal";

interface SubpageHeaderProps {
  backHref?: string;
  backLabel?: string;
  destinationLabel?: string;
}

export function SubpageHeader({
  backHref = "/",
  backLabel = "Back",
  destinationLabel = backHref === "/work" ? "Work" : "Home",
}: SubpageHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-3 px-5 pb-4 pr-24 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pr-28 sm:pt-8 lg:px-16 lg:pr-28">
      <Reveal direction="left">
        <TransitionLink
          href={backHref}
          transitionLabel={destinationLabel}
          className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-black/6 bg-white px-4 text-[13px] font-medium text-[#1d1d1f] shadow-[0_10px_30px_rgba(0,0,0,.08)] transition-all duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <ArrowLeft
            className="icon-motion-left size-4 transition-transform duration-500 ease-[var(--ease-apple)]"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          {backLabel}
        </TransitionLink>
      </Reveal>
      <Reveal direction="right" delay={0.08}>
        <StatusPill label={profile.availability} />
      </Reveal>
    </header>
  );
}
