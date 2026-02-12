import { Easing } from "remotion";

// ============================================================================
// VIDEO SPECS
// ============================================================================
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const TOTAL_DURATION_FRAMES = 2940; // 98 seconds (added breathing room)

// Horizontal version specs
export const VIDEO_WIDTH_HORIZONTAL = 1920;
export const VIDEO_HEIGHT_HORIZONTAL = 1080;

// ============================================================================
// SCENE TIMING (in frames)
// ============================================================================
// Pacing adjustments:
// - 15 frames (0.5s) beat between Scene 1 and 2
// - 75 frames (2.5s) added to Scene 3 for Leadership pillar
// - 60 frames (2s) added to Scene 4 for ethical moment
export const SCENE_TIMING = {
  scene1: { start: 0, end: 300 }, // 0-10s: The Tension
  scene2: { start: 315, end: 645 }, // 10.5-21.5s: The Stakes (0.5s beat before)
  scene3: { start: 645, end: 1170 }, // 21.5-39s: The Framework (+2.5s for Leadership)
  scene4: { start: 1170, end: 1830 }, // 39-61s: The Proof (+2s for ethical moment)
  scene5: { start: 1830, end: 2190 }, // 61-73s: The Voices
  scene6: { start: 2190, end: 2490 }, // 73-83s: The Thesis
  scene7: { start: 2490, end: 2940 }, // 83-98s: The Close
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
// Vertical (1080x1920) - mobile-first
export const TYPE_SCALE = {
  hero: 132, // "Ownership cannot." - BIGGER for impact
  title: 78, // Scene titles, pillar names
  headline: 60, // Major lines in thesis - more weight
  subtitle: 40, // Pillar questions, subheadlines
  body: 30, // Body text, descriptions
  caption: 24, // Labels, attributions
  micro: 18, // Tiny labels
} as const;

// Horizontal (1920x1080) - presentation/web
// BOLD sizes for cinematic impact - this is a brand film, not a corporate deck
export const TYPE_SCALE_HORIZONTAL = {
  hero: 120, // "Ownership cannot." - MUST dominate the screen
  title: 72, // Scene titles, pillar names - substantial
  headline: 56, // Major lines in thesis - weight and presence
  subtitle: 44, // Pillar questions, subheadlines - easily readable
  body: 32, // Body text, descriptions - no squinting
  caption: 26, // Labels, attributions - still visible
  micro: 20, // Tiny labels - readable even small
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

// Horizontal layout (1920x1080)
export const LAYOUT_HORIZONTAL = {
  paddingVertical: 60,
  paddingHorizontal: 100,
  contentWidth: 1720, // VIDEO_WIDTH_HORIZONTAL - 2 * paddingHorizontal
  contentHeight: 960, // VIDEO_HEIGHT_HORIZONTAL - 2 * paddingVertical
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
