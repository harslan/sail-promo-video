import { useCurrentFrame } from "remotion";
import React from "react";

type GrainOverlayProps = {
  opacity?: number;
};

export const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = 0.04,
}) => {
  const frame = useCurrentFrame();

  // Offset the noise pattern slightly each frame for animated grain
  const offsetX = (frame * 7) % 200;
  const offsetY = (frame * 11) % 200;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        backgroundSize: "200px 200px",
      }}
    />
  );
};
