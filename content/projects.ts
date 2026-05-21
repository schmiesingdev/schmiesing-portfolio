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
    id: "schmiesing-portfolio",
    title: "Personal Portfolio Site",
    description:
      "A living portfolio built with Next.js 16, shadcn/ui, and the Vercel AI SDK — designed to double as a showcase of AI-integrated engineering.",
    longDescription:
      "This site is both a portfolio and a proof of concept. Built from scratch on Next.js 16 App Router with React 19, Tailwind v4, TypeScript, and shadcn/ui, it follows a phased roadmap: " +
      "Phase 1 established tooling and Cursor rules; Phase 2 built the core UI as typed Server Components driven by content/ data files; " +
      "Phase 3 will add a streaming AI chat assistant (Vercel AI SDK + streamText) so visitors can ask questions about my work; " +
      "Phase 4 will layer in semantic project search via embeddings and AI-generated project summaries cached with Vercel's Cache API; " +
      "Phase 5 will add Vercel Analytics and a devlog showing real prompts and Cursor skill usage during construction. " +
      "The entire project was built using AI-assisted development workflows — Cursor, Claude, and structured prompt engineering throughout.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel AI SDK", "AI / LLM"],
    repoUrl: "https://github.com/schmiesingdev/schmiesing-portfolio",
    liveUrl: "https://schmiesing.dev",
    featured: true,
    year: 2026,
  },
  {
    id: "cummins-brake-analytics",
    title: "Cummins Brake Analytics System",
    description:
      "Senior capstone project — led an interdisciplinary engineering team to deliver a predictive maintenance analytics platform for Cummins brake components.",
    longDescription:
      "As team lead for my senior capstone, I was responsible for coordinating an interdisciplinary group of engineers across the full project lifecycle — from requirements gathering and milestone planning through risk management, testing validation, and final deployment. " +
      "My primary focus was organizational: breaking high-level client requirements from Cummins into structured, executable tasks and ensuring delivery consistency across every sprint. " +
      "I owned stakeholder communication, maintained the project roadmap, and made architectural decisions that kept the team unblocked. " +
      "The system itself is a predictive maintenance analytics platform that bridges mechanical hardware sensor data with software-driven insights to optimize brake component lifecycles. " +
      "AI and prompt design were applied to the analytics layer, but the defining challenge of the project was engineering leadership — managing scope, people, and timelines under real-world constraints.",
    tags: ["Arduino", "Microcontrollers"],
    featured: true,
    year: 2026,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
