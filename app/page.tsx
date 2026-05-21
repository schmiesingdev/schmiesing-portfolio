import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ChatWidget } from "@/components/chat/chat-widget";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <Suspense>
          <ProjectsSection />
        </Suspense>
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  );
}
