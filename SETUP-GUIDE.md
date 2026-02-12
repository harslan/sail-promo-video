# SAIL Framework Promo Video — Complete Setup Guide
## Remotion + Claude Code on MacBook Pro

---

## BEFORE YOU START

You need:
- ✅ MacBook Pro (you have this)
- ✅ VS Code (you have this)
- ✅ Claude Code in terminal (you have this)
- ✅ Node.js 16+ (check: `node --version` in terminal)
- ✅ npm (comes with Node.js)

If you don't have Node.js:
```bash
brew install node
```

---

## STEP-BY-STEP (15 minutes to first render)

### Step 1: Create the project folder

Open VS Code. Open the integrated terminal (`` Ctrl+` `` or `Cmd+` `).

```bash
cd ~/Desktop
mkdir sail-promo-video
cd sail-promo-video
```

### Step 2: Create the Remotion project

```bash
npx create-video@latest .
```

When it asks:
- **Template:** Select `Blank`
- **Use TailwindCSS?** → `Yes`
- **Install Skills?** → `Yes`
- **Package manager:** → `npm`

Wait for installation to complete.

### Step 3: Verify skills installed

```bash
ls -la .claude/skills/
```

You should see `remotion-best-practices/`. If not:
```bash
npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices
```

### Step 4: Copy the project files into the folder

Copy these 3 files from the download into your `sail-promo-video/` folder:

```
sail-promo-video/
├── CLAUDE.md              ← Project context (Claude Code reads this automatically)
├── SAIL-VIDEO-BRIEF.md    ← The creative brief + master prompt
├── DESIGN-SYSTEM.md       ← Colors, fonts, animation rules
├── src/                   ← (created by Remotion)
├── public/                ← (created by Remotion)
└── ...
```

### Step 5: Start the Remotion preview server

```bash
npm run dev
```

This opens Remotion Studio in your browser at `http://localhost:3000`.
**Keep this running** — you'll see the video update in real-time as Claude Code writes the code.

### Step 6: Open a NEW terminal tab in VS Code

`Cmd+Shift+` ` (backtick) to open a second terminal. Then:

```bash
cd ~/Desktop/sail-promo-video
claude
```

Claude Code is now running inside your project. It will automatically read:
- `CLAUDE.md` (your project context)
- `.claude/skills/remotion-best-practices/` (Remotion best practices)

### Step 7: Give Claude Code the brief

Type this in Claude Code:

```
Read SAIL-VIDEO-BRIEF.md and DESIGN-SYSTEM.md, then build the complete SAILFrameworkPromo composition. Create each scene as a separate component file. Start with the full composition structure, then build each scene one by one. Show me the preview after each scene.
```

### Step 8: Watch it come to life

Switch to your browser. Remotion Studio will hot-reload as Claude Code creates components. You'll see each scene appear in real-time.

### Step 9: Iterate

Talk to Claude Code naturally:

```
Scene 3 feels too fast — give each SAIL pillar 4 seconds instead of 3.

The typography in Scene 6 needs more weight — make "Ownership cannot." significantly larger than the other two lines.

Add a subtle grain texture overlay to the entire video.

The transition between Scene 4 and 5 is jarring — add a 1-second dissolve.
```

### Step 10: Render the final video

When you're happy with the preview:

```bash
npx remotion render SAILFrameworkPromo out/sail-promo.mp4
```

Or ask Claude Code:
```
Render the final video at 1080x1920, 30fps, high quality.
```

Your MP4 will be at `out/sail-promo.mp4`.

---

## TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| `npm run dev` fails | Run `npm install` first |
| Claude Code doesn't see skills | Run `/skill` in Claude Code to check; reinstall if needed |
| Preview is blank | Check browser console for errors; ask Claude Code to debug |
| Render is slow | Normal — a 90s video takes a few minutes locally |
| Fonts don't load | Ask Claude Code to use `@remotion/google-fonts` package |

---

## AFTER THE VIDEO IS DONE

1. **Review the MP4** — Play it in QuickTime, share with a colleague
2. **Iterate** — Go back to Claude Code and refine
3. **Create variants:**
   - `Render a 30-second cut for Instagram (scenes 1, 3, 6, 7 only)`
   - `Render a 16:9 horizontal version for presentations`
   - `Create a thumbnail still from the Scene 6 closing line`
4. **Export:** Move `out/sail-promo.mp4` wherever you need it

---

*You're going to love this.*
