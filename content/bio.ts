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
  role: "Software Engineer",
  tagline: "Building AI-powered products with modern web technology.",
  shortBio:
    "Software engineer focused on AI-integrated applications, full-stack development, and developer tooling.",
  longBio:
    "I'm a software engineer who builds at the intersection of AI and product engineering. " +
    "I care about clean architecture, great developer experience, and shipping things that work. " +
    "Currently exploring how large language models can be embedded into real software — " +
    "not as demos, but as production-grade features.",
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
      url: "www.linkedin.com/in/matthew-schmiesing",
      icon: "linkedin",
    },
    {
      label: "Email",
      url: "schmiesingdev@gmail.com",
      icon: "email",
    },
  ],
};
