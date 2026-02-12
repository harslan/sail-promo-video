import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { loadFont } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { EASE_SMOOTH, COLORS } from "./constants";

// Load fonts
const { fontFamily: serifFont } = loadFont("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: sansFont } = loadDMSans("normal", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export { serifFont, sansFont };

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number; // in frames
  duration?: number; // in frames
  fontSize?: number;
  fontFamily?: "serif" | "sans";
  fontWeight?: number;
  fontStyle?: "normal" | "italic";
  color?: string;
  textAlign?: "left" | "center" | "right";
  letterSpacing?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
  animation?: "fadeUp" | "fadeIn" | "scaleIn" | "none";
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  duration = 24,
  fontSize = 54,
  fontFamily = "serif",
  fontWeight = 400,
  fontStyle = "normal",
  color = COLORS.textPrimary,
  textAlign = "center",
  letterSpacing = 0,
  lineHeight = 1.3,
  style = {},
  animation = "fadeUp",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay;

  let opacity = 1;
  let translateY = 0;
  let scale = 1;

  if (animation === "fadeUp") {
    opacity = interpolate(localFrame, [0, duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    });
    translateY = interpolate(localFrame, [0, duration], [20, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    });
  } else if (animation === "fadeIn") {
    opacity = interpolate(localFrame, [0, duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    });
  } else if (animation === "scaleIn") {
    const progress = spring({
      frame: localFrame,
      fps,
      config: { damping: 200 },
      durationInFrames: duration,
    });
    opacity = progress;
    scale = interpolate(progress, [0, 1], [0.98, 1]);
  }

  // Don't render before delay
  if (localFrame < 0) {
    return null;
  }

  return (
    <div
      style={{
        fontSize,
        fontFamily: fontFamily === "serif" ? serifFont : sansFont,
        fontWeight,
        fontStyle,
        color,
        textAlign,
        letterSpacing,
        lineHeight,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Specialized component for highlighted words
type HighlightedWordProps = {
  children: React.ReactNode;
  color?: string;
  glow?: boolean;
};

export const HighlightedWord: React.FC<HighlightedWordProps> = ({
  children,
  color = COLORS.suffolkGold,
  glow = false,
}) => {
  return (
    <span
      style={{
        color,
        textShadow: glow ? `0 0 30px ${color}40` : undefined,
      }}
    >
      {children}
    </span>
  );
};
