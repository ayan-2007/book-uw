# Design system

The site is art-directed as **dark luxury editorial × cinematic neuroscience**.
The goal is a quiet, expensive reading experience: a deep ink field, warm paper
type, restrained antique gold, and imagery that carries the emotional weight.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#05080e` | Page field |
| `--surface` | `#0a111c` | Section surfaces |
| `--surface-raised` | `#101928` | Raised panels |
| `--panel` | `#0d1522` | Media wells |
| `--border` | `#1a273a` | Rules and frames |
| `--text` | `#f5f2eb` | Primary text — warm paper, never pure white |
| `--text-muted` | `#8c9cb0` | Secondary copy |
| `--text-dim` | `#5c6c80` | Tertiary labels |
| `--accent` | `#cfa85b` | Antique gold — actions, markers, small emphasis |
| `--accent-hover` | `#e5be70` | Hover state |
| `--danger` | `#e06c60` | Error state |

Gold is a material, not a theme. It appears in thin rules, protocol bullets,
prices, focus rings and one or two words of display type. It never fills large
areas except the primary button and the offer panel's paper field.

## Typography

- **Newsreader** — display and editorial voice. Headlines, the author letter,
  pull quotes, chapter names, prices and timeline numerals. Loaded as a variable
  font with the `opsz` axis so large sizes optically tighten.
- **Geist** — body, navigation, buttons, FAQ, forms and captions.

Rules:

- Body copy is `1rem / 1.65` and never wider than about `65ch`.
- Editorial paragraphs stay near `62ch`.
- Headlines use `font-optical-sizing: auto`, `letter-spacing: -0.02em` and a
  tight but readable line height.
- Prices and timeline numbers use `font-variant-numeric: tabular-nums`.
- Buttons and navigation use sentence case. No all-caps labels as a default.

## Spacing and layout

- A 4px spacing scale (`--space-1` through `--space-10`) drives all layout.
- The page container is capped at `77.5rem` (1240px) with fluid gutters.
- Sections use `--section-y: clamp(5rem, 8vw, 8.5rem)` so the page breathes on
  desktop without becoming sparse on mobile.
- The main reading column, letter column, timeline and offer use asymmetric
  grids rather than a centered stack.
- Rules are 1px and low contrast; they divide without boxing every section.

## Section rhythm

1. **Hero** — full-bleed brain atmosphere, editorial headline, framed hardcover,
   key inclusions.
2. **Statement band** — one decisive line of display type.
3. **The letter** — sticky author aside beside a long-form letter with a drop
   cap and pull quote.
4. **Three locks** — the signature interaction: a neural protocol console that
   stays pinned while the three lock panels scroll past.
5. **21 days** — a ruled timeline with tabular day numbers and image evidence.
6. **Inside the book** — a chapter archive with small portrait plates.
7. **Author** — a dark portrait plate and a factual credentials list.
8. **Reader evidence** — three quotes with photography, avatars and attribution.
9. **Comparison** — a two-column diagnostic table, stacked into labelled rows on
   small screens.
10. **The offer** — a warm paper panel, the physical edition, price, refund and
    shipping facts.
11. **FAQ** — native `<details>` accordions with a thin plus/minus indicator.
12. **Finale** — the doorway image, one last call to start Day 1.
13. **Footer and sticky buy bar** — short paths to purchase and policies.

## Motion

- One orchestrated entrance in the hero; no repeated scroll-triggered fades.
- The three-lock console crossfades imagery as each panel enters the viewport.
- Motion uses a single easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`, at
  140ms, 240ms or 420ms.
- `prefers-reduced-motion` reduces animations and transitions to effectively
  zero and disables smooth scrolling.

## Accessibility

- Skip link to `#main-content`.
- Visible `:focus-visible` ring in antique gold.
- Semantic landmarks, heading order and `<figure>`/`<figcaption>` for media.
- Decorative images use empty alt text; meaningful images describe the subject.
- All controls keep a minimum 44–48px touch target.
- Text contrast is checked against the ink surfaces; muted copy is reserved for
  secondary information.
- Native `<details>` powers the FAQ so it works without JavaScript.

## Responsive behavior

- 375px is the narrow reference width: no horizontal overflow, and the hero
  headline resolves to three lines.
- Navigation collapses to a full-screen menu below 1024px.
- The sticky purchase bar appears on mobile after the hero and hides on desktop.
- The comparison table becomes a stack of labelled rows below 640px.
- The three-lock console shows one inline image per lock on mobile instead of
  the pinned desktop visual.
