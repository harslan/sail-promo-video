# Audio Files Needed for SAIL Promo Video

Place all audio files in this directory (`public/audio/`).

## Required Files

### 1. `ambient-pad.mp3` (90 seconds)
**What it is:** The emotional foundation of the video. A warm, cinematic ambient pad that builds and breathes with the visuals.

**Character:**
- Contemplative, not aggressive
- Warm, not cold/synthetic
- Builds hope, not tension
- Think: documentary film, not action movie

**Where to find:**
- **Artlist.io** - Search "cinematic ambient" or "documentary underscore"
- **Epidemic Sound** - Search "ambient pad warm"
- **Suno.ai** - Generate with prompt: "90 second cinematic ambient pad, warm contemplative documentary score, builds gradually, no percussion, hopeful tone"

### 2. `bass-drop.mp3` (2-3 seconds)
**What it is:** The impact moment when "Ownership cannot." lands. A deep, weighty bass hit.

**Character:**
- Deep, felt-in-chest bass
- Single hit, not rhythmic
- Definitive, like a conclusion landing
- Think: the moment the beat drops, but understated

**Where to find:**
- **Freesound.org** - Search "cinematic bass hit" or "sub drop"
- **Epidemic Sound** - Search "impact hit low"
- **Pixabay** - Search "bass drop sound effect"

### 3. `heartbeat.mp3` (3-4 seconds)
**What it is:** The final signature. A single heartbeat (or double-pulse) that punctuates the ending.

**Character:**
- Organic, human
- Clear but not clinical
- The "pulse" motif made audible
- Think: life, presence, humanity

**Where to find:**
- **Freesound.org** - Search "heartbeat" (many free options)
- **Pixabay** - Search "heart beat sound"
- Any stock sound site - this is a common sound effect

---

## Optional Enhancement

### `subtle-whoosh.mp3` (1 second)
For text entrances. A gentle air movement sound.
- **Freesound.org** - Search "soft whoosh" or "gentle swoosh"

---

## How to Enable Audio

Once you have the files:

1. Place them in `public/audio/`:
   ```
   public/audio/
   ├── ambient-pad.mp3
   ├── bass-drop.mp3
   └── heartbeat.mp3
   ```

2. In `src/compositions/SAILPromo/index.tsx`, change:
   ```tsx
   <AudioDesign enabled={false} />
   ```
   to:
   ```tsx
   <AudioDesign enabled={true} />
   ```

3. Preview the video - audio should now play!

---

## Volume Automation

The `AudioDesign.tsx` component includes sophisticated volume automation:

- **Scene 1:** Near-silence (the emptiness is intentional)
- **Scene 2:** Subtle build (tension)
- **Scene 3:** Growing hope (framework reveal)
- **Scene 4:** Peak energy (competition proof)
- **Scene 5:** Intimate (student quotes)
- **Scene 6:** Drops for "the breath," then swells after impact
- **Scene 7:** Warm resolution, fades to silence

The bass drop and heartbeat are timed precisely to their visual moments.

---

## AI Music Generation (Fastest Option)

If you want music quickly:

1. Go to **Suno.ai** or **Udio.com**
2. Generate a 90-second track with this prompt:

   > "Cinematic ambient documentary score, warm and contemplative, starts minimal and builds gradually, no percussion or drums, hopeful and inspiring tone, suitable for higher education brand film, 90 seconds"

3. Download and rename to `ambient-pad.mp3`

For the bass drop and heartbeat, Freesound.org has free options that work great.
