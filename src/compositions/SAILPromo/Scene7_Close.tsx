import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { serifFont, sansFont } from "./shared/AnimatedText";
import { PulseHeartbeat } from "./shared/PulseHeartbeat";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";

type Scene7CloseProps = {
  school: {
    name: string;
    university: string;
    url: string;
    accolades: string[];
  };
  framework: {
    name: string;
    tagline: string;
  };
  thesis: {
    promise: string;
  };
};

export const Scene7Close: React.FC<Scene7CloseProps> = ({
  school,
  framework,
  thesis,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 450 frames (15 seconds)
  //
  // RESTRUCTURED: End on FEELING, not credentials
  //
  // Beat 1 (0-120, 4s): The promise - quick, clear
  // Beat 2 (120-210, 3s): Credentials strip - small, fast, credibility only
  // Beat 3 (210-450, 8s): THE CLOSE - the question that stays with them
  //
  // "The question isn't whether you'll work with AI.
  //  It's whether you'll own what happens when you do."
  //
  // This is what they remember. This is what makes them apply.

  const beat1End = 120;
  const beat2End = 210;

  // Beat 1: The promise (fade in, hold, fade out at end)
  const beat1Opacity = interpolate(
    frame,
    [0, 25, beat1End - 25, beat1End],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Beat 2: Credentials (fade in, hold, fade out)
  const beat2Opacity = interpolate(
    frame,
    [beat1End, beat1End + 20, beat2End - 20, beat2End],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Beat 3: The Close
  const closeEntry = spring({
    frame: frame - beat2End,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  const closeOpacity = interpolate(
    frame,
    [beat2End, beat2End + 25, 415, 450],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // The warm glow builds through the close
  const glowIntensity = interpolate(
    frame,
    [beat2End, beat2End + 90, 400],
    [0.2, 0.6, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      {/* Warm ambient glow - intensifies for the close */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.suffolkGold}35 0%, transparent 70%)`,
          opacity: glowIntensity,
        }}
      />

      {/* Beat 1: The Promise */}
      {frame < beat1End && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            opacity: beat1Opacity,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: TYPE_SCALE.headline,
              fontWeight: 400,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {thesis.promise.split(".")[0]}.
            <br />
            <span style={{ color: COLORS.suffolkGold, fontWeight: 600 }}>
              {thesis.promise.split(".")[1]?.trim()}.
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* Beat 2: Credentials Strip (compressed, functional) */}
      {frame >= beat1End && frame < beat2End && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 25,
            opacity: beat2Opacity,
          }}
        >
          {/* School identity - compact */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: serifFont,
                fontSize: TYPE_SCALE.subtitle,
                fontWeight: 600,
                color: COLORS.textPrimary,
              }}
            >
              {school.university}
            </div>
            <div
              style={{
                fontFamily: serifFont,
                fontSize: TYPE_SCALE.body,
                fontWeight: 400,
                color: COLORS.textMuted,
                marginTop: 8,
              }}
            >
              {school.name}
            </div>
          </div>

          {/* SAIL tag */}
          <div
            style={{
              fontFamily: sansFont,
              fontSize: TYPE_SCALE.caption,
              fontWeight: 600,
              color: COLORS.suffolkGold,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {framework.name} — {framework.tagline}
          </div>

          {/* Accolades - horizontal, small */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 20,
              maxWidth: 800,
              marginTop: 10,
            }}
          >
            {school.accolades.slice(0, 3).map((accolade) => (
              <div
                key={accolade}
                style={{
                  fontFamily: sansFont,
                  fontSize: TYPE_SCALE.micro,
                  color: COLORS.textDim,
                  textAlign: "center",
                }}
              >
                {accolade}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      )}

      {/* Beat 3: THE CLOSE - The question that stays with them */}
      {frame >= beat2End && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 50,
            opacity: closeOpacity,
            transform: `translateY(${interpolate(closeEntry, [0, 1], [25, 0])}px)`,
          }}
        >
          {/* The closing question - this is what they remember */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 25,
              padding: "0 60px",
            }}
          >
            {/* First line - the setup */}
            <div
              style={{
                fontFamily: serifFont,
                fontSize: TYPE_SCALE.subtitle,
                fontWeight: 300,
                color: COLORS.textMuted,
                textAlign: "center",
                lineHeight: 1.5,
                opacity: interpolate(
                  frame - beat2End,
                  [0, 35],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              The question isn&apos;t whether
              <br />
              you&apos;ll work with AI.
            </div>

            {/* Second line - THE line */}
            <div
              style={{
                fontFamily: serifFont,
                fontSize: TYPE_SCALE.headline,
                fontWeight: 400,
                color: COLORS.textPrimary,
                textAlign: "center",
                lineHeight: 1.4,
                opacity: interpolate(
                  frame - beat2End,
                  [50, 85],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `scale(${interpolate(
                  frame - beat2End,
                  [50, 85],
                  [0.96, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )})`,
              }}
            >
              It&apos;s whether you&apos;ll{" "}
              <span style={{ color: COLORS.suffolkGold, fontWeight: 600 }}>
                own
              </span>
              <br />
              what happens when you do.
            </div>
          </div>

          {/* URL - subtle, functional */}
          <div
            style={{
              fontFamily: sansFont,
              fontSize: TYPE_SCALE.body,
              fontWeight: 500,
              color: COLORS.textMuted,
              letterSpacing: 1,
              marginTop: 20,
              opacity: interpolate(
                frame - beat2End,
                [100, 120],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            {school.url}
          </div>

          {/* Heartbeat - the final signature */}
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(
                frame - beat2End,
                [130, 150],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <PulseHeartbeat
              size={70}
              color={COLORS.sailCoral}
              delay={0}
            />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
