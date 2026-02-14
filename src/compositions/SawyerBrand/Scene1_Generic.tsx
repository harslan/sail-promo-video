import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";

const { fontFamily: sansFont } = loadDMSans();

/**
 * Scene 1: THE GENERIC CLAIM (9 seconds / 270 frames)
 *
 * Start with what every school says. Let it sit. Let it breathe.
 * "Every business school talks about real-world experience."
 *
 * No gimmicks. The power is in the pause — and what comes after.
 */
export const Scene1Generic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing — let the words land, longer hold for impact
  const line1Start = 30;
  const line2Start = 70;
  const holdUntil = 220;
  const flickerFrame = 230;
  const fadeStart = 245;

  // Line 1: "Every business school talks about"
  const line1Progress = spring({
    frame: frame - line1Start,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Line 2: "real-world experience." — lands with weight
  const line2Progress = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  // Subtle flicker before transition — just a hint of disruption
  const isFlicker = frame >= flickerFrame && frame <= flickerFrame + 2;
  const flickerOpacity = isFlicker ? 0.7 : 1;

  // Clean fade out
  const fadeOut = interpolate(
    frame,
    [fadeStart, 270],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Fade in from black
  const fadeIn = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const sceneOpacity = fadeIn * fadeOut * flickerOpacity;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity: sceneOpacity,
      }}
    >
      {/* Main text — centered, simple, confident */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 120px",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.headline,
            fontWeight: 400,
            color: COLORS.textPrimary,
            textAlign: "center",
            letterSpacing: 0.5,
            opacity: line1Progress,
            transform: `translateY(${interpolate(line1Progress, [0, 1], [15, 0])}px)`,
          }}
        >
          Every business school talks about
        </div>

        {/* Line 2 — the cliché, in italics */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.headline,
            fontWeight: 400,
            fontStyle: "italic",
            color: COLORS.textPrimary,
            textAlign: "center",
            opacity: line2Progress,
            transform: `translateY(${interpolate(line2Progress, [0, 1], [15, 0])}px)`,
          }}
        >
          real-world experience.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
