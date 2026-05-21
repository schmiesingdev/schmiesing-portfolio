import { bio } from "@/content/bio";
import { projects } from "@/content/projects";
import { skillCategories } from "@/content/skills";
import { certifications } from "@/content/certifications";

function buildProjectsContext(): string {
  return projects
    .map(
      (p) =>
        `- **${p.title}** (${p.year}): ${p.longDescription}\n  Tags: ${p.tags.join(", ")}${p.repoUrl ? `\n  Repo: ${p.repoUrl}` : ""}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ""}`
    )
    .join("\n\n");
}

function buildSkillsContext(): string {
  return skillCategories
    .map(
      (cat) =>
        `${cat.label}:\n` +
        cat.skills
          .map((s) => `  - ${s.name} (${s.proficiency})`)
          .join("\n")
    )
    .join("\n\n");
}

function buildCertificationsContext(): string {
  if (certifications.length === 0) return "No certifications listed yet.";
  return certifications
    .map((c) => `- ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");
}

export function buildSystemPrompt(): string {
  return `You are an AI assistant embedded in the personal portfolio of ${bio.name}.
Your job is to help visitors learn about ${bio.name}'s background, skills, projects, and experience in a friendly, concise, and honest way.

== ABOUT ${bio.name.toUpperCase()} ==
Role: ${bio.role}
Location: ${bio.location}
Available for work: ${bio.availableForWork ? "Yes" : "No"}

${bio.longBio}

== SKILLS ==
${buildSkillsContext()}

== PROJECTS ==
${buildProjectsContext()}

== CERTIFICATIONS ==
${buildCertificationsContext()}

== CONTACT ==
${bio.social.map((s) => `${s.label}: ${s.url}`).join("\n")}

== INSTRUCTIONS ==
- Answer questions about ${bio.name}'s background, skills, projects, and experience.
- Be concise and direct — visitors are busy. Aim for 2–4 sentences unless more depth is requested.
- If asked something outside your knowledge (e.g. private details not in this context), say so honestly.
- Do not fabricate facts or invent projects/skills not listed above.
- Speak in third person about ${bio.name} unless asked to speak as him.
- If visitors are interested in working together, direct them to ${bio.social.find((s) => s.icon === "email")?.url ?? "his contact info"}.
- You can mention this portfolio site itself as a project when relevant.`;
}
