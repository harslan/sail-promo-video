import "./index.css";
import { Composition, Folder } from "remotion";
import { SAILFrameworkPromo } from "./compositions/SAILPromo";
import { SAILFrameworkPromoHorizontal } from "./compositions/SAILPromo/SAILPromoHorizontal";
import {
  SAILPromoSchema,
  defaultProps,
} from "./compositions/SAILPromo/schema";
import {
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_FPS,
  TOTAL_DURATION_FRAMES,
} from "./compositions/SAILPromo/shared/constants";

// SawyerBrand composition
import { SawyerBrandVideo } from "./compositions/SawyerBrand";
import {
  SawyerBrandSchema,
  defaultProps as sawyerDefaultProps,
} from "./compositions/SawyerBrand/schema";
import {
  VIDEO_WIDTH as SAWYER_WIDTH,
  VIDEO_HEIGHT as SAWYER_HEIGHT,
  VIDEO_FPS as SAWYER_FPS,
  TOTAL_DURATION_FRAMES as SAWYER_DURATION,
} from "./compositions/SawyerBrand/shared/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="SAIL-Promo">
        {/* Main vertical composition (9:16) */}
        <Composition
          id="SAILFrameworkPromo"
          component={SAILFrameworkPromo}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={SAILPromoSchema}
          defaultProps={defaultProps}
        />

        {/* Horizontal composition for presentations (16:9) */}
        <Composition
          id="SAILFrameworkPromoWide"
          component={SAILFrameworkPromoHorizontal}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={VIDEO_FPS}
          width={1920}
          height={1080}
          schema={SAILPromoSchema}
          defaultProps={defaultProps}
        />
      </Folder>

      <Folder name="Sawyer-Brand">
        {/* Brand video combining IMMERSE + SAIL (16:9) */}
        <Composition
          id="SawyerBrandVideo"
          component={SawyerBrandVideo}
          durationInFrames={SAWYER_DURATION}
          fps={SAWYER_FPS}
          width={SAWYER_WIDTH}
          height={SAWYER_HEIGHT}
          schema={SawyerBrandSchema}
          defaultProps={sawyerDefaultProps}
        />
      </Folder>
    </>
  );
};
