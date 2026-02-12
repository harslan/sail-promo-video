import { AbsoluteFill, Sequence } from "remotion";
import React from "react";
import { SAILPromoProps } from "./schema";
import { COLORS, SCENE_TIMING } from "./shared/constants";
import { ParticleField } from "./shared/ParticleField";
import { GrainOverlay } from "./shared/GrainOverlay";
import { AudioDesign } from "./audio/AudioDesign";

// Import scenes
import { Scene1Tension } from "./Scene1_Tension";
import { Scene2Stakes } from "./Scene2_Stakes";
import { Scene3Framework } from "./Scene3_Framework";
import { Scene4Proof } from "./Scene4_Proof";
import { Scene5Voices } from "./Scene5_Voices";
import { Scene6Thesis } from "./Scene6_Thesis";
import { Scene7Close } from "./Scene7_Close";

/**
 * Horizontal (16:9) version of the SAIL Promo Video
 *
 * This wrapper scales the vertical content to fit 1920x1080.
 * The content is scaled down and centered, maintaining the cinematic feel.
 */
export const SAILFrameworkPromoHorizontal: React.FC<SAILPromoProps> = (props) => {
  const { scene1, scene2, scene3, scene4, scene5, scene6, scene7 } =
    SCENE_TIMING;

  // Scale factor to fit 1920 height (1080) within horizontal format
  // We scale the content to 56.25% to fit the vertical content in horizontal space
  const scale = 0.5625;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
      }}
    >
      {/* Global particle field - runs throughout (scaled for horizontal) */}
      <ParticleField count={50} intensity={1} />

      {/* Scaled content container */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Scene 1: The Tension (0-10s) */}
        <Sequence
          from={scene1.start}
          durationInFrames={scene1.end - scene1.start}
          premountFor={30}
        >
          <Scene1Tension />
        </Sequence>

        {/* Scene 2: The Stakes (10-18s) */}
        <Sequence
          from={scene2.start}
          durationInFrames={scene2.end - scene2.start}
          premountFor={30}
        >
          <Scene2Stakes />
        </Sequence>

        {/* Scene 3: The Framework (18-33s) */}
        <Sequence
          from={scene3.start}
          durationInFrames={scene3.end - scene3.start}
          premountFor={30}
        >
          <Scene3Framework framework={props.framework} />
        </Sequence>

        {/* Scene 4: The Proof (33-53s) */}
        <Sequence
          from={scene4.start}
          durationInFrames={scene4.end - scene4.start}
          premountFor={30}
        >
          <Scene4Proof competition={props.competition} />
        </Sequence>

        {/* Scene 5: The Voices (53-65s) */}
        <Sequence
          from={scene5.start}
          durationInFrames={scene5.end - scene5.start}
          premountFor={30}
        >
          <Scene5Voices quotes={props.quotes} />
        </Sequence>

        {/* Scene 6: The Thesis (65-75s) */}
        <Sequence
          from={scene6.start}
          durationInFrames={scene6.end - scene6.start}
          premountFor={30}
        >
          <Scene6Thesis thesis={props.thesis} />
        </Sequence>

        {/* Scene 7: The Close (75-90s) */}
        <Sequence
          from={scene7.start}
          durationInFrames={scene7.end - scene7.start}
          premountFor={30}
        >
          <Scene7Close
            school={props.school}
            framework={props.framework}
            thesis={props.thesis}
          />
        </Sequence>
      </AbsoluteFill>

      {/* Film grain overlay - runs throughout */}
      <GrainOverlay opacity={0.04} />

      {/* Audio design */}
      <AudioDesign enabled={true} />
    </AbsoluteFill>
  );
};
