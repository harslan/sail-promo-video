import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { sansFont, serifFont } from "./shared/AnimatedText";
import {
  COLORS,
  TYPE_SCALE,
  TYPE_SCALE_HORIZONTAL,
  EASE_SMOOTH,
  SPRING_SMOOTH,
} from "./shared/constants";

type Scene2StakesProps = {
  horizontal?: boolean;
};

export const Scene2Stakes: React.FC<Scene2StakesProps> = ({ horizontal = false }) => {
  const typeScale = horizontal ? TYPE_SCALE_HORIZONTAL : TYPE_SCALE;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 330 frames (11 seconds) - EXTENDED for pause
  //
  // REFRAMED: The stakes are about OWNERSHIP, not just cognitive debt
  //
  // "What happens when AI decides..."
  // "...and you just let it?"
  // [Meter fills — behaviors drift past]
  // Crack — then the uncomfortable question:
  // "Who owns that decision now?"
  // [HOLD - let the discomfort sit for 3 seconds]
  //
  // This ties MIT research to our ownership throughline.

  const line1Start = 15;
  const line2Start = 50;
  const meterStart = 75;
  const labelsStart = 85;
  const crackStart = 170;
  const questionStart = 185;
  // EXTENDED: Hold on the question before fading
  const fadeOutStart = 300; // Was 220 - now holds 3+ seconds longer
  const fadeOutEnd = 330; // Was 240

  // Line animations
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

  // Fade out
  const fadeOut = interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_SMOOTH,
  });

  // Meter progress
  const meterProgress = interpolate(
    frame,
    [meterStart, crackStart - 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    }
  );

  // Crack effect
  const crackProgress = spring({
    frame: frame - crackStart,
    fps,
    config: { ...SPRING_SMOOTH, stiffness: 150 },
  });

  // The uncomfortable question
  const questionEntry = spring({
    frame: frame - questionStart,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Lines fade when question appears
  const linesFade = interpolate(
    frame,
    [questionStart - 5, questionStart + 20],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Drifting labels - the behaviors that lead to abdicated ownership
  const labels = [
    { text: "let it decide", delay: 0 },
    { text: "didn't verify", delay: 15 },
    { text: "assumed it was right", delay: 30 },
    { text: "skipped the check", delay: 45 },
    { text: "trusted the output", delay: 60 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          gap: 20,
        }}
      >
        {/* Opening question - two parts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: linesFade,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.subtitle,
              fontWeight: 400,
              color: COLORS.textPrimary,
              textAlign: "center",
              opacity: line1,
              transform: `translateY(${interpolate(line1, [0, 1], [15, 0])}px)`,
            }}
          >
            What happens when AI decides...
          </div>

          <div
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.subtitle,
              fontWeight: 400,
              fontStyle: "italic",
              color: COLORS.textMuted,
              textAlign: "center",
              opacity: line2,
              transform: `translateY(${interpolate(line2, [0, 1], [15, 0])}px)`,
            }}
          >
            ...and you just let it?
          </div>
        </div>

        {/* The meter - visualizing abdicated ownership */}
        <div
          style={{
            width: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            marginTop: 35,
            opacity: interpolate(frame, [meterStart, meterStart + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) * linesFade,
          }}
        >
          {/* Meter container */}
          <div
            style={{
              width: "100%",
              height: 24,
              backgroundColor: COLORS.bgCard,
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${COLORS.textGhost}`,
            }}
          >
            {/* Fill bar */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${meterProgress * 100}%`,
                background:
                  meterProgress > 0.75
                    ? `linear-gradient(90deg, ${COLORS.sailCoral}, #FF4444)`
                    : `linear-gradient(90deg, ${COLORS.textDim}, ${COLORS.sailCoral})`,
                borderRadius: 12,
              }}
            />

            {/* Crack overlay */}
            {crackProgress > 0 && (
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: crackProgress,
                }}
                viewBox="0 0 420 24"
                preserveAspectRatio="none"
              >
                <path
                  d="M210,0 L203,7 L215,12 L203,17 L210,24"
                  stroke={COLORS.textPrimary}
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray={100}
                  strokeDashoffset={interpolate(crackProgress, [0, 1], [100, 0])}
                />
                <path
                  d="M185,0 L192,6 L180,12 L192,18 L185,24"
                  stroke={COLORS.textPrimary}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray={100}
                  strokeDashoffset={interpolate(crackProgress, [0, 1], [100, 0])}
                  opacity={0.5}
                />
                <path
                  d="M235,0 L228,5 L240,12 L228,19 L235,24"
                  stroke={COLORS.textPrimary}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray={100}
                  strokeDashoffset={interpolate(crackProgress, [0, 1], [100, 0])}
                  opacity={0.5}
                />
              </svg>
            )}
          </div>

          {/* Small label */}
          <span
            style={{
              fontFamily: sansFont,
              fontSize: typeScale.micro,
              color: COLORS.textDim,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Decisions delegated
          </span>
        </div>

        {/* THE UNCOMFORTABLE QUESTION */}
        {frame >= questionStart - 5 && (
          <div
            style={{
              marginTop: 40,
              opacity: questionEntry,
              transform: `translateY(${interpolate(questionEntry, [0, 1], [20, 0])}px) scale(${interpolate(questionEntry, [0, 1], [0.95, 1])})`,
            }}
          >
            <div
              style={{
                fontFamily: serifFont,
                fontSize: typeScale.title, // BIGGER - this question needs weight
                fontWeight: 600,
                color: COLORS.sailCoral,
                textAlign: "center",
                textShadow: `0 0 60px ${COLORS.sailCoral}50`,
              }}
            >
              Who owns that decision now?
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* Floating drift labels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: linesFade,
        }}
      >
        {labels.map((label, index) => {
          const labelFrame = frame - labelsStart - label.delay;
          const y = interpolate(labelFrame, [0, 90], [1350, 700], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const opacity = interpolate(
            labelFrame,
            [0, 12, 60, 90],
            [0, 0.45, 0.45, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          // Stagger x positions
          const xPositions = [350, 730, 280, 800, 540];
          const x = xPositions[index % xPositions.length];

          return (
            <div
              key={label.text}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                fontFamily: sansFont,
                fontSize: typeScale.caption,
                color: COLORS.textDim,
                fontStyle: "italic",
                opacity,
                whiteSpace: "nowrap",
              }}
            >
              &ldquo;{label.text}&rdquo;
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
