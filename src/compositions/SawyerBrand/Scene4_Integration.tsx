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

type Scene4Props = {
  sail: SawyerBrandProps["sail"];
};

/**
 * Scene 4: SAIL MEETS IMMERSE (16 seconds / 480 frames)
 *
 * Show how SAIL competencies are forged inside IMMERSE experiences.
 * This is the integration — the thing no other school has.
 */
export const Scene4Integration: React.FC<Scene4Props> = ({ sail }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing — Leadership pillar gets more time (it's the climax)
  const openingEnd = 105; // 3.5 seconds for SAIL intro — let award breathe
  const pillarDuration = 85; // 2.8 seconds for S, A, I
  const leadershipDuration = 110; // 3.7 seconds for L — the ownership moment
  const pillarStarts = [105, 190, 275, 360]; // Adjusted for extended opening

  // Opening: SAIL letters + award
  const openingOpacity = interpolate(
    frame,
    [0, 20, openingEnd - 15, openingEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Which pillar is active (Leadership gets more time)
  const activePillarIndex =
    frame < pillarStarts[0]
      ? -1
      : frame < pillarStarts[1]
        ? 0
        : frame < pillarStarts[2]
          ? 1
          : frame < pillarStarts[3]
            ? 2
            : frame < pillarStarts[3] + leadershipDuration
              ? 3
              : -1;

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [465, 480],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity: sceneOpacity,
      }}
    >
      {/* Opening: SAIL letters + award */}
      {frame < openingEnd + 10 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            opacity: openingOpacity,
          }}
        >
          {/* SAIL letters */}
          <div style={{ display: "flex", gap: 20 }}>
            {sail.pillars.map((pillar, index) => {
              const letterProgress = spring({
                frame: frame - 10 - index * 4,
                fps,
                config: { damping: 15, stiffness: 120 },
              });

              return (
                <div
                  key={pillar.letter}
                  style={{
                    fontFamily: serifFont,
                    fontSize: TYPE_SCALE.title,
                    fontWeight: 700,
                    color: pillar.color,
                    opacity: letterProgress,
                    transform: `translateY(${interpolate(letterProgress, [0, 1], [30, 0])}px)`,
                    textShadow: `0 0 30px ${pillar.color}50`,
                  }}
                >
                  {pillar.letter}
                </div>
              );
            })}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: sansFont,
              fontSize: TYPE_SCALE.body,
              fontWeight: 500,
              color: COLORS.textMuted,
              opacity: interpolate(frame, [30, 50], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {sail.tagline}
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
              opacity: interpolate(frame, [45, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {sail.award}
          </div>
        </AbsoluteFill>
      )}

      {/* Individual pillar mappings */}
      {activePillarIndex >= 0 && activePillarIndex <= 3 && (
        <PillarMapping
          pillar={sail.pillars[activePillarIndex]}
          frame={frame - pillarStarts[activePillarIndex]}
          fps={fps}
          isLeadership={activePillarIndex === 3}
          isInquiry={activePillarIndex === 2}
          duration={activePillarIndex === 3 ? leadershipDuration : pillarDuration}
        />
      )}
    </AbsoluteFill>
  );
};

// Individual pillar mapping component
const PillarMapping: React.FC<{
  pillar: SawyerBrandProps["sail"]["pillars"][0];
  frame: number;
  fps: number;
  isLeadership: boolean;
  isInquiry: boolean;
  duration: number;
}> = ({ pillar, frame, fps, isLeadership, isInquiry, duration }) => {
  // Entrance animation
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Staggered elements
  const letterProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const nameProgress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200 },
  });

  const questionProgress = spring({
    frame: frame - 16,
    fps,
    config: { damping: 200 },
  });

  const exampleProgress = spring({
    frame: frame - 28,
    fps,
    config: { damping: 200 },
  });

  const badgeProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 200 },
  });

  // "— unprompted" for Inquiry pillar — this moment matters, bring it in earlier
  const unpromptedProgress = spring({
    frame: frame - 48,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Exit fade — uses duration to let Leadership breathe longer
  const exitOpacity = interpolate(frame, [duration - 12, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          padding: "0 100px",
        }}
      >
        {/* Left side: SAIL pillar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            minWidth: 300,
          }}
        >
          {/* Letter */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: 140,
              fontWeight: 700,
              color: pillar.color,
              opacity: letterProgress,
              transform: `scale(${interpolate(letterProgress, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 60px ${pillar.color}50`,
              lineHeight: 1,
            }}
          >
            {pillar.letter}
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.subtitle,
              fontWeight: 500,
              color: COLORS.textPrimary,
              opacity: nameProgress,
              transform: `translateY(${interpolate(nameProgress, [0, 1], [15, 0])}px)`,
            }}
          >
            {pillar.name}
          </div>

          {/* Question */}
          <div
            style={{
              fontFamily: isLeadership ? serifFont : sansFont,
              fontSize: TYPE_SCALE.body,
              fontWeight: isLeadership ? 600 : 400,
              fontStyle: isLeadership ? "normal" : "italic",
              color: isLeadership ? pillar.color : COLORS.textMuted,
              opacity: questionProgress,
              transform: `translateY(${interpolate(questionProgress, [0, 1], [10, 0])}px)`,
              textShadow: isLeadership ? `0 0 20px ${pillar.color}40` : undefined,
            }}
          >
            {isLeadership ? `"${pillar.question}"` : pillar.question}
          </div>
        </div>

        {/* Arrow connector */}
        <div
          style={{
            opacity: exampleProgress,
            transform: `translateX(${interpolate(exampleProgress, [0, 1], [-20, 0])}px)`,
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path
              d="M 0 20 L 45 20 M 35 10 L 50 20 L 35 30"
              stroke={pillar.color}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right side: Real IMMERSE example */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20,
            maxWidth: 600,
            opacity: exampleProgress,
            transform: `translateX(${interpolate(exampleProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Example text */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.subtitle,
              fontWeight: 400,
              color: COLORS.textPrimary,
              lineHeight: 1.5,
            }}
          >
            {pillar.realExample}
          </div>

          {/* "— unprompted" for Inquiry */}
          {isInquiry && (
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.body,
                fontWeight: 700,
                color: COLORS.sailCoral,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: unpromptedProgress,
                transform: `translateY(${interpolate(unpromptedProgress, [0, 1], [15, 0])}px) scale(${interpolate(unpromptedProgress, [0, 1], [0.9, 1])})`,
                textShadow: `0 0 20px ${COLORS.sailCoral}50`,
              }}
            >
              — unprompted
            </div>
          )}

          {/* IMMERSE badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              backgroundColor: `${pillar.color}15`,
              borderRadius: 20,
              border: `1px solid ${pillar.color}40`,
              opacity: badgeProgress,
              transform: `translateY(${interpolate(badgeProgress, [0, 1], [10, 0])}px)`,
            }}
          >
            <div
              style={{
                fontFamily: serifFont,
                fontSize: TYPE_SCALE.caption,
                fontWeight: 700,
                color: pillar.color,
              }}
            >
              [{pillar.immerseLetter}]
            </div>
            <div
              style={{
                fontFamily: sansFont,
                fontSize: TYPE_SCALE.micro,
                fontWeight: 500,
                color: pillar.color,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {pillar.immerseCharacteristic}
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind for Leadership */}
      {isLeadership && (
        <div
          style={{
            position: "absolute",
            left: "25%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.suffolkGold}25 0%, transparent 70%)`,
            opacity: letterProgress * 0.7,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
