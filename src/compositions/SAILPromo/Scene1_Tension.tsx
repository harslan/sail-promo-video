import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { serifFont } from "./shared/AnimatedText";
import { COLORS, TYPE_SCALE, TYPE_SCALE_HORIZONTAL, EASE_SMOOTH } from "./shared/constants";

type Scene1TensionProps = {
  horizontal?: boolean;
};

export const Scene1Tension: React.FC<Scene1TensionProps> = ({ horizontal = false }) => {
  const typeScale = horizontal ? TYPE_SCALE_HORIZONTAL : TYPE_SCALE;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 300 frames (10 seconds)
  // This is PROVOCATION. Not facts. Feeling.
  //
  // "AI can judge." - frame 20
  // "It can analyze, recommend, even question." - frame 75
  // "What it cannot do—" - frame 140
  // "—is own what happens next." - frame 175
  // "That's yours." - frame 230 (THE TURN - warm, gold, hopeful)
  // Fade out - 270-300

  const line1Start = 20;
  const line2Start = 75;
  const line3aStart = 140;
  const line3bStart = 175;
  const line4Start = 230;
  const fadeOutStart = 275;
  const fadeOutEnd = 300;

  // Animations
  const line1 = spring({
    frame: frame - line1Start,
    fps,
    config: { damping: 200 },
  });

  const line2 = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 200 },
  });

  const line3a = spring({
    frame: frame - line3aStart,
    fps,
    config: { damping: 200 },
  });

  const line3b = spring({
    frame: frame - line3bStart,
    fps,
    config: { damping: 15, stiffness: 80 }, // Heavier, more deliberate
  });

  const line4 = spring({
    frame: frame - line4Start,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Fade out previous lines when "That's yours" appears
  const previousLinesFade = interpolate(
    frame,
    [line4Start - 10, line4Start + 20],
    [1, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Global fade out
  const fadeOut = interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_SMOOTH,
  });

  // Warm glow that appears with "That's yours"
  const warmGlow = interpolate(frame, [line4Start, line4Start + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity: fadeOut,
      }}
    >
      {/* Warm glow behind "That's yours" */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.suffolkGold}30 0%, transparent 70%)`,
          opacity: warmGlow * 0.6,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 35,
        }}
      >
        {/* Line 1: "AI can judge." */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: typeScale.headline,
            fontWeight: 400,
            color: COLORS.textPrimary,
            opacity: line1 * previousLinesFade,
            transform: `translateY(${interpolate(line1, [0, 1], [15, 0])}px)`,
          }}
        >
          AI can judge.
        </div>

        {/* Line 2: "It can analyze, recommend, even question." */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: typeScale.subtitle,
            fontWeight: 300,
            color: COLORS.textMuted,
            opacity: line2 * previousLinesFade,
            transform: `translateY(${interpolate(line2, [0, 1], [15, 0])}px)`,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          It can analyze, recommend, even question.
        </div>

        {/* Line 3a: "What it cannot do—" */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: typeScale.headline,
            fontWeight: 400,
            color: COLORS.textPrimary,
            opacity: line3a * previousLinesFade,
            transform: `translateY(${interpolate(line3a, [0, 1], [15, 0])}px)`,
            marginTop: 20,
          }}
        >
          What it cannot do—
        </div>

        {/* Line 3b: "—is own what happens next." */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: typeScale.headline * 1.1,
            fontWeight: 600,
            color: COLORS.textPrimary,
            opacity: line3b * previousLinesFade,
            transform: `translateY(${interpolate(line3b, [0, 1], [20, 0])}px) scale(${interpolate(line3b, [0, 1], [0.95, 1])})`,
          }}
        >
          —is{" "}
          <span style={{ color: COLORS.suffolkGold }}>own</span> what happens
          next.
        </div>

        {/* Line 4: "That's yours." - THE TURN */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: typeScale.title,
            fontWeight: 600,
            color: COLORS.suffolkGold,
            opacity: line4,
            transform: `translateY(${interpolate(line4, [0, 1], [25, 0])}px) scale(${interpolate(line4, [0, 1], [0.9, 1])})`,
            marginTop: 30,
            textShadow: `0 0 40px ${COLORS.suffolkGold}50`,
          }}
        >
          That&apos;s yours.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
