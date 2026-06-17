import { projectExperienceItems } from "./experience";
import type { ExperienceItem } from "./experience";

export type ProjectTag = string;
export type Project = ExperienceItem & { kind: "project" };

export const projects: Project[] = projectExperienceItems as Project[];

export const featuredProjects = projects.filter((p) => p.featured);
