import { bio } from "@/content";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  twitter: null,
  resume: null,
} as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#18181b0a_1px,transparent_1px),linear-gradient(to_bottom,#18181b0a_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      <div className="mx-auto max-w-3xl w-full text-center">
        {bio.availableForWork && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>
        )}

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
          {bio.name}
        </h1>

        <p className="font-heading text-xl sm:text-2xl font-medium text-muted-foreground mb-4">
          {bio.role}
        </p>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          {bio.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href="#projects"
            className={cn(buttonVariants({ size: "lg" }), "cursor-pointer font-semibold")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cursor-pointer font-semibold")}
          >
            Get in Touch
          </a>
        </div>

        <div className="flex items-center justify-center gap-4">
          {bio.social.map((link) => {
            const Icon = iconMap[link.icon];
            if (!Icon) return null;
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.icon !== "email" ? "_blank" : undefined}
                rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
