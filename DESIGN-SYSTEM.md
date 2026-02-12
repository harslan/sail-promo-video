# SAIL Promo Video — Design System

## COLOR PALETTE

### Primary
```
--bg-deep:       #0B0B14    /* Deep space — primary background */
--bg-surface:    #13131F    /* Slightly lifted surface */
--bg-card:       #1C1C2E    /* Card/panel background */
```

### Accent Colors
```
--suffolk-gold:  #C4A44E    /* Suffolk University gold — primary brand accent */
--sail-coral:    #E85D75    /* The Pulse / SAIL signature coral */
--sail-teal:     #4ECDC4    /* Fresh, intelligent */
--sail-blue:     #4A90D9    /* Trustworthy, connected */
--sail-lavender: #B8A9F0    /* Thoughtful, creative */
```

### Pillar Colors (use these consistently)
```
S — Social Intelligence:  #4A90D9  (blue)
A — AI Literacy:          #4ECDC4  (teal)
I — Innovation/Inquiry:   #E85D75  (coral)
L — Leadership:           #C4A44E  (gold)
```

### Text
```
--text-primary:  #F0EFF4    /* High contrast body text */
--text-muted:    #8888A0    /* Secondary/supporting text */
--text-dim:      #555570    /* Tertiary/timestamps */
--text-ghost:    #333348    /* Very subtle/watermark */
```

### Functional
```
--glow-coral:    rgba(232, 93, 117, 0.3)
--glow-gold:     rgba(196, 164, 78, 0.3)
--glow-teal:     rgba(78, 205, 196, 0.2)
```

## TYPOGRAPHY

### Headlines — Cormorant Garamond
```
Font: Cormorant Garamond (from @remotion/google-fonts)
Weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)
Use for: All major headlines, the thesis lines, quotes, pillar names
Character: Elegant, academic-warm, distinctive. NOT generic.
```

### Body / Labels — DM Sans
```
Font: DM Sans (from @remotion/google-fonts)
Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
Use for: Subtitles, labels, attributions, small text, UI elements
Character: Clean, modern, professional. Great readability at small sizes.
```

### Type Scale (at 1080x1920)
```
--text-hero:     120px    /* "Ownership cannot." — the biggest moment */
--text-title:    72px     /* Scene titles, pillar names */
--text-headline: 54px     /* Major lines in thesis */
--text-subtitle: 36px     /* Pillar questions, subheadlines */
--text-body:     28px     /* Body text, descriptions */
--text-caption:  22px     /* Labels, attributions */
--text-micro:    16px     /* Tiny labels, watermarks */
```

### Type Rules
- Headlines: Cormorant Garamond Light (300) or Regular (400) — never bold for the main hero text
- Emphasis: Cormorant Garamond SemiBold (600) — use sparingly
- The word "Ownership" in Scene 6: Cormorant Garamond Bold (700), Suffolk gold color
- Quotes: Cormorant Garamond Light Italic
- Body: DM Sans Regular (400) or Medium (500)
- Labels/badges: DM Sans SemiBold (600), all-caps, letter-spacing: 4px

## ANIMATION PRINCIPLES

### Easing
```javascript
// Primary ease — smooth, deliberate (use for most text entrances)
const EASE_SMOOTH = [0.16, 1, 0.3, 1]; // cubic-bezier

// Cinematic ease — slower start, confident arrival
const EASE_CINEMATIC = [0.25, 0.1, 0.25, 1];

// Spring — organic, warm (use for pillar reveals, avatar entrances)
// In Remotion: spring({ fps: 30, config: { damping: 15, stiffness: 80 } })
```

### Timing
```
Standard text entrance:     800ms
Stagger between elements:   150-200ms
Scene transition:           600ms crossfade
Hold after major line:      2000-3000ms (LET IT BREATHE)
Beat / pause:               1500ms of nothing
```

### Motion Patterns

**Text entrance:** Fade in + subtle upward drift (translateY: 20px → 0). Never slide from sides for the main content — that's too energetic for this tone.

**Pillar reveals:** Each letter starts large and centered, then shrinks and moves to position as the full name expands from it. Use spring() for organic feel.

**Data visualizations (Scene 4):** Faster, more energetic. Lines draw themselves. Charts fill from bottom. Numbers count up rapidly. This scene has different energy — kinetic, intellectual.

**The thesis (Scene 6):** Slowest, most deliberate animations in the video. Each line fades in with significant pauses between them. "Ownership cannot." should arrive with a subtle camera-shake effect or pulse — something that says "this is the moment."

### What NOT to do
- No bouncy animations (this isn't a startup product demo)
- No spinning or rotating text
- No emoji in the actual video (except the 🫀 heartbeat at the very end)
- No gradients that scream "AI-generated" (no purple-to-blue default gradients)
- No stock photo montage feel
- No slide-from-left / slide-from-right pattern for main content

## BACKGROUND & TEXTURE

### Particle Field
- Subtle, ambient floating particles (like distant stars or neurons)
- 30-50 particles, sizes 1-4px
- Colors: mix of text-dim, coral (10% opacity), teal (10% opacity)
- Float gently with sine-wave motion, period 15-25 seconds
- This runs throughout the entire video as atmospheric background

### Grain Overlay
- Subtle film grain texture at 3-5% opacity
- Adds cinematic texture, prevents the "too clean digital" look
- Apply as a full-screen overlay with mix-blend-mode

### Scene Backgrounds
- Scenes 1, 2: Pure dark (#0B0B14) — stark, minimal
- Scene 3: Slightly warmer (#0F0B14 — hint of purple) as the framework brings hope
- Scene 4: Slightly more energetic — increase particle density, add subtle glow effects
- Scene 5: Warm — subtle warm glow behind quotes (gold, very low opacity)
- Scene 6: Intensifying — particles slowly converge toward center during the three lines
- Scene 7: Resolving — particles settle, warm gold tone enters

## LAYOUT PRINCIPLES (1080x1920)

### Safe Areas
```
Vertical padding:    120px top, 120px bottom
Horizontal padding:  80px left, 80px right
Content area:        920px wide × 1680px tall
```

### Text Positioning
- Major headlines: centered vertically and horizontally
- Pillar reveals: center-top third of frame
- Quotes: center with generous white space
- Scene 6 thesis: center, but each line slightly lower than the last (cascading downward)
- Credits/badges: lower third

### Visual Weight Distribution
- Top-heavy composition for mobile viewing (most important content in upper 60%)
- Bottom 20% reserved for branding/CTA in closing scene

## SOUND DESIGN (OPTIONAL — ADD LATER)

If adding audio:
- Ambient pad drone throughout (warm, not cold/synthetic)
- Very subtle bass pulse on the thesis lines
- Silence (or near-silence) in Scene 1 — the emptiness IS the design
- Build energy in Scene 4, pull back in Scene 5
- Single heartbeat sound effect at the very end

## RENDERING SPECS

### Vertical (Primary)
- Composition: SAILFrameworkPromo
- Resolution: 1080 × 1920
- FPS: 30
- Duration: 2700 frames (90 seconds)
- Codec: H.264
- Quality: CRF 18 (high quality)

### Horizontal (Secondary)
- Composition: SAILFrameworkPromoWide
- Resolution: 1920 × 1080
- Same duration and FPS
- Adapted layouts (side-by-side instead of stacked where appropriate)

### Social Cuts (create after main video is approved)
- Instagram Reel: 30 seconds (Scenes 1 + 3 + 6 + 7)
- LinkedIn: 60 seconds (Scenes 1 + 3 + 5 + 6 + 7)
- Thumbnail: Scene 6, frame with all three thesis lines visible
