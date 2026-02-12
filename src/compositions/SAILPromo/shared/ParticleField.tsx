import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React, { useMemo } from "react";
import { COLORS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants";

type ParticleFieldProps = {
  count?: number;
  intensity?: number; // 0 to 1, controls density/brightness
  convergeToCenter?: number; // 0 to 1, how much particles converge to center
};

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  phase: number;
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 40,
  intensity = 1,
  convergeToCenter = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Generate stable particles with useMemo
  const particles = useMemo((): Particle[] => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    const colors = [COLORS.textDim, COLORS.sailCoral, COLORS.sailTeal];
    const opacities = [0.6, 0.1, 0.1];

    return Array.from({ length: count }, (_, i) => {
      const colorIndex = Math.floor(seededRandom(i * 3) * colors.length);
      return {
        id: i,
        x: seededRandom(i * 7) * VIDEO_WIDTH,
        y: seededRandom(i * 13) * VIDEO_HEIGHT,
        size: 1 + seededRandom(i * 17) * 3,
        color: colors[colorIndex],
        opacity: opacities[colorIndex],
        speed: 0.3 + seededRandom(i * 23) * 0.7,
        phase: seededRandom(i * 31) * Math.PI * 2,
      };
    });
  }, [count]);

  const centerX = VIDEO_WIDTH / 2;
  const centerY = VIDEO_HEIGHT / 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle) => {
        // Sine wave motion for floating effect
        const period = (15 + particle.speed * 10) * fps; // 15-25 second periods
        const floatX =
          Math.sin((frame / period) * Math.PI * 2 + particle.phase) * 30;
        const floatY =
          Math.cos((frame / period) * Math.PI * 2 + particle.phase * 1.3) * 20;

        // Base position
        let x = particle.x + floatX;
        let y = particle.y + floatY;

        // Converge to center effect
        if (convergeToCenter > 0) {
          const convergeFactor = convergeToCenter;
          x = interpolate(convergeFactor, [0, 1], [x, centerX]);
          y = interpolate(convergeFactor, [0, 1], [y, centerY]);
        }

        // Apply intensity to opacity
        const finalOpacity = particle.opacity * intensity;

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: particle.color,
              opacity: finalOpacity,
              boxShadow:
                particle.size > 2
                  ? `0 0 ${particle.size * 2}px ${particle.color}`
                  : undefined,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
};
