import type { Project } from "@/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GithubIcon } from "@/components/icons";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full border-border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading font-semibold text-lg leading-snug text-foreground">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-muted-foreground font-medium tabular-nums pt-0.5">
            {project.year}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        {(project.repoUrl || project.liveUrl) && (
          <div className="flex items-center gap-3 pt-1">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Repo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
