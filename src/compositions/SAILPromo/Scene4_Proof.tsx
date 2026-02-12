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
import { COLORS, TYPE_SCALE, TYPE_SCALE_HORIZONTAL, SPRING_SNAPPY } from "./shared/constants";

type Scene4ProofProps = {
  competition: {
    name: string;
    studentCount: number;
    dataPoints: string;
    ethicalMoment: string;
  };
  horizontal?: boolean;
};

export const Scene4Proof: React.FC<Scene4ProofProps> = ({ competition, horizontal = false }) => {
  const typeScale = horizontal ? TYPE_SCALE_HORIZONTAL : TYPE_SCALE;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 660 frames (22 seconds)
  // Opening: 0-90 "We didn't just theorize. We tested it."
  // Stats: 90-180 "34 students. Real-world datasets. Real challenges."
  // Kinetic: 180-420 - RAPID prompts, data viz, energy
  // Ethical: 420-630 - THE key quote + "unprompted" - EXTENDED to let it land
  // Fade: 630-660

  const openingEnd = 90;
  const statsEnd = 180;
  const kineticEnd = 420;
  const ethicalEnd = 630;

  const openingOpacity = interpolate(
    frame,
    [0, 20, openingEnd - 20, openingEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const statsOpacity = interpolate(
    frame,
    [openingEnd, openingEnd + 15, statsEnd - 15, statsEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const kineticOpacity = interpolate(
    frame,
    [statsEnd, statsEnd + 10, kineticEnd - 10, kineticEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ethicalOpacity = interpolate(
    frame,
    [kineticEnd, kineticEnd + 40, ethicalEnd, ethicalEnd + 30],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      {/* Opening */}
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
              fontSize: typeScale.subtitle,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            We didn&apos;t just theorize. We tested it.
          </div>
        </AbsoluteFill>
      )}

      {/* Stats */}
      {frame >= openingEnd && frame < statsEnd && (
        <StatsSection
          frame={frame - openingEnd}
          fps={fps}
          competition={competition}
          opacity={statsOpacity}
          typeScale={typeScale}
        />
      )}

      {/* Kinetic sequence */}
      {frame >= statsEnd && frame < kineticEnd && (
        <AbsoluteFill style={{ opacity: kineticOpacity }}>
          <KineticSequence frame={frame - statsEnd} fps={fps} typeScale={typeScale} />
        </AbsoluteFill>
      )}

      {/* Ethical moment */}
      {frame >= kineticEnd && (
        <EthicalMoment
          frame={frame - kineticEnd}
          fps={fps}
          quote={competition.ethicalMoment}
          opacity={ethicalOpacity}
          typeScale={typeScale}
        />
      )}
    </AbsoluteFill>
  );
};

const StatsSection: React.FC<{
  frame: number;
  fps: number;
  competition: Scene4ProofProps["competition"];
  opacity: number;
  typeScale: typeof TYPE_SCALE;
}> = ({ frame, fps, competition, opacity, typeScale }) => {
  const stats = [
    {
      text: `${competition.studentCount} students.`,
      color: COLORS.sailTeal,
      delay: 0,
    },
    { text: `${competition.dataPoints}.`, color: COLORS.sailBlue, delay: 15 },
    { text: "Real business challenges.", color: COLORS.sailCoral, delay: 30 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        opacity,
      }}
    >
      {stats.map((stat, index) => {
        const progress = spring({
          frame: frame - stat.delay,
          fps,
          config: { damping: 15, stiffness: 150 },
        });

        return (
          <div
            key={index}
            style={{
              fontFamily: serifFont,
              fontSize: typeScale.headline,
              fontWeight: 600,
              color: stat.color,
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px) scale(${interpolate(progress, [0, 1], [0.9, 1])})`,
            }}
          >
            {stat.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Kinetic sequence with AUTHENTIC prompts from the AACSB article
const KineticSequence: React.FC<{ frame: number; fps: number; typeScale: typeof TYPE_SCALE }> = ({
  frame,
  fps,
  typeScale,
}) => {
  // Authentic prompts and insights from the AACSB article
  const prompts = [
    {
      text: "Try being more specific about customer segmentation",
      delay: 0,
      x: 30,
      y: 25,
    },
    {
      text: "Analyze regional product preferences",
      delay: 12,
      x: 70,
      y: 35,
    },
    {
      text: "What about customer satisfaction by category?",
      delay: 24,
      x: 25,
      y: 48,
    },
    {
      text: "Cross-reference with economic level",
      delay: 36,
      x: 68,
      y: 22,
    },
    { text: "Check for fraud patterns", delay: 48, x: 35, y: 62 },
    {
      text: "High revenue but low satisfaction?",
      delay: 60,
      x: 72,
      y: 52,
    },
    {
      text: "Identify potential bias in recommendations",
      delay: 75,
      x: 28,
      y: 38,
    },
    {
      text: "Wait — what about infrastructure?",
      delay: 95,
      x: 50,
      y: 45,
      highlight: true,
    },
    {
      text: "Are we penalizing certain sellers?",
      delay: 112,
      x: 45,
      y: 58,
      highlight: true,
    },
  ];

  const dataFragments = [
    { value: "847", delay: 5, x: 15, y: 28 },
    { value: "12.4%", delay: 18, x: 85, y: 42 },
    { value: "3,291", delay: 32, x: 22, y: 72 },
    { value: "+23%", delay: 48, x: 82, y: 28 },
    { value: "94.7", delay: 62, x: 42, y: 18 },
    { value: "-15%", delay: 78, x: 75, y: 68 },
  ];

  return (
    <AbsoluteFill>
      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(${COLORS.sailTeal}40 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.sailTeal}40 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translateY(${-frame * 0.4}px)`,
        }}
      />

      {/* Prompt cards */}
      {prompts.map((prompt, index) => {
        const localFrame = frame - prompt.delay;
        const lifespan = prompt.highlight ? 85 : 55;

        if (localFrame < 0 || localFrame > lifespan + 20) return null;

        const progress = spring({
          frame: localFrame,
          fps,
          config: SPRING_SNAPPY,
        });

        const exit = interpolate(
          localFrame,
          [lifespan - 10, lifespan + 10],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${prompt.x}%`,
              top: `${prompt.y}%`,
              transform: `translate(-50%, -50%) translateY(${interpolate(progress, [0, 1], [20, 0])}px) scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
              fontFamily: sansFont,
              fontSize: prompt.highlight ? typeScale.body : typeScale.caption,
              fontWeight: prompt.highlight ? 600 : 400,
              color: prompt.highlight ? COLORS.sailCoral : COLORS.textPrimary,
              opacity: progress * exit,
              backgroundColor: prompt.highlight
                ? `${COLORS.sailCoral}15`
                : COLORS.bgCard,
              padding: prompt.highlight ? "14px 20px" : "10px 16px",
              borderRadius: 10,
              border: `1px solid ${prompt.highlight ? COLORS.sailCoral : COLORS.textGhost}`,
              whiteSpace: "nowrap",
              boxShadow: prompt.highlight
                ? `0 0 25px ${COLORS.sailCoral}35`
                : "none",
            }}
          >
            {prompt.text}
          </div>
        );
      })}

      {/* Data numbers */}
      {dataFragments.map((frag, index) => {
        const localFrame = frame - frag.delay;
        if (localFrame < 0 || localFrame > 65) return null;

        const progress = interpolate(localFrame, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        });

        const exit = interpolate(localFrame, [45, 65], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`data-${index}`}
            style={{
              position: "absolute",
              left: `${frag.x}%`,
              top: `${frag.y}%`,
              transform: `translate(-50%, -50%)`,
              fontFamily: sansFont,
              fontSize: typeScale.subtitle,
              fontWeight: 700,
              color: COLORS.sailTeal,
              opacity: progress * exit * 0.5,
              textShadow: `0 0 15px ${COLORS.sailTeal}50`,
            }}
          >
            {frag.value}
          </div>
        );
      })}

      <DataVizElements frame={frame} />
    </AbsoluteFill>
  );
};

const DataVizElements: React.FC<{ frame: number }> = ({ frame }) => {
  const bars = [0.55, 0.8, 0.4, 0.95, 0.65, 0.75, 0.85];

  const barChartOpacity = interpolate(
    frame,
    [25, 45, 160, 180],
    [0, 0.45, 0.45, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineChartOpacity = interpolate(
    frame,
    [65, 85, 180, 200],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const pieChartOpacity = interpolate(
    frame,
    [105, 125, 200, 220],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {/* Bar chart */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 70,
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
          height: 110,
          opacity: barChartOpacity,
        }}
      >
        {bars.map((height, i) => {
          const barProgress = interpolate(
            frame - 25 - i * 3,
            [0, 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: 22,
                height: height * 110 * barProgress,
                backgroundColor:
                  i % 2 === 0 ? COLORS.sailTeal : COLORS.sailBlue,
                borderRadius: 4,
              }}
            />
          );
        })}
      </div>

      {/* Line chart */}
      <svg
        style={{
          position: "absolute",
          top: 220,
          right: 55,
          opacity: lineChartOpacity,
        }}
        width={220}
        height={90}
        viewBox="0 0 220 90"
      >
        <path
          d={`M 0 65 Q 35 ${65 - interpolate(frame - 65, [0, 35], [0, 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 55 45 T 110 35 T 165 22 T 220 ${12 + Math.sin(frame * 0.08) * 4}`}
          fill="none"
          stroke={COLORS.sailCoral}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {[55, 110, 165].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={45 - i * 12}
            r={5}
            fill={COLORS.sailCoral}
            opacity={interpolate(frame - 75 - i * 10, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        ))}
      </svg>

      {/* Pie chart */}
      <svg
        style={{
          position: "absolute",
          bottom: 170,
          right: 140,
          opacity: pieChartOpacity,
        }}
        width={110}
        height={110}
        viewBox="0 0 110 110"
      >
        <circle
          cx={55}
          cy={55}
          r={40}
          fill="none"
          stroke={COLORS.bgCard}
          strokeWidth={14}
        />
        <circle
          cx={55}
          cy={55}
          r={40}
          fill="none"
          stroke={COLORS.sailBlue}
          strokeWidth={14}
          strokeDasharray={`${interpolate(frame - 105, [0, 35], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 252`}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
        <circle
          cx={55}
          cy={55}
          r={40}
          fill="none"
          stroke={COLORS.sailTeal}
          strokeWidth={14}
          strokeDasharray={`${interpolate(frame - 115, [0, 35], [0, 70], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 252`}
          strokeDashoffset={-150}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
      </svg>
    </>
  );
};

// Ethical moment with dramatic entrance
const EthicalMoment: React.FC<{
  frame: number;
  fps: number;
  quote: string;
  opacity: number;
  typeScale: typeof TYPE_SCALE;
}> = ({ frame, fps, quote, opacity, typeScale }) => {
  const quoteProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const unpromptedProgress = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 55px",
        opacity,
        gap: 45,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          height: 450,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.sailCoral}18 0%, transparent 70%)`,
          opacity: quoteProgress,
        }}
      />

      <div
        style={{
          fontFamily: serifFont,
          fontSize: typeScale.subtitle * 1.1,
          color: COLORS.textPrimary,
          textAlign: "center",
          lineHeight: 1.55,
          fontStyle: "italic",
          maxWidth: 850,
          opacity: quoteProgress,
          transform: `translateY(${interpolate(quoteProgress, [0, 1], [35, 0])}px)`,
        }}
      >
        &ldquo;{quote}&rdquo;
      </div>

      {/* "— unprompted" */}
      <div
        style={{
          fontFamily: sansFont,
          fontSize: typeScale.body,
          color: COLORS.sailCoral,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: unpromptedProgress,
          transform: `translateY(${interpolate(unpromptedProgress, [0, 1], [25, 0])}px) scale(${interpolate(unpromptedProgress, [0, 1], [0.85, 1])})`,
          textShadow: `0 0 25px ${COLORS.sailCoral}50`,
        }}
      >
        — unprompted
      </div>
    </AbsoluteFill>
  );
};
