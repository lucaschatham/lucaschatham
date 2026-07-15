# LucasChatham.com Design System

This file records reusable visual rules for the site. New UI should extend these rules instead of creating a parallel component or palette.

The system is adapted from the MIT-licensed Tailwind Next.js Starter Blog. It is an editorial portfolio: generous reading widths, strong typography, restrained surfaces, and one red accent. Dark is the default theme; light and system preferences are available through the header control.

## Foundations

- Typeface: Space Grotesk for interface, display, and body copy. Use the system monospace stack only for small evidence labels, dates, and technical metadata.
- Canvas: `--bg`; raised cards and menus: `--surface` / `--surface-raised`.
- Text hierarchy: `--silver-100` for headings, `--silver-200` for strong body copy, `--gray-400` for supporting copy, and `--steel-500` for metadata.
- Accent: `--pulse` red. Reserve it for active navigation, primary actions, evidence labels, and focus rings.
- Borders: `--line` for normal separation and `--line-strong` for hover or emphasis.
- Corners: 9–14px on interactive surfaces and cards; 18px on the primary portrait.
- Content shell: 1152px site maximum, 896px case-study maximum, and 760px prose measure.
- Touch targets: 44px minimum. Every interactive control must have a visible focus state.

The theme tokens and component overrides live in `app/redesign.css`. `app/global.css` contains the legacy baseline and the custom Aurora experience. New sitewide work belongs in `app/redesign.css` unless it is specific to Aurora.

## Layout patterns

- Header: sticky, translucent, 80px desktop / 68px mobile. Desktop exposes all primary routes; mobile uses the `Menu` disclosure.
- Homepage hero: two columns on desktop, one column below 780px. Keep the identity and portrait as one section.
- Section rhythm: 72–80px desktop and 54–58px mobile. Use borders, not decorative backgrounds, to separate major sections.
- Manifest cards: two columns on desktop, one column below 780px. Cards lift by 3px on hover and never use category colors.
- Long-form pages: one H1, one 896px shell, and a 760px prose measure. Project snapshots use three equal columns, collapsing to one on mobile.
- Footer: one contact invitation followed by existing social/publishing paths and the legal line.

## Motion and interaction

- Normal transitions are 150–180ms; portrait zoom may use 400ms.
- Motion communicates hover, focus, or navigation state only. Do not add ambient animation.
- Respect `prefers-reduced-motion`; the global rule disables nonessential transitions and animations.
- Theme choices are Light, Dark, and System. The default remains Dark.

## Tag capsules

Tags are quiet editorial metadata. They help a visitor classify an essay, project, or side quest while scanning; they are not calls to action, filters, or status indicators.

### Adding tags to content

Add one comma-separated `tags` field to any MDX frontmatter in `content/blog`, `content/work`, or `content/side-quests`:

```yaml
tags: "Learning, Open Source"
```

The shared parser trims whitespace and removes case-insensitive duplicates. Adding frontmatter is enough: tags render automatically on manifest rows, detail pages, article metadata, and custom routes wired to the content record.

### Content rules

- Use Title Case in frontmatter; the component renders labels in uppercase.
- Prefer one or two words per tag.
- Use one to three tags per item. More than three weakens scanability.
- Name the durable subject or practice: `Training`, `Learning`, `Open Source`.
- Do not repeat words already doing enough work in the title.
- Use `Open Source`, not `Opensource`.
- Tags are comma-separated strings, not YAML arrays. The repository uses a deliberately small frontmatter parser.

### Visual contract

All topic tags use the shared neutral treatment defined by the `--tag-*` tokens in `app/redesign.css`:

- Foreground, border, and surface come from the theme-aware `--tag-*` tokens.
- Typeface: Space Grotesk, 11px, weight 500, natural case.
- Shape: 999px radius, 24px minimum height, `3px 9px` padding.
- Layout: 6px gap, wrapping enabled.

Do not assign colors by category. Red is reserved for the site pulse and active/live signals. Blue, brass, green, and other category palettes create a second visual language and are not part of this component.

### Component contract

Use `TagList` from `components/tag-list.tsx`. Do not hand-code capsule markup or copy its CSS.

```tsx
import { TagList } from "@/components/tag-list";
import { parseTags } from "@/lib/content";

<TagList tags={parseTags(frontmatter.tags)} placement="detail" />
```

Placements:

- `row`: between the title/subtitle and description in manifest-style lists.
- `detail`: directly after the title/subtitle block and before supporting metadata or description.

`TagList` is intentionally non-interactive. If tags later become filters or navigation, build a separate semantic link/button control that may reuse the visual tokens but must include focus, hover, active, and selected states.

### Status is not a tag

Labels such as `Live`, `Draft`, or `Archived` describe state. Keep them in the existing status/meta treatment; do not put them in `TagList`. This preserves the meaning of the site’s red pulse and prevents topic metadata from looking clickable.

### Implementation map

- Component and markup: `components/tag-list.tsx`
- Frontmatter type and normalization: `lib/content.ts` (`parseTags`)
- Design tokens and layout: `app/redesign.css` (`--tag-*`, `.tag-list`, `.tag-capsule`)
- Manifest integration: `components/manifest.tsx`
- Detail integration: `app/blog/[slug]`, `app/projects/[slug]`, and `app/side-quests/[slug]`
