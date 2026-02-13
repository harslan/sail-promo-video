import { AbsoluteFill, Sequence } from "remotion";
import React from "react";
import { SawyerBrandProps } from "./schema";
import { COLORS, SCENE_TIMING } from "./shared/constants";
import { Scene1Generic } from "./Scene1_Generic";
import { Scene2Immerse } from "./Scene2_Immerse";
import { Scene3Pivot } from "./Scene3_Pivot";
import { Scene4Integration } from "./Scene4_Integration";
import { Scene5Thesis } from "./Scene5_Thesis";
import { Scene6Close } from "./Scene6_Close";

/**
 * SawyerBrandVideo - "Where Ownership Is Built"
 *
 * 75-second cinematic brand video combining IMMERSE + SAIL
 * Two award-winning frameworks. One school.
 */
export const SawyerBrandVideo: React.FC<SawyerBrandProps> = (props) => {
  const { scene1, scene2, scene3, scene4, scene5, scene6 } = SCENE_TIMING;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
      }}
    >
      {/* Scene 1: The Generic Claim (0-7s) */}
      <Sequence
        from={scene1.start}
        durationInFrames={scene1.end - scene1.start}
      >
        <Scene1Generic />
      </Sequence>

      {/* Scene 2: The IMMERSE Reality (7-28s) */}
      <Sequence
        from={scene2.start}
        durationInFrames={scene2.end - scene2.start}
      >
        <Scene2Immerse immerse={props.immerse} />
      </Sequence>

      {/* Scene 3: The Pivot (28-35s) */}
      <Sequence
        from={scene3.start}
        durationInFrames={scene3.end - scene3.start}
      >
        <Scene3Pivot />
      </Sequence>

      {/* Scene 4: SAIL Meets IMMERSE (35-51s) */}
      <Sequence
        from={scene4.start}
        durationInFrames={scene4.end - scene4.start}
      >
        <Scene4Integration sail={props.sail} />
      </Sequence>

      {/* Scene 5: The Thesis (51-61s) */}
      <Sequence
        from={scene5.start}
        durationInFrames={scene5.end - scene5.start}
      >
        <Scene5Thesis
          immerse={props.immerse}
          sail={props.sail}
          thesis={props.thesis}
        />
      </Sequence>

      {/* Scene 6: The Close (61-75s) */}
      <Sequence
        from={scene6.start}
        durationInFrames={scene6.end - scene6.start}
      >
        <Scene6Close
          school={props.school}
          brandLine={props.brandLine}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
