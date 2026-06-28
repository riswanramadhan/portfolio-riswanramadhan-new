import { SiteShell } from "@/components/layout/SiteShell";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { ServiceSection } from "@/components/sections/ServiceSection";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <SelectedWorkSection />
      <ServiceSection />
      <ExperienceSection />
      <ContactSection />
    </SiteShell>
  );
}
