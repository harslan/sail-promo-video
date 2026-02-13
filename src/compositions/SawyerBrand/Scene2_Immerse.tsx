import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import React from "react";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";
import { SawyerBrandProps } from "./schema";

const { fontFamily: serifFont } = loadCormorant();
const { fontFamily: sansFont } = loadDMSans();

type Scene2Props = {
  immerse: SawyerBrandProps["immerse"];
};

/**
 * Scene 2: THE IMMERSE REALITY (21 seconds / 630 frames)
 *
 * Fast, energetic montage showing what IMMERSE actually looks like.
 * This should feel like a movie trailer. Impressive. Alive.
 */
export const Scene2Immerse: React.FC<Scene2Props> = ({ immerse }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing
  const openingEnd = 90; // 3 seconds
  const montageStart = 90;
  const montageEnd = 540; // 18 seconds of montage
  const assemblyStart = 540;
  const assemblyEnd = 630;

  // Opening text
  const openingOpacity = interpolate(
    frame,
    [0, 20, openingEnd - 20, openingEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Calculate which experience card is active
  const cardDuration = 65; // ~2.2 seconds per card
  const cardOverlap = 15;
  const effectiveCardDuration = cardDuration - cardOverlap;

  const getCardProgress = (index: number) => {
    const cardStart = montageStart + index * effectiveCardDuration;
    const localFrame = frame - cardStart;

    const enter = interpolate(localFrame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    });

    const exit = interpolate(localFrame, [cardDuration - 25, cardDuration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return { enter, exit, visible: localFrame > -10 && localFrame < cardDuration + 10 };
  };

  // Assembly progress
  const assemblyProgress = interpolate(
    frame,
    [assemblyStart, assemblyEnd - 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Tagline and award fade in
  const taglineProgress = interpolate(
    frame,
    [assemblyStart + 40, assemblyStart + 70],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [assemblyEnd - 15, assemblyEnd],
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
      {/* Animated grid background during montage */}
      {frame >= montageStart && frame < assemblyStart && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `
              linear-gradient(${COLORS.sailTeal}40 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.sailTeal}40 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${-frame * 0.3}px)`,
          }}
        />
      )}

      {/* Opening text: "This is what it actually looks like." */}
      {frame < openingEnd + 20 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: openingOpacity,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.headline,
              fontWeight: 400,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            This is what it{" "}
            <span style={{ fontStyle: "italic", color: COLORS.sailTeal }}>
              actually
            </span>{" "}
            looks like.
          </div>
        </AbsoluteFill>
      )}

      {/* Experience cards montage */}
      {frame >= montageStart - 10 && frame < assemblyStart && (
        <AbsoluteFill>
          {immerse.experiences.map((exp, index) => {
            const { enter, exit, visible } = getCardProgress(index);
            if (!visible) return null;

            const opacity = enter * exit;
            const scale = interpolate(enter, [0, 1], [0.9, 1]);
            const x = interpolate(enter, [0, 1], [100, 0]);

            return (
              <ExperienceCard
                key={exp.title}
                experience={exp}
                opacity={opacity}
                scale={scale}
                xOffset={x}
                index={index}
              />
            );
          })}
        </AbsoluteFill>
      )}

      {/* IMMERSE letters assembly */}
      {frame >= assemblyStart - 10 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          {/* Letters */}
          <div
            style={{
              display: "flex",
              gap: 16,
            }}
          >
            {immerse.characteristics.map((char, index) => {
              const letterDelay = index * 3;
              const letterProgress = interpolate(
                frame - assemblyStart - letterDelay,
                [0, 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
              );

              return (
                <div
                  key={`${char.letter}-${index}`}
                  style={{
                    fontFamily: serifFont,
                    fontSize: TYPE_SCALE.title,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    opacity: letterProgress,
                    transform: `translateY(${interpolate(letterProgress, [0, 1], [30, 0])}px)`,
                  }}
                >
                  {char.letter}
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
              opacity: taglineProgress,
              transform: `translateY(${interpolate(taglineProgress, [0, 1], [15, 0])}px)`,
            }}
          >
            Immersive learning. Nationally recognized.
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
              opacity: taglineProgress,
              transform: `translateY(${interpolate(taglineProgress, [0, 1], [10, 0])}px)`,
            }}
          >
            {immerse.award}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// Experience card component
const ExperienceCard: React.FC<{
  experience: SawyerBrandProps["immerse"]["experiences"][0];
  opacity: number;
  scale: number;
  xOffset: number;
  index: number;
}> = ({ experience, opacity, scale, xOffset, index }) => {
  // Alternate card positions for visual variety
  const isEven = index % 2 === 0;
  const yOffset = isEven ? -50 : 50;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateX(${xOffset}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: "60px 80px",
          backgroundColor: `${COLORS.bgCard}dd`,
          borderRadius: 20,
          border: `2px solid ${experience.accentColor}50`,
          boxShadow: `0 0 60px ${experience.accentColor}30`,
          transform: `translateY(${yOffset}px)`,
          maxWidth: 900,
        }}
      >
        {/* IMMERSE badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 20px",
            backgroundColor: `${experience.accentColor}20`,
            borderRadius: 30,
            border: `1px solid ${experience.accentColor}50`,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.body,
              fontWeight: 700,
              color: experience.accentColor,
            }}
          >
            [{experience.immerseLetter}]
          </div>
          <div
            style={{
              fontFamily: sansFont,
              fontSize: TYPE_SCALE.caption,
              fontWeight: 500,
              color: experience.accentColor,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {experience.immerseCharacteristic}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.title,
            fontWeight: 600,
            color: COLORS.textPrimary,
            textAlign: "center",
          }}
        >
          {experience.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.subtitle,
            fontWeight: 400,
            color: COLORS.textMuted,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          {experience.description}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 120,
            height: 3,
            backgroundColor: experience.accentColor,
            borderRadius: 2,
            marginTop: 10,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
