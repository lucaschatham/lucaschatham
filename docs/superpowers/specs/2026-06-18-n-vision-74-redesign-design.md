# Design language: "Precision instrument, hand-built"

Date: 2026-06-18
Status: approved (direction), pending implementation plan
Source: aesthetic extraction from the Hyundai N Vision 74 (retro-futurist wedge; 1974 Pony Coupe + DeLorean DNA, modern EV tech). Reference images supplied by Lucas — board of N Vision 74 shots + a close-up of the rear quarter / wheel where a single red hub cap is the only chroma in an otherwise grayscale frame.

## The concept

The page is a machined grayscale body. **Red is the one living thing on it.** Grays build every structure; red marks the single element that is *alive / active / now*.

### Why this is personal (the thread a junior should understand)
Lucas is a maker (wood, metal, the dance floor) who builds health technology and writes about longevity. The car is itself a maker's object: hand-built metal warmed by one red pulse. So the whole system reads as a precision instrument, hand-built:
- **Grayscale machined body** = his craft + technical rigor.
- **Pixel/dot-matrix light motif** = his digital / AI / health-tech edge.
- **The single red** = vitality, the heartbeat, the one *alive* thing in the machine — a direct nod to the health-and-longevity work.

Every decision then has a rule a junior can repeat: *grays build the structure, red marks the one living thing on the screen.*

## Base decision (LOCKED)

**Dark gunmetal base.** Warm near-black field (`#1A1C1F`), NOT pure black. Rationale: red sings loudest against shadow — exactly why the image-2 hub cap pops, framed by the dark wheel well. Also closest to the current dark identity (lower migration risk). Light aluminium was the considered alternative and was declined.

## 1. Tokens (exact)

```
--silver-100   #E8E8E6   /* aluminium highlight · primary text on dark */
--silver-200   #C9CBCD
--gray-400     #9A9DA1   /* faint labels */
--steel-500    #6B6E72   /* muted text / mono labels */
--gunmetal-700 #3A3D42
--charcoal-800 #222427
--shadow-900   #121316
--bg-dark      #1A1C1F   /* base field — NOT pure #000 */
--pulse        #CB3A2D   /* THE red, tuned for the dark base */
--line         rgba(232,232,230,.08)   /* panel-line divider */
```

Most important change from today: base is currently pure `#000` and the accent is electric blue `#3aafff` used liberally. Pure black -> warm gunmetal. Blue-everywhere -> red-almost-nowhere.

## 2. The Red Rule (the law)

- **Exactly one** red element visible per viewport at rest.
- Red marks only the *live / active / now* thing: active nav item, a "live" link, current status, the cursor of attention.
- **Never:** backgrounds, card borders, body or heading text, hover fills, decoration, or two reds at once.
- Litmus test: *"If I'm unsure whether this should be red — it shouldn't."*

## 3. Surface & material

Matte machined metal. No gloss, no neon glow (remove the current blue glow on the portrait). Structure is drawn with **hairline panel-line dividers** (the `--line` token), not boxes or cards — like the panel gaps that define the car's body. At most one barely-there directional gradient per large surface (brushed-metal feel).

## 4. Geometry

Folded-wedge: sharp. Drop radii from today's 8–20px down to **2–4px**. Portrait image -> 4px (not 20px). Rows -> 0–2px. Everything aligns to one rectilinear column.

## 5. Typography

Keep Geist + Geist Mono (already ideal — technical, precise). Sans for content. **Mono = "instrument labels" only:** section kickers, dates, meta, nav — uppercase, wide tracking (.18–.24em), tabular numerals on. Name stays thin-first / bold-surname (that weight contrast *is* the wedge). Optional restrained personality: tiny mono "spec readout" lines.

## 6. Pixel motif (signature element)

A small monochrome **3×3 pixel grid** as the personal mark — echoes the car's parametric LED lamps. Use as favicon, nav logo, loading states. Pixels may light up gray on hover; red stays reserved.

## 7. Motion

Quiet and mechanical: 120–200ms ease, `scale(.98)` on press, the lone red dot keeps its slow pulse. No springy/bouncy motion — a precision instrument doesn't wobble. Respect `prefers-reduced-motion` (already handled in global.css).

## 7b. Hero direction (CHOSEN 2026-06-22 — "Gallery D", mobile-first)

Explored three executions (instrument-cluster / gallery / spec-sheet terminal) via design-shotgun + design-boardroom. Verdict: the gallery family is sexiest; within it, mobile-majority makes **D, full-bleed cinematic hero** the winner (asymmetric "E" is a desktop-only split that collapses on phones).

- The **portrait is the hero**: edge-to-edge image owning the top of the screen, name overlaid bottom-left, content scrolls beneath. Native mobile pattern.
- **Portrait grade = grayscale / gunmetal** (chosen). The supplied photo (`public/images/lucas-portrait-clean.jpg`) has a bright studio background that would clash full-bleed. CSS treatment: `filter: grayscale` + a radial vignette darkening the light edges toward `#1A1C1F` + a bottom linear scrim so the silver name is legible in shadow. Pure CSS can't replace the backdrop; a one-time image edit (mask + replace bg with gunmetal) is the optional "do it right" upgrade.
- Keep the sticky gunmetal nav bar ABOVE the image (don't overlay nav on the photo) — preserves nav legibility and the one red dot.
- Tagline moves to a `.lede` block below the image.

## 8. Component application

- **Nav:** pixel mark left · mono uppercase links · active link = the one red dot · stays a sticky gunmetal bar above the hero.
- **Hero (Gallery D):** full-bleed grayscale-graded portrait · name overlaid bottom-left in silver over a scrim · tagline below in a `.lede` block.
- **Essay rows:** hairline dividers · mono date right-aligned · hover = subtle gray wash, never red.
- **Footer / social:** mono, gray. Remove all blue.
- **Global find-and-replace:** every `#3aafff` (and `--accent*` blues in global.css) -> the gray/red system.

## 9. Responsive (CONFIRMED)

Lift the hard `max-width: 430px` (global.css). A personal site should look *deliberate* on desktop, not like a phone strip. Keep a narrow centered reading column (~480–560px) but let the field around it breathe full-bleed; the portrait/hero may go wider on desktop. "Looks intentional on desktop" is in-scope.

## Out of scope / open items
- Real essay content (homepage essays are currently placeholders in `components/manifest.tsx`).
- Dead code: `components/nav.tsx` (orphaned light-mode template nav) — remove during implementation.
- Exact pixel-mark artwork (favicon SVG) — to be designed in implementation.

## Files this will touch (preliminary)
- `app/global.css` — palette, dividers, radii, remove blue, base color.
- `app/layout.tsx` — favicon (pixel mark), themeColor.
- `components/manifest.tsx` — nav dot color, portrait, rows, social.
- `components/nav.tsx` — delete (dead code).
