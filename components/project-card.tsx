import type { ExperienceItem } from "@/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GithubIcon } from "@/components/icons";
import { ExternalLink, MapPin, Sparkles } from "lucide-react";

type ProjectCardProps = {
  item: ExperienceItem;
  aiSummary?: string;
};

const kindLabels: Record<ExperienceItem["kind"], string> = {
  project: "Project",
  internship: "Internship",
  work: "Work",
};

export function ProjectCard({ item, aiSummary }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {kindLabels[item.kind]}
          </Badge>
          <span className="shrink-0 text-xs text-muted-foreground font-medium tabular-nums">
            {item.dateRange}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading font-semibold text-lg leading-snug text-foreground">
              {item.title}
            </h3>
            {item.organization && (
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {item.organization}
              </p>
            )}
          </div>
        </div>
        {item.location && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {item.location}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        <ul className="space-y-1.5 text-xs text-muted-foreground/85">
          {item.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-2 leading-relaxed">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {aiSummary && (
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent/80">
                AI TL;DR
              </span>
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed italic">
              {aiSummary}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        {(item.repoUrl || item.liveUrl) && (
          <div className="flex items-center gap-3 pt-1">
            {item.repoUrl && (
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} GitHub repository`}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Repo
              </a>
            )}
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} live site`}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
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
