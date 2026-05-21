export type SocialLink = {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "email" | "resume";
};

export type Bio = {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  location: string;
  availableForWork: boolean;
  social: SocialLink[];
};

export const bio: Bio = {
  name: "Matthew Schmiesing",
  role: "Software Engineering Lead & MBA Candidate",
  tagline: "Building AI-powered products at the intersection of engineering and intelligent systems.",
  shortBio:
    "Full-stack software engineer and MBA candidate (AI Management) with a passion for agentic workflows, prompt engineering, and shipping production-grade AI features.",
  longBio:
    "I'm a software engineer and MBA candidate at Franciscan University of Steubenville, where I'm completing a concentration in AI Management alongside my BS in Software Engineering. " +
    "I build full-stack applications using React, Ruby on Rails, Vue.js, and Python — and I care deeply about how AI can be embedded into real products, not just prototypes. " +
    "At Saint Paul Center, I redesigned subscription architecture and led full-stack delivery using AI-assisted development tools like Cursor and Claude. " +
    "I've also built agentic workflows, structured prompt systems, and analytics platforms — most recently leading an interdisciplinary team on a predictive maintenance system for Cummins as my senior capstone. " +
    "My edge is bridging technical depth with clear communication: I translate complex requirements into structured tasks, review agent outputs critically, and maintain rigorous engineering standards across the SDLC.",
  location: "Steubenville, Ohio",
  availableForWork: true,
  social: [
    {
      label: "GitHub",
      url: "https://github.com/schmiesingdev/schmiesing-portfolio",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/matthew-schmiesing",
      icon: "linkedin",
    },
    {
      label: "Email",
      url: "mailto:schmiesingdev@gmail.com",
      icon: "email",
    },
  ],
};
