import { skillCategories } from "@/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const proficiencyStyles = {
  expert: "bg-foreground text-background hover:bg-foreground/90",
  proficient: "bg-secondary text-secondary-foreground",
  familiar: "bg-muted text-muted-foreground",
} as const;

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Skills
          </h2>
          <p className="text-muted-foreground">
            Tools and technologies I work with regularly.
          </p>
        </div>

        {/* Grid — add new categories to content/skills.ts and they appear here automatically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    className={cn(
                      "text-xs font-medium cursor-default transition-colors duration-200",
                      proficiencyStyles[skill.proficiency]
                    )}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 mr-4">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            Expert
          </span>
          <span className="inline-flex items-center gap-1.5 mr-4">
            <span className="inline-block h-2 w-2 rounded-full bg-secondary-foreground/30" />
            Proficient
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/40" />
            Familiar
          </span>
        </p>
      </div>
    </section>
  );
}
