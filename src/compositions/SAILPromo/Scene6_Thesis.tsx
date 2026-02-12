import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import React from "react";
import { serifFont } from "./shared/AnimatedText";
import { ParticleField } from "./shared/ParticleField";
import { COLORS, TYPE_SCALE } from "./shared/constants";

type Scene6ThesisProps = {
  thesis: {
    line1: string;
    line2: string;
    line3: string;
  };
};

export const Scene6Thesis: React.FC<Scene6ThesisProps> = ({ thesis }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene duration: 300 frames (10 seconds)
  // This is THE moment. Everything builds to this.
  //
  // Frames 0-45: THE BREATH - stillness, anticipation, held breath
  // Line 1: "Skills can be automated." - frames 45-105
  // Line 2: "Judgment can be augmented." - frames 105-180
  // Line 3: "Ownership cannot." - frames 180-300 - THE PUNCHLINE
  //
  // Particles RUSH inward right before line 3 hits

  const breathEnd = 45; // Held breath before the thesis begins
  const line1Start = breathEnd;
  const line2Start = 110;
  const line3Start = 180;
  const impactFrame = line3Start + 15; // The exact moment it lands

  // The breath - particles almost still, then slowly start moving
  const breathIntensity = interpolate(
    frame,
    [0, breathEnd],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Particle convergence - RUSH inward before the hit
  const convergeProgress = interpolate(
    frame,
    [breathEnd, line3Start - 30, line3Start, impactFrame],
    [0, 0.2, 0.5, 0.85],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }
  );

  // Line 1 animation
  const line1Progress = spring({
    frame: frame - line1Start,
    fps,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  const line1FadeOut = interpolate(
    frame,
    [line3Start - 10, line3Start + 5],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Line 2 animation
  const line2Progress = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  const line2FadeOut = interpolate(
    frame,
    [line3Start - 10, line3Start + 5],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Line 3 - THE MOMENT
  // Dramatic entrance: starts bigger, slams into place
  const line3Raw = spring({
    frame: frame - line3Start,
    fps,
    config: { damping: 12, stiffness: 100, mass: 1.2 }, // Heavier, more dramatic
    durationInFrames: 40,
  });

  const line3Progress = Math.min(line3Raw, 1);

  // Scale: starts at 1.15, slams down to 1.0 with slight overshoot
  const line3Scale = interpolate(
    line3Progress,
    [0, 0.7, 0.85, 1],
    [1.15, 1.02, 0.99, 1]
  );

  // The word "cannot" gets extra emphasis
  const cannotGlow = interpolate(
    frame,
    [impactFrame, impactFrame + 30, impactFrame + 90],
    [0, 1, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle glow pulse on impact (no harsh flash)
  const impactGlow = interpolate(
    frame,
    [impactFrame - 2, impactFrame + 5, impactFrame + 20],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Very subtle screen movement on impact
  const shakeIntensity = interpolate(
    frame,
    [impactFrame, impactFrame + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const shakeX = Math.sin(frame * 1.8) * 1.5 * shakeIntensity;
  const shakeY = Math.cos(frame * 2.2) * 1 * shakeIntensity;

  // Glow bloom that builds and sustains
  const glowIntensity = interpolate(
    frame,
    [line3Start, impactFrame, impactFrame + 60],
    [0, 0.6, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Radial lines that burst outward on impact
  const burstProgress = interpolate(
    frame,
    [impactFrame, impactFrame + 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const burstOpacity = interpolate(
    frame,
    [impactFrame, impactFrame + 15, impactFrame + 45],
    [0, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      {/* Converging particle field - still during breath, then RUSHES inward */}
      <ParticleField
        count={70}
        intensity={breathIntensity + convergeProgress * 0.8}
        convergeToCenter={convergeProgress}
      />

      {/* Subtle impact glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${COLORS.suffolkGold}30 0%, transparent 50%)`,
          opacity: impactGlow,
          pointerEvents: "none",
        }}
      />

      {/* Radial burst lines on impact */}
      {burstProgress > 0 && (
        <svg
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            height: 1200,
            opacity: burstOpacity,
            pointerEvents: "none",
          }}
          viewBox="0 0 1200 1200"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const innerRadius = 100 + burstProgress * 200;
            const outerRadius = 200 + burstProgress * 400;
            return (
              <line
                key={i}
                x1={600 + Math.cos(angle) * innerRadius}
                y1={600 + Math.sin(angle) * innerRadius}
                x2={600 + Math.cos(angle) * outerRadius}
                y2={600 + Math.sin(angle) * outerRadius}
                stroke={COLORS.suffolkGold}
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}

      {/* Central glow bloom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000 + glowIntensity * 200,
          height: 1000 + glowIntensity * 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.suffolkGold}40 0%, ${COLORS.suffolkGold}20 30%, transparent 70%)`,
          opacity: glowIntensity * 0.6,
          pointerEvents: "none",
        }}
      />

      {/* Content container with shake */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* Line 1: "Skills can be automated." */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.headline,
            fontWeight: 300,
            color: COLORS.textPrimary,
            opacity: line1Progress * line1FadeOut,
            transform: `translateY(${interpolate(line1Progress, [0, 1], [20, 0])}px)`,
          }}
        >
          {thesis.line1}
        </div>

        {/* Line 2: "Judgment can be augmented." */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.headline * 1.05,
            fontWeight: 400,
            color: COLORS.textPrimary,
            opacity: line2Progress * line2FadeOut,
            transform: `translateY(${interpolate(line2Progress, [0, 1], [20, 0])}px)`,
          }}
        >
          {thesis.line2}
        </div>

        {/* Line 3: "Ownership cannot." - THE MOMENT */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.hero * 1.1,
            fontWeight: 700,
            color: COLORS.textPrimary,
            opacity: line3Progress,
            transform: `translateY(${interpolate(line3Progress, [0, 1], [40, 0])}px) scale(${line3Scale})`,
            marginTop: 20,
          }}
        >
          <span
            style={{
              color: COLORS.suffolkGold,
              textShadow: `
                0 0 ${40 + cannotGlow * 60}px ${COLORS.suffolkGold},
                0 0 ${80 + cannotGlow * 80}px ${COLORS.suffolkGold}60
              `,
            }}
          >
            {thesis.line3.split(" ")[0]}
          </span>{" "}
          <span
            style={{
              textShadow: cannotGlow > 0.3
                ? `0 0 ${cannotGlow * 40}px ${COLORS.textPrimary}60`
                : undefined,
            }}
          >
            {thesis.line3.split(" ").slice(1).join(" ")}
          </span>
        </div>
      </AbsoluteFill>

      {/* Vignette - tighter during breath, then intensifies at climax */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 30%, ${COLORS.bgDeep}90 100%)`,
          opacity: interpolate(
            frame,
            [0, breathEnd, line3Start, impactFrame + 30],
            [0.5, 0.35, 0.35, 0.6],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
