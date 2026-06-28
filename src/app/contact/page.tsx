import type { Metadata } from "next";

import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { RouteTitle } from "@/components/navigation/RouteTitle";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact — Riswan Ramadhan",
  description: "Start a conversation about a digital product, website, or design collaboration.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--surface-warm)]">
      <SubpageHeader />
      <section className="mx-auto w-full max-w-[1360px] px-5 pb-8 pt-14 sm:px-8 sm:pt-20 lg:px-16 lg:pt-24">
        <Reveal direction="left">
          <RouteTitle
            label="Contact"
            className="text-[clamp(3.8rem,10vw,9rem)]"
          />
        </Reveal>
      </section>
      <ContactSection />
    </main>
  );
}
