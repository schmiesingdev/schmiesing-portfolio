export type Resume = {
  id: string;
  title: string;
  audience: string;
  description: string;
  viewUrl: string;
  downloadUrl: string;
  fileName: string;
};

export const resumes: Resume[] = [
  {
    id: "leadership-business",
    title: "Leadership / Business Resume",
    audience: "Rotational leadership, product operations, and digital transformation roles",
    description:
      "Highlights cross-functional delivery, intern mentorship, client coaching, product thinking, and AI-aware business leadership.",
    viewUrl: "/resumes/matthew-schmiesing-leadership-business-resume.pdf",
    downloadUrl: "/resumes/matthew-schmiesing-leadership-business-resume.pdf",
    fileName: "matthew-schmiesing-leadership-business-resume.pdf",
  },
  {
    id: "software-engineering-ai",
    title: "Software Engineering / AI Resume",
    audience: "Full-stack software engineering and AI product development roles",
    description:
      "Emphasizes full product lifecycle ownership, architecture, AI-assisted development, and production full-stack delivery.",
    viewUrl: "/resumes/matthew-schmiesing-software-engineering-ai-resume.pdf",
    downloadUrl: "/resumes/matthew-schmiesing-software-engineering-ai-resume.pdf",
    fileName: "matthew-schmiesing-software-engineering-ai-resume.pdf",
  },
];
