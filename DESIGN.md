# LucasChatham.com Design System

This file records reusable visual rules for the site. New UI should extend these rules instead of creating a parallel component or palette.

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

All topic tags use the single Machined Silver treatment defined by the `--tag-*` tokens in `app/global.css`:

- Foreground: `--silver-200` (`#D5D6D4`)
- Border: `rgba(213, 214, 212, .28)`
- Surface: `rgba(240, 240, 236, .055)`
- Typeface: Geist Mono, 8px, weight 600, uppercase, `.12em` tracking
- Shape: 999px radius, 18px minimum height, `2px 7px 1px` padding
- Layout: 5px gap, wrapping enabled

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
- Design tokens and layout: `app/global.css` (`--tag-*`, `.tag-list`, `.tag-capsule`)
- Manifest integration: `components/manifest.tsx`
- Detail integration: `app/blog/[slug]`, `app/projects/[slug]`, and `app/side-quests/[slug]`

