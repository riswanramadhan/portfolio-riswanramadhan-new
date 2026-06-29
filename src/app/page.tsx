import { SiteShell } from "@/components/layout/SiteShell";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExpertiseStatementSection } from "@/components/sections/ExpertiseStatementSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { ServiceSection } from "@/components/sections/ServiceSection";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <ExpertiseStatementSection />
      <SelectedWorkSection />
      <ServiceSection compact />
      <ExperienceSection compact />
      <ContactSection compact />
    </SiteShell>
  );
}
