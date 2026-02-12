import { z } from "zod";

export const SAILPromoSchema = z.object({
  school: z.object({
    name: z.string(),
    university: z.string(),
    location: z.string(),
    tagline: z.string(),
    url: z.string(),
    accolades: z.array(z.string()),
  }),
  framework: z.object({
    name: z.string(),
    tagline: z.string(),
    pillars: z.array(
      z.object({
        letter: z.string(),
        name: z.string(),
        question: z.string(),
        color: z.string(),
      })
    ),
  }),
  thesis: z.object({
    line1: z.string(),
    line2: z.string(),
    line3: z.string(),
    promise: z.string(),
  }),
  competition: z.object({
    name: z.string(),
    studentCount: z.number(),
    dataPoints: z.string(),
    ethicalMoment: z.string(),
  }),
  quotes: z.array(
    z.object({
      text: z.string(),
      attribution: z.string(),
    })
  ),
  stats: z.object({
    aiJobGrowth: z.string(),
    employmentRate: z.string(),
  }),
});

export type SAILPromoProps = z.infer<typeof SAILPromoSchema>;

export const defaultProps: SAILPromoProps = {
  school: {
    name: "Sawyer Business School",
    university: "Suffolk University",
    location: "Boston, MA",
    tagline: "A rigorous business education—with purpose.",
    url: "suffolk.edu/business",
    accolades: [
      "AACSB Accredited",
      "2025 Eduventures Innovation Award",
      "Published in AACSB Insights",
      "Only US business school with AACSB, NASPAA & CAHME",
    ],
  },
  framework: {
    name: "SAIL",
    tagline: "AI Leadership Collaborative",
    pillars: [
      {
        letter: "S",
        name: "Social Intelligence",
        question: "How do we connect?",
        color: "#4A90D9",
      },
      {
        letter: "A",
        name: "AI Literacy",
        question: "How does it work?",
        color: "#4ECDC4",
      },
      {
        letter: "I",
        name: "Innovation / Inquiry",
        question: "What's missing or wrong?",
        color: "#E85D75",
      },
      {
        letter: "L",
        name: "Leadership",
        question: "I will own what happens.",
        color: "#C4A44E",
      },
    ],
  },
  thesis: {
    line1: "Skills can be automated.",
    line2: "Judgment can be augmented.",
    line3: "Ownership cannot.",
    promise: "Not just AI-literate graduates. Graduates with ownership.",
  },
  competition: {
    name: "Prompt AIChemy",
    studentCount: 34,
    dataPoints: "Real-world datasets",
    ethicalMoment:
      "We need to make sure we're not penalizing rural sellers with poor infrastructure.",
  },
  quotes: [
    {
      text: "I used to think AI was about getting the right technical answer. Now I realize it's more like conducting an orchestra.",
      attribution: "Suffolk Business Student",
    },
    {
      text: "We weren't just asking AI for answers. We were teaching it to think through problems the way we would.",
      attribution: "Suffolk Business Student",
    },
    {
      text: "The more I depended on it, the less I was thinking about underlying concepts.",
      attribution: "Suffolk Business Student",
    },
  ],
  stats: {
    aiJobGrowth: "644%",
    employmentRate: "96%",
  },
};
