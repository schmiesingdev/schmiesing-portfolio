import { bio, resumes } from "@/content";
import seniorPhoto from "@/content/SeniorPhoto.jpeg";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-muted/40">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              About
            </h2>
            <div className="mx-auto mb-6 max-w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:max-w-80">
              <Image
                src={seniorPhoto}
                alt="Professional portrait of Matthew Schmiesing"
                className="aspect-square w-full object-cover"
                sizes="(min-width: 640px) 320px, 288px"
                priority
                placeholder="blur"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {bio.longBio}
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{bio.location}</span>
              </div>
              {bio.availableForWork && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <span>Open to new opportunities</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Focus Areas
              </h3>
              <ul className="space-y-2">
                {[
                  "AI-integrated full-stack development",
                  "Agentic workflows & prompt engineering",
                  "Engineering leadership & team delivery",
                  "Systems architecture & product thinking",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Education
              </h3>
              <div className="text-sm text-foreground leading-relaxed">
                <p className="font-medium">BS Software Engineering</p>
                <p className="text-muted-foreground">
                  MBA — AI Management Concentration
                </p>
                <p className="text-muted-foreground mt-1">
                  Franciscan University of Steubenville
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Resumes
              </h3>
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="rounded-lg border border-border/70 bg-background/60 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground">
                          {resume.title}
                        </p>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">
                          {resume.audience}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {resume.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={resume.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View PDF
                      </a>
                      <a
                        href={resume.downloadUrl}
                        download={resume.fileName}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
