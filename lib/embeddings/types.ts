import type { ExperienceKind } from "@/content";

export type ExperienceEmbedding = {
  id: string;
  title: string;
  kind: ExperienceKind;
  embedding: number[];
};
