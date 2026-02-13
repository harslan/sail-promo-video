import { Easing } from "remotion";

// ============================================================================
// VIDEO SPECS
// ============================================================================
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
export const TOTAL_DURATION_FRAMES = 2250; // 75 seconds

// ============================================================================
// SCENE TIMING (in frames)
// ============================================================================
export const SCENE_TIMING = {
  scene1: { start: 0, end: 210 },       // 0-7s: The Generic Claim
  scene2: { start: 210, end: 840 },     // 7-28s: The IMMERSE Reality (21s)
  scene3: { start: 840, end: 1050 },    // 28-35s: The Pivot (7s)
  scene4: { start: 1050, end: 1530 },   // 35-51s: SAIL Meets IMMERSE (16s)
  scene5: { start: 1530, end: 1830 },   // 51-61s: The Thesis (10s)
  scene6: { start: 1830, end: 2250 },   // 61-75s: The Close (14s)
} as const;

// ============================================================================
// COLORS (inherits from SAIL design system + IMMERSE additions)
// ============================================================================
export const COLORS = {
  // Primary backgrounds
  bgDeep: "#0B0B14",
  bgSurface: "#13131F",
  bgCard: "#1C1C2E",
  bgWarm: "#0F0B14",

  // Accent colors (SAIL)
  suffolkGold: "#C4A44E",
  sailCoral: "#E85D75",
  sailTeal: "#4ECDC4",
  sailBlue: "#4A90D9",
  sailLavender: "#B8A9F0",

  // IMMERSE-specific colors
  immerseBlue: "#1B3C73",
  celticsGreen: "#007A33",
  patriotsBlue: "#002244",
  wishBlue: "#29ABE2",

  // Text colors — optimized for video readability
  textPrimary: "#F5F4F8",  // Slightly brighter white
  textMuted: "#A0A0B8",    // Brighter for better contrast
  textDim: "#6A6A82",      // More readable
  textGhost: "#3D3D52",

  // Glow colors
  glowCoral: "rgba(232, 93, 117, 0.3)",
  glowGold: "rgba(196, 164, 78, 0.3)",
  glowTeal: "rgba(78, 205, 196, 0.2)",
} as const;

// ============================================================================
// TYPOGRAPHY (16:9 horizontal - optimized for video impact)
// ============================================================================
export const TYPE_SCALE = {
  hero: 96,       // Reserved for absolute biggest moments
  climax: 72,     // "Ownership cannot." — THE moment
  title: 64,      // Framework names, major headlines
  headline: 48,   // Scene text, pillar names
  subtitle: 40,   // Thesis lines, questions (was 36)
  body: 28,       // Body text, descriptions
  caption: 26,    // Labels, badges — more readable (was 22)
  micro: 18,      // Tiny labels (was 16)
} as const;

// ============================================================================
// ANIMATION TIMING
// ============================================================================
export const TIMING = {
  textEntrance: 20,      // ~667ms at 30fps
  stagger: 4,            // ~133ms stagger
  cardDuration: 85,      // ~2.8 seconds per experience card
  cardOverlap: 20,       // Overlap between cards
  sceneTransition: 15,   // ~500ms crossfade
} as const;

// ============================================================================
// EASING CURVES
// ============================================================================
export const EASE_SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_CINEMATIC = Easing.bezier(0.25, 0.1, 0.25, 1);
export const EASE_SNAP = Easing.bezier(0.68, -0.55, 0.27, 1.55);

// ============================================================================
// SPRING CONFIGS
// ============================================================================
export const SPRING_SMOOTH = { damping: 200 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200 };
export const SPRING_ORGANIC = { damping: 15, stiffness: 80 };
