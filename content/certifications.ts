export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  tags: string[];
};

export const certifications: Certification[] = [
  // Add certifications here — each one renders as a card automatically.
  // Example:
  // {
  //   id: "aws-cloud-practitioner",
  //   title: "AWS Certified Cloud Practitioner",
  //   issuer: "Amazon Web Services",
  //   date: "2025",
  //   credentialUrl: "https://www.credly.com/badges/...",
  //   tags: ["AWS", "Cloud"],
  // },
];
