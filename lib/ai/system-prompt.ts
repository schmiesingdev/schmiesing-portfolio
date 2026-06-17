import { bio } from "@/content/bio";
import { experienceItems, resumeFacts } from "@/content/experience";
import { skillCategories } from "@/content/skills";
import { certifications } from "@/content/certifications";

function buildResumeFactsContext(): string {
  return resumeFacts
    .map(
      (fact) =>
        `- **${fact.title}** (${fact.section}):\n${fact.details
          .map((detail) => `  - ${detail}`)
          .join("\n")}`
    )
    .join("\n\n");
}

function buildExperienceContext(): string {
  return experienceItems
    .map(
      (item) =>
        `- **${item.title}**${item.organization ? `, ${item.organization}` : ""} (${item.kind}; ${item.dateRange}${item.location ? `; ${item.location}` : ""}): ${item.longDescription}\n  Highlights:\n${item.highlights.map((highlight) => `  - ${highlight}`).join("\n")}\n  Tags: ${item.tags.join(", ")}${item.repoUrl ? `\n  Repo: ${item.repoUrl}` : ""}${item.liveUrl ? `\n  Live: ${item.liveUrl}` : ""}`
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

== RESUME SUMMARY & EDUCATION ==
${buildResumeFactsContext()}

== SKILLS ==
${buildSkillsContext()}

== PROJECTS, INTERNSHIPS & WORK EXPERIENCE ==
${buildExperienceContext()}

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
