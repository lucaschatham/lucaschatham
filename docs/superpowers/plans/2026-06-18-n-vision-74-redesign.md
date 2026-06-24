# N Vision 74 Redesign — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans or subagent-driven-development to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Re-skin lucaschatham.com from its current pure-black / electric-blue theme into the "precision instrument, hand-built" design language extracted from the Hyundai N Vision 74 — machined grayscale body, one rationed red, sharp geometry, pixel-grid signature, deliberate on desktop.

**Architecture:** This is a visual re-skin, not a structural rewrite. ~90% of the change lives in `app/global.css` (CSS custom properties + per-selector color/radius edits). Small touches in `app/layout.tsx` (favicon, themeColor) and `components/manifest.tsx` (pixel mark in nav). One dead file deleted. The component tree, routing, and content stay as-is.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind 4 (via `@import "tailwindcss"`), MDX. Package manager: **npm** (`package-lock.json`). Dev: `npm run dev` (turbopack, localhost:3000). No test runner — verification is `npm run build` + `npm run lint` + before/after screenshots + a manual Red Rule audit.

**Spec:** `docs/superpowers/specs/2026-06-18-n-vision-74-redesign-design.md` (read it first — especially the Red Rule).

---

## Verification model (read before starting)

There are no unit tests and TDD does not apply to a CSS re-skin. Each task is verified by:
1. **Build clean:** `npm run build` exits 0 (catches TS/CSS-import breakage).
2. **Visual diff:** screenshot the affected page(s) at desktop (1280px) and mobile (390px) and compare to the baseline captured in Task 0. Use the `/browse` skill or the Claude_Preview MCP against `npm run dev`.
3. **Red Rule audit:** on each task that touches color, count visible red elements per viewport *at rest*. Must be **exactly one** on the homepage (the active nav dot). Hover/focus may transiently add one.

Commit after each task. Conventional commits, no AI/Claude mention.

---

## File structure

| File | Responsibility | Change |
|---|---|---|
| `app/global.css` | All theme tokens + component styles | Heavy modify |
| `app/layout.tsx` | Favicon data-URI, themeColor | Light modify |
| `components/manifest.tsx` | Nav pixel mark | Light modify |
| `components/nav.tsx` | (orphaned template nav) | Delete |

---

## Task 0: Branch + baseline screenshots

**Files:** none (git + screenshots only)

- [ ] **Step 1: Branch off master**

```bash
cd /Users/HQ/Projects/lucaschatham.com/site
git checkout -b redesign/n-vision-74
```

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```
Expected: ready on http://localhost:3000

- [ ] **Step 3: Capture baseline screenshots**

Screenshot `/` at viewport 1280×900 (desktop) and 390×844 (mobile). Save as `before-desktop` and `before-mobile`. These are the diff reference for every later task.

- [ ] **Step 4: Commit (branch marker, no code yet)** — skip if nothing to commit; the branch itself is the marker.

---

## Task 1: Palette tokens + base field

**Files:** Modify `app/global.css:7-16` (the `:root` block) and `app/global.css:25-33` (`html, body`).

- [ ] **Step 1: Replace the `:root` token block**

Replace the existing `:root { ... }` (lines 7-16) with:

```css
:root {
  /* machined grayscale body */
  --silver-100: #E8E8E6;   /* aluminium highlight · primary text */
  --silver-200: #C9CBCD;
  --gray-400:   #9A9DA1;    /* faint labels */
  --steel-500:  #6B6E72;    /* muted text / mono labels */
  --gunmetal-700: #3A3D42;
  --charcoal-800: #222427;
  --shadow-900: #121316;

  --bg:    #1A1C1F;         /* base field — warm near-black, NOT #000 */
  --pulse: #CB3A2D;         /* THE red. one living thing per viewport */
  --line:  rgba(232, 232, 230, .08);  /* hairline panel-line divider */

  /* legacy aliases kept so existing rules resolve; retune below */
  --ink:   var(--bg);
  --cream: var(--silver-100);
  --mute:  var(--steel-500);
  --accent: var(--pulse);   /* live-state usages only — see Task 2 */
  --good:  #9be5b1;
}
```

Note: `--accent-glow` and `--accent-dim` (old blue) are intentionally dropped. Task 2 removes their last usages; if `npm run build` complains about an undefined var first, that pinpoints a usage to fix in Task 2.

- [ ] **Step 2: Confirm base background**

`html, body` already use `background: var(--ink)` → now resolves to `#1A1C1F`. No edit needed unless a hardcoded `#000` exists there. Confirm `.stage { background: #0a0a0a }` (line ~165) → change to `var(--shadow-900)`.

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: exits 0. If it errors on `--accent-dim`/`--accent-glow`, note the file:line for Task 2.

- [ ] **Step 4: Visual check** — homepage now reads gunmetal, not pure black; text is cool silver. Blue still present (fixed next task). Screenshot.

- [ ] **Step 5: Commit**

```bash
git add app/global.css
git commit -m "refactor: replace blue/black tokens with N Vision grayscale palette"
```

---

## Task 2: Red discipline (the core of the redesign)

**Files:** Modify `app/global.css` at the accent usages found below. Goal: red appears at rest only on the active nav item + its dot. Everything persistent → gray; every hover/active → silver brighten.

Reassignment table (apply each):

| Line(s) | Selector | Was (blue) | Becomes |
|---|---|---|---|
| 51 | `:focus-visible` outline | `var(--accent)` | keep `var(--pulse)` — focus is a live state |
| 96 | `.nav a.active` | `var(--accent)` | keep `var(--pulse)` ✓ canonical |
| 110-111 | `.nav a.active .dot` bg + shadow | `var(--accent)` | keep `var(--pulse)` ✓ THE pulse |
| 201 | `.man .h .n` kicker | `var(--accent)` | **`var(--steel-500)`** (always visible → must be gray) |
| 231 | `.r:hover .arr` | `var(--accent)` | `var(--silver-100)` (hover = brighten, not red) |
| 307-309 | `.all:hover` color/border/bg | `var(--accent)` / `--accent-dim` | color `var(--silver-100)`, border `var(--silver-200)`, bg `rgba(232,232,230,.04)` |
| 353 | `.com a:hover .ic` | `var(--accent)` | `var(--silver-100)` |
| 357-358 | `.com a:active` color + bg | `var(--accent)` / `--accent-dim` | color `var(--silver-100)`, bg `rgba(232,232,230,.04)` |
| 373 | `.com a:active .ic` | `var(--accent)` | `var(--silver-100)` |
| 405 | `.skip` background | `var(--accent)` | keep `var(--pulse)` — skip link is the live element when focused |

- [ ] **Step 1: Apply all reassignments above.**

- [ ] **Step 2: Remove the blue glow on the portrait.** `app/global.css:166` — `.stage` box-shadow currently `0 24px 60px -24px rgba(58,175,255,.12), 0 0 0 1px rgba(245,243,238,.04)`. Replace with a neutral lift: `0 24px 60px -24px rgba(0,0,0,.5), 0 0 0 1px var(--line)`.

- [ ] **Step 3: grep for stragglers**

```bash
grep -rn "3aafff\|58, 175, 255\|accent-glow\|accent-dim" app components
```
Expected: only `app/layout.tsx` (favicon, fixed in Task 5). If any global.css hit remains, fix it.

- [ ] **Step 4: Build** — `npm run build` exits 0.

- [ ] **Step 5: Red Rule audit** — load `/` at rest. Count red elements. **Must be exactly 1** (the active "Home" dot). Hover a row → arrow brightens silver, no second red. Screenshot desktop + mobile.

- [ ] **Step 6: Commit**

```bash
git add app/global.css
git commit -m "feat: enforce single-red discipline, retire electric blue"
```

---

## Task 3: Geometry (sharpen the wedge)

**Files:** Modify `app/global.css` radii.

- [ ] **Step 1: Reduce radii** to the spec's 2-4px:
  - line ~53 `:focus-visible` `border-radius: 8px` → `2px`
  - line ~163 `.stage` `border-radius: 20px` → `4px`
  - line ~213 `.r` `border-radius: 8px` → `2px`
  - line ~296 `.all` `border-radius: 8px` → `2px`
  - line ~407 `.skip` `border-radius: 6px` → `2px`
  - `.nav a` `border-radius: 6px` (~line 84) → `2px`

- [ ] **Step 2: Build** — exits 0.
- [ ] **Step 3: Visual check** — corners now crisp/faceted, not soft. Screenshot.
- [ ] **Step 4: Commit**

```bash
git add app/global.css
git commit -m "style: tighten radii to folded-wedge geometry"
```

---

## Task 4: Responsive — deliberate on desktop

**Files:** Modify `app/global.css:39-42` (`.page`).

- [ ] **Step 1: Lift the phone-strip cap.** Replace `.page { max-width: 430px; margin: 0 auto; }` with a wider reading column that still centers and breathes:

```css
.page {
  max-width: 520px;
  margin: 0 auto;
  padding-inline: max(0px, env(safe-area-inset-left));
}
```

- [ ] **Step 2: Let the field breathe on large screens (optional, recommended).** Add at the end of global.css:

```css
@media (min-width: 768px) {
  .hero { padding-top: 88px; }
  .stage { margin-block: 56px; }
}
```
Keep it conservative — the column stays narrow; only vertical rhythm opens up. (Wider hero/portrait treatments are a follow-up, not this task.)

- [ ] **Step 3: Build** — exits 0.
- [ ] **Step 4: Visual check** — at 1280px the page is a centered ~520px column on a full-bleed gunmetal field, looks intentional (not a 430px phone strip). At 390px it's unchanged/fluid. Screenshot both.
- [ ] **Step 5: Commit**

```bash
git add app/global.css
git commit -m "feat: widen reading column so the site reads deliberate on desktop"
```

---

## Task 5: Pixel-grid signature + favicon

**Files:** Modify `components/manifest.tsx` (ManifestNav, ~line 100-118), `app/global.css` (new `.mark` rule), `app/layout.tsx` (favicon data-URI line 7-8, themeColor line 69).

- [ ] **Step 1: Add the pixel mark to the nav.** In `ManifestNav`, prepend a decorative 3×3 grid before the mapped links:

```tsx
<nav className="nav" aria-label="Primary">
  <span className="mark" aria-hidden="true">
    {Array.from({ length: 9 }).map((_, i) => (
      <span key={i} className={i === 4 ? "px on" : "px"} />
    ))}
  </span>
  {links.map((item) => {
    /* unchanged */
  })}
</nav>
```

- [ ] **Step 2: Style the mark** — add to global.css:

```css
.mark {
  display: grid;
  grid-template-columns: repeat(3, 4px);
  gap: 2px;
  margin-right: 4px;
}
.mark .px { width: 4px; height: 4px; background: var(--steel-500); }
.mark .px.on { background: var(--silver-100); }
```
(Center pixel brighter = the lamp lit. No red here — red stays the nav dot.)

- [ ] **Step 3: Replace the favicon** in `app/layout.tsx`. Swap the `iconHref` (line 7-8) for a pixel-grid mark on gunmetal with one red center pixel (the brand pulse — lives in browser chrome, not the page viewport, so it doesn't break the Red Rule):

```ts
const iconHref =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' rx='32' fill='%231A1C1F'/%3E%3Crect x='16' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='124' y='16' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='16' y='70' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='70' width='40' height='40' fill='%23CB3A2D'/%3E%3Crect x='124' y='70' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='16' y='124' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='70' y='124' width='40' height='40' fill='%236B6E72'/%3E%3Crect x='124' y='124' width='40' height='40' fill='%236B6E72'/%3E%3C/svg%3E";
```

- [ ] **Step 4: Update themeColor** — `app/layout.tsx:69` `themeColor: "#000000"` → `"#1A1C1F"`. (Optional: same in the viewport export if present.)

- [ ] **Step 5: Build** — exits 0.
- [ ] **Step 6: Visual check** — pixel mark sits left of the centered nav links; favicon shows the pixel grid with a single red pixel. Screenshot.
- [ ] **Step 7: Commit**

```bash
git add components/manifest.tsx app/global.css app/layout.tsx
git commit -m "feat: add pixel-grid signature mark and favicon"
```

---

## Task 6: Remove dead code + final verification

**Files:** Delete `components/nav.tsx`.

- [ ] **Step 1: Re-confirm zero imports** (it was clean during planning, re-check after edits):

```bash
grep -rn "components/nav\b" app components
```
Expected: no output.

- [ ] **Step 2: Delete**

```bash
git rm components/nav.tsx
```

- [ ] **Step 3: Full build + lint**

```bash
npm run build && npm run lint
```
Expected: both exit 0.

- [ ] **Step 4: Final Red Rule audit + screenshots** — `/`, `/essays`, `/projects`, `/about` at desktop + mobile. Each: exactly one red at rest (active nav dot). Confirm `prefers-reduced-motion` still kills the dot pulse animation.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove orphaned template nav component"
```

---

## Done criteria
- No `#3aafff` / blue anywhere except none (favicon now grayscale+red).
- Exactly one red per viewport at rest, on every page.
- Base is `#1A1C1F`, not `#000`.
- Radii ≤ 4px.
- Desktop shows a deliberate centered column, not a phone strip.
- Pixel mark in nav + pixel favicon present.
- `components/nav.tsx` gone; `npm run build` + `npm run lint` green.
- All work on `redesign/n-vision-74`; PR is a follow-up (not auto-merged).
