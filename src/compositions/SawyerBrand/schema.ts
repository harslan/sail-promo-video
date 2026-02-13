import { z } from "zod";

export const SawyerBrandSchema = z.object({
  school: z.object({
    name: z.string(),
    university: z.string(),
    location: z.string(),
    url: z.string(),
    accolades: z.array(z.string()),
  }),
  immerse: z.object({
    name: z.string(),
    tagline: z.string(),
    award: z.string(),
    characteristics: z.array(z.object({
      letter: z.string(),
      name: z.string(),
    })),
    experiences: z.array(z.object({
      title: z.string(),
      description: z.string(),
      immerseLetter: z.string(),
      immerseCharacteristic: z.string(),
      accentColor: z.string(),
    })),
  }),
  sail: z.object({
    name: z.string(),
    tagline: z.string(),
    award: z.string(),
    pillars: z.array(z.object({
      letter: z.string(),
      name: z.string(),
      question: z.string(),
      realExample: z.string(),
      immerseLetter: z.string(),
      immerseCharacteristic: z.string(),
      color: z.string(),
    })),
  }),
  thesis: z.object({
    line1: z.string(),
    line2: z.string(),
    line3: z.string(),
    closer: z.string(),
  }),
  brandLine: z.string(),
});

export type SawyerBrandProps = z.infer<typeof SawyerBrandSchema>;

export const defaultProps: SawyerBrandProps = {
  school: {
    name: "Sawyer Business School",
    university: "Suffolk University",
    location: "Boston, MA",
    url: "suffolk.edu/business",
    accolades: [
      "AACSB Accredited",
      "2024 Eduventures Innovation Award — IMMERSE",
      "2025 Eduventures Innovation Award — SAIL",
      "Published in AACSB Insights",
    ],
  },
  immerse: {
    name: "IMMERSE",
    tagline: "Immersive Learning Framework",
    award: "2024 Eduventures Innovation Award",
    characteristics: [
      { letter: "I", name: "Integrative" },
      { letter: "M", name: "Multisensory" },
      { letter: "M", name: "Motivational" },
      { letter: "E", name: "Emotional" },
      { letter: "R", name: "Relevant" },
      { letter: "S", name: "Synergistic" },
      { letter: "E", name: "Experiential" },
    ],
    experiences: [
      { title: "Gillette Stadium", description: "Sustainability consulting at an NFL venue", immerseLetter: "E", immerseCharacteristic: "Experiential", accentColor: "#1B3C73" },
      { title: "Boston Celtics", description: "Strategic partnership with an NBA franchise", immerseLetter: "S", immerseCharacteristic: "Synergistic", accentColor: "#00A84D" },
      { title: "100,000 Real Orders", description: "AI-powered analysis in Prompt AIChemy", immerseLetter: "I", immerseCharacteristic: "Integrative", accentColor: "#4ECDC4" },
      { title: "Make-A-Wish", description: "Service learning with real nonprofit impact", immerseLetter: "E", immerseCharacteristic: "Emotional", accentColor: "#29ABE2" },
      { title: "City of Boston", description: "Tackling wicked problems for the actual city", immerseLetter: "R", immerseCharacteristic: "Relevant", accentColor: "#E85D75" },
      { title: "Student-Run Agency", description: "Real clients, real campaigns, real results", immerseLetter: "M", immerseCharacteristic: "Motivational", accentColor: "#F0C75E" },
      { title: "Global Travel Seminars", description: "International immersive experiences", immerseLetter: "M", immerseCharacteristic: "Multisensory", accentColor: "#B8A9F0" },
    ],
  },
  sail: {
    name: "SAIL",
    tagline: "AI Leadership Collaborative",
    award: "2025 Eduventures Innovation Award",
    pillars: [
      {
        letter: "S", name: "Social Intelligence",
        question: "How do we connect?",
        realExample: "Presenting strategy to the Boston Celtics front office.",
        immerseLetter: "S", immerseCharacteristic: "Synergistic",
        color: "#4A90D9",
      },
      {
        letter: "A", name: "AI Literacy",
        question: "How does it work?",
        realExample: "Analyzing 100,000 real orders with AI.",
        immerseLetter: "I", immerseCharacteristic: "Integrative",
        color: "#4ECDC4",
      },
      {
        letter: "I", name: "Innovation / Inquiry",
        question: "What's missing or wrong?",
        realExample: "\"We need to make sure we're not penalizing rural sellers.\"",
        immerseLetter: "R", immerseCharacteristic: "Relevant",
        color: "#E85D75",
      },
      {
        letter: "L", name: "Leadership",
        question: "I will own what happens.",
        realExample: "Signing off on a recommendation to an actual client.",
        immerseLetter: "E", immerseCharacteristic: "Experiential",
        color: "#C4A44E",
      },
    ],
  },
  thesis: {
    line1: "Skills can be automated.",
    line2: "Judgment can be augmented.",
    line3: "Ownership cannot.",
    closer: "And ownership is built here.",
  },
  brandLine: "Where ownership is built.",
};
