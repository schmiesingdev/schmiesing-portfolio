import { bio } from "@/content";
import { MapPin, Briefcase } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-muted/40">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              About
            </h2>
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
          </div>
        </div>
      </div>
    </section>
  );
}
