import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
} from "remotion";
import React from "react";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { COLORS, TYPE_SCALE, EASE_SMOOTH } from "./shared/constants";

const { fontFamily: serifFont } = loadCormorant();
const { fontFamily: sansFont } = loadDMSans();

/**
 * Scene 1: THE GENERIC CLAIM (7 seconds / 210 frames)
 *
 * Start with what every school says. Then break it.
 * "Every business school talks about real-world experience."
 * Deliberately sterile, generic — then a glitch/disruption.
 */
export const Scene1Generic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing
  const textAppear = 20;
  const glitchStart = 150;
  const fadeOut = 190;

  // Text entrance
  const textProgress = spring({
    frame: frame - textAppear,
    fps,
    config: { damping: 200 },
  });

  // Glitch intensity ramps up
  const glitchIntensity = interpolate(
    frame,
    [glitchStart, glitchStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out
  const opacity = interpolate(
    frame,
    [0, 15, fadeOut, 210],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SMOOTH }
  );

  // Glitch offset calculations
  const glitchX = glitchIntensity > 0
    ? Math.sin(frame * 0.8) * 20 * glitchIntensity
    : 0;
  const glitchY = glitchIntensity > 0
    ? Math.cos(frame * 1.2) * 10 * glitchIntensity
    : 0;

  // RGB split effect during glitch
  const rgbSplit = glitchIntensity * 8;

  // Scanline noise
  const scanlines = glitchIntensity > 0.3;

  // Fragment pieces for disruption
  const fragments = Array.from({ length: 12 }, (_, i) => ({
    x: random(`frag-x-${i}`) * 100,
    y: random(`frag-y-${i}`) * 100,
    rotation: (random(`frag-rot-${i}`) - 0.5) * 90,
    delay: random(`frag-delay-${i}`) * 15,
    width: 80 + random(`frag-w-${i}`) * 200,
    height: 20 + random(`frag-h-${i}`) * 40,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        opacity,
      }}
    >
      {/* Scanline overlay during glitch */}
      {scanlines && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.3) 2px,
              rgba(0,0,0,0.3) 4px
            )`,
            opacity: glitchIntensity * 0.5,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main text container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          transform: `translate(${glitchX}px, ${glitchY}px)`,
        }}
      >
        {/* RGB split layers during glitch */}
        {glitchIntensity > 0 && (
          <>
            {/* Red channel */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                transform: `translateX(${-rgbSplit}px)`,
                opacity: 0.7,
                mixBlendMode: "screen",
              }}
            >
              <GenericText progress={textProgress} color="#ff0000" />
            </div>
            {/* Blue channel */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                transform: `translateX(${rgbSplit}px)`,
                opacity: 0.7,
                mixBlendMode: "screen",
              }}
            >
              <GenericText progress={textProgress} color="#0088ff" />
            </div>
          </>
        )}

        {/* Main text */}
        <div
          style={{
            opacity: glitchIntensity > 0.7 ? 1 - (glitchIntensity - 0.7) * 3 : 1,
          }}
        >
          <GenericText progress={textProgress} color={COLORS.textPrimary} />
        </div>
      </AbsoluteFill>

      {/* Fragment pieces flying apart during glitch */}
      {glitchIntensity > 0.5 && fragments.map((frag, i) => {
        const fragProgress = interpolate(
          frame - glitchStart - 15 - frag.delay,
          [0, 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${frag.x}%`,
              top: `${frag.y}%`,
              width: frag.width,
              height: frag.height,
              backgroundColor: COLORS.bgCard,
              border: `1px solid ${COLORS.textGhost}`,
              transform: `
                translate(-50%, -50%)
                rotate(${frag.rotation * fragProgress}deg)
                scale(${1 - fragProgress * 0.5})
              `,
              opacity: (1 - fragProgress) * 0.6,
            }}
          />
        );
      })}

      {/* Glitch flash */}
      {frame >= glitchStart + 10 && frame <= glitchStart + 14 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: COLORS.textPrimary,
            opacity: 0.15,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// The generic business school text
const GenericText: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: sansFont,
          fontSize: TYPE_SCALE.headline,
          fontWeight: 400,
          color,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Every business school talks about
      </div>
      <div
        style={{
          fontFamily: sansFont,
          fontSize: TYPE_SCALE.headline,
          fontWeight: 400,
          fontStyle: "italic",
          color,
          textAlign: "center",
        }}
      >
        real-world experience.
      </div>
    </div>
  );
};
