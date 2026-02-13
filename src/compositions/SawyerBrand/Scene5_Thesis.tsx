import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";
import { SawyerBrandProps } from "./schema";

const { fontFamily: serifFont } = loadCormorant();
const { fontFamily: sansFont } = loadDMSans();

type Scene5Props = {
  immerse: SawyerBrandProps["immerse"];
  sail: SawyerBrandProps["sail"];
  thesis: SawyerBrandProps["thesis"];
};

/**
 * Scene 5: THE THESIS (10 seconds / 300 frames)
 *
 * Beat 1: Two frameworks side by side
 * Beat 2: The three-beat thesis that lands the argument
 *
 * This is the climax. The whole video has been building to this.
 */
export const Scene5Thesis: React.FC<Scene5Props> = ({ immerse, sail, thesis }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing — the thesis is the climax. Each beat must land.
  const beat1End = 110; // 3.7 seconds for frameworks side by side
  const beat2Start = 120; // Clean break — frameworks gone, then thesis begins
  const line1Start = beat2Start + 5; // "Skills can be automated."
  const line2Start = line1Start + 45; // 1.5s to let line 1 land
  const line3Start = line2Start + 45; // 1.5s to let line 2 land
  const closerStart = line3Start + 55; // 1.8s — "Ownership cannot." needs to breathe

  // Beat 1: Two frameworks side by side
  const immerseProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const sailProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const frameworksFade = interpolate(
    frame,
    [beat1End - 20, beat1End],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "Two award-winning frameworks. One school."
  const twoFrameworksProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 200 },
  });

  // Thesis lines
  const line1Progress = spring({
    frame: frame - line1Start,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const line2Progress = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const line3Progress = spring({
    frame: frame - line3Start,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const closerProgress = spring({
    frame: frame - closerStart,
    fps,
    config: { damping: 200 },
  });

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [285, 300],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Line visibility — thesis lines accumulate, building to the climax
  // Earlier lines dim slightly but remain visible as we build
  const line1Opacity = interpolate(
    frame,
    [line1Start, line1Start + 20, line3Start, line3Start + 15],
    [0, 1, 1, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const line2Opacity = interpolate(
    frame,
    [line2Start, line2Start + 20, line3Start, line3Start + 15],
    [0, 1, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const line3Opacity = interpolate(
    frame,
    [line3Start, line3Start + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity: sceneOpacity,
      }}
    >
      {/* Beat 1: Two frameworks side by side */}
      {frame < beat1End + 10 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 120,
            opacity: frameworksFade,
          }}
        >
          {/* IMMERSE side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: immerseProgress,
              transform: `translateX(${interpolate(immerseProgress, [0, 1], [-50, 0])}px)`,
            }}
          >
            {/* IMMERSE letters */}
            <div style={{ display: "flex", gap: 8 }}>
              {immerse.characteristics.map((char, index) => (
                <div
                  key={`${char.letter}-${index}`}
                  style={{
                    fontFamily: serifFont,
                    fontSize: TYPE_SCALE.headline,
                    fontWeight: 700,
                    color: COLORS.sailTeal,
                  }}
                >
                  {char.letter}
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.body,
                fontWeight: 500,
                color: COLORS.textMuted,
              }}
            >
              How you learn.
            </div>

            {/* Award */}
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.caption,
                fontWeight: 600,
                color: COLORS.suffolkGold,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {immerse.award}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 2,
              height: 150,
              backgroundColor: COLORS.textDim,
              opacity: Math.min(immerseProgress, sailProgress) * 0.5,
            }}
          />

          {/* SAIL side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: sailProgress,
              transform: `translateX(${interpolate(sailProgress, [0, 1], [50, 0])}px)`,
            }}
          >
            {/* SAIL letters */}
            <div style={{ display: "flex", gap: 12 }}>
              {sail.pillars.map((pillar) => (
                <div
                  key={pillar.letter}
                  style={{
                    fontFamily: serifFont,
                    fontSize: TYPE_SCALE.headline,
                    fontWeight: 700,
                    color: pillar.color,
                    textShadow: `0 0 20px ${pillar.color}40`,
                  }}
                >
                  {pillar.letter}
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.body,
                fontWeight: 500,
                color: COLORS.textMuted,
              }}
            >
              Who you become.
            </div>

            {/* Award */}
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.caption,
                fontWeight: 600,
                color: COLORS.suffolkGold,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {sail.award}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* "Two award-winning frameworks. One school." */}
      {frame >= 50 && frame < beat1End + 10 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: twoFrameworksProgress * frameworksFade,
            transform: `translateY(${interpolate(twoFrameworksProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.subtitle,
              fontWeight: 400,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            Two award-winning frameworks.{" "}
            <span style={{ fontWeight: 500, color: COLORS.suffolkGold }}>
              One school.
            </span>
          </div>
        </div>
      )}

      {/* Beat 2: The three-beat thesis */}
      {frame >= beat2Start && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            padding: "0 100px",
          }}
        >
          {/* Line 1: Skills can be automated */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.subtitle,
              fontWeight: 300,
              color: COLORS.textMuted,
              textAlign: "center",
              opacity: line1Opacity,
              transform: `translateY(${interpolate(line1Progress, [0, 1], [20, 0])}px)`,
            }}
          >
            {thesis.line1}
          </div>

          {/* Line 2: Judgment can be augmented */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.subtitle,
              fontWeight: 400,
              color: COLORS.textMuted,
              textAlign: "center",
              opacity: line2Opacity,
              transform: `translateY(${interpolate(line2Progress, [0, 1], [20, 0])}px)`,
            }}
          >
            {thesis.line2}
          </div>

          {/* Line 3: Ownership cannot */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.headline,
              fontWeight: 600,
              color: COLORS.textPrimary,
              textAlign: "center",
              opacity: line3Opacity,
              transform: `translateY(${interpolate(line3Progress, [0, 1], [25, 0])}px) scale(${interpolate(line3Progress, [0, 1], [0.95, 1])})`,
              textShadow: `0 0 40px ${COLORS.suffolkGold}30`,
            }}
          >
            {thesis.line3}
          </div>

          {/* Closer: And ownership is built here */}
          <div
            style={{
              fontFamily: sansFont,
              fontSize: TYPE_SCALE.body,
              fontWeight: 500,
              color: COLORS.suffolkGold,
              textAlign: "center",
              marginTop: 20,
              opacity: closerProgress,
              transform: `translateY(${interpolate(closerProgress, [0, 1], [15, 0])}px)`,
            }}
          >
            {thesis.closer}
          </div>
        </AbsoluteFill>
      )}

      {/* Subtle glow behind thesis */}
      {frame >= line3Start && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.suffolkGold}15 0%, transparent 70%)`,
            opacity: interpolate(frame - line3Start, [0, 30], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
