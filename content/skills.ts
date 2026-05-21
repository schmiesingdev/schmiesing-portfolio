export type ProficiencyLevel = "expert" | "proficient" | "familiar";

export type Skill = {
  name: string;
  proficiency: ProficiencyLevel;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", proficiency: "expert" },
      { name: "Python", proficiency: "expert" },
      { name: "JavaScript", proficiency: "expert" },
      { name: "SQL", proficiency: "proficient" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", proficiency: "expert" },
      { name: "React", proficiency: "expert" },
      { name: "Node.js", proficiency: "proficient" },
      { name: "Tailwind CSS", proficiency: "expert" },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    skills: [
      { name: "Vercel AI SDK", proficiency: "expert" },
      { name: "OpenAI API", proficiency: "expert" },
      { name: "LangChain", proficiency: "proficient" },
      { name: "Embeddings / RAG", proficiency: "proficient" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    skills: [
      { name: "Vercel", proficiency: "expert" },
      { name: "Git / GitHub", proficiency: "expert" },
      { name: "Docker", proficiency: "proficient" },
      { name: "PostgreSQL", proficiency: "proficient" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((c) => c.skills);
