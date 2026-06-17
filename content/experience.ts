export type ExperienceKind = "project" | "internship" | "work";

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  title: string;
  organization?: string;
  location?: string;
  dateRange: string;
  year: number;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export type ResumeFact = {
  section: "summary" | "education";
  title: string;
  details: string[];
};

export const resumeFacts: ResumeFact[] = [
  {
    section: "summary",
    title: "Software Engineering and AI Summary",
    details: [
      "Full-stack software engineer and MBA candidate focused on building production software with AI integrated into real workflows.",
      "Experience spans architecture, frontend and backend implementation, database integration, release planning, code review, and AI-assisted development.",
      "Strong fit for teams building maintainable web apps, internal tools, automation systems, and AI product features.",
    ],
  },
  {
    section: "summary",
    title: "Leadership and Business Summary",
    details: [
      "MBA candidate with a software engineering foundation and a record of leading digital product, process improvement, and client coaching work.",
      "Combines full-stack delivery, AI systems knowledge, and business-oriented communication for digital transformation, product operations, and cross-functional execution.",
      "Known for translating ambiguous goals into structured plans, mentoring newer contributors, and building accountability into team and client outcomes.",
    ],
  },
  {
    section: "education",
    title: "Franciscan University of Steubenville",
    details: [
      "Master of Business Administration, concentration in AI Management, expected May 2027.",
      "Bachelor of Science in Software Engineering, minor in Mathematics, graduated May 2026.",
      "Undergraduate GPA: 3.73; Dean's List.",
    ],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: "schmiesing-portfolio",
    kind: "project",
    title: "Personal Portfolio Site",
    dateRange: "2026",
    year: 2026,
    description:
      "A living portfolio built with Next.js 16, shadcn/ui, and the Vercel AI SDK to showcase AI-integrated engineering.",
    longDescription:
      "This site is both a portfolio and a proof of concept. Built from scratch on Next.js 16 App Router with React 19, Tailwind v4, TypeScript, and shadcn/ui, it follows a phased roadmap covering tooling, core UI, AI chat, semantic project search, cached AI summaries, analytics, performance work, and continuous development. The portfolio also includes resume-specific content and an AI assistant that can answer questions about Matthew's background, skills, projects, and experience.",
    highlights: [
      "Built a typed, content-driven portfolio with Next.js App Router, React, Tailwind, and shadcn/ui.",
      "Added streaming AI chat, semantic search, cached AI-generated summaries, analytics, and a documented devlog.",
      "Used AI-assisted development workflows with Cursor, Claude, and structured prompt engineering throughout.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel AI SDK", "AI / LLM"],
    repoUrl: "https://github.com/schmiesingdev/schmiesing-portfolio",
    liveUrl: "https://schmiesing-portfolio.vercel.app/",
    featured: true,
  },
  {
    id: "saint-paul-center",
    kind: "work",
    title: "Part-Time Software Engineer",
    organization: "Saint Paul Center",
    location: "Remote",
    dateRange: "May 2025 - Present",
    year: 2025,
    description:
      "Builds and improves full-stack product experiences across Ruby on Rails and React, with a focus on subscription architecture, maintainability, and intern mentorship.",
    longDescription:
      "As a part-time software engineer at Saint Paul Center, Matthew redesigns subscription architecture and user flows across Ruby on Rails and React to support retention-oriented product experiences and maintainable growth. He delivers frontend and backend features through the full product lifecycle, from requirements clarification and architecture through implementation, review, and release support. The role also includes helping new interns with onboarding, task breakdown, code review feedback, technical communication, and responsible use of AI-assisted development tools.",
    highlights: [
      "Redesigned subscription architecture and user flows across Ruby on Rails and React.",
      "Delivered frontend and backend features through requirements, architecture, implementation, review, and release support.",
      "Assisted new interns with onboarding, task breakdown, code review feedback, and technical communication.",
      "Used AI-assisted development tools and structured prompts while reviewing output for correctness and maintainability.",
    ],
    tags: ["Ruby on Rails", "React", "Full-Stack", "Product Lifecycle", "Mentorship", "AI-Assisted Development"],
    featured: true,
  },
  {
    id: "rockware-internship",
    kind: "internship",
    title: "Full Stack Software Engineer Intern",
    organization: "Rockware Corp.",
    location: "Remote",
    dateRange: "May 2025 - Dec. 2025",
    year: 2025,
    description:
      "Built production lifecycle tracking software and SQL Server-backed workflows to improve manufacturing visibility, reporting, and operational decision-making.",
    longDescription:
      "As a full stack software engineer intern at Rockware Corp., Matthew built custom production lifecycle tracking software to improve manufacturing workflow visibility, operational monitoring, downstream handoffs, and reporting. He integrated SQL Server data into application workflows, surfaced metrics for process analysis and automation, and collaborated with operations and engineering stakeholders to prioritize features, validate requirements, and deliver tools aligned with production needs and business value.",
    highlights: [
      "Built custom production lifecycle tracking software for manufacturing workflow visibility.",
      "Integrated SQL Server data into application workflows for metrics, reporting, automation, and process analysis.",
      "Collaborated with operations and engineering stakeholders to prioritize and validate production-focused features.",
    ],
    tags: ["Full-Stack", "SQL Server", "Manufacturing", "Internal Tools", "Data Analysis", "Operations"],
    featured: true,
  },
  {
    id: "saint-steps",
    kind: "work",
    title: "Cross-Platform App Developer",
    organization: "Saint Steps LLC",
    location: "Remote",
    dateRange: "June 2024 - Dec. 2025",
    year: 2024,
    description:
      "Led delivery of a Flutter mobile app from beta to production for a 2,000+ active user community.",
    longDescription:
      "As a cross-platform app developer for Saint Steps LLC, Matthew led delivery of a Flutter mobile app from beta to production for a community of more than 2,000 active users. He owned product iteration, feature delivery, release planning, UI redesigns, backend server integration, and application updates based on user feedback and product priorities. The work required balancing adoption, technical delivery, and remote team coordination.",
    highlights: [
      "Led a Flutter mobile app from beta to production for 2,000+ active users.",
      "Implemented UI redesigns, backend server integration, and product updates based on user feedback.",
      "Balanced product adoption, release planning, and iterative feature delivery in a remote team environment.",
    ],
    tags: ["Flutter", "Dart", "Mobile", "Product Delivery", "Release Planning", "User Feedback"],
    featured: true,
  },
  {
    id: "cummins-brake-analytics",
    kind: "project",
    title: "Cummins Brake Analytics System",
    organization: "Senior Capstone",
    dateRange: "2025 - 2026",
    year: 2026,
    description:
      "Senior capstone project leading an interdisciplinary team building predictive maintenance analytics for Cummins brake components.",
    longDescription:
      "For his senior capstone, Matthew led an interdisciplinary engineering team building a predictive maintenance system that connects mechanical systems, data analysis, and software architecture. The project applies AI and analytics concepts to optimize component lifecycles, support reliable production-minded deployment, and guide planning, communication, and integration decisions across disciplines.",
    highlights: [
      "Led an interdisciplinary team building a predictive maintenance system for Cummins brake components.",
      "Connected mechanical systems, analytics, and software architecture to support lifecycle optimization.",
      "Guided planning, communication, integration decisions, and delivery coordination.",
    ],
    tags: ["Systems Engineering", "Analytics", "Predictive Maintenance", "AI / LLM", "Leadership", "Cummins"],
    featured: true,
  },
  {
    id: "ai-assisted-engineering-workflows",
    kind: "project",
    title: "AI-Assisted Engineering Workflows",
    dateRange: "Ongoing",
    year: 2026,
    description:
      "Structured prompt systems and agentic workflows for planning, implementation, debugging, and review across software engineering tasks.",
    longDescription:
      "Matthew builds structured prompt systems and agentic workflows to support planning, implementation, debugging, and review across software engineering tasks. The work focuses on evaluating AI output against codebase patterns, tests, and maintainability expectations rather than treating generated code as final.",
    highlights: [
      "Built structured prompt systems for planning, implementation, debugging, and review.",
      "Used agentic workflows to support software engineering tasks while preserving human review.",
      "Evaluated AI output against codebase patterns, tests, and maintainability expectations.",
    ],
    tags: ["AI / LLM", "Prompt Engineering", "Cursor", "Claude", "Agentic Workflows", "Code Review"],
    featured: true,
  },
  {
    id: "personal-trainer-client-coach",
    kind: "work",
    title: "Personal Trainer and Client Coach",
    organization: "Franciscan University of Steubenville",
    location: "Steubenville, OH",
    dateRange: "Part-Time",
    year: 2024,
    description:
      "Coaches clients through individualized training plans, accountability systems, and progress conversations.",
    longDescription:
      "As a personal trainer and client coach at Franciscan University of Steubenville, Matthew coaches clients through individualized training plans, accountability systems, and progress conversations that require trust, listening, and consistent follow-through. He translates client goals into practical routines, adjusts plans based on feedback, and reinforces long-term behavior change through clear expectations and encouragement.",
    highlights: [
      "Coached clients through individualized training plans, accountability systems, and progress conversations.",
      "Translated client goals into practical routines and adjusted plans based on feedback.",
      "Built trust and reinforced long-term behavior change through clear expectations and encouragement.",
    ],
    tags: ["Client Coaching", "Leadership", "Communication", "Accountability", "Mentorship"],
    featured: true,
  },
];

export const featuredExperienceItems = experienceItems.filter((item) => item.featured);
export const projectExperienceItems = experienceItems.filter((item) => item.kind === "project");
