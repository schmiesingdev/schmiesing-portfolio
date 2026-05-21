import { bio } from "@/content";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  twitter: null,
  resume: null,
} as const;

export function ContactSection() {
  const emailLink = bio.social.find((s) => s.icon === "email");

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-border bg-card p-10 sm:p-14 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
            I&apos;m open to new opportunities, collaborations, and interesting
            problems. Reach out and I&apos;ll get back to you promptly.
          </p>

          {emailLink && (
            <a
              href={emailLink.url}
              className={cn(buttonVariants({ size: "lg" }), "cursor-pointer font-semibold mb-8 inline-flex")}
            >
              Send me an email
            </a>
          )}

          <div className="flex items-center justify-center gap-6 pt-6">
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
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        <p>
          Built with Next.js, shadcn/ui, and Cursor &mdash; 2026
        </p>
      </footer>
    </section>
  );
}
