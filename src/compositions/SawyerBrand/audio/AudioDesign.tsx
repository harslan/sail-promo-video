import { Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";
import React from "react";
import { SCENE_TIMING } from "../shared/constants";

/**
 * CINEMATIC AUDIO DESIGN FOR SAWYER BRAND VIDEO
 *
 * 90 seconds of carefully orchestrated sound to match the visual narrative.
 *
 * AUDIO NARRATIVE:
 *
 * Scene 1 (0-9s): THE GENERIC CLAIM
 *   - Near silence. Sterile. The emptiness IS the design.
 *   - Low rumble builds before glitch
 *   - Glitch: brief digital distortion burst
 *
 * Scene 2 (7-28s): IMMERSE MONTAGE
 *   - Warm ambient pad fades in (hope, possibility)
 *   - Subtle heartbeat pulse underneath (The Pulse connection)
 *   - Energy builds through the experiences
 *   - Swells for IMMERSE letter assembly
 *
 * Scene 3 (28-35s): THE PIVOT
 *   - Near silence. Contemplative.
 *   - Single sustained tone (thoughtfulness)
 *   - Slight warmth emerges for "AI cannot replicate"
 *
 * Scene 4 (35-51s): SAIL MEETS IMMERSE
 *   - Confident pulse begins
 *   - Each pillar: subtle tonal shift
 *   - "Unprompted" moment: slight emphasis
 *   - Leadership: warmest, most resonant
 *
 * Scene 5 (51-61s): THE THESIS
 *   - Frameworks side-by-side: subtle stereo presence
 *   - Thesis builds: each line adds harmonic layer
 *   - "Ownership cannot": BASS DROP (the moment)
 *   - Closer: warm resolution
 *
 * Scene 6 (61-75s): THE CLOSE
 *   - Gentle resolution, credentials with soft presence
 *   - Brand line: final golden warmth
 *   - Heartbeat echo as we fade
 */

type AudioDesignProps = {
  enabled?: boolean;
};

export const AudioDesign: React.FC<AudioDesignProps> = ({ enabled = true }) => {
  const frame = useCurrentFrame();

  if (!enabled) return null;

  const { scene1, scene2, scene3, scene4, scene5, scene6 } = SCENE_TIMING;

  // === AMBIENT PAD VOLUME CURVE ===
  // Carefully shaped to match the emotional arc
  const ambientVolume = interpolate(
    frame,
    [
      0,                    // Video start
      scene1.start + 120,   // Before glitch
      scene1.end - 30,      // Glitch moment (duck)
      scene1.end,           // End Scene 1
      scene2.start + 30,    // Scene 2 begins
      scene2.start + 200,   // Montage energy
      scene2.end - 90,      // Pre-assembly
      scene2.end,           // IMMERSE assembly
      scene3.start + 30,    // Pivot begins (quiet)
      scene3.end - 30,      // Pivot hope emerges
      scene3.end,           // End pivot
      scene4.start + 90,    // SAIL intro done
      scene4.end - 60,      // Before Scene 4 ends
      scene5.start,         // Thesis begins
      scene5.start + 120,   // Frameworks shown
      scene5.start + 210,   // Before "Ownership" (duck for impact)
      scene5.start + 230,   // "Ownership cannot" lands
      scene5.end,           // Thesis ends
      scene6.start + 60,    // Close begins
      scene6.start + 280,   // Brand line appears
      scene6.end - 60,      // Before end
      scene6.end,           // End
    ],
    [
      0.0,    // Silence
      0.03,   // Barely perceptible rumble
      0.0,    // Duck for glitch
      0.0,    // Still quiet
      0.08,   // Warmth begins
      0.22,   // Montage energy
      0.28,   // Building to assembly
      0.32,   // Assembly peak
      0.10,   // Pivot: quiet, thoughtful
      0.18,   // Hope emerges
      0.15,   // Transition
      0.25,   // SAIL confidence
      0.28,   // Building
      0.20,   // Thesis setup
      0.22,   // Frameworks present
      0.12,   // Duck before impact
      0.38,   // Swell after "Ownership"
      0.30,   // Resolution
      0.25,   // Close warmth
      0.30,   // Brand line presence
      0.20,   // Fading
      0.0,    // Silence
    ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === BASS DROP - "Ownership cannot." ===
  // The moment the whole video has been building to
  // Thesis timing: line3Start = beat2Start + 5 + 45 + 45 = 215
  const ownershipFrame = scene5.start + 220; // Slightly after text appears for impact
  const bassDropVolume = 0.5; // Tasteful, not overpowering

  // === HEARTBEAT - Final signature ===
  // The Pulse made audible at the end
  const heartbeatFrame = scene6.end - 150; // Near the end
  const heartbeatVolume = 0.4;

  // === SECOND HEARTBEAT - Echo ===
  const heartbeatEchoFrame = scene6.end - 90;
  const heartbeatEchoVolume = 0.25;

  return (
    <>
      {/* AMBIENT PAD - Emotional foundation throughout */}
      <Audio
        src={staticFile("audio/ambient-pad.mp3")}
        volume={ambientVolume}
        startFrom={0}
      />

      {/* BASS DROP - "Ownership cannot." impact */}
      <Sequence from={ownershipFrame} durationInFrames={90}>
        <Audio
          src={staticFile("audio/bass-drop.mp3")}
          volume={bassDropVolume}
        />
      </Sequence>

      {/* HEARTBEAT - First beat */}
      <Sequence from={heartbeatFrame} durationInFrames={60}>
        <Audio
          src={staticFile("audio/heartbeat.mp3")}
          volume={heartbeatVolume}
        />
      </Sequence>

      {/* HEARTBEAT ECHO - Second, quieter beat */}
      <Sequence from={heartbeatEchoFrame} durationInFrames={60}>
        <Audio
          src={staticFile("audio/heartbeat.mp3")}
          volume={heartbeatEchoVolume}
        />
      </Sequence>
    </>
  );
};

/**
 * AUDIO ENHANCEMENT IDEAS (future):
 *
 * 1. Whoosh sounds for experience card transitions in Scene 2
 * 2. Subtle digital glitch sound for Scene 1 disruption
 * 3. Distinct tones for each SAIL letter (S-A-I-L as musical notes)
 * 4. Stereo panning in Scene 5 (IMMERSE left, SAIL right)
 * 5. Soft "click" sound when credentials appear
 *
 * For now, the ambient pad + bass drop + heartbeat creates
 * a complete emotional arc that serves the narrative.
 */
