import { certifications } from "@/content";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Award } from "lucide-react";

export function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 bg-muted/40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Certifications
          </h2>
          <p className="text-muted-foreground">
            Credentials and completed training programs.
          </p>
        </div>

        {/* Grid — add entries to content/certifications.ts and they appear here automatically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2">
                <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground font-medium tabular-nums">
                  {cert.date}
                </span>
              </div>

              <div>
                <p className="font-heading font-semibold text-sm text-foreground leading-snug mb-1">
                  {cert.title}
                </p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {cert.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer mt-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View credential
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
