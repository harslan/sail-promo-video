import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import React from "react";
import { serifFont, sansFont } from "./shared/AnimatedText";
import {
  COLORS,
  TYPE_SCALE,
  EASE_SMOOTH,
  SPRING_ORGANIC,
} from "./shared/constants";

type Pillar = {
  letter: string;
  name: string;
  question: string;
  color: string;
};

type Scene3FrameworkProps = {
  framework: {
    name: string;
    pillars: Pillar[];
  };
};

export const Scene3Framework: React.FC<Scene3FrameworkProps> = ({
  framework,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene duration: 450 frames (15 seconds)
  // Opening: frames 0-90 (3s): "There's a framework for this."
  // S pillar: frames 90-180 (3s)
  // A pillar: frames 180-270 (3s)
  // I pillar: frames 270-360 (3s)
  // L pillar: frames 360-405 (1.5s)
  // Integration: frames 405-450 (1.5s)

  const openingEnd = 90;
  const pillarStarts = [90, 180, 270, 360];
  const integrationStart = 405;

  // Opening text fade
  const openingOpacity = interpolate(
    frame,
    [0, 20, openingEnd - 20, openingEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_SMOOTH,
    }
  );

  // Which pillar is currently showing
  const activePillarIndex =
    frame < pillarStarts[0]
      ? -1
      : frame < pillarStarts[1]
        ? 0
        : frame < pillarStarts[2]
          ? 1
          : frame < pillarStarts[3]
            ? 2
            : frame < integrationStart
              ? 3
              : 4;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgWarm }}>
      {/* Opening text */}
      {frame < openingEnd && (
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
              fontSize: TYPE_SCALE.subtitle,
              color: COLORS.textMuted,
              fontWeight: 300,
            }}
          >
            There&apos;s a framework for this.
          </div>
        </AbsoluteFill>
      )}

      {/* Individual pillar reveals */}
      {activePillarIndex >= 0 && activePillarIndex <= 3 && (
        <PillarReveal
          pillar={framework.pillars[activePillarIndex]}
          frame={frame - pillarStarts[activePillarIndex]}
          fps={fps}
          isLeadership={activePillarIndex === 3}
        />
      )}

      {/* Integration moment */}
      {activePillarIndex === 4 && (
        <IntegrationMoment
          pillars={framework.pillars}
          frame={frame - integrationStart}
          fps={fps}
        />
      )}
    </AbsoluteFill>
  );
};

// Individual pillar reveal with crafted motifs
const PillarReveal: React.FC<{
  pillar: Pillar;
  frame: number;
  fps: number;
  isLeadership: boolean;
}> = ({ pillar, frame, fps, isLeadership }) => {
  const letterProgress = spring({
    frame,
    fps,
    config: { ...SPRING_ORGANIC, stiffness: 100 },
  });

  const nameProgress = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });

  const questionProgress = spring({
    frame: frame - 24,
    fps,
    config: { damping: 200 },
  });

  const motifProgress = interpolate(frame, [5, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Letter animation
  const letterScale = interpolate(letterProgress, [0, 1], [1.8, 1]);
  const letterY = interpolate(letterProgress, [0, 1], [0, -80]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
      }}
    >
      {/* Background motif - now more refined */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pillar.letter === "S" && (
          <ConnectionMotif progress={motifProgress} color={pillar.color} />
        )}
        {pillar.letter === "A" && (
          <LayersMotif progress={motifProgress} color={pillar.color} />
        )}
        {pillar.letter === "I" && (
          <LensMotif progress={motifProgress} color={pillar.color} />
        )}
        {pillar.letter === "L" && (
          <SignatureMotif progress={motifProgress} color={pillar.color} />
        )}
      </div>

      {/* Letter with glow */}
      <div
        style={{
          fontFamily: serifFont,
          fontSize: 200,
          fontWeight: 700,
          color: pillar.color,
          transform: `scale(${letterScale}) translateY(${letterY}px)`,
          opacity: letterProgress,
          textShadow: `
            0 0 60px ${pillar.color}50,
            0 0 120px ${pillar.color}30
          `,
        }}
      >
        {pillar.letter}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: serifFont,
          fontSize: TYPE_SCALE.title,
          fontWeight: 400,
          color: COLORS.textPrimary,
          opacity: nameProgress,
          transform: `translateY(${interpolate(nameProgress, [0, 1], [25, 0])}px)`,
        }}
      >
        {pillar.name}
      </div>

      {/* Question - Leadership gets special treatment */}
      <div
        style={{
          fontFamily: isLeadership ? serifFont : sansFont,
          fontSize: isLeadership ? TYPE_SCALE.subtitle * 1.1 : TYPE_SCALE.body,
          fontWeight: isLeadership ? 600 : 400,
          color: isLeadership ? pillar.color : COLORS.textMuted,
          opacity: questionProgress,
          transform: `translateY(${interpolate(questionProgress, [0, 1], [20, 0])}px)`,
          fontStyle: isLeadership ? "normal" : "italic",
          textShadow: isLeadership ? `0 0 30px ${pillar.color}40` : undefined,
          marginTop: isLeadership ? 10 : 0,
        }}
      >
        {isLeadership ? `"${pillar.question}"` : pillar.question}
      </div>
    </AbsoluteFill>
  );
};

// Integration: all letters assemble with pulse
const IntegrationMoment: React.FC<{
  pillars: Pillar[];
  frame: number;
  fps: number;
}> = ({ pillars, frame, fps }) => {
  const assembleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Heartbeat pulse
  const pulsePhase = (frame / fps) * Math.PI * 3;
  const pulse = 1 + Math.sin(pulsePhase) * 0.025 * Math.min(assembleProgress, 1);

  // Connection lines animate in
  const lineProgress = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
      }}
    >
      {/* Glow behind letters */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.glowGold} 0%, transparent 70%)`,
          opacity: assembleProgress * 0.3,
        }}
      />

      {/* SAIL letters */}
      <div
        style={{
          display: "flex",
          gap: 30,
          transform: `scale(${pulse})`,
        }}
      >
        {pillars.map((pillar, index) => {
          const stagger = spring({
            frame: frame - index * 3,
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          return (
            <div
              key={pillar.letter}
              style={{
                fontFamily: serifFont,
                fontSize: 110,
                fontWeight: 700,
                color: pillar.color,
                opacity: stagger,
                transform: `translateY(${interpolate(stagger, [0, 1], [40, 0])}px)`,
                textShadow: `0 0 40px ${pillar.color}40`,
              }}
            >
              {pillar.letter}
            </div>
          );
        })}
      </div>

      {/* Connection arcs between letters */}
      <svg
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 100,
          opacity: lineProgress * 0.5,
        }}
        viewBox="0 0 500 100"
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${80 + i * 115} 80 Q ${135 + i * 115} 30 ${190 + i * 115} 80`}
            fill="none"
            stroke={pillars[i].color}
            strokeWidth={2}
            strokeDasharray={120}
            strokeDashoffset={interpolate(lineProgress, [0, 1], [120, 0])}
            opacity={0.6}
          />
        ))}
      </svg>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: sansFont,
          fontSize: TYPE_SCALE.body,
          color: COLORS.textMuted,
          opacity: interpolate(frame, [20, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 20,
        }}
      >
        The integration is what matters.
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// REFINED VISUAL MOTIFS
// ============================================================================

// S - Social Intelligence: Dynamic network of connections
const ConnectionMotif: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  const nodes = [
    { x: 540, y: 700 },   // center
    { x: 380, y: 580 },   // top-left
    { x: 700, y: 580 },   // top-right
    { x: 340, y: 820 },   // bottom-left
    { x: 740, y: 820 },   // bottom-right
    { x: 540, y: 500 },   // top
    { x: 540, y: 900 },   // bottom
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 5], [2, 5], [3, 6], [4, 6], [1, 3], [2, 4],
  ];

  return (
    <svg width={1080} height={1400} style={{ opacity: 0.2 }}>
      {/* Connection lines */}
      {connections.map(([from, to], i) => {
        const lineProgress = interpolate(
          progress,
          [i * 0.05, i * 0.05 + 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[from].x + (nodes[to].x - nodes[from].x) * lineProgress}
            y2={nodes[from].y + (nodes[to].y - nodes[from].y) * lineProgress}
            stroke={color}
            strokeWidth={2}
            opacity={0.6}
          />
        );
      })}

      {/* Nodes with pulse */}
      {nodes.map((node, i) => {
        const nodeProgress = interpolate(
          progress,
          [i * 0.08, i * 0.08 + 0.2],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const size = i === 0 ? 16 : 10;
        return (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={size * 2}
              fill={color}
              opacity={nodeProgress * 0.2}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={size * nodeProgress}
              fill={color}
              opacity={nodeProgress}
            />
          </g>
        );
      })}
    </svg>
  );
};

// A - AI Literacy: Peeling layers revealing depth
const LayersMotif: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  const layers = [
    { y: 0, opacity: 1, scale: 1 },
    { y: 40, opacity: 0.7, scale: 0.9 },
    { y: 80, opacity: 0.4, scale: 0.8 },
    { y: 120, opacity: 0.2, scale: 0.7 },
  ];

  return (
    <svg width={600} height={500} style={{ opacity: 0.25 }} viewBox="0 0 600 500">
      {layers.map((layer, i) => {
        const layerProgress = interpolate(
          progress,
          [i * 0.15, i * 0.15 + 0.4],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const yOffset = interpolate(layerProgress, [0, 1], [60, 0]);

        return (
          <g
            key={i}
            transform={`translate(300, ${200 + layer.y + yOffset}) scale(${layer.scale})`}
            opacity={layer.opacity * layerProgress}
          >
            <rect
              x={-150}
              y={-60}
              width={300}
              height={120}
              rx={12}
              fill="none"
              stroke={color}
              strokeWidth={2}
            />
            {/* Inner details */}
            <line x1={-120} y1={-30} x2={120} y2={-30} stroke={color} strokeWidth={1} opacity={0.5} />
            <line x1={-120} y1={0} x2={80} y2={0} stroke={color} strokeWidth={1} opacity={0.5} />
            <line x1={-120} y1={30} x2={100} y2={30} stroke={color} strokeWidth={1} opacity={0.5} />
          </g>
        );
      })}
    </svg>
  );
};

// I - Innovation/Inquiry: Magnifying lens with focus effect
const LensMotif: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  const lensScale = interpolate(progress, [0, 0.5], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const focusRings = interpolate(progress, [0.3, 1], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={500} height={500} style={{ opacity: 0.2 }} viewBox="0 0 500 500">
      {/* Focus rings emanating outward */}
      {[0, 1, 2].map((i) => {
        const ringProgress = Math.max(0, focusRings - i);
        const ringOpacity = interpolate(ringProgress, [0, 0.5, 1], [0, 0.5, 0]);
        return (
          <circle
            key={i}
            cx={200}
            cy={200}
            r={80 + ringProgress * 60}
            fill="none"
            stroke={color}
            strokeWidth={2}
            opacity={ringOpacity}
          />
        );
      })}

      {/* Main lens circle */}
      <circle
        cx={200}
        cy={200}
        r={80 * lensScale}
        fill="none"
        stroke={color}
        strokeWidth={4}
        opacity={progress}
      />

      {/* Inner lens highlight */}
      <ellipse
        cx={180}
        cy={180}
        rx={25 * lensScale}
        ry={15 * lensScale}
        fill={color}
        opacity={progress * 0.3}
      />

      {/* Handle */}
      <line
        x1={260}
        y1={260}
        x2={260 + 100 * progress}
        y2={260 + 100 * progress}
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        opacity={progress}
      />

      {/* Question mark inside lens */}
      <text
        x={200}
        y={215}
        textAnchor="middle"
        fontSize={60 * lensScale}
        fill={color}
        opacity={progress * 0.6}
        fontFamily="serif"
      >
        ?
      </text>
    </svg>
  );
};

// L - Leadership: Signature line being written
const SignatureMotif: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  // Signature path length for animation
  const pathLength = 600;
  const signatureProgress = interpolate(progress, [0, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const underlineProgress = interpolate(progress, [0.5, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={700} height={300} style={{ opacity: 0.25 }} viewBox="0 0 700 300">
      {/* Signature flourish */}
      <path
        d="M 100,200
           C 120,150 140,180 160,160
           S 200,120 240,140
           S 280,180 320,150
           S 380,100 420,130
           Q 460,160 500,140
           T 580,150
           Q 600,155 620,145"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - signatureProgress)}
      />

      {/* Underline */}
      <line
        x1={100}
        y1={230}
        x2={100 + 520 * underlineProgress}
        y2={230}
        stroke={color}
        strokeWidth={2}
        opacity={0.6}
      />

      {/* Pen dot at end */}
      <circle
        cx={620}
        cy={145}
        r={6}
        fill={color}
        opacity={signatureProgress > 0.95 ? 1 : 0}
      />
    </svg>
  );
};
