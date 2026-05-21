import { projects } from "@/content";
import { generateProjectSummary } from "@/lib/ai/generate-summary";
import { ProjectSearchContainer } from "@/components/sections/project-search-container";

export type EnrichedProject = (typeof projects)[number] & {
  aiSummary: string;
};

export async function ProjectsSection() {
  const summaries = await Promise.all(
    projects.map((p) =>
      generateProjectSummary(p.id, p.longDescription).catch(() => "")
    )
  );

  const enriched: EnrichedProject[] = projects.map((p, i) => ({
    ...p,
    aiSummary: summaries[i],
  }));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-lg">
            A selection of things I&apos;ve built — from AI-integrated platforms
            to systems engineering.
          </p>
        </div>

        <ProjectSearchContainer projects={enriched} />
      </div>
    </section>
  );
}
