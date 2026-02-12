import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS, EASE_SMOOTH } from "./constants";

type PulseHeartbeatProps = {
  size?: number;
  color?: string;
  delay?: number;
};

export const PulseHeartbeat: React.FC<PulseHeartbeatProps> = ({
  size = 60,
  color = COLORS.sailCoral,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay;

  if (localFrame < 0) {
    return null;
  }

  // Heartbeat rhythm: quick double-pulse, then pause
  const beatDuration = fps * 0.8; // 0.8 seconds per full beat cycle
  const cycleFrame = localFrame % beatDuration;

  // First pulse (0-0.15s)
  const pulse1 = interpolate(
    cycleFrame,
    [0, fps * 0.08, fps * 0.15],
    [1, 1.15, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    }
  );

  // Second pulse (0.2-0.35s)
  const pulse2 = interpolate(
    cycleFrame,
    [fps * 0.2, fps * 0.28, fps * 0.35],
    [1, 1.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    }
  );

  const scale = pulse1 * pulse2;

  // Glow intensity follows pulse
  const glowOpacity = interpolate(scale, [1, 1.15], [0.3, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in on first appearance
  const fadeIn = interpolate(localFrame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          transform: `scale(${scale})`,
          boxShadow: `
            0 0 ${size * 0.5}px ${color}${Math.round(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")},
            0 0 ${size}px ${color}${Math.round(glowOpacity * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")}
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Heart icon using CSS shapes */}
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

// Ripple effect emanating from center
type PulseRippleProps = {
  delay?: number;
  color?: string;
  maxRadius?: number;
  duration?: number;
};

export const PulseRipple: React.FC<PulseRippleProps> = ({
  delay = 0,
  color = COLORS.sailCoral,
  maxRadius = 300,
  duration = 45,
}) => {
  const frame = useCurrentFrame();

  const localFrame = frame - delay;

  if (localFrame < 0 || localFrame > duration) {
    return null;
  }

  const progress = interpolate(localFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_SMOOTH,
  });

  const radius = progress * maxRadius;
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.5, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
