# CLAUDE.md — Project Context

## What This Project Is

This is a Remotion video project for creating a cinematic marketing video for **Suffolk University's Sawyer Business School** and their **SAIL Framework** (AI Leadership Collaborative). The video targets prospective students — undergrad and graduate — who are deciding where to study business.

## Who We Are

**Suffolk University's Sawyer Business School** (Boston, MA) — AACSB-accredited business school that won the 2025 Eduventures Innovation Award for their work in AI education.

**SAIL** stands for: **S**ocial Intelligence, **A**I Literacy, **I**nnovation/Inquiry, **L**eadership. It's a framework for developing "the human capacities that complement AI" in business education.

**Hasan Arslan, PhD** — Chief AI Officer & Associate Professor, creator of the SAIL Framework. Published in AACSB Insights. He is the person you're building this for.

## The SAIL Framework (know this deeply)

### The Four Pillars

| Pillar | Question | What It Means |
|--------|----------|---------------|
| **S — Social Intelligence** | "How do we connect?" | Communicating AI insights to colleagues, clients, stakeholders — making analysis actionable for different audiences |
| **A — AI Literacy** | "How does it work?" | Understanding AI capabilities, limitations, and failure modes — knowing when different approaches work and why |
| **I — Innovation/Inquiry** | "What's missing or wrong?" | Questioning AI outputs — the "Wait, that's weird" moments that separate strategic thinking from data regurgitation |
| **L — Leadership** | "I will own what happens." | Taking ownership of human-AI collaboration outcomes — being accountable for recommendations, ensuring they're ethical and sustainable |

### The Core Philosophy (CRITICAL — USE THIS EXACT LANGUAGE)

**"Skills can be automated. Judgment can be augmented. Ownership cannot."**

This is the central thesis. Three beats. Each one lands harder than the last.

- Skills → AI does this already
- Judgment → AI can help with this (and increasingly does it well)
- Ownership → This is what humans uniquely bring. Responsibility, accountability, caring about outcomes, having skin in the game.

The previous version said "Skills can be automated. Judgment cannot." — we are UPDATING this because AI demonstrably exercises judgment now. The honest, forward-looking evolution is the ownership framing.

### The Integration Effect

No single SAIL pillar works alone. AI Literacy enables meaningful insights → Innovation/Inquiry helps question and refine them → Social Intelligence makes them actionable → Leadership ensures they're sustainable. They reinforce each other.

### The SAIL Promise

"Not just AI-literate graduates. Graduates with ownership."

### Key Evidence: Prompt AIChemy Competition

- Real competition at Sawyer Business School — students use AI to analyze real business datasets
- First event: 19 students analyzed 100,000 orders from Olist (Brazilian e-commerce platform)
- Students discovered regional sales patterns, flagged ethical concerns UNPROMPTED
- Key student quotes (use these — they're from the published AACSB article):
  - "I used to think AI was about getting the right technical answer. Now I realize it's more like conducting an orchestra."
  - "We weren't just asking AI for answers. We were teaching it to think through problems the way we would."
  - "We need to make sure we're not penalizing rural sellers with poor infrastructure."
  - "I used to think AI either gave you the right answer or it didn't. But it's actually more like working with someone who needs really clear instructions and ethical guardrails."

### Recognition

- **2025 Eduventures Innovation Award** — for transforming higher education for an AI-augmented world
- **Published in AACSB Insights** — "Beyond the Hype: AI's Role in Business Education" (October 2025)
- **AACSB Accredited** — Sawyer Business School

### Key Concept: Cognitive Debt

From MIT research (Kosmyna et al., 2025): Each time a student accepts AI output without evaluation, they accumulate "cognitive debt." The debt compounds. Eventually, when AI makes a mistake, they lack the capacity — and more importantly, the *felt responsibility* — to catch it.

## The Pulse Platform

The Pulse is the technology platform where SAIL becomes lived practice. It's an AI-native community intelligence platform where faculty share their professional narrative through conversation with a personal AI "Angel." Individual pulses aggregate into collective institutional intelligence.

- SAIL = the philosophy (the "why")
- The Pulse = the platform (the "how")

The heartbeat/pulse motif (🫀) is a recurring visual element.

## Reference URLs

- SAIL site: https://sites.suffolk.edu/sail/
- SAIL Framework: https://sites.suffolk.edu/sail/sail_framework/
- GitHub repo: https://github.com/harslan/sail-framework
- AACSB article: https://www.aacsb.edu/insights/articles/2025/10/beyond-the-hype-ais-role-in-business-education
- Suffolk Business: https://www.suffolk.edu/business
- The Pulse: https://sbs.takepulse.ai

## Technical Notes

- This is a Remotion project with TailwindCSS
- Agent Skills (remotion-best-practices) are installed — USE THEM
- Target output: 1080x1920 (9:16 vertical), 30fps
- All content must be parameterizable via props (no hardcoded text)
- Use Zod schemas for input validation
- Each scene should be a separate component file
- Use @remotion/google-fonts for font loading
