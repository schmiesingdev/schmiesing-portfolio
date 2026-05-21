import { projects } from "@/content";
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-lg">
            A selection of things I&apos;ve built — from AI-integrated platforms to
            systems engineering.
          </p>
        </div>

        {/* Grid — automatically accommodates any number of projects from content/projects.ts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
