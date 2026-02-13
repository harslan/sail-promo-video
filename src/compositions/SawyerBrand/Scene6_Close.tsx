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

type Scene6Props = {
  school: SawyerBrandProps["school"];
  brandLine: SawyerBrandProps["brandLine"];
};

/**
 * Scene 6: THE CLOSE (14 seconds / 420 frames)
 *
 * Credentials + CTA + Brand line
 * The final beat. Where ownership is built.
 */
export const Scene6Close: React.FC<Scene6Props> = ({ school, brandLine }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing
  const credentialsStart = 30;
  const schoolNameStart = 60;
  const locationStart = 90;
  const accoladesStart = 120;
  const urlStart = 200;
  const brandLineStart = 280;

  // Animations
  const credentialsProgress = spring({
    frame: frame - credentialsStart,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const schoolNameProgress = spring({
    frame: frame - schoolNameStart,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const locationProgress = spring({
    frame: frame - locationStart,
    fps,
    config: { damping: 200 },
  });

  const urlProgress = spring({
    frame: frame - urlStart,
    fps,
    config: { damping: 200 },
  });

  const brandLineProgress = spring({
    frame: frame - brandLineStart,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  // Accolades stagger
  const getAccoladeProgress = (index: number) => {
    return spring({
      frame: frame - accoladesStart - index * 12,
      fps,
      config: { damping: 200 },
    });
  };

  // Fade out (gentle)
  const sceneOpacity = interpolate(
    frame,
    [400, 420],
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
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${COLORS.suffolkGold}08 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
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
        {/* School name */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.title,
            fontWeight: 600,
            color: COLORS.textPrimary,
            textAlign: "center",
            opacity: schoolNameProgress,
            transform: `translateY(${interpolate(schoolNameProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          {school.name}
        </div>

        {/* University */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.subtitle,
            fontWeight: 400,
            color: COLORS.textMuted,
            textAlign: "center",
            opacity: schoolNameProgress,
            transform: `translateY(${interpolate(schoolNameProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          {school.university}
        </div>

        {/* Location */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.body,
            fontWeight: 500,
            color: COLORS.textDim,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: locationProgress,
            transform: `translateY(${interpolate(locationProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          {school.location}
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(credentialsProgress, [0, 1], [0, 200]),
            height: 2,
            backgroundColor: COLORS.suffolkGold,
            marginTop: 10,
            marginBottom: 10,
          }}
        />

        {/* Accolades */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {school.accolades.map((accolade, index) => {
            const progress = getAccoladeProgress(index);
            const isAward = accolade.includes("Eduventures") || accolade.includes("AACSB Insights");

            return (
              <div
                key={accolade}
                style={{
                  fontFamily: sansFont,
                  fontSize: TYPE_SCALE.caption,
                  fontWeight: isAward ? 600 : 500,
                  color: isAward ? COLORS.suffolkGold : COLORS.textMuted,
                  letterSpacing: 1,
                  textAlign: "center",
                  opacity: progress,
                  transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)`,
                }}
              >
                {accolade}
              </div>
            );
          })}
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: sansFont,
            fontSize: TYPE_SCALE.body,
            fontWeight: 600,
            color: COLORS.sailTeal,
            letterSpacing: 1,
            marginTop: 20,
            opacity: urlProgress,
            transform: `translateY(${interpolate(urlProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          {school.url}
        </div>

        {/* Brand line */}
        <div
          style={{
            fontFamily: serifFont,
            fontSize: TYPE_SCALE.headline,
            fontWeight: 500,
            fontStyle: "italic",
            color: COLORS.textPrimary,
            textAlign: "center",
            marginTop: 40,
            opacity: brandLineProgress,
            transform: `translateY(${interpolate(brandLineProgress, [0, 1], [30, 0])}px) scale(${interpolate(brandLineProgress, [0, 1], [0.95, 1])})`,
          }}
        >
          {brandLine}
        </div>
      </AbsoluteFill>

      {/* Warm glow behind brand line */}
      {frame >= brandLineStart && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "15%",
            transform: "translateX(-50%)",
            width: 800,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.suffolkGold}20 0%, transparent 70%)`,
            opacity: interpolate(frame - brandLineStart, [0, 40], [0, 0.8], {
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
