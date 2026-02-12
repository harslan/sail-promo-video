import { Easing } from "remotion";

// ============================================================================
// VIDEO SPECS
// ============================================================================
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const TOTAL_DURATION_FRAMES = 2790; // 93 seconds (added 3s pause after Scene 2)

// ============================================================================
// SCENE TIMING (in frames)
// ============================================================================
// Added 90 frames (3 seconds) after Scene 2 to let "Who owns that decision now?" breathe
export const SCENE_TIMING = {
  scene1: { start: 0, end: 300 }, // 0-10s: The Tension
  scene2: { start: 300, end: 630 }, // 10-21s: The Stakes (extended for pause)
  scene3: { start: 630, end: 1080 }, // 21-36s: The Framework
  scene4: { start: 1080, end: 1680 }, // 36-56s: The Proof
  scene5: { start: 1680, end: 2040 }, // 56-68s: The Voices
  scene6: { start: 2040, end: 2340 }, // 68-78s: The Thesis
  scene7: { start: 2340, end: 2790 }, // 78-93s: The Close
} as const;

// ============================================================================
// COLORS
// ============================================================================
export const COLORS = {
  // Primary backgrounds
  bgDeep: "#0B0B14",
  bgSurface: "#13131F",
  bgCard: "#1C1C2E",
  bgWarm: "#0F0B14", // Hint of purple for Scene 3

  // Accent colors
  suffolkGold: "#C4A44E",
  sailCoral: "#E85D75",
  sailTeal: "#4ECDC4",
  sailBlue: "#4A90D9",
  sailLavender: "#B8A9F0",

  // Text colors
  textPrimary: "#F0EFF4",
  textMuted: "#8888A0",
  textDim: "#555570",
  textGhost: "#333348",

  // Glow colors
  glowCoral: "rgba(232, 93, 117, 0.3)",
  glowGold: "rgba(196, 164, 78, 0.3)",
  glowTeal: "rgba(78, 205, 196, 0.2)",
} as const;

// Pillar colors for easy reference
export const PILLAR_COLORS = {
  S: COLORS.sailBlue,
  A: COLORS.sailTeal,
  I: COLORS.sailCoral,
  L: COLORS.suffolkGold,
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export const TYPE_SCALE = {
  hero: 132, // "Ownership cannot." - BIGGER for impact
  title: 78, // Scene titles, pillar names
  headline: 60, // Major lines in thesis - more weight
  subtitle: 40, // Pillar questions, subheadlines
  body: 30, // Body text, descriptions
  caption: 24, // Labels, attributions
  micro: 18, // Tiny labels
} as const;

// ============================================================================
// ANIMATION TIMING
// ============================================================================
export const TIMING = {
  textEntrance: 24, // ~800ms at 30fps
  stagger: 5, // ~150ms stagger
  sceneTransition: 18, // ~600ms crossfade
  holdMajor: 75, // 2.5s hold after major line
  beat: 45, // 1.5s pause/beat
} as const;

// ============================================================================
// EASING CURVES
// ============================================================================
// Smooth, deliberate - for most text entrances
export const EASE_SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

// Cinematic - slower start, confident arrival
export const EASE_CINEMATIC = Easing.bezier(0.25, 0.1, 0.25, 1);

// ============================================================================
// SPRING CONFIGS
// ============================================================================
export const SPRING_SMOOTH = { damping: 200 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200 };
export const SPRING_ORGANIC = { damping: 15, stiffness: 80 };
export const SPRING_HEAVY = { damping: 15, stiffness: 80, mass: 2 };

// ============================================================================
// LAYOUT
// ============================================================================
export const LAYOUT = {
  paddingVertical: 120,
  paddingHorizontal: 80,
  contentWidth: 920, // VIDEO_WIDTH - 2 * paddingHorizontal
  contentHeight: 1680, // VIDEO_HEIGHT - 2 * paddingVertical
} as const;

// ============================================================================
// PARTICLE FIELD CONFIG
// ============================================================================
export const PARTICLE_CONFIG = {
  count: 40,
  minSize: 1,
  maxSize: 4,
  colors: [COLORS.textDim, COLORS.sailCoral, COLORS.sailTeal],
  opacities: [0.6, 0.1, 0.1], // corresponding to colors above
} as const;
