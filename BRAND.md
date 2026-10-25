---
version: 1
name: Youkeo Studios
description: >
  Brand spec for video. Youkeo Studios is a recording studio in Airoli, Navi Mumbai, for artists
  making releases. The look is taken from youkeostudios.com: a near-black ink ground with real
  studio footage, white Plus Jakarta Sans headlines that end in a violet full stop, one italic
  Instrument Serif word per headline at most, and Geist Mono track labels. Light lavender-white
  "paper" scenes carry prices and lists. Flat colour throughout.
unit: 1920×1080 primary · 1080×1920 for Reels and Shorts · 1080×1080 for feed posts
principle: hex, fonts and weights are exact · sizes are scaled for the frame · real facts only

colors:
  ink: "#0B0B10"          # default ground
  ink-raised: "#16131D"   # cards and panels on ink
  paper: "#F4F2FA"        # light scenes
  white: "#FFFFFF"        # headlines and primary text on ink; card fill on paper
  fog: "#D8D4DF"          # body text on ink
  mute: "#A9A4B6"         # labels and secondary text on ink
  ink-mute: "#5A5568"     # secondary text on paper
  lavender: "#C9C1FF"     # motion accent: playhead, highlight, tags
  violet: "#8279BF"       # the dot only (logo dot, headline full stop, label dot)
  logo-black: "#111016"   # wordmark letters on light grounds
  line-dark: "rgba(255,255,255,0.12)"   # hairlines on ink
  line-light: "rgba(11,11,16,0.12)"     # hairlines on paper

typography:
  # Plus Jakarta Sans carries headlines, numbers and body
  display:   { fontFamily: "Plus Jakarta Sans", cqw: 7.5, weight: 600, lineHeight: 0.98, tracking: "-0.045em", color: "white" }
  h2:        { fontFamily: "Plus Jakarta Sans", cqw: 4.4, weight: 600, lineHeight: 1.06, tracking: "-0.035em", color: "white" }
  stat:      { fontFamily: "Plus Jakarta Sans", cqw: 3.6, weight: 600, lineHeight: 1.0, tracking: "-0.02em", color: "white" }
  body:      { fontFamily: "Plus Jakarta Sans", cqw: 1.6, weight: 400, lineHeight: 1.6, color: "fog" }
  button:    { fontFamily: "Plus Jakarta Sans", cqw: 1.3, weight: 600 }
  # Instrument Serif italic: one accent word inside a display or h2 line, never a whole line
  accent:    { fontFamily: "Instrument Serif", style: "italic", weight: 400, size: "1.08em of its line", tracking: "-0.01em" }
  # Geist Mono: labels, timecodes, prices
  label:     { fontFamily: "Geist Mono", cqw: 1.1, weight: 500, lineHeight: 1, tracking: "0.06em", upper: true, color: "mute" }
  price:     { fontFamily: "Geist Mono", cqw: 3.6, weight: 500, lineHeight: 1, tracking: "-0.05em", note: "the ₹ sign is Plus Jakarta Sans 600" }

spacing:
  pad-x: "6cqw"
  pad-y: "5cqw"
  gap-lg: "4cqw"
  gap-md: "2cqw"
  gap-sm: "1cqw"

components:
  headline-stop:
    description: "Every display and h2 headline ends with a full stop in {colors.violet}. It echoes the dot in the logo. Never on labels, body or buttons."
  italic-accent:
    typography: "{typography.accent}"
    description: "At most one word per headline, for the word that matters: 'Where songs get *finished*.' Reserved for the opening line and the closing call to action."
  track-label:
    typography: "{typography.label}"
    marker: "dot 0.45cqw in {colors.violet} with a halo ring of the same colour at 20% opacity, 0.25cqw wide, then a 0.7cqw gap"
    description: "Section eyebrow written like a track listing: 'TRK 03  SESSIONS'. The number is {colors.mute}, the name {colors.fog}."
  playhead:
    rule: "0.14cqw solid {colors.lavender}"
    description: "A thin lavender line that sweeps left to right (scaleX 0 → 1, linear) to open a scene or a light band. The studio's DAW playhead."
  hairline:
    rule: "1px {colors.line-dark} on ink, {colors.line-light} on paper; scale to 2px at 1080p so it survives compression"
    description: "The only divider. No thick borders."
  button-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "999px"
    typography: "{typography.button}"
    description: "Solid white pill on ink. Secondary is a 2px outline at 22% white. On paper the primary flips to an ink pill with white text."
  session-sheet:
    backgroundColor: "{colors.white}"
    border: "1px solid {colors.line-light}"
    rounded: "16px"
    description: "Price card on paper: package name in Plus Jakarta 600, price in {typography.price}, rows split by hairlines. The most chosen package gets a {colors.lavender} pill tag."
  record-crate:
    description: "Square release sleeves stacked in a crate, each 26px higher and further back, darker by 16% per step. The front sleeve tips forward (rotateX to -62deg) to reveal the next. A dark lip reads 'YOUKEO' and 'MADE HERE' in {typography.label}. Use it for releases made at the studio."
  photo-frame:
    rounded: "12px"
    shadow: "0 30px 60px -30px rgba(11,11,16,0.45)"
    description: "Studio and artist photos sit in rounded frames with no border. Full-bleed footage has no frame."
---

# Youkeo Studios: brand spec for video

> **For HyperFrames:** save this file as `DESIGN.md` at the project root and HyperFrames reads it
> automatically. Under any other name, point Claude at it in your prompt.

## What Youkeo is

A recording studio in Airoli, Navi Mumbai, run by an artist who releases music. Artists come here to
record, mix, master and finish songs they are releasing. Write for artists making releases, not for
beginners: lead with results, the engineer, the room and the founder's credits. Never frame Youkeo
around first-time or nervous artists ("first time?", "no judgment", "retakes are normal").

Tagline: **Where songs get *finished*.**

## The look in one line

Ink `#0B0B10` ground with real studio footage and photos; white Plus Jakarta Sans 600 headlines,
tight tracking, ending in a violet `#8279BF` full stop; one Instrument Serif italic word; Geist Mono
track labels in uppercase; paper `#F4F2FA` scenes for prices and lists; a lavender `#C9C1FF`
playhead line for transitions. Flat fills only.

## Colour roles

- **Ink** is the default ground. Most scenes are ink with footage.
- **Paper** is the one light ground, for prices, package cards and lists. Alternate ink and paper
  scenes rather than lightening the ink.
- **White** for headlines and the primary button. **Fog** for body text. **Mute** for labels.
- **Lavender** is the motion accent: the playhead line, a highlighted word or row, tags. Use it at
  full strength on the focal element; it disappears below 15% opacity once compressed.
- **Violet** is only ever the dot: the logo's dot, the full stop that ends a headline, the dot before
  a track label. Never a fill, never body text, never a background.
- No gradients across the frame. A soft radial glow of lavender at 15–25% behind one element is the
  limit.

## Fonts

None of the three faces are bundled with HyperFrames. Download the `.woff2` files into
`assets/fonts/` and declare them:

```css
@font-face { font-family: "Plus Jakarta Sans"; font-weight: 400; src: url("assets/fonts/plus-jakarta-sans-400.woff2") format("woff2"); }
@font-face { font-family: "Plus Jakarta Sans"; font-weight: 600; src: url("assets/fonts/plus-jakarta-sans-600.woff2") format("woff2"); }
@font-face { font-family: "Plus Jakarta Sans"; font-weight: 700; src: url("assets/fonts/plus-jakarta-sans-700.woff2") format("woff2"); }
@font-face { font-family: "Instrument Serif"; font-style: italic; font-weight: 400; src: url("assets/fonts/instrument-serif-400-italic.woff2") format("woff2"); }
@font-face { font-family: "Geist Mono"; font-weight: 500; src: url("assets/fonts/geist-mono-500.woff2") format("woff2"); }
```

Sources (Fontsource on jsDelivr, Latin subset):

```
https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-400-normal.woff2
https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-600-normal.woff2
https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-700-normal.woff2
https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-italic.woff2
https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-500-normal.woff2
```

Headlines are sentence case. Labels are uppercase mono. Numbers in stats are Plus Jakarta 600;
prices are Geist Mono 500 with the `₹` sign in Plus Jakarta 600.

## Logo

Two marks, both with white or black letters and a violet dot. Use the brand's files; never redraw the
logo or retype it in a font.

- **Wordmark "YOUKEO."**: the main logo.
  - White letters for ink or footage: `https://youkeostudios.com/assets/brand/youkeo-white-transparent.svg`
  - Black letters for paper: `https://youkeostudios.com/assets/brand/youkeo-black-transparent.svg`
- **Monogram "Y."**: for small or square spaces (avatars, a corner mark on a 1:1 post). Exact SVG,
  white version; swap `#FFFFFF` for `#111016` on light grounds:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="630.70 458.44 162.56 165.60" role="img"><title>Youkeo</title><path d="M699.176 593V560.52L659.656 487.4H690.696L711.656 537.48H712.616L733.576 487.4H764.296L725.096 560.2V593H699.176Z" fill="#FFFFFF"/><path d="M1240.67 595.08C1235.13 595.08 1230.97 593.907 1228.19 591.56C1225.53 589.213 1224.19 585.587 1224.19 580.68C1224.19 575.667 1225.53 571.987 1228.19 569.64C1230.97 567.293 1235.13 566.12 1240.67 566.12C1246.33 566.12 1250.54 567.293 1253.31 569.64C1256.09 571.987 1257.47 575.667 1257.47 580.68C1257.47 590.28 1251.87 595.08 1240.67 595.08Z" fill="#8279BF" transform="translate(-493.17 0)"/></svg>
```

Rules:
- The logo lands once, with weight, on the end card: wordmark centred on ink, with
  `youkeostudios.com` below it in `{typography.label}`. Don't dock it small in a corner through the film.
- Clear space around either mark is at least the height of the dot.
- Don't recolour the letters, change the dot colour, stretch, outline, or add glow or shadow.
- Retired logos, never use: the script "Youkeo Studios", the pink swoosh Y, the "Y." with a
  magenta dot.

## Motion

Taken from the website's GSAP motion.

- **Entrances:** `expo.out`, 0.9–1.2 s, rising about 3cqw while fading in. For CSS-driven moves the
  same feel is `cubic-bezier(.16, 1, .3, 1)`.
- **Headlines:** words rise out of masks (from 110% below), staggered 0.07 s, then supporting lines
  follow at 0.08 s steps.
- **Scrubbed or time-mapped moves** (playhead sweep, crate flip, spotlight queue) run linear.
- **Signature moments:** the lavender playhead sweeping across to open a scene; record sleeves tipping
  forward in the crate; artist cards gliding past a centre "NOW" marker and growing as they reach it.
- One orchestrated move per scene. No bounces, spins, particles, light leaks or glitch effects.

## Footage and photo grade

Every photo on the site uses this ffmpeg grade (a gentle warm-to-neutral pull, softened highlights,
saturation 0.93). Apply it to new studio footage so it matches:

```
selectivecolor=correction_method=relative:yellows='0 0.05 -0.32 0':neutrals='0.01 0.045 -0.08 0':whites='0 0.02 -0.03 0':blacks='0.04 0.08 -0.04 0.06',curves=master='0/0 0.12/0.07 0.35/0.32 0.65/0.67 0.88/0.9 1/0.97',eq=saturation=0.93
```

## Media library

All files are public at `https://media.youkeostudios.com/` + the path. Already graded.

**Studio**

| Path | Size | What |
|---|---|---|
| `videos/hero-720.mp4` | 1280×720, 10.8 s | Session footage used behind the homepage headline |
| `studio/control-room.webp` | 2400×1800 | Control room: desk, screens and monitors |
| `studio/vocal-booth.webp` | 2400×1800 | Treated vocal booth |
| `studio/lounge.webp` | 2400×1800 | Lounge |
| `studio/synth-wall.webp` | 1600×1200 | Arturia KeyStep, Novation Circuit Rhythm, Arturia MicroFreak on a pegboard wall |
| `studio/synths.webp` | 1600×1600 | Synth setup |
| `studio/monitors.webp` | 1500×2000 | Monitors, portrait |
| `stills/u87-booth.webp` | 689×918 | Neumann U87 in the booth |
| `stills/keys-v2.webp` | 1440×1920 | Keys, portrait |
| `stills/band-session.webp` | 1080×1920 | Band in session, portrait |

**Artists who record here** (1080×1440 portraits; use only these credits)

| Path | Artist | Credit |
|---|---|---|
| `stills/artist-som.webp` | Som | 70K+ followers · 5M+ streams |
| `stills/artist-saahel.webp` | Saahel | 250K+ followers · 50M+ streams |
| `stills/artist-gaush.webp` | Gaush | 50K+ followers · MTV Hustle |
| `stills/artist-basspeak-solo.webp` | Basspeak | Mixing credits: Badshah, Panther, Raga |
| `stills/artist-swapnil.webp` | Swapnil of Nikhil-Swapnil | 50M+ streams · KPKWK, Parinda with Panther |

Gravero (1M+ subscribers · 100M+ streams) has no portrait; use the Dooriyan cover.

**Artist videos** (720×1280, speaking to camera about the studio)

| Path | Who | Length | Poster |
|---|---|---|---|
| `reviews/saahel.mp4` | Saahel | 40.6 s | `stills/saahel-poster-v2.webp` |
| `reviews/som.mp4` | Som | 12.1 s | `stills/som-poster-v2.webp` |

**Releases made here** (1280×1280 covers)

| Path | Release | Artist | Streams |
|---|---|---|---|
| `artworks/o-sajna-hd.webp` | O Sajna | Swapnil Chaudhary | 1M+ |
| `artworks/dooriyaan-hd.webp` | Dooriyan | Gravero, Rhyo & Kinara | 500K+ |
| `artworks/aarzoo-hd.webp` | Aarzoo | Shoonya & Kinara | 100K+ |

**Founder**: `images/founder-hd.webp` (1600×1600), Nishchay Beharam.

## Copy voice

- Plain verbs, sentence case, specific beats clever. Short lines.
- Calls to action name the action: "Check availability", "See packages", "Start a project".
- Prices in `₹` with Indian grouping (₹14,000). Times in 24h IST (11:00–22:00 IST).
- Headlines from the site, to match: "Where songs get *finished*." · "Navi Mumbai's room for
  independent releases." · "Four ways to finish a song." · "Heard it from the artists." ·
  "10M+ streams, made in this room." · "Run by an artist who releases music." · "Your *next
  release* starts here."
- Avoid "Introducing", "unlock", "seamless", "game-changer", "world-class", "state-of-the-art".

## Facts you may use (nothing else; never invent numbers)

- Studio time from **₹1,200/hr**, engineer included.
- Packages per song: **Record & Mix ₹7,500** · **Recording to Final ₹14,000** · **Production to
  Final ₹26,000**. A 20% advance books a slot; full refund if cancelled 24+ hours ahead.
- **200+** artists recorded · **10M+** streams on tracks made here · **★ 5.0** on Google ·
  10+ Spotify editorial placements, including New Music Friday India.
- Founder **Nishchay Beharam** releases as **Shoonya** and **Rhyo**: 10+ years making music, 1M+
  Spotify streams.
- Gear: Neumann U87 · Neumann KH 310 monitors · Audient iD48 · Warm Audio WA73-EQ.
- Near ICICI Bank, Sector 19, Airoli, Navi Mumbai · 8 minutes from Airoli station · open daily
  11:00–22:00 IST.
- WhatsApp and phone **+91 96 1919 2992** · **hello@youkeostudios.com** · Instagram
  **@youkeostudios** · **youkeostudios.com**

## Social formats

- **Reels and Shorts (1080×1920):** keep text and the logo out of the bottom 320 px and the right
  120 px, where Instagram places captions and buttons. Frame 0 is the thumbnail: a face, the room or
  one bold line, never black and never the logo alone.
- **Feed (1080×1080):** the "Y." monogram may sit small in a corner here; the wordmark still owns the
  end card.
- **Landscape (1920×1080):** YouTube and the website.

## Do and don't

Do:
- Open on real footage or a real artist, in the studio.
- Use real numbers from the facts list, set large in `{typography.stat}`.
- End headlines with the violet full stop.
- Alternate ink and paper scenes; one accent word per headline.

Don't:
- Invent artists, quotes, numbers, gear or prices.
- Use stock music-studio imagery, neon, waveforms as wallpaper, glow or particles.
- Use gradients across the frame, or lavender or violet as a background.
- Put body text in Instrument Serif, or set a whole line in italic.
- Show the retired script or magenta logos.
- Pitch to first-time or nervous artists.
