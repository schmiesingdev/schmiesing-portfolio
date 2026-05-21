import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSkeleton } from "@/components/sections/projects-skeleton";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <ChatWidgetLoader />
    </>
  );
}
