import { Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";
import React from "react";
import { SCENE_TIMING } from "../shared/constants";

/**
 * AUDIO DESIGN FOR SAIL PROMO VIDEO
 *
 * This component orchestrates all audio elements with precise timing.
 *
 * AUDIO FILES NEEDED (place in public/audio/):
 *
 * 1. ambient-pad.mp3 (90 seconds)
 *    - Warm, cinematic ambient pad
 *    - Suggested: Search "cinematic ambient pad" on Artlist, Epidemic Sound, or use Suno AI
 *    - Should feel: contemplative, warm, building hope
 *
 * 2. bass-drop.mp3 (2-3 seconds)
 *    - Deep bass hit/pulse for Scene 6 climax
 *    - Suggested: Search "cinematic bass drop" or "impact hit"
 *    - Should feel: weighty, definitive, arrival
 *
 * 3. heartbeat.mp3 (3-4 seconds)
 *    - Single heartbeat or double-pulse
 *    - Suggested: Search "heartbeat sound effect"
 *    - Should feel: organic, human, alive
 *
 * 4. subtle-whoosh.mp3 (1 second) [OPTIONAL]
 *    - Gentle transition sound
 *    - For text entrances
 *
 * FREE SOURCES:
 * - Freesound.org (free with attribution)
 * - Pixabay Audio (free)
 * - Suno.ai or Udio.com (AI-generated music)
 */

type AudioDesignProps = {
  // Set to false to disable audio during development
  enabled?: boolean;
};

export const AudioDesign: React.FC<AudioDesignProps> = ({ enabled = true }) => {
  const frame = useCurrentFrame();

  if (!enabled) return null;

  const { scene1, scene2, scene3, scene4, scene5, scene6, scene7 } = SCENE_TIMING;

  // === AMBIENT PAD VOLUME CURVE ===
  // Near-silence in Scene 1 (emptiness is the design)
  // Builds through Scene 2-3
  // Peaks in Scene 4
  // Pulls back for Scene 5 (intimate)
  // Drops out before Scene 6 climax, then swells
  // Warm resolution in Scene 7
  const ambientVolume = interpolate(
    frame,
    [
      0,                    // Start
      scene1.end,           // End of Scene 1
      scene2.end,           // End of Scene 2
      scene3.end,           // End of Scene 3
      scene4.start + 150,   // Mid Scene 4
      scene4.end,           // End of Scene 4
      scene5.start + 60,    // Early Scene 5
      scene5.end - 60,      // Before Scene 5 ends (the breath)
      scene6.start,         // Scene 6 start (the breath)
      scene6.start + 45,    // Breath ends
      scene6.start + 180,   // "Ownership cannot" moment
      scene6.start + 200,   // After impact
      scene7.start + 60,    // Scene 7 settling
      scene7.end - 60,      // Before end
      scene7.end,           // End
    ],
    [
      0.0,   // Silent start
      0.08,  // Barely there
      0.15,  // Building
      0.25,  // Framework hope
      0.35,  // Competition energy peak
      0.30,  // Pulling back
      0.20,  // Intimate
      0.10,  // The breath begins
      0.05,  // Near silence for breath
      0.12,  // Thesis starts
      0.08,  // Drops for impact
      0.30,  // Swells after "Ownership cannot"
      0.25,  // Resolution
      0.20,  // Fading
      0.0,   // Silence
    ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === BASS DROP TIMING ===
  // Hits exactly when "Ownership cannot" lands
  const bassDropFrame = scene6.start + 195; // Impact frame
  const bassDropVolume = 0.6;

  // === HEARTBEAT TIMING ===
  // Final moment of Scene 7 (scene is now 450 frames)
  const heartbeatFrame = scene7.start + 350;
  const heartbeatVolume = 0.5;

  return (
    <>
      {/* AMBIENT PAD - runs throughout with volume automation */}
      <Audio
        src={staticFile("audio/ambient-pad.mp3")}
        volume={ambientVolume}
        startFrom={0}
      />

      {/* BASS DROP - Scene 6 climax */}
      <Sequence from={bassDropFrame} durationInFrames={90}>
        <Audio
          src={staticFile("audio/bass-drop.mp3")}
          volume={bassDropVolume}
        />
      </Sequence>

      {/* HEARTBEAT - Final signature */}
      <Sequence from={heartbeatFrame} durationInFrames={120}>
        <Audio
          src={staticFile("audio/heartbeat.mp3")}
          volume={heartbeatVolume}
        />
      </Sequence>
    </>
  );
};

/**
 * ALTERNATIVE: If you want to generate audio procedurally,
 * Remotion supports Web Audio API. You could create:
 * - Synthesized bass drops
 * - Procedural ambient textures
 * - Programmatic heartbeats
 *
 * But for a brand film, real audio files will sound better.
 */
