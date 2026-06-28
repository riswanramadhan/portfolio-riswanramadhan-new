import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/lib/portfolio-data";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ProjectCaseSection } from "@/components/project/ProjectCaseSection";
import { ProjectDetailHero } from "@/components/project/ProjectDetailHero";
import { ProjectPreviewFrame } from "@/components/project/ProjectPreviewFrame";
import { ContactSection } from "@/components/sections/ContactSection";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Riswan Ramadhan`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_8%,rgba(255,255,255,.98),transparent_32%),linear-gradient(135deg,#f6f6f4_0%,#eeeeec_100%)] text-[#171717]">
      <SubpageHeader backHref="/work" backLabel="All Work" />
      <ProjectDetailHero project={project} />
      <ProjectPreviewFrame project={project} />
      <div className="mx-auto mt-20 w-full max-w-[1100px] px-5 pb-20 sm:px-8 lg:mt-28 lg:pb-28">
        <ProjectCaseSection index="01" label="Overview">
          {project.caseStudy.overview}
        </ProjectCaseSection>
        <ProjectCaseSection index="02" label="Challenge">
          {project.caseStudy.challenge}
        </ProjectCaseSection>
        <ProjectCaseSection index="03" label="Solution">
          {project.caseStudy.solution}
        </ProjectCaseSection>
        <ProjectCaseSection index="04" label="Result">
          {project.caseStudy.result}
        </ProjectCaseSection>
      </div>
      <ContactSection />
    </main>
  );
}
