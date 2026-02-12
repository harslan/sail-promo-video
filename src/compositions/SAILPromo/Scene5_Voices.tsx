import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { serifFont, sansFont } from "./shared/AnimatedText";
import { COLORS, TYPE_SCALE, TYPE_SCALE_HORIZONTAL, EASE_SMOOTH } from "./shared/constants";

type Quote = {
  text: string;
  attribution: string;
};

type Scene5VoicesProps = {
  quotes: Quote[];
  horizontal?: boolean;
};

export const Scene5Voices: React.FC<Scene5VoicesProps> = ({ quotes, horizontal = false }) => {
  const typeScale = horizontal ? TYPE_SCALE_HORIZONTAL : TYPE_SCALE;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 360 frames (12 seconds)
  //
  // This scene is about the ORCHESTRA QUOTE. Everything builds to it.
  //
  // Structure:
  // frames 0-120 (4s): Setup quote - "I used to think AI either gave you..."
  // frames 120-150 (1s): Transition pause - let it breathe
  // frames 150-330 (6s): THE MOMENT - orchestra quote, full weight
  // frames 330-360 (1s): Fade out
  //
  // The orchestra quote is the reveal. It's the moment students "get it."

  const quote1End = 120;
  const pauseEnd = 150;
  const fadeOutStart = 310;
  const breathStart = 340; // The "breath before the drop" - fade to stillness

  // Quote 1: Setup (shorter, sets the stage)
  const quote1Opacity = interpolate(
    frame,
    [15, 35, quote1End - 20, quote1End],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // THE MOMENT: Orchestra quote
  const orchestraEntry = spring({
    frame: frame - pauseEnd,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const orchestraOpacity = interpolate(
    frame,
    [pauseEnd, pauseEnd + 40, fadeOutStart, breathStart],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // The breath - everything fades to stillness before Scene 6
  const breathFade = interpolate(
    frame,
    [breathStart, 360],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // The warm glow intensifies for the orchestra quote
  const glowIntensity = interpolate(
    frame,
    [0, pauseEnd, pauseEnd + 60],
    [0.3, 0.3, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Get the quotes - quote[0] is setup, quote[1] is orchestra
  const setupQuote = quotes[0];
  const orchestraQuote = quotes[1];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
      }}
    >
      {/* Warm glow - intensifies for orchestra quote, dims for breath */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.suffolkGold}40 0%, transparent 70%)`,
          opacity: glowIntensity * breathFade,
        }}
      />

      {/* Quote 1: The Setup */}
      {frame < quote1End + 30 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            gap: 30,
            opacity: quote1Opacity,
          }}
        >
          <div
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.body,
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.textMuted,
              textAlign: "center",
              lineHeight: 1.7,
              maxWidth: 750,
            }}
          >
            &ldquo;{setupQuote?.text}&rdquo;
          </div>

          <div
            style={{
              fontFamily: sansFont,
              fontSize: typeScale.micro,
              color: COLORS.textDim,
              fontWeight: 500,
            }}
          >
            — {setupQuote?.attribution}
          </div>
        </AbsoluteFill>
      )}

      {/* THE MOMENT: Orchestra Quote */}
      {frame >= pauseEnd - 10 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            gap: 40,
            opacity: orchestraOpacity,
            transform: `translateY(${interpolate(orchestraEntry, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Giant quote mark */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: 160,
              color: COLORS.suffolkGold,
              opacity: 0.25,
              lineHeight: 0.4,
              marginBottom: -10,
            }}
          >
            &ldquo;
          </div>

          {/* First part: the old thinking */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.subtitle,
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.textMuted,
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: 820,
              opacity: interpolate(
                frame - pauseEnd,
                [0, 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            I used to think AI was about getting
            <br />
            the right technical answer.
          </div>

          {/* The turn: "Now I realize" */}
          <div
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.headline,
              fontWeight: 400,
              color: COLORS.textPrimary,
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: 850,
              opacity: interpolate(
                frame - pauseEnd,
                [45, 75],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              transform: `scale(${interpolate(
                frame - pauseEnd,
                [45, 75],
                [0.95, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )})`,
            }}
          >
            Now I realize it&apos;s more like
            <br />
            <span
              style={{
                color: COLORS.suffolkGold,
                fontWeight: 600,
              }}
            >
              conducting an orchestra.
            </span>
          </div>

          {/* Attribution - arrives last */}
          <div
            style={{
              fontFamily: sansFont,
              fontSize: typeScale.caption,
              color: COLORS.textMuted,
              fontWeight: 500,
              marginTop: 30,
              opacity: interpolate(
                frame - pauseEnd,
                [90, 110],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            — {orchestraQuote?.attribution}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
