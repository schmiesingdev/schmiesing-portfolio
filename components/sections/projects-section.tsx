import { experienceItems } from "@/content";
import { generateExperienceSummary } from "@/lib/ai/generate-summary";
import { ProjectSearchContainer } from "@/components/sections/project-search-container";

export type EnrichedExperienceItem = (typeof experienceItems)[number] & {
  aiSummary: string;
};

export async function ProjectsSection() {
  const summaries = await Promise.all(
    experienceItems.map((item) =>
      generateExperienceSummary(item.id, item.longDescription).catch(() => "")
    )
  );

  const enriched: EnrichedExperienceItem[] = experienceItems.map((item, i) => ({
    ...item,
    aiSummary: summaries[i],
  }));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Projects &amp; Experience
          </h2>
          <p className="text-muted-foreground max-w-lg">
            A searchable view of projects, internships, and work positions
            drawn from my resume-backed experience.
          </p>
        </div>

        <ProjectSearchContainer items={enriched} />
      </div>
    </section>
  );
}
