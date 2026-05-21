export type ProjectTag =
  | "Next.js"
  | "React"
  | "TypeScript"
  | "Python"
  | "AI / LLM"
  | "Vercel AI SDK"
  | "PostgreSQL"
  | "Tailwind CSS"
  | "shadcn/ui"
  | "REST API"
  | "CLI"
  | "Open Source"
  | string;

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "One or two sentences describing what this project does and why it matters.",
    longDescription:
      "A longer description of the project — the problem it solves, key technical decisions, " +
      "and what you learned. This is fed to the AI assistant as context so visitors can ask questions about it.",
    tags: ["Next.js", "TypeScript", "AI / LLM"],
    repoUrl: "https://github.com/yourusername/project-one",
    liveUrl: "https://project-one.vercel.app",
    featured: true,
    year: 2025,
  },
  {
    id: "project-two",
    title: "Project Two",
    description: "Short description of the project.",
    longDescription: "Longer description for the AI assistant context.",
    tags: ["Python", "REST API"],
    repoUrl: "https://github.com/yourusername/project-two",
    featured: false,
    year: 2024,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
