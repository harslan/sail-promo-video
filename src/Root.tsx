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
    </>
  );
};
