import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";

const { fontFamily: serifFont } = loadCormorant();

/**
 * Scene 3: THE PIVOT (7 seconds / 210 frames)
 *
 * The turn. Experience alone is not enough.
 * "But experience without a framework is just activity."
 * "What if the experience also developed something AI cannot replicate?"
 *
 * This is the hinge — the moment the video becomes an argument, not just a reel.
 * Quiet. Thoughtful. Like someone stopped the music.
 */
export const Scene3Pivot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing — the pivot needs to breathe (thoughtful pause)
  const line1Start = 15;
  const line1End = 85;
  const line2Start = 110; // 25 frame pause (0.8s) — let it land
  const fadeOut = 200;

  // Line 1: "But experience without a framework is just activity."
  const line1Progress = spring({
    frame: frame - line1Start,
    fps,
    config: { damping: 200 },
  });

  const line1Opacity = interpolate(
    frame,
    [line1Start, line1Start + 20, line1End, line1End + 20],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Line 2: "What if the experience also developed something AI cannot replicate?"
  const line2Progress = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 200 },
  });

  const line2Opacity = interpolate(
    frame,
    [line2Start, line2Start + 25, fadeOut, 210],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle vignette that tightens during this scene
  const vignetteIntensity = interpolate(
    frame,
    [0, 100, 210],
    [0.3, 0.5, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
      }}
    >
      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 20%, ${COLORS.bgDeep} 80%)`,
          opacity: vignetteIntensity,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "0 120px",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.headline,
            fontWeight: 300,
            color: COLORS.textMuted,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: line1Opacity,
            transform: `translateY(${interpolate(line1Progress, [0, 1], [20, 0])}px)`,
          }}
        >
          But experience without a framework
          <br />
          is just{" "}
          <span style={{ fontStyle: "italic", color: COLORS.textDim }}>
            activity.
          </span>
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.subtitle,
            fontWeight: 400,
            color: COLORS.textPrimary,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 900,
            opacity: line2Opacity,
            transform: `translateY(${interpolate(line2Progress, [0, 1], [15, 0])}px)`,
          }}
        >
          What if the experience also developed
          <br />
          <span
            style={{
              color: COLORS.suffolkGold,
              fontWeight: 500,
            }}
          >
            something AI cannot replicate?
          </span>
        </div>
      </AbsoluteFill>

      {/* Subtle gold glow hint at the bottom - foreshadowing SAIL */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.suffolkGold}15 0%, transparent 70%)`,
          opacity: interpolate(frame, [line2Start, 180], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
